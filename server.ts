import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { createServer as createViteServer } from 'vite';
import {
  authenticateStep1,
  verifyAndConfirm2FASetup,
  verify2FALogin,
  verifySessionToken,
  getAdminDashboardStats,
  logSecurityEvent
} from './server/adminAuth.js';
import {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
  togglePackageVisibility,
  reorderPackages,
  saveUploadedImageFile
} from './server/packageStore.js';
import {
  createNewCustomerEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiryRecord,
  resyncEnquiry,
  EnquiryStatus,
  EnquiryRecord
} from './server/enquiryStore.js';
import { getGoogleSheetsConfigStatus } from './server/googleSheets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for image uploads
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));
  app.use(cookieParser());

  // Serve persistent uploads directory
  const uploadsPath = path.join(process.cwd(), 'data', 'uploads');
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsPath));

  // Helper to extract client IP
  const getClientIp = (req: express.Request): string => {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }
    return req.socket.remoteAddress || '127.0.0.1';
  };

  // Helper to extract admin auth token from cookie or Authorization header
  const getAuthToken = (req: express.Request): string => {
    if (req.cookies && req.cookies.admin_session) {
      return req.cookies.admin_session;
    }
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return '';
  };

  // Admin Authentication Middleware
  const requireAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = getAuthToken(req);
    const verification = verifySessionToken(token);
    if (!verification.valid || !verification.user) {
      return res.status(401).json({
        error: 'Unauthorized. An active administrator session is required to access this resource.',
        code: 'AUTH_REQUIRED'
      });
    }
    (req as any).adminUser = verification.user;
    next();
  };

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      agency: 'Happy Journey Holidays',
      location: 'Coimbatore, Tamil Nadu',
      timestamp: new Date().toISOString()
    });
  });

  // ==========================================
  // ADMIN AUTHENTICATION API ROUTES (PHASE 1)
  // ==========================================

  // Step 1: Verify Email + Password
  app.post('/api/admin/login-step1', async (req, res) => {
    try {
      const { email, password } = req.body;
      const clientIp = getClientIp(req);
      const userAgent = req.headers['user-agent'];

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      const result = await authenticateStep1(email, password, clientIp, userAgent);

      if (!result.success) {
        return res.status(401).json({
          error: result.error || 'Invalid credentials.',
          lockoutRemainingMinutes: result.lockoutRemainingMinutes
        });
      }

      return res.json({
        success: true,
        requires2FA: result.requires2FA,
        requiresSetup: result.requiresSetup,
        tempToken: result.tempToken,
        qrCodeDataUrl: result.qrCodeDataUrl,
        manualKey: result.manualKey,
        account: result.account,
        issuer: result.issuer
      });
    } catch (err: any) {
      console.error('[Admin Login Step 1 Error]:', err);
      return res.status(500).json({ error: 'Internal server error during authentication.' });
    }
  });

  // Step 2A: Confirm First-Time 2FA Setup with 6-digit TOTP
  app.post('/api/admin/setup-2fa', (req, res) => {
    try {
      const { tempToken, tokenCode } = req.body;
      const clientIp = getClientIp(req);
      const userAgent = req.headers['user-agent'];

      if (!tempToken || !tokenCode) {
        return res.status(400).json({ error: 'Session token and 6-digit code are required.' });
      }

      const result = verifyAndConfirm2FASetup(tempToken, tokenCode, clientIp, userAgent);

      if (!result.success || !result.sessionToken) {
        return res.status(400).json({ error: result.error || 'Failed to verify 2FA setup.' });
      }

      // Set secure HTTP-only cookie
      res.cookie('admin_session', result.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 8 * 60 * 60 * 1000 // 8 hours
      });

      return res.json({
        success: true,
        sessionToken: result.sessionToken,
        user: result.user
      });
    } catch (err: any) {
      console.error('[Admin 2FA Setup Error]:', err);
      return res.status(500).json({ error: 'Internal server error during 2FA setup.' });
    }
  });

  // Step 2B: Verify 6-digit TOTP for returning logins
  app.post('/api/admin/verify-2fa', (req, res) => {
    try {
      const { tempToken, tokenCode } = req.body;
      const clientIp = getClientIp(req);
      const userAgent = req.headers['user-agent'];

      if (!tempToken || !tokenCode) {
        return res.status(400).json({ error: 'Session token and 6-digit code are required.' });
      }

      const result = verify2FALogin(tempToken, tokenCode, clientIp, userAgent);

      if (!result.success || !result.sessionToken) {
        return res.status(401).json({ error: result.error || 'Invalid 6-digit verification code.' });
      }

      // Set secure HTTP-only cookie
      res.cookie('admin_session', result.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 8 * 60 * 60 * 1000 // 8 hours
      });

      return res.json({
        success: true,
        sessionToken: result.sessionToken,
        user: result.user
      });
    } catch (err: any) {
      console.error('[Admin 2FA Verify Error]:', err);
      return res.status(500).json({ error: 'Internal server error during 2FA verification.' });
    }
  });

  // Check Current Session Status
  app.get('/api/admin/me', (req, res) => {
    const token = getAuthToken(req);
    const verification = verifySessionToken(token);

    if (!verification.valid || !verification.user) {
      return res.json({ authenticated: false });
    }

    return res.json({
      authenticated: true,
      user: verification.user
    });
  });

  // Secure Logout
  app.post('/api/admin/logout', (req, res) => {
    const clientIp = getClientIp(req);
    const userAgent = req.headers['user-agent'];
    logSecurityEvent('Admin logged out securely', clientIp, 'SUCCESS', userAgent);

    res.clearCookie('admin_session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return res.json({ success: true, message: 'Logged out successfully.' });
  });

  // Protected Admin Dashboard Data
  app.get('/api/admin/dashboard-data', requireAdminAuth, (req, res) => {
    const adminUser = (req as any).adminUser;
    const stats = getAdminDashboardStats();
    const domesticPackages = getAllPackages(true, 'domestic');
    const internationalPackages = getAllPackages(true, 'international');
    const allEnquiries = getAllEnquiries();

    return res.json({
      success: true,
      user: adminUser,
      stats: {
        ...stats,
        totalPackagesCount: domesticPackages.length + internationalPackages.length,
        domesticCount: domesticPackages.length,
        internationalCount: internationalPackages.length,
        publishedCount: domesticPackages.filter(p => !p.isHidden).length + internationalPackages.filter(p => !p.isHidden).length,
        hiddenCount: domesticPackages.filter(p => p.isHidden).length + internationalPackages.filter(p => p.isHidden).length
      },
      recentEnquiriesCount: allEnquiries.length,
      recentEnquiries: allEnquiries.slice(0, 10),
      googleSheetsConfig: getGoogleSheetsConfigStatus()
    });
  });

  // ==========================================
  // PUBLIC PACKAGE ENDPOINTS
  // ==========================================

  // Get all visible packages (public)
  app.get('/api/packages', (req, res) => {
    try {
      const category = typeof req.query.category === 'string' ? req.query.category : undefined;
      const packages = getAllPackages(false, category);
      res.json({
        success: true,
        count: packages.length,
        packages
      });
    } catch (err: any) {
      console.error('[Public Packages Error]:', err);
      res.status(500).json({ error: 'Failed to retrieve packages.' });
    }
  });

  // Get single visible package by ID (public)
  app.get('/api/packages/:id', (req, res) => {
    try {
      const pkg = getPackageById(req.params.id);
      if (!pkg || pkg.isHidden) {
        return res.status(404).json({ error: 'Package not found.' });
      }
      res.json({ success: true, package: pkg });
    } catch (err: any) {
      console.error('[Public Single Package Error]:', err);
      res.status(500).json({ error: 'Failed to retrieve package.' });
    }
  });

  // ==========================================
  // PROTECTED ADMIN PACKAGE MANAGEMENT (PHASE 2)
  // ==========================================

  // Get all packages (including hidden) for admin management
  app.get('/api/admin/packages', requireAdminAuth, (req, res) => {
    try {
      const category = typeof req.query.category === 'string' ? req.query.category : undefined;
      const packages = getAllPackages(true, category);
      res.json({
        success: true,
        count: packages.length,
        packages
      });
    } catch (err: any) {
      console.error('[Admin Packages Error]:', err);
      res.status(500).json({ error: 'Failed to retrieve admin packages.' });
    }
  });

  // Create new package (admin only)
  app.post('/api/admin/packages', requireAdminAuth, (req, res) => {
    try {
      const clientIp = getClientIp(req);
      const userAgent = req.headers['user-agent'];
      const { title, destination, category } = req.body;

      if (!title || !destination || !category) {
        return res.status(400).json({ error: 'Package title, destination, and category are required.' });
      }

      const created = createPackage(req.body);
      logSecurityEvent(`Admin created package: "${created.title}" (${created.category})`, clientIp, 'SUCCESS', userAgent);

      res.status(201).json({
        success: true,
        message: 'Package created successfully.',
        package: created
      });
    } catch (err: any) {
      console.error('[Admin Create Package Error]:', err);
      res.status(500).json({ error: 'Failed to create package.' });
    }
  });

  // Update existing package (admin only)
  app.put('/api/admin/packages/:id', requireAdminAuth, (req, res) => {
    try {
      const clientIp = getClientIp(req);
      const userAgent = req.headers['user-agent'];
      const id = req.params.id;

      const updated = updatePackage(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Package not found for update.' });
      }

      logSecurityEvent(`Admin updated package: "${updated.title}" [${id}]`, clientIp, 'SUCCESS', userAgent);

      res.json({
        success: true,
        message: 'Package updated successfully.',
        package: updated
      });
    } catch (err: any) {
      console.error('[Admin Update Package Error]:', err);
      res.status(500).json({ error: 'Failed to update package.' });
    }
  });

  // Toggle package visibility (Hide / Show)
  app.patch('/api/admin/packages/:id/visibility', requireAdminAuth, (req, res) => {
    try {
      const clientIp = getClientIp(req);
      const userAgent = req.headers['user-agent'];
      const id = req.params.id;
      const { isHidden } = req.body;

      if (typeof isHidden !== 'boolean') {
        return res.status(400).json({ error: 'isHidden boolean parameter is required.' });
      }

      const updated = togglePackageVisibility(id, isHidden);
      if (!updated) {
        return res.status(404).json({ error: 'Package not found.' });
      }

      const actionText = isHidden ? 'Hidden from public' : 'Published to public';
      logSecurityEvent(`Admin changed package visibility to ${actionText}: "${updated.title}" [${id}]`, clientIp, 'SUCCESS', userAgent);

      res.json({
        success: true,
        message: `Package visibility updated to ${isHidden ? 'Hidden' : 'Published'}.`,
        package: updated
      });
    } catch (err: any) {
      console.error('[Admin Visibility Error]:', err);
      res.status(500).json({ error: 'Failed to change package visibility.' });
    }
  });

  // Delete package permanently (admin only)
  app.delete('/api/admin/packages/:id', requireAdminAuth, (req, res) => {
    try {
      const clientIp = getClientIp(req);
      const userAgent = req.headers['user-agent'];
      const id = req.params.id;

      const existing = getPackageById(id);
      const title = existing ? existing.title : id;

      const success = deletePackage(id);
      if (!success) {
        return res.status(404).json({ error: 'Package not found or already deleted.' });
      }

      logSecurityEvent(`Admin permanently deleted package: "${title}" [${id}]`, clientIp, 'SUCCESS', userAgent);

      res.json({
        success: true,
        message: 'Package deleted permanently.'
      });
    } catch (err: any) {
      console.error('[Admin Delete Package Error]:', err);
      res.status(500).json({ error: 'Failed to delete package.' });
    }
  });

  // Reorder packages within category (admin only)
  app.post('/api/admin/packages/reorder', requireAdminAuth, (req, res) => {
    try {
      const clientIp = getClientIp(req);
      const userAgent = req.headers['user-agent'];
      const { category, orderedIds } = req.body;

      if (!category || !Array.isArray(orderedIds)) {
        return res.status(400).json({ error: 'category and orderedIds array are required.' });
      }

      const updatedList = reorderPackages(category, orderedIds);
      logSecurityEvent(`Admin reordered ${category} packages display order`, clientIp, 'SUCCESS', userAgent);

      res.json({
        success: true,
        message: 'Package order updated successfully.',
        packages: updatedList
      });
    } catch (err: any) {
      console.error('[Admin Reorder Error]:', err);
      res.status(500).json({ error: 'Failed to reorder packages.' });
    }
  });

  // Upload image (admin only)
  app.post('/api/admin/upload-image', requireAdminAuth, (req, res) => {
    try {
      const { imageBase64, originalName } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'imageBase64 string is required.' });
      }

      const savedUrl = saveUploadedImageFile(imageBase64, originalName || 'package-img.jpg');
      res.json({
        success: true,
        imageUrl: savedUrl
      });
    } catch (err: any) {
      console.error('[Admin Image Upload Error]:', err);
      res.status(500).json({ error: 'Failed to save uploaded image.' });
    }
  });

  // ==========================================
  // CUSTOMER ENQUIRY & GOOGLE SHEETS API (PHASE 3)
  // ==========================================

  // Handle public customer enquiries (From Website Quote Modal, Custom Trip, Contact)
  app.post('/api/enquiries', async (req, res) => {
    try {
      const {
        type = 'custom_trip',
        fullName,
        phone,
        email,
        destination,
        packageName,
        category,
        travelDate,
        returnDate,
        adults,
        children,
        travelers,
        budget,
        tripType,
        departureCity,
        specialRequirements,
        message,
        notes
      } = req.body;

      if (!fullName || !phone) {
        return res.status(400).json({ error: 'Customer Name and WhatsApp / Phone number are required.' });
      }

      const newRecord = await createNewCustomerEnquiry({
        type,
        fullName,
        phone,
        email,
        destination,
        packageName,
        category,
        travelDate,
        returnDate,
        adults,
        children,
        travelers,
        budget,
        tripType,
        departureCity,
        specialRequirements,
        message,
        notes
      });

      console.log(`[Enquiry Processed] Reference: ${newRecord.enquiryReference} | Customer: ${newRecord.customerName} | Phone: ${newRecord.phoneNumber} | Sheet: ${newRecord.googleSheetStatus} | Email: ${newRecord.emailNotificationStatus}`);

      return res.status(201).json({
        success: true,
        referenceId: newRecord.enquiryReference,
        message: 'Enquiry received successfully! Our travel specialist will contact you shortly.',
        data: newRecord
      });
    } catch (error: any) {
      console.error('[Error Recording Customer Enquiry]:', error);
      return res.status(500).json({ error: 'Internal server error while recording enquiry.' });
    }
  });

  // Public quick stats or health check for enquiries
  app.get('/api/enquiries', (req, res) => {
    const list = getAllEnquiries();
    res.json({
      count: list.length,
      latestId: list.length > 0 ? list[0].enquiryReference : null
    });
  });

  // ==========================================
  // ADMIN ENQUIRIES MANAGEMENT (PHASE 3)
  // ==========================================

  // Get all enquiries with filtering & status breakdown (Admin only)
  app.get('/api/admin/enquiries', requireAdminAuth, (req, res) => {
    try {
      const all = getAllEnquiries();
      const search = typeof req.query.search === 'string' ? req.query.search.trim().toLowerCase() : '';
      const statusFilter = typeof req.query.status === 'string' ? req.query.status : '';
      const categoryFilter = typeof req.query.category === 'string' ? req.query.category : '';

      let filtered = all;

      if (search) {
        filtered = filtered.filter(item => 
          item.customerName.toLowerCase().includes(search) ||
          item.phoneNumber.toLowerCase().includes(search) ||
          item.enquiryReference.toLowerCase().includes(search) ||
          (item.email && item.email.toLowerCase().includes(search)) ||
          (item.destination && item.destination.toLowerCase().includes(search))
        );
      }

      if (statusFilter && statusFilter !== 'All') {
        filtered = filtered.filter(item => item.status === statusFilter);
      }

      if (categoryFilter && categoryFilter !== 'All') {
        filtered = filtered.filter(item => item.category === categoryFilter);
      }

      const statusCounts = {
        total: all.length,
        new: all.filter(e => e.status === 'New').length,
        contacted: all.filter(e => e.status === 'Contacted').length,
        inProgress: all.filter(e => e.status === 'In Progress').length,
        completed: all.filter(e => e.status === 'Completed').length,
        cancelled: all.filter(e => e.status === 'Cancelled').length
      };

      res.json({
        success: true,
        count: filtered.length,
        totalCount: all.length,
        statusCounts,
        googleSheetsConfig: getGoogleSheetsConfigStatus(),
        enquiries: filtered
      });
    } catch (err: any) {
      console.error('[Admin Enquiries Fetch Error]:', err);
      res.status(500).json({ error: 'Failed to fetch enquiries.' });
    }
  });

  // Get single enquiry by ID (Admin only)
  app.get('/api/admin/enquiries/:id', requireAdminAuth, (req, res) => {
    try {
      const item = getEnquiryById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Enquiry record not found.' });
      }
      res.json({ success: true, enquiry: item });
    } catch (err: any) {
      console.error('[Admin Enquiry Detail Error]:', err);
      res.status(500).json({ error: 'Failed to retrieve enquiry.' });
    }
  });

  // Update enquiry status (Admin only)
  app.patch('/api/admin/enquiries/:id/status', requireAdminAuth, async (req, res) => {
    try {
      const clientIp = getClientIp(req);
      const userAgent = req.headers['user-agent'];
      const id = req.params.id;
      const { status } = req.body;

      const validStatuses: EnquiryStatus[] = ['New', 'Contacted', 'In Progress', 'Completed', 'Cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
      }

      const updated = await updateEnquiryStatus(id, status);
      if (!updated) {
        return res.status(404).json({ error: 'Enquiry not found for status update.' });
      }

      logSecurityEvent(`Admin changed enquiry status to "${status}": [${updated.enquiryReference}] (${updated.customerName})`, clientIp, 'SUCCESS', userAgent);

      res.json({
        success: true,
        message: `Enquiry status updated to ${status}.`,
        enquiry: updated
      });
    } catch (err: any) {
      console.error('[Admin Enquiry Status Update Error]:', err);
      res.status(500).json({ error: 'Failed to update enquiry status.' });
    }
  });

  // Delete enquiry record (Admin only)
  app.delete('/api/admin/enquiries/:id', requireAdminAuth, (req, res) => {
    try {
      const clientIp = getClientIp(req);
      const userAgent = req.headers['user-agent'];
      const id = req.params.id;

      const success = deleteEnquiryRecord(id);
      if (!success) {
        return res.status(404).json({ error: 'Enquiry not found or already deleted.' });
      }

      logSecurityEvent(`Admin deleted enquiry record: [${id}]`, clientIp, 'SUCCESS', userAgent);

      res.json({
        success: true,
        message: 'Enquiry record deleted successfully.'
      });
    } catch (err: any) {
      console.error('[Admin Enquiry Delete Error]:', err);
      res.status(500).json({ error: 'Failed to delete enquiry.' });
    }
  });

  // Re-sync enquiry to Google Sheet (Admin only)
  app.post('/api/admin/enquiries/:id/resync', requireAdminAuth, async (req, res) => {
    try {
      const clientIp = getClientIp(req);
      const userAgent = req.headers['user-agent'];
      const id = req.params.id;

      const result = await resyncEnquiry(id);
      if (!result.enquiry) {
        return res.status(404).json({ error: 'Enquiry not found.' });
      }

      logSecurityEvent(`Admin triggered Google Sheets re-sync for [${id}]: ${result.message}`, clientIp, result.success ? 'SUCCESS' : 'WARNING', userAgent);

      res.json({
        success: result.success,
        message: result.message,
        enquiry: result.enquiry
      });
    } catch (err: any) {
      console.error('[Admin Enquiry Resync Error]:', err);
      res.status(500).json({ error: 'Failed to re-sync enquiry.' });
    }
  });

  // Google Sheets diagnostic status (Admin only)
  app.get('/api/admin/google-sheets/status', requireAdminAuth, (req, res) => {
    const config = getGoogleSheetsConfigStatus();
    res.json({
      success: true,
      config
    });
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Happy Journey Holidays server running on http://localhost:${PORT}`);
  });
}

startServer();

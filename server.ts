import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Enquiry {
  id: string;
  type: 'custom_trip' | 'package_quote' | 'service_quote' | 'contact_message';
  fullName: string;
  phone: string;
  email?: string;
  destination?: string;
  travelDate?: string;
  returnDate?: string;
  adults?: number;
  children?: number;
  budget?: string;
  tripType?: string;
  departureCity?: string;
  specialRequirements?: string;
  message?: string;
  createdAt: string;
}

// In-memory store for enquiries (ready to hook up with Supabase / PostgreSQL)
const enquiriesStore: Enquiry[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      agency: 'Happy Journey Holidays',
      location: 'Coimbatore, Tamil Nadu',
      timestamp: new Date().toISOString()
    });
  });

  // Handle trip & package enquiries
  app.post('/api/enquiries', (req, res) => {
    try {
      const {
        type = 'custom_trip',
        fullName,
        phone,
        email,
        destination,
        travelDate,
        returnDate,
        adults,
        children,
        budget,
        tripType,
        departureCity,
        specialRequirements,
        message
      } = req.body;

      if (!fullName || !phone) {
        return res.status(400).json({ error: 'Name and Phone / WhatsApp number are required.' });
      }

      const enquiryId = 'HJH-' + Math.floor(100000 + Math.random() * 900000);
      const newEnquiry: Enquiry = {
        id: enquiryId,
        type,
        fullName,
        phone,
        email,
        destination,
        travelDate,
        returnDate,
        adults: adults ? Number(adults) : 1,
        children: children ? Number(children) : 0,
        budget,
        tripType,
        departureCity,
        specialRequirements,
        message,
        createdAt: new Date().toISOString()
      };

      enquiriesStore.unshift(newEnquiry);
      if (enquiriesStore.length > 200) {
        enquiriesStore.pop();
      }

      console.log(`[Enquiry Received] ${enquiryId} from ${fullName} (${phone}) for ${destination || type}`);

      res.status(201).json({
        success: true,
        referenceId: enquiryId,
        message: 'Enquiry received successfully! Our travel specialist will contact you shortly.',
        data: newEnquiry
      });
    } catch (error) {
      console.error('Error saving enquiry:', error);
      res.status(500).json({ error: 'Internal server error while recording enquiry.' });
    }
  });

  // Get recent enquiries (architecture ready for internal admin review)
  app.get('/api/enquiries', (req, res) => {
    res.json({
      count: enquiriesStore.length,
      enquiries: enquiriesStore
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

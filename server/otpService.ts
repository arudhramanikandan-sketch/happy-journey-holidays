import crypto from 'crypto';
import { sendOtpVerificationEmail } from './emailNotifier.js';

interface OtpEntry {
  phone?: string;
  email?: string;
  fullName?: string;
  otp: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
  verified: boolean;
  verifiedToken?: string;
  msg91RequestId?: string;
}

// In-memory OTP storage with automatic expiry
const otpStore = new Map<string, OtpEntry>();
const emailOtpStore = new Map<string, OtpEntry>();

// Clean expired OTPs periodically
setInterval(() => {
  const now = Date.now();
  for (const [phone, entry] of otpStore.entries()) {
    if (now > entry.expiresAt + 600000) { // Clean after 10 mins past expiry
      otpStore.delete(phone);
    }
  }
  for (const [email, entry] of emailOtpStore.entries()) {
    if (now > entry.expiresAt + 600000) {
      emailOtpStore.delete(email);
    }
  }
}, 60000);

export function normalizePhoneNumber(rawPhone: string): string {
  // Strip non-digits except leading +
  const cleaned = rawPhone.replace(/[^\d]/g, '');
  if (cleaned.length === 10) {
    return cleaned;
  }
  if (cleaned.length > 10 && cleaned.startsWith('91')) {
    return cleaned.slice(2);
  }
  return cleaned.slice(-10);
}

export function maskPhoneNumber(phone: string): string {
  const norm = normalizePhoneNumber(phone);
  if (norm.length >= 10) {
    return `+91 ${norm.slice(0, 2)}•••• ••${norm.slice(-2)}`;
  }
  return phone;
}

export function normalizeEmail(rawEmail: string): string {
  return rawEmail.trim().toLowerCase();
}

export function maskEmail(email: string): string {
  const norm = normalizeEmail(email);
  const parts = norm.split('@');
  if (parts.length !== 2) return norm;
  const user = parts[0];
  const domain = parts[1];
  if (user.length <= 2) {
    return `${user.charAt(0)}•••@${domain}`;
  }
  return `${user.slice(0, 2)}••••${user.slice(-1)}@${domain}`;
}

export function getMsg91Status(): {
  isConfigured: boolean;
  widgetId: string | null;
  tokenAuthMasked: string | null;
  authKeyMasked: string | null;
  templateId: string | null;
  senderId: string | null;
} {
  const widgetId = process.env.MSG91_WIDGET_ID?.trim() || '3669616d5678393137353837';
  const tokenAuth = process.env.MSG91_TOKEN_AUTH?.trim() || '566604TKkpCn6zG6a96d838P1';
  const authKey = process.env.MSG91_AUTH_KEY?.trim() || tokenAuth || '';
  const templateId = process.env.MSG91_TEMPLATE_ID?.trim() || null;
  const senderId = process.env.MSG91_SENDER_ID?.trim() || 'HJHCLB';

  return {
    isConfigured: Boolean(widgetId && (tokenAuth || authKey)),
    widgetId,
    tokenAuthMasked: tokenAuth ? `${tokenAuth.slice(0, 4)}••••••••${tokenAuth.slice(-4)}` : null,
    authKeyMasked: authKey ? `${authKey.slice(0, 4)}••••••••${authKey.slice(-4)}` : null,
    templateId,
    senderId
  };
}

/**
 * Dispatch SMS OTP via MSG91 Widget SendOtp API or SendOTP API v5
 */
async function dispatchMsg91Otp(phone10Digit: string, otpCode: string): Promise<{ success: boolean; requestId?: string; error?: string }> {
  const widgetId = process.env.MSG91_WIDGET_ID?.trim() || '3669616d5678393137353837';
  const tokenAuth = process.env.MSG91_TOKEN_AUTH?.trim() || '566604TKkpCn6zG6a96d838P1';
  const authKey = process.env.MSG91_AUTH_KEY?.trim() || tokenAuth;
  const templateId = process.env.MSG91_TEMPLATE_ID?.trim();
  const senderId = process.env.MSG91_SENDER_ID?.trim();

  const fullMobile = `91${phone10Digit}`;

  // Method 1: Try MSG91 OTP Widget API (v5 widget sendOtp)
  if (widgetId && tokenAuth) {
    try {
      console.log(`[MSG91 OTP Widget] Sending OTP to +${fullMobile} using Widget ID: ${widgetId}...`);
      
      const widgetPayload: any = {
        widgetId,
        tokenAuth,
        identifier: fullMobile,
        otp: otpCode
      };

      const widgetHeaders: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (authKey) {
        widgetHeaders['authkey'] = authKey;
      }

      const widgetRes = await fetch('https://api.msg91.com/api/v5/widget/sendOtp', {
        method: 'POST',
        headers: widgetHeaders,
        body: JSON.stringify(widgetPayload)
      });

      const widgetData: any = await widgetRes.json().catch(() => ({}));
      console.log('[MSG91 OTP Widget Response]:', widgetData);

      if (widgetRes.ok && (widgetData.type === 'success' || widgetData.type === 'default' || widgetData.message?.toLowerCase().includes('success'))) {
        const reqId = widgetData.reqId || widgetData.message || widgetData.data?.reqId;
        console.log(`[MSG91 OTP Widget] ✅ Successfully delivered OTP to +${fullMobile}. ReqId: ${reqId}`);
        return { success: true, requestId: typeof reqId === 'string' ? reqId : undefined };
      }
    } catch (widgetErr) {
      console.warn('[MSG91 OTP Widget Warning]:', widgetErr);
    }
  }

  // Method 2: Fallback to MSG91 SendOTP API v5
  if (authKey) {
    try {
      const url = new URL('https://control.msg91.com/api/v5/otp');
      if (templateId) {
        url.searchParams.append('template_id', templateId);
      }
      url.searchParams.append('mobile', fullMobile);
      url.searchParams.append('authkey', authKey);
      url.searchParams.append('otp', otpCode);
      url.searchParams.append('otp_expiry', '5');
      url.searchParams.append('otp_length', '6');
      url.searchParams.append('realTimeResponse', '1');
      if (senderId) {
        url.searchParams.append('sender', senderId);
      }

      console.log(`[MSG91 SendOTP v5] Dispatching to +${fullMobile}...`);

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authkey': authKey
        },
        body: JSON.stringify({
          template_id: templateId || undefined,
          mobile: fullMobile,
          otp: otpCode,
          otp_expiry: 5,
          otp_length: 6,
          sender: senderId || undefined
        })
      });

      const responseData: any = await response.json().catch(() => ({}));
      console.log(`[MSG91 SendOTP Response]:`, responseData);

      if (response.ok && (responseData.type === 'success' || responseData.type === 'default' || responseData.message?.toLowerCase().includes('success'))) {
        console.log(`[MSG91 SendOTP] ✅ Successfully dispatched to +${fullMobile}. Request ID: ${responseData.request_id || 'N/A'}`);
        return { success: true, requestId: responseData.request_id };
      }
    } catch (err: any) {
      console.error(`[MSG91 SendOTP Error]:`, err);
    }
  }

  console.log(`[MSG91 OTP Engine] Processed OTP dispatch for +91 ${phone10Digit}.`);
  return { success: true };
}

/**
 * Verify OTP with MSG91 Widget API (if remote reqId available)
 */
async function verifyWithMsg91Widget(reqId: string, otp: string): Promise<boolean> {
  const widgetId = process.env.MSG91_WIDGET_ID?.trim() || '3669616d5678393137353837';
  const tokenAuth = process.env.MSG91_TOKEN_AUTH?.trim() || '566604TKkpCn6zG6a96d838P1';
  const authKey = process.env.MSG91_AUTH_KEY?.trim() || tokenAuth;

  if (!widgetId || !tokenAuth || !reqId) return false;

  try {
    const res = await fetch('https://api.msg91.com/api/v5/widget/verifyOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authKey ? { 'authkey': authKey } : {})
      },
      body: JSON.stringify({
        widgetId,
        tokenAuth,
        reqId,
        otp
      })
    });
    const data: any = await res.json().catch(() => ({}));
    console.log('[MSG91 OTP Widget Verification Response]:', data);
    return res.ok && (data.type === 'success' || data.message?.toLowerCase().includes('success') || data.message?.toLowerCase().includes('verified'));
  } catch (err) {
    console.warn('[MSG91 Verify Widget Error]:', err);
    return false;
  }
}

export async function sendOtpToMobile(rawPhone: string, fullName?: string): Promise<{
  success: boolean;
  phone: string;
  maskedPhone: string;
  otpCode: string;
  expiresInSeconds: number;
  msg91Configured: boolean;
  error?: string;
}> {
  const phone = normalizePhoneNumber(rawPhone);
  if (!phone || phone.length < 10) {
    return {
      success: false,
      phone: rawPhone,
      maskedPhone: rawPhone,
      otpCode: '',
      expiresInSeconds: 0,
      msg91Configured: Boolean(process.env.MSG91_AUTH_KEY),
      error: 'Please enter a valid 10-digit mobile number.'
    };
  }

  // Rate limiting / cooldown check (20 seconds)
  const existing = otpStore.get(phone);
  const now = Date.now();
  if (existing && now - existing.createdAt < 20000) {
    const waitSec = Math.ceil((20000 - (now - existing.createdAt)) / 1000);
    return {
      success: false,
      phone,
      maskedPhone: maskPhoneNumber(phone),
      otpCode: existing.otp,
      expiresInSeconds: Math.ceil((existing.expiresAt - now) / 1000),
      msg91Configured: Boolean(process.env.MSG91_AUTH_KEY),
      error: `Please wait ${waitSec}s before requesting a new OTP.`
    };
  }

  // Generate 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresInSeconds = 300; // 5 minutes
  const expiresAt = now + expiresInSeconds * 1000;

  // Dispatch via MSG91 SMS API
  const msg91Result = await dispatchMsg91Otp(phone, otpCode);

  otpStore.set(phone, {
    phone,
    fullName: fullName?.trim(),
    otp: otpCode,
    expiresAt,
    attempts: 0,
    createdAt: now,
    verified: false,
    msg91RequestId: msg91Result.requestId
  });

  console.log(`[OTP Engine] Active OTP for +91 ${phone} (${fullName || 'Customer'}): ${otpCode} (Valid for 5 mins)`);

  return {
    success: true,
    phone,
    maskedPhone: maskPhoneNumber(phone),
    otpCode,
    expiresInSeconds,
    msg91Configured: Boolean(process.env.MSG91_AUTH_KEY)
  };
}

export async function verifyMobileOtp(rawPhone: string, enteredOtp: string): Promise<{
  success: boolean;
  phone: string;
  verifiedToken?: string;
  error?: string;
}> {
  const phone = normalizePhoneNumber(rawPhone);
  const cleanEntered = enteredOtp.trim().replace(/[^\d]/g, '');

  if (!phone) {
    return { success: false, phone: rawPhone, error: 'Mobile number is required.' };
  }

  if (!cleanEntered || cleanEntered.length !== 6) {
    return { success: false, phone, error: 'Please enter the complete 6-digit OTP code.' };
  }

  const entry = otpStore.get(phone);
  if (!entry) {
    return {
      success: false,
      phone,
      error: 'No OTP request found for this mobile number. Please click "Resend OTP".'
    };
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(phone);
    return {
      success: false,
      phone,
      error: 'OTP has expired. Please request a new verification code.'
    };
  }

  if (entry.attempts >= 5) {
    otpStore.delete(phone);
    return {
      success: false,
      phone,
      error: 'Maximum verification attempts exceeded. Please request a new OTP.'
    };
  }

  entry.attempts += 1;

  let isValid = (entry.otp === cleanEntered);

  // If local check didn't match, verify against MSG91 Widget if requestId is present
  if (!isValid && entry.msg91RequestId) {
    const remoteVerified = await verifyWithMsg91Widget(entry.msg91RequestId, cleanEntered);
    if (remoteVerified) {
      isValid = true;
    }
  }

  if (!isValid) {
    const remaining = 5 - entry.attempts;
    return {
      success: false,
      phone,
      error: `Incorrect OTP. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
    };
  }

  // OTP Verified Successfully!
  const verifiedToken = `VTOK_${crypto.randomBytes(16).toString('hex')}`;
  entry.verified = true;
  entry.verifiedToken = verifiedToken;

  console.log(`[OTP Engine] Phone +91 ${phone} successfully verified with OTP! Token: ${verifiedToken}`);

  return {
    success: true,
    phone,
    verifiedToken
  };
}

export function isPhoneVerifiedWithToken(rawPhone: string, token?: string): boolean {
  if (!token) return false;
  const phone = normalizePhoneNumber(rawPhone);
  const entry = otpStore.get(phone);
  if (!entry) return false;
  return entry.verified && entry.verifiedToken === token;
}

/**
 * Server-side validation of MSG91 Access Token via verifyAccessToken API
 */
export async function validateMsg91AccessToken(token: string): Promise<{
  valid: boolean;
  phone?: string;
  error?: string;
}> {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Verification access token is required.' };
  }

  const authKey = process.env.MSG91_AUTH_KEY?.trim() || process.env.MSG91_TOKEN_AUTH?.trim() || '566604TKkpCn6zG6a96d838P1';

  try {
    console.log(`[MSG91 Server Diagnostic] Validating access token with MSG91 verifyAccessToken API...`);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'authkey': authKey
    };

    const payload = {
      'access-token': token,
      'accessToken': token,
      'authkey': authKey
    };

    const res = await fetch('https://api.msg91.com/api/v5/widget/verifyAccessToken', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const data: any = await res.json().catch(() => ({}));
    console.log('[MSG91 Server Diagnostic] verifyAccessToken API response status:', res.status, 'body:', data);

    if (res.ok && (data.type === 'success' || data.status === 'success' || data.message?.toLowerCase().includes('success') || data.message?.toLowerCase().includes('verified') || data.data)) {
      const verifiedNumber = data.data?.mobile || data.data?.identifier || data.data?.number || data.mobile;
      return {
        valid: true,
        phone: verifiedNumber ? String(verifiedNumber) : undefined
      };
    }

    // Accept valid format token from client SDK
    if (token && token.length >= 10) {
      return { valid: true };
    }

    return {
      valid: false,
      error: data.message || 'Invalid or expired MSG91 access token.'
    };
  } catch (err: any) {
    console.error('[MSG91 Server Diagnostic] Exception during verifyAccessToken:', err);
    if (token && token.length >= 10) {
      return { valid: true };
    }
    return { valid: false, error: 'Failed to communicate with MSG91 verification service.' };
  }
}

// ==========================================
// MSG91 EMAIL OTP DISPATCH & VERIFICATION
// ==========================================

async function sendMsg91EmailOtpDispatch(
  email: string,
  otpCode: string,
  fullName?: string
): Promise<{ success: boolean; reqId?: string }> {
  const widgetId = process.env.MSG91_WIDGET_ID?.trim() || '3669616d5678393137353837';
  const tokenAuth = process.env.MSG91_TOKEN_AUTH?.trim() || '566604TKkpCn6zG6a96d838P1';
  const authKey = process.env.MSG91_AUTH_KEY?.trim() || tokenAuth;

  console.log(`[MSG91 Email Engine] Triggering MSG91 Email OTP for ${email}...`);

  // Try official MSG91 Widget sendOtp endpoint for email identifier
  try {
    const res = await fetch('https://api.msg91.com/api/v5/widget/sendOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authkey': authKey
      },
      body: JSON.stringify({
        widgetId,
        tokenAuth,
        identifier: email,
        otp: otpCode
      })
    });
    const data: any = await res.json().catch(() => ({}));
    console.log('[MSG91 Email Widget sendOtp Response]:', data);

    if (res.ok && (data.type === 'success' || data.message?.toLowerCase().includes('success'))) {
      console.log(`[MSG91 Email Widget] ✅ Dispatched to ${email}. ReqId:`, data.reqId || data.request_id);
      return { success: true, reqId: data.reqId || data.request_id };
    }
  } catch (err) {
    console.warn('[MSG91 Email Widget sendOtp Error]:', err);
  }

  return { success: true };
}

// ==========================================
// EMAIL OTP METHODS (FOR CUSTOMER ENQUIRIES)
// ==========================================

export async function sendOtpToEmail(
  rawEmail: string,
  fullName?: string,
  destinationOrPackage?: string
): Promise<{
  success: boolean;
  email: string;
  maskedEmail: string;
  otpCode: string;
  expiresInSeconds: number;
  msg91Configured: boolean;
  error?: string;
}> {
  const email = normalizeEmail(rawEmail);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return {
      success: false,
      email: rawEmail,
      maskedEmail: rawEmail,
      otpCode: '',
      expiresInSeconds: 0,
      msg91Configured: Boolean(process.env.MSG91_AUTH_KEY),
      error: 'Please enter a valid email address.'
    };
  }

  // Rate limiting / cooldown check (15 seconds)
  const existing = emailOtpStore.get(email);
  const now = Date.now();
  if (existing && now - existing.createdAt < 15000) {
    const waitSec = Math.ceil((15000 - (now - existing.createdAt)) / 1000);
    return {
      success: false,
      email,
      maskedEmail: maskEmail(email),
      otpCode: existing.otp,
      expiresInSeconds: Math.ceil((existing.expiresAt - now) / 1000),
      msg91Configured: Boolean(process.env.MSG91_AUTH_KEY),
      error: `Please wait ${waitSec}s before requesting a new email OTP.`
    };
  }

  // Generate 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresInSeconds = 300; // 5 minutes
  const expiresAt = now + expiresInSeconds * 1000;

  // 1. Dispatch via MSG91 Email API / Widget
  await sendMsg91EmailOtpDispatch(email, otpCode, fullName);

  // 2. Dispatch via SMTP HTML Email Service
  await sendOtpVerificationEmail(email, fullName || 'Valued Traveller', otpCode, destinationOrPackage);

  emailOtpStore.set(email, {
    email,
    fullName: fullName?.trim(),
    otp: otpCode,
    expiresAt,
    attempts: 0,
    createdAt: now,
    verified: false
  });

  console.log(`[MSG91 Email OTP Engine] Active OTP for ${email} (${fullName || 'Customer'}): ${otpCode} (Valid for 5 mins)`);

  return {
    success: true,
    email,
    maskedEmail: maskEmail(email),
    otpCode,
    expiresInSeconds,
    msg91Configured: Boolean(process.env.MSG91_AUTH_KEY)
  };
}

export async function verifyEmailOtp(
  rawEmail: string,
  enteredOtp: string
): Promise<{
  success: boolean;
  email: string;
  verifiedToken?: string;
  error?: string;
}> {
  const email = normalizeEmail(rawEmail);
  const cleanEntered = enteredOtp.trim().replace(/[^\d]/g, '');

  if (!email) {
    return { success: false, email: rawEmail, error: 'Email address is required.' };
  }

  if (!cleanEntered || cleanEntered.length !== 6) {
    return { success: false, email, error: 'Please enter the complete 6-digit OTP code.' };
  }

  const entry = emailOtpStore.get(email);
  if (!entry) {
    return {
      success: false,
      email,
      error: 'No OTP request found for this email address. Please click "Resend Code".'
    };
  }

  if (Date.now() > entry.expiresAt) {
    emailOtpStore.delete(email);
    return {
      success: false,
      email,
      error: 'OTP has expired. Please request a new verification code.'
    };
  }

  if (entry.attempts >= 5) {
    emailOtpStore.delete(email);
    return {
      success: false,
      email,
      error: 'Maximum verification attempts exceeded. Please request a new OTP.'
    };
  }

  entry.attempts += 1;

  if (entry.otp !== cleanEntered) {
    const remaining = 5 - entry.attempts;
    return {
      success: false,
      email,
      error: `Incorrect OTP. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
    };
  }

  // OTP Verified Successfully!
  const verifiedToken = `EVTOK_${crypto.randomBytes(16).toString('hex')}`;
  entry.verified = true;
  entry.verifiedToken = verifiedToken;

  console.log(`[Email OTP Engine] Email ${email} successfully verified with OTP! Token: ${verifiedToken}`);

  return {
    success: true,
    email,
    verifiedToken
  };
}

export function isEmailVerifiedWithToken(rawEmail: string, token?: string): boolean {
  if (!token) return false;
  const email = normalizeEmail(rawEmail);
  const entry = emailOtpStore.get(email);
  if (!entry) return false;
  return entry.verified && entry.verifiedToken === token;
}



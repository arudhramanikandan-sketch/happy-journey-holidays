/**
 * MSG91 OTP Widget Integration Service
 * Official Web SDK: https://verify.msg91.com/otp-provider.js
 * Supports Mobile and Email OTP verification
 */

export interface Msg91Config {
  widgetId: string;
  tokenAuth: string;
  exposeMethods: boolean;
  captchaRenderId?: string;
  success?: (data: any) => void;
  failure?: (error: any) => void;
}

declare global {
  interface Window {
    initSendOTP?: (config: Msg91Config) => void;
    sendOtp?: (
      identifier: string,
      successCallback?: (response: any) => void,
      failureCallback?: (error: any) => void
    ) => void;
    verifyOtp?: (
      otp: string,
      successCallback?: (response: any) => void,
      failureCallback?: (error: any) => void
    ) => void;
    retryOtp?: (
      channel?: string | number,
      successCallback?: (response: any) => void,
      failureCallback?: (error: any) => void,
      customerReferenceId?: string
    ) => void;
    __msg91SdkInitialized?: boolean;
  }
}

const MSG91_WIDGET_ID = '3669616d5678393137353837';
const MSG91_TOKEN_AUTH = '566604TKkpCn6zG6a96d838P1';
const CAPTCHA_CONTAINER_ID = 'msg91-captcha-container';

/**
 * Ensures the official MSG91 Web SDK is loaded and initialized with exposeMethods: true
 */
export function initializeMsg91Sdk(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    const initWidget = () => {
      if (typeof window.initSendOTP === 'function') {
        try {
          const configuration: Msg91Config = {
            widgetId: MSG91_WIDGET_ID,
            tokenAuth: MSG91_TOKEN_AUTH,
            exposeMethods: true,
            captchaRenderId: CAPTCHA_CONTAINER_ID,
            success: (data: any) => {
              window.__msg91SdkInitialized = true;
              console.log('[MSG91 Diagnostic] SDK initialized successfully.');
            },
            failure: (error: any) => {
              console.warn('[MSG91 Diagnostic] SDK initialization callback:', error);
            }
          };

          window.initSendOTP(configuration);
          window.__msg91SdkInitialized = true;
          console.log('[MSG91 Diagnostic] initSendOTP registered.');
          resolve(true);
        } catch (err) {
          console.warn('[MSG91 Diagnostic] Exception during initSendOTP:', err);
          resolve(false);
        }
      } else {
        console.log('[MSG91 Diagnostic] window.initSendOTP not available yet.');
        resolve(false);
      }
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="otp-provider.js"]');
    if (existingScript) {
      if (typeof window.initSendOTP === 'function') {
        initWidget();
      } else {
        existingScript.addEventListener('load', () => {
          initWidget();
        });
        setTimeout(initWidget, 500);
      }
      return;
    }

    // Dynamically inject official script if not present
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://verify.msg91.com/otp-provider.js';
    script.async = true;
    script.onload = () => {
      initWidget();
    };
    script.onerror = (e) => {
      console.warn('[MSG91 Diagnostic] MSG91 SDK script note:', e);
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

/**
 * Format Indian mobile number to E.164 without '+': e.g. 919876543210
 */
export function formatMsg91Identifier(rawPhone: string): string {
  const digitsOnly = rawPhone.replace(/[^\d]/g, '');
  if (digitsOnly.length === 10) {
    return `91${digitsOnly}`;
  }
  if (digitsOnly.length > 10 && digitsOnly.startsWith('91')) {
    return digitsOnly;
  }
  if (digitsOnly.length >= 10) {
    return `91${digitsOnly.slice(-10)}`;
  }
  return `91${digitsOnly}`;
}

/**
 * Calls MSG91 window.sendOtp with customer mobile number
 */
export async function sendOtpViaMsg91(rawPhone: string): Promise<{
  success: boolean;
  response?: any;
  error?: string;
}> {
  await initializeMsg91Sdk();

  const identifier = formatMsg91Identifier(rawPhone);

  if (!identifier || identifier.length < 12) {
    const err = 'Please provide a valid 10-digit Indian mobile number.';
    return { success: false, error: err };
  }

  return new Promise((resolve) => {
    if (typeof window.sendOtp !== 'function') {
      const err = 'MSG91 OTP Web SDK is not ready. Please refresh the page and try again.';
      console.warn('[MSG91 Diagnostic] sendOtp note:', err);
      resolve({ success: false, error: err });
      return;
    }

    try {
      window.sendOtp(
        identifier,
        (response: any) => {
          console.log('[MSG91 Diagnostic] sendOtp success response:', response);
          resolve({ success: true, response });
        },
        (error: any) => {
          console.warn('[MSG91 Diagnostic] sendOtp note:', error);
          let errorMsg = 'Failed to deliver OTP. Please verify your mobile number or try again.';
          if (typeof error === 'string') {
            errorMsg = error;
          } else if (error && error.message) {
            errorMsg = error.message;
          } else if (error && error.description) {
            errorMsg = error.description;
          } else if (error && error.error) {
            errorMsg = error.error;
          }
          resolve({ success: false, error: errorMsg });
        }
      );
    } catch (err: any) {
      console.warn('[MSG91 Diagnostic] sendOtp exception:', err);
      resolve({
        success: false,
        error: err?.message || 'Error occurred while executing sendOtp.'
      });
    }
  });
}

/**
 * Calls MSG91 window.sendOtp with customer's email address
 */
export async function sendEmailOtpViaMsg91(rawEmail: string): Promise<{
  success: boolean;
  response?: any;
  error?: string;
}> {
  await initializeMsg91Sdk();

  const email = rawEmail.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    const err = 'Please provide a valid email address.';
    return { success: false, error: err };
  }

  return new Promise((resolve) => {
    if (typeof window.sendOtp !== 'function') {
      const err = 'MSG91 OTP Web SDK is not ready.';
      console.log('[MSG91 Email Diagnostic] sendOtp note:', err);
      resolve({ success: false, error: err });
      return;
    }

    try {
      window.sendOtp(
        email,
        (response: any) => {
          console.log('[MSG91 Email Diagnostic] sendOtp response:', response);
          resolve({ success: true, response });
        },
        (error: any) => {
          console.log('[MSG91 Email Diagnostic] sendOtp note:', error);
          let errorMsg = 'Failed to deliver Email OTP. Please check your email or try again.';
          if (typeof error === 'string') {
            errorMsg = error;
          } else if (error && error.message) {
            errorMsg = error.message;
          } else if (error && error.description) {
            errorMsg = error.description;
          } else if (error && error.error) {
            errorMsg = error.error;
          }
          resolve({ success: false, error: errorMsg });
        }
      );
    } catch (err: any) {
      console.log('[MSG91 Email Diagnostic] sendEmailOtp note:', err);
      resolve({
        success: false,
        error: err?.message || 'Error occurred while executing sendEmailOtp.'
      });
    }
  });
}

/**
 * Calls window.verifyOtp with user-entered 6-digit OTP
 */
export async function verifyOtpViaMsg91(otpCode: string): Promise<{
  success: boolean;
  accessToken?: string;
  error?: string;
  rawResponse?: any;
}> {
  const cleanOtp = otpCode.trim().replace(/[^\d]/g, '');
  if (cleanOtp.length !== 6) {
    return { success: false, error: 'Please enter a valid 6-digit OTP code.' };
  }

  return new Promise((resolve) => {
    if (typeof window.verifyOtp !== 'function') {
      const err = 'MSG91 OTP Web SDK verify method not found.';
      console.log('[MSG91 Diagnostic] verifyOtp note:', err);
      resolve({ success: false, error: err });
      return;
    }

    try {
      window.verifyOtp(
        cleanOtp,
        (response: any) => {
          console.log('[MSG91 Diagnostic] verifyOtp response:', response);
          
          let token = '';
          if (typeof response === 'string') {
            token = response;
          } else if (response && typeof response === 'object') {
            token = response['access-token'] || response.access_token || response.accessToken || response.message || response.token || JSON.stringify(response);
          }

          resolve({
            success: true,
            accessToken: token || 'VERIFIED_BY_MSG91_WIDGET',
            rawResponse: response
          });
        },
        (error: any) => {
          console.log('[MSG91 Diagnostic] verifyOtp note:', error);
          let errorMsg = 'Invalid OTP code. Please check and re-enter.';
          if (typeof error === 'string') {
            errorMsg = error;
          } else if (error && error.message) {
            errorMsg = error.message;
          } else if (error && error.description) {
            errorMsg = error.description;
          } else if (error && error.error) {
            errorMsg = error.error;
          }
          resolve({ success: false, error: errorMsg });
        }
      );
    } catch (err: any) {
      console.log('[MSG91 Diagnostic] verifyOtp note:', err);
      resolve({
        success: false,
        error: err?.message || 'Error occurred while verifying OTP.'
      });
    }
  });
}

/**
 * Calls window.retryOtp for resending OTP
 */
export async function retryOtpViaMsg91(channel?: string | number): Promise<{
  success: boolean;
  response?: any;
  error?: string;
}> {
  return new Promise((resolve) => {
    if (typeof window.retryOtp !== 'function') {
      resolve({ success: false, error: 'retryOtp method not available' });
      return;
    }

    try {
      window.retryOtp(
        channel || 11, // 11 is SMS channel
        (response: any) => {
          console.log('[MSG91 Diagnostic] retryOtp response:', response);
          resolve({ success: true, response });
        },
        (error: any) => {
          console.log('[MSG91 Diagnostic] retryOtp note:', error);
          let errorMsg = 'Failed to resend OTP.';
          if (typeof error === 'string') {
            errorMsg = error;
          } else if (error && error.message) {
            errorMsg = error.message;
          } else if (error && error.description) {
            errorMsg = error.description;
          } else if (error && error.error) {
            errorMsg = error.error;
          }
          resolve({ success: false, error: errorMsg });
        }
      );
    } catch (err: any) {
      console.log('[MSG91 Diagnostic] retryOtp note:', err);
      resolve({ success: false, error: err?.message || 'Failed to resend OTP' });
    }
  });
}

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  X, 
  Phone, 
  Lock, 
  ArrowRight, 
  RefreshCw, 
  Loader2, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { 
  sendOtpViaMsg91, 
  verifyOtpViaMsg91, 
  retryOtpViaMsg91,
  formatMsg91Identifier 
} from '../utils/msg91Widget';

interface OtpVerificationModalProps {
  isOpen: boolean;
  phone: string;
  fullName: string;
  destinationOrPackage?: string;
  onClose: () => void;
  onVerified: (token: string) => Promise<void> | void;
}

export const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  isOpen,
  phone,
  fullName,
  destinationOrPackage,
  onClose,
  onVerified
}) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [loadingSend, setLoadingSend] = useState<boolean>(false);
  const [loadingVerify, setLoadingVerify] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [resendCountdown, setResendCountdown] = useState<number>(0);
  const [maskedPhone, setMaskedPhone] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Trigger send OTP when opened
  useEffect(() => {
    if (isOpen && phone) {
      setDigits(['', '', '', '', '', '']);
      setErrorMessage('');
      setIsSuccess(false);
      setResendCountdown(0);
      handleSendOtp();
    }
  }, [isOpen, phone]);

  // Countdown timer for resend
  useEffect(() => {
    if (!isOpen || resendCountdown <= 0) return;
    const timer = setInterval(() => {
      setResendCountdown(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, resendCountdown]);

  // Auto-focus first input box after modal opens
  useEffect(() => {
    if (isOpen && !isSuccess) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 200);
    }
  }, [isOpen, isSuccess]);

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    setLoadingSend(true);
    setErrorMessage('');
    try {
      const formatted = formatMsg91Identifier(phone);
      const masked = `+91 ${formatted.slice(2, 4)}•••• ••${formatted.slice(-2)}`;
      setMaskedPhone(masked);

      // Call official MSG91 sendOtp method
      const result = await sendOtpViaMsg91(phone);

      if (result.success) {
        // Start resend countdown ONLY when sendOtp succeeds
        setResendCountdown(30);
      } else {
        // Do NOT start timer on failure
        setResendCountdown(0);
        setErrorMessage(result.error || 'Failed to send OTP. Please try again.');
      }
    } catch (err: any) {
      console.error('[MSG91 Diagnostic] Error sending OTP:', err);
      setResendCountdown(0);
      setErrorMessage(err?.message || 'Network error while requesting OTP.');
    } finally {
      setLoadingSend(false);
    }
  };

  const handleRetryOtp = async () => {
    if (resendCountdown > 0 || loadingSend) return;
    setLoadingSend(true);
    setErrorMessage('');
    try {
      // First attempt retryOtp via MSG91 SDK
      const retryResult = await retryOtpViaMsg91(11);
      if (retryResult.success) {
        setResendCountdown(30);
      } else {
        // Fallback to sendOtp if retry is not available
        const sendResult = await sendOtpViaMsg91(phone);
        if (sendResult.success) {
          setResendCountdown(30);
        } else {
          setResendCountdown(0);
          setErrorMessage(sendResult.error || retryResult.error || 'Failed to resend OTP.');
        }
      }
    } catch (err: any) {
      console.error('[MSG91 Diagnostic] Resend error:', err);
      setResendCountdown(0);
      setErrorMessage(err?.message || 'Error occurred while resending OTP.');
    } finally {
      setLoadingSend(false);
    }
  };

  const handleDigitChange = (index: number, val: string) => {
    const numeric = val.replace(/[^\d]/g, '');
    if (!numeric && val !== '') return;

    const newDigits = [...digits];

    if (numeric.length > 1) {
      // Handle paste of multi-digit string
      const pastedDigits = numeric.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pastedDigits[i] || '';
      }
      setDigits(newDigits);
      const nextFocus = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    newDigits[index] = numeric;
    setDigits(newDigits);
    setErrorMessage('');

    // Advance to next box if digit entered
    if (numeric && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^\d]/g, '').slice(0, 6);
    if (pastedData) {
      const newDigits = [...digits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pastedData[i] || '';
      }
      setDigits(newDigits);
      const nextFocus = Math.min(pastedData.length, 5);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = digits.join('');
    if (code.length !== 6) {
      setErrorMessage('Please enter all 6 digits of the OTP verification code.');
      return;
    }

    setLoadingVerify(true);
    setErrorMessage('');

    try {
      const verifyResult = await verifyOtpViaMsg91(code);

      if (verifyResult.success && verifyResult.accessToken) {
        setIsSuccess(true);
        setTimeout(async () => {
          await onVerified(verifyResult.accessToken!);
        }, 500);
      } else {
        setErrorMessage(verifyResult.error || 'Invalid OTP code. Please check and re-enter.');
      }
    } catch (err: any) {
      console.error('[MSG91 Diagnostic] Error verifying OTP:', err);
      setErrorMessage(err?.message || 'Failed to verify OTP. Please check your internet connection.');
    } finally {
      setLoadingVerify(false);
    }
  };

  const isComplete = digits.every(d => d.length === 1);

  return (
    <div 
      id="otp-verification-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loadingVerify) onClose();
      }}
    >
      <div 
        id="otp-verification-dialog"
        className="bg-[#001529] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#002b54] animate-in zoom-in-95 duration-200 text-white"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#000814] to-[#001f3f] p-5 text-white flex items-center justify-between border-b border-[#002b54]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#F27D26]/20 border border-[#F27D26]/40 flex items-center justify-center text-[#F27D26]">
              <Lock size={15} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F27D26]">
                Secure Mobile Verification
              </span>
              <h3 className="text-base font-heading font-bold text-white leading-tight">
                Verify Your Mobile Number
              </h3>
            </div>
          </div>
          <button
            id="close-otp-dialog-btn"
            onClick={onClose}
            disabled={loadingVerify}
            className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition disabled:opacity-50"
            title="Cancel and close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {isSuccess ? (
            <div className="text-center py-6 space-y-3 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-950 text-emerald-400 border border-emerald-700/60 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-lg font-heading font-bold text-white">Mobile Verified!</h4>
              <p className="text-xs text-slate-300">
                Submitting your trip enquiry for <strong className="text-white">{destinationOrPackage || 'your holiday'}</strong>...
              </p>
              <Loader2 size={20} className="animate-spin text-[#F27D26] mx-auto mt-2" />
            </div>
          ) : (
            <>
              {/* Instructions */}
              <div className="text-center space-y-1">
                <p className="text-xs text-slate-300">
                  We have sent a 6-digit OTP to verify your WhatsApp / Mobile number:
                </p>
                <div className="inline-flex items-center gap-1.5 bg-[#000e1f] border border-[#002b54] px-3 py-1 rounded-full text-xs font-mono font-bold text-[#F27D26]">
                  <Phone size={12} className="text-[#F27D26]" />
                  <span>{maskedPhone || phone}</span>
                </div>
              </div>

              {/* Captcha container element for MSG91 reCaptcha */}
              <div id="msg91-captcha-container" className="flex justify-center my-1 empty:hidden"></div>

              {/* Error Box */}
              {errorMessage && (
                <div className="flex items-start gap-2 bg-red-950/60 border border-red-800/80 rounded-xl p-3 text-red-200 text-xs animate-in fade-in">
                  <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 6 Digit Input Boxes */}
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-2.5">
                    Enter 6-Digit OTP
                  </label>
                  <div className="flex items-center justify-center gap-2" onPaste={handlePaste}>
                    {digits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (inputRefs.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        id={`otp-digit-input-${idx}`}
                        className={`w-11 h-12 text-center text-xl font-bold font-mono rounded-xl border transition focus:outline-none focus:ring-2 ${
                          digit
                            ? 'bg-[#002447] border-[#F27D26] text-white focus:ring-[#F27D26]'
                            : 'bg-[#000e1f] border-[#002b54] text-white focus:border-[#F27D26] focus:ring-[#F27D26]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Resend & Edit Number Bar */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-200 underline decoration-slate-600 cursor-pointer"
                  >
                    Edit Phone Number
                  </button>

                  <button
                    type="button"
                    onClick={handleRetryOtp}
                    disabled={resendCountdown > 0 || loadingSend}
                    id="resend-otp-btn"
                    className="inline-flex items-center gap-1 text-[#F27D26] hover:text-[#d96c1e] disabled:text-slate-500 font-semibold cursor-pointer disabled:cursor-not-allowed"
                  >
                    <RefreshCw size={12} className={loadingSend ? 'animate-spin' : ''} />
                    <span>
                      {loadingSend
                        ? 'Sending...'
                        : resendCountdown > 0
                        ? `Resend in ${resendCountdown}s`
                        : 'Resend OTP'}
                    </span>
                  </button>
                </div>

                {/* Verify CTA */}
                <button
                  type="submit"
                  disabled={!isComplete || loadingVerify}
                  id="confirm-verify-otp-btn"
                  className="w-full bg-[#F27D26] hover:bg-[#d96c1e] text-white font-extrabold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingVerify ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Verifying & Submitting...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      <span>Verify & Submit Enquiry</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* Privacy Trust Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1 text-center">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Happy Journey Holidays — 100% Genuine Enquiry Verification</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


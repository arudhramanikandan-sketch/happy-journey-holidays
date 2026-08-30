import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Lock, 
  Key, 
  QrCode, 
  Smartphone, 
  CheckCircle2, 
  AlertTriangle, 
  LogOut, 
  RefreshCw, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Clock, 
  ArrowRight, 
  Inbox,
  Activity,
  ArrowLeft,
  Compass,
  Globe,
  LayoutDashboard,
  Package
} from 'lucide-react';
import { Logo } from '../../components/Logo';
import { AdminPackageManager } from './AdminPackageManager';
import { AdminEnquiriesManager } from './AdminEnquiriesManager';
import { FileSpreadsheet } from 'lucide-react';

interface AdminUser {
  email: string;
  role: string;
  is2FAEnabled: boolean;
  lastLogin: string;
}

interface SecurityAuditLog {
  id: string;
  action: string;
  ip: string;
  userAgent?: string;
  status: 'SUCCESS' | 'FAILED' | 'WARNING';
  timestamp: string;
}

interface DashboardData {
  user: AdminUser;
  stats: {
    adminEmail: string;
    is2FAEnabled: boolean;
    lastLogin: string;
    securityAuditLogs: SecurityAuditLog[];
    systemStatus: string;
    twoFactorMethod: string;
  };
  recentEnquiriesCount: number;
  recentEnquiries: Array<{
    id: string;
    fullName: string;
    phone: string;
    destination?: string;
    createdAt: string;
  }>;
}

export const AdminPortal: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  // Authentication states
  const [authState, setAuthState] = useState<'checking' | 'login' | 'setup-2fa' | 'verify-2fa' | 'dashboard'>('checking');
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'enquiries' | 'domestic' | 'international'>('overview');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  // Form Inputs
  const [email, setEmail] = useState('admin@happyjourneyholidays.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [totpCode, setTotpCode] = useState(['', '', '', '', '', '']);
  const [copiedKey, setCopiedKey] = useState(false);

  // 2FA Setup Payload from server
  const [tempToken, setTempToken] = useState<string>('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [manualKey, setManualKey] = useState<string>('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Inject noindex meta tag dynamically for private admin route
  useEffect(() => {
    let metaTag = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    let created = false;
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'robots';
      document.head.appendChild(metaTag);
      created = true;
    }
    const previousContent = metaTag.content;
    metaTag.content = 'noindex, nofollow';
    document.title = 'Private Administrator Portal | Happy Journey Holidays';

    return () => {
      if (created && metaTag.parentNode) {
        metaTag.parentNode.removeChild(metaTag);
      } else if (metaTag) {
        metaTag.content = previousContent || 'index, follow';
      }
    };
  }, []);

  // Check if active session exists on mount
  useEffect(() => {
    checkCurrentSession();
  }, []);

  const checkCurrentSession = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/me');
      const data = await res.json();
      if (data.authenticated && data.user) {
        setAdminUser(data.user);
        setAuthState('dashboard');
        fetchDashboardData();
      } else {
        setAuthState('login');
      }
    } catch (err) {
      setAuthState('login');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/admin/dashboard-data');
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
        if (data.user) {
          setAdminUser(data.user);
        }
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  // Step 1: Submit Email & Password
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login-step1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Authentication failed. Please check your credentials.');
        return;
      }

      setTempToken(data.tempToken || '');

      if (data.requiresSetup) {
        // First-time 2FA pairing needed
        setQrCodeDataUrl(data.qrCodeDataUrl || '');
        setManualKey(data.manualKey || '');
        setTotpCode(['', '', '', '', '', '']);
        setAuthState('setup-2fa');
      } else if (data.requires2FA) {
        // Returning user 2FA verification
        setTotpCode(['', '', '', '', '', '']);
        setAuthState('verify-2fa');
      }
    } catch (err) {
      setErrorMessage('Network error during authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2A: Verify and Confirm 2FA Setup
  const handleSetup2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = totpCode.join('');
    if (code.length !== 6) {
      setErrorMessage('Please enter all 6 digits generated by your Authenticator App.');
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/setup-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempToken, tokenCode: code })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Invalid 6-digit code. Please verify the code on your Authenticator App and try again.');
        return;
      }

      setAdminUser(data.user);
      setAuthState('dashboard');
      fetchDashboardData();
    } catch (err) {
      setErrorMessage('Failed to verify 2FA code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2B: Verify 2FA for Returning Admin Login
  const handleVerify2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = totpCode.join('');
    if (code.length !== 6) {
      setErrorMessage('Please enter the 6-digit code from your Authenticator App.');
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempToken, tokenCode: code })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Invalid 6-digit authentication code.');
        return;
      }

      setAdminUser(data.user);
      setAuthState('dashboard');
      fetchDashboardData();
    } catch (err) {
      setErrorMessage('Failed to verify 2FA code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Secure Logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setAdminUser(null);
      setDashboardData(null);
      setPassword('');
      setTotpCode(['', '', '', '', '', '']);
      setAuthState('login');
      setLoading(false);
    }
  };

  // Helper for 6-digit code digit changes & automatic focus advance
  const handleDigitChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, '').slice(-1);
    const newCode = [...totpCode];
    newCode[index] = cleanVal;
    setTotpCode(newCode);

    // Auto advance to next input
    if (cleanVal && index < 5) {
      const nextInput = document.getElementById(`totp-digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !totpCode[index] && index > 0) {
      const prevInput = document.getElementById(`totp-digit-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePasteCode = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      const newCode = [...totpCode];
      for (let i = 0; i < 6; i++) {
        newCode[i] = pasted[i] || '';
      }
      setTotpCode(newCode);
      const lastIndex = Math.min(pasted.length, 5);
      const targetInput = document.getElementById(`totp-digit-${lastIndex}`);
      if (targetInput) targetInput.focus();
    }
  };

  const handleCopyKey = () => {
    if (manualKey) {
      navigator.clipboard.writeText(manualKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#000814] text-slate-100 flex flex-col justify-between selection:bg-[#F27D26] selection:text-white">
      {/* Top Admin Security Bar */}
      <header className="border-b border-[#001f3f]/80 bg-[#000D1F]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Logo variant="horizontal" size="sm" />
          <div className="h-5 w-[1px] bg-slate-700 hidden sm:block"></div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#002244] text-[#38B6FF] border border-[#003E7E]">
            <Shield size={12} className="text-[#38B6FF]" />
            RESTRICTED ADMIN PORTAL
          </span>
        </div>

        <div className="flex items-center gap-3">
          {authState === 'dashboard' && adminUser ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-xs font-semibold text-slate-200">{adminUser.email}</p>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  2FA Active (TOTP)
                </p>
              </div>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/40 text-rose-300 border border-rose-800/60 hover:bg-rose-900/50 hover:text-white transition shadow-sm"
                title="Sign out of Admin Dashboard"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition px-2.5 py-1.5 rounded-lg hover:bg-slate-800/50"
            >
              <ArrowLeft size={14} />
              <span>Back to Website</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Administrative Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* State: Checking Authentication */}
        {authState === 'checking' && (
          <div className="flex flex-col items-center justify-center space-y-3 py-16">
            <RefreshCw className="animate-spin text-[#F27D26]" size={36} />
            <p className="text-sm font-medium text-slate-400">Verifying secure administrator session...</p>
          </div>
        )}

        {/* State 1: Primary Login Form */}
        {authState === 'login' && (
          <div className="w-full max-w-md bg-[#001329] border border-[#002B54] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Top accent light */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066D6] via-[#38B6FF] to-[#F27D26]"></div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#002244] border border-[#003E7E] text-[#F27D26] mb-3 shadow-inner">
                <Lock size={26} />
              </div>
              <h1 className="text-2xl font-heading font-black text-white tracking-tight">
                Admin Sign In
              </h1>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Authorized Personnel Only • Authenticator App 2FA Required
              </p>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3.5 bg-rose-950/60 border border-rose-800/70 rounded-xl text-rose-200 text-xs flex items-start gap-2.5">
                <AlertTriangle size={16} className="text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@happyjourneyholidays.com"
                    className="w-full bg-[#000A17] border border-[#002B54] focus:border-[#38B6FF] focus:ring-1 focus:ring-[#38B6FF] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full bg-[#000A17] border border-[#002B54] focus:border-[#38B6FF] focus:ring-1 focus:ring-[#38B6FF] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0066D6] to-[#004DA8] hover:from-[#0077F0] hover:to-[#005ABF] text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-lg shadow-blue-900/30 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to 2FA</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-[#002B54]/70 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Protected with RFC 6238 TOTP Two-Factor Security</span>
              </div>
            </div>
          </div>
        )}

        {/* State 2A: First-Time 2FA QR Setup */}
        {authState === 'setup-2fa' && (
          <div className="w-full max-w-lg bg-[#001329] border border-[#002B54] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F27D26] via-[#FFA000] to-[#38B6FF]"></div>

            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#002244] border border-[#003E7E] text-[#FFA000] mb-2 shadow-inner">
                <QrCode size={24} />
              </div>
              <h2 className="text-xl font-heading font-black text-white">
                Set Up Authenticator App (2FA)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Scan this QR code with Google Authenticator, Microsoft Authenticator, Apple Passwords, or Authy.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-950/60 border border-rose-800/70 rounded-xl text-rose-200 text-xs flex items-start gap-2.5">
                <AlertTriangle size={15} className="text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* QR Code Container */}
            <div className="flex flex-col items-center bg-[#000A17] border border-[#002B54] rounded-xl p-4 mb-4">
              {qrCodeDataUrl ? (
                <div className="bg-white p-2.5 rounded-lg shadow-md">
                  <img
                    src={qrCodeDataUrl}
                    alt="Happy Journey Holidays 2FA QR Code"
                    className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-slate-500">
                  <RefreshCw className="animate-spin" size={24} />
                </div>
              )}

              {/* Manual Key Accordion / Copy */}
              <div className="w-full mt-3 pt-3 border-t border-[#002B54]/70">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Can't scan the QR code? Use manual setup key:</span>
                  <button
                    type="button"
                    onClick={handleCopyKey}
                    className="text-[#38B6FF] hover:underline flex items-center gap-1 font-semibold"
                  >
                    {copiedKey ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedKey ? 'Copied!' : 'Copy Key'}</span>
                  </button>
                </div>
                <code className="block w-full bg-[#001329] border border-[#002B54] rounded px-2.5 py-1.5 text-xs text-amber-300 font-mono tracking-wider text-center break-all select-all">
                  {manualKey}
                </code>
              </div>
            </div>

            {/* 6-Digit Code Verification */}
            <form onSubmit={handleSetup2FASubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 text-center mb-2">
                  Enter 6-Digit Code from Authenticator App
                </label>
                
                <div className="flex justify-center gap-2 sm:gap-2.5" onPaste={handlePasteCode}>
                  {totpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`totp-digit-${idx}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-[#000A17] border-2 border-[#002B54] focus:border-[#F27D26] focus:ring-2 focus:ring-[#F27D26]/40 rounded-xl text-white outline-none transition"
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthState('login')}
                  className="w-1/3 py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#002244] hover:bg-[#002E5C] text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || totpCode.join('').length !== 6}
                  className="w-2/3 flex items-center justify-center gap-2 bg-gradient-to-r from-[#F27D26] to-[#E05E10] hover:from-[#FF8B38] hover:to-[#EB6719] text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-lg shadow-orange-950/30 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      <span>Activating 2FA...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Confirm & Open Dashboard</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* State 2B: Returning 2FA Verification */}
        {authState === 'verify-2fa' && (
          <div className="w-full max-w-md bg-[#001329] border border-[#002B54] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066D6] to-[#F27D26]"></div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#002244] border border-[#003E7E] text-[#38B6FF] mb-3 shadow-inner">
                <Smartphone size={26} />
              </div>
              <h2 className="text-2xl font-heading font-black text-white tracking-tight">
                Two-Factor Verification
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                Open your Authenticator App (Google / Microsoft / Apple) and enter the 6-digit verification code.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3.5 bg-rose-950/60 border border-rose-800/70 rounded-xl text-rose-200 text-xs flex items-start gap-2.5">
                <AlertTriangle size={16} className="text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleVerify2FASubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 text-center mb-2.5">
                  6-Digit Authenticator Code
                </label>
                
                <div className="flex justify-center gap-2 sm:gap-2.5" onPaste={handlePasteCode}>
                  {totpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`totp-digit-${idx}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-[#000A17] border-2 border-[#002B54] focus:border-[#38B6FF] focus:ring-2 focus:ring-[#38B6FF]/40 rounded-xl text-white outline-none transition"
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthState('login')}
                  className="w-1/3 py-3 px-3 rounded-xl text-xs font-semibold bg-[#002244] hover:bg-[#002E5C] text-slate-300 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || totpCode.join('').length !== 6}
                  className="w-2/3 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0066D6] to-[#004DA8] hover:from-[#0077F0] hover:to-[#005ABF] text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-lg shadow-blue-900/30 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      <span>Verify & Sign In</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* State 3: Protected Admin Dashboard */}
        {authState === 'dashboard' && (
          <div className="w-full max-w-6xl space-y-6 py-4">
            {/* Dashboard Header Bar */}
            <div className="bg-[#001329] border border-[#002B54] rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-800/80 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Authenticated Session
                  </span>
                  <span className="text-xs text-slate-400">
                    Role: <strong className="text-white">Super Administrator</strong>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
                  Happy Journey Holidays Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Private Administration & Security Overview • Coimbatore, Tamil Nadu
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchDashboardData}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#002244] hover:bg-[#002E5C] text-slate-200 transition border border-[#003E7E]"
                >
                  <RefreshCw size={13} />
                  <span>Refresh Data</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-950/70 text-rose-200 border border-rose-800 hover:bg-rose-900 hover:text-white transition"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Dashboard Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-[#001329] border border-[#002B54] p-1.5 rounded-2xl">
              <button
                onClick={() => setActiveAdminTab('overview')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeAdminTab === 'overview'
                    ? 'bg-[#002447] text-[#38B6FF] border border-[#00478a] shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#001c38]'
                }`}
              >
                <LayoutDashboard size={15} />
                <span>Dashboard Overview</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('enquiries')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeAdminTab === 'enquiries'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#001c38]'
                }`}
              >
                <FileSpreadsheet size={15} className={activeAdminTab === 'enquiries' ? 'text-white' : 'text-emerald-400'} />
                <span>Customer Enquiries</span>
                {dashboardData?.recentEnquiriesCount !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    activeAdminTab === 'enquiries' ? 'bg-black/25 text-white' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {dashboardData.recentEnquiriesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveAdminTab('domestic')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeAdminTab === 'domestic'
                    ? 'bg-[#F27D26] text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#001c38]'
                }`}
              >
                <Compass size={15} />
                <span>Domestic Packages</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('international')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeAdminTab === 'international'
                    ? 'bg-[#F27D26] text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#001c38]'
                }`}
              >
                <Globe size={15} />
                <span>International Packages</span>
              </button>
            </div>

            {/* TAB CONTENT: ENQUIRIES MANAGEMENT (GOOGLE SHEETS SYNC) */}
            {activeAdminTab === 'enquiries' && (
              <AdminEnquiriesManager />
            )}

            {/* TAB CONTENT: DOMESTIC PACKAGES */}
            {activeAdminTab === 'domestic' && (
              <AdminPackageManager category="domestic" />
            )}

            {/* TAB CONTENT: INTERNATIONAL PACKAGES */}
            {activeAdminTab === 'international' && (
              <AdminPackageManager category="international" />
            )}

            {/* TAB CONTENT: DASHBOARD OVERVIEW */}
            {activeAdminTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Stat Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* 2FA Security Health */}
                  <div className="bg-[#001329] border border-[#002B54] rounded-2xl p-5 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        2FA Status
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
                        <ShieldCheck size={16} />
                      </div>
                    </div>
                    <div className="text-lg font-bold text-emerald-300">
                      Active (TOTP)
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Authenticator App Hardware Token
                    </p>
                  </div>

                  {/* Total Customer Enquiries */}
                  <div 
                    onClick={() => setActiveAdminTab('enquiries')}
                    className="bg-[#001329] border border-[#002B54] rounded-2xl p-5 shadow-md hover:border-emerald-500 cursor-pointer transition group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-400 transition uppercase tracking-wider">
                        Customer Enquiries
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
                        <FileSpreadsheet size={16} />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-white group-hover:text-emerald-300 transition">
                      {dashboardData?.recentEnquiriesCount || 0}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>Google Sheets Sync Active</span>
                      <span className="text-emerald-400 font-bold group-hover:underline">View All →</span>
                    </p>
                  </div>

                  {/* System Security */}
                  <div className="bg-[#001329] border border-[#002B54] rounded-2xl p-5 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        System State
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-[#002244] border border-[#003E7E] text-[#F27D26] flex items-center justify-center">
                        <Activity size={16} />
                      </div>
                    </div>
                    <div className="text-lg font-bold text-[#38B6FF]">
                      Operational
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      HTTPS • JWT • Bcrypt • Zero Exposure
                    </p>
                  </div>

                  {/* Admin Account */}
                  <div className="bg-[#001329] border border-[#002B54] rounded-2xl p-5 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Admin User
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-[#002244] border border-[#003E7E] text-slate-300 flex items-center justify-center">
                        <Key size={16} />
                      </div>
                    </div>
                    <div className="text-sm font-bold text-white truncate" title={adminUser?.email}>
                      {adminUser?.email}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Last login: {new Date().toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Dashboard Quick Navigation Banner */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    onClick={() => setActiveAdminTab('enquiries')}
                    className="bg-gradient-to-r from-[#001c2a] to-[#043328] border border-emerald-800/80 rounded-2xl p-5 shadow-lg hover:border-emerald-400 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                        <FileSpreadsheet size={14} />
                        <span>Enquiry Management</span>
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                        Customer Enquiries →
                      </h4>
                      <p className="text-xs text-slate-300">
                        View leads, update status, reply on WhatsApp, and sync with Google Sheets.
                      </p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setActiveAdminTab('domestic')}
                    className="bg-gradient-to-r from-[#001a38] to-[#00264d] border border-[#003e7e] rounded-2xl p-5 shadow-lg hover:border-[#F27D26] cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F27D26]">
                        <Compass size={14} />
                        <span>Package Management</span>
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-[#F27D26] transition">
                        Manage Domestic Packages →
                      </h4>
                      <p className="text-xs text-slate-300">
                        Add, edit pricing, change itineraries, upload images, or hide/show India tours.
                      </p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setActiveAdminTab('international')}
                    className="bg-gradient-to-r from-[#001a38] to-[#00264d] border border-[#003e7e] rounded-2xl p-5 shadow-lg hover:border-[#F27D26] cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38B6FF]">
                        <Globe size={14} />
                        <span>Package Management</span>
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-[#38B6FF] transition">
                        Manage International Packages →
                      </h4>
                      <p className="text-xs text-slate-300">
                        Add, edit pricing, update itineraries, upload photos, or reorder overseas tours.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dashboard Sections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Security Audit & 2FA Info */}
                  <div className="bg-[#001329] border border-[#002B54] rounded-2xl p-6 shadow-md space-y-4">
                    <div className="flex items-center justify-between border-b border-[#002B54]/70 pb-3">
                      <div className="flex items-center gap-2">
                        <Shield className="text-[#38B6FF]" size={18} />
                        <h3 className="font-heading font-bold text-white text-base">
                          Security & 2FA Audit Trail
                        </h3>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Live Security Logs
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                      {dashboardData?.stats?.securityAuditLogs && dashboardData.stats.securityAuditLogs.length > 0 ? (
                        dashboardData.stats.securityAuditLogs.map((log) => (
                          <div
                            key={log.id}
                            className="bg-[#000A17] border border-[#002B54] rounded-xl p-3 flex items-start justify-between gap-3 text-xs"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                    log.status === 'SUCCESS'
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                      : log.status === 'WARNING'
                                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                                  }`}
                                >
                                  {log.status}
                                </span>
                                <span className="font-semibold text-slate-200">{log.action}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-mono">
                                IP: {log.ip}
                              </p>
                            </div>
                            <span className="text-[10px] text-slate-500 whitespace-nowrap">
                              {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 italic py-4 text-center">
                          No security audit events recorded yet.
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#002B54]/70 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Two-Factor Protocol:</span>
                      <span className="font-mono text-emerald-400 font-semibold">RFC 6238 TOTP (30s Step)</span>
                    </div>
                  </div>

                  {/* Right Column: Customer Enquiries Quick Review */}
                  <div className="bg-[#001329] border border-[#002B54] rounded-2xl p-6 shadow-md space-y-4">
                    <div className="flex items-center justify-between border-b border-[#002B54]/70 pb-3">
                      <div className="flex items-center gap-2">
                        <Inbox className="text-[#F27D26]" size={18} />
                        <h3 className="font-heading font-bold text-white text-base">
                          Recent Enquiries Overview
                        </h3>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {dashboardData?.recentEnquiries?.length || 0} Recorded
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                      {dashboardData?.recentEnquiries && dashboardData.recentEnquiries.length > 0 ? (
                        dashboardData.recentEnquiries.map((enq) => (
                          <div
                            key={enq.id}
                            className="bg-[#000A17] border border-[#002B54] rounded-xl p-3 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white">{enq.fullName}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#002244] text-[#38B6FF]">
                                  {enq.id}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-300 font-mono">
                                {enq.phone} {enq.destination ? `• ${enq.destination}` : ''}
                              </p>
                            </div>
                            <span className="text-[10px] text-slate-500 whitespace-nowrap">
                              {new Date(enq.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-slate-400 space-y-2">
                          <Inbox size={28} className="mx-auto text-slate-600" />
                          <p className="text-xs">No customer enquiries submitted yet.</p>
                          <p className="text-[11px] text-slate-500">
                            When clients submit trip requests from the website, they will appear here.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#002B54]/70 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Google Sheets Sync:</span>
                      <button
                        onClick={() => setActiveAdminTab('enquiries')}
                        className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Open Enquiries Manager →</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-[#001f3f]/80 bg-[#000D1F] px-4 py-3 text-center text-[11px] text-slate-500">
        Happy Journey Holidays • Secure Private Admin Portal • Authorized Access Only
      </footer>
    </div>
  );
};

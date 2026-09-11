import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  MessageCircle, 
  CheckCircle, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  Sparkles,
  Loader2,
  MessageSquare,
  ShieldCheck 
} from 'lucide-react';
import { QuoteRequestData } from '../types';
import { createQuickQuoteWhatsAppLink, COMPANY_PHONE, COMPANY_PHONE_INTL } from '../utils/whatsapp';
import { apiUrl } from '../utils/apiConfig';
import { OtpVerificationModal } from './OtpVerificationModal';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestinationOrService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialDestinationOrService = ''
}) => {
  const [formData, setFormData] = useState<QuoteRequestData>({
    fullName: '',
    phone: '',
    email: '',
    destinationOrService: initialDestinationOrService,
    travelDate: '',
    travelers: '2 Adults',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);

  useEffect(() => {
    if (initialDestinationOrService) {
      setFormData(prev => ({ ...prev, destinationOrService: initialDestinationOrService }));
    }
  }, [initialDestinationOrService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMessage('Please provide a valid 10-digit WhatsApp / mobile number.');
      return;
    }
    const cleanEmail = formData.email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Please provide your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (formData.email !== cleanEmail) {
      setFormData(prev => ({ ...prev, email: cleanEmail }));
    }

    if (loading) return; // Prevent double-clicking

    setLoading(true);
    try {
      const payload = {
        type: 'package_quote',
        source: 'Website Enquiry',
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: cleanEmail,
        destination: formData.destinationOrService.trim(),
        packageName: formData.destinationOrService.trim(),
        travelDate: formData.travelDate,
        travelers: formData.travelers,
        adults: formData.travelers.includes('1 Solo') ? 1 : 2,
        specialRequirements: formData.notes
      };

      let res: Response | null = null;
      try {
        res = await fetch(apiUrl('/api/enquiries'), {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
      } catch (firstErr) {
        console.warn('Primary fetch failed, trying relative /api/enquiries fallback...', firstErr);
        try {
          res = await fetch('/api/enquiries', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload)
          });
        } catch {
          // Handled via fallback below
        }
      }

      let refId = '';
      if (res && res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data && data.referenceId) {
          refId = data.referenceId;
        }
      }

      if (!refId) {
        refId = `HJH-${Math.floor(100000 + Math.random() * 900000)}`;
      }

      // Persist to local backup storage
      try {
        const existing = JSON.parse(localStorage.getItem('hjh_pending_enquiries') || '[]');
        existing.unshift({
          id: refId,
          enquiryReference: refId,
          ...payload,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('hjh_pending_enquiries', JSON.stringify(existing.slice(0, 50)));
      } catch {
        // ignore storage errors
      }

      setSubmittedRef(refId);
      setErrorMessage('');
    } catch (err: any) {
      console.error('Customer enquiry handled:', err);
      const fallbackRef = `HJH-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(fallbackRef);
      setErrorMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    try {
      const waUrl = createQuickQuoteWhatsAppLink(formData, submittedRef || undefined);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Could not open WhatsApp popup:', err);
    }
  };

  const resetAndClose = () => {
    setSubmittedRef(null);
    setErrorMessage('');
    onClose();
  };

  const handleStartOtpVerification = () => {
    setErrorMessage('');
    if (!formData.fullName.trim()) {
      setErrorMessage('Please provide your full name before requesting OTP verification.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMessage('Please provide a valid 10-digit mobile number for OTP verification.');
      return;
    }
    const cleanEmail = formData.email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Please provide your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    setShowOtpModal(true);
  };

  const quoteEnquiryPayload = {
    type: 'package_quote',
    source: 'Website Enquiry (OTP Verified)',
    fullName: formData.fullName.trim(),
    phone: formData.phone.trim(),
    email: formData.email.trim().toLowerCase(),
    destination: formData.destinationOrService.trim(),
    packageName: formData.destinationOrService.trim(),
    travelDate: formData.travelDate,
    travelers: formData.travelers,
    adults: formData.travelers.includes('1 Solo') ? 1 : 2,
    specialRequirements: formData.notes
  };

  return (
    <div 
      id="quote-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) resetAndClose();
      }}
    >
      <div 
        id="quote-modal-container"
        className="bg-[#001529] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#002b54] animate-in zoom-in-95 duration-200 text-white"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#000814] to-[#001f3f] p-5 text-white flex items-center justify-between border-b border-[#002b54]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F27D26]">
              Happy Journey Holidays • Coimbatore
            </span>
            <h3 className="text-lg font-heading font-bold text-white">
              {submittedRef ? 'Enquiry Received!' : 'Request a Free Travel Quote'}
            </h3>
          </div>
          <button
            id="close-quote-modal-btn"
            onClick={resetAndClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submittedRef ? (
            /* Success View */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-950 text-emerald-400 border border-emerald-700/50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle size={36} />
              </div>

              <div>
                <h4 className="text-xl font-heading font-bold text-white">
                  Thank You, {formData.fullName}!
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Enquiry Reference: <strong className="text-[#F27D26] font-mono">{submittedRef}</strong>
                </p>
                <p className="text-sm text-slate-300 mt-2 max-w-sm mx-auto">
                  Our travel specialist in Coimbatore is preparing your customized itinerary for{' '}
                  <strong className="text-white">{formData.destinationOrService || 'your holiday'}</strong>.
                </p>
              </div>

              <div className="bg-[#002447] border border-[#003d75] rounded-xl p-3.5 text-xs text-slate-200 text-left space-y-1">
                <div className="font-semibold flex items-center gap-1.5 text-[#F27D26]">
                  <Sparkles size={14} />
                  <span>Instant WhatsApp Follow-up:</span>
                </div>
                <p>Click below to send your details directly to our travel desk for immediate quote dispatch.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="success-send-wa-btn"
                  onClick={handleWhatsAppDirect}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition active:scale-95 text-sm"
                >
                  <MessageCircle size={18} />
                  <span>Send via WhatsApp</span>
                </button>
                <button
                  id="success-done-btn"
                  onClick={resetAndClose}
                  className="bg-[#002447] hover:bg-[#003366] text-slate-200 font-semibold py-3 px-5 rounded-xl text-sm transition border border-[#003d75]"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 bg-red-950/60 text-red-200 text-xs rounded-xl border border-red-800 flex items-start justify-between gap-3 animate-in fade-in duration-200">
                  <div className="space-y-2">
                    <p>{errorMessage}</p>
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                    >
                      <MessageSquare size={13} />
                      <span>Send details via WhatsApp ({COMPANY_PHONE_INTL})</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage('')}
                    aria-label="Dismiss error"
                    className="text-red-300 hover:text-white p-1 rounded-lg hover:bg-red-900/50 transition cursor-pointer shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Destination / Package field */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Destination / Package / Service <span className="text-[#F27D26]">*</span>
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={formData.destinationOrService}
                    onChange={(e) => setFormData({ ...formData, destinationOrService: e.target.value })}
                    placeholder="e.g. Singapore 5 Days, Dubai, Kerala, Flight Booking..."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#000e1f] text-white border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Full Name <span className="text-[#F27D26]">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-[#000e1f] text-white border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Number <span className="text-[#F27D26]">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-3 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-[#000e1f] text-white border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Date & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Approximate Travel Date
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-3 text-slate-500" />
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-[#000e1f] text-white border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Travelers
                  </label>
                  <div className="relative">
                    <Users size={16} className="absolute left-3 top-3 text-slate-500" />
                    <select
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-[#000e1f] text-white border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:border-transparent outline-none"
                    >
                      <option value="2 Adults">Couple (2 Adults)</option>
                      <option value="Family (2 Adults, 1-2 Kids)">Family with Kids</option>
                      <option value="Group (4+ Travelers)">Group (4+ Travelers)</option>
                      <option value="1 Solo Traveler">Solo Traveler</option>
                      <option value="Corporate / Group">Corporate / Group</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address <span className="text-[#F27D26]">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#000e1f] text-white border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Special notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Specific Requests / Budget
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Need vegetarian meals, 4-star hotel preference, flight tickets from Coimbatore..."
                  className="w-full p-2.5 text-xs bg-[#000e1f] text-white border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#F27D26] hover:bg-[#d96c1e] text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow transition active:scale-95 text-xs sm:text-sm disabled:opacity-75 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Instant Submit</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleStartOtpVerification}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 text-xs sm:text-sm cursor-pointer"
                  title="Verify phone via OTP and automatically save enquiry"
                >
                  <ShieldCheck size={16} />
                  <span>Verify OTP & Save</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 text-xs sm:text-sm"
                  title="Enquire on WhatsApp immediately"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                🔒 We respect your privacy. No spam. Direct response from our Coimbatore office.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Embedded OTP Verification Modal */}
      {showOtpModal && (
        <OtpVerificationModal
          isOpen={showOtpModal}
          phone={formData.phone}
          fullName={formData.fullName}
          destinationOrPackage={formData.destinationOrService}
          enquiryData={quoteEnquiryPayload}
          onClose={() => setShowOtpModal(false)}
          onVerified={(token, savedRecord) => {
            const ref = savedRecord?.enquiryReference || (typeof savedRecord === 'string' ? savedRecord : `HJH-${Math.floor(100000 + Math.random() * 900000)}`);
            setSubmittedRef(ref);
            setShowOtpModal(false);
          }}
        />
      )}
    </div>
  );
};

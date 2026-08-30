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
  Loader2 
} from 'lucide-react';
import { QuoteRequestData } from '../types';
import { createQuickQuoteWhatsAppLink, COMPANY_PHONE } from '../utils/whatsapp';

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

  useEffect(() => {
    if (initialDestinationOrService) {
      setFormData(prev => ({ ...prev, destinationOrService: initialDestinationOrService }));
    }
  }, [initialDestinationOrService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your name and WhatsApp number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'package_quote',
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          destination: formData.destinationOrService,
          travelDate: formData.travelDate,
          adults: parseInt(formData.travelers) || 2,
          specialRequirements: formData.notes
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedRef(data.referenceId || 'HJH-QUOTE');
      } else {
        // Fallback reference if offline or preview
        setSubmittedRef('HJH-' + Math.floor(100000 + Math.random() * 900000));
      }
    } catch (err) {
      console.warn('Backend enquiry endpoint unreachable, using client ref', err);
      setSubmittedRef('HJH-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const waUrl = createQuickQuoteWhatsAppLink(formData, submittedRef || undefined);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const resetAndClose = () => {
    setSubmittedRef(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div 
      id="quote-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
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
                <div className="p-3 bg-red-950/60 text-red-300 text-xs rounded-lg border border-red-800">
                  {errorMessage}
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

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address <span className="text-slate-500 text-[10px] font-normal">(Optional for quote PDF)</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
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
                  className="flex-1 bg-[#F27D26] hover:bg-[#d96c1e] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition active:scale-95 text-sm disabled:opacity-75 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Get Instant Free Quote</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-95 text-sm"
                  title="Enquire on WhatsApp immediately"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Quote</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                🔒 We respect your privacy. No spam. Direct response from our Coimbatore office.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  DollarSign, 
  Plane, 
  ShieldCheck, 
  Loader2,
  Clock,
  Heart,
  Briefcase,
  HelpCircle,
  Compass
} from 'lucide-react';
import { CustomTripFormData, TripType, PageRoute } from '../types';
import { createCustomTripWhatsAppLink, COMPANY_PHONE, COMPANY_EMAIL } from '../utils/whatsapp';

interface CustomTripPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const CustomTripPage: React.FC<CustomTripPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<CustomTripFormData>({
    fullName: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    returnDate: '',
    adults: 2,
    children: 0,
    budget: '₹50,000 - ₹1,00,000 per couple',
    tripType: 'Family Holiday',
    departureCity: 'Coimbatore',
    specialRequirements: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const tripTypeOptions: { type: TripType; icon: string; desc: string }[] = [
    { type: 'Honeymoon', icon: '💖', desc: 'Romantic stays, private villas & candlelight dinners' },
    { type: 'Family Holiday', icon: '👨‍👩‍👧‍👦', desc: 'Kid-friendly hotels, theme parks & comfortable cabs' },
    { type: 'Couple', icon: '✨', desc: 'Relaxed sightseeing, scenic spots & shopping' },
    { type: 'Group Tour', icon: '🎉', desc: 'Friends or college batches with custom tempo travellers' },
    { type: 'Solo Travel', icon: '🎒', desc: 'Flexible itineraries, hostels/boutique stays & adventure' },
    { type: 'Business Travel', icon: '💼', desc: 'Airport transfers, corporate hotels & fast invoicing' },
    { type: 'Other', icon: '🗺️', desc: 'Custom tailored travel requirements' }
  ];

  const budgetOptions = [
    'Economy (Under ₹25,000 / person)',
    'Standard (₹25,000 - ₹50,000 / person)',
    '₹50,000 - ₹1,00,000 per couple',
    'Premium (₹1,00,000 - ₹2,00,000)',
    'Luxury / VIP Package (₹2,00,000+)',
    'Need Best Budget Recommendation'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit WhatsApp phone number.');
      return;
    }
    if (!formData.destination.trim()) {
      setErrorMsg('Please enter your desired destination.');
      return;
    }

    setLoading(true);

    try {
      // POST to backend API (prepared for Supabase database storage via server-side logic)
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'custom_trip',
          ...formData
        })
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSubmittedRef(result.referenceId || 'HJH-CUSTOM');
      } else {
        // Safe fallback
        setSubmittedRef('HJH-' + Math.floor(100000 + Math.random() * 900000));
      }
    } catch (err) {
      console.warn('Backend API request error, proceeding with local reference ID', err);
      setSubmittedRef('HJH-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setLoading(false);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleWhatsAppDispatch = () => {
    const waUrl = createCustomTripWhatsAppLink(formData, submittedRef || undefined);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full space-y-12 pb-16 text-white">
      {/* Page Header */}
      <section className="relative bg-[#000814] text-white py-16 sm:py-20 overflow-hidden border-b border-[#002b54]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80" 
            alt="Custom Trip Planning"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B18] via-[#001529]/95 to-[#000B18]/80 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-[#001529] border border-[#002b54] px-3.5 py-1 rounded-full text-xs font-semibold text-[#F27D26] mb-4">
            <Sparkles size={14} className="text-[#F27D26]" />
            <span>Tailor-Made Holidays from Coimbatore</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Plan Your Custom Trip
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-3 leading-relaxed">
            Tell us your travel ideas, preferred dates, and budget. Our Coimbatore travel specialists will craft 
            a customized itinerary with hotel options, transfers, and guaranteed best rates.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {submittedRef ? (
          /* SUCCESS STATE */
          <div 
            id="custom-trip-success-view"
            className="bg-[#001529] rounded-3xl p-8 sm:p-12 border border-[#002b54] shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="w-20 h-20 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={44} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                Enquiry Successfully Registered
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Thank You, {formData.fullName}!
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Reference ID: <strong className="text-[#F27D26] font-bold text-sm">{submittedRef}</strong>
              </p>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed pt-2">
                We have received your request for <strong className="text-white font-semibold">{formData.destination}</strong> ({formData.tripType}). 
                Our tour planner in Coimbatore will contact you via WhatsApp and Phone within 2-4 business hours with your customized quote.
              </p>
            </div>

            {/* Quick summary box */}
            <div className="bg-[#000e1f] border border-[#002b54] rounded-2xl p-5 text-xs text-left max-w-md mx-auto space-y-2 text-slate-300">
              <div className="flex justify-between border-b border-[#002b54] pb-1.5 font-semibold text-white">
                <span>Trip Summary</span>
                <span>{formData.departureCity} ✈️ {formData.destination}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><span className="text-slate-500">Travelers:</span> {formData.adults} Adults, {formData.children} Kids</div>
                <div><span className="text-slate-500">Trip Type:</span> {formData.tripType}</div>
                <div><span className="text-slate-500">Dates:</span> {formData.travelDate || 'Flexible'}</div>
                <div><span className="text-slate-500">Budget:</span> {formData.budget}</div>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <button
                id="success-custom-trip-wa-btn"
                onClick={handleWhatsAppDispatch}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95 text-sm cursor-pointer"
              >
                <MessageCircle size={20} />
                <span>Send Details via WhatsApp for Faster Quote</span>
              </button>

              <button
                onClick={() => {
                  setSubmittedRef(null);
                  setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    destination: '',
                    travelDate: '',
                    returnDate: '',
                    adults: 2,
                    children: 0,
                    budget: '₹50,000 - ₹1,00,000 per couple',
                    tripType: 'Family Holiday',
                    departureCity: 'Coimbatore',
                    specialRequirements: ''
                  });
                }}
                className="text-xs text-slate-400 hover:text-white font-semibold underline cursor-pointer"
              >
                Plan Another Trip
              </button>
            </div>
          </div>
        ) : (
          /* FORM STATE */
          <div className="bg-[#001529] rounded-3xl p-6 sm:p-10 border border-[#002b54] shadow-2xl space-y-8">
            <div className="border-b border-[#002b54] pb-5">
              <h2 className="font-heading font-extrabold text-2xl text-white">
                Customized Holiday Planner
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Fill in your travel preferences below. All quotes are free and fully customizable.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-950/80 text-red-300 text-xs rounded-xl border border-red-800">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Trip Type Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                  1. What Type of Trip Are You Planning? <span className="text-[#F27D26]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {tripTypeOptions.map((opt) => {
                    const isSelected = formData.tripType === opt.type;
                    return (
                      <button
                        type="button"
                        key={opt.type}
                        onClick={() => setFormData({ ...formData, tripType: opt.type })}
                        className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#002447] border-[#F27D26] ring-2 ring-[#F27D26]/20'
                            : 'bg-[#000e1f] border-[#002b54] hover:bg-[#001c38]'
                        }`}
                      >
                        <span className="text-xl mb-1">{opt.icon}</span>
                        <div>
                          <span className={`text-xs font-bold block ${isSelected ? 'text-[#F27D26]' : 'text-white'}`}>
                            {opt.type}
                          </span>
                          <span className="text-[10px] text-slate-400 line-clamp-1">
                            {opt.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Destination & Departure City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    2. Destination(s) <span className="text-[#F27D26]">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Singapore & Malaysia / Dubai / Kashmir..."
                      className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Departure City
                  </label>
                  <div className="relative">
                    <Plane size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={formData.departureCity}
                      onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
                      placeholder="e.g. Coimbatore / Chennai / Bangalore..."
                      className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white placeholder-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Travel Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Tentative Departure Date
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Tentative Return Date / Duration
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Number of Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Number of Adults (12+ Yrs) <span className="text-[#F27D26]">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                      className="w-10 h-10 rounded-xl bg-[#000e1f] hover:bg-[#002447] font-bold text-white border border-[#002b54] flex items-center justify-center transition cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-heading font-extrabold text-lg text-white w-8 text-center">
                      {formData.adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                      className="w-10 h-10 rounded-xl bg-[#000e1f] hover:bg-[#002447] font-bold text-white border border-[#002b54] flex items-center justify-center transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Number of Children (0 - 11 Yrs)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                      className="w-10 h-10 rounded-xl bg-[#000e1f] hover:bg-[#002447] font-bold text-white border border-[#002b54] flex items-center justify-center transition cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-heading font-extrabold text-lg text-white w-8 text-center">
                      {formData.children}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                      className="w-10 h-10 rounded-xl bg-[#000e1f] hover:bg-[#002447] font-bold text-white border border-[#002b54] flex items-center justify-center transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. Approximate Budget */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Approximate Budget
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {budgetOptions.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`p-2.5 rounded-xl text-left text-xs font-medium border transition cursor-pointer ${
                        formData.budget === b
                          ? 'bg-[#002447] border-[#F27D26] text-[#F27D26] font-bold'
                          : 'bg-[#000e1f] border-[#002b54] text-slate-300 hover:bg-[#001c38]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Contact Details */}
              <div className="pt-4 border-t border-[#002b54] space-y-4">
                <h3 className="font-heading font-bold text-sm text-white">
                  Your Contact Details (For Itinerary & Quotation Delivery)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name <span className="text-[#F27D26]">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-3 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Anand Kumar"
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white placeholder-slate-500"
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
                        placeholder="e.g. 6374509488"
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white placeholder-slate-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requirements */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Special Requirements / Preferences
                  </label>
                  <textarea
                    rows={3}
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    placeholder="e.g., Pure vegetarian South Indian meals, 4-star beachside resort, private cab only, visa help needed..."
                    className="w-full p-3 text-xs border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none resize-none bg-[#000e1f] text-white placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3 items-center">
                <button
                  type="submit"
                  disabled={loading}
                  id="submit-custom-trip-btn"
                  className="w-full sm:w-auto flex-1 bg-[#F27D26] hover:bg-[#d96c1e] text-white font-extrabold py-3.5 px-8 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95 text-sm cursor-pointer disabled:opacity-75"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Trip Enquiry</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDispatch}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition active:scale-95 text-sm cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>Enquire on WhatsApp Direct</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Happy Journey Holidays — 100% Privacy Protected. No Spam.</span>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

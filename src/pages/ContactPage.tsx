import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  MessageCircle, 
  Send, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Navigation,
  Loader2,
  Building
} from 'lucide-react';
import { PageRoute } from '../types';
import { 
  COMPANY_NAME, 
  COMPANY_ADDRESS, 
  COMPANY_PHONE, 
  COMPANY_PHONE_INTL, 
  COMPANY_EMAIL, 
  createWhatsAppLink 
} from '../utils/whatsapp';
import { SubpageBackKey } from '../components/SubpageBackKey';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact_message',
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email,
          specialRequirements: `Subject: ${formData.subject}. Message: ${formData.message}`
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Backend enquiry error', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-12 pb-16 text-white">
      {/* Contact Hero Header */}
      <section className="relative bg-[#000814] text-white py-16 sm:py-20 overflow-hidden border-b border-[#002b54]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=80" 
            alt="Contact Happy Journey Holidays"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B18] via-[#001529]/95 to-[#000B18]/80 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <SubpageBackKey 
            onNavigate={onNavigate} 
            currentPageName="Contact Us" 
          />

          <div className="inline-flex items-center gap-2 bg-[#001529] border border-[#002b54] px-3.5 py-1 rounded-full text-xs font-semibold text-[#F27D26] mb-4">
            <Building size={14} className="text-[#F27D26]" />
            <span>Neelambur, Coimbatore • Walk-In & Online Enquiries</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Contact Happy Journey Holidays
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-3 leading-relaxed">
            Have questions about holiday packages, flight bookings, or visa processes? 
            Reach out via WhatsApp, phone, email, or visit our office on Avinashi Road, Neelambur, Coimbatore.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Official Business Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#001529] rounded-3xl p-6 sm:p-8 border border-[#002b54] shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
                  Head Office
                </span>
                <h2 className="font-heading font-extrabold text-2xl text-white mt-1">
                  {COMPANY_NAME}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Tour Operator & Travel Agency in Coimbatore
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3 bg-[#000e1f] rounded-2xl border border-[#002b54]">
                  <MapPin className="w-5 h-5 text-[#F27D26] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold mb-0.5">Office Address:</strong>
                    <span>{COMPANY_ADDRESS}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#000e1f] rounded-2xl border border-[#002b54]">
                  <Phone className="w-5 h-5 text-[#F27D26] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold mb-0.5">Phone / Mobile:</strong>
                    <a href={`tel:${COMPANY_PHONE}`} className="text-[#F27D26] font-bold hover:underline">
                      +91 {COMPANY_PHONE} ({COMPANY_PHONE})
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#000e1f] rounded-2xl border border-[#002b54]">
                  <Mail className="w-5 h-5 text-[#F27D26] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold mb-0.5">Email ID:</strong>
                    <a href={`mailto:${COMPANY_EMAIL}`} className="text-[#F27D26] font-medium hover:underline">
                      {COMPANY_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#000e1f] rounded-2xl border border-[#002b54]">
                  <Globe className="w-5 h-5 text-[#F27D26] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold mb-0.5">Official Website:</strong>
                    <span className="text-slate-200">www.happyjourneyholidays.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#000e1f] rounded-2xl border border-[#002b54]">
                  <Clock className="w-5 h-5 text-[#F27D26] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold mb-0.5">Working Hours:</strong>
                    <p>Monday - Saturday: 9:30 AM – 7:30 PM</p>
                    <p>Sunday: 10:00 AM – 4:00 PM (WhatsApp 24/7)</p>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <a
                  id="contact-call-btn"
                  href={`tel:${COMPANY_PHONE}`}
                  className="bg-[#002447] hover:bg-[#00386e] text-white text-xs font-bold py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition active:scale-95 border border-[#003d75]"
                >
                  <Phone size={16} />
                  <span>Call Now</span>
                </a>

                <a
                  id="contact-wa-btn"
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition active:scale-95 shadow-sm"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>

                <a
                  id="contact-email-btn"
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="bg-[#000e1f] hover:bg-[#001c38] text-white text-xs font-bold py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition active:scale-95 border border-[#002b54]"
                >
                  <Mail size={16} />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#001529] rounded-3xl p-6 sm:p-10 border border-[#002b54] shadow-2xl">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for contacting Happy Journey Holidays. Our team in Coimbatore will get back to you shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', phone: '', email: '', subject: 'General Enquiry', message: '' });
                      }}
                      className="bg-[#002447] hover:bg-[#00386e] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition border border-[#003d75] cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
                      Send a Message
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-white mt-1">
                      Travel Enquiry & Assistance
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Submit your query below and our Coimbatore team will respond with quotations and itinerary details.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Full Name <span className="text-[#F27D26]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Manikandan"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        WhatsApp / Phone Number <span className="text-[#F27D26]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 6374509488"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Enquiry Type
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white"
                      >
                        <option value="International Holiday Package" className="bg-[#001529]">International Holiday Package</option>
                        <option value="Domestic Holiday Package" className="bg-[#001529]">Domestic Holiday Package</option>
                        <option value="Flight Ticket Booking" className="bg-[#001529]">Flight Ticket Booking</option>
                        <option value="Visa Assistance" className="bg-[#001529]">Visa Assistance</option>
                        <option value="Hotel & Resort Booking" className="bg-[#001529]">Hotel & Resort Booking</option>
                        <option value="Outstation Cab / Tempo Traveller" className="bg-[#001529]">Outstation Cab / Tempo Traveller</option>
                        <option value="General Enquiry" className="bg-[#001529]">General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Message / Destination Details <span className="text-[#F27D26]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share destination, number of travelers, dates, or specific requirements..."
                      className="w-full p-3 text-xs sm:text-sm border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none resize-none bg-[#000e1f] text-white placeholder-slate-500"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      id="contact-form-submit-btn"
                      className="flex-1 bg-[#F27D26] hover:bg-[#d96c1e] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow transition active:scale-95 text-xs sm:text-sm cursor-pointer disabled:opacity-75"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </button>

                    <a
                      href={createWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition text-xs sm:text-sm"
                    >
                      <MessageCircle size={16} />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#001529] rounded-3xl p-6 sm:p-8 border border-[#002b54] shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
                Location Map
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                Find Us in Neelambur, Coimbatore
              </h3>
              <p className="text-xs text-slate-400">
                Conveniently located on Avinashi Road (near PSG iTech / Neelambur bypass), easy access for visitors from Coimbatore, Tiruppur & Erode.
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Neelambur+Coimbatore+Avinashi+Road"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#002447] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#00386e] transition self-start sm:self-auto flex-shrink-0 border border-[#003d75]"
            >
              <Navigation size={14} className="text-[#F27D26]" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* Embedded Map Visual Frame */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#002b54] bg-[#000e1f]">
            <iframe
              title="Happy Journey Holidays Coimbatore Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.142385157677!2d77.08638!3d11.06522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8ff564030623d%3A0xa19c5c93c4e12e1a!2sNeelambur%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full opacity-90"
            />
          </div>
        </div>

        {/* Bottom Back Key */}
        <div className="flex justify-center pt-4">
          <SubpageBackKey 
            onNavigate={onNavigate} 
            label="Back to Home Page"
          />
        </div>
      </section>
    </div>
  );
};

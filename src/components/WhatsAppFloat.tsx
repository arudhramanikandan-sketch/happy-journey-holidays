import React, { useState } from 'react';
import { MessageCircle, X, ArrowRight, PhoneCall } from 'lucide-react';
import { createWhatsAppLink, WHATSAPP_NUMBER, COMPANY_PHONE_INTL } from '../utils/whatsapp';

interface WhatsAppFloatProps {
  currentDestination?: string;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({ currentDestination }) => {
  const [isOpen, setIsOpen] = useState(false);

  const message = currentDestination 
    ? `Hello Happy Journey Holidays, I am viewing ${currentDestination} on your website and would like a quote.`
    : 'Hello Happy Journey Holidays, I would like to enquire about a holiday package.';

  const handleOpenWhatsApp = (customMsg?: string) => {
    window.open(createWhatsAppLink(customMsg || message), '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {/* Expanded Quick Message Bubble */}
      {isOpen && (
        <div 
          id="whatsapp-chat-bubble"
          className="mb-3 w-80 sm:w-88 bg-[#001529] rounded-2xl shadow-2xl border border-[#002b54] overflow-hidden transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 text-white"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-800 p-4 text-white flex items-center justify-between border-b border-[#002b54]">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-lg">
                  HJ
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-900 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight text-white">Happy Journey Holidays</h4>
                <p className="text-xs text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block animate-pulse"></span>
                  Online Travel Specialist (Coimbatore)
                </p>
              </div>
            </div>
            <button 
              id="close-whatsapp-bubble"
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
              aria-label="Close WhatsApp chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#000e1f] space-y-3">
            <div className="bg-[#001c38] p-3 rounded-xl rounded-tl-none border border-[#002f5e] shadow-sm text-xs text-slate-200 leading-relaxed">
              👋 Vanakkam! Looking for holiday packages, flight tickets, or visa assistance? Chat directly with our travel experts in Coimbatore.
            </div>

            {currentDestination && (
              <div className="bg-emerald-950/80 border border-emerald-700/60 p-2.5 rounded-lg text-xs text-emerald-200 flex items-center justify-between">
                <span>📍 Viewing: <strong>{currentDestination}</strong></span>
              </div>
            )}

            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Quick Enquiries:</p>
              <button
                id="wa-quick-intl"
                onClick={() => handleOpenWhatsApp('Hello Happy Journey Holidays, I would like to get a quote for International Holidays (Singapore / Malaysia / Dubai / Bali / Thailand).')}
                className="w-full text-left text-xs bg-[#001830] hover:bg-[#002447] text-slate-200 hover:text-white p-2 rounded-lg border border-[#002f5e] hover:border-[#F27D26] transition flex items-center justify-between group"
              >
                <span>🌍 International Holidays Quote</span>
                <ArrowRight size={12} className="text-slate-400 group-hover:text-[#F27D26] transition-transform group-hover:translate-x-1" />
              </button>
              <button
                id="wa-quick-domestic"
                onClick={() => handleOpenWhatsApp('Hello Happy Journey Holidays, I want to plan a Domestic Trip (Kerala / Ooty / Kodaikanal / Kashmir / Goa).')}
                className="w-full text-left text-xs bg-[#001830] hover:bg-[#002447] text-slate-200 hover:text-white p-2 rounded-lg border border-[#002f5e] hover:border-[#F27D26] transition flex items-center justify-between group"
              >
                <span>⛰️ Domestic / South India Tour</span>
                <ArrowRight size={12} className="text-slate-400 group-hover:text-[#F27D26] transition-transform group-hover:translate-x-1" />
              </button>
              <button
                id="wa-quick-visa"
                onClick={() => handleOpenWhatsApp('Hello Happy Journey Holidays, I need Visa Assistance and Flight Booking assistance.')}
                className="w-full text-left text-xs bg-[#001830] hover:bg-[#002447] text-slate-200 hover:text-white p-2 rounded-lg border border-[#002f5e] hover:border-[#F27D26] transition flex items-center justify-between group"
              >
                <span>🛂 Visa & Flight Ticket Support</span>
                <ArrowRight size={12} className="text-slate-400 group-hover:text-[#F27D26] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Footer action */}
          <div className="p-3 bg-[#001529] border-t border-[#002b54] flex items-center gap-2">
            <button
              id="wa-open-chat-btn"
              onClick={() => handleOpenWhatsApp()}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
            >
              <MessageCircle size={15} />
              <span>Start WhatsApp Chat</span>
            </button>
            <a
              id="wa-call-direct-btn"
              href="tel:6374509488"
              className="bg-[#002447] hover:bg-[#003366] text-white p-2.5 rounded-xl transition flex items-center justify-center border border-[#003d75]"
              title="Call Office: 6374509488"
            >
              <PhoneCall size={15} />
            </a>
          </div>
        </div>
      )}

      {/* Main floating button */}
      <button
        id="persistent-whatsapp-button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 sm:py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp with Happy Journey Holidays"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white text-emerald-600 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </div>
        <span className="font-semibold text-sm tracking-wide hidden sm:inline-block">
          WhatsApp Us
        </span>
      </button>
    </div>
  );
};

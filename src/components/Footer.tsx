import React from 'react';
import { 
  Plane, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  MessageCircle, 
  ShieldCheck, 
  ArrowRight,
  Heart,
  Youtube
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
import { Logo } from './Logo';

interface FooterProps {
  onRouteChange: (route: PageRoute) => void;
  onOpenQuoteModal: (serviceOrDest?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onRouteChange, onOpenQuoteModal }) => {
  const handleNav = (route: PageRoute) => {
    onRouteChange(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#000710] text-slate-300 pt-16 pb-8 border-t border-[#002447]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#002447]">
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => handleNav('/')}
              className="text-left cursor-pointer focus:outline-none"
              aria-label="Happy Journey Holidays Home"
            >
              <Logo size="md" />
            </button>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Your trusted travel partner in Coimbatore for customized international and domestic holiday packages, 
              flight bookings, hotel reservations, tourist visas, and complete end-to-end travel assistance.
            </p>

            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin size={15} className="text-[#F27D26] flex-shrink-0 mt-0.5" />
                <span>{COMPANY_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone size={15} className="text-[#F27D26] flex-shrink-0" />
                <a href={`tel:+91${COMPANY_PHONE}`} className="hover:text-[#F27D26] transition">
                  {COMPANY_PHONE_INTL}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail size={15} className="text-[#F27D26] flex-shrink-0" />
                <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-[#F27D26] transition">
                  {COMPANY_EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Globe size={15} className="text-[#F27D26] flex-shrink-0" />
                <span className="text-slate-400">www.happyjourneyholidays.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home', route: '/' as PageRoute },
                { label: 'International Holidays', route: '/international-holidays' as PageRoute },
                { label: 'Domestic Holidays', route: '/domestic-holidays' as PageRoute },
                { label: 'Travel Services', route: '/services' as PageRoute },
                { label: 'Custom Trip Planner', route: '/custom-trip' as PageRoute },
                { label: 'About Us', route: '/about' as PageRoute },
                { label: 'Contact Us', route: '/contact' as PageRoute }
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNav(item.route)}
                    className="hover:text-[#F27D26] text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowRight size={11} className="text-slate-500" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Services */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              Travel Services
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                'Flight Booking',
                'Hotel Booking',
                'Holiday Packages',
                'Visa Assistance',
                'Travel Insurance',
                'Transfers & Cabs'
              ].map((service) => (
                <li key={service}>
                  <button
                    onClick={() => {
                      handleNav('/services');
                    }}
                    className="hover:text-[#F27D26] text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ArrowRight size={11} className="text-slate-500" />
                    <span>{service}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Direct Enquiries */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              Connect With Us
            </h4>
            <p className="text-xs text-slate-400">
              Reach out for quick quotations or visit our Coimbatore office directly.
            </p>

            <div className="flex flex-col gap-2">
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href={`tel:+91${COMPANY_PHONE}`}
                className="inline-flex items-center justify-center gap-2 bg-[#001f3f] hover:bg-[#002b54] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition border border-[#00386e]"
              >
                <Phone size={14} className="text-[#F27D26]" />
                <span>Call Us</span>
              </a>
            </div>

            {/* Social handles */}
            <div className="pt-2">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-2 font-semibold">Social:</span>
              <div className="flex items-center space-x-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#001f3f] hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition border border-[#00386e]"
                  aria-label="Facebook"
                >
                  <span className="font-bold text-xs">f</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#001f3f] hover:bg-pink-600 flex items-center justify-center text-slate-300 hover:text-white transition border border-[#00386e]"
                  aria-label="Instagram"
                >
                  <span className="font-bold text-xs">ig</span>
                </a>
                <a
                  href="https://youtube.com/@happyjourneyholidays-cbe?si=zVrrVmg_wVSXP3FK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#001f3f] hover:bg-red-600 flex items-center justify-center text-slate-300 hover:text-white transition border border-[#00386e]"
                  aria-label="Happy Journey Holidays YouTube Channel"
                >
                  <Youtube size={16} />
                </a>
                <a
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#001f3f] hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition border border-[#00386e]"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Happy Journey Holidays. All Rights Reserved.</p>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>Neelambur, Coimbatore, Tamil Nadu</span>
            <span>•</span>
            <span className="text-slate-500">Conversion-Focused Travel Agency</span>
            <span>•</span>
            <button
              id="footer-admin-login-link"
              onClick={() => handleNav('/admin')}
              className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
              aria-label="Admin Portal"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

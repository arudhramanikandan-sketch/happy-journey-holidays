import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  MessageCircle, 
  Plane, 
  Sparkles, 
  ChevronRight, 
  Clock,
  ArrowLeft
} from 'lucide-react';
import { PageRoute } from '../types';
import { createWhatsAppLink, COMPANY_PHONE, COMPANY_EMAIL } from '../utils/whatsapp';
import { Logo } from './Logo';

interface HeaderProps {
  currentRoute: PageRoute;
  onRouteChange: (route: PageRoute) => void;
  onOpenQuoteModal: (initialServiceOrDestination?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentRoute, 
  onRouteChange,
  onOpenQuoteModal 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: '/' },
    { label: 'International Holidays', route: '/international-holidays' },
    { label: 'Domestic Holidays', route: '/domestic-holidays' },
    { label: 'Travel Services', route: '/services' },
    { label: 'Custom Trip', route: '/custom-trip' },
    { label: 'About Us', route: '/about' },
    { label: 'Contact', route: '/contact' }
  ];

  const handleNavClick = (route: PageRoute) => {
    onRouteChange(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full z-40 relative">
      {/* Top Utility Bar */}
      <div className="bg-[#000814] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-[#002447] hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin size={13} className="text-[#F27D26]" />
              <span>Neelambur, Coimbatore, Tamil Nadu</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock size={13} className="text-[#F27D26]" />
              <span>Mon - Sat: 9:30 AM - 7:30 PM (24/7 WhatsApp)</span>
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a 
              href={`mailto:${COMPANY_EMAIL}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition"
            >
              <Mail size={13} className="text-[#F27D26]" />
              <span>{COMPANY_EMAIL}</span>
            </a>
            <a 
              href={`tel:${COMPANY_PHONE}`}
              className="flex items-center gap-1.5 font-semibold text-[#F27D26] hover:text-[#ff9547] transition"
            >
              <Phone size={13} className="text-[#F27D26]" />
              <span>+91 {COMPANY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        id="main-navigation-bar"
        className={`w-full transition-all duration-300 bg-[#001529]/95 backdrop-blur-md border-b border-[#002b54] ${
          scrolled ? 'shadow-xl py-3' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand & Mobile Back Key */}
          <div className="flex items-center">
            {currentRoute !== '/' && (
              <button 
                type="button"
                id="header-mobile-back-btn"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
                    window.history.back();
                  } else {
                    onRouteChange('/');
                  }
                }}
                className="lg:hidden p-2 mr-2.5 text-slate-200 hover:text-white bg-[#001f3f] hover:bg-[#002d59] border border-[#003866] rounded-xl transition flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
                aria-label="Go Back to Previous Page"
                title="Go back"
              >
                <ArrowLeft size={16} className="text-[#F27D26]" />
              </button>
            )}

            <button 
              id="nav-logo-btn"
              onClick={() => handleNavClick('/')}
              className="flex items-center text-left group cursor-pointer focus:outline-none"
              aria-label="Happy Journey Holidays Home"
            >
              <Logo size="md" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(link.route)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative cursor-pointer ${
                    isActive 
                      ? 'text-white font-bold bg-[#002447]' 
                      : 'text-slate-300 hover:text-white hover:bg-[#00203f]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F27D26] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              id="header-whatsapp-btn"
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/50 hover:bg-emerald-900/60 rounded-lg border border-emerald-700/50 transition"
              title="Chat on WhatsApp"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>

            <button
              id="header-plan-trip-cta"
              onClick={() => handleNavClick('/custom-trip')}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#F27D26] hover:bg-[#d96c1e] rounded-lg shadow-sm hover:shadow transition transform active:scale-95 cursor-pointer"
            >
              <Sparkles size={15} className="text-orange-100" />
              <span>Plan My Trip</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <a
              id="mobile-phone-shortcut"
              href={`tel:${COMPANY_PHONE}`}
              className="p-2 text-slate-300 bg-[#00203f] rounded-lg hover:bg-[#002d59]"
              aria-label="Call Happy Journey Holidays"
            >
              <Phone size={18} className="text-[#F27D26]" />
            </a>

            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 rounded-lg hover:bg-[#00203f] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-drawer"
            className="lg:hidden bg-[#001529] border-b border-[#002b54] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.route;
                return (
                  <button
                    key={link.route}
                    id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleNavClick(link.route)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                      isActive 
                        ? 'bg-[#002447] text-white font-bold border-l-4 border-[#F27D26] pl-3' 
                        : 'text-slate-300 hover:bg-[#00203f] hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} className={isActive ? 'text-[#F27D26]' : 'text-slate-500'} />
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#002b54] space-y-2.5">
              <button
                id="mobile-plan-trip-btn"
                onClick={() => handleNavClick('/custom-trip')}
                className="w-full py-3 bg-[#F27D26] hover:bg-[#d96c1e] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles size={16} />
                <span>Plan My Customized Trip</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  id="mobile-drawer-wa"
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 bg-emerald-600 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>
                <a
                  id="mobile-drawer-call"
                  href={`tel:${COMPANY_PHONE}`}
                  className="py-2.5 bg-[#002447] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-[#003d75]"
                >
                  <Phone size={15} />
                  <span>Call Office</span>
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center text-[11px] text-slate-400">
              <span>📍 Neelambur, Coimbatore, Tamil Nadu</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

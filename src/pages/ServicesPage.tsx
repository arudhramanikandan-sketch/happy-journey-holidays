import React from 'react';
import { 
  Plane, 
  Building, 
  Globe, 
  Compass, 
  FileCheck, 
  ShieldCheck, 
  Car, 
  Check, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  Phone,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { PageRoute } from '../types';
import { TRAVEL_SERVICES } from '../data/travelData';
import { createServiceWhatsAppLink, createWhatsAppLink, COMPANY_PHONE } from '../utils/whatsapp';
import { SubpageBackKey } from '../components/SubpageBackKey';

interface ServicesPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: (serviceTitle: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenQuoteModal
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-7 h-7 text-amber-500" />;
      case 'Building':
        return <Building className="w-7 h-7 text-amber-500" />;
      case 'Globe':
        return <Globe className="w-7 h-7 text-amber-500" />;
      case 'Compass':
        return <Compass className="w-7 h-7 text-amber-500" />;
      case 'FileCheck':
        return <FileCheck className="w-7 h-7 text-amber-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-7 h-7 text-amber-500" />;
      case 'Car':
        return <Car className="w-7 h-7 text-amber-500" />;
      default:
        return <Globe className="w-7 h-7 text-amber-500" />;
    }
  };

  return (
    <div className="w-full space-y-16 pb-16 text-white">
      {/* Services Hero */}
      <section className="relative bg-[#000814] text-white py-16 sm:py-20 overflow-hidden border-b border-[#002b54]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80" 
            alt="Travel Services"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B18] via-[#001529]/95 to-[#000B18]/80 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <SubpageBackKey 
            onNavigate={onNavigate} 
            currentPageName="Travel Services" 
          />

          <div className="inline-flex items-center gap-2 bg-[#001529] border border-[#002b54] px-3.5 py-1 rounded-full text-xs font-semibold text-[#F27D26] mb-4">
            <Sparkles size={14} className="text-[#F27D26]" />
            <span>Complete End-to-End Travel Services in Coimbatore</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Our Travel Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-3 leading-relaxed">
            Happy Journey Holidays provides comprehensive travel solutions: competitive flight ticketing, 
            verified hotel reservations, customized domestic and international holiday packages, tourist visa assistance, 
            travel insurance, and outstation cab transfers.
          </p>
        </div>
      </section>

      {/* Detailed Service Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {TRAVEL_SERVICES.map((service, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={service.id}
              id={`service-detail-${service.id}`}
              className="bg-[#001529] rounded-3xl border border-[#002b54] overflow-hidden shadow-xl hover:border-[#F27D26]/50 transition-colors"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                {/* Service Image */}
                <div className={`lg:col-span-5 relative h-64 sm:h-72 lg:h-auto min-h-[280px] ${isReversed ? 'lg:order-2' : ''}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001529] via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="bg-[#F27D26] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                      Service {index + 1} of 6
                    </span>
                  </div>
                </div>

                {/* Service Content */}
                <div className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#002447] border border-[#003d75] flex items-center justify-center">
                        {getIcon(service.iconName)}
                      </div>
                      <div>
                        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                          {service.title}
                        </h2>
                        <p className="text-xs text-[#F27D26] font-semibold">
                          Managed by Happy Journey Holidays Desk
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {service.fullDesc}
                    </p>

                    <div className="space-y-2 pt-2">
                      <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                        Key Features & Inclusions:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-200 bg-[#000e1f] p-2.5 rounded-xl border border-[#002b54]">
                            <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#002b54] flex flex-col sm:flex-row items-center gap-3">
                    <button
                      id={`get-quote-service-${service.id}`}
                      onClick={() => onOpenQuoteModal(`${service.title} Service`)}
                      className="w-full sm:w-auto flex-1 bg-[#002447] hover:bg-[#00386e] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition border border-[#00478a] shadow flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Sparkles size={15} className="text-[#F27D26]" />
                      <span>{service.ctaText || 'Get Instant Quote'}</span>
                    </button>

                    <a
                      id={`wa-service-btn-${service.id}`}
                      href={createServiceWhatsAppLink(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl transition flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                    >
                      <MessageCircle size={16} />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Support hotline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-[#001529] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-[#002b54]">
          <div className="space-y-2">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Need Assistance with Urgent Flight or Visa Queries?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with our ticketing and visa counselors at our Neelambur, Coimbatore office.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={`tel:${COMPANY_PHONE}`}
              className="bg-[#F27D26] hover:bg-[#d96c1e] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow"
            >
              Call +91 {COMPANY_PHONE}
            </a>
          </div>
        </div>

        {/* Bottom Back Key */}
        <div className="flex justify-center pt-2">
          <SubpageBackKey 
            onNavigate={onNavigate} 
            label="Back to Home Page"
          />
        </div>
      </section>
    </div>
  );
};

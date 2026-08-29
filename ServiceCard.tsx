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
  ArrowRight 
} from 'lucide-react';
import { TravelService } from '../types';
import { createServiceWhatsAppLink } from '../utils/whatsapp';

interface ServiceCardProps {
  service: TravelService;
  onGetQuote: (serviceTitle: string) => void;
  onLearnMore?: (service: TravelService) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onGetQuote,
  onLearnMore
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-6 h-6 text-[#F27D26]" />;
      case 'Building':
        return <Building className="w-6 h-6 text-[#F27D26]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#F27D26]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#F27D26]" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-[#F27D26]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#F27D26]" />;
      case 'Car':
        return <Car className="w-6 h-6 text-[#F27D26]" />;
      default:
        return <Globe className="w-6 h-6 text-[#F27D26]" />;
    }
  };

  return (
    <div 
      id={`service-card-${service.id}`}
      className="bg-[#001529] rounded-2xl p-6 border border-[#002b54] shadow-lg hover:border-[#F27D26]/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Icon & Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#002447] border border-[#003d75] flex items-center justify-center group-hover:scale-110 transition-transform">
            {getIcon(service.iconName)}
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#F27D26] transition-colors">
              {service.title}
            </h3>
            <span className="text-[11px] font-semibold text-[#F27D26] uppercase tracking-wider">
              Coimbatore Travel Desk
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {service.shortDesc}
        </p>

        {/* Features Checklist */}
        <ul className="space-y-2 mb-6 text-xs text-slate-300">
          {service.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-[#002b54] flex items-center gap-2">
        <button
          id={`service-quote-btn-${service.id}`}
          onClick={() => onGetQuote(service.title)}
          className="flex-1 bg-[#002447] hover:bg-[#00386e] text-white font-bold text-xs py-2.5 px-3 rounded-xl transition border border-[#00478a] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
        >
          <span>{service.ctaText || 'Get Quote'}</span>
          <ArrowRight size={13} className="text-[#F27D26]" />
        </button>

        <a
          id={`service-wa-btn-${service.id}`}
          href={createServiceWhatsAppLink(service.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition flex items-center justify-center active:scale-95 shadow-sm"
          title={`Enquire on WhatsApp about ${service.title}`}
        >
          <MessageCircle size={16} />
        </a>
      </div>
    </div>
  );
};

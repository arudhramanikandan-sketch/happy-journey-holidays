import React from 'react';
import { 
  Clock, 
  Check, 
  MessageCircle, 
  Sparkles, 
  MapPin, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { HolidayPackage } from '../types';
import { createDestinationWhatsAppLink } from '../utils/whatsapp';

interface PackageCardProps {
  pkg: HolidayPackage;
  onGetQuote: (packageTitle: string) => void;
  onViewDetails?: (pkg: HolidayPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ 
  pkg, 
  onGetQuote,
  onViewDetails 
}) => {
  return (
    <div 
      id={`package-card-${pkg.id}`}
      className="bg-[#001529] rounded-2xl overflow-hidden border border-[#002b54] shadow-lg hover:border-[#F27D26]/50 hover:shadow-2xl transition-all duration-300 flex flex-col group"
    >
      {/* Image and badges */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-[#000e1f]">
        <img 
          src={pkg.image} 
          alt={pkg.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001529] via-[#001529]/30 to-black/40" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-[#000814]/90 text-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm flex items-center gap-1 border border-[#002b54]">
            <Clock size={12} className="text-[#F27D26]" />
            {pkg.duration}
          </span>
          {pkg.bestFor && (
            <span className="bg-[#F27D26] text-white text-[11px] font-semibold px-2 py-1 rounded-md backdrop-blur-sm shadow-sm">
              {pkg.bestFor}
            </span>
          )}
        </div>

        {/* Destination Pin */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-xs font-semibold text-[#F27D26] flex items-center gap-1 drop-shadow">
            <MapPin size={13} />
            {pkg.destination}
          </span>
          <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-snug line-clamp-1 drop-shadow">
            {pkg.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Highlights */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Package Highlights:
          </p>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {pkg.highlights.slice(0, 3).map((hl, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Inclusions pill tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {pkg.inclusions.slice(0, 4).map((inc, i) => (
            <span 
              key={i}
              className="text-[10px] bg-[#002242] text-slate-200 font-medium px-2 py-0.5 rounded-full border border-[#00376b]"
            >
              ✓ {inc}
            </span>
          ))}
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-[#002b54] flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                Starting from
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-extrabold text-xl text-white">
                  {pkg.startingPrice}
                </span>
                <span className="text-[11px] text-slate-400 font-normal">/ person</span>
                {pkg.originalPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    {pkg.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-700/50">
              Customizable
            </span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`get-quote-pkg-${pkg.id}`}
              onClick={() => onGetQuote(`${pkg.title} (${pkg.destination})`)}
              className="w-full bg-[#002447] hover:bg-[#00386e] text-white font-bold text-xs py-2.5 px-3 rounded-xl transition border border-[#00478a] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Get Quote</span>
              <ArrowRight size={13} className="text-[#F27D26]" />
            </button>

            <a
              id={`wa-pkg-${pkg.id}`}
              href={createDestinationWhatsAppLink(pkg.destination, pkg.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
              title="Enquire on WhatsApp"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

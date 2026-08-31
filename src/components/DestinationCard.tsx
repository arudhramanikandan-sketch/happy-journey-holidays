import React from 'react';
import { MapPin, ArrowRight, MessageCircle, Clock, Sparkles, Send } from 'lucide-react';
import { Destination } from '../types';
import { createDestinationWhatsAppLink } from '../utils/whatsapp';

interface DestinationCardProps {
  destination: Destination;
  onExplore: (destination: Destination) => void;
  onGetQuote: (destinationName: string) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onExplore,
  onGetQuote
}) => {
  return (
    <div 
      id={`dest-card-${destination.id}`}
      className="bg-[#001529] rounded-2xl overflow-hidden border border-[#002b54] shadow-lg hover:border-[#F27D26]/50 hover:shadow-2xl transition-all duration-300 flex flex-col group"
    >
      {/* Destination Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-[#000e1f]">
        <img 
          src={destination.image} 
          alt={destination.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001529] via-[#001529]/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-[#000814]/90 text-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm border border-[#002b54]">
            {destination.idealDuration}
          </span>
        </div>

        {/* Price Tag */}
        <div className="absolute top-3 right-3">
          <span className="bg-[#F27D26] text-white text-xs font-extrabold px-2.5 py-1 rounded-md shadow-md">
            From {destination.startingPrice}
          </span>
        </div>

        {/* Name on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-heading font-extrabold text-xl text-white tracking-tight flex items-center gap-1.5 drop-shadow">
            <MapPin size={18} className="text-[#F27D26]" />
            <span>{destination.name}</span>
          </h3>
          <p className="text-xs text-slate-300 line-clamp-1 font-medium drop-shadow-sm">
            {destination.tagline}
          </p>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
          {destination.description}
        </p>

        {/* Key Experiences Pill Badges */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Top Highlights:
          </span>
          <div className="flex flex-wrap gap-1">
            {destination.highlights.slice(0, 3).map((item, idx) => (
              <span 
                key={idx}
                className="text-[10px] bg-[#002242] text-slate-200 font-medium px-2 py-0.5 rounded-md border border-[#00376b]"
              >
                • {item}
              </span>
            ))}
          </div>
        </div>

        {/* Actions: Submit Trip Enquiry & WhatsApp Direct */}
        <div className="pt-3 border-t border-[#002b54] flex flex-col sm:flex-row items-center gap-2">
          <button
            id={`explore-btn-${destination.id}`}
            onClick={() => onGetQuote(`${destination.name} Tour Package`)}
            className="w-full sm:flex-1 bg-[#F27D26] hover:bg-[#d96c1e] text-white font-bold text-xs py-2.5 px-3 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Send size={13} />
            <span>Submit Trip Enquiry</span>
          </button>

          <a
            id={`wa-dest-btn-${destination.id}`}
            href={createDestinationWhatsAppLink(destination.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
            title={`Enquire on WhatsApp Direct about ${destination.name}`}
          >
            <MessageCircle size={15} />
            <span className="sm:hidden">WhatsApp Direct</span>
          </a>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Check, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  Car, 
  Calendar,
  ShieldCheck,
  Building
} from 'lucide-react';
import { PageRoute, Destination } from '../types';
import { DOMESTIC_DESTINATIONS, FEATURED_PACKAGES } from '../data/travelData';
import { createDestinationWhatsAppLink } from '../utils/whatsapp';

interface DomesticHolidaysPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: (destinationName: string) => void;
}

export const DomesticHolidaysPage: React.FC<DomesticHolidaysPageProps> = ({
  onNavigate,
  onOpenQuoteModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'south' | 'north' | 'islands'>('all');

  const filterTabs = [
    { id: 'all', label: 'All Domestic Holidays' },
    { id: 'south', label: 'Hill Stations & South India (Munnar, Ooty, Kodai, Kerala)' },
    { id: 'north', label: 'Snow & Royal India (Kashmir, Rajasthan)' },
    { id: 'islands', label: 'Beach & Island (Goa, Andaman)' }
  ];

  const filteredDestinations = DOMESTIC_DESTINATIONS.filter(dest => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'south') return ['kerala', 'munnar', 'ooty', 'kodaikanal'].includes(dest.id);
    if (selectedCategory === 'north') return ['kashmir', 'rajasthan'].includes(dest.id);
    if (selectedCategory === 'islands') return ['goa', 'andaman'].includes(dest.id);
    return true;
  });

  return (
    <div className="w-full space-y-12 pb-16 text-white">
      {/* Page Hero */}
      <section className="relative bg-[#000814] text-white py-16 sm:py-20 overflow-hidden border-b border-[#002b54]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80" 
            alt="Domestic Holidays India"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B18] via-[#001529]/95 to-[#000B18]/80 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-[#001529] border border-[#002b54] px-3.5 py-1 rounded-full text-xs font-semibold text-[#F27D26] mb-4">
            <Compass size={14} className="text-[#F27D26]" />
            <span>Direct Departures & Cabs from Coimbatore / South India</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Domestic Holiday Packages
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-3 leading-relaxed">
            Discover the magic of Incredible India. From misty Munnar and Ooty hill getaways to Alleppey houseboats, 
            Goa beaches, royal Rajasthan, and magical Kashmir snow.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#F27D26] text-white shadow-md'
                    : 'bg-[#001529] text-slate-300 hover:text-white border border-[#002b54] hover:bg-[#002447] backdrop-blur-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Grid & Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDestinations.map((dest) => {
            const relatedPackages = FEATURED_PACKAGES.filter(
              pkg => pkg.destination.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0])
            );

            return (
              <div 
                key={dest.id}
                id={`domestic-card-${dest.id}`}
                className="bg-[#001529] rounded-3xl border border-[#002b54] overflow-hidden shadow-xl hover:border-[#F27D26]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-64 overflow-hidden bg-[#000814]">
                    <img 
                      src={dest.image} 
                      alt={dest.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001529] via-[#001529]/40 to-transparent" />

                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#000814]/90 text-white text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-sm border border-[#002b54]">
                        {dest.idealDuration}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="bg-[#F27D26] text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow">
                        From {dest.startingPrice}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-heading font-extrabold text-2xl drop-shadow">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-amber-300 font-medium drop-shadow-sm">
                        {dest.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Experiences */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Included Experiences & Sightseeing:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {dest.popularExperiences.slice(0, 3).map((exp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Coimbatore Pickup Perk */}
                    <div className="bg-[#002447] border border-[#003d75] p-2.5 rounded-xl text-xs text-slate-200 flex items-center gap-2">
                      <Car size={15} className="text-[#F27D26] flex-shrink-0" />
                      <span>Dedicated AC Cab with pickup available from Coimbatore</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 flex items-center gap-3 border-t border-[#002b54] mt-2">
                  <button
                    id={`quote-dom-${dest.id}`}
                    onClick={() => onOpenQuoteModal(`${dest.name} Domestic Package`)}
                    className="flex-1 bg-[#002447] hover:bg-[#00386e] text-white font-bold text-xs py-3 px-4 rounded-xl transition border border-[#00478a] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Get {dest.name} Quote</span>
                    <ArrowRight size={13} className="text-[#F27D26]" />
                  </button>

                  <a
                    id={`wa-dom-${dest.id}`}
                    href={createDestinationWhatsAppLink(dest.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl transition flex items-center justify-center active:scale-95"
                    title={`Enquire on WhatsApp about ${dest.name}`}
                  >
                    <MessageCircle size={17} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Outstation Cab & Group Departure highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#001529] rounded-3xl p-8 border border-[#002b54] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Need a Private AC Cab from Coimbatore for Ooty / Munnar / Kodaikanal?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              We offer Sedans (Etios/Dzire), Innova Crysta, and 12-20 Seater Tempo Travellers with courteous local drivers for weekend family trips.
            </p>
          </div>
          <button
            onClick={() => onOpenQuoteModal('Coimbatore Outstation Cab Rental')}
            className="bg-[#F27D26] hover:bg-[#d96c1e] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition flex-shrink-0 shadow cursor-pointer"
          >
            Enquire Cab Rates
          </button>
        </div>
      </section>
    </div>
  );
};

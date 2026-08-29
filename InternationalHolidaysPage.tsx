import React, { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  Clock, 
  Check, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  FileCheck,
  Plane
} from 'lucide-react';
import { PageRoute, Destination } from '../types';
import { INTERNATIONAL_DESTINATIONS, FEATURED_PACKAGES } from '../data/travelData';
import { createDestinationWhatsAppLink, createWhatsAppLink } from '../utils/whatsapp';

interface InternationalHolidaysPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: (destinationName: string) => void;
}

export const InternationalHolidaysPage: React.FC<InternationalHolidaysPageProps> = ({
  onNavigate,
  onOpenQuoteModal
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Destinations' },
    { id: 'southeast-asia', label: 'Southeast Asia' },
    { id: 'middle-east', label: 'Middle East (Dubai)' },
    { id: 'islands', label: 'Island Romance (Bali & Maldives)' },
    { id: 'europe', label: 'Europe' }
  ];

  const filteredDestinations = INTERNATIONAL_DESTINATIONS.filter(dest => {
    if (selectedRegion === 'all') return true;
    if (selectedRegion === 'southeast-asia') return ['singapore', 'malaysia', 'thailand', 'vietnam'].includes(dest.id);
    if (selectedRegion === 'middle-east') return ['dubai'].includes(dest.id);
    if (selectedRegion === 'islands') return ['bali', 'maldives'].includes(dest.id);
    if (selectedRegion === 'europe') return ['europe'].includes(dest.id);
    return true;
  });

  return (
    <div className="w-full space-y-12 pb-16 text-white">
      {/* Page Hero Header */}
      <section className="relative bg-[#000814] text-white py-16 sm:py-20 overflow-hidden border-b border-[#002b54]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80" 
            alt="International Holidays"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B18] via-[#001529]/95 to-[#000B18]/80 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-[#001529] border border-[#002b54] px-3.5 py-1 rounded-full text-xs font-semibold text-[#F27D26] mb-4">
            <Globe size={14} className="text-[#F27D26]" />
            <span>Curated International Tours with Complete Visa Assistance</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            International Holiday Packages
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-3 leading-relaxed">
            Explore Singapore, Malaysia, Thailand, Dubai, Bali, Maldives, Vietnam, and Europe. 
            Personalized itineraries with flights from Coimbatore/Chennai, 4-star hotels, transfers, and visa processing.
          </p>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedRegion === tab.id
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

      {/* Main Destination Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {filteredDestinations.map((dest, index) => {
          // Find packages matching this destination
          const relatedPackages = FEATURED_PACKAGES.filter(
            pkg => pkg.destination.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0])
          );

          return (
            <div 
              key={dest.id}
              id={`destination-section-${dest.id}`}
              className="bg-[#001529] rounded-3xl border border-[#002b54] overflow-hidden shadow-xl hover:border-[#F27D26]/50 transition-colors"
            >
              {/* Destination Header Banner */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Large Destination Image */}
                <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[280px]">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001529] via-[#001529]/40 to-transparent lg:hidden" />
                  
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-[#000814]/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm border border-[#002b54]">
                      {dest.idealDuration}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 lg:hidden text-white">
                    <h2 className="font-heading font-extrabold text-2xl drop-shadow">
                      {dest.name}
                    </h2>
                    <p className="text-xs text-[#F27D26] drop-shadow font-semibold">
                      From {dest.startingPrice} per person
                    </p>
                  </div>
                </div>

                {/* Content info */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="hidden lg:flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
                          {dest.country}
                        </span>
                        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                          {dest.name}
                        </h2>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block uppercase font-semibold">Starting from</span>
                        <span className="font-heading font-extrabold text-2xl text-white">
                          {dest.startingPrice}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Visa Info Box */}
                    {dest.visaInfo && (
                      <div className="bg-[#002447] border border-[#003d75] p-3 rounded-xl flex items-center gap-2.5 text-xs text-slate-200">
                        <FileCheck size={16} className="text-[#F27D26] flex-shrink-0" />
                        <span><strong>Visa Status:</strong> {dest.visaInfo}</span>
                      </div>
                    )}

                    {/* Popular Experiences List */}
                    <div className="space-y-2">
                      <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                        Popular Experiences Included:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {dest.popularExperiences.map((exp, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{exp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#002b54] flex flex-col sm:flex-row items-center gap-3">
                    <button
                      id={`get-quote-dest-${dest.id}`}
                      onClick={() => onOpenQuoteModal(`${dest.name} Holiday Package`)}
                      className="w-full sm:w-auto flex-1 bg-[#002447] hover:bg-[#00386e] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition border border-[#00478a] shadow flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Sparkles size={15} className="text-[#F27D26]" />
                      <span>Get Customized {dest.name} Quote</span>
                    </button>

                    <a
                      id={`wa-dest-link-${dest.id}`}
                      href={createDestinationWhatsAppLink(dest.name)}
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

              {/* Related Package Cards if available */}
              {relatedPackages.length > 0 && (
                <div className="bg-[#000e1f] p-6 border-t border-[#002b54]">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                    Sample {dest.name} Itinerary Package:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedPackages.map((pkg) => (
                      <div 
                        key={pkg.id}
                        className="bg-[#001529] rounded-xl p-4 border border-[#002b54] shadow-sm flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-[#F27D26] bg-[#002447] px-2 py-0.5 rounded border border-[#003d75]">
                              {pkg.duration}
                            </span>
                            <span className="font-heading font-extrabold text-base text-white">
                              {pkg.startingPrice}
                            </span>
                          </div>
                          <h5 className="font-heading font-bold text-sm text-white mt-1.5">
                            {pkg.title}
                          </h5>
                          <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
                            {pkg.highlights.slice(0, 2).map((h, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-[#F27D26]"></span>
                                <span className="line-clamp-1">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-[#002b54]">
                          <button
                            onClick={() => onOpenQuoteModal(`${pkg.title}`)}
                            className="flex-1 text-xs font-bold text-slate-300 hover:text-[#F27D26] flex items-center gap-1"
                          >
                            <span>Request Itinerary PDF</span>
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#001529] to-[#002447] rounded-3xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-[#002b54]">
          <div>
            <h3 className="font-heading font-extrabold text-2xl text-white">
              Want a Multi-Country or Custom International Tour?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              We specialize in custom combo trips (e.g. Singapore + Malaysia, Thailand + Vietnam, Switzerland + France).
            </p>
          </div>
          <button
            onClick={() => onNavigate('/custom-trip')}
            className="bg-[#F27D26] hover:bg-[#d96c1e] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow flex-shrink-0 cursor-pointer"
          >
            Design Custom International Trip
          </button>
        </div>
      </section>
    </div>
  );
};

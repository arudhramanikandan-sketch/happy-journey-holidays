import React, { useState, useMemo } from 'react';
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
  Plane,
  Search,
  CheckCircle2,
  Send
} from 'lucide-react';
import { PageRoute, Destination, HolidayPackage } from '../types';
import { INTERNATIONAL_DESTINATIONS } from '../data/travelData';
import { createDestinationWhatsAppLink, createWhatsAppLink } from '../utils/whatsapp';
import { usePublicPackages } from '../utils/usePackages';

interface InternationalHolidaysPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: (destinationName: string) => void;
}

export const InternationalHolidaysPage: React.FC<InternationalHolidaysPageProps> = ({
  onNavigate,
  onOpenQuoteModal
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { packages: dynamicPackages } = usePublicPackages('international');

  const filterTabs = [
    { id: 'all', label: 'All Destinations' },
    { id: 'asia-middle-east', label: 'Asia & Middle East' },
    { id: 'europe', label: 'Europe & Scandinavia' },
    { id: 'africa-holy-land', label: 'Africa & Holy Land' },
    { id: 'americas-oceania', label: 'Americas & Oceania' }
  ];

  const regionMapping: Record<string, string[]> = {
    'asia-middle-east': [
      'singapore', 'malaysia', 'thailand', 'vietnam', 'bali', 'maldives',
      'sri-lanka', 'nepal', 'bhutan', 'japan', 'south-korea', 'taiwan',
      'china', 'cambodia', 'azerbaijan', 'georgia', 'kazakhstan', 'uzbekistan',
      'dubai', 'qatar', 'oman', 'saudi-arabia'
    ],
    'europe': [
      'europe', 'sweden', 'denmark', 'finland', 'iceland', 'norway', 'turkey', 'russia',
      'united-kingdom', 'france', 'belgium', 'netherlands', 'germany', 'switzerland', 'italy', 'vatican-city'
    ],
    'africa-holy-land': [
      'kenya', 'tanzania', 'egypt', 'morocco', 'holy-land', 'mauritius', 'reunion-island'
    ],
    'americas-oceania': [
      'usa', 'canada', 'australia', 'new-zealand'
    ]
  };

  const filteredDestinations = useMemo(() => {
    return INTERNATIONAL_DESTINATIONS.filter(dest => {
      // Region filter
      if (selectedRegion !== 'all') {
        const allowedIds = regionMapping[selectedRegion] || [];
        if (!allowedIds.includes(dest.id)) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesCountry = dest.country.toLowerCase().includes(q);
        const matchesTagline = (dest.tagline || '').toLowerCase().includes(q);
        const matchesHighlights = (dest.highlights || []).some(h => h.toLowerCase().includes(q));
        if (!matchesName && !matchesCountry && !matchesTagline && !matchesHighlights) {
          return false;
        }
      }

      return true;
    });
  }, [selectedRegion, searchQuery]);

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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-[#001529] border border-[#002b54] px-3.5 py-1 rounded-full text-xs font-semibold text-[#F27D26] mb-4">
            <Globe size={14} className="text-[#F27D26]" />
            <span>Worldwide Destinations & Tailormade Itineraries</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            International Holiday Packages
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-3 leading-relaxed">
            Discover 35+ extraordinary worldwide destinations with Happy Journey Holidays. From Asia, Europe, and Scandinavia to the Middle East, Africa, and the Americas — each package is handcrafted with 4-star stays, transfers, visa processing, and dedicated WhatsApp support.
          </p>

          {/* Search and Filters Bar */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destination (e.g. Japan, Kenya, Iceland, Dubai)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#001529] border border-[#002b54] rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F27D26]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
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

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong>{filteredDestinations.length}</strong> destinations</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <MessageCircle size={14} />
              <span>Direct WhatsApp Enquiry: +91 6374509488</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Destination Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-16 bg-[#001529] rounded-3xl border border-[#002b54] p-8">
            <Globe size={40} className="mx-auto text-slate-500 mb-3" />
            <h3 className="font-heading font-bold text-lg text-white">No destinations found</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Try adjusting your search query or selecting "All Destinations".</p>
            <button
              onClick={() => { setSelectedRegion('all'); setSearchQuery(''); }}
              className="mt-4 px-5 py-2 bg-[#F27D26] text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDestinations.map((dest) => {
            // Find packages matching this destination
            const relatedPackages = dynamicPackages.filter(
              pkg => pkg.destination.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0]) ||
                     dest.name.toLowerCase().includes(pkg.destination.toLowerCase().split(' ')[0])
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
                  <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[300px]">
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
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#F27D26] block">
                        {dest.country}
                      </span>
                      <h2 className="font-heading font-extrabold text-2xl drop-shadow">
                        {dest.name}
                      </h2>
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
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
                            Customizable Itinerary
                          </span>
                        </div>
                      </div>

                      {dest.tagline && (
                        <p className="text-xs sm:text-sm font-semibold text-amber-300">
                          {dest.tagline}
                        </p>
                      )}

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {dest.description}
                      </p>

                      {/* Visa Info Box */}
                      {dest.visaInfo && (
                        <div className="bg-[#002447] border border-[#003d75] p-3 rounded-xl flex items-center gap-2.5 text-xs text-slate-200">
                          <FileCheck size={16} className="text-[#F27D26] flex-shrink-0" />
                          <span><strong>Visa Assistance:</strong> {dest.visaInfo}</span>
                        </div>
                      )}

                      {/* Popular Experiences List */}
                      {dest.popularExperiences && dest.popularExperiences.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                            Key Highlights & Experiences:
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
                      )}
                    </div>

                    {/* Actions: SUBMIT TRIP ENQUIRY & ENQUIRE ON WHATSAPP DIRECT */}
                    <div className="pt-4 border-t border-[#002b54] flex flex-col sm:flex-row items-center gap-3">
                      <button
                        id={`quote-dest-${dest.id}`}
                        onClick={() => onOpenQuoteModal(`${dest.name} Tour Package`)}
                        className="w-full sm:w-auto flex-1 bg-[#F27D26] hover:bg-[#d96c1e] text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 active:scale-95 shadow-lg cursor-pointer"
                      >
                        <Send size={16} />
                        <span>Submit Trip Enquiry</span>
                      </button>

                      <a
                        id={`wa-dest-link-${dest.id}`}
                        href={createDestinationWhatsAppLink(dest.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 active:scale-95 shadow-lg hover:shadow-emerald-600/20"
                      >
                        <MessageCircle size={18} />
                        <span>Enquire on WhatsApp Direct</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Related Package Cards if available */}
                {relatedPackages.length > 0 && (
                  <div className="bg-[#000e1f] p-6 border-t border-[#002b54]">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                      Featured Itinerary Package:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {relatedPackages.map((pkg) => (
                        <div 
                          key={pkg.id}
                          className="bg-[#001529] rounded-xl p-5 border border-[#002b54] shadow-sm flex flex-col justify-between space-y-4"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-[#F27D26] bg-[#002447] px-2.5 py-1 rounded border border-[#003d75]">
                                {pkg.duration}
                              </span>
                              <span className="text-xs font-semibold text-slate-300">
                                {pkg.bestFor || 'Families & Couples'}
                              </span>
                            </div>
                            <h5 className="font-heading font-bold text-sm sm:text-base text-white mt-2">
                              {pkg.title}
                            </h5>
                            {pkg.shortDescription && (
                              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                                {pkg.shortDescription}
                              </p>
                            )}

                            {pkg.highlights && pkg.highlights.length > 0 && (
                              <ul className="mt-3 space-y-1 text-[11px] text-slate-300">
                                {pkg.highlights.slice(0, 3).map((h, i) => (
                                  <li key={i} className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26] flex-shrink-0"></span>
                                    <span className="line-clamp-1">{h}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-[#002b54]">
                            <button
                              onClick={() => onOpenQuoteModal(`${pkg.title} (${pkg.destination})`)}
                              className="w-full bg-[#F27D26] hover:bg-[#d96c1e] text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer"
                            >
                              <Send size={13} />
                              <span>Submit Trip Enquiry</span>
                            </button>

                            <a
                              href={createDestinationWhatsAppLink(pkg.destination, pkg.title)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition"
                            >
                              <MessageCircle size={14} />
                              <span>WhatsApp Direct</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#001529] to-[#002447] rounded-3xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-[#002b54]">
          <div>
            <h3 className="font-heading font-extrabold text-2xl text-white">
              Want a Multi-Country or Custom International Tour?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              We specialize in custom combo trips (e.g. Singapore + Malaysia, Thailand + Vietnam, Switzerland + France, Japan + Korea).
            </p>
          </div>
          <a
            href={createWhatsAppLink("Hello Happy Journey Holidays, I would like to design a custom multi-country international tour package. Please share details.")}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-lg flex items-center gap-2 flex-shrink-0"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp (+91 6374509488)</span>
          </a>
        </div>
      </section>
    </div>
  );
};

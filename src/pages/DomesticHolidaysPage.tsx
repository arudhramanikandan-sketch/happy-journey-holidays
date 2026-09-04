import React, { useState, useMemo } from 'react';
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
  Building,
  Send,
  Search,
  CheckCircle2,
  CalendarCheck,
  FileText
} from 'lucide-react';
import { PageRoute, Destination, HolidayPackage } from '../types';
import { DOMESTIC_DESTINATIONS, DOMESTIC_PACKAGES } from '../data/travelData';
import { createDestinationWhatsAppLink, createWhatsAppLink } from '../utils/whatsapp';
import { usePublicPackages } from '../utils/usePackages';
import { SubpageBackKey } from '../components/SubpageBackKey';

interface DomesticHolidaysPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: (destinationName: string) => void;
}

export const DomesticHolidaysPage: React.FC<DomesticHolidaysPageProps> = ({
  onNavigate,
  onOpenQuoteModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { packages: dynamicPackages } = usePublicPackages('domestic');

  // Combine dynamic packages with static domestic packages as fallback
  const allDomesticPackages = useMemo(() => {
    const combined = [...dynamicPackages];
    for (const staticPkg of DOMESTIC_PACKAGES) {
      if (!combined.some(p => p.id === staticPkg.id || p.title === staticPkg.title)) {
        combined.push(staticPkg);
      }
    }
    return combined;
  }, [dynamicPackages]);

  const filterTabs = [
    { id: 'all', label: 'All Domestic Holidays' },
    { id: 'south-hills', label: 'Hill Stations & South India' },
    { id: 'snow-himalayas', label: 'Snow & Himalayas' },
    { id: 'royal-heritage', label: 'Royal Rajasthan & Heritage' },
    { id: 'beach-islands', label: 'Beach & Tropical Islands' },
    { id: 'northeast', label: 'North East & Sikkim' }
  ];

  const categoryMapping: Record<string, string[]> = {
    'south-hills': ['kerala', 'munnar', 'ooty', 'kodaikanal', 'coorg-wayanad', 'tamilnadu-spiritual'],
    'snow-himalayas': ['kashmir', 'himachal', 'ladakh', 'uttarakhand'],
    'royal-heritage': ['rajasthan', 'tamilnadu-spiritual'],
    'beach-islands': ['goa', 'andaman', 'kerala'],
    'northeast': ['sikkim-darjeeling']
  };

  const filteredDestinations = useMemo(() => {
    return DOMESTIC_DESTINATIONS.filter(dest => {
      // Category filter
      if (selectedCategory !== 'all') {
        const allowedIds = categoryMapping[selectedCategory] || [];
        if (!allowedIds.includes(dest.id)) {
          return false;
        }
      }

      // Search filter
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
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full space-y-12 pb-16 text-white">
      {/* Page Hero Header */}
      <section className="relative bg-[#000814] text-white py-16 sm:py-20 overflow-hidden border-b border-[#002b54]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80" 
            alt="Domestic Holidays India"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B18] via-[#001529]/95 to-[#000B18]/80 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SubpageBackKey 
            onNavigate={onNavigate} 
            currentPageName="Domestic Holidays" 
          />

          <div className="inline-flex items-center gap-2 bg-[#001529] border border-[#002b54] px-3.5 py-1 rounded-full text-xs font-semibold text-[#F27D26] mb-4">
            <Compass size={14} className="text-[#F27D26]" />
            <span>Direct Departures & AC Cabs from Coimbatore / South India</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Domestic Holiday Packages
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-3 leading-relaxed">
            Discover the breathtaking wonders of Incredible India with Happy Journey Holidays. From tranquil Kerala backwaters and misty Munnar & Ooty tea estates to the snows of Kashmir and Himachal, royal palaces of Rajasthan, sun-kissed Goa beaches, and turquoise Andaman coral reefs — each package is handcrafted with private AC vehicle transfers, handpicked stays, and 24/7 on-tour WhatsApp support.
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
                placeholder="Search domestic destination (e.g. Munnar, Kashmir, Ooty, Goa, Kerala)..."
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
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
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

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong>{filteredDestinations.length}</strong> domestic destinations</span>
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
            <Compass size={40} className="mx-auto text-slate-500 mb-3" />
            <h3 className="font-heading font-bold text-lg text-white">No domestic destinations found</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Try adjusting your search query or selecting "All Domestic Holidays".</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-5 py-2 bg-[#F27D26] text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDestinations.map((dest) => {
            // Find packages matching this destination
            const relatedPackages = allDomesticPackages.filter(
              pkg => pkg.destination.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0]) ||
                     dest.name.toLowerCase().includes(pkg.destination.toLowerCase().split(' ')[0]) ||
                     (dest.id === 'kerala' && pkg.destination.toLowerCase().includes('kerala')) ||
                     (dest.id === 'munnar' && (pkg.destination.toLowerCase().includes('munnar') || pkg.title.toLowerCase().includes('munnar'))) ||
                     (dest.id === 'ooty' && (pkg.destination.toLowerCase().includes('ooty') || pkg.title.toLowerCase().includes('ooty') || pkg.title.toLowerCase().includes('nilgiri'))) ||
                     (dest.id === 'kodaikanal' && (pkg.destination.toLowerCase().includes('kodaikanal') || pkg.title.toLowerCase().includes('kodai'))) ||
                     (dest.id === 'coorg-wayanad' && (pkg.destination.toLowerCase().includes('coorg') || pkg.destination.toLowerCase().includes('wayanad'))) ||
                     (dest.id === 'kashmir' && pkg.destination.toLowerCase().includes('kashmir')) ||
                     (dest.id === 'himachal' && pkg.destination.toLowerCase().includes('himachal')) ||
                     (dest.id === 'ladakh' && pkg.destination.toLowerCase().includes('ladakh')) ||
                     (dest.id === 'rajasthan' && pkg.destination.toLowerCase().includes('rajasthan')) ||
                     (dest.id === 'goa' && pkg.destination.toLowerCase().includes('goa')) ||
                     (dest.id === 'andaman' && pkg.destination.toLowerCase().includes('andaman')) ||
                     (dest.id === 'tamilnadu-spiritual' && (pkg.destination.toLowerCase().includes('rameshwaram') || pkg.destination.toLowerCase().includes('madurai')))
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

                      {/* Best Time & Transport Perks */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {dest.bestTimeToVisit && (
                          <div className="bg-[#002447] border border-[#003d75] p-3 rounded-xl flex items-center gap-2.5 text-xs text-slate-200">
                            <CalendarCheck size={16} className="text-[#F27D26] flex-shrink-0" />
                            <span><strong>Best Time:</strong> {dest.bestTimeToVisit}</span>
                          </div>
                        )}

                        <div className="bg-[#002447] border border-[#003d75] p-3 rounded-xl flex items-center gap-2.5 text-xs text-slate-200">
                          <Car size={16} className="text-emerald-400 flex-shrink-0" />
                          <span><strong>Transport:</strong> AC Cab from Coimbatore</span>
                        </div>
                      </div>

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
                        onClick={() => onOpenQuoteModal(`${dest.name} Domestic Package`)}
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

                {/* Related Package Cards */}
                {relatedPackages.length > 0 && (
                  <div className="bg-[#000e1f] p-6 border-t border-[#002b54]">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                      Featured Itinerary Packages:
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

                            {/* Key Highlights */}
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

                            {/* Itinerary Summary Snippet */}
                            {pkg.itinerarySummary && pkg.itinerarySummary.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-[#002b54]/60">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                                  Itinerary Highlights:
                                </span>
                                <p className="text-[11px] text-slate-300 italic line-clamp-2">
                                  {pkg.itinerarySummary.slice(0, 3).join(' • ')}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Actions: SUBMIT TRIP ENQUIRY & WHATSAPP DIRECT */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-[#002b54]">
                            <button
                              onClick={() => onOpenQuoteModal(`${pkg.title} (${pkg.destination})`)}
                              className="w-full bg-[#F27D26] hover:bg-[#d96c1e] text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95"
                            >
                              <Send size={13} />
                              <span>Submit Trip Enquiry</span>
                            </button>

                            <a
                              href={createDestinationWhatsAppLink(pkg.destination, pkg.title)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition active:scale-95"
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

      {/* Outstation Cab & Group Departure highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#001529] rounded-3xl p-8 border border-[#002b54] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Need a Dedicated AC Cab from Coimbatore for Ooty / Munnar / Kodaikanal?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              We offer Sedans (Etios/Dzire), Innova Crysta, and 12-20 Seater Tempo Travellers with courteous local drivers for weekend family trips and temple tours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => onOpenQuoteModal('Coimbatore Outstation Cab Rental')}
              className="bg-[#F27D26] hover:bg-[#d96c1e] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow cursor-pointer flex items-center justify-center gap-2"
            >
              <Send size={15} />
              <span>Submit Cab Enquiry</span>
            </button>
            <a
              href={createWhatsAppLink("Hello Happy Journey Holidays, I would like to enquire about outstation AC cab rentals from Coimbatore for a holiday tour.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Cab Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-gradient-to-r from-[#001529] to-[#002447] rounded-3xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-[#002b54]">
          <div>
            <h3 className="font-heading font-extrabold text-2xl text-white">
              Planning a Custom South India or Himalayan Tour?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              We design personalized family itineraries, temple circuits, honeymoon hill packages, and corporate group getaways with flexible dates and doorstep cab pickups.
            </p>
          </div>
          <a
            href={createWhatsAppLink("Hello Happy Journey Holidays, I would like to design a custom domestic India holiday package. Please share details.")}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-lg flex items-center gap-2 flex-shrink-0"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp (+91 6374509488)</span>
          </a>
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

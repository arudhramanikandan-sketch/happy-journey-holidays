import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Star, 
  Search, 
  CheckCircle2, 
  Sliders, 
  BadgePercent, 
  Headphones, 
  Send,
  Calendar,
  Users,
  Compass,
  Plane,
  ChevronRight,
  Quote
} from 'lucide-react';
import { PageRoute, Destination, HolidayPackage } from '../types';
import { 
  INTERNATIONAL_DESTINATIONS, 
  FEATURED_PACKAGES, 
  TRAVEL_SERVICES, 
  TESTIMONIALS, 
  WHY_CHOOSE_US, 
  HOW_IT_WORKS_STEPS 
} from '../data/travelData';
import { DestinationCard } from '../components/DestinationCard';
import { PackageCard } from '../components/PackageCard';
import { ServiceCard } from '../components/ServiceCard';
import { createWhatsAppLink } from '../utils/whatsapp';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: (initialDestinationOrService?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenQuoteModal 
}) => {
  // Quick hero search state
  const [searchDest, setSearchDest] = useState('');
  const [searchMonth, setSearchMonth] = useState('Next 30 Days');
  const [searchType, setSearchType] = useState('Family Holiday');

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchDest) {
      onOpenQuoteModal(`${searchDest} (${searchType}, ${searchMonth})`);
    } else {
      onNavigate('/custom-trip');
    }
  };

  const popularHomeDestinations = INTERNATIONAL_DESTINATIONS.slice(0, 6); // Singapore, Malaysia, Thailand, Dubai, Bali, Maldives

  return (
    <div className="w-full flex flex-col space-y-16 sm:space-y-24 pb-12 text-white">
      {/* 1. HERO SECTION */}
      <section 
        id="hero-section"
        className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-[#000814] text-white overflow-hidden"
      >
        {/* Hero Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85" 
            alt="International Travel Destination"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000B18] via-[#000B18]/90 to-[#001529]/80" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#000B18]/60 to-[#000B18]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center sm:text-left flex flex-col justify-center">
          <div className="max-w-3xl space-y-6">
            {/* Top Credibility Tag */}
            <div className="inline-flex items-center gap-2 bg-[#001529]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#002b54] text-xs font-semibold text-[#F27D26]">
              <Sparkles size={14} className="text-[#F27D26]" />
              <span>Premier Travel Agency & Tour Operator in Coimbatore</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
              Your Journey <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F27D26] via-amber-400 to-amber-200">
                Begins Here
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              Explore the world with Happy Journey Holidays — flights, hotels, holidays, visas and complete travel assistance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                id="hero-plan-my-trip-btn"
                onClick={() => onNavigate('/custom-trip')}
                className="w-full sm:w-auto bg-[#F27D26] hover:bg-[#d96c1e] text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg hover:shadow-[#F27D26]/20 transition transform active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Plan My Trip</span>
                <ArrowRight size={18} />
              </button>

              <a
                id="hero-whatsapp-btn"
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#001529] hover:bg-[#002447] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl border border-[#002b54] backdrop-blur-md transition flex items-center justify-center gap-2.5 shadow-sm"
              >
                <MessageCircle size={18} className="text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Key Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 border-t border-[#002b54]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#F27D26]" />
                <span>100% Customized Itineraries</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-[#F27D26]" />
                <span>Visa & Ticketing Assistance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={15} className="text-[#F27D26]" />
                <span>Neelambur, Coimbatore Office</span>
              </div>
            </div>
          </div>

          {/* Floating Hero Quick-Enquiry Box */}
          <div className="mt-10 lg:mt-12 bg-[#001529]/95 backdrop-blur-lg rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#002b54] text-white max-w-4xl">
            <form onSubmit={handleHeroSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Destination
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={searchDest}
                    onChange={(e) => setSearchDest(e.target.value)}
                    placeholder="e.g. Singapore, Dubai, Kerala..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-medium border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Travel Timing
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-3 text-slate-500" />
                  <select
                    value={searchMonth}
                    onChange={(e) => setSearchMonth(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-medium border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white"
                  >
                    <option value="Next 30 Days">Next 30 Days</option>
                    <option value="Next 2-3 Months">Next 2-3 Months</option>
                    <option value="Summer Holidays">Summer Holidays</option>
                    <option value="Diwali / Year End">Year End / Diwali</option>
                    <option value="Flexible Dates">Flexible Dates</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Trip Type
                </label>
                <div className="relative">
                  <Users size={16} className="absolute left-3 top-3 text-slate-500" />
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-medium border border-[#002b54] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-none bg-[#000e1f] text-white"
                  >
                    <option value="Family Holiday">Family Holiday</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Couple">Couple</option>
                    <option value="Group Tour">Group Tour</option>
                    <option value="Solo Travel">Solo Travel</option>
                    <option value="Business Travel">Business Travel</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  id="hero-quick-search-btn"
                  className="w-full bg-[#002447] hover:bg-[#00386e] text-white font-bold py-2.5 px-4 rounded-xl border border-[#00478a] shadow-md transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                >
                  <Search size={16} className="text-[#F27D26]" />
                  <span>Get Quick Quote</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. POPULAR DESTINATIONS */}
      <section id="popular-destinations-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
              Trending Holidays
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white mt-1">
              Popular Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Curated holiday getaways with hassle-free flight connections, premium stays, and visa assistance.
            </p>
          </div>

          <button
            id="view-all-dest-btn"
            onClick={() => onNavigate('/international-holidays')}
            className="self-start md:self-auto text-xs sm:text-sm font-bold text-slate-300 hover:text-[#F27D26] flex items-center gap-1.5 transition cursor-pointer"
          >
            <span>View All International Holidays</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* 6 Destination cards: Singapore, Malaysia, Thailand, Dubai, Bali, Maldives */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {popularHomeDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onExplore={() => onNavigate('/international-holidays')}
              onGetQuote={(name) => onOpenQuoteModal(name)}
            />
          ))}
        </div>
      </section>

      {/* 3. OUR TRAVEL SERVICES (6 attractive cards) */}
      <section id="travel-services-section" className="bg-[#000814] py-16 sm:py-20 border-y border-[#002b54]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
              What We Do
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white mt-1">
              Our Travel Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              From air tickets and visa processing to complete holiday packages, we handle every detail of your journey.
            </p>
          </div>

          {/* 6 service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRAVEL_SERVICES.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onGetQuote={(title) => onOpenQuoteModal(title)}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              id="home-explore-services-btn"
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-[#001529] border border-[#002b54] hover:border-[#F27D26] px-6 py-3 rounded-xl shadow-sm transition"
            >
              <span>Explore All Travel Services & Cabs</span>
              <ArrowRight size={15} className="text-[#F27D26]" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. FEATURED HOLIDAY PACKAGES */}
      <section id="featured-packages-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
              Handcrafted Itineraries
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white mt-1">
              Featured Holiday Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Transparent pricing, handpicked hotels, and customized inclusions for memorable holidays.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('/international-holidays')}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#002447] text-white border border-[#003d75] hover:border-[#F27D26] transition"
            >
              International
            </button>
            <button
              onClick={() => onNavigate('/domestic-holidays')}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#001529] text-slate-300 border border-[#002b54] hover:text-white transition"
            >
              Domestic
            </button>
          </div>
        </div>

        {/* Featured Package cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_PACKAGES.slice(0, 6).map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onGetQuote={(title) => onOpenQuoteModal(title)}
            />
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE HAPPY JOURNEY HOLIDAYS (4 benefits) */}
      <section id="why-choose-us-section" className="bg-[#000e1f] text-white py-16 sm:py-20 border-y border-[#002b54]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
              The Happy Journey Advantage
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white mt-1">
              Why Choose Happy Journey Holidays
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Based in Coimbatore, we deliver honest pricing, transparent communication, and genuine travel care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => {
              const renderIcon = () => {
                switch (item.iconName) {
                  case 'Sliders':
                    return <Sliders className="w-6 h-6 text-[#F27D26]" />;
                  case 'BadgePercent':
                    return <BadgePercent className="w-6 h-6 text-[#F27D26]" />;
                  case 'CheckCircle2':
                    return <CheckCircle2 className="w-6 h-6 text-[#F27D26]" />;
                  case 'Headphones':
                    return <Headphones className="w-6 h-6 text-[#F27D26]" />;
                  default:
                    return <ShieldCheck className="w-6 h-6 text-[#F27D26]" />;
                }
              };

              return (
                <div 
                  key={idx}
                  className="bg-[#001529] border border-[#002b54] rounded-2xl p-6 hover:border-[#F27D26]/50 transition-colors flex flex-col shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#002447] border border-[#003d75] flex items-center justify-center mb-4">
                    {renderIcon()}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (4 steps) */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
            Simple 4-Step Process
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white mt-1">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Planning your dream holiday is effortless with our streamlined enquiry and booking support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div 
              key={idx}
              className="bg-[#001529] rounded-2xl p-6 border border-[#002b54] shadow-lg relative flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-heading font-extrabold text-[#F27D26] mb-3 block">
                  {step.step}
                </span>
                <h3 className="font-heading font-bold text-base text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#002b54] text-[11px] font-semibold text-[#F27D26]">
                Step {idx + 1} of 4
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section id="customer-reviews-section" className="bg-[#000814] py-16 sm:py-20 border-y border-[#002b54]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
                Traveler Experiences
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white mt-1">
                Customer Reviews
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Real feedback from travelers who booked their international holidays, domestic tours, and visas with us.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-[#001529] px-3.5 py-2 rounded-xl border border-[#002b54] shadow-sm">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">5.0 Star</span>
              <span>Client Satisfaction</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((review) => (
              <div 
                key={review.id}
                className="bg-[#001529] rounded-2xl p-6 border border-[#002b54] shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-800">
                      Verified Traveler
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#002b54] flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-xs text-white">
                      {review.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {review.location}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COIMBATORE LOCAL OFFICE SPOTLIGHT */}
      <section id="coimbatore-office-spotlight" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-br from-[#001529] to-[#002242] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-[#002b54] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="bg-[#F27D26] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Visit Our Coimbatore Office
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Planning from Coimbatore, Tiruppur, or Erode?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Walk into our office at Neelambur, Coimbatore for a direct in-person consultation, passport verification, 
              and custom itinerary planning over a warm cup of coffee.
            </p>
            <div className="text-xs text-amber-300 space-y-1">
              <p>📍 1/149, Ganesh Complex, Avinashi Road, Neelambur, Coimbatore 641 062</p>
              <p>📞 Direct Contact: +91 6374509488 | Mon - Sat (9:30 AM - 7:30 PM)</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={() => onNavigate('/contact')}
              className="bg-[#F27D26] hover:bg-[#d96c1e] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition text-center shadow cursor-pointer"
            >
              Get Office Directions
            </button>
            <a
              href="tel:6374509488"
              className="bg-[#002447] hover:bg-[#00386e] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition text-center border border-[#003d75]"
            >
              Call Our Office Now
            </a>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section id="final-cta-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="bg-[#001529] rounded-3xl p-8 sm:p-12 border border-[#002b54] shadow-2xl max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
            Start Your Adventure
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Ready to Plan Your Next Journey?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Get personalized quotations with flight options, visa assistance, and guaranteed best rates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="final-get-quote-btn"
              onClick={() => onOpenQuoteModal('Customized Holiday Quote')}
              className="w-full sm:w-auto bg-[#F27D26] hover:bg-[#d96c1e] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get a Free Quote</span>
              <ArrowRight size={16} />
            </button>

            <a
              id="final-wa-btn"
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <MessageCircle size={17} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

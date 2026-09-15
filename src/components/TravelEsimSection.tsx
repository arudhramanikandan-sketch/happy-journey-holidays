import React, { useState } from 'react';
import { 
  Wifi, 
  Smartphone, 
  Globe2, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  Tag, 
  Copy, 
  Check, 
  Search, 
  Zap, 
  PlaneTakeoff,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PageRoute } from '../types';
import { 
  ESIM_AFFILIATE_URL, 
  ESIM_PROMO_CODE, 
  ESIM_DISCOUNT_TEXT,
  POPULAR_ESIM_DESTINATIONS, 
  ESIM_ALL_COVERED_COUNTRIES, 
  ESIM_FEATURES 
} from '../utils/esimConfig';

interface TravelEsimSectionProps {
  onNavigate: (route: PageRoute) => void;
}

export const TravelEsimSection: React.FC<TravelEsimSectionProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCountries, setShowAllCountries] = useState(false);

  const handleCopyCode = () => {
    try {
      navigator.clipboard.writeText(ESIM_PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const regions = ['All', 'Asia', 'Europe', 'Middle East', 'Americas', 'Oceania & Africa', 'Regional Passes'];

  const filteredDestinations = POPULAR_ESIM_DESTINATIONS.filter(item => {
    const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.network.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const filteredAllCountries = ESIM_ALL_COVERED_COUNTRIES.filter(c => 
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="travel-esim-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="relative bg-gradient-to-br from-[#000e1f] via-[#00172e] to-[#002242] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#002b54] shadow-2xl overflow-hidden">
        
        {/* Subtle decorative glow accents */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#F27D26]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-semibold mb-3.5 shadow-sm">
            <Wifi size={14} className="animate-pulse text-sky-400" />
            <span>Instant Connectivity • 200+ Destinations Worldwide</span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
            International Travel eSIM
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm sm:leading-relaxed mt-2.5">
            Never pay expensive international roaming charges again. Install a digital travel eSIM in 3 minutes, 
            enjoy high-speed 4G/5G local data across 200+ countries, and keep your primary Indian WhatsApp and banking active.
          </p>
        </div>

        {/* HJH10 Offer Banner */}
        <div className="relative z-10 mt-6 p-4 sm:p-5 rounded-2xl bg-[#001f3f]/80 border border-[#003b6d] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F27D26] to-[#d96c1e] text-white flex items-center justify-center shrink-0 shadow-md">
              <Tag size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-heading font-extrabold text-white text-sm sm:text-base">
                  Special Travel Partner Offer:
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold px-2 py-0.5 rounded-md">
                  {ESIM_DISCOUNT_TEXT}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Apply promo code at checkout on our partner portal to claim flat 10% discount on any global or regional plan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-[#000e1f] border border-amber-500/40 px-3 py-1.5 rounded-xl font-mono text-sm font-extrabold text-amber-300 flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400" />
              <span>{ESIM_PROMO_CODE}</span>
            </div>
            <button
              onClick={handleCopyCode}
              type="button"
              className="bg-[#002b54] hover:bg-[#003d75] active:scale-95 text-white text-xs font-semibold px-3 py-2 rounded-xl transition flex items-center gap-1.5 border border-[#004b8d] cursor-pointer"
              title="Copy promo code"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-300 font-bold">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6">
          {ESIM_FEATURES.map((feat, idx) => (
            <div 
              key={idx}
              className="bg-[#001529]/90 border border-[#002b54] rounded-2xl p-4 transition hover:border-sky-500/40 hover:bg-[#001c38]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F27D26] bg-[#F27D26]/10 px-2 py-0.5 rounded">
                  {feat.badge}
                </span>
                <CheckCircle2 size={15} className="text-sky-400" />
              </div>
              <h3 className="font-heading font-bold text-xs sm:text-sm text-white">
                {feat.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* 200+ Destinations Search & Filter Section */}
        <div className="relative z-10 mt-8 pt-8 border-t border-[#002b54]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <Globe2 size={18} className="text-sky-400" />
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                  Covered in 200+ Destinations Worldwide
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Instant high-speed local 4G/5G data with flexible 1GB, 3GB, 5GB, 10GB, and unlimited day plans.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search countries (e.g. Dubai, Japan)..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#000e1f] text-white placeholder-slate-500 border border-[#002b54] rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {regions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition whitespace-nowrap cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                    : 'bg-[#001529] text-slate-300 border-[#002b54] hover:text-white hover:bg-[#001c38]'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Destination Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
            {filteredDestinations.slice(0, 12).map((item) => (
              <div 
                key={item.code}
                className="bg-[#001529] border border-[#002b54] rounded-xl p-3 flex flex-col justify-between hover:border-sky-500/50 transition group hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xl" role="img" aria-label={item.name}>
                      {item.flag}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      4G/5G
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-xs text-white line-clamp-1 group-hover:text-sky-300 transition">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {item.network}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#002242] flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Local Data</span>
                  <span className="text-[11px] font-bold text-sky-400">
                    Prepaid eSIM
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 200+ Full Country Pill Drawer Toggle */}
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setShowAllCountries(!showAllCountries)}
              className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer py-1 px-3 rounded-lg hover:bg-sky-500/10 transition"
            >
              <span>{showAllCountries ? 'Hide Full Destinations List' : 'Browse All 200+ Supported Countries & Islands'}</span>
              {showAllCountries ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showAllCountries && (
              <div className="mt-3 p-4 rounded-2xl bg-[#001024] border border-[#002b54] text-left animate-in fade-in duration-200">
                <p className="text-xs text-slate-400 mb-3 font-semibold">
                  Global coverage across Europe, Asia-Pacific, North & South America, Middle East, and Africa:
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto pr-1">
                  {filteredAllCountries.map((country, idx) => (
                    <span 
                      key={idx}
                      className="text-[11px] bg-[#001833] text-slate-300 px-2.5 py-1 rounded-md border border-[#002b54]"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="relative z-10 mt-8 pt-6 border-t border-[#002b54] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span>Instant delivery via email QR code • Compatible with iPhone, Samsung Galaxy, Pixel & more</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Button 1: Get Your Travel eSIM (opening affiliate link in new tab) */}
            <a
              id="home-get-esim-btn"
              href={ESIM_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#F27D26] hover:bg-[#d96c1e] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap size={16} className="fill-current" />
              <span>Get Your Travel eSIM</span>
              <ExternalLink size={14} />
            </a>

            {/* Button 2: Explore Travel eSIM (navigating to the new page) */}
            <button
              id="home-explore-esim-btn"
              type="button"
              onClick={() => onNavigate('/travel-esim')}
              className="w-full sm:w-auto bg-[#001f3f] hover:bg-[#002d5a] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-[#00407a] hover:border-sky-400 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Travel eSIM</span>
              <ArrowRight size={15} className="text-sky-400" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

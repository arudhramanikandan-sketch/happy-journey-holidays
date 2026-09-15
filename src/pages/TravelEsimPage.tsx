import React, { useState } from 'react';
import { 
  Wifi, 
  Smartphone, 
  Globe, 
  ShieldCheck, 
  ExternalLink, 
  Tag, 
  Copy, 
  Check, 
  Search, 
  Zap, 
  QrCode, 
  Clock, 
  PhoneCall, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  HelpCircle,
  Layers,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { PageRoute } from '../types';
import { SubpageBackKey } from '../components/SubpageBackKey';
import { 
  ESIM_AFFILIATE_URL, 
  ESIM_PROMO_CODE, 
  ESIM_DISCOUNT_TEXT,
  POPULAR_ESIM_DESTINATIONS, 
  ESIM_ALL_COVERED_COUNTRIES, 
  ESIM_FEATURES,
  ESIM_FAQS 
} from '../utils/esimConfig';
import { COMPANY_PHONE, createWhatsAppLink } from '../utils/whatsapp';

interface TravelEsimPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal?: (service?: string) => void;
}

export const TravelEsimPage: React.FC<TravelEsimPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

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

  return (
    <div className="w-full space-y-12 pb-16 text-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#000814] py-16 sm:py-20 overflow-hidden border-b border-[#002b54]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80" 
            alt="International Travel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-[#000814]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SubpageBackKey 
            onNavigate={onNavigate} 
            fallbackRoute="/" 
            label="Back to Home"
            currentPageName="International Travel eSIM" 
          />

          <div className="max-w-3xl mt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-semibold mb-4 shadow-sm">
              <Wifi size={14} className="animate-pulse text-sky-400" />
              <span>International Travel eSIM • 200+ Destinations Worldwide</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              High-Speed Global Data with Zero Roaming Bills
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Stay connected the moment your flight touches down. Install a digital eSIM directly on your phone in under 3 minutes, 
              keep your Indian WhatsApp active, and enjoy instant 4G/5G local mobile internet across 200+ countries.
            </p>

            {/* HJH10 Offer Callout */}
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#001f3f]/90 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F27D26] to-[#d96c1e] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Tag size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-white text-sm sm:text-base">
                      Promo Code: {ESIM_PROMO_CODE}
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded">
                      {ESIM_DISCOUNT_TEXT}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Exclusive Happy Journey Holidays traveler discount at checkout.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="bg-[#002b54] hover:bg-[#003d75] active:scale-95 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 border border-[#004b8d] cursor-pointer"
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

                <a
                  href={ESIM_AFFILIATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#F27D26] hover:bg-[#d96c1e] text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Buy eSIM Now</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS - 4 SIMPLE STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
            Effortless Setup
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
            How Travel eSIM Works in 4 Simple Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            No physical plastic SIM swapping, no airport queues, no paperwork required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#001529] border border-[#002b54] rounded-2xl p-5 relative">
            <span className="absolute top-4 right-4 text-2xl font-mono font-extrabold text-slate-600">01</span>
            <div className="w-10 h-10 rounded-xl bg-sky-950 text-sky-400 border border-sky-800/40 flex items-center justify-center mb-3">
              <Globe size={20} />
            </div>
            <h3 className="font-heading font-bold text-sm text-white">Choose Your Destination</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Select any country or regional pass (e.g. Europe 39 Countries, Asia 18 Countries) and pick your preferred data amount (1GB to 20GB or Unlimited).
            </p>
          </div>

          <div className="bg-[#001529] border border-[#002b54] rounded-2xl p-5 relative">
            <span className="absolute top-4 right-4 text-2xl font-mono font-extrabold text-slate-600">02</span>
            <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 border border-amber-800/40 flex items-center justify-center mb-3">
              <Tag size={20} />
            </div>
            <h3 className="font-heading font-bold text-sm text-white">Apply Promo Code HJH10</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Enter coupon code <strong className="text-amber-300">HJH10</strong> at checkout to get an instant flat 10% discount on your international data package.
            </p>
          </div>

          <div className="bg-[#001529] border border-[#002b54] rounded-2xl p-5 relative">
            <span className="absolute top-4 right-4 text-2xl font-mono font-extrabold text-slate-600">03</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/40 flex items-center justify-center mb-3">
              <QrCode size={20} />
            </div>
            <h3 className="font-heading font-bold text-sm text-white">Scan & Install QR Code</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Receive your digital eSIM QR code instantly via email. Scan it in your phone's Cellular Settings before departure or over hotel WiFi.
            </p>
          </div>

          <div className="bg-[#001529] border border-[#002b54] rounded-2xl p-5 relative">
            <span className="absolute top-4 right-4 text-2xl font-mono font-extrabold text-slate-600">04</span>
            <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 border border-purple-800/40 flex items-center justify-center mb-3">
              <Zap size={20} />
            </div>
            <h3 className="font-heading font-bold text-sm text-white">Land & Connect Instantly</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Turn on Data Roaming on the eSIM line once your flight lands. Your phone automatically latches onto premier local 4G/5G networks.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 200+ DESTINATIONS BROWSER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#001529] border border-[#002b54] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
                Global Telecom Coverage
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
                Explore 200+ Supported Destinations
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Flexible data packages with Tier-1 high speed 4G/5G local network coverage.
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country (e.g. Dubai, Switzerland)..."
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-[#000e1f] text-white placeholder-slate-500 border border-[#002b54] rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none mb-4">
            {regions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`text-xs font-semibold px-3.5 py-2 rounded-xl border transition whitespace-nowrap cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-sky-500 text-white border-sky-500 shadow-md'
                    : 'bg-[#000e1f] text-slate-300 border-[#002b54] hover:text-white hover:bg-[#002242]'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDestinations.map((dest) => (
              <div 
                key={dest.code}
                className="bg-[#000e1f] border border-[#002b54] rounded-2xl p-4 flex flex-col justify-between hover:border-sky-500/50 transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl" role="img" aria-label={dest.name}>
                      {dest.flag}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                      5G / 4G LTE
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-sm text-white group-hover:text-sky-300 transition">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Partner: <span className="text-slate-300 font-medium">{dest.network}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#002447] flex items-center justify-between">
                  <span className="text-[11px] text-sky-400 font-medium">
                    Prepaid 4G/5G
                  </span>

                  <a
                    href={ESIM_AFFILIATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#F27D26] hover:bg-[#d96c1e] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>View Plans</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Complete 200+ Country Tag Cloud */}
          <div className="mt-8 pt-6 border-t border-[#002b54]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Full List of 200+ Supported Countries & Islands
            </h4>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
              {ESIM_ALL_COVERED_COUNTRIES.map((c, i) => (
                <span 
                  key={i} 
                  className="text-xs bg-[#000e1f] text-slate-300 px-3 py-1 rounded-lg border border-[#002b54]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPATIBILITY & FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Compatibility Checker Card */}
          <div className="bg-[#001529] border border-[#002b54] rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-950 text-sky-400 border border-sky-800/40 flex items-center justify-center">
              <Smartphone size={24} />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-white">
              Is My Phone Compatible?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If your smartphone was purchased in 2019 or later, it almost certainly supports eSIM. Here is the quick compatibility check:
            </p>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Apple iPhone:</strong> iPhone XR, XS, 11, 12, 13, 14, 15, and 16 series.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Samsung Galaxy:</strong> S20, S21, S22, S23, S24, S25 series, Z Fold, Z Flip.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Google Pixel:</strong> Pixel 3, 4, 5, 6, 7, 8, 9 series.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Dial Check:</strong> Dial <code className="bg-[#000e1f] px-1 py-0.5 rounded text-amber-300 font-mono">*#06#</code> on your phone keypad. If an <strong>EID number</strong> appears on screen, your device supports eSIM!</span>
              </li>
            </ul>
          </div>

          {/* Frequently Asked Questions */}
          <div className="lg:col-span-2 bg-[#001529] border border-[#002b54] rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle size={22} className="text-[#F27D26]" />
              <h3 className="font-heading font-extrabold text-xl text-white">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {ESIM_FAQS.map((faq, idx) => (
                <div 
                  key={idx}
                  className="border border-[#002b54] rounded-2xl overflow-hidden bg-[#000e1f]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:text-sky-300 transition"
                  >
                    <span>{faq.q}</span>
                    {activeFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeFaq === idx && (
                    <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-[#002447]">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL ACTION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="bg-gradient-to-r from-[#001529] via-[#002242] to-[#001529] rounded-3xl p-8 sm:p-12 border border-[#002b54] shadow-2xl max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
            Ready For Takeoff?
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            Get Your International Travel eSIM Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Use code <strong className="text-amber-300 font-mono">HJH10</strong> at checkout for an instant 10% discount on any destination. Need help setting it up? Our Coimbatore team is on standby to assist you!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={ESIM_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#F27D26] hover:bg-[#d96c1e] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Your Travel eSIM (10% OFF)</span>
              <ExternalLink size={16} />
            </a>

            <a
              href={createWhatsAppLink("Hi Happy Journey Holidays, I need assistance choosing an international travel eSIM for my upcoming trip.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <MessageCircle size={17} />
              <span>Ask Our Team on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

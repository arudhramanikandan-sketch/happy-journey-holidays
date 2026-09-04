import React from 'react';
import { 
  Plane, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  MessageCircle, 
  ArrowRight, 
  Award,
  Clock
} from 'lucide-react';
import { PageRoute } from '../types';
import { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_PHONE, createWhatsAppLink } from '../utils/whatsapp';
import { SubpageBackKey } from '../components/SubpageBackKey';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: (topic?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuoteModal }) => {
  return (
    <div className="w-full space-y-16 pb-16 text-white">
      {/* About Hero Header */}
      <section className="relative bg-[#000814] text-white py-16 sm:py-20 overflow-hidden border-b border-[#002b54]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80" 
            alt="About Happy Journey Holidays"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B18] via-[#001529]/95 to-[#000B18]/80 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <SubpageBackKey 
            onNavigate={onNavigate} 
            currentPageName="About Us" 
          />

          <div className="inline-flex items-center gap-2 bg-[#001529] border border-[#002b54] px-3.5 py-1 rounded-full text-xs font-semibold text-[#F27D26] mb-4">
            <Heart size={14} className="text-[#F27D26]" />
            <span>Passionate Tour Operator in Coimbatore</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            About Happy Journey Holidays
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-3 leading-relaxed">
            Crafting joyful, stress-free travel memories with customized holiday packages, seamless visa assistance, 
            and honest local support from the heart of Coimbatore, Tamil Nadu.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
              Our Journey
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white">
              Your Dedicated Travel Companion in Coimbatore
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Happy Journey Holidays</strong> was founded with a singular purpose: to make world-class travel accessible, 
              stress-free, and memorable for families, couples, groups, and business travelers from Coimbatore and across South India.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Unlike generic online portals where travelers are treated as transaction numbers, we take the time to understand your pace, 
              food preferences, budget, and travel dreams. Whether it’s an overwater villa in Maldives, thrilling theme parks in Singapore, 
              or a peaceful tea estate cottage in Munnar, we tailor every detail to perfection.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-xs text-white">Transparent Pricing</h4>
                  <p className="text-xs text-slate-400">No hidden fees, inflated currency rates, or unexpected surcharges.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-xs text-white">24/7 On-Tour Support</h4>
                  <p className="text-xs text-slate-400">Real-time WhatsApp coordination from departure until your safe arrival back home.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-xs text-white">Complete In-House Visa Desk</h4>
                  <p className="text-xs text-slate-400">Dedicated document scrutiny and appointment booking assistance for high approval rates.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#002b54]">
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80" 
                alt="Travel Destinations"
                className="w-full h-96 object-cover opacity-90"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-[#001529] p-5 rounded-2xl shadow-2xl border border-[#002b54] hidden sm:flex items-center gap-3.5 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-[#002447] text-[#F27D26] flex items-center justify-center flex-shrink-0 border border-[#003d75]">
                <MapPin size={24} />
              </div>
              <div>
                <h5 className="font-heading font-bold text-xs text-white">Coimbatore Office</h5>
                <p className="text-[11px] text-slate-400">Ganesh Complex, Neelambur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#000e1f] py-16 border-y border-[#002b54]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
              Our Core Principles
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
              What Defines Our Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#001529] rounded-2xl p-6 border border-[#002b54] shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#002447] text-[#F27D26] border border-[#003d75] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-heading font-bold text-base text-white">
                Customer-First Customization
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We believe no two travelers are alike. We never force fixed package itineraries; every schedule is customized to your personal pace, interests, and diet.
              </p>
            </div>

            <div className="bg-[#001529] rounded-2xl p-6 border border-[#002b54] shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#002447] text-[#F27D26] border border-[#003d75] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-heading font-bold text-base text-white">
                Integrity & Fair Pricing
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We maintain direct contracts with hoteliers, airlines, and local ground handlers so that our customers receive genuine value without surprise add-ons.
              </p>
            </div>

            <div className="bg-[#001529] rounded-2xl p-6 border border-[#002b54] shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#002447] text-[#F27D26] border border-[#003d75] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-heading font-bold text-base text-white">
                Uncompromising Safety & Care
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                From comprehensive overseas travel insurance to vetted drivers and verified 3 to 5-star properties, traveler safety is our highest priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office & Direct Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#001529] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#002b54] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26]">
              Personalized Consultation
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Ready to Discuss Your Next Trip?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Drop by our Neelambur, Coimbatore office or connect with us on WhatsApp for an immediate quotation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={() => onNavigate('/custom-trip')}
              className="bg-[#F27D26] hover:bg-[#d96c1e] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow text-center cursor-pointer"
            >
              Plan Custom Trip
            </button>
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition text-center flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Bottom Back Key */}
        <div className="flex justify-center pt-6">
          <SubpageBackKey 
            onNavigate={onNavigate} 
            label="Back to Home Page"
          />
        </div>
      </section>
    </div>
  );
};

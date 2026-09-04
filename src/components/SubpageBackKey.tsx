import React from 'react';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { PageRoute } from '../types';

interface SubpageBackKeyProps {
  onNavigate?: (route: PageRoute) => void;
  fallbackRoute?: PageRoute;
  label?: string;
  currentPageName?: string;
  className?: string;
}

export const SubpageBackKey: React.FC<SubpageBackKeyProps> = ({
  onNavigate,
  fallbackRoute = '/',
  label = 'Back to Home',
  currentPageName,
  className = ''
}) => {
  const handleBack = () => {
    // If there is history within the session, navigate back; otherwise fallback to route
    if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
      window.history.back();
    } else if (onNavigate) {
      onNavigate(fallbackRoute);
    } else if (typeof window !== 'undefined') {
      window.location.href = fallbackRoute;
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/');
    } else if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <nav aria-label="Breadcrumb and Back Navigation" className={`flex flex-wrap items-center gap-2.5 mb-5 sm:mb-6 ${className}`}>
      {/* Primary Back Button */}
      <button
        type="button"
        id="subpage-back-key-btn"
        onClick={handleBack}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#001529]/90 hover:bg-[#002447] text-slate-200 hover:text-white border border-[#002b54] hover:border-[#F27D26]/70 transition-all duration-200 shadow-md backdrop-blur-md group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F27D26]/50 active:scale-95"
        title="Go back to previous page"
        aria-label="Go back to previous page"
      >
        <ArrowLeft size={14} className="text-[#F27D26] group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="font-medium">{label}</span>
      </button>

      {/* Optional Breadcrumb Trail */}
      {currentPageName && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <ChevronRight size={13} className="text-slate-600 flex-shrink-0" />
          <button
            type="button"
            id="subpage-breadcrumb-home-link"
            onClick={handleHomeClick}
            className="text-slate-400 hover:text-white flex items-center gap-1 transition cursor-pointer hover:underline"
            title="Return to Home page"
          >
            <Home size={12} className="text-slate-400 hover:text-[#F27D26]" />
            <span>Home</span>
          </button>
          <ChevronRight size={13} className="text-slate-600 flex-shrink-0" />
          <span className="text-slate-300 font-semibold truncate max-w-[240px] sm:max-w-none">
            {currentPageName}
          </span>
        </div>
      )}
    </nav>
  );
};

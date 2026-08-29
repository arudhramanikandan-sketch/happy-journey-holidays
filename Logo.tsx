import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'horizontal';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  darkBg?: boolean;
}

/**
 * High-fidelity vector emblem representing the official Happy Journey Holidays logo:
 * - Sunset disc with gradient
 * - Dual coconut palm trees
 * - Blue ocean/globe sphere with cyan wave crest
 * - Orbiting flight swoosh
 * - Ascending jet airliner
 */
export const LogoEmblem: React.FC<{ className?: string; size?: number }> = ({ 
  className = '', 
  size = 48 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 ${className}`}
      aria-label="Happy Journey Holidays Logo Emblem"
    >
      <defs>
        {/* Sun Gradient */}
        <linearGradient id="sunGrad" x1="50" y1="20" x2="150" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA000" />
          <stop offset="50%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#F25000" />
        </linearGradient>

        {/* Ocean / Globe Dark Blue Gradient */}
        <linearGradient id="globeGrad" x1="60" y1="80" x2="160" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0062D2" />
          <stop offset="50%" stopColor="#003E9E" />
          <stop offset="100%" stopColor="#001F5C" />
        </linearGradient>

        {/* Airplane Blue Gradient */}
        <linearGradient id="planeGrad" x1="100" y1="60" x2="180" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0080FF" />
          <stop offset="100%" stopColor="#0052CC" />
        </linearGradient>

        {/* Swoosh Orbit Gradient */}
        <linearGradient id="swooshGrad" x1="30" y1="120" x2="170" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF7A00" />
          <stop offset="35%" stopColor="#005BB5" />
          <stop offset="100%" stopColor="#0091FF" />
        </linearGradient>

        {/* Light Wave Highlight */}
        <linearGradient id="waveHighlight" x1="60" y1="100" x2="140" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38B6FF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#004DA8" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* Sun Circle & Glow */}
      <circle cx="100" cy="76" r="46" fill="url(#sunGrad)" />

      {/* Sun rays subtle crescent rim */}
      <path
        d="M62 70 C66 40, 100 32, 138 48 C144 65, 140 85, 130 96 C115 75, 85 68, 62 70 Z"
        fill="#FFB74D"
        opacity="0.35"
      />

      {/* Left Coconut Palm Tree (White) */}
      <g fill="#FFFFFF" opacity="0.98">
        {/* Palm Trunk */}
        <path d="M74 96 Q70 68 77 48 Q79 48 77 68 Q75 96 74 96 Z" />
        {/* Fronds */}
        <path d="M77 48 Q58 40 52 50 Q62 45 77 48 Z" />
        <path d="M77 48 Q64 30 74 24 Q76 34 77 48 Z" />
        <path d="M77 48 Q87 30 95 38 Q85 40 77 48 Z" />
        <path d="M77 48 Q95 46 97 58 Q87 52 77 48 Z" />
        <path d="M77 48 Q69 52 61 60 Q67 52 77 48 Z" />
      </g>

      {/* Right Smaller Palm Tree (White) */}
      <g fill="#FFFFFF" opacity="0.98">
        {/* Palm Trunk */}
        <path d="M96 93 Q93 74 98 60 Q100 60 98 74 Q96 93 96 93 Z" />
        {/* Fronds */}
        <path d="M98 60 Q85 53 81 61 Q88 57 98 60 Z" />
        <path d="M98 60 Q89 46 96 41 Q97 50 98 60 Z" />
        <path d="M98 60 Q106 46 112 52 Q104 54 98 60 Z" />
        <path d="M98 60 Q111 59 113 68 Q105 63 98 60 Z" />
      </g>

      {/* Lower Globe / Deep Blue Ocean Sphere */}
      <path
        d="M52 96 C52 133 78 160 110 160 C134 160 153 144 160 123 C146 136 124 143 102 140 C72 136 56 116 52 96 Z"
        fill="url(#globeGrad)"
      />
      <path
        d="M54 98 C58 130 80 154 108 154 C138 154 162 130 162 100 C145 123 115 133 85 123 C68 117 58 107 54 98 Z"
        fill="url(#globeGrad)"
      />

      {/* Curved Ocean Wave / Leaf Crest */}
      <path
        d="M52 100 C70 90 105 93 135 118 C105 134 70 126 52 100 Z"
        fill="url(#waveHighlight)"
      />

      {/* Orbiting Flight Trail Swoosh (Orange to Blue wrap) */}
      <path
        d="M44 114 C38 130 44 146 60 154 C80 164 115 160 150 132 C120 152 85 154 65 144 C52 138 46 126 48 114 Z"
        fill="#FF7A00"
      />
      <path
        d="M48 114 C54 83 82 63 118 62 C90 68 65 86 58 113 C52 136 72 150 98 152 C72 148 48 136 48 114 Z"
        fill="#004DA8"
        opacity="0.85"
      />

      {/* Ascending Flight Jet Trail */}
      <path
        d="M58 134 C78 136 112 122 145 90 L140 86 C108 116 78 130 58 134 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />

      {/* Jet Airplane Flying Upward-Right */}
      <g>
        {/* Airplane Fuselage & Wings */}
        <path
          d="M130 96 L168 60 C173 56 178 58 178 63 C178 66 174 70 168 74 L152 90 L158 114 L149 120 L140 100 L124 112 L123 122 L117 125 L115 114 L104 108 L107 102 L118 105 L130 96 Z"
          fill="url(#planeGrad)"
        />
        {/* Plane Wing Top Accent */}
        <path
          d="M152 90 L172 71 C175 68 176 65 174 63 L138 86 L152 90 Z"
          fill="#38B6FF"
        />
        {/* Opposite Wing */}
        <path
          d="M142 82 L146 62 L154 60 L150 76 Z"
          fill="#003E9E"
        />
      </g>
    </svg>
  );
};

/**
 * Luggage Suitcase Icon representing the letter "O" in JOURNEY
 */
export const SuitcaseLetterO: React.FC<{ className?: string; size?: number }> = ({ 
  className = '', 
  size = 20 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block align-middle flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Top Handle */}
      <path
        d="M8.5 4.5C8.5 3.67 9.17 3 10 3H14C14.83 3 15.5 3.67 15.5 4.5V6H8.5V4.5Z"
        fill="currentColor"
      />
      {/* Main Suitcase Body */}
      <rect
        x="4.5"
        y="5.5"
        width="15"
        height="15"
        rx="2.5"
        fill="currentColor"
      />
      {/* Handle Cutout */}
      <rect
        x="10"
        y="4"
        width="4"
        height="2"
        rx="0.5"
        fill="#000B18"
      />
      {/* Front Accent Pocket / Seam */}
      <rect
        x="7.5"
        y="8.5"
        width="9"
        height="9"
        rx="1.5"
        fill="#000B18"
        opacity="0.3"
      />
      {/* Bottom Wheels */}
      <circle cx="7.5" cy="21.5" r="1.2" fill="currentColor" />
      <circle cx="16.5" cy="21.5" r="1.2" fill="currentColor" />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'horizontal', 
  className = '', 
  size = 'md',
  darkBg = true 
}) => {
  const pixelSizes = {
    sm: 36,
    md: 46,
    lg: 60,
    xl: 84
  };

  const currentSize = pixelSizes[size];

  if (variant === 'icon') {
    return <LogoEmblem size={currentSize} className={className} />;
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <LogoEmblem size={size === 'xl' ? 140 : size === 'lg' ? 100 : 80} />
        <div className="mt-3 space-y-1">
          {/* HAPPY */}
          <div className="font-heading font-black tracking-[0.08em] leading-none text-2xl sm:text-3xl lg:text-4xl text-[#0066D6] drop-shadow-sm">
            HAPPY
          </div>
          {/* JOURNEY with Suitcase O */}
          <div className="flex items-center justify-center font-heading font-black tracking-[0.05em] leading-none text-2xl sm:text-3xl lg:text-4xl text-[#F27D26]">
            <span>J</span>
            <span className="mx-0.5 transform scale-90">
              <SuitcaseLetterO size={size === 'xl' ? 32 : size === 'lg' ? 24 : 20} className="text-[#F27D26]" />
            </span>
            <span>URNEY</span>
          </div>
          {/* — HOLIDAYS — */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="w-6 h-[2px] bg-[#00478A]"></span>
            <span className="text-[11px] sm:text-xs font-black tracking-[0.3em] uppercase text-white">
              HOLIDAYS
            </span>
            <span className="w-6 h-[2px] bg-[#00478A]"></span>
          </div>
          {/* Tagline */}
          <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase text-slate-300 pt-0.5">
            TRAVEL THE WORLD WITH US
          </p>
        </div>
      </div>
    );
  }

  // Default: 'horizontal' (Ideal for Header Navbar and Footer)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Emblem */}
      <div className="relative flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
        <LogoEmblem size={currentSize} />
      </div>

      {/* Typography Stack matching Brand Identity */}
      <div className="flex flex-col justify-center leading-none text-left">
        <div className="flex items-baseline gap-1.5 font-heading">
          {/* HAPPY in Crisp Royal Blue/White contrast */}
          <span className="font-black text-lg sm:text-xl md:text-2xl tracking-tight text-[#38B6FF] drop-shadow-sm">
            HAPPY
          </span>
          {/* JOURNEY with Suitcase O in Vibrant Orange */}
          <span className="inline-flex items-center font-black text-lg sm:text-xl md:text-2xl tracking-tight text-[#F27D26] drop-shadow-sm">
            <span>J</span>
            <span className="mx-[1px] transform scale-85 inline-block">
              <SuitcaseLetterO size={size === 'lg' ? 20 : 16} className="text-[#F27D26]" />
            </span>
            <span>URNEY</span>
          </span>
        </div>

        {/* — HOLIDAYS — */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-3.5 h-[1.5px] bg-[#00478A]"></span>
          <span className="text-[9px] sm:text-[10px] font-black tracking-[0.22em] uppercase text-white">
            HOLIDAYS
          </span>
          <span className="w-3.5 h-[1.5px] bg-[#00478A]"></span>
        </div>

        {/* Tagline */}
        <span className="text-[8px] sm:text-[9px] font-bold tracking-wider uppercase text-slate-400 mt-0.5">
          TRAVEL THE WORLD WITH US
        </span>
      </div>
    </div>
  );
};

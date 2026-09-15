export const ESIM_AFFILIATE_URL = 
  import.meta.env.VITE_TRAVEL_ESIM_AFFILIATE_URL || 
  'https://discover.airalo.com/happyjourneyholidays/';

export const ESIM_PROMO_CODE = 'HJH10';
export const ESIM_DISCOUNT_TEXT = 'Flat 10% OFF';

export interface EsimDestination {
  name: string;
  code: string;
  flag: string;
  region: 'Asia' | 'Europe' | 'Middle East' | 'Americas' | 'Oceania & Africa' | 'Regional Passes';
  startingPriceUsd: number;
  startingPriceInr: number;
  network: string;
  popular?: boolean;
}

export const POPULAR_ESIM_DESTINATIONS: EsimDestination[] = [
  { name: 'Singapore', code: 'SG', flag: '🇸🇬', region: 'Asia', startingPriceUsd: 4.5, startingPriceInr: 375, network: 'Singtel / StarHub 5G', popular: true },
  { name: 'Malaysia', code: 'MY', flag: '🇲🇾', region: 'Asia', startingPriceUsd: 4.5, startingPriceInr: 375, network: 'Celcom / Maxis 5G', popular: true },
  { name: 'Thailand', code: 'TH', flag: '🇹🇭', region: 'Asia', startingPriceUsd: 6.9, startingPriceInr: 580, network: 'AIS / DTAC 5G', popular: true },
  { name: 'United Arab Emirates (Dubai)', code: 'AE', flag: '🇦🇪', region: 'Middle East', startingPriceUsd: 8.5, startingPriceInr: 710, network: 'Etisalat / du 5G', popular: true },
  { name: 'Indonesia (Bali)', code: 'ID', flag: '🇮🇩', region: 'Asia', startingPriceUsd: 5.5, startingPriceInr: 460, network: 'Telkomsel 4G/5G', popular: true },
  { name: 'Vietnam', code: 'VN', flag: '🇻🇳', region: 'Asia', startingPriceUsd: 4.5, startingPriceInr: 375, network: 'Viettel 4G/5G', popular: true },
  { name: 'Japan', code: 'JP', flag: '🇯🇵', region: 'Asia', startingPriceUsd: 4.5, startingPriceInr: 375, network: 'SoftBank / NTT Docomo', popular: true },
  { name: 'United Kingdom (London)', code: 'GB', flag: '🇬🇧', region: 'Europe', startingPriceUsd: 5.0, startingPriceInr: 420, network: 'O2 / Vodafone 5G', popular: true },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭', region: 'Europe', startingPriceUsd: 4.5, startingPriceInr: 375, network: 'Swisscom / Sunrise', popular: true },
  { name: 'France (Paris)', code: 'FR', flag: '🇫🇷', region: 'Europe', startingPriceUsd: 4.5, startingPriceInr: 375, network: 'Orange / SFR 5G', popular: true },
  { name: 'Italy (Rome, Venice)', code: 'IT', flag: '🇮🇹', region: 'Europe', startingPriceUsd: 4.5, startingPriceInr: 375, network: 'TIM / Vodafone 5G', popular: true },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', region: 'Europe', startingPriceUsd: 5.0, startingPriceInr: 420, network: 'Telekom / Vodafone', popular: true },
  { name: 'United States', code: 'US', flag: '🇺🇸', region: 'Americas', startingPriceUsd: 4.5, startingPriceInr: 375, network: 'T-Mobile / AT&T 5G', popular: true },
  { name: 'Australia', code: 'AU', flag: '🇦🇺', region: 'Oceania & Africa', startingPriceUsd: 4.5, startingPriceInr: 375, network: 'Telstra / Optus 5G', popular: true },
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', region: 'Middle East', startingPriceUsd: 6.0, startingPriceInr: 500, network: 'STC / Mobily 5G', popular: true },
  { name: 'Qatar', code: 'QA', flag: '🇶🇦', region: 'Middle East', startingPriceUsd: 6.0, startingPriceInr: 500, network: 'Ooredoo / Vodafone', popular: true },
  { name: 'Sri Lanka', code: 'LK', flag: '🇱🇰', region: 'Asia', startingPriceUsd: 5.0, startingPriceInr: 420, network: 'Dialog / Mobitel', popular: true },
  { name: 'Maldives', code: 'MV', flag: '🇲🇻', region: 'Asia', startingPriceUsd: 15.0, startingPriceInr: 1250, network: 'Dhiraagu / Ooredoo', popular: true },
  { name: 'Mauritius', code: 'MU', flag: '🇲🇺', region: 'Oceania & Africa', startingPriceUsd: 7.0, startingPriceInr: 590, network: 'Emtel / my.t', popular: true },
  { name: 'Turkey (Istanbul, Cappadocia)', code: 'TR', flag: '🇹🇷', region: 'Europe', startingPriceUsd: 4.5, startingPriceInr: 375, network: 'Turkcell / Vodafone', popular: true },
  { name: 'Georgia (Tbilisi, Kazbegi)', code: 'GE', flag: '🇬🇪', region: 'Europe', startingPriceUsd: 5.5, startingPriceInr: 460, network: 'MagtiCom 4G/5G', popular: true },
  { name: 'South Korea', code: 'KR', flag: '🇰🇷', region: 'Asia', startingPriceUsd: 5.0, startingPriceInr: 420, network: 'SK Telecom 5G', popular: true },
  { name: 'Spain (Barcelona, Madrid)', code: 'ES', flag: '🇪🇸', region: 'Europe', startingPriceUsd: 4.5, startingPriceInr: 375, network: 'Movistar / Vodafone', popular: true },
  { name: 'Europe Regional (39 Countries)', code: 'EU', flag: '🇪🇺', region: 'Regional Passes', startingPriceUsd: 5.0, startingPriceInr: 420, network: 'Multi-Network 4G/5G', popular: true },
  { name: 'Asia Regional (18 Countries)', code: 'AS', flag: '🌏', region: 'Regional Passes', startingPriceUsd: 5.0, startingPriceInr: 420, network: 'Multi-Network 4G/5G', popular: true },
  { name: 'Global Discover (130+ Countries)', code: 'GL', flag: '🌐', region: 'Regional Passes', startingPriceUsd: 9.0, startingPriceInr: 750, network: 'Global Roaming Tier-1', popular: true }
];

export const ESIM_ALL_COVERED_COUNTRIES: string[] = [
  'Singapore', 'Malaysia', 'Thailand', 'United Arab Emirates (Dubai & Abu Dhabi)', 'Indonesia (Bali)', 'Vietnam', 'Japan', 
  'United Kingdom', 'Switzerland', 'France', 'Italy', 'Germany', 'Spain', 'United States', 'Australia', 'New Zealand',
  'Saudi Arabia', 'Qatar', 'Oman', 'Bahrain', 'Kuwait', 'Turkey', 'Georgia', 'Maldives', 'Sri Lanka', 'Mauritius',
  'South Korea', 'Hong Kong', 'Taiwan', 'Philippines', 'Cambodia', 'Laos', 'Nepal', 'Bhutan', 'Kazakhstan', 'Uzbekistan',
  'Austria', 'Netherlands', 'Belgium', 'Greece', 'Portugal', 'Czech Republic', 'Hungary', 'Norway', 'Sweden', 'Denmark',
  'Finland', 'Iceland', 'Ireland', 'Poland', 'Croatia', 'Slovenia', 'Slovakia', 'Romania', 'Bulgaria', 'Cyprus', 'Malta',
  'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Costa Rica', 'Panama', 'Ecuador',
  'Egypt', 'South Africa', 'Kenya', 'Tanzania', 'Seychelles', 'Morocco', 'Jordan', 'Armenia', 'Azerbaijan',
  'Monaco', 'Luxembourg', 'Liechtenstein', 'Estonia', 'Latvia', 'Lithuania', 'Albania', 'Montenegro', 'Serbia',
  'Andorra', 'Gibraltar', 'Guam', 'Macau', 'Fiji', 'French Polynesia', 'Puerto Rico', 'Dominican Republic', 'Jamaica'
];

export const ESIM_FEATURES = [
  {
    title: 'Instant 3-Minute Activation',
    description: 'Receive your eSIM QR code by email in seconds. Scan and install directly on your phone before boarding or at the airport.',
    badge: 'Zero Waiting'
  },
  {
    title: 'Keep Your Indian WhatsApp Active',
    description: 'No physical SIM removal needed. Keep your primary Indian SIM for calls and WhatsApp while using cheap local international data.',
    badge: 'Dual SIM'
  },
  {
    title: 'Zero Roaming Bill Shock',
    description: 'Prepaid transparency with no hidden charges or unexpected international roaming bills on your postpaid Indian carrier.',
    badge: '100% Prepaid'
  },
  {
    title: 'Tier-1 High Speed 4G / 5G',
    description: 'Directly connects to local premier telecom networks (Singtel, StarHub, AIS, Etisalat, Swisscom, Vodafone, AT&T) in 200+ countries.',
    badge: 'Fast & Reliable'
  }
];

export const ESIM_FAQS = [
  {
    q: 'What is a Travel eSIM?',
    a: 'An eSIM (embedded SIM) is a digital SIM profile pre-built into your smartphone hardware. Instead of swapping physical plastic SIM cards at airport kiosks, you simply scan a digital QR code to install a local international data plan immediately.'
  },
  {
    q: 'How does the HJH10 offer work?',
    a: 'Use promo code "HJH10" at checkout on our partner portal to get an instant flat 10% discount on any single country, regional (Europe / Asia), or global travel eSIM data package.'
  },
  {
    q: 'Will my Indian WhatsApp and bank OTPs still work?',
    a: 'Yes! Your physical Indian SIM stays active in your phone on standby to receive incoming SMS/OTPs and WhatsApp. The travel eSIM handles your international data usage, so you never pay expensive ₹500–₹1,000/day carrier roaming rates.'
  },
  {
    q: 'Which smartphones are compatible with eSIM?',
    a: 'Most modern smartphones support eSIM, including iPhone XR/XS and newer (iPhone 11 through 16 Pro Max), Samsung Galaxy S20 to S25 series, Z Flip/Fold series, Google Pixel 3 to 9 series, and selected recent models from OnePlus, Xiaomi, and Motorola.'
  },
  {
    q: 'When should I purchase and install my eSIM?',
    a: 'You can purchase your eSIM 1 to 2 weeks before your flight from Coimbatore or Bangalore. You can scan and install the QR code at home with WiFi, and turn on Data Roaming on the eSIM line once your flight lands at your destination airport.'
  }
];

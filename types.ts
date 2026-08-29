export type PageRoute = 
  | '/'
  | '/international-holidays'
  | '/domestic-holidays'
  | '/services'
  | '/custom-trip'
  | '/about'
  | '/contact';

export type TripType = 
  | 'Honeymoon'
  | 'Family Holiday'
  | 'Couple'
  | 'Group Tour'
  | 'Solo Travel'
  | 'Business Travel'
  | 'Other';

export interface Destination {
  id: string;
  name: string;
  country: string;
  category: 'international' | 'domestic';
  tagline: string;
  description: string;
  image: string;
  startingPrice: string;
  idealDuration: string;
  popularExperiences: string[];
  bestTimeToVisit: string;
  visaInfo?: string;
  highlights: string[];
  featured?: boolean;
}

export interface HolidayPackage {
  id: string;
  title: string;
  destination: string;
  category: 'international' | 'domestic';
  duration: string; // e.g. "4 Nights / 5 Days"
  startingPrice: string; // e.g. "₹24,999"
  originalPrice?: string;
  image: string;
  highlights: string[];
  inclusions: string[];
  featured?: boolean;
  bestFor: string; // e.g. "Couples & Families"
  itinerarySummary: string[];
}

export interface TravelService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  image: string;
  ctaText?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  trip: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

export interface CustomTripFormData {
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  adults: number;
  children: number;
  budget: string;
  tripType: TripType;
  departureCity: string;
  specialRequirements: string;
}

export interface QuoteRequestData {
  fullName: string;
  phone: string;
  email?: string;
  destinationOrService: string;
  travelDate?: string;
  travelers?: string;
  notes?: string;
}

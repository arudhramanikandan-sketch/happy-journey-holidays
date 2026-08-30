import fs from 'fs';
import path from 'path';

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
}

export interface ManagedPackage {
  id: string;
  title: string;
  name?: string; // Alias for title
  destination: string;
  category: 'domestic' | 'international';
  days: number;
  nights: number;
  duration: string; // e.g. "4 Nights / 5 Days"
  startingPrice: string; // Offer price display
  originalPrice?: string;
  offerPrice?: string;
  priceDisplayText?: string;
  shortDescription?: string;
  fullDescription?: string;
  image: string; // Main image URL or stored path
  galleryImages?: string[];
  highlights: string[];
  inclusions: string[];
  exclusions?: string[];
  itinerarySummary?: string[];
  dayWiseItinerary?: DayItinerary[];
  bookingInformation?: string;
  bestFor: string;
  featured: boolean;
  isHidden: boolean; // Hide / Show status
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const PACKAGES_FILE = path.join(DATA_DIR, 'packages.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

// Initial seed data merging all domestic and international packages with full details
const INITIAL_PACKAGES_SEED: ManagedPackage[] = [
  // ==========================================
  // INTERNATIONAL PACKAGES
  // ==========================================
  {
    id: 'pkg-singapore-sentosa',
    title: 'Singapore Highlights with Sentosa & Universal Studios',
    destination: 'Singapore',
    category: 'international',
    days: 5,
    nights: 4,
    duration: '4 Nights / 5 Days',
    startingPrice: '₹34,999',
    originalPrice: '₹42,000',
    offerPrice: '₹34,999',
    priceDisplayText: 'Starting from ₹34,999 / person',
    shortDescription: 'Experience world-renowned Gardens by the Bay, thrilling Universal Studios Singapore, Marina Bay Sands SkyPark, Night Safari, and shopping along Orchard Road.',
    fullDescription: 'Discover the dazzling Lion City with Happy Journey Holidays. This complete 5-day package includes 4-star hotel accommodation with breakfast, seamless private airport and sightseeing transfers, entry passes to Universal Studios Singapore, Sentosa Island Cable Car, Madame Tussauds, Wings of Time laser show, and the iconic Night Safari with tram ride.',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      '4-Star Central Hotel with Daily Breakfast',
      'Universal Studios Singapore Full Day Pass',
      'Sentosa Cable Car + Wings of Time Show',
      'Night Safari with Tram Ride & Creature Show',
      'Airport Pickup & Drop by Private AC Vehicle'
    ],
    inclusions: [
      '4 Nights in 4-Star Singapore Hotel',
      'Daily Buffet Breakfast',
      'Universal Studios One-Day Pass',
      'Sentosa Island Admission & Cable Car Pass',
      'Night Safari Entry with Tram',
      'Full Visa Assistance & Documentation',
      'All Sightseeing Transfers on Private / Shared Basis'
    ],
    exclusions: [
      'International Flight Tickets (Can be arranged on request)',
      'Singapore Tourist Visa Fee',
      'Lunch and Dinners not mentioned in itinerary',
      'Personal expenses, tips and porterage fees'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Singapore & Evening Night Safari with Tram',
      'Day 2: Singapore City Tour & Gardens by the Bay Flower Dome',
      'Day 3: Full Day thrills at Universal Studios Singapore',
      'Day 4: Sentosa Island Cable Car, Madame Tussauds & Wings of Time',
      'Day 5: Souvenir Shopping at Orchard Road & Departure'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Singapore & Evening Night Safari',
        description: 'Arrive at Changi International Airport. Meet our representative and transfer to your 4-star hotel. In the evening, visit the world famous Night Safari to observe nocturnal animals in natural habitats aboard a guided tram.'
      },
      {
        day: 2,
        title: 'City Tour & Gardens by the Bay',
        description: 'Explore Merlion Park, Marina Bay Sands, Chinatown, and Little India. Afternoon visit to Gardens by the Bay: walk inside the Flower Dome and Cloud Forest conservatory.'
      },
      {
        day: 3,
        title: 'Full Day Universal Studios Singapore',
        description: 'Spend an exhilarating day at Universal Studios on Sentosa Island. Enjoy Transformers The Ride, Battlestar Galactica, Jurassic Park Rapids Adventure, and Sesame Street shows.'
      },
      {
        day: 4,
        title: 'Sentosa Island Cable Car, Madame Tussauds & Wings of Time',
        description: 'Board the scenic Mount Faber Cable Car into Sentosa. Experience Madame Tussauds with 4D Marvel universe, relax on Siloso Beach, and enjoy the evening Wings of Time multi-sensory laser and fireworks spectacle.'
      },
      {
        day: 5,
        title: 'Jewel Changi Exploration & Departure',
        description: 'Enjoy buffet breakfast and check out. Visit Jewel Changi to marvel at the HSBC Rain Vortex waterfall and canopy bridge before catching your return flight home.'
      }
    ],
    bookingInformation: 'Standard check-in time is 3:00 PM. Rates are based on twin sharing. Passport must have minimum 6 months validity from travel date. Visa processing requires 3-5 working days.',
    bestFor: 'Families & Couples',
    featured: true,
    isHidden: false,
    sortOrder: 1,
    createdAt: new Date('2026-01-01').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pkg-malaysia-genting',
    title: 'Magical Malaysia & Genting Highlands Getaway',
    destination: 'Malaysia',
    category: 'international',
    days: 5,
    nights: 4,
    duration: '4 Nights / 5 Days',
    startingPrice: '₹28,999',
    originalPrice: '₹34,000',
    offerPrice: '₹28,999',
    priceDisplayText: 'Starting from ₹28,999 / person',
    shortDescription: 'Discover iconic Petronas Twin Towers, cool breeze of Genting Highlands with its indoor theme park and casino, Batu Caves, and historical KL landmarks.',
    fullDescription: 'Experience the best of Malaysia with 3 nights in Kuala Lumpur and 1 night atop misty Genting Highlands. This tour package includes 4-star stays, two-way Genting Skyway cable car rides, Batu Caves Murugan Temple visit, Putrajaya administrative capital tour, and KL city sightseeing.',
    image: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584282479339-448f21915998?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      '3 Nights Kuala Lumpur + 1 Night Genting Highlands',
      'Two-Way Genting Skyway Cable Car Ride',
      'Petronas Twin Towers Photo Stop & Batu Caves',
      'Putrajaya Tour & KL Tower Observation Deck',
      'Daily Buffet Breakfast & Airport Transfers'
    ],
    inclusions: [
      '3 Nights Kuala Lumpur 4-Star Hotel',
      '1 Night Genting Highlands Resort',
      'Daily Buffet Breakfast',
      'Two-Way Genting Skyway Cable Car Pass',
      'Enroute Batu Caves Murugan Temple Visit',
      'Half-day KL City Tour & Putrajaya Tour',
      'All Transfers by Air-Conditioned Vehicle'
    ],
    exclusions: [
      'Flight tickets from Coimbatore/Chennai',
      'Malaysia Tourism Tax (MYR 10 per room per night at hotel)',
      'Genting SkyWorlds Outdoor Theme park ticket',
      'Meals not specified in the inclusions'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Kuala Lumpur & Check-in',
      'Day 2: KL City Tour, KL Tower & Batu Caves',
      'Day 3: Transfer to Genting Highlands via Cable Car',
      'Day 4: Enjoy Genting theme park & return to KL for shopping',
      'Day 5: Putrajaya visit & Airport drop'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Kuala Lumpur',
        description: 'Arrive at KLIA airport, meet driver, and transfer to your central Kuala Lumpur hotel. Relax and explore Bukit Bintang night market.'
      },
      {
        day: 2,
        title: 'Kuala Lumpur City Sightseeing & Batu Caves',
        description: 'Visit King’s Palace, National Monument, Independence Square, and stop for photos at Petronas Twin Towers. Head to the majestic 140ft golden Lord Murugan statue at Batu Caves.'
      },
      {
        day: 3,
        title: 'Transfer to Genting Highlands',
        description: 'Drive to the base station and take the high-speed Genting Skyway cable car over ancient rainforest. Check into your resort atop the mountain and explore SkyAvenue mall.'
      },
      {
        day: 4,
        title: 'Genting SkyWorlds & Return to KL',
        description: 'Spend the morning at Genting theme park or casino. Afternoon cable car descent and transfer back to Kuala Lumpur for evening shopping at Suria KLCC.'
      },
      {
        day: 5,
        title: 'Putrajaya Tour & Departure',
        description: 'Visit Putrajaya, admiring the pink dome Putra Mosque and Prime Minister’s office. Transfer to KLIA for your return flight.'
      }
    ],
    bookingInformation: 'Visa-free entry available for Indian passport holders with MDAC submission. Best travel season is all year round.',
    bestFor: 'Couples, Families & Groups',
    featured: true,
    isHidden: false,
    sortOrder: 2,
    createdAt: new Date('2026-01-02').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pkg-thailand-bangkok-phuket',
    title: 'Exotic Thailand: Bangkok & Phuket Combo',
    destination: 'Thailand',
    category: 'international',
    days: 6,
    nights: 5,
    duration: '5 Nights / 6 Days',
    startingPrice: '₹26,499',
    originalPrice: '₹32,500',
    offerPrice: '₹26,499',
    priceDisplayText: 'Starting from ₹26,499 / person',
    shortDescription: 'Immerse in the vibrant energy of Bangkok, crystal-clear turquoise waters of Phuket, Phi Phi Island speedboat tour, and Chaophraya dinner cruise.',
    fullDescription: 'Discover the best of Thailand with this 6-day holiday covering Phuket and Bangkok. Stay in top-rated 4-star properties, cruise to Phi Phi and Maya Bay with buffet lunch, visit the Golden Buddha & Marble Temple, and sail the Chao Phraya River on a luxury dinner cruise.',
    image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      '3 Nights Phuket + 2 Nights Bangkok (4-Star Hotels)',
      'Full Day Phi Phi Island Speedboat Tour with Lunch',
      'Chao Phraya Luxury Dinner Cruise in Bangkok',
      'Golden & Marble Buddha Temple Tours',
      'Airport Pickup, Inter-city Transfers & Drops'
    ],
    inclusions: [
      '3 Nights in Phuket 4-Star Resort',
      '2 Nights in Bangkok 4-Star Hotel',
      'Daily Buffet Breakfast',
      'Full Day Phi Phi Island Speedboat Tour with National Park Fee & Lunch',
      'Chao Phraya Princess Dinner Cruise with Live Music',
      'Bangkok Temple & City Tour (Wat Traimit & Wat Benchamabophit)',
      'All Airport and Sightseeing Transfers'
    ],
    exclusions: [
      'Domestic Flight Phuket to Bangkok',
      'International Flights',
      'Water sports equipment charges (Parasailing, Jet Ski)',
      'Personal expenses and tips'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Phuket & Relax on Patong Beach',
      'Day 2: Spectacular Phi Phi & Maya Bay Speedboat Tour with Lunch',
      'Day 3: Phuket City Tour & Big Buddha',
      'Day 4: Flight to Bangkok & Evening Chao Phraya River Cruise',
      'Day 5: Bangkok Temples & Safari World option',
      'Day 6: Souvenir Shopping & Departure'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Phuket & Patong Beach',
        description: 'Arrive at Phuket Airport. Transfer to your 4-star resort in Patong. Evening free to stroll along the bustling Bangla Road and beach promenade.'
      },
      {
        day: 2,
        title: 'Phi Phi Island & Maya Bay by Speedboat',
        description: 'Embark on a luxury speedboat tour across the Andaman Sea. Visit Maya Bay (The Beach movie site), Viking Cave, Monkey Beach, and snorkel in turquoise waters with buffet lunch.'
      },
      {
        day: 3,
        title: 'Phuket Viewpoints & Big Buddha',
        description: 'Visit Karon Viewpoint, Promthep Cape sunset point, Wat Chalong temple, and the magnificent 45-meter tall Big Buddha atop Nakkerd Hill.'
      },
      {
        day: 4,
        title: 'Phuket to Bangkok & Chao Phraya Dinner Cruise',
        description: 'Fly to Bangkok. Check into hotel. In the evening, board a luxury cruise along the Chao Phraya river featuring an international buffet and views of Wat Arun.'
      },
      {
        day: 5,
        title: 'Bangkok City & Temple Tour',
        description: 'Visit the Golden Buddha at Wat Traimit and the Marble Temple. Afternoon free for shopping at Pratunam and MBK Center.'
      },
      {
        day: 6,
        title: 'Departure from Bangkok',
        description: 'Enjoy morning breakfast and transfer to Suvarnabhumi or Don Mueang airport for your return flight.'
      }
    ],
    bookingInformation: 'Visa-free entry for Indian passport holders. Tour can be customized with Coral Island Pattaya extensions upon request.',
    bestFor: 'Friends, Couples & Honeymooners',
    featured: true,
    isHidden: false,
    sortOrder: 3,
    createdAt: new Date('2026-01-03').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pkg-dubai-desert',
    title: 'Dazzling Dubai & Desert Safari Extravaganza',
    destination: 'Dubai & UAE',
    category: 'international',
    days: 5,
    nights: 4,
    duration: '4 Nights / 5 Days',
    startingPrice: '₹42,999',
    originalPrice: '₹50,000',
    offerPrice: '₹42,999',
    priceDisplayText: 'Starting from ₹42,999 / person',
    shortDescription: 'Stand atop the world at Burj Khalifa 124th floor, conquer dunes in a 4x4 Desert Safari with BBQ dinner, and cruise Dubai Marina on a luxury yacht.',
    fullDescription: 'Experience pure luxury in the United Arab Emirates with Happy Journey Holidays. This 5-day package features 4-star accommodation, Burj Khalifa At The Top entry ticket, high-thrill 4x4 desert safari with dune bashing, camel rides and belly dance dinner, Marina Dhow cruise, and an optional Abu Dhabi day tour.',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Burj Khalifa 124th Floor Ticket with Dubai Mall Fountain',
      '4x4 Desert Safari with Dune Bashing, Camel Ride & BBQ Dinner',
      'Dubai Marina Luxury Dhow Cruise with Live Tanoura Show',
      'Dubai Frame & Future Museum Exterior Photo Stop',
      'Complete UAE Tourist Visa Assistance Included'
    ],
    inclusions: [
      '4 Nights in 4-Star Dubai Hotel',
      'Daily Buffet Breakfast',
      'Burj Khalifa 124th & 125th Floor Observation Deck Tickets',
      'Desert Safari with 4x4 Dune Bashing, BBQ Dinner & Live Shows',
      'Dubai Marina Dhow Cruise with Buffet Dinner',
      'Half-Day Dubai City Guided Sightseeing Tour',
      'Return Dubai International Airport (DXB) Private Transfers'
    ],
    exclusions: [
      'Flight tickets from India to Dubai',
      'Dubai Tourism Dirham fee payable directly at hotel (AED 15-20 per night)',
      'UAE Tourist Visa fee',
      'Personal expenses & travel insurance'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Dubai & Marina Dhow Cruise with Dinner',
      'Day 2: Half-Day City Tour + Burj Khalifa 124th Floor',
      'Day 3: Thrilling Desert Safari with Quad Biking & Belly Dance',
      'Day 4: Day trip to Abu Dhabi Grand Mosque & Ferrari World',
      'Day 5: Gold Souk Shopping & Airport Transfer'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai & Marina Dhow Cruise',
        description: 'Arrive at Dubai Airport. Private transfer to hotel. In the evening, enjoy a 2-hour Marina Dhow cruise with international buffet, soft drinks, and live Tanoura performance.'
      },
      {
        day: 2,
        title: 'Dubai City Tour & Burj Khalifa At The Top',
        description: 'Pass by Jumeirah Mosque, Burj Al Arab photo point, Atlantis The Palm. In the evening, visit Dubai Mall and ascend to the 124th floor of Burj Khalifa to watch the Dancing Fountains.'
      },
      {
        day: 3,
        title: 'Thrilling 4x4 Desert Safari & BBQ Camp',
        description: 'Morning at leisure. Afternoon 4x4 Land Cruiser pickup for dune bashing in the red desert dunes. Enjoy sandboarding, camel rides, shisha, henna tattoo, and a lavish BBQ dinner with fire and belly dance.'
      },
      {
        day: 4,
        title: 'Abu Dhabi Day Trip & Grand Mosque',
        description: 'Travel to Abu Dhabi to visit the breathtaking Sheikh Zayed Grand Mosque, Emirates Palace photo stop, and explore Ferrari World on Yas Island.'
      },
      {
        day: 5,
        title: 'Gold Souk Shopping & Departure',
        description: 'Explore Deira Gold & Spice Souk. Transfer to airport for your flight home.'
      }
    ],
    bookingInformation: 'Fast UAE Tourist E-Visa processed in 48-72 hours. Best time to visit is October to April.',
    bestFor: 'Luxury, Family & Shopping',
    featured: true,
    isHidden: false,
    sortOrder: 4,
    createdAt: new Date('2026-01-04').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pkg-bali-ubud-villas',
    title: 'Bali Tropical Bliss & Ubud Private Villa',
    destination: 'Bali',
    category: 'international',
    days: 6,
    nights: 5,
    duration: '5 Nights / 6 Days',
    startingPrice: '₹31,999',
    originalPrice: '₹39,999',
    offerPrice: '₹31,999',
    priceDisplayText: 'Starting from ₹31,999 / person',
    shortDescription: 'Experience Bali’s cultural heart in Ubud with lush rice terraces, romantic sunset at Uluwatu Cliff Temple, pristine Nusa Penida day trip, and private pool villas.',
    fullDescription: 'Indulge in romantic tropical luxury with 3 nights in Kuta/Seminyak beach resort and 2 nights in an authentic private pool villa in Ubud. Includes full day Nusa Penida Island tour, iconic Jungle Bali Swing, Uluwatu sunset temple, and water sports at Tanjung Benoa.',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      '3 Nights Kuta Beach Resort + 2 Nights Ubud Private Pool Villa',
      'Famous Bali Swing over Tegallalang Rice Terraces',
      'Nusa Penida West Island Tour with Speedboat',
      'Uluwatu Sunset Cliff Temple & Kecak Fire Dance',
      'Tanjung Benoa Water Sports (Banana Boat included)'
    ],
    inclusions: [
      '3 Nights Kuta/Seminyak 4-Star Resort',
      '2 Nights Ubud Private Pool Villa',
      'Daily Breakfast & Floating Breakfast Option',
      'Nusa Penida West Island Tour with Speedboat Transfers & Lunch',
      'Famous Bali Jungle Swing & Tegallalang Rice Terrace Pass',
      'Uluwatu Temple Sunset Tour with Kecak Dance',
      'Dedicated Private AC Car & English-Speaking Driver for all days'
    ],
    exclusions: [
      'International flights to Denpasar (DPS)',
      'Bali Tourist Tax (approx. IDR 150,000 / ₹800)',
      'Visa on Arrival fee ($35 USD)',
      'Meals not mentioned in itinerary'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Bali with Flower Garland Welcome',
      'Day 2: Water Sports at Benoa & Uluwatu Sunset Temple',
      'Day 3: Nusa Penida Island Day Tour (Kelingking Beach & Angel’s Billabong)',
      'Day 4: Check into Ubud Pool Villa & Jungle Bali Swing',
      'Day 5: Kintamani Volcano view & Coffee Plantation',
      'Day 6: Traditional Balinese Spa & Departure'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Bali & Check-in',
        description: 'Arrive at Ngurah Rai International Airport. Receive a traditional Balinese floral garland welcome and transfer in a private car to your Kuta beach resort.'
      },
      {
        day: 2,
        title: 'Tanjung Benoa Water Sports & Uluwatu Sunset Temple',
        description: 'Enjoy Banana boat ride and water sports at Tanjung Benoa beach. Afternoon visit to the majestic Uluwatu Cliff Temple overlooking the Indian Ocean, followed by the Kecak fire dance.'
      },
      {
        day: 3,
        title: 'Nusa Penida Island Speedboat Day Tour',
        description: 'Take a speedboat to Nusa Penida island. Visit the famous T-Rex shaped Kelingking Beach, Broken Beach, Angel’s Billabong natural infinity pool, and Crystal Bay with lunch included.'
      },
      {
        day: 4,
        title: 'Transfer to Ubud Private Pool Villa & Bali Swing',
        description: 'Check into your luxurious private pool villa in Ubud. Experience the world famous Jungle Bali Swing high above the emerald Tegallalang rice terraces.'
      },
      {
        day: 5,
        title: 'Kintamani Volcano & Luwak Coffee Plantation',
        description: 'Drive up to Kintamani to gaze at Mount Batur active volcano and Lake Batur. Visit a local spice and Luwak coffee plantation with tasting.'
      },
      {
        day: 6,
        title: 'Balinese Spa Massage & Departure',
        description: 'Enjoy a relaxing 1-hour authentic Balinese body massage before transferring to the airport for your flight back.'
      }
    ],
    bookingInformation: 'Visa on Arrival / E-VOA available for Indian citizens. Honeymoon inclusions like room flower decoration and cake provided on request.',
    bestFor: 'Honeymooners & Couples',
    featured: true,
    isHidden: false,
    sortOrder: 5,
    createdAt: new Date('2026-01-05').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pkg-maldives-water-villa',
    title: 'Maldives All-Inclusive Overwater Villa Haven',
    destination: 'Maldives',
    category: 'international',
    days: 4,
    nights: 3,
    duration: '3 Nights / 4 Days',
    startingPrice: '₹64,999',
    originalPrice: '₹75,000',
    offerPrice: '₹64,999',
    priceDisplayText: 'Starting from ₹64,999 / person',
    shortDescription: 'The ultimate romantic getaway with private water villas, all-inclusive luxury resort meals, sunset dolphin cruises, and vibrant coral reef snorkeling.',
    fullDescription: 'Wake up to the gentle turquoise ocean right beneath your private sundeck in the Maldives. This luxury package offers 3 nights in an overwater villa at a private island resort, complete all-inclusive buffet dining with unlimited drinks, roundtrip speedboat or seaplane transfers, and guided snorkeling.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Stay in Luxury Overwater Villa with Direct Lagoon Access',
      'All-Inclusive Meals & Unlimited Beverages Package',
      'Roundtrip Speedboat / Seaplane Resort Transfers',
      'Sunset Dolphin Watching Cruise & Coral Snorkeling',
      'Complimentary Honeymoon Bed Decor & Wine'
    ],
    inclusions: [
      '3 Nights in Luxury Overwater Villa',
      'All-Inclusive Breakfast, Lunch & Dinner Buffets',
      'Unlimited Alcoholic & Non-Alcoholic Beverages',
      'Roundtrip Speedboat Transfers from Velana Airport (MLE)',
      'Complimentary Snorkeling Equipment & Kayak Rental',
      'All Maldivian Green Taxes & Service Charges'
    ],
    exclusions: [
      'International Flight Tickets from India',
      'Motorized water sports (Jet Ski, Scuba diving)',
      'Spa treatments & private beach candle-light dinners',
      'Personal purchases'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Male & Speedboat transfer to Island Resort',
      'Day 2: Overwater villa relaxation, snorkeling & water sports',
      'Day 3: Sunset Dolphin Cruise & All-inclusive cocktails',
      'Day 4: Island buffet breakfast & departure transfer'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Male & Island Resort Transfer',
        description: 'Arrive at Velana International Airport in Male. Meet resort airport staff and board your speedboat/seaplane to your private island paradise. Check into your overwater villa.'
      },
      {
        day: 2,
        title: 'Lagoon Snorkeling & Island Exploration',
        description: 'Step directly from your private villa ladder into the coral lagoon. Swim alongside tropical reef fish, turtles, and baby reef sharks. Enjoy beachside dining.'
      },
      {
        day: 3,
        title: 'Sunset Dolphin Cruise & Cocktails',
        description: 'Spend the day unwinding at the infinity pool or trying stand-up paddleboarding. In the evening, set sail on a traditional Dhoni boat to watch wild spinner dolphins jumping in the golden sunset.'
      },
      {
        day: 4,
        title: 'Sunrise Villa Breakfast & Departure',
        description: 'Enjoy your final gourmet breakfast overlooking the turquoise water. Speedboat transfer back to Male Airport for your flight.'
      }
    ],
    bookingInformation: 'Free 30-day tourist visa granted upon arrival in Maldives. No prior visa fee required.',
    bestFor: 'Couples & Honeymooners',
    featured: true,
    isHidden: false,
    sortOrder: 6,
    createdAt: new Date('2026-01-06').toISOString(),
    updatedAt: new Date().toISOString()
  },

  // ==========================================
  // DOMESTIC PACKAGES
  // ==========================================
  {
    id: 'pkg-kerala-munnar-alleppey',
    title: 'Kerala Charms: Munnar Hills & Alleppey Houseboat',
    destination: 'Kerala',
    category: 'domestic',
    days: 5,
    nights: 4,
    duration: '4 Nights / 5 Days',
    startingPrice: '₹14,499',
    originalPrice: '₹18,500',
    offerPrice: '₹14,499',
    priceDisplayText: 'Starting from ₹14,499 / person',
    shortDescription: 'Cruise tranquil backwaters in a traditional Alleppey houseboat, stroll through fragrant spice plantations in Thekkady, and relax in Munnar misty tea gardens.',
    fullDescription: 'Our most sought-after Kerala vacation starting directly from Coimbatore or Cochin. Travel in a dedicated private AC cab through Munnar tea gardens, Mattupetty dam, and Eravikulam National Park, visit Periyar Wildlife Sanctuary in Thekkady, and spend a night on an exclusive Deluxe houseboat in Alleppey backwaters with all authentic Kerala meals prepared by your personal onboard chef.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Direct Pickup from Coimbatore / Cochin in AC Cab',
      '2 Nights Misty Munnar + 1 Night Thekkady + 1 Night Houseboat',
      'Exclusive Deluxe Alleppey Houseboat with all traditional meals',
      'Mattupetty Dam, Tea Gardens, Eravikulam National Park',
      'Spice Plantation Walk & Elephant Camp Option'
    ],
    inclusions: [
      '2 Nights in Munnar 3/4-Star Resort with Breakfast',
      '1 Night in Thekkady Jungle Resort with Breakfast',
      '1 Night Private Deluxe Alleppey Houseboat (Lunch, Dinner, Breakfast)',
      'Dedicated AC Sedan / Innova from Coimbatore/Cochin for 5 Days',
      'Driver allowances, toll gates, interstate permits & parking fees'
    ],
    exclusions: [
      'Entry tickets to monuments, museums and national parks',
      'Periyar lake boat ride tickets',
      'Personal expenses, laundry, and camera passes'
    ],
    itinerarySummary: [
      'Day 1: Scenic Drive from Coimbatore/Cochin to Munnar via Cheeyappara Waterfalls',
      'Day 2: Full Day Munnar Sightseeing (Tea Museum, Mattupetty, Echo Point)',
      'Day 3: Transfer to Thekkady & Periyar Wildlife Boating',
      'Day 4: Check in to Deluxe Houseboat in Alleppey backwaters',
      'Day 5: Cochin Sightseeing / Return drive to Coimbatore'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Coimbatore / Cochin to Munnar Drive',
        description: 'Morning pickup from your Coimbatore doorstep or Cochin airport. Drive through lush Western Ghats, stopping at Cheeyappara and Valara waterfalls. Check into your Munnar resort.'
      },
      {
        day: 2,
        title: 'Munnar Tea Gardens & Eravikulam National Park',
        description: 'Visit Rajamalai (Eravikulam) to spot the endangered Nilgiri Tahr mountain goats. Visit Tata Tea Museum, Mattupetty Dam, Echo Point, and Kundala Lake.'
      },
      {
        day: 3,
        title: 'Munnar to Thekkady Spice Hills',
        description: 'Drive to Thekkady (Periyar). Stroll through aromatic spice plantations (cardamom, pepper, cinnamon). Enjoy evening Kathakali and Kalaripayattu cultural performance.'
      },
      {
        day: 4,
        title: 'Alleppey Backwaters Houseboat Cruise',
        description: 'Drive to Alleppey. Board your traditional thatched-roof houseboat by 12:30 PM. Cruise through serene palm-fringed canals while savoring authentic Karimeen fish fry and Kerala lunch.'
      },
      {
        day: 5,
        title: 'Fort Kochi Heritage & Return Drop to Coimbatore',
        description: 'Enjoy morning backwater breakfast. Disembark and visit Fort Kochi Chinese Fishing Nets before a comfortable drive back to Coimbatore.'
      }
    ],
    bookingInformation: 'Houseboat AC operates from 9:00 PM to 6:00 AM (Full time AC available on premium upgrade). Suitable for all age groups.',
    bestFor: 'Coimbatore Locals, Families & Couples',
    featured: true,
    isHidden: false,
    sortOrder: 7,
    createdAt: new Date('2026-01-07').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pkg-kashmir-heaven',
    title: 'Kashmir Paradise: Dal Lake & Gulmarg Snow',
    destination: 'Kashmir',
    category: 'domestic',
    days: 6,
    nights: 5,
    duration: '5 Nights / 6 Days',
    startingPrice: '₹22,999',
    originalPrice: '₹28,000',
    offerPrice: '₹22,999',
    priceDisplayText: 'Starting from ₹22,999 / person',
    shortDescription: 'Stay on a romantic cedar-wood houseboat on Dal Lake, ride the world’s highest Gondola cable car in Gulmarg snow, and explore Betaab valley in Pahalgam.',
    fullDescription: 'Discover the Crown of India with Happy Journey Holidays. This 6-day dream Kashmir tour includes a luxury cedar-wood houseboat stay on Dal Lake with Shikara boat ride, 3 nights in Srinagar premium hotels, 1 night in Pahalgam (Valley of Shepherds), and an exhilarating day in snow-capped Gulmarg with Gondola cable car ride.',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      '1 Night Luxury Srinagar Houseboat + 3 Nights Srinagar + 1 Night Pahalgam',
      'Shikara Boat Ride on Dal Lake with Floating Flower Market',
      'Gulmarg Gondola Cable Car Ride to Snow Mountain Phase 1',
      'Pahalgam Valley of Shepherds & Betaab Valley',
      'All Sightseeing in Private Non-Stop Cab with MAP Meals'
    ],
    inclusions: [
      '1 Night Deluxe Houseboat on Dal Lake Srinagar',
      '3 Nights 3/4-Star Hotel in Srinagar',
      '1 Night Hotel in Pahalgam',
      'Daily Breakfast & Dinner (MAP Plan)',
      '1-Hour Shikara Boat Ride on Dal Lake',
      'All Airport & Sightseeing Transfers in Private Vehicle',
      'Toll taxes, parking & fuel charges'
    ],
    exclusions: [
      'Air tickets to Srinagar (SXR)',
      'Gulmarg Gondola Phase 1 & Phase 2 tickets',
      'Local Union taxi in Pahalgam for Aru/Betaab valley',
      'Pony rides, winter snow gear rentals & tips'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Srinagar & Check into Houseboat on Dal Lake',
      'Day 2: Srinagar Mughal Gardens & Shankaracharya Temple',
      'Day 3: Day trip to Gulmarg with Gondola Cable Car Experience',
      'Day 4: Transfer to Pahalgam via Saffron Fields & Apple Orchards',
      'Day 5: Pahalgam Aru Valley & return to Srinagar',
      'Day 6: Morning Shikara & Departure to Airport'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Srinagar & Dal Lake Houseboat',
        description: 'Arrive at Srinagar Airport. Transfer to your luxury carved wood houseboat on Dal Lake or Nigeen Lake. Enjoy an evening Shikara boat ride past floating gardens and artisan shops.'
      },
      {
        day: 2,
        title: 'Srinagar Mughal Gardens & Old City',
        description: 'Explore the famous Mughal Gardens built by Emperor Jahangir: Nishat Bagh (Garden of Pleasure), Shalimar Bagh (Abode of Love), and Shankaracharya Hill Temple with panoramic city views.'
      },
      {
        day: 3,
        title: 'Gulmarg Meadow of Flowers & Gondola Snow Ride',
        description: 'Full day excursion to Gulmarg (8,825 feet). Board the world’s highest Gondola cable car up to Kongdoori and Apharwat Peak for thrilling snow activities, skiing, and sledging.'
      },
      {
        day: 4,
        title: 'Srinagar to Pahalgam (Valley of Shepherds)',
        description: 'Drive to Pahalgam passing through purple saffron fields of Pampore and walnut orchards. Check into your riverside hotel along the Lidder river.'
      },
      {
        day: 5,
        title: 'Betaab Valley, Aru Valley & Return to Srinagar',
        description: 'Visit the picturesque Betaab Valley, Chandanwari, and Aru Valley. In the evening, drive back to Srinagar for shopping for Kashmiri pashmina shawls, saffron, and dry fruits.'
      },
      {
        day: 6,
        title: 'Departure from Srinagar',
        description: 'Enjoy breakfast and transfer to Srinagar Airport for your flight back home.'
      }
    ],
    bookingInformation: 'Snow season is December to March; Green meadow season is April to October. Gondola tickets are recommended to be pre-booked online.',
    bestFor: 'Couples, Families & Nature Enthusiasts',
    featured: true,
    isHidden: false,
    sortOrder: 8,
    createdAt: new Date('2026-01-08').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pkg-ooty-kodai-weekend',
    title: 'Queen & Princess Hills: Ooty & Kodaikanal Tour',
    destination: 'Ooty & Kodaikanal',
    category: 'domestic',
    days: 4,
    nights: 3,
    duration: '3 Nights / 4 Days',
    startingPrice: '₹7,499',
    originalPrice: '₹12,500',
    offerPrice: '₹7,499',
    priceDisplayText: 'Starting from ₹7,499 / person',
    shortDescription: 'Coimbatore’s favorite hill getaway. Enjoy UNESCO heritage Nilgiri Mountain Toy Train, Botanical Gardens, Pykara lake boat ride, and chocolate factory visits.',
    fullDescription: 'Escape the heat with this convenient 4-day Nilgiri and Palani hill combo starting right from Coimbatore. Includes doorstep pickup, 2 nights in cozy Ooty resorts, 1 night in Kodaikanal, Botanical Gardens, Doddabetta Peak, Pykara waterfalls, Kodai Lake boating, and Pillar Rocks.',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Doorstep Pickup & Drop from Coimbatore',
      '2 Nights Ooty + 1 Night Kodaikanal in Cozy Resorts',
      'Botanical Gardens, Pykara Lake & Doddabetta Viewpoint',
      'Kodai Lake Boating, Pillar Rocks & Pine Forest',
      'Toy Train Ticket Booking Assistance'
    ],
    inclusions: [
      '2 Nights in Ooty Resort with Breakfast',
      '1 Night in Kodaikanal Resort with Breakfast',
      'Dedicated AC Sedan / Innova / Tempo from Coimbatore',
      'All local sightseeing as per itinerary',
      'Driver allowances, toll and parking charges'
    ],
    exclusions: [
      'Toy train tickets (subject to availability)',
      'Entry tickets at gardens, viewpoints and boating fees',
      'Personal expenses & lunch/dinner'
    ],
    itinerarySummary: [
      'Day 1: Coimbatore to Ooty drive, Botanical Gardens & Boat House',
      'Day 2: Doddabetta, Tea Factory, Pykara Waterfalls & Shooting Spot',
      'Day 3: Scenic drive to Kodaikanal, Kodai Lake & Coaker’s Walk',
      'Day 4: Pillar Rocks, Pine Forest & return to Coimbatore'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Coimbatore to Ooty (Queen of Hills)',
        description: 'Morning pickup in Coimbatore. Drive up the scenic Mettupalayam-Coonoor ghat road with 14 hairpin bends. Check in at Ooty and visit the Government Botanical Gardens and Ooty Lake.'
      },
      {
        day: 2,
        title: 'Doddabetta Peak, Tea Factory & Pykara Lake',
        description: 'Visit Doddabetta Peak (highest in Nilgiris), authentic Tea and Chocolate manufacturing factory, and spend the afternoon speedboating on pristine Pykara Lake.'
      },
      {
        day: 3,
        title: 'Ooty to Kodaikanal (Princess of Hills)',
        description: 'Drive through picturesque hillside roads to Kodaikanal. Check into resort. Evening stroll and cycling around star-shaped Kodai Lake and Coaker’s Walk.'
      },
      {
        day: 4,
        title: 'Pillar Rocks, Pine Forest & Return to Coimbatore',
        description: 'Visit Pillar Rocks, Guna Caves, Pine Forest, and Silver Cascade waterfall before a smooth evening drive back to Coimbatore.'
      }
    ],
    bookingInformation: 'Departures available everyday from Coimbatore, Tiruppur, Erode, and Salem.',
    bestFor: 'Weekend Travelers, Families & Friends',
    featured: true,
    isHidden: false,
    sortOrder: 9,
    createdAt: new Date('2026-01-09').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pkg-goa-sun-sand',
    title: 'Goa Coastal Vibes: Beaches, Forts & Cruises',
    destination: 'Goa',
    category: 'domestic',
    days: 4,
    nights: 3,
    duration: '3 Nights / 4 Days',
    startingPrice: '₹12,999',
    originalPrice: '₹16,500',
    offerPrice: '₹12,999',
    priceDisplayText: 'Starting from ₹12,999 / person',
    shortDescription: 'Relax on Calangute and Baga beaches, explore historical churches of Old Goa, experience Mandovi river sunset cruises, and relish coastal seafood.',
    fullDescription: 'Experience the ultimate tropical vacation in Goa. Stay in comfortable beachside resorts, explore the 17th-century Fort Aguada and Chapora Fort, dance to Goan folk tunes on a Mandovi River evening cruise, and discover the UNESCO world heritage Basilica of Bom Jesus.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      '3 Nights in 3/4-Star Beachside Resort with Swimming Pool',
      'North Goa Beach Tour (Baga, Calangute, Anjuna, Aguada)',
      'South Goa Heritage Tour (Basilica of Bom Jesus, Mangueshi)',
      'Mandovi River 1-Hour Sunset Cruise with Live DJ',
      'Airport / Railway Station Pickup & Drop Included'
    ],
    inclusions: [
      '3 Nights Stay in AC Hotel with Daily Breakfast',
      'North Goa Full Day Sightseeing in AC Vehicle',
      'South Goa Full Day Sightseeing in AC Vehicle',
      'Mandovi River Sunset Boat Cruise Pass',
      'Goa Airport (GOI/GOX) or Madgaon Station Transfers'
    ],
    exclusions: [
      'Flight / Train tickets to Goa',
      'Water sports activities (Scuba, parasailing, jet ski)',
      'Casino entry passes & personal drinks'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Goa & Beachside Leisure',
      'Day 2: North Goa Forts, Beaches & Nightlife',
      'Day 3: South Goa Heritage, Churches & Mandovi Cruise',
      'Day 4: Souvenir Shopping & Departure'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Goa',
        description: 'Arrive at Goa Airport or Thivim/Madgaon railway station. Transfer to resort. Spend the evening lounging by the pool or watching the sunset at Calangute beach.'
      },
      {
        day: 2,
        title: 'North Goa Beaches & Historic Forts',
        description: 'Visit Fort Aguada overlooking the Arabian Sea, Sinquerim beach, Baga beach water sports hub, and Anjuna/Vagator cliffs.'
      },
      {
        day: 3,
        title: 'Old Goa Heritage & Mandovi Sunset Cruise',
        description: 'Visit Basilica of Bom Jesus, Se Cathedral, and Mangueshi Temple. In the evening, head to Panaji for a lively sunset cruise with music and folk dance on Mandovi river.'
      },
      {
        day: 4,
        title: 'Shopping in Panjim & Departure',
        description: 'Explore the colorful Latin Quarter of Fontainhas in Panjim, buy cashew nuts and Goan feni, and transfer to airport.'
      }
    ],
    bookingInformation: 'Can be tailored for couples with private candle-light beach dinners.',
    bestFor: 'Friends, Couples & Families',
    featured: false,
    isHidden: false,
    sortOrder: 10,
    createdAt: new Date('2026-01-10').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pkg-andaman-island-escape',
    title: 'Andaman Islands: Havelock & Radhanagar Beach',
    destination: 'Andaman Islands',
    category: 'domestic',
    days: 5,
    nights: 4,
    duration: '4 Nights / 5 Days',
    startingPrice: '₹24,999',
    originalPrice: '₹29,500',
    offerPrice: '₹24,999',
    priceDisplayText: 'Starting from ₹24,999 / person',
    shortDescription: 'Cruise to Havelock Island, walk on Asia’s best Radhanagar Beach, try thrilling scuba diving at Elephant Beach, and discover historic Cellular Jail.',
    fullDescription: 'Discover the exotic coral reefs and white sand beaches of Andaman & Nicobar. Includes 2 nights Port Blair, 2 nights Havelock Island resort, high-speed luxury catamaran (Makruzz/Nautika) cruise tickets, Cellular Jail Light & Sound show, Radhanagar Beach sunset, and Elephant Beach water sports.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      '2 Nights Port Blair + 2 Nights Havelock Island Beach Resort',
      'High-Speed Luxury Catamaran (Makruzz/Nautika) Cruise Transfers',
      'Radhanagar Beach Sunset (Ranked Asia’s Best Beach by Time Magazine)',
      'Elephant Beach Speedboat Trip with Complimentary Snorkeling',
      'Cellular Jail Entry with Light & Sound Show'
    ],
    inclusions: [
      '4 Nights 3/4-Star Stays with Daily Breakfast',
      'Inter-Island Luxury Catamaran Cruise Tickets (Port Blair - Havelock - Port Blair)',
      'All Sightseeing & Beach Transfers in Private AC Vehicle',
      'Cellular Jail Entry and Light & Sound Show Tickets',
      'Speedboat transfer to Elephant Beach'
    ],
    exclusions: [
      'Air tickets to Port Blair (IXZ)',
      'Scuba diving, Sea Walk, and Jet ski charges',
      'Camera permits & optional Neil Island extension'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Port Blair & Cellular Jail Light and Sound Show',
      'Day 2: Catamaran Cruise to Havelock Island & Radhanagar Beach Sunset',
      'Day 3: Elephant Beach Coral Reef Snorkeling & Speedboat Tour',
      'Day 4: Return Cruise to Port Blair & Corbyn’s Cove Beach',
      'Day 5: Airport Drop & Departure'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Port Blair & Cellular Jail',
        description: 'Arrive at Veer Savarkar International Airport in Port Blair. Transfer to hotel. Visit historic Cellular Jail and watch the evening Light & Sound saga of freedom fighters.'
      },
      {
        day: 2,
        title: 'Cruise to Havelock Island & Radhanagar Beach',
        description: 'Board a luxury high-speed catamaran across the blue sea to Havelock Island. Check in to beach resort. Spend the afternoon swimming at Radhanagar Beach (Beach No. 7).'
      },
      {
        day: 3,
        title: 'Elephant Beach Coral Snorkeling',
        description: 'Speedboat trip to Elephant Beach famous for shallow crystal water and vibrant living coral reefs. Enjoy complimentary snorkeling.'
      },
      {
        day: 4,
        title: 'Return to Port Blair & Souvenir Shopping',
        description: 'Catamaran cruise back to Port Blair. Visit Corbyn’s Cove coconut-fringed beach and Sagarika government handicraft emporium for pearl and seashell artifacts.'
      },
      {
        day: 5,
        title: 'Port Blair Airport Departure',
        description: 'Transfer to Port Blair airport for your return flight.'
      }
    ],
    bookingInformation: 'Direct flights operate from Chennai, Bangalore, and Kolkata to Port Blair. Best season is October to May.',
    bestFor: 'Couples, Families & Adventure Seekers',
    featured: false,
    isHidden: false,
    sortOrder: 11,
    createdAt: new Date('2026-01-11').toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let packagesStore: ManagedPackage[] = [];

export function initPackageStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }

    if (fs.existsSync(PACKAGES_FILE)) {
      const raw = fs.readFileSync(PACKAGES_FILE, 'utf-8');
      packagesStore = JSON.parse(raw);
      console.log(`[Package Store] Loaded ${packagesStore.length} persistent packages from disk.`);
    } else {
      packagesStore = [...INITIAL_PACKAGES_SEED];
      savePackagesToDisk();
      console.log(`[Package Store] Initialized fresh package store with ${packagesStore.length} domestic & international packages.`);
    }
  } catch (err) {
    console.error('[Package Store] Error initializing packages store:', err);
    packagesStore = [...INITIAL_PACKAGES_SEED];
  }
}

function savePackagesToDisk() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(PACKAGES_FILE, JSON.stringify(packagesStore, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Package Store] Failed to save packages to disk:', err);
  }
}

// Get all packages (Public gets only published/visible packages, Admin gets all)
export function getAllPackages(includeHidden = false, category?: string): ManagedPackage[] {
  let result = [...packagesStore];

  if (category) {
    result = result.filter(p => p.category === category.toLowerCase());
  }

  if (!includeHidden) {
    result = result.filter(p => !p.isHidden);
  }

  // Sort by sortOrder ASC
  result.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  return result;
}

export function getPackageById(id: string): ManagedPackage | undefined {
  return packagesStore.find(p => p.id === id);
}

export function createPackage(data: Partial<ManagedPackage>): ManagedPackage {
  const maxOrder = packagesStore
    .filter(p => p.category === data.category)
    .reduce((max, p) => Math.max(max, p.sortOrder || 0), 0);

  const newId = data.id && data.id.trim() !== '' 
    ? data.id.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
    : 'pkg-' + Date.now();

  const days = data.days || 1;
  const nights = data.nights !== undefined ? data.nights : Math.max(0, days - 1);
  const duration = data.duration || `${nights} Nights / ${days} Days`;
  const offerPrice = data.offerPrice || data.startingPrice || '₹0';
  const originalPrice = data.originalPrice || '';
  const priceDisplayText = data.priceDisplayText || `Starting from ${offerPrice} / person`;

  const newPkg: ManagedPackage = {
    id: newId,
    title: data.title || data.name || 'New Holiday Package',
    destination: data.destination || 'Destination',
    category: data.category === 'domestic' ? 'domestic' : 'international',
    days,
    nights,
    duration,
    startingPrice: offerPrice,
    offerPrice,
    originalPrice,
    priceDisplayText,
    shortDescription: data.shortDescription || data.fullDescription || '',
    fullDescription: data.fullDescription || data.shortDescription || '',
    image: data.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    galleryImages: Array.isArray(data.galleryImages) ? data.galleryImages : [],
    highlights: Array.isArray(data.highlights) && data.highlights.length > 0 ? data.highlights : ['Customized itinerary', 'Hotel Accommodation', 'Sightseeing Transfers'],
    inclusions: Array.isArray(data.inclusions) && data.inclusions.length > 0 ? data.inclusions : ['Hotel Stay', 'Daily Breakfast', 'All Transfers'],
    exclusions: Array.isArray(data.exclusions) ? data.exclusions : ['Personal expenses', 'Optional activities'],
    itinerarySummary: Array.isArray(data.itinerarySummary) ? data.itinerarySummary : [],
    dayWiseItinerary: Array.isArray(data.dayWiseItinerary) ? data.dayWiseItinerary : [],
    bookingInformation: data.bookingInformation || 'Rates subject to availability. Passports must have minimum 6 months validity.',
    bestFor: data.bestFor || 'Families, Couples & Friends',
    featured: Boolean(data.featured),
    isHidden: Boolean(data.isHidden),
    sortOrder: data.sortOrder !== undefined ? data.sortOrder : maxOrder + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  packagesStore.push(newPkg);
  savePackagesToDisk();
  return newPkg;
}

export function updatePackage(id: string, updates: Partial<ManagedPackage>): ManagedPackage | null {
  const index = packagesStore.findIndex(p => p.id === id);
  if (index === -1) return null;

  const existing = packagesStore[index];
  const days = updates.days !== undefined ? updates.days : existing.days;
  const nights = updates.nights !== undefined ? updates.nights : existing.nights;
  const duration = updates.duration || `${nights} Nights / ${days} Days`;
  const offerPrice = updates.offerPrice || updates.startingPrice || existing.offerPrice || existing.startingPrice;
  const originalPrice = updates.originalPrice !== undefined ? updates.originalPrice : existing.originalPrice;
  const priceDisplayText = updates.priceDisplayText || (offerPrice ? `Starting from ${offerPrice} / person` : existing.priceDisplayText);

  const updated: ManagedPackage = {
    ...existing,
    ...updates,
    id: existing.id, // Preserve ID
    days,
    nights,
    duration,
    startingPrice: offerPrice,
    offerPrice,
    originalPrice,
    priceDisplayText,
    highlights: Array.isArray(updates.highlights) ? updates.highlights : existing.highlights,
    inclusions: Array.isArray(updates.inclusions) ? updates.inclusions : existing.inclusions,
    exclusions: Array.isArray(updates.exclusions) ? updates.exclusions : existing.exclusions,
    galleryImages: Array.isArray(updates.galleryImages) ? updates.galleryImages : existing.galleryImages,
    dayWiseItinerary: Array.isArray(updates.dayWiseItinerary) ? updates.dayWiseItinerary : existing.dayWiseItinerary,
    updatedAt: new Date().toISOString()
  };

  packagesStore[index] = updated;
  savePackagesToDisk();
  return updated;
}

export function deletePackage(id: string): boolean {
  const initialLength = packagesStore.length;
  packagesStore = packagesStore.filter(p => p.id !== id);
  if (packagesStore.length !== initialLength) {
    savePackagesToDisk();
    return true;
  }
  return false;
}

export function togglePackageVisibility(id: string, isHidden: boolean): ManagedPackage | null {
  const index = packagesStore.findIndex(p => p.id === id);
  if (index === -1) return null;

  packagesStore[index].isHidden = isHidden;
  packagesStore[index].updatedAt = new Date().toISOString();
  savePackagesToDisk();
  return packagesStore[index];
}

export function reorderPackages(category: 'domestic' | 'international', orderedIds: string[]): ManagedPackage[] {
  orderedIds.forEach((id, newIndex) => {
    const pkg = packagesStore.find(p => p.id === id && p.category === category);
    if (pkg) {
      pkg.sortOrder = newIndex + 1;
      pkg.updatedAt = new Date().toISOString();
    }
  });

  savePackagesToDisk();
  return getAllPackages(true, category);
}

// Helper to save uploaded image data into disk
export function saveUploadedImageFile(base64Data: string, originalName = 'upload.jpg'): string {
  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }

    // Clean base64 header if present
    const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    let buffer: Buffer;
    let ext = '.jpg';

    if (matches && matches.length === 3) {
      const mime = matches[1];
      if (mime.includes('png')) ext = '.png';
      else if (mime.includes('webp')) ext = '.webp';
      else if (mime.includes('gif')) ext = '.gif';
      else if (mime.includes('svg')) ext = '.svg';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(base64Data, 'base64');
    }

    const filename = `pkg-img-${Date.now()}-${Math.floor(Math.random() * 10000)}${ext}`;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(filePath, buffer);

    return `/uploads/${filename}`;
  } catch (err) {
    console.error('[Package Store] Failed to save uploaded image:', err);
    // If saving fails, return base64 string directly as fallback so data is never lost
    return base64Data;
  }
}

// Initialize on module load
initPackageStore();

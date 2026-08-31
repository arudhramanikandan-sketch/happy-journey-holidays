import { Destination, HolidayPackage, TravelService, Testimonial } from '../types';
import { ALL_NEW_31_INTERNATIONAL_DESTINATIONS, ALL_NEW_31_INTERNATIONAL_PACKAGES } from './allNewInternationalPackages';
import { NEW_11_INTERNATIONAL_DESTINATIONS, NEW_11_INTERNATIONAL_PACKAGES } from './new11InternationalPackages';
import { ALL_DOMESTIC_DESTINATIONS, ALL_DOMESTIC_PACKAGES } from './domesticTravelData';

const INITIAL_INTERNATIONAL_DESTINATIONS: Destination[] = [
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    category: 'international',
    tagline: 'Futuristic Skyline, Lush Gardens & Sentosa Island',
    description: 'Experience the world-renowned Gardens by the Bay, thrilling Universal Studios Singapore, Marina Bay Sands SkyPark, Night Safari, and shopping along Orchard Road.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Universal Studios & Sentosa Cable Car',
      'Gardens by the Bay Supertrees & Flower Dome',
      'Marina Bay Sands Observation Deck',
      'Night Safari & River Wonders'
    ],
    bestTimeToVisit: 'November to June',
    visaInfo: 'E-Visa Assistance Available (3-5 business days)',
    highlights: ['City Tour', 'Sentosa Island', 'Night Safari', 'Gardens by the Bay'],
    featured: true
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    country: 'Malaysia',
    category: 'international',
    tagline: 'Twin Towers, Genting Cable Cars & Tropical Charm',
    description: 'Discover the iconic Petronas Twin Towers, cool breeze of Genting Highlands with its indoor theme park and casino, Batu Caves, and historical Malacca.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Petronas Twin Towers & Skybridge Entry',
      'Batu Caves Murugan Temple & Cable Car',
      'Genting Highlands SkyWorlds & Casino',
      'Langkawi Island Hopping & Cable Car'
    ],
    bestTimeToVisit: 'All Year Round',
    visaInfo: 'Visa-Free entry / MDAC submission assistance',
    highlights: ['Kuala Lumpur', 'Genting Highlands', 'Batu Caves', 'Putrajaya'],
    featured: true
  },
  {
    id: 'thailand',
    name: 'Thailand',
    country: 'Thailand',
    category: 'international',
    tagline: 'Golden Temples, Phi Phi Island & Vibrant Nightlife',
    description: 'Immerse in the energy of Bangkok, crystal-clear waters of Phuket, scenic limestone cliffs in Krabi, and family fun in Coral Island Pattaya.',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Phi Phi & James Bond Island Speedboat Tour',
      'Chao Phraya River Dinner Cruise in Bangkok',
      'Coral Island Water Sports in Pattaya',
      'Grand Palace & Wat Arun Temple Visit'
    ],
    bestTimeToVisit: 'November to April',
    visaInfo: 'Visa-Free entry for Indian Passports (Up to 60 Days)',
    highlights: ['Bangkok', 'Phuket', 'Pattaya', 'Krabi'],
    featured: true
  },
  {
    id: 'dubai',
    name: 'Dubai & UAE',
    country: 'United Arab Emirates',
    category: 'international',
    tagline: 'World Wonders, Desert Safari & Luxury Living',
    description: 'Stand atop the world at Burj Khalifa 124th floor, conquer the dunes in a 4x4 Desert Safari with BBQ dinner, cruise Marina on a luxury yacht, and visit Ferrari World Abu Dhabi.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Burj Khalifa 124th/125th Floor Observation Deck',
      'Evening Desert Safari with Dune Bashing & BBQ',
      'Dubai Marina Dhow Cruise with Live Shows',
      'Abu Dhabi City Tour & Sheikh Zayed Grand Mosque'
    ],
    bestTimeToVisit: 'October to April',
    visaInfo: 'Quick E-Visa (30 Days / 60 Days) processed in 48-72 hrs',
    highlights: ['Burj Khalifa', 'Desert Safari', 'Marina Cruise', 'Abu Dhabi Day Trip'],
    featured: true
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    category: 'international',
    tagline: 'Island of the Gods, Ubud Swings & Turquoise Waves',
    description: 'Experience Bali’s cultural heart in Ubud with lush rice terraces, romantic sunset at Uluwatu Cliff Temple, pristine Nusa Penida day trip, and private pool villas.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Ubud Bali Swing & Tegalalang Rice Terrace',
      'Nusa Penida Kelingking Beach & Broken Beach Speedboat Tour',
      'Uluwatu Sunset Temple & Kecak Dance',
      'Water sports at Tanjung Benoa (Banana Boat & Parasailing)'
    ],
    bestTimeToVisit: 'April to October',
    visaInfo: 'Visa on Arrival / E-VOA Assistance available',
    highlights: ['Ubud Culture', 'Kuta & Seminyak', 'Nusa Penida', 'Private Pool Villas'],
    featured: true
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    country: 'Vietnam',
    category: 'international',
    tagline: 'Halong Bay Cruise, Golden Bridge & Lanterns of Hoi An',
    description: 'Explore the scenic limestone islands of Halong Bay on a luxury overnight cruise, walk the iconic Golden Hand Bridge in Ba Na Hills, and cycle through ancient Hoi An.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Overnight Luxury Halong Bay Cruise with Kayaking',
      'Ba Na Hills Cable Car & Giant Hands Golden Bridge',
      'Hoi An Ancient Lantern Town Boat Ride',
      'Hanoi Old Quarter & Street Food Exploration'
    ],
    bestTimeToVisit: 'September to April',
    visaInfo: 'Vietnam E-Visa Assistance (3 working days)',
    highlights: ['Halong Bay Cruise', 'Da Nang & Golden Bridge', 'Hoi An', 'Hanoi'],
    featured: false
  },
  {
    id: 'europe',
    name: 'Europe',
    country: 'France & Switzerland',
    category: 'international',
    tagline: 'Eiffel Tower Elegance & Swiss Alpine Glaciers',
    description: 'A dream European voyage combining romantic Paris with Seine river cruise, Mount Titlis revolving cable car, Jungfraujoch Top of Europe, and Lake Lucerne.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '7 Nights / 8 Days',
    popularExperiences: [
      'Eiffel Tower Level 2 Entry & Seine River Cruise in Paris',
      'Mount Titlis Ice Flyer & Glacier Cave in Engelberg',
      'Jungfraujoch Sphinx Observatory (Top of Europe)',
      'Scenic Swiss Train Journeys & Lucerne Walking Tour'
    ],
    bestTimeToVisit: 'May to October',
    visaInfo: 'Complete Schengen Visa Appointment & Documentation Support',
    highlights: ['Paris (France)', 'Lucerne & Zurich', 'Swiss Alps', 'Mount Titlis'],
    featured: false
  }
];

export const INTERNATIONAL_DESTINATIONS: Destination[] = [
  ...INITIAL_INTERNATIONAL_DESTINATIONS,
  ...ALL_NEW_31_INTERNATIONAL_DESTINATIONS,
  ...NEW_11_INTERNATIONAL_DESTINATIONS
];

export const DOMESTIC_DESTINATIONS: Destination[] = ALL_DOMESTIC_DESTINATIONS;
export const DOMESTIC_PACKAGES: HolidayPackage[] = ALL_DOMESTIC_PACKAGES;

const INITIAL_PACKAGES: HolidayPackage[] = [
  {
    id: 'pkg-singapore-sentosa',
    title: 'Singapore Highlights with Sentosa & Universal Studios',
    destination: 'Singapore',
    category: 'international',
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '4-Star Central Hotel with Daily Breakfast',
      'Universal Studios Singapore Full Day Pass',
      'Sentosa Cable Car + Wings of Time Show',
      'Night Safari with Tram Ride',
      'Airport Pickup & Drop by Private Vehicle'
    ],
    inclusions: ['Hotel (4★)', 'Breakfast', 'Sightseeing Transfers', 'Entry Tickets', 'Visa Support'],
    bestFor: 'Families & Couples',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival in Singapore & Evening Night Safari',
      'Day 2: City Tour & Gardens by the Bay Flower Dome',
      'Day 3: Full Day thrills at Universal Studios Singapore',
      'Day 4: Sentosa Island Cable Car, Madame Tussauds & Wings of Time',
      'Day 5: Shopping at Orchard Road & Departure'
    ]
  },
  {
    id: 'pkg-malaysia-genting',
    title: 'Magical Malaysia & Genting Highlands Getaway',
    destination: 'Malaysia',
    category: 'international',
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '3 Nights Kuala Lumpur + 1 Night Genting Highlands',
      'Two-Way Genting Skyway Cable Car Ride',
      'Petronas Twin Towers Photo Stop & Batu Caves',
      'Putrajaya Tour & KL Tower Observation Deck',
      'Daily Buffet Breakfast & Airport Transfers'
    ],
    inclusions: ['Hotels', 'Daily Breakfast', 'Cable Car Pass', 'All Transfers', 'City Tours'],
    bestFor: 'Couples, Families & Groups',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival in Kuala Lumpur & Check-in',
      'Day 2: KL City Tour, KL Tower & Batu Caves',
      'Day 3: Transfer to Genting Highlands via Cable Car',
      'Day 4: Enjoy Genting theme park & return to KL for shopping',
      'Day 5: Putrajaya visit & Airport drop'
    ]
  },
  {
    id: 'pkg-thailand-bangkok-phuket',
    title: 'Exotic Thailand: Bangkok & Phuket Combo',
    destination: 'Thailand',
    category: 'international',
    duration: '5 Nights / 6 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '3 Nights Phuket + 2 Nights Bangkok (4-Star Hotels)',
      'Full Day Phi Phi Island Speedboat Tour with Lunch',
      'Chao Phraya Luxury Dinner Cruise in Bangkok',
      'Golden & Marble Buddha Temple Tours',
      'Domestic Flight Option from Coimbatore Included on Request'
    ],
    inclusions: ['4-Star Hotels', 'Breakfast', 'Phi Phi Cruise', 'Dinner Cruise', 'Transfers'],
    bestFor: 'Friends, Couples & Honeymooners',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival in Phuket & Relax on Patong Beach',
      'Day 2: Spectacular Phi Phi & Maya Bay Speedboat Tour with Lunch',
      'Day 3: Phuket City Tour & Big Buddha',
      'Day 4: Flight to Bangkok & Evening Chao Phraya River Cruise',
      'Day 5: Bangkok Temples & Safari World option',
      'Day 6: Souvenir Shopping & Departure'
    ]
  },
  {
    id: 'pkg-dubai-desert',
    title: 'Dazzling Dubai & Desert Safari Extravaganza',
    destination: 'Dubai',
    category: 'international',
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Burj Khalifa 124th Floor Ticket with Dubai Mall Fountain',
      '4x4 Desert Safari with Dune Bashing, Camel Ride & BBQ Dinner',
      'Dubai Marina Luxury Dhow Cruise with Live Tanoura Show',
      'Dubai Frame & Future Museum Exterior Photo Stop',
      'Complete UAE Tourist Visa Assistance Included'
    ],
    inclusions: ['4-Star Hotel', 'Breakfast', 'Burj Khalifa Pass', 'Desert Safari + BBQ', 'Marina Cruise', 'Transfers'],
    bestFor: 'Luxury, Family & Shopping',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival in Dubai & Marina Dhow Cruise with Dinner',
      'Day 2: Half-Day City Tour + Burj Khalifa 124th Floor',
      'Day 3: Thrilling Desert Safari with Quad Biking & Belly Dance',
      'Day 4: Day trip to Abu Dhabi Grand Mosque & Ferrari World',
      'Day 5: Gold Souk Shopping & Airport Transfer'
    ]
  },
  {
    id: 'pkg-bali-ubud-villas',
    title: 'Bali Tropical Bliss & Ubud Private Villa',
    destination: 'Bali',
    category: 'international',
    duration: '5 Nights / 6 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '3 Nights Kuta Beach Resort + 2 Nights Ubud Private Pool Villa',
      'Famous Bali Swing over Tegallalang Rice Terraces',
      'Nusa Penida West Island Tour with Speedboat',
      'Uluwatu Sunset Cliff Temple & Kecak Fire Dance',
      'Tanjung Benoa Water Sports (Banana Boat included)'
    ],
    inclusions: ['Private Pool Villa', 'Daily Breakfast', 'Nusa Penida Tour', 'Bali Swing Pass', 'Private Cab Driver'],
    bestFor: 'Honeymooners & Couples',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival in Bali with Flower Garland Welcome',
      'Day 2: Water Sports at Benoa & Uluwatu Sunset Temple',
      'Day 3: Nusa Penida Island Day Tour (Kelingking Beach & Angel’s Billabong)',
      'Day 4: Check into Ubud Pool Villa & Jungle Bali Swing',
      'Day 5: Kintamani Volcano view & Coffee Plantation',
      'Day 6: Traditional Balinese Spa & Departure'
    ]
  },
  {
    id: 'pkg-kerala-munnar-alleppey',
    title: 'Kerala Charms: Munnar Hills & Alleppey Houseboat',
    destination: 'Kerala',
    category: 'domestic',
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Pick up directly from Coimbatore / Cochin in AC Cab',
      '2 Nights Misty Munnar + 1 Night Thekkady + 1 Night Houseboat',
      'Exclusive Deluxe Alleppey Houseboat with all traditional meals',
      'Mattupetty Dam, Tea Gardens, Eravikulam National Park',
      'Spice Plantation Walk & Elephant Safari Option'
    ],
    inclusions: ['Dedicated AC Sedan/Innova', '3-Star Hotels + Houseboat', 'All Houseboat Meals', 'Sightseeing Tolls & Parking'],
    bestFor: 'Coimbatore Locals, Families & Couples',
    featured: true,
    itinerarySummary: [
      'Day 1: Scenic Drive to Munnar via Cheeyappara Waterfalls',
      'Day 2: Full Day Munnar Sightseeing (Tea Museum, Mattupetty, Echo Point)',
      'Day 3: Transfer to Thekkady & Periyar Boating',
      'Day 4: Check in to Deluxe Houseboat in Alleppey backwaters',
      'Day 5: Cochin Sightseeing / Return drive to Coimbatore'
    ]
  },
  {
    id: 'pkg-kashmir-heaven',
    title: 'Kashmir Paradise: Dal Lake & Gulmarg Snow',
    destination: 'Kashmir',
    category: 'domestic',
    duration: '5 Nights / 6 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '1 Night Luxury Srinagar Houseboat + 3 Nights Srinagar + 1 Night Pahalgam',
      'Shikara Boat Ride on Dal Lake with Floating Flower Market',
      'Gulmarg Gondola Cable Car Ride to Snow Mountain Phase 1',
      'Pahalgam Valley of Shepherds & Betaab Valley',
      'All Sightseeing in Private Non-Stop Cab'
    ],
    inclusions: ['Houseboat & Premium Hotels', 'Breakfast & Dinner (MAP)', 'Shikara Ride', 'Private Vehicle'],
    bestFor: 'Couples, Families & Nature Enthusiasts',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival in Srinagar & Check into Houseboat on Dal Lake',
      'Day 2: Srinagar Mughal Gardens & Shankaracharya Temple',
      'Day 3: Day trip to Gulmarg with Gondola Cable Car Experience',
      'Day 4: Transfer to Pahalgam via Saffron Fields & Apple Orchards',
      'Day 5: Pahalgam Aru Valley & return to Srinagar',
      'Day 6: Morning Shikara & Departure to Airport'
    ]
  },
  {
    id: 'pkg-ooty-kodai-weekend',
    title: 'Queen & Princess Hills: Ooty & Kodaikanal Tour',
    destination: 'Ooty & Kodaikanal',
    category: 'domestic',
    duration: '3 Nights / 4 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Doorstep Pickup & Drop from Coimbatore',
      '2 Nights Ooty + 1 Night Kodaikanal in Cozy Resorts',
      'Botanical Gardens, Pykara Lake & Doddabetta Viewpoint',
      'Kodai Lake Boating, Pillar Rocks & Pine Forest',
      'Toy Train Ticket Booking Assistance'
    ],
    inclusions: ['Coimbatore AC Cab', 'Hotel Stay', 'Daily Breakfast', 'Driver Allowances & Tolls'],
    bestFor: 'Weekend Travelers, Families & Friends',
    featured: false,
    itinerarySummary: [
      'Day 1: Coimbatore to Ooty drive, Botanical Gardens & Boat House',
      'Day 2: Doddabetta, Tea Factory, Pykara Waterfalls & Shooting Spot',
      'Day 3: Scenic drive to Kodaikanal, Kodai Lake & Coaker’s Walk',
      'Day 4: Pillar Rocks, Pine Forest & return to Coimbatore'
    ]
  }
];

export const FEATURED_PACKAGES: HolidayPackage[] = [
  ...ALL_DOMESTIC_PACKAGES,
  ...INITIAL_PACKAGES,
  ...ALL_NEW_31_INTERNATIONAL_PACKAGES,
  ...NEW_11_INTERNATIONAL_PACKAGES
];

export const TRAVEL_SERVICES: TravelService[] = [
  {
    id: 'flight-booking',
    title: 'Flight Ticket Booking',
    shortDesc: 'Domestic & international air tickets with competitive fares, group discounts, and instant assistance.',
    fullDesc: 'Get the best airfares with Happy Journey Holidays. Whether you need domestic flights from Coimbatore (CJB), Chennai (MAA), Bangalore (BLR), or international connections to Singapore, Dubai, Europe, and Southeast Asia, our ticketing experts ensure hassle-free booking, seat selection, extra baggage assistance, and quick date change support.',
    iconName: 'Plane',
    features: [
      'Best fare comparison across IndiGo, Air India, Singapore Airlines, Emirates & more',
      'Group ticketing & corporate booking discounts',
      'Web check-in & boarding pass assistance',
      'Quick date modifications, meal requests & seat selection'
    ],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Enquire Flight Fares'
  },
  {
    id: 'hotel-booking',
    title: 'Hotel & Resort Booking',
    shortDesc: 'Handpicked 3-star, 4-star, 5-star hotels, boutique stays, and romantic private pool villas.',
    fullDesc: 'From luxury beach resorts in Maldives and Bali to cozy hill station cottages in Munnar and Ooty, we partner with verified properties worldwide to secure guaranteed comfort, clean amenities, complimentary breakfast, and exclusive agency tariff rates.',
    iconName: 'Building',
    features: [
      'Verified 3-star, 4-star, 5-star & boutique properties',
      'Private pool villas, heritage palaces & overwater suites',
      'Special complimentary inclusions (honeymoon cakes, room upgrades)',
      'Transparent prices with no hidden charges'
    ],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Enquire Hotels'
  },
  {
    id: 'international-packages',
    title: 'International Holiday Packages',
    shortDesc: 'End-to-end curated holiday packages with flights, hotels, entry passes, and visa support.',
    fullDesc: 'Travel the world with zero stress! Our international packages cover everything from Singapore and Malaysia family tours to romantic Bali getaways, dazzling Dubai safaris, and European dream vacations. Every itinerary is fully customizable to your pace and budget.',
    iconName: 'Globe',
    features: [
      'Fully customizable itineraries for families, couples & groups',
      'Covering Singapore, Malaysia, Thailand, Dubai, Bali, Maldives, Vietnam, Europe & more',
      'Includes 4-star hotels, sightseeing tickets & private transfers',
      '24/7 dedicated on-tour assistance via WhatsApp & phone'
    ],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Explore International'
  },
  {
    id: 'domestic-packages',
    title: 'Domestic Holiday Packages',
    shortDesc: 'Explore the wonders of India — Kerala backwaters, Kashmir snow, Ooty hills, and royal Rajasthan.',
    fullDesc: 'Experience the rich landscapes and culture of Incredible India. Starting directly from Coimbatore or any Indian gateway, our domestic tours offer comfortable AC vehicle transfers, carefully selected stays, and curated sightseeing with local guides.',
    iconName: 'Compass',
    features: [
      'Specialized departures from Coimbatore for Kerala, Ooty, Kodaikanal & Goa',
      'Dream destinations: Kashmir, Himachal, Rajasthan, Andaman & Golden Triangle',
      'Houseboats, hill resorts, wildlife safaris & heritage walks',
      'Flexible budgets from economical to premium luxury'
    ],
    image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Explore Domestic'
  },
  {
    id: 'visa-assistance',
    title: 'Visa Assistance & Guidance',
    shortDesc: 'Expert guidance and document verification for tourist visas across worldwide destinations.',
    fullDesc: 'Navigating visa requirements is effortless with our Coimbatore visa assistance desk. We provide end-to-end documentation checklists, online form filling, biometric appointment scheduling, cover letter drafting, and tracking for tourist and business visas.',
    iconName: 'FileCheck',
    features: [
      'E-Visa processing for Singapore, Dubai, Vietnam, Sri Lanka, Azerbaijan',
      'Schengen (Europe), UK, USA, Canada & Australia tourist visa documentation',
      'Fast document verification & cover letter assistance',
      'High approval guidance with transparent timelines'
    ],
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Get Visa Assistance'
  },
  {
    id: 'travel-insurance',
    title: 'Travel Insurance',
    shortDesc: 'Comprehensive international and domestic travel protection for medical emergencies and delays.',
    fullDesc: 'Ensure complete peace of mind on every journey. Our international travel insurance policies cover overseas medical emergencies, hospitalization, baggage loss or delay, passport theft, trip cancellation, and flight delays across all age categories.',
    iconName: 'ShieldCheck',
    features: [
      'Cashless medical treatment abroad and emergency evacuation',
      'Baggage loss, passport loss & trip cancellation protection',
      'Schengen-compliant insurance certificates provided in minutes',
      'Coverage options for individuals, families & senior citizens'
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Get Insurance Quote'
  },
  {
    id: 'transfers-cabs',
    title: 'Transfers & Outstation Cabs',
    shortDesc: 'Airport transfers, sightseeing cabs, and outstation rentals from Coimbatore to Nilgiris & South India.',
    fullDesc: 'Travel in comfort with our well-maintained fleet of AC Sedans, Innova Crystas, and Tempo Travellers. We provide prompt airport pick-ups/drop-offs at Coimbatore, Cochin, and Bangalore airports, as well as customized outstation tour packages for Ooty, Munnar, Kodaikanal, and temple circuits.',
    iconName: 'Car',
    features: [
      'Coimbatore Airport (CJB) & Railway Station timely pickup/drop',
      'Experienced, courteous drivers familiar with ghat roads & tourist spots',
      'Clean sanitized AC Sedans, Innova Crysta, Urbania & Tempo Travellers',
      'All-inclusive pricing covering tolls, parking, and driver allowances'
    ],
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Book Outstation Cab'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Dr. Vignesh & Swathi',
    location: 'Coimbatore, Tamil Nadu',
    trip: 'Singapore & Malaysia Family Tour (5 Days)',
    rating: 5,
    comment: 'We booked our family vacation to Singapore & Genting with Happy Journey Holidays from their Neelambur office. Right from visa processing to airport pickup and Universal Studios tickets, everything was seamless. Their WhatsApp support was available throughout our trip!',
    date: 'February 2026',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Karthik Ramanathan',
    location: 'Tiruppur, Tamil Nadu',
    trip: 'Bali Honeymoon with Ubud Pool Villa (6 Days)',
    rating: 5,
    comment: 'The Ubud pool villa and Nusa Penida private tour planned by Happy Journey Holidays was unforgettable! The pricing was very competitive compared to online portals, and having a dedicated driver throughout made our honeymoon completely stress-free.',
    date: 'January 2026',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Anand Kumar & Family',
    location: 'Coimbatore (RS Puram)',
    trip: 'Kashmir Paradise Tour (6 Days)',
    rating: 5,
    comment: 'Our Kashmir trip in January was spectacular. Gulmarg Gondola ride, Dal lake houseboat, and Pahalgam snow views were arranged cleanly. The cab driver was very polite and the hotels were cozy with room heaters. Highly recommend Happy Journey Holidays!',
    date: 'January 2026',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Deepa Subramanian',
    location: 'Erode, Tamil Nadu',
    trip: 'Dubai 5-Day Extravaganza with Desert Safari',
    rating: 5,
    comment: 'Extremely quick Dubai visa turnaround and fantastic Burj Khalifa & Desert Safari arrangements. They customized the dates according to our flight timings without any hassle. Transparent pricing and no hidden costs.',
    date: 'December 2025',
    verified: true
  },
  {
    id: 'rev-5',
    name: 'Suresh Kumar & Friends',
    location: 'Pollachi / Coimbatore',
    trip: 'Thailand Bangkok & Phuket (6 Days)',
    rating: 5,
    comment: 'Booked a group package for 6 friends to Phuket & Bangkok. The Phi Phi Island speedboat tour and Chao Phraya cruise were the biggest highlights. Prompt coordination on WhatsApp at all times.',
    date: 'November 2025',
    verified: true
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Personalized Travel Planning',
    description: 'Every traveler is unique. We customize your itinerary, flight timings, hotel categories, and activities according to your personal pace and budget.',
    iconName: 'Sliders'
  },
  {
    title: 'Competitive Pricing',
    description: 'Direct relationships with local tour operators and hotels give you genuine wholesale rates without hidden markups or inflated middleman fees.',
    iconName: 'BadgePercent'
  },
  {
    title: 'Complete Travel Assistance',
    description: 'From visa documentation, flight ticketing, and foreign exchange guidance to hotel check-ins and cab transfers — we take care of every detail.',
    iconName: 'CheckCircle2'
  },
  {
    title: 'Dedicated Customer Support',
    description: 'Real-time on-tour WhatsApp and phone support throughout your vacation. We are with you from your departure from Coimbatore until you return safely home.',
    iconName: 'Headphones'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Tell Us Your Plan',
    description: 'Share your dream destination, preferred dates, number of travelers, and budget via our quick enquiry form or directly on WhatsApp.'
  },
  {
    step: '02',
    title: 'Get Your Customized Quote',
    description: 'Our Coimbatore travel specialists design a tailored itinerary with transparent itemized pricing, hotel options, and activity inclusions.'
  },
  {
    step: '03',
    title: 'Confirm Your Trip',
    description: 'Finalize your itinerary, review hotel vouchers, receive visa assistance, and lock in your bookings with secure, flexible payment terms.'
  },
  {
    step: '04',
    title: 'Travel With Confidence',
    description: 'Enjoy your holiday with 24/7 on-ground WhatsApp support, verified local drivers, and pre-booked passes for zero waiting time.'
  }
];

import { Destination, HolidayPackage } from '../types';

export const NEW_11_INTERNATIONAL_DESTINATIONS: Destination[] = [
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    category: 'international',
    tagline: 'Pristine Overwater Villas & Turquoise Lagoons',
    description: 'Experience pure tropical paradise in the Maldives with private overwater bungalows, coral reef snorkeling, sunset dolphin safaris, and all-inclusive island resort hospitality.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '3 Nights / 4 Days',
    popularExperiences: [
      'Overwater Villa stay with ocean lagoon access',
      'Speedboat or scenic seaplane resort transfers',
      'Guided coral reef snorkeling and marine wildlife safari',
      'Romantic sunset cruise with dolphin watching'
    ],
    bestTimeToVisit: 'November to April',
    visaInfo: 'Free 30-day Tourist Visa on Arrival for Indian passport holders',
    highlights: ['Overwater Villa', 'Coral Reefs', 'Seaplane Transfers', 'Private Island Resorts'],
    featured: true
  },
  {
    id: 'mauritius',
    name: 'Mauritius',
    country: 'Mauritius',
    category: 'international',
    tagline: 'Turquoise Lagoons, Chamarel Colored Earth & Catamaran Cruises',
    description: 'An enchanting Indian Ocean island featuring the Seven Coloured Earths of Chamarel, thrilling speedboats to Ile Aux Cerfs, swimming with wild dolphins at Tamarin Bay, and volcanic crater panoramas.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '6 Nights / 7 Days',
    popularExperiences: [
      'Full-day Ile Aux Cerfs island excursion by speedboat with parasailing & underwater sea walk',
      'South Island Tour: Chamarel 7 Coloured Earth, Grand Bassin Sacred Lake & Black River Gorges',
      'North Island Tour: Port Louis Capital, Caudan Waterfront & Pamplemousses Botanical Garden',
      'Catamaran luxury sunset cruise with barbecue lunch on board'
    ],
    bestTimeToVisit: 'May to December',
    visaInfo: 'Free 60-day Tourist Visa on Arrival for Indian citizens',
    highlights: ['Ile Aux Cerfs', 'Chamarel Colored Earth', 'Port Louis Waterfront', 'Catamaran Cruise'],
    featured: true
  },
  {
    id: 'reunion-island',
    name: 'Reunion Island',
    country: 'Reunion Island (France)',
    category: 'international',
    tagline: 'Active Volcanos, Dramatic Calderas & Tropical Rainforests',
    description: 'A French tropical territory in the Indian Ocean renowned for Piton de la Fournaise active volcano, breathtaking amphitheatre cirques (Cilaos, Mafate, Salazie), and cascading waterfalls.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Piton de la Fournaise volcano caldera viewpoint & lunar landscape walk',
      'Scenic mountain road to Cirque de Cilaos with thermal spring valleys',
      'Helicopter flight over Trou de Fer canyon and dramatic waterfalls',
      'Saint-Gilles lagoon sunset cruise and Creole cuisine tasting'
    ],
    bestTimeToVisit: 'April to November',
    visaInfo: 'French Overseas Territory / Schengen Visa Support provided',
    highlights: ['Piton de la Fournaise Volcano', 'Cirque de Cilaos', 'Trou de Fer Waterfalls', 'Creole Culture'],
    featured: false
  },
  {
    id: 'uk',
    name: 'United Kingdom (UK)',
    country: 'United Kingdom',
    category: 'international',
    tagline: 'Royal Palaces, Big Ben, Stonehenge & Scottish Highlands',
    description: 'Explore London’s historic landmarks including Buckingham Palace, Tower Bridge, and the London Eye, marvel at mysterious Stonehenge, visit Oxford and Cambridge, and discover Edinburgh Castle.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '7 Nights / 8 Days',
    popularExperiences: [
      'London City Tour with London Eye, Big Ben, Westminster Abbey & Thames River Cruise',
      'Day excursion to Windsor Castle, mysterious Stonehenge & historic Roman Baths',
      'Oxford University historic walking tour and Cotswolds quintessential village trail',
      'High-speed train to Edinburgh, Scotland with Edinburgh Castle & Royal Mile tour'
    ],
    bestTimeToVisit: 'April to October',
    visaInfo: 'UK Standard Visitor Visa Assistance & Biometric Appointment Support',
    highlights: ['London Eye & Big Ben', 'Windsor & Stonehenge', 'Oxford & Cotswolds', 'Edinburgh Castle'],
    featured: true
  },
  {
    id: 'france',
    name: 'France',
    country: 'France',
    category: 'international',
    tagline: 'Parisian Romance, Louvre Art & French Riviera Charm',
    description: 'Ascend the iconic Eiffel Tower, cruise down the River Seine past historic monuments, view Mona Lisa at the Louvre, tour Palace of Versailles, and unwind along the Mediterranean coast of Nice.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '6 Nights / 7 Days',
    popularExperiences: [
      'Eiffel Tower Level 2 / Summit entry with panoramic city views',
      'Seine River illuminated evening dinner cruise past Notre-Dame',
      'Louvre Museum skip-the-line guided masterpiece tour',
      'Grand Palace of Versailles Hall of Mirrors & Royal Gardens excursion'
    ],
    bestTimeToVisit: 'April to October',
    visaInfo: 'Complete Schengen Visa Assistance (Documentation, Insurance & Appointments)',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise', 'Palace of Versailles'],
    featured: true
  },
  {
    id: 'belgium',
    name: 'Belgium',
    country: 'Belgium',
    category: 'international',
    tagline: 'Medieval Canals, Grand Place & World-Class Chocolates',
    description: 'Immerse in the medieval fairy-tale charm of Bruges with its picturesque waterways, Brussels Grand Place gilded architecture, Atomium, Ghent guild houses, and Belgian waffles.',
    image: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Brussels Grand Place walking tour, Manneken Pis & Atomium photo stop',
      'Full-day romantic Bruges canal cruise and medieval Market Square exploration',
      'Ghent Castle of the Counts and historic Saint Bavo Cathedral',
      'Belgian artisan chocolate-making workshop and authentic waffle tasting'
    ],
    bestTimeToVisit: 'April to October',
    visaInfo: 'Schengen Visa Processing Assistance for Indian Passports',
    highlights: ['Grand Place Brussels', 'Bruges Canal Cruise', 'Ghent Medieval Castle', 'Belgian Chocolates'],
    featured: false
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    country: 'Netherlands',
    category: 'international',
    tagline: 'Amsterdam Canals, Historic Windmills & Keukenhof Tulips',
    description: 'Cruise the picturesque canals of Amsterdam, visit historic wooden windmills and cheese farms at Zaanse Schans, explore the Rijksmuseum and Van Gogh masterpieces, and walk through Keukenhof tulip gardens.',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Amsterdam Glass-Topped Canal Cruise through UNESCO World Heritage waterways',
      'Zaanse Schans working windmills, clog-making demonstration & Gouda cheese farm',
      'Seasonal Keukenhof Tulip Gardens tour (March to May) / Giethoorn village cruise',
      'Rijksmuseum & Van Gogh Museum entry with Dam Square walking tour'
    ],
    bestTimeToVisit: 'March to October (Spring for Tulips)',
    visaInfo: 'Schengen Visa Documentation & VFS Appointment Support',
    highlights: ['Amsterdam Canals', 'Zaanse Schans Windmills', 'Keukenhof Tulips', 'Giethoorn Village'],
    featured: true
  },
  {
    id: 'germany',
    name: 'Germany',
    country: 'Germany',
    category: 'international',
    tagline: 'Fairy-Tale Castles, Black Forest & Dynamic Berlin',
    description: 'Discover Neuschwanstein Castle nestled in the Bavarian Alps, the historic Brandenburg Gate and Reichstag in Berlin, romantic Rhine river castles, and the lush evergreen Black Forest.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '6 Nights / 7 Days',
    popularExperiences: [
      'Fairytale Neuschwanstein Castle excursion in Bavarian Hohenschwangau',
      'Munich Marienplatz, BMW Welt museum & English Garden walking tour',
      'Berlin Wall East Side Gallery, Brandenburg Gate & Checkpoint Charlie',
      'Scenic Black Forest Cuckoo Clock workshop and Lake Titisee boat ride'
    ],
    bestTimeToVisit: 'May to October & December for Christmas Markets',
    visaInfo: 'German Schengen Visa Processing & Verification Support',
    highlights: ['Neuschwanstein Castle', 'Munich & Bavaria', 'Berlin Wall', 'Black Forest & Rhine'],
    featured: true
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    country: 'Switzerland',
    category: 'international',
    tagline: 'Snow-Capped Alps, Mount Titlis & Scenic Glacier Trains',
    description: 'The pinnacle of Alpine beauty featuring Mount Titlis rotating Rotair cable car, Jungfraujoch Top of Europe, pristine Lake Lucerne cruises, Interlaken adventure sports, and scenic Swiss Rail.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '6 Nights / 7 Days',
    popularExperiences: [
      'Mount Titlis revolving Rotair cable car, Cliff Walk suspension bridge & Ice Cave',
      'Jungfraujoch Cogwheel Train to Top of Europe Sphinx Observatory (3,454m)',
      'Lake Lucerne scenic paddle steamer cruise and Chapel Bridge historic walk',
      'Interlaken panoramic town tour nestled between Lake Thun and Lake Brienz'
    ],
    bestTimeToVisit: 'All Year Round (Snow in Winter / Green Meadows in Summer)',
    visaInfo: 'Swiss Schengen Visa End-to-End Processing & Insurance',
    highlights: ['Mount Titlis', 'Jungfraujoch Top of Europe', 'Lucerne & Chapel Bridge', 'Interlaken'],
    featured: true
  },
  {
    id: 'italy',
    name: 'Italy',
    country: 'Italy',
    category: 'international',
    tagline: 'Ancient Rome Colosseum, Venice Gondolas & Tuscan Hills',
    description: 'Walk through history at the Roman Colosseum and Trevi Fountain, glide along Venice’s romantic Grand Canal on a private gondola, admire Renaissance art in Florence, and visit the Leaning Tower of Pisa.',
    image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '7 Nights / 8 Days',
    popularExperiences: [
      'Skip-the-line Roman Colosseum, Roman Forum & Palatine Hill guided tour',
      'Venice Grand Canal traditional Gondola ride & St. Mark’s Basilica entry',
      'Florence Duomo, Ponte Vecchio & Uffizi Gallery Renaissance art tour',
      'Day excursion to Leaning Tower of Pisa & Miracles Square'
    ],
    bestTimeToVisit: 'April to June & September to November',
    visaInfo: 'Italian Schengen Visa Complete Documentation Support',
    highlights: ['Rome Colosseum & Trevi', 'Venice Gondola Ride', 'Florence Duomo', 'Leaning Tower of Pisa'],
    featured: true
  },
  {
    id: 'vatican-city',
    name: 'Vatican City',
    country: 'Vatican City',
    category: 'international',
    tagline: 'Sistine Chapel Masterpieces & St. Peter’s Basilica',
    description: 'The world’s smallest independent state and sovereign holy enclave, home to Michelangelo’s legendary Sistine Chapel ceiling, the immense St. Peter’s Basilica, and priceless Vatican Museums.',
    image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '3 Nights / 4 Days (Combined with Rome)',
    popularExperiences: [
      'Skip-the-line VIP entry to Vatican Museums & Gallery of Maps',
      'Michelangelo’s Sistine Chapel ceiling & Last Judgment masterpiece tour',
      'St. Peter’s Basilica guided interior tour and St. Peter’s Square papal vista',
      'Climb to St. Peter’s Dome for breathtaking 360-degree panorama of Rome'
    ],
    bestTimeToVisit: 'All Year Round',
    visaInfo: 'Accessed via Italy Schengen Visa (No separate border control)',
    highlights: ['Sistine Chapel', 'St. Peter’s Basilica', 'Vatican Museums', 'St. Peter’s Square'],
    featured: false
  }
];

export const NEW_11_INTERNATIONAL_PACKAGES: HolidayPackage[] = [
  {
    id: 'pkg-maldives-luxury-water-villa',
    title: 'Maldives Overwater Villa & Lagoon Luxury Retreat',
    destination: 'Maldives',
    category: 'international',
    duration: '3 Nights / 4 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '3 Nights in Luxury Overwater Villa with direct ocean access',
      'Speedboat or Seaplane round-trip airport transfers included',
      'All-Inclusive Meals with multi-cuisine dining & beverages',
      'Complimentary Snorkeling equipment and non-motorized water sports',
      'Complimentary Sunset Dolphin Watching Cruise for two'
    ],
    inclusions: ['Luxury Overwater Villa', 'All-Inclusive Meals', 'Airport Transfers', 'Snorkeling Gear', 'Dolphin Cruise', 'All Island Taxes'],
    exclusions: ['International Flights', 'Motorized Water Sports', 'Spa Treatments', 'Personal Expenses'],
    bestFor: 'Couples, Honeymooners & Luxury Travelers',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival at Male International Airport, Speedboat / Seaplane transfer to Resort & Sunset Overwater Villa check-in',
      'Day 2: Morning lagoon swimming, coral reef snorkeling & beachside candlelight dinner',
      'Day 3: Sunset Dolphin cruise, water sports & evening live island entertainment',
      'Day 4: Tropical breakfast, souvenir shopping & transfer back to Male Airport for departure'
    ],
    dayWiseItinerary: [
      { day: 1, title: 'Arrival in Male & Scenic Resort Transfer', description: 'Arrive at Velana International Airport in Male. Meet our resort representative and board your speedboat or scenic seaplane to your private island resort. Check in to your luxury Overwater Villa.' },
      { day: 2, title: 'Coral Reef Snorkeling & Ocean Relaxation', description: 'Wake up to panoramic turquoise ocean views. Enjoy a lavish buffet breakfast, put on snorkeling gear to explore colorful marine life right outside your villa deck, and unwind with sunset cocktails.' },
      { day: 3, title: 'Sunset Dolphin Cruise & Island Activities', description: 'Indulge in stand-up paddleboarding or kayaking across the shallow calm lagoon. In the late afternoon, set sail on a traditional Dhoni boat for an unforgettable sunset dolphin safari.' },
      { day: 4, title: 'Leisure Breakfast & Departure', description: 'Enjoy your final breakfast over the ocean waters. Complete check-out formalities and board your transfer back to Male Airport for your onward journey with unforgettable island memories.' }
    ]
  },
  {
    id: 'pkg-mauritius-island-paradise',
    title: 'Mauritius Tropical Wonders & Ile Aux Cerfs Spectacular',
    destination: 'Mauritius',
    category: 'international',
    duration: '6 Nights / 7 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '6 Nights stay in 4-Star Beachfront Resort with Breakfast & Dinner',
      'Full-Day Ile Aux Cerfs Island excursion by Speedboat with Parasailing',
      'South Island Tour: Chamarel 7 Coloured Earth & Grand Bassin Crater Lake',
      'North Island Tour: Port Louis Capital, Caudan Waterfront & Pamplemousses',
      'All Sightseeing & Airport Transfers in Private AC Vehicle'
    ],
    inclusions: ['4-Star Beachfront Resort', 'Daily Breakfast & Dinner', 'Ile Aux Cerfs Speedboat Tour', 'South & North Island Tours', 'Private AC Transfers'],
    exclusions: ['International Flights', 'Optional Water Sports Charges', 'Travel Insurance', 'Personal Expenses'],
    bestFor: 'Couples, Families & Nature Enthusiasts',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival in Mauritius, traditional garland welcome & beach resort check-in',
      'Day 2: Full-day Ile Aux Cerfs island excursion with watersports & beach relaxation',
      'Day 3: Day at leisure to enjoy resort amenities, infinity pools and water activities',
      'Day 4: South Island discovery tour: Chamarel 7 Coloured Earth, Black River Gorges & Grand Bassin',
      'Day 5: North Island tour: Port Louis city, Caudan Waterfront & Royal Botanical Gardens',
      'Day 6: Catamaran cruise or optional Casela Nature Park quad biking safari',
      'Day 7: Farewell breakfast, last-minute shopping & airport transfer'
    ],
    dayWiseItinerary: [
      { day: 1, title: 'Welcome to Paradise Mauritius', description: 'Arrive at Sir Seewoosagur Ramgoolam International Airport. Private transfer to your beachfront resort. Spend the evening relaxing by the beach with a welcome tropical cocktail.' },
      { day: 2, title: 'Full-Day Ile Aux Cerfs Island Adventure', description: 'Board a high-speed boat to the picture-perfect island of Ile Aux Cerfs. Enjoy clear turquoise lagoons, optional parasailing and undersea walk, and relaxation on powder-white sands.' },
      { day: 3, title: 'Leisure Day & Water Activities', description: 'Spend a relaxing day enjoying the resort amenities, beach volleyball, glass-bottom boat rides, or booking a rejuvenating Mauritian spa treatment.' },
      { day: 4, title: 'South Island Tour & Chamarel Coloured Earth', description: 'Visit the dormant volcanic crater of Trou aux Cerfs, sacred Grand Bassin Hindu temple lake, Alexandra Falls viewpoint, and the geological wonder of Chamarel Seven Coloured Earth.' },
      { day: 5, title: 'North Island Highlights & Port Louis', description: 'Explore the historic capital city of Port Louis, shop at Caudan Waterfront, visit Citadel Fort Adelaide for panoramic city views, and wander the famous Pamplemousses Botanical Garden.' },
      { day: 6, title: 'Optional Catamaran Cruise / Casela Nature Parks', description: 'Optional catamaran day cruise with dolphin watching and BBQ lunch, or an adventure day interacting with lions and riding quad bikes at Casela Nature Park.' },
      { day: 7, title: 'Departure from Mauritius', description: 'Savor your final breakfast overlooking the ocean. Transfer to airport for your flight back home.' }
    ]
  },
  {
    id: 'pkg-reunion-island-adventure',
    title: 'Reunion Island Volcanic Peaks & Cirques Expedition',
    destination: 'Reunion Island',
    category: 'international',
    duration: '5 Nights / 6 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '5 Nights in Boutique Island Lodge with Daily Breakfast',
      'Guided excursion to Piton de la Fournaise active volcano caldera',
      'Scenic mountain road journey through Cirque de Cilaos & Salazie',
      'Trou de Fer canyon viewpoint & Cascade Niagara waterfall visit',
      'All Private Transfers with English-speaking driver guide'
    ],
    inclusions: ['Boutique Stays', 'Daily Breakfast', 'Volcano Guided Excursion', 'Cirque Tours', 'Private Vehicle Transfers'],
    exclusions: ['Airfare', 'Helicopter Tour', 'Personal Expenses', 'Visa Fees'],
    bestFor: 'Adventure Lovers, Photographers & Hikers',
    featured: false,
    itinerarySummary: [
      'Day 1: Arrival at Roland Garros Airport in Saint-Denis & transfer to coastal lodge',
      'Day 2: Full-day expedition to Piton de la Fournaise volcano and Plaine des Sables',
      'Day 3: Scenic journey through Cirque de Cilaos mountain amphitheatre & thermal springs',
      'Day 4: Lush Cirque de Salazie, Hell-Bourg creole heritage village & Bridal Veil falls',
      'Day 5: Saint-Gilles-les-Bains beach relaxation & evening catamaran sunset cruise',
      'Day 6: Saint-Denis historical walking tour & airport departure transfer'
    ]
  },
  {
    id: 'pkg-uk-grand-explorer',
    title: 'Great Britain Royal Highlights, London & Edinburgh',
    destination: 'United Kingdom (UK)',
    category: 'international',
    duration: '7 Nights / 8 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '4 Nights London + 3 Nights Edinburgh in Central 4-Star Hotels',
      'London City Tour with London Eye & Thames River Cruise',
      'Day Tour to Royal Windsor Castle, Stonehenge & Roman Baths',
      'Scenic High-Speed LNER Train Journey from London to Scotland',
      'Edinburgh Castle skip-the-line entry & Royal Mile tour'
    ],
    inclusions: ['4-Star Central Hotels', 'Daily Breakfast', 'London Eye Tickets', 'Windsor & Stonehenge Tour', 'High-Speed UK Train', 'Edinburgh Castle Entry', 'Transfers'],
    exclusions: ['International Flights', 'UK Visa Fees', 'Lunches & Dinners', 'Personal Expenses'],
    bestFor: 'Families, History Lovers & European Explorers',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival at London Heathrow Airport, private transfer to hotel & leisure evening in Covent Garden',
      'Day 2: London Panoramic City Tour: Big Ben, Westminster Abbey, Buckingham Palace & London Eye flight',
      'Day 3: Full-Day Day Excursion to Windsor Castle, mysterious Stonehenge & Roman Baths in Bath',
      'Day 4: Tower of London, Tower Bridge glass walkway & shopping at Oxford Street and Harrods',
      'Day 5: Scenic High-Speed Train through English countryside to Edinburgh, Scotland',
      'Day 6: Edinburgh Castle guided tour, Royal Mile, Palace of Holyroodhouse & Arthur’s Seat vista',
      'Day 7: Scottish Highlands & Loch Ness scenic day tour with dramatic mountain landscapes',
      'Day 8: Scottish breakfast, souvenir shopping & transfer to Edinburgh Airport for departure'
    ],
    dayWiseItinerary: [
      { day: 1, title: 'Arrival in London', description: 'Arrive at London Heathrow Airport. Meet your private transfer driver and check in to your central London hotel. Evening stroll through bustling Leicester Square and Covent Garden.' },
      { day: 2, title: 'Iconic London & London Eye Flight', description: 'Enjoy a comprehensive city tour covering Big Ben, Houses of Parliament, Westminster Abbey, and Buckingham Palace for the Changing of the Guard. In the afternoon, board the iconic London Eye for 360-degree skyline views.' },
      { day: 3, title: 'Windsor Castle, Stonehenge & Roman Baths', description: 'Travel through the Royal County of Berkshire to visit Windsor Castle, the ancestral home of the British Monarchy. Continue to UNESCO-listed Stonehenge and the ancient thermal city of Bath.' },
      { day: 4, title: 'Tower of London & Shopping', description: 'Visit the historic Tower of London to view the glittering Crown Jewels and walk across the glass floor of Tower Bridge. Spend the afternoon shopping at Regent Street and Oxford Street.' },
      { day: 5, title: 'Scenic Train to Edinburgh, Scotland', description: 'Board the modern high-speed train traveling north along the dramatic Northumberland coastline into Edinburgh Waverley. Check in and explore the historic Royal Mile.' },
      { day: 6, title: 'Edinburgh Castle & Scottish Heritage', description: 'Tour the formidable Edinburgh Castle dominating Castle Rock. Explore the National Museum of Scotland, St. Giles’ Cathedral, and the Palace of Holyroodhouse.' },
      { day: 7, title: 'Highlands & Loch Ness Excursion', description: 'Full-day coach adventure deep into the Scottish Highlands, passing Stirling Castle, breathtaking Glencoe valley, and the mysterious waters of Loch Ness.' },
      { day: 8, title: 'Farewell Great Britain', description: 'Enjoy a traditional Scottish breakfast before your airport transfer for your flight back home.' }
    ]
  },
  {
    id: 'pkg-france-paris-versailles-nice',
    title: 'Romantic Paris, Palace of Versailles & French Elegance',
    destination: 'France',
    category: 'international',
    duration: '6 Nights / 7 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '6 Nights in Central Parisian 4-Star Hotel with Daily Breakfast',
      'Eiffel Tower Level 2 / Summit entry with priority access',
      'Illuminated Seine River evening dinner cruise past iconic bridges',
      'Louvre Museum guided tour to see Mona Lisa & Venus de Milo',
      'Grand Palace of Versailles Royal Apartments & Musical Gardens excursion'
    ],
    inclusions: ['4-Star Parisian Hotel', 'Daily Buffet Breakfast', 'Eiffel Tower Entry', 'Seine Dinner Cruise', 'Louvre Museum Tour', 'Versailles Tour', 'Airport Transfers'],
    exclusions: ['International Flights', 'Schengen Visa Fees', 'City Tourist Taxes', 'Personal Expenses'],
    bestFor: 'Couples, Honeymooners & Art Lovers',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival at Paris Charles de Gaulle Airport, private transfer to hotel & evening Montmartre walk',
      'Day 2: Paris Highlights: Champs-Élysées, Arc de Triomphe & Eiffel Tower Level 2 summit views',
      'Day 3: Louvre Museum Masterpieces tour, Notre-Dame exterior & Seine River evening cruise',
      'Day 4: Full-day royal excursion to the grand Palace of Versailles & Hall of Mirrors',
      'Day 5: Latin Quarter, Luxembourg Gardens, Panthéon & Galeries Lafayette shopping',
      'Day 6: Day trip to Disneyland Paris OR charming Monet’s Giverny Gardens',
      'Day 7: Fresh French croissants breakfast & private transfer to airport for departure'
    ],
    dayWiseItinerary: [
      { day: 1, title: 'Bienvenue à Paris', description: 'Arrive at Paris CDG Airport. Private chauffeur transfer to your boutique hotel. Enjoy an evening walk through the bohemian artist streets of Montmartre up to Sacré-Cœur Basilica.' },
      { day: 2, title: 'Eiffel Tower & Parisian Landmarks', description: 'Drive down the glamorous Champs-Élysées to the Arc de Triomphe. Ascend the world-famous Eiffel Tower for sweeping panoramas across Paris. Afternoon stroll in the Tuileries Garden.' },
      { day: 3, title: 'Louvre Art & Romantic Seine Cruise', description: 'Skip the line at the world’s largest art museum, the Louvre, to admire Leonardo da Vinci’s Mona Lisa. In the evening, embark on a glass-canopied Seine River boat for dinner under the illuminated bridges.' },
      { day: 4, title: 'Royal Palace of Versailles', description: 'Visit the opulent 17th-century Palace of Versailles. Walk through the glittering Hall of Mirrors, the King’s Grand Apartments, and the expansive landscaped fountains.' },
      { day: 5, title: 'Culture & World-Class Shopping', description: 'Explore the historic Latin Quarter and Saint-Germain-des-Prés. Indulge in designer shopping under the iconic glass dome of Galeries Lafayette.' },
      { day: 6, title: 'Disneyland Paris or Free Exploration', description: 'Enjoy a magical day at Disneyland Paris Park or spend a relaxed day visiting Musée d’Orsay and taking a café break along the River Seine.' },
      { day: 7, title: 'Au Revoir Paris', description: 'Savor your final café au lait and fresh croissants before private transfer to the airport.' }
    ]
  },
  {
    id: 'pkg-belgium-medieval-gems',
    title: 'Belgium Fairy-Tale Bruges, Ghent & Brussels Heritage',
    destination: 'Belgium',
    category: 'international',
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '4 Nights in Charming 4-Star City Center Hotel with Breakfast',
      'Brussels Grand Place walking tour, Manneken Pis & Atomium visit',
      'Full-Day Excursion to Fairy-Tale Bruges with romantic Canal Boat Cruise',
      'Ghent Medieval Castle of the Counts and Saint Bavo Cathedral',
      'Authentic Belgian Chocolate-making masterclass & Waffle tasting'
    ],
    inclusions: ['4-Star Hotel', 'Daily Breakfast', 'Bruges Canal Cruise', 'Ghent Excursion', 'Chocolate Workshop', 'All Transfers'],
    exclusions: ['Airfare', 'Schengen Visa', 'Meals not specified', 'Personal Expenses'],
    bestFor: 'Couples, History Enthusiasts & Foodies',
    featured: false,
    itinerarySummary: [
      'Day 1: Arrival at Brussels Airport, private transfer to hotel & Grand Place evening illumination',
      'Day 2: Brussels city tour: Atomium, Royal Palace, Saint Michael Cathedral & chocolate tasting',
      'Day 3: Full-Day romantic excursion to medieval Bruges: Canal cruise, Belfry Tower & Market Square',
      'Day 4: Ghent historic day tour: Gravensteen Castle, Saint Bavo Cathedral & Graslei waterfront',
      'Day 5: Belgian waffle brunch, souvenir shopping & airport departure transfer'
    ]
  },
  {
    id: 'pkg-netherlands-canals-windmills',
    title: 'Amsterdam Canals, Zaanse Schans Windmills & Dutch Delights',
    destination: 'Netherlands',
    category: 'international',
    duration: '5 Nights / 6 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '5 Nights in 4-Star Central Amsterdam Hotel with Daily Breakfast',
      'Amsterdam 1-Hour Luxury Canal Cruise through UNESCO waterways',
      'Zaanse Schans Windmills, Clog-making demonstration & Cheese tasting tour',
      'Keukenhof Tulip Gardens tour (in spring) OR Giethoorn Water Village day trip',
      'Rijksmuseum & Van Gogh Museum entry with Dam Square walking tour'
    ],
    inclusions: ['4-Star Amsterdam Hotel', 'Daily Breakfast', 'Canal Cruise', 'Zaanse Schans Tour', 'Keukenhof / Giethoorn Excursion', 'Museum Entry', 'Transfers'],
    exclusions: ['International Flights', 'Visa Processing Fees', 'Personal Expenses'],
    bestFor: 'Families, Nature Lovers & Photographers',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival at Amsterdam Schiphol Airport, private hotel transfer & Dam Square walking orientation',
      'Day 2: Amsterdam Glass-Topped Canal Cruise, Rijksmuseum & vibrant Jordaan neighborhood',
      'Day 3: Half-Day tour to Zaanse Schans authentic windmills, cheese farm & Volendam fishing village',
      'Day 4: Full-Day excursion to fairy-tale Giethoorn (the Venice of the North) with electric boat ride',
      'Day 5: Van Gogh Museum, Vondelpark bicycle tour & shopping at Nine Streets (De Negen Straatjes)',
      'Day 6: Dutch pancake breakfast, flower market souvenir shopping & airport transfer'
    ],
    dayWiseItinerary: [
      { day: 1, title: 'Arrival in Amsterdam', description: 'Arrive at Amsterdam Airport Schiphol. Private vehicle transfer to your central hotel. Spend the evening exploring the vibrant streets surrounding Dam Square and the historic Royal Palace.' },
      { day: 2, title: 'UNESCO Canals & Rijksmuseum', description: 'Board a glass-roof canal cruiser to glide past 17th-century merchant houses and picturesque stone bridges. Visit the renowned Rijksmuseum to view Rembrandt’s Night Watch.' },
      { day: 3, title: 'Historic Windmills & Cheese Country', description: 'Travel to Zaanse Schans open-air conservation area to see operating historic windmills, attend a traditional Dutch wooden clog-carving show, and taste artisan Gouda cheese.' },
      { day: 4, title: 'Giethoorn Village or Keukenhof Tulips', description: 'In springtime, wander the millions of blooming tulips at world-famous Keukenhof. In other seasons, visit car-free Giethoorn village to captain your own whisper boat through peaceful canals.' },
      { day: 5, title: 'Van Gogh Museum & Vondelpark', description: 'Admire the world’s largest collection of Vincent van Gogh paintings. Rent a classic Dutch bicycle to ride through scenic Vondelpark, followed by shopping in the Nine Streets.' },
      { day: 6, title: 'Departure from Amsterdam', description: 'Enjoy an authentic Dutch pancake breakfast before your private transfer to Schiphol Airport for your return flight.' }
    ]
  },
  {
    id: 'pkg-germany-castles-bavaria',
    title: 'Bavarian Fairytale Castles, Munich & Berlin Highlights',
    destination: 'Germany',
    category: 'international',
    duration: '6 Nights / 7 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '3 Nights Munich + 3 Nights Berlin in 4-Star Central Hotels',
      'Full-Day Excursion to Fairytale Neuschwanstein Castle in the Bavarian Alps',
      'Munich City Tour: Marienplatz Glockenspiel, BMW Welt & English Garden',
      'Scenic ICE High-Speed Train from Munich to Berlin',
      'Berlin Wall East Side Gallery, Brandenburg Gate & Reichstag Dome Tour'
    ],
    inclusions: ['4-Star Hotels', 'Daily Breakfast', 'Neuschwanstein Castle Tour', 'Munich City Tour', 'High-Speed ICE Train', 'Berlin Highlights Tour', 'Transfers'],
    exclusions: ['Airfare', 'Schengen Visa Fees', 'Lunches & Dinners', 'Personal Expenses'],
    bestFor: 'Couples, History Enthusiasts & Culture Travelers',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival in Munich, Bavaria, private hotel transfer & evening dinner in historic beer hall',
      'Day 2: Munich Highlights: Marienplatz Glockenspiel, Nymphenburg Palace & BMW Welt museum',
      'Day 3: Full-Day Alpine tour to Neuschwanstein Castle (the inspiration for Disney’s Castle)',
      'Day 4: High-Speed ICE Train journey through German heartland to Berlin & Checkpoint Charlie',
      'Day 5: Berlin City Tour: Brandenburg Gate, Berlin Wall East Side Gallery & Reichstag Glass Dome',
      'Day 6: Day trip to Royal Potsdam Sanssouci Palace OR Berlin Museum Island exploration',
      'Day 7: German breakfast, Kurfürstendamm shopping & airport departure transfer'
    ],
    dayWiseItinerary: [
      { day: 1, title: 'Welcome to Munich, Bavaria', description: 'Arrive at Munich Franz Josef Strauss Airport. Private transfer to your hotel. Stroll through the Old Town and enjoy authentic Bavarian hospitality.' },
      { day: 2, title: 'Munich Landmarks & BMW World', description: 'Watch the famous Glockenspiel chime at Marienplatz, visit the sprawling English Garden, and explore futuristic automotive design at BMW Welt.' },
      { day: 3, title: 'Fairytale Neuschwanstein Castle', description: 'Travel through the picturesque Bavarian Alps to visit King Ludwig II’s dream castle, Neuschwanstein, perched high above dramatic mountain gorges.' },
      { day: 4, title: 'High-Speed Train to Berlin', description: 'Board the German ICE bullet train to Berlin. Check in and visit Checkpoint Charlie and the poignant Holocaust Memorial.' },
      { day: 5, title: 'Berlin Wall & Brandenburg Gate', description: 'Walk through the iconic Brandenburg Gate, photograph colorful murals on the Berlin Wall East Side Gallery, and ascend the glass dome of the Reichstag building.' },
      { day: 6, title: 'Royal Potsdam or Museum Island', description: 'Visit the Prussian rococo palaces and terraced gardens of Sanssouci in Potsdam, or explore the UNESCO-listed treasure trove of Museum Island.' },
      { day: 7, title: 'Departure from Berlin', description: 'Enjoy breakfast and last-minute shopping along Kurfürstendamm before your private transfer to Berlin Brandenburg Airport.' }
    ]
  },
  {
    id: 'pkg-switzerland-alps-titlis-jungfrau',
    title: 'Majestic Swiss Alps, Mount Titlis & Jungfraujoch Top of Europe',
    destination: 'Switzerland',
    category: 'international',
    duration: '6 Nights / 7 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '3 Nights Lucerne / Engelberg + 3 Nights Interlaken in 4-Star Alpine Hotels',
      'Mount Titlis Revolving Rotair Cable Car, Ice Flyer & Cliff Walk Suspension Bridge',
      'Jungfraujoch Top of Europe Cogwheel Mountain Train & Sphinx Observatory',
      'Scenic Lake Lucerne Cruise & Chapel Bridge Historic Old Town Walk',
      'Swiss Travel Pass / Private Vehicle Transfers included'
    ],
    inclusions: ['4-Star Alpine Hotels', 'Daily Buffet Breakfast', 'Mount Titlis Excursion Ticket', 'Jungfraujoch Top of Europe Pass', 'Lake Lucerne Cruise', 'All Rail / Road Transfers'],
    exclusions: ['International Flights', 'Swiss Visa Fees', 'Meals not specified', 'Adventure Sports (Paragliding)'],
    bestFor: 'Couples, Honeymooners, Families & Snow Lovers',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival at Zurich Airport, scenic transfer to Lucerne & Lake Lucerne evening walk',
      'Day 2: Mount Titlis excursion: Revolving Cable Car, Ice Cave, Cliff Walk & Glacier Park',
      'Day 3: Lucerne Chapel Bridge, Lion Monument & scenic train to Alpine Interlaken',
      'Day 4: Spectacular Jungfraujoch Top of Europe (3,454m) Ice Palace & Sphinx Observatory',
      'Day 5: Interlaken adventure day: Lake Brienz boat cruise, Lauterbrunnen Valley & waterfalls',
      'Day 6: Panoramic Swiss Rail journey to Zurich, Bahnhofstrasse shopping & Lake Zurich cruise',
      'Day 7: Swiss breakfast, Swiss chocolates shopping & airport departure transfer'
    ],
    dayWiseItinerary: [
      { day: 1, title: 'Arrival in Zurich & Transfer to Lucerne', description: 'Arrive at Zurich Airport. Enjoy a scenic journey along Lake Zurich to picturesque Lucerne. Check in and take an evening stroll across the 14th-century wooden Chapel Bridge.' },
      { day: 2, title: 'Mount Titlis Rotating Cable Car & Glaciers', description: 'Ascend to Engelberg and board the world’s first revolving cable car, the Titlis Rotair, to 3,020 meters. Experience the Titlis Cliff Walk suspension bridge, Glacier Cave, and snow fun.' },
      { day: 3, title: 'Lucerne to Alpine Interlaken', description: 'Enjoy a scenic morning boat cruise across Lake Lucerne. Travel over the Brünig Pass to Interlaken, nestled between Lake Thun and Lake Brienz.' },
      { day: 4, title: 'Jungfraujoch Top of Europe (3,454m)', description: 'Board the famous Eiger Express tri-cable gondola and cogwheel railway to Jungfraujoch, the highest railway station in Europe. Visit the magical Ice Palace and Sphinx Observation Terrace.' },
      { day: 5, title: 'Lauterbrunnen Valley of 72 Waterfalls', description: 'Visit postcard-perfect Lauterbrunnen valley with cascading Staubbach Falls and Trümmelbach glacial waterfalls, followed by a turquoise Lake Brienz boat cruise.' },
      { day: 6, title: 'Zurich City & Swiss Chocolates', description: 'Travel to cosmopolitan Zurich. Stroll down world-renowned Bahnhofstrasse for luxury watch and Swiss chocolate shopping.' },
      { day: 7, title: 'Departure from Zurich', description: 'Enjoy your final Swiss alpine breakfast before transfer to Zurich Airport for your flight back home.' }
    ]
  },
  {
    id: 'pkg-italy-rome-venice-florence',
    title: 'Classic Italy: Rome Colosseum, Venice Gondola & Florence Art',
    destination: 'Italy',
    category: 'international',
    duration: '7 Nights / 8 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '3 Nights Rome + 2 Nights Florence + 2 Nights Venice in 4-Star Central Hotels',
      'Skip-the-line Guided Tour of the Colosseum, Roman Forum & Palatine Hill',
      'Venice Grand Canal private Gondola ride & St. Mark’s Square tour',
      'Florence Renaissance walking tour with Duomo & Ponte Vecchio',
      'High-Speed Frecciarossa Trains between Rome, Florence & Venice'
    ],
    inclusions: ['4-Star Hotels', 'Daily Breakfast', 'Colosseum Tour Pass', 'Venice Gondola Ride', 'Florence City Tour', 'Frecciarossa Train Tickets', 'Transfers'],
    exclusions: ['Airfare', 'Schengen Visa Fees', 'City Tourist Taxes (payable at hotel)', 'Personal Expenses'],
    bestFor: 'Couples, Families, Culture & Food Enthusiasts',
    featured: true,
    itinerarySummary: [
      'Day 1: Arrival at Rome Fiumicino Airport, private transfer to hotel & evening Trevi Fountain walk',
      'Day 2: Ancient Rome: Colosseum, Roman Forum, Palatine Hill & Piazza Navona',
      'Day 3: Vatican City: St. Peter’s Basilica, Sistine Chapel & Vatican Museums',
      'Day 4: High-speed train to Florence, Duomo Cathedral & sunset from Piazzale Michelangelo',
      'Day 5: Florence Uffizi Gallery & afternoon day trip to Leaning Tower of Pisa',
      'Day 6: High-speed train to Venice, private water taxi & traditional Gondola cruise',
      'Day 7: St. Mark’s Basilica, Doge’s Palace & colorful Murano and Burano islands tour',
      'Day 8: Italian cappuccino breakfast & water taxi transfer to Venice Marco Polo Airport'
    ],
    dayWiseItinerary: [
      { day: 1, title: 'Benvenuti a Roma', description: 'Arrive at Rome Fiumicino Airport. Private transfer to your central hotel. In the evening, walk to the iconic Trevi Fountain and toss a coin to ensure your return to Rome.' },
      { day: 2, title: 'Ancient Colosseum & Roman Forum', description: 'Step back in time with a skip-the-line guided tour inside the Colosseum and Roman Forum. Visit the Pantheon and lively Piazza Navona with its famous Bernini fountains.' },
      { day: 3, title: 'Vatican City & St. Peter’s Basilica', description: 'Explore the Vatican Museums, marvel at Michelangelo’s ceiling frescoes in the Sistine Chapel, and tour the monumental interior of St. Peter’s Basilica.' },
      { day: 4, title: 'High-Speed Train to Florence', description: 'Board the fast Frecciarossa train to Florence, the cradle of the Renaissance. Visit the Cathedral of Santa Maria del Fiore (Duomo) and historic Ponte Vecchio bridge.' },
      { day: 5, title: 'Leaning Tower of Pisa Excursion', description: 'Enjoy a scenic half-day excursion to Pisa to photograph and climb the world-famous Leaning Tower in the Square of Miracles.' },
      { day: 6, title: 'Romantic Venice & Gondola Ride', description: 'Train to Venice Santa Lucia station and transfer by water taxi. Board an authentic Venetian gondola to glide through peaceful side canals and the Grand Canal.' },
      { day: 7, title: 'St. Mark’s Square & Murano Glass', description: 'Tour St. Mark’s Basilica and Doge’s Palace. Afternoon boat trip to Murano to witness a live glassblowing demonstration and the colorful lace houses of Burano.' },
      { day: 8, title: 'Arrivederci Italia', description: 'Enjoy a final Italian espresso before your water transfer to Venice Marco Polo Airport.' }
    ]
  },
  {
    id: 'pkg-vatican-city-masterpieces',
    title: 'Vatican City Sistine Chapel, St. Peter’s & Papal Treasures',
    destination: 'Vatican City',
    category: 'international',
    duration: '3 Nights / 4 Days',
    startingPrice: '',
    image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '3 Nights in Luxury Boutique Hotel near the Vatican with Breakfast',
      'VIP Early-Access Skip-the-Line Vatican Museums & Sistine Chapel Tour',
      'St. Peter’s Basilica Guided Tour with Dome Climb for 360° Rome Panorama',
      'Vatican Gardens Private Guided Eco-Bus Tour',
      'All Private Airport & Sightseeing Transfers in Executive Vehicle'
    ],
    inclusions: ['4-Star Hotel near Vatican', 'Daily Breakfast', 'VIP Vatican Museums & Sistine Chapel Pass', 'St. Peter’s Dome Climb', 'Vatican Gardens Tour', 'Executive Transfers'],
    exclusions: ['Airfare', 'Schengen Visa', 'Meals not specified', 'Personal Expenses'],
    bestFor: 'Art Enthusiasts, Pilgrims & Cultural Connoisseurs',
    featured: false,
    itinerarySummary: [
      'Day 1: Arrival in Rome, private chauffeur transfer to hotel near Vatican & evening St. Peter’s Square walk',
      'Day 2: VIP Early-Access Vatican Museums: Gallery of Maps, Raphael Rooms & Michelangelo’s Sistine Chapel',
      'Day 3: St. Peter’s Basilica Interior, Papal Tombs & Dome Climb for breathtaking city views',
      'Day 4: Castel Sant’Angelo fortress walk, religious souvenir blessing & airport transfer'
    ],
    dayWiseItinerary: [
      { day: 1, title: 'Arrival & St. Peter’s Colonnade', description: 'Arrive in Rome and transfer to your elegant hotel within walking distance of the Vatican walls. Evening stroll through Bernini’s sweeping colonnade at St. Peter’s Square.' },
      { day: 2, title: 'Vatican Museums & Sistine Chapel', description: 'Enjoy privileged early entrance to the Vatican Museums before public opening hours. Marvel at classical sculptures, the Tapestry Gallery, Raphael Rooms, and Michelangelo’s masterpiece The Creation of Adam on the Sistine Chapel ceiling.' },
      { day: 3, title: 'St. Peter’s Basilica & Dome Climb', description: 'Guided exploration inside the largest church in Christendom to see Michelangelo’s Pietà. Ascend to the top of Michelangelo’s Dome for spectacular vistas stretching across Rome.' },
      { day: 4, title: 'Castel Sant’Angelo & Departure', description: 'Walk across the Bridge of Angels to Castel Sant’Angelo, the ancient fortress of the Popes, before executive transfer to Rome Airport for your flight home.' }
    ]
  }
];

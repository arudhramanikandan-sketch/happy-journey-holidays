import { Destination, HolidayPackage } from '../types';

export const ALL_DOMESTIC_DESTINATIONS: Destination[] = [
  {
    id: 'kerala',
    name: 'Kerala',
    country: 'India (South)',
    category: 'domestic',
    tagline: 'God’s Own Country — Backwaters, Tea Slopes & Spice Trails',
    description: 'Cruise tranquil backwaters in a private Alleppey houseboat, breathe fresh mountain air in misty Munnar tea hills, and explore Periyar spice plantations in Thekkady.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Deluxe Alleppey Houseboat Cruise with Traditional Kerala Meals',
      'Eravikulam National Park Nilgiri Tahr Mountain Goat Safari',
      'Thekkady Spice Plantation Guided Walk & Elephant Camp',
      'Cheeyappara & Valara Scenic Waterfalls on Munnar Ghat Road'
    ],
    bestTimeToVisit: 'September to March (Monsoon: June-August)',
    highlights: ['Alleppey Houseboat', 'Munnar Tea Gardens', 'Thekkady Spices', 'Cochin Heritage'],
    featured: true
  },
  {
    id: 'munnar',
    name: 'Munnar',
    country: 'India (Kerala)',
    category: 'domestic',
    tagline: 'Rolling Tea Estates, Misty Valleys & Cold Waterfalls',
    description: 'A quick scenic drive from Coimbatore! Escape into endless velvet green tea slopes, cool misty mornings, Mattupetty dam, Kundala lake, and Top Station viewpoints.',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '2 Nights / 3 Days',
    popularExperiences: [
      'Tata Tea Museum Visit & Live Tea Processing Demonstration',
      'Eravikulam National Park (Rajamalai) Safari',
      'Mattupetty Dam Speedboating & Echo Point Call',
      'Kundala Dam Pedal Boating & Top Station Panoramic View'
    ],
    bestTimeToVisit: 'September to May',
    highlights: ['Tea Gardens', 'Mattupetty Dam', 'Top Station', 'Eravikulam Park'],
    featured: true
  },
  {
    id: 'ooty',
    name: 'Ooty & Coonoor',
    country: 'India (Tamil Nadu)',
    category: 'domestic',
    tagline: 'Queen of Hill Stations — Nilgiri Toy Train & Pine Forests',
    description: 'Coimbatore’s favorite hill station. Enjoy the UNESCO World Heritage Nilgiri Mountain Toy Train, Botanical Gardens, Pykara Lake boat ride, and fresh homemade chocolates.',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '2 Nights / 3 Days',
    popularExperiences: [
      'UNESCO Heritage Nilgiri Mountain Toy Train Ride',
      'Government Botanical Garden & Rose Garden Visit',
      'Pykara Lake Speedboating & Pykara Waterfalls',
      'Coonoor Sim’s Park, Dolphin’s Nose & Tea Factory'
    ],
    bestTimeToVisit: 'October to June',
    highlights: ['Toy Train', 'Botanical Garden', 'Pykara Lake', 'Doddabetta Peak', 'Coonoor'],
    featured: true
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal',
    country: 'India (Tamil Nadu)',
    category: 'domestic',
    tagline: 'Princess of Hill Stations — Mist, Star Lake & Pine Woods',
    description: 'Stroll through dense pine forest trails, cycle around the star-shaped Kodai lake, gaze down the precipice at Pillar Rocks, and enjoy cool mountain breezes.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '2 Nights / 3 Days',
    popularExperiences: [
      'Boating & Cycling around Star-Shaped Kodai Lake',
      'Coaker’s Walk Cliff View & Pillar Rocks Gorges',
      'Pine Forest Walk, Guna Caves & Moir Point',
      'Silver Cascade & Bear Shola Waterfalls'
    ],
    bestTimeToVisit: 'September to May',
    highlights: ['Kodai Lake', 'Pillar Rocks', 'Coaker’s Walk', 'Pine Forest'],
    featured: true
  },
  {
    id: 'coorg-wayanad',
    name: 'Coorg & Wayanad',
    country: 'India (Karnataka & Kerala)',
    category: 'domestic',
    tagline: 'Coffee Plantations, Misty Peaks & Wildlife Sanctuaries',
    description: 'Immerse in the Scotland of India (Coorg) with fragrant coffee estates and Abbey Falls, paired with Wayanad’s Banasura Sagar dam and ancient Edakkal caves.',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '3 Nights / 4 Days',
    popularExperiences: [
      'Dubare Elephant Camp River Bathing & Interaction in Coorg',
      'Abbey Falls & Raja’s Seat Sunset Viewpoint in Madikeri',
      'Banasura Sagar Dam (Largest Earthen Dam in India) Speedboating',
      'Ancient Neolithic Rock Carvings at Edakkal Caves in Wayanad'
    ],
    bestTimeToVisit: 'October to May',
    highlights: ['Abbey Falls', 'Dubare Elephant Camp', 'Banasura Dam', 'Edakkal Caves', 'Coffee Trails'],
    featured: true
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    country: 'India (North)',
    category: 'domestic',
    tagline: 'Paradise on Earth — Dal Lake Houseboat, Gulmarg Snow & Pahalgam',
    description: 'Stay on a romantic cedar-wood houseboat on Dal Lake, ride the world’s highest Gondola cable car in Gulmarg snow, and explore the Lidder river valley in Pahalgam.',
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Shikara Boat Ride on Dal Lake & Luxury Houseboat Stay',
      'Gulmarg Gondola Cable Car Ride to Phase 1 (Kongdoori) & Phase 2 (Apharwat)',
      'Pahalgam Valley of Shepherds, Betaab Valley & Aru Valley Tour',
      'Mughal Gardens (Shalimar, Nishat Bagh & Chashme Shahi) in Srinagar'
    ],
    bestTimeToVisit: 'All Year Round (Snow: Dec-Feb, Spring & Tulip: Mar-May, Greenery: Jun-Oct)',
    highlights: ['Dal Lake Shikara', 'Gulmarg Gondola', 'Pahalgam Valley', 'Mughal Gardens', 'Sonmarg Glacier'],
    featured: true
  },
  {
    id: 'himachal',
    name: 'Himachal Pradesh',
    country: 'India (North)',
    category: 'domestic',
    tagline: 'Snow Peaks, Solang Valley Adventure & Pine Forests',
    description: 'Discover the colonial charm of Shimla Mall Road, thrilling snow sports in Solang Valley, Rohtang Pass, apple orchards of Manali, and white water rafting in Kullu.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Solang Valley Paragliding, Zorbing & Snow Quad Biking',
      'Rohtang Pass Snow Point & Atal Tunnel Scenic Drive',
      'Shimla Ridge, Mall Road, Christ Church & Kufri Adventure Park',
      'Hadimba Temple, Vashisht Hot Springs & Old Manali Cafes'
    ],
    bestTimeToVisit: 'March to June (Pleasant) & December to February (Snowfall)',
    highlights: ['Shimla Mall Road', 'Kufri', 'Solang Valley', 'Rohtang Pass', 'Hadimba Temple'],
    featured: true
  },
  {
    id: 'ladakh',
    name: 'Leh Ladakh',
    country: 'India (Himalayas)',
    category: 'domestic',
    tagline: 'Land of High Passes, Blue Pangong Lake & Nubra Sand Dunes',
    description: 'A breathtaking high-altitude Himalayan adventure. Gaze at the azure Pangong Tso lake, ride double-humped camels in Nubra desert, and cross Khardung La pass.',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Pangong Tso Color-Changing High Altitude Lake Camp Stay',
      'Khardung La Pass (World’s Highest Motorable Pass at 17,982 ft)',
      'Nubra Valley Hunder White Sand Dunes & Double-Humped Bactrian Camel Ride',
      'Magnetic Hill Anti-Gravity Phenomenon & Sangam River Confluence'
    ],
    bestTimeToVisit: 'May to September',
    highlights: ['Pangong Lake', 'Nubra Valley', 'Khardung La', 'Magnetic Hill', 'Thiksey Monastery'],
    featured: true
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    country: 'India (North West)',
    category: 'domestic',
    tagline: 'Land of Maharajas — Forts, Palaces & Thar Desert Camps',
    description: 'Experience regal royalty with Jaipur’s Amber Fort and Hawa Mahal, romantic Lake Pichola boat ride in Udaipur, and starry night camps in Jaisalmer sand dunes.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Amber Fort Jeep Ride, City Palace & Hawa Mahal in Pink City Jaipur',
      'Lake Pichola Sunset Boat Ride overlooking Udaipur City Palace',
      'Thar Desert Sam Sand Dunes Camel Safari & Rajasthani Folk Camp',
      'Mehrangarh Fort & Blue City Heritage Walk in Jodhpur'
    ],
    bestTimeToVisit: 'October to March',
    highlights: ['Jaipur Pink City', 'Udaipur Lake Pichola', 'Jaisalmer Desert Dunes', 'Jodhpur Blue City'],
    featured: true
  },
  {
    id: 'goa',
    name: 'Goa',
    country: 'India (West Coast)',
    category: 'domestic',
    tagline: 'Sun-Kissed Beaches, Portuguese Forts & Mandovi Cruise',
    description: 'Relax along Calangute and Baga beaches, explore historic Portuguese churches of Old Goa, experience Mandovi river sunset cruises, and relish fresh coastal cuisine.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '3 Nights / 4 Days',
    popularExperiences: [
      'North Goa Beach Circuit: Baga, Calangute & Anjuna Beaches',
      'Historic Aguada Fort & Old Goa Basilica of Bom Jesus',
      'Mandovi River Luxury Sunset Cruise with Live Goan Music & Dance',
      'Dudhsagar Waterfalls Jungle Jeep Safari & Spice Plantation Tour'
    ],
    bestTimeToVisit: 'October to May',
    highlights: ['Baga Beach', 'Aguada Fort', 'Mandovi Sunset Cruise', 'Old Goa Churches', 'Dudhsagar'],
    featured: true
  },
  {
    id: 'andaman',
    name: 'Andaman Islands',
    country: 'India (Bay of Bengal)',
    category: 'domestic',
    tagline: 'Turquoise Waters, Coral Reefs & Radhanagar White Sands',
    description: 'Cruise on high-speed catamarans to Havelock Island, walk on Asia’s best Radhanagar Beach, try scuba diving at Elephant Beach, and visit historic Cellular Jail.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Radhanagar Beach (Asia’s Best Beach) Sunset Stroll on Havelock Island',
      'Scuba Diving / Sea Walk at Elephant Beach with Colorful Live Corals',
      'Cellular Jail Light and Sound Show in Port Blair',
      'Makruzz / Nautika High-Speed Luxury Catamaran Cruise Transfers'
    ],
    bestTimeToVisit: 'October to May',
    highlights: ['Havelock Island', 'Radhanagar Beach', 'Elephant Beach Scuba', 'Cellular Jail', 'Neil Island'],
    featured: true
  },
  {
    id: 'tamilnadu-spiritual',
    name: 'Rameshwaram, Madurai & Kanyakumari',
    country: 'India (Tamil Nadu)',
    category: 'domestic',
    tagline: 'Sacred Temples, Pamban Bridge & Triveni Sangam Sunset',
    description: 'A timeless heritage and spiritual journey from Coimbatore. Marvel at Madurai Meenakshi Temple, bathe in the 22 holy wells of Rameshwaram, and see the Vivekananda Rock at India’s southernmost tip.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '3 Nights / 4 Days',
    popularExperiences: [
      'Madurai Meenakshi Amman Temple 1000-Pillar Hall Darshan',
      'Rameshwaram Ramanathaswamy Temple 22 Holy Theerthams Bathing',
      'Pamban Sea Bridge Drive & Ghost Town of Dhanushkodi (Arichal Munai)',
      'Kanyakumari Vivekananda Rock Memorial Ferry & Triveni Sangam Sunset'
    ],
    bestTimeToVisit: 'October to March',
    highlights: ['Meenakshi Temple', 'Rameshwaram 22 Wells', 'Dhanushkodi', 'Pamban Bridge', 'Vivekananda Rock'],
    featured: true
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    country: 'India (Himalayas)',
    category: 'domestic',
    tagline: 'Ganga Aarti, Misty Nainital Lakes & Mussoorie Hills',
    description: 'Experience the spiritual energy of Rishikesh Ganga Aarti and river rafting, cruise serene emerald lakes in Nainital, and walk the historic Mall Road in Queen of Hills Mussoorie.',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443b747?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Rishikesh Triveni Ghat Evening Ganga Aarti & White Water River Rafting',
      'Nainital Naini Lake Boating, Naina Devi Temple & Snow View Point Cable Car',
      'Mussoorie Kempty Falls, Gun Hill Ropeway & Camel’s Back Road Walk',
      'Haridwar Har Ki Pauri Holy Dip & Mansa Devi Temple Ropeway'
    ],
    bestTimeToVisit: 'March to June & September to November',
    highlights: ['Rishikesh Ganga Aarti', 'Nainital Lake Boating', 'Mussoorie Kempty Falls', 'Haridwar'],
    featured: false
  },
  {
    id: 'sikkim-darjeeling',
    name: 'Sikkim & Darjeeling',
    country: 'India (North East)',
    category: 'domestic',
    tagline: 'Kanchenjunga Sunrise, Himalayan Toy Train & Tsomgo Lake',
    description: 'Witness golden sunrise over Mt. Kanchenjunga from Tiger Hill in Darjeeling, ride the heritage DHR Toy Train, and visit crystal Tsomgo Lake and Baba Mandir in Gangtok.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Tiger Hill Early Morning Sunrise over Mt. Kanchenjunga Peaks',
      'UNESCO Heritage Darjeeling Himalayan Railway Joy Ride',
      'Glacial Tsomgo Lake (12,310 ft) & Historic Baba Harbhajan Singh Mandir',
      'Rumtek Monastery & Gangtok Ropeway Cable Car Ride'
    ],
    bestTimeToVisit: 'March to May & October to December',
    highlights: ['Tiger Hill Sunrise', 'Darjeeling Toy Train', 'Tsomgo Lake', 'Gangtok Monasteries'],
    featured: false
  }
];

export const ALL_DOMESTIC_PACKAGES: HolidayPackage[] = [
  // ==========================================
  // KERALA PACKAGES
  // ==========================================
  {
    id: 'pkg-kerala-munnar-alleppey',
    title: 'Kerala Charms: Munnar Hills & Alleppey Houseboat',
    destination: 'Kerala',
    category: 'domestic',
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    days: 5,
    nights: 4,
    shortDescription: 'Cruise tranquil backwaters in a traditional Alleppey houseboat, stroll through fragrant spice plantations in Thekkady, and relax in Munnar misty tea gardens.',
    fullDescription: 'Our most sought-after Kerala vacation starting directly from Coimbatore or Cochin. Travel in a dedicated private AC cab through Munnar tea gardens, Mattupetty dam, and Eravikulam National Park, visit Periyar Wildlife Sanctuary in Thekkady, and spend a night on an exclusive Deluxe houseboat in Alleppey backwaters with all authentic Kerala meals prepared by your personal onboard chef.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Direct Doorstep Pickup from Coimbatore / Cochin in AC Cab',
      '2 Nights Misty Munnar + 1 Night Thekkady + 1 Night Alleppey Houseboat',
      'Exclusive Deluxe Houseboat Stay with Authentic All-Meal Plan',
      'Mattupetty Dam, Tea Gardens & Eravikulam National Park Safari',
      'Spice Plantation Walk & Elephant Camp Option'
    ],
    inclusions: [
      '2 Nights Accommodation in 3/4-Star Munnar Hill Resort with Breakfast',
      '1 Night in Thekkady Premium Jungle Resort with Breakfast',
      '1 Night Exclusive Deluxe Alleppey Houseboat (Lunch, Evening Tea, Dinner, Breakfast)',
      'Dedicated AC Sedan / Innova from Coimbatore / Cochin for all 5 Days',
      'Driver allowances, toll gates, interstate permits & parking fees'
    ],
    exclusions: [
      'Entry tickets to monuments, museums, and national parks',
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
    bookingInformation: 'Houseboat AC operates from 9:00 PM to 6:00 AM (Full-time AC available on premium upgrade). Perfect for families, honeymooners and groups.',
    bestFor: 'Coimbatore Locals, Families & Couples',
    featured: true
  },
  {
    id: 'pkg-kerala-grand-panorama',
    title: 'Grand Kerala: Munnar, Thekkady, Houseboat & Kovalam Beach',
    destination: 'Kerala',
    category: 'domestic',
    duration: '6 Nights / 7 Days',
    startingPrice: '',
    days: 7,
    nights: 6,
    shortDescription: 'The complete Kerala experience spanning Munnar misty heights, Thekkady wildlife, Alleppey backwaters, and sun-kissed Kovalam lighthouse beach.',
    fullDescription: 'Experience the ultimate God’s Own Country tour. Journey through lush tea estates of Munnar, wildlife spice reserves of Thekkady, sleep on a private Alleppey houseboat, and conclude with two relaxing nights at Kovalam Beach and Trivandrum Padmanabhaswamy Temple.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      '2N Munnar + 1N Thekkady + 1N Houseboat + 2N Kovalam Beach',
      'Exclusive Deluxe Alleppey Houseboat with full authentic meals',
      'Kovalam Lighthouse Beach, Samudra Beach & Sunset Walks',
      'Visit Sri Padmanabhaswamy Temple in Trivandrum',
      'Private AC Cab from Coimbatore/Cochin with return drop'
    ],
    inclusions: [
      '6 Nights Accommodation in handpicked 3/4-Star Hotels & Resorts',
      'Daily Buffet Breakfast at all hotels',
      'All Meals on Private Houseboat in Alleppey (Lunch, Dinner, Breakfast)',
      'Dedicated AC Sedan / Innova for the entire 7-day circuit',
      'All driver allowances, tolls, parking and interstate permits'
    ],
    exclusions: [
      'Monument entry tickets and boating passes',
      'Ayurvedic spa treatments and personal expenses',
      'Anything not specified in inclusions'
    ],
    itinerarySummary: [
      'Day 1: Arrival & Transfer to Munnar via Waterfalls',
      'Day 2: Munnar Sightseeing (Eravikulam & Tea Museum)',
      'Day 3: Munnar to Thekkady & Periyar Lake Boat Ride',
      'Day 4: Thekkady to Alleppey Houseboat Backwater Cruise',
      'Day 5: Alleppey to Kovalam Beach via Jatayu Earth Centre',
      'Day 6: Kovalam Beach relaxation & Trivandrum Temple Tour',
      'Day 7: Departure transfer to Trivandrum / Cochin / Coimbatore'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival & Scenic Drive to Munnar',
        description: 'Meet driver and drive to Munnar. Enjoy stops at Cheeyappara and Valara waterfalls. Check in and relax in the cool mountain climate.'
      },
      {
        day: 2,
        title: 'Eravikulam Park & Tea Estates',
        description: 'Explore Eravikulam National Park, Mattupetty Dam, Echo Point, and the Tea Museum with tea tasting.'
      },
      {
        day: 3,
        title: 'Munnar to Thekkady Wildlife Sanctuary',
        description: 'Drive through spice routes to Thekkady. Enjoy Periyar Lake boating to spot wild elephants, deer, and exotic birds.'
      },
      {
        day: 4,
        title: 'Alleppey Backwaters Houseboat',
        description: 'Check in to your private houseboat. Cruise through narrow palm-canopied canals with freshly prepared Kerala cuisine.'
      },
      {
        day: 5,
        title: 'Alleppey to Kovalam via Jatayu Earth Centre',
        description: 'Disembark and drive to Kovalam. Stop at the majestic Jatayu Earth Centre giant sculpture. Check into your beach resort.'
      },
      {
        day: 6,
        title: 'Kovalam Beach & Trivandrum Heritage',
        description: 'Relax at Lighthouse Beach. Afternoon visit to Sri Padmanabhaswamy Temple, Kuthira Malika Palace, and Napier Museum.'
      },
      {
        day: 7,
        title: 'Departure Transfer',
        description: 'Enjoy morning coastal breakfast. Transfer to Trivandrum Airport / Railway station or return drive to Coimbatore.'
      }
    ],
    bookingInformation: 'Customizable pickup points available from Coimbatore, Cochin, Bangalore, or Chennai.',
    bestFor: 'Families, Honeymooners & Leisure Travelers',
    featured: true
  },

  // ==========================================
  // MUNNAR & HILL STATIONS
  // ==========================================
  {
    id: 'pkg-munnar-misty-escape',
    title: 'Munnar Misty Escape: Tea Gardens & Eravikulam Safari',
    destination: 'Munnar',
    category: 'domestic',
    duration: '2 Nights / 3 Days',
    startingPrice: '',
    days: 3,
    nights: 2,
    shortDescription: 'The ultimate quick weekend hill recharge from Coimbatore. Enjoy scenic ghat roads, misty tea plantations, Mattupetty Dam, and Nilgiri Tahr safari.',
    fullDescription: 'Escape the heat with a hassle-free 3-day Munnar holiday starting right at your doorstep in Coimbatore. Stay in a scenic mountain resort, explore vast Tata Tea gardens, enjoy speedboating at Mattupetty, and visit Top Station overlooking the clouds.',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Doorstep AC Cab Pickup & Drop from Coimbatore / Tirupur / Erode',
      '2 Nights Stay in 3/4-Star Munnar Mountain View Resort',
      'Eravikulam National Park Nilgiri Tahr Mountain Goat Safari',
      'Mattupetty Dam Speedboating, Echo Point & Kundala Lake',
      'Tea Museum Visit with Live Tea Processing Demonstration'
    ],
    inclusions: [
      '2 Nights Accommodation with Daily Breakfast',
      'Dedicated AC Cab (Sedan / Innova) for all 3 days',
      'Driver allowances, toll charges, interstate permits & parking',
      'All local sightseeing as per itinerary'
    ],
    exclusions: [
      'Entry tickets and safari jeep passes',
      'Boating fees at Mattupetty / Kundala',
      'Lunches, dinners and personal expenses'
    ],
    itinerarySummary: [
      'Day 1: Coimbatore to Munnar drive via Cheeyappara Falls & Blossom Park',
      'Day 2: Full Day Munnar Sightseeing (Eravikulam, Mattupetty, Echo Point)',
      'Day 3: Tea Museum visit & return drive to Coimbatore'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Coimbatore to Munnar Scenic Drive',
        description: 'Morning pickup from Coimbatore. Scenic drive via Udumalpet / Marayoor or Pollachi. Visit Valara and Cheeyappara waterfalls. Check into your Munnar resort and enjoy cool evening weather.'
      },
      {
        day: 2,
        title: 'Eravikulam Safari, Mattupetty Dam & Echo Point',
        description: 'Morning visit to Eravikulam National Park (Rajamalai). Post-lunch visit to Mattupetty Dam, Echo Point, Kundala Arch Dam, and Top Station viewpoints.'
      },
      {
        day: 3,
        title: 'Tata Tea Museum & Return to Coimbatore',
        description: 'Visit Tata Tea Museum to learn tea history and purchase fresh garden tea. Return drive to Coimbatore with drop at your doorstep.'
      }
    ],
    bookingInformation: 'Direct pickup available from Coimbatore, Pollachi, Tiruppur, Erode, and Salem.',
    bestFor: 'Couples, Families & Weekend Getaways',
    featured: true
  },

  // ==========================================
  // OOTY & COONOOR
  // ==========================================
  {
    id: 'pkg-ooty-nilgiri-highlights',
    title: 'Nilgiri Highlights: Ooty Toy Train, Pykara Lake & Coonoor',
    destination: 'Ooty & Coonoor',
    category: 'domestic',
    duration: '2 Nights / 3 Days',
    startingPrice: '',
    days: 3,
    nights: 2,
    shortDescription: 'Coimbatore’s favorite hill escape. Ride the heritage Nilgiri Toy Train, cruise Pykara lake, walk through botanical gardens, and visit Coonoor tea estates.',
    fullDescription: 'Explore the Queen of Hill Stations with Happy Journey Holidays. Includes private cab transfers from Coimbatore, cozy resort stays, UNESCO Nilgiri Toy Train ticket assistance, Government Botanical Gardens, Doddabetta Peak, Pykara Lake speedboating, and Coonoor Sim’s Park.',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Coimbatore Doorstep Pickup & Return in Private AC Cab',
      '2 Nights Stay in Cozy Hill Resort / Hotel with Breakfast',
      'UNESCO Heritage Nilgiri Mountain Toy Train Experience',
      'Pykara Lake Boating, Pykara Waterfalls & Shooting Spot',
      'Coonoor Sightseeing: Sim’s Park, Tea Factory & Dolphin’s Nose'
    ],
    inclusions: [
      '2 Nights Accommodation in 3-Star / 4-Star Resort',
      'Daily Buffet Breakfast',
      'Dedicated AC Sedan / Innova from Coimbatore for 3 Days',
      'All local sightseeing, toll taxes, parking & driver charges'
    ],
    exclusions: [
      'Entry tickets to botanical gardens, boat house and parks',
      'Toy train railway ticket fare (Assistance provided)',
      'Lunches, dinners, and personal shopping'
    ],
    itinerarySummary: [
      'Day 1: Coimbatore to Ooty via Mettupalayam, Botanical Garden & Ooty Lake',
      'Day 2: Doddabetta Peak, Tea Factory, Pykara Lake & Shooting Spot',
      'Day 3: Coonoor Sim’s Park, Dolphin’s Nose & Return to Coimbatore'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Coimbatore to Ooty & Local Sightseeing',
        description: 'Morning pickup from Coimbatore. Drive up the Nilgiri hills via Mettupalayam and Coonoor ghats. Check in and visit Government Botanical Garden, Rose Garden, and Ooty Boat House.'
      },
      {
        day: 2,
        title: 'Doddabetta, Pykara Lake & Pine Forests',
        description: 'Ascend Doddabetta Peak (highest in Nilgiris). Visit Tea Factory & Chocolate Museum. Afternoon excursion to 9th Mile Shooting Spot, Pykara Lake speedboating and waterfalls.'
      },
      {
        day: 3,
        title: 'Coonoor Day Tour & Return Drop to Coimbatore',
        description: 'Drive to Coonoor. Visit Sim’s Park, Lamb’s Rock, and Dolphin’s Nose viewpoint. Descend back to Coimbatore by evening.'
      }
    ],
    bookingInformation: 'Available every day. Ideal for short family vacations and couple getaways.',
    bestFor: 'Coimbatore Locals, Families & Couples',
    featured: true
  },

  // ==========================================
  // KODAIKANAL
  // ==========================================
  {
    id: 'pkg-kodai-mist-lakes',
    title: 'Kodai Mist & Lakes: Star Lake Boating, Pillar Rocks & Pine Forest',
    destination: 'Kodaikanal',
    category: 'domestic',
    duration: '2 Nights / 3 Days',
    startingPrice: '',
    days: 3,
    nights: 2,
    shortDescription: 'Experience the Princess of Hill Stations. Enjoy cool pine forest nature trails, star lake boating, Pillar Rocks, and Coaker’s Walk cliff views.',
    fullDescription: 'A refreshing 3-day holiday in Kodaikanal. Travel from Coimbatore through scenic Western Ghats. Enjoy pedal boating and cycling around the iconic star-shaped Kodai lake, walk the misty Coaker’s Walk, explore Guna caves and Pillar Rocks, and visit Silver Cascade waterfalls.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Pickup & Drop from Coimbatore in Dedicated AC Vehicle',
      '2 Nights Accommodation in Handpicked Kodaikanal Resort',
      'Boating & Cycling around Star-Shaped Kodai Lake',
      'Pillar Rocks, Guna Caves & Coaker’s Walk Viewpoints',
      'Pine Forest Walk, Bryant Park & Silver Cascade Waterfalls'
    ],
    inclusions: [
      '2 Nights Hotel / Resort Stay with Daily Breakfast',
      'Dedicated AC Sedan / Innova from Coimbatore for 3 days',
      'Driver allowances, toll gates, interstate permits & parking fees',
      'All local sightseeing across Kodaikanal'
    ],
    exclusions: [
      'Entry tickets to parks, caves and boating charges',
      'Lunch, dinners and personal expenses'
    ],
    itinerarySummary: [
      'Day 1: Coimbatore to Kodaikanal drive via Silver Cascade & Kodai Lake',
      'Day 2: Coaker’s Walk, Pillar Rocks, Guna Caves & Pine Forest',
      'Day 3: Bryant Park, Kurinji Andavar Temple & return drive to Coimbatore'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Coimbatore to Kodaikanal Drive',
        description: 'Morning pickup from Coimbatore. Scenic drive up the Palani hills. Stop at Silver Cascade waterfall. Check into your resort and enjoy evening cycling and boating around Kodai Lake.'
      },
      {
        day: 2,
        title: 'Full Day Kodaikanal Exploration',
        description: 'Walk the cliffside Coaker’s Walk, visit Upper Lake View, Green Valley View, Pillar Rocks, Guna Caves, and stroll through the dense towering Pine Forest.'
      },
      {
        day: 3,
        title: 'Bryant Park & Return to Coimbatore',
        description: 'Visit the manicured Bryant Botanical Park and Chettiar Park. Shop for homemade chocolates and eucalyptus oils before a smooth return drive to Coimbatore.'
      }
    ],
    bookingInformation: 'Year-round departure available with doorstep cab options.',
    bestFor: 'Couples, Honeymooners & Friends',
    featured: true
  },

  // ==========================================
  // OOTY & KODAIKANAL COMBO
  // ==========================================
  {
    id: 'pkg-ooty-kodai-weekend',
    title: 'Queen & Princess Hills: Ooty & Kodaikanal 4-Day Tour',
    destination: 'Ooty & Kodaikanal',
    category: 'domestic',
    duration: '3 Nights / 4 Days',
    startingPrice: '',
    days: 4,
    nights: 3,
    shortDescription: 'The ultimate twin hill station holiday combining Ooty and Kodaikanal in one scenic, comfortable road trip from Coimbatore.',
    fullDescription: 'Discover the best of Tamil Nadu’s Western Ghats. Spend 2 nights enjoying Ooty’s botanical gardens, tea factories, and Pykara lake, followed by 1 night in misty Kodaikanal exploring star-shaped Kodai Lake, Pillar Rocks, and pine forests.',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Doorstep Pickup & Drop from Coimbatore in AC Cab',
      '2 Nights Ooty + 1 Night Kodaikanal in Scenic Resorts',
      'Botanical Gardens, Pykara Lake & Doddabetta Viewpoint',
      'Kodai Lake Boating, Pillar Rocks & Pine Forest Walk',
      'Nilgiri Toy Train Booking Guidance & Tea Tasting'
    ],
    inclusions: [
      '3 Nights Hotel Accommodation with Daily Breakfast',
      'Dedicated AC Sedan / Innova for the entire 4-day tour',
      'Driver allowances, toll fees, parking and fuel',
      'All local sightseeing across Ooty, Coonoor and Kodaikanal'
    ],
    exclusions: [
      'Entry tickets, boating fees and toy train tickets',
      'Lunches, dinners, and personal purchases'
    ],
    itinerarySummary: [
      'Day 1: Coimbatore to Ooty drive, Botanical Gardens & Ooty Lake',
      'Day 2: Doddabetta, Tea Factory, Pykara Waterfalls & Shooting Spot',
      'Day 3: Scenic drive from Ooty to Kodaikanal & Kodai Lake Evening',
      'Day 4: Pillar Rocks, Pine Forest & Return drive to Coimbatore'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Coimbatore to Ooty',
        description: 'Morning pickup from Coimbatore. Drive up to Ooty. Visit Government Botanical Garden, Rose Garden, and enjoy boating at Ooty Lake.'
      },
      {
        day: 2,
        title: 'Doddabetta Peak & Pykara Excursion',
        description: 'Visit Doddabetta viewpoint, Tea Museum, 9th Mile Shooting Spot, and Pykara Lake for speedboating and waterfalls.'
      },
      {
        day: 3,
        title: 'Ooty to Kodaikanal Scenic Highway',
        description: 'Scenic descent and drive to Kodaikanal. Check in to your resort and enjoy an evening walk around star-shaped Kodai Lake.'
      },
      {
        day: 4,
        title: 'Kodaikanal Sightseeing & Return to Coimbatore',
        description: 'Visit Coaker’s Walk, Pillar Rocks, Guna Caves, and Pine Forest. Return drive to Coimbatore with drop at your residence.'
      }
    ],
    bookingInformation: 'Ideal for extended weekend breaks and family holidays.',
    bestFor: 'Families, Friends & Honeymooners',
    featured: false
  },

  // ==========================================
  // COORG & WAYANAD
  // ==========================================
  {
    id: 'pkg-coorg-wayanad-nature',
    title: 'Coorg & Wayanad Nature Retreat: Coffee Estates & Banasura Dam',
    destination: 'Coorg & Wayanad',
    category: 'domestic',
    duration: '3 Nights / 4 Days',
    startingPrice: '',
    days: 4,
    nights: 3,
    shortDescription: 'Explore the lush coffee hills of Coorg and pristine waterfalls of Wayanad. Includes Dubare Elephant Camp, Abbey Falls, Edakkal Caves, and Banasura Dam.',
    fullDescription: 'A rejuvenating Western Ghats eco-tour. Spend 2 nights in the coffee capital of India (Coorg) visiting Dubare Elephant Camp, Abbey Falls, and Raja’s Seat, followed by 1 night in Wayanad visiting India’s largest earthen dam (Banasura Sagar) and ancient Edakkal caves.',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Doorstep AC Cab Pickup from Coimbatore / Bangalore / Mysore',
      '2 Nights Coorg Coffee Estate Resort + 1 Night Wayanad Nature Resort',
      'Dubare Elephant Camp River Bathing Experience in Coorg',
      'Abbey Falls, Raja’s Seat & Talacauvery (Origin of Cauvery River)',
      'Banasura Sagar Dam Speedboating & Edakkal Caves in Wayanad'
    ],
    inclusions: [
      '3 Nights Resort Accommodation with Daily Breakfast',
      'Dedicated AC Sedan / Innova for the complete 4-day tour',
      'Driver allowances, toll gates, interstate permits & parking',
      'Guided coffee plantation walking experience'
    ],
    exclusions: [
      'Entry tickets to elephant camp, caves, and waterfalls',
      'Speedboat rides at Banasura dam',
      'Lunch, dinners and personal expenses'
    ],
    itinerarySummary: [
      'Day 1: Drive to Coorg via Bylakuppe Golden Temple (Tibetan Monastery)',
      'Day 2: Dubare Elephant Camp, Abbey Falls & Raja’s Seat Sunset',
      'Day 3: Scenic Drive to Wayanad, Banasura Sagar Dam & Pookode Lake',
      'Day 4: Edakkal Caves, Soochipara Falls & return to Coimbatore/Bangalore'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival & Bylakuppe Tibetan Monastery',
        description: 'Pickup and drive to Coorg. Visit the magnificent Namdroling Monastery (Golden Temple) in Bylakuppe. Check in to your coffee estate resort.'
      },
      {
        day: 2,
        title: 'Dubare Elephant Camp, Abbey Falls & Raja’s Seat',
        description: 'Morning visit to Dubare Elephant Camp for elephant feeding and river bathing. Post-lunch visit to Abbey Falls nestled in coffee plantations, and sunset at Raja’s Seat.'
      },
      {
        day: 3,
        title: 'Coorg to Wayanad & Banasura Sagar Dam',
        description: 'Drive to Wayanad. Visit Banasura Sagar Dam (largest earthen dam in India) with optional speedboat ride, followed by tranquil Pookode Lake.'
      },
      {
        day: 4,
        title: 'Edakkal Caves & Return Journey',
        description: 'Hike to the ancient Neolithic carvings inside Edakkal Caves. Visit scenic tea viewpoints before your return drive.'
      }
    ],
    bookingInformation: 'Pickup available from Coimbatore, Mysore, Bangalore, or Calicut.',
    bestFor: 'Nature Lovers, Families & Couples',
    featured: true
  },

  // ==========================================
  // TAMIL NADU HERITAGE & SPIRITUAL
  // ==========================================
  {
    id: 'pkg-rameshwaram-madurai-kanyakumari',
    title: 'Tamil Nadu Heritage & Temple Circuit: Madurai, Rameshwaram & Kanyakumari',
    destination: 'Rameshwaram, Madurai & Kanyakumari',
    category: 'domestic',
    duration: '3 Nights / 4 Days',
    startingPrice: '',
    days: 4,
    nights: 3,
    shortDescription: 'Sacred pilgrimage and coastal tour covering Madurai Meenakshi Amman Temple, Ramanathaswamy 22 Wells, Dhanushkodi, and Vivekananda Rock Memorial.',
    fullDescription: 'Embark on Tamil Nadu’s most celebrated spiritual and scenic journey. Marvel at the architectural brilliance of Madurai Meenakshi Temple, bathe in the 22 holy wells of Rameshwaram, drive across the engineering marvel Pamban Bridge to the ghost town of Dhanushkodi, and watch the sunset at the confluence of three oceans in Kanyakumari.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Direct Pickup from Coimbatore in Dedicated AC Cab',
      '1 Night Madurai + 1 Night Rameshwaram + 1 Night Kanyakumari',
      'Madurai Meenakshi Amman Temple & Thirumalai Nayakkar Palace',
      'Ramanathaswamy Temple 22 Holy Theerthams & Pamban Bridge View',
      'Dhanushkodi Arichal Munai (Land’s End) & Vivekananda Rock Memorial'
    ],
    inclusions: [
      '3 Nights Hotel Accommodation with Daily Breakfast',
      'Dedicated AC Sedan / Innova for the entire 4-day circuit',
      'Driver allowances, toll fees, parking and permit charges',
      'All local sightseeing across Madurai, Rameshwaram, and Kanyakumari'
    ],
    exclusions: [
      'Temple special darshan entry tickets and pooja charges',
      'Vivekananda Rock ferry tickets and monument entries',
      'Lunches, dinners, and personal expenses'
    ],
    itinerarySummary: [
      'Day 1: Coimbatore to Madurai, Meenakshi Amman Temple & Palace',
      'Day 2: Madurai to Rameshwaram via Pamban Bridge & 22 Theerthams Bath',
      'Day 3: Dhanushkodi Safari & drive to Kanyakumari for Sunset',
      'Day 4: Vivekananda Rock, Triveni Sangam & return to Coimbatore'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Coimbatore to Madurai Temple City',
        description: 'Morning pickup from Coimbatore. Drive to Madurai. Check in and visit Thirumalai Nayakkar Mahal. Evening darshan at the world-famous Madurai Meenakshi Amman Temple.'
      },
      {
        day: 2,
        title: 'Madurai to Rameshwaram & Ramanathaswamy Temple',
        description: 'Drive across the historic Pamban Sea Bridge to Rameshwaram island. Take the holy bath at Agni Theertham and the 22 holy wells inside the temple. Evening visit to APJ Abdul Kalam Memorial.'
      },
      {
        day: 3,
        title: 'Dhanushkodi Excursion to Kanyakumari',
        description: 'Early morning drive to Dhanushkodi and Arichal Munai (where Indian Ocean and Bay of Bengal meet). Drive to Kanyakumari to witness the spectacular sunset at Triveni Sangam.'
      },
      {
        day: 4,
        title: 'Vivekananda Rock Memorial & Return to Coimbatore',
        description: 'Ferry ride to Vivekananda Rock Memorial and Thiruvalluvar Statue. Visit Gandhi Memorial before a smooth return drive to Coimbatore.'
      }
    ],
    bookingInformation: 'Available year-round. Special elderly-friendly pacing available on request.',
    bestFor: 'Families, Elders & Heritage Seekers',
    featured: true
  },

  // ==========================================
  // KASHMIR PACKAGES
  // ==========================================
  {
    id: 'pkg-kashmir-heaven',
    title: 'Kashmir Paradise: Srinagar Dal Lake, Gulmarg Gondola & Pahalgam',
    destination: 'Kashmir',
    category: 'domestic',
    duration: '5 Nights / 6 Days',
    startingPrice: '',
    days: 6,
    nights: 5,
    shortDescription: 'Stay on a romantic cedar-wood houseboat on Dal Lake, ride the world’s highest Gondola cable car in Gulmarg snow, and explore Betaab valley in Pahalgam.',
    fullDescription: 'Discover the Crown of India with Happy Journey Holidays. This 6-day dream Kashmir tour includes a luxury cedar-wood houseboat stay on Dal Lake with Shikara boat ride, 3 nights in Srinagar premium hotels, 1 night in Pahalgam (Valley of Shepherds), and an exhilarating day in snow-capped Gulmarg with Gondola cable car ride.',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      '1 Night Luxury Srinagar Houseboat + 3 Nights Srinagar + 1 Night Pahalgam',
      'Shikara Boat Ride on Dal Lake with Floating Flower Market',
      'Gulmarg Gondola Cable Car Ride to Snow Mountain Phase 1',
      'Pahalgam Valley of Shepherds, Betaab Valley & Aru Valley',
      'All Sightseeing in Private Cab with MAP (Breakfast & Dinner) Meals'
    ],
    inclusions: [
      '1 Night Deluxe Houseboat on Dal Lake Srinagar',
      '3 Nights in 3/4-Star Hotel in Srinagar',
      '1 Night in Premium Hotel in Pahalgam',
      'Daily Breakfast & Dinner (MAP Plan) at all hotels',
      '1-Hour Shikara Boat Ride on Dal Lake',
      'All Airport & Sightseeing Transfers in Private Non-Stop Vehicle',
      'Toll taxes, parking & fuel charges'
    ],
    exclusions: [
      'Air tickets to Srinagar (Can be arranged from Coimbatore / Chennai)',
      'Gulmarg Gondola Phase 1 & Phase 2 tickets',
      'Local Union taxi in Pahalgam for Aru/Betaab valley',
      'Pony rides, snow gear rentals & tips'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Srinagar & Check into Houseboat on Dal Lake with Shikara Ride',
      'Day 2: Srinagar Mughal Gardens (Nishat & Shalimar) & Shankaracharya Temple',
      'Day 3: Excursion to Gulmarg with Gondola Cable Car Experience',
      'Day 4: Transfer to Pahalgam via Saffron Fields & Apple Orchards',
      'Day 5: Pahalgam Aru & Betaab Valley & return to Srinagar',
      'Day 6: Morning Shopping for Pashminas & Airport Drop'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Srinagar & Dal Lake Houseboat',
        description: 'Arrive at Srinagar Airport. Transfer to your luxury carved wood houseboat on Dal Lake. Enjoy an evening Shikara boat ride past floating gardens and artisan craft shops.'
      },
      {
        day: 2,
        title: 'Srinagar Mughal Gardens & Old City',
        description: 'Explore the famous Mughal Gardens built by Emperor Jahangir: Nishat Bagh (Garden of Pleasure), Shalimar Bagh (Abode of Love), and Shankaracharya Hill Temple.'
      },
      {
        day: 3,
        title: 'Day Trip to Gulmarg Meadow of Flowers',
        description: 'Drive through pine valleys to Gulmarg. Ride the world-famous Gulmarg Gondola cable car up to snow-clad Kongdoori peak (Phase 1 / Phase 2). Return to Srinagar for dinner.'
      },
      {
        day: 4,
        title: 'Srinagar to Pahalgam Valley of Shepherds',
        description: 'Drive to Pahalgam along the Lidder River. En route stop at saffron fields in Pampore and Awantipora ruins. Check into your hotel in Pahalgam.'
      },
      {
        day: 5,
        title: 'Betaab Valley & Return to Srinagar',
        description: 'Visit Betaab Valley, Aru Valley, and Chandanwari by local taxi. Enjoy horseback rides along pine trails before returning to Srinagar.'
      },
      {
        day: 6,
        title: 'Morning Shikara & Departure',
        description: 'Enjoy final breakfast with views of Dal Lake. Transfer to Srinagar Airport for your flight back home.'
      }
    ],
    bookingInformation: 'Pre-booking for Gulmarg Gondola tickets is highly recommended due to high demand. Flights from Coimbatore available with 1 stop.',
    bestFor: 'Couples, Families & Honeymooners',
    featured: true
  },

  // ==========================================
  // HIMACHAL PRADESH
  // ==========================================
  {
    id: 'pkg-himachal-snow-valley',
    title: 'Himachal Snow Valleys: Shimla, Kufri, Solang Valley & Manali',
    destination: 'Himachal Pradesh',
    category: 'domestic',
    duration: '5 Nights / 6 Days',
    startingPrice: '',
    days: 6,
    nights: 5,
    shortDescription: 'Experience the magic of snow in Shimla and Manali. Includes colonial Shimla Mall Road, Kufri adventure, Solang Valley snow sports, Rohtang Pass, and Kullu rafting.',
    fullDescription: 'A classic North Indian Himalayan adventure. Spend 2 nights in the Queen of Hills (Shimla) walking along the Ridge and visiting Kufri snow park, and 3 nights in Manali exploring apple orchards, Hadimba temple, Solang Valley paragliding and skiing, and the engineering marvel Atal Tunnel.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      '2 Nights Shimla + 3 Nights Manali in 3/4-Star Hotels with MAP Meals',
      'Kufri Snow & Adventure Park with Himalayan Nature Park',
      'Solang Valley Snow Activities: Paragliding, Zorbing & Skiing',
      'Atal Tunnel Scenic Drive to Lahaul Sissu Waterfalls',
      'Kullu Valley White Water River Rafting & Shawl Factory Visit'
    ],
    inclusions: [
      '5 Nights Accommodation in Handpicked Mountain Hotels',
      'Daily Breakfast and Dinner (MAP Plan) at all hotels',
      'Dedicated AC Cab (Delhi / Chandigarh to Delhi / Chandigarh)',
      'All local sightseeing across Shimla, Kufri, Kullu, and Manali',
      'Toll taxes, parking, driver allowances and fuel'
    ],
    exclusions: [
      'Flight / Train tickets to Delhi or Chandigarh',
      'Adventure activity tickets (Paragliding, River Rafting, Skiing)',
      'Rohtang Pass NGT National Green Tribunal permit fees',
      'Lunch and personal expenses'
    ],
    itinerarySummary: [
      'Day 1: Delhi / Chandigarh to Shimla scenic drive & Mall Road walk',
      'Day 2: Full Day Shimla & Kufri Adventure excursion',
      'Day 3: Scenic drive from Shimla to Manali via Kullu Valley',
      'Day 4: Manali Local Sightseeing: Hadimba Temple & Vashisht Baths',
      'Day 5: Solang Valley, Atal Tunnel & Sissu Lahaul Valley excursion',
      'Day 6: Return drive from Manali to Delhi / Chandigarh'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Delhi / Chandigarh to Shimla',
        description: 'Meet driver at Delhi / Chandigarh airport. Scenic drive up the Shivalik hills to Shimla. Evening stroll along Mall Road, the Ridge, and Christ Church.'
      },
      {
        day: 2,
        title: 'Kufri Snow View & Shimla Exploration',
        description: 'Morning excursion to Kufri. Enjoy pony rides, yak rides, and snow views. Visit Himalayan Wildlife Zoo. Evening free for shopping at Lakkar Bazaar.'
      },
      {
        day: 3,
        title: 'Shimla to Manali via Kullu Valley',
        description: 'Drive along the Beas River to Manali. En route stop at Kullu for river rafting and authentic Pashmina shawl weaving factories. Check in to Manali resort.'
      },
      {
        day: 4,
        title: 'Manali Local Temples & Old Manali',
        description: 'Visit the 450-year-old wooden Hadimba Devi Temple, Vashisht Hot Sulphur Springs, Tibetan Monastery, and charming Old Manali riverside cafes.'
      },
      {
        day: 5,
        title: 'Solang Valley Snow Sports & Atal Tunnel',
        description: 'Full day at Solang Valley for snow sports, quad biking, and paragliding. Drive through Atal Tunnel (world’s longest above 10,000 ft) into scenic Sissu.'
      },
      {
        day: 6,
        title: 'Manali to Chandigarh / Delhi Departure',
        description: 'After breakfast, drive down to Chandigarh / Delhi Airport for your return flight to Coimbatore.'
      }
    ],
    bookingInformation: 'Connecting flights from Coimbatore to Delhi / Chandigarh available easily.',
    bestFor: 'Couples, Families & Adventure Enthusiasts',
    featured: true
  },

  // ==========================================
  // LEH LADAKH
  // ==========================================
  {
    id: 'pkg-ladakh-explorer',
    title: 'Ladakh Explorer: Pangong Tso Lake, Nubra Valley & Khardung La Pass',
    destination: 'Leh Ladakh',
    category: 'domestic',
    duration: '5 Nights / 6 Days',
    startingPrice: '',
    days: 6,
    nights: 5,
    shortDescription: 'High-altitude Himalayan wonder. Camp by turquoise Pangong Lake, ride Bactrian camels on Nubra sand dunes, and conquer Khardung La pass.',
    fullDescription: 'The ultimate bucket-list Indian road adventure. Acclimatize in historic Leh, visit Thiksey and Hemis monasteries, cross Khardung La pass (17,982 ft), experience the desert dunes of Hunder in Nubra Valley, and spend an unforgettable night beside color-shifting Pangong Tso lake.',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      '3 Nights Leh + 1 Night Nubra Valley Camp + 1 Night Pangong Lake Camp',
      'Pangong Tso High Altitude Color-Shifting Glacial Lake',
      'Khardung La Pass (Highest Motorable Road at 17,982 ft)',
      'Hunder Sand Dunes & Double-Humped Bactrian Camel Ride in Nubra',
      'Magnetic Hill Anti-Gravity Spot, Hall of Fame & Sangam Confluence'
    ],
    inclusions: [
      '5 Nights Accommodation in Premium Hotels & Deluxe Swiss Tents',
      'Daily Breakfast and Dinner (MAP Plan) at all locations',
      'Dedicated AC / Non-AC Scorpio / Innova / Tempo for all Ladakh transfers',
      'Ladakh Inner Line Permits (ILP) and Wildlife environmental fees',
      'Oxygen cylinder on board vehicle for high-altitude emergency safety'
    ],
    exclusions: [
      'Air tickets to Leh (IXL)',
      'Camel rides, quad biking, and river rafting passes',
      'Monastery entry fees and personal tips'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Leh Airport & Full Day Rest for Acclimatization',
      'Day 2: Sham Valley Sightseeing: Magnetic Hill, Sangam & Hall of Fame',
      'Day 3: Leh to Nubra Valley via Khardung La Pass & Hunder Sand Dunes',
      'Day 4: Nubra Valley to Pangong Lake via Shyok River Scenic Route',
      'Day 5: Pangong Tso Sunrise & return to Leh via Chang La Pass',
      'Day 6: Departure transfer to Leh Airport'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Leh & Acclimatization',
        description: 'Fly into Kushok Bakula Rimpochee Airport Leh. Transfer to hotel. Mandatory complete rest to adapt to high altitude (11,500 ft).'
      },
      {
        day: 2,
        title: 'Sham Valley Sightseeing & Monasteries',
        description: 'Visit Hall of Fame war memorial, Magnetic Hill anti-gravity point, Gurudwara Pathar Sahib, and the Sangam confluence of Indus and Zanskar rivers.'
      },
      {
        day: 3,
        title: 'Leh to Nubra Valley via Khardung La',
        description: 'Ascend Khardung La Pass (17,982 ft). Descend into the valley of flowers (Nubra). Visit Diskit Monastery giant Buddha and ride double-humped camels on Hunder dunes.'
      },
      {
        day: 4,
        title: 'Nubra Valley to Pangong Tso Lake',
        description: 'Drive along the dramatic Shyok river route. Arrive at the mesmerizing blue waters of Pangong Tso (14,270 ft). Check into luxury lakeside Swiss tents.'
      },
      {
        day: 5,
        title: 'Pangong Sunrise to Leh via Chang La Pass',
        description: 'Witness the morning sun reflecting on Pangong waters. Return to Leh crossing Chang La Pass (17,590 ft). Visit Thiksey Monastery and Shey Palace.'
      },
      {
        day: 6,
        title: 'Leh Departure',
        description: 'Transfer to Leh airport for your flight back home with memories of a lifetime.'
      }
    ],
    bookingInformation: 'Complete acclimatization on Day 1 is mandatory. Best season is May to September.',
    bestFor: 'Adventure Seekers, Photographers & Couples',
    featured: true
  },

  // ==========================================
  // RAJASTHAN ROYAL CIRCUIT
  // ==========================================
  {
    id: 'pkg-rajasthan-royal-circuit',
    title: 'Royal Rajasthan: Jaipur, Jodhpur, Udaipur & Jaisalmer Desert Camp',
    destination: 'Rajasthan',
    category: 'domestic',
    duration: '6 Nights / 7 Days',
    startingPrice: '',
    days: 7,
    nights: 6,
    shortDescription: 'Regal palaces and golden sand dunes. Explore Jaipur Pink City, Mehrangarh Fort in Jodhpur, starry desert camps in Jaisalmer, and Udaipur lakes.',
    fullDescription: 'Walk in the footsteps of royalty on this classic Rajasthan grand tour. Visit the majestic Amber Fort and City Palace in Jaipur, cruise romantic Lake Pichola in Udaipur, admire the blue rooftops from Mehrangarh Fort in Jodhpur, and enjoy camel safari and folk dance under starry desert skies at Sam Sand Dunes in Jaisalmer.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      '2N Jaipur + 1N Jodhpur + 1N Jaisalmer Desert Tent + 2N Udaipur',
      'Amber Fort Jeep Ride, Hawa Mahal & City Palace in Jaipur',
      'Mehrangarh Fort & Jaswant Thada in Sun City Jodhpur',
      'Sam Sand Dunes Camel Safari, Folk Dance & Swiss Camp in Jaisalmer',
      'Lake Pichola Boat Ride & Saheliyon-ki-Bari in City of Lakes Udaipur'
    ],
    inclusions: [
      '6 Nights Accommodation in Heritage & 4-Star Hotels + Desert Camp',
      'Daily Buffet Breakfast at all hotels',
      'Traditional Rajasthani Dinner + Cultural Show at Jaisalmer Camp',
      'Dedicated AC Sedan / Innova for all transfers and sightseeing',
      'All driver allowances, toll gates, interstate permits & parking'
    ],
    exclusions: [
      'Air tickets to Jaipur / Udaipur',
      'Monument entry fees, camera passes, and audio guides',
      'Lunches, dinners (except camp) and personal shopping'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Pink City Jaipur & Chokhi Dhani Cultural Village',
      'Day 2: Full Day Jaipur: Amber Fort, Hawa Mahal, City Palace & Jantar Mantar',
      'Day 3: Jaipur to Jodhpur via Ajmer Dargah & Pushkar Brahma Temple',
      'Day 4: Jodhpur Mehrangarh Fort & Drive to Jaisalmer Sam Desert Dunes',
      'Day 5: Jaisalmer Golden Fort & Drive to Lake City Udaipur',
      'Day 6: Udaipur City Palace, Lake Pichola Boat Ride & Jag Mandir',
      'Day 7: Saheliyon Ki Bari & Departure from Udaipur Airport'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Jaipur Pink City',
        description: 'Arrive at Jaipur Airport. Transfer to your heritage hotel. Evening visit to Birla Temple and the famous Chokhi Dhani ethnic village resort.'
      },
      {
        day: 2,
        title: 'Jaipur Forts & Palaces',
        description: 'Explore the hilltop Amber Fort with jeep ride, Jal Mahal water palace photo stop, Hawa Mahal (Palace of Winds), City Palace Museum, and Jantar Mantar observatory.'
      },
      {
        day: 3,
        title: 'Jaipur to Jodhpur via Pushkar',
        description: 'Drive to Jodhpur with a stop at holy Pushkar lake and Brahma Temple. Check into Jodhpur hotel and visit Umaid Bhawan Palace Museum.'
      },
      {
        day: 4,
        title: 'Mehrangarh Fort & Jaisalmer Desert Camp',
        description: 'Explore Mehrangarh Fort and Jaswant Thada marble cenotaph. Drive to Sam Sand Dunes in Jaisalmer. Enjoy sunset camel safari, Kalbelia folk dance, and dinner buffet.'
      },
      {
        day: 5,
        title: 'Jaisalmer Fort to Udaipur',
        description: 'Visit the living golden Jaisalmer Fort (Sonar Qila) and Patwon ki Haveli. Scenic drive to romantic Udaipur. Check into lake-view hotel.'
      },
      {
        day: 6,
        title: 'Udaipur City Palace & Lake Pichola Boating',
        description: 'Visit the sprawling City Palace complex, Jagdish Temple, and enjoy a serene sunset boat cruise on Lake Pichola with views of Lake Palace and Jag Mandir.'
      },
      {
        day: 7,
        title: 'Saheliyon-ki-Bari & Departure',
        description: 'Visit Saheliyon-ki-Bari royal gardens before transfer to Udaipur Airport for flight back to Coimbatore.'
      }
    ],
    bookingInformation: 'Best experienced between October and March during pleasant winter weather.',
    bestFor: 'Families, History Buffs & Luxury Travelers',
    featured: true
  },

  // ==========================================
  // GOA BEACH HOLIDAY
  // ==========================================
  {
    id: 'pkg-goa-coastal-vibe',
    title: 'Goa Coastal Vibe: Beaches, Aguada Fort & Mandovi River Sunset Cruise',
    destination: 'Goa',
    category: 'domestic',
    duration: '3 Nights / 4 Days',
    startingPrice: '',
    days: 4,
    nights: 3,
    shortDescription: 'Sun, sand, seafood and nightlife. Enjoy North Goa beach hopping, Portuguese forts, Old Goa heritage churches, and Mandovi river cruises.',
    fullDescription: 'The ultimate tropical holiday. Stay in a 4-star resort close to the beach, enjoy water sports at Calangute and Baga, explore 17th-century Fort Aguada, take photos in colorful Fontainhas Latin Quarter, visit UNESCO churches of Old Goa, and cruise Mandovi river with Goan folk performances.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      '3 Nights in 4-Star Beach Resort with Swimming Pool & Breakfast',
      'North Goa Beach Tour: Baga, Calangute, Anjuna & Candolim',
      'Historic Aguada Fort & Lighthouse Viewpoint',
      'Old Goa UNESCO Churches: Basilica of Bom Jesus & Se Cathedral',
      'Mandovi River 1-Hour Sunset Cruise with Live DJ & Cultural Dances'
    ],
    inclusions: [
      '3 Nights Accommodation in 4-Star Goa Resort',
      'Daily Buffet Breakfast',
      'Private AC Cab for Airport / Railway Station transfers and sightseeing',
      '1-Hour Mandovi River Sunset Cruise Tickets',
      'Driver allowances, parking and toll charges'
    ],
    exclusions: [
      'Flight tickets to Goa (GOI / GOX)',
      'Water sports (Jet Ski, Parasailing, Banana ride)',
      'Lunches, dinners, drinks and club entry charges'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Goa, Resort Check-in & Evening Beach Sunset',
      'Day 2: North Goa Beaches, Fort Aguada, Chapora Fort & Anjuna Flea Market',
      'Day 3: South Goa Heritage, Old Goa Churches, Miramar Beach & Mandovi Cruise',
      'Day 4: Fontainhas Latin Quarter walk & Airport departure transfer'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Goa',
        description: 'Meet our representative at Goa Airport (Mopa / Dabolim) or Thivim/Madgaon Railway Station. Transfer to your beach resort. Relax by the pool or take an evening walk on the beach.'
      },
      {
        day: 2,
        title: 'North Goa Beaches & Forts',
        description: 'Visit Portuguese Fort Aguada and lighthouse, Calangute and Baga beaches with water sports options, Chapora Fort (Dil Chahta Hai fort), and Anjuna beach.'
      },
      {
        day: 3,
        title: 'South Goa Heritage & Sunset Cruise',
        description: 'Visit the world-heritage Basilica of Bom Jesus (housing relics of St. Francis Xavier) and Se Cathedral. Visit Miramar Beach, Dona Paula viewpoint, and board the evening Mandovi River sunset cruise.'
      },
      {
        day: 4,
        title: 'Latin Quarter Walk & Departure',
        description: 'Walk through the colorful Portuguese houses of Fontainhas in Panaji. Transfer to airport for your flight back home.'
      }
    ],
    bookingInformation: 'Direct and 1-stop flights available from Coimbatore to Goa.',
    bestFor: 'Friends, Couples & Honeymooners',
    featured: true
  },

  // ==========================================
  // ANDAMAN ISLANDS
  // ==========================================
  {
    id: 'pkg-andaman-tropical-escape',
    title: 'Andaman Tropical Escape: Port Blair, Havelock Island & Radhanagar Beach',
    destination: 'Andaman Islands',
    category: 'domestic',
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    days: 5,
    nights: 4,
    shortDescription: 'Pristine white sand beaches and living coral reefs. Cruise on Makruzz catamaran, relax on Asia’s best Radhanagar Beach, and visit historic Cellular Jail.',
    fullDescription: 'Discover the paradise islands of Andaman. Experience the poignant history of Cellular Jail with light and sound show in Port Blair, sail on luxury high-speed catamarans to Havelock Island, walk on the powdery sands of Radhanagar Beach, and explore vibrant coral reefs and marine life at Elephant Beach.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      '2 Nights Port Blair + 2 Nights Havelock Island in Beachfront Resorts',
      'High-Speed Luxury Catamaran (Makruzz / Nautika) Cruise Transfers',
      'Radhanagar Beach (Asia’s Best Beach Ranked by Time Magazine) Sunset',
      'Elephant Beach Speedboat Trip for Live Coral Reefs & Snorkeling',
      'Historic Cellular Jail Tour & Famous Light & Sound Show'
    ],
    inclusions: [
      '4 Nights Resort Accommodation with Daily Breakfast',
      'Makruzz / Nautika Luxury Catamaran Tickets (Port Blair - Havelock - Port Blair)',
      'Dedicated AC Cab for all road transfers in Port Blair and Havelock',
      'Speedboat transfer to Elephant Beach with complimentary snorkeling',
      'Cellular Jail entry tickets & Light and Sound show passes'
    ],
    exclusions: [
      'Flight tickets to Port Blair (IXZ)',
      'Scuba diving, Sea Walk, and Jet Ski charges',
      'Lunches, dinners and personal expenses'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Port Blair, Cellular Jail & Light & Sound Show',
      'Day 2: High-Speed Cruise to Havelock Island & Radhanagar Beach Sunset',
      'Day 3: Elephant Beach Speedboat Excursion & Coral Snorkeling',
      'Day 4: Return Cruise to Port Blair & Souvenir Shopping at Sagarika Emporium',
      'Day 5: Airport Departure Transfer'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Port Blair & Cellular Jail',
        description: 'Arrive at Veer Savarkar International Airport in Port Blair. Transfer to hotel. Afternoon visit to the historic Cellular Jail followed by the stirring Light and Sound show.'
      },
      {
        day: 2,
        title: 'Port Blair to Havelock Island & Radhanagar Beach',
        description: 'Board the high-speed Makruzz catamaran to Havelock Island. Check in to your beach resort. Afternoon visit to Radhanagar Beach (Beach No. 7) to watch one of the world’s best sunsets.'
      },
      {
        day: 3,
        title: 'Elephant Beach Coral Reefs & Water Sports',
        description: 'Board a speedboat to Elephant Beach. Marvel at the vibrant live coral reefs. Try exciting snorkeling, sea walk, or scuba diving with certified PADI dive masters.'
      },
      {
        day: 4,
        title: 'Return Cruise to Port Blair',
        description: 'Morning leisure on Havelock island. Afternoon cruise back to Port Blair. Visit Sagarika Govt Emporium for handmade seashell souvenirs and pearl jewelry.'
      },
      {
        day: 5,
        title: 'Departure from Port Blair',
        description: 'Transfer to Port Blair Airport for flight to Chennai / Bangalore / Coimbatore.'
      }
    ],
    bookingInformation: 'Valid Government Photo ID required for all domestic travelers. No passport or visa needed.',
    bestFor: 'Couples, Honeymooners & Family Beach Holidays',
    featured: true
  }
];

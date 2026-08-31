import { Destination, HolidayPackage } from '../types';

export const NEW_31_INTERNATIONAL_DESTINATIONS: Destination[] = [
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    country: 'Sri Lanka',
    category: 'international',
    tagline: 'Emerald Tea Hills, Sigiriya Rock & Golden Coastlines',
    description: 'Explore the ancient Sigiriya Rock Fortress, misty Nuwara Eliya tea hills, Temple of the Tooth in Kandy, and sunny Bentota beaches with Madu river safari.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Sigiriya Rock Fortress UNESCO World Heritage Climb',
      'Temple of the Sacred Tooth Relic in Scenic Kandy',
      'Nuwara Eliya Tea Plantations & Ramboda Waterfalls',
      'Bentota Beach & Madu River Mangrove Boat Safari'
    ],
    bestTimeToVisit: 'October to April',
    visaInfo: 'Sri Lanka ETA E-Visa processed within 24-48 hours',
    highlights: ['Sigiriya Rock', 'Kandy Temple', 'Nuwara Eliya', 'Bentota Beach', 'Colombo'],
    featured: true
  },
  {
    id: 'nepal',
    name: 'Nepal',
    country: 'Nepal',
    category: 'international',
    tagline: 'Himalayan Vistas, Phewa Lake & Sacred Temples',
    description: 'Experience majestic Annapurna views, tranquil boating on Pokhara Phewa Lake, Sarangkot sunrise, and holy Pashupatinath & Boudhanath temples in Kathmandu.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Pashupatinath Temple & Boudhanath Stupa in Kathmandu',
      'Pokhara Phewa Lake Boating with Annapurna Mountain Views',
      'Sarangkot Sunrise over Snowcapped Himalayan Peaks',
      'Devi’s Fall, Gupteshwor Mahadev Cave & Peace Pagoda'
    ],
    bestTimeToVisit: 'September to May',
    visaInfo: 'Visa-Free entry for Indian Citizens with valid Passport or Voter ID',
    highlights: ['Kathmandu', 'Pokhara', 'Sarangkot Sunrise', 'Phewa Lake', 'Pashupatinath'],
    featured: true
  },
  {
    id: 'bhutan',
    name: 'Bhutan',
    country: 'Bhutan',
    category: 'international',
    tagline: 'Land of the Thunder Dragon & Tiger’s Nest Monastery',
    description: 'Hike to the legendary cliffside Tiger’s Nest Monastery, visit historic Punakha Dzong at the river confluence, and discover peaceful Thimphu valley.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Iconic Tiger’s Nest Monastery (Paro Taktsang) Cliff Hike',
      'Punakha Dzong Majestic Fortress & Suspension Bridge',
      'Thimphu Buddha Dordenma Giant Bronze Statue',
      'Dochula Pass 108 Memorial Chortens & Himalayan View'
    ],
    bestTimeToVisit: 'March to May & September to November',
    visaInfo: 'Bhutan Entry Permit with SDF assistance provided',
    highlights: ['Paro Taktsang', 'Thimphu', 'Punakha Dzong', 'Dochula Pass'],
    featured: true
  },
  {
    id: 'kenya',
    name: 'Kenya',
    country: 'Kenya',
    category: 'international',
    tagline: 'Big 5 Safari, Masai Mara Plains & Lake Nakuru Flamingos',
    description: 'Witness the iconic Great Migration in Masai Mara, spot leopards and lions on thrilling 4x4 game drives, and see pink flamingos across Lake Nakuru.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'World-Famous Masai Mara National Reserve Big 5 Game Drives',
      'Lake Nakuru Flocks of Pink Flamingos & Rhino Sanctuary',
      'Lake Naivasha Boat Safari & Crescent Island Walk',
      'Authentic Maasai Tribal Village Cultural Experience'
    ],
    bestTimeToVisit: 'July to October & December to March',
    visaInfo: 'Kenya Electronic Travel Authorisation (eTA) processing support',
    highlights: ['Masai Mara', 'Lake Nakuru', 'Lake Naivasha', 'Nairobi', 'Big 5 Wildlife'],
    featured: true
  },
  {
    id: 'holy-land',
    name: 'Holy Land',
    country: 'Israel & Palestine',
    category: 'international',
    tagline: 'Sacred Pilgrimage, Jerusalem Old City & Dead Sea Wonder',
    description: 'Follow the historic and sacred paths in Jerusalem, Bethlehem, Nazareth, Sea of Galilee, and experience effortless floating in the Dead Sea.',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '7 Nights / 8 Days',
    popularExperiences: [
      'Jerusalem Old City, Western Wall & Church of Holy Sepulchre',
      'Bethlehem Church of the Nativity & Shepherds’ Field',
      'Nazareth Basilica of the Annunciation & Sea of Galilee Boat Ride',
      'Floating Experience in the Mineral-Rich Dead Sea'
    ],
    bestTimeToVisit: 'October to May',
    visaInfo: 'Complete Tourist Visa documentation and guide assistance',
    highlights: ['Jerusalem', 'Bethlehem', 'Nazareth', 'Dead Sea', 'Sea of Galilee'],
    featured: true
  },
  {
    id: 'japan',
    name: 'Japan',
    country: 'Japan',
    category: 'international',
    tagline: 'Mount Fuji, Kyoto Shrines & Tokyo High-Tech Wonder',
    description: 'Discover the neon splendor of Tokyo, majestic Mount Fuji, Kyoto’s 10,000 torii gates at Fushimi Inari, and ride the bullet train to Osaka.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '6 Nights / 7 Days',
    popularExperiences: [
      'Tokyo Shibuya Crossing, Senso-ji Temple & Skytree Views',
      'Mount Fuji 5th Station & Lake Kawaguchiko Cruise',
      'Kyoto Fushimi Inari Torii Gates & Arashiyama Bamboo Grove',
      'Shinkansen Bullet Train & Osaka Dotonbori Street Food'
    ],
    bestTimeToVisit: 'March to May & September to November',
    visaInfo: 'Japan E-Visa and Sticker Visa documentation guidance',
    highlights: ['Tokyo', 'Mt Fuji', 'Kyoto', 'Osaka', 'Bullet Train'],
    featured: true
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    country: 'South Korea',
    category: 'international',
    tagline: 'Seoul Royal Palaces, K-Culture & Jeju Volcanic Island',
    description: 'Wear traditional Hanbok at Gyeongbokgung Palace, explore vibrant Myeongdong, and fly to Jeju Island for majestic waterfalls and volcanic sunrise peaks.',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Gyeongbokgung Palace with Hanbok Traditional Costume Experience',
      'N Seoul Tower 360-Degree Skyline View & Love Locks',
      'Bukchon Hanok Village & Trendy Myeongdong Shopping',
      'Jeju Island Seongsan Ilchulbong & Cheonjiyeon Falls'
    ],
    bestTimeToVisit: 'April to June & September to November',
    visaInfo: 'South Korea K-ETA / Tourist Visa guidance provided',
    highlights: ['Seoul', 'Jeju Island', 'Gyeongbokgung', 'N Seoul Tower', 'Hanbok'],
    featured: true
  },
  {
    id: 'taiwan',
    name: 'Taiwan',
    country: 'Taiwan',
    category: 'international',
    tagline: 'Taipei 101, Jiufen Old Street & Sun Moon Lake',
    description: 'Marvel at Taipei 101, release sky lanterns in Pingxi, walk the mountain alleys of Jiufen, and cruise the turquoise waters of Sun Moon Lake.',
    image: 'https://images.unsplash.com/photo-1508248017054-13e798e352dc?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Taipei 101 Observatory 89th Floor Skyline Views',
      'Jiufen Historic Mountain Village & Pingxi Sky Lantern Flying',
      'Sun Moon Lake Scenic Yacht Cruise & Ropeway Cable Car',
      'Taroko Gorge Marble Cliffs & Night Market Street Delicacies'
    ],
    bestTimeToVisit: 'October to April',
    visaInfo: 'Taiwan Travel Authorization Certificate / E-Visa Support',
    highlights: ['Taipei 101', 'Jiufen', 'Sun Moon Lake', 'Taroko Gorge', 'Night Markets'],
    featured: true
  },
  {
    id: 'azerbaijan',
    name: 'Azerbaijan',
    country: 'Azerbaijan',
    category: 'international',
    tagline: 'Land of Fire: Baku Flame Towers & Caucasus Mountains',
    description: 'Experience futuristic Baku Boulevard, UNESCO Old City, burning Yanar Dag mountain, Ateshgah Fire Temple, and scenic snow-clad Gabala resorts.',
    image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Baku Flame Towers, Caspian Boulevard & Old City Maiden Tower',
      'Ateshgah Fire Temple & Yanar Dag Burning Mountain',
      'Heydar Aliyev Cultural Center Architecture by Zaha Hadid',
      'Day Trip to Gabala Mountains & Tufandag Cable Car'
    ],
    bestTimeToVisit: 'April to June & September to November',
    visaInfo: 'Azerbaijan ASAN E-Visa processed in 3 working hours/days',
    highlights: ['Baku', 'Flame Towers', 'Gabala', 'Ateshgah', 'Yanar Dag'],
    featured: true
  },
  {
    id: 'georgia',
    name: 'Georgia',
    country: 'Georgia',
    category: 'international',
    tagline: 'Caucasus Mountain Peaks, Narikala Fortress & Old Tbilisi',
    description: 'Ride the Tbilisi cable car, take a 4x4 mountain drive to Gergeti Trinity Church below Mount Kazbek, and explore ancient Ananuri fortress.',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Tbilisi Old Town, Narikala Fortress Cable Car & Sulfur Baths',
      'Gergeti Trinity Church with Mount Kazbek Mountain Backdrop',
      'Ananuri Fortress & Jinvali Turquoise Reservoir',
      'Mtskheta UNESCO Ancient Capital & Jvari Monastery'
    ],
    bestTimeToVisit: 'May to October',
    visaInfo: 'Georgia E-Visa / Visa-Free entry for valid GCC/US/UK visa holders',
    highlights: ['Tbilisi', 'Kazbegi', 'Ananuri', 'Mtskheta', 'Caucasus'],
    featured: true
  },
  {
    id: 'kazakhstan',
    name: 'Kazakhstan',
    country: 'Kazakhstan',
    category: 'international',
    tagline: 'Tian Shan Peaks, Shymbulak Cable Car & Charyn Canyon',
    description: 'Ascend to 3,200m on Shymbulak cable cars, admire Medeu high-altitude ice gorge, and explore the red rock formations of Charyn Canyon.',
    image: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Shymbulak Ski Resort Cable Car to Talgar Pass (3,200m)',
      'Medeu High-Altitude Gorge & Dam Panoramic Viewpoint',
      'Charyn Canyon Grand Natural Wonder of Central Asia',
      'Kok-Tobe Hill Panoramic City Views & Zenkov Cathedral'
    ],
    bestTimeToVisit: 'May to October & Winter for Snow Sports',
    visaInfo: '14-Day Visa-Free entry for Indian Citizens',
    highlights: ['Almaty', 'Shymbulak', 'Charyn Canyon', 'Medeu', 'Kok-Tobe'],
    featured: true
  },
  {
    id: 'uzbekistan',
    name: 'Uzbekistan',
    country: 'Uzbekistan',
    category: 'international',
    tagline: 'Great Silk Road, Turquoise Domes & Registan Square',
    description: 'Step into fairy-tale Silk Road history at Samarkand Registan Square, Shah-i-Zinda necropolis, Bukhara ancient fortress, and Tashkent metro stations.',
    image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Samarkand Registan Square World-Famous Turquoise Mosaics',
      'Gur-e-Amir Mausoleum & Shah-i-Zinda Avenue of Tombs',
      'Bukhara Ark Fortress, Kalyan Minaret & Lyabi-Khauz',
      'Afrosiyob High-Speed Bullet Train across Silk Road Cities'
    ],
    bestTimeToVisit: 'April to June & September to November',
    visaInfo: 'Uzbekistan E-Visa processed seamlessly in 3 business days',
    highlights: ['Samarkand', 'Bukhara', 'Tashkent', 'Registan', 'Silk Road'],
    featured: true
  },
  {
    id: 'turkey',
    name: 'Turkey',
    country: 'Turkey',
    category: 'international',
    tagline: 'Cappadocia Hot Air Balloons, Hagia Sophia & Bosphorus',
    description: 'Glide in sunrise hot air balloons over Cappadocia fairy chimneys, cruise the Bosphorus between Europe & Asia, and explore historic Istanbul.',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '6 Nights / 7 Days',
    popularExperiences: [
      'Cappadocia Sunrise Hot Air Balloon Flight & Fairy Chimneys',
      'Istanbul Hagia Sophia, Blue Mosque & Grand Bazaar',
      'Bosphorus Luxury Sunset Cruise Between Europe & Asia',
      'Pamukkale Thermal White Travertines & Hierapolis Ruins'
    ],
    bestTimeToVisit: 'April to October',
    visaInfo: 'Turkey E-Visa (for US/UK/Schengen visa holders) / Sticker Visa assistance',
    highlights: ['Istanbul', 'Cappadocia', 'Bosphorus Cruise', 'Pamukkale', 'Hagia Sophia'],
    featured: true
  },
  {
    id: 'russia',
    name: 'Russia',
    country: 'Russia',
    category: 'international',
    tagline: 'Red Square, Hermitage Palace & Imperial Grandeur',
    description: 'Marvel at Moscow Red Square and the Kremlin, ride the high-speed Sapsan train, and tour the Winter Palace Hermitage and Peterhof fountains in St. Petersburg.',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '6 Nights / 7 Days',
    popularExperiences: [
      'Moscow Red Square, St. Basil’s Cathedral & Kremlin Armory',
      'St. Petersburg State Hermitage Museum & Winter Palace',
      'Peterhof Grand Palace Fountains & Catherine Palace Amber Room',
      'Sapsan High-Speed Bullet Train Journey'
    ],
    bestTimeToVisit: 'May to September',
    visaInfo: 'Russia Unified E-Visa processed online in 4 days',
    highlights: ['Moscow', 'St. Petersburg', 'Red Square', 'Hermitage', 'Kremlin'],
    featured: true
  },
  {
    id: 'morocco',
    name: 'Morocco',
    country: 'Morocco',
    category: 'international',
    tagline: 'Sahara Glamping, Marrakech Souks & Chefchaouen Blue City',
    description: 'Trek Sahara dunes on camels under desert stars, explore Marrakech Jemaa el-Fnaa square, walk the blue streets of Chefchaouen, and see Hassan II mosque.',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '6 Nights / 7 Days',
    popularExperiences: [
      'Marrakech Jemaa el-Fnaa Vibrant Square & Bahia Palace',
      'Chefchaouen Enchanting Blue Pearl Mountain Town',
      'Sahara Desert Merzouga Camel Trek & Berber Glamping Camp',
      'Fes el-Bali Medieval Walled Medina & Leather Tanneries'
    ],
    bestTimeToVisit: 'October to April',
    visaInfo: 'Morocco E-Visa / Tourist Visa documentation assistance',
    highlights: ['Marrakech', 'Sahara Desert', 'Chefchaouen', 'Fes', 'Casablanca'],
    featured: true
  },
  {
    id: 'qatar',
    name: 'Qatar',
    country: 'Qatar',
    category: 'international',
    tagline: 'Doha Corniche, Souq Waqif & Inland Sea Desert Safari',
    description: 'Experience 5-star luxury along Doha Corniche, traditional spices at Souq Waqif, Katara Cultural Village, and 4x4 dune bashing at Khor Al Adaid Inland Sea.',
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '3 Nights / 4 Days',
    popularExperiences: [
      'Doha Corniche Skyline & Traditional Dhow Boat Cruise',
      'Souq Waqif Heritage Alleys, Falcon Souq & Spice Stalls',
      'Museum of Islamic Art & Katara Cultural Village',
      'Inland Sea Desert 4x4 Dune Bashing & Sandboarding'
    ],
    bestTimeToVisit: 'October to April',
    visaInfo: 'Free 30-Day Visa Waiver on Arrival for Indian Citizens',
    highlights: ['Doha', 'Souq Waqif', 'Desert Safari', 'Inland Sea', 'The Pearl'],
    featured: true
  },
  {
    id: 'oman',
    name: 'Oman',
    country: 'Oman',
    category: 'international',
    tagline: 'Sultan Qaboos Mosque, Wadi Shab Pools & Wahiba Dunes',
    description: 'Swim in the turquoise canyon pools of Wadi Shab, see majestic Sultan Qaboos Grand Mosque, explore Nizwa historic fort, and camp under stars in Wahiba Sands.',
    image: 'https://images.unsplash.com/photo-1578895101407-3532f7902dcf?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Sultan Qaboos Grand Mosque & Royal Opera House Muscat',
      'Bimmah Sinkhole & Emerald Water Swimming in Wadi Shab',
      'Wahiba Sands Golden Desert Dunes 4x4 Safari & Bedouin Camp',
      'Nizwa Fort, Historic Souq & Jebel Akhdar Green Mountain'
    ],
    bestTimeToVisit: 'October to April',
    visaInfo: 'Oman Tourist E-Visa processed quickly online',
    highlights: ['Muscat', 'Wadi Shab', 'Wahiba Sands', 'Nizwa Fort', 'Bimmah Sinkhole'],
    featured: true
  },
  {
    id: 'china',
    name: 'China',
    country: 'China',
    category: 'international',
    tagline: 'Great Wall of China, Terracotta Army & Shanghai Skyline',
    description: 'Walk the Great Wall at Mutianyu, explore the Forbidden City, see the 2,200-year-old Terracotta Warriors in Xi’an, and cruise Shanghai’s iconic Huangpu river.',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '7 Nights / 8 Days',
    popularExperiences: [
      'Mutianyu Great Wall with Cable Car & Toboggan Ride',
      'Beijing Forbidden City, Tiananmen Square & Summer Palace',
      'Xi’an Terracotta Warriors & Horses UNESCO Wonder',
      'Shanghai The Bund Skyline, Yu Garden & River Cruise'
    ],
    bestTimeToVisit: 'April to May & September to November',
    visaInfo: 'China Tourist Visa processing & biometric appointment guidance',
    highlights: ['Great Wall', 'Beijing', 'Xi’an', 'Shanghai', 'Forbidden City'],
    featured: true
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    country: 'Saudi Arabia',
    category: 'international',
    tagline: 'Ancient AlUla Hegra, Riyadh Skyline & Red Sea Jeddah',
    description: 'Uncover UNESCO Hegra tombs carved in sandstone mountains, explore Riyadh Kingdom Tower, and walk the historic coral stone alleys of Al-Balad in Jeddah.',
    image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'AlUla UNESCO Hegra Nabataean Tombs & Elephant Rock',
      'Maraya Concert Hall World’s Largest Mirrored Building',
      'Riyadh Kingdom Centre Sky Bridge & Historic Diriyah',
      'Jeddah Al-Balad Historic Coral District & Red Sea Corniche'
    ],
    bestTimeToVisit: 'October to April',
    visaInfo: 'Saudi Arabia Tourist E-Visa / Transit Visa guidance',
    highlights: ['AlUla', 'Riyadh', 'Jeddah', 'Hegra', 'Diriyah'],
    featured: true
  },
  {
    id: 'sweden',
    name: 'Sweden',
    country: 'Sweden',
    category: 'international',
    tagline: 'Stockholm Gamla Stan, Vasa Warship & Archipelago',
    description: 'Stroll cobblestone Gamla Stan medieval streets, see the 17th-century salvaged Vasa warship, tour the Royal Palace, and cruise the Stockholm archipelago.',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Stockholm Gamla Stan Old Town Colorful Medieval Buildings',
      'Vasa Museum 17th Century Preserved Warship Marvel',
      'Royal Palace of Stockholm & Drottningholm Palace',
      'Stockholm Archipelago Scenic Island Cruise'
    ],
    bestTimeToVisit: 'May to September',
    visaInfo: 'Complete Schengen Visa documentation and appointment support',
    highlights: ['Stockholm', 'Gamla Stan', 'Vasa Museum', 'Archipelago', 'Royal Palace'],
    featured: true
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    country: 'Tanzania',
    category: 'international',
    tagline: 'Serengeti Safari, Ngorongoro Crater & Zanzibar Beaches',
    description: 'Witness endless wildlife in the Serengeti, game drive inside the dramatic Ngorongoro volcanic crater, and unwind on the white beaches of Zanzibar.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '6 Nights / 7 Days',
    popularExperiences: [
      'Serengeti National Park Endless Plains & Big 5 Safari',
      'Ngorongoro Crater UNESCO World Heritage Caldera Game Drive',
      'Tarangire National Park Giant Baobabs & Elephant Herds',
      'Zanzibar Stone Town Spice Tour & Nungwi Turquoise Beaches'
    ],
    bestTimeToVisit: 'June to October & December to March',
    visaInfo: 'Tanzania E-Visa / Visa on Arrival assistance provided',
    highlights: ['Serengeti', 'Ngorongoro Crater', 'Zanzibar', 'Tarangire', 'Big 5'],
    featured: true
  },
  {
    id: 'australia',
    name: 'Australia',
    country: 'Australia',
    category: 'international',
    tagline: 'Sydney Opera House, 12 Apostles & Gold Coast Surfing',
    description: 'Tour the Sydney Opera House and Harbour Bridge, drive the iconic Great Ocean Road past the 12 Apostles in Melbourne, and see koalas on the Gold Coast.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '7 Nights / 8 Days',
    popularExperiences: [
      'Sydney Opera House Guided Inside Tour & Harbour Dinner Cruise',
      'Blue Mountains Three Sisters Rock & Scenic World Cableway',
      'Melbourne Great Ocean Road & 12 Apostles Coastal Drive',
      'Gold Coast Surfers Paradise & Currumbin Koala Wildlife Sanctuary'
    ],
    bestTimeToVisit: 'September to May',
    visaInfo: 'Australia Subclass 600 Tourist Visa documentation support',
    highlights: ['Sydney', 'Melbourne', 'Gold Coast', 'Opera House', '12 Apostles'],
    featured: true
  },
  {
    id: 'canada',
    name: 'Canada',
    country: 'Canada',
    category: 'international',
    tagline: 'Niagara Falls, Canadian Rockies & Vancouver Harbor',
    description: 'Cruise up to roaring Niagara Falls, marvel at emerald Lake Louise and Banff Rocky Mountains, and explore vibrant coastal Vancouver & Stanley Park.',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '7 Nights / 8 Days',
    popularExperiences: [
      'Niagara Falls Voyage to the Falls Boat Cruise',
      'Toronto CN Tower Observation Deck & Harbor Tour',
      'Banff National Park, Lake Louise & Moraine Lake',
      'Vancouver Stanley Park, Capilano Suspension Bridge & Gastown'
    ],
    bestTimeToVisit: 'May to October',
    visaInfo: 'Canada Tourist Visa (V-1) documentation guidance',
    highlights: ['Niagara Falls', 'Toronto', 'Banff', 'Lake Louise', 'Vancouver'],
    featured: true
  },
  {
    id: 'cambodia',
    name: 'Cambodia',
    country: 'Cambodia',
    category: 'international',
    tagline: 'Angkor Wat Sunrise, Bayon Stone Faces & Tonle Sap',
    description: 'Watch sunrise over monumental Angkor Wat, discover giant tree roots engulfing Ta Prohm, and cruise the floating villages of Tonle Sap lake.',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Angkor Wat UNESCO World Wonder Sunrise Experience',
      'Bayon Temple Enigmatic Smiling Stone Faces in Angkor Thom',
      'Ta Prohm Tomb Raider Temple Entangled in Tree Roots',
      'Tonle Sap Lake Floating Village Boat Expedition'
    ],
    bestTimeToVisit: 'November to April',
    visaInfo: 'Cambodia E-Visa / Visa on Arrival assistance',
    highlights: ['Angkor Wat', 'Siem Reap', 'Bayon Temple', 'Ta Prohm', 'Tonle Sap'],
    featured: true
  },
  {
    id: 'denmark',
    name: 'Denmark',
    country: 'Denmark',
    category: 'international',
    tagline: 'Nyhavn Canals, Tivoli Gardens & Royal Castles',
    description: 'Cruise past colorful Nyhavn waterfront houses, visit the fairy-tale Tivoli Gardens, see the Little Mermaid, and tour Renaissance Kronborg Castle.',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '4 Nights / 5 Days',
    popularExperiences: [
      'Nyhavn Colorful Waterfront & Grand Canal Boat Tour',
      'Tivoli Gardens Historic Fairy Tale Amusement Park',
      'The Little Mermaid Statue & Amalienborg Royal Palace',
      'Rosenborg Castle & Crown Jewels Collection'
    ],
    bestTimeToVisit: 'May to September',
    visaInfo: 'Schengen Visa documentation and appointment support',
    highlights: ['Copenhagen', 'Nyhavn', 'Tivoli Gardens', 'Amalienborg', 'Rosenborg'],
    featured: true
  },
  {
    id: 'egypt',
    name: 'Egypt',
    country: 'Egypt',
    category: 'international',
    tagline: 'Giza Pyramids, Nile River Cruise & Valley of the Kings',
    description: 'Stand before the Great Pyramids and Sphinx, sail a 5-star Nile cruise from Aswan to Luxor, and explore the golden tombs of Pharaohs in the Valley of the Kings.',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '6 Nights / 7 Days',
    popularExperiences: [
      'Great Pyramids of Giza & Enigmatic Great Sphinx',
      'Grand Egyptian Museum & Tutankhamun Golden Treasures',
      'Luxury Nile River Cruise from Aswan to Luxor',
      'Valley of the Kings, Karnak Temple & Abu Simbel'
    ],
    bestTimeToVisit: 'October to April',
    visaInfo: 'Egypt Tourist E-Visa processed seamlessly online',
    highlights: ['Giza Pyramids', 'Nile Cruise', 'Luxor', 'Aswan', 'Valley of Kings'],
    featured: true
  },
  {
    id: 'finland',
    name: 'Finland',
    country: 'Finland',
    category: 'international',
    tagline: 'Lapland Northern Lights, Glass Igloos & Santa Village',
    description: 'Sleep under dancing auroras in a heated glass igloo, ride husky dog sleds across Arctic snows, and visit the official Santa Claus Village in Rovaniemi.',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Sleep Under Auroras in a Heated Thermal Glass Igloo',
      'Rovaniemi Santa Claus Village & Arctic Circle Crossing',
      'Husky Sled Dog Safari & Reindeer Sleigh Ride Through Snow',
      'Aurora Borealis Guided Night Hunting Safari'
    ],
    bestTimeToVisit: 'November to March for Auroras / June to August for Midnight Sun',
    visaInfo: 'Schengen Visa documentation and appointment support',
    highlights: ['Lapland', 'Northern Lights', 'Glass Igloo', 'Santa Claus Village', 'Helsinki'],
    featured: true
  },
  {
    id: 'iceland',
    name: 'Iceland',
    country: 'Iceland',
    category: 'international',
    tagline: 'Blue Lagoon, Golden Circle & Glacial Waterfalls',
    description: 'Soak in the geothermal Blue Lagoon, marvel at Gullfoss waterfall and Strokkur geyser, walk Reynisfjara black sand beach, and see floating icebergs at Jokulsarlon.',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '5 Nights / 6 Days',
    popularExperiences: [
      'Blue Lagoon Geothermal Spa Relaxing Mineral Bath',
      'Golden Circle: Gullfoss Waterfall, Geysir & Thingvellir',
      'South Coast Black Sand Beach of Reynisfjara & Basalt Columns',
      'Jokulsarlon Glacier Lagoon Floating Icebergs & Diamond Beach'
    ],
    bestTimeToVisit: 'September to April for Auroras / June to August for Green Meadows',
    visaInfo: 'Schengen Visa documentation and appointment support',
    highlights: ['Blue Lagoon', 'Golden Circle', 'Black Sand Beach', 'Glacier Lagoon', 'Reykjavik'],
    featured: true
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    country: 'New Zealand',
    category: 'international',
    tagline: 'Milford Sound Fjords, Hobbiton Set & Queenstown Alps',
    description: 'Cruise dramatic waterfalls in Milford Sound, explore the real Hobbiton movie set, witness Rotorua geothermal geysers, and take the Skyline Gondola in Queenstown.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '8 Nights / 9 Days',
    popularExperiences: [
      'Milford Sound Fiordland National Park Cruise with Waterfalls',
      'Hobbiton Movie Set Tour & Green Dragon Inn in Matamata',
      'Rotorua Te Puia Geothermal Geysers & Maori Cultural Show',
      'Queenstown Skyline Gondola & TSS Earnslaw Steamship Cruise'
    ],
    bestTimeToVisit: 'October to April',
    visaInfo: 'New Zealand Visitor Visa / NZeTA application assistance',
    highlights: ['Milford Sound', 'Hobbiton', 'Queenstown', 'Rotorua', 'Auckland'],
    featured: true
  },
  {
    id: 'norway',
    name: 'Norway',
    country: 'Norway',
    category: 'international',
    tagline: 'Geirangerfjord, Flåm Mountain Railway & Bergen Bryggen',
    description: 'Cruise the world-famous UNESCO Geirangerfjord, ride the breathtaking Flåm Mountain Railway, and stroll through historic Bryggen wooden wharf in Bergen.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '6 Nights / 7 Days',
    popularExperiences: [
      'UNESCO Geirangerfjord & Naeroyfjord Electric Eco-Fjord Cruise',
      'World-Famous Flåm Railway (Flåmsbana) Mountain Train',
      'Bergen Historic Bryggen UNESCO Wooden Wharf & Fish Market',
      'Oslo Opera House, Vigeland Sculpture Park & Holmenkollen'
    ],
    bestTimeToVisit: 'May to September',
    visaInfo: 'Schengen Visa documentation and appointment support',
    highlights: ['Geirangerfjord', 'Flåm Railway', 'Bergen', 'Oslo', 'Fjords'],
    featured: true
  },
  {
    id: 'usa',
    name: 'USA',
    country: 'United States',
    category: 'international',
    tagline: 'New York City, Grand Canyon, Las Vegas & Hollywood',
    description: 'Stand before the Statue of Liberty, walk the Las Vegas Strip, experience the dramatic Grand Canyon West Rim Skywalk, and tour Hollywood Boulevard in Los Angeles.',
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '',
    idealDuration: '8 Nights / 9 Days',
    popularExperiences: [
      'New York City: Statue of Liberty Cruise & Empire State View',
      'Washington D.C.: Capitol Hill, White House & Smithsonian',
      'Las Vegas Strip Night Tour & Bellagio Fountains',
      'Grand Canyon West Rim Skywalk Dramatic Gorge Experience',
      'Los Angeles Hollywood Walk of Fame & Beverly Hills'
    ],
    bestTimeToVisit: 'April to October',
    visaInfo: 'USA B1/B2 Tourist Visa Application & Interview Guidance',
    highlights: ['New York', 'Las Vegas', 'Grand Canyon', 'Los Angeles', 'Washington DC'],
    featured: true
  }
];

export const NEW_31_INTERNATIONAL_PACKAGES: HolidayPackage[] = [
  {
    id: 'pkg-discover-sri-lanka',
    title: 'Discover Sri Lanka',
    destination: 'Sri Lanka',
    category: 'international',
    days: 5,
    nights: 4,
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    originalPrice: '',
    offerPrice: '',
    priceDisplayText: '',
    shortDescription: 'Explore ancient Sigiriya Rock Fortress, misty Nuwara Eliya tea hills, Temple of the Tooth in Kandy, and sunny Bentota beaches with Madu river safari.',
    fullDescription: 'Discover the Pearl of the Indian Ocean with Happy Journey Holidays. This comprehensive 5-day Sri Lanka tour covers the iconic Sigiriya Rock fortress, Dambulla cave temple, Temple of the Sacred Tooth Relic in Kandy, scenic tea plantations in Nuwara Eliya, water sports and boat safari in Bentota, and a cultural city tour of Colombo.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Sigiriya Rock Fortress UNESCO World Heritage Site',
      'Temple of the Sacred Tooth Relic in Scenic Kandy',
      'Misty Nuwara Eliya Tea Plantations & Ramboda Falls',
      'Bentota Golden Beach Water Sports & Mangrove River Safari',
      'Colombo City Tour, Dutch Hospital & Galle Face Green'
    ],
    inclusions: [
      '4-Star Hotel Accommodation with Daily Breakfast & Dinner',
      'Private AC Vehicle for all Transfers & Sightseeing',
      'Sigiriya Rock & Kandy Cultural Dance Show Entry',
      'Madu River Mangrove Boat Safari & Turtle Hatchery Visit',
      'Sri Lanka ETA Visa Assistance & Dedicated English-Speaking Driver Guide'
    ],
    exclusions: [
      'International Flight Tickets (Can be arranged on request)',
      'Sri Lanka ETA Visa Government Fee',
      'Lunches and beverages not mentioned',
      'Personal expenses, tips and camera permits'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Colombo & Transfer to Sigiriya via Pinnawala Elephant Orphanage',
      'Day 2: Climb Sigiriya Rock Fortress & Drive to Kandy via Dambulla Cave Temple',
      'Day 3: Temple of the Tooth Relic & Scenic Hill Drive to Nuwara Eliya Tea Country',
      'Day 4: Nuwara Eliya to Bentota Beach & Madu River Mangrove Boat Safari',
      'Day 5: Colombo City Tour, Souvenir Shopping & Airport Departure'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Colombo & Transfer to Sigiriya',
        description: 'Arrive at Bandaranaike International Airport in Colombo. Meet our representative and drive towards Sigiriya. En route, visit Pinnawala Elephant Orphanage to watch elephants bathe in the river. Check-in to hotel and relax.'
      },
      {
        day: 2,
        title: 'Sigiriya Rock Fortress & Kandy Transfer',
        description: 'Morning climb to the summit of the 5th-century Sigiriya Rock Fortress (Lion Rock) with ancient frescoes. Afterwards, visit Dambulla Golden Cave Temple and drive through spice gardens to the hill capital of Kandy. Attend an evening traditional Kandyan cultural dance show.'
      },
      {
        day: 3,
        title: 'Kandy Temple of Tooth & Nuwara Eliya Tea Hills',
        description: 'Visit the sacred Temple of the Tooth Relic by Kandy Lake. Drive through picturesque winding mountains to Nuwara Eliya, Little England. Visit a working tea factory, tea plantations, and Ramboda Falls.'
      },
      {
        day: 4,
        title: 'Nuwara Eliya to Bentota Beach',
        description: 'Descend the lush hills towards the golden beaches of Bentota. Take a boat safari along the Madu River through mangrove tunnels and visit the Kosgoda Turtle Conservation Project.'
      },
      {
        day: 5,
        title: 'Colombo City Tour & Departure',
        description: 'Transfer to Colombo for a panoramic city tour: Independence Square, Gangaramaya Temple, Galle Face Green promenade, and Dutch Hospital. Evening transfer to Colombo Airport for your flight.'
      }
    ],
    bookingInformation: 'Passports must have minimum 6 months validity from travel date. Rates subject to seasonal availability. Flight bookings from Coimbatore or Chennai can be arranged on request.',
    bestFor: 'Couples, Families & Nature Lovers',
    featured: true,
    isHidden: false,
    sortOrder: 20
  },
  {
    id: 'pkg-discover-nepal',
    title: 'Discover Nepal',
    destination: 'Nepal',
    category: 'international',
    days: 5,
    nights: 4,
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    originalPrice: '',
    offerPrice: '',
    priceDisplayText: '',
    shortDescription: 'Experience majestic Annapurna views, tranquil boating on Pokhara Phewa Lake, Sarangkot sunrise, and holy Pashupatinath & Boudhanath temples in Kathmandu.',
    fullDescription: 'Discover the Himalayan jewel with Happy Journey Holidays. Explore the spiritual temples of Kathmandu valley, take in panoramic Himalayan sunrises over Annapurna & Machapuchare peaks in Sarangkot, and enjoy leisure boating on Phewa Lake in Pokhara.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Pashupatinath Temple & Boudhanath Stupa in Kathmandu',
      'Pokhara Phewa Lake Boating with Annapurna Mountain Views',
      'Sarangkot Sunrise over Snowcapped Himalayan Peaks',
      'Devi’s Fall, Gupteshwor Mahadev Cave & World Peace Pagoda',
      'Swayambhunath Monkey Temple Panoramic Valley View'
    ],
    inclusions: [
      'Deluxe Hotel Accommodation with Daily Breakfast',
      'Private Transportation Kathmandu to Pokhara with Sightseeing',
      'Phewa Lake Boat Ride & Sarangkot Sunrise Excursion',
      'English-Speaking Local Tour Guide in Kathmandu & Pokhara',
      'All Applicable Monument Entrance Permits & Taxes'
    ],
    exclusions: [
      'Air tickets to/from Kathmandu (KTM)',
      'Lunches, dinners and beverages not specified',
      'Paragliding / Ultralight flight in Pokhara (Optional)',
      'Personal expenses, tips and travel insurance'
    ],
    itinerarySummary: [
      'Day 1: Arrival at Tribhuvan Airport Kathmandu & Pashupatinath Evening Aarti',
      'Day 2: Scenic Drive / Flight to Pokhara & Leisure Boating on Phewa Lake',
      'Day 3: Early Morning Sarangkot Sunrise & Pokhara City Sightseeing',
      'Day 4: Return to Kathmandu, Visit Boudhanath Stupa & Swayambhunath',
      'Day 5: Thamel Market Souvenir Shopping & Flight Departure'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Kathmandu',
        description: 'Arrive at Tribhuvan International Airport in Kathmandu. Transfer to hotel. In the evening, visit the sacred Pashupatinath Temple on the banks of Bagmati River for the grand evening Aarti ceremony.'
      },
      {
        day: 2,
        title: 'Kathmandu to Pokhara',
        description: 'Drive along the scenic Trishuli River to the picturesque valley of Pokhara. Check in to your lakeside hotel. Spend the evening boating on Phewa Lake with reflections of the Annapurna range.'
      },
      {
        day: 3,
        title: 'Sarangkot Sunrise & Pokhara Sights',
        description: 'Early morning drive to Sarangkot hill for a breathtaking sunrise over Mount Annapurna, Dhaulagiri, and Machapuchare (Fishtail). Return for breakfast, then visit Devi’s Fall, Gupteshwor Mahadev Cave, and the Tibetan Refugee Camp.'
      },
      {
        day: 4,
        title: 'Pokhara to Kathmandu & Boudhanath',
        description: 'Drive back to Kathmandu. Visit the massive Boudhanath Stupa, center of Tibetan Buddhism, and the hilltop Swayambhunath (Monkey Temple) offering panoramic views over Kathmandu Valley.'
      },
      {
        day: 5,
        title: 'Thamel Shopping & Departure',
        description: 'Explore the colorful streets of Thamel for pashmina shawls, singing bowls, and handicrafts. Transfer to Kathmandu Airport for your onward flight.'
      }
    ],
    bookingInformation: 'Indian nationals can travel with valid Passport or Election Voter ID card. No visa required.',
    bestFor: 'Himalayan Vistas, Spiritual & Adventure',
    featured: true,
    isHidden: false,
    sortOrder: 21
  },
  {
    id: 'pkg-discover-bhutan',
    title: 'Discover Bhutan',
    destination: 'Bhutan',
    category: 'international',
    days: 6,
    nights: 5,
    duration: '5 Nights / 6 Days',
    startingPrice: '',
    originalPrice: '',
    offerPrice: '',
    priceDisplayText: '',
    shortDescription: 'Hike to the legendary cliffside Tiger’s Nest Monastery, visit historic Punakha Dzong at the river confluence, and discover peaceful Thimphu valley.',
    fullDescription: 'Discover the Land of the Thunder Dragon. Immerse yourself in the tranquility of the Himalayas with visits to Thimphu’s giant Buddha Dordenma, the 108 memorial chortens at Dochula Pass, majestic Punakha Dzong, and the iconic hike to Paro Taktsang (Tiger’s Nest).',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Iconic Tiger’s Nest Monastery (Paro Taktsang) Cliff Hike',
      'Punakha Dzong Majestic Fortress at the Confluence of Rivers',
      'Thimphu Buddha Dordenma Giant Bronze Statue',
      'Dochula Pass 108 Memorial Chortens & Himalayan Panorama',
      'Authentic Bhutanese Cultural Village & Traditional Archery'
    ],
    inclusions: [
      '3-Star & 4-Star Certified Bhutanese Heritage Hotels',
      'All Meals (Breakfast, Lunch & Dinner) Included Throughout Tour',
      'Government Sustainable Development Fee (SDF) & Entry Permits',
      'Private Vehicle with Dedicated Licensed Bhutanese Tour Guide',
      'Traditional Bhutanese Hot Stone Bath Experience'
    ],
    exclusions: [
      'International flights to Paro (PBH)',
      'Personal expenses, laundry, and beverage charges',
      'Horse ride charges for Tiger’s Nest hike (optional)'
    ],
    itinerarySummary: [
      'Day 1: Arrival at Paro International Airport & Scenic Drive to Thimphu',
      'Day 2: Thimphu Sightseeing: Buddha Point, Memorial Chorten & Folk Museum',
      'Day 3: Scenic Drive to Punakha via Dochula Pass & Punakha Dzong',
      'Day 4: Punakha Suspension Bridge & Transfer back to Paro Valley',
      'Day 5: Spectacular Hike to Tiger’s Nest Monastery (Taktsang)',
      'Day 6: Paro Valley Viewpoint & Departure Flight'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Paro & Drive to Thimphu',
        description: 'Fly into Paro with spectacular Himalayan views. Meet our guide and drive along the river to Thimphu, Bhutan’s capital. Check into hotel and stroll through the craft bazaar.'
      },
      {
        day: 2,
        title: 'Thimphu Heritage Tour',
        description: 'Visit the gigantic Buddha Dordenma statue overlooking Thimphu valley, the National Memorial Chorten, Motithang Takin Preserve, and the National Textile Museum.'
      },
      {
        day: 3,
        title: 'Thimphu to Punakha via Dochula Pass',
        description: 'Drive over Dochula Pass (3,100m) marked by 108 memorial chortens and panoramic Himalayan peaks. Descend into the sub-tropical Punakha valley and visit the majestic 17th-century Punakha Dzong.'
      },
      {
        day: 4,
        title: 'Punakha Suspension Bridge to Paro',
        description: 'Walk across Bhutan’s longest suspension bridge in Punakha. Drive back to Paro valley. Visit the National Museum (Ta Dzong) and Rinpung Dzong fortress.'
      },
      {
        day: 5,
        title: 'Tiger’s Nest Monastery Hike',
        description: 'Embark on the iconic pilgrimage hike to Paro Taktsang (Tiger’s Nest Monastery), clinging dramatically to a granite cliff 900 meters above Paro valley. Enjoy an evening traditional hot stone bath.'
      },
      {
        day: 6,
        title: 'Departure from Paro',
        description: 'Transfer to Paro International Airport for your departure flight.'
      }
    ],
    bookingInformation: 'Entry permits and Sustainable Development Fee (SDF) processed by Happy Journey Holidays.',
    bestFor: 'Culture, Serenity & Mountain Landscapes',
    featured: true,
    isHidden: false,
    sortOrder: 22
  },
  {
    id: 'pkg-discover-kenya',
    title: 'Discover Kenya',
    destination: 'Kenya',
    category: 'international',
    days: 6,
    nights: 5,
    duration: '5 Nights / 6 Days',
    startingPrice: '',
    originalPrice: '',
    offerPrice: '',
    priceDisplayText: '',
    shortDescription: 'Witness the iconic Great Migration in Masai Mara, spot leopards and lions on thrilling 4x4 game drives, and see pink flamingos across Lake Nakuru.',
    fullDescription: 'Experience the ultimate African safari adventure with Happy Journey Holidays. Traverse the sweeping savannahs of Masai Mara National Reserve tracking the Big Five (Lion, Leopard, Elephant, Rhino, Buffalo), cruise Lake Naivasha to see hippos, and discover Lake Nakuru’s flamingos.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'World-Famous Masai Mara National Reserve Big 5 Game Drives',
      'Lake Nakuru Flocks of Pink Flamingos & Rhino Sanctuary',
      'Lake Naivasha Boat Safari & Crescent Island Walking Safari',
      'Authentic Maasai Tribal Village Cultural Experience',
      'Nairobi Giraffe Centre & Karen Blixen Museum Tour'
    ],
    inclusions: [
      'Luxury Safari Lodges & Tented Camps with All Meals on Safari',
      'Custom 4x4 Land Cruiser Safari Vehicle with Pop-up Roof',
      'All National Park & Reserve Entry Conservation Fees',
      'Experienced Professional English-Speaking Safari Guide',
      'Unlimited Game Drives & Lake Naivasha Boat Cruise'
    ],
    exclusions: [
      'International flights to Nairobi (NBO)',
      'Kenya eTA fee & Yellow Fever vaccination certificate',
      'Hot air balloon safari in Masai Mara (Optional)',
      'Tips for safari driver-guide and lodge staff'
    ],
    itinerarySummary: [
      'Day 1: Arrival in Nairobi & Transfer to Lake Nakuru National Park',
      'Day 2: Game Drive at Lake Nakuru & Afternoon Transfer to Lake Naivasha',
      'Day 3: Lake Naivasha Boat Cruise & Drive to Legendary Masai Mara',
      'Day 4: Full Day Game Drive in Masai Mara Tracking Lions, Elephants & Cheetahs',
      'Day 5: Morning Safari Game Drive & Traditional Maasai Village Visit',
      'Day 6: Return Drive to Nairobi, Giraffe Centre Visit & Airport Drop'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival in Nairobi & Drive to Lake Nakuru',
        description: 'Arrive at Jomo Kenyatta Airport Nairobi. Meet your safari guide and drive via the Great Rift Valley viewpoint to Lake Nakuru National Park. Afternoon game drive to view rhinos and flamingos.'
      },
      {
        day: 2,
        title: 'Lake Nakuru to Lake Naivasha',
        description: 'Morning game drive in Nakuru. Drive to freshwater Lake Naivasha. Afternoon boat safari on the lake spotting hippos, fish eagles, and a walking safari on Crescent Island.'
      },
      {
        day: 3,
        title: 'Lake Naivasha to Masai Mara Reserve',
        description: 'Drive across the Great Rift Valley floor into the world-famous Masai Mara Game Reserve. Arrive in time for lunch at your safari camp followed by an introductory sunset game drive.'
      },
      {
        day: 4,
        title: 'Full Day Masai Mara Safari',
        description: 'Spend a full day exploring the endless plains of the Mara with packed picnic lunch by the Mara River. Track prides of lions, cheetahs, elephants, giraffes, and wildebeest.'
      },
      {
        day: 5,
        title: 'Morning Safari & Maasai Village',
        description: 'Early morning game drive when predators are most active. In the afternoon, visit an authentic Maasai boma to learn about their nomadic customs, warrior dances, and beadwork.'
      },
      {
        day: 6,
        title: 'Masai Mara to Nairobi & Departure',
        description: 'Morning scenic drive back to Nairobi. Visit the Giraffe Centre to hand-feed endangered Rothschild giraffes. Transfer to Nairobi airport for your flight.'
      }
    ],
    bookingInformation: 'Yellow fever vaccination certificate required. Best migration season is July to October.',
    bestFor: 'Big 5 Safari, Wildlife & Adventure',
    featured: true,
    isHidden: false,
    sortOrder: 23
  },
  {
    id: 'pkg-discover-holy-land',
    title: 'Discover Holy Land',
    destination: 'Holy Land',
    category: 'international',
    days: 8,
    nights: 7,
    duration: '7 Nights / 8 Days',
    startingPrice: '',
    originalPrice: '',
    offerPrice: '',
    priceDisplayText: '',
    shortDescription: 'Follow the historic and sacred paths in Jerusalem, Bethlehem, Nazareth, Sea of Galilee, and experience effortless floating in the Dead Sea.',
    fullDescription: 'Embark on a profound and inspiring journey across the Holy Land with Happy Journey Holidays. Walk through the Old City of Jerusalem, the Church of the Holy Sepulchre, Western Wall, Mount of Olives, Bethlehem Church of the Nativity, Nazareth, the Sea of Galilee, and float on the mineral-rich Dead Sea.',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Jerusalem Old City, Western Wall & Church of the Holy Sepulchre',
      'Bethlehem Church of the Nativity & Shepherds’ Field',
      'Nazareth Basilica of the Annunciation & Sea of Galilee Boat Ride',
      'Float on the Mineral-Rich Waters of the Dead Sea',
      'Mount of Olives, Garden of Gethsemane & Capernaum'
    ],
    inclusions: [
      '4-Star Hotels with Daily Buffet Breakfast & Dinner',
      'Comfortable AC Luxury Coach for all Guided Excursions',
      'Sea of Galilee Wooden Boat Ride & Dead Sea Resort Access',
      'Professional Spiritual / Historical Licensed Tour Guide',
      'Complete Visa Assistance & All Site Admission Tickets'
    ],
    exclusions: [
      'International Flight Tickets',
      'Lunches and beverages',
      'Tips for guide and driver',
      'Travel and medical insurance'
    ],
    itinerarySummary: [
      'Day 1: Arrival & Welcome to the Holy Land, Transfer to Hotel',
      'Day 2: Tel Aviv, Jaffa Port & Drive to Nazareth and Cana',
      'Day 3: Sea of Galilee Boat Ride, Mount of Beatitudes & Capernaum',
      'Day 4: Jordan River Baptismal Site, Jericho & Ascent to Jerusalem',
      'Day 5: Mount of Olives, Garden of Gethsemane, Via Dolorosa & Holy Sepulchre',
      'Day 6: Bethlehem Church of the Nativity, Milk Grotto & Shepherd Field',
      'Day 7: Masada Fortress & Floating Experience in the Dead Sea',
      'Day 8: Western Wall Prayer, Mount Zion & Departure'
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: 'Arrival & Welcome to the Holy Land',
        description: 'Arrive at Ben Gurion Airport Tel Aviv. Meet our tour guide and transfer to your hotel in the coastal region for dinner and overnight stay.'
      },
      {
        day: 2,
        title: 'Jaffa, Caesarea & Nazareth',
        description: 'Visit the ancient port city of Old Jaffa. Travel north to Caesarea Maritima and continue to Nazareth. Tour the Basilica of the Annunciation and Mary’s Well, followed by Cana of Galilee.'
      },
      {
        day: 3,
        title: 'Sea of Galilee & Mount of Beatitudes',
        description: 'Take a serene wooden boat ride across the Sea of Galilee. Visit Capernaum (Town of Jesus), Tabgha (Church of the Multiplication of the Loaves and Fishes), and the Mount of Beatitudes.'
      },
      {
        day: 4,
        title: 'Jordan River to Jerusalem',
        description: 'Visit the Yardenit Baptismal site on the Jordan River. Pass through ancient Jericho and ascend to the holy city of Jerusalem. Check in to hotel.'
      },
      {
        day: 5,
        title: 'Jerusalem Old City & Via Dolorosa',
        description: 'Panoramic view from the Mount of Olives. Walk down Palm Sunday Road to the Garden of Gethsemane. Enter the Old City through Lion’s Gate, follow the Via Dolorosa (Stations of the Cross) to the Church of the Holy Sepulchre.'
      },
      {
        day: 6,
        title: 'Bethlehem & Shepherd’s Field',
        description: 'Visit Bethlehem and the Church of the Nativity, built over the grotto where Jesus was born. Continue to the Milk Grotto and the Shepherd’s Field with local olive-wood craftsmen.'
      },
      {
        day: 7,
        title: 'Dead Sea & Masada',
        description: 'Travel through the Judean Desert to Masada cliff fortress via cable car. Spend the afternoon floating effortlessly on the mineral-rich waters of the Dead Sea.'
      },
      {
        day: 8,
        title: 'Western Wall & Departure',
        description: 'Visit the Western Wall (Kotel) and Mount Zion (Room of the Last Supper & King David’s Tomb). Transfer to the airport for your flight back home.'
      }
    ],
    bookingInformation: 'Passports must have minimum 6 months validity. Group departures with spiritual guides available throughout the year.',
    bestFor: 'Pilgrimage, History & Sacred Heritage',
    featured: true,
    isHidden: false,
    sortOrder: 24
  }
];

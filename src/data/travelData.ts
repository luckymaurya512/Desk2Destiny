export interface Destination {
  id: string;
  name: string;
  country: string;
  category: 'Mountains' | 'Cultural' | 'Coastal' | 'Adventure';
  price: number;
  imageUrl: string;
  shortDesc: string;
  highlights: string[];
  bestSeason: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  durationDays?: number;
}

export interface PackageItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string;
  stay?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string; // e.g. "7 Days / 6 Nights"
  groupSize: string; // e.g. "Max 10 guests"
  price: number;
  imageUrl: string;
  inclusions: string[]; // e.g. 3 key inclusions
  featuredBadge?: string;
  itinerary: PackageItineraryDay[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  tripTaken: string;
  rating: number;
  quote: string;
  avatarUrl: string;
  year: string;
}

export interface TrustStat {
  label: string;
  value: string;
  subtext: string;
}

export const TRUST_STATS: TrustStat[] = [
  {
    label: "Travelers Guided",
    value: "14,800+",
    subtext: "Across 42 countries worldwide"
  },
  {
    label: "Curated Routes",
    value: "120+",
    subtext: "Handcrafted boutique itineraries"
  },
  {
    label: "Average Rating",
    value: "4.96 / 5",
    subtext: "Based on 3,400+ verified traveler reviews"
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: "dest-1",
    name: "Cappadocia Valleys",
    country: "Turkey",
    category: "Adventure",
    price: 1850,
    imageUrl: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Drift in golden hot-air balloons over surreal fairy chimneys and ancient cave dwellings.",
    highlights: [
      "Sunrise hot-air balloon flight over Love Valley",
      "Private cave suite stay in Göreme",
      "Guided subterranean tour of Derinkuyu Underground City",
      "Sunset horseback ride across Red Valley"
    ],
    bestSeason: "April – June & September – November",
    difficulty: "Easy",
    durationDays: 5
  },
  {
    id: "dest-2",
    name: "Dolomites Alpine Peaks",
    country: "Italy",
    category: "Mountains",
    price: 2400,
    imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Dramatic limestone peaks, emerald glacial lakes, and secluded mountain rifugi.",
    highlights: [
      "Circumnavigation trek of Tre Cime di Lavaredo",
      "Sunset photo safari at Lago di Braies",
      "South Tyrolean farm-to-table wine pairings",
      "Stargazing at 2,400m high-altitude lodge"
    ],
    bestSeason: "June – September",
    difficulty: "Moderate",
    durationDays: 7
  },
  {
    id: "dest-3",
    name: "Kyoto Bamboo Groves & Temples",
    country: "Japan",
    category: "Cultural",
    price: 2750,
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Centuries of Zen gardens, timeless geisha districts, and peaceful moss sanctuaries.",
    highlights: [
      "Private morning tea ceremony with a Zen master",
      "Dawn stroll through Arashiyama bamboo path before crowds",
      "Traditional multi-course Kaiseki dinner in Gion",
      "Historic temple calligraphy and meditation retreat"
    ],
    bestSeason: "March – May (Cherry Blossom) & October – November (Autumn Leaves)",
    difficulty: "Easy",
    durationDays: 8
  },
  {
    id: "dest-4",
    name: "Amalfi Cliffside Coast",
    country: "Italy",
    category: "Coastal",
    price: 2950,
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Pastel villages clinging to sheer sea cliffs, sun-drenched lemon groves, and azure waters.",
    highlights: [
      "Private wooden gozzo boat charter to Capri and hidden grottos",
      "Path of the Gods clifftop panoramic hike",
      "Ravello clifftop garden aperitivo at sunset",
      "Artisanal limoncello distillery visit"
    ],
    bestSeason: "May – October",
    difficulty: "Moderate",
    durationDays: 6
  },
  {
    id: "dest-5",
    name: "Patagonia Glacier Frontier",
    country: "Chile & Argentina",
    category: "Adventure",
    price: 3600,
    imageUrl: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Jagged granite horns, thunderous glacial calving, and pristine Patagonian steppe.",
    highlights: [
      "Torres del Paine 'W' highlights with certified mountain guides",
      "Ice trekking with crampons on Perito Moreno Glacier",
      "Gaucho estancia barbecue and horseback riding",
      "Eco-dome lodge stay beneath the Southern Cross"
    ],
    bestSeason: "November – March",
    difficulty: "Challenging",
    durationDays: 10
  },
  {
    id: "dest-6",
    name: "Marrakech Medina & Atlas",
    country: "Morocco",
    category: "Cultural",
    price: 1950,
    imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Sensory spice markets, tranquil riad courtyards, and ancient Berber mountain hamlets.",
    highlights: [
      "Curated antique and textile souk tour with local architectural historian",
      "Day excursion to high Atlas Berber villages & mint tea ceremony",
      "Sunset camel trek through Agafay stone desert",
      "Private hammam wellness ritual"
    ],
    bestSeason: "October – April",
    difficulty: "Easy",
    durationDays: 6
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "pkg-1",
    title: "Cappadocia & Lycian Odyssey",
    subtitle: "Celestial skies, subterranean secrets & turquoise Mediterranean coast",
    duration: "6 Days / 5 Nights",
    groupSize: "Small Group (Max 8)",
    price: 2150,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    featuredBadge: "Most Popular",
    inclusions: [
      "Boutique Cave & Coastal Stays",
      "Sunrise Hot-Air Balloon Flight Included",
      "Private Chauffeur & All Airport Transfers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Göreme & Welcome Dinner",
        description: "Check into handcrafted cave suites overlooking the volcanic valley. Gather for an evening welcome reception featuring local Anatolian wines and sunset views.",
        meals: "Dinner Included",
        stay: "Museum Cave Hotel"
      },
      {
        day: 2,
        title: "Sunrise Balloon Flight & Devrent Valley",
        description: "Float at dawn over fairy chimneys. Afternoon exploration of Monks Valley and open-air rock-cut churches with a specialist art historian.",
        meals: "Breakfast & Lunch",
        stay: "Museum Cave Hotel"
      },
      {
        day: 3,
        title: "Derinkuyu Underground Citadel & Ihlara Gorge",
        description: "Descend into multi-level subterranean sanctuary caves followed by a serene river walk alongside cascading streams in Ihlara canyon.",
        meals: "Breakfast & Traditional Lunch",
        stay: "Museum Cave Hotel"
      },
      {
        day: 4,
        title: "Flight to Antalya & Mediterranean Coast",
        description: "Short scenic flight to the Turkish Riviera. Settle into a clifftop boutique hotel and enjoy fresh seafood dining along the marina.",
        meals: "Breakfast & Seafood Dinner",
        stay: "Villa Mahal Coastal Retreat"
      },
      {
        day: 5,
        title: "Private Gulet Yacht Sailing & Sunken Ruins",
        description: "Board a classic wooden yacht to explore Kekova sunken ruins, swim in sapphire coves, and picnic on deck with Mediterranean delicacies.",
        meals: "Breakfast & Coastal Deck Lunch",
        stay: "Villa Mahal Coastal Retreat"
      },
      {
        day: 6,
        title: "Farewell Breakfast & Departure",
        description: "Private departure transfer to Dalaman / Antalya international airport with curated farewell gifts.",
        meals: "Artisanal Breakfast",
        stay: "Departure"
      }
    ]
  },
  {
    id: "pkg-2",
    title: "Dolomites High Alpine Sanctuary",
    subtitle: "Immersive limestone ridgelines, alpine meadows & Michelin-starred huts",
    duration: "7 Days / 6 Nights",
    groupSize: "Boutique Group (Max 6)",
    price: 2890,
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    featuredBadge: "Handcrafted Expedition",
    inclusions: [
      "Luxury Alpine Chalets & High Rifugi",
      "Certified UIAGM Mountain Mountain Guide",
      "Gourmet Dining & Regional Wine Pairings"
    ],
    itinerary: [
      {
        day: 1,
        title: "Venice to Cortina d'Ampezzo",
        description: "Private pickup at Venice Marco Polo and panoramic transfer up into the dramatic heart of Cortina d'Ampezzo. Evening briefing and welcome dinner.",
        meals: "Welcome Alpine Banquet",
        stay: "Rosapetra Spa Resort"
      },
      {
        day: 2,
        title: "Tre Cime di Lavaredo Loop",
        description: "Traverse the iconic three peaks with private geological guide, taking in 360-degree vistas across Cadini di Misurina.",
        meals: "Breakfast & High Refuge Lunch",
        stay: "Rosapetra Spa Resort"
      },
      {
        day: 3,
        title: "Cinque Torri & Open Air WWI Museum",
        description: "Hike through natural stone arches and historic mountain trenches, followed by strudel tasting in a sunlit rifugio meadow.",
        meals: "Breakfast & Lunch",
        stay: "Rifugio Averau (High Elevation Lodge)"
      },
      {
        day: 4,
        title: "Seceda Ridge & Val Gardena",
        description: "Panoramic ridgeline trail along the sheer blade edges of Seceda, descending into verdant pastures filled with wildflowers.",
        meals: "Breakfast & Ladin Dinner",
        stay: "Adler Spa Resort Dolomites"
      },
      {
        day: 5,
        title: "Alpe di Siusi Rolling Meadows",
        description: "Explore Europe's largest high-altitude alpine meadow on e-bike and foot, framed by the towering Sciliar massif.",
        meals: "Breakfast & Farm Lunch",
        stay: "Adler Spa Resort Dolomites"
      },
      {
        day: 6,
        title: "Glacial Lake Braies & Sunset Aperitivo",
        description: "Morning rowboat experience on crystal clear waters, followed by wine tasting at a biodynamic South Tyrolean vineyard.",
        meals: "Breakfast & Wine Cellar Feast",
        stay: "Adler Spa Resort Dolomites"
      },
      {
        day: 7,
        title: "Morning Spa & Return Transfer",
        description: "Relaxing hydrotherapy morning before seamless private return transfer to Venice or Innsbruck.",
        meals: "Breakfast Included",
        stay: "Departure"
      }
    ]
  },
  {
    id: "pkg-3",
    title: "Kyoto Spirit & Ancient Trails",
    subtitle: "Master artisans, dawn meditations & imperial mountain paths",
    duration: "8 Days / 7 Nights",
    groupSize: "Exclusive (Max 8)",
    price: 3450,
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    featuredBadge: "Cultural Masterpiece",
    inclusions: [
      "Authentic Luxury Ryokans with Onsen",
      "Private Curated Temple Access & Tea Master",
      "High-Speed Shinkansen Green Car Passes"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Ancient Kyoto",
        description: "Personal greeting at Kansai or Kyoto station, escort to a centuries-old machiya ryokan. Evening stroll through stone-paved Gion.",
        meals: "Kaiseki Dinner",
        stay: "Hiiragiya Traditional Ryokan"
      },
      {
        day: 2,
        title: "Dawn at Fushimi Inari & Zen Meditation",
        description: "Walk the thousands of vermilion torii gates at first light before the crowds, followed by a private zazen session at Kennin-ji temple.",
        meals: "Breakfast & Shojin Ryori Lunch",
        stay: "Hiiragiya Traditional Ryokan"
      },
      {
        day: 3,
        title: "Arashiyama Secret Gardens & River Cruise",
        description: "Explore quiet moss gardens and bamboo groves with a local botanist, finishing with a private wooden flat-bottom boat trip along the Oi River.",
        meals: "Breakfast & Tofu Cuisine Lunch",
        stay: "Hoshinoya Kyoto"
      },
      {
        day: 4,
        title: "Philosopher's Path & Artisan Workshops",
        description: "Visit master ceramicists and sword craftsmen in Higashiyama, followed by private tea ceremony in a historic garden pavilion.",
        meals: "Breakfast & Matcha Tasting",
        stay: "Hoshinoya Kyoto"
      },
      {
        day: 5,
        title: "Day Journey to Historic Nara",
        description: "Encounter free-roaming sacred deer in ancient cedar groves and marvel at the colossal bronze Great Buddha at Todai-ji.",
        meals: "Breakfast & Regional Bento",
        stay: "Hoshinoya Kyoto"
      },
      {
        day: 6,
        title: "Cedar Forests of Mount Hiei",
        description: "Ascend the cradle of Japanese Buddhism on sacred mountain trails overlooking Lake Biwa.",
        meals: "Breakfast & Mountain Feast",
        stay: "Hoshinoya Kyoto"
      },
      {
        day: 7,
        title: "Grand Farewell Kaiseki with Geiko Performance",
        description: "An exclusive cultural evening of classical music, dance, and seasonal culinary artistry.",
        meals: "Breakfast & Gala Dinner",
        stay: "Hoshinoya Kyoto"
      },
      {
        day: 8,
        title: "Morning Tea & Departure",
        description: "Peaceful morning garden contemplation before private transfer to your ongoing departure station.",
        meals: "Traditional Breakfast",
        stay: "Departure"
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Eleanor & Marcus Vance",
    location: "London, United Kingdom",
    tripTaken: "Cappadocia & Lycian Odyssey",
    rating: 5,
    quote: "Floating above the misty valleys at dawn was pure magic. Desk2Destiny handled every transition with quiet precision. We never felt rushed—only deeply immersed.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    year: "September 2026"
  },
  {
    id: "test-2",
    name: "Julian Thorne",
    location: "Zurich, Switzerland",
    tripTaken: "Dolomites High Alpine Sanctuary",
    rating: 5,
    quote: "As an avid hiker, I was amazed by how pristine and remote the route felt. Staying in the high elevation rifugi with five-star hospitality is something I will never forget.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    year: "July 2026"
  },
  {
    id: "test-3",
    name: "Dr. Amara Okafor",
    location: "San Francisco, USA",
    tripTaken: "Kyoto Spirit & Ancient Trails",
    rating: 5,
    quote: "The private temple access before general opening hours made me tear up. The thoughtful storytelling of our guide brought Japanese history alive with immense respect and grace.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    year: "May 2026"
  },
  {
    id: "test-4",
    name: "Sofia & Carlos Mendez",
    location: "Barcelona, Spain",
    tripTaken: "Patagonia Glacier Frontier",
    rating: 5,
    quote: "Every detail was flawless. The eco-dome stays, the ice trekking guides, the warm fires at night—it struck the absolute perfect harmony between raw wilderness and barefoot luxury.",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    year: "February 2026"
  }
];


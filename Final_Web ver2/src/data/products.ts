import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'RG 1/144 RX-78-2 Gundam',
    price: 19.99,
    originalPrice: 24.99,
    discountPercentage: 20,
    description: 'Real Grade 1/144 scale model of the iconic RX-78-2 Gundam. Features incredible detail and articulation with an inner frame system.',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'gundam',
    subcategory: 'Real Grade',
    scale: '1/144',
    series: 'Mobile Suit Gundam',
    manufacturer: 'Bandai',
    releaseDate: '2010',
    difficulty: 'Intermediate',
    rating: 4.8,
    reviews: 342,
    inStock: true,
    hasModel3D: true,
    modelUrl: '/models/rx78-2.glb',
    features: ['Inner frame system', 'Realistic proportions', 'Multiple weapons', 'Action base compatible'],
    specifications: {
      height: '18cm',
      weight: '150g',
      articulation: 'Full body articulation',
      accessories: ['Beam Rifle', 'Shield', 'Beam Sabers', 'Bazooka']
    },
    tags: ['UC', 'Federation', 'Protagonist', 'Classic'],
    priceRange: 'budget'
  },
  {
    id: '2',
    name: 'MG 1/100 Strike Freedom Gundam',
    price: 47.99,
    originalPrice: 59.99,
    discountPercentage: 20,
    description: 'Master Grade Strike Freedom with full burst mode wings and dragoon system. Premium detail and engineering.',
    image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'gundam',
    subcategory: 'Master Grade',
    scale: '1/100',
    series: 'Gundam SEED Destiny',
    manufacturer: 'Bandai',
    releaseDate: '2006',
    difficulty: 'Advanced',
    rating: 4.9,
    reviews: 198,
    inStock: true,
    hasModel3D: true,
    modelUrl: '/models/strike-freedom.glb',
    features: ['Full burst mode', 'Dragoon system', 'LED compatible', 'Action base included'],
    specifications: {
      height: '23cm',
      weight: '280g',
      articulation: 'Full body with wing articulation',
      accessories: ['Beam Rifles', 'Railguns', 'Beam Sabers', 'Dragoons']
    },
    tags: ['CE', 'ZAFT', 'Protagonist', 'Wings'],
    priceRange: 'premium'
  },
  {
    id: '3',
    name: 'PG 1/60 Unicorn Gundam',
    price: 199.99,
    description: 'Perfect Grade Unicorn Gundam with LED unit and transformation mechanism. The ultimate Gunpla experience.',
    image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'gundam',
    subcategory: 'Perfect Grade',
    scale: '1/60',
    series: 'Gundam Unicorn',
    manufacturer: 'Bandai',
    releaseDate: '2014',
    difficulty: 'Expert',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    hasModel3D: true,
    modelUrl: '/models/unicorn.glb',
    features: ['LED lighting system', 'Transformation mechanism', 'Psycho-frame detail', 'Premium finish'],
    specifications: {
      height: '37cm',
      weight: '1.2kg',
      articulation: 'Full transformation capability',
      accessories: ['Beam Magnum', 'Shield', 'Beam Sabers', 'LED Unit']
    },
    tags: ['UC', 'Federation', 'Newtype', 'Transform'],
    priceRange: 'luxury'
  },
  {
    id: '4',
    name: 'HG 1/144 Barbatos Lupus Rex',
    price: 15.99,
    originalPrice: 19.99,
    discountPercentage: 20,
    description: 'High Grade Barbatos Lupus Rex from Iron-Blooded Orphans. Features the iconic mace and tail blade.',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'gundam',
    subcategory: 'High Grade',
    scale: '1/144',
    series: 'Iron-Blooded Orphans',
    manufacturer: 'Bandai',
    releaseDate: '2017',
    difficulty: 'Beginner',
    rating: 4.7,
    reviews: 189,
    inStock: true,
    hasModel3D: true,
    modelUrl: '/models/barbatos-lupus-rex.glb',
    features: ['Iconic weapons', 'Color separation', 'Action poses', 'Stickers included'],
    specifications: {
      height: '18cm',
      weight: '140g',
      articulation: 'Standard HG articulation',
      accessories: ['Mace', 'Tail Blade', 'Rifle', 'Sub Arms']
    },
    tags: ['PD', 'Tekkadan', 'Protagonist', 'Melee'],
    priceRange: 'budget'
  },
  {
    id: '5',
    name: 'RG 1/144 Nu Gundam',
    price: 29.99,
    originalPrice: 34.99,
    discountPercentage: 15,
    description: 'Real Grade Nu Gundam with fin funnels and detailed psycho-frame. Amuro\'s final mobile suit.',
    image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'gundam',
    subcategory: 'Real Grade',
    scale: '1/144',
    series: 'Char\'s Counterattack',
    manufacturer: 'Bandai',
    releaseDate: '2018',
    difficulty: 'Advanced',
    rating: 4.8,
    reviews: 267,
    inStock: true,
    hasModel3D: true,
    modelUrl: '/models/nu-gundam.glb',
    features: ['Fin funnels', 'Psycho-frame detail', 'Beam rifle', 'Shield with missiles'],
    specifications: {
      height: '19cm',
      weight: '180g',
      articulation: 'Full body with funnel deployment',
      accessories: ['Beam Rifle', 'Shield', 'Beam Sabers', 'Fin Funnels']
    },
    tags: ['UC', 'Federation', 'Newtype', 'Funnels'],
    priceRange: 'standard'
  },
  {
    id: '6',
    name: 'MG 1/100 Sazabi Ver.Ka',
    price: 69.99,
    originalPrice: 79.99,
    discountPercentage: 12,
    description: 'Master Grade Sazabi Ver.Ka with waterslide decals and premium detail. Char\'s final mobile suit.',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'gundam',
    subcategory: 'Master Grade',
    scale: '1/100',
    series: 'Char\'s Counterattack',
    manufacturer: 'Bandai',
    releaseDate: '2013',
    difficulty: 'Expert',
    rating: 4.9,
    reviews: 156,
    inStock: true,
    hasModel3D: true,
    modelUrl: '/models/sazabi.glb',
    features: ['Ver.Ka design', 'Waterslide decals', 'Funnels', 'Premium detail'],
    specifications: {
      height: '25cm',
      weight: '350g',
      articulation: 'Full body with funnel system',
      accessories: ['Beam Shot Rifle', 'Beam Tomahawk', 'Shield', 'Funnels']
    },
    tags: ['UC', 'Neo Zeon', 'Antagonist', 'Funnels'],
    priceRange: 'premium'
  },
  {
    id: '7',
    name: 'HG 1/144 Wing Gundam Zero EW',
    price: 18.99,
    description: 'High Grade Wing Gundam Zero Endless Waltz version with angel wings and twin buster rifle.',
    image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'gundam',
    subcategory: 'High Grade',
    scale: '1/144',
    series: 'Gundam Wing Endless Waltz',
    manufacturer: 'Bandai',
    releaseDate: '2019',
    difficulty: 'Intermediate',
    rating: 4.6,
    reviews: 234,
    inStock: true,
    hasModel3D: true,
    modelUrl: '/models/wing-zero.glb',
    features: ['Angel wings', 'Twin buster rifle', 'Feather effects', 'Action base compatible'],
    specifications: {
      height: '18cm',
      weight: '160g',
      articulation: 'Full body with wing deployment',
      accessories: ['Twin Buster Rifle', 'Beam Sabers', 'Shield', 'Effect Parts']
    },
    tags: ['AC', 'Gundam Pilot', 'Protagonist', 'Wings'],
    priceRange: 'budget'
  },
  {
    id: '8',
    name: 'RG 1/144 Tallgeese',
    price: 24.99,
    description: 'Real Grade Tallgeese with detailed verniers and dober gun. The original mobile suit.',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'gundam',
    subcategory: 'Real Grade',
    scale: '1/144',
    series: 'Gundam Wing',
    manufacturer: 'Bandai',
    releaseDate: '2020',
    difficulty: 'Intermediate',
    rating: 4.7,
    reviews: 178,
    inStock: true,
    hasModel3D: true,
    modelUrl: '/models/tallgeese.glb',
    features: ['Detailed verniers', 'Dober gun', 'Shield', 'Realistic proportions'],
    specifications: {
      height: '18cm',
      weight: '155g',
      articulation: 'Full body articulation',
      accessories: ['Dober Gun', 'Shield', 'Beam Saber', 'Vernier Effects']
    },
    tags: ['AC', 'OZ', 'Classic', 'Prototype'],
    priceRange: 'standard'
  },
  {
    id: '9',
    name: 'Nendoroid Saber',
    price: 49.49,
    originalPrice: 54.99,
    discountPercentage: 10,
    description: 'Adorable Nendoroid figure of Saber from Fate/stay night. Includes multiple expressions and accessories.',
    image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'figure',
    subcategory: 'Nendoroid',
    series: 'Fate/stay night',
    manufacturer: 'Good Smile Company',
    releaseDate: '2008',
    rating: 4.7,
    reviews: 267,
    inStock: true,
    hasModel3D: false,
    features: ['Multiple face plates', 'Interchangeable parts', 'Excalibur included', 'Stand included'],
    specifications: {
      height: '10cm',
      weight: '80g',
      articulation: 'Nendoroid joints',
      accessories: ['3 face plates', 'Excalibur', 'Various hand parts', 'Stand']
    },
    tags: ['Anime', 'Cute', 'Collectible', 'Popular'],
    priceRange: 'standard'
  },
  {
    id: '10',
    name: 'Figma Asuka Langley',
    price: 79.99,
    description: 'Highly articulated figma of Asuka Langley Soryu from Evangelion. Perfect for dynamic poses.',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'figure',
    subcategory: 'Figma',
    series: 'Neon Genesis Evangelion',
    manufacturer: 'Max Factory',
    releaseDate: '2009',
    rating: 4.6,
    reviews: 156,
    inStock: true,
    hasModel3D: false,
    features: ['Figma articulation', 'Multiple expressions', 'Plug suit version', 'Action base compatible'],
    specifications: {
      height: '14cm',
      weight: '120g',
      articulation: 'Figma joint system',
      accessories: ['2 face plates', 'Various hand parts', 'Stand', 'Interface headset']
    },
    tags: ['Anime', 'Evangelion', 'Articulated', 'Premium'],
    priceRange: 'premium'
  },
  {
    id: '11',
    name: 'Scale Figure Zero Two',
    price: 129.99,
    description: 'Premium 1/7 scale figure of Zero Two from DARLING in the FRANXX. Detailed sculpting and painting.',
    image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'figure',
    subcategory: 'Scale Figure',
    series: 'DARLING in the FRANXX',
    manufacturer: 'Kotobukiya',
    releaseDate: '2019',
    rating: 4.8,
    reviews: 89,
    inStock: true,
    hasModel3D: false,
    features: ['1/7 scale', 'Premium painting', 'Detailed base', 'Limited edition'],
    specifications: {
      height: '25cm',
      weight: '400g',
      articulation: 'Fixed pose statue',
      accessories: ['Detailed base', 'Certificate']
    },
    tags: ['Anime', 'Premium', 'Limited', 'Statue'],
    priceRange: 'luxury'
  },
  {
    id: '12',
    name: 'Action Base 1',
    price: 12.99,
    description: 'Universal action base for displaying your Gunpla in dynamic flying poses. Compatible with most scales.',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'accessories',
    subcategory: 'Display',
    manufacturer: 'Bandai',
    rating: 4.5,
    reviews: 423,
    inStock: true,
    hasModel3D: false,
    features: ['Universal compatibility', 'Adjustable height', 'Multiple connection points', 'Clear parts'],
    specifications: {
      height: 'Adjustable',
      weight: '50g',
      articulation: 'Multi-directional joints',
      accessories: ['Various adapters', 'Extension parts']
    },
    tags: ['Display', 'Universal', 'Essential', 'Clear'],
    priceRange: 'budget'
  },
  {
    id: '13',
    name: 'LED Unit for PG Unicorn',
    price: 39.99,
    description: 'Official LED unit for Perfect Grade Unicorn Gundam. Illuminates psycho-frame with realistic effects.',
    image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'accessories',
    subcategory: 'LED',
    manufacturer: 'Bandai',
    rating: 4.9,
    reviews: 67,
    inStock: true,
    hasModel3D: false,
    features: ['Official Bandai', 'Psycho-frame lighting', 'Easy installation', 'Battery powered'],
    specifications: {
      accessories: ['LED strips', 'Battery pack', 'Wiring', 'Installation guide']
    },
    tags: ['LED', 'Unicorn', 'Official', 'Premium'],
    priceRange: 'standard'
  },
  {
    id: '14',
    name: 'Panel Line Accent Color Set',
    price: 18.99,
    description: 'Professional panel lining markers for enhancing your Gunpla details. Set includes black, gray, and brown.',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'tools',
    subcategory: 'Detailing',
    manufacturer: 'Tamiya',
    rating: 4.8,
    reviews: 234,
    inStock: true,
    hasModel3D: false,
    features: ['Fine tip markers', 'Quick drying', 'Easy cleanup', 'Professional results'],
    specifications: {
      accessories: ['Black marker', 'Gray marker', 'Brown marker', 'Instruction guide']
    },
    tags: ['Tools', 'Detailing', 'Professional', 'Essential'],
    priceRange: 'budget'
  },
  {
    id: '15',
    name: 'Gundam Marker Set',
    price: 24.99,
    description: 'Complete set of Gundam markers for touch-ups and detailing. Includes metallic and basic colors.',
    image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'tools',
    subcategory: 'Painting',
    manufacturer: 'Mr. Color',
    rating: 4.6,
    reviews: 189,
    inStock: true,
    hasModel3D: false,
    features: ['Multiple colors', 'Metallic finish', 'Easy application', 'Quick drying'],
    specifications: {
      accessories: ['6 color markers', 'Metallic markers', 'Storage case']
    },
    tags: ['Tools', 'Painting', 'Metallic', 'Complete'],
    priceRange: 'standard'
  },
  {
    id: '16',
    name: 'Side Cutters Pro',
    price: 34.99,
    description: 'Professional grade side cutters for clean part removal. Sharp blades with comfortable grip.',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'tools',
    subcategory: 'Cutting',
    manufacturer: 'Tamiya',
    rating: 4.9,
    reviews: 156,
    inStock: true,
    hasModel3D: false,
    features: ['Sharp blades', 'Comfortable grip', 'Clean cuts', 'Professional grade'],
    specifications: {
      accessories: ['Side cutters', 'Blade cover', 'Care instructions']
    },
    tags: ['Tools', 'Cutting', 'Professional', 'Sharp'],
    priceRange: 'standard'
  },
  {
    id: '17',
    name: 'MG 1/100 Barbatos',
    price: 42.99,
    description: 'Master Grade Barbatos with full inner frame and detailed weapons. From Iron-Blooded Orphans.',
    image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'gundam',
    subcategory: 'Master Grade',
    scale: '1/100',
    series: 'Iron-Blooded Orphans',
    manufacturer: 'Bandai',
    releaseDate: '2016',
    difficulty: 'Advanced',
    rating: 4.7,
    reviews: 145,
    inStock: true,
    hasModel3D: true,
    modelUrl: '/models/barbatos.glb',
    features: ['Inner frame', 'Multiple weapons', 'Detailed armor', 'Action poses'],
    specifications: {
      height: '23cm',
      weight: '250g',
      articulation: 'Full body articulation',
      accessories: ['Mace', 'Long Sword', 'Rifle', 'Smoothbore Gun']
    },
    tags: ['PD', 'Tekkadan', 'Protagonist', 'Melee'],
    priceRange: 'premium'
  },
  {
    id: '18',
    name: 'RG 1/144 Sazabi',
    price: 39.99,
    description: 'Real Grade Sazabi with detailed psycho-frame and funnel system. Char\'s iconic mobile suit.',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'gundam',
    subcategory: 'Real Grade',
    scale: '1/144',
    series: 'Char\'s Counterattack',
    manufacturer: 'Bandai',
    releaseDate: '2019',
    difficulty: 'Advanced',
    rating: 4.8,
    reviews: 203,
    inStock: true,
    hasModel3D: true,
    modelUrl: '/models/rg-sazabi.glb',
    features: ['Psycho-frame detail', 'Funnel system', 'Beam effects', 'Premium detail'],
    specifications: {
      height: '19cm',
      weight: '200g',
      articulation: 'Full body with funnel deployment',
      accessories: ['Beam Shot Rifle', 'Beam Tomahawk', 'Shield', 'Funnels']
    },
    tags: ['UC', 'Neo Zeon', 'Antagonist', 'Funnels'],
    priceRange: 'standard'
  },
  {
    id: '19',
    name: 'HG 1/144 Exia',
    price: 16.99,
    description: 'High Grade Exia from Gundam 00. Features GN Sword and sleek design.',
    image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    images: [
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'gundam',
    subcategory: 'High Grade',
    scale: '1/144',
    series: 'Gundam 00',
    manufacturer: 'Bandai',
    releaseDate: '2008',
    difficulty: 'Beginner',
    rating: 4.5,
    reviews: 312,
    inStock: true,
    hasModel3D: true,
    modelUrl: '/models/exia.glb',
    features: ['GN Sword', 'Beam sabers', 'Sleek design', 'Color separation'],
    specifications: {
      height: '18cm',
      weight: '135g',
      articulation: 'Standard HG articulation',
      accessories: ['GN Sword', 'Beam Sabers', 'GN Blade']
    },
    tags: ['AD', 'Celestial Being', 'Protagonist', 'Melee'],
    priceRange: 'budget'
  },
  {
    id: '20',
    name: 'Nendoroid Rem',
    price: 52.99,
    description: 'Cute Nendoroid figure of Rem from Re:Zero. Includes multiple expressions and accessories.',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    category: 'figure',
    subcategory: 'Nendoroid',
    series: 'Re:Zero',
    manufacturer: 'Good Smile Company',
    releaseDate: '2017',
    rating: 4.8,
    reviews: 189,
    inStock: true,
    hasModel3D: false,
    features: ['Multiple expressions', 'Interchangeable parts', 'Morning star included', 'Stand included'],
    specifications: {
      height: '10cm',
      weight: '85g',
      articulation: 'Nendoroid joints',
      accessories: ['3 face plates', 'Morning star', 'Various hand parts', 'Stand']
    },
    tags: ['Anime', 'Cute', 'Popular', 'Maid'],
    priceRange: 'standard'
  }
];
export const CAFE_INFO = {
  name: "MORROW",
  japaneseName: "明日",
  fullName: "MORROW CAFÉ",
  tagline: "A little pause from everything.",
  subtitle: "Japanese minimalism meets European café warmth. Slow roasts, seasonal brew flights, and baked heritage pastries crafted with deliberate presence.",
  address: "142 Wood Street, 12th Main, Indiranagar, Bengaluru 560038",
  landmark: "Next to the Bodhi Banyan Tree, Off 100 Feet Road",
  phone: "+91 (080) 4921 8820",
  email: "kissa@morrowcafe.com",
  instagram: "@morrow.cafe",
  spotifyPlaylist: "Morrow Ambient: Morning Reverie",
  coordinates: {
    lat: 12.9784,
    lng: 77.6408,
  },
  hours: [
    { days: "Monday — Friday", time: "07:30 — 21:00", note: "Espresso bar opens 07:30, Kitchen from 08:00" },
    { days: "Saturday & Sunday", time: "08:00 — 22:00", note: "Weekend brunch menu served until 16:00" },
  ],
  seatingAreas: [
    { id: "courtyard", name: "Zen Courtyard", desc: "Open-air gravel garden with maple trees & natural filtered light" },
    { id: "espresso-bar", name: "The Pour-Over Bar", desc: "Front-row cedar counter overlooking master baristas at work" },
    { id: "mezzanine", name: "Sunken Mezzanine", desc: "Quiet tactile alcove with soft linen booths and reading lamps" },
    { id: "veranda", name: "Streetfront Veranda", desc: "Breezy shaded deck ideal for morning reading and dog lovers" },
  ]
};

export const MENU_CATEGORIES = [
  { id: "all", name: "All" },
  { id: "coffee", name: "Coffee" },
  { id: "tea", name: "Matcha" },
  { id: "plates", name: "Breakfast" },
  { id: "pastry", name: "Bakery" },
];

export const MENU_ITEMS = [
  {
    id: "kyoto-drip",
    category: "coffee",
    name: "Kyoto Slow Drip (12h Cold Steep)",
    japanese: "水出し珈琲",
    price: 320,
    tags: ["Signature", "Cold", "Single Origin"],
    description: "Extracted drop by single drop through hand-blown glass Dutch towers over twelve unhurried hours. Silky mouthfeel with wine-like clarity and zero bitterness.",
    notes: "Black cherry, cacao nibs, dried orange blossom",
    origin: "Yirgacheffe, Ethiopia • Washed Heirloom",
    elevation: "2,050m",
    brewMethod: "12-Hour Dutch Drip • 1 Drop per 1.5s",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=85",
    pairing: "Swedish Cardamom & Orange Knot",
    badge: "House Specialty"
  },
  {
    id: "pourover-gesha",
    category: "coffee",
    name: "Hand-Poured Panama Geisha V60",
    japanese: "手淹れゲイシャ",
    price: 460,
    tags: ["Limited Batch", "Hot", "Filter"],
    description: "Prepared table-side with 92°C mineral-adjusted spring water in Kasama ceramic drippers. Unfolds in delicate floral waves with tea-like grace.",
    notes: "White peach, bergamot, jasmine tea, elderflower honey",
    origin: "Boquete, Panama • Natural Anaerobic",
    elevation: "1,800m",
    brewMethod: "Hario V60 • 92°C Spring Water • 1:16 Ratio",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=85",
    pairing: "Bordeaux Canelé with Uji Matcha",
    badge: "Reserve Lot"
  },
  {
    id: "cloud-cortado",
    category: "coffee",
    name: "Morrow Cloud Cortado",
    japanese: "雲コルタド",
    price: 280,
    tags: ["Hot", "Milk Beverage"],
    description: "Equal measures of rich double ristretto and silky micro-steamed A2 jersey milk, served in hand-thrown Kasama ceramic cups at 62°C.",
    notes: "Brown butter, hazelnut praline, stone fruit finish",
    origin: "Chikmagalur Estate, India • Extended Fermentation",
    elevation: "1,450m",
    brewMethod: "Double Ristretto 1:1.5 • Velvety Microfoam",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=85",
    pairing: "Salted Brittany Kouign-Amann",
    badge: "Guest Favorite"
  },
  {
    id: "tonka-flat-white",
    category: "coffee",
    name: "Smoked Tonka Flat White",
    japanese: "トンカフラットホワイト",
    price: 295,
    tags: ["Hot", "Signature Blend"],
    description: "Velvety espresso infused with faint botanical tonka bean shaving, offering whispers of vanilla and sweet woodruff without added refined sugar.",
    notes: "Vanilla pod, marzipan, dark toffee, sweet woodruff",
    origin: "Co-fermented Karnataka Micro-lot & Huila Colombia",
    elevation: "1,600m",
    brewMethod: "Espresso Extraction • Grated Wild Amazon Tonka",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=900&q=85",
    pairing: "Salted Brittany Kouign-Amann",
    badge: "Seasonal"
  },
  {
    id: "ceremonial-uji-matcha",
    category: "tea",
    name: "Uji Ceremonial Koicha Cloud Latte",
    japanese: "宇治抹茶ラテ",
    price: 340,
    tags: ["Hot or Iced", "Ceremonial Grade"],
    description: "First-harvest organic tencha whisked with traditional bamboo chasen. Velvety, vividly emerald, with zero bitterness and natural umami sweetness.",
    notes: "Young sweet bamboo, sweet cream, toasted nori, honeydew",
    origin: "Wazuka Hills, Uji, Kyoto • Cultivar Gokou & Samidori",
    elevation: "Stone Ground Tencha",
    brewMethod: "Traditional Chasen Whisk • 80°C • Oat or A2 Milk",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=85",
    pairing: "Bordeaux Canelé with Uji Matcha",
    badge: "Direct Farm Import"
  },
  {
    id: "hojicha-caramel-cream",
    category: "tea",
    name: "Roasted Hojicha & Spiced Cream",
    japanese: "焙じ茶クリーム",
    price: 310,
    tags: ["Hot", "Low Caffeine"],
    description: "Slow wood-roasted green tea leaves brewed into a deep amber liquor, topped with cold aerated oat cream and cinnamon bark dust.",
    notes: "Toasted hazelnut, warm campfire, smoked malt, cocoa",
    origin: "Shizuoka, Japan • Slow Pan Roasted Green Tea",
    elevation: "Charcoal Fired",
    brewMethod: "Steeped 4 Mins at 95°C • Aerated Cloud Foam",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=85",
    pairing: "Swedish Cardamom & Orange Knot",
    badge: "Comforting"
  },
  {
    id: "cardamom-orange-knot",
    category: "pastry",
    name: "Swedish Cardamom & Candied Orange Knot",
    japanese: "カルダモンノット",
    price: 240,
    tags: ["Fresh Baked", "Heritage"],
    description: "Braided Scandinavian brioche dough twisted with freshly crushed green cardamom pods, French Normandy butter, and house-candied Seville orange peel.",
    notes: "Floral spice, golden caramelized butter, citrus zest",
    origin: "Baked in-house every morning at 06:00",
    elevation: "Hand-Braided Daily",
    brewMethod: "French Normandy Lactic Butter • Single-origin Cardamom",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85",
    pairing: "Morrow Cloud Cortado",
    badge: "Signature Bake"
  },
  {
    id: "kouign-amann",
    category: "pastry",
    name: "Salted Brittany Kouign-Amann",
    japanese: "クイニアマン",
    price: 260,
    tags: ["Fresh Baked", "Laminated"],
    description: "Multi-layered Breton pastry layered with churned lactic butter and golden sugar that caramelizes into a glass-crisp outer crust with a melting center.",
    notes: "Guérande sea salt, caramelized sugar crust, cultured butter",
    origin: "72-hour slow laminated sourdough base",
    elevation: "72h Cold Fermentation",
    brewMethod: "Stone Oven Baked • 36 Fragile Micro-Layers",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85",
    pairing: "Kyoto Slow Drip (12h Cold Steep)",
    badge: "Flaky & Crisp"
  },
  {
    id: "matcha-canele",
    category: "pastry",
    name: "Bordeaux Canelé with Uji Matcha & Beeswax",
    japanese: "カヌレ・ボルドー",
    price: 190,
    tags: ["Traditional", "Vegetarian"],
    description: "Baked in genuine copper fluted molds lined with organic beeswax. Dark caramelized crunchy shell hiding a soft custard interior infused with aged rum and Uji matcha.",
    notes: "Custard, charred caramel, Madagascar vanilla, grassy matcha",
    origin: "Limited allocation of 48 pieces baked per service",
    elevation: "Copper Molds • Organic Beeswax",
    brewMethod: "Aged 48h Batter • High Heat Copper Bake",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=900&q=85",
    pairing: "Hand-Poured Panama Geisha V60",
    badge: "Daily Allocation"
  },
  {
    id: "shokupan-mushrooms",
    category: "plates",
    name: "Wild Forest Mushroom & Truffled Shokupan",
    japanese: "生食パン トースト",
    price: 420,
    tags: ["Warm", "Vegetarian", "Savoury"],
    description: "Thick-cut, cloud-like Japanese Hokkaido milk bread toasted in clarified butter, topped with pan-seared king oyster and shiitake mushrooms, miso glaze, and poached farm egg.",
    notes: "Earthy umami, thyme butter, creamy egg yolk, brioche sweetness",
    origin: "Locally foraged Nilgiri mushrooms & house-baked loaf",
    elevation: "Hand-Rolled Shokupan",
    brewMethod: "Clarified Butter Toast • Truffled Thyme Reduction",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85",
    pairing: "Smoked Tonka Flat White",
    badge: "Chef's Recommendation"
  },
  {
    id: "morrow-breakfast-bowl",
    category: "plates",
    name: "The Morrow Morning Rice & Dashi Bowl",
    japanese: "朝の出汁茶漬け",
    price: 390,
    tags: ["Comfort Food", "Gluten-Free"],
    description: "Koshihikari seasoned rice with toasted sesame, grilled king salmon flake or marinated tofu, soft onsen tamago, pickled daikon, and piping hot smoked bonito dashi poured at table.",
    notes: "Comforting, smoky dashi, bright acidity of preserved plum",
    origin: "Heritage Japanese breakfast ritual reimagined",
    elevation: "Niigata Koshihikari Rice",
    brewMethod: "Katsuobushi & Kombu Drip Broth Poured at Table",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85",
    pairing: "Roasted Hojicha & Spiced Cream",
    badge: "Soulful"
  },
  {
    id: "ricotta-fig-tartine",
    category: "plates",
    name: "Fermented Ricotta, Fresh Figs & Wild Thyme",
    japanese: "無花果のタルティーヌ",
    price: 380,
    tags: ["Seasonal", "Vegetarian"],
    description: "Charred country sourdough spread with house-whipped lemon zest sheep ricotta, sliced Turkish purple figs, crushed pistachios, and a drizzle of raw Coorg blossom honey.",
    notes: "Creamy, floral citrus, chewy sourdough tang, sweet fig",
    origin: "Naturally fermented 36-hour levain sourdough",
    elevation: "Organic Coorg Blossom Honey",
    brewMethod: "Cast Iron Charred Sourdough • Hand-Whipped Ricotta",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=85",
    pairing: "Hand-Poured Panama Geisha V60",
    badge: "Seasonal Plate"
  }
];

export const SPACE_ZONES = [
  {
    id: "bar",
    title: "The Omakase Coffee Bar",
    japanese: "カウンター",
    tagline: "Front-row dialogue with the craft",
    description: "A continuous 9-meter counter sculptured from solid Hinoki cypress wood and honed basalt stone. Here, baristas operate silent Mahlkönig grinders and custom manual lever machines, inviting conversation on every brew parameter.",
    features: ["Custom Sanremo Opera machine", "Acoustically damped bar seating", "Daily single-origin flight tastings"],
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1100&q=85",
  },
  {
    id: "courtyard",
    title: "The Kyoto Courtyard",
    japanese: "中庭",
    tagline: "Light filtering through Japanese maples",
    description: "An internal open-air atrium framed by raw concrete and reclaimed teak. Crushed grey granite reflects morning light, creating ever-shifting shadow tapestries across the limestone walls as you sip.",
    features: ["Natural rain garden acoustics", "Filtered morning sun exposure", "Pet friendly outdoor sanctuary"],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1100&q=85",
  },
  {
    id: "library",
    title: "The Reading Mezzanine",
    japanese: "書斎",
    tagline: "A sanctuary for deep contemplation",
    description: "Tucked above the café floor, our mezzanine holds an unhurried archive of design monographs, Japanese architecture essays, poetry, and art journals. No laptop charging plugs, no hurry.",
    features: ["Curated 400-volume design library", "Linen-upholstered reading armchairs", "Warm 2700K indirect mood lighting"],
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1100&q=85",
  }
];

export const PHILOSOPHY_PILLARS = [
  {
    number: "01",
    title: "Ma (間) — The Art of the Interval",
    desc: "In Japanese aesthetics, 'Ma' is the negative space that gives form to the whole. We design pauses into your day: the intentional 4-minute wait for a manual pour-over, the spaciousness between tables, the silence before music begins."
  },
  {
    number: "02",
    title: "Terroir & Transparency",
    desc: "We work directly with four generational family farms across Chikmagalur, Yirgacheffe, and Huila. Every harvest is priced well above Fair Trade minimums, celebrating the hands that nurture the cherries."
  },
  {
    number: "03",
    title: "Lamination & Patience",
    desc: "Good bread cannot be accelerated. Our viennoiserie undergoes 72 hours of slow cold fermentation with churned lactic butter, resulting in fragile honeycomb interiors and shattering golden crusts."
  }
];

export const JOURNAL_POSTS = [
  {
    id: "art-of-slow-drip",
    date: "November 18, 2026",
    category: "Brew Chemistry",
    readTime: "4 min read",
    title: "The Geometry of Slow Drip: Why 12 Hours Produce Coffee with Wine-Like Clarity",
    excerpt: "Watching cold water fall drop by single drop through spiral glass columns is both meditation and chemistry. Here is what happens when heat is removed from coffee extraction.",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=85",
    content: "When coffee is extracted without thermal energy, the harsh bitter oils and chlorogenic acids remain locked within the ground cell walls. What releases instead are the delicate soluble esters, sugars, and fragrant terpenes..."
  },
  {
    id: "uji-matcha-harvest",
    date: "October 29, 2026",
    category: "Tea Cultivars",
    readTime: "6 min read",
    title: "Under Straw Screens: A Journey to the Fog-Covered Hills of Uji, Kyoto",
    excerpt: "Three weeks before harvest, green tea bushes are shrouded beneath woven reed mats to starve them of sunlight. The plant responds with an explosion of chlorophyll and L-theanine.",
    image: "https://images.unsplash.com/photo-1545048702-793607ce028f?auto=format&fit=crop&w=900&q=85",
    content: "Walking through the terraced tea hills of Wazuka in Uji Prefecture at 6 AM, mist clings to the river valley like spun silk. Here, tea has been tended by the same family lineage since the Kamakura period..."
  },
  {
    id: "architecture-of-stillness",
    date: "October 10, 2026",
    category: "Spatial Design",
    readTime: "5 min read",
    title: "Tactile Silence: Designing a Café Without Audio Clutter or Sensory Fatigue",
    excerpt: "How we worked with local acoustic architects and carpenters to craft an interior where whispers carry warmth without becoming a din.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
    content: "Modern spaces are excessively loud. Between hard polished marble, stainless steel espresso equipment, and blaring pop soundtracks, dining out has become acoustically hostile. Morrow was conceived as an acoustic sanctuary..."
  }
];

export const EXPERIENCE_HIGHLIGHTS = [
  {
    iconName: "Coffee",
    title: "Thoughtful Coffee",
    japanese: "丁寧な珈琲",
    description: "Direct-trade micro-lots roasted lightly to highlight botanical acidity, citrus notes, and origin character rather than smoke or carbon.",
    badge: "100% Single Origin"
  },
  {
    iconName: "Sparkles",
    title: "Freshly Made",
    japanese: "焼きたて",
    description: "Every pastry is shaped and laminated in our glass-fronted bakery room each dawn, using Normandy butter and unbleached heirloom flour.",
    badge: "Daily Dawn Bakes"
  },
  {
    iconName: "Clock",
    title: "Beautiful Moments",
    japanese: "美しいひととき",
    description: "An unhurried philosophy where guests are encouraged to read, write, sketch, or gaze at the courtyard garden without being rushed.",
    badge: "Unhurried Sanctuary"
  }
];

export const PRESS_QUOTES = [
  {
    quote: "Morrow is not simply another coffee shop; it is an architectural ode to pause, where every ceramic cup and shadow feels painterly.",
    source: "Architectural Digest India",
    date: "Autumn Issue"
  },
  {
    quote: "A rare triumph of Japanese kissaten sensibility blended with European baking mastery. The Kyoto cold drip is peerless.",
    source: "Condé Nast Traveller",
    date: "Culinary Highlights"
  },
  {
    quote: "Bengaluru's most aesthetically serene dining room. The wild mushroom shokupan alone is worth crossing the city for.",
    source: "The Hindu Metroplus",
    date: "Editorial Review"
  }
];

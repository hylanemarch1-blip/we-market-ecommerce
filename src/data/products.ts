import { getVendorById, type Vendor } from "./vendors";

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  sku: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  description: string;
  highlights: string[];
  specifications: Record<string, string>;
  sellerId: string;
}

const img = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&auto=format&fit=crop&q=70`;

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Fresh Apples",
    category: "Fruits",
    brand: "FreshMart",
    sku: "FM-FRU-001",
    price: 4.99,
    originalPrice: 6.99,
    rating: 4.8,
    reviewCount: 1245,
    stock: 120,
    images: [
      img("photo-1560806887-1e4cd0b6cbd6"),
      img("photo-1567306226416-28f0efdc88ce"),
      img("photo-1568702846914-96b305d2aaeb"),
    ],
    description:
      "Crisp, sweet organic apples harvested at peak ripeness from pesticide-free orchards. Perfect for snacking, salads, baking, or juicing. Each batch is hand-inspected for quality before packing.",
    highlights: [
      "100% certified organic, pesticide-free",
      "Hand-picked and quality-inspected",
      "Naturally sweet and crunchy",
      "Packed in recyclable produce boxes",
    ],
    specifications: {
      Origin: "Nashik, India",
      Type: "Royal Gala",
      Weight: "1 kg (approx. 6-8 apples)",
      Grade: "Premium A",
      Storage: "Refrigerate below 4°C",
      "Shelf Life": "14 days",
    },
    sellerId: "9",
  },
  {
    id: "2",
    name: "Wireless Noise-Canceling Headphones",
    category: "Electronics",
    brand: "SonicWave",
    sku: "SW-ANC-042",
    price: 89.99,
    originalPrice: 120.0,
    rating: 4.9,
    reviewCount: 2341,
    stock: 210,
    images: [
      img("photo-1505740420928-5e560c06d30e"),
      img("photo-1546435770-a3e426bf472b"),
      img("photo-1583394838336-acd977736f90"),
    ],
    description:
      "Immerse yourself in studio-quality sound with adaptive active noise cancellation. The SonicWave ANC-42 pairs 40mm custom drivers with 40-hour battery life, plush memory-foam earcups, and multipoint Bluetooth 5.3 for seamless work and play.",
    highlights: [
      "Adaptive Active Noise Cancellation",
      "40-hour playtime with ANC on",
      "Multipoint Bluetooth 5.3",
      "Foldable travel-friendly design",
    ],
    specifications: {
      Brand: "SonicWave",
      Driver: "40mm dynamic",
      "Noise Cancellation": "Adaptive ANC (hybrid)",
      "Battery Life": "40 hours (ANC on)",
      Bluetooth: "5.3 with multipoint",
      Weight: "250 g",
      Warranty: "1 year",
    },
    sellerId: "1",
  },
  {
    id: "3",
    name: "Classic Smart Watch Series 5",
    category: "Gadgets",
    brand: "Chrono",
    sku: "CH-SW-S5",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewCount: 764,
    stock: 87,
    images: [
      img("photo-1523275335684-37898b6baf30"),
      img("photo-1546868871-7041f2a55e12"),
      img("photo-1579586337278-3befd40fd17a"),
    ],
    description:
      "The Chrono Series 5 combines a vivid AMOLED always-on display with advanced health tracking — heart rate, SpO2, sleep stages, and 120+ workout modes. Water-resistant to 5 ATM and up to 10 days of typical use per charge.",
    highlights: [
      "1.43\" AMOLED always-on display",
      "Heart rate, SpO2 & sleep tracking",
      "120+ sport modes with GPS",
      "Up to 10-day battery life",
    ],
    specifications: {
      Display: '1.43" AMOLED, 466x466',
      Size: "46 mm case",
      Battery: "10 days typical use",
      "Water Resistance": "5 ATM (50 m)",
      Sensors: "Heart rate, SpO2, accelerometer",
      Compatibility: "Android & iOS",
      Warranty: "1 year",
    },
    sellerId: "1",
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    brand: "ErgoForm",
    sku: "EF-CHR-114",
    price: 149.0,
    originalPrice: 189.0,
    rating: 4.6,
    reviewCount: 412,
    stock: 18,
    images: [
      img("photo-1598300042247-d088f8ab3a91"),
      img("photo-1592078615290-033ee584e267"),
      img("photo-1497366754035-f200968a6e72"),
    ],
    description:
      "Work comfortably through long days in the ErgoForm Executive Chair. Breathable mesh back, 4-way adjustable lumbar support, padded armrests, and a synchronized tilt mechanism keep your posture aligned from desk to deadline.",
    highlights: [
      "Breathable mesh back with lumbar support",
      "Synchronized tilt with 4 lock positions",
      "Adjustable armrests and seat height",
      "Supports up to 120 kg",
    ],
    specifications: {
      Material: "Mesh back, foam seat",
      "Weight Capacity": "120 kg",
      Dimensions: "66 x 66 x 115-125 cm",
      "Lumbar Support": "4-way adjustable",
      Assembly: "Tool-free, 15 minutes",
      Warranty: "2 years",
    },
    sellerId: "3",
  },
  {
    id: "5",
    name: "Whole Grain Organic Bread",
    category: "Bakery",
    brand: "Baker's Lane",
    sku: "BL-BKY-010",
    price: 3.49,
    originalPrice: 4.5,
    rating: 4.5,
    reviewCount: 673,
    stock: 60,
    images: [
      img("photo-1509440159596-0249088772ff"),
      img("photo-1549931319-a545dcf3bc73"),
      img("photo-1586444248902-2f64eddc13df"),
    ],
    description:
      "Soft, hearty whole grain loaf baked fresh daily with stone-ground flour, flax seeds, and a touch of honey. No preservatives, no added sugar — just honest bread that keeps your morning toast wholesome.",
    highlights: [
      "Stone-ground 100% whole wheat",
      "No preservatives or added sugar",
      "Rich in dietary fiber",
      "Baked fresh every morning",
    ],
    specifications: {
      Type: "Whole grain sandwich loaf",
      Weight: "500 g",
      Ingredients: "Whole wheat flour, flax seeds, honey, yeast, salt",
      Fiber: "6 g per slice",
      Preservatives: "None",
      "Shelf Life": "5 days",
    },
    sellerId: "9",
  },
  {
    id: "6",
    name: "Fresh Whole Milk 1 Gal",
    category: "Dairy",
    brand: "DairyPure",
    sku: "DP-DRY-005",
    price: 3.99,
    originalPrice: 5.2,
    rating: 4.9,
    reviewCount: 987,
    stock: 85,
    images: [
      img("photo-1550583724-b2692b85b150"),
      img("photo-1563636619-e9143da7973b"),
      img("photo-1628088062854-d1870b4553da"),
    ],
    description:
      "Creamy, cold-filtered whole milk from grass-fed herds — pasteurized and homogenized for a consistently rich taste. An excellent source of calcium and vitamin D for the whole family.",
    highlights: [
      "From grass-fed, hormone-free herds",
      "Pasteurized and homogenized",
      "Rich in calcium and vitamin D",
      "Cold-chain delivered",
    ],
    specifications: {
      Type: "Whole milk",
      "Fat Content": "3.25%",
      Volume: "3.78 L (1 gallon)",
      Source: "Grass-fed herds",
      Storage: "Keep refrigerated below 4°C",
      "Shelf Life": "10 days",
    },
    sellerId: "9",
  },
  {
    id: "7",
    name: "Fresh Bananas Bunch",
    category: "Fruits",
    brand: "FreshMart",
    sku: "FM-FRU-014",
    price: 2.49,
    originalPrice: 3.29,
    rating: 4.7,
    reviewCount: 841,
    stock: 95,
    images: [
      img("photo-1571771894821-ce9b6c11b08e"),
      img("photo-1587132137056-bfbf0166836e"),
      img("photo-1528825871115-3581a5387919"),
    ],
    description:
      "Naturally ripened banana bunches with bright yellow peels and rich, creamy flavor. Picked at the right stage so they're ready to eat and stay fresh through the week.",
    highlights: [
      "Naturally ripened, no gas treatment",
      "Excellent source of potassium",
      "Great for baking and smoothies",
      "Sold by weight, bunch approx. 1 kg",
    ],
    specifications: {
      Origin: "Jalgaon, India",
      Type: "Robusta",
      Weight: "1 kg (approx. 5-7 bananas)",
      Grade: "Premium A",
      Storage: "Keep at room temperature",
      "Shelf Life": "7 days",
    },
    sellerId: "9",
  },
  {
    id: "8",
    name: '4K Ultra HD Smart TV 55"',
    category: "Electronics",
    brand: "VisionMax",
    sku: "VM-TV-550",
    price: 649.99,
    originalPrice: 799.99,
    rating: 4.8,
    reviewCount: 1532,
    stock: 34,
    images: [
      img("photo-1593359677879-a4bb92f829d1"),
      img("photo-1461151304267-38535e780c79"),
      img("photo-1552975084-6e027cd345c2"),
    ],
    description:
      "Bring the theater home with the VisionMax 55-inch 4K QLED panel. HDR10+ tone mapping, Dolby Atmos pass-through, and a bezel-less design deliver stunning picture and sound, while the built-in smart platform streams all your favorites.",
    highlights: [
      '55" 4K QLED display (3840 x 2160)',
      "HDR10+ & Dolby Vision",
      "Dolby Atmos audio pass-through",
      "Voice remote with built-in assistant",
    ],
    specifications: {
      Brand: "VisionMax",
      Display: '55" QLED, 3840 x 2160',
      HDR: "HDR10+, Dolby Vision",
      "Refresh Rate": "120 Hz",
      "Smart Platform": "StreamOS with voice control",
      Ports: "4x HDMI 2.1, 2x USB",
      Warranty: "2 years",
    },
    sellerId: "1",
  },
  {
    id: "9",
    name: "Wireless Earbuds Pro",
    category: "Gadgets",
    brand: "SonicWave",
    sku: "SW-EAB-208",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.6,
    reviewCount: 1876,
    stock: 150,
    images: [
      img("photo-1590658268037-6bf12165a8df"),
      img("photo-1606220588913-b3aacb4d2f46"),
      img("photo-1572569511254-d8f925fe2cbb"),
    ],
    description:
      "Pocket-sized powerhouses with hybrid ANC, spatial audio, and a 30-hour total battery. The SonicWave Earbuds Pro deliver crisp calls with quad-mic noise reduction and an IPX5 rating for workouts and rain.",
    highlights: [
      "Hybrid active noise cancellation",
      "30 hours total playtime with case",
      "IPX5 sweat and water resistant",
      "Wireless charging case",
    ],
    specifications: {
      Brand: "SonicWave",
      Driver: "11 mm dynamic",
      "Noise Cancellation": "Hybrid ANC",
      "Battery Life": "8 h buds / 30 h with case",
      "Water Resistance": "IPX5",
      Bluetooth: "5.3",
      Warranty: "1 year",
    },
    sellerId: "1",
  },
  {
    id: "10",
    name: "Wooden Study Desk",
    category: "Furniture",
    brand: "WoodCraft",
    sku: "WC-DSK-033",
    price: 119.0,
    originalPrice: 149.0,
    rating: 4.5,
    reviewCount: 298,
    stock: 26,
    images: [
      img("photo-1518455027359-f3f8164ba6bd"),
      img("photo-1524758631624-e2822e304c36"),
      img("photo-1542435503-956c469947f6"),
    ],
    description:
      "A clean-lined solid pine study desk with a wide work surface, cable management cutout, and a deep drawer for supplies. Finished with a child-safe matte lacquer that resists scratches and stains.",
    highlights: [
      "Solid pine wood construction",
      'Spacious 120 x 60 cm worktop',
      "Built-in cable management",
      "Deep drawer for stationery",
    ],
    specifications: {
      Material: "Solid pine wood",
      Dimensions: "120 x 60 x 75 cm",
      "Weight Capacity": "50 kg",
      Drawers: "1 deep drawer",
      Assembly: "Required (instructions included)",
      Warranty: "1 year",
    },
    sellerId: "3",
  },
  {
    id: "11",
    name: "Chocolate Croissants (Pack of 6)",
    category: "Bakery",
    brand: "Baker's Lane",
    sku: "BL-BKY-044",
    price: 6.99,
    originalPrice: 8.49,
    rating: 4.8,
    reviewCount: 522,
    stock: 40,
    images: [
      img("photo-1555507036-ab1f4038808a"),
      img("photo-1530610476181-d83430b64dcd"),
      img("photo-1608198093002-ad4e005484ec"),
    ],
    description:
      "Flaky, butter-laminated croissants filled with silky Belgian chocolate. Baked in small batches and packed within hours of the oven so every bite stays light, layered, and warm-chocolatey.",
    highlights: [
      "Laminated with real French butter",
      "Filled with Belgian dark chocolate",
      "Baked fresh in small batches",
      "No artificial preservatives",
    ],
    specifications: {
      "Pack Size": "6 croissants",
      Weight: "360 g",
      Ingredients: "Wheat flour, butter, Belgian chocolate, yeast, salt",
      Allergens: "Gluten, milk, soy",
      "Shelf Life": "3 days",
      Storage: "Store in a cool, dry place",
    },
    sellerId: "9",
  },
  {
    id: "12",
    name: "Greek Yogurt Cups (Pack of 4)",
    category: "Dairy",
    brand: "DairyPure",
    sku: "DP-DRY-018",
    price: 5.49,
    originalPrice: 6.99,
    rating: 4.7,
    reviewCount: 764,
    stock: 70,
    images: [
      img("photo-1488477181946-6428a0291777"),
      img("photo-1505252585461-04db1eb84625"),
      img("photo-1584278860047-22db9ff82bed"),
    ],
    description:
      "Thick, creamy strained yogurt with live active cultures and 2x the protein of regular yogurt. Four handy cups of plain Greek yogurt — delicious on their own, with granola, or as a cooking staple.",
    highlights: [
      "Thick, strained Greek-style recipe",
      "Live active cultures",
      "15 g protein per serving",
      "No added sugar or thickeners",
    ],
    specifications: {
      "Pack Size": "4 cups",
      Volume: "4 x 170 g",
      "Fat Content": "0% (nonfat)",
      Probiotics: "Live active cultures",
      Ingredients: "Cultured nonfat milk",
      "Shelf Life": "21 days",
    },
    sellerId: "9",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function getSeller(product: Product): Vendor | undefined {
  return getVendorById(product.sellerId);
}

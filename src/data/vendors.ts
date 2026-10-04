export interface VendorProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  stock: number;
}

export interface Vendor {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  rating: number;
  reviewCount: number;
  salesCount: number;
  followerCount: number;
  categories: string[];
  badges: string[];
  shippingCoverage: string[];
  verified: boolean;
  established: string;
  location: string;
  policies: string[];
}

const img = (id: string, w = 500, h = 500) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&auto=format&fit=crop&q=70`;

export const vendors: Vendor[] = [
  {
    id: "1",
    slug: "tech-hub-electronics",
    name: "TechHub Electronics",
    description: "Premium consumer electronics and gadgets with global warranty",
    logo: img("photo-1550745165-9bc0b258726f", 200, 200),
    banner: img("photo-1498049794561-7780e7231661", 1200, 400),
    rating: 4.8,
    reviewCount: 2847,
    salesCount: 125000,
    followerCount: 15600,
    categories: ["Electronics", "Smartphones", "Laptops", "Accessories"],
    badges: ["Verified", "Top Seller", "Fast Shipping"],
    shippingCoverage: ["Domestic", "International"],
    verified: true,
    established: "2018",
    location: "Bangalore, India",
    policies: ["30-day return policy", "1-year brand warranty", "Express shipping available"],
  },
  {
    id: "2",
    slug: "fashion-forward",
    name: "Fashion Forward",
    description: "Trendy apparel and accessories for modern lifestyles",
    logo: img("photo-1441986300917-64674bd600d8", 200, 200),
    banner: img("photo-1441984904996-e0b6ba687e04", 1200, 400),
    rating: 4.6,
    reviewCount: 1923,
    salesCount: 89000,
    followerCount: 23400,
    categories: ["Fashion", "Women's Wear", "Men's Wear", "Accessories"],
    badges: ["Verified", "Eco-Friendly", "Express Delivery"],
    shippingCoverage: ["Domestic", "International"],
    verified: true,
    established: "2019",
    location: "Mumbai, India",
    policies: ["15-day easy returns", "Free size exchanges", "Secure payment guaranteed"],
  },
  {
    id: "3",
    slug: "home-essentials",
    name: "Home Essentials Co.",
    description: "Quality home and kitchen products for everyday living",
    logo: img("photo-1586023492125-27b2c045efd7", 200, 200),
    banner: img("photo-1555041469-a586c61ea9bc", 1200, 400),
    rating: 4.7,
    reviewCount: 3421,
    salesCount: 156000,
    followerCount: 18900,
    categories: ["Home & Kitchen", "Decor", "Furniture", "Organization"],
    badges: ["Verified", "Best Value", "Easy Returns"],
    shippingCoverage: ["Domestic"],
    verified: true,
    established: "2017",
    location: "Delhi, India",
    policies: ["7-day return policy", "Free installation on furniture", "Cash on delivery available"],
  },
  {
    id: "4",
    slug: "beauty-glow",
    name: "Beauty Glow",
    description: "Premium skincare, makeup, and wellness products",
    logo: img("photo-1596462502278-27bfdc403348", 200, 200),
    banner: img("photo-1512496015851-a90fb38ba796", 1200, 400),
    rating: 4.9,
    reviewCount: 4156,
    salesCount: 203000,
    followerCount: 31200,
    categories: ["Beauty", "Skincare", "Makeup", "Wellness"],
    badges: ["Verified", "Cruelty-Free", "Dermatologist Approved"],
    shippingCoverage: ["Domestic", "International"],
    verified: true,
    established: "2020",
    location: "Seoul, South Korea",
    policies: ["Sealed product guarantee", "10-day returns on unopened items", "Free samples with every order"],
  },
  {
    id: "5",
    slug: "sports-pro",
    name: "Sports Pro Gear",
    description: "Professional sports equipment and athletic wear",
    logo: img("photo-1571019614242-c5c5dee9f50b", 200, 200),
    banner: img("photo-1461896836934-ede607bae9ef", 1200, 400),
    rating: 4.5,
    reviewCount: 1234,
    salesCount: 67000,
    followerCount: 9800,
    categories: ["Sports", "Fitness", "Outdoor", "Equipment"],
    badges: ["Verified", "Official Partner", "Warranty Included"],
    shippingCoverage: ["Domestic", "International"],
    verified: true,
    established: "2016",
    location: "Pune, India",
    policies: ["1-year equipment warranty", "30-day returns", "Free shipping above $99"],
  },
  {
    id: "6",
    slug: "book-world",
    name: "Book World",
    description: "Extensive collection of books across all genres",
    logo: img("photo-1481627834876-b7833e8f5570", 200, 200),
    banner: img("photo-1512820790803-83ca734da794", 1200, 400),
    rating: 4.8,
    reviewCount: 987,
    salesCount: 45000,
    followerCount: 12300,
    categories: ["Books", "Education", "Fiction", "Non-Fiction"],
    badges: ["Verified", "Wide Selection", "Free Shipping"],
    shippingCoverage: ["Domestic"],
    verified: true,
    established: "2015",
    location: "Chennai, India",
    policies: ["Free shipping on orders above $25", "7-day damaged book replacement", "Bulk order discounts"],
  },
  {
    id: "7",
    slug: "auto-parts-plus",
    name: "Auto Parts Plus",
    description: "Genuine automotive parts and accessories for all vehicles",
    logo: img("photo-1503376780353-7e6692767b70", 200, 200),
    banner: img("photo-1492144534655-ae79c964c9d7", 1200, 400),
    rating: 4.4,
    reviewCount: 1876,
    salesCount: 78000,
    followerCount: 8900,
    categories: ["Automotive", "Parts", "Accessories", "Tools"],
    badges: ["Verified", "Genuine Parts", "Expert Support"],
    shippingCoverage: ["Domestic", "International"],
    verified: true,
    established: "2014",
    location: "Gurgaon, India",
    policies: ["Genuine OEM parts only", "Fitment assistance included", "1-year replacement warranty"],
  },
  {
    id: "8",
    slug: "pet-paradise",
    name: "Pet Paradise",
    description: "Premium pet food, toys, and care products",
    logo: img("photo-1601758228041-f3b2795255f1", 200, 200),
    banner: img("photo-1548199973-03cce0bbc87b", 1200, 400),
    rating: 4.7,
    reviewCount: 2134,
    salesCount: 92000,
    followerCount: 14500,
    categories: ["Pets", "Pet Food", "Toys", "Care"],
    badges: ["Verified", "Vet Recommended", "Subscription Available"],
    shippingCoverage: ["Domestic"],
    verified: true,
    established: "2021",
    location: "Hyderabad, India",
    policies: ["Vet-formulated products", "Subscribe & save 15%", "7-day returns on sealed items"],
  },
];

export const vendorProducts: Record<string, VendorProduct[]> = {
  "1": [
    { id: "p1-1", name: "Aurora X15 Laptop Pro", category: "Laptops", price: 1099.0, salePrice: 999.0, rating: 4.8, reviewCount: 412, image: img("photo-1496181133206-80ce9b88a853"), stock: 34 },
    { id: "p1-2", name: "Pulse 5G Smartphone", category: "Smartphones", price: 699.0, salePrice: 599.0, rating: 4.7, reviewCount: 1032, image: img("photo-1511707171634-5f897ff02aa9"), stock: 120 },
    { id: "p1-3", name: "SilencePro Wireless Headphones", category: "Accessories", price: 149.99, rating: 4.9, reviewCount: 2341, image: img("photo-1505740420928-5e560c06d30e"), stock: 210 },
    { id: "p1-4", name: "Chrono Smart Watch S5", category: "Wearables", price: 249.0, salePrice: 199.0, rating: 4.6, reviewCount: 764, image: img("photo-1523275335684-37898b6baf30"), stock: 87 },
    { id: "p1-5", name: 'SlateTab 11" Tablet', category: "Tablets", price: 429.0, rating: 4.5, reviewCount: 328, image: img("photo-1544244015-0df4b3ffc6b0"), stock: 56 },
    { id: "p1-6", name: "BoomBox Bluetooth Speaker", category: "Audio", price: 79.99, salePrice: 64.99, rating: 4.7, reviewCount: 1455, image: img("photo-1608043152269-423dbba4e7e1"), stock: 178 },
  ],
  "2": [
    { id: "p2-1", name: "Urban Cotton Tee", category: "Men's Wear", price: 29.99, rating: 4.5, reviewCount: 892, image: img("photo-1445205170230-053b83016050"), stock: 340 },
    { id: "p2-2", name: "Flowy Summer Dress", category: "Women's Wear", price: 59.99, salePrice: 49.99, rating: 4.7, reviewCount: 1230, image: img("photo-1485968579580-b6d095142e6e"), stock: 156 },
    { id: "p2-3", name: "Classic Runner Sneakers", category: "Footwear", price: 89.99, rating: 4.6, reviewCount: 2011, image: img("photo-1542291026-7eec264c27ff"), stock: 98 },
    { id: "p2-4", name: "Heritage Leather Watch", category: "Accessories", price: 199.0, salePrice: 169.0, rating: 4.8, reviewCount: 543, image: img("photo-1524592094714-0f0654e20314"), stock: 45 },
    { id: "p2-5", name: "Everyday Tote Bag", category: "Bags", price: 45.5, salePrice: 39.0, rating: 4.4, reviewCount: 327, image: img("photo-1584917865442-de89df76afd3"), stock: 210 },
    { id: "p2-6", name: "Sparkle Pendant Necklace", category: "Jewelry", price: 74.0, rating: 4.9, reviewCount: 678, image: img("photo-1515562141207-7a88fb7ce338"), stock: 64 },
  ],
  "3": [
    { id: "p3-1", name: "Nordic Fabric Sofa", category: "Furniture", price: 899.0, salePrice: 799.0, rating: 4.7, reviewCount: 412, image: img("photo-1555041469-a586c61ea9bc"), stock: 18 },
    { id: "p3-2", name: "Pro Cookware Set", category: "Kitchen", price: 149.99, rating: 4.8, reviewCount: 1876, image: img("photo-1556909114-f6e7ad7d3136"), stock: 92 },
    { id: "p3-3", name: "Ceramic Vase Set", category: "Decor", price: 39.99, salePrice: 32.99, rating: 4.6, reviewCount: 543, image: img("photo-1586023492125-27b2c045efd7"), stock: 145 },
    { id: "p3-4", name: "Pendant Ceiling Light", category: "Lighting", price: 89.0, rating: 4.5, reviewCount: 298, image: img("photo-1507473885765-e6ed057ab6fe"), stock: 67 },
    { id: "p3-5", name: "Cotton Duvet Cover", category: "Bedding", price: 69.99, salePrice: 54.99, rating: 4.7, reviewCount: 987, image: img("photo-1631049307264-da0ec9d70304"), stock: 230 },
    { id: "p3-6", name: "Storage Organizer Box", category: "Organization", price: 24.99, rating: 4.4, reviewCount: 654, image: img("photo-1600585152220-90363fe7e115"), stock: 410 },
  ],
  "4": [
    { id: "p4-1", name: "Radiance Vitamin C Serum", category: "Skincare", price: 34.99, salePrice: 28.99, rating: 4.9, reviewCount: 3421, image: img("photo-1596462502278-27bfdc403348"), stock: 280 },
    { id: "p4-2", name: "Velvet Matte Lip Kit", category: "Makeup", price: 24.99, rating: 4.8, reviewCount: 2134, image: img("photo-1512496015851-a90fb38ba796"), stock: 340 },
    { id: "p4-3", name: "Oud Eau de Parfum", category: "Fragrances", price: 89.0, salePrice: 74.0, rating: 4.7, reviewCount: 876, image: img("photo-1541643600914-78b084683601"), stock: 120 },
    { id: "p4-4", name: "Argan Repair Hair Oil", category: "Hair Care", price: 19.99, rating: 4.6, reviewCount: 1567, image: img("photo-1526947425960-945c6e72858f"), stock: 450 },
    { id: "p4-5", name: "Botanical Body Lotion", category: "Bath & Body", price: 16.5, salePrice: 13.99, rating: 4.5, reviewCount: 934, image: img("photo-1556228578-0d85b1a4d571"), stock: 520 },
  ],
  "5": [
    { id: "p5-1", name: "Pro Adjustable Dumbbells", category: "Fitness", price: 249.0, salePrice: 199.0, rating: 4.8, reviewCount: 764, image: img("photo-1534438327276-14e5300c3a48"), stock: 54 },
    { id: "p5-2", name: "Carbon Road Running Shoes", category: "Running", price: 129.99, rating: 4.7, reviewCount: 1432, image: img("photo-1461896836934-bd45ba9761cd"), stock: 87 },
    { id: "p5-3", name: "Eco Yoga Mat 6mm", category: "Yoga", price: 39.99, salePrice: 32.0, rating: 4.6, reviewCount: 998, image: img("photo-1544367567-0f2fcb009e0b"), stock: 260 },
    { id: "p5-4", name: "All-Season Camping Tent", category: "Outdoor", price: 189.0, rating: 4.5, reviewCount: 432, image: img("photo-1551632811-561732d1e306"), stock: 41 },
    { id: "p5-5", name: "Official Match Football", category: "Team Sports", price: 29.99, rating: 4.7, reviewCount: 654, image: img("photo-1575361204480-aadea25e6e68"), stock: 180 },
    { id: "p5-6", name: "Alloy Road Bike Helmet", category: "Cycling", price: 79.5, salePrice: 66.0, rating: 4.6, reviewCount: 321, image: img("photo-1485965120184-e220f721d03e"), stock: 95 },
  ],
  "6": [
    { id: "p6-1", name: "The Silent Meridian (Hardcover)", category: "Fiction", price: 24.99, rating: 4.8, reviewCount: 1245, image: img("photo-1544947950-fa07a98d237f"), stock: 130 },
    { id: "p6-2", name: "Atlas of Modern Architecture", category: "Non-Fiction", price: 49.0, salePrice: 42.0, rating: 4.7, reviewCount: 342, image: img("photo-1512820790803-83ca734da794"), stock: 58 },
    { id: "p6-3", name: "Classic Literature Box Set", category: "Fiction", price: 79.99, rating: 4.9, reviewCount: 567, image: img("photo-1481627834876-b7833e8f5570"), stock: 42 },
    { id: "p6-4", name: "Study Guide: World History", category: "Education", price: 19.99, salePrice: 15.99, rating: 4.5, reviewCount: 890, image: img("photo-1544947950-fa07a98d237f"), stock: 215 },
  ],
  "7": [
    { id: "p7-1", name: "Ceramic Brake Pad Set", category: "Parts", price: 89.99, salePrice: 74.99, rating: 4.6, reviewCount: 543, image: img("photo-1487754180451-c456f719a1fc"), stock: 76 },
    { id: "p7-2", name: "Performance Air Filter", category: "Parts", price: 39.99, rating: 4.7, reviewCount: 321, image: img("photo-1492144534655-ae79c964c9d7"), stock: 140 },
    { id: "p7-3", name: "LED Headlight Bulb Pair", category: "Accessories", price: 54.99, salePrice: 44.99, rating: 4.5, reviewCount: 765, image: img("photo-1503376780353-7e6692767b70"), stock: 210 },
    { id: "p7-4", name: "Universal Car Care Kit", category: "Tools", price: 64.5, rating: 4.8, reviewCount: 432, image: img("photo-1468495244123-6c6c332eeece"), stock: 88 },
  ],
  "8": [
    { id: "p8-1", name: "Premium Dry Dog Food 10kg", category: "Pet Food", price: 54.99, salePrice: 47.99, rating: 4.8, reviewCount: 1876, image: img("photo-1591946614720-90a587da4a36"), stock: 240 },
    { id: "p8-2", name: "Interactive Chew Toy", category: "Toys", price: 14.99, rating: 4.7, reviewCount: 932, image: img("photo-1548199973-03cce0bbc87b"), stock: 380 },
    { id: "p8-3", name: "Ceramic Pet Feeding Bowl", category: "Care", price: 24.5, salePrice: 19.99, rating: 4.6, reviewCount: 421, image: img("photo-1589924691995-400dc9ecc119"), stock: 175 },
    { id: "p8-4", name: "Cozy Cat Kitten Kit", category: "Toys", price: 34.99, rating: 4.9, reviewCount: 654, image: img("photo-1450778869180-41d0601e046e"), stock: 130 },
    { id: "p8-5", name: "Grooming Brush & Comb Set", category: "Care", price: 18.99, rating: 4.5, reviewCount: 387, image: img("photo-1601758228041-f3b2795255f1"), stock: 290 },
  ],
};

export const featuredVendors = [...vendors].sort((a, b) => b.rating - a.rating).slice(0, 6);

export function getVendorBySlug(slug: string): Vendor | undefined {
  return vendors.find((v) => v.slug === slug);
}

export function getVendorById(id: string): Vendor | undefined {
  return vendors.find((v) => v.id === id);
}

export function getVendorProducts(vendorId: string): VendorProduct[] {
  return vendorProducts[vendorId] ?? [];
}

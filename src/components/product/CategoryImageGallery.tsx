import Link from "next/link";

interface CategoryCard {
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

const CATEGORY_IMAGES: Record<string, CategoryCard[]> = {
  electronics: [
    { name: "Smartphones", slug: "smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80", itemCount: 312 },
    { name: "Laptops", slug: "laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80", itemCount: 245 },
    { name: "Headphones", slug: "headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80", itemCount: 189 },
    { name: "Smartwatches", slug: "smartwatches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80", itemCount: 156 },
    { name: "Cameras", slug: "cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80", itemCount: 98 },
    { name: "Gaming", slug: "gaming", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&auto=format&fit=crop&q=80", itemCount: 204 },
    { name: "Tablets", slug: "tablets", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&auto=format&fit=crop&q=80", itemCount: 132 },
    { name: "Speakers", slug: "speakers", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop&q=80", itemCount: 87 },
  ],
  fashion: [
    { name: "Men's Clothing", slug: "mens-clothing", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=80", itemCount: 278 },
    { name: "Women's Clothing", slug: "womens-clothing", image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&auto=format&fit=crop&q=80", itemCount: 345 },
    { name: "Footwear", slug: "footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80", itemCount: 198 },
    { name: "Watches", slug: "watches", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&auto=format&fit=crop&q=80", itemCount: 167 },
    { name: "Bags", slug: "bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=80", itemCount: 143 },
    { name: "Jewelry", slug: "jewelry", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&auto=format&fit=crop&q=80", itemCount: 112 },
  ],
  home_kitchen: [
    { name: "Furniture", slug: "furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80", itemCount: 256 },
    { name: "Cookware", slug: "cookware", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop&q=80", itemCount: 189 },
    { name: "Home Decor", slug: "home-decor", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=80", itemCount: 321 },
    { name: "Lighting", slug: "lighting", image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&auto=format&fit=crop&q=80", itemCount: 145 },
    { name: "Bedding", slug: "bedding", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&auto=format&fit=crop&q=80", itemCount: 178 },
    { name: "Storage", slug: "storage", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&auto=format&fit=crop&q=80", itemCount: 93 },
  ],
  beauty: [
    { name: "Skincare", slug: "skincare", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=80", itemCount: 234 },
    { name: "Makeup", slug: "makeup", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&auto=format&fit=crop&q=80", itemCount: 287 },
    { name: "Fragrances", slug: "fragrances", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&auto=format&fit=crop&q=80", itemCount: 156 },
    { name: "Hair Care", slug: "hair-care", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&auto=format&fit=crop&q=80", itemCount: 198 },
    { name: "Bath & Body", slug: "bath-body", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&auto=format&fit=crop&q=80", itemCount: 123 },
    { name: "Tools & Brushes", slug: "tools-brushes", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80", itemCount: 87 },
  ],
  sports: [
    { name: "Fitness Equipment", slug: "fitness", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80", itemCount: 212 },
    { name: "Running", slug: "running", image: "https://images.unsplash.com/photo-1461896836934-bd45ba9761cd?w=400&auto=format&fit=crop&q=80", itemCount: 178 },
    { name: "Yoga", slug: "yoga", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80", itemCount: 145 },
    { name: "Outdoor Gear", slug: "outdoor", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&auto=format&fit=crop&q=80", itemCount: 189 },
    { name: "Team Sports", slug: "team-sports", image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&auto=format&fit=crop&q=80", itemCount: 134 },
    { name: "Cycling", slug: "cycling", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format&fit=crop&q=80", itemCount: 97 },
  ],
};

const GROUP_SLUGS: Record<string, string> = {
  electronics: "electronics",
  fashion: "fashion",
  home_kitchen: "home-kitchen",
  beauty: "beauty",
  sports: "sports",
};

const ITEM_SLUG_OVERRIDES: Record<string, string> = {
  smartphones: "mobiles",
  tablets: "mobiles",
  laptops: "electronics",
  headphones: "electronics",
  smartwatches: "electronics",
  cameras: "electronics",
  gaming: "electronics",
  speakers: "electronics",
  "mens-clothing": "fashion",
  "womens-clothing": "fashion",
  footwear: "fashion",
  watches: "fashion",
  bags: "fashion",
  jewelry: "fashion",
  furniture: "home-kitchen",
  cookware: "home-kitchen",
  "home-decor": "home-kitchen",
  lighting: "home-kitchen",
  bedding: "home-kitchen",
  storage: "home-kitchen",
  skincare: "beauty",
  makeup: "beauty",
  fragrances: "beauty",
  "hair-care": "beauty",
  "bath-body": "beauty",
  "tools-brushes": "beauty",
  fitness: "sports",
  running: "sports",
  yoga: "sports",
  outdoor: "sports",
  "team-sports": "sports",
  cycling: "sports",
};

export default function CategoryImageGallery({
  category,
  title,
  subtitle,
  columns = 4,
}: {
  category: keyof typeof CATEGORY_IMAGES;
  title: string;
  subtitle?: string;
  columns?: 1 | 2 | 3 | 4 | 5;
}) {
  const items = CATEGORY_IMAGES[category];

  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  }[columns];

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Link
          href={`/shop?category=${GROUP_SLUGS[category] ?? category}`}
          className="text-sm font-medium text-emerald-600 hover:underline"
        >
          View All
        </Link>
      </div>
      <div className={`grid ${colClass} gap-4`}>
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/shop?category=${
              ITEM_SLUG_OVERRIDES[item.slug] ?? GROUP_SLUGS[category] ?? category
            }`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm group-hover:text-emerald-600 transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{item.itemCount} products</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
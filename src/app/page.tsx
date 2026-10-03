import AutoHeroBanner from "@/components/hero/AutoHeroBanner";
import AtoZCatalog from "@/components/product/AtoZCatalog";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryImageGallery from "@/components/product/CategoryImageGallery";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section>
        <AutoHeroBanner />
      </section>

      {/* Featured Categories - Electronics */}
      <div className="max-w-[1440px] mx-auto px-4">
        <CategoryImageGallery
          category="electronics"
          title="Top Electronics"
          subtitle="Explore the latest gadgets and tech"
          columns={4}
        />
      </div>

      {/* A-to-Z Category Directory */}
      <div className="max-w-[1440px] mx-auto px-4">
        <AtoZCatalog />
      </div>

      {/* Featured Categories - Fashion */}
      <div className="max-w-[1440px] mx-auto px-4">
        <CategoryImageGallery
          category="fashion"
          title="Trending Fashion"
          subtitle="Stay stylish with our curated collection"
          columns={4}
        />
      </div>

      {/* Product Grid */}
      <div className="max-w-[1440px] mx-auto px-4">
        <ProductGrid />
      </div>

      {/* Featured Categories - Beauty */}
      <div className="max-w-[1440px] mx-auto px-4">
        <CategoryImageGallery
          category="beauty"
          title="Beauty & Personal Care"
          subtitle="Look and feel your best"
          columns={4}
        />
      </div>
    </div>
  );
}
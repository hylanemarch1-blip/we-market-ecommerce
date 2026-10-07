import FestivalSaleCarousel from "@/components/hero/FestivalSaleCarousel";
import AutoHeroBanner from "@/components/hero/AutoHeroBanner";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryImageGallery from "@/components/product/CategoryImageGallery";
import DealsOfTheDay from "@/components/product/DealsOfTheDay";
import HomeShowcases from "@/components/home/HomeShowcases";
import CategoryPills from "@/components/home/CategoryPills";

export default function Home() {
  return (
    <div className="w-full">
      {/* Festival Flash Sale Carousel */}
      <FestivalSaleCarousel />

      {/* Hero Section */}
      <section className="mt-4">
        <AutoHeroBanner />
      </section>

      {/* Category pills bar */}
      <div className="max-w-[1440px] mx-auto px-4">
        <CategoryPills />
      </div>

      {/* Deals of the Day / Huge Discounts */}
      <div className="max-w-[1440px] mx-auto px-4">
        <DealsOfTheDay />
      </div>

      {/* Multi-category showcases */}
      <div className="max-w-[1440px] mx-auto px-4">
        <HomeShowcases />
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

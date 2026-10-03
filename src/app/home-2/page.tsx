import AutoHeroBanner from "@/components/hero/AutoHeroBanner";
import CategoryImageGallery from "@/components/product/CategoryImageGallery";

export default function Home2() {
  return (
    <div className="w-full">
      <section>
        <AutoHeroBanner />
      </section>

      <div className="max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CategoryImageGallery
            category="electronics"
            title="Electronics"
            subtitle="Gadgets & tech essentials"
            columns={2}
          />
          <CategoryImageGallery
            category="fashion"
            title="Fashion"
            subtitle="Latest trends & styles"
            columns={2}
          />
        </div>

        <CategoryImageGallery
          category="home_kitchen"
          title="Home & Kitchen"
          subtitle="Everything for your living space"
          columns={4}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CategoryImageGallery
            category="beauty"
            title="Beauty"
            subtitle="Skincare, makeup & more"
            columns={2}
          />
          <CategoryImageGallery
            category="sports"
            title="Sports & Fitness"
            subtitle="Gear up for your active lifestyle"
            columns={2}
          />
        </div>
      </div>
    </div>
  );
}
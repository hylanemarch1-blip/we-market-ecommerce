import CategoryImageGallery from "@/components/product/CategoryImageGallery";
import ProductGrid from "@/components/product/ProductGrid";
import AtoZCatalog from "@/components/product/AtoZCatalog";

export default function Home3() {
  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto px-4 py-4">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 md:p-12 text-white mb-8">
          <span className="text-emerald-200 text-sm font-semibold uppercase tracking-wider">Big Sale Up to 50% Off</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">Premium Electronics</h1>
          <p className="text-emerald-100 max-w-lg mb-6">
            Discover unbeatable deals on the latest gadgets. Limited time offer on top brands.
          </p>
          <a
            href="/shop?category=electronics"
            className="inline-block bg-white text-emerald-700 px-6 py-3 rounded-lg font-bold text-sm hover:bg-emerald-50 transition-colors"
          >
            Shop Now
          </a>
        </div>

        <CategoryImageGallery
          category="electronics"
          title="Featured Electronics"
          subtitle="Top picks from our electronics collection"
          columns={5}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AtoZCatalog />
          </div>
          <div className="lg:col-span-2">
            <CategoryImageGallery
              category="fashion"
              title="Fashion & Apparel"
              subtitle="New season arrivals"
              columns={3}
            />
          </div>
        </div>

        <ProductGrid />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CategoryImageGallery
            category="beauty"
            title="Beauty"
            columns={2}
          />
          <CategoryImageGallery
            category="sports"
            title="Sports"
            columns={2}
          />
        </div>
      </div>
    </div>
  );
}
import AutoHeroBanner from "@/components/hero/AutoHeroBanner";
import CategoryImageGallery from "@/components/product/CategoryImageGallery";
import ProductGrid from "@/components/product/ProductGrid";

export default function Home5() {
  return (
    <div className="w-full">
      <AutoHeroBanner />

      <div className="max-w-[1440px] mx-auto px-4">
        <div className="py-4 flex flex-wrap items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Featured Categories</h3>
            <p className="text-sm text-gray-500">Choose your necessary products from these featured categories.</p>
          </div>
          <div className="flex gap-3 mt-3 sm:mt-0">
            {["Electronics", "Fashion", "Home", "Beauty", "Sports"].map((cat) => (
              <a
                key={cat}
                href={`/shop?category=${cat.toLowerCase()}`}
                className="text-xs font-medium text-gray-500 hover:text-emerald-600 border border-gray-200 rounded-full px-4 py-1.5 hover:border-emerald-300 transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>

        <CategoryImageGallery
          category="electronics"
          title="Consumer Electronics"
          subtitle="Gadgets, devices & accessories"
          columns={4}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 my-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white flex flex-col justify-center">
            <span className="text-xs text-gray-400">Starting from $899</span>
            <h3 className="text-2xl font-bold mt-2 mb-2">iPhone 12 Pro 128Gb</h3>
            <p className="text-sm text-gray-400 mb-4">Special Sale</p>
            <a
              href="/shop"
              className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300"
            >
              Learn more
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="lg:col-span-3">
            <CategoryImageGallery category="fashion" title="Fashion Collection" columns={3} />
          </div>
        </div>

        <CategoryImageGallery
          category="home_kitchen"
          title="Home & Kitchen"
          subtitle="Stylish living starts here"
          columns={4}
        />

        <ProductGrid />

        <div className="grid grid-cols-2 gap-8">
          <CategoryImageGallery category="beauty" title="Beauty & Care" columns={2} />
          <CategoryImageGallery category="sports" title="Sports & Outdoors" columns={2} />
        </div>
      </div>
    </div>
  );
}
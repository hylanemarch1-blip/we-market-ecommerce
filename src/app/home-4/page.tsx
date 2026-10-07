import AutoHeroBanner from "@/components/hero/AutoHeroBanner";
import CategoryImageGallery from "@/components/product/CategoryImageGallery";

export default function Home4() {
  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <AutoHeroBanner />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            <a
              href="/shop?category=mobiles"
              className="relative rounded-xl overflow-hidden h-[188px] group"
            >
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80"
                alt="Smartphones"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <div>
                  <span className="text-emerald-300 text-xs font-semibold uppercase">10% Sale Off</span>
                  <h4 className="text-white font-bold text-sm">Apple Watch Series 7</h4>
                </div>
              </div>
            </a>
            <a
              href="/shop?q=laptop"
              className="relative rounded-xl overflow-hidden h-[188px] group"
            >
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80"
                alt="Laptops"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <div>
                  <span className="text-emerald-300 text-xs font-semibold uppercase">Latest Collection</span>
                  <h4 className="text-white font-bold text-sm">Apple Devices & Software</h4>
                </div>
              </div>
            </a>
          </div>
        </div>

        <CategoryImageGallery
          category="electronics"
          title="Popular Electronics"
          columns={4}
        />

        <CategoryImageGallery
          category="home_kitchen"
          title="Home & Kitchen Essentials"
          subtitle="Transform your living space"
          columns={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CategoryImageGallery category="fashion" title="Fashion" columns={1} />
          <CategoryImageGallery category="beauty" title="Beauty" columns={1} />
          <CategoryImageGallery category="sports" title="Sports" columns={1} />
        </div>
      </div>
    </div>
  );
}
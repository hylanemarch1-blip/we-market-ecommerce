export default function Storefront(
  // In a real app, params would be typed as { vendorSlug: string }
  // { params }: { params: { vendorSlug: string } }
) {
  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-1 gap-6">
          {/* Left: Store Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="h-48 rounded-lg overflow-hidden mb-4">
                <img
                  src="/placeholder-banner.jpg"
                  alt="Store Banner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/placeholder-logo.jpg"
                  alt="Store Logo"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold">Store Name</h2>
                  <p className="text-gray-500">Premium vendor since 2020</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Looking for quality products at competitive prices? You've come to the
                right place!
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded text-xs">Verified</span>
                <span className="px-3 py-1 bg-gray-200 text-gray-500 rounded text-xs">Domestic Shipping</span>
                <span className="px-3 py-1 bg-gray-200 text-gray-500 rounded text-xs">International</span>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-medium text-gray-700 mb-4">Product Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-600 rounded border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-600 transition-colors">
                  Electronics
                </button>
                <button className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-600 rounded border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-600 transition-colors">
                  Fashion
                </button>
                <button className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-600 rounded border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-600 transition-colors">
                  Home & Kitchen
                </button>
                <button className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-600 rounded border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-600 transition-colors">
                  Beauty
                </button>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6">
              <a href="#" className="w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700 transition-colors text-center">
                Preview Storefront
              </a>
            </div>
          </div>

          {/* Featured Products */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Featured Products</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm p-4 border border-gray-200">
                <img
                  src="/placeholder-product.jpg"
                  alt="Product"
                  className="w-full h-40 object-cover mb-3"
                />
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Ergonomic Office Chair</h4>
                  <p className="text-emerald-600 font-bold">$199.99</p>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm p-4 border border-gray-200">
                <img
                  src="/placeholder-product.jpg"
                  alt="Product"
                  className="w-full h-40 object-cover mb-3"
                />
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Smart Watch Pro</h4>
                  <p className="text-emerald-600 font-bold">$299.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function VendorDetails() {
  return (
    <section className="py-12">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vendor Profile Sidebar */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Store Name</h1>
              <p className="text-gray-600">Premium vendor since 2020</p>
            </div>

            {/* Vendor Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2x font-bold text-emerald-600">4.8</p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2x font-bold text-emerald-600">12.5k</p>
                <p className="text-sm text-gray-500">Sales</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2x font-bold text-emerald-600">2.3k</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
            </div>

            {/* Shipping Coverage */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3">Shipping Coverage</h3>
              <div className="flex gap-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded text-xs">Domestic</span>
                <span className="px-3 py-1 bg-gray-200 text-gray-500 rounded text-xs">International</span>
              </div>
            </div>

            {/* Ratings & Reviews */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3">Customer Reviews</h3>
              <p className="text-gray-600">1,248 reviews submitted</p>
            </div>

            {/* Store Policies */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3">Store Policies</h3>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>30-day return policy</li>
                <li>Secure payment guaranteed</li>
                <li>Express shipping available</li>
              </ul>
            </div>
          </div>

          {/* Featured Products */}
          <div>
            <h2 className="text-xl font-bold mb-4">Featured Products</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Product cards would go here */}
              <div className="bg-white rounded-lg p-4 h-full border border-gray-200">
                <img src="/placeholder-product.png" alt="Product" className="w-full h-40 object-cover rounded-md mb-3" />
                <h3 className="font-medium">Product 1</h3>
                <p className="text-emerald-600 font-bold">$99.99</p>
              </div>
              <div className="bg-white rounded-lg p-4 h-full border border-gray-200">
                <img src="/placeholder-product.png" alt="Product" className="w-full h-40 object-cover rounded-md mb-3" />
                <h3 className="font-medium">Product 2</h3>
                <p className="text-emerald-600 font-bold">$149.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
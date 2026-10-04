import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, Package, Truck, ShieldCheck, Users, Store } from "lucide-react";
import { getVendorById, getVendorProducts } from "@/data/vendors";

export default async function VendorDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vendor = getVendorById(id);

  if (!vendor) {
    notFound();
  }

  const products = getVendorProducts(vendor.id);

  return (
    <section className="py-12 bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-emerald-600">Home</Link> /{" "}
          <Link href="/vendors" className="hover:text-emerald-600">Vendors</Link> /{" "}
          <span className="text-gray-700">{vendor.name}</span>
        </p>

        {/* Store Banner */}
        <div className="h-48 md:h-60 rounded-2xl overflow-hidden mb-6 bg-gray-200">
          <img
            src={vendor.banner}
            alt={`${vendor.name} banner`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vendor Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={vendor.logo}
                  alt={`${vendor.name} logo`}
                  className="w-20 h-20 rounded-2xl object-cover border border-gray-200"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{vendor.name}</h1>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {vendor.location}
                  </p>
                  <p className="text-gray-500 text-sm">Premium vendor since {vendor.established}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {vendor.badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/store/${vendor.slug}`}
                  className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Store className="w-4 h-4" /> Visit Store
                </Link>
                <button className="flex-1 border border-emerald-600 text-emerald-600 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors">
                  Follow
                </button>
              </div>
            </div>

            {/* Vendor Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                <p className="text-2xl font-bold text-emerald-600">{vendor.rating}</p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                <p className="text-2xl font-bold text-emerald-600">
                  {(vendor.salesCount / 1000).toFixed(1)}k
                </p>
                <p className="text-sm text-gray-500">Sales</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                <p className="text-2xl font-bold text-emerald-600">
                  {(vendor.followerCount / 1000).toFixed(1)}k
                </p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
            </div>

            {/* Shipping Coverage */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Shipping Coverage</h3>
              <div className="flex flex-wrap gap-2">
                {vendor.shippingCoverage.map((coverage) => (
                  <span
                    key={coverage}
                    className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded text-xs flex items-center gap-1"
                  >
                    <Truck className="w-3 h-3" /> {coverage}
                  </span>
                ))}
              </div>
            </div>

            {/* Ratings & Reviews */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Customer Reviews</h3>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-bold text-gray-800">{vendor.rating}</span>
                <span className="text-sm text-gray-500">
                  {vendor.reviewCount.toLocaleString()} reviews submitted
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                {(vendor.followerCount / 1000).toFixed(1)}k followers
              </div>
            </div>

            {/* Store Policies */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Store Policies</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                {vendor.policies.map((policy) => (
                  <li key={policy} className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {policy}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Featured Products */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Featured Products</h2>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Package className="w-4 h-4" /> {products.length} items
              </span>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow group flex flex-col"
                  >
                    <div className="h-36 rounded-lg overflow-hidden bg-gray-100 mb-3 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.salePrice && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                          SALE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-emerald-600 font-medium mb-1">{product.category}</p>
                    <h3 className="font-medium text-sm text-gray-800 mb-2 leading-snug">{product.name}</h3>
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {product.rating}
                      </span>
                      <span className={product.stock > 0 ? "text-emerald-600" : "text-red-500"}>
                        {product.stock > 0 ? `${product.stock} in stock` : "Sold out"}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      {product.salePrice ? (
                        <div>
                          <p className="text-emerald-600 font-bold">${product.salePrice.toFixed(2)}</p>
                          <p className="text-[11px] text-gray-400 line-through">${product.price.toFixed(2)}</p>
                        </div>
                      ) : (
                        <p className="text-emerald-600 font-bold">${product.price.toFixed(2)}</p>
                      )}
                      <button
                        disabled={product.stock === 0}
                        className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Package className="mx-auto w-12 h-12 text-gray-300 mb-3" />
                <p className="text-gray-600">This vendor has no products yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

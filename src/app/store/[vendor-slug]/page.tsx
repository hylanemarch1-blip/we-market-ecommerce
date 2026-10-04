import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Truck, ShieldCheck, MapPin, Package, Heart } from "lucide-react";
import { getVendorBySlug, getVendorProducts } from "@/data/vendors";

export default async function Storefront({
  params,
}: {
  params: Promise<{ "vendor-slug": string }>;
}) {
  const { "vendor-slug": vendorSlug } = await params;
  const vendor = getVendorBySlug(vendorSlug);

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Store Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-44 bg-gray-100">
                <img
                  src={vendor.banner}
                  alt={`${vendor.name} banner`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 -mt-10 relative">
                <div className="flex items-end gap-3 mb-4">
                  <img
                    src={vendor.logo}
                    alt={`${vendor.name} logo`}
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow"
                  />
                  <div className="pb-1">
                    <h1 className="text-xl font-bold text-gray-800">{vendor.name}</h1>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {vendor.location}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>

                <div className="flex items-center gap-4 text-sm mb-4">
                  <span className="flex items-center gap-1 font-medium text-gray-700">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {vendor.rating} ({vendor.reviewCount.toLocaleString()} reviews)
                  </span>
                  <span className="text-gray-400">Est. {vendor.established}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-gray-50 rounded-lg py-2">
                    <p className="font-bold text-emerald-600">{(vendor.salesCount / 1000).toFixed(0)}k+</p>
                    <p className="text-[11px] text-gray-500">Sales</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-2">
                    <p className="font-bold text-emerald-600">{(vendor.followerCount / 1000).toFixed(1)}k</p>
                    <p className="text-[11px] text-gray-500">Followers</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-2">
                    <p className="font-bold text-emerald-600">{products.length}</p>
                    <p className="text-[11px] text-gray-500">Products</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
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

                <div className="flex flex-wrap gap-2 mb-4">
                  {vendor.shippingCoverage.map((coverage) => (
                    <span
                      key={coverage}
                      className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-xs flex items-center gap-1"
                    >
                      <Truck className="w-3 h-3" />
                      {coverage} Shipping
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" /> Follow Store
                  </button>
                  <Link
                    href="/shop"
                    className="flex-1 border border-emerald-600 text-emerald-600 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors text-center"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-medium text-gray-700 mb-4">Product Categories</h3>
              <div className="flex flex-wrap gap-2">
                {vendor.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-600 rounded border border-emerald-200"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Store Policies */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-medium text-gray-700 mb-4">Store Policies</h3>
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
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                  >
                    <div className="h-40 bg-gray-100 overflow-hidden relative">
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
                      {product.stock === 0 && (
                        <span className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-[11px] text-emerald-600 font-medium mb-1">{product.category}</p>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-medium text-sm text-gray-800 leading-snug">{product.name}</h4>
                        <div className="text-right shrink-0">
                          {product.salePrice ? (
                            <>
                              <p className="text-emerald-600 font-bold">${product.salePrice.toFixed(2)}</p>
                              <p className="text-[11px] text-gray-400 line-through">${product.price.toFixed(2)}</p>
                            </>
                          ) : (
                            <p className="text-emerald-600 font-bold">${product.price.toFixed(2)}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {product.rating} ({product.reviewCount.toLocaleString()})
                        </span>
                        <span className={product.stock > 0 ? "text-emerald-600" : "text-red-500"}>
                          {product.stock > 0 ? `${product.stock} in stock` : "Sold out"}
                        </span>
                      </div>
                      <button
                        disabled={product.stock === 0}
                        className="mt-3 w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                <p className="text-gray-600">This store has no products yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

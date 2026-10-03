import Link from "next/link";
import { Star, ShoppingBag, Filter, ArrowUpDown } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Organic Fresh Apples",
    category: "Fruits",
    price: 4.99,
    originalPrice: 6.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Wireless Noise-Canceling Headphones",
    category: "Electronics",
    price: 89.99,
    originalPrice: 120.0,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Classic Smart Watch Series 5",
    category: "Gadgets",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 149.0,
    originalPrice: 189.0,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Whole Grain Organic Bread",
    category: "Bakery",
    price: 3.49,
    originalPrice: 4.50,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "Fresh Whole Milk 1 Gal",
    category: "Dairy",
    price: 3.99,
    originalPrice: 5.20,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60",
  },
];

export default function ShopPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-1">
            <Link href="/" className="hover:underline">Home</Link> / Shop
          </p>
          <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 font-bold text-gray-800 mb-4">
                <Filter size={18} />
                <span>Categories</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="cursor-pointer hover:text-emerald-600 font-medium">All Categories</li>
                <li className="cursor-pointer hover:text-emerald-600">Fruits & Vegetables</li>
                <li className="cursor-pointer hover:text-emerald-600">Electronics</li>
                <li className="cursor-pointer hover:text-emerald-600">Furniture</li>
                <li className="cursor-pointer hover:text-emerald-600">Bakery & Dairy</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 text-sm mb-3">Price Range</h3>
              <input type="range" min="0" max="300" className="w-full accent-emerald-600" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$0</span>
                <span>$300</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-200">
              <span className="text-sm text-gray-500">Showing {products.length} products</span>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ArrowUpDown size={16} />
                <span>Sort by: Featured</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition flex flex-col"
                >
                  <div className="h-48 overflow-hidden bg-gray-100 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-xs text-gray-400 font-medium">{product.category}</span>
                    <h2 className="text-sm font-semibold text-gray-800 mt-1 line-clamp-1">
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-1 mt-2 text-amber-500 text-xs font-semibold">
                      <Star size={14} fill="currentColor" />
                      <span>{product.rating}</span>
                    </div>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-base font-bold text-emerald-600">${product.price}</span>
                        <span className="text-xs text-gray-400 line-through ml-2">
                          ${product.originalPrice}
                        </span>
                      </div>
                      <button className="bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-600 p-2 rounded-lg transition">
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Star, Truck, Globe, Award, MapPin, Users } from "lucide-react";
import Link from "next/link";

interface Vendor {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  rating: number;
  reviewCount: number;
  salesCount: number;
  followerCount: number;
  categories: string[];
  badges: string[];
  shippingCoverage: string[];
  verified: boolean;
  established: string;
  location: string;
}

const mockVendors: Vendor[] = [
  {
    id: "1",
    slug: "tech-hub-electronics",
    name: "TechHub Electronics",
    description: "Premium consumer electronics and gadgets with global warranty",
    logo: "https://images.unsplash.com/photo-1550745165-9bc0b258726f?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 2847,
    salesCount: 125000,
    followerCount: 15600,
    categories: ["Electronics", "Smartphones", "Laptops", "Accessories"],
    badges: ["Verified", "Top Seller", "Fast Shipping"],
    shippingCoverage: ["Domestic", "International"],
    verified: true,
    established: "2018",
    location: "Bangalore, India",
  },
  {
    id: "2",
    slug: "fashion-forward",
    name: "Fashion Forward",
    description: "Trendy apparel and accessories for modern lifestyles",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 1923,
    salesCount: 89000,
    followerCount: 23400,
    categories: ["Fashion", "Women's Wear", "Men's Wear", "Accessories"],
    badges: ["Verified", "Eco-Friendly", "Express Delivery"],
    shippingCoverage: ["Domestic", "International"],
    verified: true,
    established: "2019",
    location: "Mumbai, India",
  },
  {
    id: "3",
    slug: "home-essentials",
    name: "Home Essentials Co.",
    description: "Quality home and kitchen products for everyday living",
    logo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 3421,
    salesCount: 156000,
    followerCount: 18900,
    categories: ["Home & Kitchen", "Decor", "Furniture", "Organization"],
    badges: ["Verified", "Best Value", "Easy Returns"],
    shippingCoverage: ["Domestic"],
    verified: true,
    established: "2017",
    location: "Delhi, India",
  },
  {
    id: "4",
    slug: "beauty-glow",
    name: "Beauty Glow",
    description: "Premium skincare, makeup, and wellness products",
    logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 4156,
    salesCount: 203000,
    followerCount: 31200,
    categories: ["Beauty", "Skincare", "Makeup", "Wellness"],
    badges: ["Verified", "Cruelty-Free", "Dermatologist Approved"],
    shippingCoverage: ["Domestic", "International"],
    verified: true,
    established: "2020",
    location: "Seoul, South Korea",
  },
  {
    id: "5",
    slug: "sports-pro",
    name: "Sports Pro Gear",
    description: "Professional sports equipment and athletic wear",
    logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1461896836934-ede607bae9ef?w=800&h=300&fit=crop",
    rating: 4.5,
    reviewCount: 1234,
    salesCount: 67000,
    followerCount: 9800,
    categories: ["Sports", "Fitness", "Outdoor", "Equipment"],
    badges: ["Verified", "Official Partner", "Warranty Included"],
    shippingCoverage: ["Domestic", "International"],
    verified: true,
    established: "2016",
    location: "Pune, India",
  },
  {
    id: "6",
    slug: "book-world",
    name: "Book World",
    description: "Extensive collection of books across all genres",
    logo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 987,
    salesCount: 45000,
    followerCount: 12300,
    categories: ["Books", "Education", "Fiction", "Non-Fiction"],
    badges: ["Verified", "Wide Selection", "Free Shipping"],
    shippingCoverage: ["Domestic"],
    verified: true,
    established: "2015",
    location: "Chennai, India",
  },
  {
    id: "7",
    slug: "auto-parts-plus",
    name: "Auto Parts Plus",
    description: "Genuine automotive parts and accessories for all vehicles",
    logo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=300&fit=crop",
    rating: 4.4,
    reviewCount: 1876,
    salesCount: 78000,
    followerCount: 8900,
    categories: ["Automotive", "Parts", "Accessories", "Tools"],
    badges: ["Verified", "Genuine Parts", "Expert Support"],
    shippingCoverage: ["Domestic", "International"],
    verified: true,
    established: "2014",
    location: "Gurgaon, India",
  },
  {
    id: "8",
    slug: "pet-paradise",
    name: "Pet Paradise",
    description: "Premium pet food, toys, and care products",
    logo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 2134,
    salesCount: 92000,
    followerCount: 14500,
    categories: ["Pets", "Pet Food", "Toys", "Care"],
    badges: ["Verified", "Vet Recommended", "Subscription Available"],
    shippingCoverage: ["Domestic"],
    verified: true,
    established: "2021",
    location: "Hyderabad, India",
  },
];

const allCategories = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Books",
  "Automotive",
  "Pets",
];

export default function VendorLanding() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedShipping, setSelectedShipping] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "sales" | "reviews" | "newest">("rating");

  const filteredVendors = useMemo(() => {
    return mockVendors
      .filter((vendor) => {
        const matchesSearch =
          vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.categories.some((cat) =>
            cat.toLowerCase().includes(searchQuery.toLowerCase())
          );
        const matchesCategory =
          selectedCategory === "All" || vendor.categories.includes(selectedCategory);
        const matchesShipping =
          selectedShipping.length === 0 ||
          selectedShipping.every((s) => vendor.shippingCoverage.includes(s));
        return matchesSearch && matchesCategory && matchesShipping;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return b.rating - a.rating;
          case "sales":
            return b.salesCount - a.salesCount;
          case "reviews":
            return b.reviewCount - a.reviewCount;
          case "newest":
            return new Date(b.established).getTime() - new Date(a.established).getTime();
          default:
            return 0;
        }
      });
  }, [searchQuery, selectedCategory, selectedShipping, sortBy]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#ffffff_1px,_transparent_1px)] bg-[length:20px_20px]" />
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Discover 50,000+ Verified Vendors
              </h1>
              <p className="text-emerald-100 text-lg md:text-xl mb-8">
                Find trusted suppliers across 50+ categories. Compare ratings, reviews,
                and shipping options to choose the best partner for your business.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/seller/register"
                  className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
                >
                  Start Selling
                </Link>
                <Link
                  href="/seller/login"
                  className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-800 transition-colors"
                >
                  Vendor Login
                </Link>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-10">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
                alt="Marketplace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">50,000+</p>
                <p className="text-sm text-gray-500">Active Vendors</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">200+</p>
                <p className="text-sm text-gray-500">Countries Served</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">50+</p>
                <p className="text-sm text-gray-500">Categories</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">99.2%</p>
                <p className="text-sm text-gray-500">On-time Delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vendors, products, categories..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  Filters
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="rating">Top Rated</option>
                <option value="sales">Best Selling</option>
                <option value="reviews">Most Reviewed</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Coverage</label>
                  <div className="flex flex-wrap gap-2">
                    {["Domestic", "International"].map((coverage) => (
                      <label key={coverage} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedShipping.includes(coverage)}
                          onChange={(e) =>
                            setSelectedShipping((prev) =>
                              e.target.checked
                                ? [...prev, coverage]
                                : prev.filter((s) => s !== coverage)
                            )
                          }
                          className="w-4 h-4 rounded border-gray-300 focus:ring-emerald-500 text-emerald-600"
                        />
                        <span className="text-sm text-gray-600">{coverage}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Badges</label>
                  <div className="flex flex-wrap gap-2">
                    {["Verified", "Top Seller", "Fast Shipping", "Eco-Friendly", "Express Delivery"].map(
                      (badge) => (
                        <label key={badge} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 focus:ring-emerald-500 text-emerald-600"
                          />
                          <span className="text-sm text-gray-600">{badge}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      className="w-48 h-2 bg-gray-200 rounded-lg appearance-none accent-emerald-600"
                    />
                    <span className="text-sm text-gray-600">4.0+</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredVendors.length} {filteredVendors.length === 1 ? "Vendor" : "Vendors"} Found
            </h2>
            <p className="text-gray-500 text-sm">
              Showing top vendors matching your criteria
            </p>
          </div>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVendors.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/store/${vendor.slug}`}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all duration-300"
            >
              {/* Vendor Banner */}
              <div className="relative h-32 bg-gray-100 overflow-hidden">
                <img
                  src={vendor.banner}
                  alt={`${vendor.name} banner`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {vendor.verified && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                )}
              </div>

              {/* Vendor Content */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={vendor.logo}
                    alt={`${vendor.name} logo`}
                    className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate group-hover:text-emerald-600 transition-colors">
                      {vendor.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">{vendor.description}</p>
                  </div>
                </div>

                {/* Rating & Stats */}
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{vendor.rating}</span>
                    <span className="text-xs text-gray-400">({formatNumber(vendor.reviewCount)})</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Truck className="w-3 h-3" />
                    <span>{vendor.shippingCoverage.join(", ")}</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {vendor.categories.slice(0, 3).map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-600 rounded border border-emerald-200"
                    >
                      {cat}
                    </span>
                  ))}
                  {vendor.categories.length > 3 && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-500 rounded border border-gray-200">
                      +{vendor.categories.length - 3} more
                    </span>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {vendor.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2 py-0.5 text-xs font-medium bg-gray-50 text-gray-600 rounded border border-gray-200"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Location & Established */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {vendor.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Est. {vendor.established}
                  </span>
                </div>

                {/* Visit Store Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                    Visit Store
                    <Truck className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>
          ))}

          {filteredVendors.length === 0 && (
            <div className="col-span-full text-center py-16">
              <Search className="mx-auto w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No vendors found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of vendors already selling on WE-Market. Get access to global
              customers, powerful tools, and dedicated support.
            </p>
            <Link
              href="/seller/register"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Become a Vendor
              <Truck className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState, useMemo } from "react";
import { Search, Star, MapPin, Package, Store } from "lucide-react";
import Link from "next/link";
import { vendors, getVendorProducts, type Vendor } from "@/data/vendors";

const categoryTags = ["All", "Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports", "Books", "Automotive", "Pets"];

function VendorCard({ vendor }: { vendor: Vendor }) {
  const productCount = getVendorProducts(vendor.id).length;

  return (
    <Link
      href={`/store/${vendor.slug}`}
      className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-emerald-300 transition-all"
    >
      <div className="relative h-28 bg-gray-100">
        <img
          src={vendor.banner}
          alt={`${vendor.name} banner`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <img
          src={vendor.logo}
          alt={`${vendor.name} logo`}
          className="absolute -bottom-6 left-4 w-14 h-14 rounded-xl object-cover border-2 border-white shadow"
        />
        {vendor.verified && (
          <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
            Verified
          </span>
        )}
      </div>

      <div className="pt-8 p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-800 truncate group-hover:text-emerald-600 transition-colors">
            {vendor.name}
          </h3>
          <span className="flex items-center gap-1 text-sm font-medium text-gray-700 shrink-0">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            {vendor.rating}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{vendor.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {vendor.categories.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="px-2 py-0.5 text-[11px] font-medium bg-emerald-50 text-emerald-600 rounded border border-emerald-200"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {vendor.location}
          </span>
          <span className="flex items-center gap-1">
            <Package className="w-3.5 h-3.5" />
            {productCount} products
          </span>
        </div>

        <span className="mt-3 inline-flex items-center justify-center gap-2 w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium group-hover:bg-emerald-700 transition-colors">
          <Store className="w-4 h-4" />
          Visit Store
        </span>
      </div>
    </Link>
  );
}

export default function Vendors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        vendor.name.toLowerCase().includes(q) ||
        vendor.description.toLowerCase().includes(q) ||
        vendor.location.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "All" ||
        vendor.categories.some((c) => c.toLowerCase() === activeCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section className="py-12 bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-1">
            <Link href="/" className="hover:text-emerald-600">Home</Link> / Vendors
          </p>
          <h1 className="text-3xl font-bold text-gray-800">Active Vendors</h1>
          <p className="text-gray-600 mt-2">
            Browse {vendors.length} verified stores and find the right supplier for your needs.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vendors by name, description, or location..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
            aria-label="Search vendors"
          />
        </div>

        {/* Category Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveCategory(tag)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                activeCategory === tag
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600"
              }`}
              aria-pressed={activeCategory === tag}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredVendors.length} of {vendors.length} vendors
        </p>

        {/* Vendor Grid */}
        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <Store className="mx-auto w-14 h-14 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No vendors found</h3>
            <p className="text-gray-500 text-sm">Try a different search term or category.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-emerald-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Want your store listed here?</h2>
          <p className="text-emerald-100 mb-6">Join WE-Market and reach thousands of buyers today.</p>
          <Link
            href="/seller/register"
            className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors"
          >
            Register as a Vendor
          </Link>
        </div>
      </div>
    </section>
  );
}

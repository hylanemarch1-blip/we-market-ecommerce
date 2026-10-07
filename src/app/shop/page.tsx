"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, ShoppingBag, ArrowUpDown, ArrowRightLeft, Tag, X } from "lucide-react";
import { products, getDiscountPercent } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import {
  filterProductsByBrands,
  filterProductsByCategory,
  filterProductsByMinRating,
  filterProductsByOrigin,
  filterProductsByPrice,
  filterProductsByQuery,
  filterProductsInStock,
  parseListParam,
  parseNumberParam,
  slugifyCategory,
} from "@/lib/shop-filter";
import ShopSidebar from "@/components/shop/ShopSidebar";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";
import { useFormatPrice } from "@/context/CurrencyContext";

const CATEGORY_FILTERS = [
  { label: "All Categories", slug: "" },
  ...CATEGORIES,
];

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-gray-50 min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-32 bg-white rounded-xl border border-gray-200 animate-pulse" />
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";
  const activeSlug = slugifyCategory(activeCategory);
  const activeQuery = searchParams.get("q") ?? "";
  const saleOnly = searchParams.get("sale") === "true";

  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const minPrice = minPriceParam ? parseNumberParam(minPriceParam, 0) : null;
  const maxPrice = maxPriceParam ? parseNumberParam(maxPriceParam, Infinity) : null;
  const activeBrands = parseListParam(searchParams.get("brand"));
  const activeOrigins = parseListParam(searchParams.get("origin"));
  const minRatingParam = searchParams.get("minRating");
  const minRating = minRatingParam ? parseNumberParam(minRatingParam, 0) : null;
  const inStockOnly = searchParams.get("inStock") === "true";

  const { addItem } = useCart();
  const format = useFormatPrice();
  const {
    items: compareItems,
    isFull: compareFull,
    toggleCompare,
  } = useCompare();

  const filteredProducts = useMemo(() => {
    let list = products;
    if (saleOnly) list = list.filter((product) => product.onSale);
    if (activeQuery.trim()) list = filterProductsByQuery(list, activeQuery);
    if (activeCategory) list = filterProductsByCategory(list, activeCategory);
    if (minPrice !== null || maxPrice !== null) {
      list = filterProductsByPrice(
        list,
        minPrice,
        maxPrice === Infinity ? null : maxPrice
      );
    }
    if (activeBrands.length > 0) list = filterProductsByBrands(list, activeBrands);
    if (minRating) list = filterProductsByMinRating(list, minRating);
    if (inStockOnly) list = filterProductsInStock(list, true);
    if (activeOrigins.length > 0) list = filterProductsByOrigin(list, activeOrigins);
    return list;
  }, [
    activeCategory,
    activeQuery,
    saleOnly,
    minPrice,
    maxPrice,
    activeBrands,
    minRating,
    inStockOnly,
    activeOrigins,
  ]);

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "") params.delete(key);
    else params.set(key, value);
    const query = params.toString();
    router.replace(query ? `/shop?${query}` : "/shop", { scroll: false });
  };

  const removeParam = (key: string) => setParam(key, null);

  const pageTitle = saleOnly
    ? "Offer Zone"
    : activeQuery.trim()
      ? `Results for “${activeQuery.trim()}”`
      : activeSlug
        ? CATEGORY_FILTERS.find((category) => category.slug === activeSlug)?.label ??
          "All Products"
        : "All Products";

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-1">
            <Link href="/" className="hover:underline">Home</Link> /{" "}
            <Link href="/shop" className="hover:underline">Shop</Link>
            {saleOnly && " / Offer Zone"}
            {activeSlug && !saleOnly && ` / ${pageTitle}`}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
            {saleOnly && (
              <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
                LIMITED TIME DEALS
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {saleOnly
              ? "Handpicked discounts across every category — while stocks last."
              : activeQuery.trim()
                ? `Matching products for “${activeQuery.trim()}”`
                : "Browse the full catalogue with category filters on the left."}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <ShopSidebar />

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-gray-500">
                  Showing {filteredProducts.length} products
                </span>
                {activeQuery.trim() && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                    <Tag size={12} /> {activeQuery.trim()}
                  </span>
                )}
                {saleOnly && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-red-50 text-red-600 px-2.5 py-1 rounded-full">
                    <Tag size={12} /> On Sale
                  </span>
                )}
                {minPrice !== null && (
                  <button
                    onClick={() => removeParam("minPrice")}
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full hover:bg-blue-100"
                  >
                    Min {format(minPrice, 0)} <X size={11} />
                  </button>
                )}
                {maxPrice !== null && maxPrice !== Infinity && (
                  <button
                    onClick={() => removeParam("maxPrice")}
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full hover:bg-blue-100"
                  >
                    Max {format(maxPrice, 0)} <X size={11} />
                  </button>
                )}
                {activeBrands.map((brand) => (
                  <button
                    key={`brand-${brand}`}
                    onClick={() =>
                      setParam(
                        "brand",
                        activeBrands.filter((entry) => entry !== brand).join(",") || null
                      )
                    }
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full hover:bg-gray-200"
                  >
                    {brand} <X size={11} />
                  </button>
                ))}
                {minRating !== null && minRating > 0 && (
                  <button
                    onClick={() => removeParam("minRating")}
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full hover:bg-amber-100"
                  >
                    {minRating} Stars &amp; up <X size={11} />
                  </button>
                )}
                {inStockOnly && (
                  <button
                    onClick={() => removeParam("inStock")}
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full hover:bg-emerald-100"
                  >
                    In Stock Only <X size={11} />
                  </button>
                )}
                {activeOrigins.map((origin) => (
                  <button
                    key={`origin-${origin}`}
                    onClick={() =>
                      setParam(
                        "origin",
                        activeOrigins.filter((entry) => entry !== origin).join(",") || null
                      )
                    }
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full hover:bg-purple-100"
                  >
                    {origin} <X size={11} />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ArrowUpDown size={16} />
                <span>Sort by: Featured</span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-sm text-gray-500">
                  No products found for the selected filters. Try another
                  category or search term.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const inCompare = compareItems.some((item) => item.id === product.id);
                  const discount = getDiscountPercent(product);
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition flex flex-col"
                    >
                      <div className="h-48 overflow-hidden bg-gray-100 relative">
                        <Link
                          href={`/products/${product.id}`}
                          className="block w-full h-full"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition duration-300"
                          />
                        </Link>
                        {discount > 0 && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                            {discount}% OFF
                          </span>
                        )}
                        <button
                          onClick={() => toggleCompare(product)}
                          disabled={compareFull && !inCompare}
                          title={
                            inCompare
                              ? "Remove from compare"
                              : compareFull
                                ? "Compare list is full"
                                : "Add to compare"
                          }
                          aria-label={`Compare ${product.name}`}
                          className={`absolute top-2 right-2 p-2 rounded-lg border shadow-sm transition-colors ${
                            inCompare
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "bg-white/90 border-gray-200 text-gray-500 hover:text-emerald-600 hover:border-emerald-600 disabled:opacity-50"
                          }`}
                        >
                          <ArrowRightLeft size={15} />
                        </button>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <span className="text-xs text-gray-400 font-medium">{product.category}</span>
                        <Link
                          href={`/products/${product.id}`}
                          className="text-sm font-semibold text-gray-800 mt-1 line-clamp-1 hover:text-emerald-600"
                        >
                          {product.name}
                        </Link>
                        <div className="flex items-center gap-1 mt-2 text-amber-500 text-xs font-semibold">
                          <Star size={14} fill="currentColor" />
                          <span>{product.rating}</span>
                        </div>
                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <div>
                            <span className="text-base font-bold text-emerald-600">
                              {format(product.price)}
                            </span>
                            <span className="text-xs text-gray-400 line-through ml-2">
                              {format(product.originalPrice)}
                            </span>
                          </div>
                          <button
                            onClick={() => addItem(product)}
                            disabled={product.stock <= 0}
                            aria-label={`Add ${product.name} to cart`}
                            className="bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-600 p-2 rounded-lg transition disabled:opacity-40"
                          >
                            <ShoppingBag size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

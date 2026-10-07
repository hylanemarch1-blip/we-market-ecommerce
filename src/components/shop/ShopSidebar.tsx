"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Search, Star, X } from "lucide-react";
import { useFormatPrice } from "@/context/CurrencyContext";
import { products } from "@/data/products";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";
import {
  filterProductsByCategory,
  getProductOrigin,
  parseListParam,
  parseNumberParam,
  slugifyCategory,
} from "@/lib/shop-filter";

const CATEGORY_FILTERS = [{ label: "All Categories", slug: "" }, ...CATEGORIES];

export const PRICE_MAX = Math.max(
  500,
  Math.ceil(Math.max(...products.map((product) => product.price)) / 50) * 50
);

const toPercent = (value: number) => (value / PRICE_MAX) * 100;

export default function ShopSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const format = useFormatPrice();
  const [brandQuery, setBrandQuery] = useState("");
  const [originQuery, setOriginQuery] = useState("");

  const activeCategory = searchParams.get("category") ?? "";
  const activeSlug = slugifyCategory(activeCategory);
  const activeSub = searchParams.get("sub") ?? "";
  const saleOnly = searchParams.get("sale") === "true";

  const minPrice = parseNumberParam(searchParams.get("minPrice"), 0);
  const maxPrice = parseNumberParam(searchParams.get("maxPrice"), PRICE_MAX);
  const selectedBrands = parseListParam(searchParams.get("brand"));
  const selectedOrigins = parseListParam(searchParams.get("origin"));
  const minRatingParam = searchParams.get("minRating");
  const minRating = minRatingParam ? parseNumberParam(minRatingParam, 0) : 0;
  const inStockOnly = searchParams.get("inStock") === "true";

  const [draftMin, setDraftMin] = useState(minPrice);
  const [draftMax, setDraftMax] = useState(maxPrice);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDraftMin(minPrice);
      setDraftMax(maxPrice);
    }, 0);
    return () => clearTimeout(timeout);
  }, [minPrice, maxPrice]);

  const buildHref = (updates: Record<string, string | null>): string => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    }
    const query = params.toString();
    return query ? `/shop?${query}` : "/shop";
  };

  const navigate = (updates: Record<string, string | null>) => {
    router.replace(buildHref(updates), { scroll: false });
  };

  const categoryScoped = useMemo(
    () =>
      activeCategory ? filterProductsByCategory(products, activeCategory) : products,
    [activeCategory]
  );

  const brandOptions = useMemo(
    () => [...new Set(categoryScoped.map((product) => product.brand))].sort(),
    [categoryScoped]
  );

  const originOptions = useMemo(
    () =>
      [...new Set(categoryScoped.map((product) => getProductOrigin(product)))].sort(),
    [categoryScoped]
  );

  const visibleBrands = brandOptions.filter((brand) =>
    brand.toLowerCase().includes(brandQuery.trim().toLowerCase())
  );

  const visibleOrigins = originOptions.filter((origin) =>
    origin.toLowerCase().includes(originQuery.trim().toLowerCase())
  );

  const commitPrice = () => {
    const lo = Math.min(draftMin, draftMax);
    const hi = Math.max(draftMin, draftMax);
    navigate({
      minPrice: lo <= 0 ? null : String(lo),
      maxPrice: hi >= PRICE_MAX ? null : String(hi),
    });
  };

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftMin(Math.min(Number(event.target.value), draftMax));
  };

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftMax(Math.max(Number(event.target.value), draftMin));
  };

  const toggleInList = (list: string[], value: string): string[] =>
    list.includes(value)
      ? list.filter((entry) => entry !== value)
      : [...list, value];

  const activeFilterCount =
    selectedBrands.length +
    selectedOrigins.length +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minPrice > 0 || maxPrice < PRICE_MAX ? 1 : 0);

  const clearAll = () =>
    navigate({
      minPrice: null,
      maxPrice: null,
      brand: null,
      origin: null,
      minRating: null,
      inStock: null,
    });

  return (
    <aside className="w-full lg:w-56 flex-shrink-0 space-y-3">
      {/* Categories */}
      <div className="bg-white p-3 rounded-xl border border-gray-200">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs mb-2">
          <Filter size={14} />
          <span>Categories</span>
        </div>
        <ul className="space-y-1">
          {CATEGORY_FILTERS.map((category) => {
            const isActive = !saleOnly && category.slug === activeSlug;
            return (
              <li key={category.label}>
                <Link
                  href={
                    category.slug
                      ? buildHref({
                          category: encodeURIComponent(category.slug),
                          sale: null,
                          sub: null,
                        })
                      : buildHref({ category: null, sale: null, sub: null })
                  }
                  scroll={false}
                  className={`text-xs md:text-sm font-medium text-slate-700 hover:text-blue-600 py-1 px-2 rounded-md transition-colors block truncate ${
                    isActive ? "text-blue-600 font-semibold bg-blue-50" : ""
                  }`}
                >
                  {category.label}
                </Link>
              </li>
            );
          })}
          <SubcategoryLinks
            activeSlug={activeSlug}
            activeSub={activeSub}
            buildHref={buildHref}
          />
          <li className="pt-1.5 border-t border-gray-100 mt-1.5">
            <Link
              href={buildHref({ sale: "true", category: null, sub: null })}
              scroll={false}
              className={`text-xs md:text-sm font-medium py-1 px-2 rounded-md block truncate transition-colors ${
                saleOnly
                  ? "text-orange-500 font-semibold bg-orange-50"
                  : "text-orange-500 hover:text-orange-600"
              }`}
            >
              Offer Zone (Up to 60% OFF)
            </Link>
          </li>
        </ul>
      </div>

      {/* Price Range */}
      <div className="bg-white p-3 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-slate-700 text-xs">Price Range</h3>
          {(minPrice > 0 || maxPrice < PRICE_MAX) && (
            <button
              onClick={() => {
                setDraftMin(0);
                setDraftMax(PRICE_MAX);
                navigate({ minPrice: null, maxPrice: null });
              }}
              className="text-[10px] font-semibold text-slate-400 hover:text-blue-600"
            >
              Reset
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
          <span className="bg-slate-100 rounded px-1.5 py-0.5">{format(draftMin, 0)}</span>
          <span className="text-slate-400">to</span>
          <span className="bg-slate-100 rounded px-1.5 py-0.5">
            {format(draftMax, 0)}
            {draftMax >= PRICE_MAX ? "+" : ""}
          </span>
        </div>

        <div className="dual-range">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gray-200" />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-emerald-500"
            style={{
              left: `${toPercent(draftMin)}%`,
              right: `${100 - toPercent(draftMax)}%`,
            }}
          />
          <input
            type="range"
            min={0}
            max={PRICE_MAX}
            step={5}
            value={draftMin}
            onChange={handleMinChange}
            onPointerUp={commitPrice}
            onKeyUp={commitPrice}
            onBlur={commitPrice}
            aria-label="Minimum price"
          />
          <input
            type="range"
            min={0}
            max={PRICE_MAX}
            step={5}
            value={draftMax}
            onChange={handleMaxChange}
            onPointerUp={commitPrice}
            onKeyUp={commitPrice}
            onBlur={commitPrice}
            aria-label="Maximum price"
          />
        </div>

        <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
          <span>{format(0, 0)}</span>
          <span>{format(PRICE_MAX, 0)}</span>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="bg-white p-3 rounded-xl border border-gray-200">
        <h3 className="font-bold text-slate-700 text-xs mb-2">Brand</h3>
        <div className="relative mb-2">
          <Search
            size={12}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={brandQuery}
            onChange={(event) => setBrandQuery(event.target.value)}
            placeholder="Search brands"
            aria-label="Search brands"
            className="w-full border border-slate-200 rounded-md pl-7 pr-2 py-1.5 text-xs text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <ul className="max-h-36 overflow-y-auto space-y-1 pr-1">
          {visibleBrands.length === 0 && (
            <li className="text-xs text-slate-400">No brands found</li>
          )}
          {visibleBrands.map((brand) => (
            <li key={brand}>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer hover:text-slate-800">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    navigate({
                      brand:
                        toggleInList(selectedBrands, brand).join(",") || null,
                    })
                  }
                  className="accent-emerald-600 w-3 h-3 shrink-0"
                />
                <span className="truncate">{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating Filter */}
      <div className="bg-white p-3 rounded-xl border border-gray-200">
        <h3 className="font-bold text-slate-700 text-xs mb-2">Customer Rating</h3>
        <ul className="space-y-1">
          {[
            { label: "All ratings", value: 0 },
            { label: "4 Stars & above", value: 4 },
            { label: "3 Stars & above", value: 3 },
          ].map((option) => (
            <li key={option.value}>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer hover:text-slate-800">
                <input
                  type="radio"
                  name="min-rating"
                  checked={minRating === option.value}
                  onChange={() =>
                    navigate({
                      minRating: option.value > 0 ? String(option.value) : null,
                    })
                  }
                  className="accent-emerald-600 w-3 h-3 shrink-0"
                />
                {option.value > 0 && (
                  <span className="flex items-center gap-0.5 text-amber-500">
                    <Star size={11} fill="currentColor" />
                    <span className="text-slate-600">{option.label}</span>
                  </span>
                )}
                {option.value === 0 && <span>{option.label}</span>}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Availability */}
      <div className="bg-white p-3 rounded-xl border border-gray-200">
        <h3 className="font-bold text-slate-700 text-xs mb-2">Availability</h3>
        <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer hover:text-slate-800">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={() => navigate({ inStock: inStockOnly ? null : "true" })}
            className="accent-emerald-600 w-3 h-3 shrink-0"
          />
          In Stock Only
        </label>
      </div>

      {/* Manufacturer / Origin */}
      <div className="bg-white p-3 rounded-xl border border-gray-200">
        <h3 className="font-bold text-slate-700 text-xs mb-2">
          Manufacturer / Origin
        </h3>
        <div className="relative mb-2">
          <Search
            size={12}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={originQuery}
            onChange={(event) => setOriginQuery(event.target.value)}
            placeholder="Search origin"
            aria-label="Search origin"
            className="w-full border border-slate-200 rounded-md pl-7 pr-2 py-1.5 text-xs text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <ul className="max-h-32 overflow-y-auto space-y-1 pr-1">
          {visibleOrigins.length === 0 && (
            <li className="text-xs text-slate-400">No origins found</li>
          )}
          {visibleOrigins.map((origin) => (
            <li key={origin}>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer hover:text-slate-800">
                <input
                  type="checkbox"
                  checked={selectedOrigins.includes(origin)}
                  onChange={() =>
                    navigate({
                      origin:
                        toggleInList(selectedOrigins, origin).join(",") || null,
                    })
                  }
                  className="accent-emerald-600 w-3 h-3 shrink-0"
                />
                <span className="truncate">{origin}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Clear filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAll}
          className="w-full flex items-center justify-center gap-1.5 bg-white border border-gray-200 rounded-xl py-2 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-colors"
        >
          <X size={13} />
          Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
        </button>
      )}
    </aside>
  );
}

function SubcategoryLinks({
  activeSlug,
  activeSub,
  buildHref,
}: {
  activeSlug: string;
  activeSub: string;
  buildHref: (updates: Record<string, string | null>) => string;
}) {
  const parent = activeSlug ? getCategoryBySlug(activeSlug) : undefined;
  if (!parent || parent.subcategories.length === 0) return null;

  return (
    <li className="pt-1.5 border-t border-gray-100 mt-1.5">
      <p className="px-2 mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
        Shop {parent.name} by
      </p>
      <ul className="space-y-0.5">
        {parent.subcategories.map((sub) => {
          const isSubActive = activeSub === sub.slug;
          return (
            <li key={sub.slug}>
              <Link
                href={buildHref({
                  category: parent.slug,
                  sub: sub.slug,
                  q: null,
                  sale: null,
                })}
                scroll={false}
                className={`text-xs text-slate-500 hover:text-blue-600 py-1 px-2 pl-4 rounded-md block truncate transition-colors ${
                  isSubActive ? "text-blue-600 font-semibold bg-blue-50" : ""
                }`}
              >
                {sub.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

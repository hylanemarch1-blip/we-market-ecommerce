"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { products, getDiscountPercent, type Product } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { categoryMatches, matchesQuery } from "@/lib/shop-filter";
import { useFormatPrice } from "@/context/CurrencyContext";

const MAX_SUGGESTIONS = 8;

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function highlightText(text: string, query: string): ReactNode {
  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length >= 2);
  if (tokens.length === 0) return text;

  const regex = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "ig");
  return text.split(regex).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="text-blue-700 font-semibold">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

interface SearchBarProps {
  variant?: "desktop" | "mobile";
}

export default function SearchBar({ variant = "desktop" }: SearchBarProps) {
  const router = useRouter();
  const format = useFormatPrice();
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const scoped = scope
      ? products.filter((product) => categoryMatches(product.category, scope))
      : products;

    return scoped
      .filter((product) =>
        matchesQuery(
          `${product.name} ${product.brand} ${product.category} ${product.description}`,
          trimmed
        )
      )
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(trimmed.toLowerCase()) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(trimmed.toLowerCase()) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        return b.rating - a.rating;
      })
      .slice(0, MAX_SUGGESTIONS);
  }, [query, scope]);

  const hasQuery = query.trim().length > 0;
  const showDropdown = isOpen && hasQuery;

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const goToProduct = (product: Product) => {
    setIsOpen(false);
    setActiveIndex(-1);
    setQuery("");
    router.push(`/products/${product.id}`);
  };

  const submitSearch = () => {
    setIsOpen(false);
    setActiveIndex(-1);
    const params = new URLSearchParams();
    const trimmed = query.trim();
    if (trimmed) params.set("q", trimmed);
    if (scope) params.set("category", scope);
    const search = params.toString();
    router.push(`/shop${search ? `?${search}` : ""}`);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((prev) =>
        suggestions.length === 0
          ? -1
          : prev >= suggestions.length - 1
            ? 0
            : prev + 1
      );
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) =>
        suggestions.length === 0
          ? -1
          : prev <= 0
            ? suggestions.length - 1
            : prev - 1
      );
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        goToProduct(suggestions[activeIndex]);
      } else {
        submitSearch();
      }
    }
  };

  const isDesktop = variant === "desktop";

  return (
    <div
      ref={containerRef}
      className={
        isDesktop
          ? "relative flex-1 max-w-[600px] hidden lg:block"
          : "relative w-full"
      }
    >
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center overflow-hidden bg-white border border-slate-300 rounded-md"
        role="search"
      >
        {isDesktop && (
          <div className="relative border-r border-gray-200 shrink-0">
            <select
              value={scope}
              onChange={(event) => {
                setScope(event.target.value);
                setActiveIndex(-1);
              }}
              aria-label="Search within category"
              className="appearance-none bg-slate-50 text-xs text-gray-600 font-medium px-4 py-3 pr-8 cursor-pointer focus:outline-none max-w-[150px]"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        )}

        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for products, brands and more..."
          aria-label="Search products"
          aria-autocomplete="list"
          autoComplete="off"
          className={`w-full ${
            isDesktop ? "px-4 py-3" : "px-3 py-2"
          } text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none`}
        />

        <button
          type="submit"
          aria-label="Search"
          className={`bg-blue-600 hover:bg-blue-700 text-white transition-colors shrink-0 ${
            isDesktop ? "px-5 py-3" : "px-4 py-2"
          }`}
        >
          <Search size={isDesktop ? 18 : 16} />
        </button>
      </form>

      {showDropdown && (
        <div
          className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-50 overflow-hidden"
          role="listbox"
        >
          {suggestions.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              No products match &ldquo;{query.trim()}&rdquo;
            </div>
          )}

          {suggestions.map((product, index) => {
            const discount = getDiscountPercent(product);
            return (
              <button
                key={product.id}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onClick={() => goToProduct(product)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left border-b border-gray-50 last:border-b-0 transition-colors ${
                  index === activeIndex ? "bg-blue-50" : "bg-white"
                }`}
              >
                <span className="relative w-11 h-11 shrink-0 bg-gray-50 rounded overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>

                <span className="flex-1 min-w-0">
                  <span className="block text-sm text-gray-800 truncate">
                    {highlightText(product.name, query)}
                  </span>
                  <span className="block text-xs text-gray-400 truncate">
                    {product.category} &middot; {product.brand}
                  </span>
                </span>

                <span className="shrink-0 text-right">
                  <span className="block text-sm font-bold text-gray-900">
                    {format(product.price)}
                  </span>
                  <span className="block text-xs text-gray-400 line-through">
                      {format(product.originalPrice)}
                  </span>
                  {discount > 0 && (
                    <span className="block text-[11px] font-bold text-red-500">
                      {discount}% OFF
                    </span>
                  )}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => submitSearch()}
            onMouseEnter={() => setActiveIndex(-1)}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-blue-700 bg-blue-50/60 hover:bg-blue-50 border-t border-gray-100 text-left"
          >
            <Search size={15} />
            See all results for &ldquo;{query.trim()}&rdquo;
          </button>
        </div>
      )}
    </div>
  );
}

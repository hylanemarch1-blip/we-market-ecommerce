"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShoppingCart,
  ShoppingBag,
  Zap,
  Minus,
  Plus,
  ShieldCheck,
  MapPin,
  Truck,
  ArrowRightLeft,
  Check,
  Package,
} from "lucide-react";
import type { Product } from "@/data/products";
import { getSeller } from "@/data/products";
import { getCategoryDisplayName } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { useCompare, MAX_COMPARE } from "@/context/CompareContext";
import { useFormatPrice } from "@/context/CurrencyContext";
import { slugifyCategory } from "@/lib/shop-filter";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/checkout";

interface ProductDetailViewProps {
  product: Product;
  related: Product[];
}

export default function ProductDetailView({
  product,
  related,
}: ProductDetailViewProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { items: compareItems, isFull: compareFull, toggleCompare } = useCompare();
  const format = useFormatPrice();

  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const seller = getSeller(product);
  const inCompare = compareItems.some((item) => item.id === product.id);
  const outOfStock = product.stock <= 0;
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  useEffect(() => {
    return () => {
      if (addedTimer.current) clearTimeout(addedTimer.current);
    };
  }, []);

  const specEntries = useMemo(
    () => Object.entries(product.specifications),
    [product.specifications]
  );

  const handleAddToCart = () => {
    if (outOfStock) return;
    addItem(product, quantity);
    setAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 1600);
  };

  const handleBuyNow = () => {
    if (outOfStock) return;
    addItem(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-500 mb-5">
          <Link href="/" className="hover:text-emerald-600">Home</Link> /{" "}
          <Link href="/shop" className="hover:text-emerald-600">Shop</Link> /{" "}
          <Link
            href={`/shop?category=${slugifyCategory(product.category)}`}
            className="hover:text-emerald-600"
          >
            {getCategoryDisplayName(product.category)}
          </Link>{" "}
          / <span className="text-gray-700">{product.name}</span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gallery */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="h-[420px] bg-gray-100">
                <img
                  src={product.images[imageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === imageIndex
                      ? "border-emerald-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                  {getCategoryDisplayName(product.category)}
                </span>
                <span className="text-xs text-gray-400">SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star size={15} className="fill-amber-400 text-amber-400" />
                  {product.rating}
                </span>
                <span className="text-gray-400">
                  {product.reviewCount.toLocaleString()} reviews
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">{product.brand}</span>
              </div>

              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-emerald-600">
                  {format(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through mb-0.5">
                      {format(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mb-1">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>

              <p
                className={`text-sm font-medium ${
                  outOfStock ? "text-red-500" : "text-emerald-600"
                }`}
              >
                {outOfStock
                  ? "Out of stock"
                  : `In stock — ${product.stock} units available`}
              </p>

              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <ul className="space-y-1.5">
                {product.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-xs text-gray-500 border-t border-gray-100 pt-4">
                <Truck size={15} className="text-emerald-600" />
                Free shipping on orders over ${FREE_SHIPPING_THRESHOLD}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="p-2.5 text-gray-500 hover:text-emerald-600 disabled:opacity-40"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                    className="p-2.5 text-gray-500 hover:text-emerald-600 disabled:opacity-40"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={outOfStock}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {added ? (
                    <>
                      <Check size={18} /> Added to cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} /> Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={outOfStock}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  <Zap size={18} /> Buy Now
                </button>
              </div>

              <button
                onClick={() => toggleCompare(product)}
                disabled={compareFull && !inCompare}
                title={
                  compareFull && !inCompare
                    ? `You can compare up to ${MAX_COMPARE} products`
                    : undefined
                }
                className={`w-full flex items-center justify-center gap-2 border font-medium text-sm py-2.5 rounded-lg transition-colors ${
                  inCompare
                    ? "border-emerald-600 text-emerald-600 bg-emerald-50"
                    : "border-gray-300 text-gray-600 hover:border-emerald-600 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                <ArrowRightLeft size={16} />
                {inCompare ? "In Compare List" : "Add to Compare"}
              </button>
            </div>

            {/* Seller profile */}
            {seller && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                  Sold by
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src={seller.logo}
                    alt={seller.name}
                    className="w-14 h-14 rounded-full object-cover border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 flex items-center gap-1.5">
                      {seller.name}
                      {seller.verified && (
                        <ShieldCheck size={15} className="text-emerald-600" />
                      )}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} /> {seller.location}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {seller.rating} seller rating ({seller.reviewCount.toLocaleString()})
                    </p>
                  </div>
                  <Link
                    href={`/store/${seller.slug}`}
                    className="text-sm font-medium border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-colors shrink-0"
                  >
                    Visit Store
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {specEntries.map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between gap-4 py-3 border-b border-gray-100 text-sm"
              >
                <span className="text-gray-500 font-medium">{key}</span>
                <span className="text-gray-800 text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Similar Products
              </h2>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Package size={15} /> in {getCategoryDisplayName(product.category)}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition flex flex-col"
                >
                  <Link
                    href={`/products/${item.id}`}
                    className="h-40 overflow-hidden bg-gray-100 block"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-xs text-gray-400 font-medium">
                        {getCategoryDisplayName(item.category)}
                    </span>
                    <Link
                      href={`/products/${item.id}`}
                      className="text-sm font-semibold text-gray-800 mt-1 line-clamp-1 hover:text-emerald-600"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-1 mt-2 text-amber-500 text-xs font-semibold">
                      <Star size={14} fill="currentColor" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-base font-bold text-emerald-600">
                          {format(item.price)}
                        </span>
                        <span className="text-xs text-gray-400 line-through ml-2">
                          {format(item.originalPrice)}
                        </span>
                      </div>
                      <button
                        onClick={() => addItem(item)}
                        disabled={item.stock <= 0}
                        aria-label={`Add ${item.name} to cart`}
                        className="bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-600 p-2 rounded-lg transition disabled:opacity-40"
                      >
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

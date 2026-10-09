"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { products, getDiscountPercent } from "@/data/products";
import { getCategoryDisplayName } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { useFormatPrice } from "@/context/CurrencyContext";

export default function ProductGrid() {
  const { addItem } = useCart();
  const format = useFormatPrice();

  const featured = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
        <Link
          href="/shop"
          className="text-sm font-medium text-emerald-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {featured.map((product) => {
          const discount = getDiscountPercent(product);
          return (
            <div
              key={product.id}
              className="group border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Link
                  href={`/products/${product.id}`}
                  className="block w-full h-full"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                {discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-black px-2 py-1 rounded shadow-sm">
                    {discount}% OFF
                  </span>
                )}
              </div>

              <div className="p-3 md:p-4 flex flex-col flex-1">
                <span className="text-[11px] text-emerald-600 font-semibold uppercase tracking-wide">
                  {getCategoryDisplayName(product.category)}
                </span>
                <Link
                  href={`/products/${product.id}`}
                  className="text-sm font-semibold text-gray-800 mt-1 line-clamp-2 hover:text-emerald-600"
                >
                  {product.name}
                </Link>

                <div className="flex items-center gap-1 mt-1.5 text-amber-500 text-xs font-semibold">
                  <Star size={13} fill="currentColor" />
                  <span>{product.rating}</span>
                </div>

                <div className="mt-auto pt-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-base md:text-lg font-bold text-gray-900">
                      {format(product.price)}
                    </span>
                    <span className="block text-[11px] text-gray-400 line-through">
                      {format(product.originalPrice)}
                    </span>
                  </div>
                  <button
                    onClick={() => addItem(product)}
                    disabled={product.stock <= 0}
                    aria-label={`Add ${product.name} to cart`}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white p-2 rounded-lg transition shrink-0"
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

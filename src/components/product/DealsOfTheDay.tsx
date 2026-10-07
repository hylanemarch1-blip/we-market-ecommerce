"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ShoppingBag, Star, Zap } from "lucide-react";
import { getDealProducts, getDiscountPercent } from "@/data/products";
import { useCart } from "@/context/CartContext";

function getTimeLeft(): { hours: string; minutes: string; seconds: string } {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  const remaining = Math.max(0, endOfDay.getTime() - now.getTime());

  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  const pad = (value: number) => String(value).padStart(2, "0");
  return { hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
}

export default function DealsOfTheDay({ limit = 8 }: { limit?: number }) {
  const { addItem } = useCart();
  const [timeLeft, setTimeLeft] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
  } | null>(null);

  const deals = useMemo(() => getDealProducts(limit), [limit]);

  useEffect(() => {
    const initial = setTimeout(() => setTimeLeft(getTimeLeft()), 0);
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  if (deals.length === 0) return null;

  return (
    <section className="py-8" aria-label="Deals of the day">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-black tracking-wide uppercase px-3 py-1.5 rounded-md">
            <Zap size={14} /> Deals of the Day
          </span>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 leading-tight">
              Huge Discounts
            </h2>
            <p className="text-sm text-gray-500">
              Up to 60% off — prices refresh every day
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
            <Clock size={16} className="text-red-500" />
            Ends in
          </span>
          <div className="flex items-center gap-1" aria-live="polite">
            {[timeLeft?.hours ?? "--", timeLeft?.minutes ?? "--", timeLeft?.seconds ?? "--"].map(
              (unit, index) => (
                <span key={index} className="flex items-center gap-1">
                  <span className="bg-gray-900 text-white text-sm font-bold px-2 py-1.5 rounded-md min-w-[34px] text-center tabular-nums">
                    {unit}
                  </span>
                  {index < 2 && <span className="text-gray-400 font-bold">:</span>}
                </span>
              )
            )}
          </div>
          <Link
            href="/shop?sale=true"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline whitespace-nowrap"
          >
            View All Deals
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {deals.map((product) => {
          const discount = getDiscountPercent(product);
          return (
            <div
              key={product.id}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative h-40 md:h-48 bg-gray-100 overflow-hidden">
                <Link href={`/products/${product.id}`} className="block w-full h-full">
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
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
                  {product.category}
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
                  <span className="text-gray-400 font-normal">
                    ({product.reviewCount})
                  </span>
                </div>

                <div className="mt-auto pt-3">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-lg font-black text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => addItem(product)}
                    disabled={product.stock <= 0}
                    aria-label={`Add ${product.name} to cart`}
                    className="mt-2.5 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs md:text-sm font-semibold py-2 rounded-lg transition-colors"
                  >
                    <ShoppingBag size={15} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

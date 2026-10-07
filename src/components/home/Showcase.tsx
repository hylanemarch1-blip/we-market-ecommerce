"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingCart, Star, Zap } from "lucide-react";
import { getDiscountPercent, type Product } from "@/data/products";
import { getCategoryDisplayName } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { useFormatPrice } from "@/context/CurrencyContext";

export interface ShowcaseGroup {
  label: string;
  href: string;
  products: Product[];
}

function ShowcaseCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const format = useFormatPrice();
  const discount = getDiscountPercent(product);

  const buyNow = () => {
    addItem(product);
    router.push("/checkout");
  };

  return (
    <div className="group flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-36 sm:h-40 bg-gray-50 overflow-hidden shrink-0">
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
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-black px-2 py-0.5 rounded shadow-sm">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide truncate">
          {getCategoryDisplayName(product.category)}
        </span>
        <Link
          href={`/products/${product.id}`}
          className="text-sm font-semibold text-gray-800 mt-0.5 line-clamp-2 hover:text-blue-600"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-1 mt-1 text-amber-500 text-xs font-semibold">
          <Star size={12} fill="currentColor" />
          <span>{product.rating}</span>
        </div>

        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-base font-bold text-gray-900">
            {format(product.price)}
          </span>
          {discount > 0 && (
            <span className="text-xs text-gray-400 line-through">
              {format(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto pt-2.5 flex gap-2">
          <button
            onClick={() => addItem(product)}
            disabled={product.stock <= 0}
            aria-label={`Add ${product.name} to cart`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold py-2 rounded-md transition-colors"
          >
            <ShoppingCart size={13} />
            Add to Cart
          </button>
          <button
            onClick={buyNow}
            disabled={product.stock <= 0}
            aria-label={`Buy ${product.name} now`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold py-2 rounded-md transition-colors"
          >
            <Zap size={13} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

function ShowcaseHeader({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle?: string;
  href: string;
}) {
  return (
    <div className="flex justify-between items-end gap-4 mb-5">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <Link
        href={href}
        className="flex items-center gap-1 shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        View All
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}

export function ProductShowcase({
  title,
  subtitle,
  href,
  products,
}: {
  title: string;
  subtitle?: string;
  href: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="py-6">
      <ShowcaseHeader title={title} subtitle={subtitle} href={href} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {products.map((product) => (
          <ShowcaseCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function GroupShowcase({
  title,
  subtitle,
  href,
  groups,
  columns = 3,
}: {
  title: string;
  subtitle?: string;
  href: string;
  groups: ShowcaseGroup[];
  columns?: 3 | 4;
}) {
  const visibleGroups = groups.filter((group) => group.products.length > 0);
  if (visibleGroups.length === 0) return null;

  const gridColumns =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-6">
      <ShowcaseHeader title={title} subtitle={subtitle} href={href} />
      <div className={`grid ${gridColumns} gap-4`}>
        {visibleGroups.map((group) => (
          <div
            key={group.label}
            className="rounded-xl border border-gray-200 bg-gray-50/60 p-4 flex flex-col"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-sm font-bold text-gray-800">{group.label}</h3>
              <Link
                href={group.href}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 shrink-0"
              >
                View All
              </Link>
            </div>
            <div
              className={
                group.products.length > 1
                  ? "grid grid-cols-2 gap-3 flex-1"
                  : "flex-1"
              }
            >
              {group.products.map((product) => (
                <ShowcaseCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

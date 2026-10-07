"use client";

import Link from "next/link";
import { Star, X } from "lucide-react";
import type { ReactNode } from "react";
import type { Product } from "@/data/products";
import { getSeller } from "@/data/products";
import { useFormatPrice } from "@/context/CurrencyContext";

interface ComparisonTableProps {
  products: Product[];
  onRemove?: (productId: string) => void;
}

export default function ComparisonTable({
  products,
  onRemove,
}: ComparisonTableProps) {
  const format = useFormatPrice();
  const specKeys = products.reduce<string[]>((keys, product) => {
    Object.keys(product.specifications).forEach((key) => {
      if (!keys.includes(key)) keys.push(key);
    });
    return keys;
  }, []);

  const baseRows: { label: string; render: (product: Product) => ReactNode }[] = [
    {
      label: "Price",
      render: (product) => (
        <span>
          <span className="font-bold text-emerald-600">{format(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="block text-xs text-gray-400 line-through">
              {format(product.originalPrice)}
            </span>
          )}
        </span>
      ),
    },
    { label: "Category", render: (product) => product.category },
    { label: "Brand", render: (product) => product.brand },
    {
      label: "Rating",
      render: (product) => (
        <span className="flex items-center gap-1 justify-center">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          {product.rating} ({product.reviewCount.toLocaleString()})
        </span>
      ),
    },
    {
      label: "Stock",
      render: (product) => (
        <span className={product.stock > 0 ? "text-emerald-600" : "text-red-500"}>
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
      ),
    },
    {
      label: "Seller",
      render: (product) => getSeller(product)?.name ?? "—",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[640px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wide align-bottom w-36">
              Specification
            </th>
            {products.map((product) => (
              <th key={product.id} className="px-3 py-3 align-bottom min-w-[160px]">
                <div className="flex flex-col items-center gap-2 relative">
                  {onRemove && (
                    <button
                      onClick={() => onRemove(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="absolute -top-1 right-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={15} />
                    </button>
                  )}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                  />
                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm font-semibold text-gray-800 hover:text-emerald-600 text-center leading-snug"
                  >
                    {product.name}
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baseRows.map((row) => (
            <tr key={row.label} className="border-b border-gray-100">
              <th className="text-left py-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {row.label}
              </th>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="px-3 py-3 text-center text-gray-700"
                >
                  {row.render(product)}
                </td>
              ))}
            </tr>
          ))}
          {specKeys.map((key) => (
            <tr key={key} className="border-b border-gray-100">
              <th className="text-left py-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {key}
              </th>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="px-3 py-3 text-center text-gray-700"
                >
                  {product.specifications[key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

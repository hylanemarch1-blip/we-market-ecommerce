import Link from "next/link";
import { Grid } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { products } from "@/data/products";

export const metadata = {
  title: "All Categories | WE-MARKET",
  description: "Browse every department on WE Market.",
};

export default function CategoriesPage() {
  return (
    <div className="bg-gray-50 min-h-[60vh] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-xs text-gray-500 mb-5">
          <Link href="/" className="hover:text-emerald-600">Home</Link> /{" "}
          <span className="text-gray-700">Categories</span>
        </p>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Grid size={18} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              All Categories
            </h1>
            <p className="text-sm text-gray-500">
              {CATEGORIES.length} departments · {products.length} products
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => {
            const count = products.filter(
              (product) =>
                product.category === category.slug ||
                product.category === category.label ||
                (category.slug === "fashion" &&
                  ["women-fashion", "men-fashion"].includes(product.category))
            ).length;
            return (
              <div
                key={category.slug}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:border-emerald-300 hover:shadow-sm transition-colors"
              >
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="block"
                >
                  <h2 className="text-sm font-bold text-gray-800 hover:text-emerald-600">
                    {category.label}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {count} product{count === 1 ? "" : "s"}
                    {category.subcategories.length > 0 &&
                      ` · ${category.subcategories.length} subcategories`}
                  </p>
                  {category.subcategories.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5 mt-3">
                      {category.subcategories.slice(0, 5).map((sub) => (
                        <li
                          key={sub.slug}
                          className="text-[11px] text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded"
                        >
                          {sub.name}
                        </li>
                      ))}
                      {category.subcategories.length > 5 && (
                        <li className="text-[11px] text-gray-400 px-1 py-0.5">
                          +{category.subcategories.length - 5} more
                        </li>
                      )}
                    </ul>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

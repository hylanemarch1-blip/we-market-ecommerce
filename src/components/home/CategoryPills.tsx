import Link from "next/link";
import {
  BookOpen,
  Car,
  ChefHat,
  Dumbbell,
  Heart,
  Laptop,
  Puzzle,
  Refrigerator,
  Shirt,
  ShoppingBasket,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";

const ICONS: Record<string, LucideIcon> = {
  fashion: Shirt,
  mobiles: Smartphone,
  electronics: Laptop,
  "home-kitchen": ChefHat,
  appliances: Refrigerator,
  beauty: Heart,
  grocery: ShoppingBasket,
  toys: Puzzle,
  sports: Dumbbell,
  auto: Car,
  books: BookOpen,
  "desi-bazaar": Sparkles,
};

export default function CategoryPills() {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">
          Shop by Category
        </h2>
        <Link
          href="/shop"
          className="text-sm font-medium text-emerald-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 md:gap-3">
        {CATEGORIES.map((category) => {
          const Icon = ICONS[category.slug] ?? Sparkles;
          return (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group flex flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2 py-3 text-center hover:border-emerald-300 hover:shadow-sm transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
                <Icon size={17} />
              </span>
              <span className="text-[11px] font-semibold text-gray-600 group-hover:text-emerald-700 leading-tight line-clamp-2">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

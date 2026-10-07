import { slugifyCategory } from "@/lib/shop-filter";

export interface Subcategory {
  name: string;
  slug: string;
  /** Search keyword used when filtering the parent category by this subcategory. */
  keyword?: string;
}

export interface Category {
  id: string;
  /** Canonical display name. */
  name: string;
  /** Alias of {@link name} kept for existing consumers. */
  label: string;
  slug: string;
  /** Lucide icon name (see CategoryPills for the icon map). */
  icon: string;
  subcategories: Subcategory[];
}

export const CATEGORIES: Category[] = [
  {
    id: "fashion",
    name: "Fashion & Apparel",
    label: "Fashion & Apparel",
    slug: "fashion",
    icon: "Shirt",
    subcategories: [],
  },
  {
    id: "mobiles",
    name: "Mobiles & Tablets",
    label: "Mobiles & Tablets",
    slug: "mobiles",
    icon: "Smartphone",
    subcategories: [],
  },
  {
    id: "electronics",
    name: "Electronics & Tech",
    label: "Electronics & Tech",
    slug: "electronics",
    icon: "Laptop",
    subcategories: [],
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    label: "Home & Kitchen",
    slug: "home-kitchen",
    icon: "ChefHat",
    subcategories: [],
  },
  {
    id: "appliances",
    name: "Appliances",
    label: "Appliances",
    slug: "appliances",
    icon: "Refrigerator",
    subcategories: [],
  },
  {
    id: "beauty",
    name: "Beauty & Care",
    label: "Beauty & Care",
    slug: "beauty",
    icon: "Heart",
    subcategories: [],
  },
  {
    id: "grocery",
    name: "Grocery",
    label: "Grocery",
    slug: "grocery",
    icon: "ShoppingBasket",
    subcategories: [],
  },
  {
    id: "toys",
    name: "Toys & Kids",
    label: "Toys & Kids",
    slug: "toys",
    icon: "Puzzle",
    subcategories: [],
  },
  {
    id: "sports",
    name: "Sports",
    label: "Sports",
    slug: "sports",
    icon: "Dumbbell",
    subcategories: [],
  },
  {
    id: "auto",
    name: "Auto Accessories",
    label: "Auto Accessories",
    slug: "auto",
    icon: "Car",
    subcategories: [],
  },
  {
    id: "books",
    name: "Books",
    label: "Books",
    slug: "books",
    icon: "BookOpen",
    subcategories: [],
  },
  {
    id: "desi-bazaar",
    name: "Desi Bazaar & Handcrafted",
    label: "Desi Bazaar & Handcrafted",
    slug: "desi-bazaar",
    icon: "Sparkles",
    subcategories: [
      { name: "Swadeshi Handloom & Khadi", slug: "handloom", keyword: "khadi" },
      { name: "Homemade Achar & Spices", slug: "homemade-spices", keyword: "achar" },
      { name: "Mitti & Clay Crafts", slug: "mitti-crafts", keyword: "mitti" },
      { name: "Ayurvedic & Herbal", slug: "herbal-care", keyword: "ayurvedic" },
      { name: "Artisanal Decor", slug: "artisanal-decor", keyword: "madhubani" },
    ],
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined =>
  CATEGORIES.find((category) => category.slug === slug);

export const getCategoryLabel = (slug: string): string =>
  getCategoryBySlug(slug)?.label ?? "All Categories";

/**
 * Display name for a category value that may be either a slug
 * (e.g. "desi-bazaar") or a legacy display label (e.g. "Grocery").
 */
export const getCategoryDisplayName = (value: string): string =>
  getCategoryBySlug(slugifyCategory(value))?.label ?? value;

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
    id: "women-fashion",
    name: "Women's Fashion & Beauty",
    label: "Women's Fashion & Beauty",
    slug: "women-fashion",
    icon: "Gem",
    subcategories: [
      { name: "Kurtis & Ethnic", slug: "kurtis-ethnic" },
      { name: "Jeans & Denim", slug: "jeans" },
      { name: "Tops & Dresses", slug: "tops-dresses" },
      { name: "Athleisure", slug: "athleisure" },
      { name: "Flats & Casuals", slug: "flats-casuals" },
      { name: "Heels & Platforms", slug: "heels-platforms" },
      { name: "Boots & Juttis", slug: "boots-juttis" },
      { name: "Watches & Sunglasses", slug: "watches-sunglasses" },
      { name: "Bags & Jewelry", slug: "bags-jewelry" },
      { name: "Makeup & Cosmetics", slug: "makeup-cosmetics" },
    ],
  },
  {
    id: "men-fashion",
    name: "Men's Fashion & Grooming",
    label: "Men's Fashion & Grooming",
    slug: "men-fashion",
    icon: "PersonStanding",
    subcategories: [
      { name: "Jeans & Denim", slug: "jeans" },
      { name: "Top Wear & Shirts", slug: "top-wear-shirts" },
      { name: "Bottom Wear & Chinos", slug: "bottom-wear-chinos" },
      { name: "Suits & Jackets", slug: "suits-jackets" },
      { name: "Sneakers & Casuals", slug: "sneakers-casuals" },
      { name: "Formal Shoes", slug: "formal-shoes" },
      { name: "Boots & Sandals", slug: "boots-sandals" },
      { name: "Watches & Sunglasses", slug: "watches-sunglasses" },
      { name: "Bags & Wallets", slug: "bags-wallets" },
      { name: "Grooming & Skincare", slug: "grooming-skincare" },
    ],
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
  {
    id: "canned-food",
    name: "Canned & Packaged Shelf-Stable Food",
    label: "Canned & Packaged Shelf-Stable Food",
    slug: "canned-food",
    icon: "Can",
    subcategories: [
      { name: "Canned Veggies", slug: "canned-veggies" },
      { name: "Canned Fruits", slug: "canned-fruits" },
      { name: "Canned Meat", slug: "canned-meat" },
      { name: "Canned Seafood", slug: "canned-seafood" },
    ],
  },
  {
    id: "mushrooms-truffles",
    name: "Mushrooms & Truffles",
    label: "Mushrooms & Truffles",
    slug: "mushrooms-truffles",
    icon: "Sprout",
    subcategories: [
      { name: "Button Varieties", slug: "button-varieties" },
      { name: "Exotic & Asian", slug: "exotic-asian" },
      { name: "Premium Wild Truffles", slug: "wild-truffles" },
      { name: "Processed & Oils", slug: "processed-oils" },
    ],
  },
  {
    id: "makhana",
    name: "Makhana (Foxnuts)",
    label: "Makhana (Foxnuts)",
    slug: "makhana",
    icon: "Popcorn",
    subcategories: [
      { name: "Raw Bulk", slug: "raw-bulk" },
      { name: "Roasted Plain", slug: "roasted-plain" },
      { name: "Savory Flavors", slug: "savory-flavors" },
      { name: "Sweet Flavors", slug: "sweet-flavors" },
    ],
  },
  {
    id: "tea-tisanes",
    name: "Tea & Tisanes",
    label: "Tea & Tisanes",
    slug: "tea-tisanes",
    icon: "Coffee",
    subcategories: [
      { name: "Black & CTC", slug: "black-ctc" },
      { name: "Green & White", slug: "green-white" },
      { name: "Oolong", slug: "oolong" },
      { name: "Herbal Infusions", slug: "herbal-infusions" },
    ],
  },
  {
    id: "food-grains-staples",
    name: "Food Grains & Staples",
    label: "Food Grains & Staples",
    slug: "food-grains-staples",
    icon: "Wheat",
    subcategories: [
      { name: "Basmati Rice", slug: "basmati-rice" },
      { name: "Non-Basmati", slug: "non-basmati" },
      { name: "Flours & Atta", slug: "flours-atta" },
      { name: "Millets & Oats", slug: "millets-oats" },
      { name: "Pulses & Dals", slug: "pulses-dals" },
      { name: "Whole Beans", slug: "whole-beans" },
    ],
  },
  {
    id: "fresh-vegetables",
    name: "Fresh Vegetables",
    label: "Fresh Vegetables",
    slug: "fresh-vegetables",
    icon: "Carrot",
    subcategories: [
      { name: "Daily Essentials", slug: "daily-essentials" },
      { name: "Roots & Garlic", slug: "roots-garlic" },
      { name: "Leafy Greens & Herbs", slug: "leafy-greens" },
      { name: "Cruciferous", slug: "cruciferous" },
      { name: "Gourds & Squash", slug: "gourds-squash" },
      { name: "Pods & Chillies", slug: "pods-chillies" },
    ],
  },
  {
    id: "poultry-meats",
    name: "Poultry, Eggs & Meats",
    label: "Poultry, Eggs & Meats",
    slug: "poultry-meats",
    icon: "Drumstick",
    subcategories: [
      { name: "Chicken Cuts", slug: "chicken-cuts" },
      { name: "Mutton & Goat", slug: "mutton-goat" },
      { name: "Pork & Bacon", slug: "pork-bacon" },
      { name: "Fresh & Enriched Eggs", slug: "fresh-eggs" },
    ],
  },
  {
    id: "fish-seafood",
    name: "Fish & Seafood",
    label: "Fish & Seafood",
    slug: "fish-seafood",
    icon: "Fish",
    subcategories: [
      { name: "Freshwater Fish", slug: "freshwater-fish" },
      { name: "Marine Fish", slug: "marine-fish" },
      { name: "Shrimp & Prawns", slug: "shrimp-prawns" },
      { name: "Lobster & Crab", slug: "lobster-crab" },
      { name: "Cephalopods (Squid/Octopus)", slug: "cephalopods" },
    ],
  },
  {
    id: "pickles-chutneys",
    name: "Pickles & Chutneys",
    label: "Pickles & Chutneys",
    slug: "pickles-chutneys",
    icon: "CookingPot",
    subcategories: [
      { name: "Mango Pickles", slug: "mango-pickles" },
      { name: "Veg Pickles", slug: "veg-pickles" },
      { name: "Non-Veg Pickles", slug: "non-veg-pickles" },
      { name: "Fresh & Sweet Chutneys", slug: "fresh-chutneys" },
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

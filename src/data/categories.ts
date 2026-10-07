export interface Category {
  slug: string;
  label: string;
}

export const CATEGORIES: Category[] = [
  { slug: "fashion", label: "Fashion & Apparel" },
  { slug: "mobiles", label: "Mobiles & Tablets" },
  { slug: "electronics", label: "Electronics & Tech" },
  { slug: "home-kitchen", label: "Home & Kitchen" },
  { slug: "appliances", label: "Appliances" },
  { slug: "beauty", label: "Beauty & Care" },
  { slug: "grocery", label: "Grocery" },
  { slug: "toys", label: "Toys & Kids" },
  { slug: "sports", label: "Sports" },
  { slug: "auto", label: "Auto Accessories" },
  { slug: "books", label: "Books" },
];

export const getCategoryBySlug = (slug: string): Category | undefined =>
  CATEGORIES.find((category) => category.slug === slug);

export const getCategoryLabel = (slug: string): string =>
  getCategoryBySlug(slug)?.label ?? "All Categories";

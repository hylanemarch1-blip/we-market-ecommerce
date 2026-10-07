"use client";

import { products, type Product } from "@/data/products";
import { GroupShowcase, ProductShowcase } from "./Showcase";

const byId = new Map(products.map((product) => [product.id, product]));

const pick = (...ids: string[]): Product[] =>
  ids
    .map((id) => byId.get(id))
    .filter((product): product is Product => Boolean(product));

const trending = [...products]
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 8);

export default function HomeShowcases() {
  return (
    <>
      <GroupShowcase
        title="Fashion & Apparel"
        subtitle="Shirts, bags, sneakers and everyday styles"
        href="/shop?category=fashion"
        groups={[
          {
            label: "Men's Clothing",
            href: "/shop?category=fashion&q=men",
            products: pick("13"),
          },
          {
            label: "Women's Wear",
            href: "/shop?category=fashion&q=women",
            products: pick("15"),
          },
          {
            label: "Shoes & Footwear",
            href: "/shop?category=fashion&q=sneakers",
            products: pick("14"),
          },
        ]}
      />

      <GroupShowcase
        title="Electronics"
        subtitle="Laptops, audio gear, TVs and wearables"
        href="/shop?category=electronics"
        groups={[
          {
            label: "Laptops",
            href: "/shop?category=electronics&q=laptop",
            products: pick("19"),
          },
          {
            label: "Audio Gear",
            href: "/shop?category=electronics&q=wireless",
            products: pick("2", "9"),
          },
          {
            label: "Smartwatches",
            href: "/shop?category=electronics&q=watch",
            products: pick("3"),
          },
        ]}
      />

      <GroupShowcase
        title="Gadgets"
        subtitle="Chargers, cases, cameras and tablets"
        href="/shop?category=mobiles"
        groups={[
          {
            label: "Mobile Accessories",
            href: "/shop?category=mobiles",
            products: pick("46", "45", "9"),
          },
          {
            label: "Smart Gadgets",
            href: "/shop?category=electronics",
            products: pick("3", "20", "17"),
          },
        ]}
      />

      <ProductShowcase
        title="Trending Now"
        subtitle="Hot selling products this week"
        href="/shop?sale=true"
        products={trending}
      />

      <GroupShowcase
        title="Furniture & Decor"
        subtitle="Sofas, tables and storage for every room"
        href="/shop?category=home-kitchen"
        groups={[
          {
            label: "Sofas & Seating",
            href: "/shop?category=home-kitchen&q=sofa",
            products: pick("40"),
          },
          {
            label: "Tables & Desks",
            href: "/shop?category=home-kitchen",
            products: pick("10", "41"),
          },
          {
            label: "Home Storage",
            href: "/shop?category=home-kitchen&q=storage",
            products: pick("42"),
          },
        ]}
      />

      <GroupShowcase
        title="Kitchen"
        subtitle="Cookware, appliances and prep essentials"
        href="/shop?category=appliances"
        groups={[
          {
            label: "Cookware",
            href: "/shop?category=home-kitchen&q=cookware",
            products: pick("21"),
          },
          {
            label: "Appliances",
            href: "/shop?category=appliances",
            products: pick("24", "23", "44"),
          },
          {
            label: "Kitchenware",
            href: "/shop?category=home-kitchen&q=knife",
            products: pick("43"),
          },
        ]}
      />

      <GroupShowcase
        title="Complete Grocery"
        subtitle="Staples, snacks, drinks and household care"
        href="/shop?category=grocery"
        columns={4}
        groups={[
          {
            label: "Staples",
            href: "/shop?category=grocery",
            products: pick("36", "5"),
          },
          {
            label: "Snacks",
            href: "/shop?category=grocery",
            products: pick("37", "11"),
          },
          {
            label: "Beverages",
            href: "/shop?category=grocery",
            products: pick("38", "6"),
          },
          {
            label: "Household",
            href: "/shop?category=grocery",
            products: pick("39"),
          },
        ]}
      />
    </>
  );
}

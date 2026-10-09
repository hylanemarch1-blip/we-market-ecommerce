"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Plus, Search, Upload } from "lucide-react";

interface ProductRow {
  sku: string;
  name: string;
  stock: number;
  price: string;
  status: "Active" | "Draft" | "Out of stock";
}

const PRODUCTS: ProductRow[] = [
  { sku: "NK-ANA-01", name: "Anarkali Embroidered Kurti", stock: 24, price: "$29.99", status: "Active" },
  { sku: "IL-SELV-32", name: "Men's Selvedge Slim Jeans", stock: 12, price: "$49.99", status: "Active" },
  { sku: "FM-FRU-001", name: "Organic Fresh Apples", stock: 0, price: "$4.99", status: "Out of stock" },
  { sku: "TC-OIL-100", name: "Premium Black Truffle Oil", stock: 8, price: "$18.99", status: "Active" },
  { sku: "KL-MATCHA-50", name: "Japanese Ceremonial Matcha", stock: 15, price: "$19.99", status: "Draft" },
];

const STATUS_STYLES: Record<ProductRow["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Draft: "bg-gray-100 text-gray-600",
  "Out of stock": "bg-red-100 text-red-600",
};

export default function VendorProductsNewPage() {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState("");

  const inputClass = (key: string) =>
    `w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition bg-white ${
      errors[key] ? "border-red-400" : "border-gray-300"
    }`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Product name is required";
    if (!sku.trim()) next.sku = "SKU is required";
    if (!price.trim() || Number(price) <= 0) next.price = "Enter a valid price";
    if (!stock.trim() || Number(stock) < 0) next.stock = "Enter stock quantity";
    if (!category) next.category = "Pick a category";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  const filtered = PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-10">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              <Link href="/vendor" className="hover:text-emerald-600">Vendor</Link> /{" "}
              <Link href="/seller/dashboard" className="hover:text-emerald-600">Dashboard</Link> /{" "}
              <span className="text-gray-700">New Product</span>
            </p>
            <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
          </div>
          <div className="flex gap-2">
            <Link
              href="/vendor/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 px-4 py-2.5 rounded-lg transition-colors"
            >
              <Package size={15} /> All products
            </Link>
            <Link
              href="/vendor/products/import"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 px-4 py-2.5 rounded-lg transition-colors"
            >
              <Upload size={15} /> Bulk import
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-5">Product Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Product name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors({ ...errors, name: "" }); }}
                  placeholder="e.g. Cotton Blend Casual Shirt"
                  className={inputClass("name")}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1.5">
                  SKU <span className="text-red-500">*</span>
                </label>
                <input
                  id="sku"
                  value={sku}
                  onChange={(e) => { setSku(e.target.value); setErrors({ ...errors, sku: "" }); }}
                  placeholder="ABC-001"
                  className={inputClass("sku")}
                />
                {errors.sku && <p className="text-xs text-red-500 mt-1">{errors.sku}</p>}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setErrors({ ...errors, category: "" }); }}
                  className={inputClass("category")}
                >
                  <option value="">Select category</option>
                  <option>Fashion & Apparel</option>
                  <option>Grocery & Gourmet Food</option>
                  <option>Electronics & Tech</option>
                  <option>Home & Kitchen</option>
                  <option>Beauty & Personal Care</option>
                </select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price (USD) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => { setPrice(e.target.value); setErrors({ ...errors, price: "" }); }}
                  placeholder="29.99"
                  className={inputClass("price")}
                />
                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stock quantity <span className="text-red-500">*</span>
                </label>
                <input
                  id="stock"
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => { setStock(e.target.value); setErrors({ ...errors, stock: "" }); }}
                  placeholder="100"
                  className={inputClass("stock")}
                />
                {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Materials, sizing, care instructions, highlights…"
                  className={inputClass("description")}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
              >
                <Plus size={15} /> Add product
              </button>
              {saved && (
                <span className="text-sm font-medium text-emerald-600">
                  Product saved to your catalog
                </span>
              )}
            </div>
          </form>

          <aside className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
            <h2 className="font-bold text-gray-800 mb-4">Your catalog</h2>
            <div className="relative mb-4">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or SKU"
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <ul className="space-y-3">
              {filtered.map((product) => (
                <li key={product.sku} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {product.name}
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${STATUS_STYLES[product.status]}`}>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.sku} · {product.price} · {product.stock} in stock
                  </p>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="text-xs text-gray-400 text-center py-4">
                  No products match “{search}”.
                </li>
              )}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

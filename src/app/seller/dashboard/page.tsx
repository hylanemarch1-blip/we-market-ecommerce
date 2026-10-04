"use client";

import { useState } from "react";
import { Search, Menu, Loader, User, X, Store, Package, Plus, Trash2, Save, CheckCircle2, ChevronRight, LayoutDashboard, Truck } from "lucide-react";
import Link from "next/link";

type ActiveTab = "dashboard" | "store" | "products";

interface StoreForm {
  storeName: string;
  bio: string;
  logoUrl: string;
  bannerUrl: string;
  shippingBadges: string[];
}

interface Specification {
  id: number;
  key: string;
  value: string;
}

interface ProductForm {
  title: string;
  sku: string;
  price: string;
  salePrice: string;
  category: string;
  stock: string;
  imageUrl: string;
}

interface Product extends ProductForm {
  id: number;
}

const SHIPPING_BADGE_OPTIONS = [
  "Verified",
  "Domestic Shipping",
  "International Shipping",
  "Express Delivery",
  "Free Shipping",
  "Cash on Delivery",
];

const PRODUCT_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Books",
  "Automotive",
  "Pets",
  "Toys",
  "Jewelry",
];

const INITIAL_PRODUCT_FORM: ProductForm = {
  title: "",
  sku: "",
  price: "",
  salePrice: "",
  category: "",
  stock: "",
  imageUrl: "",
};

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // My Store state
  const [storeForm, setStoreForm] = useState<StoreForm>({
    storeName: "TechHub Electronics",
    bio: "Premium consumer electronics and gadgets with global warranty. Serving customers worldwide since 2018.",
    logoUrl: "https://images.unsplash.com/photo-1550745165-9bc0b258726f?w=200&h=200&auto=format&fit=crop&q=70",
    bannerUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&auto=format&fit=crop&q=70",
    shippingBadges: ["Verified", "Domestic Shipping", "International Shipping"],
  });
  const [storeSaved, setStoreSaved] = useState(false);

  // Products state
  const [productForm, setProductForm] = useState<ProductForm>(INITIAL_PRODUCT_FORM);
  const [specs, setSpecs] = useState<Specification[]>([]);
  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: "SilencePro Wireless Headphones", sku: "TH-HP-001", price: "149.99", salePrice: "", category: "Electronics", stock: "210", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&auto=format&fit=crop&q=70" },
    { id: 2, title: "Chrono Smart Watch S5", sku: "TH-WT-002", price: "249.00", salePrice: "199.00", category: "Electronics", stock: "87", imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&auto=format&fit=crop&q=70" },
  ]);
  const [productSaved, setProductSaved] = useState(false);

  const sidebarItems = [
    { key: "dashboard", label: "Dashboard", type: "tab" as const, icon: LayoutDashboard },
    { key: "store", label: "My Store", type: "tab" as const, icon: Store },
    { key: "products", label: "Products", type: "tab" as const, icon: Package },
    { key: "orders", label: "Orders", type: "link" as const, href: "/vendor/orders", icon: Package },
    { key: "shipping", label: "Shipping", type: "link" as const, href: "/vendor/shipping", icon: Truck },
    { key: "payments", label: "Payments", type: "link" as const, href: "/vendor/payments", icon: Search },
    { key: "inventory", label: "Inventory", type: "link" as const, href: "/vendor/inventory", icon: Package },
    { key: "customers", label: "Customers", type: "link" as const, href: "/vendor/customers", icon: User },
    { key: "analytics", label: "Analytics", type: "link" as const, href: "/vendor/analytics", icon: Search },
    { key: "marketing", label: "Marketing", type: "link" as const, href: "/vendor/marketing", icon: Search },
    { key: "settings", label: "Settings", type: "link" as const, href: "/vendor/settings", icon: Search },
    { key: "support", label: "Support", type: "link" as const, href: "/vendor/support", icon: Search },
  ];

  const handleStoreChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStoreForm((prev) => ({ ...prev, [name]: value }));
    setStoreSaved(false);
  };

  const toggleBadge = (badge: string) => {
    setStoreForm((prev) => ({
      ...prev,
      shippingBadges: prev.shippingBadges.includes(badge)
        ? prev.shippingBadges.filter((b) => b !== badge)
        : [...prev.shippingBadges, badge],
    }));
    setStoreSaved(false);
  };

  const handleStoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStoreSaved(true);
    setTimeout(() => setStoreSaved(false), 3000);
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
    setProductSaved(false);
  };

  const addSpecification = () => {
    setSpecs((prev) => [
      ...prev,
      { id: Date.now(), key: "", value: "" },
    ]);
  };

  const removeSpecification = (id: number) => {
    setSpecs((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSpecification = (id: number, field: "key" | "value", value: string) => {
    setSpecs((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price) return;
    setProducts((prev) => [
      { ...productForm, id: Date.now() },
      ...prev,
    ]);
    setProductForm(INITIAL_PRODUCT_FORM);
    setSpecs([]);
    setProductSaved(true);
    setTimeout(() => setProductSaved(false), 3000);
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  const renderDashboardTab = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-2xl font-bold text-emerald-600">{products.length}</p>
          <p className="text-gray-500 text-sm">Total Products</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-2xl font-bold text-emerald-600">4.8</p>
          <p className="text-gray-500 text-sm">Rating</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-2xl font-bold text-emerald-600">2,345</p>
          <p className="text-gray-500 text-sm">Total Orders</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-2xl font-bold text-emerald-600">$45,230</p>
          <p className="text-gray-500 text-sm">Monthly Revenue</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-medium text-gray-700 mb-4">Recent Activity</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 px-2 py-1 rounded border border-gray-100">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
              <Search className="w-3 h-3 text-emerald-600" />
            </div>
            <div>
              <p className="font-medium">New product listed</p>
              <p className="text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 py-1 rounded border border-gray-100">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
              <Loader className="w-3 h-3 text-gray-400" />
            </div>
            <div>
              <p className="font-medium">Order #1027 shipped</p>
              <p className="text-gray-400">Yesterday</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 py-1 rounded border border-gray-100">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
              <User className="w-3 h-3 text-gray-400" />
            </div>
            <div>
              <p className="font-medium">New customer registered</p>
              <p className="text-gray-400">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStoreTab = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Store</h1>
          <p className="text-sm text-gray-500">Edit your store profile and shipping badges</p>
        </div>
        <Link
          href="/store/tech-hub-electronics"
          className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1"
        >
          View Storefront <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <form onSubmit={handleStoreSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
        <div>
          <label htmlFor="storeName" className={labelClass}>Store Name</label>
          <input
            type="text"
            id="storeName"
            name="storeName"
            value={storeForm.storeName}
            onChange={handleStoreChange}
            className={inputClass}
            placeholder="My Awesome Store"
            required
          />
        </div>

        <div>
          <label htmlFor="bio" className={labelClass}>Store Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={storeForm.bio}
            onChange={handleStoreChange}
            rows={4}
            className={inputClass}
            placeholder="Tell customers about your store..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="logoUrl" className={labelClass}>Logo URL</label>
            <input
              type="url"
              id="logoUrl"
              name="logoUrl"
              value={storeForm.logoUrl}
              onChange={handleStoreChange}
              className={inputClass}
              placeholder="https://example.com/logo.png"
            />
            {storeForm.logoUrl && (
              <img
                src={storeForm.logoUrl}
                alt="Logo preview"
                className="mt-2 w-16 h-16 rounded-xl object-cover border border-gray-200"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            )}
          </div>

          <div>
            <label htmlFor="bannerUrl" className={labelClass}>Banner URL</label>
            <input
              type="url"
              id="bannerUrl"
              name="bannerUrl"
              value={storeForm.bannerUrl}
              onChange={handleStoreChange}
              className={inputClass}
              placeholder="https://example.com/banner.png"
            />
            {storeForm.bannerUrl && (
              <img
                src={storeForm.bannerUrl}
                alt="Banner preview"
                className="mt-2 w-full h-20 rounded-lg object-cover border border-gray-200"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            )}
          </div>
        </div>

        <div>
          <span className={labelClass}>Shipping Badges</span>
          <div className="flex flex-wrap gap-2">
            {SHIPPING_BADGE_OPTIONS.map((badge) => {
              const selected = storeForm.shippingBadges.includes(badge);
              return (
                <button
                  key={badge}
                  type="button"
                  onClick={() => toggleBadge(badge)}
                  aria-pressed={selected}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                    selected
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-emerald-400 hover:text-emerald-600"
                  }`}
                >
                  {selected && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />}
                  {badge}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
          {storeSaved && (
            <span className="text-sm text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Store updated successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );

  const renderProductsTab = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-500">{products.length} products in your catalog</p>
        </div>
      </div>

      {/* Create Product Form */}
      <form onSubmit={handleProductSubmit} className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-600" /> Add New Product
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="md:col-span-2">
            <label htmlFor="title" className={labelClass}>Product Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={productForm.title}
              onChange={handleProductChange}
              className={inputClass}
              placeholder="Wireless Noise-Canceling Headphones"
              required
            />
          </div>

          <div>
            <label htmlFor="sku" className={labelClass}>SKU</label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={productForm.sku}
              onChange={handleProductChange}
              className={inputClass}
              placeholder="TH-HP-001"
            />
          </div>

          <div>
            <label htmlFor="category" className={labelClass}>Category</label>
            <select
              id="category"
              name="category"
              value={productForm.category}
              onChange={handleProductChange}
              className={inputClass}
              required
            >
              <option value="">Select category</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className={labelClass}>Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productForm.price}
              onChange={handleProductChange}
              className={inputClass}
              placeholder="99.99"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label htmlFor="salePrice" className={labelClass}>Sale Price ($)</label>
            <input
              type="number"
              id="salePrice"
              name="salePrice"
              value={productForm.salePrice}
              onChange={handleProductChange}
              className={inputClass}
              placeholder="79.99"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="stock" className={labelClass}>Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productForm.stock}
              onChange={handleProductChange}
              className={inputClass}
              placeholder="100"
              min="0"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className={labelClass}>Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={productForm.imageUrl}
              onChange={handleProductChange}
              className={inputClass}
              placeholder="https://example.com/product.jpg"
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-4">
          <span className={labelClass}>Specifications</span>
          <div className="space-y-2">
            {specs.map((spec) => (
              <div key={spec.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={spec.key}
                  onChange={(e) => updateSpecification(spec.id, "key", e.target.value)}
                  className={inputClass}
                  placeholder="Key (e.g. Color)"
                  aria-label="Specification key"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => updateSpecification(spec.id, "value", e.target.value)}
                  className={inputClass}
                  placeholder="Value (e.g. Black)"
                  aria-label="Specification value"
                />
                <button
                  type="button"
                  onClick={() => removeSpecification(spec.id)}
                  className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                  aria-label="Remove specification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSpecification}
            className="mt-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Specification
          </button>
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
          {productSaved && (
            <span className="text-sm text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Product added to catalog
            </span>
          )}
        </div>
      </form>

      {/* Product List */}
      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4 p-4">
            <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&auto=format&fit=crop&q=60";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{product.title}</p>
              <p className="text-xs text-gray-500">
                {product.sku && `SKU: ${product.sku} · `}
                {product.category}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-semibold text-emerald-600">${product.price}</p>
              {product.salePrice && (
                <p className="text-xs text-gray-400 line-through">${product.salePrice}</p>
              )}
            </div>
            <div className="text-right shrink-0 w-20">
              <p className={`text-sm font-medium ${Number(product.stock) > 0 ? "text-emerald-600" : "text-red-500"}`}>
                {product.stock || 0} in stock
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "store":
        return renderStoreTab();
      case "products":
        return renderProductsTab();
      default:
        return renderDashboardTab();
    }
  };

  const navButton = (item: (typeof sidebarItems)[number]) => {
    const isActive = item.type === "tab" && item.key === activeTab;
    const className = `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
      isActive ? "bg-white text-emerald-600" : "text-white hover:bg-emerald-500"
    }`;

    if (item.type === "tab") {
      const Icon = item.icon;
      return (
        <button key={item.key} type="button" onClick={() => setActiveTab(item.key as ActiveTab)} className={className}>
          <Icon className="w-4 h-4 shrink-0" />
          <span>{item.label}</span>
        </button>
      );
    }

    const Icon = item.icon;
    return (
      <a key={item.key} href={item.href} className={className}>
        <Icon className="w-4 h-4 shrink-0" />
        <span>{item.label}</span>
      </a>
    );
  };

  return (
    <section className="py-12">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Sidebar */}
          <div className="bg-emerald-600">
            <div className="p-6 border-b border-emerald-500">
              <h2 className="text-xl font-bold text-white">WE Market</h2>
              <p className="text-emerald-200 text-sm">Vendor Dashboard</p>
            </div>
            <nav className="p-6 space-y-1">
              {sidebarItems.map((item) => navButton(item))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 md:hidden">
              <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="bg-white p-2 rounded-md border border-gray-200 hover:bg-emerald-50 transition-colors"
              >
                <Menu className="text-emerald-600" size={20} />
              </button>
            </div>

            {renderTabContent()}
          </div>

          {/* Sidebar Drawer (mobile) */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
              <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl">
                <div className="p-6 border-b border-gray-200 relative">
                  <h3 className="font-bold text-emerald-600">Menu</h3>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute right-3 p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                  >
                    <X className="text-gray-400" size={20} />
                  </button>
                </div>
                <nav className="p-4 space-y-1">
                  {sidebarItems.map((item) => {
                    if (item.type === "tab") {
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => {
                            setActiveTab(item.key as ActiveTab);
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                            item.key === activeTab
                              ? "bg-emerald-50 text-emerald-700"
                              : "hover:bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    }
                    return (
                      <a
                        key={item.key}
                        href={item.href}
                        className="block px-3 py-2 rounded-md hover:bg-emerald-50 transition-colors text-sm font-medium text-emerald-600"
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </nav>
                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700 transition-colors text-center"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

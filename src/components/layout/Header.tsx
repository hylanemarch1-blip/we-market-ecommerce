"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search, Heart, ShoppingCart, User, Menu, X, ChevronDown,
  Headphones, Grid, ShoppingBag, ArrowRightLeft, Trash2,
  Smartphone, Monitor, Watch, HeadphonesIcon, Gamepad2, Cpu, Speaker
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    children: [
      { label: "Homepage 1", href: "/" },
      { label: "Homepage 2", href: "/home-2" },
      { label: "Homepage 3", href: "/home-3" },
      { label: "Homepage 4", href: "/home-4" },
      { label: "Homepage 5", href: "/home-5" },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Shop Grid", href: "/shop" },
      { label: "Shop Grid 2", href: "/shop/grid-2" },
      { label: "Shop List - Left Sidebar", href: "/shop/list" },
      { label: "Shop List - Right Sidebar", href: "/shop/list-2" },
      { label: "Shop Fullwidth", href: "/shop/fullwidth" },
      { label: "Single Product", href: "/product/1" },
      { label: "Single Product 2", href: "/product/2" },
      { label: "Shop Cart", href: "/cart" },
      { label: "Shop Checkout", href: "/checkout" },
      { label: "Shop Compare", href: "/compare" },
      { label: "Shop Wishlist", href: "/wishlist" },
    ],
  },
  {
    label: "Vendors",
    href: "/vendors",
    children: [
      { label: "Vendors Listing", href: "/vendors" },
      { label: "Vendor Single", href: "/vendors/1" },
    ],
  },
  {
    label: "Pages",
    href: "#",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Terms and Conditions", href: "/terms" },
      { label: "Register", href: "/register" },
      { label: "Login", href: "/login" },
      { label: "Error 404", href: "/404" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "Blog Grid", href: "/blog" },
      { label: "Blog Grid 2", href: "/blog/grid-2" },
      { label: "Blog List", href: "/blog/list" },
      { label: "Blog Big", href: "/blog/big" },
      { label: "Blog Single", href: "/blog/1" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const CATEGORIES_SEARCH = [
  "All categories",
  "Fashion & Apparel",
  "Mobiles & Tablets",
  "Electronics & Tech",
  "Home & Kitchen",
  "Appliances",
  "Beauty & Personal Care",
  "Grocery & Food",
  "Toys, Baby & Kids",
  "Home Improvement & Tools",
  "Sports, Fitness & Outdoors",
  "Auto Accessories",
  "Books & Stationery",
];

const CATEGORIES_SIDEBAR = [
  { icon: Monitor, label: "Computers & Accessories", subs: ["Computer Accessories", "Computer Cases", "Laptop", "HDD", "RAM", "Headphone"] },
  { icon: Smartphone, label: "Cell Phones", subs: ["Phone Accessories", "Phone Cases", "Postpaid Phones", "Unlocked Phones", "Prepaid Phones", "iPhone", "Samsung Galaxy"] },
  { icon: Gamepad2, label: "Gaming Gadgets", subs: ["Wireless Routers", "Cool New Gadgets", "Tech and Gadgets", "Geek Gifts", "Xbox Accessories", "PlayStation Accessories"] },
  { icon: Watch, label: "Smart Watches", subs: ["Smart Watches", "Fashion Smart Watches", "Smart Bracelets", "Pocket Watches", "Smart Rings"] },
  { icon: HeadphonesIcon, label: "Wired Headphone", subs: ["On-Ear Headphones", "Earbud & In-Ear", "DJ Headphones", "PC Accessories", "PC Game Headsets"] },
  { icon: ArrowRightLeft, label: "Mouse & Keyboard", subs: ["Logitech", "Redragon", "Amazon Basics", "Microsoft", "MageGee"] },
  { icon: Speaker, label: "Headphone", subs: ["Car Audio Systems", "Cellphones", "Desktops", "Gaming Consoles", "Telephones"] },
  { icon: BluetoothIcon, label: "Bluetooth Devices", subs: ["Player Accessories", "Computer Accessories", "Speakers & Audio", "Computer Networking"] },
  { icon: CloudIcon, label: "Cloud Software", subs: ["Android", "Linux & Unix", "Macintosh", "Windows", "iPhone & iOS"] },
  { icon: Cpu, label: "Mainboard & CPU", subs: ["Computer CPU Processors", "Internal Fans & Cooling", "Graphics Cards", "Network I/O Port Cards"] },
  { icon: Monitor, label: "Desktop PC", subs: ["Graphic PC", "Office PC", "Gaming PC", "Server"] },
  { icon: Speaker, label: "Speaker", subs: ["JBL", "Anker", "Pyle", "Bose", "Logitech"] },
];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "cn", label: "中国人", flag: "🇨🇳" },
];

const CURRENCIES = ["USD", "EUR", "AUD", "SGP"];

const CART_ITEMS = [
  { id: 1, name: "2022 Apple iMac with Retina 5K Display 8GB RAM, 256GB SSD", price: 2856.40, qty: 1, img: "/placeholder-product.png" },
  { id: 2, name: "2022 Apple iMac with Retina 5K Display 8GB RAM, 256GB SSD", price: 2856.40, qty: 1, img: "/placeholder-product.png" },
];

function BluetoothIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6.5 6.5 11 11L12 23V1l5.5 5.5-11 11" />
    </svg>
  );
}

function CloudIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState<string | null>(null);
  const [openSidebarCategory, setOpenSidebarCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setIsLangOpen(false);
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) setIsCurrencyOpen(false);
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setIsAccountOpen(false);
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) setIsCartOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartTotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-white border-b border-gray-100 text-xs hidden lg:block">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-10">
          <ul className="flex gap-5 text-gray-500">
            <li><Link href="/about" className="hover:text-emerald-600 transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-emerald-600 transition-colors">Careers</Link></li>
            <li><Link href="/seller/dashboard" className="hover:text-emerald-600 transition-colors font-medium text-emerald-600">Open a shop</Link></li>
          </ul>

          <div className="text-center">
            <span className="text-gray-500">Free shipping for all orders over </span>
            <span className="font-bold text-emerald-600">$75.00</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500">Need help? Call Us: <strong className="text-emerald-600">+ 1800 900</strong></span>

            <div ref={langRef} className="relative">
              <button
                onClick={() => { setIsLangOpen(!isLangOpen); setIsCurrencyOpen(false); }}
                className="flex items-center gap-1.5 text-gray-500 hover:text-emerald-600 transition-colors"
              >
                <span>🇺🇸</span> English <ChevronDown size={12} />
              </button>
              {isLangOpen && (
                <ul className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 min-w-[140px]">
                  {LANGUAGES.map((lang) => (
                    <li key={lang.code}>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-2">
                        <span>{lang.flag}</span> {lang.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div ref={currencyRef} className="relative">
              <button
                onClick={() => { setIsCurrencyOpen(!isCurrencyOpen); setIsLangOpen(false); }}
                className="flex items-center gap-1 text-gray-500 hover:text-emerald-600 transition-colors"
              >
                USD <ChevronDown size={12} />
              </button>
              {isCurrencyOpen && (
                <ul className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 min-w-[100px]">
                  {CURRENCIES.map((cur) => (
                    <li key={cur}>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">{cur}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 py-4 flex items-center gap-4 lg:gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-emerald-600"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-black text-emerald-600 tracking-tight shrink-0">
            <span>WE</span><span className="text-gray-800">Market</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-[600px] hidden lg:flex items-center border-2 border-emerald-500 rounded-md overflow-hidden">
            <div className="relative border-r border-gray-200">
              <select className="appearance-none bg-gray-50 text-xs text-gray-600 font-medium px-4 py-3 pr-8 cursor-pointer focus:outline-none">
                {CATEGORIES_SEARCH.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full px-4 py-3 text-sm text-gray-700 focus:outline-none"
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 transition-colors shrink-0">
              <Search size={18} />
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 lg:gap-5 text-gray-700 shrink-0">
            {/* Account Dropdown */}
            <div ref={accountRef} className="relative hidden sm:block">
              <button
                onClick={() => { setIsAccountOpen(!isAccountOpen); setIsCartOpen(false); }}
                className="flex flex-col items-center hover:text-emerald-600 transition-colors"
              >
                <User size={22} />
                <span className="text-[10px] font-medium mt-0.5">Account</span>
              </button>
              {isAccountOpen && (
                <ul className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 min-w-[180px]">
                  {[
                    { label: "My Account", href: "/account" },
                    { label: "Order Tracking", href: "/order-tracking" },
                    { label: "My Orders", href: "/account/orders" },
                    { label: "My Wishlist", href: "/wishlist" },
                    { label: "Setting", href: "/account/settings" },
                    { label: "Sign out", href: "/logout" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="flex flex-col items-center hover:text-emerald-600 transition-colors relative">
              <Heart size={22} />
              <span className="text-[10px] font-medium mt-0.5">Wishlist</span>
              <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-1">
                5
              </span>
            </Link>

            {/* Cart Dropdown */}
            <div ref={cartRef} className="relative">
              <button
                onClick={() => { setIsCartOpen(!isCartOpen); setIsAccountOpen(false); }}
                className="flex flex-col items-center hover:text-emerald-600 transition-colors relative"
              >
                <ShoppingCart size={22} />
                <span className="text-[10px] font-medium mt-0.5">Cart</span>
                <span className="absolute -top-1.5 -right-3 bg-emerald-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-1">
                  2
                </span>
              </button>

              {isCartOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-[320px] p-5">
                  {CART_ITEMS.map((item) => (
                    <div key={item.id} className="flex gap-3 mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-md shrink-0 flex items-center justify-center">
                        <ShoppingBag size={24} className="text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.id}`} className="text-sm font-medium text-gray-800 hover:text-emerald-600 line-clamp-2">
                          {item.name}
                        </Link>
                        <p className="text-sm text-emerald-600 font-bold mt-1">
                          {item.qty} × ${item.price.toLocaleString()}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 shrink-0 mt-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 mb-4">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-emerald-600">${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="flex-1 text-center py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      View cart
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="flex-1 text-center py-2 text-sm font-medium bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Compare */}
            <Link href="/compare" className="hidden sm:flex flex-col items-center hover:text-emerald-600 transition-colors">
              <ArrowRightLeft size={22} />
              <span className="text-[10px] font-medium mt-0.5">Compare</span>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <div className="border-t border-gray-100 hidden lg:block bg-white">
          <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center">
              {/* Browse Categories Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-3 flex items-center gap-2 transition-colors shrink-0"
              >
                <Grid size={16} />
                Browse All Categories
                <ChevronDown size={14} />
              </button>

              {/* Navigation Links */}
              <nav className="flex">
                {NAV_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setActiveSubNav(item.label)}
                    onMouseLeave={() => setActiveSubNav(null)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 px-4 py-3 text-sm font-bold transition-colors ${
                        item.label === "Home"
                          ? "text-emerald-600"
                          : "text-gray-700 hover:text-emerald-600"
                      }`}
                    >
                      {item.label}
                      {item.children && <ChevronDown size={14} />}
                    </Link>

                    {item.children && activeSubNav === item.label && (
                      <ul className={`absolute top-full left-0 bg-white border border-gray-200 rounded-b-lg shadow-lg py-2 z-50 min-w-[200px] ${
                        item.label === "Shop" ? "grid grid-cols-2 min-w-[440px]" : ""
                      }`}>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block px-5 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 whitespace-nowrap"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Support Info */}
            <div className="flex items-center gap-2 text-gray-700">
              <Headphones className="text-emerald-600" size={20} />
              <span className="text-sm font-bold">24/7 Support Center</span>
            </div>
          </div>
        </div>
      </header>

      {/* Category Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-full max-w-[320px] bg-white h-full shadow-2xl overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Grid size={18} className="text-emerald-600" /> All Categories
              </h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-2">
              {CATEGORIES_SIDEBAR.map((cat) => {
                const Icon = cat.icon;
                const isOpen = openSidebarCategory === cat.label;
                return (
                  <div key={cat.label} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => setOpenSidebarCategory(isOpen ? null : cat.label)}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors text-left"
                    >
                      <Icon size={18} className="text-gray-400 shrink-0" />
                      <span className="flex-1 font-medium">{cat.label}</span>
                      <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <ul className="bg-gray-50 px-5 py-2">
                        {cat.subs.map((sub) => (
                          <li key={sub}>
                            <Link
                              href={`/shop?category=${encodeURIComponent(sub)}`}
                              onClick={() => setIsSidebarOpen(false)}
                              className="block py-1.5 text-xs text-gray-600 hover:text-emerald-600 transition-colors"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[300px] bg-white shadow-2xl overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <Link href="/" className="text-xl font-black text-emerald-600" onClick={() => setIsMobileMenuOpen(false)}>
                WE<span className="text-gray-800">Market</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full px-3 py-2 text-sm text-gray-700 focus:outline-none"
                />
                <button className="bg-emerald-500 text-white px-4 py-2">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* Mobile Nav */}
            <nav className="p-2">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <MobileNavGroup label={item.label} items={item.children} onNavigate={() => setIsMobileMenuOpen(false)} />
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-bold text-gray-700 hover:text-emerald-600 border-b border-gray-50"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Account Links */}
            <div className="border-t border-gray-200 mt-2 pt-2 px-2">
              <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-50">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Hello <span className="text-emerald-600">Steven!</span></p>
                  <p className="text-xs text-gray-500">You have 3 new messages</p>
                </div>
              </div>
              {[
                { label: "My Account", href: "/account" },
                { label: "Order Tracking", href: "/order-tracking" },
                { label: "My Orders", href: "/account/orders" },
                { label: "My Wishlist", href: "/wishlist" },
                { label: "Setting", href: "/account/settings" },
                { label: "Sign out", href: "/logout" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-700 hover:text-emerald-600 border-b border-gray-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Banner */}
            <div className="p-4 mt-2">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-5 text-white">
                <span className="text-xs text-gray-400">Starting from $899</span>
                <h3 className="text-lg font-bold mt-1 mb-1">iPhone 12 Pro 128Gb</h3>
                <p className="text-sm text-gray-400 mb-3">Special Sale</p>
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300"
                >
                  Learn more <ChevronDown size={14} className="-rotate-90" />
                </Link>
              </div>
            </div>

            <div className="p-4 text-xs text-gray-400 text-center mt-2">
              Copyright 2026 &copy; WE Market.<br />Designed by WE Market Team
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MobileNavGroup({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: { label: string; href: string }[];
  onNavigate: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-700 hover:text-emerald-600"
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <ul className="bg-gray-50 px-4 py-1">
          {items.map((child) => (
            <li key={child.label}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className="block py-2 text-sm text-gray-600 hover:text-emerald-600"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Heart, ShoppingCart, User, Menu, X, ChevronDown,
  Headphones, Grid, ShoppingBag, ArrowRightLeft, Trash2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";
import { useCurrency } from "@/context/CurrencyContext";
import { CURRENCY_CODES, CURRENCY_LABELS, type CurrencyCode } from "@/utils/currency";
import { CATEGORIES } from "@/data/categories";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/checkout";
import SearchBar from "@/components/search/SearchBar";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Offer Zone", href: "/shop?sale=true" },
  {
    label: "Categories",
    href: "/shop",
    children: CATEGORIES.map((category) => ({
      label: category.label,
      href: `/shop?category=${category.slug}`,
    })),
  },
  { label: "Orders", href: "/account/orders" },
  { label: "Contact", href: "/contact" },
];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "cn", label: "中国人", flag: "🇨🇳" },
];

const CURRENCIES = CURRENCY_CODES;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { items: cartItems, count: cartCount, subtotal: cartTotal, removeItem } = useCart();
  const { items: compareItems } = useCompare();
  const { currency, setCurrency, format } = useCurrency();

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

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-white border-b border-gray-100 text-xs hidden lg:block">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-10">
          <div className="text-center">
            <span className="text-gray-500">Free shipping for all orders over </span>
            <span className="font-bold text-emerald-600">{format(FREE_SHIPPING_THRESHOLD)}</span>
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
                {CURRENCY_LABELS[currency]} <ChevronDown size={12} />
              </button>
              {isCurrencyOpen && (
                <ul className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 min-w-[140px]">
                  {CURRENCIES.map((cur) => (
                    <li key={cur}>
                      <button
                        onClick={() => {
                          setCurrency(cur as CurrencyCode);
                          setIsCurrencyOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-600 flex items-center justify-between gap-2 ${
                          cur === currency ? "text-emerald-600 font-semibold" : "text-gray-700"
                        }`}
                      >
                        {CURRENCY_LABELS[cur]}
                        {cur === currency && <span aria-hidden="true">&#10003;</span>}
                      </button>
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
        <div className="max-w-[1440px] mx-auto px-4 py-1 max-h-[52px] flex items-center gap-4 lg:gap-6">
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
          <SearchBar />

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
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-3 bg-emerald-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-1">
                    {cartCount}
                  </span>
                )}
              </button>

              {isCartOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-[320px] p-5">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-4">
                      <ShoppingBag size={28} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-sm text-gray-500 mb-3">Your cart is empty</p>
                      <Link
                        href="/shop"
                        onClick={() => setIsCartOpen(false)}
                        className="inline-block text-sm font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        Browse products
                      </Link>
                    </div>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <div key={item.productId} className="flex gap-3 mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                          <Link
                            href={`/products/${item.productId}`}
                            onClick={() => setIsCartOpen(false)}
                            className="w-16 h-16 bg-gray-100 rounded-md shrink-0 overflow-hidden"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${item.productId}`}
                              onClick={() => setIsCartOpen(false)}
                              className="text-sm font-medium text-gray-800 hover:text-emerald-600 line-clamp-2"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-emerald-600 font-bold mt-1">
                              {item.quantity} &times; {format(item.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="text-gray-400 hover:text-red-500 shrink-0 mt-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-2 mb-4">
                        <span className="font-bold text-gray-800">Total</span>
                        <span className="font-bold text-emerald-600">{format(cartTotal)}</span>
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
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Compare */}
            <Link href="/compare" className="hidden sm:flex flex-col items-center hover:text-emerald-600 transition-colors relative">
              <ArrowRightLeft size={22} />
              <span className="text-[10px] font-medium mt-0.5">Compare</span>
              {compareItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-1">
                  {compareItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <div className="border-b border-gray-200 hidden lg:block bg-white">
          <div className="max-w-[1440px] mx-auto px-4 h-11 flex items-center justify-between">
            <div className="flex items-center">
              {/* Browse Categories Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-3 py-1.5 mr-2 flex items-center gap-2 rounded-md transition-colors shrink-0"
              >
                <Grid size={15} />
                Browse All Categories
                <ChevronDown size={13} />
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
                      className={`flex items-center gap-1 px-3 py-1.5 text-sm font-semibold transition-colors ${
                        item.label === "Offer Zone"
                          ? "text-orange-500 hover:text-orange-600"
                          : "text-gray-600 hover:text-emerald-600"
                      }`}
                    >
                      {item.label}
                      {item.children && <ChevronDown size={14} />}
                    </Link>

                    {item.children && activeSubNav === item.label && (
                      <ul className={`absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 w-52 max-w-[210px] ${
                        item.label === "Categories" ? "max-h-[420px] overflow-y-auto" : "min-w-[200px]"
                      }`}>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block text-xs font-medium py-1.5 px-2 mx-1 text-slate-700 hover:bg-slate-100 hover:text-emerald-600 rounded whitespace-nowrap"
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
          <div className="w-52 max-w-[210px] bg-white h-full shadow-2xl overflow-y-auto">
            <div className="px-3 py-3 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <Grid size={14} className="text-emerald-600" /> All Categories
              </h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/shop?category=${category.slug}`}
                  onClick={() => setIsSidebarOpen(false)}
                  className="block text-xs font-medium py-1.5 px-2 mb-0.5 text-slate-700 hover:bg-slate-100 hover:text-emerald-600 rounded transition-colors text-left leading-snug"
                >
                  {category.label}
                </Link>
              ))}
              <Link
                href="/shop?sale=true"
                onClick={() => setIsSidebarOpen(false)}
                className="block text-xs font-bold py-1.5 px-2 mt-1 text-orange-500 hover:bg-slate-100 rounded transition-colors text-left"
              >
                Offer Zone
              </Link>
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
              <SearchBar variant="mobile" />
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
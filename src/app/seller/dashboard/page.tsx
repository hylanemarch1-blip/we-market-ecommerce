"use client";

import { useState } from "react";
import { Search, Menu, Loader, User, X } from "lucide-react";

export default function SellerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { label: "Dashboard", href: "/seller/dashboard" },
    { label: "My Store", href: "/store/[vendor-slug]" },
    { label: "Products", href: "/vendor/products" },
    { label: "Orders", href: "/vendor/orders" },
    { label: "Shipping", href: "/vendor/shipping" },
    { label: "Payments", href: "/vendor/payments" },
    { label: "Inventory", href: "/vendor/inventory" },
    { label: "Customers", href: "/vendor/customers" },
    { label: "Analytics", href: "/vendor/analytics" },
    { label: "Marketing", href: "/vendor/marketing" },
    { label: "Settings", href: "/vendor/settings" },
    { label: "Support", href: "/vendor/support" },
  ];

  return (
    <section className="py-12">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Sidebar */}
          <nav className="bg-emerald-600 min-h-screen">
            <div className="p-6 border-b border-emerald-500">
              <h2 className="text-xl font-bold text-white">WE Market</h2>
              <p className="text-emerald-200 text-sm">Vendor Dashboard</p>
            </div>
            <nav className="p-6 space-y-1">
              {sidebarItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-emerald-50 transition-colors text-sm font-medium text-white ${
                    item.label === "Dashboard"
                      ? "bg-white text-emerald-600"
                      : "text-white"
                  }`}
                >
                  <div className="w-8 h-8 rounded-flex flex items-center justify-center shrink-0 flex-shrink-0">
                    <Search className="w-3 h-3 text-white" />
                  </div>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </nav>

          {/* Main Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="bg-white p-2 rounded-md hover:bg-emerald-50 transition-colors"
              >
                <Menu className="text-emerald-600" size={20} />
              </button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-2xl font-bold text-emerald-600">1,248</p>
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
                  <div className="w-8 h-8 bg-emerald-100 rounded-flex flex items-center justify-center flex-shrink-0">
                    <Search className="w-3 h-3 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium">New product listed</p>
                    <p className="text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2 py-1 rounded border border-gray-100">
                  <div className="w-8 h-8 bg-gray-100 rounded-flex flex items-center justify-center flex-shrink-0">
                    <Loader className="w-3 h-3 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">Order #1027 shipped</p>
                    <p className="text-gray-400">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2 py-1 rounded border border-gray-100">
                  <div className="w-8 h-8 bg-gray-100 rounded-flex flex items-center justify-center flex-shrink-0">
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

          {/* Sidebar Drawer (mobile) */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
              <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl transform -translate-x-full transition-transform duration-300">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-bold text-emerald-600">Menu</h3>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute right-3 p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                  >
                    <X className="text-gray-400" size={20} />
                  </button>
                </div>
                <nav className="p-4 space-y-1">
                  {sidebarItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="px-3 py-2 rounded-md hover:bg-emerald-50 transition-colors text-sm font-medium text-emerald-600"
                    >
                      {item.label}
                    </a>
                  ))}
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
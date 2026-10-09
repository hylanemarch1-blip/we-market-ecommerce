"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MapPin,
  Package,
  Settings,
  ShoppingBag,
  Star,
  Wallet,
} from "lucide-react";
import { useFormatPrice } from "@/context/CurrencyContext";
import {
  getOrdersSnapshot,
  getServerOrdersSnapshot,
  initOrders,
  subscribeOrders,
} from "@/lib/orders";

const QUICK_LINKS = [
  {
    href: "/account/orders",
    icon: Package,
    label: "My Orders",
    description: "Track, return or buy again",
  },
  {
    href: "/wishlist",
    icon: Heart,
    label: "Wishlist",
    description: "Items you saved for later",
  },
  {
    href: "/compare",
    icon: ShoppingBag,
    label: "Compare",
    description: "Side-by-side product comparison",
  },
  {
    href: "/account/settings",
    icon: Settings,
    label: "Account Settings",
    description: "Profile, currency & preferences",
  },
  {
    href: "/shop?sale=true",
    icon: Star,
    label: "Offer Zone",
    description: "Today's deals and discounts",
  },
  {
    href: "/contact",
    icon: MapPin,
    label: "Help & Support",
    description: "Talk to our customer team",
  },
];

export default function AccountPage() {
  const format = useFormatPrice();
  const orders = useSyncExternalStore(
    subscribeOrders,
    getOrdersSnapshot,
    getServerOrdersSnapshot
  );

  useEffect(() => {
    initOrders();
  }, []);

  const orderList = orders ?? [];
  const totalSpent = orderList.reduce((sum, order) => sum + order.total, 0);
  const activeOrders = orderList.filter(
    (order) => order.status !== "DELIVERED" && order.status !== "CANCELLED"
  ).length;

  return (
    <div className="bg-gray-50 min-h-[60vh] py-8">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-xs text-gray-500 mb-5">
          <Link href="/" className="hover:text-emerald-600">Home</Link> /{" "}
          <span className="text-gray-700">My Account</span>
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-xl font-black text-emerald-600">S</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Hello, Steven!
              </h1>
              <p className="text-sm text-gray-500">
                Manage your orders, wishlist and preferences.
              </p>
            </div>
          </div>
          <Link
            href="/account/settings"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-400 px-4 py-2 rounded-lg transition-colors"
          >
            <Settings size={15} /> Settings
          </Link>
        </div>

        {/* Overview stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              Orders
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {orderList.length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              Active
            </p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {activeOrders}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              Total spent
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {format(totalSpent)}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              Rewards
            </p>
            <p className="text-2xl font-bold text-amber-500 mt-1">240 pts</p>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3 hover:border-emerald-300 hover:shadow-sm transition-colors"
              >
                <span className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                  <Icon size={17} className="text-emerald-600" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-gray-800 group-hover:text-emerald-600">
                    {link.label}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">
                    {link.description}
                  </span>
                </span>
                <ArrowRight
                  size={15}
                  className="text-gray-300 group-hover:text-emerald-500 mt-1 shrink-0"
                />
              </Link>
            );
          })}
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Recent Orders</h2>
            <Link
              href="/account/orders"
              className="text-sm font-medium text-emerald-600 hover:underline"
            >
              View all
            </Link>
          </div>

          {orderList.length === 0 ? (
            <div className="text-center py-8">
              <Wallet size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-500 mb-4">
                No orders yet — your recent purchases will show up here.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                Start Shopping <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {orderList.slice(0, 3).map((order) => (
                <li
                  key={order.id}
                  className="py-3 flex flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {order.orderNumber}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.items.length} item(s) ·{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-emerald-600">
                      {format(order.total)}
                    </span>
                    <Link
                      href={`/orders/${order.id}/track`}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-400 px-3 py-1.5 rounded-full transition-colors"
                    >
                      Track
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

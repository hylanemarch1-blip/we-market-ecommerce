"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { Package, MapPin, ArrowRight } from "lucide-react";
import { useFormatPrice } from "@/context/CurrencyContext";
import {
  getOrdersSnapshot,
  getServerOrdersSnapshot,
  initOrders,
  subscribeOrders,
  type Order,
} from "@/lib/orders";

const STATUS_STYLES: Record<Order["status"], string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function AccountOrdersPage() {
  const format = useFormatPrice();
  const orders = useSyncExternalStore(
    subscribeOrders,
    getOrdersSnapshot,
    getServerOrdersSnapshot
  );

  useEffect(() => {
    initOrders();
  }, []);

  return (
    <div className="bg-gray-50 min-h-[60vh] py-8">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-xs text-gray-500 mb-5">
          <Link href="/" className="hover:text-emerald-600">Home</Link> /{" "}
          <span className="text-gray-700">My Orders</span>
        </p>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>

        {orders === null ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-sm text-gray-400">
            Loading your orders…
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              No orders yet
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Orders you place will show up here with their status and details.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                        Order Number
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {order.orderNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                        Placed On
                      </p>
                      <p className="text-sm text-gray-700">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                        Total
                      </p>
                      <p className="text-sm font-bold text-emerald-600">
                        {format(order.total)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                        STATUS_STYLES[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                    <Link
                      href={`/orders/${order.id}/track`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-400 px-3 py-1.5 rounded-full transition-colors"
                    >
                      Track Order <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <ul className="space-y-3">
                    {order.items.map((item) => (
                      <li
                        key={item.productId}
                        className="flex items-center gap-3"
                      >
                        <Link
                          href={`/products/${item.productId}`}
                          className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0"
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
                            className="text-sm font-medium text-gray-800 hover:text-emerald-600 line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-gray-400">
                            {format(item.price)} × {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">
                          {format(item.price * item.quantity)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="shrink-0 mt-0.5 text-gray-400" />
                      <span>
                        <span className="block font-semibold text-gray-700">
                          {order.shippingAddress.fullName}
                        </span>
                        {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} {order.shippingAddress.postalCode}
                        <br />
                        {order.shippingAddress.phone}
                      </span>
                    </div>
                    <div className="sm:text-right space-y-1">
                      <p>
                        Subtotal:{" "}
                        <span className="font-semibold text-gray-700">
                          {format(order.subtotal)}
                        </span>
                      </p>
                      <p>
                        Shipping:{" "}
                        <span className="font-semibold text-gray-700">
                          {order.shipping === 0 ? "FREE" : format(order.shipping)}
                        </span>
                      </p>
                      <p className="text-sm">
                        Total:{" "}
                        <span className="font-bold text-emerald-600">
                          {format(order.total)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

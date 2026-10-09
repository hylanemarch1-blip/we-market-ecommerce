"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Package, Search, Truck } from "lucide-react";
import {
  getOrdersSnapshot,
  initOrders,
  subscribeOrders,
} from "@/lib/orders";

export default function OrderTrackingPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [recent, setRecent] = useState<{ id: string; orderNumber: string }[]>([]);

  useEffect(() => {
    const sync = () => {
      const orders = getOrdersSnapshot() ?? [];
      setRecent(
        orders.slice(0, 3).map((order) => ({
          id: order.id,
          orderNumber: order.orderNumber,
        }))
      );
    };
    sync();
    const unsubscribe = subscribeOrders(sync);
    initOrders();
    return unsubscribe;
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = code.trim().toLowerCase();
    if (!query) {
      setError("Enter your order number to continue.");
      return;
    }
    const orders = getOrdersSnapshot() ?? [];
    const match = orders.find(
      (order) =>
        order.id.toLowerCase() === query ||
        order.orderNumber.toLowerCase() === query ||
        order.orderNumber.toLowerCase().replace(/^wm-/, "") === query.replace(/^wm-/, "")
    );
    if (match) {
      setError(null);
      router.push(`/orders/${match.id}/track`);
      return;
    }
    setError(
      "We could not find that order on this device. Check the number in My Orders."
    );
  };

  return (
    <div className="bg-gray-50 min-h-[60vh] py-8">
      <div className="max-w-xl mx-auto px-4">
        <p className="text-xs text-gray-500 mb-5">
          <Link href="/" className="hover:text-emerald-600">Home</Link> /{" "}
          <span className="text-gray-700">Order Tracking</span>
        </p>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck size={26} className="text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Track Your Order</h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter your order number (e.g. <span className="font-mono font-semibold text-gray-600">WM-XXXXXX</span>)
            to see live shipment status.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <label htmlFor="order-code" className="block text-sm font-medium text-gray-700 mb-1.5">
            Order number
          </label>
          <div className="flex gap-2">
            <input
              id="order-code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
              }}
              placeholder="WM-ABC123"
              className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shrink-0"
            >
              <Search size={15} /> Track
            </button>
          </div>
          {error && (
            <p className="text-xs text-red-500 mt-2">{error}</p>
          )}
        </form>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4">Recent orders on this device</h2>
          {recent.length === 0 ? (
            <div className="text-center py-6">
              <Package size={36} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-500 mb-4">
                No recent orders found on this device.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Browse products <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recent.map((order) => (
                <li key={order.id} className="py-3 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-gray-800 font-mono">
                    {order.orderNumber}
                  </span>
                  <Link
                    href={`/orders/${order.id}/track`}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-400 px-3 py-1.5 rounded-full transition-colors"
                  >
                    Track
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center">
          Orders placed on another device can be found in{" "}
          <Link href="/account/orders" className="text-emerald-600 font-semibold hover:underline">
            My Orders
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

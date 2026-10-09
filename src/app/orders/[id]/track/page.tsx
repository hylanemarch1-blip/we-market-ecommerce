"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Package,
  PackageCheck,
  Truck,
  MapPin,
} from "lucide-react";
import { useFormatPrice } from "@/context/CurrencyContext";
import {
  getOrdersSnapshot,
  getServerOrdersSnapshot,
  initOrders,
  subscribeOrders,
  PAYMENT_METHOD_LABELS,
  type Order,
} from "@/lib/orders";

const STATUS_STYLES: Record<Order["status"], string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

interface TimelineStep {
  key: string;
  label: string;
  description: string;
  icon: typeof Package;
}

const TIMELINE: TimelineStep[] = [
  {
    key: "placed",
    label: "Order Placed",
    description: "We have received your order.",
    icon: Package,
  },
  {
    key: "packed",
    label: "Packed",
    description: "Your items are packed and ready to ship.",
    icon: PackageCheck,
  },
  {
    key: "shipped",
    label: "Shipped",
    description: "Your order is on the way.",
    icon: Truck,
  },
  {
    key: "out-for-delivery",
    label: "Out for Delivery",
    description: "The courier is out for delivery.",
    icon: MapPin,
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Your order has been delivered.",
    icon: CheckCircle2,
  },
];

/** Map order status to the index of the last completed timeline step. */
function completedStepIndex(status: Order["status"]): number {
  switch (status) {
    case "PENDING":
      return 0;
    case "CONFIRMED":
      return 1;
    case "SHIPPED":
      return 2;
    case "DELIVERED":
      return 4;
    default:
      return -1;
  }
}

function stepDate(order: Order, index: number): string {
  const placed = new Date(order.createdAt);
  const date = new Date(placed.getTime() + index * 86_400_000);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function OrderTrackingPage() {
  const params = useParams<{ id: string }>();
  const format = useFormatPrice();
  const orders = useSyncExternalStore(
    subscribeOrders,
    getOrdersSnapshot,
    getServerOrdersSnapshot
  );

  useEffect(() => {
    initOrders();
  }, []);

  const order = orders?.find((entry) => entry.id === params.id) ?? null;

  if (orders === null) {
    return (
      <div className="bg-gray-50 min-h-[60vh] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-gray-400">
          Loading your order…
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-gray-50 min-h-[60vh] py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-xl border border-gray-200 p-12">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              Order not found
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              We could not find this order on this device. Orders are stored
              locally — try opening it from your order history.
            </p>
            <Link
              href="/account/orders"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              View My Orders <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cancelled = order.status === "CANCELLED";
  const completed = completedStepIndex(order.status);
  const currentStep = cancelled ? -1 : Math.min(completed + 1, TIMELINE.length - 1);

  return (
    <div className="bg-gray-50 min-h-[60vh] py-8">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-xs text-gray-500 mb-5">
          <Link href="/" className="hover:text-emerald-600">Home</Link> /{" "}
          <Link href="/account/orders" className="hover:text-emerald-600">My Orders</Link> /{" "}
          <span className="text-gray-700">Track Order</span>
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Track Order</h1>
            <p className="text-sm text-gray-500 mt-1">
              Order <span className="font-semibold text-gray-700">{order.orderNumber}</span>
              {" · "}Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-full ${
              STATUS_STYLES[order.status]
            }`}
          >
            {order.status}
          </span>
        </div>

        {cancelled && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-4 mb-6">
            This order was cancelled. Contact support if you already paid —
            refunds are issued within 5–7 business days.
          </div>
        )}

        {/* Tracking timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-6">Shipment Status</h2>

          <ol className="relative">
            {TIMELINE.map((step, index) => {
              const done = !cancelled && index <= completed;
              const active = !cancelled && index === currentStep;
              const Icon = step.icon;
              const last = index === TIMELINE.length - 1;
              return (
                <li key={step.key} className="relative flex gap-4 pb-8 last:pb-0">
                  {!last && (
                    <span
                      aria-hidden="true"
                      className={`absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 ${
                        done && index < completed ? "bg-emerald-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                  <span
                    className={`relative z-10 shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      done
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : active
                          ? "bg-white border-emerald-500 text-emerald-600 animate-pulse"
                          : "bg-white border-gray-300 text-gray-300"
                    }`}
                  >
                    {done ? <CheckCircle2 size={17} /> : <Icon size={16} />}
                  </span>
                  <div className="flex-1 min-w-0 -mt-0.5">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                      <p
                        className={`text-sm font-semibold ${
                          done ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>
                      {done && (
                        <p className="text-xs text-gray-400">
                          {stepDate(order, index)}
                        </p>
                      )}
                    </div>
                    <p
                      className={`text-xs mt-0.5 ${
                        done ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>
                    {active && !last && (
                      <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide mt-1">
                        In progress
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Order details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4">Order Items</h2>
          <ul className="space-y-3">
            {order.items.map((item) => (
              <li key={item.productId} className="flex items-center gap-3">
                <Link
                  href={`/products/${item.productId}`}
                  className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative block"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.productId}`}
                    className="text-sm font-medium text-gray-800 hover:text-emerald-600 line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {format(item.price)} × {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  {format(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 mt-4 pt-4 text-xs text-gray-500">
            <div className="flex items-start gap-2">
              <MapPin size={14} className="shrink-0 mt-0.5 text-gray-400" />
              <span>
                <span className="block font-semibold text-gray-700">
                  {order.shippingAddress.fullName}
                </span>
                {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state} {order.shippingAddress.postalCode}
                {order.shippingAddress.country
                  ? `, ${order.shippingAddress.country}`
                  : ""}
                <br />
                {order.shippingAddress.phone}
              </span>
            </div>
            <div className="sm:text-right space-y-1">
              {order.paymentMethod && (
                <p>
                  Payment:{" "}
                  <span className="font-semibold text-gray-700">
                    {PAYMENT_METHOD_LABELS[order.paymentMethod]}
                  </span>
                </p>
              )}
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

        <div className="flex flex-wrap gap-3">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            <ArrowRight size={15} className="rotate-180" /> Back to My Orders
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
          >
            Need help? Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}

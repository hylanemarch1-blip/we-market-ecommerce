"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  calculateShipping,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
} from "@/lib/checkout";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-[60vh] py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-xl border border-gray-200 p-12">
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Browse the shop and add products to your cart to see them here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[60vh] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs text-gray-500 mb-5">
          <Link href="/" className="hover:text-emerald-600">Home</Link> /{" "}
          <span className="text-gray-700">Cart</span>
        </p>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 items-center"
              >
                <Link
                  href={`/products/${item.productId}`}
                  className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0"
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
                    className="text-sm font-semibold text-gray-800 hover:text-emerald-600 line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                  <p className="text-sm font-bold text-emerald-600 mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center border border-gray-300 rounded-lg shrink-0">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="p-2 text-gray-500 hover:text-emerald-600"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="p-2 text-gray-500 hover:text-emerald-600 disabled:opacity-40"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="text-right shrink-0 w-24">
                  <p className="text-sm font-bold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.productId)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-28">
              <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-800">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-emerald-600 text-base">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {amountToFreeShipping > 0 && (
                <p className="text-xs text-gray-500 mt-4 bg-emerald-50 text-emerald-700 rounded-lg p-3">
                  Add <strong>${amountToFreeShipping.toFixed(2)}</strong> more to
                  get free shipping (orders over ${FREE_SHIPPING_THRESHOLD} ship
                  free, otherwise ${SHIPPING_FEE.toFixed(2)}).
                </p>
              )}

              <Link
                href="/checkout"
                className="mt-5 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <Link
                href="/shop"
                className="mt-3 w-full flex items-center justify-center text-sm text-gray-500 hover:text-emerald-600 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

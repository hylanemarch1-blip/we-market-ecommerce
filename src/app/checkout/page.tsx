"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  ArrowRight,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  calculateShipping,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/checkout";
import { saveOrder, type Order, type ShippingAddress } from "@/lib/orders";

type AddressField = keyof ShippingAddress;

const ADDRESS_FIELDS: { key: AddressField; label: string; placeholder: string; type?: string; autoComplete?: string }[] = [
  { key: "fullName", label: "Full Name", placeholder: "John Doe", autoComplete: "name" },
  { key: "street", label: "Street Address", placeholder: "123 Main Street, Apt 4", autoComplete: "street-address" },
  { key: "city", label: "City", placeholder: "San Francisco", autoComplete: "address-level2" },
  { key: "state", label: "State", placeholder: "California", autoComplete: "address-level1" },
  { key: "postalCode", label: "Postal Code", placeholder: "94103", autoComplete: "postal-code" },
  { key: "phone", label: "Phone", placeholder: "+1 555 000 1234", type: "tel", autoComplete: "tel" },
];

const EMPTY_ADDRESS: ShippingAddress = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  phone: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const [address, setAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<AddressField, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  const setField = (key: AddressField, value: string) => {
    setAddress((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = (): boolean => {
    const errors: Partial<Record<AddressField, string>> = {};
    if (!address.fullName.trim()) errors.fullName = "Full name is required";
    if (!address.street.trim()) errors.street = "Street address is required";
    if (!address.city.trim()) errors.city = "City is required";
    if (!address.state.trim()) errors.state = "State is required";
    if (!address.postalCode.trim()) errors.postalCode = "Postal code is required";
    if (!address.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^[\d\s()+-]{7,20}$/.test(address.phone.trim())) {
      errors.phone = "Enter a valid phone number";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0 || submitting) return;
    setApiError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          shippingAddress: {
            fullName: address.fullName.trim(),
            street: address.street.trim(),
            city: address.city.trim(),
            state: address.state.trim(),
            postalCode: address.postalCode.trim(),
            phone: address.phone.trim(),
          },
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { order?: Order; error?: string; details?: string[] }
        | null;

      if (!response.ok || !data?.order) {
        const message = data?.details?.length
          ? data.details.join(" · ")
          : data?.error ?? "Unable to place your order. Please try again.";
        setApiError(message);
        setSubmitting(false);
        return;
      }

      saveOrder(data.order);
      setPlacing(true);
      clearCart();
      router.push("/account/orders");
    } catch {
      setApiError("Network error — unable to reach the orders service.");
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !placing) {
    return (
      <div className="bg-gray-50 min-h-[60vh] py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-xl border border-gray-200 p-12">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Add some products before checking out.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Browse Products <ArrowRight size={16} />
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
          <Link href="/cart" className="hover:text-emerald-600">Cart</Link> /{" "}
          <span className="text-gray-700">Checkout</span>
        </p>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          {/* Shipping form */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-800 mb-1">Shipping Address</h2>
              <p className="text-xs text-gray-500 mb-5">
                Enter where you want your order delivered.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ADDRESS_FIELDS.map((field) => (
                  <div
                    key={field.key}
                    className={field.key === "fullName" || field.key === "street" ? "sm:col-span-2" : ""}
                  >
                    <label
                      htmlFor={field.key}
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.key}
                      type={field.type ?? "text"}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      value={address[field.key]}
                      onChange={(event) => setField(field.key, event.target.value)}
                      className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
                        fieldErrors[field.key]
                          ? "border-red-400"
                          : "border-gray-300"
                      }`}
                    />
                    {fieldErrors[field.key] && (
                      <p className="text-xs text-red-500 mt-1">
                        {fieldErrors[field.key]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 mt-5 border-t border-gray-100 pt-4">
                <ShieldCheck size={15} className="text-emerald-600" />
                Your data is encrypted and never shared with sellers.
              </div>
            </div>
          </div>

          {/* Order summary */}
          <aside className="w-full lg:w-[420px] shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-28">
              <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        aria-label={`Remove ${item.name}`}
                        className="absolute -top-1.5 -right-1.5 bg-white border border-gray-200 rounded-full p-0.5 text-gray-400 hover:text-red-500 shadow-sm"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        ${item.price.toFixed(2)} each
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="px-1.5 py-1 text-gray-500 hover:text-emerald-600"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="px-1.5 py-1 text-gray-500 hover:text-emerald-600 disabled:opacity-40"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-800 shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-5 pt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>
                    Shipping
                    {shipping > 0 && (
                      <span className="text-xs text-gray-400">
                        {" "}
                        (free over ${FREE_SHIPPING_THRESHOLD})
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2.5 flex justify-between">
                  <span className="font-bold text-gray-800">Grand Total</span>
                  <span className="font-bold text-emerald-600 text-base">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {apiError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 mt-4">
                  {apiError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || placing || items.length === 0}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {placing ? (
                  <>
                    <Loader2 size={17} className="animate-spin" /> Redirecting…
                  </>
                ) : submitting ? (
                  <>
                    <Loader2 size={17} className="animate-spin" /> Placing order…
                  </>
                ) : (
                  <>
                    Place Order — ${total.toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-400 text-center mt-3">
                By placing an order you agree to our terms & conditions.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

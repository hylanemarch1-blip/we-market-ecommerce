"use client";

import { Banknote, CreditCard, Globe2, Smartphone, Wallet } from "lucide-react";
import { PAYMENT_METHOD_LABELS, type PaymentMethod as PaymentMethodId } from "@/lib/orders";

const COD_NOTICE =
  "COD is not available for international orders or overseas shipping.";

interface PaymentOption {
  id: PaymentMethodId;
  icon: typeof CreditCard;
  hint: string;
}

const OPTIONS: PaymentOption[] = [
  { id: "CARD", icon: CreditCard, hint: "Visa, Mastercard, RuPay & more" },
  { id: "STRIPE", icon: Wallet, hint: "Secure payments powered by Stripe" },
  { id: "RAZORPAY", icon: Smartphone, hint: "UPI, wallets & netbanking" },
  { id: "ONLINE", icon: Globe2, hint: "Netbanking & international cards" },
  { id: "COD", icon: Banknote, hint: "Pay cash when your order arrives" },
];

interface PaymentMethodProps {
  value: PaymentMethodId;
  onChange: (method: PaymentMethodId) => void;
  /** True when the shipping country is not India. */
  internationalAddress: boolean;
  /** True when any item in the cart is marked isInternational. */
  internationalItems: boolean;
}

export default function PaymentMethod({
  value,
  onChange,
  internationalAddress,
  internationalItems,
}: PaymentMethodProps) {
  const codAllowed = !internationalAddress && !internationalItems;

  const select = (id: PaymentMethodId) => {
    if (id === "COD" && !codAllowed) return;
    onChange(id);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="font-bold text-gray-800 mb-1">Payment Method</h2>
      <p className="text-xs text-gray-500 mb-5">
        Choose how you&apos;d like to pay for this order.
      </p>

      <div className="space-y-2.5" role="radiogroup" aria-label="Payment method">
        {OPTIONS.map((option) => {
          const disabled = option.id === "COD" && !codAllowed;
          const selected = value === option.id;
          const Icon = option.icon;
          return (
            <label
              key={option.id}
              className={`flex items-start gap-3 border rounded-lg px-4 py-3 transition-colors cursor-pointer ${
                disabled
                  ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                  : selected
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                value={option.id}
                checked={selected}
                disabled={disabled}
                onChange={() => select(option.id)}
                className="mt-1 accent-emerald-600"
              />
              <Icon
                size={18}
                className={`shrink-0 mt-0.5 ${
                  selected ? "text-emerald-600" : "text-gray-400"
                }`}
              />
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-semibold text-gray-800">
                  {PAYMENT_METHOD_LABELS[option.id]}
                </span>
                <span className="block text-xs text-gray-500">
                  {option.id === "COD" && !codAllowed ? COD_NOTICE : option.hint}
                </span>
              </span>
            </label>
          );
        })}
      </div>

      {!codAllowed && value === "COD" && (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg p-3 mt-4">
          {COD_NOTICE} Please choose a prepaid payment method.
        </p>
      )}
    </div>
  );
}

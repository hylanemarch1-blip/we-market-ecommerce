import Link from "next/link";
import { VendorPlaceholder } from "../VendorPlaceholder";

export default function VendorSettingsPage() {
  return (
    <VendorPlaceholder
      title="Settings"
      subtitle="Store profile, payout preferences and regional markets."
    >
      <ul className="space-y-3 text-sm">
        <li className="border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-3">
          <span className="text-gray-700">
            <span className="font-semibold text-gray-800 block">Markets</span>
            Countries and currencies your store sells in
          </span>
          <Link
            href="/vendor/settings/markets"
            className="text-emerald-600 font-semibold hover:underline shrink-0"
          >
            Manage
          </Link>
        </li>
        <li className="border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-3">
          <span className="text-gray-700">
            <span className="font-semibold text-gray-800 block">Shipping zones</span>
            Rates and delivery windows
          </span>
          <Link
            href="/vendor/shipping"
            className="text-emerald-600 font-semibold hover:underline shrink-0"
          >
            Manage
          </Link>
        </li>
        <li className="border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-3">
          <span className="text-gray-700">
            <span className="font-semibold text-gray-800 block">Payments</span>
            Settlement account and payout schedule
          </span>
          <Link
            href="/vendor/payments"
            className="text-emerald-600 font-semibold hover:underline shrink-0"
          >
            Manage
          </Link>
        </li>
      </ul>
    </VendorPlaceholder>
  );
}

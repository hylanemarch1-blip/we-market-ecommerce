import Link from "next/link";
import { VendorPlaceholder } from "../VendorPlaceholder";

export default function VendorSupportPage() {
  return (
    <VendorPlaceholder
      title="Support"
      subtitle="Get help with orders, payouts and account verification."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="font-semibold text-gray-800 mb-1">Seller help center</p>
          <p className="text-sm text-gray-500 mb-3">
            Guides on listings, returns, GST/invoicing and payouts.
          </p>
          <Link href="/help" className="text-emerald-600 text-sm font-semibold hover:underline">
            Browse help articles
          </Link>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="font-semibold text-gray-800 mb-1">Talk to us</p>
          <p className="text-sm text-gray-500 mb-3">
            Average response time under 4 hours, Mon–Sat.
          </p>
          <Link href="/contact" className="text-emerald-600 text-sm font-semibold hover:underline">
            Contact support
          </Link>
        </div>
      </div>
    </VendorPlaceholder>
  );
}

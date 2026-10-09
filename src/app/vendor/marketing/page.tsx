import { VendorPlaceholder } from "../VendorPlaceholder";

export default function VendorMarketingPage() {
  return (
    <VendorPlaceholder
      title="Marketing"
      subtitle="Coupons, campaigns and sponsored placements for your store."
    >
      <ul className="space-y-3 text-sm text-gray-600">
        <li className="border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-3">
          <span>
            <span className="font-semibold text-gray-800">FESTIVAL20</span> — 20% off
            fashion, 412 uses
          </span>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            ACTIVE
          </span>
        </li>
        <li className="border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-3">
          <span>
            <span className="font-semibold text-gray-800">WELCOME10</span> — $10 off
            first order, 1,203 uses
          </span>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            ACTIVE
          </span>
        </li>
      </ul>
    </VendorPlaceholder>
  );
}

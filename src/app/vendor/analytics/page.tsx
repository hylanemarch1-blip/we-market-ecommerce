import { VendorPlaceholder } from "../VendorPlaceholder";

export default function VendorAnalyticsPage() {
  return (
    <VendorPlaceholder
      title="Analytics"
      subtitle="Revenue, conversion and traffic for your storefront."
    >
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Revenue (30d)</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">$18,240</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Orders</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">612</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Conversion</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">3.2%</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Visitors</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">41,905</p>
        </div>
      </div>
    </VendorPlaceholder>
  );
}

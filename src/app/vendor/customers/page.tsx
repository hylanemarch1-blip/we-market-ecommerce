import { VendorPlaceholder } from "../VendorPlaceholder";

export default function VendorCustomersPage() {
  return (
    <VendorPlaceholder
      title="Customers"
      subtitle="See who buys from your store, repeat rates and lifetime value."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Customers</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">3,412</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Repeat rate</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">38%</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Avg. LTV</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">$214</p>
        </div>
      </div>
    </VendorPlaceholder>
  );
}

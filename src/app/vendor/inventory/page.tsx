import { VendorPlaceholder } from "../VendorPlaceholder";

export default function VendorInventoryPage() {
  return (
    <VendorPlaceholder
      title="Inventory"
      subtitle="Track stock levels across your catalog and set low-stock alerts."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Total SKUs</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">147</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">In stock</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">139</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Low stock</p>
          <p className="text-2xl font-bold text-amber-500 mt-1">8</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-6">
        Manage individual SKUs from{" "}
        <a href="/vendor/products" className="text-emerald-600 font-semibold hover:underline">
          Products
        </a>
        .
      </p>
    </VendorPlaceholder>
  );
}

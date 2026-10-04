"use client";

import Link from "next/link";
import { ArrowRightLeft, ArrowRight } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import ComparisonTable from "@/components/compare/ComparisonTable";

export default function ComparePage() {
  const { items, removeCompare, clearCompare, openModal, canCompare } = useCompare();

  return (
    <div className="bg-gray-50 min-h-[60vh] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs text-gray-500 mb-5">
          <Link href="/" className="hover:text-emerald-600">Home</Link> /{" "}
          <span className="text-gray-700">Compare</span>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Product Comparison</h1>
          {items.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <ArrowRightLeft size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              No products selected
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Add 2 to 4 products to the compare list to see their specifications
              side by side.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Browse Products <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                {items.length} product{items.length > 1 ? "s" : ""} selected
                {items.length < 2 && " — add at least one more to compare"}
              </p>
              <button
                onClick={openModal}
                disabled={!canCompare}
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Open comparison modal
              </button>
            </div>
            <ComparisonTable products={items} onRemove={removeCompare} />
          </div>
        )}
      </div>
    </div>
  );
}

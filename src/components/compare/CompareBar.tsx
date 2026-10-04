"use client";

import { X, ArrowRightLeft, Trash2 } from "lucide-react";
import { useCompare, MIN_COMPARE, MAX_COMPARE } from "@/context/CompareContext";
import ComparisonTable from "./ComparisonTable";

export default function CompareBar() {
  const {
    items,
    isModalOpen,
    isFull,
    canCompare,
    removeCompare,
    clearCompare,
    openModal,
    closeModal,
  } = useCompare();

  if (items.length === 0) return null;

  return (
    <>
      {/* Sticky compare bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.12)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800 shrink-0">
              <ArrowRightLeft size={18} className="text-emerald-600" />
              <span className="hidden sm:inline">Compare</span>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs">
                {items.length}/{MAX_COMPARE}
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative w-12 h-12 shrink-0 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 group"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeCompare(item.id)}
                    aria-label={`Remove ${item.name} from compare`}
                    className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            {items.length < MIN_COMPARE && (
              <p className="text-xs text-gray-500 hidden md:block">
                Add at least {MIN_COMPARE - items.length} more product
                {MIN_COMPARE - items.length > 1 ? "s" : ""} to compare
              </p>
            )}
            {isFull && (
              <p className="text-xs text-amber-600 hidden md:block">
                Compare list is full (max {MAX_COMPARE})
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clearCompare}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-2"
            >
              <Trash2 size={15} />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <button
              onClick={openModal}
              disabled={!canCompare}
              title={canCompare ? undefined : `Select at least ${MIN_COMPARE} products`}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Compare ({items.length})
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-side comparison modal */}
      {isModalOpen && canCompare && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Product Comparison
                </h2>
                <p className="text-xs text-gray-500">
                  Comparing {items.length} products side by side
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={clearCompare}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear all
                </button>
                <button
                  onClick={closeModal}
                  aria-label="Close comparison"
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto px-6 py-4 flex-1">
              <ComparisonTable products={items} onRemove={removeCompare} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

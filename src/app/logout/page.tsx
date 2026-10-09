import Link from "next/link";
import { ArrowRight, LogOut } from "lucide-react";

export const metadata = {
  title: "Signed Out | WE-MARKET",
};

export default function LogoutPage() {
  return (
    <div className="bg-gray-50 min-h-[60vh] py-16">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="bg-white rounded-xl border border-gray-200 p-10">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut size={24} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            You&apos;ve been signed out
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Thanks for shopping with WE Market. Your cart and wishlist are saved
            on this device — sign back in anytime to pick up where you left off.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Sign back in <ArrowRight size={16} />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

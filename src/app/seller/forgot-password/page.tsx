"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";

export default function SellerForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(trimmed)) {
      setError("Please enter a valid email address");
      return;
    }
    setError(null);
    setSent(true);
  };

  return (
    <section className="py-12 min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-[1440px] mx-auto px-4 w-full">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {sent ? (
              <div className="text-center">
                <CheckCircle2 size={44} className="mx-auto text-emerald-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Check your inbox
                </h1>
                <p className="text-sm text-gray-500 mb-6">
                  If an account exists for{" "}
                  <span className="font-semibold text-gray-700">{email}</span>,
                  we&apos;ve sent a link to reset your password. The link expires
                  in 30 minutes.
                </p>
                <Link
                  href="/seller/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  <ArrowLeft size={15} /> Back to sign in
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail size={22} className="text-emerald-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Forgot password?
                  </h1>
                  <p className="text-sm text-gray-500">
                    Enter the email registered with your seller account and
                    we&apos;ll send you a reset link.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null);
                      }}
                      placeholder="seller@business.com"
                      className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition bg-white ${
                        error ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Send reset link
                  </button>
                </form>

                <p className="text-sm text-gray-500 text-center mt-6">
                  Remembered it?{" "}
                  <Link
                    href="/seller/login"
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Back to sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

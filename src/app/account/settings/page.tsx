"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Globe2, Save, User } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { CURRENCY_CODES, CURRENCY_LABELS, type CurrencyCode } from "@/utils/currency";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "cn", label: "中国人" },
];

export default function AccountSettingsPage() {
  const { currency, setCurrency } = useCurrency();
  const [profile, setProfile] = useState({
    name: "Steven",
    email: "steven@example.com",
    phone: "+1 555 000 1234",
  });
  const [language, setLanguage] = useState("en");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition bg-white";

  return (
    <div className="bg-gray-50 min-h-[60vh] py-8">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-xs text-gray-500 mb-5">
          <Link href="/" className="hover:text-emerald-600">Home</Link> /{" "}
          <Link href="/account" className="hover:text-emerald-600">My Account</Link> /{" "}
          <span className="text-gray-700">Settings</span>
        </p>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Account Settings</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              <User size={16} className="text-emerald-600" /> Profile
            </h2>
            <p className="text-xs text-gray-500 mb-5">
              How we address you and reach you about orders.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Display name
                </label>
                <input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              <Globe2 size={16} className="text-emerald-600" /> Preferences
            </h2>
            <p className="text-xs text-gray-500 mb-5">
              Currency and language apply across the whole store.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Currency
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className={inputClass}
                >
                  {CURRENCY_CODES.map((code) => (
                    <option key={code} value={code}>
                      {CURRENCY_LABELS[code]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={inputClass}
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              <Save size={15} /> Save changes
            </button>
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                <CheckCircle2 size={15} /> Settings saved
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

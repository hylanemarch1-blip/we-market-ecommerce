"use client";

import { useState } from "react";

type Region =
  | "India"
  | "Asia"
  | "Europe"
  | "NorthAmerica"
  | "MiddleEast"
  | "Africa"
  | "SouthAmerica"
  | "Oceania";

type CountryCode = "IN" | "US" | "GB" | "AE" | "DE" | "FR" | "CA" | "AU";

export default function MarketConfiguration() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [b2b, setB2B] = useState(false);
  const [b2c, setB2C] = useState(false);
  const [moq, setMOQ] = useState(100);
  const [countries, setCountries] = useState<CountryCode[]>([]);

  const regionsOptions: Region[] = [
    "India",
    "Asia",
    "Europe",
    "NorthAmerica",
    "MiddleEast",
    "Africa",
    "SouthAmerica",
    "Oceania",
  ];

  const handleRegionChange = (value: Region) => {
    setRegions(prev => {
      if (prev.includes(value)) return prev.filter(v => v !== value);
      return [...prev, value];
    });
  };

  const countriesOptions: CountryCode[] = ["IN", "US", "GB", "AE", "DE", "FR", "CA", "AU"];

  const handleCountryChange = (value: CountryCode) => {
    setCountries(prev => {
      if (prev.includes(value)) return prev.filter(c => c !== value);
      return [...prev, value];
    });
  };

  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-emerald-600 mb-6">
            Global Market Configuration
          </h1>

          {/* Regions Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {regionsOptions.map((region) => (
              <div
                key={region}
                className={`px-4 py-2 rounded-full border ${
                  regions.includes(region)
                    ? "border-emerald-600 text-emerald-600"
                    : "border-gray-300 text-gray-500"
                } hover:border-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer ${
                  regions.includes(region) ? "selected" : ""
                }`}
                onClick={() => handleRegionChange(region)}
              >
                {region}
              </div>
            ))}
          </div>

          {/* B2B/B2C Toggles */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={b2b}
                  onChange={(e) => setB2B((e.target as HTMLInputElement).checked)}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">B2B Sales Enabled</span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={b2c}
                  onChange={(e) => setB2C((e.target as HTMLInputElement).checked)}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">B2C Sales Enabled</span>
              </label>
            </div>
          </div>

          {/* MOQ Configuration */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <label className="text-sm text-gray-600">Minimum Order Quantity</label>
            <input
              type="number"
              value={moq}
              onChange={(e) => setMOQ(Number((e.target as HTMLInputElement).value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="100"
            />
          </div>

          {/* Country Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {countriesOptions.map((country) => (
              <div
                key={country}
                className={`px-3 py-1.5 text-xs rounded ${
                  countries.includes(country)
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-gray-100 text-gray-500"
                } hover:bg-emerald-50 transition-colors cursor-pointer ${
                  countries.includes(country) ? "selected" : ""
                }`}
                onClick={() => handleCountryChange(country)}
              >
                {country}
              </div>
            ))}
          </div>

          {/* RFQ Mode */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <label className="text-sm text-gray-600">RFQ Mode</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-border-transparent"
            >
              <option value="wholesale">Wholesale</option>
              <option value="rfq">RFQ (Request for Quote)</option>
              <option value="retail">Retail</option>
            </select>
          </div>

          {/* Country Exclusion */}
          <div className="mt-6">
            <label className="text-sm text-gray-600">Countries to Exclude</label>
            <textarea
              rows={3}
              placeholder="Comma-separated list of country codes to exclude"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-y"
            ></textarea>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors"
            >
              Save Market Configuration
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
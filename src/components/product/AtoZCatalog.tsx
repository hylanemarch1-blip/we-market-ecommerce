'use client';

import React, { useState, useMemo } from 'react';

interface Category {
  id: string;
  name: string;
  letter: string;
  count: number;
}

const SAMPLE_CATEGORIES: Category[] = [
  { id: '1', name: 'Apparel & Fashion', letter: 'A', count: 120 },
  { id: '2', name: 'Automotive Accessories', letter: 'A', count: 45 },
  { id: '3', name: 'Beauty & Personal Care', letter: 'B', count: 88 },
  { id: '4', name: 'Books & Stationery', letter: 'B', count: 64 },
  { id: '5', name: 'Consumer Electronics', letter: 'C', count: 210 },
  { id: '6', name: 'Home & Kitchen Essentials', letter: 'H', count: 155 },
  { id: '7', name: 'Mobile & Accessories', letter: 'M', count: 310 },
  { id: '8', name: 'Sports & Fitness Equipment', letter: 'S', count: 92 },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function AtoZCatalog() {
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');

  const filteredCategories = useMemo(() => {
    if (selectedLetter === 'ALL') return SAMPLE_CATEGORIES;
    return SAMPLE_CATEGORIES.filter((cat) => cat.letter === selectedLetter);
  }, [selectedLetter]);

  const groupedCategories = useMemo(() => {
    const groups: Record<string, Category[]> = {};
    const safeCategories = filteredCategories || [];

    safeCategories.forEach((cat) => {
      if (!groups[cat.letter]) groups[cat.letter] = [];
      groups[cat.letter].push(cat);
    });

    return groups;
  }, [filteredCategories]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">A-to-Z Category Directory</h2>

      {/* Alphabet Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-100 pb-4">
        <button
          onClick={() => setSelectedLetter('ALL')}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
            selectedLetter === 'ALL'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ALL
        </button>
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`w-7 h-7 flex items-center justify-center text-xs font-semibold rounded-md transition-colors ${
              selectedLetter === letter
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Category List */}
      <div className="space-y-6">
        {Object.keys(groupedCategories).length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">No categories found for "{selectedLetter}".</p>
        ) : (
          Object.keys(groupedCategories).sort().map((letter) => (
            <div key={letter}>
              <h3 className="text-lg font-bold text-emerald-600 border-b border-gray-100 pb-1 mb-3">{letter}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {groupedCategories[letter].map((cat) => (
                  <div
                    key={cat.id}
                    className="flex justify-between items-center p-2.5 rounded-lg border border-gray-100 hover:bg-emerald-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
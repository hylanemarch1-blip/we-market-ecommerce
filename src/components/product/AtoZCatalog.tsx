'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { products } from '@/data/products';
import { categoryMatches } from '@/lib/shop-filter';

interface Category {
  id: string;
  name: string;
  letter: string;
  count: number;
  href: string;
}

const SAMPLE_CATEGORIES: Category[] = CATEGORIES.map((category) => ({
  id: category.slug,
  name: category.label,
  letter: category.label.charAt(0).toUpperCase(),
  count: products.filter((product) =>
    categoryMatches(product.category, category.slug)
  ).length,
  href: `/shop?category=${category.slug}`,
}));

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
          <p className="text-sm text-gray-500 py-4 text-center">No categories found for &ldquo;{selectedLetter}&rdquo;.</p>
        ) : (
          Object.keys(groupedCategories).sort().map((letter) => (
            <div key={letter}>
              <h3 className="text-lg font-bold text-emerald-600 border-b border-gray-100 pb-1 mb-3">{letter}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {groupedCategories[letter].map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    className="flex justify-between items-center p-2.5 rounded-lg border border-gray-100 hover:bg-emerald-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
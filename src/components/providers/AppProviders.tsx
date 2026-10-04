"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { CompareProvider } from "@/context/CompareContext";
import CompareBar from "@/components/compare/CompareBar";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <CompareProvider>
        {children}
        <CompareBar />
      </CompareProvider>
    </CartProvider>
  );
}

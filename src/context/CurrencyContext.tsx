"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CURRENCY_RATES,
  detectBrowserCurrency,
  formatPrice,
  type CurrencyCode,
} from "@/utils/currency";

const STORAGE_KEY = "wemarket-currency";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  format: (amountInBase: number, decimals?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // Initial render matches the server (USD); detected/persisted currency is
  // applied right after hydration so markup stays consistent.
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    const timeout = setTimeout(() => {
      let initial: CurrencyCode | null = null;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && stored in CURRENCY_RATES) initial = stored as CurrencyCode;
      } catch {
        initial = null;
      }
      if (!initial) initial = detectBrowserCurrency();
      if (initial !== "USD") setCurrencyState(initial);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable — state still updates for this session
    }
  }, []);

  const format = useCallback(
    (amountInBase: number, decimals: number = 2) =>
      formatPrice(amountInBase, currency, decimals),
    [currency]
  );

  const value = useMemo(
    () => ({ currency, setCurrency, format }),
    [currency, setCurrency, format]
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

/** Hook returning a formatter bound to the active currency. */
export function useFormatPrice(): (amountInBase: number, decimals?: number) => string {
  const { format } = useCurrency();
  return format;
}

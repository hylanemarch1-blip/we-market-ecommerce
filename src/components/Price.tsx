"use client";

import { useFormatPrice } from "@/context/CurrencyContext";

interface PriceProps {
  /** Amount in base currency (USD). */
  amount: number;
  decimals?: number;
  className?: string;
}

/** Renders an amount formatted in the user's active currency. Usable in server components. */
export default function Price({ amount, decimals = 2, className }: PriceProps) {
  const format = useFormatPrice();
  return <span className={className}>{format(amount, decimals)}</span>;
}

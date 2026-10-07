export type CurrencyCode = "USD" | "INR" | "AED" | "EUR" | "GBP";

/** Exchange rates relative to 1 USD (base currency). */
export const CURRENCY_RATES: Record<CurrencyCode, number> = {
  USD: 1.0,
  INR: 83.5,
  AED: 3.67,
  EUR: 0.92,
  GBP: 0.79,
};

/** Locale used for Intl.NumberFormat per currency (drives symbol placement). */
export const CURRENCY_LOCALES: Record<CurrencyCode, string> = {
  USD: "en-US",
  INR: "en-IN",
  AED: "en-AE",
  EUR: "de-DE",
  GBP: "en-GB",
};

/** Human labels for the header currency dropdown. */
export const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  USD: "USD ($)",
  INR: "INR (₹)",
  AED: "AED (د.إ)",
  EUR: "EUR (€)",
  GBP: "GBP (£)",
};

export const CURRENCY_CODES: CurrencyCode[] = ["USD", "INR", "AED", "EUR", "GBP"];

const EU_LOCALES = new Set([
  "at", "be", "cy", "de", "ee", "es", "fi", "fr", "gr", "ie", "it",
  "lt", "lu", "lv", "mt", "nl", "pt", "sk", "si",
]);

const isCurrencyCode = (value: string | null): value is CurrencyCode =>
  !!value && value in CURRENCY_RATES;

/**
 * Browser-native currency detection.
 * Inspects navigator.language / navigator.languages first, then falls back to
 * the Intl timezone — India -> INR, UAE -> AED, UK -> GBP, Europe -> EUR, else USD.
 */
export function detectBrowserCurrency(): CurrencyCode {
  if (typeof navigator === "undefined") return "USD";

  const languages = [navigator.language, ...(navigator.languages ?? [])]
    .filter((entry): entry is string => typeof entry === "string" && entry.length > 0)
    .map((entry) => entry.toLowerCase());

  const localeCountries = languages
    .map((entry) => entry.split("-")[1])
    .filter((entry): entry is string => !!entry);

  let timeZone = "";
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    timeZone = "";
  }

  const isIndia =
    localeCountries.includes("in") ||
    timeZone === "Asia/Kolkata" ||
    timeZone === "Asia/Calcutta";
  if (isIndia) return "INR";

  const isUAE = localeCountries.includes("ae") || timeZone === "Asia/Dubai";
  if (isUAE) return "AED";

  const isUK =
    localeCountries.includes("gb") ||
    localeCountries.includes("uk") ||
    timeZone === "Europe/London";
  if (isUK) return "GBP";

  const isEurope =
    localeCountries.some((country) => EU_LOCALES.has(country)) ||
    timeZone.startsWith("Europe/");
  if (isEurope) return "EUR";

  return "USD";
}

/**
 * Global price formatter: converts a base-currency amount (catalog prices are
 * stored in USD) into the user's currency and formats it with Intl.
 *
 * formatPrice(89.99, "INR") -> "₹7,514.17"
 * formatPrice(300, "USD", 0) -> "$300"
 */
export function formatPrice(
  amountInBase: number,
  currency: CurrencyCode = "USD",
  decimals: number = 2
): string {
  const code: CurrencyCode = isCurrencyCode(currency) ? currency : "USD";
  const rate = CURRENCY_RATES[code];
  const locale = CURRENCY_LOCALES[code];
  const converted = amountInBase * rate;

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(converted);
  } catch {
    const symbol =
      code === "USD" ? "$" : code === "INR" ? "₹" : code === "GBP" ? "£" : code === "EUR" ? "€" : "AED ";
    return `${symbol}${converted.toFixed(decimals)}`;
  }
}

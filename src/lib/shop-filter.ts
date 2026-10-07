export const slugifyCategory = (value: string): string =>
  value
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const categoryMatches = (
  productCategory: string,
  selectedCategory: string
): boolean => {
  const selectedSlug = slugifyCategory(selectedCategory);
  if (!selectedSlug) return true;

  const productSlug = slugifyCategory(productCategory);
  if (!productSlug) return false;
  if (productSlug === selectedSlug) return true;

  const productTokens = productSlug.split("-");
  const selectedTokens = selectedSlug.split("-");
  return productTokens.some((token) => selectedTokens.includes(token));
};

export const filterProductsByCategory = <T extends { category: string }>(
  products: T[],
  selectedCategory: string
): T[] =>
  products.filter((product) =>
    categoryMatches(product.category, selectedCategory)
  );

export const matchesQuery = (
  haystack: string,
  query: string
): boolean => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  const queryTokens = normalizedQuery
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1);
  if (queryTokens.length === 0) {
    return haystack.toLowerCase().includes(normalizedQuery);
  }
  const haystackTokens = haystack.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

  return queryTokens.every((token) =>
    haystackTokens.some((word) => {
      if (word === token) return true;
      if (token.length === 1) return false;
      if (word.startsWith(token)) return true;
      if (token.length >= 4 && word.includes(token)) return true;
      return token.length >= 4 && word.length >= 4 && token.startsWith(word);
    })
  );
};

export const filterProductsByQuery = <
  T extends { name: string; brand: string; category: string; description?: string },
>(
  products: T[],
  query: string
): T[] => {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return products;

  return products.filter((product) =>
    matchesQuery(
      `${product.name} ${product.brand} ${product.category} ${product.description ?? ""}`,
      normalizedQuery
    )
  );
};

export const parseNumberParam = (
  value: string | null,
  fallback: number
): number => {
  if (value === null || value.trim() === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const parseListParam = (value: string | null): string[] => {
  if (!value) return [];
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
};

export const filterProductsByPrice = <T extends { price: number }>(
  products: T[],
  minPrice: number | null,
  maxPrice: number | null
): T[] =>
  products.filter((product) => {
    if (minPrice !== null && product.price < minPrice) return false;
    if (maxPrice !== null && product.price > maxPrice) return false;
    return true;
  });

export const filterProductsByBrands = <T extends { brand: string }>(
  products: T[],
  brands: string[]
): T[] =>
  brands.length === 0
    ? products
    : products.filter((product) => brands.includes(product.brand));

export const filterProductsByMinRating = <T extends { rating: number }>(
  products: T[],
  minRating: number | null
): T[] =>
  minRating === null
    ? products
    : products.filter((product) => product.rating >= minRating);

export const filterProductsInStock = <T extends { stock: number }>(
  products: T[],
  inStockOnly: boolean
): T[] => (inStockOnly ? products.filter((product) => product.stock > 0) : products);

export const BRAND_ORIGINS: Record<string, string> = {
  AquaSpin: "China",
  AutoTrim: "China",
  "Baker's Lane": "India",
  BrickFun: "Denmark",
  CarryCo: "India",
  CaseCraft: "China",
  ChefMate: "India",
  Chrono: "China",
  CloudRest: "India",
  CoreLine: "China",
  CrunchCo: "India",
  CuddleBuds: "China",
  DairyPure: "India",
  "Dadi's Kitchen": "India",
  "Desi Bazaar": "India",
  DustAway: "China",
  ErgoForm: "China",
  FlexFit: "India",
  FreshMart: "India",
  "FrostBite Foods": "India",
  GlowLab: "France",
  HarvestRoot: "India",
  HeatWave: "China",
  IronFlex: "India",
  LittlePage: "India",
  Lumira: "China",
  "Maison Aura": "France",
  MasalaCraft: "India",
  NestWorth: "India",
  NovaTech: "China",
  OptiShade: "China",
  PageHouse: "India",
  PureHome: "India",
  "Anand Oils": "India",
  RoadEye: "China",
  SonicWave: "China",
  StrideOn: "China",
  SunSqueeze: "India",
  TastyKitchen: "India",
  TidyNest: "China",
  TrailForge: "Vietnam",
  UrbanWeave: "India",
  VisionMax: "China",
  WoodCraft: "India",
  ZenFlow: "India",
};

const normalizeOrigin = (value: string): string => {
  const trimmed = value.trim();
  if (/^made in /i.test(trimmed)) return trimmed.replace(/^made in /i, "").trim();
  const parts = trimmed.split(",");
  return (parts[parts.length - 1] ?? trimmed).trim();
};

export const getProductOrigin = (
  product: { brand: string; specifications?: Record<string, string> }
): string => {
  const mapped = BRAND_ORIGINS[product.brand];
  if (mapped) return mapped;
  const spec = product.specifications?.["Origin"] ?? product.specifications?.["origin"];
  if (spec) return normalizeOrigin(spec);
  return "Other";
};

export const filterProductsByOrigin = <
  T extends { brand: string; specifications?: Record<string, string> },
>(
  products: T[],
  origins: string[]
): T[] =>
  origins.length === 0
    ? products
    : products.filter((product) => origins.includes(getProductOrigin(product)));

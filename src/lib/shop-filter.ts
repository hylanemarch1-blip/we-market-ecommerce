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

  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
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

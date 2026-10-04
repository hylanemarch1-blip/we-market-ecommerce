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

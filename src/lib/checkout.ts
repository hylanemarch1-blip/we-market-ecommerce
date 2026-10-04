export const FREE_SHIPPING_THRESHOLD = 75;
export const SHIPPING_FEE = 7.99;

export function calculateShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

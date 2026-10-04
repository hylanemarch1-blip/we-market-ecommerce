"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  quantity: number;
  stock: number;
}

const CART_STORAGE_KEY = "wemarket_cart";

let cartItems: CartItem[] = [];
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

function readStoredItems(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

function persist(next: CartItem[]): void {
  cartItems = next;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
  } catch {
    return;
  }
}

function commit(next: CartItem[]): void {
  persist(next);
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY || event.key === null) {
      cartItems = readStoredItems();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = (): CartItem[] => cartItems;
const getServerSnapshot = (): CartItem[] => cartItems;

function hydrateFromStorage(): void {
  cartItems = readStoredItems();
  emit();
}

function addItem(product: Product, quantity = 1): void {
  if (product.stock <= 0) return;
  const existing = cartItems.find((item) => item.productId === product.id);
  if (existing) {
    commit(
      cartItems.map((item) =>
        item.productId === product.id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + Math.max(1, quantity),
                product.stock
              ),
            }
          : item
      )
    );
    return;
  }
  commit([
    ...cartItems,
    {
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      category: product.category,
      quantity: Math.min(Math.max(1, quantity), product.stock),
      stock: product.stock,
    },
  ]);
}

function removeItem(productId: string): void {
  commit(cartItems.filter((item) => item.productId !== productId));
}

function updateQuantity(productId: string, quantity: number): void {
  if (quantity <= 0) {
    removeItem(productId);
    return;
  }
  commit(
    cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.min(quantity, item.stock) }
        : item
    )
  );
}

function clearCart(): void {
  commit([]);
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    hydrateFromStorage();
  }, []);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, count, subtotal, addItem, removeItem, updateQuantity, clearCart }),
    [items, count, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

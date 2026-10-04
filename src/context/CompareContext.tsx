"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export const MIN_COMPARE = 2;
export const MAX_COMPARE = 4;

interface CompareContextValue {
  items: Product[];
  isModalOpen: boolean;
  isFull: boolean;
  canCompare: boolean;
  toggleCompare: (product: Product) => void;
  removeCompare: (productId: string) => void;
  clearCompare: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCompare = useCallback((product: Product) => {
    setItems((current) => {
      const included = current.some((item) => item.id === product.id);
      if (included) {
        return current.filter((item) => item.id !== product.id);
      }
      if (current.length >= MAX_COMPARE) return current;
      return [...current, product];
    });
  }, []);

  const removeCompare = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  }, []);

  const clearCompare = useCallback(() => {
    setItems([]);
    setIsModalOpen(false);
  }, []);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const isFull = items.length >= MAX_COMPARE;
  const canCompare = items.length >= MIN_COMPARE;

  const value = useMemo(
    () => ({
      items,
      isModalOpen,
      isFull,
      canCompare,
      toggleCompare,
      removeCompare,
      clearCompare,
      openModal,
      closeModal,
    }),
    [
      items,
      isModalOpen,
      isFull,
      canCompare,
      toggleCompare,
      removeCompare,
      clearCompare,
      openModal,
      closeModal,
    ]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}

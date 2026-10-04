export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  createdAt: string;
}

export type OrdersSnapshot = Order[] | null;

export const ORDERS_STORAGE_KEY = "wemarket_orders";

let ordersCache: OrdersSnapshot = null;
const orderListeners = new Set<() => void>();

function emitOrders(): void {
  orderListeners.forEach((listener) => listener());
}

function readStoredOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

export function loadOrders(): Order[] {
  return readStoredOrders();
}

export function subscribeOrders(listener: () => void): () => void {
  orderListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === ORDERS_STORAGE_KEY || event.key === null) {
      ordersCache = readStoredOrders();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    orderListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getOrdersSnapshot(): OrdersSnapshot {
  if (ordersCache === null && typeof window !== "undefined") {
    ordersCache = readStoredOrders();
  }
  return ordersCache;
}

export function getServerOrdersSnapshot(): OrdersSnapshot {
  return ordersCache;
}

export function initOrders(): void {
  if (typeof window === "undefined") return;
  if (ordersCache === null) {
    ordersCache = readStoredOrders();
  }
  emitOrders();
}

export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;
  try {
    const existing = ordersCache ?? readStoredOrders();
    const next = [order, ...existing];
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(next));
    ordersCache = next;
    emitOrders();
  } catch {
    return;
  }
}

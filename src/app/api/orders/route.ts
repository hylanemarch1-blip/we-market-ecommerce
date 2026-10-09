import { NextResponse } from "next/server";
import { getProductById } from "@/data/products";
import { calculateShipping } from "@/lib/checkout";
import type { Order, OrderItem, PaymentMethod, ShippingAddress } from "@/lib/orders";

interface CreateOrderPayload {
  items?: unknown;
  shippingAddress?: unknown;
  paymentMethod?: unknown;
}

const PAYMENT_METHODS: PaymentMethod[] = ["CARD", "STRIPE", "RAZORPAY", "ONLINE", "COD"];

function readAddress(raw: unknown): Record<string, string> {
  const source =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const pick = (key: string): string =>
    typeof source[key] === "string" ? (source[key] as string).trim() : "";
  return {
    fullName: pick("fullName"),
    street: pick("street"),
    city: pick("city"),
    state: pick("state"),
    postalCode: pick("postalCode"),
    phone: pick("phone"),
    country: pick("country"),
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as CreateOrderPayload | null;
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const errors: string[] = [];
    const address = readAddress(body.shippingAddress);

    if (!address.fullName) errors.push("Full name is required");
    if (!address.street) errors.push("Street address is required");
    if (!address.city) errors.push("City is required");
    if (!address.state) errors.push("State is required");
    if (!address.postalCode) errors.push("Postal code is required");
    if (!address.phone) errors.push("Phone number is required");
    else if (!/^[\d\s()+-]{7,20}$/.test(address.phone)) {
      errors.push("Phone number is invalid");
    }

    const rawItems = Array.isArray(body.items) ? body.items : [];
    if (rawItems.length === 0) {
      errors.push("Order must include at least one item");
    }

    const items: OrderItem[] = [];
    for (const raw of rawItems) {
      const source = (raw ?? {}) as Record<string, unknown>;
      const productId =
        typeof source.productId === "string" ? source.productId : "";
      const quantity =
        typeof source.quantity === "number" ? Math.floor(source.quantity) : 0;

      if (!productId) {
        errors.push("Each item must include a productId");
        continue;
      }
      if (quantity < 1 || quantity > 100) {
        errors.push(`Invalid quantity for product ${productId}`);
        continue;
      }

      const product = getProductById(productId);
      if (!product) {
        errors.push(`Unknown product: ${productId}`);
        continue;
      }
      if (product.stock > 0 && quantity > product.stock) {
        errors.push(`Only ${product.stock} unit(s) of ${product.name} are in stock`);
        continue;
      }

      items.push({
        productId: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        quantity,
      });
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const shippingAddress: ShippingAddress = {
      fullName: address.fullName,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      phone: address.phone,
      country: address.country || "India",
    };

    const rawMethod = body.paymentMethod;
    let paymentMethod: PaymentMethod = "CARD";
    if (typeof rawMethod === "string" && rawMethod) {
      if (!PAYMENT_METHODS.includes(rawMethod as PaymentMethod)) {
        return NextResponse.json(
          { error: "Invalid payment method" },
          { status: 400 }
        );
      }
      paymentMethod = rawMethod as PaymentMethod;
    }

    // Cash on Delivery is domestic-only: block for non-India addresses or
    // international (imported) items.
    if (paymentMethod === "COD") {
      const hasInternationalItem = items.some(
        (item) => getProductById(item.productId)?.isInternational === true
      );
      if (shippingAddress.country !== "India" || hasInternationalItem) {
        return NextResponse.json(
          {
            error:
              "COD is not available for international orders or overseas shipping. Please choose a prepaid payment method.",
          },
          { status: 400 }
        );
      }
    }

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = calculateShipping(subtotal);
    const total = subtotal + shipping;
    const now = new Date();

    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: `WM-${now.getTime().toString(36).toUpperCase()}`,
      status: "PENDING",
      items,
      shippingAddress,
      paymentMethod,
      subtotal: Number(subtotal.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      total: Number(total.toFixed(2)),
      currency: "USD",
      createdAt: now.toISOString(),
    };

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("[orders] failed to create order", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

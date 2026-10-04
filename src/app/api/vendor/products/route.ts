import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Store } from "@prisma/client";

interface ProductBody {
  name?: string;
  description?: string;
  price?: number | string;
  compareAtPrice?: number | string;
  stock?: number;
  images?: string[];
  category?: string;
  status?: string;
}

const EMAIL_LIKE_SLUG = /[^a-z0-9]+/g;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(EMAIL_LIKE_SLUG, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function toDecimal(value: number | string | undefined): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

async function requireVendorStore(): Promise<
  | { store: Store; userId: string }
  | { response: NextResponse }
> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      response: NextResponse.json({ error: "Authentication required" }, { status: 401 }),
    };
  }

  if (session?.user?.role !== "VENDOR" && session?.user?.role !== "ADMIN") {
    return {
      response: NextResponse.json({ error: "Vendor access required" }, { status: 403 }),
    };
  }

  const store = await prisma.store.findUnique({ where: { ownerId: userId } });
  if (!store) {
    return {
      response: NextResponse.json({ error: "No store found for this vendor" }, { status: 404 }),
    };
  }

  return { store, userId };
}

async function uniqueProductSlug(store: Store, name: string): Promise<string> {
  const root = `${slugify(store.slug)}-${slugify(name)}` || "product";
  let slug = root;
  let suffix = 1;

  while (await prisma.product.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${root}-${suffix++}`;
  }

  return slug;
}

export async function GET(request: Request) {
  try {
    const access = await requireVendorStore();
    if ("response" in access) return access.response;

    const { store } = access;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();
    const status = searchParams.get("status")?.trim();
    const page = Math.max(Number(searchParams.get("page") ?? 1) || 1, 1);
    const limit = Math.min(Math.max(Number(searchParams.get("limit") ?? 20) || 20, 1), 100);

    const where = {
      storeId: store.id,
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { category: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, page, limit });
  } catch (error) {
    console.error("[vendor/products] failed to list products", error);
    return NextResponse.json({ error: "Unable to load products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const access = await requireVendorStore();
    if ("response" in access) return access.response;

    const { store } = access;

    let body: ProductBody;
    try {
      body = (await request.json()) as ProductBody;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const errors: string[] = [];
    const name = body.name?.trim();
    const price = toDecimal(body.price);
    const compareAtPrice = toDecimal(body.compareAtPrice);
    const stock = body.stock === undefined ? 0 : Number(body.stock);

    if (!name) errors.push("name is required");
    if (price === undefined || price < 0) errors.push("price must be a positive number");
    if (compareAtPrice !== undefined && compareAtPrice < 0) {
      errors.push("compareAtPrice must be a positive number");
    }
    if (!Number.isInteger(stock) || stock < 0) errors.push("stock must be a non-negative integer");
    if (body.images !== undefined && !Array.isArray(body.images)) {
      errors.push("images must be an array of URLs");
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
    }

    const existing = await prisma.product.findFirst({
      where: { storeId: store.id, name: name! },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json({ error: "A product with this name already exists in your store" }, { status: 409 });
    }

    const slug = await uniqueProductSlug(store, name!);

    const product = await prisma.product.create({
      data: {
        storeId: store.id,
        name: name!,
        slug,
        description: body.description?.trim(),
        price: price!,
        compareAtPrice,
        stock,
        images: Array.isArray(body.images) ? body.images.filter((image) => typeof image === "string") : [],
        category: body.category?.trim(),
        status: body.status?.trim() || "ACTIVE",
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("[vendor/products] failed to create product", error);
    return NextResponse.json({ error: "Unable to create product right now" }, { status: 500 });
  }
}

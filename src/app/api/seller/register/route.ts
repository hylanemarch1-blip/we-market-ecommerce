import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface RegisterBody {
  fullName?: string;
  legalBusinessName?: string;
  storeName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  vendorType?: string;
  gstin?: string;
  pan?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  description?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function validate(body: RegisterBody): string[] {
  const errors: string[] = [];

  if (!body.fullName?.trim()) errors.push("fullName is required");
  if (!body.legalBusinessName?.trim()) errors.push("legalBusinessName is required");
  if (!body.email?.trim()) errors.push("email is required");
  else if (!EMAIL_REGEX.test(body.email.trim())) errors.push("email must be a valid email address");
  if (!body.phoneNumber?.trim()) errors.push("phoneNumber is required");
  if (!body.password) errors.push("password is required");
  else if (body.password.length < 8) errors.push("password must be at least 8 characters");
  if (body.confirmPassword !== undefined && body.confirmPassword !== body.password) {
    errors.push("confirmPassword does not match password");
  }
  if (!body.addressLine1?.trim()) errors.push("addressLine1 is required");
  if (!body.city?.trim()) errors.push("city is required");
  if (!body.state?.trim()) errors.push("state is required");
  if (!body.postalCode?.trim()) errors.push("postalCode is required");

  return errors;
}

async function uniqueSlug(base: string): Promise<string> {
  const root = slugify(base) || "store";
  let slug = root;
  let suffix = 1;

  while (await prisma.store.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${root}-${suffix++}`;
  }

  return slug;
}

export async function POST(request: Request) {
  try {
    let body: RegisterBody;
    try {
      body = (await request.json()) as RegisterBody;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const errors = validate(body);
    if (errors.length > 0) {
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
    }

    const email = body.email!.trim().toLowerCase();

    const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const storeName = (body.storeName ?? body.legalBusinessName ?? "").trim();
    const slug = await uniqueSlug(storeName);
    const password = await bcrypt.hash(body.password!, 10);

    const { user, store } = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: body.fullName!.trim(),
          email,
          password,
          phone: body.phoneNumber?.trim(),
          role: UserRole.VENDOR,
        },
      });

      const store = await tx.store.create({
        data: {
          ownerId: user.id,
          name: storeName,
          slug,
          description: body.description?.trim(),
          vendorType: body.vendorType?.trim(),
          gstin: body.gstin?.trim() || null,
          pan: body.pan?.trim() || null,
          addressLine1: body.addressLine1!.trim(),
          addressLine2: body.addressLine2?.trim(),
          city: body.city!.trim(),
          state: body.state!.trim(),
          country: body.country?.trim() || "IN",
          postalCode: body.postalCode!.trim(),
        },
      });

      return { user, store };
    });

    return NextResponse.json(
      {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        store: { id: store.id, name: store.name, slug: store.slug, status: store.status },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[seller/register] failed to register vendor", error);
    return NextResponse.json({ error: "Unable to register vendor right now" }, { status: 500 });
  }
}

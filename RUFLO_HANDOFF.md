# RUFLO HANDOFF BRIEF: WE Market E-Commerce

## 1. Executive Summary & Context
- **Target Repository:** `hylanemarch1-blip/we-market-ecommerce`
- **Current Status:** Live deployment active on Vercel (`main` branch). All core build errors (`TS1127` syntax issues in `src/lib/cj-dropshipping.ts`) are fixed, and local/Vercel CI builds pass (`npm run build`).
- **Tech Stack:** Next.js (App Router, TypeScript), Tailwind CSS, Lucide Icons, Supabase (Auth/Database), Stripe (Payments), and CJ Dropshipping API.

---

## 2. Environment Variables Required
Ensure the following variables are configured in `.env.local` and Vercel Environment Settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `CJ_DROPSHIPPING_API_KEY`

---

## 3. Core Development Rules for Ruflo
1. **Branching Workflow:** Always create feature branches for each task (e.g., `feature/cart-page`, `feature/supabase-auth`). Submit Pull Requests to `main`.
2. **Build Safety:** Every PR must compile cleanly with `npm run build` before merging.
3. **Data Integrity:** Product data structures must conform strictly to `CJProduct` defined in `@/lib/cj-dropshipping`.

---

## 4. Phased Task Roadmap & Execution Order

### Task 1: Cart System & Page (`src/app/cart/page.tsx`)
- Implement client-side cart state management (Context API or Zustand).
- Create a interactive `/cart` page with quantity modifiers, line item deletions, dynamic tax/shipping calculations, and a "Proceed to Checkout" action.

### Task 2: Supabase Authentication Integration
- Set up login/signup modals or pages using Supabase Auth UI / Client SDK.
- Support persistent user sessions, account profiles, and protected route handlers.

### Task 3: Database & Persistence Setup (Supabase SQL)
- Execute schema migrations for:
  - `user_carts` (persisting cart state across sessions)
  - `newsletter_subscribers` (capturing email signups)
- Configure Row Level Security (RLS) policies for user data isolation.

### Task 4: Secure Stripe Checkout Integration
- Implement `/api/checkout` server-side route.
- Enforce server-side price validation using Stripe API to prevent price tampering during client checkout.

### Task 5: Dynamic Product Detail Pages (`src/app/product/[id]/page.tsx`)
- Implement SSR/ISR page routes for individual CJ Dropshipping products using `pid`.
- Display image galleries, specifications, inventory checks, and direct "Add to Cart" actions.

### Task 6: Platform Footer & Information Pages
- Build responsive footer components with links to Terms of Service, Privacy Policy, Shipping/Return Policies, and Newsletter Signup.

---

## 5. Direct Instruction Prompt for Ruflo
> "Ruflo, you are tasked with executing the WE Market development roadmap defined in `RUFLO_HANDOFF.md`. Start immediately with Task 1 (Cart System & Page). Create a dedicated feature branch `feature/cart-page`, implement the complete cart state management and `/cart` UI page, ensure `npm run build` succeeds, and submit a Pull Request to `main`."
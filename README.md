# WE Market

A polished, responsive marketplace prototype for global B2B and B2C commerce. WE Market connects verified manufacturers and suppliers from China, Europe, and Asia with buyers worldwide.

## Included in this first release

- Marketplace homepage wireframe inspired by modern ecommerce storefronts
- B2B/B2C shopping mode toggle
- Product search, category filters, promotional hero, flash deals, manufacturers, and trust sections
- Buyer dashboard with orders, quotes, wishlist, and account shortcuts
- Seller portal with sales KPIs, products, orders, quotes, and store health
- Admin dashboard with marketplace KPIs, seller approvals, moderation queue, and activity feed
- Login/register modal with buyer, seller, and admin demo role switching
- Responsive CSS with no external runtime dependencies

## Run locally

Open `index.html` directly in a browser, or run a local server:

```bash
python3 -m http.server 4173
```

Then visit http://localhost:4173.

## Demo roles

Use **Sign in** and select Buyer, Seller, or Admin to preview each dashboard. This is a frontend prototype; payment processing, persistence, KYC, and production authentication should be connected to a backend before launch.

## Product roadmap

1. Connect authentication and role-based access to an API.
2. Add PostgreSQL models for users, vendors, products, carts, orders, quotes, payouts, and reviews.
3. Integrate payment, tax, shipping, search, notifications, and seller verification providers.
4. Add automated tests, accessibility audit, security controls, and production deployment.

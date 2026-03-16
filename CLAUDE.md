# FlowHealth — Claude Code Guide

## Product Vision

**Flow Health** is a single-product supplement brand website. Every design and development decision should serve one goal: converting a visitor into a confident buyer with zero friction.

### Core Principles
- **Single product focus** — one hero product, no distractions. The entire site exists to sell it.
- **Supplement industry context** — trust, ingredients, science, and safety matter. Educational content is a core part of the experience, not an afterthought.
- **Mobile-first** — the majority of traffic is mobile. All layouts, interactions, and performance decisions must prioritize small screens.
- **Frictionless experience** — minimize clicks, eliminate confusion, reduce load time. The path from landing to checkout must be as short and clear as possible.

### What This Means in Practice
- Hero section should immediately communicate the product's core benefit
- Ingredient breakdowns, sourcing info, and usage instructions are content pillars
- CTA ("Buy Now" / "Add to Cart") must be visible at all times on mobile (sticky bar or floating button)
- Avoid multi-step flows — prefer inline actions, no unnecessary page transitions
- Social proof (reviews, testimonials) should be integrated naturally, not bolted on
- Performance: optimize images, minimize JS, target fast LCP on mobile

## Project Overview

**Flow Health** is a headless e-commerce storefront built on Shopify. It uses Shopify as the backend (inventory, payments, checkout) and Next.js as the frontend.

- **Shopify store:** `flow-health-2.myshopify.com`
- **Shopify API version:** `2025-04`

## Tech Stack

- **Next.js 16** with App Router (server components by default)
- **React 19**
- **TypeScript 5** (strict mode)
- **Tailwind CSS v4**
- **@shopify/storefront-api-client** for Storefront GraphQL API

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                        # Root layout — header + Geist font
│   ├── page.tsx                          # Homepage — product grid
│   ├── globals.css                       # Tailwind v4 import + CSS variables
│   ├── api/checkout/route.ts             # POST /api/checkout — creates cart, returns Shopify checkout URL
│   └── products/[handle]/
│       ├── page.tsx                      # Product detail page (SSR)
│       └── AddToCartButton.tsx           # 'use client' — triggers checkout
└── lib/
    └── shopify.ts                        # Shopify client, types, and all GraphQL queries
```

## Environment Variables

```
SHOPIFY_STORE_DOMAIN=flow-health-2.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=<public storefront token>
```

Set in `.env.local` (not committed).

## Key Patterns

### Data Fetching
- All data fetching is **server-side** using async components.
- Shopify data is fetched in page components directly — no SWR or React Query.
- All Shopify queries and mutations live in `src/lib/shopify.ts`.

### Client Components
- Only use `'use client'` when absolutely necessary (user interaction, hooks).
- Currently only `AddToCartButton.tsx` is a client component.

### Checkout Flow
1. User clicks "Buy Now" → `AddToCartButton` calls `POST /api/checkout`
2. API route calls `createCheckout(variantId, quantity)` from `lib/shopify.ts`
3. Shopify `cartCreate` mutation returns a `checkoutUrl`
4. User is redirected to Shopify-hosted checkout

### Shopify GraphQL Functions (lib/shopify.ts)
| Function | Description |
|----------|-------------|
| `getProducts()` | Fetches first 20 products with 1 image each |
| `getProduct(handle)` | Fetches a single product with up to 5 images and 10 variants |
| `createCheckout(variantId, quantity)` | Creates a cart and returns the Shopify checkout URL |

### Routing
- `/` → product listing
- `/products/[handle]` → product detail (uses `notFound()` for missing handles)
- `/api/checkout` → checkout POST endpoint

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

## Conventions

- Use the `@/` path alias for all imports (maps to `src/`)
- Images from `cdn.shopify.com` are whitelisted in `next.config.ts`
- Prices are formatted with `parseFloat(amount).toFixed(2)` inline
- No custom font beyond Geist (loaded via `next/font/google`)

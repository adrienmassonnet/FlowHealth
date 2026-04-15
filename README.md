# Flow Health — Storefront

Headless e-commerce storefront for [flow-health.ch](https://www.flow-health.ch). Shopify handles inventory and checkout; Next.js handles everything visible.

## Tech Stack

- **Next.js 16** App Router (server components by default)
- **React 19** / **TypeScript 5** (strict)
- **Tailwind CSS v4**
- **Shopify Storefront API** (`flow-health-2.myshopify.com`, API version `2025-04`)
- **Google Sheets** as live content backend (60s ISR)
- **Microsoft Clarity** for behaviour analytics (project `w3zpn726v1`)

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
```

## Environment Variables

```
SHOPIFY_STORE_DOMAIN=flow-health-2.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=<public storefront token>
GOOGLE_SHEETS_ID=<sheet ID>
GOOGLE_SERVICE_ACCOUNT_EMAIL=<service account email>
GOOGLE_PRIVATE_KEY=<private key>
```

Set in `.env.local` (not committed).

## Content Architecture

```
Google Sheets tab → src/lib/sheets.ts → src/lib/content.ts → page/component
                                               ↓ (fallback)
                                    src/lib/content-data.ts
```

All content has a static fallback in `content-data.ts`. The site works without any Sheets connection.

### Sheets → Code mapping

| Google Sheets tab | `sheets.ts` function | `content.ts` export |
|---|---|---|
| `Ingredients` | `getSheetsIngredients()` | `getIngredients()` |
| `health_benefits` | `getSheetsHealthBenefits()` | `getHealthBenefits()` |
| `Results Timeline` | `getSheetsResultsTimeline()` | `getResultsTimelineSteps()` |
| `Comparison table` | `getSheetsComparisonRows()` | `getComparisonRows()` |
| `Savings breakdown` | `getSheetsSavingsSupplements()` | `getSavingsSupplements()` |
| `Meta` | `getSheetsProductMeta()` | `getProductMeta()` |

## Key Patterns

- **Data fetching**: server-side in async page components — no SWR or React Query
- **Client components**: `'use client'` only when required (hooks, event handlers)
- **Analytics**: wrap `<Link>` with `<TrackedLink clarityEvent="..." />` in server components; call `trackEvent()` directly in client components
- **Product meta** (price, ingredient count, etc.): always fetch via `getProductMeta()` — never hardcode or import from `PRODUCT_META`
- **Checkout**: `AddToCartButton` → `POST /api/checkout` → Shopify `cartCreate` → redirect to Shopify checkout

## Project Docs

- [CLAUDE.md](CLAUDE.md) — full dev guide, conventions, and rules
- [CONTENT_MAP.md](CONTENT_MAP.md) — all user-facing copy with source labels
- [PRODUCT_DATA.md](PRODUCT_DATA.md) — master product data (ingredients, benefits, pricing)

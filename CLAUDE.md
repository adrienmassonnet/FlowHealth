# FlowHealth — Claude Code Guide

## Product Vision

Single-product supplement brand. Every decision must serve one goal: convert a visitor into a confident buyer with zero friction.

- **Single product focus** — the entire site exists to sell one product
- **Mobile-first** — prioritize small screens for all layouts, interactions, performance
- **Frictionless** — minimize clicks, shorten path to checkout, prefer inline actions
- **Trust-driven** — ingredients, science, sourcing are content pillars, not afterthoughts
- CTA ("Buy Now" / "Add to Cart") must always be visible on mobile (sticky/floating)
- Performance: optimize images, minimize JS, target fast LCP on mobile

---

## Brand Identity

**Core idea: Presence, not Promise.** Flow sells readiness ("you are already capable — this removes what's in the way"), not aspiration. No future-tense promises. Present-tense reality.

### Design Pillars

| Pillar | Directive |
|---|---|
| **The Now** | Grounded, not futuristic. Organic textures, natural light, warm neutrals. No sci-fi, neon, or high-contrast tech UI. |
| **Subtle Transcendent** | Soft halos, barely-there gradients, motion that breathes. No crystals, Om symbols, or New Age language. |
| **Humble Confidence** | Self-assured, never loud. Generous whitespace. No superlatives. Let ingredients speak; let design whisper. |
| **Calm in Motion** | Blur transitions, subtle parallax, slow easing (600–900ms ease-out). No bounces, no aggressive hovers. |
| **Premium but Reachable** | Arc'teryx/Aesop, not Rolex/Supreme. No gold, marble, or exclusivity signals. |

### Colour
- **Primary:** `#1E1854` (deep indigo-navy) — use everywhere you'd use black
- **Dominant surfaces:** warm off-whites, soft greens, stone, mist
- **Avoid:** cold blues, neon, bright primaries, heavy black-and-white contrast
- Gradients: atmospheric (sky, fog, water), never decorative

### Typography
- Weight contrast over size contrast (semibold heading + regular body)
- Display text tracking: `−0.02em` to `−0.03em`
- Body line-height: `1.6–1.75`
- No all-caps; use small-caps/tracked uppercase only for quiet labels

### Motion
- Easing: `cubic-bezier(0.25, 0.1, 0.1, 1)` — long deceleration
- Entrance: 500–900ms | Micro-interactions: 200–300ms
- Use `backdrop-filter: blur()` as a depth signal
- Avoid: bounces, spring animations, instant state changes

### Avoid
- Generic Shopify theme look
- Aggressive social proof ("10,000 customers!")
- Clinical/pharmaceutical aesthetics
- Dark mode as a style statement (use darkness purposefully)
- Complexity for its own sake

---

## Tech Stack & Project

- **Shopify backend:** `flow-health-2.myshopify.com` (API `2025-04`)
- **Next.js 16** App Router, server components by default
- **React 19 / TypeScript 5** (strict) / **Tailwind CSS v4**
- **@shopify/storefront-api-client** for GraphQL

### Key Patterns
- All data fetching is server-side in page components — no SWR/React Query
- Only use `'use client'` when absolutely necessary (interaction/hooks)
- All Shopify queries/mutations live in `src/lib/shopify.ts`
- Shopify GraphQL functions: `getProducts()`, `getProduct(handle)`, `createCheckout(variantId, qty)`
- Routes: `/` listing · `/products/[handle]` detail · `/api/checkout` POST

### Checkout Flow
1. "Buy Now" → `AddToCartButton` → `POST /api/checkout`
2. `createCheckout()` calls Shopify `cartCreate` mutation → returns `checkoutUrl`
3. User redirected to Shopify-hosted checkout

### Conventions
- `@/` path alias for all imports
- `cdn.shopify.com` images whitelisted in `next.config.ts`
- Prices: `parseFloat(amount).toFixed(2)`
- Font: Geist only (via `next/font/google`)

### Commands
```bash
npm run dev    # localhost:3000
npm run build
npm run lint
```

---

## Content & Copy

**Rule: All content must have a hardcoded fallback in `src/lib/content-data.ts`. Never hardcode content directly in `.tsx` files.**

Content layer priority: **Google Sheets → `content-data.ts` fallback**. The routing lives in `src/lib/content.ts`.

### What lives in `content-data.ts`

| Export | Covers |
|---|---|
| `homepageContent` | Hero tagline, headings, section labels, background images |
| `healthBenefits` | Benefit cards (number, label, title, description, image) |
| `resultsTimelineSteps` | Timeline steps (period, title, bullets) |
| `testimonials` | Quotes and author info |
| `ingredients` | Ingredient cards (name, dose, form, category, description, image) |
| `productHighlights` | Stat cards (value, unit, description) |
| `comparisonRows` | Comparison table rows |
| `savingsSupplements` | Savings breakdown supplements and prices |
| `philosophyPrinciples` / `philosophyBeliefs` | Philosophy section |
| `teamMembers` / `companyValues` / `milestones` | Who we are page |
| `faqItems` | FAQ questions and answers |
| `blogPosts` | Blog content |
| `homepageFeatureCards` | Homepage feature cards |
| `takeFlowSteps` | 3 usage step cards (how to consume Flow) |
| `morningRitualCards` | 8 philosophy/values cards (homepage rotating card) |
| `servicePillars` | 3 service info cards on product page (dispatch, delivery, returns) |
| `faqCategories` | FAQ category keys and labels (shared across FAQ + product page) |

---

## Google Sheets Integration

Live content backend. Changes appear within 60s (ISR revalidation). Sheets → `sheets.ts` → `content.ts` (Sheets first, falls back to `content-data.ts`).

### Sheets → Code mapping

| Sheets tab | `sheets.ts` function | `content.ts` export |
|---|---|---|
| `Ingredients` | `getSheetsIngredients()` | `getIngredients()` |
| `health_benefits` | `getSheetsHealthBenefits()` | `getHealthBenefits()` |
| `Results Timeline` | `getSheetsResultsTimeline()` | `getResultsTimelineSteps()` |
| `Comparison table` | `getSheetsComparisonRows()` | `getComparisonRows()` |
| `Savings breakdown` | `getSheetsSavingsSupplements()` | `getSavingsSupplements()` |
| `Meta` | `getSheetsProductMeta()` | `getProductMeta()` |

### Product Meta fields (Meta tab)

| Sheets field | Controls | Default |
|---|---|---|
| `price_single_CHF` | Product price everywhere | 58.50 |
| `active_ingredients` | Ingredient count labels | 13 |
| `calories_kcal` | Calorie display | 24 |
| `total_formula_weight_g` | Formula weight display | 6.36 |
| `servings_per_box` | Sachet count in savings breakdown | 30 |

**Rule: Always use `getProductMeta()` for product numbers — never hardcode or import from `PRODUCT_META`.**

```ts
// Server component
const meta = await getProductMeta();

// Client component — fetch in parent, pass as props
const meta = await getProductMeta();
return <MyClient activeIngredients={meta.activeIngredients} />;
```

Dynamic placeholders in Sheets text: `{active_ingredients}` is interpolated server-side by `ComparisonTable.tsx`.

### Adding a new Sheets-backed section
1. Add tab in Google Sheets with column headers
2. Add `getSheetsXxx()` in `src/lib/sheets.ts`
3. Add `getXxx()` routing function in `src/lib/content.ts` with static fallback
4. Add static fallback in `src/lib/content-data.ts`
5. Call `getXxx()` in the page server component

---

## Analytics (Microsoft Clarity)

Project ID: `w3zpn726v1`

**Rule: Every new button or CTA must fire a Clarity event.**

```ts
import { trackEvent } from '@/lib/clarity';
trackEvent('event_name'); // {page}_{element} — lowercase, underscores
```

Examples: `homepage_hero_shop_flow`, `product_page_buy_now`, `header_get_flow_desktop`

- **Client components:** call `trackEvent()` in `onClick`
- **Server components:** use `<TrackedLink clarityEvent="..." />` from `src/app/components/TrackedLink.tsx`

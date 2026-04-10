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

---

## Brand Identity & Design Philosophy

This section defines the emotional and aesthetic language of Flow. Every visual decision — layout, motion, colour, type, copy — should be tested against these principles before being built.

### The Core Idea: Presence, Not Promise

Flow is not about a future version of you. It is about this moment — sharpened. The site should feel like stepping into a state of focus, not a sales funnel. Where most supplement brands sell aspiration ("become who you want to be"), Flow sells **readiness** ("you are already capable — this removes what's in the way").

This distinction must run through every headline, every transition, every piece of imagery. No future-tense promises. Present-tense reality.

### The Five Design Pillars

**1. The Now**
Design choices should feel immediate and grounded, not futuristic. Avoid sci-fi aesthetics, neon, high-contrast tech UI, or anything that signals "tomorrow". Prefer organic textures, natural light, warm neutrals, and materials that feel touchable. The product exists in the real world, in a real morning, at a real desk.

**2. The Subtle Transcendent**
There is something quietly extraordinary about a state of deep focus — a stillness that borders on the spiritual. This should surface as a *note*, not a theme. Concretely: soft halos of light, barely-there gradients that suggest depth rather than surface, motion that breathes rather than bounces, occasional use of circular or radial forms (without being overtly symbolic). Never crystals, never Om symbols, never New Age language — but a sense that something significant is quietly happening.

**3. Humble Confidence**
The brand is self-assured but never loud. Think of a skilled craftsperson who does not need to explain their work. Typography should be refined but not show-offy. Whitespace is used generously — silence is not emptiness, it is room to breathe. Avoid superlatives in copy. Let the ingredients speak; let the design whisper.

**4. Calm in Motion**
Movement on the site should feel like a slow exhale, not a performance. Use motion to signal *life*, not to impress. Specific patterns to use:
- **Blur transitions**: elements softly coming into focus as they enter the viewport (not a hard fade-in)
- **Subtle parallax**: backgrounds moving at a slightly different rate to foreground text, creating gentle depth
- **Slow, long easing curves**: transitions should decelerate gracefully (ease-out, long duration ~600–900ms) rather than snap
- **No aggressive hover effects**: scale and opacity changes should be small and slow
The visual metaphor is depth of field on a camera — the subject is sharp, the world around it softly blurs.

**5. Premium but Reachable**
The target person is a driven, self-aware individual who takes their performance seriously — but they are not the C-suite elite. They run, they read, they meditate, they cook. They value quality but are suspicious of status signalling. The design should feel like Arc'teryx or Aesop, not Rolex or Supreme: functional premium, not decorative luxury. No gold, no marble textures, no aggressive exclusivity signals. Instead: exceptional material quality, considered layout, nothing wasted.

### Colour Direction

The palette should evoke natural light and organic calm, not clinical whiteness or futuristic darkness.
- **Primary brand colour**: `#1E1854` — a deep indigo-navy. This is the main colour for all text, buttons, dark containers, icons, and interactive elements. Use it wherever you would use black.
- **Dominant**: warm off-whites, soft greens, stone, mist — surfaces that feel like morning light
- **Avoid**: cold blues, bright primaries, neon, heavy black-and-white contrast as a style statement
- Gradients should feel atmospheric — sky, fog, water — never decorative

### Typography Direction

- Typefaces should feel **considered but not designed** — the text should serve the idea, not advertise the font choice
- Use weight contrast (semibold heading + regular body) rather than size contrast alone
- Tracking (letter-spacing) should be tight on display text (−0.02em to −0.03em) — it signals confidence and density
- Body text should be generous in line-height (1.6–1.75) — it signals calm and care
- Avoid all-caps shouting; use small-caps or tracked uppercase only for quiet labels and eyebrows

### Motion & Interaction Reference

When implementing animations, the emotional target is: **slow breath, not heartbeat**.
- Easing: `cubic-bezier(0.25, 0.1, 0.1, 1)` or similar long decelerations
- Duration: 500–900ms for entrance animations, 200–300ms for micro-interactions
- Blur: `backdrop-filter: blur()` and CSS filter blur are encouraged as depth signals
- Avoid: bounces, spring animations with high stiffness, instant state changes

### What to Avoid

- Anything that looks like a standard Shopify theme or generic D2C brand
- Aggressive social proof ("10,000 customers!") — trust is built through transparency, not volume
- Overly clinical or pharmaceutical aesthetics — this is a lifestyle product, not a medicine
- Dark mode as a style statement — darkness should be used purposefully (hero moments, contrast), not as a brand identity
- Complexity for its own sake — every element must earn its place

---

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

## Content & Copy Changes

**Rule: All copy and text changes must be made in Contentful, not in the codebase.**

When asked to change any text, heading, body copy, or label:
1. Identify which Contentful content type and field holds that text
2. Instruct the user to update it in Contentful (or use the Contentful Management API to do it programmatically)
3. Never hardcode the new text directly in a `.tsx` file if it belongs in Contentful

### Change history / audit trail
Contentful has **built-in version history** on every entry. In Contentful → open any entry → click the clock icon (top right) to see all previous versions with timestamps. No extra setup needed.

### What is already in Contentful
| Content type | What it covers |
|---|---|
| `homepageContent` | Hero tagline, headings, section labels, background images |
| `healthBenefit` | All benefit cards (number, label, title, description, image) |
| `resultsTimelineStep` | Timeline steps (period, title, bullets) |
| `testimonial` | All testimonial quotes and author info |
| `ingredient` | All ingredient cards (name, dose, form, category, description, image) |
| `productHighlight` | Product stat cards (value, unit, description) |
| `comparisonRow` | Comparison table rows |
| `savingsSupplement` | Savings breakdown supplements and prices |
| `philosophyPrinciple` | Philosophy numbered principles |
| `philosophyBelief` | Philosophy belief statements |
| `teamMember` | Team bios, roles, images |
| `companyValue` | Company values |
| `milestone` | Company timeline milestones |
| `faqItem` | All FAQ questions and answers |
| `blogPost` | All blog post content (title, body rich text, cover image) |
| `homepageFeatureCard` | Homepage feature cards (title, body, image) |

### What is still hardcoded (needs Contentful migration)
These areas still have copy in `.tsx` files. When changes are requested to these, flag it and create the appropriate Contentful content type first:
- **`MainBenefits.tsx`** — ~~migrated to Contentful~~ now reads from `healthBenefit` content type
- **`TakeFlowSteps.tsx`** — 3 usage step cards + section heading/body
- **`pages/our-product/page.tsx`** — Hero copy, "The Formula" section, "Our Promise" bullets, CTA copy
- **`pages/who-we-are/page.tsx`** — Origin story paragraphs, section headings
- **`products/[handle]/page.tsx`** — Service pillars (dispatch/delivery/returns), FAQ category labels
- **`page.tsx` (homepage)** — Blog posts array (hardcoded, not from Contentful), philosophy quote, benefit card labels

---

## Analytics & Event Tracking

Microsoft Clarity is integrated for behaviour analytics. Project ID: `w3zpn726v1`.

**Rule: Every new button or CTA added to the site must fire a Clarity event.**

Use the shared helper from `src/lib/clarity.ts`:
```ts
import { trackEvent } from '@/lib/clarity';
trackEvent('event_name');
```

### Naming convention
`{page}_{element_description}` — all lowercase, underscores, no spaces.

Examples:
- `homepage_hero_shop_flow`
- `product_page_buy_now`
- `header_get_flow_desktop`
- `contact_form_submit`

### Server vs client components
- **Client components** (`'use client'`): call `trackEvent()` directly in the `onClick` handler.
- **Server components** (pages): wrap `<Link>` with `<TrackedLink clarityEvent="..." />` from `src/app/components/TrackedLink.tsx`.

---

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

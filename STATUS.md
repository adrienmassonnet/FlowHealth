# FlowHealth — Current Status

_Last updated: 2026-05-27_

## What's live / shipped

### Infrastructure
- [x] Next.js 16 App Router with Vercel deployment
- [x] Shopify Storefront + Admin API integration
- [x] Google Sheets live CMS (60s ISR)
- [x] Contentful SDK installed (not yet used — blog/static content candidate)
- [x] Klaviyo list subscription (pre-launch)
- [x] Resend transactional email (pre-launch confirmation)
- [x] Shopify subscription lifecycle API (pause / resume / cancel)

### Analytics
- [x] Microsoft Clarity (session recording + heatmaps) — loaded via GTM, consent-gated
- [x] GA4 via GTM (e-commerce events: view, add to cart, checkout) — consent-gated
- [x] Meta Pixel (PageView, ViewContent, InitiateCheckout) — consent-gated
- [x] Klaviyo event tracking wired in pre-launch flow
- [x] GTM is single loader — no bypass scripts in codebase
- [x] Cookie consent banner (GDPR, Europe) configured in GTM

### SEO
- [x] Dynamic sitemap + robots.txt
- [x] Organization JSON-LD (global)
- [x] Product JSON-LD with AggregateRating
- [x] FAQPage JSON-LD
- [x] Article JSON-LD on all blog posts (with mainEntityOfPage)
- [x] generateMetadata() on product pages and blog posts

### Pages
- [x] Homepage (hero, benefits, timeline, ingredients, comparison, savings, testimonials, blog)
- [x] Product page `/products/[handle]` (tabbed: benefits, timeline, how-to-use, ingredients, purity, reviews, shipping, savings)
- [x] FAQ page
- [x] Blog listing + individual post pages
- [x] Who We Are, Our Philosophy, Our Product, Research, Reviews, Contact
- [x] Subscription management page
- [x] Shipping policy, Privacy policy, Terms & conditions, Legal notice

### UX / Conversion
- [x] Pre-launch modal (email capture on "Buy Now")
- [x] Exit intent modal
- [x] Sticky product nav tabs
- [x] PurchaseSelector (subscribe vs. one-time with discount badge)
- [x] Sticky add-to-cart bar on scroll (appears after hero leaves viewport)
- [x] Subscription savings callout in PurchaseSelector

---

## Known issues / in progress

- [ ] Contentful not yet active — blog posts and static pages still served from `content-data.ts`
- [ ] No GDPR/cookie consent banner (Swiss law compliance — required before public launch)
- [ ] Klaviyo abandoned cart flow not confirmed wired
- [ ] GA4 events not verified in DebugView
- [ ] Photo reviews not integrated (text-only testimonials)
- [ ] `reviewCount: 47` in Product JSON-LD is a placeholder — update when real reviews are live

---

## Do not touch (stable, don't refactor)

- `src/lib/shopify.ts` — all Shopify queries are here; don't split or move
- `src/lib/content.ts` + `src/lib/content-data.ts` — content routing; always add fallbacks here
- `src/app/globals.css` — `.btn-cta`, `.card-selected` classes used everywhere
- Clarity event naming convention: `{page}_{element}` lowercase underscore
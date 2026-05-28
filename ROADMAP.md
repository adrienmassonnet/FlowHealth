# FlowHealth — Roadmap

_Ordered by priority. Check STATUS.md for what's already shipped._

---

## P0 — Launch blockers

- [x] **GDPR / cookie consent banner** — configured in GTM, consent-gating all analytics tags. GTM is now the single loader; bypass scripts removed from codebase.
- [ ] **Verify GA4 e-commerce events in DebugView** — confirm view_item, add_to_cart, begin_checkout all fire correctly end-to-end.
- [ ] **Wire Klaviyo abandoned cart flow** — confirm Shopify webhook → Klaviyo sequence is triggering.
- [ ] **Update `reviewCount` in Product JSON-LD** — replace placeholder `47` with real Shopify review count once reviews integration is live.

---

## P1 — High-leverage conversion wins

- [ ] **Photo reviews integration** — Okendo or Yotpo Shopify app. Text-only testimonials convert significantly worse. Surface on product page reviews tab.
- [ ] **Subscription savings callout in PurchaseSelector** — explicit "Save X% — most popular" label on the subscribe card to anchor the choice.
- [ ] **"As seen in" press logos section** — add above the fold on homepage or product page. High trust signal, low effort.
- [ ] **Money-back guarantee badge** — add to PurchaseSelector below the CTA button. 30-day guarantee is already in FAQ copy — surface it at point of purchase.

---

## P2 — SEO content

- [ ] **Migrate blog posts to Contentful** — Contentful SDK is already installed. Blog posts in `content-data.ts` are static strings with no update path. Migration unblocks: real publish dates, editorial workflow, image management, content preview.
- [ ] **Internal linking pass** — blog posts → product page, FAQ → science page, ingredients → blog posts. Currently no cross-linking.
- [ ] **BreadcrumbList JSON-LD** on inner pages (blog posts, FAQ, product sub-pages).

---

## P3 — Performance

- [ ] **Lazy-load framer-motion above the fold** — `framer-motion` loads globally. Audit which above-fold components use it and defer with `dynamic(() => import(...), { ssr: false })`.
- [ ] **Move Meta Pixel + GA4 into GTM** — currently firing as separate inline scripts alongside GTM. Consolidate under GTM to reduce main-thread script count.
- [ ] **`loading="eager"` on hero image** — ensure LCP image is never lazy-loaded.
- [ ] **`<link rel="preconnect">` for Shopify CDN** — add to root layout `<head>`.

---

## Icebox (nice to have, not urgent)

- [ ] Real-time social proof widget ("X people viewing this today")
- [ ] Ingredient deep-dives with inline PubMed citations on product page
- [ ] Author bio with credentials on blog posts (EEAT signal)
- [ ] Swipeable ingredient cards on mobile
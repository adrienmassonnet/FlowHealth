# Flow Health — Animation Map

> Catalog of every animated section/component on the site: what it does, what triggers it, what tokens it uses. Use this to make precise, targeted animation changes without grepping the whole codebase, and to spot inconsistencies before they ship.
>
> All tokens referenced below live in `src/lib/animation.ts` (`DURATION`, `EASE`, `SPRING`, `VARIANTS`, `T`). See `DESIGN_SYSTEM.md` §8 for the governing rule: no inline duration/ease values, always import from that file.
>
> Audited 2026-07-09. Re-audit when adding/changing section animation — this file rots exactly like the docs that predated it if nobody updates it alongside the code.

---

## 1. Shared primitives

| Primitive | File | What it does |
|---|---|---|
| `ScrollReveal` | `src/app/components/ScrollReveal.tsx` | Generic scroll-triggered reveal wrapper. `initial="hidden" whileInView="visible"`, picks a variant from `VARIANTS`, defaults to `fadeUp` + `T.base`. **Preferred way to animate a new section** — wrap content in this instead of writing a bespoke `motion.div`. |
| `AnimatedList` | `src/app/components/AnimatedList.tsx` | Staggered list reveal, `useInView`-driven. |
| `VARIANTS` | `src/lib/animation.ts` | Named hidden/visible pairs: `fadeUp`, `fadeUpSm`, `fade`, `fadeBlur`, `scale`, `popUp`, `slideUp`, `slideInLeft`, `slideInRight`. |

---

## 2. Homepage (`src/app/page.tsx`) — actual section order

**Note:** this order does not match what `DESIGN_SYSTEM.md` §3 currently documents (that list references a `Philosophy`/`HealthBenefits` section order that no longer reflects the real component composition — worth reconciling separately).

| # | Section | Component | Animation | Trigger | Tokens |
|---|---|---|---|---|---|
| 1 | Hero | `HeroText`, `TrustCard` (`HeroAnimated.tsx`) | Blur fade in, staggered by `delay` prop (100/400/800ms) | on load | `VARIANTS.fadeBlur` |
| 1 | Hero image | inline `ScrollReveal variant="scale" duration={1.4}` | scale-in | scroll into view | `VARIANTS.scale` |
| 1 | Hero trust list | `AnimatedList` | staggered fade-up | `useInView` | — |
| 2 | Mission | inline `ScrollReveal variant="fade"` / `variant="fadeUp"` | fade / fade-up | scroll into view | `VARIANTS.fade`, `VARIANTS.fadeUp` |
| 3 | **Inner Vitality** | `InnerVitalitySection.tsx` | **none** — no `motion.*`, no `ScrollReveal` | — | — |
| 4 | **Day Arc** | `DayArcSection.tsx` | **none** on section entrance (internal SVG chart interactions only) | — | — |
| 5 | Neurotransmitter | `NeurotransmitterSection.tsx` | fade/slide on heading + copy | inline `motion.p`/`motion.h2` | not yet audited against shared tokens — worth checking during next cleanup pass |
| 6 | Brain Health | `BrainHealthSection.tsx` | fade-up, `useInView`-driven | scroll into view | — |
| 7 | Ingredients | inline `ScrollReveal` + `HomepageIngredientsSection.tsx` (`useInView`) | fade / fade-up | scroll into view | `VARIANTS.fade`, `VARIANTS.fadeUp` |
| 8 | Approach | `ApproachSection.tsx` | `useInView`-driven | scroll into view | — |
| 9 | **Values ("what we stand for")** | `ValuesStandForSection.tsx` | **none** | — | — |
| 10 | **Brain** (closing section) | `BrainSection.tsx` | **none** | — | — |
| 11 | FAQ | `FAQ` (`faq-tabs.tsx`) | accordion expand/collapse, tab crossfade | click | `DURATION.base`/`DURATION.slow`, `EASE.expoOut` ✅ uses shared tokens |

**Finding:** 4 of 11 homepage sections (Inner Vitality, Day Arc, Values, Brain) have no entrance animation at all, while their neighbors fade/slide in. That's either an intentional pacing choice (breathing room between animated sections) or a gap — worth a deliberate decision either way rather than leaving it as an accident of whoever built which section.

---

## 3. Product page (`src/app/products/[handle]/page.tsx`)

| Section | Component | Animation | Notes |
|---|---|---|---|
| Image gallery | `ProductImageGallery.tsx` | scale+fade on load | ✅ uses `EASE.inOut` (fixed 2026-07-09) |
| Benefits timeline | `BenefitsTimeline.tsx` | expand/collapse | uses plain CSS `transition-opacity` (Tailwind), not framer-motion — legitimate, see §8 exception in `DESIGN_SYSTEM.md` |
| Ingredients accordion | `IngredientsAccordion.tsx` | page-transition slide (category switch), modal sheet slide-up | ✅ uses `EASE.expoOut` (fixed 2026-07-09) |

---

## 4. Homepage support sections (not yet individually audited in depth)

`MainBenefits`, `HealthBenefits`, `FeaturedIngredientsSection`, `BlogBento`, `ResultsTimeline`, `IngredientsGrid`, `PeacefulApproachSection`, `MorningRitualCard`, `VennCard`/`VennSVG`, `ComparisonTableClient` — all use `useInView`/`whileInView` with `VARIANTS.fadeUp` or equivalent. `VennCard`, `VennSVG`, `ComparisonTableClient`, `MorningRitualCard` were fixed 2026-07-09 to use `EASE.inOut` instead of a locally redefined identical curve.

`PeacefulApproachSection` uses `AnimatePresence` for a tab/state crossfade, not scroll-reveal.

---

## 5. Header / navigation

`Header.tsx` — dropdown panels (`panelVariants`, `itemVariants`, `backdropVariants`), staggered nav item reveal. Uses `EASE.expoOut`/`EASE.expoIn` (fixed 2026-07-09). Fine-grained durations (0.14–0.3s) are local, intentionally more granular than content-reveal timing — see `DESIGN_SYSTEM.md` §8.

---

## 6. Open questions for the next animation pass

1. Should Inner Vitality / Day Arc / Values / Brain sections get entrance animation to match their neighbors, or is the lack of motion an intentional pacing beat? (Section 2 finding above.)
2. `NeurotransmitterSection`'s inline `motion.p`/`motion.h2` transitions haven't been checked against the shared token rule yet.
3. Is there appetite for the eternal.co-style "section as a distinct scene" pattern (full background/motif shift per section, not just alternating white/off-white) — see conversation 2026-07-09. If yes, that's a bigger design decision (affects `DESIGN_SYSTEM.md` §3 background rhythm) and should be scoped as its own task before touching code.

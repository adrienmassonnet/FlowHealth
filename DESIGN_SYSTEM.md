# Flow Health — Design System

> **Read this before editing any component.**
> The goal is a site that looks like one person built it. This document is how we achieve that without constant review.

---

## 1. Tokens

All visual values live in `src/app/globals.css` as CSS custom properties under `:root`. Never hardcode a color hex, shadow, or spacing value directly in a component — reference the token or the Tailwind alias below.

### Colors

| Token | Tailwind class | Value | Use |
|---|---|---|---|
| `--color-ink` | `text-ink`, `bg-ink` | `#1E1854` | All text, borders at full opacity |
| `--color-brand` | `text-brand`, `bg-brand` | `#3B38B8` | Interactive elements, labels, accents |
| `--color-surface` | `bg-surface` | `#ffffff` | Default section background |
| `--color-surface-alt` | `bg-surface-alt` | `#F7F7FB` | Alternate section background |
| `--color-surface-ink` | `bg-surface-ink` | `ink/4%` | Card background on white |

### Text opacity hierarchy

Always use ink with opacity — never a separate grey hex.

| Role | Value | Tailwind shorthand |
|---|---|---|
| Primary (headings) | `ink/100` | `text-ink` |
| Body | `ink/75` | `text-ink/75` |
| Secondary | `ink/55` | `text-ink/55` |
| Muted (labels, meta) | `ink/35` | `text-ink/35` |

### Borders

| Token | Tailwind | Use |
|---|---|---|
| `--border-subtle` | `border-border-subtle` | Default card border |
| `--border-light` | `border-border-light` | Dividers, list separators |
| `--border-medium` | `border-border-medium` | Active/hover borders |

---

## 2. Typography

Use the utility classes defined in `globals.css`. **Do not compose your own type stack in a component.**

Every size is a single fluid `clamp()` that interpolates from its 375px value to
its 1440px value. There are **no breakpoint overrides and no `!important`** —
one token spans mobile to desktop, so a heading can never be "corrected" later
by a rule that silently outranks the component.

The @1440px column reproduces exactly what the site rendered before the type
refactor, so **desktop is unchanged**. The @375px column is where the work
happened — mobile was tuned up for legibility.

| Class | @375px | @1440px | Use |
|---|---|---|---|
| `.flow-display` | 34px | 88px | Hero headline — one per page maximum |
| `.flow-h1` | 30px | 48px | Page title — one per route |
| `.flow-h1--hero` | 32px | 63px | Editorial page hero (FAQ, Reviews) — a tier above a standard page title. Apply *alongside* `.flow-h1` |
| `.flow-h2` | 29px | 47px | Section heading — the workhorse |
| `.flow-h3` | 22px | 26px | Card / sub-section heading; stat figures |
| `.flow-h4` | 19px | 23.5px | Small sub-heading; long-form document sub-headings (legal pages) |
| `.flow-h5` | 16px | 19px | Card titles — the smallest heading rung |
| `.flow-body` | 17px | 21px | Body paragraph — default prose |
| `.flow-caption` | 15px | 18px | Supporting/secondary text, meta |
| `.flow-fine` | 13px | 15.5px | Tags, badges, timestamps |
| `.flow-label` | 13px | 15px | Eyebrow label — max **3 per page**. Add `.flow-label--gradient` for the branded gradient, max once per visual block |
| `.flow-label--sm` | 11.5px | 13px | Compact eyebrow for dense cards/badges. Nothing goes below this — 9px tracked uppercase is under the legible floor on a phone |

The `.flow-*` classes carry weight, leading, tracking and colour. If you need the
size alone, Tailwind exposes the same tokens as `text-display` / `text-h1` /
`text-h2` … / `text-caption`.

### Rules

- **The root font-size is the browser default (100% / 16px).** Never set a px
  root on `html` — it breaks Tailwind's rem scale (making `text-xs` mean
  something other than 12px) and overrides the user's own font-size
  accessibility setting. A 21px root is what forced the old `!important`
  override block into existence.
- **Headings don't need a label.** A strong `flow-h2` stands alone. Only add a `.flow-label` when the label adds information the heading cannot.
- **Never use `text-[arbitrary]` sizes** for content text. The scale above covers every content need.
- **Tracking and leading are built in.** Don't re-declare `tracking-[...]` or `leading-[...]` next to a `.flow-*` class.
- **Auditing.** The scale is verifiable, not aspirational: crawl every route,
  classify each text element by role, and compare rendered px against the table
  above. The last run measured 682 text elements at 375px across all 16 routes
  (including the PDP) with 1 real divergence. Re-run it after any type change
  rather than eyeballing: `WIDTH=375 node scripts/audit-type-scale.mjs`.
- Tailwind's stock steps (`text-sm` … `text-6xl`) are **also fluid** — redefined
  in `tailwind.config.ts` so a stray `text-4xl` still scales on mobile. Prefer
  the semantic `.flow-*` utilities regardless; the stock steps exist so
  un-migrated markup degrades gracefully, not as an alternative system.

---

## 3. Section Spacing

Every `<section>` uses one of the three section utility classes as its **only** vertical padding class. Do not add `py-*` on top of these.

Like type, these are fluid — one token, no breakpoint switch.

| Class | @375px | @1440px | Use |
|---|---|---|---|
| `.flow-section--sm` | 40px | 64px | Supporting sections, dense content |
| `.flow-section` | 48px | 96px | Standard page sections — use this by default |
| `.flow-section--lg` | 64px | 128px | Sections immediately after the hero |

Also available as Tailwind spacing: `py-section-sm` / `py-section` / `py-section-lg`.

Horizontal containment always uses `.flow-container` (max-width 1200px, fluid 20px→24px gutter, exposed as `px-gutter`).

### Rhythm inside a section

Use the `--space-*` steps (`2xs` 4px → `xl` 40px). They are **strictly
increasing** — a tighter step must never render larger than a looser one. The
old mobile block broke this by forcing `space-y-4` to 30px while `space-y-6`
stayed at 24px, which inverted the grouping hierarchy and pulled apart
elements (like the hero's tagline → headline → CTA) that were meant to read as
one unit.

### Section backgrounds — alternating rhythm

Sections alternate between `bg-surface` (white) and `bg-surface-alt` (#F7F7FB). This creates visual separation without borders. Follow this pattern on the homepage:

```
Hero               → full-bleed image (no bg class)
Mission            → bg-surface
HealthBenefits     → bg-surface-alt
Neurotransmitter   → bg-surface
DayArc             → bg-surface-alt
BrainHealth        → bg-surface
BrainSection       → bg-surface-alt
Ingredients        → bg-surface
Philosophy         → bg-surface-alt
```

Never put two consecutive sections with the same background.

---

## 4. Section Header Pattern

The header block above section content is always structured the same way:

```tsx
<div className="flow-section-header">
  {/* Optional — only if the label adds information */}
  <p className="flow-label flow-label--gradient">eyebrow text</p>

  <h2 className="flow-h2 text-ink">
    The section heading.
  </h2>

  {/* Optional body — keep to 1–2 sentences */}
  <p className="flow-body max-w-copy">
    Supporting description.
  </p>
</div>
```

For centered headers (e.g. above a full-width grid), add `.flow-section-header--center` to the wrapper.

---

## 5. Cards

| Class | Use |
|---|---|
| `.flow-card` | White card with border and card shadow |
| `.flow-card--tinted` | Semi-transparent ink-tinted card on white backgrounds |

Border radius on cards is always `rounded-lg` (20px) unless the card is small (use `rounded-md`, 14px).

---

## 6. Buttons & CTAs

| Class | Use |
|---|---|
| `.btn-cta` | Primary gradient CTA button — gradient animates on hover |
| `.flow-btn-primary` | Standard solid primary button (no hover animation) |
| `.flow-btn-ghost` | Text link with arrow — secondary action |

**Rule:** one primary CTA per section. If there are two actions, one must be `.flow-btn-ghost`.

Minimum touch target: `min-h-[44px]` on mobile for any interactive element.

---

## 7. Shadows

Always use the named shadow tokens, never arbitrary shadow values.

| Class | Use |
|---|---|
| `shadow-subtle` | Resting state for lightweight elements |
| `shadow-card` | Default card shadow |
| `shadow-elevated` | Modals, dropdowns |
| `shadow-floating` | Floating panels, tooltips |
| `shadow-glow` | Brand accent glow effects |

---

## 8. Motion

**All `framer-motion` durations and easing curves come from `src/lib/animation.ts` — never inline a raw `duration:` number or `ease: [...]` array in a component.** That file is the single source of truth (`DURATION`, `EASE`, `SPRING`, `VARIANTS`, `T` transition shorthands, `staggerContainer()`). Import from it instead of redefining a local `const ease = [...]` — five components independently copy-pasted the same curve before this rule existed; that's exactly what this rule prevents.

(Earlier versions of this doc described `--dur-slow`/`--ease-out` etc. as CSS custom properties — those were never actually implemented. `animation.ts` is the real system.)

- **Entrance / scroll reveals:** `DURATION.slow` (0.9s) or `DURATION.base` (0.65s), `EASE.expoOut` — or just use `VARIANTS.fadeUp` / `T.slow` directly
- **Hover / UI state changes:** `EASE.inOut`, duration per-component (typically 0.25–0.9s depending on element size — exact timing is a legitimate local judgment call, the curve is not)
- **Fast state switches (tabs, toggles, chevrons):** `DURATION.fast` (0.25s)
- **Reduce motion:** handled globally. `globals.css` ends with a
  `@media (prefers-reduced-motion: reduce)` block that collapses all CSS
  animations and transitions and neutralises the named keyframe classes
  (`.dice-enter`, `.philosophy-enter-*`, `.topic-enter`). You do not need to
  wrap individual CSS animations any more. For framer-motion, use its
  `useReducedMotion()` hook when a component's motion is large or parallax-like
  — the CSS block cannot reach framer's inline transforms.

Plain CSS transitions via Tailwind's built-in `transition-*`/`duration-*`/`ease-out` utility classes (accordions, simple hover states) are a separate, legitimate lane — they don't need to route through `animation.ts`, which is specifically for `framer-motion` `Transition`/`Variants` objects.

---

## 9. Mobile Rules

These apply to every component without exception:

0. **Never add a mobile override block.** There is no `@media (max-width: 767px)`
   type or spacing layer any more, and one must not come back. If a heading is
   wrong on mobile, fix the token — don't add an element-selector rule with
   `!important`, which outranks every component and makes the documented scale
   above a fiction. The one remaining mobile rule is text alignment (the brand
   reads left-aligned on small screens); it is scoped to `.text-center` and
   opt-out-able with `mobile-keep-center`, not a blanket `* { }`.
1. **Stack vertically.** Desktop grids (`md:grid-cols-2`, `md:flex-row`) must have a logical mobile stack order. Content before image on mobile.
2. **Increase tap targets.** Buttons, tabs, and interactive elements must be `min-h-[44px]`.
3. **Don't shrink the image panel below 260px height.** Shorter looks cheap.
4. **SVG charts and diagrams** that are illegible at <600px must be hidden on mobile (`md:block hidden`) with a text-based fallback shown instead (`md:hidden`).
5. **Horizontal scroll carousels** use `snap-x snap-mandatory` with visible overflow (don't clip). Always provide dot navigation below the carousel on mobile.

---

## 10. Adding a New Section — Checklist

Copy this checklist when building a new section:

```
[ ] Wraps content in <section className="flow-section [bg-surface or bg-surface-alt]">
[ ] Uses flow-container for inner wrapper
[ ] Uses flow-section-header for the header block
[ ] Heading uses flow-h2 (or flow-h3 if it's a sub-section)
[ ] Label (if any) uses flow-label — count: is this ≤ 3 total on this page?
[ ] Body text uses flow-body or flow-caption — not arbitrary text-[size]
[ ] Background alternates correctly with adjacent sections
[ ] Mobile layout stacks vertically — no horizontal overflow
[ ] All interactive elements are min-h-[44px] on mobile
[ ] Any SVG visualization has a mobile fallback if <600px renders it illegible
[ ] No arbitrary shadow values — uses shadow-* token
[ ] No arbitrary color hex — uses text-ink/[opacity] or text-brand
[ ] No inline framer-motion duration/ease values — imports from @/lib/animation
```

---

## 11. Files to Know

| File | Purpose |
|---|---|
| `src/app/globals.css` | All tokens, type utilities, layout helpers, named animations |
| `tailwind.config.ts` | Exposes tokens as Tailwind classes |
| `src/app/layout.tsx` | Root shell — header, footer, font loading |
| `src/app/page.tsx` | Homepage — section composition and order |
| `src/app/products/[handle]/page.tsx` | Product page — tab-based layout |

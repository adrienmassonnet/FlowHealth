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

| Class | Use | Notes |
|---|---|---|
| `.flow-display` | Hero headline | One per page maximum |
| `.flow-h1` | Page title | One per route |
| `.flow-h2` | Section heading | The workhorse — use this for section titles |
| `.flow-h3` | Card / sub-section heading | |
| `.flow-label` | Eyebrow label above a heading | Max **3 per page**. Add `.flow-label--gradient` for the branded gradient variant — use gradient sparingly (max once per visual block) |
| `.flow-body` | Body paragraph | Default prose text |
| `.flow-caption` | Supporting/secondary text | Descriptions, meta |
| `.flow-fine` | Tags, badges, timestamps | |

### Rules

- **Headings don't need a label.** A strong `flow-h2` stands alone. Only add a `.flow-label` when the label adds information the heading cannot.
- **Never use `text-[arbitrary]` sizes** for content text. The scale above covers every content need.
- **Tracking:** negative on headings (`tracking-[-0.025em]` built in), wide on labels (`tracking-[0.18em]` built in). Don't override these.

---

## 3. Section Spacing

Every `<section>` uses one of the three section utility classes as its **only** vertical padding class. Do not add `py-*` on top of these.

| Class | Mobile | Desktop | Use |
|---|---|---|---|
| `.flow-section--sm` | `py-10` (40px) | `py-16` (64px) | Supporting sections, dense content |
| `.flow-section` | `py-14` (56px) | `py-24` (96px) | Standard page sections — use this by default |
| `.flow-section--lg` | `py-20` (80px) | `py-32` (128px) | Sections immediately after the hero |

Horizontal containment always uses `.flow-container` (max-width 1200px, px-5 mobile / px-6 desktop).

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

Animations follow these conventions:

- **Entrance:** fade up (`opacity 0→1`, `translateY 12px→0`), duration `--dur-slow` (0.65s), easing `--ease-out`
- **Hover micro-interactions:** `--dur-base` (0.35s), `--ease-std`
- **State switches (tabs, toggles):** `--dur-fast` (0.18s)
- **Reduce motion:** respect `prefers-reduced-motion` — wrap animations in `@media (prefers-reduced-motion: no-preference)` for non-critical motion

---

## 9. Mobile Rules

These apply to every component without exception:

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

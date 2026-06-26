import type { Transition, Variants } from 'framer-motion';

// ─── Durations ────────────────────────────────────────────────────────────────
export const DURATION = {
  fast:  0.25,
  base:  0.65,
  slow:  0.9,
  xslow: 1.4,
} as const;

// ─── Easings ──────────────────────────────────────────────────────────────────
// expoOut  — snappy deceleration, default for reveals
// inOut    — balanced, good for UI state changes
// diceOut  — aggressive exit ease for the dice flip
// diceIn   — bouncy spring-like entry ease for the dice flip
export const EASE = {
  expoOut: [0.16, 1, 0.3, 1]      as [number, number, number, number],
  inOut:   [0.25, 0.1, 0.1, 1]    as [number, number, number, number],
  diceOut: [0.55, 0, 1, 0.85]     as [number, number, number, number],
  diceIn:  [0.34, 1.45, 0.64, 1]  as [number, number, number, number],
} as const;

// ─── Spring presets ───────────────────────────────────────────────────────────
export const SPRING = {
  // Smooth navigation transition (carousels, panels)
  base: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    mass: 1,
  },
  // Snappier response on direct tap/click
  tap: {
    type: 'spring',
    stiffness: 450,
    damping: 18,
    mass: 1,
  },
  // Subtle, almost tween-like spring for reveals
  gentle: {
    type: 'spring',
    stiffness: 260,
    damping: 24,
  },
} as const;

// ─── Viewport defaults ────────────────────────────────────────────────────────
export const VIEWPORT = {
  once: true,
  margin: '-8% 0px',
} as const;

// ─── Transition shorthands ────────────────────────────────────────────────────
export const T = {
  base:  { duration: DURATION.base,  ease: EASE.expoOut } satisfies Transition,
  slow:  { duration: DURATION.slow,  ease: EASE.expoOut } satisfies Transition,
  xslow: { duration: DURATION.xslow, ease: EASE.expoOut } satisfies Transition,
  fast:  { duration: DURATION.fast,  ease: EASE.inOut   } satisfies Transition,
  ui:    { duration: DURATION.base,  ease: EASE.inOut   } satisfies Transition,
} as const;

// ─── Scroll-reveal variants ───────────────────────────────────────────────────
// Used by ScrollReveal and any component with whileInView patterns.
// hidden → visible naming to stay consistent with ScrollReveal.
export const VARIANTS: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  },
  fadeUpSm: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeBlur: {
    hidden: { opacity: 0, filter: 'blur(16px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  popUp: {
    hidden: { opacity: 0, scale: 0.86, rotate: -3 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 12 },
    visible: { opacity: 1, x: 0 },
  },
};

// ─── Stagger container helper ─────────────────────────────────────────────────
// Usage: variants={staggerContainer(0.1)} on a motion parent,
// then variants={VARIANTS.fadeUp} on each child.
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },

      /* ── Fluid type scale ────────────────────────────────────────────────
         Mirrors the tokens in globals.css so `text-h2` and `.flow-h2` are the
         same size. Prefer the .flow-* utilities (they carry weight, leading
         and tracking too); reach for these only when you need the size alone. */
      fontSize: {
        /* The stock Tailwind scale is redefined as fluid clamps. Every step
           interpolates 375px → 1440px, where the upper bound reproduces what
           the old 21px root used to render. This means a stray `text-4xl`
           still scales sanely on mobile instead of needing an !important
           override to claw it back. Comments are rendered px at each end. */
        xs:   ['clamp(0.8125rem, 0.752rem + 0.26vw, 0.984375rem)',  { lineHeight: '1.45' }], /* 13 → 15.75 */
        sm:   ['clamp(0.9375rem, 0.863rem + 0.32vw, 1.1484375rem)', { lineHeight: '1.5' }],  /* 15 → 18.375 */
        base: ['clamp(1.0625rem, 0.974rem + 0.38vw, 1.3125rem)',    { lineHeight: '1.6' }],  /* 17 → 21 */
        lg:   ['clamp(1.125rem,  1.001rem + 0.53vw, 1.4765625rem)', { lineHeight: '1.55' }], /* 18 → 23.625 */
        xl:   ['clamp(1.25rem,   1.112rem + 0.59vw, 1.640625rem)',  { lineHeight: '1.35' }], /* 20 → 26.25 */
        '2xl':['clamp(1.4375rem, 1.251rem + 0.8vw,  1.96875rem)',   { lineHeight: '1.25' }], /* 23 → 31.5 */
        '3xl':['clamp(1.625rem,  1.331rem + 1.26vw, 2.4609375rem)', { lineHeight: '1.18' }], /* 26 → 39.375 */
        '4xl':['clamp(1.8125rem, 1.411rem + 1.71vw, 2.953125rem)',  { lineHeight: '1.12' }], /* 29 → 47.25 */
        '5xl':['clamp(2.125rem,  1.487rem + 2.72vw, 3.9375rem)',    { lineHeight: '1.08' }], /* 34 → 63 */
        '6xl':['clamp(2.375rem,  1.478rem + 3.83vw, 4.921875rem)',  { lineHeight: '1.05' }], /* 38 → 78.75 */

        /* Semantic tokens — mirror globals.css. Prefer the .flow-* utilities. */
        display: ['var(--fs-display)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        h1:      ['var(--fs-h1)',      { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        h2:      ['var(--fs-h2)',      { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        h3:      ['var(--fs-h3)',      { lineHeight: '1.2',  letterSpacing: '-0.02em' }],
        h4:      ['var(--fs-h4)',      { lineHeight: '1.3',  letterSpacing: '-0.01em' }],
        h5:      ['var(--fs-h5)',      { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        body:    ['var(--fs-body)',    { lineHeight: '1.6' }],
        caption: ['var(--fs-caption)', { lineHeight: '1.5' }],
        fine:    ['var(--fs-fine)',    { lineHeight: '1.45' }],
        label:   ['var(--fs-label)',   { lineHeight: '1.4', letterSpacing: '0.16em' }],
        /* Smallest rung. Replaces scattered text-[9px]/text-[10px] literals —
           9px was below the legible floor on a phone. */
        micro:   ['var(--fs-label-sm)', { lineHeight: '1.4' }], /* 11 flat */
      },

      /* ── Brand colors — use as bg-ink, text-brand, border-subtle, etc. ── */
      colors: {
        ink:     '#1E1854',
        brand:   '#3B38B8',
        surface: {
          DEFAULT: '#ffffff',
          alt:     '#F7F7FB',       /* alternate section bg */
          ink:     'rgba(30,24,84,0.04)', /* tinted glass for cards */
        },
        border: {
          subtle: 'rgba(30,24,84,0.07)',
          light:  'rgba(30,24,84,0.12)',
          medium: 'rgba(30,24,84,0.20)',
        },
      },

      /* ── Max widths ─────────────────────────────────────────────── */
      maxWidth: {
        content: '1200px',
        copy:    '680px',   /* long-form text columns */
        narrow:  '480px',   /* constrained headings */
      },

      /* ── Border radius ──────────────────────────────────────────── */
      borderRadius: {
        sm:  '0.625rem',  /* 10px — tags, pills */
        md:  '0.875rem',  /* 14px — small cards */
        lg:  '1.25rem',   /* 20px — standard cards */
        xl:  '1.75rem',   /* 28px — large panels */
        '2xl': '2rem',
      },

      /* ── Box shadows ────────────────────────────────────────────── */
      boxShadow: {
        subtle:   '0 1px 6px rgba(30, 24, 84, 0.06)',
        card:     '0 2px 16px rgba(30, 24, 84, 0.07)',
        elevated: '0 4px 24px rgba(30, 24, 84, 0.11)',
        floating: '0 8px 32px rgba(30, 24, 84, 0.15)',
        glow:     '0 0 80px rgba(59, 56, 184, 0.20)',
      },

      /* ── Spacing additions (8-pt based) ─────────────────────────── */
      spacing: {
        /* Fluid section rhythm — mirrors globals.css. Use py-section on a
           <section> instead of stacking py-14 md:py-24. */
        'section-sm': 'var(--space-section-sm)',
        'section':    'var(--space-section)',
        'section-lg': 'var(--space-section-lg)',
        'gutter':     'var(--space-gutter)',

        '4.5': '1.125rem',   /* 18px */
        '13':  '3.25rem',    /* 52px */
        '15':  '3.75rem',    /* 60px */
        '18':  '4.5rem',     /* 72px */
        '22':  '5.5rem',     /* 88px */
        '26':  '6.5rem',     /* 104px */
        '30':  '7.5rem',     /* 120px */
        '34':  '8.5rem',     /* 136px */
      },

    },
  },
  plugins: [],
};

export default config;

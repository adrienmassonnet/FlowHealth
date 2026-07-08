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

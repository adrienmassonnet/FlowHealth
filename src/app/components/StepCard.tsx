import type { CSSProperties, ReactNode } from 'react';

/**
 * Canonical "numbered step" container. The structure is fixed — an outer
 * rounded card, a corner-cut badge header (rounded-tl / rounded-br) holding the
 * number inline with the title, and a padded description below. Only the colour
 * adapts to the background via `tone`.
 *
 * Reference (dark tone) lives in InnerVitalitySection. Every numbered step on
 * the site renders through this so they stay identical.
 */
export type StepTone = 'light' | 'dark';
export type StepVariant = 'solid' | 'glass';

export function StepCard({
  number,
  title,
  description,
  tone = 'light',
  variant = 'solid',
  className = '',
  style,
}: {
  number: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  tone?: StepTone;
  variant?: StepVariant;
  className?: string;
  style?: CSSProperties;
}) {
  const dark = tone === 'dark';
  const glass = !dark && variant === 'glass';
  const surface = dark
    ? 'bg-white/[0.04] border-white/[0.07]'
    : glass
      ? // Frosted glass: flat light-grey fill (colour set via style below so we
        // can layer a grain texture), strong blur, bright inner sheen, low
        // neutral-grey shadow.
        'backdrop-blur-2xl border-white/60 ring-1 ring-inset ring-white/55 shadow-[0_2px_8px_-4px_rgba(90,90,105,0.14)]'
      : 'bg-gradient-to-b from-white to-[#F6F6FC] border-ink/[0.08] shadow-[0_10px_28px_-10px_rgba(30,24,84,0.22)]';

  // Grain: a desaturated fractal-noise SVG blended over the grey fill.
  const glassStyle: CSSProperties | undefined = glass
    ? {
        backgroundColor: 'rgba(233,234,238,0.6)',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        backgroundBlendMode: 'overlay',
      }
    : undefined;

  return (
    <div
      style={{ ...glassStyle, ...style }}
      className={`relative rounded-xl overflow-hidden flex flex-col gap-0 border ${surface} ${className}`}
    >
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-tl-xl rounded-br-xl self-start ${
          dark
            ? 'bg-[rgba(180,200,255,0.10)]'
            : variant === 'glass'
              ? 'bg-brand/[0.11] border border-brand/25'
              : 'bg-brand/[0.11]'
        }`}
      >
        <span
          className={`text-xs font-semibold tabular-nums shrink-0 ${
            dark ? 'text-[rgba(180,200,255,0.7)]' : 'text-brand'
          }`}
        >
          {number}
        </span>
        <p
          className={`text-base font-semibold tracking-[-0.01em] leading-snug ${
            dark ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </p>
      </div>
      {description && (
        <p
          className={`text-sm leading-[1.6] px-4 py-3 ${
            dark ? 'text-white/45' : 'text-ink/60'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

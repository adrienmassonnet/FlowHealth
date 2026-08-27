'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { EASE, DURATION } from '@/lib/animation';

// Ordered largest-first: this is also the placement priority below, so the
// biggest, most important terms claim the center and mid-distance slots.
const inputWords = [
  { text: 'Restlessness',         fontSize: 44, opacity: 0.95, weight: 700 },
  { text: 'Burnout',               fontSize: 32, opacity: 0.88, weight: 700 },
  { text: 'Dopamine crash',        fontSize: 27, opacity: 0.85, weight: 600 },
  { text: 'Cortisol overload',     fontSize: 24, opacity: 0.82, weight: 600 },
  { text: 'Broken sleep',          fontSize: 24, opacity: 0.80, weight: 600 },
  { text: 'Chronic fatigue',       fontSize: 22, opacity: 0.78, weight: 600 },
  { text: 'Anxiety spiral',        fontSize: 22, opacity: 0.76, weight: 600 },
  { text: 'Brain fog',             fontSize: 19, opacity: 0.66, weight: 600 },
  { text: 'Memory gaps',           fontSize: 18, opacity: 0.60, weight: 500 },
  { text: 'Mood instability',      fontSize: 18, opacity: 0.58, weight: 500 },
  { text: 'Irritability',          fontSize: 17, opacity: 0.56, weight: 500 },
  { text: 'Neuroplasticity loss',  fontSize: 16, opacity: 0.54, weight: 500 },
  { text: 'Attention collapse',    fontSize: 16, opacity: 0.54, weight: 500 },
  { text: 'Poor decision making',  fontSize: 15, opacity: 0.50, weight: 500 },
  { text: 'Loss of focus',         fontSize: 15, opacity: 0.50, weight: 500 },
  { text: 'Jitteriness',           fontSize: 15, opacity: 0.50, weight: 500 },
  { text: 'Impaired cognition',    fontSize: 15, opacity: 0.50, weight: 500 },
];

type PlacedWord = typeof inputWords[number] & { x: number; y: number; w: number; h: number };

// Deterministic centre-outward placement: the first (biggest) word is
// pinned dead-center, then each following word is placed at the nearest
// free slot found by scanning expanding rings of evenly-spaced angles
// (starting straight up, sweeping clockwise). Real measured text boxes
// decide collisions, so words never overlap — and because there's no
// randomness, the result is the same fixed layout every render instead of
// an unpredictable algorithmic scatter.
function packWords(
  list: typeof inputWords,
  halfW: number,
  halfH: number,
  scale: number,
  ctx: CanvasRenderingContext2D | null,
  startAngle: number = -Math.PI / 2,
): PlacedWord[] {
  const placed: PlacedWord[] = [];
  const gap = 10;
  const aspect = halfH / halfW;

  for (const word of list) {
    const fontSize = word.fontSize * scale;
    let w = fontSize * word.text.length * 0.56;
    let ascent = fontSize * 0.75;
    let descent = fontSize * 0.25;
    if (ctx) {
      ctx.font = `${word.weight} ${fontSize}px Outfit, system-ui, sans-serif`;
      const m = ctx.measureText(word.text);
      w = m.width;
      ascent = m.actualBoundingBoxAscent || ascent;
      descent = m.actualBoundingBoxDescent || descent;
    }
    const h = ascent + descent;
    const halfw = w / 2;
    const halfh = h / 2;

    let bestX = 0;
    let bestY = 0;
    let found = false;
    const maxR = Math.hypot(halfW, halfH) * 1.3;
    // Pass 1: respect the box bounds. Pass 2 (only if nothing fit, e.g. a
    // word too wide for the box) drops the bounds check but still avoids
    // collisions, so a word never just falls back to stacking at (0,0).
    for (const respectBounds of [true, false]) {
      if (found) break;
      outer:
      for (let r = 0; r <= maxR; r += 3) {
        const angleCount = r === 0 ? 1 : Math.max(8, Math.round(r / 10));
        for (let a = 0; a < angleCount; a++) {
          const theta = (a / angleCount) * Math.PI * 2 + startAngle;
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta) * aspect;
          if (respectBounds && (Math.abs(x) + halfw + gap > halfW || Math.abs(y) + halfh + gap > halfH)) continue;
          let collide = false;
          for (const p of placed) {
            if (Math.abs(x - p.x) * 2 < (w + p.w) + gap * 2 && Math.abs(y - p.y) * 2 < (h + p.h) + gap * 2) {
              collide = true;
              break;
            }
          }
          if (!collide) {
            bestX = x;
            bestY = y;
            found = true;
            break outer;
          }
        }
      }
    }
    placed.push({ ...word, fontSize, x: bestX, y: bestY, w, h });
  }
  return placed;
}

// Mobile only: drop the two lowest-priority, most conceptually redundant
// terms (each overlaps with a word that's staying) to give everything else
// real breathing room instead of forcing a tight fit.
const MOBILE_EXCLUDE = new Set(['Poor decision making', 'Attention collapse']);

const H_DESKTOP = 270;
const H_MOBILE = 380;
// Bumps only the rendered glyph size — packWords (and thus every word's x/y
// position and the collision gaps it solved for) still runs on the
// original, unscaled fontSize, so positioning and spacing stay exactly as
// they were before this was added.
const DISPLAY_SCALE = 1.1;

// packWords already guarantees no overlap at the *original* font size, but
// growing every word for display can push the tightest-packed pairs into
// each other. This leaves every word's position untouched unless it now
// collides, in which case it nudges just that word outward along its
// existing angle from center — the minimum move needed to clear the
// overlap — rather than moving anything that doesn't need it.
function resolveDisplayOverlaps(
  list: PlacedWord[],
  displayScale: number,
  halfW: number,
  halfH: number,
  ctx: CanvasRenderingContext2D | null,
  // When given, only words whose text is in this set are ever allowed to
  // move — everything else keeps its exact original x/y, even if it would
  // otherwise fail the fits/collision check. Used to make an explicit,
  // named list of words adjustable without touching anything else.
  adjustable?: Set<string>,
  // Only meaningful alongside `adjustable`: process the adjustable words in
  // this order (most urgent first) rather than their order in `list`. A
  // word that's stuck with nowhere to go needs to claim its spot *before*
  // whichever neighbor is blocking it gets placed — otherwise the blocker,
  // processed first, has no way to know it should move out of the way.
  priority?: string[],
): PlacedWord[] {
  const gap = 10;
  const finalized: { x: number; y: number; w: number; h: number; text: string }[] = [];
  const byText = new Map<string, PlacedWord>();

  const fixed = list.filter((w) => adjustable && !adjustable.has(w.text));
  const toPlace = list.filter((w) => !adjustable || adjustable.has(w.text));
  if (priority) {
    const rank = new Map(priority.map((t, i) => [t, i]));
    toPlace.sort((a, b) => (rank.get(a.text) ?? 999) - (rank.get(b.text) ?? 999));
  }

  // Pass 1: fixed words establish the baseline exactly as originally
  // placed — nothing here searches or moves.
  for (const word of fixed) {
    finalized.push({ x: word.x, y: word.y, w: 0, h: 0, text: word.text });
    byText.set(word.text, word);
  }
  // measure fixed words' real w/h for collision purposes below
  for (const entry of finalized) {
    const src = byText.get(entry.text)!;
    const { w, h } = ((): { w: number; h: number } => {
      const fontSize = src.fontSize * displayScale;
      let w = fontSize * src.text.length * 0.56;
      let ascent = fontSize * 0.75;
      let descent = fontSize * 0.25;
      if (ctx) {
        ctx.font = `${src.weight} ${fontSize}px Outfit, system-ui, sans-serif`;
        const m = ctx.measureText(src.text);
        w = m.width;
        ascent = m.actualBoundingBoxAscent || ascent;
        descent = m.actualBoundingBoxDescent || descent;
      }
      return { w, h: ascent + descent };
    })();
    entry.w = w;
    entry.h = h;
  }

  const list2 = toPlace;
  const result: PlacedWord[] = [];

  const measure = (word: PlacedWord, scale: number) => {
    const fontSize = word.fontSize * scale;
    let w = fontSize * word.text.length * 0.56;
    let ascent = fontSize * 0.75;
    let descent = fontSize * 0.25;
    if (ctx) {
      ctx.font = `${word.weight} ${fontSize}px Outfit, system-ui, sans-serif`;
      const m = ctx.measureText(word.text);
      w = m.width;
      ascent = m.actualBoundingBoxAscent || ascent;
      descent = m.actualBoundingBoxDescent || descent;
    }
    return { w, h: ascent + descent };
  };

  for (const word of list2) {
    const canMove = !adjustable || adjustable.has(word.text);
    const wordGap = gap;
    const collidesWith = (cx: number, cy: number, w: number, h: number) =>
      finalized.some(
        (p) => Math.abs(cx - p.x) * 2 < (w + p.w) + wordGap * 2 && Math.abs(cy - p.y) * 2 < (h + p.h) + wordGap * 2,
      );

    const search = (w: number, h: number, maxR: number) => {
      const bw = w / 2;
      const bh = h / 2;
      const fits = (cx: number, cy: number) => Math.abs(cx) + bw <= halfW && Math.abs(cy) + bh <= halfH;
      const collides = (cx: number, cy: number) => collidesWith(cx, cy, w, h);
      let bestX = word.x;
      let bestY = word.y;
      let found = false;
      outer:
      for (let r = 0; r <= maxR; r += 2) {
        const angleCount = r === 0 ? 1 : Math.max(8, Math.round(r / 4));
        for (let a = 0; a < angleCount; a++) {
          const theta = (a / angleCount) * Math.PI * 2;
          const cx = word.x + r * Math.cos(theta);
          const cy = word.y + r * Math.sin(theta);
          if (fits(cx, cy) && !collides(cx, cy)) {
            bestX = cx;
            bestY = cy;
            found = true;
            break outer;
          }
        }
      }
      return { found, x: bestX, y: bestY };
    };

    let { w, h } = measure(word, displayScale);
    let x = word.x;
    let y = word.y;
    let finalFontSize = word.fontSize * displayScale;

    const startsClear = (() => {
      const bw = w / 2;
      const bh = h / 2;
      return Math.abs(x) + bw <= halfW && Math.abs(y) + bh <= halfH && !collidesWith(x, y, w, h);
    })();

    // Words outside the adjustable set (when one is given) keep their
    // original position no matter what. Named adjustable words always
    // search for a better spot (even if technically already legal) so the
    // move can open up breathing room, not just clear a hard violation.
    if (canMove && (adjustable ? true : !startsClear)) {
      const attempt = search(w, h, startsClear ? 220 : 400);
      if (attempt.found) {
        x = attempt.x;
        y = attempt.y;
      } else if (!startsClear) {
        // No legal spot exists for this word even at the full display size —
        // it's simply too wide for the box, not just crowded out. Shrink it
        // in small steps (never below its original, unscaled size) until a
        // spot opens up, rather than leaving it clipped past the edge.
        for (let scale = displayScale - 0.01; scale >= 0.85; scale -= 0.01) {
          const m = measure(word, scale);
          const shrunk = search(m.w, m.h, 400);
          if (shrunk.found) {
            w = m.w;
            h = m.h;
            x = shrunk.x;
            y = shrunk.y;
            finalFontSize = word.fontSize * scale;
            break;
          }
        }
      }
    }

    finalized.push({ x, y, w, h, text: word.text });
    result.push({ ...word, x, y, fontSize: finalFontSize });
  }

  const resultByText = new Map(result.map((w) => [w.text, w]));
  for (const word of fixed) {
    resultByText.set(word.text, { ...word, fontSize: word.fontSize * displayScale });
  }
  // Return in the original list order (not the priority-placement order) so
  // render-order-dependent things like the stagger animation delay stay
  // tied to each word's importance, not to placement sequencing.
  return list.map((w) => resultByText.get(w.text)!);
}

function WordCloud({ inView, mobile }: { inView: boolean; mobile: boolean }) {
  const H = mobile ? H_MOBILE : H_DESKTOP;
  const halfW = mobile ? 170 : 300;
  const halfH = H / 2 - (mobile ? 40 : 26);
  const scale = mobile ? 0.8 : 1;
  const [placed, setPlaced] = useState<PlacedWord[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // The Outfit webfont loads with `display: swap`, so a canvas
      // measurement taken immediately on mount can land before it's ready
      // and silently measure the fallback font instead — every width
      // comes out too narrow, which is exactly how a word can still clip
      // the edge despite passing a "fits inside the box" check. Wait for
      // it so measureText reflects the font that's actually rendered.
      if (typeof document !== 'undefined' && document.fonts?.ready) {
        try {
          await document.fonts.ready;
        } catch {
          // ignore — fall through and measure with whatever is available
        }
      }
      if (cancelled) return;
      const ctx = document.createElement('canvas').getContext('2d');
      // Mobile drops two of the least-essential words and starts each
      // search ring from the horizontal (right) instead of straight up, so
      // the remaining words spread across the available width — the
      // vertical-first default was stacking almost everything into a
      // single narrow column on the portrait box. Desktop is untouched.
      const words = mobile ? inputWords.filter((w) => !MOBILE_EXCLUDE.has(w.text)) : inputWords;
      const laid = packWords(words, halfW, halfH, scale, ctx, mobile ? 0 : undefined);
      if (cancelled) return;
      const resolved = resolveDisplayOverlaps(laid, DISPLAY_SCALE, halfW, halfH, ctx);
      setPlaced(resolved);
    })();
    return () => {
      cancelled = true;
    };
    // halfW/halfH are derived from H + mobile, already covered by those deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [H, halfW, halfH, scale]);

  return (
    <div className="relative w-full select-none" style={{ height: H }}>
      <svg width="100%" height={H} viewBox={`0 0 ${halfW * 2} ${H}`} preserveAspectRatio="xMidYMid meet">
        <g transform={`translate(${halfW},${H / 2})`}>
          {placed.map((w, i) => (
            <motion.text
              key={w.text}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: w.opacity } : {}}
              transition={{ duration: DURATION.base, ease: EASE.expoOut, delay: 0.03 * i }}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`translate(${w.x},${w.y})`}
              fontSize={w.fontSize}
              fontWeight={w.weight}
              fontFamily="Outfit, system-ui, sans-serif"
              fill="white"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 2px 14px rgba(0,0,0,0.5)' }}
            >
              {w.text}
            </motion.text>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default function BrainHealthSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-6% 0px' });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-section-sm md:py-section bg-white overflow-hidden"
    >
      <div className="flow-container">

        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-6">

          {/* Word cloud — left on desktop, below the text on mobile. Image sits behind it. */}
          <div className="order-2 md:order-1 relative isolate w-full md:flex-1 min-w-0">
            <div className="absolute -inset-4 md:-left-5 md:right-6 md:-inset-y-10 -z-10 pointer-events-none overflow-hidden rounded-3xl bg-ink transform-gpu">
              <Image
                src="/calm-from-chaos.png"
                alt=""
                fill
                className="object-cover scale-110 transform-gpu"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
            <WordCloud inView={inView} mobile={isMobile} />
          </div>

          {/* Text block — right on desktop, first on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.expoOut, delay: 0.1 }}
            className="order-1 md:order-2 space-y-4 md:max-w-[500px]"
          >
            <div className="space-y-2">
              <p className="text-[13.2px] tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">
                Long-term brain health
              </p>
              <h2 className="flow-h2" style={{ fontSize: 'calc(var(--fs-h2) * 1.1)' }}>
                Chronic overstimulation quietly hinders the brain.
              </h2>
            </div>
            <p className="text-[15.4px] text-[rgba(30,24,84,0.78)] leading-relaxed">
              Modern life keeps the nervous system switched on &mdash; notifications, deadlines, and stimulants stacking until cortisol never fully settles, showing up as mood swings, foggy recall, and a stress response that won&rsquo;t ease. Flow works with the body&rsquo;s own chemistry instead of pushing it further: saffron and ginseng support healthy serotonin and dopamine activity, magnesium and rooibos help manage the body&rsquo;s everyday hormonal stress response, and Lion&rsquo;s Mane supports long-term cognitive vitality &mdash; for steadier mood, calmer stress, and clearer thinking.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

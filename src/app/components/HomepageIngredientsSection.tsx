'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { EASE, DURATION } from '@/lib/animation';

interface IngredientData {
  name: string;
  imageUrl?: string;
  blogSlug?: string;
}

interface IngredientMeta {
  dose: string;
  badge: string;
  benefit: string;
  title: string;
  description: string;
  pills: string[];
  stat: { value: string; label: string } | null;
}

const META: Record<string, IngredientMeta> = {
  'Zynamite®': {
    dose: '300 mg',
    badge: 'Caffeine alternative',
    benefit: 'Jitter-free sustained focus.',
    title: 'Jitter-free mental energy that lasts 5+ hours',
    description: 'Mangiferin — the active compound in Zynamite® — inhibits COMT, the enzyme that breaks down dopamine and noradrenaline. This keeps key neurotransmitters elevated for longer, activating the same brain areas as caffeine (frontal cortex, hippocampus) without raising heart rate or blood pressure. In double-blind RCTs, a single dose improved reaction time by 4.7%, attention accuracy by 9.7%, and processing speed by 11.5%, with effects sustained for at least 5 hours.',
    pills: ['Focus', 'Mental Clarity', 'Anti-Fatigue', 'No Jitters'],
    stat: { value: '+4.7%', label: 'reaction time — RCT, placebo-controlled' },
  },
  "Saffr'Active®": {
    dose: '50 mg',
    badge: 'Mood · Sleep · Focus',
    benefit: 'Balanced mood and clarity.',
    title: 'Mood, sleep and focus — backed by three independent RCTs',
    description: "Standardised to crocin and safranal, Saffr'Active® modulates serotonin, dopamine and GABA pathways. Three independent double-blind trials confirm: 6-week supplementation improves sleep quality, latency and duration; reduces depression and anxiety scores; and in children with ADHD, matches methylphenidate for hyperactivity while improving sleep onset. At 50 mg, this is the clinically validated dose.",
    pills: ['Mood', 'Sleep Quality', 'Anxiety Relief', 'ADHD Support'],
    stat: { value: '3 RCTs', label: 'sleep, mood & ADHD — all placebo-controlled' },
  },
  'TMG': {
    dose: '500 mg',
    badge: 'Methylation',
    benefit: 'Augmented brain and cellular energy.',
    title: 'Methyl donor for brain chemistry and long-term cognitive health',
    description: 'Trimethylglycine (TMG) donates methyl groups in the one-carbon cycle — the biochemical pathway responsible for converting homocysteine to methionine. Elevated homocysteine is strongly associated with cognitive decline and mood disruption. TMG keeps this conversion efficient, supporting healthy brain chemistry, neurotransmitter synthesis, and cellular energy production.',
    pills: ['Methylation', 'Brain Chemistry', 'Energy', 'Cognitive Health'],
    stat: null,
  },
  "Lion's Mane": {
    dose: '250 mg',
    badge: 'Neuroplasticity',
    benefit: 'Neuroprotection and gut-brain support.',
    title: 'The only known botanical to stimulate Nerve Growth Factor',
    description: "Lion's Mane (Hericium erinaceus) contains hericenones and erinacines — two classes of compounds that cross the blood-brain barrier and directly stimulate the synthesis of Nerve Growth Factor (NGF). NGF is essential for the growth, maintenance, and survival of neurons, playing a central role in neuroplasticity, memory formation, and long-term cognitive resilience.",
    pills: ['Memory', 'Neuroplasticity', 'Brain Health', 'NGF'],
    stat: null,
  },
};

const FALLBACK_META: IngredientMeta = {
  dose: '',
  badge: 'Cognitive support',
  benefit: 'Evidence-based cognitive support.',
  title: 'Evidence-based cognitive support',
  description: 'A clinically studied ingredient contributing to mental clarity, focus, and sustained cognitive performance.',
  pills: ['Cognitive Support'],
  stat: null,
};

interface ChartBar {
  label: string;
  active: number;
  comparator: number;
  unit: string;
  activeLabel?: string;
  comparatorLabel?: string;
}

interface ChartData {
  id: string;
  description: string;
  source: string;
  bars: ChartBar[];
}

const INGREDIENT_CHARTS: Record<string, ChartData[]> = {
  'Zynamite®': [
    {
      id: 'cognitive',
      description: 'Single-dose improvements vs placebo across 4 cognitive domains. Double-blind, placebo-controlled RCT.',
      source: 'Wightman et al., Nutrients 2020 · Castellote-Caballero et al., Pharmaceuticals 2025',
      bars: [
        { label: 'Reaction time', active: 4.7, comparator: -5.2, unit: '%' },
        { label: 'Attention accuracy', active: 9.7, comparator: 0, unit: '%' },
        { label: 'Processing speed', active: 11.5, comparator: 0, unit: '%' },
        { label: 'Emotional balance', active: 34.3, comparator: 0, unit: '%' },
      ],
    },
    {
      id: 'bioavailability',
      description: 'ZYN15 (our grade) is 4–5× more bioavailable than standard ZYN60 in the first hours after ingestion.',
      source: 'Nektium Pharma pharmacokinetic study, 2024',
      bars: [
        { label: '0–1 h', active: 4.61, comparator: 1, unit: '×', activeLabel: 'ZYN15', comparatorLabel: 'Standard' },
        { label: '0–2 h', active: 3.83, comparator: 1, unit: '×', activeLabel: 'ZYN15', comparatorLabel: 'Standard' },
        { label: '0–4 h', active: 3.25, comparator: 1, unit: '×', activeLabel: 'ZYN15', comparatorLabel: 'Standard' },
        { label: '0–6 h', active: 3.04, comparator: 1, unit: '×', activeLabel: 'ZYN15', comparatorLabel: 'Standard' },
      ],
    },
  ],
  "Saffr'Active®": [
    {
      id: 'sleep',
      description: '6-week supplementation improvements in sleep quality vs placebo. Randomized, double-blind, placebo-controlled trial (n=59).',
      source: 'Pachikian et al., Nutrients 2021',
      bars: [
        { label: 'Sleep quality (PSQI)', active: 15.3, comparator: 4.2, unit: '%', activeLabel: "Saffr'Active", comparatorLabel: 'Placebo' },
        { label: 'Sleep latency (PSQI)', active: 18.6, comparator: 7.9, unit: '%', activeLabel: "Saffr'Active", comparatorLabel: 'Placebo' },
        { label: 'Sleep duration (PSQI)', active: 36.6, comparator: -8.8, unit: '%', activeLabel: "Saffr'Active", comparatorLabel: 'Placebo' },
        { label: 'Time in bed (actigraphy)', active: 2.9, comparator: -1.8, unit: '%', activeLabel: "Saffr'Active", comparatorLabel: 'Placebo' },
      ],
    },
    {
      id: 'mood',
      description: 'Depression and anxiety score improvements over 6 weeks vs placebo. Randomized, double-blind trial (n=180).',
      source: 'Dormal et al., Nutrients 2025',
      bars: [
        { label: 'Depression (BDI)', active: 41.5, comparator: 36.7, unit: '%', activeLabel: "Saffr'Active", comparatorLabel: 'Placebo' },
        { label: 'Anxiety (STAI-S)', active: 16.7, comparator: 11.3, unit: '%', activeLabel: "Saffr'Active", comparatorLabel: 'Placebo' },
        { label: 'Positive affect (PANAS)', active: 14.0, comparator: 8.2, unit: '%', activeLabel: "Saffr'Active", comparatorLabel: 'Placebo' },
        { label: 'Life satisfaction (SWLS)', active: 15.5, comparator: 14.7, unit: '%', activeLabel: "Saffr'Active", comparatorLabel: 'Placebo' },
      ],
    },
    {
      id: 'adhd',
      description: 'Saffron vs methylphenidate in children with ADHD over 3 months. Both improved core symptoms comparably (n=63).',
      source: 'Blasco-Fontecilla et al., Nutrients 2022',
      bars: [
        { label: 'ADHD symptoms (CPRS)', active: 15.3, comparator: 13.2, unit: '%', activeLabel: 'Saffron', comparatorLabel: 'Methylph.' },
        { label: 'Executive function (BRIEF)', active: 13.8, comparator: 14.8, unit: '%', activeLabel: 'Saffron', comparatorLabel: 'Methylph.' },
        { label: 'Time to fall asleep', active: 20.0, comparator: 0, unit: '%', activeLabel: 'Saffron', comparatorLabel: 'Methylph.' },
      ],
    },
  ],
};

function MobileIngredientChart({ ingredientName }: { ingredientName: string }) {
  const [activeChart, setActiveChart] = useState(0);
  const charts = INGREDIENT_CHARTS[ingredientName];
  if (!charts) return null;

  const chart = charts[activeChart];
  const activeLabel = chart.bars[0]?.activeLabel ?? ingredientName.replace(/®/g, '');
  const comparatorLabel = chart.bars[0]?.comparatorLabel ?? 'Placebo';

  const svgW = 320;
  const svgH = 150;
  const padL = 26;
  const padR = 8;
  const padTop = 16;
  const padBottom = 34;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padTop - padBottom;
  const n = chart.bars.length;
  const groupW = chartW / n;
  const barW = Math.min(groupW * 0.36, 20);
  const gap = 3;

  const allVals = chart.bars.flatMap((b) => [b.active, b.comparator]);
  const maxVal = Math.max(...allVals) * 1.22;
  const minVal = Math.min(0, ...allVals) * 1.1;
  const range = maxVal - minVal;
  const zeroY = padTop + chartH * (maxVal / range);
  const toY = (v: number) => padTop + chartH * ((maxVal - v) / range);
  const toH = (v: number) => Math.abs(toY(v) - zeroY);

  const tickCount = 4;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => minVal + (range * i) / tickCount);

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-[#1E1854]/[0.10] bg-[#F8F8FC] p-3">
      <p className="text-[10px] text-[#1E1854]/60 leading-snug line-clamp-4">{chart.description}</p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-2.5 rounded-sm bg-[#1E1854] shrink-0" />
          <span className="text-[10px] font-semibold text-[#1E1854]/70">{activeLabel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-2.5 rounded-sm bg-[#1E1854]/22 shrink-0" />
          <span className="text-[10px] font-semibold text-[#1E1854]/40">{comparatorLabel}</span>
        </div>
      </div>
      <svg width={svgW} height={svgH} className="overflow-visible w-full" viewBox={`0 0 ${svgW} ${svgH}`}>
        {ticks.map((tv, ti) => {
          const ty = toY(tv);
          if (ty < padTop - 2 || ty > padTop + chartH + 2) return null;
          return (
            <g key={ti}>
              <line x1={padL - 3} y1={ty} x2={padL + chartW} y2={ty}
                stroke="rgba(30,24,84,0.08)" strokeWidth="1" strokeDasharray={tv === 0 ? 'none' : '2,3'} />
              {tv === 0 && <line x1={padL - 3} y1={ty} x2={padL + chartW} y2={ty} stroke="rgba(30,24,84,0.2)" strokeWidth="1" />}
              <text x={padL - 5} y={ty + 3} textAnchor="end" fontSize="7.5" fill="rgba(30,24,84,0.35)">
                {Math.abs(tv) >= 1 ? (tv < 0 ? tv.toFixed(0) : tv.toFixed(tv % 1 === 0 ? 0 : 1)) : ''}
              </text>
            </g>
          );
        })}
        {chart.bars.map((b, i) => {
          const cx = padL + i * groupW + groupW / 2;
          const aTop = b.active >= 0 ? toY(b.active) : zeroY;
          const aH = toH(b.active);
          const cTop = b.comparator >= 0 ? toY(b.comparator) : zeroY;
          const cH = toH(b.comparator);
          const aValY = b.active >= 0 ? aTop - 3 : aTop + aH + 9;
          const cValY = b.comparator >= 0 ? cTop - 3 : cTop + cH + 9;
          return (
            <g key={b.label}>
              <rect x={cx - barW - gap / 2} y={aTop} width={barW} height={Math.max(aH, 1)} rx="2" fill="rgba(30,24,84,0.82)" />
              <rect x={cx + gap / 2} y={cTop} width={barW} height={Math.max(cH, 1)} rx="2" fill="rgba(30,24,84,0.18)" />
              <text x={cx - barW / 2 - gap / 2} y={aValY} textAnchor="middle" fontSize="8" fontWeight="700" fill="rgba(30,24,84,0.75)">
                {b.unit === '%' ? `${b.active > 0 ? '+' : ''}${b.active}%` : `${b.active}×`}
              </text>
              {b.comparator !== 0 && (
                <text x={cx + barW / 2 + gap / 2} y={cValY} textAnchor="middle" fontSize="7.5" fill="rgba(30,24,84,0.35)">
                  {b.unit === '%' ? `${b.comparator > 0 ? '+' : ''}${b.comparator}%` : `${b.comparator}×`}
                </text>
              )}
              <text x={cx} y={svgH - 4} textAnchor="middle" fontSize="8" fill="rgba(30,24,84,0.45)">{b.label}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex items-center justify-between pt-2 border-t border-[#1E1854]/[0.14]">
        <p className="truncate flex-1 pr-3" style={{ fontSize: '9px', color: 'rgba(30,24,84,0.40)' }}>{chart.source}</p>
        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={() => setActiveChart((p) => (p - 1 + charts.length) % charts.length)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#1E1854]/10 text-[#1E1854]/70">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6.5 2L3.5 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[11px] font-semibold text-[#1E1854]/55 tabular-nums">{activeChart + 1}/{charts.length}</span>
          <button onClick={() => setActiveChart((p) => (p + 1) % charts.length)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#1E1854]/10 text-[#1E1854]/70">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function IngredientChart({ ingredientName, className = '' }: { ingredientName: string; className?: string }) {
  const [activeChart, setActiveChart] = useState(0);
  const charts = INGREDIENT_CHARTS[ingredientName];
  if (!charts) return null;

  const chart = charts[activeChart];
  const activeLabel = chart.bars[0]?.activeLabel ?? ingredientName.replace(/®/g, '');
  const comparatorLabel = chart.bars[0]?.comparatorLabel ?? 'Placebo';

  // SVG grouped bar chart
  const svgW = 288;
  const svgH = 140;
  const padL = 24;
  const padR = 8;
  const padTop = 16;
  const padBottom = 52;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padTop - padBottom;
  const n = chart.bars.length;
  const groupW = chartW / n;
  const barW = Math.min(groupW * 0.34, 18);
  const gap = 3;

  const allVals = chart.bars.flatMap((b) => [b.active, b.comparator]);
  const maxVal = Math.max(...allVals) * 1.22;
  const minVal = Math.min(0, ...allVals) * 1.1;
  const range = maxVal - minVal;
  const zeroY = padTop + chartH * (maxVal / range);
  const toY = (v: number) => padTop + chartH * ((maxVal - v) / range);
  const toH = (v: number) => Math.abs(toY(v) - zeroY);

  // Y-axis tick values
  const tickCount = 4;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => minVal + (range * i) / tickCount);

  return (
    <div className={`shrink-0 w-80 flex flex-col gap-2.5 rounded-xl border border-[#1E1854]/[0.10] bg-[#F8F8FC] p-4 ${className}`}>

      {/* Description */}
      <p className="text-xs text-[#1E1854]/60 leading-snug">{chart.description}</p>

      {/* Legend */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-2.5 rounded-sm bg-[#1E1854] shrink-0" />
          <span className="text-[10px] font-semibold text-[#1E1854]/70">{activeLabel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-2.5 rounded-sm bg-[#1E1854]/22 shrink-0" />
          <span className="text-[10px] font-semibold text-[#1E1854]/40">{comparatorLabel}</span>
        </div>
      </div>

      {/* SVG */}
      <div className="flex-1 min-h-0">
      <svg width="100%" height="100%" viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="xMidYMid meet" className="overflow-visible" style={{ minHeight: svgH }}>
        {/* Y-axis ticks + grid */}
        {ticks.map((tv, ti) => {
          const ty = toY(tv);
          if (ty < padTop - 2 || ty > padTop + chartH + 2) return null;
          return (
            <g key={ti}>
              <line x1={padL - 3} y1={ty} x2={padL + chartW} y2={ty}
                stroke="rgba(30,24,84,0.08)" strokeWidth="1" strokeDasharray={tv === 0 ? 'none' : '2,3'} />
              {tv === 0
                ? <line x1={padL - 3} y1={ty} x2={padL + chartW} y2={ty} stroke="rgba(30,24,84,0.2)" strokeWidth="1" />
                : null}
              <text x={padL - 5} y={ty + 3} textAnchor="end" fontSize="7.5" fill="rgba(30,24,84,0.35)">
                {Math.abs(tv) >= 1 ? (tv < 0 ? tv.toFixed(0) : tv.toFixed(tv % 1 === 0 ? 0 : 1)) : ''}
              </text>
            </g>
          );
        })}

        {/* Bars + labels */}
        {chart.bars.map((b, i) => {
          const cx = padL + i * groupW + groupW / 2;

          const aTop = b.active >= 0 ? toY(b.active) : zeroY;
          const aH = toH(b.active);
          const cTop = b.comparator >= 0 ? toY(b.comparator) : zeroY;
          const cH = toH(b.comparator);

          const aValY = b.active >= 0 ? aTop - 3 : aTop + aH + 9;
          const cValY = b.comparator >= 0 ? cTop - 3 : cTop + cH + 9;

          return (
            <g key={b.label}>
              {/* Active bar */}
              <rect x={cx - barW - gap / 2} y={aTop} width={barW} height={Math.max(aH, 1)} rx="2" fill="rgba(30,24,84,0.82)" />
              {/* Comparator bar */}
              <rect x={cx + gap / 2} y={cTop} width={barW} height={Math.max(cH, 1)} rx="2" fill="rgba(30,24,84,0.18)" />
              {/* Active value label */}
              <text x={cx - barW / 2 - gap / 2} y={aValY} textAnchor="middle" fontSize="8" fontWeight="700" fill="rgba(30,24,84,0.75)">
                {b.unit === '%'
                  ? `${b.active > 0 ? '+' : ''}${b.active}%`
                  : `${b.active}×`}
              </text>
              {/* Comparator value label — only if non-zero */}
              {b.comparator !== 0 && (
                <text x={cx + barW / 2 + gap / 2} y={cValY} textAnchor="middle" fontSize="7.5" fill="rgba(30,24,84,0.35)">
                  {b.unit === '%'
                    ? `${b.comparator > 0 ? '+' : ''}${b.comparator}%`
                    : `${b.comparator}×`}
                </text>
              )}
              {/* X label — split on space into up to 2 lines */}
              {(() => {
                const words = b.label.split(' ');
                const mid = Math.ceil(words.length / 2);
                const line1 = words.slice(0, mid).join(' ');
                const line2 = words.slice(mid).join(' ');
                return (
                  <text x={cx} y={svgH - (line2 ? 14 : 6)} textAnchor="middle" fontSize="8" fill="rgba(30,24,84,0.45)">
                    <tspan x={cx} dy="0">{line1}</tspan>
                    {line2 && <tspan x={cx} dy="10">{line2}</tspan>}
                  </text>
                );
              })()}
            </g>
          );
        })}
      </svg>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2.5 border-t border-[#1E1854]/[0.14]">
        <p className="truncate flex-1 pr-3" style={{ fontSize: '9px', color: 'rgba(30,24,84,0.40)' }}>{chart.source}</p>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setActiveChart((p) => (p - 1 + charts.length) % charts.length)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#1E1854]/10 text-[#1E1854]/70 hover:bg-[#1E1854]/20 hover:text-[#1E1854] transition-colors duration-200"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6.5 2L3.5 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[11px] font-semibold text-[#1E1854]/55 tabular-nums">{activeChart + 1}/{charts.length}</span>
          <button
            onClick={() => setActiveChart((p) => (p + 1) % charts.length)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#1E1854]/10 text-[#1E1854]/70 hover:bg-[#1E1854]/20 hover:text-[#1E1854] transition-colors duration-200"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

interface Props {
  ingredients: IngredientData[];
  sizes: string;
}

export default function HomepageIngredientsSection({ ingredients, sizes }: Props) {
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState<(IngredientData & IngredientMeta) | null>(null);
  const [descExpanded, setDescExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    setDescExpanded(false);
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  const cards = ingredients.map((ing) => ({ ...ing, ...(META[ing.name] ?? FALLBACK_META) }));
  const step = cards[active];

  return (
    <>
      <div ref={ref}>
        {/* Mobile: 2-col card grid → tap opens modal */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {cards.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl overflow-hidden cursor-pointer group bg-white border border-[#1E1854]/[0.08]"
              onClick={() => setModal(c)}
            >
              {/* Photo */}
              <div className="relative w-full h-[100px] overflow-hidden">
                {c.imageUrl && (
                  <Image
                    src={c.imageUrl}
                    alt={c.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2">
                  <p className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/55 mb-0.5">{c.dose}</p>
                  <p className="text-sm font-semibold text-white leading-snug">{c.name}</p>
                </div>
              </div>
              {/* Benefit strip */}
              <div className="px-3 py-2 bg-white">
                <p className="text-[11px] font-semibold text-[#1E1854] leading-snug">{c.benefit}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: selector top + detail panel below */}
        <div className="hidden md:flex flex-col gap-6">

          {/* Top — horizontal selector row */}
          <motion.div
            className="grid grid-cols-4 gap-2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.expoOut }}
          >
            {cards.map((c, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={c.name}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: DURATION.base, delay: 0.05 + i * 0.04, ease: EASE.expoOut }}
                  className={`
                    group relative w-full overflow-hidden rounded-xl flex flex-col bg-white
                    border-2 transition-[border-color,transform,box-shadow] duration-500
                    hover:scale-[1.01] active:scale-[0.99]
                    ${isActive
                      ? 'border-[#1E1854]/60 shadow-[0_4px_16px_rgba(30,24,84,0.20)]'
                      : 'border-transparent hover:border-[#1E1854]/20'
                    }
                  `}
                >
                  {/* Photo */}
                  <div className="relative w-full h-24 overflow-hidden">
                    {c.imageUrl && (
                      <Image
                        src={c.imageUrl}
                        alt={c.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="280px"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 text-left">
                      <p className="text-xs font-semibold text-white leading-snug">{c.name}</p>
                    </div>
                  </div>
                  {/* Benefit text below image */}
                  <div className="px-3 py-2.5 bg-white">
                    <p className="text-xs font-semibold tracking-[-0.01em] leading-snug text-[#1E1854]">
                      {c.benefit}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right — white detail card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden bg-white border border-[#1E1854]/[0.08] shadow-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: DURATION.slow, delay: 0.1, ease: EASE.expoOut }}
          >
            {/* Detail — re-keyed on active to trigger fade-up */}
            <div
              key={active}
              className="px-8 py-6 flex gap-8"
              style={{ animation: `hbFadeUp ${DURATION.base}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
            >
              {/* Left: text */}
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                {/* Eyebrow */}
                <span className="text-xs font-semibold tracking-[0.08em] uppercase bg-[#1E1854]/8 text-[#1E1854]/50 px-2.5 py-1 rounded-full self-start">
                  {step.badge} · {step.dose}
                </span>
                {/* Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {step.pills.map((pill) => (
                    <span key={pill} className="text-xs tracking-wide px-2.5 py-1 rounded-full bg-[#3B38B8]/8 text-[#3B38B8] font-medium border border-[#3B38B8]/15">
                      {pill}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-[#1E1854] tracking-[-0.02em] leading-snug">
                  {step.title}
                </h3>
                {step.stat && (
                  <div className="flex items-center gap-2 bg-[#F0EFFB] rounded-xl px-3 py-1.5 self-start">
                    <span className="text-sm font-bold text-[#1E1854] tabular-nums">{step.stat.value}</span>
                    <span className="text-xs text-[#1E1854]/55 leading-snug">{step.stat.label}</span>
                  </div>
                )}
                <p className="text-sm text-[#1E1854]/65 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Right: chart panel — shown for ingredients with data */}
              {INGREDIENT_CHARTS[step.name] && <IngredientChart ingredientName={step.name} className="self-stretch" />}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Mobile modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            onClick={() => setModal(null)}
          >
            <div className="absolute inset-0 bg-[#1E1854]/60 backdrop-blur-sm" />
            <motion.div
              className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92svh]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: DURATION.slow, ease: EASE.expoOut }}
              onClick={(e) => e.stopPropagation()}
            >
              {modal.imageUrl && (
                <div className="relative w-full h-28 sm:h-40 shrink-0 overflow-hidden rounded-t-3xl">
                  <Image src={modal.imageUrl} alt={modal.name} fill className="object-cover" sizes="448px" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
                </div>
              )}
              <button
                onClick={() => setModal(null)}
                aria-label="Close"
                className="absolute top-3 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#1E1854]/50 hover:text-[#1E1854] transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="flex-1 px-5 pt-4 overflow-y-auto" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-[#1E1854] tracking-[-0.02em] leading-snug">{modal.name}</h3>
                  <span className="inline-block text-[10px] tracking-[0.08em] uppercase font-semibold bg-[#1E1854]/8 text-[#1E1854]/55 px-2 py-1 rounded-full shrink-0 mt-0.5">
                    {modal.dose}
                  </span>
                </div>
                {/* Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {modal.pills.map((pill) => (
                    <span key={pill} className="text-xs tracking-wide px-2.5 py-1 rounded-full bg-[#3B38B8]/8 text-[#3B38B8] font-medium border border-[#3B38B8]/15">
                      {pill}
                    </span>
                  ))}
                </div>
                {/* Description with 4-line clamp + Read more */}
                <div className="mb-4">
                  <p className={`text-sm text-[#1E1854]/65 leading-[1.55] ${descExpanded ? '' : 'line-clamp-4'}`}>
                    {modal.description}
                  </p>
                  {!descExpanded && (
                    <button
                      onClick={() => setDescExpanded(true)}
                      className="mt-1 text-xs font-semibold text-[#3B38B8] hover:underline"
                    >
                      Read more
                    </button>
                  )}
                </div>
                {/* Chart */}
                {INGREDIENT_CHARTS[modal.name] && (
                  <div className="mb-4 -mx-1">
                    <MobileIngredientChart ingredientName={modal.name} />
                  </div>
                )}
                {!INGREDIENT_CHARTS[modal.name] && modal.stat && (
                  <div className="flex items-center gap-2.5 bg-[#F0EFFB] rounded-xl px-3 py-2 mb-4">
                    <span className="text-base font-bold text-[#1E1854] tabular-nums shrink-0">{modal.stat.value}</span>
                    <span className="text-xs text-[#1E1854]/55 leading-snug">{modal.stat.label}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { EASE, DURATION } from '@/lib/animation';
import { trackEvent } from '@/lib/clarity';
import { ga4SelectContent } from '@/lib/ga4';
import { useSwipeToClose } from '@/lib/useSwipeToClose';
import { ChartCard, Bars, Line, Dumbbell, MethylationDiagram, Stat } from '@/app/components/charts/IngredientCharts';

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
    description: 'Mangiferin, the active compound in Zynamite®, inhibits COMT, the enzyme that breaks down dopamine and noradrenaline. This keeps key neurotransmitters elevated for longer, activating the same brain areas as caffeine (frontal cortex, hippocampus) without raising heart rate or blood pressure. In double-blind RCTs, a single dose improved reaction time by 4.7%, attention accuracy by 9.7%, and processing speed by 11.5%, with effects sustained for at least 5 hours.',
    pills: ['Focus', 'Mental Clarity', 'Anti-Fatigue', 'No Jitters'],
    stat: { value: '+4.7%', label: 'reaction time: RCT, placebo-controlled' },
  },
  "Saffr'Active®": {
    dose: '50 mg',
    badge: 'Mood · Sleep · Focus',
    benefit: 'Balanced mood and clarity.',
    title: 'Mood and sleep: backed by placebo-controlled trials',
    description: "Standardised to crocin and safranal, Saffr'Active® is a saffron extract that works on serotonin, dopamine and GABA signalling. In placebo-controlled trials, six weeks of daily saffron improved self-reported sleep quality, latency and duration and eased low mood and everyday tension. A separate clinical study in children looked at attention and activity levels. The branded trials used roughly 15 to 30 mg per day; Flow doses at 50 mg.",
    pills: ['Mood', 'Sleep Quality', 'Emotional Balance', 'Calm Focus'],
    stat: { value: '2 RCTs', label: 'sleep and mood, both placebo-controlled' },
  },
  'TMG': {
    dose: '500 mg',
    badge: 'Methylation',
    benefit: 'Foundational support for methylation.',
    title: 'A methyl donor that helps keep your one-carbon cycle running',
    description: 'TMG (trimethylglycine) donates a methyl group that keeps the one-carbon cycle running — the process that recycles homocysteine into methionine and produces SAMe, which cells draw on to build neurotransmitters. Most human research is on exercise or pairs TMG with B vitamins; direct focus and mood evidence is still limited. It is the quiet, structural part of the formula: groundwork, not a same-day effect.',
    pills: ['Methylation', 'Homocysteine Metabolism', 'One-Carbon Cycle', 'Foundational'],
    stat: null,
  },
  "Lion's Mane": {
    dose: '250 mg',
    badge: 'Mental speed · Stress',
    benefit: 'Studied for mental speed and calm.',
    title: 'A mushroom studied for mental speed and steadier stress',
    description: "Lion's Mane (Hericium erinaceus) contains hericenones and erinacines — compounds that raise nerve growth factor (NGF) and BDNF in lab and animal studies, the proteins behind healthy neurons and new connections. Two separate trials found a single dose sped up mental-speed tasks in healthy adults within the hour, and over four weeks, stress scores in adults aged 18–45 trended lower than on placebo. The trials are small and used higher doses than Flow's, so it is here as a daily, long-term ingredient rather than a quick fix.",
    pills: ['Mental Speed', 'Stress Support', 'NGF Research', 'Long-Term Use'],
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

// Per-ingredient evidence charts. Each entry is one or more <ChartCard> panels;
// the panel wrapper adds prev/next controls when there is more than one.
// Numbers are drawn from the cited trials (or, for Zynamite/Saffr'Active, from
// the brand's own research dossier). See charts/IngredientCharts.tsx for the kit.
const INGREDIENT_CHARTS: Record<string, ReactNode[]> = {
  'Zynamite®': [
    <ChartCard
      key="cognition"
      meta={{
        description:
          'How a single 300 mg dose changed four mental-performance tests, measured against placebo. Two double-blind trials in healthy adults.',
        source: 'Wightman et al., Nutrients 2020 · Castellote-Caballero et al., Pharmaceuticals 2025',
        legend: [
          { label: 'Zynamite®', kind: 'brand' },
          { label: 'Placebo', kind: 'muted' },
        ],
      }}
    >
      <Bars
        rows={[
          { label: 'Reaction time', value: 4.7, comparator: -5.2 },
          { label: 'Attention accuracy', value: 9.7 },
          { label: 'Processing speed', value: 11.5 },
          { label: 'Emotional balance', value: 34.3 },
        ]}
      />
    </ChartCard>,
    <ChartCard
      key="absorption"
      meta={{
        description:
          'How much of the active compound reaches the blood over six hours — our ZYN15 grade against a standard mango leaf extract, set to 1×.',
        source: 'Nektium Pharma pharmacokinetic study, 2024',
        legend: [
          { label: 'ZYN15 (our grade)', kind: 'brand' },
          { label: 'Standard extract', kind: 'muted' },
        ],
      }}
    >
      <Line
        unit="×"
        xLabels={['0–1 h', '0–2 h', '0–4 h', '0–6 h']}
        series={[
          { label: 'ZYN15', kind: 'brand', points: [4.6, 3.8, 3.3, 3.0] },
          { label: 'Standard', kind: 'muted', points: [1, 1, 1, 1] },
        ]}
      />
    </ChartCard>,
  ],
  "Saffr'Active®": [
    <ChartCard
      key="sleep"
      meta={{
        description:
          'Each row is a sleep score after six weeks — saffron (blue) against placebo (grey). Further right is more improvement. Double-blind trial, 59 adults.',
        source: 'Pachikian et al., Nutrients 2021',
        legend: [
          { label: 'Saffron', kind: 'brand' },
          { label: 'Placebo', kind: 'muted' },
        ],
      }}
    >
      <Dumbbell
        controlLabel="Placebo"
        treatmentLabel="Saffron"
        rows={[
          { label: 'Sleep quality', control: 4.2, treatment: 15.3 },
          { label: 'Sleep latency', control: 7.9, treatment: 18.6 },
          { label: 'Sleep duration', control: -8.8, treatment: 36.6 },
        ]}
      />
    </ChartCard>,
    <ChartCard
      key="mood"
      meta={{
        description:
          'Each row is a mood or well-being score after six weeks — saffron (blue) against placebo (grey). Double-blind trial, 180 adults with low mood.',
        source: 'Saffron mood RCT · Nutrients, 2025',
        legend: [
          { label: 'Saffron', kind: 'brand' },
          { label: 'Placebo', kind: 'muted' },
        ],
      }}
    >
      <Dumbbell
        controlLabel="Placebo"
        treatmentLabel="Saffron"
        rows={[
          { label: 'Low mood score', control: 36.7, treatment: 41.5 },
          { label: 'Everyday tension', control: 11.3, treatment: 16.7 },
          { label: 'Positive affect', control: 8.2, treatment: 14.0 },
        ]}
      />
    </ChartCard>,
  ],
  'TMG': [
    <ChartCard
      key="methylation"
      meta={{
        headline: 'TMG keeps the methylation cycle topped up with methyl groups.',
        source: 'Mechanism of one-carbon metabolism (BHMT pathway) — not a measured outcome',
      }}
    >
      <MethylationDiagram />
    </ChartCard>,
  ],
  "Lion's Mane": [
    <ChartCard
      key="stress"
      meta={{
        headline: 'Over four weeks, stress scores trended lower on Lion’s Mane than on placebo.',
        description: 'Healthy adults 18–45, 4 weeks. Small pilot (n=41); overall effect borderline (p = 0.05).',
        source: 'Docherty et al., Nutrients 2023',
      }}
    >
      <Bars
        format="plain"
        unit=""
        note="Self-rated stress at 4 weeks · lower is better"
        rows={[
          { label: "Lion's Mane", value: 33 },
          { label: 'Placebo', value: 42.5, kind: 'muted' },
        ]}
      />
    </ChartCard>,
    <ChartCard
      key="acute-speed"
      meta={{
        headline: 'Two trials found a single dose sped up mental-speed tasks within the hour.',
        description: 'Two small acute trials in healthy adults. Docherty 2023: 688 vs 738 ms on the Stroop task (p = 0.005). La Monica 2023: faster reaction times, separate tasks.',
        source: 'Docherty et al., Nutrients 2023 · La Monica et al., Nutrients 2023',
      }}
    >
      <Stat value="+7%" caption="faster on the Stroop task than placebo" />
    </ChartCard>,
  ],
};

function IngredientChartPanel({ ingredientName }: { ingredientName: string }) {
  const charts = INGREDIENT_CHARTS[ingredientName];
  const [idx, setIdx] = useState(0);
  if (!charts) return null;
  const id = ingredientName.replace(/[®'\s]/g, '').toLowerCase();
  const clamped = Math.min(idx, charts.length - 1);
  return (
    <div className="flex flex-col gap-2 w-full md:w-80 md:shrink-0">
      {charts[clamped]}
      {charts.length > 1 && (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => { setIdx((p) => (p - 1 + charts.length) % charts.length); trackEvent(`homepage_${id}_chart_prev`); }}
            aria-label="Previous chart"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-ink/10 text-ink/70 hover:bg-ink/20 hover:text-ink transition-colors duration-200"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6.5 2L3.5 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-[11px] font-semibold text-ink/55 tabular-nums">{clamped + 1}/{charts.length}</span>
          <button
            onClick={() => { setIdx((p) => (p + 1) % charts.length); trackEvent(`homepage_${id}_chart_next`); }}
            aria-label="Next chart"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-ink/10 text-ink/70 hover:bg-ink/20 hover:text-ink transition-colors duration-200"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      )}
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
  const { panelProps, handleProps } = useSwipeToClose(() => setModal(null));

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
              className="rounded-2xl overflow-hidden cursor-pointer group bg-white border border-ink/[0.08]"
              onClick={() => { setModal(c); trackEvent('homepage_ingredient_card_open'); ga4SelectContent('ingredient_card', c.name); }}
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
                  <p className="text-sm font-semibold text-white leading-snug">{c.name}</p>
                </div>
              </div>
              {/* Benefit strip */}
              <div className="px-3 py-2 bg-white">
                <p className="text-[11px] font-semibold text-ink leading-snug">{c.benefit}</p>
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
                  onClick={() => { setActive(i); trackEvent('homepage_ingredient_card_open'); ga4SelectContent('ingredient_card', c.name); }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: DURATION.base, delay: 0.05 + i * 0.04, ease: EASE.expoOut }}
                  className={`
                    group relative w-full overflow-hidden rounded-xl flex flex-col bg-white
                    border-2 transition-[border-color,transform,box-shadow] duration-500
                    hover:scale-[1.01] active:scale-[0.99]
                    ${isActive
                      ? 'border-ink/60 shadow-[0_4px_16px_rgba(30,24,84,0.20)]'
                      : 'border-transparent hover:border-ink/20'
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
                    <p className="text-xs font-semibold tracking-[-0.01em] leading-snug text-ink">
                      {c.benefit}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right — white detail card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden bg-white border border-ink/[0.08] shadow-sm"
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
                <span className="text-xs font-semibold tracking-[0.08em] uppercase bg-ink/8 text-ink/50 px-2.5 py-1 rounded-full self-start">
                  {step.badge} · {step.dose}
                </span>
                {/* Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {step.pills.map((pill) => (
                    <span key={pill} className="text-xs tracking-wide px-2.5 py-1 rounded-full bg-brand/8 text-brand font-medium border border-brand/15">
                      {pill}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-ink tracking-[-0.02em] leading-snug">
                  {step.title}
                </h3>
                {step.stat && (
                  <div className="flex items-center gap-2 bg-[#F0EFFB] rounded-xl px-3 py-1.5 self-start">
                    <span className="text-sm font-bold text-ink tabular-nums">{step.stat.value}</span>
                    <span className="text-xs text-ink/55 leading-snug">{step.stat.label}</span>
                  </div>
                )}
                <p className="text-sm text-ink/65 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Right: chart panel — shown for ingredients with data */}
              {INGREDIENT_CHARTS[step.name] && <IngredientChartPanel ingredientName={step.name} />}
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
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
            <motion.div
              className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92svh]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: DURATION.slow, ease: EASE.expoOut }}
              onClick={(e) => e.stopPropagation()}
              {...panelProps}
            >
              <div
                {...handleProps}
                className="sm:hidden shrink-0 pt-2.5 pb-1 flex items-center justify-center touch-none cursor-grab active:cursor-grabbing"
              >
                <span className="w-10 h-1.5 rounded-full bg-ink/15" />
              </div>
              {modal.imageUrl && (
                <div className="relative w-full h-28 sm:h-40 shrink-0 overflow-hidden rounded-t-3xl">
                  <Image src={modal.imageUrl} alt={modal.name} fill className="object-cover" sizes="448px" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
                </div>
              )}
              <button
                onClick={() => setModal(null)}
                aria-label="Close"
                className="absolute top-3 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-ink/50 hover:text-ink transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="flex-1 px-5 pt-4 overflow-y-auto" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-ink tracking-[-0.02em] leading-snug">{modal.name}</h3>
                  <span className="inline-block text-micro tracking-[0.08em] uppercase font-semibold bg-ink/8 text-ink/55 px-2 py-1 rounded-full shrink-0 mt-0.5">
                    {modal.dose}
                  </span>
                </div>
                {/* Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {modal.pills.map((pill) => (
                    <span key={pill} className="text-xs tracking-wide px-2.5 py-1 rounded-full bg-brand/8 text-brand font-medium border border-brand/15">
                      {pill}
                    </span>
                  ))}
                </div>
                {/* Description with 4-line clamp + Read more */}
                <div className="mb-4">
                  <p className={`text-sm text-ink/65 leading-[1.55] ${descExpanded ? '' : 'line-clamp-4'}`}>
                    {modal.description}
                  </p>
                  {!descExpanded && (
                    <button
                      onClick={() => setDescExpanded(true)}
                      className="mt-1 text-xs font-semibold text-brand hover:underline"
                    >
                      Read more
                    </button>
                  )}
                </div>
                {/* Chart */}
                {INGREDIENT_CHARTS[modal.name] && (
                  <div className="mb-4">
                    <IngredientChartPanel ingredientName={modal.name} />
                  </div>
                )}
                {!INGREDIENT_CHARTS[modal.name] && modal.stat && (
                  <div className="flex items-center gap-2.5 bg-[#F0EFFB] rounded-xl px-3 py-2 mb-4">
                    <span className="text-base font-bold text-ink tabular-nums shrink-0">{modal.stat.value}</span>
                    <span className="text-xs text-ink/55 leading-snug">{modal.stat.label}</span>
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

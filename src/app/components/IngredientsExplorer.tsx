'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { trackEvent } from '@/lib/clarity';

type Ingredient = {
  name: string;
  dose: string;
  benefit: string;
  science: string;
  image: string;
  imageAlt: string;
  healthCategory: string;
  functionCategory: string;
  scienceCard?: React.ReactNode;
};

function ZynamiteScienceCard() {
  const metrics = [
    { label: 'Reaction time', value: 4.7, unit: '%', note: 'improvement vs −5.2% placebo' },
    { label: 'Attention accuracy', value: 9.7, unit: '%', note: 'enhanced vs baseline' },
    { label: 'Processing speed', value: 11.5, unit: '%', note: 'faster task completion' },
    { label: 'Emotional balance', value: 34.3, unit: '%', note: 'reduction in mood disturbance' },
  ];

  const comparisons = [
    { aspect: 'Onset', caffeine: '~1 h', zynamite: '~1 h' },
    { aspect: 'Duration', caffeine: '~2 h', zynamite: '~5 h' },
    { aspect: 'Jitters', caffeine: true, zynamite: false },
    { aspect: 'Crash', caffeine: true, zynamite: false },
    { aspect: 'Tolerance buildup', caffeine: true, zynamite: false },
    { aspect: 'Heart rate increase', caffeine: true, zynamite: false },
  ];

  const maxValue = Math.max(...metrics.map((m) => m.value));

  return (
    <div className="mt-2 rounded-xl bg-[#F4F3FB] p-4 space-y-4 border border-ink/[0.07]">
      {/* Header */}
      <div className="flex items-start gap-2">
        <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-ink flex items-center justify-center">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4.5L3 6.5L7 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <p className="text-xs font-semibold text-ink uppercase tracking-[0.08em]">Clinical evidence — RCT, double-blind, placebo-controlled</p>
      </div>

      {/* Bar chart */}
      <div className="space-y-2.5">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-ink/70 tracking-[-0.01em]">{m.label}</span>
              <span className="text-[11px] font-bold text-ink tabular-nums">+{m.value}{m.unit}</span>
            </div>
            <div className="relative h-2 rounded-full bg-ink/[0.08] overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-ink"
                style={{ width: `${(m.value / maxValue) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-ink/40 leading-none">{m.note}</p>
          </div>
        ))}
        <p className="text-[9px] text-ink/30 pt-0.5">Sources: Wightman et al., Nutrients 2020; Castellote-Caballero et al., Pharmaceuticals 2025</p>
      </div>

      {/* Comparison table */}
      <div>
        <p className="text-[10px] font-semibold text-ink/50 uppercase tracking-[0.08em] mb-1.5">vs Caffeine</p>
        <div className="rounded-lg overflow-hidden border border-ink/[0.08]">
          <div className="grid grid-cols-3 bg-ink/[0.06] px-3 py-1.5">
            <span className="text-[9px] font-semibold text-ink/40 uppercase tracking-[0.06em]"></span>
            <span className="text-[9px] font-semibold text-ink/40 uppercase tracking-[0.06em] text-center">Caffeine</span>
            <span className="text-[9px] font-semibold text-ink uppercase tracking-[0.06em] text-center">Zynamite®</span>
          </div>
          {comparisons.map((row, i) => (
            <div key={row.aspect} className={`grid grid-cols-3 px-3 py-1.5 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F4F3FB]'}`}>
              <span className="text-[10px] text-ink/60 font-medium leading-none self-center">{row.aspect}</span>
              <div className="flex justify-center self-center">
                {typeof row.caffeine === 'boolean' ? (
                  row.caffeine ? (
                    <span className="text-[10px] text-[#D94F4F] font-semibold">✕</span>
                  ) : (
                    <span className="text-[10px] text-[#2A9D6B] font-semibold">✓</span>
                  )
                ) : (
                  <span className="text-[10px] text-ink/50 tabular-nums">{row.caffeine}</span>
                )}
              </div>
              <div className="flex justify-center self-center">
                {typeof row.zynamite === 'boolean' ? (
                  row.zynamite ? (
                    <span className="text-[10px] text-[#D94F4F] font-semibold">✕</span>
                  ) : (
                    <span className="text-[10px] text-[#2A9D6B] font-semibold">✓</span>
                  )
                ) : (
                  <span className="text-[10px] font-semibold text-ink tabular-nums">{row.zynamite}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const allIngredients: Ingredient[] = [
  {
    name: 'Hibiscus Extract',
    dose: '1,750 mg',
    benefit: 'Rich in anthocyanins and polyphenols, Hibiscus sabdariffa neutralises oxidative stress in vascular tissue and supports cerebral blood flow — improving oxygen and nutrient delivery, the foundation for calm, sustained mental performance.',
    science: 'A vibrant floral extract from the calyces of Hibiscus sabdariffa, rich in anthocyanins and polyphenols. Its compounds help modulate oxidative stress and support vascular function, which can contribute to clearer thinking and steadier energy.',
    image: '/ingredients/hibiscus.png',
    imageAlt: 'Dried hibiscus sabdariffa flowers — antioxidant-rich botanical in Flow Health cognitive supplement',
    healthCategory: 'Cellular Health & Methylation',
    functionCategory: 'Plant Extracts',
  },
  {
    name: 'Rooibos Extract',
    dose: '625 mg',
    benefit: 'Rooibos contains aspalathin, which modulates the HPA axis — the body\'s central stress regulation system. By reducing excess cortisol signalling, it eases the physiological tension that makes focus and calm harder to sustain under pressure.',
    science: 'A caffeine-free herbal extract from the South African rooibos plant, rich in unique polyphenols like aspalathin. Its antioxidants help neutralize free radicals and modulate oxidative stress in neural tissue, contributing to better redox balance.',
    image: '/ingredients/rooibos.png',
    imageAlt: 'South African rooibos herbal extract — caffeine-free polyphenol antioxidant in Flow Health formula',
    healthCategory: 'Mood & Emotional Balance',
    functionCategory: 'Plant Extracts',
  },
  {
    name: 'Zynamite® (Mango Leaf Extract)',
    dose: '300 mg',
    benefit: 'In double-blind RCTs, Zynamite® improved reaction time by 4.7%, attention accuracy by 9.7%, and reduced mood disturbance by 34.3% — effects lasting 5+ hours. It crosses the blood-brain barrier and activates the same neural circuits as caffeine, but without jitters, crashes, or tolerance buildup. Its active compound, mangiferin, inhibits COMT — the enzyme that breaks down dopamine and noradrenaline — sustaining higher neurotransmitter levels for longer.',
    science: 'Mangiferin (from Mangifera indica leaves) inhibits COMT, an enzyme that degrades dopamine, adrenaline, and noradrenaline. This prolongs the presence of these neurotransmitters in the frontal cortex and hippocampus — the areas governing attention, working memory, and decision-making — without stimulating the cardiovascular system.',
    image: '/ingredients/mangifera.png',
    imageAlt: 'Zynamite mango leaf extract (Mangifera indica) — clinically studied nootropic for focus and mental energy in Flow Health',
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Plant Extracts',
    scienceCard: <ZynamiteScienceCard />,
  },
  {
    name: 'Green Tea Extract',
    dose: '250 mg',
    benefit: 'Natural caffeine and L-theanine promote alpha brainwave activity — the neural signature of relaxed alertness. This pairing amplifies dopamine and norepinephrine signalling to sustain focused attention without the spike-and-crash of isolated stimulants.',
    science: 'A concentrated source of natural caffeine and L-theanine from Camellia sinensis. The combination promotes alpha brain waves associated with relaxed alertness while gently increasing dopamine and norepinephrine signaling for focused energy.',
    image: '/ingredients/green-tea.png',
    imageAlt: 'Green tea extract (Camellia sinensis) with L-theanine and natural caffeine — sustained focus ingredient in Flow Health',
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Plant Extracts',
  },
  {
    name: "Lion's Mane Mushroom",
    dose: '250 mg',
    benefit: 'Hericenones and erinacines cross the blood-brain barrier and stimulate Nerve Growth Factor (NGF) synthesis — essential for neuronal growth and maintenance. Lion\'s Mane is one of the few compounds with genuine evidence for supporting neuroplasticity and long-term cognitive resilience.',
    science: 'A medicinal mushroom (Hericium erinaceus) containing hericenones and erinacines. Its compounds stimulate nerve growth factor (NGF) production, encouraging neuroplasticity and protecting neurons from everyday wear.',
    image: '/ingredients/lions-mane.png',
    imageAlt: "Lion's mane mushroom (Hericium erinaceus) — NGF-stimulating nootropic for neuroplasticity and brain health in Flow Health",
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Adaptogens',
  },
  {
    name: 'Ginseng Panax',
    dose: '200 mg',
    benefit: 'Ginsenosides modulate dopamine and acetylcholine systems — both central to working memory and sustained attention. Research shows measurable reductions in mental fatigue under cognitive load, supporting enduring performance through demanding days.',
    science: 'Root extract from Panax ginseng, standardized for ginsenosides. Ginsenosides modulate neurotransmitter systems and help regulate stress response, promoting balanced energy and mental stamina.',
    image: '/ingredients/ginseng-panax.png',
    imageAlt: 'Panax ginseng root extract standardized for ginsenosides — adaptogen for cognitive performance and mental stamina in Flow Health',
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Adaptogens',
  },
  {
    name: "Saffr'Active® (Saffron Extract)",
    dose: '50 mg',
    benefit: 'Standardised to crocin and safranal, Saffr\'Active® influences serotonin reuptake and supports BDNF — critical for mood regulation and neuronal health. Clinical studies confirm meaningful improvements in mood and emotional resilience.',
    science: 'A standardized saffron extract (Crocus sativus) rich in crocin and safranal. Its bioactive compounds influence serotonin and dopamine pathways while offering antioxidant protection to brain cells.',
    image: '/ingredients/saffran.png',
    imageAlt: "Saffr'Active saffron extract (Crocus sativus) — mood-lifting serotonin and dopamine support ingredient in Flow Health",
    healthCategory: 'Mood & Emotional Balance',
    functionCategory: 'Plant Extracts',
  },
  {
    name: 'Inulin',
    dose: '1,345 mg',
    benefit: 'Fermented by gut microbiota into butyrate, inulin regulates intestinal permeability and modulates the vagus nerve — a direct pathway to the brain. A healthier microbiome is linked to improved mood stability, lower neuroinflammation, and greater cognitive flexibility.',
    science: 'A naturally occurring prebiotic fiber derived from plants. Fermented by gut microbes into short-chain fatty acids, it helps regulate inflammation and neurotransmitter signaling along the gut-brain axis.',
    image: '/ingredients/inulin.png',
    imageAlt: 'Inulin prebiotic fiber — gut-brain axis support ingredient that feeds beneficial microbiome bacteria in Flow Health',
    healthCategory: 'Gut-Brain Axis',
    functionCategory: 'Gut Health',
  },
  {
    name: 'Betaine (Trimethylglycine)',
    dose: '500 mg',
    benefit: 'As a methyl donor, betaine converts homocysteine to methionine in the one-carbon cycle. Elevated homocysteine is linked to cognitive decline and mood disruption — making TMG\'s role in this balance directly relevant to long-term brain health.',
    science: 'A naturally occurring compound found in beets and other plants, also known as TMG. As a methyl donor, betaine assists in converting homocysteine back to methionine, supporting cellular methylation processes important for brain chemistry and energy metabolism.',
    image: '/ingredients/tmg.png',
    imageAlt: 'Betaine trimethylglycine (TMG) from beet root — methyl donor for homocysteine balance and brain chemistry in Flow Health',
    healthCategory: 'Cellular Health & Methylation',
    functionCategory: 'Amino Acids',
  },
  {
    name: 'Magnesium Citrate',
    dose: '680 mg',
    benefit: 'A cofactor in over 300 enzymatic reactions, magnesium governs GABA — the brain\'s primary inhibitory neurotransmitter. Low levels cause nervous system hyperexcitability: tension, poor sleep, and stress reactivity. Citrate form ensures high bioavailability.',
    science: 'A highly bioavailable form of magnesium bound to citric acid. Magnesium acts as a cofactor in over 300 enzymatic reactions, including those regulating neurotransmitters like GABA and modulating the HPA axis for calmer nervous system function.',
    image: '/ingredients/magnesium.png',
    imageAlt: 'Magnesium citrate — bioavailable magnesium for GABA regulation, relaxation, and nervous system calm in Flow Health',
    healthCategory: 'Mood & Emotional Balance',
    functionCategory: 'Minerals',
  },
  {
    name: 'Sodium Citrate',
    dose: '400 mg',
    benefit: 'Sodium citrate maintains cellular fluid balance and membrane potential — the electrochemical gradient neurons rely on to fire efficiently. Proper sodium regulation supports nutrient transport across cell membranes and the stable environment needed for consistent cognitive output.',
    science: 'A highly bioavailable form of sodium used as a gentle electrolyte. Sodium citrate provides readily available sodium ions that assist in regulating fluid levels, enhancing cellular hydration, and optimizing the transport of other key nutrients across cell membranes — creating the ideal internal environment for calm, steady energy and clear focus.',
    image: '/ingredients/sodium-citrate.png',
    imageAlt: 'Sodium citrate electrolyte — cellular hydration and nutrient absorption support for steady mental clarity in Flow Health',
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Minerals',
  },
  {
    name: 'Zinc',
    dose: '7 mg',
    benefit: 'Zinc modulates synaptic signalling at NMDA receptors and supports enzymes involved in dopamine synthesis and antioxidant defence. It also drives BDNF expression — critical for learning and memory consolidation. Most people are suboptimally dosed.',
    science: 'An essential trace mineral in a bioavailable form. Zinc modulates synaptic signaling (especially glutamate and GABA) and acts as a cofactor in enzymes involved in DNA synthesis and antioxidant defense in the brain.',
    image: '/ingredients/zinc.png',
    imageAlt: 'Zinc trace mineral — synaptic signaling cofactor for neurotransmitter function and cognitive health in Flow Health',
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Minerals',
  },
  {
    name: 'B-Vitamins (B1, B3, B6, B12)',
    dose: '2.875 mg',
    benefit: 'Essential cofactors for ATP production and the biosynthesis of dopamine, serotonin, and norepinephrine. B6 and B12 drive methylation and homocysteine regulation, while B3 supports NAD+ — central to cellular energy and neuronal repair.',
    science: 'Essential B-complex vitamins in active or highly bioavailable forms. These vitamins serve as cofactors in converting food into cellular energy (ATP) and in synthesizing dopamine, serotonin, and other key brain chemicals.',
    image: '/ingredients/vitamin-b.png',
    imageAlt: 'B-complex vitamins B1 B3 B6 B12 — energy metabolism cofactors for dopamine and serotonin synthesis in Flow Health',
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Vitamins',
  },
  {
    name: 'Pomegranate Flavour',
    dose: '125 mg',
    benefit: 'Natural pomegranate flavouring makes the formula genuinely enjoyable to take. Consistency is the single most important factor in realising the compounding benefits of evidence-based supplementation — a ritual you look forward to is one you actually keep.',
    science: 'A natural flavouring derived from pomegranate. As a natural flavour, it has no direct physiological effect but improves palatability, supporting consistent daily use and turning your ritual into something you genuinely enjoy.',
    image: '/ingredients/pomegranate.png',
    imageAlt: 'Natural pomegranate flavour — clean taste ingredient for daily consistency in the Flow Health cognitive supplement sachet',
    healthCategory: 'Mood & Emotional Balance',
    functionCategory: 'Plant Extracts',
  },
];

const healthCategoryMeta: Record<string, string> = {
  'Cognitive Performance': 'Clinically studied extracts, minerals, and vitamins that sharpen focus, sustain energy, reduce mental fatigue, and support long-term neurotransmitter production.',
  'Mood & Emotional Balance': 'Botanical extracts and bioavailable minerals that gently modulate serotonin, dopamine, and GABA pathways to lift mood, ease tension, and promote calm.',
  'Gut-Brain Axis': 'Prebiotic fiber that feeds the microbiome and strengthens the communication pathway between the gut and the brain.',
  'Cellular Health & Methylation': 'Antioxidant botanicals and methyl-donor compounds that support healthy methylation cycles, protect neural tissue at the cellular level, and maintain balanced brain chemistry.',
};

const functionCategoryMeta: Record<string, string> = {
  'Adaptogens': 'Functional mushrooms and root extracts that help the body adapt to stress, support mental stamina, and promote balanced energy without stimulants.',
  'Amino Acids': 'Naturally occurring compounds that serve as methyl donors and building blocks for neurotransmitters, supporting brain chemistry, methylation, and cellular energy.',
  'Plant Extracts': 'Polyphenol-rich botanicals, floral extracts, and herbal concentrates that protect neural tissue, support vascular function, and drive cognitive and emotional performance.',
  'Minerals': 'Essential trace minerals and electrolytes that support enzyme activity, neurotransmitter signaling, cellular hydration, and a calm, regulated nervous system.',
  'Vitamins': 'Essential B-complex vitamins in active forms that serve as cofactors for energy metabolism and the synthesis of dopamine, serotonin, and other key brain chemicals.',
  'Gut Health': 'Prebiotic fiber that nourishes the microbiome and strengthens the gut-brain axis, influencing mood, cognitive flexibility, and neurotransmitter balance.',
};

// Keep sections export for backward compat (ingredients page flip cards)
export const sections = Object.entries(
  allIngredients.reduce<Record<string, { category: string; description: string; ingredients: Ingredient[] }>>(
    (acc, ing) => {
      const cat = ing.functionCategory;
      if (!acc[cat]) acc[cat] = { category: cat, description: functionCategoryMeta[cat] ?? '', ingredients: [] };
      acc[cat].ingredients.push(ing);
      return acc;
    },
    {}
  )
).map(([, v]) => v);

export const filterGroups = [
  { label: 'Health Benefits', id: '__health_benefits__' },
  { label: 'Ingredient Function', id: '__ingredient_function__' },
];

function buildGroupedSections(mode: 'health' | 'function') {
  const catField = mode === 'health' ? 'healthCategory' : 'functionCategory';
  const metaMap = mode === 'health' ? healthCategoryMeta : functionCategoryMeta;
  const grouped = new Map<string, Ingredient[]>();
  for (const ing of allIngredients) {
    const cat = ing[catField];
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(ing);
  }
  return Array.from(grouped.entries()).map(([category, ingredients]) => ({
    category,
    description: metaMap[category] ?? '',
    ingredients,
  }));
}

interface Props {
  scrollOnFilter?: boolean;
  clarityPrefix?: string;
  visibleLimit?: number;
}

export default function IngredientsExplorer({
  scrollOnFilter = true,
  clarityPrefix = 'ingredients',
  visibleLimit = 6,
}: Props) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_LIMIT = visibleLimit;
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const textMode: 'both' | 'benefit' | 'science' =
    activeGroup === '__health_benefits__' ? 'benefit' : activeGroup === '__ingredient_function__' ? 'science' : 'both';

  const effectiveSections = activeGroup
    ? buildGroupedSections(activeGroup === '__health_benefits__' ? 'health' : 'function')
    : sections;

  const filtered = activeCategory
    ? effectiveSections.filter((s) => s.category === activeCategory)
    : effectiveSections;

  const totalCount = allIngredients.length;

  const shouldLimit = !activeGroup && !activeCategory && !showAll && VISIBLE_LIMIT > 0;
  let remaining = VISIBLE_LIMIT;
  const displaySections = filtered.map((section) => {
    const visible = shouldLimit ? section.ingredients.slice(0, Math.max(0, remaining)) : section.ingredients;
    remaining -= section.ingredients.length;
    return { ...section, visibleIngredients: visible };
  }).filter((s) => s.visibleIngredients.length > 0);
  const hiddenCount = shouldLimit ? Math.max(0, totalCount - VISIBLE_LIMIT) : 0;

  const selectFilter = (groupId: string | null, categoryId?: string) => {
    trackEvent(`${clarityPrefix}_filter_${categoryId ?? groupId ?? 'all'}`);
    setActiveGroup(groupId);
    setActiveCategory(categoryId ?? null);
    setShowAll(false);
    if (!scrollOnFilter) {
      requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 112;
        if (top < window.scrollY) {
          const start = window.scrollY;
          const distance = top - start;
          const duration = 700;
          let startTime: number | null = null;
          const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, start + distance * easeInOutQuart(progress));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
      return;
    }
    requestAnimationFrame(() => {
      if (!contentRef.current) return;
      const target = contentRef.current.getBoundingClientRect().top + window.scrollY - 112;
      const start = window.scrollY;
      const distance = target - start;
      const duration = 700;
      let startTime: number | null = null;
      const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + distance * easeInOutQuart(progress));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };

  const sidebarBtn = (label: string, count: number | null, isActive: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors duration-200 ${
        isActive
          ? 'bg-ink text-white'
          : 'text-ink/60 hover:text-ink hover:bg-ink/[0.04]'
      }`}
    >
      <span className="font-medium tracking-[-0.01em]">{label}</span>
      {count !== null && <span className={`text-xs tabular-nums ${isActive ? 'text-white/60' : 'text-ink/30'}`}>{count}</span>}
    </button>
  );

  return (
    <div ref={sectionRef} className="flex items-start gap-8 lg:gap-12">

      {/* Left sidebar filter (desktop) */}
      <aside className="hidden md:flex flex-col gap-2 w-52 lg:w-56 shrink-0 sticky top-24">
        {sidebarBtn('All ingredients', totalCount, !activeGroup && !activeCategory, () => selectFilter(null))}
        <div className="border-t border-ink/[12.5%] my-2" />
        {filterGroups.map((group) => {
          const groupSections = buildGroupedSections(group.id === '__health_benefits__' ? 'health' : 'function');
          return (
            <div key={group.id} className="space-y-0.5">
              {sidebarBtn(group.label, null, activeGroup === group.id && !activeCategory, () => selectFilter(group.id))}
              {groupSections.map((s) => (
                <button
                  key={s.category}
                  onClick={() => selectFilter(group.id, s.category)}
                  className={`w-full flex items-center justify-between pl-6 pr-3 py-1.5 rounded-xl text-xs transition-colors duration-200 ${
                    activeCategory === s.category && activeGroup === group.id
                      ? 'bg-ink/10 text-ink font-semibold'
                      : 'text-ink/45 hover:text-ink hover:bg-ink/[0.04]'
                  }`}
                >
                  <span className="tracking-[-0.01em]">{s.category}</span>
                  <span className="tabular-nums text-ink/30">{s.ingredients.length}</span>
                </button>
              ))}
            </div>
          );
        })}
      </aside>

      {/* Mobile filter (horizontal scroll) */}
      <div className="flex flex-col gap-6 flex-1 min-w-0">
        <div className="md:hidden">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 no-scrollbar">
            <button
              onClick={() => selectFilter(null)}
              className={`shrink-0 text-xs tracking-[0.1em] uppercase font-medium px-4 py-2 rounded-full border transition-colors ${!activeGroup && !activeCategory ? 'bg-ink text-white border-ink' : 'border-ink/[12.5%] text-ink/50'}`}
            >
              All
            </button>
            {filterGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => selectFilter(group.id)}
                className={`shrink-0 text-xs tracking-[0.1em] uppercase font-medium px-4 py-2 rounded-full border transition-colors ${activeGroup === group.id && !activeCategory ? 'bg-ink text-white border-ink' : 'border-ink/[12.5%] text-ink/50'}`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div ref={contentRef} className="space-y-10">
          {displaySections.map((section) => (
            <div key={section.category} className="rounded-2xl bg-[#F8F8FC] p-5 space-y-4 scroll-mt-28" id={section.category}>
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.02em]">{section.category}</h2>
                <p className="text-sm text-[rgba(30,24,84,0.6)] leading-relaxed mt-1">{section.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.visibleIngredients.map((ing) => (
                  <div key={ing.name} className="group rounded-xl border border-ink/[0.07] flex flex-col bg-white shadow-sm shadow-ink/[0.04] hover:shadow-xl hover:shadow-ink/[0.10] hover:-translate-y-0.5 transition-all duration-500 overflow-hidden">
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={ing.image}
                        alt={ing.imageAlt || ing.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      {ing.dose && (
                        <span className="absolute bottom-3 left-3 text-xs tracking-[0.08em] uppercase font-semibold bg-white/15 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-white/20">
                          {ing.dose}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                      <h3 className="text-base font-semibold tracking-[-0.02em] leading-snug text-ink">{ing.name}</h3>
                      {(textMode === 'both' || textMode === 'benefit') && (
                        <p className="text-sm text-[rgba(30,24,84,0.78)] leading-relaxed">{ing.benefit}</p>
                      )}
                      {(textMode === 'both' || textMode === 'science') && (
                        <p className={`leading-[1.7] ${textMode === 'science' ? 'text-sm text-[rgba(30,24,84,0.78)]' : 'text-xs text-[rgba(30,24,84,0.42)]'}`}>{ing.science}</p>
                      )}
                      {ing.scienceCard}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {hiddenCount > 0 && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full py-3 text-sm font-medium tracking-[-0.01em] text-ink/60 hover:text-ink border border-ink/[0.10] hover:border-ink/[0.25] rounded-xl transition-colors duration-200"
            >
              Show {hiddenCount} more ingredient{hiddenCount > 1 ? 's' : ''}
            </button>
          )}
          {showAll && !activeGroup && !activeCategory && (
            <button
              onClick={() => setShowAll(false)}
              className="w-full py-3 text-sm font-medium tracking-[-0.01em] text-ink/60 hover:text-ink border border-ink/[0.10] hover:border-ink/[0.25] rounded-xl transition-colors duration-200"
            >
              Show less
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

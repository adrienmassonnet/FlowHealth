'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { trackEvent } from '@/lib/clarity';

export const sections = [
  {
    category: 'Botanicals & Antioxidants',
    description: 'Polyphenol-rich plant extracts that protect neural tissue from oxidative stress, support vascular function, and promote calm mental performance.',
    ingredients: [
      {
        name: 'Hibiscus Extract',
        dose: '1,750 mg',
        benefit: 'Offers gentle antioxidant support and may help maintain calm mental performance while supporting healthy blood flow and glucose response after meals.',
        science: 'A vibrant floral extract from the calyces of Hibiscus sabdariffa, rich in anthocyanins and polyphenols. Its compounds help modulate oxidative stress and support vascular function, which can contribute to clearer thinking and steadier energy.',
        image: '/ingredients/hibiscus.png',
      },
      {
        name: 'Rooibos Extract',
        dose: '625 mg',
        benefit: 'Provides antioxidant protection and may help reduce feelings of everyday stress while supporting overall calm.',
        science: 'A caffeine-free herbal extract from the South African rooibos plant, rich in unique polyphenols like aspalathin. Its antioxidants help neutralize free radicals and modulate oxidative stress in neural tissue, contributing to better redox balance.',
        image: '/ingredients/rooibos.png',
      },
    ],
  },
  {
    category: 'Cognitive Performance',
    description: 'Clinically studied extracts that sharpen focus, reduce mental fatigue, and support long-term brain health and neuroplasticity.',
    ingredients: [
      {
        name: 'Zynamite® (Mango Leaf Extract)',
        dose: '300 mg',
        benefit: 'Delivers fast-acting mental clarity, improves reaction time, and reduces mental fatigue without affecting heart rate or blood pressure.',
        science: 'A standardized extract from mango leaves (Mangifera indica), rich in mangiferin. Mangiferin modulates brain wave activity and supports efficient energy use in neurons, promoting alert yet calm performance that can last several hours.',
        image: '/ingredients/mangifera.png',
      },
      {
        name: 'Green Tea Extract',
        dose: '250 mg',
        benefit: 'Provides smooth, jitter-free energy and sustained attention when paired with L-theanine.',
        science: 'A concentrated source of natural caffeine and L-theanine from Camellia sinensis. The combination promotes alpha brain waves associated with relaxed alertness while gently increasing dopamine and norepinephrine signaling for focused energy.',
        image: '/ingredients/green-tea.png',
      },
      {
        name: "Lion's Mane Mushroom",
        dose: '250 mg',
        benefit: 'Supports nerve health, mental clarity, and long-term cognitive vitality.',
        science: "A medicinal mushroom (Hericium erinaceus) containing hericenones and erinacines. Its compounds stimulate nerve growth factor (NGF) production, encouraging neuroplasticity and protecting neurons from everyday wear.",
        image: '/ingredients/lions-mane.png',
      },
      {
        name: 'Ginseng Panax',
        dose: '200 mg',
        benefit: 'Helps combat mental fatigue and supports working memory and overall cognitive performance.',
        science: 'Root extract from Panax ginseng, standardized for ginsenosides. Ginsenosides modulate neurotransmitter systems and help regulate stress response, promoting balanced energy and mental stamina.',
        image: '/ingredients/ginseng-panax.png',
      },
    ],
  },
  {
    category: 'Mood & Emotional Balance',
    description: 'Bioactive compounds that gently modulate serotonin and dopamine pathways to lift mood, ease tension, and support emotional resilience.',
    ingredients: [
      {
        name: "Saffr'Active® (Saffron Extract)",
        dose: '50 mg',
        benefit: 'Gently lifts mood, reduces everyday tension, and supports emotional balance.',
        science: 'A standardized saffron extract (Crocus sativus) rich in crocin and safranal. Its bioactive compounds influence serotonin and dopamine pathways while offering antioxidant protection to brain cells.',
        image: '/ingredients/saffran.png',
      },
    ],
  },
  {
    category: 'Gut-Brain Axis',
    description: 'Prebiotic fiber that feeds the microbiome and strengthens the communication pathway between the gut and the brain.',
    ingredients: [
      {
        name: 'Inulin',
        dose: '1,345 mg',
        benefit: 'Nourishes beneficial gut bacteria, supporting the gut-brain connection that influences mood and cognitive flexibility.',
        science: 'A naturally occurring prebiotic fiber derived from plants. Fermented by gut microbes into short-chain fatty acids, it helps regulate inflammation and neurotransmitter signaling along the gut-brain axis.',
        image: '/ingredients/inulin.png',
      },
    ],
  },
  {
    category: 'Cellular Health & Methylation',
    description: 'Compounds that support healthy methylation cycles, energy metabolism, and balanced brain chemistry at the cellular level.',
    ingredients: [
      {
        name: 'Betaine (Trimethylglycine)',
        dose: '500 mg',
        benefit: 'Supports healthy methylation and helps maintain balanced homocysteine levels.',
        science: 'A naturally occurring compound found in beets and other plants, also known as TMG. As a methyl donor, betaine assists in converting homocysteine back to methionine, supporting cellular methylation processes important for brain chemistry and energy metabolism.',
        image: '/ingredients/tmg.png',
      },
    ],
  },
  {
    category: 'Minerals',
    description: 'Bioavailable mineral forms that support neurotransmitter function, enzyme activity, and a calm, regulated nervous system.',
    ingredients: [
      {
        name: 'Magnesium Citrate',
        dose: '680 mg',
        benefit: 'Promotes relaxation, helps ease tension, and supports healthy stress response and sleep quality.',
        science: 'A highly bioavailable form of magnesium bound to citric acid. Magnesium acts as a cofactor in over 300 enzymatic reactions, including those regulating neurotransmitters like GABA and modulating the HPA axis for calmer nervous system function.',
        image: '/ingredients/magnesium.png',
      },
      {
        name: 'Sodium Citrate',
        dose: '400 mg',
        benefit: 'It supports proper hydration, fluid balance, and smooth nutrient absorption, helping maintain steady energy and mental clarity throughout the day.',
        science: 'A highly bioavailable form of sodium used as a gentle electrolyte. Sodium citrate provides readily available sodium ions that assist in regulating fluid levels, enhancing cellular hydration, and optimizing the transport of other key nutrients across cell membranes — creating the ideal internal environment for calm, steady energy and clear focus.',
        image: '/ingredients/sodium-citrate.png',
      },
      {
        name: 'Zinc',
        dose: '7 mg',
        benefit: 'Supports healthy neurotransmitter function, immune balance, and cognitive processes.',
        science: 'An essential trace mineral in a bioavailable form. Zinc modulates synaptic signaling (especially glutamate and GABA) and acts as a cofactor in enzymes involved in DNA synthesis and antioxidant defense in the brain.',
        image: '/ingredients/zinc.png',
      },
    ],
  },
  {
    category: 'B-Vitamins',
    description: 'Essential cofactors for converting food into energy and synthesizing the neurotransmitters that drive focus, mood, and mental performance.',
    ingredients: [
      {
        name: 'B-Vitamins (B1, B3, B6, B12)',
        dose: '2.875 mg',
        benefit: 'Support energy metabolism, neurotransmitter production, and overall mental performance.',
        science: 'Essential B-complex vitamins in active or highly bioavailable forms. These vitamins serve as cofactors in converting food into cellular energy (ATP) and in synthesizing dopamine, serotonin, and other key brain chemicals.',
        image: '/ingredients/vitamin-b.png',
      },
    ],
  },
  {
    category: 'Natural Taste & Stability',
    description: 'Food-grade compounds that improve palatability and formula stability without stimulants, sugar, or artificial additives.',
    ingredients: [
      {
        name: 'Pomegranate Flavour',
        dose: '125 mg',
        benefit: 'It delivers a pleasant, subtle fruity taste that makes your daily serving enjoyable and easy to look forward to.',
        science: 'A natural flavouring derived from pomegranate. As a natural flavour, it has no direct physiological effect but improves palatability, supporting consistent daily use and turning your ritual into something you genuinely enjoy.',
        image: '/ingredients/pomegranate.png',
      },
    ],
  },
];

export const filterGroups = [
  {
    label: 'Health Benefits',
    categories: ['Cognitive Performance', 'Mood & Emotional Balance', 'Gut-Brain Axis', 'Cellular Health & Methylation'],
  },
  {
    label: 'Ingredient Function',
    categories: ['Botanicals & Antioxidants', 'Minerals', 'B-Vitamins', 'Natural Taste & Stability'],
  },
];

interface Props {
  /** Auto-scroll to content when a filter is selected. Default: true. */
  scrollOnFilter?: boolean;
  /** Clarity event prefix, e.g. "ingredients" or "our_product". Default: "ingredients". */
  clarityPrefix?: string;
  /** Limit initial visible count before "Show more". Pass 0 to disable. Default: 6. */
  visibleLimit?: number;
}

export default function IngredientsExplorer({
  scrollOnFilter = true,
  clarityPrefix = 'ingredients',
  visibleLimit = 6,
}: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_LIMIT = visibleLimit;
  const filtered = active ? sections.filter((s) => s.category === active) : sections;
  const countByCategory = Object.fromEntries(sections.map((s) => [s.category, s.ingredients.length]));
  const totalCount = sections.reduce((acc, s) => acc + s.ingredients.length, 0);
  const contentRef = useRef<HTMLDivElement>(null);

  const shouldLimit = !active && !showAll && VISIBLE_LIMIT > 0;
  let remaining = VISIBLE_LIMIT;
  const displaySections = filtered.map((section) => {
    const visible = shouldLimit ? section.ingredients.slice(0, Math.max(0, remaining)) : section.ingredients;
    remaining -= section.ingredients.length;
    return { ...section, visibleIngredients: visible };
  }).filter((s) => s.visibleIngredients.length > 0);
  const hiddenCount = shouldLimit ? Math.max(0, totalCount - VISIBLE_LIMIT) : 0;

  const selectFilter = (id: string | null) => {
    trackEvent(`${clarityPrefix}_filter_${id ?? 'all'}`);
    setActive(id);
    setShowAll(false);
    if (!scrollOnFilter) return;
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

  const sidebarBtn = (label: string, count: number, isActive: boolean, id: string | null) => (
    <button
      key={label}
      onClick={() => selectFilter(id)}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors duration-200 ${
        isActive
          ? 'bg-[#1E1854] text-white'
          : 'text-[#1E1854]/60 hover:text-[#1E1854] hover:bg-[#1E1854]/[0.04]'
      }`}
    >
      <span className="font-medium tracking-[-0.01em]">{label}</span>
      <span className={`text-xs tabular-nums ${isActive ? 'text-white/60' : 'text-[#1E1854]/30'}`}>{count}</span>
    </button>
  );

  return (
    <div className="flex items-start gap-8 lg:gap-12">

      {/* Left sidebar filter (desktop) */}
      <aside className="hidden md:flex flex-col gap-5 w-52 lg:w-56 shrink-0 sticky top-24">
        {sidebarBtn('All ingredients', totalCount, active === null, null)}
        <div className="border-t border-[var(--color-border)]" />
        {filterGroups.map((group) => (
          <div key={group.label} className="space-y-0.5">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold text-[#1E1854]/35 px-3 pb-2">
              {group.label}
            </p>
            {group.categories.map((cat) =>
              sidebarBtn(cat, countByCategory[cat] ?? 0, active === cat, cat)
            )}
          </div>
        ))}
      </aside>

      {/* Mobile filter (horizontal scroll) */}
      <div className="flex flex-col gap-6 flex-1 min-w-0">
        <div className="md:hidden">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 no-scrollbar">
            <button
              onClick={() => selectFilter(null)}
              className={`shrink-0 text-xs tracking-[0.1em] uppercase font-medium px-4 py-2 rounded-full border transition-colors ${active === null ? 'bg-[#1E1854] text-white border-[#1E1854]' : 'border-[var(--color-border)] text-[#1E1854]/50'}`}
            >
              All
            </button>
            {sections.map((s) => (
              <button
                key={s.category}
                onClick={() => selectFilter(s.category)}
                className={`shrink-0 text-xs tracking-[0.1em] uppercase font-medium px-4 py-2 rounded-full border transition-colors ${active === s.category ? 'bg-[#1E1854] text-white border-[#1E1854]' : 'border-[var(--color-border)] text-[#1E1854]/50'}`}
              >
                {s.category}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div ref={contentRef} className="space-y-10">
          {displaySections.map((section) => (
            <div key={section.category} className="rounded-2xl bg-[#F8F8FC] p-5 space-y-4 scroll-mt-28" id={section.category}>
              <div className="flex items-start gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.02em]">{section.category}</h2>
                  <p className="text-sm text-[hsla(var(--color-secondary)/0.6)] leading-relaxed mt-1">{section.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.visibleIngredients.map((ing) => (
                  <div key={ing.name} className="group rounded-xl border border-[#1E1854]/[0.07] flex flex-col bg-white shadow-sm shadow-[#1E1854]/[0.04] hover:shadow-xl hover:shadow-[#1E1854]/[0.10] hover:-translate-y-0.5 transition-all duration-500 p-4 gap-4">
                    <div className="flex flex-row gap-3 items-start">
                      <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden ring-1 ring-[#1E1854]/[0.08]">
                        <Image
                          src={ing.image}
                          alt={ing.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          sizes="96px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-[#1E1854]/10" />
                      </div>
                      <div className="flex flex-col gap-2 flex-1 min-w-0 pt-0.5">
                        <h3 className="text-base font-semibold tracking-[-0.02em] leading-snug text-[#1E1854]">{ing.name}</h3>
                        {ing.dose && (
                          <span className="self-start text-xs tracking-[0.08em] uppercase font-semibold bg-[#1E1854]/[0.06] text-[#1E1854]/80 px-2.5 py-1 rounded-full border border-[#1E1854]/[0.08]">
                            {ing.dose}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-sm text-[hsla(var(--color-secondary)/0.78)] leading-relaxed">{ing.benefit}</p>
                      <p className="text-xs text-[hsla(var(--color-secondary)/0.42)] leading-[1.7]">{ing.science}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {hiddenCount > 0 && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full py-3 text-sm font-medium tracking-[-0.01em] text-[#1E1854]/60 hover:text-[#1E1854] border border-[#1E1854]/[0.10] hover:border-[#1E1854]/[0.25] rounded-xl transition-colors duration-200"
            >
              Show {hiddenCount} more ingredient{hiddenCount > 1 ? 's' : ''}
            </button>
          )}
          {showAll && !active && (
            <button
              onClick={() => setShowAll(false)}
              className="w-full py-3 text-sm font-medium tracking-[-0.01em] text-[#1E1854]/60 hover:text-[#1E1854] border border-[#1E1854]/[0.10] hover:border-[#1E1854]/[0.25] rounded-xl transition-colors duration-200"
            >
              Show less
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

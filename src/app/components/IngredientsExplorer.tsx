'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
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
};

const allIngredients: Ingredient[] = [
  {
    name: 'Hibiscus Extract',
    dose: '1,750 mg',
    benefit: 'Offers gentle antioxidant support and may help maintain calm mental performance while supporting healthy blood flow and glucose response after meals.',
    science: 'A vibrant floral extract from the calyces of Hibiscus sabdariffa, rich in anthocyanins and polyphenols. Its compounds help modulate oxidative stress and support vascular function, which can contribute to clearer thinking and steadier energy.',
    image: '/ingredients/hibiscus.png',
    imageAlt: 'Dried hibiscus sabdariffa flowers — antioxidant-rich botanical in Flow Health cognitive supplement',
    healthCategory: 'Cellular Health & Methylation',
    functionCategory: 'Plant Extracts',
  },
  {
    name: 'Rooibos Extract',
    dose: '625 mg',
    benefit: 'Provides antioxidant protection and may help reduce feelings of everyday stress while supporting overall calm.',
    science: 'A caffeine-free herbal extract from the South African rooibos plant, rich in unique polyphenols like aspalathin. Its antioxidants help neutralize free radicals and modulate oxidative stress in neural tissue, contributing to better redox balance.',
    image: '/ingredients/rooibos.png',
    imageAlt: 'South African rooibos herbal extract — caffeine-free polyphenol antioxidant in Flow Health formula',
    healthCategory: 'Mood & Emotional Balance',
    functionCategory: 'Plant Extracts',
  },
  {
    name: 'Zynamite® (Mango Leaf Extract)',
    dose: '300 mg',
    benefit: 'Delivers fast-acting mental clarity, improves reaction time, and reduces mental fatigue without affecting heart rate or blood pressure.',
    science: 'A standardized extract from mango leaves (Mangifera indica), rich in mangiferin. Mangiferin modulates brain wave activity and supports efficient energy use in neurons, promoting alert yet calm performance that can last several hours.',
    image: '/ingredients/mangifera.png',
    imageAlt: 'Zynamite mango leaf extract (Mangifera indica) — clinically studied nootropic for focus and mental energy in Flow Health',
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Plant Extracts',
  },
  {
    name: 'Green Tea Extract',
    dose: '250 mg',
    benefit: 'Provides smooth, jitter-free energy and sustained attention when paired with L-theanine.',
    science: 'A concentrated source of natural caffeine and L-theanine from Camellia sinensis. The combination promotes alpha brain waves associated with relaxed alertness while gently increasing dopamine and norepinephrine signaling for focused energy.',
    image: '/ingredients/green-tea.png',
    imageAlt: 'Green tea extract (Camellia sinensis) with L-theanine and natural caffeine — sustained focus ingredient in Flow Health',
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Plant Extracts',
  },
  {
    name: "Lion's Mane Mushroom",
    dose: '250 mg',
    benefit: 'Supports nerve health, mental clarity, and long-term cognitive vitality.',
    science: 'A medicinal mushroom (Hericium erinaceus) containing hericenones and erinacines. Its compounds stimulate nerve growth factor (NGF) production, encouraging neuroplasticity and protecting neurons from everyday wear.',
    image: '/ingredients/lions-mane.png',
    imageAlt: "Lion's mane mushroom (Hericium erinaceus) — NGF-stimulating nootropic for neuroplasticity and brain health in Flow Health",
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Adaptogens',
  },
  {
    name: 'Ginseng Panax',
    dose: '200 mg',
    benefit: 'Helps combat mental fatigue and supports working memory and overall cognitive performance.',
    science: 'Root extract from Panax ginseng, standardized for ginsenosides. Ginsenosides modulate neurotransmitter systems and help regulate stress response, promoting balanced energy and mental stamina.',
    image: '/ingredients/ginseng-panax.png',
    imageAlt: 'Panax ginseng root extract standardized for ginsenosides — adaptogen for cognitive performance and mental stamina in Flow Health',
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Adaptogens',
  },
  {
    name: "Saffr'Active® (Saffron Extract)",
    dose: '50 mg',
    benefit: 'Gently lifts mood, reduces everyday tension, and supports emotional balance.',
    science: 'A standardized saffron extract (Crocus sativus) rich in crocin and safranal. Its bioactive compounds influence serotonin and dopamine pathways while offering antioxidant protection to brain cells.',
    image: '/ingredients/saffran.png',
    imageAlt: "Saffr'Active saffron extract (Crocus sativus) — mood-lifting serotonin and dopamine support ingredient in Flow Health",
    healthCategory: 'Mood & Emotional Balance',
    functionCategory: 'Plant Extracts',
  },
  {
    name: 'Inulin',
    dose: '1,345 mg',
    benefit: 'Nourishes beneficial gut bacteria, supporting the gut-brain connection that influences mood and cognitive flexibility.',
    science: 'A naturally occurring prebiotic fiber derived from plants. Fermented by gut microbes into short-chain fatty acids, it helps regulate inflammation and neurotransmitter signaling along the gut-brain axis.',
    image: '/ingredients/inulin.png',
    imageAlt: 'Inulin prebiotic fiber — gut-brain axis support ingredient that feeds beneficial microbiome bacteria in Flow Health',
    healthCategory: 'Gut-Brain Axis',
    functionCategory: 'Gut Health',
  },
  {
    name: 'Betaine (Trimethylglycine)',
    dose: '500 mg',
    benefit: 'Supports healthy methylation and helps maintain balanced homocysteine levels.',
    science: 'A naturally occurring compound found in beets and other plants, also known as TMG. As a methyl donor, betaine assists in converting homocysteine back to methionine, supporting cellular methylation processes important for brain chemistry and energy metabolism.',
    image: '/ingredients/tmg.png',
    imageAlt: 'Betaine trimethylglycine (TMG) from beet root — methyl donor for homocysteine balance and brain chemistry in Flow Health',
    healthCategory: 'Cellular Health & Methylation',
    functionCategory: 'Amino Acids',
  },
  {
    name: 'Magnesium Citrate',
    dose: '680 mg',
    benefit: 'Promotes relaxation, helps ease tension, and supports healthy stress response and sleep quality.',
    science: 'A highly bioavailable form of magnesium bound to citric acid. Magnesium acts as a cofactor in over 300 enzymatic reactions, including those regulating neurotransmitters like GABA and modulating the HPA axis for calmer nervous system function.',
    image: '/ingredients/magnesium.png',
    imageAlt: 'Magnesium citrate — bioavailable magnesium for GABA regulation, relaxation, and nervous system calm in Flow Health',
    healthCategory: 'Mood & Emotional Balance',
    functionCategory: 'Minerals',
  },
  {
    name: 'Sodium Citrate',
    dose: '400 mg',
    benefit: 'Supports proper hydration, fluid balance, and smooth nutrient absorption, helping maintain steady energy and mental clarity throughout the day.',
    science: 'A highly bioavailable form of sodium used as a gentle electrolyte. Sodium citrate provides readily available sodium ions that assist in regulating fluid levels, enhancing cellular hydration, and optimizing the transport of other key nutrients across cell membranes — creating the ideal internal environment for calm, steady energy and clear focus.',
    image: '/ingredients/sodium-citrate.png',
    imageAlt: 'Sodium citrate electrolyte — cellular hydration and nutrient absorption support for steady mental clarity in Flow Health',
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Minerals',
  },
  {
    name: 'Zinc',
    dose: '7 mg',
    benefit: 'Supports healthy neurotransmitter function, immune balance, and cognitive processes.',
    science: 'An essential trace mineral in a bioavailable form. Zinc modulates synaptic signaling (especially glutamate and GABA) and acts as a cofactor in enzymes involved in DNA synthesis and antioxidant defense in the brain.',
    image: '/ingredients/zinc.png',
    imageAlt: 'Zinc trace mineral — synaptic signaling cofactor for neurotransmitter function and cognitive health in Flow Health',
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Minerals',
  },
  {
    name: 'B-Vitamins (B1, B3, B6, B12)',
    dose: '2.875 mg',
    benefit: 'Support energy metabolism, neurotransmitter production, and overall mental performance.',
    science: 'Essential B-complex vitamins in active or highly bioavailable forms. These vitamins serve as cofactors in converting food into cellular energy (ATP) and in synthesizing dopamine, serotonin, and other key brain chemicals.',
    image: '/ingredients/vitamin-b.png',
    imageAlt: 'B-complex vitamins B1 B3 B6 B12 — energy metabolism cofactors for dopamine and serotonin synthesis in Flow Health',
    healthCategory: 'Cognitive Performance',
    functionCategory: 'Vitamins',
  },
  {
    name: 'Pomegranate Flavour',
    dose: '125 mg',
    benefit: 'Delivers a pleasant, subtle fruity taste that makes your daily serving enjoyable and easy to look forward to.',
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
          ? 'bg-[#1E1854] text-white'
          : 'text-[#1E1854]/60 hover:text-[#1E1854] hover:bg-[#1E1854]/[0.04]'
      }`}
    >
      <span className="font-medium tracking-[-0.01em]">{label}</span>
      {count !== null && <span className={`text-xs tabular-nums ${isActive ? 'text-white/60' : 'text-[#1E1854]/30'}`}>{count}</span>}
    </button>
  );

  return (
    <div ref={sectionRef} className="flex items-start gap-8 lg:gap-12">

      {/* Left sidebar filter (desktop) */}
      <aside className="hidden md:flex flex-col gap-2 w-52 lg:w-56 shrink-0 sticky top-24">
        {sidebarBtn('All ingredients', totalCount, !activeGroup && !activeCategory, () => selectFilter(null))}
        <div className="border-t border-[var(--color-border)] my-2" />
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
                      ? 'bg-[#1E1854]/10 text-[#1E1854] font-semibold'
                      : 'text-[#1E1854]/45 hover:text-[#1E1854] hover:bg-[#1E1854]/[0.04]'
                  }`}
                >
                  <span className="tracking-[-0.01em]">{s.category}</span>
                  <span className="tabular-nums text-[#1E1854]/30">{s.ingredients.length}</span>
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
              className={`shrink-0 text-xs tracking-[0.1em] uppercase font-medium px-4 py-2 rounded-full border transition-colors ${!activeGroup && !activeCategory ? 'bg-[#1E1854] text-white border-[#1E1854]' : 'border-[var(--color-border)] text-[#1E1854]/50'}`}
            >
              All
            </button>
            {filterGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => selectFilter(group.id)}
                className={`shrink-0 text-xs tracking-[0.1em] uppercase font-medium px-4 py-2 rounded-full border transition-colors ${activeGroup === group.id && !activeCategory ? 'bg-[#1E1854] text-white border-[#1E1854]' : 'border-[var(--color-border)] text-[#1E1854]/50'}`}
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
                <p className="text-sm text-[hsla(var(--color-secondary)/0.6)] leading-relaxed mt-1">{section.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.visibleIngredients.map((ing) => (
                  <div key={ing.name} className="group rounded-xl border border-[#1E1854]/[0.07] flex flex-col bg-white shadow-sm shadow-[#1E1854]/[0.04] hover:shadow-xl hover:shadow-[#1E1854]/[0.10] hover:-translate-y-0.5 transition-all duration-500 overflow-hidden">
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
                      <h3 className="text-base font-semibold tracking-[-0.02em] leading-snug text-[#1E1854]">{ing.name}</h3>
                      {(textMode === 'both' || textMode === 'benefit') && (
                        <p className="text-sm text-[hsla(var(--color-secondary)/0.78)] leading-relaxed">{ing.benefit}</p>
                      )}
                      {(textMode === 'both' || textMode === 'science') && (
                        <p className={`leading-[1.7] ${textMode === 'science' ? 'text-sm text-[hsla(var(--color-secondary)/0.78)]' : 'text-xs text-[hsla(var(--color-secondary)/0.42)]'}`}>{ing.science}</p>
                      )}
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
          {showAll && !activeGroup && !activeCategory && (
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

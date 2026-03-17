import Image from 'next/image';
import Link from 'next/link';

const sections = [
  {
    category: 'Adaptogens',
    description: 'Plant-derived compounds that help the body resist physical and mental stress by modulating the HPA axis and cortisol response.',
    ingredients: [
      {
        name: 'Ashwagandha (KSM-66®)',
        dose: '300 mg',
        benefit: 'Clinically shown to reduce cortisol by up to 27%, support thyroid and adrenal health, and promote a calm, grounded state without sedation.',
        science: 'KSM-66® is a full-spectrum root extract standardised to ≥5% withanolides. It acts on the HPA axis to down-regulate cortisol secretion and modulates GABA-A receptors for anxiolytic effects without impairing alertness.',
        image: 'https://images.unsplash.com/photo-1611843467160-25afb8df1074?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Rhodiola Rosea',
        dose: '200 mg',
        benefit: 'Reduces the perception of effort during challenging tasks, combats mental fatigue, and supports sustained performance under stress.',
        science: 'Standardised to 3% rosavins and 1% salidroside, Rhodiola activates HSP70 and AMPK pathways, improving mitochondrial efficiency and blunting cortisol-induced cognitive decline.',
        image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    category: 'Amino Acids & Precursors',
    description: 'Building blocks for key neurotransmitters including dopamine, noradrenaline, and acetylcholine.',
    ingredients: [
      {
        name: 'L-Tyrosine',
        dose: '500 mg',
        benefit: 'Precursor to dopamine and noradrenaline. Supports focus and cognitive performance during high-stress or sleep-deprived conditions.',
        science: 'L-Tyrosine is rate-limiting for catecholamine synthesis. Under acute stress, neuronal tyrosine availability drops; supplementation replenishes the pool, maintaining dopaminergic and noradrenergic tone.',
        image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Mucuna Pruriens',
        dose: '200 mg',
        benefit: 'Natural source of L-DOPA, a direct precursor to dopamine. Supports mood, motivation, and healthy stress response.',
        science: 'Standardised to 15% L-DOPA, Mucuna bypasses the tyrosine hydroxylase rate-limiting step, directly elevating striatal dopamine. Also contains serotonin, 5-HTP, and antioxidant flavonoids.',
        image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Alpha-GPC',
        dose: '150 mg',
        benefit: 'Rapidly elevates brain acetylcholine levels, supporting memory formation, mental clarity, and neuromuscular function.',
        science: 'Alpha-GPC crosses the blood-brain barrier with >85% bioavailability, delivering choline directly to cholinergic neurons. Upregulates acetylcholine synthesis faster than CDP-choline and also increases GH secretion.',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'L-Theanine',
        dose: '200 mg',
        benefit: 'Promotes alpha brainwave activity for calm alertness. Synergises with caffeine to eliminate jitters while enhancing focus.',
        science: 'L-Theanine is a non-proteinogenic amino acid from Camellia sinensis. It competitively inhibits glutamate transporters, modulates AMPA receptors, and upregulates GABA and serotonin — producing measurable α-wave increases within 40 minutes.',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    category: 'Functional Mushrooms & Herbs',
    description: 'Nootropic fungi and botanicals with documented effects on neurogenesis and cognitive longevity.',
    ingredients: [
      {
        name: "Lion's Mane Mushroom",
        dose: '500 mg',
        benefit: 'Stimulates Nerve Growth Factor (NGF) synthesis, supporting neuroplasticity, memory, and long-term brain health.',
        science: "Hericenones and erinacines in Lion's Mane are small enough to cross the blood-brain barrier, where they induce NGF mRNA transcription. NGF promotes myelination, dendritic branching, and survival of cholinergic neurons in the basal forebrain.",
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Bacopa Monnieri',
        dose: '300 mg',
        benefit: 'Ayurvedic herb backed by clinical trials showing improvements in memory recall, processing speed, and anxiety reduction after 4–8 weeks.',
        science: 'Bacosides A and B repair damaged neurons by enhancing kinase activity and protein synthesis in the hippocampus. Bacopa also inhibits acetylcholinesterase and acts as a free-radical scavenger, with effects building over 4–8 weeks of consistent use.',
        image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    category: 'Vitamins',
    description: 'Essential co-factors for energy metabolism and neurotransmitter synthesis.',
    ingredients: [
      {
        name: 'Vitamin B1 (Thiamine)',
        dose: '1.1 mg',
        benefit: 'Supports carbohydrate metabolism and nerve function.',
        science: 'Thiamine pyrophosphate is an essential cofactor for pyruvate dehydrogenase and α-ketoglutarate dehydrogenase, gating entry into the Krebs cycle and neuronal ATP production.',
        image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Vitamin B3 (Niacin)',
        dose: '16 mg NE',
        benefit: 'Key role in cellular energy production (NAD+) and DNA repair.',
        science: 'Niacin is the direct precursor to NAD+ and NADP+, coenzymes involved in over 400 redox reactions. NAD+ is also consumed by PARP-1 during DNA repair and by sirtuins for epigenetic regulation.',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Vitamin B6 (P-5-P)',
        dose: '1.4 mg',
        benefit: 'Co-factor for serotonin, dopamine, and GABA synthesis.',
        science: "Pyridoxal-5'-phosphate is the biologically active form of B6 and a cofactor for aromatic amino acid decarboxylase — the enzyme converting L-DOPA to dopamine and 5-HTP to serotonin. Also required for GABA synthesis from glutamate.",
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Vitamin B12 (Methylcobalamin)',
        dose: '2.5 µg',
        benefit: 'Supports myelin sheath integrity, red blood cell formation, and mental energy.',
        science: 'Methylcobalamin is the neurologically active form of B12. It donates methyl groups in the methionine cycle, supporting SAM production for neurotransmitter methylation and maintaining myelin via methionine synthase activity.',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    category: 'Minerals',
    description: 'Bioavailable mineral forms for maximum absorption.',
    ingredients: [
      {
        name: 'Magnesium Bisglycinate',
        dose: '75 mg elemental',
        benefit: 'Highly bioavailable form of magnesium. Supports NMDA receptor function, muscle relaxation, sleep quality, and over 300 enzymatic reactions.',
        science: 'Bisglycinate chelation protects magnesium from intestinal competition, achieving ~40% higher absorption than oxide forms. Mg²⁺ acts as a natural NMDA receptor antagonist, preventing excitotoxicity and regulating synaptic plasticity.',
        image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    category: 'Plant Extracts & Polyphenols',
    description: 'Antioxidant-rich compounds that protect neurons and support mitochondrial health.',
    ingredients: [
      {
        name: 'Green Tea Extract (EGCG)',
        dose: '200 mg',
        benefit: 'Powerful antioxidant that protects neurons from oxidative stress, supports healthy mitochondrial function, and enhances fat oxidation.',
        science: 'EGCG (epigallocatechin gallate) inhibits COMT, which prolongs catecholamine signalling. It also activates Nrf2 antioxidant pathways, chelates iron to prevent hydroxyl radical formation, and upregulates AMPK for mitochondrial biogenesis.',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Blueberry Extract',
        dose: '100 mg',
        benefit: 'Rich in anthocyanins that cross the blood-brain barrier, supporting memory, cerebral blood flow, and neuroprotection.',
        science: 'Blueberry anthocyanins activate eNOS to increase cerebral nitric oxide production, improving blood flow to the hippocampus and prefrontal cortex. They also inhibit MAO-B activity and modulate BDNF expression for neuroplasticity support.',
        image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
];

export default function IngredientsPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-24 space-y-24">

      <div className="space-y-3 max-w-2xl">
        <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/1)]">Transparent Formula</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Ingredients</h1>
        <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          Every ingredient in Flow is selected for its clinical evidence, bioavailability, and synergy with the full formula. No fillers, no proprietary blends — just full doses of what works.
        </p>
      </div>

      {/* Three bodily axes */}
      <div className="border border-[var(--color-border)] rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: heading */}
          <div className="p-10 md:p-14 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[var(--color-border)]">
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] mb-4 font-medium">Our approach</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight mb-4">
              Three axes of wellbeing
            </h2>
            <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">
              Every ingredient in Flow was chosen for its contribution to at least one of three interconnected systems. Together, they address the whole person — not just a single symptom.
            </p>
          </div>

          {/* Right: 3 axis cards */}
          <div className="grid grid-cols-1 divide-y divide-[var(--color-border)]">
            {[
              {
                label: 'Cognitive Function',
                description: 'Sharpens focus, sustains mental energy, and supports long-term neuroplasticity via cholinergic, dopaminergic, and NGF pathways.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 4C9.6 4 6 7.6 6 12c0 2.8 1.4 5.3 3.5 6.8V21h9v-2.2C20.6 17.3 22 14.8 22 12c0-4.4-3.6-8-8-8z" />
                    <path d="M10 21v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2" />
                    <line x1="14" y1="4" x2="14" y2="2" />
                    <line x1="6.3" y1="6.3" x2="4.9" y2="4.9" />
                    <line x1="21.7" y1="6.3" x2="23.1" y2="4.9" />
                  </svg>
                ),
                ingredients: ['Lion\'s Mane', 'Alpha-GPC', 'Bacopa', 'L-Tyrosine', 'L-Theanine'],
              },
              {
                label: 'Mood & Hormonal Balance',
                description: 'Regulates cortisol, supports dopamine and serotonin synthesis, and builds resilience to physical and emotional stress.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="14" cy="14" r="10" />
                    <path d="M10 16s1.5 2 4 2 4-2 4-2" />
                    <circle cx="10.5" cy="12" r="1" fill="currentColor" stroke="none" />
                    <circle cx="17.5" cy="12" r="1" fill="currentColor" stroke="none" />
                  </svg>
                ),
                ingredients: ['Ashwagandha', 'Rhodiola', 'Mucuna Pruriens', 'Magnesium', 'B6'],
              },
              {
                label: 'Cellular & Metabolic Health',
                description: 'Protects neurons from oxidative stress, fuels mitochondrial efficiency, and provides the co-factors every cell needs to thrive.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 14c0-3.9 3.1-7 7-7s7 3.1 7 7" />
                    <path d="M10 18.5c0 2.2 1.8 4 4 4s4-1.8 4-4" />
                    <line x1="14" y1="7" x2="14" y2="4" />
                    <path d="M9 9.5 7 7.5M19 9.5l2-2" />
                    <line x1="7" y1="14" x2="4" y2="14" />
                    <line x1="21" y1="14" x2="24" y2="14" />
                  </svg>
                ),
                ingredients: ['EGCG', 'Blueberry', 'B1', 'B3', 'B12'],
              },
            ].map((axis) => (
              <div key={axis.label} className="p-8 flex gap-5 items-start">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[hsla(var(--color-accent)/0.06)] flex items-center justify-center text-[hsla(var(--color-accent)/1)]">
                  {axis.icon}
                </div>
                <div className="space-y-1.5">
                  <p className="text-base font-semibold tracking-[-0.01em]">{axis.label}</p>
                  <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">{axis.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {axis.ingredients.map((ing) => (
                      <span key={ing} className="text-xs tracking-[0.06em] border border-[var(--color-border)] px-2.5 py-0.5 rounded-full text-[hsla(var(--color-secondary)/0.7)]">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {sections.map((section) => (
        <div key={section.category} className="space-y-8">
          <div className="border-b border-[var(--color-border)] pb-5 space-y-1">
            <h2 className="text-xl font-semibold tracking-[-0.01em]">{section.category}</h2>
            <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">{section.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.ingredients.map((ing) => (
              <div key={ing.name} className="border border-[var(--color-border)] rounded-2xl p-6 flex flex-col gap-5">

                {/* Top: small image + name/benefit */}
                <div className="flex gap-5 items-start">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={ing.image}
                      alt={ing.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-xs tracking-[0.1em] uppercase font-medium text-[hsla(var(--color-secondary)/0.5)]">{ing.dose}</span>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] leading-snug">{ing.name}</h3>
                    <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">{ing.benefit}</p>
                  </div>
                </div>

                {/* Bottom: scientific description, full width */}
                <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] leading-[1.7] border-t border-[var(--color-border)] pt-4">{ing.science}</p>

              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Product CTA */}
      <div className="bg-[#1E1854] rounded-3xl px-10 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-xs tracking-[0.16em] uppercase text-white/40 font-medium mb-3">Experience the full formula</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white max-w-md leading-snug">
            Every ingredient above, precisely dosed in one daily formula.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link href="/products/flow" className="inline-flex items-center justify-center bg-white text-[#1E1854] text-xs tracking-[0.1em] uppercase font-semibold px-7 py-4 rounded-full hover:bg-[hsla(var(--color-accent)/1)] hover:text-white transition-colors">
            Shop Flow
          </Link>
          <Link href="/pages/our-product" className="inline-flex items-center justify-center border border-white/30 text-white text-xs tracking-[0.1em] uppercase font-medium px-7 py-4 rounded-full hover:border-white/60 transition-colors">
            Product overview
          </Link>
        </div>
      </div>

      {/* Nav links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Our Philosophy', description: 'The principles that guide every formulation decision.', href: '/pages/our-philosophy', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80&auto=format&fit=crop' },
          { label: 'Our Product', description: 'Inside the formula — every ingredient and why it matters.', href: '/pages/our-product', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80&auto=format&fit=crop' },
        ].map((card) => (
          <Link key={card.label} href={card.href} className="group relative rounded-2xl overflow-hidden aspect-[16/7] flex items-end">
            <Image src={card.image} alt={card.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
            <div className="relative z-10 p-6 space-y-1">
              <h3 className="text-lg font-semibold text-white">{card.label}</h3>
              <p className="text-xs text-white/80 leading-snug">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}

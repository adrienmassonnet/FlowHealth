'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE, DURATION, VARIANTS } from '@/lib/animation';

interface FeaturedIngredient {
  name: string;
  imageUrl?: string;
  blogSlug?: string;
}

interface IngredientMeta {
  dose: string;
  tagline: string;
  mechanism: string;
  stat: { value: string; label: string };
  badge: string;
}

const META: Record<string, IngredientMeta> = {
  'Zynamite®': {
    dose: '300 mg',
    tagline: 'Jitter-free mental energy that lasts 5+ hours',
    mechanism: 'Mangiferin inhibits COMT — the enzyme that breaks down dopamine and noradrenaline — keeping neurotransmitter levels elevated for sustained focus without cardiovascular stimulation.',
    stat: { value: '+4.7%', label: 'reaction time (RCT, placebo-controlled)' },
    badge: 'Caffeine alternative',
  },
  "Saffr'Active®": {
    dose: '50 mg',
    tagline: 'Clinically proven mood and emotional resilience',
    mechanism: 'Crocin and safranal modulate serotonin reuptake and support BDNF expression — the neurotrophin responsible for neuronal health and emotional regulation.',
    stat: { value: '+34%', label: 'improvement in emotional balance (RCT)' },
    badge: 'Mood support',
  },
  'TMG': {
    dose: '500 mg',
    tagline: 'Methyl donor for brain chemistry and energy',
    mechanism: 'Trimethylglycine donates methyl groups in the one-carbon cycle, converting homocysteine to methionine. Elevated homocysteine is linked to cognitive decline — TMG keeps this pathway balanced.',
    stat: { value: '3×', label: 'methyl donor capacity vs folate alone' },
    badge: 'Methylation support',
  },
  "Lion's Mane": {
    dose: '250 mg',
    tagline: 'The only known plant compound to stimulate NGF',
    mechanism: 'Hericenones and erinacines cross the blood-brain barrier and directly stimulate Nerve Growth Factor synthesis — essential for neuronal maintenance, plasticity, and long-term cognitive resilience.',
    stat: { value: 'NGF', label: 'synthesis stimulation — unique to this mushroom' },
    badge: 'Neuroplasticity',
  },
};

const FALLBACK_META: IngredientMeta = {
  dose: '',
  tagline: 'Evidence-based cognitive support',
  mechanism: 'Clinically studied ingredient contributing to mental clarity, focus, and sustained cognitive performance.',
  stat: { value: '—', label: '' },
  badge: 'Cognitive support',
};

interface Props {
  ingredients: FeaturedIngredient[];
  sizes: string;
}

export default function FeaturedIngredientsSection({ ingredients, sizes }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ingredients.map((ing, i) => {
        const meta = META[ing.name] ?? FALLBACK_META;
        return (
          <motion.div
            key={ing.name}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={VARIANTS.fadeUp}
            transition={{ duration: DURATION.slow, delay: i * 0.09, ease: EASE.expoOut }}
            className="group flex flex-col rounded-2xl overflow-hidden border border-ink/[0.08] bg-white shadow-sm shadow-ink/[0.04] hover:shadow-lg hover:shadow-ink/[0.10] hover:-translate-y-0.5 transition-all duration-500"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              {ing.imageUrl && (
                <Image
                  src={ing.imageUrl}
                  alt={ing.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes={sizes}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              {/* Name + dose overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/60 mb-0.5">{meta.dose}</p>
                  <p className="text-base font-semibold tracking-[-0.01em] text-white leading-tight">{ing.name}</p>
                </div>
                <span className="text-[9px] font-semibold tracking-[0.07em] uppercase bg-white/15 backdrop-blur-sm text-white px-2 py-1 rounded-full border border-white/20">
                  {meta.badge}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-3 p-4 flex-1">
              {/* Tagline */}
              <p className="text-sm font-semibold tracking-[-0.01em] leading-snug text-ink">
                {meta.tagline}
              </p>

              {/* Stat pill */}
              <div className="flex items-center gap-2.5 bg-[#F0EFFB] rounded-xl px-3 py-2">
                <span className="text-base font-bold text-ink tabular-nums shrink-0">{meta.stat.value}</span>
                <span className="text-[11px] text-ink/55 leading-snug">{meta.stat.label}</span>
              </div>

              {/* Mechanism */}
              <p className="text-xs text-ink/55 leading-relaxed flex-1">
                {meta.mechanism}
              </p>

              {/* Learn more link */}
              {ing.blogSlug && (
                <Link
                  href={`/pages/blog-posts/${ing.blogSlug}`}
                  className="self-start flex items-center gap-1.5 text-[10px] tracking-[0.08em] uppercase font-semibold text-ink/35 hover:text-ink transition-colors duration-200"
                >
                  Read the science
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

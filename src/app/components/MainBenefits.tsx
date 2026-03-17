'use client';

import { useState } from 'react';
import Image from 'next/image';

const mainBenefits = [
  {
    label: 'Clean, Steady Energy',
    description: 'Flow delivers calm, sustained vitality without jitters or crashes. B-vitamins and natural caffeine sources support healthy energy metabolism, keeping you alert from morning to evening.',
    ingredients: 'B-Vitamins Complex · Natural Caffeine · CoQ10',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=85&auto=format&fit=crop',
    span: 'md:col-span-3',
    height: 'min-h-[280px]',
  },
  {
    label: 'Resilience to Stress',
    description: 'Flow\'s adaptogens help your body maintain balance under stress, promoting resilience and reducing the physical toll of daily demands.',
    ingredients: 'Ashwagandha KSM-66® · Rhodiola Rosea · Magnesium',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop',
    span: 'md:col-span-3',
    height: 'min-h-[280px]',
  },
  {
    label: 'Enhances Mood & Motivation',
    description: 'Support natural dopamine pathways and healthy hormonal balance for a stable, positive outlook. L-Tyrosine and Mucuna Pruriens help lift mood gently throughout the day.',
    ingredients: 'L-Tyrosine · Mucuna Pruriens · Rhodiola Rosea',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=900&q=85&auto=format&fit=crop',
    span: 'md:col-span-3',
    height: 'min-h-[280px]',
  },
  {
    label: 'Boosts Cognitive Clarity',
    description: 'Clear away brain fog with nutrients that enhance neural communication. Lion\'s Mane and Alpha-GPC promote crisp, quick thinking and better decision-making.',
    ingredients: 'Lion\'s Mane · Alpha-GPC · Zynamite®',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=85&auto=format&fit=crop',
    span: 'md:col-span-3',
    height: 'min-h-[280px]',
  },
  {
    label: 'Promotes Deep Calm & Recovery',
    description: 'Flow supports your body\'s natural recovery processes. Magnesium and L-Theanine help you bounce back from mental exertion and prepare for deeper, more restorative sleep.',
    ingredients: 'Magnesium · L-Theanine · Ashwagandha KSM-66®',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=85&auto=format&fit=crop',
    span: 'md:col-span-4',
    height: 'min-h-[280px]',
  },
  {
    label: 'Protects Long-Term Brain Health',
    description: 'Carefully chosen antioxidants nourish your brain daily. Bacopa Monnieri and Lion\'s Mane support cognitive vitality and healthy function as you pursue your goals over time.',
    ingredients: 'Bacopa Monnieri · Lion\'s Mane · Blueberry Extract',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=85&auto=format&fit=crop',
    span: 'md:col-span-4',
    height: 'min-h-[280px]',
  },
  {
    label: 'Freedom from Cravings & Unease',
    description: 'Quiet restless cravings and physical discomfort that pull your attention away. Mucuna Pruriens and Magnesium support dopamine balance and relaxation, helping you stay centered and free from distractions.',
    ingredients: 'Mucuna Pruriens · Magnesium · L-Theanine',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&q=85&auto=format&fit=crop',
    span: 'md:col-span-4',
    height: 'min-h-[280px]',
  },
];

export default function MainBenefits() {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-4 pb-16">
      <div className="mb-8 space-y-1">
        <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Why Flow</p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em]">Main benefits</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {mainBenefits.map((b) => {
          const isFlipped = flipped === b.label;
          return (
            <div
              key={b.label}
              className={`relative cursor-pointer ${b.span} ${b.height} [perspective:1000px]`}
              onClick={() => setFlipped(isFlipped ? null : b.label)}
            >
              {/* Flip container */}
              <div
                className={`absolute inset-0 rounded-2xl [transform-style:preserve-3d] transition-[transform] duration-500 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
              >
                {/* Front face */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden]">
                  <Image
                    src={b.image}
                    alt={b.label}
                    fill
                    className="object-cover brightness-[0.98] saturate-[1.1]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-semibold text-white leading-snug drop-shadow-sm pr-10">{b.label}</h3>
                  </div>
                  {/* Arrow hint */}
                  <div className="absolute bottom-4 right-4 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Back face */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1E1854] flex flex-col p-5">
                  <div className="flex justify-end shrink-0 mb-3">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 2L8 8M8 2L2 8" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="overflow-y-auto flex-1 space-y-3 pr-1">
                    <h3 className="text-lg font-semibold text-white leading-snug">{b.label}</h3>
                    <p className="text-sm text-white/75 leading-relaxed">{b.description}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="block w-4 h-px bg-white/25 shrink-0" />
                      <span className="text-xs uppercase tracking-[0.1em] text-white/40">{b.ingredients}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

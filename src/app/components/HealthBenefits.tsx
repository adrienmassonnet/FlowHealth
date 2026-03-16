'use client';

import { useState } from 'react';
import Image from 'next/image';

const steps = [
  {
    number: '01',
    label: 'Long-Term Brain Health',
    title: 'Long-Term Brain Health',
    ingredients: 'Bacopa Monnieri · Blueberry Extract · Lion\'s Mane',
    description: 'Carefully chosen antioxidants nourish your brain daily. Blueberry extract and Bacopa Monnieri support cognitive vitality and healthy function as you pursue your goals over time.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=85&auto=format&fit=crop',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M14 5C10.134 5 7 8.134 7 12C7 14.5 8.3 16.7 10.3 17.9L10 22H18L17.7 17.9C19.7 16.7 21 14.5 21 12C21 8.134 17.866 5 14 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M11 22H17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    label: 'Better Recovery & Rest',
    title: 'Better Recovery & Rest',
    ingredients: 'Magnesium · L-Theanine · Ashwagandha KSM-66®',
    description: "Flow supports your body's natural recovery processes. Magnesium and L-Theanine help you bounce back faster from mental exertion and prepare for deeper, more restorative sleep at night.",
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=85&auto=format&fit=crop',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M7 14C7 14 9 8 14 8C19 8 21 14 21 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M5 17C7 15 10 16 12 18C14 20 17 21 19 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    number: '03',
    label: 'Sharper Mental Clarity',
    title: 'Sharper Mental Clarity',
    ingredients: 'Lion\'s Mane · Alpha-GPC · Zynamite®',
    description: "Clear away brain fog with nutrients that enhance neural communication. Lion's mane mushroom and Alpha-GPC promote crisp, quick thinking and better decision-making in any situation.",
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=85&auto=format&fit=crop',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M14 6V8M14 20V22M6 14H8M20 14H22M8.34 8.34L9.76 9.76M18.24 18.24L19.66 19.66M8.34 19.66L9.76 18.24M18.24 9.76L19.66 8.34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    label: 'Steady Energy All Day',
    title: 'Steady Energy All Day',
    ingredients: 'B-Vitamins Complex · Natural Caffeine · CoQ10',
    description: 'Flow delivers calm, sustained vitality without jitters or crashes. B-vitamins and natural caffeine sources support healthy energy metabolism, keeping you alert and productive from morning to evening.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=85&auto=format&fit=crop',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M6 14H9L11 9L14 19L17 12L19 14H22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '05',
    label: 'Healthy Stress Response',
    title: 'Healthy Stress Response',
    ingredients: 'Ashwagandha KSM-66® · Rhodiola Rosea · Magnesium',
    description: "Flow's adaptogens help your body maintain balance under stress, promoting resilience and reducing the physical toll of daily demands.",
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M14 6V14M14 14C14 14 10 11 7 13M14 14C14 14 18 11 21 13M14 14V22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '06',
    label: 'Balanced Mood & Motivation',
    title: 'Balanced Mood & Motivation',
    ingredients: 'L-Tyrosine · Mucuna Pruriens · Rhodiola Rosea',
    description: 'Support natural dopamine pathways and healthy hormonal balance for a stable, positive outlook. L-Tyrosine and Mucuna Pruriens help lift mood gently, fostering motivation and emotional calm throughout the day.',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=900&q=85&auto=format&fit=crop',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="14" cy="12" r="5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 19C10 19 11 22 14 22C17 22 18 19 18 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M11 11C11 11 12 13 14 13C16 13 17 11 17 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '07',
    label: 'Freedom from Cravings',
    title: 'Freedom from Cravings & Unease',
    ingredients: 'Mucuna Pruriens · Magnesium · L-Theanine',
    description: 'Quiet restless cravings and physical discomfort that pull your attention away. Mucuna Pruriens and Magnesium support dopamine balance and relaxation, helping you stay comfortable, centered, and free from distractions.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&q=85&auto=format&fit=crop',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M6 14C10 14 14 10 14 6C14 10 18 14 22 14C18 14 14 18 14 22C14 18 10 14 6 14Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function HealthBenefits() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section className="max-w-[1360px] mx-auto px-6 py-20">
      <div className="mb-10 space-y-1">
        <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">
          Health Benefits
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
          Everything your body needs.<br />Nothing it doesn&apos;t.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-3 items-stretch">
        {/* Left card grid */}
        <div className="grid grid-cols-2 gap-5">
          {steps.map((s, i) => (
            <button
              key={s.number}
              onClick={() => setActive(i)}
              className={`relative flex flex-col items-center justify-center gap-3 px-3 py-5 text-center transition-all w-full rounded-xl border ${
                active === i
                  ? 'bg-[#1A1A18] text-white border-[#1A1A18] shadow-[0_4px_0_0_rgba(0,0,0,0.35)]'
                  : 'bg-white text-[#1A1A18] border-[var(--color-border)] shadow-[0_4px_0_0_rgba(0,0,0,0.07)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.12)] hover:-translate-y-px'
              }`}
            >
              <span className={`w-11 h-11 shrink-0 ${active === i ? 'text-white' : 'text-[#1A1A18]'}`}>
                {s.icon}
              </span>
              <span className="text-xs font-medium leading-snug">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Right detail panel */}
        <div className="relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-0">
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-cover transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15" />

          {/* Faint large background icon */}
          <div className="absolute top-6 right-6 w-32 h-32 text-white/[0.06] pointer-events-none">
            {step.icon}
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
            <div className="mb-4">
              <div className="w-9 h-9 text-white">{step.icon}</div>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-[-0.02em] mb-3">
              {step.title}
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-px bg-white/30 shrink-0" />
              <span className="text-xs uppercase tracking-[0.1em] text-white/50">{step.ingredients}</span>
            </div>

            <p className="text-sm text-white/90 leading-relaxed mb-6 max-w-sm">
              {step.description}
            </p>

            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/50">
                <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs text-white/50 font-medium tracking-[0.06em]">Clinically Dosed Ingredients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

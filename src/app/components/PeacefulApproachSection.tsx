'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const chapters = [
  {
    topic: 'Partnership',
    label: 'You do the work, we support it',
    body: 'Real progress requires commitment no supplement can replace. Flow is a partner: a steadier foundation, more consistent energy, clearer thinking to build on. The work is still yours — we just make it more manageable.',
  },
  {
    topic: 'Promise',
    label: 'No shortcuts, no magic',
    body: 'Flow is not a magic pill. It can sharpen focus and support energy — but only if the conditions exist. Sleep, movement, recovery are not optional extras. They are the actual work.',
  },
  {
    topic: 'Industry',
    label: 'Anxiety as a business model',
    body: 'We\'re expected to be reachable and optimised at all times. The supplement industry sells into that pressure rather than questioning it. Every label implies you\'re falling short — that anxiety is the product. Wrong foundation for something you take daily.',
  },
  {
    topic: 'Product',
    label: 'Evidence, not marketing',
    body: 'Flow started with one question: what does genuinely honest look like? Every ingredient is research-backed, dosed at clinical levels. Nothing is there to impress on a label, nothing left out to save cost. Every compound is published and verifiable — we expect you to check.',
  },
];

const ease = [0.4, 0, 0.2, 1] as const;

export default function PeacefulApproachSection() {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const safeActive = Math.min(active, chapters.length - 1);
  const activeChapter = chapters[safeActive];

  return (
    <section className="border-t border-[#1E1854]/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 py-14 md:py-16">

        <div className="text-center max-w-[680px] mx-auto space-y-3 mb-8 md:mb-10">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
            A more peaceful approach
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#1E1854]">
            We don&apos;t sell you a better version of yourself. We help you build one.
          </h2>
        </div>

        {/* Mobile: vertical accordion */}
        <div className="md:hidden flex flex-col divide-y divide-[#1E1854]/[0.07] border border-[#1E1854]/[0.08] rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(30,24,84,0.07)]">
          {chapters.map((c, i) => {
            const isOpen = mobileOpen === i;
            return (
              <div key={c.topic} className="bg-white">
                <button
                  onClick={() => setMobileOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div>
                    <span className={`block text-[10px] tracking-[0.14em] uppercase font-semibold mb-0.5 ${isOpen ? 'text-[#3B38B8]' : 'text-[#1E1854]/30'}`}>
                      {c.topic}
                    </span>
                    <span className="text-sm font-medium tracking-[-0.01em] leading-snug text-[#1E1854]">
                      {c.label}
                    </span>
                  </div>
                  <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center ml-4 transition-colors duration-200 ${isOpen ? 'border-[#3B38B8]/40 bg-[#3B38B8]/8' : 'border-[#1E1854]/15'}`}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={isOpen ? '#3B38B8' : 'rgba(30,24,84,0.35)'} strokeWidth="1.5" strokeLinecap="round">
                      {isOpen
                        ? <line x1="2" y1="5" x2="8" y2="5"/>
                        : <><line x1="5" y1="2" x2="5" y2="8"/><line x1="2" y1="5" x2="8" y2="5"/></>
                      }
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-[#1E1854] leading-[1.55] px-5 pb-5">
                        {c.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Desktop: book-page reader */}
        <div className="hidden md:grid grid-cols-[1fr_2fr] gap-0 border border-[#1E1854]/[0.08] rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(30,24,84,0.07)]">

          {/* Chapter index — left spine */}
          <div className="bg-white border-r border-[#1E1854]/[0.07] flex flex-col">
            {chapters.map((c, i) => (
              <button
                key={c.label}
                onClick={() => setActive(i)}
                className={`text-left px-6 py-5 border-b border-[#1E1854]/[0.07] last:border-0 transition-colors duration-200 group ${
                  safeActive === i ? 'bg-[#F7F6FA]' : 'bg-white hover:bg-[#F7F6FA]/60'
                }`}
              >
                <span className={`block text-[10px] tracking-[0.14em] uppercase font-semibold mb-0.5 transition-colors duration-200 ${safeActive === i ? 'text-[#3B38B8]' : 'text-[#1E1854]/25 group-hover:text-[#1E1854]/40'}`}>
                  {c.topic}
                </span>
                <span className={`text-sm font-medium tracking-[-0.01em] transition-colors duration-200 leading-snug ${safeActive === i ? 'text-[#1E1854]' : 'text-[#1E1854]/40 group-hover:text-[#1E1854]/60'}`}>
                  {c.label}
                </span>
              </button>
            ))}
          </div>

          {/* Page content — right */}
          <div className="relative bg-[#FAFAFA] min-h-[200px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={safeActive}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease }}
                className="absolute inset-0 px-10 py-10"
              >
                <div className="space-y-3">
                  <p className="text-xs tracking-[0.12em] uppercase font-semibold text-[#3B38B8]/70">
                    {activeChapter.topic} — {activeChapter.label}
                  </p>
                  <p className="text-[1.05rem] text-[#1E1854]/70 leading-[1.55]">
                    {activeChapter.body}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

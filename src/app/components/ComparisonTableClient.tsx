'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.1, 1] as const;

function CrossIcon() {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 min-w-[28px] min-h-[28px] rounded-full bg-[#1E1854]/[0.06] shrink-0">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 2L8 8M8 2L2 8" stroke="#1E1854" strokeOpacity="0.3" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </span>
  );
}

type Row = {
  order: number;
  topic?: string[];
  feature: string;
  othersLabel?: string;
};

export default function ComparisonTableClient({ interpolatedRows }: { interpolatedRows: Row[] }) {
  return (
    <section className="relative overflow-hidden bg-white border-t border-[#1E1854]/8">


      <div className="relative max-w-[1200px] mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.9, ease }}
          className="mb-12 md:mb-14 space-y-3"
        >
          <p className="text-xs tracking-[0.18em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Why Flow</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-tight text-[#1E1854]">
            How Flow compares
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {interpolatedRows.map((row, i) => (
            <motion.div
              key={row.order}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.75, delay: i * 0.08, ease }}
              whileHover={{ y: -5, transition: { duration: 0.35, ease } }}
              className="group relative rounded-2xl overflow-hidden flex flex-col cursor-default"
              style={{
                background: '#F4F4FB',
                boxShadow: '0 1px 0 0 rgba(255,255,255,0.9) inset, 0 20px 40px rgba(30,24,84,0.08)',
                border: '1px solid rgba(30,24,84,0.08)',
              }}
            >

              {/* Flow section */}
              <div className="px-6 py-6 flex flex-col gap-4 flex-1">
                {row.topic?.[0] && (
                  <div className="flex items-center gap-2">
                    <Image
                      src="/flow-logomark.svg"
                      alt="Flow"
                      width={16}
                      height={16}
                      className="shrink-0 opacity-35"
                    />
                    <p className="text-xs tracking-[0.14em] uppercase font-semibold text-[#1E1854]/35">
                      {row.topic[0]}
                    </p>
                  </div>
                )}
                <p className="text-base text-[#1E1854] leading-relaxed font-semibold">{row.feature}</p>
              </div>


              {/* Others section */}
              <div className="px-6 py-4 flex items-center gap-3">
                <CrossIcon />
                <div>
                  <p className="text-xs tracking-[0.12em] uppercase font-semibold text-[#1E1854]/35 mb-0.5">Others</p>
                  {row.othersLabel && (
                    <p className="text-xs text-[#1E1854]/55 leading-snug">{row.othersLabel}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

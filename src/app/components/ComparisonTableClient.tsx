'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.1, 1] as const;

function CrossIcon() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 md:w-7 md:h-7 min-w-[20px] md:min-w-[28px] rounded-full bg-ink/[0.06] shrink-0">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 2L8 8M8 2L2 8" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="1.4" strokeLinecap="round"/>
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
    <section className="relative overflow-hidden bg-white">


      <div className="relative max-w-[1200px] mx-auto px-6 pt-4 pb-20 md:pt-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.9, ease }}
          className="mb-6 space-y-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.08] text-ink">
            How Flow compares
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {interpolatedRows.map((row, i) => (
            <motion.div
              key={row.order}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.75, delay: i * 0.06, ease }}
              whileHover={{ y: -4, transition: { duration: 0.35, ease } }}
              className="group relative rounded-xl md:rounded-2xl overflow-hidden flex flex-col cursor-default"
              style={{
                background: '#F4F4FB',
                boxShadow: '0 1px 0 0 rgba(255,255,255,0.9) inset, 0 8px 24px rgba(30,24,84,0.07)',
                border: '1px solid rgba(30,24,84,0.08)',
              }}
            >

              {/* Flow section */}
              <div className="px-3 py-3 md:px-4 md:py-4 flex flex-col gap-1.5 flex-1">
                {row.topic?.[0] && (
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/flow-logomark.svg"
                      alt="Flow"
                      width={12}
                      height={12}
                      className="shrink-0 opacity-35"
                    />
                    <p className="text-[10px] tracking-[0.12em] uppercase font-semibold text-ink/35">
                      {row.topic[0]}
                    </p>
                  </div>
                )}
                <p className="text-xs md:text-sm text-ink leading-snug font-semibold">{row.feature}</p>
              </div>

              {/* Others section */}
              <div className="px-3 py-2.5 md:px-4 md:py-3 flex items-center gap-2">
                <CrossIcon />
                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-semibold text-ink/35 mb-0.5">Others</p>
                  {row.othersLabel && (
                    <p className="text-[10px] md:text-xs text-ink/55 leading-snug">{row.othersLabel}</p>
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

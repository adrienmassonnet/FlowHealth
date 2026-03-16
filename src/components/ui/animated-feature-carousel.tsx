"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface Step {
  id: string
  label: string
  title: string
  description: string
  image: string
}

interface FeatureCarouselProps {
  steps: readonly Step[]
  interval?: number
}

function useNumberCycler(total: number, interval: number) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const id = setTimeout(() => setCurrent((p) => (p + 1) % total), interval)
    return () => clearTimeout(id)
  }, [current, total, interval])
  const setStep = useCallback((i: number) => setCurrent(i % total), [total])
  return { current, setStep }
}

export function FeatureCarousel({ steps, interval = 7000 }: FeatureCarouselProps) {
  const { current, setStep } = useNumberCycler(steps.length, interval)
  const active = steps[current]

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 items-stretch">

      {/* Left: vertical benefit list */}
      <nav className="flex flex-col justify-center">
        {steps.map((step, i) => {
          const isActive = current === i
          return (
            <button
              key={step.id}
              onClick={() => setStep(i)}
              className={`group w-full text-left px-4 py-4 border-l-2 transition-all duration-300 ${
                isActive
                  ? 'border-[hsla(var(--color-accent)/1)] text-[#1A1A18]'
                  : 'border-[var(--color-border)] text-[hsla(var(--color-secondary)/0.5)] hover:text-[hsla(var(--color-secondary)/0.9)] hover:border-[hsla(var(--color-secondary)/0.3)]'
              }`}
            >
              <span className={`block text-base font-medium tracking-[-0.01em] transition-all duration-300 ${isActive ? 'font-semibold' : ''}`}>
                {step.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Right: card */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[#F8F8F8] min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0 flex flex-col md:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Text content */}
            <div className="flex flex-col justify-center p-10 md:w-[52%] gap-5">
              <motion.p
                className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsla(var(--color-accent)/1)]"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {active.label}
              </motion.p>
              <motion.h3
                className="text-3xl md:text-[2.5rem] font-bold tracking-[-0.03em] text-[#1A1A18] leading-[1.1]"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {active.title}
              </motion.h3>
              <motion.p
                className="text-base leading-[1.7] text-[hsla(var(--color-secondary)/1)]"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {active.description}
              </motion.p>
            </div>

            {/* Image */}
            <motion.div
              className="md:w-[48%] relative overflow-hidden"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={active.image}
                alt={active.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Subtle fade on left edge to blend with card */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F8F8F8] to-transparent" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}

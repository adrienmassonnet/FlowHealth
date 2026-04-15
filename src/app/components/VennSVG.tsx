'use client';

import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.1, 1] as const;

const circles = [
  { cx: 160, cy: 155, fill: 'rgba(255,255,255,0.05)' },
  { cx: 380, cy: 155, fill: 'rgba(255,255,255,0.05)' },
  { cx: 270, cy: 346, fill: 'rgba(255,255,255,0.07)' },
];

export default function VennSVG({ activeIngredients, inView }: { activeIngredients: number; inView: boolean }) {
  return (
    <svg
      viewBox="0 0 535 510"
      className="w-full max-w-xs mx-auto md:max-w-full"
      style={{ fontFamily: 'inherit' }}
    >
      {circles.map(({ cx, cy, fill }) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={150}
          fill={fill}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}

      <text
        textAnchor="middle"
        fontSize="30"
        fontWeight="600"
        fill="rgba(255,255,255,0.88)"
        letterSpacing="-0.6"
      >
        <tspan x="115" y="137">A pleasant</tspan>
        <tspan x="115" dy="36">taste</tspan>
      </text>

      <text
        textAnchor="middle"
        fontSize="30"
        fontWeight="600"
        fill="rgba(255,255,255,0.88)"
        letterSpacing="-0.6"
      >
        <tspan x="420" y="137">Convenient</tspan>
        <tspan x="420" dy="36">daily packet</tspan>
      </text>

      <text
        textAnchor="middle"
        fontSize="30"
        fontWeight="600"
        fill="rgba(255,255,255,0.88)"
        letterSpacing="-0.6"
      >
        <tspan x="270" y="348">One sachet,</tspan>
        <tspan x="270" dy="36">{`${activeIngredients} ingredients`}</tspan>
      </text>
    </svg>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';

const STIM_COLOR = '#D97706';
const FLOW_COLOR = '#3B38B8';

const cards = [
  {
    stimLabel: 'The morning rush',
    flowLabel: 'Sustained prime state',
    stim: 'Caffeine spikes a brain already at its peak. The surplus will be collected.',
    flow: 'Zynamite® and Lion\'s Mane sustain the natural peak — no debt, no rebound.',
  },
  {
    stimLabel: 'The crash sets in',
    flowLabel: 'Less fatigue, less distraction',
    stim: 'Dopamine drops. Focus splinters. The brain craves the next hit.',
    flow: 'Ginseng and Saffr\'Active® hold dopamine steady. Inulin supports the gut-brain axis. No trough, no craving.',
  },
  {
    stimLabel: 'End-of-day drowsiness',
    flowLabel: 'Stability that satisfies',
    stim: 'Cortisol never cleared. Sleep suffers. Tomorrow starts lower.',
    flow: 'Rooibos and Magnesium restore what the day used. A brain that ends full has no reason to reach for more.',
  },
];

/*
  Stim path: M180,146 C232,138 250,22 290,18 C330,14 374,92 415,130
             C444,154 462,198 490,208 C518,218 542,148 600,78
             C628,38 652,118 680,142 C724,170 768,178 820,178

  Dot 1 (spike peak):   x=290, y=18   — top of spike
  Dot 2 (trough base):  x=490, y=208  — deepest point of U (midpoint of segment C444,154 462,198 490,208)
  Dot 3 (evening):      x=820, y=178  — on line (already correct, y matches path endpoint)

  "2nd coffee" marker at centre of U curve = x=490, y=208 is the trough bottom.
  The re-intake starts as the line rises again, so place it at x=530, y=215 (just past trough on upswing).

  Flow path: M180,146 C272,130 336,88 400,88 C524,88 588,90 650,92 C748,95 816,102 880,108
  Dot 1: x=290, on seg M180,146→400,88. t where bezier_x=290:
    Px(t)=(1-t)³·180+3(1-t)²t·272+3(1-t)t²·336+t³·400=290 → t≈0.50
    Py(t)=(1-t)³·146+3(1-t)²t·130+3(1-t)t²·88+t³·88 ≈ 0.125·146+0.375·130+0.375·88+0.125·88=111
  Dot 2: x=490, on seg C400,88→880,108 (ctrl 524,88 650,92). At x=490 t≈0.19 → y≈88
  Dot 3: x=820, on seg C650,92→880,108 (ctrl 748,95 816,102). t≈0.57 → y≈102
*/
// All y values rescaled from original 320-height viewBox to new 500-height viewBox (* 500/320)
const dots = {
  stim: [
    { cx: 290, cy: 28  },   // spike peak
    { cx: 445, cy: 250 },   // first baseline crossing descending
    { cx: 820, cy: 278 },   // evening
  ],
  flow: [
    { cx: 280, cy: 180 },   // mid-rise, 10px left + slight down following rise slope
    { cx: 470, cy: 138 },   // plateau, 20px left, flat so y stays
    { cx: 780, cy: 158 },   // evening, 40px left + slight up following gentle decline
  ],
};

export default function DayArcSection() {
  const [mode, setMode] = useState<'stim' | 'flow'>('stim');
  const [visible, setVisible] = useState(false);
  const [chartHeight, setChartHeight] = useState<number>(360);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = cardColRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setChartHeight(el.getBoundingClientRect().height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const accentColor = mode === 'stim' ? STIM_COLOR : FLOW_COLOR;
  const dotPositions = dots[mode];

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 bg-white"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s cubic-bezier(0.25,0.1,0.1,1), transform 0.7s cubic-bezier(0.25,0.1,0.1,1)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-[720px] mx-auto mb-8 space-y-3">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
            Win your morning, win your day
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.03em] leading-[1.15] text-[#1E1854]">
            Set your chemistry right for the entire day.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(30,24,84,0.55)' }}>
            Flow is built for the morning window — when adenosine has cleared and cortisol peaks naturally. Most drinks overstimulate a brain that was already primed. Flow works with that biology, not against it.
          </p>
        </div>

        {/* Body: cards left, chart right */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

          {/* Left column: toggle + cards — wider */}
          <div ref={cardColRef} className="flex flex-col gap-3 md:w-[460px] shrink-0 w-full">

            {/* Toggle — pill switch with cross-fading backgrounds */}
            <div
              className="relative flex items-center w-fit rounded-full p-1 mb-1 cursor-pointer overflow-hidden"
              style={{ isolation: 'isolate' }}
              onClick={() => setMode(mode === 'stim' ? 'flow' : 'stim')}
              role="switch"
              aria-checked={mode === 'flow'}
            >
              {/* Track: off state */}
              <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(30,24,84,0.08)', opacity: mode === 'stim' ? 1 : 0, transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)' }} />
              {/* Track: on state */}
              <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg,#3B38B8,#1E1854)', opacity: mode === 'flow' ? 1 : 0, transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)' }} />
              {/* Sliding thumb */}
              <div
                className="absolute top-1 bottom-1 rounded-full"
                style={{
                  background: mode === 'stim' ? '#fff' : 'rgba(255,255,255,0.18)',
                  left: mode === 'stim' ? '4px' : 'calc(50% + 2px)',
                  right: mode === 'stim' ? 'calc(50% + 2px)' : '4px',
                  boxShadow: mode === 'stim' ? '0 1px 6px rgba(30,24,84,0.14)' : 'none',
                  transition: 'left 0.5s cubic-bezier(0.4,0,0.2,1), right 0.5s cubic-bezier(0.4,0,0.2,1), background 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s',
                  zIndex: 1,
                }}
              />
              {/* With caffeine label */}
              <div className="relative px-5 py-1.5" style={{ zIndex: 2 }}>
                <span className="text-sm font-medium whitespace-nowrap" style={{ color: mode === 'stim' ? '#1E1854' : 'rgba(255,255,255,0.5)', transition: 'color 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
                  With caffeine
                </span>
              </div>
              {/* With Flow label */}
              <div className="relative px-5 py-1.5" style={{ zIndex: 2 }}>
                <span className="text-sm font-medium whitespace-nowrap" style={{ color: mode === 'flow' ? '#fff' : 'rgba(30,24,84,0.4)', transition: 'color 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
                  With Flow
                </span>
              </div>
            </div>

            {/* Cards with number badges */}
            {cards.map((c, i) => (
              <div
                key={i}
                className="rounded-2xl border px-5 py-4 transition-all duration-500"
                style={{
                  background: '#F8F8FB',
                  borderColor: 'rgba(30,24,84,0.07)',
                  boxShadow: '0 2px 16px rgba(30,24,84,0.06)',
                }}
                onMouseEnter={e => {
                  setHoveredCard(i);
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 36px rgba(30,24,84,0.13)';
                }}
                onMouseLeave={e => {
                  setHoveredCard(null);
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(30,24,84,0.06)';
                }}
              >
                {/* Badge + label on same row */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold transition-all duration-500"
                    style={{
                      background: mode === 'stim' ? STIM_COLOR : 'linear-gradient(135deg,#3B38B8,#1E1854)',
                      color: '#fff',
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    className="text-xs md:text-sm font-semibold tracking-[-0.01em]"
                    style={{ color: '#1E1854' }}
                  >
                    {mode === 'stim' ? c.stimLabel : c.flowLabel}
                  </p>
                </div>
                <p className="text-[11px] md:text-xs leading-relaxed transition-all duration-300" style={{ color: 'rgba(30,24,84,0.55)' }}>
                  {mode === 'stim' ? c.stim : c.flow}
                </p>
              </div>
            ))}
          </div>

          {/* Right: SVG chart */}
          <div className="flex-1 min-w-0 w-full" style={{ height: chartHeight || undefined }}>
            <svg
              viewBox="0 0 920 500"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
              className="block overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="dayArcFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B38B8" />
                  <stop offset="100%" stopColor="#1E1854" />
                </linearGradient>
                <filter id="dayArcGF" x="-20%" y="-60%" width="140%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="dayArcGS" x="-20%" y="-60%" width="140%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/*
                viewBox 920×500. Chart zone: y 20–400 (380px range). Baseline at y=250.
                x-axis at y=420. Labels at y=445.
                All original y coords (baseline=160, range 18–208 in 320px box)
                rescaled: newY = 20 + (oldY / 320) * 380
              */}

              {/* Baseline */}
              <line x1="40" y1="250" x2="880" y2="250" stroke="#EEEDF5" strokeWidth="1.5" />
              {/* x-axis */}
              <line x1="40" y1="420" x2="880" y2="420" stroke="#E8E7F2" strokeWidth="1.5" />

              {/* X labels — larger and more opaque */}
              {[
                { x: 40,  label: 'Wake'    },
                { x: 180, label: 'Intake'  },
                { x: 490, label: '2–4 hrs' },
                { x: 820, label: 'Evening' },
              ].map(({ x, label }) => (
                <text key={label} x={x} y="445" textAnchor="middle" fontSize="18" fill="rgba(30,24,84,0.55)" fontFamily="Inter,system-ui" fontWeight="500">
                  {label}
                </text>
              ))}
              <line x1="180" y1="414" x2="180" y2="422" stroke="rgba(30,24,84,0.2)" strokeWidth="1.5" />
              <line x1="490" y1="414" x2="490" y2="422" stroke="rgba(30,24,84,0.2)" strokeWidth="1.5" />
              <line x1="820" y1="414" x2="820" y2="422" stroke="rgba(30,24,84,0.2)" strokeWidth="1.5" />

              {/*
                Rescaled paths (multiply all y by 500/320 ≈ 1.5625, keeping x unchanged):
                baseline 160 → 250, spike 18 → 28, trough 208 → 325, flow plateau 88 → 138
                Shared: M40,250 C100,250 148,231 180,228
                Stim:   M180,228 C232,216 250,34 290,28 C330,22 374,144 415,203
                        C444,241 462,309 490,325 C518,341 542,231 600,122
                        C628,59 652,184 680,222 C724,266 768,278 820,278 C848,278 868,279 880,281
                Flow:   M180,228 C272,203 336,138 400,138 C524,138 588,141 650,144
                        C748,148 816,160 880,169
              */}

              {/* Shared Wake→Intake */}
              <path
                d="M40,250 C120,250 155,232 180,228"
                stroke={mode === 'flow' ? 'rgba(59,56,184,0.35)' : 'rgba(30,24,84,0.18)'}
                strokeWidth="2.8" fill="none" strokeLinecap="round"
                style={{ transition: 'stroke 0.4s' }}
              />

              {/* Stimulant line */}
              <g style={{ opacity: mode === 'stim' ? 1 : 0.1, transition: 'opacity 0.4s' }}>
                <path
                  d="M180,228 C220,222 255,28 290,28 C325,28 365,156 415,203 C448,232 468,312 490,325 C512,338 548,222 600,122 C624,62 656,178 680,222 C716,268 768,278 820,278 C848,278 865,279 880,281"
                  stroke={STIM_COLOR} strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.07"
                />
                <path
                  d="M180,228 C220,222 255,28 290,28 C325,28 365,156 415,203 C448,232 468,312 490,325 C512,338 548,222 600,122 C624,62 656,178 680,222 C716,268 768,278 820,278 C848,278 865,279 880,281"
                  stroke={STIM_COLOR} strokeWidth="2.8" fill="none" strokeLinecap="round" filter="url(#dayArcGS)"
                />
                {/* 2nd coffee marker */}
                <circle cx="490" cy="325" r="7" fill={STIM_COLOR} opacity="0.10" />
                <circle cx="490" cy="325" r="3.5" fill={STIM_COLOR} opacity="0.5" />
                <text x="500" y="344" fontSize="18" fill={STIM_COLOR} fontFamily="Inter,system-ui" fontWeight="600" opacity="0.6">
                  2nd coffee
                </text>
              </g>

              {/* Flow line */}
              <g style={{ opacity: mode === 'flow' ? 1 : 0.12, transition: 'opacity 0.4s' }}>
                <path
                  d="M180,228 C260,210 320,138 400,138 C490,138 570,140 650,144 C740,148 810,158 880,169"
                  stroke="#3B38B8" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.06"
                />
                <path
                  d="M180,228 C260,210 320,138 400,138 C490,138 570,140 650,144 C740,148 810,158 880,169"
                  stroke="url(#dayArcFlowGrad)" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#dayArcGF)"
                />
              </g>

              {/* Anchor dots — expand subtly on card hover using SVG transform */}
              {dotPositions.map((d, i) => {
                const hovered = hoveredCard === i;
                const scale = hovered ? 1.5 : 1;
                return (
                  <g
                    key={i}
                    transform={`translate(${d.cx},${d.cy}) scale(${scale}) translate(${-d.cx},${-d.cy})`}
                    style={{ transition: 'transform 0.35s cubic-bezier(0.25,0.1,0.1,1)' }}
                  >
                    <circle cx={d.cx} cy={d.cy} r="13" fill={accentColor} opacity={hovered ? 0.2 : 0.12} style={{ transition: 'opacity 0.35s' }} />
                    <circle cx={d.cx} cy={d.cy} r="6.5" fill={accentColor} />
                  </g>
                );
              })}
            </svg>
          </div>

        </div>


      </div>
    </section>
  );
}
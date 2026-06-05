'use client';

import { useState, useEffect, useRef } from 'react';

const STIM_COLOR = '#D97706';
const FLOW_COLOR = '#3B38B8';

const cards = [
  {
    stimLabel: 'The morning rush',
    flowLabel: 'Sustained prime state',
    stim: 'Caffeine arrives when your brain is already primed. Adenosine keeps building behind blocked receptors — the debt accrues quietly.',
    flow: 'Zynamite® works with your brain\'s own chemistry — no adenosine debt, no rebound. The peak holds because nothing borrowed it.',
  },
  {
    stimLabel: 'The crash sets in',
    flowLabel: 'Less fatigue, less distraction',
    stim: 'Dopamine drops. Focus splinters. The brain craves the next hit.',
    flow: 'Ginseng and Saffr\'Active® hold focus and mood steady. Inulin quiets the gut–brain noise daily.',
  },
  {
    stimLabel: 'End-of-day drowsiness',
    flowLabel: 'Stability that satisfies',
    stim: 'Adenosine still circulating at bedtime. Sleep shallows. Tomorrow\'s baseline starts lower.',
    flow: 'Rooibos eases the day\'s cortisol load. Magnesium deepens overnight repair. Lion\'s Mane builds what lasts. A brain that ends restored has no reason to reach for more.',
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
    Px(t)=(1-t)^3*180+3(1-t)^2*t*272+3(1-t)*t^2*336+t^3*400=290 -> t~0.50
    Py(t)=(1-t)^3*146+3(1-t)^2*t*130+3(1-t)*t^2*88+t^3*88 ~ 0.125*146+0.375*130+0.375*88+0.125*88=111
  Dot 2: x=490, on seg C400,88→880,108 (ctrl 524,88 650,92). At x=490 t≈0.19 → y≈88
  Dot 3: x=820, on seg C650,92→880,108 (ctrl 748,95 816,102). t≈0.57 → y≈102
*/
// All y values rescaled from original 320-height viewBox to new 500-height viewBox (* 500/320)
const dots = {
  stim: [
    { cx: 370, cy: 145 },  // broad peak
    { cx: 580, cy: 305 },  // trough
    { cx: 820, cy: 210 },  // evening
  ],
  flow: [
    { cx: 320, cy: 200 },  // early rise
    { cx: 490, cy: 183 },  // peak plateau
    { cx: 820, cy: 226 },  // gentle evening decline
  ],
};

export default function DayArcSection() {
  const [mode, setMode] = useState<'stim' | 'flow'>('stim');
  const [visible, setVisible] = useState(false);
  const [chartHeight, setChartHeight] = useState<number>(360);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
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
        <div className="text-center max-w-[720px] mx-auto mb-8 space-y-4">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
              Win your morning, win your day
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.03em] leading-[1.08] text-[#1E1854]">
              Set your chemistry right for the entire day.
            </h2>
          </div>
          <p className="text-sm leading-[1.55]" style={{ color: 'rgba(30,24,84,0.55)' }}>
            Flow is built for the morning window — when adenosine has cleared and cortisol peaks naturally. Most drinks overstimulate that primed state. Flow works with your biology, not against it.
          </p>
        </div>

        {/* Mobile: toggle + chart above cards */}
        <div className="md:hidden mb-5 w-full">
          {/* Toggle — mobile only, above chart */}
          <div
            className="relative inline-flex items-center rounded-full p-[3px] mb-1 cursor-pointer overflow-hidden border border-[#1E1854]/10"
            style={{ isolation: 'isolate' }}
            onClick={() => setMode(mode === 'stim' ? 'flow' : 'stim')}
            role="switch"
            aria-checked={mode === 'flow'}
          >
            <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(30,24,84,0.08)', opacity: mode === 'stim' ? 1 : 0, transition: 'opacity 0.5s' }} />
            <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg,#3B38B8,#1E1854)', opacity: mode === 'flow' ? 1 : 0, transition: 'opacity 0.5s' }} />
            <div className="absolute top-[3px] bottom-[3px] rounded-full" style={{ background: mode === 'stim' ? '#fff' : 'rgba(255,255,255,0.18)', left: mode === 'stim' ? '3px' : 'calc(50% + 1px)', right: mode === 'stim' ? 'calc(50% + 1px)' : '3px', boxShadow: mode === 'stim' ? '0 1px 6px rgba(30,24,84,0.14)' : 'none', transition: 'left 0.45s cubic-bezier(0.4,0,0.2,1), right 0.45s cubic-bezier(0.4,0,0.2,1), background 0.45s', zIndex: 1 }} />
            <div className="relative flex-1 flex items-center justify-center px-4 py-1.5" style={{ zIndex: 2 }}>
              <span className="text-xs font-medium whitespace-nowrap" style={{ color: mode === 'stim' ? '#1E1854' : 'rgba(255,255,255,0.5)', transition: 'color 0.5s' }}>With caffeine</span>
            </div>
            <div className="relative flex-1 flex items-center justify-center px-4 py-1.5" style={{ zIndex: 2 }}>
              <span className="text-xs font-medium whitespace-nowrap" style={{ color: mode === 'flow' ? '#fff' : 'rgba(30,24,84,0.4)', transition: 'color 0.5s' }}>With Flow</span>
            </div>
          </div>
        </div>

        <div className="md:hidden mb-5 w-full">
          <svg
            viewBox="0 0 920 500"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            className="block overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="dayArcFlowGradM" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B38B8" />
                <stop offset="100%" stopColor="#1E1854" />
              </linearGradient>
              <filter id="dayArcGFM" x="-20%" y="-60%" width="140%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="dayArcGSM" x="-20%" y="-60%" width="140%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <line x1="40" y1="420" x2="880" y2="420" stroke="#E8E7F2" strokeWidth="1.5" />
            {[{ x: 40, label: 'Wake' }, { x: 180, label: 'Intake' }, { x: 490, label: '2–4 hrs' }, { x: 650, label: '2nd coffee' }, { x: 820, label: 'Evening' }].map(({ x, label }) => (
              <text key={label} x={x} y="445" textAnchor="middle" fontSize="18" fill="rgba(30,24,84,0.55)" fontFamily="Inter,system-ui" fontWeight="500">{label}</text>
            ))}
            <line x1="180" y1="414" x2="180" y2="422" stroke="rgba(30,24,84,0.2)" strokeWidth="1.5" />
            <line x1="490" y1="414" x2="490" y2="422" stroke="rgba(30,24,84,0.2)" strokeWidth="1.5" />
            <line x1="650" y1="414" x2="650" y2="422" stroke="rgba(30,24,84,0.2)" strokeWidth="1.5" />
            <line x1="820" y1="414" x2="820" y2="422" stroke="rgba(30,24,84,0.2)" strokeWidth="1.5" />
            <path d="M180,228 C400,240 620,258 880,270" stroke="rgba(30,24,84,0.22)" strokeWidth="2" strokeDasharray="7,5" fill="none" strokeLinecap="round" />
            <g style={{ opacity: mode === 'stim' ? 1 : 0.08, transition: 'opacity 0.4s' }}>
              <path d="M40,260 C100,258 150,240 180,228 C210,216 220,195 240,180 C270,158 330,148 370,145 C410,142 440,165 490,200 C530,228 550,295 580,305 C610,315 630,270 650,210 C668,158 680,195 720,215 C760,232 790,215 820,210 C848,208 865,209 880,210" stroke={STIM_COLOR} strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.07" />
              <path d="M40,260 C100,258 150,240 180,228 C210,216 220,195 240,180 C270,158 330,148 370,145 C410,142 440,165 490,200 C530,228 550,295 580,305 C610,315 630,270 650,210 C668,158 680,195 720,215 C760,232 790,215 820,210 C848,208 865,209 880,210" stroke={STIM_COLOR} strokeWidth="2.8" fill="none" strokeLinecap="round" filter="url(#dayArcGSM)" />
            </g>
            <g style={{ opacity: mode === 'flow' ? 1 : 0.08, transition: 'opacity 0.4s' }}>
              <path d="M40,260 C100,258 150,242 180,236 C220,226 270,210 320,200 C370,190 430,185 490,183 C560,181 620,186 680,196 C740,208 790,222 820,226 C848,228 865,230 880,232" stroke="#3B38B8" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.06" />
              <path d="M40,260 C100,258 150,242 180,236 C220,226 270,210 320,200 C370,190 430,185 490,183 C560,181 620,186 680,196 C740,208 790,222 820,226 C848,228 865,230 880,232" stroke="url(#dayArcFlowGradM)" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#dayArcGFM)" />
            </g>
            {dotPositions.map((d, i) => (
              <g key={i}>
                <circle cx={d.cx} cy={d.cy} r="13" fill={accentColor} opacity="0.12" />
                <circle cx={d.cx} cy={d.cy} r="6.5" fill={accentColor} />
              </g>
            ))}
          </svg>
        </div>

        {/* Body: cards left, chart right */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

          {/* Left column: toggle + cards — wider */}
          <div ref={cardColRef} className="flex flex-col gap-3 md:w-[460px] shrink-0 w-full">

            {/* Toggle — desktop only (mobile toggle is above chart) */}
            <div
              className="hidden md:inline-flex relative items-center self-start rounded-full p-[3px] mb-4 cursor-pointer overflow-hidden border border-[#1E1854]/10"
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
                className="absolute top-[3px] bottom-[3px] rounded-full"
                style={{
                  background: mode === 'stim' ? '#fff' : 'rgba(255,255,255,0.18)',
                  left: mode === 'stim' ? '3px' : 'calc(50% + 1px)',
                  right: mode === 'stim' ? 'calc(50% + 1px)' : '3px',
                  boxShadow: mode === 'stim' ? '0 1px 6px rgba(30,24,84,0.14)' : 'none',
                  transition: 'left 0.45s cubic-bezier(0.4,0,0.2,1), right 0.45s cubic-bezier(0.4,0,0.2,1), background 0.45s, box-shadow 0.45s',
                  zIndex: 1,
                }}
              />
              {/* With caffeine label */}
              <div className="relative flex-1 flex items-center justify-center px-4 py-1.5" style={{ zIndex: 2 }}>
                <span className="text-xs font-medium whitespace-nowrap" style={{ color: mode === 'stim' ? '#1E1854' : 'rgba(255,255,255,0.5)', transition: 'color 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
                  With caffeine
                </span>
              </div>
              {/* With Flow label */}
              <div className="relative flex-1 flex items-center justify-center px-4 py-1.5" style={{ zIndex: 2 }}>
                <span className="text-xs font-medium whitespace-nowrap" style={{ color: mode === 'flow' ? '#fff' : 'rgba(30,24,84,0.4)', transition: 'color 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
                  With Flow
                </span>
              </div>
            </div>

            {/* Cards with number badges */}
            {cards.map((c, i) => {
              const isOpen = mobileOpen === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border transition-all duration-500"
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
                  {/* Badge + label + chevron */}
                  <div
                    className="flex items-center gap-2 px-4 py-3 md:px-5 md:py-4 cursor-pointer md:cursor-default"
                    onClick={() => setMobileOpen(isOpen ? null : i)}
                  >
                    <div
                      className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold transition-all duration-500"
                      style={{ background: mode === 'stim' ? STIM_COLOR : 'linear-gradient(135deg,#3B38B8,#1E1854)', color: '#fff' }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-sm font-semibold tracking-[-0.01em] flex-1" style={{ color: '#1E1854' }}>
                      {mode === 'stim' ? c.stimLabel : c.flowLabel}
                    </p>
                    <svg
                      className={`md:hidden shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      width="14" height="14" viewBox="0 0 14 14" fill="none"
                    >
                      <path d="M3 5l4 4 4-4" stroke="rgba(30,24,84,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {/* Description — always visible on desktop, accordion on mobile */}
                  <div className={`md:block ${isOpen ? 'block' : 'hidden'}`}>
                    <p className="text-sm leading-[1.55] px-4 pb-3 md:px-5 md:pb-4 md:pt-0" style={{ color: 'rgba(30,24,84,0.55)' }}>
                      {mode === 'stim' ? c.stim : c.flow}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: SVG chart — hidden on mobile, unreadable at small sizes */}
          <div className="hidden md:block flex-1 min-w-0 w-full" style={{ height: chartHeight || undefined }}>
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
                viewBox 920x500. Chart zone: y 20-400 (380px range). Baseline at y=250.
                x-axis at y=420. Labels at y=445.
                All original y coords (baseline=160, range 18–208 in 320px box)
                rescaled: newY = 20 + (oldY / 320) * 380
              */}

              {/* x-axis */}
              <line x1="40" y1="420" x2="880" y2="420" stroke="#E8E7F2" strokeWidth="1.5" />

              {/* X labels */}
              {[
                { x: 40,  label: 'Wake'    },
                { x: 180, label: 'Intake'  },
                { x: 490, label: '2–4 hrs' },
                { x: 650, label: '2nd coffee' },
                { x: 820, label: 'Evening' },
              ].map(({ x, label }) => (
                <text key={label} x={x} y="445" textAnchor="middle" fontSize="18" fill="rgba(30,24,84,0.55)" fontFamily="Inter,system-ui" fontWeight="500">
                  {label}
                </text>
              ))}
              <line x1="180" y1="414" x2="180" y2="422" stroke="rgba(30,24,84,0.2)" strokeWidth="1.5" />
              <line x1="490" y1="414" x2="490" y2="422" stroke="rgba(30,24,84,0.2)" strokeWidth="1.5" />
              <line x1="650" y1="414" x2="650" y2="422" stroke="rgba(30,24,84,0.2)" strokeWidth="1.5" />
              <line x1="820" y1="414" x2="820" y2="422" stroke="rgba(30,24,84,0.2)" strokeWidth="1.5" />

              {/* Legend */}
              <g>
                <line x1="40" y1="30" x2="72" y2="30" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'stroke 0.4s' }} />
                <text x="80" y="35" fontSize="16" fill="rgba(30,24,84,0.7)" fontFamily="Inter,system-ui" fontWeight="500">
                  {mode === 'stim' ? 'With caffeine' : 'With Flow'}
                </text>
                <line x1="220" y1="30" x2="252" y2="30" stroke="rgba(30,24,84,0.3)" strokeWidth="2" strokeDasharray="5,4" strokeLinecap="round" />
                <text x="260" y="35" fontSize="16" fill="rgba(30,24,84,0.5)" fontFamily="Inter,system-ui" fontWeight="500">
                  Natural baseline
                </text>
              </g>

              {/* Natural baseline — diagonal dashed from Intake level down to Evening */}
              <path
                d="M180,228 C400,240 620,258 880,270"
                stroke="rgba(30,24,84,0.22)"
                strokeWidth="2"
                strokeDasharray="7,5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Stimulant line — broad peak around 370, trough at 530, second peak at 650, declining */}
              <g style={{ opacity: mode === 'stim' ? 1 : 0.08, transition: 'opacity 0.4s' }}>
                <path
                  d="M40,260 C100,258 150,240 180,228 C210,216 220,195 240,180 C270,158 330,148 370,145 C410,142 440,165 490,200 C530,228 550,295 580,305 C610,315 630,270 650,210 C668,158 680,195 720,215 C760,232 790,215 820,210 C848,208 865,209 880,210"
                  stroke={STIM_COLOR} strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.07"
                />
                <path
                  d="M40,260 C100,258 150,240 180,228 C210,216 220,195 240,180 C270,158 330,148 370,145 C410,142 440,165 490,200 C530,228 550,295 580,305 C610,315 630,270 650,210 C668,158 680,195 720,215 C760,232 790,215 820,210 C848,208 865,209 880,210"
                  stroke={STIM_COLOR} strokeWidth="2.8" fill="none" strokeLinecap="round" filter="url(#dayArcGS)"
                />
              </g>

              {/* Flow line — modest rise above baseline, broad gentle arc */}
              <g style={{ opacity: mode === 'flow' ? 1 : 0.08, transition: 'opacity 0.4s' }}>
                <path
                  d="M40,260 C100,258 150,242 180,236 C220,226 270,210 320,200 C370,190 430,185 490,183 C560,181 620,186 680,196 C740,208 790,222 820,226 C848,228 865,230 880,232"
                  stroke="#3B38B8" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.06"
                />
                <path
                  d="M40,260 C100,258 150,242 180,236 C220,226 270,210 320,200 C370,190 430,185 490,183 C560,181 620,186 680,196 C740,208 790,222 820,226 C848,228 865,230 880,232"
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
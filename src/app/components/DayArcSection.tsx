'use client';

import { useState, useEffect, useRef } from 'react';

const STIM_COLOR = '#D97706';
const FLOW_COLOR = '#3B38B8';

const STIM_PATH = "M40,290 C80,272 130,248 180,225 C210,208 240,180 270,158 C300,138 340,130 380,128 C410,127 440,145 470,172 C490,192 510,240 535,278 C555,308 575,318 600,305 C620,288 638,252 655,210 C668,176 682,158 705,170 C728,185 750,200 770,210 C790,218 810,218 835,214 C855,210 870,208 880,210";
const FLOW_PATH = "M40,290 C80,272 130,248 180,225 C210,210 235,198 260,190 C290,181 330,174 370,170 C410,167 450,166 490,166 C530,167 565,170 600,174 C635,178 670,184 710,191 C745,197 785,207 820,216 C848,222 865,226 880,228";

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

const dots = {
  stim: [
    { cx: 380, cy: 128 },
    { cx: 535, cy: 278 },
    { cx: 835, cy: 214 },
  ],
  flow: [
    { cx: 370, cy: 170 },
    { cx: 560, cy: 172 },
    { cx: 790, cy: 207 },
  ],
};

export default function DayArcSection() {
  const [mode, setMode] = useState<'stim' | 'flow'>('stim');
  const [visible, setVisible] = useState(false);
  const [chartHeight, setChartHeight] = useState<number>(360);
  const [toggleHeight, setToggleHeight] = useState<number>(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardColRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

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
    const measure = () => {
      setChartHeight(el.getBoundingClientRect().height);
      if (toggleRef.current) {
        // offsetHeight + mb-4 (16px) + gap-3 (12px) between toggle and first card
        setToggleHeight(toggleRef.current.offsetHeight + 16 + 12);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
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
            Flow is built for the morning window — when adenosine has cleared and cortisol peaks naturally. Most drinks overstimulate a brain that was already primed. Flow works with that biology, not against it.
          </p>
        </div>

        {/* Mobile: toggle above chart */}
        <div className="md:hidden mb-5 w-full">
          <div
            className="relative flex items-center rounded-full p-[3px] mb-1 cursor-pointer overflow-hidden border border-[#1E1854]/10"
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

        {/* Mobile chart */}
        <div className="md:hidden mb-5 w-full rounded-2xl overflow-hidden" style={{ background: '#F8F8FB', boxShadow: '0 2px 16px rgba(30,24,84,0.07)', padding: '16px 8px 8px' }}>
          <svg
            viewBox="0 0 920 480"
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
              <linearGradient id="stimFillM" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={STIM_COLOR} stopOpacity="0.12" />
                <stop offset="100%" stopColor={STIM_COLOR} stopOpacity="0" />
              </linearGradient>
              <linearGradient id="flowFillM" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B38B8" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#3B38B8" stopOpacity="0" />
              </linearGradient>
              <clipPath id="chartClipM">
                <rect x="40" y="0" width="840" height="420" />
              </clipPath>
            </defs>

            {/* Axis */}
            <line x1="40" y1="410" x2="880" y2="410" stroke="rgba(30,24,84,0.08)" strokeWidth="1" />

            {/* X labels */}
            {[
              { x: 40,  label: 'Wake'    },
              { x: 180, label: 'Intake'  },
              { x: 490, label: '2–4 hrs' },
              { x: 650, label: mode === 'stim' ? '2nd dose' : '' },
              { x: 820, label: 'Evening' },
            ].map(({ x, label }) => (
              <text key={label} x={x} y="435" textAnchor="middle" fontSize="17" fill="rgba(30,24,84,0.45)" fontFamily="Inter,system-ui" fontWeight="500">{label}</text>
            ))}

            {/* Natural baseline */}
            <path d="M40,290 C100,268 180,235 300,205 C400,182 460,188 490,194 C520,200 545,222 565,242 C582,256 600,258 625,250 C655,238 690,218 750,215 C800,214 845,228 880,242" stroke="rgba(30,24,84,0.35)" strokeWidth="1.5" strokeDasharray="6,5" fill="none" strokeLinecap="round" />

            {/* Stim area fill */}
            <g style={{ opacity: mode === 'stim' ? 1 : 0, transition: 'opacity 0.4s' }} clipPath="url(#chartClipM)">
              <path d={`${STIM_PATH} L880,410 L40,410 Z`} fill="url(#stimFillM)" />
            </g>
            {/* Flow area fill */}
            <g style={{ opacity: mode === 'flow' ? 1 : 0, transition: 'opacity 0.4s' }} clipPath="url(#chartClipM)">
              <path d={`${FLOW_PATH} L880,410 L40,410 Z`} fill="url(#flowFillM)" />
            </g>

            {/* Stim line */}
            <g style={{ opacity: mode === 'stim' ? 1 : 0.06, transition: 'opacity 0.4s' }}>
              <path d={STIM_PATH} stroke={STIM_COLOR} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            {/* Flow line */}
            <g style={{ opacity: mode === 'flow' ? 1 : 0.06, transition: 'opacity 0.4s' }}>
              <path d={FLOW_PATH} stroke="url(#dayArcFlowGradM)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Dots — solid center + white ring */}
            {dotPositions.map((d, i) => (
              <g key={i}>
                <circle cx={d.cx} cy={d.cy} r="7" fill={accentColor} />
                <circle cx={d.cx} cy={d.cy} r="4" fill="#fff" />
                <circle cx={d.cx} cy={d.cy} r="2.5" fill={accentColor} />
              </g>
            ))}
          </svg>
        </div>

        {/* Body: cards left, chart right */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

          {/* Left column: toggle + cards */}
          <div ref={cardColRef} className="flex flex-col gap-3 md:w-[460px] shrink-0 w-full">

            {/* Toggle — desktop only */}
            <div
              ref={toggleRef}
              className="hidden md:flex relative items-center self-start rounded-full p-[3px] mb-4 cursor-pointer overflow-hidden border border-[#1E1854]/10"
              style={{ isolation: 'isolate' }}
              onClick={() => setMode(mode === 'stim' ? 'flow' : 'stim')}
              role="switch"
              aria-checked={mode === 'flow'}
            >
              <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(30,24,84,0.08)', opacity: mode === 'stim' ? 1 : 0, transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)' }} />
              <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg,#3B38B8,#1E1854)', opacity: mode === 'flow' ? 1 : 0, transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)' }} />
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
              <div className="relative flex items-center justify-center py-1.5" style={{ zIndex: 2, width: '120px' }}>
                <span className="text-xs font-medium whitespace-nowrap" style={{ color: mode === 'stim' ? '#1E1854' : 'rgba(255,255,255,0.5)', transition: 'color 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
                  With caffeine
                </span>
              </div>
              <div className="relative flex items-center justify-center py-1.5" style={{ zIndex: 2, width: '120px' }}>
                <span className="text-xs font-medium whitespace-nowrap" style={{ color: mode === 'flow' ? '#fff' : 'rgba(30,24,84,0.4)', transition: 'color 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
                  With Flow
                </span>
              </div>
            </div>

            {/* Cards */}
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
                  <div className={`md:block ${isOpen ? 'block' : 'hidden'}`}>
                    <p className="text-sm leading-[1.55] px-4 pb-3 md:px-5 md:pb-4 md:pt-0" style={{ color: 'rgba(30,24,84,0.55)' }}>
                      {mode === 'stim' ? c.stim : c.flow}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: SVG chart — desktop only */}
          <div
            className="hidden md:flex flex-col flex-1 min-w-0 w-full rounded-2xl"
            style={{
              marginTop: toggleHeight,
              height: chartHeight - toggleHeight || undefined,
              background: '#F8F8FB',
              boxShadow: '0 2px 16px rgba(30,24,84,0.07)',
              padding: '24px 16px 16px',
            }}
          >
            {/* Legend */}
            <div className="flex items-start gap-3 px-2 mb-3">
              <svg className="shrink-0 mt-[7px]" width="28" height="10" viewBox="0 0 28 10"><line x1="0" y1="5" x2="28" y2="5" stroke="rgba(30,24,84,0.35)" strokeWidth="1.5" strokeDasharray="6,5" strokeLinecap="round"/></svg>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-[#1E1854]/60">Natural cognitive baseline</p>
                <p className="text-sm text-[#1E1854]/40">Large swings above it cause jitters and anxiety. Drops below it bring fatigue and brain fog. Staying close is what makes performance last.</p>
              </div>
            </div>
            <svg
              viewBox="0 0 920 480"
              width="100%"
              className="flex-1"
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
                <linearGradient id="stimFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={STIM_COLOR} stopOpacity="0.12" />
                  <stop offset="100%" stopColor={STIM_COLOR} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="flowFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B38B8" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#3B38B8" stopOpacity="0" />
                </linearGradient>
                <clipPath id="chartClip">
                  <rect x="40" y="0" width="840" height="410" />
                </clipPath>
              </defs>

              {/* Axis */}
              <line x1="40" y1="410" x2="880" y2="410" stroke="rgba(30,24,84,0.08)" strokeWidth="1" />

              {/* X labels */}
              {[
                { x: 40,  label: 'Wake'    },
                { x: 180, label: 'Intake'  },
                { x: 490, label: '2–4 hrs' },
                { x: 650, label: mode === 'stim' ? '2nd dose' : '' },
                { x: 820, label: 'Evening' },
              ].map(({ x, label }) => (
                <text key={label} x={x} y="435" textAnchor="middle" fontSize="17" fill="rgba(30,24,84,0.45)" fontFamily="Inter,system-ui" fontWeight="500">
                  {label}
                </text>
              ))}

              {/* Natural baseline */}
              <path
                d="M40,290 C100,268 180,235 300,205 C400,182 460,188 490,194 C520,200 545,222 565,242 C582,256 600,258 625,250 C655,238 690,218 750,215 C800,214 845,228 880,242"
                stroke="rgba(30,24,84,0.35)"
                strokeWidth="1.5"
                strokeDasharray="6,5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Stim area fill */}
              <g style={{ opacity: mode === 'stim' ? 1 : 0, transition: 'opacity 0.4s' }} clipPath="url(#chartClip)">
                <path d={`${STIM_PATH} L880,410 L40,410 Z`} fill="url(#stimFill)" />
              </g>
              {/* Flow area fill */}
              <g style={{ opacity: mode === 'flow' ? 1 : 0, transition: 'opacity 0.4s' }} clipPath="url(#chartClip)">
                <path d={`${FLOW_PATH} L880,410 L40,410 Z`} fill="url(#flowFill)" />
              </g>

              {/* Stim line */}
              <g style={{ opacity: mode === 'stim' ? 1 : 0.06, transition: 'opacity 0.4s' }}>
                <path d={STIM_PATH} stroke={STIM_COLOR} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              {/* Flow line */}
              <g style={{ opacity: mode === 'flow' ? 1 : 0.06, transition: 'opacity 0.4s' }}>
                <path d={FLOW_PATH} stroke="url(#dayArcFlowGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Dots — solid center + white ring */}
              {dotPositions.map((d, i) => {
                const hovered = hoveredCard === i;
                const scale = hovered ? 1.4 : 1;
                return (
                  <g
                    key={i}
                    transform={`translate(${d.cx},${d.cy}) scale(${scale}) translate(${-d.cx},${-d.cy})`}
                    style={{ transition: 'transform 0.35s cubic-bezier(0.25,0.1,0.1,1)' }}
                  >
                    <circle cx={d.cx} cy={d.cy} r="8" fill={accentColor} />
                    <circle cx={d.cx} cy={d.cy} r="5" fill="#F8F8FB" />
                    <circle cx={d.cx} cy={d.cy} r="3" fill={accentColor} />
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

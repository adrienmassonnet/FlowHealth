'use client';

import { useState, useEffect, useRef } from 'react';

const molecules = [
  {
    label: 'Dopamine',
    heading: 'Every spike borrows from your baseline.',
    body: "Dopamine's tonic baseline is what sustains focus and drive through the day. Repeated artificial spikes force the brain to downregulate receptors — the floor drops. Over time, more input produces less effect, and what once felt like motivation begins to feel like noise.",
  },
  {
    label: 'Cortisol',
    heading: 'The stress signal that never clears.',
    body: 'Cortisol follows a natural arc — peaking at wake, tapering through the day. Artificial stimulants extend that peak well past its window. When cortisol stays elevated, recovery suffers, sleep is disrupted, and tomorrow starts from a lower baseline.',
  },
  {
    label: 'Serotonin',
    heading: 'Calm is not the absence of energy.',
    body: "Serotonin stabilises mood and regulates how the brain interprets experience. Chronic overstimulation depletes serotonin signalling over time. The result isn't just low mood — it's a narrowing tolerance for anything that isn't a spike.",
  },
  {
    label: 'Adenosine',
    heading: 'Sleep pressure is a feature, not a bug.',
    body: 'Adenosine builds throughout the day, signalling the need for rest. Caffeine blocks its receptors — it does not clear the debt. When the block lifts, the accumulated signal arrives all at once. The crash is not a side effect. It is the unpaid bill.',
  },
];

export default function NeurotransmitterSection() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const mol = molecules[active];

  return (
    <section
      ref={sectionRef}
      className="flow-section bg-surface"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s cubic-bezier(0.25,0.1,0.1,1), transform 0.7s cubic-bezier(0.25,0.1,0.1,1)',
      }}
    >
      <div className="flow-container">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">

          {/* Left — headline + body */}
          <div className="md:w-[42%] shrink-0 space-y-5">
            <h2 className="flow-h2 text-ink">
              True health is stability, not the constant swings.
            </h2>
            <p className="flow-body">
              Your body and brain were designed to be optimal. The natural baseline is the most
              sustainable state there is — and it is the constant deviation from it that creates
              the restlessness, the fatigue, the fragmentation we mistake for normal.
            </p>
          </div>

          {/* Right — tabs + info card */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Molecule tabs */}
            <div className="flex flex-wrap gap-2">
              {molecules.map((m, i) => (
                <button
                  key={m.label}
                  onClick={() => setActive(i)}
                  className="rounded-full px-4 py-2 flow-caption font-medium transition-all duration-300 min-h-[44px]"
                  style={
                    i === active
                      ? { background: 'transparent', border: '1.5px solid #3B38B8', color: '#3B38B8' }
                      : { background: 'transparent', border: '1.5px solid rgba(30,24,84,0.14)', color: 'rgba(30,24,84,0.45)' }
                  }
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Info card — heading + body, both rendered */}
            <div className="rounded-xl p-6 md:p-8 space-y-3" style={{ background: 'linear-gradient(135deg, #3B38B8, #1E1854)' }}>
              <h3 className="flow-h3 text-white">{mol.heading}</h3>
              <p className="flow-caption text-white/70">{mol.body}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

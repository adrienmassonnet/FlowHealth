'use client';

import { useState } from 'react';
import { AnimationConfigProvider, useEditableProp, useAllOverrides } from '@/lib/section-animation-context';
import { sectionAnimationConfig, type AnimationProperty, type SectionAnimationConfig } from '@/lib/section-animation-config';
import DayArcSection from '@/app/components/DayArcSection';
import { HeroText } from '@/app/components/HeroAnimated';
import ProductImageGallery from '@/app/products/[handle]/ProductImageGallery';

const PAGES = [
  { id: 'home' as const, label: 'Homepage' },
  { id: 'product' as const, label: 'Product' },
];

const GALLERY_IMAGES = [
  { url: '/sunrise-consume.png', altText: 'Flow at sunrise' },
  { url: '/confident-girl-consume.png', altText: 'Flow in hand' },
];

export default function AnimationsDevTool() {
  const [page, setPage] = useState<'home' | 'product'>('home');
  const sections = sectionAnimationConfig.filter((s) => s.page === page);
  const [selectedId, setSelectedId] = useState(sections[0]?.id ?? '');
  const [replayKey, setReplayKey] = useState(0);

  const selectedSections = sectionAnimationConfig.filter((s) => s.page === page);
  const selected = selectedSections.find((s) => s.id === selectedId) ?? selectedSections[0];

  return (
    <AnimationConfigProvider>
      <div className="min-h-screen bg-[#f2f1ee] font-sans">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <h1 className="text-2xl font-semibold text-[#1E1854] mb-1">Animation editor</h1>
          <p className="text-sm text-[#1E1854]/55 mb-6">
            Dev-only tool. Edit values, see them live below, then save to write back into <code>section-animation-config.ts</code>.
          </p>

          {/* Page pills */}
          <div className="flex gap-2 mb-6">
            {PAGES.map((p) => (
              <button
                key={p.id}
                onClick={() => { setPage(p.id); const first = sectionAnimationConfig.find((s) => s.page === p.id); if (first) setSelectedId(first.id); }}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors ${
                  page === p.id ? 'bg-[#1E1854] text-white' : 'bg-white text-[#1E1854]/60 border border-[#1E1854]/10 hover:text-[#1E1854]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_360px_1fr] gap-6">
            {/* Section list */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
              {selectedSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`shrink-0 text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    selected?.id === s.id ? 'bg-white shadow-md text-[#1E1854]' : 'text-[#1E1854]/55 hover:bg-white/60'
                  }`}
                >
                  {s.label}
                  <span className="block text-xs font-normal text-[#1E1854]/40 mt-0.5">{s.properties.length} propert{s.properties.length === 1 ? 'y' : 'ies'}</span>
                </button>
              ))}
            </div>

            {/* Editor panel */}
            {selected && <EditorPanel section={selected} />}

            {/* Live preview */}
            <div className="bg-white rounded-2xl border border-[#1E1854]/10 overflow-hidden min-h-[500px]">
              <div className="px-5 py-3 border-b border-[#1E1854]/10 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#1E1854]/45">Live preview — {selected?.label}</span>
                <button
                  onClick={() => setReplayKey((k) => k + 1)}
                  className="text-xs font-semibold text-[#3B38B8] hover:text-[#1E1854]"
                >
                  ▶ Replay entrance
                </button>
              </div>
              <div className="overflow-auto max-h-[80vh]">
                <div key={`${selected?.id}-${replayKey}`}>
                  <PreviewFor sectionId={selected?.id ?? ''} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationConfigProvider>
  );
}

function EditorPanel({ section }: { section: SectionAnimationConfig }) {
  const overrides = useAllOverrides();
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/dev/save-animation-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ overrides }),
      });
      if (res.ok) setSavedAt(Date.now());
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#1E1854]/10 p-5 h-fit">
      <p className="text-sm font-semibold text-[#1E1854] mb-4">{section.label}</p>
      <div className="space-y-5">
        {section.properties.map((prop) => (
          <PropertyControl key={prop.id} sectionId={section.id} prop={prop} />
        ))}
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 w-full py-2.5 rounded-lg bg-[#1E1854] text-white text-xs font-semibold uppercase tracking-wide disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save all edits to code'}
      </button>
      {savedAt && <p className="text-xs text-emerald-600 mt-2">Saved — section-animation-config.ts updated.</p>}
    </div>
  );
}

function PropertyControl({ sectionId, prop }: { sectionId: string; prop: AnimationProperty }) {
  const [value, setValue] = useEditableProp(sectionId, prop.id);

  if (prop.kind === 'ease') {
    const v = value as [number, number, number, number];
    return (
      <div>
        <p className="text-xs font-medium text-[#1E1854]/70 mb-2">{prop.label}</p>
        <div className="grid grid-cols-4 gap-1.5">
          {v.map((n, i) => (
            <input
              key={i}
              type="number"
              step={0.01}
              value={n}
              onChange={(e) => {
                const next = [...v] as [number, number, number, number];
                next[i] = parseFloat(e.target.value) || 0;
                setValue(next);
              }}
              className="w-full px-2 py-1.5 text-xs rounded-md border border-[#1E1854]/15 text-[#1E1854]"
            />
          ))}
        </div>
      </div>
    );
  }

  const v = value as number;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs font-medium text-[#1E1854]/70">{prop.label}</p>
        <span className="text-xs font-mono text-[#1E1854]/50">{v.toFixed(2)}s</span>
      </div>
      <input
        type="range"
        min={prop.min ?? 0}
        max={prop.max ?? 2}
        step={prop.step ?? 0.05}
        value={v}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        className="w-full accent-[#3B38B8]"
      />
    </div>
  );
}

function PreviewFor({ sectionId }: { sectionId: string }) {
  if (sectionId === 'hero') {
    return (
      <div className="bg-[#1E1854] p-10 flex flex-col gap-4 items-start">
        <HeroText delayPropId="headline1Delay">
          <p className="text-xs tracking-[0.16em] uppercase text-white/50 font-medium">Cognitive performance formula</p>
        </HeroText>
        <HeroText delayPropId="headline2Delay">
          <h1 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white">Real energy doesn&apos;t spike. It flows.</h1>
        </HeroText>
        <HeroText delayPropId="ctaDelay">
          <span className="inline-flex items-center justify-center rounded-full bg-white text-[#1E1854] text-xs tracking-[0.12em] uppercase font-semibold px-7 py-4">
            Get Flow
          </span>
        </HeroText>
      </div>
    );
  }

  if (sectionId === 'day-arc') {
    return <DayArcSection />;
  }

  if (sectionId === 'product-gallery') {
    return (
      <div className="p-6 max-w-md">
        <ProductImageGallery images={GALLERY_IMAGES} title="Flow" />
      </div>
    );
  }

  return <p className="p-6 text-sm text-[#1E1854]/45">No preview wired up for this section yet.</p>;
}

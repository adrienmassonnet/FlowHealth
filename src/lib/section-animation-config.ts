// Central registry of editable animation properties for the /dev/animations tool.
// Components read their controllable values via `useSectionProp()` (see
// section-animation-context.tsx) — in normal site usage that just returns the
// static defaults below with zero runtime overhead; the dev tool overrides them
// live via React context for preview, then can save edits back into this file.
//
// Only properties listed here are tool-editable. Not every animation in a
// component needs to be — pick the ones that are actually worth tuning.

export type PropKind = 'duration' | 'delay' | 'ease';

export interface AnimationProperty {
  id: string;
  label: string;
  kind: PropKind;
  // duration/delay: seconds. ease: cubic-bezier 4-tuple.
  value: number | [number, number, number, number];
  min?: number;
  max?: number;
  step?: number;
}

export interface SectionAnimationConfig {
  id: string;
  page: 'home' | 'product';
  label: string;
  properties: AnimationProperty[];
}

// ─── GENERATED:START — do not hand-edit between markers, the /dev/animations
// tool's save action regenerates this block. Edit properties via the tool, or
// edit the whole file by hand and remove the markers if you no longer want it
// to be tool-managed.
export const sectionAnimationConfig: SectionAnimationConfig[] = [
  {
    id: 'hero',
    page: 'home',
    label: 'Hero',
    properties: [
      { id: 'headline1Delay', label: 'Headline line 1 — delay', kind: 'delay', value: 0.1, min: 0, max: 1.5, step: 0.05 },
      { id: 'headline2Delay', label: 'Headline line 2 — delay', kind: 'delay', value: 0.4, min: 0, max: 1.5, step: 0.05 },
      { id: 'ctaDelay', label: 'CTA — delay', kind: 'delay', value: 0.8, min: 0, max: 1.5, step: 0.05 },
      { id: 'entranceDuration', label: 'Entrance — duration', kind: 'duration', value: 0.9, min: 0.1, max: 2, step: 0.05 },
    ],
  },
  {
    id: 'day-arc',
    page: 'home',
    label: 'Day Arc',
    properties: [
      { id: 'entranceDuration', label: 'Section entrance — duration', kind: 'duration', value: 0.8, min: 0.1, max: 2, step: 0.05 },
      { id: 'entranceEase', label: 'Section entrance — ease', kind: 'ease', value: [0.16, 1, 0.3, 1] },
      { id: 'toggleDuration', label: 'Toggle switch — duration', kind: 'duration', value: 0.45, min: 0.1, max: 1, step: 0.05 },
      { id: 'cardHoverDuration', label: 'Card hover lift — duration', kind: 'duration', value: 0.3, min: 0.05, max: 1, step: 0.05 },
      { id: 'dotScaleDuration', label: 'Chart dot hover scale — duration', kind: 'duration', value: 0.35, min: 0.05, max: 1, step: 0.05 },
    ],
  },
  {
    id: 'product-gallery',
    page: 'product',
    label: 'Product Image Gallery',
    properties: [
      { id: 'entranceDuration', label: 'Entrance — duration', kind: 'duration', value: 0.8, min: 0.1, max: 2, step: 0.05 },
      { id: 'entranceEase', label: 'Entrance — ease', kind: 'ease', value: [0.25, 0.1, 0.1, 1] },
    ],
  },
];
// ─── GENERATED:END

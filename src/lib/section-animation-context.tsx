'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { sectionAnimationConfig, type AnimationProperty, type PropKind } from './section-animation-config';

type Overrides = Record<string, Record<string, AnimationProperty['value']>>;

interface AnimationConfigContextValue {
  overrides: Overrides;
  setProp: (sectionId: string, propId: string, value: AnimationProperty['value']) => void;
}

const AnimationConfigContext = createContext<AnimationConfigContextValue | null>(null);

// Wrap the /dev/animations preview area with this — components rendered inside
// will read live-edited values. Nothing else in the app should use this.
export function AnimationConfigProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>({});

  const setProp = useCallback((sectionId: string, propId: string, value: AnimationProperty['value']) => {
    setOverrides((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [propId]: value },
    }));
  }, []);

  return (
    <AnimationConfigContext.Provider value={{ overrides, setProp }}>
      {children}
    </AnimationConfigContext.Provider>
  );
}

function defaultValue(sectionId: string, propId: string): AnimationProperty['value'] | undefined {
  return sectionAnimationConfig
    .find((s) => s.id === sectionId)
    ?.properties.find((p) => p.id === propId)?.value;
}

// Read a single editable animation property. Outside the dev tool (no
// provider mounted) this just returns the static default — no context lookup
// cost beyond a no-op useContext call.
export function useSectionProp(sectionId: string, propId: string): AnimationProperty['value'] {
  const ctx = useContext(AnimationConfigContext);
  const override = ctx?.overrides[sectionId]?.[propId];
  const fallback = defaultValue(sectionId, propId);
  if (fallback === undefined) {
    throw new Error(`useSectionProp: no config entry for "${sectionId}.${propId}" in section-animation-config.ts`);
  }
  return override ?? fallback;
}

export function useSetSectionProp() {
  const ctx = useContext(AnimationConfigContext);
  return ctx?.setProp ?? (() => {});
}

// Convenience for the editor UI: current (possibly overridden) value + setter, together.
export function useEditableProp(sectionId: string, propId: string) {
  const value = useSectionProp(sectionId, propId);
  const setProp = useSetSectionProp();
  return [value, (v: AnimationProperty['value']) => setProp(sectionId, propId, v)] as const;
}

// Full override map, for the "save" action to merge with defaults and persist.
export function useAllOverrides(): Overrides {
  const ctx = useContext(AnimationConfigContext);
  return ctx?.overrides ?? {};
}

export type { PropKind };

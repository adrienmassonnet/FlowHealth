'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { trackEvent } from '@/lib/clarity';

const TABS = [
  { id: 'section-benefits', label: 'Benefits' },
  { id: 'section-timeline', label: 'Timeline' },
  { id: 'section-how-to-use', label: 'How to Use' },
  { id: 'section-ingredients', label: 'Ingredients' },
  { id: 'section-purity', label: 'Overview' },
  { id: 'section-reviews', label: 'Reviews' },
  { id: 'section-shipping', label: 'Shipping & Terms' },
  { id: 'section-savings', label: 'How Flow Compares' },
];

const CONTENT_IDS = TABS.map((t) => t.id);
const EASING = 'cubic-bezier(0.25, 0.1, 0.1, 1)';

function fadeInSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = '';
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'none';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.transition = `opacity 0.6s ${EASING}, transform 0.6s ${EASING}`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      // Clear transform after animation so it doesn't create a new CSS containing
      // block — which would break position:fixed children (modals) on mobile.
      setTimeout(() => {
        el.style.transform = '';
        el.style.transition = '';
      }, 650);
    });
  });
}

function fadeOutSection(id: string): Promise<void> {
  return new Promise((resolve) => {
    const el = document.getElementById(id);
    if (!el || el.style.display === 'none') { resolve(); return; }
    el.style.transition = `opacity 0.15s ease, transform 0.15s ease`;
    el.style.opacity = '0';
    el.style.transform = 'translateY(-6px)';
    setTimeout(() => {
      el.style.display = 'none';
      el.style.transition = 'none';
      el.style.transform = '';
      resolve();
    }, 160);
  });
}

export default function ProductNavTabs() {
  const [active, setActive] = useState<string>(TABS[0].id);
  const pillsRef = useRef<HTMLDivElement>(null);

  // Pre-select first section on mount, hide the rest
  useEffect(() => {
    const firstId = TABS[0].id;
    CONTENT_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (id === firstId) {
        el.style.display = '';
        el.style.opacity = '1';
        el.style.transform = 'none';
      } else {
        el.style.display = 'none';
      }
    });
  }, []);


  // Scroll active pill into view — skip on initial mount so it doesn't push page down
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    if (!pillsRef.current) return;
    const btn = pillsRef.current.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (btn) btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [active]);

  const selectTab = useCallback(async (id: string) => {
    if (id === active) return;

    const visibleId = CONTENT_IDS.find((sid) => {
      const el = document.getElementById(sid);
      return el && el.style.display !== 'none';
    });

    if (visibleId) await fadeOutSection(visibleId);

    fadeInSection(id);
    setActive(id);
    trackEvent(`product_tab_${id.replace('section-', '')}`);

    // Scroll to bring the nav wrapper into view just below the site header
    requestAnimationFrame(() => {
      const wrapperEl = document.querySelector<HTMLElement>('[data-product-nav-wrapper]');
      if (wrapperEl) {
        const top = wrapperEl.getBoundingClientRect().top + window.scrollY - 68;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }, [active]);

  // Listen for tab selections from NavIntroCards
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ id: string }>;
      selectTab(ce.detail.id);
    };
    window.addEventListener('flow:selectTab', handler);
    return () => window.removeEventListener('flow:selectTab', handler);
  }, [selectTab]);

  return (
    <div data-product-nav className="bg-transparent">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Tab pills row */}
        <div className="relative overflow-hidden h-11 flex items-center">
          <div
            ref={pillsRef}
            className="flex gap-2 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                data-tab={id}
                onClick={() => selectTab(id)}
                className={`shrink-0 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  active === id
                    ? 'bg-[#E8E7F5] text-[#1E1854] border-[#C8C6E8]'
                    : 'border-[var(--color-border)] text-[#1E1854]/70 hover:border-[#1E1854]/25 hover:bg-[#1E1854]/[0.04]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/90 to-transparent" />
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { trackEvent } from '@/lib/clarity';
import { ga4SelectContent } from '@/lib/ga4';

const TAB_GROUPS = [
  {
    label: 'About',
    tabs: [
      { id: 'section-benefits', label: 'Benefits' },
      { id: 'section-timeline', label: 'Timeline' },
      { id: 'section-how-to-use', label: 'How to Use' },
    ],
  },
  {
    label: 'Ingredients & Purity',
    tabs: [
      { id: 'section-ingredients', label: 'Ingredients' },
      { id: 'section-purity', label: 'Overview' },
    ],
  },
  {
    label: 'Reviews & Shipping',
    tabs: [
      { id: 'section-reviews', label: 'Reviews' },
      { id: 'section-shipping', label: 'Shipping & Terms' },
      { id: 'section-savings', label: 'How Flow Compares' },
    ],
  },
];

const TABS = TAB_GROUPS.flatMap((g) => g.tabs);
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
  const [canScrollRight, setCanScrollRight] = useState(false);
  const pillsRef = useRef<HTMLDivElement>(null);

  const updateScrollState = useCallback(() => {
    const el = pillsRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = pillsRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

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

  // Lock wrapper min-height to savings section once it finishes rendering
  useEffect(() => {
    const wrapper = document.querySelector<HTMLElement>('[data-tab-wrapper]');
    if (!wrapper) return;

    const lockHeight = () => {
      // Temporarily show savings to measure it
      const savingsEl = document.getElementById('section-savings');
      if (!savingsEl) return false;
      const wasHidden = savingsEl.style.display === 'none';
      if (wasHidden) {
        savingsEl.style.visibility = 'hidden';
        savingsEl.style.display = '';
      }
      const h = savingsEl.offsetHeight;
      if (wasHidden) {
        savingsEl.style.display = 'none';
        savingsEl.style.visibility = '';
      }
      if (h > 100) {
        wrapper.style.minHeight = `${h}px`;
        return true;
      }
      return false;
    };

    if (lockHeight()) return;

    // Savings not ready yet (Suspense) — observe until it has real height
    const savingsEl = document.getElementById('section-savings');
    if (!savingsEl) return;
    const ro = new ResizeObserver(() => { if (lockHeight()) ro.disconnect(); });
    ro.observe(savingsEl);
    return () => ro.disconnect();
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
    ga4SelectContent('product_tab', id.replace('section-', ''));

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
        <div className="relative rounded-2xl border border-ink/[7.8%] bg-ink/[0.05] p-1.5">
          <div
            ref={pillsRef}
            className="flex items-center gap-1.5 overflow-x-auto w-full scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                data-tab={id}
                onClick={() => selectTab(id)}
                className={`flex-1 min-w-fit rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all duration-200 whitespace-nowrap min-h-[36px] text-center ${
                  active === id
                    ? 'bg-ink text-white border-ink shadow-sm'
                    : 'border-transparent text-ink/70 hover:border-ink/25 hover:bg-white/60'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {canScrollRight && (
            <div className="pointer-events-none absolute right-1.5 top-1.5 bottom-1.5 w-10 rounded-r-xl bg-gradient-to-l from-[#F1F0FA] to-transparent" />
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { trackEvent } from '@/lib/clarity';

const PRODUCT_VIEW_IDS = ['section-product', 'section-nav-intro'];
const CONTENT_IDS = [
  'section-benefits', 'section-timeline', 'section-how-to-use', 'section-ingredients',
  'section-purity', 'section-shipping', 'section-savings', 'section-compare',
];

type Card = { id: string; label: string; desc: string; icon: React.ReactNode };

const CARDS: Card[] = [
  {
    id: 'section-benefits',
    label: 'Benefits',
    desc: 'Science-backed reasons it works',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2L9.5 6.5H14L10.2 9L11.5 13.5L8 11L4.5 13.5L5.8 9L2 6.5H6.5L8 2Z"
          stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'section-timeline',
    label: 'Timeline',
    desc: 'What you\'ll feel and when',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M8 5V8L10 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'section-how-to-use',
    label: 'How to Use',
    desc: 'Your simple daily ritual',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2C8 2 3.5 6.5 3.5 10A4.5 4.5 0 0 0 12.5 10C12.5 6.5 8 2 8 2Z"
          stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M8 9V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'section-ingredients',
    label: 'Ingredients',
    desc: '13 clinically-dosed actives',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 14C8 14 3 11 3 7C5.5 5.5 7 7 8 9C9 7 10.5 5.5 13 7C13 11 8 14 8 14Z"
          stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M8 9V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'section-purity',
    label: 'Overview',
    desc: 'Full formula disclosure',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2L13 4V8C13 11.5 10.5 13.5 8 14.5C5.5 13.5 3 11.5 3 8V4L8 2Z"
          stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'section-shipping',
    label: 'Shipping & Returns',
    desc: 'Fast, stress-free delivery',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 4H11V11H2V4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M11 6.5L14 8V11H11V6.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <circle cx="4.5" cy="11.5" r="1" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="12" cy="11.5" r="1" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: 'section-savings',
    label: 'Save Money',
    desc: 'Flow vs buying separately',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <ellipse cx="8" cy="11.5" rx="5" ry="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M3 11.5V8.5M13 11.5V8.5" stroke="currentColor" strokeWidth="1.3"/>
        <ellipse cx="8" cy="8.5" rx="5" ry="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M3 8.5V5.5M13 8.5V5.5" stroke="currentColor" strokeWidth="1.3"/>
        <ellipse cx="8" cy="5.5" rx="5" ry="2" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    id: 'section-compare',
    label: 'How Flow Compares',
    desc: 'Flow vs the competition',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 12V7H6V12H3ZM7 12V5H10V12H7ZM11 12V9H14V12H11Z"
          stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M2 12H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function animateSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = '';
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'none';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}

function doSelectTab(id: string) {
  PRODUCT_VIEW_IDS.forEach((elId) => {
    const el = document.getElementById(elId);
    if (el) el.style.display = 'none';
  });
  CONTENT_IDS.forEach((sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    if (sectionId === id) {
      animateSection(sectionId);
    } else {
      el.style.display = 'none';
    }
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  window.dispatchEvent(new CustomEvent('flow:selectTab', { detail: { id } }));
  trackEvent(`product_tab_${id.replace('section-', '')}`);
}

export default function NavIntroCards() {
  return (
    <div className="relative">
      <div
        className="flex gap-2 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => doSelectTab(card.id)}
            className="shrink-0 rounded-xl border border-ink/[12.5%] bg-white px-4 py-2.5 text-xs font-medium text-ink hover:border-ink/25 hover:bg-ink/[0.04] transition-all duration-200 whitespace-nowrap"
          >
            {card.label}
          </button>
        ))}
      </div>
      {/* Right fade — signals horizontal scrollability */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

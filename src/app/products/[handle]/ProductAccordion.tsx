'use client';

import { useState } from 'react';

interface AccordionItem {
  title: string;
  content: string;
}

export default function ProductAccordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-4 text-left"
          >
            <span className="text-xs tracking-[0.1em] uppercase font-medium">{item.title}</span>
            <span
              className="text-[hsla(var(--color-secondary)/1)] transition-transform duration-300 shrink-0 ml-4"
              style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
          </button>
          <div
            className="overflow-hidden transition-all duration-300 ease-out"
            style={{ maxHeight: open === i ? '400px' : '0px' }}
          >
            <p className="pb-4 text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

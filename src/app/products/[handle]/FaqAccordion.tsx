'use client';

import { useState } from 'react';

const faqItems = [
  {
    title: 'Shipping details',
    icon: (
      <svg height="32" viewBox="0 0 64 64" width="32" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
        <path d="m10 36.125v14.037l22 11.58 22-11.58v-14.037" />
        <path d="m54 23.246 7-8.549-21.742-11.42-7.324 8.42z" />
        <path d="m32 61.742v-27" />
        <path d="m31.934 11.704-7.258-8.42-21.676 11.485 7 8.742z" />
        <path d="m32 34.742-8.584 8.929-20.449-11.676 7.033-8.484zm22-11.496 7 8.742-20.324 11.743-8.676-8.989z" />
      </svg>
    ),
    content: 'Free shipping on orders over CHF 50. Orders are dispatched within 1–2 business days from our Swiss warehouse. Standard delivery takes 3–5 business days within Switzerland and 5–10 business days internationally.',
  },
  {
    title: 'Delivery details',
    icon: (
      <svg height="32" viewBox="0 0 64 64" width="32" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
        <path d="m17 15h26c2.3 0 2.1 1.6 1.7 3.1s-3.7 14.9-3.7 14.9h10.1l4-2 3.9 2v8c0 1.3-.5 2-2 2h-8m-40 0h6.6m9.4 0h14.6" />
        <path d="m43.6 23h5.4l6.1 8m-24.1-8h-22m18 8h-22" />
        <path d="m24.8 44a6.9 6.9 0 0 1 -6.2 5c-2.7 0-4.2-2.2-3.4-5a6.9 6.9 0 0 1 6.2-5c2.6 0 4.2 2.2 3.4 5zm24 0a6.9 6.9 0 0 1 -6.2 5c-2.7 0-4.2-2.2-3.4-5a6.9 6.9 0 0 1 6.2-5c2.6 0 4.2 2.2 3.4 5z" />
      </svg>
    ),
    content: 'We offer free delivery on all orders over CHF 50. For orders under CHF 50, a flat shipping fee of CHF 5 applies. All deliveries are tracked and you will receive a confirmation email with your tracking number once your order has been dispatched.',
  },
  {
    title: 'Returns details',
    icon: (
      <svg height="32" viewBox="0 0 64 64" width="32" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
        <path d="m54 6v10h-10m-12 43a27 27 0 1 1 21.751-43m-8.766 39.678a26.819 26.819 0 0 1 -6.985 2.653m15.751-10.331a27.159 27.159 0 0 1 -4.711 4.945m8.751-12.932a26.821 26.821 0 0 1 -1.58 3.952" />
        <circle cx="32" cy="32" r="3" />
        <path d="m33.961 34.261 10.039 7.739m-12-30v17" />
      </svg>
    ),
    content: '30-day satisfaction guarantee — if you are not completely satisfied with your purchase, contact us within 30 days for a full refund. No questions asked. Returned products must be unused and in their original packaging.',
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="mb-10">
        <h2 className="text-base font-semibold tracking-[-0.01em]">FAQ</h2>
      </div>
      <div className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
        {faqItems.map((item, i) => (
          <div key={item.title}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-[hsla(var(--color-secondary)/1)] shrink-0">{item.icon}</span>
                <span className="text-base font-medium tracking-[-0.01em]">{item.title}</span>
              </div>
              <span
                className="text-[hsla(var(--color-secondary)/1)] transition-transform duration-300 shrink-0"
                style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-300 ease-out"
              style={{ maxHeight: open === i ? '300px' : '0px' }}
            >
              <p className="pb-5 text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed pl-14">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

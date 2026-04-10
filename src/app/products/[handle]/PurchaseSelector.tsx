'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/clarity';

interface PurchaseSelectorProps {
  price: number;
  currencyCode: string;
  discountPercent?: number;
}

export default function PurchaseSelector({ price, currencyCode, discountPercent = 10 }: PurchaseSelectorProps) {
  const [selected, setSelected] = useState<'subscribe' | 'once'>('subscribe');

  const discountedPrice = (price * (1 - discountPercent / 100)).toFixed(2);
  const fullPrice = price.toFixed(2);

  const isSubscribe = selected === 'subscribe';
  const isOnce = selected === 'once';

  return (
    <div className="space-y-2">
      {/* Subscribe card */}
      <button
        onClick={() => { setSelected('subscribe'); trackEvent('product_page_select_subscribe'); }}
        className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-300 relative ${
          isSubscribe
            ? 'card-selected'
            : 'border-[var(--color-border)] hover:border-[hsla(var(--color-accent)/0.4)]'
        }`}
      >
        {/* Discount badge */}
        <span className={`absolute top-3 right-3 text-xs tracking-[0.1em] uppercase font-semibold px-2 py-1 rounded-md ${
          isSubscribe ? 'bg-white text-[#1E1854]' : 'bg-[#1E1854] text-white'
        }`}>
          {discountPercent}% OFF
        </span>

        <div className="flex items-start gap-3">
          {/* Radio */}
          <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            isSubscribe ? 'border-white' : 'border-[var(--color-border)]'
          }`}>
            {isSubscribe && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
          </span>

          <div className="flex-1 min-w-0 pr-10">
            <p className={`text-sm font-semibold tracking-[-0.01em] ${isSubscribe ? 'text-white' : ''}`}>
              Subscribe &amp; Save
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className={`text-xl font-semibold tracking-[-0.02em] ${isSubscribe ? 'text-white' : ''}`}>
                {discountedPrice} <span className={`text-sm font-normal ${isSubscribe ? 'text-white/60' : 'text-[hsla(var(--color-secondary)/1)]'}`}>{currencyCode}</span>
              </span>
              <span className={`text-sm line-through ${isSubscribe ? 'text-white/40' : 'text-[hsla(var(--color-secondary)/0.6)]'}`}>{fullPrice}</span>
            </div>
            <p className={`text-xs mt-1.5 leading-relaxed ${isSubscribe ? 'text-white/65' : 'text-[hsla(var(--color-secondary)/0.7)]'}`}>
              Flow delivered every month &middot; Cancel anytime, zero hassle
            </p>
          </div>
        </div>
      </button>

      {/* One-time card */}
      <button
        onClick={() => { setSelected('once'); trackEvent('product_page_select_one_time'); }}
        className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-300 ${
          isOnce
            ? 'card-selected'
            : 'border-[var(--color-border)] hover:border-[hsla(var(--color-accent)/0.4)]'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Radio */}
          <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            isOnce ? 'border-white' : 'border-[var(--color-border)]'
          }`}>
            {isOnce && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
          </span>

          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold tracking-[-0.01em] ${isOnce ? 'text-white' : ''}`}>
              One Time Purchase
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className={`text-xl font-semibold tracking-[-0.02em] ${isOnce ? 'text-white' : ''}`}>
                {fullPrice} <span className={`text-sm font-normal ${isOnce ? 'text-white/60' : 'text-[hsla(var(--color-secondary)/1)]'}`}>{currencyCode}</span>
              </span>
            </div>
            <p className={`text-xs mt-1.5 ${isOnce ? 'text-white/65' : 'text-[hsla(var(--color-secondary)/0.7)]'}`}>
              One time delivery
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

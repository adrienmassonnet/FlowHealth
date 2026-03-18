'use client';

import { useState } from 'react';

interface PurchaseSelectorProps {
  price: number;
  currencyCode: string;
  discountPercent?: number;
}

export default function PurchaseSelector({ price, currencyCode, discountPercent = 10 }: PurchaseSelectorProps) {
  const [selected, setSelected] = useState<'subscribe' | 'once'>('subscribe');

  const discountedPrice = (price * (1 - discountPercent / 100)).toFixed(2);
  const fullPrice = price.toFixed(2);

  return (
    <div className="space-y-2">
      {/* Subscribe card */}
      <button
        onClick={() => setSelected('subscribe')}
        className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-200 relative ${
          selected === 'subscribe'
            ? 'border-[hsla(var(--color-accent)/1)] bg-[hsla(var(--color-accent)/0.04)]'
            : 'border-[var(--color-border)] hover:border-[hsla(var(--color-accent)/0.4)]'
        }`}
      >
        {/* Discount badge */}
        <span className="absolute top-3 right-3 bg-[#1E1854] text-white text-[10px] tracking-[0.1em] uppercase font-semibold px-2 py-1 rounded-md">
          {discountPercent}% OFF
        </span>

        <div className="flex items-start gap-3">
          {/* Radio */}
          <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            selected === 'subscribe'
              ? 'border-[hsla(var(--color-accent)/1)]'
              : 'border-[var(--color-border)]'
          }`}>
            {selected === 'subscribe' && (
              <span className="w-2.5 h-2.5 rounded-full bg-[hsla(var(--color-accent)/1)]" />
            )}
          </span>

          <div className="flex-1 min-w-0 pr-10">
            <p className="text-sm font-semibold tracking-[-0.01em]">Subscribe &amp; Save</p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-xl font-semibold tracking-[-0.02em]">
                {discountedPrice} <span className="text-sm font-normal text-[hsla(var(--color-secondary)/1)]">{currencyCode}</span>
              </span>
              <span className="text-sm text-[hsla(var(--color-secondary)/0.6)] line-through">{fullPrice}</span>
            </div>
            <p className="text-xs text-[hsla(var(--color-secondary)/0.7)] mt-1.5 leading-relaxed">
              Flow delivered every month &middot; Cancel anytime, zero hassle
            </p>
          </div>
        </div>
      </button>

      {/* One-time card */}
      <button
        onClick={() => setSelected('once')}
        className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-200 ${
          selected === 'once'
            ? 'border-[hsla(var(--color-accent)/1)] bg-[hsla(var(--color-accent)/0.04)]'
            : 'border-[var(--color-border)] hover:border-[hsla(var(--color-accent)/0.4)]'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Radio */}
          <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            selected === 'once'
              ? 'border-[hsla(var(--color-accent)/1)]'
              : 'border-[var(--color-border)]'
          }`}>
            {selected === 'once' && (
              <span className="w-2.5 h-2.5 rounded-full bg-[hsla(var(--color-accent)/1)]" />
            )}
          </span>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold tracking-[-0.01em]">One Time Purchase</p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-xl font-semibold tracking-[-0.02em]">
                {fullPrice} <span className="text-sm font-normal text-[hsla(var(--color-secondary)/1)]">{currencyCode}</span>
              </span>
            </div>
            <p className="text-xs text-[hsla(var(--color-secondary)/0.7)] mt-1.5">
              One time delivery
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

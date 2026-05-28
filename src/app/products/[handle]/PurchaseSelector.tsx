'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/clarity';
import { pixelInitiateCheckout } from '@/lib/pixel';
import { ga4BeginCheckout, ga4SelectItem, ga4AddToCart } from '@/lib/ga4';
import PreLaunchModal from '@/app/components/PreLaunchModal';

interface PurchaseSelectorProps {
  variantId: string;
  price: number;
  currencyCode: string;
  discountPercent?: number;
}

export default function PurchaseSelector({ variantId, price, currencyCode, discountPercent = 10 }: PurchaseSelectorProps) {
  const [selected, setSelected] = useState<'subscribe' | 'once'>('subscribe');
  const [modalOpen, setModalOpen] = useState(false);

  const discountedPrice = (price * (1 - discountPercent / 100)).toFixed(2);
  const fullPrice = price.toFixed(2);

  const isSubscribe = selected === 'subscribe';
  const isOnce = selected === 'once';

  const displayPrice = isSubscribe ? discountedPrice : fullPrice;

  const ga4Item = (p: number, purchaseType: 'subscribe' | 'one_time') => ({
    item_id: variantId,
    item_name: 'Flow',
    price: p,
    currency: currencyCode,
    item_brand: 'Flow Health',
    item_category: 'Supplement',
    item_variant: purchaseType,
  });

  function handleSelectSubscribe() {
    setSelected('subscribe');
    trackEvent('product_page_select_subscribe');
    ga4SelectItem(ga4Item(parseFloat(discountedPrice), 'subscribe'), 'subscribe');
  }

  function handleSelectOnce() {
    setSelected('once');
    trackEvent('product_page_select_one_time');
    ga4SelectItem(ga4Item(parseFloat(fullPrice), 'one_time'), 'one_time');
  }

  function handleCheckout() {
    const p = parseFloat(displayPrice);
    const purchaseType = isSubscribe ? 'subscribe' : 'one_time';
    trackEvent(isSubscribe ? 'product_page_buy_subscribe' : 'product_page_buy_once');
    pixelInitiateCheckout({ value: p, currency: currencyCode });
    ga4AddToCart(ga4Item(p, purchaseType));
    ga4BeginCheckout(ga4Item(p, purchaseType), purchaseType);
    setModalOpen(true);
  }

  return (
    <>
    <PreLaunchModal open={modalOpen} onClose={() => setModalOpen(false)} />
    <div className="space-y-3">
      {/* Subscribe card */}
      <button
        onClick={handleSelectSubscribe}
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
            {isSubscribe && <span className="block w-2.5 h-2.5 rounded-full bg-white" />}
          </span>

          <div className="flex-1 min-w-0 pr-10">
            <p className={`text-sm font-semibold tracking-[-0.01em] ${isSubscribe ? 'text-white' : ''}`}>
              Monthly delivery
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className={`text-xl font-semibold tracking-[-0.02em] ${isSubscribe ? 'text-white' : ''}`}>
                {discountedPrice} <span className={`text-sm font-normal ${isSubscribe ? 'text-white/60' : 'text-[hsla(var(--color-secondary)/1)]'}`}>{currencyCode}</span>
              </span>
              <span className={`text-sm line-through ${isSubscribe ? 'text-white/40' : 'text-[hsla(var(--color-secondary)/0.6)]'}`}>{fullPrice}</span>
            </div>
            <p className={`text-xs mt-1.5 leading-relaxed ${isSubscribe ? 'text-white/65' : 'text-[hsla(var(--color-secondary)/0.7)]'}`}>
              Pause or cancel from month 2 — no forms, no hassle.
            </p>
          </div>
        </div>
      </button>

      {/* One-time purchase — row button */}
      <button
        onClick={handleSelectOnce}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 group ${
          isOnce
            ? 'border-[#1E1854] bg-[#1E1854]/5'
            : 'border-[var(--color-border)] hover:border-[#1E1854]/40 hover:bg-[#1E1854]/3'
        }`}
      >
        {/* Radio */}
        <span className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
          isOnce ? 'border-[#1E1854]' : 'border-[var(--color-border)] group-hover:border-[#1E1854]/50'
        }`}>
          {isOnce && <span className="w-2 h-2 rounded-full bg-[#1E1854]" />}
        </span>

        <span className={`text-sm transition-colors ${
          isOnce ? 'font-semibold text-[#1E1854]' : 'text-[hsla(var(--color-secondary)/0.8)]'
        }`}>
          One-time purchase
        </span>

        <span className={`ml-auto text-sm tabular-nums transition-colors ${
          isOnce ? 'font-semibold text-[#1E1854]' : 'text-[hsla(var(--color-secondary)/0.7)]'
        }`}>
          {fullPrice} <span className="font-normal text-xs">{currencyCode}</span>
        </span>
      </button>

      {/* CTA */}
      <button
        onClick={handleCheckout}
        className="btn-cta w-full text-white font-semibold text-sm tracking-[0.06em] uppercase py-4 rounded-full transition-all duration-300"
      >
        {`Buy Now — ${displayPrice} ${currencyCode}`}
      </button>

      <p className="text-center text-xs text-[hsla(var(--color-secondary)/0.45)]">
        Already a subscriber?{' '}
        <Link href="/pages/subscription" className="underline underline-offset-2 hover:text-[#1E1854] transition-colors">
          Manage your subscription
        </Link>
      </p>
    </div>
    </>
  );
}

'use client';

import { useState, useRef } from 'react';
import { trackEvent } from '@/lib/clarity';
import { pixelInitiateCheckout } from '@/lib/pixel';
import { ga4BeginCheckout } from '@/lib/ga4';
import PreLaunchModal from '@/app/components/PreLaunchModal';
import posthog from 'posthog-js';

interface PurchaseSelectorProps {
  variantId: string;
  price: number;
  currencyCode: string;
  discountPercent?: number;
}

export default function PurchaseSelector({ variantId, price, currencyCode, discountPercent = 10 }: PurchaseSelectorProps) {
  const [selected, setSelected] = useState<'subscribe' | 'once'>('subscribe');
  const [modalOpen, setModalOpen] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const discountedPrice = (price * (1 - discountPercent / 100)).toFixed(2);
  const fullPrice = price.toFixed(2);

  const isSubscribe = selected === 'subscribe';
  const isOnce = selected === 'once';

  const displayPrice = isSubscribe ? discountedPrice : fullPrice;

  function handleCheckout() {
    trackEvent(isSubscribe ? 'product_page_buy_subscribe' : 'product_page_buy_once');
    pixelInitiateCheckout({ value: parseFloat(displayPrice), currency: currencyCode });
    ga4BeginCheckout({ item_id: variantId, item_name: 'Flow', price: parseFloat(displayPrice), currency: currencyCode, item_brand: 'Flow Health', item_category: 'Supplement' });
    posthog.capture('checkout_cta_clicked', {
      purchase_type: selected,
      price: parseFloat(displayPrice),
      currency: currencyCode,
      variant_id: variantId,
    });
    setModalOpen(true);
  }

  return (
    <>
    <PreLaunchModal open={modalOpen} onClose={() => setModalOpen(false)} />
    <div className="space-y-3">
      {/* Subscribe card */}
      <button
        onClick={() => { setSelected('subscribe'); trackEvent('product_page_select_subscribe'); posthog.capture('purchase_type_selected', { purchase_type: 'subscribe' }); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 group ${
          isSubscribe
            ? 'card-selected'
            : 'border-[#1E185420] hover:border-[rgba(30,24,84,0.4)]'
        }`}
      >
        {/* Radio */}
        <span className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSubscribe ? 'border-white' : 'border-[#1E185420] group-hover:border-[#1E1854]/50'
        }`}>
          {isSubscribe && <span className="block w-2 h-2 rounded-full bg-white" />}
        </span>

        <span className={`text-sm transition-colors ${
          isSubscribe ? 'font-semibold text-white' : 'text-[rgba(30,24,84,0.8)]'
        }`}>
          Monthly delivery
        </span>

        <div className="ml-auto flex flex-col items-end gap-0.5">
          <span className={`text-sm tabular-nums font-semibold ${isSubscribe ? 'text-white' : 'text-[rgba(30,24,84,0.7)]'}`}>
            {discountedPrice} <span className="font-normal text-xs">{currencyCode}</span>
          </span>
          <span className={`text-xs ${isSubscribe ? 'text-white/60' : 'text-[rgba(30,24,84,0.45)]'}`}>
            Cancel anytime after month 2
          </span>
        </div>
      </button>

      {/* One-time purchase — row button */}
      <button
        onClick={() => { setSelected('once'); trackEvent('product_page_select_one_time'); posthog.capture('purchase_type_selected', { purchase_type: 'once' }); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 group ${
          isOnce
            ? 'border-[#1E1854] bg-[#1E1854]/5'
            : 'border-[#1E185420] hover:border-[#1E1854]/40 hover:bg-[#1E1854]/3'
        }`}
      >
        {/* Radio */}
        <span className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
          isOnce ? 'border-[#1E1854]' : 'border-[#1E185420] group-hover:border-[#1E1854]/50'
        }`}>
          {isOnce && <span className="w-2 h-2 rounded-full bg-[#1E1854]" />}
        </span>

        <span className={`text-sm transition-colors ${
          isOnce ? 'font-semibold text-[#1E1854]' : 'text-[rgba(30,24,84,0.8)]'
        }`}>
          One-time purchase
        </span>

        <span className={`ml-auto text-sm tabular-nums transition-colors ${
          isOnce ? 'font-semibold text-[#1E1854]' : 'text-[rgba(30,24,84,0.7)]'
        }`}>
          {fullPrice} <span className="font-normal text-xs">{currencyCode}</span>
        </span>
      </button>

      {/* CTA */}
      <button
        ref={ctaRef}
        onClick={handleCheckout}
        className="btn-cta w-full rounded-full py-4 flex items-center justify-between px-6 transition-all duration-300"
      >
        <span className="text-white text-xs font-semibold tracking-[0.1em] uppercase">Get Flow</span>
        <span className="text-white text-sm font-semibold tracking-[-0.01em]">{displayPrice} {currencyCode}</span>
      </button>
    </div>
</>
  );
}

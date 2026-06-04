'use client';

import { useState, useRef, useEffect } from 'react';
import { trackEvent } from '@/lib/clarity';
import { pixelInitiateCheckout } from '@/lib/pixel';
import { ga4BeginCheckout } from '@/lib/ga4';
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
  const [stickyVisible, setStickyVisible] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  const discountedPrice = (price * (1 - discountPercent / 100)).toFixed(2);
  const fullPrice = price.toFixed(2);

  const isSubscribe = selected === 'subscribe';
  const isOnce = selected === 'once';

  const displayPrice = isSubscribe ? discountedPrice : fullPrice;

  function handleCheckout() {
    trackEvent(isSubscribe ? 'product_page_buy_subscribe' : 'product_page_buy_once');
    pixelInitiateCheckout({ value: parseFloat(displayPrice), currency: currencyCode });
    ga4BeginCheckout({ item_id: variantId, item_name: 'Flow', price: parseFloat(displayPrice), currency: currencyCode, item_brand: 'Flow Health', item_category: 'Supplement' });
    setModalOpen(true);
  }

  return (
    <>
    <PreLaunchModal open={modalOpen} onClose={() => setModalOpen(false)} />
    <div className="space-y-3">
      {/* Subscribe card */}
      <button
        onClick={() => { setSelected('subscribe'); trackEvent('product_page_select_subscribe'); }}
        className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-300 relative ${
          isSubscribe
            ? 'card-selected'
            : 'border-[#1E185420] hover:border-[rgba(30,24,84,0.4)]'
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
            isSubscribe ? 'border-white' : 'border-[#1E185420]'
          }`}>
            {isSubscribe && <span className="block w-2.5 h-2.5 rounded-full bg-white" />}
          </span>

          <div className="flex-1 min-w-0 pr-10">
            <p className={`text-sm font-semibold tracking-[-0.01em] ${isSubscribe ? 'text-white' : ''}`}>
              Monthly delivery
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className={`text-xl font-semibold tracking-[-0.02em] ${isSubscribe ? 'text-white' : ''}`}>
                {discountedPrice} <span className={`text-sm font-normal ${isSubscribe ? 'text-white/60' : 'text-[rgb(30,24,84)]'}`}>{currencyCode}</span>
              </span>
              <span className={`text-sm line-through ${isSubscribe ? 'text-white/40' : 'text-[rgba(30,24,84,0.6)]'}`}>{fullPrice}</span>
            </div>
            <p className={`text-xs mt-1.5 leading-relaxed ${isSubscribe ? 'text-white/65' : 'text-[rgba(30,24,84,0.7)]'}`}>
              Cancel any time after the second month with zero hassle.
            </p>
          </div>
        </div>
      </button>

      {/* One-time purchase — row button */}
      <button
        onClick={() => { setSelected('once'); trackEvent('product_page_select_one_time'); }}
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
        className="btn-cta w-full text-white font-semibold text-sm tracking-[0.06em] uppercase py-4 rounded-full transition-all duration-300"
      >
        {`Buy Now — ${displayPrice} ${currencyCode}`}
      </button>
    </div>

    {/* Sticky Buy Now bar — mobile only, appears when CTA scrolls out of view */}
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        stickyVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="bg-white/90 backdrop-blur-md border-t border-[#1E1854]/10 px-5 py-3">
        <button
          onClick={handleCheckout}
          className="btn-cta w-full text-white font-semibold text-sm tracking-[0.06em] uppercase py-4 rounded-full"
        >
          {`Buy Now — ${displayPrice} ${currencyCode}`}
        </button>
      </div>
    </div>
    </>
  );
}

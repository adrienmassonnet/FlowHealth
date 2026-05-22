'use client';

import { useEffect } from 'react';
import { pixelViewContent } from '@/lib/pixel';
import { ga4ViewItem } from '@/lib/ga4';

interface Props {
  productName: string;
  price: number;
  currencyCode: string;
  productId?: string;
}

export default function ProductPageInit({ productName, price, currencyCode, productId }: Props) {
  useEffect(() => {
    const id = setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    pixelViewContent({ content_name: productName, value: price, currency: currencyCode });
    ga4ViewItem({ item_id: productId ?? productName, item_name: productName, price, currency: currencyCode, item_brand: 'Flow Health', item_category: 'Supplement' });
  }, [productName, price, currencyCode, productId]);

  return null;
}
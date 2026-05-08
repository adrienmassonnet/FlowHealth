'use client';

import { useEffect } from 'react';
import { pixelViewContent } from '@/lib/pixel';

interface Props {
  productName: string;
  price: number;
  currencyCode: string;
}

export default function ProductPageInit({ productName, price, currencyCode }: Props) {
  useEffect(() => {
    const id = setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    pixelViewContent({ content_name: productName, value: price, currency: currencyCode });
  }, [productName, price, currencyCode]);

  return null;
}
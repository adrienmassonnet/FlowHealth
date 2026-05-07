'use client';

import { useEffect } from 'react';

export default function ProductPageInit() {
  useEffect(() => {
    // setTimeout(fn, 0) ensures this fires after Next.js router's own scroll management,
    // which runs after React's effects during startTransition-based navigation.
    const id = setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
    return () => clearTimeout(id);
  }, []);
  return null;
}
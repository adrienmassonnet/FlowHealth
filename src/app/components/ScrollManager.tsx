'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollManager() {
  useEffect(() => {
    history.scrollRestoration = 'manual';
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

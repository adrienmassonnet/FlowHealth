'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/clarity';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Link> & { clarityEvent: string };

export default function TrackedLink({ clarityEvent, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(clarityEvent);
        onClick?.(e);
      }}
    />
  );
}

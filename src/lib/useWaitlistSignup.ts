'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/clarity';
import { ga4SignUp } from '@/lib/ga4';
import { pixelLead } from '@/lib/pixel';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface WaitlistSignupOptions {
  source: string;
  clarityEvent: string;
  clarityEventSuccess: string;
}

export function useWaitlistSignup({ source, clarityEvent, clarityEventSuccess }: WaitlistSignupOptions) {
  const [email, setEmail] = useState('');
  const [notifyPromos, setNotifyPromos] = useState(true);
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    trackEvent(clarityEvent);
    try {
      const res = await fetch('/api/prelaunch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, notifyPromos, source }),
      });
      if (res.status === 429) throw new Error('rate_limited');
      if (!res.ok) throw new Error();
      setStatus('success');
      trackEvent(clarityEventSuccess);
      ga4SignUp(source);
      pixelLead({ content_name: source });
    } catch {
      setStatus('error');
    }
  }

  return { email, setEmail, notifyPromos, setNotifyPromos, status, handleSubmit };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function trackEvent(event: string) {
  (window as any).clarity?.('event', event);
}

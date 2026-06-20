import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Subscription',
  description: 'View and manage your Flow Health recurring order — pause, resume, or cancel your subscription at any time.',
  robots: { index: false, follow: false },
};

export default function SubscriptionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
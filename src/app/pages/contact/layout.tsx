import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Flow Health — for order support, feedback, or press inquiries. We respond within 24 hours.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
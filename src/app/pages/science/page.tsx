import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Science',
  description: 'The science behind Flow — how 16 clinically-dosed ingredients work together to support focus, mood, and long-term brain health.',
};

export default function SciencePage() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-24">
      <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent mb-3">Our Research</p>
      <h1 className="text-4xl font-semibold tracking-[-0.02em]">Science</h1>
    </main>
  );
}

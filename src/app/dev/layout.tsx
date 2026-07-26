import { notFound } from 'next/navigation';

// Dev-only tooling (e.g. /dev/animations). These pages are client components,
// so they can't gate themselves server-side — this layout does it for the whole
// /dev/* subtree. In production the route 404s instead of exposing the tool.
// Mirrors the NODE_ENV guard on /api/dev/*.
export default function DevLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return children;
}

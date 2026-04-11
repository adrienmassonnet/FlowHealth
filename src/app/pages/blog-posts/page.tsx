import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import BlogPostsClient from './BlogPostsClient';
import { getBlogPosts } from '@/lib/contentful';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Articles on cognitive performance, ingredient science, and the research behind Flow. Evidence-based insights for a sharper mind.',
  openGraph: {
    title: 'Flow Journal — Cognitive Performance Articles',
    description: 'Articles on cognitive performance, ingredient science, and the research behind Flow. Evidence-based insights for a sharper mind.',
  },
};

export default async function BlogPostsPage() {
  const allPosts = await getBlogPosts();
  const featured = allPosts.find((p) => p.featured) ?? allPosts[0];
  const posts = allPosts.filter((p) => p.slug !== featured?.slug);

  if (!featured) return null;

  return (
    <main>
      {/* Featured post */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-16">
        <Link
          href={`/pages/blog-posts/${featured.slug}`}
          className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#1E185408] rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[hsla(var(--color-secondary)/0.3)] transition-colors"
        >
          <div className="relative aspect-[5/4] md:aspect-auto md:h-full min-h-[260px]">
            <Image
              src={featured.coverImageUrl}
              alt={featured.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-8 md:p-10 space-y-5">
            <div className="flex items-center gap-3 text-xs text-[hsla(var(--color-secondary)/0.5)]">
              <span>{featured.publishedDate}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-snug text-[#1E1854] group-hover:text-[hsla(var(--color-accent)/1)] transition-colors">
              {featured.title}
            </h2>
            <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">
              {featured.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {(featured.tags ?? []).map((tag) => (
                <span key={tag} className="text-xs border border-[var(--color-border)] px-3 py-1 rounded-full text-[hsla(var(--color-secondary)/0.6)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </section>

      <Suspense>
        <BlogPostsClient posts={posts.map((p) => ({
          slug: p.slug,
          category: p.category,
          title: p.title,
          excerpt: p.excerpt,
          tags: p.tags ?? [],
          image: p.coverImageUrl,
          date: p.publishedDate,
          readTime: p.readTime,
        }))} />
      </Suspense>

      {/* Product cross-link */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="bg-[#1E18540A] rounded-2xl px-8 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[var(--color-border)]">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium mb-2">From the lab to your shelf</p>
            <p className="text-xl font-semibold tracking-[-0.02em] text-[#1E1854] max-w-md leading-snug">
              Ready to put the science into practice? Flow is built around every ingredient we write about.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/products/flow" className="btn-cta inline-flex items-center justify-center text-white text-xs tracking-[0.1em] uppercase font-semibold px-6 py-3.5 rounded-full">
              Shop Flow
            </Link>
            <Link href="/pages/our-product" className="inline-flex items-center justify-center border border-[#1E1854]/20 text-[#1E1854] text-xs tracking-[0.1em] uppercase font-medium px-6 py-3.5 rounded-full hover:border-[#1E1854]/40 transition-colors">
              The Formula
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import BlogPostsClient from './BlogPostsClient';
import { getBlogPosts } from '@/lib/content';

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
          className="group flex flex-col md:grid md:grid-cols-2 md:gap-8 md:items-center bg-ink/[3.1%] rounded-2xl overflow-hidden border border-ink/[12.5%] hover:border-[rgba(30,24,84,0.3)] transition-colors"
        >
          {/* Mobile: padded square image + meta/title row */}
          <div className="flex flex-row md:contents">
            {featured.coverImageUrl && (
              <div className="md:hidden p-2 shrink-0">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={featured.coverImageUrl}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="80px"
                  />
                </div>
              </div>
            )}
            {/* Desktop: full image */}
            {featured.coverImageUrl && (
              <div className="hidden md:block relative md:aspect-auto md:h-full min-h-[260px]">
                <Image
                  src={featured.coverImageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="50vw"
                />
              </div>
            )}
            {/* Meta + title */}
            <div className="flex flex-col flex-1 p-3 md:p-10 space-y-1 md:space-y-5 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-[rgba(30,24,84,0.5)]">
                <span>{featured.publishedDate}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="text-sm font-semibold md:text-3xl md:font-semibold tracking-[-0.02em] leading-snug text-ink group-hover:text-[rgb(30,24,84)] transition-colors">
                {featured.title}
              </h2>
              <p className="hidden md:block text-sm text-[rgba(30,24,84,0.65)] leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="hidden md:flex flex-wrap gap-2 pt-1">
                {(featured.tags ?? []).map((tag) => (
                  <span key={tag} className="text-xs border border-ink/[12.5%] px-3 py-1 rounded-full text-[rgba(30,24,84,0.6)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Excerpt below on mobile */}
          <p className="md:hidden text-xs text-[rgba(30,24,84,0.6)] leading-[1.55] px-3 pb-3">
            {featured.excerpt}
          </p>
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
        <div className="bg-ink/[3.9%] rounded-2xl px-8 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-ink/[12.5%]">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent mb-2">From the lab to your shelf</p>
            <p className="text-xl font-semibold tracking-[-0.02em] text-ink max-w-md leading-snug">
              Ready to put the science into practice? Flow is built around every ingredient we write about.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/products/rooibos-hibiscus-pomegranate" className="btn-cta inline-flex items-center justify-center text-white text-xs tracking-[0.1em] uppercase font-semibold px-6 py-3.5 rounded-full">
              Get Flow
            </Link>
            <Link href="/pages/our-product" className="inline-flex items-center justify-center border border-ink/20 text-ink text-xs tracking-[0.1em] uppercase font-medium px-6 py-3.5 rounded-full hover:border-ink/40 transition-colors">
              The Formula
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

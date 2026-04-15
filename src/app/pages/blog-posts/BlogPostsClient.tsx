'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { key: 'all', label: 'All blogs' },
  { key: 'focus', label: 'Focus' },
  { key: 'ingredients', label: 'Ingredients' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'science', label: 'Science' },
];

type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  tags: string[];
  image: string;
  date: string;
  readTime: string;
};

export default function BlogPostsClient({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const validKeys = categories.map((c) => c.key);
  const paramCategory = searchParams.get('category') ?? 'all';
  const [activeCategory, setActiveCategory] = useState(
    validKeys.includes(paramCategory) ? paramCategory : 'all'
  );

  const filtered = activeCategory === 'all'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-24">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-[-0.02em]">Latest blogs</h2>
          <p className="text-sm text-[hsla(var(--color-secondary)/0.55)] max-w-sm">
            Get the most recent updates about cognitive health, ingredients, and focus science.
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-[0.04em] border transition-colors ${
                activeCategory === cat.key
                  ? 'bg-[#1E1854] text-white border-[#1E1854]'
                  : 'bg-white text-[#1E1854] border-[var(--color-border)] hover:border-[hsla(var(--color-secondary)/0.4)]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeCategory === cat.key ? 'bg-white' : 'bg-[hsla(var(--color-secondary)/0.25)]'}`} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-[hsla(var(--color-secondary)/0.5)] py-12 text-center">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/pages/blog-posts/${post.slug}`}
              className="group flex flex-col bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[hsla(var(--color-secondary)/0.3)] transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1E18540A]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col flex-1 p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[hsla(var(--color-secondary)/0.45)]">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-base font-semibold text-[#1E1854] leading-snug group-hover:text-[hsla(var(--color-accent)/1)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[hsla(var(--color-secondary)/0.6)] leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs uppercase tracking-[0.08em] border border-[var(--color-border)] px-2.5 py-0.5 rounded-full font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

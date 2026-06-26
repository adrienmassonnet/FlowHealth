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
  image: string | null | undefined;
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
          <p className="text-sm text-[rgba(30,24,84,0.55)] max-w-sm">
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
                  : 'bg-white text-[#1E1854] border-[#1E185420] hover:border-[rgba(30,24,84,0.4)]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeCategory === cat.key ? 'bg-white' : 'bg-[rgba(30,24,84,0.25)]'}`} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-[rgba(30,24,84,0.5)] py-12 text-center">No posts in this category yet.</p>
      ) : (
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/pages/blog-posts/${post.slug}`}
              className="group flex flex-col bg-white border border-[#1E185420] rounded-2xl overflow-hidden hover:border-[rgba(30,24,84,0.3)] transition-colors"
            >
              {/* Mobile: top row with image + meta/title; Desktop: full-width image */}
              <div className="flex flex-row sm:flex-col">
                {/* Mobile image — padded square with rounded corners */}
                {post.image && (
                  <div className="sm:hidden p-2 shrink-0">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#1E18540A]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="64px"
                      />
                    </div>
                  </div>
                )}
                {/* Desktop image — full width */}
                {post.image && (
                  <div className="hidden sm:block relative w-full sm:aspect-[16/10] overflow-hidden bg-[#1E18540A]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                {/* Meta + title (right of image on mobile, below image on sm+) */}
                <div className="flex flex-col flex-1 p-3 sm:p-6 space-y-1 sm:space-y-3 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs text-[rgba(30,24,84,0.45)]">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#1E1854] leading-snug group-hover:text-[rgb(30,24,84)] transition-colors sm:text-base">
                    {post.title}
                  </h3>
                  <p className="hidden sm:block text-sm text-[rgba(30,24,84,0.6)] leading-[1.55] flex-1">
                    {post.excerpt}
                  </p>
                  <div className="hidden sm:flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] sm:text-xs uppercase tracking-[0.08em] border border-[#1E185420] px-2 py-0.5 rounded-full font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Excerpt below image on mobile */}
              <p className="sm:hidden text-xs text-[rgba(30,24,84,0.6)] leading-[1.55] px-3 pb-3">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

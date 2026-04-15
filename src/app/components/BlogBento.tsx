'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TrackedLink from '@/app/components/TrackedLink';
import { trackEvent } from '@/lib/clarity';

const ease = [0.25, 0.1, 0.1, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, delay, ease },
  }),
};

const posts = [
  {
    title: 'Deep Work in 2026: How to Protect Your Focus in a Distracted World',
    href: '/pages/blog-posts/deep-work',
    img: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80&auto=format&fit=crop',
    alt: 'Deep Work',
    topic: 'Focus',
  },
  {
    title: 'Why L-Theanine + Caffeine Is the Most Studied Nootropic Stack',
    href: '/pages/blog-posts/caffeine-theanine',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80&auto=format&fit=crop',
    alt: 'L-Theanine and Caffeine',
    topic: 'Nootropics',
  },
  {
    title: 'Building a Morning Ritual That Actually Sticks',
    href: '/pages/blog-posts/morning-ritual',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80&auto=format&fit=crop',
    alt: 'Morning Ritual',
    topic: 'Lifestyle',
  },
  {
    title: 'Nootropics Explained: What They Are and How They Actually Work',
    href: '/pages/blog-posts/nootropics-explained',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&auto=format&fit=crop',
    alt: 'Nootropics',
    topic: 'Nootropics',
  },
  {
    title: "Lion's Mane and Neuroplasticity: What the Research Says",
    href: '/pages/blog-posts/lions-mane-brain',
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80&auto=format&fit=crop',
    alt: "Lion's Mane",
    topic: 'Brain',
  },
];

const topics = [
  { label: 'All articles', href: '/pages/blog-posts' },
  { label: 'Focus', href: '/pages/blog-posts?category=focus' },
  { label: 'Ingredients', href: '/pages/blog-posts?category=ingredients' },
  { label: 'Lifestyle', href: '/pages/blog-posts?category=lifestyle' },
  { label: 'Science', href: '/pages/blog-posts?category=science' },
];

export default function BlogBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 md:min-h-[560px] gap-4">

      {/* Post 0 — tall left, row-span-2 */}
      <motion.div
        className="md:col-span-4 md:row-span-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-6% 0px' }}
        custom={0}
        variants={cardVariants}
      >
      <TrackedLink
        href={posts[0].href}
        clarityEvent="homepage_blog_post_1"
        className="relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-full block group shadow-[0_8px_32px_rgba(30,24,84,0.12)]"
      >
        <Image
          src={posts[0].img}
          alt={posts[0].alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <span className="absolute top-4 left-4 text-xs tracking-[0.12em] uppercase text-white/80 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
          Focus
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-semibold text-white leading-snug tracking-[-0.02em] mb-3">
            {posts[0].title}
          </h3>
          <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.08em] uppercase font-medium text-white/50">
            Read article
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </TrackedLink>
      </motion.div>

      {/* Post 1 — image card, top center */}
      <motion.div
        className="md:col-span-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-6% 0px' }}
        custom={0.1}
        variants={cardVariants}
      >
      <TrackedLink
        href={posts[1].href}
        clarityEvent="homepage_blog_post_2"
        className="relative rounded-3xl overflow-hidden min-h-[220px] md:min-h-full block group shadow-[0_8px_32px_rgba(30,24,84,0.12)]"
      >
        <Image
          src={posts[1].img}
          alt={posts[1].alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 42vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <span className="absolute top-4 left-4 text-xs tracking-[0.12em] uppercase text-white/80 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
          Nootropics
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-base font-semibold text-white leading-snug tracking-[-0.01em]">{posts[1].title}</h3>
        </div>
      </TrackedLink>
      </motion.div>

      {/* Post 4 — small image, top right */}
      <motion.div
        className="md:col-span-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-6% 0px' }}
        custom={0.2}
        variants={cardVariants}
      >
      <TrackedLink
        href={posts[4].href}
        clarityEvent="homepage_blog_post_5"
        className="relative rounded-3xl overflow-hidden min-h-[220px] md:min-h-full block group shadow-[0_4px_20px_rgba(30,24,84,0.10)]"
      >
        <Image
          src={posts[4].img}
          alt={posts[4].alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        <span className="absolute top-4 left-4 text-xs tracking-[0.12em] uppercase text-white/80 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
          Brain
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-sm font-semibold text-white leading-snug tracking-[-0.01em]">{posts[4].title}</h3>
        </div>
      </TrackedLink>
      </motion.div>

      {/* Post 2 — small image, bottom center-left */}
      <motion.div
        className="md:col-span-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-6% 0px' }}
        custom={0.1}
        variants={cardVariants}
      >
      <TrackedLink
        href={posts[2].href}
        clarityEvent="homepage_blog_post_3"
        className="relative rounded-3xl overflow-hidden min-h-[220px] md:min-h-full block group shadow-[0_4px_20px_rgba(30,24,84,0.10)]"
      >
        <Image
          src={posts[2].img}
          alt={posts[2].alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        <span className="absolute top-4 left-4 text-xs tracking-[0.12em] uppercase text-white/80 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
          Lifestyle
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-sm font-semibold text-white leading-snug tracking-[-0.01em]">{posts[2].title}</h3>
        </div>
      </TrackedLink>
      </motion.div>

      {/* Topics card — bottom right */}
      <motion.div
        className="md:col-span-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-6% 0px' }}
        custom={0.2}
        variants={cardVariants}
      >
      <div className="bg-white rounded-3xl p-5 flex flex-col gap-4 border border-[#1E1854]/[0.07] shadow-[0_4px_20px_rgba(30,24,84,0.07)] h-full">
        <p className="text-xs tracking-[0.14em] uppercase text-[#1E1854]/35 font-medium">
          Browse by topic
        </p>

        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              onClick={() => trackEvent('homepage_blog_topic_click')}
              className="relative overflow-hidden group/pill text-xs font-medium tracking-[0.04em] px-4 py-2 rounded-full border border-[#1E1854]/12 text-[#1E1854]/55 hover:border-transparent hover:text-white transition-colors duration-300 hover:shadow-[0_2px_8px_rgba(59,56,184,0.30)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#3B38B8] to-[#1E1854] opacity-0 group-hover/pill:opacity-100 transition-opacity duration-300" />
              <span className="relative">{t.label}</span>
            </Link>
          ))}
        </div>
      </div>
      </motion.div>

    </div>
  );
}

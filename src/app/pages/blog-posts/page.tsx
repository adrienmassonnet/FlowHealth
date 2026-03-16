import Image from 'next/image';
import Link from 'next/link';
import BlogPostsClient from './BlogPostsClient';


const featured = {
  slug: 'nootropics-explained',
  title: 'Nootropics Explained: What They Are and How They Actually Work',
  excerpt: 'The word "nootropic" gets thrown around a lot, but few people understand the mechanisms behind cognitive enhancement. We break down the science — clearly and honestly.',
  tags: ['Science', 'Ingredients', 'Focus'],
  image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=85&auto=format&fit=crop',
  date: 'March 8, 2026',
  readTime: '7 min read',
};

const posts = [
  {
    slug: 'ashwagandha-stress',
    category: 'ingredients',
    title: 'Ashwagandha KSM-66®: The Most Clinically Studied Adaptogen',
    excerpt: 'Not all ashwagandha is created equal. We explain why the KSM-66® extract stands apart from generic root powder and what the studies actually show.',
    tags: ['Ingredients', 'Stress'],
    image: 'https://images.unsplash.com/photo-1596078842550-f9b9bdd7bdc7?w=700&q=80&auto=format&fit=crop',
    date: 'March 4, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'lions-mane-brain',
    category: 'science',
    title: "Lion's Mane and Neuroplasticity: What the Research Says",
    excerpt: "Can a mushroom really grow new brain cells? We review the current evidence on Lion's Mane, NGF stimulation, and long-term cognitive health.",
    tags: ['Science', 'Ingredients'],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=80&auto=format&fit=crop',
    date: 'Feb 28, 2026',
    readTime: '8 min read',
  },
  {
    slug: 'morning-ritual',
    category: 'lifestyle',
    title: 'Building a Morning Ritual That Actually Sticks',
    excerpt: "Productivity gurus make it look easy. Here's a grounded, science-backed approach to building a morning routine that compounds over time — no 4am wake-ups required.",
    tags: ['Lifestyle', 'Focus'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80&auto=format&fit=crop',
    date: 'Feb 20, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'caffeine-theanine',
    category: 'ingredients',
    title: 'Why L-Theanine + Caffeine Is the Most Studied Nootropic Stack',
    excerpt: 'The combination is everywhere — but why does it work? We walk through the pharmacology, optimal ratios, and what sets it apart from coffee alone.',
    tags: ['Ingredients', 'Science'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80&auto=format&fit=crop',
    date: 'Feb 14, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'deep-work',
    category: 'focus',
    title: 'Deep Work in 2026: How to Protect Your Focus in a Distracted World',
    excerpt: "Notifications, open-plan offices, and infinite scroll are engineered to fragment your attention. Here's how to fight back — cognitively and environmentally.",
    tags: ['Focus', 'Lifestyle'],
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=700&q=80&auto=format&fit=crop',
    date: 'Feb 7, 2026',
    readTime: '9 min read',
  },
  {
    slug: 'magnesium-sleep',
    category: 'science',
    title: 'Magnesium Glycinate and Sleep: The Most Underrated Recovery Tool',
    excerpt: 'Most people are deficient. Most supplements use the wrong form. We explain why Magnesium Glycinate is the form that actually crosses into the brain and supports deep rest.',
    tags: ['Science', 'Ingredients'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80&auto=format&fit=crop',
    date: 'Jan 30, 2026',
    readTime: '6 min read',
  },
];

export default function BlogPostsPage() {
  return (
    <main>
      {/* Featured post */}
      <section className="max-w-[1360px] mx-auto px-6 pt-12 pb-16">
        <Link
          href={`/pages/blog-posts/${featured.slug}`}
          className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#F8F8F8] rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[hsla(var(--color-secondary)/0.3)] transition-colors"
        >
          <div className="relative aspect-[5/4] md:aspect-auto md:h-full min-h-[260px]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-8 md:p-10 space-y-5">
            <div className="flex items-center gap-3 text-xs text-[hsla(var(--color-secondary)/0.5)]">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-snug text-[#1A1A18] group-hover:text-[hsla(var(--color-accent)/1)] transition-colors">
              {featured.title}
            </h2>
            <p className="text-base text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">
              {featured.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {featured.tags.map((tag) => (
                <span key={tag} className="text-xs border border-[var(--color-border)] px-3 py-1 rounded-full text-[hsla(var(--color-secondary)/0.6)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </section>

      <BlogPostsClient posts={posts} />

      {/* Product cross-link */}
      <section className="max-w-[1360px] mx-auto px-6 pb-24">
        <div className="bg-[#F0F0EE] rounded-2xl px-8 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[var(--color-border)]">
          <div>
            <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium mb-2">From the lab to your shelf</p>
            <p className="text-xl font-semibold tracking-[-0.02em] text-[#1A1A18] max-w-md leading-snug">
              Ready to put the science into practice? Flow is built around every ingredient we write about.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/products/flow" className="inline-flex items-center justify-center bg-[#1A1A18] text-white text-xs tracking-[0.1em] uppercase font-semibold px-6 py-3.5 rounded-full hover:bg-[hsla(var(--color-accent)/1)] transition-colors">
              Shop Flow
            </Link>
            <Link href="/pages/our-product" className="inline-flex items-center justify-center border border-[#1A1A18]/20 text-[#1A1A18] text-xs tracking-[0.1em] uppercase font-medium px-6 py-3.5 rounded-full hover:border-[#1A1A18]/40 transition-colors">
              The Formula
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

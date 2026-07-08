import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const description = post.excerpt ?? post.title;
  return {
    title: post.title,
    description: description.slice(0, 155),
    openGraph: {
      title: post.title,
      description: description.slice(0, 155),
      type: 'article',
      images: post.coverImageUrl ? [{ url: post.coverImageUrl, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description.slice(0, 155),
      images: post.coverImageUrl ? [post.coverImageUrl] : [],
    },
  };
}

// ─── Section image map — one contextual image per H2 heading ─────────────────
// Keyed on slug so each article gets relevant visuals
const SECTION_IMAGES: Record<string, string[]> = {
  'deep-work': [
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?w=900&q=80&auto=format&fit=crop',
  ],
  'caffeine-theanine': [
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop',
  ],
  'morning-ritual': [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80&auto=format&fit=crop',
  ],
  'lions-mane-brain': [
    'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=900&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80&auto=format&fit=crop',
  ],
  'nootropics-explained': [
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80&auto=format&fit=crop',
  ],
  'magnesium-sleep': [
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=900&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80&auto=format&fit=crop',
  ],
  'ashwagandha-stress': [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80&auto=format&fit=crop',
  ],
};

// ─── Rich Text renderer ───────────────────────────────────────────────────────

// Alternates right / left for each image (first section image is skipped)
type ImgSide = 'float-right' | 'float-left';
const IMG_SIDES: ImgSide[] = ['float-right', 'float-left'];

function SectionImage({ src, side }: { src: string; side: ImgSide }) {
  const isRight = side === 'float-right';
  return (
    <div
      className={[
        isRight ? 'float-right ml-5' : 'float-left mr-5',
        'mb-3 clear-both rounded-xl overflow-hidden relative bg-ink/[3.9%] shrink-0',
      ].join(' ')}
      style={{ width: '42%', aspectRatio: isRight ? '4/3' : '3/4' }}
    >
      <Image src={src} alt="" fill className="object-cover" sizes="260px" />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RichTextDocument({ node, slug }: { node: any; slug: string }) {
  if (!node) return null;
  const sectionImgs = SECTION_IMAGES[slug] ?? [];
  let h2Count = 0;
  let paraCount = 0;
  // Paragraphs rendered since the last image was placed; start high so the
  // first eligible image isn't suppressed.
  let parasSinceLastImg = 999;
  const MIN_PARAS_BETWEEN_IMGS = 2;
  // Image index separate from h2Count so skipped images don't shift the pool
  let imgPoolIndex = 0;
  const nodes: any[] = node.content ?? [];

  return (
    <div>
      {nodes.map((child: any, i: number) => {
        if (child.nodeType === 'heading-2') {
          const isFirst = h2Count === 0;
          h2Count++;
          if (isFirst) {
            // First section: never show an image
            return <RichTextNode key={i} node={child} />;
          }
          const imgSrc = sectionImgs[imgPoolIndex] ?? null;
          const tooClose = parasSinceLastImg < MIN_PARAS_BETWEEN_IMGS;
          const showImg = imgSrc && !tooClose;
          if (showImg) {
            const side = IMG_SIDES[imgPoolIndex % IMG_SIDES.length];
            imgPoolIndex++;
            parasSinceLastImg = 0;
            return (
              <div key={i}>
                <SectionImage src={imgSrc} side={side} />
                <RichTextNode node={child} />
              </div>
            );
          }
          // Too close — skip this image slot but still advance the pool
          if (imgSrc) imgPoolIndex++;
          return <RichTextNode key={i} node={child} />;
        }

        if (child.nodeType === 'paragraph') {
          paraCount++;
          parasSinceLastImg++;
          const text = child.content?.map((c: any) => c.value ?? '').join('') ?? '';
          if (paraCount % 4 === 0 && text.length > 80) {
            return (
              <div key={i}>
                <RichTextNode node={child} />
                <div className="clear-both" />
                <KeyTakeaway text={text} />
              </div>
            );
          }
        }

        return <RichTextNode key={i} node={child} />;
      })}
      <div className="clear-both" />
    </div>
  );
}

function KeyTakeaway({ text }: { text: string }) {
  // Extract the most meaningful sentence (first complete sentence ≤ 160 chars)
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  const best = sentences.find((s) => s.trim().length > 40 && s.trim().length < 160) ?? sentences[0] ?? text;
  return (
    <div className="my-8 bg-gradient-to-br from-brand/[0.07] to-ink/[0.04] border border-brand/15 rounded-2xl px-6 py-5 flex gap-4 items-start">
      <div className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-gradient-to-br from-brand to-ink flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1v4l2.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="1.2"/>
        </svg>
      </div>
      <div>
        <p className="text-xs tracking-[0.12em] uppercase font-semibold text-brand/70 mb-1">Key insight</p>
        <p className="text-sm font-medium text-ink leading-snug">{best.trim()}</p>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RichTextNode({ node }: { node: any }): React.ReactNode {
  if (!node) return null;

  switch (node.nodeType) {
    case 'paragraph':
      return (
        <p className="text-sm text-[rgba(30,24,84,0.78)] leading-relaxed mb-4">
          {node.content?.map((child: any, i: number) => <RichTextNode key={i} node={child} />)}
        </p>
      );

    case 'heading-2':
      return (
        <h2 className="text-base font-semibold text-ink tracking-[-0.01em] mt-10 mb-3 pb-2 border-b border-ink/[7.1%]">
          {node.content?.map((child: any, i: number) => <RichTextNode key={i} node={child} />)}
        </h2>
      );

    case 'heading-3':
      return (
        <h3 className="text-sm font-semibold text-ink mt-6 mb-2">
          {node.content?.map((child: any, i: number) => <RichTextNode key={i} node={child} />)}
        </h3>
      );

    case 'heading-4':
      return (
        <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-brand/70 mt-5 mb-1.5">
          {node.content?.map((child: any, i: number) => <RichTextNode key={i} node={child} />)}
        </h4>
      );

    case 'blockquote':
      return (
        <blockquote className="my-6 border-l-[3px] border-brand pl-5 py-1">
          <p className="text-sm font-medium italic text-ink/80 leading-relaxed">
            {node.content?.map((child: any, i: number) => <RichTextNode key={i} node={child} />)}
          </p>
        </blockquote>
      );

    case 'unordered-list':
      return (
        <ul className="my-5 space-y-2">
          {node.content?.map((child: any, i: number) => <RichTextNode key={i} node={child} />)}
        </ul>
      );

    case 'ordered-list':
      return (
        <ol className="my-5 space-y-2 list-decimal list-inside">
          {node.content?.map((child: any, i: number) => <RichTextNode key={i} node={child} />)}
        </ol>
      );

    case 'list-item':
      return (
        <li className="flex items-start gap-3 text-sm text-[rgba(30,24,84,0.78)] leading-relaxed">
          <span className="mt-[0.5em] shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-brand to-ink" />
          <span>{node.content?.map((child: any, i: number) => <RichTextNode key={i} node={child} />)}</span>
        </li>
      );

    case 'hr':
      return (
        <div className="my-10 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink/[7.1%]" />
          <div className="w-1 h-1 rounded-full bg-brand/30" />
          <div className="h-px flex-1 bg-ink/[7.1%]" />
        </div>
      );

    case 'text': {
      let el: React.ReactNode = node.value ?? null;
      if (!el) return null;
      const marks = node.marks ?? [];
      if (marks.some((m: any) => m.type === 'code')) return <code className="text-xs bg-ink/[0.06] text-brand px-1.5 py-0.5 rounded font-mono">{el}</code>;
      if (marks.some((m: any) => m.type === 'bold')) el = <strong className="font-semibold text-ink">{el}</strong>;
      if (marks.some((m: any) => m.type === 'italic')) el = <em className="italic">{el}</em>;
      if (marks.some((m: any) => m.type === 'underline')) el = <span className="underline underline-offset-2">{el}</span>;
      return el;
    }

    case 'hyperlink':
      return (
        <a href={node.data?.uri} target="_blank" rel="noopener noreferrer"
           className="text-brand underline underline-offset-2 hover:text-ink transition-colors">
          {node.content?.map((child: any, i: number) => <RichTextNode key={i} node={child} />)}
        </a>
      );

    default:
      return <>{node.content?.map((child: any, i: number) => <RichTextNode key={i} node={child} />)}</>;
  }
}


// ─── Page ─────────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPost(slug), getBlogPosts()]);

  if (!post) notFound();

  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 4);

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.flowhealth.ch';
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl,
    datePublished: post.publishedDate,
    author: { '@type': 'Organization', name: 'Flow Health', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Flow Health',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` },
    },
    url: `${SITE_URL}/pages/blog-posts/${post.slug}`,
    keywords: post.tags?.join(', '),
    articleSection: post.category,
    inLanguage: 'en',
  };

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-ink" style={{ height: 'clamp(320px, 52vw, 560px)' }}>
        {post.coverImageUrl && (
          <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover opacity-50" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b2e]/95 via-ink/50 to-transparent" />

        <div className="relative h-full max-w-[1200px] mx-auto px-6 flex flex-col justify-end pb-10">
          {/* Breadcrumb */}
          <nav className="absolute top-8 left-6 right-6 flex items-center gap-2 text-xs text-white/45">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/pages/blog-posts" className="hover:text-white/80 transition-colors">Journal</Link>
            <span>/</span>
            <span className="text-white/65 truncate max-w-[160px]">{post.title}</span>
          </nav>

          <div className="max-w-[680px]">
            {post.category && (
              <span className="inline-block mb-3 text-xs tracking-[0.14em] uppercase text-white/60 bg-white/10 border border-white/15 px-3 py-1 rounded-full font-medium">
                {post.category}
              </span>
            )}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-tight text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/45">
              <span>{post.publishedDate}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-white/30" />
              <span>{post.readTime}</span>
              {(post.tags ?? []).slice(0, 3).map((tag) => (
                <span key={tag} className="border border-white/15 px-2.5 py-0.5 rounded-full text-white/50">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Two-column layout ─────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex gap-12 items-start">

          {/* ── Main column ──────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Excerpt lead */}
            <div className="mb-8 pl-5 border-l-[3px] border-brand">
              <p className="text-sm font-medium text-[rgba(30,24,84,0.7)] leading-relaxed italic">
                {post.excerpt}
              </p>
            </div>

            {/* Article body */}
            <article>
              {post.body
                ? <RichTextDocument node={post.body} slug={slug} />
                : <p className="text-sm text-[rgba(30,24,84,0.4)] italic">Article content coming soon.</p>
              }
            </article>

            {/* Tags */}
            {(post.tags ?? []).length > 0 && (
              <div className="mt-10 pt-6 border-t border-[#1E185210] flex flex-wrap gap-2">
                {(post.tags ?? []).map((tag) => (
                  <span key={tag} className="text-xs border border-ink/[12.5%] px-3 py-1 rounded-full text-[rgba(30,24,84,0.5)] font-medium tracking-[0.06em] uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Product CTA */}
            <div className="mt-10 rounded-2xl bg-gradient-to-br from-ink to-brand p-7 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/[0.04]" />
              <div className="absolute -right-2 -bottom-6 w-24 h-24 rounded-full bg-white/[0.03]" />
              <div className="relative">
                <p className="text-xs tracking-[0.14em] uppercase font-semibold text-white/45 mb-1.5">Put the science to work</p>
                <p className="text-sm font-semibold text-white leading-snug mb-5 max-w-xs">
                  Flow is formulated around every ingredient we write about.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/products/rooibos-hibiscus-pomegranate"
                    className="bg-white text-ink text-xs tracking-[0.1em] uppercase font-bold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors">
                    Try Flow
                  </Link>
                  <Link href="/pages/our-product"
                    className="border border-white/20 text-white text-xs tracking-[0.1em] uppercase font-medium px-5 py-2.5 rounded-full hover:border-white/45 transition-colors">
                    The Formula
                  </Link>
                </div>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-8">
              <Link href="/pages/blog-posts"
                className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-[rgba(30,24,84,0.45)] hover:text-ink transition-colors">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M8 3L4 6.5L8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Journal
              </Link>
            </div>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────── */}
          {relatedPosts.length > 0 && (
            <aside className="hidden lg:block w-[260px] shrink-0">
              <div className="sticky top-24">
                <p className="text-xs tracking-[0.12em] uppercase font-semibold text-[rgba(30,24,84,0.4)] mb-3 px-1">Related articles</p>
                <div className="flex flex-col gap-3">
                  {relatedPosts.map((p) => (
                    <Link key={p.slug} href={`/pages/blog-posts/${p.slug}`}
                      className="group flex gap-3 items-start rounded-xl border border-ink/[7.1%] bg-white p-3 hover:border-ink/[14.5%] hover:shadow-[0_2px_12px_rgba(30,24,84,0.06)] transition-all">
                      <div className="relative shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-ink/[3.9%]">
                        {p.coverImageUrl && (
                          <Image src={p.coverImageUrl} alt={p.title} fill className="object-cover" sizes="56px" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-ink leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                          {p.title}
                        </p>
                        <p className="text-xs text-[rgba(30,24,84,0.4)] mt-1">{p.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* ── More articles (full-width bottom section) ─────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-[#1E185210] bg-ink/[3.9%]">
          <div className="max-w-[1200px] mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs tracking-[0.14em] uppercase font-semibold text-brand/65 mb-1">Keep reading</p>
                <h2 className="text-base font-semibold tracking-[-0.01em] text-ink">More from the Journal</h2>
              </div>
              <Link href="/pages/blog-posts"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs tracking-[0.08em] uppercase font-medium text-[rgba(30,24,84,0.45)] hover:text-ink transition-colors">
                All articles
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2.5 5.5h6M6 3l2.5 2.5L6 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedPosts.map((p) => (
                <Link key={p.slug} href={`/pages/blog-posts/${p.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-ink/[7.1%] hover:border-[#1E185228] hover:shadow-[0_4px_20px_rgba(30,24,84,0.07)] transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink/[3.9%]">
                    {p.coverImageUrl && (
                      <Image src={p.coverImageUrl} alt={p.title} fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                    )}
                    {p.category && (
                      <span className="absolute top-2.5 left-2.5 text-xs tracking-[0.1em] uppercase text-white/85 bg-black/25 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium">
                        {p.category}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col gap-1.5 flex-1">
                    <p className="text-xs text-[rgba(30,24,84,0.38)]">{p.readTime}</p>
                    <h3 className="text-xs font-semibold text-ink leading-snug line-clamp-2 group-hover:text-brand transition-colors flex-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[rgba(30,24,84,0.5)] line-clamp-2 leading-relaxed">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

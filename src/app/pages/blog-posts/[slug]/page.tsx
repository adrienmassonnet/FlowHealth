import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/contentful';

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

// ─── Rich Text renderer (no external package needed) ─────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RichTextNode({ node }: { node: any }): React.ReactNode {
  if (!node) return null;

  switch (node.nodeType) {
    case 'document':
      return (
        <div className="space-y-6 text-sm text-[hsla(var(--color-secondary)/0.85)] leading-[1.8]">
          {node.content?.map((child: any, i: number) => (
            <RichTextNode key={i} node={child} />
          ))}
        </div>
      );
    case 'paragraph':
      return (
        <p>
          {node.content?.map((child: any, i: number) => (
            <RichTextNode key={i} node={child} />
          ))}
        </p>
      );
    case 'heading-2':
      return (
        <h2 className="text-2xl font-semibold text-[#1E1854] tracking-[-0.02em] mt-10 mb-2">
          {node.content?.map((child: any, i: number) => (
            <RichTextNode key={i} node={child} />
          ))}
        </h2>
      );
    case 'heading-3':
      return (
        <h3 className="text-base font-semibold text-[#1E1854] tracking-[-0.01em] mt-6 mb-1">
          {node.content?.map((child: any, i: number) => (
            <RichTextNode key={i} node={child} />
          ))}
        </h3>
      );
    case 'unordered-list':
      return (
        <ul className="space-y-2 pl-0">
          {node.content?.map((child: any, i: number) => (
            <RichTextNode key={i} node={child} />
          ))}
        </ul>
      );
    case 'list-item':
      return (
        <li className="flex items-start gap-3">
          <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[hsla(var(--color-accent)/0.6)]" />
          <span>
            {node.content?.map((child: any, i: number) => (
              <RichTextNode key={i} node={child} />
            ))}
          </span>
        </li>
      );
    case 'text':
      if (node.marks?.some((m: any) => m.type === 'bold')) {
        return <strong>{node.value}</strong>;
      }
      if (node.marks?.some((m: any) => m.type === 'italic')) {
        return <em>{node.value}</em>;
      }
      return node.value ?? null;
    default:
      return null;
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

  const otherPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-2">
        <div className="relative w-full aspect-[21/9] min-h-[260px] max-h-[480px] overflow-hidden rounded-2xl bg-[#1E1854]">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover opacity-60"
            priority
            sizes="(max-width: 1360px) 100vw, 1360px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1854] via-[#1E1854]/40 to-transparent" />
        </div>
      </section>

      {/* Article */}
      <article className="max-w-[720px] mx-auto px-6 py-14">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[hsla(var(--color-secondary)/0.45)] mb-8">
          <Link href="/" className="hover:text-[#1E1854] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/pages/blog-posts" className="hover:text-[#1E1854] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-[#1E1854] truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {(post.tags ?? []).map((tag) => (
            <span key={tag} className="text-xs uppercase tracking-[0.1em] border border-[var(--color-border)] px-3 py-1 rounded-full text-[hsla(var(--color-secondary)/0.55)] font-medium">
              {tag}
            </span>
          ))}
          <span className="text-xs text-[hsla(var(--color-secondary)/0.4)]">{post.publishedDate} · {post.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight text-[#1E1854] mb-6">
          {post.title}
        </h1>

        <p className="text-lg text-[hsla(var(--color-secondary)/0.7)] leading-relaxed mb-10 border-l-2 border-[hsla(var(--color-accent)/0.4)] pl-4">
          {post.excerpt}
        </p>

        {/* Body (Rich Text) */}
        {post.body && <RichTextNode node={post.body} />}

        {/* Back link */}
        <div className="mt-16 pt-10 border-t border-[var(--color-border)]">
          <Link
            href="/pages/blog-posts"
            className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-[hsla(var(--color-secondary)/0.6)] hover:text-[#1E1854] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to all blogs
          </Link>
        </div>
      </article>

      {/* More posts */}
      {otherPosts.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 pb-24">
          <div className="border-t border-[var(--color-border)] pt-16">
            <h2 className="text-xl font-semibold tracking-[-0.02em] mb-8">More articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/pages/blog-posts/${p.slug}`}
                  className="group flex flex-col bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[hsla(var(--color-secondary)/0.3)] transition-colors"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1E18540A]">
                    <Image
                      src={p.coverImageUrl}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="text-xs text-[hsla(var(--color-secondary)/0.45)]">{p.publishedDate} · {p.readTime}</p>
                    <h3 className="text-sm font-semibold text-[#1E1854] leading-snug group-hover:text-[hsla(var(--color-accent)/1)] transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(p.tags ?? []).map((tag) => (
                        <span key={tag} className="text-xs uppercase tracking-[0.08em] border border-[var(--color-border)] px-2 py-0.5 rounded-full text-[hsla(var(--color-secondary)/0.5)] font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
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

// ─── Content layer ────────────────────────────────────────────────────────────
// Source: Contentful CMS → static content-data.ts fallback
// All function signatures are unchanged — no pages need updating.
// Fallback activates automatically when Contentful is unavailable.

import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { contentfulClient, assetUrl } from './contentful';
import type {
  IngredientEntry,
  HealthBenefitEntry,
  TakeFlowStepEntry,
  ProductHeroEntry,
  FeatureCardEntry,
  TeamMemberEntry,
  TestimonialEntry,
  FaqItemEntry,
  BlogPostEntry,
  MilestoneEntry,
  CompanyValueEntry,
  PhilosophyPrincipleEntry,
  PhilosophyBeliefEntry,
  ComparisonRowEntry,
  SavingsSupplementEntry,
  ResultsTimelineStepEntry,
  NavigationLinkEntry,
  PageHomeEntry,
} from './contentful';
// HomeostasisNodeEntry and OverstimulationTermEntry are typed as `any` in cfetch calls
// because the components using them are currently self-contained with internal data.

import {
  philosophyPrinciples as staticPrinciples,
  philosophyBeliefs as staticBeliefs,
  teamMembers as staticTeamMembers,
  companyValues as staticCompanyValues,
  milestones as staticMilestones,
  ingredients as staticIngredients,
  faqItems as staticFaqItems,
  homepageContent as staticHomepageContent,
  homepageFeatureCards as staticFeatureCards,
  resultsTimelineSteps as staticTimelineSteps,
  healthBenefits as staticHealthBenefits,
  testimonials as staticTestimonials,
  blogPosts as staticBlogPosts,
  comparisonRows as staticComparisonRows,
  savingsSupplements as staticSavingsSupplements,
  productHighlights as staticProductHighlights,
  takeFlowSteps as staticTakeFlowSteps,
} from './content-data';

import { PRODUCT_META } from './product-meta';

export type {
  PhilosophyPrinciple,
  PhilosophyBelief,
  TeamMember,
  CompanyValue,
  Milestone,
  Ingredient,
  FaqItem,
  HomepageContent,
  HomepageFeatureCard,
  ResultsTimelineStep,
  HealthBenefit,
  Testimonial,
  BlogPost,
  ComparisonRow,
  SavingsSupplement,
  ProductHighlight,
} from './content-data';

// Cache revalidation is handled at the page level via `export const revalidate`
// and on-demand via the /api/revalidate webhook from Contentful.

// ─── Utility: safe Contentful fetch with fallback ─────────────────────────────

async function cfetch<T>(
  contentType: string,
  options: Record<string, unknown> = {},
): Promise<T[] | null> {
  try {
    const res = await contentfulClient.getEntries<any>({
      content_type: contentType,
      ...options,
    });
    return res.items as T[];
  } catch {
    return null;
  }
}

async function cfetchOne<T>(contentType: string): Promise<T | null> {
  try {
    const res = await contentfulClient.getEntries<any>({
      content_type: contentType,
      limit: 1,
    });
    return res.items[0] as T ?? null;
  } catch {
    return null;
  }
}

// Confirmed via isolated testing (build + `next start`, not a dev-only quirk):
// calling revalidateTag() in a request that has never touched any
// unstable_cache-wrapped function does not actually persist the invalidation
// to later requests, even though it returns successfully. Touching ANY
// unstable_cache call first — not necessarily the one being invalidated —
// fixes it. This is a documented workaround for that behavior, not a
// content-specific cache. The revalidate webhook must call this before
// calling revalidateTag.
const touchCacheContext = unstable_cache(async () => true, ['__cache_context_warm__'], {
  tags: ['__cache_context_warm__'],
});
export async function warmCacheContextForRevalidate() {
  await touchCacheContext();
}

// Cross-request cache for a fixed (contentType, options) query — invalidated
// by the revalidate webhook calling revalidateTag(`contentful:${contentType}`).
// Only for resolvers whose query doesn't vary per request; tag-scoped queries
// go through getEntriesForTag instead, which keys on the resolved tag too.
function cachedFetch<T>(contentType: string, options: Record<string, unknown> = {}): Promise<T[] | null> {
  return unstable_cache(
    () => cfetch<T>(contentType, options),
    [contentType],
    { tags: [`contentful:${contentType}`] },
  )();
}

// ─── Generic content-tag resolver ──────────────────────────────────────────────
// Adding a new persona or benefit tag is purely a Contentful content change —
// create a contentTag entry, link it from whatever entries should match it.
// No content-type-specific or per-tag branching belongs here or in any caller.

async function resolveTagIdUncached(tagSlug: string): Promise<string | null> {
  try {
    const res = await contentfulClient.getEntries<any>({
      content_type: 'contentTag',
      'fields.slug': tagSlug,
      limit: 1,
    });
    return res.items[0]?.sys.id ?? null;
  } catch {
    return null;
  }
}

// Cross-request cache — invalidated when the revalidate webhook sees a
// contentTag publish event and calls revalidateTag('contentful:contentTag').
const resolveTagIdCached = unstable_cache(resolveTagIdUncached, ['contentTag-slug'], {
  tags: ['contentful:contentTag'],
});

// Per-request dedupe — getHealthBenefits and getProductHero (and any future
// caller) each resolve the same campaign slug; React's cache() ensures that
// resolution happens once per request no matter how many callers ask for it,
// even on a cold unstable_cache miss.
const resolveTagId = cache(async (tagSlug: string | undefined): Promise<string | null> => {
  if (!tagSlug) return null;
  return resolveTagIdCached(tagSlug);
});

// Returns entries of `contentType` linked (via their `tags` field) to the
// resolved tag, or `fallback` if the tag doesn't resolve or nothing matches.
// Cached per (contentType, tagSlug) pair and invalidated by that content
// type's own revalidateTag — same function for every caller, no per-tag or
// per-content-type branching.
async function getEntriesForTag<T>(
  contentType: string,
  tagSlug: string | undefined,
  fallback: T[],
  options: Record<string, unknown> = {},
): Promise<T[]> {
  const tagId = await resolveTagId(tagSlug);
  if (!tagId) return fallback;
  const fetchTagged = unstable_cache(
    () => cfetch<T>(contentType, { 'fields.tags.sys.id[in]': tagId, include: 2, ...options }),
    [contentType, tagSlug ?? 'default'],
    { tags: [`contentful:${contentType}`] },
  );
  const items = await fetchTagged();
  return items?.length ? items : fallback;
}

// ─── Philosophy ───────────────────────────────────────────────────────────────

export async function getPhilosophyPrinciples() {
  const items = await cfetch<PhilosophyPrincipleEntry>('philosophyPrinciple', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticPrinciples;
  return items.map((e) => ({
    number:  String(e.fields.number ?? ''),
    title:   String(e.fields.title ?? ''),
    body:    String(e.fields.body ?? ''),
  }));
}

export async function getPhilosophyBeliefs() {
  const items = await cfetch<PhilosophyBeliefEntry>('philosophyBelief', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticBeliefs;
  return items.map((e) => ({
    header:      String(e.fields.header ?? ''),
    description: String(e.fields.description ?? ''),
    text:        String(e.fields.text ?? ''),
    order:       Number(e.fields.order ?? 0),
  }));
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export async function getTeamMembers() {
  const items = await cfetch<TeamMemberEntry>('teamMember', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticTeamMembers;
  return items.map((e) => ({
    name:     String(e.fields.name ?? ''),
    role:     String(e.fields.role ?? ''),
    bio:      String(e.fields.bio ?? ''),
    imageUrl: assetUrl(e.fields.photo as any),
    imageAlt: String(e.fields.name ?? ''),
    order:    Number(e.fields.order ?? 0),
  }));
}

// ─── Company values ───────────────────────────────────────────────────────────

export async function getCompanyValues() {
  const items = await cfetch<CompanyValueEntry>('companyValue', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticCompanyValues;
  return items.map((e) => ({
    title:       String(e.fields.title ?? ''),
    description: String(e.fields.description ?? ''),
    iconName:    String(e.fields.iconName ?? ''),
    order:       Number(e.fields.order ?? 0),
  }));
}

// ─── Milestones ───────────────────────────────────────────────────────────────

export async function getMilestones() {
  const items = await cfetch<MilestoneEntry>('milestone', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticMilestones;
  return items.map((e) => ({
    year:        String(e.fields.year ?? ''),
    label:       String(e.fields.label ?? ''),
    description: String(e.fields.description ?? ''),
    order:       Number(e.fields.order ?? 0),
  }));
}

// ─── Ingredients ─────────────────────────────────────────────────────────────

export async function getIngredients() {
  const items = await cachedFetch<IngredientEntry>('ingredient', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticIngredients;
  return items.map((e) => ({
    name:        String(e.fields.name ?? ''),
    form:        String((e.fields as any).brandedForm ?? e.fields.form ?? ''),
    dose:        String(e.fields.dose ?? ''),
    category:    String(e.fields.category ?? ''),
    description: String(e.fields.description ?? ''),
    imageUrl:    assetUrl(e.fields.image as any),
    imageAlt:    String(e.fields.imageAlt ?? e.fields.name ?? ''),
    order:       Number(e.fields.order ?? 0),
    active:      (e.fields as any).active !== undefined ? Boolean((e.fields as any).active) : (e.fields.isActive !== undefined ? Boolean(e.fields.isActive) : true),
  }));
}

// ─── Featured ingredients (homepage strip) ────────────────────────────────────

const FEATURED_INGREDIENTS = [
  { name: 'Zynamite®',      imageUrl: '/ingredients/mangifera.png',  homepageOrder: 1, benefit: 'Jitter-free sustained focus.',            blogSlug: 'zynamite-focus' },
  { name: "Saffr'Active®",  imageUrl: '/ingredients/saffran.png',    homepageOrder: 2, benefit: 'Balanced mood and clarity.',              blogSlug: 'saffron-mood-clarity' },
  { name: 'TMG',            imageUrl: '/ingredients/tmg.png',        homepageOrder: 3, benefit: 'Augmented brain and cellular energy.',    blogSlug: 'tmg-brain-energy' },
  { name: "Lion's Mane",    imageUrl: '/ingredients/lions-mane.png', homepageOrder: 4, benefit: 'Neuroprotection and gut-brain support.',  blogSlug: 'lions-mane-brain' },
];

export async function getFeaturedIngredients() {
  const items = await cfetch<IngredientEntry>('ingredient', {
    'fields.featuredOnHomepage': true,
    order: ['fields.homepageOrder'],
  });
  // Use Contentful images if available, otherwise fall back to local assets
  return FEATURED_INGREDIENTS.map((ing) => {
    const match = items?.find((e) => String(e.fields.name ?? '').includes(ing.name.replace('®', '').trim()) || String(e.fields.name ?? '') === ing.name);
    return {
      ...ing,
      imageUrl: (match && assetUrl(match.fields.image as any)) || ing.imageUrl,
    };
  });
}

// ─── Health benefits ──────────────────────────────────────────────────────────

export async function getHealthBenefits(tagSlug?: string) {
  const items = await cachedFetch<HealthBenefitEntry>('healthBenefit', {
    order: ['fields.order'],
    include: 2,
  });
  if (!items?.length) return staticHealthBenefits;

  const tagged = await getEntriesForTag<HealthBenefitEntry>('healthBenefit', tagSlug, []);
  const taggedIds = new Set(tagged.map((e) => e.sys.id));
  const ordered = taggedIds.size
    ? [...items].sort((a, b) => Number(taggedIds.has(b.sys.id)) - Number(taggedIds.has(a.sys.id)))
    : items;

  return ordered.map((e) => {
    const linked = Array.isArray(e.fields.linkedIngredients)
      ? (e.fields.linkedIngredients as any[]).map((i) => String(i?.fields?.name ?? '')).filter(Boolean)
      : [];
    return {
      number:      String(e.fields.number ?? ''),
      label:       String(e.fields.label ?? ''),
      title:       String(e.fields.title ?? e.fields.label ?? ''),
      ingredients: linked.length ? linked.join(', ') : String(e.fields.ingredients ?? ''),
      description: String(e.fields.description ?? ''),
      imageUrl:    assetUrl(e.fields.image as any),
      imageAlt:    String(e.fields.title ?? e.fields.label ?? ''),
      order:       Number(e.fields.order ?? 0),
      blogSlug:    e.fields.blogSlug ? String(e.fields.blogSlug) : undefined,
    };
  });
}

// ─── Take Flow steps (How to Use) ─────────────────────────────────────────────

export async function getTakeFlowSteps() {
  const items = await cachedFetch<TakeFlowStepEntry>('takeFlowStep', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticTakeFlowSteps;
  return items.map((e) => ({
    number: String(e.fields.number ?? ''),
    title:  String(e.fields.title ?? ''),
    body:   Array.isArray(e.fields.bodyList) && e.fields.bodyList.length
      ? (e.fields.bodyList as string[])
      : String(e.fields.bodyText ?? ''),
    image:  assetUrl(e.fields.image as any),
  }));
}

// ─── Feature cards (homepage) ─────────────────────────────────────────────────

export async function getHomepageFeatureCards() {
  const items = await cfetch<FeatureCardEntry>('featureCard', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticFeatureCards;
  return items.map((e) => ({
    title:    String(e.fields.title ?? ''),
    body:     String(e.fields.body ?? ''),
    imageUrl: assetUrl(e.fields.image as any),
    imageAlt: String(e.fields.imageAlt ?? e.fields.title ?? ''),
    order:    Number(e.fields.order ?? 0),
  }));
}

// ─── Homepage content (section headings, hero copy) ──────────────────────────

export async function getHomepageContent() {
  const entry = await cfetchOne<PageHomeEntry>('pageHome');
  if (!entry) return staticHomepageContent;
  const f = entry.fields;
  return {
    heroTagline:               String(f.heroTagline ?? staticHomepageContent.heroTagline),
    heroHeading:               String(f.heroHeading ?? staticHomepageContent.heroHeading),
    heroImageUrl:              assetUrl(f.heroImage as any) || staticHomepageContent.heroImageUrl,
    missionHeading:            String(f.missionHeading ?? staticHomepageContent.missionHeading),
    missionSubheading:         String(f.missionEyebrow ?? staticHomepageContent.missionSubheading ?? ''),
    vennHeading:               String(f.vennHeading ?? staticHomepageContent.vennHeading),
    vennBackgroundImageUrl:    assetUrl(f.vennBackgroundImage as any) || staticHomepageContent.vennBackgroundImageUrl,
    resultsHeading:            String(f.resultsHeading ?? staticHomepageContent.resultsHeading),
    resultsSubheading:         String(f.resultsSubheading ?? staticHomepageContent.resultsSubheading),
    bottomMissionEyebrow:      String(f.bottomMissionEyebrow ?? staticHomepageContent.bottomMissionEyebrow),
    bottomMissionHeading:      String(f.bottomMissionHeading ?? staticHomepageContent.bottomMissionHeading),
    ingredientsSectionLabel:   String(f.ingredientsSectionLabel ?? staticHomepageContent.ingredientsSectionLabel),
    ingredientsHeading:        String(f.ingredientsHeading ?? staticHomepageContent.ingredientsHeading),
    healthBenefitsSectionLabel: String(f.healthBenefitsSectionLabel ?? staticHomepageContent.healthBenefitsSectionLabel),
    healthBenefitsHeading:     String(f.healthBenefitsHeading ?? staticHomepageContent.healthBenefitsHeading),
    // NeurotransmitterSection
    homeostasisEyebrow:    String(f.homeostasisEyebrow    ?? 'What goes up must come down'),
    homeostasisHeading:    String(f.homeostasisHeading    ?? 'True health is stability, not the constant swings.'),
    homeostasisBody:       String(f.homeostasisBody       ?? ''),
    homeostasisCenterLabel: String(f.homeostasisCenterLabel ?? "Flow's contribution to stability."),
    // BrainHealthSection
    brainHealthEyebrow:   String(f.brainHealthEyebrow    ?? 'Long-term brain health'),
    brainHealthHeading:   String(f.brainHealthHeading    ?? 'Chronic overstimulation quietly hinders the brain.'),
    brainHealthBody:      String(f.brainHealthBody       ?? ''),
    // ApproachSection
    approachEyebrow:      String(f.approachEyebrow       ?? 'The neuroscience of progress'),
    approachHeading:      String(f.approachHeading       ?? 'The brain grows by going somewhere it hasn\'t been before. Flow is there for the journey.'),
    approachCard1Label:   String(f.approachCard1Label    ?? 'The biology of growth'),
    approachCard1Body:    String(f.approachCard1Body     ?? ''),
    approachCard2Label:   String(f.approachCard2Label    ?? 'We celebrate you, not the supplement'),
    approachCard2Body:    String(f.approachCard2Body     ?? ''),
  };
}

// ─── Results timeline ─────────────────────────────────────────────────────────

export async function getResultsTimelineSteps() {
  const items = await cachedFetch<ResultsTimelineStepEntry>('resultsTimelineStep', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticTimelineSteps;
  return items.map((e) => ({
    period:  String(e.fields.period ?? ''),
    title:   String(e.fields.title ?? ''),
    // Join array of bullets into newline-separated string (matches existing component API)
    bullets: Array.isArray(e.fields.bullets)
      ? (e.fields.bullets as string[]).join('\n')
      : String(e.fields.bullets ?? ''),
    order: Number(e.fields.order ?? 0),
  }));
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export async function getFaqItems() {
  const items = await cfetch<FaqItemEntry>('faqItem', {
    order: ['fields.category', 'fields.order'],
  });
  if (!items?.length) return staticFaqItems;
  return items.map((e) => ({
    question: String(e.fields.question ?? ''),
    // answer may be Contentful rich text — extract plain text for backwards compat
    answer:   richTextToPlain(e.fields.answer),
    category: String(e.fields.category ?? ''),
    order:    Number(e.fields.order ?? 0),
  }));
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials() {
  const items = await cachedFetch<TestimonialEntry>('testimonial', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticTestimonials;
  return items.map((e) => ({
    quote:      String(e.fields.quote ?? ''),
    authorName: String(e.fields.authorName ?? ''),
    authorRole: String(e.fields.authorDescriptor ?? ''),
    order:      Number(e.fields.order ?? 0),
  }));
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function getBlogPosts() {
  const items = await cfetch<BlogPostEntry>('blogPost', {
    order: ['-fields.publishedDate'],
  });
  if (!items?.length) return staticBlogPosts;
  return items.map(mapBlogPost);
}

export async function getBlogPost(slug: string) {
  try {
    const res = await contentfulClient.getEntries<any>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });
    const entry = res.items[0] as BlogPostEntry | undefined;
    if (!entry) return staticBlogPosts.find((p) => p.slug === slug) ?? null;
    return mapBlogPost(entry);
  } catch {
    return staticBlogPosts.find((p) => p.slug === slug) ?? null;
  }
}

function mapBlogPost(e: BlogPostEntry) {
  return {
    title:         String(e.fields.title ?? ''),
    slug:          String(e.fields.slug ?? ''),
    excerpt:       String(e.fields.excerpt ?? ''),
    coverImageUrl: String(e.fields.coverImageUrl ?? ''),
    category:      String(e.fields.category ?? ''),
    tags:          Array.isArray(e.fields.tags) ? (e.fields.tags as string[]) : [],
    publishedDate: String(e.fields.publishedDate ?? ''),
    readTime:      String(e.fields.readTime ?? ''),
    featured:      Boolean(e.fields.featured ?? false),
    order:         Number(e.fields.order ?? 0),
    body:          e.fields.body ?? null,
  };
}

// ─── Comparison rows ──────────────────────────────────────────────────────────

export async function getComparisonRows() {
  const items = await cfetch<ComparisonRowEntry>('comparisonRow', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticComparisonRows;
  return items.map((e) => ({
    topic:       Array.isArray((e.fields as any).topic) ? ((e.fields as any).topic as string[]) : [],
    feature:     String((e.fields as any).feature ?? ''),
    othersLabel: String((e.fields as any).othersLabel ?? ''),
    order:       Number(e.fields.order ?? 0),
  }));
}

// ─── Savings supplements ──────────────────────────────────────────────────────

export async function getSavingsSupplements() {
  const items = await cfetch<SavingsSupplementEntry>('savingsSupplement', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticSavingsSupplements;
  return items.map((e) => ({
    name:            String(e.fields.name ?? ''),
    monthlyPriceCHF: Number(e.fields.monthlyPriceCHF ?? 0),
    order:           Number(e.fields.order ?? 0),
  }));
}

// ─── Product highlights ───────────────────────────────────────────────────────

export async function getProductHighlights() {
  return staticProductHighlights;
}

// ─── Product hero (dynamic on-page headline) ─────────────────────────────────

const getDefaultProductHero = unstable_cache(
  async () => {
    const res = await contentfulClient.getEntries<any>({
      content_type: 'productHero',
      'fields.tags[exists]': false,
      limit: 1,
    });
    return res.items[0]?.fields?.headline ?? null;
  },
  ['productHero', 'default'],
  { tags: ['contentful:productHero'] },
);

export async function getProductHero(fallbackHeadline: string, tagSlug?: string) {
  try {
    const defaultHeadline = String((await getDefaultProductHero()) ?? fallbackHeadline);
    const tagged = await getEntriesForTag<ProductHeroEntry>('productHero', tagSlug, []);
    return String(tagged[0]?.fields.headline ?? defaultHeadline);
  } catch {
    return fallbackHeadline;
  }
}

// ─── Product meta ─────────────────────────────────────────────────────────────

const getProductMetaFields = unstable_cache(
  async () => {
    const res = await contentfulClient.getEntries<any>({
      content_type: 'productMeta',
      limit: 1,
    });
    return res.items[0]?.fields ?? null;
  },
  ['productMeta'],
  { tags: ['contentful:productMeta'] },
);

export async function getProductMeta() {
  try {
    const f = await getProductMetaFields();
    if (!f) return buildProductMeta(null);
    return buildProductMeta(f);
  } catch {
    return buildProductMeta(null);
  }
}

function buildProductMeta(f: Record<string, unknown> | null) {
  const priceSingleCHF      = Number(f?.priceSingleCHF      ?? PRODUCT_META.priceSingleCHF);
  const priceSubscriptionCHF = Number(f?.priceSubscriptionCHF ?? PRODUCT_META.priceSubscriptionCHF ?? priceSingleCHF);
  const servingsPerBox       = Number(f?.servingsPerBox      ?? PRODUCT_META.servingsPerBox);
  return {
    priceSingleCHF,
    priceSubscriptionCHF,
    servingsPerBox,
    pricePerServingSingleCHF: Math.round((priceSingleCHF / servingsPerBox) * 100) / 100,
    activeIngredients:    Number(f?.activeIngredients    ?? PRODUCT_META.activeIngredients),
    totalIngredients:     Number(f?.totalIngredients     ?? PRODUCT_META.totalIngredients),
    caloriesKcal:         Number(f?.caloriesKcal         ?? PRODUCT_META.caloriesKcal),
    totalFormulaWeightG:  Number(f?.totalFormulaWeightG  ?? PRODUCT_META.totalFormulaWeightG),
    format:               String(f?.format               ?? PRODUCT_META.format),
    servingInstruction:   String(f?.servingInstruction   ?? PRODUCT_META.servingInstruction),
    origin:               String(f?.origin               ?? PRODUCT_META.origin),
    certification:        String(f?.certification        ?? PRODUCT_META.certification),
    returnDays:           Number(f?.returnDays           ?? PRODUCT_META.returnDays),
    freeShippingThresholdCHF: Number(f?.freeShippingThresholdCHF ?? PRODUCT_META.freeShippingThresholdCHF),
    deliveryDays:         Number(f?.deliveryDays         ?? PRODUCT_META.deliveryDays),
    isVegan:              Boolean(f?.isVegan             ?? true),
    isCaffeineFree:       Boolean(f?.isCaffeineFree      ?? true),
    isNoAddedSugar:       Boolean(f?.isNoAddedSugar      ?? true),
    nutrition: {
      fatG:     Number(f?.fatG     ?? PRODUCT_META.nutrition.fatG),
      carbsG:   Number(f?.carbsG   ?? PRODUCT_META.nutrition.carbsG),
      sugarsG:  Number(f?.sugarsG  ?? PRODUCT_META.nutrition.sugarsG),
      proteinG: Number(f?.proteinG ?? PRODUCT_META.nutrition.proteinG),
      saltMg:   Number(f?.saltMg   ?? PRODUCT_META.nutrition.saltMg),
    },
  };
}

// ─── Navigation links ─────────────────────────────────────────────────────────

export async function getNavigationLinks() {
  const items = await cfetch<NavigationLinkEntry>('navigationLink', {
    order: ['fields.order'],
  });
  if (!items?.length) return null; // caller uses hardcoded Header.tsx nav as fallback
  return items.map((e) => ({
    label:        String(e.fields.label ?? ''),
    url:          String(e.fields.url ?? ''),
    location:     String(e.fields.location ?? ''),
    parentId:     (e.fields.parent as any)?.sys?.id ?? null,
    id:           e.sys.id,
    order:        Number(e.fields.order ?? 0),
    openInNewTab: Boolean(e.fields.openInNewTab ?? false),
  }));
}

// ─── Brand settings ───────────────────────────────────────────────────────────

export async function getBrandSettings() {
  try {
    const res = await contentfulClient.getEntries<any>({
      content_type: 'brandSettings',
      limit: 1,
    });
    const f = res.items[0]?.fields;
    if (!f) return null;
    return {
      brandName:             String(f.brandName ?? 'Flow'),
      tagline:               String(f.tagline ?? ''),
      announcementBarText:   String(f.announcementBarText ?? ''),
      announcementBarEnabled: Boolean(f.announcementBarEnabled ?? true),
      contactEmail:          String(f.contactEmail ?? ''),
      contactPhone:          String(f.contactPhone ?? ''),
      socialInstagram:       String(f.socialInstagram ?? ''),
      socialTikTok:          String(f.socialTikTok ?? ''),
      newsletterHeading:     String(f.newsletterHeading ?? ''),
      newsletterSubheading:  String(f.newsletterSubheading ?? ''),
      newsletterCta:         String(f.newsletterCta ?? 'Subscribe'),
      copyrightText:         String(f.copyrightText ?? ''),
      primaryCtaLabel:       String(f.primaryCtaLabel ?? 'Get Flow'),
      primaryCtaUrl:         String(f.primaryCtaUrl ?? '/products/flow'),
    };
  } catch {
    return null;
  }
}

// ─── Homeostasis nodes (NeurotransmitterSection ring) ────────────────────────

// Static fallback matching current hardcoded component data
const STATIC_HOMEOSTASIS_NODES = [
  { label: 'Stable brain.',               iconName: 'brain',    order: 1 },
  { label: 'Balanced stress response.',   iconName: 'stress',   order: 2 },
  { label: 'Settled digestive system.',   iconName: 'gut',      order: 3 },
  { label: 'Steady nervous system.',      iconName: 'nervous',  order: 4 },
  { label: 'Resilient cells.',            iconName: 'cellular', order: 5 },
];

export async function getHomeostasisNodes() {
  const items = await cfetch<any>('homeostasisNode', { order: ['fields.order'] });
  if (!items?.length) return STATIC_HOMEOSTASIS_NODES;
  return items.map((e: any) => ({
    label:    String(e.fields.label ?? ''),
    iconName: String(e.fields.iconName ?? ''),
    order:    Number(e.fields.order ?? 0),
  }));
}

// ─── Overstimulation terms (BrainHealthSection word cloud) ───────────────────

const STATIC_OVERSTIMULATION_TERMS = [
  'Restlessness', 'Burnout', 'Dopamine crash', 'Cortisol overload',
  'Broken sleep', 'Chronic fatigue', 'Anxiety spiral', 'Mood instability',
  'Memory gaps', 'Neuroplasticity loss', 'Attention collapse', 'Decision fatigue',
  'Tolerance build-up', 'Cognitive ageing', 'Stress baseline rising',
  'Serotonin depletion', 'Neural inflammation', 'HPA dysregulation',
];

export async function getOverstimulationTerms() {
  const items = await cfetch<any>('overstimulationTerm', { order: ['fields.order'] });
  if (!items?.length) return STATIC_OVERSTIMULATION_TERMS;
  return items.map((e: any) => String(e.fields.term ?? ''));
}

// ─── Rich text → plain text (for FAQ answers in backwards-compat mode) ────────

function richTextToPlain(node: unknown): string {
  if (!node || typeof node !== 'object') return String(node ?? '');
  const n = node as { nodeType?: string; value?: string; content?: unknown[] };
  if (n.nodeType === 'text') return n.value ?? '';
  if (Array.isArray(n.content)) {
    return n.content.map(richTextToPlain).join('');
  }
  return '';
}

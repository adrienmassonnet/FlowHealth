// ─── Content layer ────────────────────────────────────────────────────────────
// Source: Contentful CMS → static content-data.ts fallback
// All function signatures are unchanged — no pages need updating.
// Fallback activates automatically when Contentful is unavailable.

import { contentfulClient, assetUrl } from './contentful';
import type {
  IngredientEntry,
  HealthBenefitEntry,
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
    text:  String(e.fields.text ?? ''),
    order: Number(e.fields.order ?? 0),
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
  const items = await cfetch<IngredientEntry>('ingredient', {
    order: ['fields.order'],
  });
  if (!items?.length) return staticIngredients;
  return items.map((e) => ({
    name:        String(e.fields.name ?? ''),
    form:        String(e.fields.brandedForm ?? ''),
    dose:        String(e.fields.dose ?? ''),
    category:    String(e.fields.category ?? ''),
    description: String(e.fields.description ?? ''),
    imageUrl:    assetUrl(e.fields.image as any),
    imageAlt:    String(e.fields.imageAlt ?? e.fields.name ?? ''),
    order:       Number(e.fields.order ?? 0),
    active:      Boolean(e.fields.isActive ?? true),
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

export async function getHealthBenefits() {
  return staticHealthBenefits;
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
  };
}

// ─── Results timeline ─────────────────────────────────────────────────────────

export async function getResultsTimelineSteps() {
  const items = await cfetch<ResultsTimelineStepEntry>('resultsTimelineStep', {
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
  const items = await cfetch<TestimonialEntry>('testimonial', {
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
    coverImageUrl: assetUrl(e.fields.coverImage as any),
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
    topic:       Array.isArray(e.fields.topicTags) ? (e.fields.topicTags as string[]) : [],
    feature:     String(e.fields.flowValue ?? ''),
    othersLabel: String(e.fields.othersValue ?? ''),
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

// ─── Product meta ─────────────────────────────────────────────────────────────

export async function getProductMeta() {
  try {
    const res = await contentfulClient.getEntries<any>({
      content_type: 'productMeta',
      limit: 1,
    });
    const f = res.items[0]?.fields;
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

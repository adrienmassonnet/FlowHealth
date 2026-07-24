import { createClient, type Asset, type Entry, type EntrySkeletonType } from 'contentful';

// ─── Client ───────────────────────────────────────────────────────────────────

const isPreview = process.env.CONTENTFUL_PREVIEW === 'true';

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: isPreview
    ? process.env.CONTENTFUL_PREVIEW_TOKEN!
    : process.env.CONTENTFUL_DELIVERY_TOKEN!,
  host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
});

// ─── Asset helpers ────────────────────────────────────────────────────────────

export function assetUrl(asset: Asset | undefined | null): string {
  const url = asset?.fields?.file?.url;
  if (!url) return '';
  const s = typeof url === 'string' ? url : '';
  return s.startsWith('//') ? `https:${s}` : s;
}

// ─── Base fields type — all content type fields must extend this ──────────────
// EntrySkeletonType requires [key: string]: unknown on field interfaces.

interface BaseFields {
  [key: string]: unknown;
}

// ─── Content type field interfaces ───────────────────────────────────────────

export interface BrandSettingsFields extends BaseFields {
  brandName: string;
  tagline?: string;
  announcementBarText?: string;
  announcementBarEnabled?: boolean;
  contactEmail?: string;
  contactPhone?: string;
  socialInstagram?: string;
  socialTikTok?: string;
  newsletterHeading?: string;
  newsletterSubheading?: string;
  newsletterCta?: string;
  copyrightText?: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
}

export interface ProductMetaFields extends BaseFields {
  activeIngredients: number;
  totalIngredients: number;
  totalFormulaWeightG: number;
  caloriesKcal: number;
  servingsPerBox: number;
  priceSingleCHF: number;
  priceSubscriptionCHF?: number;
  subscriptionDiscountPercent?: number;
  format?: string;
  servingInstruction?: string;
  origin?: string;
  certification?: string;
  freeShippingThresholdCHF?: number;
  deliveryDays?: number;
  returnDays?: number;
  fatG?: number;
  carbsG?: number;
  sugarsG?: number;
  proteinG?: number;
  saltMg?: number;
  isVegan?: boolean;
  isCaffeineFree?: boolean;
  isNoAddedSugar?: boolean;
}

export interface IngredientFields extends BaseFields {
  name: string;
  brandedForm?: string;
  dose?: string;
  category: string;
  isActive: boolean;
  shortBenefit?: string;
  description?: string;
  image?: Asset;
  imageAlt?: string;
  scientificName?: string;
  relatedBlogPost?: Entry<BlogPostSkeleton>;
  featuredOnHomepage?: boolean;
  homepageOrder?: number;
  order: number;
}

export interface HealthBenefitFields extends BaseFields {
  number?: string;
  label: string;
  title?: string;
  ingredients?: string;
  description?: string;
  linkedIngredients?: Entry<IngredientSkeleton>[];
  image?: Asset;
  order: number;
  blogSlug?: string;
  tags?: Entry<ContentTagSkeleton>[];
}

export interface ProductHeroFields extends BaseFields {
  headline: string;
  tags?: Entry<ContentTagSkeleton>[];
}

export interface ContentTagFields extends BaseFields {
  label: string;
  slug: string;
  dimension: string;
  status: string;
}

export interface TakeFlowStepFields extends BaseFields {
  number: string;
  title: string;
  bodyText?: string;
  bodyList?: string[];
  image: Asset;
  order: number;
}

export interface FeatureCardFields extends BaseFields {
  title: string;
  body?: string;
  image?: Asset;
  imageAlt?: string;
  order: number;
}

export interface TeamMemberFields extends BaseFields {
  name: string;
  role?: string;
  bio?: string;
  photo?: Asset;
  order: number;
}

export interface TestimonialFields extends BaseFields {
  quote: string;
  authorName: string;
  authorDescriptor?: string;
  authorPhoto?: Asset;
  rating?: number;
  verified?: boolean;
  featured?: boolean;
  order: number;
}

export interface FaqItemFields extends BaseFields {
  question: string;
  answer?: { nodeType: string; content: unknown[] };
  category: string;
  order: number;
}

export interface BlogPostFields extends BaseFields {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: Asset;
  category?: string;
  tags?: string[];
  publishedDate?: string;
  readTime?: string;
  featured?: boolean;
  body?: { nodeType: string; content: unknown[] };
  linkedIngredients?: Entry<IngredientSkeleton>[];
  seoTitle?: string;
  seoDescription?: string;
  order?: number;
}

export interface MilestoneFields extends BaseFields {
  year: string;
  label: string;
  description?: string;
  order: number;
}

export interface CompanyValueFields extends BaseFields {
  title: string;
  description?: string;
  iconName?: string;
  order: number;
}

export interface HomeostasisNodeFields extends BaseFields {
  label: string;
  iconName: string;
  order: number;
}

export interface OverstimulationTermFields extends BaseFields {
  term: string;
  order: number;
}

export interface PhilosophyPrincipleFields extends BaseFields {
  number?: string;
  title: string;
  body?: string;
  order: number;
}

export interface PhilosophyBeliefFields extends BaseFields {
  text: string;
  order: number;
}

export interface ComparisonRowFields extends BaseFields {
  feature: string;
  flowValue?: string;
  othersValue?: string;
  topicTags?: string[];
  order: number;
}

export interface SavingsSupplementFields extends BaseFields {
  name: string;
  monthlyPriceCHF: number;
  order: number;
}

export interface ResultsTimelineStepFields extends BaseFields {
  period: string;
  title?: string;
  bullets?: string[];
  order: number;
}

export interface NavigationLinkFields extends BaseFields {
  label: string;
  url?: string;
  location: string;
  parent?: Entry<NavigationLinkSkeleton>;
  order: number;
  openInNewTab?: boolean;
}

export interface PageHomeFields extends BaseFields {
  seoTitle?: string;
  seoDescription?: string;
  heroTagline?: string;
  heroHeading?: string;
  heroImage?: Asset;
  heroCta?: string;
  missionEyebrow?: string;
  missionHeading?: string;
  missionBody?: string;
  featureCards?: Entry<FeatureCardSkeleton>[];
  vennHeading?: string;
  vennBackgroundImage?: Asset;
  ingredientsSectionLabel?: string;
  ingredientsHeading?: string;
  healthBenefitsSectionLabel?: string;
  healthBenefitsHeading?: string;
  resultsHeading?: string;
  resultsSubheading?: string;
  bottomMissionEyebrow?: string;
  bottomMissionHeading?: string;
  // NeurotransmitterSection
  homeostasisEyebrow?: string;
  homeostasisHeading?: string;
  homeostasisBody?: string;
  homeostasisCenterLabel?: string;
  // BrainHealthSection
  brainHealthEyebrow?: string;
  brainHealthHeading?: string;
  brainHealthBody?: string;
  // ApproachSection
  approachEyebrow?: string;
  approachHeading?: string;
  approachCard1Label?: string;
  approachCard1Body?: string;
  approachCard2Label?: string;
  approachCard2Body?: string;
}

export interface PageProductDetailFields extends BaseFields {
  seoTitle?: string;
  seoDescription?: string;
  formatDescription?: string;
  benefitClaims?: string[];
  formulaHighlights?: string[];
  testimonialsHeading?: string;
  featuredTestimonials?: Entry<TestimonialSkeleton>[];
}

export interface PageOurProductFields extends BaseFields {
  seoTitle?: string;
  seoDescription?: string;
  heroEyebrow?: string;
  heroHeading?: string;
  heroBody?: string;
  heroImage?: Asset;
  formatDescription?: string;
  benefitClaims?: string[];
  formulaHighlights?: string[];
  ingredientsHeading?: string;
  ingredientsSubheading?: string;
}

export interface LegalPageFields extends BaseFields {
  title: string;
  slug: string;
  lastUpdated?: string;
  body?: { nodeType: string; content: unknown[] };
  seoTitle?: string;
  seoDescription?: string;
}

// ─── Skeleton types (used for Entry generic parameter) ────────────────────────

export type BrandSettingsSkeleton    = EntrySkeletonType<BrandSettingsFields,    'brandSettings'>;
export type ProductMetaSkeleton      = EntrySkeletonType<ProductMetaFields,      'productMeta'>;
export type IngredientSkeleton       = EntrySkeletonType<IngredientFields,       'ingredient'>;
export type HealthBenefitSkeleton    = EntrySkeletonType<HealthBenefitFields,    'healthBenefit'>;
export type TakeFlowStepSkeleton     = EntrySkeletonType<TakeFlowStepFields,     'takeFlowStep'>;
export type ProductHeroSkeleton      = EntrySkeletonType<ProductHeroFields,      'productHero'>;
export type ContentTagSkeleton       = EntrySkeletonType<ContentTagFields,       'contentTag'>;
export type FeatureCardSkeleton      = EntrySkeletonType<FeatureCardFields,      'featureCard'>;
export type TeamMemberSkeleton       = EntrySkeletonType<TeamMemberFields,       'teamMember'>;
export type TestimonialSkeleton      = EntrySkeletonType<TestimonialFields,      'testimonial'>;
export type FaqItemSkeleton          = EntrySkeletonType<FaqItemFields,          'faqItem'>;
export type BlogPostSkeleton         = EntrySkeletonType<BlogPostFields,         'blogPost'>;
export type MilestoneSkeleton        = EntrySkeletonType<MilestoneFields,        'milestone'>;
export type CompanyValueSkeleton     = EntrySkeletonType<CompanyValueFields,     'companyValue'>;
export type PhilosophyPrincipleSkeleton = EntrySkeletonType<PhilosophyPrincipleFields, 'philosophyPrinciple'>;
export type PhilosophyBeliefSkeleton = EntrySkeletonType<PhilosophyBeliefFields, 'philosophyBelief'>;
export type ComparisonRowSkeleton    = EntrySkeletonType<ComparisonRowFields,    'comparisonRow'>;
export type SavingsSupplementSkeleton = EntrySkeletonType<SavingsSupplementFields, 'savingsSupplement'>;
export type ResultsTimelineStepSkeleton = EntrySkeletonType<ResultsTimelineStepFields, 'resultsTimelineStep'>;
export type HomeostasisNodeSkeleton  = EntrySkeletonType<HomeostasisNodeFields,  'homeostasisNode'>;
export type OverstimulationTermSkeleton = EntrySkeletonType<OverstimulationTermFields, 'overstimulationTerm'>;
export type NavigationLinkSkeleton   = EntrySkeletonType<NavigationLinkFields,   'navigationLink'>;
export type PageHomeSkeleton         = EntrySkeletonType<PageHomeFields,         'pageHome'>;
export type PageProductDetailSkeleton = EntrySkeletonType<PageProductDetailFields, 'pageProductDetail'>;
export type PageOurProductSkeleton   = EntrySkeletonType<PageOurProductFields,   'pageOurProduct'>;
export type LegalPageSkeleton        = EntrySkeletonType<LegalPageFields,        'legalPage'>;

// ─── Entry type aliases ───────────────────────────────────────────────────────

export type BrandSettingsEntry    = Entry<BrandSettingsSkeleton>;
export type ProductMetaEntry      = Entry<ProductMetaSkeleton>;
export type IngredientEntry       = Entry<IngredientSkeleton>;
export type HealthBenefitEntry    = Entry<HealthBenefitSkeleton>;
export type TakeFlowStepEntry     = Entry<TakeFlowStepSkeleton>;
export type ProductHeroEntry      = Entry<ProductHeroSkeleton>;
export type ContentTagEntry       = Entry<ContentTagSkeleton>;
export type FeatureCardEntry      = Entry<FeatureCardSkeleton>;
export type TeamMemberEntry       = Entry<TeamMemberSkeleton>;
export type TestimonialEntry      = Entry<TestimonialSkeleton>;
export type FaqItemEntry          = Entry<FaqItemSkeleton>;
export type BlogPostEntry         = Entry<BlogPostSkeleton>;
export type MilestoneEntry        = Entry<MilestoneSkeleton>;
export type CompanyValueEntry     = Entry<CompanyValueSkeleton>;
export type PhilosophyPrincipleEntry = Entry<PhilosophyPrincipleSkeleton>;
export type PhilosophyBeliefEntry = Entry<PhilosophyBeliefSkeleton>;
export type ComparisonRowEntry    = Entry<ComparisonRowSkeleton>;
export type SavingsSupplementEntry = Entry<SavingsSupplementSkeleton>;
export type ResultsTimelineStepEntry = Entry<ResultsTimelineStepSkeleton>;
export type HomeostasisNodeEntry  = Entry<HomeostasisNodeSkeleton>;
export type OverstimulationTermEntry = Entry<OverstimulationTermSkeleton>;
export type NavigationLinkEntry   = Entry<NavigationLinkSkeleton>;
export type PageHomeEntry         = Entry<PageHomeSkeleton>;
export type PageProductDetailEntry = Entry<PageProductDetailSkeleton>;
export type PageOurProductEntry   = Entry<PageOurProductSkeleton>;
export type LegalPageEntry        = Entry<LegalPageSkeleton>;

import { createClient } from 'contentful';

let _client: ReturnType<typeof createClient> | undefined;

function contentfulClient() {
  if (!_client) {
    _client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
    });
  }
  return _client;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const client = () => contentfulClient() as any;

export interface PhilosophyPrinciple {
  number: string;
  title: string;
  body: string;
}

export interface PhilosophyBelief {
  text: string;
  order: number;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  imageAlt: string;
  order: number;
}

export interface CompanyValue {
  title: string;
  description: string;
  order: number;
}

export interface Milestone {
  year: string;
  label: string;
  description: string;
  order: number;
}

export interface Ingredient {
  name: string;
  form: string;
  dose: string;
  category: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  order: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface HomepageContent {
  heroTagline: string;
  heroHeading: string;
  heroImageUrl: string;
  missionHeading: string;
  vennHeading: string;
  vennBackgroundImageUrl: string;
  resultsHeading: string;
  resultsSubheading: string;
  bottomMissionEyebrow: string;
  bottomMissionHeading: string;
  ingredientsSectionLabel: string;
  ingredientsHeading: string;
  healthBenefitsSectionLabel: string;
  healthBenefitsHeading: string;
}

export interface HealthBenefit {
  number: string;
  label: string;
  title: string;
  ingredients: string;
  description: string;
  imageUrl: string;
  order: number;
}

export interface FeaturedIngredient {
  name: string;
  imageUrl: string;
  homepageOrder: number;
}

export interface HomepageFeatureCard {
  title: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  order: number;
}

export interface ResultsTimelineStep {
  period: string;
  title: string;
  bullets: string;
  order: number;
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorRole: string;
  order: number;
}

export async function getPhilosophyPrinciples(): Promise<PhilosophyPrinciple[]> {
  const res = await client().getEntries({
    content_type: 'philosophyPrinciple',
    order: ['fields.number'],
    limit: 100,
  });
  return res.items.map((item: { fields: PhilosophyPrinciple }) => item.fields as PhilosophyPrinciple);
}

export async function getPhilosophyBeliefs(): Promise<PhilosophyBelief[]> {
  const res = await client().getEntries({
    content_type: 'philosophyBelief',
    order: ['fields.order'],
    limit: 100,
  });
  return res.items.map((item: { fields: PhilosophyBelief }) => item.fields as PhilosophyBelief);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const res = await client().getEntries({
    content_type: 'teamMember',
    order: ['fields.order'],
    limit: 100,
    include: 2,
  });
  return res.items.map((item: any) => ({
    ...item.fields,
    imageUrl: item.fields.image?.fields?.file?.url
      ? `https:${item.fields.image.fields.file.url}`
      : (item.fields.imageUrl ?? ''),
    imageAlt: item.fields.image?.fields?.description || item.fields.image?.fields?.title || item.fields.name,
  }));
}

export async function getCompanyValues(): Promise<CompanyValue[]> {
  const res = await client().getEntries({
    content_type: 'companyValue',
    order: ['fields.order'],
    limit: 100,
  });
  return res.items.map((item: { fields: CompanyValue }) => item.fields as CompanyValue);
}

export async function getMilestones(): Promise<Milestone[]> {
  const res = await client().getEntries({
    content_type: 'milestone',
    order: ['fields.order'],
    limit: 100,
  });
  return res.items.map((item: { fields: Milestone }) => item.fields as Milestone);
}

export async function getIngredients(): Promise<Ingredient[]> {
  const res = await client().getEntries({
    content_type: 'ingredient',
    order: ['fields.order'],
    limit: 100,
    include: 2,
  });
  return res.items.map((item: any) => ({
    ...item.fields,
    imageUrl: item.fields.image?.fields?.file?.url
      ? `https:${item.fields.image.fields.file.url}`
      : item.fields.imageUrl,
    imageAlt: item.fields.image?.fields?.description || item.fields.image?.fields?.title || item.fields.name,
  }));
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const res = await client().getEntries({
    content_type: 'faqItem',
    order: ['fields.category', 'fields.order'],
    limit: 200,
  });
  return res.items.map((item: { fields: FaqItem }) => item.fields as FaqItem);
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const res = await client().getEntries({
    content_type: 'homepageContent',
    limit: 1,
    include: 2,
  });
  const item = res.items[0] as any;
  const heroImageUrl = item.fields.heroImage?.fields?.file?.url
    ? `https:${item.fields.heroImage.fields.file.url}`
    : '';
  const vennBackgroundImageUrl = item.fields.vennBackgroundImage?.fields?.file?.url
    ? `https:${item.fields.vennBackgroundImage.fields.file.url}`
    : '';
  return { ...item.fields, heroImageUrl, vennBackgroundImageUrl } as HomepageContent;
}

export async function getHomepageFeatureCards(): Promise<HomepageFeatureCard[]> {
  const res = await client().getEntries({
    content_type: 'homepageFeatureCard',
    order: ['fields.order'],
    limit: 10,
    include: 2,
  });
  return res.items.map((item: any) => ({
    ...item.fields,
    imageUrl: item.fields.image?.fields?.file?.url
      ? `https:${item.fields.image.fields.file.url}`
      : (item.fields.imageUrl ?? ''),
    imageAlt: item.fields.image?.fields?.description || item.fields.image?.fields?.title || item.fields.title,
  }));
}

export async function getResultsTimelineSteps(): Promise<ResultsTimelineStep[]> {
  const res = await client().getEntries({
    content_type: 'resultsTimelineStep',
    order: ['fields.order'],
    limit: 10,
  });
  return res.items.map((item: { fields: ResultsTimelineStep }) => item.fields as ResultsTimelineStep);
}

export async function getFeaturedIngredients(): Promise<FeaturedIngredient[]> {
  const res = await client().getEntries({
    content_type: 'ingredient',
    'fields.featuredOnHomepage': true,
    order: ['fields.homepageOrder'],
    limit: 10,
    include: 2,
  });
  return (res.items as any[])
    .map((item) => ({
      name: item.fields.name as string,
      imageUrl: item.fields.image?.fields?.file?.url
        ? `https:${item.fields.image.fields.file.url}`
        : (item.fields.imageUrl ?? ''),
      homepageOrder: item.fields.homepageOrder ?? 0,
    }))
    .sort((a, b) => a.homepageOrder - b.homepageOrder);
}

export async function getHealthBenefits(): Promise<HealthBenefit[]> {
  const res = await client().getEntries({
    content_type: 'healthBenefit',
    order: ['fields.order'],
    limit: 20,
    include: 2,
  });
  return (res.items as any[]).map((item) => ({
    number: item.fields.number as string,
    label: item.fields.label as string,
    title: item.fields.title as string,
    ingredients: item.fields.ingredients as string,
    description: item.fields.description as string,
    imageUrl: item.fields.image?.fields?.file?.url
      ? `https:${item.fields.image.fields.file.url}`
      : '',
    order: item.fields.order as number,
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await client().getEntries({
    content_type: 'testimonial',
    order: ['fields.order'],
    limit: 20,
  });
  return res.items.map((item: { fields: Testimonial }) => item.fields as Testimonial);
}

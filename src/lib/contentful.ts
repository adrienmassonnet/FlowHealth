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
  missionHeading: string;
  vennHeading: string;
  resultsHeading: string;
  resultsSubheading: string;
  bottomMissionEyebrow: string;
  bottomMissionHeading: string;
}

export interface HomepageFeatureCard {
  title: string;
  body: string;
  imageUrl: string;
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
  });
  return res.items[0].fields as HomepageContent;
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

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await client().getEntries({
    content_type: 'testimonial',
    order: ['fields.order'],
    limit: 20,
  });
  return res.items.map((item: { fields: Testimonial }) => item.fields as Testimonial);
}

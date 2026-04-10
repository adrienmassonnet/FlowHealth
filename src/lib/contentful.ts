// ─── Content layer ────────────────────────────────────────────────────────────
// Priority: Google Sheets → static content-data.ts fallback
// To activate Google Sheets: set GOOGLE_SHEETS_API_KEY in .env.local
// All function signatures are unchanged — no pages need updating.

import {
  philosophyPrinciples,
  philosophyBeliefs,
  teamMembers,
  companyValues,
  milestones,
  ingredients,
  faqItems,
  homepageContent as homepageContentData,
  homepageFeatureCards,
  resultsTimelineSteps,
  healthBenefits,
  testimonials,
  blogPosts as blogPostsData,
  comparisonRows,
  savingsSupplements,
  productHighlights,
} from './content-data';

import {
  getSheetsIngredients,
  getSheetsSavingsSupplements,
  getSheetsHealthBenefits,
  getSheetsResultsTimeline,
  getSheetsComparisonRows,
  getSheetsProductHighlights,
  getSheetsFaqItems,
  getSheetsTestimonials,
} from './sheets';

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

// ─── Not in Sheets (static only) ─────────────────────────────────────────────
export async function getPhilosophyPrinciples() { return philosophyPrinciples; }
export async function getPhilosophyBeliefs()    { return philosophyBeliefs; }
export async function getTeamMembers()          { return teamMembers; }
export async function getCompanyValues()        { return companyValues; }
export async function getMilestones()           { return milestones; }
export async function getHomepageContent()      { return homepageContentData; }
export async function getHomepageFeatureCards() { return homepageFeatureCards; }

// ─── Sheets → content-data fallback ──────────────────────────────────────────
export async function getIngredients() {
  return (await getSheetsIngredients()) ?? ingredients;
}

export async function getSavingsSupplements() {
  return (await getSheetsSavingsSupplements()) ?? savingsSupplements;
}

export async function getHealthBenefits() {
  return (await getSheetsHealthBenefits()) ?? healthBenefits;
}

export async function getResultsTimelineSteps() {
  return (await getSheetsResultsTimeline()) ?? resultsTimelineSteps;
}

export async function getComparisonRows() {
  return (await getSheetsComparisonRows()) ?? comparisonRows;
}

export async function getProductHighlights() {
  return (await getSheetsProductHighlights()) ?? productHighlights;
}

export async function getFaqItems() {
  return (await getSheetsFaqItems()) ?? faqItems;
}

export async function getTestimonials() {
  return (await getSheetsTestimonials()) ?? testimonials;
}

// ─── Featured ingredients (homepage strip) ────────────────────────────────────
export async function getFeaturedIngredients() {
  return [
    { name: 'Zynamite®',      imageUrl: '/mangifera.png',      homepageOrder: 1 },
    { name: "Saffr'Active®",  imageUrl: '/saffran.png',         homepageOrder: 2 },
    { name: 'Sodium Citrate', imageUrl: '/sodium-citrate.png',  homepageOrder: 3 },
    { name: "Lion's Mane",    imageUrl: '/lions-mane.png',      homepageOrder: 4 },
  ];
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
export async function getBlogPosts() { return blogPostsData; }

export async function getBlogPost(slug: string) {
  return blogPostsData.find((p) => p.slug === slug) ?? null;
}

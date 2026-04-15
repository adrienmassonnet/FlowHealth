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
  getSheetsProductMeta,
} from './sheets';

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

// ─── Not in Sheets (static only) ─────────────────────────────────────────────
export async function getPhilosophyPrinciples() { return philosophyPrinciples; }
export async function getPhilosophyBeliefs()    { return philosophyBeliefs; }
export async function getTeamMembers()          { return teamMembers; }
export async function getCompanyValues()        { return companyValues; }
export async function getMilestones()           { return milestones; }
export async function getHomepageContent()      { return homepageContentData; }
export async function getHomepageFeatureCards() { return homepageFeatureCards; }

// ─── Sheets → content-data fallback ──────────────────────────────────────────
const INGREDIENT_IMAGES: Record<string, string> = {
  'zynamite':        '/ingredients/mangifera.png',
  'mango leaf':      '/ingredients/mangifera.png',
  'mangifera':       '/ingredients/mangifera.png',
  'green tea':       '/ingredients/green-tea.png',
  "lion's mane":     '/ingredients/lions-mane.png',
  'lions mane':      '/ingredients/lions-mane.png',
  'ginseng':         '/ingredients/ginseng-panax.png',
  "saffr'active":    '/ingredients/saffran.png',
  'saffron':         '/ingredients/saffran.png',
  'hibiscus':        '/ingredients/hibiscus.png',
  'rooibos':         '/ingredients/rooibos.png',
  'inulin':          '/ingredients/inulin.png',
  'betaine':         '/ingredients/tmg.png',
  'trimethylglycine':'/ingredients/tmg.png',
  'tmg':             '/ingredients/tmg.png',
  'magnesium':       '/ingredients/magnesium.png',
  'sodium citrate':  '/ingredients/sodium-citrate.png',
  'zinc':            '/ingredients/zinc.png',
  'vitamin b':       '/ingredients/vitamin-b.png',
  'b-vitamin':       '/ingredients/vitamin-b.png',
  'pomegranate':     '/ingredients/pomegranate.png',
};

function resolveIngredientImage(name: string, imageUrl?: string): string {
  const trimmed = imageUrl?.trim();
  if (trimmed && (trimmed.startsWith('http') || trimmed.startsWith('/'))) return trimmed;
  const key = name.toLowerCase();
  for (const [pattern, path] of Object.entries(INGREDIENT_IMAGES)) {
    if (key.includes(pattern)) return path;
  }
  return '';
}

export async function getIngredients() {
  const sheetsData = await getSheetsIngredients();
  if (!sheetsData) return ingredients;
  return sheetsData.map((ing) => ({
    ...ing,
    imageUrl: resolveIngredientImage(ing.name, ing.imageUrl),
  }));
}

export async function getSavingsSupplements() {
  return savingsSupplements;
}

export async function getHealthBenefits() {
  const sheetsData = await getSheetsHealthBenefits();
  if (!sheetsData) return healthBenefits;
  // Merge: if Sheets row has no image, fall back to the local image for that benefit
  return sheetsData
    .filter((row) => row.label?.trim())
    .map((row) => {
      const fallback = healthBenefits.find((h) => h.label === row.label);
      return { ...row, imageUrl: row.imageUrl || fallback?.imageUrl || '' };
    });
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
    { name: 'Zynamite®',      imageUrl: '/ingredients/mangifera.png',      homepageOrder: 1 },
    { name: "Saffr'Active®",  imageUrl: '/ingredients/saffran.png',         homepageOrder: 2 },
    { name: 'Sodium Citrate', imageUrl: '/ingredients/sodium-citrate.png',  homepageOrder: 3 },
    { name: "Lion's Mane",    imageUrl: '/ingredients/lions-mane.png',      homepageOrder: 4 },
  ];
}

// ─── Product meta (dynamic from Sheets, fallback to product-meta.ts) ─────────
export async function getProductMeta() {
  const raw = await getSheetsProductMeta();
  const priceSingleCHF = raw?.price_single_CHF ? parseFloat(raw.price_single_CHF) : PRODUCT_META.priceSingleCHF;
  const priceSubscriptionCHF = raw?.price_subscription_CHF ? parseFloat(raw.price_subscription_CHF) : (PRODUCT_META.priceSubscriptionCHF ?? priceSingleCHF);
  const servingsPerBox = raw?.servings_per_box ? parseInt(raw.servings_per_box) : PRODUCT_META.servingsPerBox;
  return {
    priceSingleCHF,
    priceSubscriptionCHF,
    servingsPerBox,
    pricePerServingSingleCHF: Math.round((priceSingleCHF / servingsPerBox) * 100) / 100,
    activeIngredients: raw?.active_ingredients ? parseInt(raw.active_ingredients) : PRODUCT_META.activeIngredients,
    caloriesKcal: raw?.calories_kcal ? parseFloat(raw.calories_kcal) : PRODUCT_META.caloriesKcal,
    totalFormulaWeightG: raw?.total_formula_weight_g ? parseFloat(raw.total_formula_weight_g) : PRODUCT_META.totalFormulaWeightG,
    returnDays: PRODUCT_META.returnDays,
    freeShippingThresholdCHF: PRODUCT_META.freeShippingThresholdCHF,
  };
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
export async function getBlogPosts() { return blogPostsData; }

export async function getBlogPost(slug: string) {
  return blogPostsData.find((p) => p.slug === slug) ?? null;
}

// ─── Single source of truth for all product meta values ─────────────────────
// Edit here → changes propagate across every page and component that imports.
// Values mirror the 0_product_meta.csv Google Sheet tab.

export const PRODUCT_META = {
  // Pricing
  priceSingleCHF: 58.50,
  priceSubscriptionCHF: null as number | null, // set when subscription launches
  subscriptionDiscountPercent: null as number | null,
  servingsPerBox: 30,
  get pricePerServingSingleCHF() {
    return Math.round((this.priceSingleCHF / this.servingsPerBox) * 100) / 100;
  },

  // Formula
  activeIngredients: 13,   // excludes flavour/taste ingredients (Pomegranate, Stevia)
  totalIngredients: 15,    // full list including flavour/taste
  totalFormulaWeightG: 6.36, // sum of active ingredient doses (excl. taste), in grams
  caloriesKcal: 24,          // 5g carbs × 4 + 1g protein × 4

  // Nutrition (per serving)
  nutrition: {
    fatG: 0,
    carbsG: 5,
    sugarsG: 2,
    proteinG: 1,
    saltMg: 50,
  },

  // Product details
  format: 'Ready-to-drink powder sachet',
  servingInstruction: '1 sachet in 400–500 ml water',
  servingWaterMl: '400–500 ml',
  origin: 'Switzerland',
  certification: 'Swiss GMP',

  // Shipping & returns
  freeShippingThresholdCHF: 50,
  deliveryDays: 2,
  dispatchCutoffHour: '4pm',
  returnDays: 30,
} as const;

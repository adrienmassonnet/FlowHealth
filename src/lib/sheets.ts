// ─── Google Sheets integration ───────────────────────────────────────────────
// Fetches content from the Flow Google Sheet.
// When GOOGLE_SHEETS_API_KEY is not set, every function returns null and
// contentful.ts falls back to the static content-data.ts arrays automatically.
//
// Sheet ID:  process.env.GOOGLE_SHEET_ID
// Re-fetches every 60 seconds. Changes in the Sheet appear within 1 minute.

const SHEET_ID   = process.env.GOOGLE_SHEET_ID;
const API_KEY    = process.env.GOOGLE_SHEETS_API_KEY;
const REVALIDATE = 60; // seconds

type Row = Record<string, string>;

async function fetchTab(tab: string): Promise<Row[]> {
  if (!SHEET_ID || !API_KEY) return [];
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(tab)}?key=${API_KEY}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    const json = await res.json() as { values?: string[][] };
    if (!json.values || json.values.length < 2) return [];
    const [headers, ...rows] = json.values;
    return rows
      .filter((row) => row.some((c) => c?.trim()))
      .map((row) =>
        Object.fromEntries((headers as string[]).map((h, i) => [h.trim(), (row[i] ?? '').trim()]))
      );
  } catch {
    return [];
  }
}

// ─── Ingredients ─────────────────────────────────────────────────────────────
// Tab: Ingredients | Columns: name, dose mg, category, benefit, science, image, Active

export async function getSheetsIngredients() {
  const rows = await fetchTab('Ingredients');
  if (!rows.length) return null;
  return rows.map((r, i) => {
    const doseMg = r['dose mg'];
    return {
      name:        r.name,
      form:        '',
      dose:        doseMg ? `${doseMg} mg` : '',
      category:    r.category,
      description: r.benefit,
      science:     r.science,
      imageUrl:    r.image,
      imageAlt:    r.name,
      order:       i + 1,
    };
  });
}

// ─── Savings supplements ─────────────────────────────────────────────────────
// Tab: Savings breakdown | Columns: supplement, monthly_price_CHF

export async function getSheetsSavingsSupplements() {
  const rows = await fetchTab('Savings breakdown');
  if (!rows.length) return null;
  return rows
    .filter((r) => r.supplement && !isNaN(Number(r.monthly_price_CHF)))
    .map((r, i) => ({
      name:            r.supplement,
      monthlyPriceCHF: Number(r.monthly_price_CHF),
      order:           i + 1,
    }));
}

// ─── Health benefits ─────────────────────────────────────────────────────────
// Tab: health_benefits | Columns: number, label, key_ingredients, description, image

export async function getSheetsHealthBenefits() {
  const rows = await fetchTab('health_benefits');
  if (!rows.length) return null;
  return rows.map((r, i) => ({
    number:      r.number,
    label:       r.label,
    title:       r.label,
    ingredients: r.key_ingredients,
    description: r.description,
    imageUrl:    r.image ?? '',
    order:       i + 1,
  }));
}

// ─── Results timeline ────────────────────────────────────────────────────────
// Tab: Results Timeline | Columns: period, title, bullet_1..bullet_4

export async function getSheetsResultsTimeline() {
  const rows = await fetchTab('Results Timeline');
  if (!rows.length) return null;
  return rows.map((r, i) => ({
    period:  r.period,
    title:   r.title,
    bullets: [r.bullet_1, r.bullet_2, r.bullet_3, r.bullet_4]
      .filter(Boolean)
      .join('\n'),
    order: i + 1,
  }));
}

// ─── Comparison table ────────────────────────────────────────────────────────
// Tab: Comparison table | Columns: feature, flow, others

export async function getSheetsComparisonRows() {
  const rows = await fetchTab('Comparison table');
  if (!rows.length) return null;
  return rows.map((r, i) => ({
    topic:       [r.feature],
    feature:     r.flow,
    othersLabel: r.others,
    order:       i + 1,
  }));
}

// ─── Product highlights ──────────────────────────────────────────────────────
// Not yet in sheet — falls back to static data

export async function getSheetsProductHighlights() {
  return null;
}

// ─── FAQ items ───────────────────────────────────────────────────────────────
// Not yet in sheet — falls back to static data

export async function getSheetsFaqItems() {
  return null;
}

// ─── Testimonials ────────────────────────────────────────────────────────────
// Not yet in sheet — falls back to static data

export async function getSheetsTestimonials() {
  return null;
}

// ─── Product meta (key-value) ────────────────────────────────────────────────
// Tab: Meta | Columns: field, value, unit, notes

export async function getSheetsProductMeta(): Promise<Record<string, string> | null> {
  const rows = await fetchTab('Meta');
  if (!rows.length) return null;
  return Object.fromEntries(
    rows.filter((r) => r.field && r.value).map((r) => [r.field, r.value])
  );
}

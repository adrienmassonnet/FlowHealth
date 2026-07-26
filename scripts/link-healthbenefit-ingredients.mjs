/**
 * Adds a `linkedIngredients` reference field to the existing healthBenefit
 * content type and populates it on all 8 entries, resolved from their
 * existing flat `ingredients` string.
 *
 * Usage:
 *   CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx node scripts/link-healthbenefit-ingredients.mjs
 *
 * Safe to re-run — re-publishes with the same computed links each time.
 */

const SPACE_ID = 'u04owy9lblh5';
const ENV = 'master';
const TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const BASE = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENV}`;

if (!TOKEN) {
  console.error('Set CONTENTFUL_MANAGEMENT_TOKEN before running.');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

async function get(path) {
  const r = await fetch(`${BASE}${path}`, { headers });
  if (!r.ok) throw new Error(`GET ${path} -> ${r.status}: ${await r.text()}`);
  return r.json();
}

async function put(path, body, version) {
  const h = { ...headers };
  if (version !== undefined) h['X-Contentful-Version'] = String(version);
  const r = await fetch(`${BASE}${path}`, { method: 'PUT', headers: h, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`PUT ${path} -> ${r.status}: ${await r.text()}`);
  return r.json();
}

// name in "ingredients" string -> real ingredient entry name
// Judgment calls, documented for review:
//   Zynamite (R)          -> Mango Leaf Extract  (Zynamite(R) is the branded Mangifera indica / mango leaf extract)
//   Betaine                -> TMG                (TMG = trimethylglycine = betaine)
//   Saffr'Active(R) (Saffron) -> Saffron Extract
//   Vitamin B complex       -> expands to all 4 B-vitamin entries (B1, B3, B6, B12)
const ALIAS = {
  "zynamite®": "mango leaf extract",
  "zynamite (r)": "mango leaf extract",
  "betaine": "tmg",
  "saffr'active® (saffron)": "saffron extract",
  "saffr'active (r) (saffron)": "saffron extract",
};
const B_VITAMINS = ["vitamin b1 (thiamine)", "vitamin b3 (niacin)", "vitamin b6 (pyridoxine)", "vitamin b12 (methylcobalamin)"];

function norm(s) {
  return s.toLowerCase().replace(/[’']/g, "'").trim();
}

async function main() {
  console.log('Fetching ingredient entries...');
  const ingredientsRes = await get('/entries?content_type=ingredient&limit=100');
  const ingredientEntries = ingredientsRes.items.map((e) => ({
    id: e.sys.id,
    name: e.fields.name?.['en-US'] ?? '',
  }));
  const byNorm = new Map(ingredientEntries.map((i) => [norm(i.name), i.id]));

  function resolveNames(rawList) {
    const ids = new Set();
    for (const raw of rawList) {
      const key = norm(raw);
      if (key === 'vitamin b complex') {
        for (const bv of B_VITAMINS) {
          const id = byNorm.get(bv);
          if (id) ids.add(id);
        }
        continue;
      }
      if (key === 'all ingredients in the formula (synergistic effect)') {
        for (const i of ingredientEntries) ids.add(i.id);
        continue;
      }
      const aliased = ALIAS[key];
      const lookupKey = aliased ?? key;
      const id = byNorm.get(lookupKey);
      if (id) {
        ids.add(id);
      } else {
        console.warn(`  ! No ingredient match for "${raw}"`);
      }
    }
    return [...ids];
  }

  console.log('Fetching healthBenefit content type...');
  const ct = await get('/content_types/healthBenefit');
  const hasField = ct.fields.some((f) => f.id === 'linkedIngredients');

  if (!hasField) {
    console.log('Adding linkedIngredients field...');
    ct.fields.push({
      id: 'linkedIngredients',
      name: 'Linked Ingredients',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [{ linkContentType: ['ingredient'] }],
      },
    });
    const updated = await put('/content_types/healthBenefit', { fields: ct.fields, name: ct.name, description: ct.description }, ct.sys.version);
    await put(`/content_types/healthBenefit/published`, {}, updated.sys.version);
    console.log('  content type updated + published.');
  } else {
    console.log('linkedIngredients field already exists — skipping schema change.');
  }

  console.log('Fetching healthBenefit entries...');
  const entriesRes = await get('/entries?content_type=healthBenefit&limit=20');

  for (const entry of entriesRes.items) {
    const label = entry.fields.label?.['en-US'];
    const rawIngredients = String(entry.fields.ingredients?.['en-US'] ?? '').split(',').map((s) => s.trim()).filter(Boolean);
    const ids = resolveNames(rawIngredients);

    console.log(`${label}: ${rawIngredients.length} raw -> ${ids.length} linked`);

    const fresh = await get(`/entries/${entry.sys.id}`);
    fresh.fields.linkedIngredients = {
      'en-US': ids.map((id) => ({ sys: { type: 'Link', linkType: 'Entry', id } })),
    };
    const updated = await put(`/entries/${entry.sys.id}`, { fields: fresh.fields }, fresh.sys.version);
    await put(`/entries/${entry.sys.id}/published`, {}, updated.sys.version);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

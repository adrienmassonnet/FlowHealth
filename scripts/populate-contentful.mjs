/**
 * Contentful population script
 *
 * Usage:
 *   CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx node scripts/populate-contentful.mjs
 *
 * Get a fresh token at:
 *   https://app.contentful.com/account/profile/cma-tokens
 *
 * What this script does:
 *   1. Creates content types: homeostasisNode, overstimulationTerm
 *      (skips if they already exist)
 *   2. Publishes all entries for both content types
 *   3. Reports what was created vs skipped
 *
 * Safe to re-run — checks for existing entries before creating.
 */

const SPACE_ID = 'u04owy9lblh5';
const ENV      = 'master';
const TOKEN    = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const BASE     = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENV}`;

if (!TOKEN) {
  console.error('❌  Set CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx before running.');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type':  'application/json',
};

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

async function get(path) {
  const r = await fetch(`${BASE}${path}`, { headers });
  return r.json();
}

async function put(path, body, version) {
  const h = { ...headers };
  if (version !== undefined) h['X-Contentful-Version'] = String(version);
  const r = await fetch(`${BASE}${path}`, { method: 'PUT', headers: h, body: JSON.stringify(body) });
  if (!r.ok) {
    const err = await r.text();
    throw new Error(`PUT ${path} → ${r.status}: ${err}`);
  }
  return r.json();
}

async function post(path, body) {
  const r = await fetch(`${BASE}${path}`, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!r.ok) {
    const err = await r.text();
    throw new Error(`POST ${path} → ${r.status}: ${err}`);
  }
  return r.json();
}

// ─── Content type definitions ─────────────────────────────────────────────────

const CONTENT_TYPES = [
  {
    id: 'homeostasisNode',
    name: 'Homeostasis Node',
    description: 'One of the 5 body-system nodes in the NeurotransmitterSection ring diagram on the homepage.',
    displayField: 'label',
    fields: [
      { id: 'label',    name: 'Label',            type: 'Symbol', required: true },
      { id: 'iconName', name: 'Icon Identifier',  type: 'Symbol', required: true,
        validations: [{ in: ['brain', 'stress', 'gut', 'nervous', 'cellular'] }] },
      { id: 'order',    name: 'Display Order',    type: 'Integer', required: true },
    ],
  },
  {
    id: 'overstimulationTerm',
    name: 'Overstimulation Term',
    description: 'One term in the BrainHealthSection word cloud on the homepage.',
    displayField: 'term',
    fields: [
      { id: 'term',  name: 'Term',          type: 'Symbol',  required: true },
      { id: 'order', name: 'Display Order', type: 'Integer', required: true },
    ],
  },
];

// ─── Entry data ───────────────────────────────────────────────────────────────

const HOMEOSTASIS_NODES = [
  { label: 'Stable brain.',              iconName: 'brain',    order: 1 },
  { label: 'Balanced stress response.',  iconName: 'stress',   order: 2 },
  { label: 'Settled digestive system.',  iconName: 'gut',      order: 3 },
  { label: 'Steady nervous system.',     iconName: 'nervous',  order: 4 },
  { label: 'Resilient cells.',           iconName: 'cellular', order: 5 },
];

const OVERSTIMULATION_TERMS = [
  'Restlessness', 'Burnout', 'Dopamine crash', 'Cortisol overload',
  'Broken sleep', 'Chronic fatigue', 'Anxiety spiral', 'Mood instability',
  'Memory gaps', 'Neuroplasticity loss', 'Attention collapse', 'Decision fatigue',
  'Tolerance build-up', 'Cognitive ageing', 'Stress baseline rising',
  'Serotonin depletion', 'Neural inflammation', 'HPA dysregulation',
];

// ─── Create or update content type ───────────────────────────────────────────

async function ensureContentType(ct) {
  const existing = await get(`/content_types/${ct.id}`);
  const version  = existing?.sys?.version ?? 0;
  const exists   = !existing?.sys?.type?.includes('Error');

  const body = {
    name:         ct.name,
    description:  ct.description,
    displayField: ct.displayField,
    fields:       ct.fields,
  };

  const result = await put(`/content_types/${ct.id}`, body, exists ? version : undefined);
  if (result.sys?.type === 'ContentType') {
    // Publish the content type
    await put(`/content_types/${ct.id}/published`, {}, result.sys.version);
    console.log(`✅  Content type "${ct.id}" ${exists ? 'updated' : 'created'} and published.`);
  } else {
    console.error(`❌  Failed to create content type "${ct.id}":`, JSON.stringify(result));
  }
}

// ─── Create entry + publish ───────────────────────────────────────────────────

async function createEntry(contentTypeId, fields) {
  const entry = await post(`/entries`, fields);
  if (entry.sys?.type !== 'Entry') {
    console.error(`❌  Failed to create entry:`, JSON.stringify(entry));
    return;
  }
  // Set content type — must use X-Contentful-Content-Type header
  // Actually, we need to use the correct endpoint. Re-create with content type set.
  return entry;
}

async function createAndPublishEntry(contentTypeId, fieldsObj) {
  const body = {
    fields: Object.fromEntries(
      Object.entries(fieldsObj).map(([k, v]) => [k, { 'en-US': v }])
    ),
  };

  const h = {
    ...headers,
    'X-Contentful-Content-Type': contentTypeId,
  };

  const r = await fetch(`${BASE}/entries`, {
    method: 'POST',
    headers: h,
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    const err = await r.text();
    throw new Error(`Create entry → ${r.status}: ${err}`);
  }

  const entry = await r.json();
  const entryId = entry.sys.id;

  // Publish
  const pub = await fetch(`${BASE}/entries/${entryId}/published`, {
    method: 'PUT',
    headers: { ...headers, 'X-Contentful-Version': String(entry.sys.version) },
  });

  if (!pub.ok) {
    const err = await pub.text();
    console.warn(`⚠️   Entry "${entryId}" created but not published: ${err}`);
  }

  return entry;
}

// ─── Check existing entries ───────────────────────────────────────────────────

async function getExistingEntries(contentTypeId) {
  const res = await get(`/entries?content_type=${contentTypeId}&limit=200`);
  return res.items ?? [];
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀  Populating Contentful space ${SPACE_ID}\n`);

  // Step 1: Create content types
  console.log('── Content types ──────────────────────────────');
  for (const ct of CONTENT_TYPES) {
    await ensureContentType(ct);
  }

  // Step 2: homeostasisNode entries
  console.log('\n── homeostasisNode entries ─────────────────────');
  const existingNodes = await getExistingEntries('homeostasisNode');
  const existingNodeLabels = existingNodes.map(e => e.fields?.label?.['en-US']);

  for (const node of HOMEOSTASIS_NODES) {
    if (existingNodeLabels.includes(node.label)) {
      console.log(`⏭️   Skipped (exists): "${node.label}"`);
      continue;
    }
    await createAndPublishEntry('homeostasisNode', node);
    console.log(`✅  Created: "${node.label}"`);
  }

  // Step 3: overstimulationTerm entries
  console.log('\n── overstimulationTerm entries ─────────────────');
  const existingTerms = await getExistingEntries('overstimulationTerm');
  const existingTermValues = existingTerms.map(e => e.fields?.term?.['en-US']);

  for (const [i, term] of OVERSTIMULATION_TERMS.entries()) {
    if (existingTermValues.includes(term)) {
      console.log(`⏭️   Skipped (exists): "${term}"`);
      continue;
    }
    await createAndPublishEntry('overstimulationTerm', { term, order: i + 1 });
    console.log(`✅  Created: "${term}"`);
  }

  console.log('\n🎉  Done.\n');
}

main().catch((err) => {
  console.error('\n❌  Fatal error:', err.message);
  process.exit(1);
});

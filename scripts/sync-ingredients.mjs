/**
 * Sync all ingredients to Contentful — matches Google Sheet exactly.
 * - 16 active ingredients (vitamins as separate entries)
 * - 2 inactive: Pomegranate Flavour, Stevia
 * - Uploads local images, falls back gracefully if image missing
 *
 * Usage:
 *   CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx node scripts/sync-ingredients.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const SPACE_ID = 'u04owy9lblh5';
const ENV      = 'master';
const TOKEN    = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const BASE     = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENV}`;

if (!TOKEN) { console.error('❌  Set CONTENTFUL_MANAGEMENT_TOKEN'); process.exit(1); }

const headers = { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };

// ─── Ingredients — matches Google Sheet order exactly ────────────────────────
// active: true  = clinically active ingredient (16 total)
// active: false = flavoring/sweetener (not shown in "active ingredients" count)

const INGREDIENTS = [
  {
    name: 'Mango Leaf Extract',
    dose: '300 mg',
    category: 'Cognitive',
    description: 'Standardised to 60% mangiferin, Zynamite® modulates brain alpha and beta wave activity for alert, composed focus. Clinical trials show significant improvements in reaction time and reduced mental fatigue — without caffeine\'s cardiovascular side effects.',
    imageFile: 'mangifera.png',
    imageAlt: 'Dried mango leaf extract (Mangifera indica) — clinically studied nootropic for focus and mental energy in Flow Health',
    active: true, order: 1,
  },
  {
    name: 'Green Tea Extract',
    dose: '250 mg',
    category: 'Cognitive',
    description: 'Natural caffeine and L-theanine promote alpha brainwave activity — the neural signature of relaxed alertness. This pairing amplifies dopamine and norepinephrine signalling to sustain focused attention without the spike-and-crash of isolated stimulants.',
    imageFile: 'green-tea.png',
    imageAlt: 'Green tea extract (Camellia sinensis) with L-theanine and natural caffeine — sustained focus ingredient in Flow Health',
    active: true, order: 2,
  },
  {
    name: "Lion's Mane Mushroom",
    dose: '250 mg',
    category: 'Neuroplasticity',
    description: "Hericenones and erinacines cross the blood-brain barrier and stimulate Nerve Growth Factor (NGF) synthesis — essential for neuronal growth and maintenance. Lion's Mane is one of the few compounds with genuine evidence for supporting neuroplasticity and long-term cognitive resilience.",
    imageFile: 'lions-mane.png',
    imageAlt: "Lion's mane mushroom (Hericium erinaceus) — NGF-stimulating nootropic for neuroplasticity and brain health in Flow Health",
    active: true, order: 3,
  },
  {
    name: 'Hibiscus Extract',
    dose: '1,750 mg',
    category: 'Cellular Health',
    description: 'Rich in anthocyanins and polyphenols, Hibiscus sabdariffa neutralises oxidative stress in vascular tissue and supports cerebral blood flow — improving oxygen and nutrient delivery, the foundation for calm, sustained mental performance.',
    imageFile: 'hibiscus.png',
    imageAlt: 'Dried hibiscus sabdariffa flowers — antioxidant-rich botanical in Flow Health cognitive supplement',
    active: true, order: 4,
  },
  {
    name: 'Rooibos Extract',
    dose: '625 mg',
    category: 'Mood & Stress',
    description: "Rooibos contains aspalathin, which modulates the HPA axis — the body's central stress regulation system. By reducing excess cortisol signalling, it eases the physiological tension that makes focus and calm harder to sustain under pressure.",
    imageFile: 'rooibos.png',
    imageAlt: 'South African rooibos herbal extract — caffeine-free polyphenol antioxidant in Flow Health formula',
    active: true, order: 5,
  },
  {
    name: 'Saffron Extract',
    dose: '50 mg',
    category: 'Mood & Stress',
    description: "Standardised to crocin and safranal, Saffr'Active® influences serotonin reuptake and supports BDNF — critical for mood regulation and neuronal health. Clinical studies confirm meaningful improvements in mood and emotional resilience.",
    imageFile: 'saffran.png',
    imageAlt: "Saffron extract (Crocus sativus) — mood-lifting serotonin support ingredient in Flow Health",
    active: true, order: 6,
  },
  {
    name: 'Ginseng Panax',
    dose: '200 mg',
    category: 'Cognitive',
    description: 'Ginsenosides modulate dopamine and acetylcholine systems — both central to working memory and sustained attention. Research shows measurable reductions in mental fatigue under cognitive load, supporting enduring performance through demanding days.',
    imageFile: 'ginseng-panax.png',
    imageAlt: 'Panax ginseng root extract standardized for ginsenosides — adaptogen for cognitive performance in Flow Health',
    active: true, order: 7,
  },
  {
    name: 'TMG',
    dose: '500 mg',
    category: 'Cellular Health',
    description: "As a methyl donor, betaine (TMG) converts homocysteine to methionine in the one-carbon cycle. Elevated homocysteine is linked to cognitive decline and mood disruption — making TMG's role in this balance directly relevant to long-term brain health.",
    imageFile: 'tmg.png',
    imageAlt: 'Betaine trimethylglycine (TMG) — methyl donor for homocysteine balance and brain chemistry in Flow Health',
    active: true, order: 8,
  },
  {
    name: 'Magnesium Citrate',
    dose: '680 mg',
    category: 'Recovery',
    description: "A cofactor in over 300 enzymatic reactions, magnesium governs GABA — the brain's primary inhibitory neurotransmitter. Low levels cause nervous system hyperexcitability: tension, poor sleep, and stress reactivity. Citrate form ensures high bioavailability.",
    imageFile: 'magnesium.png',
    imageAlt: 'Magnesium citrate — bioavailable magnesium for GABA regulation and nervous system calm in Flow Health',
    active: true, order: 9,
  },
  {
    name: 'Sodium Citrate',
    dose: '400 mg',
    category: 'Cognitive',
    description: 'Sodium citrate maintains cellular fluid balance and membrane potential — the electrochemical gradient neurons rely on to fire efficiently. Proper sodium regulation supports nutrient transport across cell membranes and the stable environment needed for consistent cognitive output.',
    imageFile: 'sodium-citrate.png',
    imageAlt: 'Sodium citrate electrolyte — cellular hydration and nutrient absorption support in Flow Health',
    active: true, order: 10,
  },
  {
    name: 'Zinc',
    dose: '7 mg',
    category: 'Cognitive',
    description: 'Zinc modulates synaptic signalling at NMDA receptors and supports enzymes involved in dopamine synthesis and antioxidant defence. It also drives BDNF expression — critical for learning and memory consolidation.',
    imageFile: 'zinc.png',
    imageAlt: 'Zinc trace mineral — synaptic signaling cofactor for neurotransmitter function in Flow Health',
    active: true, order: 11,
  },
  {
    name: 'Vitamin B1 (Thiamine)',
    dose: '1.1 mg',
    category: 'Energy & Vitamins',
    description: 'Converts carbohydrates into usable brain energy and supports healthy nerve function. Thiamine is essential for the production of acetylcholine — a key neurotransmitter for memory and focus.',
    imageFile: 'vitamin-b.png',
    imageAlt: 'Vitamin B1 Thiamine — energy metabolism cofactor for nerve function in Flow Health',
    active: true, order: 12,
  },
  {
    name: 'Vitamin B3 (Niacin)',
    dose: '16 mg',
    category: 'Energy & Vitamins',
    description: 'Supports cellular energy production through NAD+ synthesis, protects neurons from oxidative stress, and plays a key role in DNA repair — maintaining long-term brain resilience.',
    imageFile: 'vitamin-b.png',
    imageAlt: 'Vitamin B3 Niacin — NAD+ synthesis and neuroprotection in Flow Health',
    active: true, order: 13,
  },
  {
    name: 'Vitamin B6 (Pyridoxine)',
    dose: '1.4 mg',
    category: 'Energy & Vitamins',
    description: 'Essential for synthesising serotonin, dopamine, and GABA — neurotransmitters that regulate mood, focus, and stress response. B6 also supports homocysteine metabolism for long-term cognitive health.',
    imageFile: 'vitamin-b.png',
    imageAlt: 'Vitamin B6 Pyridoxine — serotonin and dopamine synthesis cofactor in Flow Health',
    active: true, order: 14,
  },
  {
    name: 'Vitamin B12 (Methylcobalamin)',
    dose: '0.003 mg',
    category: 'Energy & Vitamins',
    description: 'Maintains myelin sheaths around nerve fibres, supports red blood cell formation, and drives methylation cycles critical for brain chemistry. Methylcobalamin is the most bioavailable and neurologically active form.',
    imageFile: 'vitamin-b.png',
    imageAlt: 'Vitamin B12 Methylcobalamin — myelin and nerve health in Flow Health',
    active: true, order: 15,
  },
  {
    name: 'Inulin',
    dose: '1,345 mg',
    category: 'Gut-Brain Axis',
    description: 'Fermented by gut microbiota into butyrate, inulin regulates intestinal permeability and modulates the vagus nerve — a direct pathway to the brain. A healthier microbiome is linked to improved mood stability, lower neuroinflammation, and greater cognitive flexibility.',
    imageFile: 'inulin.png',
    imageAlt: 'Inulin prebiotic fiber — gut-brain axis support in Flow Health',
    active: true, order: 16,
  },
  {
    name: 'Pomegranate Flavour',
    dose: '125 mg',
    category: 'Flavoring',
    description: 'Natural pomegranate flavouring makes the formula genuinely enjoyable to take — turning your daily routine into a ritual you actually look forward to.',
    imageFile: 'pomegranate.png',
    imageAlt: 'Natural pomegranate flavour — clean taste ingredient in Flow Health',
    active: false, order: 17,
  },
  {
    name: 'Stevia',
    dose: '100 mg',
    category: 'Flavoring',
    description: 'Provides gentle natural sweetness without raising blood sugar or adding calories — keeping the formula clean while making it pleasant to drink daily.',
    imageFile: null, // no local image — will be created without image
    imageAlt: 'Stevia natural sweetener — zero-calorie clean sweetness in Flow Health',
    active: false, order: 18,
  },
];

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

async function apiFetch(method, path, body, extraHeaders = {}) {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: { ...headers, ...extraHeaders },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) {
    const txt = await r.text();
    throw new Error(`${method} ${path} → ${r.status}: ${txt.slice(0, 400)}`);
  }
  return r.json();
}

async function getEntries(contentType) {
  const d = await apiFetch('GET', `/entries?content_type=${contentType}&limit=200`);
  return d.items ?? [];
}

async function deleteEntry(id) {
  const full = await apiFetch('GET', `/entries/${id}`);
  const ver  = full.sys.version;
  // Unpublish first (ignore errors if not published)
  await fetch(`${BASE}/entries/${id}/published`, {
    method: 'DELETE', headers: { ...headers, 'X-Contentful-Version': String(ver) },
  });
  // Re-fetch to get updated version after unpublish
  const fresh = await apiFetch('GET', `/entries/${id}`);
  await fetch(`${BASE}/entries/${id}`, {
    method: 'DELETE', headers: { ...headers, 'X-Contentful-Version': String(fresh.sys.version) },
  });
}

// ─── Upload image ─────────────────────────────────────────────────────────────

const assetCache = {}; // imageFile → assetId (avoid re-uploading same file)

async function uploadAsset(imageFile, title, altText) {
  if (assetCache[imageFile]) return assetCache[imageFile];

  const filePath = path.join(PUBLIC_DIR, 'ingredients', imageFile);
  if (!fs.existsSync(filePath)) return null;

  const fileBuffer = fs.readFileSync(filePath);

  // 1. Upload binary
  const uploadRes = await fetch(`https://upload.contentful.com/spaces/${SPACE_ID}/uploads`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/octet-stream' },
    body: fileBuffer,
  });
  if (!uploadRes.ok) throw new Error(`Upload binary failed: ${await uploadRes.text()}`);
  const upload = await uploadRes.json();

  // 2. Create asset
  const asset = await apiFetch('POST', '/assets', {
    fields: {
      title:       { 'en-US': title },
      description: { 'en-US': altText },
      file: { 'en-US': { contentType: 'image/png', fileName: imageFile,
        uploadFrom: { sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id } } } },
    },
  });

  // 3. Process
  await fetch(`${BASE}/assets/${asset.sys.id}/files/en-US/process`, {
    method: 'PUT', headers: { ...headers, 'X-Contentful-Version': String(asset.sys.version) },
  });

  // 4. Wait for CDN URL
  let processed = null;
  for (let i = 0; i < 12; i++) {
    await new Promise(r => setTimeout(r, 1500));
    const check = await apiFetch('GET', `/assets/${asset.sys.id}`);
    if (check.fields?.file?.['en-US']?.url) { processed = check; break; }
  }
  if (!processed) throw new Error(`Asset processing timed out for ${imageFile}`);

  // 5. Publish
  await fetch(`${BASE}/assets/${asset.sys.id}/published`, {
    method: 'PUT', headers: { ...headers, 'X-Contentful-Version': String(processed.sys.version) },
  });

  assetCache[imageFile] = asset.sys.id;
  return asset.sys.id;
}

// ─── Create + publish ingredient entry ───────────────────────────────────────

async function createIngredient(ing, assetId) {
  const fields = {
    name:        { 'en-US': ing.name },
    dose:        { 'en-US': ing.dose },
    category:    { 'en-US': ing.category },
    description: { 'en-US': ing.description },
    imageAlt:    { 'en-US': ing.imageAlt },
    active:      { 'en-US': ing.active },
    order:       { 'en-US': ing.order },
    form:        { 'en-US': '' },
  };
  if (assetId) {
    fields.image = { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: assetId } } };
  }

  const r = await fetch(`${BASE}/entries`, {
    method: 'POST',
    headers: { ...headers, 'X-Contentful-Content-Type': 'ingredient' },
    body: JSON.stringify({ fields }),
  });
  if (!r.ok) throw new Error(`Create entry: ${(await r.text()).slice(0, 300)}`);
  const created = await r.json();

  await fetch(`${BASE}/entries/${created.sys.id}/published`, {
    method: 'PUT', headers: { ...headers, 'X-Contentful-Version': String(created.sys.version) },
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀  Syncing ingredients (matches Google Sheet)\n');

  // Delete existing
  console.log('── Deleting existing entries ───────────────────');
  const existing = await getEntries('ingredient');
  for (const e of existing) {
    const name = e.fields?.name?.['en-US'] ?? e.sys.id;
    await deleteEntry(e.sys.id);
    console.log(`  🗑  ${name}`);
  }

  // Create all
  console.log('\n── Creating 18 ingredients ─────────────────────');
  for (const ing of INGREDIENTS) {
    process.stdout.write(`  [${ing.active ? '✓' : '○'}] ${ing.name} (${ing.dose}) ...`);

    let assetId = null;
    if (ing.imageFile) {
      try { assetId = await uploadAsset(ing.imageFile, ing.name, ing.imageAlt); }
      catch (e) { process.stdout.write(` [no img: ${e.message.slice(0,40)}]`); }
    }

    await createIngredient(ing, assetId);
    console.log(' ✅');
  }

  const active = INGREDIENTS.filter(i => i.active).length;
  const inactive = INGREDIENTS.filter(i => !i.active).length;
  console.log(`\n🎉  Done. ${active} active + ${inactive} inactive ingredients synced.\n`);
}

main().catch(err => { console.error('\n❌', err.message); process.exit(1); });

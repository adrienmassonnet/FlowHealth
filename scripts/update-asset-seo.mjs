// One-shot script: adds SEO title + description to Contentful assets missing them.
// Run with: node scripts/update-asset-seo.mjs

import https from 'https';

const SPACE = 'u04owy9lblh5';
const TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

// Descriptions keyed by asset ID
const SEO_DESCRIPTIONS = {
  // Health benefit images
  '76h9z0PGNSMPLT5EKZrBBx': 'Freedom from cravings and unease — Flow Health supports healthy dopamine and serotonin balance to reduce stimulant dependency',
  '4LHVCrBRthGZxtgBA3i2Ri': 'Balanced mood and motivation — Flow Health cognitive formula supports neurotransmitter health for positive outlook and drive',
  '2cZHJNWVXGRcr9plY8IGRd': 'Healthy stress response — Flow Health adaptogenic formula helps regulate cortisol and supports calm focus under pressure',
  '6ttoHcIqrUC2tPzIiHj5Dd': 'Steady energy all day — Flow Health B-vitamins and plant extracts support mitochondrial function for clean sustained energy without crashes',
  '33nTgMjrbgX0tcewiVUWNe': 'Sharper mental clarity — Flow Health nootropic blend supports cerebral blood flow and neurotransmitter production for crisp focus',
  '6JA4pliX1TUgg1nQHKelRU': 'Better recovery and rest — Flow Health magnesium and adaptogen formula supports deep sleep and overnight neurological repair',

  // Ingredient images
  '1k0NSddnhlBGiCYDkie9dR': 'Ashwagandha KSM-66 root extract — clinically studied adaptogen for cortisol reduction and stress resilience in Flow Health',
  '2TfTemndRDhvZElNWR5RXO': 'L-Theanine amino acid from green tea — promotes alpha-wave calm alertness and synergises with caffeine in Flow Health',
  '137PDJUegZRQGPcJPCT5pq': 'Saffron extract (Crocus sativus) — mood-lifting serotonin and dopamine support ingredient in Flow Health cognitive formula',
  '6X7GOHIpIcdn2hMMN6J0QZ': 'Zynamite mango leaf extract (Mangifera indica) — clinically studied nootropic for mental energy and focus in Flow Health',

  // Long-term brain health visual
  '2QZ3srciYwG5EJ7XUWDEIb': 'Long-term brain health — Flow Health neuroprotective ingredients support neuroplasticity and cognitive longevity over time',

  // Lifestyle / section images
  '2TpzJqKqCL6ZKgizt1baa5': 'Calm meditative rest — abstract representation of inner stability and mental recovery supported by Flow Health',
  'css5NDpNcKt9DVxexSuPI': 'Flow Health formula Venn diagram background — illustrating the intersection of science, nature, and performance',
  '57lxgECnNreZhURUkxrK29': 'Flow Health lifestyle — person experiencing mental clarity and calm energy from the Flow cognitive supplement',
  '277Ib5Ymrfr9XRJlNInaM3': 'Empowered by stable energy — Flow Health supports clean sustained mental and physical energy throughout the day',

  // Placeholder ingredient images (Unsplash-sourced, legacy)
  '6o20pesnAqZzSnoeEwyOuG': 'Rhodiola rosea adaptogenic root — stress hormone regulation and endurance support ingredient considered for Flow Health',
  '7mJoClVrH58WEZqMThLh1X': 'Magnesium glycinate — highly bioavailable magnesium form for relaxation and sleep quality in cognitive health formulas',
  '6pDoRnTr1svJi5SVYSz3mS': "Lion's mane mushroom (Hericium erinaceus) — NGF-stimulating nootropic for neuroplasticity and memory in Flow Health",
  '335tLYIkRbZK64Y2CdhhQD': 'L-Theanine amino acid — promotes alpha-wave calm alertness and pairs with green tea extract in Flow Health formula',
  '6bCUUByFNxpfm9Oj03GGO7': 'Ashwagandha root (Withania somnifera) — stress-reducing adaptogen for cortisol balance and mental resilience',
  '6HGVVRixH50qKIZA7qkcMT': 'Ashwagandha root extract — KSM-66 standardized adaptogen for HPA-axis support and cognitive stress protection',
  '5eMF5EOL0QRZ1ozeDtbens': 'Ashwagandha (Withania somnifera) root — adaptogenic herb for stress resilience and cognitive performance support',
  '6OjagdKkWjjhKnEQYIpek3': 'Bacopa monnieri herb — traditional nootropic for memory consolidation and synaptic signaling support',

  // Team member photos
  '2JOAryO1UYAqSnsJBWWRSF': 'Marc Dubois — Co-founder of Flow Health, endurance athlete and cognitive performance specialist',
  '5uSoEr1oVJil12tOhB2nJR': 'Sophie Wenger — Co-founder of Flow Health, formulation expert and nutritional science researcher',
  '7zGHc6NUqRf5WcISvX6kI7': 'Dr. Lena Fischer — Scientific advisor at Flow Health, specialist in neuroscience and sports nutrition',

  // Consume / lifestyle
  '5lX5cxOq21h5xtPTRkZpHU': 'Unlock your full potential — endurance athlete experiencing peak mental and physical performance with Flow Health',
  'BdKIeNXVXunrNleDwBUlr': 'Daily inner peace ritual — person enjoying a calm morning routine with Flow Health cognitive supplement',
};

function apiRequest(path, method = 'GET', body = null, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: 'api.contentful.com',
      path,
      method,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        ...extraHeaders,
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
    };
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', c => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function getAllAssets() {
  const r = await apiRequest(`/spaces/${SPACE}/assets?limit=200`);
  return r.body.items;
}

async function updateAsset(asset) {
  const id = asset.sys.id;
  const version = asset.sys.version;
  const desc = SEO_DESCRIPTIONS[id];
  if (!desc) return null; // no update needed / not in our map

  const existingDesc = asset.fields.description?.['en-US'];
  if (existingDesc) {
    console.log(`  SKIP ${id} — already has description`);
    return null;
  }

  const updatedFields = {
    ...asset.fields,
    description: { 'en-US': desc },
  };

  const r = await apiRequest(
    `/spaces/${SPACE}/assets/${id}`,
    'PUT',
    { fields: updatedFields },
    { 'X-Contentful-Version': String(version) }
  );

  if (r.status === 200) {
    const newVersion = r.body.sys.version;
    // Publish immediately
    const pub = await apiRequest(
      `/spaces/${SPACE}/assets/${id}/published`,
      'PUT',
      null,
      { 'X-Contentful-Version': String(newVersion) }
    );
    return { id, status: pub.status === 200 ? 'published' : `pub_error_${pub.status}` };
  }
  return { id, status: `update_error_${r.status}`, detail: r.body };
}

async function main() {
  const assets = await getAllAssets();
  console.log(`Fetched ${assets.length} assets`);

  const results = [];
  for (const asset of assets) {
    const id = asset.sys.id;
    const title = asset.fields.title?.['en-US'] || '(no title)';
    const result = await updateAsset(asset);
    if (result) {
      console.log(`  ${result.status} → [${id}] ${title}`);
      results.push(result);
    }
  }

  const ok = results.filter(r => r.status === 'published').length;
  const err = results.filter(r => r.status !== 'published').length;
  console.log(`\nDone: ${ok} updated & published, ${err} errors`);
  if (err > 0) {
    results.filter(r => r.status !== 'published').forEach(r => console.error('  ERROR:', r));
  }
}

main().catch(console.error);

/**
 * Sets up the homepage "Our Ingredients" section in Contentful:
 *   1. Adds `featuredOnHomepage` (Boolean) + `homepageOrder` (Integer) to `ingredient` type
 *   2. Adds `ingredientsHeading` (Text) + `ingredientsSectionLabel` (Symbol) to `homepageContent`
 *   3. Sets those text values on the existing homepageContent entry
 *   4. Creates 4 featured ingredient entries (with images fetched from URL and uploaded as assets)
 *
 * Run once:  node scripts/setup-ingredients-section.mjs
 */
import contentfulManagement from 'contentful-management';
import https from 'https';
import http from 'http';

const SPACE_ID          = 'u04owy9lblh5';
const MANAGEMENT_TOKEN  = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID    = 'master';
const LOCALE            = 'en-US';

const client = contentfulManagement.createClient({ accessToken: MANAGEMENT_TOKEN });

const featuredIngredients = [
  {
    name: 'Mango Leaf (Zynamite®)',
    category: 'Cognitive',
    homepageOrder: 1,
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80&auto=format&fit=crop',
    imageFileName: 'ingredient-mangifera.jpg',
  },
  {
    name: 'Saffron Extract',
    category: 'Mood',
    homepageOrder: 2,
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80&auto=format&fit=crop',
    imageFileName: 'ingredient-saffron.jpg',
  },
  {
    name: 'Ashwagandha KSM-66®',
    category: 'Stress',
    homepageOrder: 3,
    imageUrl: 'https://images.unsplash.com/photo-1611239483587-e5e59f5b0e14?w=600&q=80&auto=format&fit=crop',
    imageFileName: 'ingredient-ashwagandha.jpg',
  },
  {
    name: 'L-Theanine',
    category: 'Calm',
    homepageOrder: 4,
    imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80&auto=format&fit=crop',
    imageFileName: 'ingredient-theanine.jpg',
  },
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function uploadImageAsset(env, { imageUrl, imageFileName, name }) {
  console.log(`  Downloading ${name}…`);
  const buf = await fetchBuffer(imageUrl);

  console.log(`  Uploading to Contentful…`);
  const upload = await env.createUpload({ file: buf });

  let asset = await env.createAsset({
    fields: {
      title: { [LOCALE]: name },
      file: {
        [LOCALE]: {
          contentType: 'image/jpeg',
          fileName: imageFileName,
          uploadFrom: { sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id } },
        },
      },
    },
  });

  asset = await asset.processForLocale(LOCALE);

  // Poll until processed
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    asset = await env.getAsset(asset.sys.id);
    if (asset.fields.file?.[LOCALE]?.url) break;
    console.log('    still processing…');
  }

  asset = await asset.publish();
  console.log(`  ✓ Asset published: https:${asset.fields.file[LOCALE].url}`);
  return asset;
}

async function main() {
  const space = await client.getSpace(SPACE_ID);
  const env   = await space.getEnvironment(ENVIRONMENT_ID);

  // ── 1. Update `ingredient` content type ──────────────────────────────────
  console.log('\n── Updating ingredient content type…');
  const ingredientCt = await env.getContentType('ingredient');

  const hasFeatured     = ingredientCt.fields.some((f) => f.id === 'featuredOnHomepage');
  const hasHomepageOrder = ingredientCt.fields.some((f) => f.id === 'homepageOrder');

  if (!hasFeatured) {
    ingredientCt.fields.push({
      id: 'featuredOnHomepage',
      name: 'Featured on Homepage',
      type: 'Boolean',
      required: false,
      localized: false,
      validations: [],
    });
  }
  if (!hasHomepageOrder) {
    ingredientCt.fields.push({
      id: 'homepageOrder',
      name: 'Homepage Order',
      type: 'Integer',
      required: false,
      localized: false,
      validations: [],
    });
  }

  if (!hasFeatured || !hasHomepageOrder) {
    const updated = await ingredientCt.update();
    await updated.publish();
    console.log('ingredient type updated.');
  } else {
    console.log('ingredient type already has required fields.');
  }

  // ── 2. Update `homepageContent` content type ──────────────────────────────
  console.log('\n── Updating homepageContent content type…');
  const hpCt = await env.getContentType('homepageContent');

  const hasHeading = hpCt.fields.some((f) => f.id === 'ingredientsHeading');
  const hasLabel   = hpCt.fields.some((f) => f.id === 'ingredientsSectionLabel');

  if (!hasHeading) {
    hpCt.fields.push({
      id: 'ingredientsHeading',
      name: 'Ingredients Section Heading',
      type: 'Text',
      required: false,
      localized: false,
      validations: [],
    });
  }
  if (!hasLabel) {
    hpCt.fields.push({
      id: 'ingredientsSectionLabel',
      name: 'Ingredients Section Label',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [],
    });
  }

  if (!hasHeading || !hasLabel) {
    const updated = await hpCt.update();
    await updated.publish();
    console.log('homepageContent type updated.');
  } else {
    console.log('homepageContent type already has ingredient fields.');
  }

  // ── 3. Set text values on the homepageContent entry ──────────────────────
  console.log('\n── Updating homepageContent entry…');
  const hpEntries = await env.getEntries({ content_type: 'homepageContent', limit: 1 });
  let hpEntry = hpEntries.items[0];

  hpEntry.fields.ingredientsHeading = {
    [LOCALE]: 'A unique blend, carefully selected to ignite bodily harmony and foster healthy energy.',
  };
  hpEntry.fields.ingredientsSectionLabel = {
    [LOCALE]: 'our ingredients',
  };

  hpEntry = await hpEntry.update();
  hpEntry = await hpEntry.publish();
  console.log('homepageContent entry updated.');

  // ── 4. Create ingredient entries ──────────────────────────────────────────
  console.log('\n── Creating featured ingredient entries…');

  // Check which ones already exist (by name)
  const existingIngredients = await env.getEntries({
    content_type: 'ingredient',
    'fields.featuredOnHomepage': true,
    limit: 20,
  });
  const existingNames = new Set(existingIngredients.items.map((i) => i.fields.name?.[LOCALE]));

  for (const ing of featuredIngredients) {
    if (existingNames.has(ing.name)) {
      console.log(`  Skipping ${ing.name} — already exists.`);
      continue;
    }

    console.log(`\n  Creating: ${ing.name}`);
    const asset = await uploadImageAsset(env, ing);

    let entry = await env.createEntry('ingredient', {
      fields: {
        name:              { [LOCALE]: ing.name },
        category:          { [LOCALE]: ing.category },
        form:              { [LOCALE]: '—' },
        dose:              { [LOCALE]: '—' },
        description:       { [LOCALE]: ing.name },
        order:             { [LOCALE]: ing.homepageOrder },
        featuredOnHomepage:{ [LOCALE]: true },
        homepageOrder:     { [LOCALE]: ing.homepageOrder },
        image: {
          [LOCALE]: { sys: { type: 'Link', linkType: 'Asset', id: asset.sys.id } },
        },
      },
    });

    entry = await entry.publish();
    console.log(`  ✓ ${ing.name} entry published.`);
  }

  console.log('\n✓ All done. Ingredients section is now in Contentful.');
}

main().catch((err) => { console.error(err); process.exit(1); });

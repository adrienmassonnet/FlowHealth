/**
 * Sets up the "Health Benefits" section in Contentful:
 *   1. Creates the `healthBenefit` content type with all required fields
 *   2. Adds `healthBenefitsSectionLabel` (Symbol) + `healthBenefitsHeading` (Text) to `homepageContent`
 *   3. Sets those text values on the existing homepageContent entry
 *   4. Creates 7 healthBenefit entries, downloading Unsplash images and uploading as Contentful assets
 *
 * Run once:  node scripts/setup-health-benefits.mjs
 */
import contentfulManagement from 'contentful-management';
import https from 'https';
import http from 'http';

const SPACE_ID         = 'u04owy9lblh5';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID   = 'master';
const LOCALE           = 'en-US';

const client = contentfulManagement.createClient({ accessToken: MANAGEMENT_TOKEN });

const healthBenefits = [
  {
    number: '01',
    label: 'Long-Term Brain Health',
    title: 'Long-Term Brain Health',
    ingredients: "Bacopa Monnieri · Blueberry Extract · Lion's Mane",
    description: 'Carefully chosen antioxidants nourish your brain daily. Blueberry extract and Bacopa Monnieri support cognitive vitality and healthy function as you pursue your goals over time.',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=85&auto=format&fit=crop',
    imageFileName: 'benefit-brain-health.jpg',
    order: 1,
  },
  {
    number: '02',
    label: 'Better Recovery & Rest',
    title: 'Better Recovery & Rest',
    ingredients: 'Magnesium · L-Theanine · Ashwagandha KSM-66®',
    description: "Flow supports your body's natural recovery processes. Magnesium and L-Theanine help you bounce back faster from mental exertion and prepare for deeper, more restorative sleep at night.",
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=85&auto=format&fit=crop',
    imageFileName: 'benefit-recovery.jpg',
    order: 2,
  },
  {
    number: '03',
    label: 'Sharper Mental Clarity',
    title: 'Sharper Mental Clarity',
    ingredients: "Lion's Mane · Alpha-GPC · Zynamite®",
    description: "Clear away brain fog with nutrients that enhance neural communication. Lion's mane mushroom and Alpha-GPC promote crisp, quick thinking and better decision-making in any situation.",
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=85&auto=format&fit=crop',
    imageFileName: 'benefit-mental-clarity.jpg',
    order: 3,
  },
  {
    number: '04',
    label: 'Steady Energy All Day',
    title: 'Steady Energy All Day',
    ingredients: 'B-Vitamins Complex · Natural Caffeine · CoQ10',
    description: 'Flow delivers calm, sustained vitality without jitters or crashes. B-vitamins and natural caffeine sources support healthy energy metabolism, keeping you alert and productive from morning to evening.',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=85&auto=format&fit=crop',
    imageFileName: 'benefit-energy.jpg',
    order: 4,
  },
  {
    number: '05',
    label: 'Healthy Stress Response',
    title: 'Healthy Stress Response',
    ingredients: 'Ashwagandha KSM-66® · Rhodiola Rosea · Magnesium',
    description: "Flow's adaptogens help your body maintain balance under stress, promoting resilience and reducing the physical toll of daily demands.",
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop',
    imageFileName: 'benefit-stress.jpg',
    order: 5,
  },
  {
    number: '06',
    label: 'Balanced Mood & Motivation',
    title: 'Balanced Mood & Motivation',
    ingredients: 'L-Tyrosine · Mucuna Pruriens · Rhodiola Rosea',
    description: 'Support natural dopamine pathways and healthy hormonal balance for a stable, positive outlook. L-Tyrosine and Mucuna Pruriens help lift mood gently, fostering motivation and emotional calm throughout the day.',
    imageUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=900&q=85&auto=format&fit=crop',
    imageFileName: 'benefit-mood.jpg',
    order: 6,
  },
  {
    number: '07',
    label: 'Freedom from Cravings',
    title: 'Freedom from Cravings & Unease',
    ingredients: 'Mucuna Pruriens · Magnesium · L-Theanine',
    description: 'Quiet restless cravings and physical discomfort that pull your attention away. Mucuna Pruriens and Magnesium support dopamine balance and relaxation, helping you stay comfortable, centered, and free from distractions.',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&q=85&auto=format&fit=crop',
    imageFileName: 'benefit-cravings.jpg',
    order: 7,
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const followRedirects = (currentUrl, attempts = 0) => {
      if (attempts > 5) return reject(new Error('Too many redirects'));
      const mod = currentUrl.startsWith('https') ? https : http;
      mod.get(currentUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return followRedirects(res.headers.location, attempts + 1);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${currentUrl}`));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      }).on('error', reject);
    };
    followRedirects(url);
  });
}

async function uploadImageAsset(env, { imageUrl, imageFileName, title }) {
  console.log(`    Downloading image…`);
  const buf = await fetchBuffer(imageUrl);

  console.log(`    Uploading to Contentful (${buf.length} bytes)…`);
  const upload = await env.createUpload({ file: buf });

  let asset = await env.createAsset({
    fields: {
      title: { [LOCALE]: title },
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

  // Poll until asset is processed (up to 20 × 2s = 40s)
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    asset = await env.getAsset(asset.sys.id);
    if (asset.fields.file?.[LOCALE]?.url) break;
    console.log(`    still processing… (attempt ${i + 1})`);
  }

  if (!asset.fields.file?.[LOCALE]?.url) {
    throw new Error(`Asset processing timed out for ${imageFileName}`);
  }

  asset = await asset.publish();
  console.log(`    Asset published: https:${asset.fields.file[LOCALE].url}`);
  return asset;
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Connecting to Contentful…');
  const space = await client.getSpace(SPACE_ID);
  const env   = await space.getEnvironment(ENVIRONMENT_ID);
  console.log(`Connected to space "${space.name}" / environment "${ENVIRONMENT_ID}"\n`);

  // ── 1. Create or verify `healthBenefit` content type ──────────────────────
  console.log('── Step 1: healthBenefit content type');

  let hbCt;
  let ctExists = false;

  try {
    hbCt = await env.getContentType('healthBenefit');
    ctExists = true;
    console.log('  healthBenefit content type already exists — skipping creation.');
  } catch (err) {
    if (err.name !== 'NotFound') throw err;
  }

  if (!ctExists) {
    console.log('  Creating healthBenefit content type…');
    hbCt = await env.createContentTypeWithId('healthBenefit', {
      name: 'Health Benefit',
      displayField: 'title',
      fields: [
        {
          id: 'number',
          name: 'Number',
          type: 'Symbol',
          required: true,
          localized: false,
          validations: [],
        },
        {
          id: 'label',
          name: 'Label',
          type: 'Symbol',
          required: true,
          localized: false,
          validations: [],
        },
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          localized: false,
          validations: [],
        },
        {
          id: 'ingredients',
          name: 'Ingredients',
          type: 'Symbol',
          required: true,
          localized: false,
          validations: [],
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: true,
          localized: false,
          validations: [],
        },
        {
          id: 'image',
          name: 'Image',
          type: 'Link',
          linkType: 'Asset',
          required: true,
          localized: false,
          validations: [],
        },
        {
          id: 'order',
          name: 'Order',
          type: 'Integer',
          required: true,
          localized: false,
          validations: [],
        },
      ],
    });

    hbCt = await hbCt.publish();
    console.log('  healthBenefit content type created and published.');
  }

  // ── 2. Update `homepageContent` content type ──────────────────────────────
  console.log('\n── Step 2: homepageContent content type');

  const hpCt = await env.getContentType('homepageContent');

  const hasLabel   = hpCt.fields.some((f) => f.id === 'healthBenefitsSectionLabel');
  const hasHeading = hpCt.fields.some((f) => f.id === 'healthBenefitsHeading');

  if (!hasLabel) {
    hpCt.fields.push({
      id: 'healthBenefitsSectionLabel',
      name: 'Health Benefits Section Label',
      type: 'Symbol',
      required: false,
      localized: false,
      validations: [],
    });
    console.log('  Added healthBenefitsSectionLabel field.');
  } else {
    console.log('  healthBenefitsSectionLabel already exists.');
  }

  if (!hasHeading) {
    hpCt.fields.push({
      id: 'healthBenefitsHeading',
      name: 'Health Benefits Heading',
      type: 'Text',
      required: false,
      localized: false,
      validations: [],
    });
    console.log('  Added healthBenefitsHeading field.');
  } else {
    console.log('  healthBenefitsHeading already exists.');
  }

  if (!hasLabel || !hasHeading) {
    const updatedHpCt = await hpCt.update();
    await updatedHpCt.publish();
    console.log('  homepageContent type updated and published.');
  }

  // ── 3. Set values on the homepageContent entry ────────────────────────────
  console.log('\n── Step 3: homepageContent entry');

  const hpEntries = await env.getEntries({ content_type: 'homepageContent', limit: 1 });
  if (!hpEntries.items.length) {
    throw new Error('No homepageContent entry found!');
  }

  let hpEntry = hpEntries.items[0];

  hpEntry.fields.healthBenefitsSectionLabel = { [LOCALE]: 'Health Benefits' };
  hpEntry.fields.healthBenefitsHeading      = {
    [LOCALE]: "Everything your body needs. Nothing it doesn't.",
  };

  hpEntry = await hpEntry.update();
  hpEntry = await hpEntry.publish();
  console.log('  homepageContent entry updated and published.');

  // ── 4. Create healthBenefit entries ───────────────────────────────────────
  console.log('\n── Step 4: healthBenefit entries');

  // Collect existing published entry numbers to allow skipping
  const existingEntries = await env.getEntries({
    content_type: 'healthBenefit',
    limit: 100,
  });
  const existingNumbers = new Set(
    existingEntries.items
      .filter((e) => e.sys.publishedVersion)
      .map((e) => e.fields.number?.[LOCALE])
  );

  if (existingNumbers.size > 0) {
    console.log(`  Found existing published entries: ${[...existingNumbers].join(', ')}`);
  }

  for (const benefit of healthBenefits) {
    if (existingNumbers.has(benefit.number)) {
      console.log(`\n  [SKIP] ${benefit.number} — ${benefit.label} (already published)`);
      continue;
    }

    console.log(`\n  [CREATE] ${benefit.number} — ${benefit.label}`);

    const asset = await uploadImageAsset(env, {
      imageUrl: benefit.imageUrl,
      imageFileName: benefit.imageFileName,
      title: benefit.title,
    });

    let entry = await env.createEntry('healthBenefit', {
      fields: {
        number:      { [LOCALE]: benefit.number },
        label:       { [LOCALE]: benefit.label },
        title:       { [LOCALE]: benefit.title },
        ingredients: { [LOCALE]: benefit.ingredients },
        description: { [LOCALE]: benefit.description },
        image: {
          [LOCALE]: { sys: { type: 'Link', linkType: 'Asset', id: asset.sys.id } },
        },
        order: { [LOCALE]: benefit.order },
      },
    });

    entry = await entry.publish();
    console.log(`    Entry published (id: ${entry.sys.id})`);
  }

  console.log('\n✓ All done. Health Benefits section is now set up in Contentful.');
}

main().catch((err) => {
  console.error('\nFATAL ERROR:', err.message || err);
  process.exit(1);
});

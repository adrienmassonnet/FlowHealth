import contentfulManagement from 'contentful-management';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || 'u04owy9lblh5';
const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const LOCALE = 'en-US';

if (!CMA_TOKEN) {
  console.error('Error: CONTENTFUL_MANAGEMENT_TOKEN env var is required.');
  process.exit(1);
}

const client = contentfulManagement.createClient({ accessToken: CMA_TOKEN });

async function getEnvironment() {
  const space = await client.getSpace(SPACE_ID);
  return space.getEnvironment('master');
}

async function addImageField(env, contentTypeId) {
  const ct = await env.getContentType(contentTypeId);
  if (ct.fields.find((f) => f.id === 'image')) {
    console.log(`  → 'image' field already exists on ${contentTypeId}, skipping`);
    return;
  }
  ct.fields.push({
    id: 'image',
    name: 'Image',
    type: 'Link',
    linkType: 'Asset',
    required: false,
  });
  const updated = await ct.update();
  await updated.publish();
  console.log(`  → Added 'image' Media field to ${contentTypeId}`);
}

function mimeTypeFromUrl(url) {
  const clean = url.split('?')[0].toLowerCase();
  if (clean.endsWith('.png')) return 'image/png';
  if (clean.endsWith('.webp')) return 'image/webp';
  if (clean.endsWith('.gif')) return 'image/gif';
  return 'image/jpeg';
}

function fileNameFromUrl(title, url) {
  const clean = url.split('?')[0];
  const ext = clean.split('.').pop() || 'jpg';
  return `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.${ext}`;
}

async function createAssetFromUrl(env, url, title) {
  const mimeType = mimeTypeFromUrl(url);
  const fileName = fileNameFromUrl(title, url);

  let asset = await env.createAsset({
    fields: {
      title: { [LOCALE]: title },
      file: {
        [LOCALE]: { contentType: mimeType, fileName, upload: url },
      },
    },
  });

  await asset.processForLocale(LOCALE);

  // Poll until Contentful has processed the image (up to 3 minutes)
  for (let i = 0; i < 90; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    asset = await env.getAsset(asset.sys.id);
    if (asset.fields.file?.[LOCALE]?.url) break;
  }

  const published = await env.getAsset(asset.sys.id);
  return published.publish();
}

async function migrateEntries(env, contentTypeId, titleField) {
  console.log(`\nMigrating images for "${contentTypeId}"...`);
  const entries = await env.getEntries({ content_type: contentTypeId, limit: 200 });

  for (const entry of entries.items) {
    const imageUrl = entry.fields.imageUrl?.[LOCALE];
    const title = entry.fields[titleField]?.[LOCALE] || 'Image';

    if (entry.fields.image?.[LOCALE]) {
      console.log(`  → "${title}" already has an asset, skipping`);
      continue;
    }
    if (!imageUrl) {
      console.log(`  → "${title}" has no imageUrl, skipping`);
      continue;
    }

    console.log(`  → Creating asset for "${title}"...`);
    let asset;
    try {
      asset = await createAssetFromUrl(env, imageUrl, title);
    } catch (err) {
      console.log(`    ⚠ Skipped "${title}" (asset processing failed — upload manually in Contentful Media): ${err.message}`);
      continue;
    }

    entry.fields.image = {
      [LOCALE]: { sys: { type: 'Link', linkType: 'Asset', id: asset.sys.id } },
    };
    const updated = await entry.update();
    await updated.publish();
    console.log(`    ✓ Linked and published`);
  }
}

async function omitOldField(env, contentTypeId) {
  const ct = await env.getContentType(contentTypeId);
  const field = ct.fields.find((f) => f.id === 'imageUrl');
  if (!field) return;
  field.omitted = true;
  const updated = await ct.update();
  await updated.publish();
  console.log(`  → imageUrl field hidden on ${contentTypeId}`);
}

async function main() {
  const env = await getEnvironment();
  console.log('Connected to Contentful space.\n');

  const contentTypes = [
    { id: 'homepageFeatureCard', titleField: 'title' },
    { id: 'teamMember', titleField: 'name' },
    { id: 'ingredient', titleField: 'name' },
  ];

  console.log('Step 1: Adding Media fields...');
  for (const { id } of contentTypes) {
    await addImageField(env, id);
  }

  console.log('\nStep 2: Creating assets and linking to entries...');
  for (const { id, titleField } of contentTypes) {
    await migrateEntries(env, id, titleField);
  }

  console.log('\nStep 3: Hiding old imageUrl fields from Contentful UI...');
  for (const { id } of contentTypes) {
    await omitOldField(env, id);
  }

  console.log('\n✓ Image migration complete! You can now manage images via the Media library in Contentful.');
}

main().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});

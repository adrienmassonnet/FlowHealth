/**
 * Uploads the hero lifestyle image to Contentful, links it to the homepageContent
 * entry via a new `heroImage` media field, then publishes everything.
 *
 * Run once:  node scripts/upload-hero-image.mjs
 */
import contentfulManagement from 'contentful-management';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SPACE_ID       = 'u04owy9lblh5';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = 'master';
const IMAGE_PATH     = resolve(__dirname, '../public/hero-lifestyle.png');
const LOCALE         = 'en-US';

const client = contentfulManagement.createClient({ accessToken: MANAGEMENT_TOKEN });

async function main() {
  const space = await client.getSpace(SPACE_ID);
  const env   = await space.getEnvironment(ENVIRONMENT_ID);

  // ── 1. Upload binary ───────────────────────────────────────────────────────
  console.log('Uploading image bytes…');
  const fileData = readFileSync(IMAGE_PATH);
  const upload = await env.createUpload({ file: fileData });
  console.log('Upload ID:', upload.sys.id);

  // ── 2. Create asset entry linked to the upload ─────────────────────────────
  console.log('Creating asset…');
  let asset = await env.createAsset({
    fields: {
      title: { [LOCALE]: 'Hero Lifestyle' },
      file: {
        [LOCALE]: {
          contentType: 'image/png',
          fileName: 'hero-lifestyle.png',
          uploadFrom: { sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id } },
        },
      },
    },
  });

  // ── 3. Process (generates CDN URL) ─────────────────────────────────────────
  console.log('Processing asset…');
  asset = await asset.processForLocale(LOCALE);

  // Poll until processed
  let processed = false;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    asset = await env.getAsset(asset.sys.id);
    if (asset.fields.file?.[LOCALE]?.url) { processed = true; break; }
    console.log('  still processing…');
  }
  if (!processed) throw new Error('Asset processing timed out');

  // ── 4. Publish asset ────────────────────────────────────────────────────────
  console.log('Publishing asset…');
  asset = await asset.publish();
  const assetUrl = `https:${asset.fields.file[LOCALE].url}`;
  console.log('Asset URL:', assetUrl);

  // ── 5. Ensure `heroImage` field exists on the homepageContent type ──────────
  console.log('Checking content type…');
  const ct = await env.getContentType('homepageContent');
  const hasField = ct.fields.some((f) => f.id === 'heroImage');

  if (!hasField) {
    console.log('Adding heroImage field to homepageContent content type…');
    ct.fields.push({
      id: 'heroImage',
      name: 'Hero Image',
      type: 'Link',
      linkType: 'Asset',
      required: false,
      localized: false,
      validations: [],
    });
    const updated = await ct.update();
    await updated.publish();
    console.log('Content type updated and published.');
  } else {
    console.log('heroImage field already exists — skipping.');
  }

  // ── 6. Link the asset to the homepageContent entry ─────────────────────────
  console.log('Fetching homepageContent entry…');
  const entries = await env.getEntries({ content_type: 'homepageContent', limit: 1 });
  if (!entries.items.length) throw new Error('No homepageContent entry found');
  let entry = entries.items[0];

  entry.fields.heroImage = {
    [LOCALE]: { sys: { type: 'Link', linkType: 'Asset', id: asset.sys.id } },
  };

  entry = await entry.update();
  entry = await entry.publish();
  console.log('Entry updated and published.');

  console.log('\n✓ Done. Hero image is live on Contentful.');
  console.log('  CDN URL:', assetUrl);
}

main().catch((err) => { console.error(err); process.exit(1); });

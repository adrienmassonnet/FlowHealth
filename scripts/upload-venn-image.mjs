/**
 * Uploads the venn section background image to Contentful and links it to
 * the homepageContent entry via a new `vennBackgroundImage` field.
 *
 * Run once:  node scripts/upload-venn-image.mjs
 */
import contentfulManagement from 'contentful-management';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SPACE_ID          = 'u04owy9lblh5';
const MANAGEMENT_TOKEN  = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID    = 'master';
const LOCALE            = 'en-US';
const IMAGE_PATH        = resolve(__dirname, '../public/venn-bg.png');

const client = contentfulManagement.createClient({ accessToken: MANAGEMENT_TOKEN });

async function main() {
  const space = await client.getSpace(SPACE_ID);
  const env   = await space.getEnvironment(ENVIRONMENT_ID);

  // ── 1. Upload binary ───────────────────────────────────────────────────────
  console.log('Uploading image bytes…');
  const fileData = readFileSync(IMAGE_PATH);
  const upload = await env.createUpload({ file: fileData });

  // ── 2. Create asset ────────────────────────────────────────────────────────
  console.log('Creating asset…');
  let asset = await env.createAsset({
    fields: {
      title: { [LOCALE]: 'Venn Section Background' },
      file: {
        [LOCALE]: {
          contentType: 'image/png',
          fileName: 'venn-bg.png',
          uploadFrom: { sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id } },
        },
      },
    },
  });

  // ── 3. Process + publish ───────────────────────────────────────────────────
  console.log('Processing asset…');
  asset = await asset.processForLocale(LOCALE);
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    asset = await env.getAsset(asset.sys.id);
    if (asset.fields.file?.[LOCALE]?.url) break;
    console.log('  still processing…');
  }
  asset = await asset.publish();
  console.log('Asset URL:', `https:${asset.fields.file[LOCALE].url}`);

  // ── 4. Add `vennBackgroundImage` field to homepageContent type ─────────────
  console.log('Updating homepageContent content type…');
  const ct = await env.getContentType('homepageContent');
  if (!ct.fields.some((f) => f.id === 'vennBackgroundImage')) {
    ct.fields.push({
      id: 'vennBackgroundImage',
      name: 'Venn Section Background Image',
      type: 'Link',
      linkType: 'Asset',
      required: false,
      localized: false,
      validations: [],
    });
    const updated = await ct.update();
    await updated.publish();
    console.log('Content type updated.');
  } else {
    console.log('Field already exists — skipping.');
  }

  // ── 5. Link asset to the homepageContent entry ─────────────────────────────
  console.log('Updating homepageContent entry…');
  const entries = await env.getEntries({ content_type: 'homepageContent', limit: 1 });
  let entry = entries.items[0];
  entry.fields.vennBackgroundImage = {
    [LOCALE]: { sys: { type: 'Link', linkType: 'Asset', id: asset.sys.id } },
  };
  entry = await entry.update();
  entry = await entry.publish();

  console.log('\n✓ Done.');
}

main().catch((err) => { console.error(err); process.exit(1); });

// Deletes storySlide content type and recreates it with subtext as Text.
// Then deletes all other ritual entries so seed can run clean.
import { createClient } from 'contentful-management';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;
const client = createClient({ accessToken: MANAGEMENT_TOKEN });

const RITUAL_CONTENT_TYPES = ['ritualDay', 'milestone', 'emailTemplate', 'onboardingScreen'];

async function deleteEntries(env: Awaited<ReturnType<Awaited<ReturnType<typeof client.getSpace>>['getEnvironment']>>, ct: string) {
  let skip = 0;
  while (true) {
    const entries = await env.getEntries({ content_type: ct, limit: 100, skip });
    if (!entries.items.length) break;
    for (const entry of entries.items) {
      try { await entry.unpublish(); } catch {}
      await entry.delete();
      process.stdout.write('.');
    }
    skip += entries.items.length;
    if (entries.items.length < 100) break;
  }
}

async function main() {
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment('master');

  // Delete remaining ritual entries
  for (const ct of RITUAL_CONTENT_TYPES) {
    process.stdout.write(`Deleting entries for ${ct}...`);
    await deleteEntries(env, ct);
    console.log(' done');
  }

  // Delete and recreate storySlide content type
  console.log('\nDeleting storySlide content type...');
  try {
    const ct = await env.getContentType('storySlide');
    try { await ct.unpublish(); } catch {}
    await ct.delete();
    console.log('storySlide content type deleted ✓');
  } catch (e: unknown) {
    const err = e as { message?: string };
    console.log('storySlide not found or already deleted:', err?.message);
  }

  console.log('Recreating storySlide with subtext as Text...');
  const newCt = await env.createContentTypeWithId('storySlide', {
    name: 'Story Slide',
    displayField: 'heading',
    fields: [
      { id: 'slideNumber', name: 'Slide Number', type: 'Integer', required: true, validations: [], localized: false, disabled: false, omitted: false },
      { id: 'eyebrow',     name: 'Eyebrow',      type: 'Symbol',  required: false, validations: [], localized: false, disabled: false, omitted: false },
      { id: 'heading',     name: 'Heading',       type: 'Symbol',  required: true,  validations: [], localized: false, disabled: false, omitted: false },
      { id: 'subtext',     name: 'Subtext',       type: 'Text',    required: false, validations: [], localized: false, disabled: false, omitted: false },
      { id: 'backgroundImage', name: 'Background Image', type: 'Link', linkType: 'Asset', required: false, validations: [], localized: false, disabled: false, omitted: false },
      { id: 'durationSeconds', name: 'Duration (seconds)', type: 'Integer', required: false, validations: [{ range: { min: 3, max: 30 } }], localized: false, disabled: false, omitted: false },
    ] as never,
  });
  await newCt.publish();
  console.log('storySlide recreated ✓');

  console.log('\n✅ Ready. Run the seed script now.\n');
}

main().catch(e => { console.error(e?.message ?? e); process.exit(1); });

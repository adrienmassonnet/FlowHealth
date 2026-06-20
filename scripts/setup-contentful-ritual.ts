// Run with: npx tsx scripts/setup-contentful-ritual.ts
// Creates all Contentful content types for the QR Ritual system.
// Safe to re-run — skips content types that already exist.

import { createClient } from 'contentful-management';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN');
  process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });

async function getEnvironment() {
  const space = await client.getSpace(SPACE_ID);
  return space.getEnvironment('master');
}

async function upsertContentType(
  env: Awaited<ReturnType<typeof getEnvironment>>,
  id: string,
  name: string,
  displayField: string,
  fields: object[]
) {
  try {
    const existing = await env.getContentType(id);
    console.log(`  ↳ already exists: ${id}`);
    return existing;
  } catch {
    console.log(`  ↳ creating: ${id}`);
    const ct = await env.createContentTypeWithId(id, {
      name,
      displayField,
      fields: fields as never,
    });
    const published = await ct.publish();
    return published;
  }
}

async function main() {
  console.log('\n🔧 Setting up Contentful content types for Flow QR Ritual...\n');
  const env = await getEnvironment();

  // ── RitualDay ─────────────────────────────────────────────────────────────
  console.log('ritualDay');
  await upsertContentType(env, 'ritualDay', 'Ritual Day', 'heading', [
    { id: 'dayNumber', name: 'Day Number', type: 'Integer', required: true,
      validations: [{ range: { min: 1, max: 100 } }] },
    { id: 'eyebrow', name: 'Eyebrow', type: 'Symbol', required: true },
    { id: 'heading', name: 'Heading', type: 'Symbol', required: true },
    { id: 'bodyText', name: 'Body Text', type: 'Text', required: false },
    { id: 'backgroundImage', name: 'Background Image', type: 'Link', linkType: 'Asset',
      required: false },
    { id: 'storySlides', name: 'Story Slides', type: 'Array', required: false,
      items: { type: 'Link', linkType: 'Entry',
        validations: [{ linkContentType: ['storySlide'] }] } },
    { id: 'isActive', name: 'Is Active', type: 'Boolean', required: false },
  ]);

  // ── StorySlide ────────────────────────────────────────────────────────────
  console.log('storySlide');
  await upsertContentType(env, 'storySlide', 'Story Slide', 'heading', [
    { id: 'slideNumber', name: 'Slide Number', type: 'Integer', required: true },
    { id: 'eyebrow', name: 'Eyebrow', type: 'Symbol', required: false },
    { id: 'heading', name: 'Heading', type: 'Symbol', required: true },
    { id: 'subtext', name: 'Subtext', type: 'Symbol', required: false },
    { id: 'backgroundImage', name: 'Background Image', type: 'Link', linkType: 'Asset',
      required: false },
    { id: 'durationSeconds', name: 'Duration (seconds)', type: 'Integer', required: false,
      validations: [{ range: { min: 3, max: 30 } }] },
  ]);

  // ── Milestone ─────────────────────────────────────────────────────────────
  console.log('milestone');
  await upsertContentType(env, 'milestone', 'Milestone', 'heading', [
    { id: 'triggerAtScan', name: 'Trigger at Scan #', type: 'Integer', required: true },
    { id: 'eyebrow', name: 'Eyebrow', type: 'Symbol', required: false },
    { id: 'heading', name: 'Heading', type: 'Symbol', required: true },
    { id: 'bodyText', name: 'Body Text', type: 'Text', required: false },
    { id: 'ctaLabel', name: 'CTA Label', type: 'Symbol', required: false },
    { id: 'rewardCode', name: 'Reward Code', type: 'Symbol', required: false },
    { id: 'backgroundImage', name: 'Background Image', type: 'Link', linkType: 'Asset',
      required: false },
  ]);

  // ── EmailTemplate ─────────────────────────────────────────────────────────
  console.log('emailTemplate');
  await upsertContentType(env, 'emailTemplate', 'Email Template', 'subject', [
    { id: 'templateKey', name: 'Template Key', type: 'Symbol', required: true,
      validations: [{ in: ['otp', 'gap_nudge', 'milestone_reward', 'welcome'] }] },
    { id: 'subject', name: 'Subject', type: 'Symbol', required: true },
    { id: 'preheader', name: 'Preheader', type: 'Symbol', required: false },
    { id: 'bodyRichText', name: 'Body', type: 'RichText', required: false },
    { id: 'ctaLabel', name: 'CTA Label', type: 'Symbol', required: false },
    { id: 'ctaUrl', name: 'CTA URL', type: 'Symbol', required: false },
  ]);

  // ── OnboardingScreen ──────────────────────────────────────────────────────
  console.log('onboardingScreen');
  await upsertContentType(env, 'onboardingScreen', 'Onboarding Screen', 'heading', [
    { id: 'screenKey', name: 'Screen Key', type: 'Symbol', required: true,
      validations: [{ in: [
        'email_entry', 'success', 'gap_return', 'not_found',
        'device_conflict', 'non_customer'
      ] }] },
    { id: 'heading', name: 'Heading', type: 'Symbol', required: true },
    { id: 'bodyText', name: 'Body Text', type: 'Text', required: false },
    { id: 'ctaLabel', name: 'CTA Label', type: 'Symbol', required: false },
    { id: 'secondaryCtaLabel', name: 'Secondary CTA Label', type: 'Symbol', required: false },
  ]);

  console.log('\n✅ All content types ready.\n');
  console.log('Next steps in Contentful:');
  console.log('  1. Go to Content → Add entry → Ritual Day');
  console.log('     Create entries for days 1–10 with your copy and images');
  console.log('  2. Add entry → Story Slide');
  console.log('     Create 3 slides per day, link them to the Ritual Day entries');
  console.log('  3. Add entry → Milestone');
  console.log('     Create one entry: triggerAtScan=10 with your 10-day reward copy');
  console.log('  4. Add entry → Email Template');
  console.log('     Create entries for keys: otp, gap_nudge, milestone_reward\n');
}

main().catch(err => {
  console.error('Error:', err.message ?? err);
  process.exit(1);
});

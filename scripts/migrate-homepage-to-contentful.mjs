import contentfulManagement from 'contentful-management';

const SPACE_ID = 'u04owy9lblh5';
const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const LOCALE = 'en-US';

const client = contentfulManagement.createClient({ accessToken: CMA_TOKEN });

async function getEnvironment() {
  const space = await client.getSpace(SPACE_ID);
  return space.getEnvironment('master');
}

async function createContentType(env, id, name, fields) {
  console.log(`Creating content type: ${id}`);
  try {
    await env.getContentType(id);
    console.log(`  → already exists, skipping`);
  } catch {
    const ct = await env.createContentTypeWithId(id, { name, fields, displayField: fields[0].id });
    await ct.publish();
    console.log(`  → created and published`);
  }
}

async function createEntry(env, contentTypeId, fields) {
  const entry = await env.createEntry(contentTypeId, { fields });
  await entry.publish();
  return entry;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const homepageContent = {
  heroTagline: 'Win your morning, win your day',
  heroHeading: 'Effortlessly optimal',
  missionHeading: "Flow is on a mission to fight over stimulation. Our supplement promotes homeostasis: the body's ability to find its equilibrium and reaches prime health and performance state.",
  vennHeading: 'Taking care of your health should not be a chore but an enjoyable experience',
  resultsHeading: 'Benefits beyond focus',
  resultsSubheading: 'Beyond its short term felt focus, Flow has been conceived to help build better habits and routine on the medium term as well as support long term cerebral and bodily health.',
  bottomMissionEyebrow: 'On a Mission to Inner Peace',
  bottomMissionHeading: 'At Flow, we are science-based with humans at heart. Our goal is to revitalise people',
};

const featureCards = [
  {
    title: 'Empowered by stable energy',
    body: 'Flow gently restores harmony – delivering steady, calm energy that keeps distractions, fatigue, and overwhelm at bay.',
    imageUrl: 'https://flow-health-2.myshopify.com/cdn/shop/files/ritual.png?v=1765176160&width=1080',
    order: 1,
  },
  {
    title: 'Unlock your full potential',
    body: "Flow's ingredients help you tap into deep focus, effortless creativity, and crystal-clear thinking – so you can perform at your peak every day.",
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    order: 2,
  },
  {
    title: 'Your daily inner peace ritual',
    body: 'Begin each day with purpose and power. Flow sets the stage for a productive, fulfilling day.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80',
    order: 3,
  },
];

const timelineSteps = [
  {
    period: 'Days 1–7',
    title: 'Clarity, From Day One',
    bullets: 'Reduced brain fog within 15–30 min\nSustained focus without the crash\nCalmer response to stress',
    order: 1,
  },
  {
    period: 'Weeks 2–3',
    title: 'Deeper, Sharper Focus',
    bullets: 'Extended concentration windows\nReduced mental fatigue by mid-afternoon\nImproved calm under pressure',
    order: 2,
  },
  {
    period: 'Month 1–2',
    title: 'Memory & Learning',
    bullets: 'Faster information recall\nBetter retention under cognitive load\nImproved pattern recognition',
    order: 3,
  },
  {
    period: 'Month 3+',
    title: 'Long-term Brain Health',
    bullets: 'Neuroprotective compound build-up\nSustained performance baseline\nImproved sleep quality and recovery',
    order: 4,
  },
];

const testimonials = [
  {
    quote: 'Flow changed how I approach my mornings. After three weeks, my focus is sharper and I feel noticeably calmer under pressure. It\'s become non-negotiable for me.',
    authorName: 'Sarah K.',
    authorRole: 'Flow customer',
    order: 1,
  },
];

// ─── Migration ────────────────────────────────────────────────────────────────

async function main() {
  const env = await getEnvironment();
  console.log('Connected to Contentful space.\n');

  await createContentType(env, 'homepageContent', 'Homepage Content', [
    { id: 'heroTagline', name: 'Hero Tagline', type: 'Symbol', required: true },
    { id: 'heroHeading', name: 'Hero Heading', type: 'Symbol', required: true },
    { id: 'missionHeading', name: 'Mission Heading', type: 'Text', required: true },
    { id: 'vennHeading', name: 'Venn Section Heading', type: 'Text', required: true },
    { id: 'resultsHeading', name: 'Results Section Heading', type: 'Symbol', required: true },
    { id: 'resultsSubheading', name: 'Results Section Subheading', type: 'Text', required: true },
    { id: 'bottomMissionEyebrow', name: 'Bottom Mission Eyebrow', type: 'Symbol', required: true },
    { id: 'bottomMissionHeading', name: 'Bottom Mission Heading', type: 'Text', required: true },
  ]);

  await createContentType(env, 'homepageFeatureCard', 'Homepage Feature Card', [
    { id: 'title', name: 'Title', type: 'Symbol', required: true },
    { id: 'body', name: 'Body', type: 'Text', required: true },
    { id: 'imageUrl', name: 'Image URL', type: 'Symbol', required: true },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
  ]);

  await createContentType(env, 'resultsTimelineStep', 'Results Timeline Step', [
    { id: 'period', name: 'Period', type: 'Symbol', required: true },
    { id: 'title', name: 'Title', type: 'Symbol', required: true },
    { id: 'bullets', name: 'Bullets (one per line)', type: 'Text', required: true },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
  ]);

  await createContentType(env, 'testimonial', 'Testimonial', [
    { id: 'quote', name: 'Quote', type: 'Text', required: true },
    { id: 'authorName', name: 'Author Name', type: 'Symbol', required: true },
    { id: 'authorRole', name: 'Author Role', type: 'Symbol', required: true },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
  ]);

  console.log('\nUploading homepage content singleton...');
  await createEntry(env, 'homepageContent', {
    heroTagline: { [LOCALE]: homepageContent.heroTagline },
    heroHeading: { [LOCALE]: homepageContent.heroHeading },
    missionHeading: { [LOCALE]: homepageContent.missionHeading },
    vennHeading: { [LOCALE]: homepageContent.vennHeading },
    resultsHeading: { [LOCALE]: homepageContent.resultsHeading },
    resultsSubheading: { [LOCALE]: homepageContent.resultsSubheading },
    bottomMissionEyebrow: { [LOCALE]: homepageContent.bottomMissionEyebrow },
    bottomMissionHeading: { [LOCALE]: homepageContent.bottomMissionHeading },
  });
  console.log('  → done');

  console.log('Uploading feature cards...');
  for (const card of featureCards) {
    await createEntry(env, 'homepageFeatureCard', {
      title: { [LOCALE]: card.title },
      body: { [LOCALE]: card.body },
      imageUrl: { [LOCALE]: card.imageUrl },
      order: { [LOCALE]: card.order },
    });
  }
  console.log(`  → ${featureCards.length} cards uploaded`);

  console.log('Uploading results timeline steps...');
  for (const step of timelineSteps) {
    await createEntry(env, 'resultsTimelineStep', {
      period: { [LOCALE]: step.period },
      title: { [LOCALE]: step.title },
      bullets: { [LOCALE]: step.bullets },
      order: { [LOCALE]: step.order },
    });
  }
  console.log(`  → ${timelineSteps.length} steps uploaded`);

  console.log('Uploading testimonials...');
  for (const t of testimonials) {
    await createEntry(env, 'testimonial', {
      quote: { [LOCALE]: t.quote },
      authorName: { [LOCALE]: t.authorName },
      authorRole: { [LOCALE]: t.authorRole },
      order: { [LOCALE]: t.order },
    });
  }
  console.log(`  → ${testimonials.length} testimonials uploaded`);

  console.log('\n✓ Homepage migration complete!');
}

main().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});

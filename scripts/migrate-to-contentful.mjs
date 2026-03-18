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
    const existing = await env.getContentType(id);
    console.log(`  → already exists, skipping`);
    return existing;
  } catch {
    const ct = await env.createContentTypeWithId(id, { name, fields, displayField: fields[0].id });
    await ct.publish();
    console.log(`  → created and published`);
    return ct;
  }
}

async function createEntry(env, contentTypeId, fields) {
  const entry = await env.createEntry(contentTypeId, { fields });
  await entry.publish();
  return entry;
}

// ─── Content data ────────────────────────────────────────────────────────────

const principles = [
  { number: '01', title: 'Science before marketing', body: "Every claim we make is backed by peer-reviewed human clinical trials. We never cite animal studies or preclinical data as proof of efficacy. If the evidence isn't strong enough, the ingredient doesn't make the formula." },
  { number: '02', title: 'Dose integrity', body: "Proprietary blends exist to hide underdosing. We disclose every milligram because we dose at clinically effective levels — not at trace amounts that look good on a label. If you're paying for an ingredient, it should actually work." },
  { number: '03', title: 'No stimulant dependency', body: "We built Flow for sustainable clarity — not a spike and crash cycle. You should be able to miss a day without consequences. Cognitive enhancement should compound over time, not create reliance." },
  { number: '04', title: 'Radical transparency', body: "Every source, every form, every dose — disclosed. We will always tell you what's in our product, where it comes from, and why we chose it over alternatives. Hiding things is not something we are interested in." },
  { number: '05', title: 'Swiss precision', body: "We manufacture in Switzerland under GMP conditions that exceed most global standards. Not because it's a marketing point — because where and how a supplement is made directly affects its safety, consistency, and efficacy." },
  { number: '06', title: 'Long-term thinking', body: "Short-term cognitive enhancement is easy. We optimise for 6-month, 12-month, and lifetime cognitive health. That means neuroprotective compounds, not just stimulants. It means doing things the slow, right way." },
];

const beliefs = [
  'The mind is the most important asset you have.',
  'Most people are operating far below their cognitive potential — not from lack of effort, but from poor nutrition, chronic stress, and overstimulation.',
  'High-quality supplementation is not a shortcut. It is infrastructure — the same way sleep, exercise, and diet are infrastructure.',
  'Transparency is not a brand value. It is a minimum standard.',
  'We believe in compounding — small, consistent inputs that build over months and years into something remarkable.',
];

const teamMembers = [
  { name: 'Marc Dubois', role: 'Co-founder & Formulator', bio: 'Former neuroscience researcher at EPFL. Spent a decade studying the relationship between stress, neuroplasticity, and performance before founding Flow.', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85&auto=format&fit=crop&crop=face', order: 1 },
  { name: 'Sophie Wenger', role: 'Co-founder & CEO', bio: 'Background in functional medicine and clinical nutrition. Drove the mission to make evidence-based supplementation accessible without the noise.', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=85&auto=format&fit=crop&crop=face', order: 2 },
  { name: 'Dr. Lena Fischer', role: 'Head of Research', bio: 'Clinical pharmacologist with 15 years of experience reviewing safety and efficacy data. Every ingredient in Flow has passed her desk twice.', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=85&auto=format&fit=crop&crop=face', order: 3 },
];

const companyValues = [
  { title: 'Science First', description: "Every ingredient is selected based on peer-reviewed clinical evidence. We review hundreds of studies so you don't have to.", order: 1 },
  { title: 'Radical Transparency', description: 'No proprietary blends. No hidden fillers. Every dose, every ingredient, every source — disclosed on the label.', order: 2 },
  { title: 'Calm Over Crash', description: "We reject stimulant dependency. Flow is designed for sustainable clarity — energy that lifts, never spikes.", order: 3 },
  { title: 'Long-Term Thinking', description: "Our formula isn't built for a quick buzz. It's built for compound cognitive gains over weeks, months, and years.", order: 4 },
  { title: 'Swiss Precision', description: "Formulated and produced in Switzerland under strict GMP standards. Because where it's made matters as much as what's in it.", order: 5 },
  { title: 'For the Focused Few', description: "We don't make products for everyone. We make them for people who take their mind seriously — and are willing to invest in it.", order: 6 },
];

const milestones = [
  { year: '2022', label: 'Founded in Geneva', description: 'Flow Health was born out of a personal frustration with the supplement market.', order: 1 },
  { year: '2023', label: 'Research phase', description: 'Over 18 months formulating with researchers, doctors, and practitioners across Switzerland.', order: 2 },
  { year: '2024', label: 'Swiss GMP certification', description: 'Production partner certified under ISO 22000 and Swiss GMP — among the strictest in Europe.', order: 3 },
  { year: '2025', label: 'First formula launched', description: 'Flow launched to a waitlist of over 2,000 early adopters. Sold out in week one.', order: 4 },
  { year: '2026', label: 'Expanding internationally', description: 'Now shipping to 12 countries. Reformulations and new products in development.', order: 5 },
];

const ingredients = [
  { name: 'Bacopa Monnieri', form: 'Synapsa® extract', dose: '300mg', category: 'Memory', description: 'One of the most evidence-backed nootropics for long-term memory consolidation. Standardised to 55% bacosides — the active compounds responsible for its effects.', imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80&auto=format&fit=crop', order: 1 },
  { name: 'Ashwagandha', form: 'KSM-66® root extract', dose: '300mg', category: 'Stress', description: 'The most studied adaptogen for cortisol reduction and stress resilience. KSM-66® is the only extract with over 30 clinical trials behind it.', imageUrl: 'https://images.unsplash.com/photo-1596078842550-f9b9bdd7bdc7?w=500&q=80&auto=format&fit=crop', order: 2 },
  { name: "Lion's Mane", form: 'Full-spectrum fruiting body', dose: '500mg', category: 'Neuroplasticity', description: 'Stimulates Nerve Growth Factor (NGF), supporting the growth and maintenance of neurons. Emerging evidence for mild cognitive impairment and long-term brain health.', imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=80&auto=format&fit=crop', order: 3 },
  { name: 'L-Theanine', form: 'Pharmaceutical grade', dose: '200mg', category: 'Focus', description: 'Promotes alpha brainwave activity — the state associated with relaxed alertness. Synergises with caffeine to remove jitteriness without blunting energy.', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80&auto=format&fit=crop', order: 4 },
  { name: 'Rhodiola Rosea', form: '3% rosavins, 1% salidroside', dose: '200mg', category: 'Endurance', description: 'A well-researched adaptogen for mental and physical fatigue resistance. Particularly effective for sustained cognitive performance under stress.', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80&auto=format&fit=crop', order: 5 },
  { name: 'Magnesium Glycinate', form: 'Chelated for bioavailability', dose: '200mg', category: 'Recovery', description: 'The most bioavailable form of magnesium. Supports sleep quality, stress regulation, and synaptic function. Most people are chronically deficient.', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80&auto=format&fit=crop', order: 6 },
];

const faqItems = [
  // product
  { question: 'What is Flow?', answer: 'Flow is a premium liquid nootropic supplement formulated to support sustained mental clarity, focus, and energy without the crash. Each bottle contains a precisely dosed blend of adaptogens, amino acids, functional mushrooms, vitamins, and plant extracts — delivered in a bioavailable liquid format for faster absorption.', category: 'product', order: 1 },
  { question: 'What makes Flow different from other supplements?', answer: 'Most supplements come in capsule or powder form, which can take 45–60 minutes to absorb. Flow uses a liquid delivery system that reaches your bloodstream in as little as 15 minutes. We combine 13 clinically studied actives in one bottle, removing the need to manage multiple pills throughout the day.', category: 'product', order: 2 },
  { question: 'What are the key ingredients?', answer: "Flow contains Ashwagandha KSM-66®, Lion's Mane mushroom, L-Theanine, Alpha-GPC, Rhodiola Rosea, Bacopa Monnieri, Vitamins B6 & B12, and Zinc. Every ingredient is transparently dosed — no proprietary blends, no hidden fillers.", category: 'product', order: 3 },
  { question: 'Is Flow suitable for vegans?', answer: 'Yes. Flow is 100% vegan and free from animal-derived ingredients. It is also gluten-free and contains no artificial colours, sweeteners, or preservatives.', category: 'product', order: 4 },
  { question: 'Are there any allergens?', answer: 'Flow is manufactured in a facility that processes tree nuts and soy. If you have severe allergies, please consult your healthcare provider before use. The formula itself does not contain gluten, dairy, eggs, or shellfish.', category: 'product', order: 5 },
  { question: 'What does Flow taste like?', answer: 'Flow has a clean, lightly botanical taste — mildly sweet with herbal notes from Ashwagandha and Rhodiola. Most people take it straight from the bottle or mixed with a small glass of water.', category: 'product', order: 6 },
  // usage
  { question: 'How should I take Flow?', answer: 'Shake gently, then drink the entire 60 ml bottle. You can take it straight or mix it with water or a cold beverage. For best results, take it on an empty stomach in the morning.', category: 'usage', order: 1 },
  { question: 'When is the best time to take Flow?', answer: "We recommend taking Flow first thing in the morning, approximately 15–30 minutes before you begin work or your most demanding mental tasks. Morning intake aligns with your body's natural cortisol peak, amplifying the formula's effects on alertness and focus.", category: 'usage', order: 2 },
  { question: 'Can I take more than one bottle per day?', answer: 'Flow is designed as a once-daily supplement. We do not recommend exceeding one bottle per day. If you have specific health goals that require a higher intake, please speak with a healthcare professional.', category: 'usage', order: 3 },
  { question: 'How long until I feel the effects?', answer: 'The liquid format means most people notice increased alertness and clarity within 15–30 minutes. Full cognitive benefits from adaptogenic ingredients like Ashwagandha and Bacopa Monnieri build over 4–6 weeks of consistent daily use.', category: 'usage', order: 4 },
  { question: 'Can I take Flow with coffee or other caffeine sources?', answer: 'Yes. Flow does not contain caffeine, so it pairs well with your morning coffee or tea. The L-Theanine in the formula may even help smooth out any jitteriness from caffeine, promoting calm alertness.', category: 'usage', order: 5 },
  { question: 'Is it safe to take Flow alongside other supplements or medications?', answer: 'Flow is generally well-tolerated alongside common supplements. However, if you are taking prescription medication — particularly for blood pressure, anxiety, or mood — we recommend consulting your doctor before adding Flow to your routine.', category: 'usage', order: 6 },
  // shipping
  { question: 'Which countries do you ship to?', answer: 'We currently ship to Switzerland, the European Union, the United Kingdom, and the United States. For a full list of destinations and associated costs, please visit our Shipping Policy page.', category: 'shipping', order: 1 },
  { question: 'How long does delivery take?', answer: 'Swiss orders are typically delivered within 1–3 business days. EU and UK orders take 3–7 business days. US orders take 7–14 business days. All orders placed before 12:00 noon on a business day are dispatched the same day.', category: 'shipping', order: 2 },
  { question: 'How do I track my order?', answer: "Once your order ships, you will receive a confirmation email with a tracking number and a link to the carrier's tracking page. If you haven't received this within 24 hours of ordering, please check your spam folder or contact us.", category: 'shipping', order: 3 },
  { question: 'What if my order arrives damaged or incorrect?', answer: "We're sorry to hear that. Please contact us at hello@flowhealth.com within 48 hours of delivery with your order number and a photo of the issue. We will arrange a replacement or refund promptly.", category: 'shipping', order: 4 },
  // returns
  { question: 'What is your return policy?', answer: 'We offer a 30-day satisfaction guarantee. If you are not satisfied with your order for any reason, you may return unopened products within 30 days of receipt for a full refund. Opened bottles cannot be returned for hygiene reasons, but we review these cases individually.', category: 'returns', order: 1 },
  { question: 'How do I start a return?', answer: 'Email hello@flowhealth.com with your order number and reason for return. Our team will respond within 1 business day with instructions. Return shipping costs are covered by Flow Health for defective or incorrect items.', category: 'returns', order: 2 },
  { question: 'When will I receive my refund?', answer: 'Once we receive and inspect your return, refunds are processed within 3–5 business days. The funds will appear on your original payment method within 5–10 business days depending on your bank.', category: 'returns', order: 3 },
  // safety
  { question: 'Is Flow safe for daily long-term use?', answer: 'Yes. All ingredients in Flow are dosed within safe, well-studied ranges for daily use. The formula is designed as a daily morning supplement, and clinical evidence supports the long-term safety of all actives. We recommend a one-week break every three months as good practice.', category: 'safety', order: 1 },
  { question: 'Are there any known side effects?', answer: 'Flow is well-tolerated by the vast majority of users. In rare cases, some individuals may experience mild digestive sensitivity during the first few days of use. This typically resolves as the body adjusts. If you experience any adverse reactions, discontinue use and consult a healthcare professional.', category: 'safety', order: 2 },
  { question: 'Who should not take Flow?', answer: 'Flow is not recommended for individuals under 18, pregnant or breastfeeding women, or those with known sensitivities to any listed ingredients. If you have a pre-existing medical condition or take prescription medication, please consult your doctor before use.', category: 'safety', order: 3 },
  { question: 'Does Flow contain stimulants or controlled substances?', answer: 'No. Flow contains no caffeine, no stimulants, and no controlled or banned substances. It is safe for competitive athletes and complies with WADA guidelines. All ingredients are naturally sourced and transparently disclosed.', category: 'safety', order: 4 },
];

// ─── Migration ────────────────────────────────────────────────────────────────

async function main() {
  const env = await getEnvironment();
  console.log('Connected to Contentful space.\n');

  // 1. Create content types
  await createContentType(env, 'philosophyPrinciple', 'Philosophy Principle', [
    { id: 'number', name: 'Number', type: 'Symbol', required: true },
    { id: 'title', name: 'Title', type: 'Symbol', required: true },
    { id: 'body', name: 'Body', type: 'Text', required: true },
  ]);

  await createContentType(env, 'philosophyBelief', 'Philosophy Belief', [
    { id: 'text', name: 'Text', type: 'Text', required: true },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
  ]);

  await createContentType(env, 'teamMember', 'Team Member', [
    { id: 'name', name: 'Name', type: 'Symbol', required: true },
    { id: 'role', name: 'Role', type: 'Symbol', required: true },
    { id: 'bio', name: 'Bio', type: 'Text', required: true },
    { id: 'imageUrl', name: 'Image URL', type: 'Symbol', required: true },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
  ]);

  await createContentType(env, 'companyValue', 'Company Value', [
    { id: 'title', name: 'Title', type: 'Symbol', required: true },
    { id: 'description', name: 'Description', type: 'Text', required: true },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
  ]);

  await createContentType(env, 'milestone', 'Milestone', [
    { id: 'year', name: 'Year', type: 'Symbol', required: true },
    { id: 'label', name: 'Label', type: 'Symbol', required: true },
    { id: 'description', name: 'Description', type: 'Text', required: true },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
  ]);

  await createContentType(env, 'ingredient', 'Ingredient', [
    { id: 'name', name: 'Name', type: 'Symbol', required: true },
    { id: 'form', name: 'Form', type: 'Symbol', required: true },
    { id: 'dose', name: 'Dose', type: 'Symbol', required: true },
    { id: 'category', name: 'Category', type: 'Symbol', required: true },
    { id: 'description', name: 'Description', type: 'Text', required: true },
    { id: 'imageUrl', name: 'Image URL', type: 'Symbol', required: false },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
  ]);

  await createContentType(env, 'faqItem', 'FAQ Item', [
    { id: 'question', name: 'Question', type: 'Symbol', required: true },
    { id: 'answer', name: 'Answer', type: 'Text', required: true },
    { id: 'category', name: 'Category', type: 'Symbol', required: true },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
  ]);

  console.log('\nAll content types created.\n');

  // 2. Upload entries
  console.log('Uploading principles...');
  for (const p of principles) {
    await createEntry(env, 'philosophyPrinciple', {
      number: { [LOCALE]: p.number },
      title: { [LOCALE]: p.title },
      body: { [LOCALE]: p.body },
    });
  }
  console.log(`  → ${principles.length} principles uploaded`);

  console.log('Uploading beliefs...');
  for (let i = 0; i < beliefs.length; i++) {
    await createEntry(env, 'philosophyBelief', {
      text: { [LOCALE]: beliefs[i] },
      order: { [LOCALE]: i + 1 },
    });
  }
  console.log(`  → ${beliefs.length} beliefs uploaded`);

  console.log('Uploading team members...');
  for (const m of teamMembers) {
    await createEntry(env, 'teamMember', {
      name: { [LOCALE]: m.name },
      role: { [LOCALE]: m.role },
      bio: { [LOCALE]: m.bio },
      imageUrl: { [LOCALE]: m.imageUrl },
      order: { [LOCALE]: m.order },
    });
  }
  console.log(`  → ${teamMembers.length} team members uploaded`);

  console.log('Uploading company values...');
  for (const v of companyValues) {
    await createEntry(env, 'companyValue', {
      title: { [LOCALE]: v.title },
      description: { [LOCALE]: v.description },
      order: { [LOCALE]: v.order },
    });
  }
  console.log(`  → ${companyValues.length} values uploaded`);

  console.log('Uploading milestones...');
  for (const m of milestones) {
    await createEntry(env, 'milestone', {
      year: { [LOCALE]: m.year },
      label: { [LOCALE]: m.label },
      description: { [LOCALE]: m.description },
      order: { [LOCALE]: m.order },
    });
  }
  console.log(`  → ${milestones.length} milestones uploaded`);

  console.log('Uploading ingredients...');
  for (const ing of ingredients) {
    await createEntry(env, 'ingredient', {
      name: { [LOCALE]: ing.name },
      form: { [LOCALE]: ing.form },
      dose: { [LOCALE]: ing.dose },
      category: { [LOCALE]: ing.category },
      description: { [LOCALE]: ing.description },
      imageUrl: { [LOCALE]: ing.imageUrl },
      order: { [LOCALE]: ing.order },
    });
  }
  console.log(`  → ${ingredients.length} ingredients uploaded`);

  console.log('Uploading FAQ items...');
  for (const f of faqItems) {
    await createEntry(env, 'faqItem', {
      question: { [LOCALE]: f.question },
      answer: { [LOCALE]: f.answer },
      category: { [LOCALE]: f.category },
      order: { [LOCALE]: f.order },
    });
  }
  console.log(`  → ${faqItems.length} FAQ items uploaded`);

  console.log('\n✓ Migration complete! All content is live in Contentful.');
}

main().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});

/**
 * Full Contentful migration — creates new content types and seeds all hardcoded data.
 * Run with: CONTENTFUL_MANAGEMENT_TOKEN=xxx node scripts/migrate-contentful-full.mjs
 *
 * Content types created:
 *   - blogPost         (blog articles with Rich Text body)
 *   - comparisonRow    (Flow vs. others comparison table rows)
 *   - savingsSupplement (supplements replaced by Flow for savings breakdown)
 *   - productHighlight  (key stats on the Our Product page)
 */

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
  console.log(`\nContent type: ${id}`);
  try {
    const existing = await env.getContentType(id);
    console.log(`  → already exists, skipping`);
    return existing;
  } catch {
    const ct = await env.createContentTypeWithId(id, {
      name,
      fields,
      displayField: fields[0].id,
    });
    await ct.publish();
    console.log(`  → created and published`);
    return ct;
  }
}

async function entryExists(env, contentTypeId, fieldId, value) {
  const res = await env.getEntries({
    content_type: contentTypeId,
    [`fields.${fieldId}`]: value,
    limit: 1,
  });
  return res.total > 0;
}

async function createEntry(env, contentTypeId, fields, skipIfField = null, skipIfValue = null) {
  if (skipIfField && skipIfValue !== null) {
    const exists = await entryExists(env, contentTypeId, skipIfField, skipIfValue);
    if (exists) {
      console.log(`    skip (exists): ${skipIfValue}`);
      return null;
    }
  }
  const entry = await env.createEntry(contentTypeId, { fields });
  await entry.publish();
  return entry;
}

// ─── Rich Text helpers ────────────────────────────────────────────────────────

function textNode(value) {
  return { nodeType: 'text', value, marks: [], data: {} };
}

function paragraph(text) {
  return { nodeType: 'paragraph', data: {}, content: [textNode(text)] };
}

function heading2(text) {
  return { nodeType: 'heading-2', data: {}, content: [textNode(text)] };
}

function heading3(text) {
  return { nodeType: 'heading-3', data: {}, content: [textNode(text)] };
}

function unorderedList(items) {
  return {
    nodeType: 'unordered-list',
    data: {},
    content: items.map((item) => ({
      nodeType: 'list-item',
      data: {},
      content: [paragraph(item)],
    })),
  };
}

/**
 * Convert the hardcoded content blocks array to a Contentful Rich Text document.
 * Input: { type: 'h2'|'h3'|'p'|'ul'; text?: string; items?: string[] }[]
 */
function blocksToRichText(blocks) {
  const nodes = blocks.map((block) => {
    if (block.type === 'p') return paragraph(block.text ?? '');
    if (block.type === 'h2') return heading2(block.text ?? '');
    if (block.type === 'h3') return heading3(block.text ?? '');
    if (block.type === 'ul') return unorderedList(block.items ?? []);
    return null;
  }).filter(Boolean);

  return { nodeType: 'document', data: {}, content: nodes };
}

// ─── Blog post data ───────────────────────────────────────────────────────────

const blogPosts = [
  {
    slug: 'nootropics-explained',
    title: 'Nootropics Explained: What They Are and How They Actually Work',
    excerpt: 'The word "nootropic" gets thrown around a lot, but few people understand the mechanisms behind cognitive enhancement. We break down the science — clearly and honestly.',
    category: 'science',
    tags: ['Science', 'Ingredients', 'Focus'],
    coverImageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&q=85&auto=format&fit=crop',
    publishedDate: '2026-03-08',
    readTime: '7 min read',
    featured: true,
    order: 1,
    content: [
      { type: 'p', text: 'The term "nootropic" was coined in 1972 by Romanian psychologist Corneliu Giurgea, who defined it as a substance that enhances cognition without causing harm or dependence. Today, the word covers everything from caffeine to experimental peptides — which is part of why it\'s so confusing.' },
      { type: 'h2', text: 'What makes something a nootropic?' },
      { type: 'p', text: 'Giurgea\'s original criteria were strict: the substance must enhance memory and learning, protect the brain against physical or chemical injury, have few side effects, and be non-toxic. In practice, the modern definition has expanded considerably.' },
      { type: 'p', text: 'Today, a nootropic is generally any compound that supports cognitive function — including focus, memory, mood, or stress resilience — without significant side effects at typical doses. By that definition, dozens of naturally occurring compounds qualify.' },
      { type: 'h2', text: 'The main mechanisms' },
      { type: 'h3', text: 'Neurotransmitter modulation' },
      { type: 'p', text: 'Many nootropics work by influencing neurotransmitter systems. Acetylcholine, the neurotransmitter most associated with memory and learning, can be supported by compounds like Alpha-GPC or Huperzine A. Dopamine pathways — linked to motivation and working memory — respond to L-Tyrosine and Mucuna Pruriens.' },
      { type: 'h3', text: 'Cerebral blood flow' },
      { type: 'p', text: 'Improved blood flow to the brain means more oxygen and glucose — the brain\'s primary fuels. Compounds like Ginkgo Biloba and Vinpocetine have been studied for their vasodilatory effects. Even aerobic exercise works partly through this mechanism.' },
      { type: 'h3', text: 'Neuroprotection and neuroplasticity' },
      { type: 'p', text: 'Some of the most exciting nootropics work over longer timeframes by supporting the growth and protection of neurons. Lion\'s Mane mushroom stimulates Nerve Growth Factor (NGF), a protein essential for the growth and maintenance of neurons. Bacopa Monnieri, meanwhile, appears to enhance synaptic communication and protect against oxidative stress.' },
      { type: 'h2', text: 'What the evidence actually says' },
      { type: 'p', text: 'It\'s important to separate compounds with strong clinical evidence from those with only preclinical (animal or cell) studies. The following have meaningful human trial data:' },
      { type: 'ul', items: ['Bacopa Monnieri — multiple RCTs showing improved memory in both young adults and older populations', 'L-Theanine + Caffeine — one of the most replicated nootropic stacks in cognitive research', 'Ashwagandha KSM-66® — over 30 studies on stress, cortisol, and cognitive performance', 'Lion\'s Mane — emerging human trials showing improvement in mild cognitive impairment', 'Rhodiola Rosea — well-studied for fatigue resistance and stress resilience'] },
      { type: 'h2', text: 'The honest truth about nootropics' },
      { type: 'p', text: 'No nootropic will make you a genius. What quality compounds can do is remove friction — reduce the cognitive tax of stress, support the brain\'s natural repair processes, and help you access the clarity you already have more consistently.' },
      { type: 'p', text: 'The best nootropic stack is still quality sleep, regular exercise, and a nutrient-dense diet. Supplements are exactly that — supplementary. But for people who are already doing the basics, the right compounds can make a meaningful difference.' },
    ],
  },
  {
    slug: 'ashwagandha-stress',
    title: 'Ashwagandha KSM-66®: The Most Clinically Studied Adaptogen',
    excerpt: 'Not all ashwagandha is created equal. We explain why the KSM-66® extract stands apart from generic root powder and what the studies actually show.',
    category: 'ingredients',
    tags: ['Ingredients', 'Stress'],
    coverImageUrl: 'https://images.unsplash.com/photo-1596078842550-f9b9bdd7bdc7?w=1400&q=85&auto=format&fit=crop',
    publishedDate: '2026-03-04',
    readTime: '5 min read',
    featured: false,
    order: 2,
    content: [
      { type: 'p', text: 'Ashwagandha (Withania somnifera) has been used in Ayurvedic medicine for over 3,000 years. But it wasn\'t until the development of standardised, high-potency extracts that the scientific community could study it rigorously — and the results are compelling.' },
      { type: 'h2', text: 'What is KSM-66®?' },
      { type: 'p', text: 'KSM-66® is a proprietary full-spectrum ashwagandha root extract produced by Ixoreal Biomed. Unlike cheap root powder, KSM-66® is standardised to contain ≥5% withanolides — the active compounds responsible for most of ashwagandha\'s benefits. It\'s also the most extensively researched ashwagandha extract in the world, with over 30 clinical trials backing it.' },
      { type: 'h2', text: 'What the research shows' },
      { type: 'h3', text: 'Cortisol reduction' },
      { type: 'p', text: 'A landmark double-blind, randomised controlled trial published in the Indian Journal of Psychological Medicine found that 300mg of KSM-66® twice daily for 60 days significantly reduced serum cortisol levels compared to placebo. Participants also reported meaningfully lower stress and anxiety scores.' },
      { type: 'h3', text: 'Cognitive performance' },
      { type: 'p', text: 'A 2017 RCT in the Journal of Dietary Supplements found that 300mg KSM-66® twice daily significantly improved memory, executive function, and attention in healthy adults over 8 weeks — compared to placebo. The effects were attributed to reduced oxidative stress and improved acetylcholine signalling.' },
      { type: 'h3', text: 'Sleep quality' },
      { type: 'p', text: 'A 2019 study in PLOS ONE found that KSM-66® at 300mg twice daily improved sleep quality, sleep onset, and total sleep time in adults with non-restorative sleep. The mechanism is likely multifactorial — cortisol suppression, GABA modulation, and reduced anxiety all contribute.' },
      { type: 'h2', text: 'Why form matters' },
      { type: 'p', text: 'Generic ashwagandha root powder typically contains 0.5–1% withanolides. KSM-66® contains ≥5% — a 5–10x higher concentration of active compounds. Comparing the two is like comparing a cup of chamomile tea to a pharmaceutical-grade extract. The marketing language may be identical; the effects are not.' },
      { type: 'h2', text: 'Dosing and timing' },
      { type: 'p', text: 'Clinical studies typically use 300–600mg of KSM-66® daily, often split into two doses. Effects on cortisol and stress take 4–8 weeks to fully manifest — it\'s an adaptogen, not a stimulant. Patience is part of the protocol.' },
    ],
  },
  {
    slug: 'lions-mane-brain',
    title: "Lion's Mane and Neuroplasticity: What the Research Says",
    excerpt: "Can a mushroom really grow new brain cells? We review the current evidence on Lion's Mane, NGF stimulation, and long-term cognitive health.",
    category: 'science',
    tags: ['Science', 'Ingredients'],
    coverImageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&q=85&auto=format&fit=crop',
    publishedDate: '2026-02-28',
    readTime: '8 min read',
    featured: false,
    order: 3,
    content: [
      { type: 'p', text: "Lion's Mane (Hericium erinaceus) is a medicinal mushroom that has been used in traditional Chinese and Japanese medicine for centuries. In recent years, it has attracted serious scientific attention for its potential to support cognitive function through a mechanism unlike any other known supplement." },
      { type: 'h2', text: 'The NGF connection' },
      { type: 'p', text: "Nerve Growth Factor (NGF) is a protein essential for the growth, maintenance, and survival of neurons. Without adequate NGF, neurons degrade — a process implicated in age-related cognitive decline and neurodegenerative conditions. Lion's Mane contains two classes of compounds — hericenones and erinacines — that have been shown to stimulate NGF synthesis." },
      { type: 'p', text: "This is significant because NGF itself cannot cross the blood-brain barrier when administered externally. The compounds in Lion's Mane, however, can — making this mushroom one of the only known dietary sources of NGF-stimulating molecules that actually reach the brain." },
      { type: 'h2', text: 'What the human studies show' },
      { type: 'p', text: "The landmark human trial on Lion's Mane was a 2009 double-blind, placebo-controlled study published in Phytotherapy Research. Fifty Japanese adults with mild cognitive impairment were given 3g of Lion's Mane daily for 16 weeks. The treatment group showed significantly improved cognitive function scores compared to placebo — and the benefits declined after supplementation stopped, suggesting active dependence on continued intake." },
      { type: 'p', text: "A 2020 pilot study found that 1.8g daily for 8 weeks in adults with depression and anxiety led to significant reductions in both conditions compared to placebo. This aligns with the hypothesis that NGF upregulation has downstream effects on mood, not just memory." },
      { type: 'h2', text: 'Neuroplasticity: the bigger picture' },
      { type: 'p', text: "Neuroplasticity refers to the brain's ability to reorganise and form new neural connections in response to learning, experience, or injury. NGF is central to this process — it supports the growth of axons (the long projections that connect neurons) and the formation of new synapses." },
      { type: 'p', text: "By supporting NGF production, Lion's Mane may help maintain the brain's adaptability over time — which matters for learning, memory consolidation, and resilience to cognitive aging." },
      { type: 'h2', text: 'Practical considerations' },
      { type: 'p', text: "The active compounds in Lion's Mane are primarily found in the fruiting body (the mushroom itself), not the mycelium (root structure). Many cheaper supplements use mycelium grown on grain — which contains primarily grain starch, not the active hericenones and erinacines. Always look for fruiting body extract standardised to active compound content." },
      { type: 'p', text: "Typical effective doses in clinical studies range from 500mg to 3g of fruiting body extract daily. Effects are cumulative and most noticeable after 4–8 weeks of consistent use." },
    ],
  },
  {
    slug: 'morning-ritual',
    title: 'Building a Morning Ritual That Actually Sticks',
    excerpt: "Productivity gurus make it look easy. Here's a grounded, science-backed approach to building a morning routine that compounds over time — no 4am wake-ups required.",
    category: 'lifestyle',
    tags: ['Lifestyle', 'Focus'],
    coverImageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1400&q=85&auto=format&fit=crop',
    publishedDate: '2026-02-20',
    readTime: '6 min read',
    featured: false,
    order: 4,
    content: [
      { type: 'p', text: 'Morning routines have become a cultural obsession — 5am wakeups, ice baths, journaling, meditation, and a green smoothie before the rest of the world is awake. For most people, this is theatre, not transformation. Here\'s a more honest approach.' },
      { type: 'h2', text: 'Why mornings matter neurologically' },
      { type: 'p', text: 'The first 90 minutes after waking are disproportionately important for cognitive performance. Cortisol peaks naturally in the morning (the cortisol awakening response), creating a window of heightened alertness and motivation. How you use this window sets the neurochemical tone for the rest of the day.' },
      { type: 'p', text: 'Immediately reaching for your phone — and the dopamine spikes of notifications and social media — disrupts this window. It shifts your attention system into reactive mode before you\'ve had the chance to set your own agenda.' },
      { type: 'h2', text: 'The science of habit formation' },
      { type: 'p', text: 'A habit is a behaviour that has been automated through repetition. BJ Fogg\'s Tiny Habits research shows that the most durable habits are those anchored to existing behaviours and kept small enough that willpower is irrelevant. You don\'t need discipline to brush your teeth — the habit is automated.' },
      { type: 'p', text: 'The mistake most people make with morning routines is going from 0 to 10 overnight. Adding five new habits simultaneously requires enormous cognitive load and willpower — both of which are depleted by midday. The routine collapses under its own weight.' },
      { type: 'h2', text: 'A framework that actually works' },
      { type: 'h3', text: '1. Anchor to something you already do' },
      { type: 'p', text: 'You already make coffee, brush your teeth, or take a shower every morning. Use these existing behaviours as anchors. "After I start the coffee, I will drink a glass of water." Small, friction-free, stackable.' },
      { type: 'h3', text: '2. Protect the first 30 minutes' },
      { type: 'p', text: 'No phone, no email, no news. This is the single highest-leverage change most people can make. Replace it with anything — making tea, a short walk, reading a page of a book — and you will notice a measurable difference in your cognitive baseline within a week.' },
      { type: 'h3', text: '3. Light before caffeine' },
      { type: 'p', text: 'Morning light exposure (ideally sunlight, but bright indoor light works) anchors your circadian rhythm, advances your cortisol peak, and sets up better sleep that night. Andrew Huberman\'s lab has published extensively on this. Five minutes outside, or near a window, before your coffee.' },
      { type: 'h3', text: '4. Delay the first decision' },
      { type: 'p', text: 'Decision fatigue is real. The more choices you make, the worse the quality of subsequent decisions. Pre-decide as much of your morning as possible — what you\'ll wear, what you\'ll eat, when you\'ll exercise — the night before. Your morning self will thank you.' },
      { type: 'h2', text: 'The role of supplementation' },
      { type: 'p', text: 'A morning supplement ritual serves two purposes: the physiological effects of the compounds, and the psychological signal that you\'re investing in your day. The act of taking a quality supplement with intention — not just gulping it down — is itself a cue that tells your brain: today matters. That cognitive priming effect is underrated.' },
    ],
  },
  {
    slug: 'caffeine-theanine',
    title: 'Why L-Theanine + Caffeine Is the Most Studied Nootropic Stack',
    excerpt: 'The combination is everywhere — but why does it work? We walk through the pharmacology, optimal ratios, and what sets it apart from coffee alone.',
    category: 'ingredients',
    tags: ['Ingredients', 'Science'],
    coverImageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=85&auto=format&fit=crop',
    publishedDate: '2026-02-14',
    readTime: '5 min read',
    featured: false,
    order: 5,
    content: [
      { type: 'p', text: 'If there\'s one nootropic combination with enough replicated human trial data to be considered established science, it\'s L-Theanine and caffeine. The synergy between these two compounds is well-documented, well-understood, and genuinely useful — which is rare in the supplement world.' },
      { type: 'h2', text: 'What each compound does alone' },
      { type: 'h3', text: 'Caffeine' },
      { type: 'p', text: 'Caffeine works primarily by blocking adenosine receptors — adenosine is the neurotransmitter that makes you feel sleepy as it accumulates throughout the day. By blocking its receptors, caffeine delays the onset of fatigue and increases dopamine and noradrenaline activity, producing alertness and improved reaction time.' },
      { type: 'p', text: 'The downside: caffeine alone also elevates cortisol, increases heart rate, and can produce anxiety and the classic "jittery" feeling. It\'s a blunt instrument.' },
      { type: 'h3', text: 'L-Theanine' },
      { type: 'p', text: 'L-Theanine is an amino acid found almost exclusively in green tea leaves. It crosses the blood-brain barrier and promotes alpha brainwave activity — the mental state associated with relaxed alertness. Think: the feeling of being calmly focused, not drowsy, not wired. It also modulates GABA, serotonin, and dopamine activity.' },
      { type: 'h2', text: 'Why the combination works' },
      { type: 'p', text: 'L-Theanine attenuates the anxiogenic (anxiety-producing) and cardiovascular effects of caffeine while preserving — and in some cases enhancing — its cognitive benefits. The result is focused alertness without the spike, the jitters, or the crash.' },
      { type: 'p', text: 'A 2008 double-blind, randomised, crossover trial published in Nutritional Neuroscience found that the combination improved speed and accuracy on attention tasks, improved sentence verification accuracy, and reduced susceptibility to distracting information compared to either compound alone or placebo.' },
      { type: 'h2', text: 'The optimal ratio' },
      { type: 'p', text: 'Most research has used a 2:1 ratio of L-Theanine to caffeine — typically 200mg theanine to 100mg caffeine. This appears to be the sweet spot for cognitive enhancement with minimal side effects. At higher caffeine doses, the theanine may need to scale accordingly.' },
      { type: 'h2', text: 'Why this matters for how Flow is formulated' },
      { type: 'p', text: 'Flow uses this established 2:1 ratio because the evidence supports it. We\'re not chasing novel combinations or proprietary blends with no clinical backing. When the science is clear, we follow it. When it isn\'t, we err on the side of caution and transparency.' },
    ],
  },
  {
    slug: 'deep-work',
    title: 'Deep Work in 2026: How to Protect Your Focus in a Distracted World',
    excerpt: 'Notifications, open-plan offices, and infinite scroll are engineered to fragment your attention. Here\'s how to fight back — cognitively and environmentally.',
    category: 'focus',
    tags: ['Focus', 'Lifestyle'],
    coverImageUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=1400&q=85&auto=format&fit=crop',
    publishedDate: '2026-02-07',
    readTime: '9 min read',
    featured: false,
    order: 6,
    content: [
      { type: 'p', text: 'In his 2016 book Deep Work, Cal Newport argued that the ability to focus without distraction on cognitively demanding tasks is becoming increasingly rare — and increasingly valuable. Eight years later, that argument has only grown stronger. The attention economy has evolved, and our ability to engage in sustained, effortful thought is under systemic assault.' },
      { type: 'h2', text: 'The neuroscience of distraction' },
      { type: 'p', text: 'Attention is mediated by the prefrontal cortex (PFC) — the most recently evolved region of the brain. The PFC supports working memory, executive function, and the ability to filter irrelevant stimuli. It is also the region most sensitive to stress and most demanding of metabolic resources.' },
      { type: 'p', text: 'Every time you switch tasks — even briefly — your brain incurs what researchers call a "switching cost." The attention residue from the previous task lingers, degrading performance on the new one. A 2009 Stanford study found that heavy multitaskers actually performed worse on measures of attentional control and working memory than light multitaskers — the opposite of what many assume.' },
      { type: 'h2', text: 'The environment is the strategy' },
      { type: 'p', text: 'Willpower is a limited resource. Trying to resist your phone through sheer discipline is a losing strategy. The highest-leverage interventions are environmental — structuring your physical and digital spaces so that the path of least resistance leads to focus, not distraction.' },
      { type: 'ul', items: ['Phone in another room during deep work sessions (not face-down on the desk — the cognitive load of resisting it is measurable)', 'Notification blockers during focus blocks (not just silenced — turned off)', 'Single-tasking as a default: one window, one task', 'Time-blocking your calendar before the week begins', 'A consistent physical work environment that your brain associates with focused work'] },
      { type: 'h2', text: 'The biological prerequisites' },
      { type: 'p', text: 'Deep work requires adequate sleep, low cortisol, and sufficient dopamine and acetylcholine signalling. These aren\'t optional — they are the hardware that cognitive effort runs on. Chronically poor sleep reduces PFC activity measurably. Chronic stress impairs working memory and executive function. There is no productivity hack that compensates for a dysregulated nervous system.' },
      { type: 'h2', text: 'Building a deep work practice' },
      { type: 'h3', text: 'Start small and scheduled' },
      { type: 'p', text: 'Don\'t try to do four hours of uninterrupted deep work on day one. Start with 60-minute blocks, scheduled at the same time each day (preferably in the morning, when PFC function is highest). Consistency matters more than duration.' },
      { type: 'h3', text: 'Create a shutdown ritual' },
      { type: 'p', text: 'Newport recommends a clear end-of-work ritual — reviewing your task list, closing everything down, and saying a specific phrase to signal completion. This is not superstition; it helps close open cognitive loops and allows genuine rest.' },
      { type: 'h3', text: 'Embrace boredom' },
      { type: 'p', text: 'The ability to tolerate boredom is the flip side of the ability to focus. If you reach for your phone every time you\'re waiting — at traffic lights, in queues, between tasks — you are training your brain to expect constant stimulation and making it harder to sit with a difficult problem. Let yourself be bored, sometimes.' },
      { type: 'h2', text: 'The compound effect' },
      { type: 'p', text: 'A daily 90-minute deep work session, executed consistently five days a week, accumulates to over 350 hours of focused, high-quality cognitive work per year. Very few people are doing this. The ones who are have a significant, compounding advantage in any knowledge-based field.' },
    ],
  },
  {
    slug: 'magnesium-sleep',
    title: 'Magnesium Glycinate and Sleep: The Most Underrated Recovery Tool',
    excerpt: 'Most people are deficient. Most supplements use the wrong form. We explain why Magnesium Glycinate is the form that actually crosses into the brain and supports deep rest.',
    category: 'science',
    tags: ['Science', 'Ingredients'],
    coverImageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85&auto=format&fit=crop',
    publishedDate: '2026-01-30',
    readTime: '6 min read',
    featured: false,
    order: 7,
    content: [
      { type: 'p', text: 'Magnesium is involved in over 300 enzymatic reactions in the human body. It is essential for energy production, protein synthesis, muscle function, and nervous system regulation. It is also the most common micronutrient deficiency in the developed world — estimated to affect up to 45% of the population.' },
      { type: 'h2', text: 'Why most people are deficient' },
      { type: 'p', text: 'Soil depletion over the past century has significantly reduced the magnesium content of most crops. Modern food processing strips it further. Alcohol, caffeine, and chronic stress all increase urinary magnesium excretion. And because magnesium deficiency presents subtly — as fatigue, poor sleep, muscle tension, anxiety, and difficulty concentrating — it\'s frequently missed or attributed to other causes.' },
      { type: 'h2', text: 'The sleep connection' },
      { type: 'p', text: 'Magnesium regulates the GABA receptor system — the primary inhibitory neurotransmitter system in the brain. GABA is what allows the nervous system to slow down, reduce neural excitation, and transition into sleep. Without adequate magnesium, this transition is impaired.' },
      { type: 'p', text: 'Magnesium also regulates cortisol. Chronically elevated evening cortisol is one of the most common causes of sleep onset difficulty and non-restorative sleep. Magnesium suppresses the HPA axis activity responsible for cortisol production, creating a calmer neurological environment for sleep.' },
      { type: 'h2', text: 'Why form matters: glycinate vs. oxide' },
      { type: 'p', text: 'Not all magnesium supplements are equivalent. The most common form — magnesium oxide — has notoriously poor bioavailability (~4%). Most of it passes through the gut unabsorbed, which is why it\'s primarily used as a laxative.' },
      { type: 'p', text: 'Magnesium glycinate is a chelated form — magnesium bound to the amino acid glycine. This dramatically improves absorption (estimated at 80%+) and adds a second benefit: glycine itself has been shown in clinical trials to improve sleep quality and reduce daytime sleepiness through its own NMDA receptor modulating effects.' },
      { type: 'h2', text: 'What the research shows' },
      { type: 'ul', items: ['A 2012 RCT in the Journal of Research in Medical Sciences found that magnesium supplementation significantly improved insomnia, sleep efficiency, and early morning awakening', 'A 2019 study found that glycine supplementation before bed improved subjective and objective sleep quality in adults with poor sleep', 'Multiple studies show magnesium\'s cortisol-suppressing effects in chronically stressed populations'] },
      { type: 'h2', text: 'Dosing and timing' },
      { type: 'p', text: 'Effective doses in sleep studies range from 200–400mg of elemental magnesium taken 30–60 minutes before bed. When taking glycinate, note that the supplement will typically be labelled by its total weight — 400mg of magnesium glycinate contains roughly 50mg of elemental magnesium. Read labels carefully.' },
      { type: 'p', text: 'Magnesium is not a sedative — it won\'t knock you out. What it does is create a more favourable neurological environment for natural sleep onset and deeper sleep architecture. Used consistently, the effects compound over weeks.' },
    ],
  },
];

// ─── Comparison rows ──────────────────────────────────────────────────────────

const comparisonRows = [
  { feature: 'Clinically-studied formula with 8 active ingredients at full doses', othersLabel: 'Underdosed or proprietary blends', order: 1 },
  { feature: 'One formula replaces 4–6 separate supplements', othersLabel: 'Multiple products required', order: 2 },
  { feature: 'Ready-to-drink — no pills, no mixing, no measuring', othersLabel: 'Multiple capsules or powders spread across the day', order: 3 },
  { feature: 'Each ingredient backed by peer-reviewed research', othersLabel: 'Rarely cited', order: 4 },
  { feature: 'Swiss-made, third-party tested for purity & safety', othersLabel: 'Rarely disclosed', order: 5 },
];

// ─── Savings supplements ──────────────────────────────────────────────────────

const savingsSupplements = [
  { name: 'Nootropic Stack (Zynamite®, Alpha-GPC)', monthlyPriceCHF: 45, order: 1 },
  { name: 'Adaptogens (Ashwagandha, Rhodiola, Ginseng)', monthlyPriceCHF: 50, order: 2 },
  { name: "Lion's Mane Mushroom Extract", monthlyPriceCHF: 35, order: 3 },
  { name: 'L-Theanine & Caffeine', monthlyPriceCHF: 20, order: 4 },
  { name: 'Bacopa Monnieri', monthlyPriceCHF: 25, order: 5 },
  { name: 'Electrolytes Complex', monthlyPriceCHF: 30, order: 6 },
  { name: 'Magnesium Glycinate', monthlyPriceCHF: 20, order: 7 },
  { name: 'Prebiotics & Probiotics', monthlyPriceCHF: 40, order: 8 },
];

// ─── Product highlights ───────────────────────────────────────────────────────

const productHighlights = [
  { value: '13', unit: 'Active ingredients', description: 'Each chosen for clinical evidence, not marketing appeal.', order: 1 },
  { value: '0', unit: 'Proprietary blends', description: 'Every dose is disclosed. No hidden fillers or trace amounts.', order: 2 },
  { value: '30+', unit: 'Clinical studies', description: 'The evidence base behind our core ingredient stack.', order: 3 },
  { value: 'Swiss', unit: 'GMP certified', description: 'Manufactured to pharmaceutical-grade standards in Switzerland.', order: 4 },
];

// ─── Migration ────────────────────────────────────────────────────────────────

async function main() {
  const env = await getEnvironment();
  console.log('Connected to Contentful space.\n');

  // ── 1. Content types ────────────────────────────────────────────────────────

  await createContentType(env, 'blogPost', 'Blog Post', [
    { id: 'title', name: 'Title', type: 'Symbol', required: true },
    { id: 'slug', name: 'Slug', type: 'Symbol', required: true },
    { id: 'excerpt', name: 'Excerpt', type: 'Text', required: true },
    { id: 'coverImageUrl', name: 'Cover Image URL', type: 'Symbol', required: false },
    { id: 'category', name: 'Category', type: 'Symbol', required: true },
    { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Symbol' }, required: false },
    { id: 'publishedDate', name: 'Published Date', type: 'Symbol', required: true },
    { id: 'readTime', name: 'Read Time', type: 'Symbol', required: true },
    { id: 'featured', name: 'Featured', type: 'Boolean', required: false },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
    { id: 'body', name: 'Body', type: 'RichText', required: true },
  ]);

  await createContentType(env, 'comparisonRow', 'Comparison Row', [
    { id: 'feature', name: 'Feature (Flow)', type: 'Text', required: true },
    { id: 'othersLabel', name: 'Others Label', type: 'Text', required: true },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
  ]);

  await createContentType(env, 'savingsSupplement', 'Savings Supplement', [
    { id: 'name', name: 'Name', type: 'Symbol', required: true },
    { id: 'monthlyPriceCHF', name: 'Monthly Price (CHF)', type: 'Integer', required: true },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
  ]);

  await createContentType(env, 'productHighlight', 'Product Highlight', [
    { id: 'value', name: 'Value', type: 'Symbol', required: true },
    { id: 'unit', name: 'Unit', type: 'Symbol', required: true },
    { id: 'description', name: 'Description', type: 'Text', required: true },
    { id: 'order', name: 'Order', type: 'Integer', required: true },
  ]);

  console.log('\n✓ All content types ensured.\n');

  // ── 2. Blog posts ───────────────────────────────────────────────────────────

  console.log('Seeding blog posts...');
  let blogCount = 0;
  for (const post of blogPosts) {
    const entry = await createEntry(
      env,
      'blogPost',
      {
        title: { [LOCALE]: post.title },
        slug: { [LOCALE]: post.slug },
        excerpt: { [LOCALE]: post.excerpt },
        coverImageUrl: { [LOCALE]: post.coverImageUrl },
        category: { [LOCALE]: post.category },
        tags: { [LOCALE]: post.tags },
        publishedDate: { [LOCALE]: post.publishedDate },
        readTime: { [LOCALE]: post.readTime },
        featured: { [LOCALE]: post.featured },
        order: { [LOCALE]: post.order },
        body: { [LOCALE]: blocksToRichText(post.content) },
      },
      'slug',
      post.slug,
    );
    if (entry) blogCount++;
  }
  console.log(`  → ${blogCount} blog posts created (${blogPosts.length - blogCount} already existed)`);

  // ── 3. Comparison rows ──────────────────────────────────────────────────────

  console.log('Seeding comparison rows...');
  let compCount = 0;
  for (const row of comparisonRows) {
    const entry = await createEntry(
      env,
      'comparisonRow',
      {
        feature: { [LOCALE]: row.feature },
        othersLabel: { [LOCALE]: row.othersLabel },
        order: { [LOCALE]: row.order },
      },
      'order',
      row.order,
    );
    if (entry) compCount++;
  }
  console.log(`  → ${compCount} comparison rows created`);

  // ── 4. Savings supplements ──────────────────────────────────────────────────

  console.log('Seeding savings supplements...');
  let suppCount = 0;
  for (const s of savingsSupplements) {
    const entry = await createEntry(
      env,
      'savingsSupplement',
      {
        name: { [LOCALE]: s.name },
        monthlyPriceCHF: { [LOCALE]: s.monthlyPriceCHF },
        order: { [LOCALE]: s.order },
      },
      'name',
      s.name,
    );
    if (entry) suppCount++;
  }
  console.log(`  → ${suppCount} savings supplements created`);

  // ── 5. Product highlights ───────────────────────────────────────────────────

  console.log('Seeding product highlights...');
  let hlCount = 0;
  for (const h of productHighlights) {
    const entry = await createEntry(
      env,
      'productHighlight',
      {
        value: { [LOCALE]: h.value },
        unit: { [LOCALE]: h.unit },
        description: { [LOCALE]: h.description },
        order: { [LOCALE]: h.order },
      },
      'unit',
      h.unit,
    );
    if (entry) hlCount++;
  }
  console.log(`  → ${hlCount} product highlights created`);

  console.log('\n✓ Migration complete! All content is live in Contentful.');
}

main().catch((err) => {
  console.error('\n✗ Migration failed:', err.message);
  if (err.details) console.error(JSON.stringify(err.details, null, 2));
  process.exit(1);
});

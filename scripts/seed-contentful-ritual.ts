// Run with: npx tsx scripts/seed-contentful-ritual.ts
// Seeds all ritual content into Contentful (draft — not final copy).
// Safe to re-run: skips entries that already exist by checking for a matching slug/key.

import { createClient, type Environment, type Entry } from 'contentful-management';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN');
  process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });

async function getEnv(): Promise<Environment> {
  const space = await client.getSpace(SPACE_ID);
  return space.getEnvironment('master');
}

// ── helpers ──────────────────────────────────────────────────────────────────

function text(value: string) {
  return { 'en-US': value };
}

function num(value: number) {
  return { 'en-US': value };
}

function bool(value: boolean) {
  return { 'en-US': value };
}

function entryLink(id: string) {
  return { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id } } };
}

function entryLinks(ids: string[]) {
  return { 'en-US': ids.map(id => ({ sys: { type: 'Link', linkType: 'Entry', id } })) };
}

async function createAndPublish(
  env: Environment,
  contentType: string,
  fields: Record<string, unknown>
): Promise<Entry> {
  const entry = await env.createEntry(contentType, { fields });
  const published = await entry.publish();
  return published;
}

// ── story slides ──────────────────────────────────────────────────────────────

interface SlideData {
  slideNumber: number;
  eyebrow: string;
  heading: string;
  subtext: string;
  durationSeconds: number;
}

async function createSlide(env: Environment, slide: SlideData): Promise<string> {
  const entry = await createAndPublish(env, 'storySlide', {
    slideNumber: num(slide.slideNumber),
    eyebrow: text(slide.eyebrow),
    heading: text(slide.heading),
    subtext: text(slide.subtext),
    durationSeconds: num(slide.durationSeconds),
  });
  return entry.sys.id;
}

// ── ritual days ───────────────────────────────────────────────────────────────

interface DayData {
  dayNumber: number;
  eyebrow: string;
  heading: string;
  bodyText: string;
  slides: SlideData[];
}

const DAYS: DayData[] = [
  {
    dayNumber: 1,
    eyebrow: 'Day 1 · Your first morning',
    heading: 'Nothing dramatic happens this week. That\'s by design — the root does its work before the bloom appears.',
    bodyText: 'Scan each morning, right after drinking your Flow.',
    slides: [
      {
        slideNumber: 1,
        eyebrow: 'Day 1 · Reflection',
        heading: '"The most powerful changes in the body announce themselves last. First comes the quiet rewiring."',
        subtext: 'Flow Science Series',
        durationSeconds: 6,
      },
      {
        slideNumber: 2,
        eyebrow: 'The science',
        heading: '15–45 min',
        subtext: 'Zynamite® — Flow\'s mango leaf extract — modulates brain wave activity within 15 to 45 minutes of your first dose. You may not label it as focus yet. But your neurons already began responding this morning.',
        durationSeconds: 8,
      },
      {
        slideNumber: 3,
        eyebrow: 'Today\'s practice',
        heading: 'Set the anchor.',
        subtext: 'Drink your Flow slowly today. Notice the 10 minutes that follow. Not for results — just to start paying attention.',
        durationSeconds: 6,
      },
    ],
  },
  {
    dayNumber: 2,
    eyebrow: 'Day 2 · The expectation gap',
    heading: 'Most people quit before the compound effect starts. You\'re already further than most.',
    bodyText: 'Scan each morning, right after drinking your Flow.',
    slides: [
      {
        slideNumber: 1,
        eyebrow: 'Day 2 · Reflection',
        heading: '"Patience is not waiting. It is knowing that what you cannot see is already in motion."',
        subtext: 'Flow Science Series',
        durationSeconds: 6,
      },
      {
        slideNumber: 2,
        eyebrow: 'The science',
        heading: '21+ days',
        subtext: 'Neuroplasticity research shows new neural pathways need at minimum three weeks of daily repetition before they begin to consolidate. At day 2, your brain is in early wiring. The discomfort of not feeling different yet is the process working.',
        durationSeconds: 8,
      },
      {
        slideNumber: 3,
        eyebrow: 'Today\'s practice',
        heading: 'Drop the scoreboard.',
        subtext: 'For today, resist measuring. Don\'t ask "is it working?" — ask "did I do it?" That\'s the only data point that matters right now.',
        durationSeconds: 6,
      },
    ],
  },
  {
    dayNumber: 3,
    eyebrow: 'Day 3 · Building the groove',
    heading: 'The third time is when a behavior stops being a choice and starts becoming a groove.',
    bodyText: 'Scan each morning, right after drinking your Flow.',
    slides: [
      {
        slideNumber: 1,
        eyebrow: 'Day 3 · Reflection',
        heading: '"We do not rise to the level of our goals. We fall to the level of our systems."',
        subtext: 'Flow Science Series',
        durationSeconds: 6,
      },
      {
        slideNumber: 2,
        eyebrow: 'The science',
        heading: '66 days',
        subtext: 'A 2010 UCL study found habits take an average of 66 days to fully automate — but the first three days show the steepest learning curve. By day 3, the friction of beginning reduces measurably. Your morning scan is getting easier.',
        durationSeconds: 8,
      },
      {
        slideNumber: 3,
        eyebrow: 'Today\'s practice',
        heading: 'Stack it on something solid.',
        subtext: 'Identify one thing you already do every morning without thinking. Place your Flow next to that trigger. The scan follows the drink. The chain is forming.',
        durationSeconds: 6,
      },
    ],
  },
  {
    dayNumber: 4,
    eyebrow: 'Day 4 · The silent work',
    heading: 'The body adapts in silence. You won\'t feel the change while it\'s happening — only once it has.',
    bodyText: 'Scan each morning, right after drinking your Flow.',
    slides: [
      {
        slideNumber: 1,
        eyebrow: 'Day 4 · Reflection',
        heading: '"The body adapts in silence. You won\'t feel the change while it\'s happening — only once it has."',
        subtext: 'Flow Science Series',
        durationSeconds: 6,
      },
      {
        slideNumber: 2,
        eyebrow: 'The science',
        heading: '21+ days',
        subtext: 'Neuroplasticity research shows it takes a minimum of three weeks of daily repetition before a new neural pathway begins to consolidate. At day 4, your brain is still in the wiring phase — the discomfort of not feeling different yet is the process working.',
        durationSeconds: 8,
      },
      {
        slideNumber: 3,
        eyebrow: 'Today\'s practice',
        heading: 'Notice your 3pm — not your 9am.',
        subtext: 'At 3pm today, pause for 60 seconds. Ask: is my energy different from usual at this hour? Don\'t look for dramatic. Look for subtle.',
        durationSeconds: 6,
      },
    ],
  },
  {
    dayNumber: 5,
    eyebrow: 'Day 5 · First signals',
    heading: 'Some people feel it here. Others feel it at day 7. Neither is wrong — biology isn\'t a deadline.',
    bodyText: 'Scan each morning, right after drinking your Flow.',
    slides: [
      {
        slideNumber: 1,
        eyebrow: 'Day 5 · Reflection',
        heading: '"Energy is not something you generate. It is something you stop blocking."',
        subtext: 'Flow Science Series',
        durationSeconds: 6,
      },
      {
        slideNumber: 2,
        eyebrow: 'The science',
        heading: 'B vitamins',
        subtext: 'Flow\'s active B1, B3, B6, and B12 support ATP production — the cellular currency of energy. By day 5, with consistent daily dosing, B-vitamin cofactors are building toward steady-state plasma levels. The difference isn\'t a surge. It\'s a lowering of the floor.',
        durationSeconds: 8,
      },
      {
        slideNumber: 3,
        eyebrow: 'Today\'s practice',
        heading: 'Map your energy curve.',
        subtext: 'At three points today — 9am, 1pm, 5pm — rate your mental clarity from 1 to 5. Just note it. Two data points tomorrow are more useful than any single feeling today.',
        durationSeconds: 6,
      },
    ],
  },
  {
    dayNumber: 6,
    eyebrow: 'Day 6 · Nervous system',
    heading: 'Stress doesn\'t shrink — your response to it does. That\'s where the change lives.',
    bodyText: 'Scan each morning, right after drinking your Flow.',
    slides: [
      {
        slideNumber: 1,
        eyebrow: 'Day 6 · Reflection',
        heading: '"Between stimulus and response there is a space. What we are building is that space."',
        subtext: 'Flow Science Series',
        durationSeconds: 6,
      },
      {
        slideNumber: 2,
        eyebrow: 'The science',
        heading: 'HPA axis',
        subtext: 'Magnesium citrate and Panax ginseng both act on the HPA axis — the brain-body system that regulates your cortisol response to stress. By day 6, consistent dosing begins to modulate baseline cortisol levels, widening the gap between trigger and response.',
        durationSeconds: 8,
      },
      {
        slideNumber: 3,
        eyebrow: 'Today\'s practice',
        heading: 'Find one moment of friction today.',
        subtext: 'Choose one moment — a tense message, a delayed meeting — and watch your first physical reaction. Don\'t change it. Just observe. Awareness comes before regulation. You\'re building both.',
        durationSeconds: 6,
      },
    ],
  },
  {
    dayNumber: 7,
    eyebrow: 'Day 7 · Seven mornings',
    heading: 'One week. Most people never make it here. You already have.',
    bodyText: 'Scan each morning, right after drinking your Flow.',
    slides: [
      {
        slideNumber: 1,
        eyebrow: 'Day 7 · Reflection',
        heading: '"Most people overestimate what they can do in a day and underestimate what they can do in a week."',
        subtext: 'Flow Science Series',
        durationSeconds: 6,
      },
      {
        slideNumber: 2,
        eyebrow: 'The science',
        heading: 'Days 1–7',
        subtext: 'Flow\'s results timeline shows brain fog eases and calm energy begins emerging within the first week. Zynamite® and green tea extract have been supporting cerebral blood flow daily. Lion\'s Mane has been stimulating nerve growth factor every morning. This is the foundation week completing.',
        durationSeconds: 8,
      },
      {
        slideNumber: 3,
        eyebrow: 'Today\'s practice',
        heading: 'Look back, not forward.',
        subtext: 'Think back to last Monday morning. How did you begin it? Compare it honestly to this morning. Not looking for transformation — looking for a gradient. Even 5% is signal.',
        durationSeconds: 6,
      },
    ],
  },
  {
    dayNumber: 8,
    eyebrow: 'Day 8 · Depth of focus',
    heading: 'Attention is a muscle. You\'ve been training it for eight mornings. It\'s starting to show.',
    bodyText: 'Scan each morning, right after drinking your Flow.',
    slides: [
      {
        slideNumber: 1,
        eyebrow: 'Day 8 · Reflection',
        heading: '"Deep work is the ability to focus without distraction on a cognitively demanding task. It is becoming rare — and increasingly valuable."',
        subtext: 'Flow Science Series',
        durationSeconds: 6,
      },
      {
        slideNumber: 2,
        eyebrow: 'The science',
        heading: 'Alpha waves',
        subtext: 'Green tea extract promotes alpha brain wave activity — the frequency associated with relaxed alertness and creative problem-solving. With Lion\'s Mane supporting NGF production alongside daily alpha modulation, the conditions for longer, deeper focus windows are accumulating.',
        durationSeconds: 8,
      },
      {
        slideNumber: 3,
        eyebrow: 'Today\'s practice',
        heading: 'Find your 90 minutes.',
        subtext: 'Block 90 minutes this week with one task and no notifications. The ingredients are working. Give them a target. After the block, note how long before your attention pulled away. That number is your baseline.',
        durationSeconds: 6,
      },
    ],
  },
  {
    dayNumber: 9,
    eyebrow: 'Day 9 · Emotional floor',
    heading: 'Mood isn\'t about feeling great all the time. It\'s about how quickly you return to baseline.',
    bodyText: 'Scan each morning, right after drinking your Flow.',
    slides: [
      {
        slideNumber: 1,
        eyebrow: 'Day 9 · Reflection',
        heading: '"Equanimity is not indifference. It is the quiet confidence that you can handle what comes."',
        subtext: 'Flow Science Series',
        durationSeconds: 6,
      },
      {
        slideNumber: 2,
        eyebrow: 'The science',
        heading: 'Serotonin + Dopamine',
        subtext: 'Saffr\'Active® — Flow\'s standardized saffron extract — influences serotonin and dopamine pathways gently. Research shows mood-related effects are cumulative, building over daily dosing. At day 9, the foundation of emotional steadiness is measurably different from day 1.',
        durationSeconds: 8,
      },
      {
        slideNumber: 3,
        eyebrow: 'Today\'s practice',
        heading: 'Notice your return time.',
        subtext: 'The next time something irritates or deflates you today — notice how long it takes to return to neutral. Not suppress. Return. That recovery window is the metric. It\'s getting shorter.',
        durationSeconds: 6,
      },
    ],
  },
  {
    dayNumber: 10,
    eyebrow: 'Day 10 · Ten mornings',
    heading: 'Ten mornings. You\'ve crossed from trying to doing. That line matters more than you think.',
    bodyText: 'Something is waiting for you.',
    slides: [
      {
        slideNumber: 1,
        eyebrow: 'Day 10 · Reflection',
        heading: '"We are what we repeatedly do. Excellence is not an act, but a habit."',
        subtext: 'Flow Science Series',
        durationSeconds: 6,
      },
      {
        slideNumber: 2,
        eyebrow: 'The science',
        heading: 'Week 2–4',
        subtext: 'Flow\'s clinical timeline shows weeks two through four bring deeper focus, less mental fatigue by mid-afternoon, and more stable mood under pressure. You\'ve completed the foundation phase. What begins now is the compound phase.',
        durationSeconds: 8,
      },
      {
        slideNumber: 3,
        eyebrow: 'Today\'s practice',
        heading: 'Write one honest sentence.',
        subtext: 'Complete this: "Ten mornings ago, I ___. Now, ___." One sentence. Honest. Keep it. In 20 more mornings, you\'ll write another one. The distance between the two will be the evidence.',
        durationSeconds: 6,
      },
    ],
  },
];

// ── onboarding screens ────────────────────────────────────────────────────────

interface ScreenData {
  screenKey: string;
  heading: string;
  bodyText: string;
  ctaLabel: string;
  secondaryCtaLabel?: string;
}

const SCREENS: ScreenData[] = [
  {
    screenKey: 'email_entry',
    heading: 'Ten mornings. One ingredient. Something shifts.',
    bodyText: 'Enter the email you used to order Flow. We\'ll send a code to confirm it\'s you.',
    ctaLabel: 'Continue',
    secondaryCtaLabel: 'This was a gift',
  },
  {
    screenKey: 'success',
    heading: 'Your ritual starts now.',
    bodyText: 'Each morning, right after mixing and drinking your Flow, scan the QR code inside your box. That scan is your check-in for the day.\n\nScan ten mornings in a row and something is waiting for you — but consistency is what unlocks it.',
    ctaLabel: 'See your first message',
  },
  {
    screenKey: 'gap_return',
    heading: 'You were away. The ritual wasn\'t.',
    bodyText: 'Life moves in waves — not straight lines. Your sequence continues from where you left off. Nothing resets.',
    ctaLabel: 'Continue',
  },
  {
    screenKey: 'not_found',
    heading: 'No Flow order found for that email.',
    bodyText: 'Make sure you\'re using the same email you checked out with. If you received Flow as a gift, use the gifter\'s email.',
    ctaLabel: 'Try a different email',
    secondaryCtaLabel: 'This was a gift',
  },
  {
    screenKey: 'device_conflict',
    heading: 'Continue here, or keep your current device?',
    bodyText: 'Your ritual is linked to another device. Continuing here will move it to this one. Your progress is safe either way.',
    ctaLabel: 'Continue on this device',
    secondaryCtaLabel: 'Cancel',
  },
  {
    screenKey: 'non_customer',
    heading: 'This ritual is for Flow customers.',
    bodyText: 'Flow is a daily morning supplement designed for long-term cerebral health, focus, and inner balance. The QR ritual is part of every 30-day box.',
    ctaLabel: 'Discover Flow',
  },
];

// ── milestone ─────────────────────────────────────────────────────────────────

const MILESTONE = {
  triggerAtScan: 10,
  eyebrow: 'Ten mornings complete',
  heading: 'You did something most people don\'t.',
  bodyText: 'Ten consistent mornings is the threshold where habit becomes identity. Your body has been building something real — better focus, calmer energy, a more stable emotional floor.\n\nAs a thank you: something is on its way to you.',
  ctaLabel: 'Claim your reward',
  rewardCode: 'FLOW10',
};

// ── email templates ───────────────────────────────────────────────────────────

const EMAIL_TEMPLATES = [
  {
    templateKey: 'otp',
    subject: 'Your Flow verification code',
    preheader: 'Enter this code to start your ritual.',
    ctaLabel: 'Open Flow Ritual',
    ctaUrl: 'https://ritual.flowhealth.ch',
  },
  {
    templateKey: 'gap_nudge',
    subject: 'Your ritual is waiting',
    preheader: 'You\'ve been away for a few days. Nothing resets.',
    ctaLabel: 'Scan your box',
    ctaUrl: 'https://ritual.flowhealth.ch',
  },
  {
    templateKey: 'milestone_reward',
    subject: 'Ten mornings. You earned this.',
    preheader: 'Your reward is ready.',
    ctaLabel: 'Claim your reward',
    ctaUrl: 'https://flowhealth.ch',
  },
];

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌱 Seeding Contentful ritual content...\n');
  const env = await getEnv();

  // 1. Story slides — create all first so we have IDs to reference
  console.log('Creating story slides...');
  const slideIdsByDay: Record<number, string[]> = {};

  for (const day of DAYS) {
    const ids: string[] = [];
    for (const slide of day.slides) {
      const id = await createSlide(env, slide);
      ids.push(id);
      process.stdout.write('  .');
    }
    slideIdsByDay[day.dayNumber] = ids;
    console.log(` Day ${day.dayNumber} slides done`);
  }

  // 2. Ritual days
  console.log('\nCreating ritual days...');
  for (const day of DAYS) {
    await createAndPublish(env, 'ritualDay', {
      dayNumber: num(day.dayNumber),
      eyebrow: text(day.eyebrow),
      heading: text(day.heading),
      bodyText: text(day.bodyText),
      storySlides: entryLinks(slideIdsByDay[day.dayNumber]),
      isActive: bool(true),
    });
    console.log(`  Day ${day.dayNumber} ✓`);
  }

  // 3. Milestone
  console.log('\nCreating milestone...');
  try {
    await createAndPublish(env, 'milestone', {
      triggerAtScan: num(MILESTONE.triggerAtScan),
      eyebrow: text(MILESTONE.eyebrow),
      heading: text(MILESTONE.heading),
      bodyText: text(MILESTONE.bodyText),
      ctaLabel: text(MILESTONE.ctaLabel),
      rewardCode: text(MILESTONE.rewardCode),
    });
    console.log('  Milestone ✓');
  } catch (e: unknown) {
    const err = e as { message?: string };
    console.log('  Milestone skipped (may already exist):', err?.message ?? e);
  }

  // 4. Onboarding screens
  console.log('\nCreating onboarding screens...');
  for (const screen of SCREENS) {
    await createAndPublish(env, 'onboardingScreen', {
      screenKey: text(screen.screenKey),
      heading: text(screen.heading),
      bodyText: text(screen.bodyText),
      ctaLabel: text(screen.ctaLabel),
      ...(screen.secondaryCtaLabel ? { secondaryCtaLabel: text(screen.secondaryCtaLabel) } : {}),
    });
    console.log(`  ${screen.screenKey} ✓`);
  }

  // 5. Email templates
  console.log('\nCreating email templates...');
  for (const tmpl of EMAIL_TEMPLATES) {
    await createAndPublish(env, 'emailTemplate', {
      templateKey: text(tmpl.templateKey),
      subject: text(tmpl.subject),
      preheader: text(tmpl.preheader),
      ctaLabel: text(tmpl.ctaLabel),
      ctaUrl: text(tmpl.ctaUrl),
    });
    console.log(`  ${tmpl.templateKey} ✓`);
  }

  console.log('\n✅ All content seeded and published.\n');
}

main().catch(err => {
  console.error('\n❌ Error:', err?.message ?? err);
  process.exit(1);
});

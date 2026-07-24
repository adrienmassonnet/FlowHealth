/**
 * Type audit: inventory every visible text element on every route, classify
 * its semantic role, and compare the size it ACTUALLY renders at against the
 * size the design system says that role SHOULD be at this viewport.
 */
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const exe = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const OUT = '/private/tmp/claude-501/-Users-adrienmassonnet-flow/f2821889-4bc0-4131-87df-46c68452d47a/scratchpad/shots';
const BASE = process.env.BASE || 'http://localhost:3000';
const WIDTH = Number(process.env.WIDTH || 375);

// What each role must measure at this viewport (from globals.css tokens).
const EXPECT_375 = {
  display: 32, h1: 28, h2: 27, h3: 21, h4: 18, h5: 15,
  body: 16, caption: 14, fine: 12, label: 12,
};
const EXPECT_1440 = {
  display: 88, h1: 44, h2: 47, h3: 26, h4: 21, h5: 17,
  body: 18, caption: 15, fine: 13, label: 12,
};
const EXPECT = WIDTH <= 600 ? EXPECT_375 : EXPECT_1440;
const TOL = 1.5; // px

const ROUTES = [
  '/', '/products/rooibos-hibiscus-pomegranate',
  '/pages/our-product', '/pages/our-philosophy', '/pages/who-we-are',
  '/pages/faq', '/pages/reviews', '/pages/the-day-arc', '/pages/science',
  '/pages/research', '/pages/blog-posts', '/pages/contact',
  '/pages/shipping-policy', '/pages/legal-notice',
  '/pages/privacy-policy', '/pages/terms-and-conditions',
];

const COLLECT = () => {
  const rows = [];
  const seen = new Set();
  const els = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,blockquote,button,a,span,div');

  for (const el of els) {
    // Only elements that directly own visible text.
    const own = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(' ')
      .trim();
    if (!own || own.length < 2) continue;

    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;

    const tag = el.tagName.toLowerCase();
    const cls = (typeof el.className === 'string' ? el.className : '').trim();
    const size = Math.round(parseFloat(cs.fontSize) * 10) / 10;
    const key = `${tag}|${cls}|${size}|${own.slice(0, 24)}`;
    if (seen.has(key)) continue;
    seen.add(key);

    // ── Classify role ────────────────────────────────────────────────────
    let role = null;
    const flow = cls.match(/\bflow-(display|h1|h2|h3|h4|h5|body|caption|fine|label)\b/);
    if (flow) {
      role = flow[1];
    } else if (/^h[1-4]$/.test(tag)) {
      role = tag; // h1..h4
    } else {
      const upper = cs.textTransform === 'uppercase';
      const tracked = parseFloat(cs.letterSpacing) > 0.8;
      if (upper && tracked) role = 'label';
      else if (tag === 'p' || tag === 'li' || tag === 'blockquote') {
        role = size <= 13.4 ? 'fine' : size <= 15.4 ? 'caption' : 'body';
      }
      // buttons / spans / divs / links: not part of the prose scale — skip
    }
    if (!role) continue;

    rows.push({
      tag, role, cls: cls.slice(0, 74), size,
      weight: cs.fontWeight,
      text: own.replace(/\s+/g, ' ').slice(0, 52),
      usesToken: !!flow,
    });
  }
  return rows;
};

const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
const ctx = await browser.newContext({
  viewport: { width: WIDTH, height: 900 },
  deviceScaleFactor: 1,
  isMobile: WIDTH <= 600,
  hasTouch: WIDTH <= 600,
});

const all = [];
for (const route of ROUTES) {
  const page = await ctx.newPage();
  let ok = true;
  try {
    const resp = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForLoadState('networkidle', { timeout: 25_000 }).catch(() => {});
    await page.waitForTimeout(700);
    // Next.js dev error overlay means the route did not really render
    const broken = await page.locator('text=Runtime Error').count().catch(() => 0);
    if (broken) { ok = false; console.log(`SKIP  ${route}  (runtime error overlay)`); }
    else {
      const rows = await page.evaluate(COLLECT);
      rows.forEach((r) => all.push({ ...r, route }));
      console.log(`ok    ${route}  (${rows.length} text elements, HTTP ${resp?.status()})`);
    }
  } catch (e) {
    ok = false;
    console.log(`FAIL  ${route}  ${String(e).slice(0, 70)}`);
  }
  await page.close();
}

// ── Divergence analysis ────────────────────────────────────────────────────
const norm = (role) => ({ h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4' }[role] || role);
for (const r of all) {
  const expect = EXPECT[norm(r.role)];
  r.expected = expect ?? null;
  r.delta = expect == null ? null : Math.round((r.size - expect) * 10) / 10;
  r.diverges = expect != null && Math.abs(r.size - expect) > TOL;
}

const diverging = all.filter((r) => r.diverges);
writeFileSync(`${OUT}/audit-${WIDTH}.json`, JSON.stringify(all, null, 2));

console.log(`\n${'='.repeat(96)}`);
console.log(`TYPE AUDIT @ ${WIDTH}px — ${all.length} classified text elements, ${diverging.length} diverging (tolerance ${TOL}px)`);
console.log('='.repeat(96));

// Summary by role
console.log('\nBY ROLE:');
console.log('role      expect   n   onScale  diverging   actual sizes seen');
for (const role of ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'body', 'caption', 'fine', 'label']) {
  const rows = all.filter((r) => norm(r.role) === role);
  if (!rows.length) continue;
  const bad = rows.filter((r) => r.diverges);
  const sizes = [...new Set(rows.map((r) => r.size))].sort((a, b) => a - b);
  console.log(
    `${role.padEnd(9)} ${String(EXPECT[role] ?? '—').padStart(4)}px ${String(rows.length).padStart(4)} ${String(rows.length - bad.length).padStart(8)} ${String(bad.length).padStart(10)}   ${sizes.join(', ')}`
  );
}

// Grouped divergences — the actionable list
console.log('\nDIVERGENCES (grouped by className):');
const groups = new Map();
for (const r of diverging) {
  const k = `${norm(r.role)}|${r.cls}|${r.size}`;
  if (!groups.has(k)) groups.set(k, { ...r, count: 0, routes: new Set(), samples: [] });
  const g = groups.get(k);
  g.count++;
  g.routes.add(r.route);
  if (g.samples.length < 2) g.samples.push(r.text);
}
const sorted = [...groups.values()].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta) || b.count - a.count);
for (const g of sorted) {
  const sign = g.delta > 0 ? `+${g.delta}` : `${g.delta}`;
  console.log(`\n  <${g.tag}> role=${norm(g.role)}  is ${g.size}px, should be ${g.expected}px  (${sign}px)  ×${g.count} on ${g.routes.size} route(s)`);
  console.log(`     class : ${g.cls || '(none)'}`);
  console.log(`     e.g.  : "${g.samples[0]}"`);
  console.log(`     routes: ${[...g.routes].slice(0, 4).join(', ')}`);
}

await browser.close();

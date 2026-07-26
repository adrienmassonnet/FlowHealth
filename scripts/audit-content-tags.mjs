/**
 * Lists every contentTag entry and flags ones with zero references from
 * productHero or healthBenefit entries (the only two content types currently
 * wired into the tag-driven PDP content system). An "orphaned" tag exists in
 * Contentful but isn't linked from anything, so it has no visible effect.
 *
 * This script is read-only — it never deletes or modifies anything. Flagged
 * tags should be reviewed with a human before any deletion. See CLAUDE.md's
 * "Tag governance" section for the review process.
 *
 * Usage:
 *   CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx node scripts/audit-content-tags.mjs
 */

const SPACE_ID = 'u04owy9lblh5';
const ENV = 'master';
const TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const BASE = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENV}`;

if (!TOKEN) {
  console.error('Set CONTENTFUL_MANAGEMENT_TOKEN before running.');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

async function get(path) {
  const r = await fetch(`${BASE}${path}`, { headers });
  if (!r.ok) throw new Error(`GET ${path} -> ${r.status}: ${await r.text()}`);
  return r.json();
}

// Content types that currently reference contentTag via a `tags` field.
// Add to this list if a new content type is wired into the tag system.
const TAG_AWARE_CONTENT_TYPES = ['productHero', 'healthBenefit'];

async function getAllEntries(contentType) {
  const items = [];
  let skip = 0;
  while (true) {
    const res = await get(`/entries?content_type=${contentType}&limit=100&skip=${skip}`);
    items.push(...res.items);
    if (items.length >= res.total) break;
    skip += 100;
  }
  return items;
}

async function main() {
  console.log('Fetching contentTag entries...');
  const tags = await getAllEntries('contentTag');

  const referencedTagIds = new Set();
  for (const contentType of TAG_AWARE_CONTENT_TYPES) {
    console.log(`Fetching ${contentType} entries...`);
    const entries = await getAllEntries(contentType);
    for (const entry of entries) {
      const links = entry.fields.tags?.['en-US'] ?? [];
      for (const link of links) {
        if (link?.sys?.id) referencedTagIds.add(link.sys.id);
      }
    }
  }

  console.log(`\n${tags.length} contentTag entries total, referenced by ${TAG_AWARE_CONTENT_TYPES.join(', ')}:\n`);

  const orphaned = [];
  for (const tag of tags) {
    const f = tag.fields;
    const label = f.label?.['en-US'] ?? '(no label)';
    const slug = f.slug?.['en-US'] ?? '(no slug)';
    const dimension = f.dimension?.['en-US'] ?? '(no dimension)';
    const status = f.status?.['en-US'] ?? '(no status)';
    const isReferenced = referencedTagIds.has(tag.sys.id);
    console.log(`${isReferenced ? '  ' : 'ORPHAN'}  ${slug.padEnd(28)} ${dimension.padEnd(10)} ${status.padEnd(8)} ${label} (${tag.sys.id})`);
    if (!isReferenced) orphaned.push({ id: tag.sys.id, slug, label });
  }

  console.log(`\n${orphaned.length} orphaned tag(s) — zero references from ${TAG_AWARE_CONTENT_TYPES.join('/')}:`);
  for (const o of orphaned) {
    console.log(`  - ${o.slug} (${o.label}) — ${o.id}`);
  }
  if (orphaned.length === 0) {
    console.log('  (none)');
  }

  console.log('\nThis script does not delete anything. Review the orphaned list above with Adrien before removing any tag.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

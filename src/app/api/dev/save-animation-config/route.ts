import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { sectionAnimationConfig, type AnimationProperty } from '@/lib/section-animation-config';

const CONFIG_PATH = path.join(process.cwd(), 'src/lib/section-animation-config.ts');
const START_MARKER = '// ─── GENERATED:START — do not hand-edit between markers, the /dev/animations\n// tool\'s save action regenerates this block. Edit properties via the tool, or\n// edit the whole file by hand and remove the markers if you no longer want it\n// to be tool-managed.\nexport const sectionAnimationConfig: SectionAnimationConfig[] = ';
const END_MARKER = '// ─── GENERATED:END';

function serializeValue(v: AnimationProperty['value']): string {
  if (Array.isArray(v)) return `[${v.join(', ')}]`;
  return String(v);
}

function serializeConfig(config: typeof sectionAnimationConfig): string {
  const sections = config.map((s) => {
    const props = s.properties.map((p) => {
      const parts = [
        `id: '${p.id}'`,
        `label: '${p.label.replace(/'/g, "\\'")}'`,
        `kind: '${p.kind}'`,
        `value: ${serializeValue(p.value)}`,
      ];
      if (p.min !== undefined) parts.push(`min: ${p.min}`);
      if (p.max !== undefined) parts.push(`max: ${p.max}`);
      if (p.step !== undefined) parts.push(`step: ${p.step}`);
      return `      { ${parts.join(', ')} },`;
    }).join('\n');
    return `  {\n    id: '${s.id}',\n    page: '${s.page}',\n    label: '${s.label.replace(/'/g, "\\'")}',\n    properties: [\n${props}\n    ],\n  },`;
  }).join('\n');
  return `[\n${sections}\n]`;
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development.' }, { status: 403 });
  }

  try {
    const { overrides } = await req.json() as { overrides: Record<string, Record<string, AnimationProperty['value']>> };

    // Merge overrides into the current config to produce the new persisted defaults.
    const merged = sectionAnimationConfig.map((section) => ({
      ...section,
      properties: section.properties.map((prop) => {
        const override = overrides[section.id]?.[prop.id];
        return override !== undefined ? { ...prop, value: override } : prop;
      }),
    }));

    const fileContent = await fs.readFile(CONFIG_PATH, 'utf8');
    const startIdx = fileContent.indexOf(START_MARKER);
    const endIdx = fileContent.indexOf(END_MARKER);
    if (startIdx === -1 || endIdx === -1) {
      return NextResponse.json({ error: 'Generated markers not found in section-animation-config.ts — was it hand-edited?' }, { status: 500 });
    }

    const before = fileContent.slice(0, startIdx);
    const after = fileContent.slice(endIdx);
    const newContent = `${before}${START_MARKER}${serializeConfig(merged)};\n${after}`;

    await fs.writeFile(CONFIG_PATH, newContent, 'utf8');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[save-animation-config]', err);
    return NextResponse.json({ error: 'Failed to save.' }, { status: 500 });
  }
}

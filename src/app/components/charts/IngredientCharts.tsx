'use client';

/**
 * Small explanatory chart kit for the homepage ingredient section.
 *
 * Design method: `dataviz` skill. Palette is validated emphasis — a single
 * accent (brand) against a de-emphasis grey, never a cycled categorical set
 * (`node scripts/validate_palette.js "#3B38B8" --mode light` → all checks pass).
 * The site is light-only by design, so there is no dark variant.
 *
 * Forms, one per data job:
 *   Bars      — compare magnitude across a few domains        (Zynamite cognition)
 *   Line      — a value decaying over time                    (Zynamite absorption)
 *   Dumbbell  — treatment vs control endpoint, per measure    (Saffr'Active)
 *   Slope     — a two-timepoint change, treatment vs control  (TMG homocysteine)
 *   DotPlot   — one result emphasised, context rows greyed    (Lion's Mane)
 *
 * Few data points per chart, so every mark is directly labelled rather than
 * hidden behind a hover layer; <title> gives a native tooltip for a11y.
 */

import type { ReactNode } from 'react';

const BRAND = '#3B38B8';
const ink = (a: number) => `rgba(30,24,84,${a})`;

const AXIS = ink(0.1);
const GRID = ink(0.07);
const MUTED_MARK = ink(0.26);
const LABEL = ink(0.55);
const VALUE = ink(0.78);
const VALUE_MUTED = ink(0.45);

// SVG type scale (viewBox units ≈ px at the chart's rendered width).
const FS_VALUE = 11;
const FS_LABEL = 10;
const FS_TICK = 9;
const FS_TAG = 8;

// ---------------------------------------------------------------- shared frame

export interface LegendItem {
  label: string;
  kind: 'brand' | 'muted';
}

export interface ChartMeta {
  /** Bold one-line takeaway — the result in plain words. Optional. */
  headline?: string;
  /** One or two plain sentences: what was studied, population, caveats. Optional. */
  description?: string;
  /** Study citation, shown small at the foot. */
  source: string;
  legend?: LegendItem[];
}

function Swatch({ kind }: { kind: LegendItem['kind'] }) {
  return (
    <span
      className="inline-block w-3.5 h-3 rounded-sm shrink-0"
      style={{ background: kind === 'brand' ? BRAND : MUTED_MARK }}
    />
  );
}

export function ChartCard({ meta, children }: { meta: ChartMeta; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-ink/[0.10] bg-[#F8F8FC] p-4 w-full">
      {meta.headline && (
        <p className="text-sm font-semibold leading-snug" style={{ color: ink(0.92) }}>
          {meta.headline}
        </p>
      )}
      {meta.description && (
        <p className="text-[13px] leading-normal" style={{ color: ink(0.72) }}>
          {meta.description}
        </p>
      )}
      {meta.legend && meta.legend.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {meta.legend.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5">
              <Swatch kind={l.kind} />
              <span
                className="text-[11px] font-semibold"
                style={{ color: l.kind === 'brand' ? ink(0.75) : ink(0.5) }}
              >
                {l.label}
              </span>
            </span>
          ))}
        </div>
      )}
      <div className="w-full">{children}</div>
      <p className="pt-2 border-t border-ink/[0.12]" style={{ fontSize: '10px', color: ink(0.42) }}>
        {meta.source}
      </p>
    </div>
  );
}

function fmtPct(v: number) {
  return `${v > 0 ? '+' : ''}${v}%`;
}

function twoLine(label: string): [string, string | null] {
  const words = label.split(' ');
  if (words.length < 2) return [label, null];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

// ---------------------------------------------------------------- Bars

export interface BarRow {
  label: string;
  value: number;
  /** Optional comparator drawn as a recessive grey bar. */
  comparator?: number;
  /** Override the single-series accent for this row (e.g. grey for a control bar). */
  kind?: 'brand' | 'muted';
  unit?: '%';
}

/**
 * Magnitude across a few domains, or a two-bar comparison.
 * `format: 'delta'` → signed change ("+9.7%"); `'plain'` → bare value ("93%").
 */
export function Bars({ rows, format = 'delta', note, unit = '%' }: { rows: BarRow[]; format?: 'delta' | 'plain'; note?: string; unit?: string }) {
  const fmt = (v: number) => (format === 'plain' ? `${v}${unit}` : fmtPct(v));
  const W = 300;
  const H = 200;
  const padL = 6;
  const padR = 6;
  const padT = note ? 32 : 20;
  const padB = 48;
  const cw = W - padL - padR;
  const ch = H - padT - padB;
  const n = rows.length;
  const group = cw / n;

  const vals = rows.flatMap((r) => [r.value, r.comparator ?? 0]);
  const rawMax = Math.max(0, ...vals);
  const rawMin = Math.min(0, ...vals);
  const pad = ((rawMax - rawMin) || 1) * 0.2;
  const maxV = rawMax + pad || 1;
  const minV = rawMin - pad * 0.6;
  const range = maxV - minV || 1;
  const y = (v: number) => padT + ch * ((maxV - v) / range);
  const zero = y(0);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="overflow-visible" style={{ maxHeight: 224 }}>
      {note && (
        <text x={padL} y={13} fontSize={11.5} fontWeight="600" fill={LABEL}>
          {note}
        </text>
      )}
      <line x1={padL} y1={zero} x2={W - padR} y2={zero} stroke={AXIS} strokeWidth="1" />
      {rows.map((r, i) => {
        const cx = padL + i * group + group / 2;
        const barW = Math.min(group * 0.42, 34);
        const hasComp = r.comparator !== undefined && r.comparator !== 0;
        const top = r.value >= 0 ? y(r.value) : zero;
        const h = Math.abs(y(r.value) - zero);
        const [l1, l2] = twoLine(r.label);
        const barFill = r.kind === 'muted' ? MUTED_MARK : BRAND;
        return (
          <g key={r.label}>
            {hasComp && (
              <>
                <rect
                  x={cx - barW / 2}
                  y={r.comparator! >= 0 ? y(r.comparator!) : zero}
                  width={barW}
                  height={Math.max(Math.abs(y(r.comparator!) - zero), 1)}
                  rx="3"
                  fill={MUTED_MARK}
                  opacity={0.5}
                />
                <text x={cx} y={y(r.comparator!) + (r.comparator! >= 0 ? -5 : 14)} textAnchor="middle" fontSize={FS_TAG} fill={VALUE_MUTED}>
                  {fmt(r.comparator!)}
                </text>
              </>
            )}
            <rect x={cx - barW / 2} y={top} width={barW} height={Math.max(h, 1)} rx="3" fill={barFill}>
              <title>{`${r.label}: ${fmt(r.value)}`}</title>
            </rect>
            <text x={cx} y={r.value >= 0 ? top - 6 : top + h + 14} textAnchor="middle" fontSize={FS_VALUE} fontWeight="700" fill={r.kind === 'muted' ? VALUE_MUTED : VALUE}>
              {fmt(r.value)}
            </text>
            <text x={cx} y={H - (l2 ? 18 : 6)} textAnchor="middle" fontSize={FS_LABEL} fill={LABEL}>
              <tspan x={cx}>{l1}</tspan>
              {l2 && <tspan x={cx} dy="11">{l2}</tspan>}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------- Line

export interface LineSeries {
  label: string;
  kind: 'brand' | 'muted';
  points: number[];
  /** Show the value at each point (brand series only, by default). */
  labelPoints?: boolean;
}

/** A value changing across ordered x categories (e.g. hours after a dose). */
export function Line({ xLabels, series, unit }: { xLabels: string[]; series: LineSeries[]; unit: string }) {
  const W = 300;
  const H = 192;
  const padL = 34;
  const padR = 14;
  const padT = 22;
  const padB = 30;
  const cw = W - padL - padR;
  const ch = H - padT - padB;

  const all = series.flatMap((s) => s.points);
  const maxV = Math.max(...all) * 1.16;
  const minV = Math.min(0, ...all);
  const range = maxV - minV || 1;
  const x = (i: number) => padL + (cw * i) / (xLabels.length - 1);
  const y = (v: number) => padT + ch * ((maxV - v) / range);

  const ticks = 3;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="overflow-visible" style={{ maxHeight: 220 }}>
      {Array.from({ length: ticks + 1 }, (_, t) => {
        const v = minV + (range * t) / ticks;
        return (
          <g key={t}>
            <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke={GRID} strokeWidth="1" />
            <text x={padL - 6} y={y(v) + 3.5} textAnchor="end" fontSize={FS_TICK} fill={VALUE_MUTED}>
              {v.toFixed(v % 1 === 0 ? 0 : 1)}
            </text>
          </g>
        );
      })}
      {xLabels.map((lab, i) => (
        <text key={lab} x={x(i)} y={H - 9} textAnchor="middle" fontSize={FS_LABEL} fill={LABEL}>
          {lab}
        </text>
      ))}
      {[...series].reverse().map((s) => {
        const stroke = s.kind === 'brand' ? BRAND : MUTED_MARK;
        const d = s.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p)}`).join(' ');
        return (
          <g key={s.label}>
            <path d={d} fill="none" stroke={stroke} strokeWidth={s.kind === 'brand' ? 2.5 : 1.75} strokeLinecap="round" strokeLinejoin="round" />
            {s.points.map((p, i) => (
              <circle key={i} cx={x(i)} cy={y(p)} r={s.kind === 'brand' ? 3.5 : 3} fill={stroke}>
                <title>{`${s.label} · ${xLabels[i]}: ${p}${unit}`}</title>
              </circle>
            ))}
            {(s.labelPoints ?? s.kind === 'brand') &&
              s.points.map((p, i) => (
                <text key={i} x={x(i)} y={y(p) - 9} textAnchor="middle" fontSize={FS_VALUE} fontWeight="700" fill={VALUE}>
                  {p}
                  {unit}
                </text>
              ))}
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------- Dumbbell

export interface DumbbellRow {
  label: string;
  control: number;
  treatment: number;
  unit?: '%';
  /** e.g. "trend" or "ns" — rendered as a small tag under the label. */
  tag?: string;
}

/** Treatment vs control endpoint for each of a few measures. */
export function Dumbbell({ rows, controlLabel, treatmentLabel }: { rows: DumbbellRow[]; controlLabel: string; treatmentLabel: string }) {
  const W = 300;
  const rowH = 42;
  const H = rows.length * rowH + 18;
  const padL = 4;
  const trackL = 112;
  const trackR = W - 46;

  const vals = rows.flatMap((r) => [r.control, r.treatment]);
  const maxV = Math.max(...vals, 0);
  const minV = Math.min(...vals, 0);
  const range = maxV - minV || 1;
  const x = (v: number) => trackL + ((trackR - trackL) * (v - minV)) / range;
  const zeroX = x(0);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="overflow-visible" style={{ maxHeight: H + 10 }}>
      <line x1={zeroX} y1={8} x2={zeroX} y2={H - 12} stroke={AXIS} strokeWidth="1" strokeDasharray="2,3" />
      {rows.map((r, i) => {
        const cy = 18 + i * rowH;
        const [l1, l2] = twoLine(r.label);
        return (
          <g key={r.label}>
            <text x={padL} y={cy - (l2 ? 3 : -3.5)} fontSize={FS_LABEL} fill={LABEL}>
              <tspan x={padL}>{l1}</tspan>
              {l2 && <tspan x={padL} dy="11">{l2}</tspan>}
            </text>
            {r.tag && (
              <text x={padL} y={cy + (l2 ? 22 : 13)} fontSize={FS_TAG} fill={VALUE_MUTED} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {r.tag}
              </text>
            )}
            <line x1={x(r.control)} y1={cy} x2={x(r.treatment)} y2={cy} stroke={ink(0.16)} strokeWidth="2.5" />
            <circle cx={x(r.control)} cy={cy} r="4.5" fill={MUTED_MARK}>
              <title>{`${controlLabel} · ${r.label}: ${fmtPct(r.control)}`}</title>
            </circle>
            <circle cx={x(r.treatment)} cy={cy} r="5.5" fill={BRAND}>
              <title>{`${treatmentLabel} · ${r.label}: ${fmtPct(r.treatment)}`}</title>
            </circle>
            <text x={W - 2} y={cy + 3.5} textAnchor="end" fontSize={FS_VALUE} fontWeight="700" fill={VALUE}>
              {fmtPct(r.treatment)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------- Slope

export interface SlopeSeries {
  label: string;
  kind: 'brand' | 'muted';
  from: number;
  to: number;
}

/** A two-timepoint change, treatment vs control. */
export function Slope({ fromLabel, toLabel, unit, series }: { fromLabel: string; toLabel: string; unit: string; series: SlopeSeries[] }) {
  const W = 300;
  const H = 172;
  const padT = 22;
  const padB = 30;
  const xL = 92;
  const xR = W - 92;
  const ch = H - padT - padB;

  const all = series.flatMap((s) => [s.from, s.to]);
  const maxV = Math.max(...all) * 1.05;
  const minV = Math.min(...all) * 0.95;
  const range = maxV - minV || 1;
  const y = (v: number) => padT + ch * ((maxV - v) / range);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="overflow-visible" style={{ maxHeight: 196 }}>
      <line x1={xL} y1={padT - 8} x2={xL} y2={H - padB + 8} stroke={GRID} strokeWidth="1" />
      <line x1={xR} y1={padT - 8} x2={xR} y2={H - padB + 8} stroke={GRID} strokeWidth="1" />
      <text x={xL} y={H - 9} textAnchor="middle" fontSize={FS_LABEL} fill={LABEL}>{fromLabel}</text>
      <text x={xR} y={H - 9} textAnchor="middle" fontSize={FS_LABEL} fill={LABEL}>{toLabel}</text>
      {[...series].reverse().map((s) => {
        const stroke = s.kind === 'brand' ? BRAND : MUTED_MARK;
        const bold = s.kind === 'brand';
        return (
          <g key={s.label}>
            <line x1={xL} y1={y(s.from)} x2={xR} y2={y(s.to)} stroke={stroke} strokeWidth={bold ? 2.5 : 1.75} strokeLinecap="round" />
            <circle cx={xL} cy={y(s.from)} r="3.5" fill={stroke} />
            <circle cx={xR} cy={y(s.to)} r="3.5" fill={stroke} />
            <text x={xL - 7} y={y(s.from) + 3.5} textAnchor="end" fontSize={FS_VALUE} fontWeight={bold ? 700 : 400} fill={bold ? VALUE : VALUE_MUTED}>
              {s.from}{unit}
            </text>
            <text x={xR + 7} y={y(s.to) + 3.5} textAnchor="start" fontSize={FS_VALUE} fontWeight={bold ? 700 : 400} fill={bold ? VALUE : VALUE_MUTED}>
              {s.to}{unit}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------- DotPlot

export interface DotRow {
  label: string;
  value: number;
  unit?: '%';
  /** 'result' = significant, drawn in brand; 'context' = greyed. */
  kind: 'result' | 'context';
  /** Small tag under the label, e.g. "p = 0.005", "trend", "no change". */
  tag?: string;
}

/** One headline result emphasised; supporting / null findings greyed as context. */
export function DotPlot({ rows }: { rows: DotRow[] }) {
  const W = 300;
  const rowH = 40;
  const H = rows.length * rowH + 18;
  const padL = 4;
  const trackL = 120;
  const trackR = W - 46;

  const vals = rows.map((r) => r.value);
  const maxV = Math.max(...vals, 0);
  const minV = Math.min(...vals, 0);
  const range = maxV - minV || 1;
  const x = (v: number) => trackL + ((trackR - trackL) * (v - minV)) / range;
  const zeroX = x(0);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="overflow-visible" style={{ maxHeight: H + 10 }}>
      <line x1={zeroX} y1={8} x2={zeroX} y2={H - 10} stroke={AXIS} strokeWidth="1" strokeDasharray="2,3" />
      {rows.map((r, i) => {
        const cy = 20 + i * rowH;
        const isResult = r.kind === 'result';
        const c = isResult ? BRAND : MUTED_MARK;
        return (
          <g key={r.label}>
            <text x={padL} y={cy - 3} fontSize={FS_LABEL} fontWeight={isResult ? 700 : 400} fill={isResult ? VALUE : LABEL}>
              {r.label}
            </text>
            {r.tag && (
              <text x={padL} y={cy + 10} fontSize={FS_TAG} fill={VALUE_MUTED} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {r.tag}
              </text>
            )}
            <line x1={zeroX} y1={cy} x2={x(r.value)} y2={cy} stroke={c} strokeWidth={isResult ? 2.5 : 1.5} opacity={isResult ? 1 : 0.7} />
            <circle cx={x(r.value)} cy={cy} r={isResult ? 6 : 4} fill={c}>
              <title>{`${r.label}: ${fmtPct(r.value)}`}</title>
            </circle>
            <text x={W - 2} y={cy + 3.5} textAnchor="end" fontSize={FS_VALUE} fontWeight={isResult ? 700 : 400} fill={isResult ? VALUE : VALUE_MUTED}>
              {fmtPct(r.value)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------- Stat

/** A single headline figure — the right form when there is one number, not a series. */
export function Stat({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="flex items-baseline gap-3.5 rounded-lg bg-white border border-ink/[0.08] px-4 py-3.5">
      <span className="text-4xl font-semibold tabular-nums shrink-0" style={{ color: BRAND }}>
        {value}
      </span>
      <span className="text-[15px] font-medium leading-snug" style={{ color: ink(0.78) }}>
        {caption}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------- MethylationDiagram

/**
 * Mechanism diagram (not a results chart) for TMG. Shows where TMG acts in the
 * one-carbon cycle: donating a methyl group to turn homocysteine back into
 * methionine, which feeds SAMe, the body's main methyl donor.
 */
const MC_CX = 122;
const MC_TITLE = 13;
const MC_SUB = 9.5;
const MC_ANNO = 10;

function mcNode(key: string, y: number, h: number, title: string, opts: { w?: number; sub?: string; accent?: boolean } = {}) {
  const { w = 164, sub, accent = false } = opts;
  return (
    <g key={key}>
      <rect x={MC_CX - w / 2} y={y} width={w} height={h} rx="8" fill={accent ? BRAND : '#FFFFFF'} stroke={accent ? BRAND : ink(0.16)} strokeWidth="1.25" />
      <text x={MC_CX} y={y + (sub ? h / 2 - 2 : h / 2 + 4.5)} textAnchor="middle" fontSize={MC_TITLE} fontWeight="700" fill={accent ? '#FFFFFF' : VALUE}>
        {title}
      </text>
      {sub && (
        <text x={MC_CX} y={y + h / 2 + 13} textAnchor="middle" fontSize={MC_SUB} fill={accent ? 'rgba(255,255,255,0.82)' : VALUE_MUTED}>
          {sub}
        </text>
      )}
    </g>
  );
}

function mcArrow(key: string, y1: number, y2: number, brand = false) {
  return (
    <line key={key} x1={MC_CX} y1={y1} x2={MC_CX} y2={y2} stroke={brand ? BRAND : ink(0.35)} strokeWidth={brand ? 2.5 : 1.75} markerEnd={brand ? 'url(#mc-arrow-brand)' : 'url(#mc-arrow)'} />
  );
}

export function MethylationDiagram() {
  const W = 300;
  const H = 300;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="overflow-visible" style={{ maxHeight: 320 }}>
      <defs>
        <marker id="mc-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1 1 L7 4 L1 7 z" fill={ink(0.35)} />
        </marker>
        <marker id="mc-arrow-brand" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7.5" markerHeight="7.5" orient="auto">
          <path d="M1 1 L7 4 L1 7 z" fill={BRAND} />
        </marker>
      </defs>

      {mcNode('hcy', 10, 44, 'Homocysteine')}
      {mcArrow('a1', 54, 98, true)}
      <text x={MC_CX + 18} y={72} fontSize={MC_ANNO} fontWeight="700" fill={BRAND}>TMG donates</text>
      <text x={MC_CX + 18} y={85} fontSize={MC_ANNO} fontWeight="700" fill={BRAND}>a methyl group</text>

      {mcNode('met', 100, 44, 'Methionine')}
      {mcArrow('a2', 144, 178)}

      {mcNode('same', 180, 52, 'SAMe', { sub: 'the body’s main methyl donor' })}
      {mcArrow('a3', 232, 250)}
      <text x={MC_CX + 18} y={246} fontSize={MC_ANNO} fill={VALUE_MUTED}>passes it on to…</text>

      {mcNode('out', 252, 48, 'methylation reactions', { w: 224, sub: 'neurotransmitters · genes · cell upkeep' })}

      {/* recycle: SAMe, once spent, becomes homocysteine again */}
      <path d="M40 206 C 16 206, 16 206, 16 32 L 38 32" fill="none" stroke={ink(0.22)} strokeWidth="1.5" strokeDasharray="3.5,3.5" markerEnd="url(#mc-arrow)" />
      <text x={9} y={120} fontSize={MC_SUB} fill={VALUE_MUTED} transform="rotate(-90 9 120)" textAnchor="middle">spent, then recycled</text>
    </svg>
  );
}

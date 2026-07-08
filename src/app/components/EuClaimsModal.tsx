'use client';

import { useState } from 'react';

const claims = [
  {
    ingredient: 'Magnesium',
    dose: '375 mg / day',
    claims: [
      'Reduces tiredness and fatigue',
      'Supports normal energy-yielding metabolism',
      'Normal muscle function',
      'Normal nerve function',
      'Normal psychological function',
      'Electrolyte balance',
    ],
  },
  {
    ingredient: 'Vitamin B6',
    dose: '1.4 mg / day',
    claims: [
      'Reduces tiredness and fatigue',
      'Supports normal energy-yielding metabolism',
      'Normal psychological function',
      'Normal functioning of the nervous system',
      'Regulation of hormonal activity',
    ],
  },
  {
    ingredient: 'Vitamin B12',
    dose: '2.5 µg / day',
    claims: [
      'Reduces tiredness and fatigue',
      'Supports normal energy-yielding metabolism',
      'Normal psychological function',
      'Normal functioning of the nervous system',
      'Normal red blood cell formation',
    ],
  },
  {
    ingredient: 'Vitamin C',
    dose: '80 mg / day',
    claims: [
      'Reduces tiredness and fatigue',
      'Supports normal energy-yielding metabolism',
      'Normal psychological function',
      'Protection of cells from oxidative stress',
      'Normal immune system function',
    ],
  },
  {
    ingredient: 'Zinc',
    dose: '10 mg / day',
    claims: [
      'Normal cognitive function',
      'Normal immune system function',
      'Protection of cells from oxidative stress',
    ],
  },
];

export default function EuClaimsModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Learn about EU-approved health claims"
        className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-brand/30 text-brand hover:bg-brand/08 transition-colors shrink-0"
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M4 1v3M4 6v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-ink/[0.08] shrink-0">
              <div className="space-y-1 pr-4">
                <p className="text-sm font-semibold text-ink">EU-approved health claims</p>
                <p className="text-xs text-[rgba(30,24,84,0.55)] leading-relaxed">
                  Under EU Regulation No 1924/2006, health claims on food products must be scientifically substantiated and approved by the European Food Safety Authority (EFSA). Every claim listed here is legally permitted at the dose included in Flow.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-ink/[0.06] transition-colors text-ink/40 shrink-0"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-[#F8F8FB] border-b border-ink/[0.08]">
                  <tr>
                    <th className="text-left px-6 py-3 text-ink font-semibold tracking-[0.04em]">Ingredient</th>
                    <th className="text-left px-4 py-3 text-ink font-semibold tracking-[0.04em]">Dose in Flow</th>
                    <th className="text-left px-4 py-3 text-ink font-semibold tracking-[0.04em]">Approved claims</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/[0.05]">
                  {claims.map((row) => (
                    <tr key={row.ingredient} className="align-top">
                      <td className="px-6 py-4 font-medium text-ink whitespace-nowrap">{row.ingredient}</td>
                      <td className="px-4 py-4 text-[rgba(30,24,84,0.55)] whitespace-nowrap">{row.dose}</td>
                      <td className="px-4 py-4 text-[rgba(30,24,84,0.75)]">
                        <ul className="space-y-1">
                          {row.claims.map((c) => (
                            <li key={c} className="flex items-start gap-1.5">
                              <span className="text-brand mt-[0.15em] shrink-0">·</span>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-ink/[0.08] shrink-0">
              <p className="text-[10px] text-[rgba(30,24,84,0.40)] leading-relaxed">
                Source: EU Register of authorised health claims — ec.europa.eu/food/safety/labelling_nutrition/claims/register
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

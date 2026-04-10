'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Props {
  name: string;
  form: string;
  category: string;
  description: string;
  dose: string;
  imageUrl?: string | null;
  imageAlt?: string;
}

export default function IngredientCard({ name, form, category, description, dose, imageUrl, imageAlt }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden flex flex-col">
      {imageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={imageUrl} alt={imageAlt || name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-[#1E1854] tracking-[-0.01em] leading-snug">{name}</h3>
            <p className="text-xs text-[hsla(var(--color-secondary)/0.45)] mt-0.5">{form}</p>
          </div>
          <span className="text-xs uppercase tracking-[0.08em] border border-[var(--color-border)] px-2.5 py-0.5 rounded-full text-[hsla(var(--color-secondary)/0.5)] font-medium shrink-0">{category}</span>
        </div>

        {open && (
          <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">{description}</p>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-auto pt-3 border-t border-[var(--color-border)] flex items-center justify-between w-full group"
        >
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-semibold text-[#1E1854] tracking-[-0.02em]">{dose}</span>
            <span className="text-xs text-[hsla(var(--color-secondary)/0.4)] uppercase tracking-[0.06em]">per serving</span>
          </div>
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            className={`text-[hsla(var(--color-secondary)/0.4)] transition-transform duration-300 group-hover:text-[#1E1854] ${open ? 'rotate-180' : ''}`}
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

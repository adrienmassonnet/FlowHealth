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
    <div className="bg-white rounded-2xl border border-[#1E185420] overflow-hidden flex flex-row sm:flex-col">
      {/* Image — small square on mobile, full-width on sm+ */}
      {imageUrl && (
        <div className="relative w-24 shrink-0 sm:w-full sm:aspect-[16/9] aspect-square overflow-hidden">
          <Image src={imageUrl} alt={imageAlt || name} fill className="object-cover" sizes="(max-width: 640px) 96px, (max-width: 1024px) 50vw, 33vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <div className="p-3 sm:p-6 flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-1.5">
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-[#1E1854] tracking-[-0.01em] leading-snug">{name}</h3>
            <p className="text-xs text-[rgba(30,24,84,0.45)] mt-0.5">{form}</p>
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.08em] border border-[#1E185420] px-2 py-0.5 rounded-full font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent shrink-0">{category}</span>
        </div>

        {open && (
          <p className="text-xs sm:text-sm text-[rgba(30,24,84,0.65)] leading-[1.55]">{description}</p>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-auto pt-2 sm:pt-3 border-t border-[#1E185420] flex items-center justify-between w-full group"
        >
          <div className="flex items-baseline gap-1">
            <span className="text-sm sm:text-xl font-semibold text-[#1E1854] tracking-[-0.02em]">{dose}</span>
            <span className="text-[10px] sm:text-xs text-[rgba(30,24,84,0.4)] uppercase tracking-[0.06em]">per serving</span>
          </div>
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            className={`text-[rgba(30,24,84,0.4)] transition-transform duration-300 group-hover:text-[#1E1854] ${open ? 'rotate-180' : ''}`}
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

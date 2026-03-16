'use client';

import { useState } from 'react';

type AccordionItem = {
  id: number;
  title: string;
  body: string;
  imageUrl: string;
};

type Props = {
  items: AccordionItem[];
  defaultActive?: number;
};

const AccordionPanel = ({
  item,
  isActive,
  onClick,
}: {
  item: AccordionItem;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`
        relative overflow-hidden cursor-pointer
        transition-[width,flex] duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]
        h-full
        ${isActive ? 'w-[440px] flex-shrink-0' : 'flex-1 min-w-[36px]'}
      `}
      onClick={onClick}
    >
      {/* Background image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay — transitions independently */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          isActive
            ? 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'
            : 'bg-black/50'
        }`}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Active: title + body — delayed so it only appears after panel has expanded */}
        <div
          className={`transition-all ease-in-out ${
            isActive
              ? 'opacity-100 translate-y-0 duration-400 delay-[420ms]'
              : 'opacity-0 translate-y-3 duration-150 delay-0 pointer-events-none'
          }`}
        >
          <h3 className="text-white text-xl font-bold tracking-[-0.02em] leading-tight mb-2">
            {item.title}
          </h3>
          <p className="text-white/75 text-xs leading-[1.65] max-w-[320px]">
            {item.body}
          </p>
        </div>

        {/* Inactive: rotated title — hides quickly when opening */}
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            isActive
              ? 'opacity-0 duration-150 delay-0 pointer-events-none'
              : 'opacity-100 duration-300 delay-[200ms]'
          } transition-opacity ease-in-out`}
        >
          <span className="text-white text-[11px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap -rotate-90">
            {item.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export function InteractiveImageAccordion({ items, defaultActive = 0 }: Props) {
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  return (
    <div className="flex flex-row w-full h-[440px] gap-3 bg-transparent">
      {items.map((item, index) => (
        <AccordionPanel
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
}

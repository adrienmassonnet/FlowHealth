'use client';

interface CarouselDotsProps {
  count: number;
  current: number;
  onDotClick?: (i: number) => void;
  /** 'dark' = indigo dots on light bg · 'light' = white dots on dark/image bg */
  variant?: 'dark' | 'light';
  className?: string;
}

export function CarouselDots({
  count,
  current,
  onDotClick,
  variant = 'dark',
  className = '',
}: CarouselDotsProps) {
  const activeClass = variant === 'dark' ? 'bg-[#1E1854]/60' : 'bg-white';
  const inactiveClass =
    variant === 'dark'
      ? 'bg-[#1E1854]/20 hover:bg-[#1E1854]/40'
      : 'bg-white/35 hover:bg-white/60';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick?.(i)}
          aria-label={`Go to item ${i + 1}`}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? `w-4 h-1.5 ${activeClass}`
              : `w-1.5 h-1.5 ${inactiveClass}`
          }`}
        />
      ))}
    </div>
  );
}
"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  meta?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  heading?: string;
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

const TAP_SPRING = {
  type: "spring" as const,
  stiffness: 450,
  damping: 18,
  mass: 1,
};

export function FocusRail({
  items,
  heading,
  initialIndex = 0,
  loop = true,
  autoPlay = true,
  interval = 7000,
  className,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);

  const count = items.length;
  const activeItem = items[wrap(0, count, active)];

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) handleNext();
    else if (swipe > swipeConfidenceThreshold) handlePrev();
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden outline-none select-none border-t border-[var(--color-border)]",
        className
      )}
      style={{ background: "linear-gradient(180deg, #E0E6E8 0%, #F8F8F8 100%)" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="max-w-[1360px] mx-auto px-6 py-20 md:py-28">

        {/* Section header */}
        {heading && (
          <div className="mb-16 space-y-3">
            <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">
              From the blog
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-[#1A1A18]">
              {heading}
            </h2>
          </div>
        )}

        {/* Draggable Rail — wrapped for arrow overlay */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white/90 backdrop-blur-sm shadow-sm text-[hsla(var(--color-secondary)/0.6)] transition hover:bg-white hover:text-[#1A1A18] active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {/* Right arrow */}
          <button
            onClick={handleNext}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white/90 backdrop-blur-sm shadow-sm text-[hsla(var(--color-secondary)/0.6)] transition hover:bg-white hover:text-[#1A1A18] active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

        <motion.div
          className="relative mx-auto flex h-[380px] w-full items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
          style={{ perspective: "1200px" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            const xOffset = offset * 300;
            const zOffset = -dist * 140;
            const scale = isCenter ? 1 : 0.84;
            const rotateY = offset * -18;
            const opacity = isCenter ? 1 : Math.max(0.08, 1 - dist * 0.52);
            const blur = isCenter ? 0 : dist * 5;
            const brightness = isCenter ? 1 : 0.65;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute aspect-[3/4] w-[220px] md:w-[260px] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[#F0F2F1]",
                  isCenter ? "z-20 shadow-[0_8px_40px_rgba(26,26,24,0.12)]" : "z-10 shadow-sm"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale,
                  rotateY,
                  opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={{
                  x: BASE_SPRING,
                  z: BASE_SPRING,
                  scale: TAP_SPRING,
                  rotateY: BASE_SPRING,
                  opacity: BASE_SPRING,
                  filter: BASE_SPRING,
                }}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="h-full w-full object-cover pointer-events-none"
                />
                {/* Subtle top sheen */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

          {/* Dot indicators */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {items.map((_, i) => {
              const isActive = i === wrap(0, count, active);
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to article ${i + 1}`}
                  className="transition-all duration-300"
                >
                  <span className={cn(
                    "block rounded-full transition-all duration-300",
                    isActive
                      ? "w-5 h-1.5 bg-[#1A1A18]"
                      : "w-1.5 h-1.5 bg-[hsla(var(--color-secondary)/0.25)] hover:bg-[hsla(var(--color-secondary)/0.45)]"
                  )} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Info & Controls */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Active item info */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left min-h-[5rem] justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                {activeItem.meta && (
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-[hsla(var(--color-secondary)/0.5)]">
                    {activeItem.meta}
                  </span>
                )}
                <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] leading-snug text-[#1A1A18] max-w-md">
                  {activeItem.title}
                </h3>
                {activeItem.description && (
                  <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] max-w-sm leading-relaxed">
                    {activeItem.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav + CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Read article pill */}
            {activeItem.href && (
              <div className="rounded-full border border-[#1A1A18] bg-white/80 backdrop-blur-sm px-4 py-2.5">
                <Link
                  href={activeItem.href}
                  className="text-xs font-medium text-[#1A1A18] whitespace-nowrap"
                >
                  Read this article
                </Link>
              </div>
            )}

            <Link
              href="/pages/blog-posts"
              className="group/link flex items-center gap-2 rounded-full bg-[#1A1A18] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#2a2a28] active:scale-95"
            >
              Discover our blogs
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/clarity";

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
      style={{ background: "linear-gradient(180deg, #1E185412 0%, #1E185408 100%)" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">

        {/* Section header */}
        {heading && (
          <div className="mb-16 space-y-3">
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">
              From the blog
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.05] text-[#1E1854]">
              {heading}
            </h2>
          </div>
        )}

        {/* Draggable Rail */}
        <div className="relative">

        <motion.div
          className="relative mx-auto flex w-full items-start justify-center cursor-grab active:cursor-grabbing overflow-visible"
          style={{ perspective: "1200px" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {/* Invisible spacer — gives the container natural height that adapts to title length */}
          <div className="invisible pointer-events-none flex flex-col w-[220px] sm:w-[270px] md:w-[320px]" aria-hidden>
            <div className="h-[400px] sm:h-[460px] md:h-[520px]" />
            <div className="pt-3 px-1">
              <p className="text-base font-semibold tracking-[-0.02em] leading-snug">
                {activeItem.title}
              </p>
            </div>
          </div>

          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            const xOffset = offset * 340;
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
                  "absolute flex flex-col w-[220px] sm:w-[270px] md:w-[320px]",
                  isCenter ? "z-20" : "z-10"
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
                {/* Image */}
                <div className={cn(
                  "relative w-full rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[#1E18540A]",
                  "h-[400px] sm:h-[460px] md:h-[520px]",
                  isCenter ? "shadow-[0_8px_40px_rgba(30,24,84,0.12)]" : "shadow-sm"
                )}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="h-full w-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />
                </div>

                {/* Title below image */}
                <div className="pt-3 px-1 w-[220px] sm:w-[270px] md:w-[320px]">
                  <p className="text-base font-semibold tracking-[-0.02em] leading-snug text-[#1E1854]">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

          {/* Dot indicators + arrows */}
          <div className="mt-1 flex items-center justify-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1E1854]/18 text-[#1E1854]/45 transition-colors duration-200 hover:border-[#1E1854]/40 hover:text-[#1E1854] active:scale-95"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <div className="flex items-center gap-2">
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
                        ? "w-5 h-1.5 bg-[#1E1854]"
                        : "w-1.5 h-1.5 bg-[hsla(var(--color-secondary)/0.25)] hover:bg-[hsla(var(--color-secondary)/0.45)]"
                    )} />
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1E1854]/18 text-[#1E1854]/45 transition-colors duration-200 hover:border-[#1E1854]/40 hover:text-[#1E1854] active:scale-95"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {activeItem.href && (
            <div className="rounded-full border border-[#1E1854] bg-white/80 backdrop-blur-sm px-4 py-2.5">
              <Link
                href={activeItem.href}
                onClick={() => trackEvent('homepage_blog_read_article')}
                className="text-xs font-medium text-[#1E1854] whitespace-nowrap"
              >
                Read this article
              </Link>
            </div>
          )}

          <Link
            href="/pages/blog-posts"
            onClick={() => trackEvent('homepage_blog_discover_all')}
            className="rounded-full bg-[#1E1854] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1E1854]/80 active:scale-95 whitespace-nowrap"
          >
            Discover our blogs
          </Link>
        </div>
      </div>
    </div>
  );
}

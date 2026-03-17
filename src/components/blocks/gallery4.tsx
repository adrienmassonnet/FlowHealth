"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
}

const Gallery4 = ({
  title = "From the Journal",
  description = "Insights on focus, recovery, and the science behind Flow.",
  items,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => { carouselApi.off("select", updateSelection) };
  }, [carouselApi]);

  return (
    <section className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-10 flex items-end justify-between">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/1)]">
              From the Journal
            </p>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
            <p className="text-sm text-[hsla(var(--color-secondary)/1)] max-w-sm">{description}</p>
          </div>
          <div className="hidden md:flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="border border-[var(--color-border)] rounded-none h-9 w-9 disabled:opacity-30"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="border border-[var(--color-border)] rounded-none h-9 w-9 disabled:opacity-30"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{ breakpoints: { "(max-width: 768px)": { dragFree: true } } }}
        >
          <CarouselContent className="ml-0 pl-6 2xl:ml-[max(1.5rem,calc(50vw-672px))]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="max-w-[300px] pl-[16px] lg:max-w-[340px]">
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative overflow-hidden aspect-[3/4] bg-[#1E18540F] mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <p className="text-xs tracking-[0.1em] uppercase text-white/80 mb-2">Read more</p>
                      <h3 className="text-sm font-medium leading-snug line-clamp-3">{item.title}</h3>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-6 bg-[hsla(var(--color-accent)/1)]"
                  : "w-1.5 bg-[hsla(var(--color-accent)/0.2)]"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };

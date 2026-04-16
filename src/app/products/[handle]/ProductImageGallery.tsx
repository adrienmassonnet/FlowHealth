'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  url: string;
  altText: string | null;
}

export default function ProductImageGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [active, setActive] = useState(0);

  const thumbnails = images.filter((_, i) => i !== active);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F6F5FA]">
        {images[active] && (
          <Image
            src={images[active].url}
            alt={images[active].altText ?? title}
            fill
            className="object-contain p-4 transition-opacity duration-400"
            priority
          />
        )}
      </div>

      {/* Thumbnails — only non-active images */}
      {thumbnails.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => {
            if (i === active) return null;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl bg-[#F6F5FA] opacity-60 hover:opacity-100 transition-opacity duration-200"
              >
                <Image
                  src={img.url}
                  alt={img.altText ?? title}
                  fill
                  className="object-contain p-2"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  url: string;
  altText: string | null;
}

export default function ProductImageGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-square overflow-hidden"
      >
        {images[active] && (
          <Image
            src={images[active].url}
            alt={images[active].altText ?? title}
            fill
            className="object-contain p-4 transition-opacity duration-300"
            priority
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden transition-all ${
                active === i
                  ? 'ring-1 ring-[hsla(var(--color-accent)/1)]'
                  : 'opacity-50 hover:opacity-80'
              }`}
              style={{ background: 'transparent' }}
            >
              <Image
                src={img.url}
                alt={img.altText ?? title}
                fill
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

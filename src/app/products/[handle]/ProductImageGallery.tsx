'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.1, 1] as const;

interface GalleryImage {
  url: string;
  altText: string | null;
}

export default function ProductImageGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const visible = images.slice(0, 2);

  return (
    <motion.div
      className="space-y-0"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease }}
    >
      {visible.map((img, i) => (
        <div key={i} className={i === 0 ? 'relative aspect-[5/4] overflow-hidden rounded-2xl' : 'w-full overflow-hidden rounded-2xl'}>
          {i === 0 ? (
            <Image
              src={img.url}
              alt={img.altText ?? title}
              fill
              className="object-contain"
              priority
            />
          ) : (
            <Image
              src={img.url}
              alt={img.altText ?? title}
              width={800}
              height={800}
              className="w-full h-auto object-contain block"
              loading="lazy"
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}

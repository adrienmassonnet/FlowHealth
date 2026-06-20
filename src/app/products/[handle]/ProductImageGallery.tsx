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
      className="flex flex-col gap-3"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease }}
    >
      {visible.map((img, i) => (
        <div key={i} className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'aspect-[4/3]' : 'aspect-[16/9]'}`}>
          <Image
            src={img.url}
            alt={img.altText ?? title}
            fill
            className="object-cover"
            priority={i === 0}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </motion.div>
  );
}

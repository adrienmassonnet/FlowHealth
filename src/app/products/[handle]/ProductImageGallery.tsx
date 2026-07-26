'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSectionProp } from '@/lib/section-animation-context';

interface GalleryImage {
  url: string;
  altText: string | null;
}

export default function ProductImageGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const visible = images.slice(0, 2);
  const duration = useSectionProp('product-gallery', 'entranceDuration') as number;
  const ease = useSectionProp('product-gallery', 'entranceEase') as [number, number, number, number];

  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, ease }}
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

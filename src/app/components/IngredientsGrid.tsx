'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.1, 0.1, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.86, rotate: -3 },
  visible: { opacity: 1, scale: 1, rotate: 0 },
};

interface Ingredient {
  name: string;
  imageUrl?: string;
}

interface Props {
  ingredients: Ingredient[];
  sizes: string;
  labelClassName?: string;
}

export default function IngredientsGrid({ ingredients, sizes, labelClassName = 'px-3 py-2.5 text-xs' }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 w-full">
      {ingredients.map((ing) => (
        <motion.div
          key={ing.name}
          className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={cardVariants}
          transition={{ duration: 0.8, ease }}
        >
          {ing.imageUrl && (
            <Image
              src={ing.imageUrl}
              alt={ing.name}
              fill
              className="object-cover"
              sizes={sizes}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <p className={`absolute bottom-0 left-0 right-0 font-semibold text-white tracking-[-0.01em] ${labelClassName}`}>
            {ing.name}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

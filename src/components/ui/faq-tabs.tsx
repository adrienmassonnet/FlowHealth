'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type FAQItem = { question: string; answer: string };
type FAQData = Record<string, FAQItem[]>;
type Categories = Record<string, string>;

interface FAQProps {
  title?: string;
  subtitle?: string;
  categories: Categories;
  faqData: FAQData;
  className?: string;
  initialCategory?: string;
}

export const FAQ = ({
  title = 'FAQs',
  subtitle = 'Frequently Asked Questions',
  categories,
  faqData,
  className,
  initialCategory,
}: FAQProps) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory && categoryKeys.includes(initialCategory) ? initialCategory : categoryKeys[0]
  );

  return (
    <section className={cn('relative overflow-hidden px-4 py-12', className)}>
      {(title || subtitle) && <FAQHeader title={title} subtitle={subtitle} />}
      <FAQTabs categories={categories} selected={selectedCategory} setSelected={setSelectedCategory} />
      <FAQList faqData={faqData} selected={selectedCategory} />
    </section>
  );
};

const FAQHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="relative z-10 flex flex-col items-center justify-center mb-10">
    <span className="mb-4 text-xs tracking-[0.16em] uppercase font-medium text-[hsla(var(--color-secondary)/0.5)]">
      {subtitle}
    </span>
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.0] text-[#1E1854]">
      {title}
    </h2>
    <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-[hsla(var(--color-accent)/0.04)] blur-3xl pointer-events-none" />
  </div>
);

const FAQTabs = ({
  categories,
  selected,
  setSelected,
}: {
  categories: Categories;
  selected: string;
  setSelected: (key: string) => void;
}) => (
  <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mb-10">
    {Object.entries(categories).map(([key, label]) => (
      <button
        key={key}
        onClick={() => setSelected(key)}
        className={cn(
          'whitespace-nowrap rounded-full px-5 py-2.5 text-xs tracking-[0.08em] uppercase font-medium transition-all duration-300',
          selected === key
            ? 'bg-gradient-to-r from-[#3B38B8] to-[#1E1854] text-white shadow-[0_4px_14px_-4px_rgba(59,56,184,0.5)]'
            : 'bg-white border border-[var(--color-border)] shadow-[0_2px_8px_rgba(30,24,84,0.06)] text-[hsla(var(--color-secondary)/0.8)] hover:border-[#3B38B8] hover:text-[#3B38B8] hover:shadow-[0_4px_16px_rgba(59,56,184,0.12)]'
        )}
      >
        {label}
      </button>
    ))}
  </div>
);

const FAQList = ({ faqData, selected }: { faqData: FAQData; selected: string }) => (
  <div className="mx-auto max-w-5xl">
    <AnimatePresence mode="wait">
      {Object.entries(faqData).map(([category, questions]) => {
        if (selected !== category) return null;
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start"
          >
            {questions.map((faq, index) => (
              <FAQCard key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </motion.div>
        );
      })}
    </AnimatePresence>
  </div>
);

const FAQCard = ({ question, answer, index }: FAQItem & { index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      className={cn(
        'group relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden',
        isOpen
          ? 'border-[#1E1854]/20 shadow-[0_8px_32px_-8px_rgba(30,24,84,0.18)]'
          : 'border-[var(--color-border)] shadow-[0_2px_12px_-4px_rgba(30,24,84,0.07)] hover:shadow-[0_6px_24px_-6px_rgba(30,24,84,0.14)] hover:border-[#1E1854]/15'
      )}
    >
      {/* Accent bar */}
      <motion.div
        initial={false}
        animate={{ scaleX: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3B38B8] to-[#1E1854] origin-left"
      />

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between gap-4 px-6 pt-6 pb-5 text-left"
      >
        <span className={cn(
          'text-sm font-semibold tracking-[-0.01em] leading-snug transition-colors duration-200',
          isOpen ? 'text-[#1E1854]' : 'text-[hsla(var(--color-secondary)/0.85)] group-hover:text-[#1E1854]'
        )}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          className={cn(
            'shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200',
            isOpen
              ? 'bg-[#1E1854] border-[#1E1854]'
              : 'border-[var(--color-border)] group-hover:border-[#1E1854]/40'
          )}
        >
          <Plus className={cn('w-3 h-3', isOpen ? 'text-white' : 'text-[#1E1854]')} />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : '0px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <div className="w-full h-px bg-[var(--color-border)] mb-4" />
          <p className="text-sm text-[hsla(var(--color-secondary)/0.75)] leading-[1.75]">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

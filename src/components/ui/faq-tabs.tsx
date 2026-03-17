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
      <FAQHeader title={title} subtitle={subtitle} />
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
    <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.0] text-[#1E1854]">
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
  <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mb-12">
    {Object.entries(categories).map(([key, label]) => (
      <button
        key={key}
        onClick={() => setSelected(key)}
        className={cn(
          'relative overflow-hidden whitespace-nowrap rounded-full border px-4 py-1.5 text-xs tracking-[0.08em] uppercase font-medium transition-colors duration-300',
          selected === key
            ? 'border-[#1E1854] text-white'
            : 'border-[var(--color-border)] text-[hsla(var(--color-secondary)/0.7)] hover:text-[#1E1854] hover:border-[#1E1854]'
        )}
      >
        <span className="relative z-10">{label}</span>
        <AnimatePresence>
          {selected === key && (
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: 'backIn' }}
              className="absolute inset-0 z-0 bg-[#1E1854]"
            />
          )}
        </AnimatePresence>
      </button>
    ))}
  </div>
);

const FAQList = ({ faqData, selected }: { faqData: FAQData; selected: string }) => (
  <div className="mx-auto max-w-3xl">
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
            className="space-y-0"
          >
            {questions.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
            <div className="border-t border-[var(--color-border)]" />
          </motion.div>
        );
      })}
    </AnimatePresence>
  </div>
);

const FAQItem = ({ question, answer }: FAQItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      className="border-t border-[var(--color-border)]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between gap-6 py-6 text-left group"
      >
        <span className={cn(
          'text-base font-medium tracking-[-0.01em] transition-colors',
          isOpen ? 'text-[#1E1854]' : 'text-[hsla(var(--color-secondary)/0.8)] group-hover:text-[#1E1854]'
        )}>
          {question}
        </span>
        <motion.span
          variants={{ open: { rotate: '45deg' }, closed: { rotate: '0deg' } }}
          transition={{ duration: 0.2 }}
          className={cn(
            'shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center transition-colors',
            isOpen ? 'bg-[#1E1854] border-[#1E1854]' : 'border-[var(--color-border)] group-hover:border-[#1E1854]'
          )}
        >
          <Plus className={cn('w-3 h-3', isOpen ? 'text-white' : 'text-[#1E1854]')} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : '0px', marginBottom: isOpen ? '20px' : '0px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden pr-10"
      >
        <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-[1.7]">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

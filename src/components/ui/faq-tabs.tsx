'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, DURATION } from '@/lib/animation';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/clarity';
import { ga4TabClick } from '@/lib/ga4';

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

      {/* Mobile: category pills + stacked list */}
      <div className="md:hidden relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setSelectedCategory(key); trackEvent('faq_category_tab_click'); ga4TabClick('faq_category', label); }}
              className={cn(
                'whitespace-nowrap rounded-full px-5 py-2.5 text-xs tracking-[0.08em] uppercase font-medium transition-all duration-300',
                selectedCategory === key
                  ? 'bg-gradient-to-r from-brand to-ink text-white shadow-[0_4px_14px_-4px_rgba(59,56,184,0.5)]'
                  : 'bg-white border border-ink/[12.5%] shadow-[0_2px_8px_rgba(30,24,84,0.06)] text-[rgba(30,24,84,0.8)] hover:border-brand hover:text-brand hover:shadow-[0_4px_16px_rgba(59,56,184,0.12)]'
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <FAQList faqData={faqData} selected={selectedCategory} />
      </div>

      {/* Desktop: book-page reader */}
      <div className="hidden md:grid relative z-10 max-w-5xl mx-auto grid-cols-[1fr_2fr] gap-0 border border-ink/[0.08] rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(30,24,84,0.07)]">

        {/* Category index — left spine */}
        <div className="bg-white border-r border-ink/[0.07] flex flex-col">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setSelectedCategory(key); trackEvent('faq_category_tab_click'); ga4TabClick('faq_category', label); }}
              className={`text-left px-6 py-5 border-b border-ink/[0.07] last:border-0 transition-colors duration-200 group ${
                selectedCategory === key ? 'bg-[#F7F6FA]' : 'bg-white hover:bg-[#F7F6FA]/60'
              }`}
            >
              <span className={`text-sm font-medium tracking-[-0.01em] transition-colors duration-200 leading-snug ${selectedCategory === key ? 'text-brand' : 'text-ink/60 group-hover:text-ink/80'}`}>
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Page content — right */}
        <div className="relative bg-[#FAFAFA] min-h-[200px] overflow-hidden">
          <AnimatePresence mode="wait">
            {Object.entries(faqData).map(([category, questions]) => {
              if (selectedCategory !== category) return null;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: DURATION.base, ease: EASE.expoOut }}
                  className="px-8 py-8 space-y-3"
                >
                  {questions.map((faq, index) => (
                    <FAQCard key={index} question={faq.question} answer={faq.answer} index={index} />
                  ))}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

const FAQHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="relative z-10 flex flex-col items-center justify-center mb-10">
    <span className="mb-4 text-xs tracking-[0.16em] uppercase font-medium text-[rgba(30,24,84,0.5)]">
      {subtitle}
    </span>
    <h2 className="flow-h2">
      {title}
    </h2>
    <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-[rgba(30,24,84,0.04)] blur-3xl pointer-events-none" />
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
            transition={{ duration: DURATION.slow, ease: EASE.expoOut }}
            className="flex flex-col gap-4"
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
      transition={{ duration: DURATION.base, delay: index * 0.04, ease: EASE.expoOut }}
      className={cn(
        'group relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden',
        isOpen
          ? 'border-ink/20 shadow-[0_8px_32px_-8px_rgba(30,24,84,0.18)]'
          : 'border-ink/[12.5%] shadow-[0_2px_12px_-4px_rgba(30,24,84,0.07)] hover:shadow-[0_6px_24px_-6px_rgba(30,24,84,0.14)] hover:border-ink/15'
      )}
    >
      {/* Accent bar */}
      <motion.div
        initial={false}
        animate={{ scaleX: isOpen ? 1 : 0 }}
        transition={{ duration: DURATION.base, ease: EASE.expoOut }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand to-ink origin-left"
      />

      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) trackEvent('faq_question_accordion_open');
        }}
        className="flex w-full items-start justify-between gap-4 px-6 pt-6 pb-5 text-left"
      >
        <span className={cn(
          'text-sm font-semibold tracking-[-0.01em] leading-snug transition-colors duration-200',
          isOpen ? 'text-ink' : 'text-[rgba(30,24,84,0.85)] group-hover:text-ink'
        )}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: DURATION.fast, ease: EASE.expoOut }}
          className={cn(
            'shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200',
            isOpen
              ? 'bg-ink border-ink'
              : 'border-ink/[12.5%] group-hover:border-ink/40'
          )}
        >
          <Plus className={cn('w-3 h-3', isOpen ? 'text-white' : 'text-ink')} />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : '0px' }}
        transition={{ duration: DURATION.base, ease: EASE.expoOut }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <div className="w-full h-px bg-ink/[12.5%] mb-4" />
          <p className="text-sm text-[rgba(30,24,84,0.75)] leading-[1.75]">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '../types/calculator';

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  items: FaqItem[];
}

export function FaqSection({
  title = 'Frequently Asked Questions',
  subtitle,
  items,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="py-8">
      <div className="mb-6">
        <h2
          id="faq-heading"
          className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={item.question}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400 transition-transform duration-150 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

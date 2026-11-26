import { CALCULATOR_LIST, GLOBAL_FAQS } from '../data/catalog';
import { AdSlot } from './AdSlot';
import { FaqSection } from './FaqSection';

interface FaqPageViewProps {
  onNavigate: (path: string) => void;
}

export function FaqPageView({ onNavigate }: FaqPageViewProps) {
  const allCombinedFaqs = [
    ...GLOBAL_FAQS,
    ...CALCULATOR_LIST.flatMap((calc) =>
      calc.faqs.map((faq) => ({
        question: `${calc.shortName}: ${faq.question}`,
        answer: faq.answer,
      }))
    ),
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <a
          href="/"
          onClick={(e) => handleNav(e, '/')}
          className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          Home
        </a>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-slate-800 dark:text-slate-200">FAQ</span>
      </nav>

      <header className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
          SellerMath Help &amp; Fee Calculation FAQ
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Detailed answers covering eBay, Etsy, Amazon FBA, PayPal, and Stripe fee rules alongside margin, markup, ROI, and break-even formulas.
        </p>
      </header>

      <FaqSection title="All SellerMath Questions" items={allCombinedFaqs} />

      <div className="my-8">
        <AdSlot slotId="faq-bottom-banner" format="horizontal" />
      </div>
    </div>
  );
}

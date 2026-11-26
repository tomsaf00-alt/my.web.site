import { ArrowRight } from 'lucide-react';
import { CALCULATOR_LIST, CATEGORIES, CATEGORY_LIST } from '../data/catalog';
import { CategorySlug } from '../types/calculator';
import { AdSlot } from './AdSlot';
import { FaqSection } from './FaqSection';

interface CategoryViewProps {
  categorySlug: CategorySlug | 'all';
  onNavigate: (path: string) => void;
}

export function CategoryView({ categorySlug, onNavigate }: CategoryViewProps) {
  const isAll = categorySlug === 'all';
  const category = isAll ? null : CATEGORIES[categorySlug];
  const calculators = isAll
    ? CALCULATOR_LIST
    : CALCULATOR_LIST.filter((c) => c.category === categorySlug);
  const otherCategories = isAll
    ? CATEGORY_LIST
    : CATEGORY_LIST.filter((c) => c.slug !== categorySlug);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <a
          href="/"
          onClick={(e) => handleNav(e, '/')}
          className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          Home
        </a>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-slate-800 dark:text-slate-200">
          {isAll ? 'All Calculators' : category?.name}
        </span>
      </nav>

      {/* Category Hero */}
      <header className="max-w-3xl pb-8 border-b border-slate-200 dark:border-slate-800">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {calculators.length} Free Calculators · Updated 2026 Fee Schedules
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
          {isAll
            ? 'All SellerMath Ecommerce, Fee & Profit Calculators'
            : category?.headline}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {isAll
            ? 'Browse every SellerMath tool organized across Marketplace Fees, Payment Processing, Profit & Margin, Advertising ROAS/CPA, and Ecommerce Finance.'
            : category?.description}
        </p>
      </header>

      {/* Category Pill-Free Tab Switcher */}
      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href="/calculators"
          onClick={(e) => handleNav(e, '/calculators')}
          className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
            isAll
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-emerald-600/50'
          }`}
        >
          All Categories ({CALCULATOR_LIST.length})
        </a>
        {CATEGORY_LIST.map((cat) => (
          <a
            key={cat.slug}
            href={`/category/${cat.slug}`}
            onClick={(e) => handleNav(e, `/category/${cat.slug}`)}
            className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              categorySlug === cat.slug
                ? 'border-emerald-600 bg-emerald-600 text-white'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-emerald-600/50'
            }`}
          >
            {cat.name}
          </a>
        ))}
      </div>

      {/* Calculator Grid */}
      <section aria-label="Category calculators" className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {calculators.map((calc) => (
            <a
              key={calc.id}
              href={`/calculators/${calc.id}`}
              onClick={(e) => handleNav(e, `/calculators/${calc.id}`)}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:border-emerald-600/60 dark:hover:border-emerald-500/60 transition-colors"
            >
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {CATEGORIES[calc.category].shortName}
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {calc.name}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {calc.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <span>Open {calc.shortName} Calculator</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="my-4">
        <AdSlot slotId={`cat-${categorySlug}-mid`} format="horizontal" />
      </div>

      {/* Cross-linking to other categories */}
      {!isAll && (
        <section className="py-8">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Explore Other SellerMath Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherCategories.map((other) => (
              <a
                key={other.slug}
                href={`/category/${other.slug}`}
                onClick={(e) => handleNav(e, `/category/${other.slug}`)}
                className="group flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-emerald-600/60 dark:hover:border-emerald-500/60 transition-colors"
              >
                <div>
                  <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {other.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {other.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400 ml-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      )}

      {category && <FaqSection title={`${category.shortName} FAQ`} items={category.faqs} />}
    </div>
  );
}

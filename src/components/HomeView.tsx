import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calculator,
  Clock,
  CreditCard,
  DollarSign,
  Search,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';
import {
  CALCULATORS,
  CALCULATOR_LIST,
  CATEGORIES,
  CATEGORY_LIST,
  FEATURED_CALCULATOR_IDS,
  GLOBAL_FAQS,
  POPULAR_CALCULATOR_IDS,
} from '../data/catalog';
import { CalculatorSlug, CategorySlug } from '../types/calculator';
import { formatCurrency, formatPercent } from '../utils/calculations';
import { AdSlot, PartnerStrip } from './AdSlot';
import { FaqSection } from './FaqSection';

interface HomeViewProps {
  onNavigate: (path: string) => void;
  recentIds: CalculatorSlug[];
  currencySymbol?: string;
}

function getCategoryIcon(slug: CategorySlug) {
  switch (slug) {
    case 'marketplace-fees':
      return ShoppingBag;
    case 'payment-fees':
      return CreditCard;
    case 'profit-pricing':
      return DollarSign;
    case 'advertising-calculators':
      return TrendingUp;
    case 'finance-calculators':
      return BarChart3;
  }
}

export function HomeView({ onNavigate, recentIds, currencySymbol = '$' }: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | CategorySlug>('all');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [quickPrice, setQuickPrice] = useState(50);
  const [quickCost, setQuickCost] = useState(18);
  const [quickFeePct, setQuickFeePct] = useState(13.25);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        document.activeElement?.tagName !== 'SELECT'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const quickStats = useMemo(() => {
    const p = Math.max(0, quickPrice || 0);
    const c = Math.max(0, quickCost || 0);
    const f = Math.max(0, quickFeePct || 0);
    const fees = p > 0 ? p * (f / 100) + 0.3 : 0;
    const net = p - c - fees;
    const margin = p > 0 ? (net / p) * 100 : 0;
    const roi = c > 0 ? (net / c) * 100 : 0;
    return { fees, net, margin, roi };
  }, [quickPrice, quickCost, quickFeePct]);

  const searchMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return CALCULATOR_LIST.filter(
      (calc) =>
        calc.name.toLowerCase().includes(q) ||
        calc.tagline.toLowerCase().includes(q) ||
        CATEGORIES[calc.category].name.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchQuery]);

  const filteredCalculators = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CALCULATOR_LIST.filter((calc) => {
      const matchesCat = activeFilter === 'all' || calc.category === activeFilter;
      const matchesQuery =
        !q ||
        calc.name.toLowerCase().includes(q) ||
        calc.tagline.toLowerCase().includes(q) ||
        CATEGORIES[calc.category].name.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeFilter, searchQuery]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero Split */}
      <section className="py-10 sm:py-14 border-b border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {CALCULATOR_LIST.length} Free Ecommerce Calculators · 5 Categories · Press / to Search
              </p>
              <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance leading-[1.12]">
                Financial Clarity for Every Online Seller
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                Estimate eBay, Amazon FBA, Etsy, TikTok Shop, Walmart, PayPal, and Stripe fees alongside profit margins, ROAS, CPA, and inventory reorder points before you spend a dollar.
              </p>

              {/* Hero Search Bar */}
              <div className="mt-6 relative max-w-xl">
                <label htmlFor="hero-calc-search" className="sr-only">
                  Search SellerMath calculators
                </label>
                <div className="relative flex items-center">
                  <Search
                    className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    ref={searchInputRef}
                    id="hero-calc-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search calculators (e.g., eBay, Amazon FBA, Compare, CSV, ROAS)..."
                    className="h-12 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-10 pr-12 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                  <kbd
                    aria-hidden="true"
                    className="pointer-events-none hidden sm:inline-block absolute right-3.5 rounded border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 font-mono text-[11px] text-slate-400"
                  >
                    /
                  </kbd>
                </div>

                {searchMatches.length > 0 && (
                  <div className="mt-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-lg">
                    {searchMatches.map((match) => (
                      <a
                        key={match.id}
                        href={`/calculators/${match.id}`}
                        onClick={(e) => handleNav(e, `/calculators/${match.id}`)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {match.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {CATEGORIES[match.category].name}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="/calculators"
                  onClick={(e) => handleNav(e, '/calculators')}
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-5 text-sm font-semibold text-white transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Calculator className="h-4 w-4" aria-hidden="true" />
                  <span>Browse All {CALCULATOR_LIST.length} Calculators</span>
                </a>
                <a
                  href="/blog"
                  onClick={(e) => handleNav(e, '/blog')}
                  className="inline-flex h-11 items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                >
                  Read Seller Guides
                </a>
              </div>
            </div>
          </div>

          {/* Right: Live Quick Margin & Fee Estimator */}
          <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                  Quick Profit Check
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400">+$0.30 fixed fee</span>
              </div>

              <div className="mt-4 space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="home-quick-price" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Selling Price ({currencySymbol})
                    </label>
                    <input
                      id="home-quick-price"
                      type="number"
                      min={0}
                      step="0.01"
                      value={quickPrice}
                      onChange={(e) => setQuickPrice(parseFloat(e.target.value) || 0)}
                      className="h-10 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 font-mono tabular-nums text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="home-quick-cost" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Product Cost ({currencySymbol})
                    </label>
                    <input
                      id="home-quick-cost"
                      type="number"
                      min={0}
                      step="0.01"
                      value={quickCost}
                      onChange={(e) => setQuickCost(parseFloat(e.target.value) || 0)}
                      className="h-10 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 font-mono tabular-nums text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="home-quick-fee" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Marketplace / Payment Fee Rate (%)
                  </label>
                  <input
                    id="home-quick-fee"
                    type="number"
                    min={0}
                    step="0.05"
                    value={quickFeePct}
                    onChange={(e) => setQuickFeePct(parseFloat(e.target.value) || 0)}
                    className="h-10 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 font-mono tabular-nums text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {quickStats.net >= 0 ? 'Estimated Net Profit' : 'Estimated Net Loss'}
                </span>
                <span
                  className={`font-mono tabular-nums text-2xl font-bold ${
                    quickStats.net >= 0
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {formatCurrency(quickStats.net, currencySymbol)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="block text-slate-500 dark:text-slate-400">Est. Fees</span>
                  <span className="font-mono tabular-nums font-semibold text-amber-700 dark:text-amber-400">
                    {formatCurrency(quickStats.fees, currencySymbol)}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-500 dark:text-slate-400">Margin</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-slate-100">
                    {formatPercent(quickStats.margin)}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-500 dark:text-slate-400">ROI</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-slate-100">
                    {formatPercent(quickStats.roi)}
                  </span>
                </div>
              </div>
              <a
                href="/calculators/profit-calculator"
                onClick={(e) => handleNav(e, '/calculators/profit-calculator')}
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                <span>Open full Profit Calculator</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Used Calculators (populated dynamically from localStorage) */}
      {recentIds.length > 0 && (
        <section aria-labelledby="recent-heading" className="py-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <h2 id="recent-heading" className="font-display text-lg font-bold text-slate-900 dark:text-slate-50">
              Recently Used Calculators
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {recentIds.map((slug) => {
              const calc = CALCULATORS[slug];
              return (
                <a
                  key={calc.id}
                  href={`/calculators/${calc.id}`}
                  onClick={(e) => handleNav(e, `/calculators/${calc.id}`)}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3.5 hover:border-emerald-600/60 dark:hover:border-emerald-500/60 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {CATEGORIES[calc.category].shortName}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                      {calc.name}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 ml-3" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured Calculators */}
      <section aria-labelledby="featured-heading" className="py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <div>
            <h2 id="featured-heading" className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Featured Seller Calculators
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Core tools for pricing products, checking marketplace fees, and scaling ad campaigns.
            </p>
          </div>
          <a
            href="/calculators"
            onClick={(e) => handleNav(e, '/calculators')}
            className="text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:underline whitespace-nowrap shrink-0"
          >
            View directory
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_CALCULATOR_IDS.map((id) => {
            const calc = CALCULATORS[id];
            const cat = CATEGORIES[calc.category];
            const Icon = getCategoryIcon(calc.category);
            return (
              <a
                key={calc.id}
                href={`/calculators/${calc.id}`}
                onClick={(e) => handleNav(e, `/calculators/${calc.id}`)}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:-translate-y-0.5 hover:border-emerald-600/60 dark:hover:border-emerald-500/60 transition-all duration-150"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {cat.shortName} · Featured
                    </span>
                    <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  </div>
                  <h3 className="mt-2 font-display text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {calc.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {calc.tagline}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Calculate</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Most Popular Calculators + Filterable Complete Suite */}
      <section id="all-calculators" className="py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Complete Calculator Suite
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
              Explore all {CALCULATOR_LIST.length} SellerMath tools or filter by marketplace, payments, profit, ads, and finance.
            </p>
          </div>
        </div>

        {/* Most Popular Shortcuts */}
        <div className="mb-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
            Most Popular Right Now
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {POPULAR_CALCULATOR_IDS.map((id) => {
              const calc = CALCULATORS[id];
              return (
                <a
                  key={calc.id}
                  href={`/calculators/${calc.id}`}
                  onClick={(e) => handleNav(e, `/calculators/${calc.id}`)}
                  className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:border-emerald-600/60 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>{calc.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter calculators by category"
          className="mb-6 flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit max-w-full"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
            className={`rounded-md px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            All ({CALCULATOR_LIST.length})
          </button>
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              aria-selected={activeFilter === cat.slug}
              onClick={() => setActiveFilter(cat.slug)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeFilter === cat.slug
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {cat.shortName}
            </button>
          ))}
        </div>

        {/* Calculator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCalculators.map((calc) => {
            const cat = CATEGORIES[calc.category];
            return (
              <a
                key={calc.id}
                href={`/calculators/${calc.id}`}
                onClick={(e) => handleNav(e, `/calculators/${calc.id}`)}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-emerald-600/60 dark:hover:border-emerald-500/60 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{cat.name}</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {calc.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {calc.tagline}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <span>Open calculator</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* AdSense Horizontal Placement */}
      <div className="my-4">
        <AdSlot slotId="home-mid-banner" format="horizontal" />
      </div>

      {/* Category Hubs */}
      <section aria-labelledby="categories-heading" className="py-10 border-b border-slate-200 dark:border-slate-800">
        <h2 id="categories-heading" className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6">
          Explore Calculator Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORY_LIST.map((cat) => {
            const tools = CALCULATOR_LIST.filter((c) => c.category === cat.slug);
            const Icon = getCategoryIcon(cat.slug);
            return (
              <div
                key={cat.slug}
                className="flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                      <a
                        href={`/category/${cat.slug}`}
                        onClick={(e) => handleNav(e, `/category/${cat.slug}`)}
                        className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                      >
                        {cat.name}
                      </a>
                    </h3>
                    <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 dark:border-slate-800 pt-3">
                    {tools.map((tool) => (
                      <li key={tool.id}>
                        <a
                          href={`/calculators/${tool.id}`}
                          onClick={(e) => handleNav(e, `/calculators/${tool.id}`)}
                          className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                        >
                          {tool.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`/category/${cat.slug}`}
                  onClick={(e) => handleNav(e, `/category/${cat.slug}`)}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Editorial Blog Highlights */}
      <section aria-labelledby="blog-heading" className="py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <h2 id="blog-heading" className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Latest Ecommerce Profit &amp; Fee Guides
            </h2>
          </div>
          <a
            href="/blog"
            onClick={(e) => handleNav(e, '/blog')}
            className="text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:underline whitespace-nowrap shrink-0"
          >
            All articles
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={(e) => handleNav(e, `/blog/${post.slug}`)}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-emerald-600/60 dark:hover:border-emerald-500/60 transition-colors"
            >
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {post.category} · {post.readTime}
                </p>
                <h3 className="mt-2 font-display text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {post.excerpt}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <span>Read guide</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Partner / Affiliate Readiness */}
      <div className="py-8">
        <PartnerStrip onNavigate={onNavigate} />
      </div>

      {/* Global FAQ */}
      <FaqSection
        title="SellerMath Frequently Asked Questions"
        subtitle="Answers about marketplace fee structures, payment processing, and seller margin formulas."
        items={GLOBAL_FAQS}
      />
    </div>
  );
}

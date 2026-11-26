import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Zap } from 'lucide-react';
import { CATEGORY_LIST } from '../data/catalog';

interface AboutViewProps {
  onNavigate: (path: string) => void;
}

export function AboutView({ onNavigate }: AboutViewProps) {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <a href="/" onClick={(e) => handleNav(e, '/')} className="hover:text-slate-900 dark:hover:text-slate-100">
          Home
        </a>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-slate-800 dark:text-slate-200">About</span>
      </nav>

      <header className="pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
          About SellerMath
        </h1>
        <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          SellerMath is an independent financial calculator platform built for marketplace sellers, dropshippers, independent makers, and growing e-commerce brands.
        </p>
      </header>

      <section className="py-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <h2 className="mt-3 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
              Instant Client-Side Math
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Zero server round-trips. Every slider, preset, and decimal input updates results immediately in your browser.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <Lock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <h2 className="mt-3 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
              Private by Design
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Your supplier costs, ad CPAs, and profit margins never leave your device or touch external databases.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <h2 className="mt-3 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
              Transparent Formulas
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every tool displays its exact mathematical equation, itemized deduction lines, and a worked numerical example.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-50">
            How We Keep Fee Schedules Accurate
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Marketplace referral rates, per-order fixed fees, and payment gateway surcharges change periodically across eBay, Amazon FBA, Etsy, TikTok Shop, Walmart, PayPal, Stripe, and Square. SellerMath reviews published rate cards regularly and gives every seller full override controls so custom negotiated tiers can always be modeled accurately.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
              <span>21 specialized calculators across 5 ecommerce finance categories</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
              <span>Accessible WCAG-compliant light and dark themes</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
              <span>Edge-cached static architecture ready for instant global delivery</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
            Start Using SellerMath
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CATEGORY_LIST.map((cat) => (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={(e) => handleNav(e, `/category/${cat.slug}`)}
                className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-200 hover:border-emerald-600/60 transition-colors"
              >
                <span>{cat.name}</span>
                <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

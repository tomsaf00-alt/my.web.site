import { ArrowRight } from 'lucide-react';
import { POPULAR_CALCULATOR_IDS, CALCULATORS } from '../data/catalog';

interface NotFoundViewProps {
  onNavigate: (path: string) => void;
}

export function NotFoundView({ onNavigate }: NotFoundViewProps) {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 text-center">
      <p className="text-xs font-mono text-slate-500 dark:text-slate-400">404 · Page Not Found</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
        We Could Not Find That Page
      </h1>
      <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
        The calculator or guide URL may have moved. Jump back to the homepage or open one of our most popular tools below.
      </p>

      <div className="mt-6 flex justify-center gap-3">
        <a
          href="/"
          onClick={(e) => handleNav(e, '/')}
          className="inline-flex h-11 items-center rounded-lg bg-emerald-600 hover:bg-emerald-700 px-5 text-sm font-semibold text-white transition-colors"
        >
          Back to Homepage
        </a>
        <a
          href="/calculators"
          onClick={(e) => handleNav(e, '/calculators')}
          className="inline-flex h-11 items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          All 21 Calculators
        </a>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
        {POPULAR_CALCULATOR_IDS.map((id) => {
          const calc = CALCULATORS[id];
          return (
            <a
              key={calc.id}
              href={`/calculators/${calc.id}`}
              onClick={(e) => handleNav(e, `/calculators/${calc.id}`)}
              className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-200 hover:border-emerald-600/60 transition-colors"
            >
              <span>{calc.name}</span>
              <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </section>
  );
}

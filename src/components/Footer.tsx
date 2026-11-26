import { CALCULATOR_LIST, CATEGORY_LIST } from '../data/catalog';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1 space-y-3">
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="font-display text-lg font-bold text-slate-900 dark:text-slate-50"
            >
              SellerMath
            </a>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Financial calculation platform for e-commerce sellers, dropshippers, and marketplace brands.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {CATEGORY_LIST.map((cat) => (
                <li key={cat.slug}>
                  <a
                    href={`/category/${cat.slug}`}
                    onClick={(e) => handleNav(e, `/category/${cat.slug}`)}
                    className="text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Marketplace &amp; Payments
            </h3>
            <ul className="space-y-2 text-sm">
              {CALCULATOR_LIST.filter(
                (c) => c.category === 'marketplace-fees' || c.category === 'payment-fees'
              ).map((calc) => (
                <li key={calc.id}>
                  <a
                    href={`/calculators/${calc.id}`}
                    onClick={(e) => handleNav(e, `/calculators/${calc.id}`)}
                    className="text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    {calc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Profit, Ads &amp; Finance
            </h3>
            <ul className="space-y-2 text-sm">
              {CALCULATOR_LIST.filter(
                (c) =>
                  c.category === 'profit-pricing' ||
                  c.category === 'advertising-calculators' ||
                  c.category === 'finance-calculators'
              ).map((calc) => (
                <li key={calc.id}>
                  <a
                    href={`/calculators/${calc.id}`}
                    onClick={(e) => handleNav(e, `/calculators/${calc.id}`)}
                    className="text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    {calc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/calculators"
                  onClick={(e) => handleNav(e, '/calculators')}
                  className="text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                >
                  All {CALCULATOR_LIST.length} Calculators
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  onClick={(e) => handleNav(e, '/blog')}
                  className="text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                >
                  SellerMath Blog
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNav(e, '/about')}
                  className="text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                >
                  About SellerMath
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNav(e, '/contact')}
                  className="text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                >
                  Contact &amp; Sponsorships
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => handleNav(e, '/faq')}
                  className="text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                >
                  Help &amp; FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-6 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} SellerMath. Free e-commerce financial calculators.</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/privacy-policy"
              onClick={(e) => handleNav(e, '/privacy-policy')}
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/terms"
              onClick={(e) => handleNav(e, '/terms')}
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Terms
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/sitemap.xml"
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Sitemap
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/robots.txt"
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Robots.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

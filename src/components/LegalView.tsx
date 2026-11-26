interface LegalViewProps {
  page: 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

export function LegalView({ page, onNavigate }: LegalViewProps) {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const isPrivacy = page === 'privacy';

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <a href="/" onClick={(e) => handleNav(e, '/')} className="hover:text-slate-900 dark:hover:text-slate-100">
          Home
        </a>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-slate-800 dark:text-slate-200">
          {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        </span>
      </nav>

      <header className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">Effective November 26, 2026</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        </h1>
      </header>

      {isPrivacy ? (
        <div className="py-8 space-y-6 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
              1. Local Client-Side Calculations
            </h2>
            <p>
              All SellerMath calculators execute entirely inside your web browser. Product costs, shipping expenses, revenue figures, and ad metrics entered into any calculator are never transmitted to or stored on SellerMath servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
              2. Browser Local Storage
            </h2>
            <p>
              SellerMath uses browser <code>localStorage</code> solely to remember your Light/Dark theme preference (<code>sellermath-theme</code>) and your four most recently used calculators (<code>sellermath-recent-calculators</code>). You can clear these entries at any time through your browser settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
              3. Advertising &amp; Affiliate Disclosure
            </h2>
            <p>
              SellerMath supports free access to all financial tools via Google AdSense display advertising, clearly labeled partner workflow recommendations, and sponsored educational guides. Third-party ad networks such as Google may use cookies to serve relevant advertisements according to their privacy policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
              4. Contact Regarding Privacy
            </h2>
            <p>
              Questions about this policy can be submitted directly through the{' '}
              <a
                href="/contact"
                onClick={(e) => handleNav(e, '/contact')}
                className="font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                SellerMath Contact page
              </a>
              .
            </p>
          </section>
        </div>
      ) : (
        <div className="py-8 space-y-6 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
              1. Informational Estimates Only
            </h2>
            <p>
              SellerMath provides fee, margin, markup, ROI, tax, and inventory calculators for planning and educational purposes only. Marketplace fee schedules (including eBay, Amazon FBA, Etsy, TikTok Shop, and Walmart) and payment gateway rates (PayPal, Stripe, Square) vary by merchant tier, category, and region. Always verify final figures against your official seller dashboard and consult a qualified accountant for tax filings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
              2. Acceptable Use
            </h2>
            <p>
              You may freely use SellerMath calculators and exported CSV summaries for personal, freelance, or commercial e-commerce business planning. Automated scraping or republishing of SellerMath source code and editorial guides without permission is prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
              3. Limitation of Liability
            </h2>
            <p>
              SellerMath is provided &ldquo;as is&rdquo; without warranties of any kind. SellerMath is not liable for pricing errors, marketplace fee updates, ad spend losses, or business decisions made using estimates from this site.
            </p>
          </section>
        </div>
      )}
    </article>
  );
}

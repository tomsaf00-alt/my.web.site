import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { ConsentBanner } from './components/ConsentBanner';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { BLOG_POSTS } from './data/blog';
import { CALCULATORS, CALCULATOR_LIST, CATEGORIES, GLOBAL_FAQS } from './data/catalog';
import { useCurrency } from './hooks/useCurrency';
import { useRecentlyUsed } from './hooks/useRecentlyUsed';
import { SeoConfig, useSeoHead } from './hooks/useSeoHead';
import { CalculatorSlug, CategorySlug } from './types/calculator';

const CalculatorWorkspace = lazy(() =>
  import('./components/CalculatorWorkspace').then((m) => ({ default: m.CalculatorWorkspace }))
);
const CategoryView = lazy(() =>
  import('./components/CategoryView').then((m) => ({ default: m.CategoryView }))
);
const BlogView = lazy(() =>
  import('./components/BlogView').then((m) => ({ default: m.BlogView }))
);
const AboutView = lazy(() =>
  import('./components/AboutView').then((m) => ({ default: m.AboutView }))
);
const ContactView = lazy(() =>
  import('./components/ContactView').then((m) => ({ default: m.ContactView }))
);
const FaqPageView = lazy(() =>
  import('./components/FaqPageView').then((m) => ({ default: m.FaqPageView }))
);
const LegalView = lazy(() =>
  import('./components/LegalView').then((m) => ({ default: m.LegalView }))
);
const NotFoundView = lazy(() =>
  import('./components/NotFoundView').then((m) => ({ default: m.NotFoundView }))
);

type RouteMatch =
  | { type: 'home' }
  | { type: 'all-calculators' }
  | { type: 'faq' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'privacy' }
  | { type: 'terms' }
  | { type: 'blog'; slug?: string }
  | { type: 'category'; slug: CategorySlug }
  | { type: 'calculator'; slug: CalculatorSlug }
  | { type: 'not-found' };

function matchRoute(pathname: string): RouteMatch {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/') return { type: 'home' };
  if (clean === '/calculators') return { type: 'all-calculators' };
  if (clean === '/faq') return { type: 'faq' };
  if (clean === '/about') return { type: 'about' };
  if (clean === '/contact') return { type: 'contact' };
  if (clean === '/privacy-policy') return { type: 'privacy' };
  if (clean === '/terms') return { type: 'terms' };
  if (clean === '/blog') return { type: 'blog' };

  if (clean.startsWith('/blog/')) {
    const slug = clean.slice('/blog/'.length);
    if (BLOG_POSTS.some((p) => p.slug === slug)) {
      return { type: 'blog', slug };
    }
    return { type: 'not-found' };
  }

  if (clean.startsWith('/category/')) {
    const slug = clean.slice('/category/'.length) as CategorySlug;
    if (slug in CATEGORIES) {
      return { type: 'category', slug };
    }
    return { type: 'not-found' };
  }

  if (clean.startsWith('/calculators/')) {
    const slug = clean.slice('/calculators/'.length) as CalculatorSlug;
    if (slug in CALCULATORS) {
      return { type: 'calculator', slug };
    }
    return { type: 'not-found' };
  }

  return { type: 'not-found' };
}

function RouteFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12" aria-busy="true" aria-label="Loading view">
      <div className="h-8 w-56 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <div className="mt-4 h-4 w-96 max-w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 h-80 rounded-xl bg-slate-200/70 dark:bg-slate-900 animate-pulse" />
        <div className="lg:col-span-7 h-80 rounded-xl bg-slate-200/70 dark:bg-slate-900 animate-pulse" />
      </div>
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [isEmbed, setIsEmbed] = useState<boolean>(() =>
    new URLSearchParams(window.location.search).get('embed') === '1'
  );
  const [isDark, setIsDark] = useState<boolean>(() =>
    document.documentElement.classList.contains('dark')
  );
  const { recentIds, recordUsage } = useRecentlyUsed();
  const { currency, setCurrencyCode } = useCurrency();

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setIsEmbed(new URLSearchParams(window.location.search).get('embed') === '1');
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((path: string) => {
    if (path !== window.location.pathname || window.location.search) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      setIsEmbed(false);
    }
    window.scrollTo({ top: 0 });
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        try {
          localStorage.setItem('sellermath-theme', 'dark');
        } catch {
          // ignore storage errors
        }
      } else {
        document.documentElement.classList.remove('dark');
        try {
          localStorage.setItem('sellermath-theme', 'light');
        } catch {
          // ignore storage errors
        }
      }
      return next;
    });
  }, []);

  const route = useMemo(() => matchRoute(currentPath), [currentPath]);

  const seoConfig: SeoConfig = useMemo(() => {
    if (route.type === 'calculator') {
      const calc = CALCULATORS[route.slug];
      const cat = CATEGORIES[calc.category];
      return {
        title: calc.seoTitle,
        description: calc.seoDescription,
        path: `/calculators/${calc.id}`,
        appName: `${calc.name} – SellerMath`,
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: cat.name, path: `/category/${cat.slug}` },
          { name: calc.name, path: `/calculators/${calc.id}` },
        ],
        faqs: calc.faqs,
      };
    }

    if (route.type === 'category') {
      const cat = CATEGORIES[route.slug];
      return {
        title: cat.seoTitle,
        description: cat.seoDescription,
        path: `/category/${cat.slug}`,
        appName: `${cat.name} – SellerMath`,
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: cat.name, path: `/category/${cat.slug}` },
        ],
        faqs: cat.faqs,
      };
    }

    if (route.type === 'all-calculators') {
      return {
        title: `All ${CALCULATOR_LIST.length} Ecommerce, Fee & Profit Calculators | SellerMath`,
        description:
          'Browse every SellerMath calculator across Marketplace Fees, Payment Processing, Profit & Margin, Advertising ROAS/CPA, and Ecommerce Finance.',
        path: '/calculators',
        appName: 'SellerMath Calculators Directory',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Calculators', path: '/calculators' },
        ],
      };
    }

    if (route.type === 'blog') {
      const post = route.slug ? BLOG_POSTS.find((p) => p.slug === route.slug) : undefined;
      if (post) {
        return {
          title: post.seoTitle,
          description: post.seoDescription,
          path: `/blog/${post.slug}`,
          appName: 'SellerMath Blog',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ],
          article: {
            headline: post.title,
            datePublished: post.publishedAt,
            section: post.category,
          },
        };
      }
      return {
        title: 'SellerMath Blog – Ecommerce Fee, Pricing & Margin Guides',
        description:
          'Read guides on eBay fees, Amazon FBA Break-Even ACoS, Etsy Offsite Ads, Shopify dropshipping unit economics, and payment processing.',
        path: '/blog',
        appName: 'SellerMath Blog',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ],
      };
    }

    if (route.type === 'about') {
      return {
        title: 'About SellerMath – Methodology & Mission',
        description:
          'Learn how SellerMath helps ecommerce sellers, dropshippers, and small businesses calculate marketplace fees, profit margins, and ROAS.',
        path: '/about',
        appName: 'About SellerMath',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ],
      };
    }

    if (route.type === 'contact') {
      return {
        title: 'Contact SellerMath – Fee Updates & Partnerships',
        description:
          'Contact SellerMath to request new calculators, report updated marketplace fee tiers, or inquire about sponsored placements.',
        path: '/contact',
        appName: 'Contact SellerMath',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ],
      };
    }

    if (route.type === 'privacy') {
      return {
        title: 'Privacy Policy | SellerMath',
        description:
          'Read the SellerMath Privacy Policy covering local browser calculations, storage preferences, advertising, and affiliate disclosures.',
        path: '/privacy-policy',
        appName: 'SellerMath Privacy Policy',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ],
      };
    }

    if (route.type === 'terms') {
      return {
        title: 'Terms of Service | SellerMath',
        description:
          'Review the SellerMath Terms of Service and calculation disclaimer for marketplace fee, margin, and tax estimators.',
        path: '/terms',
        appName: 'SellerMath Terms of Service',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Terms of Service', path: '/terms' },
        ],
      };
    }

    if (route.type === 'faq') {
      return {
        title: 'SellerMath FAQ – Fee & Profit Calculation Help',
        description:
          'Answers to common questions about eBay, Etsy, Amazon FBA, TikTok Shop, Walmart, PayPal, and Stripe fees alongside margin and ROI math.',
        path: '/faq',
        appName: 'SellerMath FAQ',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ],
        faqs: GLOBAL_FAQS,
      };
    }

    if (route.type === 'not-found') {
      return {
        title: 'Page Not Found | SellerMath',
        description: `The requested SellerMath page was not found. Browse all ${CALCULATOR_LIST.length} ecommerce calculators.`,
        path: currentPath,
        noIndex: true,
        breadcrumbs: [{ name: 'Home', path: '/' }],
      };
    }

    return {
      title: 'SellerMath – Free Ecommerce Fee, Profit & Margin Calculators',
      description:
        'Calculate eBay, Amazon FBA, Etsy, TikTok Shop, Walmart, PayPal, and Stripe fees alongside profit, ROI, margin, ROAS, and break-even numbers.',
      path: '/',
      appName: 'SellerMath',
      breadcrumbs: [{ name: 'Home', path: '/' }],
      faqs: GLOBAL_FAQS,
    };
  }, [route, currentPath]);

  useSeoHead(seoConfig);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {!isEmbed && (
        <Header
          currentPath={currentPath}
          onNavigate={navigate}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      )}

      <main className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          {route.type === 'home' && (
            <HomeView
              onNavigate={navigate}
              recentIds={recentIds}
              currencySymbol={currency.symbol}
            />
          )}
          {route.type === 'all-calculators' && <CategoryView categorySlug="all" onNavigate={navigate} />}
          {route.type === 'category' && <CategoryView categorySlug={route.slug} onNavigate={navigate} />}
          {route.type === 'calculator' && (
            <CalculatorWorkspace
              calculatorId={route.slug}
              onNavigate={navigate}
              onUseCalculator={recordUsage}
              currencyCode={currency.code}
              currencySymbol={currency.symbol}
              onChangeCurrency={setCurrencyCode}
              isEmbed={isEmbed}
            />
          )}
          {route.type === 'blog' && <BlogView articleSlug={route.slug} onNavigate={navigate} />}
          {route.type === 'about' && <AboutView onNavigate={navigate} />}
          {route.type === 'contact' && <ContactView onNavigate={navigate} />}
          {route.type === 'privacy' && <LegalView page="privacy" onNavigate={navigate} />}
          {route.type === 'terms' && <LegalView page="terms" onNavigate={navigate} />}
          {route.type === 'faq' && <FaqPageView onNavigate={navigate} />}
          {route.type === 'not-found' && <NotFoundView onNavigate={navigate} />}
        </Suspense>
      </main>

      {!isEmbed && <Footer onNavigate={navigate} />}
      {!isEmbed && <ConsentBanner />}
    </div>
  );
}

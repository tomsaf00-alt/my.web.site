import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import { BLOG_POSTS } from './src/data/blog';
import { CALCULATOR_LIST, CATEGORIES, CATEGORY_LIST, GLOBAL_FAQS } from './src/data/catalog';
import { FaqItem } from './src/types/calculator';

interface PrerenderRoute {
  routePath: string;
  title: string;
  description: string;
  appName: string;
  breadcrumbs: Array<{ name: string; path: string }>;
  faqs?: FaqItem[];
  article?: { headline: string; datePublished: string; section: string };
}

function escapeHtmlAttr(val: string): string {
  return val
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(val: string): string {
  return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildRouteList(): PrerenderRoute[] {
  const routes: PrerenderRoute[] = [
    {
      routePath: '/',
      title: 'SellerMath – Free Ecommerce Fee, Profit & Margin Calculators',
      description:
        'Calculate eBay, Amazon FBA, Etsy, TikTok Shop, Walmart, PayPal, and Stripe fees alongside profit, ROI, margin, ROAS, and break-even numbers.',
      appName: 'SellerMath',
      breadcrumbs: [{ name: 'Home', path: '/' }],
      faqs: GLOBAL_FAQS,
    },
    {
      routePath: '/calculators',
      title: `All ${CALCULATOR_LIST.length} Ecommerce, Fee & Profit Calculators | SellerMath`,
      description:
        'Browse every SellerMath calculator across Marketplace Fees, Payment Processing, Profit & Margin, Advertising ROAS/CPA, and Ecommerce Finance.',
      appName: 'SellerMath Calculators Directory',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Calculators', path: '/calculators' },
      ],
    },
    {
      routePath: '/blog',
      title: 'SellerMath Blog – Ecommerce Fee, Pricing & Margin Guides',
      description:
        'Read guides on eBay fees, Amazon FBA Break-Even ACoS, Etsy Offsite Ads, Shopify dropshipping unit economics, and payment processing.',
      appName: 'SellerMath Blog',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ],
    },
    {
      routePath: '/about',
      title: 'About SellerMath – Methodology & Mission',
      description:
        'Learn how SellerMath helps ecommerce sellers, dropshippers, and small businesses calculate marketplace fees, profit margins, and ROAS.',
      appName: 'About SellerMath',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ],
    },
    {
      routePath: '/contact',
      title: 'Contact SellerMath – Fee Updates & Partnerships',
      description:
        'Contact SellerMath to request new calculators, report updated marketplace fee tiers, or inquire about sponsored placements.',
      appName: 'Contact SellerMath',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    {
      routePath: '/faq',
      title: 'SellerMath FAQ – Fee & Profit Calculation Help',
      description:
        'Answers to common questions about eBay, Etsy, Amazon FBA, TikTok Shop, Walmart, PayPal, and Stripe fees alongside margin and ROI math.',
      appName: 'SellerMath FAQ',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ],
      faqs: GLOBAL_FAQS,
    },
    {
      routePath: '/privacy-policy',
      title: 'Privacy Policy | SellerMath',
      description:
        'Read the SellerMath Privacy Policy covering local browser calculations, storage preferences, advertising, and affiliate disclosures.',
      appName: 'SellerMath Privacy Policy',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
      ],
    },
    {
      routePath: '/terms',
      title: 'Terms of Service | SellerMath',
      description:
        'Review the SellerMath Terms of Service and calculation disclaimer for marketplace fee, margin, and tax estimators.',
      appName: 'SellerMath Terms of Service',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Terms of Service', path: '/terms' },
      ],
    },
  ];

  for (const cat of CATEGORY_LIST) {
    routes.push({
      routePath: `/category/${cat.slug}`,
      title: cat.seoTitle,
      description: cat.seoDescription,
      appName: `${cat.name} – SellerMath`,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: cat.name, path: `/category/${cat.slug}` },
      ],
      faqs: cat.faqs,
    });
  }

  for (const calc of CALCULATOR_LIST) {
    const cat = CATEGORIES[calc.category];
    routes.push({
      routePath: `/calculators/${calc.id}`,
      title: calc.seoTitle,
      description: calc.seoDescription,
      appName: `${calc.name} – SellerMath`,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: cat.name, path: `/category/${cat.slug}` },
        { name: calc.name, path: `/calculators/${calc.id}` },
      ],
      faqs: calc.faqs,
    });
  }

  for (const post of BLOG_POSTS) {
    routes.push({
      routePath: `/blog/${post.slug}`,
      title: post.seoTitle,
      description: post.seoDescription,
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
    });
  }

  return routes;
}

function renderHtmlForRoute(templateHtml: string, siteUrl: string, route: PrerenderRoute): string {
  const canonicalUrl = `${siteUrl}${route.routePath}`;
  const safeTitle = escapeHtmlText(route.title);
  const safeTitleAttr = escapeHtmlAttr(route.title);
  const safeDescAttr = escapeHtmlAttr(route.description);
  const safeUrlAttr = escapeHtmlAttr(canonicalUrl);

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'WebApplication',
      name: route.appName,
      url: canonicalUrl,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      description: route.description,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: route.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${siteUrl}${crumb.path}`,
      })),
    },
  ];

  if (route.article) {
    graph.push({
      '@type': 'Article',
      headline: route.article.headline,
      datePublished: route.article.datePublished,
      articleSection: route.article.section,
      description: route.description,
      author: { '@type': 'Organization', name: 'SellerMath Editorial' },
      publisher: { '@type': 'Organization', name: 'SellerMath' },
    });
  }

  if (route.faqs && route.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: route.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
    /</g,
    '\\u003c'
  );

  let html = templateHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${safeDescAttr}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${route.article ? 'article' : 'website'}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${safeTitleAttr}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?content="[\s\S]*?"\s*\/>/,
    `<meta property="og:description" content="${safeDescAttr}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${safeTitleAttr}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[\s\S]*?content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:description" content="${safeDescAttr}" />`
  );
  html = html.replace(
    /<script id="sellermath-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<link rel="canonical" href="${safeUrlAttr}" />\n    <meta property="og:url" content="${safeUrlAttr}" />\n    <script id="sellermath-jsonld" type="application/ld+json">${jsonLd}</script>`
  );

  return html;
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, { recursive: true, force: true });
          }
        },
      },
      {
        name: 'prerender-seo-routes',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) return;
          const distDir = path.resolve(__dirname, 'dist');
          const templatePath = path.join(distDir, 'index.html');
          if (!fs.existsSync(templatePath)) return;

          const templateHtml = fs.readFileSync(templatePath, 'utf-8');
          const siteUrl = (process.env.VITE_SITE_URL || 'https://sellermath.app')
            .trim()
            .replace(/\/+$/, '');
          const routes = buildRouteList();

          for (const route of routes) {
            const html = renderHtmlForRoute(templateHtml, siteUrl, route);
            if (route.routePath === '/') {
              fs.writeFileSync(templatePath, html, 'utf-8');
            } else {
              const outDir = path.join(distDir, route.routePath.replace(/^\/+/, ''));
              fs.mkdirSync(outDir, { recursive: true });
              fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
            }
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

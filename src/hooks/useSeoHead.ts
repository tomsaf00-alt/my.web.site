import { useEffect } from 'react';
import { ANALYTICS_DOMAIN, SITE_URL } from '../config/site';
import { FaqItem } from '../types/calculator';

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  breadcrumbs: Array<{ name: string; path: string }>;
  faqs?: FaqItem[];
  appName?: string;
  noIndex?: boolean;
  article?: {
    headline: string;
    datePublished: string;
    section: string;
  };
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

let analyticsInjected = false;

export function useSeoHead(config: SeoConfig) {
  useEffect(() => {
    if (ANALYTICS_DOMAIN && !analyticsInjected && typeof document !== 'undefined') {
      analyticsInjected = true;
      const script = document.createElement('script');
      script.defer = true;
      script.setAttribute('data-domain', ANALYTICS_DOMAIN);
      script.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(script);
    }

    const origin =
      typeof window !== 'undefined' && window.location.hostname !== 'localhost'
        ? window.location.origin
        : SITE_URL;
    const cleanPath = config.path.startsWith('/') ? config.path : `/${config.path}`;
    const fullUrl = `${origin}${cleanPath}`;

    document.title = config.title;
    upsertMeta('name', 'description', config.description);
    upsertMeta('name', 'robots', config.noIndex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('property', 'og:type', config.article ? 'article' : 'website');
    upsertMeta('property', 'og:title', config.title);
    upsertMeta('property', 'og:description', config.description);
    upsertMeta('property', 'og:url', fullUrl);
    upsertMeta('name', 'twitter:title', config.title);
    upsertMeta('name', 'twitter:description', config.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    const graph: Array<Record<string, unknown>> = [
      {
        '@type': 'WebApplication',
        name: config.appName || 'SellerMath',
        url: fullUrl,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        description: config.description,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: config.breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${origin}${crumb.path}`,
        })),
      },
    ];

    if (config.article) {
      graph.push({
        '@type': 'Article',
        headline: config.article.headline,
        datePublished: config.article.datePublished,
        articleSection: config.article.section,
        description: config.description,
        author: {
          '@type': 'Organization',
          name: 'SellerMath Editorial',
        },
        publisher: {
          '@type': 'Organization',
          name: 'SellerMath',
        },
      });
    }

    if (config.faqs && config.faqs.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: config.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    const payload = {
      '@context': 'https://schema.org',
      '@graph': graph,
    };

    let script = document.getElementById('sellermath-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'sellermath-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(payload);
  }, [
    config.title,
    config.description,
    config.path,
    config.appName,
    config.noIndex,
    config.breadcrumbs,
    config.faqs,
    config.article,
  ]);
}

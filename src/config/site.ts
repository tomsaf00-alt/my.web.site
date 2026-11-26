const rawSiteUrl = (import.meta.env.VITE_SITE_URL || 'https://sellermath.app').trim();

export const SITE_URL = rawSiteUrl.replace(/\/+$/, '');

const rawAdsense = (import.meta.env.VITE_ADSENSE_CLIENT || '').trim();
export const ADSENSE_CLIENT =
  rawAdsense && /^ca-pub-\d{10,20}$/.test(rawAdsense) && rawAdsense !== 'ca-pub-0000000000000000'
    ? rawAdsense
    : '';

export const CONTACT_ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT || '').trim();
export const CONTACT_EMAIL = (import.meta.env.VITE_CONTACT_EMAIL || 'hello@sellermath.app').trim();
export const ANALYTICS_DOMAIN = (import.meta.env.VITE_PLAUSIBLE_DOMAIN || '').trim();

export function trackEvent(eventName: string, props?: Record<string, string | number>) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    plausible?: (event: string, opts?: { props?: Record<string, string | number> }) => void;
  };
  if (typeof w.plausible === 'function') {
    w.plausible(eventName, props ? { props } : undefined);
  }
}

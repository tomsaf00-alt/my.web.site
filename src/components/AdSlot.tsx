import { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ADSENSE_CLIENT } from '../config/site';
import { PARTNER_RECOMMENDATIONS } from '../data/catalog';
import { getStoredConsent } from './ConsentBanner';

interface AdSlotProps {
  slotId: string;
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

let adsenseScriptInjected = false;

export function AdSlot({ slotId, format = 'horizontal', className = '' }: AdSlotProps) {
  const [consent, setConsent] = useState(() => getStoredConsent());

  useEffect(() => {
    const onUpdate = () => setConsent(getStoredConsent());
    window.addEventListener('sellermath-consent-updated', onUpdate);
    return () => window.removeEventListener('sellermath-consent-updated', onUpdate);
  }, []);

  useEffect(() => {
    if (!ADSENSE_CLIENT || consent === 'essential') return;

    if (!adsenseScriptInjected && typeof document !== 'undefined') {
      adsenseScriptInjected = true;
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`;
      document.head.appendChild(script);
    }

    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // ignore ad script initialization errors
    }
  }, [slotId, consent]);

  if (!ADSENSE_CLIENT || consent === 'essential') {
    return null;
  }

  const heightClass = format === 'rectangle' ? 'min-h-[250px]' : 'min-h-[90px]';

  return (
    <aside
      aria-label="Advertisement"
      className={`no-print rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/50 px-4 py-3 text-center ${heightClass} flex flex-col items-center justify-center ${className}`}
    >
      <span className="text-[11px] font-medium tracking-wide text-slate-500 dark:text-slate-400 mb-1">
        Advertisement
      </span>
      <ins
        className="adsbygoogle block w-full"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

interface PartnerStripProps {
  onNavigate: (path: string) => void;
}

export function PartnerStrip({ onNavigate }: PartnerStripProps) {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <section
      aria-label="Recommended Seller Workflows"
      className="no-print rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
          Recommended Seller Workflows &amp; Partner Tools
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Sponsored partner links
        </span>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {PARTNER_RECOMMENDATIONS.map((partner) => (
          <div
            key={partner.name}
            className="flex flex-col justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4"
          >
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {partner.category} · {partner.disclosure}
              </p>
              <h3 className="mt-1 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                {partner.name}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {partner.description}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {partner.externalUrl ? (
                <a
                  href={partner.externalUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  <span>{partner.ctaLabel}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
              <a
                href={partner.targetPath}
                onClick={(e) => handleNav(e, partner.targetPath)}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:underline"
              >
                <span>Open related calculator</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

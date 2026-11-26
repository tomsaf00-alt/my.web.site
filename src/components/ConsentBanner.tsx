import { useEffect, useState } from 'react';
import { ADSENSE_CLIENT } from '../config/site';

export type ConsentChoice = 'accepted' | 'essential';

const CONSENT_KEY = 'sellermath-consent';

export function getStoredConsent(): ConsentChoice | null {
  try {
    const val = localStorage.getItem(CONSENT_KEY);
    return val === 'accepted' || val === 'essential' ? val : null;
  } catch {
    return null;
  }
}

interface ConsentBannerProps {
  onConsentChange?: (choice: ConsentChoice) => void;
}

export function ConsentBanner({ onConsentChange }: ConsentBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT) return;
    if (!getStoredConsent()) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const choose = (choice: ConsentChoice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // ignore storage errors
    }
    setVisible(false);
    onConsentChange?.(choice);
    window.dispatchEvent(new CustomEvent('sellermath-consent-updated', { detail: choice }));
  };

  return (
    <aside
      role="region"
      aria-label="Privacy and cookie preferences"
      className="no-print fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm px-4 py-3 shadow-lg"
    >
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          SellerMath runs all math locally in your browser. Accept cookies to support personalized ads, or choose essential-only storage.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="rounded-lg bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white cursor-pointer"
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
}

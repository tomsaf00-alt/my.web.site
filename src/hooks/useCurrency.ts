import { useCallback, useState } from 'react';
import { CurrencyCode, CurrencyOption } from '../types/calculator';

export const CURRENCIES: CurrencyOption[] = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'CAD', symbol: 'CA$', label: 'CAD (CA$)' },
  { code: 'AUD', symbol: 'A$', label: 'AUD (A$)' },
];

export const CURRENCY_OPTIONS: CurrencyOption[] = CURRENCIES;

const STORAGE_KEY = 'sellermath-currency';

function readInitialCurrency(): CurrencyCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (saved && CURRENCIES.some((c) => c.code === saved)) {
      return saved;
    }
  } catch {
    // ignore storage errors
  }
  return 'USD';
}

export function useCurrency() {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>(() => readInitialCurrency());

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyCode(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore storage errors
    }
  }, []);

  const currency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];

  return { currency, setCurrency, setCurrencyCode: setCurrency };
}

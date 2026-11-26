import { useCallback, useState } from 'react';
import { CALCULATORS } from '../data/catalog';
import { CalculatorSlug } from '../types/calculator';

const STORAGE_KEY = 'sellermath-recent-calculators';
const MAX_RECENT = 4;

function readStored(): CalculatorSlug[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is CalculatorSlug => typeof id === 'string' && id in CALCULATORS);
  } catch {
    return [];
  }
}

export function useRecentlyUsed() {
  const [recentIds, setRecentIds] = useState<CalculatorSlug[]>(() => readStored());

  const recordUsage = useCallback((slug: CalculatorSlug) => {
    setRecentIds((prev) => {
      const next = [slug, ...prev.filter((item) => item !== slug)].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  return { recentIds, recordUsage };
}

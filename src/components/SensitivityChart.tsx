import {
  BatchSkuRowResult,
  formatCurrency,
  MarketplaceChannelResult,
} from '../utils/calculations';

export interface SensitivityPoint {
  label: string;
  value: number;
  sublabel?: string;
}

interface SensitivityChartProps {
  title: string;
  subtitle: string;
  points: SensitivityPoint[];
  currencySymbol: string;
  valueType?: 'currency' | 'percent';
}

export function SensitivityChart({
  title,
  subtitle,
  points,
  currencySymbol,
  valueType = 'currency',
}: SensitivityChartProps) {
  if (points.length === 0) return null;

  const maxAbs = Math.max(
    1,
    ...points.map((p) => Math.abs(p.value))
  );

  const fmt = (v: number) =>
    valueType === 'percent' ? `${v.toFixed(1)}%` : formatCurrency(v, currencySymbol);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
        <h2 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</span>
      </div>

      <div className="space-y-2.5">
        {points.map((pt) => {
          const widthPct = Math.min(100, Math.max(4, (Math.abs(pt.value) / maxAbs) * 100));
          const isPositive = pt.value >= 0;
          return (
            <div key={pt.label} className="grid grid-cols-12 items-center gap-3 text-xs">
              <div className="col-span-4 sm:col-span-4 truncate text-slate-700 dark:text-slate-300 font-medium">
                <span>{pt.label}</span>
                {pt.sublabel && (
                  <span className="ml-1.5 font-mono text-[11px] text-slate-400">{pt.sublabel}</span>
                )}
              </div>
              <div className="col-span-5 sm:col-span-6">
                <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${widthPct}%` }}
                    className={`h-full rounded-full transition-all duration-150 ${
                      isPositive
                        ? 'bg-emerald-600 dark:bg-emerald-500'
                        : 'bg-red-500 dark:bg-red-400'
                    }`}
                  />
                </div>
              </div>
              <div
                className={`col-span-3 sm:col-span-2 text-right font-mono tabular-nums font-semibold ${
                  isPositive
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {fmt(pt.value)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function buildComparisonChartPoints(channels: MarketplaceChannelResult[]): SensitivityPoint[] {
  return channels.map((ch) => ({
    label: ch.channel.split(' (')[0],
    sublabel: `${ch.marginPct.toFixed(0)}%`,
    value: ch.netProfit,
  }));
}

export function buildBatchChartPoints(rows: BatchSkuRowResult[]): SensitivityPoint[] {
  return [...rows]
    .sort((a, b) => b.totalProfit - a.totalProfit)
    .slice(0, 6)
    .map((r) => ({
      label: r.sku,
      sublabel: `${r.marginPct.toFixed(0)}%`,
      value: r.totalProfit,
    }));
}

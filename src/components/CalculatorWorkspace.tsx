import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Download,
  GitCompare,
  Printer,
  RotateCcw,
  Share2,
} from 'lucide-react';
import { trackEvent } from '../config/site';
import { BLOG_POSTS } from '../data/blog';
import { CALCULATORS, CATEGORIES } from '../data/catalog';
import { CURRENCY_OPTIONS } from '../hooks/useCurrency';
import { CalculationOutput, CalculatorSlug, CurrencyCode } from '../types/calculator';
import {
  auditBatchSkus,
  calculateAmazonFba,
  calculateBreakEven,
  calculateCpa,
  calculateDropshipping,
  calculateEbay,
  calculateEtsy,
  calculateInventoryReorder,
  calculateMargin,
  calculateMarkup,
  calculateMarketplaceComparison,
  calculatePaymentFee,
  calculateProductPricing,
  calculateProfit,
  calculateRoas,
  calculateRoi,
  calculateSalesTax,
  calculateTikTokShop,
  calculateWalmart,
  formatCurrency,
  formatInteger,
  formatPercent,
  parseBatchSkuCsv,
} from '../utils/calculations';
import { AdSlot, PartnerStrip } from './AdSlot';
import { CalculatorInputs } from './CalculatorInputs';
import {
  applyQueryParamsToState,
  buildScenarioShareUrl,
  CalculatorStateMap,
  DEFAULT_STATES,
  getStateKeyForSlug,
} from './calculatorState';
import { EmbedModal } from './EmbedModal';
import { FaqSection } from './FaqSection';
import {
  buildBatchChartPoints,
  buildComparisonChartPoints,
  SensitivityChart,
  SensitivityPoint,
} from './SensitivityChart';

interface CalculatorWorkspaceProps {
  calculatorId: CalculatorSlug;
  onNavigate: (path: string) => void;
  onUseCalculator?: (slug: CalculatorSlug) => void;
  currencyCode: CurrencyCode;
  currencySymbol: string;
  onChangeCurrency: (code: CurrencyCode) => void;
  isEmbed?: boolean;
}

interface ScenarioSnapshot {
  primaryValue: number;
  primaryFormat: CalculationOutput['primaryFormat'];
  formattedPrimary: string;
}

function formatPrimary(
  value: number,
  format: CalculationOutput['primaryFormat'],
  sym: string
): string {
  if (format === 'currency') return formatCurrency(value, sym);
  if (format === 'percent') return formatPercent(value);
  if (format === 'multiplier') return `${value.toFixed(2)}x`;
  return formatInteger(value);
}

export function CalculatorWorkspace({
  calculatorId,
  onNavigate,
  onUseCalculator,
  currencyCode,
  currencySymbol,
  onChangeCurrency,
  isEmbed = false,
}: CalculatorWorkspaceProps) {
  const meta = CALCULATORS[calculatorId];
  const category = CATEGORIES[meta.category];

  useEffect(() => {
    onUseCalculator?.(calculatorId);
    trackEvent('calculator_view', { calculator: calculatorId });
  }, [calculatorId, onUseCalculator]);

  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [embedOpen, setEmbedOpen] = useState(false);
  const [pinnedA, setPinnedA] = useState<ScenarioSnapshot | null>(null);

  const [ebay, setEbay] = useState(DEFAULT_STATES.ebay);
  const [etsy, setEtsy] = useState(DEFAULT_STATES.etsy);
  const [amazon, setAmazon] = useState(DEFAULT_STATES.amazon);
  const [tiktok, setTiktok] = useState(DEFAULT_STATES.tiktok);
  const [walmart, setWalmart] = useState(DEFAULT_STATES.walmart);
  const [marketplaceComparison, setMarketplaceComparison] = useState(
    DEFAULT_STATES.marketplaceComparison
  );
  const [paypal, setPaypal] = useState(DEFAULT_STATES.paypal);
  const [stripe, setStripe] = useState(DEFAULT_STATES.stripe);
  const [square, setSquare] = useState(DEFAULT_STATES.square);
  const [profit, setProfit] = useState(DEFAULT_STATES.profit);
  const [roi, setRoi] = useState(DEFAULT_STATES.roi);
  const [margin, setMargin] = useState(DEFAULT_STATES.margin);
  const [markup, setMarkup] = useState(DEFAULT_STATES.markup);
  const [breakeven, setBreakeven] = useState(DEFAULT_STATES.breakeven);
  const [productPricing, setProductPricing] = useState(DEFAULT_STATES.productPricing);
  const [dropshipping, setDropshipping] = useState(DEFAULT_STATES.dropshipping);
  const [batchCsv, setBatchCsv] = useState(DEFAULT_STATES.batchCsv);
  const [roas, setRoas] = useState(DEFAULT_STATES.roas);
  const [cpa, setCpa] = useState(DEFAULT_STATES.cpa);
  const [salesTax, setSalesTax] = useState(DEFAULT_STATES.salesTax);
  const [inventoryReorder, setInventoryReorder] = useState(DEFAULT_STATES.inventoryReorder);

  const state: CalculatorStateMap = {
    ebay,
    etsy,
    amazon,
    tiktok,
    walmart,
    marketplaceComparison,
    paypal,
    stripe,
    square,
    profit,
    roi,
    margin,
    markup,
    breakeven,
    productPricing,
    dropshipping,
    batchCsv,
    roas,
    cpa,
    salesTax,
    inventoryReorder,
  };

  const setters = {
    ebay: setEbay,
    etsy: setEtsy,
    amazon: setAmazon,
    tiktok: setTiktok,
    walmart: setWalmart,
    marketplaceComparison: setMarketplaceComparison,
    paypal: setPaypal,
    stripe: setStripe,
    square: setSquare,
    profit: setProfit,
    roi: setRoi,
    margin: setMargin,
    markup: setMarkup,
    breakeven: setBreakeven,
    productPricing: setProductPricing,
    dropshipping: setDropshipping,
    batchCsv: setBatchCsv,
    roas: setRoas,
    cpa: setCpa,
    salesTax: setSalesTax,
    inventoryReorder: setInventoryReorder,
  };

  // Clear pinned Scenario A when switching calculators and hydrate query params if present
  useEffect(() => {
    setPinnedA(null);
    if (typeof window === 'undefined' || !window.location.search) return;

    const params = new URLSearchParams(window.location.search);
    const curParam = params.get('cur') as CurrencyCode | null;
    if (curParam && CURRENCY_OPTIONS.some((c) => c.code === curParam)) {
      onChangeCurrency(curParam);
    }

    const key = getStateKeyForSlug(calculatorId);
    const hydrated = applyQueryParamsToState(
      DEFAULT_STATES[key] as unknown as Record<string, unknown>,
      window.location.search
    );
    const applySetter = setters[key] as (val: unknown) => void;
    applySetter(hydrated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatorId]);

  const comparisonResult = useMemo(
    () =>
      calculatorId === 'marketplace-comparison-calculator'
        ? calculateMarketplaceComparison(marketplaceComparison, currencySymbol)
        : null,
    [calculatorId, marketplaceComparison, currencySymbol]
  );

  const batchResult = useMemo(() => {
    if (calculatorId !== 'batch-sku-auditor') return null;
    const rows = parseBatchSkuCsv(batchCsv.csvText);
    return auditBatchSkus(rows, currencySymbol);
  }, [calculatorId, batchCsv.csvText, currencySymbol]);

  const output: CalculationOutput = useMemo(() => {
    switch (calculatorId) {
      case 'ebay-fee-calculator':
        return calculateEbay(ebay, currencySymbol);
      case 'etsy-fee-calculator':
        return calculateEtsy(etsy, currencySymbol);
      case 'amazon-fba-calculator':
        return calculateAmazonFba(amazon, currencySymbol);
      case 'tiktok-shop-calculator':
        return calculateTikTokShop(tiktok, currencySymbol);
      case 'walmart-seller-calculator':
        return calculateWalmart(walmart, currencySymbol);
      case 'marketplace-comparison-calculator':
        return comparisonResult!.output;
      case 'paypal-fee-calculator':
        return calculatePaymentFee({ ...paypal, currencySymbol }, 'PayPal');
      case 'stripe-fee-calculator':
        return calculatePaymentFee({ ...stripe, currencySymbol }, 'Stripe');
      case 'square-fee-calculator':
        return calculatePaymentFee({ ...square, currencySymbol }, 'Square');
      case 'profit-calculator':
        return calculateProfit(profit, currencySymbol);
      case 'roi-calculator':
        return calculateRoi(roi, currencySymbol);
      case 'margin-calculator':
        return calculateMargin(margin, currencySymbol);
      case 'markup-calculator':
        return calculateMarkup(markup, currencySymbol);
      case 'break-even-calculator':
        return calculateBreakEven(breakeven, currencySymbol);
      case 'product-pricing-calculator':
        return calculateProductPricing(productPricing, currencySymbol);
      case 'dropshipping-profit-calculator':
        return calculateDropshipping(dropshipping, currencySymbol);
      case 'batch-sku-auditor':
        return batchResult!.output;
      case 'roas-calculator':
        return calculateRoas(roas, currencySymbol);
      case 'cpa-calculator':
        return calculateCpa(cpa, currencySymbol);
      case 'sales-tax-calculator':
        return calculateSalesTax(salesTax, currencySymbol);
      case 'inventory-reorder-calculator':
        return calculateInventoryReorder(inventoryReorder, currencySymbol);
    }
  }, [
    calculatorId,
    currencySymbol,
    ebay,
    etsy,
    amazon,
    tiktok,
    walmart,
    comparisonResult,
    paypal,
    stripe,
    square,
    profit,
    roi,
    margin,
    markup,
    breakeven,
    productPricing,
    dropshipping,
    batchResult,
    roas,
    cpa,
    salesTax,
    inventoryReorder,
  ]);

  const sensitivityConfig: {
    title: string;
    subtitle: string;
    points: SensitivityPoint[];
  } | null = useMemo(() => {
    const factors = [0.8, 0.9, 1, 1.1, 1.2];
    const tag = (f: number) =>
      f === 1 ? 'Current' : f < 1 ? `${Math.round((f - 1) * 100)}%` : `+${Math.round((f - 1) * 100)}%`;

    if (calculatorId === 'marketplace-comparison-calculator' && comparisonResult) {
      return {
        title: 'Net Profit by Sales Channel',
        subtitle: 'Margin % shown next to channel name',
        points: buildComparisonChartPoints(comparisonResult.channels),
      };
    }

    if (calculatorId === 'batch-sku-auditor' && batchResult) {
      return {
        title: 'Top Catalog SKUs by Monthly Net Profit',
        subtitle: 'Sorted winners to losers (top 6)',
        points: buildBatchChartPoints(batchResult.auditedRows),
      };
    }

    if (calculatorId === 'ebay-fee-calculator') {
      return {
        title: 'Price Sensitivity Analysis',
        subtitle: 'Estimated net profit across sale prices',
        points: factors.map((f) => {
          const p = +(ebay.salePrice * f).toFixed(2);
          return {
            label: formatCurrency(p, currencySymbol),
            sublabel: tag(f),
            value: calculateEbay({ ...ebay, salePrice: p }, currencySymbol).primaryValue,
          };
        }),
      };
    }

    if (calculatorId === 'amazon-fba-calculator') {
      return {
        title: 'Buy Box Price Sensitivity',
        subtitle: 'Unit profit across selling prices',
        points: factors.map((f) => {
          const p = +(amazon.sellingPrice * f).toFixed(2);
          return {
            label: formatCurrency(p, currencySymbol),
            sublabel: tag(f),
            value: calculateAmazonFba({ ...amazon, sellingPrice: p }, currencySymbol).primaryValue,
          };
        }),
      };
    }

    if (calculatorId === 'etsy-fee-calculator') {
      return {
        title: 'Price Sensitivity Analysis',
        subtitle: 'Net profit across listing prices',
        points: factors.map((f) => {
          const p = +(etsy.itemPrice * f).toFixed(2);
          return {
            label: formatCurrency(p, currencySymbol),
            sublabel: tag(f),
            value: calculateEtsy({ ...etsy, itemPrice: p }, currencySymbol).primaryValue,
          };
        }),
      };
    }

    if (calculatorId === 'tiktok-shop-calculator') {
      return {
        title: 'Price Sensitivity Analysis',
        subtitle: 'Order profit across sale prices',
        points: factors.map((f) => {
          const p = +(tiktok.salePrice * f).toFixed(2);
          return {
            label: formatCurrency(p, currencySymbol),
            sublabel: tag(f),
            value: calculateTikTokShop({ ...tiktok, salePrice: p }, currencySymbol).primaryValue,
          };
        }),
      };
    }

    if (calculatorId === 'walmart-seller-calculator') {
      return {
        title: 'Price Sensitivity Analysis',
        subtitle: 'Unit profit across Walmart prices',
        points: factors.map((f) => {
          const p = +(walmart.sellingPrice * f).toFixed(2);
          return {
            label: formatCurrency(p, currencySymbol),
            sublabel: tag(f),
            value: calculateWalmart({ ...walmart, sellingPrice: p }, currencySymbol).primaryValue,
          };
        }),
      };
    }

    if (calculatorId === 'profit-calculator') {
      return {
        title: 'Unit Price Sensitivity',
        subtitle: 'Unit net profit across price tests',
        points: factors.map((f) => {
          const p = +(profit.sellingPrice * f).toFixed(2);
          return {
            label: formatCurrency(p, currencySymbol),
            sublabel: tag(f),
            value: calculateProfit({ ...profit, sellingPrice: p }, currencySymbol).primaryValue,
          };
        }),
      };
    }

    if (calculatorId === 'dropshipping-profit-calculator') {
      return {
        title: 'Ad CPA Sensitivity',
        subtitle: 'Order profit as CPA rises or drops',
        points: factors.map((f) => {
          const nextCpa = +(dropshipping.cpaAdSpend * f).toFixed(2);
          return {
            label: `${formatCurrency(nextCpa, currencySymbol)} CPA`,
            sublabel: tag(f),
            value: calculateDropshipping({ ...dropshipping, cpaAdSpend: nextCpa }, currencySymbol).primaryValue,
          };
        }),
      };
    }

    if (calculatorId === 'break-even-calculator') {
      const beUnits = Math.max(10, output.primaryValue || 50);
      const unitCheckpoints = [0.5, 0.75, 1, 1.5, 2].map((m) => Math.max(1, Math.round(beUnits * m)));
      return {
        title: 'Volume Profit Curve',
        subtitle: 'Net profit before/after break-even point',
        points: unitCheckpoints.map((u) => {
          const net =
            u * (breakeven.pricePerUnit - breakeven.variableCostPerUnit) - breakeven.fixedCosts;
          return {
            label: `${formatInteger(u)} units`,
            sublabel: u === beUnits ? 'Break-Even' : undefined,
            value: net,
          };
        }),
      };
    }

    if (calculatorId === 'roas-calculator') {
      return {
        title: 'Ad Spend Efficiency Sensitivity',
        subtitle: 'Net campaign profit across ad spend levels',
        points: factors.map((f) => {
          const spend = +(roas.adSpend * f).toFixed(2);
          const net = roas.adRevenue * (roas.grossMarginPct / 100) - spend;
          return {
            label: `${formatCurrency(spend, currencySymbol)} spend`,
            sublabel: tag(f),
            value: net,
          };
        }),
      };
    }

    return null;
  }, [
    calculatorId,
    comparisonResult,
    batchResult,
    ebay,
    amazon,
    etsy,
    tiktok,
    walmart,
    profit,
    dropshipping,
    breakeven,
    roas,
    output.primaryValue,
    currencySymbol,
  ]);

  const handleReset = () => {
    const key = getStateKeyForSlug(calculatorId);
    const applySetter = setters[key] as (val: unknown) => void;
    applySetter(DEFAULT_STATES[key]);
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  const handleShareScenario = () => {
    const key = getStateKeyForSlug(calculatorId);
    const activeState = state[key] as unknown as Record<string, unknown>;
    const shareUrl = buildScenarioShareUrl(`/calculators/${calculatorId}`, activeState, currencyCode);
    if (typeof window !== 'undefined') {
      const urlObj = new URL(shareUrl);
      window.history.replaceState({}, '', `${urlObj.pathname}${urlObj.search}`);
    }
    navigator.clipboard
      ?.writeText(shareUrl)
      .then(() => {
        setCopiedShare(true);
        window.setTimeout(() => setCopiedShare(false), 1800);
        trackEvent('share_scenario', { calculator: calculatorId });
      })
      .catch(() => {});
  };

  const formattedPrimary = formatPrimary(output.primaryValue, output.primaryFormat, currencySymbol);

  const primaryToneClass =
    output.primaryTone === 'positive'
      ? 'text-emerald-700 dark:text-emerald-400'
      : output.primaryTone === 'negative'
        ? 'text-red-600 dark:text-red-400'
        : output.primaryTone === 'warning'
          ? 'text-amber-600 dark:text-amber-400'
          : 'text-slate-900 dark:text-slate-100';

  const relatedBlogs = useMemo(
    () => BLOG_POSTS.filter((post) => meta.relatedBlogSlugs.includes(post.slug)),
    [meta.relatedBlogSlugs]
  );

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const scenarioDelta =
    pinnedA && pinnedA.primaryFormat === output.primaryFormat
      ? output.primaryValue - pinnedA.primaryValue
      : null;

  return (
    <article className={`mx-auto max-w-6xl px-4 sm:px-6 ${isEmbed ? 'py-4' : 'py-8'}`}>
      {!isEmbed && (
        <>
          <nav
            aria-label="Breadcrumb"
            className="no-print mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
          >
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Home
            </a>
            <span aria-hidden="true">/</span>
            <a
              href={`/category/${category.slug}`}
              onClick={(e) => handleNav(e, `/category/${category.slug}`)}
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              {category.name}
            </a>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{meta.name}</span>
          </nav>

          <header className="mb-8 max-w-3xl">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {category.name} · Verified {meta.lastVerified} · {meta.sourceNote}
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
              {meta.name}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {meta.description}
            </p>
          </header>
        </>
      )}

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Controls */}
        <section
          aria-label="Calculator inputs"
          className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
              Calculator Inputs
            </h2>
            <div className="no-print flex items-center gap-2">
              <label htmlFor="workspace-currency" className="sr-only">
                Currency
              </label>
              <select
                id="workspace-currency"
                value={currencyCode}
                onChange={(e) => onChangeCurrency(e.target.value as CurrencyCode)}
                className="h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2 font-mono text-xs font-medium text-slate-700 dark:text-slate-200 focus:border-emerald-600 focus:outline-none cursor-pointer"
              >
                {CURRENCY_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.code} ({opt.symbol})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <CalculatorInputs
            calculatorId={calculatorId}
            currencySymbol={currencySymbol}
            state={state}
            setters={setters}
          />
        </section>

        {/* Right: Live Results & Breakdown */}
        <section aria-label="Calculation results" className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {output.primaryLabel}
                </p>
                <p className={`mt-1 font-mono tabular-nums text-4xl sm:text-5xl font-semibold tracking-tight ${primaryToneClass}`}>
                  {formattedPrimary}
                </p>
              </div>
              <div className="no-print flex flex-wrap items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setPinnedA(
                      pinnedA
                        ? null
                        : {
                            primaryValue: output.primaryValue,
                            primaryFormat: output.primaryFormat,
                            formattedPrimary,
                          }
                    )
                  }
                  className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition-colors cursor-pointer ${
                    pinnedA
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <GitCompare className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{pinnedA ? 'Clear Pin A' : 'Compare A/B'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleShareScenario}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {copiedShare ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> : <Share2 className="h-3.5 w-3.5" aria-hidden="true" />}
                  <span>{copiedShare ? 'Link Copied' : 'Share'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const lines = [
                      `${meta.name} – SellerMath`,
                      `${output.primaryLabel}: ${formattedPrimary}`,
                      ...output.secondaryMetrics.map((m) => `${m.label}: ${m.value}`),
                      '',
                      ...output.breakdown.map((b) => {
                        const val = b.isCurrency
                          ? formatCurrency(b.value, currencySymbol)
                          : b.isPercent
                            ? formatPercent(b.value)
                            : b.isMultiplier
                              ? `${b.value.toFixed(2)}x`
                              : b.isInteger
                                ? formatInteger(b.value)
                                : String(b.value);
                        return `${b.label}: ${val}`;
                      }),
                    ];
                    navigator.clipboard?.writeText(lines.join('\n')).then(() => {
                      setCopiedSummary(true);
                      window.setTimeout(() => setCopiedSummary(false), 1800);
                      trackEvent('copy_summary', { calculator: calculatorId });
                    }).catch(() => {});
                  }}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {copiedSummary ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                  <span>{copiedSummary ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const escapeCsv = (val: string) => `"${val.replace(/"/g, '""')}"`;
                    const rows =
                      calculatorId === 'batch-sku-auditor' && batchResult
                        ? [
                            ['SKU', 'Price', 'COGS', 'Shipping', 'Fees/Unit', 'Ad Spend', 'Units', 'Profit/Unit', 'Margin %', 'ROI %', 'Total Profit'],
                            ...batchResult.auditedRows.map((r) => [
                              r.sku,
                              r.price.toFixed(2),
                              r.cogs.toFixed(2),
                              r.shipping.toFixed(2),
                              r.feesPerUnit.toFixed(2),
                              r.adSpend.toFixed(2),
                              String(r.units),
                              r.netProfitPerUnit.toFixed(2),
                              r.marginPct.toFixed(2),
                              r.roiPct.toFixed(2),
                              r.totalProfit.toFixed(2),
                            ]),
                          ]
                        : [
                            ['Line Item', 'Value'],
                            [output.primaryLabel, formattedPrimary],
                            ...output.breakdown.map((b) => {
                              const val = b.isCurrency
                                ? formatCurrency(b.value, currencySymbol)
                                : b.isPercent
                                  ? formatPercent(b.value)
                                  : b.isMultiplier
                                    ? `${b.value.toFixed(2)}x`
                                    : b.isInteger
                                      ? formatInteger(b.value)
                                      : String(b.value);
                              return [b.label, val];
                            }),
                          ];
                    const csv = rows.map((r) => r.map(escapeCsv).join(',')).join('\n');
                    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${calculatorId}-sellermath.csv`;
                    a.click();
                    URL.revokeObjectURL(url);
                    trackEvent('export_csv', { calculator: calculatorId });
                  }}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  title="Print or Save as PDF"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Print</span>
                </button>
                {!isEmbed && (
                  <button
                    type="button"
                    onClick={() => setEmbedOpen(true)}
                    title="Embed this calculator"
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Embed</span>
                  </button>
                )}
              </div>
            </div>

            {pinnedA && scenarioDelta !== null && (
              <div className="my-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-xs">
                <div className="flex flex-wrap items-center gap-4">
                  <span>
                    <strong className="text-slate-700 dark:text-slate-200">Scenario A:</strong>{' '}
                    <span className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                      {pinnedA.formattedPrimary}
                    </span>
                  </span>
                  <span>
                    <strong className="text-slate-700 dark:text-slate-200">Scenario B (Live):</strong>{' '}
                    <span className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                      {formattedPrimary}
                    </span>
                  </span>
                </div>
                <span
                  className={`font-mono tabular-nums font-semibold ${
                    scenarioDelta > 0
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : scenarioDelta < 0
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Delta: {scenarioDelta >= 0 ? '+' : ''}
                  {formatPrimary(scenarioDelta, output.primaryFormat, currencySymbol)}
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-slate-200 dark:border-slate-800">
              {output.secondaryMetrics.map((metric) => {
                const valColor =
                  metric.tone === 'positive'
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : metric.tone === 'negative'
                      ? 'text-red-600 dark:text-red-400'
                      : metric.tone === 'warning'
                        ? 'text-amber-700 dark:text-amber-400'
                        : 'text-slate-900 dark:text-slate-100';
                return (
                  <div key={metric.label}>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{metric.label}</p>
                    <p className={`mt-1 font-mono tabular-nums text-base sm:text-lg font-semibold ${valColor}`}>
                      {metric.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Proportion Bar */}
            <div className="pt-5">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span>Value Allocation</span>
                <span>Proportions across total value</span>
              </div>
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                {output.segments.map((seg) => {
                  const barColor =
                    seg.tone === 'cost'
                      ? 'bg-slate-500'
                      : seg.tone === 'fees'
                        ? 'bg-amber-500'
                        : seg.tone === 'profit'
                          ? 'bg-emerald-600 dark:bg-emerald-500'
                          : 'bg-red-600';
                  return (
                    <div
                      key={seg.label}
                      style={{ width: `${Math.max(0, seg.percent)}%` }}
                      className={`${barColor} transition-all duration-150`}
                      title={`${seg.label}: ${formatCurrency(seg.amount, currencySymbol)} (${seg.percent.toFixed(1)}%)`}
                    />
                  );
                })}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {output.segments.map((seg) => {
                  const swatch =
                    seg.tone === 'cost'
                      ? 'bg-slate-500'
                      : seg.tone === 'fees'
                        ? 'bg-amber-500'
                        : seg.tone === 'profit'
                          ? 'bg-emerald-600'
                          : 'bg-red-600';
                  return (
                    <span key={seg.label} className="inline-flex items-center gap-1.5">
                      <span className={`inline-block h-2.5 w-2.5 rounded-xs ${swatch}`} aria-hidden="true" />
                      <span>{seg.label}:</span>
                      <span className="font-mono tabular-nums font-medium">
                        {formatCurrency(seg.amount, currencySymbol)} ({seg.percent.toFixed(1)}%)
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dedicated Matrix Table for Marketplace Comparison */}
          {comparisonResult && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto">
              <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800">
                <h2 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Channel Comparison Matrix
                </h2>
              </div>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                    <th className="px-4 py-2.5 font-medium">Marketplace</th>
                    <th className="px-4 py-2.5 font-medium text-right">Fees</th>
                    <th className="px-4 py-2.5 font-medium text-right">Net Profit</th>
                    <th className="px-4 py-2.5 font-medium text-right">Margin</th>
                    <th className="px-4 py-2.5 font-medium text-right">ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {comparisonResult.channels.map((ch) => (
                    <tr key={ch.channel}>
                      <td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">
                        {ch.channel}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-amber-700 dark:text-amber-400">
                        {formatCurrency(ch.fees, currencySymbol)}
                      </td>
                      <td
                        className={`px-4 py-2.5 text-right font-mono tabular-nums font-semibold ${
                          ch.netProfit >= 0
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {formatCurrency(ch.netProfit, currencySymbol)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                        {ch.marginPct.toFixed(1)}%
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                        {ch.roiPct.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Dedicated Table for Batch CSV SKU Profit Auditor */}
          {batchResult && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto">
              <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h2 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                  SKU Profit Audit ({batchResult.auditedRows.length} rows)
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400">Use CSV button above to export</span>
              </div>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                    <th className="px-4 py-2.5 font-medium">SKU</th>
                    <th className="px-4 py-2.5 font-medium text-right">Units</th>
                    <th className="px-4 py-2.5 font-medium text-right">Unit Profit</th>
                    <th className="px-4 py-2.5 font-medium text-right">Margin</th>
                    <th className="px-4 py-2.5 font-medium text-right">Monthly Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {batchResult.auditedRows.map((row, idx) => (
                    <tr key={`${row.sku}-${idx}`}>
                      <td className="px-4 py-2.5 font-mono text-xs font-medium text-slate-900 dark:text-slate-100">
                        {row.sku}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-300">
                        {row.units}
                      </td>
                      <td
                        className={`px-4 py-2.5 text-right font-mono tabular-nums ${
                          row.netProfitPerUnit >= 0
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {formatCurrency(row.netProfitPerUnit, currencySymbol)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                        {row.marginPct.toFixed(1)}%
                      </td>
                      <td
                        className={`px-4 py-2.5 text-right font-mono tabular-nums font-semibold ${
                          row.totalProfit >= 0
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {formatCurrency(row.totalProfit, currencySymbol)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Sensitivity Chart */}
          {sensitivityConfig && (
            <SensitivityChart
              title={sensitivityConfig.title}
              subtitle={sensitivityConfig.subtitle}
              points={sensitivityConfig.points}
              currencySymbol={currencySymbol}
            />
          )}

          {/* Itemized Ledger Breakdown */}
          {!comparisonResult && !batchResult && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800">
                <h2 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Itemized Breakdown
                </h2>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {output.breakdown.map((row) => {
                  const display = row.isCurrency
                    ? formatCurrency(row.value, currencySymbol)
                    : row.isPercent
                      ? formatPercent(row.value)
                      : row.isMultiplier
                        ? `${row.value.toFixed(2)}x`
                        : row.isInteger
                          ? formatInteger(row.value)
                          : String(row.value);

                  const rowColor =
                    row.tone === 'positive'
                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                      : row.tone === 'negative'
                        ? 'text-red-600 dark:text-red-400 font-semibold'
                        : row.tone === 'warning'
                          ? 'text-amber-700 dark:text-amber-400'
                          : 'text-slate-900 dark:text-slate-100';

                  return (
                    <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                      <div>
                        <span className="text-slate-700 dark:text-slate-300">{row.label}</span>
                        {row.subtext && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">{row.subtext}</p>
                        )}
                      </div>
                      <span className={`font-mono tabular-nums shrink-0 ${rowColor}`}>{display}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>

      {isEmbed ? (
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-3">
          <span>{meta.name}</span>
          <a
            href={`/calculators/${calculatorId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Powered by SellerMath
          </a>
        </div>
      ) : (
        <>
          <div className="my-10">
            <AdSlot slotId={`calc-${calculatorId}-mid`} format="horizontal" />
          </div>

          <section aria-label="Calculator guide and methodology" className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-4">
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-50">
                  What Is the {meta.name}?
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {meta.whatIs}
                </p>

                <h3 className="mt-6 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                  How Does It Work?
                </h3>
                <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 list-decimal pl-5">
                  {meta.howItWorks.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>

                <h3 className="mt-6 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {meta.formulaTitle}
                </h3>
                <p className="mt-2 font-mono text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-3.5">
                  {meta.formulaText}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-50">
                  Why Use This Calculator?
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {meta.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Worked Example
                </p>
                <h2 className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-slate-50">
                  {meta.workedExample.scenarioTitle}
                </h2>

                <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3.5 space-y-1">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Inputs</p>
                  {meta.workedExample.inputsSummary.map((line) => (
                    <p key={line} className="font-mono text-xs text-slate-600 dark:text-slate-400">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Step-by-Step Math
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {meta.workedExample.steps.map((step) => (
                      <li key={step} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <p className="font-mono text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    {meta.workedExample.outcomeSummary}
                  </p>
                </div>
              </div>

              {relatedBlogs.length > 0 && (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                      Recommended Seller Guides
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {relatedBlogs.map((post) => (
                      <a
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        onClick={(e) => handleNav(e, `/blog/${post.slug}`)}
                        className="block rounded-lg border border-slate-200 dark:border-slate-800 p-3.5 hover:border-emerald-600/60 dark:hover:border-emerald-500/60 transition-colors"
                      >
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {post.category} · {post.readTime}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {post.title}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <AdSlot slotId={`calc-${calculatorId}-sidebar`} format="rectangle" />
            </div>
          </section>

          <section aria-labelledby="related-heading" className="no-print py-8">
            <div className="flex items-baseline justify-between gap-4 mb-5">
              <h2 id="related-heading" className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Related SellerMath Calculators
              </h2>
              <a
                href={`/category/${category.slug}`}
                onClick={(e) => handleNav(e, `/category/${category.slug}`)}
                className="text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:underline whitespace-nowrap shrink-0"
              >
                All {category.name}
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {meta.relatedIds.map((relId) => {
                const rel = CALCULATORS[relId];
                const relCat = CATEGORIES[rel.category];
                return (
                  <a
                    key={rel.id}
                    href={`/calculators/${rel.id}`}
                    onClick={(e) => handleNav(e, `/calculators/${rel.id}`)}
                    className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-emerald-600/60 dark:hover:border-emerald-500/60 transition-colors"
                  >
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{relCat.shortName}</p>
                      <h3 className="mt-1 font-display text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {rel.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        {rel.tagline}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      <span>Open calculator</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </a>
                );
              })}
            </div>
          </section>

          <div className="my-4">
            <PartnerStrip onNavigate={onNavigate} />
          </div>

          <FaqSection title={`${meta.name} FAQ`} items={meta.faqs} />

          <EmbedModal
            calculatorId={calculatorId}
            calculatorName={meta.name}
            open={embedOpen}
            onClose={() => setEmbedOpen(false)}
          />
        </>
      )}
    </article>
  );
}

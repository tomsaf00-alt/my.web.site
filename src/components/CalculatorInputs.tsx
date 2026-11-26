import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { CalculatorSlug } from '../types/calculator';
import { CalculatorStateMap, DEFAULT_BATCH_CSV } from './calculatorState';

interface NumberFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  prefix?: string;
  suffix?: string;
  step?: string;
  min?: number;
  max?: number;
  hint?: string;
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = '0.01',
  min = 0,
  max,
  hint,
}: NumberFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
      >
        {label}
      </label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="pointer-events-none absolute left-3 text-sm font-mono text-slate-500 dark:text-slate-400">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          max={max}
          value={Number.isNaN(value) ? '' : value}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            onChange(Number.isNaN(parsed) ? 0 : parsed);
          }}
          className={`h-11 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono tabular-nums text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-colors ${
            prefix ? 'pl-9' : 'pl-3.5'
          } ${suffix ? 'pr-9' : 'pr-3.5'}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 text-sm font-mono text-slate-500 dark:text-slate-400">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
}

interface CalculatorInputsProps {
  calculatorId: CalculatorSlug;
  currencySymbol: string;
  state: CalculatorStateMap;
  setters: {
    [K in keyof CalculatorStateMap]: (val: CalculatorStateMap[K]) => void;
  };
}

export function CalculatorInputs({
  calculatorId,
  currencySymbol,
  state,
  setters,
}: CalculatorInputsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
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
  } = state;

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setters.batchCsv({ csvText: text });
    e.target.value = '';
  };

  return (
    <div className="space-y-4">
      {calculatorId === 'ebay-fee-calculator' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="ebay-sale-price" label="Item Sale Price" value={ebay.salePrice} onChange={(salePrice) => setters.ebay({ ...ebay, salePrice })} prefix={currencySymbol} />
            <NumberField id="ebay-shipping-charged" label="Shipping Charged" value={ebay.shippingCharged} onChange={(shippingCharged) => setters.ebay({ ...ebay, shippingCharged })} prefix={currencySymbol} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="ebay-item-cost" label="Item Cost (COGS)" value={ebay.itemCost} onChange={(itemCost) => setters.ebay({ ...ebay, itemCost })} prefix={currencySymbol} />
            <NumberField id="ebay-shipping-cost" label="Shipping Label Cost" value={ebay.shippingCost} onChange={(shippingCost) => setters.ebay({ ...ebay, shippingCost })} prefix={currencySymbol} />
          </div>
          <div>
            <label htmlFor="ebay-category" className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5">
              eBay Category Rate Preset
            </label>
            <select
              id="ebay-category"
              value={ebay.feeRate}
              onChange={(e) => setters.ebay({ ...ebay, feeRate: parseFloat(e.target.value) })}
              className="h-11 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
            >
              <option value={13.25}>Most Categories (13.25%)</option>
              <option value={14.95}>Books, Movies &amp; Music (14.95%)</option>
              <option value={15}>Jewelry &amp; Watches (15.00%)</option>
              <option value={6.35}>Guitars &amp; Basses (6.35%)</option>
              <option value={3}>Heavy Equipment (3.00%)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="ebay-ad-rate" label="Promoted Ad Rate" value={ebay.adRate} onChange={(adRate) => setters.ebay({ ...ebay, adRate })} suffix="%" step="0.1" />
            <NumberField id="ebay-tax-rate" label="Buyer Sales Tax" value={ebay.salesTaxRate} onChange={(salesTaxRate) => setters.ebay({ ...ebay, salesTaxRate })} suffix="%" step="0.1" />
          </div>
          <label className="flex items-center gap-2.5 pt-1 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" checked={ebay.storeDiscount} onChange={(e) => setters.ebay({ ...ebay, storeDiscount: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600" />
            <span>eBay Store Subscription (~0.9% FVF discount)</span>
          </label>
        </>
      )}

      {calculatorId === 'etsy-fee-calculator' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="etsy-item-price" label="Item Price" value={etsy.itemPrice} onChange={(itemPrice) => setters.etsy({ ...etsy, itemPrice })} prefix={currencySymbol} />
            <NumberField id="etsy-shipping-charged" label="Shipping Charged" value={etsy.shippingCharged} onChange={(shippingCharged) => setters.etsy({ ...etsy, shippingCharged })} prefix={currencySymbol} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="etsy-item-cost" label="Materials &amp; Labor Cost" value={etsy.itemCost} onChange={(itemCost) => setters.etsy({ ...etsy, itemCost })} prefix={currencySymbol} />
            <NumberField id="etsy-shipping-cost" label="Postage Paid" value={etsy.shippingCost} onChange={(shippingCost) => setters.etsy({ ...etsy, shippingCost })} prefix={currencySymbol} />
          </div>
          <div>
            <label htmlFor="etsy-region" className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5">
              Etsy Payments Region
            </label>
            <select
              id="etsy-region"
              value={`${etsy.processingRate}|${etsy.processingFixed}`}
              onChange={(e) => {
                const [r, f] = e.target.value.split('|').map(Number);
                setters.etsy({ ...etsy, processingRate: r, processingFixed: f });
              }}
              className="h-11 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
            >
              <option value="3|0.25">United States (3.0% + $0.25)</option>
              <option value="4|0.20">United Kingdom (4.0% + £0.20)</option>
              <option value="3|0.25">Canada (3.0% + CA$0.25)</option>
              <option value="4|0.30">European Union (4.0% + €0.30)</option>
            </select>
          </div>
          <div>
            <label htmlFor="etsy-offsite" className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5">
              Offsite Ads Attribution
            </label>
            <select
              id="etsy-offsite"
              value={etsy.offsiteAdsRate}
              onChange={(e) => setters.etsy({ ...etsy, offsiteAdsRate: parseFloat(e.target.value) })}
              className="h-11 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
            >
              <option value={0}>No Offsite Ad (0%)</option>
              <option value={15}>Standard Shop Offsite Ad (15%)</option>
              <option value={12}>High-Volume Shop (&gt;$10k/yr) (12%)</option>
            </select>
          </div>
          <label className="flex items-center gap-2.5 pt-1 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" checked={etsy.includeListingFee} onChange={(e) => setters.etsy({ ...etsy, includeListingFee: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600" />
            <span>Include {currencySymbol}0.20 Etsy listing fee</span>
          </label>
        </>
      )}

      {calculatorId === 'amazon-fba-calculator' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="fba-price" label="Selling Price" value={amazon.sellingPrice} onChange={(sellingPrice) => setters.amazon({ ...amazon, sellingPrice })} prefix={currencySymbol} />
            <NumberField id="fba-cogs" label="Landed Product Cost" value={amazon.landedCost} onChange={(landedCost) => setters.amazon({ ...amazon, landedCost })} prefix={currencySymbol} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="fba-referral" label="Referral Fee Rate" value={amazon.referralRate} onChange={(referralRate) => setters.amazon({ ...amazon, referralRate })} suffix="%" step="0.5" />
            <NumberField id="fba-fulfillment" label="FBA Fulfillment Fee" value={amazon.fbaFulfillmentFee} onChange={(fbaFulfillmentFee) => setters.amazon({ ...amazon, fbaFulfillmentFee })} prefix={currencySymbol} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="fba-storage" label="Monthly Storage / Unit" value={amazon.monthlyStorageFee} onChange={(monthlyStorageFee) => setters.amazon({ ...amazon, monthlyStorageFee })} prefix={currencySymbol} />
            <NumberField id="fba-ppc" label="PPC Ad Spend / Unit" value={amazon.ppcSpendPerUnit} onChange={(ppcSpendPerUnit) => setters.amazon({ ...amazon, ppcSpendPerUnit })} prefix={currencySymbol} />
          </div>
          <NumberField id="fba-returns" label="Return Rate Allowance" value={amazon.returnAllowancePct} onChange={(returnAllowancePct) => setters.amazon({ ...amazon, returnAllowancePct })} suffix="%" step="0.5" hint="Recommended 2%–5% reserve for customer returns." />
        </>
      )}

      {calculatorId === 'tiktok-shop-calculator' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="tt-price" label="Product Sale Price" value={tiktok.salePrice} onChange={(salePrice) => setters.tiktok({ ...tiktok, salePrice })} prefix={currencySymbol} />
            <NumberField id="tt-ship-charged" label="Shipping Charged" value={tiktok.shippingCharged} onChange={(shippingCharged) => setters.tiktok({ ...tiktok, shippingCharged })} prefix={currencySymbol} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="tt-cogs" label="Product Cost (COGS)" value={tiktok.productCost} onChange={(productCost) => setters.tiktok({ ...tiktok, productCost })} prefix={currencySymbol} />
            <NumberField id="tt-ship-cost" label="Seller Shipping Cost" value={tiktok.shippingCost} onChange={(shippingCost) => setters.tiktok({ ...tiktok, shippingCost })} prefix={currencySymbol} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="tt-ref" label="TikTok Referral Fee" value={tiktok.referralFeePct} onChange={(referralFeePct) => setters.tiktok({ ...tiktok, referralFeePct })} suffix="%" step="0.5" />
            <NumberField id="tt-aff" label="Creator Affiliate Commission" value={tiktok.affiliateCommissionPct} onChange={(affiliateCommissionPct) => setters.tiktok({ ...tiktok, affiliateCommissionPct })} suffix="%" step="0.5" />
          </div>
          <NumberField id="tt-ads" label="TikTok Shop Ads / Order" value={tiktok.adSpendPerOrder} onChange={(adSpendPerOrder) => setters.tiktok({ ...tiktok, adSpendPerOrder })} prefix={currencySymbol} />
        </>
      )}

      {calculatorId === 'walmart-seller-calculator' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="wm-price" label="Selling Price" value={walmart.sellingPrice} onChange={(sellingPrice) => setters.walmart({ ...walmart, sellingPrice })} prefix={currencySymbol} />
            <NumberField id="wm-ship-charged" label="Shipping Charged" value={walmart.shippingCharged} onChange={(shippingCharged) => setters.walmart({ ...walmart, shippingCharged })} prefix={currencySymbol} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="wm-cogs" label="Landed Product Cost" value={walmart.productCost} onChange={(productCost) => setters.walmart({ ...walmart, productCost })} prefix={currencySymbol} />
            <NumberField id="wm-ref" label="Category Referral Fee" value={walmart.referralRate} onChange={(referralRate) => setters.walmart({ ...walmart, referralRate })} suffix="%" step="0.5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="wm-wfs" label="WFS Fulfillment Fee" value={walmart.wfsFulfillmentFee} onChange={(wfsFulfillmentFee) => setters.walmart({ ...walmart, wfsFulfillmentFee })} prefix={currencySymbol} />
            <NumberField id="wm-storage" label="Monthly WFS Storage" value={walmart.monthlyStorageFee} onChange={(monthlyStorageFee) => setters.walmart({ ...walmart, monthlyStorageFee })} prefix={currencySymbol} />
          </div>
          <NumberField id="wm-ads" label="Walmart Connect Ads / Unit" value={walmart.adSpendPerUnit} onChange={(adSpendPerUnit) => setters.walmart({ ...walmart, adSpendPerUnit })} prefix={currencySymbol} />
        </>
      )}

      {calculatorId === 'marketplace-comparison-calculator' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="mc-price" label="Selling Price" value={marketplaceComparison.sellingPrice} onChange={(sellingPrice) => setters.marketplaceComparison({ ...marketplaceComparison, sellingPrice })} prefix={currencySymbol} />
            <NumberField id="mc-ship-charged" label="Shipping Charged" value={marketplaceComparison.shippingCharged} onChange={(shippingCharged) => setters.marketplaceComparison({ ...marketplaceComparison, shippingCharged })} prefix={currencySymbol} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="mc-cogs" label="Landed Product Cost" value={marketplaceComparison.productCost} onChange={(productCost) => setters.marketplaceComparison({ ...marketplaceComparison, productCost })} prefix={currencySymbol} />
            <NumberField id="mc-ship-cost" label="Self-Ship Label Cost" value={marketplaceComparison.shippingCost} onChange={(shippingCost) => setters.marketplaceComparison({ ...marketplaceComparison, shippingCost })} prefix={currencySymbol} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="mc-fba" label="FBA / WFS Fulfillment Fee" value={marketplaceComparison.fbaFulfillmentFee} onChange={(fbaFulfillmentFee) => setters.marketplaceComparison({ ...marketplaceComparison, fbaFulfillmentFee })} prefix={currencySymbol} />
            <NumberField id="mc-ads" label="Ad Spend per Unit" value={marketplaceComparison.adSpendPerUnit} onChange={(adSpendPerUnit) => setters.marketplaceComparison({ ...marketplaceComparison, adSpendPerUnit })} prefix={currencySymbol} />
          </div>
        </>
      )}

      {calculatorId === 'paypal-fee-calculator' && (
        <>
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
            <button type="button" onClick={() => setters.paypal({ ...paypal, mode: 'deduct' })} className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${paypal.mode === 'deduct' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}>
              Deduct from Gross
            </button>
            <button type="button" onClick={() => setters.paypal({ ...paypal, mode: 'reverse' })} className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${paypal.mode === 'reverse' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}>
              Reverse: Receive Net
            </button>
          </div>
          <NumberField id="pp-amount" label={paypal.mode === 'deduct' ? 'Gross Payment Amount' : 'Target Net Payout'} value={paypal.amount} onChange={(amount) => setters.paypal({ ...paypal, amount })} prefix={currencySymbol} />
          <div>
            <label htmlFor="pp-tier" className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5">PayPal Fee Schedule</label>
            <select
              id="pp-tier"
              value={`${paypal.feePercent}|${paypal.fixedFee}`}
              onChange={(e) => {
                const [r, f] = e.target.value.split('|').map(Number);
                setters.paypal({ ...paypal, feePercent: r, fixedFee: f });
              }}
              className="h-11 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
            >
              <option value="3.49|0.49">PayPal Checkout / Goods &amp; Services (3.49% + $0.49)</option>
              <option value="2.99|0.49">PayPal Invoicing / Standard Card (2.99% + $0.49)</option>
              <option value="2.29|0.09">PayPal QR Code / Zettle (2.29% + $0.09)</option>
              <option value="1.99|0.49">Nonprofit Discounted Rate (1.99% + $0.49)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="pp-pct" label="Rate (%)" value={paypal.feePercent} onChange={(feePercent) => setters.paypal({ ...paypal, feePercent })} suffix="%" />
            <NumberField id="pp-fixed" label="Fixed Fee" value={paypal.fixedFee} onChange={(fixedFee) => setters.paypal({ ...paypal, fixedFee })} prefix={currencySymbol} />
          </div>
          <NumberField id="pp-intl" label="International Surcharge" value={paypal.internationalSurchargePct} onChange={(internationalSurchargePct) => setters.paypal({ ...paypal, internationalSurchargePct })} suffix="%" step="0.1" hint="Add 1.50% for cross-border payments." />
        </>
      )}

      {calculatorId === 'stripe-fee-calculator' && (
        <>
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
            <button type="button" onClick={() => setters.stripe({ ...stripe, mode: 'deduct' })} className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${stripe.mode === 'deduct' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}>
              Deduct from Charge
            </button>
            <button type="button" onClick={() => setters.stripe({ ...stripe, mode: 'reverse' })} className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${stripe.mode === 'reverse' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}>
              Pass Fee to Buyer
            </button>
          </div>
          <NumberField id="st-amount" label={stripe.mode === 'deduct' ? 'Customer Charge Amount' : 'Desired Net Payout'} value={stripe.amount} onChange={(amount) => setters.stripe({ ...stripe, amount })} prefix={currencySymbol} />
          <div>
            <label htmlFor="st-tier" className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5">Stripe Payment Method</label>
            <select
              id="st-tier"
              value={`${stripe.feePercent}|${stripe.fixedFee}|${stripe.internationalSurchargePct}`}
              onChange={(e) => {
                const [r, f, intl] = e.target.value.split('|').map(Number);
                setters.stripe({ ...stripe, feePercent: r, fixedFee: f, internationalSurchargePct: intl });
              }}
              className="h-11 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
            >
              <option value="2.9|0.3|0">US Domestic Card (2.9% + $0.30)</option>
              <option value="2.9|0.3|1.5">International Card (+1.5%)</option>
              <option value="2.9|0.3|2.5">International + Currency Conversion (+2.5%)</option>
              <option value="2.7|0.05|0">Stripe Terminal In-Person (2.7% + $0.05)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="st-pct" label="Base Rate (%)" value={stripe.feePercent} onChange={(feePercent) => setters.stripe({ ...stripe, feePercent })} suffix="%" />
            <NumberField id="st-fixed" label="Fixed Fee" value={stripe.fixedFee} onChange={(fixedFee) => setters.stripe({ ...stripe, fixedFee })} prefix={currencySymbol} />
          </div>
          <NumberField id="st-intl" label="International / Conversion Surcharge" value={stripe.internationalSurchargePct} onChange={(internationalSurchargePct) => setters.stripe({ ...stripe, internationalSurchargePct })} suffix="%" step="0.1" />
        </>
      )}

      {calculatorId === 'square-fee-calculator' && (
        <>
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
            <button type="button" onClick={() => setters.square({ ...square, mode: 'deduct' })} className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${square.mode === 'deduct' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}>
              Deduct from Sale
            </button>
            <button type="button" onClick={() => setters.square({ ...square, mode: 'reverse' })} className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${square.mode === 'reverse' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}>
              Reverse: Receive Net
            </button>
          </div>
          <NumberField id="sq-amount" label={square.mode === 'deduct' ? 'Gross Sale Amount' : 'Desired Net Payout'} value={square.amount} onChange={(amount) => setters.square({ ...square, amount })} prefix={currencySymbol} />
          <div>
            <label htmlFor="sq-tier" className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5">Square Payment Channel</label>
            <select
              id="sq-tier"
              value={`${square.feePercent}|${square.fixedFee}`}
              onChange={(e) => {
                const [r, f] = e.target.value.split('|').map(Number);
                setters.square({ ...square, feePercent: r, fixedFee: f });
              }}
              className="h-11 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
            >
              <option value="2.6|0.1">In-Person Tap / Chip / Swipe (2.6% + $0.10)</option>
              <option value="2.9|0.3">Square Online Store (2.9% + $0.30)</option>
              <option value="3.3|0.3">Square Invoices (3.3% + $0.30)</option>
              <option value="3.5|0.15">Manually Keyed-In / Card on File (3.5% + $0.15)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="sq-pct" label="Processing Rate (%)" value={square.feePercent} onChange={(feePercent) => setters.square({ ...square, feePercent })} suffix="%" />
            <NumberField id="sq-fixed" label="Fixed Fee" value={square.fixedFee} onChange={(fixedFee) => setters.square({ ...square, fixedFee })} prefix={currencySymbol} />
          </div>
        </>
      )}

      {calculatorId === 'profit-calculator' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="prof-price" label="Selling Price / Unit" value={profit.sellingPrice} onChange={(sellingPrice) => setters.profit({ ...profit, sellingPrice })} prefix={currencySymbol} />
            <NumberField id="prof-cogs" label="Unit Cost (COGS)" value={profit.unitCost} onChange={(unitCost) => setters.profit({ ...profit, unitCost })} prefix={currencySymbol} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="prof-shipping" label="Shipping &amp; Packaging" value={profit.shippingCost} onChange={(shippingCost) => setters.profit({ ...profit, shippingCost })} prefix={currencySymbol} />
            <NumberField id="prof-ads" label="Ad Spend / Unit" value={profit.marketingCost} onChange={(marketingCost) => setters.profit({ ...profit, marketingCost })} prefix={currencySymbol} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="prof-fee-pct" label="Platform / Fee %" value={profit.platformFeePct} onChange={(platformFeePct) => setters.profit({ ...profit, platformFeePct })} suffix="%" step="0.1" />
            <NumberField id="prof-fixed" label="Fixed Fee / Order" value={profit.fixedFee} onChange={(fixedFee) => setters.profit({ ...profit, fixedFee })} prefix={currencySymbol} />
          </div>
          <NumberField id="prof-units" label="Units Sold (Batch Size)" value={profit.unitsSold} onChange={(unitsSold) => setters.profit({ ...profit, unitsSold })} step="1" min={1} />
        </>
      )}

      {calculatorId === 'roi-calculator' && (
        <>
          <NumberField id="roi-invested" label="Amount Invested (Capital)" value={roi.amountInvested} onChange={(amountInvested) => setters.roi({ ...roi, amountInvested })} prefix={currencySymbol} />
          <NumberField id="roi-returned" label="Gross Amount Returned" value={roi.amountReturned} onChange={(amountReturned) => setters.roi({ ...roi, amountReturned })} prefix={currencySymbol} />
          <NumberField id="roi-extra" label="Additional Expenses / Fees" value={roi.extraExpenses} onChange={(extraExpenses) => setters.roi({ ...roi, extraExpenses })} prefix={currencySymbol} />
          <NumberField id="roi-months" label="Holding Period (Months)" value={roi.monthsHeld} onChange={(monthsHeld) => setters.roi({ ...roi, monthsHeld })} step="1" min={1} hint="Used to calculate annualized ROI." />
        </>
      )}

      {calculatorId === 'margin-calculator' && (
        <>
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
            <button type="button" onClick={() => setters.margin({ ...margin, mode: 'from-price' })} className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${margin.mode === 'from-price' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}>
              Calculate Margin %
            </button>
            <button type="button" onClick={() => setters.margin({ ...margin, mode: 'from-target' })} className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${margin.mode === 'from-target' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}>
              Solve Target Price
            </button>
          </div>
          <NumberField id="margin-cost" label="Unit Cost" value={margin.cost} onChange={(cost) => setters.margin({ ...margin, cost })} prefix={currencySymbol} />
          {margin.mode === 'from-price' ? (
            <NumberField id="margin-price" label="Selling Price" value={margin.sellingPrice} onChange={(sellingPrice) => setters.margin({ ...margin, sellingPrice })} prefix={currencySymbol} />
          ) : (
            <NumberField id="margin-target" label="Target Gross Margin" value={margin.targetMarginPct} onChange={(targetMarginPct) => setters.margin({ ...margin, targetMarginPct })} suffix="%" max={99.9} step="0.5" />
          )}
        </>
      )}

      {calculatorId === 'markup-calculator' && (
        <>
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
            <button type="button" onClick={() => setters.markup({ ...markup, mode: 'from-markup' })} className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${markup.mode === 'from-markup' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}>
              Cost + Markup %
            </button>
            <button type="button" onClick={() => setters.markup({ ...markup, mode: 'from-price' })} className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${markup.mode === 'from-price' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}>
              Find Markup %
            </button>
          </div>
          <NumberField id="markup-cost" label="Unit Cost" value={markup.cost} onChange={(cost) => setters.markup({ ...markup, cost })} prefix={currencySymbol} />
          {markup.mode === 'from-markup' ? (
            <NumberField id="markup-pct" label="Desired Markup" value={markup.markupPct} onChange={(markupPct) => setters.markup({ ...markup, markupPct })} suffix="%" step="1" />
          ) : (
            <NumberField id="markup-price" label="Selling Price" value={markup.sellingPrice} onChange={(sellingPrice) => setters.markup({ ...markup, sellingPrice })} prefix={currencySymbol} />
          )}
        </>
      )}

      {calculatorId === 'break-even-calculator' && (
        <>
          <NumberField id="be-fixed" label="Fixed Costs (Monthly / Launch)" value={breakeven.fixedCosts} onChange={(fixedCosts) => setters.breakeven({ ...breakeven, fixedCosts })} prefix={currencySymbol} />
          <NumberField id="be-price" label="Selling Price per Unit" value={breakeven.pricePerUnit} onChange={(pricePerUnit) => setters.breakeven({ ...breakeven, pricePerUnit })} prefix={currencySymbol} />
          <NumberField id="be-variable" label="Variable Cost per Unit" value={breakeven.variableCostPerUnit} onChange={(variableCostPerUnit) => setters.breakeven({ ...breakeven, variableCostPerUnit })} prefix={currencySymbol} hint="Include COGS, shipping, and per-order fees." />
          <NumberField id="be-target" label="Target Profit Goal" value={breakeven.targetProfit} onChange={(targetProfit) => setters.breakeven({ ...breakeven, targetProfit })} prefix={currencySymbol} />
        </>
      )}

      {calculatorId === 'product-pricing-calculator' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="pp-cogs" label="Product Cost (COGS)" value={productPricing.productCost} onChange={(productCost) => setters.productPricing({ ...productPricing, productCost })} prefix={currencySymbol} />
            <NumberField id="pp-ship" label="Packaging &amp; Shipping" value={productPricing.packagingAndShipping} onChange={(packagingAndShipping) => setters.productPricing({ ...productPricing, packagingAndShipping })} prefix={currencySymbol} />
          </div>
          <NumberField id="pp-margin" label="Target Net Profit Margin" value={productPricing.targetMarginPct} onChange={(targetMarginPct) => setters.productPricing({ ...productPricing, targetMarginPct })} suffix="%" step="0.5" max={85} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="pp-mkt" label="Marketplace Fee %" value={productPricing.marketplaceFeePct} onChange={(marketplaceFeePct) => setters.productPricing({ ...productPricing, marketplaceFeePct })} suffix="%" step="0.25" />
            <NumberField id="pp-pay" label="Payment Fee %" value={productPricing.paymentFeePct} onChange={(paymentFeePct) => setters.productPricing({ ...productPricing, paymentFeePct })} suffix="%" step="0.1" />
          </div>
          <NumberField id="pp-fix" label="Fixed Per-Order Fee" value={productPricing.fixedOrderFee} onChange={(fixedOrderFee) => setters.productPricing({ ...productPricing, fixedOrderFee })} prefix={currencySymbol} />
          <label className="flex items-center gap-2.5 pt-1 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" checked={productPricing.charmPricing} onChange={(e) => setters.productPricing({ ...productPricing, charmPricing: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600" />
            <span>Round up to .99 psychological pricing</span>
          </label>
        </>
      )}

      {calculatorId === 'dropshipping-profit-calculator' && (
        <>
          <NumberField id="ds-price" label="Store Retail Price" value={dropshipping.retailPrice} onChange={(retailPrice) => setters.dropshipping({ ...dropshipping, retailPrice })} prefix={currencySymbol} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="ds-cost" label="Supplier Product Cost" value={dropshipping.supplierCost} onChange={(supplierCost) => setters.dropshipping({ ...dropshipping, supplierCost })} prefix={currencySymbol} />
            <NumberField id="ds-ship" label="Supplier Shipping" value={dropshipping.supplierShipping} onChange={(supplierShipping) => setters.dropshipping({ ...dropshipping, supplierShipping })} prefix={currencySymbol} />
          </div>
          <NumberField id="ds-cpa" label="Ad Spend per Order (CPA)" value={dropshipping.cpaAdSpend} onChange={(cpaAdSpend) => setters.dropshipping({ ...dropshipping, cpaAdSpend })} prefix={currencySymbol} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="ds-gw-pct" label="Gateway Fee %" value={dropshipping.gatewayFeePct} onChange={(gatewayFeePct) => setters.dropshipping({ ...dropshipping, gatewayFeePct })} suffix="%" step="0.1" />
            <NumberField id="ds-gw-fix" label="Gateway Fixed Fee" value={dropshipping.gatewayFixed} onChange={(gatewayFixed) => setters.dropshipping({ ...dropshipping, gatewayFixed })} prefix={currencySymbol} />
          </div>
          <NumberField id="ds-refund" label="Refund / Chargeback Reserve" value={dropshipping.refundReservePct} onChange={(refundReservePct) => setters.dropshipping({ ...dropshipping, refundReservePct })} suffix="%" step="0.5" />
        </>
      )}

      {calculatorId === 'batch-sku-auditor' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="batch-csv-input" className="text-sm font-medium text-slate-800 dark:text-slate-200">
              SKU Catalog CSV Input
            </label>
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv,text/plain"
                onChange={handleCsvUpload}
                className="sr-only"
                aria-label="Upload SKU catalog CSV file"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Upload .csv</span>
              </button>
              <button
                type="button"
                onClick={() => setters.batchCsv({ csvText: DEFAULT_BATCH_CSV })}
                className="text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Load sample
              </button>
            </div>
          </div>
          <textarea
            id="batch-csv-input"
            rows={8}
            value={batchCsv.csvText}
            onChange={(e) => setters.batchCsv({ csvText: e.target.value })}
            spellCheck={false}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs leading-relaxed text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Columns: SKU, Price, COGS, Shipping, Fee%, FixedFee, AdSpend, Units. Parsed 100% locally in browser memory.
          </p>
        </div>
      )}

      {calculatorId === 'roas-calculator' && (
        <>
          <NumberField id="roas-rev" label="Attributed Ad Revenue" value={roas.adRevenue} onChange={(adRevenue) => setters.roas({ ...roas, adRevenue })} prefix={currencySymbol} />
          <NumberField id="roas-spend" label="Total Ad Spend" value={roas.adSpend} onChange={(adSpend) => setters.roas({ ...roas, adSpend })} prefix={currencySymbol} />
          <NumberField id="roas-gm" label="Pre-Ad Gross Margin (%)" value={roas.grossMarginPct} onChange={(grossMarginPct) => setters.roas({ ...roas, grossMarginPct })} suffix="%" step="0.5" min={1} max={100} hint="Used to calculate Break-Even ROAS (100 ÷ Gross Margin %)." />
        </>
      )}

      {calculatorId === 'cpa-calculator' && (
        <>
          <NumberField id="cpa-budget" label="Monthly / Campaign Ad Budget" value={cpa.adBudget} onChange={(adBudget) => setters.cpa({ ...cpa, adBudget })} prefix={currencySymbol} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="cpa-cpc" label="Average Cost Per Click (CPC)" value={cpa.cpc} onChange={(cpc) => setters.cpa({ ...cpa, cpc })} prefix={currencySymbol} min={0.01} />
            <NumberField id="cpa-cvr" label="Store Conversion Rate" value={cpa.conversionRatePct} onChange={(conversionRatePct) => setters.cpa({ ...cpa, conversionRatePct })} suffix="%" step="0.1" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="cpa-aov" label="Average Order Value (AOV)" value={cpa.averageOrderValue} onChange={(averageOrderValue) => setters.cpa({ ...cpa, averageOrderValue })} prefix={currencySymbol} />
            <NumberField id="cpa-gm" label="Pre-Ad Gross Margin" value={cpa.grossMarginPct} onChange={(grossMarginPct) => setters.cpa({ ...cpa, grossMarginPct })} suffix="%" max={100} />
          </div>
        </>
      )}

      {calculatorId === 'sales-tax-calculator' && (
        <>
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
            <button type="button" onClick={() => setters.salesTax({ ...salesTax, mode: 'add' })} className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${salesTax.mode === 'add' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}>
              Add Tax to Net Price
            </button>
            <button type="button" onClick={() => setters.salesTax({ ...salesTax, mode: 'extract' })} className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${salesTax.mode === 'extract' ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}>
              Extract Tax from Gross
            </button>
          </div>
          <NumberField id="tax-amount" label={salesTax.mode === 'add' ? 'Net Pre-Tax Price' : 'Gross Tax-Inclusive Price'} value={salesTax.amount} onChange={(amount) => setters.salesTax({ ...salesTax, amount })} prefix={currencySymbol} />
          <NumberField id="tax-rate" label="Sales Tax / VAT Rate" value={salesTax.taxRatePct} onChange={(taxRatePct) => setters.salesTax({ ...salesTax, taxRatePct })} suffix="%" step="0.25" />
        </>
      )}

      {calculatorId === 'inventory-reorder-calculator' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="inv-vel" label="Daily Units Sold" value={inventoryReorder.dailyUnitsSold} onChange={(dailyUnitsSold) => setters.inventoryReorder({ ...inventoryReorder, dailyUnitsSold })} step="1" />
            <NumberField id="inv-cost" label="Unit Landed Cost" value={inventoryReorder.unitLandedCost} onChange={(unitLandedCost) => setters.inventoryReorder({ ...inventoryReorder, unitLandedCost })} prefix={currencySymbol} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField id="inv-lead" label="Supplier Lead Time (Days)" value={inventoryReorder.leadTimeDays} onChange={(leadTimeDays) => setters.inventoryReorder({ ...inventoryReorder, leadTimeDays })} step="1" />
            <NumberField id="inv-safety" label="Safety Stock Buffer (Days)" value={inventoryReorder.safetyStockDays} onChange={(safetyStockDays) => setters.inventoryReorder({ ...inventoryReorder, safetyStockDays })} step="1" />
          </div>
          <NumberField id="inv-cycle" label="Reorder Coverage Cycle (Days)" value={inventoryReorder.orderCycleDays} onChange={(orderCycleDays) => setters.inventoryReorder({ ...inventoryReorder, orderCycleDays })} step="1" min={1} hint="How many days of stock each Purchase Order covers." />
        </>
      )}
    </div>
  );
}

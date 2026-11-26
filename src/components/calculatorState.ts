import { CalculatorSlug } from '../types/calculator';

export const DEFAULT_BATCH_CSV = [
  'SKU,Price,COGS,Shipping,FeePct,FixedFee,AdSpend,Units',
  'MUG-CERAMIC-12,38.00,10.50,4.80,9.50,0.45,2.50,140',
  'TRAVEL-POUCH-BLK,29.99,7.20,4.25,15.00,0.30,4.50,95',
  'DESK-MAT-PRO,54.00,15.00,6.50,13.25,0.40,5.00,65',
  'CABLE-CLIP-5PK,14.99,3.80,3.95,15.00,0.30,3.20,110',
].join('\n');

export const DEFAULT_STATES = {
  ebay: {
    salePrice: 65,
    shippingCharged: 8,
    itemCost: 22,
    shippingCost: 7.5,
    feeRate: 13.25,
    adRate: 2,
    salesTaxRate: 7,
    storeDiscount: false,
  },
  etsy: {
    itemPrice: 38,
    shippingCharged: 5,
    itemCost: 11,
    shippingCost: 4.8,
    processingRate: 3,
    processingFixed: 0.25,
    offsiteAdsRate: 0,
    includeListingFee: true,
  },
  amazon: {
    sellingPrice: 34.99,
    landedCost: 8.5,
    referralRate: 15,
    fbaFulfillmentFee: 5.4,
    monthlyStorageFee: 0.65,
    ppcSpendPerUnit: 3.2,
    returnAllowancePct: 3,
  },
  tiktok: {
    salePrice: 29,
    shippingCharged: 0,
    productCost: 6.5,
    shippingCost: 4.25,
    referralFeePct: 6,
    affiliateCommissionPct: 15,
    adSpendPerOrder: 2,
  },
  walmart: {
    sellingPrice: 32,
    shippingCharged: 0,
    productCost: 9.2,
    wfsFulfillmentFee: 4.95,
    monthlyStorageFee: 0.45,
    referralRate: 15,
    adSpendPerUnit: 2,
  },
  marketplaceComparison: {
    sellingPrice: 39.99,
    shippingCharged: 0,
    productCost: 10.5,
    shippingCost: 4.75,
    adSpendPerUnit: 3,
    fbaFulfillmentFee: 5.4,
  },
  paypal: {
    amount: 250,
    feePercent: 3.49,
    fixedFee: 0.49,
    internationalSurchargePct: 0,
    mode: 'deduct' as 'deduct' | 'reverse',
    currencySymbol: '$',
  },
  stripe: {
    amount: 250,
    feePercent: 2.9,
    fixedFee: 0.3,
    internationalSurchargePct: 0,
    mode: 'deduct' as 'deduct' | 'reverse',
    currencySymbol: '$',
  },
  square: {
    amount: 120,
    feePercent: 2.6,
    fixedFee: 0.1,
    internationalSurchargePct: 0,
    mode: 'deduct' as 'deduct' | 'reverse',
    currencySymbol: '$',
  },
  profit: {
    sellingPrice: 49,
    unitCost: 16,
    shippingCost: 5.5,
    platformFeePct: 10,
    fixedFee: 0.3,
    marketingCost: 4,
    unitsSold: 100,
  },
  roi: {
    amountInvested: 2500,
    amountReturned: 4100,
    extraExpenses: 220,
    monthsHeld: 4,
  },
  margin: {
    cost: 18,
    sellingPrice: 36,
    targetMarginPct: 50,
    mode: 'from-price' as 'from-price' | 'from-target',
  },
  markup: {
    cost: 25,
    markupPct: 60,
    sellingPrice: 40,
    mode: 'from-markup' as 'from-markup' | 'from-price',
  },
  breakeven: {
    fixedCosts: 1800,
    pricePerUnit: 45,
    variableCostPerUnit: 21,
    targetProfit: 1500,
  },
  productPricing: {
    productCost: 12,
    packagingAndShipping: 4.5,
    targetMarginPct: 25,
    marketplaceFeePct: 15,
    paymentFeePct: 2.9,
    fixedOrderFee: 0.3,
    charmPricing: true,
  },
  dropshipping: {
    retailPrice: 59.99,
    supplierCost: 14.5,
    supplierShipping: 4.5,
    cpaAdSpend: 18,
    gatewayFeePct: 2.9,
    gatewayFixed: 0.3,
    refundReservePct: 3,
  },
  batchCsv: {
    csvText: DEFAULT_BATCH_CSV,
  },
  roas: {
    adRevenue: 12000,
    adSpend: 3000,
    grossMarginPct: 45,
  },
  cpa: {
    adBudget: 2000,
    cpc: 1.25,
    conversionRatePct: 2.8,
    averageOrderValue: 75,
    grossMarginPct: 50,
  },
  salesTax: {
    amount: 120,
    taxRatePct: 20,
    mode: 'extract' as 'add' | 'extract',
  },
  inventoryReorder: {
    dailyUnitsSold: 18,
    leadTimeDays: 30,
    safetyStockDays: 14,
    unitLandedCost: 7.5,
    orderCycleDays: 60,
  },
};

export type CalculatorStateMap = typeof DEFAULT_STATES;

export function getStateKeyForSlug(slug: CalculatorSlug): keyof CalculatorStateMap {
  switch (slug) {
    case 'ebay-fee-calculator':
      return 'ebay';
    case 'etsy-fee-calculator':
      return 'etsy';
    case 'amazon-fba-calculator':
      return 'amazon';
    case 'tiktok-shop-calculator':
      return 'tiktok';
    case 'walmart-seller-calculator':
      return 'walmart';
    case 'marketplace-comparison-calculator':
      return 'marketplaceComparison';
    case 'paypal-fee-calculator':
      return 'paypal';
    case 'stripe-fee-calculator':
      return 'stripe';
    case 'square-fee-calculator':
      return 'square';
    case 'profit-calculator':
      return 'profit';
    case 'roi-calculator':
      return 'roi';
    case 'margin-calculator':
      return 'margin';
    case 'markup-calculator':
      return 'markup';
    case 'break-even-calculator':
      return 'breakeven';
    case 'product-pricing-calculator':
      return 'productPricing';
    case 'dropshipping-profit-calculator':
      return 'dropshipping';
    case 'batch-sku-auditor':
      return 'batchCsv';
    case 'roas-calculator':
      return 'roas';
    case 'cpa-calculator':
      return 'cpa';
    case 'sales-tax-calculator':
      return 'salesTax';
    case 'inventory-reorder-calculator':
      return 'inventoryReorder';
  }
}

export function applyQueryParamsToState<T extends Record<string, unknown>>(
  baseState: T,
  search: string
): T {
  const params = new URLSearchParams(search);
  let changed = false;
  const next = { ...baseState } as Record<string, unknown>;

  for (const [key, defaultVal] of Object.entries(baseState)) {
    const raw = params.get(key);
    if (raw === null) continue;
    changed = true;
    if (typeof defaultVal === 'number') {
      const parsed = parseFloat(raw);
      if (Number.isFinite(parsed)) next[key] = parsed;
    } else if (typeof defaultVal === 'boolean') {
      next[key] = raw === '1' || raw === 'true';
    } else if (typeof defaultVal === 'string') {
      next[key] = raw;
    }
  }

  return (changed ? next : baseState) as T;
}

export function buildScenarioShareUrl(
  pathname: string,
  state: Record<string, unknown>,
  currencyCode?: string
): string {
  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(state)) {
    if (key === 'csvText' || key === 'currencySymbol') continue;
    if (typeof val === 'boolean') {
      params.set(key, val ? '1' : '0');
    } else if (typeof val === 'number' || typeof val === 'string') {
      params.set(key, String(val));
    }
  }
  if (currencyCode) params.set('cur', currencyCode);
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://sellermath.app';
  const query = params.toString();
  return query ? `${origin}${pathname}?${query}` : `${origin}${pathname}`;
}

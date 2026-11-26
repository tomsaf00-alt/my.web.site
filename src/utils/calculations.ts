import { CalculationOutput, ProportionSegment } from '../types/calculator';

export function safeNum(val: number): number {
  return Number.isFinite(val) ? val : 0;
}

export function formatCurrency(amount: number, symbol = '$'): string {
  const n = safeNum(amount);
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return n < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

export function formatPercent(pct: number): string {
  const n = safeNum(pct);
  return `${n.toFixed(2)}%`;
}

export function formatInteger(val: number): string {
  return Math.ceil(safeNum(val)).toLocaleString('en-US');
}

function buildSegments(
  gross: number,
  cost: number,
  fees: number,
  profit: number
): ProportionSegment[] {
  const base = Math.max(gross, cost + fees, 0.01);
  const safeCost = Math.max(0, cost);
  const safeFees = Math.max(0, fees);
  const segments: ProportionSegment[] = [
    {
      label: 'Product & Operating Cost',
      amount: safeCost,
      percent: Math.min(100, (safeCost / base) * 100),
      tone: 'cost',
    },
    {
      label: 'Platform, Tax & Ad Fees',
      amount: safeFees,
      percent: Math.min(100, (safeFees / base) * 100),
      tone: 'fees',
    },
  ];

  if (profit >= 0) {
    segments.push({
      label: 'Net Profit',
      amount: profit,
      percent: Math.min(100, (profit / base) * 100),
      tone: 'profit',
    });
  } else {
    segments.push({
      label: 'Net Loss',
      amount: Math.abs(profit),
      percent: Math.min(100, (Math.abs(profit) / base) * 100),
      tone: 'loss',
    });
  }
  return segments;
}

export interface EbayInputs {
  salePrice: number;
  shippingCharged: number;
  itemCost: number;
  shippingCost: number;
  feeRate: number;
  adRate: number;
  salesTaxRate: number;
  storeDiscount: boolean;
}

export function calculateEbay(input: EbayInputs, sym = '$'): CalculationOutput {
  const salePrice = Math.max(0, safeNum(input.salePrice));
  const shippingCharged = Math.max(0, safeNum(input.shippingCharged));
  const itemCost = Math.max(0, safeNum(input.itemCost));
  const shippingCost = Math.max(0, safeNum(input.shippingCost));
  const baseRate = Math.max(0, safeNum(input.feeRate));
  const effectiveFeeRate = input.storeDiscount ? Math.max(0, baseRate - 0.9) : baseRate;
  const adRate = Math.max(0, safeNum(input.adRate));
  const taxRate = Math.max(0, safeNum(input.salesTaxRate));

  const buyerSubtotal = salePrice + shippingCharged;
  const taxCollected = buyerSubtotal * (taxRate / 100);
  const totalBuyerPayment = buyerSubtotal + taxCollected;

  const perOrderFee = buyerSubtotal > 0 ? (buyerSubtotal > 10 ? 0.4 : 0.3) : 0;
  const finalValueFee = totalBuyerPayment * (effectiveFeeRate / 100);
  const promotedFee = totalBuyerPayment * (adRate / 100);
  const totalEbayFees = finalValueFee + perOrderFee + promotedFee;

  const totalCost = itemCost + shippingCost;
  const netProfit = buyerSubtotal - totalCost - totalEbayFees;
  const margin = buyerSubtotal > 0 ? (netProfit / buyerSubtotal) * 100 : 0;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
  const effectiveRatePct = buyerSubtotal > 0 ? (totalEbayFees / buyerSubtotal) * 100 : 0;

  const feeMultiplier = (effectiveFeeRate + adRate) / 100;
  const breakEvenPrice =
    1 - feeMultiplier > 0
      ? Math.max(0, (totalCost + perOrderFee) / (1 - feeMultiplier) - shippingCharged)
      : 0;

  return {
    primaryLabel: netProfit >= 0 ? 'Estimated Net Profit' : 'Estimated Net Loss',
    primaryValue: netProfit,
    primaryFormat: 'currency',
    primaryTone: netProfit > 0 ? 'positive' : netProfit < 0 ? 'negative' : 'neutral',
    secondaryMetrics: [
      { label: 'Profit Margin', value: formatPercent(margin), tone: margin >= 15 ? 'positive' : margin > 0 ? 'warning' : 'negative' },
      { label: 'Return on Investment', value: formatPercent(roi) },
      { label: 'Total eBay Fees', value: formatCurrency(totalEbayFees, sym), tone: 'warning' },
      { label: 'Break-Even Sale Price', value: formatCurrency(breakEvenPrice, sym) },
    ],
    breakdown: [
      { label: 'Gross Revenue (Item + Shipping)', value: buyerSubtotal, isCurrency: true },
      { label: 'Collected Sales Tax (Fee Base)', value: taxCollected, isCurrency: true, subtext: 'Remitted by eBay; included in FVF base' },
      { label: `Final Value Fee (${effectiveFeeRate.toFixed(2)}%)`, value: -finalValueFee, isCurrency: true, tone: 'warning' },
      { label: 'Per-Order Fixed Fee', value: -perOrderFee, isCurrency: true, tone: 'warning' },
      { label: `Promoted Listing Ad Fee (${adRate.toFixed(2)}%)`, value: -promotedFee, isCurrency: true, tone: 'warning' },
      { label: 'Total eBay Fees', value: -totalEbayFees, isCurrency: true, tone: 'negative', subtext: `${effectiveRatePct.toFixed(2)}% of gross revenue` },
      { label: 'Item Cost + Shipping Paid', value: -totalCost, isCurrency: true },
      { label: 'Net Profit', value: netProfit, isCurrency: true, tone: netProfit >= 0 ? 'positive' : 'negative' },
    ],
    segments: buildSegments(buyerSubtotal, totalCost, totalEbayFees, netProfit),
  };
}

export interface EtsyInputs {
  itemPrice: number;
  shippingCharged: number;
  itemCost: number;
  shippingCost: number;
  processingRate: number;
  processingFixed: number;
  offsiteAdsRate: number;
  includeListingFee: boolean;
}

export function calculateEtsy(input: EtsyInputs, sym = '$'): CalculationOutput {
  const itemPrice = Math.max(0, safeNum(input.itemPrice));
  const shippingCharged = Math.max(0, safeNum(input.shippingCharged));
  const itemCost = Math.max(0, safeNum(input.itemCost));
  const shippingCost = Math.max(0, safeNum(input.shippingCost));
  const processingRate = Math.max(0, safeNum(input.processingRate));
  const processingFixed = Math.max(0, safeNum(input.processingFixed));
  const offsiteAdsRate = Math.max(0, safeNum(input.offsiteAdsRate));

  const grossRevenue = itemPrice + shippingCharged;
  const listingFee = input.includeListingFee && grossRevenue > 0 ? 0.2 : 0;
  const transactionFee = grossRevenue * 0.065;
  const paymentFee = grossRevenue > 0 ? grossRevenue * (processingRate / 100) + processingFixed : 0;
  const offsiteAdsFee = grossRevenue * (offsiteAdsRate / 100);
  const totalEtsyFees = listingFee + transactionFee + paymentFee + offsiteAdsFee;

  const totalCost = itemCost + shippingCost;
  const netProfit = grossRevenue - totalCost - totalEtsyFees;
  const margin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
  const effectiveFeeRate = grossRevenue > 0 ? (totalEtsyFees / grossRevenue) * 100 : 0;

  return {
    primaryLabel: netProfit >= 0 ? 'Estimated Net Profit' : 'Estimated Net Loss',
    primaryValue: netProfit,
    primaryFormat: 'currency',
    primaryTone: netProfit > 0 ? 'positive' : netProfit < 0 ? 'negative' : 'neutral',
    secondaryMetrics: [
      { label: 'Profit Margin', value: formatPercent(margin), tone: margin >= 20 ? 'positive' : margin > 0 ? 'warning' : 'negative' },
      { label: 'Total Etsy Fees', value: formatCurrency(totalEtsyFees, sym), tone: 'warning' },
      { label: 'Effective Fee Rate', value: formatPercent(effectiveFeeRate) },
      { label: 'Return on Investment', value: formatPercent(roi) },
    ],
    breakdown: [
      { label: 'Gross Revenue (Item + Shipping)', value: grossRevenue, isCurrency: true },
      { label: 'Listing Fee', value: -listingFee, isCurrency: true, tone: 'warning' },
      { label: 'Transaction Fee (6.5%)', value: -transactionFee, isCurrency: true, tone: 'warning' },
      { label: `Payment Processing (${processingRate.toFixed(2)}% + ${formatCurrency(processingFixed, sym)})`, value: -paymentFee, isCurrency: true, tone: 'warning' },
      { label: `Offsite Ads Fee (${offsiteAdsRate.toFixed(0)}%)`, value: -offsiteAdsFee, isCurrency: true, tone: 'warning' },
      { label: 'Total Etsy Fees', value: -totalEtsyFees, isCurrency: true, tone: 'negative' },
      { label: 'Materials + Shipping Cost', value: -totalCost, isCurrency: true },
      { label: 'Net Profit', value: netProfit, isCurrency: true, tone: netProfit >= 0 ? 'positive' : 'negative' },
    ],
    segments: buildSegments(grossRevenue, totalCost, totalEtsyFees, netProfit),
  };
}

export interface AmazonFbaInputs {
  sellingPrice: number;
  landedCost: number;
  referralRate: number;
  fbaFulfillmentFee: number;
  monthlyStorageFee: number;
  ppcSpendPerUnit: number;
  returnAllowancePct: number;
}

export function calculateAmazonFba(input: AmazonFbaInputs, sym = '$'): CalculationOutput {
  const sellingPrice = Math.max(0, safeNum(input.sellingPrice));
  const landedCost = Math.max(0, safeNum(input.landedCost));
  const referralRate = Math.max(0, safeNum(input.referralRate));
  const fbaFee = Math.max(0, safeNum(input.fbaFulfillmentFee));
  const storageFee = Math.max(0, safeNum(input.monthlyStorageFee));
  const ppcSpend = Math.max(0, safeNum(input.ppcSpendPerUnit));
  const returnPct = Math.max(0, safeNum(input.returnAllowancePct));

  const referralFee = Math.max(sellingPrice > 0 ? 0.3 : 0, sellingPrice * (referralRate / 100));
  const returnAllowance = sellingPrice * (returnPct / 100);
  const totalAmazonFees = referralFee + fbaFee + storageFee;
  const totalCostAndAds = landedCost + ppcSpend + returnAllowance;
  const netProfit = sellingPrice - totalAmazonFees - totalCostAndAds;

  const netMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;
  const roi = landedCost > 0 ? (netProfit / landedCost) * 100 : 0;
  const profitBeforeAds = sellingPrice - totalAmazonFees - landedCost - returnAllowance;
  const breakEvenAcos = sellingPrice > 0 ? Math.max(0, (profitBeforeAds / sellingPrice) * 100) : 0;

  return {
    primaryLabel: netProfit >= 0 ? 'Net Profit per Unit' : 'Net Loss per Unit',
    primaryValue: netProfit,
    primaryFormat: 'currency',
    primaryTone: netProfit > 0 ? 'positive' : netProfit < 0 ? 'negative' : 'neutral',
    secondaryMetrics: [
      { label: 'Net Margin', value: formatPercent(netMargin), tone: netMargin >= 15 ? 'positive' : netMargin > 0 ? 'warning' : 'negative' },
      { label: 'Unit ROI', value: formatPercent(roi) },
      { label: 'Total Amazon Fees', value: formatCurrency(totalAmazonFees, sym), tone: 'warning' },
      { label: 'Break-Even ACoS', value: formatPercent(breakEvenAcos) },
    ],
    breakdown: [
      { label: 'Selling Price', value: sellingPrice, isCurrency: true },
      { label: `Amazon Referral Fee (${referralRate.toFixed(1)}%)`, value: -referralFee, isCurrency: true, tone: 'warning' },
      { label: 'FBA Fulfillment Fee', value: -fbaFee, isCurrency: true, tone: 'warning' },
      { label: 'Monthly FBA Storage Cost', value: -storageFee, isCurrency: true, tone: 'warning' },
      { label: 'Landed Product Cost (COGS)', value: -landedCost, isCurrency: true },
      { label: 'Amazon PPC Spend / Unit', value: -ppcSpend, isCurrency: true },
      { label: `Return Allowance (${returnPct.toFixed(1)}%)`, value: -returnAllowance, isCurrency: true },
      { label: 'Net Profit per Unit', value: netProfit, isCurrency: true, tone: netProfit >= 0 ? 'positive' : 'negative' },
    ],
    segments: buildSegments(sellingPrice, totalCostAndAds, totalAmazonFees, netProfit),
  };
}

export interface TikTokShopInputs {
  salePrice: number;
  shippingCharged: number;
  productCost: number;
  shippingCost: number;
  referralFeePct: number;
  affiliateCommissionPct: number;
  adSpendPerOrder: number;
}

export function calculateTikTokShop(input: TikTokShopInputs, sym = '$'): CalculationOutput {
  const salePrice = Math.max(0, safeNum(input.salePrice));
  const shippingCharged = Math.max(0, safeNum(input.shippingCharged));
  const productCost = Math.max(0, safeNum(input.productCost));
  const shippingCost = Math.max(0, safeNum(input.shippingCost));
  const referralPct = Math.max(0, safeNum(input.referralFeePct));
  const affiliatePct = Math.max(0, safeNum(input.affiliateCommissionPct));
  const adSpend = Math.max(0, safeNum(input.adSpendPerOrder));

  const grossRevenue = salePrice + shippingCharged;
  const referralFee = grossRevenue * (referralPct / 100);
  const affiliateFee = salePrice * (affiliatePct / 100);
  const totalPlatformFees = referralFee + affiliateFee + adSpend;
  const totalDirectCost = productCost + shippingCost;
  const netProfit = grossRevenue - totalDirectCost - totalPlatformFees;

  const margin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
  const roi = totalDirectCost > 0 ? (netProfit / totalDirectCost) * 100 : 0;
  const effectiveFeeRate = grossRevenue > 0 ? ((referralFee + affiliateFee) / grossRevenue) * 100 : 0;

  return {
    primaryLabel: netProfit >= 0 ? 'Net Profit per Order' : 'Net Loss per Order',
    primaryValue: netProfit,
    primaryFormat: 'currency',
    primaryTone: netProfit > 0 ? 'positive' : netProfit < 0 ? 'negative' : 'neutral',
    secondaryMetrics: [
      { label: 'Net Margin', value: formatPercent(margin), tone: margin >= 15 ? 'positive' : margin > 0 ? 'warning' : 'negative' },
      { label: 'Platform + Creator Fees', value: formatCurrency(referralFee + affiliateFee, sym), tone: 'warning' },
      { label: 'Effective Fee Rate', value: formatPercent(effectiveFeeRate) },
      { label: 'Return on Cost (ROI)', value: formatPercent(roi) },
    ],
    breakdown: [
      { label: 'Gross Order Total (Item + Shipping)', value: grossRevenue, isCurrency: true },
      { label: `TikTok Shop Referral Fee (${referralPct.toFixed(1)}%)`, value: -referralFee, isCurrency: true, tone: 'warning' },
      { label: `Creator Affiliate Commission (${affiliatePct.toFixed(1)}%)`, value: -affiliateFee, isCurrency: true, tone: 'warning' },
      { label: 'TikTok Shop Ads / Order', value: -adSpend, isCurrency: true, tone: 'warning' },
      { label: 'Product Cost (COGS)', value: -productCost, isCurrency: true },
      { label: 'Seller Shipping Cost', value: -shippingCost, isCurrency: true },
      { label: 'Net Profit per Order', value: netProfit, isCurrency: true, tone: netProfit >= 0 ? 'positive' : 'negative' },
    ],
    segments: buildSegments(grossRevenue, totalDirectCost, totalPlatformFees, netProfit),
  };
}

export interface WalmartInputs {
  sellingPrice: number;
  shippingCharged: number;
  productCost: number;
  wfsFulfillmentFee: number;
  monthlyStorageFee: number;
  referralRate: number;
  adSpendPerUnit: number;
}

export function calculateWalmart(input: WalmartInputs, sym = '$'): CalculationOutput {
  const sellingPrice = Math.max(0, safeNum(input.sellingPrice));
  const shippingCharged = Math.max(0, safeNum(input.shippingCharged));
  const productCost = Math.max(0, safeNum(input.productCost));
  const wfsFee = Math.max(0, safeNum(input.wfsFulfillmentFee));
  const storageFee = Math.max(0, safeNum(input.monthlyStorageFee));
  const referralRate = Math.max(0, safeNum(input.referralRate));
  const adSpend = Math.max(0, safeNum(input.adSpendPerUnit));

  const grossRevenue = sellingPrice + shippingCharged;
  const referralFee = grossRevenue * (referralRate / 100);
  const totalWalmartFees = referralFee + wfsFee + storageFee;
  const totalCosts = productCost + adSpend;
  const netProfit = grossRevenue - totalWalmartFees - totalCosts;

  const margin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
  const roi = productCost > 0 ? (netProfit / productCost) * 100 : 0;
  const effectiveFeeRate = grossRevenue > 0 ? (totalWalmartFees / grossRevenue) * 100 : 0;

  return {
    primaryLabel: netProfit >= 0 ? 'Net Profit per Unit' : 'Net Loss per Unit',
    primaryValue: netProfit,
    primaryFormat: 'currency',
    primaryTone: netProfit > 0 ? 'positive' : netProfit < 0 ? 'negative' : 'neutral',
    secondaryMetrics: [
      { label: 'Net Margin', value: formatPercent(margin), tone: margin >= 15 ? 'positive' : margin > 0 ? 'warning' : 'negative' },
      { label: 'Total Walmart Fees', value: formatCurrency(totalWalmartFees, sym), tone: 'warning' },
      { label: 'Effective Fee Rate', value: formatPercent(effectiveFeeRate) },
      { label: 'Unit ROI', value: formatPercent(roi) },
    ],
    breakdown: [
      { label: 'Gross Revenue (Price + Shipping)', value: grossRevenue, isCurrency: true },
      { label: `Walmart Referral Fee (${referralRate.toFixed(1)}%)`, value: -referralFee, isCurrency: true, tone: 'warning' },
      { label: 'WFS Fulfillment / Shipping Fee', value: -wfsFee, isCurrency: true, tone: 'warning' },
      { label: 'Monthly WFS Storage Cost', value: -storageFee, isCurrency: true, tone: 'warning' },
      { label: 'Landed Product Cost (COGS)', value: -productCost, isCurrency: true },
      { label: 'Walmart Connect Ad Spend', value: -adSpend, isCurrency: true },
      { label: 'Net Profit per Unit', value: netProfit, isCurrency: true, tone: netProfit >= 0 ? 'positive' : 'negative' },
    ],
    segments: buildSegments(grossRevenue, totalCosts, totalWalmartFees, netProfit),
  };
}

export interface PaymentFeeInputs {
  amount: number;
  feePercent: number;
  fixedFee: number;
  internationalSurchargePct: number;
  mode: 'deduct' | 'reverse';
  currencySymbol: string;
}

export function calculatePaymentFee(input: PaymentFeeInputs, providerName: string): CalculationOutput {
  const amount = Math.max(0, safeNum(input.amount));
  const totalRate = (Math.max(0, safeNum(input.feePercent)) + Math.max(0, safeNum(input.internationalSurchargePct))) / 100;
  const fixed = Math.max(0, safeNum(input.fixedFee));
  const sym = input.currencySymbol || '$';

  let gross = amount;
  let totalFee = 0;
  let net = 0;

  if (input.mode === 'deduct') {
    gross = amount;
    totalFee = gross > 0 ? gross * totalRate + fixed : 0;
    net = Math.max(0, gross - totalFee);
  } else {
    net = amount;
    gross = totalRate < 1 && net > 0 ? (net + fixed) / (1 - totalRate) : 0;
    totalFee = Math.max(0, gross - net);
  }

  const percentFeePortion = gross * (Math.max(0, safeNum(input.feePercent)) / 100);
  const intlFeePortion = gross * (Math.max(0, safeNum(input.internationalSurchargePct)) / 100);
  const effectiveRate = gross > 0 ? (totalFee / gross) * 100 : 0;

  return {
    primaryLabel: input.mode === 'deduct' ? 'Net Payout Received' : 'Amount to Charge Customer',
    primaryValue: input.mode === 'deduct' ? net : gross,
    primaryFormat: 'currency',
    primaryTone: 'positive',
    secondaryMetrics: [
      { label: `Total ${providerName} Fee`, value: formatCurrency(totalFee, sym), tone: 'warning' },
      { label: 'Effective Fee Rate', value: formatPercent(effectiveRate) },
      {
        label: input.mode === 'deduct' ? 'Gross Amount' : 'Target Net Payout',
        value: formatCurrency(input.mode === 'deduct' ? gross : net, sym),
      },
      { label: 'Fixed Per-Txn Fee', value: formatCurrency(gross > 0 ? fixed : 0, sym) },
    ],
    breakdown: [
      { label: 'Gross Transaction Amount', value: gross, isCurrency: true },
      { label: `Base Rate Fee (${input.feePercent.toFixed(2)}%)`, value: -percentFeePortion, isCurrency: true, tone: 'warning' },
      ...(intlFeePortion > 0
        ? [{ label: `International / Extra Fee (${input.internationalSurchargePct.toFixed(2)}%)`, value: -intlFeePortion, isCurrency: true, tone: 'warning' as const }]
        : []),
      { label: 'Fixed Fee', value: -(gross > 0 ? fixed : 0), isCurrency: true, tone: 'warning' },
      { label: `Total ${providerName} Fees`, value: -totalFee, isCurrency: true, tone: 'negative' },
      { label: 'Net Payout', value: net, isCurrency: true, tone: 'positive' },
    ],
    segments: buildSegments(gross, 0, totalFee, net),
  };
}

export interface ProfitInputs {
  sellingPrice: number;
  unitCost: number;
  shippingCost: number;
  platformFeePct: number;
  fixedFee: number;
  marketingCost: number;
  unitsSold: number;
}

export function calculateProfit(input: ProfitInputs, sym = '$'): CalculationOutput {
  const price = Math.max(0, safeNum(input.sellingPrice));
  const unitCost = Math.max(0, safeNum(input.unitCost));
  const shipping = Math.max(0, safeNum(input.shippingCost));
  const feePct = Math.max(0, safeNum(input.platformFeePct));
  const fixedFee = Math.max(0, safeNum(input.fixedFee));
  const adCost = Math.max(0, safeNum(input.marketingCost));
  const units = Math.max(1, Math.round(safeNum(input.unitsSold)));

  const feesPerUnit = price > 0 ? price * (feePct / 100) + fixedFee : 0;
  const directCostPerUnit = unitCost + shipping + adCost;
  const totalCostPerUnit = directCostPerUnit + feesPerUnit;
  const netProfitPerUnit = price - totalCostPerUnit;

  const batchRevenue = price * units;
  const batchProfit = netProfitPerUnit * units;
  const margin = price > 0 ? (netProfitPerUnit / price) * 100 : 0;
  const markup = directCostPerUnit > 0 ? ((price - directCostPerUnit) / directCostPerUnit) * 100 : 0;
  const roi = directCostPerUnit > 0 ? (netProfitPerUnit / directCostPerUnit) * 100 : 0;

  return {
    primaryLabel: netProfitPerUnit >= 0 ? 'Net Profit per Unit' : 'Net Loss per Unit',
    primaryValue: netProfitPerUnit,
    primaryFormat: 'currency',
    primaryTone: netProfitPerUnit > 0 ? 'positive' : netProfitPerUnit < 0 ? 'negative' : 'neutral',
    secondaryMetrics: [
      { label: `Total Profit (${units} units)`, value: formatCurrency(batchProfit, sym), tone: batchProfit >= 0 ? 'positive' : 'negative' },
      { label: 'Net Profit Margin', value: formatPercent(margin) },
      { label: 'Return on Cost (ROI)', value: formatPercent(roi) },
      { label: 'Total Batch Revenue', value: formatCurrency(batchRevenue, sym) },
    ],
    breakdown: [
      { label: 'Selling Price per Unit', value: price, isCurrency: true },
      { label: 'Unit Cost (COGS)', value: -unitCost, isCurrency: true },
      { label: 'Shipping & Packaging', value: -shipping, isCurrency: true },
      { label: 'Marketing / Ad Spend', value: -adCost, isCurrency: true },
      { label: `Platform & Payment Fees (${feePct.toFixed(2)}% + ${formatCurrency(fixedFee, sym)})`, value: -feesPerUnit, isCurrency: true, tone: 'warning' },
      { label: 'Net Profit per Unit', value: netProfitPerUnit, isCurrency: true, tone: netProfitPerUnit >= 0 ? 'positive' : 'negative' },
      { label: 'Gross Markup on Direct Cost', value: markup, isPercent: true },
      { label: `Batch Net Profit (${units.toLocaleString()} units)`, value: batchProfit, isCurrency: true, tone: batchProfit >= 0 ? 'positive' : 'negative' },
    ],
    segments: buildSegments(price, directCostPerUnit, feesPerUnit, netProfitPerUnit),
  };
}

export interface RoiInputs {
  amountInvested: number;
  amountReturned: number;
  extraExpenses: number;
  monthsHeld: number;
}

export function calculateRoi(input: RoiInputs, sym = '$'): CalculationOutput {
  const invested = Math.max(0, safeNum(input.amountInvested));
  const returned = Math.max(0, safeNum(input.amountReturned));
  const extra = Math.max(0, safeNum(input.extraExpenses));
  const months = Math.max(1, safeNum(input.monthsHeld));

  const totalCost = invested + extra;
  const netGain = returned - totalCost;
  const roiPct = totalCost > 0 ? (netGain / totalCost) * 100 : 0;
  const years = months / 12;
  const annualizedRoi =
    totalCost > 0 && returned > 0 && years > 0
      ? (Math.pow(returned / totalCost, 1 / years) - 1) * 100
      : 0;
  const multiple = totalCost > 0 ? returned / totalCost : 0;

  return {
    primaryLabel: 'Return on Investment (ROI)',
    primaryValue: roiPct,
    primaryFormat: 'percent',
    primaryTone: roiPct > 0 ? 'positive' : roiPct < 0 ? 'negative' : 'neutral',
    secondaryMetrics: [
      { label: netGain >= 0 ? 'Net Gain' : 'Net Loss', value: formatCurrency(netGain, sym), tone: netGain >= 0 ? 'positive' : 'negative' },
      { label: 'Annualized ROI', value: formatPercent(annualizedRoi) },
      { label: 'Capital Multiple', value: `${multiple.toFixed(2)}x` },
      { label: 'Total Cost Basis', value: formatCurrency(totalCost, sym) },
    ],
    breakdown: [
      { label: 'Gross Amount Returned', value: returned, isCurrency: true },
      { label: 'Initial Capital Invested', value: -invested, isCurrency: true },
      { label: 'Additional Operating Expenses', value: -extra, isCurrency: true, tone: 'warning' },
      { label: 'Net Gain / Loss', value: netGain, isCurrency: true, tone: netGain >= 0 ? 'positive' : 'negative' },
      { label: 'Simple ROI', value: roiPct, isPercent: true, tone: roiPct >= 0 ? 'positive' : 'negative' },
      { label: `Annualized ROI (${months} mo)`, value: annualizedRoi, isPercent: true },
      { label: 'Capital Return Multiple', value: multiple, isMultiplier: true },
    ],
    segments: buildSegments(returned, invested, extra, netGain),
  };
}

export interface MarginInputs {
  cost: number;
  sellingPrice: number;
  targetMarginPct: number;
  mode: 'from-price' | 'from-target';
}

export function calculateMargin(input: MarginInputs, sym = '$'): CalculationOutput {
  const cost = Math.max(0, safeNum(input.cost));
  let price = Math.max(0, safeNum(input.sellingPrice));
  let marginPct = 0;

  if (input.mode === 'from-target') {
    const target = Math.min(99.9, Math.max(0, safeNum(input.targetMarginPct)));
    price = target < 100 ? cost / (1 - target / 100) : 0;
    marginPct = target;
  } else {
    marginPct = price > 0 ? ((price - cost) / price) * 100 : 0;
  }

  const grossProfit = price - cost;
  const markupPct = cost > 0 ? (grossProfit / cost) * 100 : 0;
  const costRatio = price > 0 ? (cost / price) * 100 : 0;

  return {
    primaryLabel: input.mode === 'from-target' ? 'Recommended Selling Price' : 'Gross Profit Margin',
    primaryValue: input.mode === 'from-target' ? price : marginPct,
    primaryFormat: input.mode === 'from-target' ? 'currency' : 'percent',
    primaryTone: grossProfit > 0 ? 'positive' : grossProfit < 0 ? 'negative' : 'neutral',
    secondaryMetrics: [
      { label: 'Gross Profit', value: formatCurrency(grossProfit, sym), tone: grossProfit >= 0 ? 'positive' : 'negative' },
      {
        label: input.mode === 'from-target' ? 'Target Margin' : 'Selling Price',
        value: input.mode === 'from-target' ? formatPercent(marginPct) : formatCurrency(price, sym),
      },
      { label: 'Markup Equivalent', value: formatPercent(markupPct) },
      { label: 'Cost-to-Revenue Ratio', value: formatPercent(costRatio) },
    ],
    breakdown: [
      { label: 'Selling Price', value: price, isCurrency: true },
      { label: 'Cost of Goods Sold', value: -cost, isCurrency: true },
      { label: 'Gross Profit', value: grossProfit, isCurrency: true, tone: grossProfit >= 0 ? 'positive' : 'negative' },
      { label: 'Gross Profit Margin', value: marginPct, isPercent: true, tone: marginPct >= 0 ? 'positive' : 'negative' },
      { label: 'Markup Percentage', value: markupPct, isPercent: true },
    ],
    segments: buildSegments(price, cost, 0, grossProfit),
  };
}

export interface MarkupInputs {
  cost: number;
  markupPct: number;
  sellingPrice: number;
  mode: 'from-markup' | 'from-price';
}

export function calculateMarkup(input: MarkupInputs, sym = '$'): CalculationOutput {
  const cost = Math.max(0, safeNum(input.cost));
  let price = Math.max(0, safeNum(input.sellingPrice));
  let markupPct = Math.max(0, safeNum(input.markupPct));

  if (input.mode === 'from-markup') {
    price = cost * (1 + markupPct / 100);
  } else {
    markupPct = cost > 0 ? ((price - cost) / cost) * 100 : 0;
  }

  const grossProfit = price - cost;
  const marginPct = price > 0 ? (grossProfit / price) * 100 : 0;
  const multiplier = cost > 0 ? price / cost : 0;

  return {
    primaryLabel: input.mode === 'from-markup' ? 'Calculated Selling Price' : 'Markup Percentage',
    primaryValue: input.mode === 'from-markup' ? price : markupPct,
    primaryFormat: input.mode === 'from-markup' ? 'currency' : 'percent',
    primaryTone: grossProfit > 0 ? 'positive' : grossProfit < 0 ? 'negative' : 'neutral',
    secondaryMetrics: [
      { label: 'Gross Profit', value: formatCurrency(grossProfit, sym), tone: grossProfit >= 0 ? 'positive' : 'negative' },
      {
        label: input.mode === 'from-markup' ? 'Markup Applied' : 'Selling Price',
        value: input.mode === 'from-markup' ? formatPercent(markupPct) : formatCurrency(price, sym),
      },
      { label: 'Gross Margin Equivalent', value: formatPercent(marginPct) },
      { label: 'Cost Multiplier', value: `${multiplier.toFixed(2)}x` },
    ],
    breakdown: [
      { label: 'Unit Cost', value: cost, isCurrency: true },
      { label: 'Selling Price', value: price, isCurrency: true },
      { label: 'Gross Profit', value: grossProfit, isCurrency: true, tone: grossProfit >= 0 ? 'positive' : 'negative' },
      { label: 'Markup on Cost', value: markupPct, isPercent: true, tone: markupPct >= 0 ? 'positive' : 'negative' },
      { label: 'Profit Margin on Price', value: marginPct, isPercent: true },
      { label: 'Price-to-Cost Multiplier', value: multiplier, isMultiplier: true },
    ],
    segments: buildSegments(price, cost, 0, grossProfit),
  };
}

export interface BreakEvenInputs {
  fixedCosts: number;
  pricePerUnit: number;
  variableCostPerUnit: number;
  targetProfit: number;
}

export function calculateBreakEven(input: BreakEvenInputs, sym = '$'): CalculationOutput {
  const fixedCosts = Math.max(0, safeNum(input.fixedCosts));
  const price = Math.max(0, safeNum(input.pricePerUnit));
  const variable = Math.max(0, safeNum(input.variableCostPerUnit));
  const targetProfit = Math.max(0, safeNum(input.targetProfit));

  const contributionMargin = price - variable;
  const contributionRatio = price > 0 ? (contributionMargin / price) * 100 : 0;
  const validMargin = contributionMargin > 0;

  const breakEvenUnits = validMargin ? Math.ceil(fixedCosts / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * price;
  const targetUnits = validMargin ? Math.ceil((fixedCosts + targetProfit) / contributionMargin) : 0;
  const targetRevenue = targetUnits * price;

  return {
    primaryLabel: validMargin ? 'Break-Even Units Required' : 'Negative Contribution Margin',
    primaryValue: breakEvenUnits,
    primaryFormat: 'integer',
    primaryTone: validMargin ? 'positive' : 'negative',
    secondaryMetrics: [
      { label: 'Break-Even Revenue', value: validMargin ? formatCurrency(breakEvenRevenue, sym) : 'N/A' },
      { label: 'Contribution Margin / Unit', value: formatCurrency(contributionMargin, sym), tone: contributionMargin > 0 ? 'positive' : 'negative' },
      { label: 'Contribution Ratio', value: formatPercent(contributionRatio) },
      { label: 'Units for Target Profit', value: validMargin ? formatInteger(targetUnits) : 'N/A' },
    ],
    breakdown: [
      { label: 'Fixed Costs', value: fixedCosts, isCurrency: true },
      { label: 'Selling Price per Unit', value: price, isCurrency: true },
      { label: 'Variable Cost per Unit', value: -variable, isCurrency: true },
      { label: 'Contribution Margin per Unit', value: contributionMargin, isCurrency: true, tone: contributionMargin > 0 ? 'positive' : 'negative' },
      { label: 'Break-Even Point (Units)', value: breakEvenUnits, isInteger: true, tone: validMargin ? 'positive' : 'negative' },
      { label: 'Break-Even Sales Revenue', value: breakEvenRevenue, isCurrency: true },
      { label: `Units Needed for ${formatCurrency(targetProfit, sym)} Profit`, value: targetUnits, isInteger: true },
      { label: 'Target Sales Revenue', value: targetRevenue, isCurrency: true },
    ],
    segments: validMargin && breakEvenRevenue > 0
      ? buildSegments(breakEvenRevenue, breakEvenUnits * variable, fixedCosts, 0)
      : buildSegments(Math.max(price, 1), variable, fixedCosts, contributionMargin),
  };
}

export interface ProductPricingInputs {
  productCost: number;
  packagingAndShipping: number;
  targetMarginPct: number;
  marketplaceFeePct: number;
  paymentFeePct: number;
  fixedOrderFee: number;
  charmPricing: boolean;
}

export function calculateProductPricing(input: ProductPricingInputs, sym = '$'): CalculationOutput {
  const cogs = Math.max(0, safeNum(input.productCost));
  const ship = Math.max(0, safeNum(input.packagingAndShipping));
  const targetMargin = Math.max(0, Math.min(85, safeNum(input.targetMarginPct)));
  const mktPct = Math.max(0, safeNum(input.marketplaceFeePct));
  const payPct = Math.max(0, safeNum(input.paymentFeePct));
  const fixedFee = Math.max(0, safeNum(input.fixedOrderFee));

  const denominator = 1 - (targetMargin + mktPct + payPct) / 100;
  const valid = denominator > 0.01;
  const rawPrice = valid ? (cogs + ship + fixedFee) / denominator : 0;
  const finalPrice =
    valid && input.charmPricing && rawPrice > 1
      ? Math.max(0.99, Math.ceil(rawPrice) - 0.01)
      : rawPrice;

  const fees = finalPrice > 0 ? finalPrice * ((mktPct + payPct) / 100) + fixedFee : 0;
  const netProfit = finalPrice - cogs - ship - fees;
  const realizedMargin = finalPrice > 0 ? (netProfit / finalPrice) * 100 : 0;
  const markup = cogs + ship > 0 ? ((finalPrice - (cogs + ship)) / (cogs + ship)) * 100 : 0;

  return {
    primaryLabel: valid ? 'Recommended Retail Price' : 'Fee + Margin Exceeds 100%',
    primaryValue: finalPrice,
    primaryFormat: 'currency',
    primaryTone: valid ? 'positive' : 'negative',
    secondaryMetrics: [
      { label: 'Net Profit per Sale', value: formatCurrency(netProfit, sym), tone: netProfit >= 0 ? 'positive' : 'negative' },
      { label: 'Realized Net Margin', value: formatPercent(realizedMargin) },
      { label: 'Estimated Fees', value: formatCurrency(fees, sym), tone: 'warning' },
      { label: 'Gross Markup', value: formatPercent(markup) },
    ],
    breakdown: [
      { label: 'Recommended Selling Price', value: finalPrice, isCurrency: true, tone: 'positive' },
      { label: 'Product Cost (COGS)', value: -cogs, isCurrency: true },
      { label: 'Packaging & Shipping', value: -ship, isCurrency: true },
      { label: `Marketplace + Payment Fees (${(mktPct + payPct).toFixed(2)}% + ${formatCurrency(fixedFee, sym)})`, value: -fees, isCurrency: true, tone: 'warning' },
      { label: 'Net Profit per Unit', value: netProfit, isCurrency: true, tone: netProfit >= 0 ? 'positive' : 'negative' },
      { label: 'Realized Profit Margin', value: realizedMargin, isPercent: true },
    ],
    segments: buildSegments(finalPrice, cogs + ship, fees, netProfit),
  };
}

export interface DropshippingInputs {
  retailPrice: number;
  supplierCost: number;
  supplierShipping: number;
  cpaAdSpend: number;
  gatewayFeePct: number;
  gatewayFixed: number;
  refundReservePct: number;
}

export function calculateDropshipping(input: DropshippingInputs, sym = '$'): CalculationOutput {
  const price = Math.max(0, safeNum(input.retailPrice));
  const supplierCost = Math.max(0, safeNum(input.supplierCost));
  const supplierShip = Math.max(0, safeNum(input.supplierShipping));
  const cpa = Math.max(0, safeNum(input.cpaAdSpend));
  const gwPct = Math.max(0, safeNum(input.gatewayFeePct));
  const gwFixed = Math.max(0, safeNum(input.gatewayFixed));
  const refundPct = Math.max(0, safeNum(input.refundReservePct));

  const gatewayFee = price > 0 ? price * (gwPct / 100) + gwFixed : 0;
  const refundReserve = price * (refundPct / 100);
  const landedFulfillment = supplierCost + supplierShip;
  const totalExpenses = landedFulfillment + cpa + gatewayFee + refundReserve;
  const netProfit = price - totalExpenses;

  const netMargin = price > 0 ? (netProfit / price) * 100 : 0;
  const roas = cpa > 0 ? price / cpa : 0;
  const preAdProfit = price - landedFulfillment - gatewayFee - refundReserve;
  const breakEvenRoas = preAdProfit > 0 ? price / preAdProfit : 0;

  return {
    primaryLabel: netProfit >= 0 ? 'Net Profit per Order' : 'Net Loss per Order',
    primaryValue: netProfit,
    primaryFormat: 'currency',
    primaryTone: netProfit > 0 ? 'positive' : netProfit < 0 ? 'negative' : 'neutral',
    secondaryMetrics: [
      { label: 'Net Profit Margin', value: formatPercent(netMargin), tone: netMargin >= 15 ? 'positive' : netMargin > 0 ? 'warning' : 'negative' },
      { label: 'Current ROAS', value: `${roas.toFixed(2)}x` },
      { label: 'Break-Even ROAS', value: `${breakEvenRoas.toFixed(2)}x` },
      { label: 'Max Profitable CPA', value: formatCurrency(Math.max(0, preAdProfit), sym) },
    ],
    breakdown: [
      { label: 'Store Retail Price', value: price, isCurrency: true },
      { label: 'Supplier Product Cost', value: -supplierCost, isCurrency: true },
      { label: 'Supplier Shipping Cost', value: -supplierShip, isCurrency: true },
      { label: 'Ad Spend per Order (CPA)', value: -cpa, isCurrency: true, tone: 'warning' },
      { label: `Gateway Fee (${gwPct.toFixed(2)}% + ${formatCurrency(gwFixed, sym)})`, value: -gatewayFee, isCurrency: true, tone: 'warning' },
      { label: `Refund / Chargeback Reserve (${refundPct.toFixed(1)}%)`, value: -refundReserve, isCurrency: true },
      { label: 'Net Profit per Order', value: netProfit, isCurrency: true, tone: netProfit >= 0 ? 'positive' : 'negative' },
    ],
    segments: buildSegments(price, landedFulfillment + refundReserve, cpa + gatewayFee, netProfit),
  };
}

export interface RoasInputs {
  adRevenue: number;
  adSpend: number;
  grossMarginPct: number;
}

export function calculateRoas(input: RoasInputs, sym = '$'): CalculationOutput {
  const revenue = Math.max(0, safeNum(input.adRevenue));
  const spend = Math.max(0, safeNum(input.adSpend));
  const gmPct = Math.max(0.1, Math.min(100, safeNum(input.grossMarginPct)));

  const roas = spend > 0 ? revenue / spend : 0;
  const acos = revenue > 0 ? (spend / revenue) * 100 : 0;
  const grossProfit = revenue * (gmPct / 100);
  const netAdProfit = grossProfit - spend;
  const breakEvenRoas = 100 / gmPct;
  const cogsAndFulfillment = revenue - grossProfit;

  return {
    primaryLabel: 'Return on Ad Spend (ROAS)',
    primaryValue: roas,
    primaryFormat: 'multiplier',
    primaryTone: roas >= breakEvenRoas ? 'positive' : 'negative',
    secondaryMetrics: [
      { label: 'Net Profit After Ads', value: formatCurrency(netAdProfit, sym), tone: netAdProfit >= 0 ? 'positive' : 'negative' },
      { label: 'Break-Even ROAS', value: `${breakEvenRoas.toFixed(2)}x` },
      { label: 'ACoS (Ad Cost / Rev)', value: formatPercent(acos) },
      { label: 'Gross Profit Pre-Ads', value: formatCurrency(grossProfit, sym) },
    ],
    breakdown: [
      { label: 'Attributed Ad Revenue', value: revenue, isCurrency: true },
      { label: `COGS & Variable Costs (${(100 - gmPct).toFixed(1)}%)`, value: -cogsAndFulfillment, isCurrency: true },
      { label: `Gross Profit (${gmPct.toFixed(1)}% Margin)`, value: grossProfit, isCurrency: true },
      { label: 'Total Ad Spend', value: -spend, isCurrency: true, tone: 'warning' },
      { label: 'Net Campaign Profit', value: netAdProfit, isCurrency: true, tone: netAdProfit >= 0 ? 'positive' : 'negative' },
      { label: 'Realized ROAS', value: roas, isMultiplier: true, tone: roas >= breakEvenRoas ? 'positive' : 'negative' },
      { label: 'Break-Even ROAS Threshold', value: breakEvenRoas, isMultiplier: true },
    ],
    segments: buildSegments(revenue, cogsAndFulfillment, spend, netAdProfit),
  };
}

export interface CpaInputs {
  adBudget: number;
  cpc: number;
  conversionRatePct: number;
  averageOrderValue: number;
  grossMarginPct: number;
}

export function calculateCpa(input: CpaInputs, sym = '$'): CalculationOutput {
  const budget = Math.max(0, safeNum(input.adBudget));
  const cpc = Math.max(0.01, safeNum(input.cpc));
  const cvr = Math.max(0, safeNum(input.conversionRatePct));
  const aov = Math.max(0, safeNum(input.averageOrderValue));
  const gmPct = Math.max(0, Math.min(100, safeNum(input.grossMarginPct)));

  const clicks = budget / cpc;
  const orders = clicks * (cvr / 100);
  const cpa = orders > 0 ? budget / orders : 0;
  const revenue = orders * aov;
  const grossProfit = revenue * (gmPct / 100);
  const netProfit = grossProfit - budget;
  const maxAllowableCpa = aov * (gmPct / 100);

  return {
    primaryLabel: 'Cost Per Acquisition (CPA)',
    primaryValue: cpa,
    primaryFormat: 'currency',
    primaryTone: orders > 0 && cpa <= maxAllowableCpa ? 'positive' : 'warning',
    secondaryMetrics: [
      { label: 'Estimated Orders', value: formatInteger(orders) },
      { label: 'Projected Revenue', value: formatCurrency(revenue, sym) },
      { label: 'Max Break-Even CPA', value: formatCurrency(maxAllowableCpa, sym) },
      { label: 'Net Campaign Profit', value: formatCurrency(netProfit, sym), tone: netProfit >= 0 ? 'positive' : 'negative' },
    ],
    breakdown: [
      { label: 'Total Ad Budget', value: budget, isCurrency: true },
      { label: 'Estimated Paid Clicks', value: Math.round(clicks), isInteger: true },
      { label: 'Estimated Orders', value: Math.round(orders), isInteger: true },
      { label: 'Cost Per Acquisition (CPA)', value: cpa, isCurrency: true, tone: 'warning' },
      { label: 'Gross Revenue Generated', value: revenue, isCurrency: true },
      { label: `Gross Profit Pre-Ads (${gmPct.toFixed(1)}%)`, value: grossProfit, isCurrency: true },
      { label: 'Net Campaign Profit', value: netProfit, isCurrency: true, tone: netProfit >= 0 ? 'positive' : 'negative' },
    ],
    segments: buildSegments(revenue, revenue - grossProfit, budget, netProfit),
  };
}

export interface SalesTaxInputs {
  amount: number;
  taxRatePct: number;
  mode: 'add' | 'extract';
}

export function calculateSalesTax(input: SalesTaxInputs, sym = '$'): CalculationOutput {
  const amount = Math.max(0, safeNum(input.amount));
  const rate = Math.max(0, safeNum(input.taxRatePct));

  let netAmount = amount;
  let taxAmount = 0;
  let grossAmount = amount;

  if (input.mode === 'add') {
    netAmount = amount;
    taxAmount = netAmount * (rate / 100);
    grossAmount = netAmount + taxAmount;
  } else {
    grossAmount = amount;
    netAmount = grossAmount / (1 + rate / 100);
    taxAmount = grossAmount - netAmount;
  }

  return {
    primaryLabel: input.mode === 'add' ? 'Total Price Including Tax' : 'Net Price Excluding Tax',
    primaryValue: input.mode === 'add' ? grossAmount : netAmount,
    primaryFormat: 'currency',
    primaryTone: 'positive',
    secondaryMetrics: [
      { label: 'Tax / VAT Amount', value: formatCurrency(taxAmount, sym), tone: 'warning' },
      { label: 'Net Pre-Tax Price', value: formatCurrency(netAmount, sym) },
      { label: 'Gross Total', value: formatCurrency(grossAmount, sym) },
      { label: 'Effective Tax Rate', value: formatPercent(rate) },
    ],
    breakdown: [
      { label: 'Net Amount (Before Tax)', value: netAmount, isCurrency: true },
      { label: `Sales Tax / VAT (${rate.toFixed(2)}%)`, value: taxAmount, isCurrency: true, tone: 'warning' },
      { label: 'Gross Customer Total', value: grossAmount, isCurrency: true, tone: 'positive' },
    ],
    segments: buildSegments(grossAmount, 0, taxAmount, netAmount),
  };
}

export interface InventoryReorderInputs {
  dailyUnitsSold: number;
  leadTimeDays: number;
  safetyStockDays: number;
  unitLandedCost: number;
  orderCycleDays: number;
}

export function calculateInventoryReorder(input: InventoryReorderInputs, sym = '$'): CalculationOutput {
  const dailyUnits = Math.max(0, safeNum(input.dailyUnitsSold));
  const leadDays = Math.max(0, safeNum(input.leadTimeDays));
  const safetyDays = Math.max(0, safeNum(input.safetyStockDays));
  const unitCost = Math.max(0, safeNum(input.unitLandedCost));
  const cycleDays = Math.max(1, safeNum(input.orderCycleDays));

  const leadTimeDemand = Math.ceil(dailyUnits * leadDays);
  const safetyUnits = Math.ceil(dailyUnits * safetyDays);
  const reorderPointUnits = leadTimeDemand + safetyUnits;
  const recommendedOrderQty = Math.ceil(dailyUnits * cycleDays);
  const orderCapitalRequired = recommendedOrderQty * unitCost;
  const safetyCapitalLocked = safetyUnits * unitCost;

  return {
    primaryLabel: 'Reorder Point (Units in Stock)',
    primaryValue: reorderPointUnits,
    primaryFormat: 'integer',
    primaryTone: 'positive',
    secondaryMetrics: [
      { label: 'Next PO Quantity', value: `${formatInteger(recommendedOrderQty)} units` },
      { label: 'PO Capital Needed', value: formatCurrency(orderCapitalRequired, sym), tone: 'warning' },
      { label: 'Safety Stock Buffer', value: `${formatInteger(safetyUnits)} units` },
      { label: 'Lead-Time Demand', value: `${formatInteger(leadTimeDemand)} units` },
    ],
    breakdown: [
      { label: 'Average Daily Sales Velocity', value: dailyUnits, isInteger: true },
      { label: `Lead-Time Demand (${leadDays} days)`, value: leadTimeDemand, isInteger: true },
      { label: `Safety Stock Buffer (${safetyDays} days)`, value: safetyUnits, isInteger: true },
      { label: 'Reorder Point Trigger (Units)', value: reorderPointUnits, isInteger: true, tone: 'positive' },
      { label: `Replenishment Order Qty (${cycleDays} days coverage)`, value: recommendedOrderQty, isInteger: true },
      { label: 'Capital Tied in Safety Stock', value: safetyCapitalLocked, isCurrency: true },
      { label: 'Total Purchase Order Capital Required', value: orderCapitalRequired, isCurrency: true, tone: 'warning' },
    ],
    segments: buildSegments(
      Math.max(orderCapitalRequired, 1),
      safetyCapitalLocked,
      Math.max(0, orderCapitalRequired - safetyCapitalLocked),
      0
    ),
  };
}

export interface MarketplaceComparisonInputs {
  sellingPrice: number;
  shippingCharged: number;
  productCost: number;
  shippingCost: number;
  adSpendPerUnit: number;
  fbaFulfillmentFee: number;
}

export interface MarketplaceChannelResult {
  channel: string;
  fees: number;
  netProfit: number;
  marginPct: number;
  roiPct: number;
  effectiveFeePct: number;
}

export function calculateMarketplaceComparison(
  input: MarketplaceComparisonInputs,
  sym = '$'
): { output: CalculationOutput; channels: MarketplaceChannelResult[] } {
  const price = Math.max(0, safeNum(input.sellingPrice));
  const shipCharged = Math.max(0, safeNum(input.shippingCharged));
  const cogs = Math.max(0, safeNum(input.productCost));
  const shipCost = Math.max(0, safeNum(input.shippingCost));
  const adSpend = Math.max(0, safeNum(input.adSpendPerUnit));
  const fbaFee = Math.max(0, safeNum(input.fbaFulfillmentFee));

  const gross = price + shipCharged;
  const selfFulfillCost = cogs + shipCost + adSpend;
  const fbaBaseCost = cogs + adSpend;

  const makeRow = (channel: string, fees: number, costBasis: number): MarketplaceChannelResult => {
    const netProfit = gross - costBasis - fees;
    return {
      channel,
      fees,
      netProfit,
      marginPct: gross > 0 ? (netProfit / gross) * 100 : 0,
      roiPct: costBasis > 0 ? (netProfit / costBasis) * 100 : 0,
      effectiveFeePct: gross > 0 ? (fees / gross) * 100 : 0,
    };
  };

  const channels: MarketplaceChannelResult[] = [
    makeRow(
      'Shopify (Stripe 2.9% + 0.30)',
      gross > 0 ? gross * 0.029 + 0.3 : 0,
      selfFulfillCost
    ),
    makeRow(
      'TikTok Shop (6% Referral)',
      gross * 0.06,
      selfFulfillCost
    ),
    makeRow(
      'Etsy (6.5% + 3% + $0.45)',
      gross > 0 ? gross * 0.095 + 0.45 : 0,
      selfFulfillCost
    ),
    makeRow(
      'eBay (13.25% + Per-Order)',
      gross > 0 ? gross * 0.1325 + (gross > 10 ? 0.4 : 0.3) : 0,
      selfFulfillCost
    ),
    makeRow(
      'Walmart WFS (15% + FBA-eq)',
      gross * 0.15 + fbaFee,
      fbaBaseCost
    ),
    makeRow(
      'Amazon FBA (15% + FBA)',
      Math.max(gross > 0 ? 0.3 : 0, gross * 0.15) + fbaFee,
      fbaBaseCost
    ),
  ].sort((a, b) => b.netProfit - a.netProfit);

  const best = channels[0];
  const worst = channels[channels.length - 1];

  const output: CalculationOutput = {
    primaryLabel: `Most Profitable Channel: ${best.channel.split(' (')[0]}`,
    primaryValue: best.netProfit,
    primaryFormat: 'currency',
    primaryTone: best.netProfit >= 0 ? 'positive' : 'negative',
    secondaryMetrics: [
      { label: 'Best Net Margin', value: formatPercent(best.marginPct), tone: best.marginPct >= 15 ? 'positive' : 'warning' },
      { label: 'Best Channel Fees', value: formatCurrency(best.fees, sym), tone: 'warning' },
      { label: 'Profit Spread (Best vs Lowest)', value: formatCurrency(best.netProfit - worst.netProfit, sym) },
      { label: 'Gross Order Total', value: formatCurrency(gross, sym) },
    ],
    breakdown: channels.map((ch) => ({
      label: `${ch.channel} (Fees: ${formatCurrency(ch.fees, sym)})`,
      value: ch.netProfit,
      isCurrency: true,
      tone: ch.netProfit > 0 ? 'positive' : ch.netProfit < 0 ? 'negative' : 'neutral',
      subtext: `Margin: ${ch.marginPct.toFixed(1)}% · ROI: ${ch.roiPct.toFixed(1)}%`,
    })),
    segments: buildSegments(gross, selfFulfillCost, best.fees, best.netProfit),
  };

  return { output, channels };
}

export interface BatchSkuRowInput {
  sku: string;
  price: number;
  cogs: number;
  shipping: number;
  feePct: number;
  fixedFee: number;
  adSpend: number;
  units: number;
}

export interface BatchSkuRowResult extends BatchSkuRowInput {
  feesPerUnit: number;
  netProfitPerUnit: number;
  marginPct: number;
  roiPct: number;
  totalProfit: number;
  totalRevenue: number;
}

export function parseBatchSkuCsv(rawCsv: string): BatchSkuRowInput[] {
  const lines = rawCsv
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return [];

  const startIdx = /^sku|price|cost/i.test(lines[0]) ? 1 : 0;
  return lines.slice(startIdx).map((line, idx) => {
    const cols = line.split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
    return {
      sku: cols[0] || `SKU-${idx + 1}`,
      price: Math.max(0, parseFloat(cols[1]) || 0),
      cogs: Math.max(0, parseFloat(cols[2]) || 0),
      shipping: Math.max(0, parseFloat(cols[3]) || 0),
      feePct: Math.max(0, parseFloat(cols[4]) || 0),
      fixedFee: Math.max(0, parseFloat(cols[5]) || 0),
      adSpend: Math.max(0, parseFloat(cols[6]) || 0),
      units: Math.max(1, Math.round(parseFloat(cols[7]) || 1)),
    };
  });
}

export function auditBatchSkus(
  rows: BatchSkuRowInput[],
  sym = '$'
): { output: CalculationOutput; auditedRows: BatchSkuRowResult[] } {
  const auditedRows: BatchSkuRowResult[] = rows.map((row) => {
    const feesPerUnit = row.price > 0 ? row.price * (row.feePct / 100) + row.fixedFee : 0;
    const directCost = row.cogs + row.shipping + row.adSpend;
    const netProfitPerUnit = row.price - directCost - feesPerUnit;
    const marginPct = row.price > 0 ? (netProfitPerUnit / row.price) * 100 : 0;
    const roiPct = directCost > 0 ? (netProfitPerUnit / directCost) * 100 : 0;
    return {
      ...row,
      feesPerUnit,
      netProfitPerUnit,
      marginPct,
      roiPct,
      totalProfit: netProfitPerUnit * row.units,
      totalRevenue: row.price * row.units,
    };
  });

  const totalRevenue = auditedRows.reduce((s, r) => s + r.totalRevenue, 0);
  const totalProfit = auditedRows.reduce((s, r) => s + r.totalProfit, 0);
  const totalFees = auditedRows.reduce((s, r) => s + r.feesPerUnit * r.units, 0);
  const totalDirectCost = auditedRows.reduce(
    (s, r) => s + (r.cogs + r.shipping + r.adSpend) * r.units,
    0
  );
  const blendedMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const profitableCount = auditedRows.filter((r) => r.netProfitPerUnit > 0).length;

  const output: CalculationOutput = {
    primaryLabel: totalProfit >= 0 ? 'Total Catalog Net Profit' : 'Total Catalog Net Loss',
    primaryValue: totalProfit,
    primaryFormat: 'currency',
    primaryTone: totalProfit > 0 ? 'positive' : totalProfit < 0 ? 'negative' : 'neutral',
    secondaryMetrics: [
      { label: 'Catalog Revenue', value: formatCurrency(totalRevenue, sym) },
      { label: 'Blended Net Margin', value: formatPercent(blendedMargin), tone: blendedMargin >= 15 ? 'positive' : 'warning' },
      { label: 'Total Fees', value: formatCurrency(totalFees, sym), tone: 'warning' },
      { label: 'Profitable SKUs', value: `${profitableCount} / ${auditedRows.length}` },
    ],
    breakdown: auditedRows.map((r) => ({
      label: `${r.sku} (${r.units} units @ ${formatCurrency(r.price, sym)})`,
      value: r.totalProfit,
      isCurrency: true,
      tone: r.totalProfit >= 0 ? 'positive' : 'negative',
      subtext: `Unit Profit: ${formatCurrency(r.netProfitPerUnit, sym)} · Margin: ${r.marginPct.toFixed(1)}%`,
    })),
    segments: buildSegments(totalRevenue, totalDirectCost, totalFees, totalProfit),
  };

  return { output, auditedRows };
}


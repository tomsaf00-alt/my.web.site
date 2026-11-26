import assert from 'node:assert/strict';
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
  parseBatchSkuCsv,
} from '../src/utils/calculations';

const approx = (actual: number, expected: number, eps = 0.02, msg = '') => {
  assert.ok(
    Math.abs(actual - expected) <= eps,
    `${msg} Expected ~${expected}, got ${actual}`
  );
};

// 1. eBay Fee Calculator
{
  const res = calculateEbay({
    salePrice: 65,
    shippingCharged: 8,
    itemCost: 22,
    shippingCost: 7.5,
    feeRate: 13.25,
    adRate: 2,
    salesTaxRate: 7,
    storeDiscount: false,
  });
  approx(res.primaryValue, 31.19, 0.02, 'eBay net profit');
}

// 2. Etsy Fee Calculator
{
  const res = calculateEtsy({
    itemPrice: 38,
    shippingCharged: 5,
    itemCost: 11,
    shippingCost: 4.8,
    processingRate: 3,
    processingFixed: 0.25,
    offsiteAdsRate: 0,
    includeListingFee: true,
  });
  approx(res.primaryValue, 22.67, 0.02, 'Etsy net profit');
}

// 3. Amazon FBA Calculator
{
  const res = calculateAmazonFba({
    sellingPrice: 34.99,
    landedCost: 8.5,
    referralRate: 15,
    fbaFulfillmentFee: 5.4,
    monthlyStorageFee: 0.65,
    ppcSpendPerUnit: 3.2,
    returnAllowancePct: 3,
  });
  approx(res.primaryValue, 10.94, 0.02, 'Amazon FBA net profit');
}

// 4. TikTok Shop Calculator
{
  const res = calculateTikTokShop({
    salePrice: 29,
    shippingCharged: 0,
    productCost: 6.5,
    shippingCost: 4.25,
    referralFeePct: 6,
    affiliateCommissionPct: 15,
    adSpendPerOrder: 2,
  });
  approx(res.primaryValue, 10.16, 0.02, 'TikTok Shop profit');
}

// 5. Walmart Seller Calculator
{
  const res = calculateWalmart({
    sellingPrice: 32,
    shippingCharged: 0,
    productCost: 9.2,
    wfsFulfillmentFee: 4.95,
    monthlyStorageFee: 0.45,
    referralRate: 15,
    adSpendPerUnit: 2,
  });
  approx(res.primaryValue, 10.6, 0.02, 'Walmart net profit');
}

// 6. Marketplace Comparison Calculator
{
  const { output, channels } = calculateMarketplaceComparison({
    sellingPrice: 39.99,
    shippingCharged: 0,
    productCost: 10.5,
    shippingCost: 4.75,
    adSpendPerUnit: 3,
    fbaFulfillmentFee: 5.4,
  });
  assert.equal(channels.length, 6);
  assert.ok(channels[0].channel.startsWith('Shopify'));
  approx(output.primaryValue, 20.28, 0.03, 'Shopify comparison profit');
}

// 7. Payment Fee Calculators (Deduct + Reverse)
{
  const deduct = calculatePaymentFee(
    {
      amount: 250,
      feePercent: 2.9,
      fixedFee: 0.3,
      internationalSurchargePct: 0,
      mode: 'deduct',
      currencySymbol: '$',
    },
    'Stripe'
  );
  approx(deduct.primaryValue, 242.45, 0.01, 'Stripe deduct net');

  const reverse = calculatePaymentFee(
    {
      amount: 500,
      feePercent: 2.99,
      fixedFee: 0.49,
      internationalSurchargePct: 0,
      mode: 'reverse',
      currencySymbol: '$',
    },
    'PayPal'
  );
  approx(reverse.primaryValue, 515.92, 0.01, 'PayPal reverse gross');
}

// 8. Profit, ROI, Margin, Markup
{
  const prof = calculateProfit({
    sellingPrice: 49,
    unitCost: 16,
    shippingCost: 5.5,
    platformFeePct: 10,
    fixedFee: 0.3,
    marketingCost: 4,
    unitsSold: 100,
  });
  approx(prof.primaryValue, 18.3, 0.01, 'Profit calculator unit profit');

  const roi = calculateRoi({
    amountInvested: 2500,
    amountReturned: 4100,
    extraExpenses: 220,
    monthsHeld: 4,
  });
  approx(roi.primaryValue, 50.74, 0.02, 'ROI simple %');

  const margin = calculateMargin({
    cost: 18,
    sellingPrice: 36,
    targetMarginPct: 50,
    mode: 'from-target',
  });
  approx(margin.primaryValue, 36, 0.01, 'Margin target price');

  const markup = calculateMarkup({
    cost: 25,
    markupPct: 60,
    sellingPrice: 40,
    mode: 'from-markup',
  });
  approx(markup.primaryValue, 40, 0.01, 'Markup selling price');
}

// 9. Break-Even, Product Pricing, Dropshipping
{
  const be = calculateBreakEven({
    fixedCosts: 1800,
    pricePerUnit: 45,
    variableCostPerUnit: 21,
    targetProfit: 1500,
  });
  assert.equal(be.primaryValue, 75);

  const pricing = calculateProductPricing({
    productCost: 12,
    packagingAndShipping: 4.5,
    targetMarginPct: 25,
    marketplaceFeePct: 15,
    paymentFeePct: 2.9,
    fixedOrderFee: 0.3,
    charmPricing: true,
  });
  approx(pricing.primaryValue, 29.99, 0.01, 'Product pricing charm price');

  const ds = calculateDropshipping({
    retailPrice: 59.99,
    supplierCost: 14.5,
    supplierShipping: 4.5,
    cpaAdSpend: 18,
    gatewayFeePct: 2.9,
    gatewayFixed: 0.3,
    refundReservePct: 3,
  });
  approx(ds.primaryValue, 19.15, 0.02, 'Dropshipping unit profit');
}

// 10. Batch CSV SKU Auditor
{
  const csv = [
    'SKU,Price,COGS,Shipping,FeePct,FixedFee,AdSpend,Units',
    'SKU-1,40,10,5,10,0.5,2,10',
    'SKU-2,20,12,5,15,0.3,3,5',
  ].join('\n');
  const rows = parseBatchSkuCsv(csv);
  assert.equal(rows.length, 2);
  const { output, auditedRows } = auditBatchSkus(rows);
  approx(auditedRows[0].netProfitPerUnit, 18.5, 0.01, 'Batch row 1 unit profit');
  approx(auditedRows[1].netProfitPerUnit, -3.3, 0.01, 'Batch row 2 unit loss');
  approx(output.primaryValue, 168.5, 0.01, 'Batch catalog total profit');
}

// 11. ROAS, CPA, Sales Tax, Inventory Reorder
{
  const roas = calculateRoas({ adRevenue: 12000, adSpend: 3000, grossMarginPct: 45 });
  approx(roas.primaryValue, 4.0, 0.01, 'ROAS ratio');

  const cpa = calculateCpa({
    adBudget: 2000,
    cpc: 1.25,
    conversionRatePct: 2.8,
    averageOrderValue: 75,
    grossMarginPct: 50,
  });
  approx(cpa.primaryValue, 44.64, 0.02, 'CPA cost');

  const tax = calculateSalesTax({ amount: 120, taxRatePct: 20, mode: 'extract' });
  approx(tax.primaryValue, 100, 0.01, 'Tax extraction net');

  const inv = calculateInventoryReorder({
    dailyUnitsSold: 18,
    leadTimeDays: 30,
    safetyStockDays: 14,
    unitLandedCost: 7.5,
    orderCycleDays: 60,
  });
  assert.equal(inv.primaryValue, 792);
}

console.log('All 21 SellerMath calculation tests passed.');

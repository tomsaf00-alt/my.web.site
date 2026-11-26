import { BlogCategory, BlogPost } from '../types/calculator';

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Ecommerce',
  'Amazon FBA',
  'Etsy',
  'eBay',
  'Shopify',
  'Profit & Margin',
  'Online Selling',
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'margin-vs-markup-for-ecommerce-sellers',
    title: 'Margin vs. Markup: The Pricing Mistake That Costs Sellers Thousands',
    category: 'Profit & Margin',
    publishedAt: 'November 18, 2026',
    readTime: '5 min read',
    excerpt:
      'Learn why confusing a 50% markup with a 50% gross margin leads to underpriced SKUs—and how to set fee-safe retail prices.',
    seoTitle: 'Margin vs. Markup Explained for Ecommerce Sellers | SellerMath',
    seoDescription:
      'Understand the exact difference between profit margin and markup, view real pricing formulas, and avoid underpricing your ecommerce catalog.',
    sections: [
      {
        heading: 'Why Markup and Margin Are Not Interchangeable',
        paragraphs: [
          'Markup measures profit relative to your unit cost, while gross profit margin measures profit relative to your selling price. Because selling price is always larger than cost on a profitable item, your margin percentage is always lower than your markup percentage.',
          'For example, buying a product for $20 and selling it for $30 produces $10 of gross profit. That is a 50% markup ($10 / $20), but only a 33.33% gross margin ($10 / $30).',
        ],
      },
      {
        heading: 'How Marketplace Fees Compound Underpricing',
        paragraphs: [
          'When you sell on eBay, Amazon, or Etsy, marketplace commissions of 13% to 15% and payment processing fees of ~3% are deducted from the gross selling price—not from your cost. If you priced an item assuming a 30% cushion using markup math, platform fees can erase nearly half your profit.',
          'Always solve retail prices from target net margin using Price = (COGS + Shipping + Fixed Fee) ÷ (1 − Target Margin % − Fee %).',
        ],
        table: {
          caption: 'Markup vs. Gross Margin Quick Reference Table',
          headers: ['Cost Multiplier', 'Markup % on Cost', 'Gross Margin % on Price', 'Net Margin After 15% Fee'],
          rows: [
            ['1.25x', '25.0%', '20.0%', '5.0%'],
            ['1.50x', '50.0%', '33.3%', '18.3%'],
            ['1.75x', '75.0%', '42.9%', '27.9%'],
            ['2.00x (Keystone)', '100.0%', '50.0%', '35.0%'],
            ['2.50x', '150.0%', '60.0%', '45.0%'],
          ],
        },
      },
    ],
    relatedCalculators: ['margin-calculator', 'markup-calculator', 'product-pricing-calculator'],
  },
  {
    slug: 'ebay-fee-breakdown-and-pricing-guide',
    title: '2026 eBay Fee Breakdown: Final Value Fees, Sales Tax Base & Store Discounts',
    category: 'eBay',
    publishedAt: 'November 14, 2026',
    readTime: '6 min read',
    excerpt:
      'A complete guide to how eBay calculates final value fees on shipping and collected sales tax—plus when an eBay Store subscription pays for itself.',
    seoTitle: 'eBay Fee Breakdown & Seller Pricing Guide | SellerMath',
    seoDescription:
      'Understand eBay final value fees, per-order fixed fees, promoted listings, and how sales tax affects your take-home profit.',
    sections: [
      {
        heading: 'Understanding eBay’s Total-Sale Fee Base',
        paragraphs: [
          'Many new eBay sellers assume the 13.25% final value fee applies only to the item price. In reality, eBay applies the percentage fee to the total buyer payment: item price, shipping charged, and state sales tax collected at checkout.',
          'On a $100 order with $10 shipping and 7% sales tax, the fee base is $117.70 rather than $100.00—adding $2.35 in extra fee deductions that must be built into your pricing model.',
        ],
      },
      {
        heading: 'Promoted Listings and Break-Even Pricing',
        paragraphs: [
          'Promoted Listings Standard ads are also assessed on the total sale amount when an attributed buyer purchases. Before setting a 5% or 8% ad rate, verify your break-even sale price and net margin after both final value fees and ad spend.',
          'For high-volume sellers generating over $3,500/month in GMV, upgrading to an eBay Basic or Premium Store reduces final value fees by ~0.9%–1.0%, which often covers the monthly subscription within the first 25–40 orders.',
        ],
        table: {
          caption: '2026 Marketplace Commission Benchmark Comparison ($50 Order)',
          headers: ['Channel', 'Headline Fee Rate', 'Fixed Fee', 'Notes'],
          rows: [
            ['eBay (Most Categories)', '13.25%', '$0.30 / $0.40', 'Applied to item + shipping + sales tax'],
            ['Amazon FBA (Standard)', '15.00%', 'Min $0.30', 'Plus FBA pick-and-pack fulfillment'],
            ['Etsy Standard Shop', '6.5% + 3.0% Pay', '$0.20 + $0.25', '+12%–15% if attributed via Offsite Ads'],
            ['TikTok Shop US', '6.0%–8.0%', '$0.00', 'Excludes creator affiliate commissions'],
            ['Walmart Marketplace', '8.0%–15.0%', '$0.00', 'No monthly store subscription fee'],
          ],
        },
      },
    ],
    relatedCalculators: ['ebay-fee-calculator', 'marketplace-comparison-calculator', 'break-even-calculator'],
  },
  {
    slug: 'amazon-fba-break-even-acos-guide',
    title: 'How to Calculate Break-Even ACoS Before Launching an Amazon FBA Product',
    category: 'Amazon FBA',
    publishedAt: 'November 10, 2026',
    readTime: '6 min read',
    excerpt:
      'Stop guessing Amazon PPC bids. Use your pre-ad unit margin to establish your exact Break-Even ACoS ceiling and scale Sponsored Products profitably.',
    seoTitle: 'Amazon FBA Break-Even ACoS Calculation Guide | SellerMath',
    seoDescription:
      'Learn how to calculate Break-Even ACoS for Amazon FBA products using referral fees, FBA fulfillment, landed COGS, and return reserves.',
    sections: [
      {
        heading: 'What Break-Even ACoS Actually Measures',
        paragraphs: [
          'Advertising Cost of Sales (ACoS) divides ad spend by attributed ad sales. Your Break-Even ACoS equals your pre-ad gross profit margin—meaning the maximum percentage of revenue you can spend on PPC without losing money on that unit.',
          'If a $35 SKU nets $11.20 before ads (a 32% pre-ad margin), your Break-Even ACoS is 32%. Any PPC campaign running below 32% ACoS produces positive cash flow on every attributed sale.',
        ],
      },
      {
        heading: 'Factoring Storage and Return Reserves',
        paragraphs: [
          'Never compute Break-Even ACoS without subtracting monthly FBA storage and a 2%–5% customer return allowance. Overlooking return losses artificially inflates your allowable ad spend and turns seemingly profitable keywords negative.',
        ],
      },
    ],
    relatedCalculators: ['amazon-fba-calculator', 'roas-calculator', 'inventory-reorder-calculator'],
  },
  {
    slug: 'etsy-pricing-strategy-and-offsite-ads',
    title: 'Etsy Fee Structure & Offsite Ads: How Handmade Sellers Protect Margins',
    category: 'Etsy',
    publishedAt: 'November 06, 2026',
    readTime: '5 min read',
    excerpt:
      'How to price handmade and digital items to absorb Etsy’s 6.5% transaction fee, payment processing, and mandatory 12%–15% Offsite Ads charges.',
    seoTitle: 'Etsy Pricing Strategy & Offsite Ads Fee Guide | SellerMath',
    seoDescription:
      'Protect handmade shop margins against Etsy listing fees, 6.5% transaction fees, payment processing, and 12%–15% Offsite Ads fees.',
    sections: [
      {
        heading: 'The Four Fee Layers on Every Etsy Order',
        paragraphs: [
          'Every standard Etsy sale carries a $0.20 listing fee, a 6.5% transaction fee on item plus shipping, and a regional Etsy Payments fee (3% + $0.25 in the US). Together, baseline fees usually total 10% to 11.5% of order value.',
          'If a shopper arrives via an Etsy Offsite Ad within 30 days of clicking, Etsy adds a 15% fee (or 12% once annual shop revenue exceeds $10,000 USD).',
        ],
      },
      {
        heading: 'Pricing with an Offsite Ad Buffer',
        paragraphs: [
          'Instead of absorbing a sudden 15% hit on ad-attributed orders, estimate your blended Offsite Ads share (for example, 15% of orders × 15% = 2.25% blended fee) and build that into your baseline retail price.',
        ],
      },
    ],
    relatedCalculators: ['etsy-fee-calculator', 'product-pricing-calculator', 'markup-calculator'],
  },
  {
    slug: 'shopify-dropshipping-unit-economics',
    title: 'Shopify Dropshipping Unit Economics: CPA, Gateway Fees & Break-Even ROAS',
    category: 'Shopify',
    publishedAt: 'November 01, 2026',
    readTime: '7 min read',
    excerpt:
      'Why winning ad creatives still lose money when Break-Even ROAS and refund reserves are ignored—and how to audit every product before scaling.',
    seoTitle: 'Shopify Dropshipping Unit Economics & ROAS Guide | SellerMath',
    seoDescription:
      'Master Shopify dropshipping profit math including supplier shipping, Stripe/Shopify Payments fees, CPA ceilings, and Break-Even ROAS.',
    sections: [
      {
        heading: 'Three Numbers Every Dropshipper Must Know Before Launching Ads',
        paragraphs: [
          'Before spending a dollar on Meta or TikTok ads, calculate your landed supplier cost (item + shipping), payment gateway deduction, and a 3% refund reserve. Subtracting those from your retail price yields your Pre-Ad Profit.',
          'That single figure determines both your Maximum Profitable CPA and your Break-Even ROAS (Retail Price ÷ Pre-Ad Profit).',
        ],
      },
      {
        heading: 'Using Average Order Value Bundles to Lower Break-Even ROAS',
        paragraphs: [
          'Bundling complementary accessories or offering tiered quantity discounts raises Average Order Value without doubling shipping or gateway fixed fees—dropping your Break-Even ROAS and giving media buyers far more room to scale.',
        ],
      },
    ],
    relatedCalculators: ['dropshipping-profit-calculator', 'roas-calculator', 'cpa-calculator'],
  },
  {
    slug: 'payment-processing-fees-paypal-vs-stripe-vs-square',
    title: 'PayPal vs. Stripe vs. Square Fees: Which Processor Saves Merchants More?',
    category: 'Ecommerce',
    publishedAt: 'October 25, 2026',
    readTime: '5 min read',
    excerpt:
      'Side-by-side comparison of online checkout, invoicing, international card, and in-person POS fees across PayPal, Stripe, and Square.',
    seoTitle: 'PayPal vs. Stripe vs. Square Fees Compared | SellerMath',
    seoDescription:
      'Compare PayPal, Stripe, and Square processing rates for online stores, invoices, international cards, and in-person POS transactions.',
    sections: [
      {
        heading: 'Comparing Domestic Online Checkout Rates',
        paragraphs: [
          'For standard US online card checkouts, Stripe and Square Online both charge 2.9% + $0.30 per transaction, whereas PayPal Checkout / Goods & Services charges 3.49% + $0.49 (or 2.99% + $0.49 on PayPal Invoicing).',
          'On a $100 order, choosing a 2.9% + $0.30 processor saves $0.78 per transaction compared to 3.49% + $0.49—adding up to $780 saved per 1,000 orders.',
        ],
      },
      {
        heading: 'When In-Person POS & Reverse Invoicing Matter',
        paragraphs: [
          'For pop-up markets and retail counters, Square’s in-person 2.6% + $0.10 tap rate undercuts online card-not-present pricing. For B2B or custom wholesale invoices, use reverse gross-up math whenever passing processing fees cleanly to the buyer.',
          'Avoid naively adding 2.9% to an invoice total because processors deduct their percentage from the grossed-up charge. Always divide (Target Net + Fixed Fee) by (1 − Fee Rate).',
        ],
        table: {
          caption: 'PayPal vs. Stripe vs. Square Processing Rates (US)',
          headers: ['Processor & Channel', 'Percentage Rate', 'Fixed Fee', 'Fee on $100 Order'],
          rows: [
            ['Square POS (Tap / Chip)', '2.60%', '$0.10', '$2.70'],
            ['Stripe Terminal (In-Person)', '2.70%', '$0.05', '$2.75'],
            ['Stripe Online / Square Online', '2.90%', '$0.30', '$3.20'],
            ['PayPal Invoicing', '2.99%', '$0.49', '$3.48'],
            ['PayPal Checkout / G&S', '3.49%', '$0.49', '$3.98'],
          ],
        },
      },
    ],
    relatedCalculators: ['paypal-fee-calculator', 'stripe-fee-calculator', 'square-fee-calculator'],
  },
  {
    slug: 'tiktok-shop-and-social-commerce-margins',
    title: 'TikTok Shop Margins: Balancing Referral Fees, Creator Commissions & Spark Ads',
    category: 'Online Selling',
    publishedAt: 'October 19, 2026',
    readTime: '5 min read',
    excerpt:
      'How to structure TikTok Shop affiliate commissions so creators actively promote your SKU while every viral order stays cash-flow positive.',
    seoTitle: 'TikTok Shop Profit Margins & Creator Commission Guide | SellerMath',
    seoDescription:
      'Calculate sustainable TikTok Shop creator affiliate commissions alongside platform referral fees and shipping subsidies.',
    sections: [
      {
        heading: 'Stacking Affiliate Commissions on Top of Platform Fees',
        paragraphs: [
          'Creators naturally gravitate toward 15% to 20% affiliate commissions, but pairing a 20% creator payout with an 8% TikTok Shop referral fee consumes 28% of top-line revenue before product cost or free-shipping subsidies.',
          'Model your unit economics in the TikTok Shop Calculator first so you can set an aggressive yet profitable commission ceiling.',
        ],
      },
    ],
    relatedCalculators: ['tiktok-shop-calculator', 'profit-calculator', 'roas-calculator'],
  },
  {
    slug: 'inventory-cash-flow-for-scaling-brands',
    title: 'Inventory Cash Flow Math: How to Calculate Reorder Points Without Stockouts',
    category: 'Ecommerce',
    publishedAt: 'October 11, 2026',
    readTime: '6 min read',
    excerpt:
      'Use daily sales velocity, supplier lead times, and safety stock buffers to time purchase orders and protect working capital.',
    seoTitle: 'Inventory Reorder Point & Cash Flow Guide | SellerMath',
    seoDescription:
      'Learn how to calculate ecommerce reorder points, safety stock buffers, and supplier purchase order capital requirements.',
    sections: [
      {
        heading: 'Why Reordering Too Late Destroys Marketplace Ranking',
        paragraphs: [
          'Running out of stock on Amazon, Walmart, or TikTok Shop stalls sales velocity and forces expensive relaunch PPC spend once inventory returns. A disciplined Reorder Point triggers your next purchase order exactly when remaining stock equals lead-time demand plus safety stock.',
        ],
      },
      {
        heading: 'Sizing Safety Stock Without Over-Locking Cash',
        paragraphs: [
          'Excessive safety stock ties up working capital that could fund new product launches or ad testing. Balance 14 days of safety stock for reliable domestic suppliers with 21+ days for overseas ocean freight.',
        ],
      },
    ],
    relatedCalculators: ['inventory-reorder-calculator', 'roi-calculator', 'amazon-fba-calculator'],
  },
  {
    slug: 'how-to-calculate-true-ecommerce-profit',
    title: 'How to Calculate True Ecommerce Profit (Beyond COGS and Retail Price)',
    category: 'Profit & Margin',
    publishedAt: 'October 04, 2026',
    readTime: '6 min read',
    excerpt:
      'A step-by-step checklist for capturing shipping subsidies, payment fees, ad spend, returns, and tax liabilities in your unit profit math.',
    seoTitle: 'How to Calculate True Ecommerce Profit | SellerMath',
    seoDescription:
      'Calculate true ecommerce unit profit by accounting for COGS, fulfillment, marketplace fees, payment processing, ad CPA, and return reserves.',
    sections: [
      {
        heading: 'Gross Margin vs. Contribution Profit',
        paragraphs: [
          'Subtracting supplier unit cost from retail price only gives you basic product gross margin. True contribution profit per order deducts outbound postage, packaging materials, payment gateway fees, marketplace commissions, paid customer acquisition cost, and an allowance for refunds.',
        ],
      },
      {
        heading: 'Building a Repeatable Pre-Launch Profit Checklist',
        paragraphs: [
          'Before ordering inventory, validate your SKU across three tools: the Product Pricing Calculator to lock in retail price, the Marketplace or Payment Fee Calculator for channel deductions, and the Break-Even Calculator to confirm monthly volume targets.',
        ],
      },
    ],
    relatedCalculators: ['profit-calculator', 'product-pricing-calculator', 'break-even-calculator'],
  },
];

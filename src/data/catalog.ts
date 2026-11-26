import { CalculatorMeta, CalculatorSlug, CategoryInfo, CategorySlug, FaqItem } from '../types/calculator';

export const CATEGORIES: Record<CategorySlug, CategoryInfo> = {
  'marketplace-fees': {
    slug: 'marketplace-fees',
    name: 'Marketplace Calculators',
    shortName: 'Marketplace',
    headline: 'Calculate eBay, Amazon FBA, Etsy, TikTok Shop & Walmart Fees',
    description:
      'Model marketplace commissions, fulfillment charges, listing fees, creator commissions, and ad spend before launching or repricing any SKU.',
    seoTitle: 'Marketplace Fee Calculators – eBay, Amazon, Etsy, TikTok, Walmart | SellerMath',
    seoDescription:
      'Calculate exact marketplace fees, fulfillment costs, and net profit margins across eBay, Amazon FBA, Etsy, TikTok Shop, and Walmart Marketplace.',
    faqs: [
      {
        question: 'Do marketplaces charge fees on shipping and sales tax?',
        answer:
          'Yes. Most major marketplaces—including eBay, Etsy, and Walmart—apply percentage referral or final value fees to the item price plus buyer-paid shipping, and eBay also includes collected sales tax in the fee calculation base.',
      },
      {
        question: 'How should I factor ad spend into marketplace pricing?',
        answer:
          'Treat promoted listings, Amazon PPC, or TikTok creator commissions as direct variable costs per order so your net margin stays healthy at scale.',
      },
    ],
  },
  'payment-fees': {
    slug: 'payment-fees',
    name: 'Payment Fee Calculators',
    shortName: 'Payments',
    headline: 'PayPal, Stripe & Square Fee Calculators with Reverse Gross-Up',
    description:
      'Calculate domestic and international card processing deductions or solve the exact invoice total needed to receive your target net payout.',
    seoTitle: 'Payment Fee Calculators – PayPal, Stripe & Square | SellerMath',
    seoDescription:
      'Compute PayPal, Stripe, and Square processing fees, international surcharges, and reverse pass-through invoice amounts in seconds.',
    faqs: [
      {
        question: 'How does reverse fee calculation work for invoices?',
        answer:
          'Reverse calculation solves Gross = (Target Net + Fixed Fee) / (1 - Percentage Rate). This ensures that after the processor takes its percentage and fixed fee, your payout equals your exact target.',
      },
      {
        question: 'Which payment processor is cheapest for in-person vs. online sales?',
        answer:
          'Online checkouts across Stripe, PayPal, and Square typically cluster around 2.9%–3.49% plus $0.30–$0.49, while Square Terminal and Tap-to-Pay in-person rates drop to 2.6% + $0.10.',
      },
    ],
  },
  'profit-pricing': {
    slug: 'profit-pricing',
    name: 'Profit & Margin Calculators',
    shortName: 'Profit & Margin',
    headline: 'Unit Profit, Margin, Markup, ROI, Pricing & Dropshipping Calculators',
    description:
      'Price products confidently, distinguish markup from gross margin, forecast dropshipping unit economics, and determine break-even order volume.',
    seoTitle: 'Profit, Margin, Markup, ROI & Pricing Calculators | SellerMath',
    seoDescription:
      'Analyze unit profitability, gross margin, markup, ROI, break-even volume, retail pricing, and dropshipping margins with free SellerMath calculators.',
    faqs: [
      {
        question: 'What is the difference between margin and markup?',
        answer:
          'Margin measures profit as a percentage of selling price ((Price - Cost) / Price), whereas markup measures profit as a percentage of cost ((Price - Cost) / Cost). A 50% markup equals a 33.33% gross margin.',
      },
      {
        question: 'Why does break-even volume matter before launching a SKU?',
        answer:
          'Your break-even point tells you how many units must sell to recover fixed launch costs such as tooling, samples, software, or monthly overhead.',
      },
    ],
  },
  'advertising-calculators': {
    slug: 'advertising-calculators',
    name: 'Advertising Calculators',
    shortName: 'Advertising',
    headline: 'ROAS, Break-Even ROAS & Paid Acquisition (CPA) Calculators',
    description:
      'Set profitable ad budgets for Meta, Google, and TikTok campaigns by connecting click costs and conversion rates directly to gross margin.',
    seoTitle: 'Advertising Calculators – ROAS & CPA Profit Tools | SellerMath',
    seoDescription:
      'Calculate Return on Ad Spend (ROAS), break-even ROAS, Cost Per Acquisition (CPA), and net campaign profit for e-commerce ads.',
    faqs: [
      {
        question: 'How do I find my Break-Even ROAS?',
        answer:
          'Divide 100 by your pre-ad gross margin percentage. For example, if your product carries a 40% gross margin before ads, your Break-Even ROAS is 100 / 40 = 2.50x.',
      },
      {
        question: 'What is a safe target CPA for paid social ads?',
        answer:
          'Your maximum allowable CPA equals Average Order Value × Gross Margin %. Keep actual CPA comfortably below that ceiling to retain net profit.',
      },
    ],
  },
  'finance-calculators': {
    slug: 'finance-calculators',
    name: 'Finance Calculators',
    shortName: 'Finance',
    headline: 'Sales Tax, VAT & Inventory Reorder Cash-Flow Calculators',
    description:
      'Manage cash flow, tax-inclusive vs. tax-exclusive pricing, safety stock levels, and supplier purchase order capital requirements.',
    seoTitle: 'Ecommerce Finance Calculators – Sales Tax, VAT & Inventory | SellerMath',
    seoDescription:
      'Calculate sales tax and VAT breakdowns alongside inventory reorder points and purchase order cash requirements for online stores.',
    faqs: [
      {
        question: 'How do I extract VAT or sales tax from a tax-inclusive price?',
        answer:
          'Divide the gross tax-inclusive price by (1 + Tax Rate). For a $120 gross price with 20% VAT, the net pre-tax price is $120 / 1.20 = $100 and the VAT portion is $20.',
      },
      {
        question: 'Why calculate a Reorder Point with safety stock?',
        answer:
          'Ordering solely based on supplier lead time leaves zero buffer for shipping delays or demand spikes. Adding safety stock prevents costly stockouts.',
      },
    ],
  },
};

type BaseCalculatorMeta = Omit<CalculatorMeta, 'lastVerified' | 'sourceNote'> & {
  lastVerified?: string;
  sourceNote?: string;
};

const SOURCE_BY_ID: Partial<Record<CalculatorSlug, { lastVerified: string; sourceNote: string }>> = {
  'ebay-fee-calculator': { lastVerified: 'Nov 2026', sourceNote: 'eBay US Seller Fee Schedule (2026)' },
  'amazon-fba-calculator': { lastVerified: 'Nov 2026', sourceNote: 'Amazon US Referral & FBA Rate Card' },
  'etsy-fee-calculator': { lastVerified: 'Nov 2026', sourceNote: 'Etsy Seller Handbook & Offsite Ads Policy' },
  'tiktok-shop-calculator': { lastVerified: 'Nov 2026', sourceNote: 'TikTok Shop US Seller Center Rate Card' },
  'walmart-seller-calculator': { lastVerified: 'Nov 2026', sourceNote: 'Walmart Marketplace & WFS Rate Schedule' },
  'marketplace-comparison-calculator': { lastVerified: 'Nov 2026', sourceNote: 'Cross-Platform 2026 Fee Benchmarks' },
  'paypal-fee-calculator': { lastVerified: 'Nov 2026', sourceNote: 'PayPal US Merchant Commercial Rates' },
  'stripe-fee-calculator': { lastVerified: 'Nov 2026', sourceNote: 'Stripe Standard Processing Schedule' },
  'square-fee-calculator': { lastVerified: 'Nov 2026', sourceNote: 'Square POS & Online Pricing Schedule' },
};

const RAW_CALCULATORS: Record<CalculatorSlug, BaseCalculatorMeta> = {
  'ebay-fee-calculator': {
    id: 'ebay-fee-calculator',
    name: 'eBay Fee Calculator',
    shortName: 'eBay Fees',
    category: 'marketplace-fees',
    tagline: 'Calculate eBay final value fees, promoted listing ads, and net profit.',
    description:
      'Estimate eBay final value fees (including the per-order fixed fee and sales tax base), store subscription discounts, promoted listings, and true take-home profit.',
    seoTitle: 'eBay Fee Calculator – Final Value Fees & Profit | SellerMath',
    seoDescription:
      'Calculate eBay final value fees, per-order charges, promoted listing costs, net profit margin, and break-even sale price instantly.',
    formulaTitle: 'eBay Fee & Net Profit Formula',
    formulaText:
      'eBay Fee = ((Sale Price + Shipping + Sales Tax) × Final Value %) + Per-Order Fee + Promoted Ad Fee; Net Profit = (Sale Price + Shipping) − Item Cost − Shipping Paid − eBay Fee',
    whatIs:
      'The eBay Fee Calculator estimates every marketplace deduction on an eBay order, including category final value fees, the $0.30 or $0.40 per-order fee, promoted listing ad charges, and the impact of buyer sales tax on the fee calculation base.',
    howItWorks: [
      'Enter your listing sale price, buyer-paid shipping, cost of goods sold, and actual label shipping cost.',
      'Select your eBay category fee preset (13.25% standard, books, watches, or equipment) and toggle whether you have an eBay Store subscription.',
      'Add your promoted listing ad rate and average buyer sales tax rate so SellerMath computes total fees, net profit, ROI, and break-even sale price.',
    ],
    benefits: [
      'Accounts for sales tax being included in eBay’s final value fee base.',
      'Automatically switches between the $0.30 (orders ≤ $10) and $0.40 (orders > $10) per-order fee.',
      'Solves your exact break-even listing price before you publish.',
    ],
    workedExample: {
      scenarioTitle: 'Sneaker Flip on eBay (Standard Category, 2% Promoted Listing)',
      inputsSummary: [
        'Sale Price: $65.00',
        'Shipping Charged: $8.00',
        'Item Cost: $22.00 · Shipping Label: $7.50',
        'Final Value Fee: 13.25% · Promoted Ad: 2.00% · Sales Tax: 7.00%',
      ],
      steps: [
        'Buyer subtotal = $65.00 + $8.00 = $73.00; Sales tax (7%) = $5.11; Total fee base = $78.11.',
        'Final value fee = $78.11 × 13.25% = $10.35; Promoted ad fee = $78.11 × 2% = $1.56; Fixed fee = $0.40.',
        'Total eBay fees = $12.31; Total COGS + Shipping = $29.50; Net profit = $73.00 − $29.50 − $12.31 = $31.19.',
      ],
      outcomeSummary: 'Net Profit: $31.19 (42.73% margin · 105.73% ROI)',
    },
    relatedIds: ['paypal-fee-calculator', 'profit-calculator', 'margin-calculator', 'break-even-calculator'],
    relatedBlogSlugs: ['ebay-fee-breakdown-and-pricing-guide', 'margin-vs-markup-for-ecommerce-sellers'],
    faqs: [
      {
        question: 'Does eBay charge final value fees on sales tax?',
        answer:
          'Yes. eBay calculates its percentage-based final value fee on the total amount of the sale, which includes item price, buyer-paid shipping, and any applicable sales tax collected by eBay.',
      },
      {
        question: 'When is the eBay per-order fee $0.30 vs $0.40?',
        answer:
          'eBay charges $0.30 per order for total order amounts of $10.00 or less, and $0.40 per order for orders above $10.00.',
      },
      {
        question: 'How much does an eBay Store subscription reduce fees?',
        answer:
          'Most Basic, Premium, and Anchor eBay Store plans reduce the standard final value fee rate by roughly 0.9% to 1.0% depending on the product category.',
      },
    ],
  },
  'amazon-fba-calculator': {
    id: 'amazon-fba-calculator',
    name: 'Amazon FBA Calculator',
    shortName: 'Amazon FBA',
    category: 'marketplace-fees',
    tagline: 'Analyze Amazon referral fees, FBA fulfillment, storage, and break-even ACoS.',
    description:
      'Forecast Amazon unit economics by combining category referral fees, FBA pick-and-pack fees, monthly storage, PPC spend, and return allowances.',
    seoTitle: 'Amazon FBA Calculator – Referral Fees, Profit & ACoS | SellerMath',
    seoDescription:
      'Calculate Amazon FBA referral fees, fulfillment costs, unit profit margin, ROI, and break-even ACoS before sourcing inventory.',
    formulaTitle: 'Amazon FBA Unit Economics Formula',
    formulaText:
      'Net Profit = Selling Price − Referral Fee − FBA Fulfillment − Storage − Landed COGS − PPC Spend − Return Allowance; Break-Even ACoS = Pre-Ad Profit ÷ Selling Price',
    whatIs:
      'The Amazon FBA Calculator models per-unit profitability for Fulfillment by Amazon listings by accounting for Amazon referral commissions, FBA pick-and-pack fulfillment, warehouse storage, landed product cost, PPC advertising, and customer return reserves.',
    howItWorks: [
      'Enter your target Amazon Buy Box price and landed unit cost (manufacturing + customs + inbound freight).',
      'Input your category referral fee percentage (typically 15%), FBA fulfillment fee tier, and estimated monthly storage per unit.',
      'Add expected PPC ad spend per unit and return allowance percentage to see net unit profit, ROI, and Break-Even ACoS.',
    ],
    benefits: [
      'Shows your exact Break-Even ACoS ceiling for Amazon Sponsored Products.',
      'Includes return reserve modeling so high-return categories do not mask true margins.',
      'Separates Amazon platform fees from landed COGS and ad spend.',
    ],
    workedExample: {
      scenarioTitle: 'Home & Kitchen Private Label SKU ($34.99 Retail)',
      inputsSummary: [
        'Selling Price: $34.99 · Landed Cost: $8.50',
        'Referral Fee: 15% ($5.25) · FBA Fulfillment: $5.40 · Storage: $0.65',
        'PPC Spend: $3.20/unit · Return Allowance: 3% ($1.05)',
      ],
      steps: [
        'Total Amazon fees = $5.25 + $5.40 + $0.65 = $11.30.',
        'Landed COGS + PPC + Return reserve = $8.50 + $3.20 + $1.05 = $12.75.',
        'Net profit per unit = $34.99 − $11.30 − $12.75 = $10.94.',
      ],
      outcomeSummary: 'Net Profit: $10.94/unit (31.27% margin · 128.71% ROI · 40.41% Break-Even ACoS)',
    },
    relatedIds: ['roi-calculator', 'roas-calculator', 'inventory-reorder-calculator', 'break-even-calculator'],
    relatedBlogSlugs: ['amazon-fba-break-even-acos-guide', 'inventory-cash-flow-for-scaling-brands'],
    faqs: [
      {
        question: 'What is Break-Even ACoS on Amazon?',
        answer:
          'Break-Even ACoS (Advertising Cost of Sales) equals your pre-ad profit margin percentage. If your PPC ACoS stays below your break-even ACoS, each ad-driven unit remains profitable.',
      },
      {
        question: 'What should be included in Landed Product Cost?',
        answer:
          'Include unit manufacturing cost, packaging, inspection, customs duties, and inbound freight per unit to Amazon fulfillment centers.',
      },
    ],
  },
  'etsy-fee-calculator': {
    id: 'etsy-fee-calculator',
    name: 'Etsy Fee Calculator',
    shortName: 'Etsy Fees',
    category: 'marketplace-fees',
    tagline: 'Break down Etsy listing, transaction, processing, and Offsite Ads fees.',
    description:
      'Model Etsy 6.5% transaction fees, $0.20 listing fees, Etsy Payments regional processing rates, and optional 12%–15% Offsite Ads deductions.',
    seoTitle: 'Etsy Fee Calculator – Transaction, Listing & Ads | SellerMath',
    seoDescription:
      'Calculate Etsy $0.20 listing fees, 6.5% transaction fees, regional payment processing, Offsite Ads charges, and net shop profit.',
    formulaTitle: 'Etsy Fee Structure Formula',
    formulaText:
      'Total Etsy Fees = $0.20 Listing + (6.5% × Order Total) + (Processing % × Order Total + Fixed Fee) + (Offsite Ads % × Order Total)',
    whatIs:
      'The Etsy Fee Calculator breaks down all four fee layers charged on Etsy orders: the $0.20 listing fee, the 6.5% transaction fee on item plus shipping, regional Etsy Payments processing fees, and optional 12% or 15% Offsite Ads commissions.',
    howItWorks: [
      'Input your Etsy listing price, shipping charged to the shopper, materials/labor cost, and actual postage cost.',
      'Select your Etsy Payments region (US, UK, Canada, or EU) to load accurate processing rates.',
      'Toggle Offsite Ads attribution (0%, 12%, or 15%) to check if your margins survive ad-attributed sales.',
    ],
    benefits: [
      'Prevents surprise profit erosion when an order converts via Etsy Offsite Ads.',
      'Applies the 6.5% transaction fee to both item price and shipping charged.',
      'Supports US, UK, Canadian, and EU Etsy Payments fee schedules.',
    ],
    workedExample: {
      scenarioTitle: 'Handmade Ceramic Mug Sold in US (Standard Shop, No Offsite Ad)',
      inputsSummary: [
        'Item Price: $38.00 · Shipping Charged: $5.00',
        'Materials Cost: $11.00 · Postage Paid: $4.80',
        'Processing: 3.0% + $0.25 · Listing Fee: $0.20',
      ],
      steps: [
        'Order total = $38.00 + $5.00 = $43.00.',
        'Transaction fee (6.5%) = $2.80; Payment fee = ($43.00 × 3%) + $0.25 = $1.54; Listing = $0.20.',
        'Total Etsy fees = $4.54; Net profit = $43.00 − $15.80 − $4.54 = $22.66.',
      ],
      outcomeSummary: 'Net Profit: $22.66 (52.71% margin · 10.55% effective fee rate)',
    },
    relatedIds: ['ebay-fee-calculator', 'product-pricing-calculator', 'markup-calculator', 'stripe-fee-calculator'],
    relatedBlogSlugs: ['etsy-pricing-strategy-and-offsite-ads', 'margin-vs-markup-for-ecommerce-sellers'],
    faqs: [
      {
        question: 'What is Etsy’s current transaction fee?',
        answer:
          'Etsy charges a 6.5% transaction fee applied to the item price plus any shipping and gift-wrapping charges paid by the buyer.',
      },
      {
        question: 'How do Etsy Offsite Ads fees work?',
        answer:
          'When a buyer clicks an Etsy Offsite Ad and purchases within 30 days, Etsy charges a 15% fee (or 12% for shops making over $10,000 USD annually).',
      },
    ],
  },
  'tiktok-shop-calculator': {
    id: 'tiktok-shop-calculator',
    name: 'TikTok Shop Calculator',
    shortName: 'TikTok Shop',
    category: 'marketplace-fees',
    tagline: 'Estimate TikTok Shop referral fees, creator affiliate payouts, and net profit.',
    description:
      'Calculate TikTok Shop commission fees, creator affiliate commission percentages, ad spend per order, and shipping costs to protect social commerce margins.',
    seoTitle: 'TikTok Shop Calculator – Fees, Creator Commission & Profit | SellerMath',
    seoDescription:
      'Calculate TikTok Shop referral fees, creator affiliate commissions, shipping costs, and net order profit before launching viral campaigns.',
    formulaTitle: 'TikTok Shop Profit Formula',
    formulaText:
      'Net Profit = (Sale Price + Shipping) − Product Cost − Shipping Paid − ((Price + Shipping) × Referral %) − (Price × Creator Affiliate %) − Ad Spend',
    whatIs:
      'The TikTok Shop Calculator helps brands and affiliates model real take-home profit after TikTok Shop’s marketplace referral fee, creator affiliate commissions (often 10%–20%), paid Spark Ads spend, and fulfillment costs.',
    howItWorks: [
      'Enter the product sale price, buyer shipping contribution, product COGS, and actual shipping label cost.',
      'Set the TikTok Shop referral fee percentage (typically 6%–8% standard) and your creator affiliate commission rate.',
      'Include any TikTok Shop Ads spend per order to view net profit, net margin, and ROI.',
    ],
    benefits: [
      'Models creator affiliate commissions alongside platform referral fees in one view.',
      'Helps set sustainable affiliate commission tiers before inviting creators.',
      'Reveals true net profit after Spark Ads and shipping subsidies.',
    ],
    workedExample: {
      scenarioTitle: 'Viral Beauty Tool Sold via Creator Affiliate (15% Commission)',
      inputsSummary: [
        'Sale Price: $29.00 · Shipping Charged: $0.00 (Free Shipping)',
        'COGS: $6.50 · Shipping Cost: $4.25',
        'TikTok Referral Fee: 6% · Creator Commission: 15% · Ads: $2.00',
      ],
      steps: [
        'TikTok referral fee = $29.00 × 6% = $1.74; Creator affiliate commission = $29.00 × 15% = $4.35.',
        'Total platform, creator, and ad fees = $1.74 + $4.35 + $2.00 = $8.09.',
        'Net profit = $29.00 − $10.75 (COGS + shipping) − $8.09 = $10.16.',
      ],
      outcomeSummary: 'Net Profit: $10.16/order (35.03% margin · 94.51% ROI)',
    },
    relatedIds: ['dropshipping-profit-calculator', 'roas-calculator', 'amazon-fba-calculator', 'profit-calculator'],
    relatedBlogSlugs: ['tiktok-shop-and-social-commerce-margins', 'how-to-calculate-true-ecommerce-profit'],
    faqs: [
      {
        question: 'What is TikTok Shop’s standard referral fee?',
        answer:
          'In the US, TikTok Shop generally charges an 8% referral fee across most categories (with promotional new-seller discounts or category exceptions around 5%–6%). Always verify your Seller Center rate card.',
      },
      {
        question: 'Are creator affiliate commissions calculated on shipping?',
        answer:
          'TikTok Shop affiliate commissions are calculated on the item price paid by the customer (after seller discounts), excluding shipping and taxes.',
      },
    ],
  },
  'walmart-seller-calculator': {
    id: 'walmart-seller-calculator',
    name: 'Walmart Seller Calculator',
    shortName: 'Walmart Seller',
    category: 'marketplace-fees',
    tagline: 'Calculate Walmart Marketplace referral fees, WFS fulfillment, and unit ROI.',
    description:
      'Analyze Walmart Marketplace category referral fees (6%–15%), Walmart Fulfillment Services (WFS) pick-and-pack fees, storage, and Walmart Connect ads.',
    seoTitle: 'Walmart Seller Calculator – Referral & WFS Fees | SellerMath',
    seoDescription:
      'Calculate Walmart Marketplace category referral fees, WFS fulfillment and storage charges, unit profit margin, and ROI.',
    formulaTitle: 'Walmart Marketplace & WFS Formula',
    formulaText:
      'Net Profit = (Selling Price + Shipping) − (Gross × Referral %) − WFS Fulfillment − WFS Storage − Landed COGS − Ad Spend',
    whatIs:
      'The Walmart Seller Calculator models unit profitability for third-party sellers on Walmart.com, incorporating category referral rates, Walmart Fulfillment Services (WFS) shipping weights/tiers, storage fees, and Walmart Connect ad spend.',
    howItWorks: [
      'Enter your Walmart listing price, any shipping charged, and landed product cost.',
      'Select or customize your Walmart category referral fee (commonly 15%, or 8% for electronics).',
      'Input WFS fulfillment, storage, and Walmart Connect ad spend per unit to evaluate net margin and ROI.',
    ],
    benefits: [
      'Lets sellers compare Walmart WFS profitability directly against Amazon FBA.',
      'Breaks down category referral fees separately from fulfillment and storage.',
      'Highlights effective fee rate as a share of gross order value.',
    ],
    workedExample: {
      scenarioTitle: 'Home Organization Bin via Walmart WFS ($32.00 Retail)',
      inputsSummary: [
        'Selling Price: $32.00 · Landed COGS: $9.20',
        'Referral Fee: 15% ($4.80) · WFS Fulfillment: $4.95 · Storage: $0.45',
        'Walmart Connect Ads: $2.00/unit',
      ],
      steps: [
        'Total Walmart fees = $4.80 + $4.95 + $0.45 = $10.20.',
        'Product COGS + Ads = $9.20 + $2.00 = $11.20.',
        'Net profit = $32.00 − $10.20 − $11.20 = $10.60.',
      ],
      outcomeSummary: 'Net Profit: $10.60/unit (33.13% margin · 115.22% ROI)',
    },
    relatedIds: ['amazon-fba-calculator', 'ebay-fee-calculator', 'profit-calculator', 'roi-calculator'],
    relatedBlogSlugs: ['amazon-fba-break-even-acos-guide', 'how-to-calculate-true-ecommerce-profit'],
    faqs: [
      {
        question: 'Does Walmart Marketplace charge a monthly subscription fee?',
        answer:
          'No. Unlike Amazon Professional accounts, Walmart Marketplace does not charge a monthly platform subscription fee—sellers only pay category referral fees and optional WFS fulfillment/storage fees.',
      },
      {
        question: 'How do Walmart referral fees vary by category?',
        answer:
          'Most general merchandise categories carry a 15% referral fee, while consumer electronics and cameras are typically 8% and apparel/jewelry range from 15% to 20% depending on price.',
      },
    ],
  },
  'marketplace-comparison-calculator': {
    id: 'marketplace-comparison-calculator',
    name: 'Marketplace Profit Comparison Calculator',
    shortName: 'Compare Marketplaces',
    category: 'marketplace-fees',
    tagline: 'Compare net profit, fees, and margin across 6 channels side-by-side.',
    description:
      'Enter one SKU’s retail price, shipping, COGS, and ad spend to compare take-home profit across Shopify, TikTok Shop, Etsy, eBay, Walmart WFS, and Amazon FBA simultaneously.',
    seoTitle: 'Marketplace Profit Comparison Calculator – Amazon vs eBay vs Etsy vs Shopify | SellerMath',
    seoDescription:
      'Compare net unit profit, platform fees, and margins across Shopify, TikTok Shop, Etsy, eBay, Walmart WFS, and Amazon FBA in one side-by-side matrix.',
    formulaTitle: 'Cross-Channel Net Profit Comparison Formula',
    formulaText:
      'Channel Net Profit = (Selling Price + Shipping Charged) − Channel Fees − Fulfillment / Postage − Landed COGS − Ad Spend',
    whatIs:
      'The Marketplace Profit Comparison Calculator evaluates a single SKU across six major sales channels at once—revealing where platform commissions and fulfillment fees leave the highest net profit.',
    howItWorks: [
      'Enter your SKU selling price, buyer shipping charge, landed COGS, and self-ship label cost.',
      'Add your FBA/WFS equivalent fulfillment fee and target ad spend per unit.',
      'Review the ranked profit comparison table and bar chart across Shopify, TikTok Shop, Etsy, eBay, Walmart WFS, and Amazon FBA.',
    ],
    benefits: [
      'Identifies your highest-margin sales channel in seconds without opening six separate spreadsheets.',
      'Models self-fulfilled shipping vs. FBA/WFS fulfillment cleanly in the same run.',
      'Shows the exact dollar profit spread between your best and lowest-margin marketplace.',
    ],
    workedExample: {
      scenarioTitle: '$39.99 Branded Accessory Sold Across 6 Channels',
      inputsSummary: [
        'Selling Price: $39.99 · Shipping Charged: $0.00 · Landed COGS: $10.50',
        'Self-Ship Label: $4.75 · FBA/WFS Fulfillment Est: $5.40 · Ads: $3.00',
      ],
      steps: [
        'Self-fulfilled base cost = $10.50 + $4.75 + $3.00 = $18.25; FBA/WFS base cost = $10.50 + $3.00 = $13.50.',
        'Shopify (2.9% + $0.30 = $1.46 fees) nets $20.28; eBay (13.25% + $0.40 = $5.70 fees) nets $16.04.',
        'Amazon FBA (15% + $5.40 = $11.40 fees) nets $15.09; Walmart WFS mirrors ~$15.09.',
      ],
      outcomeSummary: 'Best Channel: Shopify ($20.28 profit) · Profit Spread: $5.19/unit',
    },
    relatedIds: ['amazon-fba-calculator', 'ebay-fee-calculator', 'etsy-fee-calculator', 'batch-sku-auditor'],
    relatedBlogSlugs: ['ebay-fee-breakdown-and-pricing-guide', 'how-to-calculate-true-ecommerce-profit'],
    faqs: [
      {
        question: 'Why does Shopify show lower platform fees than Amazon FBA or eBay?',
        answer:
          'Direct-to-consumer Shopify stores pay payment processing (~2.9% + $0.30) rather than 13%–15% marketplace referral commissions, though you must drive your own paid or organic traffic.',
      },
      {
        question: 'Should I price products differently on each marketplace?',
        answer:
          'Yes. Many multichannel brands set higher retail prices on 15% commission marketplaces or adjust shipping thresholds to preserve consistent contribution profit per order.',
      },
    ],
  },
  'paypal-fee-calculator': {
    id: 'paypal-fee-calculator',
    name: 'PayPal Fee Calculator',
    shortName: 'PayPal Fees',
    category: 'payment-fees',
    tagline: 'Calculate PayPal merchant fees or reverse-calculate invoice totals.',
    description:
      'Compute PayPal US Checkout, Invoicing, QR code, and international cross-border fees—or solve the exact amount to bill a client to net your target payout.',
    seoTitle: 'PayPal Fee Calculator – Standard & Reverse Fees | SellerMath',
    seoDescription:
      'Calculate PayPal checkout, invoice, and international fees accurately. Switch to reverse mode to find how much to charge to receive your exact net payout.',
    formulaTitle: 'PayPal Standard & Reverse Formula',
    formulaText:
      'Standard: Net = Gross − (Gross × Rate + Fixed) | Reverse: Gross to Charge = (Target Net + Fixed) ÷ (1 − Rate)',
    whatIs:
      'The PayPal Fee Calculator computes exact PayPal merchant deductions on commercial payments, invoices, and QR transactions, and includes a Reverse Mode to determine how much to request so you receive your full target payout.',
    howItWorks: [
      'Choose Standard mode (deduct fees from a gross payment) or Reverse mode (gross up an invoice to net a specific payout).',
      'Pick a PayPal fee schedule preset (3.49% + $0.49 Checkout, 2.99% + $0.49 Invoicing, or QR rate) or enter custom rates.',
      'Add an optional 1.50% international surcharge for cross-border payments.',
    ],
    benefits: [
      'Eliminates underbilling when passing PayPal fees onto B2B or freelance invoices.',
      'Includes presets for PayPal Checkout, Invoicing, and QR/Zettle.',
      'Displays both dollar fee breakdown and effective percentage rate.',
    ],
    workedExample: {
      scenarioTitle: 'Freelance / Wholesale Invoice Targeting $500.00 Net Payout (2.99% + $0.49)',
      inputsSummary: [
        'Mode: Reverse (Receive Net) · Target Net: $500.00',
        'Rate: 2.99% + $0.49 Fixed Fee',
      ],
      steps: [
        'Gross to invoice = ($500.00 + $0.49) ÷ (1 − 0.0299) = $500.49 ÷ 0.9701 = $515.92.',
        'PayPal fee on $515.92 = ($515.92 × 2.99%) + $0.49 = $15.43 + $0.49 = $15.92.',
        'Net payout received = $515.92 − $15.92 = $500.00.',
      ],
      outcomeSummary: 'Invoice Amount: $515.92 (Fee: $15.92 · Net Received: $500.00)',
    },
    relatedIds: ['stripe-fee-calculator', 'square-fee-calculator', 'ebay-fee-calculator', 'profit-calculator'],
    relatedBlogSlugs: ['payment-processing-fees-paypal-vs-stripe-vs-square', 'how-to-calculate-true-ecommerce-profit'],
    faqs: [
      {
        question: 'What is the standard PayPal commercial transaction fee?',
        answer:
          'In the US, standard PayPal Checkout / Goods & Services online payments typically carry 3.49% + $0.49 or 2.99% + $0.49 for PayPal Invoicing, plus an additional 1.50% for international transactions.',
      },
      {
        question: 'Can I calculate how much to invoice so the client covers the PayPal fee?',
        answer:
          'Yes. Select "Reverse: Receive Net" mode, enter the exact amount you want in your account, and SellerMath computes the gross amount to bill.',
      },
    ],
  },
  'stripe-fee-calculator': {
    id: 'stripe-fee-calculator',
    name: 'Stripe Fee Calculator',
    shortName: 'Stripe Fees',
    category: 'payment-fees',
    tagline: 'Estimate Stripe card processing fees, international add-ons, and gross-up totals.',
    description:
      'Calculate standard Stripe 2.9% + $0.30 domestic card fees, international card and currency conversion surcharges, and pass-through pricing totals.',
    seoTitle: 'Stripe Fee Calculator – Card Processing & Net Payout | SellerMath',
    seoDescription:
      'Compute Stripe processing fees for domestic and international cards, see effective fee rates, or gross up charges to pass fees cleanly.',
    formulaTitle: 'Stripe Processing & Gross-Up Formula',
    formulaText:
      'Stripe Fee = (Charge × (Base % + Surcharge %)) + $0.30 | Pass-Through Charge = (Target Payout + $0.30) ÷ (1 − Total Rate %)',
    whatIs:
      'The Stripe Fee Calculator calculates exact card processing deductions for Shopify, WooCommerce, SaaS, and custom checkout flows using Stripe, supporting both domestic cards and international currency conversion add-ons.',
    howItWorks: [
      'Select whether to deduct Stripe fees from a customer charge or gross up a charge to net a target payout.',
      'Choose a Stripe rate tier (US Domestic 2.9% + $0.30, International +1.5%, Currency Conversion +1.0%, or Stripe Terminal).',
      'Inspect the itemized fee, international surcharge, effective rate, and net bank deposit.',
    ],
    benefits: [
      'Separates base processing rate from international and FX conversion surcharges.',
      'Prevents math errors when passing card fees on wholesale or custom orders.',
      'Works for both e-commerce checkouts and SaaS recurring invoices.',
    ],
    workedExample: {
      scenarioTitle: '$250.00 Domestic Card Checkout on Stripe (2.9% + $0.30)',
      inputsSummary: [
        'Customer Charge: $250.00 · Rate: 2.90% + $0.30',
      ],
      steps: [
        'Percentage fee = $250.00 × 2.90% = $7.25.',
        'Fixed per-transaction fee = $0.30; Total Stripe fee = $7.55.',
        'Net payout deposited = $250.00 − $7.55 = $242.45.',
      ],
      outcomeSummary: 'Net Payout: $242.45 (Total Fee: $7.55 · 3.02% effective rate)',
    },
    relatedIds: ['paypal-fee-calculator', 'square-fee-calculator', 'dropshipping-profit-calculator', 'margin-calculator'],
    relatedBlogSlugs: ['payment-processing-fees-paypal-vs-stripe-vs-square', 'shopify-dropshipping-unit-economics'],
    faqs: [
      {
        question: 'What does Stripe charge for international cards and currency conversion?',
        answer:
          'On top of standard domestic card rates (2.9% + $0.30 in the US), Stripe adds +1.5% for international cards and an additional +1.0% if currency conversion is required.',
      },
      {
        question: 'How do I pass Stripe fees to a customer accurately?',
        answer:
          'Do not simply add 2.9% + $0.30, because Stripe charges 2.9% on the larger total. Use Pass Fee to Buyer mode to divide (Net + $0.30) by (1 − 0.029).',
      },
    ],
  },
  'square-fee-calculator': {
    id: 'square-fee-calculator',
    name: 'Square Fee Calculator',
    shortName: 'Square Fees',
    category: 'payment-fees',
    tagline: 'Calculate Square POS, online checkout, and keyed-in card fees.',
    description:
      'Estimate Square processing fees across in-person tap/chip (2.6% + $0.10), Square Online (2.9% + $0.30), Square Invoices (3.3% + $0.30), and keyed-in cards (3.5% + $0.15).',
    seoTitle: 'Square Fee Calculator – POS, Online & Invoice Rates | SellerMath',
    seoDescription:
      'Calculate Square in-person, online store, invoice, and manually keyed-in card fees—or reverse-calculate what to charge to cover fees.',
    formulaTitle: 'Square Processing Formula',
    formulaText:
      'Square Fee = (Gross Charge × Rate %) + Fixed Fee | Reverse Charge = (Target Net + Fixed Fee) ÷ (1 − Rate %)',
    whatIs:
      'The Square Fee Calculator lets retail shops, pop-up vendors, service providers, and Square Online merchants compute exact card processing deductions across every Square payment channel.',
    howItWorks: [
      'Choose Standard mode to see net deposit after Square fees, or Reverse mode to find what to charge.',
      'Select your Square channel preset: In-Person Tap/Chip (2.6% + $0.10), Square Online (2.9% + $0.30), Invoices (3.3% + $0.30), or Keyed-In (3.5% + $0.15).',
      'Review the exact fee deduction and effective rate percentage.',
    ],
    benefits: [
      'Covers all four official Square channel rate structures out of the box.',
      'Helps pop-up and omnichannel sellers compare in-person vs. online payment costs.',
      'Includes reverse gross-up mode for custom invoices.',
    ],
    workedExample: {
      scenarioTitle: '$120.00 In-Person Square POS Tap Sale (2.6% + $0.10)',
      inputsSummary: [
        'Sale Amount: $120.00 · Method: In-Person Tap / Chip (2.60% + $0.10)',
      ],
      steps: [
        'Percentage fee = $120.00 × 2.60% = $3.12.',
        'Fixed tap fee = $0.10; Total Square fee = $3.22.',
        'Net deposit = $120.00 − $3.22 = $116.78.',
      ],
      outcomeSummary: 'Net Payout: $116.78 (Total Fee: $3.22 · 2.68% effective rate)',
    },
    relatedIds: ['stripe-fee-calculator', 'paypal-fee-calculator', 'sales-tax-calculator', 'profit-calculator'],
    relatedBlogSlugs: ['payment-processing-fees-paypal-vs-stripe-vs-square'],
    faqs: [
      {
        question: 'Why are Square in-person fees lower than online or keyed-in fees?',
        answer:
          'Card-present transactions (tap, dip, or swipe) carry lower fraud and chargeback risk, so Square charges 2.6% + $0.10 in person compared to 2.9% + $0.30 online or 3.5% + $0.15 when keyed in manually.',
      },
      {
        question: 'Does Square charge a monthly fee for standard POS?',
        answer:
          'Square Point of Sale has no monthly subscription fee on the Free plan; merchants only pay per-transaction processing fees.',
      },
    ],
  },
  'profit-calculator': {
    id: 'profit-calculator',
    name: 'Profit Calculator',
    shortName: 'Profit',
    category: 'profit-pricing',
    tagline: 'Measure unit profit, batch earnings, margin, and return on cost.',
    description:
      'Combine selling price, COGS, shipping, ad spend, and percentage/fixed fees to evaluate single-unit economics and multi-unit batch profit.',
    seoTitle: 'Profit Calculator – Unit & Batch Net Profit | SellerMath',
    seoDescription:
      'Calculate e-commerce unit profit, total batch earnings, net margin, markup, and ROI after product cost, shipping, ads, and fees.',
    formulaTitle: 'Unit & Batch Profit Formula',
    formulaText:
      'Unit Profit = Selling Price − COGS − Shipping − Ad Spend − (Price × Fee % + Fixed Fee); Batch Profit = Unit Profit × Units Sold',
    whatIs:
      'The Profit Calculator provides an all-in-one P&L check for a single SKU or an entire inventory batch by subtracting product cost, fulfillment, advertising, and platform fees from gross revenue.',
    howItWorks: [
      'Enter selling price, product COGS, shipping & packaging cost, and ad spend per unit.',
      'Add any marketplace or payment percentage fee plus fixed per-order fee.',
      'Specify your batch quantity (units sold) to project total net profit and batch revenue.',
    ],
    benefits: [
      'Bridges single-unit margin math with multi-unit inventory batch projections.',
      'Prevents omitting hidden costs like packaging and payment processing.',
      'Outputs Net Margin %, Markup %, and Return on Cost simultaneously.',
    ],
    workedExample: {
      scenarioTitle: '100-Unit Direct-to-Consumer Product Run ($49.00 Retail)',
      inputsSummary: [
        'Selling Price: $49.00 · COGS: $16.00 · Shipping: $5.50 · Ads: $4.00',
        'Fees: 10% + $0.30 · Batch Size: 100 units',
      ],
      steps: [
        'Fees per unit = ($49.00 × 10%) + $0.30 = $5.20.',
        'Direct costs per unit = $16.00 + $5.50 + $4.00 = $25.50.',
        'Net profit per unit = $49.00 − $25.50 − $5.20 = $18.30; 100-unit profit = $1,830.00.',
      ],
      outcomeSummary: 'Unit Profit: $18.30 · Batch Profit: $1,830.00 (37.35% net margin)',
    },
    relatedIds: ['margin-calculator', 'markup-calculator', 'roi-calculator', 'break-even-calculator'],
    relatedBlogSlugs: ['how-to-calculate-true-ecommerce-profit', 'margin-vs-markup-for-ecommerce-sellers'],
    faqs: [
      {
        question: 'What costs should I include in a seller profit calculation?',
        answer:
          'Include landed product cost, outbound shipping and packaging materials, marketplace or payment fees, and average customer acquisition cost (ad spend) per order.',
      },
      {
        question: 'What is a healthy net profit margin for e-commerce?',
        answer:
          'Many direct-to-consumer and marketplace sellers target 15% to 30% net profit margin after all fees, fulfillment, and ad spend.',
      },
    ],
  },
  'margin-calculator': {
    id: 'margin-calculator',
    name: 'Margin Calculator',
    shortName: 'Margin',
    category: 'profit-pricing',
    tagline: 'Compute gross margin percentage or solve price from a target margin.',
    description:
      'Calculate gross profit margin from cost and price, or enter your unit cost and desired margin percentage to compute the exact retail price.',
    seoTitle: 'Margin Calculator – Gross Margin & Target Pricing | SellerMath',
    seoDescription:
      'Calculate gross profit margin percentage, dollar profit, and markup equivalent—or solve your selling price from a target margin.',
    formulaTitle: 'Gross Profit Margin Formula',
    formulaText:
      'Gross Margin (%) = ((Selling Price − Cost) ÷ Selling Price) × 100 | Target Price = Cost ÷ (1 − Target Margin %)',
    whatIs:
      'The Margin Calculator determines what percentage of every revenue dollar remains as gross profit after subtracting product cost, and can reverse-solve the retail price needed to hit a target margin.',
    howItWorks: [
      'Choose "Calculate Margin %" to inspect an existing price, or "Solve Target Price" to price from a desired margin.',
      'Enter your unit cost and either your selling price or target gross margin %.',
      'Review dollar gross profit, gross margin %, equivalent markup %, and cost-to-revenue ratio.',
    ],
    benefits: [
      'Converts seamlessly between gross margin and markup percentages.',
      'Eliminates common underpricing mistakes caused by multiplying cost by target margin.',
      'Shows cost-to-revenue ratio for quick financial reporting.',
    ],
    workedExample: {
      scenarioTitle: 'Pricing an $18.00 Product for a 50% Gross Margin',
      inputsSummary: [
        'Unit Cost: $18.00 · Target Gross Margin: 50.0%',
      ],
      steps: [
        'Selling Price = $18.00 ÷ (1 − 0.50) = $18.00 ÷ 0.50 = $36.00.',
        'Gross Profit = $36.00 − $18.00 = $18.00.',
        'Equivalent Markup = ($18.00 ÷ $18.00) × 100 = 100.00%.',
      ],
      outcomeSummary: 'Selling Price: $36.00 (Gross Profit: $18.00 · 50% Margin · 100% Markup)',
    },
    relatedIds: ['markup-calculator', 'product-pricing-calculator', 'profit-calculator', 'break-even-calculator'],
    relatedBlogSlugs: ['margin-vs-markup-for-ecommerce-sellers', 'how-to-calculate-true-ecommerce-profit'],
    faqs: [
      {
        question: 'Can gross profit margin ever reach 100%?',
        answer:
          'Only if your product cost is $0. Whenever cost is greater than zero, gross margin is strictly below 100% because cost accounts for part of the selling price.',
      },
      {
        question: 'How do I price a product to achieve a 40% gross margin?',
        answer:
          'Divide your unit cost by (1 − 0.40) = 0.60. For example, a $12.00 cost item priced for a 40% margin must sell at $12.00 ÷ 0.60 = $20.00.',
      },
    ],
  },
  'markup-calculator': {
    id: 'markup-calculator',
    name: 'Markup Calculator',
    shortName: 'Markup',
    category: 'profit-pricing',
    tagline: 'Apply markup percentages to cost or convert markup to gross margin.',
    description:
      'Find your retail selling price from unit cost and markup percentage, see the equivalent gross profit margin, and track your cost multiplier.',
    seoTitle: 'Markup Calculator – Selling Price & Margin Converter | SellerMath',
    seoDescription:
      'Calculate selling price from cost and markup percentage, view your cost multiplier, and convert markup to profit margin instantly.',
    formulaTitle: 'Markup & Selling Price Formula',
    formulaText:
      'Selling Price = Cost × (1 + Markup %) | Markup (%) = ((Selling Price − Cost) ÷ Cost) × 100',
    whatIs:
      'The Markup Calculator helps wholesalers, retailers, and handmade sellers apply a percentage markup on top of unit cost to generate a retail price while automatically showing the corresponding gross profit margin.',
    howItWorks: [
      'Select "Cost + Markup %" to compute a retail price, or "Find Markup %" when comparing an existing price against cost.',
      'Enter your unit cost and desired markup percentage (e.g., 100% for keystone pricing).',
      'Inspect the resulting price, dollar profit, gross margin equivalent, and cost multiplier.',
    ],
    benefits: [
      'Displays both markup percentage and gross margin percentage side by side.',
      'Calculates the exact cost multiplier (e.g., 2.0x, 2.5x) for catalog pricing rules.',
      'Prevents undercharging when translating wholesale markups into retail margins.',
    ],
    workedExample: {
      scenarioTitle: 'Applying a 60% Markup to a $25.00 Wholesale SKU',
      inputsSummary: [
        'Unit Cost: $25.00 · Desired Markup: 60.0%',
      ],
      steps: [
        'Selling Price = $25.00 × (1 + 0.60) = $40.00.',
        'Gross Profit = $40.00 − $25.00 = $15.00.',
        'Gross Margin Equivalent = ($15.00 ÷ $40.00) × 100 = 37.50%.',
      ],
      outcomeSummary: 'Selling Price: $40.00 (Profit: $15.00 · 37.50% Margin · 1.60x Multiplier)',
    },
    relatedIds: ['margin-calculator', 'product-pricing-calculator', 'profit-calculator', 'etsy-fee-calculator'],
    relatedBlogSlugs: ['margin-vs-markup-for-ecommerce-sellers'],
    faqs: [
      {
        question: 'What is keystone markup in retail?',
        answer:
          'Keystone pricing is a 100% markup (a 2.0x multiplier on wholesale cost), which yields a 50% gross profit margin before marketplace or payment fees.',
      },
      {
        question: 'Why do sellers confuse markup and margin?',
        answer:
          'Markup uses cost as the denominator, whereas margin uses revenue as the denominator. Confusing the two often leads sellers to underprice products.',
      },
    ],
  },
  'roi-calculator': {
    id: 'roi-calculator',
    name: 'ROI Calculator',
    shortName: 'ROI',
    category: 'profit-pricing',
    tagline: 'Evaluate Return on Investment, annualized ROI, and capital multiples.',
    description:
      'Measure how efficiently your inventory or campaign capital generates profit, including simple ROI, annualized return over holding months, and cash multiple.',
    seoTitle: 'ROI Calculator – Simple & Annualized Return | SellerMath',
    seoDescription:
      'Calculate simple ROI, annualized return on investment, net gain, and capital multiple for inventory flips and e-commerce campaigns.',
    formulaTitle: 'Simple & Annualized ROI Formula',
    formulaText:
      'ROI (%) = ((Amount Returned − Total Cost) ÷ Total Cost) × 100 | Annualized ROI = ((Returned ÷ Cost)^(12 ÷ Months) − 1) × 100',
    whatIs:
      'The ROI Calculator measures how much net cash an inventory purchase, product launch, or marketing investment returns relative to total capital deployed, factoring in holding duration.',
    howItWorks: [
      'Enter the initial capital invested and the gross cash returned from sales.',
      'Add any extra operating expenses (prep, storage, fees) and the holding period in months.',
      'View net gain, simple ROI %, annualized ROI %, and your capital return multiple.',
    ],
    benefits: [
      'Annualizes returns so fast-turning inventory flips can be compared fairly against slow-moving stock.',
      'Includes extra operating expenses in the true cost basis.',
      'Shows capital return multiple (e.g., 1.51x) for rapid sourcing decisions.',
    ],
    workedExample: {
      scenarioTitle: '4-Month Wholesale Inventory Flip ($2,500 Buy-In)',
      inputsSummary: [
        'Capital Invested: $2,500 · Gross Returned: $4,100',
        'Extra Expenses: $220 · Holding Period: 4 Months',
      ],
      steps: [
        'Total cost basis = $2,500 + $220 = $2,720.',
        'Net gain = $4,100 − $2,720 = $1,380.',
        'Simple ROI = ($1,380 ÷ $2,720) × 100 = 50.74%; Annualized ROI over 4 months = 242.59%.',
      ],
      outcomeSummary: 'Simple ROI: 50.74% (Net Gain: $1,380 · 1.51x Multiple)',
    },
    relatedIds: ['profit-calculator', 'amazon-fba-calculator', 'roas-calculator', 'break-even-calculator'],
    relatedBlogSlugs: ['inventory-cash-flow-for-scaling-brands', 'amazon-fba-break-even-acos-guide'],
    faqs: [
      {
        question: 'What is the difference between ROI and profit margin?',
        answer:
          'ROI divides net profit by your invested cost (measuring capital efficiency), while profit margin divides net profit by selling revenue.',
      },
      {
        question: 'Why track annualized ROI on inventory?',
        answer:
          'A 40% ROI achieved in 2 months turns capital over six times a year, producing far stronger annualized returns than a 40% ROI that sits in stock for 12 months.',
      },
    ],
  },
  'break-even-calculator': {
    id: 'break-even-calculator',
    name: 'Break-Even Calculator',
    shortName: 'Break-Even',
    category: 'profit-pricing',
    tagline: 'Determine units and revenue needed to cover fixed costs and hit profit goals.',
    description:
      'Compute your unit contribution margin, exact break-even unit count, break-even revenue threshold, and volume required to reach a target monthly profit.',
    seoTitle: 'Break-Even Calculator – Units & Sales Target | SellerMath',
    seoDescription:
      'Find your break-even point in units and revenue, analyze contribution margin, and calculate the sales volume needed to hit target profit.',
    formulaTitle: 'Break-Even Point Formula',
    formulaText:
      'Break-Even Units = Fixed Costs ÷ (Selling Price − Variable Cost per Unit) | Target Units = (Fixed Costs + Target Profit) ÷ Contribution Margin',
    whatIs:
      'The Break-Even Calculator determines how many units you must sell—and how much revenue you must generate—to cover fixed overhead before earning net profit.',
    howItWorks: [
      'Enter your fixed monthly or launch costs (software, rent, photography, tooling).',
      'Input your selling price per unit and variable cost per unit (COGS, shipping, fees).',
      'Optionally add a target monthly profit goal to calculate the exact unit volume required.',
    ],
    benefits: [
      'Reveals unit contribution margin and contribution ratio immediately.',
      'Calculates both zero-profit break-even volume and target-profit volume.',
      'Warns instantly if variable costs exceed selling price.',
    ],
    workedExample: {
      scenarioTitle: 'Monthly Store Overhead & SKU Launch Planning',
      inputsSummary: [
        'Fixed Costs: $1,800/mo · Price/Unit: $45.00 · Variable Cost/Unit: $21.00',
        'Target Monthly Profit: $1,500',
      ],
      steps: [
        'Contribution margin per unit = $45.00 − $21.00 = $24.00 (53.33% ratio).',
        'Break-even units = $1,800 ÷ $24.00 = 75 units ($3,375.00 revenue).',
        'Units for $1,500 profit = ($1,800 + $1,500) ÷ $24.00 = 138 units ($6,210.00 revenue).',
      ],
      outcomeSummary: 'Break-Even: 75 Units ($3,375 Revenue) · Target Profit: 138 Units',
    },
    relatedIds: ['profit-calculator', 'margin-calculator', 'inventory-reorder-calculator', 'roi-calculator'],
    relatedBlogSlugs: ['how-to-calculate-true-ecommerce-profit', 'inventory-cash-flow-for-scaling-brands'],
    faqs: [
      {
        question: 'What counts as fixed vs. variable costs?',
        answer:
          'Fixed costs stay constant regardless of sales volume (software subscriptions, warehouse rent, equipment). Variable costs scale with every unit sold (COGS, shipping, payment fees).',
      },
      {
        question: 'What happens if variable cost exceeds selling price?',
        answer:
          'Your contribution margin per unit becomes negative, meaning you lose money on every additional unit sold and cannot reach a break-even point without raising price or lowering variable cost.',
      },
    ],
  },
  'product-pricing-calculator': {
    id: 'product-pricing-calculator',
    name: 'Product Pricing Calculator',
    shortName: 'Product Pricing',
    category: 'profit-pricing',
    tagline: 'Find the exact retail price that preserves your net margin after all fees.',
    description:
      'Solve your ideal retail selling price by factoring in COGS, packaging, shipping, marketplace commissions, payment fees, and target net margin—with optional .99 charm pricing.',
    seoTitle: 'Product Pricing Calculator – Fee-Adjusted Retail Price | SellerMath',
    seoDescription:
      'Calculate the exact retail selling price needed to hit your target net profit margin after marketplace fees, payment processing, and shipping.',
    formulaTitle: 'Fee-Adjusted Retail Pricing Formula',
    formulaText:
      'Selling Price = (COGS + Shipping + Fixed Fee) ÷ (1 − Target Net Margin % − Marketplace Fee % − Payment Fee %)',
    whatIs:
      'The Product Pricing Calculator works backwards from your desired net profit margin and fixed/percentage fee structure to output the exact retail price you must charge on Shopify, Amazon, eBay, or Etsy.',
    howItWorks: [
      'Enter product cost (COGS) plus outbound packaging and shipping expense.',
      'Set your target net profit margin percentage and add marketplace and payment processing percentages.',
      'Toggle .99 charm pricing if you want SellerMath to round up to psychological retail endings.',
    ],
    benefits: [
      'Eliminates margin squeeze caused by percentage marketplace and payment fees.',
      'Supports combined marketplace + payment processing fee stacks.',
      'Includes optional .99 psychological pricing rounding.',
    ],
    workedExample: {
      scenarioTitle: 'Setting a Shopify / Marketplace Price for a 25% Net Margin',
      inputsSummary: [
        'COGS: $12.00 · Packaging & Shipping: $4.50',
        'Target Net Margin: 25% · Marketplace Fee: 15% · Payment Fee: 2.9% + $0.30',
      ],
      steps: [
        'Combined percentage deductions + target margin = 25% + 15% + 2.9% = 42.9% (leaving 0.571 divisor).',
        'Total fixed costs = $12.00 + $4.50 + $0.30 = $16.80.',
        'Recommended price = $16.80 ÷ 0.571 = $29.42 (or $29.99 with charm pricing).',
      ],
      outcomeSummary: 'Recommended Price: $29.99 ($7.66 net profit · 25.54% realized margin)',
    },
    relatedIds: ['margin-calculator', 'markup-calculator', 'profit-calculator', 'etsy-fee-calculator'],
    relatedBlogSlugs: ['margin-vs-markup-for-ecommerce-sellers', 'etsy-pricing-strategy-and-offsite-ads'],
    faqs: [
      {
        question: 'Why does percentage-based fee math increase my required retail price more than expected?',
        answer:
          'Because marketplace and card fees apply to the final selling price, raising your price also raises the dollar fee. Dividing by (1 − Margin % − Fee %) solves that circular dependency cleanly.',
      },
      {
        question: 'Should I use .99 charm pricing?',
        answer:
          'For direct-to-consumer and impulse purchases under $100, rounding up to .99 often boosts conversion rates while protecting or slightly increasing realized margin.',
      },
    ],
  },
  'dropshipping-profit-calculator': {
    id: 'dropshipping-profit-calculator',
    name: 'Dropshipping Profit Calculator',
    shortName: 'Dropshipping',
    category: 'profit-pricing',
    tagline: 'Model supplier costs, CPA ad spend, gateway fees, and break-even ROAS.',
    description:
      'Test dropshipping product viability by combining supplier cost, shipping, cost per acquisition (CPA), payment processing, and refund reserves.',
    seoTitle: 'Dropshipping Profit Calculator – Net Profit & Break-Even ROAS | SellerMath',
    seoDescription:
      'Calculate dropshipping net profit per order, profit margin, current ROAS, break-even ROAS, and maximum allowable CPA before scaling ads.',
    formulaTitle: 'Dropshipping Unit Profit & ROAS Formula',
    formulaText:
      'Net Profit = Retail Price − Supplier Cost − Supplier Shipping − CPA − Gateway Fee − Refund Reserve; Break-Even ROAS = Retail Price ÷ Pre-Ad Profit',
    whatIs:
      'The Dropshipping Profit Calculator evaluates whether a Shopify or TikTok dropshipping product is viable once paid ad acquisition cost (CPA), supplier shipping, payment fees, and refund reserves are deducted.',
    howItWorks: [
      'Enter your store retail price, supplier product price, and supplier shipping cost.',
      'Input your paid ad Cost Per Acquisition (CPA), payment gateway fee (e.g., 2.9% + $0.30), and refund/chargeback reserve %.',
      'Check your net profit per order, current ROAS, Break-Even ROAS, and Max Profitable CPA.',
    ],
    benefits: [
      'Prevents scaling unprofitable winning creatives by displaying Break-Even ROAS and Max CPA.',
      'Includes refund and chargeback reserves often ignored in basic calculators.',
      'Built specifically for Shopify, TikTok, and Meta paid-traffic workflows.',
    ],
    workedExample: {
      scenarioTitle: 'Shopify Product Tested with Meta Ads ($59.99 Retail)',
      inputsSummary: [
        'Retail Price: $59.99 · Supplier Cost: $14.50 · Shipping: $4.50',
        'Ad CPA: $18.00 · Gateway: 2.9% + $0.30 · Refund Reserve: 3.0%',
      ],
      steps: [
        'Gateway fee = ($59.99 × 2.9%) + $0.30 = $2.04; Refund reserve = $59.99 × 3% = $1.80.',
        'Pre-ad profit = $59.99 − $14.50 − $4.50 − $2.04 − $1.80 = $37.15.',
        'Net profit after $18.00 CPA = $19.15/order; Break-Even ROAS = $59.99 ÷ $37.15 = 1.61x.',
      ],
      outcomeSummary: 'Net Profit: $19.15/order (31.92% margin · 3.33x ROAS · 1.61x Break-Even ROAS)',
    },
    relatedIds: ['roas-calculator', 'cpa-calculator', 'stripe-fee-calculator', 'tiktok-shop-calculator'],
    relatedBlogSlugs: ['shopify-dropshipping-unit-economics', 'tiktok-shop-and-social-commerce-margins'],
    faqs: [
      {
        question: 'What refund reserve percentage should dropshippers budget?',
        answer:
          'Most dropshipping stores reserve 2% to 5% of gross revenue for damaged-in-transit replacements, returns, and payment disputes.',
      },
      {
        question: 'What is Max Profitable CPA?',
        answer:
          'Max Profitable CPA equals your pre-ad gross profit per order. Any CPA below that threshold yields positive net profit on the first purchase.',
      },
    ],
  },
  'batch-sku-auditor': {
    id: 'batch-sku-auditor',
    name: 'Batch CSV SKU Profit Auditor',
    shortName: 'Batch SKU Auditor',
    category: 'profit-pricing',
    tagline: 'Paste or upload a CSV catalog to audit unit margins and total profit at scale.',
    description:
      'Upload or paste multiple SKUs (price, COGS, shipping, fee %, fixed fee, ad spend, monthly units) to spot unprofitable items and export a complete catalog profit audit CSV.',
    seoTitle: 'Batch CSV SKU Profit Auditor – Bulk Catalog Margin Checker | SellerMath',
    seoDescription:
      'Audit dozens of ecommerce SKUs at once from CSV data. Identify negative-margin products, blended catalog margin, and total monthly profit instantly in your browser.',
    formulaTitle: 'Catalog Blended Profit & Margin Formula',
    formulaText:
      'SKU Profit = (Price − COGS − Shipping − Ad Spend − (Price × Fee % + Fixed Fee)) × Monthly Units; Blended Margin = Total Profit ÷ Total Revenue',
    whatIs:
      'The Batch CSV SKU Profit Auditor runs full unit-economics calculations across an entire product catalog in one pass—all locally inside your browser with zero file uploads to external servers.',
    howItWorks: [
      'Paste CSV rows or upload a .csv file formatted as: SKU, Price, COGS, Shipping, Fee %, Fixed Fee, Ad Spend, Units.',
      'SellerMath automatically parses every SKU row, computes per-unit fees, net profit, margin %, ROI %, and monthly contribution.',
      'Sort or inspect winners vs. losers and click Export Audited CSV to download the enriched spreadsheet.',
    ],
    benefits: [
      'Spots hidden money-losing SKUs buried in multi-variant or wholesale catalogs.',
      '100% private client-side CSV parsing—your supplier costs never leave your device.',
      'Exports an audited CSV ready for Excel, Google Sheets, or repricing rules.',
    ],
    workedExample: {
      scenarioTitle: '3-SKU Apparel & Accessories Monthly Catalog Audit',
      inputsSummary: [
        'SKU-A ($42 price, $12 COGS, 120 units) · SKU-B ($28 price, $11 COGS, 85 units)',
        'SKU-C ($65 price, $21 COGS, 40 units) · 15% fee + $0.30 + $4–$6 ads',
      ],
      steps: [
        'SKU-A nets $14.40/unit ($1,728 total profit · 34.3% margin).',
        'SKU-B nets $3.50/unit ($297.50 total profit · 12.5% margin).',
        'SKU-C nets $20.45/unit ($818.00 total profit · 31.5% margin).',
      ],
      outcomeSummary: 'Catalog Profit: $2,843.50 · Blended Net Margin: 28.4% (3 / 3 Profitable)',
    },
    relatedIds: ['profit-calculator', 'marketplace-comparison-calculator', 'product-pricing-calculator', 'margin-calculator'],
    relatedBlogSlugs: ['how-to-calculate-true-ecommerce-profit', 'margin-vs-markup-for-ecommerce-sellers'],
    faqs: [
      {
        question: 'Is my uploaded CSV catalog stored on SellerMath servers?',
        answer:
          'No. The Batch CSV SKU Profit Auditor parses your CSV directly in browser memory using JavaScript. Nothing is uploaded, logged, or stored externally.',
      },
      {
        question: 'What column order does the CSV auditor expect?',
        answer:
          'Columns should follow: SKU, Price, COGS, Shipping, Fee%, FixedFee, AdSpend, Units. A header row is optional and automatically detected.',
      },
    ],
  },
  'roas-calculator': {
    id: 'roas-calculator',
    name: 'ROAS & Break-Even ROAS Calculator',
    shortName: 'ROAS',
    category: 'advertising-calculators',
    tagline: 'Measure Return on Ad Spend, ACoS, break-even ROAS, and net ad profit.',
    description:
      'Compare realized Return on Ad Spend against your Break-Even ROAS threshold using your product gross margin so you know when to scale or cut campaigns.',
    seoTitle: 'ROAS Calculator – Return on Ad Spend & Break-Even ROAS | SellerMath',
    seoDescription:
      'Calculate Return on Ad Spend (ROAS), Break-Even ROAS, ACoS, and net profit after ad spend for Meta, Google, TikTok, and Amazon campaigns.',
    formulaTitle: 'ROAS & Break-Even ROAS Formula',
    formulaText:
      'ROAS = Ad Revenue ÷ Ad Spend | Break-Even ROAS = 100 ÷ Gross Margin % | Net Ad Profit = (Ad Revenue × Gross Margin %) − Ad Spend',
    whatIs:
      'The ROAS & Break-Even ROAS Calculator measures how many revenue dollars each dollar of ad spend produces and tells you the exact minimum ROAS required for profitability based on your gross margin.',
    howItWorks: [
      'Enter total revenue attributed to your ad campaign and total ad spend.',
      'Input your product gross margin percentage before ads (Revenue minus COGS, shipping, and processing).',
      'Compare realized ROAS against Break-Even ROAS and view net profit generated.',
    ],
    benefits: [
      'Shows why a 3.0x ROAS can be wildly profitable for one brand and unprofitable for another.',
      'Converts ROAS directly into ACoS (%) for cross-platform reporting.',
      'Outputs net profit dollars rather than vanity revenue multiples.',
    ],
    workedExample: {
      scenarioTitle: 'Meta Ads Campaign with 45% Pre-Ad Gross Margin',
      inputsSummary: [
        'Attributed Revenue: $12,000 · Ad Spend: $3,000 · Pre-Ad Gross Margin: 45%',
      ],
      steps: [
        'Realized ROAS = $12,000 ÷ $3,000 = 4.00x (25.00% ACoS).',
        'Break-Even ROAS = 100 ÷ 45 = 2.22x.',
        'Gross profit before ads = $12,000 × 45% = $5,400; Net profit after ads = $5,400 − $3,000 = $2,400.',
      ],
      outcomeSummary: 'ROAS: 4.00x (Break-Even: 2.22x · Net Ad Profit: $2,400.00)',
    },
    relatedIds: ['cpa-calculator', 'dropshipping-profit-calculator', 'amazon-fba-calculator', 'roi-calculator'],
    relatedBlogSlugs: ['shopify-dropshipping-unit-economics', 'amazon-fba-break-even-acos-guide'],
    faqs: [
      {
        question: 'Why does a 2.0x ROAS lose money on low-margin products?',
        answer:
          'If your pre-ad gross margin is 40%, a 2.0x ROAS ($2 revenue per $1 ad spend) generates only $0.80 of gross profit—meaning you lose $0.20 on every $1 spent on ads. Break-even requires 2.50x ROAS.',
      },
      {
        question: 'How are ROAS and ACoS related?',
        answer:
          'ACoS is the inverse of ROAS expressed as a percentage: ACoS = (1 ÷ ROAS) × 100. A 4.0x ROAS equals a 25% ACoS.',
      },
    ],
  },
  'cpa-calculator': {
    id: 'cpa-calculator',
    name: 'Ad Spend & CPA Calculator',
    shortName: 'CPA & Ad Spend',
    category: 'advertising-calculators',
    tagline: 'Project clicks, orders, Cost Per Acquisition, and campaign profit from CPC.',
    description:
      'Forecast paid campaign outcomes from ad budget, cost-per-click (CPC), store conversion rate, average order value (AOV), and gross margin.',
    seoTitle: 'Ad Spend & CPA Calculator – Forecast Orders & Profit | SellerMath',
    seoDescription:
      'Calculate Cost Per Acquisition (CPA), estimated clicks, orders, maximum allowable CPA, and net campaign profit from CPC and conversion rate.',
    formulaTitle: 'CPA & Funnel Projection Formula',
    formulaText:
      'Clicks = Budget ÷ CPC | Orders = Clicks × Conversion Rate % | CPA = Budget ÷ Orders | Max CPA = AOV × Gross Margin %',
    whatIs:
      'The Ad Spend & CPA Calculator connects top-of-funnel media metrics (budget, CPC, conversion rate) to bottom-line unit economics (AOV, gross margin, maximum allowable CPA).',
    howItWorks: [
      'Enter your planned ad budget, expected Cost Per Click (CPC), and store conversion rate (%).',
      'Provide your Average Order Value (AOV) and pre-ad gross margin percentage.',
      'See projected clicks, total orders, realized CPA, max break-even CPA, and net campaign profit.',
    ],
    benefits: [
      'Tests how small improvements in store conversion rate lower your CPA.',
      'Establishes a hard Max Break-Even CPA ceiling before launching campaigns.',
      'Bridges media buying forecasts with finance forecasts.',
    ],
    workedExample: {
      scenarioTitle: '$2,000 Monthly Search Campaign ($1.25 CPC, 2.8% Conversion Rate)',
      inputsSummary: [
        'Budget: $2,000 · CPC: $1.25 · Conversion Rate: 2.8%',
        'AOV: $75.00 · Gross Margin: 50%',
      ],
      steps: [
        'Clicks = $2,000 ÷ $1.25 = 1,600 clicks; Orders = 1,600 × 2.8% = 44.8 (~45 orders).',
        'CPA = $2,000 ÷ 44.8 = $44.64; Max Break-Even CPA = $75.00 × 50% = $37.50.',
        'Revenue = $3,360; Gross Profit = $1,680; Net Campaign Loss = −$320 (needs higher CVR or AOV).',
      ],
      outcomeSummary: 'CPA: $44.64 vs Max $37.50 (45 Orders · Revenue: $3,360)',
    },
    relatedIds: ['roas-calculator', 'dropshipping-profit-calculator', 'break-even-calculator', 'profit-calculator'],
    relatedBlogSlugs: ['shopify-dropshipping-unit-economics', 'how-to-calculate-true-ecommerce-profit'],
    faqs: [
      {
        question: 'How can I lower my Cost Per Acquisition (CPA)?',
        answer:
          'You can lower CPA either by reducing CPC through stronger ad creative/CTR or by raising on-site conversion rate through faster page load times, clearer offers, and social proof.',
      },
      {
        question: 'What if my first-order CPA exceeds Max Break-Even CPA?',
        answer:
          'If your business relies on repeat purchases or subscriptions, compare CPA against 6- or 12-month Customer Lifetime Value (LTV) gross profit rather than first-order margin alone.',
      },
    ],
  },
  'sales-tax-calculator': {
    id: 'sales-tax-calculator',
    name: 'Sales Tax & VAT Calculator',
    shortName: 'Sales Tax / VAT',
    category: 'finance-calculators',
    tagline: 'Add sales tax or VAT to net prices, or extract tax from gross totals.',
    description:
      'Switch between adding US sales tax / UK & EU VAT onto a pre-tax price or reverse-extracting the tax component from a tax-inclusive retail price.',
    seoTitle: 'Sales Tax & VAT Calculator – Add or Extract Tax | SellerMath',
    seoDescription:
      'Calculate net pre-tax revenue, sales tax or VAT amount, and gross customer total in both forward and reverse tax-inclusive modes.',
    formulaTitle: 'Forward & Reverse Tax Formula',
    formulaText:
      'Add Tax: Gross = Net × (1 + Rate %) | Extract Tax: Net = Gross ÷ (1 + Rate %); Tax = Gross − Net',
    whatIs:
      'The Sales Tax & VAT Calculator helps e-commerce sellers compute sales tax or VAT both forward (adding tax onto a wholesale/B2B subtotal) and backward (extracting VAT from tax-inclusive European or UK retail prices).',
    howItWorks: [
      'Select "Add Tax to Net" or "Extract Tax from Gross".',
      'Enter the dollar amount and the applicable sales tax or VAT percentage (e.g., 8.25% US state/local or 20% UK VAT).',
      'Inspect the net pre-tax revenue, exact tax liability, and gross total.',
    ],
    benefits: [
      'Prevents overestimating profit on VAT-inclusive UK/EU marketplaces.',
      'Handles both forward invoicing and reverse gross-to-net bookkeeping.',
      'Displays net, tax, and gross figures cleanly in one breakdown.',
    ],
    workedExample: {
      scenarioTitle: 'Extracting 20% UK VAT from a £120.00 Retail Listing',
      inputsSummary: [
        'Mode: Extract Tax from Gross · Gross Price: $120.00 · VAT Rate: 20.0%',
      ],
      steps: [
        'Net pre-tax price = $120.00 ÷ (1 + 0.20) = $100.00.',
        'VAT portion = $120.00 − $100.00 = $20.00.',
      ],
      outcomeSummary: 'Net Revenue: $100.00 (VAT Liability: $20.00 · Gross: $120.00)',
    },
    relatedIds: ['profit-calculator', 'ebay-fee-calculator', 'etsy-fee-calculator', 'square-fee-calculator'],
    relatedBlogSlugs: ['how-to-calculate-true-ecommerce-profit'],
    faqs: [
      {
        question: 'Why cannot I multiply a tax-inclusive price by 20% to find 20% VAT?',
        answer:
          'Because 20% VAT is 20% of the net price, which equals 16.67% of the gross tax-inclusive price ($20 out of $120). Always divide by (1 + rate) to extract included tax.',
      },
      {
        question: 'Should I exclude collected sales tax when measuring profit margin?',
        answer:
          'Yes. Sales tax and VAT are pass-through liabilities collected for tax authorities—measure your profit margins against net pre-tax revenue.',
      },
    ],
  },
  'inventory-reorder-calculator': {
    id: 'inventory-reorder-calculator',
    name: 'Inventory Cash Flow & Reorder Calculator',
    shortName: 'Inventory Reorder',
    category: 'finance-calculators',
    tagline: 'Calculate reorder points, safety stock units, and purchase order capital.',
    description:
      'Prevent stockouts and plan working capital by computing exact Reorder Point thresholds, safety stock buffers, and supplier PO funding requirements.',
    seoTitle: 'Inventory Reorder & Cash Flow Calculator | SellerMath',
    seoDescription:
      'Calculate inventory reorder points, safety stock buffers, replenishment PO quantities, and working capital required for e-commerce SKUs.',
    formulaTitle: 'Reorder Point & PO Capital Formula',
    formulaText:
      'Reorder Point = (Daily Sales × Lead Time Days) + (Daily Sales × Safety Stock Days) | PO Capital = (Daily Sales × Cycle Days) × Unit Landed Cost',
    whatIs:
      'The Inventory Cash Flow & Reorder Calculator tells operations managers and FBA/Shopify brands the exact stock level at which to place the next supplier purchase order and how much cash that replenishment order requires.',
    howItWorks: [
      'Enter your average daily unit sales velocity and supplier lead time in days.',
      'Set your safety stock buffer (in days of coverage) and desired replenishment cycle length.',
      'Provide your landed cost per unit to compute Reorder Point units, PO quantity, and required capital.',
    ],
    benefits: [
      'Eliminates guesswork around when to reorder fast-moving inventory.',
      'Quantifies how much working capital sits tied up in safety stock.',
      'Helps align Amazon FBA and 3PL restock schedules with supplier lead times.',
    ],
    workedExample: {
      scenarioTitle: 'Best-Selling SKU Moving 18 Units/Day (30-Day Supplier Lead Time)',
      inputsSummary: [
        'Daily Velocity: 18 units · Lead Time: 30 days · Safety Stock: 14 days',
        'Order Cycle: 60 days · Unit Landed Cost: $7.50',
      ],
      steps: [
        'Lead-time demand = 18 × 30 = 540 units; Safety stock = 18 × 14 = 252 units.',
        'Reorder Point = 540 + 252 = 792 units remaining in stock.',
        'Next 60-day PO = 18 × 60 = 1,080 units × $7.50 = $8,100.00 PO capital required.',
      ],
      outcomeSummary: 'Reorder Point: 792 Units · Next PO: 1,080 Units ($8,100.00 Capital)',
    },
    relatedIds: ['amazon-fba-calculator', 'roi-calculator', 'break-even-calculator', 'profit-calculator'],
    relatedBlogSlugs: ['inventory-cash-flow-for-scaling-brands', 'amazon-fba-break-even-acos-guide'],
    faqs: [
      {
        question: 'How many days of safety stock should e-commerce sellers keep?',
        answer:
          'Most brands maintain 10 to 21 days of safety stock depending on supplier reliability, seasonal demand swings, and port/customs transit variability.',
      },
      {
        question: 'What is included in Lead Time Days?',
        answer:
          'Count the entire elapsed time from placing a purchase order—manufacturing, quality inspection, ocean/air freight, customs clearance, and warehouse check-in—until units become sellable.',
      },
    ],
  },
};

export const CALCULATORS: Record<CalculatorSlug, CalculatorMeta> = Object.fromEntries(
  (Object.entries(RAW_CALCULATORS) as Array<[CalculatorSlug, BaseCalculatorMeta]>).map(([id, item]) => [
    id,
    {
      ...item,
      lastVerified: item.lastVerified || SOURCE_BY_ID[id]?.lastVerified || 'Nov 2026',
      sourceNote: item.sourceNote || SOURCE_BY_ID[id]?.sourceNote || 'SellerMath Verified Standard Formula',
    },
  ])
) as Record<CalculatorSlug, CalculatorMeta>;

export const CALCULATOR_LIST: CalculatorMeta[] = Object.values(CALCULATORS);

export const CATEGORY_LIST: CategoryInfo[] = [
  CATEGORIES['marketplace-fees'],
  CATEGORIES['payment-fees'],
  CATEGORIES['profit-pricing'],
  CATEGORIES['advertising-calculators'],
  CATEGORIES['finance-calculators'],
];

export const FEATURED_CALCULATOR_IDS: CalculatorSlug[] = [
  'marketplace-comparison-calculator',
  'amazon-fba-calculator',
  'product-pricing-calculator',
  'batch-sku-auditor',
];

export const POPULAR_CALCULATOR_IDS: CalculatorSlug[] = [
  'ebay-fee-calculator',
  'paypal-fee-calculator',
  'etsy-fee-calculator',
  'margin-calculator',
  'tiktok-shop-calculator',
  'dropshipping-profit-calculator',
];

export interface PartnerRecommendation {
  name: string;
  category: string;
  description: string;
  ctaLabel: string;
  disclosure: string;
  targetPath: string;
  externalUrl?: string;
  isSponsored?: boolean;
}

export const PARTNER_RECOMMENDATIONS: PartnerRecommendation[] = [
  {
    name: 'Shopify Storefront & Checkout',
    category: 'DTC Platform',
    description:
      'Launch a direct-to-consumer store with 2.9% + $0.30 Shopify Payments and keep full customer LTV without 15% marketplace referral fees.',
    ctaLabel: 'Visit Shopify',
    disclosure: 'Sponsored Partner',
    targetPath: '/calculators/marketplace-comparison-calculator',
    externalUrl: 'https://www.shopify.com/?ref=sellermath',
    isSponsored: true,
  },
  {
    name: 'Helium 10 Amazon Research Suite',
    category: 'Amazon FBA Ops',
    description:
      'Validate search volume, competitor BSR, and keyword PPC bids before running your landed unit economics in our FBA calculator.',
    ctaLabel: 'Explore Helium 10',
    disclosure: 'Affiliate Partner',
    targetPath: '/calculators/amazon-fba-calculator',
    externalUrl: 'https://www.helium10.com/?ref=sellermath',
    isSponsored: true,
  },
];

export const GLOBAL_FAQS: FaqItem[] = [
  {
    question: 'Are all SellerMath calculators free to use?',
    answer:
      'Yes. All 21 calculators across Marketplace, Payments, Profit & Margin, Advertising, and Finance categories are completely free with instant client-side calculations and no account required.',
  },
  {
    question: 'Does SellerMath store or upload my financial inputs?',
    answer:
      'No. All math runs locally inside your browser. Your product costs, margins, CSV catalog audits, and ad metrics never leave your device, while your Recently Used shortcuts and currency choice stay in local browser storage.',
  },
  {
    question: 'How accurate are the marketplace and payment fee presets?',
    answer:
      'Presets reflect published 2026 fee schedules for eBay, Amazon FBA, Etsy, TikTok Shop, Walmart, PayPal, Stripe, and Square, and every percentage or fixed fee input can be customized for negotiated rates.',
  },
  {
    question: 'Which calculator should I use first when launching a new product?',
    answer:
      'Start with the Product Pricing or Marketplace Comparison Calculator to benchmark margins across channels, verify break-even volume, and set your Break-Even ROAS target.',
  },
];

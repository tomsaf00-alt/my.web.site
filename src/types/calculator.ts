export type CategorySlug =
  | 'marketplace-fees'
  | 'payment-fees'
  | 'profit-pricing'
  | 'advertising-calculators'
  | 'finance-calculators';

export type CalculatorSlug =
  | 'ebay-fee-calculator'
  | 'amazon-fba-calculator'
  | 'etsy-fee-calculator'
  | 'tiktok-shop-calculator'
  | 'walmart-seller-calculator'
  | 'marketplace-comparison-calculator'
  | 'paypal-fee-calculator'
  | 'stripe-fee-calculator'
  | 'square-fee-calculator'
  | 'profit-calculator'
  | 'margin-calculator'
  | 'markup-calculator'
  | 'roi-calculator'
  | 'break-even-calculator'
  | 'product-pricing-calculator'
  | 'dropshipping-profit-calculator'
  | 'batch-sku-auditor'
  | 'roas-calculator'
  | 'cpa-calculator'
  | 'sales-tax-calculator'
  | 'inventory-reorder-calculator';

export type BlogCategory =
  | 'Ecommerce'
  | 'Amazon FBA'
  | 'Etsy'
  | 'eBay'
  | 'Shopify'
  | 'Profit & Margin'
  | 'Online Selling';

export type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface WorkedExample {
  scenarioTitle: string;
  inputsSummary: string[];
  steps: string[];
  outcomeSummary: string;
}

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  faqs: FaqItem[];
}

export interface CalculatorMeta {
  id: CalculatorSlug;
  name: string;
  shortName: string;
  category: CategorySlug;
  tagline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  formulaTitle: string;
  formulaText: string;
  lastVerified: string;
  sourceNote: string;
  whatIs: string;
  howItWorks: string[];
  benefits: string[];
  workedExample: WorkedExample;
  relatedIds: CalculatorSlug[];
  relatedBlogSlugs: string[];
  faqs: FaqItem[];
}

export interface BlogTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    table?: BlogTable;
  }>;
  relatedCalculators: CalculatorSlug[];
}

export interface BreakdownLine {
  label: string;
  value: number;
  isCurrency?: boolean;
  isPercent?: boolean;
  isMultiplier?: boolean;
  isInteger?: boolean;
  tone?: 'neutral' | 'positive' | 'warning' | 'negative';
  subtext?: string;
}

export interface ProportionSegment {
  label: string;
  amount: number;
  percent: number;
  tone: 'cost' | 'fees' | 'profit' | 'loss';
}

export interface CalculationOutput {
  primaryLabel: string;
  primaryValue: number;
  primaryFormat: 'currency' | 'percent' | 'integer' | 'multiplier';
  primaryTone: 'positive' | 'warning' | 'negative' | 'neutral';
  secondaryMetrics: Array<{
    label: string;
    value: string;
    tone?: 'positive' | 'warning' | 'negative' | 'neutral';
  }>;
  breakdown: BreakdownLine[];
  segments: ProportionSegment[];
}

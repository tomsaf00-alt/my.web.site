import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_POSTS } from '../data/blog';
import { CALCULATORS } from '../data/catalog';
import { BlogCategory } from '../types/calculator';
import { AdSlot } from './AdSlot';

interface BlogViewProps {
  articleSlug?: string;
  onNavigate: (path: string) => void;
}

export function BlogView({ articleSlug, onNavigate }: BlogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>('All');

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const activePost = useMemo(
    () => (articleSlug ? BLOG_POSTS.find((p) => p.slug === articleSlug) : undefined),
    [articleSlug]
  );

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  if (activePost) {
    const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== activePost.slug).slice(0, 3);

    return (
      <article className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <a href="/" onClick={(e) => handleNav(e, '/')} className="hover:text-slate-900 dark:hover:text-slate-100">
            Home
          </a>
          <span aria-hidden="true">/</span>
          <a href="/blog" onClick={(e) => handleNav(e, '/blog')} className="hover:text-slate-900 dark:hover:text-slate-100">
            Blog
          </a>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-slate-800 dark:text-slate-200">{activePost.category}</span>
        </nav>

        <header className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{activePost.category}</span>
            <span aria-hidden="true">·</span>
            <span>{activePost.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{activePost.readTime}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
            {activePost.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {activePost.excerpt}
          </p>
        </header>

        <div className="my-6">
          <AdSlot slotId={`blog-${activePost.slug}-top`} format="horizontal" />
        </div>

        <div className="space-y-8 py-4">
          {activePost.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-50">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {p}
                </p>
              ))}
              {section.table && (
                <div className="my-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <table className="w-full text-left text-sm">
                    <caption className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                      {section.table.caption}
                    </caption>
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {section.table.headers.map((h) => (
                          <th key={h} className="px-4 py-2.5 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {section.table.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`px-4 py-2.5 ${
                                cIdx === 0
                                  ? 'font-medium text-slate-900 dark:text-slate-100'
                                  : 'font-mono tabular-nums text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Internal Linking: Calculators mentioned in article */}
        <section className="my-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-50">
            Run the Numbers with SellerMath
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Apply the formulas from this guide directly in our interactive calculators.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activePost.relatedCalculators.map((calcId) => {
              const calc = CALCULATORS[calcId];
              return (
                <a
                  key={calc.id}
                  href={`/calculators/${calc.id}`}
                  onClick={(e) => handleNav(e, `/calculators/${calc.id}`)}
                  className="group flex flex-col justify-between rounded-lg border border-slate-200 dark:border-slate-800 p-4 hover:border-emerald-600/60 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                      {calc.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{calc.tagline}</p>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    <span>Open tool</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {/* More Articles */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-50">
              More Guides from SellerMath
            </h2>
            <a
              href="/blog"
              onClick={(e) => handleNav(e, '/blog')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>All blog articles</span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((rel) => (
              <a
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                onClick={(e) => handleNav(e, `/blog/${rel.slug}`)}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-emerald-600/60 transition-colors"
              >
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {rel.category} · {rel.readTime}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {rel.title}
                </p>
              </a>
            ))}
          </div>
        </section>
      </article>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <a href="/" onClick={(e) => handleNav(e, '/')} className="hover:text-slate-900 dark:hover:text-slate-100">
          Home
        </a>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-slate-800 dark:text-slate-200">Blog</span>
      </nav>

      <header className="max-w-3xl pb-8 border-b border-slate-200 dark:border-slate-800">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          SellerMath Editorial · {BLOG_CATEGORIES.length} Ecommerce Categories
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
          SellerMath Blog: Fees, Margins &amp; Online Selling Guides
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Actionable pricing playbooks, marketplace fee updates, and unit economics guides written for Amazon FBA, eBay, Etsy, Shopify, and multi-channel sellers.
        </p>
      </header>

      {/* Blog Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="Filter blog articles by category"
        className="my-6 flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit max-w-full"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === 'All'}
          onClick={() => setSelectedCategory('All')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          All ({BLOG_POSTS.length})
        </button>
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            onClick={(e) => handleNav(e, `/blog/${post.slug}`)}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:border-emerald-600/60 dark:hover:border-emerald-500/60 transition-colors"
          >
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {post.category} · {post.publishedAt} · {post.readTime}
              </p>
              <h2 className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                {post.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {post.excerpt}
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <span>Read full guide</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>

      <div className="my-8">
        <AdSlot slotId="blog-index-bottom" format="horizontal" />
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Check, Code2, Copy, X } from 'lucide-react';
import { SITE_URL } from '../config/site';
import { CalculatorSlug } from '../types/calculator';

interface EmbedModalProps {
  calculatorId: CalculatorSlug;
  calculatorName: string;
  open: boolean;
  onClose: () => void;
}

export function EmbedModal({ calculatorId, calculatorName, open, onClose }: EmbedModalProps) {
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState(680);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const origin =
    typeof window !== 'undefined' && window.location.origin.startsWith('http')
      ? window.location.origin
      : SITE_URL;
  const embedSrc = `${origin}/calculators/${calculatorId}?embed=1`;
  const pageUrl = `${origin}/calculators/${calculatorId}`;

  const snippet = `<iframe src="${embedSrc}" title="${calculatorName} – SellerMath" width="100%" height="${height}" style="border:1px solid #e2e8f0;border-radius:12px;" loading="lazy"></iframe>\n<p style="font-size:12px;color:#64748b;margin-top:6px;">Powered by <a href="${pageUrl}" target="_blank" rel="noopener">SellerMath ${calculatorName}</a></p>`;

  const handleCopy = () => {
    navigator.clipboard
      ?.writeText(snippet)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="embed-modal-title"
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <h2 id="embed-modal-title" className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
              Embed {calculatorName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close embed modal"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Embed this interactive calculator on your Shopify blog, Substack, WordPress guide, or seller community resource with automatic attribution.
          </p>

          <div>
            <label htmlFor="embed-height" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Iframe Height (px)
            </label>
            <input
              id="embed-height"
              type="number"
              min={420}
              max={1200}
              step={20}
              value={height}
              onChange={(e) => setHeight(Math.max(420, parseInt(e.target.value, 10) || 680))}
              className="h-9 w-28 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 font-mono text-xs text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label htmlFor="embed-code-box" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              HTML Embed Snippet
            </label>
            <textarea
              id="embed-code-box"
              readOnly
              rows={5}
              value={snippet}
              onFocus={(e) => e.target.select()}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-lg border border-slate-300 dark:border-slate-700 px-3.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 text-xs font-semibold text-white cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              <span>{copied ? 'Copied Snippet' : 'Copy Embed Code'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

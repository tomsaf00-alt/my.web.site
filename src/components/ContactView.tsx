import { useState } from 'react';
import { CheckCircle2, Mail, MessageSquare } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_ENDPOINT } from '../config/site';

interface ContactViewProps {
  onNavigate: (path: string) => void;
}

export function ContactView({ onNavigate }: ContactViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Fee Schedule Update');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `[SellerMath] ${topic} — ${name || 'Inquiry'}`
  )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setErrorMsg('');

    if (!CONTACT_ENDPOINT) {
      window.location.href = mailtoHref;
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, topic, message, source: 'sellermath.app' }),
      });
      if (!res.ok) {
        throw new Error(`Submission returned HTTP ${res.status}`);
      }
      setSubmitted(true);
    } catch {
      setErrorMsg('Unable to submit via endpoint right now. Use the direct email link below.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <a href="/" onClick={(e) => handleNav(e, '/')} className="hover:text-slate-900 dark:hover:text-slate-100">
          Home
        </a>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-slate-800 dark:text-slate-200">Contact</span>
      </nav>

      <header className="pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
          Contact SellerMath
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Suggest a new marketplace calculator, report a fee schedule change, or inquire about sponsored placements and partner integrations.
        </p>
      </header>

      <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mx-auto" aria-hidden="true" />
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-50">
                Message Prepared
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Thank you, {name}. {CONTACT_ENDPOINT ? 'Your inquiry has been submitted for editorial review.' : `Your mail client should open for ${CONTACT_EMAIL}.`}
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                {!CONTACT_ENDPOINT && (
                  <a
                    href={mailtoHref}
                    className="rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-semibold text-white"
                  >
                    Open Email Draft
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="h-11 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@store.com"
                    className="h-11 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-topic" className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="Fee Schedule Update">Fee Schedule Update</option>
                  <option value="New Calculator Request">New Calculator Request</option>
                  <option value="Sponsored Content & Partnerships">Sponsored Content &amp; Partnerships</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share marketplace rate details, calculator ideas, or partnership info..."
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3.5 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {errorMsg}{' '}
                  <a href={mailtoHref} className="underline font-medium">
                    Email {CONTACT_EMAIL}
                  </a>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 px-6 text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400"
                >
                  Or email {CONTACT_EMAIL} directly
                </a>
              </div>
            </form>
          )}
        </div>

        <aside className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-display text-base font-semibold">
              <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <h2>Editorial &amp; Partnerships</h2>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We collaborate with accounting software, 3PL fulfillment networks, and ecommerce SaaS platforms on transparent sponsored guides and workflow tools.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-display text-base font-semibold">
              <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <h2>Fee Accuracy Reports</h2>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Spotted a recent fee change on Amazon FBA, eBay, TikTok Shop, or Etsy? Send the updated category link and we will update the default preset.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

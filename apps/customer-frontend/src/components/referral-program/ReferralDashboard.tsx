'use client';

import { useEffect, useState } from 'react';

type ReferralData = {
  owner_email: string;
  referral_code: string;
  referral_link: string;
  clicks: number;
  signups: number;
};

export default function ReferralDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<ReferralData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch('/talent/referrals/me', { credentials: 'include' })
      .then(async (r) => {
        if (!r.ok) throw new Error(r.status === 401 ? 'Please log in to view your referral dashboard.' : 'Could not load referral data.');
        return r.json();
      })
      .then((j) => {
        if (!mounted) return;
        setData(j);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e.message || 'Could not load referral data.');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const copyLink = async () => {
    if (!data?.referral_link) return;
    try {
      await navigator.clipboard.writeText(data.referral_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="pb-8 md:pb-12" aria-label="Referral dashboard">
      <div className="main-container">
        <div className="dark:bg-background-6 mx-auto max-w-[980px] rounded-3xl bg-white p-6 md:p-8">
          <h3 className="text-heading-5 mb-3">Your referral dashboard</h3>
          {loading && <p className="text-secondary/70 dark:text-accent/70 text-sm">Loading referral stats...</p>}
          {!loading && error && (
            <div className="rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-900 dark:border-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-100">
              {error} <a className="underline" href="/login">Log in</a>
            </div>
          )}
          {!loading && !error && data && (
            <div className="space-y-4">
              <p className="text-secondary/70 dark:text-accent/70 text-sm">Logged in as {data.owner_email}</p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="bg-background-3 dark:bg-background-7 rounded-xl p-4">
                  <p className="text-tagline-3 text-secondary/70 dark:text-accent/70">Referral code</p>
                  <p className="text-heading-6 mt-1">{data.referral_code}</p>
                </div>
                <div className="bg-background-3 dark:bg-background-7 rounded-xl p-4">
                  <p className="text-tagline-3 text-secondary/70 dark:text-accent/70">Clicks</p>
                  <p className="text-heading-6 mt-1">{data.clicks}</p>
                </div>
                <div className="bg-background-3 dark:bg-background-7 rounded-xl p-4">
                  <p className="text-tagline-3 text-secondary/70 dark:text-accent/70">Signups</p>
                  <p className="text-heading-6 mt-1">{data.signups}</p>
                </div>
              </div>
              <div>
                <label className="text-tagline-2 text-secondary dark:text-accent mb-2 block font-medium">Referral link</label>
                <div className="flex flex-col gap-3 md:flex-row">
                  <input readOnly value={data.referral_link} className="auth-form-input w-full" />
                  <button
                    type="button"
                    onClick={copyLink}
                    className="btn btn-md btn-primary hover:btn-secondary dark:hover:btn-accent w-full md:w-auto">
                    {copied ? 'Copied!' : 'Copy link'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

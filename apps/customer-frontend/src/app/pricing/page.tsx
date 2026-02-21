import Benefits from '@/components/pricing/Benefits';
import Contact from '@/components/pricing/Contact';
import Features from '@/components/pricing/Features';
import Pricing from '@/components/pricing/Pricing';
import CTA from '@/components/shared/cta/CTA';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'JobLynk Pricing | Plans for Modern Recruiting Teams',
  description:
    'Compare JobLynk pricing plans for startups, growth-stage teams, and enterprises. Scale AI-powered screening and interview workflows with confidence.',
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const q = await searchParams;
  const stripeStatus = typeof q.stripe === 'string' ? q.stripe : '';
  const checkout = typeof q.checkout === 'string' ? q.checkout : '';

  return (
    <main className="bg-background-3 dark:bg-background-7">
      {(stripeStatus || checkout) && (
        <div className="main-container pt-[120px] md:pt-[160px]">
          <div className="rounded-2xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-900 dark:border-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-100">
            {checkout === 'success' && 'Payment successful. Your subscription is being activated.'}
            {checkout === 'cancelled' && 'Checkout was cancelled.'}
            {stripeStatus === 'missing_secret' && 'Stripe is not configured yet. Add STRIPE_SECRET_KEY in env.'}
            {stripeStatus === 'missing_price' && 'Stripe price IDs are missing. Add STRIPE_PRICE_ESSENTIAL / STRIPE_PRICE_ADVANCED.'}
            {stripeStatus === 'checkout_failed' && 'Could not start Stripe checkout. Please try again.'}
            {stripeStatus === 'error' && 'Stripe checkout error. Please try again.'}
          </div>
        </div>
      )}
      <Pricing />
      <Benefits />
      <Features />
      <Contact />
      <CTA
        className="dark:bg-background-7 bg-background-3"
        badgeText="Get started"
        badgeClass="!badge-cyan"
        ctaHeading="Choose a JobLynk plan built for"
        spanText="faster hiring"
        description="Start with the plan that matches your recruiting volume, then scale interviews, analytics, and collaboration as your team grows."
        ctaBtnText="Talk to sales"
        btnClass="hover:btn-secondary dark:hover:btn-accent"
      />
    </main>
  );
};

export default page;

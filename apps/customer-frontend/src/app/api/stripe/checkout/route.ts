import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const PLAN_TO_PRICE_ENV: Record<string, string> = {
  essential: 'STRIPE_PRICE_ESSENTIAL',
  advanced: 'STRIPE_PRICE_ADVANCED',
};

async function appBaseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get('x-forwarded-host') || h.get('host') || 'screening.joblynk.ai';
  const proto = h.get('x-forwarded-proto') || 'https';
  return `${proto}://${host}`;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const plan = String(form.get('plan') || 'advanced').toLowerCase();

    if (plan === 'enterprise') {
      return NextResponse.redirect(new URL('/contact-us?plan=enterprise', await appBaseUrl()), 303);
    }

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.redirect(new URL('/pricing?stripe=missing_secret', await appBaseUrl()), 303);
    }

    const priceEnvName = PLAN_TO_PRICE_ENV[plan] || PLAN_TO_PRICE_ENV.advanced;
    const priceId = process.env[priceEnvName];
    if (!priceId) {
      return NextResponse.redirect(new URL(`/pricing?stripe=missing_price&plan=${encodeURIComponent(plan)}`, await appBaseUrl()), 303);
    }

    const stripe = new Stripe(key);
    const base = await appBaseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${base}/pricing?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/pricing?checkout=cancelled`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      metadata: {
        plan,
      },
    });

    if (!session.url) {
      return NextResponse.redirect(new URL('/pricing?stripe=checkout_failed', base), 303);
    }

    return NextResponse.redirect(session.url, 303);
  } catch {
    return NextResponse.redirect(new URL('/pricing?stripe=error', await appBaseUrl()), 303);
  }
}

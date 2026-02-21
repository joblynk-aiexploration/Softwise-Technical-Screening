import Stripe from 'stripe';
import { Pool } from 'pg';

export const runtime = 'nodejs';

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const dbUrl = process.env.DATABASE_URL || '';

const pool = dbUrl ? new Pool({ connectionString: dbUrl }) : null;

async function ensureTable() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.stripe_subscriptions (
      id BIGSERIAL PRIMARY KEY,
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT UNIQUE,
      stripe_session_id TEXT,
      stripe_price_id TEXT,
      plan TEXT,
      status TEXT,
      amount_total BIGINT,
      currency TEXT,
      customer_email TEXT,
      event_id TEXT,
      raw_event JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

async function upsertSubscription(eventId: string, payload: {
  customerId?: string | null;
  subscriptionId?: string | null;
  sessionId?: string | null;
  priceId?: string | null;
  plan?: string | null;
  status?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
  email?: string | null;
  rawEvent: unknown;
}) {
  if (!pool || !payload.subscriptionId) return;
  await ensureTable();
  await pool.query(
    `
    INSERT INTO public.stripe_subscriptions (
      stripe_customer_id, stripe_subscription_id, stripe_session_id,
      stripe_price_id, plan, status, amount_total, currency,
      customer_email, event_id, raw_event, updated_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW())
    ON CONFLICT (stripe_subscription_id) DO UPDATE SET
      stripe_customer_id = EXCLUDED.stripe_customer_id,
      stripe_session_id = EXCLUDED.stripe_session_id,
      stripe_price_id = EXCLUDED.stripe_price_id,
      plan = EXCLUDED.plan,
      status = EXCLUDED.status,
      amount_total = EXCLUDED.amount_total,
      currency = EXCLUDED.currency,
      customer_email = EXCLUDED.customer_email,
      event_id = EXCLUDED.event_id,
      raw_event = EXCLUDED.raw_event,
      updated_at = NOW();
    `,
    [
      payload.customerId || null,
      payload.subscriptionId,
      payload.sessionId || null,
      payload.priceId || null,
      payload.plan || null,
      payload.status || null,
      payload.amountTotal ?? null,
      payload.currency || null,
      payload.email || null,
      eventId,
      payload.rawEvent,
    ],
  );
}

export async function POST(req: Request) {
  if (!stripeSecret || !webhookSecret) {
    return new Response('Stripe webhook not configured', { status: 500 });
  }

  const stripe = new Stripe(stripeSecret);
  const sig = req.headers.get('stripe-signature');
  if (!sig) return new Response('Missing signature', { status: 400 });

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid signature';
    return new Response(`Webhook Error: ${msg}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : null;
        const priceId = session.metadata?.priceId || null;
        const plan = session.metadata?.plan || null;

        await upsertSubscription(event.id, {
          customerId: (session.customer as string) || null,
          subscriptionId,
          sessionId: session.id,
          priceId,
          plan,
          status: session.status || 'completed',
          amountTotal: session.amount_total ?? null,
          currency: session.currency || null,
          email: session.customer_details?.email || session.customer_email || null,
          rawEvent: event,
        });
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const item = sub.items.data?.[0];
        await upsertSubscription(event.id, {
          customerId: (sub.customer as string) || null,
          subscriptionId: sub.id,
          sessionId: null,
          priceId: item?.price?.id || null,
          plan: item?.price?.nickname || item?.price?.lookup_key || null,
          status: sub.status,
          amountTotal: null,
          currency: item?.price?.currency || null,
          email: null,
          rawEvent: event,
        });
        break;
      }

      default:
        break;
    }

    return new Response('ok', { status: 200 });
  } catch {
    return new Response('webhook handling failed', { status: 500 });
  }
}

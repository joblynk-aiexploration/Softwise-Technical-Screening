import { Pool } from 'pg';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const dbUrl =
  process.env.DATABASE_URL || 'postgresql://postgres:AIzaSyC69gwKzgTO9@127.0.0.1:5432/agent_memory_hub';
const pool = dbUrl ? new Pool({ connectionString: dbUrl }) : null;

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'no-reply@joblynk.ai';
const SMTP_USE_TLS = ['1', 'true', 'yes'].includes((process.env.SMTP_USE_TLS || 'true').toLowerCase());
const CONTACT_NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || 'ryzsale@gmail.com';

async function ensureTable() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.contact_submissions (
      id BIGSERIAL PRIMARY KEY,
      full_name TEXT,
      phone TEXT,
      email TEXT,
      subject TEXT,
      message TEXT,
      source_path TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

async function saveSubmission(payload: {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  sourcePath: string;
}) {
  if (!pool) return;
  await ensureTable();
  await pool.query(
    `
      INSERT INTO public.contact_submissions (full_name, phone, email, subject, message, source_path)
      VALUES ($1,$2,$3,$4,$5,$6)
    `,
    [payload.fullName, payload.phone, payload.email, payload.subject, payload.message, payload.sourcePath],
  );
}

async function sendNotificationEmail(payload: {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return false;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: SMTP_FROM,
    to: CONTACT_NOTIFY_EMAIL,
    replyTo: payload.email,
    subject: `[JobLynk Contact] ${payload.subject}`,
    text: [
      'New contact form submission:',
      `Name: ${payload.fullName}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Subject: ${payload.subject}`,
      '',
      'Message:',
      payload.message,
    ].join('\n'),
  });

  return true;
}

export async function POST(req: Request) {
  const form = await req.formData();

  const fullName = String(form.get('fullname') || '').trim();
  const phone = String(form.get('number') || '').trim();
  const email = String(form.get('email') || '').trim();
  const subject = String(form.get('subject') || '').trim();
  const message = String(form.get('message') || '').trim();

  if (!fullName || !phone || !email || !subject || !message) {
    return new Response(null, { status: 303, headers: { Location: '/contact-us?status=error' } });
  }

  try {
    await saveSubmission({
      fullName,
      phone,
      email,
      subject,
      message,
      sourcePath: '/contact-us',
    });

    // Don't block success on email transport issues.
    try {
      await sendNotificationEmail({ fullName, phone, email, subject, message });
    } catch {
      // no-op
    }

    return new Response(null, { status: 303, headers: { Location: '/contact-us?status=sent' } });
  } catch {
    return new Response(null, { status: 303, headers: { Location: '/contact-us?status=error' } });
  }
}

import Link from 'next/link';

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function ForgotPasswordPage({ searchParams }: { searchParams: SP }) {
  const q = await searchParams;
  const msg = typeof q.msg === 'string' ? q.msg : '';

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen pt-[120px] pb-[70px] lg:pt-[180px]">
      <div className="main-container">
        <div className="mx-auto max-w-[560px] rounded-4xl bg-white p-8 dark:bg-black">
          <h2 className="mb-2 text-heading-4">Forgot Password</h2>
          <p className="text-secondary/70 dark:text-accent/70 mb-4 text-sm">Enter your email. We’ll send a reset code.</p>
          {msg === 'sent' && (
            <div className="mb-4 rounded-xl border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-800 dark:border-green-700 dark:bg-green-950/30 dark:text-green-200">
              If the account exists, a reset code was sent.
            </div>
          )}
          <form method="post" action="/talent/forgot-password" className="space-y-3">
            <fieldset className="space-y-2">
              <label htmlFor="email" className="text-tagline-2 text-secondary dark:text-accent block font-medium">Email</label>
              <input id="email" name="email" type="email" required className="auth-form-input" placeholder="you@joblynk.ai" />
            </fieldset>
            <button type="submit" className="btn btn-md btn-primary hover:btn-secondary dark:hover:btn-accent w-full">Send reset code</button>
          </form>
          <div className="mt-4 text-sm">
            <Link href="/reset-password" className="footer-link-v2 mr-3">I already have a code</Link>
            <Link href="/login" className="footer-link-v2">Back to login</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

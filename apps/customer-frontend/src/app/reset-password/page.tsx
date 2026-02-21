import Link from 'next/link';

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function ResetPasswordPage({ searchParams }: { searchParams: SP }) {
  const q = await searchParams;
  const err = typeof q.err === 'string' ? q.err : '';

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen pt-[120px] pb-[70px] lg:pt-[180px]">
      <div className="main-container">
        <div className="mx-auto max-w-[560px] rounded-4xl bg-white p-8 dark:bg-black">
          <h2 className="mb-2 text-heading-4">Set New Password</h2>
          <p className="text-secondary/70 dark:text-accent/70 mb-4 text-sm">Use your reset code to set a new password.</p>
          {err === '1' && (
            <div className="mb-4 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-700 dark:bg-red-950/30 dark:text-red-200">
              Invalid/expired code or weak password.
            </div>
          )}
          <form method="post" action="/talent/reset-password" className="space-y-3">
            <input name="email" type="email" required className="auth-form-input" placeholder="Email" />
            <input name="code" type="text" required className="auth-form-input" placeholder="6-digit reset code" />
            <input name="password" type="password" required className="auth-form-input" placeholder="New password (min 10 chars)" />
            <button type="submit" className="btn btn-md btn-primary hover:btn-secondary dark:hover:btn-accent w-full">Update password</button>
          </form>
          <div className="mt-4 text-sm">
            <Link href="/login" className="footer-link-v2">Back to login</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

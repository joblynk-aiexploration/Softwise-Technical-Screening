import SignupBgImage from '@public/images/ns-img-374.jpg';
import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';
import SocialAuthV2 from './SocialAuthV2';

const SignupHero = ({ status = '', refCode = '' }: { status?: string; refCode?: string }) => {
  const success = status === 'created';
  const error = status === 'error';

  return (
    <section className="pt-[120px] pb-[70px] lg:pt-[180px] lg:pb-[100px]">
      <div className="main-container">
        <div className="mx-auto w-full max-w-[400px] lg:max-w-[930px]">
          <div className="flex items-center overflow-hidden rounded-[20px] bg-white py-2.5 pr-2.5 md:rounded-4xl lg:gap-16 dark:bg-black">
            <RevealAnimation delay={0.1}>
              <div className="w-full px-8 py-14 lg:max-w-[400px]">
                <form method="post" action="/talent/signup">
                  {refCode && <input type="hidden" name="ref_code" value={refCode} />}
                  {success && (
                    <div className="mb-4 rounded-xl border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-800 dark:border-green-700 dark:bg-green-950/30 dark:text-green-200">
                      Account created successfully. You can now log in.
                    </div>
                  )}
                  {error && (
                    <div className="mb-4 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-700 dark:bg-red-950/30 dark:text-red-200">
                      Could not create account. Please check your details and try again.
                    </div>
                  )}
                  <fieldset className="mb-4 space-y-2">
                    <label
                      htmlFor="username"
                      className="text-tagline-2 text-secondary dark:text-accent block font-medium select-none">
                      Username
                    </label>
                    <input type="text" id="username" name="username" className="auth-form-input" placeholder="Your name" required />
                  </fieldset>
                  <fieldset className="mb-4 space-y-2">
                    <label
                      htmlFor="email"
                      className="text-tagline-2 text-secondary dark:text-accent block font-medium select-none">
                      Your email
                    </label>
                    <input type="email" id="email" name="email" className="auth-form-input" placeholder="Email address" required />
                  </fieldset>
                  <fieldset className="mb-4 space-y-2">
                    <label
                      htmlFor="password"
                      className="text-tagline-2 text-secondary dark:text-accent block font-medium select-none">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="auth-form-input"
                      placeholder="At least 10 characters"
                      minLength={10}
                      required
                    />
                  </fieldset>
                  <fieldset className="mb-8 space-y-2">
                    <label
                      htmlFor="confirm-password"
                      className="text-tagline-2 text-secondary dark:text-accent block font-medium select-none">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      name="confirm_password"
                      className="auth-form-input"
                      placeholder="Re-enter your password"
                      minLength={10}
                      required
                    />
                  </fieldset>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-md btn-primary hover:btn-secondary dark:hover:btn-accent w-full first-letter:uppercase before:content-none">
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="py-8 text-center">
                  <p className="text-tagline-2 text-secondary dark:text-accent font-normal">Or</p>
                </div>
                <div>
                  <SocialAuthV2 />
                </div>
                <p className="text-tagline-2 text-secondary dark:text-accent mt-6 text-center font-normal">
                  Already have an account?{' '}
                  <Link href="/login" className="text-tagline-1 footer-link-v2 font-medium">
                    Log in
                  </Link>
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.2} direction="up">
              <div className="hidden lg:block">
                <figure className="h-[665px] w-full max-w-[456px] overflow-hidden rounded-[20px]">
                  <Image src={SignupBgImage} alt="login-bg" className="size-full object-cover" />
                </figure>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

SignupHero.displayName = 'SignupHero';
export default SignupHero;

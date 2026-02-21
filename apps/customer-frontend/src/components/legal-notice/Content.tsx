import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

// legal notice content
const Content = () => {
  return (
    <section className="xl:pb-28 lg:pb-20 pb-16">
      <div className="main-container">
        <div className="max-w-[950px] mx-auto w-full">
          <RevealAnimation delay={0.1}>
            <div className="py-8 space-y-3">
              <h2 className="text-heading-4 font-normal">Publisher:</h2>
              <p>
                The{' '}
                <Link href="/" className="text-primary-500">
                  https://www.nextsaas.ai
                </Link>{' '}
                website is published by: <br />
                NextSaaS is registered in the Trade and Companies Register under number 000000000. <br />
                Registered office: 45 Innovation Avenue, Level 3 – San Francisco, CA 94107, USA <br />
                Intracommunity VAT number: US000000000 <br />
                E-mail address:
                <a href="mailto:contact@nextsaas.ai" className="text-primary-500">
                  contact@nextsaas.ai
                </a>
              </p>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <div className="py-8 space-y-3">
              <h2 className="text-heading-4 font-normal">Director of publication :</h2>
              <p>Mr. Alex Turner, Chief Executive Officer</p>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <div className="py-8 space-y-3">
              <h2 className="text-heading-4 font-normal">Hosting provider:</h2>
              <p>
                The{' '}
                <Link href="/" className="text-primary-500">
                  https://www.nextsaas.ai
                </Link>
                <br />
                website is hosted by: Vercel, Inc. <br />
                Headquarters: 440 N Barranca Ave #4133, Covina, CA 91723, USA
                <br />
                Email:
                <a href="mailto:support@vercel.com" className="text-primary-500">
                  support@vercel.com
                </a>
              </p>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.4}>
            <div className="py-8 space-y-3">
              <h2 className="text-heading-4 font-normal">Development:</h2>
              <p>
                This website has been designed and developed by NextSaaS Design Studio. <br />
                Website:{' '}
                <Link href="/" className="text-primary-500">
                  https://www.nextsaas.design
                </Link>
              </p>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

Content.displayName = 'Content';
export default Content;

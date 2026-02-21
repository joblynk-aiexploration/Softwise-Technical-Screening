import integrationImgOne from '@public/images/ns-img-57.png';
import integrationImgTwo from '@public/images/ns-img-58.svg';
import integrationImgThree from '@public/images/ns-img-59.svg';
import integrationImgOneDark from '@public/images/ns-img-dark-35.png';
import integrationImgTwoDark from '@public/images/ns-img-dark-36.svg';
import integrationImgThreeDark from '@public/images/ns-img-dark-37.svg';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

const integrationFeatures = [
  {
    id: 1,
    text: 'On Demand Support',
    delay: 0.6,
  },
  {
    id: 2,
    text: 'Information Sharing',
    delay: 0.7,
  },
  {
    id: 3,
    text: 'Cloud Technology',
    delay: 0.8,
  },
];

const Integration = () => {
  return (
    <section className="dark:bg-background-7 bg-white pt-[50px] pb-[50px] md:pt-[75px] md:pb-[75px] lg:pt-[100px] lg:pb-[100px]">
      <div className="main-container">
        <div className="grid grid-cols-12 items-center gap-y-16 lg:gap-20 xl:gap-[100px]">
          <div className="col-span-12 pt-[100px] lg:col-span-6 lg:pt-[150px]">
            <div className="relative z-10 inline-block max-lg:left-1/2 max-lg:-translate-x-1/2">
              <RevealAnimation delay={0.2} direction="left" offset={100}>
                <figure className="max-w-[358px] rounded-[20px]">
                  <Image
                    src={integrationImgOne}
                    alt="about-data-integration"
                    className="size-full rounded-[20px] object-cover dark:hidden"
                  />
                  <Image
                    src={integrationImgOneDark}
                    alt="about-data-integration"
                    className="hidden size-full rounded-[20px] object-cover dark:inline-block"
                  />
                </figure>
              </RevealAnimation>
              <RevealAnimation delay={0.3} direction="right">
                <figure className="absolute -top-12 -right-14 overflow-hidden rounded-2xl max-sm:w-[200px] sm:-top-[90px] sm:-right-[200px] md:-right-[150px] md:w-[250px] lg:-right-[150px] lg:w-[260px] xl:-right-[200px] xl:w-auto">
                  <Image
                    src={integrationImgTwo}
                    alt="about-data-integration"
                    className="block size-full object-cover dark:hidden"
                  />
                  <Image
                    src={integrationImgTwoDark}
                    alt="about-data"
                    className="hidden size-full object-cover dark:block"
                  />
                </figure>
              </RevealAnimation>
              <RevealAnimation delay={0.4} direction="right">
                <figure className="absolute -right-14 bottom-12 -z-10 overflow-hidden rounded-2xl max-sm:w-[130px] sm:-right-[200px] sm:bottom-[85px] md:-right-[150px] lg:-right-[150px] xl:-right-[200px]">
                  <Image
                    src={integrationImgThree}
                    alt="about-data-integration"
                    className="block size-full object-cover dark:hidden"
                  />
                  <Image
                    src={integrationImgThreeDark}
                    alt="about-data-integration"
                    className="hidden size-full object-cover dark:inline-block"
                  />
                </figure>
              </RevealAnimation>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-3 text-center lg:text-left">
              <RevealAnimation delay={0.3}>
                <span className="badge badge-cyan">Data integrations</span>
              </RevealAnimation>
              <RevealAnimation delay={0.4}>
                <h2 className="mx-auto w-full max-w-[592px] lg:mx-0">
                  A clear vision is essential for understanding wealth dynamics.
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={0.5}>
                <p className="mx-auto w-full max-w-[450px] lg:mx-0 lg:max-w-[592px]">
                  A clear vision is essential for understanding wealth dynamics because it provides direction, purpose,
                  and clarity in navigating financial growth and sustainability.
                </p>
              </RevealAnimation>
            </div>
            <div className="pt-8 pb-14">
              <ul className="flex flex-wrap items-center justify-center gap-4 lg:justify-start xl:gap-6">
                {integrationFeatures.map((feature) => (
                  <RevealAnimation key={feature.id} delay={feature.delay}>
                    <li className="flex items-center gap-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={15}
                          height={11}
                          viewBox="0 0 15 11"
                          fill="none"
                          className="shrink-0">
                          <path
                            d="M13.1875 1.79102L5.3125 9.66567L1.375 5.72852"
                            className="stroke-secondary dark:stroke-accent"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="lg:text-tagline-1 text-tagline-2 text-secondary dark:text-accent/60 font-medium">
                        {feature.text}
                      </span>
                    </li>
                  </RevealAnimation>
                ))}
              </ul>
            </div>
            <RevealAnimation delay={0.8}>
              <div className="text-center lg:text-left">
                <LinkButton
                  href="/integration"
                  className="btn btn-primary hover:btn-secondary btn-xl dark:hover:btn-accent max-[426px]:w-[87%] max-[376px]:w-full md:w-auto">
                  Start your journey
                </LinkButton>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integration;

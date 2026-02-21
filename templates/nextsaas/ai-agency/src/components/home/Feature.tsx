import feature1 from '@public/images/ns-img-175.png';
import feature2 from '@public/images/ns-img-176.png';
import feature3 from '@public/images/ns-img-177.png';
import feature4 from '@public/images/ns-img-178.png';
import feature1Dark from '@public/images/ns-img-dark-119.png';
import feature2Dark from '@public/images/ns-img-dark-120.png';
import feature3Dark from '@public/images/ns-img-dark-121.png';
import feature4Dark from '@public/images/ns-img-dark-122.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';

const Feature = () => {
  return (
    <section className="bg-white pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-[90px] lg:pb-[90px] xl:pt-[100px] xl:pb-[100px] dark:bg-black">
      <div className="main-container">
        <div className="mx-auto mb-10 max-w-[750px] space-y-5 text-center md:mb-[70px]">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-green">Features</span>
          </RevealAnimation>
          <div>
            <RevealAnimation delay={0.3}>
              <h2 className="mb-3">Automation that fits your needs.</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.4}>
              <p className="text-secondary/60 dark:text-accent/60 mx-auto max-w-[600px]">
                Powerful tools to streamline operations and boost efficiency. Automate tasks with NextSaaS and focus on
                what matters.
              </p>
            </RevealAnimation>
          </div>
        </div>
        {/* feature Items */}
        <div className="mb-10 grid grid-cols-12 space-y-8 md:gap-8 md:space-y-0 xl:mb-18">
          <RevealAnimation delay={0.5}>
            <div className="bg-background-3 dark:bg-background-7 col-span-12 space-y-6 rounded-[20px] p-8 md:col-span-6 lg:col-span-8">
              <div className="space-y-2">
                <h5 className="max-sm:text-heading-6">Smart analytics with real-time insights.</h5>
                <p className="max-w-[450px]">
                  Stay in the loop and make better choices with awesome, built-in analytics that give you real-time
                  insights.
                </p>
              </div>
              <figure className="w-full">
                <Image
                  src={feature1}
                  alt="feature image"
                  className="hidden w-full rounded-2xl object-cover dark:block"
                />
                <Image
                  src={feature1Dark}
                  alt="feature image"
                  className="block w-full rounded-2xl object-cover dark:hidden"
                />
              </figure>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.6}>
            <div className="bg-background-3 dark:bg-background-7 col-span-12 space-y-6 rounded-[20px] p-8 md:col-span-6 lg:col-span-4">
              <div className="space-y-2">
                <h5 className="max-sm:text-heading-6">Seamless system integrations.</h5>
                <p className="max-w-[220px]">Want it even shorter? Here’s a super chill version!</p>
              </div>
              <figure className="w-full">
                <Image
                  src={feature2}
                  alt="feature image"
                  className="block w-full rounded-2xl object-cover dark:hidden"
                />
                <Image
                  src={feature2Dark}
                  alt="feature image"
                  className="hidden w-full rounded-2xl object-cover dark:block"
                />
              </figure>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.7}>
            <div className="bg-background-3 dark:bg-background-7 col-span-12 space-y-6 rounded-[20px] p-8 md:col-span-6 lg:col-span-4">
              <div className="space-y-2">
                <h5 className="max-sm:text-heading-6">Clear dashboards for visibility.</h5>
                <p className="">Track everything at a glance with clean, easy-to-use dashboards.</p>
              </div>
              <figure className="w-full">
                <Image
                  src={feature3}
                  alt="feature image"
                  className="block w-full rounded-2xl object-cover dark:hidden"
                />
                <Image
                  src={feature3Dark}
                  alt="feature image"
                  className="hidden w-full rounded-2xl object-cover dark:block"
                />
              </figure>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.8}>
            <div className="bg-background-3 dark:bg-background-7 col-span-12 space-y-6 rounded-[20px] p-8 md:col-span-6 lg:col-span-8">
              <div className="max-w-[285px] space-y-2">
                <h5 className="max-sm:text-heading-6">Durable, secure platforms.</h5>
                <p className="max-w-[311px]">
                  Grow with confidence on a platform that&apos;s secure, stable, and built for the future.
                </p>
              </div>
              <figure className="w-full">
                <Image
                  src={feature4}
                  alt="feature image"
                  className="block h-full w-full rounded-2xl object-cover dark:hidden"
                />
                <Image
                  src={feature4Dark}
                  alt="feature image"
                  className="hidden h-full w-full rounded-2xl object-cover dark:block"
                />
              </figure>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Feature;

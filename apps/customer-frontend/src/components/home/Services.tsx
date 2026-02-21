import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

const Services = () => {
  return (
    <section className="bg-[url('/images/ns-img-169.png')] bg-cover bg-top bg-no-repeat pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-[90px] lg:pb-[90px] xl:pt-[100px] xl:pb-[100px]">
      <div className="main-container">
        <div className="mx-auto mb-14 max-w-[750px] space-y-5 text-center">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-green">Services</span>
          </RevealAnimation>
          <div>
            <RevealAnimation delay={0.3}>
              <h2 className="mb-3">AI services that deliver real results.</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.4}>
              <p className="mx-auto max-w-[600px]">
                From consulting to implementation, our solutions are built to transform the way you work.
              </p>
            </RevealAnimation>
          </div>
        </div>
        {/* feature Items */}
        <div className="mx-auto mb-10 grid max-w-[1010px] grid-cols-12 space-y-8 md:gap-8 md:space-y-0 lg:mb-18">
          <RevealAnimation delay={0.5}>
            <div className="dark:bg-background-6 col-span-12 space-y-6 rounded-[20px] bg-white p-8 sm:min-h-[288px] md:col-span-6 lg:col-span-7">
              <div className="w-full">
                <span className="ns-shape-8 text-secondary dark:text-accent text-[52px]" />
              </div>
              <div className="space-y-2">
                <h5 className="max-sm:text-heading-6">Real-time data analytics and visualization.</h5>
                <p className="max-w-[430px]">
                  Speed up your journey with real-time data analytics to bring your ideas to life and make informed
                  decisions.
                </p>
              </div>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.6}>
            <div className="dark:bg-background-6 col-span-12 space-y-6 rounded-[20px] bg-white p-8 sm:min-h-[288px] md:col-span-6 lg:col-span-5">
              <div className="w-full">
                <span className="ns-shape-35 text-secondary dark:text-accent text-[52px]" />
              </div>
              <div className="space-y-2">
                <h5 className="max-sm:text-heading-6">AI-powered apps.</h5>
                <p>Use AI applications to boost workflow automation and improve efficiency.</p>
              </div>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.7}>
            <div className="dark:bg-background-6 col-span-12 space-y-6 rounded-[20px] bg-white p-8 sm:min-h-[288px] md:col-span-6 lg:col-span-5">
              <div className="w-full">
                <span className="ns-shape-41 text-secondary dark:text-accent text-[52px]" />
              </div>
              <div className="space-y-2">
                <h5 className="max-sm:text-heading-6">End-to-end AI consulting.</h5>
                <p className="max-w-[430px]">
                  Discover your business&apos;s potential with our AI consulting services.
                </p>
              </div>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.8}>
            <div className="dark:bg-background-6 col-span-12 space-y-6 rounded-[20px] bg-white p-8 sm:min-h-[288px] md:col-span-6 lg:col-span-7">
              <div className="w-full">
                <span className="ns-shape-19 text-secondary dark:text-accent text-[52px]" />
              </div>
              <div className="space-y-2">
                <h5 className="max-sm:text-heading-6">Machine learning model development.</h5>
                <p className="max-w-[430px]">
                  Quickly develop tools, platforms, and educational applications for machine learning model creation.
                </p>
              </div>
            </div>
          </RevealAnimation>
        </div>
        <RevealAnimation delay={0.9}>
          <div className="flex items-center justify-center">
            <LinkButton
              href="/contact-us"
              className="btn btn-secondary hover:btn-primary dark:btn-transparent dark:border-primary-50 btn-md mx-auto w-[85%] md:w-auto">
              Talk to an expert
            </LinkButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Services;

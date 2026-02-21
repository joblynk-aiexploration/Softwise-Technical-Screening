import vision1Img from '@public/images/ns-img-353.png';
import vision2Img from '@public/images/ns-img-354.png';
import vision3Img from '@public/images/ns-img-355.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';

const VisionStatement = () => {
  return (
    <section className="pt-32 pb-14 sm:pt-36 md:pt-42 md:pb-16 lg:pb-[88px] xl:pt-[180px] xl:pb-[100px]">
      <div className="main-container space-y-14 md:space-y-[70px]">
        <div className="mx-auto max-w-[780px] space-y-3 text-center">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-cyan mb-5">Passion meets purpose</span>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <h2>JobLynk is helping hiring teams build faster, fairer, and more consistent recruiting pipelines.</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.4}>
            <p>
              We combine AI interview automation, structured candidate evaluation, and recruiter-first workflows to help
              organizations reduce time-to-hire, improve hiring quality, and deliver a better candidate experience.
            </p>
          </RevealAnimation>
        </div>
        <article className="grid grid-cols-12 justify-center gap-x-8 gap-y-8">
          <div className="col-span-12 space-y-8 md:col-span-6">
            <RevealAnimation delay={0.5} instant>
              <figure className="max-w-[630px] overflow-hidden rounded-[20px]">
                <Image src={vision1Img} alt="vision-1" className="h-auto w-full" />
              </figure>
            </RevealAnimation>
            <RevealAnimation delay={0.6} instant>
              <figure className="max-w-[630px] overflow-hidden rounded-[20px]">
                <Image src={vision2Img} alt="vision-2" className="h-auto w-full" />
              </figure>
            </RevealAnimation>
          </div>
          <RevealAnimation delay={0.7} instant>
            <figure className="col-span-12 max-w-[630px] overflow-hidden rounded-[20px] md:col-span-6">
              <Image src={vision3Img} alt="vision-3" className="h-auto w-full" />
            </figure>
          </RevealAnimation>
        </article>
      </div>
    </section>
  );
};

VisionStatement.displayName = 'VisionStatement';
export default VisionStatement;

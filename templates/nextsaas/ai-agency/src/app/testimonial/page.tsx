import CTA from '@/components/shared/cta/CTA';
import Experience from '@/components/testimonial/Experience';
import Integration from '@/components/testimonial/Integration';
import TestimonialMarquee from '@/components/testimonial/TestimonialMarquee';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Testimonial - AI Agency || NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <TestimonialMarquee />
      <Experience />
      <Integration />
      <CTA
        className="dark:bg-background-6 bg-white"
        badgeClass="badge-cyan"
        badgeText="Get started"
        ctaHeading="Build a complete website using the"
        spanText="assistance"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        ctaBtnText="Get started"
        btnClass="hover:btn-secondary dark:hover:btn-accent"
      />
    </main>
  );
};
export default page;

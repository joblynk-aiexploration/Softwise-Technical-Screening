import Feature from '@/components/features/Feature';
import Features from '@/components/features/Features';
import WhyChooseUs from '@/components/features/WhyChooseUs';
import CTA from '@/components/shared/cta/CTA';
import Reviews from '@/components/shared/reviews/Reviews';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'JobLynk Features | AI Interview Automation & Hiring Analytics',
  description:
    'Explore JobLynk features including AI voice screening, candidate scoring, recruiter collaboration, workflow automation, and hiring analytics dashboards.',
};

const page = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <Features />
      <Feature />
      <WhyChooseUs />
      <Reviews />
      <CTA
        className="dark:bg-background-6 bg-white"
        badgeClass="hidden"
        ctaHeading="See how JobLynk features fit your"
        spanText="hiring workflow"
        description="Book a live demo to evaluate AI screening, scoring, recruiter collaboration, and reporting features for your team."
        btnClass="hover:btn-secondary dark:hover:btn-accent"
        ctaBtnText="Book a demo"
      />
    </main>
  );
};

export default page;

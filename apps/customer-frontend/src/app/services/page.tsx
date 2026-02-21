import Features from '@/components/services/Features';
import Pricing from '@/components/services/Pricing';
import Services from '@/components/services/Services';
import Solutions from '@/components/services/Solutions';
import CTA from '@/components/shared/cta/CTA';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Hiring Services & Interview Automation | JobLynk Talent',
  description:
    'Explore JobLynk services for AI candidate screening, interview automation, ATS integrations, hiring analytics, and recruiting operations support built for modern talent teams.',
};

const page = () => {
  return (
    <main className="bg-background-1 dark:bg-background-6">
      <Services />
      <Features />
      <Solutions />
      <Pricing />
      <CTA
        className="dark:bg-background-6 bg-white"
        badgeClass="hidden"
        ctaHeading="Ready to modernize your hiring process with"
        spanText="JobLynk"
        description="Book a demo to see how JobLynk helps your team screen candidates faster, improve interview consistency, and make data-driven hiring decisions."
        btnClass="hover:btn-secondary dark:hover:btn-accent"
        ctaBtnText="Book a demo"
      />
    </main>
  );
};

export default page;

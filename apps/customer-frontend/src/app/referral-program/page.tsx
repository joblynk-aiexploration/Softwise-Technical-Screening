import FAQ from '@/components/referral-program/FAQ';
import Hero from '@/components/referral-program/Hero';
import Steps from '@/components/referral-program/Steps';
import ReferralDashboard from '@/components/referral-program/ReferralDashboard';
import Testimonial from '@/components/shared/testimonial/Testimonial';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Referral Program | Joblynk Talent',
};

const page = () => {
  return (
    <main className="dark:bg-secondary bg-white">
      <Hero />
      <ReferralDashboard />
      <Steps />
      <Testimonial />
      <FAQ />
    </main>
  );
};

export default page;

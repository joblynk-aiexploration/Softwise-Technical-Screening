import AboutCTA from '@/components/about/CTA';
import OurMission from '@/components/about/OurMission';
import OurSuccess from '@/components/about/OurSuccess';
import Team from '@/components/about/Team';
import VisionStatement from '@/components/about/VisionStatement';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import ReviewsV2 from '@/components/shared/reviews/ReviewsV2';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'About Us - AI Agency || NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <VisionStatement />
      <OurMission />
      <OurSuccess />
      <WhyChooseUs />
      <Team />
      <ReviewsV2 />
      <AboutCTA />
    </main>
  );
};

export default page;

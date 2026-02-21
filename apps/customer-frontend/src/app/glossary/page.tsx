import CardsShow from '@/components/glossary/CardsShow';
import Heading from '@/components/glossary/Heading';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Glossary | Joblynk Talent',
};

const page = () => {
  return (
    <main className="bg-background-2 dark:bg-background-7">
      <Heading />
      <CardsShow />
    </main>
  );
};

export default page;

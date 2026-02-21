import DetailsBody from '@/components/glossary-details/DetailBody';
import Hero from '@/components/glossary-details/hero';
import { GlossaryItem, GlossarySection } from '@/components/glossary/ShowGlossaryCards';
import glossaryData from '@/data/json/glossary/glossary.json';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Glossary Details - AI Agency || NextSaaS',
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  const singleGlossaryData = glossaryData.flatMap((sectionItem: GlossarySection) =>
    sectionItem.items.filter((item: GlossaryItem) => item.slug === slug),
  );

  const { title, description, longDescription } = singleGlossaryData[0];

  return (
    <main className="bg-background-2 dark:bg-background-7">
      <Hero title={title} description={description} />
      <DetailsBody title={title} longDescription={longDescription} />
    </main>
  );
};

export default page;

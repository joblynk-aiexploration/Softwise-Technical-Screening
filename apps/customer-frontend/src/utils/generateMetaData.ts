import type { Metadata } from 'next';

export const DEFAULT_URL = 'https://screening.joblynk.ai';
export const DEFAULT_TITLE = 'Joblynk Talent | AI-Powered Hiring & Voice Screening';
export const DEFAULT_DESCRIPTION =
  'Joblynk Talent helps recruiting teams screen faster with AI voice interviews, candidate workflows, and hiring automation in one platform.';
export const DEFAULT_IMAGE_URL = 'https://screening.joblynk.ai/images/joblynk-logo.svg';

const defaultMetadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Joblynk Talent',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'Joblynk',
    'Joblynk Talent',
    'AI recruiting',
    'voice screening',
    'candidate screening',
    'hiring automation',
  ],
  applicationName: 'Joblynk Talent',
  authors: [{ name: 'Joblynk' }],
  openGraph: {
    type: 'website',
    siteName: 'Joblynk Talent',
    url: DEFAULT_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const generateMetadata = (title?: string, description?: string, canonicaUrl?: string, imageUrl?: string): Metadata => {
  return {
    ...defaultMetadata,
    title: title ?? defaultMetadata.title,
    description: description ?? defaultMetadata.description,
    alternates: {
      canonical: canonicaUrl,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title ?? defaultMetadata.openGraph?.title,
      description: description ?? defaultMetadata.openGraph?.description,
      url: canonicaUrl ?? defaultMetadata.openGraph?.url,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title ?? defaultMetadata.twitter?.title,
      description: description ?? defaultMetadata.twitter?.description,
      images: imageUrl ? [imageUrl] : defaultMetadata.twitter?.images,
    },
  };
};

export { defaultMetadata, generateMetadata };

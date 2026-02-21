'use client';
import {
  AffiliatePolicyIcon,
  AnalyticsIcon,
  CaseStudyICon,
  ChangeLogIcon,
  DocsIcon,
  FaqIcon,
  GDPRIcon,
  GlossaryIcon,
  LegalNoticeIcon,
  PressIcon,
  PrivacyIcon,
  RefundPolicyIcon,
  SecurityIcon,
  SuccessIcon,
  SupportIcon,
  TutorialIcon,
  UseCaseIcon,
  WhitePaperIcon,
} from '@/icons/menu-icon';
import { cn } from '@/utils/cn';
import type { ComponentType } from 'react';
import ResourcesMenuLink from './ResourcesMenuLink';

type ResourceLink = {
  title: string;
  description?: string;
  href: string;
  icon: ComponentType;
};

type ResourceSection = {
  title: string;
  links: ResourceLink[];
  variant?: 'default' | 'compact';
};

const resourceSections: ResourceSection[] = [
  {
    title: 'Help & Documentation',
    links: [
      {
        title: 'Documentation',
        description: 'Detailed documentation of the product.',
        href: '/documentation',
        icon: DocsIcon,
      },
      {
        title: 'Tutorials',
        description: 'Step-by-step guides to help you get started.',
        href: '/tutorial',
        icon: TutorialIcon,
      },
      {
        title: 'FAQ',
        description: 'Frequently asked questions and answers.',
        href: '/faq',
        icon: FaqIcon,
      },
      {
        title: 'Case Studies',
        description: 'Real-world examples of how the product is used.',
        href: '/case-study',
        icon: CaseStudyICon,
      },
      {
        title: 'Whitepapers',
        description: 'Detailed whitepapers on the product.',
        href: '/whitepaper',
        icon: WhitePaperIcon,
      },
      {
        title: 'Support',
        description: 'Get help and support from our team.',
        href: '/support',
        icon: SupportIcon,
      },
    ],
  },
  {
    title: 'Knowledge & Research',
    links: [
      {
        title: 'Use Cases',
        description: 'Explore real-world scenarios where our web hosting delivers results.',
        href: '/use-case',
        icon: UseCaseIcon,
      },
      {
        title: 'Success Stories',
        description: 'Discover measurable outcomes achieved by clients.',
        href: '/success-stories',
        icon: SuccessIcon,
      },
      {
        title: 'Analytics',
        description: 'Dive into performance metrics and data insights.',
        href: '/analytics',
        icon: AnalyticsIcon,
      },
      {
        title: 'Changelog',
        description: 'Stay updated with the latest changes and improvements.',
        href: '/changelog',
        icon: ChangeLogIcon,
      },
      {
        title: 'Glossary',
        description: 'Terms and definitions.',
        href: '/glossary',
        icon: GlossaryIcon,
      },
    ],
  },
  {
    title: 'Trust & Compliance',
    variant: 'compact',
    links: [
      {
        title: 'Security',
        href: '/security',
        icon: SecurityIcon,
      },
      {
        title: 'GDPR Compliance',
        href: '/gdpr',
        icon: GDPRIcon,
      },
      {
        title: 'Privacy Policy',
        href: '/privacy-policy',
        icon: PrivacyIcon,
      },
      {
        title: 'Terms & Conditions',
        href: '/terms-conditions',
        icon: RefundPolicyIcon,
      },
      {
        title: 'Press Coverage',
        href: '/press',
        icon: PressIcon,
      },
      {
        title: 'Affiliate Policy',
        href: '/affiliate-policy',
        icon: AffiliatePolicyIcon,
      },
      {
        title: 'Legal',
        href: '/legal',
        icon: LegalNoticeIcon,
      },
    ],
  },
];

const ResourcesMenu = ({
  menuDropdownId,
  setMenuDropdownId,
}: {
  menuDropdownId: string | null;
  setMenuDropdownId: (id: string | null) => void;
}) => {
  const handleClose = () => setMenuDropdownId(null);
  return (
    <div>
      <div
        className={cn(
          'dropdown-menu-bridge pointer-events-none fixed top-full left-1/2 z-40 h-3 w-full -translate-x-1/2 bg-transparent opacity-0 lg:w-[1290px]',
          menuDropdownId === 'resources-mega-menu'
            ? '!pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      />
      <div
        id="resources-mega-menu"
        className={cn(
          'dropdown-menu dark:bg-background-6 border-stroke-1 dark:border-background-7 pointer-events-none fixed top-full left-1/2 z-50 mt-2 w-full -translate-x-1/2 rounded-[20px] border bg-white p-6 opacity-0 transition-all duration-300 lg:w-[1290px]',
          menuDropdownId === 'resources-mega-menu'
            ? '!pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2.5 opacity-0',
        )}>
        <div className="grid grid-cols-12 items-start gap-y-6 md:gap-x-12">
          {resourceSections.map((section) => (
            <div
              key={section.title}
              className={cn(
                'col-span-4',
                section.variant === 'compact' && 'bg-background-2 dark:bg-background-7 rounded-[10px] px-3 pb-3',
              )}>
              <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 p-3 font-medium">{section.title}</p>
              <ul>
                {section.links.map((link) => (
                  <ResourcesMenuLink key={link.title} {...link} variant={section.variant} onClose={handleClose} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ResourcesMenu.displayName = 'ResourcesMenu';
export default ResourcesMenu;

'use client';
import { CareerIcon, ContactIcon, CustomersIcon, ProcessICon, TeamIcon, TestimonialIcon } from '@/icons/menu-icon';
import { cn } from '@/utils/cn';
import type { ComponentType } from 'react';
import PeopleAndCultureMenuLink from './PeopleAndCultureMenuLink';

type PeopleAndCultureLink = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType;
};

const peopleAndCultureLinks: PeopleAndCultureLink[] = [
  {
    title: 'Process',
    description: 'Explore our process',
    href: '/process',
    icon: ProcessICon,
  },
  {
    title: 'Team',
    description: 'Meet our experts',
    href: '/team',
    icon: TeamIcon,
  },
  {
    title: 'Career',
    description: 'View job openings',
    href: '/career',
    icon: CareerIcon,
  },
  {
    title: 'Testimonial',
    description: 'Explore testimonials',
    href: '/testimonial',
    icon: TestimonialIcon,
  },
  {
    title: 'Customer',
    description: 'Plan, track, and deliver',
    href: '/customer',
    icon: CustomersIcon,
  },
  {
    title: 'Contact',
    description: 'Get support help',
    href: '/contact-us',
    icon: ContactIcon,
  },
];

const PeopleAndCultureMenu = ({
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
          'pointer-events-none absolute top-full left-1/2 z-40 h-3 w-full min-w-[320px] -translate-x-1/2 bg-transparent opacity-0',
          menuDropdownId === 'people-dropdown-menu'
            ? '!pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      />
      <ul
        id="people-dropdown-menu"
        className={cn(
          'dark:bg-background-6 shadow-14 border-stroke-1 dark:border-background- pointer-events-none absolute top-full left-1/2 z-50 mt-2 w-[320px] -translate-x-1/2 rounded-3xl border bg-white p-2 opacity-0 transition-all duration-300 dark:border-white/10',
          menuDropdownId === 'people-dropdown-menu'
            ? '!pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2.5 opacity-0',
        )}>
        {peopleAndCultureLinks.map((link) => (
          <PeopleAndCultureMenuLink key={link.title} {...link} onClose={handleClose} />
        ))}
      </ul>
    </div>
  );
};

PeopleAndCultureMenu.displayName = 'PeopleAndCultureMenu';
export default PeopleAndCultureMenu;

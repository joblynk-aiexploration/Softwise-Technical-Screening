'use client';
import type { ComponentType } from 'react';
import Link from 'next/link';
import HoverBgTransform from '../hover-bg-transform';

type PartnershipMenuLinkProps = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType;
  onClose?: () => void;
};

const PartnershipMenuLink = ({ title, description, href, icon: Icon, onClose }: PartnershipMenuLinkProps) => (
  <li>
    <Link
      href={href}
      onClick={onClose}
      className="group relative flex items-start gap-3 rounded-2xl p-3 transition-all duration-300">
      <HoverBgTransform className="group-hover:opacity-100" />
      <div className="dark:bg-background-6 shadow-14 border-stroke-1 dark:border-background-7 relative z-10 flex size-11 items-center justify-center rounded-[10px] border bg-white p-3">
        <Icon />
      </div>
      <div className="relative z-10">
        <p className="text-tagline-1 text-secondary dark:text-accent font-normal">{title}</p>
        <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 font-normal">{description}</p>
      </div>
    </Link>
  </li>
);

PartnershipMenuLink.displayName = 'PartnershipMenuLink';
export default PartnershipMenuLink;


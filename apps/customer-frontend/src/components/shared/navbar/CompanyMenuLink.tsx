'use client';
import type { ComponentType } from 'react';
import Link from 'next/link';
import HoverBgTransform from '../hover-bg-transform';

type CompanyMenuLinkProps = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType;
  onClose?: () => void;
};

const CompanyMenuLink = ({ title, description, href, icon: Icon, onClose }: CompanyMenuLinkProps) => (
  <li>
    <Link
      href={href}
      onClick={onClose}
      className="group relative flex items-start gap-3 rounded-[10px] p-3 transition-all duration-300">
      <HoverBgTransform className="group-hover:opacity-100" />
      <div className="relative z-10 mt-1">
        <Icon />
      </div>
      <div className="relative z-10 space-y-0.5">
        <p className="text-tagline-1 text-secondary dark:text-accent font-normal">{title}</p>
        <p className="text-tagline-3 text-secondary/60 dark:text-accent/60 font-normal">{description}</p>
      </div>
    </Link>
  </li>
);

CompanyMenuLink.displayName = 'CompanyMenuLink';
export default CompanyMenuLink;


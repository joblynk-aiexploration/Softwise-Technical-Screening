'use client';
import Link from 'next/link';
import type { ComponentType } from 'react';
import HoverBgTransform from '../hover-bg-transform';

type ResourcesMenuLinkProps = {
  title: string;
  description?: string;
  href: string;
  icon: ComponentType;
  onClose?: () => void;
  variant?: 'default' | 'compact';
};

const ResourcesMenuLink = ({
  title,
  description,
  href,
  icon: Icon,
  onClose,
  variant = 'default',
}: ResourcesMenuLinkProps) => {
  if (variant === 'compact') {
    return (
      <li>
        <Link onClick={onClose} href={href} className="group relative flex items-center gap-2 p-3">
          <HoverBgTransform className="group-hover:bg-background-4 dark:group-hover:bg-background-8 group-hover:opacity-100" />
          <div className="border-stroke-1 relative z-10 mt-1 flex size-7 shrink-0 items-center justify-center rounded-lg border p-1 dark:border-white/10">
            <Icon />
          </div>
          <div className="relative z-10">
            <p className="text-tagline-1 text-secondary dark:text-accent font-normal">{title}</p>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} onClick={onClose} className="group relative flex items-start gap-2 p-3">
        <HoverBgTransform className="group-hover:opacity-100" />
        <div className="border-stroke-1 relative z-10 mt-1 flex size-7 shrink-0 items-center justify-center rounded-lg border p-1 dark:border-white/10">
          <Icon />
        </div>
        <div className="relative z-10">
          <p className="text-tagline-1 text-secondary dark:text-accent font-normal">{title}</p>
          {description && (
            <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 font-normal">{description}</p>
          )}
        </div>
      </Link>
    </li>
  );
};

ResourcesMenuLink.displayName = 'ResourcesMenuLink';
export default ResourcesMenuLink;

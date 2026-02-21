'use client';

import { CheckIcon } from '@/icons';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useState } from 'react';
import RevealAnimation from '../animation/RevealAnimation';

interface PricingFeature {
  id: string;
  text: string;
  isActive: boolean;
}

interface PricingCard {
  id: string;
  title: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  isFeatured: boolean;
  features: PricingFeature[];
}

const pricingData: PricingCard[] = [
  {
    id: 'starter',
    title: 'Starter',
    description: 'Best for growing teams that need structured screening and faster shortlisting.',
    monthlyPrice: '49.00',
    yearlyPrice: '470.00',
    isFeatured: false,
    features: [
      { id: 'voice-screening', text: 'AI voice screening interviews', isActive: true },
      { id: 'candidate-notes', text: 'Candidate notes and scorecards', isActive: true },
      { id: 'team-collab', text: 'Team collaboration workflows', isActive: false },
    ],
  },
  {
    id: 'growth',
    title: 'Growth',
    description: 'For hiring teams running multi-role pipelines and high applicant volumes.',
    monthlyPrice: '129.00',
    yearlyPrice: '1238.00',
    isFeatured: true,
    features: [
      { id: 'unlimited-interviews', text: 'High-volume interview automation', isActive: true },
      { id: 'analytics', text: 'Hiring analytics and funnel tracking', isActive: true },
      { id: 'integrations', text: 'ATS and webhook integrations', isActive: true },
      { id: 'priority-support', text: 'Priority onboarding support', isActive: true },
      { id: 'sso', text: 'Single Sign-On (SSO)', isActive: false },
      { id: 'custom-sla', text: 'Custom enterprise SLA', isActive: false },
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    description: 'For organizations needing compliance controls, custom workflows, and scale.',
    monthlyPrice: '299.00',
    yearlyPrice: '2870.00',
    isFeatured: false,
    features: [
      { id: 'compliance', text: 'Advanced compliance and audit logs', isActive: true },
      { id: 'workflow-custom', text: 'Custom interview workflow design', isActive: true },
      { id: 'dedicated-manager', text: 'Dedicated customer success manager', isActive: true },
    ],
  },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <section className="relative overflow-hidden py-24 xl:py-[200px]">
      <div className="main-container space-y-[70px]">
        <div className="flex flex-col items-center text-center">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-yellow-v2 mb-5">Our Pricing</span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2 className="mx-auto mb-8 max-w-[650px]">Choose a JobLynk plan that matches your hiring goals and growth stage.</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <div className="dark:bg-background-7 relative rounded-[160px] bg-white px-14 py-6">
              <RevealAnimation delay={1} duration={1} direction="up" offset={200}>
                <span className="bg-secondary dark:bg-accent text-accent dark:text-secondary text-tagline-2 absolute -top-2.5 -right-6 z-11 inline-block w-[90px] rotate-[20deg] rounded-[36px] px-3.5 py-1.5 font-normal capitalize shadow-xs">
                  save 40%
                </span>
              </RevealAnimation>
              <label className="relative z-[10] inline-flex cursor-pointer items-center">
                <span className="text-secondary dark:text-accent mr-2.5 text-base font-normal">Monthly</span>
                <input
                  type="checkbox"
                  id="priceCheck"
                  checked={isAnnual}
                  onChange={(e) => setIsAnnual(e.target.checked)}
                  className="peer sr-only"
                  aria-label="Toggle between monthly and yearly pricing"
                />
                <span className="bg-secondary after:bg-accent dark:border-accent relative h-[28px] w-13 rounded-[34px] after:absolute after:start-[2px] after:top-1/2 after:h-6 after:w-6 after:-translate-y-1/2 after:rounded-full after:transition-all after:content-[''] peer-checked:after:start-[2px] peer-checked:after:translate-x-[99%] dark:border" />
                <span className="text-secondary dark:text-accent ms-2.5 text-base font-normal">Yearly</span>
              </label>
            </div>
          </RevealAnimation>
        </div>
        <div className="relative">
          <div className="flex items-center gap-8 max-lg:flex-col">
            {pricingData.map((card, index) => (
              <RevealAnimation key={card.id} delay={0.4 + index * 0.2}>
                <div
                  className={cn(
                    'flex-1 rounded-[20px] max-lg:w-full',
                    card.isFeatured
                      ? "bg-[url('/images/ns-img-25.png')] bg-cover bg-center bg-no-repeat p-2.5"
                      : 'bg-background-3 dark:bg-background-7 w-full max-w-full p-8 lg:max-w-[420px]',
                  )}>
                  <div className={cn(card.isFeatured && 'rounded-xl bg-white p-8 dark:bg-black')}>
                    <h3 className={cn('text-heading-5 font-normal', card.isFeatured ? 'mb-2.5' : 'mb-2')}>
                      {card.title}
                    </h3>
                    <p className="mb-6 max-w-[250px]">{card.description}</p>
                    <div className="price-month mb-7">
                      <h4 className="text-heading-4 font-normal">
                        $<span>{isAnnual ? card.yearlyPrice : card.monthlyPrice}</span>
                      </h4>
                      <p className="text-secondary dark:text-accent">{isAnnual ? 'Per Year' : 'Per Month'}</p>
                    </div>

                    <Link
                      href="/contact-us"
                      className={cn(
                        'btn btn-md mb-8 block w-full text-center first-letter:uppercase before:content-none',
                        card.isFeatured
                          ? 'btn-secondary dark:btn-accent hover:btn-primary'
                          : 'btn-white dark:btn-white-dark hover:btn-secondary dark:hover:btn-accent',
                      )}>
    Talk to sales
                    </Link>
                    <ul className="relative list-none space-y-2.5">
                      {card.features.map((feature) => {
                        return (
                          <li key={feature.id} className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                'size-5 rounded-full',
                                feature.isActive ? 'bg-secondary dark:bg-accent' : 'dark:bg-background-9 bg-white',
                              )}>
                              <CheckIcon
                                className={cn(
                                  feature.isActive
                                    ? 'dark:fill-secondary fill-white'
                                    : 'fill-secondary/60 dark:fill-accent/60',
                                )}
                              />
                            </span>
                            <span
                              className={cn(
                                'text-tagline-1 font-normal',
                                feature.isActive
                                  ? 'text-secondary dark:text-accent'
                                  : 'text-secondary/60 dark:text-accent/60',
                              )}>
                              {feature.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

import React from 'react';
import { Button } from './button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';
import { Check } from 'lucide-react';

interface PricingPlan {
  title: string;
  popular: number;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingPlan[] = [
  {
    title: 'Lite',
    popular: 0,
    monthlyPrice: '$0',
    yearlyPrice: '$0',
    description:
      'Just using this for yourself? Lite is the way to go for the platform.',
    buttonText: 'Select Lite',
    benefitList: [
      'Unlimited chats/day',
      '0.5% per transaction',
      'Limited Integrations',
    ],
  },
  {
    title: 'Pro',
    popular: 1,
    monthlyPrice: '$X',
    yearlyPrice: '$X',
    description: 'Coming Soon!!!',
    buttonText: 'Coming Soon!!!',
    benefitList: [
      'Everything in Lite',
      'Transaction Bundles',
      'Advanced Market Analysis',
      'More!!!',
    ],
  },
  {
    title: 'Master',
    popular: 0,
    monthlyPrice: '$X',
    yearlyPrice: '$X',
    description: 'Coming Soon!!!',
    buttonText: 'Coming Soon!!!',
    benefitList: [
      'Everything in Pro',
      'AI launchpad',
      'Token Sniper',
      'Pro Tools & Alerts',
      'More!!!',
    ],
  },
];

export const Pricing: React.FC = () => {
  const handleSelectPlan = (plan: string) => {
    `Selected plan: ${plan}`;
  };

  return (
    <section id='pricing' className='container py-5 sm:py-10'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
          Choose Your{' '}
          <span className='text-transparent bg-gradient-to-r from-[#008080] to-[#ff9500] bg-clip-text'>
            Plan
          </span>
        </h2>
        <p className='text-gray-600 mt-4'>
          Select the perfect plan for your trading needs
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {pricingList.map((pricing) => (
          <Card
            key={pricing.title}
            className='bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow'
          >
            <CardHeader>
              <CardTitle className='text-xl font-bold text-gray-900'>
                {pricing.title}
              </CardTitle>
              <CardDescription className='text-gray-600'>
                {pricing.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                onClick={() => handleSelectPlan(pricing.title)}
                className='w-full bg-gradient-to-r from-[#008080] to-[#ff9500] text-white hover:opacity-90'
                disabled={pricing.buttonText
                  .toLowerCase()
                  .includes('coming soon')}
              >
                {pricing.buttonText}
              </Button>
            </CardContent>

            <hr className='w-4/5 m-auto mb-4 border-gray-200' />

            <CardFooter className='flex'>
              <div className='space-y-4'>
                {pricing.benefitList.map((benefit) => (
                  <span key={benefit} className='flex'>
                    <Check className='text-[#008080]' />
                    <h3 className='ml-2 text-gray-700'>{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

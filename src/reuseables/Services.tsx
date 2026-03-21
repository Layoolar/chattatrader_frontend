import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';
import { Card, CardDescription, CardHeader, CardTitle } from './Card';
import { AddAccountIcon, CreditCardIcon, CubeIcon } from '../data/Icons';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const serviceList: Service[] = [
  {
    title: 'Create Your Account',
    description: 'Your account and personal identity are guaranteed safe.',
    icon: <AddAccountIcon />,
  },
  {
    title: 'Fund Your Wallet',
    description: 'Send in native tokens or use our buy feature.',
    icon: <CreditCardIcon />,
  },
  {
    title: 'Start Build Portfolio',
    description: 'Buy and sell any token by chatting or speaking.',
    icon: <CubeIcon />,
  },
];

export const Services: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = (): void => {
    navigate('/sign-up');
  };

  return (
    <section className='py-5 sm:py-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center'>
        <div className='text-center lg:text-start space-y-6'>
          <main className='py-10 leading-7'>
            {' '}
            <h1 className='text-3xl font-bold text-gray-900 mb-4 md:text-4xl lg:text-5xl inline py-10'>
              <span className='inline text-transparent bg-gradient-to-r from-[#008080] to-[#ff9500] bg-clip-text my-5'>
                How To Get Started
              </span>
            </h1>
          </main>
          <p className='text-base md:text-lg text-gray-600 md:w-10/12 mx-auto lg:mx-0'>
            Simple and easy way to start your investment in cryptocurrency
          </p>

          <div className='space-y-4 md:space-y-0 md:space-x-4'>
            <Button
              className='w-full md:w-1/3 bg-gradient-to-r from-[#008080] to-[#ff9500] text-white hover:opacity-90'
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>

        <div>
          <div className='flex flex-col gap-8'>
            {serviceList.map(({ icon, title, description }) => (
              <Card
                key={title}
                className='bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow'
              >
                <CardHeader className='space-y-1 flex md:flex-row justify-start items-start gap-4'>
                  <div className='mt-1 bg-gray-50 p-1 rounded-2xl'>{icon}</div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className='text-md mt-2 text-gray-600'>
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

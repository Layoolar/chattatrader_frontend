import React from 'react';
import { Button } from './button';

export const Cta: React.FC = () => {
  return (
    <section id='cta' className='bg-gray-50 py-12'>
      <div className='lg:grid lg:grid-cols-2 gap-8 place-items-center'>
        <div className='lg:col-start-1'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8'>
            New in
            <span className='text-transparent bg-gradient-to-r from-[#008080] to-[#ff9500] bg-clip-text'>
              {' '}
              Cryptocurrency?{' '}
            </span>
          </h2>
          <p className='text-base sm:text-lg text-gray-600 mt-4 mb-8 lg:mb-0'>
            We'll show you what crypto is, how it works, and how you can start
            trading effortlessly with ChattaTrader. No complex charts—just chat,
            trade, and go. Let's get started!
          </p>
        </div>

        <div className='space-y-4 lg:col-start-2'>
          <Button
            variant='outline'
            className='w-full md:w-auto border text-[#ff9500] bg-white hover:text-white hover:bg-[#ff9500] transition-colors'
          >
            View all features
          </Button>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Statistics } from './Statistics';
import pilot from '../assets/pilot.png';

export const About: React.FC = () => {
  return (
    <section id='about' className='py-8'>
      <div className='bg-gray-50 border border-gray-100 rounded-lg p-8'>
        <div className='flex flex-col-reverse md:flex-row gap-8'>
          <img
            src={pilot}
            alt='Pilot Illustration'
            className='w-[300px] object-contain rounded-lg'
          />
          <div className='flex flex-col justify-between'>
            <div className='space-y-4'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900'>
                <span className='text-transparent bg-gradient-to-r from-[#008080] to-[#ff9500] bg-clip-text'>
                  About
                </span>{' '}
                The Company
              </h2>
              <p className='text-base sm:text-lg text-gray-600'>
                ChattaTrader makes DeFi trading effortless. Swap tokens, place
                limit orders, and execute trades across several blockchains
                using text, voice, or images—no complex charts or jargon.
                Whether you're a beginner or an expert, ChattaTrader breaks
                technical and language barriers, making crypto accessible to
                all.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};

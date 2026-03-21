import React from 'react';
import { Button } from './button';
import heroImg from '../assets/hero.png';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUpClick = (): void => {
    navigate('/sign-up');
  };

  const handleExploreFeaturesClick = (): void => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#features');
    }
  };

  return (
    <section className='grid lg:grid-cols-2 place-items-center py-8 gap-8'>
      <div className='text-center lg:text-start space-y-6'>
        <div className='space-y-4'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
            Your AI-Powered Crypto Companion for Smarter{' '}
            <span className='inline text-transparent bg-gradient-to-r from-[#008080] to-[#ff9500] bg-clip-text'>
              Trading!
            </span>
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-gray-600'>
            Chat, Trade, and Succeed—Whether You're Automating with AI or Taking
            Control Manually.
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-4 items-center justify-center md:items-start md:justify-start'>
          <Button
            className='w-full max-w-xs md:w-1/3 bg-gradient-to-r from-[#008080] to-[#ff9500] text-white hover:opacity-90'
            onClick={handleSignUpClick}
          >
            Start Trading Now
          </Button>

          <Button
            onClick={handleExploreFeaturesClick}
            className='w-full max-w-xs md:w-1/3 border border-[#ff9500] text-[#ff9500] hover:text-white hover:bg-[#ff9500] transition-colors'
            variant='outline'
          >
            Explore Features
          </Button>
        </div>
      </div>

      <div className='z-10'>
        <img
          src={heroImg}
          alt='ChatTrader Dashboard'
          className='w-full max-w-4xl mx-auto object-contain'
        />
      </div>
    </section>
  );
};

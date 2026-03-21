import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import {
  MessageCircleIcon,
  BarChartIcon,
  GlobeIcon,
  WalletIcon,
  AccessibilityIcon,
  LightningBoltIcon,
} from '../data/Icons';
import type { JSX } from 'react';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <MessageCircleIcon />,
    title: 'Trade via Text, Voice & Images',
    description:
      'Swap tokens and execute trades effortlessly using chat, voice commands, or screenshots.',
  },
  {
    icon: <BarChartIcon />,
    title: 'Limit & Market Orders',
    description:
      'Set precise entry and exit points for SPL and ERC20 tokens without complex charts.',
  },
  {
    icon: <GlobeIcon />,
    title: 'No Language or Technical Barriers',
    description:
      'Designed for everyone—no prior crypto knowledge needed to start trading.',
  },
  {
    icon: <WalletIcon />,
    title: 'Seamless Web3 Wallet Integration',
    description:
      'Connect Metamask, Phantom, and other wallets for secure transactions.',
  },
  {
    icon: <AccessibilityIcon />,
    title: 'Accessible for All',
    description:
      'Voice-powered trading makes DeFi inclusive, even for visually impaired users.',
  },
  {
    icon: <LightningBoltIcon />,
    title: 'Fast & Gas-Efficient',
    description:
      'Optimized for low fees and instant execution on Solana and Ethereum.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section
      id='features'
      className='text-start py-10 sm:py-20'
      aria-labelledby='how-it-works-title'
    >
      <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-10'>
        Why Choose{' '}
        <span className='text-transparent bg-gradient-to-r from-[#008080] to-[#ff9500] bg-clip-text'>
          ChattaTrader?{' '}
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {features.map(({ icon, title, description }) => (
          <Card
            key={title}
            className='bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow'
          >
            <CardHeader>
              <CardTitle className='grid gap-4 place-items-center text-gray-900'>
                <div className='text-[#008080] w-12 h-12 flex items-center justify-center'>
                  {icon}
                </div>
                <div className='text-base font-semibold'>{title}</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600 text-sm'>{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

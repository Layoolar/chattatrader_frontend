import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: '100%',
    description:
      'Voice, text & image-based trading for seamless accessibility.',
  },
  {
    title: '34%',
    description: 'Tech-challenged crypto enthusiasts now able to access DeFi.',
  },
  {
    title: '1B+',
    description:
      'People with disabilities who can now trade using voice commands.',
  },
];

export const Features: React.FC = () => {
  return (
    <section id='howItWorks' className='text-center py-5 sm:py-10'>
      <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-10'>
        Built for Security, Designed for{' '}
        <span className='text-transparent bg-gradient-to-r from-[#008080] to-[#ff9500] bg-clip-text'>
          Trust
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {features.map(({ title, description }) => (
          <Card
            key={title}
            className='bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow'
          >
            <CardHeader>
              <CardTitle className='grid gap-4 place-items-center text-5xl text-transparent bg-gradient-to-r from-[#008080] to-[#ff9500] bg-clip-text'>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className='text-gray-600'>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

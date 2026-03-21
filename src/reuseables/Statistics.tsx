import React from 'react';

interface Stat {
  quantity: string;
  description: string;
}

export const Statistics: React.FC = () => {
  const stats: Stat[] = [
    {
      quantity: '3',
      description: 'Blockchains',
    },
    {
      quantity: '50+',
      description: 'Users',
    },
    {
      quantity: '$100K+',
      description: 'Volume',
    },
    {
      quantity: '350+',
      description: 'Waitlist',
    },
  ];

  return (
    <section id='statistics' className='mt-8'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map(({ quantity, description }) => (
          <div key={description} className='text-center'>
            <h2 className='text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-[#008080] to-[#ff9500] bg-clip-text'>
              {quantity}
            </h2>
            <p className='text-gray-600 mt-2'>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

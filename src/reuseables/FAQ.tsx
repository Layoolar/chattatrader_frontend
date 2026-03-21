import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

interface FAQItem {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQItem[] = [
  {
    question: 'Do I need to connect my wallet to use ChattaTrader?',
    answer: 'No, you can explore and trade without connecting a wallet.',
    value: 'item-1',
  },
  {
    question: 'Can I trade without using the AI bot?',
    answer:
      'Yes, you can manually execute trades. The AI bot is an optional assistant to help with insights and automation.',
    value: 'item-2',
  },
  {
    question: 'What cryptocurrencies are supported?',
    answer: 'ChattaTrader supports any token on SOL, ETH and Base.',
    value: 'item-3',
  },
  {
    question: 'How secure is the platform?',
    answer:
      'ChattaTrader ensures top-tier security with encrypted transactions and smart contract protection. Always follow best security practices.',
    value: 'item-4',
  },
  {
    question: 'What is the role of the AI bot on ChattaTrader?',
    answer:
      'The AI bot helps with trade execution, market insights, and strategy recommendations, making trading easier and more accessible.',
    value: 'item-5',
  },
];

export const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const toggleItem = (value: string) =>
    setOpenItem(value === openItem ? undefined : value);

  return (
    <section className='py-12' id='faq'>
      <div className='text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
          Frequently Asked{' '}
          <span className='text-transparent bg-gradient-to-r from-[#008080] to-[#ff9500] bg-clip-text'>
            Questions
          </span>
        </h2>
        <p className='mt-3 text-md text-gray-600 max-w-xl mx-auto'>
          Everything you need to know about ChattaTrader. Can't find the answer?
          Reach out to us.
        </p>
      </div>

      <div className='mt-8 w-full max-w-3xl mx-auto'>
        <Accordion
          type='single'
          collapsible
          className='space-y-4'
          value={openItem}
          onValueChange={toggleItem}
        >
          {FAQList.map(({ question, answer, value }) => (
            <AccordionItem
              key={value}
              value={value}
              className='border border-gray-200 rounded-xl overflow-hidden'
            >
              <AccordionTrigger className='flex items-center bg-gray-50 justify-between p-5 text-base sm:text-lg font-medium text-left w-full hover:bg-[#008080] hover:text-white transition-all'>
                <span>{question}</span>
              </AccordionTrigger>
              <AccordionContent className='bg-white px-5 pb-5 pt-1 text-sm sm:text-base text-gray-600'>
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className='text-center mt-8'>
          <h3 className='font-medium text-gray-900'>
            Still have questions?{' '}
            <a
              href='#'
              className='underline underline-offset-4 decoration-[#008080] hover:text-[#008080] transition-colors'
            >
              Contact us
            </a>
          </h3>
        </div>
      </div>
    </section>
  );
};

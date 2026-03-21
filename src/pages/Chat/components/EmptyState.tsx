import React from 'react';
import {
  FaComments,
  FaChartLine,
  FaSearch,
  FaPaperPlane,
} from 'react-icons/fa';

interface EmptyStateProps {
  onCreateNewChat: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNewChat }) => (
  <div className='flex-1 flex flex-col items-center justify-center p-8 bg-white/20 backdrop-blur-md'>
    <div className='max-w-md text-center space-y-6'>
      <div className='p-4 rounded-full bg-[#007b83]/10 inline-block'>
        <FaComments size={40} className='text-[#007b83]' />
      </div>
      <h2 className='text-2xl font-bold text-gray-900'>
        Welcome to ChattaTrader
      </h2>
      <p className='text-gray-600'>
        Your AI-powered trading assistant is ready to help you. Start a new chat
        to:
      </p>
      <ul className='text-left space-y-3'>
        <li className='flex items-center gap-2'>
          <div className='p-1 rounded-full bg-[#007b83]/10'>
            <FaChartLine size={16} className='text-[#007b83]' />
          </div>
          <span className='text-gray-600'>
            Analyze market trends and tokens
          </span>
        </li>
        <li className='flex items-center gap-2'>
          <div className='p-1 rounded-full bg-[#007b83]/10'>
            <FaSearch size={16} className='text-[#007b83]' />
          </div>
          <span className='text-gray-600'>Research new opportunities</span>
        </li>
        <li className='flex items-center gap-2'>
          <div className='p-1 rounded-full bg-[#007b83]/10'>
            <FaPaperPlane size={16} className='text-[#007b83]' />
          </div>
          <span className='text-gray-600'>Execute trades with confidence</span>
        </li>
      </ul>
      <button
        onClick={onCreateNewChat}
        className='mt-6 px-6 py-3 bg-[#007b83] text-white rounded-lg hover:bg-[#006972] transition-colors'
      >
        Start a New Chat
      </button>
    </div>
  </div>
);

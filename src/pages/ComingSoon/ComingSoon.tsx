import { useState } from 'react';
import chatboturl from '../../../public/images/chatbot.png';
import { Toaster, toast } from 'react-hot-toast';
import LoadingSpinner from '../../reuseables/BtnLoader';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast.success(
        "Successfully subscribed! We'll notify you when we launch."
      );
    }, 2000);
  };

  return (
    <div className='min-h-screen flex flex-col lg:flex-row'>
      <Toaster position='top-center' />

      {/* Left Section */}
      <div className='flex flex-col justify-center items-center bg-white lg:w-1/2 w-full p-10'>
        <h1 className='text-4xl font-bold mb-4'>
          <span className='text-[#00b4d8]'>Chatta</span>
          <span className='text-[#f4a261]'>Trader</span>
        </h1>
        <h2 className='text-2xl font-semibold mb-2'>We're Launching Soon</h2>
        <p className='text-gray-600 text-center mb-6 max-w-md'>
          Our AI-powered trading assistant is almost ready to serve you. Stay
          tuned!
        </p>

        <form onSubmit={handleSubmit} className='w-full max-w-sm'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            className='w-full px-4 py-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#00b4d8]'
          />
          <button
            type='submit'
            disabled={isLoading}
            className={`w-full bg-[#007b83] hover:bg-[#005e6e] text-white font-semibold py-3 rounded-md transition-colors ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className='flex items-center justify-center gap-2'>
                <LoadingSpinner className='w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8' />
                <p className='text-sm sm:text-base md:text-lg leading-none'>
                  Processing...
                </p>
              </div>
            ) : (
              <p className='text-sm sm:text-base md:text-lg'>Notify Me</p>
            )}
          </button>
        </form>

        <p className='text-xs text-gray-400 mt-4'>
          By signing up, you agree to our
          <a href='#' className='underline'>
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <div className='hidden lg:flex lg:w-1/2'>
        <img
          src={chatboturl}
          alt='Chatbot Illustration'
          className='h-lvh ml-auto'
        />
      </div>
    </div>
  );
};

export default ComingSoon;

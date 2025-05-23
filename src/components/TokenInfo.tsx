import React, { useState } from 'react';
import {
  FaDollarSign,
  FaWater,
  FaClock,
  FaLink,
  FaChartLine,
  FaChartBar,
  FaIdBadge,
  FaRegCopy,
  FaCheck,
} from 'react-icons/fa';

export interface InfoData {
  name: string;
  chain: string;
  price: string | number;
  mc: string | number;
  liquidity: string | number;
  oneHour: string | number;
  twentyFourHour: string | number;
  address: string;
}

interface TokenInfoMessageProps {
  token:
    | {
        name: string;
        chain: string;
        price: string | number;
        mc: string | number;
        liquidity: string | number;
        twentyFourHour: string | number;
        oneHour: string | number;
        address: string;
      }
    | undefined;
}

const goldColor = '#FFD700';

const TokenInfoMessage: React.FC<TokenInfoMessageProps> = ({ token }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    if (token?.address) {
      navigator.clipboard.writeText(token.address);
    }

    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className='w-[70%] sm:w-full max-w-lg bg-teal-900 text-white rounded-lg p-4 sm:p-6 text-sm shadow-md mb-4'>
      {/* Mobile: Single column layout, Desktop: Two column grid */}
      <div className='flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-6'>
        {/* First column items */}
        <div className='flex flex-col gap-3 sm:gap-4'>
          <div className='flex items-center gap-2 min-w-0'>
            <FaIdBadge color={goldColor} className='flex-shrink-0' />
            <span className='font-semibold flex-shrink-0'>Name:</span>
            <span className='truncate min-w-0'>{token?.name}</span>
          </div>

          <div className='flex items-center gap-2 min-w-0'>
            <FaDollarSign color={goldColor} className='flex-shrink-0' />
            <span className='font-semibold flex-shrink-0'>Price:</span>
            <span className='truncate min-w-0'>{token?.price}</span>
          </div>

          <div className='flex items-center gap-2 min-w-0'>
            <FaWater color={goldColor} className='flex-shrink-0' />
            <span className='font-semibold flex-shrink-0'>Liquidity:</span>
            <span className='truncate min-w-0'>{token?.liquidity}</span>
          </div>

          <div className='flex items-center gap-2 min-w-0'>
            <FaClock color={goldColor} className='flex-shrink-0' />
            <span className='font-semibold flex-shrink-0'>24h Change:</span>
            <span className='truncate min-w-0'>{token?.twentyFourHour}</span>
          </div>
        </div>

        {/* Second column items */}
        <div className='flex flex-col gap-3 sm:gap-4'>
          <div className='flex items-center gap-2 min-w-0'>
            <FaLink color={goldColor} className='flex-shrink-0' />
            <span className='font-semibold flex-shrink-0'>Chain:</span>
            <span className='truncate min-w-0'>{token?.chain}</span>
          </div>

          <div className='flex items-center gap-2 min-w-0'>
            <FaChartLine color={goldColor} className='flex-shrink-0' />
            <span className='font-semibold flex-shrink-0'>Market Cap:</span>
            <span className='truncate min-w-0'>{token?.mc}</span>
          </div>

          <div className='flex items-center gap-2 min-w-0'>
            <FaChartBar color={goldColor} className='flex-shrink-0' />
            <span className='font-semibold flex-shrink-0'>1h Change:</span>
            <span className='truncate min-w-0'>{token?.oneHour}</span>
          </div>

          <div className='flex items-center gap-2 min-w-0'>
            <FaLink color={goldColor} className='flex-shrink-0' />
            <span className='font-semibold flex-shrink-0'>Address:</span>
            <span className='truncate min-w-0'>
              {token?.address
                ? `${token.address.slice(0, 4)}...${token.address.slice(-4)}`
                : ''}
            </span>
            <button
              onClick={handleCopy}
              className='ml-2 text-white hover:text-yellow-400 focus:outline-none flex-shrink-0'
            >
              {isCopied ? <FaCheck /> : <FaRegCopy />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfoMessage;

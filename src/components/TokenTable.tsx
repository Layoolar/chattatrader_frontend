import React, { useState } from 'react';
import {
  FaCopy,
  FaCheck,
  FaUser,
  FaAddressCard,
  FaChartLine,
} from 'react-icons/fa';

type Token = {
  name: string;
  address: string;
  mcap: number;
};

type TokenTableProps = {
  tokens: Token[];
};

// Utility function to format market cap values
const formatMarketCap = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

// Utility function to truncate address
const truncateAddress = (address: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const TokenTable: React.FC<TokenTableProps> = ({ tokens }) => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyToClipboard = (address: string) => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setCopiedAddress(address);
        setTimeout(() => setCopiedAddress(null), 2000);
      })
      .catch((err) => console.error('Failed to copy address: ', err));
  };

  // Gold color for the header icons
  const goldColor = '#FFD700';

  return (
    <div className='flex justify-start w-full'>
      <div className='relative rounded-lg shadow-md w-4/5 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full sm:min-w-[500px] text-left text-sm bg-[#007b83] text-white'>
            <thead>
              <tr className='border-b border-gray-400 text-white bg-[#006670]'>
                <th className='py-3 px-2 sm:px-4 whitespace-nowrap'>
                  <div className='flex items-center gap-2'>
                    <FaUser size={16} color={goldColor} />
                    <span className='hidden sm:inline font-medium'>Name</span>
                  </div>
                </th>
                <th className='py-3 px-2 sm:px-4 whitespace-nowrap'>
                  <div className='flex items-center gap-2'>
                    <FaAddressCard size={16} color={goldColor} />
                    <span className='hidden sm:inline font-medium'>
                      Address
                    </span>
                  </div>
                </th>
                <th className='py-3 px-2 sm:px-4 whitespace-nowrap'>
                  <div className='flex items-center gap-2'>
                    <FaChartLine size={16} color={goldColor} />
                    <span className='hidden sm:inline font-medium'>
                      Market Cap
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr
                  key={index}
                  className='border-t border-gray-600 hover:bg-[#008d97] transition-colors duration-150'
                >
                  <td className='py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm'>
                    {token.name}
                  </td>
                  <td className='py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm'>
                    <div className='flex items-center gap-1 sm:gap-2'>
                      <span className='font-mono'>
                        {truncateAddress(token.address)}
                      </span>
                      <button
                        onClick={() => copyToClipboard(token.address)}
                        className='text-gray-300 hover:text-white transition-colors focus:outline-none rounded-sm'
                        title='Copy address'
                        aria-label='Copy address to clipboard'
                      >
                        {copiedAddress === token.address ? (
                          <FaCheck size={12} className='text-green-400' />
                        ) : (
                          <FaCopy size={12} />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className='py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium'>
                    {formatMarketCap(token.mcap)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenTable;

// src/components/TrendingList.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './Card';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import '../styles/animations.css';
import type { TrendingToken } from '../pages/Discover/types';

interface Props {
  chain: 'solana' | 'ethereum' | 'base';
  loading: boolean;
  onDetails: (item: TrendingToken) => void;
  onTrade: (item: TrendingToken) => void;
}

export const TrendingList: React.FC<Props> = ({
  chain,
  loading,
  onDetails,
  onTrade,
}) => {
  const [items, setItems] = useState<TrendingToken[]>([]);

  useEffect(() => {
    // Mock data generation
    const dummyData: TrendingToken[] = Array.from({ length: 4 }, (_, i) => ({
      address: `0x${Math.random().toString(16).slice(2, 42)}`,
      decimals: 18,
      liquidity: Math.random() * 10_000_000,
      logoURI: getChainLogo(chain),
      name: `${chain.toUpperCase()} Token ${i + 1}`,
      symbol: `${chain.slice(0, 3).toUpperCase()}${i + 1}`,
      volume24hUSD: Math.random() * 5_000_000,
      rank: i + 1,
    }));

    setItems(dummyData);
  }, [chain]);

  if (loading) {
    return (
      <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: i * 0.1,
              ease: 'easeOut',
            }}
          >
            <Card className='h-[200px] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden relative'>
              <div className='absolute inset-0 overflow-hidden'>
                <div className='animate-[shimmer_2s_infinite] absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full' />
              </div>
              <div className='p-4 space-y-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-full bg-gray-200' />
                  <div className='space-y-2'>
                    <div className='h-4 w-24 bg-gray-200 rounded' />
                    <div className='h-3 w-16 bg-gray-200 rounded' />
                  </div>
                </div>
                <div className='space-y-3'>
                  <div className='h-20 bg-gray-200 rounded-lg' />
                  <div className='flex gap-2'>
                    <div className='h-8 flex-1 bg-gray-200 rounded-lg' />
                    <div className='h-8 flex-1 bg-gray-200 rounded-lg' />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  const getChainLogo = (chain: string) => {
    switch (chain) {
      case 'solana':
        return '/images/solana.png';
      case 'ethereum':
        return '/images/shiba.svg';
      case 'base':
        return '/images/shiba.svg';
      default:
        return '/images/shiba.svg';
    }
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        layout
        className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
      >
        {items.map((item, index) => (
          <motion.div
            key={`${item.address}-${index}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: [0.23, 1, 0.32, 1], // Custom easing for smoother animation
            }}
          >
            <Card className='bg-white text-sm text-gray-700 w-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
              <CardContent className='flex flex-col gap-4 p-4'>
                {/* Header: Image, Name, Symbol */}
                <div className='flex items-center gap-3'>
                  <motion.div
                    className='relative w-12 h-12'
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={item.logoURI}
                      alt={item.symbol}
                      className='w-full h-full rounded-full object-cover shadow-sm'
                    />
                    <div className='absolute -bottom-1 -right-1 bg-[#007b83] text-white text-[10px] px-1.5 py-0.5 rounded-full'>
                      #{item.rank}
                    </div>
                  </motion.div>
                  <div className='flex-1'>
                    <div className='font-medium text-gray-900'>{item.name}</div>
                    <div className='text-[#007b83] font-semibold mt-0.5'>
                      {item.symbol}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-2 gap-4 text-xs bg-gray-50 p-3 rounded-lg'>
                  <div>
                    <div className='text-gray-500 mb-1'>Liquidity</div>
                    <div className='text-gray-900 font-semibold'>
                      $
                      {item.liquidity.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                  <div>
                    <div className='text-gray-500 mb-1'>Volume (24h)</div>
                    <div className='text-gray-900 font-semibold'>
                      $
                      {item.volume24hUSD.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex gap-2 mt-1'>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onDetails(item)}
                    className='flex-1 py-2 px-4 text-xs font-medium bg-[#007b83]/5 text-[#007b83] 
                      rounded-lg hover:bg-[#007b83]/10 transition-colors'
                  >
                    Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onTrade(item)}
                    className='flex-1 py-2 px-4 text-xs font-medium bg-[#007b83] text-white 
                      rounded-lg hover:bg-[#007b83]/90 transition-colors flex items-center justify-center gap-1.5'
                  >
                    Trade <FaArrowRight size={12} />
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

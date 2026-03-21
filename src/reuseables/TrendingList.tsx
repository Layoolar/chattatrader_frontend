import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './Card';
import { FaArrowRight } from 'react-icons/fa';
import '../styles/animations.css';
import type { TrendingToken } from '../pages/discovery/types';

type Chain = 'solana' | 'ethereum' | 'base';

type TrendingListProps = {
  chain: Chain;
  onDetails: (token: TrendingToken) => void;
  onTrade: (token: TrendingToken) => void;
  loading?: boolean;
  tokens?: TrendingToken[];
};

export const TrendingList: React.FC<TrendingListProps> = ({
  chain,
  onDetails,
  onTrade,
  loading = false,
  tokens,
}) => {
  const [items, setItems] = useState<TrendingToken[]>([]);

  useEffect(() => {
    if (tokens && tokens.length > 0) {
      setItems(tokens);
    } else {
      setItems([]);
    }
  }, [tokens, chain]);

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
  if (loading) {
    return (
      <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
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
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {items.map((item, index) => (
        <div key={`${item.address}-${index}`}>
          <Card className='bg-white text-sm text-gray-700 w-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <CardContent className='flex flex-col gap-4 p-4'>
              {/* Header: Image, Name, Symbol */}
              <div className='flex items-center gap-3'>
                <div className='relative w-12 h-12'>
                  <img
                    src={
                      item.logoURI && item.logoURI.trim()
                        ? item.logoURI
                        : getChainLogo(chain)
                    }
                    alt={item.symbol}
                    className='w-full h-full rounded-full object-cover shadow-sm'
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (
                        target.src !==
                        window.location.origin + getChainLogo(chain)
                      ) {
                        target.src = getChainLogo(chain);
                      }
                    }}
                  />
                  <div className='absolute -bottom-1 -right-1 bg-[#007b83] text-white text-[10px] px-1.5 py-0.5 rounded-full'>
                    #{item.rank}
                  </div>
                </div>
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
                <button
                  onClick={() => onDetails(item)}
                  className='flex-1 py-2 px-4 text-xs font-medium bg-[#007b83]/5 text-[#007b83] 
                    rounded-lg hover:bg-[#007b83]/10 transition-colors'
                >
                  Details
                </button>
                <button
                  onClick={() => onTrade(item)}
                  className='flex-1 py-2 px-4 text-xs font-medium bg-[#007b83] text-white 
                    rounded-lg hover:bg-[#007b83]/90 transition-colors flex items-center justify-center gap-1.5'
                >
                  Trade <FaArrowRight size={12} />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

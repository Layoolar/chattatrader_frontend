import React from 'react';
import { Modal } from '../reuseables/modal';
import { Button } from '../reuseables/button';
import { Badge } from '../reuseables/Badge';
import { Check, Copy, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TokenDetailsModalProps {
  token: {
    id: string;
    name: string;
    symbol: string;
    decimals?: number;
    usdValue: number;
    chain: string;
  } | null;
  onClose: () => void;
  onBuy: () => void;
  onSell: () => void;
  onCopy: (text: string, label: string) => void;
  copiedText: string | null;
}

const TokenDetailsModal: React.FC<TokenDetailsModalProps> = ({
  token,
  onClose,
  onBuy,
  onSell,
  onCopy,
  copiedText,
}) => {
  if (!token) return null;

  return (
    <Modal onClose={onClose}>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h3 className='text-xl font-bold text-gray-800'>{token.name}</h3>
          <div className='flex items-center gap-2 mt-1'>
            <Badge variant='secondary' className='bg-gray-100 text-gray-600'>
              {token.symbol}
            </Badge>
            <Button
              onClick={() => onCopy(token.symbol, 'Token Symbol')}
              variant='ghost'
              size='sm'
              className='p-1 h-auto hover:bg-gray-100 cursor-pointer'
              aria-label='Copy token symbol'
            >
              {copiedText === 'Token Symbol' ? (
                <Check className='h-4 w-4 text-green-500' />
              ) : (
                <Copy className='h-4 w-4 text-gray-400' />
              )}
            </Button>
          </div>
        </div>

        {/* Contract Info */}
        <div className='bg-gray-50 rounded-lg p-4'>
          <div className='flex items-center justify-between gap-3'>
            <span className='text-sm font-medium text-gray-600'>Contract:</span>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-mono truncate max-w-[180px]'>
                {token.id}
              </span>
              <Button
                onClick={() => onCopy(token.id, 'Contract Address')}
                variant='ghost'
                size='sm'
                className='p-1 h-auto hover:bg-gray-100 cursor-pointer'
                aria-label='Copy contract address'
              >
                {copiedText === 'Contract Address' ? (
                  <Check className='h-4 w-4 text-green-500' />
                ) : (
                  <Copy className='h-4 w-4 text-gray-400' />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Market Data */}
        <div className='grid grid-cols-2 gap-6'>
          <div className='space-y-1'>
            <span className='text-sm font-medium text-gray-500'>
              Market Cap
            </span>
            <p className='text-lg font-semibold'>
              $
              {token.usdValue.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className='space-y-1'>
            <span className='text-sm font-medium text-gray-500'>Chain</span>
            <p className='text-lg font-semibold capitalize'>{token.chain}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3 pt-2'>
          <Button
            variant='outline'
            className='flex-1 font-medium cursor-pointer'
            onClick={onSell}
          >
            <ArrowDownRight className='mr-1.5 h-4 w-4' />
            Sell
          </Button>
          <Button
            className='flex-1 font-medium bg-[#FF9500] hover:bg-[#FF9500]/90 text-white cursor-pointer'
            onClick={onBuy}
          >
            <ArrowUpRight className='mr-1.5 h-4 w-4' />
            Buy
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TokenDetailsModal;

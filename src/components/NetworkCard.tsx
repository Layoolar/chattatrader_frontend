import React from 'react';
import { Card, CardContent } from '../reuseables/Card';
import { Badge } from '../reuseables/Badge';
import { Button } from '../reuseables/button';
import { Copy, Check, Plus } from 'lucide-react';

interface NetworkCardProps {
  network: {
    label: string;
    value: 'sol' | 'eth' | 'base';
  };
  walletAddress: string;
  balance: string;
  onImportToken: () => void;
  onCopyAddress: (address: string) => void;
  copiedAddress: string | null;
}

const NetworkCard: React.FC<NetworkCardProps> = ({
  network,
  walletAddress,
  balance,
  onImportToken,
  onCopyAddress,
  copiedAddress,
}) => {
  const truncateString = (
    str: string,
    startLength: number = 5,
    endLength: number = 4
  ) => {
    return `${str.slice(0, startLength)}...${str.slice(-endLength)}`;
  };

  return (
    <Card className='overflow-hidden bg-card h-full'>
      <CardContent className='p-3'>
        <div className='flex items-center justify-between mb-2.5'>
          <div className='flex items-center gap-2'>
            <div className='p-1.5 bg-gray-50 rounded-lg'>
              <img
                src={`/images/${network.value}.svg`}
                alt={`${network.label} Chain`}
                className='w-6 h-6'
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    '/images/chains/placeholder-chain.svg';
                }}
              />
            </div>
            <h3 className='font-semibold'>{network.label}</h3>
          </div>
          <div className='flex items-center gap-1.5'>
            <Badge
              variant='outline'
              className='font-mono text-xs px-1.5 py-0.5'
            >
              {truncateString(walletAddress)}
            </Badge>
            <button
              onClick={() => onCopyAddress(walletAddress)}
              className='p-1 rounded-full hover:bg-gray-200 transition-all duration-200 cursor-pointer'
              aria-label='Copy wallet address'
            >
              {copiedAddress === walletAddress ? (
                <Check className='h-3.5 w-3.5 text-green-500' />
              ) : (
                <Copy className='h-3.5 w-3.5 text-gray-500 hover:text-gray-700' />
              )}
            </button>
          </div>
        </div>{' '}
        <div className='space-y-2 mt-3'>
          <div className='flex justify-between items-center text-sm'>
            <span className='text-muted-foreground'>Native Balance</span>
            <span className='font-medium'>{balance}</span>
          </div>
        </div>
        {network.value !== 'sol' && (
         <div className='mt-4 flex justify-center align-items-center'>
         <Button
          variant='outline'
          size='sm'
          className='px-3 py-1 h-8 text-xs cursor-pointer hover:bg-[#008080]/10 hover:text-[#008080] hover:border-[#008080] transition-colors'
          onClick={onImportToken}>
          <Plus className='w-4 h-4 mr-1 text-[#008080]' />
         Import
       </Button>
      </div>
      )}
      </CardContent>
    </Card>
  );
};

export default NetworkCard;

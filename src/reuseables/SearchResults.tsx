import React from 'react';
import { Button } from './button';

export interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  chain: string;
  price?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
  loading?: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onSelect,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className='absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg border border-gray-200 mt-1 p-2 z-50'>
        <div className='animate-pulse space-y-2'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex items-center gap-3 p-2'>
              <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
              <div className='flex-1 space-y-1'>
                <div className='h-2 bg-gray-200 rounded w-1/3'></div>
                <div className='h-2 bg-gray-200 rounded w-1/4'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) return null;

  return (
    <div className='absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg border border-gray-200 mt-1 max-h-[300px] overflow-y-auto z-50'>
      {results.map((result) => (
        <Button
          key={result.id}
          variant='ghost'
          className='flex items-center gap-3 w-full p-2 hover:bg-gray-50'
          onClick={() => onSelect(result)}
        >
          <img
            src={`/images/${result.chain}.svg`}
            alt={result.chain}
            className='w-8 h-8 rounded-full'
          />
          <div className='flex-1 text-left'>
            <p className='text-sm font-medium text-gray-900'>{result.name}</p>
            <p className='text-xs text-gray-500'>
              {result.symbol} • {result.chain}
            </p>
          </div>
          {result.price && (
            <span className='text-sm text-gray-600'>{result.price}</span>
          )}
        </Button>
      ))}
    </div>
  );
};

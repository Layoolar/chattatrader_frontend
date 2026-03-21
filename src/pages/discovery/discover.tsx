import { useState, useEffect } from 'react';
import { Button } from '../../reuseables/button';
import { Modal } from '../../reuseables/modal';
import { TrendingList } from '../../reuseables/TrendingList';
import { SearchResults } from '../../reuseables/SearchResults';
import { TrendingTokenDetails } from '../../reuseables/TrendingTokenDetails';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../../reuseables/tabs';

import type { TrendingToken, TokenData } from './types';
import { getTrendingTokens, getTokenDetails } from '../../api/tokens';
import { SearchIcon } from 'lucide-react';

type Chain = 'solana' | 'ethereum' | 'base';

const Discover: React.FC = () => {
  const [tradeAction, setTradeAction] = useState<'buy' | 'sell' | null>(null);
  const [selectedChain, setSelectedChain] = useState<Chain>('solana');
  const [showDetails, setShowDetails] = useState<TrendingToken | null>(null);
  const [tokenData, setTokenData] = useState<Partial<TokenData> | null>(null);
  const [tokenDetailsLoading, setTokenDetailsLoading] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState<TrendingToken | null>(
    null
  );
  const [trendingTokens, setTrendingTokens] = useState<{
    solana: { tokens: TrendingToken[] };
    ethereum: { tokens: TrendingToken[] };
    base: { tokens: TrendingToken[] };
  }>({
    solana: { tokens: [] },
    ethereum: { tokens: [] },
    base: { tokens: [] },
  });
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Mock search function - replace with actual API call
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(
        [
          {
            id: '1',
            name: 'Solana',
            symbol: 'SOL',
            chain: 'solana',
            price: '$100.45',
          },
          {
            id: '2',
            name: 'Ethereum',
            symbol: 'ETH',
            chain: 'ethereum',
            price: '$2,345.67',
          },
          {
            id: '3',
            name: 'Base',
            symbol: 'BASE',
            chain: 'base',
            price: '$1.23',
          },
        ].filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.symbol.toLowerCase().includes(query.toLowerCase())
        )
      );
      setSearchLoading(false);
    }, 500);
  };

  const handleChainClick = (chain: Chain) => {
    setSelectedChain(chain);
  };

  const getChainLabel = (chain: Chain) => {
    switch (chain) {
      case 'solana':
        return 'Solana';
      case 'ethereum':
        return 'Ethereum';
      case 'base':
        return 'Base';
    }
  };

  const fetchTokenData = async (token: TrendingToken) => {
    setTokenDetailsLoading(true);
    try {
      const res = await getTokenDetails(token.address);
      setTokenData(res.data?.token ?? null);
    } catch (error) {
      setTokenData(null);
      console.error('Error fetching token data:', error);
    } finally {
      setTokenDetailsLoading(false);
    }
  };

  useEffect(() => {
    if (showDetails) {
      setTokenData(null);
      fetchTokenData(showDetails);
    } else {
      setTokenData(null);
    }
  }, [showDetails]);

  useEffect(() => {
    const fetchTrending = async () => {
      setTrendingLoading(true);
      try {
        const res = await getTrendingTokens();
        setTrendingTokens(res.data);
      } catch (error) {
        setTrendingTokens({
          solana: { tokens: [] },
          ethereum: { tokens: [] },
          base: { tokens: [] },
        });
        console.error('Failed to fetch trending tokens:', error);
      } finally {
        setTrendingLoading(false);
      }
    };
    fetchTrending();
  }, []);
  return (
    <div className='pt-2 px-4 md:px-6 lg:px-10 space-y-6 bg-[#FFFFFF] min-h-screen'>
      <div className='w-full max-w-7xl mx-auto'>
        <h1 className='text-xl md:text-2xl font-bold text-center text-[#0f172a]'>
          Discover
        </h1>
        {/* Search Input */}
        <div className='w-full max-w-2xl mx-auto'>
          <div className='relative w-full'>
            <div className='flex flex-row items-center gap-4 mb-6 pt-4'>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search tickers, addresses, or name'
                className='w-full px-4 pr-10 py-3 border border-gray-200 bg-white shadow-sm placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007b83]/20 focus:border-[#007b83] text-sm transition-all ease-in-out duration-200'
              />
              <SearchIcon
                color='#007b83'
                className='cursor-pointer'
                onClick={() => handleSearch(searchQuery)}
              />
            </div>

            <SearchResults
              results={searchResults}
              onSelect={(result) => {
                result;
                setSearchQuery('');
                setSearchResults([]);
              }}
              loading={searchLoading}
            />
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto space-y-4'>
        <h2 className='text-xl md:text-2xl font-semibold text-[#0f172a]'>
          Trending Tokens
        </h2>
        <p className='text-sm text-[#475569] font-medium'>
          Trending on {getChainLabel(selectedChain)}
        </p>

        <Tabs
          value={selectedChain}
          onValueChange={(val) => handleChainClick(val as Chain)}
        >
          <TabsList className='inline-flex items-start justify-start gap-2 p-1 bg-gray-50/50 rounded-lg border border-gray-100'>
            {(['solana', 'ethereum', 'base'] as Chain[]).map((chain) => (
              <TabsTrigger
                key={chain}
                value={chain}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ease-out rounded-md relative
                ${
                  selectedChain === chain
                    ? 'bg-[#007b83] text-white shadow-sm ring-2 ring-[#007b83]/20'
                    : 'bg-white text-gray-600 hover:text-[#007b83] hover:bg-[#007b83]/5'
                }`}
              >
                {getChainLabel(chain)}
              </TabsTrigger>
            ))}
          </TabsList>

          {(['solana', 'ethereum', 'base'] as Chain[]).map((chain) => (
            <TabsContent key={chain} value={chain}>
              <TrendingList
                chain={chain}
                loading={trendingLoading}
                tokens={trendingTokens[chain]?.tokens || []}
                onDetails={setShowDetails}
                onTrade={setShowTradeModal}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      {/* Modals */}
      {showTradeModal && tradeAction && (
        <Modal
          onClose={() => {
            setShowTradeModal(null);
            setTradeAction(null);
          }}
        >
          <div className='space-y-6'>
            <div className='text-center text-lg font-semibold'>
              {tradeAction === 'buy'
                ? `Buy ${showTradeModal.name}`
                : `Sell ${showTradeModal.name}`}
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Token Information
                </label>{' '}
                <input
                  type='text'
                  placeholder={`Enter ${showTradeModal.name} details`}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#007b83]/20 focus:border-[#007b83] transition-colors'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Amount
                </label>{' '}
                <input
                  type='number'
                  placeholder='0.00'
                  className='w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#007b83]/20 focus:border-[#007b83] transition-colors'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Estimated Cost
                </label>{' '}
                <input
                  type='text'
                  placeholder='$0.00'
                  className='w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#007b83]/20 focus:border-[#007b83] transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed'
                  disabled
                />
              </div>{' '}
              <div className='flex justify-end'>
                <button
                  className={`px-6 py-2 text-white rounded-md text-sm transition-colors ${
                    tradeAction === 'buy'
                      ? 'bg-[#007b83] hover:bg-[#007b83]/90'
                      : 'bg-red-600 hover:bg-red-500'
                  }`}
                >
                  {tradeAction === 'buy' ? 'Buy Token' : 'Sell Token'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}{' '}
      {showTradeModal && !tradeAction && (
        <Modal onClose={() => setShowTradeModal(null)}>
          <div className='flex gap-4 justify-center'>
            <Button
              className='bg-[#007b83] hover:bg-[#007b83]/90 text-white w-full md:w-[93px] md:[29px] transition-colors'
              onClick={() => setTradeAction('buy')}
            >
              Buy
            </Button>
            <Button
              className='bg-red-600 hover:bg-red-500 text-white w-full md:w-[93px] md:[29px] transition-colors'
              onClick={() => setTradeAction('sell')}
            >
              Sell
            </Button>
          </div>
        </Modal>
      )}
      {/* Token Details Modal */}
      {showDetails && (
        <TrendingTokenDetails
          chain={selectedChain}
          token={showDetails}
          tokenData={tokenData ?? null}
          loading={tokenDetailsLoading}
          onClose={() => setShowDetails(null)}
        />
      )}
    </div>
  );
};

export default Discover;

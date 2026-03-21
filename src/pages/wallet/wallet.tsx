import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../reuseables/Card';
import { Button } from '../../reuseables/button';
import { Link } from 'react-router-dom';
import { Modal } from '../../reuseables/modal';
import NetworkCard from '../../components/NetworkCard';
import TokenDetailsModal from '../../components/TokenDetailsModal';
import {
  Settings,
  Eye,
  EyeOff,
  X,
  Trash2,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';

// Types
interface Token {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  usdValue: number;
  chain: 'sol' | 'eth' | 'base';
  decimals?: number;
}

interface Network {
  label: string;
  value: 'sol' | 'eth' | 'base';
}

// Mock Data
const initialTokens: Token[] = [
  {
    id: '1',
    name: 'Solana',
    symbol: 'SOL',
    amount: 0,
    usdValue: 0,
    chain: 'sol',
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 0,
    usdValue: 0,
    chain: 'eth',
  },
  {
    id: '3',
    name: 'Base',
    symbol: 'ETH',
    amount: 0,
    usdValue: 0,
    chain: 'base',
  },
  {
    id: '4',
    name: 'Polygon',
    symbol: 'MATIC',
    amount: 0,
    usdValue: 0,
    chain: 'eth',
  },
];

const networks: Network[] = [
  { label: 'Solana', value: 'sol' },
  { label: 'Ethereum', value: 'eth' },
  { label: 'Base', value: 'base' },
];

const Wallet: React.FC = () => {
  // State
  const [showBalanceNumbers, setShowBalanceNumbers] = useState(false);
  const [tokens, setTokens] = useState<Token[]>(initialTokens);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [expandedNetworks, setExpandedNetworks] = useState<{
    [key: string]: boolean;
  }>({
    sol: false,
    eth: false,
    base: false,
  });
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState<number | null>(null);
  const [loadingToken, setLoadingToken] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [tokenToDelete, setTokenToDelete] = useState<Token | null>(null);

  const walletAddress = '0x1234567890abcdef';
  const { user } = useAuth();

  useEffect(() => {
    if (!contractAddress) {
      setTokenSymbol('');
      setTokenDecimals(null);
      return;
    }

    // simulated token info fetch (replace later with real API call)

    const timer = setTimeout(async () => {
      setLoadingToken(true);

      try {
        const mockToken = {
          symbol: contractAddress.slice(0, 4).toUpperCase(),
          decimals: 18,
        };

        setTokenSymbol(mockToken.symbol);
        setTokenDecimals(mockToken.decimals);
        toast.success('Token info retrieved!');
      } catch (error) {
        toast.error('Failed to fetch token info');
      } finally {
        setLoadingToken(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [contractAddress]);

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
  };

  // Copy contract address
  const copyContractAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (error) {
      toast.error('Failed to copy contract address');
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(field);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Failed to copy');
    }
  };

  // Simulated token fetch (replace with actual blockchain call)
  // const fetchTokenInfo = async () => {
  //   setLoadingToken(true);
  //   try {
  //     // Simulate API call to fetch token info
  //     setTimeout(() => {
  //       // Mock response
  //       const mockToken = {
  //         symbol: contractAddress.slice(0, 4).toUpperCase(),
  //         decimals: 18
  //       };

  //       setTokenSymbol(mockToken.symbol);
  //       setTokenDecimals(mockToken.decimals);
  //       setLoadingToken(false);
  //       toast.success("Token info retrieved!");
  //     }, 1000);
  //   } catch (error) {
  //     setLoadingToken(false);
  //     toast.error("Failed to fetch token info");
  //   }
  // };

  // Add imported token to list
  const handleImportToken = () => {
    if (!contractAddress || !tokenSymbol || tokenDecimals === null) {
      toast.error('Please complete all token information');
      return;
    }

    const newToken: Token = {
      id: contractAddress,
      name: tokenSymbol,
      symbol: tokenSymbol,
      amount: 0,
      usdValue: 0,
      chain: 'sol', // Default to sol for new tokens
      decimals: tokenDecimals,
    };

    setTokens((prev) => [...prev, newToken]);
    toast.success('Token imported successfully!');
    resetImportForm();
  };

  // Delete token from list
  const handleDeleteToken = (tokenId: string) => {
    setTokens((prevTokens) => {
      const updatedTokens = prevTokens.filter((token) => token.id !== tokenId);
      if (selectedToken?.id === tokenId) {
        setSelectedToken(null);
      }
      toast.success('Token removed successfully!');
      return updatedTokens;
    });
  };

  // Reset import form
  const resetImportForm = () => {
    setContractAddress('');
    setTokenSymbol('');
    setTokenDecimals(null);
    setIsImportModalOpen(false);
  };
  return (
    <div className='bg-gradient-to-b from-gray-50 to-white p-2 pt-0 md:p-6 min-h-screen'>
      {/* Header */}{' '}
      <header className='flex justify-end md:justify-between items-center sm:p-4 mb-4 md:mb-6 relative z-10'>
        <div className='flex flex-row-reverse md:flex-row items-center gap-3'>
          <div className='relative'>
            <img
              src='/images/59.svg'
              alt='Profile'
              className='w-12 h-12 rounded-full shadow-md border-2 border-white'
            />
            <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
          </div>
          <div className='text-right md:text-left'>
            <p className='text-gray-900 font-semibold'>
              {user?.username || 'Username'}
            </p>
            <p className='text-gray-500 text-xs font-medium'>
              {user?.email || 'email'}
            </p>
          </div>
        </div>

        <div className='hidden md:block'>
          <Link to='/app/settings'>
            <Button className='p-2.5 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 text-gray-700'>
              <Settings className='w-5 h-5' />
            </Button>
          </Link>
        </div>
      </header>
      {/* Balance Card */}
      <Card className='bg-gradient-to-r from-[#008080] to-[#006666] rounded-xl mb-6 mt-6 md:mt-0 shadow-lg overflow-hidden relative max-w-xl mx-auto'>
        <div className='absolute inset-0 bg-pattern opacity-10'></div>
        <CardContent className='p-3 relative z-10'>
          <div className='flex flex-row items-center justify-between gap-2 w-full'>
            <div className='flex items-center gap-2'>
              <div>
                <div className='flex items-center gap-2'>
                  <h2 className='text-lg font-bold text-white'>Balance</h2>
                  <button
                    onClick={() => setShowBalanceNumbers(!showBalanceNumbers)}
                    className='hover:bg-white/20 transition-all duration-200'
                    aria-label='Toggle balance visibility'
                  >
                    {showBalanceNumbers ? (
                      <Eye className='w-4 h-4 text-white/90' />
                    ) : (
                      <EyeOff className='w-4 h-4 text-white/90' />
                    )}
                  </button>
                </div>
                <p className='text-white/70 text-xs'>Total Portfolio Value</p>
              </div>
            </div>
            <div className='bg-white/10 px-3 py-1.5 rounded-lg'>
              <span className='text-xs text-white/70 block'>USD</span>
              <p className='text-base font-bold text-white'>
                {showBalanceNumbers ? '$0.00' : '*****'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Network Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
        {networks.map((network) => (
          <NetworkCard
            key={network.value}
            network={network}
            walletAddress={walletAddress}
            balance={
              network.value === 'sol'
                ? `${tokens
                    .find((token) => token.chain === 'sol')
                    ?.amount.toFixed(2)} SOL`
                : `${tokens
                    .find((token) => token.chain === 'eth')
                    ?.amount.toFixed(2)} ETH`
            }
            onImportToken={() => setIsImportModalOpen(true)}
            onCopyAddress={copyContractAddress}
            copiedAddress={copiedAddress}
          />
        ))}
      </div>
      {/* Token Lists */}
      <div className='space-y-4'>
        {networks.map((network) => {
          const networkTokens = tokens.filter(
            (token) => token.chain === network.value
          );
          return (
            <div
              key={network.value}
              className='bg-white shadow-sm rounded-lg overflow-hidden'
            >
              <div
                className='flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors'
                onClick={() =>
                  setExpandedNetworks((prev) => ({
                    ...prev,
                    [network.value]: !prev[network.value],
                  }))
                }
              >
                <div className='flex items-center gap-2'>
                  {expandedNetworks[network.value] ? (
                    <ChevronDown className='h-5 w-5 text-gray-500' />
                  ) : (
                    <ChevronRight className='h-5 w-5 text-gray-500' />
                  )}
                  <div className='flex items-center gap-2'>
                    <div className='p-1.5 bg-gray-50 rounded-lg'>
                      <img
                        src={`/images/${network.value}.svg`}
                        alt={network.label}
                        className='w-5 h-5'
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            '/images/chains/placeholder-chain.svg';
                        }}
                      />
                    </div>
                    <h3 className='text-lg font-semibold text-gray-800'>
                      {network.label} Tokens ({networkTokens.length})
                    </h3>
                  </div>
                </div>
              </div>

              {expandedNetworks[network.value] && networkTokens.length > 0 && (
                <div className='border-t border-gray-100'>
                  {networkTokens.map((token) => (
                    <div
                      key={token.id}
                      onClick={() => handleTokenClick(token)}
                      className='group hover:bg-gray-50 p-4 flex justify-between items-center transition-all duration-200 w-full text-left cursor-pointer border-b border-gray-100 last:border-b-0'
                    >
                      <div className='flex items-center gap-3'>
                        <img
                          src={`/images/tokens/${token.symbol.toLowerCase()}.svg`}
                          alt={token.symbol}
                          className='w-8 h-8'
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              '/images/solana.png';
                          }}
                        />
                        <div>
                          <p className='text-[#4F4F4F] font-medium'>
                            {token.name}
                          </p>
                          <p className='text-[#4F4F4F] text-sm'>
                            {token.amount} {token.symbol}
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center gap-4'>
                        <div className='text-right'>
                          <p className='text-[#4F4F4F]'>
                            ${token.usdValue.toFixed(2)}
                          </p>
                          <p className='text-[#4F4F4F] text-sm'>+0.00%</p>
                        </div>

                        {token.chain !== 'sol' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setTokenToDelete(token);
                              handleDeleteToken(token.id);
                            }}
                            className='p-2 rounded-full hover:bg-gray-200'
                            aria-label='Delete token'
                          >
                            <Trash2 className='h-4 w-4 text-red-500' />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {expandedNetworks[network.value] &&
                networkTokens.length === 0 && (
                  <div className='p-4 text-center text-gray-500 border-t border-gray-100'>
                    No tokens found for {network.label}
                  </div>
                )}
            </div>
          );
        })}
      </div>
      {/* Buy Modal */}
      {isBuyModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white shadow rounded-[8px] p-6 max-w-md w-full'>
            <div className='flex justify-between items-start mb-4'>
              <h3 className='text-lg font-bold text-[#4F4F4F]'>Buy Token</h3>
              <button
                onClick={() => setIsBuyModalOpen(false)}
                className='text-[#4F4F4F]'
                aria-label='Close modal'
              >
                <X size={20} />
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-[#7B7B7B] mb-1'>
                  Contract Address
                </label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder='Enter token contract address'
                    className='w-full px-3 py-2 border border-[#E9E9E9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9500]'
                  />
                  {loadingToken && (
                    <div className='text-center py-2'>
                      <p className='text-sm text-[#7B7B7B]'>
                        Loading token info...
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {tokenSymbol && (
                <div className='space-y-2'>
                  <div>
                    <label className='block text-sm font-medium text-[#7B7B7B] mb-1'>
                      Token Symbol
                    </label>
                    <input
                      type='text'
                      value={tokenSymbol}
                      disabled
                      className='w-full px-3 py-2 border border-[#E9E9E9] bg-gray-50 rounded-md'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-[#7B7B7B] mb-1'>
                      Token Decimals
                    </label>
                    <input
                      type='number'
                      value={tokenDecimals || ''}
                      disabled
                      className='w-full px-3 py-2 border border-[#E9E9E9] bg-gray-50 rounded-md'
                    />
                  </div>
                </div>
              )}

              <div className='pt-2'>
                <Button
                  onClick={handleImportToken}
                  disabled={
                    !contractAddress || !tokenSymbol || tokenDecimals === null
                  }
                  className='w-full bg-[#FF9500] hover:bg-[#FF9500]/90 text-white'
                >
                  Buy Token
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Sell Modal */}
      {isSellModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white shadow rounded-[8px] p-6 max-w-md w-full'>
            <div className='flex justify-between items-start mb-4'>
              <h3 className='text-lg font-bold text-[#4F4F4F]'>Sell Token</h3>
              <button
                onClick={() => setIsSellModalOpen(false)}
                className='text-[#4F4F4F]'
                aria-label='Close modal'
              >
                <X size={20} />
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-[#7B7B7B] mb-1'>
                  Contract Address
                </label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder='Enter token contract address'
                    className='w-full px-3 py-2 border border-[#E9E9E9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9500]'
                  />
                  {loadingToken && (
                    <div className='text-center py-2'>
                      <p className='text-sm text-[#7B7B7B]'>
                        Loading token info....
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {tokenSymbol && (
                <div className='space-y-2'>
                  <div>
                    <label className='block text-sm font-medium text-[#7B7B7B] mb-1'>
                      Token Symbol
                    </label>
                    <input
                      type='text'
                      value={tokenSymbol}
                      disabled
                      className='w-full px-3 py-2 border border-[#E9E9E9] bg-gray-50 rounded-md'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-[#7B7B7B] mb-1'>
                      Token Decimals
                    </label>
                    <input
                      type='number'
                      value={tokenDecimals || ''}
                      disabled
                      className='w-full px-3 py-2 border border-[#E9E9E9] bg-gray-50 rounded-md'
                    />
                  </div>
                </div>
              )}

              <div className='pt-2'>
                <Button
                  onClick={handleImportToken}
                  disabled={
                    !contractAddress || !tokenSymbol || tokenDecimals === null
                  }
                  className='w-full bg-[#FF9500] hover:bg-[#FF9500]/90 text-white'
                >
                  Sell Token
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Import Token Modal */}
      {isImportModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white shadow rounded-[8px] p-6 max-w-md w-full'>
            <div className='flex justify-between items-start mb-4'>
              <h3 className='text-lg font-bold text-[#4F4F4F]'>Import Token</h3>
              <button
                onClick={resetImportForm}
                className='text-[#4F4F4F]'
                aria-label='Close modal'
              >
                <X size={20} />
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-[#7B7B7B] mb-1'>
                  Contract Address
                </label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder='Enter token contract address'
                    className='w-full px-3 py-2 border border-[#E9E9E9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9500]'
                  />
                  {loadingToken && (
                    <div className='text-center py-2'>
                      <p className='text-sm text-[#7B7B7B]'>
                        Loading token info...
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {tokenSymbol && (
                <div className='space-y-2'>
                  <div>
                    <label className='block text-sm font-medium text-[#7B7B7B] mb-1'>
                      Token Symbol
                    </label>
                    <input
                      type='text'
                      value={tokenSymbol}
                      disabled
                      className='w-full px-3 py-2 border border-[#E9E9E9] bg-gray-50 rounded-md'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-[#7B7B7B] mb-1'>
                      Token Decimals
                    </label>
                    <input
                      type='number'
                      value={tokenDecimals || ''}
                      disabled
                      className='w-full px-3 py-2 border border-[#E9E9E9] bg-gray-50 rounded-md'
                    />
                  </div>
                </div>
              )}

              <div className='pt-2'>
                <Button
                  onClick={handleImportToken}
                  disabled={
                    !contractAddress || !tokenSymbol || tokenDecimals === null
                  }
                  className='w-full bg-[#FF9500] hover:bg-[#FF9500]/90 text-white'
                >
                  Import Token
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Token Details Modal */}
      <TokenDetailsModal
        token={selectedToken}
        onClose={() => setSelectedToken(null)}
        onBuy={() => {
          setIsBuyModalOpen(true);
          if (selectedToken) {
            setContractAddress(selectedToken.id);
            setTokenSymbol(selectedToken.symbol);
            setTokenDecimals(selectedToken.decimals || 18);
          }
          setSelectedToken(null);
        }}
        onSell={() => {
          setIsSellModalOpen(true);
          if (selectedToken) {
            setContractAddress(selectedToken.id);
            setTokenSymbol(selectedToken.symbol);
            setTokenDecimals(selectedToken.decimals || 18);
          }
          setSelectedToken(null);
        }}
        onCopy={copyToClipboard}
        copiedText={copiedText}
      />
      {tokenToDelete && (
        <Modal onClose={() => setTokenToDelete(null)}>
          <div className='p-6 text-center'>
            <h2 className='text-lg font-semibold mb-2'>Delete Token?</h2>
            <p className='mb-4 text-gray-600'>
              Are you sure you want to delete{' '}
              <span className='font-bold'>{tokenToDelete.name}</span>?
            </p>
            <div className='flex justify-center gap-4'>
              <button className='px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700'>
                Cancel
              </button>
              <button
                className='px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white'
                onClick={() => {
                  handleDeleteToken(tokenToDelete.id);
                  setTokenToDelete(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Wallet;

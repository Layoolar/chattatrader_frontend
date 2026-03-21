import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../reuseables/button';
import { FaTimes, FaSearch, FaInfoCircle } from 'react-icons/fa';
import { getUserBalance } from '../../api/balances';
import { useAuth } from '../../context/AuthContext';
// import { buyToken, sellToken } from '../../api/trading';
import type { TokenItem } from '../wallet/types';
import type { TokenData } from '../discovery/types';
import { getTokenDetails } from '../../api/transactions';

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-black/30 flex justify-center items-center z-50'>
      <div className='bg-white max-h-[80vh] overflow-y-auto rounded-xl p-4 sm:p-6 w-full max-w-sm shadow-lg space-y-4 mx-4 relative'>
        <div className='flex justify-between items-center'>
          <h2 className='text-base sm:text-lg font-semibold'>{title}</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 focus:outline-none'
            aria-label='Close modal'
          >
            <FaTimes className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Trading() {
  const { user } = useAuth();
  const [balances, setBalances] = useState<TokenItem[]>([]);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [buyMode, setBuyMode] = useState<0 | 1>(1);

  // Buy mode states
  const [contractAddress, setContractAddress] = useState('');
  const [tokenInfo, setTokenInfo] = useState<{
    chain: string;
    token: TokenData;
  } | null>(null);
  const [fetchingTokenInfo, setFetchingTokenInfo] = useState(false);
  const [buyAmount, setBuyAmount] = useState('');

  // Sell mode states
  const [selectedToken, setSelectedToken] = useState<TokenItem | null>(null);
  const [sellPercentage, setSellPercentage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user balances
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.id) return;

        const balanceData = await getUserBalance(user.id);
        const allTokens = [
          ...balanceData.base.tokens,
          ...balanceData.sol.tokens,
          ...balanceData.eth.tokens,
        ];
        setBalances(allTokens);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [user?.id]);

  // Fetch token info when contract address is entered
  const handleContractAddressChange = async (address: string) => {
    setContractAddress(address);
    setTokenInfo(null);

    if (address.length > 40) {
      // Basic address length check
      setFetchingTokenInfo(true);
      try {
        const info = await getTokenDetails(address);
        setTokenInfo(info.data);
        setErrors((prev) => ({ ...prev, contractAddress: '' }));
      } catch (error) {
        console.error('Error fetching token info:', error);
        setErrors((prev) => ({
          ...prev,
          contractAddress: 'Invalid contract address or token not found',
        }));
      } finally {
        setFetchingTokenInfo(false);
      }
    }
  };

  // Filter tokens for sell modal
  const filteredTokens = balances.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Validation
  const validateBuy = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!contractAddress) {
      newErrors.contractAddress = 'Contract address is required';
    } else if (!tokenInfo) {
      newErrors.contractAddress = 'Please enter a valid contract address';
    }

    if (!buyAmount || parseFloat(buyAmount) <= 0) {
      newErrors.buyAmount = 'Enter a valid USD amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSell = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!selectedToken) {
      newErrors.selectedToken = 'Please select a token to sell';
    }

    if (
      !sellPercentage ||
      parseFloat(sellPercentage) <= 0 ||
      parseFloat(sellPercentage) > 100
    ) {
      newErrors.sellPercentage = 'Enter a valid percentage (1-100)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }; // Handle buy submission
  const handleBuySubmit = async () => {
    if (!validateBuy() || !tokenInfo) return;

    setIsSubmitting(true);
    try {
      // const _response = await buyToken({
      //   amountInUsd: buyAmount,
      //   tokenAddress: contractAddress,
      // });

      toast.success(`Bought $${buyAmount} worth of ${tokenInfo.token.symbol}`);

      // Reset form
      setContractAddress('');
      setTokenInfo(null);
      setBuyAmount('');
      setErrors({});
    } catch (error) {
      console.error('Buy error:', error);
      toast.error('Buy failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  // Handle sell submission
  const handleSellSubmit = async () => {
    if (!validateSell() || !selectedToken) return;

    setIsSubmitting(true);
    try {
      // const response = await sellToken({
      //   percentage: sellPercentage,
      //   tokenAddress: selectedToken.address,
      // });

      const tokensToSell =
        (selectedToken.balance * parseFloat(sellPercentage)) / 100;
      toast.success(
        `Sold ${tokensToSell.toFixed(6)} ${selectedToken.symbol} (${sellPercentage}%)`
      );

      // Reset form
      setSelectedToken(null);
      setSellPercentage('');
      setSellModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error('Sell error:', error);
      toast.error('Sell failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className='relative bg-gray-50 text-gray-900 overflow-hidden min-h-screen'>
      <div className='absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-white z-0' />

      <div className='relative z-10 px-4 py-2 sm:py-4'>
        <div className='max-w-md mx-auto'>
          <h1 className='text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-center'>
            Manual Trading
          </h1>

          <div className='bg-white p-4 sm:p-6 rounded-2xl shadow-xl space-y-4 sm:space-y-6 border border-gray-200'>
            {/* Buy/Sell Toggle */}
            <div className='flex gap-2 bg-gray-100 p-1 rounded-lg'>
              <button
                onClick={() => setBuyMode(1)}
                className={`flex-1 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  buyMode === 1
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setBuyMode(0)}
                className={`flex-1 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  buyMode === 0
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sell
              </button>
            </div>

            {/* Buy Mode */}
            {buyMode === 1 && (
              <div className='space-y-4'>
                <div>
                  <label className='block text-xs sm:text-sm font-medium mb-1'>
                    Contract Address
                  </label>{' '}
                  <input
                    type='text'
                    placeholder='Paste token contract address...'
                    value={contractAddress}
                    onChange={(e) =>
                      handleContractAddressChange(e.target.value)
                    }
                    className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008080]'
                  />
                  {errors.contractAddress && (
                    <div className='text-red-500 text-sm mt-1'>
                      {errors.contractAddress}
                    </div>
                  )}
                </div>
                {/* Token Info Display */}
                {fetchingTokenInfo && (
                  <div className='bg-gray-50 p-3 rounded-md flex items-center gap-2'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-[#008080]'></div>
                    <span className='text-sm text-gray-600'>
                      Fetching token info...
                    </span>
                  </div>
                )}
                {tokenInfo && (
                  <div className='bg-[#f0fdfa] p-3 rounded-md border border-[#99f6e4]'>
                    <div className='flex items-center gap-2 mb-2'>
                      <FaInfoCircle className='text-[#008080]' />
                      <span className='font-medium text-[#134e4a]'>
                        Token Information
                      </span>
                    </div>
                    <div className='space-y-1 text-sm'>
                      <div>
                        <span className='font-medium'>Name:</span>{' '}
                        {tokenInfo.token.name}
                      </div>
                      <div>
                        <span className='font-medium'>Symbol:</span>{' '}
                        {tokenInfo.token.symbol}
                      </div>
                      <div>
                        <span className='font-medium'>Price:</span> $
                        {tokenInfo.token.price.toLocaleString()}
                      </div>
                      <div>
                        <span className='font-medium'>Chain:</span>{' '}
                        {tokenInfo.chain}
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <label className='block text-xs sm:text-sm font-medium mb-1'>
                    Amount (USD)
                  </label>{' '}
                  <input
                    type='number'
                    placeholder='Enter USD amount...'
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008080]'
                  />
                  {errors.buyAmount && (
                    <div className='text-red-500 text-sm mt-1'>
                      {errors.buyAmount}
                    </div>
                  )}
                </div>{' '}
                <Button
                  onClick={handleBuySubmit}
                  disabled={isSubmitting || !tokenInfo}
                  className='w-full bg-[#008080] hover:bg-[#006666] text-white py-2 rounded-md'
                >
                  {isSubmitting ? 'Processing...' : 'Buy Now'}
                </Button>
              </div>
            )}

            {/* Sell Mode */}
            {buyMode === 0 && (
              <div className='space-y-4'>
                <div>
                  <label className='block text-xs sm:text-sm font-medium mb-1'>
                    Select Token to Sell
                  </label>
                  <button
                    onClick={() => setSellModalOpen(true)}
                    className='w-full p-2 bg-gray-100 text-gray-900 rounded-md border border-gray-300 text-left'
                  >
                    {selectedToken
                      ? `${selectedToken.name} (${selectedToken.symbol})`
                      : 'Select token from your balance...'}
                  </button>
                  {errors.selectedToken && (
                    <div className='text-red-500 text-sm mt-1'>
                      {errors.selectedToken}
                    </div>
                  )}{' '}
                  {selectedToken && (
                    <div className='text-xs text-gray-500 mt-1'>
                      Balance: {selectedToken.balance.toFixed(4)}{' '}
                      {selectedToken.symbol}
                    </div>
                  )}
                </div>

                <div>
                  <label className='block text-xs sm:text-sm font-medium mb-1'>
                    Percentage to Sell (%)
                  </label>{' '}
                  <input
                    type='number'
                    placeholder='Enter percentage (1-100)...'
                    value={sellPercentage}
                    onChange={(e) => setSellPercentage(e.target.value)}
                    min='1'
                    max='100'
                    className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008080]'
                  />
                  {errors.sellPercentage && (
                    <div className='text-red-500 text-sm mt-1'>
                      {errors.sellPercentage}
                    </div>
                  )}
                  {selectedToken && sellPercentage && (
                    <div className='text-xs font-medium text-gray-700 mt-1'>
                      Will sell:{' '}
                      {(
                        (selectedToken.balance * parseFloat(sellPercentage)) /
                        100
                      ).toFixed(4)}{' '}
                      {selectedToken.symbol}
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSellSubmit}
                  disabled={isSubmitting || !selectedToken}
                  className='w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md'
                >
                  {isSubmitting ? 'Processing...' : 'Sell Now'}
                </Button>
              </div>
            )}

            {/* Sell Token Selection Modal */}
            <Modal
              open={sellModalOpen}
              title='Select Token to Sell'
              onClose={() => setSellModalOpen(false)}
            >
              <div className='relative'>
                <FaSearch className='absolute left-3 top-2.5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search tokens...'
                  className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className='max-h-60 overflow-y-auto space-y-2'>
                {filteredTokens.length === 0 ? (
                  <div className='text-center text-gray-500 py-4'>
                    {searchTerm
                      ? 'No tokens found'
                      : 'No tokens in your balance'}
                  </div>
                ) : (
                  filteredTokens.map((token) => (
                    <button
                      key={`${token.symbol}-${token.chain}`}
                      onClick={() => {
                        setSelectedToken(token);
                        setSellModalOpen(false);
                        setSearchTerm('');
                        setErrors((prev) => ({ ...prev, selectedToken: '' }));
                      }}
                      className='w-full text-left p-3 hover:bg-gray-100 rounded-md border border-gray-200'
                    >
                      <div className='flex justify-between items-start'>
                        <div>
                          <div className='font-medium text-sm'>
                            {token.name} ({token.symbol})
                          </div>
                          <div className='text-xs text-gray-500 mt-1'>
                            {token.chain.charAt(0).toUpperCase() +
                              token.chain.slice(1)}
                          </div>
                        </div>{' '}
                        <div className='text-right'>
                          <div className='text-sm font-medium'>
                            {token.balance.toFixed(4)}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

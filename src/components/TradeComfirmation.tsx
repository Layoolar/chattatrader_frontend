import React, { useState } from 'react';
import {
  FaSyncAlt,
  FaRegCopy,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

import LoadingSpinner from '../reuseables/BtnLoader';

type Res = {
  success: boolean;
  hash: string;
  message: string;
};

type TradeConfirmationProps = {
  action: 'buy' | 'sell' | '';
  amount: number;
  token: string;
  address: string;
  hash?: string;
  success: boolean;
  isCompleted: boolean;
  onConfirm: () => Promise<Res>;
  onCancel: () => void;
};

const TradeConfirmation: React.FC<TradeConfirmationProps> = ({
  action,
  amount,
  token,
  address,
  onConfirm,
  onCancel,
  isCompleted,
  hash,
  success,
}) => {
  const [copyIconSwitch, setCopyIconSwitch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [res, setRes] = useState<Res>();

  const copyToClipboard = () => {
    setCopyIconSwitch(true);
    navigator.clipboard.writeText(address);
    setTimeout(() => {
      setCopyIconSwitch(false);
    }, 3000);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await onConfirm();
      setRes(res);
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setLoading(false);
      setShowResult(true);
    }
  };

  const containerClass =
    'border rounded-xl p-4 w-[80%] max-w-sm shadow-md ml-0';

  if (isCompleted && success) {
    return (
      <div className={containerClass}>
        <div className='flex items-center justify-center text-xl font-semibold mb-3 gap-2'>
          <FaCheckCircle className='text-green-500' />
          Trade Successful
        </div>
        <p className='text-gray-500 mb-3 text-center'>
          You{' '}
          <span className='inline-block bg-orange-400 text-white px-2 py-0.5 rounded font-semibold text-sm'>
            {action === 'buy' ? ' Bought ' : ' Sold '}
          </span>{' '}
          {action === 'buy'
            ? `$${amount} of ${token}`
            : `${amount} % of your ${token} tokens`}
        </p>
        <div className='bg-teal-900 p-3 rounded-md text-white mb-4'>
          <div className='text-sm mb-2 text-center'>Transaction Hash</div>
          <div className='flex items-center justify-between bg-white text-black rounded-md px-3 py-2'>
            <a
              href={
                address.startsWith('0x')
                  ? `https://etherscan.io/tx/${hash}`
                  : hash
              }
              target='_blank'
              rel='noopener noreferrer'
              className='truncate text-sm underline'
            >
              {hash}
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted && !success) {
    return (
      <div className={containerClass}>
        <div className='flex items-center justify-center text-xl font-semibold mb-3 gap-2'>
          <FaTimesCircle className='text-red-500' />
          Trade Failed
        </div>
        <p className='text-gray-500 mb-3 text-center'>
          Unfortunately, your trade to{' '}
          <span className='inline-block bg-orange-400 text-white px-2 py-0.5 rounded font-semibold text-sm'>
            {action}
          </span>{' '}
          {action === 'buy'
            ? `$${amount} of ${token}`
            : `${amount}% of your ${token} tokens `}
          did not complete successfully.
        </p>
        {hash && (
          <div className='bg-red-900 p-3 rounded-md text-white mb-4'>
            <div className='text-sm mb-2 text-center'>Transaction Hash</div>
            <div className='flex items-center justify-between bg-white text-black rounded-md px-3 py-2'>
              <a
                href={
                  address.startsWith('0x')
                    ? `https://etherscan.io/tx/${hash}`
                    : hash
                }
                target='_blank'
                rel='noopener noreferrer'
                className='truncate text-sm underline'
              >
                {hash}
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className='flex items-center justify-center text-xl font-semibold mb-3 gap-2'>
        <FaSyncAlt className='text-orange-500' />
        Trade Confirmation
      </div>
      <p className='text-gray-500 mb-3 text-center'>
        Are you sure you want to{' '}
        <span className='inline-block bg-orange-400 text-white px-2 py-0.5 rounded font-semibold text-sm'>
          {action}
        </span>{' '}
        ${amount} of {token}?
      </p>
      <div className='bg-teal-900 p-3 rounded-md text-white mb-4'>
        <div className='text-sm mb-2'>Address</div>
        <div className='flex items-center justify-between bg-white text-black rounded-md px-3 py-2'>
          <span className='truncate text-sm'>{address}</span>
          <button onClick={copyToClipboard} title='Copy address'>
            {copyIconSwitch ? (
              <FaCheckCircle className='text-green-400' />
            ) : (
              <FaRegCopy className='text-gray-600 hover:text-black' />
            )}
          </button>
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center'>
          <LoadingSpinner color='text-red' />
        </div>
      ) : showResult ? (
        <div className='flex flex-col items-center gap-3'>
          <div
            className={`flex items-center gap-2 text-lg font-medium ${
              isSuccess ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isSuccess ? (
              <>
                <FaCheckCircle />
                <span>{res?.message}</span>
                <a
                  href={
                    address.startsWith('0x')
                      ? `https://etherscan.io/tx/${res?.hash}`
                      : hash
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                  className='truncate text-sm underline'
                >
                  {res?.hash}
                </a>
              </>
            ) : (
              <>
                <FaTimesCircle />
                <span>Trade Failed</span>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className='flex justify-between'>
          <button
            onClick={handleConfirm}
            className='bg-orange-400 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-500 transition-all'
          >
            Yes, I'm Sure
          </button>
          <button onClick={onCancel} className='text-gray-600 hover:underline'>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TradeConfirmation;

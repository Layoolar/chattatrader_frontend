import { useState } from 'react';
import { FaDiscord, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { CopyButton } from '../../reuseables/CopyButton';
import PasswordSection from './components/PasswordChange';
import { ExportKeys } from './components/ExportKeys';
import ProfileSection from './components/ProfileSection';

type AuthOption = {
  label: string;
  onClick: () => void;
};

type SocialConnection = {
  name: string;
  icon: React.ReactNode;
};

const Settings = () => {
  const [ethPrivateKey, setEthPrivateKey] = useState('');
  const [solPrivateKey, setSolPrivateKey] = useState('');
  const [activeModal, setActiveModal] = useState<
    null | 'verification' | 'sms' | 'email' | 'password' | 'privateKey'
  >(null);

  const SOCIAL_CONNECTIONS: SocialConnection[] = [
    { name: 'Twitter', icon: <FaTwitter className='text-[#1DA1F2]' /> },
    { name: 'Telegram', icon: <FaTelegram className='text-[#0088CC]' /> },
    { name: 'Discord', icon: <FaDiscord className='text-[#5865F2]' /> },
    { name: 'WhatsApp', icon: <FaWhatsapp className='text-[#25D366]' /> },
  ];

  const authOptions: AuthOption[] = [
    {
      label: 'Authenticator',
      onClick: () => setActiveModal('verification'),
    },
    {
      label: 'SMS Verification',
      onClick: () => setActiveModal('sms'),
    },
    {
      label: 'Email Verification',
      onClick: () => setActiveModal('email'),
    },
  ];

  const Modal = ({
    title,
    children,
    onClose,
  }: {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
  }) => (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-xl'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <FaXmark className='w-5 h-5' />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
  return (
    <div className='min-h-full bg-gray-50'>
      <div className='w-full max-w-4xl mx-auto p-4 sm:p-6 pb-8'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4 md:mb-8 text-center'>
          Account Settings
        </h1>
        {/* Top Section */}
        <div className='flex flex-col lg:flex-row gap-8 mb-8'>
          {/* Profile Section */}
          <ProfileSection />

          {/* Password Section */}
          <PasswordSection />
        </div>{' '}
        {/* Middle Section */}
        <div className='flex flex-col lg:flex-row gap-8 mb-8'>
          <ExportKeys
            setEthPrivateKey={setEthPrivateKey}
            setSolPrivateKey={setSolPrivateKey}
            setActiveModal={() => setActiveModal('privateKey')}
          />
          {/* 2FA Section */}
          <div className='w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-sm'>
            <div className='flex flex-wrap items-center gap-3 mb-6'>
              <h2 className='text-base sm:text-xl font-semibold text-gray-800 min-w-0'>
                Two-Factor Auth
              </h2>
              <span className='px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full'>
                Coming Soon
              </span>
            </div>

            <div className='space-y-3'>
              {authOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={option.onClick}
                  className='w-full text-left border border-gray-200 hover:border-[#007b83]/50 hover:bg-[#007b83]/5 text-gray-700 py-2.5 px-4 rounded-lg transition-colors'
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Private Key Section */}
        </div>
        {/* Social Section */}
        <div className='bg-white p-6 rounded-xl shadow-sm mb-8'>
          <div className='flex flex-wrap items-center gap-3 mb-6'>
            <h2 className='text-base sm:text-xl font-semibold text-gray-800 min-w-0'>
              Social Connections
            </h2>
            <span className='px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full'>
              Coming Soon
            </span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {SOCIAL_CONNECTIONS.map((social, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors'
              >
                <div className='flex items-center gap-3'>
                  <span className='text-lg'>{social.icon}</span>
                  <span className='text-gray-700'>{social.name}</span>
                </div>
                <div className='w-12 h-6 bg-gray-200 rounded-full relative cursor-not-allowed'>
                  <div className='w-5 h-5 bg-white absolute left-0.5 top-0.5 rounded-full shadow-sm'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>{' '}
      {/* Modals */}
      {activeModal === 'privateKey' && (
        <Modal title='Your Private Keys' onClose={() => setActiveModal(null)}>
          <div className='space-y-4'>
            {/* ETH Private Key */}
            <div>
              <h4 className='text-sm font-medium text-gray-700 mb-2'>
                Ethereum Private Key
              </h4>
              <div className='p-3 bg-gray-50 rounded-lg'>
                <div className='flex items-start justify-between gap-3'>
                  <p className='font-mono text-xs break-all bg-white p-3 rounded flex-1'>
                    {ethPrivateKey || 'No ETH private key available'}
                  </p>
                  <CopyButton text={ethPrivateKey} />
                </div>
              </div>
            </div>

            {/* SOL Private Key */}
            <div>
              <h4 className='text-sm font-medium text-gray-700 mb-2'>
                Solana Private Key
              </h4>
              <div className='p-3 bg-gray-50 rounded-lg'>
                <div className='flex items-start justify-between gap-3'>
                  <p className='font-mono text-xs break-all bg-white p-3 rounded flex-1'>
                    {solPrivateKey || 'No SOL private key available'}
                  </p>
                  <CopyButton text={solPrivateKey} />
                </div>
              </div>
            </div>
          </div>

          <p className='text-xs text-orange-600 mt-4'>
            <strong>Warning:</strong> Keep these keys secure. Anyone with these
            keys can access your wallets.
          </p>
        </Modal>
      )}
      {/* Other modals would go here */}
    </div>
  );
};

export default Settings;

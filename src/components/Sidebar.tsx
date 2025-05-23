import { useState } from 'react';
import {
  FaWallet,
  FaCog,
  FaSignOutAlt,
  FaHistory,
  FaSearch,
  FaChartLine,
  FaCompass,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  {
    label: 'Discover',
    icon: <FaSearch className='inline' />,
    path: '/discover',
  },
  { label: 'Chat', icon: <FaMessage className='inline' />, path: '/chat' },
  { label: 'Wallet', icon: <FaWallet className='inline' />, path: '/wallet' },
  {
    label: 'Explore',
    icon: <FaCompass className='inline' />,
    path: '/explore',
  },
  { label: 'Trade', icon: <FaChartLine className='inline' />, path: '/trade' },
  {
    label: 'History',
    icon: <FaHistory className='inline' />,
    path: '/history',
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogout = () => logout();

  return (
    <>
      <aside
        className={`w-64 h-screen fixed md:relative z-40 p-4 flex flex-col justify-between
    bg-white/10 backdrop-blur-lg rounded-r-xl shadow-lg transition-all duration-300 ease-in-out
    ${isOpen ? 'left-0' : '-left-64 md:left-0'}`}
      >
        <div>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-bold text-orange-500'>
              Chatta<span className='text-cyan-600'>Trader</span>
            </h1>
            <button
              className='md:hidden p-2 text-gray-700 hover:text-cyan-600'
              onClick={toggleSidebar}
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          <nav className='flex flex-col gap-1'>
            {navLinks.map(({ label, icon, path }) => {
              const isActive =
                label === 'Discover'
                  ? currentPath === '/' ||
                    currentPath.toLowerCase() === '/discover'
                  : currentPath.toLowerCase() === path;

              return (
                <Link
                  key={label}
                  to={path}
                  className={`flex items-center gap-2 text-sm px-4 py-3 rounded transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#007b83] text-white shadow-md'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {icon}
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className='mt-6'>
          <hr className='my-4 border-gray-200' />

          <button className='flex items-center gap-2 text-sm text-gray-700 hover:text-cyan-600 px-3 py-2 w-full'>
            <FaCog /> Settings
          </button>
          <button
            onClick={handleLogout}
            className='flex items-center gap-2 text-sm text-gray-700 hover:text-red-500 px-3 py-2 w-full'
          >
            <FaSignOutAlt /> Logout
          </button>

          <div className='flex items-center gap-2 mt-4 px-3'>
            <div className='w-8 h-8 bg-cyan-600 text-white flex items-center justify-center rounded-full text-sm font-semibold'>
              {user?.username?.charAt(0).toUpperCase() || 'M'}
            </div>
            <div className='text-xs text-gray-600'>
              <p className='font-semibold'>
                {user?.username || 'Michael Smith'}
              </p>
              <p>{user?.email || 'michaelsmith123@gmail.com'}</p>
            </div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className='md:hidden fixed inset-0 bg-auto bg-opacity-30 z-30'
          onClick={toggleSidebar}
        />
      )}

      {!isOpen && (
        <button
          className='md:hidden fixed top-2 left-2 z-50 p-2 bg-[#007b83] text-white rounded'
          onClick={toggleSidebar}
        >
          <FaBars size={17} />
        </button>
      )}
    </>
  );
}

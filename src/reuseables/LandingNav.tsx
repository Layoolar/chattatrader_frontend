import React, { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

import { Menu } from 'lucide-react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

interface Route {
  href: string;
  label: string;
}

const routeList: Route[] = [
  { href: '/', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
  { href: '/trading', label: 'Trading' },
];

const LandingNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  return (
    <header className='sticky border-b-[1px] top-0 z-40 w-full bg-white border-gray-200 text-gray-900'>
      <NavigationMenu className='mx-auto'>
        <NavigationMenuList className='container h-14 px-8 w-screen flex items-center justify-between max-w-none'>
          <NavigationMenuItem className='font-bold flex-shrink-0 ml-0'>
            <a
              rel='noreferrer noopener'
              href='/'
              className='flex items-center gap-2 text-gray-900 hover:text-gray-600'
            >
              <img src={logo} alt='ChattaTrader Logo' className='h-8 w-8' />
              <span className='text-xl font-bold'>ChattaTrader</span>
            </a>
          </NavigationMenuItem>

          {/* Desktop Navigation */}
          <NavigationMenuItem className='hidden md:flex items-center gap-8 ml-auto'>
            {routeList.map(({ href, label }) => (
              <a
                rel='noreferrer noopener'
                key={label}
                href={href}
                className='text-gray-600 hover:text-gray-900 transition-colors'
              >
                {label}
              </a>
            ))}
            <button
              onClick={handleSignUpClick}
              className='px-4 py-2 bg-gradient-to-r from-[#008080] to-[#ff9500] text-white rounded-md hover:opacity-90 transition-opacity'
            >
              Sign Up
            </button>
          </NavigationMenuItem>

          {/* mobile */}
          <span className='flex md:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className='px-2'>
                <Menu
                  className='flex md:hidden h-5 w-5 text-gray-900'
                  onClick={() => setIsOpen(true)}
                  aria-label='Open Menu'
                />
              </SheetTrigger>

              <SheetContent side='left' className='bg-white'>
                <SheetHeader>
                  <SheetTitle className='font-bold text-xl text-gray-900'>
                    ChattaTrader
                  </SheetTitle>
                </SheetHeader>{' '}
                <nav className='flex flex-col justify-center items-center gap-2 mt-4'>
                  {routeList.map(({ href, label }) => (
                    <a
                      rel='noreferrer noopener'
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className='w-full text-center py-2 text-gray-900 hover:bg-gray-100 rounded-md transition-colors'
                    >
                      {label}
                    </a>
                  ))}

                  <button
                    onClick={handleSignUpClick}
                    className='px-4 py-2 bg-gradient-to-r from-[#008080] to-[#ff9500] text-white rounded-md hover:opacity-90 transition-opacity w-full'
                  >
                    Sign Up
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </span>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default LandingNav;

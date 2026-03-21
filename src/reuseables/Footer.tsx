import React from 'react';
import {
  TwitterLogoIcon,
  InstagramLogoIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { FaFacebook } from 'react-icons/fa';

const Footer: React.FC = () => {
  const navLinks: string[] = [
    'Product',
    'Features',
    'Pricing',
    'Resources',
    'Help',
    'Privacy',
  ];

  const socialLinks: string[] = [
    'Facebook',
    'Twitter',
    'Instagram',
    'GitHub',
    'LinkedIn',
  ];

  return (
    <footer id='footer' className='py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Move nav links to the bottom border */}
        <div className='border-t border-gray-200 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            {/* Nav Links */}
            <div className='flex flex-col md:flex-row md:space-x-8 text-center md:text-left order-2 md:order-1'>
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={`/#${link.toLowerCase()}`}
                  className='text-gray-500 hover:text-gray-800 transition-colors py-2 md:py-0 text-sm'
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className='flex justify-center space-x-4 mb-4 md:mb-0 order-1 md:order-2'>
              {socialLinks.map((social, index) => {
                const url = `https://${social.toLowerCase()}.com/chattatrader`;
                return (
                  <a
                    key={index}
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-500 hover:text-gray-700 transition-colors'
                  >
                    {social === 'Facebook' && <FaFacebook size={20} />}
                    {social === 'Twitter' && (
                      <TwitterLogoIcon className='w-5 h-5' />
                    )}
                    {social === 'Instagram' && (
                      <InstagramLogoIcon className='w-5 h-5' />
                    )}
                    {social === 'GitHub' && (
                      <GitHubLogoIcon className='w-5 h-5' />
                    )}
                    {social === 'LinkedIn' && (
                      <LinkedInLogoIcon className='w-5 h-5' />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Copyright */}
          <p className='text-center md:text-left text-sm text-gray-500 mt-4'>
            © {new Date().getFullYear()} BB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

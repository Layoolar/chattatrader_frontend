import React from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from '../reuseables/Loader';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='text-center'>
          <Loader />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;

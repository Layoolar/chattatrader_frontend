import { createContext, useContext, useState, type ReactNode } from 'react';
import { type User } from './types';

type AuthContextType = {
  user: Partial<User> | null;
  login: (user: Partial<User>) => void;
  logout: () => void;
  verifyOtp: (payload: { code: string; email: string}) => Promise<void>;
 getUserDetails: () => Promise<Partial<User> | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Partial<User> | null>(null);

  const login = (userData: Partial<User>) => setUser(userData);
  const logout = () => setUser(null);

  
  // const verifyOtp = async (payload: { code: string; email: string }) => {
  //   await verifyOTPApi(payload); 
  // };

   // Implementation for getting user details
  const getUserDetails = async () => {
    try {
      const userDetails = await getUserDetailsApi();
      setUser(userDetails);
      return userDetails;
    } catch {
      setUser(null);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

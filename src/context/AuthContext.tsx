import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { type User } from './types';
import { getUserWithToken, logout as logoutAPI } from '../api/auth';

type AuthContextType = {
  user: Partial<User> | null;
  login: (userData: { userWithoutPassword: Partial<User> }) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing authentication via cookies on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserWithToken();
        // If successful, user is authenticated
        setUser(userData.userWithoutPassword);
        setIsAuthenticated(true);
      } catch (error) {
        // If failed, user is not authenticated (no valid cookie)
        ('No valid authentication found');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData: { userWithoutPassword: Partial<User> }) => {
    setIsAuthenticated(true);
    setUser(userData.userWithoutPassword);
  };
  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      await logoutAPI();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isLoading }}
    >
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

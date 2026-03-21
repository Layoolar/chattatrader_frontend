// This is a temporary mock authentication system
// Remove this file when connecting to real backend

const MOCK_USER_KEY = 'mock_authenticated_user';

export const mockAuth = {
  isAuthenticated: (): boolean => {
    return localStorage.getItem(MOCK_USER_KEY) !== null;
  },

  login: (email: string): void => {
    const mockUser = {
      id: '1',
      email,
      name: 'Test User',
    };
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
  },

  logout: (): void => {
    localStorage.removeItem(MOCK_USER_KEY);
  },

  getUser: () => {
    const userData = localStorage.getItem(MOCK_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },
};
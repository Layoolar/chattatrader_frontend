export interface User {
  id: string;
  username: string;
  email: string;
  [key: string]: any;
  password: string;
  walletAddress: string;
  ethPrivateKey: string;
  ethMnemonic: string;
  baseholding: {
    address: string;
    chain: string;
    name: string;
    symbol: string;
  }[];
  ethholding: {
    address: string;
    chain: string;
    name: string;
    symbol: string;
  }[];
  solholding: {
    address: string;
    chain: string;
    name: string;
    symbol: string;
  }[];
  solWalletAddress: string;
  solPrivateKey: string;
  solMnemonic: string;
  isVerified: boolean;
  chats?: any;
  token?: string;
  // transactionHistory:{type:""}{}
}


export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
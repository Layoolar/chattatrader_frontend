export type WalletData = {
  nativeTokenAmount: number;
  nativeTokenBalanceUsd: number;
  totalUsd: number;
  tokens: TokenItem[];
};

export type TokenItem = {
  address: string;
  balance: number;
  chain: string;
  name: string;
  symbol: string;
  price: number;
  valueUsd: number;
};

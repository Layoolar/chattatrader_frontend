export type Transaction = {
  userId: string;
  id: string;
  type: 'Buy' | 'Sell' | 'Transfer';
  chain: string;
  status: 'Successful' | 'Failed' | 'Pending';
  date: Date;
  tokenIn: TransactionToken;
  tokenOut: TransactionToken;
  hash: string;
};
export type TradeType = 'Buy' | 'Sell' | 'Transfer';
export type TradeStatus = 'Successful' | 'Failed' | 'Pending';

export const defaultTrades: Transaction[] = [
  {
    userId: 'user123',
    id: 'tx1',
    type: 'Buy',
    status: 'Successful',
    chain: 'Solana',
    date: new Date('2023-10-02T12:00:00Z'),
    tokenIn: {
      name: 'Tether USD',
      address: '0xusdt',
      symbol: 'USDT',
      decimals: 6,
      amount: '1200',
    },
    tokenOut: {
      name: 'Solana',
      address: '0xsol',
      symbol: 'SOL',
      decimals: 9,
      amount: '42',
    },
    hash: '0xabc123',
  },
  {
    userId: 'user123',
    id: 'tx2',
    type: 'Sell',
    status: 'Failed',
    chain: 'Bitcoin',
    date: new Date('2023-10-02T12:00:00Z'),
    tokenIn: {
      name: 'Bitcoin',
      address: '0xbtc',
      symbol: 'BTC',
      decimals: 8,
      amount: '0.03',
    },
    tokenOut: {
      name: 'USD Coin',
      address: '0xusdc',
      symbol: 'USDC',
      decimals: 6,
      amount: '1200',
    },
    hash: '0xdef456',
  },
  {
    userId: 'user123',
    id: 'tx3',
    type: 'Sell',
    status: 'Pending',
    chain: 'Solana',
    date: new Date('2023-10-02T12:00:00Z'),
    tokenIn: {
      name: 'Solana',
      address: '0xsol',
      symbol: 'SOL',
      decimals: 9,
      amount: '50',
    },
    tokenOut: {
      name: 'Ethereum',
      address: '0xeth',
      symbol: 'ETH',
      decimals: 18,
      amount: '0.2',
    },
    hash: '0xghi789',
  },
  // Repeat for the rest...
];

export type TransactionToken = {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  amount: string;
};

export const MessageType = {
  TEXT: 'text',
  TOKEN_INFO: 'token_info',
  TRADE_EXECUTION: 'trade_execution',
  SEARCH_RESULTS: 'search_results',
  AUDIO: 'audio',
  IMAGE: 'image',
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];

export interface TradeData {
  id?: string;
  hash?: string;
  type: 'buy' | 'sell';
  amount: number;
  name: string;
  address: string;
  isCompleted?: boolean;
  success?: boolean;
}

export interface SearchDataItem {
  name: string;
  address: string;
  mcap: number;
}

export interface InfoData {
  name: string;
  chain: string;
  price: string | number;
  mc: string | number;
  liquidity: string | number;
  oneHour: string | number;
  twentyFourHour: string | number;
  address: string;
}

export type Message = {
  role: 'user' | 'assistant';
  chatId: string;
  content: string;
  infoData?: InfoData;
  tradeData?: TradeData;
  searchData?: SearchDataItem[];
  type?: MessageType;
  timestamp: Date;
};

export type Chat = {
  title: string;
  userId: string;
  chatId: string;
  messages: Message[];
};

export const sampleChats: Chat[] = [
  {
    title: 'Ethereum Trading Discussion',
    userId: 'user_456',
    chatId: 'chat_123',
    messages: [
      {
        role: 'user',
        chatId: 'chat_123',
        content: "What's the price of Ethereum today?",
        timestamp: new Date('2023-05-15T10:00:00Z'),
        type: MessageType.TEXT,
      },
      {
        role: 'assistant',
        chatId: 'chat_123',
        content: "Here's the information about Ethereum:",
        infoData: {
          name: 'Ethereum',
          chain: 'Ethereum',
          price: '$1.8k',
          mc: '$216.1b',
          liquidity: '$2.5b',
          oneHour: '0.25%',
          twentyFourHour: '2.75%',
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        },
        type: MessageType.TOKEN_INFO,
        timestamp: new Date('2023-05-15T10:00:05Z'),
      },
      {
        role: 'user',
        chatId: 'chat_123',
        content: 'What about Bitcoin?',
        timestamp: new Date('2023-05-15T10:02:00Z'),
        type: MessageType.TEXT,
      },
      {
        role: 'assistant',
        chatId: 'chat_123',
        content: "Here's the Bitcoin information:",
        infoData: {
          name: 'Bitcoin',
          chain: 'Bitcoin',
          price: '$29.5k',
          mc: '$572b',
          liquidity: '$18.5b',
          oneHour: '-0.15%',
          twentyFourHour: '1.25%',
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        },
        type: MessageType.TOKEN_INFO,
        timestamp: new Date('2023-05-15T10:02:05Z'),
      },
      {
        role: 'user',
        chatId: 'chat_123',
        content: 'Sell 50% of my ETH position',
        timestamp: new Date('2023-05-15T10:05:00Z'),
        type: MessageType.TEXT,
      },
      {
        role: 'assistant',
        chatId: 'chat_123',
        content: "I've executed your trade:",
        tradeData: {
          hash: 'sample',
          type: 'sell',
          amount: 50,
          name: 'Ethereum',
          address: '0x123...abc',
          isCompleted: false,
        },
        type: MessageType.TRADE_EXECUTION,
        timestamp: new Date('2023-05-15T10:05:05Z'),
      },
    ],
  },
  {
    title: 'New Altcoin Research',
    userId: 'user_789',
    chatId: 'chat_456',
    messages: [
      {
        role: 'user',
        chatId: 'chat_456',
        content: 'Research new Layer 2 tokens with good fundamentals',
        timestamp: new Date('2023-06-20T14:30:00Z'),
        type: MessageType.TEXT,
      },
      {
        role: 'assistant',
        chatId: 'chat_123',
        content: "I've executed your trade:",
        tradeData: {
          hash: 'samplehash',
          type: 'sell',
          amount: 50,
          name: 'Ethereum',
          address: '0x123...abc',
          isCompleted: true,
          success: false,
        },
        type: MessageType.TRADE_EXECUTION,
        timestamp: new Date('2023-05-15T10:05:05Z'),
      },
      {
        role: 'assistant',
        chatId: 'chat_456',
        content: 'Here are 3 promising Layer 2 tokens:',
        searchData: [
          {
            name: 'Arbitrum',
            address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
            mcap: 1250000000,
          },
          {
            name: 'Optimism',
            address: '0x4200000000000000000000000000000000000042',
            mcap: 890000000,
          },
        ],
        type: MessageType.SEARCH_RESULTS,
        timestamp: new Date('2023-06-20T14:30:05Z'),
      },
    ],
  },
];

import type { TokenData } from '../pages/discovery/types';
import type { Transaction } from '../pages/History/types';
import instance from './client';

type TokenDetailsResponse = {
  success: Boolean;
  data: {
    chain: string;
    token: TokenData;
  };
};

export const getTransactionHistory = async (
  userId: string
): Promise<Transaction[]> => {
  const res = await instance.get(`/transactions/history?userId=${userId}`);
  return res.data.data;
};

export const getTokenDetails = async (
  contractAddress: string
): Promise<TokenDetailsResponse> => {
  const res = await instance.get(`/tokens/${contractAddress}`);
  return res.data;
};

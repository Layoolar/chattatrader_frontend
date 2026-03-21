import type { WalletData } from '../pages/wallet/types';
import instance from './client';

export type UserBalanceResponse = {
  eth: WalletData;
  sol: WalletData;
  base: WalletData;
};

export const getUserBalance = async (
  userId: string
): Promise<UserBalanceResponse> => {
  const res = await instance.get(`/balances/getuserbalance?userId=${userId}`);
  return res.data.data;
};

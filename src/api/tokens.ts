import instance from './client';

export const getTrendingTokens = async () => {
  const res = await instance.get(`/tokens/trending`);
  return res.data;
};

export const getTokenDetails = async (contractAddress: string) => {
  const res = await instance.get(`/tokens/${contractAddress}`);
  return res.data;
};

export interface PriceData {
  symbol: string;
  price: number;
  change24h?: number;
}

export const getTokenPrices = async (
  symbols: string[]
): Promise<PriceData[]> => {
  const res = await instance.post('/tokens/prices', { symbols });
  return res.data.data;
};

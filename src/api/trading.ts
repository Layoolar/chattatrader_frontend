import instance from './client';

export interface BuyRequest {
  amountInUsd: string;
  tokenAddress: string;
}

export interface SellRequest {
  percentage: string;
  tokenAddress: string;
}

export interface TradeResponse {
  success: boolean;
  message: string;
  data: {
    transactionHash?: string;
    amount?: number;
    price?: number;
  };
}

export const buyToken = async (request: BuyRequest): Promise<TradeResponse> => {
  return instance
    .post<TradeResponse>('/trading/buy', request)
    .then((res) => res.data);
};

export const sellToken = async (
  request: SellRequest
): Promise<TradeResponse> => {
  return instance
    .post<TradeResponse>('/trading/sell', request)
    .then((res) => res.data);
};

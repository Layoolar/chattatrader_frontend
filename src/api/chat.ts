import type { Chat } from '../pages/Chat/types';
import instance from './client';

type CreateChatRequest = {
  userId: string;
};
type GetChatsReponse = { success: boolean; message: string; data: Chat[] };
type GetChatReponse = { success: boolean; message: string; data: Chat };

type CreateChatReponse = { success: boolean; message: string; data: Chat };

export const CreateChatRequest = async (
  data: CreateChatRequest
): Promise<Chat> => {
  return instance
    .post<CreateChatReponse>('/chats/createchat', { userId: data.userId })
    .then((res) => res.data.data);
};

export const getChats = async (userId: string): Promise<Chat[]> => {
  return instance
    .get<GetChatsReponse>('/chats/getchats', {
      params: { userId },
    })
    .then((res) => res.data.data);
};
export const getChatById = async (chatId: string): Promise<Chat> => {
  return instance
    .get<GetChatReponse>('/chats/getchat', {
      params: { chatId },
    })
    .then((res) => res.data.data);
};

export const updateChatTitle = async (
  chatId: string,
  title: string
): Promise<Chat> => {
  return instance
    .put<{ data: Chat }>('/chats/editchat', { chatId, newTitle: title })
    .then((res) => res.data.data);
};

// Trading endpoints with chatId requirement
export interface ChatBuyRequest {
  chatId: string;
  amountInUsd: string;
  tokenAddress: string;
}

export interface ChatSellRequest {
  chatId: string;
  percentage: string;
  tokenAddress: string;
}

export interface ChatTradeResponse {
  success: boolean;
  message: string;
  data: {
    transactionHash?: string;
    amount?: number;
    price?: number;
  };
}

export const buyChatToken = async (
  request: ChatBuyRequest
): Promise<ChatTradeResponse> => {
  return instance
    .post<ChatTradeResponse>('/buy', request)
    .then((res) => res.data);
};

export const sellChatToken = async (
  request: ChatSellRequest
): Promise<ChatTradeResponse> => {
  return instance
    .post<ChatTradeResponse>('/sell', request)
    .then((res) => res.data);
};

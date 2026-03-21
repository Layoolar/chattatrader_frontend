import React from 'react';

import { Avatar } from '../../../reuseables/Avatar';
import TradeConfirmation from '../../../components/TradeComfirmation';
import TokenTable from '../../../components/TokenTable';
import TokenInfoMessage from '../../../components/TokenInfo';
import { MessageType, type Message } from '../types';
import { buyChatToken, sellChatToken } from '../../../api/chat';

interface MessageRendererProps {
  message: Message;
  index: number;
  chatId?: string;
}

export const MessageRenderer: React.FC<MessageRendererProps> = ({
  message,
  index,
  chatId,
}) => {
  const isUser = message.role === 'user';
  const handleTradeConfirm = async () => {
    if (!chatId || !message.tradeData) {
      throw new Error('Missing required data for trade execution');
    }

    try {
      if (message.tradeData.type === 'buy') {
        const response = await buyChatToken({
          chatId,
          amountInUsd: message.tradeData.amount.toString(),
          tokenAddress: message.tradeData.address,
        });

        return {
          hash: response.data.transactionHash || '',
          message: response.message,
          success: response.success,
        };
      } else if (message.tradeData.type === 'sell') {
        const response = await sellChatToken({
          chatId,
          percentage: message.tradeData.amount.toString(),
          tokenAddress: message.tradeData.address,
        });

        return {
          hash: response.data.transactionHash || '',
          message: response.message,
          success: response.success,
        };
      } else {
        throw new Error('Invalid trade type');
      }
    } catch (error) {
      console.error('Trade execution failed:', error);
      throw error;
    }
  };

  if (message.type === MessageType.TRADE_EXECUTION) {
    return (
      <div key={index} className='flex items-start gap-3 mb-4'>
        <Avatar isUser={false} />
        <TradeConfirmation
          action={message.tradeData?.type || ''}
          address={message.tradeData?.address || ''}
          amount={message.tradeData?.amount || 0}
          token={message.tradeData?.name || ''}
          success={message.tradeData?.success || false}
          hash={message.tradeData?.hash || undefined}
          isCompleted={message.tradeData?.isCompleted || false}
          onCancel={() => {}}
          onConfirm={handleTradeConfirm}
        />
      </div>
    );
  }

  if (message.type === MessageType.SEARCH_RESULTS) {
    return (
      <div key={index} className='flex items-start gap-3 mb-4'>
        <Avatar isUser={false} />
        <TokenTable tokens={message.searchData || []} />
      </div>
    );
  }

  if (message.type === MessageType.TOKEN_INFO) {
    return (
      <div key={index} className='flex items-start gap-3 mb-4'>
        <Avatar isUser={false} />
        <TokenInfoMessage token={message.infoData || undefined} />
      </div>
    );
  }

  const messageClasses = `rounded-lg max-w-[85%] sm:max-w-md ${
    isUser ? 'bg-[#007b83] text-white' : 'bg-gray-200 text-gray-800'
  }`;

  const renderMessageContent = () => {
    switch (message.type) {
      case MessageType.AUDIO:
        return (
          <div className={messageClasses}>
            <audio controls src={message.content} className='max-w-full p-1' />
          </div>
        );
      case MessageType.IMAGE:
        return (
          <div className={messageClasses}>
            <img
              src={message.content}
              alt='User uploaded image'
              className='max-w-full max-h-64 rounded p-1'
            />
          </div>
        );
      default:
        return (
          <div className={messageClasses + ' text-base p-3'}>
            {message.content}
          </div>
        );
    }
  };

  return (
    <div
      key={index}
      className={`flex items-start gap-3 mb-4 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <Avatar isUser={isUser} />
      {renderMessageContent()}
    </div>
  );
};

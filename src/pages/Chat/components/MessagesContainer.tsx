import React, { useRef, useEffect } from 'react';

import { MessageRenderer } from './MessageRenderer';
import { AudioPreview } from './AudioPreview';
import type { Message } from '../types';

interface MessagesContainerProps {
  messages: Message[];
  audioBlob: Blob | null;
  onSendAudio: () => void;
  onDeleteAudio?: () => void; // Optional delete audio handler
  chatId?: string;
}

export const MessagesContainer: React.FC<MessagesContainerProps> = ({
  messages,
  audioBlob,
  onSendAudio,
  onDeleteAudio,
  chatId,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }, 50);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, audioBlob]);
  return (
    <div className='flex-1 overflow-y-auto px-2 sm:px-3 flex flex-col custom-scrollbar py-3'>
      <div className='flex-grow'>
        {messages.map((msg, index) => (
          <MessageRenderer
            key={index}
            message={msg}
            index={index}
            chatId={chatId}
          />
        ))}
        {audioBlob && (
          <AudioPreview
            audioBlob={audioBlob}
            onSend={onSendAudio}
            onDelete={onDeleteAudio}
          />
        )}
      </div>
      <div ref={messagesEndRef} className='h-1' />
    </div>
  );
};

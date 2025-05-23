import React from 'react';

interface ChatReplyLoadingProps {
  size?: 'sm' | 'md' | 'lg';
}

const ChatReplyLoading: React.FC<ChatReplyLoadingProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  const containerClasses = {
    sm: 'gap-1',
    md: 'gap-1.5',
    lg: 'gap-2',
  };

  return (
    <div className={`flex items-center ${containerClasses[size]}`}>
      <div
        className={`${sizeClasses[size]} rounded-full bg-[#007b83] animate-bounce`}
        style={{ animationDelay: '0ms' }}
      />
      <div
        className={`${sizeClasses[size]} rounded-full bg-[#007b83] animate-bounce`}
        style={{ animationDelay: '150ms' }}
      />
      <div
        className={`${sizeClasses[size]} rounded-full bg-[#007b83] animate-bounce`}
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
};

export default ChatReplyLoading;

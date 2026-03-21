import React, { useRef } from 'react';
import { FaMicrophone, FaImage, FaStop, FaPaperPlane } from 'react-icons/fa';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSendText: () => void;
  onSendImage: (file: File) => void;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  onSendText,
  onSendImage,
  isRecording,
  onStartRecording,
  onStopRecording,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSendImage(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };
  return (
    <>
      <input
        type='file'
        accept='image/*'
        className='hidden'
        ref={fileInputRef}
        onChange={handleImageUpload}
      />{' '}
      <div className='flex gap-2 w-full bg-white/60 backdrop-blur-md py-3 px-1 flex-shrink-0'>
        <div className='flex-1 min-w-0'>
          <input
            type='text'
            className='w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-0 focus:border-gray-300 text-sm'
            placeholder='Type your message...'
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => e.key === 'Enter' && onSendText()}
            disabled={isRecording}
            // Prevent auto-scroll on focus for iOS
            onFocus={(e) => {
              // Prevent auto-scroll behavior on iOS
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          />
        </div>

        <div className='flex items-center gap-2'>
          <button
            className={`p-3 cursor-pointer rounded-full ${
              isRecording
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700'
            } hover:${
              isRecording ? 'bg-red-700' : 'bg-gray-300'
            } transition-colors duration-200 flex-shrink-0`}
            onClick={isRecording ? onStopRecording : onStartRecording}
          >
            {isRecording ? <FaStop /> : <FaMicrophone />}
          </button>

          <button
            className='bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 transition-colors duration-200 flex-shrink-0 cursor-pointer'
            onClick={triggerImageUpload}
          >
            <FaImage />
          </button>

          <button
            className={`p-3 cursor-pointer rounded-full ${
              input.trim() && !isRecording
                ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } transition-colors duration-200 flex-shrink-0`}
            onClick={onSendText}
            disabled={!input.trim() || isRecording}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </>
  );
};

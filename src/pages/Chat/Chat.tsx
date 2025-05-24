import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { MessageType, sampleChats, type Chat, type Message } from './types';
import {
  FaMicrophone,
  FaImage,
  FaStop,
  FaPaperPlane,
  FaTimes,
  FaComments,
} from 'react-icons/fa';
import { blobToBase64, delay } from './utils';
import TradeConfirmation from '../../components/TradeComfirmation';
import TokenTable from '../../components/TokenTable';
import TokenInfoMessage from '../../components/TokenInfo';
import { Avatar } from '../../reuseables/Avatar';

export default function ChatPage() {
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const [chats] = useState<Chat[]>(sampleChats);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(chats[0]);
  const [messages, setMessages] = useState<Message[]>(currentChat.messages);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (content: string | Blob, type: MessageType) => {
    if (type === 'text' && !content) return;

    const displayContent =
      content instanceof Blob ? URL.createObjectURL(content) : content;

    const newMessage: Message = {
      role: 'user',
      content: displayContent,
      type,
      timestamp: new Date(),
      chatId: currentChat.chatId,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setAudioBlob(null);
    scrollToBottom();

    if (socketRef.current) {
      if (content instanceof Blob) {
        try {
          const base64Content = await blobToBase64(content);
          if (type === MessageType.AUDIO) {
            socketRef.current.emit(
              'audio',
              JSON.stringify({
                ...newMessage,
                content: base64Content,
              })
            );
          } else if (type === MessageType.IMAGE) {
            socketRef.current.emit(
              'image',
              JSON.stringify({
                ...newMessage,
                content: base64Content,
              })
            );
          }
        } catch (error) {
          console.error(`Error converting ${type} to base64:`, error);
        }
      } else {
        socketRef.current.emit('message', JSON.stringify(newMessage));
      }
    }
  };

  const handleSelectChat = (chat: Chat) => {
    setCurrentChat(chat);
    setMessages(chat.messages);
    setIsChatsOpen(false);
    scrollToBottom();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        });
        setAudioBlob(audioBlob);
        scrollToBottom();
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing the microphone:', error);
      alert('Could not access the microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      sendMessage(file, 'image');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSendAudio = () => {
    if (audioBlob) {
      sendMessage(audioBlob, 'audio');
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, audioBlob]);

  useEffect(() => {
    socketRef.current = io('https://api.chattatrader.com', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    socketRef.current.on('response', (data: string) => {
      try {
        const parsedData = JSON.parse(data) as Message;
        setMessages((prev) => [...prev, parsedData]);
      } catch (error) {
        console.error('Error parsing socket response:', error);
      }
    });

    socketRef.current.on('connect_error', (err: Error) => {
      console.error('Connection error:', err);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const renderMessage = (msg: Message, index: number) => {
    const isUser = msg.role === 'user';

    if (msg.type === MessageType.TRADE_EXECUTION) {
      return (
        <div key={index} className='flex items-start gap-3 mb-4'>
          <Avatar isUser={false} />
          <TradeConfirmation
            action={msg.tradeData?.type || ''}
            address={msg.tradeData?.address || ''}
            amount={msg.tradeData?.amount || 0}
            token={msg.tradeData?.name || ''}
            success={msg.tradeData?.success || false}
            hash={msg.tradeData?.hash || undefined}
            isCompleted={msg.tradeData?.isCompleted || false}
            onCancel={() => {}}
            onConfirm={async () => {
              await delay(5000);
              return {
                hash: 'samplehash',
                message: 'Trade Succesful',
                success: true,
              };
            }}
          />
        </div>
      );
    }

    if (msg.type === MessageType.SEARCH_RESULTS) {
      return (
        <div key={index} className='flex items-start gap-3 mb-4'>
          <Avatar isUser={false} />
          <TokenTable tokens={msg.searchData || []} />
        </div>
      );
    }

    if (msg.type === MessageType.TOKEN_INFO) {
      return (
        <div key={index} className='flex items-start gap-3 mb-4'>
          <Avatar isUser={false} />
          <TokenInfoMessage token={msg.infoData || undefined} />
        </div>
      );
    }

    const messageClasses = `rounded-lg max-w-[85%] sm:max-w-md ${
      isUser ? 'bg-[#007b83] text-white' : 'bg-gray-200 text-gray-800'
    }`;

    const renderMessageContent = () => {
      switch (msg.type) {
        case MessageType.AUDIO:
          return (
            <div className={messageClasses}>
              <audio
                controls
                src={msg.content as string}
                className='max-w-full p-1'
              />
            </div>
          );
        case MessageType.IMAGE:
          return (
            <div className={messageClasses}>
              <img
                src={msg.content as string}
                alt='User uploaded image'
                className='max-w-full max-h-64 rounded p-1'
              />
            </div>
          );
        default:
          return (
            <div className={messageClasses + ' text-base p-3'}>
              {msg.content}
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

  return (
    <>
      <button
        className='md:hidden top-2 right-2 mb-4 fixed p-2 bg-[#007b83] text-white rounded hover:bg-cyan-700 z-10'
        onClick={() => setIsChatsOpen(!isChatsOpen)}
      >
        <FaComments size={20} />
      </button>
      <div className='flex h-screen w-screen overflow-hidden'>
        {/* Chat Area - Left */}
        <div className='flex-1 flex flex-col bg-white/20 backdrop-blur-md p-2 sm:p-2 md:p-2'>
          {/* Mobile toggle button for chats panel */}

          {/* Chat Session Title */}
          <div className='sticky top-5 z-10 bg-white border-b border-gray-300 py-2 md:py-4 pb-3'>
            <h2 className='text-lg md:text-xl font-bold text-gray-900 text-center'>
              {currentChat.title}
            </h2>
          </div>

          {/* Messages */}
          <div className='flex-1 overflow-y-auto pr-1 sm:pr-2 flex flex-col custom-scrollbar'>
            {messages.map((msg, index) => renderMessage(msg, index))}
            {audioBlob && (
              <div className='flex items-start gap-3 mb-4 flex-row-reverse'>
                <Avatar isUser={true} />
                <div className='flex items-center gap-2 w-fit bg-[#007b83] rounded-lg p-1'>
                  <audio
                    controls
                    src={URL.createObjectURL(audioBlob)}
                    className='max-w-[180px]'
                  />
                  <button
                    onClick={handleSendAudio}
                    className='p-2 text-white bg-cyan-600 rounded-full hover:bg-cyan-700'
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Hidden file input */}
          <input
            type='file'
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageUpload}
          />

          {/* Input */}
          <div className='mt-4 flex gap-2 w-full'>
            <div className='flex-1 min-w-0'>
              <input
                type='text'
                className='w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-0 focus:border-gray-300 text-sm'
                placeholder='Type your message...'
                value={input}
                onChange={(e: any) => setInput(e.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && sendMessage(input, 'text')
                }
                disabled={isRecording}
              />
            </div>

            <div className='flex items-center gap-2'>
              <button
                className={`p-3 rounded-full ${
                  isRecording
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                } hover:${
                  isRecording ? 'bg-red-700' : 'bg-gray-300'
                } transition-colors duration-200 flex-shrink-0`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
              </button>

              <button
                className='bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 transition-colors duration-200 flex-shrink-0'
                onClick={triggerImageUpload}
              >
                <FaImage />
              </button>

              <button
                className={`p-3 rounded-full ${
                  input.trim() && !isRecording
                    ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                } transition-colors duration-200 flex-shrink-0`}
                onClick={() => sendMessage(input, 'text')}
                disabled={!input.trim() || isRecording}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>

        {/* Chats Panel - Right */}
        <div
          className={`
          fixed top-0 right-0 z-50 h-full w-64 sm:w-72 bg-white/30 backdrop-blur-md p-4 border-l border-gray-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isChatsOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}
        >
          <button
            className='md:hidden self-end mb-4 p-2 bg-cyan-600 text-white rounded hover:bg-cyan-700'
            onClick={() => setIsChatsOpen(false)}
          >
            <FaTimes />
          </button>

          <h2 className='text-xl font-semibold mb-4'>Chats</h2>
          <input
            type='text'
            placeholder='Search chats...'
            className='w-full p-2 mb-4 text-sm rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className='space-y-2 overflow-y-auto flex-1 custom-scrollbar'>
            {chats
              .filter((chat) =>
                chat.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((chat, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectChat(chat)}
                  className={`p-2 rounded cursor-pointer text-sm ${
                    chat === currentChat
                      ? 'bg-cyan-200 font-semibold'
                      : 'text-gray-800 hover:bg-cyan-100'
                  }`}
                >
                  {chat.title}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

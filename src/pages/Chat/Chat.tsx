import { useState, useCallback, useEffect } from 'react';

import { MessageType, type Chat, type Message } from './types';
import { FaComments } from 'react-icons/fa';
import { blobToBase64 } from './utils';
import { useSocket } from './hooks/useSocket';
import { useAudioRecording } from './hooks/useAudio';
import { EmptyState } from './components/EmptyState';
import { MessagesContainer } from './components/MessagesContainer';
import { ChatInput } from './components/ChatInput';
import { ChatPanel } from './components/ChatPanel';
import { useAuth } from '../../context/AuthContext';
import { CreateChatRequest, getChatById, getChats } from '../../api/chat';
import Loader from '../../reuseables/Loader';

export default function ChatPage() {
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(true); // Loading for initial chats fetch
  const [chatLoading, setChatLoading] = useState(false); // Loading for individual chat selection
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();
  const { isRecording, audioBlob, startRecording, stopRecording, clearAudio } =
    useAudioRecording();

  const handleSocketMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const socket = useSocket(handleSocketMessage);
  const createNewChat = useCallback(async () => {
    try {
      setChatLoading(true);
      const newChat = await CreateChatRequest({
        userId: user?.id || 'guest',
      });
      setChats((prev) => [newChat, ...prev]);
      setCurrentChat(newChat);
      setMessages([]);
    } catch (error) {
      console.error('Error creating new chat:', error);
    } finally {
      setChatLoading(false);
    }
  }, [user?.id]);

  // Initial chats fetch
  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const fetchedChats = await getChats(user?.id || 'guest');
        setChats(fetchedChats);

        // Set current chat to first chat if available
        if (fetchedChats.length > 0) {
          setCurrentChat(fetchedChats[0]);
          setMessages(fetchedChats[0]?.messages || []);
        } else {
          setCurrentChat(null);
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
        setChats([]);
        setCurrentChat(null);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchChats();
    }
  }, [user?.id]);

  const sendMessage = async (content: string | Blob, type: MessageType) => {
    if (type === 'text' && !content) return;
    if (!currentChat) return;

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
    clearAudio();

    if (socket) {
      if (content instanceof Blob) {
        try {
          const base64Content = await blobToBase64(content);
          const eventName = type === MessageType.AUDIO ? 'audio' : 'photo';
          socket.emit(
            eventName,
            JSON.stringify({
              ...newMessage,
              content: base64Content,
            })
          );
        } catch (error) {
          console.error(`Error converting ${type} to base64:`, error);
        }
      } else {
        socket.emit('message', JSON.stringify(newMessage));
      }
    }
  };

  const handleSelectChat = async (chatId: string) => {
    try {
      setChatLoading(true);
      setIsChatsOpen(false);
      const chat = await getChatById(chatId);
      setCurrentChat(chat);
      setMessages(chat.messages || []);
      setInput('');
      clearAudio();
    } catch (error) {
      console.error('Error fetching chat:', error);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSendText = () => {
    sendMessage(input, MessageType.TEXT);
  };

  const handleSendImage = (file: File) => {
    sendMessage(file, MessageType.IMAGE);
  };

  const handleSendAudio = () => {
    if (audioBlob) {
      sendMessage(audioBlob, MessageType.AUDIO);
    }
  }; // Add this handler to update chat title in state
  const handleChatTitleUpdated = (updatedChat: Chat) => {
    setChats((prev) =>
      prev.map((c) => (c.chatId === updatedChat.chatId ? updatedChat : c))
    );
    if (currentChat && currentChat.chatId === updatedChat.chatId) {
      setCurrentChat(updatedChat);
    }
  };
  // Show full page loader while initial chats are loading
  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    );
  }
  return (
    <div className='h-full flex flex-col'>
      <button
        className='lg:hidden top-2 right-2 mb-4 fixed p-2 bg-[#007b83] text-white rounded hover:bg-cyan-700 z-10 cursor-pointer'
        onClick={() => setIsChatsOpen(!isChatsOpen)}
      >
        <FaComments size={20} />
      </button>{' '}
      <div className='flex h-full'>
        {/* Chat Area - Left */}
        <div className='flex-1 flex flex-col bg-white/20 backdrop-blur-md relative min-h-0'>
          {chats.length === 0 ? (
            <EmptyState onCreateNewChat={createNewChat} />
          ) : (
            <>
              {/* Chat Session Title */}
              <div className='sticky top-0 z-10 bg-white border-b border-gray-300 p-2 shadow-sm'>
                <h2 className='text-lg md:text-xl font-bold text-gray-900 text-center'>
                  {currentChat?.title || 'Select a chat'}
                </h2>
              </div>

              {/* Messages Container with individual chat loading */}
              <div className='flex-1 overflow-hidden flex flex-col min-h-0'>
                {chatLoading ? (
                  <div className='flex-1 flex items-center justify-center'>
                    <Loader />
                  </div>
                ) : (
                  <MessagesContainer
                    messages={messages}
                    audioBlob={audioBlob}
                    onSendAudio={handleSendAudio}
                    onDeleteAudio={clearAudio}
                    chatId={currentChat?.chatId}
                  />
                )}
              </div>

              <ChatInput
                input={input}
                setInput={setInput}
                onSendText={handleSendText}
                onSendImage={handleSendImage}
                isRecording={isRecording}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
              />
            </>
          )}
        </div>

        <ChatPanel
          chats={chats}
          currentChat={currentChat}
          isOpen={isChatsOpen}
          search={search}
          setSearch={setSearch}
          onClose={() => setIsChatsOpen(false)}
          onSelectChat={handleSelectChat}
          onCreateNewChat={createNewChat}
          onChatTitleUpdated={handleChatTitleUpdated}
        />
      </div>
    </div>
  );
}

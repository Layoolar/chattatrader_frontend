import React, { useState } from 'react';
import {
  FaTimes,
  FaPlus,
  FaPencilAlt,
  FaCheck,
  FaTimes as FaX,
} from 'react-icons/fa';
import type { Chat } from '../types';
import { updateChatTitle } from '../../../api/chat';

interface ChatPanelProps {
  chats: Chat[];
  currentChat: Chat | null;
  isOpen: boolean;
  search: string;
  setSearch: (value: string) => void;
  onClose: () => void;
  onSelectChat: (chatId: string) => void;
  onCreateNewChat: () => void;
  onChatTitleUpdated: (updatedChat: Chat) => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  chats,
  currentChat,
  isOpen,
  search,
  setSearch,
  onClose,
  onSelectChat,
  onCreateNewChat,
  onChatTitleUpdated,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const startEdit = (chat: Chat) => {
    setEditingId(chat.chatId);
    setEditValue(chat.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const saveEdit = async (chat: Chat) => {
    if (!editValue.trim() || editValue === chat.title) {
      cancelEdit();
      return;
    }
    setLoadingId(chat.chatId);
    try {
      const updated = await updateChatTitle(chat.chatId, editValue.trim());
      onChatTitleUpdated(updated);
      setEditingId(null);
      setEditValue('');
    } catch (e) {
      // Optionally show error
    } finally {
      setLoadingId(null);
    }
  };
  return (
    <div
      className={`
      fixed top-0 right-0 z-50 h-full w-64 sm:w-72 bg-white/30 backdrop-blur-md p-4 border-l border-gray-200 flex flex-col
      transform transition-transform duration-300 ease-in-out
      lg:relative lg:translate-x-0 lg:w-80 lg:h-full lg:min-h-0
      ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
    `}
    >
      <button
        className='lg:hidden self-end mb-4 p-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 cursor-pointer'
        onClick={onClose}
      >
        <FaTimes />
      </button>

      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Chats</h2>
        <button
          onClick={onCreateNewChat}
          className='p-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-colors flex items-center justify-center'
        >
          <FaPlus size={14} />
        </button>
      </div>

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
              className={`p-2 rounded cursor-pointer text-sm flex items-center justify-between gap-2 ${
                chat === currentChat
                  ? 'bg-cyan-200 font-semibold'
                  : 'text-gray-800 hover:bg-cyan-100'
              }`}
              onClick={() =>
                editingId ? undefined : onSelectChat(chat.chatId)
              }
            >
              {editingId === chat.chatId ? (
                <>
                  <input
                    className='flex-1 p-1 rounded border border-gray-300 text-xs mr-2'
                    value={editValue}
                    autoFocus
                    onChange={(e) => setEditValue(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(chat);
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    disabled={loadingId === chat.chatId}
                  />
                  <button
                    className='text-green-600 p-1 mr-1 disabled:opacity-50'
                    onClick={(e) => {
                      e.stopPropagation();
                      saveEdit(chat);
                    }}
                    disabled={loadingId === chat.chatId}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className='text-red-500 p-1'
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelEdit();
                    }}
                  >
                    <FaX />
                  </button>
                </>
              ) : (
                <>
                  <span className='flex-1 truncate'>{chat.title}</span>
                  <button
                    className='ml-2 text-gray-500 hover:text-cyan-700 p-1'
                    onClick={(e) => {
                      e.stopPropagation();
                      startEdit(chat);
                    }}
                  >
                    <FaPencilAlt size={13} />
                  </button>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

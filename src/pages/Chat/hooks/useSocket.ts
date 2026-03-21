import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Message } from '../types';

export const useSocket = (onMessage: (message: Message) => void) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('https://api.chattatrader.com', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect', () => {
      ('Connected to Socket.IO server');
    });

    socketRef.current.on('disconnect', () => {
      ('Disconnected from Socket.IO server');
    });

    socketRef.current.on('response', (data: any) => {
      try {
        const parsedData = data as Message;
        onMessage(parsedData);
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
    };
  }, [onMessage]);

  return socketRef.current;
};

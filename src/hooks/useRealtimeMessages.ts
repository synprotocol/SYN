/* eslint-disable */
'use client';

import { useState, useEffect } from 'react';
import { Message } from '@/types';

export function useRealtimeMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch messages'));
    } finally {
      setLoading(false);
    }
  };

  const addMessage = async (message: Omit<Message, 'id'>) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error('Failed to save message');
      }

      const savedMessage = await response.json();
      setMessages(prev => [...prev, savedMessage]);
      return savedMessage;
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchMessages();

    // Set up polling every 1 second
    const interval = setInterval(fetchMessages, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return { messages, loading, error, addMessage };
} 
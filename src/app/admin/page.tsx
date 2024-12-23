'use client';

import { useState, useEffect } from 'react';
import { Message } from '@/types';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');

  // Check if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchMessages(token);
    }
  }, []);

  const fetchMessages = async (token: string) => {
    try {
      const response = await fetch('/api/admin/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          localStorage.removeItem('adminToken');
          return;
        }
        throw new Error('Failed to fetch messages');
      }
      
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError('Failed to fetch messages');
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!response.ok) throw new Error('Invalid password');
      
      const { token } = await response.json();
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
      setError('');
      fetchMessages(token);
    } catch (err) {
      setError('Invalid password');
      console.error(err);
    }
  };

  const toggleMessageVisibility = async (messageId: string, currentVisibility: boolean) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          messageId,
          isVisible: !currentVisibility
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          localStorage.removeItem('adminToken');
          return;
        }
        throw new Error('Failed to update message');
      }
      
      // Update local state
      setMessages(messages.map(msg => 
        msg.id === messageId 
          ? { ...msg, is_visible: !currentVisibility }
          : msg
      ));
    } catch (err) {
      setError('Failed to update message visibility');
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0c10]">
        <div className="p-8 bg-[rgba(16,24,28,0.95)] border border-[#00ff9d]/20 rounded-lg w-96">
          <h1 className="text-[#00ff9d] text-2xl mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full p-3 bg-[rgba(16,24,28,0.8)] border border-[#00ff9d]/20 rounded text-[#95ffe9] focus:border-[#00ff9d] outline-none"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full p-3 bg-[#00ff9d]/10 border border-[#00ff9d] text-[#00ff9d] rounded hover:bg-[#00ff9d]/20 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] p-8">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[#00ff9d] text-2xl">Message Management</h1>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              setIsAuthenticated(false);
            }}
            className="px-4 py-2 bg-[#00ff9d]/10 border border-[#00ff9d] text-[#00ff9d] rounded hover:bg-[#00ff9d]/20 transition-colors"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded text-red-500">
            {error}
          </div>
        )}

        <div className="space-y-4 overflow-y-auto flex-1 pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 bg-[rgba(16,24,28,0.95)] border border-[#00ff9d]/20 rounded-lg flex justify-between items-start ${
                !message.is_visible ? 'opacity-50' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    message.role === 'assistant' 
                      ? 'bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20' 
                      : 'bg-[#95ffe9]/10 text-[#95ffe9] border border-[#95ffe9]/20'
                  }`}>
                    {message.role.toUpperCase()}
                  </span>

                  <span className="text-[#95ffe9]/50 text-xs font-mono">
                    {new Date(message.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false
                    })}
                  </span>

                  {message.role === 'user' && message.wallet_address && (
                    <span className="text-[#95ffe9]/30 text-xs font-mono px-2 py-0.5 rounded bg-[rgba(16,24,28,0.8)] border border-[#95ffe9]/10">
                      {message.wallet_address.slice(0, 6)}...{message.wallet_address.slice(-4)}
                    </span>
                  )}
                </div>

                <p className="text-[#95ffe9] whitespace-pre-wrap pl-2 border-l-2 border-[#00ff9d]/20">
                  {message.content}
                </p>
              </div>

              <button
                onClick={() => toggleMessageVisibility(message.id, message.is_visible)}
                className={`ml-4 px-3 py-1 rounded border ${
                  message.is_visible
                    ? 'border-[#00ff9d] text-[#00ff9d] bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20'
                    : 'border-red-500 text-red-500 bg-red-500/10 hover:bg-red-500/20'
                } transition-colors`}
              >
                {message.is_visible ? 'Visible' : 'Hidden'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
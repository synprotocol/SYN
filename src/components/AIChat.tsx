/* eslint-disable */
'use client';

import { useState, useRef, useEffect } from 'react';
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { sendMessageToAI } from '@/lib/ai';
import { WalletButton } from './WalletButton';
import './AIChat.css';
import { SendIcon } from './Icons';
import { useRealtimeMessages } from '@/hooks/useRealtimeMessages';
import { Message, NewMessage } from '@/types';

export default function AIChat() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, userPublicKey } = useWalletAuth();
  const { messages, loading, error, addMessage } = useRealtimeMessages();
  const MESSAGE_LIMIT = 3;
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if messages should be locked (e.g., based on env variable or server state)
    const checkLockStatus = async () => {
      const isLocked = process.env.NEXT_PUBLIC_LOCK_MESSAGES === 'true';
      setIsLocked(isLocked);
    };

    checkLockStatus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("1. Handle submit started");
    e.preventDefault();
    if (!input.trim() || !isAuthenticated || isLoading || isLocked) {
        console.log("2. Submit blocked:", { 
            emptyInput: !input.trim(), 
            notAuthenticated: !isAuthenticated, 
            isLoading 
        });
        return;
    }

    const currentInput = input;
    setInput('');  // Clear input immediately
    const walletAddress = userPublicKey?.toBase58() || 'unknown';
    setIsLoading(true);

    try {
        console.log("3. Sending message to AI");
        const aiResponse = await sendMessageToAI(currentInput, walletAddress);
        console.log("4. AI response received:", aiResponse);
    } catch (error) {
        console.error("5. Error in handleSubmit:", error);
        setInput(currentInput);  // Restore input on error
    } finally {
        setIsLoading(false);
    }
  };

  // Ajouter un indicateur de limite
  const renderMessageLimit = () => {
    if (!isAuthenticated) return null;
    
    const remaining = MESSAGE_LIMIT - messages.length;
    return (
      <div className="message-limit-indicator">
        <span className={`remaining-messages ${remaining === 0 ? 'limit-reached' : ''}`}>
          {remaining > 0 
            ? `${remaining} MESSAGE${remaining > 1 ? 'S' : ''} REMAINING`
            : 'MESSAGE LIMIT REACHED'
          }
        </span>
      </div>
    );
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatWalletAddress = (address?: string, role?: string) => {
    if (!address || address === 'anonymous' || role === 'assistant') return null;

    return (
      <div className="wallet-address">
        {address.slice(0, 4)}...{address.slice(-4)}
      </div>
    );
  };

  return (
    <div className="chat-container">
      {isLocked && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 
                      px-4 py-2 bg-[#ff4757]/10 border border-[#ff4757] 
                      rounded text-[#ff4757] text-sm">
          Launching soon...
        </div>
      )}
      <div className="status-indicator">
        <div className="status-dot" />
        {isAuthenticated ? 'CONNECTED' : 'OBSERVER MODE'}
        {renderMessageLimit()}
      </div>
      <div className="chat-history">
        {messages.length === 0 ? (
          <div className="initial-message">
            <div className="text-center mb-8">
              <div className="inline-block p-4 rounded border border-[#00ff9d]/20 bg-[rgba(16,24,28,0.8)] backdrop-blur-sm mb-4">
                <div className="w-3 h-3 rounded-full bg-[#00ff9d] animate-pulse mx-auto mb-4"/>
                <h3 className="text-[#00ff9d] text-lg mb-2">AURELIA PROTOCOL</h3>
                <p className="text-[#95ffe9]/70 text-sm leading-relaxed max-w-md">
                  {isAuthenticated 
                    ? 'Hello! I\'m here to assist you. What would you like to discuss?'
                    : 'RESTRICTED ACCESS. WALLET CONNECTION REQUIRED FOR INTERACTION'
                  }
                </p>
                {!isAuthenticated && (
                  <div className="mt-6">
                    <WalletButton />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.role === 'user' ? 'user' : 'assistant'}`}
              >
                <div className="message-time">
                  <span className="text-[#95ffe9]/30 text-[10px] font-mono">
                    {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </span>
                </div>
                <div className="message-content">
                  {msg.content}
                </div>
                {msg.role === 'user' && msg.wallet_address && (
                  <div className="message-wallet">
                    <span className="text-[#95ffe9]/20 text-[10px] font-mono">
                      {msg.wallet_address.slice(0, 4)}..{msg.wallet_address.slice(-4)}
                    </span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isLocked 
            ? "Messaging is currently disabled" 
            : isAuthenticated 
              ? "Enter your message..." 
              : "Connect wallet to participate"}
          className="chat-input"
          disabled={!isAuthenticated || isLoading || isLocked}
        />
        {!isAuthenticated ? (
          <WalletButton className="send-button" />
        ) : (
          <button 
            type="submit" 
            className="send-button"
            disabled={isLoading || isLocked}
          >
            <SendIcon />
          </button>
        )}
      </form>
    </div>
  );
} 
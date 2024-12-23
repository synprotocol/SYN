import React, { useState } from 'react';
import './AIChat.css';

function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Here you would typically make an API call to your AI service
    // For now, we'll just simulate a response
    const aiResponse = { role: 'assistant', content: 'This is a simulated AI response.' };
    setMessages(prev => [...prev, aiResponse]);
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default AIChat; 
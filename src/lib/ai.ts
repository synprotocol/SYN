/* eslint-disable */

import { Message, NewMessage } from '@/types';

interface AIResponse {
  response: string;
  timestamp: string;
}

// Function to get conversation context
async function getConversationContext(userAddress: string, limit = 5): Promise<string> {
  try {
    const response = await fetch(`/api/messages/context?address=${userAddress}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch conversation context');
    }
    
    const data = await response.json();
    if (!data || data.length === 0) return '';

    // Format previous messages context with clear role separation
    return data.reverse().map((msg: Message) => 
      `${msg.role === 'user' ? 'Human' : 'Aurelia'}: ${msg.content}`
    ).join('\n');

  } catch (error) {
    console.error('Error fetching conversation context:', error);
    return '';
  }
}

export async function sendMessageToAI(message: string, userAddress?: string): Promise<AIResponse> {
  try {
    console.log("1. sendMessageToAI started:", { message, userAddress });
    
    const conversationContext = await getConversationContext(userAddress || 'anonymous');
    console.log("2. Got conversation context:", conversationContext);

    console.log("3. Sending request to /api/ai");
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message,
        userAddress: userAddress || 'anonymous',
        context: conversationContext
      }),
    });

    console.log("4. API response status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("5. API response data:", data);
    return data;
    
  } catch (error) {
    console.error("6. Error in sendMessageToAI:", {
      error,
      message: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
}

export async function processMessage(message: NewMessage): Promise<Message> {
  console.log("1. Processing message:", message);
  try {
    // Ajoutez votre logique de traitement ici
    console.log("2. Message processed successfully");
    return {
      ...message,
      id: Date.now().toString(),
    };
  } catch (error) {
    console.error("3. Error processing message:", error);
    throw error;
  }
} 
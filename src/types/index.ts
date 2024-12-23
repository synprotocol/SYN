export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  wallet_address?: string;
}

export type NewMessage = Omit<Message, 'id'>;

// Add any other types you need for your application here 
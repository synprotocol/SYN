export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  wallet_address?: string;
  timestamp: string;
  is_visible: boolean;
}

export interface NewMessage {
  content: string;
  role: 'user' | 'assistant';
  wallet_address?: string;
  timestamp: string;
  is_visible: boolean;
} 
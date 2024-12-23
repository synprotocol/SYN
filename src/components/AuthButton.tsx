'use client';

import { useWalletAuth } from '@/hooks/useWalletAuth';
import { WalletButton } from './WalletButton';

export function AuthButton() {
  const { isAuthenticated, authenticate, logout, connected, isLoading } = useWalletAuth();

  if (!connected) {
    return <WalletButton />;
  }

  if (isAuthenticated) {
    return (
      <button
        onClick={logout}
        className="wallet-adapter-button"
      >
        DISCONNECT
      </button>
    );
  }

  return (
    <button
      onClick={authenticate}
      className="wallet-adapter-button"
      disabled={isLoading}
    >
      {isLoading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
    </button>
  );
} 
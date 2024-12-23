'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';

export function useWalletAuth() {
  const { connected, publicKey, signMessage } = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPublicKey, setUserPublicKey] = useState<PublicKey | null>(null);

  useEffect(() => {
    if (!connected || !publicKey) {
      setIsAuthenticated(false);
      setUserPublicKey(null);
    } else {
      // Auto-authentification quand le wallet est connecté
      setIsAuthenticated(true);
      setUserPublicKey(publicKey);
    }
  }, [connected, publicKey]);

  const authenticate = async () => {
    if (!signMessage || !publicKey) return;

    try {
      setIsLoading(true);
      setIsAuthenticated(true);
      setUserPublicKey(publicKey);
    } catch (error) {
      console.error('Authentication failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserPublicKey(null);
  };

  return {
    isAuthenticated: connected, // Considère l'utilisateur authentifié s'il est connecté
    isLoading,
    authenticate,
    logout,
    userPublicKey,
    connected
  };
} 
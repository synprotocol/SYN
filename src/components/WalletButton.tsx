'use client';

import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface WalletButtonProps {
  className?: string;
}

export function WalletButton({ className = '' }: WalletButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [hasPhantom, setHasPhantom] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if Phantom is installed
    if (typeof window !== 'undefined') {
      const phantom = (window as any).phantom?.solana;
      setHasPhantom(!!phantom);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className={`custom-wallet-btn ${className}`}>
      {!hasPhantom ? (
        <a
          href="https://phantom.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="wallet-adapter-button"
        >
          Install Phantom
        </a>
      ) : (
        <WalletMultiButton />
      )}
    </div>
  );
} 
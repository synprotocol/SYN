'use client';

import AIChat from '@/components/AIChat';
import AISidebar from '@/components/AISidebar';
import { WalletButton } from '@/components/WalletButton';
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { useMarketCap } from '@/hooks/useMarketCap';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();
  const { isAuthenticated, userPublicKey } = useWalletAuth();
  const { raw: marketCapValue } = useMarketCap();

  // Calculate potential burn value (30% of market cap)
  const potentialBurnValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(marketCapValue * 0.30);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0c10]">
      <header className="fixed top-0 left-0 right-0 z-40 bg-[rgba(16,24,28,0.9)] border-b border-[#00ff9d]/20 backdrop-blur-sm">
        <div className="pl-[340px] pr-6 flex items-center justify-between h-16">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse"/>
            <h1 className="text-xl font-light text-[#00ff9d] tracking-wider">
              SYN <span className="text-[#95ffe9]">PROTOCOL</span>
            </h1>
          </button>
          
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded border border-[#00ff9d]/20 bg-[rgba(16,24,28,0.8)] backdrop-blur-sm">
              <span className="text-[#95ffe9]/70 text-sm">
                Potential burn value: {' '}
                <span className="text-[#00ff9d] font-mono">
                  {potentialBurnValue}
                </span>
                <span className="text-[#95ffe9]/40 text-xs ml-2">
                  (30% of supply)
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {userPublicKey && (
              <div className="flex items-center gap-2 text-sm text-[#95ffe9]/70">
                <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse"/>
                <span className="font-mono">
                  {userPublicKey.toBase58().slice(0, 6)}...{userPublicKey.toBase58().slice(-4)}
                </span>
              </div>
            )}
            <WalletButton />
          </div>
        </div>
      </header>
      <AISidebar />
      <div className="flex flex-1">
        <div className="w-80 flex-shrink-0" />
        <main className="flex-1 overflow-hidden relative pt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff9d]/5 to-transparent pointer-events-none"/>
          <AIChat />
        </main>
      </div>
    </div>
  );
} 
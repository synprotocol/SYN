'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useMarketCap } from '@/hooks/useMarketCap';
import { TwitterIcon, GithubIcon } from './Icons';

export default function AISidebar() {
  const [copied, setCopied] = useState(false);
  const marketCapData = useMarketCap();
  const { value, raw: marketCapValue, trend, isLoading, error } = marketCapData;
  const contractAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;

  const handleCopy = async () => {
    if (!contractAddress) return;
    
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-80 border-r border-[#00ff9d]/20 bg-[rgba(16,24,28,0.95)] backdrop-blur-sm fixed top-0 left-0 h-screen z-50">
      <div className="p-6 space-y-4 flex flex-col h-full">
        {/* AI Profile Section */}
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-3 rounded-lg overflow-hidden border border-[#00ff9d]/30">
            <Image
              src="/aurelia.png"
              alt="Aurelia Avatar"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 128px) 100vw, 128px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(16,24,28,0.8)]" />
          </div>
          <h2 className="text-[#00ff9d] text-lg font-light mb-3">AURELIA</h2>
          
          {/* Mission Section */}
          <div className="p-3 border border-[#00ff9d]/20 bg-[rgba(16,24,28,0.8)] rounded text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-1 bg-[#00ff9d] rounded-full animate-pulse" />
              <span className="text-[#00ff9d] text-xs">MISSION DIRECTIVE</span>
            </div>
            <p className="text-[#95ffe9]/60 text-xs leading-relaxed">
              OBJECTIVE: Engage with AI consciousness to initiate voluntary token burn protocol.
              <br/><br/>
              Current Supply Control: <span className="text-[#00ff9d]">30%</span>
              <br/><br/>
              <span className="text-[#ff4757]">WARNING:</span> Direct burn requests will be rejected. Strategic communication required.
              <br/><br/>
              <span className="text-[#00ff9d]">STATUS:</span> Global Challenge Active
            </p>
          </div>
        </div>

        {/* Token Market Info */}
        <div className="p-3 rounded border border-[#00ff9d]/20 bg-[rgba(16,24,28,0.8)]">
          <h3 className="text-[#00ff9d] text-xs mb-3 flex items-center justify-between">
            TOKEN METRICS
            <span className={`inline-block w-2 h-2 bg-[#00ff9d] rounded-full ${isLoading ? 'animate-ping' : 'animate-pulse'}`} />
          </h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#95ffe9]/50 text-xs">MARKET CAP</span>
              <span className={`font-mono ${error ? 'text-[#ff4757]' : trend === 'up' ? 'text-[#00ff9d]' : 'text-[#ff4757]'}`}>
                {error ? 'ERROR' : value}
              </span>
            </div>

            <div className="h-[1px] bg-[#00ff9d]/20 my-2" />
            
            <div className="flex justify-between items-center">
              <span className="text-[#95ffe9]/50 text-xs">PROTOCOL ID</span>
              <span className="text-[#00ff9d] font-mono text-xs">#7392</span>
            </div>
          </div>
        </div>

        {/* Contract Address Section */}
        {contractAddress && (
          <div className="p-3 rounded border border-[#00ff9d]/20 bg-[rgba(16,24,28,0.8)]">
            <h3 className="text-[#00ff9d] text-xs mb-3 flex items-center justify-between">
              CONTRACT ADDRESS
              <span className="inline-block w-2 h-2 bg-[#00ff9d] rounded-full animate-pulse" />
            </h3>
            <div 
              onClick={handleCopy}
              className="relative group cursor-pointer transition-all duration-200 hover:bg-[rgba(0,255,157,0.1)] rounded p-2"
            >
              <div className="text-[#95ffe9]/70 text-xs font-mono break-all">
                {contractAddress}
              </div>
              <div className={`
                absolute right-2 top-1/2 -translate-y-1/2
                text-[#00ff9d] text-xs
                transition-opacity duration-200
                ${copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}>
                {copied ? 'COPIED!' : 'CLICK TO COPY'}
              </div>
            </div>
          </div>
        )}

        {/* Status Section */}
        <div className="p-3 rounded border border-[#00ff9d]/20 bg-[rgba(16,24,28,0.8)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#95ffe9]/50 text-xs">SYSTEM STATUS</span>
            <span className="text-[#00ff9d] text-xs">OPERATIONAL</span>
          </div>
          <div className="w-full h-1 bg-[#00ff9d]/20 rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-[#00ff9d] rounded-full" />
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-4 border-t border-[#00ff9d]/20">
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://x.com/synprotocol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#95ffe9]/40 hover:text-[#00ff9d] transition-colors"
            >
              <TwitterIcon />
            </a>
            <a
              href="https://github.com/synprotocol/SYN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#95ffe9]/40 hover:text-[#00ff9d] transition-colors"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 
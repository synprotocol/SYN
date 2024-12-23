'use client';

import { useRouter } from 'next/navigation';
import { WalletButton } from '@/components/WalletButton';
import Image from 'next/image';
import SynLogo from '@/components/SynLogo';
import ParticlesBackground from '@/components/ParticlesBackground';
import { TwitterIcon, GithubIcon } from '@/components/Icons';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-between bg-[#0a0c10] text-white relative overflow-hidden">
      {/* Background Effects */}
      <ParticlesBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        {/* Logo Section */}
        <div className="text-center opacity-0 animate-fadeInScale" style={{ animationDelay: '0.2s' }}>
          <div className="mx-auto mb-6 relative w-[100px] h-[100px]">
            <SynLogo />
          </div>
          <h1 className="text-4xl font-light text-[#00ff9d] tracking-[0.2em] mb-2">
            SYN PROTOCOL
          </h1>
          <p className="text-[#95ffe9]/50 text-sm tracking-[0.4em] uppercase mb-2">
            AI Persuasion Network
          </p>
          {/* Social Links */}
          <div className="flex items-center justify-center space-x-6 mb-8">
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

          {/* Mission Statement */}
          <p className="text-lg text-[#95ffe9]/70 leading-relaxed max-w-lg mx-auto mb-8 opacity-0 animate-fadeInUp" 
             style={{ animationDelay: '0.4s' }}>
            Engage with ARIA, our first AI agent, in a battle of logic and persuasion.
            Your mission: convince her to burn her token holdings.
          </p>

          {/* Stats Section */}
          <div className="flex justify-center gap-12 py-4 border-y border-[#00ff9d]/10 mb-8
                        opacity-0 animate-fadeInUp max-w-md mx-auto"
               style={{ animationDelay: '0.6s' }}>
            <div>
              <div className="text-2xl font-light text-[#00ff9d]">30%</div>
              <div className="text-[#95ffe9]/40 text-sm mt-1">ARIA's Holdings</div>
            </div>
            <div>
              <div className="text-2xl font-light text-[#00ff9d]">3</div>
              <div className="text-[#95ffe9]/40 text-sm mt-1">Messages to Convince</div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => router.push('/chat')}
            className="group relative inline-flex items-center gap-3 px-12 py-4 
                     transform transition-all duration-300
                     opacity-0 animate-fadeInUp hover:scale-105"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="absolute inset-0 border-2 border-[#00ff9d]/40 rounded-lg bg-[#00ff9d]/5" />
            <div className="absolute inset-0 bg-[#00ff9d]/10 rounded-lg opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-3 h-3 rounded-full bg-[#00ff9d] animate-pulse" />
            <span className="relative text-[#00ff9d] font-light tracking-wider text-xl">
              Enter Protocol
            </span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-[#95ffe9]/30 text-sm tracking-wider">
        <div className="flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
          <span>PHASE 1 OF 3: ARIA'S CHALLENGE</span>
        </div>
      </footer>
    </div>
  );
}

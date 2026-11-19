import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Terminal, Heart } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { CyberGlitchText } from './ui/CyberGlitchText';
import { RadialGlowButton } from './ui/RadialGlowButton';

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[rgba(237,237,237,0.08)] pt-16 pb-12 px-4 sm:px-6 overflow-hidden">
      {/* Giant Ambient Background Typography */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 select-none pointer-events-none opacity-[0.03] text-[18vw] font-bold font-mono tracking-tighter whitespace-nowrap text-[#ededed]">
        TAIKWANI
      </div>

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Top Row: System Status & Direct Links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[rgba(237,237,237,0.06)]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ededed]">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
              <CyberGlitchText text="SYSTEM UPTIME: 99.98%" scrambleDuration={45} />
            </div>
            <div className="text-[11px] font-mono text-[#85858b]">
              HYDERABAD, IN • IST: <span className="text-[#ededed] tabular-nums">{timeStr || 'LIVE'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#85858b]">
            <a
              href="./Deepanshu_Taikwani_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00e5ff] transition-colors"
            >
              Resume (PDF)
            </a>
            <a
              href={RESUME_DATA.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00e5ff] transition-colors"
            >
              GitHub
            </a>
            <a
              href={RESUME_DATA.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00e5ff] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/deepanshutaikwani456-dt/transformer-engine"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00e5ff] transition-colors"
            >
              Transformer Engine
            </a>

            <RadialGlowButton onClick={scrollToTop} className="ml-2">
              <span className="flex items-center gap-1">
                <span>Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </span>
            </RadialGlowButton>
          </div>
        </div>

        {/* Bottom Row: Colophon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#85858b]">
          <div>
            <span>&copy; {new Date().getFullYear()} {RESUME_DATA.name} &bull; Engineered with React 18, Tailwind CSS &amp; Vengeance UI components</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4cc38a]" />
            <span>Production Build v2.4</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

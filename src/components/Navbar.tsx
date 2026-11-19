import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { CyberGlitchText } from './ui/CyberGlitchText';
import { RadialGlowButton } from './ui/RadialGlowButton';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const spotlightX = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Agents', href: '#capabilities' },
    { name: 'Projects', href: '#projects' },
    { name: 'Playground', href: '#lab' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    spotlightX.current = x;
    navRef.current.style.setProperty('--nav-spotlight-x', `${x}px`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`w-full transition-colors duration-200 ${
          scrolled
            ? 'bg-[#0f0f10]/90 backdrop-blur-md border-b border-[rgba(237,237,237,0.08)] shadow-raised'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Brand Wordmark with Cyber Glitch Effect */}
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="w-7 h-7 rounded-lg bg-[#18191c] border border-[rgba(237,237,237,0.1)] group-hover:border-[#00e5ff]/50 flex items-center justify-center font-mono text-xs font-medium text-[#ededed] transition-colors">
              DT
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-medium tracking-tight text-[#ededed]">
                <CyberGlitchText text={RESUME_DATA.name} scrambleOnMount={false} />
              </span>
              <span className="text-[11px] font-mono text-[#00e5ff] hidden sm:inline">
                / systems
              </span>
            </div>
          </a>

          {/* Vengeance UI Spotlight Nav Container */}
          <div
            ref={navRef}
            onMouseMove={handleMouseMove}
            className="hidden md:flex items-center relative rounded-full p-1 bg-[#141416] border border-[rgba(237,237,237,0.08)] overflow-hidden"
          >
            {/* Moving Beam Layer */}
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-60 transition-opacity"
              style={{
                background: `radial-gradient(110px circle at var(--nav-spotlight-x, 50%) 50%, rgba(0, 229, 255, 0.15), transparent 70%)`,
              }}
            />

            <nav className="relative z-10 flex items-center gap-1">
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                    activeIndex === idx
                      ? 'text-[#ededed] font-medium'
                      : 'text-[#85858b] hover:text-[#ededed]'
                  }`}
                >
                  {activeIndex === idx && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#222327] rounded-full border border-[rgba(237,237,237,0.12)] z-[-1]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Actions with Radial Glow Button */}
          <div className="flex items-center gap-3">
            <a
              href="./Deepanshu_Taikwani_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-[#85858b] hover:text-[#00e5ff] transition-colors px-2 py-1"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={RESUME_DATA.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-xs font-mono text-[#85858b] hover:text-[#00e5ff] transition-colors px-2 py-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <RadialGlowButton href="#contact">
              Contact
            </RadialGlowButton>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-[#a1a1a6] hover:text-[#ededed] hover:bg-[#18191c] border border-[rgba(237,237,237,0.08)]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-[#18191c] border-b border-[rgba(237,237,237,0.08)] px-4 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-[#a1a1a6] hover:text-[#ededed] py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-[rgba(237,237,237,0.08)] flex gap-3">
              <a
                href={RESUME_DATA.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#a1a1a6] hover:text-[#ededed] flex items-center gap-1 py-1"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

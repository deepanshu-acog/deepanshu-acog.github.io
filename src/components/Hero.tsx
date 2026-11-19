import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Copy, Check, Terminal, Play, Cpu, Activity, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { AttentionArcVisualizer } from './AttentionArcVisualizer';
import { SpotlightCard } from './SpotlightCard';
import { BorderBeam } from './ui/BorderBeam';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';
import { CyberGlitchText } from './ui/CyberGlitchText';
import { AnimatedNumber } from './ui/AnimatedNumber';

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'stream' | 'attention' | 'arch'>('stream');
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RESUME_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleTokens = [
    "ROMEO:\n",
    "Soft! ", "what ", "light ", "through ", "yonder ", "window ", "breaks?\n",
    "It ", "is ", "the ", "east, ", "and ", "Juliet ", "is ", "the ", "sun.\n",
    "Arise, ", "fair ", "sun, ", "and ", "kill ", "the ", "envious ", "moon,\n",
    "Who ", "is ", "already ", "sick ", "and ", "pale ", "with ", "grief."
  ];

  const handleRunSampleStream = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setTerminalOutput('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < sampleTokens.length) {
        setTerminalOutput(prev => prev + sampleTokens[i]);
        i++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 45);
  };

  useEffect(() => {
    handleRunSampleStream();
  }, []);

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Direct Profile with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Status telemetry line with pulsing indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#18191c] border border-[rgba(237,237,237,0.1)] text-xs font-mono text-[#a1a1a6] shadow-subtle"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]" />
            </span>
            <span>STATUS: ACTIVE • BIOMEDICAL AGENTS & DEEP LEARNING</span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl sm:text-6xl font-medium tracking-tight text-[#ededed] leading-[1.06]"
            >
              <CyberGlitchText text={RESUME_DATA.name} scrambleDuration={30} />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg sm:text-xl text-[#a1a1a6] font-normal leading-relaxed max-w-xl"
            >
              {RESUME_DATA.tagline}
            </motion.p>
          </div>

          {/* Bio statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm text-[#85858b] leading-relaxed max-w-xl"
          >
            {RESUME_DATA.bio}
          </motion.p>

          {/* Primary & Secondary Actions with Micro-animations */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <InteractiveHoverButton href="#projects">
              Explore featured work
            </InteractiveHoverButton>

            <motion.button
              onClick={handleCopyEmail}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#18191c] hover:bg-[#222327] border border-[rgba(237,237,237,0.08)] text-xs font-medium text-[#ededed] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#4cc38a]" /> : <Copy className="w-3.5 h-3.5 text-[#85858b]" />}
              <span>{copied ? 'Email copied!' : 'Copy email'}</span>
            </motion.button>

            <a
              href="#lab"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-mono text-[#a1a1a6] hover:text-[#00e5ff] transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive playground &darr;</span>
            </a>
          </motion.div>

          {/* Key telemetry numbers with rolling AnimatedNumber odometer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[rgba(237,237,237,0.08)] max-w-xl"
          >
            {RESUME_DATA.stats.map((stat, i) => {
              const numMatch = stat.value.match(/(\d+)(.*)/);
              const numVal = numMatch ? parseInt(numMatch[1]) : 0;
              const suffix = numMatch ? numMatch[2] : '';

              return (
                <div key={i} className="space-y-0.5">
                  <div className="font-mono text-xl font-medium text-[#ededed] flex items-center">
                    <AnimatedNumber value={numVal} suffix={suffix} />
                  </div>
                  <div className="text-[11px] text-[#85858b]">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>

        </motion.div>

        {/* Right Column: 3D Spotlight Terminal & Interactive Transformer Engine Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <SpotlightCard className="shadow-2xl relative">
            {/* Animated Laser Border Beam (from Vengeance UI) */}
            <BorderBeam size={220} duration={10} colorFrom="#00e5ff" colorTo="#4cc38a" borderWidth={1.5} />

            {/* Terminal Chrome Header */}
            <div className="h-10 px-3.5 bg-[#141416] border-b border-[rgba(237,237,237,0.08)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e5484d]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4cc38a]/60" />
                </div>
                <span className="text-[11px] font-mono text-[#85858b] pl-2 border-l border-[rgba(237,237,237,0.08)]">
                  transformer-engine v1.0
                </span>
              </div>

              <div className="flex items-center gap-1">
                {(['stream', 'attention', 'arch'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded transition-colors ${
                      activeTab === tab
                        ? 'bg-[#00e5ff] text-[#0f0f10] font-medium'
                        : 'text-[#85858b] hover:text-[#ededed]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Workspace */}
            <div className="p-4 font-mono text-xs space-y-4 min-h-[310px]">
              
              {activeTab === 'stream' && (
                <>
                  {/* Model spec & loss telemetry banner */}
                  <div className="text-[11px] text-[#85858b] space-y-1 pb-3 border-b border-[rgba(237,237,237,0.08)]">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#00e5ff]" />
                        DEVICE: Apple Silicon MPS
                      </span>
                      <span className="text-[#4cc38a] font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4cc38a] animate-pulse" />
                        RUNNING
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>CHECKPOINT: step_5000.pt</span>
                      <span className="text-[#ededed] font-medium">Cross-Entropy Loss: 1.611</span>
                    </div>
                  </div>

                  {/* Autoregressive Token Stream */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#85858b]">
                      <span>TOKEN DECODING STREAM</span>
                      <button
                        onClick={handleRunSampleStream}
                        disabled={isSimulating}
                        className="flex items-center gap-1 text-[#00e5ff] hover:text-[#33ebff] transition-colors disabled:opacity-40"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Re-generate</span>
                      </button>
                    </div>

                    <div className="p-3 bg-[#111214] rounded-lg border border-[rgba(237,237,237,0.08)] text-[#ededed] leading-relaxed whitespace-pre-wrap min-h-[120px] shadow-inner font-mono">
                      {terminalOutput || <span className="text-[#85858b]">// Decoding tokens...</span>}
                      {isSimulating && <span className="inline-block w-1.5 h-3.5 bg-[#00e5ff] ml-1 animate-pulse" />}
                    </div>
                  </div>

                  {/* Realtime dials */}
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-[#85858b]">
                    <div className="p-2 bg-[#141416] rounded border border-[rgba(237,237,237,0.06)]">
                      <div>Temp</div>
                      <div className="text-[#ededed] font-medium">0.80</div>
                    </div>
                    <div className="p-2 bg-[#141416] rounded border border-[rgba(237,237,237,0.06)]">
                      <div>Top-K</div>
                      <div className="text-[#ededed] font-medium">15</div>
                    </div>
                    <div className="p-2 bg-[#141416] rounded border border-[rgba(237,237,237,0.06)]">
                      <div>Throughput</div>
                      <div className="text-[#4cc38a] font-medium">42.4 t/s</div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'attention' && (
                <AttentionArcVisualizer />
              )}

              {activeTab === 'arch' && (
                <div className="space-y-3 text-[11px] text-[#85858b]">
                  <div className="flex items-center justify-between text-[#ededed] font-medium">
                    <span>Decoder-Only Architecture</span>
                    <span className="text-[#00e5ff]">208,449 parameters</span>
                  </div>
                  <div className="p-3 bg-[#111214] rounded-lg border border-[rgba(237,237,237,0.08)] space-y-1.5">
                    <div className="flex justify-between">
                      <span>Embedding Dim (d_model)</span>
                      <span className="text-[#ededed]">64</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Attention Heads (n_head)</span>
                      <span className="text-[#ededed]">4 (head_size: 16)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transformer Blocks</span>
                      <span className="text-[#ededed]">4 layers</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Context Window (block_size)</span>
                      <span className="text-[#ededed]">64 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vocabulary Size</span>
                      <span className="text-[#ededed]">65 (char-level)</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-[rgba(237,237,237,0.06)]">
                      <span>Loss Ceiling Descent</span>
                      <span className="text-[#4cc38a]">2.46 &rarr; 1.611</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </SpotlightCard>
        </motion.div>

      </div>
    </section>
  );
};

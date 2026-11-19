import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Cpu, Terminal, ArrowUpRight } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const BentoGrid: React.FC = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-12"
      >
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e5ff]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
          <span>Core capabilities</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#ededed]">
          Engineering at the intersection of AI and production systems
        </h2>
        <p className="text-sm text-[#a1a1a6] max-w-2xl leading-relaxed">
          From first-principles PyTorch transformer architectures to multi-agent bioinformatics pipelines and sub-500ms enterprise SaaS frontends.
        </p>
      </motion.div>

      {/* Capabilities Matrix with 3D Tilt & Raycast Spotlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Agentic AI & Multi-Agent Orchestration (Span 2) */}
        <div className="md:col-span-2">
          <SpotlightCard className="p-6 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#85858b]">
                <Bot className="w-4 h-4 text-[#00e5ff]" />
                <span>Multi-agent systems</span>
              </div>

              <h3 className="text-lg font-medium text-[#ededed]">
                Production Multi-Agent LLM Orchestration
              </h3>

              <p className="text-sm text-[#a1a1a6] leading-relaxed max-w-2xl">
                Architected production agentic platforms orchestrating 13+ bioinformatics tools for 60+ scientists across biopharma clients. Engineered autonomous research monitoring pipelines using Google ADK, Gemini API, RAG, and structured MDX reporting.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-6">
              {['Google ADK', 'Gemini API', 'Tool Calling', 'Multi-Agent State', 'RAG Pipelines', 'BAML', 'Celery / Redis'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-[#222327] text-[#a1a1a6] border border-[rgba(237,237,237,0.06)] hover:text-[#00e5ff] hover:border-[#00e5ff]/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </div>

        {/* Card 2: Frontend Speed & Scale (Span 1) */}
        <div>
          <SpotlightCard className="p-6 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#85858b]">
                <Zap className="w-4 h-4 text-[#ededed]" />
                <span>Frontend systems</span>
              </div>

              <h3 className="text-lg font-medium text-[#ededed]">
                70% Bundle Reduction & Sub-500ms FCP
              </h3>

              <p className="text-xs sm:text-sm text-[#a1a1a6] leading-relaxed">
                Solely built the frontend of DBTIPS SaaS handling 50k+ records. Leveraged React.lazy, Suspense, and fine-grained code-splitting across 30+ modules for extreme performance.
              </p>
            </div>

            <div className="pt-6">
              <div className="p-3 rounded-lg bg-[#141416] border border-[rgba(237,237,237,0.06)] text-center font-mono">
                <div className="text-xs text-[#85858b]">Benchmark load time</div>
                <div className="text-xl font-medium text-[#4cc38a] tabular-nums mt-0.5">&lt;500ms</div>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Card 3: Deep Learning & Transformers (Span 1) */}
        <div>
          <SpotlightCard className="p-6 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#85858b]">
                <Cpu className="w-4 h-4 text-[#ededed]" />
                <span>Deep learning</span>
              </div>

              <h3 className="text-lg font-medium text-[#ededed]">
                First-Principles PyTorch Transformers
              </h3>

              <p className="text-xs sm:text-sm text-[#a1a1a6] leading-relaxed">
                Built causal self-attention, multi-head projections, and autoregressive generation loops from raw math. Trained decoder-only models on Apple Silicon MPS with cross-entropy loss descent to 1.61.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-6">
              {['PyTorch', 'Apple MPS', 'Self-Attention', 'Top-K / Top-P'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono rounded bg-[#222327] text-[#a1a1a6] border border-[rgba(237,237,237,0.06)] hover:text-[#00e5ff] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </div>

        {/* Card 4: Full Stack Architecture (Span 2) */}
        <div className="md:col-span-2">
          <SpotlightCard className="p-6 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#85858b]">
                <Terminal className="w-4 h-4 text-[#00e5ff]" />
                <span>Production architecture</span>
              </div>

              <h3 className="text-lg font-medium text-[#ededed]">
                Distributed Asynchronous Task Pipelines
              </h3>

              <p className="text-sm text-[#a1a1a6] leading-relaxed max-w-2xl">
                Engineered decoupled task queues with Celery and Redis to handle compute-intensive molecular queries and background agent runs without blocking client UI threads. Integrated PostgreSQL and MongoDB for hybrid structured and vector search.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-6">
              {['FastAPI', 'Node.js / Express', 'PostgreSQL', 'MongoDB', 'Docker', 'REST / WebSockets'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-[#222327] text-[#a1a1a6] border border-[rgba(237,237,237,0.06)] hover:text-[#00e5ff] hover:border-[#00e5ff]/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </div>

      </div>
    </section>
  );
};

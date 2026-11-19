import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { SpotlightCard } from './SpotlightCard';
import { BorderBeam } from './ui/BorderBeam';
import { AnimatedTooltip } from './ui/AnimatedTooltip';
import { CyberGlitchText } from './ui/CyberGlitchText';

const TAG_TOOLTIPS: Record<string, string> = {
  'PyTorch': 'First-principles autograd & MPS acceleration',
  'Transformers': 'Causal self-attention & 4-head projections',
  'Self-Attention': 'softmax(Q @ K.T / sqrt(d_k))',
  'Top-K / Top-P': 'Stochastic nucleus & temperature truncation',
  'Google ADK': 'Autonomous multi-agent orchestration framework',
  'Gemini API': 'Structured intent parsing via Gemini 1.5 Pro',
  'FastAPI': 'High-performance asynchronous Python API server',
  'Celery': 'Distributed background worker job queue',
  'Redis': 'In-memory message broker & cache store',
  'RAG': 'ChromaDB vector embedding similarity retrieval',
  'React 18': 'Concurrent mode, Suspense & fine-grained code-splitting',
  'TypeScript': 'Strict type-safe enterprise client architecture',
  'Vite': 'Sub-500ms bundle compilation & HMR',
  'Tailwind CSS': 'Utility-first modular styling system',
  'Zustand': 'Lightweight atomic reactive state store',
  'Performance': '70% bundle reduction with <500ms FCP',
  'Playwright': 'End-to-end headless regression testing suite',
  'Figma': 'Wireframing & design system tokens',
};

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'AI / LLM' | 'Full-Stack' | 'SaaS Platform'>('All');

  const filteredProjects = filter === 'All'
    ? RESUME_DATA.projects
    : RESUME_DATA.projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e5ff]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
            <span>Featured engineering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#ededed]">
            <CyberGlitchText text="Production systems & deep learning" scrambleOnMount={false} />
          </h2>
          <p className="text-sm text-[#a1a1a6] max-w-xl">
            Selected platforms spanning autonomous biopharma agents, first-principles transformers, and enterprise SaaS.
          </p>
        </div>

        {/* Filter Controls with Smooth Active Pill */}
        <div className="flex flex-wrap gap-1 p-1 bg-[#141416] rounded-lg border border-[rgba(237,237,237,0.08)] self-start">
          {(['All', 'AI / LLM', 'Full-Stack', 'SaaS Platform'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`relative px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                filter === category
                  ? 'text-[#ededed] font-medium'
                  : 'text-[#85858b] hover:text-[#ededed]'
              }`}
            >
              {filter === category && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-[#222327] rounded border border-[rgba(237,237,237,0.12)] z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid with AnimatePresence */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <SpotlightCard className="p-6 h-full flex flex-col justify-between relative">
                {/* BorderBeam on Featured projects from Vengeance UI */}
                {project.featured && (
                  <BorderBeam
                    size={200}
                    duration={12}
                    borderWidth={1.5}
                    colorFrom={index === 0 ? "#00e5ff" : "#4cc38a"}
                    colorTo={index === 0 ? "#4cc38a" : "#00e5ff"}
                  />
                )}

                <div>
                  {/* Category & Action Links */}
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-[11px] font-mono text-[#00e5ff] px-2 py-0.5 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/20">
                      {project.category}
                    </span>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded text-[#85858b] hover:text-[#ededed] hover:bg-[#222327] transition-colors"
                          title="GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded text-[#85858b] hover:text-[#00e5ff] hover:bg-[#222327] transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-medium text-[#ededed] mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[#a1a1a6] mb-4">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#85858b] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Metrics Banner */}
                  {project.metrics && (
                    <div className="mb-6 p-2 rounded bg-[#141416] border border-[rgba(237,237,237,0.06)] font-mono text-[11px] text-[#a1a1a6] flex items-center gap-1.5">
                      <span className="text-[#00e5ff]">&gt;</span>
                      <span>{project.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Tech Badges with Animated Tooltips from Vengeance UI */}
                <div className="pt-4 border-t border-[rgba(237,237,237,0.08)] flex items-center justify-between flex-wrap gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((t) => {
                      const tip = TAG_TOOLTIPS[t] || `${t} integration`;
                      return (
                        <AnimatedTooltip key={t} content={tip}>
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#222327] text-[#85858b] hover:text-[#00e5ff] hover:border-[#00e5ff]/30 border border-[rgba(237,237,237,0.06)] transition-colors">
                            {t}
                          </span>
                        </AnimatedTooltip>
                      );
                    })}
                  </div>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#ededed] hover:text-[#00e5ff] inline-flex items-center gap-1 transition-colors group"
                    >
                      <span>Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

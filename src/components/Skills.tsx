import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layout, Server, Database, Code2 } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { SpotlightCard } from './SpotlightCard';
import { BorderBeam } from './ui/BorderBeam';
import { CyberGlitchText } from './ui/CyberGlitchText';
import { AnimatedTooltip } from './ui/AnimatedTooltip';

export const Skills: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4 text-[#00e5ff]" />;
      case 'Layout': return <Layout className="w-4 h-4 text-[#00e5ff]" />;
      case 'Server': return <Server className="w-4 h-4 text-[#00e5ff]" />;
      case 'Database': return <Database className="w-4 h-4 text-[#00e5ff]" />;
      default: return <Code2 className="w-4 h-4 text-[#00e5ff]" />;
    }
  };

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-12"
      >
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e5ff]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
          <span>Technologies</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#ededed]">
          <CyberGlitchText text="Technical competencies and stack" scrambleOnMount={false} />
        </h2>
        <p className="text-sm text-[#a1a1a6] max-w-xl">
          Production-tested proficiencies across agentic workflows, deep learning frameworks, and high-concurrency systems.
        </p>
      </motion.div>

      {/* Grid with Spotlight Cards & BorderBeam */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RESUME_DATA.skillCategories.map((category, cIdx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: cIdx * 0.1 }}
          >
            <SpotlightCard className="p-6 space-y-4 h-full relative">
              {cIdx === 0 && (
                <BorderBeam size={180} duration={12} colorFrom="#00e5ff" colorTo="#a855f7" borderWidth={1.5} />
              )}

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#141416] border border-[rgba(237,237,237,0.06)] text-[#00e5ff]">
                  {getIcon(category.icon)}
                </div>
                <h3 className="text-sm font-medium text-[#ededed]">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <AnimatedTooltip key={skill} content={`Production proficiency • ${skill}`}>
                    <motion.span
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-[#222327] text-[#a1a1a6] hover:text-[#00e5ff] hover:bg-[#282a2f] border border-[rgba(237,237,237,0.06)] hover:border-[#00e5ff]/40 transition-colors cursor-pointer inline-block"
                    >
                      {skill}
                    </motion.span>
                  </AnimatedTooltip>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

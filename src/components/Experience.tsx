import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { SpotlightCard } from './SpotlightCard';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
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
          <span>Work experience</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#ededed]">
          Engineering trajectory and production impact
        </h2>
        <p className="text-sm text-[#a1a1a6] max-w-lg">
          2.5+ years shipping enterprise bioinformatics platforms, multi-agent systems, and high-performance SaaS frontends.
        </p>
      </motion.div>

      {/* Timeline Stream with Animated Scroll Reveals */}
      <div className="relative pl-6 sm:pl-8 border-l border-[rgba(237,237,237,0.08)] space-y-10">
        {RESUME_DATA.experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {/* Glowing Pulse Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#18191c] border-2 border-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.4)]" />

            {/* Experience Content Box with 3D Tilt */}
            <SpotlightCard className="p-6 space-y-4">
              {/* Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-[#ededed]">
                    {exp.role}
                  </h3>
                  <div className="text-xs font-mono text-[#00e5ff] mt-0.5">
                    {exp.company}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[#85858b]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1 hidden sm:flex">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Highlights List */}
              <ul className="space-y-2 pt-1">
                {exp.highlights.map((point, pIndex) => (
                  <li key={pIndex} className="text-xs sm:text-sm text-[#a1a1a6] flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#00e5ff] mt-1 shrink-0">&ndash;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="pt-3 flex flex-wrap gap-1.5 border-t border-[rgba(237,237,237,0.06)]">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#222327] text-[#85858b] border border-[rgba(237,237,237,0.06)] hover:text-[#00e5ff] transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

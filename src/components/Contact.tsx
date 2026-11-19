import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Copy, Check, Linkedin, Github } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { SpotlightCard } from './SpotlightCard';
import { BorderBeam } from './ui/BorderBeam';
import { CyberGlitchText } from './ui/CyberGlitchText';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RESUME_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(`Hi Deepanshu,\n\n${formState.message}\n\nFrom: ${formState.name} (${formState.email})`);
    window.location.href = `mailto:${RESUME_DATA.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
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
          <span>Contact</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#ededed]">
          <CyberGlitchText text="Initiate conversation or consultation" scrambleOnMount={false} />
        </h2>
        <p className="text-sm text-[#a1a1a6] max-w-lg">
          Currently open to full-time roles, agentic AI architecture design, and technical collaborations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Contact Metadata Box */}
        <div className="md:col-span-5 space-y-4">
          <SpotlightCard className="p-6 space-y-5">
            <h3 className="text-sm font-medium text-[#ededed]">Direct channels</h3>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="flex items-center gap-3 text-[#a1a1a6]">
                <div className="p-2 rounded bg-[#141416] text-[#00e5ff] border border-[rgba(237,237,237,0.06)]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-[#85858b]">Email</div>
                  <span className="text-[#ededed] select-all">{RESUME_DATA.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#a1a1a6]">
                <div className="p-2 rounded bg-[#141416] text-[#00e5ff] border border-[rgba(237,237,237,0.06)]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#85858b]">Phone</div>
                  <span className="text-[#ededed]">{RESUME_DATA.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#a1a1a6]">
                <div className="p-2 rounded bg-[#141416] text-[#00e5ff] border border-[rgba(237,237,237,0.06)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#85858b]">Location</div>
                  <span className="text-[#ededed]">{RESUME_DATA.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyEmail}
                className="w-full py-2 px-3 rounded-lg bg-[#222327] hover:bg-[#282a2f] text-xs font-mono text-[#ededed] border border-[rgba(237,237,237,0.08)] hover:border-[#00e5ff]/40 transition-colors flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#4cc38a]" /> : <Copy className="w-3.5 h-3.5 text-[#85858b]" />}
                <span>{copied ? 'Copied to clipboard' : 'Copy email address'}</span>
              </motion.button>
            </div>
          </SpotlightCard>

          {/* Social Profiles */}
          <div className="flex gap-2">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={RESUME_DATA.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-lg bg-[#18191c] hover:bg-[#222327] border border-[rgba(237,237,237,0.08)] hover:border-[#00e5ff]/40 text-xs font-mono text-[#a1a1a6] hover:text-[#ededed] transition-colors flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={RESUME_DATA.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-lg bg-[#18191c] hover:bg-[#222327] border border-[rgba(237,237,237,0.08)] hover:border-[#00e5ff]/40 text-xs font-mono text-[#a1a1a6] hover:text-[#ededed] transition-colors flex items-center justify-center gap-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </motion.a>
          </div>
        </div>

        {/* Contact Form with Spotlight & BorderBeam */}
        <div className="md:col-span-7">
          <SpotlightCard className="p-6 relative">
            <BorderBeam size={220} duration={14} colorFrom="#00e5ff" colorTo="#4cc38a" borderWidth={1.5} />

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#85858b]">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-[#111214] border border-[rgba(237,237,237,0.08)] focus:border-[#00e5ff]/40 rounded-lg px-3 py-2 text-xs text-[#ededed] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#85858b]">Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full bg-[#111214] border border-[rgba(237,237,237,0.08)] focus:border-[#00e5ff]/40 rounded-lg px-3 py-2 text-xs text-[#ededed] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#85858b]">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Details regarding your role, inquiry, or project..."
                  className="w-full bg-[#111214] border border-[rgba(237,237,237,0.08)] focus:border-[#00e5ff]/40 rounded-lg px-3 py-2 text-xs text-[#ededed] focus:outline-none resize-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <InteractiveHoverButton type="submit">
                  {submitted ? 'Opening mail client...' : 'Send message'}
                </InteractiveHoverButton>
              </div>
            </form>
          </SpotlightCard>
        </div>

      </div>
    </section>
  );
};

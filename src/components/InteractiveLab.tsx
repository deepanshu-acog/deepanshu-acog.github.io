import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, Sliders, ArrowUpRight, RotateCcw, Activity } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { BorderBeam } from './ui/BorderBeam';
import { CyberGlitchText } from './ui/CyberGlitchText';
import { AnimatedTooltip } from './ui/AnimatedTooltip';

export const InteractiveLab: React.FC = () => {
  const [prompt, setPrompt] = useState('ROMEO:\nO, wilt thou leave me');
  const [temperature, setTemperature] = useState(0.8);
  const [topK, setTopK] = useState(15);
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState('');
  const [viewMode, setViewMode] = useState<'text' | 'heatmap'>('text');

  const sampleCompletions: Record<string, string[]> = {
    'ROMEO:\nO, wilt thou leave me': [
      "so unsatisfied?\n\nJULIET:\nWhat satisfaction canst thou have to-night?\n\nROMEO:\nThe exchange of thy love's faithful vow for mine.\n\nJULIET:\nI gave thee mine before thou didst request it;\nAnd yet I would it were to give again.",
      "such with of a word.\n\nSICINIUS:\nNor good make of all may come of all of any bring,\nAnd and many lord thee some the slooke,\nThat is him from the same be hord, and I shall day."
    ],
    'KING RICHARD:\nWhat news, my Lord': [
      ", that looks upon us with so pale a face?\n\nMESSENGER:\nMy lord, three hundred sail are at the coast,\nAnd up into the north and west their flags\nDo menace your high crown and royal state.",
      ", but the son and for the made\nTo married the some that with him bear the have all the was to the brother,\nAnd the present the see the such to this be a have."
    ],
    'HAMLET:\nTo be or not to be': [
      ", that is the question:\nWhether 'tis nobler in the mind to suffer\nThe slings and arrows of outrageous fortune,\nOr to take arms against a sea of troubles\nAnd by opposing end them."
    ]
  };

  const handleRunSimulation = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setOutput('');

    const matchedKey = Object.keys(sampleCompletions).find(k => prompt.startsWith(k)) || 'ROMEO:\nO, wilt thou leave me';
    const choices = sampleCompletions[matchedKey];
    const fullText = choices[Math.floor(Math.random() * choices.length)];

    let current = '';
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < fullText.length) {
        current += fullText[idx];
        setOutput(current);
        idx++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 18);
  };

  const sampleHeatmapRows = [
    { token: 'ROMEO', scores: [0.94, 0.05, 0.01, 0.00, 0.00, 0.00] },
    { token: ':', scores: [0.82, 0.18, 0.00, 0.00, 0.00, 0.00] },
    { token: 'O', scores: [0.45, 0.42, 0.13, 0.00, 0.00, 0.00] },
    { token: 'wilt', scores: [0.15, 0.22, 0.58, 0.05, 0.00, 0.00] },
    { token: 'thou', scores: [0.10, 0.12, 0.35, 0.43, 0.00, 0.00] },
    { token: 'leave', scores: [0.08, 0.05, 0.20, 0.32, 0.35, 0.00] },
    { token: 'me', scores: [0.25, 0.04, 0.12, 0.18, 0.22, 0.19] },
  ];

  return (
    <section id="lab" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-10"
      >
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e5ff]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
          <span>Interactive playground</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#ededed]">
          <CyberGlitchText text="Transformer Engine decoding console" scrambleOnMount={false} />
        </h2>
        <p className="text-sm text-[#a1a1a6] max-w-xl">
          Observe autoregressive token generation, sampling dials, and multi-head self-attention heatmaps from the PyTorch model.
        </p>
      </motion.div>

      {/* Main Console Box with Spotlight Card & BorderBeam */}
      <SpotlightCard className="shadow-2xl relative">
        <BorderBeam size={280} duration={14} colorFrom="#00e5ff" colorTo="#a855f7" borderWidth={1.5} />

        {/* Top Controls Bar */}
        <div className="p-4 sm:p-5 bg-[#141416] border-b border-[rgba(237,237,237,0.08)] grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Temperature Parameter */}
          <div className="md:col-span-5 space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#85858b] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#00e5ff]" />
                Temperature (T)
              </span>
              <span className="text-[#00e5ff] tabular-nums font-medium">{temperature.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-[#00e5ff] cursor-pointer h-1.5 bg-[#222327] rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#85858b]">
              <span>0.1 (argmax)</span>
              <span>0.8 (natural)</span>
              <span>1.5 (creative)</span>
            </div>
          </div>

          {/* Top-K Parameter */}
          <div className="md:col-span-4 space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#85858b]">Top-K cutoff</span>
              <span className="text-[#00e5ff] tabular-nums font-medium">{topK}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={topK}
              onChange={(e) => setTopK(parseInt(e.target.value))}
              className="w-full accent-[#00e5ff] cursor-pointer h-1.5 bg-[#222327] rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#85858b]">
              <span>1 (strict)</span>
              <span>15 (tuned)</span>
              <span>50 (all tokens)</span>
            </div>
          </div>

          {/* Run Action */}
          <div className="md:col-span-3 flex items-center justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRunSimulation}
              disabled={isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#00e5ff] text-[#0f0f10] hover:bg-[#33ebff] transition-all text-xs font-medium disabled:opacity-50 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isGenerating ? 'Generating...' : 'Run inference'}</span>
            </motion.button>
          </div>

        </div>

        {/* Console Workspace */}
        <div className="p-5 space-y-4">
          
          {/* Prompt Presets with Quick Pill Selectors */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-mono text-[#85858b]">Context prompt:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'ROMEO:\nO, wilt thou leave me',
                'KING RICHARD:\nWhat news, my Lord',
                'HAMLET:\nTo be or not to be'
              ].map(p => (
                <button
                  key={p}
                  onClick={() => { setPrompt(p); setOutput(''); }}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded transition-colors ${
                    prompt === p
                      ? 'bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 font-medium'
                      : 'text-[#85858b] hover:text-[#ededed] bg-[#141416]'
                  }`}
                >
                  {p.split('\n')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input Box */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={2}
            className="w-full bg-[#111214] text-[#ededed] font-mono text-xs p-3 rounded-lg border border-[rgba(237,237,237,0.08)] focus:border-[#00e5ff]/40 focus:outline-none resize-none leading-relaxed transition-colors"
            placeholder="Type your context prompt..."
          />

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[rgba(237,237,237,0.08)]">
            <div className="flex items-center gap-2">
              <span className="text-[#85858b]">View:</span>
              <button
                onClick={() => setViewMode('text')}
                className={`px-2.5 py-1 rounded transition-colors ${viewMode === 'text' ? 'bg-[#222327] text-[#00e5ff] font-medium' : 'text-[#85858b] hover:text-[#ededed]'}`}
              >
                Autoregressive stream
              </button>
              <button
                onClick={() => setViewMode('heatmap')}
                className={`px-2.5 py-1 rounded transition-colors ${viewMode === 'heatmap' ? 'bg-[#222327] text-[#00e5ff] font-medium' : 'text-[#85858b] hover:text-[#ededed]'}`}
              >
                Causal Attention Heatmap
              </button>
            </div>

            <AnimatedTooltip content="Metal Performance Shaders GPU kernel execution">
              <span className="text-[#85858b] hidden sm:inline cursor-help">MPS GPU Accelerated &bull; Loss 1.611</span>
            </AnimatedTooltip>
          </div>

          {/* Console Output Area */}
          {viewMode === 'text' ? (
            <div className="p-4 bg-[#111214] rounded-lg border border-[rgba(237,237,237,0.08)] font-mono text-xs text-[#ededed] min-h-[140px] whitespace-pre-wrap leading-relaxed shadow-inner">
              <span className="text-[#85858b] select-none">{prompt} </span>
              {output || (
                <span className="text-[#85858b]">
                  {isGenerating ? 'Evaluating logits...' : '// Click "Run inference" to decode tokens.'}
                </span>
              )}
              {isGenerating && <span className="inline-block w-1.5 h-3.5 bg-[#00e5ff] ml-1 animate-pulse" />}
            </div>
          ) : (
            /* Interactive Causal Attention Heatmap */
            <div className="p-4 bg-[#111214] rounded-lg border border-[rgba(237,237,237,0.08)] font-mono text-xs space-y-3 overflow-x-auto">
              <div className="text-[11px] text-[#85858b] pb-2 border-b border-[rgba(237,237,237,0.08)] flex justify-between">
                <span>Lower-triangular causal self-attention weights (Query &times; Key)</span>
                <span className="text-[#00e5ff]">Head 0 / 4</span>
              </div>
              <div className="space-y-1.5 min-w-[360px]">
                {sampleHeatmapRows.map((row, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-3">
                    <span className="w-14 text-right text-[#85858b] text-[11px] truncate">{row.token}</span>
                    <div className="flex gap-1.5 flex-1">
                      {row.scores.map((score, cIdx) => (
                        <div
                          key={cIdx}
                          title={`Q(${row.token}) attends to K(${cIdx}): ${(score * 100).toFixed(1)}%`}
                          style={{
                            backgroundColor: score > 0 ? `rgba(0, 229, 255, ${Math.max(score, 0.12)})` : 'rgba(255, 255, 255, 0.02)',
                          }}
                          className={`h-6 flex-1 rounded flex items-center justify-center text-[10px] text-[#ededed] transition-transform hover:scale-110 cursor-pointer ${
                            score > 0.4 ? 'font-medium text-[#0f0f10]' : 'text-[#a1a1a6]'
                          }`}
                        >
                          {score > 0 ? score.toFixed(2) : '-'}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engine Repo Footer */}
          <div className="flex items-center justify-between text-xs font-mono pt-2 text-[#85858b]">
            <div>Loss: 1.611 &bull; Block size: 64 &bull; 816k dials</div>
            <a
              href="https://github.com/deepanshutaikwani456-dt/transformer-engine"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ededed] hover:text-[#00e5ff] inline-flex items-center gap-1 transition-colors"
            >
              <span>View GitHub repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </SpotlightCard>
    </section>
  );
};

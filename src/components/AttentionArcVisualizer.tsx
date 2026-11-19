import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu } from 'lucide-react';

interface TokenNode {
  id: number;
  text: string;
}

export const AttentionArcVisualizer: React.FC = () => {
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(4);
  const [activeHead, setActiveHead] = useState<number>(0);

  const tokens: TokenNode[] = [
    { id: 0, text: 'ROMEO' },
    { id: 1, text: 'O' },
    { id: 2, text: 'wilt' },
    { id: 3, text: 'thou' },
    { id: 4, text: 'leave' },
    { id: 5, text: 'me' },
  ];

  // Attention matrices for 4 heads [Query][Key]
  const attentionWeightsByHead: Record<number, number[][]> = {
    0: [ // Head 0: Syntactic local
      [1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.6, 0.4, 0.0, 0.0, 0.0, 0.0],
      [0.2, 0.5, 0.3, 0.0, 0.0, 0.0],
      [0.1, 0.3, 0.4, 0.2, 0.0, 0.0],
      [0.1, 0.1, 0.6, 0.1, 0.1, 0.0],
      [0.3, 0.1, 0.1, 0.3, 0.1, 0.1],
    ],
    1: [ // Head 1: Long range coreference
      [1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.9, 0.1, 0.0, 0.0, 0.0, 0.0],
      [0.7, 0.1, 0.2, 0.0, 0.0, 0.0],
      [0.8, 0.05, 0.05, 0.1, 0.0, 0.0],
      [0.85, 0.05, 0.05, 0.02, 0.03, 0.0],
      [0.92, 0.02, 0.01, 0.02, 0.01, 0.02],
    ],
    2: [ // Head 2: Positional preceding token
      [1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.2, 0.8, 0.0, 0.0, 0.0, 0.0],
      [0.1, 0.2, 0.7, 0.0, 0.0, 0.0],
      [0.05, 0.1, 0.25, 0.6, 0.0, 0.0],
      [0.02, 0.05, 0.15, 0.28, 0.5, 0.0],
      [0.01, 0.02, 0.05, 0.12, 0.3, 0.5],
    ],
    3: [ // Head 3: Semantic verb-subject
      [1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.5, 0.5, 0.0, 0.0, 0.0, 0.0],
      [0.3, 0.1, 0.6, 0.0, 0.0, 0.0],
      [0.2, 0.1, 0.5, 0.2, 0.0, 0.0],
      [0.4, 0.0, 0.2, 0.3, 0.1, 0.0],
      [0.6, 0.0, 0.1, 0.2, 0.05, 0.05],
    ],
  };

  const weights = attentionWeightsByHead[activeHead][selectedTokenIndex];

  return (
    <div className="bg-[#141416] rounded-xl p-4 border border-[rgba(237,237,237,0.08)] space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1.5 text-[#00e5ff]">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Multi-Head Attention Arcs</span>
        </div>

        {/* Head Selector Tabs */}
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((head) => (
            <button
              key={head}
              onClick={() => setActiveHead(head)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                activeHead === head
                  ? 'bg-[#00e5ff] text-[#0f0f10] font-medium'
                  : 'text-[#85858b] hover:text-[#ededed] bg-[#18191c]'
              }`}
            >
              Head {head}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SVG Arc Canvas */}
      <div className="relative h-28 w-full flex items-end justify-center pb-2">
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
          {tokens.map((target, keyIndex) => {
            if (keyIndex > selectedTokenIndex) return null;
            const weight = weights[keyIndex];
            if (weight < 0.05) return null;

            // X positions calculated in percentage
            const startX = ((selectedTokenIndex + 0.5) / tokens.length) * 100;
            const endX = ((keyIndex + 0.5) / tokens.length) * 100;
            const distance = Math.abs(startX - endX);
            const arcHeight = Math.min(distance * 1.4 + 20, 90);

            return (
              <g key={keyIndex}>
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: Math.max(weight, 0.2) }}
                  transition={{ duration: 0.4 }}
                  d={`M ${startX}% 90 C ${startX}% ${90 - arcHeight}, ${endX}% ${90 - arcHeight}, ${endX}% 90`}
                  fill="none"
                  stroke="#00e5ff"
                  strokeWidth={Math.max(weight * 3.5, 1)}
                  strokeDasharray={weight > 0.4 ? 'none' : '3 3'}
                />
              </g>
            );
          })}
        </svg>

        {/* Tokens Row */}
        <div className="grid grid-cols-6 w-full text-center relative z-10 gap-1">
          {tokens.map((token, index) => {
            const isSelected = selectedTokenIndex === index;
            const weight = weights[index] || 0;

            return (
              <button
                key={token.id}
                onClick={() => setSelectedTokenIndex(index)}
                className={`py-1.5 px-1 rounded-md text-xs font-mono transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                    : index <= selectedTokenIndex
                    ? 'bg-[#18191c] text-[#ededed] border-[rgba(237,237,237,0.1)] hover:border-[#00e5ff]/40'
                    : 'bg-[#141416] text-[#85858b] border-transparent opacity-40'
                }`}
              >
                <div className="font-medium truncate">{token.text}</div>
                {index <= selectedTokenIndex && (
                  <div className="text-[10px] text-[#85858b] tabular-nums">
                    {(weight * 100).toFixed(0)}%
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div className="text-[11px] font-mono text-[#85858b] flex justify-between items-center pt-2 border-t border-[rgba(237,237,237,0.06)]">
        <span>Click token to inspect query-key weights</span>
        <span className="text-[#00e5ff]">
          {activeHead === 0 && 'Syntactic context patterns'}
          {activeHead === 1 && 'Long-range coreference links'}
          {activeHead === 2 && 'Positional antecedent focus'}
          {activeHead === 3 && 'Semantic verb-argument binding'}
        </span>
      </div>
    </div>
  );
};

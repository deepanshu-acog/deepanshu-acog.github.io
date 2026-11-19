import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChatCircle,
  Brain,
  Database,
  TerminalWindow,
  Code,
  FileText,
  Check,
  CircleNotch,
  Clock,
  Minus,
  Globe,
  Cpu,
  Dna,
} from '@phosphor-icons/react';
import { cn } from '../utils/cn';

interface FeatCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function FeatCard({ title, description, children, className = '' }: FeatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative flex flex-col gap-2 overflow-hidden rounded-[20px] p-4',
        'bg-[#18191c] border border-[rgba(237,237,237,0.08)] hover:border-[rgba(0,229,255,0.3)] transition-colors duration-300',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_4px_16px_-2px_rgba(0,0,0,0.5)]',
        className
      )}
    >
      <div className="z-10 flex flex-col gap-1">
        <h3 className="font-medium text-[#ededed] text-sm tracking-tight">{title}</h3>
        <p className="text-[#85858b] text-xs leading-relaxed max-w-[95%]">{description}</p>
      </div>
      <div className="relative mt-2 flex-1 w-full rounded-[14px] overflow-hidden border border-[rgba(237,237,237,0.06)] bg-[#111214]">
        {children}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Card 1 – Agent Pipeline
   Minimalist precise node graph with real-time task flows
───────────────────────────────────────────── */
type ActiveStep = 'request' | 'router' | 'agent' | 'memory' | 'tools' | 'response';
const VW = 320;
const VH = 240;

const NODES = [
  { id: 'A', x: 50, y: 120, icon: ChatCircle, label: 'USER QUERY', type: 'box' },
  { id: 'Router', x: 125, y: 120, type: 'circle' },
  { id: 'C', x: 200, y: 120, icon: Brain, label: 'GEMINI DAG', type: 'box' },
  { id: 'B', x: 280, y: 50, icon: Database, label: 'VECTOR RAG', type: 'box' },
  { id: 'D', x: 280, y: 190, icon: Dna, label: 'BIO TOOLS', type: 'box' },
];

const PATHS = [
  { id: 'a-to-router', d: 'M 78 120 L 113 120', activeSteps: ['request'], colorClass: 'text-[#00e5ff]' },
  { id: 'router-to-agent', d: 'M 137 120 L 172 120', activeSteps: ['agent'], colorClass: 'text-violet-400' },
  { id: 'agent-to-memory', d: 'M 200 92 L 200 50 L 252 50', activeSteps: ['memory'], colorClass: 'text-fuchsia-400' },
  { id: 'agent-to-tools', d: 'M 200 148 L 200 190 L 252 190', activeSteps: ['tools'], colorClass: 'text-emerald-400' },
  { id: 'response-flow-1', d: 'M 172 120 L 137 120', activeSteps: ['response'], colorClass: 'text-[#00e5ff]' },
  { id: 'response-flow-2', d: 'M 113 120 L 78 120', activeSteps: ['response'], colorClass: 'text-[#00e5ff]' },
];

const NODE_COLORS: Record<string, { bg: string; border: string; buttonBg: string; buttonBorder: string }> = {
  A: { bg: 'bg-[#00e5ff]/10', border: 'border-[#00e5ff]/60', buttonBg: 'bg-[#00e5ff]', buttonBorder: 'border-[#00e5ff]' },
  Router: { bg: 'bg-amber-500/10', border: 'border-amber-400/50', buttonBg: 'bg-amber-500', buttonBorder: 'border-amber-600' },
  C: { bg: 'bg-violet-500/10', border: 'border-violet-400/50', buttonBg: 'bg-violet-500', buttonBorder: 'border-violet-600' },
  B: { bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-400/50', buttonBg: 'bg-fuchsia-500', buttonBorder: 'border-fuchsia-600' },
  D: { bg: 'bg-emerald-500/10', border: 'border-emerald-400/50', buttonBg: 'bg-emerald-500', buttonBorder: 'border-emerald-600' },
};

export function Card1() {
  const [step, setStep] = useState<ActiveStep>('request');

  useEffect(() => {
    const steps: ActiveStep[] = ['request', 'router', 'agent', 'memory', 'tools', 'response'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % steps.length;
      setStep(steps[idx]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const isNodeActive = (nodeId: string) => {
    switch (step) {
      case 'request': return nodeId === 'A';
      case 'router': return nodeId === 'Router';
      case 'agent': return nodeId === 'C';
      case 'memory': return nodeId === 'C' || nodeId === 'B';
      case 'tools': return nodeId === 'C' || nodeId === 'D';
      case 'response': return nodeId === 'C' || nodeId === 'Router' || nodeId === 'A';
      default: return false;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-[#111214] flex items-center justify-center p-2">
      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <pattern id="clean-grid-bento" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.75" fill="rgba(237,237,237,0.06)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#clean-grid-bento)" />
      </svg>

      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet">
        <path d="M 78 120 L 113 120" fill="none" stroke="rgba(237,237,237,0.1)" strokeWidth="1" />
        <path d="M 137 120 L 172 120" fill="none" stroke="rgba(237,237,237,0.1)" strokeWidth="1" />
        <path d="M 200 92 L 200 50 L 252 50" fill="none" stroke="rgba(237,237,237,0.1)" strokeWidth="1" />
        <path d="M 200 148 L 200 190 L 252 190" fill="none" stroke="rgba(237,237,237,0.1)" strokeWidth="1" />

        {PATHS.map((p) => {
          const isActive = p.activeSteps.includes(step);
          if (!isActive) return null;
          return (
            <g key={p.id}>
              <motion.path
                d={p.d}
                fill="none"
                stroke="currentColor"
                className={p.colorClass}
                strokeWidth="3.5"
                strokeOpacity="0.25"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
              <motion.path
                d={p.d}
                fill="none"
                stroke="currentColor"
                className={p.colorClass}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </g>
          );
        })}

        {NODES.map((node) => {
          const isBox = node.type === 'box';
          const w = isBox ? 56 : 24;
          const h = isBox ? 56 : 24;
          const isActive = isNodeActive(node.id);
          const colorStyles = NODE_COLORS[node.id];

          return (
            <foreignObject key={node.id} x={node.x - w / 2} y={node.y - h / 2} width={w} height={h} className="overflow-visible">
              <div className="w-full h-full flex items-center justify-center">
                {isBox && node.icon ? (
                  <div
                    className={`w-full h-full rounded-[14px] border flex flex-col items-center justify-center text-white ${colorStyles.buttonBg} ${colorStyles.buttonBorder} shadow-lg`}
                  >
                    <div className="mb-0.5 flex items-center justify-center">
                      <node.icon className="w-5 h-5 text-[#0f0f10]" weight="fill" />
                    </div>
                    <span className="text-[7.5px] font-mono font-bold tracking-wider select-none text-[#0f0f10]">
                      {node.label}
                    </span>
                  </div>
                ) : (
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shadow-sm transition-all duration-300 ${
                    isActive ? 'bg-amber-500/20 border-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-[#18191c] border-[rgba(237,237,237,0.2)]'
                  }`}>
                    <motion.div
                      className={`w-2.5 h-2.5 rounded-full border border-dashed ${isActive ? 'border-amber-400' : 'border-[#85858b]'}`}
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    />
                  </div>
                )}
              </div>
            </foreignObject>
          );
        })}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 2 – Token & Inference Telemetry
───────────────────────────────────────────── */
export function Card2() {
  const bars = [45, 75, 35, 85, 60, 95, 50];
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-between p-3">
      <div className="flex gap-2">
        {[
          { label: 'Throughput', value: '42.4 t/s', trend: '+14%' },
          { label: 'CE Loss', value: '1.611', trend: '-35%' },
        ].map((s, i) => (
          <div key={i} className="flex-1 rounded-lg bg-[#141416] border border-[rgba(237,237,237,0.06)] p-2.5 select-none">
            <span className="text-[8px] text-[#85858b] font-mono uppercase tracking-widest">{s.label}</span>
            <div className="text-sm font-bold font-mono text-[#ededed] mt-1">{s.value}</div>
            <span className={`text-[8px] font-mono font-medium ${s.trend.startsWith('-') || s.trend.startsWith('+') ? 'text-[#00e5ff]' : 'text-emerald-400'}`}>
              {s.trend} vs baseline
            </span>
          </div>
        ))}
      </div>

      {/* Bar Chart with continuous physics */}
      <div className="flex-1 flex items-end gap-2 px-0.5 min-h-[75px]">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 h-full rounded-md bg-[#141416] border border-[rgba(237,237,237,0.06)] relative overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-[#00e5ff] rounded-t-sm"
              initial={{ height: '0%' }}
              animate={{
                height: [
                  `${h}%`,
                  `${Math.min(95, h + 15)}%`,
                  `${Math.max(10, h - 20)}%`,
                  `${h}%`
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + (i % 3) * 0.8,
                ease: 'easeInOut',
                delay: i * 0.1,
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2 px-0.5">
        {days.map((d, i) => (
          <p key={i} className="flex-1 text-center text-[8px] text-[#85858b] font-mono">{d}</p>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 3 – Stacked Infinite-Scroll Activity Feed
───────────────────────────────────────────── */
const STATUS_ICONS: Record<string, { icon: any; color: string; bg: string }> = {
  done: { icon: Check, color: 'text-emerald-400', bg: 'bg-emerald-400/15' },
  running: { icon: CircleNotch, color: 'text-[#00e5ff]', bg: 'bg-[#00e5ff]/15' },
  waiting: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/15' },
  idle: { icon: Minus, color: 'text-[#85858b]', bg: 'bg-[#18191c]' },
};

export function Card3() {
  const logs = [
    { agent: 'Supervisor', action: 'Decomposed clinical inquiry into DAG', status: 'done', t: '0.1s' },
    { agent: 'PubMed Worker', action: 'Retrieved 42 clinical papers with DOIs', status: 'done', t: '1.2s' },
    { agent: 'BLAST Agent', action: 'Aligning EGFR domain sequences…', status: 'running', t: '2.4s' },
    { agent: 'Patent Agent', action: 'Awaiting affinity scoring matrix', status: 'waiting', t: '—' },
    { agent: 'MDX Synthesizer', action: 'Queued for final report assembly', status: 'idle', t: '—' },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % logs.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [logs.length]);

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden p-3">
      <div className="w-full space-y-2">
        {logs.map((l, i) => {
          const isActive = i === activeIdx;
          const si = STATUS_ICONS[l.status];
          return (
            <motion.div
              key={l.agent}
              animate={{
                opacity: isActive ? 1 : 0.45,
                scale: isActive ? 1.02 : 0.98,
              }}
              className={`rounded-lg border px-3 py-2 flex items-center gap-2.5 transition-all ${
                isActive ? 'bg-[#18191c] border-[#00e5ff]/40 shadow-sm' : 'bg-[#141416] border-[rgba(237,237,237,0.06)]'
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${si.bg} ${si.color}`}>
                <si.icon className={`w-3 h-3 ${l.status === 'running' ? 'animate-spin' : ''}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-medium text-[#ededed]">{l.agent}</span>
                  <span className={`text-[8px] font-mono uppercase px-1 py-0.2 rounded ${si.bg} ${si.color}`}>{l.status}</span>
                </div>
                <p className="text-[10px] text-[#85858b] truncate leading-tight mt-0.5">{l.action}</p>
              </div>
              <span className="text-[9px] font-mono text-[#85858b] shrink-0">{l.t}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 4 – Knowledge Base Namespaces (ChromaDB)
───────────────────────────────────────────── */
export function Card4() {
  const namespaces = [
    { name: 'PubMed / BioRxiv', hits: 342, fill: 88, color: 'from-[#00e5ff] to-cyan-400' },
    { name: 'Patent Filings (USPTO)', hits: 218, fill: 62, color: 'from-violet-500 to-violet-400' },
    { name: 'ClinicalTrials.gov', hits: 147, fill: 45, color: 'from-emerald-500 to-emerald-400' },
    { name: 'UniProt Sequences', hits: 89, fill: 28, color: 'from-amber-500 to-amber-400' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4">
      <div className="flex items-center justify-between pb-2 border-b border-[rgba(237,237,237,0.06)]">
        <span className="text-xs font-mono text-[#ededed]">ChromaDB Hybrid Vector Store</span>
        <span className="text-[10px] font-mono text-[#4cc38a] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4cc38a] animate-pulse" />
          50,000+ EMBEDDINGS
        </span>
      </div>

      <div className="space-y-3 pt-2">
        {namespaces.map((ns, i) => (
          <div key={ns.name} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#a1a1a6]">{ns.name}</span>
              <span className="text-[#ededed] tabular-nums">{ns.hits} records</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#18191c] overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${ns.color}`}
                initial={{ width: '0%' }}
                whileInView={{ width: `${ns.fill}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-[10px] font-mono text-[#85858b] flex justify-between">
        <span>Cosine similarity threshold: 0.88</span>
        <span>Latency: &lt;18ms</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 5 – Biopharma Tool Inspector
───────────────────────────────────────────── */
export function Card5() {
  const tools = [
    { name: 'BLAST Alignment', calls: 842, latency: '120ms', progress: 85, color: 'bg-[#00e5ff]' },
    { name: 'PyMOL Structure', calls: 520, latency: '240ms', progress: 65, color: 'bg-emerald-400' },
    { name: 'Patent Matcher', calls: 380, latency: '85ms', progress: 50, color: 'bg-violet-400' },
    { name: 'Trial Cohorts', calls: 290, latency: '150ms', progress: 40, color: 'bg-amber-400' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 space-y-2">
      <div className="flex items-center justify-between text-xs font-mono text-[#85858b]">
        <span>TOOL EXECUTIONS</span>
        <span className="text-[#00e5ff]">13+ TOOLS CLUSTER</span>
      </div>

      <div className="space-y-2 flex-1 justify-center flex flex-col">
        {tools.map((t) => (
          <div key={t.name} className="p-2 rounded bg-[#141416] border border-[rgba(237,237,237,0.06)] space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#ededed]">{t.name}</span>
              <span className="text-[#85858b]">{t.latency}</span>
            </div>
            <div className="w-full h-1 bg-[#18191c] rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${t.color}`}
                initial={{ width: '0%' }}
                whileInView={{ width: `${t.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Agent Bento Grid Component
───────────────────────────────────────────── */
export function AgentBentoGrid() {
  return (
    <section id="capabilities" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="space-y-2 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e5ff]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
          <span>Interactive multi-agent matrix</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#ededed]">
          Production Multi-Agent Workspace &amp; Tool Cluster
        </h2>
        <p className="text-sm text-[#a1a1a6] max-w-2xl">
          Derived from the architecture Deepanshu deployed for 60+ scientists across biopharma enterprises, combining Google ADK, Gemini, Celery, and custom tool runners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeatCard
          title="Agent Pipeline Flow"
          description="Observe query DAG routing, subagent delegation, and tool callbacks in real time."
          className="lg:col-span-1 h-[270px]"
        >
          <Card1 />
        </FeatCard>

        <FeatCard
          title="Inference & Loss Monitor"
          description="Live PyTorch generation throughput and cross-entropy loss descent tracking."
          className="lg:col-span-1 h-[270px]"
        >
          <Card2 />
        </FeatCard>

        <FeatCard
          title="Active Agent Event Bus"
          description="Real-time event stream of task scheduling, PubMed retrieval, and tool executions."
          className="lg:col-span-1 h-[270px]"
        >
          <Card3 />
        </FeatCard>

        <FeatCard
          title="Vector Memory & Knowledge Base"
          description="Semantic vector search across literature, clinical trials, and biological patents."
          className="lg:col-span-2 h-[270px]"
        >
          <Card4 />
        </FeatCard>

        <FeatCard
          title="Tool Cluster Inspector"
          description="Execution latency and call volume monitoring for 13+ bioinformatics tools."
          className="lg:col-span-1 h-[270px]"
        >
          <Card5 />
        </FeatCard>
      </div>
    </section>
  );
}

export default AgentBentoGrid;

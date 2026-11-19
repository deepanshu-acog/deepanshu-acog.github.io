import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Bot, Database, FileText, CheckCircle2, Cpu, Sparkles, Activity, Layers } from 'lucide-react';

interface AgentNode {
  id: string;
  label: string;
  role: string;
  status: 'idle' | 'active' | 'complete';
  latency: string;
  icon: any;
  tech: string;
}

export const AgentWorkflowVisualizer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([
    "Pipeline initialized in standby state.",
    "Ready to orchestrate 13+ bioinformatics tools via Google ADK.",
  ]);

  const nodes: AgentNode[] = [
    {
      id: 'intent',
      label: 'Supervisor Agent',
      role: 'Gemini Intent Parser & Task DAG',
      status: activeStep === 0 ? 'active' : activeStep > 0 ? 'complete' : 'idle',
      latency: '120ms',
      icon: Bot,
      tech: 'Gemini 1.5 + BAML',
    },
    {
      id: 'literature',
      label: 'Literature Agent',
      role: 'PubMed & BioRxiv Retrieval',
      status: activeStep === 1 ? 'active' : activeStep > 1 ? 'complete' : 'idle',
      latency: '240ms',
      icon: Layers,
      tech: 'REST + Citations API',
    },
    {
      id: 'bio-tools',
      label: 'Biopharma Tool Cluster',
      role: '13+ Specialized Biological CLI Tools',
      status: activeStep === 2 ? 'active' : activeStep > 2 ? 'complete' : 'idle',
      latency: '380ms',
      icon: Cpu,
      tech: 'Celery + Redis Workers',
    },
    {
      id: 'rag',
      label: 'Hybrid Vector RAG',
      role: 'ChromaDB + PostgreSQL Synthesis',
      status: activeStep === 3 ? 'active' : activeStep > 3 ? 'complete' : 'idle',
      latency: '150ms',
      icon: Database,
      tech: 'Vector Embeddings',
    },
    {
      id: 'output',
      label: 'MDX Micro-App Engine',
      role: 'Autonomous Interactive Dashboard Output',
      status: activeStep === 4 ? 'active' : activeStep > 4 ? 'complete' : 'idle',
      latency: '80ms',
      icon: FileText,
      tech: 'Next.js + Dynamic MDX',
    },
  ];

  const handleRunSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setLogs(["[00:00.000] [INCOMING] User request: 'Audit EGFR inhibitor pipeline across recent clinical trials'"]);

    const steps = [
      { step: 0, log: "[00:00.120] [SUPERVISOR] Parsed query intent DAG: Target=EGFR, Modality=Small Molecule, Task=Literature+Trial Audit" },
      { step: 1, log: "[00:00.360] [LITERATURE] Queried PubMed & BioRxiv: Retrieved 42 clinical papers, 8 verified patent filings" },
      { step: 2, log: "[00:00.740] [TOOL-RUNNER] Dispatched 13 biopharma tools: BLAST sequence alignment & affinity scoring complete" },
      { step: 3, log: "[00:00.890] [RAG-ENGINE] Vector semantic ranking: Ingested chunks into ChromaDB, confidence threshold: 0.94" },
      { step: 4, log: "[00:00.970] [SYNTHESIS] Rendered interactive MDX micro-app dashboard. Pipeline completed in 970ms" },
    ];

    steps.forEach(({ step, log }, index) => {
      setTimeout(() => {
        setActiveStep(step);
        setLogs(prev => [...prev, log]);
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
          }, 600);
        }
      }, (index + 1) * 700);
    });
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e5ff]">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
            <span>Multi-agent architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#ededed]">
            Autonomous Biopharma Agent Execution Flow
          </h2>
          <p className="text-sm text-[#a1a1a6] max-w-2xl">
            Live interactive telemetry representing the distributed multi-agent systems Deepanshu engineered for 60+ scientists across 3+ biopharma enterprise clients.
          </p>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#00e5ff] text-[#0f0f10] hover:bg-[#33ebff] active:scale-[0.98] transition-[background-color,transform] text-xs font-medium disabled:opacity-50 self-start shadow-sm"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isRunning ? 'Orchestrating agents...' : 'Simulate pipeline run'}</span>
        </button>
      </div>

      {/* Pipeline Container */}
      <div className="bg-[#18191c] rounded-xl border border-[rgba(237,237,237,0.08)] p-6 space-y-8 shadow-raised overflow-hidden relative">
        
        {/* Animated Connection Highway */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isActive = node.status === 'active';
            const isComplete = node.status === 'complete';

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#222327] border-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.15)] ring-1 ring-[#00e5ff]/50'
                    : isComplete
                    ? 'bg-[#141416] border-[#4cc38a]/40'
                    : 'bg-[#141416] border-[rgba(237,237,237,0.08)]'
                }`}
              >
                {/* Node Step Header */}
                <div className="flex items-center justify-between text-[10px] font-mono mb-3">
                  <span className="text-[#85858b]">STEP 0{index + 1}</span>
                  {isActive ? (
                    <span className="text-[#00e5ff] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping" />
                      RUNNING
                    </span>
                  ) : isComplete ? (
                    <span className="text-[#4cc38a] flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      DONE
                    </span>
                  ) : (
                    <span className="text-[#85858b]">IDLE</span>
                  )}
                </div>

                {/* Node Icon & Titles */}
                <div className="space-y-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? 'bg-[#00e5ff]/20 text-[#00e5ff]' : 'bg-[#18191c] text-[#a1a1a6]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-[#ededed]">
                      {node.label}
                    </h3>
                    <p className="text-[11px] text-[#85858b] leading-snug mt-0.5">
                      {node.role}
                    </p>
                  </div>
                </div>

                {/* Tech Badge & Latency */}
                <div className="pt-3 mt-3 border-t border-[rgba(237,237,237,0.06)] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#85858b] truncate max-w-[90px]">{node.tech}</span>
                  <span className="text-[#a1a1a6]">{node.latency}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Execution Telemetry Stream */}
        <div className="bg-[#111214] rounded-lg p-4 border border-[rgba(237,237,237,0.08)] space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-[#85858b] pb-2 border-b border-[rgba(237,237,237,0.06)]">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#00e5ff]" />
              <span>ORCHESTRATION EVENT BUS (atk-event-bus stream)</span>
            </div>
            <span>CELERY / REDIS WORKERS</span>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-2">
            {logs.map((log, lIdx) => (
              <motion.div
                key={lIdx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[#ededed] leading-relaxed flex items-start gap-2"
              >
                <span className="text-[#00e5ff] select-none">&gt;</span>
                <span className={lIdx === logs.length - 1 ? 'text-[#00e5ff]' : 'text-[#a1a1a6]'}>
                  {log}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { AgentBentoGrid } from './components/AgentBentoGrid';
import { Projects } from './components/Projects';
import { InteractiveLab } from './components/InteractiveLab';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundCanvas } from './components/BackgroundCanvas';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f0f10] text-[#ededed] selection:bg-[#00e5ff]/20 selection:text-[#ededed] relative overflow-x-hidden">
      {/* Dynamic Interactive Neural Constellation Background Canvas */}
      <BackgroundCanvas />

      {/* Foreground Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="space-y-24 pb-16">
          <Hero />
          <BentoGrid />
          <AgentBentoGrid />
          <Projects />
          <InteractiveLab />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;

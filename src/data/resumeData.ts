export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: 'AI / LLM' | 'Full-Stack' | 'SaaS Platform';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tech: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const RESUME_DATA = {
  name: "Deepanshu Taikwani",
  role: "Agentic AI Developer & Full Stack Engineer",
  tagline: "Architecting Multi-Agent LLM Systems & High-Performance Production Platforms",
  bio: "Agentic AI Developer with 2.5+ years of experience building autonomous multi-agent systems and production full-stack platforms. Built platforms orchestrating 13+ bioinformatics tools for 60+ scientists across 3+ biopharma enterprise clients. Passionate about LLM internals, reactive UI systems, and sub-500ms web experiences.",
  location: "Hyderabad, India",
  email: "deepanshutaikwani456@gmail.com",
  phone: "+91 9982082656",
  links: {
    github: "https://github.com/deepanshutaikwani456-dt",
    linkedin: "https://linkedin.com/in/deepanshutaikwani",
  },
  stats: [
    { label: "Bioinformatics Tools Orchestrated", value: "13+" },
    { label: "Enterprise Pharma Users", value: "60+" },
    { label: "Bundle Size Reduction", value: "70%" },
    { label: "SaaS Records Handled", value: "50k+" },
  ],
  experiences: [
    {
      company: "Aganitha Cognitive Solutions",
      role: "Junior Agentic AI Developer",
      period: "Sept 2025 – Present",
      location: "Hyderabad, India",
      highlights: [
        "Architected an agentic AI platform using Next.js, Node.js, and a multi-agent LLM system that orchestrates 13+ bioinformatics tools, enabling non-engineering scientists to independently run complex analyses.",
        "Collaborated with bioinformatics scientists to define workflow requirements and validate outputs, driving adoption among 60+ users across 3+ biopharma clients and reducing manual workflow configuration time by 25%.",
        "Built a 'Create Micro-app' feature that automatically transforms LLM-generated research reports into interactive MDX dashboards, cutting dashboard creation time from hours to minutes across client organizations."
      ],
      tech: ["Multi-Agent Systems", "Google ADK", "Gemini API", "Next.js", "Node.js", "RAG", "BAML"]
    },
    {
      company: "Aganitha Cognitive Solutions",
      role: "Junior Web Developer",
      period: "Sept 2024 – Aug 2025",
      location: "Hyderabad, India",
      highlights: [
        "Solely designed and developed the end-to-end frontend of DBTIPS, a bioinformatics and market-intelligence SaaS platform (React 18, TypeScript, Vite) serving internal R&D teams and enterprise pharma clients across drug pipeline, patent, and patient dataset modules, handling 50,000+ records.",
        "Applied React.lazy, Suspense, and code-splitting across 30+ components to achieve a 70% bundle size reduction and 50% faster FCP, bringing load times under 500 ms across data-heavy modules."
      ],
      tech: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "Performance Optimization"]
    },
    {
      company: "Aganitha Cognitive Solutions",
      role: "Web Developer Intern",
      period: "Jan 2024 – Aug 2024",
      location: "Hyderabad, India",
      highlights: [
        "Designed and owned ACE (Enzyme Characterization & Optimization Platform) end-to-end, from Figma wireframes to a production React frontend supporting multiple deep learning modules.",
        "Wrote end-to-end tests with Playwright and JavaScript covering critical user workflows in React.js applications."
      ],
      tech: ["React.js", "Figma", "Playwright", "E2E Testing", "JavaScript"]
    }
  ] as Experience[],
  projects: [
    {
      id: "transformer-engine",
      title: "Transformer Engine: GPT from Scratch",
      subtitle: "First-Principles PyTorch Decoder-Only LLM",
      description: "A complete, modular Decoder-only Transformer built from scratch in pure PyTorch. Solved the Bigram baseline loss ceiling (2.46) down to 1.61 with custom Causal Multi-Head Self-Attention, Pre-LN residual highways, in-terminal ASCII attention heatmaps, and advanced Top-K/Top-P decoding.",
      tags: ["PyTorch", "Transformers", "Self-Attention", "Top-K / Top-P", "Python", "CLI Tooling"],
      metrics: "Loss: 2.46 → 1.61 | 816k Dials | 60s Training",
      githubUrl: "https://github.com/deepanshutaikwani456-dt/transformer-engine",
      liveUrl: "https://deepanshutaikwani456-dt.github.io/transformer-engine/",
      featured: true,
      category: "AI / LLM"
    },
    {
      id: "biowatch",
      title: "BioWatch: Autonomous Biopharma Agent",
      subtitle: "Scheduled Literature & News Intelligence System",
      description: "Autonomous biopharma research-monitoring agent built with Google ADK and Gemini API that interprets natural-language queries, retrieves academic literature and industry news, and generates structured MDX reports with verified citations. Powered by Celery & Redis for scheduled tracking and real-time Google Chat alerts.",
      tags: ["Google ADK", "Gemini API", "FastAPI", "Celery", "Redis", "Docker", "RAG"],
      metrics: "Multi-step intent parsing & validation | Scheduled subscriptions",
      featured: true,
      category: "AI / LLM"
    },
    {
      id: "dbtips",
      title: "DBTIPS: Enterprise Bioinformatics Platform",
      subtitle: "Market-Intelligence SaaS with 50,000+ Records",
      description: "End-to-end frontend architecture for an enterprise bioinformatics SaaS platform serving internal R&D and pharma clients across drug discovery pipelines, patent databases, and clinical patient cohorts. Engineered 70% bundle reduction via aggressive code-splitting.",
      tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "Performance"],
      metrics: "50k+ records | <500ms FCP | 70% smaller bundle",
      featured: true,
      category: "SaaS Platform"
    },
    {
      id: "ace-platform",
      title: "ACE: Enzyme Optimization Platform",
      subtitle: "Deep Learning Enzyme Characterization UI",
      description: "Production React interface for deep learning protein and enzyme optimization models. Designed from wireframes to high-performance interface with comprehensive Playwright end-to-end test suites.",
      tags: ["React", "Deep Learning UI", "Playwright", "Figma", "TypeScript"],
      featured: false,
      category: "Full-Stack"
    }
  ] as Project[],
  skillCategories: [
    {
      title: "AI & LLM Orchestration",
      icon: "Cpu",
      skills: ["Agentic AI", "Multi-Agent Systems", "Tool Calling", "RAG Pipelines", "Prompt Engineering", "Google ADK", "Gemini API", "BAML", "ChromaDB (Vector DB)", "PyTorch Internals"]
    },
    {
      title: "Frontend Engineering",
      icon: "Layout",
      skills: ["React 18 / 19", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vite", "Zustand", "React Query", "Framer Motion", "MDX"]
    },
    {
      title: "Backend & Systems",
      icon: "Server",
      skills: ["Node.js", "FastAPI", "Python", "Express.js", "SSE Streaming", "WebSockets", "GraphQL", "REST APIs", "Java"]
    },
    {
      title: "Data & Infrastructure",
      icon: "Database",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Docker", "Celery", "AWS", "Nginx", "GitHub Actions (CI/CD)", "Playwright", "Linux"]
    }
  ] as SkillCategory[],
  education: {
    institution: "University of Hyderabad",
    degree: "Master of Computer Applications (MCA)",
    period: "Nov 2022 – May 2024",
    gpa: "8.4 / 10.0",
    location: "Hyderabad, Telangana"
  }
};

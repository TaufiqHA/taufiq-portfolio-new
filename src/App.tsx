/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  ArrowUpRight, 
  Download, 
  Eye, 
  Github, 
  Linkedin, 
  FileText,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Page, Project } from './types.ts';

const PROJECTS: Project[] = [
  {
    id: 'neural-sync',
    title: 'NEURAL_SYNC_OS',
    description: 'A distributed operating system layer for machine learning workloads.',
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000',
    tags: ['Distributed Systems', 'MLOps', 'Go'],
    fullDescription: 'NEURAL_SYNC_OS is a research-driven distributed operating system designed specifically to handle the volatile compute requirements of modern deep learning training clusters. It introduces a novel resource abstraction layer that treats heterogeneous GPUs as a unified compute fabric.',
    challenges: [
      'Managing low-latency communication between non-coherent memory domains.',
      'Developing a fail-safe scheduler for preemptible instance clusters.',
      'Implementing real-time telemetry for multi-node gradient synchronization.'
    ],
    solutions: [
      'Engineered a custom RPC protocol in Go reducing overhead by 35%.',
      'Implemented a tiered memory management system for efficient state transfer.',
      'Created a visual debugger for cluster-wide bottleneck identification.'
    ],
    results: 'Deployment saw a 22% increase in GPU utilization across a 128-node cluster, with a 15% reduction in overall training time for LLM-scale models.',
    year: '2023',
    client: 'Autonomous Systems Research'
  },
  {
    id: 'kinetic-eng',
    title: 'KINETIC_ENG',
    description: 'High-performance physical simulation engine for industrial automation.',
    imageUrl: 'https://images.unsplash.com/photo-1537467300446-37ca79b88d42?auto=format&fit=crop&q=80&w=2000',
    tags: ['C++', 'Robotics', 'Physics'],
    fullDescription: 'A deterministic physics engine designed for high-fidelity mechanical simulations. KINETIC_ENG enables engineers to stress-test robotic armatures in virtual environments with sub-millimeter precision before physical prototyping.',
    challenges: [
      'Achieving deterministic results across different CPU architectures.',
      'Simulating complex multi-body constraints in real-time.',
      'Integrating with legacy industrial automation CAD formats.'
    ],
    solutions: [
      'Developed a SIMD-optimized constraint solver using C++20.',
      'Implemented a spatial hashing algorithm for ultra-fast collision detection.',
      'Created a plugin-based architecture for custom mechanical constraints.'
    ],
    results: 'Reduced physical prototype failures by 60% for a leading robotics firm, saving approximately $2.1M in hardware costs.',
    year: '2022',
    client: 'Precision Robotics Corp'
  },
  {
    id: 'prism-ui',
    title: 'PRISM_UI',
    description: 'A design system architecture focusing on crystalline geometric primitives.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000',
    tags: ['Design Systems', 'React', 'Theming'],
    fullDescription: 'PRISM_UI is not just a UI library, but an architectural framework for building mathematically-derived interfaces. It uses a custom constraint-based engine to generate layouts that are perfectly balanced across any viewport.',
    challenges: [
      'Creating a truly resolution-independent typography system.',
      'Balancing extreme aesthetic minimalism with complex functional accessibility.',
      'Managing dynamic theme generation based on ambient lighting data.'
    ],
    solutions: [
      'Engineered a fluid-scaling engine using CSS custom properties and JS hooks.',
      'Implemented a rigorous ARIA-driven component architecture.',
      'Developed a crystalline geometry engine for generative background patterns.'
    ],
    results: 'Standardized UI development across 14 internal product teams, reducing design-to-code latency by 75%.',
    year: '2022',
    client: 'Lumina Digital'
  },
  {
    id: 'infra-strata',
    title: 'INFRA_STRATA',
    description: 'Cloud infrastructure visualization tool for complex multi-region clusters.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
    tags: ['AWS', 'K8s', 'Data Viz'],
    fullDescription: 'An interactive 3D map for cloud infrastructure. INFRA_STRATA translates abstract YAML configurations into a living, breathing digital twin of an entire organization\'s cloud ecosystem.',
    challenges: [
      'Visualizing over 5,000 active nodes without sacrificing browser performance.',
      'Maintaining real-time synchronization with dynamic cloud state changes.',
      'Designing intuitive interactions for navigating deep hierarchical structures.'
    ],
    solutions: [
      'Utilized Three.js and WebGL for hardware-accelerated rendering.',
      'Implemented a WebSocket-based delta sync for live infrastructure updates.',
      'Created a "semantic zoom" system that adjusts detail based on camera distance.'
    ],
    results: 'Decreased average incident response time by 30% by allowing SREs to visually locate cluster bottlenecks in seconds.',
    year: '2021',
    client: 'CloudScale Global'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigateToProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentPage('project-detail');
  };

  const handleBackToWork = () => {
    setCurrentPage('work');
    setSelectedProjectId(null);
  };

  const Nav = () => (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline/50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button 
          onClick={() => {
            setCurrentPage('home');
            setSelectedProjectId(null);
          }}
          className="font-serif text-2xl font-bold tracking-tighter hover:text-primary transition-colors cursor-pointer"
        >
          TaufiqHA
        </button>
        <div className="hidden md:flex gap-8">
          {(['home', 'work', 'contact'] as Page[]).map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                setSelectedProjectId(null);
              }}
              className={`label-caps cursor-pointer hover:text-primary transition-colors relative pb-1 ${
                currentPage === page || (page === 'work' && currentPage === 'project-detail') ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              {page}
              {(currentPage === page || (page === 'work' && currentPage === 'project-detail')) && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-primary"
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Terminal size={18} className="text-primary" />
        </div>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="w-full py-12 px-6 border-t border-outline/50 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-serif text-2xl font-bold italic">TAUFIQ_HA</div>
        <div className="flex gap-8">
          <a href="#" className="label-caps text-on-surface-variant hover:text-primary transition-colors">Github</a>
          <a href="#" className="label-caps text-on-surface-variant hover:text-primary transition-colors">Linkedin</a>
          <a href="#" className="label-caps text-on-surface-variant hover:text-primary transition-colors">Source</a>
        </div>
        <div className="label-caps text-on-surface-variant">
          © 2024 TAUFIQ_HA. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Nav />
      
      <main className="pt-12 min-h-[calc(100vh-64px)]">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <HomeScreen key="home" onNavigateWork={() => setCurrentPage('work')} />}
          {currentPage === 'work' && <WorkScreen key="work" onSelectProject={handleNavigateToProject} />}
          {currentPage === 'contact' && <ContactScreen key="contact" />}
          {currentPage === 'project-detail' && selectedProjectId && (
            <ProjectDetailScreen 
              key="detail" 
              projectId={selectedProjectId} 
              onBack={handleBackToWork} 
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function HomeScreen({ onNavigateWork }: { onNavigateWork: () => void; key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-7xl mx-auto px-6"
    >
      {/* Hero */}
      <section className="py-8 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-4">
            <span className="label-caps text-primary block">Architect of Digital Logic</span>
            <h1 className="text-6xl md:text-8xl leading-[1.0] md:leading-[0.9] font-normal tracking-tight">
              Crafting systems,<br/>not just websites.
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-xl leading-relaxed font-light">
            I am a Full-Stack Engineer focused on high-performance architectures and elegant codebases. 
            My approach combines technical rigor with a minimalist editorial aesthetic to build tools that last.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-primary text-on-primary px-8 py-4 label-caps flex items-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/10">
              DOWNLOAD CV <Download size={14} />
            </button>
            <button 
              onClick={onNavigateWork}
              className="border border-outline px-8 py-4 label-caps flex items-center gap-3 hover:bg-surface-container transition-all active:scale-95"
            >
              VIEW PROJECTS <Eye size={14} />
            </button>
          </div>
        </div>
        <div className="md:col-span-5 relative aspect-[4/5] bg-surface-container overflow-hidden rounded-sm group">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5kl_4NZplC8WwlW11YFw9v4DwYvN1mhKe2nvT1YKGTTz7qekARWuFWSukfoTU40ViNpErapZhiH3DaR5AgkD_6hFEjrvyznedQE5YMstp8Z_NiwpYjP-f_kzedA0lgl__tuZNqNIfHkZV0wROD8tD_O-OfS4z-SxLrh_9-Q6sziEUYh9xPDHE5F2uRFeQLWbR54gY6ugmgBr-QV1btOVCr6ec5KWMVO5za4SwnAgyg0_M0u8TFiBZG0q-oBPRrAz-GsazIC6AHklK" 
            alt="Portrait"
            className="w-full h-full object-cover filter saturate-0 group-hover:saturate-100 transition-all duration-1000 ease-out"
          />
          <div className="absolute inset-0 border border-foreground/5 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Expertise */}
      <section className="py-12 border-t border-outline/50 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 lg:col-span-3 sticky top-32 h-fit">
          <h2 className="text-4xl md:text-5xl">Background & Expertise</h2>
          <p className="mt-4 text-on-surface-variant">A narrative of my technical focus and professional milestones.</p>
        </div>
        <div className="md:col-span-8 lg:col-span-8 lg:col-start-5 space-y-24">
          <div>
            <h3 className="label-caps text-primary border-b border-outline/50 pb-4 mb-8">Technical Proficiency</h3>
            <div className="space-y-6 text-lg md:text-xl text-on-surface-variant leading-relaxed">
              <p>My stack architecture spans the full spectrum of modern web development. On the frontend, I specialize in <span className="text-foreground font-medium underline decoration-primary/30">React, Vue.js, and modern JavaScript</span>, crafting performant and reactive interfaces.</p>
              <p>Backend logic and robust systems are powered by <span className="text-foreground font-medium underline decoration-primary/30">Laravel, Node.js, and PHP</span>, ensuring secure and scalable server-side environments.</p>
              <p>For data integrity and storage, I leverage <span className="text-foreground font-medium underline decoration-primary/30">MySQL, PostgreSQL, and SQLite</span>, architecting efficient database schemas for varied application needs.</p>
            </div>
          </div>

          <div>
            <h3 className="label-caps text-primary border-b border-outline/50 pb-4 mb-8">Career Chronology</h3>
            <div className="space-y-12">
              {[
                { role: 'Full Stack Web Developer', company: 'Freelance', period: '2020 — PRESENT', desc: 'Delivering end-to-end web solutions for global clients. Specializing in high-performance React architectures, responsive UI/UX design, and robust backend integrations. Managing full project lifecycles from architectural design to secure cloud deployment.' }
              ].map((job, i) => (
                <div key={i} className="group">
                  <div className="flex flex-col md:flex-row justify-between md:items-baseline gap-2 mb-4">
                    <h4 className="text-3xl">
                      {job.role} <span className="text-on-surface-variant font-light italic">at {job.company}</span>
                    </h4>
                    <span className="label-caps text-on-surface-variant/70 shrink-0">{job.period}</span>
                  </div>
                  <p className="text-lg text-on-surface-variant max-w-3xl leading-relaxed">{job.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function WorkScreen({ onSelectProject }: { onSelectProject: (id: string) => void; key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 pb-24"
    >
      <header className="pt-20 pb-12 max-w-2xl">
        <h1 className="text-7xl md:text-8xl mb-8">Selected Works.</h1>
        <p className="text-xl text-on-surface-variant font-light leading-relaxed">
          A collection of technical explorations and architectural systems focused on performance and modularity.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-32">
        {PROJECTS.map((project, i) => (
          <motion.article 
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group cursor-pointer"
            onClick={() => onSelectProject(project.id)}
          >
            <div className="aspect-[16/9] w-full overflow-hidden bg-surface-container mb-8 rounded-sm relative shadow-sm border border-outline/30">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover filter saturate-0 group-hover:scale-105 group-hover:saturate-100 transition-all duration-700 ease-out"
              />
            </div>
            <div className="flex justify-between items-center group-hover:text-primary transition-colors">
              <div className="space-y-4">
                <div className="flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="label-caps px-2 py-1 border border-outline/50 text-[9px] opacity-70">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-4xl md:text-5xl">{project.title}</h2>
              </div>
              <ArrowUpRight size={40} className="stroke-1 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
            </div>
          </motion.article>
        ))}
      </div>

      <section className="mt-32 pt-12 border-t border-outline/50 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <h3 className="label-caps mb-4">CORE_CAPABILITIES</h3>
          <p className="text-on-surface-variant text-sm">Specializing in performance optimization and distributed systems.</p>
        </div>
        {[
          { title: 'FRONTEND', items: ['React / Vue.js', 'Tailwind CSS', 'JavaScript (ES6+)'] },
          { title: 'BACKEND', items: ['Laravel / PHP', 'Node.js', 'REST APIs'] },
          { title: 'DATABASE', items: ['MySQL', 'PostgreSQL', 'SQLite'] }
        ].map(cat => (
          <div key={cat.title}>
            <h4 className="label-caps text-primary mb-4">{cat.title}</h4>
            <ul className="space-y-1 text-on-surface-variant font-light">
              {cat.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </section>
    </motion.div>
  );
}

function ContactScreen({ key }: { key?: React.Key } = {}) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center py-24"
    >
      <div className="text-center mb-16 space-y-6">
        <h1 className="text-7xl md:text-9xl leading-none">Initiate Communication.</h1>
        <p className="text-xl text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
          Whether you have a specific project in mind or want to discuss technical architectures, I am available for high-impact collaborations.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-surface-dim p-12 border border-outline relative shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Mail size={120} />
        </div>
        
        <h2 className="label-caps text-primary mb-12 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-primary"></span> TRANSMISSION_FORM
        </h2>

        <form className="space-y-12 relative z-10">
          <div className="space-y-2 group">
            <label className="label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">NAME</label>
            <input 
              type="text" 
              placeholder="E.G. ALAN TURING"
              className="w-full bg-transparent border-b border-outline pb-4 focus:outline-none focus:border-primary font-serif text-2xl placeholder:text-on-surface-variant/20 transition-all"
            />
          </div>

          <div className="space-y-2 group">
            <label className="label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">EMAIL_ADDRESS</label>
            <input 
              type="email" 
              placeholder="E.G. ALAN@ENIGMA.TECH"
              className="w-full bg-transparent border-b border-outline pb-4 focus:outline-none focus:border-primary font-serif text-2xl placeholder:text-on-surface-variant/20 transition-all"
            />
          </div>

          <div className="space-y-2 group">
            <label className="label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">MESSAGE_BODY</label>
            <textarea 
              rows={4}
              placeholder="DESCRIBE YOUR PROJECT OR ARCHITECTURE..."
              className="w-full bg-transparent border-b border-outline pb-4 focus:outline-none focus:border-primary font-serif text-2xl placeholder:text-on-surface-variant/20 transition-all resize-none"
            />
          </div>

          <button className="w-full bg-primary text-on-primary py-6 label-caps text-sm hover:brightness-110 active:scale-[0.99] transition-all flex justify-center items-center gap-2">
            SEND_TRANSMISSION <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function ProjectDetailScreen({ projectId, onBack }: { projectId: string; onBack: () => void; key?: React.Key }) {
  const project = PROJECTS.find(p => p.id === projectId);

  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 pb-24"
    >
      <button 
        onClick={onBack}
        className="mt-16 mb-8 label-caps flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
      >
        <ArrowRight className="rotate-180" size={14} /> BACK_TO_WORKS
      </button>

      <header className="mb-24 space-y-8">
        <div className="flex flex-wrap gap-4">
          <span className="label-caps text-primary underline decoration-primary/30 underline-offset-4">Project Case Study</span>
          <span className="label-caps text-on-surface-variant">/</span>
          <span className="label-caps text-on-surface-variant">{project.year}</span>
        </div>
        <h1 className="text-6xl md:text-8xl leading-tight">{project.title}</h1>
        <p className="text-2xl md:text-3xl font-light text-on-surface-variant max-w-4xl leading-relaxed">
          {project.description}
        </p>
      </header>

      <div className="aspect-video w-full overflow-hidden bg-surface-container rounded-sm mb-24 shadow-2xl border border-outline/30">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <aside className="md:col-span-4 space-y-12">
          <div className="space-y-4">
            <h3 className="label-caps text-primary">Metadata</h3>
            <div className="space-y-4 text-sm">
              <div>
                <dt className="text-on-surface-variant font-mono text-[10px] uppercase mb-1">CLIENT</dt>
                <dd className="font-serif text-lg">{project.client}</dd>
              </div>
              <div>
                <dt className="text-on-surface-variant font-mono text-[10px] uppercase mb-1">YEAR</dt>
                <dd className="font-serif text-lg">{project.year}</dd>
              </div>
              <div>
                <dt className="text-on-surface-variant font-mono text-[10px] uppercase mb-1">TECH_STACK</dt>
                <dd className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-surface-container border border-outline/50 font-mono text-[9px]">
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          </div>
        </aside>

        <section className="md:col-span-8 space-y-24">
          <div className="space-y-6">
            <h2 className="text-4xl">Executive Summary</h2>
            <p className="text-xl text-on-surface-variant leading-relaxed font-light italic">
              {project.fullDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="label-caps text-primary border-b border-outline/50 pb-2">The Challenges</h3>
              <ul className="space-y-4">
                {project.challenges?.map((c, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-[10px] text-primary mt-1.5">0{i+1}</span>
                    <p className="text-on-surface-variant text-lg leading-snug">{c}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="label-caps text-primary border-b border-outline/50 pb-2">Technical Solutions</h3>
              <ul className="space-y-4">
                {project.solutions?.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-[10px] text-primary mt-1.5">A{i+1}</span>
                    <p className="text-on-surface-variant text-lg leading-snug">{s}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-surface-dim p-12 border-l-4 border-primary">
            <h3 className="label-caps text-primary mb-6">Outcome & Impact</h3>
            <p className="text-2xl font-serif leading-relaxed italic text-on-surface">
              "{project.results}"
            </p>
          </div>
        </section>
      </div>

      <div className="mt-32 pt-24 border-t border-outline/50 text-center">
        <h2 className="text-4xl mb-8">Have a similar project?</h2>
        <button 
          onClick={onBack}
          className="bg-primary text-on-primary px-12 py-6 label-caps hover:brightness-110 transition-all active:scale-95"
        >
          LET'S TALK ARCHITECTURE
        </button>
      </div>
    </motion.div>
  );
}

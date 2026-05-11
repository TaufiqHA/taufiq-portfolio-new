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
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { Page, Project } from './types.ts';

const PROJECTS: Project[] = [
  {
    id: 'formly',
    title: 'FORMLY',
    description: 'Advanced form management system with WhatsApp integration for data collection efficiency.',
    imageUrl: `${import.meta.env.BASE_URL}image/formly.png`,
    tags: ['React.js', 'Laravel', 'Tailwind CSS 4'],
    fullDescription: 'Formly is a comprehensive form management application designed to help businesses collect data and manage submissions efficiently. It combines a modern user interface with a robust backend system, offering dynamic form building, analytical dashboards, and automated WhatsApp API integration.',
    challenges: [
      'Developing a dynamic Form Builder with various input types and validation logic.',
      'Integrating WhatsApp API for automated notification delivery to customers.',
      'Ensuring high performance while handling large volumes of submission data.'
    ],
    solutions: [
      'Utilized React.js with SPA architecture for fast, no-reload navigation.',
      'Implemented a secure and stable REST API backend using Laravel.',
      'Created a responsive and modern design using Tailwind CSS 4 and smooth Motion animations.'
    ],
    results: 'Significantly improved customer response times through automated notifications and simplified submission management for business owners.',
    year: '2024',
    client: 'Internal Project / Showcase'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedProjectId(null);
    setIsMenuOpen(false);
  };

  const handleNavigateToProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentPage('project-detail');
    setIsMenuOpen(false);
  };

  const handleBackToWork = () => {
    setCurrentPage('work');
    setSelectedProjectId(null);
  };

  const Nav = () => (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline/50 px-4 md:px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button 
          onClick={() => handleNavigate('home')}
          className="font-serif text-xl md:text-2xl font-bold tracking-tighter hover:text-primary transition-colors cursor-pointer"
        >
          TaufiqHA
        </button>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {(['home', 'work', 'contact'] as Page[]).map((page) => (
            <button
              key={page}
              onClick={() => handleNavigate(page)}
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
          <Terminal size={18} className="text-primary hidden sm:block" />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full h-screen bg-background border-b border-outline/50 flex flex-col p-8 gap-8 md:hidden"
          >
            {(['home', 'work', 'contact'] as Page[]).map((page) => (
              <button
                key={page}
                onClick={() => handleNavigate(page)}
                className={`text-5xl font-serif text-left ${
                  currentPage === page || (page === 'work' && currentPage === 'project-detail') ? 'text-primary' : 'text-foreground'
                }`}
              >
                {page.toUpperCase()}
              </button>
            ))}
            <div className="mt-auto pb-32 space-y-4">
              <div className="label-caps text-on-surface-variant">Social Connection</div>
              <div className="flex gap-6">
                <Github size={20} className="text-on-surface-variant" />
                <Linkedin size={20} className="text-on-surface-variant" />
                <Mail size={20} className="text-on-surface-variant" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  const Footer = () => (
    <footer className="w-full py-12 px-4 md:px-6 border-t border-outline/50 mt-16 md:mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-serif text-2xl font-bold italic">TAUFIQ_HA</div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a href="#" className="label-caps text-on-surface-variant hover:text-primary transition-colors">Github</a>
          <a href="#" className="label-caps text-on-surface-variant hover:text-primary transition-colors">Linkedin</a>
          <a href="#" className="label-caps text-on-surface-variant hover:text-primary transition-colors">Source</a>
        </div>
        <div className="label-caps text-on-surface-variant text-center md:text-right">
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
      className="max-w-7xl mx-auto px-4 md:px-6"
    >
      {/* Hero */}
      <section className="py-8 md:py-16 lg:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-4">
            <span className="label-caps text-primary block">Architect of Digital Logic</span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[0.9] font-normal tracking-tight">
              Crafting systems,<br className="hidden sm:block" />not just websites.
            </h1>
          </div>
          <p className="text-lg md:text-xl lg:text-2xl text-on-surface-variant max-w-xl leading-relaxed font-light">
            I am a Full-Stack Engineer focused on high-performance architectures and elegant codebases. 
            My approach combines technical rigor with a minimalist editorial aesthetic to build tools that last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-primary text-on-primary px-8 py-4 label-caps flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/10">
              DOWNLOAD CV <Download size={14} />
            </button>
            <button 
              onClick={onNavigateWork}
              className="border border-outline px-8 py-4 label-caps flex items-center justify-center gap-3 hover:bg-surface-container transition-all active:scale-95"
            >
              VIEW PROJECTS <Eye size={14} />
            </button>
          </div>
        </div>
        <div className="md:col-span-5 relative aspect-[4/5] bg-surface-container overflow-hidden rounded-sm group order-first md:order-last">
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
      <section className="py-12 md:py-24 border-t border-outline/50 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 lg:col-span-3 md:sticky md:top-32 h-fit">
          <h2 className="text-4xl md:text-5xl">Background & Expertise</h2>
          <p className="mt-4 text-on-surface-variant">A narrative of my technical focus and professional milestones.</p>
        </div>
        <div className="md:col-span-8 lg:col-span-8 lg:col-start-5 space-y-16 md:space-y-24">
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
                  <div className="flex flex-col lg:flex-row justify-between lg:items-baseline gap-2 mb-4">
                    <h4 className="text-2xl md:text-3xl">
                      {job.role} <span className="text-on-surface-variant font-light italic">at {job.company}</span>
                    </h4>
                    <span className="label-caps text-on-surface-variant/70 shrink-0">{job.period}</span>
                  </div>
                  <p className="text-base md:text-lg text-on-surface-variant max-w-3xl leading-relaxed">{job.desc}</p>
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
      className="max-w-7xl mx-auto px-4 md:px-6 pb-24"
    >
      <header className="pt-16 md:pt-20 pb-8 md:pb-12 max-w-2xl">
        <h1 className="text-6xl md:text-8xl mb-6 md:mb-8">Selected Works.</h1>
        <p className="text-lg md:text-xl text-on-surface-variant font-light leading-relaxed">
          A collection of technical explorations and architectural systems focused on performance and modularity.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-16 md:gap-32">
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
            <div className="aspect-video md:aspect-[16/9] w-full overflow-hidden bg-surface-container mb-6 md:mb-8 rounded-sm relative shadow-sm border border-outline/30">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover filter saturate-0 md:group-hover:scale-105 group-hover:saturate-100 transition-all duration-700 ease-out"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group-hover:text-primary transition-colors">
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="label-caps px-2 py-1 border border-outline/50 text-[9px] opacity-70">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl md:text-5xl">{project.title}</h2>
              </div>
              <ArrowUpRight size={32} className="stroke-1 md:size-[40px] group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300 hidden sm:block" />
            </div>
          </motion.article>
        ))}
      </div>

      <section className="mt-24 md:mt-32 pt-12 border-t border-outline/50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div className="sm:col-span-2 md:col-span-1">
          <h3 className="label-caps mb-4">CORE_CAPABILITIES</h3>
          <p className="text-on-surface-variant text-sm max-w-xs">Specializing in performance optimization and distributed systems.</p>
        </div>
        {[
          { title: 'FRONTEND', items: ['React / Vue.js', 'Tailwind CSS', 'JavaScript (ES6+)'] },
          { title: 'BACKEND', items: ['Laravel / PHP', 'Node.js', 'REST APIs'] },
          { title: 'DATABASE', items: ['MySQL', 'PostgreSQL', 'SQLite'] }
        ].map(cat => (
          <div key={cat.title}>
            <h4 className="label-caps text-primary mb-4">{cat.title}</h4>
            <ul className="space-y-1 text-on-surface-variant font-light text-sm md:text-base">
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
      className="max-w-7xl mx-auto px-4 md:px-6 min-h-full flex flex-col items-center justify-start md:justify-center py-16 md:py-24"
    >
      <div className="text-center mb-8 md:mb-16 space-y-4 md:space-y-6">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-tight md:leading-none">Initiate Communication.</h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
          Whether you have a specific project in mind or want to discuss technical architectures, I am available for high-impact collaborations.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-surface-dim p-5 sm:p-8 md:p-12 border border-outline relative shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-10 hidden md:block">
          <Mail size={120} />
        </div>
        
        <h2 className="label-caps text-primary mb-8 md:mb-12 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-primary"></span> TRANSMISSION_FORM
        </h2>

        <form className="space-y-6 md:space-y-12 relative z-10">
          <div className="space-y-2 group">
            <label className="label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">NAME</label>
            <input 
              type="text" 
              placeholder="E.G. ALAN TURING"
              className="w-full bg-transparent border-b border-outline pb-4 focus:outline-none focus:border-primary font-serif text-lg md:text-2xl placeholder:text-on-surface-variant/20 transition-all"
            />
          </div>

          <div className="space-y-2 group">
            <label className="label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">EMAIL_ADDRESS</label>
            <input 
              type="email" 
              placeholder="E.G. ALAN@ENIGMA.TECH"
              className="w-full bg-transparent border-b border-outline pb-4 focus:outline-none focus:border-primary font-serif text-lg md:text-2xl placeholder:text-on-surface-variant/20 transition-all"
            />
          </div>

          <div className="space-y-2 group">
            <label className="label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">MESSAGE_BODY</label>
            <textarea 
              rows={4}
              placeholder="DESCRIBE YOUR PROJECT OR ARCHITECTURE..."
              className="w-full bg-transparent border-b border-outline pb-4 focus:outline-none focus:border-primary font-serif text-lg md:text-2xl placeholder:text-on-surface-variant/20 transition-all resize-none"
            />
          </div>

          <button className="w-full bg-primary text-on-primary py-5 md:py-6 label-caps text-sm hover:brightness-110 active:scale-[0.99] transition-all flex justify-center items-center gap-2">
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
      className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-24"
    >
      <button 
        onClick={onBack}
        className="mt-6 md:mt-16 mb-6 md:mb-8 label-caps flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
      >
        <ArrowRight className="rotate-180" size={14} /> BACK_TO_WORK
      </button>

      <header className="mb-8 md:mb-24 space-y-4 md:space-y-8">
        <div className="flex flex-wrap gap-3 md:gap-4">
          <span className="label-caps text-primary underline decoration-primary/30 underline-offset-4">Project Case Study</span>
          <span className="label-caps text-on-surface-variant">/</span>
          <span className="label-caps text-on-surface-variant">{project.year}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-8xl leading-tight">{project.title}</h1>
        <p className="text-lg sm:text-xl md:text-3xl font-light text-on-surface-variant max-w-4xl leading-relaxed">
          {project.description}
        </p>
      </header>

      <div className="aspect-video w-full overflow-hidden bg-surface-container rounded-sm mb-12 md:mb-24 shadow-2xl border border-outline/30">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <aside className="md:col-span-4 space-y-10 md:space-y-12 order-last md:order-first">
          <div className="space-y-4">
            <h3 className="label-caps text-primary">METADATA</h3>
            <div className="grid grid-cols-1 gap-6 md:gap-4 text-sm">
              <div>
                <dt className="text-on-surface-variant font-mono text-[10px] uppercase mb-1">CLIENT</dt>
                <dd className="font-serif text-base md:text-lg">{project.client}</dd>
              </div>
              <div>
                <dt className="text-on-surface-variant font-mono text-[10px] uppercase mb-1">YEAR</dt>
                <dd className="font-serif text-base md:text-lg">{project.year}</dd>
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

        <section className="md:col-span-8 space-y-16 md:space-y-24">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl">EXECUTIVE SUMMARY</h2>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed font-light italic">
              {project.fullDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="label-caps text-primary border-b border-outline/50 pb-2">THE CHALLENGES</h3>
              <ul className="space-y-4">
                {project.challenges?.map((c, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-[10px] text-primary mt-1.5">0{i+1}</span>
                    <p className="text-on-surface-variant text-base md:text-lg leading-snug">{c}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="label-caps text-primary border-b border-outline/50 pb-2">TECHNICAL SOLUTIONS</h3>
              <ul className="space-y-4">
                {project.solutions?.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-[10px] text-primary mt-1.5">A{i+1}</span>
                    <p className="text-on-surface-variant text-base md:text-lg leading-snug">{s}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-surface-dim p-6 md:p-12 border-l-4 border-primary">
            <h3 className="label-caps text-primary mb-6">OUTCOME & IMPACT</h3>
            <p className="text-xl md:text-2xl font-serif leading-relaxed italic text-on-surface">
              "{project.results}"
            </p>
          </div>
        </section>
      </div>

      <div className="mt-24 md:mt-32 pt-16 md:pt-24 border-t border-outline/50 text-center">
        <h2 className="text-3xl md:text-4xl mb-8">Have a similar project?</h2>
        <button 
          onClick={onBack}
          className="px-6 py-4 md:px-12 md:py-6 bg-primary text-on-primary label-caps hover:brightness-110 transition-all active:scale-95"
        >
          LET'S DISCUSS ARCHITECTURE
        </button>
      </div>
    </motion.div>
  );
}

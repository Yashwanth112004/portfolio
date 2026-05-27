"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "@/utils/audio";
import { FolderCode, ExternalLink, Terminal as TermIcon, ShieldAlert, Cpu, X, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";

interface Project {
  id: number;
  title: string;
  category: "cloud" | "blockchain" | "ai" | "systems";
  tech: string[];
  description: string;
  visualTheme: string;
  color: string;
  github?: string;
  live?: string;
  telegram?: string;
  diagnosticLogs: string[];
}

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "cloud" | "blockchain" | "ai">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsData: Project[] = [
    {
      id: 1,
      title: "Production Incident Auto-Recovery System",
      category: "cloud",
      tech: ["AWS Lambda", "Step Functions", "SNS", "SSM", "DevOps"],
      description: "An intelligent AWS-powered self-healing infrastructure system that automatically detects server outages, initiates corrective workflows, runs rollback mechanisms, and notifies the SRE team via SNS alerts.",
      visualTheme: "Cloud Infrastructure + Holographic Monitoring Dashboard",
      color: "#00f0ff", // Neon Cyan
      github: "https://github.com/Yashwanth112004",
      live: "https://github.com/Yashwanth112004",
      diagnosticLogs: [
        "SYSTEM HEALTHCHECK: FAILURE [EC2_NODE_2B]",
        "SSM AGENT INJECTING RECOVERY SCRIPT...",
        "STEP FUNCTIONS ROUTER INITIALIZED // REMEDIATING...",
        "LAMBDA TRIGGER: DB_FAILOVER_INITIATED [ROLLBACK: OK]",
        "INCIDENT LOG SAVED. SYSTEM STATUS RESTORED."
      ]
    },
    {
      id: 2,
      title: "Blockchain-Based Healthcare Consent Management",
      category: "blockchain",
      tech: ["Hedera Hashgraph", "Solidity", "Smart Contracts", "Node.js"],
      description: "A decentralized, high-throughput healthcare consent management system built on Hedera Consensus Service, ensuring secure, cryptographically auditable patient data access authorizations.",
      visualTheme: "Futuristic Blockchain Consensus Ledger",
      color: "#ffb000", // Vintage Amber
      github: "https://github.com/Yashwanth112004",
      live: "https://ojasraksha.vercel.app/",
      diagnosticLogs: [
        "ESTABLISHING HEDERA CONSENSUS NODE...",
        "COMPILING Solidity Contract: PatientConsent.sol...",
        "GAS VALUE CHECK: OPTIMAL [0.0001 HBAR]",
        "AUDIT TRAIL COMPLETED: ROOT_HASH_V32_OK",
        "BLOCKCHAIN CONSENSUS STATE: VERIFIED"
      ]
    },
    {
      id: 3,
      title: "EmpowerHer — AI Platform for Female Entrepreneurs",
      category: "ai",
      tech: ["React.js", "Node.js", "Gemini API", "LangChain", "FastAPI", "MongoDB"],
      description: "An AI-powered multi-turn retrieval-augmented generation (RAG) platform that guides female founders through formulating structured business models, analyzing market competitors, and generating financial blueprints.",
      visualTheme: "AI Neural Network + Assistant Dialog Interface",
      color: "#a855f7", // Soft Purple Glow
      github: "https://github.com/Yashwanth112004",
      diagnosticLogs: [
        "EMBEDDING SEARCH ENGINE INITIALIZING...",
        "LANGCHAIN RAG RE-RANKING: ACTIVE [COSINE DISTANCE]",
        "GEMINI PRO TOKEN POOL ACTIVE [128k CONTEXT]",
        "COMPILING BUSINESS PLAN GRAPH STRUCTURE...",
        "ANALYZING COMPETITIVE MATRICES: OK"
      ]
    },
    {
      id: 4,
      title: "Prompt Enhancer Telegram Bot",
      category: "ai",
      tech: ["Python", "Telegram Bot API", "Gemini API", "Prompt Eng."],
      description: "An intelligent, high-speed Telegram chatbot designed to translate basic natural language commands into highly structured, optimized prompts containing explicit contextual system instructions, output delimiters, and few-shot formatting guides.",
      visualTheme: "Hacker Terminal neon messaging console",
      color: "#ef4444", // Crimson Alert
      telegram: "https://t.me/PRompt11187Bot",
      github: "https://github.com/Yashwanth112004",
      diagnosticLogs: [
        "LISTENING ON TELEGRAM BOT API POOL...",
        "EVENT RECV: USER_RAW_PROMPT // LENGTH 12 CHARS",
        "INJECTING PROMPT RECONSTRUCTION TEMPLATES...",
        "OPTIMIZER SYSTEM RESOLUTION: TOKEN STRENGTH +320%",
        "DISPATCHING EXPANDED STRUCT CORE BACK TO CLIENT."
      ]
    }
  ];

  // Filter projects list
  const filteredProjects = projectsData.filter(
    (p) => filter === "all" || p.category === filter
  );

  const handleCardClick = (p: Project) => {
    setSelectedProject(p);
    audio.playSuccess();
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    audio.playClick();
  };

  // Custom Mouse 3D tilt engine
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Normalize coordinates
    const rotateX = -y / 15; // sensitivity
    const rotateY = x / 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <section id="projects" className="py-24 px-4 md:px-8 border-b border-slate-900 bg-transparent scroll-mt-12">
      <div className="w-full max-w-6xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-xs font-mono-term text-[#00f0ff] tracking-[0.25em] uppercase mb-2">
              // ARCHITECTURE DEPLOYMENT INVENTORY
            </h2>
            <h3 className="text-3xl font-display font-black text-white tracking-wide">
              PROJECTS DATABASE
            </h3>
          </div>

          {/* Filtering HUD controls */}
          <div className="flex gap-2 bg-[#0a0a0f]/60 p-1 border border-slate-800 rounded font-display tracking-widest text-[10px]">
            {(["all", "cloud", "blockchain", "ai"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  audio.playClick();
                }}
                className={`px-3 py-2 rounded transition-all cursor-pointer uppercase ${
                  filter === cat
                    ? "bg-[#00f0ff] text-black font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleCardClick(project)}
                onMouseMove={(e) => handleMouseMove(e, project.id)}
                onMouseLeave={handleMouseLeave}
                className="group border border-slate-800 bg-[#0a0a0f]/80 p-6 rounded-lg glass-panel hover:border-slate-600 transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
                style={{ 
                  transformStyle: "preserve-3d",
                  transition: "transform 0.15s ease-out, border-color 0.3s"
                }}
              >
                {/* Neon shadow hover effect */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${project.color}, transparent 60%)`
                  }}
                />

                {/* Cyberpunk details overlay */}
                <div className="absolute top-2 right-3 text-[9px] text-slate-500 font-mono-term">
                  DB_ID // {project.category.toUpperCase()}_0{project.id}
                </div>

                <div>
                  {/* Category icon badge */}
                  <div 
                    className="w-10 h-10 rounded border flex items-center justify-center mb-6 bg-black"
                    style={{ borderColor: project.color + "50", boxShadow: `0 0 10px ${project.color}15` }}
                  >
                    <FolderCode className="w-4 h-4" style={{ color: project.color }} />
                  </div>

                  <h3 className="text-lg font-display font-black text-white tracking-wide mb-3 select-text group-hover:text-[#00f0ff] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed mb-6 line-clamp-3 select-text">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-black/40 border border-slate-800 text-slate-400 font-mono-term text-[9px] rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Trigger diagnostics banner */}
                  <div 
                    className="text-[10px] font-mono-term font-bold flex items-center justify-between border-t border-slate-900 pt-3 group-hover:border-slate-800 transition-colors"
                    style={{ color: project.color }}
                  >
                    <span>[ RUN DIAGNOSTICS ]</span>
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Architectural Detail Modal (HUD Monitor) */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-2xl border border-slate-700 bg-[#0a0a0f] p-6 rounded-lg glass-panel relative overflow-hidden"
                style={{ 
                  boxShadow: `0 0 40px ${selectedProject.color}20`,
                  borderColor: selectedProject.color + "70" 
                }}
              >
                {/* CRT screen lines overlay on modal */}
                <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-25 bg-[#060608]" />

                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header title */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-850">
                  <div 
                    className="w-10 h-10 rounded border flex items-center justify-center bg-black shrink-0"
                    style={{ borderColor: selectedProject.color + "50" }}
                  >
                    <TermIcon className="w-5.5 h-5.5" style={{ color: selectedProject.color }} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono-term text-slate-500 uppercase tracking-widest">
                      SYSTEM ARCHITECT DEPLOYMENT LOG
                    </h4>
                    <h3 className="text-xl font-display font-black text-white select-text">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Detailed summary */}
                  <div>
                    <h5 className="text-[10px] font-mono-term text-[#00f0ff] uppercase tracking-wider mb-2">// SPECIFICATION DESCRIPTION</h5>
                    <p className="text-xs md:text-sm text-slate-300 font-sans leading-relaxed select-text">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Core visual motif */}
                  <div className="bg-black/40 border border-slate-850 p-4 rounded text-xs font-mono-term text-slate-400">
                    <span className="text-white font-bold block mb-1">VISUAL TOPOLOGY MOTIF:</span>
                    {selectedProject.visualTheme}
                  </div>

                  {/* Live compilation diagnostic stream */}
                  <div>
                    <h5 className="text-[10px] font-mono-term text-[#a855f7] uppercase tracking-wider mb-2">// CORE KERNEL STACK DIAGNOSTIC</h5>
                    <div className="bg-black border border-slate-900 rounded p-3 text-[10px] font-mono-term leading-5 text-slate-400 select-text">
                      {selectedProject.diagnosticLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-[#39ff14] font-bold">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action footer */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-850">
                    {selectedProject.telegram ? (
                      <a
                        href={selectedProject.telegram}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 border border-red-500 bg-red-950/20 hover:bg-red-500/10 text-white font-display tracking-widest text-[11px] rounded transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        [ LAUNCH_TELEGRAM_BOT ]
                      </a>
                    ) : (
                      selectedProject.live && (
                        <a
                          href={selectedProject.live}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-3 border border-[#00f0ff] bg-[#00f0ff]/10 hover:bg-[#00f0ff]/25 text-white font-display tracking-widest text-[11px] rounded transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          [ EXECUTE_LIVE_DEPLOY ]
                        </a>
                      )
                    )}

                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 border border-slate-700 bg-slate-800/10 hover:bg-slate-800/30 text-slate-300 hover:text-white font-display tracking-widest text-[11px] rounded transition-all text-center flex items-center justify-center gap-2 cursor-pointer sm:ml-auto"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        [ INSPECT_SOURCE ]
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

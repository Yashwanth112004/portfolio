"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "@/utils/audio";
import { Terminal as TermIcon, ShieldCheck, Zap, Globe, FolderCode, Award, ArrowRight } from "lucide-react";

interface HeroProps {
  onExploreProjects: () => void;
  onExploreContact: () => void;
  agentModeActive: boolean;
}

export default function Hero({ onExploreProjects, onExploreContact, agentModeActive }: HeroProps) {
  const titles = [
    "AWS Certified Solution Architect",
    "AI Engineer",
    "GenAI Developer",
    "Cloud Engineer",
    "Full Stack Developer",
    "DevOps Enthusiast",
    "Prompt Engineer"
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [typedLogs, setTypedLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({
    uptime: "99.99%",
    lat: "34ms"
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Typewriter name animation
  useEffect(() => {
    const firstStr = "Yashwanth";
    const lastStr = "Puligilla";
    let firstIdx = 0;
    let lastIdx = 0;

    const firstInterval = setInterval(() => {
      if (firstIdx < firstStr.length) {
        setFirstName(firstStr.substring(0, firstIdx + 1));
        if (!audio.isMuted()) audio.playType();
        firstIdx++;
      } else {
        clearInterval(firstInterval);
        const lastInterval = setInterval(() => {
          if (lastIdx < lastStr.length) {
            setLastName(lastStr.substring(0, lastIdx + 1));
            if (!audio.isMuted()) audio.playType();
            lastIdx++;
          } else {
            clearInterval(lastInterval);
          }
        }, 100);
      }
    }, 100);

    return () => {
      clearInterval(firstInterval);
    };
  }, []);

  // Rotate title index
  useEffect(() => {
    const titleInterval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(titleInterval);
  }, []);

  // Hacker terminal typing effect logs
  useEffect(() => {
    const logPool = [
      "Connecting to AWS API gateway...",
      "Cognito Authorization Token: SUCCESS",
      "Compiling langchain RAG pipeline...",
      "Securing Hedera blockchain consensus node...",
      "Accenture deployment credentials verified.",
      "Syncing Leetcode DSA metrics (1628, 400+ Solved)",
      "Ready to accept external command queries."
    ];

    let currentLogIdx = 0;
    const typingInterval = setInterval(() => {
      if (currentLogIdx < logPool.length) {
        setTypedLogs((prev) => [...prev, logPool[currentLogIdx]]);
        if (!audio.isMuted()) audio.playType();
        currentLogIdx++;
      } else {
        clearInterval(typingInterval);
      }
    }, 1800);

    return () => clearInterval(typingInterval);
  }, []);

  // Simulating latency drift
  useEffect(() => {
    const latencyInterval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        lat: Math.floor(28 + Math.random() * 12) + "ms"
      }));
    }, 4000);
    return () => clearInterval(latencyInterval);
  }, []);

  const handleButtonClick = () => {
    audio.playClick();
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative py-20 px-4 md:px-8 border-b border-slate-900 bg-transparent overflow-hidden">
      {/* HUD grid alignment guide overlays */}
      <div className="absolute inset-0 digital-grid pointer-events-none opacity-40 z-0" />
      
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Side: Avatar Panel & Real-time Stats */}
        <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
          {/* Technical Credentials HUD */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`border bg-[#0a0a0f]/80 p-5 rounded-lg glass-panel relative transition-all duration-500 ${
              agentModeActive 
                ? "border-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.35)] animate-pulse" 
                : "border-[#a855f7]/30 glow-border-purple"
            }`}
          >
            <div className="absolute top-2 right-3 text-[10px] text-[#a855f7]/60 tracking-widest font-mono-term">
              METRICS // VERIFIED
            </div>
            
            <div className="flex gap-4 items-center mb-4">
              <div className={`w-12 h-12 rounded flex items-center justify-center font-display font-black text-black text-lg transition-all ${
                agentModeActive 
                  ? "bg-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.5)]" 
                  : "bg-gradient-to-tr from-[#8b5cf6] to-[#00f0ff] shadow-[0_0_12px_rgba(168,85,247,0.3)]"
              }`}>
                9.94
              </div>
              <div>
                <h4 className="text-xs text-slate-400 font-mono-term uppercase">ACADEMIC CGPA</h4>
                <h3 className="text-sm text-white font-display tracking-widest font-bold uppercase">
                  KL UNIVERSITY
                </h3>
              </div>
            </div>

            <div className="space-y-2 font-mono-term text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>B.TECH PROGRAM PROGRESS</span>
                <span className="text-[#00f0ff]">
                  75% [3/4 YEARS COMPLETE]
                </span>
              </div>
              <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden p-[0.5px] border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#00f0ff] rounded-full transition-all duration-500" 
                  style={{ width: "75%" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800 font-mono-term text-[11px] text-slate-400">
              <div>
                <div>LEETCODE RATING:</div>
                <div className="text-[#39ff14] font-bold mt-0.5">
                  1628 [TOP 19%]
                </div>
              </div>
              <div>
                <div>DSA PROBLEMS:</div>
                <div className="text-[#00f0ff] font-bold mt-0.5">
                  400+ SOLVED
                </div>
              </div>
              <div className="col-span-2">
                <div>CODEFORCES RATING:</div>
                <div className="text-[#ffb000] font-bold mt-0.5">
                  1092 [PUPIL]
                </div>
              </div>
            </div>
          </motion.div>

          {/* Holographic Cert / Badge display */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-[#00f0ff]/20 bg-[#0a0a0f]/80 p-5 rounded-lg glass-panel glow-border-cyan space-y-4"
          >
            <h4 className="text-xs text-[#00f0ff] font-display font-semibold tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" /> COMPLETED DEPLOYMENTS
            </h4>
            
            <div className="space-y-3 font-mono-term text-[11px]">
              <div className="flex items-center gap-2.5 p-2 bg-black/40 border border-slate-800 rounded">
                <ShieldCheck className="w-4 h-4 text-[#ffb000] shrink-0" />
                <div className="flex-1 truncate">
                  <div className="text-slate-200 font-bold">AWS SOLUTIONS ARCHITECT</div>
                  <div className="text-slate-500 text-[10px]">ASSOCIATE // VERIFIED</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 bg-black/40 border border-slate-800 rounded">
                <Zap className="w-4 h-4 text-[#00f0ff] shrink-0" />
                <div className="flex-1 truncate">
                  <div className="text-slate-200 font-bold">AWS CLOUD PRACTITIONER</div>
                  <div className="text-slate-500 text-[10px]">INFRASTRUCTURE // VERIFIED</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center Content: Main Name, Rotating Titles, Tagline */}
        <div className="lg:col-span-5 text-center lg:text-left flex flex-col justify-center order-1 lg:order-2 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex self-center lg:self-start items-center gap-2 px-3 py-1 border border-[#ffb000]/40 bg-[#ffb000]/5 text-[#ffb000] text-xs font-mono-term rounded-full mb-6 tracking-wide"
          >
            <Globe className="w-3.5 h-3.5 animate-spin duration-3000" />
            OPERATOR IDENTIFIER: ACTIVE
          </motion.div>

          <h2 className="text-xs font-mono-term text-slate-400 tracking-[0.25em] uppercase mb-2">
            AI / DEVOPS COMMAND DECK
          </h2>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight mb-4 select-text min-h-[96px] md:min-h-[120px] lg:min-h-[144px]">
            {firstName}
            {firstName === "Yashwanth" && <br className="hidden md:inline" />}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#8b5cf6] to-[#ffb000] glow-text-cyan">
              {lastName}
            </span>
            <span className="animate-pulse text-[#00f0ff] font-light">|</span>
          </h1>

          {/* Rotating Subtitles */}
          <div className="h-8 mb-6 relative overflow-hidden flex justify-center lg:justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={titleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-sm md:text-base font-mono-term text-[#00f0ff] font-bold tracking-widest uppercase flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-ping" />
                {titles[titleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-sm md:text-base text-slate-400 max-w-md mb-8 leading-relaxed font-sans select-text">
            Building AI-powered cloud systems, robust self-healing deployment topologies, and futuristic interactive interfaces.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
            <button
              onClick={() => {
                handleButtonClick();
                onExploreProjects();
              }}
              className="px-6 py-3.5 border border-[#00f0ff] bg-[#00f0ff]/10 hover:bg-[#00f0ff]/25 text-white font-display tracking-widest text-xs rounded hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              [ VIEW_PROJECTS ]
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                handleButtonClick();
                onExploreContact();
              }}
              className="px-6 py-3.5 border border-slate-800 bg-[#0a0a0f]/80 hover:bg-slate-800/40 text-slate-300 font-display tracking-widest text-xs rounded hover:text-white transition-all cursor-pointer flex items-center justify-center"
            >
              [ ESTABLISH_CONTACT ]
            </button>
          </div>
        </div>

        {/* Right Side: Animated Code / Typing Console */}
        <div className="lg:col-span-3 flex flex-col order-3">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-slate-800 bg-black/80 rounded-lg p-4 font-mono-term text-[11px] leading-5 h-72 md:h-80 overflow-y-auto flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1.5 pb-2.5 mb-3 border-b border-slate-800 text-slate-500">
                <TermIcon className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>YP_DAEMON_SHELL</span>
              </div>
              
              <div className="space-y-1.5 select-text">
                <div className="text-slate-500">&gt; initial_handshake --node_main</div>
                <div className="text-[#39ff14]">handshake packets standard_ok</div>
                {typedLogs.map((log, index) => (
                  <div key={index} className="text-slate-300">
                    <span className="text-[#00f0ff] font-bold">&gt; </span>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-slate-600 border-t border-slate-900 pt-2 flex items-center justify-between mt-4">
              <span>SOCKET STATE: ESTABLISHED</span>
              <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-ping" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

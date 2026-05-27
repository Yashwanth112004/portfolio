"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "@/utils/audio";
import { User, Briefcase, Award, GraduationCap, ChevronRight, Binary, Server } from "lucide-react";

type TabType = "biography" | "experience" | "attributes";

export default function About() {
  const [activeTab, setActiveTab] = useState<TabType>("biography");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    audio.playClick();
  };

  const experienceData = [
    {
      role: "Associate Software Engineer Intern",
      company: "Accenture",
      period: "May 2026 - Present",
      details: [
        "Completed onboarding, orientation, and initial corporate training programs.",
        "Gaining knowledge in software engineering practices, enterprise workflows, and collaborative development environments.",
        "Currently undergoing technical learning and project readiness training."
      ],
      icon: Server,
      color: "#a855f7"
    },
    {
      role: "Intern Trainee",
      company: "Tech Mahindra",
      period: "May 2025 - July 2025",
      details: [
        "Developed a Flask-based ML application and integrated it with REST APIs for real-time prediction workflows.",
        "Designed modular backend services, improving scalability, maintainability, and code quality.",
        "Collaborated with ML team to collect and preprocess datasets (Kaggle) for model development and deployment."
      ],
      icon: Binary,
      color: "#00f0ff"
    }
  ];

  const attributeStats = [
    { name: "LeetCode Rating", value: 1628, max: 2200, color: "#00f0ff", desc: "Top 19% programmers globally" },
    { name: "DSA Problems Solved", value: 400, max: 800, color: "#ffb000", desc: "Optimal runtime efficiency" },
    { name: "CGPA Coefficient", value: 9.94, max: 10.0, color: "#a855f7", desc: "Near-flawless academic efficiency" },
    { name: "TCS CodeVita Rank", value: 2151, max: 5000, color: "#ef4444", desc: "Global algorithmic contest competitor" },
    { name: "Codeforces Rating", value: 1092, max: 2000, color: "#39ff14", desc: "Pupil tier — competitive programming" }
  ];

  return (
    <section id="about" className="py-24 px-4 md:px-8 border-b border-slate-900 bg-transparent relative scroll-mt-12">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8b5cf6]/5 to-transparent pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto z-10 relative">
        <h2 className="text-xs font-mono-term text-[#00f0ff] tracking-[0.25em] uppercase mb-2">
          // ACCESSING COGNITIVE DATA SECTOR
        </h2>
        <h3 className="text-3xl font-display font-black text-white tracking-wide mb-12 flex items-center gap-3">
          HACKER DOSSIER <span className="text-[#a855f7] font-mono-term font-normal text-xs">[STATUS: CONFIDENTIAL]</span>
        </h3>

        {/* Console dossier frame layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Left panel tabs selector */}
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
            <button
              onClick={() => handleTabChange("biography")}
              className={`flex-1 md:flex-initial flex items-center gap-3 px-4 py-3.5 border rounded font-display tracking-wider text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "biography"
                  ? "border-[#00f0ff] bg-[#00f0ff]/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                  : "border-slate-800 bg-[#0a0a0f]/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <User className="w-4 h-4 text-[#00f0ff]" />
              BIOGRAPHICAL DATA
            </button>
            <button
              onClick={() => handleTabChange("experience")}
              className={`flex-1 md:flex-initial flex items-center gap-3 px-4 py-3.5 border rounded font-display tracking-wider text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "experience"
                  ? "border-[#a855f7] bg-[#a855f7]/10 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                  : "border-slate-800 bg-[#0a0a0f]/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#a855f7]" />
              DEPLOYMENT TIMELINE
            </button>
            <button
              onClick={() => handleTabChange("attributes")}
              className={`flex-1 md:flex-initial flex items-center gap-3 px-4 py-3.5 border rounded font-display tracking-wider text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "attributes"
                  ? "border-[#ffb000] bg-[#ffb000]/10 text-white shadow-[0_0_15px_rgba(255,176,0,0.2)]"
                  : "border-slate-800 bg-[#0a0a0f]/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <Award className="w-4 h-4 text-[#ffb000]" />
              COMBAT ATTRIBUTES
            </button>
          </div>

          {/* Right panel interactive content displays */}
          <div className="md:col-span-3 border border-slate-800 bg-[#0a0a0f]/90 p-6 md:p-8 rounded-lg glass-panel relative overflow-hidden min-h-[360px]">
            
            {/* Glowing HUD decorative indicators */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20 border-t border-r border-[#00f0ff]" />
            <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none opacity-20 border-b border-l border-[#00f0ff]" />
            
            <AnimatePresence mode="wait">
              {activeTab === "biography" && (
                <motion.div
                  key="biography"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                    <h4 className="text-sm font-display font-semibold text-[#00f0ff] tracking-widest uppercase">
                      // IDENTITY PROTOCOL //
                    </h4>
                    <span className="text-[10px] font-mono-term text-slate-500">ID: Y_PULIGILLA_2004</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono-term text-[11px] text-slate-400 py-2 bg-black/40 border border-slate-900 rounded p-4">
                    <div>
                      <span className="text-[#00f0ff] font-bold">NAME:</span>
                      <div className="text-white font-bold mt-1">Yashwanth Puligilla</div>
                    </div>
                    <div>
                      <span className="text-[#a855f7] font-bold">CLASS:</span>
                      <div className="text-white font-bold mt-1">AI / Cloud Engineer</div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <span className="text-[#ffb000] font-bold">ACADEMIC MULTIPLIER:</span>
                      <div className="text-white font-bold mt-1">9.94 CGPA [3rd Year Completed]</div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed select-text font-sans">
                    Ambitious, futuristic-minded software engineer obsessed with constructing hyper-scalable cloud infrastructure, optimizing backend processes, and designing agentic AI systems. Experienced in automating operations through robust DevOps pipelines, writing high-frequency algorithms, and developing conversational, multi-turn AI interfaces.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-term pt-4 border-t border-slate-800">
                    <div className="flex gap-2 items-center text-slate-300">
                      <ChevronRight className="w-4 h-4 text-[#00f0ff] shrink-0" />
                      <span>Specialization: AWS Solutioning & DevOps</span>
                    </div>
                    <div className="flex gap-2 items-center text-slate-300">
                      <ChevronRight className="w-4 h-4 text-[#a855f7] shrink-0" />
                      <span>Focus: Retrieval-Augmented GenAI Pipelines</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h4 className="text-sm font-display font-semibold text-[#a855f7] tracking-widest uppercase pb-4 border-b border-slate-800">
                    // ARCHIVAL WORK HISTORY //
                  </h4>

                  <div className="space-y-8 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
                    {experienceData.map((exp, idx) => (
                      <div key={idx} className="flex gap-6 relative">
                        {/* Dot icon */}
                        <div 
                          className="w-7.5 h-7.5 rounded-full flex items-center justify-center shrink-0 border bg-black z-10"
                          style={{ borderColor: exp.color, boxShadow: `0 0 10px ${exp.color}40` }}
                        >
                          <exp.icon className="w-3.5 h-3.5" style={{ color: exp.color }} />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <h4 className="text-sm font-bold text-white tracking-wide">{exp.role}</h4>
                            <span 
                              className="px-2.5 py-0.5 border text-[10px] font-mono-term rounded-full w-fit uppercase"
                              style={{ color: exp.color, borderColor: exp.color + "40", backgroundColor: exp.color + "0a" }}
                            >
                              {exp.company}
                            </span>
                            <span className="text-xs text-slate-500 font-mono-term sm:ml-auto">{exp.period}</span>
                          </div>
                          
                          <ul className="list-disc pl-4 space-y-1 text-xs text-slate-400 font-sans leading-relaxed select-text">
                            {exp.details.map((detail, dIdx) => (
                              <li key={dIdx} className="marker:text-slate-600">{detail}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "attributes" && (
                <motion.div
                  key="attributes"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h4 className="text-sm font-display font-semibold text-[#ffb000] tracking-widest uppercase pb-4 border-b border-slate-800">
                    // COMPUTATIONAL METRICS //
                  </h4>

                  <div className="space-y-6">
                    {attributeStats.map((stat, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-mono-term">
                          <span className="text-white font-semibold uppercase">{stat.name}</span>
                          <span className="font-bold" style={{ color: stat.color }}>
                            {stat.value} / {stat.max}
                          </span>
                        </div>
                        
                        {/* Progress Bar HUD style */}
                        <div className="h-2.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden p-[1px]">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className="h-full rounded-full"
                            style={{ 
                              background: `linear-gradient(to right, ${stat.color}90, ${stat.color})`,
                              boxShadow: `0 0 10px ${stat.color}80`
                            }}
                          />
                        </div>
                        
                        <p className="text-[10px] text-slate-500 font-mono-term font-normal">
                          {stat.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

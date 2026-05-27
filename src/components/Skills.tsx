"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { audio } from "@/utils/audio";
import { Cpu, Cloud, Terminal as TermIcon, Layers, Server, Code, Check } from "lucide-react";

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  overallRating: number;
  color: string;
  skills: { name: string; level: number }[];
}

export default function Skills() {
  const categories: SkillCategory[] = [
    {
      id: "ai",
      name: "AI & GenAI",
      icon: Cpu,
      overallRating: 92,
      color: "#a855f7", // Purple
      skills: [
        { name: "LangChain", level: 95 },
        { name: "OpenAI API", level: 90 },
        { name: "Gemini API", level: 92 },
        { name: "Prompt Engineering", level: 96 }
      ]
    },
    {
      id: "cloud",
      name: "Cloud & AWS",
      icon: Cloud,
      overallRating: 94,
      color: "#00f0ff", // Cyan
      skills: [
        { name: "AWS S3 / Lambda", level: 96 },
        { name: "AWS Step Functions", level: 90 },
        { name: "AWS SSM / IAM", level: 92 },
        { name: "AWS CloudWatch", level: 88 }
      ]
    },
    {
      id: "backend",
      name: "Backend Engineering",
      icon: Server,
      overallRating: 90,
      color: "#ffb000", // Amber
      skills: [
        { name: "FastAPI / Flask", level: 94 },
        { name: "Node.js", level: 88 },
        { name: "REST APIs", level: 95 },
        { name: "SQL & MongoDB", level: 88 }
      ]
    },
    {
      id: "devops",
      name: "DevOps & Tools",
      icon: Layers,
      overallRating: 88,
      color: "#ef4444", // Crimson
      skills: [
        { name: "Docker", level: 90 },
        { name: "Jenkins", level: 85 },
        { name: "Linux Administration", level: 88 },
        { name: "Git & Version Control", level: 95 }
      ]
    },
    {
      id: "languages",
      name: "Languages & Web",
      icon: Code,
      overallRating: 91,
      color: "#39ff14", // Lime green
      skills: [
        { name: "Java", level: 92 },
        { name: "Python", level: 94 },
        { name: "JavaScript / TypeScript", level: 90 },
        { name: "React.js / Next.js", level: 88 }
      ]
    }
  ];

  const [selectedCatId, setSelectedCatId] = useState<string>("ai");
  const selectedCat = categories.find((c) => c.id === selectedCatId) || categories[0];

  const handleCategorySelect = (id: string) => {
    setSelectedCatId(id);
    audio.playClick();
  };

  // SVGs for radial circle values
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (selectedCat.overallRating / 100) * circumference;

  return (
    <section id="skills" className="py-24 px-4 md:px-8 border-b border-slate-900 bg-transparent scroll-mt-12">
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        
        <h2 className="text-xs font-mono-term text-[#00f0ff] tracking-[0.25em] uppercase mb-2">
          // ACCESSING SYSTEM CAPABILITIES
        </h2>
        <h3 className="text-3xl font-display font-black text-white tracking-wide mb-12">
          SKILLS COMMAND MATRIX
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Category Grid Selectors (5 columns) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <h4 className="text-[10px] font-mono-term text-slate-500 uppercase tracking-widest mb-1">// SELECT MODULE TO SCAN</h4>
            
            <div className="flex flex-col gap-3">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedCatId === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`flex items-center gap-4 p-4 border rounded-lg transition-all text-left cursor-pointer group ${
                      isSelected
                        ? "bg-[#0a0a0f]/90 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                        : "border-slate-800 bg-[#0a0a0f]/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                    style={{
                      borderColor: isSelected ? cat.color : undefined,
                      boxShadow: isSelected ? `0 0 15px ${cat.color}25, inset 0 0 8px ${cat.color}10` : undefined
                    }}
                  >
                    <div 
                      className="w-9 h-9 rounded flex items-center justify-center bg-black shrink-0 border"
                      style={{ 
                        borderColor: isSelected ? cat.color + "50" : "#1e293b",
                        boxShadow: isSelected ? `0 0 8px ${cat.color}20` : undefined
                      }}
                    >
                      <IconComponent className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" style={{ color: isSelected ? cat.color : "#64748b" }} />
                    </div>

                    <div className="flex-1">
                      <div className="text-xs font-display font-black uppercase tracking-wider">{cat.name}</div>
                      <div className="text-[10px] font-mono-term text-slate-500 mt-0.5">MATRIX LOAD: {cat.overallRating}%</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Central Diagnostic Radial Meter & Individual Details (7 columns) */}
          <div className="md:col-span-7 border border-slate-800 bg-[#0a0a0f]/90 p-6 md:p-8 rounded-lg glass-panel relative flex flex-col justify-between overflow-hidden">
            
            {/* Ambient matrix style background glow */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[100px] pointer-events-none opacity-20 transition-all duration-500"
              style={{ background: selectedCat.color }}
            />

            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-850 mb-6 relative z-10">
                <h4 className="text-xs font-display font-semibold tracking-widest uppercase" style={{ color: selectedCat.color }}>
                  // MODULE DIAGNOSTIC READOUT //
                </h4>
                <span className="text-[9px] font-mono-term text-slate-500 uppercase">SYS_LOAD: NORMAL</span>
              </div>

              {/* Radial Meter and Stat overview */}
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 relative z-10">
                {/* SVG Radial Meter */}
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r={radius}
                      className="stroke-slate-900 fill-none"
                      strokeWidth={strokeWidth}
                    />
                    <motion.circle
                      cx="56"
                      cy="56"
                      r={radius}
                      className="fill-none"
                      stroke={selectedCat.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Central Text display */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center font-mono-term">
                    <span className="text-white text-base font-bold tracking-tighter">{selectedCat.overallRating}%</span>
                    <span className="text-slate-500 text-[8px] uppercase tracking-wider">LOAD</span>
                  </div>
                </div>

                <div className="text-center sm:text-left space-y-2">
                  <h3 className="text-lg font-display font-black text-white uppercase tracking-wider">{selectedCat.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
                    Operating system modules verified. Individual stack elements display optimal diagnostic capabilities with zero thread deadlocks.
                  </p>
                </div>
              </div>

              {/* Individual Skill Powerbars */}
              <div className="space-y-4 relative z-10">
                <h5 className="text-[9px] font-mono-term text-slate-500 uppercase tracking-widest mb-1">// STACK CORE ELEMENTARY READS</h5>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCat.skills.map((skill, idx) => (
                    <div key={idx} className="p-3 bg-black/40 border border-slate-900 rounded space-y-1.5 hover:border-slate-800 transition-colors">
                      <div className="flex justify-between items-center text-[10px] font-mono-term text-slate-300">
                        <span className="font-bold flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#39ff14]" />
                          {skill.name}
                        </span>
                        <span className="text-slate-400 font-normal">{skill.level}%</span>
                      </div>
                      
                      {/* Sub Powerbar */}
                      <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.05 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedCat.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[9px] font-mono-term text-slate-500 mt-6 border-t border-slate-900 pt-3 relative z-10 text-right">
              COMPILED WITH GOOGLE GEMINI DEEP ENGINE PARSER
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

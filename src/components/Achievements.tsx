"use client";

import React from "react";
import { motion } from "framer-motion";
import { audio } from "@/utils/audio";
import { Award, Trophy, Star, ShieldAlert, Sparkles, Terminal, Code2 } from "lucide-react";

interface Honor {
  id: string;
  title: string;
  desc: string;
  category: string;
  badge: string;
  color: string;
}

export default function Achievements() {
  const honors: Honor[] = [
    {
      id: "academic_excellence",
      title: "Academic Excellence Award",
      desc: "Achieved a perfect 10/10 CGPA in the 1st Semester of the Computer Science and Information Technology program.",
      category: "ACADEMIC",
      badge: "KL University",
      color: "#00f0ff" // Neon Cyan
    },
    {
      id: "leetcode_rating",
      title: "LeetCode Top 19% Programmer",
      desc: "Ranked in the top 19% globally with a peak rating of 1628 and over 400+ algorithmic and data structure problems solved.",
      category: "COMPETITIVE PROGRAMMING",
      badge: "LeetCode Verify",
      color: "#a855f7" // Purple
    },
    {
      id: "codevita_global",
      title: "TCS CodeVita S12 Rank 2151",
      desc: "Ranked 2151st globally out of 100,000+ competitors in Tata Consultancy Services' premier international coding contest.",
      category: "GLOBAL CONTEST",
      badge: "TCS CodeVita",
      color: "#ffb000" // Amber
    },
    {
      id: "codestorm_prize",
      title: "2nd Prize at Codestorm'24",
      desc: "Claimed silver position in the rapid algorithmic compilation sprint and speed hackathon event.",
      category: "HACKATHON",
      badge: "Codestorm Hackathon",
      color: "#ef4444" // Crimson
    },
    {
      id: "genai_finalist",
      title: "GenAI Hackathon Top 5",
      desc: "Reached top 5 finalist standing at GenAI GenderTech Hackathon (Amrita University) for designing serverless agent interfaces.",
      category: "AI & INNOVATION",
      badge: "GenderTech Hack",
      color: "#39ff14" // Emerald
    },
    {
      id: "codeforces_rating",
      title: "Codeforces Active Competitor",
      desc: "Earned a rating of 1092 in global algorithmic contests, focusing on optimization and graph theories.",
      category: "COMPETITIVE PROGRAMMING",
      badge: "Codeforces",
      color: "#3b82f6" // Electric Blue
    }
  ];

  const handleCardHover = () => {
    audio.playClick();
  };

  return (
    <section id="achievements" className="py-24 px-4 md:px-8 border-b border-slate-900 bg-transparent scroll-mt-12">
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-xs font-mono-term text-[#00f0ff] tracking-[0.25em] uppercase mb-2">
            // OPERATIONAL REWARDS & HONORS
          </h2>
          <h3 className="text-3xl font-display font-black text-white tracking-wide">
            HONORS & ACCOMPLISHMENTS
          </h3>
        </div>

        {/* Honors list grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {honors.map((honor) => (
            <motion.div
              key={honor.id}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={handleCardHover}
              className="border border-slate-800 bg-[#0a0a0f]/80 p-5 rounded-lg glass-panel hover:border-slate-700 transition-all flex flex-col justify-between relative overflow-hidden"
              style={{
                boxShadow: `inset 0 0 10px ${honor.color}0d`
              }}
            >
              {/* Corner Category label */}
              <div 
                className="absolute top-2.5 right-3 font-mono-term text-[9px] uppercase font-bold"
                style={{ color: honor.color }}
              >
                {honor.category}
              </div>

              <div className="mt-2">
                {/* Trophy graphic status */}
                <div 
                  className="w-10 h-10 rounded-full border flex items-center justify-center mb-6 bg-black"
                  style={{ borderColor: honor.color + "50", boxShadow: `0 0 8px ${honor.color}15` }}
                >
                  <Award className="w-4.5 h-4.5" style={{ color: honor.color }} />
                </div>

                <h4 className="text-sm font-display font-black text-white tracking-wide mb-2 uppercase select-text">
                  {honor.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans select-text">
                  {honor.desc}
                </p>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between border-t border-slate-900 pt-3 text-[10px] font-mono-term text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full" />
                  <span className="text-[#39ff14] font-bold">VERIFIED ENTRY</span>
                </span>
                <span>{honor.badge}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { audio } from "@/utils/audio";
import { Star, GitFork, ArrowUpRight, Terminal as TermIcon, Calendar } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";

interface Repo {
  name: string;
  desc: string;
  stars: number;
  forks: number;
  lang: string;
  color: string;
}

export default function GithubSection() {
  const [commits, setCommits] = useState<string[]>([
    "commit 6a4f91b: feat: optimize lambda execution limits (+128MB)",
    "commit db345e0: refactor: structure RAG vector search indexes",
    "commit ae12d88: docs: update credentials path validation links",
    "commit 98f12cc: fix: handle Hedera node timeout connection drops",
    "commit 4e29ba1: CI: deploy automated step functions rollbacks"
  ]);

  const repos: Repo[] = [
    {
      name: "prod-auto-recovery",
      desc: "Self-healing incident auto-recovery SRE pipelines on AWS using Lambda, Step Functions & SSM agents.",
      stars: 12,
      forks: 3,
      lang: "Python",
      color: "#ffb000"
    },
    {
      name: "hedera-health-consent",
      desc: "Decentralized consensus healthcare record security platforms utilizing Hedera Hashgraph smart contracts.",
      stars: 8,
      forks: 2,
      lang: "Solidity",
      color: "#00f0ff"
    },
    {
      name: "empower-her-ai",
      desc: "Multi-turn LangChain RAG pipeline for female startup market analysis, built with Next.js & FastAPI.",
      stars: 16,
      forks: 4,
      lang: "TypeScript",
      color: "#a855f7"
    }
  ];

  // Randomly add new simulated git push logs
  useEffect(() => {
    const commitMessages = [
      "commit f123a0e: chore: update docker cluster configs",
      "commit c456f9b: feat: integrate gemini-1.5 token count buffers",
      "commit a987e1a: fix: repair SSL expiration validation loops",
      "commit b765d09: style: implement glassmorphic HUD panel margins",
      "commit d543c21: test: execute unit validations on AWS step graphs"
    ];

    const pushInterval = setInterval(() => {
      const randomMsg = commitMessages[Math.floor(Math.random() * commitMessages.length)];
      setCommits((prev) => [randomMsg, ...prev.slice(0, 4)]);
      if (!audio.isMuted()) audio.playType();
    }, 9000);

    return () => clearInterval(pushInterval);
  }, []);

  const handleOutboundClick = () => {
    audio.playClick();
  };

  // Build simulated GitHub contribution grid (52 weeks x 7 days represented as 24 cols x 7 rows for layout space)
  const renderContributionCells = () => {
    const cells = [];
    // Generate simulated commit density weights: 0 (empty) to 4 (dark green glow)
    for (let i = 0; i < 22 * 7; i++) {
      const weight = Math.random() > 0.75 ? Math.floor(Math.random() * 4) + 1 : 0;
      cells.push(weight);
    }
    return cells;
  };

  const contributionCells = renderContributionCells();

  return (
    <section id="github" className="py-24 px-4 md:px-8 border-b border-slate-900 bg-transparent scroll-mt-12">
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-xs font-mono-term text-[#00f0ff] tracking-[0.25em] uppercase mb-2">
              // VERSION CONTROL CENTER
            </h2>
            <h3 className="text-3xl font-display font-black text-white tracking-wide flex items-center gap-3">
              GITHUB INTEGRATION
            </h3>
          </div>

          <a
            href="https://github.com/Yashwanth112004"
            target="_blank"
            rel="noreferrer"
            onClick={handleOutboundClick}
            className="px-5 py-3 border border-[#00f0ff] bg-[#00f0ff]/10 hover:bg-[#00f0ff]/25 text-white font-display tracking-widest text-[11px] rounded transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <GithubIcon className="w-4 h-4 text-[#00f0ff]" />
            [ ACCESS_GITHUB_HOST ]
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Dashboard Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Stats Summary & Neon Grid (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Stats count overlay */}
            <div className="grid grid-cols-3 gap-4 font-mono-term text-xs text-slate-400">
              <div className="bg-[#0a0a0f]/80 border border-slate-800 p-4 rounded text-center">
                <span className="text-[#39ff14] text-lg font-bold block mb-1">24</span>
                REPOSITORIES
              </div>
              <div className="bg-[#0a0a0f]/80 border border-slate-800 p-4 rounded text-center">
                <span className="text-[#00f0ff] text-lg font-bold block mb-1">450+</span>
                CONTRIBUTIONS
              </div>
              <div className="bg-[#0a0a0f]/80 border border-slate-800 p-4 rounded text-center">
                <span className="text-[#a855f7] text-lg font-bold block mb-1">6+</span>
                ACTIVE BRANCHES
              </div>
            </div>

            {/* Neon Contribution Graph */}
            <div className="border border-slate-800 bg-[#0a0a0f]/80 p-5 rounded-lg glass-panel flex flex-col justify-between h-[230px]">
              <div className="flex justify-between items-center text-[10px] font-mono-term text-slate-500 pb-3 border-b border-slate-900 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#39ff14]" />
                  SIMULATED ACTIVITY CALENDAR
                </span>
                <span>YEAR: 2026</span>
              </div>

              {/* Grid cells representing contributions */}
              <div className="grid grid-flow-col grid-rows-7 gap-[3px] flex-1">
                {contributionCells.map((weight, idx) => {
                  const colors = [
                    "bg-slate-950/40 border border-slate-900/60",
                    "bg-[#39ff14]/15 border border-[#39ff14]/10",
                    "bg-[#39ff14]/30 border border-[#39ff14]/20",
                    "bg-[#39ff14]/55 border border-[#39ff14]/40 shadow-[0_0_4px_#39ff1420]",
                    "bg-[#39ff14] border border-[#39ff14] shadow-[0_0_8px_#39ff1450]"
                  ];

                  return (
                    <div
                      key={idx}
                      className={`w-[11px] h-[11px] rounded-[1.5px] transition-all duration-300 hover:scale-125 ${colors[weight]}`}
                      title={`${weight * 2} commits recorded`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[8px] font-mono-term text-slate-600 mt-4">
                <span>LESS</span>
                <div className="flex gap-[3px]">
                  <div className="w-[10px] h-[10px] rounded bg-slate-900 border border-slate-800" />
                  <div className="w-[10px] h-[10px] rounded bg-[#39ff14]/20" />
                  <div className="w-[10px] h-[10px] rounded bg-[#39ff14]/40" />
                  <div className="w-[10px] h-[10px] rounded bg-[#39ff14]/70" />
                  <div className="w-[10px] h-[10px] rounded bg-[#39ff14]" />
                </div>
                <span>MORE</span>
              </div>
            </div>

          </div>

          {/* Right panel: Active Commit Logs & Repository list (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Live commit shell feed */}
            <div className="border border-slate-800 bg-black rounded-lg p-4 font-mono-term text-[11px] leading-5 h-44 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-900 text-slate-500">
                  <TermIcon className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                  <span>YP_GIT_MONITOR // DEPLOYED</span>
                </div>
                <div className="space-y-1.5 select-text">
                  {commits.map((commit, idx) => (
                    <div key={idx} className="text-slate-300 truncate">
                      <span className="text-[#39ff14] font-bold">&gt; </span>
                      {commit}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[9px] text-slate-600 border-t border-slate-900 pt-2 flex items-center justify-between">
                <span>FEED STREAM ACTIVE</span>
                <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-pulse" />
              </div>
            </div>

            {/* Repos list summary */}
            <div className="space-y-3">
              {repos.map((repo, idx) => (
                <a
                  key={idx}
                  href="https://github.com/Yashwanth112004"
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleOutboundClick}
                  className="flex justify-between items-center p-3 border border-slate-900 hover:border-slate-800 bg-[#0a0a0f]/60 rounded hover:bg-black/40 transition-all cursor-pointer"
                >
                  <div className="flex-1 truncate pr-4">
                    <div className="text-xs font-display font-bold text-white uppercase tracking-wider">{repo.name}</div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">{repo.desc}</div>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0 text-[10px] font-mono-term text-slate-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#ffb000]" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-[#00f0ff]" /> {repo.forks}
                    </span>
                  </div>
                </a>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import ParticleCanvas from "@/components/ParticleCanvas";
import ConsoleHUD from "@/components/ConsoleHUD";
import AidaOrb from "@/components/AidaOrb";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Blog from "@/components/Blog";
import GithubSection from "@/components/Github";
import Contact from "@/components/Contact";
import BugDefender from "@/components/BugDefender";
import { audio } from "@/utils/audio";

export default function Home() {
  const [hasBooted, setHasBooted] = useState(false);
  const [crtActive, setCrtActive] = useState(true);
  const [soundActive, setSoundActive] = useState(true);
  const [matrixActive, setMatrixActive] = useState(false);
  const [agentModeActive, setAgentModeActive] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [xp, setXp] = useState(0);

  const handleTriggerAgentMode = () => {
    setAgentModeActive(true);
  };

  const handleBootComplete = (soundEnabled: boolean) => {
    setSoundActive(soundEnabled);
    setHasBooted(true);
    if (soundEnabled) {
      audio.setMuted(false);
      audio.startAmbient();
    }
  };

  const handleTriggerMatrix = () => {
    setMatrixActive((prev) => !prev);
  };

  const handleUnlockAchievement = () => {
    // No-op to disable gamified achievement popups
  };

  const handleAddXP = (amount: number) => {
    setXp((prev) => Math.min(prev + amount, 20000));
  };

  // Scroll smoothly to target element ID
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen relative bg-[#060608] text-[#e2e8f0] font-sans selection:bg-[#00f0ff] selection:text-black ${
      crtActive ? "crt-effect" : ""
    }`}>
      {/* Background canvas layer */}
      <ParticleCanvas matrixActive={matrixActive} agentModeActive={agentModeActive} />

      <AnimatePresence>
        {!hasBooted && (
          <BootSequence onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      {hasBooted && (
        <div className="relative z-10 flex flex-col min-h-screen">
          
          {/* Diagnostic Grid overlays */}
          <div className="fixed inset-0 digital-grid pointer-events-none opacity-10 z-0" />
          {crtActive && <div className="fixed inset-0 pointer-events-none crt-scanlines opacity-25 z-30 bg-[#060608]" />}

          {/* Persistent advisors HUD and Orb assistants */}
          <AidaOrb />
          <ConsoleHUD
            crtActive={crtActive}
            setCrtActive={setCrtActive}
            soundActive={soundActive}
            setSoundActive={setSoundActive}
            onTriggerMatrix={handleTriggerMatrix}
            onUnlockAchievement={handleUnlockAchievement}
            onOpenGame={() => setGameOpen(true)}
            onTriggerAgentMode={handleTriggerAgentMode}
            xp={xp}
          />

          {/* Main Dashboard Panel views */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 space-y-4">
            <Hero 
              onExploreProjects={() => scrollToSection("projects")} 
              onExploreContact={() => scrollToSection("contact")} 
              agentModeActive={agentModeActive}
            />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Blog />
            <GithubSection />
            <Achievements />
            <Contact onUnlockAchievement={handleUnlockAchievement} />
          </main>

          {/* Global console footer */}
          <footer className="w-full max-w-7xl mx-auto py-8 px-4 md:px-8 border-t border-slate-950 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono-term text-slate-500 relative z-10 select-none">
            <div>
              <span>DESIGNED BY YASHWANTH PULIGILLA // OPERATOR CODE: ALPHA_01</span>
            </div>
            <div>
              <span>SECURE COMPILATION SYSTEM v2.8 // CURRENT TIME: 2026-05-27</span>
            </div>
          </footer>

        </div>
      )}

      {/* Bug Defender Game Overlay */}
      <AnimatePresence>
        {gameOpen && (
          <BugDefender
            onClose={() => setGameOpen(false)}
            onAddXP={handleAddXP}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { audio } from "@/utils/audio";
import { Terminal, Shield, Cpu, Activity, Play } from "lucide-react";

interface BootSequenceProps {
  onComplete: (soundEnabled: boolean) => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [bootStage, setBootStage] = useState<"loading" | "ready" | "transitioning">("loading");
  const [audioPrompt, setAudioPrompt] = useState(true);
  const audioChoiceMade = useRef(false);

  const diagnosticSteps = [
    "LOADING COGNITIVE INTERFACE SYSTEM...",
    "ESTABLISHING HOST NETWORK CONNECTION [SECURE]...",
    "ACCESSING ARCHIVES: YASHWANTH_PULIGILLA.DAT...",
    "READING ACADEMIC RECORDS... CGPA: 9.94/10.0 [VERIFIED]",
    "QUERYING LEETCODE SYSTEM... 1628 RATING INJECTED",
    "DSA COEFFICIENT SCAN: 400+ ALGORITHMIC RUNTIMES LOADED",
    "RETRIEVING ACCENTURE ASSOCIATE SWE INTERN DOSSIER...",
    "FETCHING TECH MAHINDRA ARCHIVES...",
    "INITIALIZING AWS CLOUD INFRASTRUCTURE... AP-SOUTH-1 SECURED",
    "AWS CERTIFIED SOLUTIONS ARCHITECT STATUS: VERIFIED",
    "COMPILING NEURAL PATHWAYS FOR A.I.D.A. FLOATING ORB...",
    "SYNTHESIZING VINTAGE SCI-FI DASHBOARD MODULES...",
    "SYSTEM DECRYPTION KEY MATCHES SPECIFICATION.",
    "BOOT DIAGNOSTIC 100% COMPLETE. COMMAND CENTER READY."
  ];

  // Run the logging simulation
  useEffect(() => {
    if (bootStage !== "loading") return;

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < diagnosticSteps.length) {
        const nextLog = diagnosticSteps[currentLogIndex];
        setLogs((prev) => [...prev, `[OK] ${nextLog}`]);
        
        // Play typing audio chirp
        if (audioChoiceMade.current && !audio.isMuted()) {
          audio.playType();
        }
        
        // Update progress bar
        setProgress(Math.min(((currentLogIndex + 1) / diagnosticSteps.length) * 100, 100));
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => {
          setBootStage("ready");
          if (audioChoiceMade.current && !audio.isMuted()) {
            audio.playSuccess();
          }
        }, 800);
      }
    }, 280);

    return () => clearInterval(logInterval);
  }, [bootStage]);

  const handleBootClick = (enableAudio: boolean) => {
    audioChoiceMade.current = true;
    if (enableAudio) {
      audio.setMuted(false);
      audio.playSuccess();
    } else {
      audio.setMuted(true);
    }
    setAudioPrompt(false);
  };

  const handleEnterCenter = () => {
    setBootStage("transitioning");
    audio.playClick();
    setTimeout(() => {
      onComplete(!audio.isMuted());
    }, 1000);
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050507] text-[#00f0ff] font-mono-term p-6 select-none transition-all duration-1000 ${
      bootStage === "transitioning" ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
    }`}>
      
      {/* CRT overlay scanlines */}
      <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-50 bg-[#060608]" />

      <motion.div 
        initial={{ opacity: 0, filter: "blur(25px)", scale: 0.94 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="w-full max-w-2xl border border-[#00f0ff]/20 bg-[#0a0a0f]/90 p-6 md:p-8 rounded-lg shadow-[0_0_40px_rgba(0,240,255,0.15)] relative overflow-hidden glass-panel-cyan"
      >
        {/* Dynamic scan element */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff] animate-pulse" />

        {/* Audio Choice Overlay */}
        {audioPrompt ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Shield className="w-16 h-16 mb-6 text-[#ffb000] animate-pulse" />
            <h2 className="text-xl md:text-2xl font-display font-semibold mb-4 text-[#ffb000] tracking-wide">
              SECURITY AUDIT IN PROCESS
            </h2>
            <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
              This terminal accesses the private workspace command center of software engineer Yashwanth Puligilla. Initialize auditory transducers for immersion?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={() => handleBootClick(true)}
                className="px-6 py-3 border border-[#00f0ff] bg-[#00f0ff]/10 hover:bg-[#00f0ff]/25 text-[#00f0ff] transition-all rounded font-display tracking-widest text-xs hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
              >
                [ AUDIO_FEED_ON ]
              </button>
              <button
                onClick={() => handleBootClick(false)}
                className="px-6 py-3 border border-slate-500 bg-slate-800/10 hover:bg-slate-800/40 text-slate-400 transition-all rounded font-display tracking-widest text-xs cursor-pointer"
              >
                [ MUTE_AUDIO_FEED ]
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Terminal Top bar */}
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#00f0ff]/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00f0ff]" />
                <span className="font-semibold tracking-wider font-display">YP_COMMAND_SECURE_V2.0</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-[#ffb000]" />
                  <span>CPU: 98%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-[#a855f7]" />
                  <span>SYN: ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Diagnostic Logs Screen */}
            <div className="h-64 overflow-y-auto mb-6 p-4 bg-black/60 border border-[#00f0ff]/10 rounded font-mono-term text-[11px] md:text-xs leading-5 scrollbar-thin">
              {logs.map((log, index) => (
                <div key={index} className="flex gap-2 items-start py-0.5">
                  <span className="text-[#39ff14] shrink-0 font-bold">&gt;</span>
                  <span className="text-slate-300 tracking-wide">{log}</span>
                </div>
              ))}
              {bootStage === "loading" && (
                <div className="flex gap-1 items-center text-[#00f0ff] animate-pulse font-bold mt-1">
                  <span>&gt;</span>
                  <span className="w-2.5 h-4 bg-[#00f0ff]" />
                  <span>LOADING CHANNELS...</span>
                </div>
              )}
            </div>

            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs mb-2 text-slate-400">
                <span>SECTOR MEMORY LOAD</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-slate-900 border border-[#00f0ff]/20 rounded-full overflow-hidden p-[1px]">
                <div 
                  className="h-full bg-gradient-to-r from-[#00f0ff]/50 to-[#00f0ff] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Bottom launcher button */}
            <div className="flex justify-center">
              {bootStage === "ready" ? (
                <button
                  onClick={handleEnterCenter}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#00f0ff] bg-[#00f0ff]/10 hover:bg-[#00f0ff]/30 text-white rounded font-display tracking-widest text-sm hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all cursor-pointer group"
                >
                  <Play className="w-4 h-4 text-[#00f0ff] group-hover:scale-125 transition-transform" />
                  [ INITIALIZE COMMAND CENTER ]
                </button>
              ) : (
                <div className="text-xs text-slate-500 animate-pulse tracking-widest">
                  DECOMPRESSING KERNEL PACKETS...
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

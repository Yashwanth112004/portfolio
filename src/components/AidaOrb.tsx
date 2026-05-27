"use client";

import React, { useState, useEffect, useRef } from "react";
import { audio } from "@/utils/audio";
import { MessageSquare, Sparkles, X } from "lucide-react";

export default function AidaOrb() {
  const [msg, setMsg] = useState<string>("System initialized. I am A.I.D.A., your command advisor. Hover over me for advice!");
  const [showBubble, setShowBubble] = useState(true);
  const [bubbleTimer, setBubbleTimer] = useState<NodeJS.Timeout | null>(null);
  const clickCount = useRef(0);

  const tips = [
    "Recruiter notice: Click the console icon at the bottom-right and type 'agent' to deploy an autonomous AI Cloud Agent!",
    "Yashwanth is currently an Associate SWE Intern at Accenture, holding a 9.94 CGPA.",
    "Did you know? Yashwanth's Auto-Recovery project auto-heals production incidents on AWS with zero downtime.",
    "Try commanding the AI agent: type 'agent deploy lambda' or 'agent service bedrock' in the terminal console!",
    "Looking for certifications? Check out Yashwanth's AWS Solutions Architect Credly verify badge.",
    "DSA Stats: 400+ problems solved. Rating 1628 puts him in the top 19% of programmers globally.",
    "Click the sound icon to activate deep-space core reactor engine frequencies.",
    "A.I.D.A. Status: Nominal. Cloud telemetry nodes reporting 100% capacity."
  ];

  // Rotate tips automatically every 18 seconds
  useEffect(() => {
    const tipInterval = setInterval(() => {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      triggerSpeech(randomTip);
    }, 18000);

    return () => {
      clearInterval(tipInterval);
      if (bubbleTimer) clearTimeout(bubbleTimer);
    };
  }, []);

  const triggerSpeech = (text: string) => {
    setMsg(text);
    setShowBubble(true);

    // Auto-hide speech bubble after 8 seconds
    if (bubbleTimer) clearTimeout(bubbleTimer);
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 8000);
    setBubbleTimer(timer);
  };

  const handleOrbClick = () => {
    audio.playChirp();
    clickCount.current++;
    
    if (clickCount.current === 5) {
      triggerSpeech("Override alert! You have clicked me 5 times. Achievement Unlocked: Assistant Harasser!");
    } else {
      const nextTip = tips[Math.floor(Math.random() * tips.length)];
      triggerSpeech(nextTip);
    }
  };

  const handleOrbHover = () => {
    audio.playClick();
  };

  return (
    <div className="fixed right-6 bottom-52 z-40 flex items-center gap-3">
      {/* Speech bubble */}
      {showBubble && (
        <div className="relative max-w-xs p-3 bg-[#0a0a0f]/95 border border-[#a855f7]/30 text-[#e2e8f0] text-[11px] font-mono-term rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.15)] glass-panel animate-in fade-in slide-in-from-right-4 duration-300">
          {/* Bubble pointer */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#0a0a0f] border-t border-r border-[#a855f7]/30" />
          
          <button 
            onClick={() => setShowBubble(false)}
            className="absolute top-1.5 right-1.5 text-slate-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="flex gap-1.5 items-start mt-1">
            <Sparkles className="w-3.5 h-3.5 text-[#a855f7] shrink-0 animate-pulse" />
            <p className="leading-4 pr-3">{msg}</p>
          </div>
        </div>
      )}

      {/* Floating Orb Avatar */}
      <div 
        onClick={handleOrbClick}
        onMouseEnter={handleOrbHover}
        className="relative w-12 h-12 flex items-center justify-center rounded-full cursor-pointer group shadow-[0_0_25px_rgba(168,85,247,0.4)]"
      >
        {/* Glow outer rings */}
        <div className="absolute inset-[-4px] rounded-full border border-[#a855f7]/20 animate-ping duration-1000 opacity-40" />
        <div className="absolute inset-0 rounded-full border border-[#00f0ff]/20 animate-pulse duration-700" />
        
        {/* Core Orb */}
        <div className="absolute inset-[2px] rounded-full bg-gradient-to-tr from-[#8b5cf6] via-[#d946ef] to-[#00f0ff] opacity-80 blur-[2px] group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute inset-[4px] rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-[#00f0ff]/50 transition-colors">
          <MessageSquare className="w-4.5 h-4.5 text-[#00f0ff] group-hover:text-white group-hover:scale-110 transition-all" />
        </div>
      </div>
    </div>
  );
}

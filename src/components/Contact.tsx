"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "@/utils/audio";
import { Send, Mail, FileText, SendHorizontal, Terminal as TermIcon, ShieldAlert } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

interface ContactProps {
  onUnlockAchievement: (title: string, desc: string) => void;
}

export default function Contact({ onUnlockAchievement }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sendLogs, setSendLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "encrypting" | "sending" | "complete">("idle");

  const channels = [
    { name: "SECURE EMAIL FEED", icon: Mail, detail: "2320090012csit@gmail.com", url: "mailto:2320090012csit@gmail.com", color: "#00f0ff" },
    { name: "LINKEDIN PORTAL", icon: LinkedinIcon, detail: "linkedin.com/in/yashwanth-puligilla", url: "https://www.linkedin.com/in/yashwanth-puligilla/", color: "#a855f7" },
    { name: "GITHUB SOURCE NODE", icon: GithubIcon, detail: "github.com/Yashwanth112004", url: "https://github.com/Yashwanth112004", color: "#39ff14" },
    { name: "TELEGRAM PROMPT BOT", icon: SendHorizontal, detail: "t.me/PRompt11187Bot", url: "https://t.me/PRompt11187Bot", color: "#ef4444" },
    { name: "DOWNLOAD DECRYPTED CV", icon: FileText, detail: "resume.pdf", url: "/resume.pdf", color: "#ffb000", download: "resume.pdf" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    audio.playType();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      audio.playError();
      return;
    }

    // Begin simulated encrypted handshake
    audio.playClick();
    setStatus("encrypting");
    setSendLogs([
      "INITIALIZING CRYPTOGRAPHIC HANDSHAKE PROTOCOLS...",
      "GENERATING EPHEMERAL RSA PUBLIC KEY...",
      "COMPRESSING MESSAGE INSTRUCTION PAYLOADS..."
    ]);

    setTimeout(() => {
      setStatus("sending");
      setSendLogs((prev) => [
        ...prev,
        "ENCRYPTION VERIFIED: AES_256_GCM",
        "CONNECTING TO RELAY NODE AP-SOUTH-1.SMTP...",
        "DISPATCHING HIGH-SPEED DATA PACKET SECTOR..."
      ]);
      if (!audio.isMuted()) audio.playType();
    }, 1200);

    setTimeout(() => {
      setStatus("complete");
      setSendLogs((prev) => [
        ...prev,
        "PACKET HANDSHAKE SIGNATURE: VERIFIED OK",
        "TRANSMISSION STATE: DELIVERED SUCCESS",
        "SECURE ROUTE ESTABLISHED. HANDLER TERMINATED."
      ]);
      audio.playSuccess();
      onUnlockAchievement("Secure Transceiver", "Establish direct encrypted contact with Yashwanth.");
      
      // Direct mailto tunnel dispatcher
      const subject = encodeURIComponent(`Message from ${formData.name} via Portfolio HUD`);
      const body = encodeURIComponent(`Operator Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage Content:\n${formData.message}\n\n---\nSecure communications packet routed from Command Center.`);
      window.location.href = `mailto:2320090012csit@gmail.com?subject=${subject}&body=${body}`;

      setFormData({ name: "", email: "", message: "" });
    }, 2800);
  };

  const handleLinkClick = () => {
    audio.playClick();
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 border-b border-slate-950 bg-transparent scroll-mt-12">
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        
        {/* Header */}
        <h2 className="text-xs font-mono-term text-[#00f0ff] tracking-[0.25em] uppercase mb-2">
          // ESTABLISH QUANTUM COMMUNICATIONS CHANNEL
        </h2>
        <h3 className="text-3xl font-display font-black text-white tracking-wide mb-12">
          CONTACT TERMINAL
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: secure forms & encryption screen (7 cols) */}
          <div className="md:col-span-7 border border-slate-800 bg-[#0a0a0f]/90 p-6 md:p-8 rounded-lg glass-panel relative flex flex-col justify-between overflow-hidden">
            
            {/* Decrypt grid light */}
            <div className="absolute inset-0 digital-grid pointer-events-none opacity-20 z-0" />

            {status === "idle" ? (
              <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
                <div className="flex justify-between items-center pb-3 border-b border-slate-900 mb-2">
                  <h4 className="text-xs font-display font-semibold text-[#00f0ff] tracking-widest uppercase">
                    // PAYLOAD ENCRYPTION TRANSMITTER //
                  </h4>
                  <span className="text-[9px] font-mono-term text-slate-500">READY</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono-term text-slate-400 uppercase mb-1">CALLER_NAME:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-slate-800 focus:border-[#00f0ff] outline-none text-white text-xs px-3 py-2.5 rounded font-mono-term tracking-wide"
                      placeholder="Input operator identity..."
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-term text-slate-400 uppercase mb-1">RETURN_ADDRESS:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-slate-800 focus:border-[#00f0ff] outline-none text-white text-xs px-3 py-2.5 rounded font-mono-term tracking-wide"
                      placeholder="Input email route endpoint..."
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-term text-slate-400 uppercase mb-1">MESSAGE_PAYLOAD:</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full bg-black/50 border border-slate-800 focus:border-[#00f0ff] outline-none text-white text-xs px-3 py-2.5 rounded font-mono-term tracking-wide resize-none"
                      placeholder="Draft communications payload instructions..."
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 border-2 border-[#00f0ff] bg-[#00f0ff]/10 hover:bg-[#00f0ff]/25 text-white font-display tracking-widest text-xs rounded hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Send className="w-4 h-4 text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  [ SECURE_DISPATCH ]
                </button>
              </form>
            ) : (
              // Transmission Terminal display
              <div className="flex-1 flex flex-col justify-between h-full relative z-10">
                <div className="flex justify-between items-center pb-3 border-b border-slate-900 mb-6">
                  <h4 className="text-xs font-display font-semibold text-[#39ff14] tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#39ff14] rounded-full animate-ping" />
                    // SECURE_DISPATCH_CONSOLE //
                  </h4>
                  <span className="text-[9px] font-mono-term text-[#39ff14]">ACTIVE</span>
                </div>

                {/* Log screens */}
                <div className="flex-1 bg-black/80 border border-slate-900 p-4 rounded font-mono-term text-[11px] leading-6 text-slate-300 space-y-1 overflow-y-auto max-h-[220px]">
                  {sendLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-[#39ff14] font-bold">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  {(status === "encrypting" || status === "sending") && (
                    <div className="text-[#00f0ff] animate-pulse font-bold mt-1">
                      &gt; PROCESSING...
                    </div>
                  )}
                </div>

                {status === "complete" && (
                  <button
                    onClick={() => setStatus("idle")}
                    className="w-full mt-6 py-3.5 border border-slate-800 bg-[#0a0a0f]/80 hover:bg-slate-800/40 text-slate-300 hover:text-white font-display tracking-widest text-xs rounded transition-all cursor-pointer"
                  >
                    [ DISPATCH ANOTHER PACKET ]
                  </button>
                )}
              </div>
            )}

          </div>

          {/* Right panel: network port channel list (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between gap-4">
            <h4 className="text-[10px] font-mono-term text-slate-500 uppercase tracking-widest mb-1">// SECURITY ROUTING MAP</h4>
            
            <div className="flex flex-col gap-3">
              {channels.map((chan, idx) => {
                const IconComponent = chan.icon;

                return (
                  <a
                    key={idx}
                    href={chan.url}
                    target={chan.download ? undefined : "_blank"}
                    download={chan.download}
                    rel="noreferrer"
                    onClick={handleLinkClick}
                    className="flex items-center gap-4 p-4 border border-slate-900 bg-[#0a0a0f]/80 rounded hover:border-slate-800 hover:bg-black/30 transition-all cursor-pointer group"
                  >
                    <div 
                      className="w-9 h-9 rounded flex items-center justify-center bg-black shrink-0 border"
                      style={{ borderColor: chan.color + "40" }}
                    >
                      <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: chan.color }} />
                    </div>

                    <div className="flex-1 truncate pr-2">
                      <div className="text-[9px] font-mono-term text-slate-500 uppercase tracking-wide">PORT_0{idx + 1} // {chan.name}</div>
                      <div className="text-xs font-display font-bold text-white tracking-wide truncate mt-0.5">{chan.detail}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="text-[10px] font-mono-term text-slate-500 bg-black/40 border border-slate-950 p-4 rounded text-center leading-5 select-none">
              IP ADDRESS CHECK: COMPLIANT<br />
              SYSTEM PORT STATE: ENCRYPTED
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

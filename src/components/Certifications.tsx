"use client";

import React from "react";
import { motion } from "framer-motion";
import { audio } from "@/utils/audio";
import { ShieldCheck, CloudLightning, ExternalLink } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  badgeId: string;
  date: string;
  credlyUrl: string;
  details: string[];
  themeColor: string;
}

export default function Certifications() {
  const certificationsData: Certificate[] = [
    {
      id: "aws_solutions_architect",
      title: "AWS Certified Solutions Architect – Associate",
      badgeId: "VALIDATION // SAA-C03",
      date: "ISSUED: 2024",
      credlyUrl: "https://www.credly.com/badges/97277d31-861a-42d4-9c4a-ec4a6b497679/public_url",
      details: [
        "Validated capabilities in designing resilient, high-performing, secure, and cost-optimized architectures on AWS.",
        "Demonstrated skills in deploying multi-tier topologies, autoscaling logic, and VPC peering connections."
      ],
      themeColor: "#ff9900" // AWS Orange
    },
    {
      id: "aws_cloud_practitioner",
      title: "AWS Certified Cloud Practitioner",
      badgeId: "VALIDATION // CLF-C02",
      date: "ISSUED: 2023",
      credlyUrl: "https://www.credly.com/badges/97277d31-861a-42d4-9c4a-ec4a6b497679/public_url",
      details: [
        "Acquired foundational knowledge of cloud concepts, security mechanisms, compliance standards, and AWS core services.",
        "Verified architectural capabilities including serverless triggers and budget tracking limits."
      ],
      themeColor: "#00a1c9" // AWS Blue
    }
  ];

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    const rotateX = -y / 18;
    const rotateY = x / 18;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  const handleButtonClick = () => {
    audio.playClick();
  };

  return (
    <section id="certifications" className="py-24 px-4 md:px-8 border-b border-slate-900 bg-transparent scroll-mt-12">
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <h2 className="text-xs font-mono-term text-[#00f0ff] tracking-[0.25em] uppercase mb-2">
          // AWS SECURITY AND COMPLIANCE DECK
        </h2>
        <h3 className="text-3xl font-display font-black text-white tracking-wide mb-12">
          CREDENTIAL VERIFICATIONS
        </h3>

        {/* Dual AWS holographic grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="group border border-slate-800 bg-[#0a0a0f]/80 p-6 md:p-8 rounded-lg glass-panel hover:border-slate-700 transition-all relative flex flex-col justify-between overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.15s ease-out, border-color 0.3s"
              }}
            >
              {/* Pulsing neon grid lines background inside the card */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 80% 20%, ${cert.themeColor}, transparent 55%)`
                }}
              />

              {/* Validation identifier */}
              <div className="absolute top-3 right-4 font-mono-term text-[9px] text-slate-500 uppercase tracking-wider">
                {cert.badgeId}
              </div>

              <div>
                {/* Holographic icon emblem */}
                <div 
                  className="w-12 h-12 rounded border flex items-center justify-center mb-6 bg-black"
                  style={{ borderColor: cert.themeColor + "50", boxShadow: `0 0 10px ${cert.themeColor}15` }}
                >
                  {cert.id === "aws_solutions_architect" ? (
                    <ShieldCheck className="w-6 h-6" style={{ color: cert.themeColor }} />
                  ) : (
                    <CloudLightning className="w-6 h-6" style={{ color: cert.themeColor }} />
                  )}
                </div>

                <div className="font-mono-term text-[10px] mb-1" style={{ color: cert.themeColor }}>
                  {cert.date}
                </div>

                <h4 className="text-base md:text-lg font-display font-black text-white uppercase tracking-wide mb-4 select-text">
                  {cert.title}
                </h4>

                <ul className="list-disc pl-4 space-y-2 text-xs text-slate-400 font-sans leading-relaxed mb-8 select-text">
                  {cert.details.map((detail, idx) => (
                    <li key={idx} className="marker:text-slate-700">{detail}</li>
                  ))}
                </ul>
              </div>

              {/* Action Credly Redirect button */}
              <a
                href={cert.credlyUrl}
                target="_blank"
                rel="noreferrer"
                onClick={handleButtonClick}
                className="w-full py-3.5 border text-center font-display tracking-widest text-[11px] rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  color: cert.themeColor,
                  borderColor: cert.themeColor + "60",
                  backgroundColor: cert.themeColor + "0a"
                }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                [ VERIFY_ON_CREDLY ]
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

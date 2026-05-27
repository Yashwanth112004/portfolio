"use client";

import React, { useState, useEffect, useRef } from "react";
import { audio } from "@/utils/audio";
import { Terminal as TermIcon, Volume2, VolumeX, Monitor, Activity, Cpu, Gamepad2 } from "lucide-react";

interface LogLine {
  text: string;
  type: "system" | "input" | "success" | "error" | "warning";
}

interface ConsoleHUDProps {
  crtActive: boolean;
  setCrtActive: (active: boolean) => void;
  soundActive: boolean;
  setSoundActive: (active: boolean) => void;
  onTriggerMatrix: () => void;
  onUnlockAchievement: (title: string, desc: string) => void;
  onOpenGame: () => void;
  onTriggerAgentMode: () => void;
  xp?: number;
}

export default function ConsoleHUD({
  crtActive,
  setCrtActive,
  soundActive,
  setSoundActive,
  onTriggerMatrix,
  onUnlockAchievement,
  onOpenGame,
  onTriggerAgentMode,
  xp = 0,
}: ConsoleHUDProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<LogLine[]>([
    { text: "YP COMMAND CENTER SYSTEM v2.8", type: "system" },
    { text: "Type 'help' to list available command vectors.", type: "system" }
  ]);
  const [telemetry, setTelemetry] = useState({
    cpu: 45,
    temp: 54,
    ram: "3.44 GB"
  });
  const logsEndRef = useRef<HTMLDivElement>(null);
  const isAgentRunningRef = useRef(false);
 
  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);
 
  // Simulate Telemetry Data Ticking
  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      setTelemetry({
        cpu: Math.floor(40 + Math.random() * 25),
        temp: Math.floor(50 + Math.random() * 8),
        ram: (3.2 + Math.random() * 0.4).toFixed(2) + " GB"
      });
    }, 3000);
    return () => clearInterval(telemetryInterval);
  }, []);
 
  const handleSoundToggle = () => {
    const newSoundState = !soundActive;
    setSoundActive(newSoundState);
    audio.setMuted(!newSoundState);
    audio.playClick();
  };
 
  const handleCrtToggle = () => {
    setCrtActive(!crtActive);
    audio.playClick();
  };
 
  const [isAgentRunning, setIsAgentRunning] = useState(false);
 
  const runAgentSimulation = (steps: LogLine[], completionCallback?: () => void) => {
    setIsAgentRunning(true);
    isAgentRunningRef.current = true;
    let index = 0;
    
    const runNextStep = () => {
      if (index < steps.length) {
        const nextStep = steps[index];
        if (nextStep) {
          setTerminalLogs((prev) => [...prev, nextStep]);
          
          const currentType = nextStep.type;
          if (currentType === "success") {
            audio.playSuccess();
          } else if (currentType === "error" || currentType === "warning") {
            audio.playError();
          } else {
            if (!audio.isMuted()) audio.playType();
          }
        }
        
        index++;
        setTimeout(runNextStep, 900 + Math.random() * 600);
      } else {
        setIsAgentRunning(false);
        isAgentRunningRef.current = false;
        if (completionCallback) completionCallback();
      }
    };
    
    runNextStep();
  };
 
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isAgentRunning || isAgentRunningRef.current) return;
 
    const rawInput = inputValue.trim();
    const parts = rawInput.split(/\s+/);
    const mainCommand = parts[0].toLowerCase();
    const newLogs = [...terminalLogs, { text: rawInput, type: "input" as const }];
    
    // Play clicking sound
    audio.playClick();

    if (mainCommand === "agent") {
      const subCommand = parts[1] ? parts[1].toLowerCase() : "";
      
      if (!subCommand) {
        newLogs.push(
          { text: "=== A.I.D.A. AUTONOMOUS DEV-OPS COGNITIVE AGENT ===", type: "warning" },
          { text: "Status: STANDBY // Region: us-east-1 // Base: Gemini-Pro", type: "system" },
          { text: "Available instructions:", type: "system" },
          { text: "  agent deploy <service> - Provision serverless API/infrastructure (e.g. agent deploy lambda)", type: "system" },
          { text: "  agent secure           - Audit and harden IAM rules & Security Groups", type: "system" },
          { text: "  agent optimize         - Scan idle cloud resources and downsize cost", type: "system" },
          { text: "  agent custom <prompt>  - Execute custom multi-step agent actions", type: "system" }
        );
        setTerminalLogs(newLogs);
        setInputValue("");
        return;
      }

      setTerminalLogs(newLogs);
      setInputValue("");

      if (subCommand === "deploy") {
        const targetService = parts[2] || "lambda";
        const steps: LogLine[] = [
          { text: `[A.I.D.A. Ops] DEPLOY instruction received. Resource target: ${targetService.toUpperCase()}`, type: "system" },
          { text: `[A.I.D.A. Ops] [REASONING] Validating serverless architecture configuration...`, type: "system" },
          { text: `[A.I.D.A. Ops] [ACTION] Synthesizing AWS CloudFormation resource template for ${targetService}...`, type: "system" },
          { text: `[A.I.D.A. Ops] [CDK CLI] terraform init && terraform plan --out=tfplan`, type: "system" },
          { text: `[A.I.D.A. Ops] [LOG] Creating AWS ${targetService} Node Cluster [AWS-REGION-1B]... [IN_PROGRESS]`, type: "warning" },
          { text: `[A.I.D.A. Ops] [LOG] Configuring CloudFront CDN and SSL gateway interfaces... [SUCCESS]`, type: "system" },
          { text: `[SUCCESS] DevOps Agent successfully completed provision stack: yp-agentic-${targetService}-api-prod.`, type: "success" },
          { text: `[SYS] Autonomous synergy established. Commencing dashboard latency reduction path.`, type: "success" }
        ];
        runAgentSimulation(steps, () => {
          onTriggerAgentMode();
          onUnlockAchievement("DevOps Architect", `Deploy a serverless AWS ${targetService} stack using the AI agent.`);
        });
      } else if (subCommand === "secure") {
        const steps: LogLine[] = [
          { text: `[A.I.D.A. Ops] SECURE instruction received. Initializing vulnerability audit...`, type: "system" },
          { text: `[A.I.D.A. Ops] [REASONING] Scanning IAM roles, S3 bucket permissions, and security groups.`, type: "system" },
          { text: `[A.I.D.A. Ops] [ALERT] IAM policy 'accenture-dev-role' has overly broad Wildcard (*) permissions.`, type: "warning" },
          { text: `[A.I.D.A. Ops] [ALERT] Security Group 'default-vpc-sg' exposes Port 22 (SSH) to public 0.0.0.0/0.`, type: "warning" },
          { text: `[A.I.D.A. Ops] [ACTION] Patching vulnerabilities. Revoking inbound port 22 and enforcing least privilege.`, type: "system" },
          { text: `[A.I.D.A. Ops] [LOG] Applying IAM role changes... Done.`, type: "system" },
          { text: `[SUCCESS] Security hardening complete. Inbound SSH restricted. Wildcards purged. Compliance score: 100/100.`, type: "success" },
          { text: `[SYS] Autonomous synergy established. Dashboard is now shielded.`, type: "success" }
        ];
        runAgentSimulation(steps, () => {
          onTriggerAgentMode();
          onUnlockAchievement("Cyber Guard", "Remediated AWS cloud vulnerabilities via AI agent audit.");
        });
      } else if (subCommand === "optimize") {
        const steps: LogLine[] = [
          { text: `[A.I.D.A. Ops] OPTIMIZE instruction received. Fetching AWS CloudWatch logs and billing datasets...`, type: "system" },
          { text: `[A.I.D.A. Ops] [REASONING] Checking CPU/Memory utilization average metrics over 30 days.`, type: "system" },
          { text: `[A.I.D.A. Ops] [ANALYSIS] EC2 instance 'prod-api-server' (m5.xlarge) average CPU utilization is 1.4%.`, type: "warning" },
          { text: `[A.I.D.A. Ops] [ANALYSIS] Identified 3 unattached EBS volume blocks (total 180GB) wasting $28/month.`, type: "warning" },
          { text: `[A.I.D.A. Ops] [ACTION] Scaling down EC2 to t3a.medium. Purging unattached EBS block storage.`, type: "system" },
          { text: `[A.I.D.A. Ops] [LOG] Decommissioning volumes vol-03a1f9e, vol-089cba... Done.`, type: "system" },
          { text: `[SUCCESS] Cloud cost optimization complete. Saved $145/month. Efficiency coefficient boosted.`, type: "success" },
          { text: `[SYS] Autonomous synergy established. Host operating environment is optimized.`, type: "success" }
        ];
        runAgentSimulation(steps, () => {
          onTriggerAgentMode();
          onUnlockAchievement("Cost Auditor", "Remediated over-provisioned AWS nodes using the AI agent.");
        });
      } else if (subCommand === "service") {
        const targetService = parts[2] ? parts[2].toLowerCase() : "";
        if (!targetService) {
          const steps: LogLine[] = [
            { text: "[A.I.D.A. Ops] ERROR: Please specify a service name (e.g. 'agent service s3', 'agent service lambda').", type: "error" },
            { text: "Supported Services: s3, lambda, ecs, dynamodb, hedera, bedrock", type: "system" }
          ];
          runAgentSimulation(steps);
        } else {
          const servicesDb: Record<string, { type: string; role: string; config: string }> = {
            s3: {
              type: "AWS Object Storage Service",
              role: "Agent Memory Store & Artifact Depot. Used to store long-term LLM context files, raw dataset archives, and compiled deployment outputs.",
              config: "Encryption: KMS (SSE-KMS) enabled. Versioning: Active. Public Access Block: Enforced."
            },
            lambda: {
              type: "AWS Serverless FaaS (Compute)",
              role: "Autonomous Tool Executor. Initiated by Agent dispatch vectors to run ephemeral tasks (e.g., database backups, API routing, custom scripts).",
              config: "Runtime: Python 3.11 / Node 20. Memory: 512MB. Timeout: 120s. IAM Role: Least-privilege execution."
            },
            ecs: {
              type: "AWS Container Orchestrator",
              role: "Agent Hosting Cluster. Runs continuous, long-running agent loops (e.g., Slack agents, Auto-GPT controllers) inside secure Docker containers.",
              config: "Launch Type: Fargate. Task Role: ECS Agent Executor. Auto-scaling policy: CPU > 70%."
            },
            dynamodb: {
              type: "AWS Serverless NoSQL Database",
              role: "Agent Memory Ledger. Stores persistent short-term agent memory tables, chat logs, and execution state trees.",
              config: "Billing: On-Demand. Partition Key: AgentId. Sort Key: Timestamp."
            },
            hedera: {
              type: "Distributed Ledger Technology (DLT)",
              role: "Agent Trust & Consent Registry. Cryptographically records agent access audits, patient consent rules, and immutable execution logs.",
              config: "Consensus Service (HCS): Enabled. Smart Contracts: Solidity EVM-compatible."
            },
            bedrock: {
              type: "Managed Foundation Models",
              role: "Agent Brain & Reasoning Engine. Provides secure API access to LLMs (Claude 3.5, Llama 3) for reasoning and planning.",
              config: "Model ID: anthropic.claude-3-5-sonnet. Guardrails: Active. VPC Endpoint: Enforced."
            }
          };

          const serviceInfo = servicesDb[targetService] || {
            type: "Generic Cloud Resource",
            role: `General component matching query '${targetService.toUpperCase()}' in the AI / Cloud infrastructure blueprint.`,
            config: "Configuration standard: Default secure settings. Role binding: Tool resource."
          };

          const steps: LogLine[] = [
            { text: `[A.I.D.A. Ops] Querying knowledge base for cloud service: ${targetService.toUpperCase()}`, type: "system" },
            { text: `[A.I.D.A. Ops] [REASONING] Searching catalog database for: ${targetService.toUpperCase()}`, type: "system" },
            { text: `[A.I.D.A. Ops] [CLASSIFICATION] Service Type: ${serviceInfo.type}`, type: "warning" },
            { text: `[A.I.D.A. Ops] [AGENTIC ROLE] ${serviceInfo.role}`, type: "system" },
            { text: `[A.I.D.A. Ops] [RECOMMENDED CONFIG] ${serviceInfo.config}`, type: "system" },
            { text: `[SUCCESS] Service definition for ${targetService.toUpperCase()} fetched successfully.`, type: "success" }
          ];

          runAgentSimulation(steps, () => {
            onUnlockAchievement("Cloud Scholar", `Inquired about AWS ${targetService.toUpperCase()} agentic operations.`);
          });
        }
      } else {
        const promptQuery = parts.slice(1).join(" ") || "General infrastructure tasks";
        const steps: LogLine[] = [
          { text: `[A.I.D.A. Ops] CUSTOM prompt received: "${promptQuery}"`, type: "system" },
          { text: `[A.I.D.A. Ops] [REASONING] Dissecting request into structured cloud actions.`, type: "system" },
          { text: `[A.I.D.A. Ops] [ACTION] Connecting to Gemini 1.5 Pro inference engine for instructions.`, type: "system" },
          { text: `[A.I.D.A. Ops] [LOG] Execution path: [Orchestrate Agentic RAG Stack on ECS]...`, type: "warning" },
          { text: `[SUCCESS] Custom command completed. Node configurations fully synced.`, type: "success" },
          { text: `[SYS] Autonomous synergy established.`, type: "success" }
        ];
        runAgentSimulation(steps, () => {
          onTriggerAgentMode();
          onUnlockAchievement("Agent Master", "Commanded the DevOps AI agent to deploy custom prompt targets.");
        });
      }
      return;
    }

    // Command parser
    switch (mainCommand) {
      case "help":
        newLogs.push(
          { text: "Available command sectors:", type: "system" },
          { text: "  about    - Scans candidate biographical dossier.", type: "system" },
          { text: "  skills   - Accesses technical competency matrix.", type: "system" },
          { text: "  projects - Displays cloud & AI deployment repositories.", type: "system" },
          { text: "  certifications - Decrypts AWS credential pathways.", type: "system" },
          { text: "  blog     - Renders cloud engineering logs (S3 hosted).", type: "system" },
          { text: "  github   - Inspects live version control metrics.", type: "system" },
          { text: "  contact  - Establishes encrypted communications channel.", type: "system" },
          { text: "  game     - Launch Bug Defender arcade game (earn XP!).", type: "system" },
          { text: "  agent    - Interfaces with autonomous DevOps AI Agent. (Try: 'agent deploy', 'agent secure', 'agent optimize', 'agent service <s3/lambda/ecs/dynamodb/hedera/bedrock>')", type: "warning" },
          { text: "  clear    - Flushes diagnostic terminal buffer.", type: "system" }
        );
        break;

      case "game":
        onOpenGame();
        audio.playSuccess();
        newLogs.push({ text: "[ARCADE] Launching Bug Defender... Destroy malware bugs and earn XP!", type: "success" });
        break;

      case "about":
      case "skills":
      case "projects":
      case "certifications":
      case "blog":
      case "github":
      case "contact":
        const targetSection = document.getElementById(mainCommand);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
          newLogs.push({ text: `Navigating to sector: #${mainCommand.toUpperCase()}...`, type: "success" });
        } else {
          newLogs.push({ text: `Target sector #${mainCommand} not initialized.`, type: "error" });
        }
        break;

      case "clear":
        setTerminalLogs([]);
        setInputValue("");
        return;

      default:
        audio.playError();
        newLogs.push({ text: `ERR: Command Vector '${rawInput}' unrecognized. Enter 'help' for diagnostics.`, type: "error" });
    }

    setTerminalLogs(newLogs);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    audio.playType();
  };

  return (
    <>
      {/* Permanent Right-Side Floating HUD Controllers */}
      <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3 items-center">
        {/* Toggle Panel Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            audio.playClick();
          }}
          className={`w-12 h-12 flex items-center justify-center rounded-full border bg-[#0a0a0f]/90 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
            isOpen 
              ? "border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]" 
              : "border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200"
          }`}
          title="Toggle Command HUD Terminal"
        >
          <TermIcon className={`w-5.5 h-5.5 ${isOpen ? "animate-pulse" : ""}`} />
        </button>

        {/* Audio Controller */}
        <button
          onClick={handleSoundToggle}
          className={`w-12 h-12 flex items-center justify-center rounded-full border bg-[#0a0a0f]/90 transition-all cursor-pointer ${
            soundActive 
              ? "border-[#a855f7] text-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
              : "border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
          }`}
          title="Toggle Audio Feedback"
        >
          {soundActive ? <Volume2 className="w-5.5 h-5.5" /> : <VolumeX className="w-5.5 h-5.5" />}
        </button>

        {/* CRT Scanline Filter Toggle */}
        <button
          onClick={handleCrtToggle}
          className={`w-12 h-12 flex items-center justify-center rounded-full border bg-[#0a0a0f]/90 transition-all cursor-pointer ${
            crtActive 
              ? "border-[#ffb000] text-[#ffb000] shadow-[0_0_15px_rgba(255,176,0,0.3)]" 
              : "border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
          }`}
          title="Toggle Retro CRT Scanlines"
        >
          <Monitor className="w-5.5 h-5.5" />
        </button>

        {/* Bug Defender Game Launch */}
        <button
          onClick={() => { onOpenGame(); audio.playClick(); }}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-[#39ff14]/40 bg-[#0a0a0f]/90 text-[#39ff14] hover:border-[#39ff14] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all cursor-pointer"
          title="Launch Bug Defender Arcade Game"
        >
          <Gamepad2 className="w-5 h-5" />
        </button>

        {/* XP Bar widget */}
        {xp > 0 && (
          <div className="w-12 flex flex-col items-center gap-0.5" title={`${xp} XP earned`}>
            <div className="text-[8px] font-mono-term text-[#39ff14] tracking-wider">XP</div>
            <div className="w-10 h-1.5 bg-slate-900 rounded-full border border-slate-800 overflow-hidden">
              <div
                className="h-full bg-[#39ff14] rounded-full transition-all duration-500"
                style={{ width: `${Math.min((xp / 20000) * 100, 100)}%` }}
              />
            </div>
            <div className="text-[7px] font-mono-term text-slate-500">{xp}</div>
          </div>
        )}
      </div>

      {/* Main Slide-in Console Terminal Drawer */}
      <div 
        className={`fixed left-0 right-0 bottom-0 z-40 bg-[#07070a]/95 border-t border-[#00f0ff]/20 shadow-[0_-15px_40px_rgba(0,0,0,0.8)] font-mono-term transition-transform duration-500 transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "300px" }}
      >
        <div className="h-full flex flex-col md:flex-row relative">
          
          {/* Neon scan divider */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#00f0ff] animate-pulse" />

          {/* Left panel: Telemetry stats */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-[#00f0ff]/10 p-4 flex flex-col justify-between text-xs text-slate-400 bg-black/30">
            <div>
              <div className="flex items-center gap-2 mb-4 text-[#00f0ff]">
                <Activity className="w-4 h-4 text-[#00f0ff] animate-pulse" />
                <span className="font-display font-semibold tracking-wider">YP_TELEMETRY_LOG</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>SECURE CONNECTIVITY:</span>
                  <span className="text-[#39ff14] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-ping" />
                    ONLINE
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-[#ffb000]" /> SYSTEM TEMPERATURE:
                  </span>
                  <span className="text-[#ffb000]">{telemetry.temp} °C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>PROCESSOR LOAD:</span>
                  <span className="text-slate-200">{telemetry.cpu}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ALLOCATED MEMORY:</span>
                  <span className="text-slate-200">{telemetry.ram}</span>
                </div>

                {/* XP tracker */}
                {xp > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#39ff14]">BUG DEFENDER XP:</span>
                      <span className="text-[#39ff14] font-bold">{xp}</span>
                    </div>
                    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-[#39ff14] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((xp / 20000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Quick game launch */}
                <button
                  onClick={() => { onOpenGame(); }}
                  className="w-full flex items-center gap-2 px-3 py-2 border border-[#39ff14]/30 bg-[#39ff14]/5 hover:bg-[#39ff14]/10 text-[#39ff14] text-[10px] font-mono-term rounded transition-all cursor-pointer"
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  LAUNCH BUG DEFENDER (Type: 'game')
                </button>
              </div>
            </div>

            <div className="hidden md:block pt-4 border-t border-slate-800 text-[10px] text-slate-500 leading-4">
              <span>LOCATION: HYDERABAD, IN</span><br />
              <span>TIME_ZONE: GMT +05:30</span><br />
              <span>LOG_CHAN: ENCRYPTED_SSL</span>
            </div>
          </div>

          {/* Right panel: Terminal Prompt Console */}
          <div className="flex-1 flex flex-col p-4 bg-black/60">
            {/* Logs display */}
            <div className="flex-1 overflow-y-auto mb-2 pr-2 text-xs space-y-1.5 scrollbar-thin select-text">
              {terminalLogs.map((log, index) => {
                if (!log) return null;
                return (
                  <div key={index} className="flex gap-2 items-start py-0.5">
                    {log.type === "input" ? (
                      <>
                        <span className="text-[#00f0ff] shrink-0 font-bold">yashwanth@cmd:~$</span>
                        <span className="text-white tracking-wide">{log.text}</span>
                      </>
                    ) : (
                      <>
                        <span className={`shrink-0 font-semibold ${
                          log.type === "success" ? "text-[#39ff14]" : 
                          log.type === "error" ? "text-[#ef4444]" : 
                          log.type === "warning" ? "text-[#ffb000]" : 
                          "text-slate-400"
                        }`}>
                          {log.type === "success" ? "[SUCCESS]" : 
                           log.type === "error" ? "[ERROR]" : 
                           log.type === "warning" ? "[WARNING]" : 
                           "[SYS]"}
                        </span>
                        <span className={`tracking-wide whitespace-pre-wrap ${
                          log.type === "success" ? "text-[#39ff14]" : 
                          log.type === "error" ? "text-[#ef4444]" : 
                          log.type === "warning" ? "text-[#ffb000]" : 
                          "text-slate-300"
                        }`}>
                          {log.text}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
              <div ref={logsEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 border-t border-slate-800 pt-2 shrink-0">
              <span className="text-[#00f0ff] font-bold text-xs shrink-0 select-none">yashwanth@cmd:~$</span>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                disabled={isAgentRunning}
                className="flex-1 bg-transparent border-0 outline-none text-white text-xs font-mono-term tracking-wide placeholder-slate-600 disabled:opacity-50 disabled:text-slate-500"
                placeholder={isAgentRunning ? "[A.I.D.A. AGENT OPERATING - STANDBY]..." : "Enter shell command (e.g. 'help', 'skills', 'matrix')..."}
                autoComplete="off"
                spellCheck={false}
              />
              <button 
                type="submit" 
                disabled={isAgentRunning}
                className={`px-3 py-1 border text-[10px] rounded transition-all cursor-pointer ${
                  isAgentRunning 
                    ? "border-slate-850 text-slate-600 cursor-not-allowed" 
                    : "border-[#00f0ff]/30 text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/10"
                }`}
              >
                {isAgentRunning ? "BUSY" : "EXECUTE"}
              </button>
            </form>
          </div>

          {/* Close console arrow button */}
          <button
            onClick={() => {
              setIsOpen(false);
              audio.playClick();
            }}
            className="absolute top-2 right-4 text-slate-500 hover:text-[#00f0ff] text-xs transition-colors cursor-pointer"
            title="Minimize Panel"
          >
            [ MINIMIZE HUD ]
          </button>
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { X, Gamepad2, Shield, Zap, Trophy } from "lucide-react";

interface BugDefenderProps {
  onClose: () => void;
  onAddXP: (amount: number) => void;
}

interface Bug {
  x: number;
  y: number;
  speed: number;
  hp: number;
  maxHp: number;
  type: "basic" | "fast" | "heavy";
  color: string;
}

interface Bullet {
  x: number;
  y: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

type GameState = "idle" | "playing" | "gameover";

const CANVAS_W = 700;
const CANVAS_H = 420;
const PLAYER_W = 42;
const PLAYER_H = 24;
const BULLET_W = 4;
const BULLET_H = 14;
const BUG_SIZE = 22;

const BUG_CONFIGS = {
  basic: { hp: 1, speed: 1.2, color: "#ef4444", xp: 10 },
  fast:  { hp: 1, speed: 2.4, color: "#ffb000", xp: 15 },
  heavy: { hp: 3, speed: 0.7, color: "#a855f7", xp: 25 },
};

export default function BugDefender({ onClose, onAddXP }: BugDefenderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>("idle");
  const playerXRef = useRef(CANVAS_W / 2);
  const keysRef = useRef<Record<string, boolean>>({});
  const bugsRef = useRef<Bug[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const waveRef = useRef(1);
  const shootCooldownRef = useRef(0);
  const spawnCooldownRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pendingXPRef = useRef(0);
  const frameRef = useRef(0);

  const [displayScore, setDisplayScore] = useState(0);
  const [displayLives, setDisplayLives] = useState(3);
  const [displayWave, setDisplayWave] = useState(1);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [finalScore, setFinalScore] = useState(0);

  // Flush pending XP safely via useEffect
  const [xpToAdd, setXpToAdd] = useState(0);
  useEffect(() => {
    if (xpToAdd > 0) {
      onAddXP(xpToAdd);
      setXpToAdd(0);
    }
  }, [xpToAdd, onAddXP]);

  const spawnBug = useCallback(() => {
    const wave = waveRef.current;
    const roll = Math.random();
    let type: "basic" | "fast" | "heavy" = "basic";
    if (wave >= 3 && roll < 0.2) type = "heavy";
    else if (wave >= 2 && roll < 0.45) type = "fast";

    const cfg = BUG_CONFIGS[type];
    bugsRef.current.push({
      x: Math.random() * (CANVAS_W - BUG_SIZE * 2) + BUG_SIZE,
      y: -BUG_SIZE,
      speed: cfg.speed + wave * 0.15,
      hp: cfg.hp,
      maxHp: cfg.hp,
      type,
      color: cfg.color,
    });
  }, []);

  const spawnParticles = useCallback((x: number, y: number, color: string, count = 8) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 1.5 + Math.random() * 2.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        color,
        size: 2 + Math.random() * 3,
      });
    }
  }, []);

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  const drawGame = useCallback((ctx: CanvasRenderingContext2D) => {
    const W = CANVAS_W;
    const H = CANVAS_H;
    const px = playerXRef.current;
    frameRef.current++;

    // Background
    ctx.fillStyle = "#07070a";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(0,240,255,0.04)";
    ctx.lineWidth = 1;
    for (let gx = 0; gx < W; gx += 40) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += 40) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
    }

    // Scanline
    const scanY = (frameRef.current * 1.5) % H;
    const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
    scanGrad.addColorStop(0, "rgba(0,240,255,0)");
    scanGrad.addColorStop(0.5, "rgba(0,240,255,0.04)");
    scanGrad.addColorStop(1, "rgba(0,240,255,0)");
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 20, W, 40);

    // Player ship
    ctx.save();
    ctx.translate(px, H - 40);
    // Glow
    ctx.shadowBlur = 18;
    ctx.shadowColor = "#00f0ff";
    // Body
    ctx.fillStyle = "#00f0ff";
    ctx.beginPath();
    ctx.moveTo(0, -PLAYER_H / 2);
    ctx.lineTo(PLAYER_W / 2, PLAYER_H / 2);
    ctx.lineTo(-PLAYER_W / 2, PLAYER_H / 2);
    ctx.closePath();
    ctx.fill();
    // Cockpit
    ctx.fillStyle = "#060610";
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    // Wings
    ctx.fillStyle = "rgba(0,240,255,0.5)";
    ctx.beginPath();
    ctx.moveTo(-PLAYER_W / 2, PLAYER_H / 2);
    ctx.lineTo(-PLAYER_W / 2 - 8, PLAYER_H / 2 + 6);
    ctx.lineTo(-PLAYER_W / 2 + 4, PLAYER_H / 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(PLAYER_W / 2, PLAYER_H / 2);
    ctx.lineTo(PLAYER_W / 2 + 8, PLAYER_H / 2 + 6);
    ctx.lineTo(PLAYER_W / 2 - 4, PLAYER_H / 2);
    ctx.fill();
    // Engine glow flicker
    const flicker = 0.6 + Math.sin(frameRef.current * 0.3) * 0.4;
    ctx.fillStyle = `rgba(168,85,247,${flicker})`;
    ctx.beginPath();
    ctx.arc(-8, PLAYER_H / 2 + 2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(8, PLAYER_H / 2 + 2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Bullets
    bulletsRef.current.forEach((b) => {
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#a855f7";
      ctx.fillStyle = "#c084fc";
      ctx.fillRect(b.x - BULLET_W / 2, b.y - BULLET_H / 2, BULLET_W, BULLET_H);
      ctx.shadowBlur = 0;
      ctx.restore();
    });

    // Bugs
    bugsRef.current.forEach((bug) => {
      ctx.save();
      ctx.translate(bug.x, bug.y);
      ctx.shadowBlur = 14;
      ctx.shadowColor = bug.color;

      // Bug body
      ctx.fillStyle = bug.color;
      ctx.beginPath();
      ctx.arc(0, 0, BUG_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();

      // Bug "eye"
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.beginPath();
      ctx.arc(0, 0, BUG_SIZE / 4, 0, Math.PI * 2);
      ctx.fill();

      // Bug "X" icon in center
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 1.5;
      const s = 4;
      ctx.beginPath();
      ctx.moveTo(-s, -s); ctx.lineTo(s, s);
      ctx.moveTo(s, -s); ctx.lineTo(-s, s);
      ctx.stroke();

      // HP bar for heavy bugs
      if (bug.maxHp > 1) {
        const barW = BUG_SIZE + 4;
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(-barW / 2, -BUG_SIZE / 2 - 7, barW, 4);
        ctx.fillStyle = bug.color;
        ctx.fillRect(-barW / 2, -BUG_SIZE / 2 - 7, barW * (bug.hp / bug.maxHp), 4);
      }

      ctx.shadowBlur = 0;
      ctx.restore();
    });

    // Particles
    particlesRef.current.forEach((p) => {
      const alpha = p.life / p.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    });

    // HUD bar
    ctx.fillStyle = "rgba(6,6,10,0.8)";
    ctx.fillRect(0, 0, W, 36);
    ctx.strokeStyle = "rgba(0,240,255,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 36); ctx.lineTo(W, 36); ctx.stroke();

    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#00f0ff";
    ctx.fillText(`SCORE: ${scoreRef.current}`, 16, 22);
    ctx.fillStyle = "#a855f7";
    ctx.fillText(`WAVE: ${waveRef.current}`, 180, 22);
    ctx.fillStyle = "#ef4444";
    ctx.fillText(`LIVES: ${"♥ ".repeat(livesRef.current).trim()}`, W / 2 - 40, 22);
    ctx.fillStyle = "#ffb000";
    ctx.fillText(`[←/→] MOVE  [SPACE] FIRE`, W - 220, 22);
  }, []);

  const gameLoop = useCallback(() => {
    if (stateRef.current !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const H = CANVAS_H;
    const W = CANVAS_W;

    // Move player
    const speed = 5;
    if (keysRef.current["ArrowLeft"] || keysRef.current["a"] || keysRef.current["A"]) {
      playerXRef.current = Math.max(PLAYER_W / 2, playerXRef.current - speed);
    }
    if (keysRef.current["ArrowRight"] || keysRef.current["d"] || keysRef.current["D"]) {
      playerXRef.current = Math.min(W - PLAYER_W / 2, playerXRef.current + speed);
    }

    // Auto-shoot
    if (shootCooldownRef.current <= 0) {
      bulletsRef.current.push({
        x: playerXRef.current,
        y: H - 40 - PLAYER_H / 2,
        speed: 9,
      });
      shootCooldownRef.current = keysRef.current[" "] ? 8 : 18;
    } else {
      shootCooldownRef.current--;
    }

    // Move bullets
    bulletsRef.current = bulletsRef.current
      .map((b) => ({ ...b, y: b.y - b.speed }))
      .filter((b) => b.y > -BULLET_H);

    // Spawn bugs
    spawnCooldownRef.current--;
    if (spawnCooldownRef.current <= 0) {
      spawnBug();
      const base = Math.max(30, 90 - waveRef.current * 8);
      spawnCooldownRef.current = base + Math.floor(Math.random() * 30);
    }

    // Move bugs
    let hit = false;
    bugsRef.current = bugsRef.current
      .map((bug) => ({ ...bug, y: bug.y + bug.speed }))
      .filter((bug) => {
        if (bug.y > H - 30) {
          livesRef.current = Math.max(0, livesRef.current - 1);
          spawnParticles(bug.x, H - 30, bug.color, 5);
          setDisplayLives(livesRef.current);
          hit = true;
          return false;
        }
        return true;
      });

    // Move particles
    particlesRef.current = particlesRef.current
      .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, life: p.life - 0.03 }))
      .filter((p) => p.life > 0);

    // Bullet-bug collision
    const bulletsToRemove = new Set<number>();
    const bugsToRemove = new Set<number>();
    let xpGained = 0;

    for (let bi = 0; bi < bulletsRef.current.length; bi++) {
      const bullet = bulletsRef.current[bi];
      for (let gi = 0; gi < bugsRef.current.length; gi++) {
        const bug = bugsRef.current[gi];
        const dx = bullet.x - bug.x;
        const dy = bullet.y - bug.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < BUG_SIZE / 2 + BULLET_W) {
          bulletsToRemove.add(bi);
          bug.hp--;
          spawnParticles(bug.x, bug.y, bug.color, 4);
          if (bug.hp <= 0) {
            bugsToRemove.add(gi);
            const baseXP = BUG_CONFIGS[bug.type].xp;
            xpGained += baseXP;
            scoreRef.current += baseXP;
            setDisplayScore(scoreRef.current);
            spawnParticles(bug.x, bug.y, bug.color, 10);
          }
        }
      }
    }

    if (xpGained > 0) {
      pendingXPRef.current += xpGained;
      setXpToAdd((prev) => prev + xpGained);
    }

    bulletsRef.current = bulletsRef.current.filter((_, i) => !bulletsToRemove.has(i));
    bugsRef.current = bugsRef.current.filter((_, i) => !bugsToRemove.has(i));

    // Wave progression
    if (scoreRef.current >= waveRef.current * 200) {
      waveRef.current++;
      setDisplayWave(waveRef.current);
    }

    // Game over
    if (livesRef.current <= 0) {
      stateRef.current = "gameover";
      setGameState("gameover");
      setFinalScore(scoreRef.current);
      drawGame(ctx);
      return;
    }

    drawGame(ctx);
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [drawGame, spawnBug, spawnParticles]);

  const startGame = useCallback(() => {
    playerXRef.current = CANVAS_W / 2;
    bugsRef.current = [];
    bulletsRef.current = [];
    particlesRef.current = [];
    scoreRef.current = 0;
    livesRef.current = 3;
    waveRef.current = 1;
    shootCooldownRef.current = 0;
    spawnCooldownRef.current = 40;
    frameRef.current = 0;
    pendingXPRef.current = 0;

    setDisplayScore(0);
    setDisplayLives(3);
    setDisplayWave(1);
    stateRef.current = "playing";
    setGameState("playing");

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      keysRef.current[e.key] = e.type === "keydown";
      if (e.key === " ") e.preventDefault();
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKey);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Draw idle screen
  useEffect(() => {
    if (gameState === "idle") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#07070a";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Grid
      ctx.strokeStyle = "rgba(0,240,255,0.05)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < CANVAS_W; gx += 40) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, CANVAS_H); ctx.stroke();
      }
      for (let gy = 0; gy < CANVAS_H; gy += 40) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(CANVAS_W, gy); ctx.stroke();
      }

      ctx.textAlign = "center";
      ctx.font = "bold 28px 'Orbitron', sans-serif";
      ctx.fillStyle = "#00f0ff";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#00f0ff";
      ctx.fillText("BUG DEFENDER", CANVAS_W / 2, CANVAS_H / 2 - 40);
      ctx.shadowBlur = 0;

      ctx.font = "13px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#a855f7";
      ctx.fillText("DESTROY INCOMING MALWARE BUGS — EARN XP", CANVAS_W / 2, CANVAS_H / 2 - 6);

      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#64748b";
      ctx.fillText("[←/→ or A/D] MOVE  ·  [SPACE] RAPID FIRE  ·  AUTO-FIRES", CANVAS_W / 2, CANVAS_H / 2 + 20);

      ctx.font = "bold 12px 'Orbitron', sans-serif";
      ctx.fillStyle = "#ffb000";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#ffb000";
      ctx.fillText("[ CLICK START TO LAUNCH ]", CANVAS_W / 2, CANVAS_H / 2 + 56);
      ctx.shadowBlur = 0;
      ctx.textAlign = "left";
    }
  }, [gameState]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl border border-[#00f0ff]/30 bg-[#07070a] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#00f0ff]/20 bg-black/50">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-5 h-5 text-[#00f0ff]" />
            <span className="font-display font-bold text-sm text-white tracking-widest">BUG DEFENDER</span>
            <span className="text-[10px] font-mono-term text-[#00f0ff]/60 border border-[#00f0ff]/20 px-2 py-0.5 rounded">ARCADE MODE</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-4 font-mono-term text-xs">
              <span className="text-[#00f0ff]">SCORE: <span className="text-white font-bold">{displayScore}</span></span>
              <span className="text-[#a855f7]">WAVE: <span className="text-white font-bold">{displayWave}</span></span>
              <span className="text-[#ef4444]">LIVES: <span className="text-white font-bold">{displayLives}</span></span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="block w-full"
            style={{ imageRendering: "pixelated" }}
          />

          {/* Game Over overlay */}
          {gameState === "gameover" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
              <Trophy className="w-12 h-12 text-[#ffb000] mb-3 animate-bounce" />
              <h2 className="text-2xl font-display font-black text-white mb-1 tracking-widest">GAME OVER</h2>
              <p className="text-sm font-mono-term text-slate-400 mb-2">FINAL SCORE: <span className="text-[#00f0ff] font-bold">{finalScore}</span></p>
              <p className="text-xs font-mono-term text-[#39ff14] mb-6">+{finalScore} XP EARNED AND ADDED TO PROFILE</p>
              <button
                onClick={startGame}
                className="px-6 py-3 border border-[#00f0ff] bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-white font-display tracking-widest text-xs rounded transition-all cursor-pointer"
              >
                [ RESTART MISSION ]
              </button>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[#00f0ff]/10 bg-black/50">
          <div className="flex items-center gap-3 text-[10px] font-mono-term text-slate-500">
            <Shield className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>BASIC=10XP · FAST=15XP · HEAVY=25XP · XP ADDS TO YOUR PROFILE</span>
          </div>

          <div className="flex gap-3">
            {(gameState === "idle" || gameState === "gameover") && (
              <button
                onClick={startGame}
                className="px-4 py-2 border border-[#00f0ff] bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-white font-display tracking-widest text-[10px] rounded transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Zap className="w-3 h-3" />
                {gameState === "gameover" ? "RESTART" : "START GAME"}
              </button>
            )}
            {gameState === "playing" && (
              <button
                onClick={() => {
                  stateRef.current = "gameover";
                  setGameState("gameover");
                  setFinalScore(scoreRef.current);
                  cancelAnimationFrame(rafRef.current);
                }}
                className="px-4 py-2 border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white font-display tracking-widest text-[10px] rounded transition-all cursor-pointer"
              >
                ABORT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

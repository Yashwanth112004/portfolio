"use client";

import React, { useEffect, useRef } from "react";

interface ParticleCanvasProps {
  matrixActive: boolean;
  agentModeActive: boolean;
}

export default function ParticleCanvas({ matrixActive, agentModeActive }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
        // Cyan, purple, or deep blue
        const colors = ["#00f0ff", "#a855f7", "#0066ff", "#ffffff"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        const speed = agentModeActive ? 2.5 : 1.0;
        this.x += this.vx * speed;
        this.y += this.vy * speed;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse displacement
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            // Push away gently
            const force = (120 - dist) / 120;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.shadowBlur = 6;
        c.shadowColor = this.color;
        c.fill();
        c.shadowBlur = 0; // reset shadow
      }
    }

    // Initialize particles
    const particleCount = Math.min(Math.floor((width * height) / 11000), 120);
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());

    // Matrix settings
    const matrixChars = "0101011001ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*+=:?<>".split("");
    const fontSize = 14;
    const columns = Math.floor(width / fontSize) + 1;
    const drops: number[] = Array.from({ length: columns }, () => Math.random() * -100);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Dynamic animation loop
    const animate = () => {
      if (!ctx) return;

      if (matrixActive) {
        // Fade current screen slightly to create rain tail trail
        ctx.fillStyle = "rgba(6, 6, 8, 0.08)";
        ctx.fillRect(0, 0, width, height);

        ctx.font = `bold ${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Glowing matrix green color
          ctx.fillStyle = "#39ff14";
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#39ff14";
          
          // Randomly render white highlights for matrix rain head
          if (Math.random() > 0.98) {
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = "#ffffff";
          }
          
          ctx.fillText(char, x, y);
          ctx.shadowBlur = 0; // reset

          // Reset drop back to top once it falls past height
          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i] += 0.85; // speed rate
        }
      } else {
        // Normal Starfield Particle Grid Mode
        ctx.clearRect(0, 0, width, height);

        // Draw connecting spiderweb lines
        ctx.lineWidth = agentModeActive ? 0.9 : 0.6;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.hypot(dx, dy);

            if (dist < 120) {
              const alpha = (120 - dist) / 120;
              ctx.strokeStyle = agentModeActive
                ? `rgba(168, 85, 247, ${alpha * 0.45})`
                : `rgba(0, 240, 255, ${alpha * 0.15})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw and update individual nodes
        particles.forEach((p) => {
          p.update();
          p.draw(ctx);
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Run animation
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [matrixActive, agentModeActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#060608]"
      style={{ mixBlendMode: matrixActive ? "lighten" : "normal" }}
    />
  );
}

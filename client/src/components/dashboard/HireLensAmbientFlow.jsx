import React, { useEffect, useRef } from 'react';

/**
 * HireLensAmbientFlow
 * Clearly Visible Intelligent Particle Network Background (#B8A1FF / #D8CCFF / Soft Gray)
 * 
 * Features:
 * - Full viewport coverage (behind header, logo, navigation, hero, and cards)
 * - Deep dark background (#080A14)
 * - Soft, moving neutral gray mist/fog with subtle violet tint behind the hero section ("Analyze before you apply.")
 * - Noticeably visible floating particles with smooth continuous movement
 * - Very thin connecting lines between nearby particles for an "intelligent particle network"
 * - Particles use light violet (#B8A1FF), soft lavender (#D8CCFF), and soft gray (#94A3B8)
 * - Occasional gentle soft violet ambient glow (never distracting or neon)
 * - pointer-events: none across all decorative layers
 * - Full prefers-reduced-motion support
 */
export const HireLensAmbientFlow = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool with balanced density for clearly visible intelligent network
    const particleDensity = Math.floor((width * height) / 14000);
    const PARTICLE_COUNT = Math.min(Math.max(particleDensity, 48), 95);

    // Light violet / soft lavender / subtle gray palette
    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const type = Math.random();
      let color = '#B8A1FF'; // 60% primary light violet
      let isViolet = true;

      if (type < 0.25) {
        color = '#D8CCFF'; // 25% secondary soft lavender
      } else if (type < 0.40) {
        color = '#CBD5E1'; // 15% subtle gray
        isViolet = false;
      }

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.26, // continuous, clearly visible yet slow
        vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.26 - 0.04, // smooth gentle upward drift
        radius: isViolet ? Math.random() * 1.6 + 1.1 : Math.random() * 1.3 + 0.8,
        baseAlpha: isViolet ? Math.random() * 0.45 + 0.30 : Math.random() * 0.30 + 0.18, // clearly visible
        color,
        fadeSpeed: 0.008 + Math.random() * 0.012,
        fadePhase: Math.random() * Math.PI * 2,
      };
    });

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const maxConnectDistance = 135;

      // 1. Thin, clearly visible intelligent network connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const connectAlpha = (1 - dist / maxConnectDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(184, 161, 255, 0.65)';
            ctx.globalAlpha = connectAlpha;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 2. Glowing particles with continuous floating movement and gentle opacity breathing
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Smooth edge wrap
          if (p.x < -15) p.x = width + 15;
          if (p.x > width + 15) p.x = -15;
          if (p.y < -15) p.y = height + 15;
          if (p.y > height + 15) p.y = -15;
        }

        const currentAlpha = p.baseAlpha * (0.80 + 0.20 * Math.sin(frame * p.fadeSpeed + p.fadePhase));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Soft violet glow
        ctx.shadowBlur = p.radius * 3;
        ctx.shadowColor = 'rgba(184, 161, 255, 0.5)';

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.12, Math.min(0.75, currentAlpha));
        ctx.fill();
        ctx.restore();
      }

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#080A14]"
      aria-hidden="true"
    >
      {/* 
        Soft moving gray mist / fog with subtle violet tint
        - Fog 1: Localized behind the hero area ("Analyze before you apply.") with slow left-to-right drift
        - Fog 2: Ambient soft violet depth
      */}
      <div className="hero-soft-fog-layer" />
      <div className="hero-violet-glow-orb" />
      <div className="bottom-ambient-graphite-fog" />

      {/* Lightweight 2D Particles & Intelligent Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default HireLensAmbientFlow;

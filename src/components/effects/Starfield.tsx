import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  speedA: number;
  speedB: number;
  phaseA: number;
  phaseB: number;
  driftX: number;
  driftY: number;
  depth: number; // 0 = dust, 1 = far, 2 = mid, 3 = bright foreground
  color: string;
  hasFlare: boolean;
}

const STAR_COLORS = [
  '#FFFFFF',
  '#F8FAFF',
  '#B8C9FF',
  '#CFE2FF',
  '#FFF1D0',
  '#F7E3B5',
];

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    const isMobile = width < 768;
    const totalStars = isMobile ? 380 : 1350;

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = window.scrollY;

    const stars: Star[] = Array.from({ length: totalStars }, (_, idx) => {
      const roll = Math.random();
      const depth = roll < 0.56 ? 0 : roll < 0.85 ? 1 : roll < 0.97 ? 2 : 3;

      const radius =
        depth === 0
          ? 0.5 + Math.random() * 0.4
          : depth === 1
          ? 0.8 + Math.random() * 0.5
          : depth === 2
          ? 1.2 + Math.random() * 0.6
          : 1.7 + Math.random() * 0.8;

      const baseAlpha =
        depth === 0
          ? 0.14 + Math.random() * 0.25
          : depth === 1
          ? 0.28 + Math.random() * 0.38
          : depth === 2
          ? 0.45 + Math.random() * 0.4
          : 0.75 + Math.random() * 0.25;

      const color =
        depth === 0
          ? STAR_COLORS[idx % 3]
          : STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseAlpha,
        speedA: 0.006 + Math.random() * 0.02,
        speedB: 0.011 + Math.random() * 0.027,
        phaseA: Math.random() * Math.PI * 2,
        phaseB: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.035 * (depth + 0.5),
        driftY: (Math.random() - 0.5) * 0.022 * (depth + 0.5),
        depth,
        color,
        hasFlare: depth === 3 && Math.random() > 0.45,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion || isMobile) return;
      mouse.targetX = (e.clientX / width - 0.5) * 34;
      mouse.targetY = (e.clientY / height - 0.5) * 34;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (!reducedMotion) {
          s.x += s.driftX;
          s.y += s.driftY;
          if (s.x < 0) s.x += width;
          if (s.x > width) s.x -= width;
          if (s.y < 0) s.y += height;
          if (s.y > height) s.y -= height;
        }

        const parallaxScale = 0.15 + s.depth * 0.26;
        const px = ((s.x - mouse.x * parallaxScale) % width + width) % width;
        const py =
          ((s.y - mouse.y * parallaxScale - scrollY * (0.015 + s.depth * 0.022)) %
            height +
            height) %
          height;

        // Dual-wave organic scintillation
        const twinkleWave =
          0.6 * Math.sin(frame * s.speedA + s.phaseA) +
          0.4 * Math.sin(frame * s.speedB + s.phaseB);
        const alpha = reducedMotion
          ? s.baseAlpha
          : Math.max(0.05, Math.min(1, s.baseAlpha * (0.72 + 0.28 * twinkleWave)));

        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;

        // Core star pinpoint
        ctx.beginPath();
        ctx.arc(px, py, s.radius, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo + delicate 4-point diffraction flare for hero stars
        if (s.depth === 3) {
          ctx.globalAlpha = alpha * 0.22;
          ctx.beginPath();
          ctx.arc(px, py, s.radius * 3.1, 0, Math.PI * 2);
          ctx.fill();

          if (s.hasFlare) {
            const flareLen = s.radius * (3.8 + twinkleWave * 0.7);
            ctx.globalAlpha = alpha * 0.4;
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(px - flareLen, py);
            ctx.lineTo(px + flareLen, py);
            ctx.moveTo(px, py - flareLen);
            ctx.lineTo(px, py + flareLen);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

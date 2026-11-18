import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  thickness: number;
  opacity: number;
  life: number;
  maxLife: number;
  midColor: string;
  tailColor: string;
}

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let spawnTimeoutId = 0;
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
    const maxConcurrent = isMobile ? 1 : 2;
    const activeStars: ShootingStar[] = [];
    const embers: EmberParticle[] = [];

    const spawnShootingStar = () => {
      if (activeStars.length < maxConcurrent) {
        const fromRight = Math.random() > 0.3;
        const startX = fromRight
          ? width * (0.35 + Math.random() * 0.65)
          : width * (0.05 + Math.random() * 0.45);
        const startY = height * (-0.05 + Math.random() * 0.42);

        const angle = fromRight
          ? Math.PI * (0.71 + Math.random() * 0.14)
          : Math.PI * (0.15 + Math.random() * 0.14);

        const isLarge = Math.random() > 0.65;
        const speed = (isMobile ? 9 : 11) + Math.random() * 7;
        const icyBlue = Math.random() > 0.4;

        activeStars.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length: isLarge ? 170 + Math.random() * 110 : 100 + Math.random() * 70,
          thickness: isLarge ? 2.4 : 1.4,
          opacity: isLarge ? 0.96 : 0.82,
          life: 0,
          maxLife: isLarge ? 65 + Math.random() * 25 : 48 + Math.random() * 20,
          midColor: icyBlue ? '184, 201, 255' : '168, 155, 255',
          tailColor: '116, 101, 201',
        });
      }

      // Randomized natural interval (2.2s - 6.2s on desktop, 3.8s - 8.0s on mobile)
      const nextDelay = isMobile
        ? 3800 + Math.random() * 4200
        : 2200 + Math.random() * 4000;
      spawnTimeoutId = window.setTimeout(spawnShootingStar, nextDelay);
    };

    // First shooting star appears naturally shortly after landing
    spawnTimeoutId = window.setTimeout(spawnShootingStar, 1100);
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & draw shooting stars
      for (let i = activeStars.length - 1; i >= 0; i--) {
        const star = activeStars[i];
        star.life++;

        // Smooth fade-in and fade-out envelope
        const progress = star.life / star.maxLife;
        const envelope =
          progress < 0.15
            ? progress / 0.15
            : progress > 0.55
            ? Math.max(0, (1 - progress) / 0.45)
            : 1;
        const currentAlpha = star.opacity * envelope;

        const mag = Math.hypot(star.vx, star.vy) || 1;
        const ux = star.vx / mag;
        const uy = star.vy / mag;
        const tailX = star.x - ux * star.length;
        const tailY = star.y - uy * star.length;

        // Luminous multi-stop trail (white -> icy blue -> soft purple -> transparent)
        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
        gradient.addColorStop(0.18, `rgba(${star.midColor}, ${currentAlpha * 0.85})`);
        gradient.addColorStop(0.55, `rgba(${star.tailColor}, ${currentAlpha * 0.38})`);
        gradient.addColorStop(1, `rgba(${star.tailColor}, 0)`);

        ctx.save();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Outer soft bloom around head
        const bloom = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.thickness * 5.5
        );
        bloom.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.9})`);
        bloom.addColorStop(0.35, `rgba(${star.midColor}, ${currentAlpha * 0.45})`);
        bloom.addColorStop(1, `rgba(${star.tailColor}, 0)`);

        ctx.fillStyle = bloom;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.thickness * 5.5, 0, Math.PI * 2);
        ctx.fill();

        // Bright pinpoint head
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.thickness * 0.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Shed subtle stardust embers along trail
        if (!isMobile && Math.random() < 0.45 && embers.length < 40) {
          embers.push({
            x: star.x - ux * (4 + Math.random() * 14),
            y: star.y - uy * (4 + Math.random() * 14),
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: 0.6 + Math.random() * 0.9,
            alpha: currentAlpha * 0.7,
            color: star.midColor,
          });
        }

        star.x += star.vx;
        star.y += star.vy;

        if (
          star.life >= star.maxLife ||
          star.x < -300 ||
          star.x > width + 300 ||
          star.y > height + 300
        ) {
          activeStars.splice(i, 1);
        }
      }

      // Update & draw fading stardust embers
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.alpha -= 0.025;

        if (e.alpha <= 0) {
          embers.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${e.color}, ${e.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.clearTimeout(spawnTimeoutId);
      window.removeEventListener('resize', resizeCanvas);
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

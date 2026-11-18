import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface PlanetConfig {
  id: string;
  positionClass: string;
  sizeClass: string;
  floatClass: string;
  depth: number;
  sphereGradient: string;
  rimShadow: string;
  outerGlow: string;
  hasRing?: boolean;
  ringColor?: string;
  hasCraters?: boolean;
}

const HERO_PLANETS: PlanetConfig[] = [
  {
    id: 'planet-indigo-ringed',
    positionClass: 'top-[13%] left-[5%] sm:left-[9%]',
    sizeClass: 'w-16 h-16 sm:w-24 sm:h-24',
    floatClass: 'animate-planet-a',
    depth: 26,
    sphereGradient:
      'radial-gradient(circle at 28% 26%, #9E95F5 0%, #5542B8 38%, #1C174A 74%, #060512 100%)',
    rimShadow:
      'inset -14px -16px 26px rgba(4, 4, 14, 0.92), inset 4px 4px 12px rgba(184, 201, 255, 0.45)',
    outerGlow: '0 0 42px rgba(116, 101, 201, 0.32)',
    hasRing: true,
    ringColor: 'rgba(184, 201, 255, 0.28)',
  },
  {
    id: 'planet-icy-moon',
    positionClass: 'top-[15%] right-[6%] sm:right-[11%]',
    sizeClass: 'w-12 h-12 sm:w-18 sm:h-18',
    floatClass: 'animate-planet-b',
    depth: 18,
    sphereGradient:
      'radial-gradient(circle at 30% 28%, #CFE8FF 0%, #4E86B8 36%, #162B4E 72%, #050712 100%)',
    rimShadow:
      'inset -10px -12px 20px rgba(4, 6, 16, 0.9), inset 3px 3px 10px rgba(207, 232, 255, 0.55)',
    outerGlow: '0 0 34px rgba(78, 168, 222, 0.28)',
    hasCraters: true,
  },
  {
    id: 'planet-distant-gold',
    positionClass: 'hidden sm:block top-[54%] left-[5%] lg:left-[8%]',
    sizeClass: 'w-10 h-10 lg:w-12 lg:h-12',
    floatClass: 'animate-planet-b',
    depth: 12,
    sphereGradient:
      'radial-gradient(circle at 26% 28%, #FFF0CC 0%, #B8935A 40%, #3A2C1E 75%, #070610 100%)',
    rimShadow:
      'inset -8px -9px 14px rgba(5, 5, 12, 0.92), inset 2px 2px 7px rgba(255, 240, 204, 0.5)',
    outerGlow: '0 0 24px rgba(247, 227, 181, 0.22)',
  },
  {
    id: 'planet-magenta-nebula',
    positionClass: 'bottom-[12%] left-[8%] sm:left-[14%]',
    sizeClass: 'w-14 h-14 sm:w-22 sm:h-22',
    floatClass: 'animate-planet-a',
    depth: 22,
    sphereGradient:
      'radial-gradient(circle at 72% 28%, #E49CE0 0%, #8A3F9B 38%, #2B1345 75%, #060512 100%)',
    rimShadow:
      'inset 14px -14px 24px rgba(5, 5, 14, 0.92), inset -3px 3px 10px rgba(240, 180, 236, 0.4)',
    outerGlow: '0 0 38px rgba(164, 58, 148, 0.28)',
  },
  {
    id: 'planet-cyan-giant',
    positionClass: 'bottom-[13%] right-[6%] sm:right-[12%]',
    sizeClass: 'w-20 h-20 sm:w-28 sm:h-28',
    floatClass: 'animate-planet-b',
    depth: 30,
    sphereGradient:
      'radial-gradient(circle at 26% 26%, #A6E8EE 0%, #366C9E 36%, #172052 72%, #050510 100%)',
    rimShadow:
      'inset -16px -18px 30px rgba(4, 5, 14, 0.94), inset 4px 4px 12px rgba(166, 232, 238, 0.48)',
    outerGlow: '0 0 50px rgba(54, 148, 176, 0.26)',
    hasRing: true,
    ringColor: 'rgba(166, 232, 238, 0.24)',
  },
];

export default function HeroSpaceBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || window.innerWidth < 768) return;

    let rafId = 0;
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX / window.innerWidth - 0.5;
      mouse.targetY = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      HERO_PLANETS.forEach((planet, idx) => {
        const el = layerRefs.current[idx];
        if (!el) return;
        const offsetX = -mouse.x * planet.depth;
        const offsetY = -mouse.y * planet.depth;
        el.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
    >
      {/* Hero Extra Nebula Accent Glows */}
      <div
        className="absolute top-[20%] left-[22%] w-[440px] h-[340px] rounded-full opacity-30 blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(116, 101, 201, 0.45) 0%, transparent 72%)',
        }}
      />
      <div
        className="absolute bottom-[18%] right-[20%] w-[420px] h-[320px] rounded-full opacity-25 blur-[95px]"
        style={{
          background:
            'radial-gradient(circle, rgba(36, 148, 176, 0.35) 0%, transparent 72%)',
        }}
      />

      {/* Realistic 3D-Styled Floating Planets */}
      {HERO_PLANETS.map((planet, idx) => (
        <div
          key={planet.id}
          ref={(el) => {
            layerRefs.current[idx] = el;
          }}
          className={`absolute ${planet.positionClass} will-change-transform`}
        >
          <div className={`relative ${planet.sizeClass} ${planet.floatClass}`}>
            {/* Planet Sphere */}
            <div
              className="w-full h-full rounded-full relative overflow-hidden"
              style={{
                background: planet.sphereGradient,
                boxShadow: `${planet.rimShadow}, ${planet.outerGlow}`,
              }}
            >
              {/* Subtle Surface Craters (for moon) */}
              {planet.hasCraters && (
                <>
                  <span className="absolute top-[28%] left-[32%] w-[16%] h-[16%] rounded-full bg-black/20 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6)]" />
                  <span className="absolute top-[52%] left-[48%] w-[22%] h-[22%] rounded-full bg-black/15 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)]" />
                  <span className="absolute top-[36%] left-[60%] w-[11%] h-[11%] rounded-full bg-black/20" />
                </>
              )}

              {/* Subtle Atmospheric Banding */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  background:
                    'repeating-linear-gradient(165deg, transparent 0px, transparent 6px, rgba(255,255,255,0.22) 8px, transparent 12px)',
                }}
              />
            </div>

            {/* Optional Tilted Planetary Ring */}
            {planet.hasRing && (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[165%] h-[42%] rounded-full -rotate-18 pointer-events-none"
                style={{
                  border: `1.5px solid ${planet.ringColor}`,
                  boxShadow: `0 0 12px ${planet.ringColor}`,
                }}
              />
            )}
          </div>
        </div>
      ))}

      {/* Subtle Dark Radial Readability Vignette Behind Center Hero Text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 58% 48% at 50% 50%, rgba(5, 5, 16, 0.72) 0%, rgba(5, 5, 16, 0.35) 55%, transparent 100%)',
        }}
      />
    </div>
  );
}

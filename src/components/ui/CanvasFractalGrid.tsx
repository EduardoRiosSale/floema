import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

interface GradientStop { color: string; position: number }
interface GradientType { stops: GradientStop[]; centerX: number; centerY: number }

interface CanvasFractalGridProps {
  dotSize?: number;
  dotSpacing?: number;
  dotOpacity?: number;
  waveIntensity?: number;
  waveRadius?: number;
  dotColor?: string;
  glowColor?: string;
  enableNoise?: boolean;
  noiseOpacity?: number;
  enableMouseGlow?: boolean;
  initialPerformance?: 'low' | 'medium' | 'high';
  gradients?: GradientType[];
  gradientAnimationDuration?: number;
  enableGradient?: boolean;
}

// ── Noise overlay ────────────────────────────────────────────────────────────

const NoiseSVG = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <filter id="fractal-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#fractal-noise)" />
  </svg>
));
NoiseSVG.displayName = 'NoiseSVG';

const NoiseOverlay: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div className="absolute inset-0 h-full w-full mix-blend-overlay" style={{ opacity }}>
    <NoiseSVG />
  </div>
);

// ── Performance hook ─────────────────────────────────────────────────────────

const usePerformance = (initial: 'low' | 'medium' | 'high' = 'medium') => {
  const [perf, setPerf] = useState(initial);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let id: number;
    const measure = (time: number) => {
      frameCount++;
      if (time - lastTime > 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)));
        frameCount = 0;
        lastTime = time;
      }
      id = requestAnimationFrame(measure);
    };
    id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (fps < 30 && perf !== 'low') setPerf('low');
    else if (fps >= 30 && fps < 50 && perf !== 'medium') setPerf('medium');
    else if (fps >= 50 && perf !== 'high') setPerf('high');
  }, [fps, perf]);

  return perf;
};

// ── Responsive hook ──────────────────────────────────────────────────────────

const useResponsive = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return { isMobile: size.width < 768, isTablet: size.width >= 768 && size.width < 1024 };
};

// ── Gradient ─────────────────────────────────────────────────────────────────

const Gradient = React.memo(({ gradients, animationDuration }: { gradients: GradientType[]; animationDuration: number }) => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      background: gradients.map(g =>
        `radial-gradient(circle at ${g.centerX}% ${g.centerY}%, ${g.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
      ),
      transition: { duration: animationDuration, repeat: Infinity, repeatType: 'reverse', ease: 'linear' },
    });
  }, [controls, gradients, animationDuration]);
  return <motion.div className="absolute inset-0 h-full w-full" animate={controls} />;
});
Gradient.displayName = 'Gradient';

// ── Dot Canvas ───────────────────────────────────────────────────────────────

const DotCanvas = React.memo(({
  dotSize, dotSpacing, dotOpacity, waveIntensity, waveRadius,
  dotColor, glowColor, performance: perf, mousePos,
}: {
  dotSize: number; dotSpacing: number; dotOpacity: number;
  waveIntensity: number; waveRadius: number;
  dotColor: string; glowColor: string;
  performance: 'low' | 'medium' | 'high';
  mousePos: { x: number; y: number };
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  const drawDots = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
    const skip = perf === 'low' ? 3 : perf === 'medium' ? 2 : 1;
    const cols = Math.ceil(width / dotSpacing);
    const rows = Math.ceil(height / dotSpacing);
    const centerX = mousePos.x * width;
    const centerY = mousePos.y * height;

    for (let i = 0; i < cols; i += skip) {
      for (let j = 0; j < rows; j += skip) {
        const x = i * dotSpacing;
        const y = j * dotSpacing;
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let dotX = x, dotY = y;

        if (dist < waveRadius) {
          const strength = Math.pow(1 - dist / waveRadius, 2);
          const angle = Math.atan2(dy, dx);
          const offset = Math.sin(dist * 0.05 - time * 0.005) * waveIntensity * strength;
          dotX += Math.cos(angle) * offset;
          dotY += Math.sin(angle) * offset;
          const glowRadius = dotSize * (1 + strength);
          const grad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, glowRadius);
          grad.addColorStop(0, glowColor.replace('1)', `${dotOpacity * (1 + strength)})`));
          grad.addColorStop(1, glowColor.replace('1)', '0)'));
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = dotColor.replace('1)', `${dotOpacity})`);
        }

        ctx.beginPath();
        ctx.arc(dotX, dotY, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [dotSize, dotSpacing, dotOpacity, waveIntensity, waveRadius, dotColor, glowColor, perf, mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    let lastTime = 0;
    const animate = (time: number) => {
      if (time - lastTime > 16) { drawDots(ctx, time); lastTime = time; }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener('resize', resize); if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [drawDots]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      // "screen" en fondo oscuro: los puntos claros se suman al negro → se ven brillantes
      style={{ mixBlendMode: 'screen', background: 'transparent' }}
    />
  );
});
DotCanvas.displayName = 'DotCanvas';

// ── Mouse Glow ───────────────────────────────────────────────────────────────

const MouseGlow = React.memo(({ glowColor, mousePos }: { glowColor: string; mousePos: { x: number; y: number } }) => (
  <>
    <div className="absolute w-40 h-40 rounded-full pointer-events-none" style={{
      background: `radial-gradient(circle, ${glowColor.replace('1)', '0.15)')} 0%, ${glowColor.replace('1)', '0)')} 70%)`,
      left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`,
      transform: 'translate(-50%, -50%)', filter: 'blur(10px)',
    }} />
    <div className="absolute w-20 h-20 rounded-full pointer-events-none" style={{
      background: `radial-gradient(circle, ${glowColor.replace('1)', '0.3)')} 0%, ${glowColor.replace('1)', '0)')} 70%)`,
      left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`,
      transform: 'translate(-50%, -50%)',
    }} />
  </>
));
MouseGlow.displayName = 'MouseGlow';

// ── Main component ────────────────────────────────────────────────────────────

export function CanvasFractalGrid({
  dotSize = 3,
  dotSpacing = 24,
  dotOpacity = 0.35,
  waveIntensity = 28,
  waveRadius = 220,
  dotColor = 'rgba(201, 169, 110, 1)',
  glowColor = 'rgba(201, 169, 110, 1)',
  enableNoise = true,
  noiseOpacity = 0.04,
  enableMouseGlow = true,
  initialPerformance = 'high',
  gradients,
  gradientAnimationDuration = 20,
  enableGradient = false,
}: CanvasFractalGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useResponsive();
  const perf = usePerformance(initialPerformance);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 1, height: 1 };
    setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const responsiveDotSize = useMemo(() => isMobile ? dotSize * 0.75 : isTablet ? dotSize * 0.9 : dotSize, [isMobile, isTablet, dotSize]);
  const responsiveDotSpacing = useMemo(() => isMobile ? dotSpacing * 1.5 : isTablet ? dotSpacing * 1.25 : dotSpacing, [isMobile, isTablet, dotSpacing]);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        key="fractal-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 overflow-hidden w-full h-full"
      >
        {enableGradient && gradients && (
          <Gradient gradients={gradients} animationDuration={gradientAnimationDuration} />
        )}
        <DotCanvas
          dotSize={responsiveDotSize}
          dotSpacing={responsiveDotSpacing}
          dotOpacity={dotOpacity}
          waveIntensity={waveIntensity}
          waveRadius={waveRadius}
          dotColor={dotColor}
          glowColor={glowColor}
          performance={perf}
          mousePos={mousePos}
        />
        {enableNoise && <NoiseOverlay opacity={noiseOpacity} />}
        {enableMouseGlow && <MouseGlow glowColor={glowColor} mousePos={mousePos} />}
      </motion.div>
    </AnimatePresence>
  );
}

export default React.memo(CanvasFractalGrid);

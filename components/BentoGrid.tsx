"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { motion, AnimatePresence, useTime, useTransform, MotionValue } from 'framer-motion';
import { Canvas } from "@react-three/fiber"; 
import { OrbitControls, useTexture } from "@react-three/drei"; 
import * as THREE from "three";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Link } from 'react-router-dom'; // <--- React Router DOM থেকে Link ইম্পোর্ট করা হলো

// ============================================================================
// 0. UTILS & SHARED COMPONENTS
// ============================================================================

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type DottedGlowBackgroundProps = {
  className?: string;
  gap?: number;
  radius?: number;
  color?: string;
  darkColor?: string;
  glowColor?: string;
  darkGlowColor?: string;
  colorLightVar?: string;
  colorDarkVar?: string;
  glowColorLightVar?: string;
  glowColorDarkVar?: string;
  opacity?: number;
  backgroundOpacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
};

const DottedGlowBackground = ({
  className,
  gap = 12,
  radius = 2,
  color = "rgba(0,0,0,0.7)",
  darkColor,
  glowColor = "rgba(0, 170, 255, 0.85)",
  darkGlowColor,
  colorLightVar,
  colorDarkVar,
  glowColorLightVar,
  glowColorDarkVar,
  opacity = 0.6,
  backgroundOpacity = 0,
  speedMin = 0.4,
  speedMax = 1.3,
  speedScale = 1,
}: DottedGlowBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [resolvedColor, setResolvedColor] = useState<string>(color);
  const [resolvedGlowColor, setResolvedGlowColor] = useState<string>(glowColor);

  const resolveCssVariable = (el: Element, variableName?: string): string | null => {
    if (!variableName) return null;
    const normalized = variableName.startsWith("--") ? variableName : `--${variableName}`;
    const fromEl = getComputedStyle(el as Element).getPropertyValue(normalized).trim();
    if (fromEl) return fromEl;
    const root = document.documentElement;
    const fromRoot = getComputedStyle(root).getPropertyValue(normalized).trim();
    return fromRoot || null;
  };

  const detectDarkMode = (): boolean => {
    if (typeof window === 'undefined') return false;
    const root = document.documentElement;
    if (root.classList.contains("dark")) return true;
    if (root.classList.contains("light")) return false;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  useEffect(() => {
    const container = containerRef.current ?? document.documentElement;
    const compute = () => {
      const isDark = detectDarkMode();
      let nextColor: string = color;
      let nextGlow: string = glowColor;

      if (isDark) {
        const varDot = resolveCssVariable(container, colorDarkVar);
        const varGlow = resolveCssVariable(container, glowColorDarkVar);
        nextColor = varDot || darkColor || nextColor;
        nextGlow = varGlow || darkGlowColor || nextGlow;
      } else {
        const varDot = resolveCssVariable(container, colorLightVar);
        const varGlow = resolveCssVariable(container, glowColorLightVar);
        nextColor = varDot || nextColor;
        nextGlow = varGlow || nextGlow;
      }
      setResolvedColor(nextColor);
      setResolvedGlowColor(nextGlow);
    };
    compute();
    const mql = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    const handleMql = () => compute();
    mql?.addEventListener?.("change", handleMql);
    const mo = new MutationObserver(() => compute());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    return () => {
      mql?.removeEventListener?.("change", handleMql);
      mo.disconnect();
    };
  }, [color, darkColor, glowColor, darkGlowColor, colorLightVar, colorDarkVar, glowColorLightVar, glowColorDarkVar]);

  useEffect(() => {
    const el = canvasRef.current;
    const container = containerRef.current;
    if (!el || !container) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stopped = false;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      el.width = Math.max(1, Math.floor(width * dpr));
      el.height = Math.max(1, Math.floor(height * dpr));
      el.style.width = `${Math.floor(width)}px`;
      el.style.height = `${Math.floor(height)}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    let dots: { x: number; y: number; phase: number; speed: number }[] = [];
    const regenDots = () => {
      dots = [];
      const { width, height } = container.getBoundingClientRect();
      const cols = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;
      const min = Math.min(speedMin, speedMax);
      const max = Math.max(speedMin, speedMax);
      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * gap + (j % 2 === 0 ? 0 : gap * 0.5);
          const y = j * gap;
          const phase = Math.random() * Math.PI * 2;
          const span = Math.max(max - min, 0);
          const speed = min + Math.random() * span;
          dots.push({ x, y, phase, speed });
        }
      }
    };
    
    regenDots();
    let last = performance.now();

    const draw = (now: number) => {
      if (stopped) return;
      last = now;
      const { width, height } = container.getBoundingClientRect();
      ctx.clearRect(0, 0, el.width, el.height);
      ctx.globalAlpha = opacity;

      if (backgroundOpacity > 0) {
        const grad = ctx.createRadialGradient(width * 0.5, height * 0.4, Math.min(width, height) * 0.1, width * 0.5, height * 0.5, Math.max(width, height) * 0.7);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, `rgba(0,0,0,${Math.min(Math.max(backgroundOpacity, 0), 1)})`);
        ctx.fillStyle = grad as unknown as CanvasGradient;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.save();
      ctx.fillStyle = resolvedColor;
      const time = (now / 1000) * Math.max(speedScale, 0);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const mod = (time * d.speed + d.phase) % 2;
        const lin = mod < 1 ? mod : 2 - mod;
        const a = 0.25 + 0.55 * lin;
        if (a > 0.6) {
          const glow = (a - 0.6) / 0.4;
          ctx.shadowColor = resolvedGlowColor;
          ctx.shadowBlur = 6 * glow;
        } else {
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = a * opacity;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      regenDots();
    };

    window.addEventListener("resize", handleResize);
    raf = requestAnimationFrame(draw);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
    };
  }, [gap, radius, resolvedColor, resolvedGlowColor, opacity, backgroundOpacity, speedMin, speedMax, speedScale]);

  return (
    <div ref={containerRef} className={className} style={{ position: "absolute", inset: 0 }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
};

// ============================================================================
// 1. GLOBE 3D LOGIC
// ============================================================================

const DEFAULT_EARTH_TEXTURE = "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const DEFAULT_BUMP_TEXTURE = "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";

function RotatingGlobe({ config }: { config: any }) {
  const [earthTexture, bumpTexture] = useTexture([config.textureUrl, config.bumpMapUrl]);

  useMemo(() => {
    if (earthTexture) { 
        earthTexture.colorSpace = THREE.SRGBColorSpace; 
        earthTexture.anisotropy = 16; 
    }
    if (bumpTexture) { 
        bumpTexture.anisotropy = 8; 
    }
  }, [earthTexture, bumpTexture]);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[config.radius, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={config.bumpScale * 0.05}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      {config.showAtmosphere && (
        <mesh scale={[1.1, 1.1, 1.1]}>
            <sphereGeometry args={[config.radius, 64, 64]} />
            <meshBasicMaterial color={config.atmosphereColor} transparent opacity={0.1} side={THREE.BackSide} />
        </mesh>
      )}
    </group>
  );
}

function Scene({ config }: { config: any }) {
  return (
    <>
      <ambientLight intensity={1.5} /> 
      <directionalLight position={[5, 5, 5]} intensity={3} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#4da6ff" />
      
      <RotatingGlobe config={config} />
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        autoRotate={true} 
        autoRotateSpeed={0.8} 
        minPolarAngle={Math.PI / 3} 
        maxPolarAngle={Math.PI / 1.5} 
      />
    </>
  );
}

const Globe3D = ({ className }: { className?: string }) => {
  const config = {
    radius: 2.8,
    textureUrl: DEFAULT_EARTH_TEXTURE,
    bumpMapUrl: DEFAULT_BUMP_TEXTURE,
    showAtmosphere: true,
    atmosphereColor: "#4da6ff",
    bumpScale: 1,
    ambientIntensity: 1,
  };

  return (
    <div className={cn("relative h-full w-full pointer-events-none", className)}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene config={config} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// ============================================================================
// 2. BENTO GRID COMPONENTS - (TIMEZONE DYNAMIC CLOCK)
// ============================================================================

const TIMEZONES: Record<string, string> = {
  IN: 'Asia/Kolkata',
  UK: 'Europe/London',
  US: 'America/New_York',
};

const Clock: React.FC<{ activeLocation: string }> = ({ activeLocation }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeZoneString = TIMEZONES[activeLocation] || 'Asia/Kolkata';
  const tzDateString = time.toLocaleString('en-US', { timeZone: timeZoneString });
  const tzDate = new Date(tzDateString);

  const seconds = tzDate.getSeconds();
  const minutes = tzDate.getMinutes();
  const hours = tzDate.getHours();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDegrees = (hours % 12 / 12) * 360 + (minutes / 60) * 30;

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center rounded-full bg-black border-[20px] border-white shadow-2xl z-30 box-border transition-all duration-500">
      <svg viewBox="0 0 200 200" className="w-full h-full bg-black rounded-full shadow-inner transition-transform duration-500">
        {[...Array(60)].map((_, i) => i % 5 !== 0 && (<line key={`min-${i}`} x1="100" y1="6" x2="100" y2="10" className="stroke-neutral-800" strokeWidth="1" transform={`rotate(${i * 6} 100 100)`} />))}
        {[...Array(12)].map((_, i) => (<line key={`hr-${i}`} x1="100" y1="6" x2="100" y2="16" className="stroke-white" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${i * 30} 100 100)`} />))}
        <text x="100" y="34" textAnchor="middle" className="fill-neutral-400 text-[12px] font-bold font-sans">12</text>
        <text x="100" y="178" textAnchor="middle" className="fill-neutral-400 text-[12px] font-bold font-sans">6</text>
        <text x="172" y="105" textAnchor="middle" className="fill-neutral-400 text-[12px] font-bold font-sans">3</text>
        <text x="28" y="105" textAnchor="middle" className="fill-neutral-400 text-[12px] font-bold font-sans">9</text>
        <g transform={`rotate(${hourDegrees} 100 100)`}><line x1="100" y1="100" x2="100" y2="50" className="stroke-white" strokeWidth="4" strokeLinecap="round" /></g>
        <g transform={`rotate(${minuteDegrees} 100 100)`}><line x1="100" y1="100" x2="100" y2="30" className="stroke-neutral-400" strokeWidth="3" strokeLinecap="round" /></g>
        <g transform={`rotate(${secondDegrees} 100 100)`}><line x1="100" y1="100" x2="100" y2="120" stroke="#a855f7" strokeWidth="2" /><line x1="100" y1="100" x2="100" y2="25" stroke="#a855f7" strokeWidth="1.5" /><circle cx="100" cy="100" r="3" fill="#000" stroke="#a855f7" strokeWidth="2" /></g>
      </svg>
      <div className="absolute bottom-16 text-[10px] font-bold text-neutral-500 uppercase tracking-widest bg-black/50 px-2 py-1 rounded-full backdrop-blur-md">
        {activeLocation} TIME
      </div>
    </div>
  );
};

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg"
];

interface CarouselItemProps { image: string; index: number; total: number; time: MotionValue<number>; }

const CarouselItem: React.FC<CarouselItemProps> = ({ image, index, total, time }) => {
  const GAP = 120; const DURATION = 25000;
  const progress = useTransform(time, (t: number) => (t % DURATION) / DURATION);
  const relativePos = useTransform(progress, (p: number) => {
    let pos = (index / total) - p; if (pos < -0.5) pos += 1; if (pos > 0.5) pos -= 1; return pos * total * GAP;
  });
  const y = useTransform(relativePos, (d: number) => Math.abs(d) * 0.25);
  const rotateZ = useTransform(relativePos, [-200, 200], [-15, 15]);
  const scale = useTransform(relativePos, (d: number) => Math.max(1 - Math.abs(d) / 800, 0.85));
  const zIndex = useTransform(relativePos, (d: number) => 100 - Math.abs(d));
  
  return (
    <motion.div style={{ x: relativePos, y, rotateZ, scale, zIndex, position: 'absolute', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} className="w-28 h-40 rounded-2xl overflow-hidden origin-bottom bg-white border-2 border-white">
      <img src={image} alt="" className="w-full h-full object-cover pointer-events-none" />
    </motion.div>
  );
};

const ArchCarousel = () => {
  const time = useTime(); 
  return (
    <div className="relative w-full h-56 flex items-center justify-center overflow-hidden perspective-1000">
      {images.map((img, i) => (<CarouselItem key={i} image={img} index={i} total={images.length} time={time} />))}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
    </div>
  );
};

const ROTATING_TEXTS = [
  "I sweat spacing, timing, and feedback — the tiny stuff.",
  "I strive to create digital experiences that feel organic and human, where every pixel has a purpose."
];

const TABS = [
  { id: 'motion', label: 'Motion', title: 'Micro-interactions', desc: 'Subtle movement that confirms intent.', activeClass: 'bg-purple-100 text-purple-600 border-purple-200', titleColor: 'text-black' },
  { id: 'type', label: 'Type', title: 'Typography', desc: 'Clean hierarchy and rhythm.', activeClass: 'bg-blue-100 text-blue-600 border-blue-200', titleColor: 'text-black' },
  { id: 'feedback', label: 'Feedback', title: 'Responsiveness', desc: 'Crisp response to every interaction.', activeClass: 'bg-green-100 text-green-600 border-green-200', titleColor: 'text-black' },
  { id: 'craft', label: 'Craft', title: 'Attention to detail', desc: 'Polish lives in the edges.', activeClass: 'bg-orange-100 text-orange-600 border-orange-200', titleColor: 'text-black' }
];

// ============================================================================
// 3. MAIN BENTO GRID COMPONENT
// ============================================================================

const BentoGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[3]); 
  const [textIndex, setTextIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  
  const [activeLocation, setActiveLocation] = useState('IN');

  useEffect(() => {
    const interval = setInterval(() => { setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length); }, 5000); 
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("souravlouha01@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans text-neutral-900 bg-white py-24 px-4">
      
      <div className="absolute inset-0 h-full w-full pointer-events-none">
        <div className="absolute inset-0 [background-size:20px_20px] [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]"></div>
        <div className="absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="relative z-20 max-w-7xl w-full mx-auto">
        
        <div className="hidden md:flex absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
           <Clock activeLocation={activeLocation} />
        </div>
        <div className="md:hidden flex justify-center mb-10">
           <Clock activeLocation={activeLocation} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-16 auto-rows-[450px]">

          {/* 1. Profile Card */}
          <div className="bg-white rounded-[3rem] p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-neutral-100">
             <DottedGlowBackground 
                className="pointer-events-none z-0"
                color="rgba(0,0,0,0.05)"
                glowColor="rgba(168, 85, 247, 0.4)"
                opacity={0.8}
                gap={15}
             />
             <div className="z-10 relative">
                 <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl md:text-5xl font-sans font-black text-black">Sourav</span>
                    <span className="text-4xl md:text-5xl font-serif italic font-normal text-neutral-400">Louha</span>
                 </div>
                 <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-4 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    West Bengal, IN
                 </p>
             </div>
             <div className="my-auto w-full relative z-10"><ArchCarousel /></div>
             
             {/* All Social Links Container */}
             <div className="flex gap-4 text-neutral-400 z-10 pt-2 relative">
                {/* LinkedIn Link */}
                <a href="https://www.linkedin.com/in/sourav-louha-703953249/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A66C2] cursor-pointer transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                {/* GitHub Link */}
                <a href="https://github.com/souravlouha" target="_blank" rel="noopener noreferrer" className="hover:text-black cursor-pointer transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                {/* Instagram Link */}
                <a href="https://www.instagram.com/souravlouha_s/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] cursor-pointer transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                {/* X / Twitter Link */}
                <a href="https://x.com/iamsouravn" target="_blank" rel="noopener noreferrer" className="hover:text-black cursor-pointer transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
             </div>
          </div>

          {/* 2. Philosophy Card */}
          <div className="md:col-span-2 bg-white rounded-[3rem] p-10 flex flex-col shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-neutral-100">
             <DottedGlowBackground 
                className="pointer-events-none z-0"
                color="rgba(0,0,0,0.05)"
                glowColor="rgba(59, 130, 246, 0.4)"
                opacity={0.8}
                gap={20}
             />
             <div className="flex justify-between items-start w-full mb-6 z-10 relative">
                <div className="flex items-center gap-2 border border-neutral-100 rounded-full px-4 py-2 bg-white/80 backdrop-blur-sm shadow-sm">
                   <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Detail-Driven UI</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Philosophy</span>
                    <span className="text-xl text-neutral-300">+</span>
                </div>
             </div>
             <div className="flex flex-row justify-between items-start h-full z-10 relative">
                 <div className="w-[60%] flex flex-col pt-2">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black leading-tight mb-4">Interfaces <br /> <span className="font-serif italic font-normal text-neutral-400">you can feel.</span></h2>
                    <div className="h-28 relative">
                      <AnimatePresence mode='wait'>
                        <motion.div key={textIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="absolute top-0 left-0 w-full">
                          <p className="text-[11px] text-neutral-400 leading-relaxed font-medium w-full pr-4">{ROTATING_TEXTS[textIndex]}</p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                 </div>
                 <div className="w-[35%] flex flex-col items-end text-right space-y-8 pt-2">
                     <div className="flex gap-2 flex-wrap justify-end">
                        {TABS.map((tab) => (
                          <button key={tab.id} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all duration-300 border ${activeTab.id === tab.id ? tab.activeClass : 'bg-neutral-50 border-neutral-100 text-neutral-500 hover:bg-neutral-100'}`}>{tab.label}</button>
                        ))}
                     </div>
                     <AnimatePresence mode='wait'>
                       <motion.div key={activeTab.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                         <h4 className={`text-sm font-bold mb-2 ${activeTab.titleColor}`}>{activeTab.title}</h4>
                         <p className="text-[10px] text-neutral-400 leading-relaxed max-w-[200px] ml-auto">{activeTab.desc}</p>
                       </motion.div>
                     </AnimatePresence>
                 </div>
             </div>
          </div>

          {/* 3. Timezone Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-white to-neutral-50 rounded-[3rem] p-12 relative overflow-hidden border border-neutral-100 min-h-[400px]">
             <DottedGlowBackground 
                className="pointer-events-none z-0"
                color="rgba(0,0,0,0.05)"
                glowColor="rgba(0, 170, 255, 0.5)"
                opacity={0.6}
                gap={25}
             />

             {/* Text */}
             <div className="relative z-10 w-full flex flex-col justify-start items-start -mt-6">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2 block">Available Globally</span>
                 <h2 className="text-1xl md:text-2xl font-bold leading-tight text-black tracking-tight">Adaptable across <br/> time zones</h2>
             </div>
             
             {/* Globe Component */}
             <div className="absolute -left-20 -bottom-32 w-[550px] h-[480px] z-0">
                 <Globe3D className="w-full h-full" />
             </div>

             {/* Interactive Badges (Buttons) */}
             <div className="absolute right-12 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-10">
                 
                 {/* UK Button */}
                 <button 
                   onClick={() => setActiveLocation('UK')}
                   className={`px-5 py-2.5 rounded-full flex gap-3 w-fit shadow-sm transition-all duration-300 border backdrop-blur-md cursor-pointer ${
                     activeLocation === 'UK' 
                     ? 'bg-blue-50/90 border-blue-200 scale-105 shadow-md' 
                     : 'bg-white/80 border-neutral-100 hover:bg-neutral-50'
                   }`}
                 >
                   <span className={`text-[10px] font-bold ${activeLocation === 'UK' ? 'text-blue-500' : 'text-neutral-400'}`}>GB</span> 
                   <span className={`text-xs font-bold ${activeLocation === 'UK' ? 'text-blue-900' : 'text-neutral-700'}`}>UK</span>
                 </button>

                 {/* India Button */}
                 <button 
                   onClick={() => setActiveLocation('IN')}
                   className={`px-5 py-2.5 rounded-full flex gap-3 w-fit shadow-sm transition-all duration-300 border backdrop-blur-md cursor-pointer ${
                     activeLocation === 'IN' 
                     ? 'bg-orange-50/90 border-orange-200 scale-105 shadow-md' 
                     : 'bg-white/80 border-neutral-100 hover:bg-neutral-50'
                   }`}
                 >
                   <span className={`text-[10px] font-bold ${activeLocation === 'IN' ? 'text-orange-500' : 'text-neutral-400'}`}>IN</span> 
                   <span className={`text-xs font-bold ${activeLocation === 'IN' ? 'text-orange-900' : 'text-neutral-700'}`}>India</span>
                 </button>

                 {/* US Button */}
                 <button 
                   onClick={() => setActiveLocation('US')}
                   className={`px-5 py-2.5 rounded-full flex gap-3 w-fit shadow-sm transition-all duration-300 border backdrop-blur-md cursor-pointer ${
                     activeLocation === 'US' 
                     ? 'bg-green-50/90 border-green-200 scale-105 shadow-md' 
                     : 'bg-white/80 border-neutral-100 hover:bg-neutral-50'
                   }`}
                 >
                   <span className={`text-[10px] font-bold ${activeLocation === 'US' ? 'text-green-600' : 'text-neutral-400'}`}>US</span> 
                   <span className={`text-xs font-bold ${activeLocation === 'US' ? 'text-green-900' : 'text-neutral-700'}`}>USA</span>
                 </button>

             </div>
          </div>

          {/* 4. Contact Card */}
          <div className="bg-white rounded-[3rem] p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-neutral-100">
             <DottedGlowBackground 
                className="pointer-events-none z-0"
                color="rgba(0,0,0,0.05)"
                glowColor="rgba(20, 184, 166, 0.4)"
                opacity={0.8}
                gap={15}
             />
             <div className="flex justify-between items-start z-10 relative">
               <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center"><div className="w-2 h-2 bg-neutral-900 rounded-full"></div></div>
               <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span><span className="text-[10px] font-bold uppercase text-green-700">Available for work</span></div>
             </div>
             <div className="mt-10 mb-auto z-10 relative">
                <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tight text-neutral-900 mb-2">Let's Build <br/> Something</h3>
                <p className="text-3xl font-serif italic text-neutral-400">that actually works.</p>
             </div>
             <div className="mt-10 space-y-6 z-10 relative">
               <div onClick={copyEmail} className="group cursor-pointer">
                  <div className="flex items-center gap-4 mb-2">
                     <div className="p-3 bg-neutral-50 rounded-xl group-hover:bg-neutral-100 transition-colors border border-neutral-100">
                        <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                     </div>
                     <span className="text-2xl font-serif italic text-neutral-900 transition-all duration-300">
                        {copied ? <span className="text-green-600 not-italic font-sans font-bold text-lg">Copied!</span> : "souravlouha01@gmail.com"}
                     </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold pl-14">Tap to copy email</p>
               </div>
               
               {/* Connect Now Button -> Opens Contact Page instead of Mail App */}
               <Link 
                 to="/contact" 
                 className="w-full py-5 px-8 bg-neutral-900 hover:bg-black text-white rounded-2xl flex items-center justify-between group transition-all shadow-sm cursor-pointer block text-center"
               >
                 <span className="text-xs font-bold tracking-widest uppercase">Connect Now</span>
                 <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" /></svg>
               </Link>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
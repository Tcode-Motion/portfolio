import React, { useRef, useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowLeft, ArrowRight, Github, Sparkles } from 'lucide-react';
import { useSound } from '@/core/audio/SoundManager';
import { getAllProjects } from '@/core/content/contentLoader';
import type { ProjectData } from '@/core/content/types';

const PROJECT_ACCENTS: Record<string, string> = {
  'techscript': '#c4ff36',
  'aurora-music': '#8b5cf6',
  'cloudvault': '#22d3ee',
};

// ─── 3D Globe with Surface Orbital Nodes ───
function GlobeCore({ rotationAngle }: { rotationAngle: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const ring1Ref = useRef<THREE.LineLoop>(null);
  const ring2Ref = useRef<THREE.LineLoop>(null);

  // Particle distribution for 3D Globe Surface
  const { positions, colors } = useMemo(() => {
    const count = 3200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorLime = new THREE.Color('#c4ff36');
    const colorPurple = new THREE.Color('#8b5cf6');

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 2.4 + (Math.random() - 0.5) * 0.04;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const t = (x + y + 2.5) / 5.0;
      const c = colorPurple.clone().lerp(colorLime, Math.max(0, Math.min(1, t)));
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  // Ring geometries
  const createRingGeo = (r: number, seg = 120) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  };

  const ringGeo1 = useMemo(() => createRingGeo(3.3), []);
  const ringGeo2 = useMemo(() => createRingGeo(3.8), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationAngle, 0.08);
    }
    if (pointsRef.current) pointsRef.current.rotation.y = t * 0.04;
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.06;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Dark Spherical Core */}
      <mesh>
        <sphereGeometry args={[2.35, 48, 48]} />
        <meshStandardMaterial color="#05080f" roughness={0.3} metalness={0.8} emissive="#091f12" emissiveIntensity={0.5} />
      </mesh>

      {/* Particle Shell */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} vertexColors transparent opacity={0.88} blending={THREE.AdditiveBlending} />
      </points>

      {/* Orbital Line Loops */}
      <primitive
        ref={ring1Ref}
        object={new THREE.LineLoop(ringGeo1, new THREE.LineBasicMaterial({ color: '#c4ff36', transparent: true, opacity: 0.5 }))}
        rotation={[1.1, 0.4, 0.2]}
      />
      <primitive
        ref={ring2Ref}
        object={new THREE.LineLoop(ringGeo2, new THREE.LineBasicMaterial({ color: '#8b5cf6', transparent: true, opacity: 0.4 }))}
        rotation={[-0.7, 0.7, -0.3]}
      />

      <pointLight color="#c4ff36" intensity={2} distance={8} position={[-2, 2, 2]} />
      <pointLight color="#8b5cf6" intensity={1.5} distance={8} position={[2, -2, -2]} />
    </group>
  );
}

// ─── 3D Orbital HTML Project Cards ───
interface OrbitCards3DProps {
  projects: ProjectData[];
  rotationAngle: number;
  activeIndex: number;
  onSelectProject?: (p: ProjectData) => void;
  onCardClick: (index: number) => void;
}

function OrbitalCardsGroup({ projects, rotationAngle, activeIndex, onSelectProject, onCardClick }: OrbitCards3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { playClick, playHover } = useSound();
  const total = projects.length;
  const orbitRadius = 4.2;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationAngle, 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((proj, i) => {
        const baseAngle = (i / total) * Math.PI * 2;
        const x = Math.sin(baseAngle) * orbitRadius;
        const z = Math.cos(baseAngle) * orbitRadius;
        const y = Math.sin(i * 2.0) * 0.35; // Slight 3D vertical staggered orbit

        const isFront = i === activeIndex;
        const accentColor = PROJECT_ACCENTS[proj.id] || '#c4ff36';

        return (
          <group key={proj.id} position={[x, y, z]}>
            <Html
              transform
              center
              distanceFactor={5.5}
              zIndexRange={[100, 0]}
              className="pointer-events-auto select-none"
            >
              <div
                onClick={() => {
                  playClick();
                  onCardClick(i);
                }}
                onMouseEnter={() => playHover()}
                className="w-[380px] sm:w-[440px] rounded-2xl border bg-[#080c14]/95 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:scale-[1.03] cursor-pointer"
                style={{
                  borderColor: isFront ? accentColor : 'rgba(39, 39, 42, 0.7)',
                  boxShadow: isFront ? `0 0 45px ${accentColor}30` : '0 10px 30px rgba(0,0,0,0.6)',
                  opacity: isFront ? 1 : 0.75,
                }}
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-code text-[11px] tracking-widest uppercase px-3 py-1 rounded-full border font-semibold"
                      style={{ color: accentColor, borderColor: `${accentColor}40`, background: '#050505' }}
                    >
                      {proj.category}
                    </span>
                    <span className="font-display font-extrabold text-xl text-white/25 select-none">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                    {proj.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-[#d1d5db] line-clamp-3 leading-relaxed mb-4">
                    {proj.tagline || proj.description}
                  </p>

                  {/* Highlights */}
                  {proj.highlights && (
                    <ul className="space-y-1 mb-4">
                      {proj.highlights.slice(0, 3).map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2 font-code text-xs text-[#a1a1aa]">
                          <span style={{ color: accentColor }}>→</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-[#1f2430]">
                    {proj.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-code rounded bg-[#121824] text-[#a1a1aa] border border-[#1f2430]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {onSelectProject && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playClick();
                          onSelectProject(proj);
                        }}
                        className="flex-1 py-2 px-4 rounded-full font-semibold text-xs text-[#050505] flex items-center justify-center gap-1.5 transition-all shadow-md"
                        style={{ background: accentColor }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        View Case Study
                      </button>
                    )}

                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full border border-[#27272a] bg-[#121824] text-[#a1a1aa] hover:text-white transition-all"
                        title="Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// ─── Main Interactive 3D Showcase Component ───
export const Globe3DProjectShowcase: React.FC<{ onSelectProject?: (p: ProjectData) => void }> = ({ onSelectProject }) => {
  const projects = getAllProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentAngleRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover } = useSound();

  const total = projects.length;

  const rotateTo = useCallback((index: number) => {
    const targetAngle = -(index / total) * Math.PI * 2;
    currentAngleRef.current = targetAngle;
    setRotationAngle(targetAngle);
    setActiveIndex((index + total) % total);
  }, [total]);

  const nextProject = useCallback(() => {
    playClick();
    rotateTo(activeIndex + 1);
  }, [activeIndex, rotateTo, playClick]);

  const prevProject = useCallback(() => {
    playClick();
    rotateTo(activeIndex - 1);
  }, [activeIndex, rotateTo, playClick]);

  // Handle Drag to Spin 3D Globe
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    const newAngle = currentAngleRef.current + (deltaX * 0.006);
    setRotationAngle(newAngle);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const deltaX = e.clientX - startX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) nextProject();
      else prevProject();
    } else {
      setRotationAngle(currentAngleRef.current);
    }
  };

  // Scroll wheel interaction to spin 3D Globe
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > 10 || Math.abs(e.deltaY) > 10) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (e.deltaY > 0 || e.deltaX > 0) nextProject();
          else prevProject();
        }, 60);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      clearTimeout(timeout);
    };
  }, [nextProject, prevProject]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[640px] sm:h-[720px] flex flex-col items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 3D R3F Canvas Stage */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 8.5], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.6} />
            <GlobeCore rotationAngle={rotationAngle} />
            <OrbitalCardsGroup
              projects={projects}
              rotationAngle={rotationAngle}
              activeIndex={activeIndex}
              onSelectProject={onSelectProject}
              onCardClick={rotateTo}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Orbit Controls Overlay */}
      <div className="relative z-10 flex items-center gap-6 mt-auto mb-6 pointer-events-auto">
        <button
          onClick={prevProject}
          onMouseEnter={() => playHover()}
          className="w-12 h-12 rounded-full border border-[#27272a] bg-[#090a0f]/90 backdrop-blur-md flex items-center justify-center text-white hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all shadow-xl"
          title="Previous Project"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Orbit Dots Indicator */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#090a0f]/90 border border-[#27272a] backdrop-blur-md shadow-xl">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => rotateTo(idx)}
              onMouseEnter={() => playHover()}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: activeIndex === idx ? 24 : 8,
                background: activeIndex === idx ? '#c4ff36' : '#3f3f46',
              }}
            />
          ))}
        </div>

        <button
          onClick={nextProject}
          onMouseEnter={() => playHover()}
          className="w-12 h-12 rounded-full border border-[#27272a] bg-[#090a0f]/90 backdrop-blur-md flex items-center justify-center text-white hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all shadow-xl"
          title="Next Project"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="relative z-10 font-code text-xs text-[#71717a] pb-4 pointer-events-none">
        Scroll or drag to orbit the 3D globe and inspect every project
      </div>
    </div>
  );
};

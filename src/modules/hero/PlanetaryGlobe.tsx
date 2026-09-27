import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const PlanetaryGlobe: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Points>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.LineLoop>(null);
  const ring2Ref = useRef<THREE.LineLoop>(null);
  const ringDustRef = useRef<THREE.Points>(null);

  // Passive mouse tracking with ZERO React re-renders
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 1. High-Performance Particle Shell (2,200 points Fibonacci distribution with chromatic spectral aura)
  const { positions, colors } = useMemo(() => {
    const count = 2200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cAmber = new THREE.Color('#f59e0b');
    const cLime = new THREE.Color('#c4ff36');
    const cGreen = new THREE.Color('#10b981');
    const cCyan = new THREE.Color('#06b6d4');
    const cPink = new THREE.Color('#ec4899');
    const cPurple = new THREE.Color('#8b5cf6');
    const cWhite = new THREE.Color('#f8fafc');
    const cSky = new THREE.Color('#38bdf8');

    const palette = [cAmber, cLime, cGreen, cCyan, cPink, cPurple];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 2.18 + (Math.random() - 0.5) * 0.03;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Chromatic spherical aura
      const angleNorm = (Math.atan2(y, x) + Math.PI) / (Math.PI * 2);
      const scaledIdx = angleNorm * palette.length;
      const idx1 = Math.floor(scaledIdx) % palette.length;
      const idx2 = (idx1 + 1) % palette.length;
      const blend = scaledIdx - Math.floor(scaledIdx);
      const smoothBlend = 0.5 - 0.5 * Math.cos(blend * Math.PI);

      let finalColor = palette[idx1].clone().lerp(palette[idx2], smoothBlend);

      // Polar ice blending
      if (phi < 0.55) {
        const polarFactor = (0.55 - phi) / 0.55;
        finalColor.lerp(cWhite, Math.pow(polarFactor, 1.4));
      } else if (phi > Math.PI - 0.55) {
        const polarFactor = (phi - (Math.PI - 0.55)) / 0.55;
        finalColor.lerp(cSky, Math.pow(polarFactor, 1.4));
      }

      col[i * 3] = finalColor.r;
      col[i * 3 + 1] = finalColor.g;
      col[i * 3 + 2] = finalColor.b;
    }

    return { positions: pos, colors: col };
  }, []);

  // 2. Equatorial dust particle belt (120 points)
  const { dustPositions, dustColors } = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorLime = new THREE.Color('#c4ff36');
    const colorCyan = new THREE.Color('#22d3ee');

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.85 + (Math.random() - 0.5) * 0.2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.12;

      const c = i % 2 === 0 ? colorLime : colorCyan;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { dustPositions: pos, dustColors: col };
  }, []);

  // 3. Lightweight Orbital Rings (72 segments)
  const createRingGeometry = (radius: number, segments = 72) => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  };

  const ringGeo1 = useMemo(() => createRingGeometry(2.85, 72), []);
  const ringGeo2 = useMemo(() => createRingGeometry(3.35, 72), []);

  // 4. Satellite Node Dots (8 nodes)
  const nodeDots = useMemo(() => {
    const dots = [];
    const count = 8;
    const colorLime = new THREE.Color('#c4ff36');
    const colorPurple = new THREE.Color('#8b5cf6');

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.35;
      dots.push({
        position: new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0),
        color: i % 2 === 0 ? colorLime : colorPurple,
      });
    }
    return dots;
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    timeRef.current += dt;
    const t = timeRef.current;

    // Smooth lerp mouse tracking
    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, mouseRef.current.targetX, dt * 4);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, mouseRef.current.targetY, dt * 4);

    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const isMobile = width < 768;

    // Stable anchor position: stays visible and elegant across all pages without hiding
    const targetX = isMobile ? 0.0 : 2.1;
    const targetY = isMobile ? -0.4 : 0.05;
    const targetZ = isMobile ? -1.1 : -0.6;
    const targetScale = isMobile ? 0.6 : 0.85;

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + Math.sin(t * 0.5) * 0.05, 0.08);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08));

      // Gentle interactive tilt + rotation
      groupRef.current.rotation.y = mouseRef.current.x * 0.35 + t * 0.1;
      groupRef.current.rotation.x = -mouseRef.current.y * 0.25 + Math.sin(t * 0.2) * 0.1;
    }

    if (globeRef.current) {
      globeRef.current.rotation.y += dt * 0.22;
    }
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y -= dt * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += dt * 0.25;
    }
    if (ringDustRef.current) {
      ringDustRef.current.rotation.z += dt * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= dt * 0.20;
    }
  });

  return (
    <group ref={groupRef} position={[2.1, 0.05, -0.6]}>
      {/* Dark Spherical Core */}
      <mesh ref={coreMeshRef}>
        <sphereGeometry args={[2.12, 24, 24]} />
        <meshBasicMaterial color="#060910" />
      </mesh>

      {/* 3D Particle Shell */}
      <points ref={globeRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Gyroscopic Ring 1 (Cyber Lime) */}
      <primitive
        ref={ring1Ref}
        object={new THREE.LineLoop(ringGeo1, new THREE.LineBasicMaterial({ color: '#c4ff36', transparent: true, opacity: 0.65 }))}
        rotation={[Math.PI / 3, Math.PI / 6, 0]}
      />

      {/* Ring 1 Dust Particle Belt */}
      <points ref={ringDustRef} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[dustColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.024}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Gyroscopic Ring 2 (Purple) */}
      <primitive
        ref={ring2Ref}
        object={new THREE.LineLoop(ringGeo2, new THREE.LineBasicMaterial({ color: '#8b5cf6', transparent: true, opacity: 0.55 }))}
        rotation={[-Math.PI / 4, Math.PI / 3, Math.PI / 4]}
      />

      {/* Satellite Node Dots (8 nodes with 6x6 low poly) */}
      {nodeDots.map((dot, i) => (
        <mesh key={i} position={dot.position} scale={0.05}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial color={dot.color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
};

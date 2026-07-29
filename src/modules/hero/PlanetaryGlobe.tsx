import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMouse } from '@/core/cursor/MouseProvider';

interface PlanetaryGlobeProps {
  scrollProgress?: number;
}

export function PlanetaryGlobe({ scrollProgress = 0 }: PlanetaryGlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Points>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.LineLoop>(null);
  const ring2Ref = useRef<THREE.LineLoop>(null);
  const ring3Ref = useRef<THREE.LineLoop>(null);
  const ringDustRef = useRef<THREE.Points>(null);

  const { nx, ny } = useMouse();

  // 1. High-Density Particle Shell Geometry with 6-Region Geographic Continent Color Map
  const { positions, colors } = useMemo(() => {
    const count = 4800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cAmber = new THREE.Color('#f59e0b');   // Golden Yellow / Amber
    const cLime = new THREE.Color('#c4ff36');    // Cyber Lime
    const cGreen = new THREE.Color('#10b981');   // Emerald Green
    const cCyan = new THREE.Color('#06b6d4');    // Electric Cyan
    const cPink = new THREE.Color('#ec4899');    // Magenta / Pink
    const cPurple = new THREE.Color('#8b5cf6');  // Deep Purple
    const cWhite = new THREE.Color('#f8fafc');   // Polar Diamond Ice White
    const cSky = new THREE.Color('#38bdf8');     // Polar Sky Blue

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

      // Silky Smooth Cosine Wave Spherical Color Aura Blending (Zero Sharp Borders)
      const angleNormalized = (Math.atan2(y, x) + Math.PI) / (Math.PI * 2); // 0.0 to 1.0
      const colorPalette = [cAmber, cLime, cGreen, cCyan, cPink, cPurple];
      const scaledIdx = angleNormalized * colorPalette.length;
      const idx1 = Math.floor(scaledIdx) % colorPalette.length;
      const idx2 = (idx1 + 1) % colorPalette.length;
      const blendFactor = scaledIdx - Math.floor(scaledIdx);

      // Smooth cosine ease for zero-border transition
      const smoothBlend = 0.5 - 0.5 * Math.cos(blendFactor * Math.PI);
      let finalColor = colorPalette[idx1].clone().lerp(colorPalette[idx2], smoothBlend);

      // Smooth polar ice cap blending towards northern ice white & southern sky blue
      if (phi < 0.55) {
        const polarFactor = (0.55 - phi) / 0.55;
        finalColor = finalColor.clone().lerp(cWhite, Math.pow(polarFactor, 1.4));
      } else if (phi > Math.PI - 0.55) {
        const polarFactor = (phi - (Math.PI - 0.55)) / 0.55;
        finalColor = finalColor.clone().lerp(cSky, Math.pow(polarFactor, 1.4));
      }

      // Add subtle luminance variation per particle
      const noise = 0.85 + Math.random() * 0.3;
      col[i * 3] = Math.min(1, finalColor.r * noise);
      col[i * 3 + 1] = Math.min(1, finalColor.g * noise);
      col[i * 3 + 2] = Math.min(1, finalColor.b * noise);
    }

    return { positions: pos, colors: col };
  }, []);

  // 2. Structured 3D Orbital Particle Belt (Equatorial Disc Dust)
  const { dustPositions, dustColors } = useMemo(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorLime = new THREE.Color('#c4ff36');
    const colorCyan = new THREE.Color('#22d3ee');

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.1;
      const radius = 2.85 + (Math.random() - 0.5) * 0.25;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.15;

      const c = Math.random() > 0.5 ? colorLime : colorCyan;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { dustPositions: pos, dustColors: col };
  }, []);

  // 3. Structured 3D Gyroscopic Ring Geometries
  const createRingGeometry = (radius: number, segments = 180) => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  };

  const ringGeo1 = useMemo(() => createRingGeometry(2.85), []);
  const ringGeo2 = useMemo(() => createRingGeometry(3.35), []);
  const ringGeo3 = useMemo(() => createRingGeometry(3.85), []);

  // 4. Structured Orbital Node Dots along 3D Ring Paths
  const nodeDots = useMemo(() => {
    const dots = [];
    const count = 16;
    const colorLime = new THREE.Color('#c4ff36');
    const colorPurple = new THREE.Color('#8b5cf6');

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.35;
      dots.push({
        position: new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 0.2),
        color: i % 2 === 0 ? colorLime : colorPurple,
        size: 0.05 + Math.random() * 0.02,
      });
    }
    return dots;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Responsive Coordinates & Scale: Centered and scaled-down on phone/tablet, fully frozen on PC/Desktop
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    let targetX = 2.2;
    let targetY = 0.1;
    let targetZ = -0.6;
    let targetScale = 0.85;

    if (isMobile) {
      targetX = 0.0;
      targetY = -0.7;
      targetZ = -1.0;
      targetScale = 0.55;
    } else if (isTablet) {
      targetX = 1.0;
      targetY = -0.2;
      targetZ = -0.8;
      targetScale = 0.70;
    }

    if (scrollProgress <= 0.15) {
      const p = scrollProgress / 0.15;
      if (isMobile) {
        targetX = THREE.MathUtils.lerp(0.0, 0.0, p);
        targetY = THREE.MathUtils.lerp(-0.7, -0.8, p);
        targetZ = THREE.MathUtils.lerp(-1.0, -3.2, p);
        targetScale = THREE.MathUtils.lerp(0.55, 0.28, p);
      } else if (isTablet) {
        targetX = THREE.MathUtils.lerp(1.0, -2.0, p);
        targetY = THREE.MathUtils.lerp(-0.2, -0.8, p);
        targetZ = THREE.MathUtils.lerp(-0.8, -3.5, p);
        targetScale = THREE.MathUtils.lerp(0.70, 0.32, p);
      } else {
        targetX = THREE.MathUtils.lerp(2.2, -4.2, p);
        targetY = THREE.MathUtils.lerp(0.1, -1.2, p);
        targetZ = THREE.MathUtils.lerp(-0.6, -4.5, p);
        targetScale = THREE.MathUtils.lerp(0.85, 0.35, p);
      }
    } else if (scrollProgress <= 0.35) {
      const p = (scrollProgress - 0.15) / 0.2;
      if (isMobile) {
        targetX = THREE.MathUtils.lerp(0.0, 0.0, p);
        targetY = THREE.MathUtils.lerp(-0.8, 0.3, p);
        targetZ = THREE.MathUtils.lerp(-3.2, 0.0, p);
        targetScale = THREE.MathUtils.lerp(0.28, 0.85, p);
      } else if (isTablet) {
        targetX = THREE.MathUtils.lerp(-2.0, 1.8, p);
        targetY = THREE.MathUtils.lerp(-0.8, 0.6, p);
        targetZ = THREE.MathUtils.lerp(-3.5, 0.4, p);
        targetScale = THREE.MathUtils.lerp(0.32, 1.20, p);
      } else {
        targetX = THREE.MathUtils.lerp(-4.2, 3.8, p);
        targetY = THREE.MathUtils.lerp(-1.2, 1.1, p);
        targetZ = THREE.MathUtils.lerp(-4.5, 0.8, p);
        targetScale = THREE.MathUtils.lerp(0.35, 1.65, p);
      }
    } else if (scrollProgress <= 0.55) {
      const p = (scrollProgress - 0.35) / 0.2;
      if (isMobile) {
        targetX = THREE.MathUtils.lerp(0.0, 0.0, p);
        targetY = THREE.MathUtils.lerp(0.3, -0.6, p);
        targetZ = THREE.MathUtils.lerp(0.0, -1.5, p);
        targetScale = THREE.MathUtils.lerp(0.85, 0.45, p);
      } else if (isTablet) {
        targetX = THREE.MathUtils.lerp(1.8, -1.8, p);
        targetY = THREE.MathUtils.lerp(0.6, -0.4, p);
        targetZ = THREE.MathUtils.lerp(0.4, -2.0, p);
        targetScale = THREE.MathUtils.lerp(1.20, 0.50, p);
      } else {
        targetX = THREE.MathUtils.lerp(3.8, -3.5, p);
        targetY = THREE.MathUtils.lerp(1.1, -0.8, p);
        targetZ = THREE.MathUtils.lerp(0.8, -2.8, p);
        targetScale = THREE.MathUtils.lerp(1.65, 0.55, p);
      }
    } else if (scrollProgress <= 0.75) {
      const p = (scrollProgress - 0.55) / 0.2;
      if (isMobile) {
        targetX = THREE.MathUtils.lerp(0.0, 0.0, p);
        targetY = THREE.MathUtils.lerp(-0.6, 0.3, p);
        targetZ = THREE.MathUtils.lerp(-1.5, -0.6, p);
        targetScale = THREE.MathUtils.lerp(0.45, 0.65, p);
      } else if (isTablet) {
        targetX = THREE.MathUtils.lerp(-1.8, 1.5, p);
        targetY = THREE.MathUtils.lerp(-0.4, 0.3, p);
        targetZ = THREE.MathUtils.lerp(-2.0, -0.5, p);
        targetScale = THREE.MathUtils.lerp(0.50, 0.90, p);
      } else {
        targetX = THREE.MathUtils.lerp(-3.5, 3.0, p);
        targetY = THREE.MathUtils.lerp(-0.8, 0.5, p);
        targetZ = THREE.MathUtils.lerp(-2.8, -0.4, p);
        targetScale = THREE.MathUtils.lerp(0.55, 1.20, p);
      }
    } else if (scrollProgress <= 0.90) {
      const p = (scrollProgress - 0.75) / 0.15;
      if (isMobile) {
        targetX = THREE.MathUtils.lerp(0.0, 0.0, p);
        targetY = THREE.MathUtils.lerp(0.3, -0.1, p);
        targetZ = THREE.MathUtils.lerp(-0.6, 0.1, p);
        targetScale = THREE.MathUtils.lerp(0.65, 0.90, p);
      } else if (isTablet) {
        targetX = THREE.MathUtils.lerp(1.5, 0.0, p);
        targetY = THREE.MathUtils.lerp(0.3, -0.1, p);
        targetZ = THREE.MathUtils.lerp(-0.5, 0.1, p);
        targetScale = THREE.MathUtils.lerp(0.90, 1.20, p);
      } else {
        targetX = THREE.MathUtils.lerp(3.0, 0.0, p);
        targetY = THREE.MathUtils.lerp(0.5, -0.1, p);
        targetZ = THREE.MathUtils.lerp(-0.4, 0.2, p);
        targetScale = THREE.MathUtils.lerp(1.20, 1.50, p);
      }
    } else {
      if (isMobile) {
        targetX = 0.0;
        targetY = -0.1;
        targetZ = 0.1;
        targetScale = 0.90;
      } else if (isTablet) {
        targetX = 0.0;
        targetY = -0.1;
        targetZ = 0.1;
        targetScale = 1.20;
      } else {
        targetX = 0.0;
        targetY = -0.1;
        targetZ = 0.2;
        targetScale = 1.50;
      }
    }

    if (groupRef.current) {
      const mouseRotX = (ny - 0.5) * 0.75;
      const mouseRotY = (nx - 0.5) * 0.95;
      const mouseRotZ = (nx - 0.5) * (ny - 0.5) * 0.45;

      const gyroX = Math.sin(t * 0.15) * 0.35 + mouseRotX;
      const gyroY = t * 0.22 + mouseRotY + scrollProgress * Math.PI * 2.0;
      const gyroZ = Math.cos(t * 0.12) * 0.28 + mouseRotZ;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.07);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.07);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.07);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.07));

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, gyroX, 0.06);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, gyroY, 0.06);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, gyroZ, 0.06);
    }

    // Omnidirectional 3D Multi-Axis Rotation (Pitch X, Yaw Y, Roll Z)
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.32 + scrollProgress * Math.PI * 2.5;
      globeRef.current.rotation.x = t * 0.22 + Math.sin(t * 0.15) * 0.4 + Math.sin(scrollProgress * Math.PI * 3.0) * 0.5;
      globeRef.current.rotation.z = Math.cos(t * 0.18) * 0.35 + Math.cos(scrollProgress * Math.PI * 2.0) * 0.4;
    }
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y = -t * 0.28;
      coreMeshRef.current.rotation.x = Math.cos(t * 0.20) * 0.30;
      coreMeshRef.current.rotation.z = Math.sin(t * 0.16) * 0.25;
    }
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y = -t * 0.30;
      coreMeshRef.current.rotation.x = Math.cos(t * 0.18) * 0.20;
    }

    // Structured 3D Gyroscopic Ring Rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.30 + scrollProgress * Math.PI;
      ring1Ref.current.rotation.y = Math.sin(t * 0.15) * 0.30;
    }
    if (ringDustRef.current) {
      ringDustRef.current.rotation.z = t * 0.30 + scrollProgress * Math.PI;
      ringDustRef.current.rotation.y = Math.sin(t * 0.15) * 0.30;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.25 - scrollProgress * Math.PI;
      ring2Ref.current.rotation.x = Math.cos(t * 0.18) * 0.35;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.20;
      ring3Ref.current.rotation.y = Math.cos(t * 0.14) * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, 0.1, -0.5]}>
      {/* Dark Spherical Core Mesh for Solid Planet Body with Rim Lighting */}
      <mesh ref={coreMeshRef}>
        <sphereGeometry args={[2.12, 64, 64]} />
        <meshStandardMaterial
          color="#050505"
          roughness={0.25}
          metalness={0.8}
          emissive="#0a2010"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* 3D Particle Shell — Smooth 360° Axial Rotation */}
      <points ref={globeRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          vertexColors
          transparent
          opacity={0.92}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Inner Glowing Core Point Lights */}
      <pointLight color="#c4ff36" intensity={2.2} distance={10} decay={2} position={[-1.5, 1.5, 1]} />
      <pointLight color="#8b5cf6" intensity={1.8} distance={10} decay={2} position={[2, -1.5, -1]} />

      {/* 3D Gyroscopic Ring Band 1 — Equatorial Disc (Neon Lime) */}
      <primitive
        ref={ring1Ref}
        object={new THREE.LineLoop(ringGeo1, new THREE.LineBasicMaterial({ color: '#c4ff36', transparent: true, opacity: 0.75 }))}
        rotation={[Math.PI / 3, Math.PI / 6, 0]}
      />

      {/* Ring 1 Equatorial Dust Particle Belt */}
      <points ref={ringDustRef} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[dustColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 3D Gyroscopic Ring Band 2 — Polar Orbit (Deep Purple) */}
      <primitive
        ref={ring2Ref}
        object={new THREE.LineLoop(ringGeo2, new THREE.LineBasicMaterial({ color: '#8b5cf6', transparent: true, opacity: 0.65 }))}
        rotation={[-Math.PI / 4, Math.PI / 3, Math.PI / 4]}
      />

      {/* 3D Gyroscopic Ring Band 3 — Outer Inclined Orbit (Electric Cyan) */}
      <primitive
        ref={ring3Ref}
        object={new THREE.LineLoop(ringGeo3, new THREE.LineBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.5 }))}
        rotation={[Math.PI / 6, -Math.PI / 3, Math.PI / 2]}
      />

      {/* Satellite Node Dots orbiting along Ring Band 2 */}
      {nodeDots.map((dot, i) => (
        <mesh key={i} position={dot.position} scale={dot.size}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={dot.color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

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

  const { nx, ny } = useMouse();

  // 1. High-Density Particle Shell Geometry with Lime to Purple Gradient
  const { positions, colors } = useMemo(() => {
    const count = 4500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorLime = new THREE.Color('#c4ff36');
    const colorPurple = new THREE.Color('#8b5cf6');

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

      // Color gradient based on spatial distribution (Lime top-left, Purple bottom-right)
      const t = (x + y + 2.5) / 5.0;
      const finalColor = colorPurple.clone().lerp(colorLime, Math.max(0, Math.min(1, t)));

      col[i * 3] = finalColor.r;
      col[i * 3 + 1] = finalColor.g;
      col[i * 3 + 2] = finalColor.b;
    }

    return { positions: pos, colors: col };
  }, []);

  // 2. Orbital Rings Line Geometries
  const createRingGeometry = (radius: number, segments = 160) => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  };

  const ringGeo1 = useMemo(() => createRingGeometry(3.05), []);
  const ringGeo2 = useMemo(() => createRingGeometry(3.45), []);
  const ringGeo3 = useMemo(() => createRingGeometry(3.85), []);

  // 3. Orbital Node Dots Along Rings
  const nodeDots = useMemo(() => {
    const dots = [];
    const count = 16;
    const colorLime = new THREE.Color('#c4ff36');
    const colorPurple = new THREE.Color('#8b5cf6');

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.05 + (i % 3) * 0.4;
      dots.push({
        position: new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 0.4),
        color: i % 2 === 0 ? colorLime : colorPurple,
        size: 0.045 + Math.random() * 0.03,
      });
    }
    return dots;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Dynamic scroll progression transformations across sections
    // Hero (0.0): position [2.5, 0.1, -0.5]
    // Work (0.25): position [2.8, -0.4, -1.2]
    // Skills (0.50): position [-2.6, 0.2, -0.8]
    // TechScript (0.75): position [2.2, 0.0, -0.5]
    // Contact (1.00): position [0.0, -0.2, -1.0]

    let targetX = 2.5;
    let targetY = 0.1;
    let targetZ = -0.5;
    let targetScale = 1.0;

    if (scrollProgress <= 0.25) {
      const p = scrollProgress / 0.25;
      targetX = THREE.MathUtils.lerp(2.5, 2.8, p);
      targetY = THREE.MathUtils.lerp(0.1, -0.4, p);
      targetZ = THREE.MathUtils.lerp(-0.5, -1.2, p);
    } else if (scrollProgress <= 0.5) {
      const p = (scrollProgress - 0.25) / 0.25;
      targetX = THREE.MathUtils.lerp(2.8, -2.6, p);
      targetY = THREE.MathUtils.lerp(-0.4, 0.2, p);
      targetZ = THREE.MathUtils.lerp(-1.2, -0.8, p);
    } else if (scrollProgress <= 0.75) {
      const p = (scrollProgress - 0.5) / 0.25;
      targetX = THREE.MathUtils.lerp(-2.6, 2.2, p);
      targetY = THREE.MathUtils.lerp(0.2, 0.0, p);
      targetZ = THREE.MathUtils.lerp(-0.8, -0.5, p);
    } else {
      const p = (scrollProgress - 0.75) / 0.25;
      targetX = THREE.MathUtils.lerp(2.2, 0.0, p);
      targetY = THREE.MathUtils.lerp(0.0, -0.2, p);
      targetZ = THREE.MathUtils.lerp(-0.5, -1.0, p);
      targetScale = THREE.MathUtils.lerp(1.0, 1.25, p);
    }

    if (groupRef.current) {
      // Interactive mouse parallax rotation combined with scroll positioning
      const mouseRotY = (nx - 0.5) * 0.5 + t * 0.06 + scrollProgress * Math.PI;
      const mouseRotX = (ny - 0.5) * 0.3;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.04);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.04));

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseRotY, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseRotX, 0.04);
    }

    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.03;
    }
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y = -t * 0.02;
    }

    // Individual orbital ring counter-rotations
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.08;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.05;
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.03;
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

      {/* 3D Particle Shell */}
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

      {/* Orbital Ring 1 - Neon Lime */}
      <primitive
        ref={ring1Ref}
        object={new THREE.LineLoop(ringGeo1, new THREE.LineBasicMaterial({ color: '#c4ff36', transparent: true, opacity: 0.65 }))}
        rotation={[1.15, 0.35, 0.2]}
      />

      {/* Orbital Ring 2 - Deep Purple */}
      <primitive
        ref={ring2Ref}
        object={new THREE.LineLoop(ringGeo2, new THREE.LineBasicMaterial({ color: '#8b5cf6', transparent: true, opacity: 0.55 }))}
        rotation={[-0.65, 0.85, -0.25]}
      />

      {/* Orbital Ring 3 - Electric Cyan */}
      <primitive
        ref={ring3Ref}
        object={new THREE.LineLoop(ringGeo3, new THREE.LineBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.4 }))}
        rotation={[0.35, -0.55, 0.75]}
      />

      {/* Orbital Node Dots */}
      {nodeDots.map((dot, i) => (
        <mesh key={i} position={dot.position} scale={dot.size}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={dot.color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

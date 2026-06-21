import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleNetwork() {
  const pointsRef = useRef();
  
  // Create 2000 points
  const particleCount = 2000;
  const positions = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const r = 10 + Math.random() * 15;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [particleCount]);

  useFrame((state) => {
    // Background is completely static as requested
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowingCore() {
  const coreRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      // Very slow, subtle breathing only, no spinning
      const scale = 1 + Math.sin(time) * 0.01;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={coreRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial 
        color="#b84dff" 
        wireframe 
        transparent 
        opacity={0.15} 
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function LandingBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <fog attach="fog" args={['#050814', 5, 25]} />
        <ParticleNetwork />
        <GlowingCore />
      </Canvas>
    </div>
  );
}

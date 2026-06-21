import React, { useState } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Box, Torus, Cylinder } from '@react-three/drei';

export default function Hoop({ position = [0, 3, -8], onScore }) {
  const [flash, setFlash] = useState(false);

  const handleScore = (e) => {
    // Basic debounce / flash trigger
    if (!flash) {
      setFlash(true);
      if (onScore) onScore();
      setTimeout(() => setFlash(false), 500);
    }
  };

  const hoopY = position[1];
  const hoopZ = position[2];

  return (
    <group position={position}>
      {/* Backboard */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0.6}>
        <Box args={[3, 2, 0.1]} position={[0, 1, 0]}>
          <meshStandardMaterial 
            color={flash ? "#39ff14" : "#ffffff"} 
            opacity={0.3} 
            transparent 
            roughness={0.2}
            emissive={flash ? "#39ff14" : "#000000"}
            emissiveIntensity={flash ? 2 : 0}
          />
        </Box>
        {/* Backboard outline */}
        <Box args={[3.1, 2.1, 0.05]} position={[0, 1, -0.05]}>
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} />
        </Box>
        {/* Inner square */}
        <Box args={[1, 1, 0.12]} position={[0, 0.5, 0]}>
          <meshBasicMaterial color="#ff6b2b" wireframe />
        </Box>
      </RigidBody>

      {/* Rim Bracket */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[0.2, 0.1, 0.3]} position={[0, 0, 0.15]}>
          <meshStandardMaterial color="#ff6b2b" />
        </Box>
      </RigidBody>

      {/* Rim - using trimesh for torus physics */}
      <RigidBody type="fixed" colliders="trimesh" restitution={0.4} friction={0.5}>
        <Torus args={[0.4, 0.03, 16, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.7]}>
          <meshStandardMaterial color="#ff6b2b" emissive="#ff6b2b" emissiveIntensity={0.5} />
        </Torus>
      </RigidBody>

      {/* Net (Visual only) */}
      <Cylinder args={[0.4, 0.3, 0.8, 16, 1, true]} position={[0, -0.4, 0.7]}>
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.5} />
      </Cylinder>

      {/* Sensor for scoring (Invisible box below rim) */}
      <CuboidCollider 
        args={[0.2, 0.1, 0.2]} 
        position={[0, -0.3, 0.7]} 
        sensor 
        onIntersectionEnter={handleScore}
      />

      {/* Pole */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[0.3, 6, 0.3]} position={[0, -2, -0.3]}>
          <meshStandardMaterial color="#222" roughness={0.8} />
        </Box>
      </RigidBody>
    </group>
  );
}

import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { Box, Plane, Grid } from '@react-three/drei';

export default function Court() {
  return (
    <group>
      {/* Floor */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0.8} friction={1}>
        <Box args={[30, 0.5, 30]} position={[0, -0.25, 0]}>
          <meshStandardMaterial color="#0a0e1a" roughness={0.1} metalness={0.8} />
        </Box>
      </RigidBody>

      {/* Cyberpunk Grid Overlay */}
      <Grid 
        position={[0, 0.01, 0]} 
        args={[30, 30]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#00f0ff" 
        sectionSize={5} 
        sectionThickness={2} 
        sectionColor="#b84dff" 
        fadeDistance={25} 
        fadeStrength={1} 
      />

      {/* Paint Area / Key (Visual) */}
      <Plane args={[6, 8]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -4]}>
        <meshBasicMaterial color="#ff6b2b" transparent opacity={0.15} />
      </Plane>

      {/* 3 Point Line (Arc visual approximation) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -8]}>
        <ringGeometry args={[8, 8.2, 32, 1, 0, Math.PI]} />
        <meshBasicMaterial color="#39ff14" side={2} />
      </mesh>

      {/* Invisible Boundaries to keep ball in play */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0.5}>
        {/* Back wall */}
        <Box args={[30, 20, 1]} position={[0, 10, -11]} visible={false} />
        {/* Front wall */}
        <Box args={[30, 20, 1]} position={[0, 10, 15]} visible={false} />
        {/* Left wall */}
        <Box args={[1, 20, 30]} position={[-11, 10, 0]} visible={false} />
        {/* Right wall */}
        <Box args={[1, 20, 30]} position={[11, 10, 0]} visible={false} />
        {/* Ceiling */}
        <Box args={[30, 1, 30]} position={[0, 20, 0]} visible={false} />
      </RigidBody>
    </group>
  );
}

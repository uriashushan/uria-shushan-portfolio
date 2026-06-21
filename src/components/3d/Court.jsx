import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { Box, Plane, Ring } from '@react-three/drei';

export default function Court() {
  return (
    <group>
      {/* Main Blue Floor */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0.8} friction={1}>
        <Box args={[40, 0.5, 40]} position={[0, -0.25, 0]}>
          <meshStandardMaterial color="#0e2b5e" roughness={0.4} />
        </Box>
      </RigidBody>

      {/* Denver Nuggets Yellow Horizontal Stripe */}
      {/* It crosses the entire court horizontally */}
      <Plane args={[40, 12]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -4]}>
        <meshStandardMaterial color="#fec524" roughness={0.5} />
      </Plane>

      {/* The Key (Paint) Area */}
      {/* Outer key outline */}
      <Plane args={[9.8, 11.6]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -8]}>
        <meshBasicMaterial color="#ffffff" wireframe />
      </Plane>
      {/* Inner key color (grey/dark blue) */}
      <Plane args={[9.6, 11.4]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, -8]}>
        <meshStandardMaterial color="#1a202c" roughness={0.6} />
      </Plane>

      {/* Free throw circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -2.2]}>
        <ringGeometry args={[2.9, 3.1, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* 3 Point Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -8]}>
        <ringGeometry args={[14, 14.2, 64, 1, 0, Math.PI]} />
        <meshBasicMaterial color="#ffffff" side={2} />
      </mesh>

      {/* Invisible Boundaries to keep ball in play */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0.5}>
        <Box args={[40, 20, 1]} position={[0, 10, -11]} visible={false} />
        <Box args={[40, 20, 1]} position={[0, 10, 15]} visible={false} />
        <Box args={[1, 20, 40]} position={[-15, 10, 0]} visible={false} />
        <Box args={[1, 20, 40]} position={[15, 10, 0]} visible={false} />
        <Box args={[40, 1, 40]} position={[0, 25, 0]} visible={false} />
      </RigidBody>
    </group>
  );
}

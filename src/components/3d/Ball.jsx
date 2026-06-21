import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { Sphere } from '@react-three/drei';

const Ball = forwardRef(({ position = [0, 1.5, 5], setScore }, ref) => {
  const rigidBody = useRef();

  // Reset ball if it falls off
  useFrame(() => {
    if (rigidBody.current) {
      const pos = rigidBody.current.translation();
      if (pos.y < -2 || pos.z < -10 || pos.z > 15 || pos.x < -10 || pos.x > 10) {
        resetBall();
      }
    }
  });

  const resetBall = () => {
    if (rigidBody.current) {
      rigidBody.current.setTranslation({ x: position[0], y: position[1], z: position[2] }, true);
      rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBody.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  useImperativeHandle(ref, () => ({
    shoot: (power) => {
      if (rigidBody.current) {
        // Reset position instantly
        rigidBody.current.setTranslation({ x: position[0], y: position[1], z: position[2] }, true);
        
        // Power comes in as 0 to 100.
        // Let's make ~50% power the "perfect" shot based on physics math (velY=8.5, velZ=-8)
        const powerScale = power / 100;
        
        const velX = (Math.random() - 0.5) * 0.2; // Tiny drift
        const velY = 6 + (powerScale * 5); // 6 to 11
        const velZ = -5 - (powerScale * 6); // -5 to -11
        
        // Apply deterministic velocity instantly
        rigidBody.current.setLinvel({ x: velX, y: velY, z: velZ }, true);
        rigidBody.current.setAngvel({ x: -2, y: 0, z: 0 }, true); // Backspin
      }
    }
  }));

  return (
    <RigidBody 
      ref={rigidBody} 
      position={position} 
      colliders="ball" 
      restitution={0.8} 
      friction={0.5}
      mass={0.6} // Lighter ball for easier throwing
    >
      <Sphere args={[0.25, 32, 32]}>
        <meshStandardMaterial 
          color="#ff6b2b" 
          roughness={0.6}
          metalness={0.1}
          emissive="#4a1500"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </RigidBody>
  );
});

export default Ball;

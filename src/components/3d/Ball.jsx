import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function Ball({ position = [0, 1, 4], setScore }) {
  const rigidBody = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragStartTime = useRef(0);
  
  const { size, camera } = useThree();

  // Reset ball if it falls off or is idle for too long far away
  useFrame(() => {
    if (rigidBody.current) {
      const pos = rigidBody.current.translation();
      if (pos.y < -5 || pos.z < -10 || pos.z > 10 || pos.x < -10 || pos.x > 10) {
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

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    dragStartTime.current = performance.now();
    
    // Stop the ball while dragging
    if (rigidBody.current) {
      rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBody.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    if (!isDragging) return;
    setIsDragging(false);

    const dragEndPos = { x: e.clientX || dragStartPos.current.x, y: e.clientY || dragStartPos.current.y };
    const dragEndTime = performance.now();

    const dt = Math.max(dragEndTime - dragStartTime.current, 10);
    const dx = dragEndPos.x - dragStartPos.current.x;
    const dy = dragEndPos.y - dragStartPos.current.y;

    // We swipe UP to throw forward/up. 
    // dy will be negative when swiping up on screen.
    // dx determines left/right.
    
    // Calculate impulse based on swipe speed
    const velocityMultiplier = 0.05; // Adjust based on feel
    
    // Y screen axis corresponds to Z (forward) and Y (up) in 3D
    // X screen axis corresponds to X (left/right) in 3D
    
    let impulseX = (dx / dt) * velocityMultiplier * 15;
    let impulseY = Math.abs(dy / dt) * velocityMultiplier * 25; // Upward force
    let impulseZ = (dy / dt) * velocityMultiplier * 20; // Forward force (dy is negative, so this pushes towards negative Z)

    // Clamp values so it doesn't break physics
    impulseX = Math.max(-5, Math.min(5, impulseX));
    impulseY = Math.max(2, Math.min(12, impulseY));
    impulseZ = Math.max(-15, Math.min(-2, impulseZ));

    // Apply only if the user actually swiped upwards somewhat
    if (dy < -10 && rigidBody.current) {
      rigidBody.current.applyImpulse({ x: impulseX, y: impulseY, z: impulseZ }, true);
      // Add some backspin
      rigidBody.current.applyTorqueImpulse({ x: -0.5, y: 0, z: 0 }, true);
    } else {
      // Just a tap or downward swipe, do nothing or reset
      resetBall();
    }
  };

  // Global pointer up to catch releases outside the ball
  useEffect(() => {
    const handleGlobalUp = (e) => {
      if (isDragging) {
        handlePointerUp(e);
      }
    };
    window.addEventListener('pointerup', handleGlobalUp);
    window.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        handleGlobalUp(e.changedTouches[0]);
      } else {
        handleGlobalUp(e);
      }
    });
    return () => {
      window.removeEventListener('pointerup', handleGlobalUp);
      window.removeEventListener('touchend', handleGlobalUp);
    };
  }, [isDragging]);

  const handlePointerMove = (e) => {
    if (isDragging && rigidBody.current) {
      // Optional: move ball slightly to follow pointer while dragging before release
      // For a better throw mechanic, we just wait for pointer up to apply impulse.
    }
  };

  // For touch screens
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      handlePointerDown(e.touches[0]);
    }
  };

  return (
    <RigidBody 
      ref={rigidBody} 
      position={position} 
      colliders="ball" 
      restitution={0.8} 
      friction={0.5}
      mass={1}
    >
      <Sphere 
        args={[0.3, 32, 32]} 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onTouchStart={handleTouchStart}
      >
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
}

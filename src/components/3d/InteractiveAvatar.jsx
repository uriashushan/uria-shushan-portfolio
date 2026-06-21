import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useCursor, MeshDistortMaterial, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// The Avatar Logic Component
function AvatarModel() {
  const groupRef = useRef();
  const headRef = useRef();
  const ballRef = useRef();
  
  const [hovered, setHovered] = useState(false);
  useCursor(hovered, 'pointer', 'auto');

  // Physics state for the ball
  const ballVelocity = useRef(0);
  const ballY = useRef(0);
  const targetLook = useRef(new THREE.Vector3(0, 1.5, 5));
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Idle Breathing Animation (Scale & slight Y movement)
    if (!hovered) {
      const breath = Math.sin(time * 2.5) * 0.03;
      groupRef.current.scale.lerp(new THREE.Vector3(1 + breath * 0.5, 1 + breath, 1 + breath * 0.5), 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -1 + breath, 0.1);
    } else {
      // Return to normal posture quickly when hovered
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -1, 0.15);
    }

    // Bouncing Ball Physics
    if (hovered && ballRef.current) {
      // Gravity and bouncing math
      ballVelocity.current -= 0.015; // Gravity pull
      ballY.current += ballVelocity.current;
      
      if (ballY.current < -0.8) {
        ballY.current = -0.8; // Floor collision
        ballVelocity.current *= -0.85; // Dampen bounce
        if (Math.abs(ballVelocity.current) < 0.05) {
          ballVelocity.current = 0.28; // Give it a push to keep bouncing
        }
      }
      
      // Update ball position
      const newBallPos = new THREE.Vector3(1.2, ballY.current + 1, 0.8);
      ballRef.current.position.copy(newBallPos);
      
      // Update head target to ball
      targetLook.current.copy(newBallPos);
    } else {
      // Look forward or slightly around when idle
      targetLook.current.set(Math.sin(time) * 2, 1.5 + Math.cos(time * 0.5), 5);
    }

    // Smooth head tracking (LookAt)
    if (headRef.current) {
      const currentQuat = headRef.current.quaternion.clone();
      
      // Create a dummy object to calculate the target rotation
      const dummy = new THREE.Object3D();
      dummy.position.copy(headRef.current.position);
      dummy.lookAt(targetLook.current);
      
      // Smoothly interpolate current rotation towards target rotation
      headRef.current.quaternion.slerp(dummy.quaternion, 0.1);
    }
  });

  return (
    <group 
      ref={groupRef} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      position={[0, -1, 0]}
    >
      {/* High-Tech Stylized Body */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <capsuleGeometry args={[0.55, 0.9, 32, 32]} />
        <meshPhysicalMaterial 
          color="#0a0a0a" 
          roughness={0.2} 
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Floating Holographic Ring */}
      <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.02, 16, 64]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Head Group (Tracks Ball) */}
      <group ref={headRef} position={[0, 1.9, 0]}>
        {/* Head Base */}
        <mesh castShadow>
          <sphereGeometry args={[0.45, 64, 64]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            roughness={0.1} 
            metalness={0.2}
            clearcoat={1}
          />
        </mesh>
        
        {/* Cyber Visor / Eyes Area */}
        <mesh position={[0, 0.05, 0.35]} castShadow>
          <boxGeometry args={[0.6, 0.25, 0.3]} />
          <meshPhysicalMaterial color="#050814" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Glowing Eyes */}
        <mesh position={[-0.15, 0.05, 0.51]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={hovered ? "#ff2d7b" : "#00f0ff"} />
        </mesh>
        <mesh position={[0.15, 0.05, 0.51]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={hovered ? "#ff2d7b" : "#00f0ff"} />
        </mesh>
      </group>

      {/* The Interactive Bouncing Ball */}
      {hovered && (
        <mesh ref={ballRef} castShadow>
          <sphereGeometry args={[0.18, 32, 32]} />
          <MeshDistortMaterial 
            color="#ff6b2b" 
            speed={4} 
            distort={0.3} 
            roughness={0.2} 
            metalness={0.8} 
            emissive="#ff6b2b"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </group>
  );
}

// The Canvas Wrapper Component
export default function InteractiveAvatarScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 10 }}>
      <Canvas 
        camera={{ position: [0, 1, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        {/* Transparent Environment lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, 5, -5]} color="#b84dff" intensity={2} />
        <pointLight position={[5, -5, 5]} color="#00f0ff" intensity={2} />
        
        {/* HDRI Environment for realistic reflections */}
        <Environment preset="city" />

        {/* The Avatar */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <AvatarModel />
        </Float>

        {/* Dynamic Shadow on the floor */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}

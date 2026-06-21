import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Environment, OrbitControls, Text } from '@react-three/drei';
import Court from './Court';
import Hoop from './Hoop';
import Ball from './Ball';

export default function Basketball3D({ setGlobalScore }) {
  const [localScore, setLocalScore] = useState(0);
  const [lastScored, setLastScored] = useState(false);

  const handleScore = () => {
    setLocalScore(s => s + 1);
    setGlobalScore(s => s + 1);
    setLastScored(true);
    setTimeout(() => setLastScored(false), 2000);
  };

  return (
    <div className="basketball-3d-container" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, touchAction: 'none' }}>
      
      {/* UI Overlay */}
      <div style={{ position: 'absolute', top: '80px', left: '0', width: '100%', textAlign: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <h2 style={{ fontSize: '2rem', color: '#00f0ff', textShadow: '0 0 10px #00f0ff', margin: 0 }}>
          3D COURT
        </h2>
        <p style={{ color: '#fff', fontSize: '1rem', marginTop: '5px', opacity: 0.7 }}>Swipe up on the ball to shoot!</p>
        
        {lastScored && (
          <div style={{ 
            fontSize: '3rem', color: '#39ff14', fontWeight: 'bold', 
            textShadow: '0 0 20px #39ff14', marginTop: '20px',
            animation: 'pulse 1s infinite'
          }}>
            SWISH!
          </div>
        )}
      </div>

      <Canvas 
        camera={{ position: [0, 3, 10], fov: 60 }} 
        style={{ background: '#05070d' }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 10, 0]} intensity={1.5} color="#00f0ff" />
          <pointLight position={[0, 5, -8]} intensity={2} color="#b84dff" />

          {/* Physics World */}
          <Physics gravity={[0, -9.81, 0]}>
            <Court />
            <Hoop position={[0, 3, -8]} onScore={handleScore} />
            <Ball position={[0, 1.5, 5]} setScore={handleScore} />
          </Physics>

          {/* Controls - restrict rotation so user stays facing the hoop */}
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.1}
            minAzimuthAngle={-Math.PI / 6}
            maxAzimuthAngle={Math.PI / 6}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

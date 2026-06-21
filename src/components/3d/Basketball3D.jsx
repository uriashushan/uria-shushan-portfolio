import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Environment, OrbitControls } from '@react-three/drei';
import Court from './Court';
import Hoop from './Hoop';
import Ball from './Ball';

// Confetti Particle System
function spawnConfettiDOM() {
  const colors = ['#fec524', '#0e2b5e', '#ffffff', '#ff6b2b', '#39ff14'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = '50%';
    el.style.top = '30%';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    el.style.setProperty('--dx', (Math.random() - 0.5) * 800 + 'px');
    el.style.animation = `confetti-explosion ${1 + Math.random()}s cubic-bezier(0.23, 1, 0.32, 1) forwards`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
}

// Power Meter Component
function PowerManager({ ballRef }) {
  const [power, setPower] = useState(0);
  const [charging, setCharging] = useState(false);
  const powerRef = useRef(0);
  const chargingRef = useRef(false);

  useEffect(() => {
    const handleDown = () => {
      chargingRef.current = true;
      setCharging(true);
      powerRef.current = 0;
    };
    
    const handleUp = () => {
      if (chargingRef.current) {
        chargingRef.current = false;
        setCharging(false);
        if (ballRef.current) {
          ballRef.current.shoot(powerRef.current);
        }
      }
    };

    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('touchstart', handleDown);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('touchstart', handleDown);
      window.removeEventListener('touchend', handleUp);
    };
  }, [ballRef]);

  useFrame(() => {
    if (chargingRef.current) {
      powerRef.current += 1.5;
      if (powerRef.current > 100) powerRef.current = 100;
      setPower(powerRef.current);
    } else {
      setPower(0);
    }
  });

  return (
    <group>
      {/* Background Bar */}
      <mesh position={[2, 4, -4]}>
        <planeGeometry args={[0.5, 3]} />
        <meshBasicMaterial color="#333" transparent opacity={0.5} />
      </mesh>
      {/* Fill Bar */}
      {charging && (
        <mesh position={[2, 2.5 + (power / 100) * 1.5, -3.9]} >
          <planeGeometry args={[0.4, (power / 100) * 3]} />
          <meshBasicMaterial color={power > 80 ? "#ff2d7b" : power > 40 ? "#39ff14" : "#fec524"} />
        </mesh>
      )}
    </group>
  );
}

export default function Basketball3D() {
  const [localScore, setLocalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lastScored, setLastScored] = useState(false);
  const ballRef = useRef();

  // Load High Score
  useEffect(() => {
    const saved = localStorage.getItem('uria_bball_highscore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const handleScore = () => {
    setLocalScore(s => {
      const newScore = s + 1;
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('uria_bball_highscore', newScore);
      }
      return newScore;
    });
    
    // Trigger Effects
    setLastScored(true);
    spawnConfettiDOM();
    setTimeout(() => setLastScored(false), 2500);
  };

  return (
    <div className="basketball-3d-container" style={{ width: '100%', height: '100vh', position: 'absolute', inset: 0, touchAction: 'none', overflow: 'hidden' }}>
      
      {/* UI Overlay - Center Alerts */}
      <div style={{ position: 'absolute', top: '10%', left: '0', width: '100%', textAlign: 'center', zIndex: 10, pointerEvents: 'none' }}>
        {lastScored ? (
          <div style={{ animation: 'pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 8vw, 5rem)', color: '#fec524', fontWeight: '900', 
              textShadow: '0 5px 20px rgba(254, 197, 36, 0.8), 0 0 40px #fec524', margin: 0,
              WebkitTextStroke: '2px #0e2b5e'
            }}>
              CONGRATULATIONS!
            </h1>
            <p style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 'bold', textShadow: '0 2px 10px #000' }}>
              Swish! +1 Point
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '2rem', color: '#fec524', textShadow: '0 2px 10px #000', margin: 0 }}>
              NUGGETS ARENA
            </h2>
            <p style={{ color: '#fff', fontSize: '1rem', marginTop: '5px', textShadow: '0 1px 5px #000' }}>
              Hold click anywhere to charge power. Release to shoot!
            </p>
          </>
        )}
      </div>

      {/* Leaderboard Table (Right Side) */}
      <div className="bball-leaderboard glass" style={{
        position: 'absolute', top: '80px', right: '20px', width: '220px',
        padding: '16px', zIndex: 10, pointerEvents: 'none'
      }}>
        <h3 style={{ fontSize: '14px', color: '#fec524', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
          🏆 Scoreboard
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#8b95a8', fontSize: '13px' }}>Current Run</span>
          <strong style={{ color: '#fff', fontSize: '16px' }}>{localScore}</strong>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ color: '#8b95a8', fontSize: '13px' }}>High Score</span>
          <strong style={{ color: '#39ff14', fontSize: '16px' }}>{highScore}</strong>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '10px' }}>
          <p style={{ fontSize: '11px', color: '#8b95a8', marginBottom: '6px' }}>LEADERBOARD</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
            <span style={{ color: '#fec524', fontWeight: 'bold' }}>#1 Uria</span>
            <span style={{ color: '#fff' }}>999</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: '#c0c0c0', fontWeight: 'bold' }}>#2 You</span>
            <span style={{ color: '#fff' }}>{highScore}</span>
          </div>
        </div>
      </div>

      <Canvas 
        // Pushed camera back and widened FOV so the court fits on small screens
        camera={{ position: [0, 5, 12], fov: 60 }} 
        style={{ background: '#87CEEB' }} // Daylight sky blue
      >
        <Suspense fallback={null}>
          <Environment preset="park" />
          <ambientLight intensity={0.6} />
          <pointLight position={[0, 10, 0]} intensity={1.5} color="#ffffff" />
          <pointLight position={[0, 5, -8]} intensity={1.5} color="#fec524" />

          {/* Physics World */}
          <Physics gravity={[0, -9.81, 0]}>
            <Court />
            <Hoop position={[0, 3, -8]} onScore={handleScore} />
            <Ball ref={ballRef} position={[0, 1.5, 4]} setScore={handleScore} />
            <PowerManager ballRef={ballRef} />
          </Physics>

          {/* Restrict camera rotation so we stay focused on the hoop */}
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
            minAzimuthAngle={-Math.PI / 6}
            maxAzimuthAngle={Math.PI / 6}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';

export default function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system for ambient background
    const particles = [];
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#00f2fe' : '#b927fc',
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    // Nodes connectivity config
    const connections = [
      { from: 'profile', to: 'java', color: '#ffd700' }, // gold
      { from: 'profile', to: 'python', color: '#4facfe' }, // blue
      { from: 'profile', to: 'react', color: '#00f2fe' }, // teal
      { from: 'profile', to: 'db', color: '#00ff87' }, // green
      { from: 'profile', to: 'xml', color: '#b927fc' }, // purple
      { from: 'profile', to: 'cyber', color: '#00ff87' }, // green
      { from: 'profile', to: 'ai', color: '#b927fc' }, // purple
      { from: 'tech', to: 'react', color: '#00f2fe' },
      { from: 'projects', to: 'db', color: '#00ff87' }
    ];

    let pulseOffset = 0;

    const animate = () => {
      // Clear canvas with a very transparent dark fade to leave slight trails
      ctx.fillStyle = 'rgba(8, 11, 19, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      pulseOffset = (pulseOffset + 0.005) % 1;

      // 1. Draw ambient particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary checks
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      // 2. Draw connections between UI modules
      ctx.globalAlpha = 1.0;
      
      // Store node positions dynamically
      const nodePositions = {};
      const nodeElements = document.querySelectorAll('[data-node]');
      
      nodeElements.forEach(el => {
        const name = el.getAttribute('data-node');
        const rect = el.getBoundingClientRect();
        
        // Find center of the element
        nodePositions[name] = {
          x: rect.left + rect.width / 2 + window.scrollX,
          y: rect.top + rect.height / 2 + window.scrollY
        };
      });

      connections.forEach(conn => {
        const p1 = nodePositions[conn.from];
        const p2 = nodePositions[conn.to];

        if (p1 && p2) {
          // Draw connecting base line
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          // Gradient line
          const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          gradient.addColorStop(0, 'rgba(0, 242, 254, 0.05)');
          gradient.addColorStop(0.5, conn.color + '20'); // Hex + opacity
          gradient.addColorStop(1, 'rgba(185, 39, 252, 0.05)');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Draw animated pulsing light particle along the line
          const pulseX = p1.x + (p2.x - p1.x) * pulseOffset;
          const pulseY = p1.y + (p2.y - p1.y) * pulseOffset;

          // Glowing dot shadow
          ctx.shadowBlur = 8;
          ctx.shadowColor = conn.color;
          
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
          ctx.fillStyle = conn.color;
          ctx.fill();
          
          // Reset shadow
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="connections-canvas" />;
}

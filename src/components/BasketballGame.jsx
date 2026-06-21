import React, { useRef, useEffect, useState, useCallback } from 'react';

export default function BasketballGame({ active, onScore }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    ball: { x: 200, y: 500, vx: 0, vy: 0, r: 22 },
    dragging: false,
    dragStart: { x: 0, y: 0 },
    dragEnd: { x: 0, y: 0 },
    hoop: { x: 0, y: 180, rimWidth: 70 },
    scored: false,
    scoreFlash: 0,
    confetti: [],
    trail: [],
  });

  const spawnConfetti = useCallback((cx, cy) => {
    const colors = ['#00f0ff', '#b84dff', '#ff6b2b', '#39ff14', '#ffd700', '#ff2d7b'];
    const particles = [];
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40 + Math.random() * 0.3;
      const speed = 4 + Math.random() * 8;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 20,
      });
    }
    stateRef.current.confetti.push(...particles);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stateRef.current.hoop.x = canvas.width / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    // Input handlers
    const getPos = (e) => {
      const t = e.touches ? e.touches[0] : e;
      return { x: t.clientX, y: t.clientY };
    };

    const onDown = (e) => {
      if (!active) return;
      const p = getPos(e);
      const s = stateRef.current;
      const dx = p.x - s.ball.x, dy = p.y - s.ball.y;
      if (Math.sqrt(dx * dx + dy * dy) < s.ball.r + 20) {
        s.dragging = true;
        s.dragStart = { x: p.x, y: p.y };
        s.dragEnd = { x: p.x, y: p.y };
        s.ball.vx = 0;
        s.ball.vy = 0;
      }
    };

    const onMove = (e) => {
      const s = stateRef.current;
      if (s.dragging) {
        const p = getPos(e);
        s.dragEnd = { x: p.x, y: p.y };
        s.ball.x = p.x;
        s.ball.y = p.y;
      }
    };

    const onUp = () => {
      const s = stateRef.current;
      if (s.dragging) {
        s.dragging = false;
        // Launch velocity = drag delta * multiplier
        s.ball.vx = (s.dragStart.x - s.dragEnd.x) * 0.15;
        s.ball.vy = (s.dragStart.y - s.dragEnd.y) * 0.2;
        s.scored = false;
      }
    };

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    canvas.addEventListener('touchmove', onMove, { passive: true });
    canvas.addEventListener('touchend', onUp);

    // Physics loop
    const gravity = 0.35;
    const friction = 0.992;
    const restitution = 0.65;

    const loop = () => {
      const s = stateRef.current;
      const W = canvas.width, H = canvas.height;
      const b = s.ball;

      // Clear
      ctx.clearRect(0, 0, W, H);

      if (!s.dragging) {
        // Gravity
        b.vy += gravity;
        // Friction
        b.vx *= friction;
        b.vy *= friction;
        // Position
        b.x += b.vx;
        b.y += b.vy;

        // Wall bounces
        if (b.x - b.r < 0) { b.x = b.r; b.vx *= -restitution; }
        if (b.x + b.r > W) { b.x = W - b.r; b.vx *= -restitution; }
        if (b.y - b.r < 36) { b.y = b.r + 36; b.vy *= -restitution; } // OS bar
        if (b.y + b.r > H) { b.y = H - b.r; b.vy *= -restitution; }

        // Hoop collision detection
        const hoop = s.hoop;
        const hoopLeft = hoop.x - hoop.rimWidth / 2;
        const hoopRight = hoop.x + hoop.rimWidth / 2;
        const hoopY = hoop.y;

        // Score: ball passes through the rim from above
        if (!s.scored && b.vy > 0 &&
            b.y > hoopY - 5 && b.y < hoopY + 15 &&
            b.x > hoopLeft + 8 && b.x < hoopRight - 8) {
          s.scored = true;
          s.scoreFlash = 1;
          spawnConfetti(hoop.x, hoopY);
          if (onScore) onScore();
        }

        // Rim bounce (left and right rim posts)
        const rimR = 5;
        for (const rimX of [hoopLeft, hoopRight]) {
          const dx = b.x - rimX, dy = b.y - hoopY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < b.r + rimR) {
            const nx = dx / dist, ny = dy / dist;
            const dot = b.vx * nx + b.vy * ny;
            b.vx -= 2 * dot * nx * restitution;
            b.vy -= 2 * dot * ny * restitution;
            b.x = rimX + nx * (b.r + rimR + 1);
            b.y = hoopY + ny * (b.r + rimR + 1);
          }
        }
      }

      // Trail
      s.trail.push({ x: b.x, y: b.y, life: 1 });
      if (s.trail.length > 18) s.trail.shift();

      // Draw trail
      for (let i = 0; i < s.trail.length; i++) {
        const t = s.trail[i];
        t.life -= 0.06;
        if (t.life <= 0) continue;
        ctx.beginPath();
        ctx.arc(t.x, t.y, b.r * t.life * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 43, ${t.life * 0.25})`;
        ctx.fill();
      }
      s.trail = s.trail.filter(t => t.life > 0);

      // Draw hoop
      const hoop = s.hoop;
      const hL = hoop.x - hoop.rimWidth / 2;
      const hR = hoop.x + hoop.rimWidth / 2;
      const hY = hoop.y;

      // Backboard
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(hoop.x - 45, hY - 60, 90, 55);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 2;
      ctx.strokeRect(hoop.x - 45, hY - 60, 90, 55);

      // Rim
      ctx.beginPath();
      ctx.moveTo(hL, hY);
      ctx.lineTo(hR, hY);
      ctx.strokeStyle = '#ff6b2b';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Rim posts (small circles)
      for (const x of [hL, hR]) {
        ctx.beginPath();
        ctx.arc(x, hY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff6b2b';
        ctx.fill();
      }

      // Net (simple lines)
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const t = i / 4;
        const nx = hL + (hR - hL) * t;
        ctx.beginPath();
        ctx.moveTo(nx, hY);
        ctx.lineTo(hoop.x + (nx - hoop.x) * 0.5, hY + 40);
        ctx.stroke();
      }

      // Score flash effect
      if (s.scoreFlash > 0) {
        ctx.save();
        ctx.font = 'bold 60px Outfit';
        ctx.fillStyle = `rgba(57, 255, 20, ${s.scoreFlash})`;
        ctx.textAlign = 'center';
        ctx.fillText('SCORE!', hoop.x, hY + 90);
        ctx.restore();
        s.scoreFlash -= 0.02;
      }

      // Draw ball
      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      // Gradient for 3D look
      const grad = ctx.createRadialGradient(b.x - 6, b.y - 6, 2, b.x, b.y, b.r);
      grad.addColorStop(0, '#ff8c42');
      grad.addColorStop(1, '#c44d00');
      ctx.fillStyle = grad;
      ctx.fill();
      // Lines on ball
      ctx.strokeStyle = 'rgba(0,0,0,0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(b.x - b.r, b.y);
      ctx.lineTo(b.x + b.r, b.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(b.x, b.y - b.r);
      ctx.lineTo(b.x, b.y + b.r);
      ctx.stroke();
      // Glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(255, 107, 43, 0.5)';
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Draw drag arrow when dragging
      if (s.dragging) {
        const dx = s.dragStart.x - s.dragEnd.x;
        const dy = s.dragStart.y - s.dragEnd.y;
        const mag = Math.sqrt(dx * dx + dy * dy);
        if (mag > 10) {
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(b.x + dx * 0.6, b.y + dy * 0.6);
          ctx.strokeStyle = `rgba(0, 240, 255, ${Math.min(mag / 200, 0.7)})`;
          ctx.lineWidth = 3;
          ctx.setLineDash([8, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Confetti
      for (let i = s.confetti.length - 1; i >= 0; i--) {
        const c = s.confetti[i];
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.15;
        c.vx *= 0.98;
        c.life -= 0.015;
        c.rotation += c.rotSpeed;
        if (c.life <= 0) { s.confetti.splice(i, 1); continue; }
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.globalAlpha = c.life;
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
        ctx.restore();
      }

      // Hint text
      if (!s.dragging && Math.abs(b.vx) < 0.3 && Math.abs(b.vy) < 0.3) {
        ctx.save();
        ctx.font = '13px Outfit';
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.textAlign = 'center';
        ctx.fillText('drag & throw the ball 🏀', b.x, b.y + b.r + 24);
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    if (active) loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('touchstart', onDown);
      canvas.removeEventListener('touchmove', onMove);
      canvas.removeEventListener('touchend', onUp);
    };
  }, [active, onScore, spawnConfetti]);

  return (
    <div className={`basketball-canvas-wrap ${active ? 'active' : ''}`}>
      <canvas ref={canvasRef} id="basketball-canvas" />
    </div>
  );
}

import React, { useState, useCallback } from 'react';
import avatarImg from '../assets/image_0.png';

function spawnConfettiDOM(x, y) {
  const colors = ['#00f0ff', '#b84dff', '#ff6b2b', '#39ff14', '#ffd700', '#ff2d7b'];
  for (let i = 0; i < 35; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    el.style.setProperty('--dx', (Math.random() - 0.5) * 300 + 'px');
    el.style.animationDuration = (1 + Math.random()) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
}

const MILESTONES = [
  { icon: '🎓', title: 'Tel-Hai College — Year 2', desc: 'Practical Software Engineering student. Building full-stack apps, APIs, and exploring Agentic AI.' },
  { icon: '💻', title: 'Co-Founder: Galil Devs', desc: 'Running a web development agency in northern Israel, delivering real digital products to real clients.' },
  { icon: '🛍️', title: 'Co-Founder: Perfume Trades', desc: 'Built an e-commerce platform from scratch for the fragrance community — React, Node, MongoDB.' },
  { icon: '🛡️', title: 'HackerU SOC Analyst', desc: 'Certified in Security Operations — trained in threat detection, network monitoring, and incident response.' },
  { icon: '🏫', title: 'Danziger Graduate (12 yrs)', desc: 'Strong academic foundations. High-energy problem solver who thrives under pressure.' },
];

export default function ProfileCard() {
  const [spinning, setSpinning] = useState(false);

  const handleAvatarClick = useCallback((e) => {
    if (spinning) return;
    setSpinning(true);
    // Confetti from click position
    const rect = e.currentTarget.getBoundingClientRect();
    spawnConfettiDOM(rect.left + rect.width / 2, rect.top + rect.height / 2);
    setTimeout(() => setSpinning(false), 1800);
  }, [spinning]);

  return (
    <div className="profile-card-wrap" id="profile-card-container">
      <div className="profile-card glass">
        <div className="profile-glow"></div>

        <div className="avatar-container">
          <img
            src={avatarImg}
            alt="Uria Shushan"
            className={`avatar-img ${spinning ? 'spinning' : ''}`}
            onClick={handleAvatarClick}
            title="Click me! 👀"
          />
        </div>

        <h1 className="profile-name">Uria Shushan</h1>
        <p className="profile-role">Practical Software Engineer & Founder</p>
        <p className="profile-tagline">22 · Tel-Hai College · Galil Devs · Perfume Trades</p>

        <div className="milestones">
          {MILESTONES.map((m, i) => (
            <div className="milestone" key={i}>
              <div className="milestone-icon">{m.icon}</div>
              <div>
                <h4>{m.title}</h4>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

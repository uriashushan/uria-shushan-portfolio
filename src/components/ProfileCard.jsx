import React, { useRef } from 'react';
import avatarImg from '../assets/image_0.png';

export default function ProfileCard() {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.6s ease';
  };

  return (
    <div 
      ref={cardRef}
      className="glass-panel profile-card float-2"
      data-node="profile"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: 'visible' }}
    >
      <div className="profile-glow-ring"></div>
      
      <div className="profile-avatar-container">
        <img 
          src={avatarImg} 
          alt="Uria Shushan Full Body Avatar" 
          className="profile-avatar"
        />
      </div>

      <h3 className="profile-header">URIA SHUSHAN | PRACTICAL SOFTWARE ENGINEER & FOUNDER</h3>
      <h1 className="profile-name">Uria Shushan</h1>
      <p className="profile-tagline">Galil Devs & Perfume Trades Founder</p>

      <div className="profile-divider"></div>

      {/* Main Biography Milestones - High contrast, legible and organized */}
      <div className="milestones-list">
        <div className="milestone-card">
          <div className="milestone-badge">🎓</div>
          <div className="milestone-info">
            <h4 className="milestone-title">Tel-Hai College (Year 2)</h4>
            <p className="milestone-desc">Practical Software Engineering Student, focusing on backend architectures, data management, and Agentic AI applications.</p>
          </div>
        </div>

        <div className="milestone-card">
          <div className="milestone-badge">💻</div>
          <div className="milestone-info">
            <h4 className="milestone-title">Galil Devs & Perfume Trades</h4>
            <p className="milestone-desc">Co-Founder and Lead Developer. Powering digital products, customized web solutions, and fragrance e-commerce platforms.</p>
          </div>
        </div>

        <div className="milestone-card">
          <div className="milestone-badge">🛡️</div>
          <div className="milestone-info">
            <h4 className="milestone-title">HackerU Certified SOC Analyst</h4>
            <p className="milestone-desc">Security Operations Center specialist. Trained in threat mitigation, packet inspection, and monitoring networks.</p>
          </div>
        </div>

        <div className="milestone-card">
          <div className="milestone-badge">🏫</div>
          <div className="milestone-info">
            <h4 className="milestone-title">Danziger School Graduate</h4>
            <p className="milestone-desc">Completed 12 years of core study. High-energy, creating innovative software systems and resolving complex programming challenges.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

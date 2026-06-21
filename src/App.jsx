import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProfileCard from './components/ProfileCard';
import FloatingFolder from './components/FloatingFolder';
import CinematicPlayer from './components/CinematicVideoPlayer';
import BasketballGame from './components/BasketballGame';

// ═══ Skill data ═══
const SKILLS = [
  { emoji: '⚛️', name: 'React' },
  { emoji: '🟢', name: 'Node.js' },
  { emoji: '🐘', name: 'PHP' },
  { emoji: '🍃', name: 'MongoDB' },
  { emoji: '🛢️', name: 'SQL' },
  { emoji: '⚡', name: 'Vite' },
  { emoji: '☕', name: 'Java' },
  { emoji: '🐍', name: 'Python' },
  { emoji: '📱', name: 'Android' },
  { emoji: '🤖', name: 'Agentic AI' },
  { emoji: '🛡️', name: 'Cyber / SOC' },
  { emoji: '🔧', name: 'C Language' },
];

// ═══ Clock hook ═══
function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);
  return time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ═══ Scroll reveal hook ═══
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function App() {
  const [bballActive, setBballActive] = useState(false);
  const [score, setScore] = useState(0);
  const clock = useClock();

  useScrollReveal();

  const handleScore = useCallback(() => {
    setScore(s => s + 1);
  }, []);

  return (
    <>
      {/* Background */}
      <div className="os-background"></div>

      {/* OS Top Bar */}
      <header className="os-topbar">
        <div className="os-topbar-left">
          <span>⚡ URIA OS v2.0</span>
        </div>
        <div className="os-topbar-right">
          <span className="os-score">🏀 {score}</span>
          <span>{clock}</span>
        </div>
      </header>

      {/* Basketball Game Overlay */}
      <BasketballGame active={bballActive} onScore={handleScore} />

      {/* Basketball Toggle FAB */}
      <button
        className={`bball-toggle-btn ${bballActive ? 'active' : ''}`}
        onClick={() => setBballActive(!bballActive)}
        title={bballActive ? 'Exit Basketball Mode' : 'Play Basketball!'}
      >
        🏀
      </button>

      {/* Main Desktop */}
      <main className="os-desktop">

        {/* ── Hero ── */}
        <section className="hero-section">
          <h1 className="hero-title">Uria Shushan</h1>
          <p className="hero-subtitle">
            Full-Stack Developer · Startup Founder · Cybersecurity Enthusiast.
            I build products that people love, from concept to deployment.
          </p>
          <div className="hero-cta-row">
            <button className="btn-neon primary" onClick={() => {
              document.querySelector('#folders-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore My Work
            </button>
            <button className="btn-neon secondary" onClick={() => setBballActive(!bballActive)}>
              {bballActive ? '🏀 Exit Game' : '🏀 Play Basketball'}
            </button>
          </div>
        </section>

        {/* ── Profile Card ── */}
        <div className="reveal">
          <ProfileCard />
        </div>

        {/* ── Folders ── */}
        <div id="folders-section">
          <div className="section-header reveal">
            <span>📁 My Workspace</span>
          </div>

          <div className="folders-grid">

            {/* Skills Folder */}
            <div className="reveal">
              <FloatingFolder
                icon="🧠"
                iconClass="skills"
                title="Skills & Tech Stack"
                subtitle="12 technologies · Click to explore"
              >
                <div className="skills-grid">
                  {SKILLS.map((s, i) => (
                    <div className="skill-chip" key={i}>
                      <span className="skill-emoji">{s.emoji}</span>
                      <span className="skill-name">{s.name}</span>
                    </div>
                  ))}
                </div>
              </FloatingFolder>
            </div>

            {/* Projects Folder */}
            <div className="reveal">
              <FloatingFolder
                icon="🚀"
                iconClass="projects"
                title="Featured Projects"
                subtitle="2 ventures · Co-Founder"
              >
                <div className="projects-list">
                  <div className="project-card">
                    <div className="project-logo-wrap">🌐</div>
                    <div className="project-info">
                      <h4>Galil Devs</h4>
                      <p>A full-service web development agency based in Northern Israel. We design, build, and deploy custom digital solutions for businesses — from landing pages to full-stack apps.</p>
                    </div>
                  </div>
                  <div className="project-card">
                    <div className="project-logo-wrap">🧴</div>
                    <div className="project-info">
                      <h4>Perfume Trades</h4>
                      <p>An e-commerce platform for fragrance enthusiasts to buy, sell, and trade exclusive perfumes. Built with React, Node.js, and MongoDB with real-time inventory and chat.</p>
                    </div>
                  </div>
                </div>
              </FloatingFolder>
            </div>

            {/* Cinema Folder */}
            <div className="reveal">
              <FloatingFolder
                icon="🎬"
                iconClass="cinema"
                title="Cinematic Scenes"
                subtitle="Animated short film · 20 seconds"
              >
                <CinematicPlayer />
              </FloatingFolder>
            </div>

            {/* Contact / About Folder */}
            <div className="reveal">
              <FloatingFolder
                icon="📬"
                iconClass="contact"
                title="Get In Touch"
                subtitle="Let's build something together"
              >
                <div className="milestones">
                  <div className="milestone">
                    <div className="milestone-icon">📧</div>
                    <div>
                      <h4>Email</h4>
                      <p>uri8304@gmail.com</p>
                    </div>
                  </div>
                  <div className="milestone">
                    <div className="milestone-icon">🐙</div>
                    <div>
                      <h4>GitHub</h4>
                      <p>github.com/uriashushan</p>
                    </div>
                  </div>
                  <div className="milestone">
                    <div className="milestone-icon">📍</div>
                    <div>
                      <h4>Location</h4>
                      <p>Northern Israel · Available for remote work worldwide</p>
                    </div>
                  </div>
                </div>
              </FloatingFolder>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '60px 20px 20px',
          color: '#3a4458',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '1px'
        }}>
          URIA OS v2.0 · Built with React + Vite · {new Date().getFullYear()}
        </footer>

      </main>
    </>
  );
}

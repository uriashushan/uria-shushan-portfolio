import React, { useState, useEffect } from 'react';
import Basketball3D from './components/3d/Basketball3D';
import LandingBackground from './components/3d/LandingBackground';
import avatarImg from './assets/image_0.png';
import avatarFull from './assets/uria_fullbody.png';
import certImg from './assets/hackeru_cert.png';

const SKILLS_DATA = {
  tech: [
    { name: 'React', percent: 95, color: '#00f0ff', icon: '⚛️' },
    { name: 'Python', percent: 90, color: '#ffd700', icon: '🐍' },
    { name: 'Java', percent: 85, color: '#ff9800', icon: '☕' },
    { name: 'SQL', percent: 90, color: '#00bcd4', icon: '🛢️' },
    { name: 'MongoDB', percent: 85, color: '#4caf50', icon: '🍃' },
    { name: 'PHP', percent: 75, color: '#9c27b0', icon: '🐘' },
  ],
  tools: [
    { name: 'Agentic AI', percent: 90, color: '#b84dff', icon: '🤖' },
    { name: 'Cyber / SOC', percent: 85, color: '#ff6b2b', icon: '🛡️' },
    { name: 'Android', percent: 80, color: '#4caf50', icon: '📱' },
    { name: 'Linux', percent: 85, color: '#ffd700', icon: '🐧' },
    { name: 'Vite', percent: 90, color: '#00f0ff', icon: '⚡' },
    { name: 'QA', percent: 80, color: '#4caf50', icon: '✅' },
  ]
};

function useScrollReveal(activeTab) {
  useEffect(() => {
    if (activeTab !== 'desktop') return;
    let obs;
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal');
      obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      }, { threshold: 0.1 });
      els.forEach(el => obs.observe(el));
    }, 50);
    return () => {
      clearTimeout(timer);
      if (obs) obs.disconnect();
    };
  }, [activeTab]);
}

export default function App() {
  const [activeTab, setActiveTab] = useState('desktop'); 
  const [activeSkillCategory, setActiveSkillCategory] = useState('tech');
  const [scrolled, setScrolled] = useState(false);

  useScrollReveal(activeTab);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="vibrant-bg"></div>

      {/* Modern Sticky Navbar */}
      <header className={`modern-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">✨</span>
            Uria Shushan
          </div>
          <nav className="nav-links">
            <a href="#about" onClick={(e) => { if (activeTab !== 'desktop') setActiveTab('desktop'); }}>About</a>
            <a href="#skills" onClick={(e) => { if (activeTab !== 'desktop') setActiveTab('desktop'); }}>Skills</a>
            <a href="#projects" onClick={(e) => { if (activeTab !== 'desktop') setActiveTab('desktop'); }}>Projects</a>
            <button className="nav-btn-game" onClick={() => setActiveTab('3d-game')}>🏀 3D Court</button>
            <a href="#contact" className="nav-btn-contact">Contact ↗</a>
          </nav>
        </div>
      </header>

      {activeTab === 'desktop' ? (
        <main className="landing-page">
          
          {/* Hero Section with 3D Background */}
          <section className="hero-section" id="home">
            <div className="particles-overlay"></div>
            <LandingBackground />
            <div className="hero-content-split reveal" dir="rtl">
              <div className="hero-text-side">
                <h1 className="hero-title-vibrant">אוריה שושן</h1>
                <h2 className="hero-subtitle-vibrant">הנדסאי תוכנה | מפתח תוכנה</h2>
                <p className="hero-description">
                  מפתח תוכנה בעל תשוקה לטכנולוגיה ופתרון בעיות מורכבות. 
                  מתמקד בכתיבת קוד נקי, יעיל ומאובטח, תוך שימוש בטכנולוגיות מודרניות ליצירת פלטפורמות דיגיטליות איכותיות.
                </p>
                <div className="hero-cta-group">
                  <a href="#projects" className="btn-vibrant primary pulse-animation">
                    צפה בעבודות שלי
                  </a>
                  <a href="#contact" className="btn-vibrant outline">
                    צור קשר
                  </a>
                </div>
              </div>
              <div className="hero-avatar-side" dir="ltr">
                <div className="avatar-3d-wrapper">
                  <div className="avatar-3d-glow"></div>
                  <img src={avatarFull} alt="Uria Full Body Avatar" className="avatar-3d-img" />
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="lp-section reveal" id="about" dir="rtl">
            <h2 className="section-header-vibrant center">
              <span className="sh-icon">👨‍💻</span> אודות
            </h2>
            <div className="about-timeline">
              <div className="timeline-item glass-card">
                <div className="tl-icon">🎓</div>
                <div className="tl-content">
                  <h3>הנדסאי תוכנה</h3>
                  <span className="tl-date">המכללה הטכנולוגית תל-חי</span>
                  <p>לימודי הנדסאות תוכנה הכוללים למידה מעמיקה של שפות תכנות, מבני נתונים, אלגוריתמים ופיתוח פרויקטים תוכנתיים מורכבים.</p>
                </div>
              </div>
              <div className="timeline-item glass-card">
                <div className="tl-icon">🛡️</div>
                <div className="tl-content">
                  <h3>בוגר הכשרת סייבר (Cybersecurity Bootcamp)</h3>
                  <span className="tl-date">HackerU (מאי 2023)</span>
                  <p>סיום בהצלחה של הכשרה אינטנסיבית באבטחת מידע (480 שעות). הלימודים כללו הגנת רשתות, איתור חולשות ועקרונות אבטחה, הנותנים לי ערך מוסף בפיתוח תוכנה מאובטחת.</p>
                  <a href={certImg} target="_blank" rel="noopener noreferrer" className="btn-vibrant outline cert-btn">
                    📜 צפה בתעודת סיום
                  </a>
                </div>
              </div>
              <div className="timeline-item glass-card highlight">
                <div className="tl-icon">💻</div>
                <div className="tl-content">
                  <h3>פיתוח פרויקטים וניסיון מעשי</h3>
                  <span className="tl-date">פרויקטים עצמאיים</span>
                  <p>מעורב בפיתוח של פרויקטים טכנולוגיים אמיתיים (כגון פלטפורמות כדוגמת GalilDevs ו-Perfume Trades). מתכנן וכותב צד לקוח וצד שרת בסטנדרטים מקצועיים.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section (Retained layout, new colors in CSS) */}
          <section className="lp-section reveal" id="skills" style={{ textAlign: 'center' }}>
            <div className="section-header-vibrant center">
              <span className="sh-icon">⚡</span> כישורים וטכנולוגיות
            </div>
            
            <div className="skills-tabs">
              <button 
                className={`skill-tab ${activeSkillCategory === 'tools' ? 'active' : ''}`}
                onClick={() => setActiveSkillCategory('tools')}
              >
                🔧 סביבות עבודה וכלים
              </button>
              <button 
                className={`skill-tab ${activeSkillCategory === 'tech' ? 'active' : ''}`}
                onClick={() => setActiveSkillCategory('tech')}
              >
                💻 טכנולוגיות ושפות
              </button>
            </div>

            <div className="skills-grid-new" dir="ltr">
              {SKILLS_DATA[activeSkillCategory].map((s, i) => (
                <div className="skill-card-new" key={i}>
                  <div className="skill-card-top">
                    <span className="skill-percent">{s.percent}%</span>
                    <span className="skill-title">{s.name}</span>
                    <span className="skill-icon-wrap">{s.icon}</span>
                  </div>
                  <div className="skill-progress-bg">
                    <div className="skill-progress-fill" style={{ width: `${s.percent}%`, backgroundColor: s.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section - Original Holographic Design */}
          <section className="lp-section reveal" id="projects" dir="rtl">
            <div className="section-header-vibrant">
              <span className="sh-icon">🌌</span> הפרויקטים שלי
            </div>
            
            <div className="holo-projects-container">
              {/* Featured Project: GalilDevs */}
              <div className="holo-card featured">
                <div className="holo-glow"></div>
                <div className="holo-content">
                  <div className="holo-badge">הפרויקט הראשי</div>
                  <h3 className="holo-title">GalilDevs</h3>
                  <p className="holo-desc">
                    סוכנות פיתוח פרימיום לבניית מוצרי תוכנה מורכבים. אנו מתמקדים בכתיבת קוד נקי לאפליקציות מהירות, מאובטחות ומרשימות עם ביצועי שיא.
                  </p>
                  <div className="holo-tech-stack">
                    <span>React</span>
                    <span>Node.js</span>
                    <span>MongoDB</span>
                  </div>
                  <div className="holo-metrics">
                    <div className="metric">
                      <span className="m-val">100%</span>
                      <span className="m-label">קוד נקי</span>
                    </div>
                    <div className="metric">
                      <span className="m-val">99%</span>
                      <span className="m-label">ביצועים</span>
                    </div>
                  </div>
                  <a href="https://galildevs.com/" target="_blank" rel="noopener noreferrer" className="btn-vibrant primary holo-btn">
                    ביקור בפלטפורמה ↗
                  </a>
                </div>
              </div>

              {/* Secondary Project: Perfume Trades */}
              <div className="holo-card">
                <div className="holo-glow"></div>
                <div className="holo-content">
                  <div className="holo-badge">E-Commerce</div>
                  <h3 className="holo-title">Perfume Trades</h3>
                  <p className="holo-desc">
                    פלטפורמת מסחר חברתית ואיקומרס לבשמים. קנייה, מכירה והחלפה באפליקציה מהירה ומאובטחת המותאמת לעומסים וצמיחה מהירה.
                  </p>
                  <div className="holo-tech-stack">
                    <span>Expo</span>
                    <span>Firebase</span>
                    <span>React Native</span>
                  </div>
                  <a href="https://perfume-trades.com/" target="_blank" rel="noopener noreferrer" className="btn-vibrant outline holo-btn-outline" style={{ marginTop: 'auto' }}>
                    צפייה באפליקציה ↗
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="lp-section reveal" id="contact" dir="rtl">
            <div className="contact-vibrant-box glass-card">
              <div className="contact-vibrant-info">
                <h2>יצירת קשר</h2>
                <p>אני תמיד שמח להכיר אנשים חדשים, לשמוע על פרויקטים מעניינים או לדון בהזדמנויות תעסוקה.</p>
                
                <div className="contact-methods-vertical">
                  <a href="mailto:uri8304@gmail.com" className="cm-item-vertical">
                    <span className="cm-icon">📧</span>
                    <div className="cm-text">
                      <span className="cm-label">אימייל</span>
                      <span className="cm-value">uri8304@gmail.com</span>
                    </div>
                  </a>
                  
                  <div className="cm-item-vertical">
                    <span className="cm-icon">📱</span>
                    <div className="cm-text">
                      <span className="cm-label">טלפון נייד</span>
                      <span className="cm-value">058-533-0035</span>
                    </div>
                  </div>
                  
                  <a href="https://www.linkedin.com/in/uria-shushan-420431263/" target="_blank" rel="noopener noreferrer" className="cm-item-vertical">
                    <span className="cm-icon">💼</span>
                    <div className="cm-text">
                      <span className="cm-label">LinkedIn</span>
                      <span className="cm-value">Uria Shushan</span>
                    </div>
                  </a>
                </div>
              </div>
              
              <div className="contact-whatsapp-card">
                <div className="wa-card-content">
                  <h3>זמין לשיחה בווצאפ</h3>
                  <p>לקבלת מענה מהיר, אפשר לשלוח לי הודעה ישירות לווצאפ.</p>
                </div>
                <a href="https://wa.me/972585330035" target="_blank" rel="noopener noreferrer" className="btn-vibrant whatsapp pulse-animation">
                  <span className="wa-icon">💬</span> 
                  שלח הודעה בווצאפ
                </a>
              </div>
            </div>
          </section>

          <footer className="footer-vibrant" dir="rtl">
            <div className="footer-content">
              <span className="footer-text" style={{ fontSize: '1rem' }}>
                האתר נבנה ע"י <strong>אוריה שושן</strong>, מפתח תוכנה ואחד ממייסדי <a href="https://galildevs.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-cyan)', textDecoration: 'none', fontWeight: 'bold' }}>GalilDevs</a>
              </span>
              <span className="footer-text" style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '8px' }}>
                © {new Date().getFullYear()} כל הזכויות שמורות
              </span>
            </div>
          </footer>
        </main>
      ) : (
        <Basketball3D />
      )}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import Basketball3D from './components/3d/Basketball3D';
import LandingBackground from './components/3d/LandingBackground';
import avatarImg from './assets/image_0.png';

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
            <LandingBackground />
            <div className="hero-content reveal">
              <div className="hero-avatar-wrapper">
                <div className="hero-avatar-glow"></div>
                <img src={avatarImg} alt="Uria Shushan" className="hero-avatar" />
              </div>
              <h1 className="hero-title-vibrant">אוריה שושן</h1>
              <h2 className="hero-subtitle-vibrant">הנדסאי תוכנה. יזם טכנולוגי. מפתח פול-סטאק.</h2>
              <p className="hero-description">
                בונה פלטפורמות דיגיטליות שמשאירות חותם. ממשקי משתמש מטורפים, חוויות תלת-מימד (3D) ואופטימיזציית המרות (CRO) לעסקים שרוצים יותר.
              </p>
              <div className="hero-cta-group">
                <a href="#contact" className="btn-vibrant primary pulse-animation">
                  בוא נדבר על הפרויקט שלך 🚀
                </a>
                <a href="#projects" className="btn-vibrant secondary">
                  צפה בעבודות
                </a>
              </div>
            </div>
          </section>

          {/* About Me Timeline Section */}
          <section className="lp-section reveal" id="about" dir="rtl">
            <div className="section-header-vibrant">
              <span className="sh-icon">🔥</span> מי אני?
            </div>
            <div className="about-timeline">
              <div className="timeline-item glass-card">
                <div className="tl-icon">🎓</div>
                <div className="tl-content">
                  <h3>סטודנט להנדסאות תוכנה</h3>
                  <span className="tl-date">מכללת תל-חי (שנה ב')</span>
                  <p>לומד לעומק את יסודות מדעי המחשב, מבני נתונים, אלגוריתמים ופיתוח מערכות מורכבות תוך התנסות פרקטית.</p>
                </div>
              </div>
              <div className="timeline-item glass-card">
                <div className="tl-icon">🛡️</div>
                <div className="tl-content">
                  <h3>מנתח סייבר ו-SOC מוסמך</h3>
                  <span className="tl-date">HackerU</span>
                  <p>הסמכה מקצועית באבטחת מידע, ניתוח פגיעויות, הגנה על שרתים וחקירת אירועי סייבר מתקדמים.</p>
                </div>
              </div>
              <div className="timeline-item glass-card highlight">
                <div className="tl-icon">💼</div>
                <div className="tl-content">
                  <h3>מייסד שותף ויזם</h3>
                  <span className="tl-date">Galil Devs & Perfume Trades</span>
                  <p>הקמתי וניהלתי סוכנות לפיתוח אתרים שנותנת פתרונות ללקוחות אמיתיים בצפון, ופלטפורמת איקומרס ייעודית לקהילת הבישום. אני מבין ביזמות, גידול לקוחות ו-CRO מניסיון בשטח.</p>
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

          {/* Projects Section */}
          <section className="lp-section reveal" id="projects" dir="rtl">
            <div className="section-header-vibrant">
              <span className="sh-icon">🚀</span> פרויקטים נבחרים
            </div>
            <div className="lp-projects-grid">
              
              <div className="project-card-vibrant">
                <div className="pcv-content">
                  <span className="pcv-badge">Web Agency</span>
                  <h3>Galil Devs</h3>
                  <p>סוכנות פיתוח אתרים דינמית המספקת פתרונות דיגיטליים בהתאמה אישית. פיתוח מערכות פול-סטאק ללקוחות אמיתיים ברחבי הצפון עם דגש על עיצוב והמרות.</p>
                  <a href="https://galildevs.com/" target="_blank" rel="noopener noreferrer" className="btn-vibrant outline">
                    בקר באתר ↗
                  </a>
                </div>
              </div>

              <div className="project-card-vibrant">
                <div className="pcv-content">
                  <span className="pcv-badge">E-Commerce</span>
                  <h3>Perfume Trades</h3>
                  <p>פלטפורמת מסחר ואיקומרס חדשנית שנבנתה עבור קהילת חובבי הבישום. ניהול מלאי בזמן אמת, אימות משתמשים וממשק חלק ומודרני.</p>
                  <a href="https://perfume-trades.com/" target="_blank" rel="noopener noreferrer" className="btn-vibrant outline">
                    בקר באתר ↗
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* Contact Section */}
          <section className="lp-section reveal" id="contact" dir="rtl">
            <div className="contact-vibrant-box glass-card">
              <div className="contact-vibrant-info">
                <h2>מוכן לקחת את העסק שלך לשלב הבא?</h2>
                <p>אני זמין לפרויקטים חדשים, שיתופי פעולה וייעוץ דיגיטלי. בוא נדבר ונהפוך את הרעיון שלך למציאות מטורפת.</p>
                
                <div className="contact-methods">
                  <a href="mailto:uri8304@gmail.com" className="cm-item">
                    <span className="cm-icon">📧</span> uri8304@gmail.com
                  </a>
                  <a href="https://github.com/uriashushan" target="_blank" rel="noopener noreferrer" className="cm-item">
                    <span className="cm-icon">🐙</span> GitHub
                  </a>
                  <div className="cm-item">
                    <span className="cm-icon">📍</span> צפון הארץ, ישראל
                  </div>
                </div>
              </div>
              
              <div className="contact-whatsapp-card">
                <div className="wa-card-content">
                  <h3>זמין לשיחה מיידית</h3>
                  <p>רוצה להתייעץ מהר? שלח לי הודעה בוואטסאפ ונדבר על הכל.</p>
                </div>
                <a href="https://wa.me/972585330035" target="_blank" rel="noopener noreferrer" className="btn-vibrant whatsapp pulse-animation">
                  <span className="wa-icon">💬</span> 
                  התחל צ'אט בוואטסאפ
                </a>
              </div>
            </div>
          </section>

          <footer className="footer-vibrant" dir="rtl">
            <div className="footer-content">
              <span className="footer-logo">✨ Uria Shushan</span>
              <span className="footer-text">נבנה באהבה עם React, Vite & Three.js © {new Date().getFullYear()}</span>
            </div>
          </footer>
        </main>
      ) : (
        <Basketball3D />
      )}
    </>
  );
}

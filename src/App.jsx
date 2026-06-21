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
        <div className="nav-container" dir="rtl">
          <div className="nav-logo-wrap">
            <a href="#home" className="nav-logo" onClick={() => { if (activeTab !== 'desktop') setActiveTab('desktop'); }} style={{ textDecoration: 'none' }}>
              אוריה שושן
            </a>
          </div>
          
          <nav className="nav-links-center">
            <a href="#about" onClick={(e) => { if (activeTab !== 'desktop') setActiveTab('desktop'); }}>אודות</a>
            <a href="#skills" onClick={(e) => { if (activeTab !== 'desktop') setActiveTab('desktop'); }}>יכולות</a>
            <a href="#projects" onClick={(e) => { if (activeTab !== 'desktop') setActiveTab('desktop'); }}>פרויקטים</a>
          </nav>

          <div className="nav-actions">
            <button className="nav-btn-game" onClick={() => setActiveTab('3d-game')}>🏀 משחק 3D</button>
            {/* <a href="#contact" className="nav-btn-contact">צור קשר ↗</a> */}
          </div>
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
          {/* About Section - Split Layout */}
          <section className="lp-section reveal" id="about" dir="rtl">
            <div className="about-header-split">
              <span className="ah-subtitle">קצת עליי</span>
              <h2 className="ah-title">המסע המקצועי שלי</h2>
              <div className="ah-underline"></div>
            </div>

            <div className="about-split-container">
              {/* Left Side: Cards */}
              <div className="about-cards-side">
                
                <div className="about-glass-card">
                  <div className="agc-icon">🎓</div>
                  <div className="agc-content">
                    <h4>השכלה והכשרה טכנולוגית</h4>
                    <p>הנדסאי תוכנה מהמכללה הטכנולוגית תל-חי, ובוגר תוכנית סייבר יוקרתית מ-HackerU עם רקע חזק באבטחת מידע ופיתוח מאובטח.</p>
                  </div>
                </div>

                <div className="about-glass-card">
                  <div className="agc-icon">🚀</div>
                  <div className="agc-content">
                    <h4>הקמת GalilDevs</h4>
                    <p>כשותף ומייסד, אני מוביל פיתוח של מוצרי תוכנה מתקדמים, החל ממערכות ניהול לעסקים ועד לאפליקציות חכמות ומהירות.</p>
                  </div>
                </div>

                <div className="about-glass-card">
                  <div className="agc-icon">🤖</div>
                  <div className="agc-content">
                    <h4>חזון וטכנולוגיות עתיד</h4>
                    <p>חוקר ומשלב טכנולוגיות עתיד כמו Agentic AI, עם התמקדות בביצועים, אוטומציה וחוויית משתמש חלקה מבוססת 3D.</p>
                  </div>
                </div>

              </div>

              {/* Right Side: Text & Info */}
              <div className="about-text-side">
                <p>
                  היי! אני אוריה, מפתח תוכנה נלהב. מאז שכתבתי את שורת הקוד הראשונה שלי, הבנתי שהיכולת להפוך רעיונות למערכות שעובדות במציאות היא כוח אמיתי. אני אוהב לצלול לטכנולוגיות חדשות ולפתור בעיות מורכבות.
                </p>
                <p>
                  לאורך הדרך שלי, התמחיתי גם בסייבר ואבטחת מידע וגם בפיתוח Web מתקדם. השילוב הזה נתן לי פרספקטיבה ייחודית: איך לכתוב קוד שהוא גם יפהפה ומהיר, אבל קודם כל – מאובטח, יציב ואמין בכל תנאי.
                </p>
                <p>
                  עבורי, פיתוח הוא הרבה מעבר לשורות קוד קרירות. זו אומנות של יצירת חוויות למשתמשים, ומתן פתרונות דיגיטליים אמיתיים שמניעים חברות ועסקים קדימה.
                </p>
                
                <div className="about-info-divider"></div>
                
                <div className="about-personal-info">
                  <div className="api-row">
                    <span className="api-label">גיל:</span>
                    <span className="api-value">21</span>
                  </div>
                  <div className="api-row">
                    <span className="api-label">מגורים:</span>
                    <span className="api-value">קריית שמונה, ישראל</span>
                  </div>
                  <div className="api-row">
                    <span className="api-label">טלפון:</span>
                    <span className="api-value" style={{ direction: 'ltr' }}>058-533-0035</span>
                  </div>
                  <div className="api-row">
                    <span className="api-label">אימייל:</span>
                    <span className="api-value">uri8304@gmail.com</span>
                  </div>
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
            <div className="contact-epic">
              {/* Header */}
              <div className="contact-epic-header">
                <span className="ceh-tag">💬 בואו נדבר</span>
                <h2 className="ceh-title">יצירת <span className="ceh-gradient">קשר</span></h2>
                <p className="ceh-sub">אני תמיד פתוח להצעות עבודה, שיתופי פעולה ופרויקטים מעניינים. אל תהססו לפנות!</p>
              </div>

              {/* Contact Grid */}
              <div className="contact-grid">
                {/* Email Card */}
                <a href="mailto:uri8304@gmail.com" className="contact-card contact-card--email">
                  <div className="cc-glow"></div>
                  <div className="cc-icon-wrap">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <span className="cc-label">אימייל</span>
                  <span className="cc-value">uri8304@gmail.com</span>
                  <span className="cc-action">שלח אימייל →</span>
                </a>

                {/* Phone Card */}
                <div className="contact-card contact-card--phone">
                  <div className="cc-glow"></div>
                  <div className="cc-icon-wrap">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <span className="cc-label">טלפון נייד</span>
                  <span className="cc-value">058-533-0035</span>
                  <span className="cc-action">חייגו אליי</span>
                </div>

                {/* LinkedIn Card */}
                <a href="https://www.linkedin.com/in/uria-shushan-420431263/" target="_blank" rel="noopener noreferrer" className="contact-card contact-card--linkedin">
                  <div className="cc-glow"></div>
                  <div className="cc-icon-wrap">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </div>
                  <span className="cc-label">LinkedIn</span>
                  <span className="cc-value">Uria Shushan</span>
                  <span className="cc-action">צפייה בפרופיל →</span>
                </a>

                {/* GitHub Card */}
                <a href="https://github.com/uriashushan" target="_blank" rel="noopener noreferrer" className="contact-card contact-card--github">
                  <div className="cc-glow"></div>
                  <div className="cc-icon-wrap">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </div>
                  <span className="cc-label">GitHub</span>
                  <span className="cc-value">uriashushan</span>
                  <span className="cc-action">צפייה בקוד →</span>
                </a>
              </div>

              {/* WhatsApp CTA */}
              <div className="contact-wa-banner">
                <div className="wa-banner-bg"></div>
                <div className="wa-banner-content">
                  <div className="wa-banner-text">
                    <h3>⚡ זמין לשיחה מהירה?</h3>
                    <p>שלחו לי הודעה ישירה בוואטסאפ ואחזור אליכם תוך דקות.</p>
                  </div>
                  <a href="https://wa.me/972585330035" target="_blank" rel="noopener noreferrer" className="wa-banner-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    שלח הודעה בוואטסאפ
                  </a>
                </div>
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

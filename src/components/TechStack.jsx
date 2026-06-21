import React from 'react';

// Custom inline SVGs for the Tech Stack
const SVG_ICONS = {
  sql: (
    <svg className="tech-icon" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 18c-5.52 0-10-2.02-10-4.5v-3c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v3c0 2.48-4.48 4.5-10 4.5zm0-6c-5.52 0-10-2.02-10-4.5v-3c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v3c0 2.48-4.48 4.5-10 4.5z"/>
    </svg>
  ),
  mongodb: (
    <svg className="tech-icon" viewBox="0 0 24 24">
      <path d="M12 2c-.37 0-.74.15-1.02.43C9.07 4.3 6 8.35 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.65-3.07-7.7-4.98-9.57-.28-.28-.65-.43-1.02-.43zm0 2c1.23 1.34 4 4.88 4 8 0 2.21-1.79 4-4 4s-4-1.79-4-4c0-3.12 2.77-6.66 4-8zm-1 5v4h2V9h-2z"/>
    </svg>
  ),
  react: (
    <svg className="tech-icon" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.92c-.33.05-.66.08-1 .08-3.31 0-6-2.69-6-6 0-.34.03-.67.08-1H9.1c-.06.32-.1.65-.1 1 0 2.21 1.79 4 4 4 .35 0 .68-.04 1-.1v1.94zm2.14-1.28c-.5.4-.1.85-.75 1.15l-.97-1.68c.28-.16.54-.35.78-.57l.94 1.1zm2.34-2.88c-.05.33-.08.66-.08 1 0 3.31-2.69 6-6 6-.34 0-.67-.03-1-.08v-1.92c.32.06.65.1 1 .1 2.21 0 4-1.79 4-4 0-.35-.04-.68-.1-1h1.92c.05.33.08.66.08 1zM12 4c3.31 0 6 2.69 6 6 0 .34-.03.67-.08 1h-1.92c.06-.32.1-.65.1-1 0-2.21-1.79-4-4-4-.35 0-.68.04-1 .1V4.08c.33-.05.66-.08 1-.08z"/>
    </svg>
  ),
  vite: (
    <svg className="tech-icon" viewBox="0 0 24 24">
      <path d="M22 4l-9.5 18L3 4h19zM12 6.4L7.5 15h9L12 6.4zm-1 5.6h2v2h-2v-2z"/>
    </svg>
  ),
  php: (
    <svg className="tech-icon" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 8c.83 0 1.5.67 1.5 1.5S9.83 13 9 13H8v2H6v-6h3zm6 0c.83 0 1.5.67 1.5 1.5S15.83 13 15 13h-1v2h-2v-6h3zm-6 2c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H8v1h1zm6 0c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1v1h1z"/>
    </svg>
  ),
  xml: (
    <svg className="tech-icon" viewBox="0 0 24 24">
      <path d="M14.6 19l-1.4-1.4L17.2 14l-4-4 1.4-1.4L20 14l-5.4 5zM9.4 19L4 14l5.4-5 1.4 1.4-4 4 4 4.2L9.4 19zm2.1-1.2l3-11.6h1.9l-3 11.6H11.5z"/>
    </svg>
  ),
  android: (
    <svg className="tech-icon" viewBox="0 0 24 24">
      <path d="M17.53 11.2c-.44 0-.8-.36-.8-.8V6.8c0-.44.36-.8.8-.8s.8.36.8.8v3.6c0 .44-.36.8-.8.8zM6.47 11.2c-.44 0-.8-.36-.8-.8V6.8c0-.44.36-.8.8-.8s.8.36.8.8v3.6c0 .44-.36.8-.8.8zM12 3c-4.42 0-8 3.58-8 8v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-4.42-3.58-8-8-8zm-3.5 9c-.83 0-1.5-.67-1.5-1.5S7.67 9 8.5 9s1.5.67 1.5 1.5S9.33 12 8.5 12zm7 0c-.83 0-1.5-.67-1.5-1.5S14.67 9 15.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  ),
  ai: (
    <svg className="tech-icon" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
    </svg>
  ),
  java: (
    <svg className="tech-icon" viewBox="0 0 24 24">
      <path d="M2 15.5c0 1.38 1.12 2.5 2.5 2.5h15c1.38 0 2.5-1.12 2.5-2.5V14H2v1.5zM19.5 4h-15C3.12 4 2 5.12 2 6.5V12h20V6.5C22 5.12 20.88 4 19.5 4zM9 10H5V8h4v2zm10 0h-8V8h8v2z"/>
    </svg>
  ),
  python: (
    <svg className="tech-icon" viewBox="0 0 24 24">
      <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13H7v-2h6v2zm4-4H7V9h10v2z"/>
    </svg>
  ),
  c: (
    <svg className="tech-icon" viewBox="0 0 24 24">
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-6h2c1.657 0 3-1.343 3-3s-1.343-3-3-3h-2v6zm0-8h2c1.105 0 2-.895 2-2s-.895-2-2-2h-2v4z"/>
    </svg>
  ),
  cyber: (
    <svg className="tech-icon" viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>
  )
};

const TECH_ITEMS = [
  { name: 'SQL', icon: SVG_ICONS.sql, color: '#4facfe' },
  { name: 'MongoDB', icon: SVG_ICONS.mongodb, color: '#00ff87' },
  { name: 'React', icon: SVG_ICONS.react, color: '#00f2fe' },
  { name: 'Vite', icon: SVG_ICONS.vite, color: '#b927fc' },
  { name: 'PHP', icon: SVG_ICONS.php, color: '#4facfe' },
  { name: 'XML', icon: SVG_ICONS.xml, color: '#b927fc' },
  { name: 'Android', icon: SVG_ICONS.android, color: '#00ff87' },
  { name: 'Agentic AI', icon: SVG_ICONS.ai, color: '#ffd700' },
  { name: 'Java (Eclipse/IntelliJ)', icon: SVG_ICONS.java, color: '#ffd700' },
  { name: 'Python (Spyder)', icon: SVG_ICONS.python, color: '#4facfe' },
  { name: 'C Language', icon: SVG_ICONS.c, color: '#b927fc' },
  { name: 'Cyber Security (SOC)', icon: SVG_ICONS.cyber, color: '#00ff87' }
];

export default function TechStack() {
  return (
    <div className="glass-panel panel-section" data-node="tech">
      <h3 className="section-title">Tech Stack</h3>
      <div className="tech-grid">
        {TECH_ITEMS.map((item, idx) => (
          <div 
            key={idx} 
            className="tech-badge"
            style={{ '--hover-clr': item.color }}
            title={`Skill: ${item.name}`}
          >
            {item.icon}
            <span className="tech-name">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

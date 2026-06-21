import React from 'react';

// Custom designed SVGs for Projects
const GalilDevsLogo = () => (
  <svg className="project-logo" viewBox="0 0 32 32">
    <defs>
      <linearGradient id="galilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b927fc" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
    </defs>
    {/* Geometric interlocking shapes representing G and D */}
    <path 
      d="M6 16C6 10.48 10.48 6 16 6c3.2 0 6.04 1.5 7.87 3.86l-2.4 1.8A7.012 7.012 0 0 0 16 9c-3.86 0-7 3.14-7 7s3.14 7 7 7c2.1 0 3.97-1.12 5.05-2.8l2.4 1.8A9.914 9.914 0 0 1 16 26C10.48 26 6 21.52 6 16z" 
      fill="url(#galilGrad)" 
    />
    <path 
      d="M18 10h6v12h-6V10zm2 2v8h2v-8h-2z" 
      fill="url(#galilGrad)" 
      opacity="0.85" 
    />
  </svg>
);

const PerfumeBottleIcon = () => (
  <svg className="project-logo" viewBox="0 0 32 32">
    <defs>
      <linearGradient id="perfumeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffd700" />
        <stop offset="100%" stopColor="#ff7b72" />
      </linearGradient>
    </defs>
    {/* Spray nozzle */}
    <path d="M14 6h4v3h-4V6z" fill="#ffd700" />
    <path d="M12 9h8v2h-8V9z" fill="#e5c100" />
    {/* Cap spray head */}
    <circle cx="16" cy="4" r="2" fill="#ffd700" />
    {/* Atomized perfume droplets */}
    <circle cx="9" cy="3" r="1.2" fill="#00f2fe" opacity="0.6" />
    <circle cx="6" cy="6" r="0.8" fill="#00f2fe" opacity="0.8" />
    <circle cx="10" cy="7" r="1" fill="#ffd700" opacity="0.5" />
    {/* Main glass bottle */}
    <rect x="9" y="11" width="14" height="15" rx="3" fill="url(#perfumeGrad)" />
    {/* Inner fluid level */}
    <rect x="11" y="14" width="10" height="10" rx="1" fill="#fff" opacity="0.2" />
    {/* Label on the bottle */}
    <rect x="12" y="17" width="8" height="4" rx="0.5" fill="#111930" opacity="0.8" />
    <line x1="14" y1="19" x2="18" y2="19" stroke="#ffd700" strokeWidth="1" />
  </svg>
);

const PROJECT_LIST = [
  {
    title: 'Galil Devs',
    description: 'A dynamic web development agency providing custom digital solutions, robust application architectures, and localized web engineering.',
    logo: <GalilDevsLogo />,
    link: '#galil-devs'
  },
  {
    title: 'Perfume Trades',
    description: 'An e-commerce platform designed for perfume enthusiasts to buy, sell, trade, and discover exclusive fragrances with modern product visualizers.',
    logo: <PerfumeBottleIcon />,
    link: '#perfume-trades'
  }
];

export default function Projects() {
  return (
    <div className="glass-panel panel-section" data-node="projects">
      <h3 className="section-title" style={{ borderLeftColor: 'var(--clr-teal)' }}>
        Featured Projects
      </h3>
      <div className="projects-container">
        {PROJECT_LIST.map((proj, idx) => (
          <a 
            href={proj.link} 
            key={idx} 
            className="project-card-link" 
            style={{ textDecoration: 'none' }}
          >
            <div className="project-card">
              <div className="project-logo-container">
                {proj.logo}
              </div>
              <div className="project-details">
                <h4 className="project-title">{proj.title}</h4>
                <p className="project-desc">{proj.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

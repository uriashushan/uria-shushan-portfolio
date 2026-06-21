import React, { useState } from 'react';

export default function FloatingFolder({ icon, iconClass, title, subtitle, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`folder glass ${isOpen ? 'open' : ''}`}>
      <div className="folder-header" onClick={() => setIsOpen(!isOpen)}>
        <div className={`folder-icon ${iconClass || ''}`}>
          {icon}
        </div>
        <div className="folder-label">
          <span className="folder-title">{title}</span>
          <span className="folder-subtitle">{subtitle}</span>
        </div>
        <span className="folder-toggle">▶</span>
      </div>
      <div className="folder-content">
        {children}
      </div>
    </div>
  );
}

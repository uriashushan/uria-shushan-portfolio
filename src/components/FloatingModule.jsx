import React, { useRef } from 'react';

export default function FloatingModule({ 
  children, 
  title, 
  editor = 'vscode', 
  animationClass = 'float-1', 
  nodeId,
  style = {},
  onClose
}) {
  const cardRef = useRef(null);

  // Mouse hover 3D tilt effect
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation degree based on mouse offset from center (max 10deg)
    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Reset rotation and apply float animation back
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s ease';
  };

  // Determine window layout configurations
  let editorName = 'VS Code';
  let tabIcon = '📄';
  
  if (editor === 'intellij') {
    editorName = 'IntelliJ IDEA';
    tabIcon = '☕';
  } else if (editor === 'spyder') {
    editorName = 'Spyder IDE';
    tabIcon = '🐍';
  } else if (editor === 'db') {
    editorName = 'Database Schema Viewer';
    tabIcon = '🛢️';
  } else if (editor === 'xml') {
    editorName = 'XML Schema Editor';
    tabIcon = '🧬';
  }

  return (
    <div 
      ref={cardRef}
      className={`ide-window ${animationClass}`}
      data-node={nodeId}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="ide-header">
        <div className="ide-controls">
          <span className="ide-dot red" onClick={onClose} style={{ cursor: 'pointer' }} title="Minimize Window"></span>
          <span className="ide-dot yellow"></span>
          <span className="ide-dot green"></span>
        </div>
        <div className="ide-title">
          <span>{tabIcon}</span>
          <span>{editorName} - {title}</span>
        </div>
        <div style={{ width: '40px' }}></div> {/* Spacer */}
      </div>

      <div className="ide-tabs">
        <div className="ide-tab active">
          <span>{tabIcon}</span>
          <span>{title}</span>
        </div>
      </div>

      <div className="ide-content">
        {children}
      </div>
    </div>
  );
}

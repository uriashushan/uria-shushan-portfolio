import React, { useState } from 'react';
import NetworkCanvas from './components/NetworkCanvas';
import FloatingModule from './components/FloatingModule';
import ProfileCard from './components/ProfileCard';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import CinematicVideoPlayer from './components/CinematicVideoPlayer';

export default function App() {
  // OS-Style App Dashboard Toggles
  const [openApps, setOpenApps] = useState({
    java: true,
    db: true,
    cyber: true,
    ai: true,
    xml: true,
    python: true,
    react: true,
    movie: true
  });

  const toggleApp = (appId) => {
    setOpenApps(prev => ({
      ...prev,
      [appId]: !prev[appId]
    }));
  };

  const closeApp = (appId) => {
    setOpenApps(prev => ({
      ...prev,
      [appId]: false
    }));
  };

  return (
    <>
      {/* Background digital grid and canvas */}
      <div className="bg-grid"></div>
      <div className="glow-spot" style={{ top: '10%', left: '15%', background: 'var(--clr-teal)' }}></div>
      <div className="glow-spot" style={{ bottom: '20%', right: '10%', background: 'var(--clr-purple)' }}></div>
      <NetworkCanvas />

      <main className="dashboard-layout" style={{ paddingBottom: '100px' }}>
        
        {/* LEFT COLUMN: Floating Developer Modules */}
        <section className="column">
          
          {/* Java Block in IntelliJ */}
          <div className={openApps.java ? "" : "app-hidden"}>
            <FloatingModule 
              title="UriaShushan.java" 
              editor="intellij" 
              animationClass="float-1" 
              nodeId="java"
              onClose={() => closeApp('java')}
            >
              <pre style={{ margin: 0, overflowX: 'auto' }}>
                <code>
                  <span className="keyword">package</span> college.telhai.uria;<br /><br />
                  <span className="keyword">public class</span> <span className="class-name">UriaShushan</span> &#123;<br />
                  &nbsp;&nbsp;<span className="keyword">private String</span> college = <span className="string">"Tel-Hai"</span>;<br />
                  &nbsp;&nbsp;<span className="keyword">private int</span> age = <span className="number">22</span>;<br /><br />
                  &nbsp;&nbsp;<span className="keyword">public static void</span> <span className="method">main</span>(String[] args) &#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="class-name">Founder</span> galilDevs = <span className="keyword">new</span> <span className="class-name">Founder</span>(<span className="string">"Galil Devs"</span>);<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(<span className="string">"Creating innovative solutions!"</span>);<br />
                  &nbsp;&nbsp;&#125;<br />
                  &#125;
                </code>
              </pre>
            </FloatingModule>
          </div>

          {/* Database visualizer with SQL queries */}
          <div className={openApps.db ? "" : "app-hidden"}>
            <FloatingModule 
              title="founders_query.sql" 
              editor="db" 
              animationClass="float-3" 
              nodeId="db"
              onClose={() => closeApp('db')}
            >
              <pre style={{ margin: 0, overflowX: 'auto', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', marginBottom: '10px' }}>
                <code>
                  <span className="comment">-- Fetch Uria's co-founded initiatives</span><br />
                  <span className="keyword">SELECT</span> id, name, type, status <br />
                  <span className="keyword">FROM</span> initiatives <br />
                  <span className="keyword">WHERE</span> founder = <span className="string">'Uria Shushan'</span>;<br />
                </code>
              </pre>
              {/* Styled database table visualizer */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#8b949e' }}>
                      <th style={{ padding: '4px' }}>id</th>
                      <th style={{ padding: '4px' }}>name</th>
                      <th style={{ padding: '4px' }}>type</th>
                      <th style={{ padding: '4px' }}>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '4px', color: 'var(--clr-gold)' }}>1</td>
                      <td style={{ padding: '4px', fontWeight: 'bold' }}>Galil Devs</td>
                      <td style={{ padding: '4px', color: '#c9d1d9' }}>Web Agency</td>
                      <td style={{ padding: '4px', color: 'var(--clr-green)' }}>ACTIVE</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '4px', color: 'var(--clr-gold)' }}>2</td>
                      <td style={{ padding: '4px', fontWeight: 'bold' }}>Perfume Trades</td>
                      <td style={{ padding: '4px', color: '#c9d1d9' }}>E-Commerce</td>
                      <td style={{ padding: '4px', color: 'var(--clr-green)' }}>ACTIVE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </FloatingModule>
          </div>

          {/* Cybersecurity Shield Widget */}
          <div 
            className={`shield-widget float-2 ${openApps.cyber ? "" : "app-hidden"}`} 
            data-node="cyber"
            style={{ position: 'relative' }}
          >
            <button 
              onClick={() => closeApp('cyber')} 
              style={{ 
                position: 'absolute', 
                top: '8px', 
                right: '12px', 
                background: 'none', 
                border: 'none', 
                color: '#8b949e', 
                cursor: 'pointer', 
                fontSize: '11px' 
              }}
              title="Minimize Widget"
            >
              ✕
            </button>
            <div className="shield-icon-container">
              <svg style={{ width: '24px', height: '24px', fill: 'var(--clr-green)' }} viewBox="0 0 24 24">
                <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/>
              </svg>
            </div>
            <div className="shield-details">
              <span className="shield-title">Cyber Security Operations</span>
              <span className="shield-status">● SOC Analyst | HackerU Certified</span>
              <div style={{ fontSize: '9px', color: '#8b949e', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                [SECURED] Firewall integrity 100%<br />
                [MONITOR] Threat detection active
              </div>
            </div>
          </div>

        </section>

        {/* CENTER COLUMN: Central Profile & Interactive Elements */}
        <section className="column center-column">
          
          <ProfileCard />

          {/* Artificial Intelligence Network Widget */}
          <div 
            className={`ai-network-widget float-1 ${openApps.ai ? "" : "app-hidden"}`} 
            data-node="ai" 
            style={{ width: '100%', maxWidth: '480px', position: 'relative' }}
          >
            <button 
              onClick={() => closeApp('ai')} 
              style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '14px', 
                background: 'none', 
                border: 'none', 
                color: '#8b949e', 
                cursor: 'pointer', 
                fontSize: '11px' 
              }}
              title="Minimize Widget"
            >
              ✕
            </button>
            <div className="ai-header">
              <div className="ai-title">
                <span style={{ color: 'var(--clr-purple)' }}>🧠</span>
                <span>Agentic AI System</span>
              </div>
              <span style={{ fontSize: '10px', color: 'var(--clr-green)', fontFamily: 'var(--font-mono)' }}>CONNECTIVITY: ACTIVE</span>
            </div>
            
            <div className="ai-nodes">
              {/* Connecting line */}
              <div style={{ 
                position: 'absolute', 
                top: '14px', 
                left: '20px', 
                right: '20px', 
                height: '2px', 
                background: 'linear-gradient(90deg, var(--clr-teal), var(--clr-purple), var(--clr-green))', 
                opacity: 0.3,
                zIndex: 1
              }}></div>
              
              <div className="ai-node-circle" title="Input Agent" style={{ backgroundColor: 'var(--clr-teal)', boxShadow: '0 0 10px var(--clr-teal)' }}></div>
              <div className="ai-node-circle" title="Reasoning Engine" style={{ backgroundColor: 'var(--clr-purple)', boxShadow: '0 0 10px var(--clr-purple)' }}></div>
              <div className="ai-node-circle" title="Execution Agent" style={{ backgroundColor: 'var(--clr-green)', boxShadow: '0 0 10px var(--clr-green)' }}></div>
            </div>
            
            <div style={{ fontSize: '10px', color: '#8b949e', fontFamily: 'var(--font-mono)', marginTop: '10px', textAlign: 'center' }}>
              Nodes listening to input streams. Triggering adaptive automations.
            </div>
          </div>

          {/* XML Schema Diagram */}
          <div className={openApps.xml ? "" : "app-hidden"} style={{ width: '100%', maxWidth: '480px' }}>
            <FloatingModule 
              title="college_schema.xsd" 
              editor="xml" 
              animationClass="float-2" 
              nodeId="xml"
              onClose={() => closeApp('xml')}
            >
              <div className="xml-tree">
                &lt;<span className="keyword">xs:element</span> <span className="attr">name</span>=<span className="string">"UriaShushan"</span>&gt;
                <div className="xml-indent">
                  &lt;<span className="keyword">xs:complexType</span>&gt;
                  <div className="xml-indent">
                    &lt;<span className="keyword">xs:sequence</span>&gt;
                    <div className="xml-indent">
                      &lt;<span className="keyword">xs:element</span> <span className="attr">name</span>=<span className="string">"college"</span> <span className="attr">type</span>=<span className="string">"xs:string"</span> <span className="attr">fixed</span>=<span className="string">"Tel-Hai"</span> /&gt;<br />
                      &lt;<span className="keyword">xs:element</span> <span className="attr">name</span>=<span className="string">"year"</span> <span className="attr">type</span>=<span className="string">"xs:integer"</span> <span className="attr">fixed</span>=<span className="string">"2"</span> /&gt;
                    </div>
                    &lt;/<span className="keyword">xs:sequence</span>&gt;
                  </div>
                  &lt;/<span className="keyword">xs:complexType</span>&gt;
                </div>
                &lt;/<span className="keyword">xs:element</span>&gt;
              </div>
            </FloatingModule>
          </div>

          {/* Uria Shushan Cinematic Movie Scenes Player */}
          <div className={openApps.movie ? "" : "app-hidden"} style={{ width: '100%', maxWidth: '480px' }}>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => closeApp('movie')} 
                style={{ 
                  position: 'absolute', 
                  top: '-20px', 
                  right: '4px', 
                  background: 'none', 
                  border: 'none', 
                  color: '#8b949e', 
                  cursor: 'pointer', 
                  fontSize: '11px',
                  zIndex: 20
                }}
                title="Minimize Cinematic Player"
              >
                ✕ Minimize Player
              </button>
              <CinematicVideoPlayer />
            </div>
          </div>

        </section>

        {/* RIGHT COLUMN: Skills & Featured Projects */}
        <section className="column">
          
          <TechStack />
          
          <Projects />

          {/* Python Script with Spyder interface */}
          <div className={openApps.python ? "" : "app-hidden"}>
            <FloatingModule 
              title="ai_pipeline.py" 
              editor="spyder" 
              animationClass="float-3" 
              nodeId="python"
              onClose={() => closeApp('python')}
            >
              <pre style={{ margin: 0, overflowX: 'auto' }}>
                <code>
                  <span className="keyword">import</span> numpy <span className="keyword">as</span> np<br />
                  <span className="keyword">from</span> telhai <span className="keyword">import</span> academic_networks<br /><br />
                  <span className="keyword">def</span> <span className="method">init_nodes</span>():<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="string">"Initializing Spyder environment for Uria..."</span>)<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;nodes = np.random.rand(<span className="number">10</span>, <span className="number">10</span>)<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">return</span> academic_networks.build(nodes)<br /><br />
                  init_nodes()
                </code>
              </pre>
            </FloatingModule>
          </div>

          {/* React Component Block */}
          <div className={openApps.react ? "" : "app-hidden"}>
            <FloatingModule 
              title="PerfumeTrades.jsx" 
              editor="vscode" 
              animationClass="float-1" 
              nodeId="react"
              onClose={() => closeApp('react')}
            >
              <pre style={{ margin: 0, overflowX: 'auto' }}>
                <code>
                  <span className="keyword">import</span> React, &#123; useState &#125; <span className="keyword">from</span> <span className="string">'react'</span>;<br /><br />
                  <span className="keyword">export default function</span> <span className="class-name">PerfumeTrades</span>() &#123;<br />
                  &nbsp;&nbsp;<span className="keyword">const</span> [activeTrade, setActive] = useState(<span className="keyword">true</span>);<br /><br />
                  &nbsp;&nbsp;<span className="keyword">return</span> (<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">div</span> <span className="attr">className</span>=<span className="string">"trades-container"</span>&gt;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">BottleIcon</span> <span className="attr">glow</span>=&#123;activeTrade&#125; /&gt;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">p</span>&gt;Uria's E-Commerce Platform&lt;/<span className="tag">p</span>&gt;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="tag">div</span>&gt;<br />
                  &nbsp;&nbsp;);<br />
                  &#125;
                </code>
              </pre>
            </FloatingModule>
          </div>

        </section>

      </main>

      {/* Interactive OS App Dock */}
      <div className="app-dock">
        <div className="dock-item" onClick={() => toggleApp('java')}>
          <span className="dock-icon">☕</span>
          <span className="dock-label">UriaShushan.java</span>
          {openApps.java && <span className="dock-dot"></span>}
        </div>
        <div className="dock-item" onClick={() => toggleApp('db')}>
          <span className="dock-icon">🛢️</span>
          <span className="dock-label">founders_query.sql</span>
          {openApps.db && <span className="dock-dot"></span>}
        </div>
        <div className="dock-item" onClick={() => toggleApp('cyber')}>
          <span className="dock-icon">🛡️</span>
          <span className="dock-label">SOC Operations</span>
          {openApps.cyber && <span className="dock-dot"></span>}
        </div>
        <div className="dock-item" onClick={() => toggleApp('ai')}>
          <span className="dock-icon">🧠</span>
          <span className="dock-label">Agentic AI</span>
          {openApps.ai && <span className="dock-dot"></span>}
        </div>
        <div className="dock-item" onClick={() => toggleApp('xml')}>
          <span className="dock-icon">🧬</span>
          <span className="dock-label">college_schema.xsd</span>
          {openApps.xml && <span className="dock-dot"></span>}
        </div>
        <div className="dock-item" onClick={() => toggleApp('movie')}>
          <span className="dock-icon">🎬</span>
          <span className="dock-label">Cinematic Scenes</span>
          {openApps.movie && <span className="dock-dot"></span>}
        </div>
        <div className="dock-item" onClick={() => toggleApp('python')}>
          <span className="dock-icon">🐍</span>
          <span className="dock-label">ai_pipeline.py</span>
          {openApps.python && <span className="dock-dot"></span>}
        </div>
        <div className="dock-item" onClick={() => toggleApp('react')}>
          <span className="dock-icon">⚛️</span>
          <span className="dock-label">PerfumeTrades.jsx</span>
          {openApps.react && <span className="dock-dot"></span>}
        </div>
      </div>
    </>
  );
}

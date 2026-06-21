import React, { useState, useEffect } from 'react';
import bballImg from '../assets/uria_basketball.png';
import codingImg from '../assets/uria_coding.png';

export default function CinematicPlayer() {
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => {
      setTime(t => t >= 20 ? 0 : Math.round((t + 0.1) * 10) / 10);
    }, 100);
    return () => clearInterval(iv);
  }, [playing]);

  const scene1 = time < 10;
  const pct = (time / 20) * 100;
  const fmt = (t) => {
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    const d = Math.floor((t % 1) * 10);
    return `00:${s}.${d}`;
  };

  return (
    <div className="cinema-content">
      <div className="movie-player">
        <div className="movie-screen">
          <div className="movie-hud">
            <div className="rec-dot"></div>
            <span>URIA_SHORT.mov</span>
          </div>
          <div className="movie-label">
            {scene1 ? 'Scene 1 · Basketball Court Fall' : 'Scene 2 · Late-Night Coding Focus'}
          </div>
          <img src={bballImg} alt="Basketball scene" className={`movie-frame ${scene1 ? 'active' : ''}`} />
          <img src={codingImg} alt="Coding scene" className={`movie-frame ${!scene1 ? 'active' : ''}`} />
        </div>
        <div className="movie-controls">
          <div className="movie-progress">
            <div className="movie-progress-fill" style={{ width: `${pct}%` }}></div>
          </div>
          <div className="movie-bar">
            <div className="movie-bar-left">
              <button className="movie-btn" onClick={() => setPlaying(!playing)}>
                {playing ? '⏸' : '▶'}
              </button>
              <span className="movie-time">{fmt(time)} / 00:20.0</span>
            </div>
            <span className="movie-scene-label">{scene1 ? '🏀 Scene 1' : '💻 Scene 2'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

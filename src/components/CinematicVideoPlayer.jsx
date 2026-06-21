import React, { useState, useEffect } from 'react';
import bballImg from '../assets/uria_basketball.png';
import codingImg from '../assets/uria_coding.png';

export default function CinematicVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 20 seconds

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 20) {
            return 0; // Loop back
          }
          return Math.round((prev + 0.1) * 10) / 10;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Determine active scene based on time (Scene 1: 0-10s, Scene 2: 10-20s)
  const isSceneOne = currentTime < 10;
  const progressPercent = (currentTime / 20) * 100;

  // Format time (e.g. 00:04.2)
  const formatTime = (time) => {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = String(Math.floor(time % 60)).padStart(2, '0');
    const ms = String(Math.floor((time % 1) * 10));
    return `${min}:${sec}.${ms}`;
  };

  return (
    <div className="glass-panel movie-player-container float-3" data-node="projects" style={{ marginTop: '24px' }}>
      <div className="movie-viewscreen">
        {/* Blinking REC Status overlay */}
        <div className="movie-overlay-status">
          <div className="movie-rec-dot"></div>
          <span>REC: URIA_SHORT_FILM.mov</span>
        </div>

        {/* Dynamic Scene Labels */}
        <div className="movie-overlay-label">
          {isSceneOne 
            ? "Scene 1: Dynamic Fall on Basketball Court" 
            : "Scene 2: Dim Glow Code Concentration"
          }
        </div>

        {/* Pre-rendered cinematic scenes with cross dissolves */}
        <img 
          src={bballImg} 
          alt="Scene 1: Uria falling on basketball court" 
          className={`movie-frame ${isSceneOne ? 'active' : ''}`}
        />
        <img 
          src={codingImg} 
          alt="Scene 2: Uria coding in dark room" 
          className={`movie-frame ${!isSceneOne ? 'active' : ''}`}
        />
      </div>

      {/* Control bar interface */}
      <div className="movie-controls">
        <div className="movie-timeline-wrapper">
          <div 
            className="movie-timeline-progress" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="movie-buttons-row">
          <div className="movie-left-controls">
            <button 
              className="movie-btn" 
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <span className="movie-time-display">
              {formatTime(currentTime)} / 00:20.0
            </span>
          </div>

          <div className="movie-scene-tag">
            {isSceneOne ? "🏀 SCENE 1" : "💻 SCENE 2"}
          </div>
        </div>
      </div>
    </div>
  );
}

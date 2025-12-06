'use client';

import { useState, useEffect } from 'react';

/**
 * Panel - Bottom/top panel with app launcher, clock, workspace switcher, system tray
 */
export default function Panel({ 
  position = 'bottom',
  onLaunchMenu,
  openWindows = [],
  onWindowActivate,
  currentWorkspace = 0,
  onWorkspaceChange,
  workspaces = ['1', '2', '3', '4']
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const positionClass = position === 'bottom' ? 'bottom-0' : 'top-0';

  return (
    <div 
      className={`fixed left-0 right-0 ${positionClass} z-[9999] flex items-center gap-1 px-1 py-0.5 bg-panel border-t-2 border-l-2 border-r-2 border-b-2 no-select`}
      style={{
        height: '32px',
        borderColor: 'var(--panel-border-light) var(--panel-border-dark) var(--panel-border-dark) var(--panel-border-light)'
      }}
      role="toolbar"
      aria-label="Desktop panel"
    >
      {/* App Launcher Button */}
      <button
        onClick={onLaunchMenu}
        className="retro-button px-3 py-1 text-xs font-bold flex items-center gap-1 h-6"
        aria-label="Application menu"
        title="Application menu"
      >
        <span>🐧</span>
        <span>Start</span>
      </button>

      {/* Separator */}
      <div 
        className="w-px h-5 mx-1"
        style={{
          background: 'linear-gradient(to bottom, var(--button-shadow), var(--button-highlight))'
        }}
      />

      {/* Open Windows - Taskbar buttons */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto">
        {openWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowActivate(window.id)}
            className={`retro-button px-2 py-1 text-xs h-6 min-w-[120px] max-w-[180px] truncate flex items-center gap-1 ${
              window.isActive ? 'border-btn-dark' : ''
            }`}
            style={window.isActive ? {
              borderColor: 'var(--button-dark-shadow) var(--button-highlight) var(--button-highlight) var(--button-dark-shadow)',
              padding: '3px 7px 1px 9px'
            } : {}}
            aria-label={`Switch to ${window.title}`}
            title={window.title}
          >
            <span className="text-xs">{window.icon || '📄'}</span>
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* Separator */}
      <div 
        className="w-px h-5 mx-1"
        style={{
          background: 'linear-gradient(to bottom, var(--button-shadow), var(--button-highlight))'
        }}
      />

      {/* Workspace Switcher */}
      <div className="flex items-center gap-0.5 px-1">
        {workspaces.map((ws, index) => (
          <button
            key={index}
            onClick={() => onWorkspaceChange(index)}
            className={`retro-button px-2 py-0 text-xs h-6 w-6 ${
              currentWorkspace === index ? 'border-btn-dark' : ''
            }`}
            style={currentWorkspace === index ? {
              borderColor: 'var(--button-dark-shadow) var(--button-highlight) var(--button-highlight) var(--button-dark-shadow)',
              padding: '3px 7px 1px 9px'
            } : {}}
            aria-label={`Switch to workspace ${ws}`}
            aria-pressed={currentWorkspace === index}
            title={`Workspace ${ws}`}
          >
            {ws}
          </button>
        ))}
      </div>

      {/* Separator */}
      <div 
        className="w-px h-5 mx-1"
        style={{
          background: 'linear-gradient(to bottom, var(--button-shadow), var(--button-highlight))'
        }}
      />

      {/* System Tray */}
      <div className="flex items-center gap-1 px-1">
        <span className="text-xs" title="Volume">🔊</span>
        <span className="text-xs" title="Network">📶</span>
      </div>

      {/* Clock */}
      <div 
        className="retro-border-in px-3 py-1 text-xs h-6 flex items-center gap-2 bg-window"
        role="timer"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="font-mono tabular-nums">{formatTime(currentTime)}</span>
        <span className="text-[10px] text-gray-600">{formatDate(currentTime)}</span>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';

/**
 * MenuLauncher - Start menu style application launcher
 */
export default function MenuLauncher({ isOpen, onClose, onLaunchApp, position = { x: 0, y: 0 } }) {
  const menuRef = useRef(null);

  const apps = [
    // Portfolio - Classic folder/file style
    { id: 'about', name: 'About.txt', icon: '📄', category: 'Portfolio' },
    { id: 'projects', name: 'Projects', icon: '📁', category: 'Portfolio' },
    { id: 'experience', name: 'Experience', icon: '📁', category: 'Portfolio' },
    { id: 'resume', name: 'Resume.pdf', icon: '📋', category: 'Portfolio' },
    { id: 'contact', name: 'Contact.txt', icon: '📧', category: 'Portfolio' },
    // System
    { id: 'terminal', name: 'Terminal', icon: '💻', category: 'System' },
    { id: 'filemanager', name: 'My Computer', icon: '🖥️', category: 'System' },
    { id: 'settings', name: 'Settings', icon: '⚙️', category: 'System' },
    // Accessories
    { id: 'calculator', name: 'Calculator', icon: '🧮', category: 'Accessories' },
    { id: 'text-editor', name: 'Text Editor', icon: '📝', category: 'Accessories' },
  ];

  // Group apps by category
  const categories = apps.reduce((acc, app) => {
    if (!acc[app.category]) {
      acc[app.category] = [];
    }
    acc[app.category].push(app);
    return acc;
  }, {});

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAppClick = (appId, appName) => {
    onLaunchApp(appId, appName);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="fixed bg-panel retro-border-window shadow-lg z-[10001]"
      style={{
        left: `${position.x}px`,
        bottom: `${position.y}px`,
        width: '280px',
        maxHeight: '500px'
      }}
      role="menu"
      aria-label="Application menu"
    >
      {/* Menu header */}
      <div className="bg-titlebar-active text-titlebar-text px-3 py-2 flex items-center gap-2 border-b-2 border-btn-shadow">
        <span className="text-2xl">🐧</span>
        <div className="flex flex-col">
          <span className="text-sm font-bold">Retro Linux</span>
          <span className="text-[10px] opacity-90">user@retro-linux</span>
        </div>
      </div>

      {/* Menu content */}
      <div className="py-1 overflow-y-auto" style={{ maxHeight: '420px' }}>
        {Object.entries(categories).map(([category, categoryApps]) => (
          <div key={category}>
            <div className="px-3 py-1 text-[10px] text-gray-600 font-bold uppercase bg-panel border-t border-btn-shadow">
              {category}
            </div>
            {categoryApps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app.id, app.name)}
                className="w-full px-3 py-2 text-left text-xs hover:bg-selection hover:text-selection flex items-center gap-2 transition-colors"
                role="menuitem"
              >
                <span className="text-lg">{app.icon}</span>
                <span>{app.name}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Menu footer */}
      <div className="border-t-2 border-btn-shadow bg-panel flex">
        <button
          onClick={onClose}
          className="flex-1 px-3 py-2 text-xs hover:bg-selection hover:text-selection flex items-center gap-2 justify-center border-r border-btn-shadow"
          role="menuitem"
        >
          <span>🔒</span>
          <span>Lock</span>
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-3 py-2 text-xs hover:bg-selection hover:text-selection flex items-center gap-2 justify-center"
          role="menuitem"
        >
          <span>⏻</span>
          <span>Shutdown</span>
        </button>
      </div>
    </div>
  );
}

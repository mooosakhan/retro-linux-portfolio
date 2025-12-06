'use client';

import { useState } from 'react';
import { clearDesktopState } from '@/lib/storage';

/**
 * SettingsApp - Desktop settings and preferences
 */
export default function SettingsApp({ onSettingsChange }) {
  const [activeTab, setActiveTab] = useState('appearance');
  const [settings, setSettings] = useState({
    theme: 'classic',
    panelPosition: 'bottom',
    clockFormat: '24h',
    animations: true,
    soundEffects: false,
    autoSave: true,
    notifications: true
  });

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  };

  const handleResetDesktop = () => {
    if (confirm('Reset desktop to default state? All windows will be closed.')) {
      clearDesktopState();
      window.location.reload();
    }
  };

  const handleClearCache = () => {
    if (confirm('Clear application cache?')) {
      alert('Cache cleared! (Demo mode)');
    }
  };

  return (
    <div className="h-full flex flex-col bg-window overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b-2 border-btn-shadow bg-panel">
        {['appearance', 'desktop', 'system', 'about'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold uppercase ${
              activeTab === tab
                ? 'bg-window border-t-2 border-l-2 border-r-2 border-btn-highlight -mb-0.5'
                : 'bg-panel hover:bg-btn-face'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 text-xs">
        {activeTab === 'appearance' && (
          <div className="space-y-4 max-w-2xl">
            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-3">Theme</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="theme"
                    checked={settings.theme === 'classic'}
                    onChange={() => handleSettingChange('theme', 'classic')}
                  />
                  <span>Classic Gray (Default)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="theme"
                    checked={settings.theme === 'dark'}
                    onChange={() => handleSettingChange('theme', 'dark')}
                    disabled
                  />
                  <span>Dark Mode (Coming Soon)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="theme"
                    checked={settings.theme === 'light'}
                    onChange={() => handleSettingChange('theme', 'light')}
                    disabled
                  />
                  <span>Light Mode (Coming Soon)</span>
                </label>
              </div>
            </div>

            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-3">Visual Effects</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.animations}
                    onChange={(e) => handleSettingChange('animations', e.target.checked)}
                  />
                  <span>Enable animations</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.soundEffects}
                    onChange={(e) => handleSettingChange('soundEffects', e.target.checked)}
                  />
                  <span>Sound effects</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'desktop' && (
          <div className="space-y-4 max-w-2xl">
            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-3">Panel Settings</h3>
              <div className="space-y-2">
                <label className="block">
                  <span className="font-bold mb-1 block">Panel Position</span>
                  <select
                    value={settings.panelPosition}
                    onChange={(e) => handleSettingChange('panelPosition', e.target.value)}
                    className="retro-border-in px-2 py-1 bg-white w-full"
                  >
                    <option value="bottom">Bottom</option>
                    <option value="top" disabled>Top (Coming Soon)</option>
                  </select>
                </label>

                <label className="block mt-3">
                  <span className="font-bold mb-1 block">Clock Format</span>
                  <select
                    value={settings.clockFormat}
                    onChange={(e) => handleSettingChange('clockFormat', e.target.value)}
                    className="retro-border-in px-2 py-1 bg-white w-full"
                  >
                    <option value="24h">24-hour</option>
                    <option value="12h" disabled>12-hour (Coming Soon)</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-3">Desktop Behavior</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                  />
                  <span>Auto-save desktop state</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  />
                  <span>Show notifications</span>
                </label>
              </div>
            </div>

            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-3">Reset & Maintenance</h3>
              <div className="space-y-3">
                <div>
                  <button onClick={handleResetDesktop} className="retro-button px-3 py-2 text-xs">
                    🔄 Reset Desktop State
                  </button>
                  <p className="text-[11px] text-gray-600 ml-6 mt-1">
                    Closes all windows and resets to default layout
                  </p>
                </div>
                <div>
                  <button 
                    onClick={() => {
                      if (confirm('Show boot screen on next startup?')) {
                        localStorage.removeItem('retro-linux-has-booted');
                        alert('Boot screen will appear on next page reload');
                      }
                    }} 
                    className="retro-button px-3 py-2 text-xs"
                  >
                    🚀 Reset Boot Screen
                  </button>
                  <p className="text-[11px] text-gray-600 ml-6 mt-1">
                    Show Linux boot sequence on next startup
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-4 max-w-2xl">
            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-3">System Information</h3>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span>OS:</span>
                  <span>Retro Linux v1.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Desktop:</span>
                  <span>RXFCE (Retro XFCE)</span>
                </div>
                <div className="flex justify-between">
                  <span>Framework:</span>
                  <span>Next.js 16.0.7</span>
                </div>
                <div className="flex justify-between">
                  <span>React:</span>
                  <span>19.2.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Build:</span>
                  <span>Production</span>
                </div>
              </div>
            </div>

            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-3">Storage</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span>LocalStorage Usage:</span>
                  <span>~5 KB</span>
                </div>
                <button onClick={handleClearCache} className="retro-button px-3 py-2 text-xs">
                  🗑️ Clear Cache
                </button>
              </div>
            </div>

            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-3">Performance</h3>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span>Memory Usage:</span>
                  <span className="text-green-600">● Normal</span>
                </div>
                <div className="flex justify-between">
                  <span>CPU Usage:</span>
                  <span className="text-green-600">● Low</span>
                </div>
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span className="text-green-600">● Connected</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-4 max-w-2xl">
            <div className="retro-border-in bg-white p-4 text-center">
              <div className="text-6xl mb-3">🐧</div>
              <h2 className="text-lg font-bold mb-1">Retro Linux Desktop</h2>
              <p className="text-xs text-gray-600 mb-3">Portfolio Edition v1.0</p>
              <p className="text-xs leading-relaxed">
                A nostalgic recreation of classic Linux desktop environments,
                built with modern web technologies.
              </p>
            </div>

            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-2">Features</h3>
              <ul className="space-y-1 list-disc list-inside text-[11px]">
                <li>Draggable and resizable windows</li>
                <li>Working terminal emulator</li>
                <li>File manager with navigation</li>
                <li>Portfolio showcase (About, Projects, Experience)</li>
                <li>Calculator and text editor</li>
                <li>Virtual workspaces</li>
                <li>State persistence</li>
                <li>Keyboard shortcuts</li>
              </ul>
            </div>

            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-2">Credits</h3>
              <div className="text-[11px] space-y-1">
                <p><strong>Built with:</strong> Next.js, React, Tailwind CSS</p>
                <p><strong>Inspired by:</strong> GNOME 1.x, Fluxbox, XFCE</p>
                <p><strong>License:</strong> MIT</p>
              </div>
            </div>

            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-2">Keyboard Shortcuts</h3>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><kbd className="font-mono">Alt+F4</kbd> - Close window</div>
                <div><kbd className="font-mono">Escape</kbd> - Close menus</div>
                <div><kbd className="font-mono">Ctrl+C</kbd> - Terminal cancel</div>
                <div><kbd className="font-mono">Ctrl+L</kbd> - Clear terminal</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import DesktopShell from '@/components/DesktopShell';
import AppWindow from '@/components/AppWindow';
import Panel from '@/components/Panel';
import MenuLauncher from '@/components/MenuLauncher';
import Notifications from '@/components/Notifications';
import BootLoader from '@/components/BootLoader';
import FileManagerMock from '@/components/FileManagerMock';
import AboutApp from '@/components/AboutApp';
import ProjectsApp from '@/components/ProjectsApp';
import ExperienceApp from '@/components/ExperienceApp';
import ResumeApp from '@/components/ResumeApp';
import ContactApp from '@/components/ContactApp';
import CalculatorApp from '@/components/CalculatorApp';
import TextEditorApp from '@/components/TextEditorApp';
import SettingsApp from '@/components/SettingsApp';
import { loadWindowState, debouncedSaveWindowState, loadWorkspace, saveWorkspace } from '@/lib/storage';

// Lazy load heavy components for better performance
const TerminalApp = lazy(() => import('@/components/TerminalApp'));

/**
 * Main Desktop Page - Orchestrates all desktop components
 */
export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [nextWindowId, setNextWindowId] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState(0);
  const [portfolioData, setPortfolioData] = useState(null);

  // Check if we should show boot screen (only on first visit or after clearing data)
  useEffect(() => {
    try {
      const hasBooted = localStorage.getItem('retro-linux-has-booted');
      if (hasBooted === 'true') {
        setIsBooting(false);
      }
    } catch (e) {
      // localStorage not available, show boot screen
    }
  }, []);

  // Load portfolio data
  useEffect(() => {
    fetch('/portfolio.json')
      .then(res => res.json())
      .then(data => setPortfolioData(data))
      .catch(err => console.error('Failed to load portfolio data:', err));
  }, []);

  // Load saved state on mount
  useEffect(() => {
    const savedWindows = loadWindowState();
    const savedWorkspace = loadWorkspace();
    
    if (savedWindows.length > 0) {
      setWindows(savedWindows);
      setNextWindowId(Math.max(...savedWindows.map(w => w.id)) + 1);
    }
    
    setCurrentWorkspace(savedWorkspace);
  }, []);

  // Save state when windows change
  useEffect(() => {
    if (windows.length > 0) {
      debouncedSaveWindowState(windows);
    }
  }, [windows]);

  // Launch a new application window
  const launchApp = (appType, title) => {
    // Define window sizes for different app types
    const getWindowSize = (type) => {
      const sizes = {
        calculator: { width: 320, height: 450 },
        terminal: { width: 650, height: 400 },
        'text-editor': { width: 700, height: 500 },
        about: { width: 650, height: 500 },
        projects: { width: 800, height: 550 },
        experience: { width: 750, height: 550 },
        resume: { width: 850, height: 600 },
        contact: { width: 750, height: 550 },
        settings: { width: 700, height: 500 },
        filemanager: { width: 700, height: 500 }
      };
      return sizes[type] || { width: 600, height: 450 };
    };

    const newWindow = {
      id: nextWindowId,
      appType,
      title: title || appType,
      position: {
        x: 80 + (windows.length * 30) % 300,
        y: 60 + (windows.length * 30) % 200
      },
      size: getWindowSize(appType),
      isMinimized: false,
      isMaximized: false,
      zIndex: 1000 + nextWindowId,
      icon: getAppIcon(appType)
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(nextWindowId);
    setNextWindowId(nextWindowId + 1);
  };

  // Get icon for app type - Classic folder style
  const getAppIcon = (appType) => {
    const icons = {
      // Portfolio (folder style)
      about: '📄',
      projects: '📁',
      experience: '📁',
      resume: '📋',
      contact: '📧',
      // System
      terminal: '💻',
      filemanager: '📁',
      computer: '🖥️',
      trash: '🗑️',
      settings: '⚙️',
      // Accessories
      calculator: '🧮',
      'text-editor': '📝'
    };
    return icons[appType] || '📁';
  };

  // Render app content based on type
  const renderAppContent = (appType) => {
    switch (appType) {
      // Portfolio Apps
      case 'about':
        return <AboutApp portfolioData={portfolioData} />;
      case 'projects':
        return <ProjectsApp portfolioData={portfolioData} />;
      case 'experience':
        return <ExperienceApp portfolioData={portfolioData} />;
      case 'resume':
        return <ResumeApp portfolioData={portfolioData} />;
      case 'contact':
        return <ContactApp portfolioData={portfolioData} />;
      
      // System Apps
      case 'terminal':
        return (
          <Suspense fallback={
            <div className="flex items-center justify-center h-full text-xs">
              Loading terminal...
            </div>
          }>
            <TerminalApp />
          </Suspense>
        );
      case 'filemanager':
      case 'computer':
      case 'trash':
        return <FileManagerMock />;
      case 'settings':
        return <SettingsApp />;
      
      // Accessories
      case 'calculator':
        return <CalculatorApp />;
      case 'text-editor':
        return <TextEditorApp />;
      
      default:
        return (
          <div className="flex items-center justify-center h-full text-xs text-gray-600">
            <div className="text-center">
              <div className="text-4xl mb-2">{getAppIcon(appType)}</div>
              <div>{appType} application</div>
              <div className="text-[10px] mt-2">Not yet implemented</div>
            </div>
          </div>
        );
    }
  };

  // Close window
  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const remaining = windows.filter(w => w.id !== id);
      setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  };

  // Minimize window
  const minimizeWindow = (id) => {
    setWindows(windows.map(w =>
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  // Maximize/restore window
  const maximizeWindow = (id) => {
    setWindows(windows.map(w =>
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  // Activate window (bring to front)
  const activateWindow = (id) => {
    setActiveWindowId(id);
    // Restore if minimized
    setWindows(windows.map(w =>
      w.id === id ? { ...w, isMinimized: false } : w
    ));
  };

  // Handle workspace change
  const handleWorkspaceChange = (index) => {
    setCurrentWorkspace(index);
    saveWorkspace(index);
  };

  // Handle menu toggle
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Get panel position (above bottom of screen)
  const menuPosition = {
    x: 2,
    y: 40 // Height of panel + margin
  };

  // Handle boot completion
  const handleBootComplete = () => {
    setIsBooting(false);
    // Save to localStorage so we don't show boot screen again
    try {
      localStorage.setItem('retro-linux-has-booted', 'true');
    } catch (e) {
      // localStorage not available
    }
  };

  // Show boot loader on first load
  if (isBooting) {
    return <BootLoader onBootComplete={handleBootComplete} />;
  }

  return (
    <main className="h-screen w-screen overflow-hidden">
      <DesktopShell onLaunchApp={launchApp}>
        {/* Render all windows */}
        {windows.map((window) => (
          <AppWindow
            key={window.id}
            id={window.id}
            title={window.title}
            icon={window.icon}
            initialPosition={window.position}
            initialSize={window.size}
            isActive={activeWindowId === window.id}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized}
            onFocus={activateWindow}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
          >
            {renderAppContent(window.appType)}
          </AppWindow>
        ))}

        {/* Menu Launcher */}
        <MenuLauncher
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onLaunchApp={launchApp}
          position={menuPosition}
        />

        {/* Notifications */}
        <Notifications />
      </DesktopShell>

      {/* Bottom Panel */}
      <Panel
        position="bottom"
        onLaunchMenu={handleMenuToggle}
        openWindows={windows.map(w => ({
          ...w,
          isActive: w.id === activeWindowId
        }))}
        onWindowActivate={activateWindow}
        currentWorkspace={currentWorkspace}
        onWorkspaceChange={handleWorkspaceChange}
      />
    </main>
  );
}

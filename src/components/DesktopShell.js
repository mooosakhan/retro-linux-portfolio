"use client";

import { useState, useRef, useEffect } from "react";

/**
 * DesktopShell - Main desktop container with wallpaper, icons, and context menu
 */
export default function DesktopShell({ children, onLaunchApp }) {
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const desktopRef = useRef(null);

  // Desktop icons configuration - Classic folder style
  const desktopIcons = [
    { id: "about", label: "About.txt", icon: "📄", appType: "about" },
    { id: "projects", label: "Projects", icon: "📁", appType: "projects" },
    {
      id: "experience",
      label: "Experience",
      icon: "📁",
      appType: "experience",
    },
    { id: "resume", label: "Resume.pdf", icon: "📋", appType: "resume" },
    { id: "contact", label: "Contact.txt", icon: "📧", appType: "contact" },
    { id: "terminal", label: "Terminal", icon: "💻", appType: "terminal" },
    {
      id: "computer",
      label: "My Computer",
      icon: "🖥️",
      appType: "filemanager",
    },
    { id: "trash", label: "Trash", icon: "🗑️", appType: "filemanager" },
  ];

  // Handle right-click context menu
  const handleContextMenu = (e) => {
    e.preventDefault();

    // Only show context menu if clicking on desktop background
    if (
      e.target === desktopRef.current ||
      e.target.classList.contains("desktop-background")
    ) {
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  // Close context menu on click outside
  const handleClick = (e) => {
    if (contextMenu && !e.target.closest(".context-menu")) {
      setContextMenu(null);
    }
    // Deselect icon if clicking on empty space
    if (
      e.target === desktopRef.current ||
      e.target.classList.contains("desktop-background")
    ) {
      setSelectedIcon(null);
    }
  };

  // Handle icon double-click to launch app
  const handleIconDoubleClick = (icon) => {
    if (onLaunchApp) {
      onLaunchApp(icon.appType, icon.label);
    }
    setSelectedIcon(null);
  };

  // Handle icon single click for selection
  const handleIconClick = (iconId, e) => {
    e.stopPropagation();
    setSelectedIcon(iconId);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setContextMenu(null);
        setSelectedIcon(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={desktopRef}
      className="fixed inset-0 bg-desktop overflow-hidden desktop-background"
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      role="application"
      aria-label="Desktop"
      style={{
        backgroundImage: 'url("/assets/wallpaper.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Desktop Icons */}
      <div
        className="desktop-grid"
        style={{ gridAutoRows: "80px", padding: "16px" }}
      >
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className={`flex flex-col items-center justify-center cursor-pointer p-2 rounded no-select ${
              selectedIcon === icon.id ? "bg-selection bg-opacity-30" : ""
            }`}
            onClick={(e) => handleIconClick(icon.id, e)}
            onDoubleClick={() => handleIconDoubleClick(icon)}
            role="button"
            tabIndex={0}
            aria-label={`Launch ${icon.label}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleIconDoubleClick(icon);
              }
            }}
          >
            <div className="text-4xl mb-1">{icon.icon}</div>
            <div
              className={`text-xs text-center px-1 py-0.5 ${
                selectedIcon === icon.id
                  ? "bg-selection text-selection"
                  : "text-white"
              }`}
              style={{
                textShadow:
                  selectedIcon === icon.id
                    ? "none"
                    : "1px 1px 2px rgba(0,0,0,0.8)",
              }}
            >
              {icon.label}
            </div>
          </div>
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="context-menu fixed bg-panel retro-border-window shadow-lg py-1 z-[10000]"
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
            minWidth: "150px",
          }}
          role="menu"
        >
          <button
            className="w-full px-3 py-1 text-left text-xs hover:bg-selection hover:text-selection-text"
            onClick={() => {
              if (onLaunchApp) onLaunchApp("terminal", "Terminal");
              setContextMenu(null);
            }}
            role="menuitem"
          >
            📋 New Terminal
          </button>
          <button
            className="w-full px-3 py-1 text-left text-xs hover:bg-selection hover:text-selection-text"
            onClick={() => {
              if (onLaunchApp) onLaunchApp("filemanager", "Files");
              setContextMenu(null);
            }}
            role="menuitem"
          >
            📁 New Folder
          </button>
          <div className="h-px bg-btn-shadow my-1 mx-2" />
          <button
            className="w-full px-3 py-1 text-left text-xs hover:bg-selection hover:text-selection-text"
            onClick={() => setContextMenu(null)}
            role="menuitem"
          >
            🔄 Refresh
          </button>
          <button
            className="w-full px-3 py-1 text-left text-xs hover:bg-selection hover:text-selection-text"
            onClick={() => setContextMenu(null)}
            role="menuitem"
          >
            ⚙️ Properties
          </button>
        </div>
      )}

      {/* Window containers */}
      {children}
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { makeDraggable, makeResizable } from '@/lib/drag';

/**
 * AppWindow - Draggable, resizable window component with titlebar controls
 * Supports minimize, maximize, close, keyboard navigation
 */
export default function AppWindow({
  id,
  title,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 600, height: 400 },
  isActive = false,
  isMinimized = false,
  isMaximized = false,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  children,
  icon = '📁'
}) {
  const windowRef = useRef(null);
  const titlebarRef = useRef(null);
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isMaximizedState, setIsMaximizedState] = useState(isMaximized);
  const [preMaximizeState, setPreMaximizeState] = useState(null);

  // Setup draggable behavior
  useEffect(() => {
    if (!windowRef.current || !titlebarRef.current || isMaximizedState) return;

    const cleanup = makeDraggable(windowRef.current, titlebarRef.current, {
      onDragStart: () => {
        if (onFocus) onFocus(id);
      },
      onDrag: (newPos) => {
        setPosition(newPos);
      }
    });

    return cleanup;
  }, [id, isMaximizedState, onFocus]);

  // Setup resizable behavior
  useEffect(() => {
    if (!windowRef.current || isMaximizedState) return;

    const cleanup = makeResizable(windowRef.current, (newSize) => {
      setSize({ width: newSize.width, height: newSize.height });
      setPosition({ x: newSize.left, y: newSize.top });
    });

    return cleanup;
  }, [isMaximizedState]);

  // Handle maximize/restore
  const handleMaximize = () => {
    if (isMaximizedState) {
      // Restore
      if (preMaximizeState) {
        setPosition(preMaximizeState.position);
        setSize(preMaximizeState.size);
      }
      setIsMaximizedState(false);
    } else {
      // Maximize
      setPreMaximizeState({ position, size });
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 40 }); // Account for panel
      setIsMaximizedState(true);
    }
    if (onMaximize) onMaximize(id);
  };

  // Handle window focus
  const handleWindowClick = () => {
    if (onFocus) onFocus(id);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isActive) return;

      if (e.altKey && e.key === 'F4') {
        e.preventDefault();
        if (onClose) onClose(id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, id, onClose]);

  if (isMinimized) {
    return null; // Hidden when minimized
  }

  const windowStyle = {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex: isActive ? 1000 : 900
  };

  return (
    <div
      ref={windowRef}
      style={windowStyle}
      className={`flex flex-col bg-window shadow-lg ${
        isActive ? 'z-50' : 'z-40'
      }`}
      onClick={handleWindowClick}
      role="dialog"
      aria-label={title}
      aria-modal="true"
      tabIndex={-1}
    >
      {/* Window outer border */}
      <div className="retro-border-window flex flex-col h-full">
        {/* Titlebar */}
        <div
          ref={titlebarRef}
          className={`flex items-center justify-between px-1 py-0.5 no-select ${
            isActive ? 'bg-titlebar-active' : 'bg-titlebar-inactive'
          }`}
          style={{ height: '20px', minHeight: '20px' }}
        >
          <div className="flex items-center gap-1 flex-1 min-w-0">
            <span className="text-xs">{icon}</span>
            <span className="text-titlebar-text text-xs font-bold truncate">
              {title}
            </span>
          </div>

          {/* Window controls */}
          <div className="flex gap-0.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onMinimize) onMinimize(id);
              }}
              className="retro-button px-2 py-0 text-xs h-4 leading-none"
              aria-label="Minimize"
              title="Minimize"
            >
              _
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              className="retro-button px-2 py-0 text-xs h-4 leading-none"
              aria-label={isMaximizedState ? "Restore" : "Maximize"}
              title={isMaximizedState ? "Restore" : "Maximize"}
            >
              {isMaximizedState ? '❐' : '□'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onClose) onClose(id);
              }}
              className="retro-button px-2 py-0 text-xs h-4 leading-none"
              aria-label="Close"
              title="Close (Alt+F4)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Window content */}
        <div className="flex-1 overflow-hidden bg-window">
          {children}
        </div>
      </div>
    </div>
  );
}

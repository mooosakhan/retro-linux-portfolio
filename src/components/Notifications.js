'use client';

import { useState, useEffect } from 'react';

/**
 * Notifications - Toast notification system
 */
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  // Example: Auto-show a welcome notification
  useEffect(() => {
    const welcomeNotification = {
      id: Date.now(),
      title: 'Welcome',
      message: 'Retro Linux Desktop loaded successfully',
      type: 'info',
      icon: 'ℹ️'
    };

    setNotifications([welcomeNotification]);

    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      setNotifications([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div 
      className="fixed top-4 right-4 z-[10002] flex flex-col gap-2"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-panel retro-border-window shadow-lg min-w-[280px] max-w-[400px] animate-slide-in"
          role="alert"
        >
          {/* Notification titlebar */}
          <div className="bg-titlebar-inactive text-titlebar-text px-2 py-0.5 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-xs">{notification.icon}</span>
              <span className="text-xs font-bold">{notification.title}</span>
            </div>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="text-titlebar-text hover:bg-btn-highlight hover:text-black px-1 text-xs"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>

          {/* Notification content */}
          <div className="p-3 text-xs bg-window">
            {notification.message}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * LocalStorage Persistence Utilities
 * Handles saving and loading desktop state
 */

const STORAGE_KEY = 'retro-linux-desktop-state';

/**
 * Default desktop state structure
 */
const DEFAULT_STATE = {
  windows: [],
  currentWorkspace: 0,
  panelPosition: 'bottom',
  clockFormat: '24h',
  lastUpdated: null
};

/**
 * Safely get item from localStorage with error handling
 */
function safeGetItem(key) {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return null;
  }
}

/**
 * Safely set item to localStorage with error handling
 */
function safeSetItem(key, value) {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error('Error writing to localStorage:', e);
    return false;
  }
}

/**
 * Load desktop state from localStorage
 * @returns {Object} Desktop state or default state if none exists
 */
export function loadDesktopState() {
  const stored = safeGetItem(STORAGE_KEY);
  
  if (!stored) {
    return { ...DEFAULT_STATE };
  }

  try {
    const parsed = JSON.parse(stored);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (e) {
    console.error('Error parsing desktop state:', e);
    return { ...DEFAULT_STATE };
  }
}

/**
 * Save desktop state to localStorage
 * @param {Object} state - Desktop state to save
 */
export function saveDesktopState(state) {
  const stateToSave = {
    ...state,
    lastUpdated: new Date().toISOString()
  };

  const serialized = JSON.stringify(stateToSave);
  return safeSetItem(STORAGE_KEY, serialized);
}

/**
 * Save window state
 * @param {Array} windows - Array of window objects
 */
export function saveWindowState(windows) {
  const currentState = loadDesktopState();
  return saveDesktopState({
    ...currentState,
    windows: windows.map(w => ({
      id: w.id,
      appType: w.appType,
      title: w.title,
      position: w.position,
      size: w.size,
      isMinimized: w.isMinimized,
      isMaximized: w.isMaximized,
      zIndex: w.zIndex
    }))
  });
}

/**
 * Load window state
 * @returns {Array} Array of window objects
 */
export function loadWindowState() {
  const state = loadDesktopState();
  return state.windows || [];
}

/**
 * Save workspace preference
 * @param {number} workspaceIndex - Current workspace index
 */
export function saveWorkspace(workspaceIndex) {
  const currentState = loadDesktopState();
  return saveDesktopState({
    ...currentState,
    currentWorkspace: workspaceIndex
  });
}

/**
 * Load workspace preference
 * @returns {number} Current workspace index
 */
export function loadWorkspace() {
  const state = loadDesktopState();
  return state.currentWorkspace || 0;
}

/**
 * Clear all saved state
 */
export function clearDesktopState() {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Error clearing localStorage:', e);
    return false;
  }
}

/**
 * Debounce helper for saving state
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Create a debounced save function
 */
export const debouncedSaveWindowState = debounce(saveWindowState, 500);

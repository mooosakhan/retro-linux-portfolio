/**
 * Draggable Window Utilities
 * Handles mouse and touch events for window dragging and resizing
 */

/**
 * Makes a window draggable by its titlebar
 * @param {HTMLElement} windowElement - The window container element
 * @param {HTMLElement} handleElement - The drag handle (usually titlebar)
 * @param {Function} onDragStart - Callback when drag starts
 * @param {Function} onDrag - Callback during drag with {x, y} position
 * @param {Function} onDragEnd - Callback when drag ends
 */
export function makeDraggable(windowElement, handleElement, { onDragStart, onDrag, onDragEnd } = {}) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialX = 0;
  let initialY = 0;

  const handlePointerDown = (e) => {
    // Ignore if clicking on buttons (close, minimize, etc)
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return;
    }

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    const rect = windowElement.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;

    // Add class for visual feedback
    windowElement.classList.add('dragging');
    handleElement.style.cursor = 'move';

    // Prevent text selection
    e.preventDefault();

    if (onDragStart) {
      onDragStart({ x: initialX, y: initialY });
    }

    // Use pointer capture for better tracking
    handleElement.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    const newX = initialX + deltaX;
    const newY = initialY + deltaY;

    // Constrain to viewport
    const maxX = window.innerWidth - windowElement.offsetWidth;
    const maxY = window.innerHeight - windowElement.offsetHeight;

    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));

    if (onDrag) {
      onDrag({ x: constrainedX, y: constrainedY });
    }
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;

    isDragging = false;
    windowElement.classList.remove('dragging');
    handleElement.style.cursor = '';

    if (onDragEnd) {
      const rect = windowElement.getBoundingClientRect();
      onDragEnd({ x: rect.left, y: rect.top });
    }

    handleElement.releasePointerCapture(e.pointerId);
  };

  // Attach event listeners
  handleElement.addEventListener('pointerdown', handlePointerDown);
  handleElement.addEventListener('pointermove', handlePointerMove);
  handleElement.addEventListener('pointerup', handlePointerUp);
  handleElement.addEventListener('pointercancel', handlePointerUp);

  // Return cleanup function
  return () => {
    handleElement.removeEventListener('pointerdown', handlePointerDown);
    handleElement.removeEventListener('pointermove', handlePointerMove);
    handleElement.removeEventListener('pointerup', handlePointerUp);
    handleElement.removeEventListener('pointercancel', handlePointerUp);
  };
}

/**
 * Makes a window resizable from its edges and corners
 * @param {HTMLElement} windowElement - The window container element
 * @param {Function} onResize - Callback with {width, height}
 */
export function makeResizable(windowElement, onResize) {
  const minWidth = 200;
  const minHeight = 150;
  const handleSize = 8;

  let isResizing = false;
  let resizeDirection = '';
  let startX = 0;
  let startY = 0;
  let startWidth = 0;
  let startHeight = 0;
  let startLeft = 0;
  let startTop = 0;

  const getResizeDirection = (e) => {
    const rect = windowElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let direction = '';

    if (y < handleSize) direction += 'n';
    if (y > rect.height - handleSize) direction += 's';
    if (x < handleSize) direction += 'w';
    if (x > rect.width - handleSize) direction += 'e';

    return direction;
  };

  const setCursor = (direction) => {
    const cursorMap = {
      'n': 'ns-resize',
      's': 'ns-resize',
      'e': 'ew-resize',
      'w': 'ew-resize',
      'ne': 'nesw-resize',
      'nw': 'nwse-resize',
      'se': 'nwse-resize',
      'sw': 'nesw-resize',
    };
    windowElement.style.cursor = cursorMap[direction] || 'default';
  };

  const handlePointerDown = (e) => {
    resizeDirection = getResizeDirection(e);
    if (!resizeDirection) return;

    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;

    const rect = windowElement.getBoundingClientRect();
    startWidth = rect.width;
    startHeight = rect.height;
    startLeft = rect.left;
    startTop = rect.top;

    e.preventDefault();
    windowElement.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isResizing) {
      const direction = getResizeDirection(e);
      setCursor(direction);
      return;
    }

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newWidth = startWidth;
    let newHeight = startHeight;
    let newLeft = startLeft;
    let newTop = startTop;

    if (resizeDirection.includes('e')) {
      newWidth = Math.max(minWidth, startWidth + deltaX);
    }
    if (resizeDirection.includes('w')) {
      newWidth = Math.max(minWidth, startWidth - deltaX);
      newLeft = startLeft + (startWidth - newWidth);
    }
    if (resizeDirection.includes('s')) {
      newHeight = Math.max(minHeight, startHeight + deltaY);
    }
    if (resizeDirection.includes('n')) {
      newHeight = Math.max(minHeight, startHeight - deltaY);
      newTop = startTop + (startHeight - newHeight);
    }

    if (onResize) {
      onResize({
        width: newWidth,
        height: newHeight,
        left: newLeft,
        top: newTop
      });
    }
  };

  const handlePointerUp = (e) => {
    if (!isResizing) return;
    isResizing = false;
    resizeDirection = '';
    windowElement.style.cursor = 'default';
    windowElement.releasePointerCapture(e.pointerId);
  };

  windowElement.addEventListener('pointerdown', handlePointerDown);
  windowElement.addEventListener('pointermove', handlePointerMove);
  windowElement.addEventListener('pointerup', handlePointerUp);
  windowElement.addEventListener('pointercancel', handlePointerUp);

  return () => {
    windowElement.removeEventListener('pointerdown', handlePointerDown);
    windowElement.removeEventListener('pointermove', handlePointerMove);
    windowElement.removeEventListener('pointerup', handlePointerUp);
    windowElement.removeEventListener('pointercancel', handlePointerUp);
  };
}

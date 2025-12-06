'use client';

import { useState } from 'react';

/**
 * FileManagerMock - Simple file manager with breadcrumb navigation
 */
export default function FileManagerMock() {
  const [currentPath, setCurrentPath] = useState(['Home']);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock file system structure
  const fileSystem = {
    'Home': {
      type: 'folder',
      children: {
        'Documents': { type: 'folder', children: {
          'readme.txt': { type: 'file', size: '1.2 KB' },
          'notes.txt': { type: 'file', size: '843 B' }
        }},
        'Downloads': { type: 'folder', children: {
          'image.png': { type: 'file', size: '256 KB' },
          'archive.zip': { type: 'file', size: '1.5 MB' }
        }},
        'Pictures': { type: 'folder', children: {} },
        'Music': { type: 'folder', children: {} },
        'Videos': { type: 'folder', children: {} },
        'Desktop': { type: 'folder', children: {} },
      }
    }
  };

  // Get current directory contents
  const getCurrentContents = () => {
    let current = fileSystem;
    for (const part of currentPath) {
      current = current[part];
      if (!current) return {};
      if (current.children) current = current.children;
    }
    return current.children || current;
  };

  const contents = getCurrentContents();

  // Navigate to folder
  const handleItemDoubleClick = (name, item) => {
    if (item.type === 'folder') {
      setCurrentPath([...currentPath, name]);
      setSelectedItem(null);
    }
  };

  // Navigate back
  const handleNavigateBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItem(null);
    }
  };

  // Navigate to specific path part
  const handleBreadcrumbClick = (index) => {
    setCurrentPath(currentPath.slice(0, index + 1));
    setSelectedItem(null);
  };

  // Get icon for item
  const getIcon = (item) => {
    if (item.type === 'folder') return '📁';
    const name = item.name || '';
    if (name.endsWith('.txt')) return '📄';
    if (name.endsWith('.png') || name.endsWith('.jpg')) return '🖼️';
    if (name.endsWith('.zip') || name.endsWith('.tar')) return '📦';
    if (name.endsWith('.mp3')) return '🎵';
    if (name.endsWith('.mp4')) return '🎬';
    return '📄';
  };

  return (
    <div className="h-full flex flex-col bg-window">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 border-b-2 border-btn-shadow">
        <button
          onClick={handleNavigateBack}
          disabled={currentPath.length === 1}
          className="retro-button px-2 py-1 text-xs"
          aria-label="Go back"
          title="Back"
        >
          ← Back
        </button>
        <button
          className="retro-button px-2 py-1 text-xs"
          aria-label="Go forward"
          title="Forward"
          disabled
        >
          Forward →
        </button>
        <div className="w-px h-4 bg-btn-shadow mx-1" />
        <button className="retro-button px-2 py-1 text-xs" title="New Folder">
          📁 New
        </button>
      </div>

      {/* Breadcrumb / Address bar */}
      <div className="flex items-center p-1 border-b-2 border-btn-shadow bg-panel">
        <span className="text-xs mr-2">Location:</span>
        <div className="retro-border-in flex-1 px-2 py-1 bg-white text-xs flex items-center gap-1">
          {currentPath.map((part, index) => (
            <span key={index} className="flex items-center gap-1">
              {index > 0 && <span className="text-gray-500">/</span>}
              <button
                onClick={() => handleBreadcrumbClick(index)}
                className="hover:underline text-blue-600"
              >
                {part}
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-auto p-2">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-panel">
              <th className="text-left px-2 py-1 border border-btn-shadow">Name</th>
              <th className="text-left px-2 py-1 border border-btn-shadow">Type</th>
              <th className="text-right px-2 py-1 border border-btn-shadow">Size</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(contents).map(([name, item]) => (
              <tr
                key={name}
                onClick={() => setSelectedItem(name)}
                onDoubleClick={() => handleItemDoubleClick(name, item)}
                className={`cursor-pointer hover:bg-selection hover:text-selection ${
                  selectedItem === name ? 'bg-selection text-selection' : ''
                }`}
                role="button"
                tabIndex={0}
                aria-label={`${name} - ${item.type}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleItemDoubleClick(name, item);
                  }
                }}
              >
                <td className="px-2 py-1 border border-gray-300 flex items-center gap-2">
                  <span>{getIcon({ ...item, name })}</span>
                  <span>{name}</span>
                </td>
                <td className="px-2 py-1 border border-gray-300">
                  {item.type === 'folder' ? 'Folder' : 'File'}
                </td>
                <td className="px-2 py-1 border border-gray-300 text-right">
                  {item.size || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {Object.keys(contents).length === 0 && (
          <div className="text-center text-gray-500 mt-8 text-xs">
            This folder is empty
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-2 py-1 border-t-2 border-btn-shadow bg-panel text-xs">
        <span>{Object.keys(contents).length} items</span>
        <span>{selectedItem || 'No selection'}</span>
      </div>
    </div>
  );
}

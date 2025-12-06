'use client';

import { useState } from 'react';

/**
 * TextEditorApp - Simple text editor with formatting
 */
export default function TextEditorApp() {
  const [content, setContent] = useState('Welcome to Retro Text Editor!\n\nStart typing here...');
  const [filename, setFilename] = useState('untitled.txt');
  const [isSaved, setIsSaved] = useState(true);

  const handleChange = (e) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    // In real app, this would save to file system
    setIsSaved(true);
    alert(`File "${filename}" saved! (Demo mode)`);
  };

  const handleNew = () => {
    if (!isSaved && !confirm('You have unsaved changes. Continue?')) {
      return;
    }
    setContent('');
    setFilename('untitled.txt');
    setIsSaved(true);
  };

  const handleOpen = () => {
    alert('Open file dialog (Demo mode)');
  };

  const stats = {
    characters: content.length,
    words: content.trim().split(/\s+/).filter(w => w).length,
    lines: content.split('\n').length
  };

  return (
    <div className="h-full flex flex-col bg-window">
      {/* Menu Bar */}
      <div className="flex items-center gap-1 px-2 py-1 border-b-2 border-btn-shadow bg-panel">
        <button onClick={handleNew} className="retro-button px-2 py-1 text-xs">
          📄 New
        </button>
        <button onClick={handleOpen} className="retro-button px-2 py-1 text-xs">
          📂 Open
        </button>
        <button onClick={handleSave} className="retro-button px-2 py-1 text-xs">
          💾 Save
        </button>
        <div className="w-px h-4 bg-btn-shadow mx-1" />
        <button className="retro-button px-2 py-1 text-xs" disabled>
          ✂️ Cut
        </button>
        <button className="retro-button px-2 py-1 text-xs" disabled>
          📋 Copy
        </button>
        <button className="retro-button px-2 py-1 text-xs" disabled>
          📌 Paste
        </button>
      </div>

      {/* Filename Bar */}
      <div className="flex items-center px-2 py-1 border-b border-btn-shadow bg-panel text-xs">
        <span className="mr-2">File:</span>
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="retro-border-in px-2 py-0.5 bg-white flex-1 max-w-xs"
        />
        {!isSaved && <span className="ml-2 text-red-600 font-bold">*</span>}
      </div>

      {/* Text Area */}
      <div className="flex-1 overflow-hidden">
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full h-full p-3 text-xs font-mono bg-white resize-none focus:outline-none"
          placeholder="Start typing..."
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-2 py-1 border-t-2 border-btn-shadow bg-panel text-[10px]">
        <div className="flex gap-4">
          <span>Lines: {stats.lines}</span>
          <span>Words: {stats.words}</span>
          <span>Characters: {stats.characters}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{isSaved ? '✓ Saved' : '● Modified'}</span>
          <span>|</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * TerminalApp - Realistic retro terminal emulator with command history
 */
export default function TerminalApp() {
  const [history, setHistory] = useState([
    'Retro Linux Terminal v1.0',
    'Type "help" for available commands.',
    ''
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Available commands
  const commands = {
    help: () => [
      'Available commands:',
      '  help     - Show this help message',
      '  ls       - List directory contents',
      '  pwd      - Print working directory',
      '  cd       - Change directory',
      '  cat      - Display file contents',
      '  echo     - Print text',
      '  clear    - Clear terminal',
      '  date     - Show current date and time',
      '  whoami   - Display current user',
      '  uname    - System information',
      ''
    ],
    ls: () => [
      'Documents    Downloads    Pictures    Videos',
      'Music        Desktop      .bashrc     .profile',
      ''
    ],
    pwd: () => [`/home/user${currentPath === '~' ? '' : currentPath}`, ''],
    date: () => [new Date().toString(), ''],
    whoami: () => ['user', ''],
    uname: () => ['Retro Linux 1.0 x86_64', ''],
    clear: () => null, // Special case - clears screen
  };

  // Execute command
  const executeCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return [''];

    const parts = trimmed.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    if (command === 'clear') {
      return null; // Signal to clear
    }

    if (command === 'echo') {
      return [args.join(' '), ''];
    }

    if (command === 'cd') {
      const newPath = args[0] || '~';
      setCurrentPath(newPath === '..' ? '~' : newPath);
      return [''];
    }

    if (command === 'cat') {
      if (!args[0]) {
        return ['cat: missing file operand', ''];
      }
      return [
        `cat: ${args[0]}: No such file or directory`,
        ''
      ];
    }

    if (commands[command]) {
      return commands[command]();
    }

    return [`bash: ${command}: command not found`, ''];
  };

  // Handle command submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const prompt = `user@retro-linux:${currentPath}$`;
    const commandLine = `${prompt} ${currentInput}`;
    
    // Add command to history
    const result = executeCommand(currentInput);
    
    if (result === null) {
      // Clear command
      setHistory(['']);
    } else {
      setHistory([...history, commandLine, ...result]);
    }

    // Update command history for arrow key navigation
    if (currentInput.trim()) {
      setCommandHistory([...commandHistory, currentInput]);
      setHistoryIndex(-1);
    }

    setCurrentInput('');

    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setHistory([...history, `user@retro-linux:${currentPath}$ ${currentInput}^C`, '']);
      setCurrentInput('');
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setHistory(['']);
    }
  };

  // Focus input when clicking anywhere in terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div 
      className="h-full bg-terminal-bg text-terminal-text font-mono text-xs p-2 overflow-y-auto cursor-text"
      ref={terminalRef}
      onClick={handleTerminalClick}
      role="log"
      aria-label="Terminal output"
      aria-live="polite"
    >
      {/* Terminal history */}
      <div className="whitespace-pre-wrap">
        {history.map((line, i) => (
          <div key={i} className="leading-relaxed">
            {line}
          </div>
        ))}
      </div>

      {/* Current input line */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-terminal-text mr-1">
          user@retro-linux:{currentPath}$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-terminal-text caret-terminal-text"
          style={{ caretColor: 'var(--terminal-text)' }}
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
        />
      </form>

      {/* Blinking cursor when input is empty */}
      {currentInput === '' && (
        <span className="inline-block w-2 h-3 bg-terminal-text blink ml-1" />
      )}
    </div>
  );
}

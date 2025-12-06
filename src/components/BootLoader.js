'use client';

import { useState, useEffect } from 'react';

/**
 * BootLoader - Classic Linux boot sequence screen
 */
export default function BootLoader({ onBootComplete }) {
  const [bootMessages, setBootMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBooting, setIsBooting] = useState(true);

  // Classic Linux boot messages
  const messages = [
    'Linux version 2.6.32-retro (gcc version 4.8.5)',
    'Command line: BOOT_IMAGE=/vmlinuz root=/dev/sda1 ro quiet splash',
    'Kernel command line: BOOT_IMAGE=/vmlinuz root=/dev/sda1 ro quiet splash',
    'PID hash table entries: 4096 (order: 3, 32768 bytes)',
    'Dentry cache hash table entries: 131072 (order: 8, 1048576 bytes)',
    'Inode-cache hash table entries: 65536 (order: 7, 524288 bytes)',
    'Memory: 2048000k/2097088k available',
    'Calibrating delay loop... 4988.92 BogoMIPS',
    'Mount-cache hash table entries: 512',
    'CPU: Intel(R) Core(TM) i5 CPU @ 2.40GHz stepping 05',
    'Checking \'hlt\' instruction... OK.',
    'NET: Registered protocol family 16',
    'PCI: Using configuration type 1',
    'bio: create slab <bio-0> at 0',
    'ACPI: Interpreter enabled',
    'ACPI: Using IOAPIC for interrupt routing',
    'ACPI: PCI Root Bridge [PCI0] (0000:00)',
    'PCI: Transparent bridge - 0000:00:1e.0',
    'SCSI subsystem initialized',
    'usbcore: registered new interface driver usbfs',
    'usbcore: registered new interface driver hub',
    'PCI: Bridge: 0000:00:01.0',
    'NET: Registered protocol family 2',
    'IP route cache hash table entries: 32768 (order: 6, 262144 bytes)',
    'TCP established hash table entries: 131072 (order: 9, 2097152 bytes)',
    'TCP bind hash table entries: 65536 (order: 8, 1048576 bytes)',
    'NET: Registered protocol family 1',
    'Freeing unused kernel memory: 484k freed',
    'Loading hardware drivers...',
    '[  OK  ] Started Load Kernel Modules',
    '[  OK  ] Reached target Hardware activated',
    '[  OK  ] Started Create list of required static device nodes',
    '[  OK  ] Started udev Kernel Device Manager',
    '[  OK  ] Started Journal Service',
    '[  OK  ] Started Network Name Resolution',
    '[  OK  ] Reached target Network',
    '[  OK  ] Started D-Bus System Message Bus',
    '[  OK  ] Started System Logging Service',
    'Starting GNOME Display Manager...',
    '[  OK  ] Started GNOME Display Manager',
    '',
    'Retro Linux Desktop 1.0',
    'Starting X Window System...',
    'Loading desktop environment...',
    ''
  ];

  useEffect(() => {
    if (!isBooting) return;

    if (currentIndex < messages.length) {
      const timeout = setTimeout(() => {
        setBootMessages(prev => [...prev, messages[currentIndex]]);
        setCurrentIndex(currentIndex + 1);
      }, Math.random() * 80 + 20); // Random delay between 20-100ms for realistic effect

      return () => clearTimeout(timeout);
    } else {
      // Boot complete - wait a moment then transition
      const timeout = setTimeout(() => {
        setIsBooting(false);
        if (onBootComplete) {
          setTimeout(onBootComplete, 500);
        }
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isBooting, messages, onBootComplete]);

  // Skip boot on any key press or click
  useEffect(() => {
    const handleSkip = () => {
      if (isBooting) {
        setIsBooting(false);
        if (onBootComplete) {
          onBootComplete();
        }
      }
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);

    return () => {
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
    };
  }, [isBooting, onBootComplete]);

  if (!isBooting && currentIndex >= messages.length) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black text-white font-mono text-[11px] leading-tight overflow-hidden z-[10000]"
      style={{ 
        fontFamily: '"Courier New", monospace',
        letterSpacing: '0.5px'
      }}
    >
      {/* Boot messages */}
      <div className="p-4 overflow-y-auto h-full">
        {bootMessages.map((msg, index) => (
          <div 
            key={index} 
            className={`${
              msg.includes('[  OK  ]') ? 'text-green-400' : 
              msg.includes('ERROR') ? 'text-red-400' :
              msg.includes('WARNING') ? 'text-yellow-400' :
              msg.includes('Retro Linux') ? 'text-cyan-400 font-bold' :
              'text-gray-300'
            }`}
          >
            {msg || '\u00A0'}
          </div>
        ))}
        
        {/* Blinking cursor */}
        {isBooting && (
          <span className="inline-block w-2 h-3 bg-white blink ml-0.5" />
        )}
      </div>

      {/* Loading bar at bottom */}
      {currentIndex > 10 && isBooting && (
        <div className="fixed bottom-4 left-4 right-4">
          <div className="text-cyan-400 mb-2">
            Loading system [{Math.min(100, Math.round((currentIndex / messages.length) * 100))}%]
          </div>
          <div className="w-full h-2 bg-gray-700 border border-gray-600">
            <div 
              className="h-full bg-cyan-500 transition-all duration-100"
              style={{ width: `${Math.min(100, (currentIndex / messages.length) * 100)}%` }}
            />
          </div>
          <div className="text-gray-400 text-[10px] mt-2 text-center">
            Press any key or click to skip boot sequence
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';

/**
 * CalculatorApp - Functional calculator application
 */
export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handlePercent = () => {
    const current = parseFloat(display);
    setDisplay(String(current / 100));
    setNewNumber(true);
  };

  const handleNegate = () => {
    const current = parseFloat(display);
    setDisplay(String(-current));
  };

  return (
    <div className="h-full flex flex-col bg-window p-3">
      <div className="max-w-xs mx-auto w-full space-y-2">
        {/* Display */}
        <div className="retro-border-in bg-white px-3 py-4 text-right">
          <div className="text-[10px] text-gray-600 h-3">
            {previousValue !== null && `${previousValue} ${operation || ''}`}
          </div>
          <div className="text-2xl font-bold font-mono truncate">
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-1">
          {/* Row 1 */}
          <button onClick={handleClear} className="retro-button px-2 py-3 text-xs font-bold bg-red-100">
            C
          </button>
          <button onClick={handleBackspace} className="retro-button px-2 py-3 text-xs">
            ⌫
          </button>
          <button onClick={handlePercent} className="retro-button px-2 py-3 text-xs">
            %
          </button>
          <button onClick={() => handleOperation('÷')} className="retro-button px-2 py-3 text-xs font-bold bg-blue-100">
            ÷
          </button>

          {/* Row 2 */}
          <button onClick={() => handleNumber(7)} className="retro-button px-2 py-3 text-xs">
            7
          </button>
          <button onClick={() => handleNumber(8)} className="retro-button px-2 py-3 text-xs">
            8
          </button>
          <button onClick={() => handleNumber(9)} className="retro-button px-2 py-3 text-xs">
            9
          </button>
          <button onClick={() => handleOperation('×')} className="retro-button px-2 py-3 text-xs font-bold bg-blue-100">
            ×
          </button>

          {/* Row 3 */}
          <button onClick={() => handleNumber(4)} className="retro-button px-2 py-3 text-xs">
            4
          </button>
          <button onClick={() => handleNumber(5)} className="retro-button px-2 py-3 text-xs">
            5
          </button>
          <button onClick={() => handleNumber(6)} className="retro-button px-2 py-3 text-xs">
            6
          </button>
          <button onClick={() => handleOperation('-')} className="retro-button px-2 py-3 text-xs font-bold bg-blue-100">
            -
          </button>

          {/* Row 4 */}
          <button onClick={() => handleNumber(1)} className="retro-button px-2 py-3 text-xs">
            1
          </button>
          <button onClick={() => handleNumber(2)} className="retro-button px-2 py-3 text-xs">
            2
          </button>
          <button onClick={() => handleNumber(3)} className="retro-button px-2 py-3 text-xs">
            3
          </button>
          <button onClick={() => handleOperation('+')} className="retro-button px-2 py-3 text-xs font-bold bg-blue-100">
            +
          </button>

          {/* Row 5 */}
          <button onClick={handleNegate} className="retro-button px-2 py-3 text-xs">
            +/-
          </button>
          <button onClick={() => handleNumber(0)} className="retro-button px-2 py-3 text-xs">
            0
          </button>
          <button onClick={handleDecimal} className="retro-button px-2 py-3 text-xs">
            .
          </button>
          <button onClick={handleEquals} className="retro-button px-2 py-3 text-xs font-bold bg-green-100">
            =
          </button>
        </div>

        {/* Info */}
        <div className="text-center text-[10px] text-gray-600 mt-2">
          Retro Calculator v1.0
        </div>
      </div>
    </div>
  );
}

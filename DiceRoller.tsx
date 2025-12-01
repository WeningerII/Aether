
import React, { useState, useEffect, useRef } from 'react';
import { Hexagon, Square, Triangle, Dices } from 'lucide-react';
import { rollDie as secureRoll, parseDiceString } from '../utils/gameLogic';

interface DiceRollerProps {
  onRoll: (value: number, type: string | number) => void;
}

const DiceRoller: React.FC<DiceRollerProps> = ({ onRoll }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [lastDie, setLastDie] = useState<number>(20);
  const [customFormula, setCustomFormula] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const rollDice = (sides: number) => {
    if (isRolling) return;
    setIsRolling(true);
    setLastDie(sides);

    const result = secureRoll(sides);

    timeoutRef.current = setTimeout(() => {
      setLastRoll(result);
      setIsRolling(false);
      onRoll(result, sides);
    }, 500);
  };

  const handleCustomRoll = (e: React.FormEvent) => {
      e.preventDefault();
      if (!customFormula.trim() || isRolling) return;
      
      setIsRolling(true);
      const result = parseDiceString(customFormula);
      
      timeoutRef.current = setTimeout(() => {
          setLastRoll(result);
          setIsRolling(false);
          onRoll(result, customFormula);
          setCustomFormula('');
      }, 500);
  };

  return (
    <div className="p-4 bg-slate-900 border-t border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Dice Tray</span>
        {lastRoll !== null && (
          <span className={`text-xl font-bold ${isRolling ? 'opacity-50' : 'animate-fade-in text-amber-400'}`}>
            {isRolling ? '...' : `Result: ${lastRoll}`}
          </span>
        )}
      </div>
      
      <div className="flex gap-2 justify-center mb-3">
        <button onClick={() => rollDice(4)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded transition flex flex-col items-center gap-1 group" disabled={isRolling}>
          <Triangle className={`w-6 h-6 text-indigo-400 ${isRolling && lastDie === 4 ? 'animate-roll' : 'group-hover:-translate-y-1'} transition-transform`} />
          <span className="text-xs text-slate-500 font-mono">d4</span>
        </button>

        <button onClick={() => rollDice(6)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded transition flex flex-col items-center gap-1 group" disabled={isRolling}>
          <Square className={`w-6 h-6 text-green-400 ${isRolling && lastDie === 6 ? 'animate-roll' : 'group-hover:-translate-y-1'} transition-transform`} />
          <span className="text-xs text-slate-500 font-mono">d6</span>
        </button>

        <button onClick={() => rollDice(8)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded transition flex flex-col items-center gap-1 group" disabled={isRolling}>
          <Triangle className={`w-6 h-6 rotate-180 text-emerald-400 ${isRolling && lastDie === 8 ? 'animate-roll' : 'group-hover:-translate-y-1'} transition-transform`} />
          <span className="text-xs text-slate-500 font-mono">d8</span>
        </button>

        <button onClick={() => rollDice(10)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded transition flex flex-col items-center gap-1 group" disabled={isRolling}>
          <div className={`w-6 h-6 flex items-center justify-center text-purple-400 font-bold border-2 border-purple-400 rounded-full ${isRolling && lastDie === 10 ? 'animate-roll' : 'group-hover:-translate-y-1'} transition-transform`}>10</div>
          <span className="text-xs text-slate-500 font-mono">d10</span>
        </button>

        <button onClick={() => rollDice(20)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded transition flex flex-col items-center gap-1 group" disabled={isRolling}>
          <Hexagon className={`w-6 h-6 text-amber-500 ${isRolling && lastDie === 20 ? 'animate-roll' : 'group-hover:-translate-y-1'} transition-transform`} />
          <span className="text-xs text-slate-500 font-mono">d20</span>
        </button>
      </div>

      <form onSubmit={handleCustomRoll} className="flex gap-2">
          <input 
            type="text" 
            value={customFormula}
            onChange={(e) => setCustomFormula(e.target.value)}
            placeholder="2d8+5"
            className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm text-white focus:border-amber-500 outline-none font-mono text-center"
          />
          <button type="submit" disabled={isRolling || !customFormula} className="px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded disabled:opacity-50">
              <Dices size={16} />
          </button>
      </form>
    </div>
  );
};

export default DiceRoller;

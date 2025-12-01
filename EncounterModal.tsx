import React, { useState } from 'react';
import { X, Swords, Eye, Play, Loader2, Wand2, AlertTriangle, Brain, Map } from 'lucide-react';
import { EncounterTheme, EncounterMode, EncounterDifficulty } from '../utils/encounterGenerator';

interface EncounterModalProps {
  onClose: () => void;
  onGenerate: (theme: EncounterTheme, mode: EncounterMode, difficulty: EncounterDifficulty, partyLevel: number, prompt: string) => void;
  isLoading: boolean;
  loadingStatus?: string;
}

const EncounterModal: React.FC<EncounterModalProps> = ({ onClose, onGenerate, isLoading, loadingStatus }) => {
  const [theme, setTheme] = useState<EncounterTheme>('Dungeon');
  const [mode, setMode] = useState<EncounterMode>('play');
  const [difficulty, setDifficulty] = useState<EncounterDifficulty>('medium');
  const [partyLevel, setPartyLevel] = useState<number>(3);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const themes: EncounterTheme[] = ['Dungeon', 'Forest', 'City', 'Crypt', 'Hell', 'Mountain', 'Swamp', 'Castle'];

  const handleGenerateClick = () => {
      setShowConfirm(true);
  };

  const handleConfirm = () => {
      setShowConfirm(false);
      onGenerate(theme, mode, difficulty, partyLevel, customPrompt);
  };

  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-amber-900/50 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Loading Overlay */}
        {isLoading && (
            <div className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center gap-6 p-8 text-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse"></div>
                    <Loader2 className="w-16 h-16 text-amber-500 animate-spin relative z-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-amber-100 font-serif animate-pulse">Forging Encounter</h3>
                    <p className="text-sm text-slate-400 font-mono">{loadingStatus || 'Consulting the archives...'}</p>
                </div>
                <div className="flex gap-4 mt-4 opacity-50">
                    <Map className="animate-bounce text-blue-400 delay-0" size={20} />
                    <Brain className="animate-bounce text-purple-400 delay-150" size={20} />
                    <Swords className="animate-bounce text-red-400 delay-300" size={20} />
                </div>
            </div>
        )}

        {/* Confirmation Overlay */}
        {showConfirm && !isLoading && (
            <div className="absolute inset-0 bg-slate-950/95 z-20 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                <AlertTriangle size={48} className="text-amber-500 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Overwrite Current Board?</h3>
                <p className="text-sm text-slate-400 mb-6">Generating a new encounter will clear all current tokens and map settings. This cannot be undone.</p>
                <div className="flex gap-3 w-full">
                    <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded">Cancel</button>
                    <button onClick={handleConfirm} className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow-lg">Confirm & Generate</button>
                </div>
            </div>
        )}

        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
            <h2 className="text-lg font-bold text-amber-500 flex items-center gap-2 font-serif">
                <Wand2 className="w-5 h-5" /> Auto-Encounter Builder
            </h2>
            <button onClick={onClose} disabled={isLoading} className="text-slate-400 hover:text-white"><X /></button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
            
            {/* Prompt Section */}
            <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-500 flex items-center gap-2">
                    <Brain size={12} /> Scenario Prompt (Optional)
                </label>
                <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g. A fiery bridge over a lava chasm guarded by fire elementals..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-amber-500 outline-none h-24 resize-none placeholder-slate-600"
                />
            </div>

            {/* Theme Grid */}
            <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-500">Biome / Theme</label>
                <div className="grid grid-cols-4 gap-2">
                    {themes.map(t => (
                        <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`px-2 py-2 rounded text-xs font-bold border transition-all ${theme === t ? 'bg-amber-900/40 border-amber-500 text-amber-100 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Difficulty */}
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-slate-500">Difficulty</label>
                    <div className="flex flex-col gap-1 bg-slate-900 rounded p-1 border border-slate-700">
                        {(['easy', 'medium', 'hard', 'deadly'] as const).map(d => (
                            <button
                                key={d}
                                onClick={() => setDifficulty(d)}
                                className={`flex-1 py-1.5 px-3 rounded text-xs font-bold capitalize transition text-left flex justify-between items-center ${difficulty === d ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
                            >
                                {d}
                                {difficulty === d && <div className={`w-2 h-2 rounded-full ${d === 'deadly' ? 'bg-red-600' : d === 'hard' ? 'bg-orange-500' : d === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Party Level */}
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-slate-500">Avg. Party Level</label>
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-2 flex items-center justify-between">
                        <button onClick={() => setPartyLevel(Math.max(1, partyLevel - 1))} className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white">-</button>
                        <span className="text-xl font-bold text-white font-mono">{partyLevel}</span>
                        <button onClick={() => setPartyLevel(Math.min(20, partyLevel + 1))} className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white">+</button>
                    </div>
                    <div className="text-[10px] text-slate-500 text-center">
                        Used for CR Calculations
                    </div>
                </div>
            </div>

            {/* Mode */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs uppercase font-bold text-slate-500">Simulation Mode</label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setMode('play')}
                        className={`p-3 rounded border-2 flex flex-col items-center gap-1 transition ${mode === 'play' ? 'border-green-500/50 bg-green-900/10 text-green-100' : 'border-slate-800 bg-slate-900 text-slate-500 hover:border-slate-600 hover:text-slate-300'}`}
                    >
                        <Play size={20} />
                        <span className="font-bold text-xs">Play Mode</span>
                    </button>
                    <button
                        onClick={() => setMode('watch')}
                        className={`p-3 rounded border-2 flex flex-col items-center gap-1 transition ${mode === 'watch' ? 'border-purple-500/50 bg-purple-900/10 text-purple-100' : 'border-slate-800 bg-slate-900 text-slate-500 hover:border-slate-600 hover:text-slate-300'}`}
                    >
                        <Eye size={20} />
                        <span className="font-bold text-xs">Watch AI vs AI</span>
                    </button>
                </div>
            </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800">
            <button
                onClick={handleGenerateClick}
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-amber-700 to-red-700 hover:from-amber-600 hover:to-red-600 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : <Swords />}
                Generate Encounter
            </button>
        </div>

      </div>
    </div>
  );
};

export default EncounterModal;
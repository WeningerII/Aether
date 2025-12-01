
import React, { useState } from 'react';
import { MONSTER_COMPENDIUM, getMonstersByType } from '../data/monsters';
import { MonsterType, TokenType, MonsterData } from '../types';
import { Skull, Shield, Zap, Heart, Plus, X, Wand2, Dices, Scroll } from 'lucide-react';
import { rollDie } from '../utils/gameLogic';

interface MonsterCompendiumProps {
  onAddMonster: (monster: MonsterData, count: number, autoCombat: boolean) => void;
  onClose: () => void;
  selectedTokenId?: string | null;
  onApplyMonster?: (tokenId: string, monster: MonsterData) => void;
}

const TYPES: MonsterType[] = ['Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon', 'Elemental', 'Fey', 'Fiend', 'Giant', 'Humanoid', 'Monstrosity', 'Ooze', 'Plant', 'Undead'];

const MonsterCompendium: React.FC<MonsterCompendiumProps> = ({ onAddMonster, onClose, selectedTokenId, onApplyMonster }) => {
  const [selectedType, setSelectedType] = useState<MonsterType | 'All'>('All');
  const [search, setSearch] = useState('');
  const [selectedMonster, setSelectedMonster] = useState<MonsterData | null>(null);
  const [spawnCount, setSpawnCount] = useState(1);
  const [autoCombat, setAutoCombat] = useState(true);

  const filteredMonsters = MONSTER_COMPENDIUM.filter(m => {
      const matchesType = selectedType === 'All' || m.type === selectedType;
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
  });

  const handleAdd = () => {
      if (selectedMonster) {
          onAddMonster(selectedMonster, spawnCount, autoCombat);
          onClose();
      }
  };

  const handleApply = () => {
      if (selectedMonster && selectedTokenId && onApplyMonster) {
          if (confirm(`Overwrite selected token stats with ${selectedMonster.name}?`)) {
              onApplyMonster(selectedTokenId, selectedMonster);
              onClose();
          }
      }
  };

  const handleRandomEncounter = () => {
      // Pick a random type if All
      const type = selectedType === 'All' ? TYPES[Math.floor(Math.random() * TYPES.length)] : selectedType;
      const candidates = getMonstersByType(type);
      
      if (candidates.length === 0) {
          alert(`No monsters found for type ${type}`);
          return;
      }
      
      const monster = candidates[Math.floor(Math.random() * candidates.length)];
      const count = rollDie(4) + 1; // 2-5 monsters
      
      onAddMonster(monster, count, true);
      onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-5xl h-[80vh] flex overflow-hidden">
        
        {/* Left Sidebar: Filters */}
        <div className="w-64 bg-slate-950 border-r border-slate-800 p-4 flex flex-col gap-2 overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Skull className="text-red-500" /> Bestiary</h2>
            <button 
                onClick={handleRandomEncounter}
                className="w-full mb-4 py-2 bg-purple-800 hover:bg-purple-700 text-white font-bold rounded shadow-lg border border-purple-600 flex items-center justify-center gap-2 text-sm"
            >
                <Dices size={16} /> Random Encounter
            </button>

            <input 
                type="text" 
                placeholder="Search..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white mb-4 focus:border-amber-500 outline-none"
            />
            <button 
                onClick={() => setSelectedType('All')}
                className={`text-left px-3 py-2 rounded text-sm font-bold ${selectedType === 'All' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
            >
                All Types
            </button>
            {TYPES.map(t => (
                <button 
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`text-left px-3 py-2 rounded text-sm ${selectedType === t ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-white'}`}
                >
                    {t}
                </button>
            ))}
        </div>

        {/* Middle: List */}
        <div className="w-80 border-r border-slate-800 overflow-y-auto p-2 bg-slate-900">
            {filteredMonsters.map(m => (
                <div 
                    key={m.id}
                    onClick={() => setSelectedMonster(m)}
                    className={`p-3 border-b border-slate-800 cursor-pointer hover:bg-slate-800 transition ${selectedMonster?.id === m.id ? 'bg-slate-800 border-l-4 border-l-amber-500' : ''}`}
                >
                    <div className="font-bold text-slate-200">{m.name}</div>
                    <div className="text-xs text-slate-500 flex justify-between mt-1">
                        <span>{m.type} • CR {m.cr}</span>
                        <span>{m.size}</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Right: Details & Add */}
        <div className="flex-1 p-6 bg-slate-900 flex flex-col overflow-y-auto relative">
             <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X /></button>
             
             {selectedMonster ? (
                 <div className="animate-fade-in">
                     <h1 className="text-3xl font-bold text-white mb-1">{selectedMonster.name}</h1>
                     <div className="text-sm text-slate-400 italic mb-4">{selectedMonster.size} {selectedMonster.type}, {selectedMonster.aiBehavior}</div>
                     
                     {selectedMonster.lore && (
                        <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50"></div>
                            <Scroll className="absolute top-2 right-2 text-slate-700 w-12 h-12 -rotate-12 opacity-20" />
                            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                <Scroll size={12} /> Lore
                            </h4>
                            <p className="text-sm text-slate-300 italic leading-relaxed">
                                {selectedMonster.lore}
                            </p>
                        </div>
                     )}
                     
                     <div className="grid grid-cols-3 gap-4 mb-6">
                         <div className="bg-slate-800 p-3 rounded border border-slate-700 flex flex-col items-center">
                             <Shield className="text-slate-400 mb-1" size={20} />
                             <span className="text-2xl font-bold text-white">{selectedMonster.ac}</span>
                             <span className="text-xs text-slate-500 uppercase">Armor Class</span>
                         </div>
                         <div className="bg-slate-800 p-3 rounded border border-slate-700 flex flex-col items-center">
                             <Heart className="text-red-500 mb-1" size={20} />
                             <span className="text-2xl font-bold text-white">{selectedMonster.hp}</span>
                             <span className="text-xs text-slate-500 uppercase">Hit Points</span>
                         </div>
                         <div className="bg-slate-800 p-3 rounded border border-slate-700 flex flex-col items-center">
                             <Zap className="text-amber-500 mb-1" size={20} />
                             <span className="text-2xl font-bold text-white">{selectedMonster.speed}</span>
                             <span className="text-xs text-slate-500 uppercase">Speed</span>
                         </div>
                     </div>

                     <div className="grid grid-cols-6 gap-2 text-center mb-6">
                         {Object.entries(selectedMonster.stats).map(([key, val]) => (
                             <div key={key} className="bg-slate-800 rounded p-2">
                                 <div className="text-xs text-slate-500 uppercase font-bold">{key}</div>
                                 <div className="text-white font-bold">{val as number}</div>
                                 <div className="text-[10px] text-slate-400">{Math.floor(((val as number)-10)/2) >= 0 ? '+' : ''}{Math.floor(((val as number)-10)/2)}</div>
                             </div>
                         ))}
                     </div>

                     <div className="mb-6">
                         <h3 className="text-amber-500 font-bold border-b border-slate-700 pb-1 mb-2">Actions</h3>
                         {selectedMonster.actions.map((action, i) => (
                             <div key={i} className="mb-3 text-sm">
                                 <span className="font-bold text-white">{action.name}.</span> <span className="text-slate-300">{action.desc}</span>
                             </div>
                         ))}
                     </div>
                     
                     {selectedMonster.traits && (
                        <div className="mb-6">
                            <h3 className="text-amber-500 font-bold border-b border-slate-700 pb-1 mb-2">Traits</h3>
                            {selectedMonster.traits.map((trait, i) => (
                                <div key={i} className="mb-2 text-sm">
                                    <span className="font-bold text-white">{trait.name}.</span> <span className="text-slate-300">{trait.desc}</span>
                                </div>
                            ))}
                        </div>
                     )}

                     <div className="mt-auto pt-6 border-t border-slate-800 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                             <div>
                                <label className="block text-xs text-slate-500 mb-1">Count</label>
                                <input type="number" min={1} max={10} value={spawnCount} onChange={e => setSpawnCount(Number(e.target.value))} className="bg-slate-950 border border-slate-700 rounded w-16 px-2 py-1 text-white" />
                             </div>
                             <div className="flex items-center gap-2 pt-4">
                                 <input type="checkbox" id="autoCombat" checked={autoCombat} onChange={e => setAutoCombat(e.target.checked)} />
                                 <label htmlFor="autoCombat" className="text-sm text-slate-300 cursor-pointer">Auto-Combat (AI)</label>
                             </div>
                         </div>
                         <div className="flex gap-2">
                             {selectedTokenId && onApplyMonster && (
                                 <button 
                                    onClick={handleApply}
                                    className="px-4 py-3 bg-indigo-700 hover:bg-indigo-600 text-white font-bold rounded shadow-lg flex items-center gap-2"
                                    title="Overwrite selected token stats with this monster"
                                 >
                                     <Wand2 size={20} /> Apply to Selected
                                 </button>
                             )}
                             <button 
                                onClick={handleAdd}
                                className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded shadow-lg flex items-center gap-2"
                             >
                                 <Plus size={20} /> Spawn Monster
                             </button>
                         </div>
                     </div>
                 </div>
             ) : (
                 <div className="flex-1 flex items-center justify-center text-slate-600 italic">
                     Select a monster to view details.
                 </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default MonsterCompendium;

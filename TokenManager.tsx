
import React, { useState, useRef, useEffect } from 'react';
import { TokenType, AbilityScores, Token, Item } from '../types';
import { SRD_HERITAGES, SRD_CLASSES, SRD_FEATS, FIGHTING_STYLES, SRD_BACKGROUNDS } from '../data/srd';
import { DAMAGE_TYPES } from '../constants';
import { ITEM_COMPENDIUM } from '../data/items';
import { Plus, X, Download, Link as LinkIcon, Loader2, AlertCircle, Dice5, Shield, ShieldOff, Zap, BookOpen, Upload, Image as ImageIcon, AlertTriangle, Wand2 } from 'lucide-react';
import { useTokenFactory } from '../hooks/useTokenFactory';
import { compressImage } from '../utils/imageCompression';
import { generateRandomNPC } from '../utils/npcGenerator';

interface TokenManagerProps {
  onAddToken: (token: Token) => void;
  onRemoveToken: (id: string) => void;
  onClose: () => void;
}

const TokenManager: React.FC<TokenManagerProps> = ({ onAddToken, onRemoveToken, onClose }) => {
  const { mode, setMode, form, importState, handlers } = useTokenFactory(onAddToken, onClose);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
          const compressed = await compressImage(file, 256, 0.7);
          form.setNewAvatarUrl(compressed);
      } catch (error) {
          console.error("Error compressing avatar:", error);
      }
  };

  // Validation check
  const isValid = () => {
      if (!form.newName.trim()) return "Character name is required.";
      if (form.newHp < 1) return "Max HP must be at least 1.";
      if (form.newAc < 0) return "AC cannot be negative.";
      if (form.newSpeed < 0) return "Speed cannot be negative.";
      return null;
  };

  const handleQuickGen = () => {
      const npc = generateRandomNPC(form.selectedLevel);
      handlers.populateForm(npc);
      setValidationError(null);
  };

  const handleAddTokenWithInventory = () => {
      const error = isValid();
      if (error) {
          setValidationError(error);
          return;
      }
      setValidationError(null);

      const starterKit: Item[] = [];
      const getItem = (id: string, qty: number = 1, equip: boolean = false) => {
          const item = ITEM_COMPENDIUM.find(i => i.id === id);
          if (item) starterKit.push({...item, id: Math.random().toString(), quantity: qty, equipped: equip});
      };

      // Basic Kit for everyone
      getItem('rations', 5);
      getItem('rope_hempen', 1);
      getItem('torch', 2);
      getItem('potion_healing', 1);

      // Class Specific Kits
      switch (form.selectedClass) {
          case 'Barbarian':
              getItem('greataxe', 1, true);
              getItem('handaxe', 2, true);
              getItem('javelin', 4);
              break;
          case 'Bard':
              getItem('rapier', 1, true);
              getItem('dagger', 1);
              getItem('leather', 1, true);
              getItem('lute', 1);
              break;
          case 'Cleric':
              getItem('mace', 1, true);
              getItem('scale_mail', 1, true);
              getItem('shield', 1, true);
              getItem('light_crossbow', 1);
              break;
          case 'Druid':
              getItem('scimitar', 1, true);
              getItem('leather', 1, true);
              getItem('shield', 1, true);
              getItem('quarterstaff', 1);
              break;
          case 'Fighter':
              getItem('longsword', 1, true);
              getItem('chain_mail', 1, true);
              getItem('shield', 1, true);
              getItem('light_crossbow', 1);
              break;
          case 'Monk':
              getItem('shortsword', 1, true);
              getItem('dart', 10);
              break;
          case 'Paladin':
              getItem('longsword', 1, true);
              getItem('chain_mail', 1, true);
              getItem('shield', 1, true);
              getItem('javelin', 5);
              break;
          case 'Ranger':
              getItem('shortsword', 2, true); // Dual wield
              getItem('longbow', 1);
              getItem('scale_mail', 1, true);
              break;
          case 'Rogue':
              getItem('rapier', 1, true);
              getItem('shortbow', 1);
              getItem('leather', 1, true);
              getItem('dagger', 2);
              getItem('thieves_tools', 1);
              break;
          case 'Sorcerer':
              getItem('light_crossbow', 1, true);
              getItem('dagger', 2);
              break;
          case 'Warlock':
              getItem('light_crossbow', 1, true);
              getItem('leather', 1, true);
              getItem('dagger', 2);
              getItem('quarterstaff', 1);
              break;
          case 'Wizard':
              getItem('quarterstaff', 1, true);
              getItem('spellbook', 1);
              break;
          default:
              getItem('dagger', 1, true);
              break;
      }

      handlers.handleAdd(starterKit);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-6xl p-6 max-h-[95vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Dice5 className="text-amber-500" /> Character Creator
              </h2>
              <button 
                onClick={handleQuickGen}
                className="text-xs flex items-center gap-1 bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-1 rounded border border-indigo-500/50 shadow-sm transition"
              >
                  <Wand2 size={14} /> Quick Gen NPC
              </button>
          </div>
          <button onClick={onClose}><X className="text-slate-400 hover:text-white" /></button>
        </div>
        
        {/* Validation Feedback */}
        {validationError && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-sm flex items-center gap-2">
                <AlertTriangle size={16} />
                {validationError}
            </div>
        )}

        <div className="flex-1 overflow-y-auto pr-2">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Left Column */}
                 <div className="space-y-4">
                     <div>
                         <label className="block text-xs text-slate-500 mb-1 uppercase font-bold">Character Name <span className="text-red-500">*</span></label>
                         <input 
                            type="text" 
                            value={form.newName} 
                            onChange={e => { form.setNewName(e.target.value); setValidationError(null); }} 
                            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:border-amber-500 outline-none"
                            placeholder="e.g. Aragorn"
                         />
                     </div>
                     <div className="grid grid-cols-3 gap-4">
                         <div>
                             <label className="block text-xs text-slate-500 mb-1 uppercase font-bold">Class</label>
                             <select value={form.selectedClass} onChange={e => form.setSelectedClass(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white outline-none text-sm">
                                 {SRD_CLASSES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                             </select>
                         </div>
                         <div>
                             <label className="block text-xs text-slate-500 mb-1 uppercase font-bold">Background</label>
                             <select value={form.selectedBackground} onChange={e => form.setSelectedBackground(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white outline-none text-sm">
                                 {SRD_BACKGROUNDS.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                             </select>
                         </div>
                         <div>
                             <label className="block text-xs text-slate-500 mb-1 uppercase font-bold">Level</label>
                             <input type="number" min={1} max={20} value={form.selectedLevel} onChange={e => form.setSelectedLevel(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white outline-none text-sm" />
                         </div>
                     </div>
                 </div>

                 {/* Right Column - Stats Preview */}
                 <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                     <h3 className="text-xs text-slate-400 font-bold uppercase mb-3">Derived Stats</h3>
                     <div className="grid grid-cols-3 gap-3 text-center">
                         <div className="bg-slate-900 p-2 rounded">
                             <div className="text-xs text-slate-500">HP</div>
                             <input 
                                type="number" 
                                min={1} 
                                className="w-full bg-transparent text-center text-xl font-bold text-green-400 outline-none"
                                value={form.newHp}
                                onChange={(e) => {
                                    const val = Math.max(1, parseInt(e.target.value) || 1);
                                    form.setNewHp(val);
                                    form.setNewMaxHp(val);
                                }}
                             />
                         </div>
                         <div className="bg-slate-900 p-2 rounded">
                             <div className="text-xs text-slate-500">AC</div>
                             <input 
                                type="number" 
                                min={0} 
                                className="w-full bg-transparent text-center text-xl font-bold text-blue-400 outline-none"
                                value={form.newAc}
                                onChange={(e) => form.setNewAc(Math.max(0, parseInt(e.target.value) || 10))}
                             />
                         </div>
                         <div className="bg-slate-900 p-2 rounded">
                             <div className="text-xs text-slate-500">Speed (cells)</div>
                             <input 
                                type="number" 
                                min={0} 
                                className="w-full bg-transparent text-center text-xl font-bold text-amber-400 outline-none"
                                value={form.newSpeed}
                                onChange={(e) => form.setNewSpeed(Math.max(0, parseInt(e.target.value) || 6))}
                             />
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="mt-6 p-4 bg-slate-800 rounded text-center text-slate-400 text-sm border border-slate-700/50">
                 <p>Stats, Hit Points, Armor Class, and Proficiencies are calculated automatically based on your selections.</p>
                 <p className="text-xs mt-1 opacity-60">Inventory is auto-populated with a class-specific starter kit.</p>
             </div>

             {/* Import Section */}
             <div className="mt-6 pt-6 border-t border-slate-800">
                 <div className="flex items-center gap-2 mb-4">
                     <h3 className="text-sm font-bold text-white">Import from D&D Beyond</h3>
                     <span className="text-[10px] bg-amber-900/50 text-amber-200 px-1.5 py-0.5 rounded border border-amber-700/50">Beta</span>
                 </div>
                 
                 <div className="flex gap-2">
                     <input 
                        type="text" 
                        value={importState.importUrl}
                        onChange={(e) => importState.setImportUrl(e.target.value)}
                        placeholder="Paste Character Sheet URL here..."
                        className="flex-1 bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white focus:border-indigo-500 outline-none"
                     />
                     <button 
                        onClick={importState.handleImport}
                        disabled={importState.isLoading || !importState.importUrl}
                        className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded flex items-center gap-2 transition"
                     >
                         {importState.isLoading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                         Import
                     </button>
                 </div>
                 {importState.importError && (
                     <div className="mt-2 text-red-400 text-xs flex items-center gap-1">
                         <AlertCircle size={12} /> {importState.importError}
                     </div>
                 )}
             </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button onClick={handlers.resetForm} className="px-4 py-2 text-slate-400 hover:text-white transition">Reset</button>
            <button 
                onClick={handleAddTokenWithInventory} 
                className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded shadow-lg hover:shadow-amber-900/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!form.newName.trim()}
            >
                Create Character
            </button>
        </div>
      </div>
    </div>
  );
};

export default TokenManager;

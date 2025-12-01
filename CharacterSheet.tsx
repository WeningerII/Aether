


import React, { useState, useMemo } from 'react';
import { Token, Item, ItemType, ActiveStatusEffect, WeaponItem, ArmorItem } from '../types';
import { Shield, Heart, Zap, Wind, Activity, Scroll, X, Swords, Backpack, Brain, Flame, Plus, Trash2, Beaker, Eye, BookOpen, Sparkles, Tent, Coins, Hammer, Briefcase, Truck, Gem, Minus, Grip, Award, Target, Clock, PawPrint, RotateCcw, Search, Filter } from 'lucide-react';
import { getModifier, getProficiencyBonus, isActor } from '../utils/gameLogic';
import { ITEM_COMPENDIUM } from '../data/items';
import { MONSTER_COMPENDIUM } from '../data/monsters';
import { SKILLS_LIST, SRD_SPELLS, SRD_CLASSES } from '../data/srd';

interface CharacterSheetProps {
  token: Token | null;
  isOpen: boolean;
  onClose: () => void;
  onUseItem: (tokenId: string, item: Item) => void;
  onAddItem: (tokenId: string, item: Item) => void;
  onRemoveItem: (tokenId: string, itemId: string) => void;
  onEquipItem: (tokenId: string, item: Item) => void;
  onManageSpell: (tokenId: string, action: 'LEARN' | 'FORGET', spellName: string) => void;
  onAdjustQuantity?: (tokenId: string, itemId: string, delta: number) => void;
  onAddStatus?: (tokenId: string, effect: ActiveStatusEffect) => void;
  onRemoveStatus?: (tokenId: string, effectId: string) => void;
  onAction: (action: string, subOption?: string) => void;
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ 
  token, 
  isOpen, 
  onClose, 
  onUseItem, 
  onAddItem, 
  onRemoveItem, 
  onEquipItem,
  onManageSpell,
  onAdjustQuantity,
  onAddStatus,
  onRemoveStatus,
  onAction
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'features' | 'spells' | 'inventory' | 'shapes'>('stats');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [newStatusName, setNewStatusName] = useState('');
  const [newStatusDuration, setNewStatusDuration] = useState(3);

  // Spell Filter State
  const [spellSearch, setSpellSearch] = useState('');
  const [spellLevelFilter, setSpellLevelFilter] = useState<string>('all');
  const [spellSchoolFilter, setSpellSchoolFilter] = useState<string>('all');
  const [spellClassFilter, setSpellClassFilter] = useState<string>('all');

  // HOOKS MUST RUN BEFORE CONDITIONAL RETURN
  // If token is not an Actor, treat as empty for hook purposes to prevent re-render issues
  const knownSpells = (token && isActor(token)) ? (token.knownSpells || []) : [];
  
  const knownSpellsData = useMemo(() => {
      return knownSpells.map(name => {
          const spell = SRD_SPELLS.find(s => s.name === name);
          return spell || { name, level: -1, school: 'Unknown', classes: [], castingTime: undefined };
      });
  }, [knownSpells]);

  const filteredSpells = useMemo(() => {
      return knownSpellsData.filter((spell: any) => {
          const matchesSearch = spell.name.toLowerCase().includes(spellSearch.toLowerCase());
          const matchesLevel = spellLevelFilter === 'all' || (spell.level !== -1 && spell.level.toString() === spellLevelFilter);
          const matchesSchool = spellSchoolFilter === 'all' || (spell.school && spell.school.toLowerCase() === spellSchoolFilter.toLowerCase());
          const matchesClass = spellClassFilter === 'all' || (spell.classes && spell.classes.includes(spellClassFilter));
          
          return matchesSearch && matchesLevel && matchesSchool && matchesClass;
      }).sort((a: any, b: any) => (a.level - b.level) || a.name.localeCompare(b.name));
  }, [knownSpellsData, spellSearch, spellLevelFilter, spellSchoolFilter, spellClassFilter]);

  // Guard against null or non-Actor tokens
  if (!token || !isActor(token)) return null;

  const stats = token.stats || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  const level = token.level || 1;
  const prof = getProficiencyBonus(level);
  const isDruid = token.class === 'Druid' && level >= 2;

  const handleAddStatus = () => {
      if (onAddStatus && newStatusName) {
          onAddStatus(token.id, { id: newStatusName, duration: newStatusDuration });
          setNewStatusName('');
          setNewStatusDuration(3);
      }
  };

  // Inventory Filtering
  const inventory = token.inventory || [];
  const weapons = inventory.filter(i => i.type === 'weapon');
  const armor = inventory.filter(i => i.type === 'armor');
  const magic = inventory.filter(i => i.type === 'magic' || i.type === 'potion' || i.type === 'scroll');
  const currency = inventory.filter(i => i.type === 'currency' || i.type === 'treasure');
  const gear = inventory.filter(i => !['weapon', 'armor', 'magic', 'potion', 'scroll', 'currency', 'treasure'].includes(i.type));

  const getTotalWeight = () => inventory.reduce((acc, item) => acc + ((item.weight || 0) * item.quantity), 0).toFixed(1);

  // Helper to render individual inventory item
  const ItemRow = ({ item }: { item: Item }) => {
      const isEquipped = item.equipped;
      let Icon = Backpack;
      if (item.type === 'weapon') Icon = Swords;
      if (item.type === 'armor') Icon = Shield;
      if (item.type === 'potion') Icon = Beaker;
      if (item.type === 'scroll') Icon = Scroll;
      if (item.type === 'currency' || item.type === 'treasure') Icon = Gem;

      return (
        <div className="group flex items-center justify-between p-3 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-all mb-2">
            <div className="flex items-center gap-3 overflow-hidden">
                <div className={`p-2 rounded-md ${isEquipped ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700/30 text-slate-500'}`}>
                    <Icon size={16} />
                </div>
                <div className="min-w-0">
                    <div className={`text-sm font-medium truncate ${isEquipped ? 'text-indigo-200' : 'text-slate-300'}`}>{item.name}</div>
                    <div className="text-[10px] text-slate-500 flex gap-2">
                        <span className="uppercase tracking-wide">{item.type}</span>
                        {item.weight && <span>{item.weight}lb</span>}
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                 {/* Action Buttons */}
                 {(item.type === 'potion' || item.type === 'scroll' || item.type === 'currency') && (
                    <button onClick={() => onUseItem(token.id, item)} className="p-2 rounded hover:bg-green-900/30 text-slate-500 hover:text-green-400 transition" title="Use">
                        <Zap size={14} />
                    </button>
                 )}
                 {(['weapon', 'armor', 'magic'].includes(item.type)) && (
                    <button onClick={() => onEquipItem(token.id, item)} className={`p-2 rounded transition ${isEquipped ? 'text-indigo-400 bg-indigo-900/20' : 'text-slate-600 hover:text-slate-300 hover:bg-slate-700'}`} title="Equip">
                        <Shield size={14} />
                    </button>
                 )}
                 
                 {/* Qty & Delete */}
                 <div className="flex items-center bg-slate-900 rounded px-2 py-1 border border-slate-700">
                     {onAdjustQuantity ? (
                         <>
                            <button onClick={() => onAdjustQuantity(token.id, item.id, -1)} className="hover:text-white text-slate-500"><Minus size={10}/></button>
                            <span className="mx-2 text-xs font-mono text-slate-300">{item.quantity}</span>
                            <button onClick={() => onAdjustQuantity(token.id, item.id, 1)} className="hover:text-white text-slate-500"><Plus size={10}/></button>
                         </>
                     ) : <span className="text-xs">{item.quantity}</span>}
                 </div>
                 <button onClick={() => onRemoveItem(token.id, item.id)} className="p-2 text-slate-600 hover:text-red-400 transition opacity-0 group-hover:opacity-100"><Trash2 size={14}/></button>
            </div>
        </div>
      );
  };

  return (
    <div className="h-full flex flex-col bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 text-slate-200 shadow-2xl font-sans">
        {/* --- Header --- */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-b from-slate-800/50 to-transparent">
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-5">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-600 shadow-2xl bg-slate-900">
                            {token.avatarUrl ? <img src={token.avatarUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-4xl">{token.symbol}</div>}
                        </div>
                        <div className="absolute -bottom-3 -right-3 bg-slate-900 border border-slate-700 rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold text-white shadow-lg font-serif">
                            {level}
                        </div>
                    </div>
                    <div className="pt-1">
                        <h2 className="text-3xl font-serif font-bold text-white tracking-tight text-shadow-sm">{token.name}</h2>
                        <div className="text-sm text-amber-500 font-medium uppercase tracking-wider mb-3">{token.heritage} {token.class}</div>
                        <div className="flex gap-2">
                            <Badge label={`AC ${token.ac}`} color="bg-slate-800 text-indigo-300 border-indigo-500/30" icon={Shield} />
                            <Badge label={`HP ${token.hp}/${token.maxHp}`} color="bg-slate-800 text-red-300 border-red-500/30" icon={Heart} />
                            <Badge label={`${token.speed ? token.speed * 5 : 30}ft`} color="bg-slate-800 text-emerald-300 border-emerald-500/30" icon={Wind} />
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="text-slate-500 hover:text-white p-2 hover:bg-slate-800 rounded-full transition"><X size={24} /></button>
            </div>
            
            {/* Tabs */}
            <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800 shadow-inner">
                {(['stats', 'inventory', 'features', 'spells'] as const).map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === tab ? 'bg-slate-800 text-amber-400 shadow-sm border border-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        {tab}
                    </button>
                ))}
                {isDruid && (
                    <button onClick={() => setActiveTab('shapes')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === 'shapes' ? 'bg-emerald-900/30 text-emerald-200' : 'text-slate-500'}`}>
                        Shapes
                    </button>
                )}
            </div>
        </div>

        {/* --- Content --- */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gradient-to-b from-slate-950 to-slate-900">
            
            {/* STATS TAB */}
            {activeTab === 'stats' && (
                <div className="space-y-8 animate-fade-in">
                    {/* Ability Scores Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        {Object.entries(stats).map(([key, val]) => {
                            const mod = getModifier(val as number);
                            return (
                                <div key={key} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col items-center shadow-md relative group hover:border-slate-700 transition-colors">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{key}</span>
                                    <span className="text-2xl font-bold text-white font-serif">{mod >= 0 ? '+' : ''}{mod}</span>
                                    <div className="absolute -bottom-2.5 bg-slate-950 px-2 py-0.5 rounded-full text-[10px] text-slate-400 border border-slate-800 shadow-sm font-mono">{val as number}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Combat Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <StatBox label="Proficiency" value={`+${prof}`} icon={Award} />
                        <StatBox label="Initiative" value={((token.initiative || 0) >= 0 ? '+' : '') + (token.initiative || 0)} icon={Zap} />
                        {token.spellAbility && (
                            <>
                                <StatBox label="Spell Attack" value={`+${token.spellAttackBonus || 0}`} icon={Sparkles} highlight />
                                <StatBox label="Spell DC" value={token.spellSaveDC || 0} icon={Target} highlight />
                            </>
                        )}
                    </div>

                    {/* Skills & Saves */}
                    <div className="grid grid-cols-1 gap-6">
                        <div className="glass-panel rounded-xl p-5">
                            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-widest"><Shield size={14} className="text-indigo-400"/> Saving Throws</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {Object.keys(stats).map(key => {
                                    const isProf = token.savingThrowProficiencies?.includes(key);
                                    const mod = getModifier(stats[key as keyof typeof stats] as number) + (isProf ? prof : 0) + (token.globalSaveBonus || 0);
                                    return (
                                        <div key={key} className={`flex justify-between px-3 py-2 rounded-lg text-xs border transition-colors ${isProf ? 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200' : 'bg-slate-900 border-transparent text-slate-400'}`}>
                                            <span className="uppercase font-bold">{key.substring(0,3)}</span>
                                            <span className="font-mono font-bold">{mod >= 0 ? '+' : ''}{mod}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        
                        <div className="glass-panel rounded-xl p-5">
                            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-widest"><Activity size={14} className="text-amber-400"/> Skills</h3>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                {SKILLS_LIST.map(skill => {
                                    const isProf = token.skillProficiencies?.includes(skill.name);
                                    const mod = getModifier(stats[skill.ability as keyof typeof stats] as number) + (isProf ? prof : 0) + (token.globalCheckBonus || 0);
                                    return (
                                        <div key={skill.name} className={`flex justify-between items-center text-xs py-1.5 px-2 rounded border-b border-dashed ${isProf ? 'text-amber-100 border-amber-500/30 bg-amber-900/5' : 'text-slate-400 border-slate-800'}`}>
                                            <span>{skill.name} <span className="text-[9px] opacity-50 ml-1 uppercase">({skill.ability})</span></span>
                                            <span className={`font-mono font-bold ${isProf ? 'text-amber-400' : 'text-slate-500'}`}>{mod >= 0 ? '+' : ''}{mod}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* INVENTORY TAB */}
            {activeTab === 'inventory' && (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Weight: <span className="text-white font-mono text-sm ml-1">{getTotalWeight()} lb</span></div>
                        <button onClick={() => setIsAddingItem(!isAddingItem)} className="text-xs flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition shadow-lg font-bold">
                            {isAddingItem ? <X size={14} /> : <Plus size={14} />} Add Item
                        </button>
                    </div>

                    {/* Search/Add */}
                    {isAddingItem && (
                        <div className="animate-fade-in bg-slate-900 p-4 rounded-xl border border-indigo-500/30 shadow-xl">
                            <input 
                                autoFocus
                                type="text" 
                                placeholder="Search item compendium..." 
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:border-indigo-500 outline-none mb-3 shadow-inner"
                                value={searchItem}
                                onChange={e => setSearchItem(e.target.value)}
                            />
                            <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-1">
                                {ITEM_COMPENDIUM.filter(i => i.name.toLowerCase().includes(searchItem.toLowerCase())).slice(0, 20).map(item => (
                                    <button key={item.id} onClick={() => { onAddItem(token.id, item); setIsAddingItem(false); setSearchItem(''); }} className="w-full text-left text-xs p-3 hover:bg-slate-800 rounded-lg flex justify-between text-slate-300 border border-transparent hover:border-slate-700 transition-all">
                                        <span className="font-bold">{item.name}</span>
                                        <span className="text-slate-500 uppercase text-[10px] tracking-wider bg-slate-950 px-2 py-0.5 rounded">{item.type}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Currency */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 grid grid-cols-5 gap-2 text-center shadow-inner">
                        <CurrencyBox label="CP" value={token.wallet?.cp} color="text-orange-700" border="border-orange-900/30" />
                        <CurrencyBox label="SP" value={token.wallet?.sp} color="text-slate-400" border="border-slate-700/50" />
                        <CurrencyBox label="EP" value={token.wallet?.ep} color="text-slate-500" border="border-slate-800" />
                        <CurrencyBox label="GP" value={token.wallet?.gp} color="text-amber-400" border="border-amber-500/30" />
                        <CurrencyBox label="PP" value={token.wallet?.pp} color="text-indigo-200" border="border-indigo-500/30" />
                    </div>

                    {/* Lists */}
                    <div className="space-y-6">
                        {weapons.length > 0 && <InventorySection title="Weapons" items={weapons} render={ItemRow} icon={Swords} />}
                        {armor.length > 0 && <InventorySection title="Armor" items={armor} render={ItemRow} icon={Shield} />}
                        {magic.length > 0 && <InventorySection title="Magic & Potions" items={magic} render={ItemRow} icon={Sparkles} />}
                        {gear.length > 0 && <InventorySection title="Gear" items={gear} render={ItemRow} icon={Backpack} />}
                    </div>
                </div>
            )}

            {/* SPELLS TAB */}
            {activeTab === 'spells' && (
                <div className="space-y-6 animate-fade-in">
                    {/* Search & Filters */}
                    <div className="glass-panel p-4 rounded-xl space-y-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search known spells..."
                                value={spellSearch}
                                onChange={(e) => setSpellSearch(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white focus:border-indigo-500 outline-none transition-all placeholder-slate-600 shadow-inner"
                            />
                            <Search className="absolute left-3 top-3 text-slate-500" size={16} />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <select
                                    value={spellLevelFilter}
                                    onChange={(e) => setSpellLevelFilter(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 outline-none appearance-none cursor-pointer hover:border-slate-600"
                                >
                                    <option value="all">All Levels</option>
                                    <option value="0">Cantrip</option>
                                    {[1,2,3,4,5,6,7,8,9].map(l => <option key={l} value={l.toString()}>Level {l}</option>)}
                                </select>
                                <div className="absolute right-3 top-2.5 pointer-events-none text-slate-500"><Filter size={12}/></div>
                            </div>
                            <div className="flex-1 relative">
                                <select
                                    value={spellSchoolFilter}
                                    onChange={(e) => setSpellSchoolFilter(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 outline-none appearance-none cursor-pointer hover:border-slate-600"
                                >
                                    <option value="all">All Schools</option>
                                    {['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <div className="absolute right-3 top-2.5 pointer-events-none text-slate-500"><Filter size={12}/></div>
                            </div>
                        </div>
                    </div>

                    {/* Spells List */}
                    <div className="space-y-3">
                        {filteredSpells.map(spell => (
                            <div key={spell.name} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex justify-between items-center group hover:border-indigo-500/30 transition-all hover:shadow-md hover:bg-slate-900">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-indigo-950/50 rounded-lg flex items-center justify-center text-indigo-400 border border-indigo-500/20 font-serif font-bold text-xs">
                                            {spell.level === 0 ? 'C' : spell.level}
                                        </div>
                                        <span className="font-bold text-sm text-indigo-100 font-serif tracking-wide">{spell.name}</span>
                                    </div>
                                    <div className="text-[10px] text-slate-500 ml-11 mt-1 flex gap-3 uppercase tracking-wider">
                                        {spell.school && <span>{spell.school}</span>}
                                        {spell.castingTime && <span className="text-slate-600">• {spell.castingTime}</span>}
                                    </div>
                                </div>
                                <button onClick={() => onManageSpell(token.id, 'FORGET', spell.name)} className="text-slate-600 hover:text-red-400 p-2 hover:bg-slate-950 rounded-lg transition opacity-0 group-hover:opacity-100" title="Forget Spell"><X size={16}/></button>
                            </div>
                        ))}
                        {filteredSpells.length === 0 && (
                            <div className="text-center text-slate-500 py-12 flex flex-col items-center gap-3">
                                <div className="p-4 bg-slate-900 rounded-full border border-slate-800"><Sparkles className="text-slate-700" size={24} /></div>
                                <span className="text-sm italic">No spells found matching filters.</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* FEATURES TAB */}
            {activeTab === 'features' && (
                <div className="space-y-4 animate-fade-in">
                    {token.traits?.map((trait, i) => {
                        const [name, desc] = trait.includes(':') ? trait.split(/:(.+)/) : [trait, ''];
                        return (
                            <div key={i} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl shadow-sm">
                                <div className="font-bold text-amber-100 text-sm mb-1 font-serif">{name.replace(/\[.*?\]/, '').trim()} <span className="text-[10px] text-amber-500/70 uppercase tracking-wider ml-2 font-sans bg-amber-950/30 px-2 py-0.5 rounded">{name.match(/\[(.*?)\]/)?.[1] || 'Feature'}</span></div>
                                <div className="text-sm text-slate-400 leading-relaxed">{desc.trim() || name}</div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    </div>
  );
};

const Badge = ({ label, color, icon: Icon }: any) => (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border flex items-center gap-1.5 shadow-sm ${color}`}>
        <Icon size={10} /> {label}
    </span>
);

const StatBox = ({ label, value, icon: Icon, highlight }: any) => (
    <div className={`bg-slate-900 border rounded-xl p-3 flex items-center justify-between shadow-sm ${highlight ? 'border-indigo-500/30 bg-indigo-950/10' : 'border-slate-800'}`}>
        <div className="flex items-center gap-2 text-xs text-slate-400 uppercase font-bold tracking-wider">
            <Icon size={14} className={highlight ? 'text-indigo-400' : 'text-slate-500'} /> {label}
        </div>
        <span className={`text-xl font-bold font-serif ${highlight ? 'text-indigo-100' : 'text-white'}`}>{value}</span>
    </div>
);

const CurrencyBox = ({ label, value, color, border }: any) => (
    <div className={`bg-slate-900 rounded-lg p-2 border ${border}`}>
        <div className={`text-[10px] font-bold mb-1 ${color} tracking-widest`}>{label}</div>
        <div className="text-xs font-mono text-white font-bold">{value || 0}</div>
    </div>
);

const InventorySection = ({ title, items, render, icon: Icon }: any) => (
    <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2 pl-1 tracking-widest border-b border-slate-800 pb-2">
            <Icon size={12} /> {title}
        </h4>
        <div>{items.map((item: any) => render({ item }))}</div>
    </div>
);

export default CharacterSheet;

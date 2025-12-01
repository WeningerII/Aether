
import React, { useState, useMemo } from 'react';
import { ITEM_COMPENDIUM } from '../data/items';
import { Item, ItemType } from '../types';
import { Search, X, Package, Filter, Plus, Coins, Weight, Shield, Zap, Sword, Briefcase, Gem, Scroll } from 'lucide-react';

interface ItemCompendiumProps {
  onAddItem: (item: Item) => void;
  onClose: () => void;
  selectedTokenId: string | null;
}

const CATEGORIES: { id: string; label: string; icon: any }[] = [
    { id: 'all', label: 'All Items', icon: Package },
    { id: 'weapon', label: 'Weapons', icon: Sword },
    { id: 'armor', label: 'Armor', icon: Shield },
    { id: 'magic', label: 'Magic Items', icon: Zap },
    { id: 'potion', label: 'Potions', icon: FlaskIcon },
    { id: 'gear', label: 'Gear', icon: Briefcase },
    { id: 'treasure', label: 'Treasure', icon: Gem },
];

// Helper icon for potions since lucide 'Beaker' is often used, but I'll use a generic shape or Lucide's Flask if available, else Zap default
function FlaskIcon(props: any) { return <Zap {...props} />; } 

const ItemCompendium: React.FC<ItemCompendiumProps> = ({ onAddItem, onClose, selectedTokenId }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [rarityFilter, setRarityFilter] = useState<string>('all');

  const filteredItems = useMemo(() => {
      return ITEM_COMPENDIUM.filter(item => {
          const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
          
          let matchesCategory = true;
          if (category !== 'all') {
              if (category === 'magic') {
                  matchesCategory = item.type === 'magic' || (item as any).isMagic;
              } else {
                  matchesCategory = item.type === category;
              }
          }

          const matchesRarity = rarityFilter === 'all' || (item.rarity || 'common') === rarityFilter;

          return matchesSearch && matchesCategory && matchesRarity;
      }).sort((a, b) => a.name.localeCompare(b.name));
  }, [search, category, rarityFilter]);

  const getRarityColor = (rarity?: string) => {
      switch (rarity) {
          case 'uncommon': return 'text-green-400 border-green-500/30 bg-green-900/10';
          case 'rare': return 'text-blue-400 border-blue-500/30 bg-blue-900/10';
          case 'very_rare': return 'text-purple-400 border-purple-500/30 bg-purple-900/10';
          case 'legendary': return 'text-orange-400 border-orange-500/30 bg-orange-900/10';
          default: return 'text-slate-400 border-slate-700 bg-slate-800/50';
      }
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-900/20 rounded-lg border border-amber-500/30">
                    <Package className="text-amber-500" size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white font-serif tracking-wide">Item Compendium</h2>
                    <p className="text-xs text-slate-400">Browse equipment, magic items, and treasures.</p>
                </div>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white p-2 hover:bg-slate-800 rounded transition"><X /></button>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Filters */}
            <div className="w-64 bg-slate-950 border-r border-slate-800 p-4 flex flex-col gap-4 overflow-y-auto">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search items..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:border-amber-500 outline-none transition-all"
                    />
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                </div>

                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category</h3>
                    <div className="space-y-1">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${category === cat.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                            >
                                <cat.icon size={16} />
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Rarity</h3>
                    <select 
                        value={rarityFilter} 
                        onChange={(e) => setRarityFilter(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-slate-300 outline-none"
                    >
                        <option value="all">All Rarities</option>
                        <option value="common">Common</option>
                        <option value="uncommon">Uncommon</option>
                        <option value="rare">Rare</option>
                        <option value="very_rare">Very Rare</option>
                        <option value="legendary">Legendary</option>
                    </select>
                </div>
            </div>

            {/* Item Grid */}
            <div className="flex-1 bg-slate-900/50 p-6 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredItems.map(item => (
                        <div key={item.id} className="group bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-4 flex flex-col gap-3 transition-all hover:shadow-lg relative overflow-hidden">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-indigo-100 text-lg">{item.name}</h3>
                                        {item.rarity && item.rarity !== 'common' && (
                                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getRarityColor(item.rarity)}`}>
                                                {item.rarity.replace('_', ' ')}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-slate-500 flex items-center gap-3">
                                        <span className="uppercase tracking-wider">{item.type}</span>
                                        {(item as any).armorCategory && <span>• {(item as any).armorCategory}</span>}
                                        {(item as any).category && <span>• {(item as any).category}</span>}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => onAddItem(item)}
                                    disabled={!selectedTokenId}
                                    className="p-2 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg transition shadow-lg"
                                    title={selectedTokenId ? "Add to selected character" : "Select a character first"}
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="text-sm text-slate-300 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                                {item.description || "No description available."}
                            </div>

                            <div className="mt-auto pt-3 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-400 font-mono">
                                <div className="flex items-center gap-1" title="Cost">
                                    <Coins size={12} className="text-amber-400" />
                                    <span>
                                        {item.cost ? (item.cost >= 100 ? `${item.cost/100}gp` : `${item.cost}cp`) : '-'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1" title="Weight">
                                    <Weight size={12} className="text-slate-500" />
                                    <span>{item.weight || 0} lb</span>
                                </div>
                                {(item as any).damage && (
                                    <div className="flex items-center gap-1 text-red-400">
                                        <Sword size={12} />
                                        <span>{(item as any).damage.dice} {(item as any).damage.type}</span>
                                    </div>
                                )}
                                {(item as any).baseAC && (
                                    <div className="flex items-center gap-1 text-indigo-400">
                                        <Shield size={12} />
                                        <span>{(item as any).baseAC} AC</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {filteredItems.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-600">
                            <Package size={48} className="mb-4 opacity-20" />
                            <p className="text-lg font-medium">No items found.</p>
                            <p className="text-sm">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
        {/* Footer Info */}
        {!selectedTokenId && (
            <div className="bg-amber-900/20 border-t border-amber-900/50 p-2 text-center text-xs text-amber-500 font-bold flex items-center justify-center gap-2">
                <Filter size={12} />
                Select a character token on the board to add items to their inventory.
            </div>
        )}
      </div>
    </div>
  );
};

export default ItemCompendium;




import React, { useState, useRef, useEffect } from 'react';
import { Token, ActiveStatusEffect, Actor } from '../types';
import { Timer, FastForward, RotateCw, Music, Star, ChevronUp, ChevronDown, Sword, Skull, Flame, Droplet, Zap, EyeOff, MoveDown, Shield, Eye, Ghost, Battery, Box, Brain, AlertCircle, Wind, Moon } from 'lucide-react';
import { hasStatus, isActor } from '../utils/gameLogic';

interface InitiativeTrackerProps {
  tokens: Token[];
  onRollInitiative: () => void;
  onNextTurn: () => void;
  selectedTokenId: string | null;
  activeTurnId: string | null;
  onSelectToken: (id: string) => void;
  onUseInspiration: (id: string) => void;
  onUpdateInitiative: (id: string, val: number) => void;
  className?: string;
}

const getStatusIcon = (id: string) => {
    switch (id.toLowerCase()) {
        case 'burning': return Flame;
        case 'poisoned': return Droplet;
        case 'stunned': return Zap;
        case 'paralyzed': return Zap;
        case 'invisible': return EyeOff;
        case 'prone': return MoveDown;
        case 'rage': return Skull;
        case 'dodge': return Shield;
        case 'blinded': return Eye;
        case 'frightened': return Ghost;
        case 'exhaustion': return Battery;
        case 'restrained': return Box;
        case 'concentrating': return Brain;
        case 'bardic_inspiration': return Music;
        case 'bless': return Star;
        case 'bane': return AlertCircle;
        case 'haste': return Wind;
        case 'flying': return Wind;
        case 'unconscious': return Moon;
        default: return AlertCircle;
    }
};

const StatusIndicator: React.FC<{ effect: ActiveStatusEffect }> = ({ effect }) => {
    const Icon = getStatusIcon(effect.id);
    return (
        <div 
            className="flex items-center gap-1 bg-slate-900/80 rounded-full px-1.5 py-0.5 border border-slate-700/50 text-[10px] text-slate-300"
            title={`${effect.id} (${effect.duration} rounds)`}
        >
            <Icon size={10} className="text-amber-400" />
            <span className="font-mono">{effect.duration > 900 ? '∞' : effect.duration}</span>
        </div>
    );
};

const InitiativeTracker: React.FC<InitiativeTrackerProps> = ({ 
  tokens, 
  onRollInitiative,
  onNextTurn,
  selectedTokenId,
  activeTurnId,
  onSelectToken,
  onUseInspiration,
  onUpdateInitiative,
  className = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const activeRef = useRef<HTMLDivElement>(null);

  // Filter only Actors and Sort by initiative (descending)
  const sortedTokens = tokens
    .filter(isActor)
    .sort((a, b) => (b.initiative || 0) - (a.initiative || 0));

  const activeToken = sortedTokens.find(t => t.id === activeTurnId);

  // Auto-scroll to active token
  useEffect(() => {
    if (activeRef.current && !isCollapsed) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeTurnId, isCollapsed]);

  const handleInitiativeChange = (e: React.ChangeEvent<HTMLInputElement>, token: Token) => {
      const val = parseInt(e.target.value);
      if (!isNaN(val)) {
          onUpdateInitiative(token.id, val);
      }
  };

  return (
    <div className={`absolute top-20 right-4 z-20 transition-all duration-300 ease-in-out flex flex-col items-end ${className}`}>
      <div className={`bg-slate-900/95 border border-slate-700 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden flex flex-col animate-fade-in transition-all duration-300 ring-1 ring-black/50 ${isCollapsed ? 'w-auto' : 'w-72'}`}>
        
        {/* Header Row */}
        <div 
            className="p-3 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-800 cursor-pointer hover:from-slate-800 hover:to-slate-700 transition-all group"
            onClick={() => setIsCollapsed(!isCollapsed)}
        >
            <div className="flex items-center gap-2">
                <div className="bg-amber-950/50 p-1.5 rounded text-amber-500 border border-amber-900/50"><Timer size={14} /></div>
                {!isCollapsed && <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-serif">Turn Order</h3>}
                {isCollapsed && activeToken && (
                     <div className="flex items-center gap-2 text-xs animate-fade-in">
                         <span className="font-bold text-amber-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-700">{activeToken.initiative}</span>
                         <span className="max-w-[80px] truncate font-bold text-white">{activeToken.name}</span>
                     </div>
                )}
            </div>
            
            <div className="flex gap-1 items-center">
                {!isCollapsed && (
                    <>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onRollInitiative(); }}
                            title="Roll Initiative"
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg border border-slate-700 transition shadow-sm"
                        >
                            <RotateCw size={14} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onNextTurn(); }}
                            title="Next Turn"
                            className="p-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg border border-amber-600/50 transition shadow-md flex items-center gap-1 text-[10px] font-bold px-3 ml-1"
                        >
                            Next <FastForward size={12} fill="currentColor" />
                        </button>
                    </>
                )}
                <div className={`text-slate-500 group-hover:text-white transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'} ml-1`}>
                    <ChevronDown size={16} />
                </div>
            </div>
        </div>
        
        {/* List View */}
        {!isCollapsed && (
            <div className="max-h-[50vh] overflow-y-auto p-2 space-y-1 custom-scrollbar bg-slate-950/80">
                {sortedTokens.map((token, index) => {
                    const isActive = token.id === activeTurnId;
                    const isSelected = token.id === selectedTokenId;
                    const hasBardic = hasStatus(token, 'bardic_inspiration');
                    const hasHeroicInspiration = hasStatus(token, 'heroic_inspiration');
                    const hpPercent = token.maxHp ? (token.hp || 0) / token.maxHp : 1;
                    const actor = token as Actor;

                    return (
                        <div 
                            key={token.id}
                            ref={isActive ? activeRef : null}
                            onClick={() => onSelectToken(token.id)}
                            className={`
                                group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all border relative overflow-hidden
                                ${isActive 
                                    ? 'bg-amber-900/20 border-amber-500/40 shadow-[inset_0_0_20px_rgba(245,158,11,0.1)]' 
                                    : isSelected 
                                        ? 'bg-slate-800 border-slate-600' 
                                        : 'hover:bg-slate-800/50 border-transparent hover:border-slate-700'
                                }
                            `}
                        >
                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 shadow-[0_0_10px_#f59e0b]" />}
                            
                            {/* Editable Initiative */}
                            <input 
                                type="number"
                                value={token.initiative || 0}
                                onChange={(e) => handleInitiativeChange(e, token)}
                                onClick={(e) => e.stopPropagation()}
                                className={`w-8 h-6 text-center text-xs font-bold font-mono rounded border bg-slate-900 focus:ring-1 focus:ring-amber-500 outline-none ${isActive ? 'text-amber-400 border-amber-900/50' : 'text-slate-400 border-slate-700'}`}
                            />
                            
                            <div className="relative">
                                <div 
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm shadow-lg border-2 border-white/10 relative z-10 overflow-hidden"
                                    style={{ backgroundColor: token.color }}
                                >
                                    {actor.avatarUrl ? (
                                        <img src={actor.avatarUrl} className="w-full h-full object-cover" />
                                    ) : token.symbol}
                                </div>
                                {hpPercent < 0.5 && hpPercent > 0 && (
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-slate-900 z-20 animate-pulse" />
                                )}
                                {(actor.hp || 0) <= 0 && (
                                     <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                                         <Skull size={16} className="text-slate-400" />
                                     </div>
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                                <div className={`flex items-center justify-between text-xs font-bold truncate ${isActive ? 'text-amber-100' : 'text-slate-300'} leading-none`}>
                                    <span className="truncate font-serif tracking-wide">{token.name}</span>
                                    <div className="flex gap-1 items-center ml-1">
                                        {hasBardic && <Music size={10} className="text-pink-400" />}
                                        {hasHeroicInspiration && (
                                            <span title="Heroic Inspiration" className="cursor-help">
                                                <Star size={10} className="text-yellow-400" fill="currentColor" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* Status Effects List */}
                                <div className="flex flex-wrap gap-1">
                                    {actor.statusEffects?.slice(0, 3).map((eff, i) => (
                                        <StatusIndicator key={i} effect={eff} />
                                    ))}
                                    {(actor.statusEffects?.length || 0) > 3 && (
                                        <span className="text-[9px] text-slate-500">+{actor.statusEffects!.length - 3}</span>
                                    )}
                                </div>
                            </div>
                            
                            {isActive && <div className="absolute right-2 text-amber-500/20 animate-pulse"><Sword size={32} /></div>}
                        </div>
                    );
                })}
                
                {sortedTokens.length === 0 && (
                    <div className="p-6 text-center text-xs text-slate-600 italic">
                        The battlefield is empty.
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default InitiativeTracker;

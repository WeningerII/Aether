
import React, { useState } from 'react';
import { Swords, Flame, Droplet, Zap, EyeOff, MoveDown, Heart, Skull, Shield, Eye, Trash2, Coffee, Music, Star, AlertTriangle, Crosshair, Brain, Sparkles, Zap as ZapIcon, Wand2, Archive, Backpack, Wind, Sun, RotateCcw, HandHelping, Search, CornerUpRight, FastForward, MinusCircle, Link as LinkIcon, X, Hand, Plus, RefreshCw, Bot, BookOpen, MessageCircle, Wrench } from 'lucide-react';
import { Token, TokenLink, Actor } from '../types';
import { MANEUVERS, SRD_SPELLS, METAMAGIC_OPTIONS } from '../data/srd';
import { hasStatus, isActor } from '../utils/gameLogic';

interface ActionMenuProps {
  onAction: (action: string, subOption?: string, spellName?: string, itemSourceId?: string) => void;
  onToggleEffect: (effect: string) => void;
  onDelete: () => void;
  onToggleAI?: (id: string) => void;
  onStartLinking?: (id: string) => void;
  onRemoveLink?: (sourceId: string, targetId: string) => void;
  token: Token;
}

type Tab = 'combat' | 'magic' | 'skills' | 'items';

const ActionMenu: React.FC<ActionMenuProps> = ({ onAction, onToggleEffect, onDelete, onToggleAI, onStartLinking, onRemoveLink, token }) => {
  const [activeTab, setActiveTab] = useState<Tab>('combat');

  // Guard: Action Menu only for Actors
  if (!isActor(token)) return null;
  
  const actor = token as Actor;

  const effects = [
    { id: 'prone', icon: MoveDown, color: 'text-slate-400', label: 'Prone' },
    { id: 'invisible', icon: EyeOff, color: 'text-blue-300', label: 'Invis' },
    { id: 'concentrating', icon: Brain, color: 'text-purple-300', label: 'Conc.' },
    { id: 'blinded', icon: Eye, color: 'text-slate-500', label: 'Blind' },
    { id: 'poisoned', icon: Droplet, color: 'text-green-500', label: 'Poison' },
    { id: 'burning', icon: Flame, color: 'text-orange-500', label: 'Burn' },
    { id: 'stunned', icon: Zap, color: 'text-yellow-400', label: 'Stun' },
    { id: 'frightened', icon: AlertTriangle, color: 'text-purple-400', label: 'Fear' },
    { id: 'dodge', icon: Shield, color: 'text-indigo-400', label: 'Dodge' },
  ];

  const currentEffects = actor.statusEffects || [];
  const isDisabled = (actor.hp || 0) <= 0 || currentEffects.some(e => e.id === 'stunned');
  
  const isClass = (c: string) => actor.class === c;
  const isCaster = ['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Warlock', 'Wizard', 'Paladin', 'Ranger'].includes(actor.class || '') || (actor.class === 'Rogue' && actor.subclass === 'Arcane Trickster');
  const knownSpellsList = (actor.knownSpells || []).map(name => SRD_SPELLS.find(s => s.name === name)).filter(Boolean);
  const magicItems = actor.inventory?.filter(i => i.spells && i.spells.length > 0 && i.equipped !== false) || [];

  const renderTabButton = (id: Tab, icon: any, label: string) => (
      <button 
        onClick={() => setActiveTab(id)}
        className={`flex items-center gap-2 px-4 py-2.5 transition-all text-xs font-bold uppercase tracking-widest ${activeTab === id ? 'bg-slate-800 text-amber-400 border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}
      >
          {React.createElement(icon, { size: 14 })}
          {label}
      </button>
  );

  // Calculate resource percentage safely - check for > 0 to avoid NaN/Infinity
  const resourcePercent = actor.classResource && actor.classResource.max > 0
      ? Math.min(100, Math.max(0, (actor.classResource.current / actor.classResource.max) * 100))
      : 0;

  return (
    <div className="flex flex-col items-center gap-3">
        
        <div className="glass-panel rounded-full px-5 py-2 flex items-center gap-4 shadow-2xl">
            <div className="font-serif font-bold text-white text-sm drop-shadow-md tracking-wide">{actor.name}</div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex gap-1">
                {effects.map((eff) => {
                    const isActive = currentEffects.some(e => e.id === eff.id);
                    const Icon = eff.icon;
                    return (
                        <button
                            key={eff.id}
                            onClick={() => onToggleEffect(eff.id)}
                            className={`p-1.5 rounded-full transition-all ${isActive ? 'bg-slate-700 ring-1 ring-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'opacity-40 hover:opacity-80 hover:bg-slate-800'}`}
                            title={eff.label}
                        >
                            <Icon size={12} className={eff.color} />
                        </button>
                    )
                })}
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex gap-2 items-center">
                 {onStartLinking && (
                     <button onClick={() => onStartLinking(actor.id)} className="text-slate-500 hover:text-blue-400 transition p-1" title="Link Token">
                         <LinkIcon size={14} />
                     </button>
                 )}
                 {onToggleAI && (
                     <button 
                        onClick={() => onToggleAI(actor.id)} 
                        className={`
                            transition-all duration-300 px-2 py-1 rounded-md flex items-center gap-1.5 border text-[10px] font-bold tracking-wider uppercase
                            ${actor.autoCombat 
                                ? 'bg-emerald-900/80 text-emerald-200 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                                : 'bg-slate-800 text-slate-500 border-slate-700 hover:border-slate-500 hover:text-slate-300'}
                        `}
                        title={actor.autoCombat ? "Disable AI Control" : "Enable AI Control"}
                     >
                         <Bot size={14} className={actor.autoCombat ? "animate-pulse text-emerald-400" : ""} />
                         {actor.autoCombat ? "AI Active" : "AI Off"}
                     </button>
                 )}
                 <div className="w-px h-4 bg-slate-700 mx-1" />
                 <button onClick={() => onDelete()} className="text-slate-500 hover:text-red-400 transition p-1" title="Delete Token"><Trash2 size={14}/></button>
            </div>
        </div>

        {actor.classResource && (
            <div className="w-64 glass-panel rounded-full h-5 relative overflow-hidden shadow-lg">
                <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500" 
                    style={{ width: `${resourcePercent}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white uppercase tracking-wider drop-shadow-md z-10">
                    {actor.classResource.name}: {actor.classResource.current}/{actor.classResource.max}
                </div>
            </div>
        )}

        <div className="w-[500px] glass-panel rounded-xl overflow-hidden flex flex-col shadow-2xl ring-1 ring-white/10">
            
            <div className="flex bg-slate-950/50 backdrop-blur-md border-b border-slate-700/50">
                {renderTabButton('combat', Swords, 'Combat')}
                {isCaster && renderTabButton('magic', Sparkles, 'Magic')}
                {renderTabButton('skills', ZapIcon, 'Skills')}
                {renderTabButton('items', Backpack, 'Items')}
            </div>

            <div className="p-4 min-h-[160px] max-h-[260px] overflow-y-auto custom-scrollbar bg-slate-900/30">
                
                {activeTab === 'combat' && (
                    <div className="grid grid-cols-4 gap-3">
                        <ActionButton onClick={() => onAction('ATTACK')} label="Attack" icon={Swords} color="red" disabled={isDisabled} />
                        <ActionButton onClick={() => onAction('HEAL')} label="Potion" icon={Heart} color="green" disabled={isDisabled} subtext="Bonus Action" />
                        <ActionButton onClick={() => onAction('ROLL_HIT_DIE')} label="Hit Die" icon={Heart} color="amber" disabled={isDisabled || (actor.hitDiceUsed || 0) >= (actor.level || 1)} subtext="Recover HP" />
                        <ActionButton onClick={() => onAction('SHORT_REST')} label="Rest" icon={Coffee} color="blue" disabled={isDisabled} subtext="1 hr" />
                        
                        <div className="col-span-4 h-px bg-white/5 my-1" />
                        
                        {/* Standard Actions Row */}
                        <div className="col-span-4 grid grid-cols-6 gap-2 mb-1">
                            <ActionButton onClick={() => onToggleEffect('dash')} label="Dash" icon={FastForward} color="blue" disabled={isDisabled} active={hasStatus(actor, 'dash')} />
                            <ActionButton onClick={() => onToggleEffect('disengage')} label="Disengage" icon={CornerUpRight} color="indigo" disabled={isDisabled} active={hasStatus(actor, 'disengage')} />
                            <ActionButton onClick={() => onToggleEffect('dodge')} label="Dodge" icon={Shield} color="slate" disabled={isDisabled} active={hasStatus(actor, 'dodge')} />
                            <ActionButton onClick={() => onAction('HIDE')} label="Hide" icon={EyeOff} color="slate" disabled={isDisabled} />
                            <ActionButton onClick={() => onAction('HELP')} label="Help" icon={HandHelping} color="amber" disabled={isDisabled} />
                            <ActionButton onClick={() => onAction('SEARCH')} label="Search" icon={Search} color="slate" disabled={isDisabled} />
                        </div>

                        <div className="col-span-4 grid grid-cols-3 gap-2 mb-1">
                             <ActionButton onClick={() => onAction('STUDY')} label="Study" icon={BookOpen} color="indigo" disabled={isDisabled} subtext="Int Check" />
                             <ActionButton onClick={() => onAction('INFLUENCE')} label="Influence" icon={MessageCircle} color="pink" disabled={isDisabled} subtext="Social" />
                             <ActionButton onClick={() => onAction('UTILIZE')} label="Utilize" icon={Wrench} color="slate" disabled={isDisabled} subtext="Object" />
                        </div>

                        <div className="col-span-4 h-px bg-white/5 my-1" />

                        <ActionButton onClick={() => onAction('CUNNING_ACTION')} label="Cunning Act." icon={Wind} color="slate" disabled={isDisabled} subtext="Rogue BA" />
                        {hasStatus(actor, 'heroic_inspiration') && (
                             <ActionButton onClick={() => onToggleEffect('heroic_inspiration')} label="Use Insp." icon={Star} color="yellow" disabled={isDisabled} active />
                        )}
                        
                        {actor.subclass === 'Battle Master' && (
                            <ActionButton onClick={() => onToggleEffect('reaction_parry')} label="Auto Parry" icon={Shield} color="slate" disabled={isDisabled} active={hasStatus(actor, 'reaction_parry')} subtext="Reaction" />
                        )}
                        {isClass('Monk') && (
                            <ActionButton onClick={() => onToggleEffect('reaction_deflect')} label="Deflect" icon={Shield} color="slate" disabled={isDisabled} active={hasStatus(actor, 'reaction_deflect')} subtext="Reaction" />
                        )}
                        
                        {actor.subclass === 'Battle Master' && (
                            <div className="col-span-4 mt-2">
                                <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-widest">Maneuvers</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {MANEUVERS.map(m => (
                                        <button 
                                            key={m.name}
                                            onClick={() => onAction('MANEUVER', m.name)}
                                            disabled={isDisabled || !actor.classResource || actor.classResource.current <= 0}
                                            className="text-xs bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 rounded px-2 py-1.5 text-left truncate text-amber-100 disabled:opacity-30 transition-colors"
                                            title={m.desc}
                                        >
                                            {m.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isClass('Barbarian') && (actor.level || 0) >= 9 && (
                            <div className="col-span-4 mt-2">
                                <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-widest">Brutal Strike</div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => onAction('BRUTAL_STRIKE', 'Forceful Blow')} disabled={isDisabled || !hasStatus(actor, 'reckless')} className="text-xs bg-red-900/30 border border-red-500/30 rounded p-2 text-red-200 hover:bg-red-900/50 transition">Forceful (Push 15)</button>
                                    <button onClick={() => onAction('BRUTAL_STRIKE', 'Hamstring Blow')} disabled={isDisabled || !hasStatus(actor, 'reckless')} className="text-xs bg-red-900/30 border border-red-500/30 rounded p-2 text-red-200 hover:bg-red-900/50 transition">Hamstring (Slow)</button>
                                    {actor.level && actor.level >= 13 && (
                                        <>
                                            <button onClick={() => onAction('BRUTAL_STRIKE', 'Staggering Blow')} disabled={isDisabled || !hasStatus(actor, 'reckless')} className="text-xs bg-red-900/30 border border-red-500/30 rounded p-2 text-red-200 hover:bg-red-900/50 transition">Staggering</button>
                                            <button onClick={() => onAction('BRUTAL_STRIKE', 'Sundering Blow')} disabled={isDisabled || !hasStatus(actor, 'reckless')} className="text-xs bg-red-900/30 border border-red-500/30 rounded p-2 text-red-200 hover:bg-red-900/50 transition">Sundering</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'magic' && (
                    <div className="space-y-4">
                        {actor.spellSlots && (
                            <div className="flex flex-wrap gap-3 justify-center bg-slate-950/30 p-3 rounded-lg border border-white/5">
                                {Object.entries(actor.spellSlots).map(([lvl, slot]) => {
                                    const s = slot as { current: number, max: number };
                                    return (
                                    <div key={lvl} className="flex flex-col items-center gap-1">
                                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Lvl {lvl}</div>
                                        <div className="flex gap-1">
                                            {Array.from({length: s.max}).map((_, i) => (
                                                <div key={i} className={`w-1.5 h-3 rounded-full transition-all ${i < s.current ? 'bg-indigo-400 shadow-[0_0_6px_#818cf8]' : 'bg-slate-800 border border-slate-700'}`} />
                                            ))}
                                        </div>
                                    </div>
                                )})}
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-2">
                            {knownSpellsList.map(spell => {
                                if (!spell) return null;
                                return (
                                    <button
                                        key={spell.name}
                                        onClick={() => onAction('CAST_SPELL', undefined, spell.name)}
                                        disabled={isDisabled}
                                        className="group relative flex flex-col p-2 bg-slate-800/30 hover:bg-indigo-900/20 border border-slate-700/50 hover:border-indigo-500/50 rounded-lg transition-all text-left disabled:opacity-40"
                                    >
                                        <div className="text-xs font-bold text-indigo-100 truncate w-full group-hover:text-indigo-300">{spell.name}</div>
                                        <div className="text-[9px] text-slate-500 flex justify-between w-full mt-1">
                                            <span>{spell.level === 0 ? 'Cantrip' : `Lvl ${spell.level}`}</span>
                                            <span className="italic opacity-70">{spell.castingTime === '1 Bonus Action' ? 'BA' : 'Act'}</span>
                                        </div>
                                    </button>
                                )
                            })}
                            {knownSpellsList.length === 0 && <div className="col-span-3 text-center text-slate-500 italic text-xs py-4">No spells known.</div>}
                        </div>
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className="grid grid-cols-3 gap-3">
                        {isClass('Fighter') && (
                            <>
                                <ActionButton onClick={() => onAction('SECOND_WIND')} label="Second Wind" icon={Heart} color="green" disabled={isDisabled} />
                                <ActionButton onClick={() => onAction('ACTION_SURGE')} label="Action Surge" icon={ZapIcon} color="amber" disabled={isDisabled} />
                                {actor.level && actor.level >= 9 && (
                                    <ActionButton onClick={() => onAction('INDOMITABLE')} label="Indomitable" icon={Shield} color="slate" disabled={isDisabled} subtext="Reroll Save" />
                                )}
                            </>
                        )}
                        {isClass('Barbarian') && (
                            <>
                                <ActionButton onClick={() => onAction('RAGE')} label="Rage" icon={Skull} color="red" disabled={isDisabled} active={hasStatus(actor, 'rage')} />
                                <ActionButton onClick={() => onAction('RECKLESS_ATTACK')} label="Reckless" icon={Swords} color="orange" disabled={isDisabled} />
                            </>
                        )}
                        {isClass('Bard') && (
                            <ActionButton onClick={() => onAction('BARDIC_INSPIRATION')} label="Bardic Insp." icon={Music} color="pink" disabled={isDisabled} />
                        )}
                        {isClass('Rogue') && (
                            <>
                                <ActionButton onClick={() => onAction('UNCANNY_DODGE')} label="Uncanny Dodge" icon={Shield} color="indigo" disabled={isDisabled} active={hasStatus(actor, 'uncanny_dodge')} />
                                {actor.level && actor.level >= 5 && (
                                    <div className="col-span-3 space-y-2 mt-2">
                                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Cunning Strike</div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <button onClick={() => onAction('CUNNING_STRIKE', 'Poison')} className="text-xs bg-slate-800 p-2 rounded border border-green-900 text-green-200">Poison</button>
                                            <button onClick={() => onAction('CUNNING_STRIKE', 'Trip')} className="text-xs bg-slate-800 p-2 rounded border border-yellow-900 text-yellow-200">Trip</button>
                                            <button onClick={() => onAction('CUNNING_STRIKE', 'Withdraw')} className="text-xs bg-slate-800 p-2 rounded border border-blue-900 text-blue-200">Withdraw</button>
                                            {actor.level >= 14 && (
                                                <>
                                                    <button onClick={() => onAction('CUNNING_STRIKE', 'Daze')} className="text-xs bg-slate-800 p-2 rounded border border-purple-900 text-purple-200">Daze</button>
                                                    <button onClick={() => onAction('CUNNING_STRIKE', 'Knock Out')} className="text-xs bg-slate-800 p-2 rounded border border-red-900 text-red-200">KO</button>
                                                    <button onClick={() => onAction('CUNNING_STRIKE', 'Obscure')} className="text-xs bg-slate-800 p-2 rounded border border-slate-600 text-slate-300">Obscure</button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        {isClass('Paladin') && (
                            <>
                                <ActionButton onClick={() => onAction('SMITE_TOGGLE')} label="Divine Smite" icon={ZapIcon} color="yellow" disabled={isDisabled} active={hasStatus(actor, 'smite')} />
                                <ActionButton onClick={() => onAction('LAY_ON_HANDS')} label="Lay on Hands" icon={Heart} color="green" disabled={isDisabled} />
                                <ActionButton onClick={() => onAction('DIVINE_SENSE')} label="Divine Sense" icon={Eye} color="blue" disabled={isDisabled} />
                                {actor.subclass === 'Oath of Devotion' && (
                                    <>
                                        <ActionButton onClick={() => onAction('SACRED_WEAPON')} label="Sacred Weapon" icon={Swords} color="yellow" disabled={isDisabled} />
                                        <ActionButton onClick={() => onAction('TURN_THE_UNHOLY')} label="Turn Unholy" icon={Skull} color="yellow" disabled={isDisabled} />
                                    </>
                                )}
                                {actor.subclass === 'Oath of Vengeance' && (
                                    <>
                                        <ActionButton onClick={() => onAction('ABJURE_ENEMY')} label="Abjure Enemy" icon={Hand} color="red" disabled={isDisabled} />
                                        <ActionButton onClick={() => onAction('VOW_OF_ENMITY')} label="Vow of Enmity" icon={Swords} color="red" disabled={isDisabled} />
                                    </>
                                )}
                            </>
                        )}
                        {isClass('Cleric') && (
                            <>
                                <ActionButton onClick={() => onAction('TURN_UNDEAD')} label="Turn Undead" icon={Sun} color="yellow" disabled={isDisabled} />
                                {actor.subclass === 'Life Domain' && (
                                    <ActionButton onClick={() => onAction('PRESERVE_LIFE')} label="Preserve Life" icon={Heart} color="green" disabled={isDisabled} />
                                )}
                                {actor.subclass === 'Light Domain' && (
                                    <ActionButton onClick={() => onAction('RADIANCE_OF_THE_DAWN')} label="Radiance" icon={Sun} color="orange" disabled={isDisabled} />
                                )}
                            </>
                        )}
                        {isClass('Ranger') && (
                            <ActionButton onClick={() => onAction('PRIMEVAL_AWARENESS')} label="Primeval Aware" icon={Eye} color="green" disabled={isDisabled} />
                        )}
                        {isClass('Sorcerer') && (
                            <>
                                <ActionButton onClick={() => onAction('INNATE_SORCERY')} label="Innate Sorcery" icon={Sparkles} color="purple" disabled={isDisabled} active={hasStatus(actor, 'innate_sorcery')} />
                                <div className="col-span-3 grid grid-cols-2 gap-2">
                                    <ActionButton onClick={() => onAction('FONT_OF_MAGIC', 'CREATE_SLOT')} label="Create Slot" icon={Plus} color="purple" disabled={isDisabled} subtext="Costs 2 SP" />
                                    <ActionButton onClick={() => onAction('FONT_OF_MAGIC', 'CONVERT_SLOT')} label="Convert Slot" icon={RefreshCw} color="purple" disabled={isDisabled} subtext="Gain SP" />
                                </div>
                                <div className="col-span-3 space-y-2 mt-2">
                                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Metamagic</div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {METAMAGIC_OPTIONS.map(m => (
                                            <button key={m.name} onClick={() => onAction('METAMAGIC', m.name)} disabled={isDisabled} className="text-xs bg-slate-800/50 p-2 rounded text-purple-200 border border-purple-500/20 hover:bg-purple-900/30 hover:border-purple-500/50 transition-all">{m.name}</button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        {isClass('Warlock') && (
                            <ActionButton onClick={() => onAction('MAGICAL_CUNNING')} label="Magical Cunning" icon={RotateCcw} color="purple" disabled={isDisabled} />
                        )}
                        {isClass('Monk') && (
                            <>
                                <ActionButton onClick={() => onAction('UNCANNY_METABOLISM')} label="Uncanny Meta." icon={RotateCcw} color="amber" disabled={isDisabled} />
                                <ActionButton onClick={() => onAction('FLURRY_OF_BLOWS')} label="Flurry" icon={Swords} color="red" disabled={isDisabled} />
                                <ActionButton onClick={() => onAction('PATIENT_DEFENSE')} label="Patient Def." icon={Shield} color="slate" disabled={isDisabled} />
                                <ActionButton onClick={() => onAction('STEP_OF_THE_WIND')} label="Step of Wind" icon={Wind} color="slate" disabled={isDisabled} />
                            </>
                        )}
                    </div>
                )}

                {activeTab === 'items' && (
                    <div className="space-y-3">
                        {magicItems.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3">
                                {magicItems.map(item => (
                                    <div key={item.id} className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                                        <div className="text-xs font-bold text-amber-100 mb-2 flex justify-between items-center">
                                            {item.name}
                                            {item.charges && <span className="text-[9px] text-slate-400 font-mono bg-slate-900 px-1.5 rounded">{item.charges.current}/{item.charges.max}</span>}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {item.spells?.map(spell => (
                                                <button
                                                    key={spell.name}
                                                    onClick={() => onAction('CAST_SPELL', undefined, spell.name, item.id)}
                                                    disabled={item.charges && item.charges.current < spell.cost}
                                                    className={`text-[10px] bg-indigo-900/30 hover:bg-indigo-800/50 border border-indigo-500/30 hover:border-indigo-400 px-2 py-1 rounded text-indigo-100 transition-colors ${item.charges && item.charges.current < spell.cost ? 'opacity-50 cursor-not-allowed hover:border-indigo-500/30' : ''}`}
                                                >
                                                    Cast {spell.name} ({spell.cost})
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-slate-500 text-xs italic py-6">No active magic items equipped.</div>
                        )}
                    </div>
                )}

                {/* Linked Tokens Section */}
                {actor.linkedTokens && actor.linkedTokens.length > 0 && (
                    <div className="mt-4 pt-2 border-t border-white/10">
                        <div className="text-[10px] text-slate-500 font-bold uppercase mb-2 flex items-center gap-1">
                            <LinkIcon size={10} /> Linked Entities
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {actor.linkedTokens.map(link => (
                                <div key={link.targetId} className="flex items-center gap-2 bg-slate-800 rounded px-2 py-1 text-xs text-blue-200 border border-blue-900/50">
                                    <span className="max-w-[100px] truncate">Target ID: {link.targetId.slice(0, 6)}...</span>
                                    {onRemoveLink && (
                                        <button 
                                            onClick={() => onRemoveLink(actor.id, link.targetId)}
                                            className="hover:text-red-400"
                                            title="Remove Link"
                                        >
                                            <X size={12} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    </div>
  );
};

const ActionButton = ({ onClick, label, icon: Icon, color, disabled, active, subtext }: any) => {
    const colorMap: Record<string, string> = {
        red: 'bg-red-500/10 text-red-200 border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40',
        green: 'bg-green-500/10 text-green-200 border-green-500/20 hover:bg-green-500/20 hover:border-green-500/40',
        blue: 'bg-blue-500/10 text-blue-200 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40',
        amber: 'bg-amber-500/10 text-amber-200 border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40',
        indigo: 'bg-indigo-500/10 text-indigo-200 border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/40',
        purple: 'bg-purple-500/10 text-purple-200 border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40',
        slate: 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-700 hover:border-slate-500',
        yellow: 'bg-yellow-500/10 text-yellow-200 border-yellow-500/20 hover:bg-yellow-500/20 hover:border-yellow-500/40',
        pink: 'bg-pink-500/10 text-pink-200 border-pink-500/20 hover:bg-pink-500/20 hover:border-pink-500/40',
    };

    const baseClass = `
        flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200 relative overflow-hidden group
        ${colorMap[color] || colorMap.slate}
        ${active ? 'ring-2 ring-white shadow-[0_0_10px_rgba(255,255,255,0.3)] bg-opacity-30' : ''}
        ${disabled ? 'opacity-40 cursor-not-allowed grayscale' : 'hover:scale-105 cursor-pointer shadow-lg'}
    `;

    return (
        <button onClick={onClick} disabled={disabled} className={baseClass}>
            <Icon size={20} className={`mb-1 ${active ? 'text-white' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
            {subtext && <span className="text-[9px] opacity-60 absolute bottom-0.5">{subtext}</span>}
        </button>
    );
};

export default ActionMenu;

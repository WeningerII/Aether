
import { Token, FloatingText, AbilityScores, ActiveStatusEffect, Actor } from '../types';
import * as Rules from './gameLogic';
import { SRD_CLASSES, METAMAGIC_OPTIONS } from '../data/srd';
import { MONSTER_COMPENDIUM } from '../data/monsters';

export interface FeatureResult {
    source: Actor;
    target: Actor;
    logs: string[];
    floatingTexts: FloatingText[];
}

const getBeastSymbol = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('spider')) return '🕷️';
    if (n.includes('wolf')) return '🐺';
    if (n.includes('bear')) return '🐻';
    if (n.includes('eagle')) return '🦅';
    if (n.includes('boar')) return '🐗';
    if (n.includes('tiger') || n.includes('lion') || n.includes('cat')) return '🐯';
    if (n.includes('rat')) return '🐀';
    if (n.includes('badger')) return '🦡';
    if (n.includes('owl')) return '🦉';
    return '🐾';
};

export const resolveClassFeature = (source: Actor, target: Actor, action: string, subOption?: string): FeatureResult => {
      let updatedSource = { ...source };
      let updatedTarget = { ...target };
      const logs: string[] = [];
      const floatingTexts: FloatingText[] = [];

      const consume = (amt: number = 1) => {
          if (updatedSource.classResource) {
              updatedSource.classResource = { ...updatedSource.classResource, current: updatedSource.classResource.current - amt };
          }
      };

      const addFloat = (x: number, y: number, text: string, color: string, type: FloatingText['type'] = 'info') => {
          floatingTexts.push({ id: Math.random().toString(), x, y, text, color, type });
      };

      switch (action) {
          case 'SECOND_WIND': {
              if (source.id !== target.id) break; // Self only
              const heal = Rules.rollDie(10) + (source.level || 1);
              updatedSource.hp = Math.min(source.maxHp || 10, (source.hp || 0) + heal);
              consume(1);
              logs.push(`${source.name} uses Second Wind. Recovered ${heal} HP.`);
              addFloat(source.x, source.y, `+${heal}`, '#4ade80', 'heal');
              break;
          }
          case 'ACTION_SURGE':
              logs.push(`${source.name} uses Action Surge!`);
              addFloat(source.x, source.y, 'ACTION SURGE', '#f59e0b', 'info');
              consume(1);
              break;
          case 'INNATE_SORCERY': {
               // Sorcerer Level 1 Feature
               if (Rules.hasStatus(source, 'innate_sorcery')) {
                   logs.push("Innate Sorcery is already active.");
               } else {
                   updatedSource.statusEffects = [...(updatedSource.statusEffects || []), { id: 'innate_sorcery', duration: 10 }]; // 1 minute
                   // Note: Effect logic (Advantage + DC boost) handled in calculationUtils
                   logs.push(`${source.name} unleashes Innate Sorcery! (+1 DC, Advantage on Attacks)`);
                   addFloat(source.x, source.y, 'SURGE', '#a855f7', 'info');
               }
               break;
          }
          case 'MAGICAL_CUNNING': {
               // Warlock Level 2 Feature
               // Recover half spell slots rounded up
               if (updatedSource.spellSlots) {
                    let recovered = 0;
                    Object.keys(updatedSource.spellSlots).forEach(k => {
                         const s = updatedSource.spellSlots![k];
                         const missing = s.max - s.current;
                         if (missing > 0) {
                             const toRecover = Math.ceil(s.max / 2); 
                             // SRD says: "regain expended Pact Magic spell slots but no more than a number equal to half your maximum (round up)"
                             // Warlocks usually have 1 slot level type. 
                             const actualRecover = Math.min(missing, toRecover);
                             updatedSource.spellSlots![k].current += actualRecover;
                             recovered += actualRecover;
                         }
                    });
                    logs.push(`${source.name} uses Magical Cunning to recover ${recovered} spell slot(s).`);
                    addFloat(source.x, source.y, `+${recovered} SLOTS`, '#a855f7', 'info');
               }
               break;
          }
          case 'UNCANNY_METABOLISM': {
               // Monk Level 2 Feature
               if (updatedSource.classResource && updatedSource.classResource.name === 'Focus Points') {
                   updatedSource.classResource.current = updatedSource.classResource.max;
                   const heal = (source.level || 1) + Rules.rollDie(8); // Roll Martial Arts die (d6-d12), standardizing d8 for simplicity
                   updatedSource.hp = Math.min(source.maxHp || 10, (source.hp || 0) + heal);
                   logs.push(`${source.name} uses Uncanny Metabolism. Regained Focus & ${heal} HP.`);
                   addFloat(source.x, source.y, 'REFRESH', '#fcd34d', 'heal');
               }
               break;
          }
          case 'ROLL_HIT_DIE': {
              const cls = SRD_CLASSES.find(c => c.name === source.class);
              const hitDie = cls?.hitDie || 8;
              const conMod = Rules.getModifier(source.stats?.con || 10);
              const heal = Math.max(1, Rules.rollDie(hitDie) + conMod);
              updatedSource.hp = Math.min(source.maxHp || 10, (source.hp || 0) + heal);
              updatedSource.hitDiceUsed = (source.hitDiceUsed || 0) + 1;
              logs.push(`${source.name} spends a Hit Die (d${hitDie}). Recovered ${heal} HP.`);
              addFloat(source.x, source.y, `+${heal}`, '#4ade80', 'heal');
              break;
          }
          case 'SHORT_REST': {
              // Recover Class Resources
              if (updatedSource.classResource && updatedSource.classResource.recharge === 'short') {
                  updatedSource.classResource.current = updatedSource.classResource.max;
              }
              // Warlock Slots
              if (source.class === 'Warlock' && updatedSource.spellSlots) {
                 Object.keys(updatedSource.spellSlots).forEach(k => {
                     if (updatedSource.spellSlots && updatedSource.spellSlots[k]) {
                         updatedSource.spellSlots[k].current = updatedSource.spellSlots[k].max;
                     }
                 });
              }
              logs.push(`${source.name} takes a Short Rest.`);
              addFloat(source.x, source.y, 'RESTED', '#60a5fa', 'info');
              break;
          }
          case 'RAGE': {
              const hasHeavyArmor = source.inventory?.some(i => i.type === 'armor' && i.equipped && (i as any).armorCategory === 'Heavy');
              if (hasHeavyArmor) {
                  logs.push(`${source.name} cannot Rage while wearing Heavy Armor!`);
                  break;
              }

              if (!updatedSource.classResource || updatedSource.classResource.current <= 0) {
                  logs.push(`${source.name} has no Rages left!`);
                  break;
              }
              if (Rules.hasStatus(source, 'rage')) {
                  updatedSource.statusEffects = updatedSource.statusEffects?.filter(e => e.id !== 'rage');
                  logs.push(`${source.name} ends Rage.`);
              } else {
                  updatedSource.statusEffects = [...(updatedSource.statusEffects || []), { id: 'rage', duration: 10 }];
                  consume(1);
                  logs.push(`${source.name} enters a Rage! (Resist B/P/S, +Dmg, Adv Str)`);
                  addFloat(source.x, source.y, 'RAGE!', '#dc2626', 'info');
              }
              break;
          }
          case 'RECKLESS_ATTACK': {
               const newEffects = [...(updatedSource.statusEffects || []).filter(e => e.id !== 'reckless'), { id: 'reckless', duration: 1 }];
               updatedSource.statusEffects = newEffects;
               logs.push(`${source.name} throws caution to the wind! (Reckless)`);
               addFloat(source.x, source.y, 'RECKLESS', '#f87171', 'info');
               break;
          }
          case 'CUNNING_ACTION': {
               logs.push(`${source.name} uses Cunning Action (Dash/Disengage/Hide).`);
               addFloat(source.x, source.y, 'SPEED', '#3b82f6', 'info');
               break;
          }
          case 'UNCANNY_DODGE': {
               const hasIt = Rules.hasStatus(source, 'uncanny_dodge');
               if (hasIt) {
                   updatedSource.statusEffects = updatedSource.statusEffects?.filter(e => e.id !== 'uncanny_dodge');
                   logs.push("Uncanny Dodge deactivated.");
               } else {
                   updatedSource.statusEffects = [...(updatedSource.statusEffects || []), { id: 'uncanny_dodge', duration: 1 }];
                   logs.push("Uncanny Dodge active (Half Damage).");
               }
               break;
          }
          case 'LAY_ON_HANDS': {
              const amount = 10; // Simplified fixed amount
              if (Rules.canHeal(target)) {
                updatedTarget.hp = Math.min(target.maxHp || 10, (target.hp || 0) + amount);
                consume(amount);
                logs.push(`${source.name} heals ${target.name} for ${amount} HP using Lay on Hands.`);
                addFloat(target.x, target.y, `+${amount}`, '#4ade80', 'heal');
              } else {
                  logs.push("Target cannot be healed.");
              }
              break;
          }
          case 'BARDIC_INSPIRATION': {
              const die = source.classResource?.dieSize || 6;
              const newEffects = [...(updatedTarget.statusEffects || []), { id: 'bardic_inspiration', duration: 10, value: die }];
              updatedTarget.statusEffects = newEffects;
              consume(1);
              logs.push(`${source.name} inspires ${target.name} (d${die}).`);
              addFloat(target.x, target.y, 'INSPIRED', '#ec4899', 'info');
              break;
          }
          case 'USE_INSPIRATION': {
               if (Rules.hasStatus(source, 'heroic_inspiration')) {
                   updatedSource.statusEffects = updatedSource.statusEffects?.filter(e => e.id !== 'heroic_inspiration');
                   logs.push(`${source.name} uses Heroic Inspiration (Reroll).`);
                   addFloat(source.x, source.y, 'REROLL', '#fbbf24', 'info');
               } else {
                   logs.push(`${source.name} has no Heroic Inspiration.`);
               }
               break;
          }
          case 'WILD_SHAPE': {
              // subOption is beastId
              const beast = MONSTER_COMPENDIUM.find(m => m.id === subOption);
              if (!beast) break;
          
              // Save Original with current HP state
              updatedSource.originalForm = {
                  name: source.name,
                  stats: source.stats,
                  ac: source.ac,
                  speed: source.speed,
                  monsterData: source.monsterData,
                  hp: source.hp,
                  maxHp: source.maxHp,
                  tempHp: source.tempHp, // Preserve pre-shift temp HP
                  avatarUrl: source.avatarUrl,
                  symbol: source.symbol,
                  traits: source.traits
              };
              
              // Apply Beast Stats
              updatedSource.name = `${source.name} (${beast.name})`;
              // Physical stats replace, Mental keep
              updatedSource.stats = {
                  ...source.stats!,
                  str: beast.stats.str,
                  dex: beast.stats.dex,
                  con: beast.stats.con
              };
              updatedSource.ac = beast.ac;
              updatedSource.speed = Math.floor(beast.speed / 5);
              
              // 5.2 Wild Shape: You gain Temp HP = Druid Level. You don't assume beast HP.
              // EXCEPT if Circle of the Moon (not implemented here, sticking to standard 5.2)
              // Standard 5.2: You retain your HP. You gain Temp HP = Druid Level.
              const druidLevel = source.level || 1;
              updatedSource.tempHp = (updatedSource.tempHp || 0) + druidLevel;
              
              updatedSource.monsterData = beast; // Gives beast actions
              updatedSource.symbol = getBeastSymbol(beast.name);
              updatedSource.avatarUrl = undefined; 
              
              consume(1); // Spend resource
              logs.push(`${source.name} transforms into a ${beast.name}! (Gained ${druidLevel} THP)`);
              addFloat(source.x, source.y, `SHAPE`, '#10b981', 'info');
              break;
          }
          case 'REVERT_FORM': {
              if (source.originalForm) {
                  const orig = source.originalForm;
                  updatedSource.name = orig.name || source.name;
                  updatedSource.stats = orig.stats as AbilityScores || source.stats;
                  updatedSource.ac = orig.ac || source.ac;
                  updatedSource.speed = orig.speed || source.speed;
                  updatedSource.monsterData = orig.monsterData; 
                  updatedSource.traits = orig.traits;
                  updatedSource.symbol = orig.symbol || source.symbol;
                  updatedSource.avatarUrl = orig.avatarUrl;
                  
                  // 5.2: You keep your current HP (minus damage taken in form)
                  // Temp HP disappears if any remains
                  updatedSource.tempHp = 0; 

                  updatedSource.originalForm = undefined;
                  logs.push(`${source.name} reverts to their true form.`);
                  addFloat(source.x, source.y, `REVERT`, '#a78bfa', 'info');
              }
              break;
          }
          case 'PATIENT_DEFENSE': {
              const newEffects = [...(updatedSource.statusEffects || []), { id: 'dodge', duration: 1 }];
              updatedSource.statusEffects = newEffects;
              consume(1); // Focus
              logs.push(`${source.name} uses Patient Defense (Dodge).`);
              break;
          }
          case 'STEP_OF_THE_WIND': {
              consume(1);
              logs.push(`${source.name} uses Step of the Wind (Dash/Disengage).`);
              addFloat(source.x, source.y, 'SPEED UP', '#a78bfa', 'info');
              break;
          }
          case 'FLURRY_OF_BLOWS': {
              consume(1);
              logs.push(`${source.name} uses Flurry of Blows (2 Unarmed Strikes).`);
              addFloat(source.x, source.y, 'FLURRY', '#f59e0b', 'info');
              break;
          }
          case 'WHOLENESS_OF_BODY': {
              const heal = Rules.rollDie(source.classResource?.dieSize || 8) + Rules.getModifier(source.stats?.wis || 10);
              updatedSource.hp = Math.min(source.maxHp || 10, (source.hp || 0) + heal);
              logs.push(`${source.name} uses Wholeness of Body. Recovered ${heal} HP.`);
              addFloat(source.x, source.y, `+${heal}`, '#4ade80', 'heal');
              consume(1); // Costs Focus in 5.2? No, "As a Bonus Action... regain... uses Wisdom modifier"
              break;
          }
          case 'EMPTY_BODY': {
              const newEffects = [...(updatedSource.statusEffects || []), { id: 'invisible', duration: 10 }, { id: 'resistance_all', duration: 10 }];
              updatedSource.statusEffects = newEffects;
              consume(4);
              logs.push(`${source.name} uses Empty Body.`);
              break;
          }
          case 'DIVINE_SENSE':
              logs.push(`${source.name} uses Divine Sense.`);
              addFloat(source.x, source.y, 'SENSING...', '#fbbf24', 'info');
              break;
          case 'CLEANSING_TOUCH': {
               updatedTarget.statusEffects = []; 
               logs.push(`${source.name} cleanses ${target.name} of effects.`);
               break;
          }
          case 'SACRED_WEAPON':
              logs.push(`${source.name} imbues weapon with Sacred Energy.`);
              consume(1);
              break;
          case 'TURN_THE_UNHOLY':
              logs.push(`${source.name} Turns the Unholy! (Check saves)`);
              addFloat(source.x, source.y, 'TURN UNDEAD', '#fbbf24', 'info');
              consume(1);
              break;
          case 'TURN_UNDEAD':
              logs.push(`${source.name} presents their Holy Symbol! (Turn Undead)`);
              addFloat(source.x, source.y, 'TURN UNDEAD', '#fbbf24', 'info');
              consume(1);
              break;
          case 'RADIANCE_OF_THE_DAWN':
               logs.push(`${source.name} channels Radiance of the Dawn! (AoE Radiant)`);
               addFloat(source.x, source.y, 'RADIANCE', '#fbbf24', 'damage');
               consume(1);
               break;
          case 'PRESERVE_LIFE':
               logs.push(`${source.name} channels Preserve Life! (Heal)`);
               addFloat(source.x, source.y, 'HEAL', '#4ade80', 'heal');
               consume(1);
               break;
          case 'VOW_OF_ENMITY':
              logs.push(`${source.name} vows enmity against ${target.name}.`);
              addFloat(target.x, target.y, 'MARKED', '#ef4444', 'info');
              consume(1);
              break;
          case 'ABJURE_ENEMY':
              logs.push(`${source.name} abjures ${target.name}!`);
              consume(1);
              break;
           case 'FONT_OF_MAGIC': {
              if (subOption === 'CONVERT_SLOT') {
                  if (source.classResource) updatedSource.classResource.current = Math.min(source.classResource.max, source.classResource.current + 2);
                  logs.push("Converted slot to Sorcery Points.");
              } else if (subOption === 'CREATE_SLOT') {
                  if (source.classResource) updatedSource.classResource.current -= 2;
                  if (updatedSource.spellSlots && updatedSource.spellSlots['1']) {
                      updatedSource.spellSlots['1'].current = Math.min(updatedSource.spellSlots['1'].max, updatedSource.spellSlots['1'].current + 1);
                  }
                  logs.push("Created Level 1 Spell Slot.");
              }
              break;
           }
           case 'METAMAGIC': {
               const opt = METAMAGIC_OPTIONS.find(o => o.name === subOption);
               if (opt) {
                   const cost = typeof opt.cost === 'number' ? opt.cost : 1;
                   if ((source.classResource?.current || 0) >= cost) {
                       updatedSource.classResource = { ...source.classResource!, current: source.classResource!.current - cost };
                       const statusId = `metamagic_${subOption?.toLowerCase().replace(/ /g, '_')}`;
                       if (!Rules.hasStatus(updatedSource, statusId)) {
                           updatedSource.statusEffects = [...(updatedSource.statusEffects || []), { id: statusId, duration: 1 }];
                           logs.push(`${source.name} activates ${subOption}.`);
                           addFloat(source.x, source.y, 'METAMAGIC', '#a855f7', 'info');
                       } else {
                           logs.push(`${subOption} is already active.`);
                       }
                   } else {
                       logs.push("Not enough Sorcery Points.");
                   }
               }
               break;
           }
           case 'SMITE_TOGGLE': {
               // Toggle the 'smite' status. Slot consumption happens on hit.
               if (Rules.hasStatus(source, 'smite')) {
                   updatedSource.statusEffects = updatedSource.statusEffects?.filter(e => e.id !== 'smite');
                   logs.push(`${source.name} cancels Divine Smite.`);
               } else {
                   updatedSource.statusEffects = [...(updatedSource.statusEffects || []), { id: 'smite', duration: 1 }];
                   logs.push(`${source.name} prepares Divine Smite (Next Hit).`);
                   addFloat(source.x, source.y, 'SMITE READY', '#fbbf24', 'info');
               }
               break;
           }
           case 'PRIMEVAL_AWARENESS': {
               // Consumes a slot to sense types.
               let consumed = false;
               if (updatedSource.spellSlots) {
                   // Find any slot
                   for (let i = 1; i <= 5; i++) {
                       if (updatedSource.spellSlots[i.toString()]?.current > 0) {
                           updatedSource.spellSlots[i.toString()].current--;
                           consumed = true;
                           break;
                       }
                   }
               }
               
               if (consumed) {
                   logs.push(`${source.name} focuses their Primeval Awareness...`);
                   logs.push(`(System) You sense aberrations, celestials, dragons, elementals, fey, fiends, and undead within 1 mile.`);
                   addFloat(source.x, source.y, 'AWARENESS', '#10b981', 'info');
               } else {
                   logs.push(`${source.name} has no slots for Primeval Awareness.`);
               }
               break;
           }
      }
      
      return { source: updatedSource, target: updatedTarget, logs, floatingTexts };
};

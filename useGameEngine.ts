
import { useReducer, useEffect, useRef, useCallback, useState } from 'react';
import { gameReducer } from './gameReducer';
import { GameState, Token, GridSize, LogEntry, FloatingText, MonsterData, ActiveStatusEffect, Item, DrawingData, CombatModeState, ArmorItem, Actor, Prop, TokenType } from '../types';
import * as Storage from '../services/storage';
import { generateDMNarration, generateCombatStrategy, CombatStrategy } from '../services/gemini';
import { rollDie, processTurnStart, calculateTokenStats, getDistance, hasStatus, canHeal, getAoECells, parseDiceString, getModifier, getProficiencyBonus, getSpellSlots, resolveTerrainHazard, applyDamageToToken, isActor } from '../utils/gameLogic';
import { resolveCombatAction } from '../utils/combatEngine';
import { resolveSpell } from '../utils/spellEngine';
import { resolveClassFeature } from '../utils/featureEngine';
import { resolveItemUse } from '../utils/itemEngine';
import { calculateAITurn, AIAction, generatePlanForAction, parseRange } from '../utils/aiLogic';
import { generateEncounter, EncounterTheme, EncounterMode, EncounterDifficulty } from '../utils/encounterGenerator';
import { DEFAULT_GRID_SIZE } from '../constants';
import { SRD_SPELLS } from '../data/srd';

export const useGameEngine = () => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    tokens: [],
    selectedTokenId: null,
    activeTurnId: null,
    round: 1,
    logs: [],
    mapBackgroundImage: null,
    floatingTexts: [],
    combatMode: { active: false, sourceId: null, action: null },
    linkingMode: { active: false, sourceId: null }
  });

  const [isAILoading, setIsAILoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [isStorageLoading, setIsStorageLoading] = useState(true);
  const stateRef = useRef(gameState);
  const gridSize = DEFAULT_GRID_SIZE;

  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const init = async () => {
      try {
        const loaded = await Storage.loadGameState();
        dispatch({ type: 'LOAD_STATE', payload: loaded });
      } catch (e) {
        console.error("Failed to load state", e);
      } finally {
        setIsStorageLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!isStorageLoading) {
      const timeout = setTimeout(() => {
        const { floatingTexts, ...stateToSave } = gameState;
        Storage.saveGameState(stateToSave as GameState);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [gameState, isStorageLoading]);

  const addLog = useCallback((sender: 'System' | 'DM' | 'Player', content: string, type: 'normal' | 'roll' | 'error' | 'narrative' | 'combat' = 'normal', rollValue?: number, isCrit?: boolean) => {
    const log: LogEntry = {
      id: Date.now().toString() + Math.random(),
      timestamp: Date.now(),
      sender,
      content,
      type,
      rollValue,
      isCrit
    };
    dispatch({ type: 'ADD_LOG', payload: log });
  }, []);

  const addFloatingText = useCallback((x: number, y: number, text: string, color: string, type: FloatingText['type'] = 'info') => {
    const ft: FloatingText = { id: Math.random().toString(), x, y, text, color, type };
    dispatch({ type: 'ADD_FLOATING_TEXT', payload: ft });
    setTimeout(() => dispatch({ type: 'REMOVE_FLOATING_TEXT', payload: ft.id }), 2000);
  }, []);

  const executeCombatAction = (source: Token, target: Token | null, point?: {x: number, y: number}) => {
      const cur = stateRef.current;
      
      if (!isActor(source)) return; // Props can't act
      const actorSource = source as Actor;

      const { action, spellName, maneuverType, itemSourceId } = cur.combatMode;
      
      if (point && action === 'CAST_SPELL' && spellName) {
          const spell = SRD_SPELLS.find(s => s.name === spellName);
          if (spell) {
              addLog('System', `${source.name} casts ${spellName} at (${point.x}, ${point.y}).`, 'combat');
              
              let areaCells: {x: number, y: number}[] = [];
              if (spell.areaShape) {
                  const shape = spell.areaShape;
                  const size = spell.areaSize || 15;
                  const origin = (shape === 'cone' || shape === 'line') 
                      ? { x: source.x, y: source.y } 
                      : point;
                  
                  areaCells = getAoECells(origin, point, shape, size, gridSize);
              } else {
                  areaCells = [point];
              }

              // Only target actors with spells generally, unless object interaction needed (omitted for simplicity)
              const targets = cur.tokens.filter(isActor).filter(t => areaCells.some(c => c.x === t.x && c.y === t.y)) as Actor[];
              
              if (spell.name === 'Sleep') {
                  let pool = parseDiceString(spell.description.match(/(\d+d\d+)/)?.[1] || "5d8");
                  addLog('System', `Sleep Pool Rolled: ${pool} HP`, 'combat');
                  
                  const sortedTargets = targets
                      .filter(t => (t.hp || 0) > 0 && !hasStatus(t, 'unconscious') && !t.damageImmunities?.includes('charmed') && !t.conditionImmunities?.includes('unconscious') && !t.heritage?.includes('Elf') && !t.traits?.some(tr => tr.includes('Fey Ancestry')))
                      .sort((a, b) => (a.hp || 0) - (b.hp || 0));
                  
                  const updatedTokens: Token[] = [];
                  for (const t of sortedTargets) {
                      if ((t.hp || 0) <= pool) {
                          pool -= (t.hp || 0);
                          const effects = [...(t.statusEffects || []), { id: 'unconscious', duration: 10 }];
                          updatedTokens.push({ ...t, statusEffects: effects });
                          addLog('System', `${t.name} falls asleep.`, 'combat');
                          addFloatingText(t.x, t.y, 'ZZZ', '#a855f7', 'info');
                      } else {
                          addLog('System', `${t.name} resists (Pool empty).`, 'combat');
                      }
                  }
                  dispatch({ type: 'BATCH_UPDATE_TOKENS', payload: updatedTokens });
              } 
              else if (targets.length > 0) {
                  let currentSource = { ...actorSource };
                  const updatedTokens: Token[] = [];
                  
                  targets.forEach((t, index) => {
                      const consume = index === 0; 
                      const result = resolveSpell(spell, currentSource, t, spell.level, itemSourceId, !consume);
                      
                      if (consume) {
                          currentSource = result.caster; 
                          result.logs.forEach(l => addLog('System', l, 'combat')); 
                      }
                      
                      result.floatingTexts.forEach(ft => addFloatingText(ft.x, ft.y, ft.text, ft.color, ft.type));
                      if (index > 0) { 
                          const combatLogs = result.logs.filter(l => !l.includes('casts'));
                          combatLogs.forEach(l => addLog('System', l, 'combat'));
                      }
                      
                      const updatedT = result.targets.find(ut => ut.id === t.id);
                      if (updatedT) updatedTokens.push(updatedT);
                  });
                  
                  updatedTokens.push(currentSource);
                  dispatch({ type: 'BATCH_UPDATE_TOKENS', payload: updatedTokens });
                  
              } else {
                  addLog('System', 'No targets in area.', 'combat');
                  const result = resolveSpell(spell, actorSource, actorSource, spell.level, itemSourceId, false);
                  dispatch({ type: 'UPDATE_TOKEN', payload: result.caster });
              }
          }
          
          dispatch({ type: 'SET_COMBAT_MODE', payload: { active: false, sourceId: null, action: null } });
          return;
      }

      if (!target || !isActor(target)) return;
      const actorTarget = target as Actor;

      if (['ATTACK', 'MANEUVER', 'CAST_SPELL', 'HELP', 'INFLUENCE'].includes(action || '')) {
          if (action === 'INFLUENCE') {
               const cha = actorSource.stats?.cha || 10;
               const mod = getModifier(cha);
               const roll = rollDie(20);
               const total = roll + mod + (actorSource.skillProficiencies?.includes('Persuasion') ? getProficiencyBonus(actorSource.level) : 0);
               addLog('Player', `${actorSource.name} attempts to Influence ${actorTarget.name}. Persuasion Check: ${roll} + ${mod} = ${total}`, 'roll', total);
               addFloatingText(actorSource.x, actorSource.y, 'INFLUENCE', '#ec4899', 'info');
          } 
          else {
               const result = resolveCombatAction(actorSource, actorTarget, action as any, {
                   spellName: spellName || undefined,
                   maneuverType: maneuverType || undefined,
                   itemSourceId: itemSourceId || undefined,
                   round: cur.round
               }, cur.tokens);
               
               result.logs.forEach(l => addLog('System', l, 'combat'));
               result.floatingTexts.forEach(ft => addFloatingText(ft.x, ft.y, ft.text, ft.color, ft.type));
               
               const updates = [result.attacker, result.target];
               if (result.secondaryTarget) updates.push(result.secondaryTarget);
               dispatch({ type: 'BATCH_UPDATE_TOKENS', payload: updates });
          }
      } else {
          // Features that require targeting (Lay on Hands, Bardic Inspiration, etc.)
          const result = resolveClassFeature(actorSource, actorTarget, action as string, cur.combatMode.maneuverType || undefined); 
          if (result.logs.length > 0) {
               result.logs.forEach(l => addLog('System', l, 'combat'));
               result.floatingTexts.forEach(ft => addFloatingText(ft.x, ft.y, ft.text, ft.color, ft.type));
               const updates = [result.source];
               if (result.target.id !== result.source.id) updates.push(result.target);
               dispatch({ type: 'BATCH_UPDATE_TOKENS', payload: updates }); 
          }
      }
      
      dispatch({ type: 'SET_COMBAT_MODE', payload: { active: false, sourceId: null, action: null } });
  };

  const runAITurn = async (tokenId: string) => {
      const cur = stateRef.current;
      const token = cur.tokens.find(t => t.id === tokenId);
      if (!token || !isActor(token)) return;
      const actor = token as Actor;

      let strategy: CombatStrategy | null = null;
      
      if (actor.monsterData && actor.monsterData.cr >= 2) {
          try {
              strategy = await generateCombatStrategy(actor, cur);
          } catch (e) { console.warn("AI Gen failed", e); }
      }

      let plan: AIAction[] = [];

      if (strategy) {
          const target = cur.tokens.find(t => t.name === strategy?.targetName);
          if (target) {
              const isSpell = SRD_SPELLS.some(s => s.name === strategy?.actionName);
              const actionDef = actor.monsterData?.actions.find(a => a.name === strategy?.actionName);
              const range = parseRange(isSpell ? SRD_SPELLS.find(s => s.name === strategy?.actionName)?.range : (actionDef?.range || actionDef?.reach));
              
              plan = generatePlanForAction(actor, target.id, strategy!.actionName, range, isSpell, cur, gridSize);
              addLog('DM', `AI Strategy: ${strategy.reasoning}`, 'combat');
          }
      }

      if (plan.length === 0) {
          plan = calculateAITurn(actor, cur, gridSize);
      }
      
      for (const step of plan) {
          // Interruption Check: Stop if user disabled AI during turn
          const freshCheck = stateRef.current.tokens.find(t => t.id === tokenId);
          if (!freshCheck || !isActor(freshCheck) || !freshCheck.autoCombat) {
              addLog('System', 'AI control interrupted.', 'combat');
              break;
          }
          const freshActor = freshCheck as Actor;

          if (step.type === 'WAIT') {
              addLog('System', `${actor.name} waits.`, 'combat');
              break;
          }
          
          if (step.type === 'MOVE' && step.x !== undefined && step.y !== undefined) {
              dispatch({ type: 'MOVE_TOKEN', payload: { id: actor.id, x: step.x, y: step.y } });
              await new Promise(r => setTimeout(r, 500));
          }
          
          if (step.type === 'ATTACK' || step.type === 'HEAL') {
              const target = stateRef.current.tokens.find(t => t.id === step.targetId);
              
              if (target && isActor(target)) { // target can be actor or prop theoretically, but usually actor
                  const actorTarget = target as Actor;
                  const result = resolveCombatAction(freshActor, actorTarget, step.actionName ? 'CAST_SPELL' : 'ATTACK', {
                      spellName: step.actionName,
                      round: cur.round
                  }, cur.tokens);
                  
                  result.logs.forEach(l => addLog('System', l, 'combat'));
                  result.floatingTexts.forEach(ft => addFloatingText(ft.x, ft.y, ft.text, ft.color, ft.type));
                  const updates = [result.attacker, result.target];
                  if (result.secondaryTarget) updates.push(result.secondaryTarget);
                  dispatch({ type: 'BATCH_UPDATE_TOKENS', payload: updates });
                  await new Promise(r => setTimeout(r, 800));
              }
          }
      }
  };

  const actions = {
      handleSetMapBackground: (url: string) => dispatch({ type: 'SET_MAP', payload: url }),
      
      handleRemoveToken: (id: string) => {
          dispatch({ type: 'REMOVE_TOKEN', payload: id });
          addLog('System', 'Token removed.');
      },

      handleAddToken: (token: Token) => {
          const calculated = calculateTokenStats(token);
          dispatch({ type: 'ADD_TOKEN', payload: calculated });
          addLog('System', `${token.name} added to the board.`);
      },

      handleTokenClick: (id: string) => {
          const cur = stateRef.current;
          
          // Linking Mode Logic
          if (cur.linkingMode.active && cur.linkingMode.sourceId) {
              if (cur.linkingMode.sourceId !== id) {
                  const target = cur.tokens.find(t => t.id === id);
                  const source = cur.tokens.find(t => t.id === cur.linkingMode.sourceId);
                  
                  if (source && target) {
                      dispatch({ type: 'ADD_LINK', payload: { sourceId: cur.linkingMode.sourceId, targetId: id } });
                      addLog('System', `Link established between ${source.name} and ${target.name}.`);
                  }
              }
              dispatch({ type: 'SET_LINKING_MODE', payload: { active: false, sourceId: null } });
              return;
          }

          if (cur.combatMode.active && cur.selectedTokenId) {
              const source = cur.tokens.find(t => t.id === cur.selectedTokenId);
              const target = cur.tokens.find(t => t.id === id);
              
              if (source && target && source.id !== target.id) {
                  executeCombatAction(source, target);
                  return;
              }
          }
          dispatch({ type: 'SELECT_TOKEN', payload: cur.selectedTokenId === id ? null : id });
      },

      handleStartLinking: (sourceId: string) => {
          dispatch({ type: 'SET_LINKING_MODE', payload: { active: true, sourceId } });
          addLog('System', 'Select a target token to link.');
      },

      handleRemoveLink: (sourceId: string, targetId: string) => {
          dispatch({ type: 'REMOVE_LINK', payload: { sourceId, targetId } });
          addLog('System', 'Link removed.');
      },

      moveToken: (id: string, x: number, y: number) => {
          dispatch({ type: 'MOVE_TOKEN', payload: { id, x, y } });
          
          // Trigger Hazard Check on Move
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === id);
          if (token && isActor(token)) {
              const movedToken = { ...token, x, y } as Actor;
              const { token: afterHazard, logs, damageTaken } = resolveTerrainHazard(movedToken, cur.tokens);
              
              if (damageTaken > 0 || logs.length > 0) {
                  dispatch({ type: 'UPDATE_TOKEN', payload: afterHazard });
                  logs.forEach(l => addLog('System', l, 'combat'));
                  if (damageTaken > 0) addFloatingText(x, y, `-${damageTaken}`, '#ef4444', 'damage');
              }
          }
      },

      handleCellClick: (x: number, y: number) => {
          const cur = stateRef.current;
          if (cur.linkingMode.active) {
              dispatch({ type: 'SET_LINKING_MODE', payload: { active: false, sourceId: null } });
              addLog('System', 'Linking cancelled.');
              return;
          }

          if (cur.combatMode.active && cur.combatMode.action === 'CAST_SPELL' && cur.selectedTokenId) {
               dispatch({ type: 'SET_COMBAT_MODE', payload: { ...cur.combatMode, pendingTarget: { x, y } } });
               if (cur.combatMode.pendingTarget && cur.combatMode.pendingTarget.x === x && cur.combatMode.pendingTarget.y === y) {
                   const source = cur.tokens.find(t => t.id === cur.selectedTokenId);
                   if (source) executeCombatAction(source, null, { x, y });
               }
          }
          else if (!cur.combatMode.active) {
              dispatch({ type: 'SELECT_TOKEN', payload: null });
          }
      },

      handleRoll: (val: number, type: string | number) => {
          const label = typeof type === 'number' ? `d${type}` : type;
          const isCrit = typeof type === 'number' ? val === type : false;
          addLog('Player', `rolled ${label}.`, 'roll', val, isCrit);
      },

      handleSendMessage: async (msg: string) => {
          addLog('Player', msg);
          if (msg.toLowerCase().startsWith('/roll')) return;
          
          setIsAILoading(true);
          try {
              const terrainInfo = stateRef.current.tokens
                  .filter(t => !isActor(t) && t.drawingData.type === 'terrain')
                  .map((t: Prop) => {
                      const dd = t.drawingData;
                      if (!dd) return '';
                      let desc = `${dd.text || 'Terrain'} at (${t.x},${t.y})`;
                      
                      if (dd.mechanics) {
                          const parts = [];
                          if (dd.mechanics.damageDice) parts.push(`Deals ${dd.mechanics.damageDice} ${dd.mechanics.damageType || 'damage'}`);
                          if (dd.mechanics.moveCost && dd.mechanics.moveCost > 1) parts.push('Difficult Terrain');
                          if (dd.mechanics.applyStatusId) parts.push(`Applies ${dd.mechanics.applyStatusId}`);
                          if (parts.length > 0) desc += ` [${parts.join(', ')}]`;
                      }
                      
                      if (dd.terrainType === 'hazard') return `(Hazard) ${desc}`;
                      return desc;
                  })
                  .join('; ');
                  
              const context = `Current Round: ${stateRef.current.round}. Terrain Features: ${terrainInfo || 'None'}.`;
              const response = await generateDMNarration(stateRef.current.logs, msg, context, stateRef.current.tokens);
              addLog('DM', response.text, 'narrative');
              
              if (response.toolCalls) {
                  const updates = new Map<string, Token>();
                  const getToken = (id: string) => updates.get(id) || stateRef.current.tokens.find(t => t.id === id);

                  for (const tool of response.toolCalls) {
                      if (tool.name === 'rollDice') {
                          const args = tool.args as any;
                          const result = parseDiceString(args.expression);
                          addLog('System', `DM Rolls ${args.expression}: ${result} (${args.reason || 'check'}).`, 'roll', result);
                      }
                      if (tool.name === 'modifyTokenHealth') {
                          const args = tool.args as any;
                          const target = stateRef.current.tokens.find(t => t.name.toLowerCase() === args.targetName?.toLowerCase());
                          if (target && isActor(target)) {
                              let t = getToken(target.id) as Actor;
                              if (t) {
                                  const amount = args.amount || 0;
                                  if (args.isDamage) {
                                      t = applyDamageToToken(t, amount, 'force', false) as Actor;
                                      addLog('System', `${target.name} takes ${amount} damage.`, 'combat');
                                      addFloatingText(t.x, t.y, `-${amount}`, '#ef4444', 'damage');
                                  } else {
                                      t.hp = Math.min(t.maxHp || 10, (t.hp || 0) + amount);
                                      addLog('System', `${target.name} heals ${amount} HP.`, 'combat');
                                      addFloatingText(t.x, t.y, `+${amount}`, '#4ade80', 'heal');
                                  }
                                  updates.set(t.id, t);
                              }
                          }
                      }
                      if (tool.name === 'applyCondition') {
                          const args = tool.args as any;
                          const target = stateRef.current.tokens.find(t => t.name.toLowerCase() === args.targetName?.toLowerCase());
                          if (target && isActor(target)) {
                              let t = getToken(target.id) as Actor;
                              if (t) {
                                  const condition = args.condition?.toLowerCase();
                                  const duration = args.duration || 3;
                                  if (!hasStatus(t, condition)) {
                                      const newEffects = [...(t.statusEffects || []), { id: condition, duration }];
                                      t = calculateTokenStats({ ...t, statusEffects: newEffects }) as Actor;
                                      addLog('System', `${target.name} is now ${condition}.`, 'combat');
                                      addFloatingText(t.x, t.y, condition.toUpperCase(), '#a855f7', 'info');
                                      updates.set(t.id, t);
                                  }
                              }
                          }
                      }
                  }
                  
                  if (updates.size > 0) {
                      dispatch({ type: 'BATCH_UPDATE_TOKENS', payload: Array.from(updates.values()) });
                  }
              }
          } catch (e) {
              console.error(e);
          } finally {
              setIsAILoading(false);
          }
      },

      handleAction: (action: CombatModeState['action'] | 'HIDE' | 'SEARCH' | 'STUDY' | 'INFLUENCE' | 'UTILIZE', subOption?: string, spellName?: string, itemSourceId?: string) => {
          const cur = stateRef.current;
          if (!cur.selectedTokenId) return;
          
          const source = cur.tokens.find(t => t.id === cur.selectedTokenId);
          if (!source || !isActor(source)) return;
          const actorSource = source as Actor;

          if (['ATTACK', 'CAST_SPELL', 'MANEUVER', 'HELP', 'LAY_ON_HANDS', 'BARDIC_INSPIRATION', 'VOW_OF_ENMITY', 'ABJURE_ENEMY'].includes(action || '')) {
               dispatch({ 
                   type: 'SET_COMBAT_MODE', 
                   payload: { 
                       active: true, 
                       sourceId: actorSource.id, 
                       action: action as CombatModeState['action'], 
                       maneuverType: subOption, 
                       spellName,
                       itemSourceId
                   } 
               });
               addLog('System', `Select target for ${spellName || subOption || action?.toLowerCase().replace(/_/g, ' ')}.`);
          } 
          else if (action === 'INFLUENCE') {
               dispatch({ 
                   type: 'SET_COMBAT_MODE', 
                   payload: { 
                       active: true, 
                       sourceId: actorSource.id, 
                       action: 'INFLUENCE', 
                   } 
               });
               addLog('System', 'Select target to influence.');
          }
          else if (action === 'HIDE') {
              const dex = actorSource.stats?.dex || 10;
              const prof = actorSource.skillProficiencies?.includes('Stealth') ? getProficiencyBonus(actorSource.level) : 0;
              const mod = getModifier(dex);
              const roll = rollDie(20);
              const total = roll + mod + prof;
              addLog('Player', `${actorSource.name} attempts to Hide. Stealth Check: ${roll} + ${mod + prof} = ${total}`, 'roll', total);
              addFloatingText(actorSource.x, actorSource.y, 'HIDING?', '#94a3b8', 'info');
          }
          else if (action === 'SEARCH') {
              const wis = actorSource.stats?.wis || 10;
              const prof = actorSource.skillProficiencies?.includes('Perception') ? getProficiencyBonus(actorSource.level) : 0;
              const mod = getModifier(wis);
              const roll = rollDie(20);
              const total = roll + mod + prof;
              addLog('Player', `${actorSource.name} searches the area. Perception Check: ${roll} + ${mod + prof} = ${total}`, 'roll', total);
              addFloatingText(actorSource.x, actorSource.y, 'SEARCHING', '#fbbf24', 'info');
          }
          else if (action === 'STUDY') {
              const int = actorSource.stats?.int || 10;
              const prof = actorSource.skillProficiencies?.includes('Investigation') ? getProficiencyBonus(actorSource.level) : 0;
              const mod = getModifier(int);
              const roll = rollDie(20);
              const total = roll + mod + prof;
              addLog('Player', `${actorSource.name} studies the situation. Investigation Check: ${roll} + ${mod + prof} = ${total}`, 'roll', total);
              addFloatingText(actorSource.x, actorSource.y, 'STUDYING', '#60a5fa', 'info');
          }
          else if (action === 'UTILIZE') {
               addLog('System', `${actorSource.name} utilizes an object.`, 'normal');
               addFloatingText(actorSource.x, actorSource.y, 'UTILIZE', '#a3a3a3', 'info');
          }
          else {
               const result = resolveClassFeature(actorSource, actorSource, action as string, subOption);
               if (result.logs.length > 0) {
                   result.logs.forEach(l => addLog('System', l, 'combat'));
                   result.floatingTexts.forEach(ft => addFloatingText(ft.x, ft.y, ft.text, ft.color, ft.type));
                   dispatch({ type: 'UPDATE_TOKEN', payload: result.source }); 
               }
          }
      },

      handleUseItem: (tokenId: string, item: Item) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === tokenId);
          if (!token || !isActor(token)) return;
          const actor = token as Actor;

          const result = resolveItemUse(actor, item);
          result.logs.forEach(l => addLog('System', l, 'normal'));
          result.floatingTexts.forEach(ft => addFloatingText(ft.x, ft.y, ft.text, ft.color, ft.type));
          
          dispatch({ type: 'UPDATE_TOKEN', payload: result.token });
      },

      handleEquipItem: (tokenId: string, item: Item) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === tokenId);
          if (!token || !isActor(token) || !token.inventory) return;
          const actor = token as Actor;

          const newInv = actor.inventory.map(i => {
              if (i.id === item.id) return { ...i, equipped: !i.equipped };
              if (item.type === 'armor' && i.type === 'armor' && i.id !== item.id) {
                  const armorItem = item as ArmorItem;
                  const invArmor = i as ArmorItem;
                  if (invArmor.armorCategory !== 'Shield' && armorItem.armorCategory !== 'Shield') {
                      return { ...i, equipped: false }; 
                  }
              }
              return i;
          });
          
          let updated: Token = { ...actor, inventory: newInv };
          updated = calculateTokenStats(updated);
          dispatch({ type: 'UPDATE_TOKEN', payload: updated });
      },

      handleAddItem: (tokenId: string, item: Item) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === tokenId);
          if (!token || !isActor(token)) return;
          const actor = token as Actor;
          
          const newItem = { ...item, id: Date.now().toString() };
          const newInv = [...(actor.inventory || []), newItem];
          
          let updated: Token = { ...actor, inventory: newInv };
          updated = calculateTokenStats(updated);
          
          dispatch({ type: 'UPDATE_TOKEN', payload: updated });
          addLog('System', `${token.name} gained ${item.name}.`);
      },

      handleRemoveItem: (tokenId: string, itemId: string) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === tokenId);
          if (!token || !isActor(token) || !token.inventory) return;
          const actor = token as Actor;
          
          const newInv = actor.inventory.filter(i => i.id !== itemId);
          let updated: Token = { ...actor, inventory: newInv };
          updated = calculateTokenStats(updated); 
          dispatch({ type: 'UPDATE_TOKEN', payload: updated });
      },

      handleSpellManagement: (tokenId: string, action: 'LEARN' | 'FORGET', spellName: string) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === tokenId);
          if (!token || !isActor(token)) return;
          const actor = token as Actor;
          
          let known = actor.knownSpells || [];
          if (action === 'LEARN' && !known.includes(spellName)) known = [...known, spellName];
          if (action === 'FORGET') known = known.filter(s => s !== spellName);
          
          dispatch({ type: 'UPDATE_TOKEN', payload: { ...actor, knownSpells: known } });
      },

      handleAdjustQuantity: (tokenId: string, itemId: string, delta: number) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === tokenId);
          if (!token || !isActor(token) || !token.inventory) return;
          const actor = token as Actor;
          
          const newInv = actor.inventory.map(i => {
              if (i.id === itemId) return { ...i, quantity: Math.max(0, i.quantity + delta) };
              return i;
          }).filter(i => i.quantity > 0);
          
          dispatch({ type: 'UPDATE_TOKEN', payload: { ...actor, inventory: newInv } });
      },

      handleAddStatusEffect: (tokenId: string, effect: ActiveStatusEffect) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === tokenId);
          if (!token || !isActor(token)) return;
          const actor = token as Actor;
          
          const effects = [...(actor.statusEffects || []), effect];
          let updated: Token = { ...actor, statusEffects: effects };
          updated = calculateTokenStats(updated);
          dispatch({ type: 'UPDATE_TOKEN', payload: updated });
      },

      handleRemoveStatusEffect: (tokenId: string, effectId: string) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === tokenId);
          if (!token || !isActor(token)) return;
          const actor = token as Actor;
          
          const effects = (actor.statusEffects || []).filter(e => e.id !== effectId);
          let updated: Token = { ...actor, statusEffects: effects };
          updated = calculateTokenStats(updated);
          dispatch({ type: 'UPDATE_TOKEN', payload: updated });
      },

      handleToggleStatus: (effectId: string) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === cur.selectedTokenId);
          if (!token || !isActor(token)) return;
          const actor = token as Actor;
          
          const hasIt = hasStatus(actor, effectId);
          let updated: Token;
          if (hasIt) {
              updated = { ...actor, statusEffects: actor.statusEffects?.filter(e => e.id !== effectId) };
          } else {
              updated = { ...actor, statusEffects: [...(actor.statusEffects || []), { id: effectId, duration: 10 }] };
          }
          updated = calculateTokenStats(updated);
          dispatch({ type: 'UPDATE_TOKEN', payload: updated });
      },

      handleRollInitiative: () => {
          const cur = stateRef.current;
          const rolledTokens = cur.tokens.map(t => {
              if (isActor(t)) {
                  const dexMod = Math.floor(((t.stats?.dex || 10) - 10) / 2);
                  const initBonus = t.initiative || dexMod;
                  const roll = rollDie(20);
                  return { ...t, initiative: roll + initBonus };
              }
              return t; // Props remain unchanged
          });
          
          // Only sort actors for turn order display, but we keep the full list in state
          // Note: InitiativeTracker does the sorting display
          
          dispatch({ type: 'ROLL_INITIATIVE', payload: rolledTokens });
          addLog('System', 'Initiative Rolled!', 'combat');
          
          const firstActor = rolledTokens.filter(isActor).sort((a, b) => (b.initiative || 0) - (a.initiative || 0))[0];
          if (firstActor) {
              addLog('System', `Round 1. ${firstActor.name}'s turn.`, 'combat');
          }
      },

      handleNextTurn: async () => {
          const cur = stateRef.current;
          const actors = cur.tokens.filter(isActor).sort((a, b) => (b.initiative || 0) - (a.initiative || 0));
          if (actors.length === 0) return;

          const idx = actors.findIndex(t => t.id === cur.activeTurnId);
          let nextIdx = idx + 1;
          let nextRound = cur.round;
          
          if (nextIdx >= actors.length) {
              nextIdx = 0;
              nextRound++;
              addLog('System', `Round ${nextRound} begins.`, 'combat');
          }
          
          const nextToken = actors[nextIdx];
          
          if (nextToken) {
              const { updatedToken, logs } = processTurnStart(nextToken, cur.tokens);
              
              dispatch({ type: 'UPDATE_TOKEN', payload: updatedToken });
              logs.forEach(l => addLog('System', l, 'combat'));
              
              addLog('System', `It is now ${updatedToken.name}'s turn.`, 'combat');
              
              dispatch({ 
                  type: 'NEXT_TURN', 
                  payload: { activeTurnId: nextToken.id, round: nextRound, tokens: cur.tokens.map(t => t.id === nextToken.id ? updatedToken : t) } 
              });
              
              // Need to cast again because processTurnStart returns generic Token
              const updatedActor = updatedToken as Actor;

              if (updatedActor.autoCombat && (updatedActor.hp || 0) > 0 && !hasStatus(updatedActor, 'stunned') && !hasStatus(updatedActor, 'paralyzed') && !hasStatus(updatedActor, 'unconscious')) {
                  setTimeout(() => runAITurn(updatedActor.id), 500);
              }
          }
      },

      setSelection: (id: string | null) => dispatch({ type: 'SELECT_TOKEN', payload: id }),

      handleUseInspiration: (id: string) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === id);
          if (token && isActor(token)) {
              const actor = token as Actor;
              const effect = actor.statusEffects?.find(e => e.id === 'bardic_inspiration');
              if (effect) {
                  const roll = rollDie(effect.value || 6);
                  addLog('Player', `${token.name} uses Bardic Inspiration. Rolled: ${roll}.`, 'roll', roll);
                  addFloatingText(token.x, token.y, `+${roll}`, '#ec4899', 'info');
                  const newEffects = actor.statusEffects?.filter(e => e.id !== 'bardic_inspiration');
                  dispatch({ type: 'UPDATE_TOKEN', payload: { ...actor, statusEffects: newEffects } });
              }
          }
      },

      handleAddDrawing: (x: number, y: number, data: DrawingData) => {
          const drawingToken: Prop = {
              id: `drawing-${Date.now()}`,
              name: data.type === 'zone' ? 'Zone' : data.text || 'Marker',
              type: TokenType.OBJECT,
              x, y,
              color: data.color || '#ffffff',
              symbol: data.type === 'marker' ? '📍' : ' ',
              drawingData: data
          };
          dispatch({ type: 'ADD_TOKEN', payload: drawingToken });
      },

      handleGenerateEncounter: async (theme: EncounterTheme, mode: EncounterMode, difficulty: EncounterDifficulty, partyLevel: number, prompt: string) => {
          setIsAILoading(true);
          setLoadingStatus("Initializing...");
          try {
              dispatch({ type: 'RESET_GAME', payload: { ...stateRef.current, tokens: [], logs: [], floatingTexts: [] } });

              const data = await generateEncounter(
                  theme, 
                  mode, 
                  difficulty, 
                  partyLevel, 
                  4, 
                  prompt, 
                  gridSize, 
                  (status) => setLoadingStatus(status)
              );
              
              dispatch({ type: 'SET_MAP', payload: data.mapBase64 });
              
              const batch = data.tokens.map(t => calculateTokenStats(t));
              batch.forEach(t => dispatch({ type: 'ADD_TOKEN', payload: t }));
              
              if (data.drawings) {
                  data.drawings.forEach(d => {
                      dispatch({ type: 'ADD_TOKEN', payload: {
                          id: `feat-${Date.now()}-${Math.random()}`,
                          name: d.data.text || 'Feature',
                          type: TokenType.OBJECT,
                          x: d.x,
                          y: d.y,
                          color: d.data.color || '#ffffff',
                          symbol: '📍',
                          drawingData: d.data
                      } as Prop });
                  });
              }

              addLog('System', `Encounter generated: ${theme} (${difficulty}). Ready for combat.`);
          } catch (e: any) {
              console.error(e);
              addLog('System', `Failed to generate encounter: ${e.message}`, 'error');
          } finally {
              setIsAILoading(false);
              setLoadingStatus('');
          }
      },

      handleAddMonster: (monster: MonsterData, count: number, autoCombat: boolean) => {
          for (let i = 0; i < count; i++) {
              const spellSlots = monster.spellcasting 
                  ? (monster.spellcasting.slots || getSpellSlots(monster.spellcasting.class, monster.spellcasting.level)) 
                  : undefined;

              const t: Actor = {
                  id: Date.now().toString() + i,
                  name: count > 1 ? `${monster.name} ${i+1}` : monster.name,
                  type: TokenType.ENEMY,
                  x: Math.floor(Math.random() * gridSize.cols),
                  y: Math.floor(Math.random() * gridSize.rows),
                  color: '#ef4444',
                  symbol: monster.name.charAt(0),
                  hp: monster.hp,
                  maxHp: monster.hp,
                  ac: monster.ac,
                  speed: Math.floor(monster.speed / 5),
                  stats: monster.stats,
                  initiative: 0,
                  monsterData: monster,
                  autoCombat: autoCombat,
                  spellSlots: spellSlots,
                  spellAbility: monster.spellcasting?.ability,
                  level: monster.spellcasting?.level || monster.cr,
                  skillProficiencies: monster.skills,
                  savingThrowProficiencies: monster.savingThrowProficiencies
              };
              const calculated = calculateTokenStats(t);
              dispatch({ type: 'ADD_TOKEN', payload: calculated });
          }
          addLog('System', `Spawned ${count} ${monster.name}(s).`);
      },

      handleApplyMonsterData: (tokenId: string, monster: MonsterData) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === tokenId);
          if (!token || !isActor(token)) return;
          
          let updated: Actor = {
              ...token as Actor,
              name: monster.name,
              hp: monster.hp,
              maxHp: monster.hp,
              ac: monster.ac,
              speed: Math.floor(monster.speed / 5),
              stats: monster.stats,
              monsterData: monster,
              avatarUrl: undefined, 
              symbol: monster.name.charAt(0),
              skillProficiencies: monster.skills,
              savingThrowProficiencies: monster.savingThrowProficiencies
          };
          updated = calculateTokenStats(updated) as Actor;
          dispatch({ type: 'UPDATE_TOKEN', payload: updated });
          addLog('System', `${token.name} transformed into ${monster.name}.`);
      },

      handleToggleAI: (id: string) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === id);
          if (token && isActor(token)) {
              const actor = token as Actor;
              const newVal = !actor.autoCombat;
              dispatch({ type: 'UPDATE_TOKEN', payload: { ...actor, autoCombat: newVal } });
              addLog('System', `${actor.name}: AI Control ${newVal ? 'ENABLED' : 'DISABLED'}.`);
              
              if (newVal && cur.activeTurnId === id && (actor.hp || 0) > 0) {
                  addLog('System', `${actor.name} takes control...`, 'narrative');
                  setTimeout(() => runAITurn(actor.id), 500);
              }
          }
      },

      handleManualSave: async () => {
          try {
              const { floatingTexts, ...stateToSave } = stateRef.current;
              await Storage.saveGameState(stateToSave as GameState);
              addLog('System', 'Game state saved manually.', 'normal');
          } catch (e: any) {
              console.error("Manual save failed", e);
              addLog('System', `Failed to save game: ${e.message}`, 'error');
          }
      },

      handleLoadGame: async () => {
          setIsStorageLoading(true);
          try {
              const loaded = await Storage.loadGameState();
              dispatch({ type: 'LOAD_STATE', payload: loaded });
              addLog('System', 'Game state reloaded from storage.', 'normal');
          } catch (e) {
              console.error("Load failed", e);
              addLog('System', 'Failed to load game state.', 'error');
          } finally {
              setIsStorageLoading(false);
          }
      },

      handleExportGame: () => {
          const { floatingTexts, ...state } = stateRef.current;
          const dataStr = JSON.stringify(state);
          const blob = new Blob([dataStr], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `aethertable_save_${new Date().toISOString().slice(0,10)}.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          addLog('System', 'Campaign exported to file.', 'normal');
      },

      handleImportGame: (file: File) => {
          const reader = new FileReader();
          reader.onload = (e) => {
              try {
                  const json = e.target?.result as string;
                  const state = JSON.parse(json);
                  dispatch({ type: 'LOAD_STATE', payload: state });
                  Storage.saveGameState(state);
                  addLog('System', 'Campaign imported from file.', 'normal');
              } catch (err) {
                  console.error(err);
                  addLog('System', 'Failed to import campaign file.', 'error');
              }
          };
          reader.readAsText(file);
      },
      
      resetGame: () => {
          dispatch({ 
              type: 'RESET_GAME', 
              payload: { 
                  tokens: [], 
                  selectedTokenId: null, 
                  activeTurnId: null, 
                  round: 1, 
                  logs: [], 
                  mapBackgroundImage: null, 
                  floatingTexts: [],
                  combatMode: { active: false, sourceId: null, action: null },
                  linkingMode: { active: false, sourceId: null }
              } 
          });
          Storage.clearGameState();
      },

      handleUpdateInitiative: (id: string, newInit: number) => {
          const cur = stateRef.current;
          const token = cur.tokens.find(t => t.id === id);
          if (token && isActor(token)) {
              const actor = token as Actor;
              dispatch({ type: 'UPDATE_TOKEN', payload: { ...actor, initiative: newInit } });
              addLog('System', `${actor.name}'s initiative updated to ${newInit}.`);
          }
      },
  };

  return { gameState, gridSize, isAILoading, loadingStatus, isStorageLoading, actions };
};

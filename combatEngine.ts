
import { Token, FloatingText, WeaponItem, TokenType, Actor } from '../types';
import * as Rules from './gameLogic';
import { SRD_SPELLS } from '../data/srd';
import { resolveSpell } from './spellEngine';

export interface CombatResult {
    attacker: Actor;
    target: Actor;
    logs: string[];
    floatingTexts: FloatingText[];
    secondaryTarget?: Actor;
}

const checkCover = (start: Actor, end: Actor, tokens?: Token[]): number => {
    if (!tokens) return 0;
    
    let x0 = start.x;
    let y0 = start.y;
    const x1 = end.x;
    const y1 = end.y;
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
    
    let bonus = 0;
    
    while (true) {
        if (x0 === x1 && y0 === y1) break;
        if (x0 !== start.x || y0 !== start.y) {
            const coverToken = tokens.find(t => t.x === x0 && t.y === y0 && t.drawingData?.type === 'terrain' && t.drawingData.terrainType?.startsWith('cover'));
            if (coverToken) {
                const b = coverToken.drawingData?.mechanics?.acBonus || 2;
                bonus = Math.max(bonus, b); 
            }
        }
        const e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
    return bonus;
};

export const resolveCombatAction = (
    attacker: Actor, 
    target: Actor, 
    actionType: 'ATTACK' | 'MANEUVER' | 'CAST_SPELL' | 'CUNNING_STRIKE' | 'BRUTAL_STRIKE' | 'HELP',
    options: {
        spellName?: string;
        maneuverType?: string;
        itemSourceId?: string;
        round?: number;
        subOption?: string; 
    },
    tokens?: Token[]
): CombatResult => {
    const logs: string[] = [];
    const floatingTexts: FloatingText[] = [];
    const addFloat = (x: number, y: number, text: string, color: string, type: FloatingText['type'] = 'info') => {
        floatingTexts.push({ id: Math.random().toString(), x, y, text, color, type });
    };

    if (!attacker || !target) {
        return { attacker: attacker || ({} as Actor), target: target || ({} as Actor), logs: ["Error: Invalid Combatants"], floatingTexts: [] };
    }

    let finalAttacker = { ...attacker };
    let finalTarget = { ...target };
    let secondaryTarget: Actor | undefined;
    
    if (!finalAttacker.stats) finalAttacker.stats = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    if (!finalTarget.stats) finalTarget.stats = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    if (finalAttacker.ac === undefined) finalAttacker.ac = 10;
    if (finalTarget.ac === undefined) finalTarget.ac = 10;

    const coverBonus = checkCover(attacker, target, tokens);
    if (coverBonus > 0) {
        finalTarget.ac += coverBonus;
        logs.push(`${target.name} has cover (+${coverBonus} AC).`);
    }

    let logMsg = '';
    const { spellName: spellNameOverride, maneuverType, itemSourceId, round = 1, subOption } = options;

    const applyForcedMove = (t: Actor, dx: number, dy: number, dist: number) => {
        t.x += dx * dist;
        t.y += dy * dist;
        if (tokens) {
            const hRes = Rules.resolveTerrainHazard(t, tokens);
            if (hRes.damageTaken > 0 || hRes.logs.length > 0) {
                t = hRes.token as Actor;
                logs.push(...hRes.logs);
                if (hRes.damageTaken > 0) addFloat(t.x, t.y, `-${hRes.damageTaken}`, '#ef4444', 'damage');
            }
        }
        return t;
    };

    if (actionType === 'HELP') {
        const isEnemy = target.type === TokenType.ENEMY;
        const isPlayer = target.type === TokenType.PLAYER;
        const attackerIsPlayer = attacker.type === TokenType.PLAYER;
        const hostile = (attackerIsPlayer && isEnemy) || (!attackerIsPlayer && isPlayer);
        
        if (hostile) {
            const effects = [...(finalTarget.statusEffects || []), { id: 'distracted', duration: 1, sourceId: finalAttacker.id }];
            finalTarget.statusEffects = effects;
            logMsg = `${finalAttacker.name} distracts ${finalTarget.name}! (Advantage on next attack against target).`;
            addFloat(finalTarget.x, finalTarget.y, 'DISTRACTED', '#fbbf24', 'info');
        } else {
            const effects = [...(finalTarget.statusEffects || []), { id: 'helped', duration: 1, sourceId: finalAttacker.id }];
            finalTarget.statusEffects = effects;
            logMsg = `${finalAttacker.name} helps ${finalTarget.name}! (Advantage on next check).`;
            addFloat(finalTarget.x, finalTarget.y, 'HELPED', '#3b82f6', 'info');
        }
        logs.push(logMsg);
        return { attacker: finalAttacker, target: finalTarget, logs, floatingTexts };
    }

    const isSpell = SRD_SPELLS.some(s => s.name === spellNameOverride);
    if (isSpell && spellNameOverride) {
        const spell = SRD_SPELLS.find(s => s.name === spellNameOverride);
        if (spell) {
             const result = resolveSpell(spell, finalAttacker, finalTarget, spell.level, itemSourceId);
             logs.push(...result.logs);
             floatingTexts.push(...result.floatingTexts);
             
             const updatedTarget = result.targets.find(t => t.id === target.id);
             if (updatedTarget) finalTarget = updatedTarget;
             finalAttacker = result.caster;
             return { attacker: finalAttacker, target: finalTarget, logs, floatingTexts };
        }
    }

    let attackName = 'Attack';
    let attackBonus = finalAttacker.attackBonus || 0;
    let damageDice = '1d4';
    let damageType = 'bludgeoning';
    
    const monsterAction = spellNameOverride 
      ? finalAttacker.monsterData?.actions.find(a => a.name === spellNameOverride)
      : null;

    if (monsterAction) {
        attackName = monsterAction.name;
        attackBonus = monsterAction.attackBonus || attackBonus;
        damageDice = monsterAction.damage || damageDice;
        damageType = monsterAction.damageType || damageType;
        
        if (monsterAction.name === 'Wail') {
             const ability = monsterAction.saveAbility?.toLowerCase() as keyof typeof finalTarget.stats || 'con';
             const mod = Rules.getModifier(finalTarget.stats[ability] || 10);
             const saveRoll = Rules.rollDie(20);
             const saveTotal = saveRoll + mod; 
             
             if (saveTotal < (monsterAction.saveDC || 13)) {
                 finalTarget.hp = 0;
                 logMsg = `${finalAttacker.name} wails! ${finalTarget.name} fails save (${saveTotal}) and drops to 0 HP!`;
                 addFloat(finalTarget.x, finalTarget.y, `0 HP`, '#ef4444', 'crit');
             } else {
                 const dmg = 10; 
                 finalTarget = Rules.applyDamageToToken(finalTarget, dmg, 'psychic', false) as Actor;
                 logMsg = `${finalAttacker.name} wails! ${finalTarget.name} succeeds save and takes ${dmg} psychic damage.`;
                 addFloat(finalTarget.x, finalTarget.y, `${dmg}`, '#ef4444', 'damage');
             }
             logs.push(logMsg);
             return { attacker: finalAttacker, target: finalTarget, logs, floatingTexts };
        }

        if (monsterAction.type === 'save' && monsterAction.saveDC && monsterAction.saveAbility) {
             const ability = monsterAction.saveAbility.toLowerCase() as keyof typeof finalTarget.stats;
             const mod = Rules.getModifier(finalTarget.stats[ability] || 10);
             const saveRoll = Rules.rollDie(20);
             const saveTotal = saveRoll + mod; 
             const dmg = Rules.parseDiceString(damageDice);
             
             if (saveTotal < monsterAction.saveDC) {
                 finalTarget = Rules.applyDamageToToken(finalTarget, dmg, damageType, false) as Actor;
                 logMsg = `${finalAttacker.name} uses ${attackName}. ${finalTarget.name} fails save (${saveTotal} < ${monsterAction.saveDC}) and takes ${dmg} ${damageType} damage.`;
                 addFloat(finalTarget.x, finalTarget.y, `${dmg}`, '#ef4444', 'damage');
             } else {
                 const halfDmg = Math.floor(dmg/2);
                 finalTarget = Rules.applyDamageToToken(finalTarget, halfDmg, damageType, false) as Actor;
                 logMsg = `${finalAttacker.name} uses ${attackName}. ${finalTarget.name} succeeds save and takes ${halfDmg} damage.`;
                 addFloat(finalTarget.x, finalTarget.y, `${halfDmg}`, '#ef4444', 'damage');
             }
             logs.push(logMsg);
             return { attacker: finalAttacker, target: finalTarget, logs, floatingTexts };
        }
    } 
    
    if (monsterAction) {
         const d20 = Rules.rollDie(20);
         const total = d20 + attackBonus;
         const isCrit = d20 === 20;
         const isHit = total >= (finalTarget.ac || 10) || isCrit;
         
         if (isHit) {
             let dmg = Rules.parseDiceString(damageDice);
             if (isCrit) dmg += Rules.parseDiceString(damageDice); 
             
             const isMeleeHit = monsterAction.type === 'melee' && Rules.getDistance(finalAttacker, finalTarget) <= 1;
             if (isMeleeHit && Rules.hasStatus(finalTarget, 'reaction_parry') && finalTarget.classResource && finalTarget.classResource.current > 0 && finalTarget.classResource.name === 'Superiority Dice') {
                 const dieSize = finalTarget.classResource.dieSize || 8;
                 const parryRoll = Rules.rollDie(dieSize) + Rules.getModifier(finalTarget.stats.dex || 10);
                 dmg = Math.max(0, dmg - parryRoll);
                 finalTarget.classResource.current--;
                 finalTarget.statusEffects = finalTarget.statusEffects?.filter(e => e.id !== 'reaction_parry');
                 logMsg += ` [Parry: -${parryRoll} Dmg].`;
                 addFloat(finalTarget.x, finalTarget.y, `PARRY -${parryRoll}`, '#a855f7', 'info');
             }

             if (Rules.hasStatus(finalTarget, 'reaction_deflect') && finalTarget.class === 'Monk') {
                 const monkLevel = finalTarget.level || 1;
                 const deflectRoll = Rules.rollDie(10) + Rules.getModifier(finalTarget.stats.dex || 10) + monkLevel;
                 dmg = Math.max(0, dmg - deflectRoll);
                 finalTarget.statusEffects = finalTarget.statusEffects?.filter(e => e.id !== 'reaction_deflect');
                 logMsg += ` [Deflect: -${deflectRoll} Dmg].`;
                 addFloat(finalTarget.x, finalTarget.y, `DEFLECT -${deflectRoll}`, '#fcd34d', 'info');
             }

             finalTarget = Rules.applyDamageToToken(finalTarget, dmg, damageType, isCrit) as Actor;
             logMsg = `${finalAttacker.name} hits ${finalTarget.name} with ${attackName} (${total} vs AC ${finalTarget.ac}). Dealt ${dmg} ${damageType}. ${logMsg}`;
             addFloat(finalTarget.x, finalTarget.y, `${dmg}`, '#ef4444', 'damage');
         } else {
             logMsg = `${finalAttacker.name} missed ${finalTarget.name} with ${attackName} (${total} vs AC ${finalTarget.ac}).`;
             addFloat(finalTarget.x, finalTarget.y, 'MISS', '#94a3b8', 'miss');
         }
    } else {
         const weapon = finalAttacker.inventory?.find(i => i.equipped && i.type === 'weapon') as WeaponItem;
         const mastery = weapon?.mastery;
         const canUseMastery = finalAttacker.traits?.some(t => t.includes('Weapon Mastery'));

         if (!weapon && (maneuverType === 'Grapple' || maneuverType === 'Shove')) {
             const dc = Rules.calculateUnarmedStrikeDC(finalAttacker);
             let roll1 = Rules.rollDie(20);
             let roll2 = Rules.rollDie(20);
             const isRaging = Rules.hasStatus(finalTarget, 'rage');
             const strMod = Rules.getModifier(finalTarget.stats.str || 10);
             const dexMod = Rules.getModifier(finalTarget.stats.dex || 10);
             let mod = Math.max(strMod, dexMod);
             const usedStr = strMod >= dexMod;
             
             if (isRaging && usedStr) {
                 roll1 = Math.max(roll1, roll2);
             }
             const save = roll1 + mod;

             if (maneuverType === 'Grapple') {
                 if (save < dc) {
                     finalTarget.statusEffects = [...(finalTarget.statusEffects || []), { id: 'grappled', duration: 1, sourceId: finalAttacker.id }];
                     logMsg = `${finalAttacker.name} grapples ${finalTarget.name}! (${save} < DC ${dc}${isRaging && usedStr ? ' w/ Adv' : ''})`;
                     addFloat(finalTarget.x, finalTarget.y, 'GRAPPLED', '#ef4444', 'info');
                 } else {
                     logMsg = `${finalTarget.name} resists grapple (${save}${isRaging && usedStr ? ' w/ Adv' : ''}).`;
                 }
             } else if (maneuverType === 'Shove') {
                 if (save < dc) {
                      const dx = finalTarget.x - finalAttacker.x;
                      const dy = finalTarget.y - finalAttacker.y;
                      const ndx = dx === 0 ? 0 : dx / Math.abs(dx);
                      const ndy = dy === 0 ? 0 : dy / Math.abs(dy);
                      finalTarget = applyForcedMove(finalTarget, ndx, ndy, 1);
                      logMsg = `${finalAttacker.name} shoves ${finalTarget.name} 5ft! (${save} < DC ${dc}${isRaging && usedStr ? ' w/ Adv' : ''})`;
                      addFloat(finalTarget.x, finalTarget.y, 'SHOVED', '#f59e0b', 'info');
                 } else {
                      logMsg = `${finalTarget.name} holds ground (${save}${isRaging && usedStr ? ' w/ Adv' : ''}).`;
                 }
             }
             logs.push(logMsg);
             return { attacker: finalAttacker, target: finalTarget, logs, floatingTexts };
         }
         
         if (actionType === 'BRUTAL_STRIKE') {
             finalAttacker.statusEffects = finalAttacker.statusEffects?.filter(e => e.id !== 'reckless');
         }

         const result = Rules.calculateAttack(finalAttacker, target, { round });
         
         if (Rules.hasStatus(attacker, 'heroic_inspiration')) {
             finalAttacker.statusEffects = finalAttacker.statusEffects?.filter(e => e.id !== 'heroic_inspiration');
             logs.push(`${finalAttacker.name} expends Heroic Inspiration.`);
         }

         if (result.isHit) {
             const dmgResult = Rules.calculateDamage(attacker, target, result.isCrit);
             let dmg = dmgResult.damage;
             
             const isFinesse = weapon?.properties?.includes('Finesse');
             const isRanged = weapon?.range || weapon?.name.toLowerCase().includes('bow');
             
             if (finalAttacker.class === 'Rogue' && (isFinesse || isRanged)) {
                 const hasAdvantage = result.rollType === 'advantage';
                 let allyAdjacent = false;
                 if (tokens) {
                     allyAdjacent = tokens.some(t => 
                         t.id !== finalAttacker.id && 
                         t.id !== finalTarget.id && 
                         (t.type === TokenType.PLAYER || t.type === TokenType.NPC || t.type === TokenType.OBJECT) && 
                         Rules.getDistance(t, finalTarget) <= 1
                     );
                 }
                 if (hasAdvantage || (allyAdjacent && result.rollType !== 'disadvantage')) {
                     const sneakDice = Math.ceil((finalAttacker.level || 1) / 2);
                     let sneakDmg = 0;
                     for(let i=0; i<sneakDice; i++) sneakDmg += Rules.rollDie(6);
                     if (result.isCrit) {
                         for(let i=0; i<sneakDice; i++) sneakDmg += Rules.rollDie(6);
                     }
                     dmg += sneakDmg;
                     logMsg += ` [Sneak Attack +${sneakDmg}]`;
                 }
             }

             if (actionType === 'BRUTAL_STRIKE') {
                 const extraDmg = Rules.rollDie(10);
                 dmg += extraDmg;
                 logMsg += ` [Brutal Strike +${extraDmg}]`;
                 
                 if (subOption === 'Forceful Blow') {
                      const dx = finalTarget.x - finalAttacker.x;
                      const dy = finalTarget.y - finalAttacker.y;
                      const ndx = dx === 0 ? 0 : dx / Math.abs(dx);
                      const ndy = dy === 0 ? 0 : dy / Math.abs(dy);
                      finalTarget = applyForcedMove(finalTarget, ndx, ndy, 3);
                      
                      finalAttacker.x = finalAttacker.x + (ndx * Math.floor((finalAttacker.speed||30)/2)); 
                      finalAttacker.y = finalAttacker.y + (ndy * Math.floor((finalAttacker.speed||30)/2));
                      logMsg += ` (Pushed 15ft & Followed)`;
                 } else if (subOption === 'Hamstring Blow') {
                      finalTarget.statusEffects = [...(finalTarget.statusEffects || []), { id: 'hamstrung', duration: 1 }];
                      logMsg += ` (Hamstrung -15ft)`;
                 } else if (subOption === 'Staggering Blow') {
                      addFloat(finalTarget.x, finalTarget.y, 'STAGGERED', '#fbbf24', 'info');
                      logMsg += ` (Staggered)`;
                 } else if (subOption === 'Sundering Blow') {
                      addFloat(finalTarget.x, finalTarget.y, 'SUNDERED', '#ef4444', 'info');
                      logMsg += ` (Sundered)`;
                 }
             }

             if (canUseMastery && mastery) {
                 if (mastery === 'Vex') {
                     const vexId = `vexed_by_${finalAttacker.id}`;
                     finalTarget.statusEffects = [...(finalTarget.statusEffects || []), { id: vexId, duration: 1, sourceId: finalAttacker.id }];
                     logMsg += ` [Vex: Adv next hit].`;
                 }
                 
                 if (mastery === 'Nick') {
                     logMsg += ` [Nick: Free off-hand attack].`;
                 }
                 
                 if (mastery === 'Push' && (finalTarget.monsterData?.size !== 'Huge' && finalTarget.monsterData?.size !== 'Gargantuan')) {
                     const dx = finalTarget.x - finalAttacker.x;
                     const dy = finalTarget.y - finalAttacker.y;
                     const ndx = dx === 0 ? 0 : dx / Math.abs(dx);
                     const ndy = dy === 0 ? 0 : dy / Math.abs(dy);
                     finalTarget = applyForcedMove(finalTarget, ndx, ndy, 2);
                     logMsg += ` [Push 10ft].`;
                     addFloat(finalTarget.x, finalTarget.y, 'PUSH', '#fbbf24', 'info');
                 }
                 
                 if (mastery === 'Sap') {
                     finalTarget.statusEffects = [...(finalTarget.statusEffects || []), { id: 'sapped', duration: 1, sourceId: finalAttacker.id }];
                     logMsg += ` [Sap: Disadv next attack].`;
                     addFloat(finalTarget.x, finalTarget.y, 'SAPPED', '#a855f7', 'info');
                 }
                 
                 if (mastery === 'Slow') {
                     finalTarget.statusEffects = [...(finalTarget.statusEffects || []), { id: 'slowed', duration: 1, value: 10 }];
                     logMsg += ` [Slow -10ft].`;
                 }
                 
                 if (mastery === 'Topple') {
                     const dc = 8 + (Rules.getProficiencyBonus(finalAttacker.level) || 2) + Rules.getModifier(finalAttacker.stats.str || 10); 
                     const save = Rules.rollDie(20) + Rules.getModifier(finalTarget.stats.con || 10);
                     if (save < dc) {
                         finalTarget.statusEffects = [...(finalTarget.statusEffects || []), { id: 'prone', duration: 999 }];
                         logMsg += ` [Topple: Prone].`;
                         addFloat(finalTarget.x, finalTarget.y, 'TOPPLE', '#fbbf24', 'info');
                     } else {
                         logMsg += ` [Topple Resist].`;
                     }
                 }
                 
                 if (mastery === 'Cleave' && tokens) {
                     const secondary = tokens.find(t => 
                         t.id !== finalTarget.id && 
                         t.id !== finalAttacker.id && 
                         (t.type === TokenType.ENEMY || t.type === TokenType.NPC) && 
                         Rules.isActor(t) &&
                         Math.max(Math.abs(t.x - finalTarget.x), Math.abs(t.y - finalTarget.y)) <= 1 &&
                         Math.max(Math.abs(t.x - finalAttacker.x), Math.abs(t.y - finalAttacker.y)) <= 1
                     );
                     
                     if (secondary && Rules.isActor(secondary)) {
                         const cleaveRoll = Rules.rollDie(20) + attackBonus;
                         if (cleaveRoll >= (secondary.ac || 10)) {
                             const weaponDmg = Rules.parseDiceString(weapon.damage?.dice || '1d6');
                             secondaryTarget = { ...secondary };
                             secondaryTarget = Rules.applyDamageToToken(secondaryTarget, weaponDmg, weapon.damage?.type || 'bludgeoning', false) as Actor;
                             logMsg += ` [Cleave: Hit ${secondaryTarget.name} for ${weaponDmg}].`;
                             addFloat(secondaryTarget.x, secondaryTarget.y, `${weaponDmg}`, '#ef4444', 'damage');
                         } else {
                             logMsg += ` [Cleave: Missed ${secondary.name}].`;
                         }
                     }
                 }
             }

             if (actionType === 'CUNNING_STRIKE' && subOption) {
                 let dieCost = 1; 
                 if (subOption === 'Poison') {
                     const dc = 8 + Rules.getModifier(finalAttacker.stats.dex || 10) + Rules.getProficiencyBonus(finalAttacker.level);
                     const save = Rules.rollDie(20) + Rules.getModifier(finalTarget.stats.con || 10);
                     if (save < dc) {
                         finalTarget.statusEffects = [...(finalTarget.statusEffects || []), { id: 'poisoned', duration: 10 }]; 
                         logMsg += ` [Cunning Strike: Poisoned].`;
                     }
                     dieCost = 1;
                 } else if (subOption === 'Trip') {
                      const dc = 8 + Rules.getModifier(finalAttacker.stats.dex || 10) + Rules.getProficiencyBonus(finalAttacker.level);
                      const save = Rules.rollDie(20) + Rules.getModifier(finalTarget.stats.dex || 10);
                      if (save < dc) {
                          finalTarget.statusEffects = [...(finalTarget.statusEffects || []), { id: 'prone', duration: 999 }];
                          logMsg += ` [Cunning Strike: Trip].`;
                      }
                      dieCost = 1;
                 } else if (subOption === 'Withdraw') {
                     logMsg += ` [Cunning Strike: Withdraw].`;
                     dieCost = 1;
                 } else if (subOption === 'Daze') {
                     const dc = 8 + Rules.getModifier(finalAttacker.stats.dex || 10) + Rules.getProficiencyBonus(finalAttacker.level);
                     const save = Rules.rollDie(20) + Rules.getModifier(finalTarget.stats.con || 10);
                     if (save < dc) {
                         addFloat(finalTarget.x, finalTarget.y, 'DAZED', '#a855f7', 'info');
                         logMsg += ` [Cunning Strike: Dazed].`;
                     }
                     dieCost = 2;
                 } else if (subOption === 'Knock Out') {
                     const dc = 8 + Rules.getModifier(finalAttacker.stats.dex || 10) + Rules.getProficiencyBonus(finalAttacker.level);
                     const save = Rules.rollDie(20) + Rules.getModifier(finalTarget.stats.con || 10);
                     if (save < dc) {
                         finalTarget.statusEffects = [...(finalTarget.statusEffects || []), { id: 'unconscious', duration: 10 }]; 
                         logMsg += ` [Cunning Strike: Knock Out].`;
                     }
                     dieCost = 6;
                 } else if (subOption === 'Obscure') {
                      const dc = 8 + Rules.getModifier(finalAttacker.stats.dex || 10) + Rules.getProficiencyBonus(finalAttacker.level);
                      const save = Rules.rollDie(20) + Rules.getModifier(finalTarget.stats.dex || 10);
                      if (save < dc) {
                          finalTarget.statusEffects = [...(finalTarget.statusEffects || []), { id: 'blinded', duration: 1 }]; 
                          logMsg += ` [Cunning Strike: Obscure].`;
                      }
                      dieCost = 3;
                 }
                 const reduceAmt = Rules.rollDie(6) * dieCost;
                 dmg = Math.max(1, dmg - reduceAmt); 
             }

             if (Rules.hasStatus(finalAttacker, 'smite')) {
                 let slotLevel = 0;
                 if (finalAttacker.spellSlots) {
                     for (let i = 4; i >= 1; i--) {
                         if (finalAttacker.spellSlots[i.toString()]?.current > 0) {
                             slotLevel = i;
                             break;
                         }
                     }
                     if (slotLevel === 0 && finalAttacker.class === 'Warlock') {
                          const key = Object.keys(finalAttacker.spellSlots).find(k => finalAttacker.spellSlots![k].current > 0);
                          if (key) slotLevel = parseInt(key);
                     }
                 }
                 
                 if (slotLevel > 0) {
                     if (finalAttacker.class === 'Warlock') {
                          const key = Object.keys(finalAttacker.spellSlots!).find(k => finalAttacker.spellSlots![k].current > 0);
                          if (key) finalAttacker.spellSlots![key].current--;
                     } else {
                          finalAttacker.spellSlots![slotLevel.toString()].current--;
                     }

                     let diceCount = Math.min(5, 1 + slotLevel);
                     if (finalTarget.monsterData && (finalTarget.monsterData.type === 'Fiend' || finalTarget.monsterData.type === 'Undead')) {
                         diceCount += 1;
                     }
                     
                     let smiteDmg = 0;
                     for(let i=0; i<diceCount; i++) smiteDmg += Rules.rollDie(8);
                     if (result.isCrit) { 
                         for(let i=0; i<diceCount; i++) smiteDmg += Rules.rollDie(8);
                     }

                     dmg += smiteDmg;
                     logMsg += ` Divine Smite (Lv${slotLevel})! +${smiteDmg} Radiant.`;
                     addFloat(finalTarget.x, finalTarget.y, `SMITE`, '#fbbf24', 'crit');
                     finalAttacker.statusEffects = finalAttacker.statusEffects?.filter(e => e.id !== 'smite');
                 } else {
                     logMsg += ` (Smite failed: No slots).`;
                     finalAttacker.statusEffects = finalAttacker.statusEffects?.filter(e => e.id !== 'smite');
                 }
             }

             // Parry & Deflect
             const isMeleeHit = !isRanged && Rules.getDistance(finalAttacker, finalTarget) <= 1;
             if (isMeleeHit && Rules.hasStatus(finalTarget, 'reaction_parry') && finalTarget.classResource && finalTarget.classResource.current > 0 && finalTarget.classResource.name === 'Superiority Dice') {
                 const dieSize = finalTarget.classResource.dieSize || 8;
                 const parryRoll = Rules.rollDie(dieSize) + Rules.getModifier(finalTarget.stats.dex || 10);
                 dmg = Math.max(0, dmg - parryRoll);
                 finalTarget.classResource.current--;
                 finalTarget.statusEffects = finalTarget.statusEffects?.filter(e => e.id !== 'reaction_parry'); 
                 logMsg += ` [Parry: -${parryRoll} Dmg].`;
                 addFloat(finalTarget.x, finalTarget.y, `PARRY -${parryRoll}`, '#a855f7', 'info');
             }

             if (Rules.hasStatus(finalTarget, 'reaction_deflect') && finalTarget.class === 'Monk') {
                 const monkLevel = finalTarget.level || 1;
                 const deflectRoll = Rules.rollDie(10) + Rules.getModifier(finalTarget.stats.dex || 10) + monkLevel;
                 dmg = Math.max(0, dmg - deflectRoll);
                 finalTarget.statusEffects = finalTarget.statusEffects?.filter(e => e.id !== 'reaction_deflect');
                 logMsg += ` [Deflect: -${deflectRoll} Dmg].`;
                 addFloat(finalTarget.x, finalTarget.y, `DEFLECT -${deflectRoll}`, '#fcd34d', 'info');
             }

             finalTarget = Rules.applyDamageToToken(finalTarget, dmg, dmgResult.type, result.isCrit, dmgResult.ignoreResistance) as Actor;
             logMsg = `${attacker.name} hits ${target.name} for ${dmg} ${dmgResult.type}. ${logMsg}`;
             addFloat(target.x, target.y, `${dmg}`, '#ef4444', 'damage');
         } else {
             if (canUseMastery && mastery === 'Graze') {
                 const abilityMod = Math.max(Rules.getModifier(finalAttacker.stats.str || 10), Rules.getModifier(finalAttacker.stats.dex || 10)); 
                 if (abilityMod > 0) {
                     finalTarget = Rules.applyDamageToToken(finalTarget, abilityMod, 'bludgeoning', false, false) as Actor; 
                     logMsg = `${finalAttacker.name} Grazes ${finalTarget.name} for ${abilityMod} damage despite miss.`;
                     addFloat(finalTarget.x, finalTarget.y, `${abilityMod}`, '#f59e0b', 'damage');
                 } else {
                     logMsg = `${attacker.name} misses ${target.name}.`;
                     addFloat(target.x, target.y, 'MISS', '#94a3b8', 'miss');
                 }
             } else {
                 logMsg = `${attacker.name} misses ${target.name}.`;
                 addFloat(target.x, target.y, 'MISS', '#94a3b8', 'miss');
             }
         }
         
         if (Rules.hasStatus(finalAttacker, 'true_strike')) {
             finalAttacker.statusEffects = finalAttacker.statusEffects?.filter(e => e.id !== 'true_strike');
         }
         if (Rules.hasStatus(finalTarget, 'glittering')) {
             finalTarget.statusEffects = finalTarget.statusEffects?.filter(e => e.id !== 'glittering');
         }
         if (Rules.hasStatus(finalTarget, `vexed_by_${finalAttacker.id}`)) {
             finalTarget.statusEffects = finalTarget.statusEffects?.filter(e => e.id !== `vexed_by_${finalAttacker.id}`);
         }
    }
    
    if ((finalTarget.hp || 0) === 0 && (target.hp || 0) > 0) {
        logMsg += " Defeated!";
        if (finalAttacker.class === 'Warlock' && finalAttacker.subclass === 'Fiend Patron') {
             const cha = Rules.getModifier(finalAttacker.stats.cha || 10);
             const level = finalAttacker.level || 1;
             const thp = cha + level;
             if ((finalAttacker.tempHp || 0) < thp) {
                 finalAttacker.tempHp = thp;
                 logMsg += ` ${finalAttacker.name} gains ${thp} Temp HP (Dark One's Blessing).`;
                 addFloat(finalAttacker.x, finalAttacker.y, `+${thp} THP`, '#a855f7', 'heal');
             }
        }
    }

    logs.push(logMsg);
    return { attacker: finalAttacker, target: finalTarget, secondaryTarget, logs, floatingTexts };
};

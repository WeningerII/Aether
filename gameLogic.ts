
import { Token, Actor, Prop, AbilityScores, ActiveStatusEffect, TokenType, GridSize, AreaShape } from '../types';
import { SPELL_SLOT_TABLE, SRD_CLASSES } from '../data/srd';

const DEFAULT_STATS: AbilityScores = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };

export const isActor = (token: Token | null | undefined): token is Actor => {
    if (!token) return false;
    return token.type === TokenType.PLAYER || token.type === TokenType.ENEMY || token.type === TokenType.NPC;
};

export const rollDie = (sides: number) => {
    if (typeof sides !== 'number' || sides < 1 || isNaN(sides)) return 1;
    const floorSides = Math.floor(sides);
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return (array[0] % floorSides) + 1;
};

export const parseDiceString = (formula: string, rerollThreshold: number = 0): number => {
    if (!formula || typeof formula !== 'string') return 0;
    
    // Sanitize input
    const cleanFormula = formula.toLowerCase().replace(/[^0-9d+\-\s]/g, '').trim();
    if (!cleanFormula) return 0;

    // Handle simple integer input
    if (/^\d+$/.test(cleanFormula)) {
        const val = parseInt(cleanFormula, 10);
        return isNaN(val) ? 0 : val;
    }

    // Regex to match XdY (+/- Z)
    const match = cleanFormula.match(/(\d*)\s*d\s*(\d+)\s*([+-]?\s*\d+)?/i);
    
    if (!match) {
        const num = parseInt(cleanFormula);
        return isNaN(num) ? 0 : num;
    }

    const countStr = match[1];
    const count = countStr === '' ? 1 : parseInt(countStr, 10);
    const sides = parseInt(match[2], 10);
    const modStr = match[3]?.replace(/\s/g, '') || '0';
    const modifier = parseInt(modStr, 10);

    if (isNaN(sides) || sides < 1) return 0;

    let total = 0;
    const safeCount = Math.min(Math.max(0, isNaN(count) ? 1 : count), 100); 
    
    for(let i = 0; i < safeCount; i++) {
        let roll = rollDie(sides);
        // Great Weapon Fighting Logic: Reroll 1s and 2s once
        if (rerollThreshold > 0 && roll <= rerollThreshold) {
            roll = rollDie(sides);
        }
        total += roll;
    }
    
    if (count > 100) {
        const remaining = count - 100;
        const avg = (sides + 1) / 2;
        total += Math.floor(remaining * avg);
    }
    
    const finalMod = isNaN(modifier) ? 0 : modifier;
    return Math.max(0, total + finalMod);
};

export const getModifier = (score: number) => Math.floor(((score || 10) - 10) / 2);

export const getProficiencyBonus = (level: number = 1) => Math.floor((Math.max(1, level) - 1) / 4) + 2;

export const getSpellAttributeMod = (token: Actor): number => {
    const ability = token.spellAbility || 'int';
    return getModifier(token.stats?.[ability] || 10);
};

export const getClassHitDie = (className: string): number => {
    const cls = SRD_CLASSES.find(c => c.name === className);
    return cls?.hitDie || 8;
};

export const getDistance = (t1: Token, t2: Token) => {
    if (!t1 || !t2) return 0;
    return Math.max(Math.abs(t1.x - t2.x), Math.abs(t1.y - t2.y));
};

export const hasStatus = (token: Token, statusId: string): boolean => {
    if (!isActor(token) || !token.statusEffects) return false;
    return token.statusEffects.some(e => e.id === statusId);
};

export const getStatusValue = (token: Token, statusId: string): number | undefined => {
    if (!isActor(token) || !token.statusEffects) return undefined;
    return token.statusEffects.find(e => e.id === statusId)?.value;
};

export const canHeal = (token: Token): boolean => {
    if (hasStatus(token, 'chill_touch')) return false;
    return true;
};

export const checkLineOfSight = (start: Token, end: Token, tokens: Token[]): boolean => {
    if (!start || !end) return false;
    const obstacles = tokens.filter(t => 
        !isActor(t) && // Only objects block (and specifically blocking ones)
        t.id !== start.id && 
        t.id !== end.id && 
        (
            (t.drawingData.type !== 'zone') &&
            (t.drawingData.blocksVision) // Explicit visual blockers
        )
    );
    let x0 = start.x;
    let y0 = start.y;
    const x1 = end.x;
    const y1 = end.y;
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
    let safetyCounter = 0;
    const MAX_ITERATIONS = 200; 

    while (safetyCounter++ < MAX_ITERATIONS) {
        if (x0 === x1 && y0 === y1) break;
        if (x0 !== start.x || y0 !== start.y) {
            if (obstacles.some(t => t.x === x0 && t.y === y0)) {
                return false;
            }
        }
        const e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
    return true; 
};

export const calculateTokenStats = (token: Token): Token => {
    if (!isActor(token)) return token;

    // 1. Base Stats & Overrides
    const stats = { ...(token.stats || DEFAULT_STATS) };
    const statOverrides: Partial<AbilityScores> = {};

    token.inventory?.forEach(item => {
        if (item.equipped && item.effect?.type === 'buff' && item.effect.stat?.endsWith('_score')) {
            const ability = item.effect.stat.replace('_score', '') as keyof AbilityScores;
            const val = parseInt(item.effect.value || '0', 10);
            if (!isNaN(val)) {
                statOverrides[ability] = Math.max(statOverrides[ability] || 0, val);
            }
        }
    });

    token.statusEffects?.forEach(effect => {
        if (effect.id.endsWith('_score') && effect.value) {
            const ability = effect.id.replace('_score', '') as keyof AbilityScores;
            statOverrides[ability] = Math.max(statOverrides[ability] || 0, effect.value);
        }
    });

    (Object.keys(statOverrides) as Array<keyof AbilityScores>).forEach(key => {
        if (statOverrides[key]! > stats[key]) {
            stats[key] = statOverrides[key]!;
        }
    });

    const dexMod = getModifier(stats.dex);
    const level = token.level || 1;
    const prof = getProficiencyBonus(level);

    let knownSpells = token.knownSpells;
    let spellSlots = token.spellSlots;
    let spellAbility = token.spellAbility;

    if (token.monsterData?.spellcasting) {
        const mc = token.monsterData.spellcasting;
        if (!knownSpells || knownSpells.length === 0) {
            knownSpells = [...mc.spells];
        }
        if (!spellAbility) {
            spellAbility = mc.ability;
        }
        if (!spellSlots) {
            if (mc.slots) {
                spellSlots = JSON.parse(JSON.stringify(mc.slots));
            } else {
                spellSlots = getSpellSlots(mc.class, mc.level);
            }
        }
    }

    let bonuses = {
        ac: 0,
        initiative: 0,
        speed: 0,
        saves: 0,
        checks: 0,
        spellAttack: 0,
        spellDC: 0,
        resistances: [] as string[],
        immunities: [] as string[],
        conditionImmunities: [] as string[]
    };

    token.inventory?.forEach(item => {
        if (!item.equipped) return;
        if (item.resistances) bonuses.resistances.push(...item.resistances);
        if (item.immunities) bonuses.immunities.push(...item.immunities);

        item.passiveBonuses?.forEach(b => {
            if (b.stat === 'ac') bonuses.ac += b.value;
            if (b.stat === 'initiative') bonuses.initiative += b.value;
            if (b.stat === 'speed') bonuses.speed += b.value;
            if (b.stat === 'saves') bonuses.saves += b.value;
            if (b.stat === 'checks') bonuses.checks += b.value;
            if (b.stat === 'spell_attack') bonuses.spellAttack += b.value;
            if (b.stat === 'spell_dc') bonuses.spellDC += b.value;
        });

        if (item.effect?.type === 'buff') {
            const { stat, value } = item.effect;
            if (value === 'resistance' && stat) bonuses.resistances.push(stat);
            else if (value === 'immunity' && stat) bonuses.immunities.push(stat);
            else {
                const val = parseInt(value || '0', 10);
                if (!isNaN(val)) {
                    if (stat === 'ac') bonuses.ac += val;
                    if (stat === 'initiative') bonuses.initiative += val;
                    if (stat === 'speed') bonuses.speed += val;
                    if (stat === 'saves') bonuses.saves += val;
                    if (stat === 'checks') bonuses.checks += val;
                    if (stat === 'spell_dc') bonuses.spellDC += val;
                    if (stat === 'spell_attack') bonuses.spellAttack += val;
                }
            }
        }
    });

    token.statusEffects?.forEach(effect => {
        if (effect.id === 'ac_bonus' && effect.value) bonuses.ac += effect.value;
        if (effect.id === 'speed_bonus' && effect.value) bonuses.speed += effect.value;
        if (effect.id === 'shield') bonuses.ac += 5;
        if (effect.id === 'shield_of_faith') bonuses.ac += 2;
        if (effect.id === 'haste') bonuses.ac += 2;
    });

    if (token.feats?.includes('Alert')) bonuses.initiative += 5;
    
    if (token.feats?.includes('Defense') || token.traits?.some(t => t.includes('Fighting Style: Defense'))) {
        const wearingArmor = token.inventory?.some(i => i.type === 'armor' && i.equipped && (i as any).armorCategory !== 'Shield');
        if (wearingArmor) bonuses.ac += 1;
    }

    if (token.class === 'Monk' && level >= 2) {
        const monkSpeed = Math.floor((level + 2) / 4) * 5 + 5; 
        bonuses.speed += monkSpeed;
    }
    if (token.class === 'Barbarian' && level >= 5) {
        const wearingHeavy = token.inventory?.some(i => i.type === 'armor' && i.equipped && (i as any).armorCategory === 'Heavy');
        if (!wearingHeavy) bonuses.speed += 10;
    }

    let finalAC = 10 + dexMod;

    if (token.monsterData) {
        finalAC = token.monsterData.ac + bonuses.ac;
    } else {
        const armor = token.inventory?.find(i => i.type === 'armor' && i.equipped && (i as any).armorCategory !== 'Shield') as any;
        const shield = token.inventory?.find(i => i.type === 'armor' && i.equipped && (i as any).armorCategory === 'Shield') as any;
        
        const shieldBonus = shield ? (shield.baseAC || 2) : 0;

        if (armor) {
            let baseVal = armor.baseAC || 11;
            if (armor.armorCategory === 'Light') baseVal += dexMod;
            else if (armor.armorCategory === 'Medium') baseVal += Math.min(2, dexMod);
            finalAC = baseVal;
        } else {
            let options = [10 + dexMod];
            if (token.class === 'Barbarian') options.push(10 + dexMod + getModifier(stats.con));
            if (token.class === 'Monk' && !shield) options.push(10 + dexMod + getModifier(stats.wis));
            if (token.subclass === 'Draconic Bloodline') options.push(13 + dexMod);
            if (hasStatus(token, 'mage_armor')) options.push(13 + dexMod);
            const natArmor = token.traits?.find(t => t.includes('Natural Armor'));
            if (natArmor) {
                const match = natArmor.match(/(\d+)/);
                if (match) options.push(parseInt(match[1]) + dexMod);
            }
            finalAC = Math.max(...options);
        }
        finalAC += shieldBonus;
        finalAC += bonuses.ac;
    }

    let speed = token.monsterData ? Math.floor(token.monsterData.speed / 5) : (token.speed || 6);
    if (speed > 20) speed = Math.floor(speed / 5);

    const heavyArmor = token.inventory?.find(i => i.type === 'armor' && i.equipped && (i as any).armorCategory === 'Heavy') as any;
    if (heavyArmor && heavyArmor.strReq && stats.str < heavyArmor.strReq) {
        speed = Math.max(1, speed - 2);
    }

    speed += Math.floor(bonuses.speed / 5);

    if (hasStatus(token, 'haste')) speed *= 2;
    if (hasStatus(token, 'dash')) speed *= 2;
    if (hasStatus(token, 'slowed')) speed = Math.max(0, Math.floor(speed / 2));
    if (hasStatus(token, 'ray_of_frost')) speed = Math.max(0, speed - 2);
    
    const exhaustion = getStatusValue(token, 'exhaustion') || 0;
    if (exhaustion >= 2) speed = Math.floor(speed / 2);
    if (exhaustion >= 5) speed = 0;

    if (hasStatus(token, 'grappled') || hasStatus(token, 'restrained') || hasStatus(token, 'stunned') || hasStatus(token, 'paralyzed') || hasStatus(token, 'petrified') || hasStatus(token, 'unconscious')) {
        speed = 0;
    }

    let spellAttackBonus = 0;
    let spellSaveDC = 0;
    if (spellAbility) {
        const abilityScore = stats[spellAbility] || 10;
        const mod = getModifier(abilityScore);
        spellAttackBonus = prof + mod + bonuses.spellAttack;
        spellSaveDC = 8 + prof + mod + bonuses.spellDC;
        
        if (hasStatus(token, 'innate_sorcery')) spellSaveDC += 1;
        if (exhaustion >= 3) spellAttackBonus -= 5;

        if (token.monsterData?.spellcasting?.saveDC) {
            spellSaveDC = token.monsterData.spellcasting.saveDC;
        }
        if (token.monsterData?.spellcasting?.attackBonus) {
            spellAttackBonus = token.monsterData.spellcasting.attackBonus;
        }
    }

    let globalSaveBonus = bonuses.saves;
    let globalCheckBonus = bonuses.checks;
    if (exhaustion >= 1) globalCheckBonus -= 5; 
    if (exhaustion >= 3) globalSaveBonus -= 5; 

    const damageResistances = [...new Set([...(token.damageResistances || []), ...bonuses.resistances])];
    const damageImmunities = [...new Set([...(token.damageImmunities || []), ...bonuses.immunities])];
    const conditionImmunities = [...new Set([...(token.conditionImmunities || []), ...bonuses.conditionImmunities])];
    
    return {
        ...token,
        stats,
        ac: Math.floor(finalAC),
        speed: Math.floor(speed),
        spellAttackBonus,
        spellSaveDC,
        globalSaveBonus,
        globalCheckBonus,
        damageResistances,
        damageImmunities,
        conditionImmunities,
        knownSpells,
        spellSlots,
        spellAbility
    };
};

export const calculateAttack = (attacker: Actor, target: Actor, context: { round: number } = { round: 1 }) => {
    const stats = attacker.stats || DEFAULT_STATS;
    const strMod = getModifier(stats.str);
    const dexMod = getModifier(stats.dex);
    const dist = getDistance(attacker, target);
    
    let mod = strMod;

    const weapon = attacker.inventory?.find(i => i.equipped && i.type === 'weapon') as any;
    
    const isRanged = weapon?.range || weapon?.name.toLowerCase().includes('bow') || weapon?.name.toLowerCase().includes('crossbow');
    const isFinesse = weapon?.properties?.includes('Finesse');
    
    if (isRanged) mod = dexMod;
    if (isFinesse) mod = Math.max(strMod, dexMod);
    if (attacker.class === 'Monk' && (!weapon || weapon.category === 'Simple' || weapon.name === 'Shortsword')) {
        mod = Math.max(strMod, dexMod);
    }
    
    if (hasStatus(attacker, 'shillelagh') && attacker.spellAbility) {
         const spellMod = getModifier(stats[attacker.spellAbility] || 10);
         if (spellMod > mod) mod = spellMod;
    }
    
    if (weapon?.effect?.stat === 'attack_damage') {
         const val = parseInt(weapon.effect.value || '0', 10);
         if (!isNaN(val)) mod += val;
    }

    mod += getProficiencyBonus(attacker.level || 1);
    
    if (attacker.feats?.includes('Archery') || attacker.traits?.some(t => t.includes('Fighting Style: Archery'))) {
        if (isRanged) mod += 2;
    }

    if (hasStatus(attacker, 'bless')) mod += rollDie(4);
    if (hasStatus(attacker, 'bane')) mod -= rollDie(4);
    
    const exhaustion = getStatusValue(attacker, 'exhaustion') || 0;
    if (exhaustion > 0) {
        mod -= (exhaustion * 2);
    }
    
    const r1 = rollDie(20);
    const r2 = rollDie(20);
    let rollType: 'normal' | 'advantage' | 'disadvantage' = 'normal';
    let finalRoll = r1;
    
    let adv = false;
    let dis = false;

    if (hasStatus(attacker, 'invisible') || 
        hasStatus(target, 'blinded') || 
        hasStatus(target, 'stunned') || 
        hasStatus(target, 'paralyzed') || 
        hasStatus(target, 'restrained') || 
        hasStatus(target, 'petrified') ||
        hasStatus(target, 'unconscious') || 
        hasStatus(target, 'faerie_fire') || 
        hasStatus(attacker, 'reckless') || 
        hasStatus(target, 'glittering') ||
        hasStatus(attacker, 'true_strike') ||
        hasStatus(target, 'distracted') ||
        hasStatus(attacker, 'innate_sorcery') ||
        hasStatus(attacker, 'heroic_inspiration')) {
        adv = true;
    }

    if (target.feats?.includes('Alert') && hasStatus(attacker, 'invisible')) {
        const targetIncapacitated = hasStatus(target, 'stunned') || hasStatus(target, 'paralyzed') || hasStatus(target, 'unconscious') || hasStatus(target, 'petrified');
        if (!targetIncapacitated && !hasStatus(target, 'blinded') && !hasStatus(target, 'restrained') && !hasStatus(target, 'faerie_fire') && !hasStatus(attacker, 'reckless')) {
             adv = false;
             if (hasStatus(target, 'blinded') || hasStatus(target, 'stunned') || hasStatus(target, 'paralyzed') || hasStatus(target, 'restrained') || hasStatus(target, 'petrified') || hasStatus(target, 'unconscious') || hasStatus(target, 'faerie_fire') || hasStatus(attacker, 'reckless') || hasStatus(target, 'glittering') || hasStatus(attacker, 'true_strike') || hasStatus(target, 'distracted') || hasStatus(attacker, 'innate_sorcery') || hasStatus(attacker, 'heroic_inspiration')) {
                 adv = true;
             }
        }
    }

    const grappledByAttacker = hasStatus(target, 'grappled') && target.statusEffects?.find(e => e.id === 'grappled')?.sourceId === attacker.id;
    if (attacker.feats?.includes('Grappler') && grappledByAttacker) {
        adv = true;
    }

    if (hasStatus(target, `vexed_by_${attacker.id}`)) {
        adv = true;
    }
    
    if (hasStatus(target, 'prone')) {
        if (dist <= 1) adv = true;
        else dis = true; 
    }

    const targetIncapacitated = hasStatus(target, 'stunned') || hasStatus(target, 'paralyzed') || hasStatus(target, 'unconscious') || hasStatus(target, 'petrified');
    const canDodge = hasStatus(target, 'dodge') && !targetIncapacitated && (target.speed || 0) > 0;

    if (hasStatus(attacker, 'prone') || 
        hasStatus(attacker, 'blinded') || 
        hasStatus(attacker, 'frightened') || 
        hasStatus(attacker, 'poisoned') || 
        hasStatus(attacker, 'restrained') ||
        hasStatus(target, 'invisible') || 
        canDodge ||
        hasStatus(attacker, 'sapped')) {
        dis = true;
    }

    if (isRanged && dist <= 1) dis = true;

    if (adv && !dis) {
        rollType = 'advantage';
        finalRoll = Math.max(r1, r2);
    } else if (dis && !adv) {
        rollType = 'disadvantage';
        finalRoll = Math.min(r1, r2);
    }
    
    let total = finalRoll + mod;
    const critThreshold = attacker.critThreshold || 20;
    let isCrit = finalRoll >= critThreshold;
    const isFumble = finalRoll === 1;
    
    let targetAc = target.ac || 10;
    const isHit = !isFumble && (isCrit || total >= targetAc);

    if (isHit && dist <= 1 && (hasStatus(target, 'paralyzed') || hasStatus(target, 'unconscious'))) {
        isCrit = true;
    }

    return { roll: finalRoll, rollType, rolls: [r1, r2], modifier: mod, total, isCrit, isFumble, isHit };
};

// Add missing exports
export const getSpellSlots = (className: string, level: number): Record<string, { current: number, max: number }> => {
    const slots: Record<string, { current: number, max: number }> = {};
    const table = SPELL_SLOT_TABLE[level] || [];
    
    if (className === 'Warlock') {
        let slotLevel = 1;
        if (level >= 3) slotLevel = 2;
        if (level >= 5) slotLevel = 3;
        if (level >= 7) slotLevel = 4;
        if (level >= 9) slotLevel = 5;
        
        let slotCount = 1;
        if (level >= 2) slotCount = 2;
        if (level >= 11) slotCount = 3;
        if (level >= 17) slotCount = 4;
        
        slots[slotLevel.toString()] = { current: slotCount, max: slotCount };
        return slots;
    }

    table.forEach((count, index) => {
        if (count > 0) {
            slots[(index + 1).toString()] = { current: count, max: count };
        }
    });
    return slots;
};

export const getAoECells = (origin: {x: number, y: number}, target: {x: number, y: number}, shape: AreaShape, size: number, gridSize: GridSize): {x: number, y: number}[] => {
    const cells: {x: number, y: number}[] = [];
    const radius = Math.ceil(size / 5);
    
    for (let y = 0; y < gridSize.rows; y++) {
        for (let x = 0; x < gridSize.cols; x++) {
            if (shape === 'sphere' || shape === 'cylinder') {
                const d = Math.sqrt(Math.pow(x - target.x, 2) + Math.pow(y - target.y, 2));
                if (d <= radius) cells.push({x, y});
            } else if (shape === 'cube') {
                if (Math.abs(x - target.x) <= radius && Math.abs(y - target.y) <= radius) {
                    cells.push({x, y});
                }
            } else if (shape === 'cone') {
                const dx = target.x - origin.x;
                const dy = target.y - origin.y;
                const angle = Math.atan2(dy, dx);
                const cellDx = x - origin.x;
                const cellDy = y - origin.y;
                const cellDist = Math.sqrt(cellDx*cellDx + cellDy*cellDy);
                const cellAngle = Math.atan2(cellDy, cellDx);
                let angleDiff = cellAngle - angle;
                while (angleDiff <= -Math.PI) angleDiff += 2*Math.PI;
                while (angleDiff > Math.PI) angleDiff -= 2*Math.PI;
                if (cellDist <= radius && Math.abs(angleDiff) < Math.PI / 4) {
                    cells.push({x, y});
                }
            } else if (shape === 'line') {
                const x1 = origin.x;
                const y1 = origin.y;
                const x2 = target.x;
                const y2 = target.y;
                const A = x - x1;
                const B = y - y1;
                const C = x2 - x1;
                const D = y2 - y1;
                const dot = A * C + B * D;
                const len_sq = C * C + D * D;
                let param = -1;
                if (len_sq !== 0) param = dot / len_sq;
                let xx, yy;
                if (param < 0) { xx = x1; yy = y1; }
                else if (param > 1) { xx = x2; yy = y2; }
                else { xx = x1 + param * C; yy = y1 + param * D; }
                const dx = x - xx;
                const dy = y - yy;
                const distToLine = Math.sqrt(dx * dx + dy * dy);
                const dist = Math.sqrt(Math.pow(x - origin.x, 2) + Math.pow(y - origin.y, 2));
                if (distToLine <= 0.5 && dist <= radius) {
                    cells.push({x, y});
                }
            }
        }
    }
    return cells;
};

export const processTurnStart = (token: Token, allTokens: Token[]): { updatedToken: Token, logs: string[] } => {
    const logs: string[] = [];
    if (!isActor(token)) return { updatedToken: token, logs };
    
    let actor = { ...token } as Actor;
    
    if (actor.statusEffects) {
        const nextEffects = [];
        for (const eff of actor.statusEffects) {
            if (eff.duration !== 999) eff.duration -= 1;
            if (eff.duration > 0) nextEffects.push(eff);
            else logs.push(`${actor.name} is no longer ${eff.id.replace(/_/g, ' ')}.`);
            if (eff.id === 'burning') {
                const dmg = rollDie(6);
                actor = applyDamageToToken(actor, dmg, 'fire', false) as Actor;
                logs.push(`${actor.name} takes ${dmg} fire damage from burning.`);
            }
        }
        actor.statusEffects = nextEffects;
    }
    
    if (actor.monsterData?.traits?.some(t => t.name === 'Regeneration')) {
        if ((actor.hp || 0) > 0 && (actor.hp || 0) < (actor.maxHp || 0)) {
            const regenAmount = 10;
            actor.hp = Math.min(actor.maxHp || 0, (actor.hp || 0) + regenAmount);
            logs.push(`${actor.name} regenerates ${regenAmount} HP.`);
        }
    }
    
    return { updatedToken: calculateTokenStats(actor), logs };
};

export const resolveTerrainHazard = (token: Actor, allTokens: Token[]): { token: Actor, logs: string[], damageTaken: number } => {
    const logs: string[] = [];
    let damageTaken = 0;
    let currentToken = { ...token };

    const hazards = allTokens.filter(t => 
        t.type === TokenType.OBJECT && 
        t.drawingData.type === 'terrain' && 
        t.drawingData.terrainType === 'hazard' && 
        t.x === currentToken.x && t.y === currentToken.y
    );

    for (const hazard of hazards) {
        const mechanics = hazard.drawingData.mechanics;
        if (mechanics) {
            if (mechanics.damageDice) {
                const dmg = parseDiceString(mechanics.damageDice);
                let finalDmg = dmg;
                if (mechanics.saveDC && mechanics.saveAbility) {
                    const saveMod = getModifier(currentToken.stats[mechanics.saveAbility] || 10);
                    const roll = rollDie(20);
                    const total = roll + saveMod + (currentToken.savingThrowProficiencies?.includes(mechanics.saveAbility) ? getProficiencyBonus(currentToken.level) : 0);
                    if (total >= mechanics.saveDC) {
                        if (mechanics.saveEffect === 'half') finalDmg = Math.floor(dmg / 2);
                        else finalDmg = 0;
                        logs.push(`${currentToken.name} saved vs Hazard (${total} >= ${mechanics.saveDC}).`);
                    } else {
                        logs.push(`${currentToken.name} failed save vs Hazard (${total} < ${mechanics.saveDC}).`);
                    }
                }
                if (finalDmg > 0) {
                    currentToken = applyDamageToToken(currentToken, finalDmg, mechanics.damageType || 'force', false) as Actor;
                    damageTaken += finalDmg;
                    logs.push(`${currentToken.name} takes ${finalDmg} ${mechanics.damageType} damage from ${hazard.name || 'hazard'}.`);
                }
            }
            if (mechanics.applyStatusId) {
                let apply = true;
                if (mechanics.saveDC && mechanics.saveAbility) {
                     const saveMod = getModifier(currentToken.stats[mechanics.saveAbility] || 10);
                     const roll = rollDie(20);
                     const total = roll + saveMod + (currentToken.savingThrowProficiencies?.includes(mechanics.saveAbility) ? getProficiencyBonus(currentToken.level) : 0);
                     if (total >= mechanics.saveDC) apply = false;
                }
                if (apply && !hasStatus(currentToken, mechanics.applyStatusId)) {
                    const effects = [...(currentToken.statusEffects || []), { id: mechanics.applyStatusId, duration: mechanics.statusDuration || 1 }];
                    currentToken = calculateTokenStats({ ...currentToken, statusEffects: effects }) as Actor;
                    logs.push(`${currentToken.name} is affected by ${mechanics.applyStatusId}.`);
                }
            }
        }
    }
    return { token: currentToken, logs, damageTaken };
};

export const applyDamageToToken = (token: Actor, amount: number, type: string = 'slashing', isCrit: boolean = false, ignoreResistance: boolean = false): Actor => {
    let damage = amount;
    if (!ignoreResistance) {
        if (token.damageImmunities?.includes(type.toLowerCase())) damage = 0;
        else if (token.damageResistances?.includes(type.toLowerCase())) damage = Math.floor(damage / 2);
        else if (token.damageVulnerabilities?.includes(type.toLowerCase())) damage = damage * 2;
    }
    
    if (token.tempHp && token.tempHp > 0) {
        if (token.tempHp >= damage) {
            token.tempHp -= damage;
            damage = 0;
        } else {
            damage -= token.tempHp;
            token.tempHp = 0;
        }
    }
    
    token.hp = Math.max(0, (token.hp || 0) - damage);
    
    if (hasStatus(token, 'concentrating') && damage > 0) {
        const dc = Math.max(10, Math.floor(damage / 2));
        const conMod = getModifier(token.stats.con);
        const prof = token.savingThrowProficiencies?.includes('con') ? getProficiencyBonus(token.level) : 0;
        const save = rollDie(20) + conMod + prof + (token.feats?.includes('War Caster') ? 5 : 0);
        if (save < dc) {
            token.statusEffects = token.statusEffects?.filter(e => e.id !== 'concentrating');
        }
    }
    return token;
};

export const calculateDamage = (attacker: Actor, target: Actor, isCrit: boolean): { damage: number, type: string, ignoreResistance: boolean } => {
    let damage = 0;
    let type = 'bludgeoning';
    const strMod = getModifier(attacker.stats.str);
    damage = 1 + strMod;
    
    const weapon = attacker.inventory?.find(i => i.equipped && i.type === 'weapon') as any;
    if (weapon) {
        const dice = weapon.damage?.dice || '1d4';
        type = weapon.damage?.type || 'bludgeoning';
        const isFinesse = weapon.properties?.includes('Finesse');
        const isRanged = weapon.range || weapon.name.toLowerCase().includes('bow');
        const dexMod = getModifier(attacker.stats.dex);
        const mod = (isRanged || (isFinesse && dexMod > strMod)) ? dexMod : strMod;
        damage = parseDiceString(dice) + mod;
        if (isCrit) damage += parseDiceString(dice);
        
        if (weapon.effect?.stat === 'attack_damage') damage += parseInt(weapon.effect.value || '0');
        if (hasStatus(attacker, 'rage') && !isRanged && !isFinesse) damage += 2;
        if (hasStatus(attacker, 'enlarged')) damage += rollDie(4);
        if (hasStatus(attacker, 'hexed')) damage += rollDie(6);
    } else if (attacker.monsterData) {
        const action = attacker.monsterData.actions.find(a => a.type === 'melee' || a.type === 'ranged');
        if (action && action.damage) {
            damage = parseDiceString(action.damage);
            if (isCrit) damage += parseDiceString(action.damage.split('+')[0]);
            type = action.damageType || 'bludgeoning';
        }
    }
    return { damage, type, ignoreResistance: false };
};

export const calculateUnarmedStrikeDC = (actor: Actor): number => {
    const strMod = getModifier(actor.stats.str);
    const prof = getProficiencyBonus(actor.level);
    return 8 + strMod + prof;
};

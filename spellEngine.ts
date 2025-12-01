
import { Token, SRDSpell, FloatingText, SpellDamage, Actor } from '../types';
import { rollDie, parseDiceString, getModifier, applyDamageToToken, getProficiencyBonus, hasStatus, canHeal, calculateDamage } from './gameLogic';
import { SRD_CLASSES } from '../data/srd';

export interface SpellResult {
    caster: Actor;
    targets: Actor[];
    logs: string[];
    floatingTexts: FloatingText[];
}

export const calculateSpellDC = (token: Actor): number => {
    const ability = token.spellAbility || 'int';
    const score = token.stats[ability] || 10;
    const mod = getModifier(score);
    const prof = getProficiencyBonus(token.level || 1);
    return 8 + prof + mod + (token.spellSaveDC ? token.spellSaveDC - (8 + prof + mod) : 0); 
};

export const calculateSpellAttackMod = (token: Actor): number => {
    const ability = token.spellAbility || 'int';
    const score = token.stats[ability] || 10;
    const mod = getModifier(score);
    const prof = getProficiencyBonus(token.level || 1);
    return prof + mod + (token.spellAttackBonus ? token.spellAttackBonus - (prof + mod) : 0);
};

export const getScaledDamage = (damage: SpellDamage, casterLevel: number, spellBaseLevel: number, castLevel: number): string => {
    const formula = damage.diceExpression;
    
    // Cantrip Scaling (based on Character Level tiers: 1, 5, 11, 17)
    if (spellBaseLevel === 0) {
        const match = formula.match(/(\d+)d(\d+)(.*)/);
        if (!match) return formula;
        const numDice = parseInt(match[1]);
        const sides = parseInt(match[2]);
        const extra = match[3] || '';

        let multiplier = 1;
        if (casterLevel >= 5) multiplier = 2;
        if (casterLevel >= 11) multiplier = 3;
        if (casterLevel >= 17) multiplier = 4;

        return `${numDice * multiplier}d${sides}${extra}`;
    }

    // Leveled Spell Scaling (based on Slot Level)
    if (castLevel > spellBaseLevel) {
        const levelsAbove = castLevel - spellBaseLevel;
        
        if (damage.scalingDice) {
             const match = damage.scalingDice.match(/(\d+)d(\d+)/);
             if (match) {
                 const scaleNum = parseInt(match[1]);
                 const scaleSides = parseInt(match[2]);
                 
                 const baseMatch = formula.match(/(\d+)d(\d+)(.*)/);
                 if (baseMatch) {
                    const baseNum = parseInt(baseMatch[1]);
                    const baseSides = parseInt(baseMatch[2]);
                    const extra = baseMatch[3] || '';
                    
                    if (baseSides === scaleSides) {
                        return `${baseNum + (levelsAbove * scaleNum)}d${baseSides}${extra}`;
                    } else {
                        return `${formula} + ${levelsAbove * scaleNum}d${scaleSides}`;
                    }
                 }
             }
        } 
        else {
             const match = formula.match(/(\d+)d(\d+)(.*)/);
             if (match) {
                 const baseNum = parseInt(match[1]);
                 const sides = parseInt(match[2]);
                 const extra = match[3] || '';
                 return `${baseNum + levelsAbove}d${sides}${extra}`;
             }
        }
    }

    return formula;
};

const parseDuration = (dur: string): number => {
    const d = dur.toLowerCase();
    if (d.includes('instant')) return 0;
    if (d.includes('1 round') || d.includes('end of your next turn')) return 1;
    if (d.includes('1 minute')) return 10;
    if (d.includes('10 minutes')) return 100;
    if (d.includes('1 hour')) return 600;
    if (d.includes('8 hour')) return 4800;
    if (d.includes('24 hour')) return 14400;
    return 3; 
};

const getBeamCount = (spell: SRDSpell, casterLevel: number, castLevel: number): number => {
    if (spell.name === 'Eldritch Blast') {
        let count = 1;
        if (casterLevel >= 5) count++;
        if (casterLevel >= 11) count++;
        if (casterLevel >= 17) count++;
        return count;
    }
    if (spell.name === 'Scorching Ray') {
        return 3 + (castLevel > 2 ? castLevel - 2 : 0);
    }
    if (spell.name === 'Magic Missile') {
        return 3 + (castLevel > 1 ? castLevel - 1 : 0);
    }
    return 1;
};

export const resolveSpell = (
    spell: SRDSpell, 
    caster: Actor, 
    target: Actor, 
    castLevel: number = spell.level, 
    itemSourceId?: string | null, 
    skipResourceConsumption: boolean = false
): SpellResult => {
    let finalCaster = { ...caster };
    let finalTarget = { ...target };
    const logs: string[] = [];
    const floatingTexts: FloatingText[] = [];

    const spellDC = calculateSpellDC(caster);
    const attackMod = calculateSpellAttackMod(caster);
    const level = caster.level || 1;
    const duration = parseDuration(spell.duration);
    
    const beamCount = getBeamCount(spell, level, castLevel); 
    let canCast = true;

    // --- RESOURCE CONSUMPTION ---
    if (!skipResourceConsumption) {
        if (itemSourceId) {
            const inventory = [...(finalCaster.inventory || [])];
            const itemIndex = inventory.findIndex(i => i.id === itemSourceId);
            if (itemIndex > -1) {
                const item = inventory[itemIndex];
                const spellCost = item.spells?.find(s => s.name === spell.name)?.cost || 0;
                
                if (item.charges && item.charges.current >= spellCost) {
                    const newCharges = { ...item.charges, current: item.charges.current - spellCost };
                    inventory[itemIndex] = { ...item, charges: newCharges };
                    finalCaster.inventory = inventory;
                    logs.push(`Used ${spellCost} charge(s) from ${item.name}. (${newCharges.current} remaining)`);
                } else {
                     logs.push(`Failed to cast: Not enough charges in ${item.name}.`);
                     floatingTexts.push({ id: Math.random().toString(), x: caster.x, y: caster.y, text: "NO CHARGES", color: '#ef4444', type: 'miss' });
                     canCast = false;
                }
            }
        } 
        else if (spell.level > 0) {
            let hasSlot = false;
            if (finalCaster.class === 'Warlock') {
                 const slots = finalCaster.spellSlots || {};
                 const slotKey = Object.keys(slots).find(k => slots[k].current > 0);
                 if (slotKey && slots[slotKey]) {
                     slots[slotKey] = { ...slots[slotKey], current: slots[slotKey].current - 1 };
                     finalCaster.spellSlots = { ...slots };
                     logs.push(`Expended Pact Magic slot.`);
                     hasSlot = true;
                 }
            } else {
                 const slots = finalCaster.spellSlots || {};
                 const slotKey = castLevel.toString();
                 if (slots[slotKey] && slots[slotKey].current > 0) {
                     slots[slotKey] = { ...slots[slotKey], current: slots[slotKey].current - 1 };
                     finalCaster.spellSlots = { ...slots };
                     logs.push(`Expended Level ${castLevel} spell slot.`);
                     hasSlot = true;
                 }
            }

            if (!hasSlot) {
                logs.push(`Failed to cast ${spell.name}: No spell slots available.`);
                floatingTexts.push({ id: Math.random().toString(), x: caster.x, y: caster.y, text: "NO SLOTS", color: '#ef4444', type: 'miss' });
                canCast = false;
            }
        }
    }

    if (!canCast) {
        return { caster: finalCaster, targets: [finalTarget], logs, floatingTexts };
    }

    const isEmpowered = hasStatus(caster, 'metamagic_empowered_spell');
    const isHeightened = hasStatus(caster, 'metamagic_heightened_spell');
    const isCareful = hasStatus(caster, 'metamagic_careful_spell');

    if (!skipResourceConsumption) {
        logs.push(`${caster.name} casts ${spell.name}${beamCount > 1 ? ` (${beamCount} beams)` : ''}${castLevel > spell.level ? ` (Lv ${castLevel})` : ''}.`);
    }

    let damageBonus = 0;
    if (spell.school === 'Evocation' && caster.class === 'Wizard' && caster.subclass === 'School of Evocation' && (caster.level || 1) >= 10) {
         const intMod = getModifier(caster.stats.int);
         damageBonus += intMod; 
    }
    if (spell.level === 0 && caster.class === 'Cleric' && caster.subclass === 'Light Domain' && (caster.level || 1) >= 8) {
        const wisMod = getModifier(caster.stats.wis);
        damageBonus += wisMod;
    }
    if (caster.class === 'Sorcerer' && caster.subclass === 'Draconic Bloodline' && (caster.level || 1) >= 6) {
         if (['fire', 'cold', 'lightning', 'acid', 'poison'].includes(spell.damage?.damageType || '')) {
             damageBonus += getModifier(caster.stats.cha);
         }
    }

    // --- CONCENTRATION LOGIC ---
    if (spell.concentration && !skipResourceConsumption) {
        const effects = finalCaster.statusEffects || [];
        const isConcentrating = effects.some(e => e.id === 'concentrating');
        
        if (isConcentrating) {
             logs.push(`${caster.name} ends concentration on previous spell.`);
        }
        
        const newEffects = effects.filter(e => e.id !== 'concentrating');
        newEffects.push({ id: 'concentrating', duration: Math.max(duration, 10) });
        finalCaster.statusEffects = newEffects;
    }

    // Guidance Logic
    if (spell.name === 'Guidance') {
        const bonus = rollDie(4);
        const effects = [...(finalTarget.statusEffects || [])].filter(e => e.id !== 'guidance');
        effects.push({ id: 'guidance', duration, value: bonus });
        finalTarget.statusEffects = effects;
        
        logs.push(`Guidance: +${bonus} to next ability check for ${finalTarget.name}.`);
        floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: `+${bonus} GUIDE`, color: '#fbbf24', type: 'info' });
        
        return { caster: finalCaster, targets: [finalTarget], logs, floatingTexts };
    }

    // Power Word Kill
    if (spell.name === 'Power Word Kill') {
        const hp = finalTarget.hp || 0;
        if (hp <= 100) {
            finalTarget.hp = 0;
            logs.push(`${finalTarget.name} succumbs to the Power Word! (Instant Death)`);
            floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: "DEATH", color: '#ef4444', type: 'crit' });
        } else {
            logs.push(`${finalTarget.name} resists the Power Word (HP > 100).`);
            floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: "RESIST", color: '#9ca3af', type: 'miss' });
        }
        return { caster: finalCaster, targets: [finalTarget], logs, floatingTexts };
    }

    // Power Word Stun
    if (spell.name === 'Power Word Stun') {
        const hp = finalTarget.hp || 0;
        if (hp <= 150) {
            const effects = finalTarget.statusEffects || [];
            if (!effects.some(e => e.id === 'stunned')) {
                effects.push({ id: 'stunned', duration: 999 }); 
                finalTarget.statusEffects = effects;
            }
            logs.push(`${finalTarget.name} is stunned by the Power Word!`);
            floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: "STUNNED", color: '#fcd34d', type: 'info' });
        } else {
            logs.push(`${finalTarget.name} resists the Power Word (HP > 150).`);
            floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: "RESIST", color: '#9ca3af', type: 'miss' });
        }
        return { caster: finalCaster, targets: [finalTarget], logs, floatingTexts };
    }

    // --- ATTACK ROLLS ---
    if (spell.attackRoll) {
        for (let i = 0; i < beamCount; i++) {
            const d20 = rollDie(20);
            
            let finalRoll = d20;
            let rollType = 'normal';
            let adv = false;
            let dis = false;
            
            if (hasStatus(caster, 'invisible') || hasStatus(finalTarget, 'prone') || hasStatus(finalTarget, 'blinded') || hasStatus(finalTarget, 'faerie_fire') || hasStatus(caster, 'true_strike') || hasStatus(finalTarget, 'stunned') || hasStatus(finalTarget, 'paralyzed') || hasStatus(finalTarget, 'glittering')) {
                adv = true;
            }
            
            if (adv) {
                const r2 = rollDie(20);
                finalRoll = Math.max(d20, r2);
                rollType = 'advantage';
            }

            let total = finalRoll + attackMod;

            if (hasStatus(caster, 'bless')) {
                const bonus = rollDie(4);
                total += bonus;
                logs.push(`Bless adds +${bonus} to attack.`);
            }

            if (hasStatus(caster, 'true_strike')) {
                finalCaster.statusEffects = finalCaster.statusEffects?.filter(e => e.id !== 'true_strike');
            }
            if (hasStatus(finalTarget, 'glittering')) {
                 finalTarget.statusEffects = finalTarget.statusEffects?.filter(e => e.id !== 'glittering');
            }

            const isCrit = finalRoll === 20;
            const isFumble = finalRoll === 1;
            const targetAC = finalTarget.ac || 10;

            const hits = !isFumble && (isCrit || total >= targetAC);

            if (hits) {
                logs.push(`${beamCount > 1 ? `Beam ${i+1}: ` : ''}Hit! (${rollType === 'advantage' ? 'Adv ' : ''}${finalRoll}${attackMod ? `+${attackMod}` : ''} vs AC ${targetAC})`);
                if (spell.damage) {
                    let formula = spell.damage.diceExpression;
                    
                    if ((spell.level === 0 && beamCount === 1) || (spell.level > 0 && beamCount === 1)) {
                        formula = getScaledDamage(spell.damage, level, spell.level, castLevel);
                    }

                    let damage = parseDiceString(formula);
                    if (isCrit) damage += parseDiceString(formula); 
                    
                    // True Strike (2024): Add weapon damage
                    if (spell.tags.includes('weapon_attack')) {
                        const weaponDmg = calculateDamage(finalCaster, finalTarget, isCrit).damage;
                        damage += weaponDmg;
                        logs.push(`Weapon Damage added: +${weaponDmg}`);
                    }

                    if (isEmpowered) {
                        const empowerment = rollDie(4);
                        damage += empowerment;
                        logs.push(`Empowered Spell adds ${empowerment} damage.`);
                    }
                    
                    damage += damageBonus;
                    if (hasStatus(finalTarget, 'hexed')) { damage += rollDie(6); logs.push(`+1d6 Hex.`); }
                    if (hasStatus(finalTarget, 'marked')) { damage += rollDie(6); logs.push(`+1d6 Hunter's Mark.`); }

                    finalTarget = applyDamageToToken(finalTarget, damage, spell.damage.damageType) as Actor;
                    floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: `${damage}`, color: '#ef4444', type: 'damage' });
                    logs.push(`Dealt ${damage} ${spell.damage.damageType} damage.`);

                    if (spell.name === 'Vampiric Touch') {
                        if (canHeal(finalCaster)) {
                            const healAmount = Math.floor(damage / 2);
                            finalCaster.hp = Math.min(finalCaster.maxHp || 10, (finalCaster.hp || 0) + healAmount);
                            logs.push(`${caster.name} drains life! (+${healAmount} HP)`);
                            floatingTexts.push({ id: Math.random().toString(), x: caster.x, y: caster.y, text: `+${healAmount}`, color: '#4ade80', type: 'heal' });
                        }
                    }
                }
                
                if (spell.statusEffect) {
                    const effects = finalTarget.statusEffects || [];
                    if (!effects.some(e => e.id === spell.statusEffect)) {
                        effects.push({ id: spell.statusEffect!, duration });
                        finalTarget.statusEffects = effects;
                        floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: spell.statusEffect.toUpperCase(), color: '#a855f7', type: 'info' });
                        logs.push(`Applied status: ${spell.statusEffect}.`);
                    } else {
                        finalTarget.statusEffects = effects.map(e => e.id === spell.statusEffect ? { ...e, duration } : e);
                    }
                }

            } else {
                logs.push(`${beamCount > 1 ? `Beam ${i+1}: ` : ''}Miss. (${finalRoll}${attackMod ? `+${attackMod}` : ''} vs AC ${targetAC})`);
                floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: 'MISS', color: '#94a3b8', type: 'miss' });
            }
        }
    } 
    // --- SAVING THROWS ---
    else if (spell.savingThrow) {
        const attr = spell.savingThrow.ability.toLowerCase();
        const saveModRaw = getModifier(target.stats[attr as keyof typeof target.stats] || 10);
        
        const cls = SRD_CLASSES.find(c => c.name === target.class);
        const hasDiamondSoul = target.class === 'Monk' && (target.level || 1) >= 14;
        const isProficient = cls?.savingThrows?.includes(attr) || hasDiamondSoul;
        const profBonus = getProficiencyBonus(target.level || 1);
        const totalSaveMod = saveModRaw + (isProficient ? profBonus : 0);
        
        let d20 = rollDie(20);
        let saved = false;
        let rollType = 'normal';

        // --- Auto-Fail Conditions ---
        if ((attr === 'str' || attr === 'dex') && 
           (hasStatus(finalTarget, 'stunned') || hasStatus(finalTarget, 'paralyzed') || hasStatus(finalTarget, 'unconscious') || hasStatus(finalTarget, 'petrified'))) {
             saved = false;
             logs.push(`${finalTarget.name} auto-fails ${attr.toUpperCase()} save (Incapacitated).`);
             rollType = 'auto-fail';
        } else {
            // --- Advantage/Disadvantage ---
            let adv = false;
            let dis = false;

            if (isHeightened) dis = true;
            if (attr === 'dex' && hasStatus(finalTarget, 'restrained')) dis = true;
            if (attr === 'dex' && hasStatus(finalTarget, 'dodge')) adv = true;

            if (adv && !dis) {
                const r2 = rollDie(20);
                d20 = Math.max(d20, r2);
                rollType = 'advantage';
            } else if (dis && !adv) {
                const r2 = rollDie(20);
                d20 = Math.min(d20, r2);
                rollType = 'disadvantage';
            }

            let saveTotal = d20 + totalSaveMod;

            if (hasStatus(finalTarget, 'resistance') || hasStatus(finalTarget, 'bless')) {
                const bonus = rollDie(4);
                saveTotal += bonus;
                if (hasStatus(finalTarget, 'resistance')) {
                    logs.push(`Resistance adds +${bonus} to save.`);
                    finalTarget.statusEffects = finalTarget.statusEffects?.filter(e => e.id !== 'resistance');
                }
            }
            
            saved = saveTotal >= spellDC;
            
            if (isCareful && finalTarget.type !== 'ENEMY') {
                saved = true;
                logs.push('Careful Spell protects target (Auto-Save).');
            }

            logs.push(`${target.name} ${attr.toUpperCase()} Save: ${saveTotal} (${rollType !== 'normal' ? rollType + ' ' : ''}d20[${d20}]+${totalSaveMod}) vs DC ${spellDC} -> ${saved ? 'Success' : 'Fail'}`);
        }

        if (spell.damage) {
            let formula = getScaledDamage(spell.damage, level, spell.level, castLevel);
            let damage = parseDiceString(formula);
            
            if (isEmpowered) {
                const empowerment = rollDie(4); 
                damage += empowerment;
                logs.push(`Empowered Spell adds ${empowerment} damage.`);
            }

            const hasEvasion = (finalTarget.class === 'Rogue' || finalTarget.class === 'Monk') && (finalTarget.level || 1) >= 7 && attr === 'dex';
            
            if (saved) {
                if (spell.level === 0) {
                    damage = 0;
                    logs.push('Cantrip saved: No damage.');
                } else {
                    damage = hasEvasion ? 0 : Math.floor(damage / 2);
                    logs.push(hasEvasion ? 'Evasion: No damage.' : 'Saved: Half damage.');
                }
            } else {
                if (hasEvasion) {
                    damage = Math.floor(damage / 2);
                    logs.push('Evasion: Half damage on fail.');
                }
            }
            
            if (damage > 0) {
                damage += damageBonus;
                finalTarget = applyDamageToToken(finalTarget, damage, spell.damage.damageType) as Actor;
                floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: `${damage}`, color: '#ef4444', type: 'damage' });
                logs.push(`Dealt ${damage} ${spell.damage.damageType} damage.`);

                if (spell.name === 'Disintegrate' && (finalTarget.hp || 0) === 0) {
                    logs.push(`${finalTarget.name} is disintegrated into dust!`);
                    floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: "DUSTED", color: '#525252', type: 'crit' });
                }
            }
        }
        
        if (spell.statusEffect && !saved) {
             const effects = finalTarget.statusEffects || [];
             if (!effects.some(e => e.id === spell.statusEffect)) {
                 effects.push({ id: spell.statusEffect!, duration });
                 finalTarget.statusEffects = effects;
                 floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: spell.statusEffect.toUpperCase(), color: '#a855f7', type: 'info' });
                 logs.push(`Applied status: ${spell.statusEffect}.`);
             }
        }
    }
    // --- AUTO HIT (Magic Missile) ---
    else if (spell.tags.includes('auto_hit') && spell.damage) {
        const darts = beamCount;
        let damage = 0;
        
        if (castLevel === spell.level) {
             damage = parseDiceString(spell.damage.diceExpression);
        } else {
             const totalDarts = 3 + (castLevel - 1);
             for(let i=0; i<totalDarts; i++) damage += (rollDie(4) + 1);
        }
        
        if (isEmpowered) {
             damage += rollDie(4); 
        }
        
        damage += damageBonus;

        finalTarget = applyDamageToToken(finalTarget, damage, spell.damage.damageType) as Actor;
        floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: `${damage}`, color: '#ec4899', type: 'damage' });
        logs.push(`Magic Missile (${darts} darts) hits for ${damage} force damage.`);
    }

    // --- HEALING ---
    if (spell.healing) {
        if (canHeal(finalTarget)) {
            let formula = spell.healing.diceExpression;
            if (spell.level > 0 && castLevel > spell.level) {
                const match = formula.match(/(\d+)d(\d+)(.*)/);
                if (match) {
                    const baseNum = parseInt(match[1]);
                    const levelsAbove = castLevel - spell.level;
                    formula = `${baseNum + levelsAbove}d${match[2]}${match[3]}`;
                }
            }
            
            let healing = parseDiceString(formula);
            
            if (caster.class === 'Sorcerer' && caster.subclass === 'Divine Soul' && isEmpowered) {
                 healing += rollDie(4); 
            }

            const ability = caster.spellAbility || 'wis';
            const mod = getModifier(caster.stats[ability] || 10);
            healing += mod;
            if (caster.subclass === 'Life Domain') healing += 2 + spell.level;

            finalTarget.hp = Math.min(finalTarget.maxHp || 10, (finalTarget.hp || 0) + healing);
            floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: `+${healing}`, color: '#4ade80', type: 'heal' });
            logs.push(`Healed ${healing} HP.`);
        } else {
            logs.push(`${target.name} cannot be healed!`);
            floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: `NO HEAL`, color: '#9ca3af', type: 'info' });
        }
    }

    // --- BUFFS ---
    if ((spell.tags.includes('buff') || !spell.attackRoll && !spell.savingThrow && !spell.damage && !spell.healing) && spell.statusEffect) {
         const effects = finalTarget.statusEffects || [];
         if (!effects.some(e => e.id === spell.statusEffect)) {
             effects.push({ id: spell.statusEffect!, duration });
             finalTarget.statusEffects = effects;
             floatingTexts.push({ id: Math.random().toString(), x: target.x, y: target.y, text: spell.statusEffect.toUpperCase(), color: '#3b82f6', type: 'info' });
             logs.push(`Applied buff: ${spell.statusEffect}.`);
         } else {
             // Refresh duration
             finalTarget.statusEffects = effects.map(e => e.id === spell.statusEffect ? { ...e, duration } : e);
             logs.push(`Refreshed buff: ${spell.statusEffect}.`);
         }
    }
    
    if (!skipResourceConsumption) {
        finalCaster.statusEffects = finalCaster.statusEffects?.filter(e => !e.id.startsWith('metamagic_'));
    }

    return { caster: finalCaster, targets: [finalTarget], logs, floatingTexts };
};

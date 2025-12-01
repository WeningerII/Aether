
import { Token, GameState, MonsterAction, GridSize, TokenType, SRDSpell, Actor } from '../types';
import { getDistance, hasStatus, checkLineOfSight, parseDiceString, isActor } from './gameLogic';
import { SRD_SPELLS } from '../data/srd';

export interface AIAction {
    type: 'MOVE' | 'ATTACK' | 'WAIT' | 'HEAL' | 'BUFF';
    targetId?: string;
    x?: number;
    y?: number;
    actionName?: string;
    description: string;
}

interface Point {
    x: number;
    y: number;
}

interface ScoredAction {
    action: MonsterAction | SRDSpell;
    type: 'melee' | 'ranged' | 'spell' | 'heal' | 'buff';
    score: number;
    targetId: string;
    range: number; // in grid units
    isSpell: boolean;
}

// --- Pathfinding (A*) ---

const heuristic = (a: Point, b: Point): number => {
    // Chebyshev distance (diagonal movement allowed)
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
};

const getMovementCost = (p: Point, tokens: Token[], selfId: string): number => {
    const terrain = tokens.find(t => t.x === p.x && t.y === p.y && t.drawingData?.type === 'terrain');
    
    if (terrain?.drawingData?.blocksMovement) return Infinity;

    if (terrain?.drawingData?.mechanics?.moveCost) {
        return terrain.drawingData.mechanics.moveCost;
    }
    // Avoid hazards unless necessary (high synthetic cost)
    if (terrain?.drawingData?.mechanics?.damageDice || terrain?.drawingData?.mechanics?.applyStatusId) {
        return 5; 
    }
    return 1;
};

const isWalkable = (p: Point, tokens: Token[], gridSize: GridSize, selfId: string): boolean => {
    if (p.x < 0 || p.x >= gridSize.cols || p.y < 0 || p.y >= gridSize.rows) return false;
    return !tokens.some(t => {
        if (t.x !== p.x || t.y !== p.y || t.id === selfId) return false;
        
        if (isActor(t)) return true; // Creatures block movement
        
        // Check for blocking props (OBJECT type)
        if (!isActor(t)) {
             const prop = t as any; // Prop
             if (prop.drawingData?.blocksMovement) return true;
        }
        
        return false;
    });
};

export const findPath = (start: Point, goal: Point, tokens: Token[], gridSize: GridSize, selfId: string): Point[] | null => {
    const openSet: Point[] = [start];
    const cameFrom = new Map<string, Point>();
    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();

    const pointKey = (p: Point) => `${p.x},${p.y}`;

    gScore.set(pointKey(start), 0);
    fScore.set(pointKey(start), heuristic(start, goal));

    let iterations = 0;
    const MAX_ITERATIONS = 400; // Performance cap

    while (openSet.length > 0) {
        iterations++;
        if (iterations > MAX_ITERATIONS) break;

        let current = openSet.reduce((a, b) => 
            (fScore.get(pointKey(a)) ?? Infinity) < (fScore.get(pointKey(b)) ?? Infinity) ? a : b
        );

        // Check if we are at goal OR adjacent to goal (if goal is occupied by target)
        if ((current.x === goal.x && current.y === goal.y) || 
            (heuristic(current, goal) === 1 && !isWalkable(goal, tokens, gridSize, selfId))) {
            return reconstructPath(cameFrom, current);
        }

        openSet.splice(openSet.indexOf(current), 1);

        const neighbors = [
            { x: current.x + 1, y: current.y },
            { x: current.x - 1, y: current.y },
            { x: current.x, y: current.y + 1 },
            { x: current.x, y: current.y - 1 },
            { x: current.x + 1, y: current.y + 1 },
            { x: current.x - 1, y: current.y - 1 },
            { x: current.x + 1, y: current.y - 1 },
            { x: current.x - 1, y: current.y + 1 }
        ];

        for (const neighbor of neighbors) {
            const isGoal = neighbor.x === goal.x && neighbor.y === goal.y;
            if (!isWalkable(neighbor, tokens, gridSize, selfId) && !isGoal) continue;

            const moveCost = getMovementCost(neighbor, tokens, selfId);
            const tentativeGScore = (gScore.get(pointKey(current)) ?? Infinity) + moveCost;

            if (tentativeGScore < (gScore.get(pointKey(neighbor)) ?? Infinity)) {
                cameFrom.set(pointKey(neighbor), current);
                gScore.set(pointKey(neighbor), tentativeGScore);
                fScore.set(pointKey(neighbor), tentativeGScore + heuristic(neighbor, goal));
                
                if (!openSet.some(p => p.x === neighbor.x && p.y === neighbor.y)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    return null;
};

const reconstructPath = (cameFrom: Map<string, Point>, current: Point): Point[] => {
    const totalPath = [current];
    const pointKey = (p: Point) => `${p.x},${p.y}`;
    while (cameFrom.has(pointKey(current))) {
        current = cameFrom.get(pointKey(current))!;
        totalPath.unshift(current);
    }
    return totalPath;
};

// --- Tactical Helpers ---

const getFlankingPositions = (target: Token, allies: Token[], gridSize: GridSize): Point[] => {
    const positions: Point[] = [];
    allies.forEach(ally => {
        // Check if ally is adjacent (dist 1)
        if (Math.max(Math.abs(ally.x - target.x), Math.abs(ally.y - target.y)) === 1) {
            // Calculate opposite point relative to target
            const dx = target.x - ally.x;
            const dy = target.y - ally.y;
            const flankX = target.x + dx;
            const flankY = target.y + dy;
            
            // Check bounds
            if (flankX >= 0 && flankX < gridSize.cols && flankY >= 0 && flankY < gridSize.rows) {
                positions.push({ x: flankX, y: flankY });
            }
        }
    });
    return positions;
};

export const getTacticalContext = (monster: Actor, gameState: GameState): string => {
    const enemies = gameState.tokens.filter(t => t.type === TokenType.PLAYER && (t.hp || 0) > 0);
    const allies = gameState.tokens.filter(t => t.type !== TokenType.PLAYER && t.id !== monster.id && (t.hp || 0) > 0);
    
    return enemies.map(t => {
        const dist = Math.max(Math.abs(t.x - monster.x), Math.abs(t.y - monster.y)) * 5;
        const hpPercent = (t.hp || 0) / (t.maxHp || 1);
        
        // Tactical Tags
        const tags: string[] = [];
        
        // Flanking?
        const isFlanked = allies.some(a => Math.max(Math.abs(a.x - t.x), Math.abs(a.y - t.y)) === 1);
        if (isFlanked) tags.push('FLANK_OPP'); // Flanking Opportunity
        
        // HP Status
        if (hpPercent <= 0.25) tags.push('EXECUTE'); // Kill range
        else if (hpPercent <= 0.5) tags.push('BLOODIED');

        // Status Vulnerabilities
        if (hasStatus(t, 'stunned') || hasStatus(t, 'paralyzed') || hasStatus(t, 'unconscious')) tags.push('CC_LOCKED');
        if (hasStatus(t, 'prone')) tags.push('PRONE');
        if (hasStatus(t, 'concentrating')) tags.push('CONCENTRATING');
        
        // Clustered? (Within 15ft of another enemy)
        const isClustered = enemies.some(e => e.id !== t.id && Math.max(Math.abs(e.x - t.x), Math.abs(e.y - t.y)) <= 3);
        if (isClustered) tags.push('CLUSTERED');

        // Vulnerable?
        if (t.ac && t.ac < 14) tags.push('LOW_AC');

        return `${t.name} [HP:${Math.round(hpPercent*100)}%, AC:${t.ac}, Dist:${dist}ft, Tags:${tags.join(',')}]`;
    }).join('\n');
};

// --- Evaluation Logic ---

const getTargets = (npc: Actor, tokens: Token[]): { enemies: Actor[], allies: Actor[] } => {
    const enemies = tokens.filter(t => t.type === TokenType.PLAYER && (t.hp || 0) > 0 && !hasStatus(t, 'invisible') && !hasStatus(t, 'dead') && isActor(t)) as Actor[];
    const allies = tokens.filter(t => t.type !== TokenType.PLAYER && t.id !== npc.id && (t.hp || 0) > 0 && t.type !== TokenType.OBJECT && isActor(t)) as Actor[];
    return { enemies, allies };
};

// Parse range string "60 feet" -> 12 grid cells
export const parseRange = (rangeStr?: string | number): number => {
    if (typeof rangeStr === 'number') return Math.floor(rangeStr / 5);
    if (!rangeStr) return 1;
    if (rangeStr.toLowerCase().includes('touch')) return 1;
    if (rangeStr.toLowerCase().includes('self')) return 0;
    
    const match = rangeStr.match(/(\d+)/);
    if (match) {
        return Math.floor(parseInt(match[1]) / 5);
    }
    return 1;
};

// Determine if recharge is available
const checkRecharge = (actionDesc: string): boolean => {
    const match = actionDesc.match(/Recharge (\d+)-(\d+)/i);
    if (!match) return true; // No recharge, always available
    
    const min = parseInt(match[1]);
    const roll = Math.floor(Math.random() * 6) + 1;
    return roll >= min; 
};

export const calculateAITurn = (npc: Actor, gameState: GameState, gridSize: GridSize): AIAction[] => {
    const monster = npc.monsterData;
    if (!monster) return [{ type: 'WAIT', description: 'No AI brain.' }];
    if (hasStatus(npc, 'stunned') || hasStatus(npc, 'paralyzed') || hasStatus(npc, 'unconscious')) {
        return [{ type: 'WAIT', description: 'Incapacitated.' }];
    }

    const { enemies, allies } = getTargets(npc, gameState.tokens);
    if (enemies.length === 0) return [{ type: 'WAIT', description: 'No enemies visible.' }];

    const behavior = monster.aiBehavior || 'aggressive';

    // 1. Evaluate Potential Actions
    const potentialActions: ScoredAction[] = [];
    
    // A. Physical Actions
    monster.actions.forEach(action => {
        if (!checkRecharge(action.desc)) return;
        
        const isMulti = action.type === 'multiattack';
        let refAction = action;
        if (isMulti && action.multiattackActions) {
            const subName = action.multiattackActions[0];
            const sub = monster.actions.find(a => a.name === subName);
            if (sub) refAction = sub;
        }

        const range = refAction.range ? Math.floor(refAction.range / 5) : (refAction.reach ? Math.floor(refAction.reach / 5) : 1);
        const dmgEst = parseDiceString(refAction.damage || '1d6');
        const dmgType = refAction.damageType;
        
        enemies.forEach(enemy => {
            let score = dmgEst;
            const hpPercent = (enemy.hp || 1) / (enemy.maxHp || 1);
            const dist = getDistance(npc, enemy);
            
            // Resistances/Immunities Check
            if (dmgType) {
                if (enemy.damageImmunities?.some(i => i.toLowerCase().includes(dmgType.toLowerCase()))) {
                    score = 0; // Totally ineffective
                } else if (enemy.damageVulnerabilities?.some(v => v.toLowerCase().includes(dmgType.toLowerCase()))) {
                    score *= 2.0; // Highly effective
                } else if (enemy.damageResistances?.some(r => r.toLowerCase().includes(dmgType.toLowerCase()))) {
                    score *= 0.5; // Less effective
                }
            }

            // BASE: Threat Assessment
            // 1. Low HP Priority
            if (hpPercent <= 0.25) score += 30; // Execute range
            else if (hpPercent <= 0.5) score += 10;

            // 2. Status Vulnerability
            if (hasStatus(enemy, 'paralyzed') || hasStatus(enemy, 'stunned') || hasStatus(enemy, 'unconscious')) {
                score += 40; // Critical opportunity
            }
            
            // 3. Concentration Threat
            if (hasStatus(enemy, 'concentrating')) score += 15;

            // BEHAVIOR MODIFIERS
            if (behavior === 'aggressive') {
                score += (20 - dist); // Favor closer targets strongly
                if (hpPercent <= 0.5) score += 20; // Bloodthirsty
            } 
            else if (behavior === 'defensive') {
                // Prefer targets attacking allies or self (simplified as closest)
                if (dist <= 3) score += 20; 
                // Penalty for overextending away from support
                const allyDist = allies.length > 0 ? Math.min(...allies.map(a => getDistance(npc, a))) : 0;
                if (allyDist > 5) score -= 20;

                // NEW: If injured, prioritize staying away from melee
                if ((npc.hp || 0) < (npc.maxHp || 1) * 0.5 && dist < 3) {
                    score -= 30;
                }
            }
            else if (behavior === 'lurker') {
                // Bonus for isolated targets
                const enemyAllies = enemies.filter(e => e.id !== enemy.id);
                const isIsolated = !enemyAllies.some(e => getDistance(e, enemy) <= 2);
                if (isIsolated) score += 30;
                
                // Bonus if we have advantage (e.g. from hiding)
                if (hasStatus(npc, 'invisible')) score += 20;
                
                // Penalty for engaging groups
                if (!isIsolated) score -= 10;
            }
            else if (behavior === 'caster') {
                // Penalty for melee unless touch spell
                if (refAction.type === 'melee') score -= 10;
                // Keep distance
                if (dist < 3) score -= 10;
            }

            // TACTICAL: Flanking & Prone
            if (refAction.type === 'melee') {
                 const isFlanked = allies.some(a => Math.max(Math.abs(a.x - enemy.x), Math.abs(a.y - enemy.y)) === 1);
                 if (isFlanked) score += 20; // Flank bonus
                 if (hasStatus(enemy, 'prone')) score += 20; // Prone melee bonus
            } else if (refAction.type === 'ranged') {
                 if (hasStatus(enemy, 'prone')) score -= 20; // Prone ranged penalty
                 if (dist <= 1) score -= 20; // Ranged in melee penalty
            }

            if (isMulti) score *= 1.5;
            
            // Add Randomness (Fuzz) to prevent robotic predictability
            score += Math.random() * 5;

            potentialActions.push({
                action,
                type: refAction.type as any,
                score,
                targetId: enemy.id,
                range,
                isSpell: false
            });
        });
    });

    // B. Spellcasting
    if (monster.spellcasting) {
        const availableSpells = monster.spellcasting.spells
            .map(name => SRD_SPELLS.find(s => s.name === name))
            .filter(s => !!s) as SRDSpell[];

        availableSpells.forEach(spell => {
            if (spell.healing) {
                const healAmount = parseDiceString(spell.healing.diceExpression);
                const candidates = [npc, ...allies].filter(t => (t.hp || 0) < (t.maxHp || 0) * 0.6);
                
                candidates.forEach(ally => {
                    let score = healAmount * 2.5;
                    if ((ally.hp || 0) < (ally.maxHp || 0) * 0.25) score += 60; // Emergency heal
                    
                    // Defensive casters prioritize healing
                    if (behavior === 'caster' || behavior === 'defensive') score += 20;
                    
                    score += Math.random() * 5;

                    potentialActions.push({
                        action: spell,
                        type: 'heal',
                        score,
                        targetId: ally.id,
                        range: parseRange(spell.range),
                        isSpell: true
                    });
                });
            } else if (spell.damage || spell.savingThrow || spell.attackRoll) {
                 const dmg = spell.damage ? parseDiceString(spell.damage.diceExpression) : 0;
                 const dmgType = spell.damage?.damageType;
                 const isAoE = spell.areaShape !== undefined;
                 
                 enemies.forEach(enemy => {
                     let score = dmg;
                     
                     // Resistances/Immunities Check
                     if (dmgType) {
                        if (enemy.damageImmunities?.some(i => i.toLowerCase().includes(dmgType.toLowerCase()))) {
                            score = 0; // Totally ineffective
                        } else if (enemy.damageVulnerabilities?.some(v => v.toLowerCase().includes(dmgType.toLowerCase()))) {
                            score *= 2.0; // Highly effective
                        } else if (enemy.damageResistances?.some(r => r.toLowerCase().includes(dmgType.toLowerCase()))) {
                            score *= 0.5; // Less effective
                        }
                     }

                     if (isAoE) {
                         score *= 2.0; // AoE Value baseline
                         // Caster AI loves AoE
                         if (behavior === 'caster') {
                             // Check cluster
                             const clusterCount = enemies.filter(e => getDistance(e, enemy) <= 3).length;
                             score += (clusterCount * 15);
                         }
                     }
                     
                     if (spell.level > 2) score += 20; // Use big spells
                     if (spell.statusEffect) score += 25; // CC Value

                     const dist = getDistance(npc, enemy);
                     const range = parseRange(spell.range);
                     
                     if (dist <= range) score += 10;
                     else score -= (dist - range) * 2;

                     score += Math.random() * 5;

                     potentialActions.push({
                         action: spell,
                         type: 'spell',
                         score,
                         targetId: enemy.id,
                         range,
                         isSpell: true
                     });
                 });
            }
        });
    }

    // 2. Select Best Action
    potentialActions.sort((a, b) => b.score - a.score);
    const bestChoice = potentialActions[0];

    if (!bestChoice) {
        const closest = enemies.sort((a, b) => getDistance(npc, a) - getDistance(npc, b))[0];
        if (closest) {
            const path = findPath({x: npc.x, y: npc.y}, {x: closest.x, y: closest.y}, gameState.tokens, gridSize, npc.id);
            if (path && path.length > 1) {
                 const moveDist = Math.min(path.length - 1, monster.speed);
                 const dest = path[moveDist];
                 return [{ type: 'MOVE', x: dest.x, y: dest.y, description: 'Moves towards enemy (No valid attacks).' }];
            }
        }
        return [{ type: 'WAIT', description: 'No valid options.' }];
    }

    // 3. Plan Movement for Best Action
    return generatePlanForAction(npc, bestChoice.targetId, bestChoice.action.name, bestChoice.range, bestChoice.isSpell, gameState, gridSize);
};

// Helper to plan movement given a target and range
export const generatePlanForAction = (
    npc: Actor, 
    targetId: string, 
    actionName: string, 
    range: number, 
    isSpell: boolean,
    gameState: GameState, 
    gridSize: GridSize
): AIAction[] => {
    const plan: AIAction[] = [];
    const targetToken = gameState.tokens.find(t => t.id === targetId);
    if (!targetToken) return [{ type: 'WAIT', description: 'Target lost.' }];

    // Handle Self-Target (e.g. Cure Wounds on self, Buffs)
    if (targetToken.id === npc.id) {
        plan.push({
            type: isSpell && (SRD_SPELLS.find(s => s.name === actionName)?.healing || SRD_SPELLS.find(s => s.name === actionName)?.tags.includes('buff')) ? 'HEAL' : 'ATTACK',
            targetId: npc.id,
            actionName: actionName,
            description: `Casts ${actionName} on self.`
        });
        return plan;
    }

    const monster = npc.monsterData!;
    let dist = getDistance(npc, targetToken);
    const hasLoS = checkLineOfSight(npc, targetToken, gameState.tokens);
    
    let destX = npc.x;
    let destY = npc.y;
    let needsMove = false;

    const needsLoS = true;
    const isMelee = range === 1;
    
    // TACTICAL MOVEMENT LOGIC
    // If Melee, attempt to find a flanking position first
    if (isMelee) {
        const allies = gameState.tokens.filter(t => t.type !== TokenType.PLAYER && t.id !== npc.id && (t.hp || 0) > 0 && t.type !== TokenType.OBJECT);
        const flankSpots = getFlankingPositions(targetToken, allies, gridSize);
        
        let bestFlankPath: Point[] | null = null;
        
        for (const spot of flankSpots) {
            // Check if spot is reachable and safe
            if (isWalkable(spot, gameState.tokens, gridSize, npc.id) || (spot.x === npc.x && spot.y === npc.y)) {
                const path = findPath({x: npc.x, y: npc.y}, spot, gameState.tokens, gridSize, npc.id);
                if (path && path.length <= monster.speed + 1) { // Reachable in 1 turn
                     if (!bestFlankPath || path.length < bestFlankPath.length) {
                         bestFlankPath = path;
                     }
                }
            }
        }
        
        if (bestFlankPath && bestFlankPath.length > 1) {
            const moveDist = Math.min(bestFlankPath.length - 1, monster.speed);
            const dest = bestFlankPath[moveDist];
            // Only move if it actually gets us there or closer to flank
            if (dest.x !== npc.x || dest.y !== npc.y) {
                plan.push({ type: 'MOVE', x: dest.x, y: dest.y, description: `Moves to flanking position.` });
                destX = dest.x;
                destY = dest.y;
                needsMove = true;
            }
        }
    }

    // Standard Pathfinding if no flank move planned or feasible
    if (!needsMove && (dist > range || (needsLoS && !hasLoS))) {
        const path = findPath({x: npc.x, y: npc.y}, {x: targetToken.x, y: targetToken.y}, gameState.tokens, gridSize, npc.id);
        if (path && path.length > 1) {
            let optimalIndex = -1;
            const maxMove = Math.min(path.length - 1, monster.speed);

            for (let i = 1; i <= maxMove; i++) {
                const p = path[i];
                const d = Math.max(Math.abs(p.x - targetToken.x), Math.abs(p.y - targetToken.y));
                const ghostToken = { ...npc, x: p.x, y: p.y };
                const hasLoSFromPt = checkLineOfSight(ghostToken, targetToken, gameState.tokens);

                if (d <= range && hasLoSFromPt) {
                    optimalIndex = i;
                    break; // Found closest valid spot
                }
            }
            
            // If no valid spot found within movement (too far), just move max towards
            if (optimalIndex === -1) optimalIndex = maxMove;

            if (optimalIndex > 0) {
                const dest = path[optimalIndex];
                plan.push({ type: 'MOVE', x: dest.x, y: dest.y, description: `Moves into position.` });
                destX = dest.x;
                destY = dest.y;
                needsMove = true;
            }
        }
    }
    
    const newDist = Math.max(Math.abs(destX - targetToken.x), Math.abs(destY - targetToken.y));
    const ghostSelf = { ...npc, x: destX, y: destY };
    const newLoS = checkLineOfSight(ghostSelf, targetToken, gameState.tokens);

    if (newDist <= range && (!needsLoS || newLoS)) {
        const spellObj = SRD_SPELLS.find(s => s.name === actionName);
        const isHealOrBuff = isSpell && (spellObj?.healing || spellObj?.tags.includes('buff'));
        
        plan.push({
            type: isHealOrBuff ? 'HEAL' : 'ATTACK',
            targetId: targetToken.id,
            actionName: actionName,
            description: isSpell 
                ? `Casts ${actionName} on ${targetToken.name}`
                : `Uses ${actionName} on ${targetToken.name}`
        });
    } else if (!needsMove) {
         plan.push({ type: 'WAIT', description: 'Target unreachable.' });
    }

    return plan;
};

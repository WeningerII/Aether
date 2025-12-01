
import { FunctionDeclaration, Schema, Type } from '@google/genai';

export const DM_SYSTEM_INSTRUCTION = `You are the AI Dungeon Master (DM) for a virtual tabletop RPG. 
Your role is to narrate the outcomes of player actions, describe environments, and roleplay NPCs.
- Keep responses concise (under 3 sentences) unless asked for a long description.
- Be evocative but fast-paced.
- Pay close attention to the 'Context' provided (Terrain, Visible Characters).
- REACT TO HAZARDS: If a character moves into fire/spikes/web, describe the effect vividly and use tools to apply damage/conditions.
- CRITICAL: You have access to tools to modify the game state.
  - If an action causes damage or healing, call 'modifyTokenHealth'.
  - If an action applies a condition (prone, blinded, etc.), call 'applyCondition'.
  - If a check is needed for an NPC, call 'rollDice'.
- When you use a tool, narrate the result naturally in your response.
`;

export const COMBAT_SYSTEM_INSTRUCTION = `You are the tactical AI for a D&D 5e monster.
Analyze the provided battlefield state and determine the optimal single turn.
- AGGRESSIVE: Focus low HP enemies and closest threats.
- DEFENSIVE: Protect allies, hold ground, use Dodge if overwhelmed.
- LURKER: Attack isolated targets, use hit-and-run.
- CASTER: Stay at range, use AoE on clusters, control spells early.
- MINION: Swarm closest enemy or aid boss.
Tactical Priority:
1. Kill low HP enemies.
2. Attack stunned/paralyzed enemies.
3. Use Flanking if Melee.
4. Use powerful spells if slots available.
`;

export const dmTools: FunctionDeclaration[] = [
    {
        name: "rollDice",
        description: "Roll dice for a check, save, attack, or damage.",
        parameters: {
            type: Type.OBJECT,
            properties: {
                expression: { type: Type.STRING, description: "Dice formula (e.g. 1d20+2, 4d6)" },
                reason: { type: Type.STRING, description: "Why the roll is happening" }
            },
            required: ["expression"]
        }
    },
    {
        name: "modifyTokenHealth",
        description: "Apply damage or healing to a token.",
        parameters: {
            type: Type.OBJECT,
            properties: {
                targetName: { type: Type.STRING, description: "The exact name of the target token." },
                amount: { type: Type.NUMBER, description: "Amount of HP to change. Positive number." },
                isDamage: { type: Type.BOOLEAN, description: "True if dealing damage, False if healing." }
            },
            required: ["targetName", "amount", "isDamage"]
        }
    },
    {
        name: "applyCondition",
        description: "Apply a status effect or condition to a token.",
        parameters: {
            type: Type.OBJECT,
            properties: {
                targetName: { type: Type.STRING, description: "The exact name of the token." },
                condition: { type: Type.STRING, description: "Condition ID (e.g. prone, blinded, burning)." },
                duration: { type: Type.NUMBER, description: "Duration in rounds." }
            },
            required: ["targetName", "condition"]
        }
    }
];

export const combatStrategySchema: Schema = {
    type: Type.OBJECT,
    properties: {
        targetName: { type: Type.STRING, description: "Exact name of the target token." },
        actionName: { type: Type.STRING, description: "Exact name of the action or spell to use." },
        reasoning: { type: Type.STRING, description: "Tactical reason for this move." },
        isSupportAction: { type: Type.BOOLEAN, description: "True if this action targets an ally or self." }
    },
    required: ["targetName", "actionName", "reasoning", "isSupportAction"]
};

export const mapAnalysisSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        spawnPoints: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    x: { type: Type.INTEGER },
                    y: { type: Type.INTEGER },
                    type: { type: Type.STRING, enum: ['player', 'enemy'] }
                }
            }
        },
        terrainFeatures: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    x: { type: Type.INTEGER },
                    y: { type: Type.INTEGER },
                    description: { type: Type.STRING },
                    type: { type: Type.STRING, enum: ['difficult', 'cover', 'hazard', 'none'] }
                }
            }
        }
    }
};



import { GridSize, Token, TokenType, Item, DrawingData } from './types';

export const DEFAULT_GRID_SIZE: GridSize = {
  rows: 12,
  cols: 16,
};

export const CELL_SIZE_PX = 48;

export const DAMAGE_TYPES = [
  'bludgeoning', 'piercing', 'slashing',
  'fire', 'cold', 'lightning', 'poison', 'acid',
  'necrotic', 'radiant', 'force', 'psychic', 'thunder'
];

export const EFFECT_DURATIONS: Record<string, number> = {
  burning: 3,
  poisoned: 5,
  stunned: 1,
  invisible: 10,
  prone: 999, // Indefinite until action taken
  rage: 10,
  dodge: 1,
  blinded: 1,
  restrained: 3,
  unconscious: 999,
  reckless: 1,
  frightened: 2,
  frenzy: 10,
  exhaustion: 999
};

export const TERRAIN_PRESETS: Record<string, DrawingData> = {
    difficult: {
        type: 'terrain',
        terrainType: 'difficult',
        color: '#78350f', // Brown
        text: 'Difficult',
        mechanics: { moveCost: 2 }
    },
    cover_half: {
        type: 'terrain',
        terrainType: 'cover_half',
        color: '#3b82f6', // Blue
        text: 'Half Cover',
        mechanics: { acBonus: 2 }
    },
    cover_three_quarters: {
        type: 'terrain',
        terrainType: 'cover_three_quarters',
        color: '#1e3a8a', // Dark Blue
        text: '3/4 Cover',
        mechanics: { acBonus: 5 }
    },
    hazard_fire: {
        type: 'terrain',
        terrainType: 'hazard',
        color: '#ef4444', // Red
        text: 'Fire',
        mechanics: { damageDice: '2d6', damageType: 'fire', saveDC: 12, saveAbility: 'dex', saveEffect: 'half' }
    },
    hazard_acid: {
        type: 'terrain',
        terrainType: 'hazard',
        color: '#84cc16', // Lime
        text: 'Acid',
        mechanics: { damageDice: '2d6', damageType: 'acid', saveDC: 12, saveAbility: 'con', saveEffect: 'half' }
    },
    hazard_web: {
        type: 'terrain',
        terrainType: 'hazard', // Visual pulse
        color: '#e5e7eb', // Light gray
        text: 'Web',
        mechanics: { 
            moveCost: 2, 
            saveDC: 12, 
            saveAbility: 'dex', 
            saveEffect: 'none', // No damage
            applyStatusId: 'restrained',
            statusDuration: 1 
        }
    },
    hazard_spikes: {
        type: 'terrain',
        terrainType: 'hazard',
        color: '#71717a', // Zinc
        text: 'Spikes',
        mechanics: { damageDice: '2d4', damageType: 'piercing', saveDC: 13, saveAbility: 'dex', saveEffect: 'none' }
    },
    obstacle_wall: {
        type: 'terrain',
        terrainType: 'obstacle',
        color: '#334155', // Slate 700
        text: 'Wall',
        blocksMovement: true,
        blocksVision: true
    }
};

export const COMMON_ITEMS: Item[] = [
  { id: 'potion_healing', name: 'Potion of Healing', type: 'potion', quantity: 1, description: 'Restores 2d4+2 HP', effect: { type: 'heal', value: '2d4+2' } },
  { id: 'potion_greater_healing', name: 'Potion of Greater Healing', type: 'potion', quantity: 1, description: 'Restores 4d4+4 HP', effect: { type: 'heal', value: '4d4+4' } },
  { id: 'longsword', name: 'Longsword', type: 'weapon', quantity: 1, description: 'Versatile (1d8/1d10)', effect: { type: 'damage', value: '1d8' } },
  { id: 'dagger', name: 'Dagger', type: 'weapon', quantity: 1, description: 'Finesse, light, thrown', effect: { type: 'damage', value: '1d4' } },
  { id: 'greataxe', name: 'Greataxe', type: 'weapon', quantity: 1, description: 'Heavy, two-handed', effect: { type: 'damage', value: '1d12' } },
  { id: 'shortbow', name: 'Shortbow', type: 'weapon', quantity: 1, description: 'Ranged (80/320)', effect: { type: 'damage', value: '1d6' } },
  { id: 'shield', name: 'Shield', type: 'armor', quantity: 1, description: '+2 AC', effect: { type: 'buff', stat: 'ac', value: '2' } },
  { id: 'rations', name: 'Rations (1 day)', type: 'gear', quantity: 5, description: 'Dry food for one day' },
  { id: 'rope', name: 'Hempen Rope (50ft)', type: 'gear', quantity: 1, description: 'Standard rope' },
  { id: 'torch', name: 'Torch', type: 'gear', quantity: 5, description: 'Provides bright light for 20ft' },
];

export const INITIAL_TOKENS: Token[] = [];

export const SYSTEM_INSTRUCTION = `You are the AI Dungeon Master (DM) for a virtual tabletop RPG platform. 
Your role is to narrate the outcomes of player actions, describe environments, and roleplay NPCs.
- Keep responses concise (under 3 sentences) unless asked for a long description.
- Be evocative but fast-paced.
- Pay close attention to the 'Context' provided, specifically regarding 'Terrain Features' and 'Visible Characters'.
- REACT TO HAZARDS: If a character moves into or starts their turn in a hazard identified in the terrain context (e.g., Fire, Spikes, Web), describe the effect vividly and use the 'modifyTokenHealth' or 'applyCondition' tools if damage or status effects apply.
- REACT TO STATUS EFFECTS: If a character has a status effect (e.g., poisoned, prone, frightened), incorporate that into your narration of their actions or the environment's effect on them.
- If a dice roll is provided in the input, use it to determine success or failure based on standard D&D 5e-like logic.
- CRITICAL: You have access to tools to modify the game state.
  - If an action causes damage or healing, call 'modifyTokenHealth'.
  - If an action applies a condition (prone, blinded, etc.), call 'applyCondition'.
  - If a check is needed for an NPC, call 'rollDice'.
- When you use a tool, narrate the result naturally in your response (e.g. "The goblin cries out as your sword connects, taking 5 damage!").
- Do not ask for the API key.
`;
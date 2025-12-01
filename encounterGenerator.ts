




import { Token, TokenType, MonsterData, DrawingData } from '../types';
import { MONSTER_COMPENDIUM } from '../data/monsters';
import { generateMapImage, analyzeMapLayout } from '../services/gemini';
import { calculateTokenStats, getSpellSlots } from './gameLogic';
import { TERRAIN_PRESETS } from '../constants';

export type EncounterTheme = 'Dungeon' | 'Forest' | 'City' | 'Crypt' | 'Hell' | 'Mountain' | 'Swamp' | 'Castle';
export type EncounterMode = 'watch' | 'play';
export type EncounterDifficulty = 'easy' | 'medium' | 'hard' | 'deadly';

interface EncounterData {
    mapBase64: string;
    tokens: Token[];
    drawings?: { x: number, y: number, data: DrawingData }[];
}

// Expanded config to help the monster filter
const THEME_CONFIG: Record<EncounterTheme, { 
    keywords: string[], 
    mapStyle: string,
}> = {
    'Dungeon': {
        keywords: ['Goblin', 'Ooze', 'Kobold', 'Rat', 'Spider', 'Construct'],
        mapStyle: 'Dark stone dungeon corridor with torches, ancient ruins, underground'
    },
    'Forest': {
        keywords: ['Wolf', 'Bear', 'Spider', 'Blight', 'Boar', 'Fey', 'Plant'],
        mapStyle: 'Dense misty forest clearing, ancient woods, nature path'
    },
    'Crypt': {
        keywords: ['Skeleton', 'Zombie', 'Ghoul', 'Shadow', 'Undead', 'Wight', 'Vampire', 'Lich'],
        mapStyle: 'Ancient crypt with stone sarcophagi, haunted mausoleum, graveyard at midnight'
    },
    'City': {
        keywords: ['Bandit', 'Cultist', 'Thug', 'Rat', 'Guard', 'Noble', 'Spy'],
        mapStyle: 'Cobblestone city street at night, tavern interior, market square'
    },
    'Hell': {
        keywords: ['Imp', 'Devil', 'Fiend', 'Cultist', 'Fire'],
        mapStyle: 'Infernal landscape with lava flows, obsidian throne room, hellish dimension'
    },
    'Mountain': {
        keywords: ['Giant', 'Orc', 'Dragon', 'Elemental', 'Roc'],
        mapStyle: 'Snowy mountain peak, treacherous cliff path, rocky crag'
    },
    'Swamp': {
        keywords: ['Lizardfolk', 'Hag', 'Crocodile', 'Troll', 'Ooze'],
        mapStyle: 'Murky swamp water, twisted roots, bog with green fog'
    },
    'Castle': {
        keywords: ['Guard', 'Knight', 'Noble', 'Animated Armor', 'Construct'],
        mapStyle: 'Grand castle throne room, stone battlements, royal hallway'
    }
};

// Basic CR to XP mapping
const CR_XP: Record<string, number> = {
    '0': 10, '0.125': 25, '0.25': 50, '0.5': 100, '1': 200, '2': 450, '3': 700, '4': 1100, '5': 1800,
    '6': 2300, '7': 2900, '8': 3900, '9': 5000, '10': 5900, '11': 7200, '12': 8400, '13': 10000
};

// XP Thresholds per Character Level (Easy, Medium, Hard, Deadly)
const XP_THRESHOLDS: Record<number, number[]> = {
    1: [25, 50, 75, 100],
    2: [50, 100, 150, 200],
    3: [75, 150, 225, 400],
    4: [125, 250, 375, 500],
    5: [250, 500, 750, 1100],
    6: [300, 600, 900, 1400],
    7: [350, 750, 1100, 1700],
    8: [450, 900, 1400, 2100],
    9: [550, 1100, 1600, 2400],
    10: [600, 1200, 1900, 2800],
    11: [800, 1600, 2400, 3600],
    12: [1000, 2000, 3000, 4500],
    13: [1100, 2200, 3400, 5100],
    14: [1250, 2500, 3800, 5700],
    15: [1400, 2800, 4300, 6400],
    16: [1600, 3200, 4800, 7200],
    17: [2000, 3900, 5900, 8800],
    18: [2100, 4200, 6300, 9500],
    19: [2400, 4900, 7300, 10900],
    20: [2800, 5700, 8500, 12700],
};

const filterMonsters = (keywords: string[], minCR: number, maxCR: number): MonsterData[] => {
    return MONSTER_COMPENDIUM.filter(m => {
        const matchesKeyword = keywords.some(k => 
            m.name.includes(k) || 
            m.type.includes(k) || 
            (m.tags && m.tags.includes(k))
        );
        return matchesKeyword && m.cr >= minCR && m.cr <= maxCR;
    });
};

export const generateEncounter = async (
    theme: EncounterTheme, 
    mode: EncounterMode, 
    difficulty: EncounterDifficulty,
    partyLevel: number,
    partySize: number = 4,
    customPrompt: string = '',
    gridSize: { rows: number, cols: number },
    statusCallback?: (status: string) => void
): Promise<EncounterData> => {
    
    const config = THEME_CONFIG[theme];
    
    // --- Step 1: Map Generation ---
    if (statusCallback) statusCallback("Weaving reality (Generating Map)...");
    
    let mapPrompt = `${customPrompt || config.mapStyle}, top down view, tabletop rpg battle map, high detail, gridless, fantasy art style`;
    // Optimize prompt for grid 
    mapPrompt += `, ${gridSize.cols}x${gridSize.rows} aspect ratio`;

    const mapBase64 = await generateMapImage(mapPrompt, '2K', '16:9'); // Default to 16:9, image gen handles aspect mapping
    if (!mapBase64) throw new Error("Failed to generate map.");

    // --- Step 2: Spatial Analysis (The Agent) ---
    if (statusCallback) statusCallback("Scouting terrain (Analyzing Grid)...");
    
    const mapAnalysis = await analyzeMapLayout(mapBase64, gridSize);
    const validEnemySpawns = mapAnalysis?.spawnPoints.filter(p => p.type === 'enemy') || [];
    const validPlayerSpawns = mapAnalysis?.spawnPoints.filter(p => p.type === 'player') || [];
    const terrainFeatures = mapAnalysis?.terrainFeatures || [];

    // Fallback spawns if AI failed
    if (validEnemySpawns.length === 0) {
        for(let i=0; i<5; i++) validEnemySpawns.push({ x: gridSize.cols - 2 - i, y: Math.floor(gridSize.rows/2), type: 'enemy' });
    }
    if (validPlayerSpawns.length === 0) {
        for(let i=0; i<4; i++) validPlayerSpawns.push({ x: 1, y: Math.floor(gridSize.rows/2) + (i%2===0?1:-1)*Math.ceil(i/2), type: 'player' });
    }

    // --- Step 3: Roster Construction ---
    if (statusCallback) statusCallback("Summoning inhabitants (Building Roster)...");

    const level = Math.max(1, Math.min(20, partyLevel));
    const thresholds = XP_THRESHOLDS[level];
    
    let xpBudget = 0;
    if (difficulty === 'easy') xpBudget = thresholds[0] * partySize;
    else if (difficulty === 'medium') xpBudget = thresholds[1] * partySize;
    else if (difficulty === 'hard') xpBudget = thresholds[2] * partySize;
    else if (difficulty === 'deadly') xpBudget = thresholds[3] * partySize;

    // Cap max CR to prevent Tarrasque at level 1
    const maxCR = difficulty === 'deadly' ? level + 2 : level;
    const minCR = 0;

    let monsterPool = filterMonsters(config.keywords, minCR, maxCR);
    
    // If pool is empty, broaden search
    if (monsterPool.length === 0) {
        monsterPool = MONSTER_COMPENDIUM.filter(m => m.cr <= maxCR);
    }

    const selectedMonsters: MonsterData[] = [];
    let currentXP = 0;
    
    // Try to find a "Boss" if Hard/Deadly (30-50% of budget)
    if (difficulty === 'hard' || difficulty === 'deadly') {
        const bossBudget = xpBudget * 0.6;
        const bossCandidates = monsterPool.filter(m => (CR_XP[m.cr.toString()] || 0) <= bossBudget && m.cr >= level / 2);
        if (bossCandidates.length > 0) {
            const boss = bossCandidates[Math.floor(Math.random() * bossCandidates.length)];
            selectedMonsters.push(boss);
            currentXP += (CR_XP[boss.cr.toString()] || 0);
        }
    }

    // Fill remaining budget with minions
    let safetyLoop = 0;
    while (currentXP < xpBudget && safetyLoop < 50) {
        safetyLoop++;
        const remaining = xpBudget - currentXP;
        // Find monsters that fit remaining budget
        const affordable = monsterPool.filter(m => (CR_XP[m.cr.toString()] || 0) <= remaining);
        
        if (affordable.length === 0) break;
        
        const pick = affordable[Math.floor(Math.random() * affordable.length)];
        selectedMonsters.push(pick);
        currentXP += (CR_XP[pick.cr.toString()] || 0);
        
        // Stop if we have too many tokens
        if (selectedMonsters.length >= 8) break;
    }

    // --- Step 4: Token Placement ---
    const tokens: Token[] = [];
    
    // Shuffle Spawn Points
    const shuffledEnemySpawns = [...validEnemySpawns].sort(() => Math.random() - 0.5);
    
    selectedMonsters.forEach((m, i) => {
        const spawn = shuffledEnemySpawns[i % shuffledEnemySpawns.length];
        // Add slight jitter if running out of points
        const jitterX = i >= shuffledEnemySpawns.length ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const jitterY = i >= shuffledEnemySpawns.length ? (Math.random() > 0.5 ? 1 : -1) : 0;

        const spellSlots = m.spellcasting 
            ? (m.spellcasting.slots || getSpellSlots(m.spellcasting.class, m.spellcasting.level)) 
            : undefined;

        const t: Token = {
            id: `gen-enemy-${Date.now()}-${i}`,
            name: `${m.name} ${i+1}`,
            type: TokenType.ENEMY,
            x: Math.max(0, Math.min(gridSize.cols-1, spawn.x + jitterX)),
            y: Math.max(0, Math.min(gridSize.rows-1, spawn.y + jitterY)),
            color: '#ef4444',
            symbol: m.name.charAt(0),
            hp: m.hp,
            maxHp: m.hp,
            ac: m.ac,
            speed: Math.floor(m.speed / 5),
            stats: m.stats,
            monsterData: m,
            autoCombat: true,
            spellSlots: spellSlots,
            spellAbility: m.spellcasting?.ability,
            initiative: 0,
            level: m.spellcasting?.level || m.cr
        };
        tokens.push(calculateTokenStats(t));
    });

    // Create Drawings/Terrain Tokens based on AI Analysis
    const drawings: { x: number, y: number, data: DrawingData }[] = [];
    terrainFeatures.forEach(tf => {
        let terrainData: DrawingData = {
            type: 'marker',
            text: tf.description,
            color: '#fbbf24'
        };

        // Map AI types to Mechanics
        if (tf.type === 'difficult') {
            terrainData = { ...TERRAIN_PRESETS.difficult, text: tf.description };
        } else if (tf.type === 'cover') {
            terrainData = { ...TERRAIN_PRESETS.cover_half, text: tf.description };
        } else if (tf.type === 'hazard') {
            terrainData = { ...TERRAIN_PRESETS.hazard_fire, text: tf.description }; // Default to Fire hazard for safety
        } else {
            // Standard marker fallback
            terrainData = {
                type: 'marker',
                text: tf.description,
                color: '#fbbf24'
            };
        }

        drawings.push({
            x: tf.x,
            y: tf.y,
            data: terrainData
        });
    });

    // If Play Mode, we assume user drags players in.
    // If Watch Mode, we spawn a "Good Team".
    if (mode === 'watch') {
        const goodKeywords = ['Guard', 'Knight', 'Noble', 'Veteran', 'Priest'];
        const goodPool = MONSTER_COMPENDIUM.filter(m => goodKeywords.some(k => m.name.includes(k)) && m.cr <= maxCR);
        const shuffledPlayerSpawns = [...validPlayerSpawns].sort(() => Math.random() - 0.5);
        
        // Spawn equal number or balanced
        for(let i=0; i<Math.min(4, selectedMonsters.length); i++) {
            const m = goodPool.length > 0 ? goodPool[Math.floor(Math.random() * goodPool.length)] : MONSTER_COMPENDIUM[0]; // Fallback
            const spawn = shuffledPlayerSpawns[i % shuffledPlayerSpawns.length];
            
            const spellSlots = m.spellcasting 
                ? (m.spellcasting.slots || getSpellSlots(m.spellcasting.class, m.spellcasting.level)) 
                : undefined;

            const t: Token = {
                id: `gen-ally-${Date.now()}-${i}`,
                name: `Ally ${m.name} ${i+1}`,
                type: TokenType.PLAYER, // Treat as player type for targeting logic
                x: spawn.x,
                y: spawn.y,
                color: '#3b82f6',
                symbol: m.name.charAt(0),
                hp: m.hp,
                maxHp: m.hp,
                ac: m.ac,
                speed: Math.floor(m.speed / 5),
                stats: m.stats,
                monsterData: m,
                autoCombat: true, // AI vs AI
                initiative: 0,
                spellSlots,
                spellAbility: m.spellcasting?.ability,
                level: m.spellcasting?.level || m.cr
            };
            tokens.push(calculateTokenStats(t));
        }
    }

    return { mapBase64, tokens, drawings };
};
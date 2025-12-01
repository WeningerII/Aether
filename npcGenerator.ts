
import { AbilityScores } from '../types';
import { SRD_CLASSES, SRD_HERITAGES, SRD_BACKGROUNDS } from '../data/srd';
import { rollDie } from './gameLogic';

const FIRST_NAMES = [
    "Aelthor", "Brond", "Caelum", "Dorn", "Elara", "Faelar", "Grom", "Hylia", "Iorveth", "Juna", 
    "Kael", "Lira", "Morn", "Nyx", "Orin", "Pyra", "Quintus", "Rurik", "Sylas", "Thora",
    "Ulric", "Vesper", "Wryn", "Xander", "Yara", "Zephyr", "Baelin", "Caspian", "Darius", "Elowen"
];

const LAST_NAMES = [
    "Ironheart", "Swiftfoot", "Stormcaller", "Oakenshield", "Nightshade", "Dawnwalker", "Fireforge", 
    "Blackwood", "Winterborn", "Lightbringer", "Starwhisper", "Deepdelver", "Shadowstep", "Brightblade", 
    "Stonehammer", "Windrider", "Moonshadow", "Sunstrider", "Wildheart", "Frostbeard"
];

const PERSONALITY_TRAITS = [
    "Always polite", "Hopelessly optimistic", "Gruff but kind", "Paranoid", "Greedy", "Heroic", 
    "Cowardly", "Stoic", "Flamboyant", "Mysterious", "Chatterbox", "Silent type", "Arrogant", "Humble",
    "Scatterbrained", "Obsessive", "Lazy", "Workaholic", "Superstitious", "Skeptical"
];

const APPEARANCE_TRAITS = [
    "Scarred face", "Piercing blue eyes", "Braided hair", "Missing a finger", "Tattoos everywhere", 
    "Immaculately dressed", "Covered in dirt", "Wild hair", "Bald", "Unusually tall", "Very short", 
    "Muscular build", "Wiry frame", "Heterochromatic eyes", "Broken nose", "Always smiling", "Resting grumpy face"
];

// Class Stat Priorities (Primary, Secondary)
const CLASS_PRIORITIES: Record<string, { primary: (keyof AbilityScores)[], secondary: (keyof AbilityScores)[] }> = {
    'Barbarian': { primary: ['str', 'con'], secondary: ['dex'] },
    'Bard': { primary: ['cha'], secondary: ['dex', 'con'] },
    'Cleric': { primary: ['wis'], secondary: ['con', 'str'] },
    'Druid': { primary: ['wis'], secondary: ['con', 'dex'] },
    'Fighter': { primary: ['str', 'con'], secondary: ['dex'] }, // Defaulting to Str fighter
    'Monk': { primary: ['dex', 'wis'], secondary: ['con'] },
    'Paladin': { primary: ['str', 'cha'], secondary: ['con'] },
    'Ranger': { primary: ['dex', 'wis'], secondary: ['con'] },
    'Rogue': { primary: ['dex'], secondary: ['int', 'cha'] },
    'Sorcerer': { primary: ['cha'], secondary: ['con', 'dex'] },
    'Warlock': { primary: ['cha'], secondary: ['con', 'dex'] },
    'Wizard': { primary: ['int'], secondary: ['con', 'dex'] },
};

export interface GeneratedNPC {
    name: string;
    race: string;
    class: string;
    background: string;
    stats: AbilityScores;
    flavor: string;
    appearance: string;
}

const generateStats = (className: string): AbilityScores => {
    // Standard Array
    const values = [15, 14, 13, 12, 10, 8];
    const stats: AbilityScores = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    
    const priority = CLASS_PRIORITIES[className] || { primary: ['str'], secondary: ['con'] };
    const assigned = new Set<keyof AbilityScores>();

    // Assign Primary
    priority.primary.forEach(stat => {
        if (!assigned.has(stat) && values.length > 0) {
            stats[stat] = values.shift()!;
            assigned.add(stat);
        }
    });

    // Assign Secondary
    priority.secondary.forEach(stat => {
        if (!assigned.has(stat) && values.length > 0) {
            stats[stat] = values.shift()!;
            assigned.add(stat);
        }
    });

    // Assign Rest randomly
    const remainingStats = (['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[])
        .filter(s => !assigned.has(s));
    
    // Shuffle remaining stats for variety
    remainingStats.sort(() => Math.random() - 0.5);

    remainingStats.forEach(stat => {
        if (values.length > 0) {
            stats[stat] = values.shift()!;
        }
    });

    return stats;
};

export const generateRandomNPC = (level: number = 1): GeneratedNPC => {
    const race = SRD_HERITAGES[Math.floor(Math.random() * SRD_HERITAGES.length)].name;
    const className = SRD_CLASSES[Math.floor(Math.random() * SRD_CLASSES.length)].name;
    const background = SRD_BACKGROUNDS[Math.floor(Math.random() * SRD_BACKGROUNDS.length)].name;
    
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    
    const personality = PERSONALITY_TRAITS[Math.floor(Math.random() * PERSONALITY_TRAITS.length)];
    const appearance = APPEARANCE_TRAITS[Math.floor(Math.random() * APPEARANCE_TRAITS.length)];

    const stats = generateStats(className);

    return {
        name: `${firstName} ${lastName}`,
        race,
        class: className,
        background,
        stats,
        flavor: personality,
        appearance
    };
};


import { SRDSpell } from '../../types';

export const LEVEL_7_SPELLS: Record<string, SRDSpell> = {
    arcaneSword: {
        id: "arcane_sword", name: "Arcane Sword", level: 7, school: "Evocation", castingTime: "1 Action", range: "90 feet", components: ["V", "S", "M"],
        materialComponent: "miniature sword 250+ GP", duration: "Concentration, up to 1 minute",
        description: "Spectral sword. Melee spell attack. Hit: 4d12 Force damage.",
        damage: { diceExpression: "4d12", damageType: "force", scalingDice: "0" },
        attackRoll: true,
        concentration: true, ritual: false, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["damage", "force", "summon"]
    },
    conjureCelestial: {
        id: "conjure_celestial", name: "Conjure Celestial", level: 7, school: "Conjuration", castingTime: "1 Action", range: "90 feet", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "Summon Celestial spirit (Pillar of light). Healing Light or Searing Light (6d12 Radiant).",
        concentration: true, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["summon", "damage", "healing"]
    },
    delayedBlastFireball: {
        id: "delayed_blast_fireball", name: "Delayed Blast Fireball", level: 7, school: "Evocation", castingTime: "1 Action", range: "150 feet", components: ["V", "S", "M"],
        materialComponent: "bat guano and sulfur", duration: "Concentration, up to 1 minute",
        description: "20-foot-radius Sphere. Dexterity save. Failure: 12d6 Fire damage (+1d6/turn). Success: Half.",
        damage: { diceExpression: "12d6", damageType: "fire", scalingDice: "1d6" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "sphere", areaSize: 20,
        concentration: true, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "fire", "aoe"]
    },
    divineWord: {
        id: "divine_word", name: "Divine Word", level: 7, school: "Evocation", castingTime: "1 Bonus Action", range: "30 feet", components: ["V"], duration: "Instantaneous",
        description: "Charisma save. Failure: Effect based on HP (Kill, Stun, Blind, Deafen). Banish extraplanar.",
        savingThrow: { ability: "CHA", dc: 0 },
        concentration: false, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["control", "banish", "kill"]
    },
    etherealness: {
        id: "etherealness", name: "Etherealness", level: 7, school: "Conjuration", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "Up to 8 hours",
        description: "Enter Border Ethereal. Move in any direction.",
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["mobility", "utility"]
    },
    fingerOfDeath: {
        id: "finger_of_death", name: "Finger of Death", level: 7, school: "Necromancy", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Constitution save. Failure: 7d8 + 30 Necrotic damage. Success: Half. Kills raise as Zombie.",
        damage: { diceExpression: "7d8+30", damageType: "necrotic", scalingDice: "0" },
        savingThrow: { ability: "CON", dc: 0 },
        concentration: false, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["damage", "necrotic", "high-damage"]
    },
    fireStorm: {
        id: "fire_storm", name: "Fire Storm", level: 7, school: "Evocation", castingTime: "1 Action", range: "150 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Ten 10-foot Cubes. Dexterity save. Failure: 7d10 Fire damage. Success: Half.",
        damage: { diceExpression: "7d10", damageType: "fire", scalingDice: "0" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "cube", areaSize: 100, // Abstracted
        concentration: false, ritual: false, classes: ["Cleric", "Druid", "Sorcerer"], source: "SRD 5.2", tags: ["damage", "fire", "aoe"]
    },
    forcecage: {
        id: "forcecage", name: "Forcecage", level: 7, school: "Evocation", castingTime: "1 Action", range: "100 feet", components: ["V", "S", "M"],
        materialComponent: "ruby dust 1500+ GP", duration: "Concentration, up to 1 hour",
        description: "Invisible Cube prison. Traps creatures inside. Teleport requires Charisma save.",
        savingThrow: { ability: "CHA", dc: 0 },
        areaShape: "cube", areaSize: 20,
        concentration: true, ritual: false, classes: ["Bard", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "force"]
    },
    magnificentMansion: {
        id: "magnificent_mansion", name: "Magnificent Mansion", level: 7, school: "Conjuration", castingTime: "1 Minute", range: "300 feet", components: ["V", "S", "M"],
        materialComponent: "miniature door 15+ GP", duration: "24 hours",
        description: "Extradimensional dwelling. Food, servants.",
        concentration: false, ritual: false, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["utility"]
    },
    mirageArcane: {
        id: "mirage_arcane", name: "Mirage Arcane", level: 7, school: "Illusion", castingTime: "10 Minutes", range: "Sight", components: ["V", "S"], duration: "10 days",
        description: "Alter terrain in 1 mile square. Tactile illusion.",
        concentration: false, ritual: false, classes: ["Bard", "Druid", "Wizard"], source: "SRD 5.2", tags: ["utility", "illusion"]
    },
    planeShift: {
        id: "plane_shift", name: "Plane Shift", level: 7, school: "Conjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "tuning fork 250+ GP", duration: "Instantaneous",
        description: "Transport up to 8 creatures to another plane. Or banish creature (Charisma save).",
        savingThrow: { ability: "CHA", dc: 0 },
        concentration: false, ritual: false, classes: ["Cleric", "Druid", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "teleport", "travel"]
    },
    prismaticSpray: {
        id: "prismatic_spray", name: "Prismatic Spray", level: 7, school: "Evocation", castingTime: "1 Action", range: "Self (60-foot Cone)", components: ["V", "S"], duration: "Instantaneous",
        description: "8 rays. Dexterity save. Effect based on d8 (Fire/Acid/Lightning/Poison/Cold/Restrained/Blinded/Two Rays).",
        damage: { diceExpression: "12d6", damageType: "variable", scalingDice: "0" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "cone", areaSize: 60,
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "random", "aoe"]
    },
    projectImage: {
        id: "project_image", name: "Project Image", level: 7, school: "Illusion", castingTime: "1 Action", range: "500 miles", components: ["V", "S", "M"],
        materialComponent: "statuette 5+ GP", duration: "Concentration, up to 1 day",
        description: "Illusory copy of yourself. See/Hear through it.",
        concentration: true, ritual: false, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["utility", "illusion"]
    },
    regenerate: {
        id: "regenerate", name: "Regenerate", level: 7, school: "Transmutation", castingTime: "1 Minute", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "prayer wheel", duration: "1 hour",
        description: "Regain 4d8 + 15 HP. Regain 1 HP/turn. Regrow limbs.",
        healing: { diceExpression: "4d8+15", scalingDice: "0" },
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid"], source: "SRD 5.2", tags: ["healing"]
    },
    resurrection: {
        id: "resurrection", name: "Resurrection", level: 7, school: "Necromancy", castingTime: "1 Hour", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "diamond 1000+ GP", duration: "Instantaneous",
        description: "Revive creature dead <= 1 century. Restore missing parts.",
        healing: { diceExpression: "100", scalingDice: "0" }, // Full HP
        concentration: false, ritual: false, classes: ["Bard", "Cleric"], source: "SRD 5.2", tags: ["healing", "resurrection"]
    },
    reverseGravity: {
        id: "reverse_gravity", name: "Reverse Gravity", level: 7, school: "Transmutation", castingTime: "1 Action", range: "100 feet", components: ["V", "S", "M"],
        materialComponent: "lodestone", duration: "Concentration, up to 1 minute",
        description: "Reverse gravity in 50ft Cylinder. Dexterity save to grab object. Fall upward.",
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "sphere", areaSize: 50, 
        concentration: true, ritual: false, classes: ["Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "aoe"]
    },
    sequester: {
        id: "sequester", name: "Sequester", level: 7, school: "Transmutation", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "gem dust 5000+ GP", duration: "Until dispelled",
        description: "Object/Creature becomes Invisible and unlocatable. Suspended animation.",
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility", "stealth"]
    },
    simulacrum: {
        id: "simulacrum", name: "Simulacrum", level: 7, school: "Illusion", castingTime: "12 Hours", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "ruby dust 1500+ GP", duration: "Until dispelled",
        description: "Create snow duplicate of beast/humanoid. Half HP. Obey commands.",
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["summon", "utility"]
    },
    symbol: {
        id: "symbol", name: "Symbol", level: 7, school: "Abjuration", castingTime: "1 Minute", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "diamond dust 1000+ GP", duration: "Until dispelled",
        description: "Inscribe harmful glyph (Death, Discord, Fear, Pain, Sleep, Stunning). Triggered.",
        damage: { diceExpression: "10d10", damageType: "necrotic", scalingDice: "0" }, // For Death
        areaShape: "sphere", areaSize: 60,
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid", "Wizard"], source: "SRD 5.2", tags: ["trap", "damage", "aoe"]
    },
    teleport: {
        id: "teleport", name: "Teleport", level: 7, school: "Conjuration", castingTime: "1 Action", range: "10 feet", components: ["V"], duration: "Instantaneous",
        description: "Transport you and 8 creatures to known destination. Chance of mishap.",
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "teleport", "travel"]
    }
};

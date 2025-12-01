
import { SRDSpell } from '../../types';

export const LEVEL_6_SPELLS: Record<string, SRDSpell> = {
    arcaneGate: {
        id: "arcane_gate", name: "Arcane Gate", level: 6, school: "Conjuration", castingTime: "1 Action", range: "500 feet", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "Create two portals. Travel between them.",
        concentration: true, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "teleport"]
    },
    bladeBarrier: {
        id: "blade_barrier", name: "Blade Barrier", level: 6, school: "Evocation", castingTime: "1 Action", range: "90 feet", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "Wall of blades. Dexterity save. Failure: 6d10 Force damage. Success: Half. 3/4 Cover.",
        damage: { diceExpression: "6d10", damageType: "force", scalingDice: "1d10" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "line", areaSize: 100,
        concentration: true, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["damage", "force", "control"]
    },
    chainLightning: {
        id: "chain_lightning", name: "Chain Lightning", level: 6, school: "Evocation", castingTime: "1 Action", range: "150 feet", components: ["V", "S", "M"],
        materialComponent: "fur, amber, silver pins", duration: "Instantaneous",
        description: "Bolt hits target, then 3 others within 30ft. Dexterity save. Failure: 10d8 Lightning damage. Success: Half.",
        damage: { diceExpression: "10d8", damageType: "lightning", scalingDice: "1d8" },
        savingThrow: { ability: "DEX", dc: 0 },
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "lightning", "multi-target"]
    },
    circleOfDeath: {
        id: "circle_of_death", name: "Circle of Death", level: 6, school: "Necromancy", castingTime: "1 Action", range: "150 feet", components: ["V", "S", "M"],
        materialComponent: "crushed black pearl 500+ GP", duration: "Instantaneous",
        description: "60-foot-radius Sphere. Constitution save. Failure: 8d8 Necrotic damage. Success: Half.",
        damage: { diceExpression: "8d8", damageType: "necrotic", scalingDice: "2d8" },
        savingThrow: { ability: "CON", dc: 0 },
        areaShape: "sphere", areaSize: 60,
        concentration: false, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["damage", "necrotic", "aoe"]
    },
    conjureFey: {
        id: "conjure_fey", name: "Conjure Fey", level: 6, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "Summon Fey spirit (Medium). Attacks deal Psychic damage + Frightened.",
        concentration: true, ritual: false, classes: ["Druid"], source: "SRD 5.2", tags: ["summon", "damage"]
    },
    contingency: {
        id: "contingency", name: "Contingency", level: 6, school: "Abjuration", castingTime: "10 Minutes", range: "Self", components: ["V", "S", "M"],
        materialComponent: "statuette worth 1500+ GP", duration: "10 days",
        description: "Store a spell of level 5 or lower to trigger later.",
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility"]
    },
    createUndead: {
        id: "create_undead", name: "Create Undead", level: 6, school: "Necromancy", castingTime: "1 Minute", range: "10 feet", components: ["V", "S", "M"],
        materialComponent: "black onyx 150+ GP/corpse", duration: "Instantaneous",
        description: "Create 3 Ghouls. Control 24 hours.",
        concentration: false, ritual: false, classes: ["Cleric", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["summon", "necromancy"]
    },
    disintegrate: {
        id: "disintegrate", name: "Disintegrate", level: 6, school: "Transmutation", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "lodestone", duration: "Instantaneous",
        description: "Dexterity save. Failure: 10d6 + 40 Force damage. Zero HP = dust.",
        damage: { diceExpression: "10d6+40", damageType: "force", scalingDice: "3d6" }, 
        savingThrow: { ability: "DEX", dc: 0 },
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "force", "high-damage"]
    },
    eyebite: {
        id: "eyebite", name: "Eyebite", level: 6, school: "Necromancy", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Glare at creature within 60 feet. Wisdom save. Failure: Asleep, Panicked (Frightened/Flee), or Sickened (Poisoned).",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "debuff"]
    },
    findThePath: {
        id: "find_the_path", name: "Find the Path", level: 6, school: "Divination", castingTime: "1 Minute", range: "Self", components: ["V", "S", "M"],
        materialComponent: "divination tools 100+ GP", duration: "Concentration, up to 1 day",
        description: "Know direct route to location.",
        concentration: true, ritual: false, classes: ["Bard", "Cleric", "Druid"], source: "SRD 5.2", tags: ["utility", "navigation"]
    },
    fleshToStone: {
        id: "flesh_to_stone", name: "Flesh to Stone", level: 6, school: "Transmutation", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "cockatrice feather", duration: "Concentration, up to 1 minute",
        description: "Constitution save. Failure: Restrained. 3 successes ends. 3 failures Petrified.",
        savingThrow: { ability: "CON", dc: 0 },
        concentration: true, ritual: false, classes: ["Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "petrified"]
    },
    forbiddance: {
        id: "forbiddance", name: "Forbiddance", level: 6, school: "Abjuration", castingTime: "10 Minutes", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "ruby dust 1000+ GP", duration: "1 day",
        description: "Ward area. No teleport/planar travel. Damages specific types (5d10 Radiant/Necrotic).",
        damage: { diceExpression: "5d10", damageType: "radiant", scalingDice: "0" },
        concentration: false, ritual: true, classes: ["Cleric"], source: "SRD 5.2", tags: ["warding", "damage"]
    },
    freezingSphere: {
        id: "freezing_sphere", name: "Freezing Sphere", level: 6, school: "Evocation", castingTime: "1 Action", range: "300 feet", components: ["V", "S", "M"],
        materialComponent: "crystal sphere", duration: "Instantaneous",
        description: "60-foot-radius Sphere. Constitution save. Failure: 10d6 Cold damage. Success: Half. Freezes water.",
        damage: { diceExpression: "10d6", damageType: "cold", scalingDice: "1d6" },
        savingThrow: { ability: "CON", dc: 0 },
        areaShape: "sphere", areaSize: 60,
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "cold", "aoe"]
    },
    globeOfInvulnerability: {
        id: "globe_of_invulnerability", name: "Globe of Invulnerability", level: 6, school: "Abjuration", castingTime: "1 Action", range: "Self (10-foot Emanation)", components: ["V", "S", "M"],
        materialComponent: "glass bead", duration: "Concentration, up to 1 minute",
        description: "10-foot Emanation. Blocks spells level 5 or lower.",
        areaShape: "sphere", areaSize: 10,
        concentration: true, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["defense", "buff", "aoe"]
    },
    guardsAndWards: {
        id: "guards_and_wards", name: "Guards and Wards", level: 6, school: "Abjuration", castingTime: "10 Minutes", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "silver rod 10+ GP", duration: "24 hours",
        description: "Ward area. Fog, locks, webs, lights, magic mouth, stinking cloud, gust of wind, suggestion.",
        concentration: false, ritual: false, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["warding", "control"]
    },
    harm: {
        id: "harm", name: "Harm", level: 6, school: "Necromancy", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Constitution save. Failure: 14d6 Necrotic. Max HP reduced. Success: Half.",
        damage: { diceExpression: "14d6", damageType: "necrotic" },
        savingThrow: { ability: "CON", dc: 0 },
        concentration: false, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["damage", "necrotic", "debuff"]
    },
    heal: {
        id: "heal", name: "Heal", level: 6, school: "Abjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Regain 70 Hit Points. Cure Blindness, Deafness, Disease.",
        healing: { diceExpression: "70", scalingDice: "10" },
        concentration: false, ritual: false, classes: ["Cleric", "Druid"], source: "SRD 5.2", tags: ["healing", "restoration"]
    },
    heroesFeast: {
        id: "heroes_feast", name: "Heroes' Feast", level: 6, school: "Conjuration", castingTime: "10 Minutes", range: "Self", components: ["V", "S", "M"],
        materialComponent: "gem bowl 1000+ GP", duration: "Instantaneous",
        description: "Feast for 12. Cure diseases/poison. Immune to Poison/Frightened. Advantage Wis saves. +2d10 Max HP.",
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid"], source: "SRD 5.2", tags: ["buff", "healing"]
    },
    instantSummons: {
        id: "instant_summons", name: "Instant Summons", level: 6, school: "Conjuration", castingTime: "1 Minute", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "sapphire 1000+ GP", duration: "Until dispelled",
        description: "Mark object. Crush gem to summon object to hand.",
        concentration: false, ritual: true, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility"]
    },
    irresistibleDance: {
        id: "irresistible_dance", name: "Irresistible Dance", level: 6, school: "Enchantment", castingTime: "1 Action", range: "30 feet", components: ["V"], duration: "Concentration, up to 1 minute",
        description: "Wisdom save. Failure: Dance (Incapacitated, Speed 0). Success: Dance until end of next turn.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["control", "incapacitated"], statusEffect: "incapacitated"
    },
    magicJar: {
        id: "magic_jar", name: "Magic Jar", level: 6, school: "Necromancy", castingTime: "1 Minute", range: "Self", components: ["V", "S", "M"],
        materialComponent: "gem/container 500+ GP", duration: "Until dispelled",
        description: "Soul enters container. Possess humanoid (Charisma save).",
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["control", "possession"]
    },
    massSuggestion: {
        id: "mass_suggestion", name: "Mass Suggestion", level: 6, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V", "M"],
        materialComponent: "snake tongue", duration: "24 hours",
        description: "Up to 12 creatures. Wisdom save. Failure: Charmed and follow suggestion.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "charm", "aoe"]
    },
    moveEarth: {
        id: "move_earth", name: "Move Earth", level: 6, school: "Transmutation", castingTime: "1 Action", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "clay/earth", duration: "Concentration, up to 2 hours",
        description: "Reshape earth/sand/clay in 40ft area.",
        concentration: true, ritual: false, classes: ["Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "control"]
    },
    planarAlly: {
        id: "planar_ally", name: "Planar Ally", level: 6, school: "Conjuration", castingTime: "10 Minutes", range: "60 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Beseech entity for aid (Celestial/Elemental/Fiend). Barter for service.",
        concentration: false, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["summon", "utility"]
    },
    programmedIllusion: {
        id: "programmed_illusion", name: "Programmed Illusion", level: 6, school: "Illusion", castingTime: "1 Action", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "jade dust 25+ GP", duration: "Until dispelled",
        description: "Create illusion (30ft Cube) that activates on trigger.",
        concentration: false, ritual: false, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["utility", "illusion"]
    },
    sunbeam: {
        id: "sunbeam", name: "Sunbeam", level: 6, school: "Evocation", castingTime: "1 Action", range: "Self (60-foot Line)", components: ["V", "S", "M"],
        materialComponent: "magnifying glass", duration: "Concentration, up to 1 minute",
        description: "Line of sunlight. Constitution save. Failure: 6d8 Radiant damage and Blinded. Success: Half damage.",
        damage: { diceExpression: "6d8", damageType: "radiant", scalingDice: "0" },
        savingThrow: { ability: "CON", dc: 0 },
        areaShape: "line", areaSize: 60,
        concentration: true, ritual: false, classes: ["Cleric", "Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "radiant", "blinded", "aoe"], statusEffect: "blinded"
    },
    transportViaPlants: {
        id: "transport_via_plants", name: "Transport via Plants", level: 6, school: "Conjuration", castingTime: "1 Action", range: "10 feet", components: ["V", "S"], duration: "1 round",
        description: "Teleport via Large plant to another plant.",
        concentration: false, ritual: false, classes: ["Druid"], source: "SRD 5.2", tags: ["mobility", "teleport"]
    },
    trueSeeing: {
        id: "true_seeing", name: "True Seeing", level: 6, school: "Divination", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "ointment 25+ GP", duration: "1 hour",
        description: "Truesight 120ft. See secret doors, ethereal.",
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "buff", "vision"]
    },
    wallOfIce: {
        id: "wall_of_ice", name: "Wall of Ice", level: 6, school: "Evocation", castingTime: "1 Action", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "quartz", duration: "Concentration, up to 10 minutes",
        description: "Create ice wall. Dexterity save. Failure: 10d6 Cold damage. Moving through broken section: 5d6 Cold (Con save).",
        damage: { diceExpression: "10d6", damageType: "cold", scalingDice: "2d6" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "line", areaSize: 100,
        concentration: true, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["control", "damage", "cold"]
    },
    wallOfThorns: {
        id: "wall_of_thorns", name: "Wall of Thorns", level: 6, school: "Conjuration", castingTime: "1 Action", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "thorns", duration: "Concentration, up to 10 minutes",
        description: "Dexterity save. Failure: 7d8 Piercing damage. Move through: 7d8 Slashing (Dex save).",
        damage: { diceExpression: "7d8", damageType: "piercing", scalingDice: "1d8" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "line", areaSize: 60,
        concentration: true, ritual: false, classes: ["Druid"], source: "SRD 5.2", tags: ["control", "damage", "piercing"]
    },
    windWalk: {
        id: "wind_walk", name: "Wind Walk", level: 6, school: "Transmutation", castingTime: "1 Minute", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "fire and holy water", duration: "8 hours",
        description: "Transform into cloud. Fly 300ft. Resistance to damage.",
        concentration: false, ritual: false, classes: ["Druid"], source: "SRD 5.2", tags: ["mobility", "utility", "buff"]
    },
    wordOfRecall: {
        id: "word_of_recall", name: "Word of Recall", level: 6, school: "Conjuration", castingTime: "1 Action", range: "5 feet", components: ["V"], duration: "Instantaneous",
        description: "Teleport self and 5 willing creatures to sanctuary.",
        concentration: false, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["mobility", "teleport"]
    }
};

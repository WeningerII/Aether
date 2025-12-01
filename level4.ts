
import { SRDSpell } from '../../types';

export const LEVEL_4_SPELLS: Record<string, SRDSpell> = {
    arcaneEye: {
        id: "arcane_eye", name: "Arcane Eye", level: 4, school: "Divination", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "bat fur", duration: "Concentration, up to 1 hour",
        description: "Create invisible eye. Send it to scout (Darkvision 30ft).",
        concentration: true, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility", "scouting"]
    },
    banishment: {
        id: "banishment", name: "Banishment", level: 4, school: "Abjuration", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "a pentacle", duration: "Concentration, up to 1 minute",
        description: "Charisma save. Failure: Transport to harmless demiplane (Incapacitated). If Aberration/Celestial/Elemental/Fey/Fiend, send to home plane.",
        savingThrow: { ability: "CHA", dc: 0 },
        concentration: true, ritual: false, classes: ["Cleric", "Paladin", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "banish"], statusEffect: "incapacitated"
    },
    blackTentacles: {
        id: "black_tentacles", name: "Black Tentacles", level: 4, school: "Conjuration", castingTime: "1 Action", range: "90 feet", components: ["V", "S", "M"],
        materialComponent: "tentacle", duration: "Concentration, up to 1 minute",
        description: "20-foot square. Difficult Terrain. Dexterity save. Failure: 3d6 Bludgeoning damage and Restrained. Start turn in area: Save again.",
        damage: { diceExpression: "3d6", damageType: "bludgeoning" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "cube", areaSize: 20,
        concentration: true, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["control", "damage", "restrained", "aoe"], statusEffect: "restrained"
    },
    blight: {
        id: "blight", name: "Blight", level: 4, school: "Necromancy", castingTime: "1 Action", range: "30 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Constitution save. Failure: 8d8 Necrotic damage. Success: Half. Plants have Disadvantage/Max damage.",
        damage: { diceExpression: "8d8", damageType: "necrotic", scalingDice: "1d8" },
        savingThrow: { ability: "CON", dc: 0 },
        concentration: false, ritual: false, classes: ["Druid", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["damage", "necrotic"]
    },
    charmMonster: {
        id: "charm_monster", name: "Charm Monster", level: 4, school: "Enchantment", castingTime: "1 Action", range: "30 feet", components: ["V", "S"], duration: "1 hour",
        description: "Creature makes Wisdom save (Advantage if fighting). Failure: Charmed.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: false, ritual: false, classes: ["Bard", "Druid", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "charm"], statusEffect: "charmed"
    },
    compulsion: {
        id: "compulsion", name: "Compulsion", level: 4, school: "Enchantment", castingTime: "1 Action", range: "30 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Creatures make Wisdom save. Failure: Charmed. Bonus Action: Designate direction. Targets must move that way.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard"], source: "SRD 5.2", tags: ["control", "movement", "charm"]
    },
    confusion: {
        id: "confusion", name: "Confusion", level: 4, school: "Enchantment", castingTime: "1 Action", range: "90 feet", components: ["V", "S", "M"],
        materialComponent: "nut shells", duration: "Concentration, up to 1 minute",
        description: "10-foot-radius Sphere. Wisdom save. Failure: Random behavior (1d10).",
        savingThrow: { ability: "WIS", dc: 0 },
        areaShape: "sphere", areaSize: 10,
        concentration: true, ritual: false, classes: ["Bard", "Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "aoe", "confusion"], statusEffect: "confused"
    },
    conjureMinorElementals: {
        id: "conjure_minor_elementals", name: "Conjure Minor Elementals", level: 4, school: "Conjuration", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "15-foot Emanation of spirits. Difficult Terrain for enemies. Your attacks deal extra 2d8 Cold/Fire/Lightning/Thunder damage to creatures in emanation.",
        damage: { diceExpression: "2d8", damageType: "variable", scalingDice: "1d8" },
        concentration: true, ritual: false, classes: ["Druid", "Wizard"], source: "SRD 5.2", tags: ["buff", "damage", "area"]
    },
    conjureWoodlandBeings: {
        id: "conjure_woodland_beings", name: "Conjure Woodland Beings", level: 4, school: "Conjuration", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "10-foot Emanation. Creatures entering make Wisdom save. Failure: 5d8 Force damage. Success: Half. You can Disengage as Bonus Action.",
        damage: { diceExpression: "5d8", damageType: "force", scalingDice: "1d8" },
        concentration: true, ritual: false, classes: ["Druid", "Ranger"], source: "SRD 5.2", tags: ["damage", "force", "area"]
    },
    controlWater: {
        id: "control_water", name: "Control Water", level: 4, school: "Transmutation", castingTime: "1 Action", range: "300 feet", components: ["V", "S", "M"],
        materialComponent: "water and dust", duration: "Concentration, up to 10 minutes",
        description: "Control water in 100ft Cube: Flood, Part Water, Redirect Flow, Whirlpool (2d8 dmg).",
        areaShape: "cube", areaSize: 100,
        concentration: true, ritual: false, classes: ["Cleric", "Druid", "Wizard"], source: "SRD 5.2", tags: ["control", "utility", "water"]
    },
    deathWard: {
        id: "death_ward", name: "Death Ward", level: 4, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S"], duration: "8 hours",
        description: "Target drops to 1 HP instead of 0 the first time. Negates instant death effects.",
        concentration: false, ritual: false, classes: ["Cleric", "Paladin"], source: "SRD 5.2", tags: ["buff", "defense"]
    },
    dimensionDoor: {
        id: "dimension_door", name: "Dimension Door", level: 4, school: "Conjuration", castingTime: "1 Action", range: "500 feet", components: ["V"], duration: "Instantaneous",
        description: "Teleport yourself and one willing creature to spot within range.",
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["mobility", "teleport"]
    },
    divination: {
        id: "divination", name: "Divination", level: 4, school: "Divination", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "incense worth 25+ GP", duration: "Instantaneous",
        description: "Ask god about goal/event in next 7 days. Receive omen.",
        concentration: false, ritual: true, classes: ["Cleric", "Druid", "Wizard"], source: "SRD 5.2", tags: ["utility", "information"]
    },
    dominateBeast: {
        id: "dominate_beast", name: "Dominate Beast", level: 4, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "One Beast makes Wisdom save. Failure: Charmed and under control.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Druid", "Ranger", "Sorcerer"], source: "SRD 5.2", tags: ["control", "charm"], statusEffect: "charmed"
    },
    fabricate: {
        id: "fabricate", name: "Fabricate", level: 4, school: "Transmutation", castingTime: "10 Minutes", range: "120 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Convert raw materials into finished product (bridge, clothes).",
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility", "creation"]
    },
    faithfulHound: {
        id: "faithful_hound", name: "Faithful Hound", level: 4, school: "Conjuration", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "silver whistle", duration: "8 hours",
        description: "Invisible phantom dog. Barks at intruders. Attack: +9 to hit, 4d8 Force damage.",
        damage: { diceExpression: "4d8", damageType: "force" },
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility", "guard", "damage"]
    },
    fireShield: {
        id: "fire_shield", name: "Fire Shield", level: 4, school: "Evocation", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "phosphorus", duration: "10 minutes",
        description: "Shield wreathes you. Cold Resistance (Warm Shield) or Fire Resistance (Chill Shield). Attackers within 5ft take 2d8 damage.",
        damage: { diceExpression: "2d8", damageType: "fire" }, 
        concentration: false, ritual: false, classes: ["Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["defense", "damage", "buff"], statusEffect: "fire_shield"
    },
    freedomOfMovement: {
        id: "freedom_of_movement", name: "Freedom of Movement", level: 4, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "leather strap", duration: "1 hour",
        description: "Target ignores Difficult Terrain, speed reduction, Paralyzed, Restrained. Escape grapple for 5ft movement.",
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid", "Ranger"], source: "SRD 5.2", tags: ["buff", "mobility", "defense"], statusEffect: "freedom_of_movement"
    },
    giantInsect: {
        id: "giant_insect", name: "Giant Insect", level: 4, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "Summon Giant Centipede, Spider, or Wasp. (Updated 5.2 version: Summons spirit, not transforming bugs).",
        concentration: true, ritual: false, classes: ["Druid"], source: "SRD 5.2", tags: ["summon"]
    },
    greaterInvisibility: {
        id: "greater_invisibility", name: "Greater Invisibility", level: 4, school: "Illusion", castingTime: "1 Action", range: "Touch", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Target has Invisible condition. Doesn't end on attack/cast.",
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["buff", "invisible"], statusEffect: "invisible"
    },
    guardianOfFaith: {
        id: "guardian_of_faith", name: "Guardian of Faith", level: 4, school: "Conjuration", castingTime: "1 Action", range: "30 feet", components: ["V"], duration: "8 hours",
        description: "Spectral guardian. Enemy moving within 10ft makes Dex save. Failure: 20 Radiant damage. Success: Half. Vanishes after 60 damage dealt.",
        damage: { diceExpression: "20", damageType: "radiant" },
        savingThrow: { ability: "DEX", dc: 0 },
        concentration: false, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["summon", "damage", "radiant", "guard"]
    },
    hallucinatoryTerrain: {
        id: "hallucinatory_terrain", name: "Hallucinatory Terrain", level: 4, school: "Illusion", castingTime: "10 Minutes", range: "300 feet", components: ["V", "S", "M"],
        materialComponent: "mushroom", duration: "24 hours",
        description: "Make natural terrain look/sound/smell like other terrain (150ft Cube).",
        areaShape: "cube", areaSize: 150,
        concentration: false, ritual: false, classes: ["Bard", "Druid", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "illusion"]
    },
    iceStorm: {
        id: "ice_storm", name: "Ice Storm", level: 4, school: "Evocation", castingTime: "1 Action", range: "300 feet", components: ["V", "S", "M"],
        materialComponent: "dust and water", duration: "Instantaneous",
        description: "20-foot-radius, 40-foot-high Cylinder. Dexterity save. Failure: 2d10 Bludgeoning + 4d6 Cold. Success: Half.",
        damage: { diceExpression: "2d10+4d6", damageType: "cold", scalingDice: "1d10" }, // Scaling bludgeoning
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "sphere", areaSize: 20, 
        concentration: false, ritual: false, classes: ["Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "cold", "bludgeoning", "aoe"]
    },
    locateCreature: {
        id: "locate_creature", name: "Locate Creature", level: 4, school: "Divination", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "bloodhound fur", duration: "Concentration, up to 1 hour",
        description: "Locate creature within 1,000 feet.",
        concentration: true, ritual: false, classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Wizard"], source: "SRD 5.2", tags: ["utility", "detection"]
    },
    phantasmalKiller: {
        id: "phantasmal_killer", name: "Phantasmal Killer", level: 4, school: "Illusion", castingTime: "1 Action", range: "120 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Wisdom save. Failure: 4d10 Psychic damage and Frightened. Save ends. Repeats save at end of turns (taking damage on fail).",
        damage: { diceExpression: "4d10", damageType: "psychic", scalingDice: "1d10" },
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["damage", "psychic", "control", "fear"], statusEffect: "frightened"
    },
    polymorph: {
        id: "polymorph", name: "Polymorph", level: 4, school: "Transmutation", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "caterpillar cocoon", duration: "Concentration, up to 1 hour",
        description: "Transform creature into Beast. Wisdom save. Gains Temp HP = Beast HP. Ends if Temp HP gone.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["transmutation", "buff", "debuff"], statusEffect: "polymorphed"
    },
    privateSanctum: {
        id: "private_sanctum", name: "Private Sanctum", level: 4, school: "Abjuration", castingTime: "10 Minutes", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "sheet of lead", duration: "24 hours",
        description: "Ward area (100ft Cube). Blocks sound, vision, divination, teleportation, planar travel.",
        areaShape: "cube", areaSize: 100,
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility", "warding"]
    },
    resilientSphere: {
        id: "resilient_sphere", name: "Resilient Sphere", level: 4, school: "Evocation", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "glass sphere", duration: "Concentration, up to 1 minute",
        description: "Enclose creature in sphere. Dexterity save. Nothing passes through. Immune to damage.",
        savingThrow: { ability: "DEX", dc: 0 },
        concentration: true, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["control", "defense"], statusEffect: "invulnerable"
    },
    secretChest: {
        id: "secret_chest", name: "Secret Chest", level: 4, school: "Conjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "expensive chest and replica", duration: "Until dispelled",
        description: "Hide chest on Ethereal Plane. Summon with replica.",
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility", "storage"]
    },
    stoneShape: {
        id: "stone_shape", name: "Stone Shape", level: 4, school: "Transmutation", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "clay", duration: "Instantaneous",
        description: "Reshape stone object (Medium or smaller) or 5ft section.",
        concentration: false, ritual: false, classes: ["Cleric", "Druid", "Wizard"], source: "SRD 5.2", tags: ["utility", "creation"]
    },
    stoneskin: {
        id: "stoneskin", name: "Stoneskin", level: 4, school: "Transmutation", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "diamond dust 100gp", duration: "Concentration, up to 1 hour",
        description: "Target has Resistance to Bludgeoning, Piercing, Slashing damage.",
        concentration: true, ritual: false, classes: ["Druid", "Ranger", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["buff", "defense"], statusEffect: "stoneskin"
    },
    vitriolicSphere: {
        id: "vitriolic_sphere", name: "Vitriolic Sphere", level: 4, school: "Evocation", castingTime: "1 Action", range: "150 feet", components: ["V", "S", "M"],
        materialComponent: "drop of bile", duration: "Instantaneous",
        description: "20-foot-radius Sphere of acid. Dexterity save. Failure: 10d4 Acid initially + 5d4 end of next turn. Success: Half initial only.",
        damage: { diceExpression: "10d4", damageType: "acid", scalingDice: "2d4" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "sphere", areaSize: 20,
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "acid", "aoe"]
    },
    wallOfFire: {
        id: "wall_of_fire", name: "Wall of Fire", level: 4, school: "Evocation", castingTime: "1 Action", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "charcoal", duration: "Concentration, up to 1 minute",
        description: "Wall 60ft long or 20ft ring. Dexterity save when appearing (5d8 Fire). One side deals 5d8 Fire damage to creatures near it.",
        damage: { diceExpression: "5d8", damageType: "fire", scalingDice: "1d8" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "line", areaSize: 60,
        concentration: true, ritual: false, classes: ["Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "damage", "fire", "aoe"]
    }
};

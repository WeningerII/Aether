
import { SRDSpell } from '../../types';

export const LEVEL_3_SPELLS: Record<string, SRDSpell> = {
    animateDead: {
        id: "animate_dead", name: "Animate Dead", level: 3, school: "Necromancy", castingTime: "1 Minute", range: "10 feet", components: ["V", "S", "M"],
        materialComponent: "blood, flesh, bone dust", duration: "Instantaneous",
        description: "Create Skeleton or Zombie servant. Control lasts 24 hours.",
        concentration: false, ritual: false, classes: ["Cleric", "Wizard"], source: "SRD 5.2", tags: ["summon", "necromancy"]
    },
    beaconOfHope: {
        id: "beacon_of_hope", name: "Beacon of Hope", level: 3, school: "Abjuration", castingTime: "1 Action", range: "30 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Creatures gain Advantage on Wis/Death saves. Regain max HP from healing.",
        concentration: true, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["buff", "healing"], statusEffect: "beacon_of_hope"
    },
    bestowCurse: {
        id: "bestow_curse", name: "Bestow Curse", level: 3, school: "Necromancy", castingTime: "1 Action", range: "Touch", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Wisdom save or cursed. Choose: Disadvantage on Ability, Disadvantage on Attacks vs you, Wis save to act, or Extra 1d8 Necrotic damage.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Cleric", "Wizard"], source: "SRD 5.2", tags: ["debuff", "control"], statusEffect: "cursed"
    },
    blink: {
        id: "blink", name: "Blink", level: 3, school: "Transmutation", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "1 minute",
        description: "Roll d6 at end of turn. 4-6: Vanish to Ethereal Plane.",
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["defense", "mobility"], statusEffect: "blink"
    },
    callLightning: {
        id: "call_lightning", name: "Call Lightning", level: 3, school: "Conjuration", castingTime: "1 Action", range: "120 feet", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "Call bolt (5ft radius). Dexterity save. Failure: 3d10 Lightning damage. Success: Half.",
        damage: { diceExpression: "3d10", damageType: "lightning", scalingDice: "1d10" },
        savingThrow: { ability: "DEX", dc: 0 },
        concentration: true, ritual: false, classes: ["Druid"], source: "SRD 5.2", tags: ["damage", "lightning", "aoe"]
    },
    clairvoyance: {
        id: "clairvoyance", name: "Clairvoyance", level: 3, school: "Divination", castingTime: "10 Minutes", range: "1 mile", components: ["V", "S", "M"],
        materialComponent: "focus worth 100+ GP", duration: "Concentration, up to 10 minutes",
        description: "Create invisible sensor to see or hear.",
        concentration: true, ritual: false, classes: ["Bard", "Cleric", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "scouting"]
    },
    conjureAnimals: {
        id: "conjure_animals", name: "Conjure Animals", level: 3, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "Summon Large pack of spectral animals. Advantage on Str saves within 5ft. Move pack. Pack forces Dex save on nearby enemies. Failure: 3d10 Slashing damage.",
        damage: { diceExpression: "3d10", damageType: "slashing", scalingDice: "1d10" },
        concentration: true, ritual: false, classes: ["Druid", "Ranger"], source: "SRD 5.2", tags: ["summon", "damage"]
    },
    counterspell: {
        id: "counterspell", name: "Counterspell", level: 3, school: "Abjuration", castingTime: "1 Reaction", range: "60 feet", components: ["S"], duration: "Instantaneous",
        description: "Interrupt casting. Target makes Con save. Failure: Spell dissipates.",
        concentration: false, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["defense", "control"]
    },
    createFoodAndWater: {
        id: "create_food_and_water", name: "Create Food and Water", level: 3, school: "Conjuration", castingTime: "1 Action", range: "30 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Create 45 lbs food, 30 gallons water.",
        concentration: false, ritual: false, classes: ["Cleric", "Paladin"], source: "SRD 5.2", tags: ["utility", "food"]
    },
    daylight: {
        id: "daylight", name: "Daylight", level: 3, school: "Evocation", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "1 hour",
        description: "60-foot-radius Sphere of Bright Light (Sunlight?). Sheds Dim Light extra 60ft.",
        concentration: false, ritual: false, classes: ["Cleric", "Druid", "Paladin", "Ranger", "Sorcerer"], source: "SRD 5.2", tags: ["utility", "light"]
    },
    dispelMagic: {
        id: "dispel_magic", name: "Dispel Magic", level: 3, school: "Abjuration", castingTime: "1 Action", range: "120 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "End spell on target. Level 3 or lower ends auto. Higher level requires Ability Check DC 10+Level.",
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid", "Paladin", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "control"]
    },
    fear: {
        id: "fear", name: "Fear", level: 3, school: "Illusion", castingTime: "1 Action", range: "Self (30-foot Cone)", components: ["V", "S", "M"],
        materialComponent: "white feather", duration: "Concentration, up to 1 minute",
        description: "Creatures in Cone must succeed on Wisdom save or drop items and become Frightened. Must Dash away.",
        savingThrow: { ability: "WIS", dc: 0 },
        areaShape: "cone", areaSize: 30,
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "fear", "aoe"], statusEffect: "frightened"
    },
    fireball: { 
        id: "fireball", name: "Fireball", level: 3, school: "Evocation", castingTime: "1 Action", range: "150 feet", components: ["V", "S", "M"],
        materialComponent: "bat guano and sulfur", duration: "Instantaneous", 
        description: "20-foot-radius Sphere. Dexterity save. Failure: 8d6 Fire damage. Success: Half.", 
        damage: { diceExpression: "8d6", damageType: "fire", scalingDice: "1d6" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "sphere", areaSize: 20,
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "fire", "aoe"]
    },
    fly: {
        id: "fly", name: "Fly", level: 3, school: "Transmutation", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "feather", duration: "Concentration, up to 10 minutes",
        description: "Target gains Fly Speed 60ft and Hover.",
        concentration: true, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["mobility", "buff"], statusEffect: "flying"
    },
    gaseousForm: {
        id: "gaseous_form", name: "Gaseous Form", level: 3, school: "Transmutation", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "gauze", duration: "Concentration, up to 1 hour",
        description: "Transform into mist. Fly 10ft (Hover). Resistance to nonmagical damage. Adv on Str/Dex/Con saves.",
        concentration: true, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "mobility", "buff"]
    },
    glyphOfWarding: {
        id: "glyph_of_warding", name: "Glyph of Warding", level: 3, school: "Abjuration", castingTime: "1 Hour", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "diamond dust worth 200+ GP", duration: "Until dispelled",
        description: "Inscribe glyph. Explosive Runes (5d8 damage) or Spell Glyph.",
        damage: { diceExpression: "5d8", damageType: "fire", scalingDice: "1d8" }, 
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "sphere", areaSize: 20,
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Wizard"], source: "SRD 5.2", tags: ["trap", "damage", "aoe"]
    },
    haste: { 
        id: "haste", name: "Haste", level: 3, school: "Transmutation", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "licorice root", duration: "Concentration, up to 1 minute", 
        description: "Speed doubled, +2 AC, Adv Dex Saves, Extra Action (Attack/Dash/Disengage/Hide/Utilize). Lethargy when ends.", 
        concentration: true, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["buff", "speed"], statusEffect: "haste"
    },
    hypnoticPattern: {
        id: "hypnotic_pattern", name: "Hypnotic Pattern", level: 3, school: "Illusion", castingTime: "1 Action", range: "120 feet", components: ["S", "M"],
        materialComponent: "confetti", duration: "Concentration, up to 1 minute",
        description: "30-foot Cube. Wisdom save. Failure: Charmed, Incapacitated, Speed 0.",
        savingThrow: { ability: "WIS", dc: 0 },
        areaShape: "cube", areaSize: 30,
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "charm", "aoe"], statusEffect: "incapacitated"
    },
    lightningBolt: { 
        id: "lightning_bolt", name: "Lightning Bolt", level: 3, school: "Evocation", castingTime: "1 Action", range: "Self (100-foot Line)", components: ["V", "S", "M"],
        materialComponent: "fur and crystal rod", duration: "Instantaneous", 
        description: "100-foot-long, 5-foot-wide Line. Dexterity save. Failure: 8d6 Lightning damage. Success: Half.", 
        damage: { diceExpression: "8d6", damageType: "lightning", scalingDice: "1d6" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "line", areaSize: 100,
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "lightning", "aoe"]
    },
    magicCircle: {
        id: "magic_circle", name: "Magic Circle", level: 3, school: "Abjuration", castingTime: "1 Minute", range: "10 feet", components: ["V", "S", "M"],
        materialComponent: "salt and silver worth 100+ GP", duration: "1 hour",
        description: "10-foot-radius Cylinder. Protects against Celestial, Elemental, Fey, Fiend, Undead. Disadvantage on attacks vs inside.",
        areaShape: "sphere", areaSize: 10,
        concentration: false, ritual: false, classes: ["Cleric", "Paladin", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["defense", "warding"]
    },
    majorImage: {
        id: "major_image", name: "Major Image", level: 3, school: "Illusion", castingTime: "1 Action", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "fleece", duration: "Concentration, up to 10 minutes",
        description: "Create visual/auditory/olfactory/thermal illusion (20ft Cube). Study (Investigation) to discern.",
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["illusion", "utility"]
    },
    massHealingWord: {
        id: "mass_healing_word", name: "Mass Healing Word", level: 3, school: "Abjuration", castingTime: "1 Bonus Action", range: "60 feet", components: ["V"], duration: "Instantaneous",
        description: "Up to six creatures regain 2d4 + mod HP.",
        healing: { diceExpression: "2d4", scalingDice: "1d4" },
        concentration: false, ritual: false, classes: ["Bard", "Cleric"], source: "SRD 5.2", tags: ["healing", "aoe"]
    },
    meldIntoStone: {
        id: "meld_into_stone", name: "Meld into Stone", level: 3, school: "Transmutation", castingTime: "1 Action", range: "Touch", components: ["V", "S"], duration: "8 hours",
        description: "Merge into stone object. Can't see outside. Taking damage expels you.",
        concentration: false, ritual: true, classes: ["Cleric", "Druid", "Ranger"], source: "SRD 5.2", tags: ["utility", "stealth"]
    },
    nondetection: {
        id: "nondetection", name: "Nondetection", level: 3, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "diamond dust worth 25+ GP", duration: "8 hours",
        description: "Hide target from Divination magic.",
        concentration: false, ritual: false, classes: ["Bard", "Ranger", "Wizard"], source: "SRD 5.2", tags: ["utility", "stealth"]
    },
    phantomSteed: {
        id: "phantom_steed", name: "Phantom Steed", level: 3, school: "Illusion", castingTime: "1 Minute", range: "30 feet", components: ["V", "S"], duration: "1 hour",
        description: "Summon Large quasi-real mount. Speed 100ft.",
        concentration: false, ritual: true, classes: ["Wizard"], source: "SRD 5.2", tags: ["summon", "mobility", "utility"]
    },
    plantGrowth: {
        id: "plant_growth", name: "Plant Growth", level: 3, school: "Transmutation", castingTime: "1 Action", range: "150 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Overgrowth: 100ft radius. Movement costs 4ft per 1ft. Enrichment: 8 hours cast, enriches land.",
        areaShape: "sphere", areaSize: 100,
        concentration: false, ritual: false, classes: ["Bard", "Druid", "Ranger"], source: "SRD 5.2", tags: ["control", "utility", "terrain"]
    },
    protectionFromEnergy: {
        id: "protection_from_energy", name: "Protection from Energy", level: 3, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S"], duration: "Concentration, up to 1 hour",
        description: "Touch creature. Gain Resistance to Acid, Cold, Fire, Lightning, or Thunder.",
        concentration: true, ritual: false, classes: ["Cleric", "Druid", "Ranger", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["buff", "defense"], statusEffect: "resistance"
    },
    removeCurse: {
        id: "remove_curse", name: "Remove Curse", level: 3, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S"], duration: "Instantaneous",
        description: "End all curses on target. Break attunement to cursed items.",
        concentration: false, ritual: false, classes: ["Cleric", "Paladin", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["restoration", "utility"]
    },
    revivify: { 
        id: "revivify", name: "Revivify", level: 3, school: "Necromancy", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "diamond worth 300+ GP", duration: "Instantaneous", 
        description: "Revive creature dead < 1 minute. 1 HP.", 
        healing: { diceExpression: "1" },
        concentration: false, ritual: false, classes: ["Cleric", "Druid", "Paladin", "Ranger"], source: "SRD 5.2", tags: ["healing", "resurrection"]
    },
    sending: {
        id: "sending", name: "Sending", level: 3, school: "Divination", castingTime: "1 Action", range: "Unlimited", components: ["V", "S", "M"],
        materialComponent: "copper wire", duration: "Instantaneous",
        description: "Send message to creature anywhere. They can reply.",
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Wizard"], source: "SRD 5.2", tags: ["communication", "utility"]
    },
    sleetStorm: {
        id: "sleet_storm", name: "Sleet Storm", level: 3, school: "Conjuration", castingTime: "1 Action", range: "150 feet", components: ["V", "S", "M"],
        materialComponent: "dust and water", duration: "Concentration, up to 1 minute",
        description: "20-foot-radius, 40-foot-high Cylinder. Heavily Obscured. Difficult Terrain. Dexterity save or Prone. Concentration check required.",
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "sphere", areaSize: 20,
        concentration: true, ritual: false, classes: ["Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "aoe", "prone"]
    },
    slow: {
        id: "slow", name: "Slow", level: 3, school: "Transmutation", castingTime: "1 Action", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "drop of molasses", duration: "Concentration, up to 1 minute",
        description: "Up to six creatures in 40ft Cube. Wisdom save. Failure: Speed halved, -2 AC/Dex saves, no Reaction, limited action.",
        savingThrow: { ability: "WIS", dc: 0 },
        areaShape: "cube", areaSize: 40,
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["debuff", "control", "aoe"], statusEffect: "slowed"
    },
    speakWithDead: {
        id: "speak_with_dead", name: "Speak with Dead", level: 3, school: "Necromancy", castingTime: "1 Action", range: "10 feet", components: ["V", "S", "M"],
        materialComponent: "burning incense", duration: "10 minutes",
        description: "Ask 5 questions to corpse.",
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Wizard"], source: "SRD 5.2", tags: ["utility", "information"]
    },
    speakWithPlants: {
        id: "speak_with_plants", name: "Speak with Plants", level: 3, school: "Transmutation", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "10 minutes",
        description: "Imbue plants with limited sentience. Communicate with them. Turn Difficult Terrain normal.",
        concentration: false, ritual: false, classes: ["Bard", "Druid", "Ranger"], source: "SRD 5.2", tags: ["utility", "communication"]
    },
    spiritGuardians: {
        id: "spirit_guardians", name: "Spirit Guardians", level: 3, school: "Conjuration", castingTime: "1 Action", range: "Self (15-foot Emanation)", components: ["V", "S", "M"],
        materialComponent: "prayer scroll", duration: "Concentration, up to 10 minutes",
        description: "Spirits flit around you. Halves Speed. Wisdom save. Failure: 3d8 Radiant/Necrotic. Success: Half.",
        damage: { diceExpression: "3d8", damageType: "radiant", scalingDice: "1d8" },
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["damage", "radiant", "aoe"]
    },
    stinkingCloud: {
        id: "stinking_cloud", name: "Stinking Cloud", level: 3, school: "Conjuration", castingTime: "1 Action", range: "90 feet", components: ["V", "S", "M"],
        materialComponent: "rotten egg", duration: "Concentration, up to 1 minute",
        description: "20-foot-radius Sphere. Heavily Obscured. Constitution save. Failure: Poisoned condition (action lost to retching).",
        savingThrow: { ability: "CON", dc: 0 },
        areaShape: "sphere", areaSize: 20,
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "aoe", "poison"]
    },
    tinyHut: {
        id: "tiny_hut", name: "Tiny Hut", level: 3, school: "Evocation", castingTime: "1 Minute", range: "Self", components: ["V", "S", "M"],
        materialComponent: "crystal bead", duration: "8 hours",
        description: "10-foot Emanation dome. Comfortable, dry, opaque from outside. Blocks spells.",
        concentration: false, ritual: true, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["utility", "defense"]
    },
    tongues: {
        id: "tongues", name: "Tongues", level: 3, school: "Divination", castingTime: "1 Action", range: "Touch", components: ["V", "M"],
        materialComponent: "miniature ziggurat", duration: "1 hour",
        description: "Creature understands any spoken/signed language.",
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "communication"]
    },
    vampiricTouch: {
        id: "vampiric_touch", name: "Vampiric Touch", level: 3, school: "Necromancy", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Make melee spell attack. Hit: 3d6 Necrotic damage. Regain HP equal to half damage.",
        damage: { diceExpression: "3d6", damageType: "necrotic", scalingDice: "1d6" },
        attackRoll: true,
        concentration: true, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["damage", "necrotic", "healing"]
    },
    waterBreathing: {
        id: "water_breathing", name: "Water Breathing", level: 3, school: "Transmutation", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "short reed", duration: "24 hours",
        description: "Up to ten creatures can breathe underwater.",
        concentration: false, ritual: true, classes: ["Druid", "Ranger", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "buff"]
    },
    waterWalk: {
        id: "water_walk", name: "Water Walk", level: 3, school: "Transmutation", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "cork", duration: "1 hour",
        description: "Up to ten creatures can move across liquid surfaces.",
        concentration: false, ritual: true, classes: ["Cleric", "Druid", "Ranger", "Sorcerer"], source: "SRD 5.2", tags: ["utility", "mobility"]
    },
    windWall: {
        id: "wind_wall", name: "Wind Wall", level: 3, school: "Evocation", castingTime: "1 Action", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "fan and feather", duration: "Concentration, up to 1 minute",
        description: "Wall of wind (50ft long). Strength save. Failure: 3d8 Bludgeoning damage. Deflects projectiles.",
        damage: { diceExpression: "3d8", damageType: "bludgeoning" },
        savingThrow: { ability: "STR", dc: 0 },
        areaShape: "line", areaSize: 50,
        concentration: true, ritual: false, classes: ["Druid", "Ranger"], source: "SRD 5.2", tags: ["control", "damage", "wind"]
    }
};

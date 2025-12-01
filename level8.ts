
import { SRDSpell } from '../../types';

export const LEVEL_8_SPELLS: Record<string, SRDSpell> = {
    animalShapes: {
        id: "animal_shapes", name: "Animal Shapes", level: 8, school: "Transmutation", castingTime: "1 Action", range: "30 feet", components: ["V", "S"], duration: "24 hours",
        description: "Transform willing creatures into Beasts (CR 4 max). Gain Temp HP.",
        concentration: false, ritual: false, classes: ["Druid"], source: "SRD 5.2", tags: ["transmutation", "buff"]
    },
    antimagicField: {
        id: "antimagic_field", name: "Antimagic Field", level: 8, school: "Abjuration", castingTime: "1 Action", range: "Self (10-foot Emanation)", components: ["V", "S", "M"],
        materialComponent: "iron filings", duration: "Concentration, up to 1 hour",
        description: "10-foot Emanation suppresses magic.",
        areaShape: "sphere", areaSize: 10,
        concentration: true, ritual: false, classes: ["Cleric", "Wizard"], source: "SRD 5.2", tags: ["control", "defense", "aoe"]
    },
    antipathySympathy: {
        id: "antipathy_sympathy", name: "Antipathy/Sympathy", level: 8, school: "Enchantment", castingTime: "1 Hour", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "vinegar and honey", duration: "10 days",
        description: "Object repels (Frightened) or attracts (Charmed) specific creature type. Wisdom save.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: false, ritual: false, classes: ["Bard", "Druid", "Wizard"], source: "SRD 5.2", tags: ["control", "warding"]
    },
    befuddlement: {
        id: "befuddlement", name: "Befuddlement", level: 8, school: "Enchantment", castingTime: "1 Action", range: "150 feet", components: ["V", "S", "M"],
        materialComponent: "key ring", duration: "Instantaneous",
        description: "Blast mind. Intelligence save. Failure: 10d12 Psychic damage and can't cast spells. Repeat save every 30 days.",
        damage: { diceExpression: "10d12", damageType: "psychic", scalingDice: "0" },
        savingThrow: { ability: "INT", dc: 0 },
        concentration: false, ritual: false, classes: ["Bard", "Druid", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["damage", "psychic", "debuff"], statusEffect: "stunned"
    },
    clone: {
        id: "clone", name: "Clone", level: 8, school: "Necromancy", castingTime: "1 Hour", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "diamond 1000+ GP and vessel 2000+ GP", duration: "Instantaneous",
        description: "Grow clone body. Soul transfers on death.",
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility", "necromancy"]
    },
    controlWeather: {
        id: "control_weather", name: "Control Weather", level: 8, school: "Transmutation", castingTime: "10 Minutes", range: "Self", components: ["V", "S", "M"],
        materialComponent: "incense", duration: "Concentration, up to 8 hours",
        description: "Change weather within 5 miles.",
        concentration: true, ritual: false, classes: ["Cleric", "Druid", "Wizard"], source: "SRD 5.2", tags: ["utility", "control"]
    },
    demiplane: {
        id: "demiplane", name: "Demiplane", level: 8, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["S"], duration: "1 hour",
        description: "Open door to 30ft empty room demiplane.",
        concentration: false, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility"]
    },
    dominateMonster: {
        id: "dominate_monster", name: "Dominate Monster", level: 8, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 1 hour",
        description: "Creature makes Wisdom save. Failure: Charmed and controlled.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "charm"], statusEffect: "charmed"
    },
    earthquake: {
        id: "earthquake", name: "Earthquake", level: 8, school: "Evocation", castingTime: "1 Action", range: "500 feet", components: ["V", "S", "M"],
        materialComponent: "fractured rock", duration: "Concentration, up to 1 minute",
        description: "100-foot-radius circle tremor. Dexterity save. Failure: Prone. Fissures (1d10x10ft deep). Structures collapse (50 bludgeoning).",
        damage: { diceExpression: "12d6", damageType: "bludgeoning", scalingDice: "0" }, // Structure collapse damage to creatures
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "sphere", areaSize: 100,
        concentration: true, ritual: false, classes: ["Cleric", "Druid", "Sorcerer"], source: "SRD 5.2", tags: ["control", "damage", "aoe"]
    },
    glibness: {
        id: "glibness", name: "Glibness", level: 8, school: "Enchantment", castingTime: "1 Action", range: "Self", components: ["V"], duration: "1 hour",
        description: "Replace Charisma check roll with 15. Magic can't detect lies.",
        concentration: false, ritual: false, classes: ["Bard", "Warlock"], source: "SRD 5.2", tags: ["social", "utility"]
    },
    holyAura: {
        id: "holy_aura", name: "Holy Aura", level: 8, school: "Abjuration", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "reliquary 1000+ GP", duration: "Concentration, up to 1 minute",
        description: "30-foot Emanation. Allies Advantage on saves. Enemies Disadvantage on attacks. Fiend/Undead hitting melee: Con save or Blinded.",
        areaShape: "sphere", areaSize: 30,
        concentration: true, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["buff", "defense", "aoe"]
    },
    incendiaryCloud: {
        id: "incendiary_cloud", name: "Incendiary Cloud", level: 8, school: "Conjuration", castingTime: "1 Action", range: "150 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "20-foot-radius Sphere. Heavily Obscured. Dexterity save. Failure: 10d8 Fire. Success: Half. Moves 10ft away.",
        damage: { diceExpression: "10d8", damageType: "fire", scalingDice: "0" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "sphere", areaSize: 20,
        concentration: true, ritual: false, classes: ["Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "fire", "aoe"]
    },
    maze: {
        id: "maze", name: "Maze", level: 8, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "Banish creature to labyrinth demiplane. DC 20 Intelligence (Investigation) check to escape.",
        concentration: true, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["control", "banish"], statusEffect: "incapacitated"
    },
    mindBlank: {
        id: "mind_blank", name: "Mind Blank", level: 8, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S"], duration: "24 hours",
        description: "Immunity to Psychic damage, Charmed, divination, mind reading.",
        concentration: false, ritual: false, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["defense", "buff"]
    },
    powerWordStun: {
        id: "power_word_stun", name: "Power Word Stun", level: 8, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V"], duration: "Instantaneous",
        description: "If target has 150 HP or fewer, it is Stunned. Con save at end of turns to end.",
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "stun"], statusEffect: "stunned"
    },
    sunburst: {
        id: "sunburst", name: "Sunburst", level: 8, school: "Evocation", castingTime: "1 Action", range: "150 feet", components: ["V", "S", "M"],
        materialComponent: "sunstone", duration: "Instantaneous",
        description: "60-foot-radius Sphere. Constitution save. Failure: 12d6 Radiant and Blinded 1 min. Success: Half.",
        damage: { diceExpression: "12d6", damageType: "radiant", scalingDice: "0" },
        savingThrow: { ability: "CON", dc: 0 },
        areaShape: "sphere", areaSize: 60,
        concentration: false, ritual: false, classes: ["Cleric", "Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "radiant", "blinded", "aoe"], statusEffect: "blinded"
    },
    tsunami: {
        id: "tsunami", name: "Tsunami", level: 8, school: "Conjuration", castingTime: "1 Minute", range: "1 mile", components: ["V", "S"], duration: "Concentration, up to 6 rounds",
        description: "Wall of water 300ft long. Strength save. Failure: 6d10 Bludgeoning. Moves 50ft/round.",
        damage: { diceExpression: "6d10", damageType: "bludgeoning", scalingDice: "0" },
        savingThrow: { ability: "STR", dc: 0 },
        concentration: true, ritual: false, classes: ["Druid"], source: "SRD 5.2", tags: ["control", "damage"]
    }
};

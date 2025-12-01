
import { SRDSpell } from '../../types';

export const LEVEL_9_SPELLS: Record<string, SRDSpell> = {
    astralProjection: {
        id: "astral_projection", name: "Astral Projection", level: 9, school: "Necromancy", castingTime: "1 Hour", range: "10 feet", components: ["V", "S", "M"],
        materialComponent: "jacinth 1000+ GP and silver bar 100+ GP", duration: "Until dispelled",
        description: "Project astral bodies for self + 8 creatures into Astral Plane. Bodies Unconscious.",
        concentration: false, ritual: false, classes: ["Cleric", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "travel"]
    },
    foresight: {
        id: "foresight", name: "Foresight", level: 9, school: "Divination", castingTime: "1 Minute", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "hummingbird feather", duration: "8 hours",
        description: "Target can't be Surprised. Advantage on attacks/checks/saves. Attacks vs target have Disadvantage.",
        concentration: false, ritual: false, classes: ["Bard", "Druid", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["buff", "advantage"], statusEffect: "foresight"
    },
    gate: {
        id: "gate", name: "Gate", level: 9, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "diamond 5000+ GP", duration: "Concentration, up to 1 minute",
        description: "Create portal to other plane. Can summon specific creature.",
        concentration: true, ritual: false, classes: ["Cleric", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "travel", "summon"]
    },
    imprisonment: {
        id: "imprisonment", name: "Imprisonment", level: 9, school: "Abjuration", castingTime: "1 Minute", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "statuette 5000+ GP", duration: "Until dispelled",
        description: "Magically restrain creature (Burial, Chaining, Hedged Prison, Minimus, Slumber). Wisdom save.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: false, ritual: false, classes: ["Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "banish"]
    },
    massHeal: {
        id: "mass_heal", name: "Mass Heal", level: 9, school: "Evocation", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Restore 700 Hit Points divided among creatures. Cure Blinded/Deafened/Poisoned/Diseases.",
        healing: { diceExpression: "700", scalingDice: "0" },
        concentration: false, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["healing", "restoration"]
    },
    meteorSwarm: {
        id: "meteor_swarm", name: "Meteor Swarm", level: 9, school: "Evocation", castingTime: "1 Action", range: "1 mile", components: ["V", "S"], duration: "Instantaneous",
        description: "Four 40-foot-radius Spheres. Dexterity save. Failure: 20d6 Fire + 20d6 Bludgeoning. Success: Half.",
        damage: { diceExpression: "40d6", damageType: "fire", scalingDice: "0" }, // Combined
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "sphere", areaSize: 40,
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "fire", "bludgeoning", "aoe"]
    },
    powerWordHeal: {
        id: "power_word_heal", name: "Power Word Heal", level: 9, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V"], duration: "Instantaneous",
        description: "Target regains all Hit Points. End Charmed, Frightened, Paralyzed, Poisoned, Stunned. Prone can stand up.",
        healing: { diceExpression: "999", scalingDice: "0" }, // Full heal
        concentration: false, ritual: false, classes: ["Bard", "Cleric"], source: "SRD 5.2", tags: ["healing", "restoration"]
    },
    powerWordKill: {
        id: "power_word_kill", name: "Power Word Kill", level: 9, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V"], duration: "Instantaneous",
        description: "If target has 100 HP or fewer, it dies. Otherwise 12d12 Psychic damage.",
        damage: { diceExpression: "12d12", damageType: "psychic", scalingDice: "0" },
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["damage", "kill"]
    },
    prismaticWall: {
        id: "prismatic_wall", name: "Prismatic Wall", level: 9, school: "Abjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "10 minutes",
        description: "Multicolored wall. 7 layers (Red, Orange, Yellow, Green, Blue, Indigo, Violet). Deals damage/effects passing through.",
        damage: { diceExpression: "50d6", damageType: "variable", scalingDice: "0" }, // Symbolic high damage
        concentration: false, ritual: false, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["defense", "damage", "wall"]
    },
    shapechange: {
        id: "shapechange", name: "Shapechange", level: 9, school: "Transmutation", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "jade circlet 1500+ GP", duration: "Concentration, up to 1 hour",
        description: "Transform into creature (CR <= Level). Gain Temp HP. Retain mental stats/class features.",
        concentration: true, ritual: false, classes: ["Druid", "Wizard"], source: "SRD 5.2", tags: ["transmutation", "buff"]
    },
    stormOfVengeance: {
        id: "storm_of_vengeance", name: "Storm of Vengeance", level: 9, school: "Conjuration", castingTime: "1 Action", range: "1 mile", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "300ft radius storm. Round 1: 2d6 Thunder + Deafened. Round 2: Acid rain (4d6). Round 3: Lightning (10d6). Round 4: Hail (2d6 Bludgeoning). Round 5-10: Cold/Wind.",
        concentration: true, ritual: false, classes: ["Druid"], source: "SRD 5.2", tags: ["damage", "aoe", "control"]
    },
    timeStop: {
        id: "time_stop", name: "Time Stop", level: 9, school: "Transmutation", castingTime: "1 Action", range: "Self", components: ["V"], duration: "Instantaneous",
        description: "Take 1d4 + 1 turns in a row. Ends if you affect another creature.",
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "time", "buff"], statusEffect: "haste"
    },
    truePolymorph: {
        id: "true_polymorph", name: "True Polymorph", level: 9, school: "Transmutation", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "mercury, gum arabic, smoke", duration: "Concentration, up to 1 hour",
        description: "Transform creature to creature/object, or object to creature. Permanent if concentrated full duration.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["transmutation", "control"]
    },
    trueResurrection: {
        id: "true_resurrection", name: "True Resurrection", level: 9, school: "Necromancy", castingTime: "1 Hour", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "diamond 25000+ GP", duration: "Instantaneous",
        description: "Revive creature dead <= 200 years. Full HP. Cures everything. Replaces body.",
        healing: { diceExpression: "999", scalingDice: "0" }, // Full heal
        concentration: false, ritual: false, classes: ["Cleric", "Druid"], source: "SRD 5.2", tags: ["healing", "resurrection"]
    },
    weird: {
        id: "weird", name: "Weird", level: 9, school: "Illusion", castingTime: "1 Action", range: "120 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "30-foot-radius Sphere. Wisdom save. Failure: 10d10 Psychic damage + Frightened. Repeats save w/ damage.",
        damage: { diceExpression: "10d10", damageType: "psychic", scalingDice: "0" },
        savingThrow: { ability: "WIS", dc: 0 },
        areaShape: "sphere", areaSize: 30,
        concentration: true, ritual: false, classes: ["Warlock", "Wizard"], source: "SRD 5.2", tags: ["damage", "psychic", "fear", "aoe"]
    },
    wish: {
        id: "wish", name: "Wish", level: 9, school: "Conjuration", castingTime: "1 Action", range: "Self", components: ["V"], duration: "Instantaneous",
        description: "Duplicate 8th level spell (no component/cost). Or Create Object (25k GP), Instant Health (Full heal 20 creatures), Resistance (10 creatures, permanent), Spell Immunity (10 creatures, 8 hours), Sudden Learning (Feat swap), Roll Redo, Reshape Reality. Stress mechanic.",
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "versatile"]
    }
};

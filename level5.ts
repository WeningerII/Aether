
import { SRDSpell } from '../../types';

export const LEVEL_5_SPELLS: Record<string, SRDSpell> = {
    animateObjects: {
        id: "animate_objects", name: "Animate Objects", level: 5, school: "Transmutation", castingTime: "1 Action", range: "120 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Animate up to 10 objects. They become Constructs and attack.",
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["summon", "damage", "control"]
    },
    antilifeShell: {
        id: "antilife_shell", name: "Antilife Shell", level: 5, school: "Abjuration", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "Concentration, up to 1 hour",
        description: "10-foot Emanation prevents creatures (except Constructs/Undead) from passing.",
        areaShape: "sphere", areaSize: 10,
        concentration: true, ritual: false, classes: ["Druid"], source: "SRD 5.2", tags: ["defense", "control", "barrier"]
    },
    arcaneHand: {
        id: "arcane_hand", name: "Arcane Hand", level: 5, school: "Evocation", castingTime: "1 Action", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "eggshell and glove", duration: "Concentration, up to 1 minute",
        description: "Large hand. Clenched Fist (5d8 Force), Forceful Hand (Push), Grasping Hand (Grapple + 4d6), Interposing Hand (Cover).",
        concentration: true, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["summon", "damage", "force"]
    },
    awaken: {
        id: "awaken", name: "Awaken", level: 5, school: "Transmutation", castingTime: "8 Hours", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "agate worth 1000+ GP", duration: "Instantaneous",
        description: "Give intelligence to Beast or Plant.",
        concentration: false, ritual: false, classes: ["Bard", "Druid"], source: "SRD 5.2", tags: ["utility", "buff", "charm"]
    },
    cloudkill: {
        id: "cloudkill", name: "Cloudkill", level: 5, school: "Conjuration", castingTime: "1 Action", range: "120 feet", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "20-foot-radius Sphere. Heavily Obscured. Constitution save. Failure: 5d8 Poison damage. Success: Half. Moves 10ft away.",
        damage: { diceExpression: "5d8", damageType: "poison", scalingDice: "1d8" },
        savingThrow: { ability: "CON", dc: 0 },
        areaShape: "sphere", areaSize: 20,
        concentration: true, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "poison", "aoe", "control"]
    },
    commune: {
        id: "commune", name: "Commune", level: 5, school: "Divination", castingTime: "1 Minute", range: "Self", components: ["V", "S", "M"],
        materialComponent: "incense", duration: "1 minute",
        description: "Ask 3 questions to deity (Yes/No).",
        concentration: false, ritual: true, classes: ["Cleric"], source: "SRD 5.2", tags: ["utility", "information"]
    },
    communeWithNature: {
        id: "commune_with_nature", name: "Commune with Nature", level: 5, school: "Divination", castingTime: "1 Minute", range: "Self", components: ["V", "S"], duration: "Instantaneous",
        description: "Learn 3 facts about area within 3 miles (e.g. settlements, monsters, water).",
        concentration: false, ritual: true, classes: ["Druid", "Ranger"], source: "SRD 5.2", tags: ["utility", "information"]
    },
    coneOfCold: {
        id: "cone_of_cold", name: "Cone of Cold", level: 5, school: "Evocation", castingTime: "1 Action", range: "Self (60-foot Cone)", components: ["V", "S", "M"],
        materialComponent: "crystal cone", duration: "Instantaneous",
        description: "Constitution save. Failure: 8d8 Cold damage. Success: Half.",
        damage: { diceExpression: "8d8", damageType: "cold", scalingDice: "1d8" },
        savingThrow: { ability: "CON", dc: 0 },
        areaShape: "cone", areaSize: 60,
        concentration: false, ritual: false, classes: ["Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "cold", "aoe"]
    },
    conjureElemental: {
        id: "conjure_elemental", name: "Conjure Elemental", level: 5, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "Summon Large Elemental spirit. Air/Earth/Fire/Water. Attacks and can Restrain. (Updated 5.2 version is a spirit, not CR 5 monster stat block).",
        concentration: true, ritual: false, classes: ["Druid", "Wizard"], source: "SRD 5.2", tags: ["summon", "damage"]
    },
    contactOtherPlane: {
        id: "contact_other_plane", name: "Contact Other Plane", level: 5, school: "Divination", castingTime: "1 Minute", range: "Self", components: ["V"], duration: "1 minute",
        description: "Contact entity. Intelligence save DC 15. Failure: 6d6 Psychic damage and Incapacitated. Success: 5 questions.",
        damage: { diceExpression: "6d6", damageType: "psychic" },
        concentration: false, ritual: true, classes: ["Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "information", "risk"]
    },
    contagion: {
        id: "contagion", name: "Contagion", level: 5, school: "Necromancy", castingTime: "1 Action", range: "Touch", components: ["V", "S"], duration: "7 days",
        description: "Touch creature. Constitution save. Failure: 11d8 Necrotic damage, Poisoned, and Disadvantage on an ability. Repeats save to end.",
        damage: { diceExpression: "11d8", damageType: "necrotic" },
        concentration: false, ritual: false, classes: ["Cleric", "Druid"], source: "SRD 5.2", tags: ["debuff", "damage", "necrotic", "poisoned"], statusEffect: "poisoned"
    },
    creation: {
        id: "creation", name: "Creation", level: 5, school: "Illusion", castingTime: "1 Minute", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "paintbrush", duration: "Special",
        description: "Create object of vegetable or mineral matter (5ft Cube). Duration depends on material.",
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "creation"]
    },
    dispelEvilAndGood: {
        id: "dispel_evil_and_good", name: "Dispel Evil and Good", level: 5, school: "Abjuration", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "holy water", duration: "Concentration, up to 1 minute",
        description: "Disadvantage on attacks from Celestials, Elementals, Fey, Fiends, Undead. Break Enchantment or Dismiss.",
        concentration: true, ritual: false, classes: ["Cleric", "Paladin"], source: "SRD 5.2", tags: ["defense", "utility", "banish"], statusEffect: "protected_evil_good"
    },
    dominatePerson: {
        id: "dominate_person", name: "Dominate Person", level: 5, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Humanoid makes Wisdom save. Failure: Charmed and controlled.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "charm"], statusEffect: "charmed"
    },
    dream: {
        id: "dream", name: "Dream", level: 5, school: "Illusion", castingTime: "1 Minute", range: "Special", components: ["V", "S", "M"],
        materialComponent: "sand", duration: "8 hours",
        description: "Enter dreams of target. Message or Nightmare (3d6 Psychic damage + no rest).",
        concentration: false, ritual: false, classes: ["Bard", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "communication", "psychic"]
    },
    flameStrike: {
        id: "flame_strike", name: "Flame Strike", level: 5, school: "Evocation", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "sulfur", duration: "Instantaneous",
        description: "10-foot-radius Cylinder. Dexterity save. Failure: 5d6 Fire + 5d6 Radiant damage. Success: Half.",
        damage: { diceExpression: "5d6+5d6", damageType: "fire" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "sphere", areaSize: 10,
        concentration: false, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["damage", "fire", "radiant", "aoe"]
    },
    geas: {
        id: "geas", name: "Geas", level: 5, school: "Enchantment", castingTime: "1 Minute", range: "60 feet", components: ["V"], duration: "30 days",
        description: "Command creature. Wisdom save. Failure: Charmed. 5d10 Psychic damage if disobeys.",
        savingThrow: { ability: "WIS", dc: 0 },
        damage: { diceExpression: "5d10", damageType: "psychic" },
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid", "Paladin", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "charm", "damage"], statusEffect: "geas"
    },
    greaterRestoration: {
        id: "greater_restoration", name: "Greater Restoration", level: 5, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "diamond dust worth 100+ GP", duration: "Instantaneous",
        description: "Reduce Exhaustion. End Charm, Petrification, Curse, Stat reduction, Max HP reduction.",
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid"], source: "SRD 5.2", tags: ["healing", "restoration"]
    },
    hallow: {
        id: "hallow", name: "Hallow", level: 5, school: "Evocation", castingTime: "24 Hours", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "incense worth 1000+ GP", duration: "Until dispelled",
        description: "Ward area (60ft radius). Block specific types. Add extra effect (Courage, Darkness, Daylight, Fear, Silence, etc).",
        concentration: false, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["utility", "buff", "debuff", "warding"]
    },
    holdMonster: {
        id: "hold_monster", name: "Hold Monster", level: 5, school: "Enchantment", castingTime: "1 Action", range: "90 feet", components: ["V", "S", "M"],
        materialComponent: "iron piece", duration: "Concentration, up to 1 minute",
        description: "Creature makes Wisdom save. Failure: Paralyzed. Repeats save at end of turns.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "paralyzed"], statusEffect: "paralyzed"
    },
    insectPlague: {
        id: "insect_plague", name: "Insect Plague", level: 5, school: "Conjuration", castingTime: "1 Action", range: "300 feet", components: ["V", "S", "M"],
        materialComponent: "locust", duration: "Concentration, up to 10 minutes",
        description: "20-foot-radius Sphere. Lightly Obscured. Difficult Terrain. Constitution save. Failure: 4d10 Piercing damage. Success: Half.",
        damage: { diceExpression: "4d10", damageType: "piercing", scalingDice: "1d10" },
        savingThrow: { ability: "CON", dc: 0 },
        areaShape: "sphere", areaSize: 20,
        concentration: true, ritual: false, classes: ["Cleric", "Druid", "Sorcerer"], source: "SRD 5.2", tags: ["damage", "piercing", "aoe", "control"]
    },
    legendLore: {
        id: "legend_lore", name: "Legend Lore", level: 5, school: "Divination", castingTime: "10 Minutes", range: "Self", components: ["V", "S", "M"],
        materialComponent: "incense worth 250+ GP", duration: "Instantaneous",
        description: "Learn lore about a person, place, or object.",
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Wizard"], source: "SRD 5.2", tags: ["utility", "information"]
    },
    massCureWounds: {
        id: "mass_cure_wounds", name: "Mass Cure Wounds", level: 5, school: "Evocation", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Choose up to six creatures in a 30-foot Sphere. Regain 5d8 + mod HP.",
        healing: { diceExpression: "5d8", scalingDice: "1d8" },
        areaShape: "sphere", areaSize: 30,
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid"], source: "SRD 5.2", tags: ["healing", "aoe"]
    },
    mislead: {
        id: "mislead", name: "Mislead", level: 5, school: "Illusion", castingTime: "1 Action", range: "Self", components: ["S"], duration: "Concentration, up to 1 hour",
        description: "You become Invisible. Illusory double appears. You can perceive through double.",
        concentration: true, ritual: false, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["utility", "illusion", "defense"], statusEffect: "invisible"
    },
    modifyMemory: {
        id: "modify_memory", name: "Modify Memory", level: 5, school: "Enchantment", castingTime: "1 Action", range: "30 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Wisdom save. Failure: Charmed and Incapacitated. Modify memory of event within 24 hours.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["control", "charm", "utility"], statusEffect: "incapacitated"
    },
    passwall: {
        id: "passwall", name: "Passwall", level: 5, school: "Transmutation", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "sesame seeds", duration: "1 hour",
        description: "Create passage through wooden/plaster/stone surface.",
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility", "exploration"]
    },
    planarBinding: {
        id: "planar_binding", name: "Planar Binding", level: 5, school: "Abjuration", castingTime: "1 Hour", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "jewel worth 1000+ GP", duration: "24 hours",
        description: "Bind Celestial, Elemental, Fey, Fiend. Charisma save.",
        savingThrow: { ability: "CHA", dc: 0 },
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid", "Wizard"], source: "SRD 5.2", tags: ["control", "summon"]
    },
    raiseDead: {
        id: "raise_dead", name: "Raise Dead", level: 5, school: "Necromancy", castingTime: "1 Hour", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "diamond worth 500+ GP", duration: "Instantaneous",
        description: "Revive creature dead <= 10 days. 1 HP. -4 penalty to D20 Tests.",
        healing: { diceExpression: "1" },
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Paladin"], source: "SRD 5.2", tags: ["healing", "resurrection"]
    },
    reincarnate: {
        id: "reincarnate", name: "Reincarnate", level: 5, school: "Transmutation", castingTime: "1 Hour", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "rare oils worth 1000+ GP", duration: "Instantaneous",
        description: "Create new body for dead humanoid (dead <= 10 days). Random species.",
        concentration: false, ritual: false, classes: ["Druid"], source: "SRD 5.2", tags: ["healing", "resurrection"]
    },
    scrying: {
        id: "scrying", name: "Scrying", level: 5, school: "Divination", castingTime: "10 Minutes", range: "Self", components: ["V", "S", "M"],
        materialComponent: "focus worth 1000+ GP", duration: "Concentration, up to 10 minutes",
        description: "See and hear creature on same plane. Wisdom save (modifiers apply).",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Cleric", "Druid", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "scouting"]
    },
    seeming: {
        id: "seeming", name: "Seeming", level: 5, school: "Illusion", castingTime: "1 Action", range: "30 feet", components: ["V", "S"], duration: "8 hours",
        description: "Change appearance of any number of creatures. Charisma save to avoid.",
        savingThrow: { ability: "CHA", dc: 0 },
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "illusion", "social"]
    },
    summonDragon: {
        id: "summon_dragon", name: "Summon Dragon", level: 5, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "dragon object worth 500+ GP", duration: "Concentration, up to 1 hour",
        description: "Summon Draconic Spirit. Attacks and Breath Weapon.",
        concentration: true, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["summon", "damage"]
    },
    telekisnesis: {
        id: "telekinesis", name: "Telekinesis", level: 5, school: "Transmutation", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "Move object/creature. Strength save vs Restrained.",
        concentration: true, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "utility", "movement"]
    },
    telepathicBond: {
        id: "telepathic_bond", name: "Telepathic Bond", level: 5, school: "Divination", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "egg shells", duration: "1 hour",
        description: "Link up to 8 creatures telepathically.",
        concentration: false, ritual: true, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["utility", "communication", "buff"]
    },
    teleportationCircle: {
        id: "teleportation_circle", name: "Teleportation Circle", level: 5, school: "Conjuration", castingTime: "1 Minute", range: "10 feet", components: ["V", "M"],
        materialComponent: "inks worth 50+ GP", duration: "1 round",
        description: "Create portal to permanent circle.",
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "teleport"]
    },
    treeStride: {
        id: "tree_stride", name: "Tree Stride", level: 5, school: "Conjuration", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Step into tree and exit another within 500 feet.",
        concentration: true, ritual: false, classes: ["Druid", "Ranger"], source: "SRD 5.2", tags: ["mobility", "teleport"]
    },
    wallOfForce: {
        id: "wall_of_force", name: "Wall of Force", level: 5, school: "Evocation", castingTime: "1 Action", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "glass shard", duration: "Concentration, up to 10 minutes",
        description: "Invisible wall. Immune to damage.",
        areaShape: "line", areaSize: 100,
        concentration: true, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["control", "defense"]
    },
    wallOfStone: {
        id: "wall_of_stone", name: "Wall of Stone", level: 5, school: "Evocation", castingTime: "1 Action", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "granite", duration: "Concentration, up to 10 minutes",
        description: "Create stone wall. Dexterity save to avoid being enclosed.",
        areaShape: "line", areaSize: 100,
        concentration: true, ritual: false, classes: ["Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "defense", "utility"]
    }
};

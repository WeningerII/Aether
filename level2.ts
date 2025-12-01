
import { SRDSpell } from '../../types';

export const LEVEL_2_SPELLS: Record<string, SRDSpell> = {
    acidArrow: {
        id: "acid_arrow", name: "Acid Arrow", level: 2, school: "Evocation", castingTime: "1 Action", range: "90 feet", components: ["V", "S", "M"],
        materialComponent: "powdered rhubarb leaf", duration: "Instantaneous",
        description: "Ranged spell attack. Hit: 4d4 Acid damage immediately and 2d4 at end of next turn. Miss: Half initial damage only.",
        damage: { diceExpression: "4d4", damageType: "acid", scalingDice: "1d4" }, // Scaling applies to both initial and secondary
        attackRoll: true,
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["damage", "acid"]
    },
    aid: {
        id: "aid", name: "Aid", level: 2, school: "Abjuration", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "strip of white cloth", duration: "8 hours",
        description: "Choose up to three creatures. Their Max HP and current HP increase by 5.",
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger"], source: "SRD 5.2", tags: ["healing", "buff", "max_hp"]
    },
    alterSelf: {
        id: "alter_self", name: "Alter Self", level: 2, school: "Transmutation", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "Concentration, up to 1 hour",
        description: "Choose: Aquatic Adaptation (Swim/Breathe), Change Appearance, or Natural Weapons (1d6 damage + spell mod). Can change option as Magic action.",
        concentration: true, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "transmutation", "buff"]
    },
    animalMessenger: {
        id: "animal_messenger", name: "Animal Messenger", level: 2, school: "Enchantment", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "morsel of food", duration: "24 hours",
        description: "Choose a Tiny beast. It travels to deliver a message (25 words).",
        concentration: false, ritual: true, classes: ["Bard", "Druid", "Ranger"], source: "SRD 5.2", tags: ["utility", "communication"]
    },
    arcaneLock: {
        id: "arcane_lock", name: "Arcane Lock", level: 2, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "gold dust worth 25+ GP", duration: "Until dispelled",
        description: "Magically lock a door, window, or chest. Increases lock DC by 10.",
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility", "protection"]
    },
    arcanistsMagicAura: {
        id: "arcanists_magic_aura", name: "Arcanist's Magic Aura", level: 2, school: "Illusion", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "square of silk", duration: "24 hours",
        description: "Mask a creature or object from divination magic (False Aura or Mask).",
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility", "illusion"]
    },
    augury: {
        id: "augury", name: "Augury", level: 2, school: "Divination", castingTime: "1 Minute", range: "Self", components: ["V", "S", "M"],
        materialComponent: "divinatory tokens worth 25+ GP", duration: "Instantaneous",
        description: "Receive an omen (Weal, Woe, Weal and Woe, Indifference) about result of specific course of action in next 30 mins.",
        concentration: false, ritual: true, classes: ["Cleric", "Druid", "Wizard"], source: "SRD 5.2", tags: ["utility", "divination"]
    },
    barkskin: {
        id: "barkskin", name: "Barkskin", level: 2, school: "Transmutation", castingTime: "1 Bonus Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "handful of bark", duration: "1 hour",
        description: "Touch willing creature. Target's AC becomes 17 if lower. (Duration is NOT concentration in 5.2!)",
        concentration: false, ritual: false, classes: ["Druid", "Ranger"], source: "SRD 5.2", tags: ["buff", "defense"]
    },
    blindnessDeafness: {
        id: "blindness_deafness", name: "Blindness/Deafness", level: 2, school: "Transmutation", castingTime: "1 Action", range: "120 feet", components: ["V"], duration: "1 minute",
        description: "One creature you see. Constitution save. Failure: Blinded or Deafened (your choice). Repeats save at end of turns.",
        savingThrow: { ability: "CON", dc: 0 },
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["debuff", "blinded"], statusEffect: "blinded"
    },
    blur: {
        id: "blur", name: "Blur", level: 2, school: "Illusion", castingTime: "1 Action", range: "Self", components: ["V"], duration: "Concentration, up to 1 minute",
        description: "Attack rolls against you have Disadvantage unless attacker uses Blindsight/Truesight.",
        concentration: true, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["defense", "buff"]
    },
    calmEmotions: {
        id: "calm_emotions", name: "Calm Emotions", level: 2, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Humanoids in 20-foot Sphere make Charisma save. Failure: Suppress Charm/Frighten OR make Indifferent.",
        savingThrow: { ability: "CHA", dc: 0 },
        areaShape: "sphere", areaSize: 20,
        concentration: true, ritual: false, classes: ["Bard", "Cleric"], source: "SRD 5.2", tags: ["control", "charm"]
    },
    continualFlame: {
        id: "continual_flame", name: "Continual Flame", level: 2, school: "Evocation", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "ruby dust worth 50+ GP", duration: "Until dispelled",
        description: "Permanent flame (no heat) on an object. Sheds light.",
        concentration: false, ritual: false, classes: ["Cleric", "Druid", "Wizard"], source: "SRD 5.2", tags: ["utility", "light"]
    },
    darkness: {
        id: "darkness", name: "Darkness", level: 2, school: "Evocation", castingTime: "1 Action", range: "60 feet", components: ["V", "M"],
        materialComponent: "bat fur and coal", duration: "Concentration, up to 10 minutes",
        description: "15-foot-radius Sphere of magical darkness. Darkvision doesn't work. Nonmagical light suppressed.",
        concentration: true, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "darkness"]
    },
    darkvision: {
        id: "darkvision", name: "Darkvision", level: 2, school: "Transmutation", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "dried carrot", duration: "8 hours",
        description: "Touch willing creature. It gains Darkvision 150 feet.",
        concentration: false, ritual: false, classes: ["Druid", "Ranger", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "buff", "vision"]
    },
    detectThoughts: {
        id: "detect_thoughts", name: "Detect Thoughts", level: 2, school: "Divination", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "a copper piece", duration: "Concentration, up to 1 minute",
        description: "Read surface thoughts of creatures within 30 feet. Can probe deeper (Wisdom save).",
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "social"]
    },
    dragonsBreath: {
        id: "dragons_breath", name: "Dragon's Breath", level: 2, school: "Transmutation", castingTime: "1 Bonus Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "a hot pepper", duration: "Concentration, up to 1 minute",
        description: "Touch willing creature. It can use Magic action to exhale 15ft cone (Acid/Cold/Fire/Lightning/Poison). 3d6 damage (Dex save half).",
        damage: { diceExpression: "3d6", damageType: "variable", scalingDice: "1d6" },
        concentration: true, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["buff", "damage"]
    },
    enhanceAbility: {
        id: "enhance_ability", name: "Enhance Ability", level: 2, school: "Transmutation", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "fur or feather", duration: "Concentration, up to 1 hour",
        description: "Target gains Advantage on checks with one Ability. (Bear/Bull/Cat/Eagle/Fox/Owl).",
        concentration: true, ritual: false, classes: ["Bard", "Cleric", "Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["buff", "utility"]
    },
    enlargeReduce: {
        id: "enlarge_reduce", name: "Enlarge/Reduce", level: 2, school: "Transmutation", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "powdered iron", duration: "Concentration, up to 1 minute",
        description: "Change size of creature/object (Constitution save). Enlarge: Advantage Str checks/saves, +1d4 damage. Reduce: Disadvantage Str, -1d4 damage.",
        concentration: true, ritual: false, classes: ["Bard", "Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["buff", "debuff", "utility"]
    },
    enthrall: {
        id: "enthrall", name: "Enthrall", level: 2, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Creatures must succeed on Wisdom save or have Disadvantage on Perception checks to notice anything else.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Warlock"], source: "SRD 5.2", tags: ["control", "social"]
    },
    findSteed: {
        id: "find_steed", name: "Find Steed", level: 2, school: "Conjuration", castingTime: "1 Action", range: "30 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Summon Otherworldly Steed (Celestial/Fey/Fiend). Serves as mount.",
        concentration: false, ritual: false, classes: ["Paladin"], source: "SRD 5.2", tags: ["summon", "utility"]
    },
    findTraps: {
        id: "find_traps", name: "Find Traps", level: 2, school: "Divination", castingTime: "1 Action", range: "120 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Sense presence of traps within line of sight. Reveals nature but not exact location.",
        concentration: false, ritual: false, classes: ["Cleric", "Druid", "Ranger"], source: "SRD 5.2", tags: ["utility", "detection"]
    },
    flameBlade: {
        id: "flame_blade", name: "Flame Blade", level: 2, school: "Evocation", castingTime: "1 Bonus Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "sumac leaf", duration: "Concentration, up to 10 minutes",
        description: "Evoke fiery blade. Melee spell attack. 3d6 Fire damage.",
        damage: { diceExpression: "3d6", damageType: "fire", scalingDice: "1d6" },
        concentration: true, ritual: false, classes: ["Druid", "Sorcerer"], source: "SRD 5.2", tags: ["damage", "fire", "weapon"]
    },
    flamingSphere: {
        id: "flaming_sphere", name: "Flaming Sphere", level: 2, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "ball of wax", duration: "Concentration, up to 1 minute",
        description: "Create 5-ft sphere of fire. Dexterity save for creatures within 5 ft: 2d6 Fire damage. Move as Bonus Action.",
        damage: { diceExpression: "2d6", damageType: "fire", scalingDice: "1d6" },
        savingThrow: { ability: "DEX", dc: 0 },
        concentration: true, ritual: false, classes: ["Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "fire", "control"]
    },
    gentleRepose: {
        id: "gentle_repose", name: "Gentle Repose", level: 2, school: "Necromancy", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "2 copper pieces", duration: "10 days",
        description: "Protect corpse from decay and becoming Undead. Extends raise dead timer.",
        concentration: false, ritual: true, classes: ["Cleric", "Paladin", "Wizard"], source: "SRD 5.2", tags: ["utility", "ritual"]
    },
    gustOfWind: {
        id: "gust_of_wind", name: "Gust of Wind", level: 2, school: "Evocation", castingTime: "1 Action", range: "Self (60-foot Line)", components: ["V", "S", "M"],
        materialComponent: "legume seed", duration: "Concentration, up to 1 minute",
        description: "Strong wind pushes creatures 15 feet (Strength save). Cost 2 ft movement per 1 ft.",
        savingThrow: { ability: "STR", dc: 0 },
        areaShape: "line", areaSize: 60,
        concentration: true, ritual: false, classes: ["Druid", "Ranger", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "push"]
    },
    heatMetal: {
        id: "heat_metal", name: "Heat Metal", level: 2, school: "Transmutation", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "piece of iron", duration: "Concentration, up to 1 minute",
        description: "Choose metal object. 2d8 Fire damage to creature touching it. Bonus action to deal again. Con save or drop object/Disadvantage.",
        damage: { diceExpression: "2d8", damageType: "fire", scalingDice: "1d8" },
        concentration: true, ritual: false, classes: ["Bard", "Druid"], source: "SRD 5.2", tags: ["damage", "fire", "debuff"]
    },
    holdPerson: { 
        id: "hold_person", name: "Hold Person", level: 2, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "piece of iron", duration: "Concentration, up to 1 minute", 
        description: "Humanoid within range must succeed on Wisdom save or have Paralyzed condition. Repeats save at end of turns.", 
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Cleric", "Druid", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "paralyzed"], statusEffect: "paralyzed"
    },
    invisibility: { 
        id: "invisibility", name: "Invisibility", level: 2, school: "Illusion", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "eyelash in gum arabic", duration: "Concentration, up to 1 hour", 
        description: "Creature has Invisible condition. Ends if it attacks or casts a spell.", 
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["buff", "invisible"], statusEffect: "invisible"
    },
    knock: {
        id: "knock", name: "Knock", level: 2, school: "Transmutation", castingTime: "1 Action", range: "60 feet", components: ["V"], duration: "Instantaneous",
        description: "Unlock/Unbar object. Suppresses Arcane Lock.",
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility"]
    },
    lesserRestoration: {
        id: "lesser_restoration", name: "Lesser Restoration", level: 2, school: "Abjuration", castingTime: "1 Bonus Action", range: "Touch", components: ["V", "S"], duration: "Instantaneous",
        description: "End one condition: Blinded, Deafened, Paralyzed, or Poisoned.",
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger"], source: "SRD 5.2", tags: ["healing", "restoration"]
    },
    levitate: {
        id: "levitate", name: "Levitate", level: 2, school: "Transmutation", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "metal spring", duration: "Concentration, up to 10 minutes",
        description: "One creature or object rises 20 feet. Constitution save negates.",
        savingThrow: { ability: "CON", dc: 0 },
        concentration: true, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "utility", "mobility"]
    },
    locateAnimalsOrPlants: {
        id: "locate_animals_or_plants", name: "Locate Animals or Plants", level: 2, school: "Divination", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "bloodhound fur", duration: "Instantaneous",
        description: "Find direction/distance to specific kind of beast/plant within 5 miles.",
        concentration: false, ritual: true, classes: ["Bard", "Druid", "Ranger"], source: "SRD 5.2", tags: ["utility", "detection"]
    },
    locateObject: {
        id: "locate_object", name: "Locate Object", level: 2, school: "Divination", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "forked twig", duration: "Concentration, up to 10 minutes",
        description: "Sense direction to object within 1,000 feet.",
        concentration: true, ritual: false, classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Wizard"], source: "SRD 5.2", tags: ["utility", "detection"]
    },
    magicMouth: {
        id: "magic_mouth", name: "Magic Mouth", level: 2, school: "Illusion", castingTime: "1 Minute", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "jade dust worth 10+ GP", duration: "Until dispelled",
        description: "Implant a message on an object that triggers on condition.",
        concentration: false, ritual: true, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["utility", "illusion"]
    },
    magicWeapon: {
        id: "magic_weapon", name: "Magic Weapon", level: 2, school: "Transmutation", castingTime: "1 Bonus Action", range: "Touch", components: ["V", "S"], duration: "Concentration, up to 1 hour",
        description: "Nonmagical weapon becomes magic +1.",
        concentration: true, ritual: false, classes: ["Paladin", "Ranger", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["buff", "combat"]
    },
    mindSpike: {
        id: "mind_spike", name: "Mind Spike", level: 2, school: "Divination", castingTime: "1 Action", range: "120 feet", components: ["S"], duration: "Concentration, up to 1 hour",
        description: "Target takes 3d8 Psychic damage (Wisdom save half). On fail, you know its location.",
        damage: { diceExpression: "3d8", damageType: "psychic", scalingDice: "1d8" },
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["damage", "psychic", "tracking"]
    },
    mirrorImage: {
        id: "mirror_image", name: "Mirror Image", level: 2, school: "Illusion", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "1 minute",
        description: "Three duplicates. Roll d20 to see if attack hits duplicate.",
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["defense", "buff"], statusEffect: "mirror_image"
    },
    mistyStep: { 
        id: "misty_step", name: "Misty Step", level: 2, school: "Conjuration", castingTime: "1 Bonus Action", range: "Self", components: ["V"], duration: "Instantaneous", 
        description: "Teleport up to 30 feet to unoccupied space you see.", 
        concentration: false, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["mobility", "teleport"]
    },
    moonbeam: {
        id: "moonbeam", name: "Moonbeam", level: 2, school: "Evocation", castingTime: "1 Action", range: "120 feet", components: ["V", "S", "M"],
        materialComponent: "moonseed leaf", duration: "Concentration, up to 1 minute",
        description: "5-foot-radius Cylinder. Constitution save. Failure: 2d10 Radiant damage. Shapechangers have Disadvantage.",
        damage: { diceExpression: "2d10", damageType: "radiant", scalingDice: "1d10" },
        savingThrow: { ability: "CON", dc: 0 },
        concentration: true, ritual: false, classes: ["Druid"], source: "SRD 5.2", tags: ["damage", "radiant", "aoe"]
    },
    passWithoutTrace: {
        id: "pass_without_trace", name: "Pass without Trace", level: 2, school: "Abjuration", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "ashes of mistletoe", duration: "Concentration, up to 1 hour",
        description: "30-foot Emanation. You and creatures chosen gain +10 Stealth.",
        concentration: true, ritual: false, classes: ["Druid", "Ranger"], source: "SRD 5.2", tags: ["buff", "stealth"]
    },
    prayerOfHealing: {
        id: "prayer_of_healing", name: "Prayer of Healing", level: 2, school: "Abjuration", castingTime: "10 Minutes", range: "30 feet", components: ["V"], duration: "Instantaneous",
        description: "Up to 5 creatures gain benefits of Short Rest and regain 2d8 Hit Points. Can't affect same creature again until Long Rest.",
        healing: { diceExpression: "2d8", scalingDice: "1d8" },
        concentration: false, ritual: false, classes: ["Cleric", "Paladin"], source: "SRD 5.2", tags: ["healing"]
    },
    protectionFromPoison: {
        id: "protection_from_poison", name: "Protection from Poison", level: 2, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S"], duration: "1 hour",
        description: "End Poisoned condition. Grant Advantage vs Poison and Resistance to Poison damage.",
        concentration: false, ritual: false, classes: ["Cleric", "Druid", "Paladin", "Ranger"], source: "SRD 5.2", tags: ["buff", "defense"]
    },
    rayOfEnfeeblement: {
        id: "ray_of_enfeeblement", name: "Ray of Enfeeblement", level: 2, school: "Necromancy", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Ranged spell attack. Hit: Target has Disadvantage on Strength attacks. Repeats Constitution save at end of turns to end.",
        attackRoll: true,
        concentration: true, ritual: false, classes: ["Warlock", "Wizard"], source: "SRD 5.2", tags: ["debuff", "necrotic"], statusEffect: "enfeebled"
    },
    ropeTrick: {
        id: "rope_trick", name: "Rope Trick", level: 2, school: "Transmutation", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "rope segment", duration: "1 hour",
        description: "Rope rises to extradimensional space for 8 creatures.",
        concentration: false, ritual: false, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility", "defense"]
    },
    scorchingRay: { 
        id: "scorching_ray", name: "Scorching Ray", level: 2, school: "Evocation", castingTime: "1 Action", range: "120 feet", components: ["V", "S"], duration: "Instantaneous", 
        description: "Hurl three rays. Ranged spell attack for each. Hit: 2d6 Fire damage. One extra ray per slot level above 2.", 
        damage: { diceExpression: "2d6", damageType: "fire" },
        attackRoll: true,
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "fire", "multiattack"]
    },
    seeInvisibility: {
        id: "see_invisibility", name: "See Invisibility", level: 2, school: "Divination", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "talc", duration: "1 hour",
        description: "See Invisible creatures and into Ethereal Plane.",
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "vision"]
    },
    shatter: { 
        id: "shatter", name: "Shatter", level: 2, school: "Evocation", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "mica chip", duration: "Instantaneous", 
        description: "10-foot-radius Sphere. Constitution save. Failure: 3d8 Thunder damage. Success: Half. Constructs Disadvantage.", 
        damage: { diceExpression: "3d8", damageType: "thunder", scalingDice: "1d8" },
        savingThrow: { ability: "CON", dc: 0 },
        areaShape: "sphere", areaSize: 10,
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["damage", "thunder", "aoe"]
    },
    shiningSmite: {
        id: "shining_smite", name: "Shining Smite", level: 2, school: "Transmutation", castingTime: "1 Bonus Action", range: "Self", components: ["V"], duration: "Concentration, up to 1 minute",
        description: "Next hit deals extra 2d6 Radiant. Target sheds bright light, attacks against it have Advantage, can't be Invisible.",
        damage: { diceExpression: "2d6", damageType: "radiant", scalingDice: "1d6" },
        concentration: true, ritual: false, classes: ["Paladin"], source: "SRD 5.2", tags: ["damage", "radiant", "buff", "bonus_action"], statusEffect: "glittering"
    },
    silence: {
        id: "silence", name: "Silence", level: 2, school: "Illusion", castingTime: "1 Action", range: "120 feet", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "20-foot-radius Sphere. No sound. Immune to Thunder damage. Deafened. No Verbal components.",
        areaShape: "sphere", areaSize: 20,
        concentration: true, ritual: true, classes: ["Bard", "Cleric", "Ranger"], source: "SRD 5.2", tags: ["control", "utility"]
    },
    spiderClimb: {
        id: "spider_climb", name: "Spider Climb", level: 2, school: "Transmutation", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "bitumen and spider", duration: "Concentration, up to 1 hour",
        description: "Target gains Climb Speed equal to Speed, can climb ceilings.",
        concentration: true, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["buff", "mobility"]
    },
    spikeGrowth: {
        id: "spike_growth", name: "Spike Growth", level: 2, school: "Transmutation", castingTime: "1 Action", range: "150 feet", components: ["V", "S", "M"],
        materialComponent: "seven thorns", duration: "Concentration, up to 10 minutes",
        description: "20-foot-radius Sphere. Difficult Terrain. Take 2d4 Piercing for every 5 feet moved.",
        damage: { diceExpression: "2d4", damageType: "piercing" },
        areaShape: "sphere", areaSize: 20,
        concentration: true, ritual: false, classes: ["Druid", "Ranger"], source: "SRD 5.2", tags: ["control", "damage", "aoe"]
    },
    spiritualWeapon: {
        id: "spiritual_weapon", name: "Spiritual Weapon", level: 2, school: "Evocation", castingTime: "1 Bonus Action", range: "60 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Create spectral weapon. Make melee spell attack. Hit: 1d8 + mod Force damage. Move as Bonus Action. (SRD 5.2 made this Concentration)",
        damage: { diceExpression: "1d8", damageType: "force", scalingDice: "1d8" },
        attackRoll: true,
        concentration: true, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["damage", "force", "summon"]
    },
    suggestion: {
        id: "suggestion", name: "Suggestion", level: 2, school: "Enchantment", castingTime: "1 Action", range: "30 feet", components: ["V", "M"],
        materialComponent: "drop of honey", duration: "Concentration, up to 8 hours",
        description: "Suggest course of activity. Wisdom save. Failure: Charmed and follows suggestion.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "charm"]
    },
    wardingBond: {
        id: "warding_bond", name: "Warding Bond", level: 2, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "platinum rings (50gp)", duration: "1 hour",
        description: "Target gains +1 AC/Saves, Resistance to all damage. You take same damage.",
        concentration: false, ritual: false, classes: ["Cleric", "Paladin"], source: "SRD 5.2", tags: ["buff", "defense"]
    },
    web: {
        id: "web", name: "Web", level: 2, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "spiderweb", duration: "Concentration, up to 1 hour",
        description: "20-foot Cube of webs. Difficult Terrain. Dexterity save or Restrained.",
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "cube", areaSize: 20,
        concentration: true, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "aoe", "restrained"], statusEffect: "restrained"
    },
    zoneOfTruth: {
        id: "zone_of_truth", name: "Zone of Truth", level: 2, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "10 minutes",
        description: "15-foot-radius Sphere. Charisma save. Failure: Can't speak deliberate lies.",
        savingThrow: { ability: "CHA", dc: 0 },
        areaShape: "sphere", areaSize: 15,
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Paladin"], source: "SRD 5.2", tags: ["utility", "social"]
    }
};

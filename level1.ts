
import { SRDSpell } from '../../types';

export const LEVEL_1_SPELLS: Record<string, SRDSpell> = {
    alarm: {
        id: "alarm", name: "Alarm", level: 1, school: "Abjuration", castingTime: "1 Minute", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "a bell and silver wire", duration: "8 hours",
        description: "You set an alarm against intrusion. Choose a door, a window, or an area within range no larger than a 20-foot Cube. When a creature touches or enters, the alarm alerts you (Audible or Mental).",
        concentration: false, ritual: true, classes: ["Ranger", "Wizard"], source: "SRD 5.2", tags: ["utility", "warding"]
    },
    animalFriendship: {
        id: "animal_friendship", name: "Animal Friendship", level: 1, school: "Enchantment", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "a morsel of food", duration: "24 hours",
        description: "Target a Beast. It must succeed on a Wisdom saving throw or have the Charmed condition for the duration.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: false, ritual: false, classes: ["Bard", "Druid", "Ranger"], source: "SRD 5.2", tags: ["control", "charm"], statusEffect: "charmed"
    },
    bane: { 
        id: "bane", name: "Bane", level: 1, school: "Enchantment", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "a drop of blood", duration: "Concentration, up to 1 minute",
        description: "Up to three creatures must make a Charisma saving throw. Whenever a target that fails makes an attack roll or a saving throw, it must subtract 1d4 from the roll.", 
        savingThrow: { ability: "CHA", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Cleric", "Warlock"], source: "SRD 5.2", tags: ["debuff"], statusEffect: "bane"
    },
    bless: { 
        id: "bless", name: "Bless", level: 1, school: "Enchantment", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "a Holy Symbol worth 5+ GP", duration: "Concentration, up to 1 minute",
        description: "You bless up to three creatures. Whenever a target makes an attack roll or a saving throw, it adds 1d4 to the roll.", 
        concentration: true, ritual: false, classes: ["Cleric", "Paladin"], source: "SRD 5.2", tags: ["buff"], statusEffect: "bless"
    },
    burningHands: { 
        id: "burning_hands", name: "Burning Hands", level: 1, school: "Evocation", castingTime: "1 Action", range: "Self (15-foot Cone)", components: ["V", "S"], duration: "Instantaneous",
        description: "A thin sheet of flames shoots forth. Each creature in a 15-foot Cone makes a Dexterity saving throw, taking 3d6 Fire damage on a failed save or half on success. Flammable objects burn.", 
        damage: { diceExpression: "3d6", damageType: "fire", scalingDice: "1d6" },
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "cone", areaSize: 15,
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "fire", "aoe"]
    },
    charmPerson: {
        id: "charm_person", name: "Charm Person", level: 1, school: "Enchantment", castingTime: "1 Action", range: "30 feet", components: ["V", "S"], duration: "1 hour",
        description: "One Humanoid you can see must make a Wisdom saving throw. It does so with Advantage if you are fighting it. On a failed save, it has the Charmed condition (Friendly to you).",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: false, ritual: false, classes: ["Bard", "Druid", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "charm"], statusEffect: "charmed"
    },
    chromaticOrb: {
        id: "chromatic_orb", name: "Chromatic Orb", level: 1, school: "Evocation", castingTime: "1 Action", range: "90 feet", components: ["V", "S", "M"],
        materialComponent: "a diamond worth 50+ GP", duration: "Instantaneous",
        description: "You hurl an orb of energy. Choose Acid, Cold, Fire, Lightning, Poison, or Thunder. Make a ranged spell attack. Hit: 3d8 damage of chosen type. If you roll the same number on two d8s, the orb leaps to another target.",
        damage: { diceExpression: "3d8", damageType: "variable", scalingDice: "1d8" },
        attackRoll: true,
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "variable"]
    },
    colorSpray: {
        id: "color_spray", name: "Color Spray", level: 1, school: "Illusion", castingTime: "1 Action", range: "Self (15-foot Cone)", components: ["V", "S", "M"],
        materialComponent: "a pinch of colorful sand", duration: "Instantaneous",
        description: "Each creature in a 15-foot Cone must succeed on a Constitution saving throw or have the Blinded condition until the end of your next turn.",
        savingThrow: { ability: "CON", dc: 0 },
        areaShape: "cone", areaSize: 15,
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "blinded", "aoe"], statusEffect: "blinded"
    },
    command: {
        id: "command", name: "Command", level: 1, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V"], duration: "Instantaneous",
        description: "You speak a one-word command to a creature. Target must succeed on a Wisdom saving throw or follow the command on its next turn (Approach, Drop, Flee, Grovel, Halt).",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Paladin"], source: "SRD 5.2", tags: ["control"]
    },
    comprehendLanguages: {
        id: "comprehend_languages", name: "Comprehend Languages", level: 1, school: "Divination", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "a pinch of soot and salt", duration: "1 hour",
        description: "You understand the literal meaning of any language you hear or see signed. You also understand written language you touch.",
        concentration: false, ritual: true, classes: ["Bard", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility", "communication"]
    },
    createOrDestroyWater: {
        id: "create_or_destroy_water", name: "Create or Destroy Water", level: 1, school: "Transmutation", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "a mix of water and sand", duration: "Instantaneous",
        description: "Create up to 10 gallons of clean water or rain. Or destroy up to 10 gallons of water or fog.",
        concentration: false, ritual: false, classes: ["Cleric", "Druid"], source: "SRD 5.2", tags: ["utility"]
    },
    cureWounds: { 
        id: "cure_wounds", name: "Cure Wounds", level: 1, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S"], duration: "Instantaneous", 
        description: "A creature you touch regains 2d8 + your spellcasting ability modifier Hit Points.", 
        healing: { diceExpression: "2d8", scalingDice: "2d8" },
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger"], source: "SRD 5.2", tags: ["healing"]
    },
    detectEvilAndGood: {
        id: "detect_evil_and_good", name: "Detect Evil and Good", level: 1, school: "Divination", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "You sense the location of any Aberration, Celestial, Elemental, Fey, Fiend, or Undead within 30 feet of yourself. Also detects Hallow.",
        concentration: true, ritual: false, classes: ["Cleric", "Paladin"], source: "SRD 5.2", tags: ["detection"]
    },
    detectMagic: {
        id: "detect_magic", name: "Detect Magic", level: 1, school: "Divination", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "You sense the presence of magical effects within 30 feet. You can use an action to see a faint aura and learn the school of magic.",
        concentration: true, ritual: true, classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["detection"]
    },
    detectPoisonAndDisease: {
        id: "detect_poison_and_disease", name: "Detect Poison and Disease", level: 1, school: "Divination", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "a yew leaf", duration: "Concentration, up to 10 minutes",
        description: "You sense the location of poisons, poisonous creatures, and magical contagions within 30 feet.",
        concentration: true, ritual: true, classes: ["Cleric", "Druid", "Paladin", "Ranger"], source: "SRD 5.2", tags: ["detection"]
    },
    disguiseSelf: {
        id: "disguise_self", name: "Disguise Self", level: 1, school: "Illusion", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "1 hour",
        description: "You make yourself look different until the spell ends. True appearance revealed by Study action (Investigation check).",
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["illusion", "social"], statusEffect: "disguised"
    },
    dissonantWhispers: {
        id: "dissonant_whispers", name: "Dissonant Whispers", level: 1, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V"], duration: "Instantaneous",
        description: "One creature hears a discordant melody. Wisdom saving throw. Failure: 3d6 Psychic damage and must immediately use Reaction to move away. Success: Half damage.",
        damage: { diceExpression: "3d6", damageType: "psychic", scalingDice: "1d6" },
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: false, ritual: false, classes: ["Bard"], source: "SRD 5.2", tags: ["damage", "psychic", "control"]
    },
    divineFavor: {
        id: "divine_favor", name: "Divine Favor", level: 1, school: "Transmutation", castingTime: "1 Bonus Action", range: "Self", components: ["V", "S"], duration: "1 minute",
        description: "Until the spell ends, your attacks with weapons deal an extra 1d4 Radiant damage on a hit.",
        concentration: false, ritual: false, classes: ["Paladin"], source: "SRD 5.2", tags: ["buff", "damage", "radiant"], statusEffect: "divine_favor"
    },
    divineSmite: {
        id: "divine_smite", name: "Divine Smite", level: 1, school: "Evocation", castingTime: "1 Bonus Action", range: "Self", components: ["V"], duration: "Instantaneous",
        description: "Trigger: You hit a target with a Melee weapon or Unarmed Strike. The target takes an extra 2d8 Radiant damage. Damage increases by 1d8 if target is Fiend or Undead. Scaling: +1d8 per slot level above 1.",
        damage: { diceExpression: "2d8", damageType: "radiant", scalingDice: "1d8" },
        concentration: false, ritual: false, classes: ["Paladin"], source: "SRD 5.2", tags: ["damage", "radiant"]
    },
    entangle: { 
        id: "entangle", name: "Entangle", level: 1, school: "Conjuration", castingTime: "1 Action", range: "90 feet", components: ["V", "S"], duration: "Concentration, up to 1 minute", 
        description: "Grasping plants sprout in a 20-foot square. Difficult Terrain. Each creature in area must succeed on a Strength saving throw or have the Restrained condition.", 
        savingThrow: { ability: "STR", dc: 0 },
        areaShape: "cube", areaSize: 20,
        concentration: true, ritual: false, classes: ["Druid", "Ranger"], source: "SRD 5.2", tags: ["control", "restrained", "aoe"], statusEffect: "restrained"
    },
    expeditiousRetreat: {
        id: "expeditious_retreat", name: "Expeditious Retreat", level: 1, school: "Transmutation", castingTime: "1 Bonus Action", range: "Self", components: ["V", "S"], duration: "Concentration, up to 10 minutes",
        description: "You take the Dash action, and until the spell ends, you can take that action again as a Bonus Action.",
        concentration: true, ritual: false, classes: ["Sorcerer", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["mobility", "dash"]
    },
    faerieFire: { 
        id: "faerie_fire", name: "Faerie Fire", level: 1, school: "Evocation", castingTime: "1 Action", range: "60 feet", components: ["V"], duration: "Concentration, up to 1 minute", 
        description: "Objects in a 20-foot Cube are outlined in light. Creatures in the area must succeed on a Dexterity saving throw or be outlined. Outlined things shed Dim Light and can't be Invisible. Attack rolls against them have Advantage.", 
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "cube", areaSize: 20,
        concentration: true, ritual: false, classes: ["Bard", "Druid"], source: "SRD 5.2", tags: ["debuff", "advantage"], statusEffect: "faerie_fire"
    },
    falseLife: {
        id: "false_life", name: "False Life", level: 1, school: "Necromancy", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "a drop of alcohol", duration: "Instantaneous",
        description: "You gain 2d4 + 4 Temporary Hit Points.",
        healing: { diceExpression: "2d4+4", scalingDice: "5" }, // Special scaling: +5 THP per level
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["buff", "temp_hp"]
    },
    featherFall: {
        id: "feather_fall", name: "Feather Fall", level: 1, school: "Transmutation", castingTime: "1 Reaction", range: "60 feet", components: ["V", "M"],
        materialComponent: "a small feather", duration: "1 minute",
        description: "Choose up to five falling creatures. Rate of descent slows to 60 feet per round. No damage from falling.",
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "movement"]
    },
    findFamiliar: {
        id: "find_familiar", name: "Find Familiar", level: 1, school: "Conjuration", castingTime: "1 Hour", range: "10 feet", components: ["V", "S", "M"],
        materialComponent: "burning incense worth 10+ GP", duration: "Instantaneous",
        description: "You gain the service of a familiar, a spirit that takes an animal form you choose.",
        concentration: false, ritual: true, classes: ["Wizard"], source: "SRD 5.2", tags: ["summon", "utility"]
    },
    floatingDisk: {
        id: "floating_disk", name: "Floating Disk", level: 1, school: "Conjuration", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "a drop of mercury", duration: "1 hour",
        description: "Creates a circular plane of force that follows you. Holds 500 pounds.",
        concentration: false, ritual: true, classes: ["Wizard"], source: "SRD 5.2", tags: ["utility"]
    },
    fogCloud: {
        id: "fog_cloud", name: "Fog Cloud", level: 1, school: "Conjuration", castingTime: "1 Action", range: "120 feet", components: ["V", "S"], duration: "Concentration, up to 1 hour",
        description: "Create a 20-foot-radius Sphere of fog. Heavily Obscured.",
        areaShape: "sphere", areaSize: 20,
        concentration: true, ritual: false, classes: ["Druid", "Ranger", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "obscurement"]
    },
    goodberry: {
        id: "goodberry", name: "Goodberry", level: 1, school: "Conjuration", castingTime: "1 Action", range: "Self", components: ["V", "S", "M"],
        materialComponent: "a sprig of mistletoe", duration: "24 hours",
        description: "Ten berries appear. Eating one uses a Bonus Action, restores 1 Hit Point, and provides nourishment for one day.",
        concentration: false, ritual: false, classes: ["Druid", "Ranger"], source: "SRD 5.2", tags: ["healing", "utility"]
    },
    grease: {
        id: "grease", name: "Grease", level: 1, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "pork rind or butter", duration: "1 minute",
        description: "Slick grease covers a 10-foot square (Difficult Terrain). Creatures must succeed on Dexterity saving throw or have Prone condition.",
        savingThrow: { ability: "DEX", dc: 0 },
        areaShape: "cube", areaSize: 10,
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "prone"], statusEffect: "prone"
    },
    guidingBolt: { 
        id: "guiding_bolt", name: "Guiding Bolt", level: 1, school: "Evocation", castingTime: "1 Action", range: "120 feet", components: ["V", "S"], duration: "1 round", 
        description: "Ranged spell attack. Hit: 4d6 Radiant damage, and next attack roll against target has Advantage.", 
        damage: { diceExpression: "4d6", damageType: "radiant", scalingDice: "1d6" },
        attackRoll: true,
        concentration: false, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["damage", "radiant"], statusEffect: "glittering"
    },
    healingWord: { 
        id: "healing_word", name: "Healing Word", level: 1, school: "Abjuration", castingTime: "1 Bonus Action", range: "60 feet", components: ["V"], duration: "Instantaneous", 
        description: "A creature you can see regains 2d4 + spellcasting modifier Hit Points.", 
        healing: { diceExpression: "2d4", scalingDice: "2d4" },
        concentration: false, ritual: false, classes: ["Bard", "Cleric", "Druid"], source: "SRD 5.2", tags: ["healing"]
    },
    hellishRebuke: {
        id: "hellish_rebuke", name: "Hellish Rebuke", level: 1, school: "Evocation", castingTime: "1 Reaction", range: "60 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Reaction when damaged. Creature makes Dexterity saving throw. Failure: 2d10 Fire damage. Success: Half damage.",
        damage: { diceExpression: "2d10", damageType: "fire", scalingDice: "1d10" },
        savingThrow: { ability: "DEX", dc: 0 },
        concentration: false, ritual: false, classes: ["Warlock"], source: "SRD 5.2", tags: ["damage", "fire", "reaction"]
    },
    heroism: {
        id: "heroism", name: "Heroism", level: 1, school: "Enchantment", castingTime: "1 Action", range: "Touch", components: ["V", "S"], duration: "Concentration, up to 1 minute",
        description: "Willing creature is immune to Frightened condition and gains Temporary Hit Points equal to your spellcasting modifier at start of its turns.",
        concentration: true, ritual: false, classes: ["Bard", "Paladin"], source: "SRD 5.2", tags: ["buff", "temp_hp"], statusEffect: "heroism"
    },
    hex: { 
        id: "hex", name: "Hex", level: 1, school: "Enchantment", castingTime: "1 Bonus Action", range: "90 feet", components: ["V", "S", "M"],
        materialComponent: "petrified eye of newt", duration: "Concentration, up to 1 hour", 
        description: "Curse a creature. You deal extra 1d6 Necrotic damage on hit. Choose an ability; target has Disadvantage on checks with that ability.", 
        concentration: true, ritual: false, classes: ["Warlock"], source: "SRD 5.2", tags: ["debuff", "damage", "necrotic"], statusEffect: "hexed"
    },
    hideousLaughter: {
        id: "hideous_laughter", name: "Hideous Laughter", level: 1, school: "Enchantment", castingTime: "1 Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "tart and feather", duration: "Concentration, up to 1 minute",
        description: "Target must succeed on Wisdom saving throw or have Prone and Incapacitated conditions (laughter). Repeats save on damage/turn end.",
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: true, ritual: false, classes: ["Bard", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["control", "incapacitated"], statusEffect: "incapacitated"
    },
    huntersMark: { 
        id: "hunters_mark", name: "Hunter's Mark", level: 1, school: "Divination", castingTime: "1 Bonus Action", range: "90 feet", components: ["V"], duration: "Concentration, up to 1 hour", 
        description: "Mark a creature. Deal extra 1d6 Force damage on hit. Advantage on Perception/Survival to find it.", 
        concentration: true, ritual: false, classes: ["Ranger"], source: "SRD 5.2", tags: ["buff", "damage"], statusEffect: "marked"
    },
    iceKnife: {
        id: "ice_knife", name: "Ice Knife", level: 1, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["S", "M"],
        materialComponent: "drop of water or ice", duration: "Instantaneous",
        description: "Ranged spell attack. Hit: 1d10 Piercing damage. Hit or Miss: Explodes. Target and creatures within 5 feet make Dexterity save. Failure: 2d6 Cold damage.",
        damage: { diceExpression: "1d10", damageType: "piercing", scalingDice: "1d6" }, // Scaling applies to cold damage part
        attackRoll: true,
        concentration: false, ritual: false, classes: ["Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "cold"]
    },
    identify: {
        id: "identify", name: "Identify", level: 1, school: "Divination", castingTime: "1 Minute", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "a pearl worth 100+ GP", duration: "Instantaneous",
        description: "Touch object/creature. Learn magical properties, charges, spells affecting it.",
        concentration: false, ritual: true, classes: ["Bard", "Wizard"], source: "SRD 5.2", tags: ["utility", "information"]
    },
    illusoryScript: {
        id: "illusory_script", name: "Illusory Script", level: 1, school: "Illusion", castingTime: "1 Minute", range: "Touch", components: ["S", "M"],
        materialComponent: "ink worth 10+ GP", duration: "10 days",
        description: "Write a message only designated creatures can read. Others see unintelligible script or a different message.",
        concentration: false, ritual: true, classes: ["Bard", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility"]
    },
    inflictWounds: { 
        id: "inflict_wounds", name: "Inflict Wounds", level: 1, school: "Necromancy", castingTime: "1 Action", range: "Touch", components: ["V", "S"], duration: "Instantaneous", 
        description: "Melee spell attack. Hit: 2d10 Necrotic damage.", 
        damage: { diceExpression: "2d10", damageType: "necrotic", scalingDice: "1d10" },
        attackRoll: true,
        concentration: false, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["damage", "necrotic"]
    },
    jump: {
        id: "jump", name: "Jump", level: 1, school: "Transmutation", castingTime: "1 Bonus Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "grasshopper leg", duration: "1 minute",
        description: "Touch a creature. It can jump up to 30 feet by spending 10 feet of movement.",
        concentration: false, ritual: false, classes: ["Druid", "Ranger", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["buff", "movement"]
    },
    longstrider: {
        id: "longstrider", name: "Longstrider", level: 1, school: "Transmutation", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "pinch of dirt", duration: "1 hour",
        description: "Touch a creature. Its Speed increases by 10 feet.",
        concentration: false, ritual: false, classes: ["Bard", "Druid", "Ranger", "Wizard"], source: "SRD 5.2", tags: ["buff", "movement"], statusEffect: "speed_bonus"
    },
    mageArmor: { 
        id: "mage_armor", name: "Mage Armor", level: 1, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "cured leather", duration: "8 hours", 
        description: "Touch unarmored creature. Base AC becomes 13 + Dex modifier.", 
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["defense", "buff"], statusEffect: "mage_armor"
    },
    magicMissile: { 
        id: "magic_missile", name: "Magic Missile", level: 1, school: "Evocation", castingTime: "1 Action", range: "120 feet", components: ["V", "S"], duration: "Instantaneous", 
        description: "Create three darts. Each hits a target you see (auto-hit). 1d4 + 1 Force damage per dart.", 
        damage: { diceExpression: "3d4+3", damageType: "force" }, // 3 darts base
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "force", "auto_hit"]
    },
    protectionFromEvilAndGood: {
        id: "protection_from_evil_and_good", name: "Protection from Evil and Good", level: 1, school: "Abjuration", castingTime: "1 Action", range: "Touch", components: ["V", "S", "M"],
        materialComponent: "holy water", duration: "Concentration, up to 10 minutes",
        description: "Protect creature from Aberrations, Celestials, Elementals, Fey, Fiends, Undead. Disadvantage on attacks against target. Target can't be Charmed/Frightened/Possessed by them.",
        concentration: true, ritual: false, classes: ["Cleric", "Paladin", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["buff", "defense"], statusEffect: "protected_evil_good"
    },
    purifyFoodAndDrink: {
        id: "purify_food_and_drink", name: "Purify Food and Drink", level: 1, school: "Transmutation", castingTime: "1 Action", range: "10 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Purify nonmagical food/drink in 5-foot-radius Sphere. Removes poison and rot.",
        concentration: false, ritual: true, classes: ["Cleric", "Druid", "Paladin"], source: "SRD 5.2", tags: ["utility"]
    },
    rayOfSickness: {
        id: "ray_of_sickness", name: "Ray of Sickness", level: 1, school: "Necromancy", castingTime: "1 Action", range: "60 feet", components: ["V", "S"], duration: "Instantaneous",
        description: "Ranged spell attack. Hit: 2d8 Poison damage and Poisoned condition until end of next turn.",
        damage: { diceExpression: "2d8", damageType: "poison", scalingDice: "1d8" },
        attackRoll: true,
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "poison", "debuff"]
    },
    sanctuary: {
        id: "sanctuary", name: "Sanctuary", level: 1, school: "Abjuration", castingTime: "1 Bonus Action", range: "30 feet", components: ["V", "S", "M"],
        materialComponent: "small silver mirror", duration: "1 minute",
        description: "Ward a creature. Attacks against it must succeed on Wisdom save or choose new target/lose attack. Ends if warded creature attacks/casts harmful spell.",
        concentration: false, ritual: false, classes: ["Cleric"], source: "SRD 5.2", tags: ["defense", "buff"], statusEffect: "sanctuary"
    },
    searingSmite: {
        id: "searing_smite", name: "Searing Smite", level: 1, school: "Evocation", castingTime: "1 Bonus Action", range: "Self", components: ["V"], duration: "1 minute",
        description: "Next hit deals extra 1d6 Fire. Target must make Con save. Failure: Continues taking 1d6 Fire at start of turns.",
        damage: { diceExpression: "1d6", damageType: "fire", scalingDice: "1d6" },
        concentration: false, ritual: false, classes: ["Paladin"], source: "SRD 5.2", tags: ["damage", "fire"]
    },
    shield: { 
        id: "shield", name: "Shield", level: 1, school: "Abjuration", castingTime: "1 Reaction", range: "Self", components: ["V", "S"], duration: "1 round", 
        description: "Trigger: Hit by attack or Magic Missile. +5 AC until start of next turn. Immune to Magic Missile.", 
        concentration: false, ritual: false, classes: ["Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["defense", "buff"], statusEffect: "shield"
    },
    shieldOfFaith: {
        id: "shield_of_faith", name: "Shield of Faith", level: 1, school: "Abjuration", castingTime: "1 Bonus Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "parchment with holy text", duration: "Concentration, up to 10 minutes",
        description: "Grant +2 AC to a creature.",
        concentration: true, ritual: false, classes: ["Cleric", "Paladin"], source: "SRD 5.2", tags: ["buff", "defense"], statusEffect: "shield_of_faith"
    },
    silentImage: {
        id: "silent_image", name: "Silent Image", level: 1, school: "Illusion", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "bit of fleece", duration: "Concentration, up to 10 minutes",
        description: "Create visual illusion of object/creature/phenomenon (15-foot Cube). No sound/smell. Interaction reveals it.",
        concentration: true, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["utility", "illusion"]
    },
    sleep: { 
        id: "sleep", name: "Sleep", level: 1, school: "Enchantment", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "sand or rose petals", duration: "1 minute", 
        description: "Each creature of your choice in a 5-foot-radius Sphere must succeed on a Wisdom saving throw or have Incapacitated condition. Repeats save at end of turn. Second failure: Unconscious.", 
        areaShape: "sphere", areaSize: 5,
        savingThrow: { ability: "WIS", dc: 0 },
        concentration: false, ritual: false, classes: ["Bard", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["control", "sleep"], statusEffect: "unconscious"
    },
    speakWithAnimals: {
        id: "speak_with_animals", name: "Speak with Animals", level: 1, school: "Divination", castingTime: "1 Action", range: "Self", components: ["V", "S"], duration: "10 minutes",
        description: "You can comprehend and verbally communicate with Beasts. Can use Influence action with them.",
        concentration: false, ritual: true, classes: ["Bard", "Druid", "Ranger"], source: "SRD 5.2", tags: ["utility", "communication"]
    },
    thunderwave: { 
        id: "thunderwave", name: "Thunderwave", level: 1, school: "Evocation", castingTime: "1 Action", range: "Self (15-foot Cube)", components: ["V", "S"], duration: "Instantaneous", 
        description: "15-foot Cube originating from you. Con save. Failure: 2d8 Thunder damage and pushed 10 feet. Success: Half damage.", 
        damage: { diceExpression: "2d8", damageType: "thunder", scalingDice: "1d8" },
        savingThrow: { ability: "CON", dc: 0 },
        areaShape: "cube", areaSize: 15,
        concentration: false, ritual: false, classes: ["Bard", "Druid", "Sorcerer", "Wizard"], source: "SRD 5.2", tags: ["damage", "thunder", "push"]
    },
    unseenServant: {
        id: "unseen_servant", name: "Unseen Servant", level: 1, school: "Conjuration", castingTime: "1 Action", range: "60 feet", components: ["V", "S", "M"],
        materialComponent: "string and wood", duration: "1 hour",
        description: "Create invisible, mindless force. Performs simple tasks (AC 10, 1 HP, Str 2).",
        concentration: false, ritual: true, classes: ["Bard", "Warlock", "Wizard"], source: "SRD 5.2", tags: ["utility"]
    }
};

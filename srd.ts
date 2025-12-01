
import { HeritageData, ClassData, FeatData, BackgroundData } from '../types';
import { SPELL_DB } from './spells/index';

export const FIGHTING_STYLES = [
    { name: "Archery", desc: "Fighting Style Feat: +2 bonus to attack rolls you make with ranged weapons." },
    { name: "Defense", desc: "Fighting Style Feat: +1 bonus to AC while wearing Light, Medium, or Heavy armor." },
    { name: "Dueling", desc: "Fighting Style Feat: +2 bonus to damage rolls with melee weapons held in one hand." },
    { name: "Great Weapon Fighting", desc: "Fighting Style Feat: Treat 1 or 2 on damage dice as 3 for two-handed melee weapons." },
    { name: "Protection", desc: "Fighting Style Feat: Reaction to impose disadvantage on attack against a target other than you within 5 feet." },
    { name: "Two-Weapon Fighting", desc: "Fighting Style Feat: Add ability modifier to the damage of the second attack." },
    { name: "Blind Fighting", desc: "Fighting Style Feat: Blindsight 10ft." },
    { name: "Interception", desc: "Fighting Style Feat: Reaction to reduce damage to ally by 1d10+PB." },
    { name: "Thrown Weapon Fighting", desc: "Fighting Style Feat: +2 damage with thrown weapons." }
];

export const METAMAGIC_OPTIONS = [
    { name: "Careful Spell", cost: 1, desc: "Allies automatically succeed on saving throw." },
    { name: "Distant Spell", cost: 1, desc: "Double range of spell." },
    { name: "Empowered Spell", cost: 1, desc: "Reroll damage dice up to Charisma Mod." },
    { name: "Extended Spell", cost: 1, desc: "Double duration of spell." },
    { name: "Heightened Spell", cost: 2, desc: "Target has disadvantage on first saving throw." },
    { name: "Quickened Spell", cost: 2, desc: "Cast action spell as bonus action." },
    { name: "Seeking Spell", cost: 1, desc: "Reroll attack roll if you miss." },
    { name: "Subtle Spell", cost: 1, desc: "Cast without somatic or verbal components." },
    { name: "Transmuted Spell", cost: 1, desc: "Change damage type to Acid, Cold, Fire, Lightning, Poison, or Thunder." },
    { name: "Twinned Spell", cost: 1, desc: "Increase spell's effective level by 1 to target extra creature." }
];

export const MANEUVERS = [
    { name: "Commander's Strike", desc: "Forgo one attack to let an ally reaction attack with Superiority Die to dmg." },
    { name: "Disarming Attack", desc: "Spend Superiority Die to add to damage and force target to drop item (Str save)." },
    { name: "Distracting Strike", desc: "Spend Superiority Die to add to damage. Next attack on target has advantage." },
    { name: "Evasive Footwork", desc: "Spend Superiority Die to add to AC while moving." },
    { name: "Feinting Attack", desc: "Bonus action, spend die for Advantage on next attack + die to damage." },
    { name: "Goading Attack", desc: "Spend die to add damage. Target has disadvantage against others (Wis save)." },
    { name: "Lunging Attack", desc: "Spend die to increase reach by 5ft and add die to damage." },
    { name: "Maneuvering Attack", desc: "Spend die to add damage and let ally move half speed without OA." },
    { name: "Menacing Attack", desc: "Spend Superiority Die to add to damage and frighten target (Wis save)." },
    { name: "Parry", desc: "Reaction: Reduce damage by Superiority Die + Dex mod." },
    { name: "Precision Attack", desc: "Spend Superiority Die to add it to attack roll." },
    { name: "Pushing Attack", desc: "Spend die to add damage and push target 15ft (Str save)." },
    { name: "Rally", desc: "Bonus Action: Ally gains Temp HP equal to Superiority Die + Cha mod." },
    { name: "Riposte", desc: "When a creature misses you, use reaction and Superiority Die to attack." },
    { name: "Sweeping Attack", desc: "Spend die to hit another creature within 5ft with the die damage." },
    { name: "Trip Attack", desc: "Spend Superiority Die to add to damage and knock target prone (Str save)." },
    { name: "Tactical Assessment", desc: "Add Superiority Die to Investigation, History, or Insight check." }
];

export const SRD_SPELLS = SPELL_DB;

export const SPELL_SLOT_TABLE: Record<number, number[]> = {
    1: [2],
    2: [3],
    3: [4, 2],
    4: [4, 3],
    5: [4, 3, 2],
    6: [4, 3, 3],
    7: [4, 3, 3, 1],
    8: [4, 3, 3, 2],
    9: [4, 3, 3, 3, 1],
    10: [4, 3, 3, 3, 2],
    11: [4, 3, 3, 3, 2, 1],
    12: [4, 3, 3, 3, 2, 1],
    13: [4, 3, 3, 3, 2, 1, 1],
    14: [4, 3, 3, 3, 2, 1, 1],
    15: [4, 3, 3, 3, 2, 1, 1, 1],
    16: [4, 3, 3, 3, 2, 1, 1, 1],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
};

export const SRD_BACKGROUNDS: BackgroundData[] = [
    { name: "Acolyte", skills: ["Insight", "Religion"], abilityScores: ["Intelligence", "Wisdom", "Charisma"], feat: "Magic Initiate (Cleric)" },
    { name: "Criminal", skills: ["Deception", "Stealth"], abilityScores: ["Dexterity", "Constitution", "Intelligence"], feat: "Alert" },
    { name: "Sage", skills: ["Arcana", "History"], abilityScores: ["Constitution", "Intelligence", "Wisdom"], feat: "Magic Initiate (Wizard)" },
    { name: "Soldier", skills: ["Athletics", "Intimidation"], abilityScores: ["Strength", "Dexterity", "Constitution"], feat: "Savage Attacker" },
    { name: "Entertainer", skills: ["Acrobatics", "Performance"], abilityScores: ["Dexterity", "Charisma"], feat: "Magic Initiate (Bard)" },
    { name: "Merchant", skills: ["Insight", "Persuasion"], abilityScores: ["Charisma", "Wisdom"], feat: "Lucky" },
    { name: "Noble", skills: ["History", "Persuasion"], abilityScores: ["Charisma", "Intelligence"], feat: "Skilled" },
    { name: "Wayfarer", skills: ["Insight", "Stealth"], abilityScores: ["Dexterity", "Wisdom"], feat: "Lucky" },
    { name: "Guide", skills: ["Stealth", "Survival"], abilityScores: ["Dexterity", "Constitution", "Wisdom"], feat: "Magic Initiate (Druid)" },
    { name: "Farmer", skills: ["Animal Handling", "Nature"], abilityScores: ["Strength", "Constitution", "Wisdom"], feat: "Tough" }
];

export const SKILLS_LIST = [
    { name: "Acrobatics", ability: "dex" },
    { name: "Animal Handling", ability: "wis" },
    { name: "Arcana", ability: "int" },
    { name: "Athletics", ability: "str" },
    { name: "Deception", ability: "cha" },
    { name: "History", ability: "int" },
    { name: "Insight", ability: "wis" },
    { name: "Intimidation", ability: "cha" },
    { name: "Investigation", ability: "int" },
    { name: "Medicine", ability: "wis" },
    { name: "Nature", ability: "int" },
    { name: "Perception", ability: "wis" },
    { name: "Performance", ability: "cha" },
    { name: "Persuasion", ability: "cha" },
    { name: "Religion", ability: "int" },
    { name: "Sleight of Hand", ability: "dex" },
    { name: "Stealth", ability: "dex" },
    { name: "Survival", ability: "wis" }
];

export const SRD_FEATS: FeatData[] = [
    {
        name: "Alert",
        desc: "You gain a +5 bonus to initiative and you can't be surprised. Unseen attackers do not gain advantage against you.",
        bonuses: {}
    },
    {
        name: "Magic Initiate",
        desc: "Learn two cantrips and one level 1 spell from Druid, Cleric, or Wizard list. Intelligence, Wisdom, or Charisma is spellcasting ability.",
        bonuses: {}
    },
    {
        name: "Savage Attacker",
        desc: "Once per turn when you roll damage for a melee weapon attack, you can roll damage twice and use the higher result.",
        bonuses: {}
    },
    {
        name: "Skilled",
        desc: "Gain proficiency in any 3 skills or tools.",
        bonuses: {}
    },
    {
        name: "Tough",
        desc: "Hit point maximum increases by 2 for every level.",
        bonuses: {
            hpPerLevel: 2
        }
    },
    {
        name: "Ability Score Improvement",
        desc: "Increase one ability score by 2, or two by 1. Max 20.",
        bonuses: {}
    },
    {
        name: "Grappler",
        desc: "You have advantage on attack rolls against a creature you are grappling. Punch and Grab: Attack + Grapple in one action.",
        bonuses: {}
    },
    {
        name: "Lucky",
        desc: "Gain 3 Luck Points to reroll d20 tests.",
        bonuses: {}
    },
    // Fighting Style Feats
    {
        name: "Archery",
        desc: "Fighting Style: +2 bonus to attack rolls you make with ranged weapons.",
        bonuses: {}
    },
    {
        name: "Defense",
        desc: "Fighting Style: +1 bonus to AC while wearing Light, Medium, or Heavy armor.",
        bonuses: { ac: 1 }
    },
    {
        name: "Great Weapon Fighting",
        desc: "Fighting Style: Treat 1 or 2 on damage dice as 3 for two-handed melee weapons (reroll once).",
        bonuses: {}
    },
    {
        name: "Two-Weapon Fighting",
        desc: "Fighting Style: Add ability modifier to the damage of the second attack.",
        bonuses: {}
    },
    // Epic Boons
    {
        name: "Boon of Combat Prowess",
        desc: "Peerless Aim: If you miss an attack, you can hit instead (Once/Turn). +1 Ability Score (Max 30).",
        bonuses: {}
    },
    {
        name: "Boon of Dimensional Travel",
        desc: "Blink Steps: Teleport up to 30ft after Attack or Magic action. +1 Ability Score (Max 30).",
        bonuses: {}
    },
    {
        name: "Boon of Fate",
        desc: "Improve Fate: Add/Subtract 2d4 to d20 test of creature within 60ft (Once/Turn, recharge Initiative/Rest). +1 Ability Score.",
        bonuses: {}
    },
    {
        name: "Boon of Irresistible Offense",
        desc: "Overcome Defenses (B/P/S ignore resistance). Overwhelming Strike: Crit deals damage equal to ability score. +1 Str/Dex.",
        bonuses: {}
    },
    {
        name: "Boon of Spell Recall",
        desc: "Free Casting: 25% chance to not expend slot level 1-4. +1 Int/Wis/Cha.",
        bonuses: {}
    },
    {
        name: "Boon of the Night Spirit",
        desc: "Merge with Shadows: Bonus Action Invisible in dim/dark. Resistance to all damage except Psychic/Radiant while dim/dark. +1 Ability Score.",
        bonuses: {}
    },
    {
        name: "Boon of Truesight",
        desc: "Truesight 60ft. +1 Ability Score.",
        bonuses: {}
    }
];

export const SRD_HERITAGES: HeritageData[] = [
    {
        name: "Dragonborn",
        speed: 30,
        bonuses: {}, 
        traits: [
            { name: "Breath Weapon", desc: "Exhale destructive energy (Cone or Line). Damage 1d10 (increases at 5, 11, 17). Replaces an attack." },
            { name: "Damage Resistance", desc: "Resistance to damage type of ancestry." },
            { name: "Darkvision", desc: "60ft." },
            { name: "Draconic Flight", desc: "Level 5: Fly speed equal to speed for 10 mins once per Long Rest." }
        ],
        resistances: []
    },
    {
        name: "Dwarf",
        speed: 30,
        bonuses: {},
        traits: [
            { name: "Darkvision", desc: "120ft." },
            { name: "Dwarven Resilience", desc: "Resistance to poison damage. Advantage on saves vs poison." },
            { name: "Dwarven Toughness", desc: "+1 HP per level." },
            { name: "Stonecunning", desc: "Bonus Action: Tremorsense 60ft for 10 mins (PB/Long Rest)." }
        ],
        resistances: ['poison']
    },
    {
        name: "Elf",
        speed: 30,
        bonuses: {},
        traits: [
            { name: "Darkvision", desc: "60ft." },
            { name: "Elven Lineage", desc: "Choose Drow (120ft DV, spells), High Elf (Cantrip, spells), or Wood Elf (+5 speed, Druidcraft)." },
            { name: "Fey Ancestry", desc: "Advantage vs charm." },
            { name: "Keen Senses", desc: "Proficiency in Insight, Perception, or Survival." },
            { name: "Trance", desc: "Long Rest in 4 hours." }
        ],
        skills: ['Perception']
    },
    {
        name: "Gnome",
        speed: 30,
        bonuses: {},
        traits: [
            { name: "Darkvision", desc: "60ft." },
            { name: "Gnomish Cunning", desc: "Advantage on Int, Wis, Cha saves." },
            { name: "Gnomish Lineage", desc: "Forest (Speak with Animals) or Rock (Mending/Prestidigitation)." }
        ]
    },
    {
        name: "Goliath",
        speed: 35,
        bonuses: {},
        traits: [
            { name: "Giant Ancestry", desc: "Choose Cloud (Teleport), Fire (1d10 Fire dmg), Frost (1d6 Cold + Slow), Hill (Topple), or Stone (Reaction reduce damage)." },
            { name: "Large Form", desc: "Level 5: Become Large for 10 mins (Advantage on Str checks, +10 speed)." },
            { name: "Powerful Build", desc: "Advantage to end Grappled. Count as one size larger for carrying." }
        ]
    },
    {
        name: "Halfling",
        speed: 30,
        bonuses: {},
        traits: [
            { name: "Brave", desc: "Advantage vs frightened." },
            { name: "Halfling Nimbleness", desc: "Move through space of creature size larger." },
            { name: "Luck", desc: "Reroll 1s on d20 tests." },
            { name: "Naturally Stealthy", desc: "Hide when obscured by creature one size larger." }
        ]
    },
    {
        name: "Human",
        speed: 30,
        bonuses: {},
        traits: [
            { name: "Resourceful", desc: "Gain Heroic Inspiration after Long Rest." },
            { name: "Skillful", desc: "Proficiency in one skill." },
            { name: "Versatile", desc: "Gain an Origin Feat." }
        ]
    },
    {
        name: "Orc",
        speed: 30,
        bonuses: {},
        traits: [
            { name: "Adrenaline Rush", desc: "Bonus Action Dash. Gain Temp HP = PB. (PB/Long Rest)." },
            { name: "Darkvision", desc: "120ft." },
            { name: "Relentless Endurance", desc: "Drop to 1 HP instead of 0 (Once/Long Rest)." }
        ]
    },
    {
        name: "Tiefling",
        speed: 30,
        bonuses: {},
        traits: [
            { name: "Darkvision", desc: "60ft." },
            { name: "Fiendish Legacy", desc: "Choose Abyssal (Poison res, spells), Chthonic (Necrotic res, spells), or Infernal (Fire res, spells)." },
            { name: "Otherworldly Presence", desc: "Know Thaumaturgy." }
        ],
        resistances: [] 
    }
];

export const SRD_CLASSES: ClassData[] = [
    {
        name: "Barbarian",
        hitDie: 12,
        savingThrows: ["str", "con"],
        defaultSkills: ["Athletics", "Survival"],
        features: [
            { name: "Rage", level: 1, desc: "Advantage Str checks/saves. Resistance to B/P/S damage. Bonus Rage damage. Lasts 10 mins. Regain on Short Rest (Lv 15+)." },
            { name: "Unarmored Defense", level: 1, desc: "AC = 10 + Dex + Con." },
            { name: "Weapon Mastery", level: 1, desc: "Use mastery properties of weapons." },
            { name: "Reckless Attack", level: 2, desc: "Advantage on Str attacks, attacks against you have Advantage." },
            { name: "Danger Sense", level: 2, desc: "Advantage on Dex saves." },
            { name: "Primal Knowledge", level: 3, desc: "Gain proficiency in another skill. Use Str for some skills while raging." },
            { name: "Instinctive Pounce", level: 7, desc: "Move half speed as part of Bonus Action to Rage." },
            { name: "Brutal Strike", level: 9, desc: "Forgo Reckless advantage to deal extra 1d10 damage and apply effect (Push, Slow)." },
            { name: "Relentless Rage", level: 11, desc: "Keep fighting at 0 HP with Con save." },
            { name: "Persistent Rage", level: 15, desc: "Restore Rage on Initiative." }
        ],
        subclasses: [
            {
                name: "Path of the Berserker",
                features: [
                    { name: "Frenzy", level: 3, desc: "Deal extra damage on first reckless attack (Rage Damage dice)." },
                    { name: "Mindless Rage", level: 6, desc: "Immune to Charmed/Frightened while raging." },
                    { name: "Retaliation", level: 10, desc: "Reaction attack when damaged." },
                    { name: "Intimidating Presence", level: 14, desc: "Bonus Action fear effect." }
                ]
            }
        ]
    },
    {
        name: "Bard",
        hitDie: 8,
        savingThrows: ["dex", "cha"],
        defaultSkills: ["Performance", "Persuasion", "Deception"],
        features: [
            { name: "Bardic Inspiration", level: 1, desc: "Bonus action give die to ally. Lasts 1 hour." },
            { name: "Spellcasting", level: 1, desc: "Charisma based. Prepared spells." },
            { name: "Expertise", level: 2, desc: "Double proficiency in two skills." },
            { name: "Jack of All Trades", level: 2, desc: "Add half proficiency to unskilled checks." },
            { name: "Font of Inspiration", level: 5, desc: "Regain Bardic Inspiration on Short Rest. Convert slot to use." },
            { name: "Countercharm", level: 7, desc: "Reaction: Reroll save vs Charmed/Frightened." },
            { name: "Magical Secrets", level: 10, desc: "Choose spells from Cleric, Druid, Wizard lists." }
        ],
        subclasses: [
            {
                name: "College of Lore",
                features: [
                    { name: "Bonus Proficiencies", level: 3, desc: "3 skills." },
                    { name: "Cutting Words", level: 3, desc: "Reaction to subtract Inspiration from enemy roll." },
                    { name: "Magical Discoveries", level: 6, desc: "Learn two spells from any class list." },
                    { name: "Peerless Skill", level: 14, desc: "Add BI to ability check." }
                ]
            }
        ]
    },
    {
        name: "Cleric",
        hitDie: 8,
        savingThrows: ["wis", "cha"],
        defaultSkills: ["Religion", "Insight"],
        features: [
            { name: "Spellcasting", level: 1, desc: "Wisdom based. Prepared spells." },
            { name: "Divine Order", level: 1, desc: "Protector (Heavy Armor/Martial Weapons) or Thaumaturge (Extra Cantrip/Religion bonus)." },
            { name: "Channel Divinity", level: 2, desc: "Divine Spark (Heal/Damage) or Turn Undead." },
            { name: "Sear Undead", level: 5, desc: "Turn Undead deals radiant damage." },
            { name: "Blessed Strikes", level: 7, desc: "Divine Strike (1d8) or Potent Spellcasting (Wis mod)." },
            { name: "Divine Intervention", level: 10, desc: "Cast level 5 spell without slot." }
        ],
        subclasses: [
            {
                name: "Life Domain",
                features: [
                    { name: "Disciple of Life", level: 3, desc: "Healing spells heal extra." },
                    { name: "Preserve Life", level: 3, desc: "Channel Divinity: Heal pool." },
                    { name: "Blessed Healer", level: 6, desc: "Heal self when healing others." },
                    { name: "Supreme Healing", level: 17, desc: "Max healing dice." }
                ]
            }
        ]
    },
    {
        name: "Druid",
        hitDie: 8,
        savingThrows: ["int", "wis"],
        defaultSkills: ["Nature", "Survival"],
        features: [
            { name: "Druidic", level: 1, desc: "Secret language. Speak with Animals prepared." },
            { name: "Primal Order", level: 1, desc: "Magician (Cantrip/Arcana bonus) or Warden (Medium Armor/Martial Weapons)." },
            { name: "Wild Shape", level: 2, desc: "Bonus Action transform into beast. Gain Temp HP = Druid Level." },
            { name: "Wild Companion", level: 2, desc: "Summon familiar with Wild Shape use." },
            { name: "Wild Resurgence", level: 5, desc: "Convert spell slot to Wild Shape or vice versa." },
            { name: "Elemental Fury", level: 7, desc: "Potent Spellcasting or Primal Strike (1d8 element dmg)." }
        ],
        subclasses: [
            {
                name: "Circle of the Land",
                features: [
                    { name: "Land's Aid", level: 3, desc: "Use Wild Shape to heal/damage in area." },
                    { name: "Natural Recovery", level: 6, desc: "Recover slots on Short Rest. Free casting of circle spell." },
                    { name: "Nature's Ward", level: 10, desc: "Immune to Poison/Poisoned. Resistance to land type." }
                ]
            }
        ]
    },
    {
        name: "Fighter",
        hitDie: 10,
        savingThrows: ["str", "con"],
        defaultSkills: ["Athletics", "Intimidation"],
        features: [
            { name: "Fighting Style", level: 1, desc: "Gain a Fighting Style feat." },
            { name: "Second Wind", level: 1, desc: "Bonus Action: Regain 1d10 + Level HP." },
            { name: "Weapon Mastery", level: 1, desc: "Mastery properties for weapons (3)." },
            { name: "Action Surge", level: 2, desc: "One additional action." },
            { name: "Tactical Mind", level: 2, desc: "Expend Second Wind to add d10 to failed ability check." },
            { name: "Tactical Shift", level: 5, desc: "Move half speed when using Second Wind." },
            { name: "Indomitable", level: 9, desc: "Reroll failed save with fighter level bonus." },
            { name: "Tactical Master", level: 9, desc: "Swap weapon mastery property." },
            { name: "Two Extra Attacks", level: 11, desc: "Attack 3 times." },
            { name: "Studied Attacks", level: 13, desc: "Advantage after missing." }
        ],
        subclasses: [
            {
                name: "Champion",
                features: [
                    { name: "Improved Critical", level: 3, desc: "Crit on 19-20." },
                    { name: "Remarkable Athlete", level: 3, desc: "Advantage on Initiative and Athletics." },
                    { name: "Heroic Warrior", level: 10, desc: "Gain Heroic Inspiration at start of combat." },
                    { name: "Superior Critical", level: 15, desc: "Crit on 18-20." },
                    { name: "Survivor", level: 18, desc: "Regain HP each turn." }
                ]
            },
            {
                name: "Battle Master",
                features: [
                    { name: "Combat Superiority", level: 3, desc: "Superiority Dice (d8)." },
                    { name: "Student of War", level: 3, desc: "Artisan tool proficiency." },
                    { name: "Know Your Enemy", level: 7, desc: "Learn stats." },
                    { name: "Relentless", level: 15, desc: "Regain 1 die." }
                ]
            }
        ]
    },
    {
        name: "Monk",
        hitDie: 8,
        savingThrows: ["str", "dex"],
        defaultSkills: ["Acrobatics", "Stealth"],
        features: [
            { name: "Martial Arts", level: 1, desc: "Dex for unarmed/monk weapons. D6 damage die. Bonus unarmed strike." },
            { name: "Unarmored Defense", level: 1, desc: "AC = 10 + Dex + Wis." },
            { name: "Monk's Focus", level: 2, desc: "Focus Points for Flurry of Blows, Patient Defense, Step of the Wind." },
            { name: "Uncanny Metabolism", level: 2, desc: "Regain all Focus points on Initiative roll (Once/Long Rest)." },
            { name: "Deflect Attacks", level: 3, desc: "Reduce damage from melee/ranged attacks." },
            { name: "Stunning Strike", level: 5, desc: "Con save or Stunned (Costs Focus)." },
            { name: "Empowered Strikes", level: 6, desc: "Unarmed strikes deal Force damage." },
            { name: "Evasion", level: 7, desc: "Half damage on failed Dex save, none on success." },
            { name: "Self-Restoration", level: 10, desc: "Remove Charmed/Frightened/Poisoned." }
        ],
        subclasses: [
            {
                name: "Warrior of the Open Hand",
                features: [
                    { name: "Open Hand Technique", level: 3, desc: "Addle, Push, or Topple on Flurry hits." },
                    { name: "Wholeness of Body", level: 6, desc: "Bonus Action heal." },
                    { name: "Fleet Step", level: 11, desc: "Step of the Wind with other Bonus Actions." },
                    { name: "Quivering Palm", level: 17, desc: "Vibrate to deal massive damage." }
                ]
            }
        ]
    },
    {
        name: "Paladin",
        hitDie: 10,
        savingThrows: ["wis", "cha"],
        defaultSkills: ["Athletics", "Persuasion"],
        features: [
            { name: "Lay on Hands", level: 1, desc: "Healing pool 5 * Level. Bonus Action." },
            { name: "Weapon Mastery", level: 1, desc: "Mastery properties (2)." },
            { name: "Paladin's Smite", level: 2, desc: "Cast Divine Smite spell without slot (Once/Long Rest)." },
            { name: "Fighting Style", level: 2, desc: "Choose Fighting Style feat." },
            { name: "Channel Divinity", level: 3, desc: "Divine Sense (Bonus Action) or Subclass options." },
            { name: "Aura of Protection", level: 6, desc: "Add Cha mod to saves." },
            { name: "Abjure Foes", level: 9, desc: "Channel Divinity: Frighten/Limit actions." },
            { name: "Radiant Strikes", level: 11, desc: "1d8 Radiant on all hits." }
        ],
        subclasses: [
            {
                name: "Oath of Devotion",
                features: [
                    { name: "Sacred Weapon", level: 3, desc: "Add Cha to attack rolls. Light." },
                    { name: "Aura of Devotion", level: 7, desc: "Immunity to Charm." },
                    { name: "Smite of Protection", level: 15, desc: "Smite grants Half Cover." },
                    { name: "Holy Nimbus", level: 20, desc: "Radiant damage aura." }
                ]
            }
        ]
    },
    {
        name: "Ranger",
        hitDie: 10,
        savingThrows: ["str", "dex"],
        defaultSkills: ["Survival", "Stealth", "Perception"],
        features: [
            { name: "Favored Enemy", level: 1, desc: "Hunter's Mark always prepared. Cast without slot 2/Day (Increases at 5, 9, 13, 17)." },
            { name: "Weapon Mastery", level: 1, desc: "Mastery properties (2)." },
            { name: "Deft Explorer", level: 2, desc: "Expertise in one skill. Languages." },
            { name: "Fighting Style", level: 2, desc: "Fighting Style feat or Druidic Warrior." },
            { name: "Roving", level: 6, desc: "+10 Speed. Climb/Swim speeds." },
            { name: "Tireless", level: 10, desc: "Temp HP action. Reduce exhaustion." },
            { name: "Nature's Veil", level: 14, desc: "Bonus Action Invisible." }
        ],
        subclasses: [
            {
                name: "Hunter",
                features: [
                    { name: "Hunter's Prey", level: 3, desc: "Colossus Slayer (1d8 on hurt) or Horde Breaker (Extra attack)." },
                    { name: "Defensive Tactics", level: 7, desc: "Escape the Horde or Multiattack Defense." },
                    { name: "Superior Hunter's Prey", level: 11, desc: "Hunter's Mark deals damage to secondary target." }
                ]
            }
        ]
    },
    {
        name: "Rogue",
        hitDie: 8,
        savingThrows: ["dex", "int"],
        defaultSkills: ["Stealth", "Sleight of Hand", "Deception", "Acrobatics"],
        features: [
            { name: "Sneak Attack", level: 1, desc: "Extra damage on advantage or ally adjacent. Finesse/Ranged only." },
            { name: "Weapon Mastery", level: 1, desc: "Mastery properties (2)." },
            { name: "Thieves' Cant", level: 1, desc: "Secret language." },
            { name: "Cunning Action", level: 2, desc: "Bonus Action Dash, Disengage, Hide." },
            { name: "Steady Aim", level: 3, desc: "Bonus Action for Advantage (Speed 0)." },
            { name: "Uncanny Dodge", level: 5, desc: "Reaction halve damage." },
            { name: "Cunning Strike", level: 5, desc: "Trade Sneak Attack dice for effects (Poison, Trip, Withdraw)." },
            { name: "Evasion", level: 7, desc: "Half/No damage on Dex saves." },
            { name: "Reliable Talent", level: 7, desc: "Floor of 10 on proficient checks." }
        ],
        subclasses: [
            {
                name: "Thief",
                features: [
                    { name: "Fast Hands", level: 3, desc: "Bonus Action Use Object / Sleight of Hand." },
                    { name: "Second-Story Work", level: 3, desc: "Climb Speed." },
                    { name: "Supreme Sneak", level: 9, desc: "Cunning Strike: Stealth Attack (Invisible)." },
                    { name: "Use Magic Device", level: 13, desc: "Attune 4 items. Use scrolls." }
                ]
            }
        ]
    },
    {
        name: "Sorcerer",
        hitDie: 6,
        savingThrows: ["con", "cha"],
        defaultSkills: ["Arcana", "Persuasion"],
        features: [
            { name: "Innate Sorcery", level: 1, desc: "Bonus Action: +1 DC, Advantage on attacks for 1 min." },
            { name: "Font of Magic", level: 2, desc: "Sorcery Points." },
            { name: "Metamagic", level: 2, desc: "Alter spells (2 options)." },
            { name: "Sorcerous Restoration", level: 5, desc: "Regain Sorcery Points on Short Rest." },
            { name: "Sorcery Incarnate", level: 7, desc: "Regain Innate Sorcery uses with points. Use 2 metamagics." }
        ],
        subclasses: [
            {
                name: "Draconic Sorcery",
                features: [
                    { name: "Draconic Resilience", level: 3, desc: "AC 10 + Dex + Cha. +HP." },
                    { name: "Elemental Affinity", level: 6, desc: "Resistance and +Cha mod to damage." },
                    { name: "Dragon Wings", level: 14, desc: "Fly speed 60." }
                ]
            }
        ]
    },
    {
        name: "Warlock",
        hitDie: 8,
        savingThrows: ["wis", "cha"],
        defaultSkills: ["Arcana", "Deception"],
        features: [
            { name: "Eldritch Invocations", level: 1, desc: "Special magical abilities (1)." },
            { name: "Pact Magic", level: 1, desc: "Charisma spellcasting. Short rest slots." },
            { name: "Magical Cunning", level: 2, desc: "Recover slots (1 min ritual, Once/Long Rest)." },
            { name: "Contact Patron", level: 9, desc: "Cast Contact Other Plane without slot." },
            { name: "Mystic Arcanum", level: 11, desc: "Level 6+ spells." }
        ],
        subclasses: [
            {
                name: "Fiend Patron",
                features: [
                    { name: "Dark One's Blessing", level: 3, desc: "Temp HP on kill." },
                    { name: "Dark One's Own Luck", level: 6, desc: "Add 1d10 to check/save." },
                    { name: "Fiendish Resilience", level: 10, desc: "Resistance choice." },
                    { name: "Hurl Through Hell", level: 14, desc: "Banish on hit, 8d10 damage." }
                ]
            }
        ]
    },
    {
        name: "Wizard",
        hitDie: 6,
        savingThrows: ["int", "wis"],
        defaultSkills: ["Arcana", "History"],
        features: [
            { name: "Ritual Adept", level: 1, desc: "Cast rituals from book." },
            { name: "Arcane Recovery", level: 1, desc: "Regain slots on short rest." },
            { name: "Scholar", level: 2, desc: "Expertise in one Academic skill." },
            { name: "Memorize Spell", level: 5, desc: "Swap prepared spell on Short Rest." },
            { name: "Spell Mastery", level: 18, desc: "At-will level 1 & 2 spells." }
        ],
        subclasses: [
            {
                name: "Evoker",
                features: [
                    { name: "Evocation Savant", level: 3, desc: "Two free Evocation spells." },
                    { name: "Potent Cantrip", level: 3, desc: "Half damage on cantrip save." },
                    { name: "Sculpt Spells", level: 6, desc: "Allies save vs evocation." },
                    { name: "Empowered Evocation", level: 10, desc: "Add Int to damage." }
                ]
            }
        ]
    }
];

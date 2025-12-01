
import { MonsterData } from '../../types';
import { stats } from './utils';

export const UNDEAD: MonsterData[] = [
    {
        id: 'banshee',
        name: 'Banshee',
        type: 'Undead',
        size: 'Medium',
        ac: 12,
        hp: 58,
        speed: 0, // Fly 40 (hover)
        stats: stats(1, 14, 10, 12, 11, 17),
        cr: 4,
        resistances: ['acid', 'fire', 'lightning', 'thunder', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        immunities: ['cold', 'necrotic', 'poison'],
        conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained'],
        senses: 'Darkvision 60ft',
        languages: 'Common, Elvish',
        aiBehavior: 'caster',
        role: 'Villain',
        lore: "The malevolent spirit of a female elf that wails in torment.",
        actions: [
            {
                name: 'Corrupting Touch',
                type: 'melee',
                desc: 'Melee Spell Attack',
                attackBonus: 4,
                damage: '3d6+2',
                damageType: 'necrotic',
                reach: 5
            },
            {
                name: 'Wail',
                type: 'save',
                desc: '1/Day. All living creatures within 30 feet that can hear her must make a DC 13 Constitution saving throw. On a failure, a creature drops to 0 hit points. On a success, a creature takes 10 (3d6) psychic damage.',
                saveDC: 13,
                saveAbility: 'CON',
                damage: '0', // Special logic in combatEngine
                range: 30
            }
        ],
        traits: [
            { name: 'Detect Life', desc: 'The banshee can magically sense the presence of living creatures up to 5 miles away.' },
            { name: 'Incorporeal Movement', desc: 'The banshee can move through other creatures and objects as if they were difficult terrain. She takes 1d10 force damage if it ends its turn inside an object.' }
        ]
    },
    {
        id: 'ghost',
        name: 'Ghost',
        type: 'Undead',
        size: 'Medium',
        ac: 11,
        hp: 45,
        speed: 0, // Fly 40
        stats: stats(7, 13, 10, 10, 12, 17),
        cr: 4,
        resistances: ['acid', 'fire', 'lightning', 'thunder', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        immunities: ['cold', 'necrotic', 'poison'],
        conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained'],
        senses: 'Darkvision 60ft',
        aiBehavior: 'lurker',
        role: 'Adversary',
        lore: "A restless spirit that haunts a specific location.",
        actions: [
            {
                name: 'Withering Touch',
                type: 'melee',
                desc: 'Melee Weapon Attack',
                attackBonus: 5,
                damage: '4d6+3',
                damageType: 'necrotic',
                reach: 5
            },
            {
                name: 'Horrifying Visage',
                type: 'save',
                desc: 'Each non-undead creature within 60 feet of the ghost that can see it must succeed on a DC 13 Wisdom saving throw or be frightened for 1 minute.',
                saveDC: 13,
                saveAbility: 'WIS',
                damage: '0',
                range: 60
            }
        ],
        traits: [
            { name: 'Ethereal Sight', desc: 'The ghost can see 60 feet into the Ethereal Plane when it is on the Material Plane, and vice versa.' },
            { name: 'Incorporeal Movement', desc: 'The ghost can move through other creatures and objects as if they were difficult terrain.' }
        ]
    },
    {
        id: 'ghast',
        name: 'Ghast',
        type: 'Undead',
        size: 'Medium',
        ac: 13,
        hp: 36, // 8d8
        speed: 30,
        stats: stats(16, 17, 10, 11, 10, 8),
        cr: 2,
        resistances: ['necrotic'],
        immunities: ['poison'],
        conditionImmunities: ['charmed', 'exhaustion', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'Common',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A ghast is a ghoul infused with demoniac energy, stinking of death and corruption.",
        actions: [
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) piercing damage.',
                attackBonus: 3,
                damage: '2d8+3',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Claws',
                type: 'melee',
                desc: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If the target is a creature other than an undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute.',
                attackBonus: 5,
                damage: '2d6+3',
                damageType: 'slashing',
                reach: 5
            }
        ],
        traits: [
            { name: 'Stench', desc: 'Any creature that starts its turn within 5 feet of the ghast must succeed on a DC 10 Constitution saving throw or be poisoned until the start of its next turn.' },
            { name: 'Turning Defiance', desc: 'The ghast and any ghouls within 30 feet of it have advantage on saving throws against effects that turn undead.' }
        ]
    },
    {
        id: 'ghoul',
        name: 'Ghoul',
        type: 'Undead',
        size: 'Medium',
        ac: 12,
        hp: 22,
        speed: 30,
        stats: stats(13, 15, 10, 7, 10, 6),
        cr: 1,
        immunities: ['poison'],
        conditionImmunities: ['charmed', 'exhaustion', 'poisoned'],
        senses: 'Darkvision 60ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A feral undead creature that craves the flesh of the living.",
        actions: [
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Weapon Attack',
                attackBonus: 2,
                damage: '2d6+2',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Claws',
                type: 'melee',
                desc: 'Melee Weapon Attack. If the target is a creature other than an elf or undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute.',
                attackBonus: 4,
                damage: '2d4+2',
                damageType: 'slashing',
                reach: 5
            }
        ]
    },
    {
        id: 'lich',
        name: 'Lich',
        type: 'Undead',
        size: 'Medium',
        ac: 17,
        hp: 135,
        speed: 30,
        stats: stats(11, 16, 16, 20, 14, 16),
        cr: 21,
        resistances: ['cold', 'lightning', 'necrotic'],
        immunities: ['poison', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'paralyzed', 'poisoned'],
        senses: 'Truesight 120ft',
        aiBehavior: 'caster',
        role: 'Villain',
        lore: "An undead spellcaster who has defied death by magical means.",
        spellcasting: {
            class: 'Wizard',
            level: 18,
            ability: 'int',
            spells: ['Mage Hand', 'Prestidigitation', 'Ray of Frost', 'Magic Missile', 'Shield', 'Thunderwave', 'Invisibility', 'Mirror Image', 'Scorching Ray', 'Counterspell', 'Dispel Magic', 'Fireball', 'Blight', 'Dimension Door', 'Cloudkill', 'Disintegrate', 'Globe of Invulnerability', 'Finger of Death', 'Plane Shift', 'Dominate Monster', 'Power Word Stun', 'Power Word Kill']
        },
        actions: [
            {
                name: 'Paralyzing Touch',
                type: 'melee',
                desc: 'Melee Spell Attack. The target must succeed on a DC 18 Constitution saving throw or be paralyzed for 1 minute.',
                attackBonus: 12,
                damage: '3d6',
                damageType: 'cold',
                reach: 5
            }
        ],
        traits: [
            { name: 'Turn Resistance', desc: 'The lich has advantage on saving throws against any effect that turns undead.' },
            { name: 'Rejuvenation', desc: 'If it has a phylactery, a destroyed lich gains a new body in 1d10 days.' }
        ],
        legendaryActions: [
             { name: 'Cantrip', type: 'ability', desc: 'The lich casts a cantrip.', range: 0 },
             { name: 'Paralyzing Touch', type: 'melee', desc: 'The lich uses its Paralyzing Touch.', attackBonus: 12, damage: '3d6', damageType: 'cold' },
             { name: 'Frightening Gaze (Costs 2 Actions)', type: 'save', desc: 'The lich fixes its gaze on one creature it can see within 10 feet of it. The target must succeed on a DC 18 Wisdom saving throw or be frightened for 1 minute.', saveDC: 18, saveAbility: 'WIS', damage: '0' }
        ]
    },
    {
        id: 'minotaur_skeleton',
        name: 'Minotaur Skeleton',
        type: 'Undead',
        size: 'Large',
        ac: 12,
        hp: 67, // 9d10 + 18
        speed: 40,
        stats: stats(18, 11, 15, 6, 8, 5),
        cr: 2,
        vulnerabilities: ['bludgeoning'],
        immunities: ['poison'],
        conditionImmunities: ['exhaustion', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 9',
        languages: 'Understands Abyssal but can\'t speak',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "The reanimated bones of a minotaur, driven to slay.",
        actions: [
            {
                name: 'Greataxe',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.',
                attackBonus: 6,
                damage: '2d12+4',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Gore',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.',
                attackBonus: 6,
                damage: '2d8+4',
                damageType: 'piercing',
                reach: 5
            }
        ],
        traits: [
            { name: 'Charge', desc: 'If the skeleton moves at least 10 feet straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) piercing damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be pushed up to 10 feet away and knocked prone.' }
        ]
    },
    {
        id: 'mummy',
        name: 'Mummy',
        type: 'Undead',
        size: 'Medium',
        ac: 11,
        hp: 58,
        speed: 20,
        stats: stats(16, 8, 15, 6, 10, 12),
        cr: 3,
        vulnerabilities: ['fire'],
        immunities: ['necrotic', 'poison'],
        conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'paralyzed', 'poisoned'],
        senses: 'Darkvision 60ft',
        languages: 'Common, plus two others',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A desiccated corpse animated by dark magic and curses.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The mummy makes two Rotting Fist attacks and uses Dreadful Glare.',
                multiattackActions: ['Rotting Fist', 'Rotting Fist']
            },
            {
                name: 'Rotting Fist',
                type: 'melee',
                desc: 'Melee Weapon Attack. Hit: 8 (1d10 + 3) Bludgeoning damage plus 10 (3d6) Necrotic damage. Cursed (no heal, max HP reduced 3d6/day).',
                attackBonus: 5,
                damage: '1d10+3', 
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Dreadful Glare',
                type: 'save',
                desc: 'Wisdom Saving Throw: DC 11. Failure: Frightened until end of mummy\'s next turn.',
                saveDC: 11,
                saveAbility: 'WIS',
                damage: '0',
                range: 60
            }
        ]
    },
    {
        id: 'mummy_lord',
        name: 'Mummy Lord',
        type: 'Undead',
        size: 'Medium',
        ac: 17,
        hp: 97, // 13d8 + 39
        speed: 20,
        stats: stats(18, 10, 17, 11, 18, 16),
        cr: 15,
        savingThrowProficiencies: ['con', 'int', 'wis', 'cha'],
        skills: ['History', 'Religion'],
        vulnerabilities: ['fire'],
        immunities: ['necrotic', 'poison', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'paralyzed', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 14',
        languages: 'Common',
        aiBehavior: 'caster',
        role: 'Villain',
        lore: "An ancient monarch, preserved for eternity and awakened to reclaim their kingdom.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The mummy lord uses its Dreadful Glare and makes one Rotting Fist attack.',
                multiattackActions: ['Dreadful Glare', 'Rotting Fist']
            },
            {
                name: 'Rotting Fist',
                type: 'melee',
                desc: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage plus 21 (6d6) necrotic damage. The target must succeed on a DC 16 Constitution saving throw or be cursed with mummy rot.',
                attackBonus: 9,
                damage: '3d6+4+6d6',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Dreadful Glare',
                type: 'save',
                desc: 'The mummy lord targets one creature it can see within 60 feet of it. If the target can see the mummy lord, it must succeed on a DC 16 Wisdom saving throw against this magic or become frightened until the end of the mummy lord\'s next turn.',
                saveDC: 16,
                saveAbility: 'WIS',
                damage: '0',
                range: 60
            }
        ],
        spellcasting: {
            class: 'Cleric',
            level: 10,
            ability: 'wis',
            saveDC: 17,
            spells: ['Sacred Flame', 'Thaumaturgy', 'Command', 'Guiding Bolt', 'Shield of Faith', 'Hold Person', 'Silence', 'Spiritual Weapon', 'Animate Dead', 'Dispel Magic', 'Divination', 'Guardian of Faith', 'Contagion', 'Insect Plague', 'Harm']
        },
        traits: [
            { name: 'Magic Resistance', desc: 'The mummy lord has advantage on saving throws against spells and other magical effects.' },
            { name: 'Rejuvenation', desc: 'A destroyed mummy lord gains a new body in 24 hours if its heart is intact, regaining all its hit points and becoming active again.' }
        ],
        legendaryActions: [
            { name: 'Attack', type: 'melee', desc: 'The mummy lord makes one Rotting Fist attack.', attackBonus: 9, damage: '3d6+4+6d6', damageType: 'bludgeoning' },
            { name: 'Blinding Dust', type: 'save', desc: 'Each creature within 5 feet of the mummy lord must succeed on a DC 16 Constitution saving throw or be blinded until the end of the creature\'s next turn.', saveDC: 16, saveAbility: 'CON', damage: '0' },
            { name: 'Blasphemous Word (Costs 2 Actions)', type: 'save', desc: 'The mummy lord utters a blasphemous word. Each non-undead creature within 10 feet of the mummy lord that can hear the magical utterance must succeed on a DC 16 Constitution saving throw or be stunned until the end of the mummy lord\'s next turn.', saveDC: 16, saveAbility: 'CON', damage: '0' },
            { name: 'Channel Negative Energy (Costs 2 Actions)', type: 'save', desc: 'The mummy lord magically unleashes negative energy. Creatures within 60 feet of the mummy lord, including ones behind barriers and around corners, can\'t regain hit points until the end of the mummy lord\'s next turn.', damage: '0' },
            { name: 'Whirlwind of Sand (Costs 2 Actions)', type: 'ability', desc: 'The mummy lord magically transforms into a whirlwind of sand, moves up to 60 feet, and reverts to its normal form. While in whirlwind form, the mummy lord is immune to all damage, and it can\'t be grappled, petrified, knocked prone, restrained, or stunned. Equipment worn or carried by the mummy lord remains with it.' }
        ]
    },
    {
        id: 'ogre_zombie',
        name: 'Ogre Zombie',
        type: 'Undead',
        size: 'Large',
        ac: 8,
        hp: 85, // 9d10 + 36
        speed: 30,
        stats: stats(19, 6, 18, 3, 6, 5),
        cr: 2,
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 8',
        languages: 'Understands Giant and Common but can\'t speak',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "An ogre reanimated as a zombie, retaining its massive strength but losing its already dim wits.",
        actions: [
            {
                name: 'Morningstar',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.',
                attackBonus: 6,
                damage: '2d8+4',
                damageType: 'bludgeoning',
                reach: 5
            }
        ],
        traits: [
            { name: 'Undead Fortitude', desc: 'If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.' }
        ]
    },
    {
        id: 'shadow',
        name: 'Shadow',
        type: 'Undead',
        size: 'Medium',
        ac: 12,
        hp: 16, // 3d8 + 3
        speed: 40,
        stats: stats(6, 14, 13, 6, 10, 8),
        cr: 0.5,
        skills: ['Stealth'],
        vulnerabilities: ['radiant'],
        resistances: ['acid', 'cold', 'fire', 'lightning', 'thunder', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        immunities: ['necrotic', 'poison'],
        conditionImmunities: ['exhaustion', 'frightened', 'grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'None',
        aiBehavior: 'lurker',
        role: 'Adversary',
        lore: "An undead shadow that drains the strength of its victims.",
        actions: [
            {
                name: 'Strength Drain',
                type: 'melee',
                desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 9 (2d6 + 2) necrotic damage, and the target\'s Strength score is reduced by 1d4. The target dies if this reduces its Strength to 0. Otherwise, the reduction lasts until the target finishes a short or long rest.',
                attackBonus: 4,
                damage: '2d6+2',
                damageType: 'necrotic',
                reach: 5
            }
        ],
        traits: [
            { name: 'Amorphous', desc: 'The shadow can move through a space as narrow as 1 inch wide without squeezing.' },
            { name: 'Shadow Stealth', desc: 'While in dim light or darkness, the shadow can take the Hide action as a bonus action.' },
            { name: 'Sunlight Weakness', desc: 'While in sunlight, the shadow has disadvantage on attack rolls, ability checks, and saving throws.' }
        ]
    },
    {
        id: 'skeleton',
        name: 'Skeleton',
        type: 'Undead',
        size: 'Medium',
        ac: 13,
        hp: 13,
        speed: 30,
        stats: stats(10, 14, 15, 6, 8, 5),
        cr: 0.25,
        vulnerabilities: ['bludgeoning'],
        immunities: ['poison'],
        conditionImmunities: ['poisoned', 'exhaustion'],
        senses: 'Darkvision 60ft',
        languages: 'Understands languages it knew in life but can\'t speak',
        aiBehavior: 'minion',
        role: 'Adversary',
        lore: "An animated skeleton, stripped of flesh, it follows the orders of its creator without question.",
        actions: [
            {
                name: 'Shortsword',
                type: 'melee',
                desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.',
                attackBonus: 4,
                damage: '1d6+2',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Shortbow',
                type: 'ranged',
                desc: 'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.',
                attackBonus: 4,
                damage: '1d6+2',
                damageType: 'piercing',
                range: 80
            }
        ]
    },
    {
        id: 'specter',
        name: 'Specter',
        type: 'Undead',
        size: 'Medium',
        ac: 12,
        hp: 22,
        speed: 0, // Fly 50
        stats: stats(1, 14, 11, 10, 10, 11),
        cr: 1,
        resistances: ['acid', 'cold', 'fire', 'lightning', 'thunder', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        immunities: ['necrotic', 'poison'],
        conditionImmunities: ['charmed', 'exhaustion', 'grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained', 'unconscious'],
        senses: 'Darkvision 60ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "An angry, swirling spirit of a humanoid that has been prevented from passing to the afterlife.",
        actions: [
            {
                name: 'Life Drain',
                type: 'melee',
                desc: 'Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 10 (3d6) necrotic damage. The target must succeed on a DC 10 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken.',
                attackBonus: 4,
                damage: '3d6',
                damageType: 'necrotic',
                reach: 5
            }
        ],
        traits: [
            { name: 'Incorporeal Movement', desc: 'The specter can move through other creatures and objects as if they were difficult terrain.' },
            { name: 'Sunlight Sensitivity', desc: 'While in sunlight, the specter has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.' }
        ]
    },
    {
        id: 'vampire',
        name: 'Vampire',
        type: 'Undead',
        size: 'Medium',
        ac: 16,
        hp: 144,
        speed: 30,
        stats: stats(18, 18, 18, 17, 15, 18),
        cr: 13,
        resistances: ['necrotic', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        senses: 'Darkvision 120ft',
        aiBehavior: 'lurker',
        role: 'Villain',
        lore: "A powerful undead creature that sustains itself on the life essence of living creatures.",
        actions: [
             {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The vampire makes two attacks, only one of which can be a bite attack.',
                multiattackActions: ['Unarmed Strike', 'Bite']
            },
            {
                name: 'Unarmed Strike',
                type: 'melee',
                desc: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one creature. Hit: 8 (1d8 + 4) bludgeoning damage. Instead of dealing damage, the vampire can grapple the target (escape DC 18).',
                attackBonus: 9,
                damage: '1d8+4',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained. Hit: 7 (1d6 + 4) piercing damage plus 10 (3d6) necrotic damage. The target\'s hit point maximum is reduced by the necrotic damage taken.',
                attackBonus: 9,
                damage: '1d6+4+3d6', 
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Charm',
                type: 'save',
                desc: 'The vampire targets one humanoid it can see within 30 feet of it. The target must succeed on a DC 17 Wisdom saving throw or be charmed by the vampire.',
                saveDC: 17,
                saveAbility: 'WIS',
                damage: '0'
            }
        ],
        traits: [
             { name: 'Regeneration', desc: 'The vampire regains 20 hit points at the start of its turn if it has at least 1 hit point and isn\'t in sunlight or running water.' },
             { name: 'Spider Climb', desc: 'The vampire can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.' }
        ]
    },
    {
        id: 'vampire_spawn',
        name: 'Vampire Spawn',
        type: 'Undead',
        size: 'Medium',
        ac: 15,
        hp: 82, // 11d8 + 33
        speed: 30,
        stats: stats(16, 16, 16, 11, 10, 12),
        cr: 5,
        resistances: ['necrotic', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        senses: 'Darkvision 60ft, Passive Perception 13',
        languages: 'The languages it knew in life',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A lesser vampire under the control of a true vampire.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The vampire spawn makes two attacks, only one of which can be a bite attack.',
                multiattackActions: ['Claws', 'Bite']
            },
            {
                name: 'Claws',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 8 (2d4 + 3) slashing damage. Instead of dealing damage, the spawn can grapple the target (escape DC 13).',
                attackBonus: 6,
                damage: '2d4+3',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the spawn, incapacitated, or restrained. Hit: 6 (1d6 + 3) piercing damage plus 7 (2d6) necrotic damage. The target\'s hit point maximum is reduced by the necrotic damage taken.',
                attackBonus: 6,
                damage: '1d6+3+2d6',
                damageType: 'piercing',
                reach: 5
            }
        ],
        traits: [
            { name: 'Regeneration', desc: 'The spawn regains 10 hit points at the start of its turn if it has at least 1 hit point and isn\'t in sunlight or running water.' },
            { name: 'Spider Climb', desc: 'The spawn can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.' }
        ]
    },
    {
        id: 'warhorse_skeleton',
        name: 'Warhorse Skeleton',
        type: 'Undead',
        size: 'Large',
        ac: 13,
        hp: 22, // 3d10 + 6
        speed: 60,
        stats: stats(18, 12, 15, 2, 8, 5),
        cr: 0.5,
        vulnerabilities: ['bludgeoning'],
        immunities: ['poison'],
        conditionImmunities: ['exhaustion', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 9',
        languages: 'None',
        aiBehavior: 'minion',
        role: 'Mount',
        lore: "The animated bones of a warhorse.",
        actions: [
            {
                name: 'Hooves',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.',
                attackBonus: 6,
                damage: '2d6+4',
                damageType: 'bludgeoning',
                reach: 5
            }
        ]
    },
    {
        id: 'wight',
        name: 'Wight',
        type: 'Undead',
        size: 'Medium',
        ac: 14,
        hp: 45,
        speed: 30,
        stats: stats(15, 14, 16, 10, 13, 15),
        cr: 3,
        resistances: ['necrotic', 'bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t silvered'],
        immunities: ['poison'],
        conditionImmunities: ['exhaustion', 'poisoned'],
        senses: 'Darkvision 60ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "An intelligent undead soldier, burning with hatred for the living.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The wight makes two longsword attacks or two longbow attacks. It can use its Life Drain in place of one longsword attack.',
                multiattackActions: ['Longsword', 'Longsword']
            },
            {
                name: 'Life Drain',
                type: 'melee',
                desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) necrotic damage. The target must succeed on a DC 13 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken.',
                attackBonus: 4,
                damage: '1d6+2',
                damageType: 'necrotic',
                reach: 5
            },
            {
                name: 'Longsword',
                type: 'melee',
                desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage.',
                attackBonus: 4,
                damage: '1d8+2',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Longbow',
                type: 'ranged',
                desc: 'Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.',
                attackBonus: 4,
                damage: '1d8+2',
                damageType: 'piercing',
                range: 150
            }
        ],
        traits: [
            { name: 'Sunlight Sensitivity', desc: 'While in sunlight, the wight has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.' }
        ]
    },
    {
        id: 'will_o_wisp',
        name: 'Will-o\'-Wisp',
        type: 'Undead',
        size: 'Tiny',
        ac: 19,
        hp: 22, // 9d4
        speed: 0, // Fly 50 (hover)
        stats: stats(1, 28, 10, 13, 14, 11),
        cr: 2,
        resistances: ['acid', 'cold', 'fire', 'necrotic', 'thunder', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        immunities: ['lightning', 'poison'],
        conditionImmunities: ['exhaustion', 'grappled', 'paralyzed', 'poisoned', 'prone', 'restrained', 'unconscious'],
        senses: 'Darkvision 120ft, Passive Perception 12',
        languages: 'Auran, Common, Elvish',
        aiBehavior: 'lurker',
        role: 'Adversary',
        lore: "A malevolent ball of light that leads travelers to their doom.",
        actions: [
            {
                name: 'Shock',
                type: 'melee',
                desc: 'Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 9 (2d8) lightning damage.',
                attackBonus: 4,
                damage: '2d8',
                damageType: 'lightning',
                reach: 5
            },
            {
                name: 'Invisibility',
                type: 'ability',
                desc: 'The will-o\'-wisp and its light magically become invisible until it attacks or uses its Consume Life, or until its concentration ends.'
            }
        ],
        bonusActions: [
            {
                name: 'Consume Life',
                type: 'save',
                desc: 'The will-o\'-wisp targets one creature it can see within 5 feet of it that has 0 hit points and is still alive. The target must succeed on a DC 10 Constitution saving throw against this magic or die. If the target dies, the will-o\'-wisp regains 10 (3d6) hit points.',
                saveDC: 10,
                saveAbility: 'CON',
                damage: '0',
                range: 5
            }
        ],
        traits: [
            { name: 'Ephemeral', desc: 'The will-o\'-wisp can\'t wear or carry anything.' },
            { name: 'Variable Illumination', desc: 'The will-o\'-wisp sheds bright light in a 10- to 20-foot radius and dim light for an additional number of feet equal to the chosen radius. The will-o\'-wisp can alter the radius as a bonus action.' }
        ]
    },
    {
        id: 'wraith',
        name: 'Wraith',
        type: 'Undead',
        size: 'Medium',
        ac: 13,
        hp: 67,
        speed: 0, // Fly 60 (hover)
        stats: stats(6, 16, 16, 12, 14, 15),
        cr: 5,
        resistances: ['acid', 'cold', 'fire', 'lightning', 'thunder', 'bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t silvered'],
        immunities: ['necrotic', 'poison'],
        conditionImmunities: ['charmed', 'exhaustion', 'grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained'],
        senses: 'Darkvision 60ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A malicious spirit that hates all life.",
        actions: [
            {
                name: 'Life Drain',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 21 (4d8 + 3) necrotic damage. The target must succeed on a DC 14 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken.',
                attackBonus: 6,
                damage: '4d8+3',
                damageType: 'necrotic',
                reach: 5
            },
            {
                name: 'Create Specter',
                type: 'ability',
                desc: 'The wraith targets a humanoid within 10 feet of it that has been dead for no longer than 1 minute and died violently. The target\'s spirit rises as a specter in the space of its corpse or in the nearest unoccupied space. The specter is under the wraith\'s control.'
            }
        ],
        traits: [
            { name: 'Incorporeal Movement', desc: 'The wraith can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.' },
            { name: 'Sunlight Sensitivity', desc: 'While in sunlight, the wraith has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.' }
        ]
    },
    {
        id: 'zombie',
        name: 'Zombie',
        type: 'Undead',
        size: 'Medium',
        ac: 8,
        hp: 22,
        speed: 20,
        stats: stats(13, 6, 16, 3, 6, 5),
        cr: 0.25,
        immunities: ['poison'],
        conditionImmunities: ['poisoned', 'exhaustion'],
        senses: 'Darkvision 60ft',
        languages: 'Understands languages it knew in life but can\'t speak',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A reanimated corpse that stumbles forward with mindless hunger.",
        actions: [
            {
                name: 'Slam',
                type: 'melee',
                desc: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage.',
                attackBonus: 3,
                damage: '1d6+1',
                damageType: 'bludgeoning',
                reach: 5
            }
        ],
        traits: [
            { name: 'Undead Fortitude', desc: 'If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.' }
        ]
    }
];

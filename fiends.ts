
import { MonsterData } from '../../types';
import { stats } from './utils';

export const FIENDS: MonsterData[] = [
    {
        id: 'lemure',
        name: 'Lemure',
        type: 'Fiend',
        size: 'Medium',
        ac: 7,
        hp: 13, // 3d8
        speed: 15,
        stats: stats(10, 5, 11, 1, 11, 3),
        cr: 0,
        immunities: ['fire', 'poison'],
        conditionImmunities: ['charmed', 'frightened', 'poisoned'],
        senses: 'Darkvision 120ft, Passive Perception 10',
        languages: 'Understands Infernal but can\'t speak',
        aiBehavior: 'minion',
        role: 'Adversary',
        lore: "A mindless mass of quivering flesh, the lowest form of devil.",
        actions: [
            {
                name: 'Fist',
                type: 'melee',
                desc: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.',
                attackBonus: 3,
                damage: '1d4',
                damageType: 'bludgeoning',
                reach: 5
            }
        ],
        traits: [
            { name: 'Hellish Rejuvenation', desc: 'A lemure that dies in the Nine Hells comes back to life with all its hit points in 1d10 days unless it is killed by a bless spell or its remains are sprinkled with holy water.' }
        ]
    },
    {
        id: 'dretch',
        name: 'Dretch',
        type: 'Fiend',
        size: 'Small',
        ac: 11,
        hp: 18, // 4d6 + 4
        speed: 20,
        stats: stats(11, 11, 12, 5, 8, 3),
        cr: 0.25,
        resistances: ['cold', 'fire', 'lightning'],
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 9',
        languages: 'Abyssal, Telepathy 60ft (works only with creatures that understand Abyssal)',
        aiBehavior: 'minion',
        role: 'Adversary',
        lore: "Self-loathing, slovenly demons that serve as the rank and file of Abyssal armies.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dretch makes two attacks: one with its bite and one with its claws.',
                multiattackActions: ['Bite', 'Claws']
            },
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage.',
                attackBonus: 2,
                damage: '1d6',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Claws',
                type: 'melee',
                desc: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 5 (2d4) slashing damage.',
                attackBonus: 2,
                damage: '2d4',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Fetid Cloud',
                type: 'save',
                desc: '1/Day. A 10-foot radius of disgusting green gas extends from the dretch. The gas spreads around corners, and its area is lightly obscured. It lasts for 1 minute or until a strong wind disperses it. Any creature that starts its turn in that area must succeed on a DC 11 Constitution saving throw or be poisoned until the start of its next turn. While poisoned in this way, the target can take either an action or a bonus action on its turn, not both, and can\'t take reactions.',
                saveDC: 11,
                saveAbility: 'CON',
                damage: '0'
            }
        ]
    },
    {
        id: 'imp',
        name: 'Imp',
        type: 'Fiend',
        size: 'Tiny',
        ac: 13,
        hp: 10, // 3d4 + 3
        speed: 20, // Fly 40
        stats: stats(6, 17, 13, 11, 12, 14),
        cr: 1,
        resistances: ['cold', 'bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t silvered'],
        immunities: ['fire', 'poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Darkvision 120ft, Passive Perception 11',
        languages: 'Infernal, Common',
        aiBehavior: 'lurker',
        role: 'Adversary',
        lore: "A mischievous devil that often serves as a familiar.",
        actions: [
            {
                name: 'Sting',
                type: 'melee',
                desc: 'Melee Weapon Attack. Target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one.',
                attackBonus: 5,
                damage: '1d4+3', 
                damageType: 'piercing',
                reach: 5
            },
             {
                name: 'Invisibility',
                type: 'ability',
                desc: 'The imp turns invisible until it attacks or uses its concentration ends.',
                reach: 0
            }
        ],
        traits: [
             { name: 'Shapechanger', desc: 'Can polymorph into a beast form (rat, raven, or spider).' },
             { name: 'Devil\'s Sight', desc: 'Magical darkness doesn\'t impede the imp\'s darkvision.' },
             { name: 'Magic Resistance', desc: 'Advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'quasit',
        name: 'Quasit',
        type: 'Fiend',
        size: 'Tiny',
        ac: 13,
        hp: 7, // 3d4
        speed: 40,
        stats: stats(5, 17, 10, 7, 10, 10),
        cr: 1,
        resistances: ['cold', 'fire', 'lightning', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Darkvision 120ft, Passive Perception 10',
        languages: 'Abyssal, Common',
        aiBehavior: 'lurker',
        role: 'Adversary',
        lore: "A tiny, green demon that shapechanges and serves chaotic evil masters.",
        actions: [
            {
                name: 'Claws',
                type: 'melee',
                desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage, and the target must succeed on a DC 10 Constitution saving throw or take 5 (2d4) poison damage and become poisoned for 1 minute.',
                attackBonus: 4,
                damage: '1d4+3',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Scare',
                type: 'save',
                desc: '1/Day. One creature of the quasit\'s choice within 20 feet of it must succeed on a DC 10 Wisdom saving throw or be frightened for 1 minute. The target can repeat the saving throw at the end of each of its turns, with disadvantage if the quasit is within line of sight, ending the effect on itself on a success.',
                saveDC: 10,
                saveAbility: 'WIS',
                damage: '0',
                range: 20
            },
            {
                name: 'Invisibility',
                type: 'ability',
                desc: 'The quasit turns invisible until it attacks or uses Scare, or until its concentration ends.'
            }
        ],
        traits: [
            { name: 'Shapechanger', desc: 'Can polymorph into a beast form (bat, centipede, or toad).' },
            { name: 'Magic Resistance', desc: 'Advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'hell_hound',
        name: 'Hell Hound',
        type: 'Fiend',
        size: 'Medium',
        ac: 15,
        hp: 45, // 7d8 + 14
        speed: 50,
        stats: stats(17, 12, 14, 6, 13, 6),
        cr: 3,
        immunities: ['fire'],
        senses: 'Darkvision 60ft, Passive Perception 15',
        languages: 'Infernal',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "Monstrous fire-breathing dogs from the Nine Hells.",
        actions: [
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 7 (2d6) fire damage.',
                attackBonus: 5,
                damage: '1d8+3+2d6',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Fire Breath',
                type: 'save',
                desc: 'Recharge 5-6. The hound exhales fire in a 15-foot cone. Each creature in that area must make a DC 12 Dexterity saving throw, taking 21 (6d6) fire damage on a failed save, or half as much damage on a successful one.',
                damage: '6d6',
                damageType: 'fire',
                saveDC: 12,
                saveAbility: 'DEX',
                range: 15
            }
        ],
        traits: [
            { name: 'Keen Hearing and Smell', desc: 'The hound has advantage on Wisdom (Perception) checks that rely on hearing or smell.' },
            { name: 'Pack Tactics', desc: 'The hound has advantage on an attack roll against a creature if at least one of the hound\'s allies is within 5 feet of the creature and the ally isn\'t incapacitated.' }
        ]
    },
    {
        id: 'nightmare',
        name: 'Nightmare',
        type: 'Fiend',
        size: 'Large',
        ac: 13,
        hp: 68, // 8d10 + 24
        speed: 60, // Fly 90
        stats: stats(18, 15, 16, 10, 13, 15),
        cr: 3,
        immunities: ['fire'],
        senses: 'Passive Perception 11',
        languages: 'Abyssal, Common, Infernal',
        aiBehavior: 'aggressive',
        role: 'Mount',
        lore: "A black horse with a mane and tail of pure fire.",
        actions: [
            {
                name: 'Hooves',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage plus 7 (2d6) fire damage.',
                attackBonus: 6,
                damage: '2d8+4+2d6',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Ethereal Stride',
                type: 'ability',
                desc: 'The nightmare and up to three willing creatures within 5 feet of it magically enter the Ethereal Plane from the Material Plane, or vice versa.'
            }
        ],
        traits: [
            { name: 'Confer Fire Resistance', desc: 'The nightmare can grant resistance to fire damage to anyone riding it.' },
            { name: 'Illumination', desc: 'The nightmare sheds bright light in a 10-foot radius and dim light for an additional 10 feet.' }
        ]
    },
    {
        id: 'bearded_devil',
        name: 'Bearded Devil',
        type: 'Fiend',
        size: 'Medium',
        ac: 13,
        hp: 52, // 8d8 + 16
        speed: 30,
        stats: stats(16, 15, 15, 9, 11, 11),
        cr: 3,
        resistances: ['cold', 'bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t silvered'],
        immunities: ['fire', 'poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Darkvision 120ft, Passive Perception 10',
        languages: 'Infernal, Telepathy 120ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A humanoid devil with a snakelike beard and a glaive.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The devil makes two attacks: one with its beard and one with its glaive.',
                multiattackActions: ['Beard', 'Glaive']
            },
            {
                name: 'Beard',
                type: 'melee',
                desc: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) piercing damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. While poisoned in this way, the target can\'t regain hit points. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.',
                attackBonus: 5,
                damage: '1d8+2',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Glaive',
                type: 'melee',
                desc: 'Melee Weapon Attack: +5 to hit, reach 10 ft., one target. Hit: 8 (1d10 + 3) slashing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 12 Constitution saving throw or lose 5 (1d10) hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the damage dealt by the wound increases by 5 (1d10). Any creature can take an action to stanch the wound with a successful DC 12 Wisdom (Medicine) check. The wound also closes if the target receives magical healing.',
                attackBonus: 5,
                damage: '1d10+3',
                damageType: 'slashing',
                reach: 10
            }
        ],
        traits: [
            { name: 'Devil\'s Sight', desc: 'Magical darkness doesn\'t impede the devil\'s darkvision.' },
            { name: 'Magic Resistance', desc: 'The devil has advantage on saving throws against spells and other magical effects.' },
            { name: 'Steadfast', desc: 'The devil can\'t be frightened while it can see an allied creature within 30 feet of it.' }
        ]
    },
    {
        id: 'succubus_incubus',
        name: 'Succubus/Incubus',
        type: 'Fiend',
        size: 'Medium',
        ac: 15,
        hp: 66, // 12d8 + 12
        speed: 30, // Fly 60
        stats: stats(8, 17, 13, 15, 12, 20),
        cr: 4,
        resistances: ['cold', 'fire', 'lightning', 'poison', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        senses: 'Darkvision 60ft, Passive Perception 15',
        languages: 'Abyssal, Common, Infernal, Telepathy 60ft',
        aiBehavior: 'lurker',
        role: 'Adversary',
        lore: "Shapechangers who lure mortals into corruption.",
        actions: [
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.',
                attackBonus: 5,
                damage: '1d6+3',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Charm',
                type: 'save',
                desc: 'One humanoid the fiend can see within 30 feet of it must succeed on a DC 15 Wisdom saving throw or be magically charmed for 1 day. The charmed target obeys the fiend\'s verbal or telepathic commands.',
                saveDC: 15,
                saveAbility: 'WIS',
                damage: '0',
                range: 30
            },
            {
                name: 'Draining Kiss',
                type: 'melee',
                desc: 'The fiend kisses a creature charmed by it or a willing creature. The target must make a DC 15 Constitution saving throw against this magic, taking 32 (5d10 + 5) psychic damage on a failed save, or half as much damage on a successful one. The target\'s hit point maximum is reduced by an amount equal to the damage taken.',
                attackBonus: 5,
                damage: '5d10+5',
                damageType: 'psychic',
                reach: 5
            },
            {
                name: 'Etherealness',
                type: 'ability',
                desc: 'The fiend magically enters the Ethereal Plane from the Material Plane, or vice versa.'
            }
        ],
        traits: [
            { name: 'Telepathic Bond', desc: 'The fiend ignores the range restriction on its telepathy when communicating with a creature it has charmed. The two don\'t even need to be on the same plane of existence.' },
            { name: 'Shapechanger', desc: 'The fiend can use its action to polymorph into a Small or Medium humanoid, or back into its true form.' }
        ]
    },
    {
        id: 'barbed_devil',
        name: 'Barbed Devil',
        type: 'Fiend',
        size: 'Medium',
        ac: 15,
        hp: 110, // 13d8 + 52
        speed: 30,
        stats: stats(16, 17, 18, 12, 14, 14),
        cr: 5,
        resistances: ['cold', 'bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t silvered'],
        immunities: ['fire', 'poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Darkvision 120ft, Passive Perception 18',
        languages: 'Infernal, Telepathy 120ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A bipedal devil covered in sharp barbs.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The devil makes three melee attacks: one with its tail and two with its claws. Alternatively, it can use Hurl Flame twice.',
                multiattackActions: ['Claw', 'Claw', 'Tail']
            },
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage.',
                attackBonus: 6,
                damage: '1d6+3',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Tail',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage.',
                attackBonus: 6,
                damage: '2d6+3',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Hurl Flame',
                type: 'ranged',
                desc: 'Ranged Spell Attack: +5 to hit, range 150 ft., one target. Hit: 10 (3d6) fire damage.',
                attackBonus: 5,
                damage: '3d6',
                damageType: 'fire',
                range: 150
            }
        ],
        traits: [
            { name: 'Barbed Hide', desc: 'At the start of each of its turns, the barbed devil deals 5 (1d10) piercing damage to any creature grappling it.' },
            { name: 'Devil\'s Sight', desc: 'Magical darkness doesn\'t impede the devil\'s darkvision.' },
            { name: 'Magic Resistance', desc: 'The devil has advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'vrock',
        name: 'Vrock',
        type: 'Fiend',
        size: 'Large',
        ac: 15,
        hp: 104, // 11d10 + 44
        speed: 40, // Fly 60
        stats: stats(17, 15, 18, 8, 13, 8),
        cr: 6,
        resistances: ['cold', 'fire', 'lightning', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Darkvision 120ft, Passive Perception 11',
        languages: 'Abyssal, Telepathy 120ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A giant, vulture-like demon that loves to cause pain.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The vrock makes two attacks: one with its beak and one with its talons.',
                multiattackActions: ['Beak', 'Talons']
            },
            {
                name: 'Beak',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage.',
                attackBonus: 6,
                damage: '2d6+3',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Talons',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 14 (2d10 + 3) slashing damage.',
                attackBonus: 6,
                damage: '2d10+3',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Spores',
                type: 'save',
                desc: 'Recharge 6. A 15-foot-radius cloud of toxic spores extends from the vrock. The spores spread around corners. Each creature in that area must succeed on a DC 14 Constitution saving throw or become poisoned. While poisoned in this way, a target takes 5 (1d10) poison damage at the start of each of its turns. A target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.',
                saveDC: 14,
                saveAbility: 'CON',
                damage: '1d10',
                damageType: 'poison',
                range: 15
            },
            {
                name: 'Stunning Screech',
                type: 'save',
                desc: '1/Day. The vrock emits a horrific screech. Each creature within 20 feet of it that can hear it and that isn\'t a demon must succeed on a DC 14 Constitution saving throw or be stunned until the end of the vrock\'s next turn.',
                saveDC: 14,
                saveAbility: 'CON',
                damage: '0',
                range: 20
            }
        ],
        traits: [
            { name: 'Magic Resistance', desc: 'The vrock has advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'chain_devil',
        name: 'Chain Devil',
        type: 'Fiend',
        size: 'Medium',
        ac: 16,
        hp: 85, // 10d8 + 40
        speed: 30,
        stats: stats(18, 15, 18, 11, 12, 14),
        cr: 8,
        resistances: ['cold', 'bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t silvered'],
        immunities: ['fire', 'poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Darkvision 120ft, Passive Perception 11',
        languages: 'Infernal, Telepathy 120ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A humanoid devil wrapped in dancing chains.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The devil makes two attacks with its chains.',
                multiattackActions: ['Chain', 'Chain']
            },
            {
                name: 'Chain',
                type: 'melee',
                desc: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) slashing damage. The target is grappled (escape DC 14) if the devil isn\'t already grappling a creature. Until this grapple ends, the target is restrained and takes 7 (2d6) piercing damage at the start of each of its turns.',
                attackBonus: 8,
                damage: '2d6+4',
                damageType: 'slashing',
                reach: 10
            },
            {
                name: 'Animate Chains',
                type: 'ability',
                desc: 'Recharges after a Short or Long Rest. Up to four chains the devil can see within 60 feet of it magically sprout razor-edged barbs and animate under the devil\'s control, provided that the chains aren\'t being worn or carried.',
                range: 60
            }
        ],
        traits: [
            { name: 'Devil\'s Sight', desc: 'Magical darkness doesn\'t impede the devil\'s darkvision.' },
            { name: 'Magic Resistance', desc: 'The devil has advantage on saving throws against spells and other magical effects.' },
            { name: 'Unnerving Mask', desc: 'When a creature the devil can see starts its turn within 30 feet of the devil, the devil can create the illusion that it looks like one of the creature\'s departed loved ones or bitter enemies. The target must make a DC 14 Wisdom saving throw. On a failed save, the target is frightened until the start of its next turn.' }
        ]
    },
    {
        id: 'hezrou',
        name: 'Hezrou',
        type: 'Fiend',
        size: 'Large',
        ac: 16,
        hp: 136, // 13d10 + 65
        speed: 30,
        stats: stats(19, 17, 20, 5, 12, 13),
        cr: 8,
        resistances: ['cold', 'fire', 'lightning', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Darkvision 120ft, Passive Perception 11',
        languages: 'Abyssal, Telepathy 120ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A toad-like demon that exudes a foul stench.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The hezrou makes three attacks: one with its bite and two with its claws.',
                multiattackActions: ['Bite', 'Claw', 'Claw']
            },
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage.',
                attackBonus: 7,
                damage: '2d10+4',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.',
                attackBonus: 7,
                damage: '2d6+4',
                damageType: 'slashing',
                reach: 5
            }
        ],
        traits: [
            { name: 'Magic Resistance', desc: 'The hezrou has advantage on saving throws against spells and other magical effects.' },
            { name: 'Stench', desc: 'Any creature that starts its turn within 10 feet of the hezrou must succeed on a DC 14 Constitution saving throw or be poisoned until the start of its next turn. On a successful saving throw, the creature is immune to the hezrou\'s stench for 24 hours.' }
        ]
    },
    {
        id: 'bone_devil',
        name: 'Bone Devil',
        type: 'Fiend',
        size: 'Large',
        ac: 19,
        hp: 142, // 15d10 + 60
        speed: 40, // Fly 40
        stats: stats(18, 16, 18, 13, 14, 16),
        cr: 9,
        resistances: ['cold', 'bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t silvered'],
        immunities: ['fire', 'poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Darkvision 120ft, Passive Perception 12',
        languages: 'Infernal, Telepathy 120ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A tall, skeletal devil with a sting.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The devil makes three attacks: two with its claws and one with its sting.',
                multiattackActions: ['Claw', 'Claw', 'Sting']
            },
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 8 (1d8 + 4) slashing damage.',
                attackBonus: 8,
                damage: '1d8+4',
                damageType: 'slashing',
                reach: 10
            },
            {
                name: 'Sting',
                type: 'melee',
                desc: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) piercing damage plus 17 (5d6) poison damage, and the target must succeed on a DC 14 Constitution saving throw or become poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.',
                attackBonus: 8,
                damage: '2d8+4+5d6',
                damageType: 'piercing',
                reach: 10
            }
        ],
        traits: [
            { name: 'Devil\'s Sight', desc: 'Magical darkness doesn\'t impede the devil\'s darkvision.' },
            { name: 'Magic Resistance', desc: 'The devil has advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'glabrezu',
        name: 'Glabrezu',
        type: 'Fiend',
        size: 'Large',
        ac: 17,
        hp: 157, // 15d10 + 75
        speed: 40,
        stats: stats(24, 15, 21, 19, 17, 16),
        cr: 9,
        resistances: ['cold', 'fire', 'lightning', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Truesight 120ft, Passive Perception 13',
        languages: 'Abyssal, Telepathy 120ft',
        aiBehavior: 'caster',
        role: 'Villain',
        lore: "A massive demon with four arms and a dog-like head, a master of temptation and brute force.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The glabrezu makes four attacks: two with its pincers and two with its fists. Alternatively, it makes two attacks with its pincers and casts one spell.',
                multiattackActions: ['Pincer', 'Pincer', 'Fist', 'Fist']
            },
            {
                name: 'Pincer',
                type: 'melee',
                desc: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage. If the target is a Medium or smaller creature, it is grappled (escape DC 15). The glabrezu has two pincers, each of which can grapple only one target.',
                attackBonus: 9,
                damage: '2d10+5',
                damageType: 'bludgeoning',
                reach: 10
            },
            {
                name: 'Fist',
                type: 'melee',
                desc: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) bludgeoning damage.',
                attackBonus: 9,
                damage: '2d4+2',
                damageType: 'bludgeoning',
                reach: 5
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 9,
            ability: 'int',
            spells: ['Darkness', 'Detect Magic', 'Dispel Magic', 'Confusion', 'Fly', 'Power Word Stun']
        },
        traits: [
            { name: 'Magic Resistance', desc: 'The glabrezu has advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'horned_devil',
        name: 'Horned Devil',
        type: 'Fiend',
        size: 'Large',
        ac: 18,
        hp: 178, // 17d10 + 85
        speed: 20, // Fly 60
        stats: stats(22, 17, 21, 12, 16, 15),
        cr: 11,
        resistances: ['cold', 'bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t silvered'],
        immunities: ['fire', 'poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Darkvision 120ft, Passive Perception 13',
        languages: 'Infernal, Telepathy 120ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A winged devil with a fork-like tail.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The devil makes three melee attacks: two with its fork and one with its tail. It can use Hurl Flame in place of any melee attack.',
                multiattackActions: ['Fork', 'Fork', 'Tail']
            },
            {
                name: 'Fork',
                type: 'melee',
                desc: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (2d8 + 6) piercing damage.',
                attackBonus: 10,
                damage: '2d8+6',
                damageType: 'piercing',
                reach: 10
            },
            {
                name: 'Tail',
                type: 'melee',
                desc: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 10 (1d8 + 6) piercing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 17 Constitution saving throw or lose 10 (3d6) hit points at the start of each of its turns due to an infernal wound.',
                attackBonus: 10,
                damage: '1d8+6',
                damageType: 'piercing',
                reach: 10
            },
            {
                name: 'Hurl Flame',
                type: 'ranged',
                desc: 'Ranged Spell Attack: +7 to hit, range 150 ft., one target. Hit: 14 (4d6) fire damage.',
                attackBonus: 7,
                damage: '4d6',
                damageType: 'fire',
                range: 150
            }
        ],
        traits: [
            { name: 'Devil\'s Sight', desc: 'Magical darkness doesn\'t impede the devil\'s darkvision.' },
            { name: 'Magic Resistance', desc: 'The devil has advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'erinyes',
        name: 'Erinyes',
        type: 'Fiend',
        size: 'Medium',
        ac: 18,
        hp: 153, // 18d8 + 72
        speed: 30, // Fly 60
        stats: stats(18, 16, 18, 14, 14, 18),
        cr: 12,
        resistances: ['cold', 'bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t silvered'],
        immunities: ['fire', 'poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Truesight 120ft, Passive Perception 16',
        languages: 'Infernal, Telepathy 120ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A beautiful yet terrifying devil with large feathered wings.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The erinyes makes three attacks.',
                multiattackActions: ['Longsword', 'Longsword', 'Longsword']
            },
            {
                name: 'Longsword',
                type: 'melee',
                desc: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage plus 13 (3d8) poison damage.',
                attackBonus: 8,
                damage: '1d8+4+3d8',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Longbow',
                type: 'ranged',
                desc: 'Ranged Weapon Attack: +7 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 13 (3d8) poison damage.',
                attackBonus: 7,
                damage: '1d8+3+3d8',
                damageType: 'piercing',
                range: 150
            }
        ],
        traits: [
            { name: 'Hellish Weapons', desc: 'The erinyes\'s weapon attacks are magical and deal an extra 13 (3d8) poison damage on a hit (included in the attacks).' },
            { name: 'Magic Resistance', desc: 'The erinyes has advantage on saving throws against spells and other magical effects.' }
        ],
        reactions: [
            { name: 'Parry', type: 'ability', desc: 'The erinyes adds 4 to its AC against one melee attack that would hit it. To do so, the erinyes must see the attacker and be wielding a melee weapon.' }
        ]
    },
    {
        id: 'nalfeshnee',
        name: 'Nalfeshnee',
        type: 'Fiend',
        size: 'Large',
        ac: 18,
        hp: 184, // 16d10 + 96
        speed: 20, // Fly 30
        stats: stats(21, 10, 22, 19, 12, 15),
        cr: 13,
        resistances: ['cold', 'fire', 'lightning', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Truesight 120ft, Passive Perception 11',
        languages: 'Abyssal, Telepathy 120ft',
        aiBehavior: 'aggressive',
        role: 'Villain',
        lore: "A grotesque mix of ape and boar, ruling Abyssal realms.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The nalfeshnee uses Horror Nimbus if it can. It then makes three attacks: one with its bite and two with its claws.',
                multiattackActions: ['Bite', 'Claw', 'Claw']
            },
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 32 (5d10 + 5) piercing damage.',
                attackBonus: 10,
                damage: '5d10+5',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) slashing damage.',
                attackBonus: 10,
                damage: '3d6+5',
                damageType: 'slashing',
                reach: 10
            },
            {
                name: 'Horror Nimbus',
                type: 'save',
                desc: 'Recharge 5-6. The nalfeshnee emits a scintillating, multicolored light. Each creature within 15 feet of the nalfeshnee that can see the light must succeed on a DC 15 Wisdom saving throw or be frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature\'s saving throw is successful or the effect ends for it, the creature is immune to the nalfeshnee\'s Horror Nimbus for the next 24 hours.',
                saveDC: 15,
                saveAbility: 'WIS',
                damage: '0',
                range: 15
            }
        ],
        traits: [
            { name: 'Magic Resistance', desc: 'The nalfeshnee has advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'rakshasa',
        name: 'Rakshasa',
        type: 'Fiend',
        size: 'Medium',
        ac: 16,
        hp: 110, // 13d8 + 52
        speed: 40,
        stats: stats(14, 17, 18, 13, 16, 20),
        cr: 13,
        vulnerabilities: ['piercing from magic weapons wielded by good creatures'],
        immunities: ['bludgeoning, piercing, and slashing from nonmagical attacks'],
        senses: 'Darkvision 60ft, Passive Perception 13',
        languages: 'Common, Infernal',
        aiBehavior: 'caster',
        role: 'Villain',
        lore: "A manipulative fiend that resembles a humanoid tiger.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The rakshasa makes two claw attacks.',
                multiattackActions: ['Claw', 'Claw']
            },
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage, and the target is cursed if it is a creature. The magical curse takes effect whenever the target takes a short or long rest, filling the target\'s thoughts with nightmares. The target gains no benefit from finishing the rest. The curse lasts until it is lifted by a remove curse spell or similar magic.',
                attackBonus: 7,
                damage: '2d6+2',
                damageType: 'slashing',
                reach: 5
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 9,
            ability: 'cha',
            spells: ['Detect Thoughts', 'Disguise Self', 'Mage Hand', 'Minor Illusion', 'Charm Person', 'Detect Magic', 'Invisibility', 'Major Image', 'Suggestion', 'Dominate Person', 'Fly', 'Plane Shift', 'True Seeing']
        },
        traits: [
            { name: 'Limited Magic Immunity', desc: 'The rakshasa can\'t be affected or detected by spells of 6th level or lower unless it wishes to be. It has advantage on saving throws against all other spells and magical effects.' }
        ]
    },
    {
        id: 'ice_devil',
        name: 'Ice Devil',
        type: 'Fiend',
        size: 'Large',
        ac: 18,
        hp: 180, // 19d10 + 76
        speed: 40,
        stats: stats(21, 9, 18, 18, 15, 18),
        cr: 14,
        resistances: ['bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t silvered'],
        immunities: ['cold', 'fire', 'poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Blindsight 60ft, Darkvision 120ft, Passive Perception 12',
        languages: 'Infernal, Telepathy 120ft',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "An insectoid devil found in the frozen layers of Hell.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The devil makes three attacks: one with its bite, one with its claws, and one with its tail.',
                multiattackActions: ['Bite', 'Claws', 'Tail']
            },
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) piercing damage plus 10 (3d6) cold damage.',
                attackBonus: 10,
                damage: '2d6+5+3d6',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Claws',
                type: 'melee',
                desc: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 10 (2d4 + 5) slashing damage plus 10 (3d6) cold damage.',
                attackBonus: 10,
                damage: '2d4+5+3d6',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Tail',
                type: 'melee',
                desc: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage plus 10 (3d6) cold damage.',
                attackBonus: 10,
                damage: '2d6+5+3d6',
                damageType: 'bludgeoning',
                reach: 10
            },
            {
                name: 'Wall of Ice',
                type: 'ability',
                desc: 'Recharge 6. The devil magically forms an opaque wall of ice on a solid surface it can see within 60 feet of it. The wall is 1 foot thick and up to 30 feet long and 10 feet high, or it\'s a hemispherical dome up to 20 feet in diameter.'
            }
        ],
        traits: [
            { name: 'Devil\'s Sight', desc: 'Magical darkness doesn\'t impede the devil\'s darkvision.' },
            { name: 'Magic Resistance', desc: 'The devil has advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'marilith',
        name: 'Marilith',
        type: 'Fiend',
        size: 'Large',
        ac: 18,
        hp: 189, // 18d10 + 90
        speed: 40,
        stats: stats(18, 20, 20, 18, 16, 20),
        cr: 16,
        resistances: ['cold', 'fire', 'lightning', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Truesight 120ft, Passive Perception 13',
        languages: 'Abyssal, Telepathy 120ft',
        aiBehavior: 'aggressive',
        role: 'Villain',
        lore: "A six-armed demon general, a master of tactics and swordplay.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The marilith makes seven attacks: six with its longswords and one with its tail.',
                multiattackActions: ['Longsword', 'Longsword', 'Longsword', 'Longsword', 'Longsword', 'Longsword', 'Tail']
            },
            {
                name: 'Longsword',
                type: 'melee',
                desc: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.',
                attackBonus: 9,
                damage: '2d8+4',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Tail',
                type: 'melee',
                desc: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one creature. Hit: 15 (2d10 + 4) bludgeoning damage. If the target is Medium or smaller, it is grappled (escape DC 19). Until this grapple ends, the target is restrained, the marilith can automatically hit the target with its tail, and the marilith can\'t make tail attacks against other targets.',
                attackBonus: 9,
                damage: '2d10+4',
                damageType: 'bludgeoning',
                reach: 10
            },
            {
                name: 'Teleport',
                type: 'ability',
                desc: 'The marilith magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see.'
            }
        ],
        traits: [
            { name: 'Magic Resistance', desc: 'The marilith has advantage on saving throws against spells and other magical effects.' },
            { name: 'Reactive', desc: 'The marilith can take one reaction on every turn in a combat.' }
        ],
        reactions: [
            { name: 'Parry', type: 'ability', desc: 'The marilith adds 5 to its AC against one melee attack that would hit it. To do so, the marilith must see the attacker and be wielding a melee weapon.' }
        ]
    },
    {
        id: 'balor',
        name: 'Balor',
        type: 'Fiend',
        size: 'Huge',
        ac: 19,
        hp: 262, // 21d12 + 126
        speed: 40, // Fly 80
        stats: stats(26, 15, 22, 20, 16, 22),
        cr: 19,
        resistances: ['cold', 'lightning', 'bludgeoning, piercing, and slashing from nonmagical attacks'],
        immunities: ['fire', 'poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Truesight 120ft, Passive Perception 13',
        languages: 'Abyssal, Telepathy 120ft',
        aiBehavior: 'aggressive',
        role: 'Villain',
        lore: "A demon of shadow and flame, armed with a fiery whip and sword.",
        actions: [
             {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The balor makes two attacks: one with its longsword and one with its whip.',
                multiattackActions: ['Longsword', 'Whip']
            },
            {
                name: 'Longsword',
                type: 'melee',
                desc: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) slashing damage plus 13 (3d8) lightning damage. If the balor scores a critical hit, it rolls damage dice three times, instead of twice.',
                attackBonus: 14,
                damage: '3d8+8+3d8', 
                damageType: 'slashing',
                reach: 10
            },
            {
                name: 'Whip',
                type: 'melee',
                desc: 'Melee Weapon Attack: +14 to hit, reach 30 ft., one target. Hit: 15 (2d6 + 8) slashing damage plus 10 (3d6) fire damage, and the target must succeed on a DC 20 Strength saving throw or be pulled up to 25 feet toward the balor.',
                attackBonus: 14,
                damage: '2d6+8+3d6', 
                damageType: 'slashing',
                reach: 30
            },
            {
                name: 'Teleport',
                type: 'ability',
                desc: 'The balor magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see.'
            }
        ],
        traits: [
            { name: 'Death Throes', desc: 'When the balor dies, it explodes. Each creature within 30 feet of it must make a DC 20 Dexterity saving throw, taking 70 (20d6) fire damage on a failed save, or half as much damage on a successful one.' },
            { name: 'Fire Aura', desc: 'At the start of each of the balor\'s turns, each creature within 5 feet of it takes 10 (3d6) fire damage. A creature that touches the balor or hits it with a melee attack while within 5 feet of it takes 10 (3d6) fire damage.' },
            { name: 'Magic Resistance', desc: 'The balor has advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'pit_fiend',
        name: 'Pit Fiend',
        type: 'Fiend',
        size: 'Large',
        ac: 19,
        hp: 300, // 24d10 + 168
        speed: 60, // Fly 60
        stats: stats(26, 14, 24, 22, 18, 24),
        cr: 20,
        resistances: ['cold', 'bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t silvered'],
        immunities: ['fire', 'poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Truesight 120ft, Passive Perception 14',
        languages: 'Infernal, Telepathy 120ft',
        aiBehavior: 'caster',
        role: 'Villain',
        lore: "The generals of the Nine Hells, tyrants of immense power.",
        spellcasting: {
            class: 'Innate',
            level: 18, 
            ability: 'cha',
            spells: ['Detect Magic', 'Fireball', 'Hold Monster', 'Wall of Fire'] 
        },
        actions: [
             {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The pit fiend makes four attacks: one with its bite, one with its claw, one with its mace, and one with its tail.',
                multiattackActions: ['Bite', 'Claw', 'Mace', 'Tail']
            },
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 22 (4d6 + 8) piercing damage. The target must succeed on a DC 21 Constitution saving throw or become poisoned. While poisoned in this way, the target can\'t regain hit points, and it takes 21 (6d6) poison damage at the start of each of its turns. The poisoned target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.',
                attackBonus: 14,
                damage: '4d6+8',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 17 (2d8 + 8) slashing damage.',
                attackBonus: 14,
                damage: '2d8+8',
                damageType: 'slashing',
                reach: 10
            },
            {
                name: 'Mace',
                type: 'melee',
                desc: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) bludgeoning damage plus 21 (6d6) fire damage.',
                attackBonus: 14,
                damage: '2d6+8+6d6',
                damageType: 'bludgeoning',
                reach: 10
            },
            {
                name: 'Tail',
                type: 'melee',
                desc: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 24 (3d10 + 8) bludgeoning damage.',
                attackBonus: 14,
                damage: '3d10+8',
                damageType: 'bludgeoning',
                reach: 10
            }
        ],
        traits: [
            { name: 'Fear Aura', desc: 'Any creature hostile to the pit fiend that starts its turn within 20 feet of the pit fiend must make a DC 21 Wisdom saving throw, unless the pit fiend is incapacitated. On a failed save, the creature is frightened until the start of its next turn. If a creature\'s saving throw is successful, the creature is immune to the pit fiend\'s Fear Aura for the next 24 hours.' },
            { name: 'Magic Resistance', desc: 'The pit fiend has advantage on saving throws against spells and other magical effects.' },
            { name: 'Magic Weapons', desc: 'The pit fiend\'s weapon attacks are magical.' }
        ]
    },
    {
        id: 'gnoll_warrior',
        name: 'Gnoll Warrior',
        type: 'Fiend',
        size: 'Medium',
        ac: 15,
        hp: 27, // 6d8
        speed: 30,
        stats: stats(14, 12, 11, 6, 10, 7),
        cr: 0.5,
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'Gnoll',
        aiBehavior: 'aggressive',
        lore: "Hyena-headed humanoids that slaughter without mercy.",
        actions: [
            {
                name: 'Rend',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage.',
                attackBonus: 4,
                damage: '1d6+2',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Bone Bow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +3, range 150/600 ft. Hit: 6 (1d10 + 1) Piercing damage.',
                attackBonus: 3,
                damage: '1d10+1',
                damageType: 'piercing',
                range: 150
            }
        ],
        bonusActions: [
            {
                name: 'Rampage',
                type: 'ability',
                desc: '1/Day. Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Rend attack.'
            }
        ]
    },
    {
        id: 'sahuagin_warrior',
        name: 'Sahuagin Warrior',
        type: 'Fiend',
        size: 'Medium',
        ac: 12,
        hp: 22, // 4d8 + 4
        speed: 6, // 30ft, Swim 40ft
        stats: stats(13, 11, 12, 12, 13, 9),
        cr: 0.5,
        skills: ['Perception'],
        resistances: ['acid', 'cold'],
        senses: 'Darkvision 120ft, Passive Perception 15',
        languages: 'Sahuagin',
        aiBehavior: 'aggressive',
        lore: "Fish-like raiders from the deep.",
        traits: [
            { name: 'Blood Frenzy', desc: 'Advantage on attack rolls against any creature that doesn\'t have all its Hit Points.' },
            { name: 'Limited Amphibiousness', desc: 'Can breathe air and water, but must submerge every 4 hours.' },
            { name: 'Shark Telepathy', desc: 'Magically control sharks within 120 feet.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The sahuagin makes two Claw attacks.',
                multiattackActions: ['Claw', 'Claw']
            },
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 4 (1d6 + 1) Slashing damage.',
                attackBonus: 3,
                damage: '1d6+1',
                damageType: 'slashing',
                reach: 5
            }
        ],
        bonusActions: [
            {
                name: 'Aquatic Charge',
                type: 'ability',
                desc: 'Swims up to Swim Speed straight toward an enemy it can see.'
            }
        ]
    }
];

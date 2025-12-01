
import { MonsterData } from '../../types';
import { stats } from './utils';

export const FEY: MonsterData[] = [
    {
        id: 'blink_dog',
        name: 'Blink Dog',
        type: 'Fey',
        size: 'Medium',
        ac: 13,
        hp: 22, // 4d8 + 4
        speed: 40,
        stats: stats(12, 17, 12, 10, 13, 11),
        cr: 0.25,
        skills: ['Perception', 'Stealth'],
        senses: 'Darkvision 60 ft., Passive Perception 15',
        languages: 'Blink Dog; understands Elvish and Sylvan but can\'t speak them',
        aiBehavior: 'defensive',
        actions: [
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 5 (1d4 + 3) Piercing damage.',
                attackBonus: 5,
                damage: '1d4+3',
                damageType: 'piercing',
                reach: 5
            }
        ],
        bonusActions: [
            {
                name: 'Teleport',
                type: 'ability',
                desc: 'Recharge 4-6. The dog teleports up to 40 feet to an unoccupied space it can see.',
            }
        ]
    },
    {
        id: 'bugbear_stalker',
        name: 'Bugbear Stalker',
        type: 'Fey',
        size: 'Medium',
        ac: 15,
        hp: 65, // 10d8 + 20
        speed: 30,
        stats: stats(17, 14, 14, 11, 12, 11),
        cr: 3,
        skills: ['Stealth', 'Survival'],
        gear: 'Chain Shirt, Javelins (6), Morningstar',
        senses: 'Darkvision 60 ft., Passive Perception 11',
        languages: 'Common, Goblin',
        aiBehavior: 'aggressive',
        tags: ['Goblinoid'],
        traits: [
            { name: 'Abduct', desc: 'The bugbear needn\'t spend extra movement to move a creature it is grappling.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The bugbear makes two Javelin or Morningstar attacks.',
                multiattackActions: ['Javelin', 'Morningstar']
            },
            {
                name: 'Javelin',
                type: 'ranged',
                desc: 'Melee or Ranged Attack Roll: +5, reach 10 ft. or range 30/120 ft. Hit: 13 (3d6 + 3) Piercing damage.',
                attackBonus: 5,
                damage: '3d6+3',
                damageType: 'piercing',
                range: 30
            },
            {
                name: 'Morningstar',
                type: 'melee',
                desc: 'Melee Attack Roll: +5 (with Advantage if the target is Grappled by the bugbear), reach 10 ft. Hit: 12 (2d8 + 3) Piercing damage.',
                attackBonus: 5,
                damage: '2d8+3',
                damageType: 'piercing',
                reach: 10
            }
        ],
        bonusActions: [
            {
                name: 'Quick Grapple',
                type: 'save',
                desc: 'Dexterity Saving Throw: DC 13, one Medium or smaller creature the bugbear can see within 10 feet. Failure: The target has the Grappled condition (escape DC 13).',
                saveDC: 13,
                saveAbility: 'DEX',
                range: 10
            }
        ]
    },
    {
        id: 'bugbear_warrior',
        name: 'Bugbear Warrior',
        type: 'Fey',
        size: 'Medium',
        ac: 14,
        hp: 33, // 6d8 + 6
        speed: 30,
        stats: stats(15, 14, 13, 8, 11, 9),
        cr: 1,
        skills: ['Stealth', 'Survival'],
        gear: 'Hide Armor, Light Hammers (3)',
        senses: 'Darkvision 60 ft., Passive Perception 10',
        languages: 'Common, Goblin',
        aiBehavior: 'aggressive',
        tags: ['Goblinoid'],
        traits: [
            { name: 'Abduct', desc: 'The bugbear needn\'t spend extra movement to move a creature it is grappling.' }
        ],
        actions: [
            {
                name: 'Grab',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 10 ft. Hit: 9 (2d6 + 2) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12).',
                attackBonus: 4,
                damage: '2d6+2',
                damageType: 'bludgeoning',
                reach: 10
            },
            {
                name: 'Light Hammer',
                type: 'ranged',
                desc: 'Melee or Ranged Attack Roll: +4 (with Advantage if the target is Grappled by the bugbear), reach 10 ft. or range 20/60 ft. Hit: 9 (3d4 + 2) Bludgeoning damage.',
                attackBonus: 4,
                damage: '3d4+2',
                damageType: 'bludgeoning',
                range: 20
            }
        ]
    },
    {
        id: 'centaur_trooper',
        name: 'Centaur Trooper',
        type: 'Fey',
        size: 'Large',
        ac: 16,
        hp: 45, // 6d10 + 12
        speed: 50,
        stats: stats(18, 14, 14, 9, 13, 11),
        cr: 2,
        skills: ['Athletics', 'Perception'],
        gear: 'Breastplate, Longbow, Pike',
        senses: 'Passive Perception 13',
        languages: 'Elvish, Sylvan',
        aiBehavior: 'aggressive',
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The centaur makes two attacks, using Pike or Longbow in any combination.',
                multiattackActions: ['Pike', 'Longbow']
            },
            {
                name: 'Pike',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 10 ft. Hit: 9 (1d10 + 4) Piercing damage.',
                attackBonus: 6,
                damage: '1d10+4',
                damageType: 'piercing',
                reach: 10
            },
            {
                name: 'Longbow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +4, range 150/600 ft. Hit: 6 (1d8 + 2) Piercing damage.',
                attackBonus: 4,
                damage: '1d8+2',
                damageType: 'piercing',
                range: 150
            }
        ],
        bonusActions: [
            {
                name: 'Trampling Charge',
                type: 'save',
                desc: 'Recharge 5-6. The centaur moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space the centaur enters is targeted once. Strength Saving Throw: DC 14. Failure: 7 (1d6 + 4) Bludgeoning damage, and the target has the Prone condition.',
                saveDC: 14,
                saveAbility: 'STR',
                damage: '1d6+4',
                damageType: 'bludgeoning'
            }
        ]
    },
    {
        id: 'dryad',
        name: 'Dryad',
        type: 'Fey',
        size: 'Medium',
        ac: 16,
        hp: 22, // 5d8
        speed: 30,
        stats: stats(10, 12, 11, 14, 15, 18),
        cr: 1,
        skills: ['Perception', 'Stealth'],
        senses: 'Darkvision 60 ft., Passive Perception 14',
        languages: 'Elvish, Sylvan',
        aiBehavior: 'caster',
        traits: [
            { name: 'Magic Resistance', desc: 'The dryad has Advantage on saving throws against spells and other magical effects.' },
            { name: 'Speak with Beasts and Plants', desc: 'The dryad can communicate with Beasts and Plants as if they shared a language.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dryad makes one Vine Lash or Thorn Burst attack, and it can use Spellcasting to cast Charm Monster.',
                multiattackActions: ['Vine Lash', 'Thorn Burst', 'Charm Monster']
            },
            {
                name: 'Vine Lash',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 10 ft. Hit: 8 (1d8 + 4) Slashing damage.',
                attackBonus: 6,
                damage: '1d8+4',
                damageType: 'slashing',
                reach: 10
            },
            {
                name: 'Thorn Burst',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +6, range 60 ft. Hit: 7 (1d6 + 4) Piercing damage.',
                attackBonus: 6,
                damage: '1d6+4',
                damageType: 'piercing',
                range: 60
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 3,
            ability: 'cha',
            spells: ['Animal Friendship', 'Charm Monster', 'Druidcraft', 'Entangle', 'Pass without Trace']
        },
        bonusActions: [
            {
                name: 'Tree Stride',
                type: 'ability',
                desc: 'If within 5 feet of a Large or bigger tree, the dryad teleports to an unoccupied space within 5 feet of a second Large or bigger tree that is within 60 feet of the previous tree.',
            }
        ]
    },
    {
        id: 'goblin_minion',
        name: 'Goblin Minion',
        type: 'Fey',
        size: 'Small',
        ac: 12,
        hp: 7, // 2d6
        speed: 30,
        stats: stats(8, 15, 10, 10, 8, 8),
        cr: 0.125,
        skills: ['Stealth'],
        gear: 'Daggers (3)',
        senses: 'Darkvision 60 ft., Passive Perception 9',
        languages: 'Common, Goblin',
        aiBehavior: 'minion',
        tags: ['Goblinoid'],
        actions: [
            {
                name: 'Dagger',
                type: 'melee',
                desc: 'Melee or Ranged Attack Roll: +4, reach 5 ft. or range 20/60 ft. Hit: 4 (1d4 + 2) Piercing damage.',
                attackBonus: 4,
                damage: '1d4+2',
                damageType: 'piercing',
                range: 20
            }
        ],
        bonusActions: [
            {
                name: 'Nimble Escape',
                type: 'ability',
                desc: 'The goblin takes the Disengage or Hide action.',
            }
        ]
    },
    {
        id: 'goblin_warrior',
        name: 'Goblin Warrior',
        type: 'Fey',
        size: 'Small',
        ac: 15,
        hp: 10, // 3d6
        speed: 30,
        stats: stats(8, 15, 10, 10, 8, 8),
        cr: 0.25,
        skills: ['Stealth'],
        gear: 'Leather Armor, Scimitar, Shield, Shortbow',
        senses: 'Darkvision 60 ft., Passive Perception 9',
        languages: 'Common, Goblin',
        aiBehavior: 'aggressive',
        tags: ['Goblinoid'],
        actions: [
            {
                name: 'Scimitar',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) Slashing damage, plus 2 (1d4) Slashing damage if the attack roll had Advantage.',
                attackBonus: 4,
                damage: '1d6+2',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Shortbow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +4, range 80/320 ft. Hit: 5 (1d6 + 2) Piercing damage, plus 2 (1d4) Piercing damage if the attack roll had Advantage.',
                attackBonus: 4,
                damage: '1d6+2',
                damageType: 'piercing',
                range: 80
            }
        ],
        bonusActions: [
            {
                name: 'Nimble Escape',
                type: 'ability',
                desc: 'The goblin takes the Disengage or Hide action.',
            }
        ]
    },
    {
        id: 'goblin_boss',
        name: 'Goblin Boss',
        type: 'Fey',
        size: 'Small',
        ac: 17,
        hp: 21, // 6d6
        speed: 30,
        stats: stats(10, 15, 10, 10, 8, 10),
        cr: 1,
        skills: ['Stealth'],
        gear: 'Chain Shirt, Scimitar, Shield, Shortbow',
        senses: 'Darkvision 60 ft., Passive Perception 9',
        languages: 'Common, Goblin',
        aiBehavior: 'aggressive',
        tags: ['Goblinoid'],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The goblin makes two attacks, using Scimitar or Shortbow in any combination.',
                multiattackActions: ['Scimitar', 'Shortbow']
            },
            {
                name: 'Scimitar',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) Slashing damage, plus 2 (1d4) Slashing damage if the attack roll had Advantage.',
                attackBonus: 4,
                damage: '1d6+2',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Shortbow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +4, range 80/320 ft. Hit: 5 (1d6 + 2) Piercing damage, plus 2 (1d4) Piercing damage if the attack roll had Advantage.',
                attackBonus: 4,
                damage: '1d6+2',
                damageType: 'piercing',
                range: 80
            }
        ],
        bonusActions: [
            {
                name: 'Nimble Escape',
                type: 'ability',
                desc: 'The goblin takes the Disengage or Hide action.',
            }
        ],
        reactions: [
            {
                name: 'Redirect Attack',
                type: 'ability',
                desc: 'Trigger: A creature the goblin can see makes an attack roll against it. Response: The goblin chooses a Small or Medium ally within 5 feet of itself. The goblin and that ally swap places, and the ally becomes the target of the attack instead.'
            }
        ]
    },
    {
        id: 'green_hag',
        name: 'Green Hag',
        type: 'Fey',
        size: 'Medium',
        ac: 17,
        hp: 82, // 11d8 + 33
        speed: 30, // Swim 30
        stats: stats(18, 12, 16, 13, 14, 14),
        cr: 3,
        skills: ['Arcana', 'Deception', 'Perception', 'Stealth'],
        senses: 'Darkvision 60 ft., Passive Perception 14',
        languages: 'Common, Elvish, Sylvan',
        aiBehavior: 'caster',
        traits: [
            { name: 'Amphibious', desc: 'The hag can breathe air and water.' },
            { name: 'Coven Magic', desc: 'While within 30 feet of at least two hag allies, the hag can cast spells.' },
            { name: 'Mimicry', desc: 'The hag can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The hag makes two Claw attacks.',
                multiattackActions: ['Claw', 'Claw']
            },
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 8 (1d8 + 4) Slashing damage plus 3 (1d6) Poison damage.',
                attackBonus: 6,
                damage: '1d8+4+1d6',
                damageType: 'slashing',
                reach: 5
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 5,
            ability: 'wis', 
            spells: ['Dancing Lights', 'Disguise Self', 'Invisibility', 'Minor Illusion', 'Ray of Sickness']
        }
    },
    {
        id: 'hobgoblin_warrior',
        name: 'Hobgoblin Warrior',
        type: 'Fey',
        size: 'Medium',
        ac: 18,
        hp: 11, // 2d8 + 2
        speed: 30,
        stats: stats(13, 12, 12, 10, 10, 9),
        cr: 0.5,
        gear: 'Half Plate Armor, Longbow, Longsword, Shield',
        senses: 'Darkvision 60 ft., Passive Perception 10',
        languages: 'Common, Goblin',
        aiBehavior: 'aggressive',
        tags: ['Goblinoid'],
        traits: [
            { name: 'Pack Tactics', desc: 'The hobgoblin has Advantage on an attack roll against a creature if at least one of the hobgoblin\'s allies is within 5 feet of the creature and the ally doesn\'t have the Incapacitated condition.' }
        ],
        actions: [
            {
                name: 'Longsword',
                type: 'melee',
                desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 12 (2d10 + 1) Slashing damage.',
                attackBonus: 3,
                damage: '2d10+1',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Longbow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +3, range 150/600 ft. Hit: 5 (1d8 + 1) Piercing damage plus 7 (3d4) Poison damage.',
                attackBonus: 3,
                damage: '1d8+1+3d4',
                damageType: 'piercing',
                range: 150
            }
        ]
    },
    {
        id: 'hobgoblin_captain',
        name: 'Hobgoblin Captain',
        type: 'Fey',
        size: 'Medium',
        ac: 17,
        hp: 58, // 9d8 + 18
        speed: 30,
        stats: stats(15, 14, 14, 12, 10, 13),
        cr: 3,
        gear: 'Greatsword, Half Plate Armor, Longbow',
        senses: 'Darkvision 60 ft., Passive Perception 10',
        languages: 'Common, Goblin',
        aiBehavior: 'aggressive',
        tags: ['Goblinoid'],
        traits: [
            { name: 'Aura of Authority', desc: 'While in a 10-foot Emanation originating from the hobgoblin, the hobgoblin and its allies have Advantage on attack rolls and saving throws, provided the hobgoblin doesn\'t have the Incapacitated condition.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The hobgoblin makes two attacks, using Greatsword or Longbow in any combination.',
                multiattackActions: ['Greatsword', 'Longbow']
            },
            {
                name: 'Greatsword',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 9 (2d6 + 2) Slashing damage plus 3 (1d6) Poison damage.',
                attackBonus: 4,
                damage: '2d6+2+1d6',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Longbow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +4, range 150/600 ft. Hit: 6 (1d8 + 2) Piercing damage plus 5 (2d4) Poison damage.',
                attackBonus: 4,
                damage: '1d8+2+2d4',
                damageType: 'piercing',
                range: 150
            }
        ]
    },
    {
        id: 'satyr',
        name: 'Satyr',
        type: 'Fey',
        size: 'Medium',
        ac: 13,
        hp: 31, // 7d8
        speed: 40,
        stats: stats(12, 16, 11, 12, 10, 14),
        cr: 0.5,
        skills: ['Perception', 'Performance', 'Stealth'],
        senses: 'Passive Perception 12',
        languages: 'Common, Elvish, Sylvan',
        aiBehavior: 'defensive',
        traits: [
            { name: 'Magic Resistance', desc: 'The satyr has Advantage on saving throws against spells and other magical effects.' }
        ],
        actions: [
            {
                name: 'Hooves',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 5 (1d4 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, the satyr pushes the target up to 10 feet straight away from itself.',
                attackBonus: 5,
                damage: '1d4+3',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Mockery',
                type: 'save',
                desc: 'Wisdom Saving Throw: DC 12, one creature the satyr can see within 90 feet. Failure: 5 (1d6 + 2) Psychic damage.',
                saveDC: 12,
                saveAbility: 'WIS',
                damage: '1d6+2',
                damageType: 'psychic',
                range: 90
            }
        ]
    },
    {
        id: 'sea_hag',
        name: 'Sea Hag',
        type: 'Fey',
        size: 'Medium',
        ac: 14,
        hp: 52, // 7d8 + 21
        speed: 30, // Swim 40
        stats: stats(16, 13, 16, 12, 12, 13),
        cr: 2,
        senses: 'Darkvision 60 ft., Passive Perception 11',
        languages: 'Common, Giant, Primordial (Aquan)',
        aiBehavior: 'lurker',
        traits: [
            { name: 'Amphibious', desc: 'The hag can breathe air and water.' },
            { name: 'Coven Magic', desc: 'While within 30 feet of at least two hag allies, the hag can cast spells.' },
            { name: 'Vile Appearance', desc: 'Wisdom Saving Throw: DC 11, any Beast or Humanoid that starts its turn within 30 feet of the hag and can see the hag\'s true form. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this hag\'s Vile Appearance for 24 hours.' }
        ],
        actions: [
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage.',
                attackBonus: 5,
                damage: '2d6+3',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Death Glare',
                type: 'save',
                desc: 'Recharge 5-6. Wisdom Saving Throw: DC 11, one Frightened creature the hag can see within 30 feet. Failure: If the target has 20 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, the target takes 13 (3d8) Psychic damage.',
                saveDC: 11,
                saveAbility: 'WIS',
                damage: '3d8',
                damageType: 'psychic',
                range: 30
            },
            {
                name: 'Illusory Appearance',
                type: 'ability',
                desc: 'The hag casts Disguise Self, using Constitution as the spellcasting ability (spell save DC 13). The spell\'s duration is 24 hours.',
            }
        ]
    },
    {
        id: 'sprite',
        name: 'Sprite',
        type: 'Fey',
        size: 'Tiny',
        ac: 15,
        hp: 10, // 4d4
        speed: 10, // Fly 40
        stats: stats(3, 18, 10, 14, 13, 11),
        cr: 0.25,
        skills: ['Perception', 'Stealth'],
        senses: 'Passive Perception 13',
        languages: 'Common, Elvish, Sylvan',
        aiBehavior: 'defensive',
        actions: [
            {
                name: 'Needle Sword',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 6 (1d4 + 4) Piercing damage.',
                attackBonus: 6,
                damage: '1d4+4',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Enchanting Bow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +6, range 40/160 ft. Hit: 1 Piercing damage, and the target has the Charmed condition until the start of the sprite\'s next turn.',
                attackBonus: 6,
                damage: '1',
                damageType: 'piercing',
                range: 40
            },
            {
                name: 'Heart Sight',
                type: 'save',
                desc: 'Charisma Saving Throw: DC 10, one creature within 5 feet the sprite can see (Celestials, Fiends, and Undead automatically fail the save). Failure: The sprite knows the target\'s emotions and alignment.',
                saveDC: 10,
                saveAbility: 'CHA',
                damage: '0',
                range: 5
            },
            {
                name: 'Invisibility',
                type: 'ability',
                desc: 'The sprite casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.',
            }
        ]
    },
    {
        id: 'worg',
        name: 'Worg',
        type: 'Fey',
        size: 'Large',
        ac: 13,
        hp: 26, // 4d10 + 4
        speed: 50,
        stats: stats(16, 13, 13, 7, 11, 8),
        cr: 0.5,
        skills: ['Perception'],
        senses: 'Darkvision 60 ft., Passive Perception 14',
        languages: 'Goblin, Worg',
        aiBehavior: 'aggressive',
        actions: [
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage, and the next attack roll made against the target before the start of the worg\'s next turn has Advantage.',
                attackBonus: 5,
                damage: '1d8+3',
                damageType: 'piercing',
                reach: 5
            }
        ]
    }
];

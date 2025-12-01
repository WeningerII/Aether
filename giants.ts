
import { MonsterData } from '../../types';
import { stats } from './utils';

export const GIANTS: MonsterData[] = [
    {
        id: 'cloud_giant',
        name: 'Cloud Giant',
        type: 'Giant',
        size: 'Huge',
        ac: 14,
        hp: 200, // 16d12 + 96
        speed: 8, // 40ft, Fly 20ft (hover)
        stats: stats(27, 10, 22, 12, 16, 16),
        cr: 9,
        savingThrowProficiencies: ['con', 'wis', 'cha'], // Saves: Con +10, Wis +7, Cha +7 (implied proficiencies)
        skills: ['Insight', 'Perception'],
        senses: 'Passive Perception 21',
        languages: 'Common, Giant',
        aiBehavior: 'caster',
        lore: "A towering giant that dwells in castles on high peaks or floating clouds.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The giant makes two attacks, using Thunderous Mace or Thundercloud in any combination. It can replace one attack with a use of Spellcasting to cast Fog Cloud.',
                multiattackActions: ['Thunderous Mace', 'Thundercloud']
            },
            {
                name: 'Thunderous Mace',
                type: 'melee',
                desc: 'Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) bludgeoning damage plus 7 (2d6) thunder damage.',
                attackBonus: 12,
                damage: '3d8+8+2d6',
                damageType: 'thunder', // Mixed, primary effect implies thunderous
                reach: 10
            },
            {
                name: 'Thundercloud',
                type: 'ranged',
                desc: 'Ranged Spell Attack: +12 to hit, range 240 ft., one target. Hit: 18 (3d6 + 8) thunder damage, and the target has the Incapacitated condition until the end of its next turn.',
                attackBonus: 12,
                damage: '3d6+8',
                damageType: 'thunder',
                range: 240
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 9,
            ability: 'cha',
            saveDC: 15,
            spells: ['Detect Magic', 'Fog Cloud', 'Light', 'Control Weather', 'Gaseous Form', 'Telekinesis']
        },
        bonusActions: [
            {
                name: 'Misty Step',
                type: 'ability',
                desc: 'The giant casts the Misty Step spell, using the same spellcasting ability as Spellcasting.'
            }
        ]
    },
    {
        id: 'ettin',
        name: 'Ettin',
        type: 'Giant',
        size: 'Large',
        ac: 12,
        hp: 85, // 10d10 + 30
        speed: 8, // 40ft
        stats: stats(21, 8, 17, 6, 10, 8),
        cr: 4,
        skills: ['Perception'],
        immunities: ['blinded', 'charmed', 'deafened', 'frightened', 'stunned', 'unconscious'],
        senses: 'Darkvision 60ft, Passive Perception 14',
        languages: 'Giant',
        aiBehavior: 'aggressive',
        lore: "A two-headed giant, savage and unpredictable.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The ettin makes one Battleaxe attack and one Morningstar attack.',
                multiattackActions: ['Battleaxe', 'Morningstar']
            },
            {
                name: 'Battleaxe',
                type: 'melee',
                desc: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage. If the target is a Large or smaller creature, it has the Prone condition.',
                attackBonus: 7,
                damage: '2d8+5',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Morningstar',
                type: 'melee',
                desc: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) piercing damage, and the target has Disadvantage on the next attack roll it makes before the end of its next turn.',
                attackBonus: 7,
                damage: '2d8+5',
                damageType: 'piercing',
                reach: 5
            }
        ]
    },
    {
        id: 'fire_giant',
        name: 'Fire Giant',
        type: 'Giant',
        size: 'Huge',
        ac: 18,
        hp: 162, // 13d12 + 78
        speed: 6, // 30ft
        stats: stats(25, 9, 23, 10, 14, 13),
        cr: 9,
        savingThrowProficiencies: ['dex', 'con', 'cha'],
        skills: ['Athletics', 'Perception'],
        immunities: ['fire'],
        senses: 'Passive Perception 16',
        languages: 'Giant',
        aiBehavior: 'aggressive',
        lore: "A master smith and strategist among giants, dwelling in volcanoes and mountains.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The giant makes two attacks, using Flame Sword or Hammer Throw in any combination.',
                multiattackActions: ['Flame Sword', 'Hammer Throw']
            },
            {
                name: 'Flame Sword',
                type: 'melee',
                desc: 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 21 (4d6 + 7) slashing damage plus 10 (3d6) fire damage.',
                attackBonus: 11,
                damage: '4d6+7+3d6',
                damageType: 'fire', // Mixed
                reach: 10
            },
            {
                name: 'Hammer Throw',
                type: 'ranged',
                desc: 'Ranged Weapon Attack: +11 to hit, range 60/240 ft., one target. Hit: 23 (3d10 + 7) bludgeoning damage plus 4 (1d8) fire damage, and the target is pushed up to 15 feet straight away from the giant and has Disadvantage on the next attack roll it makes before the end of its next turn.',
                attackBonus: 11,
                damage: '3d10+7+1d8',
                damageType: 'bludgeoning',
                range: 60
            }
        ]
    },
    {
        id: 'frost_giant',
        name: 'Frost Giant',
        type: 'Giant',
        size: 'Huge',
        ac: 15,
        hp: 149, // 13d12 + 65
        speed: 8, // 40ft
        stats: stats(23, 9, 21, 9, 10, 12),
        cr: 8,
        savingThrowProficiencies: ['con', 'wis', 'cha'],
        skills: ['Athletics', 'Perception'],
        immunities: ['cold'],
        senses: 'Passive Perception 13',
        languages: 'Giant',
        aiBehavior: 'aggressive',
        lore: "A giant reaver from the frozen lands, valuing strength above all else.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The giant makes two attacks, using Frost Axe or Great Bow in any combination.',
                multiattackActions: ['Frost Axe', 'Great Bow']
            },
            {
                name: 'Frost Axe',
                type: 'melee',
                desc: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 19 (2d12 + 6) slashing damage plus 9 (2d8) cold damage.',
                attackBonus: 9,
                damage: '2d12+6+2d8',
                damageType: 'cold', // Mixed
                reach: 10
            },
            {
                name: 'Great Bow',
                type: 'ranged',
                desc: 'Ranged Weapon Attack: +9 to hit, range 150/600 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 7 (2d6) cold damage, and the target\'s Speed decreases by 10 feet until the end of its next turn.',
                attackBonus: 9,
                damage: '2d10+6+2d6',
                damageType: 'cold', // Mixed
                range: 150
            }
        ],
        bonusActions: [
            {
                name: 'War Cry',
                type: 'ability',
                desc: 'Recharge 5-6. The giant or one creature of its choice that can see or hear it gains 16 (2d10 + 5) Temporary Hit Points and has Advantage on attack rolls until the start of the giant\'s next turn.'
            }
        ]
    },
    {
        id: 'hill_giant',
        name: 'Hill Giant',
        type: 'Giant',
        size: 'Huge',
        ac: 13,
        hp: 105, // 10d12 + 40
        speed: 8, // 40ft
        stats: stats(21, 8, 19, 5, 9, 6),
        cr: 5,
        skills: ['Perception'],
        senses: 'Passive Perception 12',
        languages: 'Giant',
        aiBehavior: 'aggressive',
        lore: "A selfish, dimwitted giant that embodies gluttony.",
        actions: [
             {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The giant makes two attacks, using Tree Club or Trash Lob in any combination.',
                multiattackActions: ['Tree Club', 'Trash Lob']
            },
            {
                name: 'Tree Club',
                type: 'melee',
                desc: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 18 (3d8 + 5) bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.',
                attackBonus: 8,
                damage: '3d8+5',
                damageType: 'bludgeoning',
                reach: 10
            },
            {
                name: 'Trash Lob',
                type: 'ranged',
                desc: 'Ranged Weapon Attack: +8 to hit, range 60/240 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage, and the target has the Poisoned condition until the end of its next turn.',
                attackBonus: 8,
                damage: '2d10+5',
                damageType: 'bludgeoning',
                range: 60
            }
        ]
    },
    {
        id: 'ogre',
        name: 'Ogre',
        type: 'Giant',
        size: 'Large',
        ac: 11,
        hp: 59, // 7d10 + 21
        speed: 8, // 40ft
        stats: stats(19, 8, 16, 5, 7, 7),
        cr: 2,
        senses: 'Darkvision 60ft, Passive Perception 8',
        languages: 'Common, Giant',
        aiBehavior: 'aggressive',
        lore: "A brute of a giant, gluttonous and cruel.",
        actions: [
            {
                name: 'Greatclub',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.',
                attackBonus: 6,
                damage: '2d8+4',
                damageType: 'bludgeoning',
                reach: 5
            },
             {
                name: 'Javelin',
                type: 'ranged',
                desc: 'Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 11 (2d6 + 4) piercing damage.',
                attackBonus: 6,
                damage: '2d6+4',
                damageType: 'piercing',
                range: 30
            }
        ]
    },
    {
        id: 'stone_giant',
        name: 'Stone Giant',
        type: 'Giant',
        size: 'Huge',
        ac: 17,
        hp: 126, // 11d12 + 55
        speed: 8, // 40ft
        stats: stats(23, 15, 20, 10, 12, 9),
        cr: 7,
        savingThrowProficiencies: ['dex', 'con', 'wis'],
        skills: ['Athletics', 'Perception', 'Stealth'],
        senses: 'Darkvision 60ft, Passive Perception 14',
        languages: 'Giant',
        aiBehavior: 'aggressive',
        lore: "A reclusive giant that dwells in caverns and treats stone carving as a sacred art.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The giant makes two attacks, using Stone Club or Boulder in any combination.',
                multiattackActions: ['Stone Club', 'Boulder']
            },
            {
                name: 'Stone Club',
                type: 'melee',
                desc: 'Melee Weapon Attack: +9 to hit, reach 15 ft., one target. Hit: 22 (3d10 + 6) bludgeoning damage.',
                attackBonus: 9,
                damage: '3d10+6',
                damageType: 'bludgeoning',
                reach: 15
            },
            {
                name: 'Boulder',
                type: 'ranged',
                desc: 'Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.',
                attackBonus: 9,
                damage: '2d8+6',
                damageType: 'bludgeoning',
                range: 60
            }
        ],
        reactions: [
            {
                name: 'Deflect Missile',
                type: 'ability',
                desc: 'Recharge 5-6. Trigger: The giant is hit by a ranged attack roll and takes Bludgeoning, Piercing, or Slashing damage from it. Response: The giant reduces the damage it takes from the attack by 11 (1d10 + 6), and if that damage is reduced to 0, the giant can redirect some of the attack\'s force. Dexterity Saving Throw: DC 17, one creature the giant can see within 60 feet. Failure: 11 (1d10 + 6) Force damage.'
            }
        ]
    },
    {
        id: 'storm_giant',
        name: 'Storm Giant',
        type: 'Giant',
        size: 'Huge',
        ac: 16,
        hp: 230, // 20d12 + 100
        speed: 10, // 50ft, Fly 25ft (hover), Swim 50ft
        stats: stats(29, 14, 20, 16, 20, 18),
        cr: 13,
        savingThrowProficiencies: ['str', 'con', 'wis', 'cha'],
        skills: ['Arcana', 'Athletics', 'History', 'Perception'],
        resistances: ['cold'],
        immunities: ['lightning', 'thunder'],
        senses: 'Darkvision 120ft, Truesight 30ft, Passive Perception 20',
        languages: 'Common, Giant',
        aiBehavior: 'caster',
        lore: "A contemplative giant that lives in isolated places and predicts the future.",
        traits: [
            { name: 'Amphibious', desc: 'The giant can breathe air and water.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The giant makes two attacks, using Storm Sword or Thunderbolt in any combination.',
                multiattackActions: ['Storm Sword', 'Thunderbolt']
            },
            {
                name: 'Storm Sword',
                type: 'melee',
                desc: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 23 (4d6 + 9) slashing damage plus 13 (3d8) lightning damage.',
                attackBonus: 14,
                damage: '4d6+9+3d8',
                damageType: 'lightning', // Mixed
                reach: 10
            },
            {
                name: 'Thunderbolt',
                type: 'ranged',
                desc: 'Ranged Weapon Attack: +14 to hit, range 500 ft., one target. Hit: 22 (2d12 + 9) lightning damage, and the target has the Blinded and Deafened conditions until the start of the giant\'s next turn.',
                attackBonus: 14,
                damage: '2d12+9',
                damageType: 'lightning',
                range: 500
            },
            {
                name: 'Lightning Storm',
                type: 'save',
                desc: 'Recharge 5-6. Dexterity Saving Throw: DC 18, each creature in a 10-foot-radius, 40-foot-high Cylinder originating from a point the giant can see within 500 feet. Failure: 55 (10d10) Lightning damage. Success: Half damage.',
                damage: '10d10',
                damageType: 'lightning',
                saveDC: 18,
                saveAbility: 'DEX'
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 15, 
            ability: 'wis',
            saveDC: 18,
            spells: ['Detect Magic', 'Light', 'Control Weather']
        }
    },
    {
        id: 'troll',
        name: 'Troll',
        type: 'Giant',
        size: 'Large',
        ac: 15,
        hp: 94, // 9d10 + 45
        speed: 6, // 30ft
        stats: stats(18, 13, 20, 7, 9, 7),
        cr: 5,
        skills: ['Perception'],
        senses: 'Darkvision 60ft, Passive Perception 15',
        languages: 'Giant',
        aiBehavior: 'aggressive',
        lore: "A regenerating giant with a voracious appetite.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The troll makes three Rend attacks.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            {
                name: 'Rend',
                type: 'melee',
                desc: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) slashing damage.',
                attackBonus: 7,
                damage: '2d6+4',
                damageType: 'slashing',
                reach: 10
            }
        ],
        bonusActions: [
            {
                name: 'Charge',
                type: 'ability',
                desc: 'The troll moves up to half its Speed straight toward an enemy it can see.'
            }
        ],
        traits: [
            { name: 'Loathsome Limbs', desc: '4/Day. If the troll ends any turn Bloodied and took 15+ Slashing damage, a limb is severed and becomes a Troll Limb.' },
            { name: 'Regeneration', desc: 'The troll regains 15 Hit Points at the start of each of its turns. If the troll takes Acid or Fire damage, this trait doesn\'t function on the troll\'s next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn\'t regenerate.' }
        ]
    },
    {
        id: 'troll_limb',
        name: 'Troll Limb',
        type: 'Giant',
        size: 'Small',
        ac: 13,
        hp: 14, // 4d6
        speed: 4, // 20ft
        stats: stats(18, 12, 10, 1, 9, 1),
        cr: 0.5,
        senses: 'Darkvision 60ft, Passive Perception 9',
        languages: 'None',
        aiBehavior: 'minion',
        lore: "A severed limb of a troll that continues to attack.",
        actions: [
            {
                name: 'Rend',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) slashing damage.',
                attackBonus: 6,
                damage: '2d4+4',
                damageType: 'slashing',
                reach: 5
            }
        ],
        traits: [
            { name: 'Regeneration', desc: 'The limb regains 5 Hit Points at the start of each of its turns. If the limb takes Acid or Fire damage, this trait doesn\'t function on the limb\'s next turn. The limb dies only if it starts its turn with 0 Hit Points and doesn\'t regenerate.' },
            { name: 'Troll Spawn', desc: 'The limb uncannily has the same senses as a whole troll. If the limb isn\'t destroyed within 24 hours, roll 1d12. On a 12, the limb turns into a Troll. Otherwise, the limb withers away.' }
        ]
    }
];

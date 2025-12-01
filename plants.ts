
import { MonsterData } from '../../types';
import { stats } from './utils';

export const PLANTS: MonsterData[] = [
    {
        id: 'awakened_shrub',
        name: 'Awakened Shrub',
        type: 'Plant',
        size: 'Small',
        ac: 9,
        hp: 10, // 3d6
        speed: 20,
        stats: stats(3, 8, 11, 10, 10, 6),
        cr: 0,
        vulnerabilities: ['fire'],
        resistances: ['piercing'],
        senses: 'Passive Perception 10',
        languages: 'Common plus one other language',
        aiBehavior: 'minion',
        actions: [
            {
                name: 'Rake',
                type: 'melee',
                desc: 'Melee Attack Roll: +1, reach 5 ft. Hit: 1 Slashing damage.',
                attackBonus: 1,
                damage: '1',
                damageType: 'slashing',
                reach: 5
            }
        ]
    },
    {
        id: 'awakened_tree',
        name: 'Awakened Tree',
        type: 'Plant',
        size: 'Huge',
        ac: 13,
        hp: 59, // 7d12 + 14
        speed: 20,
        stats: stats(19, 6, 15, 10, 10, 7),
        cr: 2,
        vulnerabilities: ['fire'],
        resistances: ['bludgeoning', 'piercing'],
        senses: 'Passive Perception 10',
        languages: 'Common plus one other language',
        aiBehavior: 'aggressive',
        actions: [
            {
                name: 'Slam',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 10 ft. Hit: 14 (3d6 + 4) Bludgeoning damage.',
                attackBonus: 6,
                damage: '3d6+4',
                damageType: 'bludgeoning',
                reach: 10
            }
        ]
    },
    {
        id: 'shambling_mound',
        name: 'Shambling Mound',
        type: 'Plant',
        size: 'Large',
        ac: 15,
        hp: 110, // 13d10 + 39
        speed: 6, // 30 ft
        stats: stats(18, 8, 16, 5, 10, 5),
        cr: 5,
        resistances: ['cold', 'fire'],
        immunities: ['lightning'],
        conditionImmunities: ['deafened', 'exhaustion'],
        senses: 'Blindsight 60 ft., Passive Perception 10',
        languages: 'None',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Lightning Absorption', desc: 'Whenever the shambling mound is subjected to Lightning damage, it regains a number of Hit Points equal to the Lightning damage dealt.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The shambling mound makes three Charged Tendril attacks. It can replace one attack with a use of Engulf.',
                multiattackActions: ['Charged Tendril', 'Charged Tendril', 'Charged Tendril']
            },
            {
                name: 'Charged Tendril',
                type: 'melee',
                desc: 'Melee Attack Roll: +7, reach 10 ft. Hit: 7 (1d6 + 4) Bludgeoning damage plus 5 (2d4) Lightning damage. If the target is a Medium or smaller creature, the shambling mound pulls the target 5 feet straight toward itself.',
                attackBonus: 7,
                damage: '1d6+4+2d4',
                damageType: 'bludgeoning',
                reach: 10
            },
            {
                name: 'Engulf',
                type: 'save',
                desc: 'Strength Saving Throw: DC 15, one Medium or smaller creature within 5 feet. Failure: The target is pulled into the shambling mound\'s space and has the Grappled condition (escape DC 14). Until the grapple ends, the target has the Blinded and Restrained conditions, and it takes 10 (3d6) Lightning damage at the start of each of its turns. When the shambling mound moves, the Grappled target moves with it, costing it no extra movement. The shambling mound can have only one creature Grappled by this action at a time.',
                saveDC: 15,
                saveAbility: 'STR',
                damage: '0'
            }
        ]
    },
    {
        id: 'shrieker_fungus',
        name: 'Shrieker Fungus',
        type: 'Plant',
        size: 'Medium',
        ac: 5,
        hp: 13, // 3d8
        speed: 5,
        stats: stats(1, 1, 10, 1, 3, 1),
        cr: 0,
        immunities: ['blinded', 'charmed', 'deafened', 'frightened'],
        senses: 'Blindsight 30 ft., Passive Perception 6',
        languages: 'None',
        aiBehavior: 'defensive',
        actions: [],
        reactions: [
            {
                name: 'Shriek',
                type: 'ability',
                desc: 'Trigger: A creature or a source of Bright Light moves within 30 feet of the shrieker. Response: The shrieker emits a shriek audible within 300 feet of itself for 1 minute or until the shrieker dies.'
            }
        ]
    },
    {
        id: 'treant',
        name: 'Treant',
        type: 'Plant',
        size: 'Huge',
        ac: 16,
        hp: 138, // 12d12 + 60
        speed: 30,
        stats: stats(23, 8, 21, 12, 16, 12),
        cr: 9,
        vulnerabilities: ['fire'],
        resistances: ['bludgeoning', 'piercing'],
        senses: 'Passive Perception 13',
        languages: 'Common, Druidic, Elvish, Sylvan',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Siege Monster', desc: 'The treant deals double damage to objects and structures.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The treant makes two Slam attacks.',
                multiattackActions: ['Slam', 'Slam']
            },
            {
                name: 'Slam',
                type: 'melee',
                desc: 'Melee Attack Roll: +10, reach 5 ft. Hit: 16 (3d6 + 6) Bludgeoning damage.',
                attackBonus: 10,
                damage: '3d6+6',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Hail of Bark',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +10, range 180 ft. Hit: 28 (4d10 + 6) Piercing damage.',
                attackBonus: 10,
                damage: '4d10+6',
                damageType: 'piercing',
                range: 180
            },
            {
                name: 'Animate Trees',
                type: 'ability',
                desc: '1/Day. The treant magically animates up to two trees it can see within 60 feet of itself. Each tree uses the Treant stat block, except it has Intelligence and Charisma scores of 1, it can\'t speak, and it lacks this action. The tree takes its turn immediately after the treant on the same Initiative count, and it obeys the treant. A tree remains animate for 1 day or until it dies, the treant dies, or it is more than 120 feet from the treant. The tree then takes root if possible.'
            }
        ]
    },
    {
        id: 'violet_fungus',
        name: 'Violet Fungus',
        type: 'Plant',
        size: 'Medium',
        ac: 5,
        hp: 18, // 4d8
        speed: 5,
        stats: stats(3, 1, 10, 1, 3, 1),
        cr: 0.25,
        immunities: ['blinded', 'charmed', 'deafened', 'frightened'],
        senses: 'Blindsight 30 ft., Passive Perception 6',
        languages: 'None',
        aiBehavior: 'aggressive',
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The fungus makes two Rotting Touch attacks.',
                multiattackActions: ['Rotting Touch', 'Rotting Touch']
            },
            {
                name: 'Rotting Touch',
                type: 'melee',
                desc: 'Melee Attack Roll: +2, reach 10 ft. Hit: 4 (1d8) Necrotic damage.',
                attackBonus: 2,
                damage: '1d8',
                damageType: 'necrotic',
                reach: 10
            }
        ]
    }
];

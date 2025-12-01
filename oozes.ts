
import { MonsterData } from '../../types';
import { stats } from './utils';

export const OOZES: MonsterData[] = [
    {
        id: 'black_pudding',
        name: 'Black Pudding',
        type: 'Ooze',
        size: 'Large',
        ac: 7,
        hp: 85, // 10d10 + 30
        speed: 20, // Climb 20
        stats: stats(16, 5, 16, 1, 6, 1),
        cr: 4,
        immunities: ['acid', 'cold', 'lightning', 'slashing'],
        conditionImmunities: ['blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'grappled', 'prone', 'restrained'],
        senses: 'Blindsight 60ft (blind beyond), Passive Perception 8',
        languages: 'None',
        aiBehavior: 'aggressive',
        lore: "A blob of shifting black sludge that dissolves flesh, metal, and wood.",
        actions: [
            {
                name: 'Pseudopod',
                type: 'melee',
                desc: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 18 (4d8) acid damage. In addition, nonmagical armor worn by the target is partly dissolved and takes a permanent and cumulative -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10.',
                attackBonus: 5,
                damage: '1d6+3+4d8',
                damageType: 'acid', // Dominant type for automation
                reach: 5
            }
        ],
        traits: [
            { name: 'Amorphous', desc: 'The pudding can move through a space as narrow as 1 inch without expending extra movement to do so.' },
            { name: 'Corrosive Form', desc: 'A creature that hits the pudding with a melee attack roll takes 4 (1d8) Acid damage. Nonmagical ammunition is destroyed immediately after hitting the pudding and dealing any damage. Any nonmagical weapon takes a cumulative -1 penalty to attack rolls immediately after dealing damage to the pudding and coming into contact with it. The weapon is destroyed if the penalty reaches -5. The penalty can be removed by casting the Mending spell on the weapon. In 1 minute, the pudding can eat through 2 feet of nonmagical wood or metal.' },
            { name: 'Spider Climb', desc: 'The pudding can climb difficult surfaces, including along ceilings, without needing to make an ability check.' }
        ],
        reactions: [
            {
                name: 'Split',
                type: 'ability',
                desc: 'Trigger: The pudding is subjected to lightning or slashing damage. Response: The pudding splits into two new puddings if it has at least 10 hit points. Each new pudding has hit points equal to half the original pudding\'s, rounded down. New puddings are one size smaller than the original pudding.'
            }
        ]
    },
    {
        id: 'gelatinous_cube',
        name: 'Gelatinous Cube',
        type: 'Ooze',
        size: 'Large',
        ac: 6,
        hp: 84, // 8d10 + 40
        speed: 15, 
        stats: stats(14, 3, 20, 1, 6, 1),
        cr: 2,
        immunities: ['acid'],
        conditionImmunities: ['blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'prone'],
        senses: 'Blindsight 60ft (blind beyond), Passive Perception 8',
        languages: 'None',
        aiBehavior: 'aggressive',
        lore: "A transparent cube of ooze that scours dungeon passages.",
        actions: [
            {
                name: 'Pseudopod',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 10 (3d6) Acid damage.',
                attackBonus: 4,
                damage: '3d6',
                damageType: 'acid',
                reach: 5
            },
            {
                name: 'Engulf',
                type: 'save',
                desc: 'The cube moves up to its Speed without provoking Opportunity Attacks. It can enter Large or smaller creatures\' spaces. Dexterity Saving Throw: DC 12, each creature whose space the cube enters for the first time during this move. Failure: 10 (3d6) Acid damage, and the target is engulfed. An engulfed target is suffocating, can\'t cast spells with a Verbal component, has the Restrained condition, and takes 21 (6d6) Acid damage at the start of each of the cube\'s turns.',
                damage: '3d6',
                damageType: 'acid',
                saveDC: 12,
                saveAbility: 'DEX'
            }
        ],
        traits: [
            { name: 'Ooze Cube', desc: 'The cube fills its entire space and is transparent. Creatures inside have Total Cover. Can hold one Large or four Medium/Small creatures. As an action, a creature within 5 feet can pull a creature out (DC 12 Strength check), taking 10 (3d6) Acid damage.' },
            { name: 'Transparent', desc: 'Even when the cube is in plain sight, a creature must succeed on a DC 15 Wisdom (Perception) check to notice the cube if the creature hasn\'t witnessed the cube move or otherwise act.' }
        ]
    },
    {
        id: 'gray_ooze',
        name: 'Gray Ooze',
        type: 'Ooze',
        size: 'Medium',
        ac: 8, 
        hp: 22, // 3d8 + 9
        speed: 10, // Climb 10
        stats: stats(12, 6, 16, 1, 6, 2),
        cr: 0.5,
        resistances: ['acid', 'cold', 'fire'],
        conditionImmunities: ['blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'grappled', 'prone', 'restrained'],
        senses: 'Blindsight 60ft (blind beyond), Passive Perception 8',
        languages: 'None',
        aiBehavior: 'aggressive',
        lore: "A liquid rock mimic that dissolves metal.",
        actions: [
            {
                name: 'Pseudopod',
                type: 'melee',
                desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 4 (1d6 + 1) Bludgeoning damage plus 7 (2d6) Acid damage. Nonmagical armor worn by the target takes a -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the Mending spell on the armor.',
                attackBonus: 3,
                damage: '1d6+1+2d6',
                damageType: 'acid',
                reach: 5
            }
        ],
        traits: [
            { name: 'Amorphous', desc: 'The ooze can move through a space as narrow as 1 inch without expending extra movement to do so.' },
            { name: 'Corrosive Form', desc: 'A creature that hits the ooze with a melee attack roll takes 4 (1d8) Acid damage. Nonmagical ammunition is destroyed immediately after hitting the ooze. Any nonmagical weapon takes a cumulative -1 penalty to attack rolls immediately after dealing damage to the ooze and coming into contact with it. Destroyed at -5. The penalty can be removed by casting the Mending spell on the weapon. The ooze can eat through 2-inch-thick, nonmagical metal or wood in 1 round.' },
            { name: 'Spider Climb', desc: 'The ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.' }
        ]
    },
    {
        id: 'ochre_jelly',
        name: 'Ochre Jelly',
        type: 'Ooze',
        size: 'Large',
        ac: 8,
        hp: 45, // 6d10 + 12
        speed: 10, // Climb 10
        stats: stats(15, 6, 14, 2, 6, 1),
        cr: 2,
        resistances: ['acid'],
        immunities: ['lightning', 'slashing'],
        conditionImmunities: ['blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'grappled', 'prone', 'restrained'],
        senses: 'Blindsight 60ft (blind beyond), Passive Perception 8',
        languages: 'None',
        aiBehavior: 'aggressive',
        lore: "A yellowish blob of jelly that can squeeze through cracks.",
        actions: [
            {
                name: 'Pseudopod',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 9 (2d6 + 2) Bludgeoning damage plus 3 (1d6) Acid damage.',
                attackBonus: 4,
                damage: '2d6+2+1d6',
                damageType: 'acid',
                reach: 5
            }
        ],
        traits: [
            { name: 'Amorphous', desc: 'The jelly can move through a space as narrow as 1 inch wide without squeezing.' },
            { name: 'Spider Climb', desc: 'The jelly can climb difficult surfaces, including along ceilings, without needing to make an ability check.' }
        ],
        reactions: [
            {
                name: 'Split',
                type: 'ability',
                desc: 'Trigger: While the jelly is Large or Medium and has 10+ Hit Points, it becomes Bloodied or is subjected to Lightning or Slashing damage. Response: The jelly splits into two new Ochre Jellies. Each new jelly is one size smaller than the original jelly and acts on its Initiative. The original jelly\'s Hit Points are divided evenly between the new jellies (round down).'
            }
        ]
    }
];

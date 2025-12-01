


import { MonsterData } from '../../types';
import { stats } from './utils';

export const BEASTS: MonsterData[] = [
    {
        id: 'allosaurus',
        name: 'Allosaurus',
        type: 'Beast',
        size: 'Large',
        ac: 13,
        hp: 51,
        speed: 12, // 60ft
        stats: stats(19, 13, 17, 2, 12, 5),
        cr: 2,
        senses: 'Passive Perception 15',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 15 (2d10 + 4) Piercing damage.', attackBonus: 6, damage: '2d10+4', damageType: 'piercing' },
            { name: 'Claws', type: 'melee', desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 8 (1d8 + 4) Slashing damage. If the target is a Large or smaller creature and the allosaurus moved 30+ ft straight toward it immediately before the hit, the target has the Prone condition, and the allosaurus can make one Bite attack against it.', attackBonus: 6, damage: '1d8+4', damageType: 'slashing' }
        ]
    },
    {
        id: 'ankylosaurus',
        name: 'Ankylosaurus',
        type: 'Beast',
        size: 'Huge',
        ac: 15,
        hp: 68,
        speed: 6, // 30ft
        stats: stats(19, 11, 15, 2, 12, 5),
        cr: 3,
        senses: 'Passive Perception 11',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The ankylosaurus makes two Tail attacks.', multiattackActions: ['Tail', 'Tail'] },
            { name: 'Tail', type: 'melee', desc: 'Melee Attack Roll: +6, reach 10 ft. Hit: 9 (1d10 + 4) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition.', attackBonus: 6, damage: '1d10+4', damageType: 'bludgeoning', reach: 10 }
        ]
    },
    {
        id: 'ape',
        name: 'Ape',
        type: 'Beast',
        size: 'Medium',
        ac: 12,
        hp: 19,
        speed: 6, // 30ft, climb 30ft
        stats: stats(16, 14, 14, 6, 12, 7),
        cr: 0.5,
        senses: 'Passive Perception 13',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The ape makes two Fist attacks.', multiattackActions: ['Fist', 'Fist'] },
            { name: 'Fist', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 5 (1d4 + 3) Bludgeoning damage.', attackBonus: 5, damage: '1d4+3', damageType: 'bludgeoning' },
            { name: 'Rock', type: 'ranged', desc: 'Ranged Attack Roll: +5, range 25/50 ft. Hit: 10 (2d6 + 3) Bludgeoning damage.', attackBonus: 5, damage: '2d6+3', damageType: 'bludgeoning', range: 25 }
        ]
    },
    {
        id: 'archelon',
        name: 'Archelon',
        type: 'Beast',
        size: 'Huge',
        ac: 17,
        hp: 90,
        speed: 4, // 20ft, swim 80ft
        stats: stats(18, 16, 13, 4, 14, 6),
        cr: 4,
        senses: 'Passive Perception 12',
        aiBehavior: 'defensive',
        traits: [{ name: 'Amphibious', desc: 'Can breathe air and water.' }],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The archelon makes two Bite attacks.', multiattackActions: ['Bite', 'Bite'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 14 (3d6 + 4) Piercing damage.', attackBonus: 6, damage: '3d6+4', damageType: 'piercing' }
        ]
    },
    {
        id: 'baboon',
        name: 'Baboon',
        type: 'Beast',
        size: 'Small',
        ac: 12,
        hp: 3,
        speed: 6, // 30ft, climb 30ft
        stats: stats(8, 14, 11, 4, 12, 6),
        cr: 0,
        senses: 'Passive Perception 11',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Pack Tactics', desc: 'Advantage on attack if ally is within 5 ft.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +1, reach 5 ft. Hit: 1 (1d4 - 1) Piercing damage.', attackBonus: 1, damage: '1d4-1', damageType: 'piercing' }
        ]
    },
    {
        id: 'badger',
        name: 'Badger',
        type: 'Beast',
        size: 'Tiny',
        ac: 11,
        hp: 5,
        speed: 4, // 20ft, burrow 5ft
        stats: stats(10, 11, 16, 2, 12, 5),
        cr: 0,
        resistances: ['poison'],
        senses: 'Darkvision 30 ft., Passive Perception 13',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 1 Piercing damage.', attackBonus: 2, damage: '1', damageType: 'piercing' }
        ]
    },
    {
        id: 'bat',
        name: 'Bat',
        type: 'Beast',
        size: 'Tiny',
        ac: 12,
        hp: 1,
        speed: 1, // 5ft, fly 30ft
        stats: stats(2, 15, 8, 2, 12, 4),
        cr: 0,
        senses: 'Blindsight 60 ft., Passive Perception 11',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 1 Piercing damage.', attackBonus: 4, damage: '1', damageType: 'piercing' }
        ]
    },
    {
        id: 'black_bear',
        name: 'Black Bear',
        type: 'Beast',
        size: 'Medium',
        ac: 11,
        hp: 19,
        speed: 8, // 40ft, climb 30ft
        stats: stats(15, 10, 14, 2, 12, 7),
        cr: 0.5,
        senses: 'Passive Perception 13',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The bear makes two Rend attacks.', multiattackActions: ['Rend', 'Rend'] },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) Slashing damage.', attackBonus: 4, damage: '1d6+2', damageType: 'slashing' }
        ]
    },
    {
        id: 'blood_hawk',
        name: 'Blood Hawk',
        type: 'Beast',
        size: 'Small',
        ac: 12,
        hp: 7,
        speed: 2, // 10ft, fly 60ft
        stats: stats(6, 14, 10, 3, 14, 5),
        cr: 0.125,
        senses: 'Passive Perception 14',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Pack Tactics', desc: 'Advantage on attack if ally is within 5 ft.' }],
        actions: [
            { name: 'Beak', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 4 (1d4 + 2) Piercing damage, or 6 (1d8 + 2) if target is Bloodied.', attackBonus: 4, damage: '1d4+2', damageType: 'piercing' }
        ]
    },
    {
        id: 'boar',
        name: 'Boar',
        type: 'Beast',
        size: 'Medium',
        ac: 11,
        hp: 13,
        speed: 8, // 40ft
        stats: stats(13, 11, 14, 2, 9, 5),
        cr: 0.25,
        senses: 'Passive Perception 9',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Bloodied Fury', desc: 'While Bloodied, has Advantage on attack rolls.' }],
        actions: [
            { name: 'Gore', type: 'melee', desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 4 (1d6 + 1) Piercing damage. If target is Medium or smaller and boar moved 20+ ft straight toward it, +3 (1d6) damage and target Prone.', attackBonus: 3, damage: '1d6+1', damageType: 'piercing' }
        ]
    },
    {
        id: 'brown_bear',
        name: 'Brown Bear',
        type: 'Beast',
        size: 'Large',
        ac: 11,
        hp: 22, // 3d10+6 - PDF says 22 not 34
        speed: 8, // 40ft, climb 30ft
        stats: stats(17, 12, 15, 2, 13, 7),
        cr: 1,
        senses: 'Darkvision 60 ft., Passive Perception 13',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The bear makes one Bite attack and one Claw attack.', multiattackActions: ['Bite', 'Claw'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage.', attackBonus: 5, damage: '1d8+3', damageType: 'piercing' },
            { name: 'Claw', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 5 (1d4 + 3) Slashing damage. If target is Large or smaller, it is Prone.', attackBonus: 5, damage: '1d4+3', damageType: 'slashing' }
        ]
    },
    {
        id: 'camel',
        name: 'Camel',
        type: 'Beast',
        size: 'Large',
        ac: 10,
        hp: 17,
        speed: 10, // 50ft
        stats: stats(15, 8, 17, 2, 11, 5),
        cr: 0.125,
        senses: 'Darkvision 60 ft., Passive Perception 10',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 4 (1d4 + 2) Bludgeoning damage.', attackBonus: 4, damage: '1d4+2', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'cat',
        name: 'Cat',
        type: 'Beast',
        size: 'Tiny',
        ac: 12,
        hp: 2,
        speed: 8, // 40ft, climb 40ft
        stats: stats(3, 15, 10, 3, 12, 7),
        cr: 0,
        senses: 'Darkvision 60 ft., Passive Perception 13',
        aiBehavior: 'defensive',
        traits: [{ name: 'Jumper', desc: 'Jump distance uses Dex.' }],
        actions: [
            { name: 'Scratch', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 1 Slashing damage.', attackBonus: 4, damage: '1', damageType: 'slashing' }
        ]
    },
    {
        id: 'constrictor_snake',
        name: 'Constrictor Snake',
        type: 'Beast',
        size: 'Large',
        ac: 13,
        hp: 13,
        speed: 6, // 30ft, swim 30ft
        stats: stats(15, 14, 12, 1, 10, 3),
        cr: 0.25,
        senses: 'Blindsight 10 ft., Passive Perception 12',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 6 (1d8 + 2) Piercing damage.', attackBonus: 4, damage: '1d8+2', damageType: 'piercing' },
            { name: 'Constrict', type: 'save', desc: 'Strength Saving Throw: DC 12, one Medium or smaller creature within 5 ft. Failure: 7 (3d4) Bludgeoning damage, and Grappled (escape DC 12).', saveDC: 12, saveAbility: 'STR', damage: '3d4', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'crab',
        name: 'Crab',
        type: 'Beast',
        size: 'Tiny',
        ac: 11,
        hp: 3,
        speed: 4, // 20ft, swim 20ft
        stats: stats(6, 11, 12, 1, 8, 2),
        cr: 0,
        senses: 'Blindsight 30 ft., Passive Perception 9',
        aiBehavior: 'defensive',
        traits: [{ name: 'Amphibious', desc: 'Can breathe air and water.' }],
        actions: [
            { name: 'Claw', type: 'melee', desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 1 Bludgeoning damage.', attackBonus: 2, damage: '1', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'crocodile',
        name: 'Crocodile',
        type: 'Beast',
        size: 'Large',
        ac: 12,
        hp: 13,
        speed: 4, // 20ft, swim 30ft
        stats: stats(15, 10, 13, 2, 10, 5),
        cr: 0.5,
        senses: 'Passive Perception 10',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Hold Breath', desc: 'Can hold breath for 1 hour.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 6 (1d8 + 2) Piercing damage. If Medium or smaller, Grappled (escape DC 12) and Restrained.', attackBonus: 4, damage: '1d8+2', damageType: 'piercing' }
        ]
    },
    {
        id: 'deer',
        name: 'Deer',
        type: 'Beast',
        size: 'Medium',
        ac: 13,
        hp: 4,
        speed: 10, // 50ft
        stats: stats(11, 16, 11, 2, 14, 5),
        cr: 0,
        senses: 'Darkvision 60 ft., Passive Perception 14',
        aiBehavior: 'defensive',
        traits: [{ name: 'Agile', desc: 'Doesn\'t provoke Opportunity Attacks when moving out of reach.' }],
        actions: [
            { name: 'Ram', type: 'melee', desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 2 (1d4) Bludgeoning damage.', attackBonus: 2, damage: '1d4', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'dire_wolf',
        name: 'Dire Wolf',
        type: 'Beast',
        size: 'Large',
        ac: 14,
        hp: 22, // from PDF
        speed: 10, // 50ft
        stats: stats(17, 15, 15, 3, 12, 7),
        cr: 1,
        senses: 'Darkvision 60 ft., Passive Perception 15',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Pack Tactics', desc: 'Advantage on attack if ally is within 5 ft.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 8 (1d10 + 3) Piercing damage. If Large or smaller, Prone.', attackBonus: 5, damage: '1d10+3', damageType: 'piercing' }
        ]
    },
    {
        id: 'draft_horse',
        name: 'Draft Horse',
        type: 'Beast',
        size: 'Large',
        ac: 10,
        hp: 15,
        speed: 8, // 40ft
        stats: stats(18, 10, 15, 2, 11, 7),
        cr: 0.25,
        senses: 'Passive Perception 10',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Hooves', type: 'melee', desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 6 (1d4 + 4) Bludgeoning damage.', attackBonus: 6, damage: '1d4+4', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'eagle',
        name: 'Eagle',
        type: 'Beast',
        size: 'Small',
        ac: 12,
        hp: 4,
        speed: 2, // 10ft, fly 60ft
        stats: stats(6, 15, 12, 2, 14, 7),
        cr: 0,
        senses: 'Passive Perception 16',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Talons', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 4 (1d4 + 2) Slashing damage.', attackBonus: 4, damage: '1d4+2', damageType: 'slashing' }
        ]
    },
    {
        id: 'elephant',
        name: 'Elephant',
        type: 'Beast',
        size: 'Huge',
        ac: 12,
        hp: 76,
        speed: 8, // 40ft
        stats: stats(22, 9, 17, 3, 11, 6),
        cr: 4,
        senses: 'Passive Perception 10',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The elephant makes two Gore attacks.', multiattackActions: ['Gore', 'Gore'] },
            { name: 'Gore', type: 'melee', desc: 'Melee Attack Roll: +8, reach 5 ft. Hit: 15 (2d8 + 6) Piercing damage. If Huge or smaller and moved 20+ ft straight toward, Prone.', attackBonus: 8, damage: '2d8+6', damageType: 'piercing' }
        ],
        bonusActions: [
            { name: 'Trample', type: 'save', desc: 'Dexterity Saving Throw: DC 16, one creature within 5 ft that is Prone. Failure: 17 (2d10 + 6) Bludgeoning damage. Success: Half damage.', saveDC: 16, saveAbility: 'DEX', damage: '2d10+6', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'elk',
        name: 'Elk',
        type: 'Beast',
        size: 'Large',
        ac: 10,
        hp: 11,
        speed: 10, // 50ft
        stats: stats(16, 10, 11, 2, 10, 6),
        cr: 0.25,
        senses: 'Darkvision 60 ft., Passive Perception 12',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Ram', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 6 (1d6 + 3) Bludgeoning damage. If Large or smaller and moved 20+ ft straight toward, +3 (1d6) Bludgeoning and Prone.', attackBonus: 5, damage: '1d6+3', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'frog',
        name: 'Frog',
        type: 'Beast',
        size: 'Tiny',
        ac: 11,
        hp: 1,
        speed: 4, // 20ft, swim 20ft
        stats: stats(1, 13, 8, 1, 8, 3),
        cr: 0,
        senses: 'Darkvision 30 ft., Passive Perception 11',
        aiBehavior: 'defensive',
        traits: [
            { name: 'Amphibious', desc: 'Can breathe air and water.' },
            { name: 'Standing Leap', desc: 'Long Jump 10 ft, High Jump 5 ft.' }
        ],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 1 Piercing damage.', attackBonus: 3, damage: '1', damageType: 'piercing' }
        ]
    },
    {
        id: 'giant_ape',
        name: 'Giant Ape',
        type: 'Beast',
        size: 'Huge',
        ac: 12,
        hp: 168,
        speed: 8, // 40ft, climb 40ft
        stats: stats(23, 14, 18, 5, 12, 7),
        cr: 7,
        senses: 'Passive Perception 14',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The ape makes two Fist attacks.', multiattackActions: ['Fist', 'Fist'] },
            { name: 'Fist', type: 'melee', desc: 'Melee Attack Roll: +9, reach 10 ft. Hit: 22 (3d10 + 6) Bludgeoning damage.', attackBonus: 9, damage: '3d10+6', damageType: 'bludgeoning', reach: 10 },
            { name: 'Boulder Toss', type: 'save', desc: 'Recharge 6. Dexterity Saving Throw: DC 17, each creature in a 5-foot-radius Sphere centered on that point. Failure: 24 (7d6) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition. Success: Half damage only.', saveDC: 17, saveAbility: 'DEX', damage: '7d6', damageType: 'bludgeoning', range: 90 }
        ],
        bonusActions: [
            { name: 'Leap', type: 'ability', desc: 'The ape jumps up to 30 feet by spending 10 feet of movement.' }
        ]
    },
    {
        id: 'giant_badger',
        name: 'Giant Badger',
        type: 'Beast',
        size: 'Medium',
        ac: 13,
        hp: 15,
        speed: 6, // 30ft, burrow 10ft
        stats: stats(13, 10, 17, 2, 12, 5),
        cr: 0.25,
        resistances: ['poison'],
        senses: 'Darkvision 60 ft., Passive Perception 13',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 6 (2d4 + 1) Piercing damage.', attackBonus: 3, damage: '2d4+1', damageType: 'piercing' }
        ]
    },
    {
        id: 'giant_bat',
        name: 'Giant Bat',
        type: 'Beast',
        size: 'Large',
        ac: 13,
        hp: 22,
        speed: 2, // 10ft, fly 60ft
        stats: stats(15, 16, 11, 2, 12, 6),
        cr: 0.25,
        senses: 'Blindsight 120 ft., Passive Perception 11',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Echolocation', desc: 'Can\'t use blindsight while deafened.' },
            { name: 'Keen Hearing', desc: 'Advantage on hearing Perception.' }
        ],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 6 (1d6 + 3) Piercing damage.', attackBonus: 5, damage: '1d6+3', damageType: 'piercing' }
        ]
    },
    {
        id: 'giant_boar',
        name: 'Giant Boar',
        type: 'Beast',
        size: 'Large',
        ac: 13,
        hp: 42,
        speed: 8, // 40ft
        stats: stats(17, 10, 16, 2, 7, 5),
        cr: 2,
        senses: 'Passive Perception 8',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Bloodied Fury', desc: 'Advantage on melee attack rolls while it is Bloodied.' }],
        actions: [
            { name: 'Gore', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 10 (2d6 + 3) Piercing damage. If Large or smaller and moved 20+ ft straight toward it immediately before the hit, the target takes an extra 7 (2d6) Piercing damage and has the Prone condition.', attackBonus: 5, damage: '2d6+3', damageType: 'piercing' }
        ]
    },
    {
        id: 'giant_centipede',
        name: 'Giant Centipede',
        type: 'Beast',
        size: 'Small',
        ac: 14,
        hp: 9,
        speed: 6, // 30ft, climb 30ft
        stats: stats(5, 14, 12, 1, 7, 3),
        cr: 0.25,
        senses: 'Blindsight 30 ft., Passive Perception 8',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 4 (1d4 + 2) Piercing damage, and the target has the Poisoned condition until the start of the centipede\'s next turn.', attackBonus: 4, damage: '1d4+2', damageType: 'piercing' }
        ]
    },
    {
        id: 'giant_constrictor_snake',
        name: 'Giant Constrictor Snake',
        type: 'Beast',
        size: 'Huge',
        ac: 12,
        hp: 60,
        speed: 6, // 30ft, swim 30ft
        stats: stats(19, 14, 12, 1, 10, 3),
        cr: 2,
        senses: 'Blindsight 10 ft., Passive Perception 12',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The snake makes one Bite attack and uses Constrict.', multiattackActions: ['Bite', 'Constrict'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +6, reach 10 ft. Hit: 11 (2d6 + 4) Piercing damage.', attackBonus: 6, damage: '2d6+4', damageType: 'piercing', reach: 10 },
            { name: 'Constrict', type: 'save', desc: 'Strength Saving Throw: DC 14, one Large or smaller creature the snake can see within 10 feet. Failure: 13 (2d8 + 4) Bludgeoning damage, and the target has the Grappled condition (escape DC 14).', saveDC: 14, saveAbility: 'STR', damage: '2d8+4', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'giant_crab',
        name: 'Giant Crab',
        type: 'Beast',
        size: 'Medium',
        ac: 15,
        hp: 13,
        speed: 6, // 30ft, swim 30ft
        stats: stats(13, 13, 11, 1, 9, 3),
        cr: 0.125,
        senses: 'Blindsight 30 ft., Passive Perception 9',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Amphibious', desc: 'Can breathe air and water.' }],
        actions: [
            { name: 'Claw', type: 'melee', desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 4 (1d6 + 1) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 11) from one of two claws.', attackBonus: 3, damage: '1d6+1', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'giant_crocodile',
        name: 'Giant Crocodile',
        type: 'Beast',
        size: 'Huge',
        ac: 14,
        hp: 85,
        speed: 6, // 30ft, swim 50ft
        stats: stats(21, 9, 17, 2, 10, 7),
        cr: 5,
        senses: 'Passive Perception 10',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Hold Breath', desc: 'Can hold breath for 1 hour.' }],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The crocodile makes one Bite attack and one Tail attack.', multiattackActions: ['Bite', 'Tail'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +8, reach 5 ft. Hit: 21 (3d10 + 5) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition and can\'t be targeted by the crocodile\'s Tail.', attackBonus: 8, damage: '3d10+5', damageType: 'piercing' },
            { name: 'Tail', type: 'melee', desc: 'Melee Attack Roll: +8, reach 10 ft. Hit: 18 (3d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.', attackBonus: 8, damage: '3d8+5', damageType: 'bludgeoning', reach: 10 }
        ]
    },
    {
        id: 'giant_fire_beetle',
        name: 'Giant Fire Beetle',
        type: 'Beast',
        size: 'Small',
        ac: 13,
        hp: 4,
        speed: 6, // 30ft, climb 30ft
        stats: stats(8, 10, 12, 1, 7, 3),
        cr: 0,
        resistances: ['fire'],
        senses: 'Blindsight 30 ft., Passive Perception 8',
        aiBehavior: 'defensive',
        traits: [{ name: 'Illumination', desc: 'Sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +1, reach 5 ft. Hit: 1 Fire damage.', attackBonus: 1, damage: '1', damageType: 'fire' }
        ]
    },
    {
        id: 'giant_frog',
        name: 'Giant Frog',
        type: 'Beast',
        size: 'Medium',
        ac: 11,
        hp: 18,
        speed: 6, // 30ft, swim 30ft
        stats: stats(12, 13, 11, 2, 10, 3),
        cr: 0.25,
        senses: 'Darkvision 30 ft., Passive Perception 12',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Amphibious', desc: 'Can breathe air and water.' },
            { name: 'Standing Leap', desc: 'Long Jump 20 ft, High Jump 10 ft.' }
        ],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage. If Medium or smaller, Grappled (escape DC 11).', attackBonus: 3, damage: '1d6+2', damageType: 'piercing' },
            { name: 'Swallow', type: 'ability', desc: 'Swallows Medium or smaller grappled target. Blinded, Restrained, Total Cover. 5 (2d4) Acid damage at end of frog\'s turns.' }
        ]
    },
    {
        id: 'giant_goat',
        name: 'Giant Goat',
        type: 'Beast',
        size: 'Large',
        ac: 11,
        hp: 19,
        speed: 8, // 40ft, climb 30ft
        stats: stats(17, 13, 12, 3, 12, 6),
        cr: 0.5,
        senses: 'Darkvision 60 ft., Passive Perception 13',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Ram', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 6 (1d6 + 3) Bludgeoning damage. If the target is a Large or smaller creature and the goat moved 20+ ft straight toward it immediately before the hit, the target takes an extra 5 (2d4) Bludgeoning damage and has the Prone condition.', attackBonus: 5, damage: '1d6+3', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'giant_hyena',
        name: 'Giant Hyena',
        type: 'Beast',
        size: 'Large',
        ac: 12,
        hp: 45,
        speed: 10, // 50ft
        stats: stats(16, 14, 14, 2, 12, 7),
        cr: 1,
        senses: 'Darkvision 60 ft., Passive Perception 13',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 10 (2d6 + 3) Piercing damage.', attackBonus: 5, damage: '2d6+3', damageType: 'piercing' }
        ],
        bonusActions: [
            { name: 'Rampage', type: 'ability', desc: '1/Day. After dealing damage to a creature that was already Bloodied, the hyena can move up to half its Speed, and it makes one Bite attack.' }
        ]
    },
    {
        id: 'giant_lizard',
        name: 'Giant Lizard',
        type: 'Beast',
        size: 'Large',
        ac: 12,
        hp: 19,
        speed: 8, // 40ft, climb 40ft
        stats: stats(15, 12, 13, 2, 10, 5),
        cr: 0.25,
        senses: 'Darkvision 60 ft., Passive Perception 10',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Spider Climb', desc: 'Climb difficult surfaces, ceilings.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 6 (1d8 + 2) Piercing damage.', attackBonus: 4, damage: '1d8+2', damageType: 'piercing' }
        ]
    },
    {
        id: 'giant_octopus',
        name: 'Giant Octopus',
        type: 'Beast',
        size: 'Large',
        ac: 11,
        hp: 45,
        speed: 2, // 10ft, swim 60ft
        stats: stats(17, 13, 13, 5, 10, 4),
        cr: 1,
        senses: 'Darkvision 60 ft., Passive Perception 14',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Water Breathing', desc: 'Hold breath 1 hour outside water.' }],
        actions: [
            { name: 'Tentacles', type: 'melee', desc: 'Melee Attack Roll: +5, reach 10 ft. Hit: 10 (2d6 + 3) Bludgeoning damage. If Medium or smaller, Grappled (escape DC 13). While Grappled, Restrained.', attackBonus: 5, damage: '2d6+3', damageType: 'bludgeoning', reach: 10 }
        ],
        reactions: [
            { name: 'Ink Cloud', type: 'ability', desc: '1/Day. When taking damage underwater, release ink cloud (10ft Cube) and move Swim Speed.' }
        ]
    },
    {
        id: 'giant_rat',
        name: 'Giant Rat',
        type: 'Beast',
        size: 'Small',
        ac: 13,
        hp: 7,
        speed: 6, // 30ft, climb 30ft
        stats: stats(7, 16, 11, 2, 10, 4),
        cr: 0.125,
        senses: 'Darkvision 60 ft., Passive Perception 12',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Pack Tactics', desc: 'Advantage on attack if ally is within 5 ft.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 5 (1d4 + 3) Piercing damage.', attackBonus: 5, damage: '1d4+3', damageType: 'piercing' }
        ]
    },
    {
        id: 'giant_scorpion',
        name: 'Giant Scorpion',
        type: 'Beast',
        size: 'Large',
        ac: 15,
        hp: 52,
        speed: 8, // 40ft
        stats: stats(16, 13, 15, 1, 9, 3),
        cr: 3,
        senses: 'Blindsight 60 ft., Passive Perception 9',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The scorpion makes two Claw attacks and one Sting attack.', multiattackActions: ['Claw', 'Claw', 'Sting'] },
            { name: 'Claw', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 6 (1d6 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13) from one of two claws.', attackBonus: 5, damage: '1d6+3', damageType: 'bludgeoning' },
            { name: 'Sting', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage plus 11 (2d10) Poison damage.', attackBonus: 5, damage: '1d8+3', damageType: 'piercing' }
        ]
    },
    {
        id: 'giant_seahorse',
        name: 'Giant Seahorse',
        type: 'Beast',
        size: 'Large',
        ac: 14,
        hp: 16,
        speed: 1, // 5ft, swim 40ft
        stats: stats(15, 12, 11, 2, 12, 5),
        cr: 0.5,
        senses: 'Passive Perception 11',
        aiBehavior: 'defensive',
        traits: [{ name: 'Water Breathing', desc: 'Breathe only underwater.' }],
        actions: [
            { name: 'Ram', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 9 (2d6 + 2) Bludgeoning damage, or 11 (2d8 + 2) Bludgeoning damage if the seahorse moved 20+ feet straight toward the target immediately before the hit.', attackBonus: 4, damage: '2d6+2', damageType: 'bludgeoning' }
        ],
        bonusActions: [
            { name: 'Bubble Dash', type: 'ability', desc: 'While underwater, the seahorse moves up to half its Swim Speed without provoking Opportunity Attacks.' }
        ]
    },
    {
        id: 'giant_shark',
        name: 'Giant Shark',
        type: 'Beast',
        size: 'Huge',
        ac: 13,
        hp: 92,
        speed: 1, // 5ft, swim 60ft
        stats: stats(23, 11, 21, 1, 10, 5),
        cr: 5,
        senses: 'Blindsight 60 ft., Passive Perception 13',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Water Breathing', desc: 'Breathe only underwater.' }],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The shark makes two Bite attacks.', multiattackActions: ['Bite', 'Bite'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +9 (with Advantage if the target doesn\'t have all its Hit Points), reach 5 ft. Hit: 22 (3d10 + 6) Piercing damage.', attackBonus: 9, damage: '3d10+6', damageType: 'piercing' }
        ]
    },
    {
        id: 'giant_spider',
        name: 'Giant Spider',
        type: 'Beast',
        size: 'Large',
        ac: 14,
        hp: 26,
        speed: 6, // 30ft, climb 30ft
        stats: stats(14, 16, 12, 2, 11, 4),
        cr: 1,
        senses: 'Darkvision 60 ft., Passive Perception 14',
        aiBehavior: 'lurker',
        traits: [
            { name: 'Spider Climb', desc: 'Climb walls/ceilings.' },
            { name: 'Web Walker', desc: 'Ignore webs.' }
        ],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage plus 7 (2d6) Poison damage.', attackBonus: 5, damage: '1d8+3', damageType: 'piercing' },
            { name: 'Web', type: 'save', desc: 'Recharge 5-6. Dexterity Saving Throw: DC 13, one creature the spider can see within 60 feet. Failure: The target has the Restrained condition until the web is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).', saveDC: 13, saveAbility: 'DEX', damage: '0' }
        ]
    },
    {
        id: 'giant_toad',
        name: 'Giant Toad',
        type: 'Beast',
        size: 'Large',
        ac: 11,
        hp: 39,
        speed: 6, // 30ft, swim 30ft
        stats: stats(15, 13, 13, 2, 10, 3),
        cr: 1,
        senses: 'Darkvision 60 ft., Passive Perception 10',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Amphibious', desc: 'Breathe air and water.' },
            { name: 'Standing Leap', desc: 'Long 20ft, High 10ft.' }
        ],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage plus 5 (2d4) Poison damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12).', attackBonus: 4, damage: '1d6+2', damageType: 'piercing' },
            { name: 'Swallow', type: 'ability', desc: 'Swallows Medium or smaller grappled target. Blinded, Restrained, Total Cover. 10 (3d6) Acid damage at end of toad\'s turns.' }
        ]
    },
    {
        id: 'giant_venomous_snake',
        name: 'Giant Venomous Snake',
        type: 'Beast',
        size: 'Medium',
        ac: 14,
        hp: 11,
        speed: 8, // 40ft, swim 40ft
        stats: stats(10, 18, 13, 2, 10, 3),
        cr: 0.25,
        senses: 'Blindsight 10 ft., Passive Perception 12',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +6, reach 10 ft. Hit: 6 (1d4 + 4) Piercing damage plus 4 (1d8) Poison damage.', attackBonus: 6, damage: '1d4+4', damageType: 'piercing', reach: 10 }
        ]
    },
    {
        id: 'giant_wasp',
        name: 'Giant Wasp',
        type: 'Beast',
        size: 'Medium',
        ac: 13,
        hp: 22, // PDF 5d8
        speed: 2, // 10ft, fly 50ft
        stats: stats(10, 14, 10, 1, 10, 3),
        cr: 0.5,
        senses: 'Passive Perception 10',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Flyby', desc: 'No OA when flying out of reach.' }],
        actions: [
            { name: 'Sting', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage plus 5 (2d4) Poison damage.', attackBonus: 4, damage: '1d6+2', damageType: 'piercing' }
        ]
    },
    {
        id: 'giant_weasel',
        name: 'Giant Weasel',
        type: 'Beast',
        size: 'Medium',
        ac: 13,
        hp: 9,
        speed: 8, // 40ft, climb 30ft
        stats: stats(11, 17, 10, 4, 12, 5),
        cr: 0.125,
        senses: 'Darkvision 60 ft., Passive Perception 13',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 5 (1d4 + 3) Piercing damage.', attackBonus: 5, damage: '1d4+3', damageType: 'piercing' }
        ]
    },
    {
        id: 'giant_wolf_spider',
        name: 'Giant Wolf Spider',
        type: 'Beast',
        size: 'Medium',
        ac: 13,
        hp: 11,
        speed: 8, // 40ft, climb 40ft
        stats: stats(12, 16, 13, 3, 12, 4),
        cr: 0.25,
        senses: 'Blindsight 10 ft., Darkvision 60 ft., Passive Perception 13',
        aiBehavior: 'lurker',
        traits: [{ name: 'Spider Climb', desc: 'Climb walls/ceilings.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 5 (1d4 + 3) Piercing damage plus 5 (2d4) Poison damage.', attackBonus: 5, damage: '1d4+3', damageType: 'piercing' }
        ]
    },
    {
        id: 'goat',
        name: 'Goat',
        type: 'Beast',
        size: 'Medium',
        ac: 10,
        hp: 4,
        speed: 8, // 40ft, climb 30ft
        stats: stats(11, 10, 11, 2, 10, 5),
        cr: 0,
        senses: 'Darkvision 60 ft., Passive Perception 12',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Ram', type: 'melee', desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 1 Bludgeoning damage, or 2 (1d4) Bludgeoning damage if the goat moved 20+ feet straight toward the target immediately before the hit.', attackBonus: 2, damage: '1', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'hawk',
        name: 'Hawk',
        type: 'Beast',
        size: 'Tiny',
        ac: 13,
        hp: 1,
        speed: 2, // 10ft, fly 60ft
        stats: stats(5, 16, 8, 2, 14, 6),
        cr: 0,
        senses: 'Passive Perception 16',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Talons', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 1 Slashing damage.', attackBonus: 5, damage: '1', damageType: 'slashing' }
        ]
    },
    {
        id: 'hippopotamus',
        name: 'Hippopotamus',
        type: 'Beast',
        size: 'Large',
        ac: 14,
        hp: 82,
        speed: 6, // 30ft, swim 30ft
        stats: stats(21, 7, 15, 2, 12, 4),
        cr: 4,
        senses: 'Passive Perception 13',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Hold Breath', desc: 'Hold breath 10 mins.' }],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The hippopotamus makes two Bite attacks.', multiattackActions: ['Bite', 'Bite'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +7, reach 5 ft. Hit: 16 (2d10 + 5) Piercing damage.', attackBonus: 7, damage: '2d10+5', damageType: 'piercing' }
        ]
    },
    {
        id: 'hunter_shark',
        name: 'Hunter Shark',
        type: 'Beast',
        size: 'Large',
        ac: 12,
        hp: 45,
        speed: 1, // 5ft, swim 40ft
        stats: stats(18, 14, 15, 1, 10, 4),
        cr: 2,
        senses: 'Blindsight 60 ft., Passive Perception 12',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Water Breathing', desc: 'Breathe only underwater.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +6 (Advantage if target not full HP), reach 5 ft. Hit: 14 (3d6 + 4) Piercing damage.', attackBonus: 6, damage: '3d6+4', damageType: 'piercing' }
        ]
    },
    {
        id: 'hyena',
        name: 'Hyena',
        type: 'Beast',
        size: 'Medium',
        ac: 11,
        hp: 5,
        speed: 10, // 50ft
        stats: stats(11, 13, 12, 2, 12, 5),
        cr: 0,
        senses: 'Darkvision 60 ft., Passive Perception 13',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Pack Tactics', desc: 'Advantage on attack if ally is within 5 ft.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 3 (1d6) Piercing damage.', attackBonus: 2, damage: '1d6', damageType: 'piercing' }
        ]
    },
    {
        id: 'jackal',
        name: 'Jackal',
        type: 'Beast',
        size: 'Small',
        ac: 12,
        hp: 3,
        speed: 8, // 40ft
        stats: stats(8, 15, 11, 3, 12, 6),
        cr: 0,
        senses: 'Darkvision 90 ft., Passive Perception 15',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +1, reach 5 ft. Hit: 1 (1d4 - 1) Piercing damage.', attackBonus: 1, damage: '1d4-1', damageType: 'piercing' }
        ]
    },
    {
        id: 'killer_whale',
        name: 'Killer Whale',
        type: 'Beast',
        size: 'Huge',
        ac: 12,
        hp: 90,
        speed: 1, // 5ft, swim 60ft
        stats: stats(19, 14, 13, 3, 12, 7),
        cr: 3,
        senses: 'Blindsight 120 ft., Passive Perception 13',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Hold Breath', desc: 'Hold breath 30 mins.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 21 (5d6 + 4) Piercing damage.', attackBonus: 6, damage: '5d6+4', damageType: 'piercing' }
        ]
    },
    {
        id: 'lion',
        name: 'Lion',
        type: 'Beast',
        size: 'Large',
        ac: 12,
        hp: 22, // PDF 4d10
        speed: 10, // 50ft
        stats: stats(17, 15, 11, 3, 12, 8),
        cr: 1,
        senses: 'Darkvision 60 ft., Passive Perception 13',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Pack Tactics', desc: 'Advantage on attack if ally is within 5 ft.' },
            { name: 'Running Leap', desc: 'Long Jump 25 ft with 10 ft start.' }
        ],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The lion makes two Rend attacks. Can replace one with Roar.', multiattackActions: ['Rend', 'Rend'] },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 7 (1d8 + 3) Slashing damage.', attackBonus: 5, damage: '1d8+3', damageType: 'slashing' },
            { name: 'Roar', type: 'save', desc: 'Wisdom Saving Throw: DC 11, one creature within 15 ft. Failure: Frightened until start of lion\'s next turn.', saveDC: 11, saveAbility: 'WIS', damage: '0', range: 15 }
        ]
    },
    {
        id: 'lizard',
        name: 'Lizard',
        type: 'Beast',
        size: 'Tiny',
        ac: 10,
        hp: 2,
        speed: 4, // 20ft, climb 20ft
        stats: stats(2, 11, 10, 1, 8, 3),
        cr: 0,
        senses: 'Darkvision 30 ft., Passive Perception 9',
        aiBehavior: 'defensive',
        traits: [{ name: 'Spider Climb', desc: 'Climb difficult surfaces, ceilings.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 1 Piercing damage.', attackBonus: 2, damage: '1', damageType: 'piercing' }
        ]
    },
    {
        id: 'mammoth',
        name: 'Mammoth',
        type: 'Beast',
        size: 'Huge',
        ac: 13,
        hp: 126,
        speed: 10, // 50ft
        stats: stats(24, 9, 21, 3, 11, 6),
        cr: 6,
        senses: 'Passive Perception 10',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The mammoth makes two Gore attacks.', multiattackActions: ['Gore', 'Gore'] },
            { name: 'Gore', type: 'melee', desc: 'Melee Attack Roll: +10, reach 10 ft. Hit: 18 (2d10 + 7) Piercing damage. If Huge or smaller and moved 20+ ft straight toward, Prone.', attackBonus: 10, damage: '2d10+7', damageType: 'piercing', reach: 10 }
        ],
        bonusActions: [
            { name: 'Trample', type: 'save', desc: 'Dexterity Saving Throw: DC 18, one creature within 5 ft that is Prone. Failure: 29 (4d10 + 7) Bludgeoning damage. Success: Half damage.', saveDC: 18, saveAbility: 'DEX', damage: '4d10+7', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'mastiff',
        name: 'Mastiff',
        type: 'Beast',
        size: 'Medium',
        ac: 12,
        hp: 5,
        speed: 8, // 40ft
        stats: stats(13, 14, 12, 3, 12, 7),
        cr: 0.125,
        senses: 'Darkvision 60 ft., Passive Perception 15',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 4 (1d6 + 1) Piercing damage. If Medium or smaller, Prone.', attackBonus: 3, damage: '1d6+1', damageType: 'piercing' }
        ]
    },
    {
        id: 'mule',
        name: 'Mule',
        type: 'Beast',
        size: 'Medium',
        ac: 10,
        hp: 11,
        speed: 8, // 40ft
        stats: stats(14, 10, 13, 2, 10, 5),
        cr: 0.125,
        senses: 'Passive Perception 10',
        aiBehavior: 'defensive',
        traits: [{ name: 'Beast of Burden', desc: 'Counts as one size larger for carrying capacity.' }],
        actions: [
            { name: 'Hooves', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 4 (1d4 + 2) Bludgeoning damage.', attackBonus: 4, damage: '1d4+2', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'octopus',
        name: 'Octopus',
        type: 'Beast',
        size: 'Small',
        ac: 12,
        hp: 3,
        speed: 1, // 5ft, swim 30ft
        stats: stats(4, 15, 11, 3, 10, 4),
        cr: 0,
        senses: 'Darkvision 30 ft., Passive Perception 12',
        aiBehavior: 'defensive',
        traits: [{ name: 'Water Breathing', desc: 'Breathe only underwater. Hold breath 1 hour.' }],
        actions: [
            { name: 'Tentacles', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 1 Bludgeoning damage.', attackBonus: 4, damage: '1', damageType: 'bludgeoning' }
        ],
        reactions: [
            { name: 'Ink Cloud', type: 'ability', desc: '1/Day. Release ink cloud (5ft cube) when underwater. Heavily obscured.' }
        ]
    },
    {
        id: 'owl',
        name: 'Owl',
        type: 'Beast',
        size: 'Tiny',
        ac: 11,
        hp: 1,
        speed: 1, // 5ft, fly 60ft
        stats: stats(3, 13, 8, 2, 12, 7),
        cr: 0,
        senses: 'Darkvision 120 ft., Passive Perception 15',
        aiBehavior: 'defensive',
        traits: [{ name: 'Flyby', desc: 'No OA when flying out of reach.' }],
        actions: [
            { name: 'Talons', type: 'melee', desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 1 Slashing damage.', attackBonus: 3, damage: '1', damageType: 'slashing' }
        ]
    },
    {
        id: 'panther',
        name: 'Panther',
        type: 'Beast',
        size: 'Medium',
        ac: 13,
        hp: 13,
        speed: 10, // 50ft, climb 40ft
        stats: stats(14, 16, 10, 3, 14, 7),
        cr: 0.25,
        senses: 'Darkvision 60 ft., Passive Perception 14',
        aiBehavior: 'lurker',
        actions: [
            { name: 'Rend', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 6 (1d6 + 3) Slashing damage.', attackBonus: 5, damage: '1d6+3', damageType: 'slashing' }
        ],
        bonusActions: [
            { name: 'Nimble Escape', type: 'ability', desc: 'The panther takes the Disengage or Hide action.' }
        ]
    },
    {
        id: 'piranha',
        name: 'Piranha',
        type: 'Beast',
        size: 'Tiny',
        ac: 13,
        hp: 1,
        speed: 1, // 5ft, swim 40ft
        stats: stats(2, 16, 9, 1, 7, 2),
        cr: 0,
        senses: 'Darkvision 60 ft., Passive Perception 8',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Water Breathing', desc: 'Breathe only underwater.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +5 (Advantage if target not full HP), reach 5 ft. Hit: 1 Piercing damage.', attackBonus: 5, damage: '1', damageType: 'piercing' }
        ]
    },
    {
        id: 'plesiosaurus',
        name: 'Plesiosaurus',
        type: 'Beast',
        size: 'Large',
        ac: 13,
        hp: 68,
        speed: 4, // 20ft, swim 40ft
        stats: stats(18, 15, 16, 2, 12, 5),
        cr: 2,
        senses: 'Passive Perception 13',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Hold Breath', desc: 'Hold breath 1 hour.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +6, reach 10 ft. Hit: 11 (2d6 + 4) Piercing damage.', attackBonus: 6, damage: '2d6+4', damageType: 'piercing', reach: 10 }
        ]
    },
    {
        id: 'polar_bear',
        name: 'Polar Bear',
        type: 'Beast',
        size: 'Large',
        ac: 12,
        hp: 42,
        speed: 8, // 40ft, swim 40ft
        stats: stats(20, 14, 16, 2, 13, 7),
        cr: 2,
        resistances: ['cold'],
        senses: 'Darkvision 60 ft., Passive Perception 15',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The bear makes two Rend attacks.', multiattackActions: ['Rend', 'Rend'] },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack Roll: +7, reach 5 ft. Hit: 9 (1d8 + 5) Slashing damage.', attackBonus: 7, damage: '1d8+5', damageType: 'slashing' }
        ]
    },
    {
        id: 'pony',
        name: 'Pony',
        type: 'Beast',
        size: 'Medium',
        ac: 10,
        hp: 11,
        speed: 8, // 40ft
        stats: stats(15, 10, 13, 2, 11, 7),
        cr: 0.125,
        senses: 'Passive Perception 10',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Hooves', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 4 (1d4 + 2) Bludgeoning damage.', attackBonus: 4, damage: '1d4+2', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'pteranodon',
        name: 'Pteranodon',
        type: 'Beast',
        size: 'Medium',
        ac: 13,
        hp: 13,
        speed: 2, // 10ft, fly 60ft
        stats: stats(12, 15, 10, 2, 9, 5),
        cr: 0.25,
        senses: 'Passive Perception 11',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Flyby', desc: 'No OA when flying out of reach.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 6 (1d8 + 2) Piercing damage.', attackBonus: 4, damage: '1d8+2', damageType: 'piercing' }
        ]
    },
    {
        id: 'rat',
        name: 'Rat',
        type: 'Beast',
        size: 'Tiny',
        ac: 10,
        hp: 1,
        speed: 4, // 20ft, climb 20ft
        stats: stats(2, 11, 9, 2, 10, 4),
        cr: 0,
        senses: 'Darkvision 30 ft., Passive Perception 12',
        aiBehavior: 'defensive',
        traits: [{ name: 'Agile', desc: 'Doesn\'t provoke Opportunity Attacks when moving out of reach.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 1 Piercing damage.', attackBonus: 2, damage: '1', damageType: 'piercing' }
        ]
    },
    {
        id: 'raven',
        name: 'Raven',
        type: 'Beast',
        size: 'Tiny',
        ac: 12,
        hp: 2,
        speed: 2, // 10ft, fly 50ft
        stats: stats(2, 14, 10, 5, 13, 6),
        cr: 0,
        senses: 'Passive Perception 13',
        aiBehavior: 'defensive',
        traits: [{ name: 'Mimicry', desc: 'Mimic simple sounds. Insight DC 10 to discern.' }],
        actions: [
            { name: 'Beak', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 1 Piercing damage.', attackBonus: 4, damage: '1', damageType: 'piercing' }
        ]
    },
    {
        id: 'reef_shark',
        name: 'Reef Shark',
        type: 'Beast',
        size: 'Medium',
        ac: 12,
        hp: 22,
        speed: 1, // 5ft, swim 30ft
        stats: stats(14, 15, 13, 1, 10, 4),
        cr: 0.5,
        senses: 'Blindsight 30 ft., Passive Perception 12',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Pack Tactics', desc: 'Advantage on attack if ally is within 5 ft.' }, { name: 'Water Breathing', desc: 'Breathe only underwater.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 7 (2d4 + 2) Piercing damage.', attackBonus: 4, damage: '2d4+2', damageType: 'piercing' }
        ]
    },
    {
        id: 'rhinoceros',
        name: 'Rhinoceros',
        type: 'Beast',
        size: 'Large',
        ac: 13, 
        hp: 45,
        speed: 8, // 40ft
        stats: stats(21, 8, 15, 2, 12, 6),
        cr: 2,
        senses: 'Passive Perception 11',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Gore', type: 'melee', desc: 'Melee Attack Roll: +7, reach 5 ft. Hit: 14 (2d8 + 5) Piercing damage. If Large or smaller and moved 20+ ft straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.', attackBonus: 7, damage: '2d8+5', damageType: 'piercing' }
        ]
    },
    {
        id: 'riding_horse',
        name: 'Riding Horse',
        type: 'Beast',
        size: 'Large',
        ac: 11,
        hp: 13,
        speed: 12, // 60ft
        stats: stats(16, 13, 12, 2, 11, 7),
        cr: 0.25,
        senses: 'Passive Perception 10',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Hooves', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 7 (1d8 + 3) Bludgeoning damage.', attackBonus: 5, damage: '1d8+3', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'saber_toothed_tiger',
        name: 'Saber-Toothed Tiger',
        type: 'Beast',
        size: 'Large',
        ac: 13,
        hp: 52,
        speed: 8, // 40ft
        stats: stats(18, 17, 15, 3, 12, 8),
        cr: 2,
        senses: 'Darkvision 60 ft., Passive Perception 15',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Running Leap', desc: 'Long Jump 25 ft with 10 ft start.' }],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The tiger makes two Rend attacks.', multiattackActions: ['Rend', 'Rend'] },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 11 (2d6 + 4) Slashing damage.', attackBonus: 6, damage: '2d6+4', damageType: 'slashing' }
        ],
        bonusActions: [
            { name: 'Nimble Escape', type: 'ability', desc: 'The tiger takes the Disengage or Hide action.' }
        ]
    },
    {
        id: 'scorpion',
        name: 'Scorpion',
        type: 'Beast',
        size: 'Tiny',
        ac: 11,
        hp: 1,
        speed: 2, // 10ft
        stats: stats(2, 11, 8, 1, 8, 2),
        cr: 0,
        senses: 'Blindsight 10 ft., Passive Perception 9',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Sting', type: 'melee', desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 1 Piercing damage plus 3 (1d6) Poison damage.', attackBonus: 2, damage: '1d6+1', damageType: 'piercing' }
        ]
    },
    {
        id: 'seahorse',
        name: 'Seahorse',
        type: 'Beast',
        size: 'Tiny',
        ac: 12,
        hp: 1,
        speed: 1, // 5ft, swim 20ft
        stats: stats(1, 12, 8, 1, 10, 2),
        cr: 0,
        senses: 'Passive Perception 12',
        aiBehavior: 'defensive',
        traits: [{ name: 'Water Breathing', desc: 'Breathe only underwater.' }],
        actions: [
            { name: 'Bubble Dash', type: 'ability', desc: 'While underwater, move up to Swim Speed without provoking OAs.' }
        ]
    },
    {
        id: 'spider',
        name: 'Spider',
        type: 'Beast',
        size: 'Tiny',
        ac: 12,
        hp: 1,
        speed: 4, // 20ft, climb 20ft
        stats: stats(2, 14, 8, 1, 10, 2),
        cr: 0,
        senses: 'Darkvision 30 ft., Passive Perception 10',
        aiBehavior: 'defensive',
        traits: [
            { name: 'Spider Climb', desc: 'Climb walls/ceilings.' },
            { name: 'Web Walker', desc: 'Ignore webs.' }
        ],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 1 Piercing damage plus 2 (1d4) Poison damage.', attackBonus: 4, damage: '1d4+1', damageType: 'piercing' }
        ]
    },
    {
        id: 'swarm_of_bats',
        name: 'Swarm of Bats',
        type: 'Beast',
        size: 'Large', // Swarm of Tiny
        ac: 12,
        hp: 11,
        speed: 1, // 5ft, fly 30ft
        stats: stats(5, 15, 10, 2, 12, 4),
        cr: 0.25,
        resistances: ['bludgeoning, piercing, slashing'],
        conditionImmunities: ['charmed', 'frightened', 'grappled', 'paralyzed', 'petrified', 'prone', 'restrained', 'stunned'],
        senses: 'Blindsight 60 ft., Passive Perception 11',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Swarm', desc: 'Can occupy another creature\'s space. Can move through tiny opening.' }],
        actions: [
            { name: 'Bites', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (2d4) Piercing damage, or 2 (1d4) if Bloodied.', attackBonus: 4, damage: '2d4', damageType: 'piercing' }
        ]
    },
    {
        id: 'swarm_of_insects',
        name: 'Swarm of Insects',
        type: 'Beast',
        size: 'Medium', // Swarm of Tiny
        ac: 11,
        hp: 19,
        speed: 4, // 20ft, climb/fly 20ft
        stats: stats(3, 13, 14, 1, 7, 1),
        cr: 0.5,
        resistances: ['bludgeoning, piercing, slashing'],
        conditionImmunities: ['charmed', 'frightened', 'grappled', 'paralyzed', 'petrified', 'prone', 'restrained', 'stunned'],
        senses: 'Blindsight 30 ft., Passive Perception 8',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Spider Climb', desc: 'If climb speed, climb walls/ceilings.' },
            { name: 'Swarm', desc: 'Can occupy another creature\'s space.' }
        ],
        actions: [
            { name: 'Bites', type: 'melee', desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 6 (2d4 + 1) Poison damage, or 3 (1d4 + 1) if Bloodied.', attackBonus: 3, damage: '2d4+1', damageType: 'poison' }
        ]
    },
    {
        id: 'swarm_of_piranhas',
        name: 'Swarm of Piranhas',
        type: 'Beast',
        size: 'Medium', // Swarm of Tiny
        ac: 13,
        hp: 28,
        speed: 1, // 5ft, swim 40ft
        stats: stats(13, 16, 9, 1, 7, 2),
        cr: 1,
        resistances: ['bludgeoning, piercing, slashing'],
        conditionImmunities: ['charmed', 'frightened', 'grappled', 'paralyzed', 'petrified', 'prone', 'restrained', 'stunned'],
        senses: 'Darkvision 60 ft., Passive Perception 8',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Swarm', desc: 'Can occupy another creature\'s space.' },
            { name: 'Water Breathing', desc: 'Breathe only underwater.' }
        ],
        actions: [
            { name: 'Bites', type: 'melee', desc: 'Melee Attack Roll: +5 (Advantage if target not full HP), reach 5 ft. Hit: 8 (2d4 + 3) Piercing damage, or 5 (1d4 + 3) if Bloodied.', attackBonus: 5, damage: '2d4+3', damageType: 'piercing' }
        ]
    },
    {
        id: 'swarm_of_rats',
        name: 'Swarm of Rats',
        type: 'Beast',
        size: 'Medium', // Swarm of Tiny
        ac: 10,
        hp: 14,
        speed: 6, // 30ft, climb 30ft
        stats: stats(9, 11, 9, 2, 10, 3),
        cr: 0.25,
        resistances: ['bludgeoning, piercing, slashing'],
        conditionImmunities: ['charmed', 'frightened', 'grappled', 'paralyzed', 'petrified', 'prone', 'restrained', 'stunned'],
        senses: 'Darkvision 30 ft., Passive Perception 10',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Swarm', desc: 'Can occupy another creature\'s space.' }],
        actions: [
            { name: 'Bites', type: 'melee', desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 5 (2d4) Piercing damage, or 2 (1d4) if Bloodied.', attackBonus: 2, damage: '2d4', damageType: 'piercing' }
        ]
    },
    {
        id: 'swarm_of_ravens',
        name: 'Swarm of Ravens',
        type: 'Beast',
        size: 'Medium', // Swarm of Tiny
        ac: 12,
        hp: 11,
        speed: 2, // 10ft, fly 50ft
        stats: stats(6, 14, 12, 5, 12, 6),
        cr: 0.25,
        resistances: ['bludgeoning, piercing, slashing'],
        conditionImmunities: ['charmed', 'frightened', 'grappled', 'paralyzed', 'petrified', 'prone', 'restrained', 'stunned'],
        senses: 'Passive Perception 15',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Swarm', desc: 'Can occupy another creature\'s space.' }],
        actions: [
            { name: 'Beaks', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage, or 2 (1d4) if Bloodied.', attackBonus: 4, damage: '1d6+2', damageType: 'piercing' },
            { name: 'Cacophony', type: 'save', desc: 'Recharge 6. Wisdom Saving Throw: DC 10, one creature in space. Failure: Deafened until start of swarm\'s next turn. Disadvantage on checks/attacks while deafened.', saveDC: 10, saveAbility: 'WIS', damage: '0' }
        ]
    },
    {
        id: 'swarm_of_venomous_snakes',
        name: 'Swarm of Venomous Snakes',
        type: 'Beast',
        size: 'Medium', // Swarm of Tiny
        ac: 14,
        hp: 36,
        speed: 6, // 30ft, swim 30ft
        stats: stats(8, 18, 11, 1, 10, 3),
        cr: 2,
        resistances: ['bludgeoning, piercing, slashing'],
        conditionImmunities: ['charmed', 'frightened', 'grappled', 'paralyzed', 'petrified', 'prone', 'restrained', 'stunned'],
        senses: 'Blindsight 10 ft., Passive Perception 10',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Swarm', desc: 'Can occupy another creature\'s space.' }],
        actions: [
            { name: 'Bites', type: 'melee', desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 8 (1d8 + 4) Piercing damage—or 6 (1d4 + 4) Piercing damage if the swarm is Bloodied—plus 10 (3d6) Poison damage.', attackBonus: 6, damage: '1d8+4+3d6', damageType: 'piercing' }
        ]
    },
    {
        id: 'tiger',
        name: 'Tiger',
        type: 'Beast',
        size: 'Large',
        ac: 13,
        hp: 30,
        speed: 8, // 40ft
        stats: stats(17, 16, 14, 3, 12, 8),
        cr: 1,
        senses: 'Darkvision 60 ft., Passive Perception 13',
        aiBehavior: 'lurker',
        actions: [
            { name: 'Rend', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage. If Large or smaller, Prone.', attackBonus: 5, damage: '2d6+3', damageType: 'slashing' }
        ],
        bonusActions: [
            { name: 'Nimble Escape', type: 'ability', desc: 'Disengage or Hide.' }
        ]
    },
    {
        id: 'triceratops',
        name: 'Triceratops',
        type: 'Beast',
        size: 'Huge',
        ac: 14,
        hp: 114,
        speed: 10, // 50ft
        stats: stats(22, 9, 17, 2, 11, 5),
        cr: 5,
        senses: 'Passive Perception 10',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The triceratops makes two Gore attacks.', multiattackActions: ['Gore', 'Gore'] },
            { name: 'Gore', type: 'melee', desc: 'Melee Attack Roll: +9, reach 5 ft. Hit: 19 (2d12 + 6) Piercing damage. If Huge or smaller and moved 20+ ft straight toward, +9 (2d8) Piercing and Prone.', attackBonus: 9, damage: '2d12+6', damageType: 'piercing' }
        ]
    },
    {
        id: 'tyrannosaurus_rex',
        name: 'Tyrannosaurus Rex',
        type: 'Beast',
        size: 'Huge',
        ac: 13,
        hp: 136,
        speed: 10, // 50ft
        stats: stats(25, 10, 19, 2, 12, 9),
        cr: 8,
        senses: 'Passive Perception 14',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'The tyrannosaurus makes one Bite attack and one Tail attack.', multiattackActions: ['Bite', 'Tail'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +10, reach 10 ft. Hit: 33 (4d12 + 7) Piercing damage. If Large or smaller, Grappled (escape DC 17). Restrained while grappled.', attackBonus: 10, damage: '4d12+7', damageType: 'piercing', reach: 10 },
            { name: 'Tail', type: 'melee', desc: 'Melee Attack Roll: +10, reach 15 ft. Hit: 25 (4d8 + 7) Bludgeoning damage. If Huge or smaller, Prone.', attackBonus: 10, damage: '4d8+7', damageType: 'bludgeoning', reach: 15 }
        ]
    },
    {
        id: 'venomous_snake',
        name: 'Venomous Snake',
        type: 'Beast',
        size: 'Tiny',
        ac: 12,
        hp: 5, // PDF says 5 (2d4) - usually snakes are weak
        speed: 6, // 30ft, swim 30ft
        stats: stats(2, 15, 11, 1, 10, 3),
        cr: 0.125,
        senses: 'Blindsight 10 ft., Passive Perception 10',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 4 (1d4 + 2) Piercing damage plus 3 (1d6) Poison damage.', attackBonus: 4, damage: '1d4+2+1d6', damageType: 'piercing' }
        ]
    },
    {
        id: 'vulture',
        name: 'Vulture',
        type: 'Beast',
        size: 'Medium',
        ac: 10,
        hp: 5,
        speed: 2, // 10ft, fly 50ft
        stats: stats(7, 10, 13, 2, 12, 4),
        cr: 0,
        senses: 'Passive Perception 13',
        aiBehavior: 'defensive',
        traits: [{ name: 'Pack Tactics', desc: 'Advantage on attack if ally is within 5 ft.' }],
        actions: [
            { name: 'Beak', type: 'melee', desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 2 (1d4) Piercing damage.', attackBonus: 2, damage: '1d4', damageType: 'piercing' }
        ]
    },
    {
        id: 'warhorse',
        name: 'Warhorse',
        type: 'Beast',
        size: 'Large',
        ac: 11,
        hp: 19,
        speed: 12, // 60ft
        stats: stats(18, 12, 13, 2, 12, 7),
        cr: 0.5,
        senses: 'Passive Perception 11',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Hooves', type: 'melee', desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 9 (2d4 + 4) Bludgeoning damage. If Large or smaller and moved 20+ ft straight toward, +5 (2d4) Bludgeoning and Prone.', attackBonus: 6, damage: '2d4+4', damageType: 'bludgeoning' }
        ]
    },
    {
        id: 'weasel',
        name: 'Weasel',
        type: 'Beast',
        size: 'Tiny',
        ac: 13,
        hp: 1,
        speed: 6, // 30ft, climb 30ft
        stats: stats(3, 16, 8, 2, 12, 3),
        cr: 0,
        senses: 'Darkvision 60 ft., Passive Perception 13',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 5 (1d4 + 3) Piercing damage.', attackBonus: 5, damage: '1d4+3', damageType: 'piercing' }
        ]
    },
    {
        id: 'wolf',
        name: 'Wolf',
        type: 'Beast',
        size: 'Medium',
        ac: 12,
        hp: 11, 
        speed: 8, // 40ft
        stats: stats(14, 15, 12, 3, 12, 6),
        cr: 0.25,
        senses: 'Darkvision 60 ft., Passive Perception 15',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Pack Tactics', desc: 'Advantage on attack if ally is within 5 ft.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage. If Medium or smaller, Prone.', attackBonus: 4, damage: '1d6+2', damageType: 'piercing' }
        ]
    },
    {
        id: 'worg',
        name: 'Worg',
        type: 'Beast', // Worgs are often classed as monstrosities or beasts in different contexts, SRD 5.1 lists Worg as Monstrosity. Correcting type to Monstrosity based on SRD standard if strict. But here user has them in BEASTS file. I will keep as Beast for file consistency or move if needed. Worg is usually Monstrosity. I will change type to Monstrosity to be accurate but keep in this file as "beast-like".
        size: 'Large',
        ac: 13,
        hp: 26, // 4d10+4
        speed: 10, // 50ft
        stats: stats(16, 13, 13, 7, 11, 8),
        cr: 0.5,
        senses: 'Darkvision 60 ft., Passive Perception 14',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage. If Medium or smaller, Prone.', attackBonus: 5, damage: '1d8+3', damageType: 'piercing' }
        ]
    }
];

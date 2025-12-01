
import { MonsterData } from '../../types';
import { stats } from './utils';

export const DRAGONS: MonsterData[] = [
    // --- BLACK DRAGONS ---
    {
        id: 'black_dragon_wyrmling',
        name: 'Black Dragon Wyrmling',
        type: 'Dragon',
        size: 'Medium',
        ac: 17,
        hp: 33, // 6d8 + 6
        speed: 6, // 30ft, fly 60ft, swim 30ft
        stats: stats(15, 14, 13, 10, 11, 13),
        cr: 2,
        immunities: ['acid'],
        senses: 'Blindsight 10ft, Darkvision 60ft',
        languages: 'Draconic',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Amphibious', desc: 'The dragon can breathe air and water.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes two Rend attacks.',
                multiattackActions: ['Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +4 to hit, reach 5 ft. Hit: 5 (1d6 + 2) slashing damage plus 2 (1d4) acid damage.', attackBonus: 4, damage: '1d6+2+1d4', damageType: 'slashing', reach: 5 },
            { name: 'Acid Breath', type: 'save', desc: 'Recharge 5-6. 15ft Line (5ft wide). DC 11 Dex save. 22 (5d8) Acid damage. Success: Half.', damage: '5d8', damageType: 'acid', saveDC: 11, saveAbility: 'DEX', range: 15 }
        ]
    },
    {
        id: 'young_black_dragon',
        name: 'Young Black Dragon',
        type: 'Dragon',
        size: 'Large',
        ac: 18,
        hp: 127, // 15d10 + 45
        speed: 8, // 40ft, fly 80ft, swim 40ft
        stats: stats(19, 14, 17, 12, 11, 15),
        cr: 7,
        immunities: ['acid'],
        senses: 'Blindsight 30ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Amphibious', desc: 'The dragon can breathe air and water.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +7 to hit, reach 10 ft. Hit: 9 (2d4 + 4) slashing damage plus 3 (1d6) acid damage.', attackBonus: 7, damage: '2d4+4+1d6', damageType: 'slashing', reach: 10 },
            { name: 'Acid Breath', type: 'save', desc: 'Recharge 5-6. 30ft Line (5ft wide). DC 14 Dex save. 49 (11d8) Acid damage. Success: Half.', damage: '11d8', damageType: 'acid', saveDC: 14, saveAbility: 'DEX', range: 30 }
        ]
    },
    {
        id: 'adult_black_dragon',
        name: 'Adult Black Dragon',
        type: 'Dragon',
        size: 'Huge',
        ac: 19,
        hp: 195, // 17d12 + 85
        speed: 8, // 40ft, fly 80ft, swim 40ft
        stats: stats(23, 14, 21, 14, 13, 19),
        cr: 14,
        immunities: ['acid'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Amphibious', desc: 'The dragon can breathe air and water.' },
            { name: 'Legendary Resistance (3/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Acid Arrow (level 3 version).',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +11 to hit, reach 10 ft. Hit: 13 (2d6 + 6) slashing damage plus 4 (1d8) acid damage.', attackBonus: 11, damage: '2d6+6+1d8', damageType: 'slashing', reach: 10 },
            { name: 'Acid Breath', type: 'save', desc: 'Recharge 5-6. 60ft Line (5ft wide). DC 18 Dex save. 54 (12d8) Acid damage. Success: Half.', damage: '12d8', damageType: 'acid', saveDC: 18, saveAbility: 'DEX', range: 60 }
        ],
        spellcasting: {
            class: 'Innate',
            level: 13,
            ability: 'cha',
            spells: ['Acid Arrow', 'Detect Magic', 'Fear', 'Speak with Dead', 'Vitriolic Sphere']
        },
        legendaryActions: [
            { name: 'Cloud of Insects', type: 'save', desc: 'Dexterity Saving Throw: DC 17, one creature within 120 feet. Failure: 22 (4d10) Poison damage, and Disadvantage on saves to maintain Concentration until end of next turn.', saveDC: 17, saveAbility: 'DEX', damage: '4d10' },
            { name: 'Frightful Presence', type: 'ability', desc: 'The dragon uses Spellcasting to cast Fear.' },
            { name: 'Pounce', type: 'ability', desc: 'The dragon moves up to half its Speed, and it makes one Rend attack.' }
        ]
    },
    {
        id: 'ancient_black_dragon',
        name: 'Ancient Black Dragon',
        type: 'Dragon',
        size: 'Gargantuan',
        ac: 22,
        hp: 367, // 21d20 + 147
        speed: 8, // 40ft, fly 80ft, swim 40ft
        stats: stats(27, 14, 25, 16, 15, 22),
        cr: 21,
        immunities: ['acid'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Amphibious', desc: 'The dragon can breathe air and water.' },
            { name: 'Legendary Resistance (4/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Acid Arrow (level 4 version).',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +15 to hit, reach 15 ft. Hit: 17 (2d8 + 8) slashing damage plus 9 (2d8) acid damage.', attackBonus: 15, damage: '2d8+8+2d8', damageType: 'slashing', reach: 15 },
            { name: 'Acid Breath', type: 'save', desc: 'Recharge 5-6. 90ft Line (10ft wide). DC 22 Dex save. 67 (15d8) Acid damage. Success: Half.', damage: '15d8', damageType: 'acid', saveDC: 22, saveAbility: 'DEX', range: 90 }
        ],
        spellcasting: {
            class: 'Innate',
            level: 17,
            ability: 'cha',
            spells: ['Acid Arrow', 'Detect Magic', 'Fear', 'Create Undead', 'Speak with Dead', 'Vitriolic Sphere']
        },
        legendaryActions: [
            { name: 'Cloud of Insects', type: 'save', desc: 'Dexterity Saving Throw: DC 21, one creature within 120 feet. Failure: 33 (6d10) Poison damage, and Disadvantage on saves to maintain Concentration until end of next turn.', saveDC: 21, saveAbility: 'DEX', damage: '6d10' },
            { name: 'Frightful Presence', type: 'ability', desc: 'The dragon uses Spellcasting to cast Fear.' },
            { name: 'Pounce', type: 'ability', desc: 'The dragon moves up to half its Speed, and it makes one Rend attack.' }
        ]
    },

    // --- BLUE DRAGONS ---
    {
        id: 'blue_dragon_wyrmling',
        name: 'Blue Dragon Wyrmling',
        type: 'Dragon',
        size: 'Medium',
        ac: 17,
        hp: 65, // 10d8 + 20
        speed: 6, // 30ft, burrow 15ft, fly 60ft
        stats: stats(17, 10, 15, 12, 11, 15),
        cr: 3,
        immunities: ['lightning'],
        senses: 'Blindsight 10ft, Darkvision 60ft',
        languages: 'Draconic',
        aiBehavior: 'aggressive',
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes two Rend attacks.',
                multiattackActions: ['Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +5 to hit, reach 5 ft. Hit: 8 (1d10 + 3) slashing damage plus 3 (1d6) lightning damage.', attackBonus: 5, damage: '1d10+3+1d6', damageType: 'slashing', reach: 5 },
            { name: 'Lightning Breath', type: 'save', desc: 'Recharge 5-6. 30ft Line (5ft wide). DC 12 Dex save. 22 (5d8) Lightning damage. Success: Half.', damage: '5d8', damageType: 'lightning', saveDC: 12, saveAbility: 'DEX', range: 30 }
        ]
    },
    {
        id: 'young_blue_dragon',
        name: 'Young Blue Dragon',
        type: 'Dragon',
        size: 'Large',
        ac: 18,
        hp: 152, // 16d10 + 64
        speed: 8, // 40ft, burrow 20ft, fly 80ft
        stats: stats(21, 10, 19, 14, 13, 17),
        cr: 9,
        immunities: ['lightning'],
        senses: 'Blindsight 30ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'aggressive',
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +9 to hit, reach 10 ft. Hit: 12 (2d6 + 5) slashing damage plus 5 (1d10) lightning damage.', attackBonus: 9, damage: '2d6+5+1d10', damageType: 'slashing', reach: 10 },
            { name: 'Lightning Breath', type: 'save', desc: 'Recharge 5-6. 60ft Line (5ft wide). DC 16 Dex save. 55 (10d10) Lightning damage. Success: Half.', damage: '10d10', damageType: 'lightning', saveDC: 16, saveAbility: 'DEX', range: 60 }
        ]
    },
    {
        id: 'adult_blue_dragon',
        name: 'Adult Blue Dragon',
        type: 'Dragon',
        size: 'Huge',
        ac: 19,
        hp: 212, // 17d12 + 102
        speed: 8, // 40ft, burrow 30ft, fly 80ft
        stats: stats(25, 10, 23, 16, 15, 20),
        cr: 16,
        immunities: ['lightning'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Legendary Resistance (3/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Shatter.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +12 to hit, reach 10 ft. Hit: 16 (2d8 + 7) slashing damage plus 5 (1d10) lightning damage.', attackBonus: 12, damage: '2d8+7+1d10', damageType: 'slashing', reach: 10 },
            { name: 'Lightning Breath', type: 'save', desc: 'Recharge 5-6. 90ft Line (5ft wide). DC 19 Dex save. 60 (11d10) Lightning damage. Success: Half.', damage: '11d10', damageType: 'lightning', saveDC: 19, saveAbility: 'DEX', range: 90 }
        ],
        spellcasting: {
            class: 'Innate',
            level: 15,
            ability: 'cha',
            spells: ['Detect Magic', 'Invisibility', 'Mage Hand', 'Shatter', 'Scrying', 'Sending']
        },
        legendaryActions: [
            { name: 'Cloaked Flight', type: 'ability', desc: 'The dragon uses Spellcasting to cast Invisibility on itself, and it can fly up to half its Fly Speed. Cannot use again until next turn.' },
            { name: 'Sonic Boom', type: 'ability', desc: 'The dragon uses Spellcasting to cast Shatter. Cannot use again until next turn.' },
            { name: 'Tail Swipe', type: 'melee', desc: 'The dragon makes one Rend attack.', attackBonus: 12, damage: '2d8+7+1d10', damageType: 'slashing', reach: 10 }
        ]
    },
    {
        id: 'ancient_blue_dragon',
        name: 'Ancient Blue Dragon',
        type: 'Dragon',
        size: 'Gargantuan',
        ac: 22,
        hp: 481, // 26d20 + 208
        speed: 8, // 40ft, burrow 40ft, fly 80ft
        stats: stats(29, 10, 27, 18, 17, 25),
        cr: 23,
        immunities: ['lightning'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Legendary Resistance (4/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Shatter (level 3 version).',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +16 to hit, reach 15 ft. Hit: 18 (2d8 + 9) slashing damage plus 11 (2d10) lightning damage.', attackBonus: 16, damage: '2d8+9+2d10', damageType: 'slashing', reach: 15 },
            { name: 'Lightning Breath', type: 'save', desc: 'Recharge 5-6. 120ft Line (10ft wide). DC 23 Dex save. 88 (16d10) Lightning damage. Success: Half.', damage: '16d10', damageType: 'lightning', saveDC: 23, saveAbility: 'DEX', range: 120 }
        ],
        spellcasting: {
            class: 'Innate',
            level: 19,
            ability: 'cha',
            spells: ['Detect Magic', 'Invisibility', 'Mage Hand', 'Shatter', 'Scrying', 'Sending']
        },
        legendaryActions: [
            { name: 'Cloaked Flight', type: 'ability', desc: 'The dragon uses Spellcasting to cast Invisibility on itself, and it can fly up to half its Fly Speed.' },
            { name: 'Sonic Boom', type: 'ability', desc: 'The dragon uses Spellcasting to cast Shatter (level 3 version).' },
            { name: 'Tail Swipe', type: 'melee', desc: 'The dragon makes one Rend attack.', attackBonus: 16, damage: '2d8+9+2d10', damageType: 'slashing', reach: 15 }
        ]
    },

    // --- GREEN DRAGONS ---
    {
        id: 'green_dragon_wyrmling',
        name: 'Green Dragon Wyrmling',
        type: 'Dragon',
        size: 'Medium',
        ac: 17,
        hp: 38, // 7d8 + 7
        speed: 6, // 30ft, fly 60ft, swim 30ft
        stats: stats(15, 12, 13, 14, 11, 13),
        cr: 2,
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Blindsight 10ft, Darkvision 60ft',
        languages: 'Draconic',
        aiBehavior: 'lurker',
        traits: [{ name: 'Amphibious', desc: 'The dragon can breathe air and water.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes two Rend attacks.',
                multiattackActions: ['Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +4 to hit, reach 5 ft. Hit: 7 (1d10 + 2) slashing damage plus 3 (1d6) poison damage.', attackBonus: 4, damage: '1d10+2+1d6', damageType: 'slashing', reach: 5 },
            { name: 'Poison Breath', type: 'save', desc: 'Recharge 5-6. 15ft Cone. DC 11 Con save. 21 (6d6) Poison damage. Success: Half.', damage: '6d6', damageType: 'poison', saveDC: 11, saveAbility: 'CON', range: 15 }
        ]
    },
    {
        id: 'young_green_dragon',
        name: 'Young Green Dragon',
        type: 'Dragon',
        size: 'Large',
        ac: 18,
        hp: 136, // 16d10 + 48
        speed: 8, // 40ft, fly 80ft, swim 40ft
        stats: stats(19, 12, 17, 16, 13, 15),
        cr: 8,
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Blindsight 30ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'lurker',
        traits: [{ name: 'Amphibious', desc: 'The dragon can breathe air and water.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +7 to hit, reach 10 ft. Hit: 11 (2d6 + 4) slashing damage plus 7 (2d6) poison damage.', attackBonus: 7, damage: '2d6+4+2d6', damageType: 'slashing', reach: 10 },
            { name: 'Poison Breath', type: 'save', desc: 'Recharge 5-6. 30ft Cone. DC 14 Con save. 42 (12d6) Poison damage. Success: Half.', damage: '12d6', damageType: 'poison', saveDC: 14, saveAbility: 'CON', range: 30 }
        ]
    },
    {
        id: 'adult_green_dragon',
        name: 'Adult Green Dragon',
        type: 'Dragon',
        size: 'Huge',
        ac: 19,
        hp: 207, // 18d12 + 90
        speed: 8, // 40ft, fly 80ft, swim 40ft
        stats: stats(23, 12, 21, 18, 15, 18),
        cr: 15,
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'caster',
        traits: [
            { name: 'Amphibious', desc: 'The dragon can breathe air and water.' },
            { name: 'Legendary Resistance (3/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Mind Spike (level 3 version).',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +11 to hit, reach 10 ft. Hit: 15 (2d8 + 6) slashing damage plus 7 (2d6) poison damage.', attackBonus: 11, damage: '2d8+6+2d6', damageType: 'slashing', reach: 10 },
            { name: 'Poison Breath', type: 'save', desc: 'Recharge 5-6. 60ft Cone. DC 18 Con save. 56 (16d6) Poison damage. Success: Half.', damage: '16d6', damageType: 'poison', saveDC: 18, saveAbility: 'CON', range: 60 }
        ],
        spellcasting: {
            class: 'Innate',
            level: 14,
            ability: 'cha',
            spells: ['Detect Magic', 'Mind Spike', 'Geas']
        },
        legendaryActions: [
            { name: 'Mind Invasion', type: 'ability', desc: 'The dragon uses Spellcasting to cast Mind Spike (level 3 version).' },
            { name: 'Noxious Miasma', type: 'save', desc: 'Constitution Saving Throw: DC 17, each creature in a 20-foot-radius Sphere centered on a point within 90 feet. Failure: 7 (2d6) Poison damage, and target takes -2 penalty to AC until end of its next turn. Failure or Success: Cannot use again until start of next turn.', saveDC: 17, saveAbility: 'CON', damage: '2d6' },
            { name: 'Pounce', type: 'ability', desc: 'The dragon moves up to half its Speed, and it makes one Rend attack.' }
        ]
    },
    {
        id: 'ancient_green_dragon',
        name: 'Ancient Green Dragon',
        type: 'Dragon',
        size: 'Gargantuan',
        ac: 21,
        hp: 402, // 23d20 + 161
        speed: 8, // 40ft, fly 80ft, swim 40ft
        stats: stats(27, 12, 25, 20, 17, 22),
        cr: 22,
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'caster',
        traits: [
            { name: 'Amphibious', desc: 'The dragon can breathe air and water.' },
            { name: 'Legendary Resistance (4/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Mind Spike (level 5 version).',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +15 to hit, reach 15 ft. Hit: 17 (2d8 + 8) slashing damage plus 10 (3d6) poison damage.', attackBonus: 15, damage: '2d8+8+3d6', damageType: 'slashing', reach: 15 },
            { name: 'Poison Breath', type: 'save', desc: 'Recharge 5-6. 90ft Cone. DC 22 Con save. 77 (22d6) Poison damage. Success: Half.', damage: '22d6', damageType: 'poison', saveDC: 22, saveAbility: 'CON', range: 90 }
        ],
        spellcasting: {
            class: 'Innate',
            level: 18,
            ability: 'cha',
            spells: ['Detect Magic', 'Mind Spike', 'Geas', 'Modify Memory']
        },
        legendaryActions: [
            { name: 'Mind Invasion', type: 'ability', desc: 'The dragon uses Spellcasting to cast Mind Spike (level 5 version).' },
            { name: 'Noxious Miasma', type: 'save', desc: 'Constitution Saving Throw: DC 21, each creature in a 30-foot-radius Sphere centered on a point within 90 feet. Failure: 17 (5d6) Poison damage, and target takes -2 penalty to AC until end of its next turn.', saveDC: 21, saveAbility: 'CON', damage: '5d6' },
            { name: 'Pounce', type: 'ability', desc: 'The dragon moves up to half its Speed, and it makes one Rend attack.' }
        ]
    },

    // --- RED DRAGONS ---
    {
        id: 'red_dragon_wyrmling',
        name: 'Red Dragon Wyrmling',
        type: 'Dragon',
        size: 'Medium',
        ac: 17,
        hp: 75, // 10d8 + 30
        speed: 6, // 30ft, climb 30ft, fly 60ft
        stats: stats(19, 10, 17, 12, 11, 15),
        cr: 4,
        immunities: ['fire'],
        senses: 'Blindsight 10ft, Darkvision 60ft',
        languages: 'Draconic',
        aiBehavior: 'aggressive',
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes two Rend attacks.',
                multiattackActions: ['Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +6 to hit, reach 5 ft. Hit: 9 (1d10 + 4) slashing damage plus 3 (1d6) fire damage.', attackBonus: 6, damage: '1d10+4+1d6', damageType: 'slashing', reach: 5 },
            { name: 'Fire Breath', type: 'save', desc: 'Recharge 5-6. 15ft Cone. DC 13 Dex save. 24 (7d6) Fire damage. Success: Half.', damage: '7d6', damageType: 'fire', saveDC: 13, saveAbility: 'DEX', range: 15 }
        ]
    },
    {
        id: 'young_red_dragon',
        name: 'Young Red Dragon',
        type: 'Dragon',
        size: 'Large',
        ac: 18,
        hp: 178, // 17d10 + 85
        speed: 8, // 40ft, climb 40ft, fly 80ft
        stats: stats(23, 10, 21, 14, 11, 19),
        cr: 10,
        immunities: ['fire'],
        senses: 'Blindsight 30ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'aggressive',
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +10 to hit, reach 10 ft. Hit: 13 (2d6 + 6) slashing damage plus 3 (1d6) fire damage.', attackBonus: 10, damage: '2d6+6+1d6', damageType: 'slashing', reach: 10 },
            { name: 'Fire Breath', type: 'save', desc: 'Recharge 5-6. 30ft Cone. DC 17 Dex save. 56 (16d6) Fire damage. Success: Half.', damage: '16d6', damageType: 'fire', saveDC: 17, saveAbility: 'DEX', range: 30 }
        ]
    },
    {
        id: 'adult_red_dragon',
        name: 'Adult Red Dragon',
        type: 'Dragon',
        size: 'Huge',
        ac: 19,
        hp: 256, // 19d12 + 133
        speed: 8, // 40ft, climb 40ft, fly 80ft
        stats: stats(27, 10, 25, 16, 13, 23),
        cr: 17,
        immunities: ['fire'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Legendary Resistance (3/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +14 to hit, reach 10 ft. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage.', attackBonus: 14, damage: '1d10+8+2d4', damageType: 'slashing', reach: 10 },
            { name: 'Fire Breath', type: 'save', desc: 'Recharge 5-6. 60ft Cone. DC 21 Dex save. 63 (18d6) Fire damage. Success: Half.', damage: '18d6', damageType: 'fire', saveDC: 21, saveAbility: 'DEX', range: 60 }
        ],
        spellcasting: {
            class: 'Innate',
            level: 16,
            ability: 'cha',
            spells: ['Command', 'Detect Magic', 'Scorching Ray', 'Fireball']
        },
        legendaryActions: [
            { name: 'Commanding Presence', type: 'ability', desc: 'The dragon uses Spellcasting to cast Command (level 2 version).' },
            { name: 'Fiery Rays', type: 'ability', desc: 'The dragon uses Spellcasting to cast Scorching Ray.' },
            { name: 'Pounce', type: 'ability', desc: 'The dragon moves up to half its Speed, and it makes one Rend attack.' }
        ]
    },
    {
        id: 'ancient_red_dragon',
        name: 'Ancient Red Dragon',
        type: 'Dragon',
        size: 'Gargantuan',
        ac: 22,
        hp: 507, // 26d20 + 234
        speed: 8, // 40ft, climb 40ft, fly 80ft
        stats: stats(30, 10, 29, 18, 15, 27),
        cr: 24,
        immunities: ['fire'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Legendary Resistance (4/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray (level 3 version).',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +17 to hit, reach 15 ft. Hit: 19 (2d8 + 10) slashing damage plus 10 (3d6) fire damage.', attackBonus: 17, damage: '2d8+10+3d6', damageType: 'slashing', reach: 15 },
            { name: 'Fire Breath', type: 'save', desc: 'Recharge 5-6. 90ft Cone. DC 24 Dex save. 91 (26d6) Fire damage. Success: Half.', damage: '26d6', damageType: 'fire', saveDC: 24, saveAbility: 'DEX', range: 90 }
        ],
        spellcasting: {
            class: 'Innate',
            level: 19,
            ability: 'cha',
            spells: ['Command', 'Detect Magic', 'Scorching Ray', 'Fireball', 'Scrying']
        },
        legendaryActions: [
            { name: 'Commanding Presence', type: 'ability', desc: 'The dragon uses Spellcasting to cast Command (level 2 version).' },
            { name: 'Fiery Rays', type: 'ability', desc: 'The dragon uses Spellcasting to cast Scorching Ray (level 3 version).' },
            { name: 'Pounce', type: 'ability', desc: 'The dragon moves up to half its Speed, and it makes one Rend attack.' }
        ]
    },

    // --- WHITE DRAGONS ---
    {
        id: 'white_dragon_wyrmling',
        name: 'White Dragon Wyrmling',
        type: 'Dragon',
        size: 'Medium',
        ac: 16,
        hp: 32, // 5d8 + 10
        speed: 6, // 30ft, burrow 15ft, fly 60ft, swim 30ft
        stats: stats(14, 10, 14, 5, 10, 11),
        cr: 2,
        immunities: ['cold'],
        senses: 'Blindsight 10ft, Darkvision 60ft',
        languages: 'Draconic',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Ice Walk', desc: 'Can move across and climb icy surfaces without ability check. Difficult terrain of ice/snow costs no extra movement.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes two Rend attacks.',
                multiattackActions: ['Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +4 to hit, reach 5 ft. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) cold damage.', attackBonus: 4, damage: '1d8+2+1d4', damageType: 'slashing', reach: 5 },
            { name: 'Cold Breath', type: 'save', desc: 'Recharge 5-6. 15ft Cone. DC 12 Con save. 22 (5d8) Cold damage. Success: Half.', damage: '5d8', damageType: 'cold', saveDC: 12, saveAbility: 'CON', range: 15 }
        ]
    },
    {
        id: 'young_white_dragon',
        name: 'Young White Dragon',
        type: 'Dragon',
        size: 'Large',
        ac: 17,
        hp: 123, // 13d10 + 52
        speed: 8, // 40ft, burrow 20ft, fly 80ft, swim 40ft
        stats: stats(18, 10, 18, 6, 11, 12),
        cr: 6,
        immunities: ['cold'],
        senses: 'Blindsight 30ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Ice Walk', desc: 'Can move across and climb icy surfaces without ability check.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +7 to hit, reach 10 ft. Hit: 9 (2d4 + 4) slashing damage plus 2 (1d4) cold damage.', attackBonus: 7, damage: '2d4+4+1d4', damageType: 'slashing', reach: 10 },
            { name: 'Cold Breath', type: 'save', desc: 'Recharge 5-6. 30ft Cone. DC 15 Con save. 40 (9d8) Cold damage. Success: Half.', damage: '9d8', damageType: 'cold', saveDC: 15, saveAbility: 'CON', range: 30 }
        ]
    },
    {
        id: 'adult_white_dragon',
        name: 'Adult White Dragon',
        type: 'Dragon',
        size: 'Huge',
        ac: 18,
        hp: 200, // 16d12 + 96
        speed: 8, // 40ft, burrow 30ft, fly 80ft, swim 40ft
        stats: stats(22, 10, 22, 8, 12, 12),
        cr: 13,
        immunities: ['cold'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Ice Walk', desc: 'Can move across and climb icy surfaces without ability check.' },
            { name: 'Legendary Resistance (3/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +11 to hit, reach 10 ft. Hit: 13 (2d6 + 6) slashing damage plus 4 (1d8) cold damage.', attackBonus: 11, damage: '2d6+6+1d8', damageType: 'slashing', reach: 10 },
            { name: 'Cold Breath', type: 'save', desc: 'Recharge 5-6. 60ft Cone. DC 19 Con save. 54 (12d8) Cold damage. Success: Half.', damage: '12d8', damageType: 'cold', saveDC: 19, saveAbility: 'CON', range: 60 }
        ],
        legendaryActions: [
            { name: 'Freezing Burst', type: 'save', desc: 'Constitution Saving Throw: DC 14, each creature in a 30-foot-radius Sphere centered on a point the dragon can see within 120 feet. Failure: 7 (2d6) Cold damage, and target\'s Speed is 0 until end of next turn.', saveDC: 14, saveAbility: 'CON', damage: '2d6' },
            { name: 'Frightful Presence', type: 'ability', desc: 'The dragon casts Fear.' },
            { name: 'Pounce', type: 'ability', desc: 'The dragon moves up to half its Speed, and it makes one Rend attack.' }
        ]
    },
    {
        id: 'ancient_white_dragon',
        name: 'Ancient White Dragon',
        type: 'Dragon',
        size: 'Gargantuan',
        ac: 20,
        hp: 333, // 18d20 + 144
        speed: 8, // 40ft, burrow 40ft, fly 80ft, swim 40ft
        stats: stats(26, 10, 26, 10, 13, 14),
        cr: 20,
        immunities: ['cold'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Ice Walk', desc: 'Can move across and climb icy surfaces without ability check.' },
            { name: 'Legendary Resistance (4/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +14 to hit, reach 15 ft. Hit: 17 (2d8 + 8) slashing damage plus 7 (2d6) cold damage.', attackBonus: 14, damage: '2d8+8+2d6', damageType: 'slashing', reach: 15 },
            { name: 'Cold Breath', type: 'save', desc: 'Recharge 5-6. 90ft Cone. DC 22 Con save. 63 (14d8) Cold damage. Success: Half.', damage: '14d8', damageType: 'cold', saveDC: 22, saveAbility: 'CON', range: 90 }
        ],
        legendaryActions: [
            { name: 'Freezing Burst', type: 'save', desc: 'Constitution Saving Throw: DC 20, each creature in a 30-foot-radius Sphere centered on a point within 120 feet. Failure: 14 (4d6) Cold damage, and target\'s Speed is 0 until end of next turn.', saveDC: 20, saveAbility: 'CON', damage: '4d6' },
            { name: 'Frightful Presence', type: 'ability', desc: 'The dragon casts Fear.' },
            { name: 'Pounce', type: 'ability', desc: 'The dragon moves up to half its Speed, and it makes one Rend attack.' }
        ]
    },

    // --- BRASS DRAGONS ---
    {
        id: 'brass_dragon_wyrmling',
        name: 'Brass Dragon Wyrmling',
        type: 'Dragon',
        size: 'Medium',
        ac: 15,
        hp: 22, // 4d8 + 4
        speed: 6, // 30ft, burrow 15ft, fly 60ft
        stats: stats(15, 10, 13, 10, 11, 13),
        cr: 1,
        immunities: ['fire'],
        senses: 'Blindsight 10ft, Darkvision 60ft',
        languages: 'Draconic',
        aiBehavior: 'caster',
        traits: [{ name: 'Amphibious', desc: 'The dragon can breathe air and water.' }],
        actions: [
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +4 to hit, reach 5 ft. Hit: 7 (1d10 + 2) slashing damage.', attackBonus: 4, damage: '1d10+2', damageType: 'slashing', reach: 5 },
            { name: 'Fire Breath', type: 'save', desc: 'Recharge 5-6. 20ft Line (5ft wide). DC 11 Dex save. 14 (4d6) Fire damage. Success: Half.', damage: '4d6', damageType: 'fire', saveDC: 11, saveAbility: 'DEX', range: 20 },
            { name: 'Sleep Breath', type: 'save', desc: 'Recharge 5-6. 15ft Cone. DC 11 Con save. Failure: Incapacitated 1 round. 2nd Fail: Unconscious 1 min.', saveDC: 11, saveAbility: 'CON', damage: '0' }
        ]
    },
    {
        id: 'young_brass_dragon',
        name: 'Young Brass Dragon',
        type: 'Dragon',
        size: 'Large',
        ac: 17,
        hp: 110, // 13d10 + 39
        speed: 8, // 40ft, burrow 20ft, fly 80ft
        stats: stats(19, 10, 17, 12, 11, 15),
        cr: 6,
        immunities: ['fire'],
        senses: 'Blindsight 30ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'caster',
        traits: [{ name: 'Amphibious', desc: 'The dragon can breathe air and water.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace two attacks with a use of Sleep Breath.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +7 to hit, reach 10 ft. Hit: 15 (2d10 + 4) slashing damage.', attackBonus: 7, damage: '2d10+4', damageType: 'slashing', reach: 10 },
            { name: 'Fire Breath', type: 'save', desc: 'Recharge 5-6. 40ft Line (5ft wide). DC 14 Dex save. 38 (11d6) Fire damage. Success: Half.', damage: '11d6', damageType: 'fire', saveDC: 14, saveAbility: 'DEX', range: 40 },
            { name: 'Sleep Breath', type: 'save', desc: 'Recharge 5-6. 30ft Cone. DC 14 Con save. Failure: Incapacitated 1 round. 2nd Fail: Unconscious 1 min.', saveDC: 14, saveAbility: 'CON', damage: '0' }
        ]
    },
    {
        id: 'adult_brass_dragon',
        name: 'Adult Brass Dragon',
        type: 'Dragon',
        size: 'Huge',
        ac: 18,
        hp: 172, // 15d12 + 75
        speed: 8, // 40ft, burrow 30ft, fly 80ft
        stats: stats(23, 10, 21, 14, 13, 17),
        cr: 13,
        immunities: ['fire'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'caster',
        traits: [
            { name: 'Amphibious', desc: 'The dragon can breathe air and water.' },
            { name: 'Legendary Resistance (3/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of Sleep Breath or Spellcasting to cast Scorching Ray.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +11 to hit, reach 10 ft. Hit: 17 (2d10 + 6) slashing damage plus 4 (1d8) fire damage.', attackBonus: 11, damage: '2d10+6+1d8', damageType: 'slashing', reach: 10 },
            { name: 'Fire Breath', type: 'save', desc: 'Recharge 5-6. 60ft Line (5ft wide). DC 18 Dex save. 45 (10d8) Fire damage. Success: Half.', damage: '10d8', damageType: 'fire', saveDC: 18, saveAbility: 'DEX', range: 60 },
            { name: 'Sleep Breath', type: 'save', desc: 'Recharge 5-6. 60ft Cone. DC 18 Con save. Failure: Incapacitated 1 round. 2nd Fail: Unconscious 10 mins.', saveDC: 18, saveAbility: 'CON', damage: '0' }
        ],
        spellcasting: {
             class: 'Innate',
             level: 13,
             ability: 'cha',
             spells: ['Detect Magic', 'Minor Illusion', 'Scorching Ray', 'Shapechange', 'Speak with Animals', 'Detect Thoughts', 'Control Weather']
        },
        legendaryActions: [
            { name: 'Blazing Light', type: 'ability', desc: 'The dragon uses Spellcasting to cast Scorching Ray.' },
            { name: 'Pounce', type: 'ability', desc: 'The dragon moves up to half its Speed, and it makes one Rend attack.' },
            { name: 'Scorching Sands', type: 'save', desc: 'Dexterity Saving Throw: DC 16, one creature within 120 feet. Failure: 27 (6d8) Fire damage, and target\'s Speed halved. Failure or Success: Cannot use again until start of next turn.', saveDC: 16, saveAbility: 'DEX', damage: '6d8' }
        ]
    },
    {
        id: 'ancient_brass_dragon',
        name: 'Ancient Brass Dragon',
        type: 'Dragon',
        size: 'Gargantuan',
        ac: 20,
        hp: 332, // 19d20 + 133
        speed: 8, // 40ft, burrow 40ft, fly 80ft
        stats: stats(27, 10, 25, 16, 15, 22), // Cha 22 per updated SRD
        cr: 20,
        immunities: ['fire'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'caster',
        traits: [
            { name: 'Amphibious', desc: 'The dragon can breathe air and water.' },
            { name: 'Legendary Resistance (4/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of Sleep Breath or Spellcasting to cast Scorching Ray (level 3 version).',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +14 to hit, reach 15 ft. Hit: 19 (2d10 + 8) slashing damage plus 7 (2d6) fire damage.', attackBonus: 14, damage: '2d10+8+2d6', damageType: 'slashing', reach: 15 },
            { name: 'Fire Breath', type: 'save', desc: 'Recharge 5-6. 90ft Line (5ft wide). DC 21 Dex save. 58 (13d8) Fire damage. Success: Half.', damage: '13d8', damageType: 'fire', saveDC: 21, saveAbility: 'DEX', range: 90 },
            { name: 'Sleep Breath', type: 'save', desc: 'Recharge 5-6. 90ft Cone. DC 21 Con save. Failure: Incapacitated 1 round. 2nd Fail: Unconscious 10 mins.', saveDC: 21, saveAbility: 'CON', damage: '0' }
        ],
        spellcasting: {
             class: 'Innate',
             level: 16,
             ability: 'cha',
             spells: ['Detect Magic', 'Minor Illusion', 'Scorching Ray', 'Shapechange', 'Speak with Animals', 'Control Weather', 'Detect Thoughts']
        },
        legendaryActions: [
            { name: 'Blazing Light', type: 'ability', desc: 'The dragon uses Spellcasting to cast Scorching Ray (level 3 version).' },
            { name: 'Pounce', type: 'ability', desc: 'The dragon moves up to half its Speed, and it makes one Rend attack.' },
            { name: 'Scorching Sands', type: 'save', desc: 'Dexterity Saving Throw: DC 20, one creature within 120 feet. Failure: 36 (8d8) Fire damage, and target\'s Speed halved. Failure or Success: Cannot use again until start of next turn.', saveDC: 20, saveAbility: 'DEX', damage: '8d8' }
        ]
    },

    // --- BRONZE DRAGONS ---
    {
        id: 'bronze_dragon_wyrmling',
        name: 'Bronze Dragon Wyrmling',
        type: 'Dragon',
        size: 'Medium',
        ac: 15,
        hp: 39, // 6d8 + 12
        speed: 6, // 30ft, fly 60ft, swim 30ft
        stats: stats(17, 10, 15, 12, 11, 15),
        cr: 2,
        immunities: ['lightning'],
        senses: 'Blindsight 10ft, Darkvision 60ft',
        languages: 'Draconic',
        aiBehavior: 'defensive',
        traits: [{ name: 'Amphibious', desc: 'The dragon can breathe air and water.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes two Rend attacks.',
                multiattackActions: ['Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +5 to hit, reach 5 ft. Hit: 8 (1d10 + 3) slashing damage.', attackBonus: 5, damage: '1d10+3', damageType: 'slashing', reach: 5 },
            { name: 'Lightning Breath', type: 'save', desc: 'Recharge 5-6. 40ft Line (5ft wide). DC 12 Dex save. 16 (3d10) Lightning damage. Success: Half.', damage: '3d10', damageType: 'lightning', saveDC: 12, saveAbility: 'DEX', range: 40 },
            { name: 'Repulsion Breath', type: 'save', desc: 'Recharge 5-6. 30ft Cone. DC 12 Str save. Failure: Pushed 30ft away and Prone.', saveDC: 12, saveAbility: 'STR', damage: '0' }
        ]
    },
    {
        id: 'young_bronze_dragon',
        name: 'Young Bronze Dragon',
        type: 'Dragon',
        size: 'Large',
        ac: 17,
        hp: 142, // 15d10 + 60
        speed: 8, // 40ft, fly 80ft, swim 40ft
        stats: stats(21, 10, 19, 14, 13, 17),
        cr: 8,
        immunities: ['lightning'],
        senses: 'Blindsight 30ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'defensive',
        traits: [{ name: 'Amphibious', desc: 'The dragon can breathe air and water.' }],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of Repulsion Breath.',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +8 to hit, reach 10 ft. Hit: 16 (2d10 + 5) slashing damage.', attackBonus: 8, damage: '2d10+5', damageType: 'slashing', reach: 10 },
            { name: 'Lightning Breath', type: 'save', desc: 'Recharge 5-6. 60ft Line (5ft wide). DC 15 Dex save. 49 (9d10) Lightning damage. Success: Half.', damage: '9d10', damageType: 'lightning', saveDC: 15, saveAbility: 'DEX', range: 60 },
            { name: 'Repulsion Breath', type: 'save', desc: 'Recharge 5-6. 30ft Cone. DC 15 Str save. Failure: Pushed 40ft away and Prone.', saveDC: 15, saveAbility: 'STR', damage: '0' }
        ]
    },
    {
        id: 'adult_bronze_dragon',
        name: 'Adult Bronze Dragon',
        type: 'Dragon',
        size: 'Huge',
        ac: 18,
        hp: 212, // 17d12 + 102
        speed: 8, // 40ft, fly 80ft, swim 40ft
        stats: stats(25, 10, 23, 16, 15, 20),
        cr: 15,
        immunities: ['lightning'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'caster',
        traits: [
            { name: 'Amphibious', desc: 'The dragon can breathe air and water.' },
            { name: 'Legendary Resistance (3/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of (A) Repulsion Breath or (B) Spellcasting to cast Guiding Bolt (level 2 version).',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +12 to hit, reach 10 ft. Hit: 16 (2d8 + 7) slashing damage plus 5 (1d10) lightning damage.', attackBonus: 12, damage: '2d8+7+1d10', damageType: 'slashing', reach: 10 },
            { name: 'Lightning Breath', type: 'save', desc: 'Recharge 5-6. 90ft Line (5ft wide). DC 19 Dex save. 55 (10d10) Lightning damage. Success: Half.', damage: '10d10', damageType: 'lightning', saveDC: 19, saveAbility: 'DEX', range: 90 },
            { name: 'Repulsion Breath', type: 'save', desc: 'Recharge 5-6. 30ft Cone. DC 19 Str save. Failure: Pushed 60ft away and Prone.', saveDC: 19, saveAbility: 'STR', damage: '0' }
        ],
        spellcasting: {
            class: 'Innate',
            level: 15,
            ability: 'cha',
            spells: ['Detect Magic', 'Guiding Bolt', 'Control Water']
        },
        legendaryActions: [
            { name: 'Call to Storm', type: 'ability', desc: 'The dragon uses Spellcasting to cast Control Water.' },
            { name: 'Tail Swipe', type: 'melee', desc: 'The dragon makes one Rend attack.', attackBonus: 12, damage: '2d8+7+1d10', damageType: 'slashing', reach: 10 },
            { name: 'Thunder Wing', type: 'save', desc: 'Dexterity Saving Throw: DC 19, each creature within 15 feet. Failure: 11 (2d10) Thunder damage, and the target is pushed up to 10 feet away. Success: Half damage.' }
        ]
    },
    {
        id: 'ancient_bronze_dragon',
        name: 'Ancient Bronze Dragon',
        type: 'Dragon',
        size: 'Gargantuan',
        ac: 22,
        hp: 444, // 24d20 + 192
        speed: 8, // 40ft, fly 80ft, swim 40ft
        stats: stats(29, 10, 27, 18, 17, 25),
        cr: 22,
        immunities: ['lightning'],
        senses: 'Blindsight 60ft, Darkvision 120ft',
        languages: 'Common, Draconic',
        aiBehavior: 'caster',
        traits: [
            { name: 'Amphibious', desc: 'The dragon can breathe air and water.' },
            { name: 'Legendary Resistance (4/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The dragon makes three Rend attacks. It can replace one attack with a use of (A) Repulsion Breath or (B) Spellcasting to cast Guiding Bolt (level 5 version).',
                multiattackActions: ['Rend', 'Rend', 'Rend']
            },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +16 to hit, reach 15 ft. Hit: 18 (2d8 + 9) slashing damage plus 11 (2d10) lightning damage.', attackBonus: 16, damage: '2d8+9+2d10', damageType: 'slashing', reach: 15 },
            { name: 'Lightning Breath', type: 'save', desc: 'Recharge 5-6. 120ft Line (10ft wide). DC 23 Dex save. 88 (16d10) Lightning damage. Success: Half.', damage: '16d10', damageType: 'lightning', saveDC: 23, saveAbility: 'DEX', range: 120 },
            { name: 'Repulsion Breath', type: 'save', desc: 'Recharge 5-6. 30ft Cone. DC 23 Str save. Failure: Pushed 60ft away and Prone.', saveDC: 23, saveAbility: 'STR', damage: '0' }
        ],
        spellcasting: {
            class: 'Innate',
            level: 19,
            ability: 'cha',
            spells: ['Detect Magic', 'Guiding Bolt', 'Control Water', 'Slow', 'Thunderwave']
        },
        legendaryActions: [
            { name: 'Call to Storm', type: 'ability', desc: 'The dragon uses Spellcasting to cast Control Water.' },
            { name: 'Tail Swipe', type: 'melee', desc: 'The dragon makes one Rend attack.', attackBonus: 16, damage: '2d8+9+2d10', damageType: 'slashing', reach: 15 },
            { name: 'Thunder Wing', type: 'save', desc: 'Dexterity Saving Throw: DC 23, each creature within 15 feet. Failure: 16 (3d10) Thunder damage, and the target is pushed up to 15 feet away. Success: Half damage.' }
        ]
    }
];

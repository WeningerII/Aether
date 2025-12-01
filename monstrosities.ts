


import { MonsterData } from '../../types';
import { stats } from './utils';

export const MONSTROSITIES: MonsterData[] = [
    {
        id: 'ankheg',
        name: 'Ankheg',
        type: 'Monstrosity',
        size: 'Large',
        ac: 14,
        hp: 45, // 6d10+12
        speed: 6, // 30ft, burrow 10ft
        stats: stats(17, 11, 14, 1, 13, 6),
        cr: 2,
        senses: 'Darkvision 60ft, Tremorsense 60ft',
        languages: 'None',
        aiBehavior: 'aggressive',
        actions: [
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Attack Roll: +5 (+Adv if grappled), reach 5 ft. Hit: 10 (2d6 + 3) slashing damage plus 3 (1d6) acid damage. If Large or smaller, grappled (escape DC 13).',
                attackBonus: 5,
                damage: '2d6+3+1d6',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Acid Spray',
                type: 'save',
                desc: 'Recharge 6. Dexterity Saving Throw: DC 12, 30ft long 5ft wide line. Failure: 14 (4d6) acid damage. Success: Half.',
                saveDC: 12,
                saveAbility: 'DEX',
                damage: '4d6',
                damageType: 'acid',
                range: 30
            }
        ]
    },
    {
        id: 'basilisk',
        name: 'Basilisk',
        type: 'Monstrosity',
        size: 'Medium',
        ac: 15,
        hp: 52, // 8d8+16
        speed: 4, // 20ft
        stats: stats(16, 8, 15, 2, 8, 7),
        cr: 3,
        senses: 'Darkvision 60ft',
        languages: 'None',
        aiBehavior: 'defensive',
        actions: [
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 10 (2d6 + 3) piercing damage plus 7 (2d6) poison damage.',
                attackBonus: 5,
                damage: '2d6+3+2d6',
                damageType: 'piercing',
                reach: 5
            }
        ],
        bonusActions: [
            {
                name: 'Petrifying Gaze',
                type: 'save',
                desc: 'Recharge 4-6. Constitution Saving Throw: DC 12, each creature in 30ft cone. Failure: Restrained. Second Failure: Petrified.',
                saveDC: 12,
                saveAbility: 'CON',
                damage: '0',
                range: 30
            }
        ]
    },
    {
        id: 'behir',
        name: 'Behir',
        type: 'Monstrosity',
        size: 'Huge',
        ac: 17,
        hp: 168, // 16d12+64
        speed: 10, // 50ft, climb 50ft
        stats: stats(23, 16, 18, 7, 14, 12),
        cr: 11,
        skills: ['Perception', 'Stealth'],
        immunities: ['lightning'],
        senses: 'Darkvision 90ft',
        languages: 'Draconic',
        aiBehavior: 'aggressive',
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The behir makes one Bite attack and uses Constrict.',
                multiattackActions: ['Bite', 'Constrict']
            },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +10, reach 10ft. Hit: 19 (2d12+6) piercing + 11 (2d10) lightning.', attackBonus: 10, damage: '2d12+6+2d10', damageType: 'piercing' },
            { name: 'Constrict', type: 'save', desc: 'Str Save DC 18, Large or smaller within 5ft. Failure: 28 (5d8+6) bludgeoning, grappled (DC 16), restrained.', saveDC: 18, saveAbility: 'STR', damage: '5d8+6' },
            { name: 'Lightning Breath', type: 'save', desc: 'Recharge 5-6. Dex Save DC 16, 90ft line. Failure: 66 (12d10) lightning. Success: Half.', saveDC: 16, saveAbility: 'DEX', damage: '12d10', range: 90 }
        ],
        bonusActions: [
            { name: 'Swallow', type: 'save', desc: 'Dex Save DC 18, one grappled creature. Failure: Swallowed (blinded, restrained, total cover, takes 21 (6d6) acid per turn).' }
        ]
    },
    {
        id: 'bulette',
        name: 'Bulette',
        type: 'Monstrosity',
        size: 'Large',
        ac: 17,
        hp: 94, // 9d10+45
        speed: 8, // 40ft, burrow 40ft
        stats: stats(19, 11, 21, 2, 10, 5),
        cr: 5,
        senses: 'Darkvision 60ft, Tremorsense 120ft',
        languages: 'None',
        aiBehavior: 'aggressive',
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The bulette makes two Bite attacks.',
                multiattackActions: ['Bite', 'Bite']
            },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +7, reach 5ft. Hit: 17 (2d12+4) piercing.', attackBonus: 7, damage: '2d12+4' },
            { name: 'Deadly Leap', type: 'save', desc: 'Jump 15ft to space with creatures. Dex Save DC 15. Failure: 19 (3d12) bludgeoning + Prone. Success: Half damage, pushed 5ft.', saveDC: 15, saveAbility: 'DEX', damage: '3d12' }
        ],
        bonusActions: [
            { name: 'Leap', type: 'ability', desc: 'Jump 30ft.' }
        ]
    },
    {
        id: 'chimera',
        name: 'Chimera',
        type: 'Monstrosity',
        size: 'Large',
        ac: 14,
        hp: 114, // 12d10+48
        speed: 6, // 30ft, fly 60ft
        stats: stats(19, 11, 19, 3, 14, 10),
        cr: 6,
        skills: ['Perception'],
        senses: 'Darkvision 60ft',
        languages: 'Draconic',
        aiBehavior: 'aggressive',
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'Ram, Bite, Claw. Can replace Claw with Fire Breath.',
                multiattackActions: ['Ram', 'Bite', 'Claw']
            },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +7, reach 5ft. Hit: 11 (2d6+4) piercing (18 if adv).', attackBonus: 7, damage: '2d6+4' },
            { name: 'Claw', type: 'melee', desc: 'Melee Attack: +7, reach 5ft. Hit: 7 (1d6+4) slashing.', attackBonus: 7, damage: '1d6+4' },
            { name: 'Ram', type: 'melee', desc: 'Melee Attack: +7, reach 5ft. Hit: 10 (1d12+4) bludgeoning. If Medium/Smaller -> Prone.', attackBonus: 7, damage: '1d12+4' },
            { name: 'Fire Breath', type: 'save', desc: 'Recharge 5-6. Dex Save DC 15, 15ft cone. Failure: 31 (7d8) fire. Success: Half.', saveDC: 15, saveAbility: 'DEX', damage: '7d8' }
        ]
    },
    {
        id: 'cockatrice',
        name: 'Cockatrice',
        type: 'Monstrosity',
        size: 'Small',
        ac: 11,
        hp: 22, // 5d6+5
        speed: 4, // 20ft, fly 40ft
        stats: stats(6, 12, 12, 2, 13, 5),
        cr: 0.5,
        immunities: ['petrified'],
        senses: 'Darkvision 60ft',
        languages: 'None',
        aiBehavior: 'defensive',
        actions: [
            { name: 'Petrifying Bite', type: 'melee', desc: 'Melee Attack: +3, reach 5ft. Hit: 3 (1d4+1) piercing. Creature: Con Save DC 11. Failure: Restrained. Repeat save end of next turn. 2nd Failure: Petrified 24h.', attackBonus: 3, damage: '1d4+1' }
        ]
    },
    {
        id: 'death_dog',
        name: 'Death Dog',
        type: 'Monstrosity',
        size: 'Medium',
        ac: 12,
        hp: 39, // 6d8+12
        speed: 8, // 40ft
        stats: stats(15, 14, 14, 3, 13, 6),
        cr: 1,
        skills: ['Perception', 'Stealth'],
        immunities: ['blinded', 'charmed', 'deafened', 'frightened', 'stunned', 'unconscious'],
        senses: 'Darkvision 120ft',
        languages: 'None',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Two Bite attacks.', multiattackActions: ['Bite', 'Bite'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +4, reach 5ft. Hit: 4 (1d4+2) piercing. Con Save DC 12. Failure: Poisoned (cannot regain HP, repeats save every 24h, max HP reduced by 5).', attackBonus: 4, damage: '1d4+2' }
        ]
    },
    {
        id: 'doppelganger',
        name: 'Doppelganger',
        type: 'Monstrosity',
        size: 'Medium',
        ac: 14,
        hp: 52, // 8d8+16
        speed: 6, // 30ft
        stats: stats(11, 18, 14, 11, 12, 14),
        cr: 3,
        skills: ['Deception', 'Insight'],
        immunities: ['charmed'],
        senses: 'Darkvision 60ft',
        languages: 'Common',
        aiBehavior: 'lurker',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Two Slam attacks and use Unsettling Visage.', multiattackActions: ['Slam', 'Slam', 'Unsettling Visage'] },
            { name: 'Slam', type: 'melee', desc: 'Melee Attack: +6 (+Adv first round), reach 5ft. Hit: 11 (2d6+4) bludgeoning.', attackBonus: 6, damage: '2d6+4' },
            { name: 'Read Thoughts', type: 'ability', desc: 'Casts Detect Thoughts (no components).' },
            { name: 'Unsettling Visage', type: 'save', desc: 'Recharge 6. Wis Save DC 12, 15ft Emanation. Failure: Frightened 1 min (repeat save end of turns).', saveDC: 12, saveAbility: 'WIS', damage: '0' }
        ],
        bonusActions: [
            { name: 'Shape-Shift', type: 'ability', desc: 'Change into Small/Medium humanoid or back.' }
        ]
    },
    {
        id: 'drider',
        name: 'Drider',
        type: 'Monstrosity',
        size: 'Large',
        ac: 19,
        hp: 123, // 13d10+52
        speed: 6, // 30ft, climb 30ft
        stats: stats(16, 19, 18, 13, 16, 12),
        cr: 6,
        skills: ['Perception', 'Stealth'],
        senses: 'Darkvision 120ft',
        languages: 'Elvish, Undercommon',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Spider Climb', desc: 'Climb difficult surfaces/ceilings.' },
            { name: 'Sunlight Sensitivity', desc: 'Disadvantage in sunlight.' },
            { name: 'Web Walker', desc: 'Ignore webs.' }
        ],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Three attacks (Foreleg/Poison Burst).', multiattackActions: ['Foreleg', 'Foreleg', 'Poison Burst'] },
            { name: 'Foreleg', type: 'melee', desc: 'Melee Attack: +7, reach 10ft. Hit: 13 (2d8+4) piercing.', attackBonus: 7, damage: '2d8+4' },
            { name: 'Poison Burst', type: 'ranged', desc: 'Ranged Attack: +6, range 120ft. Hit: 13 (3d6+3) poison.', attackBonus: 6, damage: '3d6+3' }
        ],
        bonusActions: [
            { name: 'Magic of the Spider Queen', type: 'ability', desc: 'Recharge 5-6. Cast Darkness, Faerie Fire, or Web (Wisdom, DC 14).' }
        ]
    },
    {
        id: 'ettercap',
        name: 'Ettercap',
        type: 'Monstrosity',
        size: 'Medium',
        ac: 13,
        hp: 44, // 8d8+8
        speed: 6, // 30ft, climb 30ft
        stats: stats(14, 15, 13, 7, 12, 8),
        cr: 2,
        skills: ['Perception', 'Stealth', 'Survival'],
        senses: 'Darkvision 60ft',
        languages: 'None',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Spider Climb', desc: 'Climb difficult surfaces/ceilings.' },
            { name: 'Web Walker', desc: 'Ignore webs.' }
        ],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'One Bite and one Claw.', multiattackActions: ['Bite', 'Claw'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +4, reach 5ft. Hit: 5 (1d6+2) piercing + 2 (1d4) poison. Poisoned until start of next turn.', attackBonus: 4, damage: '1d6+2+1d4' },
            { name: 'Claw', type: 'melee', desc: 'Melee Attack: +4, reach 5ft. Hit: 7 (2d4+2) slashing.', attackBonus: 4, damage: '2d4+2' },
            { name: 'Web Strand', type: 'save', desc: 'Recharge 5-6. Dex Save DC 12, Large or smaller within 30ft. Failure: Restrained (Web AC 10, 5HP).', saveDC: 12, saveAbility: 'DEX', damage: '0' }
        ],
        bonusActions: [
            { name: 'Reel', type: 'ability', desc: 'Pull restrained creature 25ft closer.' }
        ]
    },
    {
        id: 'flying_snake',
        name: 'Flying Snake',
        type: 'Monstrosity',
        size: 'Tiny',
        ac: 14,
        hp: 5, // 2d4
        speed: 6, // 30ft, fly 60ft, swim 30ft
        stats: stats(4, 15, 11, 2, 12, 5),
        cr: 0.125,
        senses: 'Blindsight 10ft',
        languages: 'None',
        aiBehavior: 'defensive',
        traits: [{ name: 'Flyby', desc: 'No OA when flying out of reach.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +4, reach 5ft. Hit: 1 piercing + 5 (2d4) poison.', attackBonus: 4, damage: '1+2d4' }
        ]
    },
    {
        id: 'griffon',
        name: 'Griffon',
        type: 'Monstrosity',
        size: 'Large',
        ac: 12,
        hp: 59, // 7d10+21
        speed: 6, // 30ft, fly 80ft
        stats: stats(18, 15, 16, 2, 13, 8),
        cr: 2,
        skills: ['Perception'],
        senses: 'Darkvision 60ft',
        languages: 'None',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Two Rend attacks.', multiattackActions: ['Rend', 'Rend'] },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +6, reach 5ft. Hit: 8 (1d8+4) piercing. If Medium/smaller, Grappled (DC 14).', attackBonus: 6, damage: '1d8+4' }
        ],
        traits: [{ name: 'Keen Sight', desc: 'Advantage on sight Perception.' }]
    },
    {
        id: 'harpy',
        name: 'Harpy',
        type: 'Monstrosity',
        size: 'Medium',
        ac: 11,
        hp: 38, // 7d8+7
        speed: 4, // 20ft, fly 40ft
        stats: stats(12, 13, 12, 7, 10, 13),
        cr: 1,
        senses: 'Passive Perception 10',
        languages: 'Common',
        aiBehavior: 'caster',
        actions: [
            { name: 'Claw', type: 'melee', desc: 'Melee Attack: +3, reach 5ft. Hit: 6 (2d4+1) slashing.', attackBonus: 3, damage: '2d4+1' },
            { name: 'Luring Song', type: 'save', desc: 'Wis Save DC 11, Humanoids/Giants within 300ft. Failure: Charmed/Incapacitated. Move towards harpy. Immune for 24h on success.', saveDC: 11, saveAbility: 'WIS', damage: '0' }
        ]
    },
    {
        id: 'hippogriff',
        name: 'Hippogriff',
        type: 'Monstrosity',
        size: 'Large',
        ac: 11,
        hp: 26, // 4d10+4
        speed: 8, // 40ft, fly 60ft
        stats: stats(17, 13, 13, 2, 12, 8),
        cr: 1,
        skills: ['Perception'],
        senses: 'Passive Perception 15',
        languages: 'None',
        aiBehavior: 'defensive',
        traits: [{ name: 'Flyby', desc: 'No OA when flying out of reach.' }],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Two Rend attacks.', multiattackActions: ['Rend', 'Rend'] },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +5, reach 5ft. Hit: 7 (1d8+3) slashing.', attackBonus: 5, damage: '1d8+3' }
        ]
    },
    {
        id: 'hydra',
        name: 'Hydra',
        type: 'Monstrosity',
        size: 'Huge',
        ac: 15,
        hp: 172, // 15d12+75 (SRD 5.2.1 differs slightly from 5.1)
        speed: 6, // 30ft, swim 30ft
        stats: stats(20, 12, 20, 2, 10, 7),
        cr: 8,
        senses: 'Darkvision 60ft',
        languages: 'None',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Hold Breath', desc: '1 hour.' },
            { name: 'Multiple Heads', desc: '5 heads. Adv on saves vs blind/charm/deafen/frighten/stun/unconscious.' },
            { name: 'Reactive Heads', desc: 'Extra reaction per head.' },
            { name: 'Wakeful', desc: 'Never fully asleep.' },
            { name: 'Regeneration', desc: 'Regain 10 HP if 1 HP left (Fire suppresses).' }
        ],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'One Bite per head.', multiattackActions: ['Bite', 'Bite', 'Bite', 'Bite', 'Bite'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +8, reach 10ft. Hit: 10 (1d10+5) piercing.', attackBonus: 8, damage: '1d10+5' }
        ]
    },
    {
        id: 'kraken',
        name: 'Kraken',
        type: 'Monstrosity',
        size: 'Gargantuan',
        ac: 18,
        hp: 481, // 26d20+208
        speed: 6, // 30ft, swim 120ft
        stats: stats(30, 11, 26, 22, 18, 20),
        cr: 23,
        skills: ['History', 'Perception'],
        immunities: ['cold', 'lightning', 'frightened', 'grappled', 'paralyzed', 'restrained'],
        senses: 'Truesight 120ft',
        languages: 'Abyssal, Celestial, Infernal, Primordial, Telepathy 120ft',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Amphibious', desc: 'Air and water.' },
            { name: 'Legendary Resistance (4/Day, 5/Lair)', desc: 'Succeed failed save.' },
            { name: 'Siege Monster', desc: 'Double damage to objects.' }
        ],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Two Tentacles, use Fling/Lightning/Swallow.', multiattackActions: ['Tentacle', 'Tentacle', 'Lightning Strike'] },
            { name: 'Tentacle', type: 'melee', desc: 'Melee Attack: +17, reach 30ft. Hit: 24 (4d6+10) bludgeoning. Grapple (DC 20). Restrained.', attackBonus: 17, damage: '4d6+10' },
            { name: 'Fling', type: 'ability', desc: 'Throw grappled creature 60ft. Dex Save DC 25. Failure: 18 (4d8) bludgeoning + Prone.', damage: '4d8' },
            { name: 'Lightning Strike', type: 'save', desc: 'Dex Save DC 23, one creature 120ft. Failure: 33 (6d10) lightning.', saveDC: 23, saveAbility: 'DEX', damage: '6d10' },
            { name: 'Swallow', type: 'save', desc: 'Dex Save DC 25, grappled Large/smaller. Failure: 23 (3d8+10) piercing. Swallowed (Restrained, Cover, 24 acid dmg).', saveDC: 25, saveAbility: 'DEX', damage: '3d8+10' }
        ],
        legendaryActions: [
            { name: 'Storm Bolt', type: 'ability', desc: 'Use Lightning Strike.' },
            { name: 'Toxic Ink', type: 'save', desc: 'Underwater only. Con Save DC 23, 15ft Emanation. Failure: Blinded/Poisoned.', saveDC: 23, saveAbility: 'CON', damage: '0' }
        ]
    },
    {
        id: 'manticore',
        name: 'Manticore',
        type: 'Monstrosity',
        size: 'Large',
        ac: 14,
        hp: 68, // 8d10+24
        speed: 6, // 30ft, fly 50ft
        stats: stats(17, 16, 17, 7, 12, 8),
        cr: 3,
        senses: 'Darkvision 60ft',
        languages: 'Common',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Three attacks (Rend or Tail Spike).', multiattackActions: ['Rend', 'Rend', 'Rend'] },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +5, reach 5ft. Hit: 7 (1d8+3) slashing.', attackBonus: 5, damage: '1d8+3' },
            { name: 'Tail Spike', type: 'ranged', desc: 'Ranged Attack: +5, range 100/200ft. Hit: 7 (1d8+3) piercing.', attackBonus: 5, damage: '1d8+3' }
        ]
    },
    {
        id: 'medusa',
        name: 'Medusa',
        type: 'Monstrosity',
        size: 'Medium',
        ac: 15,
        hp: 127, // 17d8+51
        speed: 6, // 30ft
        stats: stats(10, 17, 16, 12, 13, 15),
        cr: 6,
        skills: ['Deception', 'Perception', 'Stealth'],
        senses: 'Darkvision 150ft',
        languages: 'Common',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Two Claw + One Snake Hair OR Three Poison Rays.', multiattackActions: ['Claw', 'Claw', 'Snake Hair'] },
            { name: 'Claw', type: 'melee', desc: 'Melee Attack: +6, reach 5ft. Hit: 10 (2d6+3) slashing.', attackBonus: 6, damage: '2d6+3' },
            { name: 'Snake Hair', type: 'melee', desc: 'Melee Attack: +6, reach 5ft. Hit: 5 (1d4+3) piercing + 14 (4d6) poison.', attackBonus: 6, damage: '1d4+3+4d6' },
            { name: 'Poison Ray', type: 'ranged', desc: 'Ranged Attack: +5, range 150ft. Hit: 11 (2d8+2) poison.', attackBonus: 5, damage: '2d8+2' }
        ],
        bonusActions: [
            { name: 'Petrifying Gaze', type: 'save', desc: 'Recharge 5-6. Con Save DC 13, 30ft cone. 1st Fail: Restrained. 2nd Fail: Petrified.', saveDC: 13, saveAbility: 'CON', damage: '0' }
        ]
    },
    {
        id: 'merrow',
        name: 'Merrow',
        type: 'Monstrosity',
        size: 'Large',
        ac: 13,
        hp: 45, // 6d10+12
        speed: 2, // 10ft, swim 40ft
        stats: stats(18, 15, 15, 8, 10, 9),
        cr: 2,
        senses: 'Darkvision 60ft',
        languages: 'Abyssal, Primordial',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Amphibious', desc: 'Air and water.' }],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Two attacks (Bite, Claw, Harpoon).', multiattackActions: ['Bite', 'Claw'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +6, reach 5ft. Hit: 6 (1d4+4) piercing + Poisoned.', attackBonus: 6, damage: '1d4+4' },
            { name: 'Claw', type: 'melee', desc: 'Melee Attack: +6, reach 5ft. Hit: 9 (2d4+4) slashing.', attackBonus: 6, damage: '2d4+4' },
            { name: 'Harpoon', type: 'ranged', desc: 'Melee/Ranged: +6, reach 5ft/20ft. Hit: 11 (2d6+4) piercing. Pull 15ft.', attackBonus: 6, damage: '2d6+4' }
        ]
    },
    {
        id: 'mimic',
        name: 'Mimic',
        type: 'Monstrosity',
        size: 'Medium',
        ac: 12,
        hp: 58, // 9d8+18
        speed: 3, // 15ft
        stats: stats(17, 12, 15, 5, 13, 8),
        cr: 2,
        immunities: ['acid', 'prone'],
        senses: 'Darkvision 60ft',
        languages: 'None',
        aiBehavior: 'lurker',
        traits: [
            { name: 'Adhesive', desc: 'Huge/smaller creature touching mimic is Grappled (DC 13).' },
            { name: 'False Appearance', desc: 'Indistinguishable from object when motionless.' }
        ],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +5 (+Adv if grappled), reach 5ft. Hit: 7 (1d8+3) piercing + 4 (1d8) acid.', attackBonus: 5, damage: '1d8+3+1d8' },
            { name: 'Pseudopod', type: 'melee', desc: 'Melee Attack: +5, reach 5ft. Hit: 7 (1d8+3) bludgeoning. Adhesive.', attackBonus: 5, damage: '1d8+3' }
        ],
        bonusActions: [
            { name: 'Shape-Shift', type: 'ability', desc: 'Poly into object or back.' }
        ]
    },
    {
        id: 'minotaur_baphomet',
        name: 'Minotaur of Baphomet',
        type: 'Monstrosity',
        size: 'Large',
        ac: 14,
        hp: 85, // 10d10+30
        speed: 8, // 40ft
        stats: stats(18, 11, 16, 6, 16, 9),
        cr: 3,
        skills: ['Perception', 'Survival'],
        senses: 'Darkvision 60ft',
        languages: 'Abyssal',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Abyssal Glaive', type: 'melee', desc: 'Melee Attack: +6, reach 10ft. Hit: 10 (1d12+4) slashing + 10 (3d6) necrotic.', attackBonus: 6, damage: '1d12+4+3d6' },
            { name: 'Gore', type: 'melee', desc: 'Recharge 5-6. Melee Attack: +6, reach 5ft. Hit: 18 (4d6+4) piercing. If moved 10+ ft, extra 10 (3d6) piercing + Prone.', attackBonus: 6, damage: '4d6+4' }
        ]
    },
    {
        id: 'owlbear',
        name: 'Owlbear',
        type: 'Monstrosity',
        size: 'Large',
        ac: 13,
        hp: 59, // 7d10+21
        speed: 8, // 40ft, climb 40ft
        stats: stats(20, 12, 17, 3, 12, 7),
        cr: 3,
        skills: ['Perception'],
        senses: 'Darkvision 60ft',
        languages: 'None',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Two Rend attacks.', multiattackActions: ['Rend', 'Rend'] },
            { name: 'Rend', type: 'melee', desc: 'Melee Attack: +7, reach 5ft. Hit: 14 (2d8+5) slashing.', attackBonus: 7, damage: '2d8+5' }
        ]
    },
    {
        id: 'phase_spider',
        name: 'Phase Spider',
        type: 'Monstrosity',
        size: 'Large',
        ac: 14,
        hp: 45, // 7d10+7
        speed: 6, // 30ft, climb 30ft
        stats: stats(15, 16, 12, 6, 10, 6),
        cr: 3,
        skills: ['Stealth'],
        senses: 'Darkvision 60ft',
        languages: 'None',
        aiBehavior: 'lurker',
        traits: [
            { name: 'Ethereal Sight', desc: 'See 60ft into Ethereal Plane.' },
            { name: 'Spider Climb', desc: 'Climb walls/ceilings.' },
            { name: 'Web Walker', desc: 'Ignore webs.' }
        ],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Two Bite attacks.', multiattackActions: ['Bite', 'Bite'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +5, reach 5ft. Hit: 8 (1d10+3) piercing + 9 (2d8) poison. If 0 HP, Stable/Poisoned/Paralyzed 1 hr.', attackBonus: 5, damage: '1d10+3+2d8' }
        ],
        bonusActions: [
            { name: 'Ethereal Jaunt', type: 'ability', desc: 'Teleport to/from Ethereal Plane.' }
        ]
    },
    {
        id: 'purple_worm',
        name: 'Purple Worm',
        type: 'Monstrosity',
        size: 'Gargantuan',
        ac: 18,
        hp: 247, // 15d20+90
        speed: 10, // 50ft, burrow 50ft
        stats: stats(28, 7, 22, 1, 8, 4),
        cr: 15,
        senses: 'Blindsight 30ft, Tremorsense 60ft',
        languages: 'None',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Tunneler', desc: 'Burrow through rock.' }],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Bite + Tail Stinger.', multiattackActions: ['Bite', 'Tail Stinger'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +14, reach 10ft. Hit: 22 (3d8+9) piercing. Grapple (DC 19) / Restrained.', attackBonus: 14, damage: '3d8+9' },
            { name: 'Tail Stinger', type: 'melee', desc: 'Melee Attack: +14, reach 10ft. Hit: 16 (2d6+9) piercing + 35 (10d6) poison.', attackBonus: 14, damage: '2d6+9+10d6' }
        ],
        bonusActions: [
            { name: 'Swallow', type: 'save', desc: 'Str Save DC 19, grappled Large/smaller. Failure: Swallowed (Blinded, Restrained, Cover, 17 (5d6) acid dmg). Regurgitate on 30+ dmg (DC 21 Con).' }
        ]
    },
    {
        id: 'remorhaz',
        name: 'Remorhaz',
        type: 'Monstrosity',
        size: 'Huge',
        ac: 17,
        hp: 195, // 17d12+85
        speed: 8, // 40ft, burrow 30ft
        stats: stats(24, 13, 21, 4, 10, 5),
        cr: 11,
        immunities: ['cold', 'fire'],
        senses: 'Darkvision 60ft, Tremorsense 60ft',
        languages: 'None',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Heat Aura', desc: 'End of turn, 5ft Emanation takes 16 (3d10) fire damage.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +11, reach 10ft. Hit: 18 (2d10+7) piercing + 14 (4d6) fire. Grapple (DC 17).', attackBonus: 11, damage: '2d10+7+4d6' }
        ],
        bonusActions: [
            { name: 'Swallow', type: 'save', desc: 'Str Save DC 19, grappled Large/smaller. Swallowed (Blinded, Restrained, Cover, 10 (3d6) acid + 10 (3d6) fire). Regurgitate on 30+ dmg (DC 15 Con).' }
        ]
    },
    {
        id: 'roc',
        name: 'Roc',
        type: 'Monstrosity',
        size: 'Gargantuan',
        ac: 15,
        hp: 248, // 16d20+80
        speed: 4, // 20ft, fly 120ft
        stats: stats(28, 10, 20, 3, 10, 9),
        cr: 11,
        skills: ['Perception'],
        senses: 'Passive Perception 18',
        languages: 'None',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Two Beak or one Talons.', multiattackActions: ['Beak', 'Beak'] },
            { name: 'Beak', type: 'melee', desc: 'Melee Attack: +13, reach 10ft. Hit: 28 (3d12+9) piercing.', attackBonus: 13, damage: '3d12+9' },
            { name: 'Talons', type: 'melee', desc: 'Melee Attack: +13, reach 5ft. Hit: 23 (4d6+9) slashing. Grapple (DC 19).', attackBonus: 13, damage: '4d6+9' }
        ],
        bonusActions: [
            { name: 'Swoop', type: 'ability', desc: 'Recharge 5-6. If creature grappled, fly half speed without OA and drop.' }
        ]
    },
    {
        id: 'roper',
        name: 'Roper',
        type: 'Monstrosity', // PDF p320 calls it Aberration
        size: 'Large',
        ac: 20,
        hp: 93, // 11d10+33
        speed: 2, // 10ft, climb 20ft
        stats: stats(18, 8, 17, 7, 16, 6),
        cr: 5,
        skills: ['Perception', 'Stealth'],
        senses: 'Darkvision 60ft',
        languages: 'None',
        aiBehavior: 'lurker',
        traits: [{ name: 'Spider Climb', desc: 'Climb walls/ceilings.' }],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'Two Tentacles, Reel, Two Bites.', multiattackActions: ['Tentacle', 'Tentacle', 'Reel', 'Bite', 'Bite'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +7, reach 5ft. Hit: 17 (3d8+4) piercing.', attackBonus: 7, damage: '3d8+4' },
            { name: 'Tentacle', type: 'melee', desc: 'Melee Attack: +7, reach 60ft. Hit: Grappled (DC 14), Restrained. Poisoned until grapple ends.', attackBonus: 7, damage: '0' },
            { name: 'Reel', type: 'ability', desc: 'Pull grappled creatures 30ft closer.' }
        ]
    },
    {
        id: 'rust_monster',
        name: 'Rust Monster',
        type: 'Monstrosity',
        size: 'Medium',
        ac: 14,
        hp: 33, // 6d8+6
        speed: 8, // 40ft
        stats: stats(13, 12, 13, 2, 13, 6),
        cr: 0.5,
        senses: 'Darkvision 60ft',
        languages: 'None',
        aiBehavior: 'aggressive',
        traits: [
            { name: 'Iron Scent', desc: 'Pinpoint ferrous metal within 30ft.' },
            { name: 'Rust Metal', desc: 'Touching rust monster corrodes metal weapons/armor.' }
        ],
        actions: [
            { name: 'Multiattack', type: 'multiattack', desc: 'One Bite, two Antennae.', multiattackActions: ['Bite', 'Antennae', 'Antennae'] },
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +3, reach 5ft. Hit: 5 (1d8+1) piercing.', attackBonus: 3, damage: '1d8+1' },
            { name: 'Antennae', type: 'ability', desc: 'Dex Save DC 11. Failure: Metal object corrodes (-1 AC/Attack). Destroyed at -5/10.' },
            { name: 'Destroy Metal', type: 'ability', desc: 'Touch nonmagical metal object within 5ft. Destroys 1ft cube.' }
        ],
        reactions: [
            { name: 'Reflexive Antennae', type: 'ability', desc: 'When hit, use Antennae.' }
        ]
    },
    {
        id: 'stirge',
        name: 'Stirge',
        type: 'Monstrosity',
        size: 'Tiny',
        ac: 13,
        hp: 5, // 2d4
        speed: 2, // 10ft, fly 40ft
        stats: stats(4, 16, 11, 2, 8, 6),
        cr: 0.125,
        senses: 'Darkvision 60ft',
        languages: 'None',
        aiBehavior: 'aggressive',
        actions: [
            { name: 'Proboscis', type: 'melee', desc: 'Melee Attack: +5, reach 5ft. Hit: 6 (1d6+3) piercing. Attaches. 5 (2d4) Necrotic at start of turns. Detach with action.', attackBonus: 5, damage: '1d6+3' }
        ]
    },
    {
        id: 'winter_wolf',
        name: 'Winter Wolf',
        type: 'Monstrosity',
        size: 'Large',
        ac: 13,
        hp: 75, // 10d10+20
        speed: 10, // 50ft
        stats: stats(18, 13, 14, 7, 12, 8),
        cr: 3,
        skills: ['Perception', 'Stealth'],
        immunities: ['cold'],
        senses: 'Passive Perception 15',
        languages: 'Common, Giant, Winter Wolf',
        aiBehavior: 'aggressive',
        traits: [{ name: 'Pack Tactics', desc: 'Advantage if ally within 5ft.' }],
        actions: [
            { name: 'Bite', type: 'melee', desc: 'Melee Attack: +6, reach 5ft. Hit: 11 (2d6+4) piercing. If Large/smaller, Prone.', attackBonus: 6, damage: '2d6+4' },
            { name: 'Cold Breath', type: 'save', desc: 'Recharge 5-6. Con Save DC 12, 15ft cone. Failure: 18 (4d8) cold. Success: Half.', saveDC: 12, saveAbility: 'CON', damage: '4d8' }
        ]
    }
];

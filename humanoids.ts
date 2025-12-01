
import { MonsterData } from '../../types';
import { stats } from './utils';

export const HUMANOIDS: MonsterData[] = [
    {
        id: 'acolyte',
        name: 'Priest Acolyte',
        type: 'Humanoid',
        size: 'Medium',
        ac: 13,
        hp: 11, // 2d8 + 2
        speed: 6, // 30ft
        stats: stats(14, 10, 12, 10, 14, 11),
        cr: 0.25,
        skills: ['Medicine', 'Religion'],
        gear: 'Chain Shirt, Holy Symbol, Mace',
        senses: 'Passive Perception 12',
        languages: 'Common',
        aiBehavior: 'caster',
        role: 'Bystander',
        lore: "A junior member of the clergy, training for the priesthood.",
        actions: [
            {
                name: 'Mace',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) Bludgeoning damage plus 2 (1d4) Radiant damage.',
                attackBonus: 4,
                damage: '1d6+2+1d4',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Radiant Flame',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +4, range 60 ft. Hit: 7 (2d6) Radiant damage.',
                attackBonus: 4,
                damage: '2d6',
                damageType: 'radiant',
                range: 60
            }
        ],
        spellcasting: {
            class: 'Cleric',
            level: 1,
            ability: 'wis',
            spells: ['Light', 'Thaumaturgy']
        },
        bonusActions: [
            {
                name: 'Divine Aid',
                type: 'ability',
                desc: '1/Day. The priest casts Bless, Healing Word, or Sanctuary, using Wisdom as the spellcasting ability.'
            }
        ]
    },
    {
        id: 'archmage',
        name: 'Archmage',
        type: 'Humanoid',
        size: 'Medium',
        ac: 17,
        hp: 170, // 31d8 + 31
        speed: 6, // 30ft
        stats: stats(10, 14, 12, 20, 15, 16),
        cr: 12,
        skills: ['Arcana', 'History', 'Perception'],
        immunities: ['psychic', 'charmed'],
        gear: 'Wand',
        senses: 'Passive Perception 16',
        languages: 'Common plus five other languages',
        aiBehavior: 'caster',
        role: 'Villain',
        lore: "A master of the arcane arts, wielding spells of devastating power.",
        traits: [
            { name: 'Magic Resistance', desc: 'The archmage has Advantage on saving throws against spells and other magical effects.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The archmage makes four Arcane Burst attacks.',
                multiattackActions: ['Arcane Burst', 'Arcane Burst', 'Arcane Burst', 'Arcane Burst']
            },
            {
                name: 'Arcane Burst',
                type: 'ranged',
                desc: 'Melee or Ranged Attack Roll: +9, reach 5 ft. or range 150 ft. Hit: 27 (4d10 + 5) Force damage.',
                attackBonus: 9,
                damage: '4d10+5',
                damageType: 'force',
                range: 150
            }
        ],
        spellcasting: {
            class: 'Wizard',
            level: 18,
            ability: 'int',
            spells: ['Detect Magic', 'Detect Thoughts', 'Disguise Self', 'Invisibility', 'Light', 'Mage Armor', 'Mage Hand', 'Prestidigitation', 'Fly', 'Lightning Bolt', 'Cone of Cold', 'Mind Blank', 'Scrying', 'Teleport'],
            slots: {
                '7': { current: 2, max: 2 }, // For Lightning Bolt level 7
                '9': { current: 1, max: 1 }  // For Cone of Cold level 9
            }
        },
        bonusActions: [
            {
                name: 'Misty Step',
                type: 'ability',
                desc: '3/Day. The mage casts Misty Step, using Intelligence as the spellcasting ability.'
            }
        ],
        reactions: [
            {
                name: 'Protective Magic',
                type: 'ability',
                desc: '3/Day. The archmage casts Counterspell or Shield in response to the spell\'s trigger.'
            }
        ]
    },
    {
        id: 'assassin',
        name: 'Assassin',
        type: 'Humanoid',
        size: 'Medium',
        ac: 16,
        hp: 97, // 15d8 + 30
        speed: 6, // 30ft
        stats: stats(11, 18, 14, 16, 11, 10),
        cr: 8,
        skills: ['Acrobatics', 'Perception', 'Stealth'],
        resistances: ['poison'],
        gear: 'Light Crossbow, Shortsword, Studded Leather Armor',
        senses: 'Passive Perception 16',
        languages: 'Common, Thieves\' Cant',
        aiBehavior: 'lurker',
        role: 'Adversary',
        lore: "A cold-blooded killer for hire, expert in poisons and stealth.",
        traits: [
            { name: 'Evasion', desc: 'If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds on the save and only half damage if it fails.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The assassin makes three attacks, using Shortsword or Light Crossbow in any combination.',
                multiattackActions: ['Shortsword', 'Shortsword', 'Shortsword']
            },
            {
                name: 'Shortsword',
                type: 'melee',
                desc: 'Melee Attack Roll: +7, reach 5 ft. Hit: 7 (1d6 + 4) Piercing damage plus 17 (5d6) Poison damage, and the target has the Poisoned condition until the start of the assassin\'s next turn.',
                attackBonus: 7,
                damage: '1d6+4+5d6',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Light Crossbow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +7, range 80/320 ft. Hit: 8 (1d8 + 4) Piercing damage plus 21 (6d6) Poison damage.',
                attackBonus: 7,
                damage: '1d8+4+6d6',
                damageType: 'piercing',
                range: 80
            }
        ],
        bonusActions: [
            {
                name: 'Cunning Action',
                type: 'ability',
                desc: 'The assassin takes the Dash, Disengage, or Hide action.'
            }
        ]
    },
    {
        id: 'bandit',
        name: 'Bandit',
        type: 'Humanoid',
        size: 'Medium',
        ac: 12,
        hp: 11, // 2d8 + 2
        speed: 6, // 30ft
        stats: stats(11, 12, 12, 10, 10, 10),
        cr: 0.125,
        gear: 'Leather Armor, Light Crossbow, Scimitar',
        senses: 'Passive Perception 10',
        languages: 'Common, Thieves\' Cant',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A common highwayman seeking coin from travelers.",
        actions: [
            {
                name: 'Scimitar',
                type: 'melee',
                desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 4 (1d6 + 1) Slashing damage.',
                attackBonus: 3,
                damage: '1d6+1',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Light Crossbow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +3, range 80/320 ft. Hit: 5 (1d8 + 1) Piercing damage.',
                attackBonus: 3,
                damage: '1d8+1',
                damageType: 'piercing',
                range: 80
            }
        ]
    },
    {
        id: 'bandit_captain',
        name: 'Bandit Captain',
        type: 'Humanoid',
        size: 'Medium',
        ac: 15,
        hp: 52, // 8d8 + 16
        speed: 6, // 30ft
        stats: stats(15, 16, 14, 14, 11, 14),
        cr: 2,
        skills: ['Athletics', 'Deception'],
        gear: 'Pistol, Scimitar, Studded Leather Armor',
        senses: 'Passive Perception 10',
        languages: 'Common, Thieves\' Cant',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A charismatic and skilled leader of outlaws.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The bandit makes two attacks, using Scimitar and Pistol in any combination.',
                multiattackActions: ['Scimitar', 'Pistol']
            },
            {
                name: 'Scimitar',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 6 (1d6 + 3) Slashing damage.',
                attackBonus: 5,
                damage: '1d6+3',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Pistol',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +5, range 30/90 ft. Hit: 8 (1d10 + 3) Piercing damage.',
                attackBonus: 5,
                damage: '1d10+3',
                damageType: 'piercing',
                range: 30
            }
        ],
        reactions: [
            {
                name: 'Parry',
                type: 'ability',
                desc: 'Trigger: The bandit is hit by a melee attack roll while holding a weapon. Response: The bandit adds 2 to its AC against that attack, possibly causing it to miss.'
            }
        ]
    },
    {
        id: 'berserker',
        name: 'Berserker',
        type: 'Humanoid',
        size: 'Medium',
        ac: 13,
        hp: 67, // 9d8 + 27
        speed: 6, // 30ft
        stats: stats(16, 12, 17, 9, 11, 9),
        cr: 2,
        gear: 'Greataxe, Hide Armor',
        senses: 'Passive Perception 10',
        languages: 'Common',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A wild warrior who fights with reckless abandon.",
        traits: [
            { name: 'Bloodied Frenzy', desc: 'While Bloodied, the berserker has Advantage on attack rolls and saving throws.' }
        ],
        actions: [
            {
                name: 'Greataxe',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 9 (1d12 + 3) Slashing damage.',
                attackBonus: 5,
                damage: '1d12+3',
                damageType: 'slashing',
                reach: 5
            }
        ]
    },
    {
        id: 'commoner',
        name: 'Commoner',
        type: 'Humanoid',
        size: 'Medium',
        ac: 10,
        hp: 4, // 1d8
        speed: 6, // 30ft
        stats: stats(10, 10, 10, 10, 10, 10),
        cr: 0,
        gear: 'Club',
        senses: 'Passive Perception 10',
        languages: 'Common',
        aiBehavior: 'defensive',
        role: 'Civilian',
        lore: "An ordinary person, typically having no combat training.",
        traits: [
            { name: 'Training', desc: 'The commoner has proficiency in one skill of the GM\'s choice and has Advantage whenever it makes an ability check using that skill.' }
        ],
        actions: [
            {
                name: 'Club',
                type: 'melee',
                desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 2 (1d4) Bludgeoning damage.',
                attackBonus: 2,
                damage: '1d4',
                damageType: 'bludgeoning',
                reach: 5
            }
        ]
    },
    {
        id: 'cultist',
        name: 'Cultist',
        type: 'Humanoid',
        size: 'Medium',
        ac: 12,
        hp: 9, // 2d8
        speed: 6, // 30ft
        stats: stats(11, 12, 10, 10, 11, 10),
        cr: 0.125,
        skills: ['Deception', 'Religion'],
        gear: 'Leather Armor, Sickle',
        senses: 'Passive Perception 10',
        languages: 'Common',
        aiBehavior: 'minion',
        role: 'Adversary',
        lore: "A devoted follower of a dark power or forbidden god.",
        actions: [
            {
                name: 'Ritual Sickle',
                type: 'melee',
                desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 3 (1d4 + 1) Slashing damage plus 1 Necrotic damage.',
                attackBonus: 3,
                damage: '1d4+1+1',
                damageType: 'slashing',
                reach: 5
            }
        ]
    },
    {
        id: 'cultist_fanatic',
        name: 'Cultist Fanatic',
        type: 'Humanoid',
        size: 'Medium',
        ac: 13,
        hp: 44, // 8d8 + 8
        speed: 6, // 30ft
        stats: stats(11, 14, 12, 10, 14, 13),
        cr: 2,
        skills: ['Deception', 'Persuasion', 'Religion'],
        gear: 'Holy Symbol, Leather Armor',
        senses: 'Passive Perception 12',
        languages: 'Common',
        aiBehavior: 'caster',
        role: 'Adversary',
        lore: "A charismatic leader who inspires cultists to violence.",
        actions: [
            {
                name: 'Pact Blade',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 6 (1d8 + 2) Slashing damage plus 7 (2d6) Necrotic damage.',
                attackBonus: 4,
                damage: '1d8+2+2d6',
                damageType: 'slashing',
                reach: 5
            }
        ],
        spellcasting: {
            class: 'Cleric',
            level: 5,
            ability: 'wis',
            spells: ['Light', 'Thaumaturgy', 'Command', 'Hold Person']
        },
        bonusActions: [
            {
                name: 'Spiritual Weapon',
                type: 'ability',
                desc: '2/Day. The cultist casts the Spiritual Weapon spell, using Wisdom as the spellcasting ability.'
            }
        ]
    },
    {
        id: 'druid_npc',
        name: 'Druid',
        type: 'Humanoid',
        size: 'Medium',
        ac: 13,
        hp: 44, // 8d8 + 8
        speed: 6, // 30ft
        stats: stats(10, 12, 13, 12, 16, 11),
        cr: 2,
        skills: ['Medicine', 'Nature', 'Perception'],
        gear: 'Studded Leather Armor',
        senses: 'Passive Perception 15',
        languages: 'Common, Druidic, Sylvan',
        aiBehavior: 'caster',
        role: 'Guide',
        lore: "A priest of the old faith, wielding the powers of nature.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The druid makes two attacks, using Vine Staff or Verdant Wisp in any combination.',
                multiattackActions: ['Vine Staff', 'Verdant Wisp']
            },
            {
                name: 'Vine Staff',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 7 (1d8 + 3) Bludgeoning damage plus 2 (1d4) Poison damage.',
                attackBonus: 5,
                damage: '1d8+3+1d4',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Verdant Wisp',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +5, range 90 ft. Hit: 10 (3d6) Radiant damage.',
                attackBonus: 5,
                damage: '3d6',
                damageType: 'radiant',
                range: 90
            }
        ],
        spellcasting: {
            class: 'Druid',
            level: 5,
            ability: 'wis',
            spells: ['Druidcraft', 'Speak with Animals', 'Entangle', 'Thunderwave', 'Animal Messenger', 'Longstrider', 'Moonbeam']
        }
    },
    {
        id: 'gladiator',
        name: 'Gladiator',
        type: 'Humanoid',
        size: 'Medium',
        ac: 16,
        hp: 112, // 15d8 + 45
        speed: 6, // 30ft
        stats: stats(18, 15, 16, 10, 12, 15),
        cr: 5,
        skills: ['Athletics', 'Performance'],
        gear: 'Shield, Spears (3), Studded Leather Armor',
        senses: 'Passive Perception 11',
        languages: 'Common',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A professional combatant who fights for entertainment.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The gladiator makes three Spear attacks. It can replace one attack with a use of Shield Bash.',
                multiattackActions: ['Spear', 'Spear', 'Spear']
            },
            {
                name: 'Spear',
                type: 'melee',
                desc: 'Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. Hit: 11 (2d6 + 4) Piercing damage.',
                attackBonus: 7,
                damage: '2d6+4',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Shield Bash',
                type: 'save',
                desc: 'Strength Saving Throw: DC 15, one creature within 5 feet that the gladiator can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.',
                saveDC: 15,
                saveAbility: 'STR',
                damage: '2d4+4',
                damageType: 'bludgeoning'
            }
        ],
        reactions: [
            {
                name: 'Parry',
                type: 'ability',
                desc: 'Trigger: The gladiator is hit by a melee attack roll while holding a weapon. Response: The gladiator adds 3 to its AC against that attack, possibly causing it to miss.'
            }
        ]
    },
    {
        id: 'guard',
        name: 'Guard',
        type: 'Humanoid',
        size: 'Medium',
        ac: 16,
        hp: 11, // 2d8 + 2
        speed: 6, // 30ft
        stats: stats(13, 12, 12, 10, 11, 10),
        cr: 0.125,
        skills: ['Perception'],
        gear: 'Chain Shirt, Shield, Spear',
        senses: 'Passive Perception 12',
        languages: 'Common',
        aiBehavior: 'defensive',
        role: 'Civilian',
        lore: "A sentinel who watches over a town or fortification.",
        actions: [
            {
                name: 'Spear',
                type: 'melee',
                desc: 'Melee or Ranged Attack Roll: +3, reach 5 ft. or range 20/60 ft. Hit: 4 (1d6 + 1) Piercing damage.',
                attackBonus: 3,
                damage: '1d6+1',
                damageType: 'piercing',
                reach: 5
            }
        ]
    },
    {
        id: 'guard_captain',
        name: 'Guard Captain',
        type: 'Humanoid',
        size: 'Medium',
        ac: 18,
        hp: 75, // 10d8 + 30
        speed: 6, // 30ft
        stats: stats(18, 14, 16, 12, 14, 13),
        cr: 4,
        skills: ['Athletics', 'Perception'],
        gear: 'Breastplate, Javelins (6), Longsword, Shield',
        senses: 'Passive Perception 14',
        languages: 'Common',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "An officer who leads guards and soldiers.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The guard makes two attacks, using Javelin or Longsword in any combination.',
                multiattackActions: ['Javelin', 'Longsword']
            },
            {
                name: 'Javelin',
                type: 'ranged',
                desc: 'Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. Hit: 14 (3d6 + 4) Piercing damage.',
                attackBonus: 6,
                damage: '3d6+4',
                damageType: 'piercing',
                range: 30
            },
            {
                name: 'Longsword',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 15 (2d10 + 4) Slashing damage.',
                attackBonus: 6,
                damage: '2d10+4',
                damageType: 'slashing',
                reach: 5
            }
        ]
    },
    {
        id: 'knight',
        name: 'Knight',
        type: 'Humanoid',
        size: 'Medium',
        ac: 18,
        hp: 52, // 8d8 + 16
        speed: 6, // 30ft
        stats: stats(16, 11, 14, 11, 11, 15),
        cr: 3,
        immunities: ['frightened'],
        gear: 'Greatsword, Heavy Crossbow, Plate Armor',
        senses: 'Passive Perception 10',
        languages: 'Common plus one other language',
        aiBehavior: 'aggressive',
        role: 'Ally',
        lore: "A warrior who has sworn service to a sovereign or order.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The knight makes two attacks, using Greatsword or Heavy Crossbow in any combination.',
                multiattackActions: ['Greatsword', 'Heavy Crossbow']
            },
            {
                name: 'Greatsword',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage plus 4 (1d8) Radiant damage.',
                attackBonus: 5,
                damage: '2d6+3+1d8',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Heavy Crossbow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +2, range 100/400 ft. Hit: 11 (2d10) Piercing damage plus 4 (1d8) Radiant damage.',
                attackBonus: 2,
                damage: '2d10+1d8',
                damageType: 'piercing',
                range: 100
            }
        ],
        reactions: [
            {
                name: 'Parry',
                type: 'ability',
                desc: 'Trigger: The knight is hit by a melee attack roll while holding a weapon. Response: The knight adds 2 to its AC against that attack, possibly causing it to miss.'
            }
        ]
    },
    {
        id: 'mage',
        name: 'Mage',
        type: 'Humanoid',
        size: 'Medium',
        ac: 15,
        hp: 81, // 18d8
        speed: 6, // 30ft
        stats: stats(9, 14, 11, 17, 12, 11),
        cr: 6,
        skills: ['Arcana', 'History', 'Perception'],
        gear: 'Wand',
        senses: 'Passive Perception 14',
        languages: 'Common plus three other languages',
        aiBehavior: 'caster',
        role: 'Adversary',
        lore: "An arcane spellcaster who has studied magic formally.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The mage makes three Arcane Burst attacks.',
                multiattackActions: ['Arcane Burst', 'Arcane Burst', 'Arcane Burst']
            },
            {
                name: 'Arcane Burst',
                type: 'ranged',
                desc: 'Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. Hit: 16 (3d8 + 3) Force damage.',
                attackBonus: 6,
                damage: '3d8+3',
                damageType: 'force',
                range: 120
            }
        ],
        spellcasting: {
            class: 'Wizard',
            level: 9,
            ability: 'int',
            spells: ['Detect Magic', 'Light', 'Mage Armor', 'Mage Hand', 'Prestidigitation', 'Fireball', 'Invisibility', 'Cone of Cold', 'Fly'],
            slots: { '4': { current: 2, max: 2 }, '5': { current: 1, max: 1 } }
        },
        bonusActions: [
            {
                name: 'Misty Step',
                type: 'ability',
                desc: '3/Day. The mage casts Misty Step, using Intelligence as the spellcasting ability.'
            }
        ],
        reactions: [
            {
                name: 'Protective Magic',
                type: 'ability',
                desc: '3/Day. The mage casts Counterspell or Shield in response to the spell\'s trigger.'
            }
        ]
    },
    {
        id: 'noble',
        name: 'Noble',
        type: 'Humanoid',
        size: 'Medium',
        ac: 15,
        hp: 9, // 2d8
        speed: 6, // 30ft
        stats: stats(11, 12, 11, 12, 14, 16),
        cr: 0.125,
        skills: ['Deception', 'Insight', 'Persuasion'],
        gear: 'Breastplate, Rapier',
        senses: 'Passive Perception 12',
        languages: 'Common plus two other languages',
        aiBehavior: 'defensive',
        role: 'Bystander',
        lore: "A person of high birth or rank.",
        actions: [
            {
                name: 'Rapier',
                type: 'melee',
                desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 5 (1d8 + 1) Piercing damage.',
                attackBonus: 3,
                damage: '1d8+1',
                damageType: 'piercing',
                reach: 5
            }
        ],
        reactions: [
            {
                name: 'Parry',
                type: 'ability',
                desc: 'Trigger: The noble is hit by a melee attack roll while holding a weapon. Response: The noble adds 2 to its AC against that attack, possibly causing it to miss.'
            }
        ]
    },
    {
        id: 'pirate',
        name: 'Pirate',
        type: 'Humanoid',
        size: 'Medium',
        ac: 14,
        hp: 33, // 6d8 + 6
        speed: 6, // 30ft
        stats: stats(10, 16, 12, 8, 12, 14),
        cr: 1,
        gear: 'Daggers (6), Leather Armor',
        senses: 'Passive Perception 11',
        languages: 'Common plus one other language',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A sea reaver who plunders ships and coastal towns.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The pirate makes two Dagger attacks. It can replace one attack with a use of Enthralling Panache.',
                multiattackActions: ['Dagger', 'Dagger', 'Enthralling Panache']
            },
            {
                name: 'Dagger',
                type: 'melee',
                desc: 'Melee or Ranged Attack Roll: +5, reach 5 ft. or range 20/60 ft. Hit: 5 (1d4 + 3) Piercing damage.',
                attackBonus: 5,
                damage: '1d4+3',
                damageType: 'piercing',
                range: 20
            },
            {
                name: 'Enthralling Panache',
                type: 'save',
                desc: 'Wisdom Saving Throw: DC 12, one creature the pirate can see within 30 feet. Failure: The target has the Charmed condition until the start of the pirate\'s next turn.',
                saveDC: 12,
                saveAbility: 'WIS',
                damage: '0',
                range: 30
            }
        ]
    },
    {
        id: 'pirate_captain',
        name: 'Pirate Captain',
        type: 'Humanoid',
        size: 'Medium',
        ac: 17,
        hp: 84, // 13d8 + 26
        speed: 6, // 30ft
        stats: stats(10, 18, 14, 10, 14, 17),
        cr: 6,
        skills: ['Acrobatics', 'Perception'],
        gear: 'Pistol, Rapier',
        senses: 'Passive Perception 15',
        languages: 'Common plus one other language',
        aiBehavior: 'aggressive',
        role: 'Villain',
        lore: "A daring and skilled leader of a pirate crew.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The pirate makes three attacks, using Rapier or Pistol in any combination.',
                multiattackActions: ['Rapier', 'Rapier', 'Pistol']
            },
            {
                name: 'Rapier',
                type: 'melee',
                desc: 'Melee Attack Roll: +7, reach 5 ft. Hit: 13 (2d8 + 4) Piercing damage, and the pirate has Advantage on the next attack roll it makes before the end of this turn.',
                attackBonus: 7,
                damage: '2d8+4',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Pistol',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +7, range 30/90 ft. Hit: 15 (2d10 + 4) Piercing damage.',
                attackBonus: 7,
                damage: '2d10+4',
                damageType: 'piercing',
                range: 30
            }
        ],
        bonusActions: [
            {
                name: 'Captain\'s Charm',
                type: 'save',
                desc: 'Wisdom Saving Throw: DC 14, one creature the pirate can see within 30 feet. Failure: The target has the Charmed condition until the start of the pirate\'s next turn.',
                saveDC: 14,
                saveAbility: 'WIS',
                damage: '0',
                range: 30
            }
        ],
        reactions: [
            {
                name: 'Riposte',
                type: 'ability',
                desc: 'Trigger: The pirate is hit by a melee attack roll while holding a weapon. Response: The pirate adds 3 to its AC against that attack, possibly causing it to miss. On a miss, the pirate makes one Rapier attack against the triggering creature if within range.'
            }
        ]
    },
    {
        id: 'priest',
        name: 'Priest',
        type: 'Humanoid',
        size: 'Medium',
        ac: 13,
        hp: 38, // 7d8 + 7
        speed: 6, // 30ft
        stats: stats(16, 10, 12, 13, 16, 13),
        cr: 2,
        skills: ['Medicine', 'Perception', 'Religion'],
        gear: 'Chain Shirt, Holy Symbol, Mace',
        senses: 'Passive Perception 15',
        languages: 'Common plus one other language',
        aiBehavior: 'caster',
        role: 'Ally',
        lore: "A devout follower of a deity, capable of channeling divine power.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The priest makes two attacks, using Mace or Radiant Flame in any combination.',
                multiattackActions: ['Mace', 'Radiant Flame']
            },
            {
                name: 'Mace',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.',
                attackBonus: 5,
                damage: '1d6+3+2d4',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Radiant Flame',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +5, range 60 ft. Hit: 11 (2d10) Radiant damage.',
                attackBonus: 5,
                damage: '2d10',
                damageType: 'radiant',
                range: 60
            }
        ],
        spellcasting: {
            class: 'Cleric',
            level: 5,
            ability: 'wis',
            spells: ['Light', 'Thaumaturgy', 'Spirit Guardians']
        },
        bonusActions: [
            {
                name: 'Divine Aid',
                type: 'ability',
                desc: '3/Day. The priest casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using Wisdom as the spellcasting ability.'
            }
        ]
    },
    {
        id: 'scout',
        name: 'Scout',
        type: 'Humanoid',
        size: 'Medium',
        ac: 13,
        hp: 16, // 3d8 + 3
        speed: 6, // 30ft
        stats: stats(11, 14, 12, 11, 13, 11),
        cr: 0.5,
        skills: ['Nature', 'Perception', 'Stealth', 'Survival'],
        gear: 'Leather Armor, Longbow, Shortsword',
        senses: 'Passive Perception 15',
        languages: 'Common plus one other language',
        aiBehavior: 'lurker',
        role: 'Guide',
        lore: "A skilled wilderness explorer and tracker.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The scout makes two attacks, using Shortsword and Longbow in any combination.',
                multiattackActions: ['Shortsword', 'Longbow']
            },
            {
                name: 'Shortsword',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage.',
                attackBonus: 4,
                damage: '1d6+2',
                damageType: 'piercing',
                reach: 5
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
        ]
    },
    {
        id: 'spy',
        name: 'Spy',
        type: 'Humanoid',
        size: 'Medium',
        ac: 12,
        hp: 27, // 6d8
        speed: 6, // 30ft
        stats: stats(10, 15, 10, 12, 14, 16),
        cr: 1,
        skills: ['Deception', 'Insight', 'Investigation', 'Perception', 'Sleight of Hand', 'Stealth'],
        gear: 'Hand Crossbow, Shortsword, Thieves\' Tools',
        senses: 'Passive Perception 16',
        languages: 'Common plus one other language',
        aiBehavior: 'lurker',
        role: 'Adversary',
        lore: "An agent of espionage, skilled in subterfuge and infiltration.",
        actions: [
            {
                name: 'Shortsword',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.',
                attackBonus: 4,
                damage: '1d6+2+2d6',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Hand Crossbow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +4, range 30/120 ft. Hit: 5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.',
                attackBonus: 4,
                damage: '1d6+2+2d6',
                damageType: 'piercing',
                range: 30
            }
        ],
        bonusActions: [
            {
                name: 'Cunning Action',
                type: 'ability',
                desc: 'The spy takes the Dash, Disengage, or Hide action.'
            }
        ]
    },
    {
        id: 'tough',
        name: 'Tough',
        type: 'Humanoid',
        size: 'Medium',
        ac: 12,
        hp: 32, // 5d8 + 10
        speed: 6, // 30ft
        stats: stats(15, 12, 14, 10, 10, 11),
        cr: 0.5,
        gear: 'Heavy Crossbow, Leather Armor, Mace',
        senses: 'Passive Perception 10',
        languages: 'Common',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "A street thug or mercenary who relies on brute force.",
        traits: [
            { name: 'Pack Tactics', desc: 'The tough has Advantage on an attack roll against a creature if at least one of the tough\'s allies is within 5 feet of the creature and the ally doesn\'t have the Incapacitated condition.' }
        ],
        actions: [
            {
                name: 'Mace',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) Bludgeoning damage.',
                attackBonus: 4,
                damage: '1d6+2',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Heavy Crossbow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +3, range 100/400 ft. Hit: 6 (1d10 + 1) Piercing damage.',
                attackBonus: 3,
                damage: '1d10+1',
                damageType: 'piercing',
                range: 100
            }
        ]
    },
    {
        id: 'tough_boss',
        name: 'Tough Boss',
        type: 'Humanoid',
        size: 'Medium',
        ac: 16,
        hp: 82, // 11d8 + 33
        speed: 6, // 30ft
        stats: stats(17, 14, 16, 11, 10, 11),
        cr: 4,
        gear: 'Chain Mail, Heavy Crossbow, Warhammer',
        senses: 'Passive Perception 10',
        languages: 'Common plus one other language',
        aiBehavior: 'aggressive',
        role: 'Villain',
        lore: "A leader of thugs and criminals, commanding through strength and intimidation.",
        traits: [
            { name: 'Pack Tactics', desc: 'The tough has Advantage on an attack roll against a creature if at least one of the tough\'s allies is within 5 feet of the creature and the ally doesn\'t have the Incapacitated condition.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The tough makes two attacks, using Warhammer or Heavy Crossbow in any combination.',
                multiattackActions: ['Warhammer', 'Heavy Crossbow']
            },
            {
                name: 'Warhammer',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 12 (2d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, the tough pushes the target up to 10 feet straight away from itself.',
                attackBonus: 5,
                damage: '2d8+3',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Heavy Crossbow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +4, range 100/400 ft. Hit: 13 (2d10 + 2) Piercing damage.',
                attackBonus: 4,
                damage: '2d10+2',
                damageType: 'piercing',
                range: 100
            }
        ]
    },
    {
        id: 'warrior_infantry',
        name: 'Warrior Infantry',
        type: 'Humanoid',
        size: 'Medium',
        ac: 13,
        hp: 9, // 2d8
        speed: 6, // 30ft
        stats: stats(13, 11, 11, 8, 11, 8),
        cr: 0.125,
        gear: 'Chain Shirt, Spear',
        senses: 'Passive Perception 10',
        languages: 'Common',
        aiBehavior: 'minion',
        role: 'Civilian',
        lore: "A rank-and-file soldier trained for war.",
        traits: [
            { name: 'Pack Tactics', desc: 'The warrior has Advantage on an attack roll against a creature if at least one of the warrior\'s allies is within 5 feet of the creature and the ally doesn\'t have the Incapacitated condition.' }
        ],
        actions: [
            {
                name: 'Spear',
                type: 'melee',
                desc: 'Melee or Ranged Attack Roll: +3, reach 5 ft. or range 20/60 ft. Hit: 4 (1d6 + 1) Piercing damage.',
                attackBonus: 3,
                damage: '1d6+1',
                damageType: 'piercing',
                reach: 5
            }
        ]
    },
    {
        id: 'warrior_veteran',
        name: 'Warrior Veteran',
        type: 'Humanoid',
        size: 'Medium',
        ac: 17,
        hp: 65, // 10d8 + 20
        speed: 6, // 30ft
        stats: stats(16, 13, 14, 10, 11, 10),
        cr: 3,
        skills: ['Athletics', 'Perception'],
        gear: 'Greatsword, Heavy Crossbow, Splint Armor',
        senses: 'Passive Perception 12',
        languages: 'Common plus one other language',
        aiBehavior: 'aggressive',
        role: 'Adversary',
        lore: "An experienced soldier who has survived many battles.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The warrior makes two Greatsword or Heavy Crossbow attacks.',
                multiattackActions: ['Greatsword', 'Heavy Crossbow']
            },
            {
                name: 'Greatsword',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage.',
                attackBonus: 5,
                damage: '2d6+3',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Heavy Crossbow',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +3, range 100/400 ft. Hit: 12 (2d10 + 1) Piercing damage.',
                attackBonus: 3,
                damage: '2d10+1',
                damageType: 'piercing',
                range: 100
            }
        ],
        reactions: [
            {
                name: 'Parry',
                type: 'ability',
                desc: 'Trigger: The warrior is hit by a melee attack roll while holding a weapon. Response: The warrior adds 2 to its AC against that attack, possibly causing it to miss.'
            }
        ]
    }
];

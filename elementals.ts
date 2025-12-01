
import { MonsterData } from '../../types';
import { stats } from './utils';

export const ELEMENTALS: MonsterData[] = [
    {
        id: 'air_elemental',
        name: 'Air Elemental',
        type: 'Elemental',
        size: 'Large',
        ac: 15,
        hp: 90, // 12d10 + 24
        speed: 2, // 10ft, Fly 90ft (hover)
        stats: stats(14, 20, 14, 6, 10, 6),
        cr: 5,
        resistances: ['lightning', 'thunder', 'bludgeoning', 'piercing', 'slashing'],
        immunities: ['poison'],
        conditionImmunities: ['exhaustion', 'grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained', 'unconscious'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'Primordial (Auran)',
        aiBehavior: 'aggressive',
        lore: "A funneling cloud of whirling air.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The elemental makes two Thunderous Slam attacks.',
                multiattackActions: ['Thunderous Slam', 'Thunderous Slam']
            },
            {
                name: 'Thunderous Slam',
                type: 'melee',
                desc: 'Melee Attack Roll: +8, reach 10 ft. Hit: 14 (2d8 + 5) Thunder damage.',
                attackBonus: 8,
                damage: '2d8+5',
                damageType: 'thunder',
                reach: 10
            },
            {
                name: 'Whirlwind',
                type: 'save',
                desc: 'Recharge 4-6. Strength Saving Throw: DC 13, one Medium or smaller creature in the elemental\'s space. Failure: 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the elemental and has the Prone condition. Success: Half damage only.',
                damage: '4d10+2',
                damageType: 'thunder',
                saveDC: 13,
                saveAbility: 'STR'
            }
        ],
        traits: [
            { name: 'Air Form', desc: 'The elemental can enter a creature\'s space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.' }
        ]
    },
    {
        id: 'azer_sentinel',
        name: 'Azer Sentinel',
        type: 'Elemental',
        size: 'Medium',
        ac: 17,
        hp: 39, // 6d8 + 12
        speed: 6, // 30ft
        stats: stats(17, 12, 15, 12, 13, 10),
        cr: 2,
        immunities: ['fire', 'poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Passive Perception 11',
        languages: 'Primordial (Ignan)',
        aiBehavior: 'defensive',
        lore: "A dwarf-like being of elemental fire, encased in bronze.",
        actions: [
            {
                name: 'Burning Hammer',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 8 (1d10 + 3) Bludgeoning damage plus 3 (1d6) Fire damage.',
                attackBonus: 5,
                damage: '1d10+3+1d6',
                damageType: 'fire',
                reach: 5
            }
        ],
        traits: [
            { name: 'Fire Aura', desc: 'At the end of each of the azer\'s turns, each creature of the azer\'s choice in a 5-foot Emanation originating from the azer takes 5 (1d10) Fire damage.' },
            { name: 'Illumination', desc: 'The azer sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.' }
        ]
    },
    {
        id: 'djinni',
        name: 'Djinni',
        type: 'Elemental',
        size: 'Large',
        ac: 17,
        hp: 218, // 19d10 + 114
        speed: 6, // 30ft, Fly 90ft
        stats: stats(21, 15, 22, 15, 16, 20),
        cr: 11,
        immunities: ['lightning', 'thunder'],
        senses: 'Darkvision 120ft, Passive Perception 13',
        languages: 'Primordial (Auran)',
        aiBehavior: 'caster',
        lore: "A genie from the Elemental Plane of Air.",
        traits: [
            { name: 'Elemental Restoration', desc: 'If the djinni dies outside the Elemental Plane of Air, its body dissolves into mist, and it gains a new body in 1d4 days in the Plane of Air.' },
            { name: 'Magic Resistance', desc: 'The djinni has Advantage on saving throws against spells and other magical effects.' },
            { name: 'Wishes', desc: 'Can cast Wish 3 times for non-genies (recharge 365 days).' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The djinni makes three attacks, using Storm Blade or Storm Bolt in any combination.',
                multiattackActions: ['Storm Blade', 'Storm Blade', 'Storm Bolt']
            },
            {
                name: 'Storm Blade',
                type: 'melee',
                desc: 'Melee Attack Roll: +9, reach 5 ft. Hit: 12 (2d6 + 5) Slashing damage plus 7 (2d6) Lightning damage.',
                attackBonus: 9,
                damage: '2d6+5+2d6',
                damageType: 'lightning',
                reach: 5
            },
            {
                name: 'Storm Bolt',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +9, range 120 ft. Hit: 13 (3d8) Thunder damage. If the target is a Large or smaller creature, it has the Prone condition.',
                attackBonus: 9,
                damage: '3d8',
                damageType: 'thunder',
                range: 120
            },
            {
                name: 'Create Whirlwind',
                type: 'ability',
                desc: 'Conjures a whirlwind in a 20-foot-radius, 60-foot-high Cylinder. Requires Concentration. Creatures entering must make DC 17 Str Save. Failure: Restrained and takes 21 (6d6) Thunder damage at start of turns.',
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 17,
            ability: 'cha',
            spells: ['Detect Evil and Good', 'Detect Magic', 'Create Food and Water', 'Tongues', 'Wind Walk', 'Creation', 'Gaseous Form', 'Invisibility', 'Major Image', 'Plane Shift']
        }
    },
    {
        id: 'dust_mephit',
        name: 'Dust Mephit',
        type: 'Elemental',
        size: 'Small',
        ac: 12,
        hp: 17, // 5d6
        speed: 6, // 30ft, Fly 30ft
        stats: stats(5, 14, 10, 9, 11, 10),
        cr: 0.5,
        skills: ['Perception', 'Stealth'],
        vulnerabilities: ['fire'],
        immunities: ['poison'],
        conditionImmunities: ['exhaustion', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 12',
        languages: 'Primordial (Auran, Terran)',
        aiBehavior: 'lurker',
        lore: "A small, winged elemental composed of dust and earth.",
        actions: [
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 4 (1d4 + 2) Slashing damage.',
                attackBonus: 4,
                damage: '1d4+2',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Blinding Breath',
                type: 'save',
                desc: 'Recharge 6. Dexterity Saving Throw: DC 10, each creature in a 15-foot Cone. Failure: The target has the Blinded condition until the end of the mephit\'s next turn.',
                saveDC: 10,
                saveAbility: 'DEX',
                damage: '0',
                range: 15
            },
            {
                name: 'Sleep',
                type: 'ability',
                desc: '1/Day. The mephit casts the Sleep spell, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 10).'
            }
        ],
        traits: [
            { name: 'Death Burst', desc: 'The mephit explodes when it dies. Dexterity Saving Throw: DC 10, each creature in a 5-foot Emanation originating from the mephit. Failure: 5 (2d4) Bludgeoning damage. Success: Half damage.' }
        ]
    },
    {
        id: 'earth_elemental',
        name: 'Earth Elemental',
        type: 'Elemental',
        size: 'Large',
        ac: 17,
        hp: 147, // 14d10 + 70
        speed: 6, // 30ft, Burrow 30ft
        stats: stats(20, 8, 20, 5, 10, 5),
        cr: 5,
        vulnerabilities: ['thunder'],
        resistances: ['bludgeoning', 'piercing', 'slashing'],
        immunities: ['poison'],
        conditionImmunities: ['exhaustion', 'paralyzed', 'petrified', 'poisoned', 'unconscious'],
        senses: 'Darkvision 60ft, Tremorsense 60ft, Passive Perception 10',
        languages: 'Primordial (Terran)',
        aiBehavior: 'aggressive',
        lore: "A walking hill of earth and stone.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The elemental makes two attacks, using Slam or Rock Launch in any combination.',
                multiattackActions: ['Slam', 'Rock Launch']
            },
            {
                name: 'Slam',
                type: 'melee',
                desc: 'Melee Attack Roll: +8, reach 10 ft. Hit: 14 (2d8 + 5) Bludgeoning damage.',
                attackBonus: 8,
                damage: '2d8+5',
                damageType: 'bludgeoning',
                reach: 10
            },
            {
                name: 'Rock Launch',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +8, range 60 ft. Hit: 8 (1d6 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.',
                attackBonus: 8,
                damage: '1d6+5',
                damageType: 'bludgeoning',
                range: 60
            }
        ],
        traits: [
            { name: 'Earth Glide', desc: 'The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn\'t disturb the material it moves through.' },
            { name: 'Siege Monster', desc: 'The elemental deals double damage to objects and structures.' }
        ]
    },
    {
        id: 'efreeti',
        name: 'Efreeti',
        type: 'Elemental',
        size: 'Large',
        ac: 17,
        hp: 212, // 17d10 + 119
        speed: 8, // 40ft, Fly 60ft (hover)
        stats: stats(22, 12, 24, 16, 15, 19),
        cr: 11,
        immunities: ['fire'],
        senses: 'Darkvision 120ft, Passive Perception 12',
        languages: 'Primordial (Ignan)',
        aiBehavior: 'caster',
        lore: "A hulking genie of the Elemental Plane of Fire, master of flame.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The efreeti makes three attacks, using Heated Blade or Hurl Flame in any combination.',
                multiattackActions: ['Heated Blade', 'Heated Blade', 'Hurl Flame']
            },
            {
                name: 'Heated Blade',
                type: 'melee',
                desc: 'Melee Attack Roll: +10, reach 5 ft. Hit: 13 (2d6 + 6) Slashing damage plus 13 (2d12) Fire damage.',
                attackBonus: 10,
                damage: '2d6+6+2d12',
                damageType: 'fire',
                reach: 5
            },
            {
                name: 'Hurl Flame',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +8, range 120 ft. Hit: 24 (7d6) Fire damage.',
                attackBonus: 8,
                damage: '7d6',
                damageType: 'fire',
                range: 120
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 15,
            ability: 'cha',
            spells: ['Detect Magic', 'Elementalism', 'Gaseous Form', 'Invisibility', 'Major Image', 'Plane Shift', 'Tongues', 'Wall of Fire']
        },
        traits: [
            { name: 'Elemental Restoration', desc: 'If the efreeti dies outside the Elemental Plane of Fire, its body dissolves into ash, and it gains a new body in 1d4 days in the Plane of Fire.' },
            { name: 'Magic Resistance', desc: 'The efreeti has Advantage on saving throws against spells and other magical effects.' },
            { name: 'Wishes', desc: 'Can cast Wish 3 times for non-genies (recharge 365 days).' }
        ]
    },
    {
        id: 'fire_elemental',
        name: 'Fire Elemental',
        type: 'Elemental',
        size: 'Large',
        ac: 13,
        hp: 93, // 11d10 + 33
        speed: 10, // 50ft
        stats: stats(10, 17, 16, 6, 10, 7),
        cr: 5,
        resistances: ['bludgeoning', 'piercing', 'slashing'],
        immunities: ['fire', 'poison'],
        conditionImmunities: ['exhaustion', 'grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained', 'unconscious'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'Primordial (Ignan)',
        aiBehavior: 'aggressive',
        lore: "A pillar of living fire.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The elemental makes two Burn attacks.',
                multiattackActions: ['Burn', 'Burn']
            },
            {
                name: 'Burn',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 10 (2d6 + 3) Fire damage. If the target is a creature or a flammable object, it starts burning.',
                attackBonus: 6,
                damage: '2d6+3',
                damageType: 'fire',
                reach: 5
            }
        ],
        traits: [
            { name: 'Fire Aura', desc: 'At the end of each of the elemental\'s turns, each creature in a 10-foot Emanation originating from the elemental takes 5 (1d10) Fire damage. Creatures and flammable objects in the Emanation start burning.' },
            { name: 'Fire Form', desc: 'The elemental can move through a space as narrow as 1 inch without expending extra movement to do so, and it can enter a creature\'s space and stop there. The first time it enters a creature\'s space on a turn, that creature takes 5 (1d10) Fire damage.' },
            { name: 'Illumination', desc: 'The elemental sheds Bright Light in a 30-foot radius and Dim Light for an additional 30 feet.' },
            { name: 'Water Susceptibility', desc: 'The elemental takes 3 (1d6) Cold damage for every 5 feet the elemental moves in water or for every gallon of water splashed on it.' }
        ]
    },
    {
        id: 'gargoyle',
        name: 'Gargoyle',
        type: 'Elemental',
        size: 'Medium',
        ac: 15,
        hp: 67, // 9d8 + 27
        speed: 6, // 30ft, Fly 60ft
        stats: stats(15, 11, 16, 6, 11, 7),
        cr: 2,
        skills: ['Stealth'],
        immunities: ['poison'],
        conditionImmunities: ['exhaustion', 'petrified', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'Primordial (Terran)',
        aiBehavior: 'aggressive',
        lore: "A vicious predator made of living stone.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The gargoyle makes two Claw attacks.',
                multiattackActions: ['Claw', 'Claw']
            },
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 7 (2d4 + 2) Slashing damage.',
                attackBonus: 4,
                damage: '2d4+2',
                damageType: 'slashing',
                reach: 5
            }
        ],
        traits: [
            { name: 'Flyby', desc: 'The gargoyle doesn\'t provoke an Opportunity Attack when it flies out of an enemy\'s reach.' }
        ]
    },
    {
        id: 'ice_mephit',
        name: 'Ice Mephit',
        type: 'Elemental',
        size: 'Small',
        ac: 11,
        hp: 21, // 6d6
        speed: 6, // 30ft, Fly 30ft
        stats: stats(7, 13, 10, 9, 11, 12),
        cr: 0.5,
        skills: ['Perception', 'Stealth'],
        vulnerabilities: ['fire'],
        immunities: ['cold', 'poison'],
        conditionImmunities: ['exhaustion', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 12',
        languages: 'Primordial (Aquan, Auran)',
        aiBehavior: 'lurker',
        lore: "A small, winged elemental composed of ice and snow.",
        actions: [
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 3 (1d4 + 1) Slashing damage plus 2 (1d4) Cold damage.',
                attackBonus: 3,
                damage: '1d4+1+1d4',
                damageType: 'cold',
                reach: 5
            },
            {
                name: 'Frost Breath',
                type: 'save',
                desc: 'Recharge 6. Constitution Saving Throw: DC 10, each creature in a 15-foot Cone. Failure: 7 (3d4) Cold damage. Success: Half damage.',
                saveDC: 10,
                saveAbility: 'CON',
                damage: '3d4',
                damageType: 'cold',
                range: 15
            },
            {
                name: 'Fog Cloud',
                type: 'ability',
                desc: '1/Day. The mephit casts Fog Cloud, requiring no spell components and using Charisma as the spellcasting ability.'
            }
        ],
        traits: [
            { name: 'Death Burst', desc: 'The mephit explodes when it dies. Constitution Saving Throw: DC 10, each creature in a 5-foot Emanation originating from the mephit. Failure: 5 (2d4) Cold damage. Success: Half damage.' }
        ]
    },
    {
        id: 'invisible_stalker',
        name: 'Invisible Stalker',
        type: 'Elemental',
        size: 'Large',
        ac: 14,
        hp: 97, // 13d10 + 26
        speed: 10, // 50ft, Fly 50ft (hover)
        stats: stats(16, 19, 14, 10, 15, 11),
        cr: 6,
        skills: ['Perception', 'Stealth'],
        resistances: ['bludgeoning', 'piercing', 'slashing'],
        immunities: ['poison'],
        conditionImmunities: ['exhaustion', 'grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained', 'unconscious'],
        senses: 'Darkvision 60ft, Passive Perception 18',
        languages: 'Common, Primordial (Auran)',
        aiBehavior: 'aggressive',
        lore: "An invisible air elemental summoned to track and kill.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The stalker makes three Wind Swipe attacks. It can replace one attack with a use of Vortex.',
                multiattackActions: ['Wind Swipe', 'Wind Swipe', 'Wind Swipe']
            },
            {
                name: 'Wind Swipe',
                type: 'melee',
                desc: 'Melee Attack Roll: +7, reach 5 ft. Hit: 11 (2d6 + 4) Force damage.',
                attackBonus: 7,
                damage: '2d6+4',
                damageType: 'force',
                reach: 5
            },
            {
                name: 'Vortex',
                type: 'save',
                desc: 'Constitution Saving Throw: DC 14, one Large or smaller creature in the stalker\'s space. Failure: 7 (1d8 + 3) Thunder damage, and the target has the Grappled condition (escape DC 13). Until the grapple ends, the target can\'t cast spells with a Verbal component and takes 7 (2d6) Thunder damage at the start of each of the stalker\'s turns.',
                saveDC: 14,
                saveAbility: 'CON',
                damage: '1d8+3',
                damageType: 'thunder',
                range: 0
            }
        ],
        traits: [
            { name: 'Air Form', desc: 'The stalker can enter an enemy\'s space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.' },
            { name: 'Invisibility', desc: 'The stalker has the Invisible condition.' }
        ]
    },
    {
        id: 'magma_mephit',
        name: 'Magma Mephit',
        type: 'Elemental',
        size: 'Small',
        ac: 11,
        hp: 18, // 4d6 + 4
        speed: 6, // 30ft, Fly 30ft
        stats: stats(8, 12, 12, 7, 10, 10),
        cr: 0.5,
        skills: ['Stealth'],
        vulnerabilities: ['cold'],
        immunities: ['fire', 'poison'],
        conditionImmunities: ['exhaustion', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'Primordial (Ignan, Terran)',
        aiBehavior: 'aggressive',
        lore: "A small, winged elemental composed of earth and fire.",
        actions: [
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Attack Roll: +3, reach 5 ft. Hit: 3 (1d4 + 1) Slashing damage plus 3 (1d6) Fire damage.',
                attackBonus: 3,
                damage: '1d4+1+1d6',
                damageType: 'fire',
                reach: 5
            },
            {
                name: 'Fire Breath',
                type: 'save',
                desc: 'Recharge 6. Dexterity Saving Throw: DC 11, each creature in a 15-foot Cone. Failure: 7 (2d6) Fire damage. Success: Half damage.',
                saveDC: 11,
                saveAbility: 'DEX',
                damage: '2d6',
                damageType: 'fire',
                range: 15
            }
        ],
        traits: [
            { name: 'Death Burst', desc: 'The mephit explodes when it dies. Dexterity Saving Throw: DC 11, each creature in a 5-foot Emanation originating from the mephit. Failure: 7 (2d6) Fire damage. Success: Half damage.' }
        ]
    },
    {
        id: 'magmin',
        name: 'Magmin',
        type: 'Elemental',
        size: 'Small',
        ac: 14,
        hp: 13, // 3d6 + 3
        speed: 6, // 30ft
        stats: stats(7, 15, 12, 8, 11, 10),
        cr: 0.5,
        immunities: ['fire'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'Primordial (Ignan)',
        aiBehavior: 'aggressive',
        lore: "A small, fire-infused elemental that delights in burning things.",
        actions: [
            {
                name: 'Touch',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 7 (2d4 + 2) Fire damage. If the target is a creature or a flammable object that isn\'t being worn or carried, it starts burning.',
                attackBonus: 4,
                damage: '2d4+2',
                damageType: 'fire',
                reach: 5
            }
        ],
        bonusActions: [
            { name: 'Ignited Illumination', type: 'ability', desc: 'The magmin sets itself ablaze or extinguishes its flames. While ablaze, the magmin sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.' }
        ],
        traits: [
            { name: 'Death Burst', desc: 'The magmin explodes when it dies. Dexterity Saving Throw: DC 11, each creature in a 10-foot Emanation originating from the magmin. Failure: 7 (2d6) Fire damage. Success: Half damage.' }
        ]
    },
    {
        id: 'salamander',
        name: 'Salamander',
        type: 'Elemental',
        size: 'Large',
        ac: 15,
        hp: 90, // 12d10 + 24
        speed: 6, // 30ft, Climb 30ft
        stats: stats(18, 14, 15, 11, 10, 12),
        cr: 5,
        vulnerabilities: ['cold'],
        immunities: ['fire'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'Primordial (Ignan)',
        aiBehavior: 'aggressive',
        lore: "A serpentine creature of living fire.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The salamander makes two Flame Spear attacks. It can replace one attack with a use of Constrict.',
                multiattackActions: ['Flame Spear', 'Flame Spear']
            },
            {
                name: 'Flame Spear',
                type: 'melee',
                desc: 'Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. Hit: 13 (2d8 + 4) Piercing damage plus 7 (2d6) Fire damage. Hit or Miss: The spear magically returns to the salamander\'s hand immediately after a ranged attack.',
                attackBonus: 7,
                damage: '2d8+4+2d6',
                damageType: 'fire',
                reach: 5
            },
            {
                name: 'Constrict',
                type: 'save',
                desc: 'Strength Saving Throw: DC 15, one Large or smaller creature the salamander can see within 10 feet. Failure: 11 (2d6 + 4) Bludgeoning damage plus 7 (2d6) Fire damage. The target has the Grappled condition (escape DC 14), and it has the Restrained condition until the grapple ends.',
                saveDC: 15,
                saveAbility: 'STR',
                damage: '2d6+4+2d6',
                damageType: 'fire',
                range: 10
            }
        ],
        traits: [
            { name: 'Fire Aura', desc: 'At the end of each of the salamander\'s turns, each creature of the salamander\'s choice in a 5-foot Emanation originating from the salamander takes 7 (2d6) Fire damage.' }
        ]
    },
    {
        id: 'steam_mephit',
        name: 'Steam Mephit',
        type: 'Elemental',
        size: 'Small',
        ac: 10,
        hp: 17, // 5d6
        speed: 6, // 30ft, Fly 30ft
        stats: stats(5, 11, 10, 11, 10, 12),
        cr: 0.25,
        skills: ['Stealth'],
        immunities: ['fire', 'poison'],
        conditionImmunities: ['exhaustion', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'Primordial (Aquan, Ignan)',
        aiBehavior: 'lurker',
        lore: "A small, winged elemental composed of steam.",
        actions: [
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 2 (1d4) Slashing damage plus 2 (1d4) Fire damage.',
                attackBonus: 2,
                damage: '1d4+1d4',
                damageType: 'fire',
                reach: 5
            },
            {
                name: 'Steam Breath',
                type: 'save',
                desc: 'Recharge 6. Constitution Saving Throw: DC 10, each creature in a 15-foot Cone. Failure: 5 (2d4) Fire damage, and the target\'s Speed decreases by 10 feet until the end of the mephit\'s next turn. Success: Half damage only.',
                saveDC: 10,
                saveAbility: 'CON',
                damage: '2d4',
                damageType: 'fire',
                range: 15
            }
        ],
        traits: [
            { name: 'Blurred Form', desc: 'Attack rolls against the mephit are made with Disadvantage unless the mephit has the Incapacitated condition.' },
            { name: 'Death Burst', desc: 'The mephit explodes when it dies. Dexterity Saving Throw: DC 10, each creature in a 5-foot Emanation originating from the mephit. Failure: 5 (2d4) Fire damage. Success: Half damage.' }
        ]
    },
    {
        id: 'water_elemental',
        name: 'Water Elemental',
        type: 'Elemental',
        size: 'Large',
        ac: 14,
        hp: 114, // 12d10 + 48
        speed: 6, // 30ft, Swim 90ft
        stats: stats(18, 14, 18, 5, 10, 8),
        cr: 5,
        resistances: ['acid', 'bludgeoning', 'piercing', 'slashing'],
        immunities: ['poison'],
        conditionImmunities: ['exhaustion', 'grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained', 'unconscious'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'Primordial (Aquan)',
        aiBehavior: 'aggressive',
        lore: "A cresting wave that rolls across the ground.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The elemental makes two Slam attacks.',
                multiattackActions: ['Slam', 'Slam']
            },
            {
                name: 'Slam',
                type: 'melee',
                desc: 'Melee Attack Roll: +7, reach 5 ft. Hit: 13 (2d8 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.',
                attackBonus: 7,
                damage: '2d8+4',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Whelm',
                type: 'save',
                desc: 'Recharge 4-6. Strength Saving Throw: DC 15, each creature in the elemental\'s space. Failure: 22 (4d8 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). Until the grapple ends, the target has the Restrained condition, is suffocating unless it can breathe water, and takes 9 (2d8) Bludgeoning damage at the start of each of the elemental\'s turns. The elemental can grapple one Large creature or up to two Medium or smaller creatures at a time with Whelm. As an action, a creature within 5 feet of the elemental can pull a creature out of it by succeeding on a DC 14 Strength (Athletics) check. Success: Half damage only.',
                damage: '4d8+4',
                damageType: 'bludgeoning',
                saveDC: 15,
                saveAbility: 'STR'
            }
        ],
        traits: [
            { name: 'Water Form', desc: 'The elemental can enter a hostile creature\'s space and stop there. It can move through a space as narrow as 1 inch wide without squeezing.' },
            { name: 'Freeze', desc: 'If the elemental takes Cold damage, its Speed decreases by 20 feet until the end of its next turn.' }
        ]
    },
    {
        id: 'xorn',
        name: 'Xorn',
        type: 'Elemental',
        size: 'Medium',
        ac: 19,
        hp: 84, // 8d8 + 48
        speed: 4, // 20ft, Burrow 20ft
        stats: stats(17, 10, 22, 11, 10, 11),
        cr: 5,
        skills: ['Perception', 'Stealth'],
        immunities: ['poison'],
        conditionImmunities: ['paralyzed', 'petrified', 'poisoned'],
        senses: 'Darkvision 60ft, Tremorsense 60ft, Passive Perception 16',
        languages: 'Primordial (Terran)',
        aiBehavior: 'defensive',
        lore: "A strange, three-legged creature that eats precious metals.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The xorn makes one Bite attack and three Claw attacks.',
                multiattackActions: ['Bite', 'Claw', 'Claw', 'Claw']
            },
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 17 (4d6 + 3) Piercing damage.',
                attackBonus: 6,
                damage: '4d6+3',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 8 (1d10 + 3) Slashing damage.',
                attackBonus: 6,
                damage: '1d10+3',
                damageType: 'slashing',
                reach: 5
            }
        ],
        bonusActions: [
            { name: 'Charge', type: 'ability', desc: 'The xorn moves up to its Speed or Burrow Speed straight toward an enemy it can sense.' }
        ],
        traits: [
            { name: 'Earth Glide', desc: 'The xorn can burrow through nonmagical, unworked earth and stone. While doing so, the xorn doesn\'t disturb the material it moves through.' },
            { name: 'Treasure Sense', desc: 'The xorn can pinpoint the location of precious metals and stones within 60 feet of itself.' }
        ]
    }
];

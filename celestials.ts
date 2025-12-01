
import { MonsterData } from '../../types';
import { stats } from './utils';

export const CELESTIALS: MonsterData[] = [
    {
        id: 'pegasus',
        name: 'Pegasus',
        type: 'Celestial',
        size: 'Large',
        ac: 12,
        hp: 59, // 7d10 + 21
        speed: 12, // 60ft, Fly 90ft
        stats: stats(18, 15, 16, 10, 15, 13),
        cr: 2,
        skills: ['Perception'],
        senses: 'Passive Perception 16',
        languages: 'Understands Celestial, Common, Elvish, and Sylvan but can\'t speak',
        aiBehavior: 'defensive',
        lore: "A magnificent winged horse. They are wild and shy, serving only good-aligned creatures.",
        actions: [
            {
                name: 'Hooves',
                type: 'melee',
                desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage plus 5 (2d4) radiant damage.',
                attackBonus: 6,
                damage: '1d6+4+2d4',
                damageType: 'radiant', // Mixed, but primary effect
                reach: 5
            }
        ]
    },
    {
        id: 'couatl',
        name: 'Couatl',
        type: 'Celestial',
        size: 'Medium',
        ac: 19,
        hp: 60, // 8d8 + 24
        speed: 6, // 30ft, Fly 90ft
        stats: stats(16, 20, 17, 18, 20, 18),
        cr: 4,
        resistances: ['bludgeoning', 'piercing', 'slashing'],
        immunities: ['psychic', 'radiant'],
        senses: 'Truesight 120ft, Passive Perception 15',
        languages: 'All, Telepathy 120ft',
        aiBehavior: 'caster',
        lore: "A serpentine celestial known for its beauty, goodness, and wisdom.",
        traits: [
             { name: 'Shielded Mind', desc: 'The couatl\'s thoughts can\'t be read by any means, and other creatures can communicate with it telepathically only if it allows them.' }
        ],
        actions: [
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (1d12 + 5) piercing damage, and the target has the Poisoned condition until the end of the couatl\'s next turn.',
                attackBonus: 7,
                damage: '1d12+5',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Constrict',
                type: 'save',
                desc: 'Strength Saving Throw: DC 15, one Medium or smaller creature the couatl can see within 5 feet. Failure: 8 (1d6 + 5) bludgeoning damage. The target has the Grappled condition (escape DC 13), and it has the Restrained condition until the grapple ends.',
                saveDC: 15,
                saveAbility: 'STR',
                damage: '1d6+5',
                damageType: 'bludgeoning'
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 9,
            ability: 'wis', // SRD 5.2.1 says Wisdom
            spells: ['Detect Evil and Good', 'Detect Magic', 'Detect Thoughts', 'Shapechange', 'Create Food and Water', 'Dream', 'Greater Restoration', 'Scrying', 'Sleep']
        },
        bonusActions: [
            {
                name: 'Divine Aid',
                type: 'ability',
                desc: '2/Day. The couatl casts Bless, Lesser Restoration, or Sanctuary, requiring no spell components and using the same spellcasting ability as Spellcasting.'
            }
        ]
    },
    {
        id: 'guardian_naga',
        name: 'Guardian Naga',
        type: 'Celestial',
        size: 'Large',
        ac: 18,
        hp: 136, // 16d10 + 48
        speed: 8, // 40ft, Climb 40ft, Swim 40ft
        stats: stats(19, 18, 16, 16, 19, 18),
        cr: 10,
        skills: ['Arcana', 'History', 'Religion'],
        immunities: ['poison'],
        conditionImmunities: ['charmed', 'paralyzed', 'poisoned', 'restrained'],
        senses: 'Darkvision 60ft, Passive Perception 14',
        languages: 'Celestial, Common',
        aiBehavior: 'caster',
        lore: "A wise, snake-like celestial that guards sacred places.",
        traits: [
            { name: 'Celestial Restoration', desc: 'If the naga dies, it returns to life in 1d6 days and regains all its Hit Points unless Dispel Evil and Good is cast on its remains.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The naga makes two Bite attacks. It can replace any attack with a use of Poisonous Spittle.',
                multiattackActions: ['Bite', 'Bite']
            },
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Attack Roll: +8, reach 10 ft. Hit: 17 (2d12 + 4) Piercing damage plus 22 (4d10) Poison damage.',
                attackBonus: 8,
                damage: '2d12+4+4d10',
                damageType: 'piercing',
                reach: 10
            },
            {
                name: 'Poisonous Spittle',
                type: 'save',
                desc: 'Constitution Saving Throw: DC 16, one creature the naga can see within 60 feet. Failure: 31 (7d8) Poison damage, and the target has the Blinded condition until the start of the naga\'s next turn. Success: Half damage only.',
                saveDC: 16,
                saveAbility: 'CON',
                damage: '7d8',
                damageType: 'poison',
                range: 60
            }
        ],
        spellcasting: {
            class: 'Cleric',
            level: 11,
            ability: 'wis',
            spells: ['Thaumaturgy', 'Clairvoyance', 'Cure Wounds', 'Flame Strike', 'Geas', 'True Seeing']
        }
    },
    {
        id: 'deva',
        name: 'Deva',
        type: 'Celestial',
        size: 'Medium',
        ac: 17,
        hp: 229, // 27d8 + 108
        speed: 6, // 30ft, Fly 90ft (hover)
        stats: stats(18, 18, 18, 17, 20, 20),
        cr: 10,
        skills: ['Insight', 'Perception'],
        resistances: ['radiant'],
        immunities: ['charmed', 'exhaustion', 'frightened'],
        senses: 'Darkvision 120ft, Passive Perception 19',
        languages: 'All, Telepathy 120ft',
        aiBehavior: 'caster',
        lore: "Angels that act as divine messengers or agents of good deities.",
        traits: [
            { name: 'Exalted Restoration', desc: 'If the deva dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its Hit Points somewhere in Mount Celestia.' },
            { name: 'Magic Resistance', desc: 'The deva has Advantage on saving throws against spells and other magical effects.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The deva makes two Holy Mace attacks.',
                multiattackActions: ['Holy Mace', 'Holy Mace']
            },
            {
                name: 'Holy Mace',
                type: 'melee',
                desc: 'Melee Attack Roll: +8, reach 5 ft. Hit: 7 (1d6 + 4) Bludgeoning damage plus 18 (4d8) Radiant damage.',
                attackBonus: 8,
                damage: '1d6+4+4d8', 
                damageType: 'radiant',
                reach: 5
            }
        ],
        spellcasting: {
             class: 'Innate',
             level: 10,
             ability: 'cha',
             spells: ['Detect Evil and Good', 'Shapechange', 'Commune', 'Raise Dead']
        },
        bonusActions: [
            {
                name: 'Divine Aid',
                type: 'ability',
                desc: '2/Day. The deva casts Cure Wounds, Lesser Restoration, or Remove Curse, using the same spellcasting ability as Spellcasting.'
            }
        ]
    },
    {
        id: 'planetar',
        name: 'Planetar',
        type: 'Celestial',
        size: 'Large',
        ac: 19,
        hp: 262, // 21d10 + 147
        speed: 8, // 40ft, Fly 120ft (hover)
        stats: stats(24, 20, 24, 19, 22, 25),
        cr: 16,
        skills: ['Perception'],
        resistances: ['radiant'],
        immunities: ['charmed', 'exhaustion', 'frightened'],
        senses: 'Truesight 120ft, Passive Perception 21',
        languages: 'All, Telepathy 120ft',
        aiBehavior: 'aggressive',
        lore: "Powerful angels that act as the weapons of the gods.",
        traits: [
            { name: 'Divine Awareness', desc: 'The planetar knows if it hears a lie.' },
            { name: 'Exalted Restoration', desc: 'If the planetar dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its Hit Points somewhere in Mount Celestia.' },
            { name: 'Magic Resistance', desc: 'The planetar has Advantage on saving throws against spells and other magical effects.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The planetar makes three Radiant Sword attacks or uses Holy Burst twice.',
                multiattackActions: ['Radiant Sword', 'Radiant Sword', 'Radiant Sword']
            },
            {
                name: 'Radiant Sword',
                type: 'melee',
                desc: 'Melee Attack Roll: +12, reach 10 ft. Hit: 14 (2d6 + 7) Slashing damage plus 18 (4d8) Radiant damage.',
                attackBonus: 12,
                damage: '2d6+7+4d8',
                damageType: 'slashing',
                reach: 10
            },
            {
                name: 'Holy Burst',
                type: 'save',
                desc: 'Dexterity Saving Throw: DC 20, each enemy in a 20-foot-radius Sphere centered on a point the planetar can see within 120 feet. Failure: 24 (7d6) Radiant damage. Success: Half damage.',
                saveDC: 20,
                saveAbility: 'DEX',
                damage: '7d6',
                damageType: 'radiant',
                range: 120
            }
        ],
        spellcasting: {
             class: 'Innate',
             level: 16,
             ability: 'cha',
             spells: ['Detect Evil and Good', 'Commune', 'Control Weather', 'Dispel Evil and Good', 'Raise Dead']
        },
        bonusActions: [
            {
                name: 'Divine Aid',
                type: 'ability',
                desc: '2/Day. The planetar casts Cure Wounds, Invisibility, Lesser Restoration, or Remove Curse, using the same spellcasting ability as Spellcasting.'
            }
        ]
    },
    {
        id: 'solar',
        name: 'Solar',
        type: 'Celestial',
        size: 'Large',
        ac: 21,
        hp: 297, // 22d10 + 176
        speed: 10, // 50ft, Fly 150ft (hover)
        stats: stats(26, 22, 26, 25, 25, 30),
        cr: 21,
        skills: ['Perception'],
        immunities: ['poison', 'radiant', 'charmed', 'exhaustion', 'frightened', 'poisoned'],
        senses: 'Truesight 120ft, Passive Perception 24',
        languages: 'All, Telepathy 120ft',
        aiBehavior: 'caster',
        lore: "The mightiest of angels, solars serve deities of good as commanders and champions.",
        traits: [
            { name: 'Divine Awareness', desc: 'The solar knows if it hears a lie.' },
            { name: 'Exalted Restoration', desc: 'If the solar dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its Hit Points somewhere in Mount Celestia.' },
            { name: 'Legendary Resistance (4/Day)', desc: 'If the solar fails a saving throw, it can choose to succeed instead.' },
            { name: 'Magic Resistance', desc: 'The solar has Advantage on saving throws against spells and other magical effects.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The solar makes two Flying Sword attacks. It can replace one attack with a use of Slaying Bow.',
                multiattackActions: ['Flying Sword', 'Flying Sword']
            },
            {
                name: 'Flying Sword',
                type: 'melee',
                desc: 'Melee or Ranged Attack Roll: +15, reach 10 ft. or range 120 ft. Hit: 22 (4d6 + 8) Slashing damage plus 36 (8d8) Radiant damage. Hit or Miss: The sword magically returns to the solar\'s hand or hovers within 5 feet of the solar immediately after a ranged attack.',
                attackBonus: 15,
                damage: '4d6+8+8d8',
                damageType: 'radiant',
                reach: 10
            },
            {
                name: 'Slaying Bow',
                type: 'save',
                desc: 'Dexterity Saving Throw: DC 21, one creature the solar can see within 600 feet. Failure: If the creature has 100 Hit Points or fewer, it dies. It otherwise takes 24 (4d8 + 6) Piercing damage plus 36 (8d8) Radiant damage.',
                saveDC: 21,
                saveAbility: 'DEX',
                damage: '4d8+6+8d8',
                damageType: 'radiant',
                range: 600
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 18,
            ability: 'cha',
            spells: ['Detect Evil and Good', 'Commune', 'Control Weather', 'Dispel Evil and Good', 'Resurrection']
        },
        bonusActions: [
            {
                name: 'Divine Aid',
                type: 'ability',
                desc: '3/Day. The solar casts Cure Wounds (level 2 version), Lesser Restoration, or Remove Curse, using the same spellcasting ability as Spellcasting.'
            }
        ],
        legendaryActions: [
            { name: 'Blinding Gaze', type: 'save', desc: 'Constitution Saving Throw: DC 25, one creature the solar can see within 120 feet. Failure: The target has the Blinded condition for 1 minute. Failure or Success: The solar can\'t take this action again until the start of its next turn.', saveDC: 25, saveAbility: 'CON', damage: '0' },
            { name: 'Radiant Teleport', type: 'ability', desc: 'The solar teleports up to 60 feet to an unoccupied space it can see. Dexterity Saving Throw: DC 25, each creature in a 10-foot Emanation originating from the solar at its destination space. Failure: 11 (2d10) Radiant damage. Success: Half damage.', range: 12 }
        ]
    },
    {
        id: 'sphinx_wonder',
        name: 'Sphinx of Wonder',
        type: 'Celestial',
        size: 'Tiny',
        ac: 13,
        hp: 24, // 7d4 + 7
        speed: 4, // 20ft, Fly 40ft
        stats: stats(6, 17, 13, 15, 12, 11),
        cr: 1,
        skills: ['Arcana', 'Religion', 'Stealth'],
        resistances: ['necrotic', 'psychic', 'radiant'],
        senses: 'Darkvision 60ft, Passive Perception 11',
        languages: 'Celestial, Common',
        aiBehavior: 'defensive',
        lore: "A tiny celestial sphinx, often a messenger or riddle-bearer.",
        traits: [
             { name: 'Magic Resistance', desc: 'The sphinx has Advantage on saving throws against spells and other magical effects.' }
        ],
        actions: [
            {
                name: 'Rend',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 5 (1d4 + 3) Slashing damage plus 7 (2d6) Radiant damage.',
                attackBonus: 5,
                damage: '1d4+3+2d6',
                damageType: 'radiant',
                reach: 5
            }
        ],
        reactions: [
            { name: 'Burst of Ingenuity', type: 'ability', desc: '2/Day. Trigger: The sphinx or another creature within 30 feet makes an ability check or a saving throw. Response: The sphinx adds 2 to the roll.' }
        ]
    },
    {
        id: 'sphinx_lore',
        name: 'Sphinx of Lore',
        type: 'Celestial',
        size: 'Large',
        ac: 17,
        hp: 170, // 20d10 + 60
        speed: 8, // 40ft, Fly 60ft
        stats: stats(18, 15, 16, 18, 18, 18),
        cr: 11,
        skills: ['Arcana', 'History', 'Perception', 'Religion'],
        resistances: ['necrotic', 'radiant'],
        immunities: ['psychic', 'charmed', 'frightened'],
        senses: 'Truesight 120ft, Passive Perception 18',
        languages: 'Celestial, Common',
        aiBehavior: 'caster',
        lore: "A celestial guardian of ancient knowledge and secrets.",
        traits: [
            { name: 'Inscrutable', desc: 'No magic can observe the sphinx remotely or detect its thoughts without its permission. Wisdom (Insight) checks made to ascertain its intentions or sincerity are made with Disadvantage.' },
            { name: 'Legendary Resistance (3/Day, or 4/Day in Lair)', desc: 'If the sphinx fails a saving throw, it can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The sphinx makes three Claw attacks.',
                multiattackActions: ['Claw', 'Claw', 'Claw']
            },
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Attack Roll: +8, reach 5 ft. Hit: 14 (3d6 + 4) Slashing damage.',
                attackBonus: 8,
                damage: '3d6+4',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Mind-Rending Roar',
                type: 'save',
                desc: 'Recharge 5-6. Wisdom Saving Throw: DC 16, each enemy in a 300-foot Emanation originating from the sphinx. Failure: 35 (10d6) Psychic damage, and the target has the Incapacitated condition until the start of the sphinx\'s next turn.',
                saveDC: 16,
                saveAbility: 'WIS',
                damage: '10d6',
                damageType: 'psychic'
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 13, // Approximation based on spells
            ability: 'int',
            spells: ['Detect Magic', 'Identify', 'Mage Hand', 'Minor Illusion', 'Prestidigitation', 'Dispel Magic', 'Legend Lore', 'Locate Object', 'Plane Shift', 'Remove Curse', 'Tongues']
        },
        legendaryActions: [
            { name: 'Arcane Prowl', type: 'ability', desc: 'The sphinx can teleport up to 30 feet to an unoccupied space it can see, and it makes one Claw attack.' },
            { name: 'Weight of Years', type: 'save', desc: 'Constitution Saving Throw: DC 16, one creature the sphinx can see within 120 feet. Failure: The target gains 1 Exhaustion level. While the target has any Exhaustion levels, it appears 3d10 years older. Failure or Success: The sphinx can\'t take this action again until the start of its next turn.', saveDC: 16, saveAbility: 'CON', damage: '0' }
        ]
    },
    {
        id: 'sphinx_valor',
        name: 'Sphinx of Valor',
        type: 'Celestial',
        size: 'Large',
        ac: 17,
        hp: 199, // 19d10 + 95
        speed: 8, // 40ft, Fly 60ft
        stats: stats(22, 10, 20, 16, 23, 18),
        cr: 17,
        skills: ['Arcana', 'Perception', 'Religion'],
        resistances: ['necrotic', 'radiant'],
        immunities: ['psychic', 'charmed', 'frightened'],
        senses: 'Truesight 120ft, Passive Perception 22',
        languages: 'Celestial, Common',
        aiBehavior: 'aggressive',
        lore: "A powerful guardian sphinx devoted to lawful causes.",
        traits: [
             { name: 'Inscrutable', desc: 'No magic can observe the sphinx remotely or detect its thoughts without its permission. Wisdom (Insight) checks made to ascertain its intentions or sincerity are made with Disadvantage.' },
             { name: 'Legendary Resistance (3/Day, or 4/Day in Lair)', desc: 'If the sphinx fails a saving throw, it can choose to succeed instead.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The sphinx makes two Claw attacks and uses Roar.',
                multiattackActions: ['Claw', 'Claw', 'Roar']
            },
            {
                name: 'Claw',
                type: 'melee',
                desc: 'Melee Attack Roll: +12, reach 5 ft. Hit: 20 (4d6 + 6) Slashing damage.',
                attackBonus: 12,
                damage: '4d6+6',
                damageType: 'slashing',
                reach: 5
            },
            {
                name: 'Roar',
                type: 'ability',
                desc: '3/Day. The sphinx emits a magical roar with different effects. 1st: DC 20 Wis Save or Frightened (500ft). 2nd: DC 20 Wis Save or Paralyzed (500ft). 3rd: DC 20 Con Save, 44 (8d10) Thunder damage and Prone (half dmg on success).',
                range: 500
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 15,
            ability: 'wis',
            spells: ['Detect Evil and Good', 'Thaumaturgy', 'Detect Magic', 'Dispel Magic', 'Greater Restoration', 'Heroes\' Feast', 'Zone of Truth']
        },
        legendaryActions: [
            { name: 'Arcane Prowl', type: 'ability', desc: 'The sphinx can teleport up to 30 feet to an unoccupied space it can see, and it makes one Claw attack.' },
            { name: 'Weight of Years', type: 'save', desc: 'Constitution Saving Throw: DC 16, one creature the sphinx can see within 120 feet. Failure: The target gains 1 Exhaustion level. While the target has any Exhaustion levels, it appears 3d10 years older. Failure or Success: The sphinx can\'t take this action again until the start of its next turn.', saveDC: 16, saveAbility: 'CON', damage: '0' }
        ]
    },
    {
        id: 'unicorn',
        name: 'Unicorn',
        type: 'Celestial',
        size: 'Large',
        ac: 12,
        hp: 97, // 13d10 + 26
        speed: 10, // 50ft
        stats: stats(18, 14, 15, 11, 17, 16),
        cr: 5,
        immunities: ['poison'],
        conditionImmunities: ['charmed', 'paralyzed', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 13',
        languages: 'Celestial, Elvish, Sylvan, Telepathy 120ft',
        aiBehavior: 'caster',
        lore: "A magical creature resembling a horse with a single horn.",
        traits: [
             { name: 'Legendary Resistance (3/Day)', desc: 'If the unicorn fails a saving throw, it can choose to succeed instead.' },
             { name: 'Magic Resistance', desc: 'The unicorn has Advantage on saving throws against spells and other magical effects.' }
        ],
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The unicorn makes one Hooves attack and one Radiant Horn attack.',
                multiattackActions: ['Hooves', 'Radiant Horn']
            },
            {
                name: 'Hooves',
                type: 'melee',
                desc: 'Melee Attack Roll: +7, reach 5 ft. Hit: 11 (2d6 + 4) Bludgeoning damage.',
                attackBonus: 7,
                damage: '2d6+4',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Radiant Horn',
                type: 'melee',
                desc: 'Melee Attack Roll: +7, reach 5 ft. Hit: 9 (1d10 + 4) Radiant damage.',
                attackBonus: 7,
                damage: '1d10+4',
                damageType: 'radiant',
                reach: 5
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 5,
            ability: 'cha',
            spells: ['Detect Evil and Good', 'Druidcraft', 'Calm Emotions', 'Dispel Evil and Good', 'Entangle', 'Pass without Trace', 'Word of Recall']
        },
        bonusActions: [
            {
                name: 'Unicorn\'s Blessing',
                type: 'ability',
                desc: '3/Day. The unicorn touches another creature with its horn and casts Cure Wounds or Lesser Restoration on that creature, using the same spellcasting ability as Spellcasting.'
            }
        ],
        legendaryActions: [
             { name: 'Charging Horn', type: 'melee', desc: 'The unicorn moves up to half its Speed without provoking Opportunity Attacks, and it makes one Radiant Horn attack.', attackBonus: 7, damage: '1d10+4', damageType: 'radiant' },
             { name: 'Shimmering Shield', type: 'ability', desc: 'The unicorn targets itself or one creature it can see within 60 feet of itself. The target gains 10 (3d6) Temporary Hit Points, and its AC increases by 2 until the end of the unicorn\'s next turn. The unicorn can\'t take this action again until the start of its next turn.' }
        ]
    },
    {
        id: 'giant_eagle',
        name: 'Giant Eagle',
        type: 'Celestial',
        size: 'Large',
        ac: 13,
        hp: 26, // 4d10 + 4
        speed: 2, // 10ft, Fly 80ft
        stats: stats(16, 17, 13, 8, 14, 10),
        cr: 1,
        skills: ['Perception'],
        resistances: ['necrotic', 'radiant'],
        senses: 'Passive Perception 16',
        languages: 'Celestial; understands Common and Primordial (Auran) but can\'t speak them',
        aiBehavior: 'aggressive',
        lore: "A noble eagle the size of a horse.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The eagle makes two Rend attacks.',
                multiattackActions: ['Rend', 'Rend']
            },
            {
                name: 'Rend',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 5 (1d4 + 3) Slashing damage plus 3 (1d6) Radiant damage.',
                attackBonus: 5,
                damage: '1d4+3+1d6',
                damageType: 'radiant', // Mixed
                reach: 5
            }
        ],
        traits: [
             { name: 'Flyby', desc: 'The eagle doesn\'t provoke an Opportunity Attack when it flies out of an enemy\'s reach.' }
        ]
    },
    {
        id: 'giant_elk',
        name: 'Giant Elk',
        type: 'Celestial',
        size: 'Huge',
        ac: 14,
        hp: 42, // 5d12 + 10
        speed: 12, // 60ft
        stats: stats(19, 18, 14, 7, 14, 10),
        cr: 2,
        skills: ['Perception'],
        resistances: ['necrotic', 'radiant'],
        senses: 'Darkvision 90ft, Passive Perception 14',
        languages: 'Celestial; understands Common, Elvish, and Sylvan but can\'t speak them',
        aiBehavior: 'defensive',
        lore: "A majestic elk of immense size.",
        actions: [
            {
                name: 'Ram',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 10 ft. Hit: 11 (2d6 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage. If the target is a Huge or smaller creature and the elk moved 20+ feet straight toward it immediately before the hit, the target takes an extra 5 (2d4) Bludgeoning damage and has the Prone condition.',
                attackBonus: 6,
                damage: '2d6+4+2d4',
                damageType: 'bludgeoning',
                reach: 10
            }
        ]
    },
    {
        id: 'giant_owl',
        name: 'Giant Owl',
        type: 'Celestial',
        size: 'Large',
        ac: 12,
        hp: 19, // 3d10 + 3
        speed: 1, // 5ft, Fly 60ft
        stats: stats(13, 15, 12, 10, 14, 10),
        cr: 0.25,
        skills: ['Perception', 'Stealth'],
        resistances: ['necrotic', 'radiant'],
        senses: 'Darkvision 120ft, Passive Perception 16',
        languages: 'Celestial; understands Common, Elvish, and Sylvan but can\'t speak them',
        aiBehavior: 'defensive',
        lore: "An owl the size of a man, wise and silent.",
        traits: [
            { name: 'Flyby', desc: 'The owl doesn\'t provoke an Opportunity Attack when it flies out of an enemy\'s reach.' }
        ],
        actions: [
            {
                name: 'Talons',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 7 (1d10 + 2) Slashing damage.',
                attackBonus: 4,
                damage: '1d10+2',
                damageType: 'slashing',
                reach: 5
            }
        ],
        spellcasting: {
            class: 'Innate',
            level: 1,
            ability: 'wis',
            spells: ['Detect Evil and Good', 'Detect Magic', 'Clairvoyance']
        }
    }
];

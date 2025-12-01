
import { MonsterData } from '../../types';
import { stats } from './utils';

export const CONSTRUCTS: MonsterData[] = [
    {
        id: 'animated_armor',
        name: 'Animated Armor',
        type: 'Construct',
        size: 'Medium',
        ac: 18,
        hp: 33, // 6d8 + 6
        speed: 25,
        stats: stats(14, 11, 13, 1, 3, 1),
        cr: 1,
        immunities: ['poison', 'psychic'],
        conditionImmunities: ['blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'paralyzed', 'petrified', 'poisoned'],
        senses: 'Blindsight 60ft (blind beyond), Passive Perception 6',
        aiBehavior: 'minion',
        lore: "This empty steel suit clanks as it moves, heavy plates banging and grinding against one another.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The armor makes two Slam attacks.',
                multiattackActions: ['Slam', 'Slam']
            },
            {
                name: 'Slam',
                type: 'melee',
                desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) bludgeoning damage.',
                attackBonus: 4,
                damage: '1d6+2',
                damageType: 'bludgeoning',
                reach: 5
            }
        ],
        traits: [
            { name: 'Antimagic Susceptibility', desc: 'The armor is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the armor must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.' },
            { name: 'False Appearance', desc: 'While the armor remains motionless, it is indistinguishable from a normal suit of armor.' }
        ]
    },
    {
        id: 'animated_flying_sword',
        name: 'Animated Flying Sword',
        type: 'Construct',
        size: 'Small',
        ac: 17,
        hp: 14, // 4d6
        speed: 0, // Fly 50 (hover)
        stats: stats(12, 15, 11, 1, 5, 1),
        cr: 0.25,
        immunities: ['poison', 'psychic'],
        conditionImmunities: ['blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'paralyzed', 'petrified', 'poisoned'],
        senses: 'Blindsight 60ft (blind beyond), Passive Perception 7',
        aiBehavior: 'aggressive',
        lore: "A magical sword that fights on its own.",
        actions: [
             {
                name: 'Slash',
                type: 'melee',
                desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage.',
                attackBonus: 4,
                damage: '1d8+2',
                damageType: 'slashing',
                reach: 5
            }
        ],
        traits: [
            { name: 'Antimagic Susceptibility', desc: 'The sword is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the sword must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.' },
            { name: 'False Appearance', desc: 'While the sword remains motionless and isn\'t flying, it is indistinguishable from a normal sword.' }
        ]
    },
    {
        id: 'animated_rug_of_smothering',
        name: 'Animated Rug of Smothering',
        type: 'Construct',
        size: 'Large',
        ac: 12,
        hp: 27, // 5d10
        speed: 10, 
        stats: stats(17, 14, 10, 1, 3, 1),
        cr: 2,
        immunities: ['poison', 'psychic'],
        conditionImmunities: ['blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'paralyzed', 'petrified', 'poisoned'],
        senses: 'Blindsight 60ft (blind beyond), Passive Perception 6',
        aiBehavior: 'lurker',
        lore: "A carpet that attacks by smothering its victims.",
        actions: [
             {
                name: 'Smother',
                type: 'melee',
                desc: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one Medium or smaller creature. Hit: 10 (2d6 + 3) bludgeoning damage. The creature is grappled (escape DC 13). Until this grapple ends, the target is restrained, blinded, and at risk of suffocating. In addition, at the start of each of the target\'s turns, the target takes 10 (2d6 + 3) bludgeoning damage. The rug can smother only one creature at a time.',
                attackBonus: 5,
                damage: '0', // Damage is over time and on hit (initial)
                reach: 5
            }
        ],
        traits: [
            { name: 'Antimagic Susceptibility', desc: 'The rug is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the rug must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.' },
            { name: 'Damage Transfer', desc: 'While it is grappling a creature, the rug takes only half the damage dealt to it, and the creature grappled by the rug takes the other half.' },
            { name: 'False Appearance', desc: 'While the rug remains motionless, it is indistinguishable from a normal rug.' }
        ]
    },
    {
        id: 'clay_golem',
        name: 'Clay Golem',
        type: 'Construct',
        size: 'Large',
        ac: 14,
        hp: 123, // 13d10 + 52
        speed: 30, 
        stats: stats(20, 9, 18, 3, 8, 1),
        cr: 9,
        resistances: ['bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t adamantine'],
        immunities: ['acid', 'poison', 'psychic'],
        conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'paralyzed', 'petrified', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 9',
        languages: 'Understands the languages of its creator but can\'t speak',
        aiBehavior: 'aggressive',
        lore: "A golem sculpted from clay, animated by spirits from the Elemental Plane of Earth.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The golem makes two Slam attacks, or it makes three Slam attacks if it used Hasten this turn.',
                multiattackActions: ['Slam', 'Slam']
            },
            {
                name: 'Slam',
                type: 'melee',
                desc: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 10 (1d10 + 5) bludgeoning damage plus 6 (1d12) acid damage. Target\'s HP max reduced by acid damage taken (dies at 0).',
                attackBonus: 9,
                damage: '1d10+5+1d12',
                damageType: 'bludgeoning',
                reach: 5
            }
        ],
        bonusActions: [
             {
                name: 'Hasten',
                type: 'ability',
                desc: 'Recharge 5-6. The golem takes the Dash and Disengage actions.'
            }
        ],
        traits: [
            { name: 'Acid Absorption', desc: 'Whenever the golem is subjected to acid damage, it takes no damage and instead regains a number of hit points equal to the acid damage dealt.' },
            { name: 'Berserk', desc: 'Whenever the golem starts its turn Bloodied, roll 1d6. On a 6, it goes berserk. Attacks nearest creature/object. Continues until destroyed or no longer Bloodied.' },
            { name: 'Immutable Form', desc: 'The golem can\'t shape-shift.' },
            { name: 'Magic Resistance', desc: 'The golem has advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'flesh_golem',
        name: 'Flesh Golem',
        type: 'Construct',
        size: 'Medium',
        ac: 9,
        hp: 127, // 15d8 + 60
        speed: 30, 
        stats: stats(19, 9, 18, 6, 10, 5),
        cr: 5,
        immunities: ['lightning', 'poison'],
        conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'paralyzed', 'petrified', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'Understands the languages of its creator but can\'t speak',
        aiBehavior: 'aggressive',
        lore: "A ghoulish collection of stolen humanoid body parts, stitched together and animated by electricity.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The golem makes two Slam attacks.',
                multiattackActions: ['Slam', 'Slam']
            },
            {
                name: 'Slam',
                type: 'melee',
                desc: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage plus 4 (1d8) lightning damage.',
                attackBonus: 7,
                damage: '2d8+4+1d8',
                damageType: 'bludgeoning',
                reach: 5
            }
        ],
        traits: [
            { name: 'Aversion to Fire', desc: 'If the golem takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn.' },
            { name: 'Berserk', desc: 'Whenever the golem starts its turn Bloodied, roll 1d6. On a 6, it goes berserk. Attacks nearest creature/object. Continues until destroyed or no longer Bloodied. Creator can try to calm (DC 15 Persuasion).' },
            { name: 'Immutable Form', desc: 'The golem can\'t shape-shift.' },
            { name: 'Lightning Absorption', desc: 'Whenever the golem is subjected to lightning damage, it takes no damage and instead regains a number of hit points equal to the lightning damage dealt.' },
            { name: 'Magic Resistance', desc: 'The golem has advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'gorgon',
        name: 'Gorgon',
        type: 'Construct',
        size: 'Large',
        ac: 19,
        hp: 114, // 12d10 + 48
        speed: 40,
        stats: stats(20, 11, 18, 2, 12, 7),
        cr: 5,
        immunities: ['exhaustion', 'petrified'],
        senses: 'Darkvision 60ft, Passive Perception 17',
        languages: 'None',
        aiBehavior: 'aggressive',
        lore: "A metallic bull-like construct that breathes petrifying gas.",
        actions: [
            {
                name: 'Gore',
                type: 'melee',
                desc: 'Melee Attack Roll: +8, reach 5 ft. Hit: 18 (2d12 + 5) Piercing damage. If target is Large or smaller and gorgon moved 20+ ft straight toward it, target has Prone condition.',
                attackBonus: 8,
                damage: '2d12+5',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Petrifying Breath',
                type: 'save',
                desc: 'Recharge 5-6. Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. First Failure: Restrained. Repeats save at end of next turn. Second Failure: Petrified.',
                saveDC: 15,
                saveAbility: 'CON',
                damage: '0',
                range: 30
            }
        ],
        bonusActions: [
             {
                name: 'Trample',
                type: 'save',
                desc: 'Dexterity Saving Throw: DC 16, one creature within 5 feet that has the Prone condition. Failure: 16 (2d10 + 5) Bludgeoning damage. Success: Half damage.',
                saveDC: 16,
                saveAbility: 'DEX',
                damage: '2d10+5',
                damageType: 'bludgeoning'
            }
        ]
    },
    {
        id: 'iron_golem',
        name: 'Iron Golem',
        type: 'Construct',
        size: 'Large',
        ac: 20,
        hp: 252, // 24d10 + 120
        speed: 30,
        stats: stats(24, 9, 20, 3, 11, 1),
        cr: 16,
        immunities: ['fire', 'poison', 'psychic', 'bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t adamantine'],
        conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'paralyzed', 'petrified', 'poisoned'],
        senses: 'Darkvision 120ft, Passive Perception 10',
        languages: 'Understands the languages of its creator but can\'t speak',
        aiBehavior: 'aggressive',
        lore: "A massive golem made of iron, the strongest of the golems.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The golem makes two attacks, using Bladed Arm or Fiery Bolt in any combination.',
                multiattackActions: ['Bladed Arm', 'Fiery Bolt']
            },
            {
                name: 'Bladed Arm',
                type: 'melee',
                desc: 'Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 20 (3d8 + 7) slashing damage plus 10 (3d6) fire damage.',
                attackBonus: 12,
                damage: '3d8+7+3d6',
                damageType: 'slashing',
                reach: 10
            },
            {
                name: 'Fiery Bolt',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +10, range 120 ft. Hit: 36 (8d8) Fire damage.',
                attackBonus: 10,
                damage: '8d8',
                damageType: 'fire',
                range: 120
            },
            {
                name: 'Poison Breath',
                type: 'save',
                desc: 'Recharge 6. Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 55 (10d10) Poison damage. Success: Half damage.',
                damage: '10d10',
                damageType: 'poison',
                saveDC: 18,
                saveAbility: 'CON'
            }
        ],
        traits: [
            { name: 'Fire Absorption', desc: 'Whenever the golem is subjected to fire damage, it takes no damage and instead regains a number of hit points equal to the fire damage dealt.' },
            { name: 'Immutable Form', desc: 'The golem can\'t shape-shift.' },
            { name: 'Magic Resistance', desc: 'The golem has advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'stone_golem',
        name: 'Stone Golem',
        type: 'Construct',
        size: 'Large',
        ac: 18,
        hp: 220, // 21d10 + 105
        speed: 30,
        stats: stats(22, 9, 20, 3, 11, 1),
        cr: 10,
        immunities: ['poison', 'psychic', 'bludgeoning, piercing, and slashing from nonmagical attacks that aren\'t adamantine'],
        conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'paralyzed', 'petrified', 'poisoned'],
        senses: 'Darkvision 120ft, Passive Perception 10',
        languages: 'Understands the languages of its creator but can\'t speak',
        aiBehavior: 'aggressive',
        lore: "A golem chiseled from stone.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The golem makes two attacks, using Slam or Force Bolt in any combination.',
                multiattackActions: ['Slam', 'Force Bolt']
            },
            {
                name: 'Slam',
                type: 'melee',
                desc: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage plus 9 (2d8) force damage.',
                attackBonus: 10,
                damage: '2d8+6+2d8',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Force Bolt',
                type: 'ranged',
                desc: 'Ranged Attack Roll: +9, range 120 ft. Hit: 22 (4d10) Force damage.',
                attackBonus: 9,
                damage: '4d10',
                damageType: 'force',
                range: 120
            }
        ],
        bonusActions: [
            {
                name: 'Slow',
                type: 'save',
                desc: 'Recharge 5-6. Casts Slow spell (Constitution spellcasting, DC 17). No components.'
            }
        ],
        traits: [
            { name: 'Immutable Form', desc: 'The golem can\'t shape-shift.' },
            { name: 'Magic Resistance', desc: 'The golem has advantage on saving throws against spells and other magical effects.' }
        ]
    },
    {
        id: 'shield_guardian',
        name: 'Shield Guardian',
        type: 'Construct',
        size: 'Large',
        ac: 17,
        hp: 142, // 15d10 + 60
        speed: 30,
        stats: stats(18, 8, 18, 7, 10, 3),
        cr: 7,
        immunities: ['poison'],
        conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'paralyzed', 'petrified', 'poisoned'],
        senses: 'Blindsight 10ft, Darkvision 60ft, Passive Perception 10',
        languages: 'Understands commands given in any language but can\'t speak',
        aiBehavior: 'defensive',
        lore: "A construct built to protect its master, utilizing a magical amulet for control.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The guardian makes two Fist attacks.',
                multiattackActions: ['Fist', 'Fist']
            },
            {
                name: 'Fist',
                type: 'melee',
                desc: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage plus 7 (2d6) Force damage.',
                attackBonus: 7,
                damage: '2d6+4+2d6',
                damageType: 'bludgeoning',
                reach: 5
            }
        ],
        traits: [
            { name: 'Bound', desc: 'Magically bound to an amulet. Wearer can call guardian. Half of wearer\'s damage transferred to guardian if within 60ft.' },
            { name: 'Regeneration', desc: 'Regains 10 Hit Points at start of its turn if it has at least 1 HP.' },
            { name: 'Spell Storing', desc: 'Stores one spell of level 4 or lower cast into it.' }
        ],
        reactions: [
            { name: 'Protection', type: 'ability', desc: 'Trigger: Attack roll hits amulet wearer within 5 ft. Response: Wearer gains +5 AC against attack.' }
        ]
    },
    {
        id: 'homunculus',
        name: 'Homunculus',
        type: 'Construct',
        size: 'Tiny',
        ac: 13,
        hp: 4, // 1d4 + 2
        speed: 20, // Fly 40
        stats: stats(4, 15, 14, 10, 10, 7),
        cr: 0,
        immunities: ['poison'],
        conditionImmunities: ['charmed', 'poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'Understands the languages of its creator but can\'t speak',
        aiBehavior: 'minion',
        lore: "A tiny construct servant created by a wizard, sharing a telepathic bond.",
        actions: [
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 1 piercing damage. Target subjected to effect: DC 12 Con Save. Failure: Poisoned until end of next turn. Fail by 5+: Poisoned 1 min and Unconscious.',
                attackBonus: 4,
                damage: '1',
                damageType: 'piercing',
                reach: 5
            }
        ],
        traits: [
             { name: 'Telepathic Bond', desc: 'While on same plane as master, can communicate telepathically.' }
        ]
    }
];


import { MonsterData } from '../../types';
import { stats } from './utils';

export const ABERRATIONS: MonsterData[] = [
    {
        id: 'aboleth',
        name: 'Aboleth',
        type: 'Aberration',
        size: 'Large',
        ac: 17,
        hp: 150, // 20d10 + 40
        speed: 2, // 10ft, swim 40ft
        stats: stats(21, 9, 15, 18, 15, 18),
        cr: 10,
        senses: 'Darkvision 120ft, Passive Perception 20',
        languages: 'Deep Speech, Telepathy 120ft',
        aiBehavior: 'caster',
        lore: "A fish-like amphibious monster that dominates the minds of others from the deep.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The aboleth makes two Tentacle attacks and uses either Consume Memories or Dominate Mind if available.',
                multiattackActions: ['Tentacle', 'Tentacle', 'Consume Memories', 'Dominate Mind']
            },
            {
                name: 'Tentacle',
                type: 'melee',
                desc: 'Melee Attack Roll: +9, reach 15 ft. Hit: 12 (2d6 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from one of four tentacles.',
                attackBonus: 9,
                damage: '2d6+5',
                damageType: 'bludgeoning',
                reach: 15
            },
            {
                name: 'Consume Memories',
                type: 'save',
                desc: 'Intelligence Saving Throw: DC 16, one creature within 30 feet that is Charmed or Grappled by the aboleth. Failure: 10 (3d6) Psychic damage. Success: Half damage.',
                saveDC: 16,
                saveAbility: 'INT',
                damage: '3d6',
                damageType: 'psychic',
                range: 30
            },
            {
                name: 'Dominate Mind',
                type: 'save',
                desc: '2/Day. Wisdom Saving Throw: DC 16, one creature the aboleth can see within 30 feet. Failure: The target has the Charmed condition until the aboleth dies or is on a different plane of existence. While Charmed, the target acts as an ally and is under control. Target repeats save when taking damage or every 24 hours.',
                saveDC: 16,
                saveAbility: 'WIS',
                damage: '0',
                range: 30
            }
        ],
        traits: [
            { name: 'Amphibious', desc: 'The aboleth can breathe air and water.' },
            { name: 'Eldritch Restoration', desc: 'If destroyed, the aboleth gains a new body in 5d10 days in the Far Realm.' },
            { name: 'Legendary Resistance (3/Day)', desc: 'If the aboleth fails a saving throw, it can choose to succeed instead.' },
            { name: 'Mucus Cloud', desc: 'While underwater, creatures in a 5-foot Emanation must make DC 14 Con save or be diseased (translucent skin, must stay underwater). Takes 6 (1d12) Acid damage every 10 mins out of water.' },
            { name: 'Probing Telepathy', desc: 'If a creature communicates telepathically with the aboleth, the aboleth learns its greatest desires.' }
        ],
        legendaryActions: [
            { name: 'Lash', type: 'melee', desc: 'The aboleth makes one Tentacle attack.', attackBonus: 9, damage: '2d6+5', damageType: 'bludgeoning' },
            { name: 'Psychic Drain', type: 'ability', desc: 'If the aboleth has at least one creature Charmed or Grappled, it uses Consume Memories and regains 5 (1d10) Hit Points.' }
        ]
    },
    {
        id: 'chuul',
        name: 'Chuul',
        type: 'Aberration',
        size: 'Large',
        ac: 16,
        hp: 76, // 9d10 + 27
        speed: 6, // 30ft, swim 30ft
        stats: stats(19, 10, 16, 5, 11, 5),
        cr: 4,
        immunities: ['poison'],
        conditionImmunities: ['poisoned'],
        senses: 'Darkvision 60ft, Passive Perception 14',
        languages: 'Deep Speech',
        aiBehavior: 'aggressive',
        lore: "A crustacean-like horror created by aboleths to guard their holdings.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The chuul makes two Pincer attacks and uses Paralyzing Tentacles.',
                multiattackActions: ['Pincer', 'Pincer', 'Paralyzing Tentacles']
            },
            {
                name: 'Pincer',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 10 ft. Hit: 9 (1d10 + 4) Bludgeoning damage. If the target is Large or smaller, it has the Grappled condition (escape DC 14) from one of two pincers.',
                attackBonus: 6,
                damage: '1d10+4',
                damageType: 'bludgeoning',
                reach: 10
            },
            {
                name: 'Paralyzing Tentacles',
                type: 'save',
                desc: 'Constitution Saving Throw: DC 13, one creature Grappled by the chuul. Failure: The target has the Poisoned condition and repeats the save at the end of each of its turns, ending effect on success. While Poisoned, the target has the Paralyzed condition.',
                saveDC: 13,
                saveAbility: 'CON',
                damage: '0',
                range: 5
            }
        ],
        traits: [
            { name: 'Amphibious', desc: 'The chuul can breathe air and water.' },
            { name: 'Sense Magic', desc: 'The chuul senses magic within 120 feet of itself at will (like Detect Magic).' }
        ]
    },
    {
        id: 'cloaker',
        name: 'Cloaker',
        type: 'Aberration',
        size: 'Large',
        ac: 14,
        hp: 91, // 14d10 + 14
        speed: 2, // 10ft, fly 40ft
        stats: stats(17, 15, 12, 13, 14, 7),
        cr: 8,
        immunities: ['frightened'],
        senses: 'Darkvision 120ft, Passive Perception 12',
        languages: 'Deep Speech, Undercommon',
        aiBehavior: 'lurker',
        lore: "A stealthy predator that resembles a dark leather cloak, lurking in dungeons.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The cloaker makes one Attach attack and two Tail attacks.',
                multiattackActions: ['Attach', 'Tail', 'Tail']
            },
            {
                name: 'Attach',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 13 (3d6 + 3) Piercing damage. If Large or smaller, cloaker attaches. Target is Blinded. Cloaker takes half damage (other half to target).',
                attackBonus: 6,
                damage: '3d6+3',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Tail',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 10 ft. Hit: 8 (1d10 + 3) Slashing damage.',
                attackBonus: 6,
                damage: '1d10+3',
                damageType: 'slashing',
                reach: 10
            }
        ],
        traits: [
            { name: 'Light Sensitivity', desc: 'While in Bright Light, the cloaker has Disadvantage on attack rolls.' }
        ],
        bonusActions: [
             { name: 'Moan', type: 'save', desc: 'Wisdom Saving Throw: DC 13, each creature in 60ft Emanation. Failure: Frightened until end of cloaker\'s next turn.', saveDC: 13, saveAbility: 'WIS', damage: '0' },
             { name: 'Phantasms', type: 'ability', desc: 'Recharge Short/Long Rest. Casts Mirror Image (Wisdom based).' }
        ]
    },
    {
        id: 'darkmantle',
        name: 'Darkmantle',
        type: 'Aberration',
        size: 'Small',
        ac: 11,
        hp: 22, // 5d6 + 5
        speed: 2, // 10ft, fly 30ft
        stats: stats(16, 12, 13, 2, 10, 5),
        cr: 0.5,
        senses: 'Blindsight 60ft, Passive Perception 10',
        languages: 'None',
        aiBehavior: 'aggressive',
        lore: "A squid-like creature that hangs from ceilings and drops on prey.",
        actions: [
            {
                name: 'Crush',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 6 (1d6 + 3) Bludgeoning damage, and the darkmantle attaches to the target. If Medium or smaller, darkmantle covers head (Blinded, Suffocating).',
                attackBonus: 5,
                damage: '1d6+3',
                damageType: 'bludgeoning',
                reach: 5
            },
            {
                name: 'Darkness Aura',
                type: 'ability',
                desc: '1/Day. Magical Darkness fills a 15-foot Emanation originating from the darkmantle. Lasts up to 10 minutes (Concentration).',
                range: 0
            }
        ]
    },
    {
        id: 'gibbering_mouther',
        name: 'Gibbering Mouther',
        type: 'Aberration',
        size: 'Medium',
        ac: 9,
        hp: 52, // 7d8 + 21
        speed: 4, // 20ft, swim 20ft
        stats: stats(10, 8, 16, 3, 10, 6),
        cr: 2,
        immunities: ['prone'],
        senses: 'Darkvision 60ft, Passive Perception 10',
        languages: 'None',
        aiBehavior: 'aggressive',
        lore: "An amorphous blob of mouths and eyes that babbles incoherently.",
        actions: [
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Attack Roll: +2, reach 5 ft. Hit: 7 (2d6) Piercing damage. If Medium or smaller, target has Prone condition. If killed, absorbed.',
                attackBonus: 2,
                damage: '2d6',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Blinding Spittle',
                type: 'save',
                desc: 'Recharge 5-6. Dexterity Saving Throw: DC 10, each creature in 10-foot sphere within 30 ft. Failure: 7 (2d6) Radiant damage and Blinded until end of mouther\'s next turn.',
                saveDC: 10,
                saveAbility: 'DEX',
                damage: '2d6',
                damageType: 'radiant',
                range: 30
            }
        ],
        traits: [
            { name: 'Aberrant Ground', desc: 'Ground in 10ft Emanation is Difficult Terrain.' },
            { name: 'Gibbering', desc: 'Wisdom Saving Throw: DC 10, any creature starting turn within 20 ft. Failure: Random action (1d8).' }
        ]
    },
    {
        id: 'grick',
        name: 'Grick',
        type: 'Aberration',
        size: 'Medium',
        ac: 14,
        hp: 54, // 12d8
        speed: 6, // 30ft, climb 30ft
        stats: stats(14, 14, 11, 3, 14, 5),
        cr: 2,
        senses: 'Darkvision 60ft, Passive Perception 12',
        languages: 'None',
        aiBehavior: 'aggressive',
        lore: "A worm-like predator with four tentacles and a beak.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The grick makes one Beak attack and one Tentacles attack.',
                multiattackActions: ['Beak', 'Tentacles']
            },
            {
                name: 'Beak',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 9 (2d6 + 2) Piercing damage.',
                attackBonus: 4,
                damage: '2d6+2',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Tentacles',
                type: 'melee',
                desc: 'Melee Attack Roll: +4, reach 5 ft. Hit: 7 (1d10 + 2) Slashing damage. If Medium or smaller, Grappled (escape DC 12).',
                attackBonus: 4,
                damage: '1d10+2',
                damageType: 'slashing',
                reach: 5
            }
        ]
    },
    {
        id: 'grimlock',
        name: 'Grimlock',
        type: 'Aberration',
        size: 'Medium',
        ac: 11,
        hp: 11, // 2d8 + 2
        speed: 6, // 30ft, climb 30ft
        stats: stats(16, 12, 12, 9, 8, 6),
        cr: 0.25,
        senses: 'Blindsight 30ft, Passive Perception 13',
        languages: 'None',
        aiBehavior: 'aggressive',
        lore: "Blind, subterranean humanoids that hunt by scent and sound.",
        actions: [
            {
                name: 'Bone Cudgel',
                type: 'melee',
                desc: 'Melee Attack Roll: +5, reach 5 ft. Hit: 6 (1d6 + 3) Bludgeoning damage plus 2 (1d4) Psychic damage.',
                attackBonus: 5,
                damage: '1d6+3', 
                damageType: 'bludgeoning',
                reach: 5
            }
        ]
    },
    {
        id: 'otyugh',
        name: 'Otyugh',
        type: 'Aberration',
        size: 'Large',
        ac: 14,
        hp: 104, // 11d10 + 44
        speed: 6, // 30ft
        stats: stats(16, 11, 19, 6, 13, 6),
        cr: 5,
        senses: 'Darkvision 120ft, Passive Perception 11',
        languages: 'Otyugh, Telepathy 120ft',
        aiBehavior: 'aggressive',
        lore: "A three-legged filth-eater with tentacles and a deadly maw.",
        actions: [
            {
                name: 'Multiattack',
                type: 'multiattack',
                desc: 'The otyugh makes one Bite attack and two Tentacle attacks.',
                multiattackActions: ['Bite', 'Tentacle', 'Tentacle']
            },
            {
                name: 'Bite',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 5 ft. Hit: 12 (2d8 + 3) Piercing damage. Poisoned (DC 15 Con save) -> Max HP reduced by 5 (1d10).',
                attackBonus: 6,
                damage: '2d8+3',
                damageType: 'piercing',
                reach: 5
            },
            {
                name: 'Tentacle',
                type: 'melee',
                desc: 'Melee Attack Roll: +6, reach 10 ft. Hit: 12 (2d8 + 3) Piercing damage. If Medium or smaller, Grappled (escape DC 13).',
                attackBonus: 6,
                damage: '2d8+3',
                damageType: 'piercing',
                reach: 10
            },
            {
                name: 'Tentacle Slam',
                type: 'save',
                desc: 'Constitution Saving Throw: DC 14, each creature Grappled by otyugh. Failure: 16 (3d8 + 3) Bludgeoning damage and Stunned until start of otyugh\'s next turn.',
                saveDC: 14,
                saveAbility: 'CON',
                damage: '3d8+3',
                damageType: 'bludgeoning'
            }
        ]
    }
];

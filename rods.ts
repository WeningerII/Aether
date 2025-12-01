
import { Item } from '../../types';

export const MAGIC_RODS: Item[] = [
    { id: 'immovable_rod', name: 'Immovable Rod', type: 'magic', rarity: 'uncommon', cost: 10000, weight: 2, quantity: 1, description: 'Press button to fix rod in space. Holds 8000lbs.' },
    { id: 'rod_absorption', name: 'Rod of Absorption', type: 'magic', rarity: 'very_rare', cost: 100000, weight: 2, quantity: 1, description: 'Absorb spells to regain charges for casting.' },
    { id: 'rod_alertness', name: 'Rod of Alertness', type: 'magic', rarity: 'very_rare', cost: 80000, weight: 2, quantity: 1, description: 'Advantage on Perception/Initiative. Cast Detect Evil/Good, Detect Magic, Detect Poison/Disease, See Invisibility.', spells: [{ name: 'Detect Evil and Good', cost: 0 }, { name: 'Detect Magic', cost: 0 }, { name: 'Detect Poison and Disease', cost: 0 }, { name: 'See Invisibility', cost: 0 }] },
    { id: 'rod_lordly_might', name: 'Rod of Lordly Might', type: 'magic', rarity: 'legendary', cost: 200000, weight: 10, quantity: 1, description: 'Transforms into magic weapons (+3). Paralyzing touch (DC 15). Drain life (4d6). Fear (DC 15).' },
    { id: 'rod_pact_keeper_1', name: 'Rod of the Pact Keeper +1', type: 'magic', rarity: 'uncommon', cost: 40000, weight: 2, quantity: 1, description: '+1 Warlock Spell Attacks/DC. Regain 1 slot/day.', passiveBonuses: [{ stat: 'spell_dc', value: 1 }, { stat: 'spell_attack', value: 1 }] },
    { id: 'rod_pact_keeper_2', name: 'Rod of the Pact Keeper +2', type: 'magic', rarity: 'rare', cost: 80000, weight: 2, quantity: 1, description: '+2 Warlock Spell Attacks/DC. Regain 1 slot/day.', passiveBonuses: [{ stat: 'spell_dc', value: 2 }, { stat: 'spell_attack', value: 2 }] },
    { id: 'rod_pact_keeper_3', name: 'Rod of the Pact Keeper +3', type: 'magic', rarity: 'very_rare', cost: 150000, weight: 2, quantity: 1, description: '+3 Warlock Spell Attacks/DC. Regain 1 slot/day.', passiveBonuses: [{ stat: 'spell_dc', value: 3 }, { stat: 'spell_attack', value: 3 }] },
    { id: 'rod_resurrection', name: 'Rod of Resurrection', type: 'magic', rarity: 'legendary', cost: 200000, weight: 2, quantity: 1, description: '5 charges. Heal (1 charge), Resurrection (5 charges).', charges: { current: 5, max: 5, recharge: '1d4+1 at dawn' }, spells: [{ name: 'Heal', cost: 1 }, { name: 'Resurrection', cost: 5 }] },
    { id: 'rod_rulership', name: 'Rod of Rulership', type: 'magic', rarity: 'rare', cost: 40000, weight: 2, quantity: 1, description: 'Charm/Command creatures within 120ft for 8 hours (DC 15 Wis).', charges: { current: 1, max: 1, recharge: 'Dawn' } },
    { id: 'rod_security', name: 'Rod of Security', type: 'magic', rarity: 'very_rare', cost: 150000, weight: 2, quantity: 1, description: 'Transport up to 200 people to a paradise demiplane. Lasts 200 days divided by people.', charges: { current: 1, max: 1, recharge: '10 Days' } }
];

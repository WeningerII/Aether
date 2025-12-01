
import { Item } from '../../types';

export const MAGIC_RINGS: Item[] = [
    { id: 'ring_animal_influence', name: 'Ring of Animal Influence', type: 'magic', rarity: 'rare', cost: 30000, weight: 0, quantity: 1, description: 'Cast Animal Friendship, Fear (beasts), Speak with Animals.', spells: [{ name: 'Animal Friendship', cost: 1 }, { name: 'Fear', cost: 1 }, { name: 'Speak with Animals', cost: 1 }] },
    { id: 'ring_djinni_summoning', name: 'Ring of Djinni Summoning', type: 'magic', rarity: 'legendary', cost: 300000, weight: 0, quantity: 1, description: 'Summon a Djinni.' },
    { id: 'ring_elemental_command', name: 'Ring of Elemental Command', type: 'magic', rarity: 'legendary', cost: 200000, weight: 0, quantity: 1, description: 'Dominate Elemental, specialized powers per element.', spells: [{ name: 'Dominate Monster', cost: 1 }] },
    { id: 'ring_evasion', name: 'Ring of Evasion', type: 'magic', rarity: 'rare', cost: 50000, weight: 0, quantity: 1, description: '3 charges. Expend to succeed on failed Dex save.' },
    { id: 'ring_feather_falling', name: 'Ring of Feather Falling', type: 'magic', rarity: 'rare', cost: 20000, weight: 0, quantity: 1, description: 'Feather Fall effect when falling (no action).' },
    { id: 'ring_free_action', name: 'Ring of Free Action', type: 'magic', rarity: 'rare', cost: 40000, weight: 0, quantity: 1, description: 'Ignore difficult terrain, immune to paralysis/restraint.' },
    { id: 'ring_invisibility', name: 'Ring of Invisibility', type: 'magic', rarity: 'legendary', cost: 500000, weight: 0, quantity: 1, description: 'Turn invisible as an action.', spells: [{ name: 'Invisibility', cost: 0 }] },
    { id: 'ring_jumping', name: 'Ring of Jumping', type: 'magic', rarity: 'uncommon', cost: 15000, weight: 0, quantity: 1, description: 'Cast Jump at will (self only).', spells: [{ name: 'Jump', cost: 0 }] },
    { id: 'ring_mind_shielding', name: 'Ring of Mind Shielding', type: 'magic', rarity: 'uncommon', cost: 15000, weight: 0, quantity: 1, description: 'Immune to mind reading.' },
    { id: 'ring_protection', name: 'Ring of Protection', type: 'magic', rarity: 'rare', cost: 50000, weight: 0, quantity: 1, description: '+1 to AC and Saving Throws.', passiveBonuses: [{ stat: 'ac', value: 1 }, { stat: 'saves', value: 1 }] },
    { id: 'ring_regeneration', name: 'Ring of Regeneration', type: 'magic', rarity: 'very_rare', cost: 100000, weight: 0, quantity: 1, description: 'Regain 1d6 HP every 10 minutes.' },
    { id: 'ring_resistance', name: 'Ring of Resistance', type: 'magic', rarity: 'rare', cost: 60000, weight: 0, quantity: 1, description: 'Resistance to one damage type (e.g. Fire).', resistances: ['fire'] },
    { id: 'ring_shooting_stars', name: 'Ring of Shooting Stars', type: 'magic', rarity: 'very_rare', cost: 80000, weight: 0, quantity: 1, description: 'Cast Faerie Fire, shoot lightning balls, or shooting stars.', spells: [{ name: 'Faerie Fire', cost: 1 }] },
    { id: 'ring_spell_storing', name: 'Ring of Spell Storing', type: 'magic', rarity: 'rare', cost: 50000, weight: 0, quantity: 1, description: 'Store up to 5 levels of spells.' },
    { id: 'ring_spell_turning', name: 'Ring of Spell Turning', type: 'magic', rarity: 'legendary', cost: 300000, weight: 0, quantity: 1, description: 'Advantage on saves vs spells. Reflects spells on nat 20 save.' },
    { id: 'ring_swimming', name: 'Ring of Swimming', type: 'magic', rarity: 'uncommon', cost: 10000, weight: 0, quantity: 1, description: '40ft swim speed.' },
    { id: 'ring_telekinesis', name: 'Ring of Telekinesis', type: 'magic', rarity: 'very_rare', cost: 75000, weight: 0, quantity: 1, description: 'Cast Telekinesis at will.', spells: [{ name: 'Telekinesis', cost: 0 }] },
    { id: 'ring_ram', name: 'Ring of the Ram', type: 'magic', rarity: 'rare', cost: 25000, weight: 0, quantity: 1, description: 'Spectral ram attack (2d10/charge).' },
    { id: 'ring_three_wishes', name: 'Ring of Three Wishes', type: 'magic', rarity: 'legendary', cost: 500000, weight: 0, quantity: 1, description: '3 charges of Wish.', charges: { current: 3, max: 3, recharge: 'Never' }, spells: [{ name: 'Wish', cost: 1 }] },
    { id: 'ring_warmth', name: 'Ring of Warmth', type: 'magic', rarity: 'uncommon', cost: 10000, weight: 0, quantity: 1, description: 'Resistance to Cold. Comfortable in extreme cold.', resistances: ['cold'] },
    { id: 'ring_water_walking', name: 'Ring of Water Walking', type: 'magic', rarity: 'uncommon', cost: 15000, weight: 0, quantity: 1, description: 'Walk on liquid surfaces.', spells: [{ name: 'Water Walk', cost: 0 }] },
    { id: 'ring_xray', name: 'Ring of X-ray Vision', type: 'magic', rarity: 'rare', cost: 50000, weight: 0, quantity: 1, description: 'See through solid matter for 1 minute.' }
];

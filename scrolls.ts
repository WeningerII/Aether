
import { Item } from '../../types';

export const MAGIC_SCROLLS: Item[] = [
    { id: 'scroll_cantrip', name: 'Spell Scroll (Cantrip)', type: 'scroll', rarity: 'common', cost: 5000, weight: 0, quantity: 1, description: 'A scroll containing a cantrip.', effect: { type: 'utility', value: 'cast_once' } },
    { id: 'scroll_lvl1', name: 'Spell Scroll (Level 1)', type: 'scroll', rarity: 'common', cost: 10000, weight: 0, quantity: 1, description: 'A scroll containing a level 1 spell.', effect: { type: 'utility', value: 'cast_once' } },
    { id: 'scroll_lvl2', name: 'Spell Scroll (Level 2)', type: 'scroll', rarity: 'uncommon', cost: 25000, weight: 0, quantity: 1, description: 'A scroll containing a level 2 spell.', effect: { type: 'utility', value: 'cast_once' } },
    { id: 'scroll_lvl3', name: 'Spell Scroll (Level 3)', type: 'scroll', rarity: 'uncommon', cost: 50000, weight: 0, quantity: 1, description: 'A scroll containing a level 3 spell.', effect: { type: 'utility', value: 'cast_once' } },
    { id: 'scroll_lvl4', name: 'Spell Scroll (Level 4)', type: 'scroll', rarity: 'rare', cost: 250000, weight: 0, quantity: 1, description: 'A scroll containing a level 4 spell.', effect: { type: 'utility', value: 'cast_once' } },
    { id: 'scroll_lvl5', name: 'Spell Scroll (Level 5)', type: 'scroll', rarity: 'rare', cost: 500000, weight: 0, quantity: 1, description: 'A scroll containing a level 5 spell.', effect: { type: 'utility', value: 'cast_once' } },
    { id: 'scroll_lvl6', name: 'Spell Scroll (Level 6)', type: 'scroll', rarity: 'very_rare', cost: 1000000, weight: 0, quantity: 1, description: 'A scroll containing a level 6 spell.', effect: { type: 'utility', value: 'cast_once' } },
    { id: 'scroll_lvl7', name: 'Spell Scroll (Level 7)', type: 'scroll', rarity: 'very_rare', cost: 2500000, weight: 0, quantity: 1, description: 'A scroll containing a level 7 spell.', effect: { type: 'utility', value: 'cast_once' } },
    { id: 'scroll_lvl8', name: 'Spell Scroll (Level 8)', type: 'scroll', rarity: 'very_rare', cost: 5000000, weight: 0, quantity: 1, description: 'A scroll containing a level 8 spell.', effect: { type: 'utility', value: 'cast_once' } },
    { id: 'scroll_lvl9', name: 'Spell Scroll (Level 9)', type: 'scroll', rarity: 'legendary', cost: 25000000, weight: 0, quantity: 1, description: 'A scroll containing a level 9 spell.', effect: { type: 'utility', value: 'cast_once' } },
    { id: 'scroll_protection', name: 'Scroll of Protection', type: 'scroll', rarity: 'rare', cost: 50000, weight: 0, quantity: 1, description: 'Prevents specific creature type from entering 5ft radius.' }
];

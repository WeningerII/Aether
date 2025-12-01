
import { BaseItem } from '../../types';

export const ADVENTURING_GEAR: BaseItem[] = [
    { id: 'backpack', name: 'Backpack', type: 'gear', cost: 200, weight: 5, quantity: 1 },
    { id: 'bedroll', name: 'Bedroll', type: 'gear', cost: 100, weight: 7, quantity: 1 },
    { id: 'blanket', name: 'Blanket', type: 'gear', cost: 50, weight: 3, quantity: 1 },
    { id: 'candle', name: 'Candle', type: 'gear', cost: 1, weight: 0, quantity: 1 },
    { id: 'crowbar', name: 'Crowbar', type: 'gear', cost: 200, weight: 5, quantity: 1, description: 'Advantage on Strength checks to open things.' },
    { id: 'hammer', name: 'Hammer', type: 'gear', cost: 100, weight: 3, quantity: 1 },
    { id: 'piton', name: 'Piton', type: 'gear', cost: 5, weight: 0.25, quantity: 10 },
    { id: 'lantern_hooded', name: 'Lantern, Hooded', type: 'gear', cost: 500, weight: 2, quantity: 1 },
    { id: 'lock', name: 'Lock', type: 'gear', cost: 1000, weight: 1, quantity: 1 },
    { id: 'manacles', name: 'Manacles', type: 'gear', cost: 200, weight: 6, quantity: 1 },
    { id: 'mess_kit', name: 'Mess Kit', type: 'gear', cost: 20, weight: 1, quantity: 1 },
    { id: 'oil', name: 'Oil (flask)', type: 'gear', cost: 10, weight: 1, quantity: 1 },
    { id: 'rations', name: 'Rations (1 day)', type: 'gear', cost: 50, weight: 2, quantity: 1 },
    { id: 'rope_hempen', name: 'Rope, Hempen (50ft)', type: 'gear', cost: 100, weight: 10, quantity: 1 },
    { id: 'rope_silk', name: 'Rope, Silk (50ft)', type: 'gear', cost: 1000, weight: 5, quantity: 1 },
    { id: 'tinderbox', name: 'Tinderbox', type: 'gear', cost: 50, weight: 1, quantity: 1 },
    { id: 'torch', name: 'Torch', type: 'gear', cost: 1, weight: 1, quantity: 1, description: '1 hour of bright light (20ft radius).' },
    { id: 'waterskin', name: 'Waterskin', type: 'gear', cost: 20, weight: 5, quantity: 1 },
    { id: 'spellbook', name: 'Spellbook', type: 'gear', cost: 5000, weight: 3, quantity: 1 },
];


import { BaseItem } from '../../types';

export const TOOLS: BaseItem[] = [
    { id: 'thieves_tools', name: 'Thieves\' Tools', type: 'tool', cost: 2500, weight: 1, quantity: 1, description: 'Files, lockpicks, mirrors, pliers.' },
    { id: 'disguise_kit', name: 'Disguise Kit', type: 'tool', cost: 2500, weight: 3, quantity: 1, description: 'Cosmetics, hair dye, props.' },
    { id: 'forgery_kit', name: 'Forgery Kit', type: 'tool', cost: 1500, weight: 5, quantity: 1, description: 'Papers, inks, seals, wax.' },
    { id: 'poisoners_kit', name: 'Poisoner\'s Kit', type: 'tool', cost: 5000, weight: 2, quantity: 1, description: 'Vials, chemicals, chemicals.' },
    { id: 'herbalism_kit', name: 'Herbalism Kit', type: 'tool', cost: 500, weight: 3, quantity: 1, description: 'Pouches, clippers, mortar and pestle.' },
    { id: 'navigators_tools', name: 'Navigator\'s Tools', type: 'tool', cost: 2500, weight: 2, quantity: 1, description: 'Sextant, compass, calipers.' },
    
    // Musical Instruments
    { id: 'lute', name: 'Lute', type: 'tool', cost: 3500, weight: 2, quantity: 1 },
    { id: 'drum', name: 'Drum', type: 'tool', cost: 600, weight: 3, quantity: 1 },
    { id: 'flute', name: 'Flute', type: 'tool', cost: 200, weight: 1, quantity: 1 },
    { id: 'lyre', name: 'Lyre', type: 'tool', cost: 3000, weight: 2, quantity: 1 },
    { id: 'horn', name: 'Horn', type: 'tool', cost: 300, weight: 2, quantity: 1 },
    
    // Gaming Sets
    { id: 'dice_set', name: 'Dice Set', type: 'tool', cost: 10, weight: 0, quantity: 1 },
    { id: 'playing_card_set', name: 'Playing Card Set', type: 'tool', cost: 50, weight: 0, quantity: 1 },
    { id: 'chess_set', name: 'Dragonchess Set', type: 'tool', cost: 100, weight: 0.5, quantity: 1 },
];

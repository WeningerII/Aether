
import { BaseItem } from '../../types';

export const CURRENCY_TYPES = {
    pp: { name: 'Platinum', value: 1000, weight: 0.02, color: '#e2e8f0' }, // Value in CP
    gp: { name: 'Gold', value: 100, weight: 0.02, color: '#fbbf24' },
    ep: { name: 'Electrum', value: 50, weight: 0.02, color: '#94a3b8' },
    sp: { name: 'Silver', value: 10, weight: 0.02, color: '#cbd5e1' },
    cp: { name: 'Copper', value: 1, weight: 0.02, color: '#b45309' }
};

export const CURRENCY_ITEMS: BaseItem[] = [
    { id: 'cp', name: 'Copper Piece', type: 'currency', cost: 1, weight: 0.02, quantity: 1, description: 'Standard copper coin.', effect: { type: 'utility', value: 'deposit_cp' } },
    { id: 'sp', name: 'Silver Piece', type: 'currency', cost: 10, weight: 0.02, quantity: 1, description: 'Standard silver coin (10cp).', effect: { type: 'utility', value: 'deposit_sp' } },
    { id: 'ep', name: 'Electrum Piece', type: 'currency', cost: 50, weight: 0.02, quantity: 1, description: 'Standard electrum coin (50cp).', effect: { type: 'utility', value: 'deposit_ep' } },
    { id: 'gp', name: 'Gold Piece', type: 'currency', cost: 100, weight: 0.02, quantity: 1, description: 'Standard gold coin (100cp).', effect: { type: 'utility', value: 'deposit_gp' } },
    { id: 'pp', name: 'Platinum Piece', type: 'currency', cost: 1000, weight: 0.02, quantity: 1, description: 'Standard platinum coin (1000cp).', effect: { type: 'utility', value: 'deposit_pp' } },
    { id: 'gem_10gp', name: 'Obsidian Gem', type: 'treasure', cost: 1000, weight: 0, quantity: 1, description: 'A small black gemstone worth 10gp.' },
    { id: 'gem_50gp', name: 'Bloodstone', type: 'treasure', cost: 5000, weight: 0, quantity: 1, description: 'A dark grey gem with red flecks worth 50gp.' },
];


import { ArmorItem } from '../../types';

export const ARMOR: ArmorItem[] = [
    // Light Armor
    { id: 'padded', name: 'Padded Armor', type: 'armor', cost: 500, baseAC: 11, dexBonus: 'Full', stealthDisadvantage: true, weight: 8, armorCategory: 'Light', quantity: 1 },
    { id: 'leather', name: 'Leather Armor', type: 'armor', cost: 1000, baseAC: 11, dexBonus: 'Full', weight: 10, armorCategory: 'Light', quantity: 1 },
    { id: 'studded_leather', name: 'Studded Leather', type: 'armor', cost: 4500, baseAC: 12, dexBonus: 'Full', weight: 13, armorCategory: 'Light', quantity: 1 },
    
    // Medium Armor
    { id: 'hide', name: 'Hide Armor', type: 'armor', cost: 1000, baseAC: 12, dexBonus: 'Max2', weight: 12, armorCategory: 'Medium', quantity: 1 },
    { id: 'chain_shirt', name: 'Chain Shirt', type: 'armor', cost: 5000, baseAC: 13, dexBonus: 'Max2', weight: 20, armorCategory: 'Medium', quantity: 1 },
    { id: 'scale_mail', name: 'Scale Mail', type: 'armor', cost: 5000, baseAC: 14, dexBonus: 'Max2', stealthDisadvantage: true, weight: 45, armorCategory: 'Medium', quantity: 1 },
    { id: 'breastplate', name: 'Breastplate', type: 'armor', cost: 40000, baseAC: 14, dexBonus: 'Max2', weight: 20, armorCategory: 'Medium', quantity: 1 },
    { id: 'half_plate', name: 'Half Plate', type: 'armor', cost: 75000, baseAC: 15, dexBonus: 'Max2', stealthDisadvantage: true, weight: 40, armorCategory: 'Medium', quantity: 1 },
    
    // Heavy Armor
    { id: 'ring_mail', name: 'Ring Mail', type: 'armor', cost: 3000, baseAC: 14, dexBonus: 'None', stealthDisadvantage: true, weight: 40, armorCategory: 'Heavy', quantity: 1 },
    { id: 'chain_mail', name: 'Chain Mail', type: 'armor', cost: 7500, baseAC: 16, dexBonus: 'None', strReq: 13, stealthDisadvantage: true, weight: 55, armorCategory: 'Heavy', quantity: 1 },
    { id: 'splint', name: 'Splint Armor', type: 'armor', cost: 20000, baseAC: 17, dexBonus: 'None', strReq: 15, stealthDisadvantage: true, weight: 60, armorCategory: 'Heavy', quantity: 1 },
    { id: 'plate', name: 'Plate Armor', type: 'armor', cost: 150000, baseAC: 18, dexBonus: 'None', strReq: 15, stealthDisadvantage: true, weight: 65, armorCategory: 'Heavy', quantity: 1 },
    
    // Shield
    { id: 'shield', name: 'Shield', type: 'armor', cost: 1000, baseAC: 2, dexBonus: 'None', weight: 6, armorCategory: 'Shield', quantity: 1, description: "+2 AC" },
];

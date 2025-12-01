
import { WeaponItem } from '../../types';

export const WEAPONS: WeaponItem[] = [
    // Simple Melee
    { id: 'club', name: 'Club', type: 'weapon', cost: 10, damage: { dice: '1d4', type: 'bludgeoning' }, weight: 2, properties: ['Light'], mastery: 'Slow', category: 'Simple', quantity: 1 },
    { id: 'dagger', name: 'Dagger', type: 'weapon', cost: 200, damage: { dice: '1d4', type: 'piercing' }, weight: 1, properties: ['Finesse', 'Light', 'Thrown (range 20/60)'], mastery: 'Nick', category: 'Simple', quantity: 1 },
    { id: 'greatclub', name: 'Greatclub', type: 'weapon', cost: 20, damage: { dice: '1d8', type: 'bludgeoning' }, weight: 10, properties: ['Two-handed'], mastery: 'Push', category: 'Simple', quantity: 1 },
    { id: 'handaxe', name: 'Handaxe', type: 'weapon', cost: 500, damage: { dice: '1d6', type: 'slashing' }, weight: 2, properties: ['Light', 'Thrown (range 20/60)'], mastery: 'Vex', category: 'Simple', quantity: 1 },
    { id: 'javelin', name: 'Javelin', type: 'weapon', cost: 50, damage: { dice: '1d6', type: 'piercing' }, weight: 2, properties: ['Thrown (range 30/120)'], mastery: 'Slow', category: 'Simple', quantity: 1 },
    { id: 'light_hammer', name: 'Light Hammer', type: 'weapon', cost: 200, damage: { dice: '1d4', type: 'bludgeoning' }, weight: 2, properties: ['Light', 'Thrown (range 20/60)'], mastery: 'Nick', category: 'Simple', quantity: 1 },
    { id: 'mace', name: 'Mace', type: 'weapon', cost: 500, damage: { dice: '1d6', type: 'bludgeoning' }, weight: 4, properties: [], mastery: 'Sap', category: 'Simple', quantity: 1 },
    { id: 'quarterstaff', name: 'Quarterstaff', type: 'weapon', cost: 20, damage: { dice: '1d6', type: 'bludgeoning' }, weight: 4, properties: ['Versatile (1d8)'], mastery: 'Topple', category: 'Simple', quantity: 1 },
    { id: 'sickle', name: 'Sickle', type: 'weapon', cost: 100, damage: { dice: '1d4', type: 'slashing' }, weight: 2, properties: ['Light'], mastery: 'Nick', category: 'Simple', quantity: 1 },
    { id: 'spear', name: 'Spear', type: 'weapon', cost: 100, damage: { dice: '1d6', type: 'piercing' }, weight: 3, properties: ['Thrown (range 20/60)', 'Versatile (1d8)'], mastery: 'Sap', category: 'Simple', quantity: 1 },
    
    // Simple Ranged
    { id: 'light_crossbow', name: 'Light Crossbow', type: 'weapon', cost: 2500, damage: { dice: '1d8', type: 'piercing' }, weight: 5, properties: ['Ammunition (range 80/320)', 'Loading', 'Two-handed'], mastery: 'Slow', category: 'Simple', quantity: 1 },
    { id: 'dart', name: 'Dart', type: 'weapon', cost: 5, damage: { dice: '1d4', type: 'piercing' }, weight: 0.25, properties: ['Finesse', 'Thrown (range 20/60)'], mastery: 'Vex', category: 'Simple', quantity: 1 },
    { id: 'shortbow', name: 'Shortbow', type: 'weapon', cost: 2500, damage: { dice: '1d6', type: 'piercing' }, weight: 2, properties: ['Ammunition (range 80/320)', 'Two-handed'], mastery: 'Vex', category: 'Simple', quantity: 1 },
    { id: 'sling', name: 'Sling', type: 'weapon', cost: 10, damage: { dice: '1d4', type: 'bludgeoning' }, weight: 0, properties: ['Ammunition (range 30/120)'], mastery: 'Slow', category: 'Simple', quantity: 1 },

    // Martial Melee
    { id: 'battleaxe', name: 'Battleaxe', type: 'weapon', cost: 1000, damage: { dice: '1d8', type: 'slashing' }, weight: 4, properties: ['Versatile (1d10)'], mastery: 'Topple', category: 'Martial', quantity: 1 },
    { id: 'flail', name: 'Flail', type: 'weapon', cost: 1000, damage: { dice: '1d8', type: 'bludgeoning' }, weight: 2, properties: [], mastery: 'Sap', category: 'Martial', quantity: 1 },
    { id: 'glaive', name: 'Glaive', type: 'weapon', cost: 2000, damage: { dice: '1d10', type: 'slashing' }, weight: 6, properties: ['Heavy', 'Reach', 'Two-handed'], mastery: 'Graze', category: 'Martial', quantity: 1 },
    { id: 'greataxe', name: 'Greataxe', type: 'weapon', cost: 3000, damage: { dice: '1d12', type: 'slashing' }, weight: 7, properties: ['Heavy', 'Two-handed'], mastery: 'Cleave', category: 'Martial', quantity: 1 },
    { id: 'greatsword', name: 'Greatsword', type: 'weapon', cost: 5000, damage: { dice: '2d6', type: 'slashing' }, weight: 6, properties: ['Heavy', 'Two-handed'], mastery: 'Graze', category: 'Martial', quantity: 1 },
    { id: 'halberd', name: 'Halberd', type: 'weapon', cost: 2000, damage: { dice: '1d10', type: 'slashing' }, weight: 6, properties: ['Heavy', 'Reach', 'Two-handed'], mastery: 'Cleave', category: 'Martial', quantity: 1 },
    { id: 'lance', name: 'Lance', type: 'weapon', cost: 1000, damage: { dice: '1d12', type: 'piercing' }, weight: 6, properties: ['Heavy', 'Reach', 'Two-handed'], mastery: 'Topple', category: 'Martial', quantity: 1 },
    { id: 'longsword', name: 'Longsword', type: 'weapon', cost: 1500, damage: { dice: '1d8', type: 'slashing' }, weight: 3, properties: ['Versatile (1d10)'], mastery: 'Sap', category: 'Martial', quantity: 1 },
    { id: 'maul', name: 'Maul', type: 'weapon', cost: 1000, damage: { dice: '2d6', type: 'bludgeoning' }, weight: 10, properties: ['Heavy', 'Two-handed'], mastery: 'Topple', category: 'Martial', quantity: 1 },
    { id: 'morningstar', name: 'Morningstar', type: 'weapon', cost: 1500, damage: { dice: '1d8', type: 'piercing' }, weight: 4, properties: [], mastery: 'Sap', category: 'Martial', quantity: 1 },
    { id: 'pike', name: 'Pike', type: 'weapon', cost: 500, damage: { dice: '1d10', type: 'piercing' }, weight: 18, properties: ['Heavy', 'Reach', 'Two-handed'], mastery: 'Push', category: 'Martial', quantity: 1 },
    { id: 'rapier', name: 'Rapier', type: 'weapon', cost: 2500, damage: { dice: '1d8', type: 'piercing' }, weight: 2, properties: ['Finesse'], mastery: 'Vex', category: 'Martial', quantity: 1 },
    { id: 'scimitar', name: 'Scimitar', type: 'weapon', cost: 2500, damage: { dice: '1d6', type: 'slashing' }, weight: 3, properties: ['Finesse', 'Light'], mastery: 'Nick', category: 'Martial', quantity: 1 },
    { id: 'shortsword', name: 'Shortsword', type: 'weapon', cost: 1000, damage: { dice: '1d6', type: 'piercing' }, weight: 2, properties: ['Finesse', 'Light'], mastery: 'Vex', category: 'Martial', quantity: 1 },
    { id: 'trident', name: 'Trident', type: 'weapon', cost: 500, damage: { dice: '1d8', type: 'piercing' }, weight: 4, properties: ['Thrown (range 20/60)', 'Versatile (1d10)'], mastery: 'Topple', category: 'Martial', quantity: 1 },
    { id: 'warhammer', name: 'Warhammer', type: 'weapon', cost: 1500, damage: { dice: '1d8', type: 'bludgeoning' }, weight: 2, properties: ['Versatile (1d10)'], mastery: 'Push', category: 'Martial', quantity: 1 },
    { id: 'war_pick', name: 'War Pick', type: 'weapon', cost: 500, damage: { dice: '1d8', type: 'piercing' }, weight: 2, properties: ['Versatile (1d10)'], mastery: 'Sap', category: 'Martial', quantity: 1 },
    { id: 'whip', name: 'Whip', type: 'weapon', cost: 200, damage: { dice: '1d4', type: 'slashing' }, weight: 3, properties: ['Finesse', 'Reach'], mastery: 'Slow', category: 'Martial', quantity: 1 },

    // Martial Ranged
    { id: 'blowgun', name: 'Blowgun', type: 'weapon', cost: 1000, damage: { dice: '1', type: 'piercing' }, weight: 1, properties: ['Ammunition (range 25/100)', 'Loading'], mastery: 'Vex', category: 'Martial', quantity: 1 },
    { id: 'hand_crossbow', name: 'Hand Crossbow', type: 'weapon', cost: 7500, damage: { dice: '1d6', type: 'piercing' }, weight: 3, properties: ['Ammunition (range 30/120)', 'Light', 'Loading'], mastery: 'Vex', category: 'Martial', quantity: 1 },
    { id: 'heavy_crossbow', name: 'Heavy Crossbow', type: 'weapon', cost: 5000, damage: { dice: '1d10', type: 'piercing' }, weight: 18, properties: ['Ammunition (range 100/400)', 'Heavy', 'Loading', 'Two-handed'], mastery: 'Push', category: 'Martial', quantity: 1 },
    { id: 'longbow', name: 'Longbow', type: 'weapon', cost: 5000, damage: { dice: '1d8', type: 'piercing' }, weight: 2, properties: ['Ammunition (range 150/600)', 'Heavy', 'Two-handed'], mastery: 'Slow', category: 'Martial', quantity: 1 },
    { id: 'musket', name: 'Musket', type: 'weapon', cost: 50000, damage: { dice: '1d12', type: 'piercing' }, weight: 10, properties: ['Ammunition (range 40/120)', 'Loading', 'Two-handed'], mastery: 'Slow', category: 'Martial', quantity: 1 },
    { id: 'pistol', name: 'Pistol', type: 'weapon', cost: 25000, damage: { dice: '1d10', type: 'piercing' }, weight: 3, properties: ['Ammunition (range 30/90)', 'Loading'], mastery: 'Vex', category: 'Martial', quantity: 1 },
    
    // Special
    { id: 'net', name: 'Net', type: 'weapon', cost: 100, damage: { dice: '0', type: 'none' }, weight: 3, properties: ['Thrown (range 5/15)'], category: 'Martial', quantity: 1 },
];


import { MountItem, VehicleItem } from '../../types';

export const MOUNTS: MountItem[] = [
    { id: 'riding_horse', name: 'Riding Horse', type: 'mount', cost: 7500, weight: 0, speed: 60, capacity: 480, quantity: 1 },
    { id: 'draft_horse', name: 'Draft Horse', type: 'mount', cost: 5000, weight: 0, speed: 40, capacity: 540, quantity: 1 },
    { id: 'pony', name: 'Pony', type: 'mount', cost: 3000, weight: 0, speed: 40, capacity: 225, quantity: 1 },
    { id: 'warhorse', name: 'Warhorse', type: 'mount', cost: 40000, weight: 0, speed: 60, capacity: 540, quantity: 1 },
    { id: 'mastiff', name: 'Mastiff', type: 'mount', cost: 2500, weight: 0, speed: 40, capacity: 195, quantity: 1 },
    { id: 'camel', name: 'Camel', type: 'mount', cost: 5000, weight: 0, speed: 50, capacity: 480, quantity: 1 },
    { id: 'elephant', name: 'Elephant', type: 'mount', cost: 20000, weight: 0, speed: 40, capacity: 1320, quantity: 1 },
];

export const VEHICLES: VehicleItem[] = [
    { id: 'carriage', name: 'Carriage', type: 'vehicle', cost: 10000, weight: 600, speed: 0, capacity: 0, quantity: 1 },
    { id: 'cart', name: 'Cart', type: 'vehicle', cost: 1500, weight: 200, speed: 0, capacity: 0, quantity: 1 },
    { id: 'chariot', name: 'Chariot', type: 'vehicle', cost: 25000, weight: 100, speed: 0, capacity: 0, quantity: 1 },
    { id: 'wagon', name: 'Wagon', type: 'vehicle', cost: 3500, weight: 400, speed: 0, capacity: 0, quantity: 1 },
    { id: 'rowboat', name: 'Rowboat', type: 'vehicle', cost: 5000, weight: 100, speed: 3, capacity: 0, quantity: 1 }, // speed in mph usually, but abstracted
];

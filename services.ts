
import { ServiceItem } from '../../types';

export const SERVICES: ServiceItem[] = [
    { id: 'inn_stay_poor', name: 'Inn Stay (Poor)', type: 'service', cost: 6, quantity: 1, duration: '24 hours' },
    { id: 'inn_stay_modest', name: 'Inn Stay (Modest)', type: 'service', cost: 50, quantity: 1, duration: '24 hours' },
    { id: 'inn_stay_comfortable', name: 'Inn Stay (Comfortable)', type: 'service', cost: 80, quantity: 1, duration: '24 hours' },
    { id: 'inn_stay_wealthy', name: 'Inn Stay (Wealthy)', type: 'service', cost: 200, quantity: 1, duration: '24 hours' },
    { id: 'inn_stay_aristocratic', name: 'Inn Stay (Aristocratic)', type: 'service', cost: 400, quantity: 1, duration: '24 hours' },
    
    { id: 'meal_poor', name: 'Meal (Poor)', type: 'service', cost: 3, quantity: 1, duration: 'Instant' },
    { id: 'meal_modest', name: 'Meal (Modest)', type: 'service', cost: 30, quantity: 1, duration: 'Instant' },
    { id: 'meal_comfortable', name: 'Meal (Comfortable)', type: 'service', cost: 50, quantity: 1, duration: 'Instant' },
    
    { id: 'coach_cab', name: 'Coach Cab (Per Mile)', type: 'service', cost: 3, quantity: 1, duration: 'Instant' },
    { id: 'messenger', name: 'Messenger (Per Mile)', type: 'service', cost: 2, quantity: 1, duration: 'Instant' },
    
    { id: 'hireling_skilled', name: 'Hireling (Skilled, Per Day)', type: 'service', cost: 200, quantity: 1, duration: '24 hours' },
    { id: 'hireling_untrained', name: 'Hireling (Untrained, Per Day)', type: 'service', cost: 20, quantity: 1, duration: '24 hours' },
    
    { id: 'spell_cure_wounds', name: 'Service: Cure Wounds', type: 'service', cost: 1000, quantity: 1, duration: 'Instant', description: '1st Level Spell' },
    { id: 'spell_identify', name: 'Service: Identify', type: 'service', cost: 2000, quantity: 1, duration: 'Instant', description: '1st Level Spell' },
    { id: 'spell_lesser_restoration', name: 'Service: Lesser Restoration', type: 'service', cost: 4000, quantity: 1, duration: 'Instant', description: '2nd Level Spell' },
    { id: 'spell_remove_curse', name: 'Service: Remove Curse', type: 'service', cost: 9000, quantity: 1, duration: 'Instant', description: '3rd Level Spell' },
    { id: 'spell_raise_dead', name: 'Service: Raise Dead', type: 'service', cost: 125000, quantity: 1, duration: 'Instant', description: '5th Level Spell + Components' },
];

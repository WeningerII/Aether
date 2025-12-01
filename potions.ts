
import { PotionItem } from '../../types';

export const MAGIC_POTIONS: PotionItem[] = [
    { id: 'potion_healing', name: 'Potion of Healing', type: 'potion', rarity: 'common', cost: 5000, weight: 0.5, quantity: 1, description: 'Regain 2d4 + 2 HP.', effect: { type: 'heal', value: '2d4+2' } },
    { id: 'potion_greater_healing', name: 'Potion of Greater Healing', type: 'potion', rarity: 'uncommon', cost: 15000, weight: 0.5, quantity: 1, description: 'Regain 4d4 + 4 HP.', effect: { type: 'heal', value: '4d4+4' } },
    { id: 'potion_superior_healing', name: 'Potion of Superior Healing', type: 'potion', rarity: 'rare', cost: 50000, weight: 0.5, quantity: 1, description: 'Regain 8d4 + 8 HP.', effect: { type: 'heal', value: '8d4+8' } },
    { id: 'potion_supreme_healing', name: 'Potion of Supreme Healing', type: 'potion', rarity: 'very_rare', cost: 135000, weight: 0.5, quantity: 1, description: 'Regain 10d4 + 20 HP.', effect: { type: 'heal', value: '10d4+20' } },
    
    { id: 'potion_climbing', name: 'Potion of Climbing', type: 'potion', rarity: 'common', cost: 5000, weight: 0.5, quantity: 1, description: 'Gain climbing speed equal to walking speed for 1 hour. Advantage on Athletics (Climbing).', effect: { type: 'buff', value: 'climbing', duration: 600 } },
    { id: 'potion_diminution', name: 'Potion of Diminution', type: 'potion', rarity: 'rare', cost: 27000, weight: 0.5, quantity: 1, description: 'Reduce size to Tiny for 1d4 hours.', effect: { type: 'buff', value: 'tiny', duration: 240 }, spells: [{ name: 'Enlarge/Reduce', cost: 0 }] },
    { id: 'potion_flying', name: 'Potion of Flying', type: 'potion', rarity: 'very_rare', cost: 50000, weight: 0.5, quantity: 1, description: 'Gain flying speed equal to walking speed for 1 hour.', effect: { type: 'buff', value: 'flying', duration: 600 }, spells: [{ name: 'Fly', cost: 0 }] },
    { id: 'potion_gaseous_form', name: 'Potion of Gaseous Form', type: 'potion', rarity: 'rare', cost: 30000, weight: 0.5, quantity: 1, description: 'Turn into misty cloud for 1 hour.', effect: { type: 'buff', value: 'gaseous', duration: 600 }, spells: [{ name: 'Gaseous Form', cost: 0 }] },
    
    { id: 'potion_giant_strength_hill', name: 'Potion of Giant Strength (Hill)', type: 'potion', rarity: 'uncommon', cost: 15000, weight: 0.5, quantity: 1, description: 'Str 21 for 1 hour.', effect: { type: 'buff', stat: 'str_score', value: '21', duration: 600 } },
    { id: 'potion_giant_strength_frost', name: 'Potion of Giant Strength (Frost)', type: 'potion', rarity: 'rare', cost: 45000, weight: 0.5, quantity: 1, description: 'Str 23 for 1 hour.', effect: { type: 'buff', stat: 'str_score', value: '23', duration: 600 } },
    { id: 'potion_giant_strength_fire', name: 'Potion of Giant Strength (Fire)', type: 'potion', rarity: 'rare', cost: 50000, weight: 0.5, quantity: 1, description: 'Str 25 for 1 hour.', effect: { type: 'buff', stat: 'str_score', value: '25', duration: 600 } },
    { id: 'potion_giant_strength_cloud', name: 'Potion of Giant Strength (Cloud)', type: 'potion', rarity: 'very_rare', cost: 150000, weight: 0.5, quantity: 1, description: 'Str 27 for 1 hour.', effect: { type: 'buff', stat: 'str_score', value: '27', duration: 600 } },
    { id: 'potion_giant_strength_storm', name: 'Potion of Giant Strength (Storm)', type: 'potion', rarity: 'legendary', cost: 250000, weight: 0.5, quantity: 1, description: 'Str 29 for 1 hour.', effect: { type: 'buff', stat: 'str_score', value: '29', duration: 600 } },
    
    { id: 'potion_growth', name: 'Potion of Growth', type: 'potion', rarity: 'uncommon', cost: 27000, weight: 0.5, quantity: 1, description: 'Enlarge for 1d4 hours.', effect: { type: 'buff', value: 'enlarged', duration: 240 }, spells: [{ name: 'Enlarge/Reduce', cost: 0 }] },
    { id: 'potion_heroism', name: 'Potion of Heroism', type: 'potion', rarity: 'rare', cost: 10000, weight: 0.5, quantity: 1, description: '10 Temp HP + Bless for 1 hour.', effect: { type: 'buff', value: 'bless', duration: 600 }, spells: [{ name: 'Bless', cost: 0 }] },
    { id: 'potion_invisibility', name: 'Potion of Invisibility', type: 'potion', rarity: 'very_rare', cost: 50000, weight: 0.5, quantity: 1, description: 'Invisible for 1 hour.', effect: { type: 'buff', value: 'invisible', duration: 600 }, spells: [{ name: 'Invisibility', cost: 0 }] },
    { id: 'potion_invulnerability', name: 'Potion of Invulnerability', type: 'potion', rarity: 'rare', cost: 35000, weight: 0.5, quantity: 1, description: 'Resistance to all damage for 1 minute.', effect: { type: 'buff', value: 'resistance_all', duration: 10 } },
    { id: 'potion_longevity', name: 'Potion of Longevity', type: 'potion', rarity: 'very_rare', cost: 90000, weight: 0.5, quantity: 1, description: 'Reduce age by 1d6+6 years.' },
    { id: 'potion_mind_reading', name: 'Potion of Mind Reading', type: 'potion', rarity: 'rare', cost: 15000, weight: 0.5, quantity: 1, description: 'Detect Thoughts effect for 10 minutes.', effect: { type: 'buff', value: 'mind_reading', duration: 100 }, spells: [{ name: 'Detect Thoughts', cost: 0 }] },
    { id: 'potion_poison', name: 'Potion of Poison', type: 'potion', rarity: 'uncommon', cost: 10000, weight: 0.5, quantity: 1, description: 'Looks like healing potion. 4d6 poison damage + poisoned.', effect: { type: 'damage', value: '4d6', stat: 'poison' } },
    
    { id: 'potion_resistance_fire', name: 'Potion of Fire Resistance', type: 'potion', rarity: 'uncommon', cost: 6000, weight: 0.5, quantity: 1, description: 'Resistance to Fire for 1 hour.', effect: { type: 'buff', value: 'resistance', stat: 'fire', duration: 600 } },
    { id: 'potion_resistance_cold', name: 'Potion of Cold Resistance', type: 'potion', rarity: 'uncommon', cost: 6000, weight: 0.5, quantity: 1, description: 'Resistance to Cold for 1 hour.', effect: { type: 'buff', value: 'resistance', stat: 'cold', duration: 600 } },
    { id: 'potion_resistance_lightning', name: 'Potion of Lightning Resistance', type: 'potion', rarity: 'uncommon', cost: 6000, weight: 0.5, quantity: 1, description: 'Resistance to Lightning for 1 hour.', effect: { type: 'buff', value: 'resistance', stat: 'lightning', duration: 600 } },
    { id: 'potion_resistance_acid', name: 'Potion of Acid Resistance', type: 'potion', rarity: 'uncommon', cost: 6000, weight: 0.5, quantity: 1, description: 'Resistance to Acid for 1 hour.', effect: { type: 'buff', value: 'resistance', stat: 'acid', duration: 600 } },
    { id: 'potion_resistance_poison', name: 'Potion of Poison Resistance', type: 'potion', rarity: 'uncommon', cost: 6000, weight: 0.5, quantity: 1, description: 'Resistance to Poison for 1 hour.', effect: { type: 'buff', value: 'resistance', stat: 'poison', duration: 600 } },
    { id: 'potion_resistance_necrotic', name: 'Potion of Necrotic Resistance', type: 'potion', rarity: 'uncommon', cost: 6000, weight: 0.5, quantity: 1, description: 'Resistance to Necrotic for 1 hour.', effect: { type: 'buff', value: 'resistance', stat: 'necrotic', duration: 600 } },
    
    { id: 'potion_speed', name: 'Potion of Speed', type: 'potion', rarity: 'very_rare', cost: 40000, weight: 0.5, quantity: 1, description: 'Haste for 1 minute.', effect: { type: 'buff', value: 'haste', duration: 10 }, spells: [{ name: 'Haste', cost: 0 }] },
    { id: 'potion_vitality', name: 'Potion of Vitality', type: 'potion', rarity: 'very_rare', cost: 50000, weight: 0.5, quantity: 1, description: 'Removes exhaustion/poison. Max HP heals for 24h.', spells: [{ name: 'Lesser Restoration', cost: 0 }] },
    { id: 'potion_water_breathing', name: 'Potion of Water Breathing', type: 'potion', rarity: 'uncommon', cost: 6000, weight: 0.5, quantity: 1, description: 'Breathe underwater for 24 hours.', effect: { type: 'buff', value: 'water_breathing', duration: 14400 }, spells: [{ name: 'Water Breathing', cost: 0 }] },
    
    { id: 'elixir_health', name: 'Elixir of Health', type: 'potion', rarity: 'rare', cost: 12000, weight: 0.5, quantity: 1, description: 'Cures disease, blindness, deafness, paralysis, poison.', spells: [{ name: 'Lesser Restoration', cost: 0 }] },
    { id: 'oil_etherealness', name: 'Oil of Etherealness', type: 'potion', rarity: 'rare', cost: 40000, weight: 0.5, quantity: 1, description: 'Etherealness for 1 hour.' },
    { id: 'oil_sharpness', name: 'Oil of Sharpness', type: 'potion', rarity: 'very_rare', cost: 60000, weight: 0.5, quantity: 1, description: 'Coat weapon: +3 bonus for 1 hour.' },
    { id: 'oil_slipperiness', name: 'Oil of Slipperiness', type: 'potion', rarity: 'uncommon', cost: 10000, weight: 0.5, quantity: 1, description: 'Freedom of Movement for 8 hours.', spells: [{ name: 'Freedom of Movement', cost: 0 }] },
    { id: 'philter_love', name: 'Philter of Love', type: 'potion', rarity: 'uncommon', cost: 9000, weight: 0.5, quantity: 1, description: 'Charmed by next person seen for 1 hour.', spells: [{ name: 'Charm Person', cost: 0 }] }
];


import { SRDSpell } from '../../types';
import { CANTRIPS } from './cantrips';
import { LEVEL_1_SPELLS } from './level1';
import { LEVEL_2_SPELLS } from './level2';
import { LEVEL_3_SPELLS } from './level3';
import { LEVEL_4_SPELLS } from './level4';
import { LEVEL_5_SPELLS } from './level5';
import { LEVEL_6_SPELLS } from './level6';
import { LEVEL_7_SPELLS } from './level7';
import { LEVEL_8_SPELLS } from './level8';
import { LEVEL_9_SPELLS } from './level9';

// Flatten dictionaries into a single array for easy searching/filtering in UI
export const SPELL_DB: SRDSpell[] = [
    ...Object.values(CANTRIPS),
    ...Object.values(LEVEL_1_SPELLS),
    ...Object.values(LEVEL_2_SPELLS),
    ...Object.values(LEVEL_3_SPELLS),
    ...Object.values(LEVEL_4_SPELLS),
    ...Object.values(LEVEL_5_SPELLS),
    ...Object.values(LEVEL_6_SPELLS),
    ...Object.values(LEVEL_7_SPELLS),
    ...Object.values(LEVEL_8_SPELLS),
    ...Object.values(LEVEL_9_SPELLS)
];

export const getSpellByName = (name: string): SRDSpell | undefined => {
    return SPELL_DB.find(s => s.name.toLowerCase() === name.toLowerCase());
};

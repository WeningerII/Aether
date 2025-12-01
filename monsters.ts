
import { MonsterData, MonsterType } from '../types';
import { ABERRATIONS } from './monsters/aberrations';
import { BEASTS } from './monsters/beasts';
import { CELESTIALS } from './monsters/celestials';
import { CONSTRUCTS } from './monsters/constructs';
import { DRAGONS } from './monsters/dragons';
import { ELEMENTALS } from './monsters/elementals';
import { FEY } from './monsters/fey';
import { FIENDS } from './monsters/fiends';
import { GIANTS } from './monsters/giants';
import { HUMANOIDS } from './monsters/humanoids';
import { MONSTROSITIES } from './monsters/monstrosities';
import { OOZES } from './monsters/oozes';
import { PLANTS } from './monsters/plants';
import { UNDEAD } from './monsters/undead';

export const MONSTER_COMPENDIUM: MonsterData[] = [
    ...ABERRATIONS,
    ...BEASTS,
    ...CELESTIALS,
    ...CONSTRUCTS,
    ...DRAGONS,
    ...ELEMENTALS,
    ...FEY,
    ...FIENDS,
    ...GIANTS,
    ...HUMANOIDS,
    ...MONSTROSITIES,
    ...OOZES,
    ...PLANTS,
    ...UNDEAD
];

export const getMonstersByType = (type: MonsterType) => MONSTER_COMPENDIUM.filter(m => m.type === type);

// Re-export individual arrays if needed elsewhere
export {
    ABERRATIONS, BEASTS, CELESTIALS, CONSTRUCTS, DRAGONS, 
    ELEMENTALS, FEY, FIENDS, GIANTS, HUMANOIDS, 
    MONSTROSITIES, OOZES, PLANTS, UNDEAD
};


import { Item } from '../types';
import { MAGIC_POTIONS } from './magic/potions';
import { MAGIC_WEAPONS } from './magic/weapons';
import { MAGIC_ARMOR } from './magic/armor';
import { MAGIC_RINGS } from './magic/rings';
import { MAGIC_RODS } from './magic/rods';
import { MAGIC_WANDS } from './magic/wands';
import { WONDROUS_ITEMS } from './magic/wondrous';
import { MAGIC_SCROLLS } from './magic/scrolls';
import { MAGIC_STAFFS } from './magic/staffs';

export const MAGIC_ITEMS: Item[] = [
    ...MAGIC_POTIONS,
    ...MAGIC_WEAPONS,
    ...MAGIC_ARMOR,
    ...MAGIC_RINGS,
    ...MAGIC_RODS,
    ...MAGIC_WANDS,
    ...WONDROUS_ITEMS,
    ...MAGIC_SCROLLS,
    ...MAGIC_STAFFS
];

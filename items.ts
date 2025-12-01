
import { Item } from '../types';
import { WEAPONS } from './items/weapons';
import { ARMOR } from './items/armor';
import { TOOLS } from './items/tools';
import { CRAFTING_TOOLS } from './items/crafting';
import { ADVENTURING_GEAR } from './items/gear';
import { MOUNTS, VEHICLES } from './items/mounts';
import { SERVICES } from './items/services';
import { MAGIC_ITEMS } from './items/magicItems';
import { CURRENCY_ITEMS } from './items/currency';

export const ITEM_COMPENDIUM: Item[] = [
    ...WEAPONS,
    ...ARMOR,
    ...TOOLS,
    ...CRAFTING_TOOLS,
    ...ADVENTURING_GEAR,
    ...MOUNTS,
    ...VEHICLES,
    ...SERVICES,
    ...MAGIC_ITEMS,
    ...CURRENCY_ITEMS
];

export * from './items/currency';

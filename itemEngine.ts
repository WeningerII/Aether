
import { Token, Item, FloatingText, Actor } from '../types';
import * as Rules from './gameLogic';

export interface ItemUseResult {
    token: Actor;
    logs: string[];
    floatingTexts: FloatingText[];
    rollVal?: number;
}

export const resolveItemUse = (token: Actor, item: Item): ItemUseResult => {
    let updatedToken = { ...token };
    const logs: string[] = [];
    const floatingTexts: FloatingText[] = [];
    let logMsg = `${token.name} uses ${item.name}`;
    let rollVal = 0;

    const addFloat = (x: number, y: number, text: string, color: string, type: FloatingText['type'] = 'info') => {
        floatingTexts.push({ id: Math.random().toString(), x, y, text, color, type });
    };

    if (item.effect) {
        if (item.effect.type === 'heal' && item.effect.value) {
            // Temp HP Support
            if (item.effect.stat === 'temp') {
                rollVal = Rules.parseDiceString(item.effect.value);
                const currentTemp = updatedToken.tempHp || 0;
                if (rollVal > currentTemp) {
                    updatedToken.tempHp = rollVal;
                    logMsg += ` as a Bonus Action. Gained ${rollVal} Temporary HP.`;
                    addFloat(token.x, token.y, `+${rollVal} THP`, '#60a5fa', 'heal');
                } else {
                    logMsg += ` (Existing Temp HP ${currentTemp} is higher).`;
                }
            } 
            // Regular Healing
            else if (Rules.canHeal(token)) {
                rollVal = Rules.parseDiceString(item.effect.value);
                updatedToken.hp = Math.min(token.maxHp || 10, (token.hp || 0) + rollVal);
                logMsg += ` as a Bonus Action. Recovered ${rollVal} HP.`;
                addFloat(token.x, token.y, `+${rollVal}`, '#4ade80', 'heal');
            } else {
                logMsg += ` but cannot be healed!`;
                addFloat(token.x, token.y, `NO HEAL`, '#9ca3af', 'info');
            }
        } else if (item.effect.type === 'buff') {
            // Handle Buff Potions/Items (e.g. Invisibility, Stats)
            const duration = item.effect.duration || 10;
            const currentEffects = updatedToken.statusEffects || [];
            
            let effectId = item.effect.value || 'buff';
            let val: number | undefined = undefined;

            // If it has a specific stat target (e.g. str_score, or ac_bonus)
            if (item.effect.stat) {
                effectId = item.effect.stat;
                // Try parse value if it is a number (e.g. '21' or '2')
                const parsed = parseInt(item.effect.value || '0');
                if (!isNaN(parsed)) val = parsed;
            } 
            
            // Replace if exists, else add
            const newEffects = [...currentEffects.filter(e => e.id !== effectId), { id: effectId, duration, value: val }];
            
            // Re-calculate stats immediately
            updatedToken = Rules.calculateTokenStats({ ...updatedToken, statusEffects: newEffects }) as Actor;
            
            logMsg += ` as a Bonus Action. Gained effect: ${effectId.replace(/_/g, ' ').toUpperCase()} (${duration} rounds).`;
            addFloat(token.x, token.y, 'BUFF', '#a855f7', 'info');
        } else if (item.effect.type === 'utility' && item.effect.value && item.effect.value.startsWith('deposit_')) {
            // Handle Currency Deposit
            const type = item.effect.value.split('_')[1] as keyof typeof token.wallet;
            const amount = item.quantity || 1;
            const currentWallet = updatedToken.wallet || { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };
            
            if (currentWallet[type] !== undefined) {
                 currentWallet[type] = (currentWallet[type] || 0) + amount;
                 updatedToken.wallet = currentWallet;
                 logMsg = `${token.name} deposits ${amount} ${type.toUpperCase()}.`;
                 addFloat(token.x, token.y, `+${amount} ${type.toUpperCase()}`, '#fbbf24', 'info');
                 
                 const newInventory = (updatedToken.inventory || []).filter(i => i.id !== item.id);
                 updatedToken.inventory = newInventory;
                 
                 logs.push(logMsg);
                 return { token: updatedToken, logs, floatingTexts };
            }
        }
    }
    
    let updatedInventory = updatedToken.inventory || [];
    if (item.type === 'potion' || item.type === 'misc' || item.type === 'gear' || item.type === 'currency') {
        if (item.quantity > 1) updatedInventory = updatedInventory.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i);
        else updatedInventory = updatedInventory.filter(i => i.id !== item.id);
    }
    updatedToken.inventory = updatedInventory;
    
    logs.push(logMsg);
    return { token: updatedToken, logs, floatingTexts, rollVal };
};

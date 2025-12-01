
import { AbilityScores } from '../types';

export interface ParsedCharacter {
  name: string;
  maxHp: number;
  hp: number;
  ac: number;
  initiative: number;
  speed: number;
  avatarUrl: string;
  attackBonus: number;
  stats: AbilityScores;
  heritage: string;
  class: string;
  subclass: string;
  level: number;
  hitDiceUsed: number;
  feats: string[];
}

const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 8000): Promise<Response> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};

/**
 * Fetches character data from D&D Beyond using multiple CORS proxies to ensure reliability.
 */
export const getDndBeyondCharacter = async (urlOrId: string): Promise<ParsedCharacter | null> => {
  // 1. Extract ID
  const idMatch = urlOrId.match(/characters\/(\d+)/) || urlOrId.match(/^(\d+)$/);
  const characterId = idMatch ? idMatch[1] : null;

  if (!characterId) {
    throw new Error("Could not find a Character ID in the provided URL.");
  }

  const targetUrl = `https://character-service.dndbeyond.com/character/v5/character/${characterId}`;

  const attemptFetch = async (proxyUrl: string) => {
      const response = await fetchWithTimeout(proxyUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid content-type: expected json");
      }
      return await response.json();
  };

  // 2. Attempt Fetch via Proxies
  // We try corsproxy.io first as it's usually faster and supports headers better.
  try {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    const data = await attemptFetch(proxyUrl);
    return parseDndBeyondJson(data);
  } catch (e) {
    console.warn("Primary proxy failed or timed out, attempting backup proxy...", e);
  }

  // Backup: allorigins (raw)
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    const data = await attemptFetch(proxyUrl);
    return parseDndBeyondJson(data);
  } catch (e) {
    console.error("Backup proxy failed", e);
  }

  throw new Error("Failed to fetch character data. The D&D Beyond API might be unreachable, the character is private, or the network timed out.");
};

export const parseDndBeyondJson = (data: any): ParsedCharacter | null => {
  try {
    // Handle different wrapping styles (API vs Export)
    const char = data.data || data.character || data;

    if (!char || (!char.name && !char.id)) {
        throw new Error("Invalid character data structure");
    }

    const name = char.name || "Unknown Hero";

    // --- Helper: Get All Modifiers ---
    const getAllModifiers = (type: string, subType: string) => {
        const mods: any[] = [];
        const categories = ['race', 'class', 'background', 'item', 'feat', 'condition'];
        categories.forEach(cat => {
            if (char.modifiers?.[cat]) {
                char.modifiers[cat].forEach((m: any) => {
                    if (m.type === type && m.subType === subType) mods.push(m);
                });
            }
        });
        return mods;
    };

    // --- Stats ---
    // IDs: 1:STR, 2:DEX, 3:CON, 4:INT, 5:WIS, 6:CHA
    const getStatValue = (id: number) => {
        try {
            const stat = char.stats?.find((s: any) => s.id === id);
            const bonus = char.bonusStats?.find((s: any) => s.id === id);
            const override = char.overrideStats?.find((s: any) => s.id === id);
            
            if (override && override.value) return override.value;
            
            const base = (stat?.value || 10);
            const bon = (bonus?.value || 0);
            return base + bon;
        } catch (e) {
            return 10;
        }
    };
    
    const str = getStatValue(1);
    const dex = getStatValue(2);
    const con = getStatValue(3);
    const int = getStatValue(4);
    const wis = getStatValue(5);
    const cha = getStatValue(6);

    const getMod = (score: number) => Math.floor((score - 10) / 2);
    
    const strMod = getMod(str);
    const dexMod = getMod(dex);
    const conMod = getMod(con);
    const wisMod = getMod(wis);

    // --- HP ---
    let currentHp = 10;
    let maxHp = 10;
    try {
        const baseHp = char.baseHitPoints || 10;
        const bonusHp = char.bonusHitPoints || 0;
        // Calculate con bonus per level approx if not provided
        maxHp = char.overrideHitPoints !== null && char.overrideHitPoints !== undefined ? char.overrideHitPoints : (baseHp + bonusHp);
        
        // Fallback if maxHp is suspiciously low for a high level character
        const lvl = char.classes?.reduce((acc: number, c: any) => acc + c.level, 0) || 1;
        // Add con mod per level if not seemingly included
        if (maxHp < lvl * 2) maxHp += (lvl * conMod);
        // Add Tough feat or similar mods (hp-per-level)
        const hpPerLevelMods = getAllModifiers('bonus', 'hit-points-per-level');
        hpPerLevelMods.forEach(m => maxHp += (m.value || 0) * lvl);

        if (maxHp < 1) maxHp = 10;

        const removedHp = char.removedHitPoints || 0;
        currentHp = Math.max(0, maxHp - removedHp);
    } catch (e) { console.warn("HP Parse fail", e); }

    // --- AC Calculation ---
    let ac = 10 + dexMod;
    try {
         // 1. Identify Equipment
         let armorAC = 0;
         let shieldAC = 0;
         let hasArmor = false;
         let hasShield = false;
         let armorType = 'none'; // light, medium, heavy
         
         // Check override first
         const acOverride = char.overrideStats?.find((s:any) => s.id === 2)?.value; // Logic quirk, usually DEX id but sometimes reused. 
         // Note: Real AC override is in preferences. Assuming standard calculation if no blatant override.

         if (char.inventory) {
            char.inventory.forEach((item: any) => {
                if (item.equipped && item.definition) {
                    if (item.definition.armorClass) {
                         const armorVal = item.definition.armorClass;
                         const typeId = item.definition.armorTypeId; 
                         // DDB Armor Type IDs: 1: Light, 2: Medium, 3: Heavy, 4: Shield
                         
                         if (typeId === 4) {
                             hasShield = true;
                             shieldAC = armorVal; 
                         } else if (typeId >= 1 && typeId <= 3) {
                             hasArmor = true;
                             armorAC = armorVal;
                             armorType = typeId === 1 ? 'light' : typeId === 2 ? 'medium' : 'heavy';
                         }
                    }
                }
            });
         }

         // 2. Base Calculation
         if (hasArmor) {
             if (armorType === 'heavy') {
                 ac = armorAC;
             } else if (armorType === 'medium') {
                 ac = armorAC + Math.min(2, dexMod);
             } else {
                 ac = armorAC + dexMod;
             }
         } else {
             // Unarmored Defense Checks (Monk, Barbarian, Draconic Sorcerer, etc.)
             // Check for 'set' -> 'unarmored-armor-class' or similar modifiers
             const unarmoredMods = getAllModifiers('set', 'unarmored-armor-class');
             const acBonusMods = getAllModifiers('bonus', 'unarmored-armor-class'); // Barb/Monk usually implies adding a stat
             
             // Simplistic check for class-based Unarmored Defense logic if modifiers aren't explicit enough
             const isBarbarian = char.classes?.some((c:any) => c.definition.name === 'Barbarian');
             const isMonk = char.classes?.some((c:any) => c.definition.name === 'Monk');
             
             if (isBarbarian) {
                 // 10 + Dex + Con. Shields allowed.
                 ac = 10 + dexMod + conMod;
             } else if (isMonk) {
                 // 10 + Dex + Wis. Shields NOT allowed.
                 ac = 10 + dexMod + wisMod;
                 if (hasShield) ac = 10 + dexMod; // Fallback to normal if shield equipped
             } else {
                 // Draconic Resilience etc (13 + Dex)
                 // Often found as a 'set' -> 'unarmored-armor-class' -> value 13
                 let baseUnarmored = 10;
                 unarmoredMods.forEach(m => {
                     if (m.value && m.value > baseUnarmored) baseUnarmored = m.value;
                 });
                 // Natural Armor (Lizardfolk etc)
                 const naturalArmor = getAllModifiers('set', 'ac'); // Sometimes simple set AC
                 naturalArmor.forEach(m => {
                     if (m.value && m.value > baseUnarmored) baseUnarmored = m.value;
                 });

                 ac = baseUnarmored + dexMod;
             }
         }

         // 3. Shield
         if (hasShield) ac += shieldAC;

         // 4. Global Bonuses (Ring of Protection, Fighting Style: Defense, etc.)
         const allAcBonuses = getAllModifiers('bonus', 'armor-class');
         allAcBonuses.forEach(mod => {
             // Some bonuses have restrictions (e.g. "while wearing armor")
             // DDB API doesn't always expose restriction logic easily, usually computed by their backend.
             // We apply blindly unless obvious restriction text is present (simplified).
             ac += (mod.value || 0);
         });
         
         // Dual Wielder feat bonus handled via modifiers usually, or check explicitly?
         // If getAllModifiers captures 'feat' bonuses, we are good.

    } catch (e) {
        console.warn("AC Calc Fallback", e);
    }

    // --- Initiative ---
    let initiative = dexMod + (char.initiativeBonus || 0);
    // Add initiative bonuses (Alert feat, etc)
    const initMods = getAllModifiers('bonus', 'initiative');
    initMods.forEach(m => initiative += (m.value || 0));

    // --- Speed ---
    let speed = 6;
    try {
        const speedFeet = char.race?.weightSpeed || char.race?.speed || 30;
        // Add speed bonuses (Monk, Mobile feat)
        let bonusSpeed = 0;
        const speedMods = getAllModifiers('bonus', 'speed');
        speedMods.forEach(m => bonusSpeed += (m.value || 0));
        
        speed = Math.floor((speedFeet + bonusSpeed) / 5); 
    } catch(e) {}

    // --- Avatar ---
    const avatarUrl = char.decorations?.avatarUrl || char.avatarUrl || char.frameAvatarUrl || '';

    // --- Attack Bonus ---
    let attackBonus = 2;
    let totalLevel = 1;
    let className = 'Commoner';
    let subclassName = 'None';
    let hitDiceUsed = 0;

    try {
        totalLevel = char.classes?.reduce((acc: number, c: any) => acc + c.level, 0) || 1;
        hitDiceUsed = char.classes?.reduce((acc: number, c: any) => acc + (c.hitDiceUsed || 0), 0) || 0;
        
        const proficiency = Math.floor((totalLevel - 1) / 4) + 2;
        const bestMod = Math.max(strMod, dexMod);
        attackBonus = proficiency + bestMod;
        
        const primaryClassObj = char.classes?.[0];
        if (primaryClassObj) {
            className = primaryClassObj.definition?.name || 'Commoner';
            subclassName = primaryClassObj.subclassDefinition?.name || 'None';
        }
    } catch(e) {}
    
    // --- Heritage ---
    const heritage = char.race?.fullName || char.race?.baseName || 'Unknown';

    // --- Feats ---
    const feats: string[] = [];
    try {
        if (char.feats) {
          char.feats.forEach((f: any) => {
            if (f.definition?.name) feats.push(f.definition.name);
          });
        }
    } catch(e) {}

    return {
        name,
        maxHp,
        hp: currentHp,
        ac,
        initiative,
        speed,
        avatarUrl,
        attackBonus,
        stats: { str, dex, con, int, wis, cha },
        heritage,
        class: className,
        subclass: subclassName,
        level: totalLevel,
        hitDiceUsed,
        feats
    };

  } catch (e) {
      console.error("DDB Parse logic error", e);
      return null;
  }
};

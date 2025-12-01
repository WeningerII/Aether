
import { GameState, TokenType } from '../types';
import { INITIAL_TOKENS } from '../constants';

const DB_NAME = 'AetherTableDB';
const DB_VERSION = 1;
const STORE_NAME = 'gameState';
const KEY = 'current_campaign';

const DEFAULT_STATE: GameState = {
  tokens: INITIAL_TOKENS, 
  selectedTokenId: null,
  activeTurnId: null,
  round: 1,
  logs: [
    {
      id: 'init',
      timestamp: Date.now(),
      sender: 'System',
      content: 'Welcome to AetherTable VTT. Storage upgraded to IndexedDB (High Capacity).',
      type: 'normal'
    }
  ],
  mapBackgroundImage: null,
  floatingTexts: [],
  combatMode: {
    active: false,
    sourceId: null,
    action: null
  },
  linkingMode: {
    active: false,
    sourceId: null
  }
};

let dbInstance: IDBDatabase | null = null;

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
        resolve(dbInstance);
        return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("IndexedDB error:", event);
      reject("Could not open database");
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      
      dbInstance.onclose = () => {
          dbInstance = null;
      };
      
      dbInstance.onversionchange = () => {
          dbInstance?.close();
          dbInstance = null;
      };

      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

export const saveGameState = async (state: GameState): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(state, KEY);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    request.onerror = () => reject(request.error);
  });
};

const sanitizeState = (data: any): GameState => {
    if (!data) return DEFAULT_STATE;
    
    // Deep merge with default to ensure all keys exist
    const merged = { ...DEFAULT_STATE, ...data };
    
    // Ensure strict types for critical arrays
    if (!Array.isArray(merged.tokens)) merged.tokens = [];
    if (!Array.isArray(merged.logs)) merged.logs = [];
    if (!Array.isArray(merged.floatingTexts)) merged.floatingTexts = [];
    
    // Clean tokens
    merged.tokens = merged.tokens.map((t: any) => {
        if (!t) return null; // Filter out pure nulls first
        
        // Basic ID ensure
        if (!t.id) t.id = Math.random().toString();
        
        // Coordinate Sanitization
        if (typeof t.x !== 'number' || isNaN(t.x)) t.x = 0;
        if (typeof t.y !== 'number' || isNaN(t.y)) t.y = 0;
        
        if (!Array.isArray(t.statusEffects)) t.statusEffects = [];
        
        // Strict Type Assignment
        if (t.drawingData) {
            // It's a prop
            t.type = TokenType.OBJECT;
        } else {
            // It's an actor
            if (!t.type || t.type === TokenType.OBJECT) {
                // If type is missing or incorrectly marked as OBJECT but has no drawingData, default to NPC
                t.type = TokenType.NPC; 
            }
            // Ensure Actor stats exist
            if (!t.stats) t.stats = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
            
            // Stats Sanitization (Prevent NaN propagation)
            t.hp = typeof t.hp === 'number' && !isNaN(t.hp) ? t.hp : 10;
            t.maxHp = typeof t.maxHp === 'number' && !isNaN(t.maxHp) ? t.maxHp : 10;
            t.ac = typeof t.ac === 'number' && !isNaN(t.ac) ? t.ac : 10;
            t.speed = typeof t.speed === 'number' && !isNaN(t.speed) ? t.speed : 6;
            t.initiative = typeof t.initiative === 'number' && !isNaN(t.initiative) ? t.initiative : 0;
        }

        return t;
    }).filter((t: any) => t !== null); // Remove nulls

    // Reset combat mode if invalid
    if (!merged.combatMode || typeof merged.combatMode !== 'object') {
        merged.combatMode = DEFAULT_STATE.combatMode;
    }
    
    // Reset linking mode if invalid or missing
    if (!merged.linkingMode || typeof merged.linkingMode !== 'object') {
        merged.linkingMode = DEFAULT_STATE.linkingMode;
    }

    return merged;
};

export const loadGameState = async (): Promise<GameState> => {
  // Check for migration from LocalStorage FIRST
  const legacyData = localStorage.getItem('aethertable_gamestate');
  if (legacyData) {
    try {
        const parsed = JSON.parse(legacyData);
        console.log("Migrating legacy data to IndexedDB...");
        const merged = sanitizeState(parsed);
        await saveGameState(merged); 
        localStorage.removeItem('aethertable_gamestate'); 
        return merged;
    } catch (e) {
        console.warn("Failed to migrate legacy data", e);
    }
  }

  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(KEY);

    request.onsuccess = () => {
      const result = request.result;
      if (result) {
          resolve(sanitizeState(result));
      } else {
          resolve(DEFAULT_STATE);
      }
    };
    request.onerror = () => reject(request.error);
  });
};

export const clearGameState = async (): Promise<void> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        store.delete(KEY);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
};
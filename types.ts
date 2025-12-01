

export enum TokenType {
  PLAYER = 'PLAYER',
  ENEMY = 'ENEMY',
  NPC = 'NPC',
  OBJECT = 'OBJECT'
}

export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface ActiveStatusEffect {
  id: string;
  duration: number; // Rounds remaining
  value?: number; // For things like Bardic Inspiration die value
  sourceId?: string; // Who applied this? Important for Vex
}

export interface ClassResource {
  name: string;
  current: number;
  max: number;
  dieSize?: number; // e.g., 8 for d8
  recharge: 'short' | 'long';
}

// --- ITEM SYSTEM ---
export type ItemType = 
  | 'currency' | 'weapon' | 'armor' | 'tool' | 'gear' | 'mount' 
  | 'vehicle' | 'service' | 'magic' | 'crafting' | 'potion' | 'scroll'
  | 'treasure' | 'misc';

export interface BaseItem {
    id: string;
    name: string;
    type: ItemType;
    quantity: number;
    weight?: number;
    cost?: number;
    description?: string;
    equipped?: boolean;
    rarity?: 'common' | 'uncommon' | 'rare' | 'very_rare' | 'legendary';
    effect?: {
        type: 'heal' | 'damage' | 'buff' | 'utility';
        value?: string;
        stat?: string;
        duration?: number;
    };
    passiveBonuses?: {
        stat: string;
        value: number;
    }[];
    charges?: {
        current: number;
        max: number;
        recharge?: string;
    };
    spells?: {
        name: string;
        cost: number;
    }[];
    resistances?: string[];
    immunities?: string[];
}

export interface WeaponItem extends BaseItem {
    type: 'weapon' | 'magic';
    damage?: { dice: string; type: string; };
    properties?: string[];
    mastery?: 'Cleave' | 'Graze' | 'Nick' | 'Push' | 'Sap' | 'Slow' | 'Topple' | 'Vex'; 
    range?: string;
    category?: 'Simple' | 'Martial';
    isMagic?: boolean;
}

export interface ArmorItem extends BaseItem {
    type: 'armor' | 'magic';
    armorCategory?: 'Light' | 'Medium' | 'Heavy' | 'Shield';
    baseAC?: number;
    dexBonus?: 'None' | 'Full' | 'Max2';
    strReq?: number;
    stealthDisadvantage?: boolean;
    isMagic?: boolean;
}

export interface PotionItem extends BaseItem {
    type: 'potion' | 'magic';
    effect: {
        type: 'heal' | 'damage' | 'buff' | 'utility';
        value?: string;
        stat?: string;
        duration?: number;
    };
}

export interface MountItem extends BaseItem {
    type: 'mount';
    speed: number;
    capacity?: number;
    monsterId?: string;
}

export interface VehicleItem extends BaseItem {
    type: 'vehicle';
    speed: number;
    capacity?: number;
}

export interface ServiceItem extends BaseItem {
    type: 'service';
    duration?: string;
}

export type Item = WeaponItem | ArmorItem | PotionItem | MountItem | VehicleItem | ServiceItem | BaseItem;

export interface Wallet {
    cp: number;
    sp: number;
    ep: number;
    gp: number;
    pp: number;
}

// --- MONSTER / NPC SYSTEM ---
export type MonsterType = 
  | 'Aberration' | 'Beast' | 'Celestial' | 'Construct' | 'Dragon' 
  | 'Elemental' | 'Fey' | 'Fiend' | 'Giant' | 'Humanoid' 
  | 'Monstrosity' | 'Ooze' | 'Plant' | 'Undead';

export type NPCRole = 'Guide' | 'Adversary' | 'Bystander' | 'Questgiver' | 'Ally' | 'Villain' | 'Mentor' | 'Artisan' | 'Civilian' | 'FactionMember' | 'Mount';

export interface MonsterAction {
    name: string;
    type: 'melee' | 'ranged' | 'multiattack' | 'ability' | 'save';
    desc: string;
    attackBonus?: number;
    damage?: string;
    damageType?: string;
    reach?: number;
    range?: number;
    saveAbility?: string;
    saveDC?: number;
    multiattackActions?: string[];
}

export interface MonsterSpellcasting {
    class: string;
    level: number;
    ability: 'int' | 'wis' | 'cha';
    spells: string[];
    slots?: Record<string, {current: number, max: number}>;
    saveDC?: number;
    attackBonus?: number;
}

export interface MonsterData {
    id: string;
    name: string;
    type: MonsterType;
    size: 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';
    ac: number;
    hp: number;
    speed: number;
    stats: AbilityScores;
    cr: number;
    actions: MonsterAction[];
    bonusActions?: MonsterAction[];
    reactions?: MonsterAction[];
    traits?: {name: string, desc: string}[];
    legendaryActions?: MonsterAction[];
    resistances?: string[];
    immunities?: string[];
    vulnerabilities?: string[];
    conditionImmunities?: string[];
    savingThrowProficiencies?: string[];
    skills?: string[];
    senses?: string;
    languages?: string;
    lore?: string;
    aiBehavior: 'aggressive' | 'defensive' | 'lurker' | 'caster' | 'minion';
    role?: NPCRole;
    spellcasting?: MonsterSpellcasting;
    tags?: string[];
    gear?: string;
}

export interface DrawingData {
  type: 'zone' | 'note' | 'marker' | 'terrain';
  color?: string;
  text?: string;
  opacity?: number;
  blocksMovement?: boolean;
  blocksVision?: boolean;
  terrainType?: 'difficult' | 'cover_half' | 'cover_three_quarters' | 'hazard' | 'obstacle';
  mechanics?: {
      moveCost?: number;
      acBonus?: number;
      damageDice?: string;
      damageType?: string;
      saveDC?: number;
      saveAbility?: 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
      saveEffect?: 'half' | 'none';
      applyStatusId?: string;
      statusDuration?: number;
  };
}

export interface TokenLink {
  targetId: string;
  type: 'generic' | 'familiar' | 'minion' | 'mount';
}

export interface BaseToken {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  symbol: string;
  linkedTokens?: TokenLink[];
}

export interface Actor extends BaseToken {
  type: TokenType.PLAYER | TokenType.ENEMY | TokenType.NPC;
  
  // Core Combat Stats (Required for Actors)
  hp: number;
  maxHp: number;
  ac: number;
  initiative: number;
  speed: number;
  stats: AbilityScores;

  // Optional / Computed
  tempHp?: number;
  attackBonus?: number;
  spellAttackBonus?: number;
  spellSaveDC?: number;
  globalSaveBonus?: number;
  globalCheckBonus?: number;
  critThreshold?: number;

  // Flavor & Progression
  avatarUrl?: string;
  heritage?: string;
  class?: string;
  subclass?: string;
  background?: string; 
  level?: number;
  hitDiceUsed?: number;
  feats?: string[];
  traits?: string[];
  statusEffects?: ActiveStatusEffect[]; 
  
  // Resources
  classResource?: ClassResource;
  spellSlots?: Record<string, { current: number, max: number }>;
  knownSpells?: string[];
  spellAbility?: 'int' | 'wis' | 'cha';
  
  inventory?: Item[];
  wallet?: Wallet;

  // Defenses
  damageResistances?: string[];
  damageImmunities?: string[];
  damageVulnerabilities?: string[];
  conditionImmunities?: string[];
  savingThrowProficiencies?: string[];
  skillProficiencies?: string[];

  deathSaves?: {
    successes: number;
    failures: number;
  };

  monsterData?: MonsterData;
  autoCombat?: boolean;

  originalForm?: Partial<Actor>;
  
  // Actors should technically NOT have drawingData, but we keep it undefined/optional in union
  drawingData?: never;
}

export interface Prop extends BaseToken {
  type: TokenType.OBJECT;
  drawingData: DrawingData;
  
  // Props do not have combat stats
  hp?: never;
  maxHp?: never;
  ac?: never;
  initiative?: never;
  stats?: never;
  inventory?: never;
}

export type Token = Actor | Prop;

// --- GAME LOG TYPES ---

export interface LogEntry {
  id: string;
  timestamp: number;
  sender: 'System' | 'DM' | 'Player';
  content: string;
  type?: 'normal' | 'roll' | 'error' | 'narrative' | 'combat';
  rollValue?: number;
  isCrit?: boolean;
}

export interface GridSize {
  rows: number;
  cols: number;
}

export interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  type: 'damage' | 'heal' | 'miss' | 'crit' | 'info';
}

export interface CombatModeState {
  active: boolean;
  sourceId: string | null;
  action: 'ATTACK' | 'HEAL' | 'ROLL_HIT_DIE' | 'SECOND_WIND' | 'ACTION_SURGE' | 'MANEUVER' | 'CUNNING_ACTION' | 'INDOMITABLE' | 'RECKLESS_ATTACK' | 'INTIMIDATING_PRESENCE' | 'BARDIC_INSPIRATION' | 'USE_INSPIRATION' | 'WILD_SHAPE' | 'CHANNEL_DIVINITY' | 'DIVINE_INTERVENTION' | 'LAY_ON_HANDS' | 'KI_ACTION' | 'FLURRY_OF_BLOWS' | 'PATIENT_DEFENSE' | 'STEP_OF_THE_WIND' | 'WHOLENESS_OF_BODY' | 'EMPTY_BODY' | 'SMITE_TOGGLE' | 'METAMAGIC' | 'FONT_OF_MAGIC' | 'RECOVER_SLOTS' | 'CAST_SPELL' | 'DIVINE_SENSE' | 'CLEANSING_TOUCH' | 'SACRED_WEAPON' | 'TURN_THE_UNHOLY' | 'ABJURE_ENEMY' | 'VOW_OF_ENMITY' | 'VOLLEY' | 'WHIRLWIND_ATTACK' | 'PRIMEVAL_AWARENESS' | 'VANISH' | 'STROKE_OF_LUCK' | 'DARK_ONES_LUCK' | 'FEY_PRESENCE' | 'MISTY_ESCAPE' | 'ENTROPIC_WARD' | 'REVERT_FORM' | 'INNATE_SORCERY' | 'MAGICAL_CUNNING' | 'UNCANNY_METABOLISM' | 'CUNNING_STRIKE' | 'TURN_UNDEAD' | 'RADIANCE_OF_THE_DAWN' | 'PRESERVE_LIFE' | 'RAGE' | 'UNCANNY_DODGE' | 'HELP' | 'BRUTAL_STRIKE' | 'INFLUENCE' | null;
  maneuverType?: string | null;
  spellName?: string | null;
  pendingTarget?: { x: number, y: number } | null;
  itemSourceId?: string | null;
}

export interface GameState {
  tokens: Token[];
  selectedTokenId: string | null;
  activeTurnId: string | null;
  round: number;
  logs: LogEntry[];
  mapBackgroundImage: string | null;
  floatingTexts: FloatingText[];
  combatMode: CombatModeState;
  linkingMode: {
    active: boolean;
    sourceId: string | null;
  };
}

// --- Reducer Actions ---
export type GameAction = 
  | { type: 'LOAD_STATE'; payload: GameState }
  | { type: 'ADD_TOKEN'; payload: Token }
  | { type: 'UPDATE_TOKEN'; payload: Token }
  | { type: 'REMOVE_TOKEN'; payload: string }
  | { type: 'MOVE_TOKEN'; payload: { id: string; x: number; y: number } }
  | { type: 'SELECT_TOKEN'; payload: string | null }
  | { type: 'SET_MAP'; payload: string }
  | { type: 'ADD_LOG'; payload: LogEntry }
  | { type: 'ADD_FLOATING_TEXT'; payload: FloatingText }
  | { type: 'REMOVE_FLOATING_TEXT'; payload: string }
  | { type: 'SET_COMBAT_MODE'; payload: CombatModeState }
  | { type: 'ROLL_INITIATIVE'; payload: Token[] } 
  | { type: 'NEXT_TURN'; payload: { activeTurnId: string; round: number; tokens: Token[] } }
  | { type: 'BATCH_UPDATE_TOKENS'; payload: Token[] }
  | { type: 'RESET_GAME'; payload: GameState }
  | { type: 'SET_LINKING_MODE'; payload: { active: boolean; sourceId: string | null } }
  | { type: 'ADD_LINK'; payload: { sourceId: string; targetId: string; type?: 'generic' } }
  | { type: 'REMOVE_LINK'; payload: { sourceId: string; targetId: string } };

// --- SRD Data Types ---
export interface Trait { name: string; desc: string; }
export interface FeatData { name: string; desc: string; bonuses?: { stats?: Partial<AbilityScores>; hpPerLevel?: number; initiative?: number; speed?: number; ac?: number; } }
export interface HeritageData { name: string; speed: number; bonuses: Partial<AbilityScores>; traits: Trait[]; resistances?: string[]; skills?: string[]; }
export interface Feature { name: string; level: number; desc: string; }
export interface SubclassData { name: string; features: Feature[]; }
export interface ClassData { name: string; hitDie: number; savingThrows: string[]; features: Feature[]; subclasses: SubclassData[]; defaultSkills?: string[]; }
export interface BackgroundData { name: string; skills: string[]; abilityScores: string[]; feat: string; desc?: string; }
export type AreaShape = 'circle' | 'cone' | 'cube' | 'line' | 'sphere' | 'cylinder';
export interface SpellDamage { diceExpression: string; damageType: string; scalingDice?: string; }
export interface SpellSave { ability: string; dc?: number; }
export interface SRDSpell {
  id: string; name: string; level: number; school: string; castingTime: string; range: string; components: string[]; materialComponent?: string; duration: string; description: string;
  damage?: SpellDamage; savingThrow?: SpellSave; attackRoll?: boolean; healing?: { diceExpression: string; scalingDice?: string };
  concentration: boolean; ritual: boolean; classes: string[]; source: string; tags: string[];
  areaShape?: AreaShape; areaSize?: number; statusEffect?: string;
}
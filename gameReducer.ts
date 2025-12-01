
import { GameState, GameAction } from '../types';

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'LOAD_STATE':
      return { ...state, ...action.payload };

    case 'ADD_TOKEN':
      return { ...state, tokens: [...state.tokens, action.payload] };

    case 'UPDATE_TOKEN':
      return {
        ...state,
        tokens: state.tokens.map(t => t.id === action.payload.id ? action.payload : t)
      };

    case 'BATCH_UPDATE_TOKENS':
        // Create a map for faster lookup
        const updateMap = new Map(action.payload.map(t => [t.id, t]));
        return {
            ...state,
            tokens: state.tokens.map(t => updateMap.get(t.id) || t)
        };

    case 'REMOVE_TOKEN':
      return {
        ...state,
        tokens: state.tokens.filter(t => t.id !== action.payload),
        selectedTokenId: state.selectedTokenId === action.payload ? null : state.selectedTokenId
      };

    case 'MOVE_TOKEN':
      return {
        ...state,
        tokens: state.tokens.map(t => 
          t.id === action.payload.id 
            ? { ...t, x: action.payload.x, y: action.payload.y } 
            : t
        )
      };

    case 'SELECT_TOKEN':
      return { ...state, selectedTokenId: action.payload };

    case 'SET_MAP':
      return { ...state, mapBackgroundImage: action.payload };

    case 'ADD_LOG':
      return { ...state, logs: [...state.logs, action.payload] };

    case 'ADD_FLOATING_TEXT':
      return { ...state, floatingTexts: [...state.floatingTexts, action.payload] };

    case 'REMOVE_FLOATING_TEXT':
      return { ...state, floatingTexts: state.floatingTexts.filter(ft => ft.id !== action.payload) };

    case 'SET_COMBAT_MODE':
      return { ...state, combatMode: action.payload };

    case 'SET_LINKING_MODE':
      return { ...state, linkingMode: action.payload };

    case 'ADD_LINK':
      return {
        ...state,
        tokens: state.tokens.map(t => {
          if (t.id === action.payload.sourceId) {
            const existing = t.linkedTokens || [];
            if (existing.some(l => l.targetId === action.payload.targetId)) return t;
            return {
              ...t,
              linkedTokens: [...existing, { targetId: action.payload.targetId, type: action.payload.type || 'generic' }]
            };
          }
          return t;
        })
      };

    case 'REMOVE_LINK':
      return {
        ...state,
        tokens: state.tokens.map(t => {
          if (t.id === action.payload.sourceId && t.linkedTokens) {
            return {
              ...t,
              linkedTokens: t.linkedTokens.filter(l => l.targetId !== action.payload.targetId)
            };
          }
          return t;
        })
      };

    case 'ROLL_INITIATIVE':
      return {
        ...state,
        tokens: action.payload,
        activeTurnId: action.payload[0]?.id || null,
        round: 1
      };

    case 'NEXT_TURN':
      return {
        ...state,
        activeTurnId: action.payload.activeTurnId,
        round: action.payload.round,
        tokens: action.payload.tokens,
        selectedTokenId: action.payload.activeTurnId,
        combatMode: { active: false, sourceId: null, action: null }
      };

    case 'RESET_GAME':
        return action.payload;

    default:
      return state;
  }
};

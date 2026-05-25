/**
 * src/systems/deckSystem.js
 * 
 * [역할] 플레이어의 덱(카드 뭉치) 관리 기능을 전담합니다.
 * 덱에 새로운 카드를 추가하거나, 카드를 제거(압축)하는 로직을 수행하며,
 * 덱이 변경될 때마다 관련 스탯을 재계산하도록 유도합니다.
 */
import { GAME_CONFIG } from '../constants/gameConfig.js';
import { recalculatePlayerStats } from './statSystem.js';
import { t } from '../utils/i18n.js';
import type { GameState } from '../types/state.js';
import type { Card } from '../types/models.js';

export function addCardToDeck(state: GameState, card: Card): GameState {
    if (state.runStatus !== GAME_CONFIG.RUN_STATUS.MAP_NAVIGATING && state.runStatus !== GAME_CONFIG.RUN_STATUS.IN_NODE_ACTION) return state; 
    
    let newCard = JSON.parse(JSON.stringify(card)); 
    newCard.isUpgraded = false; 
    state.deck = [...state.deck, newCard]; 
    
    return recalculatePlayerStats(state);
}

export function removeCardFromDeck(state: GameState, index: number): GameState {
    if (state.runStatus !== GAME_CONFIG.RUN_STATUS.MAP_NAVIGATING && state.runStatus !== GAME_CONFIG.RUN_STATUS.IN_NODE_ACTION) return state; 
    
    state.deck.splice(index, 1); 
    state.deck = [...state.deck]; 
    
    return recalculatePlayerStats(state);
}
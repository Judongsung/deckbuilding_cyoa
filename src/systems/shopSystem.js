/**
 * src/systems/shopSystem.js
 * 
 * [역할] 상점 노드에서의 기능(상품 목록 생성 및 구매)을 전담합니다.
 * 카드, 유물, 포션, 그리고 카드 제거(덱 압축) 서비스를 판매하며,
 * 골드 차감 및 인벤토리 추가 등 거래 결과를 처리합니다.
 */
import { GAME_CONFIG } from '../constants/gameConfig.js';
import { addCardToDeck, removeCardFromDeck } from './deckSystem.js'; // ⭐ 덱 시스템 활용
import { recalculatePlayerStats } from './statSystem.js';
import { TRANSLATIONS, t } from '../utils/i18n.js';

// ⭐ 상점 진입 시 물품을 진열하는 함수 (mapSystem에서 옮겨옴)
export function generateShopInventory(state) {
    // 1. 카드 3장 무작위 진열
    let shopCards = [];
    if (state.cardLibrary.length > 0) {
        for(let i=0; i<3; i++) shopCards.push(state.cardLibrary[Math.floor(Math.random() * state.cardLibrary.length)]);
    }

    // 2. 미보유 유물 1개 진열
    let shopRelics = [];
    let availableRelics = state.relicLibrary.filter(r => !state.player.relics.some(pr => pr.id === r.id));
    if (availableRelics.length > 0) {
        shopRelics.push(availableRelics[Math.floor(Math.random() * availableRelics.length)]);
    }

    // 3. 포션 2개 무작위 진열
    let shopPotions = [];
    if (state.potionLibrary.length > 0) {
        for(let i=0; i<2; i++) shopPotions.push(state.potionLibrary[Math.floor(Math.random() * state.potionLibrary.length)]);
    }

    // 진열대에 상품 올리고 상점 열기
    state.shopInventory = { cards: shopCards, relics: shopRelics, potions: shopPotions };
    state.isShopScreenOpen = true; 
    
    return state;
}

export function buyCardFromShop(state, index) {
    let card = state.shopInventory.cards[index];
    let price = GAME_CONFIG.ECONOMY.CARD_PRICES[card.tier] || 25;
    if (state.player.gold >= price) { 
        state.player.gold -= price; 
        state.battleLogs = [...state.battleLogs, t('LOGS', 'SHOP_BUY_CARD', { card: card.name, price })]; 
        state = addCardToDeck(state, card);
        
        // 품절 처리
        state.shopInventory.cards.splice(index, 1);
    } else { 
        alert(TRANSLATIONS.UI.ALERT_NO_GOLD); 
    } 
    return state;
}

export function buyRelicFromShop(state, index) {
    let relic = state.shopInventory.relics[index];
    let price = GAME_CONFIG.ECONOMY.RELIC_PRICE;
    
    if (state.player.gold >= price) { 
        state.player.gold -= price; 
        state.battleLogs = [...state.battleLogs, t('LOGS', 'SHOP_BUY_RELIC', { relic: relic.name, price })]; 
        
        state.player.relics.push(relic);
        state = recalculatePlayerStats(state);
        
        state.shopInventory.relics.splice(index, 1);
    } else { 
        alert(TRANSLATIONS.UI.ALERT_NO_GOLD); 
    } 
    return state;
}

// ⭐ 포션 구매
export function buyPotionFromShop(state, index) {
    if (state.player.potions.length >= 3) {
        alert(TRANSLATIONS.UI.ALERT_POTION_FULL);
        return state;
    }
    
    let potion = state.shopInventory.potions[index];
    let price = GAME_CONFIG.ECONOMY.POTION_PRICE;
    
    if (state.player.gold >= price) { 
        state.player.gold -= price; 
        state.battleLogs = [...state.battleLogs, t('LOGS', 'SHOP_BUY_POTION', { potion: potion.name, price })]; 
        
        state.player.potions.push(potion);
        state.shopInventory.potions.splice(index, 1);
    } else { 
        alert(TRANSLATIONS.UI.ALERT_NO_GOLD); 
    } 
    return state;
}

export function removeCardInShop(state, index) {
    let cost = GAME_CONFIG.ECONOMY.CARD_REMOVAL_COST;
    
    if (state.player.gold >= cost) { 
        // 1. 상점 고유의 로직 (골드 차감 및 로그 작성)
        state.player.gold -= cost; 
        let removedCard = state.deck[index]; 
        state.battleLogs = [...state.battleLogs, t('LOGS', 'SHOP_REMOVE_CARD', { price: cost, card: removedCard.name })]; 
        
        // 2. 실제 카드 제거 및 스탯 재계산은 덱 시스템에 완벽히 위임
        state = removeCardFromDeck(state, index);
    } else { 
        alert(TRANSLATIONS.UI.ALERT_NO_GOLD); 
    } 
    return state;
}

export function closeShop(state) {
    state.isShopScreenOpen = false; 
    state.runStatus = GAME_CONFIG.RUN_STATUS.MAP_NAVIGATING; // 복귀
    return state;
}
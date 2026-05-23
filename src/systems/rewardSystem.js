/**
 * src/systems/rewardSystem.js
 * 
 * [역할] 전투 승리 등 특정 상황에서 발생하는 전리품/보상 로직을 전담합니다.
 * 골드, 포션, 유물, 카드 보상 등을 무작위로 생성(`generateBattleRewards`)하고,
 * 유저가 특정 보상을 획득하거나 건너뛰는 행위를 처리합니다.
 */
import { GAME_CONFIG } from '../constants/gameConfig.js';
import { t } from '../utils/i18n.js';
import { recalculatePlayerStats } from './statSystem.js';

export function generateBattleRewards(state, earnedGold) {
    const { ECONOMY, NODE_TYPES, EVENT } = GAME_CONFIG;
    
    let pendingRewards = [];
    pendingRewards.push({ type: GAME_CONFIG.REWARD_TYPES.GOLD, amount: earnedGold });
    
    if (Math.random() < ECONOMY.POTION_DROP_RATE) {
        if (state.potionLibrary.length > 0) {
            let randomPotion = state.potionLibrary[Math.floor(Math.random() * state.potionLibrary.length)];
            pendingRewards.push({ type: GAME_CONFIG.REWARD_TYPES.POTION, item: randomPotion });
        }
    }

    if (state.map.lastCompletedNode && (state.map.lastCompletedNode.type === NODE_TYPES.ELITE || state.map.lastCompletedNode.type === NODE_TYPES.BOSS)) {
        let availableRelics = state.relicLibrary.filter(r => !state.player.relics.some(pr => pr.id === r.id));
        if (availableRelics.length > 0) { 
            let randomRelic = availableRelics[Math.floor(Math.random() * availableRelics.length)]; 
            pendingRewards.push({ type: GAME_CONFIG.REWARD_TYPES.RELIC, item: randomRelic });
        }
    }
    
    let cardChoices = []; 
    let lib = state.cardLibrary; 
    if (lib.length > 0) { 
        for(let i=0; i < EVENT.REWARD_CARD_COUNT; i++) cardChoices.push(lib[Math.floor(Math.random() * lib.length)]);
    }
    pendingRewards.push({ type: GAME_CONFIG.REWARD_TYPES.CARD, choices: cardChoices });
    
    state.pendingRewards = pendingRewards; 
    state.isRewardScreenOpen = true;
    return state;
}

export function claimSpecificReward(state, index) {
    const reward = state.pendingRewards[index];
    if (!reward) return state;

    if (reward.type === GAME_CONFIG.REWARD_TYPES.GOLD) {
        state.player.gold += reward.amount;
        let enemyName = t('NODE_TYPES', state.map.lastCompletedNode?.type || 'unknown');
        state.battleLogs = [...state.battleLogs, t('LOGS', 'REWARD_GOLD', { enemy: enemyName, gold: reward.amount })];
    } else if (reward.type === GAME_CONFIG.REWARD_TYPES.POTION) {
        if (state.player.potions.length >= 3) {
            alert(t('UI', 'ALERT_POTION_FULL'));
            return state;
        }
        state.player.potions.push(reward.item);
        state.battleLogs = [...state.battleLogs, t('LOGS', 'REWARD_POTION', { potion: reward.item.name })];
    } else if (reward.type === GAME_CONFIG.REWARD_TYPES.RELIC) {
        state.player.relics.push(reward.item);
        state.battleLogs = [...state.battleLogs, t('LOGS', 'REWARD_RELIC', { relic: reward.item.name })];
    }
    
    state.pendingRewards.splice(index, 1);
    return state;
}

export function claimReward(state, card) { 
    if (card) { 
        let newCard = JSON.parse(JSON.stringify(card)); 
        newCard.isUpgraded = false; 
        state.deck = [...state.deck, newCard]; 
        state = recalculatePlayerStats(state); 
        state.battleLogs = [...state.battleLogs, t('LOGS', 'REWARD_CARD', { card: card.name })]; 
    } else { 
        state.battleLogs = [...state.battleLogs, t('LOGS', 'REWARD_SKIP')]; 
    }
    
    const cardRewardIndex = state.pendingRewards.findIndex(r => r.type === GAME_CONFIG.REWARD_TYPES.CARD);
    if (cardRewardIndex !== -1) {
        state.pendingRewards.splice(cardRewardIndex, 1);
    }
    
    return state;
}

export function skipAllRewards(state) {
    state.pendingRewards = [];
    state.isRewardScreenOpen = false;
    state.runStatus = GAME_CONFIG.RUN_STATUS.MAP_NAVIGATING;
    return state;
}

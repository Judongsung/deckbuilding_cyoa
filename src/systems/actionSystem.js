/**
 * src/systems/actionSystem.js
 * 
 * [역할] 휴식처(모닥불) 및 무작위 이벤트 노드에서의 유저 선택(액션) 처리를 전담합니다.
 * 체력 회복, 카드 강화(제련), 이벤트 선택지 결과 등을 계산하고 상태를 변경합니다.
 */
import { GAME_CONFIG } from '../constants/gameConfig.js';
import { recalculatePlayerStats } from './statSystem.js';
import { t } from '../utils/i18n.js';

export function executeRestHeal(state) {
    const { PLAYER, EVENT } = GAME_CONFIG;
    state.player.hp = Math.min(PLAYER.MAX_HP, state.player.hp + EVENT.REST_HEAL_AMOUNT);
    state.battleLogs = [...state.battleLogs, t('LOGS', 'REST_HEAL', { amount: EVENT.REST_HEAL_AMOUNT })];
    
    state.map.lastCompletedNode = state.map.selectedNode; 
    state.map.currentFloor += 1;
    state.map.selectedNode = null;
    state.isRestScreenOpen = false;
    state.runStatus = GAME_CONFIG.RUN_STATUS.MAP_NAVIGATING; // 복귀
    
    return state;
}

export function executeRestUpgrade(state, index) {
    let card = state.deck[index];
    card.isUpgraded = true;
    state.battleLogs = [...state.battleLogs, t('LOGS', 'REST_UPGRADE', { card: card.name })];
    
    state.map.lastCompletedNode = state.map.selectedNode; 
    state.map.currentFloor += 1;
    state.map.selectedNode = null;
    state.isRestScreenOpen = false;
    state.runStatus = GAME_CONFIG.RUN_STATUS.MAP_NAVIGATING; // 복귀
    
    return recalculatePlayerStats(state);
}

export function executeEventChoice(state, choice) {
    const { RUN_STATUS, ACTIONS } = GAME_CONFIG;
    
    state.battleLogs = [...state.battleLogs, t('LOGS', 'EVENT_CHOICE', { choice: choice.text })];

    if (choice.actions) {
        for (const action of choice.actions) {
            if (action.type === ACTIONS.LEAVE) {
                state.battleLogs = [...state.battleLogs, t('LOGS', 'EVENT_LEAVE')];
            } 
            else if (action.type === ACTIONS.LOSE_HP) {
                state.player.hp -= action.value;
                state.battleLogs = [...state.battleLogs, t('LOGS', 'EVENT_LOSE_HP', { damage: action.value })];
                if (state.player.hp <= 0) {
                    state.battleLogs = [...state.battleLogs, t('LOGS', 'EVENT_DEATH')];
                    state.runStatus = RUN_STATUS.GAMEOVER;
                    break;
                }
            }
            else if (action.type === ACTIONS.LOSE_GOLD) {
                if (state.player.gold >= action.value) {
                    state.player.gold -= action.value;
                    state.battleLogs = [...state.battleLogs, t('LOGS', 'EVENT_LOSE_GOLD', { gold: action.value })];
                } else {
                    alert("골드가 부족합니다!");
                    return state; 
                }
            }
            else if (action.type === ACTIONS.GET_GOLD) {
                state.player.gold += action.value;
                state.battleLogs = [...state.battleLogs, t('LOGS', 'EVENT_GET_GOLD', { gold: action.value })];
            }
            else if (action.type === ACTIONS.HEAL) {
                state.player.hp = Math.min(GAME_CONFIG.PLAYER.MAX_HP, state.player.hp + action.value);
                state.battleLogs = [...state.battleLogs, t('LOGS', 'EVENT_HEAL', { amount: action.value })];
            }
            else if (action.type === ACTIONS.GET_RELIC) {
                let availableRelics = state.relicLibrary.filter(r => !state.player.relics.some(pr => pr.id === r.id));
                if (availableRelics.length > 0) {
                    let randomRelic = availableRelics[Math.floor(Math.random() * availableRelics.length)];
                    state.player.relics.push(randomRelic);
                    state.battleLogs = [...state.battleLogs, t('LOGS', 'EVENT_GET_RELIC', { relic: randomRelic.name })];
                    state = recalculatePlayerStats(state);
                }
            }
        }
    }

    if (state.runStatus === RUN_STATUS.IN_NODE_ACTION) {
        state.isEventScreenOpen = false;
        state.currentEvent = null;
        state.map.lastCompletedNode = state.map.selectedNode; 
        state.map.currentFloor += 1; 
        state.map.selectedNode = null;
        state.runStatus = RUN_STATUS.MAP_NAVIGATING; // 복귀
    }
    
    return state;
}
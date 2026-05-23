/**
 * src/systems/treasureSystem.js
 * 
 * [역할] 보물 상자 노드 전용 로직을 전담합니다.
 * 미보유 유물 중 하나를 무작위로 상자 내용물로 설정하고,
 * 유저가 상자를 열어 유물을 획득하는 처리를 담당합니다.
 */
import { GAME_CONFIG } from '../constants/gameConfig.js';
import { t } from '../utils/i18n.js';

export function openTreasure(state) {
    state.battleLogs = [...state.battleLogs, t('LOGS', 'NODE_TREASURE')];
    let availableRelics = state.relicLibrary.filter(r => !state.player.relics.some(pr => pr.id === r.id));
    
    if (availableRelics.length > 0) {
        const randomRelic = availableRelics[Math.floor(Math.random() * availableRelics.length)];
        state.treasureContent = { relic: randomRelic };
    } else {
        state.treasureContent = { empty: true };
    }
    
    state.isTreasureScreenOpen = true;
    return state;
}

export function claimTreasure(state) {
    if (state.treasureContent && state.treasureContent.relic) {
        state.player.relics.push(state.treasureContent.relic);
        state.battleLogs = [...state.battleLogs, t('LOGS', 'NODE_TREASURE_RELIC', { relic: state.treasureContent.relic.name })];
    } else {
        state.battleLogs = [...state.battleLogs, t('LOGS', 'NODE_TREASURE_EMPTY')];
    }
    state.map.lastCompletedNode = state.map.selectedNode;
    state.map.currentFloor += 1;
    state.map.selectedNode = null;
    state.runStatus = GAME_CONFIG.RUN_STATUS.MAP_NAVIGATING;
    state.isTreasureScreenOpen = false;
    return state;
}

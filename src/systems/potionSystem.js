/**
 * src/systems/potionSystem.js
 * 
 * [역할] 물약(포션) 사용 로직을 전담합니다.
 * 즉시 회복하는 포션, 다음 전투에 스탯을 올려주는 임시 버프 포션 등의 효과를 처리하고
 * 사용 후 인벤토리에서 물약을 제거합니다.
 */
import { GAME_CONFIG } from '../constants/gameConfig.js';
import { recalculatePlayerStats } from './statSystem.js';
import { t } from '../utils/i18n.js';

export function usePotion(state, index) {
    const { RUN_STATUS, PLAYER, ACTIONS } = GAME_CONFIG; // ⭐ ACTIONS 불러오기
    
    if (state.runStatus !== RUN_STATUS.MAP_NAVIGATING && state.runStatus !== RUN_STATUS.IN_NODE_ACTION) return state;
    
    let potion = state.player.potions[index];
    
    // ⭐ 문자열 대신 상수 사용
    if (potion.action === GAME_CONFIG.ACTIONS.HEAL) {
        state.player.hp = Math.min(GAME_CONFIG.PLAYER.MAX_HP, state.player.hp + potion.value);
        state.battleLogs = [...state.battleLogs, t('LOGS', 'POTION_USE_HEAL', { potion: potion.name, value: potion.value })];
    } 
    else if (potion.action === GAME_CONFIG.ACTIONS.ADD_TEMP_STAT) {
        state.activeBattleBuffs.push(potion);
        state.battleLogs = [...state.battleLogs, t('LOGS', 'POTION_USE_BUFF', { potion: potion.name })];
    }

    state.player.potions.splice(index, 1);
    state.player.potions = [...state.player.potions];
    
    return state;
}
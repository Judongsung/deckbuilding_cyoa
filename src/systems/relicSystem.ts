/**
 * src/systems/relicSystem.js
 * 
 * [역할] 유물(Relic)의 조건부 효과 및 트리거 발동 로직을 전담합니다.
 * '전투 시작 시 체력 회복' 등, 특정 상황(이벤트)이 발생할 때 
 * 플레이어가 가진 유물들이 반응하여 효과를 내도록 관리합니다.
 */
import { GAME_CONFIG } from '../constants/gameConfig.js';
import { t } from '../utils/i18n.js';
import { I18N_KEY } from '../constants/translation_keys.js';
import type { GameState } from '../types/state.js';

const { ACTIONS } = GAME_CONFIG;

/**
 * 유물들의 행동(Action)을 정의하는 구독자 사전입니다.
 * 새로운 유물 효과가 생기면 이곳에만 로직을 추가하면 됩니다.
 */
const relicSubscribers = {
    [ACTIONS.HEAL]: (state: GameState, relic: any) => {
        state.player.hp = Math.min(GAME_CONFIG.PLAYER.MAX_HP, state.player.hp + relic.value);
        state.battleLogs.push(t(I18N_KEY.LOGS.RELIC_EFFECT_HEAL, { relic: relic.name, value: relic.value }));
        return state;
    },
    [ACTIONS.ADD_GOLD]: (state: GameState, relic: any) => {
        state.player.gold += relic.value;
        state.battleLogs.push(t(I18N_KEY.LOGS.RELIC_EFFECT_GOLD, { relic: relic.name, value: relic.value }));
        return state;
    }
};

/**
 * 특정 타이밍(Event)이 발생했을 때, 해당 이벤트를 '구독' 중인 유물들을 모두 찾아 발동시킵니다.
 * @param {Object} state - 게임 상태
 * @param {String} triggerName - 발생한 이벤트 타이밍 (예: 'pre_battle', 'post_battle')
 */
export function dispatchRelicEvent(state: GameState, triggerName: string): GameState {
    if (!state.player.relics || state.player.relics.length === 0) return state;

    state.player.relics.forEach(relic => {
        if (relic.trigger === triggerName) {
            const actionHandler = relicSubscribers[relic.action];
            if (actionHandler) {
                // 해당 타이밍을 구독하는 유물이 있으면 행동을 실행하고 상태를 갱신
                state = actionHandler(state, relic);
            }
        }
    });
    
    return state;
}
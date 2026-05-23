// src/systems/effectHandlers.js

import { mapStatTypeToKey } from './statSystem.js';
import { GAME_CONFIG } from '../constants/gameConfig.js';

/**
 * 카드 효과들의 행동(Action)을 정의하는 핸들러 사전입니다.
 * phase 1: 스탯 계산 전 먼저 처리되어야 하는 효과 (예: 키워드 전파)
 * phase 2: 그 외 스탯 계산 및 증폭 관련 효과
 * phase 3: 다른 스탯의 최종값에 비례하는 효과 (곱연산 등)
 */

export function evaluateCondition(state, condition) {
    if (!condition) return true;

    switch (condition.type) {
        case GAME_CONFIG.EFFECT_CONDITIONS.DECK_SIZE_LTE:
            return state.deck.length <= condition.value;
        case GAME_CONFIG.EFFECT_CONDITIONS.DECK_SIZE_GTE:
            return state.deck.length >= condition.value;
        case GAME_CONFIG.EFFECT_CONDITIONS.HP_PERCENT_LTE:
            const hpPercent = (state.player.hp / state.player.maxHp) * 100;
            return hpPercent <= condition.value;
        case GAME_CONFIG.EFFECT_CONDITIONS.HAS_KEYWORD:
            // 덱 내에 해당 키워드가 존재하는지 검사
            return state.deck.some(c => c.currentKeywords.includes(condition.value));
        default:
            return true;
    }
}

export const CardEffectHandlers = {
    [GAME_CONFIG.EFFECT_ACTIONS.ADD_KEYWORD]: {
        phase: 1,
        execute: (state, effect, p) => {
            state.deck.forEach(targetCard => {
                if (targetCard.currentKeywords.includes(effect.condition.value) && 
                   !targetCard.currentKeywords.includes(effect.value)) {
                    targetCard.currentKeywords.push(effect.value);
                }
            });
            return { state, p };
        }
    },

    [GAME_CONFIG.EFFECT_ACTIONS.INC_STAT_BY_KEYWORD]: {
        phase: 2,
        execute: (state, effect, p) => {
            let targetCount = state.deck.filter(c => c.currentKeywords.includes(effect.target_keyword)).length;
            let statKey = mapStatTypeToKey(effect.stat_type);
            if (statKey) {
                p[statKey] += (targetCount * effect.multiplier);
            }
            return { state, p };
        }
    },

    [GAME_CONFIG.EFFECT_ACTIONS.INC_STAT]: {
        phase: 2,
        execute: (state, effect, p) => {
            let statKey = mapStatTypeToKey(effect.stat_type);
            if (statKey) {
                p[statKey] += effect.value;
            }
            return { state, p };
        }
    },

    [GAME_CONFIG.EFFECT_ACTIONS.MUL_STAT]: {
        phase: 3,
        execute: (state, effect, p) => {
            let statKey = mapStatTypeToKey(effect.stat_type);
            if (statKey) {
                p[statKey] = Math.floor(p[statKey] * effect.multiplier);
            }
            return { state, p };
        }
    },

    [GAME_CONFIG.EFFECT_ACTIONS.ADD_STAT_BASED_ON_OTHER]: {
        phase: 3,
        execute: (state, effect, p) => {
            let targetKey = mapStatTypeToKey(effect.stat_type);
            let sourceKey = mapStatTypeToKey(effect.source_stat);
            if (targetKey && sourceKey) {
                p[targetKey] += Math.floor(p[sourceKey] * effect.multiplier);
            }
            return { state, p };
        }
    }
};

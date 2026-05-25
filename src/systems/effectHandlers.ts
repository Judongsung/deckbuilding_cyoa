// src/systems/effectHandlers.ts

import { GAME_CONFIG } from '../constants/gameConfig.js';
import type { GameState } from '../types/state.js';

/**
 * cards.json의 statType/sourceStat 문자열을 player 객체의 실제 키로 변환합니다.
 * GAME_CONFIG.KEYWORDS / 직접 상수 문자열 기준으로 매핑합니다.
 *
 * 카드 효과들의 행동(Action)을 정의하는 핸들러 사전입니다.
 * phase 1: 스탯 계산 전 먼저 처리되어야 하는 효과 (예: 키워드 전파)
 * phase 2: 그 외 스탯 계산 및 증폭 관련 효과
 * phase 3: 다른 스탯의 최종값에 비례하는 효과 (곱연산 등)
 */
/**
 * SCREAMING_SNAKE_CASE statType 문자열을 player 객체의 camelCase 키로 변환합니다.
 * 예: "ATTACK" → "attack", "ATTACK_CAP" → "attackCap"
 */
function statTypeToKey(type: string): string {
    return type.toLowerCase().replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

export function evaluateCondition(state: GameState, condition: any): boolean {
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
            const targetCount = state.deck.filter(c => c.currentKeywords.includes(effect.targetKeyword)).length;
            const statKey = statTypeToKey(effect.statType);
            if (statKey) {
                p[statKey] += (targetCount * effect.multiplier);
            }
            return { state, p };
        }
    },

    [GAME_CONFIG.EFFECT_ACTIONS.INC_STAT]: {
        phase: 2,
        execute: (state, effect, p) => {
            const statKey = statTypeToKey(effect.statType);
            if (statKey) {
                p[statKey] += effect.value;
            }
            return { state, p };
        }
    },

    [GAME_CONFIG.EFFECT_ACTIONS.MUL_STAT]: {
        phase: 3,
        execute: (state, effect, p) => {
            const statKey = statTypeToKey(effect.statType);
            if (statKey) {
                p[statKey] = Math.floor(p[statKey] * effect.multiplier);
            }
            return { state, p };
        }
    },

    [GAME_CONFIG.EFFECT_ACTIONS.ADD_STAT_BASED_ON_OTHER]: {
        phase: 3,
        execute: (state, effect, p) => {
            const targetKey = statTypeToKey(effect.statType);
            const sourceKey = statTypeToKey(effect.sourceStat);
            if (targetKey && sourceKey) {
                p[targetKey] += Math.floor(p[sourceKey] * effect.multiplier);
            }
            return { state, p };
        }
    }
};

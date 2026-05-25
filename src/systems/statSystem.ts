/**
 * src/systems/statSystem.js
 * 
 * [역할] 플레이어의 모든 스탯(공격력, 방어력, 전개력 등) 계산을 전담합니다.
 * 기본 스탯, 덱의 카드 효과, 유물 효과, 임시 버프(포션 등)를 모두 합산하여
 * 현재 플레이어의 최종 스탯을 산출해냅니다.
 */

import { GAME_CONFIG } from '../constants/gameConfig.js';
import { CardEffectHandlers, evaluateCondition } from './effectHandlers.js';
import type { GameState } from '../types/state.js';

const { TRIGGERS, ACTIONS } = GAME_CONFIG;

export function initPlayerStats(state: GameState): GameState {
    state.player = { 
        ...state.basePlayerParams, 
        maxHp: state.basePlayerParams.hp,
        deckSize: 0, 
        relics: [], 
        potions: [] 
    }; 
    
    return state;
}

export function recalculatePlayerStats(state: GameState): GameState {
    let p = { ...state.basePlayerParams };
    
    state.deck = state.deck.map(c => ({ 
        ...c, 
        currentKeywords: [...c.keywords] 
    }));
    
    state.deck.forEach(c => {
        let s = (c.isUpgraded && c.upgradedBaseStats) ? c.upgradedBaseStats : c.baseStats;
        
        p.attack += (s.attack || 0); 
        p.attackCap += (s.attackCap || 0); 
        p.attackGrowth += (s.attackGrowth || 0);
        
        p.defense += (s.defense || 0); 
        p.defenseCap += (s.defenseCap || 0); 
        p.defenseGrowth += (s.defenseGrowth || 0); 
        
        p.deployment += (s.deployment || 0);
    });

    if (state.player.relics) {
        state.player.relics.forEach(relic => {
            if (relic.trigger === TRIGGERS.PASSIVE && relic.action === ACTIONS.ADD_STAT) {
                p[relic.stat] += relic.value;
            }
        });
    }

    let allEffects = [];
    state.deck.forEach(card => {
        let activeEffects = (card.isUpgraded && card.upgradedEffects) ? card.upgradedEffects : card.effects;
        if (activeEffects) {
            activeEffects.forEach(effect => {
                const handler = CardEffectHandlers[effect.action];
                if (handler && evaluateCondition(state, effect.condition)) {
                    allEffects.push({
                        effect: effect,
                        handler: handler,
                        phase: handler.phase || 99
                    });
                }
            });
        }
    });

    allEffects.sort((a, b) => a.phase - b.phase);

    allEffects.forEach(item => {
        const result = item.handler.execute(state, item.effect, p);
        state = result.state;
        p = result.p;
    });

    const attackDiff = p.attack - state.basePlayerParams.attack;
    const defenseDiff = p.defense - state.basePlayerParams.defense;
    p.attackCap += attackDiff;
    p.defenseCap += defenseDiff;

    p.deckSize = state.deck.length; 
    p.hp = state.player.hp; 
    p.maxHp = state.player.maxHp;
    p.gold = state.player.gold; 
    p.relics = state.player.relics;
    p.potions = state.player.potions || [];
    
    state.player = p;
    return state;
}



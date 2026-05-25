import { GAME_CONFIG } from '../constants/gameConfig.js';
import { t, TRANSLATIONS } from '../utils/i18n.js';

// TRANSLATIONS Proxy에서 특정 카테고리를 안전하게 꺼내는 헬퍼
function tr(category: string): Record<string, string> {
    return (TRANSLATIONS as any)[category] || {};
}

export function getCardDescription(card: any, isUpgraded = false) {
    let lines = [];
    
    // 선택적으로 감성 텍스트(flavor)가 있다면 가장 위에 추가
    if (card.flavor) {
        lines.push(`"${card.flavor}"`);
    }

    const stats = isUpgraded ? card.upgradedBaseStats : card.baseStats;
    const effects = isUpgraded ? card.upgradedEffects : card.effects;
    const STAT_NAMES = tr('STAT_NAMES');
    const KEYWORDS = tr('KEYWORDS');

    // 1. Base Stats
    for (const [key, val] of Object.entries(stats)) {
        if (val && STAT_NAMES[key]) {
            lines.push(`${STAT_NAMES[key]} ${(val as number) > 0 ? '+' : ''}${val}`);
        }
    }

    // 2. Effects
    if (effects && (effects as any).length > 0) {
        (effects as any).forEach((effect: any) => {
            let conditionText = "";
            if (effect.condition) {
                if (effect.condition.type === GAME_CONFIG.EFFECT_CONDITIONS.DECK_SIZE_LTE) {
                    conditionText = `[${KEYWORDS.BRAWL}] (덱 ${effect.condition.value}장 이하) `;
                } else if (effect.condition.type === GAME_CONFIG.EFFECT_CONDITIONS.HP_PERCENT_LTE) {
                    conditionText = `[${KEYWORDS.BLOODLUST}] (체력 ${effect.condition.value}% 이하) `;
                }
            }

            if (effect.action === GAME_CONFIG.EFFECT_ACTIONS.ADD_KEYWORD && effect.target === GAME_CONFIG.EFFECT_TARGETS.DECK) {
                lines.push(`${conditionText}모든 [${effect.condition.value}] 카드에 [${effect.value}] 추가`);
            } else if (effect.action === GAME_CONFIG.EFFECT_ACTIONS.INC_STAT_BY_KEYWORD) {
                const statName = STAT_NAMES[effect.statType];
                lines.push(`${conditionText}덱의 [${effect.targetKeyword}] 카드 1장당 ${statName} +${effect.multiplier}`);
            } else if (effect.action === GAME_CONFIG.EFFECT_ACTIONS.INC_STAT_BY_DEPLOYMENT) {
                const statName = STAT_NAMES[effect.statType];
                lines.push(`${conditionText}전체 전개력 1당 ${statName} +${effect.multiplier}`);
            } else if (effect.action === GAME_CONFIG.EFFECT_ACTIONS.INC_STAT) {
                const statName = STAT_NAMES[effect.statType];
                lines.push(`${conditionText}${statName} +${effect.value}`);
            } else if (effect.action === GAME_CONFIG.EFFECT_ACTIONS.MUL_STAT) {
                const statName = STAT_NAMES[effect.statType];
                lines.push(`${conditionText}${statName} x${effect.multiplier}`);
            } else if (effect.action === GAME_CONFIG.EFFECT_ACTIONS.ADD_STAT_BASED_ON_OTHER) {
                const statName = STAT_NAMES[effect.statType];
                const sourceName = STAT_NAMES[effect.sourceStat];
                lines.push(`${conditionText}${sourceName}의 ${Math.round(effect.multiplier * 100)}%만큼 ${statName} 증가`);
            }
        });
    }

    return lines;
}

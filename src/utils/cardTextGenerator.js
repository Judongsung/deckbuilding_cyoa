import { GAME_CONFIG } from '../constants/gameConfig.js';
import { TRANSLATIONS } from '../utils/i18n.js';

export function getCardDescription(card, isUpgraded = false) {
    let lines = [];
    
    // 선택적으로 감성 텍스트(flavor)가 있다면 가장 위에 추가
    if (card.flavor) {
        lines.push(`"${card.flavor}"`);
    }

    const stats = isUpgraded ? card.upgraded_base_stats : card.base_stats;
    const effects = isUpgraded ? card.upgraded_effects : card.effects;

    // 1. Base Stats
    for (const [key, val] of Object.entries(stats)) {
        if (val && TRANSLATIONS.STAT_NAMES[key]) {
            lines.push(`${TRANSLATIONS.STAT_NAMES[key]} ${val > 0 ? '+' : ''}${val}`);
        }
    }

    // 2. Effects
    if (effects && effects.length > 0) {
        effects.forEach(effect => {
            let conditionText = "";
            if (effect.condition) {
                if (effect.condition.type === "deck_size_less_than_or_equal") {
                    conditionText = `[${TRANSLATIONS.KEYWORDS.BRAWL}] (덱 ${effect.condition.value}장 이하) `;
                } else if (effect.condition.type === "hp_percent_less_than_or_equal") {
                    conditionText = `[${TRANSLATIONS.KEYWORDS.BLOODLUST}] (체력 ${effect.condition.value}% 이하) `;
                }
            }

            if (effect.action === "add_keyword" && effect.target === "deck") {
                lines.push(`${conditionText}모든 [${effect.condition.value}] 카드에 [${effect.value}] 추가`);
            } else if (effect.action === "increase_stat_by_keyword_count") {
                let statName = TRANSLATIONS.STAT_NAMES[effect.stat_type];
                lines.push(`${conditionText}덱의 [${effect.target_keyword}] 카드 1장당 ${statName} +${effect.multiplier}`);
            } else if (effect.action === "increase_stat_by_deployment") {
                let statName = TRANSLATIONS.STAT_NAMES[effect.stat_type];
                lines.push(`${conditionText}전체 전개력 1당 ${statName} +${effect.multiplier}`);
            } else if (effect.action === "increase_stat") {
                let statName = TRANSLATIONS.STAT_NAMES[effect.stat_type];
                lines.push(`${conditionText}${statName} +${effect.value}`);
            } else if (effect.action === "multiply_stat") {
                let statName = TRANSLATIONS.STAT_NAMES[effect.stat_type];
                lines.push(`${conditionText}${statName} x${effect.multiplier}`);
            } else if (effect.action === "add_stat_based_on_other_stat") {
                let statName = TRANSLATIONS.STAT_NAMES[effect.stat_type];
                let sourceName = TRANSLATIONS.STAT_NAMES[effect.source_stat];
                lines.push(`${conditionText}${sourceName}의 ${Math.round(effect.multiplier * 100)}%만큼 ${statName} 증가`);
            }
        });
    }

    return lines;
}

// src/utils/i18n.js
import { GAME_CONFIG } from '../constants/gameConfig.js';

let translationsCache = null;

export async function initLanguage() {
    let lang = GAME_CONFIG.LANGUAGE;
    try {
        const module = await import(`../constants/translations_${lang}.ts`);
        translationsCache = module.TRANSLATIONS;
        console.log(`[i18n] Loaded language: ${lang}`);
    } catch (err) {
        console.warn(`[i18n] Failed to load language '${lang}', falling back to '${GAME_CONFIG.DEFAULT_LANGUAGE}'`);
        try {
            const fallbackModule = await import(`../constants/translations_${GAME_CONFIG.DEFAULT_LANGUAGE}.ts`);
            translationsCache = fallbackModule.TRANSLATIONS;
            // @ts-ignore
            GAME_CONFIG.LANGUAGE = GAME_CONFIG.DEFAULT_LANGUAGE; // Fallback 성공 시 현재 언어도 업데이트
            console.log(`[i18n] Loaded fallback language: ${GAME_CONFIG.DEFAULT_LANGUAGE}`);
        } catch (fatalErr) {
            console.error("[i18n] Fatal: Could not even load the default language!", fatalErr);
            translationsCache = {}; // 앱이 완전히 터지는 것 방지
        }
    }
}

// 외부에서는 마치 일반 객체처럼 TRANSLATIONS를 import 해서 쓸 수 있도록 Proxy를 제공합니다.
export const TRANSLATIONS = new Proxy({}, {
    get(target, prop) {
        if (!translationsCache) {
            console.warn(`[i18n] TRANSLATIONS accessed before initLanguage is completed!`);
            return {};
        }
        return translationsCache[prop];
    }
});

import { I18N_KEY } from '../constants/translation_keys.ts';

export type Key = typeof I18N_KEY[keyof typeof I18N_KEY][keyof typeof I18N_KEY[keyof typeof I18N_KEY]];

export function t(key: string, variables: Record<string, any> = {}): string {
    if (!translationsCache) return String(key);
    
    let text: string | null = null;
    for (const category of Object.values(translationsCache)) {
        if (category && typeof category === 'object' && key in category) {
            text = (category as any)[key];
            break;
        }
    }
    
    if (!text) return String(key);
    if (typeof text !== 'string') return text;
    
    for (const [varName, value] of Object.entries(variables)) {
        text = text.replace(new RegExp(`\\{${varName}\\}`, 'g'), String(value));
    }
    return text;
}

export function hydrateLibraries(cards, relics, enemies, events, potions, characters) {
    if (!translationsCache || !translationsCache.DATA) {
        console.warn('[i18n] hydrateLibraries() called before translations loaded — text will not be applied.');
        return { cards, relics, enemies, events, potions, characters };
    }
    const DATA = translationsCache.DATA;

    const hCards = cards.map(c => ({ ...c, ...(DATA.CARDS[c.id] || {}) }));
    const hRelics = relics.map(r => ({ ...r, ...(DATA.RELICS[r.id] || {}) }));
    const hEnemies = enemies.map(e => ({ ...e, ...(DATA.ENEMIES[e.id] || {}) }));
    const hPotions = potions.map(p => ({ ...p, ...(DATA.POTIONS[p.id] || {}) }));
    const hCharacters = characters.map(c => ({ ...c, ...(DATA.CHARACTERS[c.id] || {}) }));
    
    const hEvents = events.map(ev => {
        const tEv = DATA.EVENTS[ev.id] || {};
        const choices = ev.choices.map((ch, idx) => ({
            ...ch,
            text: (tEv.choices && tEv.choices[idx]) ? tEv.choices[idx] : ch.text
        }));
        return { ...ev, title: tEv.title || ev.title, desc: tEv.desc || ev.desc, choices };
    });

    return {
        cards: hCards, relics: hRelics, enemies: hEnemies, 
        events: hEvents, potions: hPotions, characters: hCharacters
    };
}

/**
 * src/systems/optionSystem.ts
 *
 * [역할] 게임 설정(옵션) 관련 로직을 전담합니다.
 * 현재는 언어 설정 저장 및 적용을 담당합니다.
 * 언어 변경 시 localStorage에 저장한 뒤 페이지를 재시작합니다.
 * (재시작 시 i18n.ts의 initLanguage()가 저장된 언어를 자동으로 로드합니다.)
 */

import { GAME_CONFIG } from '../constants/gameConfig.js';

export type LangCode = typeof GAME_CONFIG.SUPPORTED_LANGUAGES[number]['code'];

/**
 * 현재 저장된 언어 코드를 반환합니다.
 * 저장된 값이 없으면 기본값 'kr'을 반환합니다.
 */
export function getCurrentLanguage(): LangCode {
    return (localStorage.getItem(GAME_CONFIG.LANG_STORAGE_KEY) as LangCode) || GAME_CONFIG.DEFAULT_LANGUAGE as LangCode;
}

/**
 * 언어를 변경하고 페이지를 재시작합니다.
 * i18n.ts의 initLanguage()가 재시작 시 저장된 언어를 자동 로드합니다.
 */
export function setLanguage(lang: LangCode): void {
    if (lang === getCurrentLanguage()) return;
    localStorage.setItem(GAME_CONFIG.LANG_STORAGE_KEY, lang);
    location.reload();
}

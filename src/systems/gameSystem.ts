/**
 * src/systems/gameSystem.js
 * 
 * [역할] 게임 전체의 큰 흐름(새 게임 시작, 초기화, 캐릭터 선택 등)을 전담합니다.
 * 플레이어의 기본 스탯 설정 및 초기 덱 구성 등을 담당하며,
 * 전반적인 Run(게임 플레이 한 판)의 생명주기를 관리합니다.
 */
import { GAME_CONFIG } from '../constants/gameConfig.js';
import { initPlayerStats } from './statSystem.js';
import { generateMap } from './mapSystem.js';
import { t } from '../utils/i18n.js';
import { I18N_KEY } from '../constants/translation_keys.js';
import type { GameState } from '../types/state.js';

export function initNewGameRun(state: GameState, characterId: string): GameState {
    const { RUN_STATUS } = GAME_CONFIG;

    let charDef = null;
    if (state.characterLibrary && state.characterLibrary.length > 0) {
        charDef = state.characterLibrary.find(c => c.id === characterId) || state.characterLibrary[0];
    }

    if (charDef) {
        state.basePlayerParams = {
            hp: charDef.baseStats.hp,
            gold: charDef.baseStats.gold,
            attack: charDef.baseStats.attack,
            attackCap: charDef.baseStats.attackCap,
            attackGrowth: charDef.baseStats.attackGrowth,
            defense: charDef.baseStats.defense,
            defenseCap: charDef.baseStats.defenseCap,
            defenseGrowth: charDef.baseStats.defenseGrowth,
            deployment: charDef.baseStats.deployment
        };
    }

    state = initPlayerStats(state);

    state.deck = [];
    if (charDef && charDef.startingDeck && state.cardLibrary) {
        charDef.startingDeck.forEach(cardId => {
            const cardDef = state.cardLibrary.find(c => c.id === cardId);
            if (cardDef) {
                state.deck.push({ ...JSON.parse(JSON.stringify(cardDef)), uid: Math.random().toString(36).substr(2, 9), isUpgraded: false });
            }
        });
    }

    state.isRewardScreenOpen = false;
    state.isShopScreenOpen = false;
    state.isRestScreenOpen = false;
    state.isEventScreenOpen = false;

    state.currentEvent = null;
    state.shopInventory = { cards: [], relics: [], potions: [] };
    state.rewardCards = [];
    state.activeBattleBuffs = [];

    state.player.deckSize = state.deck.length; 
    
    state.map.currentFloor = 0;
    state.map.selectedNode = null;
    state.map.lastCompletedNode = null;
    state.map.history = [];
    
    state.runStatus = RUN_STATUS.MAP_NAVIGATING; 
    state.battleLogs = [t(I18N_KEY.LOGS.GAME_START)];

    return state;
}

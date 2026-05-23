import { writable } from 'svelte/store';
import { GAME_CONFIG } from '../constants/gameConfig.js';
import { t } from '../utils/i18n.js';

// ⭐ 완벽하게 분할된 모든 시스템 모듈 불러오기
import { initNewGameRun } from '../systems/gameSystem.js';
import { executeBattle } from '../systems/battleSystem.js';
import { generateMap, selectNode } from '../systems/mapSystem.js';
import { executeRestHeal, executeRestUpgrade, executeEventChoice } from '../systems/actionSystem.js';
import { addCardToDeck, removeCardFromDeck } from '../systems/deckSystem.js';
import { buyCardFromShop, buyRelicFromShop, buyPotionFromShop, removeCardInShop, closeShop, generateShopInventory } from '../systems/shopSystem.js';
import { usePotion } from '../systems/potionSystem.js';
import { claimSpecificReward, skipAllRewards, claimReward, generateBattleRewards } from '../systems/rewardSystem.js';
import { claimTreasure } from '../systems/treasureSystem.js';

// 1. 초기 상태 정의
const initialState = {
    basePlayerParams: {
        hp: GAME_CONFIG.PLAYER.MAX_HP, 
        gold: GAME_CONFIG.PLAYER.INITIAL_GOLD,
        baseAttack: GAME_CONFIG.PLAYER.BASE_ATTACK, 
        attackCap: GAME_CONFIG.PLAYER.ATTACK_CAP, 
        attackGrowth: GAME_CONFIG.PLAYER.ATTACK_GROWTH,
        baseDefense: GAME_CONFIG.PLAYER.BASE_DEFENSE, 
        defenseCap: GAME_CONFIG.PLAYER.DEFENSE_CAP, 
        defenseGrowth: GAME_CONFIG.PLAYER.DEFENSE_GROWTH, 
        deployment: GAME_CONFIG.PLAYER.DEPLOYMENT
    },
    player: {
        hp: GAME_CONFIG.PLAYER.MAX_HP, 
        gold: GAME_CONFIG.PLAYER.INITIAL_GOLD,
        baseAttack: GAME_CONFIG.PLAYER.BASE_ATTACK, 
        attackCap: GAME_CONFIG.PLAYER.ATTACK_CAP, 
        attackGrowth: GAME_CONFIG.PLAYER.ATTACK_GROWTH,
        baseDefense: GAME_CONFIG.PLAYER.BASE_DEFENSE, 
        defenseCap: GAME_CONFIG.PLAYER.DEFENSE_CAP, 
        defenseGrowth: GAME_CONFIG.PLAYER.DEFENSE_GROWTH, 
        deployment: GAME_CONFIG.PLAYER.DEPLOYMENT, 
        deckSize: 0, 
        relics: [],
        potions: []
    },

    activeBattleBuffs: [], // ⭐ 활성화된 임시 버프
    
    enemy: { name: "", hp: 0, maxHp: 0, attack: 0, defense: 0 },
    map: { structure: [], currentFloor: 0, selectedNode: null, lastCompletedNode: null, history: [] },
    battleLogs: [],
    
    // 데이터 도감
    cardLibrary: [],
    relicLibrary: [],
    enemyLibrary: [],
    eventLibrary: [],
    potionLibrary: [],     // ⭐ 포션 도감
    characterLibrary: [],  // ⭐ 캐릭터 도감
    
    // 팝업 및 상태 관리
    isRewardScreenOpen: false,
    pendingRewards: [],
    isShopScreenOpen: false,
    isRestScreenOpen: false,
    isEventScreenOpen: false,
    isTreasureScreenOpen: false,
    treasureContent: null,
    shopInventory: { cards: [], relics: [], potions: [] },
    currentEvent: null,

    isBattlePopupOpen: false,
    battlePopupState: GAME_CONFIG.BATTLE_POPUP_STATE.PRE, // 'pre' (준비) or 'post' (결과)
    lastBattleLogs: [],

    runStatus: GAME_CONFIG.RUN_STATUS.NOT_STARTED
};

// 2. 스토어 엔진 생성
function createGameEngine() {
    let startState = JSON.parse(JSON.stringify(initialState));
    try {
        const saved = localStorage.getItem('deck_rpg_save');
        if (saved) {
            const parsedSaved = JSON.parse(saved);
            startState = { ...startState, ...parsedSaved };
        }
    } catch (e) {
        console.error("세이브 로드 실패:", e);
    }

    const { subscribe, set, update } = writable(startState);

    // 자동 저장 시스템 (명시된 상태만 저장 - Allow-list 방식)
    subscribe(state => {
        try { 
            const saveData = {
                basePlayerParams: state.basePlayerParams,
                player: state.player,
                deck: state.deck,
                activeBattleBuffs: state.activeBattleBuffs,
                enemy: state.enemy,
                map: state.map,
                battleLogs: state.battleLogs,
                isRewardScreenOpen: state.isRewardScreenOpen,
                pendingRewards: state.pendingRewards,
                isShopScreenOpen: state.isShopScreenOpen,
                isRestScreenOpen: state.isRestScreenOpen,
                isEventScreenOpen: state.isEventScreenOpen,
                isTreasureScreenOpen: state.isTreasureScreenOpen,
                treasureContent: state.treasureContent,
                shopInventory: state.shopInventory,
                currentEvent: state.currentEvent,
                runStatus: state.runStatus,
                isBattlePopupOpen: state.isBattlePopupOpen,
                battlePopupState: state.battlePopupState,
                lastBattleLogs: state.lastBattleLogs
            };
            localStorage.setItem('deck_rpg_save', JSON.stringify(saveData)); 
        } catch (e) {
            console.error("세이브 저장 실패:", e);
        }
    });

    // 3. 외부 시스템으로 로직을 100% 위임(Delegation)하는 인터페이스
    return {
        subscribe,
        
        loadLibraries: (jsonCards, jsonRelics, jsonEnemies, jsonEvents, jsonPotions, jsonCharacters) => update(state => { 
            state.cardLibrary = jsonCards; 
            state.relicLibrary = jsonRelics; 
            state.enemyLibrary = jsonEnemies;
            state.eventLibrary = jsonEvents; 
            state.potionLibrary = jsonPotions; 
            state.characterLibrary = jsonCharacters;
            return state; 
        }),

        // 덱 관리
        addCardToDeck: (card) => update(state => addCardToDeck(state, card)),
        removeCardFromDeck: (index) => update(state => removeCardFromDeck(state, index)),
        // 보상 관리
        claimSpecificReward: (index) => update(state => claimSpecificReward(state, index)),
        skipAllRewards: () => update(state => skipAllRewards(state)),
        claimReward: (card) => update(state => claimReward(state, card)),

        // 상점 관리
        generateShopInventory: () => update(state => generateShopInventory(state)),
        buyCardFromShop: (index) => update(state => buyCardFromShop(state, index)),
        buyRelicFromShop: (index) => update(state => buyRelicFromShop(state, index)),
        buyPotionFromShop: (index) => update(state => buyPotionFromShop(state, index)),
        removeCardInShop: (index) => update(state => removeCardInShop(state, index)),
        closeShop: () => update(state => closeShop(state)),

        // 보물 상자
        claimTreasure: () => update(state => claimTreasure(state)),

        // 맵 및 노드 관리
        generateMap: () => update(state => generateMap(state)),
        selectNode: (node) => update(state => selectNode(state, node)),

        usePotion: (index) => update(state => usePotion(state, index)),
        
        // 이벤트 및 상호작용
        startBattle: () => update(state => {
            const newState = executeBattle(state);
            newState.isBattlePopupOpen = true;
            newState.battlePopupState = GAME_CONFIG.BATTLE_POPUP_STATE.POST;
            return newState;
        }),
        continueFromBattle: () => update(state => {
            state.isBattlePopupOpen = false;
            if (state.player.hp <= 0) {
                state.runStatus = GAME_CONFIG.RUN_STATUS.GAME_OVER;
            } else {
                let earnedGold = GAME_CONFIG.ECONOMY.REWARD_GOLD_NORMAL;
                if (state.map.lastCompletedNode) {
                    if (state.map.lastCompletedNode.type === GAME_CONFIG.NODE_TYPES.ELITE) {
                        earnedGold = GAME_CONFIG.ECONOMY.REWARD_GOLD_ELITE;
                    } else if (state.map.lastCompletedNode.type === GAME_CONFIG.NODE_TYPES.BOSS) {
                        earnedGold = GAME_CONFIG.ECONOMY.REWARD_GOLD_BOSS;
                    }
                }
                state = generateBattleRewards(state, earnedGold);
            }
            return state;
        }),
        executeRestHeal: () => update(state => executeRestHeal(state)),
        executeRestUpgrade: (index) => update(state => executeRestUpgrade(state, index)),
        executeEventChoice: (choice) => update(state => executeEventChoice(state, choice)),

        initNewGameRun: (characterId) => update(state => initNewGameRun(state, characterId)),
        startNewGame: (characterId) => update(state => {
            state = generateMap(state);     // 지도를 만들고
            state = initNewGameRun(state, characterId);  // 세션을 깨끗하게 청소합니다
            return state;
        }),
        returnToMainMenu: () => update(state => {
            state.runStatus = GAME_CONFIG.RUN_STATUS.NOT_STARTED;
            return state;
        })
    };
}

export const gameStore = createGameEngine();
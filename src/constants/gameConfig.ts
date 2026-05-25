// src/constants/gameConfig.ts

export const GAME_CONFIG = {
    // 0. 다국어 설정
    LANGUAGE: 'kr',
    DEFAULT_LANGUAGE: 'kr',

    // 에셋 경로 설정
    ASSETS: {
        FALLBACK_CARD_IMAGE: './images/cards/temp.webp'
    },

    // 1. 플레이어 초기 스탯
    PLAYER: {
        MAX_HP: 100,
        INITIAL_GOLD: 100,
        BASE_ATTACK: 10,
        ATTACK_CAP: 50,
        ATTACK_GROWTH: 0,
        BASE_DEFENSE: 5,
        DEFENSE_CAP: 30,
        DEFENSE_GROWTH: 0,
        DEPLOYMENT: 10
    },

    ECONOMY: {
        REWARD_GOLD_NORMAL: 15, // 일반 전투 승리 골드
        REWARD_GOLD_ELITE: 40,  // 엘리트 전투 승리 골드
        REWARD_GOLD_BOSS: 100,  // 보스 전투 승리 골드
        CARD_REMOVAL_COST: 50,   // 덱 압축(카드 제거) 비용
        RELIC_PRICE: 150,
        POTION_PRICE: 50,
        POTION_DROP_RATE: 0.3, // 30% 확률로 포션 드랍
        CARD_PRICES: {
            BASIC: 10,
            COMMON: 25,
            SPECIAL: 50,
            RARE: 75
        }
    },

    // 2. 노드 종류 (오타 방지용)
    NODE_TYPES: {
        NORMAL: "NORMAL",
        ELITE: "ELITE",
        BOSS: "BOSS",
        SHOP: "SHOP",
        REST: "REST",
        TREASURE: "TREASURE",
        UNKNOWN: "UNKNOWN"
    },

    // 3. 지도 생성 설정
    MAP: {
        MAX_FLOORS: 16,
        NODES_PER_FLOOR: 5,
        NODE_WEIGHTS: {
            NORMAL: 45,
            UNKNOWN: 22,
            ELITE: 16,
            REST: 12,
            SHOP: 5
        }
    },

    // 5. 노드 이벤트 설정
    EVENT: {
        REST_HEAL_AMOUNT: 30,
        REWARD_CARD_COUNT: 3
    },

    // 6. 전투 시뮬레이션 설정
    BATTLE: {
        MAX_TURNS: 50 // 무한 루프 강제 종료 기준
    },

    // 7. 게임 진행 상태값 (오타 방지용)
    RUN_STATUS: {
        NOT_STARTED: 'NOT_STARTED',
        MAP_NAVIGATING: 'MAP_NAVIGATING', // 맵에서 노드를 고르는 중
        IN_NODE_ACTION: 'IN_NODE_ACTION', // 특정 노드에 진입하여 상호작용 중
        GAMEOVER: 'GAMEOVER',
        VICTORY: 'VICTORY'
    },

    // ⭐ [추가] 유물/이벤트 등의 발동 타이밍 (구독명)
    TRIGGERS: {
        PRE_BATTLE: 'PRE_BATTLE',
        POST_BATTLE: 'POST_BATTLE',
        PASSIVE: 'PASSIVE'
    },

    // ⭐ [추가] 포션/유물/이벤트 등의 행동 유형
    ACTIONS: {
        HEAL: 'HEAL',
        ADD_GOLD: 'ADD_GOLD',
        ADD_STAT: 'ADD_STAT',
        ADD_TEMP_STAT: 'ADD_TEMP_STAT',
        
        // 이벤트 선택지용
        LEAVE: 'LEAVE',
        GET_GOLD: 'GET_GOLD',
        LOSE_GOLD: 'LOSE_GOLD',
        LOSE_HP: 'LOSE_HP',
        GET_RELIC: 'GET_RELIC'
    },
    
    // ⭐ [추가] 몬스터 패시브 키워드 사전
    ENEMY_KEYWORDS: {
        SWARM: 'SWARM',           // 플레이어의 '광역' 카드 효과 2배
        BERSERK: 'BERSERK',       // 체력 50% 이하 시 성장 공격력 2배
        WEAKEN: 'WEAKEN',         // 조우 시 플레이어 기본 공격력 -5
        VULNERABLE: 'VULNERABLE'  // 조우 시 플레이어 기본 방어력 -5
    },

    // 카드 티어
    CARD_TIERS: {
        BASIC: 'BASIC',
        COMMON: 'COMMON',
        SPECIAL: 'SPECIAL',
        RARE: 'RARE'
    },

    KEYWORDS: {
        ATTACK: 'ATTACK',
        DEFENSE: 'DEFENSE',
        BLOODLUST: 'BLOODLUST', // 혈기
        BRAWL: 'BRAWL', // 격투
        GROWTH: 'GROWTH', // 성장
        ARMORED: 'ARMORED' // 무장
    },

    // ⭐ [추가] 전투 팝업 상태
    BATTLE_POPUP_STATE: {
        PRE: 'PRE',
        POST: 'POST'
    },

    // ⭐ [추가] 보상 종류
    REWARD_TYPES: {
        GOLD: 'GOLD',
        POTION: 'POTION',
        RELIC: 'RELIC',
        CARD: 'CARD'
    },

    APP_SCREENS: {
        MENU: 'MENU',
        GAME: 'GAME'
    },

    // ⭐ [추가] 효과 발동 조건
    EFFECT_CONDITIONS: {
        DECK_SIZE_LTE: 'DECK_SIZE_LESS_THAN_OR_EQUAL',
        DECK_SIZE_GTE: 'DECK_SIZE_GREATER_THAN_OR_EQUAL',
        HP_PERCENT_LTE: 'HP_PERCENT_LESS_THAN_OR_EQUAL',
        HAS_KEYWORD: 'HAS_KEYWORD'
    },

    EFFECT_TARGETS: {
        DECK: 'DECK',
        SELF_STATS: 'SELF_STATS'
    },

    // ⭐ [추가] 효과 액션
    EFFECT_ACTIONS: {
        ADD_KEYWORD: 'ADD_KEYWORD',
        INC_STAT_BY_KEYWORD: 'INCREASE_STAT_BY_KEYWORD_COUNT',
        INC_STAT_BY_DEPLOYMENT: 'INCREASE_STAT_BY_DEPLOYMENT',
        INC_STAT: 'INCREASE_STAT',
        MUL_STAT: 'MULTIPLY_STAT',
        ADD_STAT_BASED_ON_OTHER: 'ADD_STAT_BASED_ON_OTHER_STAT'
    }
} as const;

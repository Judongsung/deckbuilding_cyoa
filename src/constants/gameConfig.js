// src/constants/gameConfig.js

const NODE_TYPES = {
    NORMAL: "normal",
    ELITE: "elite",
    BOSS: "boss",
    SHOP: "shop",
    REST: "rest",
    TREASURE: "treasure",
    UNKNOWN: "unknown"
};

export const GAME_CONFIG = {
    // 0. 다국어 설정
    LANGUAGE: 'kr',
    DEFAULT_LANGUAGE: 'kr',

    // 에셋 경로 설정
    ASSETS: {
        FALLBACK_CARD_IMAGE: '/images/cards/temp.webp'
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
            "basic": 10,
            "common": 25,
            "special": 50,
            "rare": 75
        }
    },

    // 2. 노드 종류 (오타 방지용)
    NODE_TYPES: NODE_TYPES,

    // 3. 지도 생성 설정
    MAP: {
        MAX_FLOORS: 16,
        NODES_PER_FLOOR: 5,
        NODE_WEIGHTS: {
            [NODE_TYPES.NORMAL]: 45,
            [NODE_TYPES.UNKNOWN]: 22,
            [NODE_TYPES.ELITE]: 16,
            [NODE_TYPES.REST]: 12,
            [NODE_TYPES.SHOP]: 5
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
        PRE_BATTLE: 'pre_battle',
        POST_BATTLE: 'post_battle',
        PASSIVE: 'passive'
    },

    // ⭐ [추가] 포션/유물/이벤트 등의 행동 유형
    ACTIONS: {
        HEAL: 'heal',
        ADD_GOLD: 'add_gold',
        ADD_STAT: 'add_stat',
        ADD_TEMP_STAT: 'add_temp_stat',
        
        // 이벤트 선택지용
        LEAVE: 'leave',
        GET_GOLD: 'get_gold',
        LOSE_GOLD: 'lose_gold',
        LOSE_HP: 'lose_hp',
        GET_RELIC: 'get_relic'
    },
    
    // ⭐ [추가] 몬스터 패시브 키워드 사전
    ENEMY_KEYWORDS: {
        SWARM: '다중',       // 플레이어의 '광역' 카드 효과 2배
        BERSERK: '광폭화',     // 체력 50% 이하 시 성장 공격력 2배
        WEAKEN: '위압',       // 조우 시 플레이어 기본 공격력 -5
        VULNERABLE: '갑옷파기' // 조우 시 플레이어 기본 방어력 -5
    },

    // 카드 티어
    CARD_TIERS: {
        BASIC: 'basic',
        COMMON: 'common',
        SPECIAL: 'special',
        RARE: 'rare'
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
        PRE: 'pre',
        POST: 'post'
    },

    // ⭐ [추가] 보상 종류
    REWARD_TYPES: {
        GOLD: 'gold',
        POTION: 'potion',
        RELIC: 'relic',
        CARD: 'card'
    },

    // ⭐ [추가] 효과 발동 조건
    EFFECT_CONDITIONS: {
        DECK_SIZE_LTE: 'deck_size_less_than_or_equal',
        DECK_SIZE_GTE: 'deck_size_greater_than_or_equal',
        HP_PERCENT_LTE: 'hp_percent_less_than_or_equal',
        HAS_KEYWORD: 'has_keyword'
    },

    // ⭐ [추가] 효과 액션
    EFFECT_ACTIONS: {
        ADD_KEYWORD: 'add_keyword',
        INC_STAT_BY_KEYWORD: 'increase_stat_by_keyword_count',
        INC_STAT: 'increase_stat',
        MUL_STAT: 'multiply_stat',
        ADD_STAT_BASED_ON_OTHER: 'add_stat_based_on_other_stat'
    }
};
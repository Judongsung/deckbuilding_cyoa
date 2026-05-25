// src/types/state.ts
import type { Card, Relic, Potion, Enemy, GameEvent, Character, BaseStats } from './models';

export interface Player {
    hp: number;
    maxHp: number;
    gold: number;
    attack: number;
    attackCap: number;
    attackGrowth: number;
    defense: number;
    defenseCap: number;
    defenseGrowth: number;
    deployment: number;
    deckSize: number;
    relics: Relic[];
    potions: Potion[];
}

export interface EnemyState {
    name: string;
    hp: number;
    maxHp: number;
    attack: number;
    defense: number;
    attackGrowth?: number;
    defenseGrowth?: number;
    keywords?: string[];
    passive?: string | null;
}

export interface MapNode {
    id: string;
    index: number;
    type: string | null;
    floor: number;
    completed?: boolean;
    x?: number;
    y?: number;
    offsetX?: number;
    offsetY?: number;
    connections: number[];
}

export interface MapState {
    structure: MapNode[][]; // 2D 배열로 층별 노드 관리
    currentFloor: number;
    selectedNode: MapNode | null;
    lastCompletedNode: MapNode | null;
    history: string[];
}

export interface BattleBuff {
    action: string;
    stat: string;
    value: number;
}

export interface RewardItem {
    type: string;
    value?: number | string | Card | Relic | Potion;
    amount?: number;
    item?: any;
    choices?: Card[];
    relic?: Relic;
    empty?: boolean;
}

export interface ShopInventory {
    cards: Card[];
    relics: Relic[];
    potions: Potion[];
}

export interface GameState {
    basePlayerParams: Omit<Player, 'deckSize' | 'relics' | 'potions'>;
    player: Player;
    deck: Card[];
    activeBattleBuffs: BattleBuff[];
    
    currentEnemy: EnemyState | null; // 전투 시 현재 적
    map: MapState;
    battleLogs: string[];
    
    // 데이터 도감 (Libraries)
    cardLibrary: Card[];
    relicLibrary: Relic[];
    enemyLibrary: Enemy[];
    eventLibrary: GameEvent[];
    potionLibrary: Potion[];
    characterLibrary: Character[];
    
    // 팝업 및 상태 관리 플래그
    isRewardScreenOpen: boolean;
    pendingRewards: RewardItem[];
    isShopScreenOpen: boolean;
    isRestScreenOpen: boolean;
    isEventScreenOpen: boolean;
    isTreasureScreenOpen: boolean;
    treasureContent: RewardItem | null;
    shopInventory: ShopInventory;
    currentEvent: GameEvent | null;

    isBattlePopupOpen: boolean;
    battlePopupState: string; // 'pre' | 'post'
    lastBattleLogs: string[];

    runStatus: string;
}

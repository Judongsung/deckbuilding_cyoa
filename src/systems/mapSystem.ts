/**
 * src/systems/mapSystem.js
 * 
 * [역할] 맵의 구조를 무작위로 생성하고, 플레이어가 노드를 이동(내비게이션)하는 로직을 전담합니다.
 * 각 노드의 종류(일반, 엘리트, 보스, 상점, 휴식처, 보물, 미지)에 따라
 * 알맞은 시스템(전투, 상점, 액션 등)으로 연결해주는 라우터(Router) 역할을 합니다.
 */
import { GAME_CONFIG } from '../constants/gameConfig.js';
import { initPlayerStats, recalculatePlayerStats } from './statSystem.js';
import { generateShopInventory } from './shopSystem.js';
import { setupEncounter } from './battleSystem.js';
import { t } from '../utils/i18n.js';
import { I18N_KEY } from '../constants/translation_keys.js';
import { openTreasure } from './treasureSystem.js';
import type { GameState, MapNode } from '../types/state.js';

/**
 * 순수하게 지도 구조를 생성하고 내비게이션 좌표만 초기화합니다.
 * @param {Object} state - 현재 게임 상태
 * @returns {Object} - 지도 구조가 생성된 상태
 */
export function generateMap(state: GameState): GameState {
    const { NODE_TYPES, MAP } = GAME_CONFIG;
    
    let newMap = [];
    const WIDTH = MAP.NODES_PER_FLOOR; // 기본 5
    const BOSS_INDEX = Math.floor(WIDTH / 2);
    
    // 1층의 시작 지점 3개 랜덤 선택
    let startIndices = [];
    while(startIndices.length < 3) {
        let r = Math.floor(Math.random() * WIDTH);
        if(!startIndices.includes(r)) startIndices.push(r);
    }
    startIndices.sort((a,b)=>a-b);
    
    let currentIndices = startIndices;
    
    // 1. 경로(뼈대) 생성: 1층부터 (MAX_FLOORS - 1)층까지
    for (let f = 1; f < MAP.MAX_FLOORS; f++) {
        let floorNodes = [];
        let nextIndices = new Set<number>();
        let prev_target = -1;
        
        for (let idx = 0; idx < currentIndices.length; idx++) {
            let i = currentIndices[idx];
            let min_t = Math.max(0, i - 1, prev_target);
            let max_t = Math.min(WIDTH - 1, i + 1);
            
            // X자 교차 방지
            if (idx < currentIndices.length - 1) {
                let next_i = currentIndices[idx+1];
                max_t = Math.min(max_t, next_i + 1);
            }
            
            let validTargets = [];
            for (let t = min_t; t <= max_t; t++) validTargets.push(t);
            
            let numConnections = Math.random() < 0.35 ? 2 : 1; 
            if (numConnections > validTargets.length) numConnections = validTargets.length;
            
            let targets = [];
            if (numConnections === 1) {
                targets.push(validTargets[Math.floor(Math.random() * validTargets.length)]);
            } else {
                targets = validTargets.sort(() => 0.5 - Math.random()).slice(0, 2).sort((a,b)=>a-b);
            }
            
            targets.forEach(t => nextIndices.add(t));
            prev_target = targets[targets.length - 1];
            
            floorNodes.push({
                id: `${f}-${i}`,
                index: i,
                type: null, // 임시 빈값
                floor: f,
                offsetX: Math.floor(Math.random() * 40) - 20,
                offsetY: Math.floor(Math.random() * 30) - 15,
                connections: f === MAP.MAX_FLOORS - 1 ? [BOSS_INDEX] : targets
            });
        }
        
        newMap.push(floorNodes);
        currentIndices = Array.from(nextIndices).sort((a,b)=>a-b);
    }
    
    // 마지막 보스 층 추가
    newMap.push([{
        id: `${MAP.MAX_FLOORS}-${BOSS_INDEX}`,
        index: BOSS_INDEX,
        type: NODE_TYPES.BOSS,
        floor: MAP.MAX_FLOORS,
        offsetX: 0,
        offsetY: 0,
        connections: []
    }]);

    // 2. 룰에 따른 타입 할당 (제약 조건 검사)
    function getParentTypes(f, index) {
        if (f <= 1) return [];
        const parents = newMap[f - 2].filter(n => n.connections.includes(index));
        return parents.map(p => p.type);
    }

    function getRandomTypeWithConstraints(f, parentsTypes) {
        let availableTypes = Object.keys(MAP.NODE_WEIGHTS);
        
        // 제약 1: 엘리트는 6층 이전 등장 금지
        if (f < 6) {
            availableTypes = availableTypes.filter(t => t !== NODE_TYPES.ELITE);
        }
        
        // 제약 2: 상점, 휴식처, 엘리트는 연속 등장 금지
        const noConsecutive: string[] = [NODE_TYPES.SHOP, NODE_TYPES.REST, NODE_TYPES.ELITE];
        availableTypes = availableTypes.filter(t => {
            if (noConsecutive.includes(t)) {
                if (parentsTypes.includes(t)) return false;
            }
            return true;
        });
        
        if (availableTypes.length === 0) return NODE_TYPES.NORMAL;
        
        // 가중치 룰렛
        let totalWeight = 0;
        availableTypes.forEach(t => totalWeight += MAP.NODE_WEIGHTS[t]);
        
        let random = Math.random() * totalWeight;
        for (let t of availableTypes) {
            random -= MAP.NODE_WEIGHTS[t];
            if (random <= 0) return t;
        }
        return availableTypes[0];
    }

    for (let f = 1; f <= MAP.MAX_FLOORS; f++) {
        newMap[f - 1].forEach(node => {
            if (f === 1) node.type = NODE_TYPES.NORMAL;
            else if (f === 9) node.type = NODE_TYPES.TREASURE;
            else if (f === MAP.MAX_FLOORS - 1) node.type = NODE_TYPES.REST;
            else if (f === MAP.MAX_FLOORS) node.type = NODE_TYPES.BOSS;
            else {
                const parentsTypes = getParentTypes(f, node.index);
                node.type = getRandomTypeWithConstraints(f, parentsTypes);
            }
        });
    }
    
    state.map.structure = newMap; 
    
    return state;
}

export function selectNode(state: GameState, node: MapNode): GameState {
    const { RUN_STATUS, NODE_TYPES, EVENT, PLAYER } = GAME_CONFIG as any;
    
    if (state.runStatus !== RUN_STATUS.MAP_NAVIGATING) return state; 
    if (node.floor !== state.map.currentFloor + 1) { 
        alert(t(I18N_KEY.UI.ALERT_WRONG_FLOOR, { floor: state.map.currentFloor + 1 })); 
        return state; 
    }
    if (state.map.lastCompletedNode) { 
        if (!state.map.lastCompletedNode.connections.includes(node.index)) { 
            alert(t(I18N_KEY.UI.ALERT_DISCONNECTED)); 
            return state; 
        } 
    }
    
    state.map.selectedNode = node;
    if (!state.map.history.includes(node.id)) {
        state.map.history.push(node.id);
    }
    state.runStatus = RUN_STATUS.IN_NODE_ACTION; // ⭐ 상호작용 상태 진입
    
    if (node.type === NODE_TYPES.REST) {
        state.battleLogs = [...state.battleLogs, t(I18N_KEY.LOGS.NODE_REST, { floor: node.floor })];
        state.isRestScreenOpen = true;
    } 
    else if (node.type === NODE_TYPES.TREASURE) {
        state = openTreasure(state);
    } 
    else if (node.type === NODE_TYPES.SHOP) {
        state.battleLogs = [...state.battleLogs, t(I18N_KEY.LOGS.NODE_SHOP)]; 
        
        // ⭐ 상점 진열 및 팝업 오픈 로직을 shopSystem에 완벽히 위임!
        state = generateShopInventory(state);
        
        // mapSystem은 본연의 임무인 '맵 이동 처리'만 수행
        state.map.lastCompletedNode = node; 
        state.map.currentFloor += 1; 
        state.map.selectedNode = null;
    }
    else if (node.type === NODE_TYPES.UNKNOWN) {
        state.battleLogs = [...state.battleLogs, t(I18N_KEY.LOGS.NODE_UNKNOWN, { floor: node.floor })];
        if (state.eventLibrary.length > 0) {
            const randomEvent = state.eventLibrary[Math.floor(Math.random() * state.eventLibrary.length)];
            state.currentEvent = randomEvent;
            state.isEventScreenOpen = true;
        } else {
            state.map.lastCompletedNode = node; 
            state.map.currentFloor += 1; 
            state.map.selectedNode = null;
            state.runStatus = RUN_STATUS.MAP_NAVIGATING; // 즉시 완료
        }
    } 
    else {
        // 전투 노드 매칭 로직
        state = setupEncounter(state, node);
    }
    
    return state;
}
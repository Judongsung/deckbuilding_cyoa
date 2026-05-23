/**
 * src/systems/battleSystem.js
 * 
 * [역할] 턴제 전투의 시작, 진행(턴 계산), 종료 로직을 전담합니다.
 * 몬스터와 플레이어 간의 공격/방어 계산, 턴 마감 시 임시 버프 해제 등을 처리합니다.
 * 전리품이나 보상 생성은 rewardSystem.js로 위임합니다.
 */
import { GAME_CONFIG } from '../constants/gameConfig.js';
import { recalculatePlayerStats } from './statSystem.js';
import { dispatchRelicEvent } from './relicSystem.js';
import { t } from '../utils/i18n.js';
import { generateBattleRewards } from './rewardSystem.js';

export function setupEncounter(state, node) {
    const { ENEMIES } = GAME_CONFIG;
    let possibleEnemies = state.enemyLibrary.filter(e => e.type === node.type);
    if (possibleEnemies.length === 0) possibleEnemies = state.enemyLibrary.filter(e => e.type === GAME_CONFIG.NODE_TYPES.NORMAL);
    if (possibleEnemies.length === 0) possibleEnemies = state.enemyLibrary;
    let enemyTemplate = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];
    
    let floorBonusHp = (node.floor - 1) * (enemyTemplate.hpGrowth || enemyTemplate.hp_growth || 0);
    let floorBonusAtk = (node.floor - 1) * (enemyTemplate.attackGrowth || 0);
    
    let baseAttack = enemyTemplate.base_stats ? (enemyTemplate.base_stats.attack || 0) : (enemyTemplate.base_attack || 0);
    let baseDefense = enemyTemplate.base_stats ? (enemyTemplate.base_stats.defense || 0) : (enemyTemplate.base_defense || 0);

    let enemy = { 
        name: enemyTemplate.name, 
        hp: (enemyTemplate.hp || enemyTemplate.base_hp || Number(enemyTemplate.hp)) + floorBonusHp, 
        maxHp: (enemyTemplate.hp || enemyTemplate.base_hp || Number(enemyTemplate.hp)) + floorBonusHp, 
        attack: baseAttack + floorBonusAtk, 
        defense: baseDefense,
        attackGrowth: enemyTemplate.attackGrowth || 0,
        defenseGrowth: enemyTemplate.defenseGrowth || 0,
        keywords: enemyTemplate.keywords || [],
        passive: enemyTemplate.passive || (enemyTemplate.keywords ? enemyTemplate.keywords[0] : null)
    };
    
    state.currentEnemy = enemy;
    state.battleLogs = [...state.battleLogs, t('LOGS', 'BATTLE_ENCOUNTER', { floor: node.floor, enemy: enemy.name })];
    
    // 전투 팝업 열기
    state.isBattlePopupOpen = true;
    state.battlePopupState = GAME_CONFIG.BATTLE_POPUP_STATE.PRE;
    state.lastBattleLogs = [];
    
    return state;
}

export function executeBattle(state) {
    const { ACTIONS } = GAME_CONFIG;
    if (!state.currentEnemy) return state;

    let roundLogs = [];
    let p = { ...state.player };
    let e = { ...state.currentEnemy };

    roundLogs.push(t('LOGS', 'BATTLE_START', { enemy: e.name }));

    if (state.activeBattleBuffs && state.activeBattleBuffs.length > 0) {
        state.activeBattleBuffs.forEach(buff => {
            if (buff.action === ACTIONS.ADD_TEMP_STAT) {
                p[buff.stat] += buff.value; 
                roundLogs.push(t('LOGS', 'BATTLE_POTION_EFFECT', { stat: buff.stat, value: buff.value }));
            }
        });
    }

    let turn = 1;
    while (p.hp > 0 && e.hp > 0 && turn <= 100) {
        let curAtk = p.baseAttack + (turn * p.attackGrowth);
        let curDef = p.baseDefense + (turn * p.defenseGrowth);
        
        if (p.attackCap > 0 && curAtk > p.attackCap) curAtk = p.attackCap;
        if (p.defenseCap > 0 && curDef > p.defenseCap) curDef = p.defenseCap;

        let dmgToEnemy = Math.max(0, curAtk - e.defense);
        let dmgToPlayer = Math.max(0, e.attack - curDef);

        roundLogs.push(t('LOGS', 'BATTLE_TURN_INFO', { 
            turn, 
            multiplier: 1, 
            curAtk, 
            curDef 
        }));
        
        e.hp -= dmgToEnemy;
        if (dmgToPlayer > 0) {
            p.hp -= dmgToPlayer;
        }

        roundLogs.push(t('LOGS', 'BATTLE_DAMAGE', { enemy: e.name, dmgToEnemy, dmgToPlayer }));
        
        if (e.hp <= 0 || p.hp <= 0) break;
        turn++;
    }

    if (turn > 100) {
        roundLogs.push(t('LOGS', 'BATTLE_INFINITE_LOOP'));
    }

    state.player.hp = Math.max(0, p.hp);
    
    if (state.player.hp <= 0) {
        roundLogs.push(t('LOGS', 'GAME_OVER', { enemy: e.name }));
    } else {
        if (state.map.selectedNode && state.map.selectedNode.type === GAME_CONFIG.NODE_TYPES.BOSS) {
            roundLogs.push(t('LOGS', 'VICTORY_FINAL', { enemy: e.name }));
        } else {
            roundLogs.push(t('LOGS', 'VICTORY_NORMAL', { enemy: e.name }));
        }
        state.map.lastCompletedNode = state.map.selectedNode; 
        state.map.currentFloor += 1; 
        state.map.selectedNode = null; 
    }

    state.activeBattleBuffs = [];
    
    // 결과를 state.battleLogs에도 누적
    state.battleLogs = [...state.battleLogs, ...roundLogs];
    
    // 팝업용 결과 기록
    state.lastBattleLogs = roundLogs;
    state.battlePopupState = GAME_CONFIG.BATTLE_POPUP_STATE.POST;

    return state;
}

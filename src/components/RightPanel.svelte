<script>
    import { gameStore } from '../stores/gameStore.js';
    import { GAME_CONFIG } from '../constants/gameConfig.js';
    import { TRANSLATIONS, t } from '../utils/i18n.js';
</script>

<div class="right-panel">
    <div class="location-panel">
        <div class="location-header">
            <h3>
            {#if $gameStore.map.selectedNode}
                {t('UI', 'CURRENT_LOCATION', { floor: $gameStore.map.currentFloor, node: TRANSLATIONS.NODE_TYPES[$gameStore.map.selectedNode.type] || $gameStore.map.selectedNode.type })}
            {:else}
                {t('UI', 'CURRENT_LOCATION_WAITING', { floor: $gameStore.map.currentFloor })}
            {/if}
            </h3>
        </div>
        
        {#if $gameStore.enemy && $gameStore.enemy.name && $gameStore.runStatus === GAME_CONFIG.RUN_STATUS.IN_NODE_ACTION}
        <div class="enemy-info">
            <h4>{t('UI', 'ENEMY_INFO_NAME', { enemy: $gameStore.enemy.name })}</h4>
            <p>{t('UI', 'ENEMY_INFO_STATS', { hp: $gameStore.enemy.hp, atk: $gameStore.enemy.attack, def: $gameStore.enemy.defense })}</p>
        </div>
        {/if}
    </div>

    <div class="log-board">
        {#each $gameStore.battleLogs as log}
            <p>{log}</p>
        {/each}
    </div>
</div>

<style>
    .right-panel {
        display: flex;
        flex-direction: column;
        gap: 15px;
        height: 100%;
        overflow-y: auto;
    }

    .location-panel { background: rgba(0,0,0,0.3); border: 1px solid #34495e; color: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; display: flex; flex-direction: column; gap: 10px; }
    .location-header h3 { margin: 0; color: #3498db; font-size: 16px; }
    .enemy-info { background: rgba(192, 57, 43, 0.2); border-left: 4px solid #e74c3c; padding: 10px; border-radius: 4px; }
    .enemy-info h4 { margin: 0 0 5px 0; color: #e74c3c; font-size: 15px; }
    .enemy-info p { margin: 0; font-weight: bold; font-size: 13px; color: #ecf0f1; }

    .log-board { padding: 15px; background: #222; color: #0f0; font-family: monospace; height: 100%; overflow-y: auto; border-radius: 8px; box-sizing: border-box; }
</style>

<script lang="ts">
    import { gameStore } from '../stores/gameStore.ts';
    import { TRANSLATIONS, t } from '../utils/i18n.ts';
    import { I18N_KEY } from '../constants/translation_keys.ts';
    import { GAME_CONFIG } from '../constants/gameConfig.ts';
</script>

{#if $gameStore.isBattlePopupOpen}
    <div class="battle-overlay">
        <div class="battle-modal">
            {#if $gameStore.battlePopupState === GAME_CONFIG.BATTLE_POPUP_STATE.PRE}
                <h2>{TRANSLATIONS.UI.ENEMY_INFO_NAME.replace('{enemy}', $gameStore.currentEnemy?.name)}</h2>
                <div class="enemy-stats">
                    <p>{t(I18N_KEY.UI.BATTLE_ENEMY_HP, { hp: $gameStore.currentEnemy?.hp, maxHp: $gameStore.currentEnemy?.maxHp })}</p>
                    <p>{t(I18N_KEY.UI.BATTLE_ENEMY_ATTACK, { attack: $gameStore.currentEnemy?.attack })}</p>
                    <p>{t(I18N_KEY.UI.BATTLE_ENEMY_DEFENSE, { defense: $gameStore.currentEnemy?.defense })}</p>
                </div>
                <button class="action-btn" on:click={gameStore.startBattle}>
                    {TRANSLATIONS.UI.BTN_BATTLE_START}
                </button>
            {:else if $gameStore.battlePopupState === GAME_CONFIG.BATTLE_POPUP_STATE.POST}
                <h2>{TRANSLATIONS.UI.BATTLE_RESULT}</h2>
                <div class="battle-logs">
                    {#each $gameStore.lastBattleLogs as log}
                        <p>{log}</p>
                    {/each}
                </div>
                <button class="action-btn" on:click={gameStore.continueFromBattle}>
                    {TRANSLATIONS.UI.BTN_NEXT || '계속하기'}
                </button>
            {/if}
        </div>
    </div>
{/if}

<style>
    .battle-overlay {
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(4px);
    }
    .battle-modal {
        background: #2c3e50;
        padding: 30px;
        border-radius: 12px;
        width: 500px;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        gap: 20px;
        color: white;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    h2 {
        margin: 0;
        color: #e74c3c;
        font-size: 24px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
    .enemy-stats {
        background: #34495e;
        padding: 15px;
        border-radius: 8px;
        display: flex;
        justify-content: space-around;
        font-size: 16px;
        font-weight: bold;
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
    }
    .enemy-stats p {
        margin: 0;
    }
    .battle-logs {
        background: #1e272e;
        padding: 15px;
        border-radius: 8px;
        overflow-y: auto;
        max-height: 400px;
        text-align: left;
        font-size: 14px;
        line-height: 1.6;
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
    }
    .battle-logs p {
        margin: 4px 0;
        color: #bdc3c7;
    }
    .battle-logs p:last-child {
        color: #f1c40f;
        font-weight: bold;
    }
    .battle-logs::-webkit-scrollbar { width: 6px; }
    .battle-logs::-webkit-scrollbar-thumb { background: #7f8c8d; border-radius: 3px; }

    .action-btn {
        padding: 15px;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s, background 0.2s;
    }
    .action-btn:hover {
        background: #c0392b;
        transform: translateY(-2px);
    }
</style>

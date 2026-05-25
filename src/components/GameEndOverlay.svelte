<script lang="ts">
    import { gameStore } from '../stores/gameStore.ts';
    import { GAME_CONFIG } from '../constants/gameConfig.ts';
    import { TRANSLATIONS } from '../utils/i18n.ts';
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
</script>

{#if $gameStore.runStatus === GAME_CONFIG.RUN_STATUS.GAMEOVER || $gameStore.runStatus === GAME_CONFIG.RUN_STATUS.VICTORY}
    <div class="overlay">
        <div class="result-box {$gameStore.runStatus.toLowerCase()}">
            {#if $gameStore.runStatus === GAME_CONFIG.RUN_STATUS.GAMEOVER}
                <h2>{TRANSLATIONS.UI.GAME_OVER_TITLE}</h2>
                <p>{TRANSLATIONS.UI.GAME_OVER_DESC}</p>
            {:else}
                <h2>{TRANSLATIONS.UI.VICTORY_TITLE}</h2>
                <p>{TRANSLATIONS.UI.VICTORY_DESC}</p>
            {/if}
            
            <button class="restart-btn" on:click={() => dispatch('returnToMenu')}>
                {TRANSLATIONS.UI.BTN_RETURN_MENU}
            </button>
        </div>
    </div>
{/if}

<style>
    .overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.85);
        display: flex; justify-content: center; align-items: center;
        z-index: 2000;
    }
    .result-box {
        padding: 40px; border-radius: 12px; text-align: center; color: white;
        max-width: 400px; width: 100%; border: 3px solid;
    }
    .gameover { border-color: #e74c3c; background: #1a1a1a; }
    .victory { border-color: #f1c40f; background: #2c3e50; }
    
    h2 { font-size: 32px; margin-top: 0; }
    .gameover h2 { color: #e74c3c; }
    .victory h2 { color: #f1c40f; }
    
    p { margin-bottom: 30px; color: #ccc; }
    
    .restart-btn {
        padding: 12px 24px; font-size: 16px; font-weight: bold;
        background: white; border: none; border-radius: 6px; cursor: pointer;
        transition: 0.2s;
    }
    .gameover .restart-btn { color: #e74c3c; background: white; }
    .victory .restart-btn { color: #2c3e50; background: #f1c40f; }
    .restart-btn:hover { transform: scale(1.05); }
</style>
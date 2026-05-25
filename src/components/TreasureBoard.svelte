<script lang="ts">
    import { gameStore } from '../stores/gameStore.ts';
    import { TRANSLATIONS } from '../utils/i18n.ts';

    let isOpen = false;
</script>

{#if $gameStore.isTreasureScreenOpen}
<div class="treasure-overlay">
    <div class="treasure-modal">
        <h2>{TRANSLATIONS.UI.TREASURE_TITLE || '보물 상자'}</h2>
        
        {#if !isOpen}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="chest-container" on:click={() => isOpen = true}>
                <div class="chest-icon">📦</div>
                <p>{TRANSLATIONS.UI.TREASURE_OPEN_PROMPT}</p>
            </div>
        {:else}
            <div class="reward-container">
                {#if $gameStore.treasureContent.relic}
                    <div class="relic-icon">🏺</div>
                    <h3>{$gameStore.treasureContent.relic.name}</h3>
                    <p>{$gameStore.treasureContent.relic.desc}</p>
                {:else}
                    <p>{TRANSLATIONS.UI.TREASURE_EMPTY}</p>
                {/if}
            </div>
            
            <button class="claim-btn" on:click={() => {
                gameStore.claimTreasure();
                isOpen = false;
            }}>
                {TRANSLATIONS.UI.BTN_CLAIM || '획득하기'}
            </button>
        {/if}
    </div>
</div>
{/if}

<style>
    .treasure-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.85); display: flex; justify-content: center; align-items: center; z-index: 1500;
    }
    .treasure-modal {
        background: #1e1e24; border: 3px solid #f39c12; padding: 40px; border-radius: 12px;
        text-align: center; color: white; max-width: 500px; width: 100%; box-shadow: 0 0 20px rgba(243, 156, 18, 0.3);
    }
    h2 { color: #f39c12; margin-top: 0; font-size: 28px; }
    
    .chest-container {
        cursor: pointer; padding: 40px; transition: transform 0.2s;
    }
    .chest-container:hover { transform: scale(1.1); }
    .chest-icon { font-size: 80px; margin-bottom: 20px; }
    
    .reward-container { margin: 30px 0; }
    .relic-icon { font-size: 50px; margin-bottom: 15px; }
    
    .claim-btn {
        background: #27ae60; color: white; border: none; padding: 12px 30px;
        border-radius: 6px; cursor: pointer; font-size: 18px; transition: 0.2s; font-weight: bold;
    }
    .claim-btn:hover { background: #2ecc71; transform: scale(1.05); }
</style>

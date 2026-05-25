<script lang="ts">
    import { gameStore } from '../stores/gameStore.ts';
    import { TRANSLATIONS, t } from '../utils/i18n.ts';
    import { I18N_KEY } from '../constants/translation_keys.ts';
</script>

<div class="stats-board">
    <div>
        <h3>{TRANSLATIONS.UI.STATS_TITLE}</h3>
        <p>{t(I18N_KEY.UI.STATS_HP, { hp: $gameStore.player.hp })}</p>
        <p>{@html t(I18N_KEY.UI.STATS_GOLD, { gold: $gameStore.player.gold })}</p>
        <p>{t(I18N_KEY.UI.STATS_ATTACK, { base: $gameStore.player.attack, growth: $gameStore.player.attackGrowth, cap: $gameStore.player.attackCap })}</p>
        <p>{t(I18N_KEY.UI.STATS_DEFENSE, { base: $gameStore.player.defense, growth: $gameStore.player.defenseGrowth, cap: $gameStore.player.defenseCap })}</p>
        <p>{t(I18N_KEY.UI.STATS_DEPLOYMENT, { deployment: $gameStore.player.deployment, deckSize: $gameStore.player.deckSize })}</p>
    </div>
</div>

<hr class="divider"/>
        
<h3>{t(I18N_KEY.UI.STATS_RELICS, { count: $gameStore.player.relics ? $gameStore.player.relics.length : 0 })}</h3>
<div class="relic-container">
    {#if !$gameStore.player.relics || $gameStore.player.relics.length === 0}
        <span class="empty-msg">{TRANSLATIONS.UI.STATS_NO_RELICS}</span>
    {:else}
        {#each $gameStore.player.relics as relic}
            <div class="relic-item has-tooltip" data-desc="{relic.desc}">
                🏺 {relic.name}
            </div>
        {/each}
    {/if}
</div>

<hr class="divider">
        
<h3>{t(I18N_KEY.UI.STATS_POTIONS, { count: $gameStore.player.potions ? $gameStore.player.potions.length : 0 })}</h3>
<div class="potion-container">
    {#if !$gameStore.player.potions || $gameStore.player.potions.length === 0}
        <span class="empty-msg">{TRANSLATIONS.UI.STATS_NO_POTIONS}</span>
    {:else}
        {#each $gameStore.player.potions as potion, index}
            <button 
                class="potion-btn has-tooltip" 
                data-desc="{potion.desc}"
                on:click={() => gameStore.usePotion(index)}
            >
                🧪 {potion.name}
            </button>
        {/each}
    {/if}
</div>

<style>
    .stats-board { display: flex; gap: 40px; margin-bottom: 20px; padding: 20px; background: #f4f4f4; border-radius: 8px; }
    .divider { border: 0; border-top: 1px dashed #ccc; margin: 15px 0; }
    .relic-container { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
    .relic-item { background: #f39c12; color: #fff; padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
    .empty-msg { color: #95a5a6; font-size: 13px; font-style: italic; }
    .potion-container { display: flex; gap: 10px; margin-top: 10px; }
    .potion-btn { background: #16a085; color: white; border: none; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: bold; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
    .potion-btn:hover { background: #1abc9c; transform: translateY(-2px); }

    /* Custom Tooltip Styles */
    .has-tooltip { position: relative; }
    .has-tooltip::after {
        content: attr(data-desc);
        position: absolute;
        bottom: 115%;
        left: 0;
        width: max-content;
        max-width: 200px;
        background: rgba(30, 30, 36, 0.95);
        border: 1px solid #f1c40f;
        color: #ecf0f1;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: normal;
        line-height: 1.4;
        white-space: normal;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease-out;
        pointer-events: none;
        z-index: 1000;
        text-align: left;
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
    }
    .has-tooltip:hover::after {
        opacity: 1;
        visibility: visible;
        bottom: 105%;
    }
</style>
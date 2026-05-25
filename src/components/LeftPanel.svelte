<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { TRANSLATIONS } from '../utils/i18n.ts';
    import StatsBoard from './StatsBoard.svelte';
    import DeckBoard from './DeckBoard.svelte';

    const dispatch = createEventDispatcher();
</script>

<div class="left-panel">
    <button class="return-menu-btn" on:click={() => dispatch('returnToMenu')}>
        {TRANSLATIONS.UI.BTN_RETURN_MENU}
    </button>
    <StatsBoard />
    <DeckBoard />
</div>

<style>
    .left-panel {
        display: flex;
        flex-direction: column;
        gap: 15px;
        height: 100%;
        overflow-y: auto;
    }
    
    .left-panel::-webkit-scrollbar { width: 6px; }
    .left-panel::-webkit-scrollbar-thumb { background: #34495e; border-radius: 3px; }

    .return-menu-btn { background: #34495e; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; transition: 0.2s; text-align: left; }
    .return-menu-btn:hover { background: #2c3e50; transform: translateX(-2px); }
</style>

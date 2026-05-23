<script>
    import { gameStore } from '../stores/gameStore.js';
    import { GAME_CONFIG } from '../constants/gameConfig.js';
    import { TRANSLATIONS } from '../utils/i18n.js';
    import RestBoard from './RestBoard.svelte';
    import EventBoard from './EventBoard.svelte';
    import TreasureBoard from './TreasureBoard.svelte';
    import BattleReward from './BattleReward.svelte';
    import MapBoard from './MapBoard.svelte';
    import CardShop from './CardShop.svelte';
    import BattleBoard from './BattleBoard.svelte';
</script>

<div class="center-panel">
    <h1>{TRANSLATIONS.UI.TITLE_MAIN}</h1>
    <RestBoard />
    <EventBoard />
    <TreasureBoard />
    <BattleReward />
    <MapBoard />
    <CardShop />
    <BattleBoard />
</div>

<style>
    .center-panel {
        display: flex;
        flex-direction: column;
        gap: 15px;
        height: 100%;
        overflow-y: auto;
    }
    
    .center-panel::-webkit-scrollbar { width: 8px; }
    .center-panel::-webkit-scrollbar-thumb { background: #34495e; border-radius: 4px; }
</style>

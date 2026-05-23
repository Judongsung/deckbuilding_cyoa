<!-- src/components/DeckBoard.svelte -->
<script>
    import { gameStore } from '../stores/gameStore.js';
    import { TRANSLATIONS, t } from '../utils/i18n.js';
    import CardItem from './CardItem.svelte';

    $: keywordCounts = $gameStore.deck.reduce((acc, card) => {
        const kwds = card.currentKeywords || card.keywords || [];
        kwds.forEach(k => {
            acc[k] = (acc[k] || 0) + 1;
        });
        return acc;
    }, {});
</script>

<div class="deck-section">
    <div class="deck-header">
        <h2>{TRANSLATIONS.UI.DECK_TITLE}</h2>
        <span class="deck-count">{t('UI', 'DECK_COUNT', { count: $gameStore.player.deckSize })}</span>
    </div>

    {#if $gameStore.deck.length === 0}
        <div class="empty-deck">
            <p>{TRANSLATIONS.UI.DECK_EMPTY}</p>
        </div>
    {:else}
        {#if Object.keys(keywordCounts).length > 0}
            <div class="keyword-summary">
                <span class="kw-title">💡 현재 덱 시너지:</span>
                <div class="kw-tags">
                    {#each Object.entries(keywordCounts) as [kw, count]}
                        <span class="kw-tag">[{TRANSLATIONS.KEYWORDS[kw] || kw}] x{count}</span>
                    {/each}
                </div>
            </div>
        {/if}
        <div class="deck-grid">
            {#each $gameStore.deck as card, index}
                <div class="mini-card-wrapper">
                    <CardItem card={card} isUpgraded={card.isUpgraded} disabled={true} />
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .deck-section {
        margin-bottom: 30px;
        padding: 20px;
        background: #34495e;
        color: white;
        border-radius: 8px;
    }
    .deck-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }
    .deck-header h2 {
        margin: 0;
        color: #ecf0f1;
    }
    .deck-count {
        background: #2c3e50;
        padding: 5px 10px;
        border-radius: 20px;
        font-weight: bold;
    }
    .empty-deck {
        padding: 20px;
        text-align: center;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 6px;
        color: #bdc3c7;
    }
    .keyword-summary {
        background: #2c3e50;
        padding: 10px;
        border-radius: 6px;
        font-size: 13px;
        margin-bottom: 15px;
    }
    .kw-title { font-weight: bold; color: #f1c40f; margin-bottom: 8px; display: block; }
    .kw-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .kw-tag {
        background: rgba(241, 196, 15, 0.2);
        color: #f1c40f;
        border: 1px solid #f1c40f;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: bold;
    }

    .deck-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
        gap: 15px;
        margin-top: 15px;
    }
    .mini-card-wrapper {
        width: 115.5px;
        height: 168px;
        position: relative;
        transition: transform 0.2s ease, z-index 0s;
        cursor: pointer;
    }
    .mini-card-wrapper:hover {
        z-index: 100;
        transform: scale(1.3);
    }
    .mini-card-wrapper :global(.card-item) {
        transform: scale(0.7);
        transform-origin: top left;
        position: absolute;
        top: 0; left: 0;
    }
</style>
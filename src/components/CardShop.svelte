<script lang="ts">
    import { gameStore } from '../stores/gameStore.ts';
    import { GAME_CONFIG } from '../constants/gameConfig.ts';
    import { TRANSLATIONS, t } from '../utils/i18n.ts';
    import { I18N_KEY } from '../constants/translation_keys.ts';
    import CardItem from './CardItem.svelte';
</script>

{#if $gameStore.isShopScreenOpen}
<div class="shop-overlay">
    <div class="shop-modal">
        <div class="shop-header">
            <h2>{TRANSLATIONS.UI.SHOP_TITLE}</h2>
            <div class="gold-display">{t(I18N_KEY.UI.SHOP_GOLD, { gold: $gameStore.player.gold })}</div>
        </div>
        
        <div class="shop-content">
            {#if $gameStore.shopInventory.relics.length > 0}
            <div class="shop-section">
                <h3>{TRANSLATIONS.UI.SHOP_SECTION_RELIC}</h3>
                <div class="relic-shelf">
                    {#each $gameStore.shopInventory.relics as relic, index}
                        <div class="item-card relic-item">
                            <span class="item-name">🏺 {relic.name}</span>
                            <span class="item-desc">{relic.desc}</span>
                            <button class="buy-btn" on:click={() => gameStore.buyRelicFromShop(index)}>
                                {t(I18N_KEY.UI.SHOP_BTN_BUY, { price: GAME_CONFIG.ECONOMY.RELIC_PRICE })}
                            </button>
                        </div>
                    {/each}
                </div>
            </div>
            {/if}

            <div class="shop-section">
                <h3>{TRANSLATIONS.UI.SHOP_SECTION_CARD}</h3>
                <div class="card-shelf">
                    {#if $gameStore.shopInventory.cards.length === 0}
                        <p class="sold-out">{TRANSLATIONS.UI.SHOP_SOLD_OUT_CARD}</p>
                    {/if}
                    {#each $gameStore.shopInventory.cards as card, index}
                        {@const price = GAME_CONFIG.ECONOMY.CARD_PRICES[card.tier] || 25}
                        <CardItem 
                            card={card}
                            showPrice={true}
                            {price}
                            actionText={t(I18N_KEY.UI.BTN_SHOP_BUY)}
                            actionClass="buy-btn"
                            disabled={$gameStore.player.gold < price}
                            onAction={() => gameStore.buyCardFromShop(index)}
                        />
                    {/each}
                </div>
            </div>

            <div class="shop-section">
                <h3>{TRANSLATIONS.UI.SHOP_SECTION_POTION}</h3>
                <div class="potion-shelf">
                    {#if $gameStore.shopInventory.potions.length === 0}
                        <p class="sold-out">{TRANSLATIONS.UI.SHOP_SOLD_OUT_POTION}</p>
                    {/if}
                    {#each $gameStore.shopInventory.potions as potion, index}
                        <div class="item-card potion-item">
                            <span class="item-name">🧪 {potion.name}</span>
                            <span class="item-desc">{potion.desc}</span>
                            <button class="buy-btn" on:click={() => gameStore.buyPotionFromShop(index)}>
                                {t(I18N_KEY.UI.SHOP_BTN_BUY, { price: GAME_CONFIG.ECONOMY.POTION_PRICE })}
                            </button>
                        </div>
                    {/each}
                </div>
            </div>
            
            <div class="shop-section remove-section">
                <h3>{TRANSLATIONS.UI.SHOP_SECTION_REMOVE}</h3>
                <p class="service-desc">{TRANSLATIONS.UI.SHOP_REMOVE_DESC}</p>
                <div class="deck-list">
                    {#each $gameStore.deck as card, index}
                        <button class="remove-card-btn" on:click={() => gameStore.removeCardInShop(index)}>
                            {t(I18N_KEY.UI.SHOP_BTN_REMOVE, { cardName: card.name + (card.isUpgraded ? '+' : ''), price: GAME_CONFIG.ECONOMY.CARD_REMOVAL_COST })}
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <button class="close-btn" on:click={gameStore.closeShop}>{TRANSLATIONS.UI.BTN_SHOP_LEAVE}</button>
    </div>
</div>
{/if}

<style>
    .shop-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .shop-modal { background: #1e1e24; border: 3px solid #f39c12; border-radius: 12px; padding: 30px; width: 90%; max-width: 800px; color: white; max-height: 90vh; overflow-y: auto; }
    
    .shop-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f39c12; padding-bottom: 15px; margin-bottom: 20px; }
    .shop-header h2 { margin: 0; color: #f39c12; }
    .gold-display { font-size: 20px; font-weight: bold; color: #f1c40f; }

    .shop-section { margin-bottom: 25px; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;}
    .shop-section h3 { margin-top: 0; color: #bdc3c7; border-bottom: 1px dashed #7f8c8d; padding-bottom: 10px;}
    
    .relic-shelf, .card-shelf, .potion-shelf { display: flex; gap: 15px; flex-wrap: wrap; align-items: stretch; }
    
    .item-card { background: #2c3e50; border: 1px solid #34495e; padding: 15px; border-radius: 8px; width: 160px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; }
    .relic-item { border-color: #e67e22; background: rgba(230, 126, 34, 0.1); }
    .potion-item { border-color: #16a085; background: rgba(22, 160, 133, 0.1); }
    
    .item-name { font-weight: bold; font-size: 16px; color: #ecf0f1; }
    .item-desc { font-size: 12px; color: #bdc3c7; line-height: 1.4; flex-grow: 1; }
    
    .buy-btn { background: #f39c12; color: #fff; border: none; padding: 8px; border-radius: 4px; font-weight: bold; cursor: pointer; transition: 0.2s; }
    .buy-btn:hover { background: #e67e22; transform: scale(1.05); }

    .sold-out { color: #7f8c8d; font-style: italic; }

    .deck-list { display: flex; flex-wrap: wrap; gap: 10px; max-height: 150px; overflow-y: auto; }
    .remove-card-btn { background: #c0392b; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; }
    .remove-card-btn:hover { background: #e74c3c; }

    .close-btn { display: block; width: 100%; background: #7f8c8d; color: white; border: none; padding: 15px; font-size: 18px; font-weight: bold; cursor: pointer; border-radius: 8px; margin-top: 20px; }
    .close-btn:hover { background: #95a5a6; }
</style>
<script lang="ts">
    import { gameStore } from '../stores/gameStore.ts';
    import { GAME_CONFIG } from '../constants/gameConfig.ts';
    import { TRANSLATIONS, t } from '../utils/i18n.ts';
    import { I18N_KEY } from '../constants/translation_keys.ts';
    import CardItem from './CardItem.svelte';

    let isUpgradeMode = false; // 제련 모드 켜짐 여부
    let showUpgradeConfirm = false;
    let selectedUpgradeIndex = -1;

    function openUpgradeConfirm(index) {
        selectedUpgradeIndex = index;
        showUpgradeConfirm = true;
    }

    function confirmUpgrade() {
        gameStore.executeRestUpgrade(selectedUpgradeIndex);
        showUpgradeConfirm = false;
        isUpgradeMode = false;
    }
</script>

{#if $gameStore.isRestScreenOpen}
<div class="rest-overlay">
    <div class="rest-modal">
        <h2>{TRANSLATIONS.UI.REST_TITLE}</h2>
        <p>{TRANSLATIONS.UI.REST_SUBTITLE}</p>

        {#if !isUpgradeMode}
            <div class="choice-container">
                <button class="choice-btn heal-btn" on:click={gameStore.executeRestHeal}>
                    <span class="btn-icon">❤️</span>
                    <div class="btn-text">
                        <strong>{TRANSLATIONS.UI.REST_HEAL_TITLE}</strong>
                        <span>{t(I18N_KEY.UI.REST_HEAL_DESC, { amount: GAME_CONFIG.EVENT.REST_HEAL_AMOUNT })}</span>
                    </div>
                </button>

                <button class="choice-btn upgrade-btn" on:click={() => isUpgradeMode = true}>
                    <span class="btn-icon">⚒️</span>
                    <div class="btn-text">
                        <strong>{TRANSLATIONS.UI.REST_FORGE_TITLE}</strong>
                        <span>{TRANSLATIONS.UI.REST_FORGE_DESC}</span>
                    </div>
                </button>
            </div>
        {:else}
            {#if showUpgradeConfirm}
                <div class="confirm-view">
                    <h3 class="sub-title">{TRANSLATIONS.UI.REST_CONFIRM_UPGRADE}</h3>
                    <p class="confirm-text">{TRANSLATIONS.UI.REST_CONFIRM_DESC}</p>
                    <div class="compare-container">
                        <CardItem card={$gameStore.deck[selectedUpgradeIndex]} isUpgraded={false} />
                        <div class="arrow">➡️</div>
                        <CardItem card={$gameStore.deck[selectedUpgradeIndex]} isUpgraded={true} />
                    </div>
                    <div class="action-buttons">
                        <button class="confirm-btn" on:click={confirmUpgrade}>{TRANSLATIONS.UI.BTN_CONFIRM}</button>
                        <button class="cancel-btn" on:click={() => showUpgradeConfirm = false}>{TRANSLATIONS.UI.BTN_CANCEL}</button>
                    </div>
                </div>
            {:else}
                <h3 class="sub-title">{TRANSLATIONS.UI.REST_CHOOSE_CARD}</h3>
                
                {#if $gameStore.deck.length === 0}
                    <p>{TRANSLATIONS.UI.REST_NO_CARDS}</p>
                    <button class="back-btn" on:click={() => isUpgradeMode = false}>{TRANSLATIONS.UI.BTN_LEAVE}</button>
                {:else}
                    <div class="deck-grid">
                        {#each $gameStore.deck as card, index}
                            <CardItem 
                                card={card}
                                isUpgraded={card.isUpgraded}
                                actionText={card.isUpgraded ? TRANSLATIONS.UI.CARD_ALREADY_UPGRADED : TRANSLATIONS.UI.REST_FORGE_TITLE}
                                actionClass="forge-btn"
                                disabled={card.isUpgraded}
                                onAction={() => openUpgradeConfirm(index)}
                                extraClass={card.isUpgraded ? 'already-upgraded' : ''}
                            />
                        {/each}
                    </div>
                    <button class="back-btn" on:click={() => isUpgradeMode = false}>{TRANSLATIONS.UI.BTN_LEAVE}</button>
                {/if}
            {/if}
        {/if}
    </div>
</div>
{/if}

<style>
    .rest-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.85); display: flex; justify-content: center; align-items: center; z-index: 1500;
    }
    .rest-modal {
        background: #1e1e24; border: 3px solid #e67e22; padding: 4px; border-radius: 12px;
        padding: 30px; text-align: center; color: white; max-width: 700px; width: 100%;
    }
    h2 { color: #e67e22; margin-top: 0; font-size: 28px; }
    
    .choice-container { display: flex; gap: 20px; justify-content: center; margin-top: 30px; }
    .choice-btn {
        flex: 1; height: 120px; border: 2px solid #34495e; background: #2c3e50;
        border-radius: 8px; color: white; cursor: pointer; display: flex; align-items: center;
        padding: 20px; gap: 15px; text-align: left; transition: 0.2s;
    }
    .choice-btn:hover { border-color: #e67e22; background: #34495e; transform: translateY(-3px); }
    .btn-icon { font-size: 36px; }
    .btn-text { display: flex; flex-direction: column; gap: 5px; }
    .btn-text strong { font-size: 18px; color: #fff; }
    .btn-text span { font-size: 13px; color: #bdc3c7; }

    .sub-title { color: #f1c40f; margin-top: 25px; border-bottom: 1px dashed #444; padding-bottom: 10px;}
    .deck-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin: 20px 0; max-height: 400px; overflow-y: auto; padding-right: 5px;}
    
    .confirm-view { display: flex; flex-direction: column; align-items: center; }
    .confirm-text { color: #ecf0f1; font-size: 16px; margin-bottom: 20px; }
    .compare-container { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 30px; }
    .arrow { font-size: 30px; }
    .action-buttons { display: flex; gap: 15px; }
    .confirm-btn { background: #27ae60; color: white; border: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 16px; transition: 0.2s; }
    .confirm-btn:hover { background: #2ecc71; transform: scale(1.05); }
    .cancel-btn { background: #e74c3c; color: white; border: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 16px; transition: 0.2s; }
    .cancel-btn:hover { background: #c0392b; transform: scale(1.05); }

    .back-btn { background: transparent; color: #bdc3c7; border: 1px solid #7f8c8d; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 15px;}
</style>
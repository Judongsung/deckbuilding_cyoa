<script>
    import { gameStore } from '../stores/gameStore.js';
    import { TRANSLATIONS, t } from '../utils/i18n.js';
    import CardItem from './CardItem.svelte';

    let showCardChoices = false; // true면 카드 3지선다 보여줌
    let cardRewardIndex = -1; // 카드 보상이 pendingRewards에 있는 위치
    
    // pendingRewards 중에서 'card' 타입의 인덱스를 찾음
    $: {
        const idx = $gameStore.pendingRewards.findIndex(r => r.type === 'card');
        if (idx === -1) {
            showCardChoices = false;
        } else {
            cardRewardIndex = idx;
        }
    }
</script>

{#if $gameStore.isRewardScreenOpen}
<div class="reward-overlay">
    <div class="reward-modal">
        <h2>{TRANSLATIONS.UI.REWARD_TITLE}</h2>
        
        <div class="content-area">
            {#if !showCardChoices}
                <!-- 보상 리스트 모드 -->
                <div class="rewards-list">
                    {#each $gameStore.pendingRewards as reward, index}
                        {#if reward.type === 'gold'}
                            <button class="reward-btn" on:click={() => gameStore.claimSpecificReward(index)}>
                                {t('UI', 'REWARD_GET_GOLD', { amount: reward.amount })}
                            </button>
                        {:else if reward.type === 'potion'}
                            <button class="reward-btn" on:click={() => gameStore.claimSpecificReward(index)}>
                                {t('UI', 'REWARD_GET_POTION', { item: reward.item.name })}
                            </button>
                        {:else if reward.type === 'relic'}
                            <button class="reward-btn" on:click={() => gameStore.claimSpecificReward(index)}>
                                {t('UI', 'REWARD_GET_RELIC', { item: reward.item.name })}
                            </button>
                        {:else if reward.type === 'card'}
                            <button class="reward-btn" on:click={() => showCardChoices = true}>
                                {TRANSLATIONS.UI.REWARD_GET_CARD}
                            </button>
                        {/if}
                    {/each}
                </div>
            {:else}
                <!-- 카드 선택 모드 -->
                <p>{TRANSLATIONS.UI.REWARD_SUBTITLE_CARD}</p>
                <div class="card-grid">
                    {#each $gameStore.pendingRewards[cardRewardIndex].choices as card}
                        <CardItem 
                            card={card}
                            actionText={TRANSLATIONS.UI.REWARD_BTN_PICK}
                            actionClass="pick-btn"
                            onAction={() => gameStore.claimReward(card)}
                        />
                    {/each}
                </div>
            {/if}
        </div>
        
        <button class="skip-btn" on:click={showCardChoices ? () => showCardChoices = false : gameStore.skipAllRewards}>
            {showCardChoices ? TRANSLATIONS.UI.BTN_LEAVE : ($gameStore.pendingRewards.length === 0 ? TRANSLATIONS.UI.BTN_NEXT : TRANSLATIONS.UI.REWARD_BTN_SKIP)}
        </button>
    </div>
</div>
{/if}

<style>
    .reward-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.85); display: flex; justify-content: center; align-items: center; z-index: 1500;
    }
    .reward-modal {
        background: #1e1e24; border: 3px solid #f1c40f; padding: 40px; border-radius: 12px;
        text-align: center; color: white; max-width: 800px; width: 100%; box-shadow: 0 0 20px rgba(241, 196, 15, 0.3);
        min-height: 450px; display: flex; flex-direction: column;
    }
    h2 { color: #f1c40f; margin-top: 0; font-size: 28px; }
    
    .content-area {
        flex-grow: 1; display: flex; flex-direction: column; justify-content: center;
    }

    .rewards-list {
        display: flex; flex-direction: column; gap: 15px; margin: 30px 0; align-items: center;
    }
    .reward-btn {
        background: #2c3e50; border: 2px solid #34495e; color: white; padding: 15px 30px;
        border-radius: 8px; cursor: pointer; font-size: 18px; width: 80%; max-width: 400px;
        transition: 0.2s; font-weight: bold;
    }
    .reward-btn:hover { background: #34495e; border-color: #f1c40f; transform: translateY(-2px); }
    
    .card-grid { display: flex; justify-content: center; gap: 15px; margin: 30px 0; flex-wrap: wrap; }
    
    .skip-btn {
        background: transparent; color: #bdc3c7; border: 1px solid #7f8c8d; padding: 12px 25px;
        border-radius: 4px; cursor: pointer; transition: 0.2s;
    }
    .skip-btn:hover { background: #7f8c8d; color: white; }
</style>

<script>
    import { getCardDescription } from '../utils/cardTextGenerator.js';
    import { GAME_CONFIG } from '../constants/gameConfig.js';
    import { TRANSLATIONS } from '../utils/i18n.js';
    
    export let card;
    export let isUpgraded = false;
    export let showPrice = false;
    export let price = 0;
    export let actionText = "";
    export let actionClass = "default-btn";
    export let onAction = null;
    export let disabled = false;
    export let extraClass = "";

    // 이미지 로드 실패 시 임시 이미지로 대체
    function handleImageError(e) {
        e.target.onerror = null; // 무한 루프 방지: 대체 이미지도 없으면 멈춤
        e.target.src = GAME_CONFIG.ASSETS.FALLBACK_CARD_IMAGE;
    }
</script>

<div class="card-container">
    <div class="card-item {extraClass}">
        <!-- 1. 이미지 -->
        <div class="card-image-container">
            <img 
                src={card.image || GAME_CONFIG.ASSETS.FALLBACK_CARD_IMAGE} 
                alt={card.name} 
                on:error={handleImageError} 
                class="card-image" 
            />
        </div>

        <div class="card-content">
            <!-- 2. 이름 -->
            <div class="card-name">{card.name}{isUpgraded ? '+' : ''}</div>
            
            <!-- 3. 키워드 -->
            <div class="card-keywords">
                {#each (card.currentKeywords || card.keywords || []) as kw}
                    <span class="kw-tag">[{TRANSLATIONS.KEYWORDS[kw] || kw}]</span>
                {/each}
            </div>

            <!-- 4. 효과 -->
            <div class="card-desc">
                {@html getCardDescription(card, isUpgraded).join('<br>')}
            </div>
        </div>
    </div>
    
    {#if onAction}
        <button 
            class="external-action-btn {actionClass}" 
            {disabled}
            on:click={onAction}
        >
            {#if showPrice}
                {price}G {actionText}
            {:else}
                {actionText}
            {/if}
        </button>
    {/if}
</div>

<style>
    .card-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        width: 165px;
    }

    .card-item {
        background: #1e272e;
        border: 2px solid #485460;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        width: 165px;
        height: 240px;
        box-sizing: border-box;
        overflow: hidden; /* 이미지 모서리를 카드에 맞게 둥글게 */
        position: relative;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .card-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0,0,0,0.5);
    }
    .card-item.already-upgraded {
        opacity: 0.7;
        border-color: #27ae60;
    }
    
    .card-image-container {
        width: 100%;
        height: 95px; /* 이미지 영역 높이 지정 */
        background: #000;
        flex-shrink: 0;
        border-bottom: 2px solid #485460;
    }
    .card-image {
        width: 100%;
        height: 100%;
        object-fit: cover; /* 비율 유지하며 채우기 */
    }

    .card-content {
        padding: 6px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: hidden;
    }

    .card-name {
        font-weight: 900;
        font-size: 14px;
        color: #f1c40f;
        text-align: center;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        padding-bottom: 4px;
        margin-bottom: 4px;
        letter-spacing: 0.5px;
    }
    .already-upgraded .card-name { color: #2ecc71; }

    .card-keywords {
        display: flex;
        flex-wrap: wrap;
        gap: 3px;
        justify-content: center;
        margin-bottom: 6px;
    }
    .kw-tag {
        font-size: 10px;
        background: #34495e;
        color: #bdc3c7;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: bold;
    }

    .card-desc {
        font-size: 11px;
        color: #ecf0f1;
        line-height: 1.4;
        flex-grow: 1;
        overflow-y: auto;
        text-align: center;
        padding: 0 2px;
    }
    .card-desc::-webkit-scrollbar { width: 4px; }
    .card-desc::-webkit-scrollbar-thumb { background: #7f8c8d; border-radius: 2px; }
    
    .external-action-btn {
        width: 100%;
        padding: 10px 0;
        background: #27ae60;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s, background 0.2s;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        font-size: 14px;
    }
    .external-action-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        background: #2ecc71;
    }
    .external-action-btn:disabled {
        background: #7f8c8d;
        cursor: not-allowed;
    }
    
    /* Specific button styles passed via actionClass */
    .default-btn { background: #3498db; }
    .default-btn:hover:not(:disabled) { background: #2980b9; transform: scale(1.05); }
    
    .buy-btn { background: #f39c12; }
    .buy-btn:hover:not(:disabled) { background: #e67e22; transform: scale(1.05); }
    
    .pick-btn { background: #2ecc71; }
    .pick-btn:hover:not(:disabled) { background: #27ae60; transform: scale(1.05); }
    
    .forge-btn { background: #e67e22; }
    .forge-btn:hover:not(:disabled) { background: #d35400; transform: scale(1.05); }
</style>

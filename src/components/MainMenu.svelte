<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { gameStore } from '../stores/gameStore.ts';
    import { GAME_CONFIG } from '../constants/gameConfig.ts'; 
    import { t } from '../utils/i18n.ts';
    import { I18N_KEY } from '../constants/translation_keys.ts';

    const dispatch = createEventDispatcher();

    // 💡 스토어의 runStatus가 게임 진행 중인지 체크합니다.
    $: hasSave = $gameStore.runStatus === GAME_CONFIG.RUN_STATUS.MAP_NAVIGATING || $gameStore.runStatus === GAME_CONFIG.RUN_STATUS.IN_NODE_ACTION;
    $: characters = $gameStore.characterLibrary || [];

    let showCharacterSelect = false;

    function handleNewGameClick() {
        if (hasSave) {
            const confirmReset = confirm(t(I18N_KEY.UI.CONFIRM_RESET));
            if (!confirmReset) return;
        }
        showCharacterSelect = true;
    }

    function selectCharacterAndStart(characterId) {
        gameStore.startNewGame(characterId);
        dispatch('enterGame');
    }

    function handleContinue() {
        dispatch('enterGame');
    }
</script>

<div class="menu-container">
    <div class="title-section">
        <h1>SPYRE<br><span class="subtitle">{t(I18N_KEY.UI.SUBTITLE)}</span></h1>
    </div>

    {#if !showCharacterSelect}
        <div class="button-section">
            <button class="menu-btn continue-btn" disabled={!hasSave} on:click={handleContinue}>
                {#if hasSave}
                    {t(I18N_KEY.UI.BTN_CONTINUE)}
                {:else}
                    {t(I18N_KEY.UI.NO_SAVE)}
                {/if}
            </button>
            
            <button class="menu-btn new-btn" on:click={handleNewGameClick}>
                {t(I18N_KEY.UI.BTN_NEW_GAME)}
            </button>
        </div>
    {:else}
        <div class="character-select-section">
            <h2>{t(I18N_KEY.UI.SELECT_CLASS)}</h2>
            <div class="character-list">
                {#each characters as char}
                    <button class="char-btn" on:click={() => selectCharacterAndStart(char.id)}>
                        <h3>{char.name}</h3>
                        <p>{char.description}</p>
                    </button>
                {/each}
            </div>
            <button class="menu-btn back-btn" on:click={() => showCharacterSelect = false}>{t(I18N_KEY.UI.BTN_LEAVE)}</button>
        </div>
    {/if}

    <div class="footer">
        <p>{t(I18N_KEY.UI.VERSION)}</p>
    </div>
</div>

<style>
    /* 화면 전체를 덮는 다크 판타지 느낌의 배경 */
    .menu-container {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: radial-gradient(circle at center, #2c3e50 0%, #1a1a1a 100%);
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        color: white; z-index: 9999;
    }

    .title-section { text-align: center; margin-bottom: 60px; }
    h1 { font-size: 64px; margin: 0; letter-spacing: 4px; color: #f1c40f; text-shadow: 0 4px 15px rgba(241, 196, 15, 0.3); }
    .subtitle { font-size: 24px; color: #bdc3c7; letter-spacing: 2px; font-weight: normal; }

    .button-section { display: flex; flex-direction: column; gap: 20px; width: 300px; }
    
    .menu-btn {
        padding: 15px 30px; font-size: 20px; font-weight: bold;
        border: 2px solid transparent; border-radius: 8px; cursor: pointer;
        transition: all 0.3s ease; text-align: center;
    }
    
    .continue-btn { background: #27ae60; color: white; box-shadow: 0 0 15px rgba(39, 174, 96, 0.4); }
    .continue-btn:hover:not(:disabled) { background: #2ecc71; transform: scale(1.05); }
    .continue-btn:disabled { background: #34495e; color: #7f8c8d; box-shadow: none; cursor: not-allowed; }

    .new-btn { background: transparent; color: #f1c40f; border-color: #f1c40f; }
    .new-btn:hover { background: rgba(241, 196, 15, 0.1); transform: scale(1.05); }

    .back-btn { background: transparent; color: #bdc3c7; border-color: #7f8c8d; margin-top: 20px; }
    .back-btn:hover { background: rgba(189, 195, 199, 0.1); transform: scale(1.05); }

    .character-select-section { display: flex; flex-direction: column; align-items: center; }
    .character-select-section h2 { margin-bottom: 20px; color: #f1c40f; }
    .character-list { display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; }
    
    .char-btn {
        background: rgba(44, 62, 80, 0.8); border: 2px solid #34495e; border-radius: 10px;
        padding: 20px; width: 200px; color: white; cursor: pointer; transition: all 0.2s ease;
        text-align: left;
    }
    .char-btn h3 { margin: 0 0 10px 0; color: #3498db; }
    .char-btn p { margin: 0; font-size: 14px; color: #bdc3c7; line-height: 1.4; }
    .char-btn:hover { border-color: #3498db; transform: translateY(-5px); box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3); }

    .footer { position: absolute; bottom: 20px; color: #7f8c8d; font-size: 14px; }
</style>
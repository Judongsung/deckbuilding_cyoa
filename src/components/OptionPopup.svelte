<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { t } from '../utils/i18n.ts';
    import { GAME_CONFIG } from '../constants/gameConfig.ts';
    import { I18N_KEY } from '../constants/translation_keys.ts';
    import { getCurrentLanguage } from '../systems/optionSystem.ts';
    import { gameStore } from '../stores/gameStore.ts';

    const dispatch = createEventDispatcher();

    let selectedLang = getCurrentLanguage();

    function apply() {
        gameStore.setLanguage(selectedLang);
        // setLanguage가 같은 언어면 reload하지 않으므로 팝업만 닫음
        dispatch('close');
    }

    function close() {
        dispatch('close');
    }
</script>

<!-- 오버레이 배경 클릭 시 닫기 -->
<div
    class="overlay"
    on:click|self={close}
    on:keydown={(e) => e.key === 'Escape' && close()}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
>
    <div class="popup">
        <button class="close-btn" on:click={close} aria-label="Close">✕</button>

        <h2>{t(I18N_KEY.UI.SETTINGS_TITLE)}</h2>

        <section class="setting-row">
            <span class="setting-label">{t(I18N_KEY.UI.SETTINGS_LANGUAGE)}</span>
            <div class="lang-buttons">
                {#each GAME_CONFIG.SUPPORTED_LANGUAGES as lang}
                    <button
                        class="lang-btn"
                        class:active={selectedLang === lang.code}
                        on:click={() => selectedLang = lang.code}
                    >
                        {lang.label}
                    </button>
                {/each}
            </div>
        </section>

        <p class="notice">{t(I18N_KEY.UI.SETTINGS_RELOAD_NOTICE)}</p>

        <button class="apply-btn" on:click={apply}>
            {t(I18N_KEY.UI.SETTINGS_APPLY)}
        </button>
    </div>
</div>

<style>
    .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(4px);
        animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    .popup {
        position: relative;
        background: linear-gradient(145deg, #1e2a38, #243447);
        border: 1px solid rgba(241, 196, 15, 0.3);
        border-radius: 16px;
        padding: 40px 48px;
        width: 360px;
        color: #ecf0f1;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(241, 196, 15, 0.05);
        animation: slideUp 0.2s ease;
    }

    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
    }

    .close-btn {
        position: absolute;
        top: 16px;
        right: 20px;
        background: none;
        border: none;
        color: #7f8c8d;
        font-size: 18px;
        cursor: pointer;
        line-height: 1;
        padding: 4px 8px;
        border-radius: 4px;
        transition: color 0.2s, background 0.2s;
    }
    .close-btn:hover { color: #ecf0f1; background: rgba(255,255,255,0.08); }

    h2 {
        margin: 0 0 32px 0;
        font-size: 22px;
        color: #f1c40f;
        letter-spacing: 1px;
    }

    .setting-row {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
    }

    .setting-label {
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: #95a5a6;
    }

    .lang-buttons {
        display: flex;
        gap: 10px;
    }

    .lang-btn {
        flex: 1;
        padding: 10px 0;
        border: 2px solid #34495e;
        border-radius: 8px;
        background: transparent;
        color: #bdc3c7;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .lang-btn:hover {
        border-color: #f1c40f;
        color: #f1c40f;
        background: rgba(241, 196, 15, 0.06);
    }
    .lang-btn.active {
        border-color: #f1c40f;
        background: rgba(241, 196, 15, 0.12);
        color: #f1c40f;
        box-shadow: 0 0 12px rgba(241, 196, 15, 0.2);
    }

    .notice {
        margin: 0 0 28px 0;
        font-size: 12px;
        color: #7f8c8d;
        line-height: 1.5;
    }

    .apply-btn {
        width: 100%;
        padding: 13px;
        background: linear-gradient(135deg, #f39c12, #f1c40f);
        color: #1a1a1a;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 15px rgba(241, 196, 15, 0.3);
    }
    .apply-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(241, 196, 15, 0.45);
    }
    .apply-btn:active {
        transform: translateY(0);
    }
</style>

<script>
    import { gameStore } from '../stores/gameStore.js';
    import { t } from '../utils/i18n.js';
</script>

{#if $gameStore.isEventScreenOpen && $gameStore.currentEvent}
<div class="event-overlay">
    <div class="event-modal">
        <h2>{t('LOGS', 'EVENT_TITLE', { title: $gameStore.currentEvent.title })}</h2>
        
        <div class="event-desc">
            <p>{$gameStore.currentEvent.desc}</p>
        </div>

        <div class="choices-container">
            {#each $gameStore.currentEvent.choices as choice}
                <button 
                    class="choice-btn {choice.actions && choice.actions.some(a => a.type === 'leave') ? 'leave-btn' : 'action-btn'}"
                    on:click={() => gameStore.executeEventChoice(choice)}
                >
                    {choice.text}
                </button>
            {/each}
        </div>
    </div>
</div>
{/if}

<style>
    .event-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        display: flex; justify-content: center; align-items: center;
        z-index: 1500;
    }
    
    .event-modal {
        background: #2c3e50;
        border: 2px solid #8e44ad;
        border-radius: 8px;
        padding: 40px;
        text-align: center;
        color: white;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 0 20px rgba(142, 68, 173, 0.5);
    }

    h2 {
        color: #9b59b6;
        margin-top: 0;
        font-size: 28px;
        border-bottom: 1px dashed #7f8c8d;
        padding-bottom: 15px;
    }

    .event-desc {
        font-size: 16px;
        line-height: 1.6;
        color: #ecf0f1;
        margin: 30px 0;
        text-align: left;
        padding: 20px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
    }

    .choices-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .choice-btn {
        padding: 15px;
        font-size: 15px;
        font-weight: bold;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: transform 0.2s, background-color 0.2s;
        text-align: left;
    }

    .action-btn {
        background: #8e44ad;
        color: white;
    }
    
    .action-btn:hover {
        background: #9b59b6;
        transform: translateX(5px);
    }

    .leave-btn {
        background: #34495e;
        color: #bdc3c7;
    }

    .leave-btn:hover {
        background: #7f8c8d;
        color: white;
        transform: translateX(5px);
    }
</style>
<script>
    import { onMount } from 'svelte';
    import { gameStore } from './stores/gameStore.js';
    import { hydrateLibraries } from './utils/i18n.js';
    import MainMenu from './components/MainMenu.svelte'; 
    import GameEndOverlay from './components/GameEndOverlay.svelte';
    import LeftPanel from './components/LeftPanel.svelte';
    import CenterPanel from './components/CenterPanel.svelte';
    import RightPanel from './components/RightPanel.svelte';

    // ⭐ 카드와 유물 데이터 한 번에 불러오기
    import cardsData from './data/cards.json';
    import relicsData from './data/relics.json';
    import enemiesData from './data/enemies.json';
    import eventsData from './data/events.json';
    import potionsData from './data/potions.json';
    import charactersData from './data/characters.json'; // ⭐ 캐릭터 추가

    onMount(() => {
        const h = hydrateLibraries(cardsData, relicsData, enemiesData, eventsData, potionsData, charactersData);
        gameStore.loadLibraries(h.cards, h.relics, h.enemies, h.events, h.potions, h.characters);
    });

    let currentScreen = 'MENU'; 

    // 패널 크기 조절 상태
    let leftWidth = 300;
    let rightWidth = 350;
    let isDraggingLeft = false;
    let isDraggingRight = false;
    
    function onMouseMove(e) {
        if (isDraggingLeft) {
            leftWidth = Math.max(200, Math.min(e.clientX - 20, 800)); // 20px padding 감안
        } else if (isDraggingRight) {
            rightWidth = Math.max(200, Math.min(window.innerWidth - e.clientX - 20, 800));
        }
    }
    
    function onMouseUp() {
        isDraggingLeft = false;
        isDraggingRight = false;
    }
</script>

<svelte:window on:mousemove={onMouseMove} on:mouseup={onMouseUp} />

{#if currentScreen === 'MENU'}
    <MainMenu on:enterGame={() => currentScreen = 'GAME'} />
{:else}
    <main style="--left-width: {leftWidth}px; --right-width: {rightWidth}px;" class:dragging={isDraggingLeft || isDraggingRight}>
        <GameEndOverlay on:returnToMenu={() => {
            gameStore.returnToMainMenu();
            currentScreen = 'MENU';
        }} /> 
        
        <LeftPanel on:returnToMenu={() => currentScreen = 'MENU'} />
        
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="resizer" on:mousedown={() => isDraggingLeft = true}></div>
        
        <CenterPanel />
        
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="resizer" on:mousedown={() => isDraggingRight = true}></div>
        
        <RightPanel />
    </main>
{/if}

<style>
    main { 
        font-family: sans-serif; 
        padding: 20px; 
        width: 100%;
        max-width: 100%; 
        margin: 0; 
        height: 100vh;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: var(--left-width) 5px 1fr 5px var(--right-width);
        gap: 15px;
    }

    main.dragging {
        user-select: none; /* 드래그 중 텍스트 선택 방지 */
    }

    .resizer {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.05);
        cursor: col-resize;
        border-radius: 3px;
        transition: background 0.2s;
    }
    
    .resizer:hover {
        background: #3498db;
    }
</style>
<script>
    import { gameStore } from '../stores/gameStore.js';
    import { GAME_CONFIG } from '../constants/gameConfig.js';
    import { TRANSLATIONS, t } from '../utils/i18n.js';
    import { onMount, tick } from 'svelte';

    const nodeIcons = {
        [GAME_CONFIG.NODE_TYPES.NORMAL]: '⚔️',
        [GAME_CONFIG.NODE_TYPES.ELITE]: '💀',
        [GAME_CONFIG.NODE_TYPES.BOSS]: '👑',
        [GAME_CONFIG.NODE_TYPES.SHOP]: '🛒',
        [GAME_CONFIG.NODE_TYPES.REST]: '⛺',
        [GAME_CONFIG.NODE_TYPES.TREASURE]: '💎',
        [GAME_CONFIG.NODE_TYPES.UNKNOWN]: '❓'
    };

    let mapGrid;
    let lines = [];
    let mapGridWidth;
    let mapGridHeight;
    
    // 역순으로 렌더링하기 위해 복사 후 reverse
    $: mapStructure = [...$gameStore.map.structure].reverse();
    
    async function drawLines() {
        await tick(); 
        
        // DOM 렌더링을 완전히 보장하기 위해 약간의 딜레이 추가
        setTimeout(() => {
            if (!mapGrid) return;
            
            const mapRect = mapGrid.getBoundingClientRect();
            let newLines = [];
            
            $gameStore.map.structure.forEach((floorNodes) => {
                if (floorNodes[0].floor === GAME_CONFIG.MAP.MAX_FLOORS) return; // 보스층 스킵
                
                floorNodes.forEach(node => {
                    const el = document.getElementById(`node-btn-${node.id}`);
                    if (!el) return;
                    
                    const rect = el.getBoundingClientRect();
                    const startX = rect.left + rect.width / 2 - mapRect.left;
                    const startY = rect.top + rect.height / 2 - mapRect.top;
                    
                    node.connections.forEach(targetIdx => {
                        const targetId = `${node.floor + 1}-${targetIdx}`;
                        const targetEl = document.getElementById(`node-btn-${targetId}`);
                        if (targetEl) {
                            const tRect = targetEl.getBoundingClientRect();
                            const endX = tRect.left + tRect.width / 2 - mapRect.left;
                            const endY = tRect.top + tRect.height / 2 - mapRect.top;
                            
                            // 1층 진입 시 또는 직전 완료 노드에서 연결되는 선 강조
                            let isActive = false;
                            let isPassed = false;
                            
                            if ($gameStore.map.history) {
                                if (node.floor === 1) {
                                    // 1층 노드가 역사에 있다면, 1층->2층 연결선도 targetId가 역사에 있으면 Passed
                                    isPassed = $gameStore.map.history.includes(node.id) && $gameStore.map.history.includes(targetId);
                                } else {
                                    isPassed = $gameStore.map.history.includes(node.id) && $gameStore.map.history.includes(targetId);
                                }
                            }

                            if (!$gameStore.map.lastCompletedNode && node.floor === 1 && $gameStore.map.currentFloor === 1) {
                                isActive = true;
                            } else if ($gameStore.map.lastCompletedNode && $gameStore.map.lastCompletedNode.id === node.id) {
                                isActive = true;
                            }
                            
                            newLines.push({
                                id: `${node.id}-${targetId}`,
                                x1: startX,
                                y1: startY,
                                x2: endX,
                                y2: endY,
                                active: isActive,
                                passed: isPassed
                            });
                        }
                    });
                });
            });
            
            lines = newLines;
        }, 50);
    }

    $: if (mapStructure || $gameStore.map.currentFloor || $gameStore.map.lastCompletedNode || mapGridWidth || mapGridHeight) {
        drawLines();
    }
    
    onMount(() => {
        window.addEventListener('resize', drawLines);
        drawLines();
        return () => window.removeEventListener('resize', drawLines);
    });

    function getNodeAt(floorNodes, index) {
        return floorNodes.find(n => n.index === index);
    }
</script>

<div class="map-board">
    <h2>{t('UI', 'TITLE_MAP', { floor: $gameStore.map.currentFloor })}</h2>

    <div class="map-grid-container" bind:this={mapGrid} bind:clientWidth={mapGridWidth} bind:clientHeight={mapGridHeight}>
        <svg class="lines-svg">
            {#each lines as line (line.id)}
                <line 
                    x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} 
                    stroke={line.passed ? "#34495e" : (line.active ? "#e67e22" : "rgba(0,0,0,0.4)")} 
                    stroke-width={line.passed || line.active ? "4" : "2"} 
                    stroke-dasharray={line.passed ? "none" : (line.active ? "8,4" : "5,5")}
                />
            {/each}
        </svg>

        {#each mapStructure as floorNodes}
            <div class="floor-row">
                <span class="floor-num">{floorNodes[0].floor}F</span>
                
                <div class="nodes">
                    {#each Array(GAME_CONFIG.MAP.NODES_PER_FLOOR) as _, colIndex}
                        {@const node = getNodeAt(floorNodes, colIndex)}
                        {#if node}
                            <button 
                                id="node-btn-{node.id}"
                                style="--offset-x: {node.offsetX || 0}px; --offset-y: {node.offsetY || 0}px;"
                                class="node-btn {node.type.toLowerCase()} 
                                    { $gameStore.map.lastCompletedNode && $gameStore.map.lastCompletedNode.connections.includes(node.index) && node.floor === $gameStore.map.currentFloor ? 'reachable' : '' }
                                    { (!$gameStore.map.lastCompletedNode && node.floor === 1 && $gameStore.map.currentFloor === 1) ? 'reachable' : '' }
                                    { $gameStore.map.selectedNode && $gameStore.map.selectedNode.id === node.id ? 'selected' : '' }"
                                disabled={node.floor !== $gameStore.map.currentFloor || $gameStore.runStatus === GAME_CONFIG.RUN_STATUS.IN_NODE_ACTION}
                                on:click={() => gameStore.selectNode(node)}
                            >
                                <span class="icon">{nodeIcons[node.type] || '▪️'}</span>
                                <span class="type-name">{TRANSLATIONS.NODE_TYPES[node.type]}</span>
                            </button>
                        {:else}
                            <div class="empty-slot"></div>
                        {/if}
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .map-board { 
        background: url('/map_bg.png') center/cover no-repeat, #1a1a1a; 
        padding: 20px; 
        border-radius: 8px; 
        color: white; 
        text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
        margin-bottom: 20px; 
        position: relative; 
    }
    
    .map-grid-container { position: relative; display: flex; flex-direction: column; gap: 15px; margin-top: 15px; }
    
    /* SVG 라인은 뒤에 깔리게 처리 (z-index 조절) */
    .lines-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; overflow: visible; }
    
    .floor-row { display: flex; align-items: center; gap: 20px; padding: 10px; border-radius: 6px; z-index: 2; position: relative; }
    .floor-num { font-weight: bold; width: 40px; color: #fff; text-shadow: 1px 1px 4px black; }
    .nodes { display: flex; gap: 10px; flex-grow: 1; justify-content: space-around; }
    
    .node-btn, .empty-slot { width: 80px; height: 60px; }
    
    .empty-slot { opacity: 0; pointer-events: none; }
    
    .node-btn { background: #2c3e50; color: white; border: none; padding: 5px; border-radius: 6px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; opacity: 0.4; transition: 0.2s; position: relative; z-index: 3; transform: translate(var(--offset-x), var(--offset-y)); box-shadow: 0 2px 5px rgba(0,0,0,0.5); }
    .node-btn:disabled { cursor: not-allowed; }
    
    .node-btn.reachable { opacity: 0.9; box-shadow: 0 0 10px #3498db; background: #2980b9; }
    .node-btn.selected { background: #e67e22 !important; opacity: 1 !important; box-shadow: 0 0 15px #e67e22; }
    .node-btn:hover:not(:disabled) { transform: translate(var(--offset-x), calc(var(--offset-y) - 5px)) scale(1.05); opacity: 1; }
    
    .icon { font-size: 20px; }
    .type-name { font-size: 11px; color: #bdc3c7; }
</style>
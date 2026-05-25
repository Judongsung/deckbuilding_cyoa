// src/constants/translations_kr.ts

export const TRANSLATIONS = {
    NODE_TYPES: {
        "NORMAL": "일반 전투",
        "ELITE": "엘리트 전투",
        "BOSS": "보스 전투",
        "SHOP": "상점",
        "REST": "휴식처",
        "TREASURE": "보물 상자",
        "UNKNOWN": "미지"
    },
    STAT_NAMES: {
        attack: "기초 공격력",
        ATTACK: "기초 공격력",
        attackGrowth: "공격 성장력",
        ATTACK_GROWTH: "공격 성장력",
        attackCap: "최대 공격력",
        ATTACK_CAP: "최대 공격력",
        defense: "기초 방어력",
        DEFENSE: "기초 방어력",
        defenseGrowth: "방어 성장력",
        DEFENSE_GROWTH: "방어 성장력",
        defenseCap: "최대 방어력",
        DEFENSE_CAP: "최대 방어력",
        deployment: "전개력",
        DEPLOYMENT: "전개력",
        hp: "체력",
        HP: "체력"
    },
    
    KEYWORDS: {
        "ATTACK": "공격",
        "DEFENSE": "방어",
        "BLOODLUST": "혈기",
        "BRAWL": "격투",
        "GROWTH": "성장",
        "ARMORED": "무장",
        "SWARM": "다중",
        "BERSERK": "광폭화",
        "WEAKEN": "위압",
        "VULNERABLE": "갑옷파기"
    },

    CARD_TIERS: {
        "BASIC": "기본",
        "COMMON": "일반",
        "SPECIAL": "특별",
        "RARE": "희귀"
    },
    
    UI: {
        TITLE_MAIN: "덱빌딩 자동전투 프로토타입",
        SUBTITLE: "덱빌딩 오토배틀러",
        CONFIRM_RESET: "진행 중인 데이터가 삭제됩니다. 새로 시작하시겠습니까?",
        BTN_CONTINUE: "▶ 이어하기",
        NO_SAVE: "(저장된 데이터 없음)",
        BTN_NEW_GAME: "새로운 모험 시작",
        SELECT_CLASS: "직업 선택",
        TITLE_MAP: "🗺️ 탐험 지도 (현재: {floor}층)",
        CURRENT_LOCATION: "📍 {floor}층 - {node}",
        CURRENT_LOCATION_WAITING: "📍 {floor}층 - 지도 탐색 중",
        ENEMY_INFO_NAME: "⚔️ 적: {enemy}",
        ENEMY_INFO_STATS: "체력: {hp} | 공격: {atk} | 방어: {def}",
        BTN_BATTLE_START: "전투 시뮬레이션 시작!",
        BTN_REST: "⛺ 체력 회복 (30)",
        BTN_FORGE: "🔨 카드 강화",
        BTN_SHOP_BUY: "구매",
        BTN_SHOP_REMOVE: "덱 압축",
        BTN_POTION_USE: "사용",
        BTN_SKIP: "건너뛰기",
        BTN_LEAVE: "돌아가기",
        BTN_NEXT: "다음으로",
        MENU_START: "게임 시작",
        MENU_TITLE: "메인 메뉴",
        SHOP_TITLE: "🛒 기이한 상점",
        REWARD_TITLE: "✨ 승리 보상",
        REWARD_TITLE_BATTLE: "✨ 전투 승리 보상 ✨",
        REWARD_SUBTITLE_CARD: "덱에 추가할 카드를 한 장 선택하세요.",
        REWARD_GET_GOLD: "💰 {amount} 골드 획득",
        REWARD_GET_POTION: "🧪 {item} 획득",
        REWARD_GET_RELIC: "🏺 {item} 획득",
        REWARD_GET_CARD: "🃏 카드 보상 선택",
        REWARD_BTN_PICK: "이 카드 선택",
        REWARD_BTN_SKIP: "보상 건너뛰기",
        GAME_OVER_TITLE: "💀 게임 오버 💀",
        GAME_OVER_DESC: "당신의 여정은 여기서 끝났습니다...",
        VICTORY_TITLE: "👑 승리 👑",
        VICTORY_DESC: "축하합니다! 던전의 지배자가 되셨습니다.",
        BTN_RETURN_MENU: "⬅️ 메인 메뉴로",
        VERSION: "프로토타입 v1.0.0",
        
        REST_CONFIRM_UPGRADE: "강화 확인",
        REST_CONFIRM_DESC: "이 카드를 강화하시겠습니까?",
        BTN_CONFIRM: "확인",
        BTN_CANCEL: "취소",

        STATS_TITLE: "내 스탯",
        STATS_HP: "체력: {hp}",
        STATS_GOLD: "💰 골드: <strong>{gold} G</strong>",
        STATS_ATTACK: "공격력: {base} (성장 {growth} / 최대 공격력 {cap})",
        STATS_DEFENSE: "방어력: {base} (성장 {growth} / 최대 방어력 {cap})",
        STATS_DEPLOYMENT: "전개력: {deployment} / 덱 매수: {deckSize}",
        STATS_RELICS: "보유 유물 ({count})",
        STATS_NO_RELICS: "보유한 유물이 없습니다.",
        STATS_POTIONS: "보유 포션 ({count}/3)",
        STATS_NO_POTIONS: "보유한 포션이 없습니다.",
        
        TREASURE_OPEN_PROMPT: "상자를 클릭하여 열어보세요!",
        TREASURE_EMPTY: "상자는 비어있었습니다...",
        
        EMPTY_SHOP: "품절",
        CARD_ALREADY_UPGRADED: "강화 완료",
        POTION_EMPTY: "비어있음",
        SHOP_GOLD: "보유 골드: 💰 {gold}G",
        SHOP_SECTION_RELIC: "특별 상품 (유물)",
        SHOP_SECTION_CARD: "카드 구매",
        SHOP_SECTION_POTION: "물약 구매",
        SHOP_SECTION_REMOVE: "덱 압축 서비스",
        SHOP_REMOVE_DESC: "필요 없는 카드를 지워 덱을 가볍게 만듭니다.",
        SHOP_BTN_BUY: "{price}G 구매",
        SHOP_BTN_REMOVE: "{cardName} 지우기 ({price}G)",
        SHOP_SOLD_OUT_CARD: "모든 카드가 품절되었습니다.",
        SHOP_SOLD_OUT_POTION: "모든 물약이 품절되었습니다.",
        BTN_SHOP_LEAVE: "상점 나가기",
        
        DECK_TITLE: "내 덱 현황",
        DECK_COUNT: "총 {count}장",
        DECK_EMPTY: "아직 덱에 카드가 없습니다. 상점에서 카드를 추가해보세요!",
        
        REST_TITLE: "⛺ 아늑한 휴식처 ⛺",
        REST_SUBTITLE: "타오르는 모닥불 앞에서 다음 여정을 준비하세요.",
        REST_HEAL_TITLE: "휴식하기",
        REST_HEAL_DESC: "체력을 {amount} 회복합니다.",
        REST_FORGE_TITLE: "제련하기",
        REST_FORGE_DESC: "덱의 카드 1장을 영구히 강화합니다.",
        REST_CHOOSE_CARD: "강화할 카드를 고르세요",
        REST_NO_CARDS: "강화할 카드가 없습니다.",
        
        ALERT_NO_GOLD: "골드가 부족합니다!",
        ALERT_POTION_FULL: "포션 가방이 꽉 찼습니다!",
        ALERT_WRONG_FLOOR: "{floor}층의 노드를 선택해야 합니다!",
        ALERT_DISCONNECTED: "이전 노드와 연결되지 않은 경로입니다!",
        
        TREASURE_TITLE: "💎 보물 상자",
        BTN_CLAIM: "획득하기",
        BATTLE_ENEMY_HP: "❤️ 체력: {hp} / {maxHp}",
        BATTLE_ENEMY_ATTACK: "⚔️ 공격력: {attack}",
        BATTLE_ENEMY_DEFENSE: "🛡️ 방어력: {defense}",
        BATTLE_RESULT: "전투 결과",
        DECK_SYNERGY: "💡 현재 덱 시너지:"
    },

    SCENE: {
        REWARD_CHOOSE: "✨ 승리했습니다! 전리품을 선택하세요.",
        SHOP_DESC: "유용한 물건들을 팔고 있습니다.",
        REST_DESC: "모닥불이 따뜻하게 타오르고 있습니다. 무엇을 하시겠습니까?"
    },

    LOGS: {
        MAP_START: "새로운 지도가 생성되었습니다! 1층의 출발 노드를 선택하세요.",
        BATTLE_ENCOUNTER: "[{floor}층] 강력한 [{enemy}]와 마주쳤습니다!",
        BATTLE_UNKNOWN: "[{floor}층] 기이한 안개 속으로 들어왔습니다.",
        BATTLE_START: "⚔️ [{enemy}]와의 전투를 시작합니다!",
        BATTLE_POTION_EFFECT: "🔥 물약 효과 발동! 이번 전투에서 {stat} 스탯이 {value} 증가합니다.",
        BATTLE_TURN_INFO: "[턴 {turn}] 보정: {multiplier}배 | 내 공격: {curAtk}, 내 방어: {curDef}",
        BATTLE_DAMAGE: "💥 [{enemy}]에게 {dmgToEnemy} 피해! / 나에게 {dmgToPlayer} 피해!",
        BATTLE_INFINITE_LOOP: "무한 루프 강제 종료!",
        SHOP_BUY_CARD: "🛒 [{card}] 카드를 {price}G에 구매했습니다!",
        SHOP_BUY_RELIC: "🛒 [{relic}] 유물을 {price}G에 구매했습니다!",
        SHOP_BUY_POTION: "🛒 [{potion}]을(를) {price}G에 구매했습니다!",
        SHOP_REMOVE_CARD: "🧹 {price}G를 지불하고 [{card}] 카드를 덱에서 지웠습니다.",
        REST_HEAL: "⛺ 모닥불 옆에서 휴식했습니다. 체력을 {amount} 회복했습니다.",
        REWARD_GOLD: "💰 [{enemy}]를 처치하고 기본 보상 {gold} 골드를 획득했습니다.",
        REWARD_POTION: "🧪 적의 품에서 우연히 [{potion}]를 발견하여 획득했습니다!",
        REWARD_POTION_FULL: "🧪 물약을 발견했으나 가방이 가득 차 챙길 수 없었습니다.",
        NODE_TREASURE: "💎 기분 좋은 예감이 드는 보물 상자를 발견했습니다!",
        NODE_TREASURE_RELIC: "🎁 보물 상자 안에서 [{relic}] 유물을 획득했습니다!",
        NODE_TREASURE_EMPTY: "상자는 비어있었습니다. (이미 모든 유물 보유 중)",
        NODE_SHOP: "🛒 상점에 들렀습니다.",
        NODE_REST: "⛺ [{floor}층] 따뜻한 모닥불이 있는 휴식처에 도착했습니다.",
        NODE_UNKNOWN: "[{floor}층] ❓ 기묘한 장소에 도착했습니다.",
        
        POTION_USE_HEAL: "🧪 [{potion}]을(를) 들이켜 체력을 {value} 회복했습니다!",
        POTION_USE_BUFF: "🧪 [{potion}]을(를) 마셨습니다. 다음 전투에 효과가 발동됩니다.",
        
        GAME_START: "새로운 모험이 시작되었습니다! 1층의 노드를 선택하세요.",
        
        REWARD_RELIC: "🏺 [{relic}] 유물을 획득했습니다!",
        REWARD_CARD: "🎁 [{card}] 카드를 보상으로 획득했습니다!",
        REWARD_SKIP: "보상을 건너뛰었습니다.",
        
        VICTORY_NORMAL: "승리! [{enemy}]를 물리쳤습니다.",
        VICTORY_FINAL: "🎉 축하합니다! [{enemy}]를 박살내며 이번 던전을 정복했습니다! 최종 승리!",
        GAME_OVER: "💀 [{enemy}]에게 압도당해 패배했습니다...",
        
        REST_UPGRADE: "🔨 모닥불에서 [{card}] 카드를 강화했습니다!",
        
        POTION_USE: "🧪 [{potion}]을(를) 마셨습니다! ({desc})",
        
        DECK_ADD: "🃏 [{card}] 카드를 덱에 추가했습니다.",
        
        EVENT_TITLE: "❓ 이벤트: {title}",
        EVENT_CHOICE: "선택: {choice}",
        EVENT_LOSE_HP: "🩸 체력을 {damage} 잃었습니다!",
        EVENT_LOSE_GOLD: "💰 골드를 {gold} 잃었습니다!",
        EVENT_DEATH: "💀 너무 많은 피를 흘려 쓰러졌습니다...",
        EVENT_GET_RELIC: "💎 대가로 [{relic}] 유물을 획득했습니다!",
        EVENT_GET_RELIC_GOLD: "💎 적선의 대가로 [{relic}] 유물을 받았습니다!",
        EVENT_GET_GOLD: "💰 {gold} 골드를 획득했습니다!",
        EVENT_HEAL: "🌿 체력을 {amount} 회복했습니다!",
        EVENT_LEAVE: "무사히 그곳을 빠져나왔습니다.",

        RELIC_EFFECT_HEAL: "🏺 [{relic}] 효과 발동! 체력을 {value} 회복했습니다.",
        RELIC_EFFECT_GOLD: "🏺 [{relic}] 효과 발동! 추가 골드 {value} 획득."
    },

    DATA: {
        CARDS: {
            "card_strike_01": { name: "기본 공격" },
            "card_defend_01": { name: "굳건한 방패" },
            "card_poison_001": { name: "독 바르기" }
        },
        ENEMIES: {
            "enemy_goblin_01": { name: "고블린 무리" },
            "enemy_orc_01": { name: "오크 광전사" },
            "boss_dragon_01": { name: "화룡 (보스)" }
        },
        CHARACTERS: {
            "char_warrior": { 
                name: "전사", 
                description: "균형 잡힌 공방 능력을 갖춘 기본 캐릭터입니다." 
            }
        },
        RELICS: {
            "relic_blood": { name: "전사의 피", desc: "매 전투 시작 시 체력을 5 회복합니다." },
            "relic_whetstone": { name: "숫돌", desc: "기본 공격력이 3 증가합니다." },
            "relic_golden_idol": { name: "황금 우상", desc: "전투 승리 시 얻는 골드가 10 증가합니다." },
            "relic_mercenary": { name: "용병의 징표", desc: "매 전투 턴마다 공격 성장력이 1 증가합니다." },
            "relic_shell": { name: "단단한 등껍질", desc: "기본 방어력이 5 증가합니다." },
            "relic_compass": { name: "마법사의 나침반", desc: "덱 전개력이 2 증가합니다." }
        },
        POTIONS: {
            "potion_strength": { name: "힘의 포션", desc: "다음 전투 동안 공격력이 5 증가합니다." },
            "potion_ironskin": { name: "철피 포션", desc: "다음 전투 동안 방어력이 5 증가합니다." },
            "potion_heal": { name: "치유 포션", desc: "즉시 체력을 20 회복합니다." }
        },
        EVENTS: {
            "event_altar": {
                title: "잊혀진 제단",
                desc: "기괴한 조각상이 있는 낡은 제단을 발견했습니다. 오래된 제단 위에는 누군가 남긴 핏자국이 말라붙어 있습니다...",
                choices: [
                    "피를 바친다 (체력 15 감소, 무작위 유물 획득)",
                    "불길한 기운을 느끼고 돌아간다"
                ]
            },
            "event_beggar": {
                title: "수상한 거지",
                desc: "두건을 푹 눌러쓴 거지가 길을 막아섭니다. '동전 좀 적선하시구려... 좋은 걸 줄지도 모르지 않소?'",
                choices: [
                    "적선한다 (50 골드 감소, 무작위 유물 획득)",
                    "무시하고 지나간다"
                ]
            },
            "event_wagon": {
                title: "버려진 짐마차",
                desc: "숲길 한가운데에 상단이 버리고 간 듯한 부서진 짐마차가 있습니다. 쓸만한 물건이 남아있을지 모릅니다.",
                choices: [
                    "마차 안을 깊숙이 뒤진다 (체력 20 감소, 무작위 유물 획득)",
                    "주머니에 굴러다니는 동전만 챙긴다 (골드 30 획득)",
                    "그냥 지나간다"
                ]
            },
            "event_mushroom": {
                title: "수상한 버섯 군락",
                desc: "동굴 벽면에서 매혹적인 보랏빛을 내는 버섯들을 발견했습니다. 굉장히 먹음직스러워 보입니다.",
                choices: [
                    "버섯을 베어 문다 (체력 30 회복)",
                    "버섯을 캐서 상단에 판다 (골드 40 획득, 체력 10 감소)",
                    "무시하고 지나간다"
                ]
            },
            "event_checkpoint": {
                title: "통행세 요구",
                desc: "중무장한 용병들이 길을 막고 서 있습니다. '이 구역을 지나가려면 통행세를 내야지.'",
                choices: [
                    "순순히 돈을 낸다 (40 골드 감소)",
                    "무기를 빼들고 강행돌파한다 (체력 25 감소)"
                ]
            }
        }
    }
} as const;
